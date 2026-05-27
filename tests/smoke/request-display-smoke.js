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
assert.match(card, /QA Requester/);
assert.match(card, /data-quick-fix-request="req-1"/);
assert.match(card, /data-convert-request="req-1"/);
assert.match(card, /data-delete-request="req-1"/);
assert.match(card, /request-photo/);

state.pendingDeleteRequestId = "req-1";
const confirmingCard = helpers.renderMaintenanceRequest(request);
assert.match(confirmingCard, /data-cancel-delete-request/);
assert.match(confirmingCard, /data-confirm-delete-request="req-1"/);

const converted = helpers.renderMaintenanceRequest({ ...request, status: "converted", converted_work_order_id: "wo-1" });
assert.match(converted, /request-card converted-request/);
assert.match(converted, /Converted to work order/);

const form = helpers.renderRequestFormContent();
assert.match(form, /id="request-form"/);
assert.match(form, /name="title"/);
assert.match(form, /name="photo"/);
assert.match(form, /data-location-sensitive-asset/);
assert.match(form, /id="request-error"/);
assert.match(form, /Submit Request/);

console.log("request display smoke passed");
