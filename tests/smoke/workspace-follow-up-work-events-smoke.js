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

function createDocument(buttons = []) {
  return {
    querySelectorAll(selector) {
      return selector === "[data-create-follow-up]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument();

require("../../src/utils/workspaceFollowUpWorkEvents.js");

const { bindWorkspaceFollowUpWorkEvents } = window.MaintainOpsWorkspaceFollowUpWorkEvents;

const followUpButton = createButton({ createFollowUp: "work-1" });
let sourceWorkOrderId = null;

bindWorkspaceFollowUpWorkEvents({
  documentRef: createDocument([followUpButton]),
  createFollowUpWorkOrder: (id) => {
    sourceWorkOrderId = id;
  },
});

followUpButton.dispatch("click");
assert.equal(sourceWorkOrderId, "work-1");

const unboundButton = createButton({ createFollowUp: "work-2" });
bindWorkspaceFollowUpWorkEvents({
  documentRef: createDocument([unboundButton]),
  createFollowUpWorkOrder: null,
});

sourceWorkOrderId = null;
unboundButton.dispatch("click");
assert.equal(sourceWorkOrderId, null);

console.log("workspace follow-up work events smoke passed");
