(function () {
  /*
   * LFES contract: owns PM schedule delete warning open/cancel event binding only.
   * Requires app.js-owned delete-request callback, pending delete setter, render callback, and document.
   * May request app-owned warning state, clear the warning, and render.
   * Must not confirm delete, generate PM work, delete records, touch Supabase/RLS,
   * or own schedule/procedure data.
   */
  function bindWorkspaceScheduleDeleteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (typeof options.requestDeletePreventiveSchedule === "function") {
      doc.querySelectorAll("[data-delete-schedule]").forEach((button) => {
        button.addEventListener("click", () => {
          options.requestDeletePreventiveSchedule(button.dataset.deleteSchedule);
        });
      });
    }

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
