(function () {
  function createEmptyStateTextHelpers({
    getSearchQuery,
    getAssetStatusFilter,
    getPartSearchQuery,
    getPartInventoryFilter,
    assetStatusLabel,
  }) {
    function requestEmptyStateText(filter) {
      if (getSearchQuery().trim()) return "No requests match this search.";
      if (filter === "converted") return "No converted requests at this location.";
      if (filter === "all") return "No requests at this location yet.";
      return "No active requests waiting for review.";
    }

    function assetEmptyStateText() {
      const assetStatusFilter = getAssetStatusFilter();
      if (getSearchQuery().trim()) return "No equipment matches this search.";
      if (assetStatusFilter !== "all") return `No ${assetStatusLabel(assetStatusFilter).toLowerCase()} equipment found.`;
      return "No equipment added yet.";
    }

    function partEmptyStateText() {
      if (getPartSearchQuery().trim()) return "No parts match this search.";
      if (getPartInventoryFilter() === "low") return "No low stock parts right now.";
      return "No parts added yet.";
    }

    return {
      requestEmptyStateText,
      assetEmptyStateText,
      partEmptyStateText,
    };
  }

  window.MaintainOpsEmptyStateText = {
    createEmptyStateTextHelpers,
  };
})();
