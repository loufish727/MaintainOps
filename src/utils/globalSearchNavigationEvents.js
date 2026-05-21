(function () {
  function bindGlobalSearchNavigationEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || localStorage;
    const state = options.state;
    const renderWorkspace = options.renderWorkspace;
    const setWorkOrderSearchMode = options.setWorkOrderSearchMode;

    if (!state || !renderWorkspace || !setWorkOrderSearchMode) return;

    const clearSearch = () => {
      state.setSearchQuery("");
      setWorkOrderSearchMode(false);
      storage.setItem("maintainops.searchQuery", "");
    };

    const persistActiveSection = (section) => {
      state.setActiveSection(section);
      storage.setItem("maintainops.activeSection", section);
    };

    doc.querySelectorAll("[data-search-work-order]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setActiveWorkOrderId(button.dataset.searchWorkOrder);
        state.setActiveAssetId(null);
        state.setActivePartId(null);
        persistActiveSection("work");
        clearSearch();
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-search-asset]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setActiveAssetId(button.dataset.searchAsset);
        state.setActiveWorkOrderId(null);
        state.setActivePartId(null);
        persistActiveSection("assets");
        clearSearch();
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-search-part]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setActivePartId(button.dataset.searchPart);
        state.setActiveAssetId(null);
        state.setActiveWorkOrderId(null);
        persistActiveSection("parts");
        clearSearch();
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-search-request]").forEach((button) => {
      button.addEventListener("click", () => {
        persistActiveSection("requests");
        clearSearch();
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-search-section]").forEach((button) => {
      button.addEventListener("click", () => {
        persistActiveSection(button.dataset.searchSection);
        clearSearch();
        renderWorkspace();
      });
    });
  }

  window.MaintainOpsGlobalSearchNavigationEvents = {
    bindGlobalSearchNavigationEvents,
  };
})();
