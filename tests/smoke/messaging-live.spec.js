const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

// Explicit opt-in only. The manifest lists disposable rows for scoped DBA cleanup.
test("messaging lifecycle on the isolated testing platform", async ({ browser, request }) => {
  test.skip(process.env.LFES_MESSAGING_MUTATIONS !== "1", "Requires an explicit disposable QA run and cleanup");
  test.setTimeout(240000);
  const url = process.env.LFES_SUPABASE_URL;
  const company = process.env.LFES_QA_COMPANY_ID;
  expect(new URL(url).hostname).toBe("fsxqrngpaseqdxijggcm.supabase.co");
  expect(company).toBe("0d6fd8f1-428d-4192-8176-48943e3ec119");
  const key = process.env.LFES_SUPABASE_ANON_KEY;
  async function login(prefix) {
    const response = await request.post(`${url}/auth/v1/token?grant_type=password`, {
      headers: { apikey: key }, data: { email: process.env[`${prefix}_EMAIL`], password: process.env[`${prefix}_PASSWORD`] },
    });
    expect(response.status(), `${prefix} QA login`).toBe(200);
    return response.json();
  }
  const admin = await login("LFES_ADMIN");
  const tech = await login("LFES_TECHNICIAN");
  const accounting = await login("LFES_ACCOUNTING");
  async function rest(session, method, table, data) {
    const response = await request.fetch(`${url}/rest/v1/${table}`, {
      method, headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, Prefer: method === "POST" ? "return=minimal" : "return=representation" }, data,
    });
    expect(response.ok(), `${method} ${table.split("?")[0]} (${response.status()})`).toBeTruthy();
    return response.status() === 201 || response.status() === 204 ? [] : response.json();
  }
  const prefix = `LFES Messaging ${randomUUID()}`;
  const threads = Array.from({ length: 13 }, (_, index) => ({ id: randomUUID(), company_id: company,
    thread_type: "direct", title: `${prefix} ${String(index + 1).padStart(2, "0")}`, created_by: admin.user.id }));
  const evidenceDir = path.resolve("lfes-evidence");
  fs.mkdirSync(evidenceDir, { recursive: true });
  fs.writeFileSync(path.join(evidenceDir, "messaging-fixtures.json"), JSON.stringify({ company, prefix, threadIds: threads.map((thread) => thread.id) }, null, 2));
  await rest(admin, "POST", "message_threads", threads);
  await rest(admin, "POST", "message_thread_members", threads.flatMap((thread) => [admin, tech].map((session) => ({
    company_id: company, thread_id: thread.id, user_id: session.user.id,
  }))));
  await rest(admin, "POST", "messages", threads.flatMap((thread, index) => Array.from({ length: index === 0 ? 55 : 1 }, (_, n) => ({
    company_id: company, thread_id: thread.id, sender_id: admin.user.id, body: `${prefix} instruction ${index}-${n}`,
    created_at: new Date(Date.now() - (60 - n) * 60000).toISOString(),
  }))));
  expect(await rest(accounting, "GET", `message_threads?id=eq.${threads[0].id}&select=id`)).toEqual([]);
  const errors = [];
  async function open(session, mobile = false) {
    const context = await browser.newContext(mobile ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(({ session, company }) => {
      localStorage.setItem("sb-fsxqrngpaseqdxijggcm-auth-token", JSON.stringify(session));
      localStorage.setItem("maintainops.activeCompanyId", company);
      localStorage.setItem("maintainops.activeSection", "messages");
    }, { session, company });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(process.env.MAINTAINOPS_BASE_URL, { waitUntil: "load" });
    await expect(page.locator(".message-center")).toBeVisible({ timeout: 45000 });
    await expect(page.locator("[data-message-thread]").first()).toBeVisible({ timeout: 30000 });
    return { context, page };
  }
  const { context, page } = await open(tech);
  const dataCalls = [];
  page.on("request", (req) => { if (req.url().includes("/rest/v1/")) dataCalls.push(new URL(req.url()).pathname); });
  await page.getByRole("searchbox", { name: "Search subjects or people" }).fill(prefix);
  await expect(page.locator("[data-message-thread]")).toHaveCount(12);
  await page.locator('[data-list-page="messages"][data-page-direction="next"]').click();
  await expect(page.locator("[data-message-thread]")).toHaveCount(1);
  await page.locator("#message-search").fill(threads[0].title);
  await page.locator(`[data-message-thread="${threads[0].id}"]`).click();
  await expect(page.locator(".message-bubble")).toHaveCount(50);
  expect(await page.locator(".message-list").evaluate((node) => node.scrollTop > 0)).toBe(true);
  await expect(page.locator(".message-chat-header")).toContainText("55 messages");
  await page.getByRole("button", { name: "Earlier messages" }).click();
  await expect(page.locator(".message-bubble")).toHaveCount(55);
  await expect(page.getByRole("button", { name: "Earlier messages" })).toHaveCount(0);
  const reply = page.getByRole("textbox", { name: "Reply", exact: true });
  await reply.fill("Draft survives filtering");
  await page.locator("#message-search").fill("does not match");
  await expect(reply).toHaveValue("Draft survives filtering");
  await page.locator("#message-search").fill(prefix);
  await expect(reply).toHaveValue("Draft survives filtering");
  await page.locator("#message-thread-form summary").click();
  await page.locator('#message-thread-form input[name="title"]').fill("Unsent subject");
  await page.locator('#message-thread-form textarea').fill("Unsent first message");
  await page.locator('[data-message-filter="direct"]').click();
  await expect(page.locator('#message-thread-form input[name="title"]')).toHaveValue("Unsent subject");
  await expect(page.locator('#message-thread-form textarea')).toHaveValue("Unsent first message");
  await page.locator("#message-thread-form summary").click();
  const sentBody = `${prefix} reply after timestamp failure`;
  await reply.fill(sentBody);
  await page.route("**/rest/v1/message_threads?**", async (route) => {
    if (route.request().method() === "PATCH") await route.fulfill({ status: 503, contentType: "application/json", body: '{"message":"injected timestamp failure"}' });
    else await route.continue();
  });
  dataCalls.length = 0;
  await page.getByRole("button", { name: "Send Reply", exact: true }).click();
  await expect(page.locator(".message-bubble p").filter({ hasText: sentBody })).toHaveCount(1);
  await expect(reply).toHaveValue("");
  expect(dataCalls.filter((endpoint) => /\/(assets|work_orders|profiles|parts|company_members)$/.test(endpoint))).toEqual([]);
  expect(await rest(admin, "GET", `messages?thread_id=eq.${threads[0].id}&sender_id=eq.${tech.user.id}&select=id`)).toHaveLength(1);
  await page.unroute("**/rest/v1/message_threads?**");
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator(".message-bubble.mine").getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.locator(".message-bubble p").filter({ hasText: sentBody })).toHaveCount(0);
  await expect(page.locator(".message-chat-header")).toContainText("55 messages");
  await expect.poll(() => page.locator(".save-overlay").evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).opacity === "0"))).toBe(true);
  await page.screenshot({ path: path.join(evidenceDir, "messaging-desktop.png"), fullPage: true });
  const mobile = await open(tech, true);
  await mobile.page.locator("#message-search").fill(threads[0].title);
  await mobile.page.locator(`[data-message-thread="${threads[0].id}"]`).click();
  await expect(mobile.page.locator(".message-thread-rail")).toBeHidden();
  await expect(mobile.page.getByRole("textbox", { name: "Reply", exact: true })).toBeVisible();
  expect(await mobile.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await mobile.page.locator(".message-list").evaluate((list) => { list.scrollTop = 0; });
  await mobile.page.getByRole("button", { name: "Earlier messages" }).click();
  await expect(mobile.page.locator(".message-bubble")).toHaveCount(55);
  await mobile.page.screenshot({ path: path.join(evidenceDir, "messaging-mobile.png"), fullPage: true });
  await mobile.page.getByRole("button", { name: "Back to conversations" }).click();
  await expect(mobile.page.locator(".message-thread-rail")).toBeVisible();
  await expect(mobile.page.locator(".message-thread-detail")).toBeHidden();
  // New-thread retry must finish the same thread, not create an abandoned duplicate.
  await page.locator("#message-thread-form summary").click();
  await page.locator("#message-thread-type").selectOption("direct");
  await page.locator('#message-thread-form select[name="direct_user_id"]').selectOption(admin.user.id);
  await page.locator('#message-thread-form input[name="title"]').fill(`${prefix} created in browser`);
  const workOption = page.locator('#message-thread-form select[name="work_order_id"] option').nth(1);
  const linkedOrderId = await workOption.getAttribute("value");
  expect(linkedOrderId).toBeTruthy();
  await page.locator('#message-thread-form select[name="work_order_id"]').selectOption(linkedOrderId);
  await page.locator('#message-thread-form textarea').fill("First browser message");
  let memberAttempts = 0;
  await page.route("**/rest/v1/message_thread_members*", async (route) => {
    if (route.request().method() === "POST" && memberAttempts++ === 0) {
      await route.fulfill({ status: 503, contentType: "application/json", body: '{"message":"Injected member save failure"}' });
    } else await route.continue();
  });
  await page.getByRole("button", { name: "Start Thread", exact: true }).click();
  await expect(page.locator("#message-thread-error")).toContainText("Injected member save failure");
  await expect(page.locator('#message-thread-form textarea')).toHaveValue("First browser message");
  await page.getByRole("button", { name: "Start Thread", exact: true }).click();
  await expect(page.locator(".message-chat-header")).toContainText("created in browser");
  expect(await rest(admin, "GET", `message_threads?title=eq.${encodeURIComponent(`${prefix} created in browser`)}&select=id`)).toHaveLength(1);
  await page.unroute("**/rest/v1/message_thread_members*");
  await page.getByRole("button", { name: "Open Work Order", exact: true }).click();
  await expect(page.locator("#quick-update-work-order-form")).toBeVisible();
  await page.locator('[data-section="messages"]').click();
  await expect(page.locator(".message-center")).toBeVisible();
  await page.locator("#message-thread-form summary").click();
  await page.locator("#message-thread-type").selectOption("location");
  await page.locator('#message-thread-form input[name="title"]').fill(`${prefix} company location topic`);
  await page.locator('#message-thread-form textarea').fill("Location topic visible to the company team");
  await page.getByRole("button", { name: "Start Thread", exact: true }).click();
  await expect(page.locator(".message-chat-header")).toContainText("company location topic");
  const readonly = await open(accounting);
  await readonly.page.locator("#message-search").fill(`${prefix} company location topic`);
  await readonly.page.locator("[data-message-thread]").click();
  await expect(readonly.page.locator(".message-bubble")).toHaveCount(1);
  await expect(readonly.page.locator("#message-reply-form, #message-thread-form, [data-message-person], [data-delete-message]")).toHaveCount(0);
  await page.locator("#message-search").fill(threads[0].title);
  await page.locator(`[data-message-thread="${threads[0].id}"]`).click();
  await page.getByRole("button", { name: "Hide conversation", exact: true }).click();
  await expect(page.locator(`[data-message-thread="${threads[0].id}"]`)).toHaveCount(0);
  expect(await rest(admin, "GET", `message_threads?id=eq.${threads[0].id}&select=id`)).toHaveLength(1);
  expect(errors).toEqual([]);
  fs.writeFileSync(path.join(evidenceDir, "messaging-proof.json"), JSON.stringify({ prefix, threadCount: 13, historyCount: 55,
    desktop: true, mobile: true, draftRetention: true, timestampFailureDoesNotDuplicate: true,
    partialCreateRetry: true, workOrderLink: true, accountingReadOnly: true, scopedReload: true, errors }, null, 2));
  await context.close();
  await mobile.context.close();
  await readonly.context.close();
});
