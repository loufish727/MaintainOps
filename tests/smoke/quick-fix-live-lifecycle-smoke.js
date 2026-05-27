const { chromium } = require("@playwright/test");

const email = process.env.MO_QA_EMAIL;
const password = process.env.MO_QA_PASSWORD;
const baseUrl = process.env.MAINTAINOPS_BASE_URL || "https://loufish727.github.io/MaintainOps/";

if (!email || !password) {
  console.error("Set MO_QA_EMAIL and MO_QA_PASSWORD to run the live Quick Fix lifecycle smoke.");
  process.exit(2);
}

const token = `QA disposable quick fix ${Date.now()}`;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const logs = [];
  page.on("pageerror", (error) => logs.push({ type: "pageerror", text: error.message }));

  await page.goto(`${baseUrl.replace(/\/?$/, "/")}index.html?qa=qf-lifecycle-${Date.now()}`, {
    waitUntil: "load",
    timeout: 30000,
  });
  await page.waitForTimeout(3000);

  if (await page.locator("#auth-form").count()) {
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
  }

  await page.getByRole("button", { name: "Quick Fix" }).waitFor({ state: "visible", timeout: 30000 });
  await page.getByRole("button", { name: "Quick Fix" }).click();
  await page.locator("#quick-fix-form").waitFor({ state: "visible", timeout: 15000 });
  await page.locator('#quick-fix-form input[name="title"]').fill(token);
  await page.getByRole("button", { name: "Log Quick Fix" }).click();

  await page.getByRole("heading", { name: token, exact: true }).waitFor({ state: "visible", timeout: 30000 });
  const status = await page.locator("#status-select").inputValue().catch(() => null);
  await page.locator("[data-delete-work-order]").waitFor({ state: "visible", timeout: 15000 });
  await page.locator("[data-delete-work-order]").click();
  await page.locator("[data-confirm-delete-work-order]").waitFor({ state: "visible", timeout: 15000 });
  await page.locator("[data-confirm-delete-work-order]").click();
  await page.waitForTimeout(5000);

  const remainingHeading = await page.getByRole("heading", { name: token, exact: true }).count();
  const appTag = await page.locator('script[src*="app.js?v="]').evaluate((element) => element.getAttribute("src")).catch(() => "");
  console.log(JSON.stringify({ token, status, remainingHeading, appTag, logs }, null, 2));
  await browser.close();

  if (remainingHeading !== 0 || logs.length) process.exit(1);
})().catch(async (error) => {
  console.error(JSON.stringify({ token, error: error.message, stack: error.stack }, null, 2));
  process.exit(1);
});
