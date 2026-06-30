const assert = require("node:assert/strict");

global.window = {};

const { createAssetDetailDisplayHelpers } = require("../../src/render/assetDetailDisplay.js");
const { createEquipmentStructureGuideDisplayHelpers } = require("../../src/render/equipmentStructureGuideDisplay.js");
const { createMiniWorkOrderDisplayHelpers } = require("../../src/render/miniWorkOrderDisplay.js");

const { renderEquipmentStructureGuide } = createEquipmentStructureGuideDisplayHelpers();

const asset = {
  id: "asset-1",
  name: "Press 1",
  asset_code: "P-100",
  asset_type: "machine",
  status: "running",
  location: "Bay 1",
  location_id: "loc-1",
  safety_devices_required: true,
  created_by: "user-1",
  created_at: "2026-06-01T12:00:00Z",
};

const workOrder = {
  id: "wo-1",
  title: "Inspect Guard",
  status: "open",
  asset_id: "asset-1",
};
const miniHelpers = createMiniWorkOrderDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  statusLabel: (status) => status,
  relationshipIcon: (type) => `<i>${type}</i>`,
  getPartsUsedByWorkOrder: () => ({}),
  getPhotosByWorkOrder: () => ({}),
  teamMemberName: (userId) => userId === "user-1" ? "QA Completer" : userId,
});

const signedAssetDocumentRequests = [];
const { renderAssetDetail } = createAssetDetailDisplayHelpers({
  ASSET_TYPE_OPTIONS: ["machine", "forklift", "secondary_machine", "tooling", "component"],
  getAssets: () => [
    asset,
    { id: "parent-1", name: "Line 1", asset_type: "line", status: "running" },
    { id: "child-1", name: "Feeder", asset_type: "machine", status: "watch", parent_asset_id: "asset-1" },
  ],
  getActiveAssetId: () => "asset-1",
  getWorkOrders: () => [
    workOrder,
    { id: "wo-2", title: "Done", status: "completed", asset_id: "asset-1", completed_at: "2026-06-04T16:00:00Z", completed_by: "user-1" },
    { id: "wo-3", title: "Older Done", status: "completed", asset_id: "asset-1", completed_at: "2026-06-03T16:00:00Z", assigned_to: "user-1" },
  ],
  getPreventiveSchedules: () => [{ id: "pm-1", asset_id: "asset-1", title: "Monthly PM", frequency: "monthly", next_due_at: "2026-06-01" }],
  getParts: () => [
    { id: "part-1", name: "Guard Bolt", sku: "GB-1" },
    { id: "part-2", name: "Drive Belt", sku: "B-42" },
  ],
  getAssetParts: () => [{ id: "asset-part-1", asset_id: "asset-1", part_id: "part-1", quantity_recommended: 4, note: "guard hardware", parts: { name: "Guard Bolt", sku: "GB-1" } }],
  getAssetPartsReady: () => true,
  getAssetDocumentsByAssetId: () => ({
    "asset-1": [
      { file_name: "press.jpg", document_type: "machine_photo", content_type: "image/jpeg", original_file_name: "raw press.png", signedUrl: "https://example.test/press.jpg" },
      { file_name: "settings.pdf", document_type: "settings", content_type: "application/pdf", original_file_name: "controller settings.pdf", signedUrl: "https://example.test/settings.pdf" },
    ],
  }),
  getAssetDocumentsReady: () => true,
  getAssetEventsByAssetId: () => ({
    "asset-1": [
      { id: "event-1", asset_id: "asset-1", event_type: "updated", summary: "Updated status.", actor_id: "user-1", created_at: "2026-06-05T15:00:00Z" },
    ],
  }),
  getAssetEventsReady: () => true,
  getProfilesByUserId: () => ({ "user-1": { full_name: "QA Completer" } }),
  ensureAssetDocumentSignedUrls: (assetId) => signedAssetDocumentRequests.push(assetId),
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
  renderAssetAreaOptions: (selected) => `<option value="Bay 1" ${selected === "Bay 1" ? "selected" : ""}>Bay 1</option>`,
  assetStatusLabel: (status) => status,
  renderAssetMiniWorkOrder: miniHelpers.renderAssetMiniWorkOrder,
  assetDeleteBlockerMessage: () => "",
  canDeleteEquipment: () => true,
  renderEquipmentStructureGuide,
  renderProcedureOptions: () => '<option value="">No procedure checklist</option><option value="procedure-1">Press checklist</option>',
  getAssetRelationshipOpen: () => true,
  getAssetRelationshipPage: () => 1,
  LIST_ITEMS_PER_PAGE: 12,
});

const html = renderAssetDetail();
assert.deepEqual(signedAssetDocumentRequests, ["asset-1"]);

assert.match(html, /Press 1/);
assert.match(html, /id="edit-asset-form"/);
assert.match(html, /name="location_existing"/);
assert.match(html, /<option value="Bay 1" selected>Bay 1<\/option>/);
assert.match(html, /name="location_new"/);
assert.match(html, /aria-label="Equipment summary"/);
assert.match(html, /id="equipment-action-cards"/);
assert.match(html, /<span>Status<\/span>/);
assert.match(html, /<span>Location<\/span>/);
assert.match(html, /<span>Primary<\/span>/);
assert.match(html, /<span>Sub Equipment<\/span>/);
assert.match(html, /<span>Parts<\/span>/);
assert.match(html, /<span>Open Work<\/span>/);
assert.match(html, /<span>Files<\/span>/);
assert.match(html, /class="safety-check-note">safety devices identified<\/span>/);
assert.doesNotMatch(html, /chip overdue">safety check required/);
assert.match(html, /Equipment status guide/);
assert.match(html, /Watch/);
assert.match(html, /Monitor for a possible issue/);
assert.match(html, /Degraded/);
assert.match(html, /Known issue, still usable/);
assert.match(html, /Offline \/ Down/);
assert.match(html, /Do not count on this equipment/);
assert.match(html, /Structure Guide/);
assert.match(html, /Primary/);
assert.match(html, /Sub Equipment/);
assert.match(html, /Tooling \/ Setup/);
assert.match(html, /Roll former rule/);
assert.match(html, /<option value="tooling"\s*>tooling<\/option>/);
assert.match(html, /<option value="forklift"\s*>forklift<\/option>/);
assert.match(html, /data-jump-work-section="edit-asset-status-field"/);
assert.match(html, /data-jump-work-section="asset-linked-parts-target"/);
assert.match(html, /data-jump-work-section="asset-documents-target"/);
assert.doesNotMatch(html, /Email Helper/);
assert.match(html, /data-quick-fix-asset="asset-1"/);
assert.match(html, /Machine Files/);
assert.match(html, /data-asset-document="asset-1"/);
assert.match(html, /Attach Machine File/);
assert.match(html, /class="asset-file-list"/);
assert.match(html, /class="asset-file-item"/);
assert.match(html, /class="asset-file-title"/);
assert.match(html, /class="asset-file-preview"/);
assert.match(html, /raw press\.png/);
assert.match(html, /controller settings\.pdf/);
assert.match(html, /Settings/);
assert.match(html, /data-delete-asset-document/);
assert.match(html, /Delete File/);
assert.doesNotMatch(html, /asset-photo-card/);
assert.match(html, /data-open-asset="parent-1"/);
assert.match(html, /data-open-asset="child-1"/);
assert.match(html, /Open Work/);
assert.match(html, /data-asset-relationship-section="open-work"/);
assert.match(html, /Completed History/);
assert.match(html, /data-asset-relationship-section="completed-history"/);
assert.match(html, /Done/);
assert.match(html, /by QA Completer/);
assert.match(html, /Older Done/);
assert.match(html, /owner QA Completer/);
assert.match(html, /data-mini-work-order="wo-2"/);
assert.match(html, /Equipment History/);
assert.match(html, /data-asset-relationship-section="asset-history"/);
assert.match(html, /Updated status\./);
assert.match(html, /machine created\./i);
assert.match(html, /QA Completer/);
assert.doesNotMatch(html, /Team member<\/span>/);
assert.match(html, /PM Schedules/);
assert.match(html, /class="asset-relationship-panel relationship-detail procedure"/);
assert.match(html, /data-create-pm-form/);
assert.match(html, /data-equipment-pm-form="asset-1"/);
assert.match(html, /name="asset_id" type="hidden" value="asset-1"/);
assert.match(html, /name="next_due_at" type="date" value="\d{4}-\d{2}-\d{2}" required/);
assert.match(html, /data-open-date-picker/);
assert.match(html, /PM for Press 1/);
assert.match(html, /Press checklist/);
assert.match(html, /data-section="pm"/);
assert.match(html, /Go to PM/);
assert.match(html, /Linked Parts/);
assert.match(html, /class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target"/);
assert.match(html, /data-asset-relationship-section="linked-parts"/);
assert.match(html, /data-section="parts"/);
assert.match(html, /Go to Parts/);
assert.match(html, /data-attach-asset-part="asset-1"/);
assert.match(html, /data-remove-asset-part="asset-part-1"/);
assert.match(html, /Drive Belt - B-42/);
assert.match(html, /recommended qty 4/);
assert.match(html, /Parts Used History/);
assert.match(html, /data-asset-relationship-section="parts-used"/);
assert.match(html, /data-cancel-delete-asset/);
assert.match(html, /data-confirm-delete-asset="asset-1"/);
assert.doesNotMatch(html, /Degraded needs a reason/);

const degradedRenderer = createAssetDetailDisplayHelpers({
  ASSET_TYPE_OPTIONS: ["machine"],
  getAssets: () => [{ ...asset, status: "degraded" }],
  getActiveAssetId: () => "asset-1",
  getWorkOrders: () => [],
  getPreventiveSchedules: () => [],
  getParts: () => [],
  getAssetParts: () => [],
  getAssetPartsReady: () => true,
  getAssetDocumentsByAssetId: () => ({}),
  getAssetDocumentsReady: () => true,
  getPartsUsedByWorkOrder: () => ({}),
  getMaintenanceRequests: () => [],
  getPendingDeleteAssetId: () => "",
  getLocations: () => [{ id: "loc-1", name: "Plant 1" }],
  getActiveLocationId: () => "loc-1",
  renderCreateWorkOrder: () => "<section>Create work order</section>",
  parentAssetFor: () => null,
  childAssetsFor: () => [],
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  assetTypeLabel: (type) => type,
  renderParentAssetOptions: () => "",
  renderLocationOptions: () => '<option value="loc-1">Plant 1</option>',
  renderAssetAreaOptions: () => "",
  assetStatusLabel: (status) => status === "degraded" ? "Degraded" : status,
  renderAssetMiniWorkOrder: (row) => `<article>${row.title}</article>`,
  assetDeleteBlockerMessage: () => "",
  canDeleteEquipment: () => true,
  renderEquipmentStructureGuide,
}).renderAssetDetail;

const degradedHtml = degradedRenderer();
assert.match(degradedHtml, /Degraded needs a reason/);
assert.match(degradedHtml, /no open work tied to it/);
assert.match(degradedHtml, /Create Work for Degraded Condition/);
assert.match(degradedHtml, /data-quick-fix-asset="asset-1"/);

const missingRenderer = createAssetDetailDisplayHelpers({
  getAssets: () => [],
  getActiveAssetId: () => "missing",
  renderCreateWorkOrder: () => "<section>Create fallback</section>",
}).renderAssetDetail;
assert.equal(missingRenderer(), "<section>Create fallback</section>");

console.log("asset detail display smoke passed");
