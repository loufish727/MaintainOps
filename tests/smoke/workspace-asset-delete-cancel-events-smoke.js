const assert = require("node:assert/strict");

function createButton(dataset = {}) {
  const listeners = {};
  return {
    dataset,
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event) {
      (listeners[type] || []).forEach((handler) => handler(event));
    },
  };
}

function createDocument({ deleteButtons = [], cancelButtons = [] }) {
  return {
    querySelectorAll(selector) {
      if (selector === "[data-delete-asset]") return deleteButtons;
      if (selector === "[data-cancel-delete-asset]") return cancelButtons;
      return [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceAssetDeleteCancelEvents.js");

const { bindWorkspaceAssetDeleteCancelEvents } = window.MaintainOpsWorkspaceAssetDeleteCancelEvents;

const deleteButton = createButton({ deleteAsset: "asset-2" });
const cancelButton = createButton();
let pendingDeleteAssetId = "asset-1";
let renderCount = 0;
let stopCount = 0;
let requestedDeleteAssetId = null;

bindWorkspaceAssetDeleteCancelEvents({
  documentRef: createDocument({
    deleteButtons: [deleteButton],
    cancelButtons: [cancelButton],
  }),
  requestDeleteAsset: async (id) => {
    requestedDeleteAssetId = id;
  },
  state: {
    setPendingDeleteAssetId: (value) => {
      pendingDeleteAssetId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

deleteButton.dispatch("click", {
  stopPropagation: () => {
    stopCount += 1;
  },
});
assert.equal(requestedDeleteAssetId, "asset-2");
assert.equal(stopCount, 1);

cancelButton.dispatch("click", {
  stopPropagation: () => {
    stopCount += 1;
  },
});
assert.equal(pendingDeleteAssetId, null);
assert.equal(renderCount, 1);
assert.equal(stopCount, 2);

bindWorkspaceAssetDeleteCancelEvents({
  documentRef: createDocument({ cancelButtons: [cancelButton] }),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace asset delete cancel events smoke passed");
