(function () {
  /*
   * LFES contract: owns request-origin Quick Fix opener binding only.
   * Requires injected request Quick Fix opener callback and document.
   * Must not submit Quick Fix, convert/delete requests, create work,
   * touch Supabase/RLS, or own request/work-order data.
   */
  function bindWorkspaceRequestQuickFixEvents(options = {}) {
    const doc = options.documentRef || document;
    const openQuickFixForRequest = options.openQuickFixForRequest;

    if (typeof openQuickFixForRequest !== "function") return;

    doc.querySelectorAll("[data-quick-fix-request]").forEach((button) => {
      button.addEventListener("click", () => openQuickFixForRequest(button.dataset.quickFixRequest));
    });
  }

  window.MaintainOpsWorkspaceRequestQuickFixEvents = {
    bindWorkspaceRequestQuickFixEvents,
  };
})();
