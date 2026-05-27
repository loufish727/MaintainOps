(function () {
  /*
   * Module contract: owns PM schedule delete event binding only.
   * Requires app.js-owned delete-request callback, confirm-delete callback,
   * pending delete setter, render callback, and document.
   * May request app-owned warning state, clear the warning, render, and call
   * the app-owned permanent delete callback.
   * Must not delete records directly, generate PM work, touch Supabase/RLS,
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

    if (typeof options.deletePreventiveSchedule === "function") {
      doc.querySelectorAll("[data-confirm-delete-schedule]").forEach((button) => {
        button.addEventListener("click", () => {
          options.deletePreventiveSchedule(button.dataset.confirmDeleteSchedule);
        });
      });
    }
  }

  window.MaintainOpsWorkspaceScheduleDeleteCancelEvents = {
    bindWorkspaceScheduleDeleteCancelEvents,
  };
})();
