(function () {
  function createTeamWorkloadDisplayHelpers(deps) {
    function teamMemberWorkload(userId) {
      const workOrders = deps.getWorkOrders();
      const assigned = workOrders.filter((workOrder) => deps.matchesActiveLocation(workOrder) && deps.isWorkOrderAssignedToUser(workOrder, userId));
      return {
        newWork: assigned.filter((workOrder) => workOrder.status === "open").length,
        inProgress: assigned.filter((workOrder) => workOrder.status === "in_progress").length,
        blocked: assigned.filter((workOrder) => workOrder.status === "blocked").length,
        completed: assigned.filter((workOrder) => workOrder.status === "completed").length,
        overdue: assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length,
      };
    }

    return {
      teamMemberWorkload,
    };
  }

  window.MaintainOpsTeamWorkloadDisplay = {
    createTeamWorkloadDisplayHelpers,
  };
})();
