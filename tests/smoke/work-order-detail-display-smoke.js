const assert = require("node:assert/strict");

global.window = {};

const { createWorkOrderDetailDisplayHelpers } = require("../../src/render/workOrderDetailDisplay.js");

const workOrder = {
  id: "wo-1",
  title: "Hydraulic Leak",
  description: "Line 2 leak",
  priority: "high",
  type: "reactive",
  status: "in_progress",
  asset_id: "asset-1",
  assigned_to: "user-1",
  due_at: "2026-06-01",
  actual_minutes: 10,
  procedure_template_id: "proc-1",
  safety_devices_checked: true,
};

const { renderWorkOrderDetail } = createWorkOrderDetailDisplayHelpers({
  STATUS_OPTIONS: ["open", "in_progress", "blocked", "completed"],
  TYPE_OPTIONS: ["reactive", "preventive"],
  getActiveWorkOrderId: () => "wo-1",
  getWorkOrders: () => [workOrder],
  getCommentsByWorkOrder: () => ({ "wo-1": [{ author_id: "user-1", body: "Checked pump", created_at: "2026-05-27T00:00:00Z" }] }),
  getPhotosByWorkOrder: () => ({ "wo-1": [{ file_name: "before.jpg", signedUrl: "https://example.test/before.jpg", content_type: "image/jpeg" }] }),
  getEventsByWorkOrder: () => ({ "wo-1": [{ event_type: "updated", summary: "Status changed" }] }),
  getPartsUsedByWorkOrder: () => ({ "wo-1": [{ quantity_used: 2, unit_cost: 5, created_by: "user-1", created_at: "2026-05-27T00:00:00Z", parts: { name: "Hose" } }] }),
  getProcedureTemplates: () => [{ id: "proc-1", name: "Lockout", procedure_steps: [{ id: "step-1", title: "Check guard" }] }],
  getWorkOrderActionWarningId: () => "wo-1",
  getWorkOrderActionWarning: () => "Finish checklist first.",
  getParts: () => [{ id: "part-1", name: "Hose", quantity_on_hand: 3 }],
  getStepResultsByWorkOrder: () => ({ "wo-1": { "step-1": { value: "checked", completed_at: "2026-05-27T00:00:00Z" } } }),
  getPendingDeleteWorkOrderId: () => "wo-1",
  getProfilesByUserId: () => ({ "user-1": { full_name: "QA User" } }),
  getCommentsError: () => "",
  renderMissingWorkOrderDetail: () => "<p>Missing</p>",
  partUsageUnitCost: (row) => Number(row.unit_cost) || 0,
  buildActivityFeed: () => [{ kind: "event", summary: "Status changed" }],
  checklistProgress: () => ({ done: 1, total: 1 }),
  requiredChecklistProgress: () => ({ done: 1, total: 1 }),
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  cleanWorkOrderDescription: (value) => value,
  renderRelationshipChips: () => "<span data-test-relationship>Asset</span>",
  renderWorkOrderCommandSummary: () => "<section data-test-command-summary></section>",
  renderWorkOrderRecommendation: () => "<section data-test-recommendation></section>",
  statusLabel: (status) => status,
  hasCompletedSafetyDeviceCheck: () => true,
  canAssignWorkOrderToMe: () => true,
  renderAssetOptions: () => '<option value="asset-1" selected>Press</option>',
  assetLocationRoutingMessage: () => "",
  renderWorkOrderAssignmentField: () => '<label id="quick-update-owner-field">Owner</label>',
  requiresSafetyDeviceCheck: () => true,
  renderWorkOrderMessages: () => '<section data-test-work-messages></section>',
  renderProcedureOptions: () => '<option value="proc-1" selected>Lockout</option>',
  money: (value) => `$${Number(value).toFixed(2)}`,
  photoMetaText: () => "uploaded",
  renderActivityItem: () => "<article>Status changed</article>",
  canDeleteWorkOrders: () => true,
});

const html = renderWorkOrderDetail();

assert.match(html, /Hydraulic Leak/);
assert.match(html, /id="status-select"/);
assert.match(html, /id="quick-update-work-order-form"/);
assert.match(html, /name="due_at" type="date" value="2026-06-01"/);
assert.match(html, /data-copy-downtime="subject"/);
assert.match(html, /id="edit-work-order-form"/);
assert.match(html, /id="complete-work-order-form"/);
assert.match(html, /id="parts-used-form"/);
assert.match(html, /Hose/);
assert.match(html, /QA User/);
assert.match(html, /id="photo-form"/);
assert.match(html, /id="comment-form"/);
assert.match(html, /id="work-order-history-target"/);
assert.match(html, /data-cancel-delete-work-order/);
assert.match(html, /data-confirm-delete-work-order="wo-1"/);
assert.match(html, /<details class="work-detail-section relationship-detail procedure" open>/);
assert.match(html, /Procedure Checklist/);
assert.match(html, /data-step-result="step-1"/);
assert.match(html, /Finish checklist first\./);

const missingRenderer = createWorkOrderDetailDisplayHelpers({
  ...{},
  getActiveWorkOrderId: () => "missing",
  getWorkOrders: () => [],
  renderMissingWorkOrderDetail: () => "<p>Missing work order</p>",
}).renderWorkOrderDetail;
assert.equal(missingRenderer(), "<p>Missing work order</p>");

console.log("work order detail display smoke passed");
