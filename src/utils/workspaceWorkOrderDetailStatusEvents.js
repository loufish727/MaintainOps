(function () {
  /*
   * Module contract: binds the Work Order Detail status dropdown only.
   * Requires app.js-owned updateWorkOrderStatus callback.
   * May attach a change listener to #status-select.
   * Must not own status mutation logic, quick status buttons, assignment,
   * delete, completion, Supabase/RLS, auth/startup, or app.js state.
   */
  function bindWorkspaceWorkOrderDetailStatusEvents(options = {}) {
    const doc = options.documentRef || document;
    const statusSelect = doc.querySelector("#status-select");
    if (statusSelect) statusSelect.addEventListener("change", options.updateWorkOrderStatus);
  }

  window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents = {
    bindWorkspaceWorkOrderDetailStatusEvents,
  };
})();
