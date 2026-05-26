(function () {
  /*
   * LFES contract: owns follow-up Create Work button event binding only.
   * Requires an app.js-owned follow-up callback.
   * Must not create work orders, update source work, touch Supabase/RLS, or own work-order data.
   */
  function bindWorkspaceFollowUpWorkEvents(options = {}) {
    const doc = options.documentRef || document;
    const createFollowUpWorkOrder = options.createFollowUpWorkOrder;

    if (typeof createFollowUpWorkOrder !== "function") return;

    doc.querySelectorAll("[data-create-follow-up]").forEach((button) => {
      button.addEventListener("click", () => {
        createFollowUpWorkOrder(button.dataset.createFollowUp);
      });
    });
  }

  window.MaintainOpsWorkspaceFollowUpWorkEvents = {
    bindWorkspaceFollowUpWorkEvents,
  };
})();
