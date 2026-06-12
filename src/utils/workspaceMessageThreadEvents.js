(function () {
  /*
   * Module contract: owns Message Center thread-open event binding only.
   * Requires app.js-owned state setters, storage, render callback, and read-state callback.
   * May set active thread, close composer, switch to Messages, persist state,
   * call the injected active-message loader and read-state marker, and render.
   * Must not create threads, send replies, mutate message bodies, touch Supabase/RLS
   * directly, or own auth/company/location state.
   */
  function bindWorkspaceMessageThreadEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function" || typeof options.markMessageThreadRead !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll("[data-message-thread]").forEach((button) => {
      button.addEventListener("click", async () => {
        const threadId = button.dataset.messageThread;
        state.setActiveMessageThreadId(threadId);
        storage.setItem("maintainops.activeMessageThreadId", threadId);
        if (typeof options.loadActiveMessageThreadMessages === "function") await options.loadActiveMessageThreadMessages(threadId);
        await options.markMessageThreadRead(threadId);
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-open-work-message-thread]").forEach((button) => {
      button.addEventListener("click", async () => {
        const threadId = button.dataset.openWorkMessageThread;
        state.setActiveMessageThreadId(threadId);
        state.setMessageComposerOpen(false);
        state.setActiveSection("messages");
        storage.setItem("maintainops.activeMessageThreadId", threadId);
        storage.setItem("maintainops.activeSection", "messages");
        if (typeof options.loadActiveMessageThreadMessages === "function") await options.loadActiveMessageThreadMessages(threadId);
        await options.markMessageThreadRead(threadId);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceMessageThreadEvents = {
    bindWorkspaceMessageThreadEvents,
  };
})();
