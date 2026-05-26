const assert = require("node:assert/strict");

function createButton() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event) {
      (listeners[type] || []).forEach((handler) => handler(event));
    },
  };
}

function createDocument(buttons) {
  return {
    querySelectorAll(selector) {
      return selector === "[data-cancel-delete-asset]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceAssetDeleteCancelEvents.js");

const { bindWorkspaceAssetDeleteCancelEvents } = window.MaintainOpsWorkspaceAssetDeleteCancelEvents;

const cancelButton = createButton();
let pendingDeleteAssetId = "asset-1";
let renderCount = 0;
let stopCount = 0;

bindWorkspaceAssetDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: {
    setPendingDeleteAssetId: (value) => {
      pendingDeleteAssetId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

cancelButton.dispatch("click", {
  stopPropagation: () => {
    stopCount += 1;
  },
});
assert.equal(pendingDeleteAssetId, null);
assert.equal(renderCount, 1);
assert.equal(stopCount, 1);

bindWorkspaceAssetDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace asset delete cancel events smoke passed");
