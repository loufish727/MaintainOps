(function () {
  /*
   * LFES contract: owns procedure delete warning open/cancel event binding only.
   * Requires app.js-owned delete-request callback, pending delete setter, render callback, and document.
   * May request app-owned warning state, clear the warning, and render.
   * Must not confirm delete, verify blockers, delete records, touch Supabase/RLS,
   * or own procedure/work-order/PM schedule data.
   */
  function bindWorkspaceProcedureDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (typeof options.requestDeleteProcedureTemplate === "function") {
      doc.querySelectorAll("[data-delete-procedure]").forEach((button) => {
        button.addEventListener("click", async () => {
          await options.requestDeleteProcedureTemplate(button.dataset.deleteProcedure);
        });
      });
    }

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
