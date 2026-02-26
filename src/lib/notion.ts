import fs from "node:fs";
import path from "node:path";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/";
import { NotionToMarkdown } from "notion-to-md";
import type { Post } from "./types";

export type { Post } from "./types";
export { getWordCount } from "./utils";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getDatabaseStructure() {
	const databaseId = process.env.NOTION_DATABASE_ID;
	if (!databaseId) throw new Error("NOTION_DATABASE_ID is required");
	const database = await notion.databases.retrieve({ database_id: databaseId });
	return database;
}

export function getPostsFromCache(): Post[] {
	const cachePath = path.join(process.cwd(), "posts-cache.json");
	if (fs.existsSync(cachePath)) {
		try {
			const cache = fs.readFileSync(cachePath, "utf-8");
			return JSON.parse(cache);
		} catch (error) {
			console.error("Error reading posts cache:", error);
			return [];
		}
	}
	return [];
}

export async function fetchPublishedPosts() {
	// This function is now intended to be used only by the caching script.
	const databaseId = process.env.NOTION_DATABASE_ID;
	if (!databaseId) throw new Error("NOTION_DATABASE_ID is required");
	const posts = await notion.databases.query({
		database_id: databaseId,
		filter: {
			and: [
				{
					property: "Status",
					status: {
						equals: "Published",
					},
				},
			],
		},
		sorts: [
			{
				property: "Published Date",
				direction: "descending",
			},
		],
	});

	return posts.results as PageObjectResponse[];
}

export async function getPost(slug: string): Promise<Post | null> {
	const posts = getPostsFromCache();
	const post = posts.find((p) => p.slug === slug);
	return post || null;
}

export async function getPostFromNotion(pageId: string): Promise<Post | null> {
	try {
		const page = (await notion.pages.retrieve({
			page_id: pageId,
		})) as PageObjectResponse;
		const mdBlocks = await n2m.pageToMarkdown(pageId);
		const { parent: contentString } = n2m.toMarkdownString(mdBlocks);

		// Get first paragraph for description (excluding empty lines)
		const paragraphs = contentString
			.split("\n")
			.filter((line: string) => line.trim().length > 0);
		const firstParagraph = paragraphs[0] || "";
		const description =
			firstParagraph.slice(0, 160) + (firstParagraph.length > 160 ? "..." : "");

		type NotionProps = Record<
			string,
			{
				title?: Array<{ plain_text: string }>;
				url?: string;
				date?: { start: string };
				people?: Array<{ name: string }>;
				multi_select?: Array<{ name: string }>;
				select?: { name: string };
			}
		>;
		const properties = page.properties as NotionProps;
		const titleText = properties.Title?.title?.[0]?.plain_text;
		const post: Post = {
			id: page.id,
			title: titleText || "Untitled",
			slug:
				(titleText ?? "")
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with dash
					.replace(/^-+|-+$/g, "") || "untitled",
			coverImage: properties["Featured Image"]?.url || undefined,
			description,
			date:
				properties["Published Date"]?.date?.start || new Date().toISOString(),
			content: contentString,
			author: properties.Author?.people?.[0]?.name,
			tags:
				properties.Tags?.multi_select?.map(
					(tag: { name: string }) => tag.name,
				) || [],
			category: properties.Category?.select?.name,
		};

		return post;
	} catch (error) {
		console.error("Error getting post:", error);
		return null;
	}
}
