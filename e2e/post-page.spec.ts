import { expect, test } from "@playwright/test";

const KNOWN_GOOD_SLUG = "e2e-fixture-post";
const FIXTURE_TITLE = "E2E Fixture Post";

test.describe("post page", () => {
	test("valid slug returns 200 with title and main content", async ({
		page,
	}) => {
		const res = await page.goto(`/posts/${KNOWN_GOOD_SLUG}`);
		expect(res?.status()).toBe(200);

		await expect(page).toHaveTitle(new RegExp(FIXTURE_TITLE, "i"));

		const article = page.getByRole("article");
		await expect(article).toBeVisible();
		await expect(article.getByRole("heading", { level: 1 })).toContainText(
			FIXTURE_TITLE,
		);
	});

	test("non-existent slug returns 404 and shows not found", async ({
		page,
	}) => {
		const res = await page.goto("/posts/non-existent-slug-12345");
		expect(res?.status()).toBe(404);

		await expect(
			page.getByText(/not found|404|this page could not be found/i).first(),
		).toBeVisible();
	});
});
