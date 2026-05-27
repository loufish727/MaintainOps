(function () {
  function createAppIssuePanelDisplayHelpers({
    canManageTeam,
    renderAppIssueReport,
    escapeHtml,
    getActiveSection,
    getAppIssueReportsReady,
    getAppIssueReports,
  }) {
    function renderAppIssueReportForm() {
      const appIssueReportsReady = getAppIssueReportsReady();
      return `
        <section class="panel full-width focus-panel app-issue-report-panel">
          <div class="panel-header">
            <h2>Report App Issue</h2>
            <button class="secondary-button back-action-button" data-cancel-app-issue-report type="button">Cancel</button>
          </div>
          <form class="form-grid app-issue-report-form" id="app-issue-report-form">
            <label>Short title<input name="title" required maxlength="140" placeholder="What broke or felt confusing?"></label>
            <label>Details<textarea name="details" rows="4" required placeholder="What were you trying to do, what happened, and what device were you on?"></textarea></label>
            <label>Severity
              <select name="severity">
                <option value="normal">Normal</option>
                <option value="blocking">Blocking</option>
                <option value="minor">Minor</option>
              </select>
            </label>
            <input name="screen" type="hidden" value="${escapeHtml(getActiveSection())}">
            <p class="muted">This sends the current company, location, screen, and signed-in user with the report.</p>
            <p class="error-text" id="app-issue-report-error">${appIssueReportsReady ? "" : "Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${appIssueReportsReady ? "" : "disabled"}>Send Report</button>
          </form>
        </section>
      `;
    }

    function renderAppIssueReportsPanel() {
      if (!canManageTeam()) return "";
      const appIssueReportsReady = getAppIssueReportsReady();
      const appIssueReports = getAppIssueReports();
      return `
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${appIssueReportsReady ? `${appIssueReports.length} captured` : "setup needed"}</span>
            </div>
          </div>
          ${appIssueReportsReady ? `
            <div class="issue-report-list">
              ${appIssueReports.map(renderAppIssueReport).join("") || `<p class="muted">No app issues reported yet.</p>`}
            </div>
          ` : `<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>`}
        </section>
      `;
    }

    return {
      renderAppIssueReportForm,
      renderAppIssueReportsPanel,
    };
  }

  window.MaintainOpsAppIssuePanelDisplay = {
    createAppIssuePanelDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAppIssuePanelDisplayHelpers };
  }
})();
