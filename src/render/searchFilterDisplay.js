(function () {
  function createSearchFilterDisplayHelpers(deps) {
    function matchesSearch(values) {
      const query = deps.getSearchQuery().trim().toLowerCase();
      if (!query) return true;
      return values.some((value) => String(value ?? "").toLowerCase().includes(query));
    }

    function matchesQuery(values, query = deps.getSearchQuery()) {
      const normalized = query.trim().toLowerCase();
      if (!normalized) return true;
      return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
    }

    return {
      matchesSearch,
      matchesQuery,
    };
  }

  window.MaintainOpsSearchFilterDisplay = {
    createSearchFilterDisplayHelpers,
  };
})();
