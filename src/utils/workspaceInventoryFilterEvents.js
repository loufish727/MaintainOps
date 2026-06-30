(function () {
  /*
   * Module contract: binds read-only inventory/equipment filter controls only.
   * Requires app.js-owned filter state setters/getters plus page reset and render callbacks.
   * May update local filter state, persist matching localStorage keys, reset pages, and render.
   * Must not mutate business records, change selectors, submit forms, delete, upload,
   * route auth/startup, touch Supabase/RLS, handle part search text, or take ownership of app.js state.
   */
  function bindWorkspaceInventoryFilterEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    const win = options.windowRef || (typeof window !== "undefined" ? window : null);

    if (!state) return;

    function restoreScroll(top) {
      if (!win || typeof win.scrollTo !== "function") return;
      win.scrollTo({ top, behavior: "auto" });
    }

    function renderWorkspacePreservingScroll() {
      const top = Number(win?.scrollY ?? win?.pageYOffset ?? 0);
      options.renderWorkspace();
      if (!win || typeof win.scrollTo !== "function") return;
      if (typeof win.requestAnimationFrame === "function") {
        win.requestAnimationFrame(() => {
          restoreScroll(top);
          win.requestAnimationFrame(() => restoreScroll(top));
        });
        return;
      }
      restoreScroll(top);
    }

    doc.querySelectorAll("[data-part-inventory-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPartInventoryFilter(button.dataset.partInventoryFilter);
        options.resetPartsPage();
        renderWorkspacePreservingScroll();
      });
    });

    doc.querySelectorAll("[data-part-sort]").forEach((select) => {
      select.addEventListener("change", () => {
        if (!state.setPartSort) return;
        state.setPartSort(select.value || "default");
        options.resetPartsPage();
        renderWorkspacePreservingScroll();
      });
    });

    doc.querySelectorAll("[data-asset-status-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextFilter = state.getAssetStatusFilter() === button.dataset.assetStatusFilter
          ? "all"
          : button.dataset.assetStatusFilter;
        state.setAssetStatusFilter(nextFilter);
        if (state.setAssetTypeFilter) state.setAssetTypeFilter("all");
        options.resetAssetsPage();
        renderWorkspacePreservingScroll();
      });
    });

    doc.querySelectorAll("[data-asset-type-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!state.getAssetTypeFilter || !state.setAssetTypeFilter) return;
        const nextFilter = state.getAssetTypeFilter() === button.dataset.assetTypeFilter
          ? "all"
          : button.dataset.assetTypeFilter;
        state.setAssetTypeFilter(nextFilter);
        if (state.setAssetStatusFilter) state.setAssetStatusFilter("all");
        options.resetAssetsPage();
        renderWorkspacePreservingScroll();
      });
    });

    doc.querySelectorAll("[data-asset-area-filter]").forEach((select) => {
      select.addEventListener("change", () => {
        if (!state.setAssetAreaFilter) return;
        state.setAssetAreaFilter(select.value || "all");
        options.resetAssetsPage();
        renderWorkspacePreservingScroll();
      });
    });
  }

  window.MaintainOpsWorkspaceInventoryFilterEvents = {
    bindWorkspaceInventoryFilterEvents,
  };
})();
