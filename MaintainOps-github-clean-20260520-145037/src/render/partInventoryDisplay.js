(function () {
  function createPartInventoryDisplayHelpers(deps) {
    function isLowStockPart(part) {
      return Number(part.quantity_on_hand) <= Number(part.reorder_point);
    }

    function lowStockParts() {
      return deps.getParts().filter(isLowStockPart);
    }

    return {
      isLowStockPart,
      lowStockParts,
    };
  }

  window.MaintainOpsPartInventoryDisplay = {
    createPartInventoryDisplayHelpers,
  };
})();
