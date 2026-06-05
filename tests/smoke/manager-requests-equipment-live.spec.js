const { expect, test } = require("@playwright/test");

const email = process.env.MAINTAINOPS_TEST_EMAIL || "";
const password = process.env.MAINTAINOPS_TEST_PASSWORD || "";

test.describe("MaintainOps manager/request/equipment live smoke", () => {
  test.skip(!email || !password, "MAINTAINOPS_TEST_EMAIL and MAINTAINOPS_TEST_PASSWORD are required");

  test("manager dashboard, requests, and equipment surfaces render and navigate", async ({ page, baseURL }) => {
    test.setTimeout(120000);

    await page.goto(`${baseURL}?qa=manager-requests-equipment-live`);
    if (await page.getByRole("button", { name: "Log In" }).isVisible({ timeout: 5000 }).catch(() => false)) {
      await page.getByLabel("Email").fill(email);
      await page.getByLabel("Password").fill(password);
      await page.getByRole("button", { name: "Log In" }).click();
    }

    await expect(page.getByRole("button", { name: /Manager/i })).toBeVisible({ timeout: 30000 });
    await page.locator('[data-section="manager"]').click();
    await expect(page.getByText("Manager Beta Dashboard")).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole("heading", { name: "Manager Attention" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Technician Workload" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Manager Trends" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Manager Report" })).toBeVisible();

    const metricButtons = page.locator("[data-manager-drill-user][data-manager-drill-metric]");
    await expect(metricButtons.first()).toBeVisible();
    await metricButtons.first().click();
    await expect(page.locator("[data-manager-drill-in]")).toBeVisible();

    await page.locator('[data-manager-drill-metric="summary_requests"]').first().click();
    const requestJumpRows = page.locator("[data-manager-request-jump]");
    if (await requestJumpRows.count()) {
      await requestJumpRows.first().click();
      await expect(page.getByRole("heading", { name: "Requests" })).toBeVisible();
      await expect(page.locator(".request-list")).toBeVisible();
      await page.locator('[data-section="manager"]').click();
      await expect(page.getByText("Manager Beta Dashboard")).toBeVisible();
    }

    await page.locator('[data-section="requests"]').click();
    await expect(page.getByRole("heading", { name: "Requests" })).toBeVisible();
    await expect(page.locator(".request-list")).toBeVisible();

    await page.locator('[data-section="assets"]').click();
    await expect(page.getByRole("heading", { name: /Equipment/i })).toBeVisible();
    const assetCards = page.locator("[data-asset-id]");
    await expect(assetCards.first()).toBeVisible();
    if (await assetCards.count()) {
      await assetCards.first().click();
      await expect(page.locator("#equipment-action-cards")).toBeVisible();
      await expect(page.getByRole("heading", { name: "Machine Files" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "PM Schedules" })).toBeVisible();
      await expect(page.locator("#asset-linked-parts-target")).toBeVisible();
      await expect(page.locator('[data-asset-relationship-section="completed-history"]')).toBeVisible();
    }
  });
});
