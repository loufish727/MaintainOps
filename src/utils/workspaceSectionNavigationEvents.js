(function () {
  /*
   * Module contract: owns main workspace section navigation binding only.
   * Requires app.js-owned state setters, visible-nav guard, render callback, queue reloaders,
   * search-mode setter, page reset, storage, and document.
   * May switch active section, clear detail/form modes, reset work paging, persist the
   * active section, render, and reload the queue owned by the entered section.
   * Must not mutate business records, submit forms, delete, upload, touch Supabase/RLS,
   * or own auth/company/location state.
   */
  function bindWorkspaceSectionNavigationEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;
    const scrollToSectionTop = typeof options.scrollToSectionTop === "function" ? options.scrollToSectionTop : () => {};

    doc.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", async () => {
        const nextSection = button.dataset.section;
        if (!options.visibleNavItems().some(([id]) => id === nextSection)) return;

        state.setActiveSection(nextSection);
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setActivePartId(null);
        state.setShowPartSourceManager(false);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(false);
        state.setReportIssueMode(false);
        state.setQuickFixAssetId(null);
        state.setQuickFixRequestId(null);
        if (nextSection !== "work") options.setWorkOrderSearchMode(false);
        options.resetWorkOrderPage();
        storage.setItem("maintainops.activeSection", nextSection);
        options.renderWorkspace();
        scrollToSectionTop();
        if (nextSection === "work" || nextSection === "mywork") await options.reloadWorkOrderQueue();
        if (nextSection === "requests") await options.reloadRequestQueue();
        if (nextSection === "setup" && typeof options.loadSetupStorageDashboard === "function") {
          await options.loadSetupStorageDashboard();
          options.renderWorkspace();
        }
        if (nextSection === "manager" && typeof options.loadManagerDashboardCompletedWork === "function") {
          await options.loadManagerDashboardCompletedWork();
          options.renderWorkspace();
        }
      });
    });
  }

  window.MaintainOpsWorkspaceSectionNavigationEvents = {
    bindWorkspaceSectionNavigationEvents,
  };
})();
