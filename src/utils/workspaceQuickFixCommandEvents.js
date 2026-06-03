(function () {
  /*
   * Module contract: owns the main Quick Fix command opener only.
   * Requires app.js-owned UI state setters, storage, render, and document.
   * May switch to My Work, clear conflicting modes/details, persist active section,
   * and render. Must not submit Quick Fix, create work, convert requests,
   * touch Supabase/RLS, or own auth/company/location state.
   */
  function bindWorkspaceQuickFixCommandEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    const scrollToQuickFixForm = typeof options.scrollToQuickFixForm === "function" ? options.scrollToQuickFixForm : () => {};

    if (!state || typeof options.renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll('[data-command-action="quick-fix"]').forEach((button) => {
      button.addEventListener("click", () => {
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(true);
        state.setReportIssueMode(false);
        state.setQuickFixAssetId(null);
        state.setQuickFixRequestId(null);
        state.setActiveSection("mywork");
        options.setWorkOrderSearchMode(false);
        storage.setItem("maintainops.activeSection", "mywork");
        options.renderWorkspace();
        scrollToQuickFixForm();
      });
    });
  }

  window.MaintainOpsWorkspaceQuickFixCommandEvents = {
    bindWorkspaceQuickFixCommandEvents,
  };
})();
