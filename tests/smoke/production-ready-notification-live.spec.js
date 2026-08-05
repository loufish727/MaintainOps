const { expect, test } = require("@playwright/test");

const requiredEnvironment = [
  "LFES_SUPABASE_URL",
  "LFES_SUPABASE_ANON_KEY",
  "LFES_QA_COMPANY_ID",
  "LFES_ADMIN_EMAIL",
  "LFES_ADMIN_PASSWORD",
  "LFES_PRODUCTION_EMAIL",
  "LFES_PRODUCTION_PASSWORD",
  "LFES_TECHNICIAN_EMAIL",
  "LFES_TECHNICIAN_PASSWORD",
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

async function signInUi(page, email, password, marker) {
  await page.goto(`?lfes-production-ready=${marker}`, { waitUntil: "load" });
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.locator('[data-section="mywork"]')).toBeVisible({ timeout: 45000 });
}

async function waitForNotification(session, workOrderId) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 15000) {
    const rows = await rest(
      session,
      `work_order_notifications?select=*&work_order_id=eq.${workOrderId}&recipient_id=eq.${session.user.id}`
    );
    if (rows.length) return rows;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production Ready notification did not reach the assigned technician.");
}

test.describe("Production Ready signed-in notification lifecycle", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(() => {
    const missing = requiredEnvironment.filter((name) => !process.env[name]);
    if (missing.length) throw new Error(`Production Ready proof requires: ${missing.join(", ")}`);
  });

  test("Production completion alerts the assigned technician without email or a status change", async ({ browser, baseURL }) => {
    test.setTimeout(180000);
    const marker = `LFES Production Ready ${Date.now()}`;
    let fixtureId = "";
    let productionContext;
    let technicianContext;

    const admin = await signInApi(process.env.LFES_ADMIN_EMAIL, process.env.LFES_ADMIN_PASSWORD);
    const production = await signInApi(process.env.LFES_PRODUCTION_EMAIL, process.env.LFES_PRODUCTION_PASSWORD);
    const technician = await signInApi(process.env.LFES_TECHNICIAN_EMAIL, process.env.LFES_TECHNICIAN_PASSWORD);

    try {
      const memberships = await rest(
        admin,
        `company_members?select=user_id,default_location_id&company_id=eq.${companyId}&user_id=in.(${production.user.id},${technician.user.id})`
      );
      const productionLocation = memberships.find((row) => row.user_id === production.user.id)?.default_location_id || "";
      const technicianLocation = memberships.find((row) => row.user_id === technician.user.id)?.default_location_id || "";
      expect(productionLocation, "Production QA user needs a default test location").toBeTruthy();
      expect(technicianLocation, "Technician QA user needs a default test location").toBe(productionLocation);

      const created = await rest(admin, "work_orders?select=id,title,status,assigned_to", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          company_id: companyId,
          location_id: productionLocation,
          assigned_to: technician.user.id,
          title: marker,
          description: "Disposable authenticated LFES notification proof.",
          type: "corrective",
          status: "open",
          priority: "medium",
          created_by: admin.user.id,
          production_action: "Confirm the line is ready for Maintenance.",
          production_action_assigned_to: production.user.id,
          production_action_status: "open",
          production_action_created_by: admin.user.id,
          production_action_created_at: new Date().toISOString(),
        }),
        label: "create disposable work order",
      });
      fixtureId = created[0]?.id || "";
      expect(fixtureId).toBeTruthy();

      productionContext = await browser.newContext({ baseURL });
      const productionPage = await productionContext.newPage();
      const forbiddenDeliveryRequests = [];
      productionPage.on("request", (request) => {
        const url = request.url();
        if (
          url.includes("/functions/v1/request-emailer")
          || url.includes("/rest/v1/request_notification_outbox")
          || url.includes("/rest/v1/email_outbox")
        ) {
          forbiddenDeliveryRequests.push(`${request.method()} ${url}`);
        }
      });

      await signInUi(
        productionPage,
        process.env.LFES_PRODUCTION_EMAIL,
        process.env.LFES_PRODUCTION_PASSWORD,
        `production-${Date.now()}`
      );
      const productionCard = productionPage.locator(`.work-card[data-id="${fixtureId}"]`);
      await expect(productionCard).toBeVisible();
      await productionCard.getByRole("button", { name: "Complete Production Action" }).click();
      await expect(productionCard).toHaveCount(0);
      expect(forbiddenDeliveryRequests, "Production completion must not call any email delivery path").toEqual([]);

      const notifications = await waitForNotification(technician, fixtureId);
      expect(notifications).toHaveLength(1);
      expect(notifications[0]).toMatchObject({
        company_id: companyId,
        work_order_id: fixtureId,
        recipient_id: technician.user.id,
        actor_id: production.user.id,
        kind: "production_action_completed",
        read_at: null,
      });

      const orderAfterCompletion = await rest(
        technician,
        `work_orders?select=id,status,assigned_to,production_action_status&id=eq.${fixtureId}`
      );
      expect(orderAfterCompletion).toEqual([{
        id: fixtureId,
        status: "open",
        assigned_to: technician.user.id,
        production_action_status: "completed",
      }]);

      technicianContext = await browser.newContext({ baseURL });
      const technicianPage = await technicianContext.newPage();
      const notificationUpdates = [];
      technicianPage.on("response", async (response) => {
        if (
          response.request().method() === "PATCH"
          && response.url().includes("/rest/v1/work_order_notifications")
        ) {
          notificationUpdates.push({
            status: response.status(),
            body: await response.text(),
          });
        }
      });
      await signInUi(
        technicianPage,
        process.env.LFES_TECHNICIAN_EMAIL,
        process.env.LFES_TECHNICIAN_PASSWORD,
        `technician-${Date.now()}`
      );
      const technicianCard = technicianPage.locator(`.work-card[data-id="${fixtureId}"]`);
      await expect(technicianCard).toBeVisible();
      await expect(technicianCard.getByText("Production Ready", { exact: true })).toBeVisible();

      await technicianPage.locator('[data-section="messages"]').click();
      await expect(technicianPage.getByRole("heading", { name: "Messages", exact: true, level: 2 })).toBeVisible();
      const notificationButton = technicianPage.locator(`[data-open-work-notification="${notifications[0].id}"]`);
      await expect(notificationButton).toBeVisible();
      await expect(notificationButton).toHaveClass(/unread/);
      await expect(notificationButton).toContainText(marker);
      await notificationButton.click();

      await expect(technicianPage.getByRole("heading", { name: "Work Order Detail", exact: true, level: 2 })).toBeVisible();
      await expect(technicianPage.locator("#detail-panel").getByRole("heading", { name: marker, exact: true, level: 2 })).toBeVisible();
      await expect.poll(async () => ({
        updates: notificationUpdates.length,
        notice: String(await technicianPage.locator("#app-notice-slot").textContent() || "").trim(),
      })).toEqual({ updates: 1, notice: "" });
      expect(notificationUpdates[0], "The recipient read marker must persist through RLS").toMatchObject({
        status: 200,
      });
      await expect.poll(async () => {
        const readNotifications = await rest(
          technician,
          `work_order_notifications?select=id,read_at&id=eq.${notifications[0].id}`
        );
        return readNotifications[0]?.read_at || "";
      }).not.toBe("");
    } finally {
      await productionContext?.close();
      await technicianContext?.close();
      if (fixtureId) {
        await rest(admin, `work_orders?id=eq.${fixtureId}`, {
          method: "DELETE",
          headers: { Prefer: "return=minimal" },
          label: "delete disposable work order",
        });
        const [orders, events, notifications] = await Promise.all([
          rest(admin, `work_orders?select=id&id=eq.${fixtureId}`),
          rest(admin, `work_order_events?select=id&work_order_id=eq.${fixtureId}`),
          rest(admin, `work_order_notifications?select=id&work_order_id=eq.${fixtureId}`),
        ]);
        expect({ orders, events, notifications }, "Disposable LFES data must be fully removed").toEqual({
          orders: [],
          events: [],
          notifications: [],
        });
      }
    }
  });
});
