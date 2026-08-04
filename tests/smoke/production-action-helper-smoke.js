const assert = require("node:assert/strict");

global.window = {};

const {
  hasProductionAction,
  hasOpenProductionAction,
  isWorkOrderAssignedToUser,
  productionActionCompletionMessage,
} = require("../../src/utils/productionAction.js");

const base = { assigned_to: "tech-1" };
const open = {
  ...base,
  production_action: "Clear the line",
  production_action_assigned_to: "production-1",
  production_action_status: "open",
};
const completed = { ...open, production_action_status: "completed" };

assert.equal(hasProductionAction(base), false);
assert.equal(hasProductionAction(open), true);
assert.equal(hasOpenProductionAction(open), true);
assert.equal(hasOpenProductionAction(completed), false);
assert.equal(isWorkOrderAssignedToUser(open, "tech-1"), true);
assert.equal(isWorkOrderAssignedToUser(open, "production-1"), true);
assert.equal(isWorkOrderAssignedToUser(completed, "production-1"), false);
assert.equal(productionActionCompletionMessage(completed), "");
assert.match(productionActionCompletionMessage(open), /Complete or remove/);

console.log("production action helper smoke passed");
