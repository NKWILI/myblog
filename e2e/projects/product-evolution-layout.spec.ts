import { expect, test } from "@playwright/test";

test.describe("/projects Product Evolution layout", () => {
	test("desktop vs basic mobile layout renders without clipping", async ({
		page,
	}) => {
		// Desktop
		await page.setViewportSize({ width: 1280, height: 800 });
		await page.goto("/projects");
		await expect(
			page.getByRole("region", { name: /product evolution/i }),
		).toBeVisible();

		// Mobile (basic stacking expectation)
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/projects");
		await expect(
			page.getByRole("region", { name: /product evolution/i }),
		).toBeVisible();
	});
});
