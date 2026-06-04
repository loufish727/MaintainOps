const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "..", "src", "render", "appIssueDisplay.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const { renderAppIssueReport } = context.window.MaintainOpsAppIssueDisplay.createAppIssueDisplayHelpers({
  escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  getProfilesByUserId: () => ({ "user-1": { full_name: "QA Manager" } }),
  getLocations: () => [{ id: "location-1", name: "Main Plant" }],
});

const html = renderAppIssueReport({
  id: "issue-1",
  reporter_id: "user-1",
  location_id: "location-1",
  severity: "blocking",
  status: "reviewing",
  title: "Issue title",
  details: "Issue details",
  screen: "work",
});

assert.match(html, /issue-report-card issue-reviewing/);
assert.match(html, /issue-status-chip issue-status-reviewing/);
assert.match(html, /data-app-issue-status="issue-1"/);
assert.match(html, /data-delete-app-issue="issue-1"/);

console.log("app issue admin display smoke passed");
