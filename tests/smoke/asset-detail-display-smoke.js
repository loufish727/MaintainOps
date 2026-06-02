const assert = require("node:assert/strict");

global.window = {};

const { createAssetDetailDisplayHelpers } = require("../../src/render/assetDetailDisplay.js");

const asset = {
  id: "asset-1",
  name: "Press 1",
  asset_code: "P-100",
  asset_type: "machine",
  status: "running",
  location: "Bay 1",
  location_id: "loc-1",
  safety_devices_required: true,
};

const workOrder = {
  id: "wo-1",
  title: "Inspect Guard",
  status: "open",
  asset_id: "asset-1",
};

const { renderAssetDetail } = createAssetDetailDisplayHelpers({
  ASSET_TYPE_OPTIONS: ["machine", "tool"],
  getAssets: () => [
    asset,
    { id: "parent-1", name: "Line 1", asset_type: "line", status: "running" },
    { id: "child-1", name: "Feeder", asset_type: "machine", status: "watch", parent_asset_id: "asset-1" },
  ],
  getActiveAssetId: () => "asset-1",
  getWorkOrders: () => [workOrder, { id: "wo-2", title: "Done", status: "completed", asset_id: "asset-1" }],
  getPreventiveSchedules: () => [{ id: "pm-1", asset_id: "asset-1", title: "Monthly PM", frequency: "monthly", next_due_at: "2026-06-01" }],
  getParts: () => [
    { id: "part-1", name: "Guard Bolt", sku: "GB-1" },
    { id: "part-2", name: "Drive Belt", sku: "B-42" },
  ],
  getAssetParts: () => [{ id: "asset-part-1", asset_id: "asset-1", part_id: "part-1", quantity_recommended: 4, note: "guard hardware", parts: { name: "Guard Bolt", sku: "GB-1" } }],
  getAssetPartsReady: () => true,
  getPartsUsedByWorkOrder: () => ({ "wo-1": [{ work_order_id: "wo-1", quantity_used: 2, parts: { name: "Guard Bolt" } }] }),
  getMaintenanceRequests: () => [],
  getPendingDeleteAssetId: () => "asset-1",
  getLocations: () => [{ id: "loc-1", name: "Plant 1" }],
  getActiveLocationId: () => "loc-1",
  renderCreateWorkOrder: () => "<section>Create work order</section>",
  parentAssetFor: () => ({ id: "parent-1", name: "Line 1" }),
  childAssetsFor: () => [{ id: "child-1", name: "Feeder", asset_type: "machine", status: "watch" }],
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  assetTypeLabel: (type) => type,
  renderParentAssetOptions: () => '<option value="parent-1">Line 1</option>',
  renderLocationOptions: () => '<option value="loc-1">Plant 1</option>',
  assetStatusLabel: (status) => status,
  renderAssetMiniWorkOrder: (row) => `<article data-open-work-order="${row.id}">${row.title}</article>`,
  assetDeleteBlockerMessage: () => "",
  canDeleteEquipment: () => true,
});

const html = renderAssetDetail();

assert.match(html, /Press 1/);
assert.match(html, /id="edit-asset-form"/);
assert.match(html, /data-quick-fix-asset="asset-1"/);
assert.match(html, /data-open-asset="parent-1"/);
assert.match(html, /data-open-asset="child-1"/);
assert.match(html, /Open Work/);
assert.match(html, /Completed History/);
assert.match(html, /PM Schedules/);
assert.match(html, /Linked Parts/);
assert.match(html, /data-attach-asset-part="asset-1"/);
assert.match(html, /data-remove-asset-part="asset-part-1"/);
assert.match(html, /Drive Belt - B-42/);
assert.match(html, /recommended qty 4/);
assert.match(html, /Parts Used History/);
assert.match(html, /data-cancel-delete-asset/);
assert.match(html, /data-confirm-delete-asset="asset-1"/);

const missingRenderer = createAssetDetailDisplayHelpers({
  getAssets: () => [],
  getActiveAssetId: () => "missing",
  renderCreateWorkOrder: () => "<section>Create fallback</section>",
}).renderAssetDetail;
assert.equal(missingRenderer(), "<section>Create fallback</section>");

console.log("asset detail display smoke passed");
