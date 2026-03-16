import { fireEvent, render, screen } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import type { CaseStudySide } from "@/data/product-evolution";
import { CaseStudyColumn } from "./case-study-column";

const baseSide: CaseStudySide = {
	label: "The Problem",
	body: "Engineers could not quickly find canonical answers to recurring questions.",
	caption: "Before: fragmented knowledge across multiple tools.",
	technologies: ["Slack", "Email"],
};

describe("CaseStudyColumn", () => {
	it("uses img when screenshotPath is present", () => {
		render(
			<CaseStudyColumn
				side={{
					...baseSide,
					screenshotPath: "/screenshots/codex-v1-problem.png",
				}}
			/>,
		);
		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(screen.queryByTestId("pe-screenshot-placeholder")).toBeNull();
	});

	it("falls back to placeholder when screenshotPath is missing", () => {
		render(<CaseStudyColumn side={baseSide} />);
		expect(screen.queryByRole("img")).toBeNull();
		expect(screen.getByTestId("pe-screenshot-placeholder")).toBeInTheDocument();
	});

	it("onError swaps to placeholder (one-shot)", () => {
		render(
			<CaseStudyColumn
				side={{ ...baseSide, screenshotPath: "/screenshots/missing.png" }}
			/>,
		);

		const img = screen.getByRole("img");
		fireEvent.error(img);

		expect(screen.queryByRole("img")).toBeNull();
		expect(screen.getByTestId("pe-screenshot-placeholder")).toBeInTheDocument();
		expect(screen.getByText(baseSide.caption)).toBeInTheDocument();
		expect(screen.getByText(baseSide.body)).toBeInTheDocument();
	});
});
