const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/equipmentLabels.js");

const { assetStatusLabel, assetTypeLabel } = global.window.MaintainOpsEquipmentLabels;

assert.equal(assetStatusLabel("offline"), "Offline / Down");
assert.equal(assetStatusLabel("running"), "Running");
assert.equal(assetTypeLabel("machine"), "Machine / Line");
assert.equal(assetTypeLabel("secondary_machine"), "Sub-assembly");

console.log("equipment labels smoke passed");
