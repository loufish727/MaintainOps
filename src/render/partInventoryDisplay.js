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
      const rows = deps.getParts().filter((part) => {
        if (!deps.matchesActiveLocation(part)) return false;
        if (deps.getPartInventoryFilter() === "low" && !isLowStockPart(part)) return false;
        return matchesPartSearch([
          part.name,
          part.sku,
          part.supplier_name,
          part.machine_note,
          part.quantity_on_hand,
          part.reorder_point,
          part.unit_cost,
        ]);
      });
      if (deps.getPartSort && deps.getPartSort() === "source") {
        return [...rows].sort((a, b) => {
          const sourceCompare = String(a.supplier_name || "zzzzzz").localeCompare(String(b.supplier_name || "zzzzzz"), undefined, { sensitivity: "base" });
          if (sourceCompare) return sourceCompare;
          return String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base" });
        });
      }
      return rows;
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
