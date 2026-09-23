const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

global.window = {};
const { createWorkspaceWorkOrderCompletionEvents } = require("../../src/utils/workspaceWorkOrderCompletionEvents.js");
const { isChecklistStepAnswered } = require("../../src/utils/checklistResponseValues.js");
const appSource = fs.readFileSync(path.resolve(__dirname, "../../app.js"), "utf8").replace(/\r\n/g, "\n");
const tests = [];
const test = (name, run) => tests.push({ name, run });

function definition(name) {
  const start = appSource.indexOf(`function ${name}(`);
  const end = appSource.indexOf("\n}", start);
  assert.ok(start >= 0 && end > start, `Missing app function ${name}`);
  return appSource.slice(start, end + 2);
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function harness(overrides = {}) {
  const step = { id: "step-1", required: true, response_type: "number" };
  const state = {
    userId: "user-1", companyId: "company-1", locationId: "location-1", activeId: "wo-1",
    work: ["wo-1", "wo-2"].map(id => ({ id, status: "open", asset_id: "asset-1", procedure_template_id: "procedure-1" })),
    procedures: [{ id: "procedure-1", procedure_steps: [step, { id: "optional", required: false, response_type: "text" }] }],
    results: { "wo-1": { "step-1": { value: 0 } }, "wo-2": { "step-1": { value: 0 } } },
    maintenanceReady: true, drafts: new Set(), readErrors: new Set(),
    writes: [], persisted: new Map(), events: [], notices: [], warnings: [], renders: 0, alerts: [],
    errorTarget: { textContent: "" }, safetyFields: [], requiresSafety: false, previousSafety: false,
    productionMessage: "", prevented: 0,
  };
  // Execute the actual app progress/readiness gates without booting app.js or touching a backend.
  const app = vm.createContext({
    isChecklistStepAnswered, stepResultsByWorkOrder: state.results, procedureTemplates: state.procedures,
    isFeatureBundleReady: () => state.maintenanceReady,
    checklistDrafts: { hasDraft: id => state.drafts.has(id) },
    checklistResults: { hasError: id => state.readErrors.has(id) },
  });
  vm.runInContext([
    "requiredChecklistProgress", "requiredChecklistProgressFor", "requiredChecklistCompletionMessage", "blocksProcedureCompletion",
  ].map(definition).join("\n"), app, { filename: "app.js completion helpers" });

  function form(values = {}) {
    const button = { disabled: false, textContent: "Complete Work Order" };
    return { button, values: { actual_minutes: "0", resolution_summary: "Isolated completion", ...values },
      querySelector: selector => selector === "button[type='submit']" ? button : null };
  }
  const options = {
    documentRef: {
      querySelector: selector => selector === "#completion-error" ? state.errorTarget : null,
      querySelectorAll: () => state.safetyFields,
    },
    FormDataRef: class {
      constructor(target) { this.values = { ...target.values }; }
      get(name) { return this.values[name] ?? null; }
    },
    getScope: () => `${state.userId}:${state.companyId}:${state.locationId}`,
    getActiveWorkOrderId: () => state.activeId,
    getWorkOrderById: id => state.work.find(row => row.id === id),
    getProcedureById: id => state.procedures.find(row => row.id === id),
    requiredChecklistProgress: app.requiredChecklistProgress,
    blocksProcedureCompletion: app.blocksProcedureCompletion,
    productionActionCompletionMessage: () => state.productionMessage,
    setWorkOrderActionWarning: (...args) => state.warnings.push(args),
    showNotice: (message, tone = "success") => state.notices.push([message, tone]),
    requiresSafetyDeviceCheck: () => state.requiresSafety,
    hasCompletedSafetyDeviceCheck: () => state.previousSafety,
    applySafetyRequirementPayload: payload => { payload.safety_check_required = state.requiresSafety; },
    applySafetyCheckPayload: (payload, checked) => { payload.safety_devices_checked = checked; },
    updateWorkOrderSafely: async (payload, id) => {
      state.writes.push([id, { ...payload }]);
      const result = overrides.update ? await overrides.update(payload, id) : { error: null };
      if (!result.error) state.persisted.set(id, { ...payload });
      return result;
    },
    recordWorkOrderEvent: (...args) => {
      state.events.push(args);
      return overrides.history ? overrides.history(...args) : Promise.resolve();
    },
    friendlyWorkOrderSaveError: error => error.message || String(error),
    withOperationTimeout: promise => Promise.resolve(promise),
    render: async () => { state.renders += 1; if (overrides.render) await overrides.render(); },
    alertRef: message => state.alerts.push(message),
  };
  if (overrides.omitScope) delete options.getScope;
  if (overrides.omitBlocks) delete options.blocksProcedureCompletion;
  const handlers = createWorkspaceWorkOrderCompletionEvents(options);
  const submit = (target = form()) => handlers.completeWorkOrder({ target, preventDefault: () => { state.prevented += 1; } });
  return { state, step, form, submit, handlers, app };
}

function assertSaved(h, id = "wo-1") {
  assert.equal(h.state.persisted.get(id)?.status, "completed");
  assert.equal(h.state.errorTarget.textContent, "", "An acknowledged completion must not be presented as a failed save");
  assert.deepEqual(h.state.alerts, []);
}

test("getScope and blocksProcedureCompletion remain optional", async () => {
  const h = harness({ omitScope: true, omitBlocks: true });
  await h.submit();
  assertSaved(h);
  assert.deepEqual(h.state.notices, [["Work order completed.", "success"]]);
  assert.equal(h.state.renders, 1);
});

for (const value of [0, "0"]) test(`actual app gate accepts required numeric ${JSON.stringify(value)}`, async () => {
  const h = harness();
  h.state.results["wo-1"]["step-1"].value = value;
  assert.equal(h.app.requiredChecklistProgress(h.state.work[0], h.state.procedures[0]).done, 1);
  assert.equal(h.app.blocksProcedureCompletion(h.state.work[0]), "");
  const form = h.form();
  await h.submit(form);
  assertSaved(h);
  const payload = h.state.writes[0][1];
  assert.equal(payload.actual_minutes, 0);
  assert.equal(Object.hasOwn(payload, "asset_id"), false);
  assert.equal(typeof payload.completed_at, "string");
  assert.equal(form.button.disabled, false);
  assert.equal(form.button.textContent, "Complete Work Order");
});

for (const [type, value] of [["number", ""], ["number", " "], ["number", null], ["checkbox", false]]) {
  test(`required ${type} ${JSON.stringify(value)} blocks completion`, async () => {
    const h = harness();
    h.step.response_type = type;
    h.state.results["wo-1"]["step-1"].value = value;
    await h.submit();
    assert.match(h.state.errorTarget.textContent, /Complete required.*\(0\/1\)/);
    assert.deepEqual(h.state.writes, []);
    assert.deepEqual(h.state.events, []);
  });
}

test("fallback progress gate still blocks when optional procedure guard is absent", async () => {
  const h = harness({ omitBlocks: true });
  delete h.state.results["wo-1"]["step-1"];
  await h.submit();
  assert.match(h.state.errorTarget.textContent, /Complete required checklist steps first \(0\/1\)/);
  assert.deepEqual(h.state.writes, []);
});

for (const [name, arrange, message] of [
  ["draft", h => h.state.drafts.add("wo-1"), /Save pending checklist answers/],
  ["read error", h => h.state.readErrors.add("wo-1"), /could not be verified/],
  ["loading tools", h => { h.state.maintenanceReady = false; }, /tools are loading/],
  ["missing procedure", h => { h.state.procedures.length = 0; }, /could not be verified/],
]) test(`optional injected guard fails closed for ${name}`, async () => {
  const h = harness();
  arrange(h);
  const form = h.form();
  await h.submit(form);
  assert.match(h.state.errorTarget.textContent, message);
  assert.deepEqual(h.state.writes, []);
  assert.equal(form.button.disabled, false);
});

test("missing active work row cannot complete or write history", async () => {
  const h = harness();
  h.state.activeId = "missing";
  const form = h.form();
  await h.submit(form);
  assert.deepEqual(h.state.writes, []);
  assert.deepEqual(h.state.events, []);
  assert.deepEqual(h.state.notices, []);
  assert.equal(h.state.renders, 0);
  assert.equal(form.button.disabled, false);
});

test("production and safety gates retain their existing behavior", async () => {
  const production = harness();
  production.state.productionMessage = "Complete the Production Action first.";
  await production.submit();
  assert.deepEqual(production.state.writes, []);
  assert.deepEqual(production.state.notices, [[production.state.productionMessage, "warning"]]);
  const safety = harness();
  safety.state.requiresSafety = true;
  await safety.submit();
  assert.match(safety.state.errorTarget.textContent, /Check safety devices/);
  assert.deepEqual(safety.state.writes, []);
  safety.state.previousSafety = true;
  await safety.submit();
  assertSaved(safety);
  assert.equal(safety.state.writes[0][1].safety_devices_checked, true);
});

for (const phase of ["save", "history"]) test(`same-ID pending guard remains held during ${phase}`, async () => {
  const wait = deferred();
  const entered = deferred();
  const h = harness({ [phase === "save" ? "update" : "history"]: () => { entered.resolve(); return wait.promise; } });
  const firstForm = h.form();
  const first = h.submit(firstForm);
  await entered.promise;
  await h.submit(firstForm);
  await h.submit(h.form());
  assert.equal(h.state.writes.length, 1);
  assert.equal(firstForm.button.disabled, true, "Duplicates cannot unlock the original submit button");
  wait.resolve(phase === "save" ? { error: null } : undefined);
  await first;
  assertSaved(h);
  assert.equal(h.state.events.length, 1);
  assert.equal(firstForm.button.disabled, false);
  await h.submit();
  assert.equal(h.state.writes.length, 2, "Successful completion releases the pending ID");
});

test("distinct work IDs remain independent and the first submit keeps its captured ID", async () => {
  const wait = deferred();
  const h = harness({ update: (_payload, id) => id === "wo-1" ? wait.promise : { error: null } });
  const first = h.submit();
  h.state.activeId = "wo-2";
  await h.submit();
  wait.resolve({ error: null });
  await first;
  assert.deepEqual(h.state.writes.map(([id]) => id), ["wo-1", "wo-2"]);
  assert.deepEqual(h.state.events.map(([id]) => id).sort(), ["wo-1", "wo-2"]);
  assertSaved(h, "wo-1");
  assertSaved(h, "wo-2");
});

for (const reject of [false, true]) test(`${reject ? "rejected" : "returned"} save failure releases pending and preserves failure UI`, async () => {
  let fail = true;
  const h = harness({ update: async () => {
    if (!fail) return { error: null };
    if (reject) throw new Error("Save unavailable.");
    return { error: new Error("Save unavailable.") };
  } });
  const form = h.form();
  await h.submit(form);
  assert.equal(h.state.persisted.size, 0);
  assert.match(h.state.errorTarget.textContent, /Could not complete work order: Save unavailable/);
  assert.deepEqual(h.state.events, []);
  assert.deepEqual(h.state.notices, []);
  assert.equal(form.button.disabled, false);
  fail = false;
  await h.submit(form);
  assertSaved(h);
});

for (const [name, history] of [
  ["returned error/message envelope", () => Promise.resolve({ error: new Error("History unavailable."), message: "History unavailable." })],
  ["returned nested error", () => Promise.resolve({ error: new Error("History unavailable.") })],
  ["rejected history", () => Promise.reject(new Error("History unavailable."))],
  ["synchronous history throw", () => { throw new Error("History unavailable."); }],
]) test(`${name} warns without turning saved completion into failure`, async () => {
  const h = harness({ history });
  await h.submit();
  assertSaved(h);
  assert.equal(h.state.renders, 1);
  assert.equal(h.state.notices.length, 1);
  assert.equal(h.state.notices[0][1], "warning");
  assert.match(h.state.notices[0][0], /Work order completed, but history .*History unavailable\./);
  assert.doesNotMatch(h.state.notices[0][0], /undefined/);
});

test("failed render after completion does not claim the saved completion failed", async () => {
  const h = harness({ render: () => { throw new Error("Screen unavailable."); } });
  await h.submit();
  assertSaved(h);
  assert.match(h.state.notices.at(-1)[0], /completed, but the screen could not update/);
  assert.equal(h.state.notices.at(-1)[1], "warning");
});

for (const result of [undefined, { error: null }]) test(`successful history ${JSON.stringify(result)} does not warn`, async () => {
  const h = harness({ history: () => Promise.resolve(result) });
  await h.submit();
  assertSaved(h);
  assert.deepEqual(h.state.notices, [["Work order completed.", "success"]]);
});

for (const key of ["userId", "companyId", "locationId"]) {
  for (const phase of ["save", "history"]) {
    for (const outcome of ["success", "returned error", "rejected"]) {
      test(`${key} change during ${phase} suppresses stale ${outcome} follow-ups`, async () => {
        const wait = deferred();
        const entered = deferred();
        const h = harness({ [phase === "save" ? "update" : "history"]: () => { entered.resolve(); return wait.promise; } });
        const form = h.form();
        const saving = h.submit(form);
        await entered.promise;
        h.state[key] += "-new";
        if (outcome === "rejected") wait.reject(new Error("Stale failure."));
        else wait.resolve(outcome === "returned error" ? { error: new Error("Stale failure."), message: "Stale failure." }
          : phase === "save" ? { error: null } : undefined);
        await saving;
        assert.equal(h.state.persisted.has("wo-1"), phase === "history" || outcome === "success");
        assert.equal(h.state.events.length, phase === "save" ? 0 : 1);
        assert.deepEqual(h.state.notices, []);
        assert.deepEqual(h.state.warnings, []);
        assert.deepEqual(h.state.alerts, []);
        assert.equal(h.state.errorTarget.textContent, "");
        assert.equal(h.state.renders, 0);
        assert.equal(form.button.disabled, false);
      });
    }
  }
}

(async () => {
  let passed = 0;
  for (const { name, run } of tests) {
    try { await run(); passed += 1; }
    catch (error) { console.error(`FAIL: ${name}\n${error.stack}`); }
  }
  console.log(`PM completion state smoke: ${passed}/${tests.length} isolated cases passed`);
  if (passed !== tests.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
