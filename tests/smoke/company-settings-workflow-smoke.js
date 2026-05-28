const assert = require("node:assert/strict");

global.window = {};

const { createCompanySettingsWorkflow } = require("../../src/workflows/companySettingsWorkflow.js");

function createElement({ formValues = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    formValues,
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

function createCompanyQuery(calls) {
  return {
    update(payload) {
      calls.push(["update", "companies", payload]);
      return this;
    },
    eq(column, value) {
      calls.push(["eq", "companies", column, value]);
      return Promise.resolve({ error: null });
    },
  };
}

(async () => {
  const settingsForm = createElement({ formValues: { name: "Taylor Metal" } });
  const locationForm = createElement({ formValues: { name: "QA Facility" } });
  const urlForm = createElement({ formValues: { public_app_url: "https://example.com/MaintainOps/" } });
  const clearUrlForm = createElement({ formValues: { public_app_url: "" } });
  const documentRef = createDocument({
    "#company-settings-form": settingsForm,
    "#location-form": locationForm,
    "#public-app-url-form": urlForm,
    "#location-error": { textContent: "" },
    "#public-request-link-error": { textContent: "" },
  });
  const calls = [];
  const storage = {
    values: {},
    setItem(key, value) {
      this.values[key] = value;
    },
    removeItem(key) {
      delete this.values[key];
    },
  };
  const state = {
    activeLocationId: "",
    locationsReady: true,
    publicAppUrlOverride: "",
    notices: [],
    renders: 0,
    renderWorkspaceCount: 0,
  };

  const workflow = createCompanySettingsWorkflow({
    documentRef,
    FormDataCtor: FakeFormData,
    storage,
    supabaseClient: () => ({ from: () => createCompanyQuery(calls) }),
    withOperationTimeout: (value) => value,
    requiredText: (value) => String(value || "").trim(),
    createLocationRecord: async (_client, companyId, name) => {
      calls.push(["createLocationRecord", companyId, name]);
      return { data: { id: "location-1" }, error: null };
    },
    isColumnSchemaError: () => false,
    normalizePublicAppUrl: (value) => value.startsWith("https://") ? value.replace(/\/$/, "") : "",
    getActiveCompanyId: () => "company-1",
    getLocationsReady: () => state.locationsReady,
    setLocationsReady: (value) => { state.locationsReady = value; },
    setActiveLocationId: (value) => { state.activeLocationId = value; },
    setPublicAppUrlOverride: (value) => { state.publicAppUrlOverride = value; },
    persistActiveLocationId: (value) => { calls.push(["persistActiveLocationId", value]); },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    render: async () => { state.renders += 1; },
    renderWorkspace: () => { state.renderWorkspaceCount += 1; },
  });

  workflow.bindCompanySettingsWorkflowEvents();
  await settingsForm.dispatch("submit");
  assert.ok(calls.some((call) => call[0] === "update" && call[1] === "companies"));
  assert.equal(state.notices.at(-1)[0], "Company saved.");

  await locationForm.dispatch("submit");
  assert.equal(state.activeLocationId, "location-1");
  assert.ok(calls.some((call) => call[0] === "persistActiveLocationId"));
  assert.equal(state.notices.at(-1)[0], "Location added.");

  await urlForm.dispatch("submit");
  assert.equal(state.publicAppUrlOverride, "https://example.com/MaintainOps");
  assert.equal(storage.values["maintainops.publicAppUrl"], "https://example.com/MaintainOps");
  assert.equal(state.notices.at(-1)[0], "Public app URL saved.");

  clearUrlForm.addEventListener("submit", workflow.savePublicAppUrl);
  await clearUrlForm.dispatch("submit");
  assert.equal(state.publicAppUrlOverride, "");
  assert.equal(storage.values["maintainops.publicAppUrl"], undefined);
  assert.equal(state.notices.at(-1)[0], "Public app URL cleared.");

  console.log("company settings workflow smoke passed");
})();
