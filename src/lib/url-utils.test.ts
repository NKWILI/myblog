import { stripSignedUrlParams } from "@/lib/url-utils";

describe("stripSignedUrlParams", () => {
	it("strips S3-style query string with X-Amz-Signature from URL", () => {
		const url =
			"https://prod-files-secure.s3.us-west-2.amazonaws.com/abc/file.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=abc123";
		expect(stripSignedUrlParams(url)).toBe(
			"https://prod-files-secure.s3.us-west-2.amazonaws.com/abc/file.webp",
		);
	});

	it("leaves normal URL with query string unchanged", () => {
		const url = "https://example.com/page?foo=bar&baz=qux";
		expect(stripSignedUrlParams(url)).toBe(url);
	});

	it("leaves plain text without URL unchanged", () => {
		const text = "Just some content with no URL.";
		expect(stripSignedUrlParams(text)).toBe(text);
	});

	it("leaves URL without query string unchanged", () => {
		const url = "https://example.com/page";
		expect(stripSignedUrlParams(url)).toBe(url);
	});

	it("strips only URLs that contain X-Amz- and leaves other URLs unchanged", () => {
		const content =
			"See https://other.com/doc and https://s3.amazonaws.com/b?X-Amz-Signature=x.";
		expect(stripSignedUrlParams(content)).toBe(
			"See https://other.com/doc and https://s3.amazonaws.com/b.",
		);
	});
});
