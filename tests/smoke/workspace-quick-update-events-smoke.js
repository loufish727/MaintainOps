const assert = require("node:assert/strict");

function createForm() {
  const listeners = {};
  return {
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type, event = {}) {
      (listeners[type] || []).forEach((handler) => handler(event));
    },
    listenerCount(type) {
      return (listeners[type] || []).length;
    },
  };
}

function createDocument(form) {
  return {
    querySelector(selector) {
      return selector === "#quick-update-work-order-form" ? form : null;
    },
  };
}

global.window = {};
global.document = createDocument(null);

require("../../src/utils/workspaceQuickUpdateEvents.js");

const { bindWorkspaceQuickUpdateEvents } = window.MaintainOpsWorkspaceQuickUpdateEvents;

const form = createForm();
let submittedEvent = null;

bindWorkspaceQuickUpdateEvents({
  documentRef: createDocument(form),
  updateWorkOrderQuickView: (event) => {
    submittedEvent = event;
  },
});

assert.equal(form.listenerCount("submit"), 1);
const event = { type: "submit" };
form.dispatch("submit", event);
assert.equal(submittedEvent, event);

const unboundForm = createForm();
bindWorkspaceQuickUpdateEvents({
  documentRef: createDocument(unboundForm),
  updateWorkOrderQuickView: null,
});

assert.equal(unboundForm.listenerCount("submit"), 0);

bindWorkspaceQuickUpdateEvents({
  documentRef: createDocument(null),
  updateWorkOrderQuickView: () => {},
});

console.log("workspace quick update events smoke passed");
