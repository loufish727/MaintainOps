const assert = require("node:assert/strict");

global.window = {};
require("../../src/render/assetHierarchyDisplay.js");
require("../../src/render/optionDisplay.js");

const assets = [
  { id: "primary", name: "Roll Former", asset_type: "machine", location_id: "salem" },
  { id: "decoiler", name: "Decoiler", asset_type: "secondary_machine", parent_asset_id: "primary", location_id: "salem" },
  { id: "hydraulics", name: "Hydraulic System", asset_type: "secondary_machine", parent_asset_id: "decoiler", location_id: "salem" },
  { id: "pump", name: "Hydraulic Pump", asset_type: "component", parent_asset_id: "hydraulics", location_id: "salem" },
  { id: "other", name: "Other Location", asset_type: "secondary_machine", location_id: "auburn" },
];
const original = JSON.stringify(assets);
const getAssets = () => assets;
const hierarchy = window.MaintainOpsAssetHierarchyDisplay.createAssetHierarchyDisplayHelpers({ getAssets });
const options = window.MaintainOpsOptionDisplay.createOptionDisplayHelpers({
  getAssets,
  escapeHtml: (value) => String(value),
  matchesActiveLocation: (asset) => asset.location_id === "salem",
  parentAssetFor: hierarchy.parentAssetFor,
  isAssetDescendantOf: hierarchy.isAssetDescendantOf,
});

assert.equal(hierarchy.parentAssetFor(assets[2]).id, "decoiler");
assert.deepEqual(hierarchy.childAssetsFor("decoiler").map((asset) => asset.id), ["hydraulics"]);
assert.equal(hierarchy.isAssetDescendantOf("pump", "primary"), true);
assert.equal(hierarchy.isAssetDescendantOf("primary", "pump"), false);

const nestedOptions = options.renderParentAssetOptions("decoiler", "hydraulics");
assert.match(nestedOptions, /value="decoiler" selected/);
assert.match(nestedOptions, /value="primary"/);
assert.doesNotMatch(nestedOptions, /value="(?:hydraulics|pump|other)"/);

const ancestorOptions = options.renderParentAssetOptions("primary", "decoiler");
assert.match(ancestorOptions, /value="primary" selected/);
assert.doesNotMatch(ancestorOptions, /value="(?:decoiler|hydraulics|pump|other)"/);
assert.equal(options.renderParentAssetOptions("", "primary"), "");
assert.equal(JSON.stringify(assets), original, "Reading the hierarchy must not alter equipment records");

console.log("equipment nested parent smoke passed");
