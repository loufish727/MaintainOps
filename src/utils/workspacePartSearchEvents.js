(function () {
  /*
   * LFES contract: owns Parts Inventory search event binding only.
   * Requires app.js-owned search state, page reset, render callback, storage, and document.
   * May persist part search text, reset parts pagination, render, restore search focus,
   * and scroll back to the parts list on search submit.
   * Must not create, edit, restock, use, delete, upload part documents, rename sources,
   * touch Supabase/RLS, or own inventory data.
   */
  function bindWorkspacePartSearchEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    const renderWorkspace = options.renderWorkspace;
    const resetPartsPage = options.resetPartsPage;

    if (!state || typeof renderWorkspace !== "function" || typeof resetPartsPage !== "function") return;

    const storage = options.storage || localStorage;
    const partSearchForm = doc.querySelector("#part-search-form");
    if (!partSearchForm) return;

    const persistSearch = (value) => {
      state.setPartSearchQuery(value || "");
      storage.setItem("maintainops.partSearchQuery", value || "");
      resetPartsPage();
      renderWorkspace();
    };

    const partSearchInput = partSearchForm.querySelector("input[name='part_search']");
    if (partSearchInput) {
      partSearchInput.addEventListener("input", () => {
        persistSearch(partSearchInput.value || "");
        const nextPartSearchInput = doc.querySelector("#part-search");
        if (!nextPartSearchInput) return;
        nextPartSearchInput.focus();
        const cursorPosition = nextPartSearchInput.value.length;
        nextPartSearchInput.setSelectionRange(cursorPosition, cursorPosition);
      });
    }

    partSearchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formDataFactory = options.FormDataRef || FormData;
      const value = new formDataFactory(partSearchForm).get("part_search") || "";
      persistSearch(value);
      doc.querySelector("#parts-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  window.MaintainOpsWorkspacePartSearchEvents = {
    bindWorkspacePartSearchEvents,
  };
})();
