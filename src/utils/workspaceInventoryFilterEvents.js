(function () {
  /*
   * LFES contract: binds read-only inventory/equipment filter controls only.
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
        options.resetAssetsPage();
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceInventoryFilterEvents = {
    bindWorkspaceInventoryFilterEvents,
  };
})();
