import { render, screen } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { parseProductEvolutionUrl } from "@/lib/product-evolution-url";
import ProjectsPage from "./page";

// jsdom does not reliably update window.location on replaceState, so we mock
// the URL parser to return the desired project/version for each test.
vi.mock("@/lib/product-evolution-url", () => ({
	parseProductEvolutionUrl: vi.fn(),
	formatProjectVersionHash: vi.fn((projectId: string, versionId?: string) =>
		versionId ? `#${projectId}@${versionId}` : `#${projectId}`,
	),
}));

describe("ProjectsPage URL selection (integration)", () => {
	beforeEach(() => {
		vi.mocked(parseProductEvolutionUrl).mockReturnValue({
			projectId: null,
			versionId: undefined,
		});
	});

	it("selects project from hash (/projects#codex)", async () => {
		vi.mocked(parseProductEvolutionUrl).mockReturnValue({
			projectId: "codex",
			versionId: undefined,
		});
		render(<ProjectsPage />);
		const tab = await screen.findByRole("tab", { name: /codex/i });
		expect(tab).toHaveAttribute("data-state", "active");
	});

	it("selects project from query (/projects?project=fastsite)", async () => {
		vi.mocked(parseProductEvolutionUrl).mockReturnValue({
			projectId: "fastsite",
			versionId: undefined,
		});
		render(<ProjectsPage />);
		const tab = await screen.findByRole("tab", { name: /fastsite/i });
		expect(tab).toHaveAttribute("data-state", "active");
	});

	it("falls back when hash is invalid (/projects#unknown)", async () => {
		// Invalid project id: parser returns null, page falls back to first project
		vi.mocked(parseProductEvolutionUrl).mockReturnValue({
			projectId: null,
			versionId: undefined,
		});
		render(<ProjectsPage />);
		const tab = await screen.findByRole("tab", { name: /codex/i });
		expect(tab).toHaveAttribute("data-state", "active");
	});
});
