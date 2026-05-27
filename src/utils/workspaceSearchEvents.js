(function () {
  /*
   * Module contract: binds workspace search and exact work-search controls only.
   * Requires injected state getters/setters and queue reload/page reset callbacks from app.js.
   * May write search/active-section UI keys to storage and may call read-only queue reloads.
   * Must not mutate business records, change selectors, submit forms, route auth/startup,
   * touch Supabase/RLS/storage uploads, or take ownership of app.js state.
   */
  function bindWorkspaceSearchEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || localStorage;
    const state = options.state;

    if (!state) return;

    const restoreSearchFocus = (inputId) => {
      const nextSearchInput = doc.getElementById
        ? doc.getElementById(inputId)
        : doc.querySelector(`#${inputId}`);
      if (!nextSearchInput) return;
      nextSearchInput.focus();
      nextSearchInput.setSelectionRange(state.getSearchQuery().length, state.getSearchQuery().length);
    };

    doc.querySelectorAll(".workspace-search-input").forEach((searchInput) => {
      searchInput.addEventListener("input", async () => {
        const activeSearchId = searchInput.id;
        state.setSearchQuery(searchInput.value);
        options.invalidateExactWorkOrderSearchCache();
        if (!state.getSearchQuery().trim()) options.setWorkOrderSearchMode(false);
        if (state.getSearchQuery().trim()) {
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setActivePartId(null);
          state.setQuickFixMode(false);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixAssetId(null);
          state.setQuickFixRequestId(null);
        }
        storage.setItem("maintainops.searchQuery", state.getSearchQuery());
        options.resetWorkOrderPage();
        options.resetPartsPage();
        options.resetRequestsPage();
        await options.reloadWorkOrderQueue();
        await options.reloadRequestQueue();
        restoreSearchFocus(activeSearchId);
      });
    });

    doc.querySelectorAll("[data-view-work-search]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setActiveSection("work");
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setActivePartId(null);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(false);
        options.setWorkOrderSearchMode(true);
        options.invalidateExactWorkOrderSearchCache();
        options.resetWorkOrderPage();
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-close-work-search]").forEach((button) => {
      button.addEventListener("click", async () => {
        options.setWorkOrderSearchMode(false);
        options.invalidateExactWorkOrderSearchCache();
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });
  }

  window.MaintainOpsWorkspaceSearchEvents = {
    bindWorkspaceSearchEvents,
  };
})();
