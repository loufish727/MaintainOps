const assert = require("node:assert/strict");

global.window = {};

const { bindWorkspacePlanningDueDateEvents } = require("../../src/utils/workspacePlanningDueDateEvents.js");

const listeners = {};
const submitButton = { disabled: false, isConnected: true };
const dateInput = { value: "2026-07-31" };
const form = {
  dataset: { planningDueForm: "work-1" },
  addEventListener(type, handler) {
    listeners[type] = handler;
  },
  querySelector(selector) {
    if (selector === "button[type='submit']") return submitButton;
    if (selector === "[name='planning_due_at']") return dateInput;
    return null;
  },
};

const calls = [];
bindWorkspacePlanningDueDateEvents({
  documentRef: {
    querySelectorAll(selector) {
      return selector === "[data-planning-due-form]" ? [form] : [];
    },
  },
  async savePlanningDueDate(id, value) {
    calls.push([id, value, submitButton.disabled]);
  },
});

(async () => {
  let prevented = false;
  let stopped = false;
  await listeners.submit({
    preventDefault() { prevented = true; },
    stopPropagation() { stopped = true; },
  });
  assert.equal(prevented, true);
  assert.equal(stopped, true);
  assert.deepEqual(calls, [["work-1", "2026-07-31", true]]);
  assert.equal(submitButton.disabled, false);
  console.log("workspace planning due date events smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
