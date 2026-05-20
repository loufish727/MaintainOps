(function () {
  function createAppIssuePanelDisplayHelpers({
    canManageTeam,
    renderAppIssueReport,
    getAppIssueReportsReady,
    getAppIssueReports,
  }) {
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
      renderAppIssueReportsPanel,
    };
  }

  window.MaintainOpsAppIssuePanelDisplay = {
    createAppIssuePanelDisplayHelpers,
  };
})();
