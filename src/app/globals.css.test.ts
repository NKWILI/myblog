import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Product Evolution tokens in globals.css", () => {
	it("defines placeholder tokens and keeps them scoped to Product Evolution section", () => {
		const cssPath = path.resolve(__dirname, "globals.css");
		const css = fs.readFileSync(cssPath, "utf8");

		expect(css).toContain(".product-evolution-section");
		expect(css).toMatch(/--pe-problem\s*:/);
		expect(css).toMatch(/--pe-solution\s*:/);

		// Epic 4 requires these placeholder tokens (or an equivalent set).
		expect(css).toMatch(/--pe-placeholder-border\s*:/);
		expect(css).toMatch(/--pe-placeholder-bg-problem\s*:/);
		expect(css).toMatch(/--pe-placeholder-bg-solution\s*:/);
	});
});
