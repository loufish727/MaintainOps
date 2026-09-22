const { test, expect } = require("@playwright/test");

test("same-browser account switching uses the user's own location, including legacy recovery", async ({ browser, request }, testInfo) => {
  test.setTimeout(150000);
  const host = "https://fsxqrngpaseqdxijggcm.supabase.co";
  const company = "0d6fd8f1-428d-4192-8176-48943e3ec119";
  const baseURL = process.env.MAINTAINOPS_BASE_URL;
  expect(process.env.LFES_SUPABASE_URL).toBe(host);
  expect(process.env.LFES_QA_COMPANY_ID).toBe(company);
  expect(new URL(baseURL).hostname).toBe("127.0.0.1");
  const config = await (await request.get(`${baseURL}supabase-config.js`)).text();
  expect(config).toContain(host);
  expect(config).not.toContain("lbphkzznvvumemdkqoay");
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  const sessions = {};
  for (const role of ["ADMIN", "TECHNICIAN"]) {
    const response = await request.post(`${host}/auth/v1/token?grant_type=password`, {
      headers: { apikey: key }, data: { email: process.env[`LFES_${role}_EMAIL`], password: process.env[`LFES_${role}_PASSWORD`] },
    });
    expect(response.ok(), `QA ${role} authentication`).toBe(true);
    sessions[role] = await response.json();
  }
  const api = async (role, resource, data) => {
    const response = await request.fetch(`${host}/rest/v1/${resource}`, {
      method: data ? "POST" : "GET", data,
      headers: { apikey: key, Authorization: `Bearer ${sessions[role].access_token}` },
    });
    expect(response.ok(), `QA fixture read ${resource}`).toBe(true);
    return response.json();
  };
  const membership = (await api("TECHNICIAN", "rpc/get_my_companies", {})).find(row => row.id === company);
  const locations = await api("ADMIN", `locations?company_id=eq.${company}&select=id,name&order=name`);
  const assigned = locations.find(row => row.id === membership.default_location_id);
  const other = locations.find(row => row.id !== assigned?.id);
  expect(assigned, "QA technician must have an assigned default").toBeTruthy();
  expect(other, "QA must provide a second location for the account-switch regression").toBeTruthy();
  const contexts = [], errors = [];
  async function open() {
    const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 } });
    contexts.push(context);
    await context.route("https://lbphkzznvvumemdkqoay.supabase.co/**", route => {
      errors.push("Production request blocked");
      return route.abort();
    });
    await context.addInitScript(id => localStorage.setItem("maintainops.activeCompanyId", id), company);
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    let pending = 0, changedAt = Date.now();
    page.on("request", () => { pending++; changedAt = Date.now(); });
    const finished = () => { pending = Math.max(0, pending - 1); changedAt = Date.now(); };
    page.on("requestfinished", finished);
    page.on("requestfailed", finished);
    page.qaSettle = () => expect.poll(() => pending === 0 && Date.now() - changedAt >= 400, { timeout: 20000 }).toBe(true);
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(baseURL);
    await expect(page.getByRole("button", { name: "Log In", exact: true })).toBeVisible();
    return page;
  }
  async function signIn(page, role) {
    await page.getByLabel("Email", { exact: true }).fill(process.env[`LFES_${role}_EMAIL`]);
    await page.getByLabel("Password", { exact: true }).fill(process.env[`LFES_${role}_PASSWORD`]);
    await page.getByRole("button", { name: "Log In", exact: true }).click();
    await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });
    await expect(page.locator("#company-select")).toHaveValue(company);
    await page.qaSettle();
    await expect(page.locator("body")).not.toContainText("Could not load requests:");
  }
  async function signOut(page) {
    // Mobile's sign-out control lives inside the workspace menu.
    const button = page.locator('[data-sign-out]').filter({ visible: true }).first();
    if (!await button.count()) {
      await page.locator(".sidebar-controls > summary").click();
    }
    await page.locator('[data-sign-out]').filter({ visible: true }).first().click();
    await expect(page.getByRole("button", { name: "Log In", exact: true })).toBeVisible({ timeout: 20000 });
  }
  const selector = page => page.locator("[data-location-select]").filter({ visible: true });
  try {
    const page = await open();
    await signIn(page, "ADMIN");
    await page.locator(".sidebar-controls > summary").click();
    await selector(page).selectOption(other.id);
    // The select value changes before its work/request queue reloads replace the shell.
    await page.qaSettle();
    await expect(selector(page)).toHaveValue(other.id);
    await expect(page.locator(".sidebar-controls")).toHaveAttribute("open", "");
    await signOut(page);
    await page.evaluate(({ user, company, other }) => {
      localStorage.setItem("maintainops.activeLocationId", other);
      localStorage.setItem(`maintainops.activeLocationId:${user}:${company}`, other);
    }, { user: sessions.TECHNICIAN.user.id, company, other: other.id });
    await signIn(page, "TECHNICIAN");
    await expect(selector(page)).toHaveValue(assigned.id);
    await page.screenshot({ path: testInfo.outputPath("same-browser-technician-default.png"), fullPage: true });
    await signOut(page);
    await signIn(page, "ADMIN");
    await expect(selector(page)).toHaveValue(other.id);
    await page.reload();
    await expect(selector(page)).toHaveValue(other.id, { timeout: 45000 });

    const fresh = await open();
    await signIn(fresh, "TECHNICIAN");
    await expect(selector(fresh)).toHaveValue(assigned.id);
    expect(errors).toEqual([]);
  } finally {
    for (const context of contexts) await context.close();
  }
});
