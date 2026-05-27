(function () {
  /*
   * Module contract: owns the Export CSV command click binding only.
   * Requires app.js-owned export callback and document.
   * May invoke the injected export callback.
   * Must not own export row construction, download filename selection, state, auth,
   * company/location scope, Supabase/RLS, or any mutation workflow.
   */
  function bindWorkspaceExportCsvCommandEvents(options = {}) {
    const doc = options.documentRef || document;
    if (typeof options.exportActiveSectionCsv !== "function") return;

    doc.querySelectorAll('[data-command-action="export-csv"]').forEach((button) => {
      button.addEventListener("click", () => {
        options.exportActiveSectionCsv();
      });
    });
  }

  window.MaintainOpsWorkspaceExportCsvCommandEvents = {
    bindWorkspaceExportCsvCommandEvents,
  };
})();
