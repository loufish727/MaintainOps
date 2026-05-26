(function () {
  /*
   * LFES contract: owns Parts delete-cancel event binding only.
   * Requires app.js-owned pending delete setter, render callback, and document.
   * May clear the pending part delete warning and render.
   * Must not request delete, confirm delete, delete records, upload documents,
   * touch Supabase/RLS, or own inventory data.
   */
  function bindWorkspacePartDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

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
