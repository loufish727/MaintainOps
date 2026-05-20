(function () {
  function renderGaugeReadout(label, value, tone = "active", options = {}, deps) {
    const activeStatusFilter = deps.getActiveStatusFilter();
    const isAction = options.filter || options.section;
    const tag = isAction ? "button" : "article";
    const activeClass = options.filter && activeStatusFilter === options.filter ? " selected" : "";
    const isOverdueAlert = tone.includes("overdue") && Number(value) >= 3;
    const alertClass = isOverdueAlert ? " alert-blink" : "";
    const attributes = [
      isAction ? `type="button"` : "",
      options.filter ? `data-status-filter="${options.filter}" aria-pressed="${activeStatusFilter === options.filter}"` : "",
      options.section ? `data-section="${options.section}"` : "",
    ].filter(Boolean).join(" ");
    const attrText = attributes ? ` ${attributes}` : "";
    return `
    <${tag} class="gauge-readout ${tone}${activeClass}${alertClass}"${attrText}>
      ${isOverdueAlert ? `<span class="gauge-alert-badge" aria-hidden="true">!</span>` : ""}
      <div class="gauge-visual" aria-hidden="true">
        <span class="gauge-arc"></span>
        <span class="gauge-cut one"></span>
        <span class="gauge-cut two"></span>
        <span class="gauge-cut three"></span>
        <span class="gauge-cut four"></span>
        <span class="gauge-needle"></span>
        <span class="gauge-hub"></span>
      </div>
      <strong>${value}</strong>
      <span>${deps.escapeHtml(label)}</span>
    </${tag}>
  `;
  }

  function renderWorkOrderGaugeDashboard(deps) {
    const counts = deps.getWorkOrderDashboardCounts() || {};
    const activeWork = counts.activeWork || 0;
    const newWork = counts.newWork || 0;
    const inProgress = counts.inProgress || 0;
    const blocked = counts.blocked || 0;
    const overdue = counts.overdue || 0;
    const completedMonth = counts.completedMonth || 0;
    const completedWeek = counts.completedWeek || 0;
    const requestCount = deps.getRequestsReady()
      ? deps.openMaintenanceRequests().filter(deps.matchesActiveLocation).length
      : 0;
    return `
    <div class="summary-gauge-grid">
      ${renderGaugeReadout("Active Work", activeWork, "active", { filter: "active" }, deps)}
      ${renderGaugeReadout("New", newWork, "new", { filter: "open" }, deps)}
      ${renderGaugeReadout("In Progress", inProgress, "in_progress", { filter: "in_progress" }, deps)}
      ${renderGaugeReadout("Blocked", blocked, "blocked", { filter: "blocked" }, deps)}
      ${renderGaugeReadout("Overdue", overdue, "overdue", { filter: "overdue" }, deps)}
      ${renderGaugeReadout("Requests", requestCount, "request", { filter: "requests" }, deps)}
      ${renderGaugeReadout("Completed Month", completedMonth, "completed", { filter: "completed_month" }, deps)}
      ${renderGaugeReadout("Done This Week", completedWeek, "completed", { filter: "completed_week" }, deps)}
    </div>
  `;
  }

  function renderWorkloadStrip(items, deps) {
    const counts = items || {};
    const newWork = counts.newWork || 0;
    const inProgress = counts.inProgress || 0;
    const blocked = counts.blocked || 0;
    const active = counts.activeWork ?? (newWork + inProgress + blocked);
    const overdue = counts.overdue || 0;
    const completedMonth = counts.completedMonth || 0;
    const completedWeek = counts.completedWeek || 0;
    return `
    <div class="workload-strip" aria-label="Active work summary">
      ${renderGaugeReadout("Active Work", active, "active workload-pill", { filter: "active" }, deps)}
      ${renderGaugeReadout("New", newWork, "new workload-pill", { filter: "open" }, deps)}
      ${renderGaugeReadout("In Progress", inProgress, "in_progress workload-pill", { filter: "in_progress" }, deps)}
      ${renderGaugeReadout("Blocked", blocked, "blocked workload-pill", { filter: "blocked" }, deps)}
      ${renderGaugeReadout("Overdue", overdue, "overdue workload-pill", { filter: "overdue" }, deps)}
      ${renderGaugeReadout("Completed Month", completedMonth, "completed workload-pill", { filter: "completed_month" }, deps)}
      ${renderGaugeReadout("Done This Week", completedWeek, "completed workload-pill", { filter: "completed_week" }, deps)}
    </div>
  `;
  }

  function createDashboardDisplayHelpers(deps) {
    return Object.freeze({
      renderGaugeReadout: (label, value, tone = "active", options = {}) => renderGaugeReadout(label, value, tone, options, deps),
      renderWorkOrderGaugeDashboard: () => renderWorkOrderGaugeDashboard(deps),
      renderWorkloadStrip: (items) => renderWorkloadStrip(items, deps),
    });
  }

  window.MaintainOpsDashboardDisplay = Object.freeze({
    createDashboardDisplayHelpers,
  });
})();
