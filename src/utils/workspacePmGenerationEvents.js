(function () {
  /*
   * LFES contract: owns PM Generate Work button event binding only.
   * Requires an app.js-owned generate callback.
   * Must not create work orders, update schedules, touch Supabase/RLS, or own PM data.
   */
  function bindWorkspacePmGenerationEvents(options = {}) {
    const doc = options.documentRef || document;
    const generatePreventiveWorkOrder = options.generatePreventiveWorkOrder;

    if (typeof generatePreventiveWorkOrder !== "function") return;

    doc.querySelectorAll("[data-generate-pm]").forEach((button) => {
      button.addEventListener("click", () => {
        generatePreventiveWorkOrder(button.dataset.generatePm);
      });
    });
  }

  window.MaintainOpsWorkspacePmGenerationEvents = {
    bindWorkspacePmGenerationEvents,
  };
})();
