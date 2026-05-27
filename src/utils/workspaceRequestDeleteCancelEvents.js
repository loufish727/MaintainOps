(function () {
  /*
   * Module contract: owns Request delete event binding only.
   * Requires app.js-owned delete-request callback, confirm-delete callback,
   * pending delete setter, render callback, and document.
   * May request the app-owned warning state, clear the warning, render, and
   * call the app-owned permanent delete callback.
   * Must not delete records directly, touch Supabase/RLS, clean up storage,
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

    if (typeof options.deleteMaintenanceRequest === "function") {
      doc.querySelectorAll("[data-confirm-delete-request]").forEach((button) => {
        button.addEventListener("click", () => {
          options.deleteMaintenanceRequest(button.dataset.confirmDeleteRequest);
        });
      });
    }
  }

  window.MaintainOpsWorkspaceRequestDeleteCancelEvents = {
    bindWorkspaceRequestDeleteCancelEvents,
  };
})();
