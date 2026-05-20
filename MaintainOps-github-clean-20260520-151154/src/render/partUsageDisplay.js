(function () {
  function createPartUsageDisplayHelpers(deps) {
    function partUsageRows(partId) {
      return Object.values(deps.getPartsUsedByWorkOrder())
        .flat()
        .filter((row) => row.part_id === partId);
    }

    return {
      partUsageRows,
    };
  }

  window.MaintainOpsPartUsageDisplay = {
    createPartUsageDisplayHelpers,
  };
})();
