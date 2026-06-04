(function () {
  function createAppIssueDisplayHelpers({
    escapeHtml,
    getProfilesByUserId,
    getLocations,
  }) {
    function renderAppIssueReport(report) {
      const reporter = getProfilesByUserId()[report.reporter_id]?.full_name || "Team member";
      const location = getLocations().find((item) => item.id === report.location_id)?.name || "No location";
      const status = report.status || "open";
      const severity = report.severity || "normal";
      return `
        <article class="issue-report-card issue-${status}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${severity === "blocking" ? "critical" : severity === "minor" ? "completed" : "open"}">${escapeHtml(severity)}</span>
              <span class="chip issue-status-chip issue-status-${status}">${escapeHtml(status)}</span>
              <span>${escapeHtml(location)}</span>
              <span>${report.created_at ? new Date(report.created_at).toLocaleString() : ""}</span>
            </div>
            <strong>${escapeHtml(report.title)}</strong>
            <p>${escapeHtml(report.details || "")}</p>
            <small>${escapeHtml(reporter)} - ${escapeHtml(report.screen || "workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${escapeHtml(report.id)}">
              <select name="status" aria-label="Issue status">
                ${["open", "reviewing", "resolved"].map((option) => `<option value="${option}" ${option === status ? "selected" : ""}>${option}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${escapeHtml(report.id)}" type="button">Delete</button>
          </div>
        </article>
      `;
    }

    return {
      renderAppIssueReport,
    };
  }

  window.MaintainOpsAppIssueDisplay = {
    createAppIssueDisplayHelpers,
  };
})();
