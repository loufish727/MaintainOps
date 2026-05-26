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

function createDocument({ deleteButtons = [], permanentDeleteButtons = [], cancelButtons = [] }) {
  return {
    querySelectorAll(selector) {
      if (selector === "[data-delete-part]:not(.permanent-delete-button)") return deleteButtons;
      if (selector === "[data-delete-part].permanent-delete-button") return permanentDeleteButtons;
      if (selector === "[data-cancel-delete-part]") return cancelButtons;
      return [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspacePartDeleteCancelEvents.js");

const { bindWorkspacePartDeleteCancelEvents } = window.MaintainOpsWorkspacePartDeleteCancelEvents;

const deleteButton = createButton({ deletePart: "part-2" });
const permanentDeleteButton = createButton({ deletePart: "part-3" });
const cancelButton = createButton();
let pendingDeletePartId = "part-1";
let renderCount = 0;
let requestedDeletePartId = null;

bindWorkspacePartDeleteCancelEvents({
  documentRef: createDocument({
    deleteButtons: [deleteButton],
    permanentDeleteButtons: [permanentDeleteButton],
    cancelButtons: [cancelButton],
  }),
  requestDeletePart: (id) => {
    requestedDeletePartId = id;
  },
  state: {
    setPendingDeletePartId: (value) => {
      pendingDeletePartId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

deleteButton.dispatch("click");
assert.equal(requestedDeletePartId, "part-2");

permanentDeleteButton.dispatch("click");
assert.equal(requestedDeletePartId, "part-3");

cancelButton.dispatch("click");
assert.equal(pendingDeletePartId, null);
assert.equal(renderCount, 1);

bindWorkspacePartDeleteCancelEvents({
  documentRef: createDocument({ cancelButtons: [cancelButton] }),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace part delete cancel events smoke passed");
