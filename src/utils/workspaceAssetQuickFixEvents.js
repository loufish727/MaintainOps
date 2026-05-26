(function () {
  /*
   * LFES contract: owns asset-specific Quick Fix opener only.
   * Requires app.js-owned UI state setters, storage, render, and document.
   * May set the Quick Fix asset id, switch to My Work, clear active details,
   * and render. Must not submit Quick Fix, create work, convert requests,
   * touch Supabase/RLS, or own asset/work-order data.
   */
  function bindWorkspaceAssetQuickFixEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    const storage = options.storage || localStorage;

    doc.querySelectorAll("[data-quick-fix-asset]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setQuickFixAssetId(button.dataset.quickFixAsset);
        state.setQuickFixRequestId(null);
        state.setActiveAssetId(null);
        state.setActiveWorkOrderId(null);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(true);
        state.setActiveSection("mywork");
        storage.setItem("maintainops.activeSection", "mywork");
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceAssetQuickFixEvents = {
    bindWorkspaceAssetQuickFixEvents,
  };
})();
