import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Post } from "../src/lib/types";
import { cachePosts } from "./cache-posts";

const MOCK_IMAGE_URL =
	"https://prod-files-secure.s3.us-west-2.amazonaws.com/abc/file.webp?X-Amz-Algorithm=AWS4&X-Amz-Signature=secret";
const MOCK_POST: Post = {
	id: "test-page-id",
	title: "Test Post",
	slug: "test-post",
	description: "Description",
	date: "2026-01-01",
	content: `![Diagram](${MOCK_IMAGE_URL})`,
};

describe("cache-posts integration", () => {
	let tempDir: string;
	let cachePath: string;

	beforeEach(async () => {
		tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "cache-posts-"));
		cachePath = path.join(tempDir, "posts-cache.json");
	});

	afterEach(() => {
		if (fs.existsSync(tempDir)) {
			fs.rmSync(tempDir, { recursive: true });
		}
	});

	it("downloads images and rewrites content to local paths, output has no X-Amz-", async () => {
		const publicDir = path.join(tempDir, "public");
		const imageBytes = Buffer.from([
			0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
		]); // PNG magic

		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			headers: new Headers({ "content-type": "image/png" }),
			arrayBuffer: () =>
				Promise.resolve(
					imageBytes.buffer.slice(
						imageBytes.byteOffset,
						imageBytes.byteOffset + imageBytes.byteLength,
					),
				),
		} as Response);

		await cachePosts({
			fetchPublishedPosts: async () => [{ id: "test-page-id" } as never],
			getPostFromNotion: async () => MOCK_POST,
			publicDir,
			cachePath,
			fetchFn: mockFetch as typeof fetch,
		});

		const cache = JSON.parse(fs.readFileSync(cachePath, "utf-8")) as Post[];
		expect(cache).toHaveLength(1);
		expect(cache[0].content).toContain("/images/posts/");
		expect(cache[0].content).not.toContain("X-Amz-");
		expect(cache[0].content).not.toContain(MOCK_IMAGE_URL);

		const imagesDir = path.join(publicDir, "images", "posts");
		expect(fs.existsSync(imagesDir)).toBe(true);
		const files = fs.readdirSync(imagesDir);
		expect(files.length).toBeGreaterThan(0);
		expect(files[0]).toMatch(/^test-post-[a-f0-9]{12}\.(png|webp|jpg|bin)$/);
	});

	it("does not re-download if file already exists", async () => {
		const publicDir = path.join(tempDir, "public");
		const imagesDir = path.join(publicDir, "images", "posts");
		fs.mkdirSync(imagesDir, { recursive: true });
		// Pre-create the file that would be written (basename from slug + hash of url without query + alt + 0)
		const { stableImageBasename } = await import("../src/lib/notion-media");
		const basename = stableImageBasename(
			"test-post",
			MOCK_IMAGE_URL,
			"Diagram",
			0,
		);
		fs.writeFileSync(
			path.join(imagesDir, `${basename}.png`),
			Buffer.from([0x89, 0x50, 0x4e]),
		);

		let fetchCalls = 0;
		const mockFetch = vi.fn().mockImplementation(() => {
			fetchCalls++;
			const buf = Buffer.from([0x89, 0x50, 0x4e]);
			return Promise.resolve({
				ok: true,
				headers: new Headers({ "content-type": "image/png" }),
				arrayBuffer: () =>
					Promise.resolve(
						buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
					),
			} as Response);
		});

		await cachePosts({
			fetchPublishedPosts: async () => [{ id: "test-page-id" } as never],
			getPostFromNotion: async () => MOCK_POST,
			publicDir,
			cachePath,
			fetchFn: mockFetch as typeof fetch,
		});

		expect(fetchCalls).toBe(0);
	});

	it("throws when image download returns 403", async () => {
		const publicDir = path.join(tempDir, "public");
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 403,
			statusText: "Forbidden",
		} as Response);

		await expect(
			cachePosts({
				fetchPublishedPosts: async () => [{ id: "test-page-id" } as never],
				getPostFromNotion: async () => MOCK_POST,
				publicDir,
				cachePath,
				fetchFn: mockFetch as typeof fetch,
			}),
		).rejects.toThrow(/403|Image download failed/);
	});
});
