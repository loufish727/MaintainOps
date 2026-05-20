(function () {
  function createRequestQueueDisplayHelpers(deps) {
    function openMaintenanceRequests() {
      return deps.getMaintenanceRequests().filter((request) => request.status === "submitted");
    }

    return {
      openMaintenanceRequests,
    };
  }

  window.MaintainOpsRequestQueueDisplay = {
    createRequestQueueDisplayHelpers,
  };
})();
