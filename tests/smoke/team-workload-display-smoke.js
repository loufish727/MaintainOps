const assert = require("node:assert/strict");

global.window = {};
require("../../src/render/teamWorkloadDisplay.js");

const { createTeamWorkloadDisplayHelpers } = window.MaintainOpsTeamWorkloadDisplay;
const { isWorkOrderAssignedToUser } = require("../../src/utils/productionAction.js");
const workOrders = [
  ...Array.from({ length: 15 }, (_, index) => ({
    id: `bulk-${index}`,
    assigned_to: "user-1",
    location_id: "location-1",
    status: "open",
  })),
  { id: "wo-1", assigned_to: "user-1", location_id: "location-1", status: "open", due_at: "2000-01-01" },
  { id: "wo-2", assigned_to: "user-1", location_id: "location-1", status: "in_progress" },
  { id: "wo-3", assigned_to: "user-1", location_id: "location-1", status: "blocked" },
  { id: "wo-4", assigned_to: "user-1", location_id: "location-2", status: "blocked" },
  { id: "wo-5", assigned_to: "user-2", location_id: "location-1", status: "open" },
  { id: "wo-6", assigned_to: "user-1", location_id: "location-1", status: "completed" },
  { id: "wo-7", assigned_to: "user-1", location_id: "location-1", status: "completed" },
  { id: "wo-8", assigned_to: "user-1", location_id: "location-2", status: "completed" },
];

const { teamMemberWorkload } = createTeamWorkloadDisplayHelpers({
  getWorkOrders: () => workOrders,
  matchesActiveLocation: (workOrder) => workOrder.location_id === "location-1",
  getDueState: (workOrder) => workOrder.due_at ? { className: "overdue" } : null,
  isWorkOrderAssignedToUser,
});

assert.deepEqual(teamMemberWorkload("user-1"), {
  newWork: 16,
  inProgress: 1,
  blocked: 1,
  completed: 2,
  overdue: 1,
});
assert.deepEqual(teamMemberWorkload("missing-user"), {
  newWork: 0,
  inProgress: 0,
  blocked: 0,
  completed: 0,
  overdue: 0,
});

console.log("team workload display smoke passed");
