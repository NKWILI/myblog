import { expect, test } from "@playwright/test";

test.describe("/projects Product Evolution placeholders", () => {
	test("placeholders appear for missing screenshots", async ({ page }) => {
		await page.goto("/projects");

		// Current version is open by default; with no screenshotPath in data,
		// placeholders are shown. If the card is closed, open it first.
		const versionButton = page.getByRole("button", {
			name: /ai-native workspace/i,
		});
		if ((await versionButton.getAttribute("aria-expanded")) === "false") {
			await versionButton.click();
		}

		const placeholders = page.getByTestId("pe-screenshot-placeholder");
		await expect(placeholders.first()).toBeVisible();
	});
});
