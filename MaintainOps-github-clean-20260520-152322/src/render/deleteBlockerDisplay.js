(function () {
  function createDeleteBlockerDisplayHelpers() {
    function assetDeleteBlockerMessage(blockers) {
      const parts = [
        blockers.workOrders ? `${blockers.workOrders} work order${blockers.workOrders === 1 ? "" : "s"}` : "",
        blockers.children ? `${blockers.children} linked equipment item${blockers.children === 1 ? "" : "s"}` : "",
        blockers.schedules ? `${blockers.schedules} PM schedule${blockers.schedules === 1 ? "" : "s"}` : "",
        blockers.requests ? `${blockers.requests} request${blockers.requests === 1 ? "" : "s"}` : "",
      ].filter(Boolean);
      return parts.length
        ? `This equipment is kept for traceability because it has ${parts.join(", ")}.`
        : "";
    }

    function procedureDeleteBlockerMessage(blockers) {
      const parts = [
        blockers.workOrders ? `${blockers.workOrders} work order${blockers.workOrders === 1 ? "" : "s"}` : "",
        blockers.schedules ? `${blockers.schedules} PM schedule${blockers.schedules === 1 ? "" : "s"}` : "",
      ].filter(Boolean);
      return parts.length
        ? `This procedure is kept for traceability because it is linked to ${parts.join(", ")}.`
        : "";
    }

    return {
      assetDeleteBlockerMessage,
      procedureDeleteBlockerMessage,
    };
  }

  window.MaintainOpsDeleteBlockerDisplay = {
    createDeleteBlockerDisplayHelpers,
  };
})();
