import fs from "node:fs";
import { getPostsFromCache, slugFromTitle } from "@/lib/notion";

vi.mock("node:fs", () => ({
	default: {
		existsSync: vi.fn(),
		readFileSync: vi.fn(),
	},
}));

const mockedExistsSync = vi.mocked(fs.existsSync);
const mockedReadFileSync = vi.mocked(fs.readFileSync);

describe("slugFromTitle", () => {
	it('converts "My Post Title!" to my-post-title', () => {
		expect(slugFromTitle("My Post Title!")).toBe("my-post-title");
	});

	it('converts "Hello World" to hello-world', () => {
		expect(slugFromTitle("Hello World")).toBe("hello-world");
	});

	it('returns "untitled" for empty string', () => {
		expect(slugFromTitle("")).toBe("untitled");
	});

	it('returns "untitled" for whitespace-only string', () => {
		expect(slugFromTitle("   ")).toBe("untitled");
	});

	it("collapses multiple spaces/dashes to single dash", () => {
		expect(slugFromTitle("a---b")).toBe("a-b");
	});

	it("trims leading and trailing dashes", () => {
		expect(slugFromTitle("--hello--")).toBe("hello");
	});
});

describe("getPostsFromCache", () => {
	beforeEach(() => {
		vi.mocked(fs.existsSync).mockReset();
		vi.mocked(fs.readFileSync).mockReset();
	});

	it("returns empty array when cache file is missing", () => {
		mockedExistsSync.mockReturnValue(false);

		const result = getPostsFromCache();

		expect(result).toEqual([]);
		expect(mockedReadFileSync).not.toHaveBeenCalled();
	});

	it("returns empty array when cache file has invalid JSON", () => {
		mockedExistsSync.mockReturnValue(true);
		mockedReadFileSync.mockReturnValue("not valid json");

		const result = getPostsFromCache();

		expect(result).toEqual([]);
	});

	it("returns parsed array with correct post shape when cache is valid", () => {
		const fixture = [
			{
				id: "post-1",
				title: "First Post",
				slug: "first-post",
				date: "2025-01-15",
				description: "A short description.",
				content: "Full content here.",
				coverImage: "https://example.com/img.png",
				author: "Author Name",
				tags: ["tag1", "tag2"],
				category: "Tech",
			},
		];
		mockedExistsSync.mockReturnValue(true);
		mockedReadFileSync.mockReturnValue(JSON.stringify(fixture));

		const result = getPostsFromCache();

		expect(Array.isArray(result)).toBe(true);
		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			id: "post-1",
			title: "First Post",
			slug: "first-post",
			date: "2025-01-15",
			description: "A short description.",
			content: "Full content here.",
		});
		expect(result[0]).toHaveProperty(
			"coverImage",
			"https://example.com/img.png",
		);
		expect(result[0]).toHaveProperty("author", "Author Name");
		expect(result[0]).toHaveProperty("tags", ["tag1", "tag2"]);
		expect(result[0]).toHaveProperty("category", "Tech");
	});
});
