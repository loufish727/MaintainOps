const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

global.window = {};

const { createProductionActionDisplayHelpers } = require("../../src/render/productionActionDisplay.js");

let role = "technician";
let editable = true;
const helpers = createProductionActionDisplayHelpers({
  getCompanyMembers: () => [
    { user_id: "tech-1", role: "technician" },
    { user_id: "prod-1", role: "production" },
  ],
  getSession: () => ({ user: { id: "prod-1" } }),
  normalizeRole: (value) => value,
  teamMemberName: (userId) => ({ "tech-1": "Taylor Tech", "prod-1": "Justin Werber" })[userId] || userId,
  activeCompanyRole: () => role,
  canEditOperationalRecords: () => editable,
  hasProductionAction: (workOrder) => Boolean(workOrder.production_action),
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
});

const workOrder = { id: "wo-1", status: "in_progress", title: "Press repair" };
const emptyCard = helpers.renderProductionActionCard(workOrder);
assert.match(emptyCard, /data-production-action-control/);
assert.match(emptyCard, /data-production-action-form="wo-1"/);
assert.match(emptyCard, /Justin Werber/);
assert.match(emptyCard, /secondary-button production-action-button/);
assert.match(emptyCard, /production-action-card-compact/);
assert.match(emptyCard, /data-production-action-dialog-open="wo-1"/);
assert.match(emptyCard, /data-production-action-dialog="wo-1"/);
assert.match(emptyCard, /aria-label="Assign Production Action"/);

const openAction = {
  ...workOrder,
  production_action: "Hold Line <2> for maintenance",
  production_action_assigned_to: "prod-1",
  production_action_status: "open",
};
const openCard = helpers.renderProductionActionCard(openAction);
assert.match(openCard, /Production Action/);
assert.match(openCard, /Hold Line &lt;2&gt; for maintenance/);
assert.match(openCard, /Justin Werber/);
assert.match(openCard, /data-production-action-status="completed"/);
assert.match(openCard, /secondary-button production-action-button/);
assert.match(openCard, /data-production-action-remove="wo-1"/);
assert.match(openCard, /production-action-card-preview/);
assert.match(openCard, /aria-label="Manage Production Action"/);

const completedDetail = helpers.renderProductionActionDetail({
  ...openAction,
  production_action_status: "completed",
  production_action_completed_at: "2026-08-04T12:00:00Z",
});
assert.match(completedDetail, /Completed/);
assert.match(completedDetail, /data-production-action-status="open"/);

role = "technician";
editable = false;
const readOnlyDetail = helpers.renderProductionActionDetail(openAction);
assert.match(readOnlyDetail, /Hold Line/);
assert.doesNotMatch(readOnlyDetail, /data-production-action-form/);
assert.doesNotMatch(readOnlyDetail, /data-production-action-status/);

const styles = fs.readFileSync(path.join(__dirname, "../../styles.css"), "utf8");
const darkGlassStart = styles.indexOf("/* Dark glass theme pass */");
const darkGlassEnd = styles.indexOf("\nbody {", darkGlassStart);
const darkGlassTheme = styles.slice(darkGlassStart, darkGlassEnd);
assert.ok(darkGlassStart >= 0 && darkGlassEnd > darkGlassStart);
assert.match(darkGlassTheme, /--production-bg:/);
assert.match(darkGlassTheme, /--production-ink:/);
assert.match(styles, /\.production-action-control \.production-action-button/);
assert.match(styles, /color: var\(--production-ink\)/);
assert.match(styles, /\.work-card > \.production-action-card-compact/);
assert.match(styles, /height: 64px/);
assert.match(styles, /\.production-action-dialog/);

console.log("production action display smoke passed");
