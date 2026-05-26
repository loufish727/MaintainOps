const assert = require("node:assert/strict");

function createButton() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      for (const handler of listeners[type] || []) handler();
    },
  };
}

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === '[data-command-action="create-work-order"]' ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceNewWorkOrderCommandEvents.js");

const { bindWorkspaceNewWorkOrderCommandEvents } = window.MaintainOpsWorkspaceNewWorkOrderCommandEvents;

const newWorkOrderButton = createButton();
const storage = {
  values: {},
  setItem(key, value) {
    this.values[key] = value;
  },
};
const stateValues = {
  activeWorkOrderId: "wo-1",
  activeAssetId: "asset-1",
  activeSection: "requests",
  createWorkOrderMode: false,
  quickFixMode: true,
  reportIssueMode: true,
  quickFixAssetId: "asset-2",
  quickFixRequestId: "request-1",
};
let renderCount = 0;
let workSearchModeValue = true;

bindWorkspaceNewWorkOrderCommandEvents({
  documentRef: createDocument([newWorkOrderButton]),
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
  renderWorkspace: () => { renderCount += 1; },
});

newWorkOrderButton.dispatch("click");
assert.equal(stateValues.activeWorkOrderId, null);
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.createWorkOrderMode, true);
assert.equal(stateValues.quickFixMode, false);
assert.equal(stateValues.reportIssueMode, false);
assert.equal(stateValues.quickFixAssetId, null);
assert.equal(stateValues.quickFixRequestId, null);
assert.equal(stateValues.activeSection, "work");
assert.equal(workSearchModeValue, false);
assert.equal(storage.values["maintainops.activeSection"], "work");
assert.equal(renderCount, 1);

bindWorkspaceNewWorkOrderCommandEvents({
  documentRef: createDocument([newWorkOrderButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace new work order command events smoke passed");
