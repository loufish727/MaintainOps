(function () {
  /*
   * LFES contract: binds work-order assignment event wiring only.
   * Requires app.js-owned assignment mutation callbacks.
   * May stop propagation, call assign-to-me, submit card assignment forms,
   * and auto-submit card assignment when the assigned_to select changes.
   * Must not own assignment mutation logic, edit work-order state directly,
   * change selectors, delete work, change status, copy downtime text,
   * route auth/startup, touch Supabase/RLS directly, or take ownership of app.js state.
   */
  function bindWorkspaceWorkOrderAssignmentEvents(options = {}) {
    const doc = options.documentRef || document;

    doc.querySelectorAll("[data-assign-me]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        await options.assignWorkOrderToMe(button.dataset.assignMe);
      });
    });

    doc.querySelectorAll("[data-card-assign]").forEach((form) => {
      form.addEventListener("submit", options.assignWorkOrderFromCard);
      form.addEventListener("click", (event) => event.stopPropagation());
      form.addEventListener("change", (event) => {
        event.stopPropagation();
        if (event.target?.name === "assigned_to") form.requestSubmit();
      });
    });
  }

  window.MaintainOpsWorkspaceWorkOrderAssignmentEvents = {
    bindWorkspaceWorkOrderAssignmentEvents,
  };
})();
