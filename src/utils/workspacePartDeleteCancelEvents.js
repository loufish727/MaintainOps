(function () {
  /*
   * LFES contract: owns Parts delete warning open/cancel event binding only.
   * Requires app.js-owned delete-request callback, pending delete setter, render callback, and document.
   * May request app-owned warning state, clear the warning, and render.
   * Must not confirm delete, delete records, upload documents, touch Supabase/RLS,
   * or own inventory data.
   */
  function bindWorkspacePartDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (typeof options.requestDeletePart === "function") {
      doc.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach((button) => {
        button.addEventListener("click", () => {
          options.requestDeletePart(button.dataset.deletePart);
        });
      });
    }

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-delete-part]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPendingDeletePartId(null);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspacePartDeleteCancelEvents = {
    bindWorkspacePartDeleteCancelEvents,
  };
})();
