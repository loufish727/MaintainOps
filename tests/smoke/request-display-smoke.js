const assert = require("node:assert/strict");

global.window = {};

const { createRequestDisplayHelpers } = require("../../src/render/requestDisplay.js");

const state = {
  pendingDeleteRequestId: "",
  canDelete: true,
};

const helpers = createRequestDisplayHelpers({
  segmentIcon: (id) => `<i>${id}</i>`,
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  renderAssetOptions: () => '<option value="asset-1">Mixer</option>',
  renderMaintenanceRequestPhoto: () => '<figure class="request-photo"></figure>',
  isConvertedRequest: (request) => request.status === "converted" || Boolean(request.converted_work_order_id),
  canDeleteOperationalRecords: () => state.canDelete,
  getPendingDeleteRequestId: () => state.pendingDeleteRequestId,
  getProfilesByUserId: () => ({
    "user-1": { full_name: "QA Requester" },
    "user-2": { full_name: "QA Converter" },
  }),
});

const readOnlyHelpers = createRequestDisplayHelpers({
  segmentIcon: (id) => `<i>${id}</i>`,
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  renderAssetOptions: () => '<option value="asset-1">Mixer</option>',
  renderMaintenanceRequestPhoto: () => '<figure class="request-photo"></figure>',
  isConvertedRequest: (request) => request.status === "converted" || Boolean(request.converted_work_order_id),
  canDeleteOperationalRecords: () => true,
  canEditOperationalRecords: () => false,
  getPendingDeleteRequestId: () => "req-1",
  getProfilesByUserId: () => ({
    "user-1": { full_name: "QA Requester" },
    "user-2": { full_name: "QA Converter" },
  }),
});

assert.equal(helpers.requestPanelSubtitle("converted", 3), "3 converted");
assert.equal(helpers.requestPanelSubtitle("all", 5), "5 total");
assert.equal(helpers.requestPanelSubtitle("active", 2), "2 active");

const filterBar = helpers.renderRequestFilterBar({ active: 1, converted: 2, all: 3 }, "active", { locked: true });
assert.match(filterBar, /data-request-filter="active"/);
assert.match(filterBar, /data-request-filter="converted" type="button" disabled/);

const request = {
  id: "req-1",
  priority: "high",
  status: "submitted",
  title: "Door <jam>",
  description: "Latch & handle",
  requested_by: "user-1",
  created_at: "2026-05-27T12:00:00Z",
  assets: { name: "Mixer <A>" },
};

const card = helpers.renderMaintenanceRequest(request);
assert.match(card, /request-card active-request/);
assert.match(card, /Door &lt;jam&gt;/);
assert.match(card, /Latch &amp; handle/);
assert.match(card, /Public intake/);
assert.match(card, /Machine \/ area/);
assert.match(card, /Requester/);
assert.match(card, /Received/);
assert.match(card, /QA Requester/);
assert.match(card, /data-quick-fix-request="req-1"/);
assert.match(card, /data-convert-request="req-1"/);
assert.match(card, /data-delete-request="req-1"/);
assert.match(card, /request-photo/);

state.pendingDeleteRequestId = "req-1";
const confirmingCard = helpers.renderMaintenanceRequest(request);
assert.match(confirmingCard, /data-cancel-delete-request/);
assert.match(confirmingCard, /data-confirm-delete-request="req-1"/);

const converted = helpers.renderMaintenanceRequest({ ...request, status: "converted", converted_work_order_id: "wo-1", reviewed_by: "user-2" });
assert.match(converted, /request-card converted-request/);
assert.match(converted, /Converted to work order by QA Converter/);

const legacyConverted = helpers.renderMaintenanceRequest({ ...request, status: "converted", converted_work_order_id: "wo-1" });
assert.match(legacyConverted, /Converted to work order; converter not recorded/);

const missingProfileConverted = helpers.renderMaintenanceRequest({ ...request, status: "converted", converted_work_order_id: "wo-1", reviewed_by: "missing-user" });
assert.match(missingProfileConverted, /Converted to work order; converter name unavailable/);

const readOnlyCard = readOnlyHelpers.renderMaintenanceRequest(request);
assert.match(readOnlyCard, /Door &lt;jam&gt;/);
assert.doesNotMatch(readOnlyCard, /data-quick-fix-request="req-1"/);
assert.doesNotMatch(readOnlyCard, /data-convert-request="req-1"/);
assert.doesNotMatch(readOnlyCard, /data-delete-request="req-1"/);
assert.doesNotMatch(readOnlyCard, /Converted to work order/);

const readOnlyConverted = readOnlyHelpers.renderMaintenanceRequest({ ...request, status: "converted", converted_work_order_id: "wo-1", reviewed_by: "user-2" });
assert.match(readOnlyConverted, /Converted to work order by QA Converter/);

const form = helpers.renderRequestFormContent();
assert.match(form, /id="request-form"/);
assert.match(form, /name="title"/);
assert.match(form, /name="requester_name" required/);
assert.match(form, /name="equipment_note"[^>]*required/);
assert.match(form, /data-equipment-choice/);
assert.match(form, /Saved equipment/);
assert.match(form, /Equipment not listed \/ general area/);
assert.match(form, /name="description" rows="4" required/);
assert.match(form, /name="photo"/);
assert.match(form, /name="photo"[^>]*accept="image\/\*"/);
assert.doesNotMatch(form, /capture=/);
assert.match(form, /data-location-sensitive-asset/);
assert.match(form, /name="asset_id"[^>]*disabled/);
assert.match(form, /id="request-error"/);
assert.match(form, /Submit Request/);

console.log("request display smoke passed");
