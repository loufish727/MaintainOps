const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("@playwright/test");

const email = process.env.MAINTAINOPS_TEST_EMAIL || "";
const password = process.env.MAINTAINOPS_TEST_PASSWORD || "";
const baseURL = process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/";

async function main() {
  if (!email || !password) throw new Error("MAINTAINOPS_TEST_EMAIL and MAINTAINOPS_TEST_PASSWORD are required.");
  const outputDir = path.resolve("test-results", "live-screens");
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  await page.goto(`${baseURL}?qa=live-screens`);
  if (await page.getByRole("button", { name: "Log In" }).isVisible({ timeout: 5000 }).catch(() => false)) {
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
  }

  await page.locator('[data-section="manager"]').click();
  await page.getByText("Manager Beta Dashboard").waitFor({ state: "visible", timeout: 30000 });
  await page.screenshot({ path: path.join(outputDir, "manager-desktop.png"), fullPage: true });

  await page.locator('[data-section="requests"]').click();
  await page.getByRole("heading", { name: "Requests" }).waitFor({ state: "visible", timeout: 30000 });
  await page.screenshot({ path: path.join(outputDir, "requests-desktop.png"), fullPage: true });

  await page.locator('[data-section="assets"]').click();
  await page.getByRole("heading", { name: /Equipment/i }).waitFor({ state: "visible", timeout: 30000 });
  const assetCards = page.locator("[data-asset-id]");
  if (await assetCards.count()) {
    await assetCards.first().click();
    await page.locator("#equipment-action-cards").waitFor({ state: "visible", timeout: 30000 });
  }
  await page.screenshot({ path: path.join(outputDir, "equipment-detail-desktop.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-section="manager"]').click();
  await page.getByText("Manager Beta Dashboard").waitFor({ state: "visible", timeout: 30000 });
  await page.screenshot({ path: path.join(outputDir, "manager-mobile.png"), fullPage: true });

  await browser.close();
  console.log(outputDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
