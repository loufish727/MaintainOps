(function () {
  /*
   * LFES contract: owns Work Order -> Message Team start-composer binding only.
   * Requires app.js-owned message/workspace state, storage, render callback, and document.
   * May open the message composer for a work order, clear active thread, switch to
   * Messages, persist local state, and render.
   * Must not create message threads, send messages, mark threads read, touch
   * Supabase/RLS, or own work-order/message data.
   */
  function bindWorkspaceWorkMessageStartEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll("[data-start-work-message]").forEach((button) => {
      button.addEventListener("click", () => {
        const workOrderId = button.dataset.startWorkMessage;
        state.setMessageComposerWorkOrderId(workOrderId);
        state.setMessageComposerOpen(true);
        state.setActiveMessageThreadId("");
        state.setActiveSection("messages");
        storage.setItem("maintainops.messageComposerWorkOrderId", workOrderId);
        storage.setItem("maintainops.activeSection", "messages");
        storage.setItem("maintainops.activeMessageThreadId", "");
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceWorkMessageStartEvents = {
    bindWorkspaceWorkMessageStartEvents,
  };
})();
