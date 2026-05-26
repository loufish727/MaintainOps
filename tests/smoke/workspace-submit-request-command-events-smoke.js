const assert = require("node:assert/strict");

function createButton() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    async dispatch(type) {
      for (const handler of listeners[type] || []) await handler();
    },
  };
}

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === '[data-command-action="request"]' ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceSubmitRequestCommandEvents.js");

const { bindWorkspaceSubmitRequestCommandEvents } = window.MaintainOpsWorkspaceSubmitRequestCommandEvents;

const requestButton = createButton();
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};
const stateValues = {
  activeWorkOrderId: "wo-1",
  activeAssetId: "asset-1",
  activeSection: "work",
  createWorkOrderMode: true,
  quickFixMode: true,
  reportIssueMode: true,
  quickFixAssetId: "asset-2",
  quickFixRequestId: "request-1",
};
let requestResetCount = 0;
let requestReloadCount = 0;
let workSearchModeValue = true;

bindWorkspaceSubmitRequestCommandEvents({
  documentRef: createDocument([requestButton]),
  storage,
  state: {
    setActiveAssetId: (value) => { stateValues.activeAssetId = value; },
    setActiveSection: (value) => { stateValues.activeSection = value; },
    setActiveWorkOrderId: (value) => { stateValues.activeWorkOrderId = value; },
    setCreateWorkOrderMode: (value) => { stateValues.createWorkOrderMode = value; },
    setQuickFixAssetId: (value) => { stateValues.quickFixAssetId = value; },
    setQuickFixMode: (value) => { stateValues.quickFixMode = value; },
    setQuickFixRequestId: (value) => { stateValues.quickFixRequestId = value; },
    setReportIssueMode: (value) => { stateValues.reportIssueMode = value; },
  },
  setWorkOrderSearchMode: (value) => { workSearchModeValue = value; },
  resetRequestsPage: () => { requestResetCount += 1; },
  reloadRequestQueue: async () => { requestReloadCount += 1; },
});

(async () => {
  await requestButton.dispatch("click");
  assert.equal(stateValues.activeWorkOrderId, null);
  assert.equal(stateValues.activeAssetId, null);
  assert.equal(stateValues.createWorkOrderMode, false);
  assert.equal(stateValues.quickFixMode, false);
  assert.equal(stateValues.reportIssueMode, false);
  assert.equal(stateValues.quickFixAssetId, null);
  assert.equal(stateValues.quickFixRequestId, null);
  assert.equal(stateValues.activeSection, "requests");
  assert.equal(workSearchModeValue, false);
  assert.equal(storage.values["maintainops.activeSection"], "requests");
  assert.equal(requestResetCount, 1);
  assert.equal(requestReloadCount, 1);

  bindWorkspaceSubmitRequestCommandEvents({
    documentRef: createDocument([requestButton]),
    state: null,
    resetRequestsPage: () => {
      throw new Error("missing state should not reset");
    },
    reloadRequestQueue: async () => {
      throw new Error("missing state should not reload");
    },
  });

  console.log("workspace submit request command events smoke passed");
})();
