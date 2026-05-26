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

function createDocument({ deleteButtons = [], cancelButtons = [], confirmButtons = [] }) {
  return {
    querySelectorAll(selector) {
      if (selector === "[data-delete-schedule]") return deleteButtons;
      if (selector === "[data-cancel-delete-schedule]") return cancelButtons;
      if (selector === "[data-confirm-delete-schedule]") return confirmButtons;
      return [];
    },
  };
}

global.window = {};
global.document = createDocument({});

require("../../src/utils/workspaceScheduleDeleteCancelEvents.js");

const { bindWorkspaceScheduleDeleteCancelEvents } = window.MaintainOpsWorkspaceScheduleDeleteCancelEvents;

const deleteButton = createButton({ deleteSchedule: "schedule-2" });
const cancelButton = createButton();
const confirmButton = createButton({ confirmDeleteSchedule: "schedule-3" });
let pendingDeleteScheduleId = "schedule-1";
let renderCount = 0;
let requestedDeleteScheduleId = null;
let confirmedDeleteScheduleId = null;

bindWorkspaceScheduleDeleteCancelEvents({
  documentRef: createDocument({
    deleteButtons: [deleteButton],
    cancelButtons: [cancelButton],
    confirmButtons: [confirmButton],
  }),
  requestDeletePreventiveSchedule: (id) => {
    requestedDeleteScheduleId = id;
  },
  deletePreventiveSchedule: (id) => {
    confirmedDeleteScheduleId = id;
  },
  state: {
    setPendingDeleteScheduleId: (value) => {
      pendingDeleteScheduleId = value;
    },
  },
  renderWorkspace: () => {
    renderCount += 1;
  },
});

deleteButton.dispatch("click");
assert.equal(requestedDeleteScheduleId, "schedule-2");

cancelButton.dispatch("click");
assert.equal(pendingDeleteScheduleId, null);
assert.equal(renderCount, 1);

confirmButton.dispatch("click");
assert.equal(confirmedDeleteScheduleId, "schedule-3");

bindWorkspaceScheduleDeleteCancelEvents({
  documentRef: createDocument({ cancelButtons: [cancelButton] }),
  state: null,
  renderWorkspace: () => {
    throw new Error("missing state should not render");
  },
});

console.log("workspace schedule delete cancel events smoke passed");
