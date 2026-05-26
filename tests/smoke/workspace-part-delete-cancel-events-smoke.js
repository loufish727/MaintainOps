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
      return selector === "[data-cancel-delete-part]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspacePartDeleteCancelEvents.js");

const { bindWorkspacePartDeleteCancelEvents } = window.MaintainOpsWorkspacePartDeleteCancelEvents;

const cancelButton = createButton();
let pendingDeletePartId = "part-1";
let renderCount = 0;

bindWorkspacePartDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: {
    setPendingDeletePartId: (value) => {
      pendingDeletePartId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

cancelButton.dispatch("click");
assert.equal(pendingDeletePartId, null);
assert.equal(renderCount, 1);

bindWorkspacePartDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace part delete cancel events smoke passed");
