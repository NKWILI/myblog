import {
	fireEvent,
	render,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./page";

describe("ProjectsPage placeholders (integration)", () => {
	it("expands version card and shows case study or placeholders", async () => {
		render(<ProjectsPage />);

		const versionHistory = await screen.findByRole("region", {
			name: /version history/i,
		});
		const [versionButton] = within(versionHistory).getAllByRole("button");
		expect(versionButton, "expected at least one version button").toBeTruthy();
		const wasExpanded = versionButton.getAttribute("aria-expanded") === "true";

		if (!wasExpanded) {
			fireEvent.click(versionButton);
			await waitFor(
				() => {
					expect(versionButton).toHaveAttribute("aria-expanded", "true");
				},
				{ timeout: 1000 },
			);
		}

		// With no screenshotPath in data, we should see placeholders (unit test covers detail).
		const placeholders = screen.queryAllByTestId("pe-screenshot-placeholder");
		const hasCaseStudy =
			screen.queryByText("The Problem") !== null ||
			screen.queryByText(/screenshot coming soon/i) !== null;
		expect(
			placeholders.length >= 1 || hasCaseStudy,
			"expected placeholders or case study content when version is open",
		).toBe(true);
	});
});
