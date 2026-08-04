(function () {
  function hasProductionAction(workOrder) {
    return Boolean(String(workOrder?.production_action || "").trim());
  }

  function hasOpenProductionAction(workOrder) {
    return hasProductionAction(workOrder) && workOrder?.production_action_status === "open";
  }

  function isWorkOrderAssignedToUser(workOrder, userId) {
    if (!workOrder || !userId) return false;
    return workOrder.assigned_to === userId
      || (hasOpenProductionAction(workOrder) && workOrder.production_action_assigned_to === userId);
  }

  function productionActionCompletionMessage(workOrder) {
    if (!hasOpenProductionAction(workOrder)) return "";
    return "Complete or remove the open Production Action before completing this work order.";
  }

  window.MaintainOpsProductionAction = Object.freeze({
    hasProductionAction,
    hasOpenProductionAction,
    isWorkOrderAssignedToUser,
    productionActionCompletionMessage,
  });

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      hasProductionAction,
      hasOpenProductionAction,
      isWorkOrderAssignedToUser,
      productionActionCompletionMessage,
    };
  }
})();
