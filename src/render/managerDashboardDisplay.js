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

    function ageDays(workOrder) {
      const created = new Date(workOrder.created_at || Date.now()).getTime();
      if (!Number.isFinite(created)) return 0;
      return Math.max(0, Math.round((Date.now() - created) / dayMs));
    }

    function priorityRank(priority) {
      return { critical: 4, high: 3, medium: 2, low: 1 }[String(priority || "").toLowerCase()] || 0;
    }

    function isCriticalOpen(workOrder) {
      return workOrder.status !== "completed" && priorityRank(workOrder.priority) >= 4;
    }

    function isHighPriorityOpen(workOrder) {
      return workOrder.status !== "completed" && priorityRank(workOrder.priority) >= 3;
    }

    function isStaleOpen(workOrder) {
      return workOrder.status !== "completed" && ageDays(workOrder) >= 7;
    }

    function needsFollowUp(workOrder) {
      return workOrder.status !== "completed" && Boolean(workOrder.follow_up_needed);
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

    function completedOwnerId(workOrder) {
      return workOrder.completed_by || workOrder.assigned_to || workOrder.created_by || "";
    }

    function completedOwnerLabel(workOrder) {
      const ownerId = completedOwnerId(workOrder);
      return ownerId ? deps.teamMemberName(ownerId) : "Completion owner unknown";
    }

    function requestAgeDays(request) {
      const created = new Date(request.created_at || Date.now()).getTime();
      if (!Number.isFinite(created)) return 0;
      return Math.max(0, Math.round((Date.now() - created) / dayMs));
    }

    function isStaleRequest(request) {
      return requestAgeDays(request) >= 2;
    }

    function requestConvertedByLabel(request) {
      const userId = request.converted_by || request.created_by || "";
      return userId ? deps.teamMemberName(userId) : "Converter not recorded";
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
        summary_critical: "Critical Open",
        summary_high_priority: "High Priority",
        summary_stale: "Stale 7d+",
        summary_follow_up: "Follow-up Needed",
        summary_completed_week: "Completed Week",
        summary_completed_month: "Completed Month",
        summary_converted_requests: "Converted Requests",
        summary_stale_requests: "Stale Requests",
        summary_completion_rate: "7d Completion Rate",
      })[metric] || "Open Work";
    }

    function summaryWorkOrders(metric) {
      if (metric === "summary_overdue") return openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
      if (metric === "summary_unassigned") return openWorkOrders().filter((workOrder) => !workOrder.assigned_to);
      if (metric === "summary_critical") return openWorkOrders().filter(isCriticalOpen);
      if (metric === "summary_high_priority") return openWorkOrders().filter(isHighPriorityOpen);
      if (metric === "summary_stale") return openWorkOrders().filter(isStaleOpen);
      if (metric === "summary_follow_up") return openWorkOrders().filter(needsFollowUp);
      if (metric === "summary_completed_week") return completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7)));
      if (metric === "summary_completed_month") return completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30)));
      return openWorkOrders();
    }

    function summaryRequests(metric) {
      if (metric === "summary_converted_requests") return convertedRequests();
      if (metric === "summary_stale_requests") return activeRequests().filter(isStaleRequest);
      return activeRequests();
    }

    function metricWorkOrders(userId, metric) {
      const assigned = assignedOpenWork(userId);
      const completed = completedWorkOrders().filter((workOrder) => workOrder.completed_by === userId || workOrder.assigned_to === userId);
      if (metric === "in_progress") return assigned.filter((workOrder) => workOrder.status === "in_progress");
      if (metric === "blocked") return assigned.filter((workOrder) => workOrder.status === "blocked");
      if (metric === "overdue") return assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
      if (metric === "critical") return assigned.filter(isCriticalOpen);
      if (metric === "stale") return assigned.filter(isStaleOpen);
      if (metric === "follow_up") return assigned.filter(needsFollowUp);
      if (metric === "completed_week") return completed.filter((workOrder) => isCompletedSince(workOrder, daysAgo(7)));
      if (metric === "completed_month") return completed.filter((workOrder) => isCompletedSince(workOrder, daysAgo(30)));
      return assigned;
    }

    function managerCompletionRate() {
      const completedWeek = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length;
      const currentOpen = openWorkOrders().length;
      const total = currentOpen + completedWeek;
      if (!total) return 0;
      return Math.round((completedWeek / total) * 100);
    }

    function overloadLevel(row) {
      if (row.critical > 0 || row.overdue >= 3 || row.blocked >= 2 || row.open >= 10) return "high";
      if (row.overdue > 0 || row.blocked > 0 || row.open >= 6 || row.followUp > 0) return "watch";
      return "normal";
    }

    function overloadLabel(level) {
      return ({ high: "Needs manager review", watch: "Watch workload", normal: "Normal load" })[level] || "Normal load";
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

    function shortDateTime(value) {
      if (!value) return "No recent activity";
      return value.toLocaleString([], {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
        hour: "numeric",
        minute: "2-digit",
      });
    }

    function managerSummaryCards() {
      const counts = deps.getWorkOrderDashboardCounts() || {};
      const requestCounts = deps.getRequestDashboardCounts() || {};
      const openRows = openWorkOrders();
      const unassigned = openWorkOrders().filter((workOrder) => !workOrder.assigned_to).length;
      const staleRequests = activeRequests().filter(isStaleRequest).length;
      return [
        ["Open Work", counts.activeWork ?? openWorkOrders().length, "Current active work in this location.", "summary_open"],
        ["New Requests", requestCounts.active ?? activeRequests().length, "Submitted requests waiting for review.", "summary_requests"],
        ["Overdue", counts.overdue ?? openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length, "Open work past due.", "summary_overdue"],
        ["Unassigned", unassigned, "Open work with no internal owner.", "summary_unassigned"],
        ["Critical Open", openRows.filter(isCriticalOpen).length, "Critical open work needing manager attention.", "summary_critical"],
        ["Stale 7d+", openRows.filter(isStaleOpen).length, "Open work older than 7 days.", "summary_stale"],
        ["Follow-up Needed", openRows.filter(needsFollowUp).length, "Open work marked for follow-up.", "summary_follow_up"],
        ["Completed Week", counts.completedWeek ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length, "Work completed in the last 7 days.", "summary_completed_week"],
        ["Completed Month", counts.completedMonth ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30))).length, "Work completed in the last 30 days.", "summary_completed_month"],
        ["Converted Requests", requestCounts.converted ?? convertedRequests().length, "Requests already turned into work orders.", "summary_converted_requests"],
        ["Stale Requests", staleRequests, "Submitted requests older than 2 days.", "summary_stale_requests"],
        ["7d Completion Rate", `${managerCompletionRate()}%`, "Completed this week compared with current open work.", "summary_completion_rate"],
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
            critical: assigned.filter(isCriticalOpen).length,
            followUp: assigned.filter(needsFollowUp).length,
            completedWeek: completed.filter((workOrder) => isCompletedSince(workOrder, weekCutoff)).length,
            completedMonth: completed.filter((workOrder) => isCompletedSince(workOrder, monthCutoff)).length,
            averageAge: averageAgeDays(assigned),
            latestActivity: shortDateTime(latest),
          };
        })
        .map((row) => {
          const level = overloadLevel(row);
          return { ...row, overloadLevel: level, overloadLabel: overloadLabel(level) };
        })
        .sort((a, b) => ({ high: 2, watch: 1, normal: 0 }[b.overloadLevel] - { high: 2, watch: 1, normal: 0 }[a.overloadLevel]) || b.open - a.open || b.overdue - a.overdue || a.name.localeCompare(b.name));
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
        <article class="manager-tech-row workload-${deps.escapeHtml(row.overloadLevel)}${row.userId === activeUserId ? " selected" : ""}">
          <button type="button" class="manager-tech-person manager-drill-button${activeClass("open")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="open">
            <strong>${deps.escapeHtml(row.name)}</strong>
            <span>${deps.escapeHtml(row.role)} - ${deps.escapeHtml(row.overloadLabel)}</span>
          </button>
          <button type="button" class="manager-drill-button${activeClass("open")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="open"><span>Open</span><strong>${row.open}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("in_progress")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="in_progress"><span>In Progress</span><strong>${row.inProgress}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("blocked")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="blocked"><span>Blocked</span><strong>${row.blocked}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("overdue")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="overdue"><span>Overdue</span><strong>${row.overdue}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("critical")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="critical"><span>Critical</span><strong>${row.critical}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("follow_up")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="follow_up"><span>Follow-up</span><strong>${row.followUp}</strong></button>
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
      const assignedLabel = workOrder.assigned_to ? deps.teamMemberName(workOrder.assigned_to) : "Unassigned";
      const ageLabel = workOrder.status === "completed" ? "completed" : `${ageDays(workOrder)}d open`;
      const completionLabel = workOrder.status === "completed" ? ` - Completed by ${completedOwnerLabel(workOrder)}${workOrder.completed_at ? ` on ${formatDate(workOrder.completed_at)}` : ""}` : "";
      return `
        <article class="mini-work-order manager-drill-work-order" data-mini-work-order="${deps.escapeHtml(workOrder.id)}">
          <strong>${deps.escapeHtml(workOrderTitle(workOrder))}</strong>
          <span>${deps.escapeHtml(deps.statusLabel ? deps.statusLabel(workOrder.status) : workOrder.status || "Open")} - ${deps.escapeHtml(workOrder.priority || "medium")} - ${deps.escapeHtml(assignedLabel)}</span>
          <small>${deps.escapeHtml(dueLabel)} - ${deps.escapeHtml(ageLabel)} - Created ${deps.escapeHtml(formatDate(workOrder.created_at))}${workOrder.follow_up_needed ? " - follow-up" : ""}${deps.escapeHtml(completionLabel)}</small>
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
      const converted = deps.isConvertedRequest(request);
      const ageLabel = `${requestAgeDays(request)}d old`;
      return `
        <article class="mini-work-order manager-drill-request" data-manager-request-jump="${deps.escapeHtml(converted ? "converted" : "active")}">
          <strong>${deps.escapeHtml(requestTitle(request))}</strong>
          <span>${deps.escapeHtml(request.priority || "Medium")} priority - ${deps.escapeHtml(converted ? "converted" : "submitted")}</span>
          <small>${deps.escapeHtml(requestEquipmentLabel(request))} - ${deps.escapeHtml(requestRequester(request))} - ${deps.escapeHtml(formatDate(request.created_at))} - ${deps.escapeHtml(ageLabel)}${converted ? ` - ${deps.escapeHtml(requestConvertedByLabel(request))}` : ""}</small>
        </article>
      `;
    }

    function renderManagerDrillIn(rows) {
      const userId = selectedUserId();
      if (!userId) return "";
      const metric = selectedMetric();
      if (userId === summaryUserId) {
        const requestMetric = metric === "summary_requests" || metric === "summary_converted_requests" || metric === "summary_stale_requests";
        const rateMetric = metric === "summary_completion_rate";
        const workRows = requestMetric ? [] : summaryWorkOrders(metric);
        const requestRows = requestMetric ? summaryRequests(metric) : [];
        const itemCount = rateMetric ? 1 : (requestMetric ? requestRows.length : workRows.length);
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
              ${rateMetric ? renderCompletionRateDetail() : (requestMetric ? requestRows.map(renderDrillRequest).join("") : workRows.map(renderDrillWorkOrder).join(""))}
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

    function managerAttentionItems() {
      const openRows = openWorkOrders();
      const items = [
        ["Critical Open", openRows.filter(isCriticalOpen), "summary_critical"],
        ["Stale 7d+", openRows.filter(isStaleOpen), "summary_stale"],
        ["Follow-up Needed", openRows.filter(needsFollowUp), "summary_follow_up"],
        ["New Requests", activeRequests(), "summary_requests"],
        ["Stale Requests", activeRequests().filter(isStaleRequest), "summary_stale_requests"],
        ["Unassigned", openRows.filter((workOrder) => !workOrder.assigned_to), "summary_unassigned"],
      ];
      return items
        .map(([label, rows, metric]) => ({ label, count: rows.length, metric }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
    }

    function renderCompletionRateDetail() {
      const completedWeek = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length;
      const currentOpen = openWorkOrders().length;
      return `
        <article class="manager-report-card">
          <strong>${managerCompletionRate()}%</strong>
          <span>${completedWeek} completed in 7 days against ${currentOpen} currently open.</span>
          <small>Use this as a manager signal, not a productivity score. It depends on work mix, staffing, and request volume.</small>
        </article>
      `;
    }

    function renderManagerTrendBoard() {
      const completed7 = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length;
      const completed30 = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30))).length;
      const requestAges = activeRequests().map(requestAgeDays);
      const avgRequestAge = requestAges.length ? Math.round(requestAges.reduce((sum, value) => sum + value, 0) / requestAges.length) : 0;
      const overloaded = technicianRows().filter((row) => row.overloadLevel !== "normal").length;
      return `
        <section class="manager-trend-panel relationship-detail asset">
          <div class="panel-header compact">
            <h3>Manager Trends</h3>
            <span>Loaded snapshot</span>
          </div>
          <div class="manager-trend-grid">
            <article><strong>${completed7}</strong><span>Completed 7d</span></article>
            <article><strong>${completed30}</strong><span>Completed 30d</span></article>
            <article><strong>${avgRequestAge}d</strong><span>Avg request age</span></article>
            <article><strong>${overloaded}</strong><span>Workloads to review</span></article>
          </div>
        </section>
      `;
    }

    function renderManagerReportBoard() {
      return `
        <section class="manager-report-panel relationship-detail procedure">
          <div class="panel-header compact">
            <h3>Manager Report</h3>
            <span>Use Export CSV from this screen for the current loaded data.</span>
          </div>
          <div class="manager-report-grid">
            <article><strong>Focus</strong><span>Critical, stale, follow-up, unassigned, and request intake are the first review path.</span></article>
            <article><strong>Action</strong><span>Click work rows to open the work order. Click request rows to jump to the request queue.</span></article>
            <article><strong>Limit</strong><span>Metrics are a live operational snapshot, not payroll or performance discipline.</span></article>
          </div>
        </section>
      `;
    }

    function renderManagerAttentionBoard() {
      const items = managerAttentionItems();
      return `
        <section class="manager-attention-panel relationship-detail warning">
          <div class="panel-header compact">
            <h3>Manager Attention</h3>
            <span>Review first</span>
          </div>
          <div class="manager-attention-list">
            ${items.map((item) => `
              <button type="button" class="manager-attention-card ${item.count ? "" : "empty"}" data-manager-drill-user="${summaryUserId}" data-manager-drill-metric="${deps.escapeHtml(item.metric)}">
                <span>${deps.escapeHtml(item.label)}</span>
                <strong>${item.count}</strong>
              </button>
            `).join("")}
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
          ${renderManagerAttentionBoard()}
          ${renderManagerTrendBoard()}
          <section class="manager-tech-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Technician Workload</h3>
              <span>${rows.length} people</span>
            </div>
            <div class="manager-tech-list">
              ${rows.map(renderTechnicianRow).join("") || `<p class="muted">No team members loaded yet.</p>`}
            </div>
          </section>
          ${renderManagerReportBoard()}
          ${renderManagerDrillIn(rows)}
        </section>
      `;
    }

    return {
      renderManagerDashboard,
      metricWorkOrders,
      managerAttentionItems,
      managerSummaryCards,
      managerCompletionRate,
      technicianRows,
    };
  }

  window.MaintainOpsManagerDashboardDisplay = {
    createManagerDashboardDisplayHelpers,
  };
})();
