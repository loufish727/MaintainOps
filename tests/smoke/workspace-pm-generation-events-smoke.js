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
      return selector === "[data-generate-pm]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument();

require("../../src/utils/workspacePmGenerationEvents.js");

const { bindWorkspacePmGenerationEvents } = window.MaintainOpsWorkspacePmGenerationEvents;

const generateButton = createButton({ generatePm: "schedule-1" });
let generatedScheduleId = null;

bindWorkspacePmGenerationEvents({
  documentRef: createDocument([generateButton]),
  generatePreventiveWorkOrder: (id) => {
    generatedScheduleId = id;
  },
});

generateButton.dispatch("click");
assert.equal(generatedScheduleId, "schedule-1");

const unboundButton = createButton({ generatePm: "schedule-2" });
bindWorkspacePmGenerationEvents({
  documentRef: createDocument([unboundButton]),
  generatePreventiveWorkOrder: null,
});

generatedScheduleId = null;
unboundButton.dispatch("click");
assert.equal(generatedScheduleId, null);

console.log("workspace pm generation events smoke passed");
