(function () {
  function createMiniWorkOrderDisplayHelpers({
    escapeHtml,
    statusLabel,
    relationshipIcon,
    getPartsUsedByWorkOrder,
    getPhotosByWorkOrder,
    teamMemberName,
  }) {
    function renderMiniWorkOrder(workOrder) {
      return `
        <article class="mini-work-order" data-mini-work-order="${workOrder.id}">
          <strong>${escapeHtml(workOrder.title)}</strong>
          <span>${statusLabel(workOrder.status)} - ${workOrder.due_at || "no due date"}</span>
        </article>
      `;
    }

    function renderAssetMiniWorkOrder(workOrder) {
      const partsCount = (getPartsUsedByWorkOrder()[workOrder.id] || []).length;
      const photosCount = (getPhotosByWorkOrder()[workOrder.id] || []).length;
      const completedDate = workOrder.completed_at ? new Date(workOrder.completed_at).toLocaleDateString() : "";
      const completedBy = workOrder.completed_by ? teamMemberName(workOrder.completed_by) : "";
      const ownerFallback = !completedBy && workOrder.assigned_to ? teamMemberName(workOrder.assigned_to) : "";
      const completedActorText = completedBy
        ? ` by ${escapeHtml(completedBy)}`
        : ownerFallback
          ? ` - owner ${escapeHtml(ownerFallback)}`
          : "";
      const outcome = workOrder.resolution_summary || workOrder.completion_notes || "";
      return `
        <article class="mini-work-order ${workOrder.status === "completed" ? "completed-history" : ""}" data-mini-work-order="${workOrder.id}">
          <div class="chip-row">
            <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
            ${workOrder.follow_up_needed ? `<span class="chip blocked">follow-up</span>` : ""}
            ${partsCount ? `<span class="relationship-chip parts">${relationshipIcon("parts")}<span>${partsCount}</span></span>` : ""}
            ${photosCount ? `<span class="relationship-chip photo">${relationshipIcon("photo")}<span>${photosCount}</span></span>` : ""}
          </div>
          <strong>${escapeHtml(workOrder.title)}</strong>
          <span>${completedDate ? `Completed ${completedDate}${completedActorText}` : `Due ${workOrder.due_at || "unset"}`}</span>
          ${workOrder.failure_cause ? `<p><b>Finding:</b> ${escapeHtml(workOrder.failure_cause)}</p>` : ""}
          ${outcome ? `<p><b>Resolution:</b> ${escapeHtml(outcome)}</p>` : ""}
        </article>
      `;
    }

    return {
      renderMiniWorkOrder,
      renderAssetMiniWorkOrder,
    };
  }

  window.MaintainOpsMiniWorkOrderDisplay = {
    createMiniWorkOrderDisplayHelpers,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createMiniWorkOrderDisplayHelpers };
  }
})();
