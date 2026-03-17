import { fireEvent, render, screen, within } from "@testing-library/react";
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
		expect(screen.queryByTestId("pe-screenshot-placeholder")).toBeNull();
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

	it("opens fullscreen dialog when screenshot is clicked", () => {
		render(
			<CaseStudyColumn
				side={{
					...baseSide,
					label: "The Solution",
					screenshotPath: "/screenshots/codex-v1-solution.png",
				}}
			/>,
		);

		expect(screen.getByText(/click to enlarge/i)).toBeInTheDocument();

		const trigger = screen.getByRole("button", { name: /view screenshot/i });
		fireEvent.click(trigger);

		const dialog = screen.getByRole("dialog");
		expect(dialog).toBeInTheDocument();

		const img = within(dialog).getByRole("img", { name: baseSide.caption });
		expect(img).toHaveAttribute("src", "/screenshots/codex-v1-solution.png");
	});

	it("renders result link when provided", () => {
		render(
			<CaseStudyColumn
				side={{
					...baseSide,
					label: "The Solution",
					links: [
						{
							label: "Here is the link to visualize the result.",
							href: "https://example.com/result",
						},
						{
							label: "GSAP docs",
							href: "https://gsap.com/docs/v3/",
						},
					],
				}}
			/>,
		);

		const link = screen.getByRole("link", {
			name: /here is the link to visualize the result/i,
		});
		expect(link).toHaveAttribute("href", "https://example.com/result");
		expect(screen.getByRole("link", { name: /gsap docs/i })).toHaveAttribute(
			"href",
			"https://gsap.com/docs/v3/",
		);
	});
});
