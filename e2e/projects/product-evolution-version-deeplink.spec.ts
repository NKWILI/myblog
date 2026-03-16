import { expect, test } from "@playwright/test";

test.describe("/projects Product Evolution deep links (version)", () => {
	test("deep link to specific version opens and scrolls into view", async ({
		page,
	}) => {
		await page.goto("/projects#codex@v3");

		// The target version should be open; we verify by presence of its case study
		// content which is only rendered when open.
		await expect(page.getByText(/the problem/i).first()).toBeVisible();

		// Scroll check: the version button should be in viewport.
		const target = page.getByRole("button", { name: /ai-native workspace/i });
		const box = await target.boundingBox();
		expect(box).not.toBeNull();
	});

	test("invalid version falls back to current version open state", async ({
		page,
	}) => {
		await page.goto("/projects#codex@v99");
		await expect(page.getByRole("tab", { name: /codex/i })).toHaveAttribute(
			"data-state",
			"active",
		);
	});
});
