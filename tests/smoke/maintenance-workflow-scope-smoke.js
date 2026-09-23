const assert = require("node:assert/strict");

global.window = {};
const { createProcedureWorkflow } = require("../../src/workflows/procedureWorkflow.js");
const { createPreventiveMaintenanceWorkflow } = require("../../src/workflows/preventiveMaintenanceWorkflow.js");

const SAMPLE_NAME = "Basic Equipment Inspection";
const SAMPLE_DESCRIPTION = "A simple starter checklist for visual checks, readings, and final pass/fail.";
const SAMPLE_STEPS = [
  { position: 1, prompt: "Confirm lockout or safe operating condition", response_type: "checkbox", required: true },
  { position: 2, prompt: "Inspect for leaks, loose guards, or visible damage", response_type: "pass_fail", required: true },
  { position: 3, prompt: "Record operating reading", response_type: "number", required: false },
  { position: 4, prompt: "Add technician notes", response_type: "text", required: false },
];

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

function form(values = {}, dataset = {}) {
  const button = { disabled: false, textContent: "", isConnected: true };
  const error = { textContent: "" };
  return {
    values, dataset, button, error,
    querySelector: (selector) => selector === "button[type='submit']" ? button : error,
  };
}

function fixture() {
  const state = { company: "company-1", user: "user-1", scope: "location-1:procedures:1", editor: true, admin: true };
  const tables = {
    procedure_templates: [{ id: "template-1", company_id: "company-1", name: "Inspection" }],
    procedure_steps: [],
    preventive_schedules: [{ id: "schedule-1", company_id: "company-1", active: true, frequency: "monthly", next_due_at: "2026-09-01" }],
  };
  const requests = [], notices = [], cleared = [], captured = [], navigation = [], pendingIds = [];
  const hooks = [];
  const elements = new Map();
  let renders = 0, sequence = 0;
  const documentRef = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { textContent: "", disabled: false, isConnected: true });
      return elements.get(selector);
    },
    querySelectorAll: () => [],
  };

  async function execute(request) {
    requests.push(request);
    function run() {
      if (request.kind === "rpc") {
        if (request.name === "get_procedure_link_counts") return {
          data: request.args.p_template_ids.map((id) => ({ procedure_template_id: id, work_order_count: 0, schedule_count: 0 })), error: null,
        };
        assert.equal(request.name, "generate_preventive_work_order");
        return { data: { work_order_id: "work-1", next_due_at: "2026-10-01", reused: false }, error: null };
      }
      const rows = tables[request.table];
      assert.ok(rows, request.table);
      const matches = (row) => request.filters.every(([column, value]) => row[column] === value) &&
        (!request.nameFilter || row.name.toLowerCase() === request.nameFilter.toLowerCase());
      let data;
      if (request.kind === "insert") {
        data = (Array.isArray(request.payload) ? request.payload : [request.payload]).map((payload) => ({ id: `new-${++sequence}`, ...payload }));
        rows.push(...data);
      } else {
        data = rows.filter(matches);
        if (request.kind === "delete") tables[request.table] = rows.filter((row) => !matches(row));
      }
      return { data: request.single ? data[0] || null : data, error: null };
    }
    const index = hooks.findIndex((hook) => hook.predicate(request));
    return index < 0 ? run() : hooks.splice(index, 1)[0].handle(request, run);
  }

  const client = {
    from(table) {
      const request = { table, kind: "select", filters: [] };
      return {
        insert(payload) { request.kind = "insert"; request.payload = payload; return this; },
        delete() { request.kind = "delete"; return this; },
        select() { return this; },
        eq(column, value) { request.filters.push([column, value]); return this; },
        ilike(column, value) { assert.equal(column, "name"); request.nameFilter = value; return this; },
        single() { request.single = true; return execute(request); },
        maybeSingle() { request.single = true; return execute(request); },
        then(resolve, reject) { return execute(request).then(resolve, reject); },
      };
    },
    rpc: (name, args) => execute({ kind: "rpc", name, args }),
  };
  const deps = {
    documentRef,
    CSSRef: { escape: (value) => value },
    FormDataCtor: class { constructor(element) { this.values = element.values; } get(key) { return this.values[key] ?? ""; } },
    supabaseClient: () => client,
    withOperationTimeout: (value) => value,
    getActiveCompanyId: () => state.company,
    getSession: () => state.user ? { user: { id: state.user } } : null,
    getScope: () => state.scope,
    canEditOperationalRecords: () => state.editor,
    canDeleteOperationalRecords: () => state.admin,
    requiredText(value) { if (!String(value || "").trim()) throw new Error("Required field"); return String(value).trim(); },
    getProcedureTemplates: () => tables.procedure_templates.map((template) => ({
      ...template, procedure_steps: tables.procedure_steps.filter((step) => step.procedure_template_id === template.id),
    })),
    getPreventiveSchedules: () => tables.preventive_schedules,
    procedureDeleteBlockerMessage: ({ workOrders, schedules }) => workOrders || schedules ? "Retained work or schedules block deletion." : "",
    setPendingDeleteProcedureId: (id) => pendingIds.push(["procedure", id]),
    setPendingDeleteScheduleId: (id) => pendingIds.push(["schedule", id]),
    setActiveWorkOrderId: (id) => navigation.push(["order", id]),
    setActiveSection: (section) => navigation.push(["section", section]),
    showNotice: (message) => notices.push(message),
    alertUser: (message) => notices.push(message),
    render: async () => { renders += 1; },
    renderWorkspace: () => { renders += 1; },
    captureCreateDraft(element) {
      const token = { company: state.company, scope: state.scope, fields: JSON.stringify(element.values) };
      captured.push(token);
      return token;
    },
    clearCreateDraft: (token) => cleared.push(token),
    insertWithOptionalProcedure: (table, payload) => client.from(table).insert(payload),
    confirmAssetLocationRouting: () => true,
    locationIdForAsset: () => "location-1",
    procedureColumn: (id) => ({ procedure_template_id: id || null }),
    nextDueDate: () => "2026-10-01",
  };
  return {
    state, tables, requests, notices, cleared, captured, navigation, pendingIds, documentRef,
    get renders() { return renders; },
    procedure: createProcedureWorkflow(deps), pm: createPreventiveMaintenanceWorkflow(deps),
    onNext(predicate, handle) { hooks.push({ predicate, handle }); },
    hold(predicate) {
      const entered = deferred(), released = deferred();
      hooks.push({ predicate, handle: async (request, run) => {
        entered.resolve(request);
        const response = await released.promise;
        return response === undefined ? run() : response;
      } });
      return { entered: entered.promise, release: released.resolve };
    },
    sample(positions = []) {
      const template = { id: "sample-1", company_id: "company-1", name: SAMPLE_NAME, description: SAMPLE_DESCRIPTION };
      tables.procedure_templates.push(template);
      tables.procedure_steps.push(...SAMPLE_STEPS.filter((step) => positions.includes(step.position)).map((step) => ({
        ...step, id: `sample-step-${step.position}`, company_id: "company-1", procedure_template_id: template.id,
      })));
      return template;
    },
  };
}

const isInsert = (table) => (request) => request.kind === "insert" && request.table === table;
const isSelect = (table) => (request) => request.kind === "select" && request.table === table;
const isCounts = (request) => request.name === "get_procedure_link_counts";
const writes = (h) => h.requests.filter((request) => ["insert", "delete"].includes(request.kind));
const submit = (fn, element) => fn({ preventDefault() {}, currentTarget: element });
const createCases = [
  { table: "procedure_templates", method: (h) => h.procedure.createProcedureTemplate, values: { name: "New checklist" } },
  { table: "preventive_schedules", method: (h) => h.pm.createPreventiveSchedule, values: { title: "Monthly PM", asset_id: "asset-1", frequency: "monthly", next_due_at: "2026-09-01" } },
  { table: "procedure_steps", method: (h) => h.procedure.createProcedureStep, values: { prompt: "Inspect", response_type: "checkbox", required: "true" }, dataset: { addStep: "template-1" } },
];

async function createGuards() {
  for (const item of createCases) {
    const h = fixture(), element = form(item.values, item.dataset), gate = h.hold(isInsert(item.table));
    const first = submit(item.method(h), element);
    await gate.entered;
    await submit(item.method(h), element);
    assert.equal(writes(h).length, 1, `${item.table}: double submit ignored`);
    assert.equal(h.captured.length, 1);
    gate.release({ error: new Error("Save failed") });
    await first;
    assert.equal(h.cleared.length, 0, "failed saves retain draft");
    assert.equal(element.button.disabled, false);
    await submit(item.method(h), element);
    assert.equal(writes(h).length, 2, "retry released after failure");
    assert.deepEqual(h.cleared, [h.captured[1]]);
    assert.equal(h.renders, 1);

    for (const field of ["company", "user", "scope"]) {
      const scoped = fixture(), scopedForm = form(item.values, item.dataset), saved = scoped.hold(isInsert(item.table));
      const task = submit(item.method(scoped), scopedForm);
      const request = await saved.entered;
      scoped.state[field] = "changed";
      scopedForm.values = { name: "New route draft" };
      saved.release();
      await task;
      assert.equal(request.payload.company_id, "company-1");
      assert.equal(request.payload.created_by || "user-1", "user-1");
      assert.deepEqual(scoped.cleared, [scoped.captured[0]], "only saved draft token is cleared");
      assert.equal(scoped.renders, 0);
      assert.equal(scoped.notices.length, 0);
      assert.equal(scopedForm.button.textContent, "Adding...", "stale completion does not touch old DOM");
    }

    const denied = fixture();
    denied.state.editor = false;
    await submit(item.method(denied), form(item.values, item.dataset));
    assert.equal(writes(denied).length, 0);
    assert.equal(denied.cleared.length, 0);

    const staleError = fixture(), failedForm = form(item.values, item.dataset), failedGate = staleError.hold(isInsert(item.table));
    const failedTask = submit(item.method(staleError), failedForm);
    await failedGate.entered;
    staleError.state.scope = "different-route";
    failedGate.release({ error: new Error("Late failure") });
    await failedTask;
    assert.equal(staleError.notices.length, 0);
    assert.equal(staleError.cleared.length, 0);
    assert.equal(failedForm.error.textContent, "");
    assert.equal(staleError.documentRef.querySelector("#procedure-error").textContent, "");
    assert.equal(staleError.documentRef.querySelector('[data-step-error="template-1"]').textContent, "");
  }
  const h = fixture();
  h.tables.procedure_steps.push({ id: "step-1", position: 2, procedure_template_id: "template-1" }, { id: "step-2", position: 9, procedure_template_id: "template-1" });
  await submit(h.procedure.createProcedureStep, form({ prompt: "Last" }, { addStep: "template-1" }));
  assert.equal(writes(h)[0].payload.position, 10, "step positions use max, not length");
  for (const company of ["company-2", null]) {
    const missing = fixture();
    missing.tables.procedure_templates[0].company_id = company;
    await submit(missing.procedure.createProcedureStep, form({ prompt: "No" }, { addStep: "template-1" }));
    assert.equal(writes(missing).length, 0, "missing/current-company template hard fails");
  }
  const missing = fixture();
  await submit(missing.procedure.createProcedureStep, form({ prompt: "No" }, { addStep: "missing" }));
  assert.equal(writes(missing).length, 0);
}

async function sampleRecovery() {
  const h = fixture();
  const gate = h.hold(isInsert("procedure_steps"));
  const first = h.procedure.seedSampleProcedure();
  await gate.entered;
  await h.procedure.seedSampleProcedure();
  assert.equal(h.requests.filter(isInsert("procedure_templates")).length, 1);
  assert.equal(h.requests.filter(isInsert("procedure_steps")).length, 1);
  gate.release({ error: new Error("Steps unavailable") });
  await first;
  const id = h.tables.procedure_templates.find((template) => template.name === SAMPLE_NAME).id;
  assert.match(h.notices.at(-1), /retained.*Retry/);
  assert.match(h.documentRef.querySelector("#seed-sample-procedure").textContent, /Retry/);
  await h.procedure.seedSampleProcedure();
  assert.equal(h.requests.filter(isInsert("procedure_templates")).length, 1, "retry reuses saved empty template");
  assert.equal(h.tables.procedure_steps.filter((step) => step.procedure_template_id === id).length, 4);
  assert.ok(!h.requests.some((request) => request.kind === "delete"), "partial sample never cleaned up by deleting history");

  const partial = fixture();
  partial.sample([1, 3]);
  await partial.procedure.seedSampleProcedure();
  assert.deepEqual(partial.requests.find(isInsert("procedure_steps")).payload.map((step) => step.position), [2, 4]);
  assert.equal(partial.requests.filter(isInsert("procedure_templates")).length, 0);

  const ambiguous = fixture();
  ambiguous.onNext(isInsert("procedure_steps"), (_request, run) => { run(); return { error: new Error("Response lost after save") }; });
  await ambiguous.procedure.seedSampleProcedure();
  await ambiguous.procedure.seedSampleProcedure();
  assert.equal(ambiguous.requests.filter(isInsert("procedure_steps")).length, 1, "ambiguous save retry reads persisted steps");
  assert.equal(ambiguous.requests.filter(isInsert("procedure_templates")).length, 1);
  assert.equal(ambiguous.renders, 1, "a persisted full sample is refreshed after response loss");

  const templateResponseLost = fixture();
  templateResponseLost.onNext(isInsert("procedure_templates"), (_request, run) => { run(); return { error: new Error("Template response lost") }; });
  await templateResponseLost.procedure.seedSampleProcedure();
  assert.equal(templateResponseLost.requests.filter(isInsert("procedure_steps")).length, 0);
  await templateResponseLost.procedure.seedSampleProcedure();
  assert.equal(templateResponseLost.requests.filter(isInsert("procedure_templates")).length, 1, "template-save response loss does not duplicate saved template");
  assert.equal(templateResponseLost.tables.procedure_steps.length, 4);

  for (const scenario of ["custom-step", "custom-description", "duplicate-template", "retained-history", "inactive-pm"]) {
    const guarded = fixture();
    const template = guarded.sample([1]);
    if (scenario === "custom-step") guarded.tables.procedure_steps[0].prompt = "Custom history";
    if (scenario === "custom-description") template.description = "User-authored";
    if (scenario === "duplicate-template") guarded.sample([]);
    if (scenario === "retained-history" || scenario === "inactive-pm") guarded.onNext(isCounts, (request) => ({ data: [{
      procedure_template_id: request.args.p_template_ids[0],
      work_order_count: scenario === "retained-history" ? 1 : 0,
      schedule_count: scenario === "inactive-pm" ? 1 : 0,
    }], error: null }));
    await guarded.procedure.seedSampleProcedure();
    assert.equal(writes(guarded).length, 0, scenario);
    assert.equal(guarded.tables.procedure_steps.length, 1);
  }

  const denied = fixture();
  denied.state.editor = false;
  await denied.procedure.seedSampleProcedure();
  assert.equal(denied.requests.length, 0);
}

async function sampleScopeGuards() {
  for (const point of [isSelect("procedure_templates"), isInsert("procedure_templates"), isSelect("procedure_steps"), isCounts]) {
    for (const field of ["company", "user", "scope"]) {
      const h = fixture(), gate = h.hold(point);
      const task = h.procedure.seedSampleProcedure();
      await gate.entered;
      const requestCount = h.requests.length;
      h.state[field] = "changed";
      gate.release();
      await task;
      assert.equal(h.requests.length, requestCount, "stale sample cannot issue another query/write");
      assert.equal(h.notices.length, 0);
      assert.equal(h.renders, 0);
      for (const request of writes(h)) assert.equal(request.payload.company_id, "company-1");
    }
  }
  for (const point of [isSelect("procedure_templates"), isCounts]) {
    const h = fixture(), gate = h.hold(point);
    const task = h.procedure.seedSampleProcedure();
    await gate.entered;
    const count = writes(h).length;
    h.state.editor = false;
    gate.release();
    await task;
    assert.equal(writes(h).length, count, "permission rechecked before follow-up writes");
  }
  const h = fixture();
  h.sample([]);
  const gate = h.hold(isInsert("procedure_steps"));
  const task = h.procedure.seedSampleProcedure();
  await gate.entered;
  await submit(h.procedure.createProcedureStep, form({ prompt: "Racing manual step" }, { addStep: "sample-1" }));
  assert.equal(h.requests.filter(isInsert("procedure_steps")).length, 1, "sample and manual step share pending guard");
  gate.release();
  await task;
}

async function deleteCounts() {
  const h = fixture();
  h.onNext(isCounts, () => ({ data: [{ procedure_template_id: "template-1", work_order_count: "2", schedule_count: "1" }], error: null }));
  assert.deepEqual(await h.procedure.loadProcedureDeleteBlockers("template-1"), { workOrders: 2, schedules: 1 });
  assert.deepEqual(h.requests[0].args, { p_company_id: "company-1", p_template_ids: ["template-1"] });
  const invalid = [null, [], [{}], [{ procedure_template_id: "other", work_order_count: 0, schedule_count: 0 }],
    ...[null, undefined, "", "no", -1, 0.5, true, Number.MAX_SAFE_INTEGER + 1].map((value) => ({ procedure_template_id: "template-1", work_order_count: value, schedule_count: 0 })),
    { procedure_template_id: "template-1", work_order_count: 0, schedule_count: null }];
  for (const value of invalid) {
    const guarded = fixture();
    const data = value && !Array.isArray(value) ? [value] : value;
    guarded.onNext(isCounts, () => ({ data, error: null }));
    await guarded.procedure.deleteProcedureTemplate("template-1");
    assert.equal(writes(guarded).length, 0, "unknown counts never mean zero");
    assert.match(guarded.notices.at(-1), /Could not verify/);
  }
  for (const method of ["requestDeleteProcedureTemplate", "deleteProcedureTemplate"]) {
    const guarded = fixture();
    guarded.onNext(isCounts, () => ({ data: [{ procedure_template_id: "template-1", work_order_count: 1, schedule_count: 0 }], error: null }));
    await guarded.procedure[method]("template-1");
    assert.equal(writes(guarded).length, 0, "retained results block deletion even after reassignment");
    assert.equal(guarded.pendingIds.length, 0);
  }
  const failed = fixture();
  failed.onNext(isCounts, () => ({ error: new Error("RPC denied") }));
  await failed.procedure.deleteProcedureTemplate("template-1");
  assert.equal(writes(failed).length, 0);
  await failed.procedure.deleteProcedureTemplate("template-1");
  assert.equal(writes(failed).length, 1, "delete can retry after RPC failure");
}

async function deleteScopeGuards() {
  for (const method of ["requestDeleteProcedureTemplate", "deleteProcedureTemplate"]) {
    for (const field of ["company", "user", "scope", "editor", "admin"]) {
      const h = fixture(), gate = h.hold(isCounts);
      const first = h.procedure[method]("template-1");
      await gate.entered;
      await h.procedure[method]("template-1");
      assert.equal(h.requests.length, 1, "duplicate delete/check ignored");
      h.state[field] = ["editor", "admin"].includes(field) ? false : "changed";
      gate.release();
      await first;
      assert.equal(writes(h).length, 0);
      assert.equal(h.pendingIds.length, 0);
      assert.equal(h.renders, 0);
    }
  }
  for (const table of ["procedure_templates", "preventive_schedules"]) {
    const method = (h) => table === "procedure_templates" ? () => h.procedure.deleteProcedureTemplate("template-1") : () => h.pm.deletePreventiveSchedule("schedule-1");
    for (const point of ["delete", "select"]) {
      const h = fixture(), gate = h.hold((request) => request.table === table && request.kind === point);
      const first = method(h)();
      const request = await gate.entered;
      await method(h)();
      assert.equal(writes(h).length, 1, "duplicate delete ignored through verification");
      assert.ok(request.filters.some(([column, value]) => column === "company_id" && value === "company-1"));
      const count = h.requests.length;
      h.state.company = "company-2";
      gate.release();
      await first;
      assert.equal(h.requests.length, count);
      assert.equal(h.pendingIds.length, 0);
      assert.equal(h.notices.length, 0);
      assert.equal(h.renders, 0);
    }
    const failed = fixture();
    failed.onNext((request) => request.table === table && request.kind === "delete", () => ({ error: new Error("Delete failed") }));
    await method(failed)();
    assert.match(failed.notices.at(-1), /Delete failed/);
    await method(failed)();
    assert.equal(writes(failed).length, 2);
    assert.equal(failed.pendingIds.at(-1)[1], null);

    for (const role of ["editor", "admin"]) {
      const denied = fixture();
      denied.state[role] = false;
      await method(denied)();
      assert.equal(denied.requests.length, 0);
    }
  }
}

async function generationGuard() {
  for (const changeScope of [false, true]) {
    const h = fixture(), gate = h.hold((request) => request.name === "generate_preventive_work_order");
    const task = h.pm.generatePreventiveWorkOrder("schedule-1");
    const request = await gate.entered;
    assert.equal(h.pm.generatePreventiveWorkOrder("schedule-1"), task, "generation remains single-flight");
    assert.deepEqual(request.args, { p_company_id: "company-1", p_schedule_id: "schedule-1", p_expected_due_at: "2026-09-01" });
    if (changeScope) h.state.scope = "other-route";
    gate.release();
    await task;
    assert.equal(h.requests.length, 1);
    assert.equal(h.navigation.length, changeScope ? 0 : 2);
  }
}

(async () => {
  for (const check of [createGuards, sampleRecovery, sampleScopeGuards, deleteCounts, deleteScopeGuards, generationGuard]) {
    await check();
    console.log(`${check.name} passed`);
  }
  console.log("maintenance workflow scope smoke passed");
})().catch((error) => { console.error(error); process.exitCode = 1; });
