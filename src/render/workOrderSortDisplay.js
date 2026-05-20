(function () {
  function createWorkOrderSortDisplayHelpers(deps) {
    function dueSortValue(workOrder) {
      if (!workOrder.due_at) return Number.MAX_SAFE_INTEGER;
      return new Date(`${workOrder.due_at}T00:00:00`).getTime();
    }

    function prioritySortValue(priority) {
      return { low: 1, medium: 2, high: 3, critical: 4 }[priority] || 0;
    }

    function completedSortValue(workOrder) {
      return workOrder.completed_at ? new Date(workOrder.completed_at).getTime() : 0;
    }

    function compareWorkOrders(a, b) {
      if (["completed", "completed_month", "completed_week"].includes(deps.getActiveStatusFilter())) {
        return completedSortValue(b) - completedSortValue(a) || new Date(b.created_at) - new Date(a.created_at);
      }

      if (deps.getWorkSort() === "due") {
        return dueSortValue(a) - dueSortValue(b) || new Date(b.created_at) - new Date(a.created_at);
      }

      if (deps.getWorkSort() === "priority") {
        return prioritySortValue(b.priority) - prioritySortValue(a.priority) || dueSortValue(a) - dueSortValue(b);
      }

      return new Date(b.created_at) - new Date(a.created_at);
    }

    return {
      compareWorkOrders,
      dueSortValue,
      prioritySortValue,
      completedSortValue,
    };
  }

  window.MaintainOpsWorkOrderSortDisplay = {
    createWorkOrderSortDisplayHelpers,
  };
})();
