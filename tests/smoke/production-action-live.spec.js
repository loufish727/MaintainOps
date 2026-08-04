const { expect, test } = require("@playwright/test");

const email = process.env.LFES_PRODUCTION_EMAIL || "";
const password = process.env.LFES_PRODUCTION_PASSWORD || "";
const targetWorkOrderId = process.env.LFES_PRODUCTION_WORK_ORDER_ID || "1e29b530-f2de-40c6-bd91-05cf39f5bb9a";

test.describe("Production Action signed-in lifecycle", () => {
  test.skip(!email || !password, "LFES_PRODUCTION_EMAIL and LFES_PRODUCTION_PASSWORD are required");

  test("Production work routes through My Work without changing work-order ownership", async ({ page, baseURL }) => {
    test.setTimeout(120000);
    const marker = `LFES Production action ${Date.now()}`;
    page.on("dialog", (dialog) => dialog.accept());

    await page.goto(`${baseURL}?lfes-production-action=${Date.now()}`, { waitUntil: "load" });
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });

    await expect(page.locator('[data-section="financial"]')).toHaveCount(0);
    await expect(page.locator('[data-section="manager"]')).toHaveCount(0);
    await expect(page.locator('[data-section="setup"]')).toHaveCount(0);

    await page.locator('[data-section="work"]').click();
    await expect(page.getByRole("heading", { name: "Work Orders", exact: true, level: 2 })).toBeVisible();
    const workCard = page.locator(`.work-card[data-id="${targetWorkOrderId}"]`);
    await expect(workCard).toBeVisible();

    const actionForm = workCard.locator(`[data-production-action-form="${targetWorkOrderId}"]`).first();
    const actionField = actionForm.locator('[name="production_action"]');
    if (!await actionField.isVisible()) {
      await actionForm.locator("xpath=ancestor::details[1]/summary").click();
    }
    await actionField.fill(marker);
    await actionForm.locator('[name="production_action_assigned_to"]').selectOption({ index: 0 });
    await actionForm.getByRole("button", { name: /Production Action/ }).click();
    await expect(workCard.locator(".production-action-text").filter({ hasText: marker })).toBeVisible();
    await expect(workCard.locator('[data-quick-status="completed"]')).toHaveCount(0);

    await page.locator('[data-section="team"]').click();
    const productionMember = page.locator(".member-card").filter({ hasText: email });
    await expect(productionMember).toBeVisible();
    await productionMember.getByRole("button", { name: "View Work" }).click();
    await expect(workCard).toBeVisible();

    await page.locator('[data-section="mywork"]').click();
    const myWorkCard = page.locator(`.work-card[data-id="${targetWorkOrderId}"]`);
    await expect(myWorkCard).toBeVisible();
    await expect(myWorkCard.locator(".production-action-text").filter({ hasText: marker })).toBeVisible();
    await myWorkCard.getByRole("button", { name: "Complete Production Action" }).click();
    await expect(myWorkCard).toHaveCount(0);

    await page.locator('[data-section="work"]').click();
    await page.getByRole("button", { name: "Clear filters", exact: true }).click();
    await expect(workCard.locator(".production-action-text").filter({ hasText: marker })).toBeVisible();
    await expect(workCard.getByText("Completed", { exact: true }).first()).toBeVisible();
    await expect(workCard.locator('[data-quick-status="completed"]')).toBeVisible();

    await workCard.locator(".work-card-body").click();
    const detail = page.locator(".production-action-detail");
    await expect(detail).toBeVisible();
    await detail.locator(`[data-production-action-remove="${targetWorkOrderId}"]`).click();
    await expect(page.locator(".production-action-text").filter({ hasText: marker })).toHaveCount(0);
    await expect(page.getByText("No Production Action is assigned.", { exact: true })).toBeVisible();
  });
});
