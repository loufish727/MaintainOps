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
      button.addEventListener("click", async () => {
        if (button.disabled) return;
        button.disabled = true;
        const label = button.textContent;
        button.textContent = "Exporting...";
        try { await options.exportActiveSectionCsv(); }
        finally { button.disabled = false; button.textContent = label; }
      });
    });
  }

  window.MaintainOpsWorkspaceExportCsvCommandEvents = {
    bindWorkspaceExportCsvCommandEvents,
  };
})();
