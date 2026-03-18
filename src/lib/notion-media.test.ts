import { describe, expect, it } from "vitest";
import {
	extractImageManifest,
	isDownloadableImageUrl,
	rewriteMarkdownWithLocalImages,
	stableImageBasename,
	urlWithoutQuery,
} from "./notion-media";

describe("urlWithoutQuery", () => {
	it("strips query string from URL", () => {
		expect(
			urlWithoutQuery("https://example.com/path?X-Amz-Signature=abc&foo=1"),
		).toBe("https://example.com/path");
	});
	it("leaves URL without query unchanged", () => {
		expect(urlWithoutQuery("https://example.com/path")).toBe(
			"https://example.com/path",
		);
	});
});

describe("isDownloadableImageUrl", () => {
	it("accepts https URLs", () => {
		expect(
			isDownloadableImageUrl(
				"https://prod-files-secure.s3.us-west-2.amazonaws.com/x",
			),
		).toBe(true);
	});
	it("rejects http URLs", () => {
		expect(isDownloadableImageUrl("http://example.com/img.png")).toBe(false);
	});
	it("rejects data URLs", () => {
		expect(isDownloadableImageUrl("data:image/png;base64,abc")).toBe(false);
	});
	it("rejects already local paths", () => {
		expect(isDownloadableImageUrl("/images/posts/foo.png")).toBe(false);
		expect(isDownloadableImageUrl("./images/posts/foo.png")).toBe(false);
	});
	it("rejects URLs containing /images/posts/", () => {
		expect(
			isDownloadableImageUrl("https://mysite.com/images/posts/foo.png"),
		).toBe(false);
	});
});

describe("stableImageBasename", () => {
	it("produces same basename for same url (without query) and alt and ordinal", () => {
		const a = stableImageBasename(
			"my-post",
			"https://x.com/img?X-Amz-Sig=a",
			"alt",
			0,
		);
		const b = stableImageBasename(
			"my-post",
			"https://x.com/img?X-Amz-Sig=b",
			"alt",
			0,
		);
		expect(a).toBe(b);
	});
	it("produces different basename for different query when base URL same but different ordinal", () => {
		const a = stableImageBasename("my-post", "https://x.com/img", "alt", 0);
		const b = stableImageBasename("my-post", "https://x.com/img", "alt", 1);
		expect(a).not.toBe(b);
	});
});

describe("extractImageManifest", () => {
	it("extracts markdown images into manifest with originalUrl and localBasename", () => {
		const md = `Text
![Diagram](https://prod-files-secure.s3.us-west-2.amazonaws.com/abc/file.webp?X-Amz-Algorithm=AWS4)
More [link](https://example.com/doc).`;
		const manifest = extractImageManifest(md, "my-post");
		expect(manifest).toHaveLength(1);
		expect(manifest[0].originalUrl).toContain("prod-files-secure");
		expect(manifest[0].alt).toBe("Diagram");
		expect(manifest[0].localBasename).toMatch(/^my-post-[a-f0-9]{12}$/);
	});

	it("ignores non-https and data URLs and local paths", () => {
		const md = `![a](http://insecure.com/x)
![b](data:image/png;base64,abc)
![c](/images/posts/ok.png)
![d](https://notion.so/image/valid)`;
		const manifest = extractImageManifest(md, "slug");
		expect(manifest).toHaveLength(1);
		expect(manifest[0].originalUrl).toBe("https://notion.so/image/valid");
	});

	it("handles raw HTML img tags", () => {
		const md = `<img src="https://www.notion.so/image/abc123" alt="chart">`;
		const manifest = extractImageManifest(md, "post");
		expect(manifest).toHaveLength(1);
		expect(manifest[0].originalUrl).toBe("https://www.notion.so/image/abc123");
		expect(manifest[0].localBasename).toMatch(/^post-[a-f0-9]{12}$/);
	});

	it("returns empty array when no downloadable images", () => {
		expect(extractImageManifest("Just text.", "x")).toEqual([]);
		expect(extractImageManifest("![a](http://x.com)", "x")).toEqual([]);
	});
});

describe("rewriteMarkdownWithLocalImages", () => {
	it("replaces markdown image URLs with local paths and preserves alt", () => {
		const md = `![Diagram](https://s3.example.com/img?X-Amz=x)
[Link](https://example.com/doc) stays.`;
		const urlToLocal = new Map([
			["https://s3.example.com/img?X-Amz=x", "/images/posts/my-post-abc.png"],
		]);
		const out = rewriteMarkdownWithLocalImages(md, urlToLocal);
		expect(out).toContain("![Diagram](/images/posts/my-post-abc.png)");
		expect(out).toContain("[Link](https://example.com/doc) stays.");
	});

	it("replaces raw HTML img src", () => {
		const md = `<img src="https://www.notion.so/image/x">`;
		const urlToLocal = new Map([
			["https://www.notion.so/image/x", "/images/posts/post-xyz.webp"],
		]);
		const out = rewriteMarkdownWithLocalImages(md, urlToLocal);
		expect(out).toBe('<img src="/images/posts/post-xyz.webp">');
	});

	it("leaves URLs without mapping unchanged", () => {
		const md = "![Alt](https://unmapped.com/img)";
		const out = rewriteMarkdownWithLocalImages(md, new Map());
		expect(out).toBe("![Alt](https://unmapped.com/img)");
	});
});
