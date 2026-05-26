(function () {
  /*
   * LFES contract: owns Equipment delete event binding only.
   * Requires app.js-owned delete-request callback, confirm-delete callback,
   * pending delete setter, render callback, and document.
   * May stop event propagation, request app-owned warning state, clear warning state,
   * render, and call the app-owned permanent delete callback.
   * Must not delete records directly, touch Supabase/RLS, clean up storage,
   * or own equipment data.
   */
  function bindWorkspaceAssetDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (typeof options.requestDeleteAsset === "function") {
      doc.querySelectorAll("[data-delete-asset]").forEach((button) => {
        button.addEventListener("click", async (event) => {
          if (event && typeof event.stopPropagation === "function") event.stopPropagation();
          await options.requestDeleteAsset(button.dataset.deleteAsset);
        });
      });
    }

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-delete-asset]").forEach((button) => {
      button.addEventListener("click", (event) => {
        if (event && typeof event.stopPropagation === "function") event.stopPropagation();
        state.setPendingDeleteAssetId(null);
        options.renderWorkspace();
      });
    });

    if (typeof options.deleteAsset === "function") {
      doc.querySelectorAll("[data-confirm-delete-asset]").forEach((button) => {
        button.addEventListener("click", async (event) => {
          if (event && typeof event.stopPropagation === "function") event.stopPropagation();
          await options.deleteAsset(button.dataset.confirmDeleteAsset);
        });
      });
    }
  }

  window.MaintainOpsWorkspaceAssetDeleteCancelEvents = {
    bindWorkspaceAssetDeleteCancelEvents,
  };
})();
