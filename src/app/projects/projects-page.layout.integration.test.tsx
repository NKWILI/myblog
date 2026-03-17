import { fireEvent, render, screen, within } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./page";

describe("ProjectsPage layout (integration)", () => {
	it("uses responsive grid classes for desktop vs mobile fallbacks", async () => {
		render(<ProjectsPage />);

		// Open current version so the case study grid exists in the DOM.
		const versionHistory = await screen.findByRole("region", {
			name: /version history/i,
		});
		const [versionButton] = within(versionHistory).getAllByRole("button");
		expect(versionButton, "expected at least one version button").toBeTruthy();
		fireEvent.click(versionButton);

		// We can't assert actual CSS layout in jsdom; instead we assert the intended
		// responsive class contract exists (md breakpoint boundary per plan).
		const metricsRegion = screen.getByRole("region", {
			name: /project metrics/i,
		});
		expect(metricsRegion.className).toMatch(/sm:grid-cols-2/);
		expect(metricsRegion.className).toMatch(/lg:grid-cols-4/);

		const versionHistoryRegion = screen.getByRole("region", {
			name: /version history/i,
		});
		expect(versionHistoryRegion).toBeInTheDocument();
	});
});
