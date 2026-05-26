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

function createDocument({ deleteButtons = [], cancelButtons = [] }) {
  return {
    querySelectorAll(selector) {
      if (selector === "[data-delete-request]") return deleteButtons;
      if (selector === "[data-cancel-delete-request]") return cancelButtons;
      return [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceRequestDeleteCancelEvents.js");

const { bindWorkspaceRequestDeleteCancelEvents } = window.MaintainOpsWorkspaceRequestDeleteCancelEvents;

const deleteButton = createButton({ deleteRequest: "request-2" });
const cancelButton = createButton();
let pendingDeleteRequestId = "request-1";
let renderCount = 0;
let requestedDeleteRequestId = null;

bindWorkspaceRequestDeleteCancelEvents({
  documentRef: createDocument({
    deleteButtons: [deleteButton],
    cancelButtons: [cancelButton],
  }),
  requestDeleteMaintenanceRequest: (id) => {
    requestedDeleteRequestId = id;
  },
  state: {
    setPendingDeleteRequestId: (value) => {
      pendingDeleteRequestId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

deleteButton.dispatch("click");
assert.equal(requestedDeleteRequestId, "request-2");

cancelButton.dispatch("click");
assert.equal(pendingDeleteRequestId, null);
assert.equal(renderCount, 1);

bindWorkspaceRequestDeleteCancelEvents({
  documentRef: createDocument({ cancelButtons: [cancelButton] }),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace request delete cancel events smoke passed");
