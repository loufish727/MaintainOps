const assert = require("node:assert/strict");

global.window = {};

require("../../src/render/assetCardDisplay.js");

const { renderAssetCard } = global.window.MaintainOpsAssetCardDisplay.createAssetCardDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  assetTypeLabel: (type) => type,
  getWorkOrders: () => [{ id: "wo-1", asset_id: "asset-1", status: "open" }],
  getActiveAssetId: () => "asset-1",
  parentAssetFor: () => ({ id: "parent-1", name: "MS200" }),
  childAssetsFor: () => [],
});

const enabledHtml = renderAssetCard({
  id: "asset-1",
  name: "Roll former",
  asset_type: "machine",
  status: "running",
  location: "Bay 1",
  safety_devices_required: true,
});

assert.match(enabledHtml, /class="chip asset-running">running<\/span>/);
assert.match(enabledHtml, /class="safety-check-note">safety check enabled<\/span>/);
assert.doesNotMatch(enabledHtml, /chip overdue">safety check/);

const disabledHtml = renderAssetCard({
  id: "asset-2",
  name: "Bench",
  asset_type: "shop_item",
  status: "running",
  location: "Shop",
  safety_devices_required: false,
});

assert.match(disabledHtml, /class="safety-check-note disabled">safety check off<\/span>/);

console.log("asset card display smoke passed");
