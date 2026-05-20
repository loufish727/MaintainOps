(function () {
  function createWorkOrderStatusFilterDisplayHelpers(deps) {
    function workOrderMatchesStatusFilter(workOrder) {
      const activeStatusFilter = deps.getActiveStatusFilter();
      if (activeStatusFilter === "overdue") return deps.getDueState(workOrder)?.className === "overdue";
      if (activeStatusFilter === "completed_month") return deps.isCompletedThisMonth(workOrder);
      if (activeStatusFilter === "completed_week") return deps.isCompletedThisWeek(workOrder);
      if (activeStatusFilter === "active" || activeStatusFilter === "all") return workOrder.status !== "completed";
      return workOrder.status === activeStatusFilter;
    }

    return {
      workOrderMatchesStatusFilter,
    };
  }

  window.MaintainOpsWorkOrderStatusFilterDisplay = {
    createWorkOrderStatusFilterDisplayHelpers,
  };
})();
