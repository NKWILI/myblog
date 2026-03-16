import { render, screen } from "@testing-library/react";
// @vitest-environment jsdom
import React from "react";
import { describe, expect, it } from "vitest";

import type { ProductMetric } from "@/data/product-evolution";
import { MetricCard } from "./metric-card";

const baseMetric: ProductMetric = {
	label: "Conversion rate",
	value: "12.3%",
	trend: "up 2.1pp vs last quarter",
	isFlagship: false,
};

describe("MetricCard", () => {
	it("renders a non-flagship metric without throwing", () => {
		render(<MetricCard metric={baseMetric} />);
		expect(screen.getByText(baseMetric.value)).toBeInTheDocument();
	});

	it("renders a flagship metric without throwing", () => {
		const flagship: ProductMetric = { ...baseMetric, isFlagship: true };
		render(<MetricCard metric={flagship} />);
		expect(screen.getByText(flagship.value)).toBeInTheDocument();
	});
});
