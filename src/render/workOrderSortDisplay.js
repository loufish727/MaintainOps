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

    function assigneeSortLabel(workOrder) {
      if (typeof deps.assignmentLabel === "function") {
        return deps.assignmentLabel(workOrder);
      }
      return workOrder.assigned_profile?.full_name || workOrder.assigned_to || "Unassigned";
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

      if (deps.getWorkSort() === "assigned") {
        return assigneeSortLabel(a).localeCompare(assigneeSortLabel(b)) || new Date(b.created_at) - new Date(a.created_at);
      }

      return new Date(b.created_at) - new Date(a.created_at);
    }

    return {
      compareWorkOrders,
      dueSortValue,
      prioritySortValue,
      completedSortValue,
      assigneeSortLabel,
    };
  }

  window.MaintainOpsWorkOrderSortDisplay = {
    createWorkOrderSortDisplayHelpers,
  };
})();
