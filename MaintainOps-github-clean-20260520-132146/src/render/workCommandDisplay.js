(function () {
  function createWorkCommandDisplayHelpers({
    escapeHtml,
    statusLabel,
    assignmentLabel,
    isVendorAssigned,
    hasCompletedSafetyDeviceCheck,
    renderEmailHelperCommandCard,
    getMessageThreads,
    getPartsUsedByWorkOrder,
  }) {
    function renderWorkOrderCommandSummary(workOrder) {
      const linkedMessages = getMessageThreads().filter((thread) => thread.work_order_id === workOrder.id).length;
      const partsCount = (getPartsUsedByWorkOrder()[workOrder.id] || []).reduce((sum, row) => sum + (Number(row.quantity_used) || 0), 0);
      const safetyState = !workOrder.asset_id
        ? ["General", "No equipment safety check required", "neutral"]
        : hasCompletedSafetyDeviceCheck(workOrder)
          ? ["Checked", "Safety devices confirmed", "safe"]
          : ["Required", "Check E-stops, sensors, guards, and interlocks before completion", "danger"];
      const nextAction = workOrder.status === "completed"
        ? "Review history or create follow-up if needed"
        : workOrder.status === "blocked"
          ? "Resolve blocker or add current update"
          : workOrder.status === "in_progress"
            ? "Add update, parts, photos, or complete work"
            : "Assign owner or start work";

      return `
        <section class="work-command-summary">
          <button class="command-card status-${workOrder.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${statusLabel(workOrder.status)}</strong>
            <small>${escapeHtml(nextAction)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${escapeHtml(workOrder.assets?.name || "General item / area")}</strong>
            <small>${escapeHtml(workOrder.due_at ? `Due ${workOrder.due_at}` : "Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${escapeHtml(assignmentLabel(workOrder))}</strong>
            <small>${isVendorAssigned(workOrder) ? "Outside vendor" : "Internal assignment"}</small>
          </button>
          <button class="command-card safety-${safetyState[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${safetyState[0]}</strong>
            <small>${escapeHtml(safetyState[1])}</small>
          </button>
          ${renderEmailHelperCommandCard(workOrder)}
        </section>
      `;
    }

    return {
      renderWorkOrderCommandSummary,
    };
  }

  window.MaintainOpsWorkCommandDisplay = {
    createWorkCommandDisplayHelpers,
  };
})();
