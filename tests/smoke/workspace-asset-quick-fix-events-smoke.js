const assert = require("node:assert/strict");

function createButton(dataset = {}) {
  const listeners = {};
  return {
    dataset,
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
      return selector === "[data-quick-fix-asset]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);
global.localStorage = { setItem() {} };

require("../../src/utils/workspaceAssetQuickFixEvents.js");

const { bindWorkspaceAssetQuickFixEvents } = window.MaintainOpsWorkspaceAssetQuickFixEvents;

const button = createButton({ quickFixAsset: "asset-1" });
const changes = [];
let storageWrite = null;
let renderCount = 0;

bindWorkspaceAssetQuickFixEvents({
  documentRef: createDocument([button]),
  storage: {
    setItem: (key, value) => {
      storageWrite = { key, value };
    },
  },
  state: {
    setActiveAssetId: (value) => changes.push(["activeAssetId", value]),
    setActiveSection: (value) => changes.push(["activeSection", value]),
    setActiveWorkOrderId: (value) => changes.push(["activeWorkOrderId", value]),
    setCreateWorkOrderMode: (value) => changes.push(["createWorkOrderMode", value]),
    setQuickFixAssetId: (value) => changes.push(["quickFixAssetId", value]),
    setQuickFixMode: (value) => changes.push(["quickFixMode", value]),
    setQuickFixRequestId: (value) => changes.push(["quickFixRequestId", value]),
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

button.dispatch("click");
assert.deepEqual(changes, [
  ["quickFixAssetId", "asset-1"],
  ["quickFixRequestId", null],
  ["activeAssetId", null],
  ["activeWorkOrderId", null],
  ["createWorkOrderMode", false],
  ["quickFixMode", true],
  ["activeSection", "mywork"],
]);
assert.deepEqual(storageWrite, { key: "maintainops.activeSection", value: "mywork" });
assert.equal(renderCount, 1);

bindWorkspaceAssetQuickFixEvents({
  documentRef: createDocument([button]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace asset quick fix events smoke passed");
