(function () {
  function createAppIssueDisplayHelpers({
    escapeHtml,
    getProfilesByUserId,
    getLocations,
  }) {
    function renderAppIssueReport(report) {
      const reporter = getProfilesByUserId()[report.reporter_id]?.full_name || "Team member";
      const location = getLocations().find((item) => item.id === report.location_id)?.name || "No location";
      return `
        <article class="issue-report-card issue-${report.status || "open"}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${report.severity === "blocking" ? "critical" : report.severity === "minor" ? "completed" : "open"}">${escapeHtml(report.severity || "normal")}</span>
              <span class="chip">${escapeHtml(report.status || "open")}</span>
              <span>${escapeHtml(location)}</span>
              <span>${report.created_at ? new Date(report.created_at).toLocaleString() : ""}</span>
            </div>
            <strong>${escapeHtml(report.title)}</strong>
            <p>${escapeHtml(report.details || "")}</p>
            <small>${escapeHtml(reporter)} - ${escapeHtml(report.screen || "workspace")}</small>
          </div>
          <form class="inline-form issue-status-form" data-app-issue-status="${escapeHtml(report.id)}">
            <select name="status" aria-label="Issue status">
              ${["open", "reviewing", "resolved"].map((status) => `<option value="${status}" ${status === (report.status || "open") ? "selected" : ""}>${status}</option>`).join("")}
            </select>
            <button class="secondary-button" type="submit">Save</button>
          </form>
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
