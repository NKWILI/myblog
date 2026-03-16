import { expect, test } from "@playwright/test";

test.describe("/projects Product Evolution deep links (project)", () => {
	test("tab change updates URL hash", async ({ page }) => {
		await page.goto("/projects");

		await page.getByRole("tab", { name: /fastsite/i }).click();
		await expect(page).toHaveURL(/\/projects#fastsite$/);
	});

	test("initial load from hash selects project", async ({ page }) => {
		await page.goto("/projects#codex");
		await expect(page).toHaveURL(/\/projects#codex$/);
	});

	test("initial load from query selects project and normalizes to hash", async ({
		page,
	}) => {
		await page.goto("/projects?project=fastsite");
		await expect(page).toHaveURL(/\/projects#fastsite$/);
	});
});
