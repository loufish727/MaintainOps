const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const serviceSource = fs.readFileSync(path.join(root, "src/services/maintenanceRelations.mjs"), "utf8");

async function fixture(page, ids = ["linked"]) {
  // No app startup, credentials, hosted pages, or real API requests are used.
  await page.route("**/*", route => route.abort());
  await page.setContent('<!doctype html><main><input aria-label="Unsaved draft"><div id="relations"></div></main>');
  await page.addScriptTag({ path: path.join(root, "src/render/maintenanceListDisplay.js") });
  await page.addScriptTag({ type: "module", content: `${serviceSource}\nwindow.createMaintenanceRelations = createMaintenanceRelations;` });
  await page.evaluate(ids => {
    let scope = "user:company:north:1", companyId = "company";
    const calls = { rpc: [], history: [], timeouts: [] }, opened = [];
    const rpcPending = [], historyPending = [], openPending = [];
    let deferOpen = false;
    function pending(queue, call, kind) {
      calls[kind].push(call);
      return new Promise((resolve, reject) => queue.push({ resolve, reject }));
    }
    const client = {
      rpc(name, args) { return pending(rpcPending, { name, args }, "rpc"); },
      from(table) {
        const call = { table, filters: [], orders: [] };
        return {
          select(columns, options) { Object.assign(call, { columns, options }); return this; },
          eq(column, value) { call.filters.push([column, value]); return this; },
          order(column, options) { call.orders.push([column, options || null]); return this; },
          range(start, end) { call.range = [start, end]; return pending(historyPending, call, "history"); },
        };
      },
    };
    const relations = window.createMaintenanceRelations({
      documentRef: document,
      getScope: () => scope,
      getCompanyId: () => companyId,
      client: () => client,
      withOperationTimeout(value, message, ms) { calls.timeouts.push({ message, ms }); return value; },
      openWorkOrder: id => {
        opened.push(id);
        if (deferOpen) return new Promise((resolve, reject) => openPending.push({ resolve, reject }));
      },
    });
    const display = window.MaintainOpsMaintenanceListDisplay.createMaintenanceListDisplayHelpers({
      escapeHtml: value => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
      getDueState: () => null,
      canDeleteOperationalRecords: () => true,
      canEditOperationalRecords: () => true,
      getPendingDeleteProcedureId: () => "",
      getPendingDeleteScheduleId: () => "",
      getProcedureLinkCounts: id => relations.getProcedureCounts(id),
      getWorkOrders: () => [{ id: "only-cached-work", procedure_template_id: "linked" }],
      getPreventiveSchedules: () => [],
      procedureDeleteBlockerMessage: ({ workOrders, schedules }) => workOrders || schedules ? "Linked records must be retained" : "",
    });
    function render() {
      document.querySelector("#relations").innerHTML = ids.map(id => display.renderProcedureTemplate({ id, name: id, procedure_steps: [] })).join("")
        + display.renderPreventiveSchedule({ id: "pm-1", title: "Monthly inspection", frequency: "monthly", next_due_at: "2026-09-30" });
    }
    window.relationsTest = {
      calls, opened, relations, render,
      resolveRpc: (index, result) => rpcPending[index].resolve(result),
      rejectRpc: (index, message) => rpcPending[index].reject(new Error(message)),
      resolveHistory: (index, result) => historyPending[index].resolve(result),
      rejectHistory: (index, message) => historyPending[index].reject(new Error(message)),
      deferOpen() { deferOpen = true; },
      resolveOpen: index => openPending[index].resolve(),
      rejectOpen: (index, message) => openPending[index].reject(new Error(message)),
      switchScope(next, company = "company") { scope = next; companyId = company; },
      startHistory(page = 1) { void relations.loadHistory(document.querySelector("[data-pm-history]"), page); },
    };
    render();
    relations.bind();
  }, ids);
}

async function resolveRpc(page, index, data) {
  await page.evaluate(({ index, data }) => relationsTest.resolveRpc(index, { data, error: null }), { index, data });
}

async function resolveHistory(page, index, result) {
  await expect.poll(() => page.evaluate(() => relationsTest.calls.history.length)).toBeGreaterThan(index);
  await page.evaluate(({ index, result }) => relationsTest.resolveHistory(index, result), { index, result });
}

async function openHistory(page) {
  const before = await page.evaluate(() => relationsTest.calls.history.length);
  await page.locator("[data-pm-history] summary").click();
  await expect.poll(() => page.evaluate(() => relationsTest.calls.history.length)).toBe(before + 1);
}

function historyRows(count = 25) {
  return Array.from({ length: count }, (_, i) => ({
    id: `work-${i + 1}`, title: i === 0 ? "Inspect <img src=x>" : `Generated work ${i + 1}`,
    status: i % 2 ? "completed" : "in_progress", due_at: i === 0 ? null : "2026-09-30",
    preventive_due_at: "2026-08-31", completed_at: i % 2 ? "2026-09-22T12:00:00Z" : null,
  }));
}

test("RPC totals replace unknown counts, not partial caches; reads preserve draft focus and delete safety", async ({ page }) => {
  await fixture(page, ["linked", "empty", "schedule-only"]);
  await expect(page.locator('[data-procedure-links="linked"]')).toHaveText("Loading work links...");
  await expect(page.locator('[data-delete-procedure="linked"]')).toBeDisabled();
  await page.getByRole("textbox", { name: "Unsaved draft" }).fill("Unsaved edit");
  await page.getByRole("textbox", { name: "Unsaved draft" }).evaluate(node => {
    window.originalDraft = node;
    node.setSelectionRange(2, 5);
  });
  await page.evaluate(() => relationsTest.relations.bind());
  expect(await page.evaluate(() => relationsTest.calls.rpc)).toEqual([{
    name: "get_procedure_link_counts", args: { p_company_id: "company", p_template_ids: ["linked", "empty", "schedule-only"] },
  }]);
  await resolveRpc(page, 0, [
    { procedure_template_id: "linked", work_order_count: 1203, schedule_count: 47 },
    { procedure_template_id: "empty", work_order_count: 0, schedule_count: 0 },
    { procedure_template_id: "schedule-only", work_order_count: "0", schedule_count: "2" },
  ]);
  await expect(page.locator('[data-procedure-links="linked"]')).toHaveText("1203 linked work orders");
  await expect(page.locator(".procedure-card").filter({ has: page.locator('[data-procedure-links="linked"]') }).locator("[data-procedure-schedules]")).toHaveText("47 PM schedules");
  await expect(page.locator('[data-delete-procedure="linked"]')).toHaveText("Kept For Traceability");
  await expect(page.locator('[data-delete-procedure="linked"]')).toBeDisabled();
  await expect(page.locator('[data-delete-procedure="schedule-only"]')).toBeDisabled();
  await expect(page.locator('[data-delete-procedure="empty"]')).toBeEnabled();
  await expect(page.locator('[data-procedure-links="empty"]')).toHaveText("0 linked work orders");
  expect(await page.getByRole("textbox", { name: "Unsaved draft" }).evaluate(node => [node === window.originalDraft, document.activeElement === node, node.value, node.selectionStart, node.selectionEnd])).toEqual([true, true, "Unsaved edit", 2, 5]);
  await page.evaluate(() => relationsTest.relations.loadCounts(["linked", "linked"]));
  expect(await page.evaluate(() => relationsTest.calls.rpc.length)).toBe(1);
  expect(await page.evaluate(() => relationsTest.calls.history.length)).toBe(0);
});

const badCounts = [
  ["RPC error", { data: null, error: { message: "Denied" } }],
  ["missing row", { data: [], error: null }],
  ["missing data", { data: null, error: null }],
  ...[
    ["missing field", undefined], ["negative", -1], ["fractional", 1.5], ["unsafe integer", 9007199254740992],
    ["nonnumeric", "unknown"], ["null", null], ["blank", ""], ["boolean", false],
  ].map(([name, value]) => [name, { data: [{ procedure_template_id: "linked", work_order_count: value, schedule_count: 0 }], error: null }]),
];
for (const [name, result] of badCounts) {
  test(`unavailable procedure counts never imply zero or enable deletion: ${name}`, async ({ page }) => {
    await fixture(page);
    await page.evaluate(result => relationsTest.resolveRpc(0, result), result);
    expect(await page.evaluate(() => relationsTest.relations.getProcedureCounts("linked")?.status)).toBe("error");
    await expect(page.locator("[data-procedure-links]")).toHaveText("Work links unavailable");
    await expect(page.locator("[data-procedure-schedules]")).toHaveText("PM links unavailable");
    await expect(page.locator("[data-delete-procedure]")).toBeDisabled();
    await expect(page.locator(".procedure-card")).not.toContainText("0 linked work orders");
    await expect(page.locator(".procedure-card")).not.toContainText("0 PM schedules");
  });
}

test("a rejected count request remains unavailable and is not retried on each bind", async ({ page }) => {
  await fixture(page);
  await page.evaluate(() => relationsTest.rejectRpc(0, "Procedure links timed out."));
  await expect(page.locator("[data-procedure-links]")).toHaveText("Work links unavailable");
  await expect(page.locator("[data-delete-procedure]")).toBeDisabled();
  await page.evaluate(() => relationsTest.relations.bind());
  expect(await page.evaluate(() => relationsTest.calls.rpc.length)).toBe(1);
});

for (const staleError of [false, true]) {
  test(`old-scope count ${staleError ? "errors" : "successes"} cannot overwrite current counts`, async ({ page }) => {
    await fixture(page);
    await page.evaluate(() => {
      relationsTest.switchScope("other-user:other-company:south:2", "other-company");
      relationsTest.render();
      relationsTest.relations.bind();
    });
    await resolveRpc(page, 1, [{ procedure_template_id: "linked", work_order_count: 7, schedule_count: 3 }]);
    if (staleError) await page.evaluate(() => relationsTest.rejectRpc(0, "Old error"));
    else await resolveRpc(page, 0, [{ procedure_template_id: "linked", work_order_count: 999, schedule_count: 999 }]);
    await expect(page.locator("[data-procedure-links]")).toHaveText("7 linked work orders");
    await expect(page.locator("[data-procedure-schedules]")).toHaveText("3 PM schedules");
    expect(await page.evaluate(() => relationsTest.calls.rpc[1].args.p_company_id)).toBe("other-company");
  });
}

test("PM history is lazy, scoped, ordered, 12 per page, and opens the selected work order", async ({ page }) => {
  await fixture(page, []);
  const panel = page.locator("[data-pm-history]");
  const rows = historyRows();
  expect(await page.evaluate(() => relationsTest.calls.history.length)).toBe(0);
  await openHistory(page);
  await expect(panel).toContainText("Loading work history...");
  for (const [index, range] of [[0, [0, 11]], [1, [12, 23]], [2, [24, 35]]]) {
    if (index) await panel.getByRole("button", { name: "Next", exact: true }).click();
    expect(await page.evaluate(index => relationsTest.calls.history[index], index)).toEqual({
      table: "work_orders", columns: "id,title,status,due_at,completed_at,preventive_due_at", options: { count: "exact" },
      filters: [["company_id", "company"], ["preventive_source_id", "pm-1"]],
      orders: [["created_at", { ascending: false }], ["id", null]], range,
    });
    await resolveHistory(page, index, { data: rows.slice(range[0], range[1] + 1), count: rows.length, error: null });
    await expect(panel.locator("[data-mini-work-order]")).toHaveCount(index === 2 ? 1 : 12);
    await expect(panel).toContainText(`Showing ${range[0] + 1}-${Math.min(range[1] + 1, 25)} of 25`);
    if (!index) {
      await expect(panel.getByRole("button", { name: "Previous", exact: true })).toBeDisabled();
      await expect(panel).toContainText("in progress - Due 2026-08-31");
      await expect(panel.locator("img")).toHaveCount(0);
      await panel.getByRole("button", { name: "Inspect <img src=x>", exact: true }).click();
      expect(await page.evaluate(() => relationsTest.opened)).toEqual(["work-1"]);
    }
  }
  await expect(panel.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  await panel.getByRole("button", { name: "Previous", exact: true }).click();
  expect(await page.evaluate(() => relationsTest.calls.history[3].range)).toEqual([12, 23]);
  await resolveHistory(page, 3, { data: rows.slice(12, 24), count: 25, error: null });
  await expect(panel.locator("[data-mini-work-order]")).toHaveCount(12);
});

test("the newest PM history request wins even when earlier pages finish later", async ({ page }) => {
  await fixture(page, []);
  await openHistory(page);
  await page.evaluate(() => relationsTest.startHistory(2));
  await resolveHistory(page, 1, { data: historyRows().slice(12, 24), count: 25 });
  await resolveHistory(page, 0, { data: historyRows().slice(0, 12), count: 25 });
  await expect(page.locator("[data-pm-history-content]")).toContainText("Showing 13-24 of 25");
  await expect(page.locator('[data-mini-work-order="work-1"]')).toHaveCount(0);
  await expect(page.locator('[data-mini-work-order="work-13"]')).toHaveCount(1);
});

test("failed work-order opens show an error, restore the button, and allow retry without an unhandled rejection", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await fixture(page, []);
  await openHistory(page);
  await resolveHistory(page, 0, { data: historyRows(1), count: 1, error: null });
  await page.evaluate(() => relationsTest.deferOpen());
  const button = page.locator('[data-mini-work-order="work-1"] button');
  await button.click();
  await expect(button).toBeDisabled();
  expect(await page.evaluate(() => relationsTest.opened)).toEqual(["work-1"]);
  await page.evaluate(() => relationsTest.rejectOpen(0, "Work order not available"));
  await expect(page.locator("[data-pm-history-content] .error-text")).toHaveText("Could not open this work order. Try again.");
  await expect(button).toBeEnabled();
  await button.click();
  await expect(button).toBeDisabled();
  expect(await page.evaluate(() => relationsTest.opened)).toEqual(["work-1", "work-1"]);
  await page.evaluate(() => relationsTest.resolveOpen(1));
  await expect(button).toBeEnabled();
  await expect(page.locator("[data-mini-work-order]")).toHaveCount(1);
  expect(pageErrors).toEqual([]);
});

for (const staleError of [false, true]) {
  test(`PM history ignores old-scope ${staleError ? "errors" : "rows"} even if the panel is still connected`, async ({ page }) => {
    await fixture(page, []);
    await openHistory(page);
    await page.evaluate(() => {
      relationsTest.switchScope("user:other-company:south:2", "other-company");
    });
    if (staleError) await page.evaluate(() => relationsTest.rejectHistory(0, "Old denied response"));
    else await resolveHistory(page, 0, { data: historyRows(1), count: 1 });
    await expect(page.locator("[data-pm-history-content]")).toHaveText("Loading work history...");
    await page.evaluate(() => relationsTest.startHistory());
    await resolveHistory(page, 1, { data: [{ ...historyRows(1)[0], id: "current", title: "Current scope" }], count: 1 });
    await expect(page.locator("[data-pm-history-content]")).toContainText("Current scope");
    await expect(page.locator("[data-pm-history-content]")).not.toContainText("Old denied response");
    expect(await page.evaluate(() => relationsTest.calls.history[1].filters[0])).toEqual(["company_id", "other-company"]);
  });
}

test("detached PM panels are not populated by a late response in the same scope", async ({ page }) => {
  await fixture(page, []);
  await openHistory(page);
  await page.evaluate(() => {
    window.detachedPanel = document.querySelector("[data-pm-history]");
    relationsTest.render();
  });
  await resolveHistory(page, 0, { data: historyRows(1), count: 1 });
  expect(await page.evaluate(() => window.detachedPanel.querySelector("[data-pm-history-content]").textContent)).toBe("Loading work history...");
  await expect(page.locator("[data-pm-history-content]")).toBeEmpty();
});

for (const [name, result] of [
  ["server error", { data: null, count: null, error: { message: "History unavailable" } }],
  ["missing exact count", { data: [], count: null, error: null }],
]) {
  test(`PM history ${name} offers retry and never presents an unverified zero`, async ({ page }) => {
    await fixture(page, []);
    await openHistory(page);
    await resolveHistory(page, 0, result);
    await expect(page.locator("[data-pm-history-content] .error-text")).toBeVisible();
    await expect(page.locator("[data-pm-history-content]")).not.toContainText("0 work orders");
    await page.getByRole("button", { name: "Retry", exact: true }).click();
    expect(await page.evaluate(() => relationsTest.calls.history[1].range)).toEqual([0, 11]);
    await resolveHistory(page, 1, { data: [], count: 0, error: null });
    await expect(page.locator("[data-pm-history-content]")).toContainText("No linked generated work orders.");
    await expect(page.getByRole("button", { name: "Previous", exact: true })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
  });
}

test("PM history clamps a stale last page after the exact total shrinks", async ({ page }) => {
  await fixture(page, []);
  await page.evaluate(() => relationsTest.startHistory(3));
  await resolveHistory(page, 0, { data: [], count: 13, error: null });
  expect(await page.evaluate(() => relationsTest.calls.history[1].range)).toEqual([12, 23]);
  await resolveHistory(page, 1, { data: historyRows(13).slice(12), count: 13, error: null });
  await expect(page.locator("[data-pm-history-content]")).toContainText("Showing 13-13 of 13");
  await expect(page.locator("[data-mini-work-order]")).toHaveCount(1);
});
