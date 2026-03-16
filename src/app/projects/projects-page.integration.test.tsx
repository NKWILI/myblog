import { render, screen } from "@testing-library/react";
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
});
