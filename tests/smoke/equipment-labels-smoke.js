const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/equipmentLabels.js");
require("../../src/utils/constants.js");

const { assetStatusLabel, assetTypeLabel } = global.window.MaintainOpsEquipmentLabels;

assert.equal(assetStatusLabel("offline"), "Offline / Down");
assert.equal(assetStatusLabel("running"), "Running");
assert.equal(assetTypeLabel("machine"), "Primary");
assert.equal(assetTypeLabel("forklift"), "Forklift / Mobile Lift");
assert.equal(assetTypeLabel("secondary_machine"), "Sub Equipment");
assert.deepEqual(window.MaintainOpsConstants.ASSET_TYPE_OPTIONS, [
  "machine", "forklift", "secondary_machine", "tooling", "component", "shop_item",
]);

console.log("equipment labels smoke passed");
