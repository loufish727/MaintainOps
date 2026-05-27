(function () {
  /*
   * LFES contract: owns client-only workspace UI state defaults, getters,
   * setters, page reset helpers, and localStorage persistence keys.
   * Must not render, mutate business records, call Supabase, touch auth/session
   * startup, public QR submit, storage uploads, SQL, or RLS.
   */
  const STORAGE_KEYS = {
    activeSection: "maintainops.activeSection",
    assetStatusFilter: "maintainops.assetStatusFilter",
    partInventoryFilter: "maintainops.partInventoryFilter",
    partSearchQuery: "maintainops.partSearchQuery",
    myWorkFilter: "maintainops.myWorkFilter",
    workOrderFilter: "maintainops.workOrderFilter",
    workOrderAssigneeFilter: "maintainops.workOrderAssigneeFilter",
    workSort: "maintainops.workSort",
    workOrderPage: "maintainops.workOrderPage",
    partsPage: "maintainops.partsPage",
    assetsPage: "maintainops.assetsPage",
    requestsPage: "maintainops.requestsPage",
    requestViewFilter: "maintainops.requestViewFilter",
    schedulesPage: "maintainops.schedulesPage",
    proceduresPage: "maintainops.proceduresPage",
    membersPage: "maintainops.membersPage",
    searchQuery: "maintainops.searchQuery",
    workOrderSearchMode: "maintainops.workOrderSearchMode",
    activeMessageThreadId: "maintainops.activeMessageThreadId",
    messageThreadFilter: "maintainops.messageThreadFilter",
    messageSearchQuery: "maintainops.messageSearchQuery",
    messageComposerWorkOrderId: "maintainops.messageComposerWorkOrderId",
    sectionSplitDone: "maintainops.sectionSplitDone",
  };

  function readStorage(storage, key, fallback) {
    if (!storage || !storage.getItem) return fallback;
    const value = storage.getItem(key);
    return value == null ? fallback : value;
  }

  function readPage(storage, key) {
    const value = Number(readStorage(storage, key, "1"));
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  function writeStorage(storage, key, value) {
    if (!storage || !storage.setItem) return;
    storage.setItem(key, String(value));
  }

  function removeStorage(storage, key) {
    if (!storage || !storage.removeItem) return;
    storage.removeItem(key);
  }

  function createWorkspaceUiState(options = {}) {
    const storage = options.storage || localStorage;
    const state = {
      activeSection: readStorage(storage, STORAGE_KEYS.activeSection, "mywork"),
      activeWorkOrderId: null,
      activeAssetId: null,
      activePartId: null,
      activeMessageThreadId: readStorage(storage, STORAGE_KEYS.activeMessageThreadId, ""),
      searchQuery: readStorage(storage, STORAGE_KEYS.searchQuery, ""),
      workOrderSearchMode: readStorage(storage, STORAGE_KEYS.workOrderSearchMode, "false") === "true",
      messageThreadFilter: readStorage(storage, STORAGE_KEYS.messageThreadFilter, "all"),
      messageSearchQuery: readStorage(storage, STORAGE_KEYS.messageSearchQuery, ""),
      messageComposerWorkOrderId: readStorage(storage, STORAGE_KEYS.messageComposerWorkOrderId, ""),
      messageComposerOpen: false,
      activeStatusFilter: "active",
      myWorkFilter: readStorage(storage, STORAGE_KEYS.myWorkFilter, "assigned"),
      workOrderFilter: readStorage(storage, STORAGE_KEYS.workOrderFilter, "all"),
      workOrderAssigneeFilter: readStorage(storage, STORAGE_KEYS.workOrderAssigneeFilter, ""),
      workSort: readStorage(storage, STORAGE_KEYS.workSort, "newest"),
      requestViewFilter: readStorage(storage, STORAGE_KEYS.requestViewFilter, "active"),
      workOrderPage: readPage(storage, STORAGE_KEYS.workOrderPage),
      partsPage: readPage(storage, STORAGE_KEYS.partsPage),
      assetsPage: readPage(storage, STORAGE_KEYS.assetsPage),
      requestsPage: readPage(storage, STORAGE_KEYS.requestsPage),
      schedulesPage: readPage(storage, STORAGE_KEYS.schedulesPage),
      proceduresPage: readPage(storage, STORAGE_KEYS.proceduresPage),
      membersPage: readPage(storage, STORAGE_KEYS.membersPage),
      assetStatusFilter: readStorage(storage, STORAGE_KEYS.assetStatusFilter, "all"),
      partInventoryFilter: readStorage(storage, STORAGE_KEYS.partInventoryFilter, "all"),
      partSearchQuery: readStorage(storage, STORAGE_KEYS.partSearchQuery, ""),
    };

    if (readStorage(storage, STORAGE_KEYS.sectionSplitDone, "") !== "true" && state.activeSection === "work") {
      state.activeSection = "mywork";
      writeStorage(storage, STORAGE_KEYS.activeSection, state.activeSection);
      writeStorage(storage, STORAGE_KEYS.sectionSplitDone, "true");
    }

    const setValue = (name, value, storageKey) => {
      state[name] = value;
      if (storageKey) writeStorage(storage, storageKey, value);
    };

    const resetPage = (name, storageKey) => {
      setValue(name, 1, storageKey);
    };

    return {
      getActiveSection: () => state.activeSection,
      setActiveSection: (value) => setValue("activeSection", value, STORAGE_KEYS.activeSection),
      getActiveWorkOrderId: () => state.activeWorkOrderId,
      setActiveWorkOrderId: (value) => setValue("activeWorkOrderId", value),
      getActiveAssetId: () => state.activeAssetId,
      setActiveAssetId: (value) => setValue("activeAssetId", value),
      getActivePartId: () => state.activePartId,
      setActivePartId: (value) => setValue("activePartId", value),
      getActiveMessageThreadId: () => state.activeMessageThreadId,
      setActiveMessageThreadId: (value) => setValue("activeMessageThreadId", value, STORAGE_KEYS.activeMessageThreadId),
      getMessageThreadFilter: () => state.messageThreadFilter,
      setMessageThreadFilter: (value) => setValue("messageThreadFilter", value, STORAGE_KEYS.messageThreadFilter),
      getMessageSearchQuery: () => state.messageSearchQuery,
      setMessageSearchQuery: (value) => setValue("messageSearchQuery", value, STORAGE_KEYS.messageSearchQuery),
      getMessageComposerWorkOrderId: () => state.messageComposerWorkOrderId,
      setMessageComposerWorkOrderId: (value) => setValue("messageComposerWorkOrderId", value, STORAGE_KEYS.messageComposerWorkOrderId),
      getMessageComposerOpen: () => state.messageComposerOpen,
      setMessageComposerOpen: (value) => setValue("messageComposerOpen", Boolean(value)),
      getSearchQuery: () => state.searchQuery,
      setSearchQuery: (value) => setValue("searchQuery", value, STORAGE_KEYS.searchQuery),
      getWorkOrderSearchMode: () => state.workOrderSearchMode,
      setWorkOrderSearchMode: (value) => setValue("workOrderSearchMode", Boolean(value), STORAGE_KEYS.workOrderSearchMode),
      getActiveStatusFilter: () => state.activeStatusFilter,
      setActiveStatusFilter: (value) => setValue("activeStatusFilter", value),
      getMyWorkFilter: () => state.myWorkFilter,
      setMyWorkFilter: (value) => setValue("myWorkFilter", value, STORAGE_KEYS.myWorkFilter),
      getWorkOrderFilter: () => state.workOrderFilter,
      setWorkOrderFilter: (value) => setValue("workOrderFilter", value, STORAGE_KEYS.workOrderFilter),
      getWorkOrderAssigneeFilter: () => state.workOrderAssigneeFilter,
      setWorkOrderAssigneeFilter: (value) => {
        setValue("workOrderAssigneeFilter", value);
        if (value) writeStorage(storage, STORAGE_KEYS.workOrderAssigneeFilter, value);
        else removeStorage(storage, STORAGE_KEYS.workOrderAssigneeFilter);
      },
      getWorkSort: () => state.workSort,
      setWorkSort: (value) => setValue("workSort", value, STORAGE_KEYS.workSort),
      getRequestViewFilter: () => state.requestViewFilter,
      setRequestViewFilter: (value) => setValue("requestViewFilter", value, STORAGE_KEYS.requestViewFilter),
      getWorkOrderPage: () => state.workOrderPage,
      setWorkOrderPage: (value) => setValue("workOrderPage", value, STORAGE_KEYS.workOrderPage),
      resetWorkOrderPage: () => resetPage("workOrderPage", STORAGE_KEYS.workOrderPage),
      getPartsPage: () => state.partsPage,
      setPartsPage: (value) => setValue("partsPage", value, STORAGE_KEYS.partsPage),
      resetPartsPage: () => resetPage("partsPage", STORAGE_KEYS.partsPage),
      getAssetsPage: () => state.assetsPage,
      setAssetsPage: (value) => setValue("assetsPage", value, STORAGE_KEYS.assetsPage),
      resetAssetsPage: () => resetPage("assetsPage", STORAGE_KEYS.assetsPage),
      getRequestsPage: () => state.requestsPage,
      setRequestsPage: (value) => setValue("requestsPage", value, STORAGE_KEYS.requestsPage),
      resetRequestsPage: () => resetPage("requestsPage", STORAGE_KEYS.requestsPage),
      getSchedulesPage: () => state.schedulesPage,
      setSchedulesPage: (value) => setValue("schedulesPage", value, STORAGE_KEYS.schedulesPage),
      resetSchedulesPage: () => resetPage("schedulesPage", STORAGE_KEYS.schedulesPage),
      getProceduresPage: () => state.proceduresPage,
      setProceduresPage: (value) => setValue("proceduresPage", value, STORAGE_KEYS.proceduresPage),
      resetProceduresPage: () => resetPage("proceduresPage", STORAGE_KEYS.proceduresPage),
      getMembersPage: () => state.membersPage,
      setMembersPage: (value) => setValue("membersPage", value, STORAGE_KEYS.membersPage),
      resetMembersPage: () => resetPage("membersPage", STORAGE_KEYS.membersPage),
      getAssetStatusFilter: () => state.assetStatusFilter,
      setAssetStatusFilter: (value) => setValue("assetStatusFilter", value, STORAGE_KEYS.assetStatusFilter),
      getPartInventoryFilter: () => state.partInventoryFilter,
      setPartInventoryFilter: (value) => setValue("partInventoryFilter", value, STORAGE_KEYS.partInventoryFilter),
      getPartSearchQuery: () => state.partSearchQuery,
      setPartSearchQuery: (value) => setValue("partSearchQuery", value, STORAGE_KEYS.partSearchQuery),
      snapshot: () => ({ ...state }),
    };
  }

  window.MaintainOpsWorkspaceUiState = {
    createWorkspaceUiState,
  };

  if (typeof module !== "undefined") {
    module.exports = { createWorkspaceUiState };
  }
})();
