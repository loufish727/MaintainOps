(function () {
  let pendingSearchTimer = null;
  let searchRevision = 0;
  let searchReloadChain = Promise.resolve();

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
    const windowRef = options.windowRef || (typeof window !== "undefined" ? window : null);
    const setTimeoutRef = options.setTimeoutRef || setTimeout;
    const clearTimeoutRef = options.clearTimeoutRef || clearTimeout;
    const searchDelayMs = Number.isFinite(options.searchDelayMs) ? options.searchDelayMs : 300;

    if (!state) return;

    const cancelPendingSearchReload = () => {
      searchRevision += 1;
      if (pendingSearchTimer !== null) {
        clearTimeoutRef(pendingSearchTimer);
        pendingSearchTimer = null;
      }
    };

    const restoreScrollPosition = (scrollPosition) => {
      if (scrollPosition && typeof windowRef?.scrollTo === "function") {
        windowRef.scrollTo(scrollPosition.x, scrollPosition.y);
      }
    };

    const restoreSearchFocus = (inputId, selectionStart, selectionEnd, scrollPosition) => {
      const nextSearchInput = doc.getElementById
        ? doc.getElementById(inputId)
        : doc.querySelector(`#${inputId}`);
      if (!nextSearchInput) return;
      const inputLength = nextSearchInput.value.length;
      const nextStart = Math.min(selectionStart ?? inputLength, inputLength);
      const nextEnd = Math.min(selectionEnd ?? nextStart, inputLength);
      nextSearchInput.focus({ preventScroll: true });
      nextSearchInput.setSelectionRange(nextStart, nextEnd);
      restoreScrollPosition(scrollPosition);
    };

    doc.querySelectorAll(".workspace-search-input").forEach((searchInput) => {
      searchInput.addEventListener("input", () => {
        const activeSearchId = searchInput.id;
        const selectionStart = searchInput.selectionStart;
        const selectionEnd = searchInput.selectionEnd;
        cancelPendingSearchReload();
        const revision = searchRevision;
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

        pendingSearchTimer = setTimeoutRef(() => {
          pendingSearchTimer = null;
          searchReloadChain = searchReloadChain
            .catch(() => null)
            .then(async () => {
              if (revision !== searchRevision) return;
              await Promise.all([
                options.reloadWorkOrderQueue({ render: false }),
                options.reloadRequestQueue({ render: false }),
              ]);
              if (revision !== searchRevision) return;
              const scrollPosition = windowRef ? {
                x: Number(windowRef.scrollX || windowRef.pageXOffset || 0),
                y: Number(windowRef.scrollY || windowRef.pageYOffset || 0),
              } : null;
              const currentSearchInput = doc.getElementById
                ? doc.getElementById(activeSearchId)
                : doc.querySelector(`#${activeSearchId}`);
              const shouldRestoreFocus = !("activeElement" in doc)
                || doc.activeElement === currentSearchInput;
              options.renderWorkspace();
              if (shouldRestoreFocus) {
                restoreSearchFocus(activeSearchId, selectionStart, selectionEnd, scrollPosition);
              } else {
                restoreScrollPosition(scrollPosition);
              }
            });
          return searchReloadChain;
        }, searchDelayMs);
      });
    });

    doc.querySelectorAll("[data-view-work-search]").forEach((button) => {
      button.addEventListener("click", async () => {
        cancelPendingSearchReload();
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
        cancelPendingSearchReload();
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
