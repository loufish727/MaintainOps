const assert = require("node:assert/strict");

global.window = {};

const { createPartInventoryWorkflow } = require("../../src/workflows/partInventoryWorkflow.js");

function createElement({ dataset = {}, formValues = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    dataset,
    formValues,
    resetCalled: false,
    addEventListener(type, handler) {
      listeners[type] = handler;
    },
    async dispatch(type) {
      await listeners[type]({ preventDefault() {}, currentTarget: this, target: this });
    },
    querySelector(selector) {
      if (selector === "button[type='submit']") return button;
      return null;
    },
    reset() {
      this.resetCalled = true;
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
  return {
    payload: null,
    insert(payload) {
      this.payload = payload;
      calls.push(["insert", table, payload]);
      return this;
    },
    update(payload) {
      this.payload = payload;
      calls.push(["update", table, payload]);
      return this;
    },
    eq(column, value) {
      calls.push(["eq", table, column, value]);
      return this;
    },
    select() {
      calls.push(["select", table]);
      return this;
    },
    single() {
      return Promise.resolve({ data: { id: "part-new" }, error: null });
    },
    then(resolve) {
      resolve({ error: null });
    },
  };
}

(async () => {
  const createForm = createElement({
    formValues: { name: "Filter", sku: "F-1", supplier_name: "Acme", machine_note: "MS200", quantity_on_hand: "5", reorder_point: "2", unit_cost: "3.5" },
  });
  const restockForm = createElement({ dataset: { restockPart: "part-1" }, formValues: { quantity: "3" } });
  const useForm = createElement({ dataset: { usePart: "part-1" }, formValues: { quantity: "4" } });
  const editForm = createElement({
    dataset: { editPart: "part-1" },
    formValues: { name: "Filter XL", sku: "F-2", supplier_name: "Acme", machine_note: "ASC Line", quantity_on_hand: "7", reorder_point: "2", unit_cost: "4" },
  });
  const sourceForm = createElement({ formValues: { old_source: "Acme", new_source: "Supply Co" } });
  const documentRef = createDocument({
    "#create-part-form": createForm,
    "[data-restock-part]": [restockForm],
    "[data-use-part]": [useForm],
    "[data-edit-part]": [editForm],
    "[data-rename-part-source]": [sourceForm],
    "#part-create-error": { textContent: "" },
    '[data-part-edit-error="part-1"]': { textContent: "" },
    "#part-source-error": { textContent: "" },
  });
  const parts = [{ id: "part-1", quantity_on_hand: 10 }];
  const calls = [];
  const state = {
    activePartId: "",
    locationsReady: true,
    partSuppliersReady: true,
    partCostsReady: true,
    clearPartSearchCount: 0,
    notices: [],
    renders: 0,
  };

  const workflow = createPartInventoryWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    supabaseClient: () => ({ from: (table) => createQuery(table, calls) }),
    withOperationTimeout: (value) => value,
    activeLocationDatabaseId: () => "location-1",
    isMissingColumnError: () => false,
    databaseSetupRequiredMessage: (label) => `setup needed for ${label}`,
    getActiveCompanyId: () => "company-1",
    getParts: () => parts,
    getPartSuppliersReady: () => state.partSuppliersReady,
    setLocationsReady: (value) => { state.locationsReady = value; },
    setPartSuppliersReady: (value) => { state.partSuppliersReady = value; },
    setPartCostsReady: (value) => { state.partCostsReady = value; },
    setPartMachineNotesReady: (value) => { state.partMachineNotesReady = value; },
    setActivePartId: (value) => { state.activePartId = value; },
    clearPartSearchState: () => { state.clearPartSearchCount += 1; },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    render: async () => { state.renders += 1; },
  });

  workflow.bindPartInventoryWorkflowEvents();

  await createForm.dispatch("submit");
  assert.equal(state.activePartId, "part-new");
  assert.ok(calls.some((call) => call[0] === "insert" && call[2].machine_note === "MS200"));
  assert.equal(createForm.resetCalled, true);
  assert.equal(state.notices.at(-1)[0], "Part added.");

  await restockForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "update" && call[2].quantity_on_hand === 13));
  assert.equal(state.notices.at(-1)[0], "Part restocked.");

  await useForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "update" && call[2].quantity_on_hand === 6));
  assert.equal(state.notices.at(-1)[0], "Part used.");

  await editForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "update" && call[2].machine_note === "ASC Line"));
  assert.equal(state.activePartId, null);
  assert.equal(state.notices.at(-1)[0], "Part saved.");

  await sourceForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "update" && call[2].supplier_name === "Supply Co"));
  assert.equal(state.notices.at(-1)[0], "Part source updated.");

  console.log("part inventory workflow smoke passed");
})();
