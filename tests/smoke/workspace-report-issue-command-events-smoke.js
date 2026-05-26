const assert = require("node:assert/strict");

function createButton() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      (listeners[type] || []).forEach((handler) => handler());
    },
  };
}

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === '[data-command-action="report-issue"]' ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceReportIssueCommandEvents.js");

const { bindWorkspaceReportIssueCommandEvents } = window.MaintainOpsWorkspaceReportIssueCommandEvents;

const reportButton = createButton();
const stateValues = {
  activeWorkOrderId: "wo-1",
  activeAssetId: "asset-1",
  activePartId: "part-1",
  createWorkOrderMode: true,
  quickFixMode: true,
  reportIssueMode: false,
};
let renderCount = 0;

bindWorkspaceReportIssueCommandEvents({
  documentRef: createDocument([reportButton]),
  state: {
    setActiveAssetId: (value) => { stateValues.activeAssetId = value; },
    setActivePartId: (value) => { stateValues.activePartId = value; },
    setActiveWorkOrderId: (value) => { stateValues.activeWorkOrderId = value; },
    setCreateWorkOrderMode: (value) => { stateValues.createWorkOrderMode = value; },
    setQuickFixMode: (value) => { stateValues.quickFixMode = value; },
    setReportIssueMode: (value) => { stateValues.reportIssueMode = value; },
  },
  renderWorkspace: () => { renderCount += 1; },
});

reportButton.dispatch("click");
assert.equal(stateValues.activeWorkOrderId, null);
assert.equal(stateValues.activeAssetId, null);
assert.equal(stateValues.activePartId, null);
assert.equal(stateValues.createWorkOrderMode, false);
assert.equal(stateValues.quickFixMode, false);
assert.equal(stateValues.reportIssueMode, true);
assert.equal(renderCount, 1);

bindWorkspaceReportIssueCommandEvents({
  documentRef: createDocument([reportButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace report issue command events smoke passed");
