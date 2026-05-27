(function () {
  /*
   * Module contract: owns Full Work Order Details submit binding only.
   * Requires an app.js-owned submit callback.
   * Must not update work orders, record activity, render, touch Supabase/RLS, or own work-order data.
   */
  function bindWorkspaceWorkOrderEditEvents(options = {}) {
    const doc = options.documentRef || document;
    const updateWorkOrderDetails = options.updateWorkOrderDetails;
    const form = doc.querySelector("#edit-work-order-form");

    if (!form || typeof updateWorkOrderDetails !== "function") return;

    form.addEventListener("submit", updateWorkOrderDetails);
  }

  window.MaintainOpsWorkspaceWorkOrderEditEvents = {
    bindWorkspaceWorkOrderEditEvents,
  };
})();
