(function () {
  function createRequestQueueDisplayHelpers(deps) {
    function openMaintenanceRequests() {
      return deps.getMaintenanceRequests().filter((request) => request.status === "submitted");
    }

    function requestMatchesBaseFilters(request) {
      return deps.matchesActiveLocation(request) && deps.matchesSearch([
        request.title,
        request.description,
        request.status,
        request.priority,
        request.assets?.name,
        deps.getProfilesByUserId()[request.requested_by]?.full_name,
      ]);
    }

    function isConvertedRequest(request) {
      return request.status === "converted" || Boolean(request.converted_work_order_id);
    }

    function requestMatchesViewFilter(request, filter = deps.getRequestViewFilter()) {
      if (filter === "converted") return isConvertedRequest(request);
      if (filter === "all") return true;
      return !isConvertedRequest(request) && request.status === "submitted";
    }

    function filteredRequests(filter = deps.getRequestViewFilter()) {
      return deps.getMaintenanceRequests().filter((request) => requestMatchesBaseFilters(request) && requestMatchesViewFilter(request, filter));
    }

    function requestFilterCounts() {
      return deps.getRequestDashboardCounts() || { active: 0, converted: 0, all: 0 };
    }

    return {
      openMaintenanceRequests,
      requestMatchesBaseFilters,
      isConvertedRequest,
      requestMatchesViewFilter,
      filteredRequests,
      requestFilterCounts,
    };
  }

  window.MaintainOpsRequestQueueDisplay = {
    createRequestQueueDisplayHelpers,
  };
})();
