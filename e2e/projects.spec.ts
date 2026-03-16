import { expect, test } from "@playwright/test";

test.describe("/projects — Product Evolution section", () => {
	test("renders section header and at least one tab, and switches tabs", async ({
		page,
	}) => {
		await page.goto("/projects");

		// Section header
		await expect(
			page.getByRole("heading", { name: /product evolution/i }),
		).toBeVisible();

		const tabs = page.getByRole("tab");
		const tabCount = await tabs.count();
		expect(tabCount).toBeGreaterThanOrEqual(1);

		if (tabCount >= 2) {
			const firstTab = tabs.nth(0);
			const secondTab = tabs.nth(1);

			await expect(firstTab).toHaveAttribute("aria-selected", "true");

			const initialPanelText = await page
				.getByRole("tabpanel")
				.first()
				.textContent();

			await secondTab.click();

			await expect(secondTab).toHaveAttribute("aria-selected", "true");

			const updatedPanelText = await page
				.getByRole("tabpanel")
				.first()
				.textContent();

			expect(updatedPanelText).not.toBe(initialPanelText);
		}
	});

	test("selects project from URL hash when valid, otherwise falls back to first", async ({
		page,
	}) => {
		await page.goto("/projects");

		const allTabs = page.getByRole("tab");
		const tabCount = await allTabs.count();
		expect(tabCount).toBeGreaterThanOrEqual(1);

		const firstTab = allTabs.nth(0);
		const firstTabValue = await firstTab.getAttribute("data-state");

		// Navigate directly with an invalid slug — should still select first tab
		await page.goto("/projects#invalid-slug");
		await expect(firstTab).toHaveAttribute("aria-selected", "true");

		if (tabCount >= 2) {
			const secondTab = allTabs.nth(1);
			const secondTabId = await secondTab.getAttribute("value");
			if (secondTabId) {
				await page.goto(`/projects#${secondTabId}`);
				await expect(secondTab).toHaveAttribute("aria-selected", "true");
			}
		}
	});
});
