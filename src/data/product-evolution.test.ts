import { describe, expect, it } from "vitest";

import {
	type ProductEvolutionProject,
	type ProductMetric,
	type ProductVersion,
	productEvolutionProjects,
} from "./product-evolution";

function isValidId(id: string): boolean {
	return /^[a-z0-9-]{1,32}$/.test(id);
}

function isValidTabLabel(label: string): boolean {
	return typeof label === "string" && label.length > 0 && label.length <= 30;
}

describe("productEvolutionProjects", () => {
	it("exports at least one project in normal operation", () => {
		expect(productEvolutionProjects.length).toBeGreaterThanOrEqual(1);
	});
	it("ensures each project has a valid id and tabLabel", () => {
		for (const project of productEvolutionProjects) {
			expect(isValidId(project.id)).toBe(true);
			expect(isValidTabLabel(project.tabLabel)).toBe(true);
		}
	});
	it("has unique ids (first occurrence wins by convention)", () => {
		const seen = new Set<string>();
		for (const project of productEvolutionProjects) {
			expect(seen.has(project.id)).toBe(false);
			seen.add(project.id);
		}
	});

	it("ensures each project defines four metrics with at least one flagship metric", () => {
		for (const project of productEvolutionProjects) {
			// Metrics are required for Epic 2.
			expect(Array.isArray(project.metrics)).toBe(true);
			expect(project.metrics.length).toBe(4);

			const flagshipCount = project.metrics.filter(
				(metric: ProductMetric) => metric.isFlagship === true,
			).length;

			expect(flagshipCount).toBeGreaterThanOrEqual(1);

			for (const metric of project.metrics) {
				expect(typeof metric.label).toBe("string");
				expect(metric.label.length).toBeGreaterThan(0);
				expect(typeof metric.value).toBe("string");
				expect(metric.value.length).toBeGreaterThan(0);
			}
		}
	});

	it("ensures each project defines a non-empty, newest-first versions array", () => {
		for (const project of productEvolutionProjects) {
			expect(Array.isArray(project.versions)).toBe(true);
			expect(project.versions.length).toBeGreaterThanOrEqual(1);

			// Exactly one current version per project.
			const currentVersions = project.versions.filter(
				(version: ProductVersion) => version.isCurrent === true,
			);
			expect(currentVersions.length).toBe(1);

			// Versions are ordered newest-first by date.
			const timestamps = project.versions.map((version: ProductVersion) => {
				expect(typeof version.date).toBe("string");
				const ts = Date.parse(version.date);
				expect(Number.isNaN(ts)).toBe(false);
				return ts;
			});

			const sorted = [...timestamps].sort((a, b) => b - a);
			expect(timestamps).toEqual(sorted);
		}
	});

	it("enforces tech tag cardinality (1–5 tags per version)", () => {
		for (const project of productEvolutionProjects) {
			expect(Array.isArray(project.versions)).toBe(true);

			for (const version of project.versions) {
				expect(Array.isArray(version.techTags)).toBe(true);
				expect(version.techTags.length).toBeGreaterThanOrEqual(1);
				expect(version.techTags.length).toBeLessThanOrEqual(5);

				for (const tag of version.techTags) {
					expect(typeof tag).toBe("string");
					expect(tag.length).toBeGreaterThan(0);
				}
			}
		}
	});

	it("ensures each version has required case study copy and captions", () => {
		for (const project of productEvolutionProjects) {
			for (const version of project.versions) {
				expect(version.problem).toBeTruthy();
				expect(typeof version.problem.body).toBe("string");
				expect(version.problem.body.length).toBeGreaterThan(0);
				expect(typeof version.problem.caption).toBe("string");
				expect(version.problem.caption.length).toBeGreaterThan(0);

				expect(version.solution).toBeTruthy();
				expect(typeof version.solution.body).toBe("string");
				expect(version.solution.body.length).toBeGreaterThan(0);
				expect(typeof version.solution.caption).toBe("string");
				expect(version.solution.caption.length).toBeGreaterThan(0);

				// Side tech lists are allowed but must be arrays when present.
				expect(Array.isArray(version.problem.technologies)).toBe(true);
				expect(Array.isArray(version.solution.technologies)).toBe(true);
			}
		}
	});

	it("enforces screenshot path naming convention when present", () => {
		for (const project of productEvolutionProjects) {
			const projectSlug = String(project.id).toLowerCase();
			for (const version of project.versions) {
				const versionNumberMatch = String(version.versionLabel).match(
					/^v(\d+)(?:\.\d+)?$/i,
				);

				// Epic 5 will standardize integer-only deep links; for now we still
				// require the version label to include a numeric major version.
				expect(versionNumberMatch).not.toBeNull();
				const major = versionNumberMatch?.[1];

				const re = new RegExp(
					`^/screenshots/${projectSlug}-v${major}-(problem|solution)\\.(png|jpg|jpeg|webp)$`,
					"i",
				);

				const paths: Array<[string, unknown]> = [
					["problem", version.problem?.screenshotPath],
					["solution", version.solution?.screenshotPath],
				];

				for (const [, p] of paths) {
					if (p === undefined || p === null || p === "") continue;
					expect(typeof p).toBe("string");
					expect(String(p)).toMatch(re);
				}
			}
		}
	});
});
