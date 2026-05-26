(function () {
  /*
   * LFES contract: owns the Report Issue command opener only.
   * Requires app.js-owned UI state setters, render callback, and document.
   * May clear active detail/form modes, enter report issue mode, and render.
   * Must not create issue reports, update issue status, submit forms, touch
   * Supabase/RLS, or own auth/company/location state.
   */
  function bindWorkspaceReportIssueCommandEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll('[data-command-action="report-issue"]').forEach((button) => {
      button.addEventListener("click", () => {
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setActivePartId(null);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(false);
        state.setReportIssueMode(true);
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceReportIssueCommandEvents = {
    bindWorkspaceReportIssueCommandEvents,
  };
})();
