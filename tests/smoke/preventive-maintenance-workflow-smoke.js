const assert = require("node:assert/strict");

global.window = {};

const { createPreventiveMaintenanceWorkflow } = require("../../src/workflows/preventiveMaintenanceWorkflow.js");

function createElement({ formValues = {}, dataset = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    formValues,
    dataset,
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
    async dispatch(type) {
      await listeners[type]({ preventDefault() {}, currentTarget: this });
    },
    querySelector(selector) {
      if (selector === "button[type='submit']") return button;
      return null;
    },
    button,
    disabled: false,
    textContent: "",
  };
}

function createDocument(selectors) {
  const elements = new Map(Object.entries(selectors));
  return {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { textContent: "" });
      return elements.get(selector);
    },
  };
}

class FakeFormData {
  constructor(form) {
    this.values = form.formValues || {};
  }

  get(name) {
    return this.values[name] || "";
  }
}

function createQuery(table, calls) {
  const query = {
    filters: [],
    insertPayload: null,
    updatePayload: null,
    insert(payload) {
      this.insertPayload = payload;
      calls.push(["insert", table, payload]);
      return this;
    },
    update(payload) {
      this.updatePayload = payload;
      calls.push(["update", table, payload]);
      return this;
    },
    delete() {
      calls.push(["delete", table]);
      return this;
    },
    eq(column, value) {
      this.filters.push([column, value]);
      calls.push(["eq", table, column, value]);
      return this;
    },
    select() {
      return this;
    },
    maybeSingle() {
      return Promise.resolve({ data: null, error: null });
    },
    then(resolve) {
      resolve({ data: [{ id: "schedule-1" }], error: null });
    },
    catch() {
      return Promise.resolve({ error: null });
    },
  };
  return query;
}

(async () => {
  const pmForm = createElement({
    formValues: {
      asset_id: "asset-1",
      title: "Monthly PM",
      frequency: "monthly",
      next_due_at: "2026-06-01",
      procedure_template_id: "procedure-1",
    },
  });
  const deleteButton = createElement();
  const generateButton = createElement();
  const documentRef = createDocument({
    "#create-pm-form": pmForm,
    "#pm-error": { textContent: "" },
    '[data-confirm-delete-schedule="schedule-1"]': deleteButton,
    '[data-generate-pm="schedule-1"]': generateButton,
  });
  const calls = [];
  const state = {
    pendingDeleteScheduleId: "",
    activeWorkOrderId: "",
    activeSection: "",
    notices: [],
    renders: 0,
    renderWorkspaceCount: 0,
  };
  const schedules = [{
    id: "schedule-1",
    asset_id: "asset-1",
    title: "Monthly PM",
    frequency: "monthly",
    next_due_at: "2026-06-01",
    procedure_template_id: "procedure-1",
  }];

  const workflow = createPreventiveMaintenanceWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    CSSRef: { escape: (value) => value },
    supabaseClient: () => ({ from: (table) => createQuery(table, calls) }),
    withOperationTimeout: (value) => value,
    insertWithOptionalProcedure: async (table, payload, options = {}) => {
      calls.push(["insertWithOptionalProcedure", table, payload, options]);
      return { data: { id: "work-1" }, error: null };
    },
    confirmAssetLocationRouting: () => true,
    locationIdForAsset: () => "location-1",
    requiredText: (value) => String(value || "").trim(),
    procedureColumn: (id) => ({ procedure_template_id: id || null }),
    canDeleteOperationalRecords: () => true,
    applySafetyRequirementPayload: (payload) => { payload.requires_safety_check = true; },
    applySafetyCheckPayload: (payload, checked) => { payload.safety_devices_checked = checked; },
    nextDueDate: () => "2026-07-01",
    alertUser: (message) => { throw new Error(message); },
    getSession: () => ({ user: { id: "user-1" } }),
    getActiveCompanyId: () => "company-1",
    getPreventiveSchedules: () => schedules,
    setPendingDeleteScheduleId: (value) => { state.pendingDeleteScheduleId = value; },
    setActiveWorkOrderId: (value) => { state.activeWorkOrderId = value; },
    setActiveSection: (value) => { state.activeSection = value; },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    render: async () => { state.renders += 1; },
    renderWorkspace: () => { state.renderWorkspaceCount += 1; },
  });

  workflow.bindPreventiveMaintenanceWorkflowEvents();
  await pmForm.dispatch("submit");
  assert.equal(state.notices.at(-1)[0], "PM schedule added.");
  assert.equal(state.renders, 1);
  assert.ok(calls.some((call) => call[0] === "insertWithOptionalProcedure" && call[1] === "preventive_schedules"));

  workflow.requestDeletePreventiveSchedule("schedule-1");
  assert.equal(state.pendingDeleteScheduleId, "schedule-1");
  assert.equal(state.renderWorkspaceCount, 1);

  await workflow.deletePreventiveSchedule("schedule-1");
  assert.equal(state.pendingDeleteScheduleId, null);
  assert.equal(state.notices.at(-1)[0], "PM schedule deleted.");
  assert.ok(calls.some((call) => call[0] === "delete" && call[1] === "preventive_schedules"));

  await workflow.generatePreventiveWorkOrder("schedule-1");
  assert.equal(state.activeWorkOrderId, "work-1");
  assert.equal(state.activeSection, "work");
  assert.equal(state.notices.at(-1)[0], "PM work order generated.");
  assert.ok(calls.some((call) => call[0] === "update" && call[1] === "preventive_schedules"));

  console.log("preventive maintenance workflow smoke passed");
})();
