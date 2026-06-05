(function () {
  function createManagerDashboardDisplayHelpers(deps) {
    const dayMs = 24 * 60 * 60 * 1000;

    function todayStart() {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      return date;
    }

    function daysAgo(days) {
      return new Date(todayStart().getTime() - (days * dayMs));
    }

    function isCompletedSince(workOrder, cutoff) {
      return Boolean(workOrder.completed_at && new Date(workOrder.completed_at) >= cutoff);
    }

    function openWorkOrders() {
      return deps.getWorkOrders().filter((workOrder) => deps.matchesActiveLocation(workOrder) && workOrder.status !== "completed");
    }

    function completedWorkOrders() {
      return deps.getWorkOrders().filter((workOrder) => deps.matchesActiveLocation(workOrder) && workOrder.status === "completed");
    }

    function activeRequests() {
      return deps.getMaintenanceRequests().filter((request) => deps.matchesActiveLocation(request) && !deps.isConvertedRequest(request) && request.status === "submitted");
    }

    function convertedRequests() {
      return deps.getMaintenanceRequests().filter((request) => deps.matchesActiveLocation(request) && deps.isConvertedRequest(request));
    }

    function assignedOpenWork(userId) {
      return openWorkOrders().filter((workOrder) => workOrder.assigned_to === userId);
    }

    function latestActivityFor(userId) {
      const dates = deps.getWorkOrders()
        .filter((workOrder) => deps.matchesActiveLocation(workOrder) && (workOrder.assigned_to === userId || workOrder.completed_by === userId || workOrder.created_by === userId))
        .map((workOrder) => workOrder.completed_at || workOrder.updated_at || workOrder.created_at)
        .filter(Boolean)
        .map((value) => new Date(value))
        .filter((date) => Number.isFinite(date.getTime()))
        .sort((a, b) => b - a);
      return dates[0] || null;
    }

    function averageAgeDays(rows) {
      if (!rows.length) return 0;
      const now = Date.now();
      const total = rows.reduce((sum, workOrder) => {
        const created = new Date(workOrder.created_at || now).getTime();
        return sum + Math.max(0, Math.round((now - created) / dayMs));
      }, 0);
      return Math.round(total / rows.length);
    }

    function managerSummaryCards() {
      const counts = deps.getWorkOrderDashboardCounts() || {};
      const requestCounts = deps.getRequestDashboardCounts() || {};
      const unassigned = openWorkOrders().filter((workOrder) => !workOrder.assigned_to).length;
      return [
        ["Open Work", counts.activeWork ?? openWorkOrders().length, "Current active work in this location."],
        ["New Requests", requestCounts.active ?? activeRequests().length, "Submitted requests waiting for review."],
        ["Overdue", counts.overdue ?? openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length, "Open work past due."],
        ["Unassigned", unassigned, "Open work with no internal owner."],
        ["Completed Week", counts.completedWeek ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length, "Work completed in the last 7 days."],
        ["Converted Requests", requestCounts.converted ?? convertedRequests().length, "Requests already turned into work orders."],
      ];
    }

    function technicianRows() {
      const weekCutoff = daysAgo(7);
      const monthCutoff = daysAgo(30);
      return deps.getCompanyMembers()
        .filter((member) => ["technician", "manager", "admin"].includes(deps.normalizeRole(member.role)))
        .map((member) => {
          const userId = member.user_id;
          const assigned = assignedOpenWork(userId);
          const completed = completedWorkOrders().filter((workOrder) => workOrder.completed_by === userId || workOrder.assigned_to === userId);
          const latest = latestActivityFor(userId);
          return {
            userId,
            name: deps.teamMemberName(userId),
            role: deps.roleLabel(member.role),
            open: assigned.length,
            inProgress: assigned.filter((workOrder) => workOrder.status === "in_progress").length,
            blocked: assigned.filter((workOrder) => workOrder.status === "blocked").length,
            overdue: assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length,
            completedWeek: completed.filter((workOrder) => isCompletedSince(workOrder, weekCutoff)).length,
            completedMonth: completed.filter((workOrder) => isCompletedSince(workOrder, monthCutoff)).length,
            averageAge: averageAgeDays(assigned),
            latestActivity: latest ? latest.toLocaleString() : "No recent loaded activity",
          };
        })
        .sort((a, b) => b.open - a.open || b.overdue - a.overdue || a.name.localeCompare(b.name));
    }

    function renderMetricCard([label, value, detail]) {
      return `
        <article class="manager-metric-card">
          <span>${deps.escapeHtml(label)}</span>
          <strong>${deps.escapeHtml(value)}</strong>
          <small>${deps.escapeHtml(detail)}</small>
        </article>
      `;
    }

    function renderTechnicianRow(row) {
      return `
        <article class="manager-tech-row">
          <div class="manager-tech-person">
            <strong>${deps.escapeHtml(row.name)}</strong>
            <span>${deps.escapeHtml(row.role)}</span>
          </div>
          <div><span>Open</span><strong>${row.open}</strong></div>
          <div><span>In Progress</span><strong>${row.inProgress}</strong></div>
          <div><span>Blocked</span><strong>${row.blocked}</strong></div>
          <div><span>Overdue</span><strong>${row.overdue}</strong></div>
          <div><span>Done 7d</span><strong>${row.completedWeek}</strong></div>
          <div><span>Done 30d</span><strong>${row.completedMonth}</strong></div>
          <div><span>Avg Age</span><strong>${row.averageAge}d</strong></div>
          <small>${deps.escapeHtml(row.latestActivity)}</small>
        </article>
      `;
    }

    function renderManagerDashboard() {
      const rows = technicianRows();
      return `
        <section class="manager-dashboard" aria-label="Manager dashboard">
          <div class="queue-context-card manager-context-card">
            <div>
              <strong>Manager Beta Dashboard</strong>
              <span>Operational snapshot for workload, request intake, and team follow-up.</span>
            </div>
            <small>Phase 1 uses current loaded workspace data; full historical drilldowns come later.</small>
          </div>
          <div class="manager-metric-grid">
            ${managerSummaryCards().map(renderMetricCard).join("")}
          </div>
          <section class="manager-tech-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Technician Workload</h3>
              <span>${rows.length} people</span>
            </div>
            <div class="manager-tech-list">
              ${rows.map(renderTechnicianRow).join("") || `<p class="muted">No team members loaded yet.</p>`}
            </div>
          </section>
        </section>
      `;
    }

    return {
      renderManagerDashboard,
      managerSummaryCards,
      technicianRows,
    };
  }

  window.MaintainOpsManagerDashboardDisplay = {
    createManagerDashboardDisplayHelpers,
  };
})();
