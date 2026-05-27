(function () {
  /*
   * Module contract: owns the New Work Order command opener only.
   * Requires app.js-owned UI state setters, storage, render, and document.
   * May switch to Work Orders, clear conflicting modes, persist active section, and render.
   * Must not submit work orders, create Quick Fix work, export data, touch Supabase/RLS
   * directly, or own auth/company/location state.
   */
  function bindWorkspaceNewWorkOrderCommandEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll('[data-command-action="create-work-order"]').forEach((button) => {
      button.addEventListener("click", () => {
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setCreateWorkOrderMode(true);
        state.setQuickFixMode(false);
        state.setReportIssueMode(false);
        state.setQuickFixAssetId(null);
        state.setQuickFixRequestId(null);
        state.setActiveSection("work");
        options.setWorkOrderSearchMode(false);
        storage.setItem("maintainops.activeSection", "work");
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceNewWorkOrderCommandEvents = {
    bindWorkspaceNewWorkOrderCommandEvents,
  };
})();
