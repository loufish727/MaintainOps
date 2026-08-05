const assert = require("node:assert/strict");

global.window = {};
const { createWorkOrderNotificationDisplayHelpers } = require("../../src/render/workOrderNotificationDisplay.js");

let notifications = [
  {
    id: "notification-1",
    work_order_id: "work-1",
    kind: "production_action_completed",
    title: "Production ready: Guard repair",
    body: "Production Action completed by Justin <Production>.",
    created_at: "2026-08-05T12:00:00Z",
    read_at: null,
  },
  {
    id: "notification-2",
    work_order_id: "work-2",
    kind: "production_action_completed",
    title: "Production ready: Read item",
    body: "Already opened.",
    created_at: "2026-08-04T12:00:00Z",
    read_at: "2026-08-04T13:00:00Z",
  },
];
const escapeHtml = (value) => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
const helpers = createWorkOrderNotificationDisplayHelpers({
  getNotifications: () => notifications,
  getReady: () => true,
  escapeHtml,
  formatMessageTime: () => "12:00 PM",
  visibleLimit: 12,
});

assert.equal(helpers.unreadWorkOrderNotificationCount(), 1);
assert.equal(helpers.hasUnreadProductionReady("work-1"), true);
assert.equal(helpers.hasUnreadProductionReady("work-2"), false);
const html = helpers.renderWorkOrderNotifications();
assert.match(html, /Work notifications/);
assert.match(html, /1 new/);
assert.match(html, /data-open-work-notification="notification-1"/);
assert.match(html, /data-work-order-id="work-1"/);
assert.match(html, /Production Ready/);
assert.match(html, /Justin &lt;Production&gt;/);
assert.doesNotMatch(html, /Justin <Production>/);

notifications = notifications.map((notification) => ({ ...notification, read_at: "2026-08-05T13:00:00Z" }));
assert.equal(helpers.unreadWorkOrderNotificationCount(), 0);
assert.equal(helpers.hasUnreadProductionReady("work-1"), false);

console.log("work order notification display smoke passed");
