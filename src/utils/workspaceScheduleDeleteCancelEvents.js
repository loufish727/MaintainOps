(function () {
  /*
   * LFES contract: owns PM schedule delete-cancel event binding only.
   * Requires app.js-owned pending delete setter, render callback, and document.
   * May clear the pending schedule delete warning and render.
   * Must not request delete, confirm delete, generate PM work, delete records,
   * touch Supabase/RLS, or own schedule/procedure data.
   */
  function bindWorkspaceScheduleDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-delete-schedule]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPendingDeleteScheduleId(null);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceScheduleDeleteCancelEvents = {
    bindWorkspaceScheduleDeleteCancelEvents,
  };
})();
