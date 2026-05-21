(function () {
  function bindWorkspaceDetailNavigationEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || localStorage;
    const state = options.state;

    if (!state) return;

    const resetWorkCreationState = () => {
      state.setCreateWorkOrderMode(false);
      state.setQuickFixMode(false);
      state.setQuickFixAssetId(null);
      state.setQuickFixRequestId(null);
    };

    const backToMyWork = doc.querySelector("#back-to-my-work");
    if (backToMyWork) {
      backToMyWork.addEventListener("click", () => {
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        resetWorkCreationState();
        options.renderWorkspace();
      });
    }

    const backToEquipment = doc.querySelector("#back-to-equipment");
    if (backToEquipment) {
      backToEquipment.addEventListener("click", () => {
        state.setActiveAssetId(null);
        state.setPendingDeleteAssetId(null);
        options.renderWorkspace();
      });
    }

    doc.querySelectorAll(".work-card").forEach((card) => {
      card.addEventListener("click", () => {
        state.setActiveWorkOrderId(card.dataset.id);
        state.setActiveAssetId(null);
        resetWorkCreationState();
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll(".asset-card").forEach((card) => {
      card.addEventListener("click", () => {
        state.setActiveAssetId(card.dataset.assetId);
        state.setActiveWorkOrderId(null);
        resetWorkCreationState();
        state.setActiveSection("assets");
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-open-asset]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        state.setActiveAssetId(button.dataset.openAsset);
        state.setActiveWorkOrderId(null);
        resetWorkCreationState();
        if (state.getActiveSection() !== "assets") state.setActiveSection("work");
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-asset-id]").forEach((card) => {
      const openAsset = () => {
        state.setActiveAssetId(card.dataset.assetId);
        state.setActiveWorkOrderId(null);
        state.setActivePartId(null);
        resetWorkCreationState();
        state.setReportIssueMode(false);
        state.setActiveSection("assets");
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        options.renderWorkspace();
      };

      card.addEventListener("click", openAsset);
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openAsset();
      });
    });

    doc.querySelectorAll("[data-mini-work-order]").forEach((item) => {
      item.addEventListener("click", () => {
        state.setActiveWorkOrderId(item.dataset.miniWorkOrder);
        state.setActiveAssetId(null);
        resetWorkCreationState();
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceDetailNavigationEvents = {
    bindWorkspaceDetailNavigationEvents,
  };
})();
