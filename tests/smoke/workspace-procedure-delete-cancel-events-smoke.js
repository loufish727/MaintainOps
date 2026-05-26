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
      if (selector === "[data-delete-procedure]") return deleteButtons;
      if (selector === "[data-cancel-delete-procedure]") return cancelButtons;
      return [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceProcedureDeleteCancelEvents.js");

const { bindWorkspaceProcedureDeleteCancelEvents } = window.MaintainOpsWorkspaceProcedureDeleteCancelEvents;

const deleteButton = createButton({ deleteProcedure: "procedure-2" });
const cancelButton = createButton();
let pendingDeleteProcedureId = "procedure-1";
let renderCount = 0;
let requestedDeleteProcedureId = null;

bindWorkspaceProcedureDeleteCancelEvents({
  documentRef: createDocument({
    deleteButtons: [deleteButton],
    cancelButtons: [cancelButton],
  }),
  requestDeleteProcedureTemplate: async (id) => {
    requestedDeleteProcedureId = id;
  },
  state: {
    setPendingDeleteProcedureId: (value) => {
      pendingDeleteProcedureId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

deleteButton.dispatch("click");
assert.equal(requestedDeleteProcedureId, "procedure-2");

cancelButton.dispatch("click");
assert.equal(pendingDeleteProcedureId, null);
assert.equal(renderCount, 1);

bindWorkspaceProcedureDeleteCancelEvents({
  documentRef: createDocument({ cancelButtons: [cancelButton] }),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace procedure delete cancel events smoke passed");
