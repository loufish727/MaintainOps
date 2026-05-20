(function () {
  function createPartInventoryDisplayHelpers(deps) {
    function isLowStockPart(part) {
      return Number(part.quantity_on_hand) <= Number(part.reorder_point);
    }

    function lowStockParts() {
      return deps.getParts().filter(isLowStockPart);
    }

    function matchesPartSearch(values) {
      const query = deps.getPartSearchQuery().trim().toLowerCase();
      if (!query) return true;
      return values.some((value) => String(value ?? "").toLowerCase().includes(query));
    }

    function filteredParts() {
      return deps.getParts().filter((part) => {
        if (!deps.matchesActiveLocation(part)) return false;
        if (deps.getPartInventoryFilter() === "low" && !isLowStockPart(part)) return false;
        return matchesPartSearch([
          part.name,
          part.sku,
          part.supplier_name,
          part.quantity_on_hand,
          part.reorder_point,
          part.unit_cost,
        ]);
      });
    }

    function partSourceOptions() {
      return [...new Set(deps.getParts().filter(deps.matchesActiveLocation)
        .map((part) => String(part.supplier_name || "").trim())
        .filter(Boolean))]
        .sort((a, b) => a.localeCompare(b));
    }

    return {
      isLowStockPart,
      lowStockParts,
      filteredParts,
      matchesPartSearch,
      partSourceOptions,
    };
  }

  window.MaintainOpsPartInventoryDisplay = {
    createPartInventoryDisplayHelpers,
  };
})();
