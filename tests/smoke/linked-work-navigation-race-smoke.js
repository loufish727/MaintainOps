const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "../..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8").replace(/\r\n/g, "\n");
const binderSource = fs.readFileSync(path.join(root, "src/utils/workspaceDetailNavigationEvents.js"), "utf8");
const tests = [];
const test = (name, run) => tests.push({ name, run });
const detailKinds = ["photos", "history", "comments", "checklist", "parts"];

function definition(name) {
  const match = new RegExp(`^(?:async )?function ${name}\\(`, "m").exec(appSource);
  const end = match ? appSource.indexOf("\n}", match.index) : -1;
  assert.ok(match && end > match.index, `Missing actual app function ${name}`);
  return appSource.slice(match.index, end + 2);
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function element(id) {
  const listeners = new Map();
  return {
    dataset: { miniWorkOrder: id }, isConnected: true,
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(handler);
    },
    async click() {
      for (const handler of listeners.get("click") || []) await handler();
    },
  };
}

function harness(source = "equipment") {
  const plans = new Map();
  const calls = { fetches: [], loads: [], finished: [], setters: [], storage: [], notices: [], renders: [], scrolls: 0, outcomes: [] };
  let nodes = [];
  let context;
  const route = () => ({
    section: context.activeSection, work: context.activeWorkOrderId, asset: context.activeAssetId,
    part: context.activePartId, create: context.createWorkOrderMode, quick: context.quickFixMode, report: context.reportIssueMode,
  });
  const workspaceUiState = Object.fromEntries(["ActiveWorkOrderId", "ActiveAssetId", "ActivePartId", "ActiveSection"]
    .map(name => [`set${name}`, value => calls.setters.push([name, value])]));
  const storage = { setItem: (key, value) => calls.storage.push([key, value]) };
  const loadDetail = (kind, ids) => {
    assert.equal(ids.length, 1);
    const id = ids[0];
    const plan = plans.get(id);
    assert.ok(plan, `Unexpected detail read ${id}`);
    calls.loads.push([id, kind]);
    plan.startedKinds.add(kind);
    if (plan.startedKinds.size === detailKinds.length) plan.detailsStarted.resolve();
    return plan.details.get(kind).promise.then(() => { calls.finished.push([id, kind]); });
  };
  context = vm.createContext({
    window: {}, localStorage: storage, workspaceUiState,
    session: { user: { id: "user-1" } }, activeCompanyId: "company-1", activeLocationId: "location-1",
    activeSection: source === "equipment" ? "assets" : source === "part" ? "parts" : "work",
    activeAssetId: source === "equipment" ? "asset-source" : null,
    activePartId: source === "part" ? "part-source" : null,
    activeWorkOrderId: source === "work" ? "work-source" : null,
    activeAssetHistoryId: null, createWorkOrderMode: false, quickFixMode: false, reportIssueMode: false,
    detailNavigationRevision: 0, linkedRecordOpenSequence: 0, workOrders: [],
    assetWorkHistory: { invalidate() {} },
    supabaseClient: Object.freeze({ mocked: true }), WORK_ORDER_RELATION_SELECT: "isolated-relations",
    fetchWorkOrderById: (client, companyId, id, columns) => {
      assert.equal(client, context.supabaseClient);
      assert.equal(companyId, "company-1");
      assert.equal(columns, "isolated-relations");
      assert.ok(plans.has(id), `Unexpected work read ${id}`);
      calls.fetches.push(id);
      return plans.get(id).fetch.promise;
    },
    loadPhotosForWorkOrderIds: ids => loadDetail("photos", ids),
    loadWorkOrderEventsForWorkOrderIds: ids => loadDetail("history", ids),
    loadCommentsForWorkOrderIds: ids => loadDetail("comments", ids),
    loadStepResultsForWorkOrderIds: ids => loadDetail("checklist", ids),
    loadPartsUsedForWorkOrderIds: ids => loadDetail("parts", ids),
    performance: { now: () => 0 }, appTelemetry: null, workspaceLoadWarnings: [],
    withOperationTimeout: promise => Promise.resolve(promise),
    showNotice: (message, tone) => calls.notices.push([message, tone]),
    renderWorkspace: () => calls.renders.push({ reason: "navigation", ...route() }),
  });
  // Only these actual functions run, with all IO and rendering injected locally.
  vm.runInContext([
    "setActiveWorkOrderIdState", "setActiveAssetIdState", "setActivePartIdState", "setActiveSectionState",
    "setActiveAssetHistoryId", "loadWorkspaceResponse", "runWorkspaceLoader", "openStorageLinkedRecord",
  ].map(definition).join("\n"), context, { filename: "app.js extracted linked navigation" });
  vm.runInContext(binderSource, context, { filename: "workspaceDetailNavigationEvents.js" });

  function plan(id, cached = false) {
    const row = { id, company_id: "company-1", asset_id: "asset-linked", title: id };
    const value = { row, fetch: deferred(), detailsStarted: deferred(), startedKinds: new Set(),
      details: new Map(detailKinds.map(kind => [kind, deferred()])) };
    value.resolveRead = () => value.fetch.resolve({ data: row, error: null });
    value.resolveDetails = () => { for (const wait of value.details.values()) wait.resolve(); };
    plans.set(id, value);
    if (cached) context.workOrders.push(row);
    return value;
  }

  function bind(ids = ["wo-1", "wo-2"]) {
    for (const node of nodes) node.isConnected = false;
    nodes = ids.map(element);
    context.window.MaintainOpsWorkspaceDetailNavigationEvents.bindWorkspaceDetailNavigationEvents({
      documentRef: { querySelector: () => null, querySelectorAll: selector => selector === "[data-mini-work-order]" ? nodes : [] },
      storage, windowRef: {},
      state: {
        getActiveSection: () => context.activeSection,
        setActiveWorkOrderId: context.setActiveWorkOrderIdState,
        setActiveAssetId: context.setActiveAssetIdState,
        setActivePartId: context.setActivePartIdState,
        setActiveSection: context.setActiveSectionState,
        setCreateWorkOrderMode: value => { context.createWorkOrderMode = value; },
        setQuickFixMode: value => { context.quickFixMode = value; },
        setReportIssueMode: value => { context.reportIssueMode = value; },
        setQuickFixAssetId() {}, setQuickFixRequestId() {}, setPendingDeleteAssetId() {},
      },
      setActiveAssetHistoryId: context.setActiveAssetHistoryId,
      openLinkedWorkOrder: async (id, options) => {
        const opened = await context.openStorageLinkedRecord("work", id, "", options);
        calls.outcomes.push([id, opened]);
        return opened;
      },
      renderWorkspace: context.renderWorkspace,
      showNotice: context.showNotice,
      scrollToDetailTop: () => { calls.scrolls += 1; },
    });
    return nodes;
  }

  function redraw() {
    calls.renders.push({ reason: "background", ...route() });
    return bind();
  }

  return { context, calls, route, plan, bind, redraw, open: (id, options) => context.openStorageLinkedRecord("work", id, "", options) };
}

function assertOpened(h, id) {
  assert.equal(h.context.activeSection, "work");
  assert.equal(h.context.activeWorkOrderId, id);
  assert.equal(h.context.activeAssetId, null);
  assert.equal(h.context.activePartId, null);
  assert.deepEqual(h.calls.storage, [["maintainops.activeSection", "work"]]);
  assert.equal(h.calls.renders.filter(row => row.reason === "navigation").length, 1);
}

test("actual route setters only advance revision for changed values", () => {
  const h = harness();
  for (const [setter, key, next] of [
    ["setActiveWorkOrderIdState", "activeWorkOrderId", "other-work"],
    ["setActiveAssetIdState", "activeAssetId", "other-asset"],
    ["setActivePartIdState", "activePartId", "other-part"],
    ["setActiveSectionState", "activeSection", "parts"],
  ]) {
    const revision = h.context.detailNavigationRevision;
    h.context[setter](h.context[key]);
    assert.equal(h.context.detailNavigationRevision, revision);
    h.context[setter](next);
    assert.equal(h.context.detailNavigationRevision, revision + 1);
  }
});

for (const source of ["equipment", "part", "work"]) for (const cached of [false, true]) {
  test(`${source} source stays visible until ${cached ? "cached" : "fetched"} work and all detail loads complete`, async () => {
    const h = harness(source);
    const p = h.plan("wo-1", cached);
    const initial = h.route();
    const opening = h.open("wo-1");
    assert.deepEqual(h.route(), initial);
    assert.deepEqual(h.calls.setters, []);
    if (!cached) p.resolveRead();
    await p.detailsStarted.promise;
    for (const kind of detailKinds.slice(0, -1)) p.details.get(kind).resolve();
    await Promise.resolve();
    assert.deepEqual(h.route(), initial, "The final detail read must finish before the route switches");
    assert.deepEqual(h.calls.storage, []);
    assert.deepEqual(h.calls.renders, []);
    p.details.get("parts").resolve();
    assert.equal(await opening, true);
    assert.equal(h.calls.fetches.length, cached ? 0 : 1);
    assert.equal(h.calls.finished.length, detailKinds.length);
    assertOpened(h, "wo-1");
  });
}

for (const phase of ["work read", "detail reads"]) test(`background DOM replacement during ${phase} does not cancel mini navigation`, async () => {
  const h = harness();
  const p = h.plan("wo-1");
  const [item] = h.bind();
  const opening = item.click();
  if (phase === "detail reads") { p.resolveRead(); await p.detailsStarted.promise; }
  const initial = h.route();
  h.redraw();
  h.redraw();
  assert.equal(item.isConnected, false, "The original source element really was replaced");
  assert.deepEqual(h.route(), initial);
  assert.equal(h.context.activeAssetId, "asset-source");
  p.resolveRead();
  p.resolveDetails();
  await opening;
  assert.deepEqual(h.calls.outcomes, [["wo-1", true]]);
  assert.equal(h.calls.scrolls, 1);
  assertOpened(h, "wo-1");
  assert.ok(h.calls.renders.every(row => row.work || row.asset), "No transient equipment-list render");
});

for (const outcome of ["returned error", "missing row", "rejected read"]) test(`${outcome} preserves equipment detail after a redraw`, async () => {
  const h = harness();
  const p = h.plan("wo-1");
  const initial = h.route();
  const [item] = h.bind();
  const opening = item.click();
  h.redraw();
  if (outcome === "rejected read") p.fetch.reject(new Error("Read unavailable."));
  else p.fetch.resolve({ data: null, error: outcome === "returned error" ? new Error("Read unavailable.") : null });
  await opening;
  assert.deepEqual(h.route(), initial);
  assert.deepEqual(h.calls.outcomes, [["wo-1", false]]);
  assert.deepEqual(h.calls.loads, []);
  assert.deepEqual(h.calls.setters, []);
  assert.deepEqual(h.calls.storage, []);
  assert.equal(h.calls.scrolls, 0);
  assert.equal(h.calls.notices.length, 1);
  assert.match(h.calls.notices[0][0], /Could not open work order: (Read unavailable\.|Work order not found\.)/);
  assert.equal(h.calls.notices[0][1], "warning");
});

const navigationChanges = [
  ["user", h => { h.context.session = { user: { id: "user-2" } }; }],
  ["sign out", h => { h.context.session = null; }],
  ["company", h => { h.context.activeCompanyId = "company-2"; }],
  ["location", h => { h.context.activeLocationId = "location-2"; }],
  ["different equipment", h => h.context.setActiveAssetIdState("asset-other")],
  ["equipment list", h => h.context.setActiveAssetIdState(null)],
  ["different work detail", h => h.context.setActiveWorkOrderIdState("work-other")],
  ["part detail", h => h.context.setActivePartIdState("part-other")],
  ["section", h => h.context.setActiveSectionState("procedures")],
  ["away and back to the identical source", h => {
    h.context.setActiveAssetIdState("asset-other");
    h.context.setActiveAssetIdState("asset-source");
  }],
];
for (const phase of ["work read", "detail reads"]) for (const [name, change] of navigationChanges) {
  test(`${name} change during ${phase} cancels the old navigation`, async () => {
    const h = harness();
    const p = h.plan("wo-1");
    const opening = h.open("wo-1");
    if (phase === "detail reads") { p.resolveRead(); await p.detailsStarted.promise; }
    change(h);
    const afterUserNavigation = h.route();
    const setterCount = h.calls.setters.length;
    p.resolveRead();
    p.resolveDetails();
    assert.equal(await opening, false);
    assert.deepEqual(h.route(), afterUserNavigation);
    assert.equal(h.calls.setters.length, setterCount);
    assert.deepEqual(h.calls.storage, []);
    assert.deepEqual(h.calls.notices, []);
    assert.deepEqual(h.calls.renders, []);
    if (phase === "work read") {
      assert.deepEqual(h.calls.loads, []);
      assert.equal(h.context.workOrders.length, 0, "A stale work read must not populate the new scope cache");
    }
  });
}

for (const phase of ["work read", "detail reads"]) test(`caller cancellation during ${phase} is still honored`, async () => {
  const h = harness();
  const p = h.plan("wo-1");
  let current = true;
  const initial = h.route();
  const opening = h.open("wo-1", { isCurrent: () => current });
  if (phase === "detail reads") { p.resolveRead(); await p.detailsStarted.promise; }
  current = false;
  p.resolveRead();
  p.resolveDetails();
  assert.equal(await opening, false);
  assert.deepEqual(h.route(), initial);
  assert.deepEqual(h.calls.renders, []);
});

for (const rebind of [false, true]) for (const phase of ["work read", "detail reads"]) for (const first of ["older", "newer"]) {
  test(`second mini request wins ${rebind ? "across rebind" : "within a bind"}; old ${phase}, ${first} resolves first`, async () => {
    const h = harness();
    const old = h.plan("wo-1");
    const latest = h.plan("wo-2");
    const items = h.bind();
    const older = items[0].click();
    if (phase === "detail reads") { old.resolveRead(); await old.detailsStarted.promise; }
    const newerItems = rebind ? h.redraw() : items;
    const newer = newerItems[1].click();
    if (first === "older") {
      old.resolveRead();
      old.resolveDetails();
      await older;
      assert.deepEqual(h.calls.outcomes, [["wo-1", false]]);
      assert.equal(h.context.activeAssetId, "asset-source", "An older response cannot win while the newer request is pending");
      assert.equal(h.context.activeWorkOrderId, null);
    }
    latest.resolveRead();
    latest.resolveDetails();
    await newer;
    if (first === "newer") { old.resolveRead(); old.resolveDetails(); await older; }
    assert.equal(h.calls.outcomes.find(([id]) => id === "wo-1")[1], false);
    assert.equal(h.calls.outcomes.find(([id]) => id === "wo-2")[1], true);
    assert.equal(h.calls.scrolls, 1);
    assert.deepEqual(h.calls.notices, []);
    assertOpened(h, "wo-2");
  });
}

test("a failed newer request still supersedes an older request across rebind", async () => {
  const h = harness();
  const old = h.plan("wo-1");
  const latest = h.plan("wo-2");
  const older = h.bind()[0].click();
  const newer = h.redraw()[1].click();
  latest.fetch.resolve({ data: null, error: new Error("Latest read unavailable.") });
  await newer;
  old.resolveRead();
  old.resolveDetails();
  await older;
  assert.deepEqual(h.calls.outcomes, [["wo-2", false], ["wo-1", false]]);
  assert.equal(h.context.activeAssetId, "asset-source");
  assert.equal(h.context.activeWorkOrderId, null);
  assert.equal(h.calls.scrolls, 0);
  assert.equal(h.calls.notices.length, 1);
  assert.match(h.calls.notices[0][0], /Latest read unavailable/);
});

test("a superseded read error cannot show a stale warning", async () => {
  const h = harness();
  const old = h.plan("wo-1");
  const latest = h.plan("wo-2");
  const older = h.bind()[0].click();
  const newer = h.redraw()[1].click();
  old.fetch.reject(new Error("Old read failed."));
  await older;
  assert.deepEqual(h.calls.notices, []);
  latest.resolveRead();
  latest.resolveDetails();
  await newer;
  assertOpened(h, "wo-2");
});

(async () => {
  let passed = 0;
  for (const { name, run } of tests) {
    let timer;
    try {
      await Promise.race([Promise.resolve().then(run), new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("Mock navigation did not settle within 2 seconds")), 2000);
      })]);
      passed += 1;
    } catch (error) { console.error(`FAIL: ${name}\n${error.stack}`); }
    finally { clearTimeout(timer); }
  }
  console.log(`Linked work navigation race smoke: ${passed}/${tests.length} isolated cases passed`);
  if (passed !== tests.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
