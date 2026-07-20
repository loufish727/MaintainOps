(function () {
  /*
   * Module contract: binds Planning no-due-date form submissions only.
   * Requires an app.js-owned save callback and must not call Supabase directly.
   */
  function bindWorkspacePlanningDueDateEvents(options = {}) {
    const doc = options.documentRef || document;
    const savePlanningDueDate = options.savePlanningDueDate;
    if (typeof savePlanningDueDate !== "function") return;

    doc.querySelectorAll("[data-planning-due-form]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopPropagation?.();
        const submitButton = form.querySelector?.("button[type='submit']");
        if (submitButton?.disabled) return;
        if (submitButton) submitButton.disabled = true;
        try {
          const dateInput = form.querySelector?.("[name='planning_due_at']");
          await savePlanningDueDate(form.dataset.planningDueForm, dateInput?.value);
        } finally {
          if (submitButton?.isConnected) submitButton.disabled = false;
        }
      });
    });
  }

  window.MaintainOpsWorkspacePlanningDueDateEvents = {
    bindWorkspacePlanningDueDateEvents,
  };

  if (typeof module !== "undefined") {
    module.exports = { bindWorkspacePlanningDueDateEvents };
  }
})();
