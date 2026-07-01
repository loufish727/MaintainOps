(function () {
  /*
   * Module contract: binds Financial list/detail navigation only.
   * Owns no business data and relies on injected state/render callbacks.
   */
  function bindWorkspaceFinancialNavigationEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    if (!state) return;

    function openAsset(assetId) {
      if (!assetId) return;
      state.setActiveFinancialAssetId(assetId);
      options.renderWorkspace?.();
    }

    doc.querySelectorAll("[data-open-financial-asset]").forEach((card) => {
      card.addEventListener("click", () => {
        openAsset(card.dataset.openFinancialAsset);
      });
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault?.();
        openAsset(card.dataset.openFinancialAsset);
      });
    });

    doc.querySelectorAll("[data-back-financial-list]").forEach((button) => {
      button.addEventListener("click", () => {
        state.clearActiveFinancialAssetId();
        options.renderWorkspace?.();
      });
    });
  }

  window.MaintainOpsWorkspaceFinancialNavigationEvents = {
    bindWorkspaceFinancialNavigationEvents,
  };

  if (typeof module !== "undefined") {
    module.exports = { bindWorkspaceFinancialNavigationEvents };
  }
})();
