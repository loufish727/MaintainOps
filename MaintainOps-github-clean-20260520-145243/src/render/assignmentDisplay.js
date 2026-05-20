(function () {
  function createAssignmentDisplayHelpers(deps) {
    function assignmentLabel(workOrder) {
      if (deps.isVendorAssigned(workOrder)) return "Outside vendor";
      return workOrder.assigned_profile?.full_name || "Unassigned";
    }

    return {
      assignmentLabel,
    };
  }

  window.MaintainOpsAssignmentDisplay = {
    createAssignmentDisplayHelpers,
  };
})();
