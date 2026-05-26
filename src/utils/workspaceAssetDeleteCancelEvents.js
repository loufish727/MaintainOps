(function () {
  /*
   * LFES contract: owns Equipment delete-cancel event binding only.
   * Requires app.js-owned pending delete setter, render callback, and document.
   * May clear the pending equipment delete warning, stop event propagation, and render.
   * Must not request delete, confirm delete, delete records, touch Supabase/RLS,
   * clean up storage, or own equipment data.
   */
  function bindWorkspaceAssetDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-delete-asset]").forEach((button) => {
      button.addEventListener("click", (event) => {
        if (event && typeof event.stopPropagation === "function") event.stopPropagation();
        state.setPendingDeleteAssetId(null);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceAssetDeleteCancelEvents = {
    bindWorkspaceAssetDeleteCancelEvents,
  };
})();
