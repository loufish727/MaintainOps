const assert = require("node:assert/strict");

global.window = {};

const {
  createProcedureChecklistWorkflow,
  normalizeChecklistResponseValue,
  isChecklistStepAnswered,
} = require("../../src/workflows/procedureChecklistWorkflow.js");
const { createWorkOrderStatusWorkflow } = require("../../src/workflows/workOrderStatusWorkflow.js");
const { createWorkOrderDetailEditWorkflow } = require("../../src/workflows/workOrderDetailEditWorkflow.js");

const tests = [];
const test = (name, run) => tests.push({ name, run });
const clone = (value) => JSON.parse(JSON.stringify(value));

function harness(overrides = {}) {
  const steps = ["checkbox", "number", "text", "pass_fail"].map((type) => ({
    id: type,
    response_type: type,
    required: true,
    prompt: `Required ${type}`,
    company_id: "company-1",
    procedure_template_id: "procedure-1",
  }));
  const state = {
    companyId: "company-1",
    userId: "user-1",
    workOrders: ["wo-1", "wo-2"].map((id) => ({
      id,
      company_id: "company-1",
      procedure_template_id: "procedure-1",
      status: "open",
      completed_at: null,
    })),
    procedures: [{ id: "procedure-1", company_id: "company-1", procedure_steps: steps }],
    persisted: {},
    results: {},
    warningId: "wo-1",
    notices: [],
    writes: [],
    events: [],
    warnings: [],
    reloads: 0,
    gates: 0,
  };
  const progress = (workOrder, procedure) => {
    const results = state.results[workOrder.id] || {};
    const required = procedure.procedure_steps.filter((step) => step.required);
    return { done: required.filter((step) => isChecklistStepAnswered(step, results[step.id]?.value)).length, total: required.length };
  };
  const blocks = (workOrder) => {
    state.gates += 1;
    const procedure = state.procedures.find((item) => item.id === workOrder.procedure_template_id);
    const required = progress(workOrder, procedure);
    return required.done < required.total ? "Complete required checklist steps first." : "";
  };
  const workflow = createProcedureChecklistWorkflow({
    getActiveCompanyId: () => state.companyId,
    getSession: () => state.userId ? { user: { id: state.userId } } : null,
    getWorkOrders: () => state.workOrders,
    getProcedureTemplates: () => state.procedures,
    getStepResultsByWorkOrder: () => state.results,
    getWorkOrderActionWarningId: () => state.warningId,
    setWorkOrderActionWarning: (id, message) => {
      state.warningId = id;
      state.warnings.push([id, message]);
    },
    blocksProcedureCompletion: blocks,
    checklistProgress: progress,
    requiredChecklistProgress: progress,
    upsertStepResult: async (payload) => {
      state.writes.push(payload);
      if (overrides.upsert) return overrides.upsert(payload, state);
      state.persisted[payload.work_order_id] ||= {};
      state.persisted[payload.work_order_id][payload.procedure_step_id] = clone(payload);
      return { error: null };
    },
    recordWorkOrderEvent: async (...args) => {
      state.events.push(args);
      if (overrides.log) return overrides.log(state);
    },
    loadStepResults: async () => {
      state.reloads += 1;
      if (overrides.reload) return overrides.reload(state);
      state.results = clone(state.persisted);
    },
    showNotice: (message, tone) => state.notices.push([message, tone]),
    withOperationTimeout: (promise) => promise,
    renderWorkspace: () => assert.fail("Checklist saves must not replace unrelated unsaved forms"),
  });
  function field(stepId, value, workOrderId = "wo-1") {
    const summary = { textContent: "initial summary" };
    const recorded = { textContent: "initial timestamp" };
    return {
      dataset: { stepResult: stepId, workOrderId },
      type: stepId === "checkbox" || stepId === "number" ? stepId : "text",
      value,
      checked: value === true,
      disabled: false,
      isConnected: true,
      summary,
      recorded,
      closest: (selector) => selector === ".detail-stack"
        ? { querySelector: () => summary }
        : { querySelector: () => recorded },
    };
  }
  const save = async (target) => workflow.saveStepResult({ target });
  return { state, workflow, field, save, blocks };
}

test("shared answer semantics distinguish required checkbox false, zero, and blanks", () => {
  const h = harness();
  assert.equal(h.workflow.normalizeChecklistResponseValue, normalizeChecklistResponseValue);
  assert.equal(h.workflow.isChecklistStepAnswered, isChecklistStepAnswered);
  assert.equal(window.MaintainOpsProcedureChecklistWorkflow.isChecklistStepAnswered, isChecklistStepAnswered);
  for (const [response_type, value, expected] of [
    ["checkbox", false, false], ["checkbox", "false", false], ["checkbox", "unchecked", false],
    ["checkbox", "0", false], ["checkbox", true, true], ["checkbox", "checked", true],
    ["number", 0, true], ["number", "0", true], ["number", "-0.5", true],
    ["number", "", false], ["number", " \t", false], ["number", NaN, false],
    ["number", Infinity, false], ["number", "invalid", false],
    ["text", " \n\t ", false], ["text", null, false], ["text", undefined, false],
    ["text", "note", true], ["pass_fail", "pass", true], ["pass_fail", "fail", true],
    ["pass_fail", "false", false], ["pass_fail", "", false],
  ]) {
    assert.equal(isChecklistStepAnswered({ response_type }, value), expected, `${response_type}: ${value}`);
  }
});

for (const [stepId, input, expected] of [
  ["checkbox", false, ""],
  ["checkbox", true, "checked"],
  ["number", 0, "0"],
  ["number", "0", "0"],
  ["number", "", ""],
  ["text", " \t\n ", ""],
  ["text", null, ""],
  ["text", undefined, ""],
  ["text", " Inspection noted ", "Inspection noted"],
  ["pass_fail", "pass", "pass"],
  ["pass_fail", "fail", "fail"],
  ["pass_fail", "", ""],
]) {
  test(`normalize ${stepId} ${JSON.stringify(input)}`, async () => {
    const h = harness();
    const field = h.field(stepId, input);
    await h.save(field);
    const payload = h.state.writes[0];
    assert.equal(payload.value, expected);
    assert.equal(payload.completed_by, expected ? "user-1" : null);
    assert.equal(Boolean(payload.completed_at), Boolean(expected));
    assert.equal(h.state.events.length, 1);
    assert.equal(h.state.events[0][0], "wo-1");
    assert.equal(h.state.events[0][1], "checklist_updated");
    assert.equal(field.disabled, false);
    assert.deepEqual(h.state.notices, []);
  });
}

for (const [name, alter] of [
  ["missing work order", (h) => { h.state.workOrders = []; }],
  ["detached procedure", (h) => { h.state.workOrders[0].procedure_template_id = null; }],
  ["step from another procedure", (h) => { h.state.procedures[0].procedure_steps = []; }],
  ["work order from another company", (h) => { h.state.workOrders[0].company_id = "company-2"; }],
  ["procedure from another company", (h) => { h.state.procedures[0].company_id = "company-2"; }],
  ["step from another company", (h) => { h.state.procedures[0].procedure_steps[0].company_id = "company-2"; }],
  ["step with wrong template owner", (h) => { h.state.procedures[0].procedure_steps[0].procedure_template_id = "procedure-2"; }],
  ["missing session", (h) => { h.state.userId = null; }],
]) {
  test(`reject ${name} before write`, async () => {
    const h = harness();
    const field = h.field("checkbox", true);
    alter(h);
    await h.save(field);
    assert.equal(h.state.writes.length, 0);
    assert.equal(h.state.events.length, 0);
    assert.equal(h.state.reloads, 0);
    assert.match(h.state.notices[0][0], /Could not save checklist step/);
    assert.equal(field.disabled, false);
  });
}

test("invalid numeric and pass/fail responses cannot count as answered", async () => {
  for (const [stepId, value] of [["number", "NaN"], ["number", "Infinity"], ["pass_fail", "false"]]) {
    const h = harness();
    await h.save(h.field(stepId, value));
    assert.equal(h.state.writes.length, 0);
    assert.equal(h.state.notices.length, 1);
  }
});

test("responses and actors belong to a work order, not a shared PM template", async () => {
  const h = harness();
  await h.save(h.field("number", "42", "wo-1"));
  const original = clone(h.state.results["wo-1"].number);
  h.state.userId = "user-2";
  await h.save(h.field("number", 0, "wo-2"));
  assert.deepEqual(h.state.results["wo-1"].number, original);
  assert.equal(h.state.results["wo-2"].number.completed_by, "user-2");
  assert.equal(h.state.results["wo-2"].number.value, "0");
  await h.save(h.field("number", "", "wo-2"));
  assert.equal(h.state.results["wo-2"].number.completed_by, null);
  assert.equal(h.state.results["wo-2"].number.completed_at, null);
  assert.deepEqual(h.state.results["wo-1"].number, original);
});

test("failed save does not record success history or clear completion warnings", async () => {
  const h = harness({ upsert: async () => ({ error: new Error("Save rejected") }) });
  const field = h.field("checkbox", true);
  await h.save(field);
  assert.equal(h.state.events.length, 0);
  assert.equal(h.state.reloads, 0);
  assert.equal(h.state.warnings.length, 0);
  assert.equal(field.recorded.textContent, "initial timestamp");
  assert.match(h.state.notices[0][0], /Save rejected/);
  assert.equal(field.disabled, false);
});

test("history errors warn without losing a saved response or skipping refresh", async () => {
  for (const log of [
    async () => { throw new Error("History unavailable"); },
    async () => ({ error: new Error("History unavailable") }),
  ]) {
    const h = harness({ log });
    const field = h.field("checkbox", true);
    await h.save(field);
    assert.equal(h.state.results["wo-1"].checkbox.value, "checked");
    assert.equal(h.state.reloads, 1);
    assert.match(h.state.notices[0][0], /Checklist saved, but history did not update: History unavailable/);
    assert.equal(field.disabled, false);
  }
});

test("refresh failure keeps completion warning and distinguishes saved data", async () => {
  const h = harness({ reload: async () => { throw new Error("Refresh unavailable"); } });
  const field = h.field("checkbox", true);
  await h.save(field);
  assert.equal(h.state.persisted["wo-1"].checkbox.value, "checked");
  assert.equal(h.state.warnings.length, 0);
  assert.equal(field.recorded.textContent, "initial timestamp");
  assert.match(h.state.notices[0][0], /Checklist saved, but refresh did not finish/);
  assert.equal(field.disabled, false);
});

test("company or session switch during save cannot write history into the new scope", async () => {
  for (const key of ["companyId", "userId"]) {
    const h = harness({ upsert: async (payload, state) => {
      state[key] = "changed";
      return { error: null };
    } });
    const field = h.field("checkbox", true);
    await h.save(field);
    assert.equal(h.state.writes[0].company_id, "company-1");
    assert.equal(h.state.writes[0].completed_by, "user-1");
    assert.equal(h.state.events.length, 0);
    assert.equal(h.state.reloads, 0);
    assert.equal(field.recorded.textContent, "initial timestamp");
    assert.equal(field.disabled, false);
  }
});

test("company switch during history or refresh cannot clear the next workspace warning", async () => {
  for (const phase of ["log", "reload"]) {
    const h = harness({ [phase]: async (state) => { state.companyId = "company-2"; } });
    const field = h.field("checkbox", true);
    await h.save(field);
    assert.equal(h.state.warnings.length, 0);
    assert.equal(h.state.gates, 0);
    assert.equal(field.recorded.textContent, "initial timestamp");
    assert.equal(h.state.reloads, phase === "log" ? 0 : 1);
    assert.equal(field.disabled, false);
  }
});

test("field retargeting after an await cannot redirect saved-response history", async () => {
  let field;
  const h = harness({ upsert: async () => {
    field.dataset.workOrderId = "wo-2";
    return { error: null };
  } });
  field = h.field("checkbox", true);
  await h.save(field);
  assert.equal(h.state.events[0][0], "wo-1");
  assert.equal(field.recorded.textContent, "initial timestamp");
});

test("repeat events cannot double-save an in-flight field", async () => {
  let resolveSave;
  const pending = new Promise((resolve) => { resolveSave = resolve; });
  const h = harness({ upsert: () => pending });
  const field = h.field("checkbox", true);
  const firstSave = h.save(field);
  await h.save(field);
  assert.equal(h.state.writes.length, 1);
  assert.equal(field.disabled, true);
  resolveSave({ error: null });
  await firstSave;
  assert.equal(field.disabled, false);
  assert.equal(h.state.events.length, 1);
});

test("a work order disappearing during refresh cannot clear its completion warning", async () => {
  const h = harness({ reload: async (state) => { state.workOrders = []; } });
  const field = h.field("checkbox", true);
  await h.save(field);
  assert.equal(h.state.warnings.length, 0);
  assert.equal(h.state.gates, 0);
  assert.equal(field.recorded.textContent, "initial timestamp");
  assert.equal(field.disabled, false);
  assert.deepEqual(h.state.notices, []);
});

test("completion gates required answers; reopen retains responses; completed edits do not reopen", async () => {
  const h = harness();
  const workOrder = h.state.workOrders[0];
  const statusWrites = [];
  const statusWorkflow = createWorkOrderStatusWorkflow({
    getWorkOrders: () => h.state.workOrders,
    blocksProcedureCompletion: h.blocks,
    currentSafetyCheckboxCheckedForWorkOrder: () => false,
    hasCompletedSafetyDeviceCheck: () => false,
    requiresSafetyDeviceCheck: () => false,
    applySafetyRequirementPayload: () => {},
    applySafetyCheckPayload: () => {},
    withOperationTimeout: (promise) => promise,
    updateWorkOrderSafely: async (payload) => {
      statusWrites.push(payload);
      Object.assign(workOrder, payload);
      return { error: null };
    },
    setActiveWorkOrderId: () => {},
    setWorkOrderActionWarning: () => {},
    recordWorkOrderEvent: async () => {},
    showNotice: () => {},
    statusLabel: (status) => status,
    render: async () => {},
  });
  await h.save(h.field("checkbox", false));
  await h.save(h.field("number", 0));
  await h.save(h.field("text", "\n\t"));
  await h.save(h.field("pass_fail", "fail"));
  assert.equal(await statusWorkflow.setWorkOrderStatus("wo-1", "completed"), false);
  assert.equal(statusWrites.length, 0);
  await h.save(h.field("checkbox", true));
  await h.save(h.field("text", "Inspection complete"));
  assert.equal(h.state.warningId, "");
  assert.equal(await statusWorkflow.setWorkOrderStatus("wo-1", "completed"), true);
  const completedAt = workOrder.completed_at;
  await h.save(h.field("text", "Corrected note"));
  await h.save(h.field("checkbox", false));
  assert.equal(workOrder.status, "completed");
  assert.equal(workOrder.completed_at, completedAt);
  const responsesAtReopen = clone(h.state.results);
  h.state.gates = 0;
  assert.equal(await statusWorkflow.setWorkOrderStatus("wo-1", "open"), true);
  assert.equal(h.state.gates, 0, "Reopen is not a completion attempt");
  assert.equal(workOrder.completed_at, null);
  assert.deepEqual(h.state.results, responsesAtReopen);
  await h.save(h.field("checkbox", false));
  assert.equal(await statusWorkflow.setWorkOrderStatus("wo-1", "completed"), false);
});

test("completed work-order details can be edited without re-gating unchanged procedure", async () => {
  const h = harness();
  const workOrder = h.state.workOrders[0];
  workOrder.status = "completed";
  workOrder.completed_at = "2026-09-01T00:00:00.000Z";
  const values = { title: "Corrected title", procedure_template_id: "procedure-1" };
  const button = { disabled: false, isConnected: true };
  const updates = [];
  const workflow = createWorkOrderDetailEditWorkflow({
    documentRef: { querySelector: () => null },
    FormDataCtor: function () { return new Map(Object.entries(values)); },
    getActiveWorkOrderId: () => "wo-1",
    getWorkOrders: () => h.state.workOrders,
    requiredText: (value) => value,
    descriptionWithAssignmentNote: () => "",
    workOrderDateValue: () => null,
    assignedUserFromForm: () => null,
    procedureColumn: (value) => ({ procedure_template_id: value }),
    assetRequiresSafety: () => false,
    applySafetyCheckPayload: () => {},
    blocksProcedureCompletion: () => assert.fail("An unchanged completed procedure must not be re-gated"),
    withOperationTimeout: (promise) => promise,
    updateWorkOrderSafely: async (payload) => { updates.push(payload); return { error: null }; },
    recordWorkOrderEvent: async () => {},
    describeWorkOrderChanges: () => "Title corrected",
    setWorkOrderActionWarning: () => {},
    showNotice: () => {},
    render: async () => {},
    consoleRef: { error: (...args) => assert.fail(JSON.stringify(args)) },
  });
  await workflow.updateWorkOrderDetails({ preventDefault: () => {}, target: { querySelector: () => button } });
  assert.equal(updates.length, 1);
  assert.equal(updates[0].status, "completed");
  assert.equal(Object.hasOwn(updates[0], "completed_at"), false);
  assert.equal(button.disabled, false);
});

(async () => {
  let failures = 0;
  for (const { name, run } of tests) {
    try {
      await run();
    } catch (error) {
      failures += 1;
      console.error(`FAIL: ${name}\n${error.stack}`);
    }
  }
  assert.equal(failures, 0, `${failures} of ${tests.length} PM procedure lifecycle cases failed`);
  console.log(`PM procedure lifecycle smoke passed (${tests.length} isolated cases)`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
