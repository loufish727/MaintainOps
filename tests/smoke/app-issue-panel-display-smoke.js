const assert = require("node:assert/strict");

global.window = {};

const { createAppIssuePanelDisplayHelpers } = require("../../src/render/appIssuePanelDisplay.js");

const helpers = createAppIssuePanelDisplayHelpers({
  canManageTeam: () => true,
  renderAppIssueReport: (report) => `<article>${report.title}</article>`,
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  getActiveSection: () => "settings<script>",
  getAppIssueReportsReady: () => true,
  getAppIssueReports: () => [{ title: "Saved issue" }],
});

const form = helpers.renderAppIssueReportForm();
assert.match(form, /id="app-issue-report-form"/);
assert.match(form, /data-cancel-app-issue-report/);
assert.match(form, /name="severity"/);
assert.match(form, /value="settings&lt;script&gt;"/);
assert.match(form, /Send Report/);

const panel = helpers.renderAppIssueReportsPanel();
assert.match(panel, /Reported App Issues/);
assert.match(panel, /Saved issue/);

const blocked = createAppIssuePanelDisplayHelpers({
  canManageTeam: () => false,
  renderAppIssueReport: () => "",
  escapeHtml: (value) => String(value ?? ""),
  getActiveSection: () => "work",
  getAppIssueReportsReady: () => true,
  getAppIssueReports: () => [],
});

assert.equal(blocked.renderAppIssueReportsPanel(), "");

console.log("app issue panel display smoke passed");
