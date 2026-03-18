import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import type { PageObjectResponse } from "@notionhq/client/";
import { fetchPublishedPosts, getPostFromNotion } from "../src/lib/notion";
import { localizePostContent } from "../src/lib/notion-media";
import type { Post } from "../src/lib/types";
import { stripSignedUrlParams } from "../src/lib/url-utils";

export type CachePostsOptions = {
	/** Override for listing pages (for tests). */
	fetchPublishedPosts?: () => Promise<PageObjectResponse[]>;
	/** Override for Notion fetch (for tests). */
	getPostFromNotion?: (pageId: string) => Promise<Post | null>;
	/** Public directory (default: <repo>/public). */
	publicDir?: string;
	/** Output cache file path (default: posts-cache.json in cwd). */
	cachePath?: string;
	/** Override fetch for image downloads (for tests). */
	fetchFn?: typeof fetch;
};

export async function cachePosts(
	options: CachePostsOptions = {},
): Promise<void> {
	const fetchPosts = options.fetchPublishedPosts ?? fetchPublishedPosts;
	const getPost = options.getPostFromNotion ?? getPostFromNotion;
	const publicDir = options.publicDir ?? path.join(process.cwd(), "public");
	const cachePath =
		options.cachePath ?? path.join(process.cwd(), "posts-cache.json");
	const fetchFn = options.fetchFn;

	console.log("Fetching posts from Notion...");
	const posts = await fetchPosts();

	const allPosts: Post[] = [];

	for (const post of posts) {
		const postDetails = await getPost(post.id);
		if (!postDetails) continue;

		const localizedContent = await localizePostContent(
			postDetails.content,
			postDetails.slug,
			publicDir,
			{ fetchFn },
		);

		allPosts.push({
			...postDetails,
			description: stripSignedUrlParams(postDetails.description),
			content: stripSignedUrlParams(localizedContent),
		});
	}

	fs.writeFileSync(cachePath, JSON.stringify(allPosts, null, 2));
	console.log(`Successfully cached ${allPosts.length} posts.`);
}

async function main() {
	try {
		await cachePosts();
	} catch (error) {
		console.error("Error caching posts:", error);
		const allowFail = process.argv.includes("--allow-fail");
		process.exit(allowFail ? 0 : 1);
	}
}

main();
