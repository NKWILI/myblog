import { render, screen } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it, vi } from "vitest";

import type { ProductVersion } from "@/data/product-evolution";
import { VersionCard } from "./version-card";

const baseVersion: ProductVersion = {
	id: "codex-v1",
	versionLabel: "v1.0",
	versionName: "Initial release",
	date: "2025-01-01",
	isCurrent: false,
	techTags: ["Next.js"],
	problem: {
		label: "The Problem",
		body: "Baseline problem copy.",
		caption: "Problem caption.",
		technologies: ["Legacy stack"],
	},
	solution: {
		label: "The Solution",
		body: "Baseline solution copy.",
		caption: "Solution caption.",
		technologies: ["New stack"],
	},
};

describe("VersionCard", () => {
	it("renders a non-current, closed version header without throwing", () => {
		const onToggle = vi.fn();
		render(
			<VersionCard version={baseVersion} isOpen={false} onToggle={onToggle} />,
		);
		expect(screen.getByText(baseVersion.versionName)).toBeInTheDocument();
	});

	it("renders a current, open version header without throwing", () => {
		const onToggle = vi.fn();
		const current: ProductVersion = { ...baseVersion, isCurrent: true };
		render(<VersionCard version={current} isOpen={true} onToggle={onToggle} />);
		expect(screen.getByText(current.versionName)).toBeInTheDocument();
	});
});
