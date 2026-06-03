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

    if (!state) return;

    doc.querySelectorAll("[data-part-inventory-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPartInventoryFilter(button.dataset.partInventoryFilter);
        options.resetPartsPage();
        options.renderWorkspace();
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
        options.renderWorkspace();
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
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-asset-area-filter]").forEach((select) => {
      select.addEventListener("change", () => {
        if (!state.setAssetAreaFilter) return;
        state.setAssetAreaFilter(select.value || "all");
        options.resetAssetsPage();
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceInventoryFilterEvents = {
    bindWorkspaceInventoryFilterEvents,
  };
})();
