import { calculateReadingTime, getWordCount } from "@/lib/utils";

describe("getWordCount", () => {
	it("counts words in a simple string", () => {
		expect(getWordCount("one two three")).toBe(3);
	});

	it("handles punctuation by counting words only", () => {
		expect(getWordCount("one, two! three?")).toBe(3);
	});
});

describe("calculateReadingTime", () => {
	it("returns 1 min read for 225 words", () => {
		expect(calculateReadingTime(225)).toBe("1 min read");
	});

	it("returns 2 min read for 450 words", () => {
		expect(calculateReadingTime(450)).toBe("2 min read");
	});
});
