const assert = require("node:assert/strict");

global.window = {};

const { createFinancialDisplayHelpers } = require("../../src/render/financialDisplay.js");

const helpers = createFinancialDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  assetTypeLabel: (type) => ({
    machine: "Primary",
    secondary_machine: "Sub Equipment",
    component: "Component",
  }[type] || type),
  parentAssetFor: (asset) => assets.find((row) => row.id === asset.parent_asset_id) || null,
  getAssets: () => assets,
  getAssetDocumentsByAssetId: () => ({
    "asset-1": [{ document_type: "machine_photo", content_type: "image/jpeg", original_file_name: "press.jpg" }],
  }),
  matchesActiveLocation: (asset) => asset.location_id === "loc-1",
  getAssetsPage: () => 1,
  renderAssetsPagination: (count, pages) => `<nav data-pages="${pages}">${count}</nav>`,
  ASSETS_PER_PAGE: 1,
});

const assets = [{
  id: "asset-2",
  name: "Controls",
  asset_type: "secondary_machine",
  parent_asset_id: "asset-1",
  asset_code: "CTRL-1",
  manufacturer: "Delta",
  model: "D1",
  location: "Bay 1",
  location_id: "loc-1",
  status: "running",
}, {
  id: "asset-1",
  name: "10\u2019 Press Brake",
  asset_type: "machine",
  asset_code: "PB-10",
  manufacturer: "Cincinnati",
  model: "90CB",
  location: "Bay 1",
  location_id: "loc-1",
  status: "running",
}, {
  id: "asset-3",
  name: "Other Location",
  asset_type: "machine",
  location_id: "loc-2",
  status: "running",
}];

const rows = helpers.financialAssets();
assert.equal(rows.length, 2);
assert.equal(rows[0].id, "asset-1");
assert.equal(rows[1].id, "asset-2");

const html = helpers.renderFinancialPanel();
assert.match(html, /Equipment Financial Register/);
assert.match(html, /10\u2019 Press Brake/);
assert.match(html, /PB-10/);
assert.match(html, /Cincinnati/);
assert.match(html, /90CB/);
assert.match(html, /1 photo/);
assert.match(html, /data-pages="2"/);
assert.doesNotMatch(html, /Part of 10\u2019 Press Brake/);
assert.doesNotMatch(html, /Other Location/);
assert.doesNotMatch(html, /<form/);

console.log("financial display smoke passed");
