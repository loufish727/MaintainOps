const { expect, test } = require("@playwright/test");

const requiredEnvironment = [
  "LFES_SUPABASE_URL",
  "LFES_SUPABASE_ANON_KEY",
  "LFES_QA_COMPANY_ID",
  "LFES_ADMIN_EMAIL",
  "LFES_ADMIN_PASSWORD",
  "LFES_PRODUCTION_EMAIL",
  "LFES_PRODUCTION_PASSWORD",
];

const supabaseUrl = process.env.LFES_SUPABASE_URL || "";
const anonKey = process.env.LFES_SUPABASE_ANON_KEY || "";
const companyId = process.env.LFES_QA_COMPANY_ID || "";

async function readJson(response, label) {
  const body = await response.text();
  const value = body ? JSON.parse(body) : null;
  if (!response.ok) {
    throw new Error(`${label} failed (${response.status}): ${value?.message || value?.error_description || body}`);
  }
  return value;
}

async function signInApi(email, password) {
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return readJson(response, "test-bed sign-in");
}

async function rest(session, path, options = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: anonKey,
      authorization: `Bearer ${session.access_token}`,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  return readJson(response, options.label || path.split("?")[0]);
}

test.describe("Production Action signed-in lifecycle", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(() => {
    const missing = requiredEnvironment.filter((name) => !process.env[name]);
    if (missing.length) throw new Error(`Production Action proof requires: ${missing.join(", ")}`);
  });

  test("Production work routes through My Work without changing work-order ownership", async ({ page, baseURL }) => {
    test.setTimeout(150000);
    const marker = `LFES Production action ${Date.now()}`;
    let fixtureId = "";
    const admin = await signInApi(process.env.LFES_ADMIN_EMAIL, process.env.LFES_ADMIN_PASSWORD);
    const production = await signInApi(process.env.LFES_PRODUCTION_EMAIL, process.env.LFES_PRODUCTION_PASSWORD);

    try {
      const memberships = await rest(
        admin,
        `company_members?select=user_id,default_location_id&company_id=eq.${companyId}&user_id=eq.${production.user.id}`
      );
      const locationId = memberships[0]?.default_location_id || "";
      expect(locationId, "Production QA user needs a default test location").toBeTruthy();

      const created = await rest(admin, "work_orders?select=id", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          company_id: companyId,
          location_id: locationId,
          title: marker,
          description: "Disposable authenticated LFES Production Action proof.",
          type: "corrective",
          status: "open",
          priority: "medium",
          created_by: admin.user.id,
        }),
        label: "create disposable Production Action work order",
      });
      fixtureId = created[0]?.id || "";
      expect(fixtureId).toBeTruthy();

      page.on("dialog", (dialog) => dialog.accept());
      await page.goto(`${baseURL}?lfes-production-action=${Date.now()}`, { waitUntil: "load" });
      await page.getByLabel("Email").fill(process.env.LFES_PRODUCTION_EMAIL);
      await page.getByLabel("Password").fill(process.env.LFES_PRODUCTION_PASSWORD);
      await page.getByRole("button", { name: "Log In" }).click();
      await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });

      await expect(page.locator('[data-section="financial"]')).toHaveCount(0);
      await expect(page.locator('[data-section="manager"]')).toHaveCount(0);
      await expect(page.locator('[data-section="setup"]')).toHaveCount(0);

      await page.locator('[data-section="work"]').click();
      await expect(page.getByRole("heading", { name: "Work Orders", exact: true, level: 2 })).toBeVisible();
      const workCard = page.locator(`.work-card[data-id="${fixtureId}"]`);
      await expect(workCard).toBeVisible();

      const actionForm = workCard.locator(`[data-production-action-form="${fixtureId}"]`).first();
      const actionField = actionForm.locator('[name="production_action"]');
      if (!await actionField.isVisible()) {
        await actionForm.locator("xpath=ancestor::details[1]/summary").click();
      }
      await actionField.fill(marker);
      await actionForm.locator('[name="production_action_assigned_to"]').selectOption(production.user.id);
      await actionForm.getByRole("button", { name: /Production Action/ }).click();
      await expect(workCard.locator(".production-action-text").filter({ hasText: marker })).toBeVisible();
      await expect(workCard.locator('[data-quick-status="completed"]')).toHaveCount(0);

      await page.locator('[data-section="team"]').click();
      const productionMember = page.locator(".member-card").filter({ hasText: process.env.LFES_PRODUCTION_EMAIL });
      await expect(productionMember).toBeVisible();
      await productionMember.getByRole("button", { name: "View Work" }).click();
      await expect(workCard).toBeVisible();

      await page.locator('[data-section="mywork"]').click();
      const myWorkCard = page.locator(`.work-card[data-id="${fixtureId}"]`);
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
      await detail.locator(`[data-production-action-remove="${fixtureId}"]`).click();
      await expect(page.locator(".production-action-text").filter({ hasText: marker })).toHaveCount(0);
      await expect(page.getByText("No Production Action is assigned.", { exact: true })).toBeVisible();
    } finally {
      if (fixtureId) {
        await rest(admin, `work_orders?id=eq.${fixtureId}`, {
          method: "DELETE",
          headers: { Prefer: "return=minimal" },
          label: "delete disposable Production Action work order",
        });
        const [orders, events, notifications] = await Promise.all([
          rest(admin, `work_orders?select=id&id=eq.${fixtureId}`),
          rest(admin, `work_order_events?select=id&work_order_id=eq.${fixtureId}`),
          rest(admin, `work_order_notifications?select=id&work_order_id=eq.${fixtureId}`),
        ]);
        expect({ orders, events, notifications }, "Disposable LFES Production Action data must be fully removed").toEqual({
          orders: [],
          events: [],
          notifications: [],
        });
      }
    }
  });
});
