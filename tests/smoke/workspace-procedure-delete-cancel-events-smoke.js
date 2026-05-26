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
      return selector === "[data-cancel-delete-procedure]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceProcedureDeleteCancelEvents.js");

const { bindWorkspaceProcedureDeleteCancelEvents } = window.MaintainOpsWorkspaceProcedureDeleteCancelEvents;

const cancelButton = createButton();
let pendingDeleteProcedureId = "procedure-1";
let renderCount = 0;

bindWorkspaceProcedureDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: {
    setPendingDeleteProcedureId: (value) => {
      pendingDeleteProcedureId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

cancelButton.dispatch("click");
assert.equal(pendingDeleteProcedureId, null);
assert.equal(renderCount, 1);

bindWorkspaceProcedureDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace procedure delete cancel events smoke passed");
