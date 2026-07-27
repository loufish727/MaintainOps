(function () {
  function createWorkQueueDisplayHelpers({
    statusLabel,
    workOrderTypeLabel = (type) => String(type || "corrective").replace(/\b\w/g, (letter) => letter.toUpperCase()),
    teamMemberName,
    getWorkOrderAssigneeFilter,
    getWorkOrderFilter,
    getWorkOrderTypeFilter = () => "all",
    getWorkOrderPriorityFilter = () => "all",
    getWorkSort = () => "newest",
    getWorkGroup = () => "none",
    getActiveStatusFilter,
    getMyWorkFilter,
    getActiveSection,
    getDueState,
    getProcedureTemplates,
    getActiveWorkOrderId,
    getProfilesByUserId,
    getSession,
    STATUS_OPTIONS,
    TYPE_OPTIONS = [],
    OUTSIDE_VENDOR_VALUE,
    escapeHtml,
    cleanWorkOrderDescription,
    relationshipIcon,
    segmentIcon,
    isVendorAssigned,
    assignmentLabel,
    renderRelationshipChips,
    canAssignWorkOrderToMe,
    canManageTeam,
  }) {
    function workOrdersPanelTitle() {
      const workOrderAssigneeFilter = getWorkOrderAssigneeFilter();
      const workOrderFilter = getWorkOrderFilter();
      const activeStatusFilter = getActiveStatusFilter();
      const baseTitle = workOrderAssigneeFilter
        ? `${teamMemberName(workOrderAssigneeFilter)} Work`
        : workOrderFilter === "unassigned"
          ? "Unassigned Work Orders"
          : workOrderFilter === "vendor"
            ? "Outside Vendor Work"
            : workOrderFilter === "assigned"
              ? "Assigned Work Orders"
              : "Work Orders";
      if (activeStatusFilter === "active" || activeStatusFilter === "all") {
        return baseTitle === "Work Orders" ? "Active Work Orders" : `Active - ${baseTitle}`;
      }
      return `${statusLabel(activeStatusFilter)} - ${baseTitle}`;
    }

    function myWorkPanelTitle() {
      const activeStatusFilter = getActiveStatusFilter();
      if (activeStatusFilter === "active" || activeStatusFilter === "all") return "My Work";
      return `${statusLabel(activeStatusFilter)} - My Work`;
    }

    function workQueuePanelTitle() {
      return getActiveSection() === "mywork" ? myWorkPanelTitle() : workOrdersPanelTitle();
    }

    function workQueuePanelSubtitle(count) {
      const activeSection = getActiveSection();
      const myWorkFilter = getMyWorkFilter();
      const context = activeSection === "mywork"
        ? (myWorkFilter === "created" ? "Created By Me" : "Assigned To Me")
        : "shown";
      return activeSection === "mywork" ? `${count} shown - ${context}` : `${count} shown`;
    }

    function optionMarkup(value, label, selectedValue) {
      return `<option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }

    function assignmentFilterLabel(value) {
      return {
        all: "Any assignment",
        assigned: "Team member",
        vendor: "Outside vendor",
        unassigned: "Unassigned",
      }[value] || "Any assignment";
    }

    function priorityLabel(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    }

    function renderWorkOrderFilterToolbar(members = []) {
      const activeStatusFilter = getActiveStatusFilter();
      const displayedStatusFilter = activeStatusFilter === "all" ? "active" : activeStatusFilter;
      const workOrderFilter = getWorkOrderFilter();
      const workOrderAssigneeFilter = getWorkOrderAssigneeFilter();
      const workOrderTypeFilter = getWorkOrderTypeFilter();
      const workOrderPriorityFilter = getWorkOrderPriorityFilter();
      const workSort = getWorkSort();
      const workGroup = getWorkGroup();
      const completedView = ["completed", "completed_month", "completed_week"].includes(activeStatusFilter);
      const filtersAreDefault = displayedStatusFilter === "active"
        && workOrderFilter === "all"
        && !workOrderAssigneeFilter
        && workOrderTypeFilter === "all"
        && workOrderPriorityFilter === "all"
        && workSort === "newest"
        && workGroup === "none";
      const currentAssignee = members.find((member) => member.userId === workOrderAssigneeFilter);
      const trail = [
        `Status: ${statusLabel(displayedStatusFilter)}`,
        `Assignment: ${assignmentFilterLabel(workOrderFilter)}`,
        ...(currentAssignee ? [`Person: ${currentAssignee.name}`] : []),
        ...(workOrderTypeFilter !== "all" ? [`Type: ${workOrderTypeLabel(workOrderTypeFilter)}`] : []),
        ...(workOrderPriorityFilter !== "all" ? [`Priority: ${priorityLabel(workOrderPriorityFilter)}`] : []),
      ];
      const statusOptions = [
        ["active", "Active work"],
        ["open", "New"],
        ["in_progress", "In progress"],
        ["blocked", "Blocked"],
        ["overdue", "Overdue"],
        ["completed", "All completed"],
        ["completed_month", "Completed this month"],
        ["completed_week", "Completed this week"],
      ];
      const assignmentOptions = [
        ["all", "Any assignment"],
        ["assigned", "Team member"],
        ["vendor", "Outside vendor"],
        ["unassigned", "Unassigned"],
      ];
      const sortOptions = [
        ["newest", "Recently created"],
        ["due", "Due date soonest"],
        ["priority", "Highest priority"],
        ["type", "Work type A-Z"],
        ["assigned", "Assigned person A-Z"],
      ];
      const groupOptions = [
        ["none", "No grouping"],
        ["assignee", "Assigned person"],
        ["status", "Status"],
        ["priority", "Priority"],
        ["type", "Work type"],
      ];

      return `
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${trail.map((item) => `<li><span>${escapeHtml(item)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${filtersAreDefault ? "disabled" : ""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${displayedStatusFilter !== "active" ? "is-active" : ""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${statusOptions.map(([value, label]) => optionMarkup(value, label, displayedStatusFilter)).join("")}
                </select>
              </label>
              <label class="work-control-field ${workOrderFilter !== "all" ? "is-active" : ""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${assignmentOptions.map(([value, label]) => optionMarkup(value, label, workOrderFilter)).join("")}
                </select>
              </label>
              <label class="work-control-field ${workOrderAssigneeFilter ? "is-active" : ""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${optionMarkup("", "Any team member", workOrderAssigneeFilter)}
                  ${members.map((member) => optionMarkup(member.userId, member.name, workOrderAssigneeFilter)).join("")}
                </select>
              </label>
              <label class="work-control-field ${workOrderTypeFilter !== "all" ? "is-active" : ""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${optionMarkup("all", "Any type", workOrderTypeFilter)}
                  ${TYPE_OPTIONS.map((type) => optionMarkup(type, workOrderTypeLabel(type), workOrderTypeFilter)).join("")}
                </select>
              </label>
              <label class="work-control-field ${workOrderPriorityFilter !== "all" ? "is-active" : ""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${optionMarkup("all", "Any priority", workOrderPriorityFilter)}
                  ${["critical", "high", "medium", "low"].map((priority) => optionMarkup(priority, priorityLabel(priority), workOrderPriorityFilter)).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="work-control-section arrange-controls">
            <span class="work-control-section-title">Arrange by</span>
            <div class="work-control-fields">
              <label class="work-control-field">
                <span>Sort</span>
                <select data-work-sort-filter aria-label="Sort work orders" ${completedView ? "disabled" : ""}>
                  ${completedView
                    ? optionMarkup("completed", "Recently completed", "completed")
                    : sortOptions.map(([value, label]) => optionMarkup(value, label, workSort)).join("")}
                </select>
              </label>
              <label class="work-control-field ${workGroup !== "none" ? "is-active" : ""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${groupOptions.map(([value, label]) => optionMarkup(value, label, workGroup)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `;
    }

    function workOrderGroupDescriptor(workOrder, groupBy) {
      if (groupBy === "assignee") {
        if (isVendorAssigned(workOrder)) return { key: "vendor", label: "Outside vendor", order: 900 };
        if (!workOrder.assigned_to) return { key: "unassigned", label: "Unassigned", order: 901 };
        const label = assignmentLabel(workOrder);
        return { key: `assignee:${workOrder.assigned_to}`, label, order: 100 };
      }
      if (groupBy === "status") {
        const order = ["open", "in_progress", "blocked", "completed"].indexOf(workOrder.status);
        return { key: `status:${workOrder.status}`, label: statusLabel(workOrder.status), order: order < 0 ? 99 : order };
      }
      if (groupBy === "priority") {
        const order = ["critical", "high", "medium", "low"].indexOf(workOrder.priority);
        return { key: `priority:${workOrder.priority}`, label: priorityLabel(workOrder.priority || "Unspecified"), order: order < 0 ? 99 : order };
      }
      const type = workOrder.type || "corrective";
      const order = TYPE_OPTIONS.indexOf(type);
      return { key: `type:${type}`, label: workOrderTypeLabel(type), order: order < 0 ? 99 : order };
    }

    function renderWorkOrderCollection(workOrders, options = {}) {
      if (!workOrders.length) return `<p class="muted">No work orders match these filters.</p>`;
      const groupBy = options.groupBy || "none";
      if (groupBy === "none") {
        return `<div class="work-list" id="work-order-list">${workOrders.map(renderWorkOrderCard).join("")}</div>`;
      }

      const groups = new Map();
      workOrders.forEach((workOrder) => {
        const descriptor = workOrderGroupDescriptor(workOrder, groupBy);
        if (!groups.has(descriptor.key)) groups.set(descriptor.key, { ...descriptor, workOrders: [] });
        groups.get(descriptor.key).workOrders.push(workOrder);
      });
      const orderedGroups = [...groups.values()].sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
      return `
        <div class="work-order-groups" id="work-order-list">
          ${orderedGroups.map((group) => `
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${escapeHtml(group.label)}</h3>
                <span>${group.workOrders.length}</span>
              </div>
              <div class="work-list">${group.workOrders.map(renderWorkOrderCard).join("")}</div>
            </section>
          `).join("")}
        </div>
      `;
    }

    function renderWorkOrderCard(workOrder) {
      const dueState = getDueState(workOrder);
      const procedure = getProcedureTemplates().find((template) => template.id === workOrder.procedure_template_id);
      const createdDate = workOrder.created_at ? new Date(workOrder.created_at) : null;
      const createdLabel = createdDate && !Number.isNaN(createdDate.getTime()) ? createdDate.toLocaleDateString() : "";
      const isCompleted = workOrder.status === "completed";
      const statusChipLabel = isCompleted ? "Completed" : statusLabel(workOrder.status);
      const statusActionLabel = (status) => status === "completed" ? "Complete" : statusLabel(status);
      return `
        <article class="work-card status-card status-${workOrder.status} ${workOrder.id === getActiveWorkOrderId() ? "selected" : ""}" data-id="${workOrder.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
              <span class="chip">${escapeHtml(workOrderTypeLabel(workOrder.type))}</span>
              <span class="chip ${workOrder.status}">${statusChipLabel}</span>
              ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${escapeHtml(workOrder.title)}</h3>
            <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${relationshipIcon("asset")}${escapeHtml(workOrder.assets?.name || "General item / area")}</span>
            <span>${segmentIcon(isVendorAssigned(workOrder) ? "vendor" : "mine")}${escapeHtml(assignmentLabel(workOrder))}</span>
            ${procedure ? `<span>${relationshipIcon("procedure")}${escapeHtml(procedure.name)}</span>` : ""}
            <span>${segmentIcon("due")}Due ${workOrder.due_at || "unset"}</span>
            ${createdLabel ? `<span>${segmentIcon("created")}Created ${escapeHtml(createdLabel)}</span>` : ""}
            ${workOrder.completed_at ? `<span>${segmentIcon("completed")}Completed ${new Date(workOrder.completed_at).toLocaleDateString()}</span>` : ""}
          </div>
          ${renderRelationshipChips(workOrder)}
          <div class="quick-actions work-card-actions">
            ${!isCompleted && canAssignWorkOrderToMe(workOrder) ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">Assign to me</button>` : ""}
            ${!isCompleted && canManageTeam() ? renderCardAssignmentControl(workOrder) : ""}
          ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).slice(0, 3).map((status) => `
            <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusActionLabel(status)}</button>
          `).join("")}
        </div>
      </article>
    `;
    }

    function renderCardAssignmentControl(workOrder) {
      return `
        <form class="card-assign-form" data-card-assign="${workOrder.id}">
          <select name="assigned_to" aria-label="Assign ${escapeHtml(workOrder.title)}">
            <option value="">Unassigned</option>
            <option value="${OUTSIDE_VENDOR_VALUE}" ${isVendorAssigned(workOrder) ? "selected" : ""}>Outside vendor</option>
            ${Object.entries(getProfilesByUserId()).map(([userId, profile]) => `<option value="${userId}" ${!isVendorAssigned(workOrder) && userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || teamMemberName(userId))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `;
    }

    function renderAssignmentSelect(selectedValue = "", options = {}) {
      const selected = selectedValue || "";
      const allowManagerOptions = options.managerOptions ?? canManageTeam();
      const allowUnassigned = options.allowUnassigned !== false;
      const selfLabel = options.selfLabel || "Assign to me";
      const optionsHtml = [];
      if (allowUnassigned) {
        optionsHtml.push(`<option value="" ${selected === "" ? "selected" : ""}>Unassigned</option>`);
      }
      optionsHtml.push(`<option value="${getSession().user.id}" ${selected === getSession().user.id ? "selected" : ""}>${selfLabel}</option>`);
      if (allowManagerOptions) {
        optionsHtml.push(`<option value="${OUTSIDE_VENDOR_VALUE}" ${selected === OUTSIDE_VENDOR_VALUE ? "selected" : ""}>Outside vendor</option>`);
        optionsHtml.push(...Object.entries(getProfilesByUserId())
          .filter(([userId]) => userId !== getSession().user.id)
          .map(([userId, profile]) => `<option value="${userId}" ${selected === userId ? "selected" : ""}>${escapeHtml(profile.full_name || teamMemberName(userId))}</option>`));
      }
      return optionsHtml.join("");
    }

    function assignmentFormValue(workOrder) {
      if (isVendorAssigned(workOrder)) return OUTSIDE_VENDOR_VALUE;
      return workOrder?.assigned_to || "";
    }

    function renderWorkOrderAssignmentField(workOrder, id = "") {
      const currentValue = assignmentFormValue(workOrder);
      if (workOrder?.status === "completed") {
        return `
          <label ${id ? `id="${id}"` : ""}>Completed by / assigned to
            <input value="${escapeHtml(assignmentLabel(workOrder))}" disabled>
            <input name="assigned_to" type="hidden" value="${escapeHtml(currentValue)}">
          </label>
        `;
      }
      if (canManageTeam()) {
        return `
          <label ${id ? `id="${id}"` : ""}>Assign to
            <select name="assigned_to">
              ${renderAssignmentSelect(currentValue, { managerOptions: true })}
            </select>
          </label>
        `;
      }
      if (!workOrder.assigned_to && !isVendorAssigned(workOrder)) {
        return `
          <label ${id ? `id="${id}"` : ""}>Assign to
            <select name="assigned_to">
              ${renderAssignmentSelect("", { managerOptions: false, selfLabel: "Assign to me" })}
            </select>
          </label>
        `;
      }
      return `
        <label ${id ? `id="${id}"` : ""}>Assigned to
          <input value="${escapeHtml(assignmentLabel(workOrder))}" disabled>
          <input name="assigned_to" type="hidden" value="${escapeHtml(currentValue)}">
        </label>
      `;
    }

    return {
      workOrdersPanelTitle,
      myWorkPanelTitle,
      workQueuePanelTitle,
      workQueuePanelSubtitle,
      renderWorkOrderFilterToolbar,
      renderWorkOrderCollection,
      renderWorkOrderCard,
      renderCardAssignmentControl,
      renderAssignmentSelect,
      renderWorkOrderAssignmentField,
    };
  }

  window.MaintainOpsWorkQueueDisplay = {
    createWorkQueueDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createWorkQueueDisplayHelpers };
  }
})();
