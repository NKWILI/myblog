import { render, screen } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import { ScreenshotPlaceholder } from "./screenshot-placeholder";

describe("ScreenshotPlaceholder", () => {
	it("renders problem variant with default hint", () => {
		render(<ScreenshotPlaceholder variant="problem" />);
		expect(screen.getByText(/screenshot/i)).toBeInTheDocument();
	});

	it("renders solution variant with custom hint", () => {
		render(
			<ScreenshotPlaceholder variant="solution" hint="Custom hint text" />,
		);
		expect(screen.getByText("Custom hint text")).toBeInTheDocument();
	});
});
