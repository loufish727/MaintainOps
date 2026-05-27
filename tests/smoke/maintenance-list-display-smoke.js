const assert = require("node:assert/strict");

global.window = {};

const { createMaintenanceListDisplayHelpers } = require("../../src/render/maintenanceListDisplay.js");

const state = {
  pendingDeleteScheduleId: "schedule-1",
  pendingDeleteProcedureId: "procedure-1",
};

const helpers = createMaintenanceListDisplayHelpers({
  getPreventiveSchedules: () => [
    { id: "schedule-1", title: "Monthly PM", frequency: "monthly", next_due_at: "2026-06-01", asset_id: "asset-1", assets: { name: "Mixer" }, procedure_template_id: "procedure-1" },
    { id: "schedule-2", title: "Hidden PM", frequency: "weekly", next_due_at: "2026-06-02", asset_id: "asset-2", assets: { name: "Saw" }, procedure_template_id: "" },
  ],
  getProcedureTemplates: () => [
    {
      id: "procedure-1",
      name: "Inspect <Mixer>",
      description: "Check guards",
      procedure_steps: [{ id: "step-1", position: 1, prompt: "Guard present?", response_type: "checkbox", required: true }],
    },
  ],
  getWorkOrders: () => [
    { id: "wo-1", procedure_template_id: "procedure-1" },
  ],
  getPendingDeleteScheduleId: () => state.pendingDeleteScheduleId,
  getPendingDeleteProcedureId: () => state.pendingDeleteProcedureId,
  matchesActiveLocation: (record) => record.asset_id !== "asset-2",
  matchesSearch: (values) => values.some((value) => String(value || "").includes("Monthly") || String(value || "").includes("Inspect")),
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  getDueState: () => ({ className: "overdue", label: "Overdue" }),
  procedureDeleteBlockerMessage: ({ workOrders, schedules }) => workOrders || schedules ? `${workOrders} work / ${schedules} schedule blockers` : "",
  canDeleteOperationalRecords: () => true,
});

assert.equal(helpers.filteredPreventiveSchedules().length, 1);
assert.equal(helpers.filteredProcedureTemplates().length, 1);

const schedule = helpers.renderPreventiveSchedule(helpers.filteredPreventiveSchedules()[0]);
assert.match(schedule, /Monthly PM/);
assert.match(schedule, /data-generate-pm="schedule-1"/);
assert.match(schedule, /data-cancel-delete-schedule/);
assert.match(schedule, /data-confirm-delete-schedule="schedule-1"/);

const procedure = helpers.renderProcedureTemplate(helpers.filteredProcedureTemplates()[0]);
assert.match(procedure, /Inspect &lt;Mixer&gt;/);
assert.match(procedure, /1 linked work orders/);
assert.match(procedure, /1 PM schedules/);
assert.match(procedure, /data-add-step="procedure-1"/);
assert.match(procedure, /1 work \/ 1 schedule blockers/);
assert.match(procedure, /Kept For Traceability/);

console.log("maintenance list display smoke passed");
