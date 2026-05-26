(function () {
  /*
   * LFES contract: owns the Submit Request command opener only.
   * Requires app.js-owned UI state setters, storage, request reset/reload, and document.
   * May switch to Requests, clear conflicting modes, persist active section, reset request
   * paging, and reload the request queue.
   * Must not submit requests, convert requests, create Quick Fix work, touch Supabase/RLS
   * directly, or own auth/company/location state.
   */
  function bindWorkspaceSubmitRequestCommandEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.reloadRequestQueue !== "function" || typeof options.resetRequestsPage !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll('[data-command-action="request"]').forEach((button) => {
      button.addEventListener("click", async () => {
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(false);
        state.setReportIssueMode(false);
        state.setQuickFixAssetId(null);
        state.setQuickFixRequestId(null);
        state.setActiveSection("requests");
        options.setWorkOrderSearchMode(false);
        storage.setItem("maintainops.activeSection", "requests");
        options.resetRequestsPage();
        await options.reloadRequestQueue();
      });
    });
  }

  window.MaintainOpsWorkspaceSubmitRequestCommandEvents = {
    bindWorkspaceSubmitRequestCommandEvents,
  };
})();
