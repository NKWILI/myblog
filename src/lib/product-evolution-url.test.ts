import { describe, expect, it } from "vitest";

import {
	formatProjectVersionHash,
	parseProductEvolutionUrl,
} from "@/lib/product-evolution-url";

describe("product-evolution-url helpers", () => {
	it("parses project from hash (/projects#codex)", () => {
		expect(
			parseProductEvolutionUrl("http://localhost:3000/projects#codex"),
		).toEqual({
			projectId: "codex",
			versionId: undefined,
		});
	});

	it("parses project from query (/projects?project=fastsite)", () => {
		expect(
			parseProductEvolutionUrl(
				"http://localhost:3000/projects?project=fastsite",
			),
		).toEqual({
			projectId: "fastsite",
			versionId: undefined,
		});
	});

	it("hash wins over query when both present", () => {
		expect(
			parseProductEvolutionUrl(
				"http://localhost:3000/projects?project=fastsite#codex",
			),
		).toEqual({
			projectId: "codex",
			versionId: undefined,
		});
	});

	it("parses project+version from hash (/projects#codex@v3)", () => {
		expect(
			parseProductEvolutionUrl("http://localhost:3000/projects#codex@v3"),
		).toEqual({
			projectId: "codex",
			versionId: "v3",
		});
	});

	it("formats canonical hashes", () => {
		expect(formatProjectVersionHash("codex")).toBe("#codex");
		expect(formatProjectVersionHash("codex", "v3")).toBe("#codex@v3");
	});
});
