import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fetchPublishedPosts, getPostFromNotion } from "../src/lib/notion";

async function cachePosts() {
	try {
		console.log("Fetching posts from Notion...");
		const posts = await fetchPublishedPosts();

		const allPosts = [];

		for (const post of posts) {
			const postDetails = await getPostFromNotion(post.id);
			if (postDetails) {
				allPosts.push(postDetails);
			}
		}

		const cachePath = path.join(process.cwd(), "posts-cache.json");
		fs.writeFileSync(cachePath, JSON.stringify(allPosts, null, 2));

		console.log(`Successfully cached ${allPosts.length} posts.`);
	} catch (error) {
		console.error("Error caching posts:", error);
		// Allow dev server to start when Notion is not configured (e.g. invalid token)
		const allowFail = process.argv.includes("--allow-fail");
		process.exit(allowFail ? 0 : 1);
	}
}

cachePosts();
