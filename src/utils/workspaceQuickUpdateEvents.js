(function () {
  /*
   * LFES contract: owns Work Order Quick Update form submit binding only.
   * Requires an app.js-owned submit callback.
   * Must not update work orders, create equipment, record activity, render, touch Supabase/RLS, or own work-order data.
   */
  function bindWorkspaceQuickUpdateEvents(options = {}) {
    const doc = options.documentRef || document;
    const updateWorkOrderQuickView = options.updateWorkOrderQuickView;
    const form = doc.querySelector("#quick-update-work-order-form");

    if (!form || typeof updateWorkOrderQuickView !== "function") return;

    form.addEventListener("submit", updateWorkOrderQuickView);
  }

  window.MaintainOpsWorkspaceQuickUpdateEvents = {
    bindWorkspaceQuickUpdateEvents,
  };
})();
