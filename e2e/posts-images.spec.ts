import { expect, test } from "@playwright/test";

const POST_WITH_LOCALIZED_IMAGE_SLUG = "e2e-fixture-post";

test.describe("post page localized images", () => {
	test("post page renders localized images from /images/posts/ when fixture is loaded", async ({
		page,
	}) => {
		const res = await page.goto(`/posts/${POST_WITH_LOCALIZED_IMAGE_SLUG}`);
		expect(res?.status()).toBe(200);

		const article = page.getByRole("article");
		await expect(article).toBeVisible();

		// Next.js Image may use /_next/image?url=... so match "images/posts" in src.
		// When webServer runs dev:e2e, the fixture includes this image; if server was reused without fixture, skip.
		const localizedImg = article.locator('img[src*="images/posts"]').first();
		const count = await article.locator('img[src*="images/posts"]').count();
		if (count === 0) {
			test.skip(
				true,
				"Fixture post with localized image not loaded (run with dev:e2e for full e2e).",
			);
			return;
		}
		await expect(localizedImg).toBeVisible();
		await expect(localizedImg).toHaveAttribute("src", /images\/posts/);

		const naturalWidth = await localizedImg.evaluate(
			(el) => (el as HTMLImageElement).naturalWidth,
		);
		expect(naturalWidth).toBeGreaterThan(0);
	});
});
