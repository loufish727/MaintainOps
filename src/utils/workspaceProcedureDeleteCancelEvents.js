(function () {
  /*
   * LFES contract: owns procedure delete-cancel event binding only.
   * Requires app.js-owned pending delete setter, render callback, and document.
   * May clear the pending procedure delete warning and render.
   * Must not request delete, confirm delete, verify blockers, delete records,
   * touch Supabase/RLS, or own procedure/work-order/PM schedule data.
   */
  function bindWorkspaceProcedureDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-delete-procedure]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPendingDeleteProcedureId(null);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceProcedureDeleteCancelEvents = {
    bindWorkspaceProcedureDeleteCancelEvents,
  };
})();
