const assert = require("node:assert/strict");

global.window = {};

const { createAppIssueWorkflow } = require("../../src/workflows/appIssueWorkflow.js");

function createElement({ dataset = {}, formValues = {} } = {}) {
  const listeners = {};
  const button = { disabled: false, textContent: "", isConnected: true };
  return {
    dataset,
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

(async () => {
  const reportForm = createElement({
    formValues: {
      screen: "work",
      severity: "high",
      title: "Button problem",
      details: "Save button did nothing.",
    },
  });
  const statusForm = createElement({
    dataset: { appIssueStatus: "issue-1" },
    formValues: { status: "resolved" },
  });
  const documentRef = createDocument({
    "#app-issue-report-form": reportForm,
    "[data-app-issue-status]": [statusForm],
    "#app-issue-report-error": { textContent: "" },
  });
  const calls = [];
  const state = {
    appIssueReportsReady: true,
    appIssueReports: [],
    reportIssueMode: true,
    notices: [],
    renderWorkspaceCount: 0,
  };

  const workflow = createAppIssueWorkflow({
    documentRef,
    windowRef: { location: { href: "https://example.com/MaintainOps/" } },
    FormDataCtor: FakeFormData,
    supabaseClient: () => "client",
    withOperationTimeout: (value) => value,
    listAppIssueReports: async () => {
      calls.push(["listAppIssueReports"]);
      return { data: [{ id: "issue-1" }], error: null };
    },
    createAppIssueReportRecord: async (_client, payload) => {
      calls.push(["createAppIssueReportRecord", payload]);
      return { error: null };
    },
    updateAppIssueReportStatusRecord: async (_client, companyId, reportId, nextStatus) => {
      calls.push(["updateAppIssueReportStatusRecord", companyId, reportId, nextStatus]);
      return { error: null };
    },
    appIssueReportErrorState: (error) => ({ message: error.message || String(error), appIssueReportsReady: null }),
    activeLocationDatabaseId: () => "location-1",
    requiredText: (value) => String(value || "").trim(),
    canManageTeam: () => true,
    getSession: () => ({ user: { id: "user-1" } }),
    getActiveCompanyId: () => "company-1",
    getActiveSection: () => "work",
    setAppIssueReportsReady: (value) => { state.appIssueReportsReady = value; },
    setAppIssueReports: (value) => { state.appIssueReports = value; },
    setReportIssueMode: (value) => { state.reportIssueMode = value; },
    showNotice: (message, tone = "success") => { state.notices.push([message, tone]); },
    renderWorkspace: () => { state.renderWorkspaceCount += 1; },
  });

  workflow.bindAppIssueWorkflowEvents();
  await reportForm.dispatch("submit");
  assert.equal(state.reportIssueMode, false);
  assert.equal(state.appIssueReports.length, 1);
  assert.equal(state.notices.at(-1)[0], "Issue report sent.");
  assert.ok(calls.some((call) => call[0] === "createAppIssueReportRecord"));

  await statusForm.dispatch("submit");
  assert.equal(state.notices.at(-1)[0], "Issue report updated.");
  assert.ok(calls.some((call) => call[0] === "updateAppIssueReportStatusRecord" && call[3] === "resolved"));
  assert.equal(state.renderWorkspaceCount, 2);

  console.log("app issue workflow smoke passed");
})();
