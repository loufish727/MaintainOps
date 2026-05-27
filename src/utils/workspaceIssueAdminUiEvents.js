(function () {
  /*
   * Module contract: owns local issue/admin setup UI event binding only.
   * Requires app.js-owned UI state setters, storage, notice, render callback, and document.
   * May close the app issue report panel and mark the local admin delete SQL checklist
   * item as applied.
   * Must not create issue reports, update issue status, run SQL, mutate business records,
   * touch Supabase/RLS, or own auth/company/location state.
   */
  function bindWorkspaceIssueAdminUiEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll("[data-cancel-app-issue-report]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setReportIssueMode(false);
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-setup-action]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.setupAction !== "confirm-admin-delete-sql") return;
        state.setAdminDeleteSqlConfirmed(true);
        storage.setItem("maintainops.adminDeleteSqlConfirmed", "true");
        if (typeof options.showNotice === "function") options.showNotice("Admin delete SQL marked as applied.");
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceIssueAdminUiEvents = {
    bindWorkspaceIssueAdminUiEvents,
  };
})();
