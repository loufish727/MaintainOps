(function () {
  function createWorkQueueDisplayHelpers({
    statusLabel,
    teamMemberName,
    getWorkOrderAssigneeFilter,
    getWorkOrderFilter,
    getActiveStatusFilter,
    getMyWorkFilter,
    getActiveSection,
    getDueState,
    getProcedureTemplates,
    getActiveWorkOrderId,
    getProfilesByUserId,
    getSession,
    STATUS_OPTIONS,
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
              : "All Work Orders";
      if (activeStatusFilter === "active" || activeStatusFilter === "all") return baseTitle;
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

    function renderWorkOrderCard(workOrder) {
      const dueState = getDueState(workOrder);
      const procedure = getProcedureTemplates().find((template) => template.id === workOrder.procedure_template_id);
      const createdDate = workOrder.created_at ? new Date(workOrder.created_at) : null;
      const createdLabel = createdDate && !Number.isNaN(createdDate.getTime()) ? createdDate.toLocaleDateString() : "";
      return `
        <article class="work-card status-card status-${workOrder.status} ${workOrder.id === getActiveWorkOrderId() ? "selected" : ""}" data-id="${workOrder.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
              <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
              <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
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
            ${canAssignWorkOrderToMe(workOrder) ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">Assign to me</button>` : ""}
            ${canManageTeam() ? renderCardAssignmentControl(workOrder) : ""}
          ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).slice(0, 3).map((status) => `
            <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
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
