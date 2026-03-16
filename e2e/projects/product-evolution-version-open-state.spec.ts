import { expect, test } from "@playwright/test";

test.describe("/projects Product Evolution per-project open state", () => {
	test("switching projects preserves per-project open state", async ({
		page,
	}) => {
		await page.goto("/projects");

		// Open one additional version on CODEX (v2.1).
		await page.getByRole("button", { name: /typed content model/i }).click();

		// Switch to FastSite and open an additional version.
		await page.getByRole("tab", { name: /fastsite/i }).click();
		await page.getByRole("button", { name: /static-first baseline/i }).click();

		// Switch back to CODEX; v2.1 (Typed content model) should still be open.
		await page.getByRole("tab", { name: /codex/i }).click();
		await expect(page.getByText(/arbitrary markdown/i)).toBeVisible();

		// URL should only reflect the active project in this epic (no @v... sync).
		await expect(page).toHaveURL(/\/projects#codex$/);
	});
});
