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
      return selector === '[data-command-action="quick-fix"]' ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);
global.localStorage = { setItem() {} };

require("../../src/utils/workspaceQuickFixCommandEvents.js");

const { bindWorkspaceQuickFixCommandEvents } = window.MaintainOpsWorkspaceQuickFixCommandEvents;

const button = createButton();
const changes = [];
let searchMode = true;
let storageWrite = null;
let renderCount = 0;

bindWorkspaceQuickFixCommandEvents({
  documentRef: createDocument([button]),
  storage: {
    setItem: (key, value) => {
      storageWrite = { key, value };
    },
  },
  state: {
    setActiveWorkOrderId: (value) => changes.push(["activeWorkOrderId", value]),
    setActiveAssetId: (value) => changes.push(["activeAssetId", value]),
    setActiveSection: (value) => changes.push(["activeSection", value]),
    setCreateWorkOrderMode: (value) => changes.push(["createWorkOrderMode", value]),
    setQuickFixAssetId: (value) => changes.push(["quickFixAssetId", value]),
    setQuickFixMode: (value) => changes.push(["quickFixMode", value]),
    setQuickFixRequestId: (value) => changes.push(["quickFixRequestId", value]),
    setReportIssueMode: (value) => changes.push(["reportIssueMode", value]),
  },
  setWorkOrderSearchMode: (value) => {
    searchMode = value;
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

button.dispatch("click");
assert.deepEqual(changes, [
  ["activeWorkOrderId", null],
  ["activeAssetId", null],
  ["createWorkOrderMode", false],
  ["quickFixMode", true],
  ["reportIssueMode", false],
  ["quickFixAssetId", null],
  ["quickFixRequestId", null],
  ["activeSection", "mywork"],
]);
assert.equal(searchMode, false);
assert.deepEqual(storageWrite, { key: "maintainops.activeSection", value: "mywork" });
assert.equal(renderCount, 1);

bindWorkspaceQuickFixCommandEvents({
  documentRef: createDocument([button]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace quick fix command events smoke passed");
