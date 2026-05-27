(function () {
  /*
   * Module contract: owns Parts Inventory detail navigation event binding only.
   * Requires app.js-owned state setters/getters and render callback.
   * May open a part detail, close part detail, and toggle the part source manager.
   * Must not mutate part records, submit forms, delete, upload, touch Supabase/RLS,
   * or take ownership of inventory data/state beyond the injected UI flags.
   */
  function bindWorkspacePartDetailEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    const renderWorkspace = options.renderWorkspace;

    if (!state || typeof renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-open-part]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setActivePartId(button.dataset.openPart);
        renderWorkspace();
      });
      button.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        state.setActivePartId(button.dataset.openPart);
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-close-part-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setActivePartId(null);
        state.setShowPartSourceManager(false);
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-toggle-part-sources]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setShowPartSourceManager(!state.getShowPartSourceManager());
        renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspacePartDetailEvents = {
    bindWorkspacePartDetailEvents,
  };
})();
