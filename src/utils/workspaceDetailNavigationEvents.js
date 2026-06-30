(function () {
  /*
   * Module contract: binds workspace detail/open navigation controls only.
   * Requires app.js-owned active-detail/create/quick-fix state setters plus render callback.
   * May update UI navigation state, active-section storage, and render the workspace.
   * Must not mutate business records, change selectors, submit forms, delete, upload,
   * route auth/startup, touch Supabase/RLS, or take ownership of app.js state.
   */
  function bindWorkspaceDetailNavigationEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || localStorage;
    const state = options.state;
    const win = options.windowRef || (typeof window !== "undefined" ? window : null);
    const scrollToDetailTop = typeof options.scrollToDetailTop === "function" ? options.scrollToDetailTop : () => {};

    if (!state) return;

    const resetWorkCreationState = () => {
      state.setCreateWorkOrderMode(false);
      state.setQuickFixMode(false);
      state.setQuickFixAssetId(null);
      state.setQuickFixRequestId(null);
    };

    async function loadAssetHistory(assetId) {
      if (typeof options.loadAssetWorkOrderHistory === "function") {
        await options.loadAssetWorkOrderHistory(assetId);
      }
    }

    async function loadAssetEventHistory(assetId) {
      if (typeof options.loadAssetEventsForAssetIds === "function") {
        await options.loadAssetEventsForAssetIds([assetId]);
      }
    }

    function sectionNeedsAssetWorkHistory(section) {
      return section === "open-work" || section === "completed-history" || section === "parts-used";
    }

    function renderWorkspacePreservingScroll() {
      const top = Number(win?.scrollY ?? win?.pageYOffset ?? 0);
      options.renderWorkspace();
      if (!win || typeof win.scrollTo !== "function") return;
      const restoreScroll = () => win.scrollTo({ top, behavior: "auto" });
      if (typeof win.requestAnimationFrame === "function") {
        win.requestAnimationFrame(restoreScroll);
        return;
      }
      restoreScroll();
    }

    function scrollToWorkPhotos() {
      const target = doc.querySelector("#work-order-photos-target");
      if (!target) return;
      if ("open" in target) target.open = true;
      if (typeof target.scrollIntoView === "function") {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    function queueWorkPhotoScroll() {
      if (win && typeof win.requestAnimationFrame === "function") {
        win.requestAnimationFrame(scrollToWorkPhotos);
        return;
      }
      scrollToWorkPhotos();
    }

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

    doc.querySelectorAll("[data-work-photo-jump]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        state.setActiveWorkOrderId(button.dataset.workPhotoJump);
        state.setActiveAssetId(null);
        state.setActiveSection("work");
        resetWorkCreationState();
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        options.renderWorkspace();
        queueWorkPhotoScroll();
      });
    });

    doc.querySelectorAll(".asset-card").forEach((card) => {
      if (card.dataset.assetId) return;
      card.addEventListener("click", () => {
        state.setActiveAssetId(card.dataset.assetId);
        state.setActiveWorkOrderId(null);
        resetWorkCreationState();
        state.setActiveSection("assets");
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        options.renderWorkspace();
        scrollToDetailTop();
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
        scrollToDetailTop();
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
        scrollToDetailTop();
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
        state.setActiveSection("work");
        resetWorkCreationState();
        storage.setItem("maintainops.activeSection", state.getActiveSection());
        options.renderWorkspace();
        scrollToDetailTop();
      });
    });

    doc.querySelectorAll("[data-asset-relationship-section]").forEach((details) => {
      details.addEventListener("toggle", async () => {
        const assetId = details.dataset.assetId;
        const section = details.dataset.assetRelationshipSection;
        if (!assetId || !section) return;
        if (typeof options.setAssetRelationshipOpen === "function") {
          options.setAssetRelationshipOpen(assetId, section, details.open);
        }
        if (details.open && sectionNeedsAssetWorkHistory(section)) {
          await loadAssetHistory(assetId);
        }
        if (details.open && section === "asset-history") {
          await loadAssetEventHistory(assetId);
        }
        renderWorkspacePreservingScroll();
      });
    });

    doc.querySelectorAll("[data-asset-relation-page]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const assetId = button.dataset.assetId;
        const section = button.dataset.assetRelationSection;
        const currentPage = typeof options.getAssetRelationshipPage === "function"
          ? options.getAssetRelationshipPage(assetId, section)
          : 1;
        const nextPage = currentPage + (button.dataset.assetRelationPage === "next" ? 1 : -1);
        if (typeof options.setAssetRelationshipPage === "function") {
          options.setAssetRelationshipPage(assetId, section, nextPage);
        }
        renderWorkspacePreservingScroll();
      });
    });
  }

  window.MaintainOpsWorkspaceDetailNavigationEvents = {
    bindWorkspaceDetailNavigationEvents,
  };
})();
