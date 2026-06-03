const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/assetHierarchyDisplay.js");

const { createAssetHierarchyDisplayHelpers } = window.MaintainOpsAssetHierarchyDisplay;

let statusFilter = "all";
let typeFilter = "all";
let areaFilter = "all";

const assets = [
  { id: "machine-1", name: "MS200", asset_type: "machine", status: "running", location: "Salem" },
  { id: "sub-1", name: "Shear", asset_type: "secondary_machine", status: "running", parent_asset_id: "machine-1", location: "Salem" },
  { id: "tool-1", name: "Roll setup", asset_type: "tooling", status: "watch", parent_asset_id: "machine-1", location: "Salem" },
  { id: "component-1", name: "Photoeye", asset_type: "component", status: "offline", parent_asset_id: "sub-1", location: "Salem" },
  { id: "component-2", name: "Servo drive", asset_type: "component", status: "degraded", parent_asset_id: "sub-1", location: "Albany" },
];

const { filteredAssets } = createAssetHierarchyDisplayHelpers({
  getAssets: () => assets,
  getAssetStatusFilter: () => statusFilter,
  getAssetTypeFilter: () => typeFilter,
  getAssetAreaFilter: () => areaFilter,
  matchesActiveLocation: () => true,
  matchesSearch: () => true,
});

assert.equal(filteredAssets().length, 5);

typeFilter = "tooling";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["tool-1"]);

typeFilter = "all";
statusFilter = "offline";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["component-1"]);

statusFilter = "degraded";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["component-2"]);

statusFilter = "all";
areaFilter = "Albany";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["component-2"]);

areaFilter = "Salem";
typeFilter = "component";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["component-1"]);

statusFilter = "running";
typeFilter = "secondary_machine";
areaFilter = "all";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["sub-1"]);

console.log("asset hierarchy filter smoke passed");
