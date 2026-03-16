import { render, screen } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import type { ProductEvolutionProject } from "@/data/product-evolution";
import { ProjectHeader } from "./project-header";

function makeProject(
	status: ProductEvolutionProject["status"],
): ProductEvolutionProject {
	return {
		id: "sample-project",
		tabLabel: "Sample",
		status,
		description: "Sample description for header rendering.",
		metrics: [],
		versions: [],
	};
}

describe("ProjectHeader", () => {
	it("renders name, description, and status badge for an active project", () => {
		const project = makeProject("active");
		render(<ProjectHeader project={project} />);
		expect(screen.getByText(project.tabLabel)).toBeInTheDocument();
		expect(screen.getByText(project.description)).toBeInTheDocument();
	});
});
