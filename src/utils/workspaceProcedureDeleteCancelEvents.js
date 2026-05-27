(function () {
  /*
   * Module contract: owns procedure delete event binding only.
   * Requires app.js-owned delete-request callback, confirm-delete callback,
   * pending delete setter, render callback, and document.
   * May request app-owned warning state, clear the warning, render, and call
   * the app-owned permanent delete callback.
   * Must not verify blockers, delete records directly, touch Supabase/RLS,
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

    if (typeof options.deleteProcedureTemplate === "function") {
      doc.querySelectorAll("[data-confirm-delete-procedure]").forEach((button) => {
        button.addEventListener("click", async () => {
          await options.deleteProcedureTemplate(button.dataset.confirmDeleteProcedure);
        });
      });
    }
  }

  window.MaintainOpsWorkspaceProcedureDeleteCancelEvents = {
    bindWorkspaceProcedureDeleteCancelEvents,
  };
})();
