const { expect, test } = require("@playwright/test");

const roles = [
  { name: "admin", prefix: "LFES_ADMIN", financial: "edit", operational: "edit", managerDashboard: true },
  { name: "manager", prefix: "LFES_MANAGER", financial: "read", operational: "edit", managerDashboard: false },
  { name: "accounting", prefix: "LFES_ACCOUNTING", financial: "edit", operational: "read", managerDashboard: false },
  { name: "technician", prefix: "LFES_TECHNICIAN", financial: "none", operational: "edit", managerDashboard: false },
].map((role) => ({
  ...role,
  email: process.env[`${role.prefix}_EMAIL`] || "",
  password: process.env[`${role.prefix}_PASSWORD`] || "",
}));

const missingCredentials = roles.flatMap((role) => [
  ...(!role.email ? [`${role.prefix}_EMAIL`] : []),
  ...(!role.password ? [`${role.prefix}_PASSWORD`] : []),
]);

async function signIn(page, role) {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`?lfes-auth-role=${role.name}-${Date.now()}`, { waitUntil: "load" });
  await expect(page.getByRole("button", { name: "Log In" })).toBeVisible({ timeout: 30000 });
  await page.getByLabel("Email").fill(role.email);
  await page.getByLabel("Password").fill(role.password);
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });
  expect(pageErrors, `page errors while signing in as ${role.name}`).toEqual([]);
  return pageErrors;
}

test.describe("MaintainOps authenticated role proof", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(() => {
    if (missingCredentials.length) {
      throw new Error(`Authenticated LFES requires: ${missingCredentials.join(", ")}`);
    }
  });

  for (const role of roles) {
    test(`${role.name} navigation and permission surfaces match the role contract`, async ({ page }) => {
      test.setTimeout(150000);
      const pageErrors = await signIn(page, role);

      for (const section of ["mywork", "work", "planning", "requests", "assets", "team"]) {
        await expect(page.locator(`[data-section="${section}"]`)).toBeVisible();
      }

      await page.locator('[data-section="planning"]').click();
      await expect(page.getByRole("heading", { name: "Planning", exact: true })).toBeVisible();
      await expect(page.getByText("No Due Date", { exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Current schedule", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Upcoming", exact: true })).toBeVisible();
      if (role.operational === "read") {
        await expect(page.locator("[data-planning-due-form]")).toHaveCount(0);
      }

      const financialNav = page.locator('[data-section="financial"]');
      if (role.financial === "none") {
        await expect(financialNav).toHaveCount(0);
      } else {
        await expect(financialNav).toBeVisible();
        await financialNav.click();
        await expect(page.getByRole("heading", { name: "Financial", exact: true })).toBeVisible();
        await expect(page.locator('[data-financial-filter="missing"]')).toBeVisible();
        const financialCards = page.locator("[data-open-financial-asset]");
        await expect(financialCards.first(), `${role.name} QA fixture needs at least one financial equipment card`).toBeVisible();
        await financialCards.first().click();
        await expect(page.getByRole("heading", { name: "Financial Detail", exact: true })).toBeVisible();
        if (role.financial === "edit") {
          await expect(page.locator(".financial-asset-form")).toBeVisible();
          await expect(page.getByRole("button", { name: "Save Financial Info" })).toBeEnabled();
        } else {
          await expect(page.locator(".financial-readonly-list")).toBeVisible();
          await expect(page.locator(".financial-asset-form")).toHaveCount(0);
        }
      }

      await page.locator('[data-section="team"]').click();
      await expect(page.getByRole("heading", { name: "Team", exact: true })).toBeVisible();
      const memberCards = page.locator(".member-card");
      await expect(memberCards.first()).toBeVisible();
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ New/);
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ In Progress/);
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ Blocked/);
      await expect(memberCards.first().locator(".member-workload")).toContainText(/\d+ Completed/);

      const managerNav = page.locator('[data-section="manager"]');
      if (role.managerDashboard) await expect(managerNav).toBeVisible();
      else await expect(managerNav).toHaveCount(0);

      if (role.operational === "read") {
        await page.locator('[data-section="assets"]').click();
        const assetCards = page.locator("[data-asset-id]");
        await expect(assetCards.first()).toBeVisible();
        await assetCards.first().click();
        await expect(page.getByText(/Accounting has read-only equipment access/)).toBeVisible();
      }

      expect(pageErrors, `page errors while checking ${role.name}`).toEqual([]);
    });
  }
});
