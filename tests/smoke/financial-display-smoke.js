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
  getAssetFinancialsByAssetId: () => ({
    "asset-1": {
      asset_tag: "FA-100",
      acquisition_date: "2024-01-15",
      acquisition_cost: "25000.00",
      depreciation_method: "Straight-line",
      useful_life_years: "10",
      current_book_value: "21000.00",
      tax_jurisdiction: "Marion County",
      ownership_status: "owned",
      in_service_date: "2024-02-01",
      gl_account_code: "1600",
      cost_center: "Salem Production",
      needs_review: false,
      last_reviewed_at: "2026-07-01T12:00:00Z",
      reviewed_by: "user-1",
    },
  }),
  getAssetFinancialsReady: () => true,
  getProfilesByUserId: () => ({ "user-1": { full_name: "Finance Lead" } }),
  getLocations: () => [{ id: "loc-1", name: "Salem, OR" }, { id: "loc-2", name: "Z Auburn, WA" }],
  matchesActiveLocation: (asset) => asset.location_id === "loc-1",
  getFinancialPage: () => 1,
  getFinancialMissingFilter: () => "all",
  getFinancialLocationFilter: () => "all",
  getFinancialTypeFilter: () => "all",
  getFinancialAreaFilter: () => "all",
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
assert.equal(rows.length, 3);
assert.equal(rows[0].id, "asset-1");
assert.equal(rows.some((row) => row.id === "asset-2"), true);

const html = helpers.renderFinancialPanel();
assert.match(html, /Equipment Financial Register/);
assert.match(html, /10\u2019 Press Brake/);
assert.match(html, /PB-10/);
assert.match(html, /Cincinnati/);
assert.match(html, /90CB/);
assert.match(html, /1 photo/);
assert.match(html, /FA-100/);
assert.match(html, /Salem Production/);
assert.match(html, /Finance Lead/);
assert.match(html, /data-financial-filter="missing"/);
assert.match(html, /data-financial-filter="location"/);
assert.match(html, /data-financial-filter="type"/);
assert.match(html, /data-financial-filter="area"/);
assert.match(html, /data-open-financial-asset="asset-1"/);
assert.match(html, /data-financial-page="next"/);
assert.match(html, /Showing 1-1 of 3 - Page 1 of 3/);
assert.doesNotMatch(html, /Part of 10\u2019 Press Brake/);
assert.doesNotMatch(html, /Other Location/);
assert.doesNotMatch(html, /<form/);
assert.doesNotMatch(html, /data-financial-asset="asset-1"/);
assert.doesNotMatch(html, /Straight-line/);
assert.doesNotMatch(html, /Marion County/);

const detailHtml = helpers.renderFinancialDetail("asset-1");
assert.match(detailHtml, /Financial Details/);
assert.match(detailHtml, /data-back-financial-list/);
assert.match(detailHtml, /data-financial-asset="asset-1"/);
assert.match(detailHtml, /Asset tag \/ fixed asset number/);
assert.match(detailHtml, /Straight-line/);
assert.match(detailHtml, /Marion County/);
assert.match(detailHtml, /Salem Production/);
assert.match(detailHtml, /Accounting changes on this screen save only financial fields/);
assert.doesNotMatch(detailHtml, /data-asset-id="asset-1"/);

console.log("financial display smoke passed");
