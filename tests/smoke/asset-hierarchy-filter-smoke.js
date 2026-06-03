const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/assetHierarchyDisplay.js");

const { createAssetHierarchyDisplayHelpers } = window.MaintainOpsAssetHierarchyDisplay;

let statusFilter = "all";
let typeFilter = "all";

const assets = [
  { id: "machine-1", name: "MS200", asset_type: "machine", status: "running", location: "Salem" },
  { id: "sub-1", name: "Shear", asset_type: "secondary_machine", status: "running", parent_asset_id: "machine-1", location: "Salem" },
  { id: "tool-1", name: "Roll setup", asset_type: "tooling", status: "watch", parent_asset_id: "machine-1", location: "Salem" },
  { id: "component-1", name: "Photoeye", asset_type: "component", status: "offline", parent_asset_id: "sub-1", location: "Salem" },
];

const { filteredAssets } = createAssetHierarchyDisplayHelpers({
  getAssets: () => assets,
  getAssetStatusFilter: () => statusFilter,
  getAssetTypeFilter: () => typeFilter,
  matchesActiveLocation: () => true,
  matchesSearch: () => true,
});

assert.equal(filteredAssets().length, 4);

typeFilter = "tooling";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["tool-1"]);

typeFilter = "all";
statusFilter = "offline";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["component-1"]);

statusFilter = "running";
typeFilter = "secondary_machine";
assert.deepEqual(filteredAssets().map((asset) => asset.id), ["sub-1"]);

console.log("asset hierarchy filter smoke passed");
