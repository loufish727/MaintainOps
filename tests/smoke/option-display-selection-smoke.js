const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/optionDisplay.js");

const { createOptionDisplayHelpers } = window.MaintainOpsOptionDisplay;

const assets = [
  { id: "asset-1", name: "Visible Filtered Machine", location_id: "loc-1" },
  { id: "asset-2", name: "Hidden By Equipment Filter Machine", location_id: "loc-1" },
  { id: "asset-3", name: "Other Location Machine", location_id: "loc-2" },
];

const helpers = createOptionDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  getLocations: () => [],
  getActiveLocationId: () => "loc-1",
  getAssets: () => assets,
  matchesActiveLocation: (asset) => asset.location_id === "loc-1",
  isAssetDescendantOf: () => false,
  parentAssetFor: () => null,
});

const html = helpers.renderAssetOptions();

assert.match(html, /Visible Filtered Machine/);
assert.match(html, /Hidden By Equipment Filter Machine/);
assert.doesNotMatch(html, /Other Location Machine/);

const selectedHtml = helpers.renderAssetOptions("asset-3");
assert.match(selectedHtml, /Other Location Machine/);
assert.match(selectedHtml, /value="asset-3" selected/);

console.log("option display selection smoke passed");
