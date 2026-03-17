import { render, screen, within } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import ProjectsPage from "./page";

describe("ProjectsPage (Product Evolution integration)", () => {
	it("renders without crashing", () => {
		render(<ProjectsPage />);
		expect(
			screen.getByRole("region", { name: /product evolution/i }),
		).toBeInTheDocument();
	});

	it("renders website tech stack under version history when configured", async () => {
		render(<ProjectsPage />);
		const stackRegion = await screen.findByRole("region", {
			name: /website tech stack/i,
		});
		expect(stackRegion).toBeInTheDocument();
		expect(
			within(stackRegion).getByText(/technology stack/i),
		).toBeInTheDocument();
		expect(
			within(stackRegion).getAllByText(/next\.js/i).length,
		).toBeGreaterThan(0);
	});
});
