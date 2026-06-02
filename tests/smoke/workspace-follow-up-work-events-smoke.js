const assert = require("node:assert/strict");

function createButton(dataset = {}, container = null) {
  const listeners = {};
  return {
    dataset,
    closest(selector) {
      return selector === "[data-follow-up-create]" ? container : null;
    },
    addEventListener(type, handler) {
      listeners[type] = listeners[type] || [];
      listeners[type].push(handler);
    },
    dispatch(type) {
      (listeners[type] || []).forEach((handler) => handler());
    },
  };
}

function createFollowUpContainer(daysValue = "14") {
  return {
    querySelector(selector) {
      return selector === "[name='follow_up_days']" ? { value: daysValue } : null;
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

const followUpButton = createButton({ createFollowUp: "work-1" }, createFollowUpContainer("14"));
let sourceWorkOrderId = null;
let followUpDays = null;

bindWorkspaceFollowUpWorkEvents({
  documentRef: createDocument([followUpButton]),
  createFollowUpWorkOrder: (id, days) => {
    sourceWorkOrderId = id;
    followUpDays = days;
  },
});

followUpButton.dispatch("click");
assert.equal(sourceWorkOrderId, "work-1");
assert.equal(followUpDays, "14");

const unboundButton = createButton({ createFollowUp: "work-2" });
bindWorkspaceFollowUpWorkEvents({
  documentRef: createDocument([unboundButton]),
  createFollowUpWorkOrder: null,
});

sourceWorkOrderId = null;
unboundButton.dispatch("click");
assert.equal(sourceWorkOrderId, null);

console.log("workspace follow-up work events smoke passed");
