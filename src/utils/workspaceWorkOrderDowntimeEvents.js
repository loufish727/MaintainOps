(function () {
  /*
   * LFES contract: binds work-order downtime email copy buttons only.
   * Requires injected work-order lookup, subject/body builders, and clipboard copy callback.
   * May read the selected work order, copy derived text, and temporarily update button text.
   * Must not mutate work orders, record events, change status/assignment/delete flows,
   * route auth/startup, touch Supabase/RLS directly, or take ownership of app.js state.
   */
  function bindWorkspaceWorkOrderDowntimeEvents(options = {}) {
    const doc = options.documentRef || document;
    const resetDelayMs = options.resetDelayMs || 1600;
    const scheduleReset = options.setTimeoutRef || setTimeout;

    doc.querySelectorAll("[data-copy-downtime]").forEach((button) => {
      button.addEventListener("click", async () => {
        const workOrder = options.getWorkOrderById(button.dataset.id);
        if (!workOrder) return;

        const isSubject = button.dataset.copyDowntime === "subject";
        const text = isSubject
          ? options.downtimeEmailSubject(workOrder)
          : options.downtimeEmailBody(workOrder);
        const copied = await options.copyTextToClipboard(text);
        button.textContent = copied ? "Copied" : "Copy failed";
        scheduleReset(() => {
          button.textContent = isSubject ? "Copy Subject" : "Copy Email Body";
        }, resetDelayMs);
      });
    });
  }

  window.MaintainOpsWorkspaceWorkOrderDowntimeEvents = {
    bindWorkspaceWorkOrderDowntimeEvents,
  };
})();
