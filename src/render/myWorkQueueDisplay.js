(function () {
  function createMyWorkQueueDisplayHelpers(deps) {
    function myWorkQueueOrders() {
      const currentUserId = deps.getCurrentUser()?.id;
      return deps.getWorkOrders().filter((workOrder) => {
        if (!deps.matchesActiveLocation(workOrder)) return false;
        const queueMatch = deps.getMyWorkFilter() === "created"
          ? workOrder.created_by === currentUserId
          : workOrder.assigned_to === currentUserId;
        return queueMatch && deps.matchesSearch(deps.workOrderSearchValues(workOrder));
      });
    }

    return {
      myWorkQueueOrders,
    };
  }

  window.MaintainOpsMyWorkQueueDisplay = {
    createMyWorkQueueDisplayHelpers,
  };
})();
