import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./page";

describe("ProjectsPage placeholders (integration)", () => {
	it("expands version card and shows case study or placeholders", async () => {
		render(<ProjectsPage />);

		// Find a version card header (current version may be open by default).
		const versionButton = await screen.findByRole("button", {
			name: /ai-native workspace/i,
		});
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
