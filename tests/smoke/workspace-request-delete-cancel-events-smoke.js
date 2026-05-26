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
      return selector === "[data-cancel-delete-request]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceRequestDeleteCancelEvents.js");

const { bindWorkspaceRequestDeleteCancelEvents } = window.MaintainOpsWorkspaceRequestDeleteCancelEvents;

const cancelButton = createButton();
let pendingDeleteRequestId = "request-1";
let renderCount = 0;

bindWorkspaceRequestDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: {
    setPendingDeleteRequestId: (value) => {
      pendingDeleteRequestId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

cancelButton.dispatch("click");
assert.equal(pendingDeleteRequestId, null);
assert.equal(renderCount, 1);

bindWorkspaceRequestDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace request delete cancel events smoke passed");
