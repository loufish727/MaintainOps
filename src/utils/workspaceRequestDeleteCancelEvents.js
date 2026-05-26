(function () {
  /*
   * LFES contract: owns Request delete-cancel event binding only.
   * Requires app.js-owned pending delete setter, render callback, and document.
   * May clear the pending request delete warning and render.
   * Must not request delete, confirm delete, delete records, touch Supabase/RLS,
   * clean up storage, convert requests, or own request data.
   */
  function bindWorkspaceRequestDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

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
