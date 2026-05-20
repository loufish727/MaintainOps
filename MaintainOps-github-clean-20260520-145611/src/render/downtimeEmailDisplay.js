(function () {
  function createDowntimeEmailDisplayHelpers(deps) {
    function assetNameForWorkOrder(workOrder) {
      return workOrder.assets?.name || "Equipment";
    }

    function downtimeEmailSubject(workOrder) {
      return `Machine Down Update - ${assetNameForWorkOrder(workOrder)} - ${new Date().toLocaleString()}`;
    }

    function downtimeEmailBody(workOrder) {
      const assetName = assetNameForWorkOrder(workOrder);
      const eta = workOrder.due_at ? `known, target ${deps.formatDate(workOrder.due_at)}` : "unknown at this time";
      const assignedTo = deps.assignmentLabel(workOrder);
      const issue = deps.cleanWorkOrderDescription(workOrder.description) || workOrder.title;
      const currentUpdate = workOrder.resolution_summary || workOrder.failure_cause || workOrder.completion_notes || "No additional update has been entered yet.";

      return [
        `${assetName} is down or needs maintenance attention. At this time, the expected downtime is ${eta}. We will update the team as more information becomes available.`,
        "",
        "Technical details:",
        `Issue: ${issue}`,
        `Work order: ${workOrder.title}`,
        `Equipment: ${assetName}`,
        `Current update: ${currentUpdate}`,
        `Assigned to: ${assignedTo}`,
        `Priority: ${workOrder.priority || "medium"}`,
        `ETA / due date: ${workOrder.due_at ? deps.formatDate(workOrder.due_at) : "Unknown"}`,
      ].join("\n");
    }

    return {
      downtimeEmailSubject,
      downtimeEmailBody,
    };
  }

  window.MaintainOpsDowntimeEmailDisplay = {
    createDowntimeEmailDisplayHelpers,
  };
})();
