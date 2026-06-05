(function () {
  function createManagerDashboardDisplayHelpers(deps) {
    const dayMs = 24 * 60 * 60 * 1000;
    const summaryUserId = "__summary__";

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
      const rowsById = new Map();
      const loadedRows = [
        ...deps.getWorkOrders(),
        ...(typeof deps.getManagerCompletedWorkOrders === "function" ? deps.getManagerCompletedWorkOrders() : []),
      ];
      loadedRows.forEach((workOrder) => {
        if (workOrder?.id && deps.matchesActiveLocation(workOrder) && workOrder.status === "completed") {
          rowsById.set(workOrder.id, workOrder);
        }
      });
      return [...rowsById.values()];
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

    function selectedUserId() {
      return typeof deps.getManagerDashboardUserId === "function" ? deps.getManagerDashboardUserId() : "";
    }

    function selectedMetric() {
      return typeof deps.getManagerDashboardMetric === "function" ? deps.getManagerDashboardMetric() : "open";
    }

    function metricLabel(metric) {
      return ({
        open: "Open Work",
        in_progress: "In Progress",
        blocked: "Blocked",
        overdue: "Overdue",
        completed_week: "Done 7d",
        completed_month: "Done 30d",
        summary_open: "Open Work",
        summary_requests: "New Requests",
        summary_overdue: "Overdue",
        summary_unassigned: "Unassigned",
        summary_completed_week: "Completed Week",
        summary_completed_month: "Completed Month",
        summary_converted_requests: "Converted Requests",
      })[metric] || "Open Work";
    }

    function summaryWorkOrders(metric) {
      if (metric === "summary_overdue") return openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
      if (metric === "summary_unassigned") return openWorkOrders().filter((workOrder) => !workOrder.assigned_to);
      if (metric === "summary_completed_week") return completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7)));
      if (metric === "summary_completed_month") return completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30)));
      return openWorkOrders();
    }

    function summaryRequests(metric) {
      if (metric === "summary_converted_requests") return convertedRequests();
      return activeRequests();
    }

    function metricWorkOrders(userId, metric) {
      const assigned = assignedOpenWork(userId);
      const completed = completedWorkOrders().filter((workOrder) => workOrder.completed_by === userId || workOrder.assigned_to === userId);
      if (metric === "in_progress") return assigned.filter((workOrder) => workOrder.status === "in_progress");
      if (metric === "blocked") return assigned.filter((workOrder) => workOrder.status === "blocked");
      if (metric === "overdue") return assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
      if (metric === "completed_week") return completed.filter((workOrder) => isCompletedSince(workOrder, daysAgo(7)));
      if (metric === "completed_month") return completed.filter((workOrder) => isCompletedSince(workOrder, daysAgo(30)));
      return assigned;
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
        ["Open Work", counts.activeWork ?? openWorkOrders().length, "Current active work in this location.", "summary_open"],
        ["New Requests", requestCounts.active ?? activeRequests().length, "Submitted requests waiting for review.", "summary_requests"],
        ["Overdue", counts.overdue ?? openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length, "Open work past due.", "summary_overdue"],
        ["Unassigned", unassigned, "Open work with no internal owner.", "summary_unassigned"],
        ["Completed Week", counts.completedWeek ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length, "Work completed in the last 7 days.", "summary_completed_week"],
        ["Completed Month", counts.completedMonth ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30))).length, "Work completed in the last 30 days.", "summary_completed_month"],
        ["Converted Requests", requestCounts.converted ?? convertedRequests().length, "Requests already turned into work orders.", "summary_converted_requests"],
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

    function renderMetricCard([label, value, detail, metric]) {
      const activeClass = selectedUserId() === summaryUserId && selectedMetric() === metric ? " active" : "";
      return `
        <button type="button" class="manager-metric-card${activeClass}" data-manager-drill-user="${summaryUserId}" data-manager-drill-metric="${deps.escapeHtml(metric)}">
          <span>${deps.escapeHtml(label)}</span>
          <strong>${deps.escapeHtml(value)}</strong>
          <small>${deps.escapeHtml(detail)}</small>
        </button>
      `;
    }

    function renderTechnicianRow(row) {
      const activeUserId = selectedUserId();
      const activeMetric = selectedMetric();
      const activeClass = (metric) => row.userId === activeUserId && metric === activeMetric ? " active" : "";
      return `
        <article class="manager-tech-row${row.userId === activeUserId ? " selected" : ""}">
          <button type="button" class="manager-tech-person manager-drill-button${activeClass("open")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="open">
            <strong>${deps.escapeHtml(row.name)}</strong>
            <span>${deps.escapeHtml(row.role)}</span>
          </button>
          <button type="button" class="manager-drill-button${activeClass("open")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="open"><span>Open</span><strong>${row.open}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("in_progress")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="in_progress"><span>In Progress</span><strong>${row.inProgress}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("blocked")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="blocked"><span>Blocked</span><strong>${row.blocked}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("overdue")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="overdue"><span>Overdue</span><strong>${row.overdue}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("completed_week")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="completed_week"><span>Done 7d</span><strong>${row.completedWeek}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("completed_month")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="completed_month"><span>Done 30d</span><strong>${row.completedMonth}</strong></button>
          <div><span>Avg Age</span><strong>${row.averageAge}d</strong></div>
          <small>${deps.escapeHtml(row.latestActivity)}</small>
        </article>
      `;
    }

    function formatDate(value) {
      if (!value) return "Date unset";
      const date = new Date(value);
      if (!Number.isFinite(date.getTime())) return String(value);
      return date.toLocaleDateString();
    }

    function workOrderTitle(workOrder) {
      return workOrder.title || workOrder.description || workOrder.name || "Untitled work order";
    }

    function renderDrillWorkOrder(workOrder) {
      const dueState = deps.getDueState(workOrder) || {};
      const dueLabel = dueState.label || (workOrder.due_at ? `Due ${formatDate(workOrder.due_at)}` : "Due date unset");
      return `
        <article class="mini-work-order manager-drill-work-order" data-mini-work-order="${deps.escapeHtml(workOrder.id)}">
          <strong>${deps.escapeHtml(workOrderTitle(workOrder))}</strong>
          <span>${deps.escapeHtml(deps.statusLabel ? deps.statusLabel(workOrder.status) : workOrder.status || "Open")}</span>
          <small>${deps.escapeHtml(dueLabel)} - Created ${deps.escapeHtml(formatDate(workOrder.created_at))}</small>
        </article>
      `;
    }

    function requestTitle(request) {
      return request.title || request.description || "Untitled request";
    }

    function requestRequester(request) {
      return request.requested_by_name || request.requester_name || "Requester unknown";
    }

    function requestEquipmentLabel(request) {
      return request.assets?.name || request.equipment_note || "Machine / area not set";
    }

    function renderDrillRequest(request) {
      return `
        <article class="mini-work-order manager-drill-request">
          <strong>${deps.escapeHtml(requestTitle(request))}</strong>
          <span>${deps.escapeHtml(request.priority || "Medium")} priority</span>
          <small>${deps.escapeHtml(requestEquipmentLabel(request))} - ${deps.escapeHtml(requestRequester(request))} - ${deps.escapeHtml(formatDate(request.created_at))}</small>
        </article>
      `;
    }

    function renderManagerDrillIn(rows) {
      const userId = selectedUserId();
      if (!userId) return "";
      const metric = selectedMetric();
      if (userId === summaryUserId) {
        const requestMetric = metric === "summary_requests" || metric === "summary_converted_requests";
        const workRows = requestMetric ? [] : summaryWorkOrders(metric);
        const requestRows = requestMetric ? summaryRequests(metric) : [];
        const itemCount = requestMetric ? requestRows.length : workRows.length;
        return `
          <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
            <div class="panel-header compact">
              <div>
                <h3>${deps.escapeHtml(metricLabel(metric))}</h3>
                <span>Manager snapshot - ${itemCount} loaded item${itemCount === 1 ? "" : "s"}</span>
              </div>
              <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
            </div>
            <div class="manager-drill-list">
              ${requestMetric ? requestRows.map(renderDrillRequest).join("") : workRows.map(renderDrillWorkOrder).join("")}
              ${itemCount ? "" : `<p class="muted">No loaded items match this view.</p>`}
            </div>
          </section>
        `;
      }
      const userRow = rows.find((row) => row.userId === userId);
      const workRows = metricWorkOrders(userId, metric);
      return `
        <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
          <div class="panel-header compact">
            <div>
              <h3>${deps.escapeHtml(userRow?.name || deps.teamMemberName(userId))}</h3>
              <span>${deps.escapeHtml(metricLabel(metric))} - ${workRows.length} loaded item${workRows.length === 1 ? "" : "s"}</span>
            </div>
            <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
          </div>
          <div class="manager-drill-list">
            ${workRows.map(renderDrillWorkOrder).join("") || `<p class="muted">No loaded work orders match this view.</p>`}
          </div>
        </section>
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
            <small>${deps.getManagerCompletedWorkReady && !deps.getManagerCompletedWorkReady() ? "Recent completed work is still loading or needs refresh." : "Completed metrics include recent manager history when loaded."}</small>
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
          ${renderManagerDrillIn(rows)}
        </section>
      `;
    }

    return {
      renderManagerDashboard,
      metricWorkOrders,
      managerSummaryCards,
      technicianRows,
    };
  }

  window.MaintainOpsManagerDashboardDisplay = {
    createManagerDashboardDisplayHelpers,
  };
})();
