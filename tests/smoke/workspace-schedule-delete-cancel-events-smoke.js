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
      return selector === "[data-cancel-delete-schedule]" ? buttons : [];
    },
  };
}

global.window = {};
global.document = createDocument([]);

require("../../src/utils/workspaceScheduleDeleteCancelEvents.js");

const { bindWorkspaceScheduleDeleteCancelEvents } = window.MaintainOpsWorkspaceScheduleDeleteCancelEvents;

const cancelButton = createButton();
let pendingDeleteScheduleId = "schedule-1";
let renderCount = 0;

bindWorkspaceScheduleDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: {
    setPendingDeleteScheduleId: (value) => {
      pendingDeleteScheduleId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

cancelButton.dispatch("click");
assert.equal(pendingDeleteScheduleId, null);
assert.equal(renderCount, 1);

bindWorkspaceScheduleDeleteCancelEvents({
  documentRef: createDocument([cancelButton]),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace schedule delete cancel events smoke passed");
