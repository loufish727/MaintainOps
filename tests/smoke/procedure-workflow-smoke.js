const assert = require("node:assert/strict");

global.window = {};

const { createProcedureWorkflow } = require("../../src/workflows/procedureWorkflow.js");

function createElement({ dataset = {}, formValues = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    dataset,
    formValues,
    disabled: false,
    textContent: "",
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
  };
}

function createDocument(selectors = {}) {
  const elements = new Map(Object.entries(selectors));
  return {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { textContent: "" });
      return elements.get(selector);
    },
    querySelectorAll(selector) {
      const value = elements.get(selector);
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
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
    payload: null,
    insert(payload) {
      this.payload = payload;
      calls.push(["insert", table, payload]);
      return this;
    },
    delete() {
      calls.push(["delete", table]);
      return this;
    },
    select(_columns, options = {}) {
      calls.push(["select", table, options]);
      if (options.count === "exact") this.countMode = true;
      return this;
    },
    eq(column, value) {
      calls.push(["eq", table, column, value]);
      return this;
    },
    single() {
      return Promise.resolve({ data: { id: "template-new" }, error: null });
    },
    maybeSingle() {
      return Promise.resolve({ data: null, error: null });
    },
    then(resolve) {
      if (this.countMode) resolve({ count: 0, error: null });
      else resolve({ data: [{ id: "template-1" }], error: null });
    },
    catch() {
      return Promise.resolve({ error: null });
    },
  };
  return query;
}

(async () => {
  const procedureForm = createElement({
    formValues: { name: "Inspection", description: "Check equipment" },
  });
  const sampleButton = createElement();
  const stepForm = createElement({
    dataset: { addStep: "template-1" },
    formValues: { prompt: "Check oil", response_type: "checkbox", required: "true" },
  });
  const deleteButton = createElement();
  const documentRef = createDocument({
    "#create-procedure-form": procedureForm,
    "#seed-sample-procedure": sampleButton,
    "[data-add-step]": [stepForm],
    "#procedure-error": { textContent: "" },
    '[data-step-error="template-1"]': { textContent: "" },
    '[data-procedure-delete-error="template-1"]': { textContent: "" },
    '[data-confirm-delete-procedure="template-1"]': deleteButton,
  });
  const calls = [];
  const state = {
    notices: [],
    renders: 0,
    renderWorkspaceCount: 0,
    pendingDeleteProcedureId: "",
  };
  const templates = [{
    id: "template-1",
    name: "Inspection",
    procedure_steps: [{ id: "step-1" }],
  }];

  const workflow = createProcedureWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    CSSRef: { escape: (value) => value },
    supabaseClient: () => ({ from: (table) => createQuery(table, calls) }),
    withOperationTimeout: (value) => value,
    requiredText: (value) => String(value || "").trim(),
    canDeleteOperationalRecords: () => true,
    procedureDeleteBlockerMessage: () => "",
    alertUser: (message) => { throw new Error(message); },
    getSession: () => ({ user: { id: "user-1" } }),
    getActiveCompanyId: () => "company-1",
    getProcedureTemplates: () => templates,
    setPendingDeleteProcedureId: (value) => { state.pendingDeleteProcedureId = value; },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    render: async () => { state.renders += 1; },
    renderWorkspace: () => { state.renderWorkspaceCount += 1; },
  });

  workflow.bindProcedureWorkflowEvents();
  await procedureForm.dispatch("submit");
  assert.equal(state.notices.at(-1)[0], "Procedure added.");
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "procedure_templates"));

  templates.length = 0;
  await sampleButton.dispatch("click");
  assert.equal(state.notices.at(-1)[0], "Sample procedure added.");
  assert.ok(calls.some((call) => call[0] === "insert" && call[1] === "procedure_steps"));

  templates.push({ id: "template-1", name: "Inspection", procedure_steps: [{ id: "step-1" }] });
  await stepForm.dispatch("submit");
  assert.equal(state.notices.at(-1)[0], "Procedure step added.");

  await workflow.requestDeleteProcedureTemplate("template-1");
  assert.equal(state.pendingDeleteProcedureId, "template-1");
  assert.equal(state.renderWorkspaceCount, 1);

  await workflow.deleteProcedureTemplate("template-1");
  assert.equal(state.pendingDeleteProcedureId, null);
  assert.equal(state.notices.at(-1)[0], "Procedure deleted.");

  console.log("procedure workflow smoke passed");
})();
