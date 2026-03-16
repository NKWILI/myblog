import { expect, test } from "@playwright/test";

test.describe("Product Evolution section", () => {
	test("renders Product Evolution section on /projects", async ({ page }) => {
		await page.goto("/projects");

		const section = page.getByRole("region", {
			name: /product evolution/i,
		});
		await expect(section).toBeVisible();
	});
});
