import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
	test("homepage loads and returns 200", async ({ page }) => {
		const res = await page.goto("/");
		expect(res?.status()).toBe(200);
	});

	test("blog page loads and returns 200", async ({ page }) => {
		const res = await page.goto("/blog");
		expect(res?.status()).toBe(200);
	});

	test("homepage and blog return 200 and show at least one post when cache has data", async ({
		page,
	}) => {
		const homeRes = await page.goto("/");
		expect(homeRes?.status()).toBe(200);
		await expect(
			page.getByRole("link", { name: /E2E Fixture Post/i }),
		).toBeVisible();

		const blogRes = await page.goto("/blog");
		expect(blogRes?.status()).toBe(200);
		await expect(
			page.getByRole("link", { name: /E2E Fixture Post/i }),
		).toBeVisible();
	});
});
