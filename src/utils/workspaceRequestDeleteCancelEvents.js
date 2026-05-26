(function () {
  /*
   * LFES contract: owns Request delete warning open/cancel event binding only.
   * Requires app.js-owned delete-request callback, pending delete setter, render callback, and document.
   * May request the app-owned warning state, clear the warning, and render.
   * Must not confirm delete, delete records, touch Supabase/RLS, clean up storage,
   * convert requests, open Quick Fix, or own request data.
   */
  function bindWorkspaceRequestDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (typeof options.requestDeleteMaintenanceRequest === "function") {
      doc.querySelectorAll("[data-delete-request]").forEach((button) => {
        button.addEventListener("click", () => {
          options.requestDeleteMaintenanceRequest(button.dataset.deleteRequest);
        });
      });
    }

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-delete-request]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPendingDeleteRequestId(null);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceRequestDeleteCancelEvents = {
    bindWorkspaceRequestDeleteCancelEvents,
  };
})();
