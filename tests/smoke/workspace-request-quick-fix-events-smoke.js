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
      return selector === "[data-quick-fix-request]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceRequestQuickFixEvents.js");

const { bindWorkspaceRequestQuickFixEvents } = window.MaintainOpsWorkspaceRequestQuickFixEvents;

const button = createButton({ quickFixRequest: "request-1" });
let openedRequestId = null;

bindWorkspaceRequestQuickFixEvents({
  documentRef: createDocument([button]),
  openQuickFixForRequest: (requestId) => {
    openedRequestId = requestId;
  },
});

button.dispatch("click");
assert.equal(openedRequestId, "request-1");

bindWorkspaceRequestQuickFixEvents({
  documentRef: createDocument([button]),
  openQuickFixForRequest: null,
});

console.log("workspace request quick fix events smoke passed");
