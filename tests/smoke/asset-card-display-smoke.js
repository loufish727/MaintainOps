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
  asset_code: "SN-100",
  asset_tag: '0007-<tag>"',
  manufacturer: "Engel",
  model: "RF-42",
  asset_type: "machine",
  status: "running",
  location: "Bay 1",
  safety_devices_required: true,
});

assert.match(enabledHtml, /class="chip asset-running">running<\/span>/);
assert.match(enabledHtml, /SN-100/);
assert.match(enabledHtml, /Asset tag: 0007-&lt;tag&gt;&quot;/);
assert.match(enabledHtml, /Engel/);
assert.match(enabledHtml, /RF-42/);
assert.match(enabledHtml, /class="safety-check-note">safety devices identified<\/span>/);
assert.doesNotMatch(enabledHtml, /chip overdue">safety check/);
assert.doesNotMatch(enabledHtml, /asset-facility/);

const disabledHtml = renderAssetCard({
  id: "asset-2",
  name: "Bench",
  asset_type: "shop_item",
  status: "running",
  location: "Shop",
  safety_devices_required: false,
});

assert.match(disabledHtml, /class="safety-check-note disabled">no safety devices identified<\/span>/);
assert.doesNotMatch(disabledHtml, /Asset tag:/);

for (const location of [null, ""]) {
  const withoutArea = renderAssetCard({ id: "riverside-equipment", name: "Roll former", status: "running", asset_type: "machine", location_id: "riverside", location });
  assert.match(withoutArea, /<p>No area \/ spot set<\/p>/);
  assert.doesNotMatch(withoutArea, /No location set/);
}
assert.match(enabledHtml, /<p>Bay 1<\/p>/);

console.log("asset card display smoke passed");
