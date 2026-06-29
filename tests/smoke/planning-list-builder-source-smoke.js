const assert = require("node:assert/strict");

global.window = {};

require("../../src/utils/workspaceListBuilders.js");

const { createWorkspaceListBuilders } = window.MaintainOpsWorkspaceListBuilders;

const today = new Date("2026-06-29T00:00:00");
const visibleQueueWorkOrder = {
  id: "visible-queue",
  title: "Clicked queue item",
  status: "open",
  priority: "low",
  due_at: "2026-06-30",
  location_id: "loc-1",
  assets: { name: "Queue Asset" },
};
const planningOnlyWorkOrder = {
  id: "planning-only",
  title: "Full planning item",
  status: "open",
  priority: "critical",
  due_at: "2026-06-30",
  location_id: "loc-1",
  assets: { name: "Planning Asset" },
};
const followUpOnlyWorkOrder = {
  id: "follow-up-only",
  title: "Completed follow up",
  status: "completed",
  priority: "medium",
  location_id: "loc-1",
  follow_up_needed: true,
  completed_at: "2026-06-28T12:00:00Z",
  assets: { name: "Follow Asset" },
};

const helpers = createWorkspaceListBuilders({
  assets: () => [],
  assignmentLabel: () => "",
  compareWorkOrders: () => 0,
  maintenanceRequests: () => [],
  matchesActiveLocation: (row) => row.location_id === "loc-1",
  matchesQuery: () => true,
  matchesSearch: () => true,
  parts: () => [],
  planningWorkOrders: () => [planningOnlyWorkOrder, followUpOnlyWorkOrder],
  preventiveSchedules: () => [],
  procedureTemplates: () => [],
  profilesByUserId: () => ({}),
  searchQuery: () => "",
  SEARCH_PREVIEW_LIMIT: 5,
  startOfToday: () => today,
  workOrders: () => [visibleQueueWorkOrder],
});

assert.deepEqual(helpers.planningItems().map((item) => item.id), ["planning-only"]);
assert.deepEqual(helpers.followUpItems().map((item) => item.id), ["follow-up-only"]);
assert.deepEqual(helpers.globalSearchResults().work.map((item) => item.id), ["visible-queue"]);

console.log("planning list builder source smoke passed");
