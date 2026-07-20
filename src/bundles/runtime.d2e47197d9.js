(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/utils/authRenderPolicy.js
  var require_authRenderPolicy = __commonJS({
    "src/utils/authRenderPolicy.js"(exports, module) {
      (function() {
        function sessionUserId(session) {
          return session?.user?.id || "";
        }
        function shouldRenderForAuthEvent(eventName, previousSession, nextSession) {
          const event = String(eventName || "");
          if (event === "TOKEN_REFRESHED" && sessionUserId(previousSession) && sessionUserId(previousSession) === sessionUserId(nextSession)) {
            return false;
          }
          return true;
        }
        window.MaintainOpsAuthRenderPolicy = {
          shouldRenderForAuthEvent
        };
        if (typeof module !== "undefined") {
          module.exports = { shouldRenderForAuthEvent };
        }
      })();
    }
  });

  // src/utils/workspaceUiState.js
  var require_workspaceUiState = __commonJS({
    "src/utils/workspaceUiState.js"(exports, module) {
      (function() {
        const STORAGE_KEYS = {
          activeSection: "maintainops.activeSection",
          assetStatusFilter: "maintainops.assetStatusFilter",
          assetTypeFilter: "maintainops.assetTypeFilter",
          assetAreaFilter: "maintainops.assetAreaFilter",
          partInventoryFilter: "maintainops.partInventoryFilter",
          partSort: "maintainops.partSort",
          partSearchQuery: "maintainops.partSearchQuery",
          myWorkFilter: "maintainops.myWorkFilter",
          workOrderFilter: "maintainops.workOrderFilter",
          workOrderAssigneeFilter: "maintainops.workOrderAssigneeFilter",
          workSort: "maintainops.workSort",
          workOrderPage: "maintainops.workOrderPage",
          partsPage: "maintainops.partsPage",
          assetsPage: "maintainops.assetsPage",
          financialPage: "maintainops.financialPage",
          financialMissingFilter: "maintainops.financialMissingFilter",
          financialLocationFilter: "maintainops.financialLocationFilter",
          financialTypeFilter: "maintainops.financialTypeFilter",
          financialAreaFilter: "maintainops.financialAreaFilter",
          requestsPage: "maintainops.requestsPage",
          requestViewFilter: "maintainops.requestViewFilter",
          planningOverduePage: "maintainops.planningOverduePage",
          planningTodayPage: "maintainops.planningTodayPage",
          planningSoonPage: "maintainops.planningSoonPage",
          planningFollowUpPage: "maintainops.planningFollowUpPage",
          planningPmPage: "maintainops.planningPmPage",
          schedulesPage: "maintainops.schedulesPage",
          proceduresPage: "maintainops.proceduresPage",
          membersPage: "maintainops.membersPage",
          searchQuery: "maintainops.searchQuery",
          workOrderSearchMode: "maintainops.workOrderSearchMode",
          activeMessageThreadId: "maintainops.activeMessageThreadId",
          messageThreadFilter: "maintainops.messageThreadFilter",
          messageThreadsPage: "maintainops.messageThreadsPage",
          messageSearchQuery: "maintainops.messageSearchQuery",
          messageComposerWorkOrderId: "maintainops.messageComposerWorkOrderId",
          managerDashboardUserId: "maintainops.managerDashboardUserId",
          managerDashboardMetric: "maintainops.managerDashboardMetric",
          sectionSplitDone: "maintainops.sectionSplitDone"
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
            messageThreadsPage: readPage(storage, STORAGE_KEYS.messageThreadsPage),
            messageSearchQuery: readStorage(storage, STORAGE_KEYS.messageSearchQuery, ""),
            messageComposerWorkOrderId: readStorage(storage, STORAGE_KEYS.messageComposerWorkOrderId, ""),
            messageComposerOpen: false,
            managerDashboardUserId: readStorage(storage, STORAGE_KEYS.managerDashboardUserId, ""),
            managerDashboardMetric: readStorage(storage, STORAGE_KEYS.managerDashboardMetric, "open"),
            activeStatusFilter: "active",
            myWorkFilter: readStorage(storage, STORAGE_KEYS.myWorkFilter, "assigned"),
            workOrderFilter: readStorage(storage, STORAGE_KEYS.workOrderFilter, "all"),
            workOrderAssigneeFilter: readStorage(storage, STORAGE_KEYS.workOrderAssigneeFilter, ""),
            workSort: readStorage(storage, STORAGE_KEYS.workSort, "newest"),
            requestViewFilter: readStorage(storage, STORAGE_KEYS.requestViewFilter, "active"),
            workOrderPage: readPage(storage, STORAGE_KEYS.workOrderPage),
            partsPage: readPage(storage, STORAGE_KEYS.partsPage),
            assetsPage: readPage(storage, STORAGE_KEYS.assetsPage),
            financialPage: readPage(storage, STORAGE_KEYS.financialPage),
            financialMissingFilter: readStorage(storage, STORAGE_KEYS.financialMissingFilter, "all"),
            financialLocationFilter: readStorage(storage, STORAGE_KEYS.financialLocationFilter, "all"),
            financialTypeFilter: readStorage(storage, STORAGE_KEYS.financialTypeFilter, "all"),
            financialAreaFilter: readStorage(storage, STORAGE_KEYS.financialAreaFilter, "all"),
            requestsPage: readPage(storage, STORAGE_KEYS.requestsPage),
            planningOverduePage: readPage(storage, STORAGE_KEYS.planningOverduePage),
            planningTodayPage: readPage(storage, STORAGE_KEYS.planningTodayPage),
            planningSoonPage: readPage(storage, STORAGE_KEYS.planningSoonPage),
            planningFollowUpPage: readPage(storage, STORAGE_KEYS.planningFollowUpPage),
            planningPmPage: readPage(storage, STORAGE_KEYS.planningPmPage),
            schedulesPage: readPage(storage, STORAGE_KEYS.schedulesPage),
            proceduresPage: readPage(storage, STORAGE_KEYS.proceduresPage),
            membersPage: readPage(storage, STORAGE_KEYS.membersPage),
            assetStatusFilter: readStorage(storage, STORAGE_KEYS.assetStatusFilter, "all"),
            assetTypeFilter: readStorage(storage, STORAGE_KEYS.assetTypeFilter, "all"),
            assetAreaFilter: readStorage(storage, STORAGE_KEYS.assetAreaFilter, "all"),
            partInventoryFilter: readStorage(storage, STORAGE_KEYS.partInventoryFilter, "all"),
            partSort: readStorage(storage, STORAGE_KEYS.partSort, "default"),
            partSearchQuery: readStorage(storage, STORAGE_KEYS.partSearchQuery, "")
          };
          if (readStorage(storage, STORAGE_KEYS.sectionSplitDone, "") !== "true" && state.activeSection === "work") {
            state.activeSection = "mywork";
            writeStorage(storage, STORAGE_KEYS.activeSection, state.activeSection);
            writeStorage(storage, STORAGE_KEYS.sectionSplitDone, "true");
          }
          if (state.activeSection === "performance") {
            state.activeSection = "mywork";
            writeStorage(storage, STORAGE_KEYS.activeSection, state.activeSection);
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
            getMessageThreadsPage: () => state.messageThreadsPage,
            setMessageThreadsPage: (value) => setValue("messageThreadsPage", value, STORAGE_KEYS.messageThreadsPage),
            resetMessageThreadsPage: () => resetPage("messageThreadsPage", STORAGE_KEYS.messageThreadsPage),
            getMessageSearchQuery: () => state.messageSearchQuery,
            setMessageSearchQuery: (value) => setValue("messageSearchQuery", value, STORAGE_KEYS.messageSearchQuery),
            getMessageComposerWorkOrderId: () => state.messageComposerWorkOrderId,
            setMessageComposerWorkOrderId: (value) => setValue("messageComposerWorkOrderId", value, STORAGE_KEYS.messageComposerWorkOrderId),
            getMessageComposerOpen: () => state.messageComposerOpen,
            setMessageComposerOpen: (value) => setValue("messageComposerOpen", Boolean(value)),
            getManagerDashboardUserId: () => state.managerDashboardUserId,
            setManagerDashboardUserId: (value) => setValue("managerDashboardUserId", value || "", STORAGE_KEYS.managerDashboardUserId),
            getManagerDashboardMetric: () => state.managerDashboardMetric,
            setManagerDashboardMetric: (value) => setValue("managerDashboardMetric", value || "open", STORAGE_KEYS.managerDashboardMetric),
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
            getFinancialPage: () => state.financialPage,
            setFinancialPage: (value) => setValue("financialPage", value, STORAGE_KEYS.financialPage),
            resetFinancialPage: () => resetPage("financialPage", STORAGE_KEYS.financialPage),
            getFinancialMissingFilter: () => state.financialMissingFilter,
            setFinancialMissingFilter: (value) => setValue("financialMissingFilter", value || "all", STORAGE_KEYS.financialMissingFilter),
            getFinancialLocationFilter: () => state.financialLocationFilter,
            setFinancialLocationFilter: (value) => setValue("financialLocationFilter", value || "all", STORAGE_KEYS.financialLocationFilter),
            getFinancialTypeFilter: () => state.financialTypeFilter,
            setFinancialTypeFilter: (value) => setValue("financialTypeFilter", value || "all", STORAGE_KEYS.financialTypeFilter),
            getFinancialAreaFilter: () => state.financialAreaFilter,
            setFinancialAreaFilter: (value) => setValue("financialAreaFilter", value || "all", STORAGE_KEYS.financialAreaFilter),
            getRequestsPage: () => state.requestsPage,
            setRequestsPage: (value) => setValue("requestsPage", value, STORAGE_KEYS.requestsPage),
            resetRequestsPage: () => resetPage("requestsPage", STORAGE_KEYS.requestsPage),
            getPlanningPage: (kind) => {
              if (kind === "overdue") return state.planningOverduePage;
              if (kind === "today") return state.planningTodayPage;
              if (kind === "soon") return state.planningSoonPage;
              if (kind === "follow-up") return state.planningFollowUpPage;
              if (kind === "pm") return state.planningPmPage;
              return 1;
            },
            setPlanningPage: (kind, value) => {
              if (kind === "overdue") setValue("planningOverduePage", value, STORAGE_KEYS.planningOverduePage);
              if (kind === "today") setValue("planningTodayPage", value, STORAGE_KEYS.planningTodayPage);
              if (kind === "soon") setValue("planningSoonPage", value, STORAGE_KEYS.planningSoonPage);
              if (kind === "follow-up") setValue("planningFollowUpPage", value, STORAGE_KEYS.planningFollowUpPage);
              if (kind === "pm") setValue("planningPmPage", value, STORAGE_KEYS.planningPmPage);
            },
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
            getAssetTypeFilter: () => state.assetTypeFilter,
            setAssetTypeFilter: (value) => setValue("assetTypeFilter", value, STORAGE_KEYS.assetTypeFilter),
            getAssetAreaFilter: () => state.assetAreaFilter,
            setAssetAreaFilter: (value) => setValue("assetAreaFilter", value, STORAGE_KEYS.assetAreaFilter),
            getPartInventoryFilter: () => state.partInventoryFilter,
            setPartInventoryFilter: (value) => setValue("partInventoryFilter", value, STORAGE_KEYS.partInventoryFilter),
            getPartSort: () => state.partSort,
            setPartSort: (value) => setValue("partSort", value || "default", STORAGE_KEYS.partSort),
            getPartSearchQuery: () => state.partSearchQuery,
            setPartSearchQuery: (value) => setValue("partSearchQuery", value, STORAGE_KEYS.partSearchQuery),
            snapshot: () => ({ ...state })
          };
        }
        window.MaintainOpsWorkspaceUiState = {
          createWorkspaceUiState
        };
        if (typeof module !== "undefined") {
          module.exports = { createWorkspaceUiState };
        }
      })();
    }
  });

  // src/utils/workspaceFinancialNavigationEvents.js
  var require_workspaceFinancialNavigationEvents = __commonJS({
    "src/utils/workspaceFinancialNavigationEvents.js"(exports, module) {
      (function() {
        function bindWorkspaceFinancialNavigationEvents(options = {}) {
          const doc = options.documentRef || document;
          const state = options.state;
          if (!state) return;
          function openAsset(assetId) {
            if (!assetId) return;
            state.setActiveFinancialAssetId(assetId);
            options.renderWorkspace?.();
          }
          function openEquipmentPage(assetId) {
            if (!assetId) return;
            state.clearActiveFinancialAssetId();
            state.setActiveAssetId?.(assetId);
            state.setActiveWorkOrderId?.(null);
            state.setActivePartId?.(null);
            state.setActiveSection?.("assets");
            options.renderWorkspace?.();
            options.scrollToDetailTop?.();
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
          doc.querySelectorAll("[data-open-financial-equipment]").forEach((button) => {
            button.addEventListener("click", () => {
              openEquipmentPage(button.dataset.openFinancialEquipment);
            });
          });
        }
        window.MaintainOpsWorkspaceFinancialNavigationEvents = {
          bindWorkspaceFinancialNavigationEvents
        };
        if (typeof module !== "undefined") {
          module.exports = { bindWorkspaceFinancialNavigationEvents };
        }
      })();
    }
  });

  // src/utils/workspaceManagerDashboardEvents.js
  var require_workspaceManagerDashboardEvents = __commonJS({
    "src/utils/workspaceManagerDashboardEvents.js"(exports, module) {
      (function() {
        function bindWorkspaceManagerDashboardEvents(options = {}) {
          const doc = options.documentRef || document;
          const state = options.state;
          const renderWorkspace = typeof options.renderWorkspace === "function" ? options.renderWorkspace : () => {
          };
          const win = options.windowRef || (typeof window !== "undefined" ? window : null);
          const storage = options.storage || (typeof localStorage !== "undefined" ? localStorage : null);
          if (!state) return;
          function scrollToDrillIn() {
            const target = doc.querySelector("[data-manager-drill-in]");
            if (!target || typeof target.scrollIntoView !== "function") return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          doc.querySelectorAll("[data-manager-drill-user][data-manager-drill-metric]").forEach((button) => {
            button.addEventListener("click", () => {
              state.setManagerDashboardUserId(button.dataset.managerDrillUser || "");
              state.setManagerDashboardMetric(button.dataset.managerDrillMetric || "open");
              renderWorkspace();
              if (win && typeof win.requestAnimationFrame === "function") {
                win.requestAnimationFrame(scrollToDrillIn);
                return;
              }
              scrollToDrillIn();
            });
          });
          doc.querySelectorAll("[data-manager-drill-clear]").forEach((button) => {
            button.addEventListener("click", () => {
              state.setManagerDashboardUserId("");
              state.setManagerDashboardMetric("open");
              renderWorkspace();
            });
          });
          doc.querySelectorAll("[data-manager-request-jump]").forEach((item) => {
            item.addEventListener("click", () => {
              if (typeof state.setActiveSection === "function") {
                state.setActiveSection("requests");
                storage?.setItem?.("maintainops.activeSection", "requests");
              }
              if (typeof state.setRequestViewFilter === "function") {
                state.setRequestViewFilter(item.dataset.managerRequestJump === "converted" ? "converted" : "active");
              }
              renderWorkspace();
            });
          });
        }
        window.MaintainOpsWorkspaceManagerDashboardEvents = {
          bindWorkspaceManagerDashboardEvents
        };
        if (typeof module !== "undefined") {
          module.exports = { bindWorkspaceManagerDashboardEvents };
        }
      })();
    }
  });

  // src/utils/csvExport.js
  var require_csvExport = __commonJS({
    "src/utils/csvExport.js"(exports, module) {
      (function() {
        function createCsvExportHelpers(deps = {}) {
          const documentRef = deps.documentRef || document;
          const URLRef = deps.URLRef || URL;
          const BlobCtor = deps.BlobCtor || Blob;
          const alertRef = deps.alertRef || alert;
          const matchesActiveLocation = typeof deps.matchesActiveLocation === "function" ? deps.matchesActiveLocation : () => true;
          const assetTypeLabel = typeof deps.assetTypeLabel === "function" ? deps.assetTypeLabel : (type) => String(type || "machine").replaceAll("_", " ");
          const assetTypeOrder = {
            machine: 10,
            forklift: 20,
            secondary_machine: 30,
            tooling: 40,
            component: 50,
            shop_item: 60
          };
          function assetPictureDocuments(assetId) {
            return (deps.getAssetDocumentsByAssetId?.()[assetId] || []).filter((document2) => String(document2.content_type || "").startsWith("image/") || document2.document_type === "machine_photo" || document2.document_type === "nameplate");
          }
          function assetPictureId(assetId) {
            return assetPictureDocuments(assetId).map((document2) => document2.original_file_name || document2.file_name || document2.storage_path || document2.id).filter(Boolean).join("; ");
          }
          function parentAssetName(asset, assetsById) {
            return asset?.parent_asset_id ? assetsById.get(asset.parent_asset_id)?.name || "" : "";
          }
          function locationName(locationId) {
            return deps.getLocations?.().find((location) => location.id === locationId)?.name || "";
          }
          function profileName(userId) {
            if (!userId) return "";
            const profile = deps.getProfilesByUserId?.()[userId];
            return profile?.full_name || profile?.email || userId;
          }
          function assetLocationSortKey(asset) {
            return String(locationName(asset.location_id) || asset.location_id || asset.location || "");
          }
          function archivedFinancialAsset(financial) {
            return {
              id: `financial:${financial.id}`,
              financialRecord: financial,
              name: financial.archived_asset_name || "Deleted equipment",
              asset_type: financial.archived_asset_type || "machine",
              asset_code: financial.archived_asset_code || "",
              manufacturer: financial.archived_manufacturer || "",
              model: financial.archived_model || "",
              location_id: financial.archived_location_id || "",
              location: financial.archived_location || "",
              status: "deleted"
            };
          }
          function financialAssetRows() {
            return [
              ...deps.getAssets(),
              ...(deps.getAssetFinancials?.() || []).filter((financial) => !financial.asset_id).map(archivedFinancialAsset)
            ];
          }
          function compareAssetsForAudit(a, b, assetsById) {
            const locationDelta = assetLocationSortKey(a).localeCompare(assetLocationSortKey(b));
            if (locationDelta) return locationDelta;
            const typeDelta = (assetTypeOrder[a.asset_type || "machine"] || 999) - (assetTypeOrder[b.asset_type || "machine"] || 999);
            if (typeDelta) return typeDelta;
            return String(parentAssetName(a, assetsById)).localeCompare(String(parentAssetName(b, assetsById))) || String(a.location || "").localeCompare(String(b.location || "")) || String(a.name || "").localeCompare(String(b.name || ""));
          }
          function assetAuditRows() {
            const assets = deps.getAssets().filter(matchesActiveLocation);
            const assetsById = new Map(assets.map((asset) => [asset.id, asset]));
            return [...assets].sort((a, b) => compareAssetsForAudit(a, b, assetsById)).map((asset) => ({
              equipment_type: assetTypeLabel(asset.asset_type),
              name: asset.name,
              parent_equipment: parentAssetName(asset, assetsById),
              serial_number: asset.asset_code || "",
              manufacturer: asset.manufacturer || "",
              model: asset.model || "",
              picture_id: assetPictureId(asset.id),
              picture_count: assetPictureDocuments(asset.id).length,
              picture_status: assetPictureDocuments(asset.id).length ? "attached" : "missing",
              facility: locationName(asset.location_id) || asset.location_id || "",
              area_department: asset.location || "",
              status: asset.status
            }));
          }
          function assetFinancialRows() {
            const assets = financialAssetRows();
            const assetsById = new Map(assets.map((asset) => [asset.id, asset]));
            const financialsByAssetId = deps.getAssetFinancialsByAssetId?.() || {};
            return [...assets].sort((a, b) => compareAssetsForAudit(a, b, assetsById)).map((asset) => {
              const financial = asset.financialRecord || financialsByAssetId[asset.id] || {};
              return {
                operational_status: asset.financialRecord ? "deleted" : "active",
                equipment_type: assetTypeLabel(asset.asset_type),
                name: asset.name,
                parent_equipment: parentAssetName(asset, assetsById),
                facility: locationName(asset.location_id) || asset.location_id || "",
                area_department: asset.location || "",
                serial_number: asset.asset_code || "",
                manufacturer: asset.manufacturer || "",
                model: asset.model || "",
                picture_status: assetPictureDocuments(asset.id).length ? "attached" : "missing",
                asset_tag: financial.asset_tag || "",
                acquisition_date: financial.acquisition_date || "",
                acquisition_cost: financial.acquisition_cost || "",
                depreciation_method: financial.depreciation_method || "",
                useful_life_years: financial.useful_life_years || "",
                current_book_value: financial.current_book_value || "",
                tax_jurisdiction: financial.tax_jurisdiction || "",
                ownership_status: financial.ownership_status || "",
                in_service_date: financial.in_service_date || "",
                disposal_date: financial.disposal_date || "",
                disposal_notes: financial.disposal_notes || "",
                gl_account_code: financial.gl_account_code || "",
                cost_center: financial.cost_center || "",
                finance_notes: financial.finance_notes || "",
                needs_review: Boolean(financial.needs_review),
                last_reviewed_at: financial.last_reviewed_at || "",
                reviewed_by: profileName(financial.reviewed_by)
              };
            });
          }
          function exportActiveSectionCsv() {
            const exports2 = {
              work: {
                filename: "work-orders.csv",
                rows: deps.getWorkOrders().map((workOrder) => ({
                  title: workOrder.title,
                  status: workOrder.status,
                  priority: workOrder.priority,
                  type: workOrder.type || "reactive",
                  equipment: workOrder.assets?.name || "",
                  assigned_to: deps.assignmentLabel(workOrder),
                  due_at: workOrder.due_at || "",
                  completed_at: workOrder.completed_at || "",
                  actual_minutes: workOrder.actual_minutes || 0,
                  failure_cause: workOrder.failure_cause || "",
                  resolution_summary: workOrder.resolution_summary || "",
                  follow_up_needed: Boolean(workOrder.follow_up_needed)
                }))
              },
              assets: {
                filename: "equipment.csv",
                rows: assetAuditRows()
              },
              financial: {
                filename: "equipment-financial.csv",
                rows: assetFinancialRows()
              },
              requests: {
                filename: "maintenance-requests.csv",
                rows: deps.getMaintenanceRequests().map((request) => ({
                  title: request.title,
                  status: request.status,
                  priority: request.priority,
                  equipment: request.assets?.name || "",
                  requested_by: deps.getProfilesByUserId()[request.requested_by]?.full_name || "",
                  created_at: request.created_at || "",
                  converted_work_order_id: request.converted_work_order_id || ""
                }))
              },
              pm: {
                filename: "preventive-schedules.csv",
                rows: deps.getPreventiveSchedules().map((schedule) => ({
                  title: schedule.title,
                  equipment: schedule.assets?.name || "",
                  frequency: schedule.frequency,
                  next_due_at: schedule.next_due_at,
                  active: schedule.active
                }))
              },
              parts: {
                filename: "parts.csv",
                rows: deps.getParts().map((part) => ({
                  name: part.name,
                  sku: part.sku || "",
                  supplier_name: part.supplier_name || "",
                  quantity_on_hand: part.quantity_on_hand,
                  reorder_point: part.reorder_point,
                  unit_cost: part.unit_cost || 0
                }))
              },
              procedures: {
                filename: "procedures.csv",
                rows: deps.getProcedureTemplates().map((template) => ({
                  name: template.name,
                  description: template.description || "",
                  steps: template.procedure_steps?.length || 0
                }))
              },
              team: {
                filename: "team.csv",
                rows: deps.getCompanyMembers().map((member) => ({
                  user_id: member.user_id,
                  name: deps.getProfilesByUserId()[member.user_id]?.full_name || "",
                  role: member.role
                }))
              }
            };
            const selected = exports2[deps.getActiveSection()] || exports2.work;
            if (!selected.rows.length) return alertRef("Nothing to export in this section yet.");
            downloadCsv(selected.filename, selected.rows);
          }
          function downloadCsv(filename, rows) {
            const headers = Object.keys(rows[0]);
            const lines = [
              headers.join(","),
              ...rows.map((row) => headers.map((header) => deps.csvCell(row[header])).join(","))
            ];
            const blob = new BlobCtor([`\uFEFF${lines.join("\n")}`], { type: "text/csv;charset=utf-8" });
            const url = URLRef.createObjectURL(blob);
            const link = documentRef.createElement("a");
            link.href = url;
            link.download = filename;
            documentRef.body.appendChild(link);
            link.click();
            link.remove();
            URLRef.revokeObjectURL(url);
          }
          return {
            downloadCsv,
            exportActiveSectionCsv
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createCsvExportHelpers };
        }
        window.MaintainOpsCsvExport = { createCsvExportHelpers };
      })();
    }
  });

  // src/utils/workspaceDatePickerControls.js
  var require_workspaceDatePickerControls = __commonJS({
    "src/utils/workspaceDatePickerControls.js"(exports, module) {
      (function() {
        function openDatePicker(input) {
          if (!input) return false;
          if (typeof input.focus === "function") input.focus();
          if (typeof input.showPicker === "function") {
            try {
              input.showPicker();
              return true;
            } catch (_error) {
            }
          }
          if (typeof input.click === "function") {
            input.click();
            return true;
          }
          return false;
        }
        function bindWorkspaceDatePickerControls(options = {}) {
          const doc = options.documentRef || document;
          doc.querySelectorAll("[data-open-date-picker]").forEach((button) => {
            button.addEventListener("click", () => {
              const field = button.closest("[data-date-picker-field]");
              const input = field?.querySelector('input[type="date"]');
              openDatePicker(input);
            });
          });
        }
        window.MaintainOpsWorkspaceDatePickerControls = {
          bindWorkspaceDatePickerControls,
          openDatePicker
        };
        if (typeof module !== "undefined") {
          module.exports = { bindWorkspaceDatePickerControls, openDatePicker };
        }
      })();
    }
  });

  // src/utils/publicRequestTokens.js
  var require_publicRequestTokens = __commonJS({
    "src/utils/publicRequestTokens.js"(exports, module) {
      (function() {
        function createPublicRequestTokenHelpers(options = {}) {
          const win = options.windowRef || window;
          function base64UrlEncodeBytes(bytes) {
            const binary = String.fromCharCode(...bytes);
            const encode = typeof win.btoa === "function" ? win.btoa.bind(win) : typeof btoa === "function" ? btoa : null;
            if (!encode) {
              return "";
            }
            return encode(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
          }
          function generatePublicRequestToken() {
            if (win.crypto?.getRandomValues) {
              const bytes = new Uint8Array(18);
              win.crypto.getRandomValues(bytes);
              return base64UrlEncodeBytes(bytes);
            }
            return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
          }
          return {
            generatePublicRequestToken
          };
        }
        window.MaintainOpsPublicRequestTokens = createPublicRequestTokenHelpers();
        if (typeof module !== "undefined") {
          module.exports = { createPublicRequestTokenHelpers };
        }
      })();
    }
  });

  // src/utils/workspacePublicRequestLinkAdminEvents.js
  var require_workspacePublicRequestLinkAdminEvents = __commonJS({
    "src/utils/workspacePublicRequestLinkAdminEvents.js"(exports, module) {
      (function() {
        function bindWorkspacePublicRequestLinkAdminEvents(options = {}) {
          const doc = options.documentRef || document;
          const createPublicRequestLink = options.createPublicRequestLink;
          const disablePublicRequestLink = options.disablePublicRequestLink;
          const setPublicRequestLinkActive = options.setPublicRequestLinkActive;
          const regeneratePublicRequestLink = options.regeneratePublicRequestLink;
          if (typeof createPublicRequestLink === "function") {
            doc.querySelectorAll("[data-create-public-request-link]").forEach((button) => {
              button.addEventListener("click", () => createPublicRequestLink(button.dataset.createPublicRequestLink));
            });
          }
          if (typeof disablePublicRequestLink === "function") {
            doc.querySelectorAll("[data-disable-public-request-link]").forEach((button) => {
              button.addEventListener("click", () => disablePublicRequestLink(button.dataset.disablePublicRequestLink));
            });
          }
          if (typeof setPublicRequestLinkActive === "function") {
            doc.querySelectorAll("[data-enable-public-request-link]").forEach((button) => {
              button.addEventListener("click", () => setPublicRequestLinkActive(button.dataset.enablePublicRequestLink, true));
            });
          }
          if (typeof regeneratePublicRequestLink === "function") {
            doc.querySelectorAll("[data-regenerate-public-request-link]").forEach((button) => {
              button.addEventListener("click", () => regeneratePublicRequestLink(button.dataset.regeneratePublicRequestLink));
            });
          }
        }
        window.MaintainOpsWorkspacePublicRequestLinkAdminEvents = {
          bindWorkspacePublicRequestLinkAdminEvents
        };
        if (typeof module !== "undefined") {
          module.exports = { bindWorkspacePublicRequestLinkAdminEvents };
        }
      })();
    }
  });

  // src/utils/workspaceEquipmentChoiceEvents.js
  var require_workspaceEquipmentChoiceEvents = __commonJS({
    "src/utils/workspaceEquipmentChoiceEvents.js"(exports, module) {
      (function() {
        const boundDocuments = /* @__PURE__ */ new WeakSet();
        function setEquipmentChoiceMode(group, mode, updateAssetLocationWarning) {
          if (!group) return;
          const existingField = group.querySelector("[data-equipment-choice-existing]");
          const newField = group.querySelector("[data-equipment-choice-new]");
          const useNew = mode === "new";
          group.querySelectorAll("[data-equipment-choice-mode]").forEach((control) => {
            const active = control.value === (useNew ? "new" : "existing");
            control.checked = active;
            control.closest("label")?.classList.toggle("active", active);
          });
          group.querySelectorAll("[data-equipment-choice-panel]").forEach((panel) => {
            panel.hidden = panel.dataset.equipmentChoicePanel !== (useNew ? "new" : "existing");
          });
          if (existingField) {
            existingField.disabled = useNew;
            existingField.required = !useNew && existingField.dataset.equipmentChoiceRequired === "true";
            if (useNew) existingField.value = "";
            if (typeof updateAssetLocationWarning === "function") updateAssetLocationWarning(existingField);
          }
          if (newField) {
            newField.disabled = !useNew;
            newField.required = useNew && newField.dataset.equipmentChoiceRequired === "true";
            if (!useNew) newField.value = "";
          }
        }
        function initializeEquipmentChoices(doc, updateAssetLocationWarning) {
          doc.querySelectorAll("[data-equipment-choice]").forEach((group) => {
            const selectedMode = group.querySelector("[data-equipment-choice-mode]:checked")?.value || "existing";
            setEquipmentChoiceMode(group, selectedMode, updateAssetLocationWarning);
          });
        }
        function bindWorkspaceEquipmentChoiceEvents(options = {}) {
          const doc = options.documentRef || document;
          const updateAssetLocationWarning = options.updateAssetLocationWarning;
          initializeEquipmentChoices(doc, updateAssetLocationWarning);
          if (boundDocuments.has(doc)) return;
          boundDocuments.add(doc);
          doc.addEventListener("change", (event) => {
            const modeControl = event.target.closest?.("[data-equipment-choice-mode]");
            if (modeControl) {
              setEquipmentChoiceMode(modeControl.closest("[data-equipment-choice]"), modeControl.value, updateAssetLocationWarning);
              return;
            }
            const existingField = event.target.closest?.("[data-equipment-choice-existing]");
            if (existingField && typeof updateAssetLocationWarning === "function") {
              updateAssetLocationWarning(existingField);
            }
          });
        }
        window.MaintainOpsWorkspaceEquipmentChoiceEvents = {
          bindWorkspaceEquipmentChoiceEvents,
          initializeEquipmentChoices,
          setEquipmentChoiceMode
        };
        if (typeof module !== "undefined") {
          module.exports = {
            bindWorkspaceEquipmentChoiceEvents,
            initializeEquipmentChoices,
            setEquipmentChoiceMode
          };
        }
      })();
    }
  });

  // src/workflows/quickFixWorkflow.js
  var require_quickFixWorkflow = __commonJS({
    "src/workflows/quickFixWorkflow.js"(exports, module) {
      (function() {
        function createQuickFixWorkflow(deps = {}) {
          const {
            documentRef = document,
            FormDataCtor = FormData,
            withOperationTimeout,
            createQuickFixAsset,
            getMaintenanceRequests,
            getQuickFixRequestId,
            getActiveCompanyId,
            getSession,
            getParts,
            getRequestsReady,
            getSupabaseClient,
            confirmAssetLocationRouting,
            assetRequiresSafety,
            blocksProcedureCompletion,
            setWorkOrderActionWarning,
            locationIdForAsset,
            descriptionWithRequestPhotoNote,
            descriptionWithAssignmentNote,
            assignedUserFromForm,
            procedureColumn,
            workOrderDateValue,
            applySafetyRequirementPayload,
            applySafetyCheckPayload,
            insertWithOptionalProcedure,
            friendlyWorkOrderSaveError,
            addPartUsageToWorkOrder,
            addPhotoToWorkOrder,
            updateAssetStatus,
            recordWorkOrderEvent,
            setActiveWorkOrderIdState,
            setActiveAssetIdState,
            setCreateWorkOrderMode,
            setQuickFixMode,
            setQuickFixAssetId,
            setQuickFixRequestId,
            showNotice,
            render,
            alertUser = (message) => window.alert(message)
          } = deps;
          async function createQuickFix(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorTarget = documentRef.querySelector("#quick-fix-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            if (errorTarget) errorTarget.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const title = String(form.get("title") || "").trim();
              if (!title) throw new Error("Quick Fix issue is required.");
              const currentQuickFixRequestId = getQuickFixRequestId();
              const currentActiveCompanyId = getActiveCompanyId();
              const currentSession = getSession();
              const issueDescription = String(form.get("description") || "").trim();
              const resolutionSummary = String(form.get("resolution_summary") || "").trim();
              const quickFixSummary = resolutionSummary || title;
              const workOrderDescription = issueDescription || title;
              const markCompleted = form.get("mark_completed") === "on";
              const machineDown = form.get("machine_down") === "on";
              let assetId = form.get("asset_id") || null;
              const sourceRequest = currentQuickFixRequestId ? getMaintenanceRequests().find((request) => request.id === currentQuickFixRequestId) : null;
              const newAssetName = String(form.get("new_asset_name") || "").trim();
              if (assetId && newAssetName) {
                throw new Error("Choose existing equipment or create new equipment, not both.");
              }
              if (newAssetName) {
                const { data: newAsset, error: assetError } = await withOperationTimeout(
                  createQuickFixAsset(newAssetName, machineDown ? "offline" : "running"),
                  "Equipment save timed out. Check your connection and try again."
                );
                if (assetError) {
                  if (errorTarget) errorTarget.textContent = assetError.message;
                  return;
                }
                assetId = newAsset.id;
              }
              if (!newAssetName && !confirmAssetLocationRouting(assetId, "logging this Quick Fix", errorTarget)) return;
              if (markCompleted && assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
                if (errorTarget) errorTarget.textContent = "Check safety devices before marking equipment work complete.";
                return;
              }
              const procedureCompletionMessage = markCompleted ? blocksProcedureCompletion(null, form.get("procedure_template_id") || null) : "";
              if (procedureCompletionMessage) {
                setWorkOrderActionWarning("", "");
                if (errorTarget) errorTarget.textContent = `${procedureCompletionMessage} Log it first, then complete the checklist before marking it complete.`;
                return;
              }
              const payload = {
                company_id: currentActiveCompanyId,
                location_id: locationIdForAsset(assetId),
                title,
                description: descriptionWithRequestPhotoNote(descriptionWithAssignmentNote(workOrderDescription, form.get("assigned_to")), sourceRequest),
                asset_id: assetId,
                assigned_to: assignedUserFromForm(form, currentSession.user.id),
                priority: form.get("priority") || "medium",
                type: form.get("type") || "corrective",
                status: markCompleted ? "completed" : "open",
                due_at: workOrderDateValue(form.get("due_at")),
                created_by: currentSession.user.id,
                ...procedureColumn(form.get("procedure_template_id")),
                actual_minutes: 0,
                failure_cause: form.get("failure_cause") || null,
                resolution_summary: markCompleted ? quickFixSummary : resolutionSummary || null,
                follow_up_needed: form.get("follow_up_needed") === "on",
                completion_notes: markCompleted ? quickFixSummary : null,
                completed_at: markCompleted ? (/* @__PURE__ */ new Date()).toISOString() : null
              };
              applySafetyRequirementPayload(payload);
              applySafetyCheckPayload(payload, markCompleted && payload.safety_check_required && form.get("safety_devices_checked") === "on");
              const { data, error } = await withOperationTimeout(
                insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
                "Quick Fix save timed out. Check your connection and try again."
              );
              if (error) {
                if (errorTarget) errorTarget.textContent = `Could not log quick fix: ${friendlyWorkOrderSaveError(error)}`;
                return;
              }
              const warnings = [];
              const partId = form.get("part_id");
              const quantity = Number(form.get("quantity_used")) || 1;
              if (partId) {
                const part = getParts().find((item) => item.id === partId);
                const partError = await withOperationTimeout(
                  addPartUsageToWorkOrder(data.id, part, quantity),
                  "Part usage save timed out.",
                  12e3
                ).catch((timeoutError) => timeoutError);
                if (partError) warnings.push(`part usage failed: ${partError.message}`);
              }
              const photo = form.get("photo");
              if (photo && photo.name) {
                const photoError = await withOperationTimeout(
                  addPhotoToWorkOrder(data.id, photo),
                  "Photo upload timed out.",
                  25e3
                ).catch((timeoutError) => timeoutError);
                if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
              }
              const assetStatus = machineDown ? "offline" : form.get("asset_status");
              if (payload.asset_id && !newAssetName && (machineDown || markCompleted && assetStatus)) {
                const assetError = await withOperationTimeout(
                  updateAssetStatus(payload.asset_id, assetStatus),
                  "Equipment status update timed out.",
                  12e3
                ).catch((timeoutError) => timeoutError);
                if (assetError) {
                  warnings.push(`equipment status did not update: ${assetError.message}`);
                } else {
                  await withOperationTimeout(
                    recordWorkOrderEvent(data.id, "asset_status_updated", machineDown ? "Equipment marked offline/down." : `Equipment status set to ${assetStatus}.`),
                    "Activity log timed out.",
                    8e3
                  ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
                }
              }
              await withOperationTimeout(
                recordWorkOrderEvent(data.id, "quick_fix", markCompleted ? "Quick fix recorded as completed." : "Quick fix logged and assigned to creator."),
                "Activity log timed out.",
                8e3
              ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
              if (newAssetName) {
                await withOperationTimeout(
                  recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from Quick Fix: ${newAssetName}.`),
                  "Activity log timed out.",
                  8e3
                ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
              }
              if (currentQuickFixRequestId && getRequestsReady()) {
                const requestUpdate = await withOperationTimeout(
                  getSupabaseClient().from("maintenance_requests").update({
                    status: "converted",
                    reviewed_by: currentSession.user.id,
                    reviewed_at: (/* @__PURE__ */ new Date()).toISOString(),
                    converted_work_order_id: data.id
                  }).eq("id", currentQuickFixRequestId).eq("company_id", currentActiveCompanyId),
                  "Request status update timed out.",
                  12e3
                ).catch((timeoutError) => ({ error: timeoutError }));
                if (requestUpdate.error) {
                  warnings.push(`request status did not update: ${requestUpdate.error.message}`);
                } else {
                  await withOperationTimeout(
                    recordWorkOrderEvent(data.id, "request_quick_fixed", markCompleted ? "Request resolved through Quick Fix." : "Request converted to a Quick Fix work order."),
                    "Activity log timed out.",
                    8e3
                  ).catch((logError) => warnings.push(`history did not update: ${logError.message}`));
                }
              }
              setActiveWorkOrderIdState(data.id);
              setActiveAssetIdState(null);
              setCreateWorkOrderMode(false);
              setQuickFixMode(false);
              setQuickFixAssetId(null);
              setQuickFixRequestId(null);
              showNotice(warnings.length ? `Quick Fix saved with warning: ${warnings[0]}` : "Quick Fix saved.", warnings.length ? "warning" : "success");
              await render();
            } catch (error) {
              if (errorTarget) errorTarget.textContent = `Could not log quick fix: ${error.message || error}`;
              else alertUser(error.message || error);
            } finally {
              if (submitButton && submitButton.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Log Quick Fix";
              }
            }
          }
          return { createQuickFix };
        }
        window.MaintainOpsQuickFixWorkflow = {
          createQuickFixWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createQuickFixWorkflow };
        }
      })();
    }
  });

  // src/workflows/messageWorkflow.js
  var require_messageWorkflow = __commonJS({
    "src/workflows/messageWorkflow.js"(exports, module) {
      (function() {
        function createMessageWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          function messageThreadMembersForType(threadType, directUserId) {
            if (threadType === "direct") return [deps.getSession().user.id, directUserId].filter(Boolean);
            return deps.getCompanyMembers().map((member) => member.user_id);
          }
          function bindMessageWorkflowEvents() {
            const messageThreadForm = documentRef.querySelector("#message-thread-form");
            if (messageThreadForm) {
              messageThreadForm.addEventListener("submit", createMessageThread);
            }
            const messageReplyForm = documentRef.querySelector("#message-reply-form");
            if (messageReplyForm) {
              messageReplyForm.addEventListener("submit", sendThreadReply);
            }
            documentRef.querySelectorAll("[data-delete-message]").forEach((button) => {
              button.addEventListener("click", deleteOwnMessage);
            });
            documentRef.querySelectorAll("[data-delete-message-thread]").forEach((button) => {
              button.addEventListener("click", deleteMessageThread);
            });
          }
          async function createMessageThread(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#message-thread-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (errorElement) errorElement.textContent = "";
            if (!deps.getMessagesReady()) {
              if (errorElement) errorElement.textContent = "Run supabase/step-next-message-center.sql before creating threads.";
              return;
            }
            const threadType = form.get("thread_type");
            const directUserId = form.get("direct_user_id");
            const memberIds = messageThreadMembersForType(threadType, directUserId);
            const title = String(form.get("title") || "").trim();
            const body = String(form.get("body") || "").trim();
            if (threadType === "company") {
              if (errorElement) errorElement.textContent = "Company-wide broadcast threads are disabled. Choose location or direct.";
              return;
            }
            if (threadType === "direct" && !directUserId) {
              if (errorElement) errorElement.textContent = "Choose a teammate for a direct message.";
              return;
            }
            if (!title || !body) {
              if (errorElement) errorElement.textContent = "Add a subject and message before starting the thread.";
              return;
            }
            if (!memberIds.includes(deps.getSession().user.id)) memberIds.push(deps.getSession().user.id);
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Starting...";
            }
            let threadStarted = false;
            try {
              const workOrderId = form.get("work_order_id") || null;
              const threadPayload = {
                company_id: deps.getActiveCompanyId(),
                location_id: threadType === "location" ? deps.activeLocationDatabaseId() : null,
                thread_type: threadType,
                title,
                created_by: deps.getSession().user.id
              };
              if (workOrderId && deps.getMessageWorkOrderLinksReady()) {
                threadPayload.work_order_id = workOrderId;
              }
              const { data: thread, error: threadError } = await deps.withOperationTimeout(
                deps.supabaseClient().from("message_threads").insert(threadPayload).select("*").single(),
                "Message thread save timed out. Check your connection and try again.",
                15e3
              );
              if (threadError) {
                if (deps.isMissingColumnError(threadError, "work_order_id")) {
                  deps.setMessageWorkOrderLinksReady(false);
                }
                throw threadError;
              }
              const memberRows = [...new Set(memberIds)].map((userId) => ({
                company_id: deps.getActiveCompanyId(),
                thread_id: thread.id,
                user_id: userId
              }));
              const { error: memberError } = await deps.withOperationTimeout(
                deps.supabaseClient().from("message_thread_members").insert(memberRows),
                "Message member save timed out. Check your connection and try again.",
                15e3
              );
              if (memberError) throw memberError;
              const { error: messageError } = await insertThreadMessage(thread.id, body);
              if (messageError) throw messageError;
              deps.setActiveMessageThreadId(thread.id);
              deps.setMessageComposerWorkOrderId("");
              deps.setMessageComposerOpen(false);
              await markMessageThreadRead(thread.id);
              deps.showNotice("Thread started.");
              threadStarted = true;
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
            } finally {
              if (!threadStarted && submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Start Thread";
              }
            }
          }
          async function sendThreadReply(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#message-reply-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const body = String(new FormDataCtor(formElement).get("body") || "").trim();
            if (!body) return;
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Sending...";
            }
            let replySent = false;
            try {
              const { error } = await insertThreadMessage(formElement.dataset.threadId, body);
              if (error) throw error;
              deps.showNotice("Message sent.");
              await markMessageThreadRead(formElement.dataset.threadId);
              replySent = true;
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = friendlyMessageCenterError(error);
            } finally {
              if (!replySent && submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Reply";
              }
            }
          }
          async function deleteOwnMessage(event) {
            const button = event.currentTarget;
            const messageId = button?.dataset?.deleteMessage;
            if (!messageId) return;
            if (typeof deps.confirmUser === "function" && !deps.confirmUser("Delete this message from the thread? Admins can still review the Supabase transcript if needed.")) {
              return;
            }
            button.disabled = true;
            button.textContent = "Deleting...";
            try {
              const response = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("soft_delete_own_message", { target_message_id: messageId }),
                "Message delete timed out. Check your connection and try again.",
                1e4
              );
              if (response.error) throw response.error;
              deps.showNotice("Message deleted.");
              await deps.render();
            } catch (error) {
              deps.showNotice(friendlyMessageCenterError(error), "warning");
              if (button.isConnected) {
                button.disabled = false;
                button.textContent = "Delete";
              }
            }
          }
          async function deleteMessageThread(event) {
            const button = event.currentTarget;
            const threadId = button?.dataset?.deleteMessageThread;
            if (!threadId) return;
            if (typeof deps.confirmUser === "function" && !deps.confirmUser("Delete this thread from your messages? Admins can still review the Supabase transcript if needed.")) {
              return;
            }
            button.disabled = true;
            button.textContent = "Deleting...";
            try {
              const response = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("soft_delete_own_message_thread", { target_thread_id: threadId }),
                "Message thread delete timed out. Check your connection and try again.",
                1e4
              );
              if (response.error) throw response.error;
              deps.setActiveMessageThreadId("");
              deps.showNotice("Thread deleted.");
              await deps.render();
            } catch (error) {
              deps.showNotice(friendlyMessageCenterError(error), "warning");
              if (button.isConnected) {
                button.disabled = false;
                button.textContent = "Delete Thread";
              }
            }
          }
          async function markMessageThreadRead(threadId) {
            if (!deps.getMessagesReady() || !threadId) return;
            const readAt = (/* @__PURE__ */ new Date()).toISOString();
            const readRow = {
              company_id: deps.getActiveCompanyId(),
              thread_id: threadId,
              user_id: deps.getSession().user.id,
              last_read_at: readAt
            };
            deps.setMessageThreadRead(threadId, readRow);
            const { error } = await deps.withOperationTimeout(
              deps.supabaseClient().from("message_reads").upsert(readRow, { onConflict: "thread_id,user_id" }),
              "Message read marker timed out.",
              8e3
            ).catch((error2) => ({ error: error2 }));
            if (error) deps.warn("Could not mark message thread read", error);
          }
          async function insertThreadMessage(threadId, body) {
            const message = await deps.withOperationTimeout(
              deps.supabaseClient().from("messages").insert({
                company_id: deps.getActiveCompanyId(),
                thread_id: threadId,
                sender_id: deps.getSession().user.id,
                body
              }),
              "Message save timed out. Check your connection and try again.",
              15e3
            );
            if (message.error) return { error: message.error };
            const thread = await deps.withOperationTimeout(
              deps.supabaseClient().from("message_threads").update({ updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", threadId).eq("company_id", deps.getActiveCompanyId()),
              "Message thread timestamp save timed out.",
              8e3
            ).catch((error) => ({ error }));
            return { error: thread.error };
          }
          function friendlyMessageCenterError(error) {
            const state = deps.messageCenterErrorState(error);
            if (state.messagesReady === false) deps.setMessagesReady(false);
            return state.message;
          }
          return {
            bindMessageWorkflowEvents,
            createMessageThread,
            sendThreadReply,
            deleteOwnMessage,
            deleteMessageThread,
            markMessageThreadRead,
            insertThreadMessage,
            friendlyMessageCenterError,
            messageThreadMembersForType
          };
        }
        window.MaintainOpsMessageWorkflow = {
          createMessageWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createMessageWorkflow };
        }
      })();
    }
  });

  // src/workflows/preventiveMaintenanceWorkflow.js
  var require_preventiveMaintenanceWorkflow = __commonJS({
    "src/workflows/preventiveMaintenanceWorkflow.js"(exports, module) {
      (function() {
        function createPreventiveMaintenanceWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const cssRef = deps.CSSRef || CSS;
          function bindPreventiveMaintenanceWorkflowEvents() {
            const forms = Array.from(documentRef.querySelectorAll?.("[data-create-pm-form]") || []);
            const legacyForm = documentRef.querySelector("#create-pm-form");
            if (legacyForm && !forms.includes(legacyForm)) forms.push(legacyForm);
            forms.forEach((pmForm) => pmForm.addEventListener("submit", createPreventiveSchedule));
          }
          async function createPreventiveSchedule(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorElement = formElement.querySelector("[data-pm-error]") || documentRef.querySelector("#pm-error");
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            try {
              const form = new FormDataCtor(formElement);
              if (!deps.confirmAssetLocationRouting(form.get("asset_id") || null, "this PM schedule", errorElement)) return;
              const { error } = await deps.withOperationTimeout(
                deps.insertWithOptionalProcedure("preventive_schedules", {
                  company_id: deps.getActiveCompanyId(),
                  location_id: deps.locationIdForAsset(form.get("asset_id")),
                  asset_id: form.get("asset_id"),
                  title: deps.requiredText(form.get("title"), "PM title"),
                  frequency: form.get("frequency"),
                  next_due_at: form.get("next_due_at"),
                  ...deps.procedureColumn(form.get("procedure_template_id")),
                  active: true,
                  created_by: deps.getSession().user.id
                }),
                "PM schedule save timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.showNotice("PM schedule added.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not add PM schedule.";
              else deps.alertUser(error.message || error);
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Schedule";
              }
            }
          }
          function requestDeletePreventiveSchedule(id) {
            if (!deps.canDeleteOperationalRecords()) {
              deps.alertUser("Only company admins and managers can delete PM schedules.");
              return;
            }
            if (!deps.getPreventiveSchedules().some((schedule) => schedule.id === id)) return;
            deps.setPendingDeleteScheduleId(id);
            deps.renderWorkspace();
          }
          async function deletePreventiveSchedule(id) {
            if (!deps.canDeleteOperationalRecords()) {
              deps.alertUser("Only company admins and managers can delete PM schedules.");
              return;
            }
            const schedule = deps.getPreventiveSchedules().find((item) => item.id === id);
            if (!schedule) return;
            const button = documentRef.querySelector(`[data-confirm-delete-schedule="${cssRef.escape(id)}"]`);
            if (button) {
              button.disabled = true;
              button.textContent = "Deleting...";
            }
            try {
              const { data, error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("preventive_schedules").delete().eq("id", id).eq("company_id", deps.getActiveCompanyId()).select("id"),
                "PM schedule delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              if (!data?.length) {
                throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
              }
              const verification = await deps.withOperationTimeout(
                deps.supabaseClient().from("preventive_schedules").select("id").eq("id", id).eq("company_id", deps.getActiveCompanyId()).maybeSingle(),
                "PM schedule delete verification timed out. Refresh and check the PM list.",
                15e3
              );
              if (verification.error) throw new Error(`PM schedule delete verification failed: ${verification.error.message}`);
              if (verification.data) throw new Error("PM schedule delete did not persist in Supabase.");
              deps.setPendingDeleteScheduleId(null);
              deps.showNotice("PM schedule deleted.");
              await deps.render();
            } catch (error) {
              deps.showNotice(error.message || "Could not delete PM schedule.", "warning");
              if (button) {
                button.disabled = false;
                button.textContent = "Permanently Delete";
              }
            }
          }
          async function generatePreventiveWorkOrder(scheduleId) {
            const schedule = deps.getPreventiveSchedules().find((item) => item.id === scheduleId);
            if (!schedule) return;
            const button = documentRef.querySelector(`[data-generate-pm="${cssRef.escape(scheduleId)}"]`);
            if (button) {
              button.disabled = true;
              button.textContent = "Generating...";
            }
            try {
              const payload = {
                company_id: deps.getActiveCompanyId(),
                location_id: deps.locationIdForAsset(schedule.asset_id),
                asset_id: schedule.asset_id,
                title: schedule.title,
                description: `Generated from preventive schedule: ${schedule.frequency}.`,
                priority: "medium",
                type: "preventive",
                status: "open",
                due_at: schedule.next_due_at,
                ...deps.procedureColumn(schedule.procedure_template_id),
                created_by: deps.getSession().user.id
              };
              deps.applySafetyRequirementPayload(payload);
              deps.applySafetyCheckPayload(payload, false);
              const { data, error } = await deps.withOperationTimeout(
                deps.insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
                "PM work order generation timed out."
              );
              if (error) throw error;
              deps.setActiveWorkOrderId(data.id);
              deps.setActiveSection("work");
              let scheduleWarning = "";
              try {
                const scheduleUpdate = await deps.withOperationTimeout(
                  deps.supabaseClient().from("preventive_schedules").update({ next_due_at: deps.nextDueDate(schedule.next_due_at, schedule.frequency) }).eq("id", schedule.id).eq("company_id", deps.getActiveCompanyId()),
                  "PM next due date update timed out."
                );
                if (scheduleUpdate.error) scheduleWarning = scheduleUpdate.error.message;
              } catch (updateError) {
                scheduleWarning = updateError.message || String(updateError);
              }
              deps.showNotice(
                scheduleWarning ? `PM work generated, but next due date did not update: ${scheduleWarning}` : "PM work order generated.",
                scheduleWarning ? "warning" : "success"
              );
              await deps.render();
            } catch (error) {
              deps.showNotice(`Could not generate PM work: ${error.message || error}`, "warning");
              if (button) {
                button.disabled = false;
                button.textContent = "Generate Work";
              }
            }
          }
          return {
            bindPreventiveMaintenanceWorkflowEvents,
            createPreventiveSchedule,
            requestDeletePreventiveSchedule,
            deletePreventiveSchedule,
            generatePreventiveWorkOrder
          };
        }
        window.MaintainOpsPreventiveMaintenanceWorkflow = {
          createPreventiveMaintenanceWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createPreventiveMaintenanceWorkflow };
        }
      })();
    }
  });

  // src/workflows/procedureWorkflow.js
  var require_procedureWorkflow = __commonJS({
    "src/workflows/procedureWorkflow.js"(exports, module) {
      (function() {
        function createProcedureWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const cssRef = deps.CSSRef || CSS;
          function bindProcedureWorkflowEvents() {
            const procedureForm = documentRef.querySelector("#create-procedure-form");
            if (procedureForm) procedureForm.addEventListener("submit", createProcedureTemplate);
            const sampleProcedureButton = documentRef.querySelector("#seed-sample-procedure");
            if (sampleProcedureButton) sampleProcedureButton.addEventListener("click", seedSampleProcedure);
            documentRef.querySelectorAll("[data-add-step]").forEach((form) => {
              form.addEventListener("submit", createProcedureStep);
            });
          }
          async function createProcedureTemplate(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorElement = documentRef.querySelector("#procedure-error");
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("procedure_templates").insert({
                  company_id: deps.getActiveCompanyId(),
                  name: deps.requiredText(form.get("name"), "Procedure checklist name"),
                  description: String(form.get("description") || "").trim() || null,
                  created_by: deps.getSession().user.id
                }),
                "Procedure save timed out."
              );
              if (error) throw error;
              deps.showNotice("Procedure checklist added.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not add procedure.";
              else deps.alertUser(error.message || error);
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Checklist";
              }
            }
          }
          async function seedSampleProcedure() {
            const button = documentRef.querySelector("#seed-sample-procedure");
            const existing = deps.getProcedureTemplates().find((template) => template.name.toLowerCase() === "basic equipment inspection");
            if (existing) {
              deps.showNotice("Sample inspection procedure already exists.", "warning");
              return;
            }
            if (button) {
              button.disabled = true;
              button.textContent = "Adding sample...";
            }
            try {
              const { data: template, error: templateError } = await deps.withOperationTimeout(
                deps.supabaseClient().from("procedure_templates").insert({
                  company_id: deps.getActiveCompanyId(),
                  name: "Basic Equipment Inspection",
                  description: "A simple starter checklist for visual checks, readings, and final pass/fail.",
                  created_by: deps.getSession().user.id
                }).select().single(),
                "Sample procedure save timed out."
              );
              if (templateError) throw templateError;
              const steps = [
                { position: 1, prompt: "Confirm lockout or safe operating condition", response_type: "checkbox", required: true },
                { position: 2, prompt: "Inspect for leaks, loose guards, or visible damage", response_type: "pass_fail", required: true },
                { position: 3, prompt: "Record operating reading", response_type: "number", required: false },
                { position: 4, prompt: "Add technician notes", response_type: "text", required: false }
              ].map((step) => ({
                ...step,
                company_id: deps.getActiveCompanyId(),
                procedure_template_id: template.id
              }));
              const { error: stepsError } = await deps.withOperationTimeout(
                deps.supabaseClient().from("procedure_steps").insert(steps),
                "Sample procedure steps save timed out."
              );
              if (stepsError) throw stepsError;
              deps.showNotice("Sample procedure checklist added.");
              await deps.render();
            } catch (error) {
              deps.showNotice(`Could not add sample procedure: ${error.message || error}`, "warning");
            } finally {
              if (button) {
                button.disabled = false;
                button.textContent = "Add sample inspection checklist";
              }
            }
          }
          async function createProcedureStep(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorElement = documentRef.querySelector(`[data-step-error="${formElement.dataset.addStep}"]`);
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const template = deps.getProcedureTemplates().find((item) => item.id === formElement.dataset.addStep);
              const nextPosition = (template?.procedure_steps?.length || 0) + 1;
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("procedure_steps").insert({
                  company_id: deps.getActiveCompanyId(),
                  procedure_template_id: formElement.dataset.addStep,
                  position: nextPosition,
                  prompt: deps.requiredText(form.get("prompt"), "Procedure checklist step"),
                  response_type: form.get("response_type"),
                  required: form.get("required") === "true"
                }),
                "Procedure step save timed out."
              );
              if (error) throw error;
              deps.showNotice("Procedure checklist step added.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not add procedure step.";
              else deps.alertUser(error.message || error);
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Step";
              }
            }
          }
          async function loadProcedureDeleteBlockers(templateId) {
            const [workOrdersCount, schedulesCount] = await Promise.all([
              countProcedureLinkedRows("work_orders", templateId),
              countProcedureLinkedRows("preventive_schedules", templateId)
            ]);
            return {
              workOrders: workOrdersCount,
              schedules: schedulesCount
            };
          }
          async function countProcedureLinkedRows(tableName, templateId) {
            const { count, error } = await deps.withOperationTimeout(
              deps.supabaseClient().from(tableName).select("id", { count: "exact", head: true }).eq("company_id", deps.getActiveCompanyId()).eq("procedure_template_id", templateId),
              `Procedure delete check timed out while checking ${tableName}.`,
              15e3
            );
            if (error) throw new Error(`Could not verify linked ${tableName.replaceAll("_", " ")} before deleting procedure: ${error.message}`);
            return count || 0;
          }
          async function requestDeleteProcedureTemplate(id) {
            if (!deps.canDeleteOperationalRecords()) {
              deps.alertUser("Only company admins and managers can delete procedures.");
              return;
            }
            if (!deps.getProcedureTemplates().some((template) => template.id === id)) return;
            const errorElement = documentRef.querySelector(`[data-procedure-delete-error="${cssRef.escape(id)}"]`);
            if (errorElement) errorElement.textContent = "";
            try {
              const blockers = await loadProcedureDeleteBlockers(id);
              const message = deps.procedureDeleteBlockerMessage(blockers);
              if (message) {
                if (errorElement) errorElement.textContent = message;
                return;
              }
              deps.setPendingDeleteProcedureId(id);
              deps.renderWorkspace();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not verify procedure links before delete.";
              else deps.showNotice(error.message || "Could not verify procedure links before delete.", "warning");
            }
          }
          async function deleteProcedureTemplate(id) {
            if (!deps.canDeleteOperationalRecords()) {
              deps.alertUser("Only company admins and managers can delete procedures.");
              return;
            }
            const template = deps.getProcedureTemplates().find((item) => item.id === id);
            if (!template) return;
            const button = documentRef.querySelector(`[data-confirm-delete-procedure="${cssRef.escape(id)}"]`);
            const errorElement = documentRef.querySelector(`[data-procedure-delete-error="${cssRef.escape(id)}"]`);
            if (errorElement) errorElement.textContent = "";
            if (button) {
              button.disabled = true;
              button.textContent = "Deleting...";
            }
            try {
              const blockers = await loadProcedureDeleteBlockers(id);
              const blockerMessage = deps.procedureDeleteBlockerMessage(blockers);
              if (blockerMessage) throw new Error(blockerMessage);
              const { data, error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("procedure_templates").delete().eq("id", id).eq("company_id", deps.getActiveCompanyId()).select("id"),
                "Procedure checklist delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              if (!data?.length) {
                throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
              }
              const verification = await deps.withOperationTimeout(
                deps.supabaseClient().from("procedure_templates").select("id").eq("id", id).eq("company_id", deps.getActiveCompanyId()).maybeSingle(),
                "Procedure checklist delete verification timed out. Refresh and check the checklist list.",
                15e3
              );
              if (verification.error) throw new Error(`Procedure checklist delete verification failed: ${verification.error.message}`);
              if (verification.data) throw new Error("Procedure checklist delete did not persist in Supabase.");
              deps.setPendingDeleteProcedureId(null);
              deps.showNotice("Procedure checklist deleted.");
              await deps.render();
            } catch (error) {
              const message = error.message || "Could not delete procedure.";
              deps.showNotice(message, "warning");
              if (errorElement) errorElement.textContent = message;
              if (button) {
                button.disabled = false;
                button.textContent = "Permanently Delete";
              }
            }
          }
          return {
            bindProcedureWorkflowEvents,
            createProcedureTemplate,
            seedSampleProcedure,
            createProcedureStep,
            loadProcedureDeleteBlockers,
            countProcedureLinkedRows,
            requestDeleteProcedureTemplate,
            deleteProcedureTemplate
          };
        }
        window.MaintainOpsProcedureWorkflow = {
          createProcedureWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createProcedureWorkflow };
        }
      })();
    }
  });

  // src/workflows/teamWorkflow.js
  var require_teamWorkflow = __commonJS({
    "src/workflows/teamWorkflow.js"(exports, module) {
      (function() {
        function createTeamWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          function bindTeamWorkflowEvents() {
            const memberForm = documentRef.querySelector("#add-member-form");
            if (memberForm) memberForm.addEventListener("submit", addCompanyMember);
            documentRef.querySelectorAll("[data-member-role]").forEach((form) => {
              form.addEventListener("submit", updateCompanyMemberRole);
            });
            const profileForm = documentRef.querySelector("#profile-form");
            if (profileForm) profileForm.addEventListener("submit", updateMyProfile);
            const passwordChangeForm = documentRef.querySelector("#password-change-form");
            if (passwordChangeForm) passwordChangeForm.addEventListener("submit", updateMyPassword);
            const inviteForm = documentRef.querySelector("#team-invite-form");
            if (inviteForm) inviteForm.addEventListener("submit", createTeamInvite);
            const inviteLinkForm = documentRef.querySelector("#team-invite-link-form");
            if (inviteLinkForm) inviteLinkForm.addEventListener("submit", createTeamInviteLink);
            documentRef.querySelectorAll("[data-revoke-invite-link]").forEach((button) => {
              button.addEventListener("click", () => {
                deps.setPendingRevokeInviteLinkId(button.dataset.revokeInviteLink);
                deps.renderWorkspace();
              });
            });
            documentRef.querySelectorAll("[data-revoke-invite-link-cancel]").forEach((button) => {
              button.addEventListener("click", () => {
                deps.setPendingRevokeInviteLinkId(null);
                deps.renderWorkspace();
              });
            });
            documentRef.querySelectorAll("[data-confirm-revoke-invite-link]").forEach((button) => {
              button.addEventListener("click", () => revokeTeamInviteLink(button.dataset.confirmRevokeInviteLink));
            });
            const requestNotificationForm = documentRef.querySelector("#request-notification-recipient-form");
            if (requestNotificationForm) requestNotificationForm.addEventListener("submit", createRequestNotificationRecipient);
            documentRef.querySelectorAll("[data-delete-request-notification-recipient]").forEach((button) => {
              button.addEventListener("click", () => deleteRequestNotificationRecipient(button.dataset.deleteRequestNotificationRecipient));
            });
          }
          async function addCompanyMember(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const form = new FormDataCtor(formElement);
            const selectedRole = String(form.get("role") || "technician").trim().toLowerCase();
            const submitButton = formElement.querySelector("button[type='submit']");
            if (!deps.canAdministerTeamRoles?.() && selectedRole !== "technician") {
              deps.alertUser("Only admins can grant manager or admin roles.");
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("company_members").insert({
                  company_id: deps.getActiveCompanyId(),
                  user_id: form.get("user_id"),
                  role: selectedRole
                }),
                "Team member save timed out."
              );
              if (error) throw error;
              await deps.render();
            } catch (error) {
              deps.alertUser(error.message || error);
            } finally {
              if (submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Member";
              }
            }
          }
          async function updateCompanyMemberRole(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const form = new FormDataCtor(formElement);
            const selectedRole = String(form.get("role") || "").trim().toLowerCase();
            const submitButton = formElement.querySelector("button[type='submit']");
            if (!deps.canAdministerTeamRoles?.()) {
              deps.showNotice("Only admins can change team roles.", "warning");
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("update_company_member_role", {
                  target_company_id: deps.getActiveCompanyId(),
                  target_user_id: formElement.dataset.memberRole,
                  new_role: selectedRole
                }),
                "Role save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                throw new Error(error.message.includes("update_company_member_role") ? "Run supabase/step-next-team-roles.sql before editing roles." : error.message);
              }
              await deps.loadMembers();
              deps.showNotice("Role saved.");
              deps.render();
            } catch (error) {
              deps.showNotice(`Could not save role: ${error.message || error}`, "warning");
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Role";
              }
            }
          }
          async function updateMyProfile(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#profile-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            const fullName = String(form.get("full_name") || "").trim();
            const mobileTechField = formElement.querySelector('input[name="mobile_tech"]');
            const mobileTech = mobileTechField ? mobileTechField.checked : Boolean(deps.getProfilesByUserId()[deps.getSession().user.id]?.mobile_tech);
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("profiles").upsert({
                  company_id: deps.getActiveCompanyId(),
                  user_id: deps.getSession().user.id,
                  full_name: fullName,
                  mobile_tech: mobileTech
                }, { onConflict: "company_id,user_id" }),
                "Profile save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isMissingColumnError(error, "mobile_tech")) {
                  throw new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings.");
                }
                throw error;
              }
              deps.showNotice("Profile saved.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not save profile.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Profile";
              }
            }
          }
          async function createTeamInvite(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#team-invite-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            const selectedRole = String(form.get("role") || "technician").trim().toLowerCase();
            if (errorElement) errorElement.textContent = "";
            if (!deps.getTeamInvitesReady()) {
              if (errorElement) errorElement.textContent = "Run supabase/step-next-invite-default-location.sql before inviting by email.";
              return;
            }
            if (!deps.canAdministerTeamRoles?.() && selectedRole !== "technician") {
              if (errorElement) errorElement.textContent = "Only admins can invite managers or admins.";
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Inviting...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("create_company_invite", {
                  target_company_id: deps.getActiveCompanyId(),
                  invite_email: String(form.get("email") || "").trim(),
                  invite_role: selectedRole,
                  invite_default_location_id: form.get("default_location_id") || null
                }),
                "Invite save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (error.message.includes("create_company_invite") || deps.isColumnSchemaError(error, ["company_invites"])) {
                  deps.setTeamInvitesReady(false);
                  throw new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.");
                }
                throw error;
              }
              deps.showNotice("Invite created.");
              deps.setTeamInviteCancelError("");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not create invite.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Create Invite";
              }
            }
          }
          async function cancelTeamInvite(inviteId) {
            if (!inviteId || !deps.getActiveCompanyId()) return;
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("cancel_company_invite", {
                  target_company_id: deps.getActiveCompanyId(),
                  target_invite_id: inviteId
                }),
                "Invite cancel timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (error.message.includes("cancel_company_invite")) {
                  throw new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites.");
                }
                throw error;
              }
              deps.setPendingCancelInviteId(null);
              deps.setTeamInviteCancelError("");
              deps.showNotice("Invite canceled.");
              await deps.loadTeamInvites();
              deps.renderWorkspace();
            } catch (error) {
              deps.setPendingCancelInviteId(null);
              deps.setTeamInviteCancelError(error.message || "Could not cancel invite.");
              deps.renderWorkspace();
            }
          }
          async function updateMyPassword(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#password-change-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            const password = String(form.get("password") || "");
            const confirmPassword = String(form.get("confirmPassword") || "");
            if (errorElement) errorElement.textContent = "";
            if (password.length < 8) {
              if (errorElement) errorElement.textContent = "Password must be at least 8 characters.";
              return;
            }
            if (password !== confirmPassword) {
              if (errorElement) errorElement.textContent = "Passwords do not match.";
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Updating...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().auth.updateUser({ password }),
                "Password update timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              if (typeof formElement.reset === "function") formElement.reset();
              deps.showNotice("Password updated.");
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not update password.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Update Password";
              }
            }
          }
          async function createTeamInviteLink(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#team-invite-link-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            const selectedRole = String(form.get("role") || "technician").trim().toLowerCase();
            if (errorElement) errorElement.textContent = "";
            deps.setTeamInviteLinkError("");
            if (!deps.getTeamInviteLinksReady()) {
              const message = "Run supabase/step-next-invite-links.sql before creating join links.";
              deps.setTeamInviteLinkError(message);
              if (errorElement) errorElement.textContent = message;
              return;
            }
            if (selectedRole === "admin") {
              const message = "Admin join links are not allowed.";
              deps.setTeamInviteLinkError(message);
              if (errorElement) errorElement.textContent = message;
              return;
            }
            if (!deps.canAdministerTeamRoles?.() && selectedRole !== "technician") {
              const message = "Managers can only create technician join links.";
              deps.setTeamInviteLinkError(message);
              if (errorElement) errorElement.textContent = message;
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Creating...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("create_company_invite_link", {
                  target_company_id: deps.getActiveCompanyId(),
                  link_role: selectedRole,
                  link_location_id: form.get("default_location_id") || null
                }),
                "Join link save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (error.message.includes("create_company_invite_link") || deps.isColumnSchemaError(error, ["company_invite_links"])) {
                  deps.setTeamInviteLinksReady(false);
                  throw new Error("Run supabase/step-next-invite-links.sql before creating join links.");
                }
                throw error;
              }
              deps.setTeamInviteLinkError("");
              deps.showNotice("Join link created.");
              await deps.loadTeamInviteLinks();
              deps.renderWorkspace();
            } catch (error) {
              const message = error.message || "Could not create join link.";
              deps.setTeamInviteLinkError(message);
              if (errorElement) errorElement.textContent = message;
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Create Join Link";
              }
            }
          }
          async function revokeTeamInviteLink(linkId) {
            if (!linkId || !deps.getActiveCompanyId()) return;
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("revoke_company_invite_link", {
                  link_id: linkId
                }),
                "Join link revoke timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (error.message.includes("revoke_company_invite_link") || deps.isColumnSchemaError(error, ["company_invite_links"])) {
                  deps.setTeamInviteLinksReady(false);
                  throw new Error("Run supabase/step-next-invite-links.sql before revoking join links.");
                }
                throw error;
              }
              deps.setPendingRevokeInviteLinkId(null);
              deps.setTeamInviteLinkError("");
              deps.showNotice("Join link revoked.");
              await deps.loadTeamInviteLinks();
              deps.renderWorkspace();
            } catch (error) {
              deps.setPendingRevokeInviteLinkId(null);
              deps.setTeamInviteLinkError(error.message || "Could not revoke join link.");
              deps.renderWorkspace();
            }
          }
          async function createRequestNotificationRecipient(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#request-notification-recipient-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (errorElement) errorElement.textContent = "";
            if (!deps.canAdministerTeamRoles?.()) {
              const message = "Only admins can change request email routing.";
              deps.setRequestNotificationRecipientError(message);
              if (errorElement) errorElement.textContent = message;
              return;
            }
            if (!deps.getRequestNotificationRecipientsReady()) {
              if (errorElement) errorElement.textContent = "Run supabase/step-next-request-notification-recipients.sql before routing request emails.";
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            try {
              const email = String(form.get("email") || "").trim().toLowerCase();
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("request_notification_recipients").insert({
                  company_id: deps.getActiveCompanyId(),
                  location_id: form.get("location_id") || null,
                  email,
                  label: String(form.get("label") || "").trim() || null,
                  is_active: true,
                  created_by: deps.getSession().user.id
                }),
                "Request email recipient save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isColumnSchemaError(error, ["request_notification_recipients"]) || error.message.includes("request_notification_recipients")) {
                  deps.setRequestNotificationRecipientsReady(false);
                  throw new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.");
                }
                throw error;
              }
              deps.setRequestNotificationRecipientError("");
              deps.showNotice("Request email recipient saved.");
              await deps.loadRequestNotificationRecipients();
              deps.renderWorkspace();
            } catch (error) {
              const message = error.message || "Could not save request email recipient.";
              deps.setRequestNotificationRecipientError(message);
              if (errorElement) errorElement.textContent = message;
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Recipient";
              }
            }
          }
          async function deleteRequestNotificationRecipient(recipientId) {
            if (!recipientId || !deps.getActiveCompanyId()) return;
            if (!deps.canAdministerTeamRoles?.()) {
              deps.setRequestNotificationRecipientError("Only admins can change request email routing.");
              deps.renderWorkspace();
              return;
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("request_notification_recipients").delete().eq("company_id", deps.getActiveCompanyId()).eq("id", recipientId),
                "Request email recipient remove timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isColumnSchemaError(error, ["request_notification_recipients"]) || error.message.includes("request_notification_recipients")) {
                  deps.setRequestNotificationRecipientsReady(false);
                  throw new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.");
                }
                throw error;
              }
              deps.setRequestNotificationRecipientError("");
              deps.showNotice("Request email recipient removed.");
              await deps.loadRequestNotificationRecipients();
              deps.renderWorkspace();
            } catch (error) {
              deps.setRequestNotificationRecipientError(error.message || "Could not remove request email recipient.");
              deps.renderWorkspace();
            }
          }
          return {
            bindTeamWorkflowEvents,
            addCompanyMember,
            updateCompanyMemberRole,
            updateMyProfile,
            updateMyPassword,
            createTeamInvite,
            cancelTeamInvite,
            createTeamInviteLink,
            revokeTeamInviteLink,
            createRequestNotificationRecipient,
            deleteRequestNotificationRecipient
          };
        }
        window.MaintainOpsTeamWorkflow = {
          createTeamWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createTeamWorkflow };
        }
      })();
    }
  });

  // src/workflows/companySettingsWorkflow.js
  var require_companySettingsWorkflow = __commonJS({
    "src/workflows/companySettingsWorkflow.js"(exports, module) {
      (function() {
        function createCompanySettingsWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          function bindCompanySettingsWorkflowEvents() {
            const settingsForm = documentRef.querySelector("#company-settings-form");
            if (settingsForm) settingsForm.addEventListener("submit", updateCompanySettings);
            const locationForm = documentRef.querySelector("#location-form");
            if (locationForm) locationForm.addEventListener("submit", createLocation);
            const publicAppUrlForm = documentRef.querySelector("#public-app-url-form");
            if (publicAppUrlForm) publicAppUrlForm.addEventListener("submit", savePublicAppUrl);
          }
          async function updateCompanySettings(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("companies").update({ name: deps.requiredText(form.get("name"), "Company name") }).eq("id", deps.getActiveCompanyId()),
                "Company save timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.showNotice("Company saved.");
              await deps.render();
            } catch (error) {
              deps.showNotice(`Could not save company: ${error.message || error}`, "warning");
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Company";
              }
            }
          }
          async function createLocation(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#location-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const name = String(new FormDataCtor(formElement).get("name") || "").trim();
            if (!name) return;
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            try {
              const { data, error } = await deps.withOperationTimeout(
                deps.createLocationRecord(deps.supabaseClient(), deps.getActiveCompanyId(), name),
                "Location save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isColumnSchemaError(error, ["locations"])) deps.setLocationsReady(false);
                throw new Error(deps.getLocationsReady() ? error.message : "Run supabase/step-next-locations.sql before adding locations.");
              }
              deps.setActiveLocationId(data.id);
              deps.persistActiveLocationId(data.id);
              deps.showNotice("Location added.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not add location.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Location";
              }
            }
          }
          function savePublicAppUrl(event) {
            event.preventDefault();
            const errorElement = documentRef.querySelector("#public-request-link-error");
            const rawUrl = String(new FormDataCtor(event.currentTarget).get("public_app_url") || "").trim();
            if (errorElement) errorElement.textContent = "";
            if (!rawUrl) {
              deps.setPublicAppUrlOverride("");
              deps.storage.removeItem("maintainops.publicAppUrl");
              deps.showNotice("Public app URL cleared.");
              deps.renderWorkspace();
              return;
            }
            const normalizedUrl = deps.normalizePublicAppUrl(rawUrl);
            if (!normalizedUrl) {
              if (errorElement) errorElement.textContent = "Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.";
              return;
            }
            deps.setPublicAppUrlOverride(normalizedUrl);
            deps.storage.setItem("maintainops.publicAppUrl", normalizedUrl);
            deps.showNotice("Public app URL saved.");
            deps.renderWorkspace();
          }
          return {
            bindCompanySettingsWorkflowEvents,
            updateCompanySettings,
            createLocation,
            savePublicAppUrl
          };
        }
        window.MaintainOpsCompanySettingsWorkflow = {
          createCompanySettingsWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createCompanySettingsWorkflow };
        }
      })();
    }
  });

  // src/workflows/appIssueWorkflow.js
  var require_appIssueWorkflow = __commonJS({
    "src/workflows/appIssueWorkflow.js"(exports, module) {
      (function() {
        function createAppIssueWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const windowRef = deps.windowRef || window;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const confirmUser = deps.confirmUser || ((message) => windowRef.confirm(message));
          function bindAppIssueWorkflowEvents() {
            const appIssueReportForm = documentRef.querySelector("#app-issue-report-form");
            if (appIssueReportForm) appIssueReportForm.addEventListener("submit", createAppIssueReport);
            documentRef.querySelectorAll("[data-app-issue-status]").forEach((form) => {
              form.addEventListener("submit", updateAppIssueReportStatus);
            });
            documentRef.querySelectorAll("[data-delete-app-issue]").forEach((button) => {
              button.addEventListener("click", deleteAppIssueReport);
            });
          }
          async function reloadAppIssueReports() {
            const { data, error } = await deps.withOperationTimeout(
              deps.listAppIssueReports(deps.supabaseClient(), deps.getActiveCompanyId()),
              "App issue report load timed out. Check your connection and try again.",
              12e3
            );
            deps.setAppIssueReportsReady(!error);
            deps.setAppIssueReports(error ? [] : data || []);
            if (error) throw error;
          }
          function appIssueReportError(error) {
            const state = deps.appIssueReportErrorState(error);
            if (state.appIssueReportsReady === false) deps.setAppIssueReportsReady(false);
            return state.message;
          }
          async function createAppIssueReport(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#app-issue-report-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Sending...";
            }
            try {
              const payload = {
                company_id: deps.getActiveCompanyId(),
                location_id: deps.activeLocationDatabaseId(),
                reporter_id: deps.getSession().user.id,
                screen: String(form.get("screen") || deps.getActiveSection() || "workspace").slice(0, 80),
                page_url: windowRef.location.href,
                severity: String(form.get("severity") || "normal"),
                title: deps.requiredText(form.get("title"), "Short title").slice(0, 140),
                details: deps.requiredText(form.get("details"), "Details"),
                status: "open"
              };
              const { error } = await deps.withOperationTimeout(
                deps.createAppIssueReportRecord(deps.supabaseClient(), payload),
                "App issue report save timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.setReportIssueMode(false);
              deps.showNotice("Issue report sent.");
              await reloadAppIssueReports();
              deps.renderWorkspace();
            } catch (error) {
              if (errorElement) errorElement.textContent = appIssueReportError(error);
            } finally {
              if (submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Report";
              }
            }
          }
          async function updateAppIssueReportStatus(event) {
            event.preventDefault();
            if (!deps.canManageTeam()) return;
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const nextStatus = String(form.get("status") || "open");
              const { error } = await deps.withOperationTimeout(
                deps.updateAppIssueReportStatusRecord(
                  deps.supabaseClient(),
                  deps.getActiveCompanyId(),
                  formElement.dataset.appIssueStatus,
                  nextStatus
                ),
                "Issue report status save timed out. Check your connection and try again.",
                12e3
              );
              if (error) throw error;
              deps.showNotice("Issue report updated.");
              await reloadAppIssueReports();
              deps.renderWorkspace();
            } catch (error) {
              deps.showNotice(`Could not update issue report: ${appIssueReportError(error)}`, "warning");
            } finally {
              if (submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Save";
              }
            }
          }
          async function deleteAppIssueReport(event) {
            event.preventDefault();
            if (!deps.canManageTeam()) return;
            const button = event.currentTarget;
            const reportId = button.dataset.deleteAppIssue;
            if (!reportId) return;
            if (!confirmUser("Delete this app issue report? This cannot be undone.")) return;
            button.disabled = true;
            const originalText = button.textContent;
            button.textContent = "Deleting...";
            try {
              const { error } = await deps.withOperationTimeout(
                deps.deleteAppIssueReportRecord(
                  deps.supabaseClient(),
                  deps.getActiveCompanyId(),
                  reportId
                ),
                "Issue report delete timed out. Check your connection and try again.",
                12e3
              );
              if (error) throw error;
              deps.showNotice("Issue report deleted.");
              await reloadAppIssueReports();
              deps.renderWorkspace();
            } catch (error) {
              deps.showNotice(`Could not delete issue report: ${appIssueReportError(error)}`, "warning");
            } finally {
              if (button?.isConnected) {
                button.disabled = false;
                button.textContent = originalText || "Delete";
              }
            }
          }
          return {
            bindAppIssueWorkflowEvents,
            reloadAppIssueReports,
            appIssueReportError,
            createAppIssueReport,
            updateAppIssueReportStatus,
            deleteAppIssueReport
          };
        }
        window.MaintainOpsAppIssueWorkflow = {
          createAppIssueWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createAppIssueWorkflow };
        }
      })();
    }
  });

  // src/workflows/publicRequestLinkWorkflow.js
  var require_publicRequestLinkWorkflow = __commonJS({
    "src/workflows/publicRequestLinkWorkflow.js"(exports, module) {
      (function() {
        function createPublicRequestLinkWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const windowRef = deps.windowRef || window;
          const cssRef = deps.CSSRef || CSS;
          async function createPublicRequestLink(locationId) {
            const errorElement = documentRef.querySelector("#public-request-link-error");
            const button = documentRef.querySelector(`[data-create-public-request-link="${cssRef.escape(locationId)}"]`);
            if (errorElement) errorElement.textContent = "";
            if (button) {
              button.disabled = true;
              button.textContent = "Creating...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("ensure_location_request_link", {
                  target_location_id: locationId
                }),
                "QR link save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                deps.setPublicRequestLinksReady(false);
                throw new Error(error.message.includes("ensure_location_request_link") ? "Run supabase/step-next-public-request-links.sql before creating QR request links." : error.message);
              }
              deps.showNotice("Location request QR link ready.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not create QR request link.";
            } finally {
              if (button) {
                button.disabled = false;
                button.textContent = "Create QR Link";
              }
            }
          }
          async function disablePublicRequestLink(linkId) {
            if (!deps.canAdministerPublicRequestLinks()) {
              const errorElement = documentRef.querySelector("#public-request-link-error");
              if (errorElement) errorElement.textContent = "Only admins can disable posted QR request links.";
              return;
            }
            const confirmed = windowRef.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.");
            if (!confirmed) return;
            await setPublicRequestLinkActive(linkId, false);
          }
          async function setPublicRequestLinkActive(linkId, isActive) {
            if (!deps.canAdministerPublicRequestLinks()) {
              const errorElement = documentRef.querySelector("#public-request-link-error");
              if (errorElement) errorElement.textContent = "Only admins can reactivate or disable posted QR request links.";
              return;
            }
            await updatePublicRequestLink(
              linkId,
              { is_active: Boolean(isActive) },
              isActive ? "Request link reactivated." : "Request link disabled."
            );
          }
          async function regeneratePublicRequestLink(linkId) {
            if (!deps.canAdministerPublicRequestLinks()) {
              const errorElement = documentRef.querySelector("#public-request-link-error");
              if (errorElement) errorElement.textContent = "Only admins can replace posted QR request links.";
              return;
            }
            const confirmed = windowRef.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.");
            if (!confirmed) return;
            await updatePublicRequestLink(
              linkId,
              {
                token: deps.generatePublicRequestToken(),
                is_active: true
              },
              "Request QR regenerated."
            );
          }
          async function updatePublicRequestLink(linkId, patch, successMessage) {
            const errorElement = documentRef.querySelector("#public-request-link-error");
            if (errorElement) errorElement.textContent = "";
            if (!deps.canAdministerPublicRequestLinks()) {
              if (errorElement) errorElement.textContent = "Only admins can replace, disable, or reactivate posted QR request links.";
              return;
            }
            if (!linkId || !deps.getActiveCompanyId()) {
              if (errorElement) errorElement.textContent = "Select a company before updating request links.";
              return;
            }
            try {
              const { data, error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("public_request_links").update({
                  ...patch,
                  updated_at: (/* @__PURE__ */ new Date()).toISOString()
                }).eq("id", linkId).eq("company_id", deps.getActiveCompanyId()).select("id"),
                "Request link update timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (errorElement) errorElement.textContent = error.message;
                return;
              }
              if (!data?.length) {
                if (errorElement) {
                  errorElement.textContent = "Could not update the request link. Check that your company role is admin or manager.";
                }
                return;
              }
              deps.showNotice(successMessage);
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not update the request link.";
            }
          }
          return {
            createPublicRequestLink,
            disablePublicRequestLink,
            setPublicRequestLinkActive,
            regeneratePublicRequestLink,
            updatePublicRequestLink
          };
        }
        window.MaintainOpsPublicRequestLinkWorkflow = {
          createPublicRequestLinkWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createPublicRequestLinkWorkflow };
        }
      })();
    }
  });

  // src/workflows/partInventoryWorkflow.js
  var require_partInventoryWorkflow = __commonJS({
    "src/workflows/partInventoryWorkflow.js"(exports, module) {
      (function() {
        function createPartInventoryWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          function bindPartInventoryWorkflowEvents() {
            const partForm = documentRef.querySelector("#create-part-form");
            if (partForm) partForm.addEventListener("submit", createPart);
            documentRef.querySelectorAll("[data-restock-part]").forEach((form) => {
              form.addEventListener("submit", restockPart);
            });
            documentRef.querySelectorAll("[data-use-part]").forEach((form) => {
              form.addEventListener("submit", usePartFromInventory);
            });
            documentRef.querySelectorAll("[data-edit-part]").forEach((form) => {
              form.addEventListener("submit", updatePart);
            });
            documentRef.querySelectorAll("[data-rename-part-source]").forEach((form) => {
              form.addEventListener("submit", renamePartSource);
            });
          }
          async function createPart(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#part-create-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Adding...";
            }
            let saveTimeoutId;
            try {
              const payload = {
                company_id: deps.getActiveCompanyId(),
                location_id: deps.activeLocationDatabaseId(),
                name: String(form.get("name") || "").trim(),
                sku: String(form.get("sku") || "").trim() || null,
                supplier_name: String(form.get("supplier_name") || "").trim() || null,
                machine_note: String(form.get("machine_note") || "").trim() || null,
                quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
                reorder_point: Number(form.get("reorder_point")) || 0,
                unit_cost: Number(form.get("unit_cost")) || 0
              };
              if (!payload.company_id) throw new Error("Choose a company before adding parts.");
              if (!payload.name) throw new Error("Part name is required.");
              const saveTimeout = new Promise((_, reject) => {
                saveTimeoutId = setTimeout(() => reject(new Error("Part save timed out. Check your connection and try again.")), 2e4);
              });
              const { data, error } = await Promise.race([
                deps.supabaseClient().from("parts").insert(payload).select("id").single(),
                saveTimeout
              ]);
              clearTimeout(saveTimeoutId);
              if (error && deps.isMissingColumnError(error, "location_id")) {
                deps.setLocationsReady(false);
                throw new Error(deps.databaseSetupRequiredMessage("saving parts by location"));
              }
              if (error && deps.isMissingColumnError(error, "supplier_name")) {
                deps.setPartSuppliersReady(false);
                throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");
              }
              if (error && deps.isMissingColumnError(error, "unit_cost")) {
                deps.setPartCostsReady(false);
                throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");
              }
              if (error && deps.isMissingColumnError(error, "machine_note")) {
                deps.setPartMachineNotesReady(false);
                throw new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");
              }
              if (error) throw error;
              deps.setActivePartId(data?.id || null);
              deps.clearPartSearchState();
              deps.showNotice("Part added.");
              formElement.reset();
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not add part.";
            } finally {
              if (saveTimeoutId) clearTimeout(saveTimeoutId);
              if (submitButton && submitButton.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Add Part";
              }
            }
          }
          async function restockPart(event) {
            event.preventDefault();
            const formElement = event.target;
            const submitButton = formElement.querySelector("button[type='submit']");
            const part = deps.getParts().find((item) => item.id === formElement.dataset.restockPart);
            const quantity = Number(new FormDataCtor(formElement).get("quantity")) || 0;
            if (!part || quantity <= 0) return;
            const originalText = submitButton?.textContent || "Restock";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("parts").update({ quantity_on_hand: (Number(part.quantity_on_hand) || 0) + quantity }).eq("id", part.id).eq("company_id", deps.getActiveCompanyId()),
                "Part restock timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.showNotice("Part restocked.");
              await deps.render();
            } catch (error) {
              deps.showNotice(`Could not restock part: ${error.message || error}`, "warning");
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
              }
            }
          }
          async function usePartFromInventory(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const part = deps.getParts().find((item) => item.id === formElement.dataset.usePart);
            const quantity = Number(new FormDataCtor(formElement).get("quantity")) || 0;
            if (!part || quantity <= 0) return;
            const originalText = submitButton?.textContent || "Use";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const currentQuantity = Number(part.quantity_on_hand) || 0;
              const nextQuantity = Math.max(0, currentQuantity - quantity);
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("parts").update({ quantity_on_hand: nextQuantity }).eq("id", part.id).eq("company_id", deps.getActiveCompanyId()),
                "Part use save timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.showNotice("Part used.");
              await deps.render();
            } catch (error) {
              deps.showNotice(`Could not use part: ${error.message || error}`, "warning");
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
              }
            }
          }
          async function updatePart(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const partId = formElement.dataset.editPart;
            const errorElement = documentRef.querySelector(`[data-part-edit-error="${partId}"]`);
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            if (errorElement) errorElement.textContent = "";
            const originalText = submitButton?.textContent || "Save Part";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            const payload = {
              name: String(form.get("name") || "").trim(),
              sku: form.get("sku") || null,
              supplier_name: form.get("supplier_name") || null,
              machine_note: form.get("machine_note") || null,
              quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
              reorder_point: Number(form.get("reorder_point")) || 0,
              unit_cost: Number(form.get("unit_cost")) || 0
            };
            try {
              if (!payload.name) throw new Error("Part name is required.");
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("parts").update(payload).eq("id", partId).eq("company_id", deps.getActiveCompanyId()),
                "Part save timed out. Check your connection and try again.",
                15e3
              );
              if (error && deps.isMissingColumnError(error, "supplier_name")) {
                deps.setPartSuppliersReady(false);
                throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");
              }
              if (error && deps.isMissingColumnError(error, "unit_cost")) {
                deps.setPartCostsReady(false);
                throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");
              }
              if (error && deps.isMissingColumnError(error, "machine_note")) {
                deps.setPartMachineNotesReady(false);
                throw new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");
              }
              if (error) throw error;
              deps.setActivePartId(null);
              deps.clearPartSearchState();
              deps.showNotice("Part saved.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not save part.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
              }
            }
          }
          async function renamePartSource(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#part-source-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const form = new FormDataCtor(formElement);
            const oldSource = String(form.get("old_source") || "").trim();
            const newSource = String(form.get("new_source") || "").trim();
            if (errorElement) errorElement.textContent = "";
            if (!oldSource) return;
            if (!deps.getPartSuppliersReady()) {
              if (errorElement) errorElement.textContent = "Run supabase/step-next-part-suppliers.sql before editing sources.";
              return;
            }
            if (oldSource === newSource) {
              if (errorElement) errorElement.textContent = "Change the source name before saving.";
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Renaming...";
            }
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("parts").update({ supplier_name: newSource || null }).eq("company_id", deps.getActiveCompanyId()).eq("supplier_name", oldSource),
                "Part source rename timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isMissingColumnError(error, "supplier_name")) deps.setPartSuppliersReady(false);
                throw new Error(deps.getPartSuppliersReady() ? error.message : "Run supabase/step-next-part-suppliers.sql before editing sources.");
              }
              deps.showNotice("Part source updated.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not update part source.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Rename";
              }
            }
          }
          return {
            bindPartInventoryWorkflowEvents,
            createPart,
            restockPart,
            usePartFromInventory,
            updatePart,
            renamePartSource
          };
        }
        window.MaintainOpsPartInventoryWorkflow = {
          createPartInventoryWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createPartInventoryWorkflow };
        }
      })();
    }
  });

  // src/workflows/workOrderQuickUpdateWorkflow.js
  var require_workOrderQuickUpdateWorkflow = __commonJS({
    "src/workflows/workOrderQuickUpdateWorkflow.js"(exports, module) {
      (function() {
        function createWorkOrderQuickUpdateWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const consoleRef = deps.consoleRef || console;
          async function updateWorkOrderQuickView(event) {
            event.preventDefault();
            const formElement = event.target;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorTarget = documentRef.querySelector("#quick-update-error");
            const previous = deps.getWorkOrders().find((workOrder) => workOrder.id === deps.getActiveWorkOrderId());
            const form = new FormDataCtor(formElement);
            submitButton.disabled = true;
            submitButton.textContent = "Saving...";
            if (errorTarget) errorTarget.textContent = "";
            try {
              let assetId = form.get("asset_id") || null;
              const newAssetName = String(form.get("new_asset_name") || "").trim();
              if (assetId && newAssetName) {
                throw new Error("Choose existing equipment or create new equipment, not both.");
              }
              if (newAssetName) {
                const { data: newAsset, error: assetError } = await deps.createQuickFixAsset(newAssetName, "running");
                if (assetError) {
                  submitButton.disabled = false;
                  submitButton.textContent = "Save Quick Update";
                  if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
                  return;
                }
                assetId = newAsset.id;
              }
              if (!newAssetName && !deps.confirmAssetLocationRouting(assetId, "saving this work update", errorTarget)) return;
              const payload = {
                title: deps.requiredText(form.get("title"), "Issue"),
                description: deps.descriptionWithAssignmentNote(previous?.description || "", form.get("assigned_to")),
                asset_id: assetId,
                location_id: deps.locationIdForAsset(assetId),
                due_at: deps.workOrderDateValue(form.get("due_at")),
                status: form.get("status"),
                priority: form.get("priority"),
                assigned_to: deps.assignedUserFromForm(form),
                ...deps.procedureColumn(form.get("procedure_template_id")),
                resolution_summary: form.get("resolution_summary") || null
              };
              deps.applySafetyRequirementPayload(payload);
              const safetyChecked = form.get("safety_devices_checked") === "on";
              if (payload.status === "completed" && previous?.status !== "completed") {
                const procedureCompletionMessage = deps.blocksProcedureCompletion(previous, payload.procedure_template_id || null);
                if (procedureCompletionMessage) {
                  deps.setWorkOrderActionWarning(deps.getActiveWorkOrderId(), procedureCompletionMessage);
                  submitButton.disabled = false;
                  submitButton.textContent = "Save Quick Update";
                  if (errorTarget) errorTarget.textContent = procedureCompletionMessage;
                  return;
                }
                deps.applySafetyCheckPayload(payload, safetyChecked);
                if (deps.requiresSafetyDeviceCheck(payload) && !payload.safety_devices_checked) {
                  submitButton.disabled = false;
                  submitButton.textContent = "Save Quick Update";
                  if (errorTarget) errorTarget.textContent = "Check safety devices before completing work tied to equipment.";
                  return;
                }
                payload.completed_at = (/* @__PURE__ */ new Date()).toISOString();
              }
              if (payload.status !== "completed") {
                payload.completed_at = null;
                deps.applySafetyCheckPayload(payload, false);
              } else if (previous?.status === "completed") {
                deps.applySafetyCheckPayload(payload, payload.safety_check_required && (safetyChecked || deps.hasCompletedSafetyDeviceCheck(previous)));
              }
              const { error } = await deps.withOperationTimeout(
                deps.updateWorkOrderSafely(payload, deps.getActiveWorkOrderId()),
                "Quick update save timed out. Check your connection and try again.",
                2e4
              );
              if (error) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Quick Update";
                if (errorTarget) errorTarget.textContent = `Could not save update: ${deps.friendlyWorkOrderSaveError(error)}`;
                return;
              }
              const warnings = [];
              if (payload.asset_id && form.get("machine_down") === "on") {
                const assetError = await deps.updateAssetStatus(payload.asset_id, "offline");
                if (assetError) {
                  warnings.push(`equipment status did not update: ${assetError.message}`);
                } else {
                  await deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "asset_status_updated", "Equipment marked offline/down.");
                }
              }
              const logError = await deps.withOperationTimeout(
                deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "quick_update", deps.describeWorkOrderChanges(previous, Object.fromEntries(form.entries()))),
                "Activity log timed out.",
                8e3
              ).catch((error2) => error2);
              if (newAssetName) {
                await deps.withOperationTimeout(
                  deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "equipment_created", `Equipment created from work order: ${newAssetName}.`),
                  "Activity log timed out.",
                  8e3
                ).catch(() => null);
              }
              if (logError) warnings.push(`history did not update: ${logError.message}`);
              deps.setWorkOrderActionWarning("", "");
              deps.showNotice(warnings.length ? `Quick update saved with warning: ${warnings[0]}` : "Quick update saved.", warnings.length ? "warning" : "success");
              await deps.render();
            } catch (error) {
              consoleRef.error("Quick update save failed", error);
              submitButton.disabled = false;
              submitButton.textContent = "Save Quick Update";
              if (errorTarget) errorTarget.textContent = `Could not save update: ${error.message || error}`;
            }
          }
          return {
            updateWorkOrderQuickView
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createWorkOrderQuickUpdateWorkflow };
        }
        window.MaintainOpsWorkOrderQuickUpdateWorkflow = { createWorkOrderQuickUpdateWorkflow };
      })();
    }
  });

  // src/workflows/assetWorkflow.js
  var require_assetWorkflow = __commonJS({
    "src/workflows/assetWorkflow.js"(exports, module) {
      (function() {
        function createAssetWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const alertRef = deps.alertRef || alert;
          const CSSRef = deps.CSSRef || CSS;
          function areaSpotFromForm(form) {
            return String(form.get("location_new") || form.get("location_existing") || form.get("location") || "").trim() || null;
          }
          function currentUserId() {
            return deps.getSession?.()?.user?.id || null;
          }
          function assetById(assetId) {
            return (deps.getAssets?.() || []).find((asset) => asset.id === assetId) || null;
          }
          function changedFieldLabels(previous, next) {
            if (!previous) return [];
            const labels = {
              name: "name",
              asset_code: "serial number",
              manufacturer: "manufacturer",
              model: "model",
              location_id: "location",
              location: "area / spot",
              parent_asset_id: "primary equipment",
              asset_type: "type",
              safety_devices_required: "safety requirement",
              status: "status"
            };
            return Object.keys(labels).filter((key) => String(previous[key] ?? "") !== String(next[key] ?? "")).map((key) => labels[key]);
          }
          function isMissingAuditFieldColumn(error) {
            return deps.isMissingColumnError(error, "manufacturer") || deps.isMissingColumnError(error, "model");
          }
          async function createAsset(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#asset-create-error");
            if (errorElement) errorElement.textContent = "";
            const submitButton = formElement.querySelector("button[type='submit']");
            const originalButtonText = submitButton?.textContent || "Add Equipment";
            const shouldContinue = event.submitter?.dataset?.assetContinue === "true";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const payload = {
                company_id: deps.getActiveCompanyId(),
                location_id: form.get("location_id") || deps.activeLocationDatabaseId(),
                name: deps.requiredText(form.get("name"), "Equipment name"),
                asset_code: String(form.get("asset_code") || "").trim() || null,
                manufacturer: String(form.get("manufacturer") || "").trim() || null,
                model: String(form.get("model") || "").trim() || null,
                location: areaSpotFromForm(form),
                parent_asset_id: form.get("parent_asset_id") || null,
                asset_type: form.get("asset_type") || "machine",
                safety_devices_required: form.get("safety_devices_required") === "on",
                status: "running",
                created_by: currentUserId()
              };
              const query = deps.supabaseClient().from("assets").insert(payload).select("id").single();
              const { data, error } = await deps.withOperationTimeout(
                query,
                "Equipment save timed out. Check your connection and try again.",
                15e3
              );
              if (error && deps.isMissingColumnError(error, "location_id")) {
                deps.setLocationsReady(false);
                throw new Error(deps.databaseSetupRequiredMessage("saving equipment locations"));
              }
              if (error && deps.isMissingColumnError(error, "created_by")) {
                throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");
              }
              if (error && isMissingAuditFieldColumn(error)) {
                throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");
              }
              if (error && deps.isAssetHierarchySchemaError(error)) {
                throw new Error(deps.equipmentSchemaMessage(error));
              }
              if (error) throw error;
              if (data?.id && typeof deps.recordAssetEvent === "function") {
                await deps.recordAssetEvent(data.id, "created", `Created ${payload.name}.`);
              }
              if (shouldContinue && data?.id) {
                deps.setActiveAssetId(data.id);
                deps.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.");
              } else {
                deps.showNotice("Equipment added.");
              }
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message;
              else alertRef(error.message);
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
              }
            }
          }
          async function updateAsset(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#asset-edit-error");
            if (errorElement) errorElement.textContent = "";
            const submitButton = formElement.querySelector("button[type='submit']");
            const originalButtonText = submitButton?.textContent || "Save Equipment";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const previous = assetById(deps.getActiveAssetId());
              const payload = {
                name: deps.requiredText(form.get("name"), "Equipment name"),
                asset_code: String(form.get("asset_code") || "").trim() || null,
                manufacturer: String(form.get("manufacturer") || "").trim() || null,
                model: String(form.get("model") || "").trim() || null,
                location_id: form.get("location_id") || deps.activeLocationDatabaseId(),
                location: areaSpotFromForm(form),
                parent_asset_id: form.get("parent_asset_id") || null,
                asset_type: form.get("asset_type") || "machine",
                safety_devices_required: form.get("safety_devices_required") === "on",
                status: form.get("status")
              };
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("assets").update(payload).eq("id", deps.getActiveAssetId()).eq("company_id", deps.getActiveCompanyId()),
                "Equipment save timed out. Check your connection and try again.",
                15e3
              );
              if (error && deps.isMissingColumnError(error, "location_id")) {
                deps.setLocationsReady(false);
                throw new Error(deps.databaseSetupRequiredMessage("saving equipment locations"));
              }
              if (error && isMissingAuditFieldColumn(error)) {
                throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");
              }
              if (error && deps.isAssetHierarchySchemaError(error)) {
                throw new Error(deps.equipmentSchemaMessage(error));
              }
              if (error) throw error;
              const changed = changedFieldLabels(previous, payload);
              if (changed.length && typeof deps.recordAssetEvent === "function") {
                await deps.recordAssetEvent(deps.getActiveAssetId(), "updated", `Updated ${changed.join(", ")}.`);
              }
              deps.showNotice("Equipment saved.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message;
              else alertRef(error.message);
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
              }
            }
          }
          async function updateAssetStatus(assetId, status) {
            const { error } = await deps.withOperationTimeout(
              deps.supabaseClient().from("assets").update({ status }).eq("id", assetId).eq("company_id", deps.getActiveCompanyId()),
              "Equipment status save timed out. Check your connection and try again.",
              12e3
            );
            if (!error && typeof deps.recordAssetEvent === "function") {
              await deps.recordAssetEvent(assetId, "status_changed", `Status changed to ${status}.`);
            }
            return error || null;
          }
          async function attachAssetPart(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const assetId = formElement.dataset.attachAssetPart;
            const errorElement = documentRef.querySelector(`[data-asset-part-error="${CSSRef.escape(assetId)}"]`);
            if (errorElement) errorElement.textContent = "";
            const submitButton = formElement.querySelector("button[type='submit']");
            const originalButtonText = submitButton?.textContent || "Attach Part";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Attaching...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const partId = form.get("part_id");
              if (!partId) throw new Error("Select a part to attach.");
              const quantity = Math.max(1, Number(form.get("quantity_recommended")) || 1);
              const note = String(form.get("note") || "").trim() || null;
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("asset_parts").insert({
                  company_id: deps.getActiveCompanyId(),
                  asset_id: assetId,
                  part_id: partId,
                  quantity_recommended: quantity,
                  note
                }),
                "Equipment part link save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isMissingTableError?.(error, "asset_parts")) {
                  deps.setAssetPartsReady(false);
                  throw new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.");
                }
                if (error.code === "23505") throw new Error("This part is already linked to this equipment.");
                throw error;
              }
              deps.showNotice("Part linked to equipment.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not link part to equipment.";
              else deps.showNotice(error.message || "Could not link part to equipment.", "warning");
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
              }
            }
          }
          async function removeAssetPart(id) {
            const errorElement = documentRef.querySelector("[data-asset-part-error]");
            if (errorElement) errorElement.textContent = "";
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("asset_parts").delete().eq("id", id).eq("company_id", deps.getActiveCompanyId()),
                "Equipment part unlink timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isMissingTableError?.(error, "asset_parts")) {
                  deps.setAssetPartsReady(false);
                  throw new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.");
                }
                throw error;
              }
              deps.showNotice("Part link removed.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not remove linked part.";
              else deps.showNotice(error.message || "Could not remove linked part.", "warning");
            }
          }
          function assetDeleteBlockers(assetId) {
            return {
              workOrders: deps.getWorkOrders().filter((workOrder) => workOrder.asset_id === assetId).length,
              children: deps.childAssetsFor(assetId).length,
              schedules: deps.getPreventiveSchedules().filter((schedule) => schedule.asset_id === assetId).length,
              requests: deps.getMaintenanceRequests().filter((request) => request.asset_id === assetId).length
            };
          }
          function assetHasDeleteBlockers(assetId) {
            const blockers = assetDeleteBlockers(assetId);
            return Object.values(blockers).some(Boolean);
          }
          async function loadAssetDeleteBlockers(assetId) {
            const [workOrdersCount, schedulesCount, requestsCount] = await Promise.all([
              countAssetLinkedRows("work_orders", assetId),
              countAssetLinkedRows("preventive_schedules", assetId),
              countAssetLinkedRows("maintenance_requests", assetId)
            ]);
            return {
              workOrders: workOrdersCount,
              children: deps.childAssetsFor(assetId).length,
              schedules: schedulesCount,
              requests: requestsCount
            };
          }
          async function countAssetLinkedRows(tableName, assetId) {
            const { count, error } = await deps.withOperationTimeout(
              deps.supabaseClient().from(tableName).select("id", { count: "exact", head: true }).eq("company_id", deps.getActiveCompanyId()).eq("asset_id", assetId),
              `Equipment delete check timed out while checking ${tableName}.`,
              15e3
            );
            if (error) throw new Error(`Could not verify linked ${tableName.replaceAll("_", " ")} before deleting equipment: ${error.message}`);
            return count || 0;
          }
          async function requestDeleteAsset(id) {
            if (!deps.canDeleteEquipment()) {
              alertRef("Only company admins and managers can delete equipment.");
              return;
            }
            const errorElement = documentRef.querySelector("#asset-delete-error");
            if (errorElement) errorElement.textContent = "";
            try {
              const blockers = await loadAssetDeleteBlockers(id);
              const message = deps.assetDeleteBlockerMessage(blockers);
              if (message) {
                if (errorElement) errorElement.textContent = message;
                return;
              }
              deps.setPendingDeleteAssetId(id);
              deps.renderWorkspace();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not verify equipment links before delete.";
              else deps.showNotice(error.message || "Could not verify equipment links before delete.", "warning");
            }
          }
          async function deleteAsset(id) {
            if (!deps.canDeleteEquipment()) {
              alertRef("Only company admins and managers can delete equipment.");
              return;
            }
            const errorElement = documentRef.querySelector("#asset-delete-error");
            if (errorElement) errorElement.textContent = "";
            const confirmButton = documentRef.querySelector(`[data-confirm-delete-asset="${CSSRef.escape(id)}"]`);
            if (confirmButton) {
              confirmButton.disabled = true;
              confirmButton.textContent = "Deleting...";
            }
            try {
              const blockers = await loadAssetDeleteBlockers(id);
              const blockerMessage = deps.assetDeleteBlockerMessage(blockers);
              if (blockerMessage) throw new Error(blockerMessage);
              const documentPaths = deps.getAssetDocumentStoragePaths?.(id) || [];
              if (documentPaths.length) {
                const storageDelete = await deps.withOperationTimeout(
                  deps.removeAssetDocumentStorage(documentPaths),
                  "Equipment file cleanup timed out.",
                  15e3
                );
                if (storageDelete.error) {
                  throw new Error(`Could not remove equipment files: ${storageDelete.error.message}`);
                }
              }
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("assets").delete().eq("id", id).eq("company_id", deps.getActiveCompanyId()),
                "Equipment delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                throw new Error(error.message.includes("violates foreign key constraint") ? "This equipment is linked to records and cannot be deleted." : error.message);
              }
              deps.setActiveAssetId(null);
              deps.setPendingDeleteAssetId(null);
              deps.setActiveSection("assets");
              deps.showNotice("Equipment deleted.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not delete equipment.";
              if (confirmButton) {
                confirmButton.disabled = false;
                confirmButton.textContent = "Permanently Delete";
              }
            }
          }
          async function createQuickFixAsset(name, status = "running") {
            const payload = {
              company_id: deps.getActiveCompanyId(),
              location_id: deps.activeLocationDatabaseId(),
              name,
              asset_type: "machine",
              safety_devices_required: true,
              status,
              created_by: currentUserId()
            };
            const response = await deps.withOperationTimeout(
              deps.supabaseClient().from("assets").insert(payload).select().single(),
              "Equipment save timed out. Check your connection and try again.",
              15e3
            );
            if (response.error && deps.isMissingColumnError(response.error, "location_id")) {
              deps.setLocationsReady(false);
              return deps.withSetupError(response, deps.databaseSetupRequiredMessage("adding equipment in this location"));
            }
            if (response.error && deps.isMissingColumnError(response.error, "created_by")) {
              return deps.withSetupError(response, "Run supabase/step-next-asset-events.sql before saving equipment history.");
            }
            if (response.error && deps.isAssetHierarchySchemaError(response.error)) {
              return deps.withSetupError(response, deps.equipmentSchemaMessage(response.error).replace("saving", "adding"));
            }
            if (!response.error && response.data?.id && typeof deps.recordAssetEvent === "function") {
              await deps.recordAssetEvent(response.data.id, "created", `Created ${name}.`);
            }
            return response;
          }
          return {
            assetDeleteBlockers,
            assetHasDeleteBlockers,
            attachAssetPart,
            countAssetLinkedRows,
            createAsset,
            createQuickFixAsset,
            deleteAsset,
            loadAssetDeleteBlockers,
            removeAssetPart,
            requestDeleteAsset,
            updateAsset,
            updateAssetStatus
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createAssetWorkflow };
        }
        window.MaintainOpsAssetWorkflow = { createAssetWorkflow };
      })();
    }
  });

  // src/workflows/requestLifecycleWorkflow.js
  var require_requestLifecycleWorkflow = __commonJS({
    "src/workflows/requestLifecycleWorkflow.js"(exports, module) {
      (function() {
        function createRequestLifecycleWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const alertRef = deps.alertRef || alert;
          const CSSRef = deps.CSSRef || CSS;
          function renderRequestForm() {
            const detailPanel = documentRef.querySelector("#detail-panel");
            detailPanel.innerHTML = deps.renderRequestFormContent();
          }
          async function createRequest(event) {
            event.preventDefault();
            await createRequestFromForm(event.target);
          }
          async function createRequestFromForm(formElement) {
            const errorElement = documentRef.querySelector("#request-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Submitting...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const assetId = form.get("asset_id") || null;
              const equipmentNote = String(form.get("equipment_note") || "").trim();
              if (assetId && equipmentNote) {
                throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");
              }
              if (!assetId && !equipmentNote) {
                throw new Error("Choose saved equipment or enter equipment not listed / a general area.");
              }
              if (!deps.confirmAssetLocationRouting(assetId, "submitting this request", errorElement)) return;
              const equipmentLabel = equipmentNote || deps.assetNameFor?.(assetId) || "Saved equipment";
              const requestDescription = deps.requiredText(form.get("description"), "Request details");
              const requesterName = deps.requiredText(form.get("requester_name"), "Your name");
              const requestPayload = {
                company_id: deps.getActiveCompanyId(),
                location_id: deps.locationIdForAsset(assetId),
                title: deps.requiredText(form.get("title"), "Request title"),
                description: `Machine / area: ${equipmentLabel}

${requestDescription}`,
                asset_id: assetId,
                priority: form.get("priority"),
                status: "submitted",
                requested_by: deps.getSession().user.id,
                requested_by_name: requesterName
              };
              if (!deps.getRequestsReady()) {
                throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");
              }
              const { data, error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("maintenance_requests").insert(requestPayload).select("*").single(),
                "Request save timed out. Check your connection and try again.",
                15e3
              );
              if (error && deps.isMissingColumnError(error, "location_id")) {
                deps.setLocationsReady(false);
                throw new Error(deps.databaseSetupRequiredMessage("saving requests by location"));
              }
              if (error) throw error;
              const photo = form.get("photo");
              let photoWarning = "";
              if (photo && photo.name) {
                const photoError = await deps.addPhotoToMaintenanceRequest(data.id, photo);
                if (photoError) photoWarning = ` Photo did not upload: ${photoError.message || photoError}`;
              }
              const emailResult = await deps.notifyRequestEmailer(data.id);
              if (emailResult?.error) console.warn("Request email notification did not send", emailResult.error);
              deps.setActiveSection("requests");
              deps.setRequestViewFilter("active");
              deps.resetRequestsPage();
              deps.showNotice(`Request submitted.${photoWarning}`, photoWarning ? "warning" : "success");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not submit request.";
              else alertRef(error.message || error);
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Request";
              }
            }
          }
          async function convertRequestToWorkOrder(requestId) {
            const request = deps.getMaintenanceRequests().find((item) => item.id === requestId);
            if (!request) return;
            const button = documentRef.querySelector(`[data-convert-request="${CSSRef.escape(requestId)}"]`);
            if (button) {
              button.disabled = true;
              button.textContent = "Converting...";
            }
            try {
              const payload = {
                company_id: deps.getActiveCompanyId(),
                location_id: request.location_id || deps.locationIdForAsset(request.asset_id),
                title: request.title,
                description: deps.descriptionWithRequestPhotoNote(request.description, request),
                asset_id: request.asset_id || null,
                priority: request.priority || "medium",
                type: "reactive",
                status: "open",
                created_by: deps.getSession().user.id
              };
              deps.applySafetyRequirementPayload(payload);
              deps.applySafetyCheckPayload(payload, false);
              const { data, error } = await deps.withOperationTimeout(
                deps.insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
                "Request conversion timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              const { error: updateError } = await deps.withOperationTimeout(
                deps.supabaseClient().from("maintenance_requests").update({
                  status: "converted",
                  reviewed_by: deps.getSession().user.id,
                  reviewed_at: (/* @__PURE__ */ new Date()).toISOString(),
                  converted_work_order_id: data.id
                }).eq("id", requestId).eq("company_id", deps.getActiveCompanyId()),
                "Request status update timed out. Check your connection and try again.",
                15e3
              );
              if (updateError) throw updateError;
              deps.setActiveSection("work");
              deps.setActiveWorkOrderId(data.id);
              await deps.withOperationTimeout(
                deps.recordWorkOrderEvent(data.id, "request_converted", "Request converted to work order."),
                "Activity log timed out.",
                8e3
              ).catch(() => null);
              deps.showNotice("Request converted to work order.");
              await deps.render();
            } catch (error) {
              deps.showNotice(`Could not convert request: ${error.message || error}`, "warning");
              if (button) {
                button.disabled = false;
                button.textContent = "Convert to Work Order";
              }
            }
          }
          function openQuickFixForRequest(requestId) {
            const request = deps.getMaintenanceRequests().find((item) => item.id === requestId);
            if (!request) return;
            deps.setQuickFixRequestId(requestId);
            deps.setQuickFixAssetId(request.asset_id || null);
            deps.setQuickFixMode(true);
            deps.setActiveWorkOrderId(null);
            deps.setActiveAssetId(null);
            deps.setCreateWorkOrderMode(false);
            deps.setActiveSection("mywork");
            deps.renderWorkspace();
          }
          function requestDeleteMaintenanceRequest(id) {
            if (!deps.canDeleteOperationalRecords()) {
              alertRef("Only company admins and managers can delete requests.");
              return;
            }
            if (!deps.getMaintenanceRequests().some((request) => request.id === id)) return;
            deps.setPendingDeleteRequestId(id);
            deps.renderWorkspace();
          }
          async function deleteMaintenanceRequest(id) {
            if (!deps.canDeleteOperationalRecords()) {
              alertRef("Only company admins and managers can delete requests.");
              return;
            }
            const request = deps.getMaintenanceRequests().find((item) => item.id === id);
            if (!request) return;
            const button = documentRef.querySelector(`[data-confirm-delete-request="${CSSRef.escape(id)}"]`);
            if (button) {
              button.disabled = true;
              button.textContent = "Deleting...";
            }
            try {
              if (request.photo_storage_path) {
                const storageDelete = await deps.withOperationTimeout(
                  deps.supabaseClient().storage.from("maintenance-request-photos").remove([request.photo_storage_path]),
                  "Request photo cleanup timed out.",
                  15e3
                );
                if (storageDelete.error) throw new Error(`Could not remove request photo: ${storageDelete.error.message}`);
              }
              const { data, error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("maintenance_requests").delete().eq("id", id).eq("company_id", deps.getActiveCompanyId()).select("id"),
                "Request delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              if (!data?.length) {
                throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
              }
              const verification = await deps.withOperationTimeout(
                deps.supabaseClient().from("maintenance_requests").select("id").eq("id", id).eq("company_id", deps.getActiveCompanyId()).maybeSingle(),
                "Request delete verification timed out. Refresh and check the request list.",
                15e3
              );
              if (verification.error) throw new Error(`Request delete verification failed: ${verification.error.message}`);
              if (verification.data) throw new Error("Request delete did not persist in Supabase.");
              deps.setPendingDeleteRequestId(null);
              deps.showNotice("Request deleted.");
              await deps.render();
            } catch (error) {
              deps.showNotice(error.message || "Could not delete request.", "warning");
              if (button) {
                button.disabled = false;
                button.textContent = "Permanently Delete";
              }
            }
          }
          return {
            convertRequestToWorkOrder,
            createRequest,
            createRequestFromForm,
            deleteMaintenanceRequest,
            openQuickFixForRequest,
            renderRequestForm,
            requestDeleteMaintenanceRequest
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createRequestLifecycleWorkflow };
        }
        window.MaintainOpsRequestLifecycleWorkflow = { createRequestLifecycleWorkflow };
      })();
    }
  });

  // src/workflows/workOrderCreationWorkflow.js
  var require_workOrderCreationWorkflow = __commonJS({
    "src/workflows/workOrderCreationWorkflow.js"(exports, module) {
      (function() {
        function createWorkOrderCreationWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const alertRef = deps.alertRef || alert;
          async function createWorkOrder(event) {
            event.preventDefault();
            const formElement = event.target;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorTarget = documentRef.querySelector("#create-work-order-error");
            submitButton.disabled = true;
            submitButton.textContent = "Creating...";
            if (errorTarget) errorTarget.textContent = "";
            try {
              const form = new FormDataCtor(formElement);
              const status = form.get("status") || "open";
              let assetId = form.get("asset_id") || null;
              const newAssetName = String(form.get("new_asset_name") || "").trim();
              if (assetId && newAssetName) {
                throw new Error("Choose existing equipment or create new equipment, not both.");
              }
              if (newAssetName) {
                const { data: newAsset, error: assetError } = await deps.createQuickFixAsset(newAssetName, "running");
                if (assetError) {
                  if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
                  return;
                }
                assetId = newAsset.id;
              }
              if (!newAssetName && !deps.confirmAssetLocationRouting(assetId, "creating this work order", errorTarget)) return;
              if (status === "completed" && deps.assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
                if (errorTarget) errorTarget.textContent = "Check safety devices before creating completed work tied to equipment.";
                return;
              }
              const procedureCompletionMessage = status === "completed" ? deps.blocksProcedureCompletion(null, form.get("procedure_template_id") || null) : "";
              if (procedureCompletionMessage) {
                deps.setWorkOrderActionWarning("", "");
                if (errorTarget) errorTarget.textContent = `${procedureCompletionMessage} Create the work order first, then complete the checklist before marking it complete.`;
                return;
              }
              const payload = {
                company_id: deps.getActiveCompanyId(),
                location_id: deps.locationIdForAsset(assetId),
                title: deps.requiredText(form.get("title"), "Work order title"),
                description: deps.descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
                asset_id: assetId,
                priority: form.get("priority"),
                type: form.get("type") || "reactive",
                due_at: deps.workOrderDateValue(form.get("due_at")),
                assigned_to: deps.assignedUserFromForm(form),
                ...deps.procedureColumn(form.get("procedure_template_id")),
                status,
                created_by: deps.getSession().user.id,
                actual_minutes: Number(form.get("actual_minutes")) || 0,
                failure_cause: form.get("failure_cause") || null,
                resolution_summary: form.get("resolution_summary") || null,
                follow_up_needed: form.get("follow_up_needed") === "on",
                completion_notes: form.get("completion_notes") || null,
                completed_at: status === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null
              };
              deps.applySafetyRequirementPayload(payload);
              deps.applySafetyCheckPayload(payload, status === "completed" && payload.safety_check_required && form.get("safety_devices_checked") === "on");
              const { data, error } = await deps.withOperationTimeout(
                deps.insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
                "Work order creation timed out. Check your connection and try again."
              );
              if (error) {
                if (errorTarget) errorTarget.textContent = `Could not create work order: ${deps.friendlyWorkOrderSaveError(error)}`;
                return;
              }
              await deps.recordWorkOrderEvent(data.id, "created", "Work order created.");
              if (newAssetName) {
                await deps.recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from work order: ${newAssetName}.`);
              }
              const warnings = [];
              const partId = form.get("part_id");
              if (partId) {
                const part = deps.getParts().find((item) => item.id === partId);
                const partError = await deps.addPartUsageToWorkOrder(data.id, part, Number(form.get("quantity_used")) || 1);
                if (partError) warnings.push(`part usage failed: ${partError.message}`);
                else await deps.recordWorkOrderEvent(data.id, "part_used", `Part recorded: ${part?.name || "Part"}.`);
              }
              const photo = form.get("photo");
              if (photo && photo.name) {
                const photoError = await deps.addPhotoToWorkOrder(data.id, photo);
                if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
                else await deps.recordWorkOrderEvent(data.id, "photo_uploaded", `Photo uploaded: ${photo.name}.`);
              }
              const initialComment = String(form.get("initial_comment") || "").trim();
              if (initialComment) {
                const commentError = await deps.addCommentToWorkOrder(data.id, initialComment);
                if (commentError) warnings.push(`comment failed: ${commentError.message}`);
                else await deps.recordWorkOrderEvent(data.id, "comment_added", "Initial comment added.");
              }
              deps.setActiveWorkOrderId(data.id);
              deps.setCreateWorkOrderMode(false);
              deps.showNotice(warnings.length ? `Work order created with warning: ${warnings[0]}` : "Work order created.", warnings.length ? "warning" : "success");
              await deps.render();
            } catch (error) {
              if (errorTarget) errorTarget.textContent = `Could not create work order: ${error.message || error}`;
              else alertRef(error.message || error);
            } finally {
              submitButton.disabled = false;
              submitButton.textContent = "Create Work Order";
            }
          }
          return { createWorkOrder };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createWorkOrderCreationWorkflow };
        }
        window.MaintainOpsWorkOrderCreationWorkflow = { createWorkOrderCreationWorkflow };
      })();
    }
  });

  // src/workflows/workOrderDetailEditWorkflow.js
  var require_workOrderDetailEditWorkflow = __commonJS({
    "src/workflows/workOrderDetailEditWorkflow.js"(exports, module) {
      (function() {
        function createWorkOrderDetailEditWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const consoleRef = deps.consoleRef || console;
          async function updateWorkOrderDetails(event) {
            event.preventDefault();
            const formElement = event.target;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorTarget = documentRef.querySelector("#work-order-save-error");
            submitButton.disabled = true;
            submitButton.textContent = "Saving...";
            if (errorTarget) errorTarget.textContent = "";
            try {
              const form = new FormDataCtor(event.target);
              const activeWorkOrderId = deps.getActiveWorkOrderId();
              const previous = deps.getWorkOrders().find((workOrder) => workOrder.id === activeWorkOrderId);
              const currentStatus = documentRef.querySelector("#status-select")?.value || previous?.status || "open";
              const assetId = form.get("asset_id") || null;
              if (typeof deps.confirmAssetLocationRouting === "function" && !deps.confirmAssetLocationRouting(assetId, "saving this work order", errorTarget)) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Work Order";
                return;
              }
              const payload = {
                title: deps.requiredText(form.get("title"), "Work order title"),
                description: deps.descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
                due_at: deps.workOrderDateValue(form.get("due_at")),
                asset_id: assetId,
                location_id: deps.locationIdForAsset(assetId),
                status: currentStatus,
                priority: form.get("priority"),
                type: form.get("type"),
                assigned_to: deps.assignedUserFromForm(form),
                ...deps.procedureColumn(form.get("procedure_template_id")),
                failure_cause: form.get("failure_cause") || null,
                resolution_summary: form.get("resolution_summary") || null,
                follow_up_needed: form.get("follow_up_needed") === "on",
                actual_minutes: Number(form.get("actual_minutes")) || 0
              };
              payload.safety_check_required = deps.assetRequiresSafety(assetId);
              if (payload.status === "completed" && payload.safety_check_required && !deps.hasCompletedSafetyDeviceCheck(previous) && form.get("safety_devices_checked") !== "on") {
                submitButton.disabled = false;
                submitButton.textContent = "Save Work Order";
                if (errorTarget) errorTarget.textContent = "Use Complete Work and check safety devices before completing equipment work.";
                return;
              }
              const procedureChanged = (previous?.procedure_template_id || "") !== (payload.procedure_template_id || "");
              const procedureCompletionMessage = payload.status === "completed" && (previous?.status !== "completed" || procedureChanged) ? deps.blocksProcedureCompletion(previous, payload.procedure_template_id || null) : "";
              if (procedureCompletionMessage) {
                deps.setWorkOrderActionWarning(activeWorkOrderId, procedureCompletionMessage);
                submitButton.disabled = false;
                submitButton.textContent = "Save Work Order";
                if (errorTarget) errorTarget.textContent = procedureCompletionMessage;
                return;
              }
              if (payload.status === "completed" && previous?.status !== "completed") {
                payload.completed_at = (/* @__PURE__ */ new Date()).toISOString();
                deps.applySafetyCheckPayload(payload, payload.safety_check_required && (form.get("safety_devices_checked") === "on" || deps.hasCompletedSafetyDeviceCheck(previous)));
              } else if (payload.status !== "completed") {
                payload.completed_at = null;
                deps.applySafetyCheckPayload(payload, false);
              } else if (previous?.status === "completed" && payload.safety_check_required && form.has("safety_devices_checked")) {
                deps.applySafetyCheckPayload(payload, form.get("safety_devices_checked") === "on" || deps.hasCompletedSafetyDeviceCheck(previous));
              } else if (previous?.status === "completed" && !payload.safety_check_required) {
                deps.applySafetyCheckPayload(payload, false);
              }
              const { error } = await deps.withOperationTimeout(
                deps.updateWorkOrderSafely(payload, activeWorkOrderId),
                "Work order save timed out. Check your connection and try again.",
                2e4
              );
              if (error) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Work Order";
                if (errorTarget) errorTarget.textContent = `Could not save work order: ${deps.friendlyWorkOrderSaveError(error)}`;
                return;
              }
              const changeSnapshot = { ...Object.fromEntries(form.entries()), status: currentStatus };
              const logError = await deps.withOperationTimeout(
                deps.recordWorkOrderEvent(activeWorkOrderId, "updated", deps.describeWorkOrderChanges(previous, changeSnapshot)),
                "Activity log timed out.",
                8e3
              ).catch((error2) => error2);
              deps.setWorkOrderActionWarning("", "");
              deps.showNotice(logError ? `Work order saved, but history did not update: ${logError.message}` : "Work order saved.", logError ? "warning" : "success");
              await deps.render();
            } catch (error) {
              consoleRef.error("Work order save failed", error);
              submitButton.disabled = false;
              submitButton.textContent = "Save Work Order";
              if (errorTarget) errorTarget.textContent = `Could not save work order: ${error.message || error}`;
            } finally {
              if (submitButton && submitButton.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Save Work Order";
              }
            }
          }
          return { updateWorkOrderDetails };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createWorkOrderDetailEditWorkflow };
        }
        window.MaintainOpsWorkOrderDetailEditWorkflow = { createWorkOrderDetailEditWorkflow };
      })();
    }
  });

  // src/workflows/partUsageWorkflow.js
  var require_partUsageWorkflow = __commonJS({
    "src/workflows/partUsageWorkflow.js"(exports, module) {
      (function() {
        function createPartUsageWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          async function recordPartUsed(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#parts-used-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Recording...";
            }
            try {
              const form = new FormDataCtor(formElement);
              const partId = form.get("part_id");
              const quantity = Number(form.get("quantity_used")) || 1;
              const part = deps.getParts().find((item) => item.id === partId);
              if (!deps.getActiveWorkOrderId()) throw new Error("Open a work order before recording parts.");
              if (!part) throw new Error("Choose a part first.");
              const usageError = await addPartUsageToWorkOrder(deps.getActiveWorkOrderId(), part, quantity);
              if (usageError) throw usageError;
              deps.showNotice("Part recorded on work order.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not record part used.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Record Part Used";
              }
            }
          }
          async function addPartUsageToWorkOrder(workOrderId, part, quantity) {
            if (!part) return new Error("Choose a part first.");
            const { error } = await deps.withOperationTimeout(
              deps.supabaseClient().rpc("record_work_order_part_usage", {
                p_company_id: deps.getActiveCompanyId(),
                p_work_order_id: workOrderId,
                p_part_id: part.id,
                p_quantity: quantity
              }),
              "Part usage save timed out."
            );
            if (error) return error;
            return null;
          }
          return {
            addPartUsageToWorkOrder,
            recordPartUsed
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createPartUsageWorkflow };
        }
        window.MaintainOpsPartUsageWorkflow = { createPartUsageWorkflow };
      })();
    }
  });

  // src/workflows/mediaStorageWorkflow.js
  var require_mediaStorageWorkflow = __commonJS({
    "src/workflows/mediaStorageWorkflow.js"(exports, module) {
      (function() {
        function createMediaStorageWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const cryptoRef = deps.cryptoRef || crypto;
          const consoleRef = deps.consoleRef || console;
          const createImageBitmapRef = deps.createImageBitmapRef || (typeof createImageBitmap !== "undefined" ? createImageBitmap : null);
          const largeDocumentLimitBytes = 25 * 1024 * 1024;
          const photoUploadLimitBytes = 5 * 1024 * 1024;
          const photoMimeTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"]);
          const reportedUploadFailures = /* @__PURE__ */ new Set();
          async function uploadPartDocument(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const partId = formElement.dataset.partDocument;
            const errorElement = documentRef.querySelector(`[data-part-document-error="${partId}"]`);
            const submitButton = formElement.querySelector("button[type='submit']");
            const formData = new FormDataCtor(formElement);
            const file = formData.get("document");
            const documentType = normalizePartDocumentType(formData.get("document_type"));
            if (errorElement) errorElement.textContent = "";
            if (!deps.getPartDocumentsReady()) {
              if (errorElement) errorElement.textContent = "Run supabase/step-next-part-documents.sql before attaching files.";
              return;
            }
            if (!file || !file.name) {
              if (errorElement) errorElement.textContent = "Choose a receipt, invoice, photo, or PDF first.";
              return;
            }
            if (isLargeUnoptimizedDocument(file)) {
              if (errorElement) errorElement.textContent = largeDocumentMessage();
              await reportUploadFailure("part document", file, largeDocumentMessage());
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Attaching...";
            }
            const optimized = await optimizePhoto(file);
            const fileName = optimized.fileName || deps.safeFileName(file.name || "part-file");
            const path = `${deps.getActiveCompanyId()}/${partId}/${cryptoRef.randomUUID()}-${fileName}`;
            try {
              const upload = await deps.withOperationTimeout(
                deps.supabaseClient().storage.from("part-documents").upload(path, optimized.blob, {
                  contentType: optimized.contentType,
                  upsert: false
                }),
                "Part file upload timed out. Check your connection and try again.",
                25e3
              );
              if (upload.error) throw upload.error;
              const documentRecord = {
                company_id: deps.getActiveCompanyId(),
                part_id: partId,
                uploaded_by: deps.getSession().user.id,
                storage_path: path,
                file_name: fileName,
                content_type: optimized.contentType,
                document_type: documentType,
                file_size_bytes: optimized.blob.size || null,
                original_file_name: deps.safeFileName(file.name || "part-file"),
                original_size_bytes: file.size || null
              };
              let { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("part_documents").insert(documentRecord),
                "Part file record save timed out. Check your connection and try again.",
                15e3
              );
              if (error && deps.isColumnSchemaError(error, ["document_type", "file_size_bytes", "original_file_name", "original_size_bytes"])) {
                delete documentRecord.document_type;
                delete documentRecord.file_size_bytes;
                delete documentRecord.original_file_name;
                delete documentRecord.original_size_bytes;
                const retry = await deps.withOperationTimeout(
                  deps.supabaseClient().from("part_documents").insert(documentRecord),
                  "Part file record retry timed out. Check your connection and try again.",
                  15e3
                );
                error = retry.error;
              }
              if (error) {
                await removeUploadedObject("part-documents", path);
                if (deps.isColumnSchemaError(error, ["part_documents"])) deps.setPartDocumentsReady(false);
                throw new Error(deps.getPartDocumentsReady() ? error.message : "Run supabase/step-next-part-documents.sql before attaching files.");
              }
              deps.showNotice("Part file attached.");
              await deps.render();
            } catch (error) {
              await reportUploadFailure("part document", file, error);
              if (errorElement) errorElement.textContent = error.message || "Could not attach file.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Attach File";
              }
            }
          }
          async function uploadAssetDocument(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const assetId = formElement.dataset.assetDocument;
            const errorElement = documentRef.querySelector(`[data-asset-document-error="${assetId}"]`);
            const submitButton = formElement.querySelector("button[type='submit']");
            const formData = new FormDataCtor(formElement);
            const file = formData.get("document");
            const documentType = normalizeAssetDocumentType(formData.get("document_type"));
            if (errorElement) errorElement.textContent = "";
            if (!deps.getAssetDocumentsReady?.()) {
              if (errorElement) errorElement.textContent = "Run supabase/step-next-asset-documents.sql before uploading equipment files.";
              return;
            }
            if (!file || !file.name) {
              if (errorElement) errorElement.textContent = "Choose a machine file first.";
              return;
            }
            if (isLargeUnoptimizedDocument(file)) {
              if (errorElement) errorElement.textContent = largeDocumentMessage();
              await reportUploadFailure("equipment file", file, largeDocumentMessage());
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Uploading...";
            }
            const optimized = await optimizePhoto(file);
            const path = `${deps.getActiveCompanyId()}/${assetId}/${cryptoRef.randomUUID()}-${optimized.fileName}`;
            try {
              const upload = await deps.withOperationTimeout(
                deps.supabaseClient().storage.from("asset-documents").upload(path, optimized.blob, {
                  contentType: optimized.contentType,
                  upsert: false
                }),
                "Equipment file upload timed out. Check your connection and try again.",
                25e3
              );
              if (upload.error) throw upload.error;
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("asset_documents").insert({
                  company_id: deps.getActiveCompanyId(),
                  asset_id: assetId,
                  uploaded_by: deps.getSession().user.id,
                  storage_path: path,
                  file_name: optimized.fileName,
                  content_type: optimized.contentType,
                  document_type: documentType,
                  file_size_bytes: optimized.blob.size || null,
                  original_file_name: deps.safeFileName(file.name || "machine-photo"),
                  original_size_bytes: file.size || null
                }),
                "Equipment file record save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                await removeUploadedObject("asset-documents", path);
                if (deps.isColumnSchemaError(error, ["asset_documents"])) deps.setAssetDocumentsReady?.(false);
                throw new Error(deps.getAssetDocumentsReady?.() ? error.message : "Run supabase/step-next-asset-documents.sql before uploading equipment files.");
              }
              deps.showNotice("Machine file attached.");
              await deps.render();
            } catch (error) {
              await reportUploadFailure("equipment file", file, error);
              if (errorElement) errorElement.textContent = error.message || "Could not upload machine file.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Attach Machine File";
              }
            }
          }
          async function deleteAssetDocument(documentId, storagePath) {
            const errorElement = documentRef.querySelector("[data-asset-document-error]");
            if (errorElement) errorElement.textContent = "";
            if (!documentId || !storagePath) {
              const message = "Missing machine file record. Refresh and try again.";
              if (errorElement) errorElement.textContent = message;
              else deps.showNotice(message, "warning");
              return;
            }
            try {
              const storageDelete = await deps.withOperationTimeout(
                deps.supabaseClient().storage.from("asset-documents").remove([storagePath]),
                "Equipment file delete timed out. Check your connection and try again.",
                15e3
              );
              if (storageDelete.error) throw storageDelete.error;
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("asset_documents").delete().eq("id", documentId).eq("company_id", deps.getActiveCompanyId()),
                "Equipment file record delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.showNotice("Machine file deleted.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not delete machine file.";
              else deps.showNotice(error.message || "Could not delete machine file.", "warning");
            }
          }
          async function deleteWorkOrderPhoto(photoId, storagePath) {
            const errorElement = documentRef.querySelector("#photo-error");
            if (errorElement) errorElement.textContent = "";
            if (!photoId || !storagePath) {
              const message = "Missing photo record. Refresh and try again.";
              if (errorElement) errorElement.textContent = message;
              else deps.showNotice(message, "warning");
              return;
            }
            try {
              const storageDelete = await deps.withOperationTimeout(
                deps.supabaseClient().storage.from("work-order-photos").remove([storagePath]),
                "Photo delete timed out. Check your connection and try again.",
                15e3
              );
              if (storageDelete.error) throw storageDelete.error;
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("work_order_photos").delete().eq("id", photoId).eq("company_id", deps.getActiveCompanyId()),
                "Photo record delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              const fileName = storagePath.split("/").pop() || "photo";
              await deps.withOperationTimeout(
                deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "photo_deleted", `Photo deleted: ${fileName}.`),
                "Activity log timed out.",
                8e3
              ).catch(() => null);
              deps.showNotice("Photo deleted.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not delete photo.";
              else deps.showNotice(error.message || "Could not delete photo.", "warning");
            }
          }
          function normalizeAssetDocumentType(value) {
            const allowed = /* @__PURE__ */ new Set(["machine_photo", "schematic", "settings", "manual", "nameplate", "inspection", "receipt", "other"]);
            return allowed.has(value) ? value : "other";
          }
          function normalizePartDocumentType(value) {
            const allowed = /* @__PURE__ */ new Set(["part_photo", "receipt", "invoice", "part_print", "schematic", "manual", "spec_sheet", "warranty", "other"]);
            return allowed.has(value) ? value : "other";
          }
          async function uploadPhoto(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorTarget = documentRef.querySelector("#photo-error");
            if (errorTarget) errorTarget.textContent = "";
            const file = new FormDataCtor(formElement).get("photo");
            if (!file || !file.name) {
              if (errorTarget) errorTarget.textContent = "Choose a photo first.";
              return;
            }
            const validationError = validatePhotoUpload(file);
            if (validationError) {
              if (errorTarget) errorTarget.textContent = validationError;
              await reportUploadFailure("work order photo", file, validationError);
              return;
            }
            submitButton.disabled = true;
            submitButton.textContent = "Uploading...";
            try {
              const hasProfile = await deps.ensureProfileForActiveCompany();
              if (!hasProfile) throw new Error(deps.getAppError());
              const error = await addPhotoToWorkOrder(deps.getActiveWorkOrderId(), file);
              if (error) throw error;
              await deps.withOperationTimeout(
                deps.recordWorkOrderEvent(deps.getActiveWorkOrderId(), "photo_uploaded", `Photo uploaded: ${file.name}.`),
                "Activity log timed out.",
                8e3
              ).catch(() => null);
              deps.showNotice("Photo uploaded.");
              await deps.render();
            } catch (error) {
              await reportUploadFailure("work order photo", file, error);
              if (errorTarget) errorTarget.textContent = `Could not upload photo: ${error.message || error}`;
            } finally {
              submitButton.disabled = false;
              submitButton.textContent = "Upload Photo";
            }
          }
          async function removeUploadedObject(bucket, path) {
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().storage.from(bucket).remove([path]),
                "Uploaded file cleanup timed out.",
                1e4
              );
              if (error) consoleRef.warn(`Could not remove uploaded ${bucket} object`, error);
            } catch (error) {
              consoleRef.warn(`Could not remove uploaded ${bucket} object`, error);
            }
          }
          async function addPhotoToWorkOrder(workOrderId, file) {
            const hasProfile = await deps.ensureProfileForActiveCompany();
            if (!hasProfile) return new Error(deps.getAppError());
            const validationError = validatePhotoUpload(file);
            if (validationError) {
              await reportUploadFailure("work order photo", file, validationError);
              return new Error(validationError);
            }
            const optimized = await optimizePhoto(file, workOrderPhotoOptimizationOptions());
            const optimizedError = validateOptimizedPhoto(optimized);
            if (optimizedError) {
              await reportUploadFailure("work order photo", file, optimizedError);
              return new Error(optimizedError);
            }
            const path = `${deps.getActiveCompanyId()}/${workOrderId}/${cryptoRef.randomUUID()}-${optimized.fileName}`;
            const upload = await deps.withOperationTimeout(
              deps.supabaseClient().storage.from("work-order-photos").upload(path, optimized.blob, {
                contentType: optimized.contentType,
                upsert: false
              }),
              "Photo upload timed out. Check your connection and try again.",
              25e3
            );
            if (upload.error) {
              await reportUploadFailure("work order photo", file, upload.error);
              return upload.error;
            }
            const photoRecord = {
              company_id: deps.getActiveCompanyId(),
              work_order_id: workOrderId,
              uploaded_by: deps.getSession().user.id,
              storage_path: path,
              file_name: optimized.fileName,
              content_type: optimized.contentType,
              file_size_bytes: optimized.blob.size || null,
              original_file_name: deps.safeFileName(file.name || "photo"),
              original_size_bytes: file.size || null
            };
            let { error } = await deps.withOperationTimeout(
              deps.supabaseClient().from("work_order_photos").insert(photoRecord),
              "Photo record save timed out. Check your connection and try again.",
              15e3
            );
            if (error && deps.isColumnSchemaError(error, ["file_size_bytes", "original_file_name", "original_size_bytes"])) {
              delete photoRecord.file_size_bytes;
              delete photoRecord.original_file_name;
              delete photoRecord.original_size_bytes;
              const retry = await deps.withOperationTimeout(
                deps.supabaseClient().from("work_order_photos").insert(photoRecord),
                "Photo record retry timed out. Check your connection and try again.",
                15e3
              );
              error = retry.error;
            }
            if (error) await removeUploadedObject("work-order-photos", path);
            if (error) await reportUploadFailure("work order photo", file, error);
            return error || null;
          }
          async function addPhotoToMaintenanceRequest(requestId, file) {
            if (!requestId) return new Error("Request was not saved before photo upload.");
            const validationError = validatePhotoUpload(file);
            if (validationError) {
              await reportUploadFailure("request photo", file, validationError);
              return new Error(validationError);
            }
            const optimized = await optimizePhoto(file, workOrderPhotoOptimizationOptions());
            const optimizedError = validateOptimizedPhoto(optimized);
            if (optimizedError) {
              await reportUploadFailure("request photo", file, optimizedError);
              return new Error(optimizedError);
            }
            const path = `${requestId}/${cryptoRef.randomUUID()}-${optimized.fileName}`;
            const upload = await deps.withOperationTimeout(
              deps.supabaseClient().storage.from("maintenance-request-photos").upload(path, optimized.blob, {
                contentType: optimized.contentType,
                upsert: false
              }),
              "Request photo upload timed out. Check your connection and try again.",
              25e3
            );
            if (upload.error) {
              await reportUploadFailure("request photo", file, upload.error);
              return upload.error;
            }
            const { error } = await deps.withOperationTimeout(
              deps.supabaseClient().rpc("attach_maintenance_request_photo", {
                target_request_id: requestId,
                p_photo_storage_path: path,
                p_photo_file_name: optimized.fileName,
                p_photo_content_type: optimized.contentType,
                p_photo_file_size_bytes: optimized.blob.size || null,
                p_photo_original_file_name: deps.safeFileName(file.name || "photo"),
                p_photo_original_size_bytes: file.size || null
              }),
              "Request photo record save timed out. Check your connection and try again.",
              15e3
            );
            if (error) {
              await removeUploadedObject("maintenance-request-photos", path);
              await reportUploadFailure("request photo", file, error);
            }
            return error || null;
          }
          async function reportUploadFailure(uploadContext, file, error) {
            if (typeof deps.createAppIssueReportRecord !== "function") return;
            if (!deps.getActiveCompanyId?.() || !deps.getSession?.()?.user?.id) return;
            if (deps.getAppIssueReportsReady && !deps.getAppIssueReportsReady()) return;
            const message = String(error?.message || error || "Upload failed").slice(0, 500);
            const fileName = deps.safeFileName(file?.name || "unknown-file");
            const contentType = contentTypeForFile(file);
            const size = Number(file?.size || 0);
            const dedupeKey = [uploadContext, fileName, contentType, size, message].join("|");
            if (reportedUploadFailures.has(dedupeKey)) return;
            reportedUploadFailures.add(dedupeKey);
            try {
              await deps.withOperationTimeout(
                deps.createAppIssueReportRecord(deps.supabaseClient(), {
                  company_id: deps.getActiveCompanyId(),
                  location_id: deps.activeLocationDatabaseId ? deps.activeLocationDatabaseId() : null,
                  reporter_id: deps.getSession().user.id,
                  screen: String(deps.getActiveSection?.() || uploadContext || "upload").slice(0, 80),
                  page_url: deps.getPageUrl ? deps.getPageUrl() : "",
                  severity: "normal",
                  title: `Upload failed: ${uploadContext}`.slice(0, 140),
                  details: [
                    `Upload context: ${uploadContext}`,
                    `File: ${fileName}`,
                    `Type: ${contentType}`,
                    `Size: ${size}`,
                    `Error: ${message}`
                  ].join("\n"),
                  status: "open"
                }),
                "Upload failure report timed out.",
                8e3
              );
            } catch (reportError) {
              consoleRef.warn("Could not report upload failure", reportError);
            }
          }
          function workOrderPhotoOptimizationOptions() {
            return {
              targetBytes: 256 * 1024,
              passes: [
                { maxDimension: 768, quality: 0.78 },
                { maxDimension: 768, quality: 0.74 },
                { maxDimension: 768, quality: 0.7 }
              ]
            };
          }
          async function optimizePhoto(file, options = {}) {
            if (typeof deps.optimizePhotoOverride === "function") return deps.optimizePhotoOverride(file, options);
            const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
            const contentType = contentTypeForFile(file);
            if (!imageTypes.includes(contentType)) {
              return {
                blob: file,
                fileName: deps.safeFileName(file.name || "photo"),
                contentType
              };
            }
            try {
              if (!createImageBitmapRef) throw new Error("Browser image optimization is unavailable.");
              const bitmap = await createImageBitmapRef(file);
              const targetBytes = Number(options.targetBytes || 0) || 1 * 1024 * 1024;
              const optimizationPasses = options.passes || [
                { maxDimension: 2e3, quality: 0.82 },
                { maxDimension: 1800, quality: 0.78 },
                { maxDimension: 1600, quality: 0.74 }
              ];
              let optimizedBlob = null;
              for (const pass of optimizationPasses) {
                const optimized = await renderOptimizedImage(bitmap, pass.maxDimension, pass.quality);
                optimizedBlob = optimized;
                if (optimized.size <= targetBytes) break;
              }
              if (bitmap.close) bitmap.close();
              if (!optimizedBlob) throw new Error("Browser could not optimize this image.");
              return {
                blob: optimizedBlob,
                fileName: `${deps.fileBaseName(file.name || "photo")}.jpg`,
                contentType: "image/jpeg"
              };
            } catch (error) {
              consoleRef.warn("Photo optimization failed; uploading original.", error);
              return {
                blob: file,
                fileName: deps.safeFileName(file.name || "photo"),
                contentType
              };
            }
          }
          function isOptimizableImage(file) {
            return ["image/jpeg", "image/png", "image/webp"].includes(contentTypeForFile(file));
          }
          function isLargeUnoptimizedDocument(file) {
            return !isOptimizableImage(file) && Number(file.size || 0) > largeDocumentLimitBytes;
          }
          function largeDocumentMessage() {
            return "This non-image file is over 25 MB. Compress it or split it before uploading.";
          }
          function contentTypeForFile(file) {
            const explicitType = String(file?.type || "").trim().toLowerCase();
            if (explicitType) return explicitType;
            const name = String(file?.name || "").toLowerCase();
            if (/\.(jpe?g)$/.test(name)) return "image/jpeg";
            if (/\.png$/.test(name)) return "image/png";
            if (/\.webp$/.test(name)) return "image/webp";
            if (/\.gif$/.test(name)) return "image/gif";
            if (/\.heic$/.test(name)) return "image/heic";
            if (/\.heif$/.test(name)) return "image/heif";
            if (/\.pdf$/.test(name)) return "application/pdf";
            if (/\.txt$/.test(name)) return "text/plain";
            if (/\.csv$/.test(name)) return "text/csv";
            if (/\.doc$/.test(name)) return "application/msword";
            if (/\.docx$/.test(name)) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            if (/\.xls$/.test(name)) return "application/vnd.ms-excel";
            if (/\.xlsx$/.test(name)) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            return "application/octet-stream";
          }
          function validatePhotoUpload(file) {
            const contentType = contentTypeForFile(file);
            if (!photoMimeTypes.has(contentType)) {
              return "This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area.";
            }
            return "";
          }
          function validateOptimizedPhoto(optimized) {
            if (!photoMimeTypes.has(String(optimized?.contentType || "").toLowerCase())) {
              return "This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area.";
            }
            if (Number(optimized?.blob?.size || 0) > photoUploadLimitBytes) {
              return "This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.";
            }
            return "";
          }
          async function renderOptimizedImage(bitmap, maxDimension, quality) {
            const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
            const width = Math.max(1, Math.round(bitmap.width * scale));
            const height = Math.max(1, Math.round(bitmap.height * scale));
            const canvas = documentRef.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d", { alpha: false });
            context.drawImage(bitmap, 0, 0, width, height);
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
            if (!blob) throw new Error("Browser could not optimize this image.");
            return blob;
          }
          return {
            addPhotoToMaintenanceRequest,
            addPhotoToWorkOrder,
            optimizePhoto,
            removeUploadedObject,
            reportUploadFailure,
            deleteAssetDocument,
            deleteWorkOrderPhoto,
            uploadAssetDocument,
            uploadPartDocument,
            uploadPhoto
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createMediaStorageWorkflow };
        }
        window.MaintainOpsMediaStorageWorkflow = { createMediaStorageWorkflow };
      })();
    }
  });

  // src/workflows/companyLogoWorkflow.js
  var require_companyLogoWorkflow = __commonJS({
    "src/workflows/companyLogoWorkflow.js"(exports, module) {
      (function() {
        function createCompanyLogoWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const cryptoRef = deps.cryptoRef || crypto;
          const URLRef = deps.URLRef || URL;
          const consoleRef = deps.consoleRef || console;
          const createImageBitmapRef = deps.createImageBitmapRef || (typeof createImageBitmap !== "undefined" ? createImageBitmap : null);
          const logoUploadLimitBytes = 25 * 1024 * 1024;
          const logoMimeTypes = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"]);
          async function uploadCompanyLogo(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const errorElement = documentRef.querySelector("#company-logo-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            const file = new FormDataCtor(formElement).get("logo");
            if (errorElement) errorElement.textContent = "";
            if (!file || !file.name) {
              if (errorElement) errorElement.textContent = "Choose a logo image first.";
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Uploading...";
            }
            try {
              const validationError = validateLogoUpload(file);
              if (validationError) throw new Error(validationError);
              const optimized = await optimizeLogo(file);
              const optimizedError = validateOptimizedLogo(optimized);
              if (optimizedError) throw new Error(optimizedError);
              const path = `${deps.getActiveCompanyId()}/logo-${cryptoRef.randomUUID()}-${optimized.fileName}`;
              const upload = await deps.withOperationTimeout(
                deps.supabaseClient().storage.from("company-logos").upload(path, optimized.blob, {
                  contentType: optimized.contentType,
                  upsert: false
                }),
                "Company logo upload timed out. Check your connection and try again.",
                25e3
              );
              if (upload.error) {
                throw new Error(upload.error.message.includes("Bucket not found") ? "Run supabase/step-next-company-logo.sql before uploading a logo." : upload.error.message);
              }
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().rpc("set_company_logo", {
                  target_company_id: deps.getActiveCompanyId(),
                  new_logo_path: path
                }),
                "Company logo record save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                await deps.removeUploadedObject("company-logos", path);
                throw new Error(deps.isColumnSchemaError(error, ["logo_path"]) ? "Run supabase/step-next-company-logo.sql before saving a company logo." : error.message.includes("set_company_logo") ? "Run supabase/step-next-company-logo.sql, then try uploading the logo again." : error.message);
              }
              const activeCompany = deps.getCompanies().find((company) => company.id === deps.getActiveCompanyId());
              if (activeCompany) {
                activeCompany.logo_path = path;
                activeCompany.logoUrl = URLRef.createObjectURL(optimized.blob);
              }
              deps.showNotice("Company logo uploaded.");
              await deps.render();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not upload logo.";
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Upload Logo";
              }
            }
          }
          async function optimizeLogo(file) {
            if (typeof deps.optimizeLogoOverride === "function") return deps.optimizeLogoOverride(file);
            const contentType = contentTypeForLogo(file);
            try {
              if (!createImageBitmapRef) throw new Error("Browser logo optimization is unavailable.");
              const bitmap = await createImageBitmapRef(file);
              const maxDimension = 1200;
              const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
              const width = Math.max(1, Math.round(bitmap.width * scale));
              const height = Math.max(1, Math.round(bitmap.height * scale));
              const canvas = documentRef.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const context = canvas.getContext("2d", { alpha: true });
              context.clearRect(0, 0, width, height);
              context.drawImage(bitmap, 0, 0, width, height);
              if (bitmap.close) bitmap.close();
              const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
              if (!blob) throw new Error("Browser could not optimize this logo.");
              return {
                blob,
                fileName: `${deps.fileBaseName(file.name || "logo")}.png`,
                contentType: "image/png"
              };
            } catch (error) {
              consoleRef.warn("Logo optimization failed; uploading original.", error);
              return {
                blob: file,
                fileName: deps.safeFileName(file.name || "logo"),
                contentType
              };
            }
          }
          function contentTypeForLogo(file) {
            const explicitType = String(file?.type || "").trim().toLowerCase();
            if (explicitType) return explicitType;
            const name = String(file?.name || "").toLowerCase();
            if (/\.(jpe?g)$/.test(name)) return "image/jpeg";
            if (/\.png$/.test(name)) return "image/png";
            if (/\.webp$/.test(name)) return "image/webp";
            if (/\.gif$/.test(name)) return "image/gif";
            if (/\.heic$/.test(name)) return "image/heic";
            if (/\.heif$/.test(name)) return "image/heif";
            if (/\.avif$/.test(name)) return "image/avif";
            if (/\.bmp$/.test(name)) return "image/bmp";
            if (/\.tiff?$/.test(name)) return "image/tiff";
            return "application/octet-stream";
          }
          function validateLogoUpload(file) {
            const contentType = contentTypeForLogo(file);
            if (!logoMimeTypes.has(contentType)) {
              return "Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images.";
            }
            return "";
          }
          function validateOptimizedLogo(optimized) {
            if (!logoMimeTypes.has(String(optimized?.contentType || "").toLowerCase())) {
              return "Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images.";
            }
            if (Number(optimized?.blob?.size || 0) > logoUploadLimitBytes) {
              return "This logo is still over 25 MB after processing. Try a smaller logo image.";
            }
            return "";
          }
          return {
            optimizeLogo,
            uploadCompanyLogo
          };
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createCompanyLogoWorkflow };
        }
        window.MaintainOpsCompanyLogoWorkflow = { createCompanyLogoWorkflow };
      })();
    }
  });

  // src/workflows/assetFinancialWorkflow.js
  var require_assetFinancialWorkflow = __commonJS({
    "src/workflows/assetFinancialWorkflow.js"(exports, module) {
      (function() {
        function createAssetFinancialWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          const CSSRef = deps.CSSRef || CSS;
          function emptyToNull(value) {
            const text = String(value ?? "").trim();
            return text ? text : null;
          }
          function numberOrNull(value) {
            const text = String(value ?? "").trim();
            if (!text) return null;
            const number = Number(text);
            return Number.isFinite(number) ? number : null;
          }
          function dateOrNull(value) {
            return emptyToNull(value);
          }
          async function saveAssetFinancial(event) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const assetId = formElement.dataset.financialAsset || "";
            const financialRecordId = formElement.dataset.financialRecord || "";
            const archived = formElement.dataset.financialArchived === "true";
            const errorElement = documentRef.querySelector(`[data-financial-error="${CSSRef.escape(assetId)}"]`);
            const submitButton = formElement.querySelector("button[type='submit']");
            const originalButtonText = submitButton?.textContent || "Save Financial Info";
            if (errorElement) errorElement.textContent = "";
            if (deps.canEditFinancialRecords && !deps.canEditFinancialRecords()) {
              const message = "Managers can view financial records, but only admins and accounting can edit financial info.";
              if (errorElement) errorElement.textContent = message;
              else deps.showNotice?.(message, "warning");
              return;
            }
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Saving...";
            }
            try {
              if (!assetId) throw new Error("Choose equipment before saving financial info.");
              if (archived && !financialRecordId) throw new Error("The archived financial record could not be identified.");
              const form = new FormDataCtor(formElement);
              const needsReview = form.get("needs_review") === "on";
              const payload = {
                asset_tag: emptyToNull(form.get("asset_tag")),
                acquisition_date: dateOrNull(form.get("acquisition_date")),
                acquisition_cost: numberOrNull(form.get("acquisition_cost")),
                depreciation_method: emptyToNull(form.get("depreciation_method")),
                useful_life_years: numberOrNull(form.get("useful_life_years")),
                current_book_value: numberOrNull(form.get("current_book_value")),
                tax_jurisdiction: emptyToNull(form.get("tax_jurisdiction")),
                ownership_status: emptyToNull(form.get("ownership_status")),
                in_service_date: dateOrNull(form.get("in_service_date")),
                disposal_date: dateOrNull(form.get("disposal_date")),
                disposal_notes: emptyToNull(form.get("disposal_notes")),
                gl_account_code: emptyToNull(form.get("gl_account_code")),
                cost_center: emptyToNull(form.get("cost_center")),
                finance_notes: emptyToNull(form.get("finance_notes")),
                needs_review: needsReview,
                updated_by: deps.getSession?.()?.user?.id || null,
                updated_at: (/* @__PURE__ */ new Date()).toISOString()
              };
              if (!needsReview) {
                payload.last_reviewed_at = (/* @__PURE__ */ new Date()).toISOString();
                payload.reviewed_by = deps.getSession?.()?.user?.id || null;
              }
              let saveQuery;
              if (archived) {
                saveQuery = deps.supabaseClient().from("asset_financials").update(payload).eq("id", financialRecordId).is("asset_id", null).select("id").single();
              } else {
                saveQuery = deps.supabaseClient().from("asset_financials").upsert({
                  ...payload,
                  company_id: deps.getActiveCompanyId(),
                  asset_id: assetId
                }, { onConflict: "asset_id" }).select("id").single();
              }
              const { error } = await deps.withOperationTimeout(
                saveQuery,
                "Financial info save timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                if (deps.isMissingTableError?.(error, "asset_financials")) {
                  deps.setAssetFinancialsReady(false);
                  throw new Error("Run supabase/step-next-asset-financials.sql before saving financial fields.");
                }
                throw error;
              }
              deps.showNotice?.("Financial info saved.");
              await deps.loadAssetFinancials?.();
              deps.renderWorkspace?.();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not save financial info.";
              else deps.showNotice?.(error.message || "Could not save financial info.", "warning");
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
              }
            }
          }
          async function deleteFinancialRecord(financialId) {
            const errorElement = documentRef.querySelector(`[data-financial-delete-error="${CSSRef.escape(financialId || "")}"]`);
            if (errorElement) errorElement.textContent = "";
            if (deps.canEditFinancialRecords && !deps.canEditFinancialRecords()) {
              const message = "Managers can view financial records, but only admins and accounting can edit financial info.";
              if (errorElement) errorElement.textContent = message;
              else deps.showNotice?.(message, "warning");
              return;
            }
            if (!financialId) {
              if (errorElement) errorElement.textContent = "Choose a financial record before deleting.";
              return;
            }
            const confirmed = deps.confirmRef ? deps.confirmRef("Delete this archived financial record? This cannot be undone.") : true;
            if (!confirmed) return;
            try {
              const { error } = await deps.withOperationTimeout(
                deps.supabaseClient().from("asset_financials").delete().eq("id", financialId).is("asset_id", null),
                "Financial record delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              deps.showNotice?.("Archived financial record deleted.");
              await deps.loadAssetFinancials?.();
              deps.clearActiveFinancialAssetId?.();
              deps.renderWorkspace?.();
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not delete financial record.";
              else deps.showNotice?.(error.message || "Could not delete financial record.", "warning");
            }
          }
          function bindFinancialEvents() {
            documentRef.querySelectorAll("[data-financial-asset]").forEach((form) => {
              form.addEventListener("submit", saveAssetFinancial);
            });
            documentRef.querySelectorAll("[data-delete-financial-record]").forEach((button) => {
              button.addEventListener("click", () => deleteFinancialRecord(button.dataset.deleteFinancialRecord));
            });
          }
          return {
            bindFinancialEvents,
            deleteFinancialRecord,
            saveAssetFinancial
          };
        }
        window.MaintainOpsAssetFinancialWorkflow = { createAssetFinancialWorkflow };
        if (typeof module !== "undefined") {
          module.exports = { createAssetFinancialWorkflow };
        }
      })();
    }
  });

  // src/workflows/partDeleteWorkflow.js
  var require_partDeleteWorkflow = __commonJS({
    "src/workflows/partDeleteWorkflow.js"(exports, module) {
      (function() {
        function createPartDeleteWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const cssRef = deps.CSSRef || CSS;
          const alertUser = deps.alertUser || alert;
          function blockerMessage(id) {
            if (deps.partUsageRows(id).length) return "This part has work order usage history and is kept for traceability.";
            if (deps.assetPartRows(id).length) return "This part is linked to equipment and is kept for traceability.";
            return "";
          }
          function requestDeletePart(id) {
            if (!deps.canDeleteParts()) {
              alertUser("Only company admins and managers can delete parts.");
              return;
            }
            const part = deps.getParts().find((item) => item.id === id);
            if (!part) return;
            const blocker = blockerMessage(id);
            if (blocker) {
              alertUser(blocker);
              return;
            }
            const confirmButtonVisible = Boolean(documentRef.querySelector(`[data-delete-part="${cssRef.escape(id)}"].permanent-delete-button`));
            if (deps.getPendingDeletePartId() === id || confirmButtonVisible) {
              deletePart(id);
              return;
            }
            deps.setPendingDeletePartId(id);
            deps.renderWorkspace();
          }
          async function deletePart(id) {
            if (!deps.canDeleteParts()) {
              alertUser("Only company admins and managers can delete parts.");
              return;
            }
            const part = deps.getParts().find((item) => item.id === id);
            const errorElement = documentRef.querySelector("#part-delete-error");
            if (errorElement) errorElement.textContent = "";
            if (!part) return;
            const blocker = blockerMessage(id);
            if (blocker) {
              if (errorElement) errorElement.textContent = blocker;
              return;
            }
            const confirmButton = documentRef.querySelector(`[data-delete-part="${cssRef.escape(id)}"].permanent-delete-button`);
            if (confirmButton) {
              confirmButton.disabled = true;
              confirmButton.textContent = "Deleting...";
            }
            try {
              const documentPaths = (deps.getPartDocumentsByPartId()[id] || []).map((document2) => document2.storage_path).filter(Boolean);
              if (documentPaths.length) {
                const storageDelete = await deps.withOperationTimeout(
                  deps.removePartDocumentStorage(documentPaths),
                  "Part document cleanup timed out. Try deleting again.",
                  15e3
                );
                if (storageDelete.error) {
                  throw new Error(`Could not remove filed receipts/invoices: ${storageDelete.error.message}`);
                }
              }
              const { data, error } = await deps.withOperationTimeout(
                deps.deletePartRecord(id),
                "Part delete timed out. Check your connection and try again.",
                15e3
              );
              if (error) {
                throw new Error(error.message.includes("violates foreign key constraint") ? "This part is linked to work or equipment and cannot be deleted." : error.message);
              }
              if (!data?.length) {
                throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");
              }
              const verification = await deps.withOperationTimeout(
                deps.verifyPartDeleted(id),
                "Part delete verification timed out. Refresh and check the part list.",
                15e3
              );
              if (verification.error) {
                throw new Error(`Part delete verification failed: ${verification.error.message}`);
              }
              if (verification.data) {
                throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");
              }
              deps.setActivePartId(null);
              deps.setPendingDeletePartId(null);
              deps.showNotice("Part deleted.");
              await deps.render();
            } catch (error) {
              deps.showNotice(error.message || "Could not delete part.", "warning");
              if (errorElement) {
                errorElement.textContent = error.message || "Could not delete part.";
              }
              if (confirmButton) {
                confirmButton.disabled = false;
                confirmButton.textContent = "Permanently Delete";
              }
            }
          }
          return {
            deletePart,
            requestDeletePart
          };
        }
        window.MaintainOpsPartDeleteWorkflow = {
          createPartDeleteWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createPartDeleteWorkflow };
        }
      })();
    }
  });

  // src/workflows/procedureChecklistWorkflow.js
  var require_procedureChecklistWorkflow = __commonJS({
    "src/workflows/procedureChecklistWorkflow.js"(exports, module) {
      (function() {
        function createProcedureChecklistWorkflow(deps = {}) {
          async function saveStepResult(event) {
            const field = event.target;
            const value = field.type === "checkbox" ? field.checked ? "checked" : "" : field.value;
            field.disabled = true;
            try {
              const { error } = await deps.withOperationTimeout(
                deps.upsertStepResult({
                  company_id: deps.getActiveCompanyId(),
                  work_order_id: field.dataset.workOrderId,
                  procedure_step_id: field.dataset.stepResult,
                  completed_by: value ? deps.getSession().user.id : null,
                  value,
                  completed_at: value ? (/* @__PURE__ */ new Date()).toISOString() : null
                }),
                "Checklist save timed out. Check your connection and try again.",
                15e3
              );
              if (error) throw error;
              await deps.withOperationTimeout(
                deps.recordWorkOrderEvent(field.dataset.workOrderId, "checklist_updated", "Procedure checklist updated."),
                "Activity log timed out.",
                8e3
              ).catch(() => null);
              const reloadError = await deps.withOperationTimeout(
                deps.loadStepResults(),
                "Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",
                1e4
              ).catch((error2) => error2);
              if (reloadError) {
                deps.showNotice(`Checklist saved, but refresh did not finish: ${reloadError.message || reloadError}`, "warning");
                field.disabled = false;
                return;
              }
              if (deps.getWorkOrderActionWarningId() === field.dataset.workOrderId) {
                const refreshedWorkOrder = deps.getWorkOrders().find((item) => item.id === field.dataset.workOrderId);
                if (!deps.blocksProcedureCompletion(refreshedWorkOrder)) deps.setWorkOrderActionWarning("", "");
              }
              deps.renderWorkspace();
            } catch (error) {
              deps.showNotice(`Could not save checklist step: ${error.message || error}`, "warning");
              field.disabled = false;
            }
          }
          return { saveStepResult };
        }
        window.MaintainOpsProcedureChecklistWorkflow = {
          createProcedureChecklistWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createProcedureChecklistWorkflow };
        }
      })();
    }
  });

  // src/workflows/publicRequestIntakeWorkflow.js
  var require_publicRequestIntakeWorkflow = __commonJS({
    "src/workflows/publicRequestIntakeWorkflow.js"(exports, module) {
      (function() {
        function createPublicRequestIntakeWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const bodyRef = deps.bodyRef || document.body;
          const FormDataCtor = deps.FormDataCtor || FormData;
          async function publicRequestIntake(token, timeoutMessage) {
            const { data, error } = await deps.withOperationTimeout(
              deps.getPublicRequestIntake(token),
              timeoutMessage
            );
            return {
              data: Array.isArray(data) ? data[0] : data,
              error
            };
          }
          async function renderPublicRequestQrPage(token) {
            bodyRef.classList.add("public-qr-mode");
            deps.setAppHtml(deps.loadingQrPage());
            let intake = null;
            try {
              const { data, error } = await publicRequestIntake(token, "Request QR lookup timed out.");
              intake = data;
              if (error || !intake) {
                renderPublicRequestError("This QR code link is inactive or invalid.");
                return;
              }
            } catch (_error) {
              renderPublicRequestError("This QR code link is inactive or invalid.");
              return;
            }
            const requestUrl = deps.publicRequestUrl(token);
            deps.setAppHtml(deps.publicRequestQrPage(intake, requestUrl));
            deps.bindPublicQrPrintEvents();
            if (typeof deps.ensureQrLibrary === "function") {
              deps.ensureQrLibrary().then(() => {
                deps.setAppHtml(deps.publicRequestQrPage(intake, requestUrl));
                deps.bindPublicQrPrintEvents();
              }).catch(() => {
              });
            }
          }
          async function renderPublicRequestIntake(token) {
            bodyRef.classList.remove("public-qr-mode");
            deps.setAppHtml(deps.loadingRequestForm());
            let intake = null;
            try {
              const { data, error } = await publicRequestIntake(token, "Request form lookup timed out.");
              if (error) {
                renderPublicRequestError("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");
                return;
              }
              intake = data;
            } catch (error) {
              renderPublicRequestError(error.message || "This request link could not be loaded.");
              return;
            }
            if (!intake) {
              renderPublicRequestError("This request link is inactive or invalid.");
              return;
            }
            deps.setAppHtml(deps.publicRequestForm(intake));
            documentRef.querySelector("#public-request-form").addEventListener("submit", (event) => submitPublicRequest(event, token, intake));
          }
          function renderPublicRequestError(message) {
            deps.setAppHtml(deps.publicRequestError(message));
          }
          async function submitPublicRequest(event, token, intake) {
            event.preventDefault();
            const formElement = event.currentTarget;
            const form = new FormDataCtor(formElement);
            const errorElement = documentRef.querySelector("#public-request-error");
            const submitButton = formElement.querySelector("button[type='submit']");
            if (errorElement) errorElement.textContent = "";
            if (submitButton) {
              submitButton.disabled = true;
              submitButton.textContent = "Sending...";
            }
            try {
              const { data: requestId, error } = await deps.withOperationTimeout(
                deps.submitPublicLocationRequest({
                  request_token: token,
                  request_title: deps.requiredText(form.get("title"), "Request title"),
                  equipment_note: deps.requiredText(form.get("equipment_note"), "Machine / area"),
                  request_description: deps.requiredText(form.get("description"), "Request details"),
                  requester_name: deps.requiredText(form.get("requester_name"), "Your name"),
                  requester_contact: String(form.get("requester_contact") || "").trim() || null,
                  request_priority: form.get("priority") || "medium"
                }),
                "Request send timed out."
              );
              if (error) throw error;
              const photo = form.get("photo");
              let photoWarning = "";
              if (photo && photo.name) {
                const photoError = await deps.addPhotoToMaintenanceRequest(requestId, photo);
                if (photoError) photoWarning = `Request sent, but the photo did not upload: ${photoError.message || photoError}`;
              }
              const emailResult = await deps.notifyRequestEmailer(requestId);
              if (emailResult.error) deps.warn("Request email notification did not send", emailResult.error);
              deps.setAppHtml(deps.publicRequestSuccess(intake, photoWarning));
              documentRef.querySelector("#public-request-another").addEventListener("click", () => renderPublicRequestIntake(token));
            } catch (error) {
              if (errorElement) errorElement.textContent = error.message || "Could not send the request.";
            } finally {
              if (submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Request";
              }
            }
          }
          return {
            renderPublicRequestError,
            renderPublicRequestIntake,
            renderPublicRequestQrPage,
            submitPublicRequest
          };
        }
        window.MaintainOpsPublicRequestIntakeWorkflow = {
          createPublicRequestIntakeWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createPublicRequestIntakeWorkflow };
        }
      })();
    }
  });

  // src/workflows/companySetupWorkflow.js
  var require_companySetupWorkflow = __commonJS({
    "src/workflows/companySetupWorkflow.js"(exports, module) {
      (function() {
        function createCompanySetupWorkflow(deps = {}) {
          const documentRef = deps.documentRef || document;
          const FormDataCtor = deps.FormDataCtor || FormData;
          function renderCompanyCreate() {
            deps.setAppHtml(deps.companyCreateForm(deps.getAppError()));
            documentRef.querySelector("#company-form").addEventListener("submit", createCompany);
            documentRef.querySelector("#sign-out").addEventListener("click", () => deps.signOut());
          }
          async function createCompany(event) {
            event.preventDefault();
            const formElement = event.target;
            const submitButton = formElement.querySelector("button[type='submit']");
            const errorTarget = documentRef.querySelector("#company-error");
            const name = String(new FormDataCtor(formElement).get("name") || "").trim();
            submitButton.disabled = true;
            submitButton.textContent = "Creating...";
            errorTarget.textContent = "";
            try {
              if (!name) throw new Error("Company name is required.");
              const existing = deps.getCompanies().find((company) => company.name.trim().toLowerCase() === name.trim().toLowerCase());
              if (existing) {
                deps.setActiveCompanyId(existing.id);
                deps.persistActiveCompanyId(existing.id);
                await deps.render();
                return;
              }
              const { data, error } = await deps.withOperationTimeout(
                deps.createCompanyRecord(name),
                "Company creation timed out."
              );
              if (error) {
                errorTarget.textContent = error.message.includes("create_company") ? "Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again." : error.message;
                return;
              }
              deps.setActiveCompanyId(data);
              deps.persistActiveCompanyId(data);
              const profileReady = await deps.ensureProfileForActiveCompany(name);
              if (!profileReady) throw new Error(deps.getAppError() || "Could not create your company profile.");
              await deps.seedStarterAssets();
              await deps.render();
            } catch (error) {
              errorTarget.textContent = error.message || "Could not create company.";
            } finally {
              if (submitButton?.isConnected) {
                submitButton.disabled = false;
                submitButton.textContent = "Create Company";
              }
            }
          }
          return {
            createCompany,
            renderCompanyCreate
          };
        }
        window.MaintainOpsCompanySetupWorkflow = {
          createCompanySetupWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createCompanySetupWorkflow };
        }
      })();
    }
  });

  // src/workflows/workOrderStatusWorkflow.js
  var require_workOrderStatusWorkflow = __commonJS({
    "src/workflows/workOrderStatusWorkflow.js"(exports, module) {
      (function() {
        function createWorkOrderStatusWorkflow(deps = {}) {
          async function updateWorkOrderStatus(event) {
            const previous = deps.getWorkOrders().find((item) => item.id === deps.getActiveWorkOrderId());
            event.target.disabled = true;
            try {
              const saved = await setWorkOrderStatus(deps.getActiveWorkOrderId(), event.target.value);
              if (!saved) event.target.value = previous?.status || "open";
            } catch (error) {
              event.target.value = previous?.status || "open";
              deps.showNotice(`Could not update status: ${error.message || error}`, "warning");
            } finally {
              event.target.disabled = false;
            }
          }
          async function setWorkOrderStatus(id, status) {
            const workOrder = deps.getWorkOrders().find((item) => item.id === id);
            if (status === "completed") {
              const procedureCompletionMessage = deps.blocksProcedureCompletion(workOrder);
              if (procedureCompletionMessage) {
                deps.setActiveWorkOrderId(id);
                deps.setWorkOrderActionWarning(id, procedureCompletionMessage);
                deps.showNotice(procedureCompletionMessage, "warning");
                await deps.render();
                return false;
              }
            }
            const safetyCheckedNow = deps.currentSafetyCheckboxCheckedForWorkOrder(id);
            const hasSafetyCheck = deps.hasCompletedSafetyDeviceCheck(workOrder) || safetyCheckedNow;
            if (status === "completed" && deps.requiresSafetyDeviceCheck(workOrder) && !hasSafetyCheck) {
              deps.setActiveWorkOrderId(id);
              const safetyMessage = "Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";
              deps.setWorkOrderActionWarning(id, safetyMessage);
              deps.showNotice(safetyMessage, "warning");
              await deps.render();
              return false;
            }
            const payload = {
              status,
              asset_id: workOrder?.asset_id || null,
              completed_at: status === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null
            };
            deps.applySafetyRequirementPayload(payload);
            if (status === "completed") {
              deps.applySafetyCheckPayload(payload, payload.safety_check_required && hasSafetyCheck);
            } else if (status !== "completed") {
              deps.applySafetyCheckPayload(payload, false);
            }
            delete payload.asset_id;
            const { error } = await deps.withOperationTimeout(
              deps.updateWorkOrderSafely(payload, id),
              "Status save timed out. Check your connection and try again.",
              15e3
            );
            if (error) {
              deps.showNotice(`Could not update status: ${deps.friendlyWorkOrderSaveError(error)}`, "warning");
              return false;
            }
            deps.setActiveWorkOrderId(id);
            deps.setWorkOrderActionWarning("", "");
            await deps.recordWorkOrderEvent(id, "status_changed", `Status changed to ${deps.statusLabel(status)}.`);
            deps.showNotice(`Status changed to ${deps.statusLabel(status)}.`);
            await deps.render();
            return true;
          }
          return {
            setWorkOrderStatus,
            updateWorkOrderStatus
          };
        }
        window.MaintainOpsWorkOrderStatusWorkflow = {
          createWorkOrderStatusWorkflow
        };
        if (typeof module !== "undefined") {
          module.exports = { createWorkOrderStatusWorkflow };
        }
      })();
    }
  });

  // src/services/requestEmailNotificationService.js
  var require_requestEmailNotificationService = __commonJS({
    "src/services/requestEmailNotificationService.js"(exports, module) {
      (function() {
        async function notifyRequestEmailer(supabaseClient, requestId) {
          if (!supabaseClient?.functions?.invoke || !requestId) {
            return { data: null, error: null, skipped: true };
          }
          try {
            const { data, error } = await supabaseClient.functions.invoke("request-emailer", {
              body: { request_id: requestId }
            });
            return { data, error: error || null, skipped: false };
          } catch (error) {
            return { data: null, error, skipped: false };
          }
        }
        window.MaintainOpsRequestEmailNotificationService = {
          notifyRequestEmailer
        };
        if (typeof module !== "undefined") {
          module.exports = { notifyRequestEmailer };
        }
      })();
    }
  });

  // src/services/signedUrlService.js
  var require_signedUrlService = __commonJS({
    "src/services/signedUrlService.js"(exports, module) {
      (function() {
        async function addSignedUrlsToRows(supabaseClient, bucketName, rows = [], options = {}) {
          const pathKey = options.pathKey || "storage_path";
          const urlKey = options.urlKey || "signedUrl";
          const expiresIn = options.expiresIn || 60 * 10;
          const onError = options.onError;
          await Promise.all(rows.map(async (row) => {
            const path = row?.[pathKey];
            if (!path) return;
            const { data, error } = await supabaseClient.storage.from(bucketName).createSignedUrl(path, expiresIn);
            if (error) {
              row[urlKey] = "";
              if (typeof onError === "function") onError(row, error);
              return;
            }
            row[urlKey] = data?.signedUrl || "";
          }));
        }
        function createDeferredSignedUrlLoader(deps = {}) {
          function ensureGroupSignedUrls(groupId) {
            if (!groupId || !deps.getReady()) return;
            const rows = deps.getRows(groupId) || [];
            const pending = rows.filter((row) => row.storage_path && !row.signedUrl);
            const signingMap = deps.getSigningMap();
            if (!pending.length || signingMap[groupId]) return;
            signingMap[groupId] = true;
            deps.withOperationTimeout(
              addSignedUrlsToRows(deps.supabaseClient(), deps.bucketName, pending),
              deps.timeoutMessage || "Signed file link load timed out.",
              deps.timeoutMs || 1e4
            ).catch((error) => {
              deps.warn("Could not load signed file links", error);
            }).finally(() => {
              delete signingMap[groupId];
              if (deps.getActiveGroupId() === groupId) deps.renderWorkspace();
            });
          }
          return { ensureGroupSignedUrls };
        }
        window.MaintainOpsSignedUrlService = {
          addSignedUrlsToRows,
          createDeferredSignedUrlLoader
        };
        if (typeof module !== "undefined") {
          module.exports = { addSignedUrlsToRows, createDeferredSignedUrlLoader };
        }
      })();
    }
  });

  // src/services/workspaceQueueLoadersService.js
  var require_workspaceQueueLoadersService = __commonJS({
    "src/services/workspaceQueueLoadersService.js"(exports, module) {
      (function() {
        function requiredDependency(deps, name) {
          if (deps[name] === void 0) throw new Error(`workspaceQueueLoadersService missing dependency: ${name}`);
          return deps[name];
        }
        function createWorkspaceQueueLoaders(deps = {}) {
          const supabaseClientRef = requiredDependency(deps, "supabaseClient");
          const workspaceUiState = requiredDependency(deps, "workspaceUiState");
          const applyRequestQueryFilters = requiredDependency(deps, "applyRequestQueryFilters");
          const applyWorkOrderListFilters = requiredDependency(deps, "applyWorkOrderListFilters");
          const applyWorkOrderFilters = requiredDependency(deps, "applyWorkOrderFilters");
          const selectWorkOrders = requiredDependency(deps, "selectWorkOrders");
          const countWorkOrdersQuery = requiredDependency(deps, "countWorkOrdersQuery");
          const fetchExactSearchedWorkOrderPage = requiredDependency(deps, "fetchExactSearchedWorkOrderPage");
          const isColumnSchemaError = requiredDependency(deps, "isColumnSchemaError");
          const warn = deps.warn || (() => {
          });
          const listItemsPerPage = requiredDependency(deps, "LIST_ITEMS_PER_PAGE");
          const workOrdersPerPage = requiredDependency(deps, "WORK_ORDERS_PER_PAGE");
          const requestRelationSelect = requiredDependency(deps, "REQUEST_RELATION_SELECT");
          const requestAssetFallbackSelect = requiredDependency(deps, "REQUEST_ASSET_FALLBACK_SELECT");
          const requestFallbackSelect = requiredDependency(deps, "REQUEST_FALLBACK_SELECT");
          const workOrderRelationSelect = requiredDependency(deps, "WORK_ORDER_RELATION_SELECT");
          const workOrderFallbackSelect = requiredDependency(deps, "WORK_ORDER_FALLBACK_SELECT");
          function getSupabaseClient() {
            return typeof supabaseClientRef === "function" ? supabaseClientRef() : supabaseClientRef;
          }
          async function fetchRequestPage(filter = workspaceUiState.getRequestViewFilter(), options = {}) {
            const page = Math.max(1, workspaceUiState.getRequestsPage());
            const from = (page - 1) * listItemsPerPage;
            const to = from + listItemsPerPage - 1;
            const selectClause = options.includeRelations === false ? requestFallbackSelect : options.includeLocationRelation === false ? requestAssetFallbackSelect : requestRelationSelect;
            const response = await applyRequestQueryFilters(
              getSupabaseClient().from("maintenance_requests").select(selectClause, { count: "exact" }),
              filter
            ).order("created_at", { ascending: false }).range(from, to);
            if (response.error && options.includeLocationRelation !== false && isColumnSchemaError(response.error, ["location_id", "locations"])) {
              return fetchRequestPage(filter, { includeLocationRelation: false });
            }
            if (response.error && options.includeRelations !== false) {
              return fetchRequestPage(filter, { includeRelations: false });
            }
            if (!response.error && response.count && page > 1 && from >= response.count) {
              workspaceUiState.setRequestsPage(Math.max(1, Math.ceil(response.count / listItemsPerPage)));
              return fetchRequestPage(filter, options);
            }
            return response;
          }
          async function countRequests(filter) {
            const response = await applyRequestQueryFilters(
              getSupabaseClient().from("maintenance_requests").select("id", { count: "exact", head: true }),
              filter
            );
            if (response.error) {
              warn("Request count failed", response.error);
              return 0;
            }
            return response.count || 0;
          }
          async function loadRequestDashboardCounts() {
            const [active, converted, all] = await Promise.all([
              countRequests("active"),
              countRequests("converted"),
              countRequests("all")
            ]);
            return { active, converted, all };
          }
          async function fetchWorkOrderPage(options = {}) {
            if (workspaceUiState.getWorkOrderSearchMode() && workspaceUiState.getSearchQuery().trim()) {
              return fetchExactSearchedWorkOrderPage(options);
            }
            const page = Math.max(1, workspaceUiState.getWorkOrderPage());
            const from = (page - 1) * workOrdersPerPage;
            const to = from + workOrdersPerPage - 1;
            const selectClause = options.includeLocationRelation === false ? workOrderFallbackSelect : workOrderRelationSelect;
            const response = await applyWorkOrderListFilters(
              selectWorkOrders(getSupabaseClient(), selectClause, { count: "exact" })
            ).range(from, to);
            if (!response.error && response.count && page > 1 && from >= response.count) {
              workspaceUiState.setWorkOrderPage(Math.max(1, Math.ceil(response.count / workOrdersPerPage)));
              return fetchWorkOrderPage(options);
            }
            return response;
          }
          async function countWorkOrders(options = {}) {
            const response = await applyWorkOrderFilters(countWorkOrdersQuery(getSupabaseClient()), options);
            if (response.error) {
              warn("Work order count failed", response.error);
              return 0;
            }
            return response.count || 0;
          }
          async function loadWorkOrderDashboardCounts() {
            const [activeWork, newWork, inProgress, blocked, overdue, completedAll, completedMonth, completedWeek] = await Promise.all([
              countWorkOrders({ statusFilter: "active", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "open", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "in_progress", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "blocked", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "overdue", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "completed", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "completed_month", includeQueue: false, includeSearch: false }),
              countWorkOrders({ statusFilter: "completed_week", includeQueue: false, includeSearch: false })
            ]);
            return { activeWork, newWork, inProgress, blocked, overdue, completedAll, completedMonth, completedWeek };
          }
          async function loadMyWorkDashboardCounts() {
            const [activeWork, newWork, inProgress, blocked, overdue, completedAll, completedMonth, completedWeek] = await Promise.all([
              countWorkOrders({ statusFilter: "active", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "open", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "in_progress", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "blocked", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "overdue", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "completed", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "completed_month", section: "mywork", includeQueue: true, includeSearch: true }),
              countWorkOrders({ statusFilter: "completed_week", section: "mywork", includeQueue: true, includeSearch: true })
            ]);
            return { activeWork, newWork, inProgress, blocked, overdue, completedAll, completedMonth, completedWeek };
          }
          return {
            fetchRequestPage,
            countRequests,
            loadRequestDashboardCounts,
            fetchWorkOrderPage,
            countWorkOrders,
            loadWorkOrderDashboardCounts,
            loadMyWorkDashboardCounts
          };
        }
        const api = { createWorkspaceQueueLoaders };
        if (typeof window !== "undefined") window.MaintainOpsWorkspaceQueueLoadersService = api;
        if (typeof module !== "undefined") module.exports = api;
      })();
    }
  });

  // src/services/authSessionFlow.js
  var require_authSessionFlow = __commonJS({
    "src/services/authSessionFlow.js"(exports, module) {
      (function() {
        function createAuthSessionFlow(deps = {}) {
          const windowRef = deps.windowRef || window;
          const documentRef = deps.documentRef || document;
          const app = deps.app;
          function authCallbackRedirectUrl() {
            return windowRef.MaintainOpsAuthRedirects.authCallbackUrl(windowRef.location, windowRef.PUBLIC_APP_URL);
          }
          function passwordResetRedirectUrl() {
            return windowRef.MaintainOpsAuthRedirects.cleanAuthUrl(windowRef.location);
          }
          function clearPasswordRecoveryUrl() {
            windowRef.history.replaceState({}, documentRef.title, windowRef.MaintainOpsAuthRedirects.cleanAuthUrl(windowRef.location));
          }
          async function startAuthCallback(params) {
            renderAuthCallback("Verifying your account...");
            try {
              if (params.error || params.errorDescription) {
                throw new Error(params.errorDescription || params.error || "This verification link is invalid or expired.");
              }
              let callbackSession = null;
              if (params.code) {
                const { data, error } = await deps.supabaseClient.auth.exchangeCodeForSession(params.code);
                if (error) throw error;
                callbackSession = data?.session || null;
              } else if (params.accessToken && params.refreshToken) {
                const { data, error } = await deps.supabaseClient.auth.setSession({
                  access_token: params.accessToken,
                  refresh_token: params.refreshToken
                });
                if (error) throw error;
                callbackSession = data?.session || null;
              }
              if (!callbackSession) {
                const { data, error } = await deps.supabaseClient.auth.getSession();
                if (error) throw error;
                callbackSession = data?.session || null;
              }
              if (!callbackSession) {
                throw new Error("The verification link did not create a session. Request a new verification email and try again.");
              }
              deps.setSession(callbackSession);
              clearPasswordRecoveryUrl();
              renderAuthCallback("Verification complete. Loading workspace...");
              await deps.render();
            } catch (error) {
              clearPasswordRecoveryUrl();
              renderAuthCallbackError(error.message || "This verification link is invalid or expired.");
            }
          }
          function renderAuthCallback(message) {
            documentRef.body.classList.remove("public-qr-mode");
            app.innerHTML = deps.authCallback(message);
          }
          function renderAuthCallbackError(message) {
            documentRef.body.classList.remove("public-qr-mode");
            app.innerHTML = deps.authCallbackError(message);
            documentRef.querySelector("#auth-back-to-login").addEventListener("click", () => deps.renderAuth("login"));
          }
          async function startPasswordRecovery(params = deps.passwordRecoveryParamsFromUrl()) {
            let ready = false;
            let initialError = "";
            if (params.accessToken && params.refreshToken) {
              const { data, error } = await deps.supabaseClient.auth.setSession({
                access_token: params.accessToken,
                refresh_token: params.refreshToken
              });
              ready = Boolean(data?.session && !error);
              if (error) {
                initialError = "This reset link is expired or invalid. Send a new password reset email and use the newest link.";
              }
            } else {
              initialError = "This reset link is missing the secure session. Send a new password reset email and use the newest link.";
            }
            renderPasswordRecovery({ ready, initialError });
          }
          function renderPasswordResetRequest(initialError = "", initialStatus = "") {
            documentRef.body.classList.remove("public-qr-mode");
            app.innerHTML = deps.passwordResetRequest(initialError, initialStatus);
            documentRef.querySelector("#auth-back-to-login").addEventListener("click", () => deps.renderAuth("login"));
            documentRef.querySelector("#auth-reset").addEventListener("click", deps.resetLoginState);
            documentRef.querySelector("#password-reset-request-form").addEventListener("submit", async (event) => {
              event.preventDefault();
              const formElement = event.target;
              const submitButton = formElement.querySelector("button[type='submit']");
              const errorTarget = documentRef.querySelector("#auth-error");
              const statusTarget = documentRef.querySelector("#auth-status");
              const email = String(new FormData(formElement).get("email") || "").trim();
              errorTarget.textContent = "";
              statusTarget.textContent = "Sending reset link...";
              submitButton.disabled = true;
              submitButton.textContent = "Sending...";
              try {
                const { error } = await deps.withOperationTimeout(
                  deps.supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: passwordResetRedirectUrl() }),
                  "Password reset email timed out. Check your connection and try again.",
                  2e4
                );
                if (error) {
                  statusTarget.textContent = "";
                  errorTarget.textContent = error.message;
                  return;
                }
                statusTarget.textContent = "If that email exists in Supabase, a reset link has been sent.";
              } catch (error) {
                statusTarget.textContent = "";
                errorTarget.textContent = error.message || "Could not send reset link.";
              } finally {
                if (documentRef.body.contains(submitButton)) {
                  submitButton.disabled = false;
                  submitButton.textContent = "Send Reset Link";
                }
              }
            });
          }
          function renderPasswordRecovery({ ready = false, initialError = "" } = {}) {
            documentRef.body.classList.remove("public-qr-mode");
            app.innerHTML = deps.passwordRecovery({ ready, initialError });
            documentRef.querySelector("#auth-back-to-login").addEventListener("click", () => {
              clearPasswordRecoveryUrl();
              deps.renderAuth("login");
            });
            documentRef.querySelector("#auth-send-new-reset").addEventListener("click", () => {
              clearPasswordRecoveryUrl();
              renderPasswordResetRequest();
            });
            documentRef.querySelector("#password-recovery-form").addEventListener("submit", async (event) => {
              event.preventDefault();
              if (!ready) return;
              const formElement = event.target;
              const submitButton = formElement.querySelector("button[type='submit']");
              const form = new FormData(formElement);
              const password = String(form.get("password") || "");
              const confirmPassword = String(form.get("confirmPassword") || "");
              const errorTarget = documentRef.querySelector("#auth-error");
              const statusTarget = documentRef.querySelector("#auth-status");
              errorTarget.textContent = "";
              if (password.length < 8) {
                errorTarget.textContent = "Password must be at least 8 characters.";
                return;
              }
              if (password !== confirmPassword) {
                errorTarget.textContent = "Passwords do not match.";
                return;
              }
              statusTarget.textContent = "Updating password...";
              submitButton.disabled = true;
              submitButton.textContent = "Updating...";
              try {
                const { error } = await deps.withOperationTimeout(
                  deps.supabaseClient.auth.updateUser({ password }),
                  "Password update timed out. Try the newest reset link again.",
                  2e4
                );
                if (error) {
                  statusTarget.textContent = "";
                  errorTarget.textContent = error.message;
                  return;
                }
                clearPasswordRecoveryUrl();
                const { data } = await deps.supabaseClient.auth.getSession();
                deps.setSession(data.session);
                statusTarget.textContent = data.session ? "Password updated. Loading workspace..." : "Password updated. Sign in with your new password.";
                if (data.session) {
                  await deps.render();
                  return;
                }
                deps.renderAuth("login", "Password updated. Sign in with your new password.");
              } catch (error) {
                statusTarget.textContent = "";
                errorTarget.textContent = error.message || "Could not update password.";
              } finally {
                if (documentRef.body.contains(submitButton)) {
                  submitButton.disabled = false;
                  submitButton.textContent = "Update Password";
                }
              }
            });
          }
          return {
            authCallbackRedirectUrl,
            passwordResetRedirectUrl,
            clearPasswordRecoveryUrl,
            startAuthCallback,
            renderAuthCallback,
            renderAuthCallbackError,
            startPasswordRecovery,
            renderPasswordResetRequest,
            renderPasswordRecovery
          };
        }
        window.MaintainOpsAuthSessionFlow = {
          createAuthSessionFlow
        };
        if (typeof module !== "undefined") {
          module.exports = { createAuthSessionFlow };
        }
      })();
    }
  });

  // src/render/relationshipDisplay.js
  var require_relationshipDisplay = __commonJS({
    "src/render/relationshipDisplay.js"(exports, module) {
      (function() {
        function renderActivityItem(item, deps) {
          const profilesByUserId = deps.getProfilesByUserId();
          if (item.type === "comment") {
            return `
      <article class="relationship-detail comment">
        <strong>${deps.escapeHtml(profilesByUserId[item.author_id]?.full_name || "Team member")}</strong>
        <span>${new Date(item.created_at).toLocaleString()}</span>
        <p>${deps.escapeHtml(item.body)}</p>
      </article>
    `;
          }
          if (item.type === "photo") {
            return `
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${deps.photoMetaText(item)} &middot; ${deps.escapeHtml(profilesByUserId[item.uploaded_by]?.full_name || "Team member")}</span>
        <p>${deps.escapeHtml(item.file_name)}</p>
        ${item.signedUrl ? `<a href="${deps.escapeHtml(item.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
      </article>
    `;
          }
          if (item.type === "part") {
            const unitCost = deps.partUsageUnitCost(item);
            const totalCost = unitCost * (Number(item.quantity_used) || 0);
            return `
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(item.created_at).toLocaleString()} &middot; ${deps.escapeHtml(profilesByUserId[item.created_by]?.full_name || "Team member")}</span>
        <p>${deps.escapeHtml(item.parts?.name || "Part")} - ${Number(item.quantity_used) || 0} used - ${deps.money(totalCost)}</p>
      </article>
    `;
          }
          return `
    <article>
      <strong>${deps.escapeHtml(item.event_type.replaceAll("_", " "))}</strong>
      <span>${new Date(item.created_at).toLocaleString()} \xC2\xB7 ${deps.escapeHtml(profilesByUserId[item.actor_id]?.full_name || "Team member")}</span>
      <p>${deps.escapeHtml(item.summary)}</p>
    </article>
  `;
        }
        function renderRelationshipChips(workOrder, deps) {
          const procedureTemplates = deps.getProcedureTemplates();
          const partsUsedByWorkOrder = deps.getPartsUsedByWorkOrder();
          const commentsByWorkOrder = deps.getCommentsByWorkOrder();
          const photosByWorkOrder = deps.getPhotosByWorkOrder();
          const messageThreads = deps.getMessageThreads();
          const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
          const progress = procedure ? deps.checklistProgress(workOrder, procedure) : null;
          const partsCount = (partsUsedByWorkOrder[workOrder.id] || []).length;
          const commentsCount = (commentsByWorkOrder[workOrder.id] || []).length;
          const photosCount = (photosByWorkOrder[workOrder.id] || []).length;
          const messageCount = messageThreads.filter((thread) => thread.work_order_id === workOrder.id).length;
          const chips = [];
          if (workOrder.asset_id) {
            chips.push(relationshipChip("asset", "Equipment", workOrder.assets?.name || "Linked", deps));
          }
          if (procedure && progress) {
            chips.push(relationshipChip("procedure", "Procedure checklist", `${progress.done}/${progress.total}`, deps));
          }
          if (partsCount) {
            chips.push(relationshipChip("parts", "Parts", String(partsCount), deps));
          }
          if (commentsCount) {
            chips.push(relationshipChip("comment", "Comments", String(commentsCount), deps));
          }
          if (messageCount) {
            chips.push(relationshipChip("message", "Messages", String(messageCount), deps));
          }
          if (photosCount) {
            chips.push(photoJumpChip(workOrder.id, String(photosCount), deps));
          }
          return chips.length ? `<div class="relationship-row">${chips.join("")}</div>` : "";
        }
        function relationshipChip(type, label, value, deps) {
          return `
    <span class="relationship-chip ${type}" title="${deps.escapeHtml(label)}">
      ${relationshipIcon(type)}
      <span>${deps.escapeHtml(value)}</span>
    </span>
  `;
        }
        function photoJumpChip(workOrderId, value, deps) {
          return `
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${deps.escapeHtml(workOrderId)}" title="Open photos">
      ${relationshipIcon("photo")}
      <span>${deps.escapeHtml(value)}</span>
    </button>
  `;
        }
        function relationshipIcon(type) {
          const icons = {
            asset: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>`,
            procedure: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>`,
            parts: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>`,
            comment: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>`,
            message: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>`,
            photo: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>`
          };
          return icons[type] || "";
        }
        function createRelationshipDisplayHelpers(deps) {
          return Object.freeze({
            renderActivityItem: (item) => renderActivityItem(item, deps),
            renderRelationshipChips: (workOrder) => renderRelationshipChips(workOrder, deps),
            relationshipChip: (type, label, value) => relationshipChip(type, label, value, deps),
            photoJumpChip: (workOrderId, value) => photoJumpChip(workOrderId, value, deps),
            relationshipIcon
          });
        }
        window.MaintainOpsRelationshipDisplay = Object.freeze({
          createRelationshipDisplayHelpers
        });
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createRelationshipDisplayHelpers };
        }
      })();
    }
  });

  // src/render/requestDisplay.js
  var require_requestDisplay = __commonJS({
    "src/render/requestDisplay.js"(exports, module) {
      (function() {
        function createRequestDisplayHelpers(deps) {
          const segmentIcon = deps.segmentIcon;
          const escapeHtml = deps.escapeHtml;
          const renderAssetOptions = deps.renderAssetOptions;
          const renderMaintenanceRequestPhoto = deps.renderMaintenanceRequestPhoto;
          const isConvertedRequest = deps.isConvertedRequest;
          const canDeleteOperationalRecords = deps.canDeleteOperationalRecords;
          const canEditOperationalRecords = deps.canEditOperationalRecords || (() => true);
          const getPendingDeleteRequestId = deps.getPendingDeleteRequestId;
          const getProfilesByUserId = deps.getProfilesByUserId;
          function requestPanelSubtitle(filter, count) {
            if (filter === "converted") return `${count} converted`;
            if (filter === "all") return `${count} total`;
            return `${count} active`;
          }
          function renderRequestFilterBar(counts, selectedFilter, options = {}) {
            const filters = [
              ["active", "Active", counts.active],
              ["converted", "Converted", counts.converted],
              ["all", "All", counts.all]
            ];
            return `
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${filters.map(([id, label, count]) => `
            <button class="segment ${selectedFilter === id ? "active" : ""}" data-request-filter="${id}" type="button" ${options.locked && id !== "active" ? "disabled" : ""}>
              ${segmentIcon(id === "active" ? "open" : id === "converted" ? "completed" : "all")}${label} <span>${count}</span>
            </button>
          `).join("")}
        </div>
      `;
          }
          function renderMaintenanceRequest(request) {
            const converted = isConvertedRequest(request);
            const canEditOperational = canEditOperationalRecords();
            const confirming = getPendingDeleteRequestId() === request.id;
            const profilesByUserId = getProfilesByUserId();
            const requestedAt = request.created_at ? new Date(request.created_at) : null;
            const requestedAtLabel = requestedAt && !Number.isNaN(requestedAt.getTime()) ? requestedAt.toLocaleString() : "date unavailable";
            const equipmentLabel = request.assets?.name || request.locations?.name || "No equipment";
            const requesterLabel = request.requested_by_name || profilesByUserId[request.requested_by]?.full_name || "Requester";
            const deleteControls = canEditOperational && canDeleteOperationalRecords() ? confirming ? `
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${escapeHtml(request.id)}" type="button">Permanently Delete</button>
      ` : `
        <button class="danger-action-button" data-delete-request="${escapeHtml(request.id)}" type="button">Delete</button>
      ` : "";
            return `
        <article class="request-card ${converted ? "converted-request" : "active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${request.priority}">${escapeHtml(request.priority)}</span>
                <span class="chip ${converted ? "completed" : "open"}">${converted ? "converted" : escapeHtml(request.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${escapeHtml(request.title)}</h3>
            <p>${escapeHtml(request.description || "No description.")}</p>
            ${renderMaintenanceRequestPhoto(request)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${escapeHtml(equipmentLabel)}</span>
              <span><strong>Requester</strong>${escapeHtml(requesterLabel)}</span>
              <span><strong>Received</strong>${escapeHtml(requestedAtLabel)}</span>
            </div>
          </div>
          ${canEditOperational && !converted && request.status === "submitted" ? `
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${request.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${request.id}" type="button">Convert to Work Order</button>
              ${deleteControls}
            </div>
          ` : converted ? `
            <div class="request-actions request-converted-note">
              <span>Converted to work order</span>
              ${deleteControls}
            </div>
          ` : ""}
        </article>
      `;
          }
          function renderRequestFormContent() {
            return `
        <form class="form-grid" id="request-form">
          <label>Request title<input name="title" required placeholder="Cold room door not sealing"></label>
          <label>Your name<input name="requester_name" required maxlength="120" placeholder="Who is submitting this?"></label>
          <fieldset class="equipment-choice request-equipment-choice" data-equipment-choice>
            <legend>Machine / area</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose saved equipment or an unlisted area">
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode> Saved equipment</label>
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode checked> Equipment not listed / general area</label>
            </div>
            <div data-equipment-choice-panel="existing" hidden>
              <label>Saved equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing data-equipment-choice-required="true" disabled>
                  <option value="">Choose saved equipment</option>
                  ${renderAssetOptions()}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new">
              <label>Equipment name or general area<input name="equipment_note" data-equipment-choice-new data-equipment-choice-required="true" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
            </div>
          </fieldset>
          <label>Details<textarea name="description" rows="4" required placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
          <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
          <p class="error-text" data-asset-location-warning></p>
          <label>Priority
            <select name="priority">
              <option>medium</option>
              <option>high</option>
              <option>critical</option>
              <option>low</option>
            </select>
          </label>
          <p class="error-text" id="request-error"></p>
          <button class="primary-button request-action-button" type="submit">Submit Request</button>
        </form>
      `;
          }
          return {
            requestPanelSubtitle,
            renderRequestFilterBar,
            renderMaintenanceRequest,
            renderRequestFormContent
          };
        }
        window.MaintainOpsRequestDisplay = {
          createRequestDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createRequestDisplayHelpers };
        }
      })();
    }
  });

  // src/render/workQueueDisplay.js
  var require_workQueueDisplay = __commonJS({
    "src/render/workQueueDisplay.js"(exports, module) {
      (function() {
        function createWorkQueueDisplayHelpers({
          statusLabel,
          teamMemberName,
          getWorkOrderAssigneeFilter,
          getWorkOrderFilter,
          getActiveStatusFilter,
          getMyWorkFilter,
          getActiveSection,
          getDueState,
          getProcedureTemplates,
          getActiveWorkOrderId,
          getProfilesByUserId,
          getSession,
          STATUS_OPTIONS,
          OUTSIDE_VENDOR_VALUE,
          escapeHtml,
          cleanWorkOrderDescription,
          relationshipIcon,
          segmentIcon,
          isVendorAssigned,
          assignmentLabel,
          renderRelationshipChips,
          canAssignWorkOrderToMe,
          canManageTeam
        }) {
          function workOrdersPanelTitle() {
            const workOrderAssigneeFilter = getWorkOrderAssigneeFilter();
            const workOrderFilter = getWorkOrderFilter();
            const activeStatusFilter = getActiveStatusFilter();
            const baseTitle = workOrderAssigneeFilter ? `${teamMemberName(workOrderAssigneeFilter)} Work` : workOrderFilter === "unassigned" ? "Unassigned Work Orders" : workOrderFilter === "vendor" ? "Outside Vendor Work" : workOrderFilter === "assigned" ? "Assigned Work Orders" : "All Work Orders";
            if (activeStatusFilter === "active" || activeStatusFilter === "all") return baseTitle;
            return `${statusLabel(activeStatusFilter)} - ${baseTitle}`;
          }
          function myWorkPanelTitle() {
            const activeStatusFilter = getActiveStatusFilter();
            if (activeStatusFilter === "active" || activeStatusFilter === "all") return "My Work";
            return `${statusLabel(activeStatusFilter)} - My Work`;
          }
          function workQueuePanelTitle() {
            return getActiveSection() === "mywork" ? myWorkPanelTitle() : workOrdersPanelTitle();
          }
          function workQueuePanelSubtitle(count) {
            const activeSection = getActiveSection();
            const myWorkFilter = getMyWorkFilter();
            const context = activeSection === "mywork" ? myWorkFilter === "created" ? "Created By Me" : "Assigned To Me" : "shown";
            return activeSection === "mywork" ? `${count} shown - ${context}` : `${count} shown`;
          }
          function renderWorkOrderCard(workOrder) {
            const dueState = getDueState(workOrder);
            const procedure = getProcedureTemplates().find((template) => template.id === workOrder.procedure_template_id);
            const createdDate = workOrder.created_at ? new Date(workOrder.created_at) : null;
            const createdLabel = createdDate && !Number.isNaN(createdDate.getTime()) ? createdDate.toLocaleDateString() : "";
            const isCompleted = workOrder.status === "completed";
            return `
        <article class="work-card status-card status-${workOrder.status} ${workOrder.id === getActiveWorkOrderId() ? "selected" : ""}" data-id="${workOrder.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
              <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
              <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
              ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${escapeHtml(workOrder.title)}</h3>
            <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${relationshipIcon("asset")}${escapeHtml(workOrder.assets?.name || "General item / area")}</span>
            <span>${segmentIcon(isVendorAssigned(workOrder) ? "vendor" : "mine")}${escapeHtml(assignmentLabel(workOrder))}</span>
            ${procedure ? `<span>${relationshipIcon("procedure")}${escapeHtml(procedure.name)}</span>` : ""}
            <span>${segmentIcon("due")}Due ${workOrder.due_at || "unset"}</span>
            ${createdLabel ? `<span>${segmentIcon("created")}Created ${escapeHtml(createdLabel)}</span>` : ""}
            ${workOrder.completed_at ? `<span>${segmentIcon("completed")}Completed ${new Date(workOrder.completed_at).toLocaleDateString()}</span>` : ""}
          </div>
          ${renderRelationshipChips(workOrder)}
          <div class="quick-actions work-card-actions">
            ${!isCompleted && canAssignWorkOrderToMe(workOrder) ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">Assign to me</button>` : ""}
            ${!isCompleted && canManageTeam() ? renderCardAssignmentControl(workOrder) : ""}
          ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).slice(0, 3).map((status) => `
            <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
          `).join("")}
        </div>
      </article>
    `;
          }
          function renderCardAssignmentControl(workOrder) {
            return `
        <form class="card-assign-form" data-card-assign="${workOrder.id}">
          <select name="assigned_to" aria-label="Assign ${escapeHtml(workOrder.title)}">
            <option value="">Unassigned</option>
            <option value="${OUTSIDE_VENDOR_VALUE}" ${isVendorAssigned(workOrder) ? "selected" : ""}>Outside vendor</option>
            ${Object.entries(getProfilesByUserId()).map(([userId, profile]) => `<option value="${userId}" ${!isVendorAssigned(workOrder) && userId === workOrder.assigned_to ? "selected" : ""}>${escapeHtml(profile.full_name || teamMemberName(userId))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `;
          }
          function renderAssignmentSelect(selectedValue = "", options = {}) {
            const selected = selectedValue || "";
            const allowManagerOptions = options.managerOptions ?? canManageTeam();
            const allowUnassigned = options.allowUnassigned !== false;
            const selfLabel = options.selfLabel || "Assign to me";
            const optionsHtml = [];
            if (allowUnassigned) {
              optionsHtml.push(`<option value="" ${selected === "" ? "selected" : ""}>Unassigned</option>`);
            }
            optionsHtml.push(`<option value="${getSession().user.id}" ${selected === getSession().user.id ? "selected" : ""}>${selfLabel}</option>`);
            if (allowManagerOptions) {
              optionsHtml.push(`<option value="${OUTSIDE_VENDOR_VALUE}" ${selected === OUTSIDE_VENDOR_VALUE ? "selected" : ""}>Outside vendor</option>`);
              optionsHtml.push(...Object.entries(getProfilesByUserId()).filter(([userId]) => userId !== getSession().user.id).map(([userId, profile]) => `<option value="${userId}" ${selected === userId ? "selected" : ""}>${escapeHtml(profile.full_name || teamMemberName(userId))}</option>`));
            }
            return optionsHtml.join("");
          }
          function assignmentFormValue(workOrder) {
            if (isVendorAssigned(workOrder)) return OUTSIDE_VENDOR_VALUE;
            return workOrder?.assigned_to || "";
          }
          function renderWorkOrderAssignmentField(workOrder, id = "") {
            const currentValue = assignmentFormValue(workOrder);
            if (workOrder?.status === "completed") {
              return `
          <label ${id ? `id="${id}"` : ""}>Completed by / assigned to
            <input value="${escapeHtml(assignmentLabel(workOrder))}" disabled>
            <input name="assigned_to" type="hidden" value="${escapeHtml(currentValue)}">
          </label>
        `;
            }
            if (canManageTeam()) {
              return `
          <label ${id ? `id="${id}"` : ""}>Assign to
            <select name="assigned_to">
              ${renderAssignmentSelect(currentValue, { managerOptions: true })}
            </select>
          </label>
        `;
            }
            if (!workOrder.assigned_to && !isVendorAssigned(workOrder)) {
              return `
          <label ${id ? `id="${id}"` : ""}>Assign to
            <select name="assigned_to">
              ${renderAssignmentSelect("", { managerOptions: false, selfLabel: "Assign to me" })}
            </select>
          </label>
        `;
            }
            return `
        <label ${id ? `id="${id}"` : ""}>Assigned to
          <input value="${escapeHtml(assignmentLabel(workOrder))}" disabled>
          <input name="assigned_to" type="hidden" value="${escapeHtml(currentValue)}">
        </label>
      `;
          }
          return {
            workOrdersPanelTitle,
            myWorkPanelTitle,
            workQueuePanelTitle,
            workQueuePanelSubtitle,
            renderWorkOrderCard,
            renderCardAssignmentControl,
            renderAssignmentSelect,
            renderWorkOrderAssignmentField
          };
        }
        window.MaintainOpsWorkQueueDisplay = {
          createWorkQueueDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createWorkQueueDisplayHelpers };
        }
      })();
    }
  });

  // src/render/miniWorkOrderDisplay.js
  var require_miniWorkOrderDisplay = __commonJS({
    "src/render/miniWorkOrderDisplay.js"(exports, module) {
      (function() {
        function createMiniWorkOrderDisplayHelpers({
          escapeHtml,
          statusLabel,
          relationshipIcon,
          getPartsUsedByWorkOrder,
          getPhotosByWorkOrder,
          teamMemberName
        }) {
          function renderMiniWorkOrder(workOrder) {
            return `
        <article class="mini-work-order" data-mini-work-order="${workOrder.id}">
          <strong>${escapeHtml(workOrder.title)}</strong>
          <span>${statusLabel(workOrder.status)} - ${workOrder.due_at || "no due date"}</span>
        </article>
      `;
          }
          function renderAssetMiniWorkOrder(workOrder) {
            const partsCount = (getPartsUsedByWorkOrder()[workOrder.id] || []).length;
            const photosCount = (getPhotosByWorkOrder()[workOrder.id] || []).length;
            const completedDate = workOrder.completed_at ? new Date(workOrder.completed_at).toLocaleDateString() : "";
            const completedBy = workOrder.completed_by ? teamMemberName(workOrder.completed_by) : "";
            const ownerFallback = !completedBy && workOrder.assigned_to ? teamMemberName(workOrder.assigned_to) : "";
            const completedActorText = completedBy ? ` by ${escapeHtml(completedBy)}` : ownerFallback ? ` - owner ${escapeHtml(ownerFallback)}` : "";
            const outcome = workOrder.resolution_summary || workOrder.completion_notes || "";
            return `
        <article class="mini-work-order ${workOrder.status === "completed" ? "completed-history" : ""}" data-mini-work-order="${workOrder.id}">
          <div class="chip-row">
            <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
            ${workOrder.follow_up_needed ? `<span class="chip blocked">follow-up</span>` : ""}
            ${partsCount ? `<span class="relationship-chip parts">${relationshipIcon("parts")}<span>${partsCount}</span></span>` : ""}
            ${photosCount ? `<span class="relationship-chip photo">${relationshipIcon("photo")}<span>${photosCount}</span></span>` : ""}
          </div>
          <strong>${escapeHtml(workOrder.title)}</strong>
          <span>${completedDate ? `Completed ${completedDate}${completedActorText}` : `Due ${workOrder.due_at || "unset"}`}</span>
          ${workOrder.failure_cause ? `<p><b>Finding:</b> ${escapeHtml(workOrder.failure_cause)}</p>` : ""}
          ${outcome ? `<p><b>Resolution:</b> ${escapeHtml(outcome)}</p>` : ""}
        </article>
      `;
          }
          return {
            renderMiniWorkOrder,
            renderAssetMiniWorkOrder
          };
        }
        window.MaintainOpsMiniWorkOrderDisplay = {
          createMiniWorkOrderDisplayHelpers
        };
        if (typeof module !== "undefined" && module.exports) {
          module.exports = { createMiniWorkOrderDisplayHelpers };
        }
      })();
    }
  });

  // src/render/partsDisplay.js
  var require_partsDisplay = __commonJS({
    "src/render/partsDisplay.js"(exports, module) {
      (function() {
        function createPartsDisplayHelpers({
          escapeHtml,
          money,
          isLowStockPart,
          matchesActiveLocation,
          getParts,
          getPartDocumentsByPartId,
          getPartDocumentsReady,
          getPendingDeletePartId,
          getShowPartSourceManager,
          getPartCostsReady,
          getPartInventoryFilter,
          getPartSearchQuery,
          partUsageRows,
          canDeleteParts,
          canEditOperationalRecords = () => true,
          renderPartSourceOptions,
          renderPartMachineOptions,
          renderPartSourceManager
        }) {
          const PART_DOCUMENT_TYPES = [
            ["part_photo", "Part photos"],
            ["receipt", "Receipts"],
            ["invoice", "Invoices"],
            ["part_print", "Part prints"],
            ["schematic", "Schematics"],
            ["manual", "Manuals"],
            ["spec_sheet", "Spec sheets"],
            ["warranty", "Warranty"],
            ["other", "Other files"]
          ];
          const PART_DOCUMENT_TYPE_LABELS = PART_DOCUMENT_TYPES.reduce((labels, [value, label]) => {
            labels[value] = label.replace(/s$/, "");
            return labels;
          }, {});
          function partDocumentType(document2) {
            if (document2.document_type) return document2.document_type;
            if (String(document2.content_type || "").startsWith("image/")) return "part_photo";
            if (/invoice/i.test(document2.file_name || "")) return "invoice";
            if (/receipt/i.test(document2.file_name || "")) return "receipt";
            if (/schematic|diagram/i.test(document2.file_name || "")) return "schematic";
            if (/print|drawing/i.test(document2.file_name || "")) return "part_print";
            if (/manual/i.test(document2.file_name || "")) return "manual";
            if (/spec|cut.?sheet|datasheet/i.test(document2.file_name || "")) return "spec_sheet";
            return "other";
          }
          function renderDocumentTypeOptions() {
            return PART_DOCUMENT_TYPES.map(([value, label]) => `
        <option value="${value}">${escapeHtml(PART_DOCUMENT_TYPE_LABELS[value] || label)}</option>
      `).join("");
          }
          function renderPartDocumentCard(document2) {
            const type = partDocumentType(document2);
            const isImage = String(document2.content_type || "").startsWith("image/");
            const typeLabel = PART_DOCUMENT_TYPE_LABELS[type] || "File";
            const uploaded = document2.created_at ? new Date(document2.created_at).toLocaleString() : "Uploaded";
            const sizeText = document2.file_size_bytes ? `${Math.round(Number(document2.file_size_bytes) / 1024)} KB` : "";
            return `
        <article class="part-document-card ${isImage ? "image-file" : ""}">
          ${isImage && document2.signedUrl ? `<a class="part-document-thumb" href="${escapeHtml(document2.signedUrl)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(document2.signedUrl)}" alt="${escapeHtml(document2.file_name)}"></a>` : ""}
          <div>
            <div class="chip-row">
              <span class="chip">${escapeHtml(typeLabel)}</span>
              ${sizeText ? `<span class="chip">${escapeHtml(sizeText)}</span>` : ""}
            </div>
            <strong>${escapeHtml(document2.file_name)}</strong>
            <span>${escapeHtml(uploaded)}</span>
            ${document2.original_file_name && document2.original_file_name !== document2.file_name ? `<small>Original: ${escapeHtml(document2.original_file_name)}</small>` : ""}
            ${document2.signedUrl ? `<a href="${escapeHtml(document2.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>` : ""}
          </div>
        </article>
      `;
          }
          function renderPartDocumentSection([type, label], documents) {
            const grouped = documents.filter((document2) => partDocumentType(document2) === type);
            if (!grouped.length) return "";
            return `
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${escapeHtml(label)}</h4>
            <span>${grouped.length}</span>
          </div>
          <div class="part-document-grid">
            ${grouped.map(renderPartDocumentCard).join("")}
          </div>
        </section>
      `;
          }
          function renderPartDocumentSummary(documents) {
            const counts = documents.reduce((summary, document2) => {
              const type = partDocumentType(document2);
              summary[type] = (summary[type] || 0) + 1;
              return summary;
            }, {});
            const summaryTypes = ["part_photo", "receipt", "invoice", "part_print", "schematic", "manual", "spec_sheet"];
            return summaryTypes.filter((type) => counts[type]).map((type) => `<span class="chip">${counts[type]} ${escapeHtml(PART_DOCUMENT_TYPE_LABELS[type] || "file")}${counts[type] === 1 ? "" : "s"}</span>`).join("");
          }
          function renderPart(part) {
            const quantity = Number(part.quantity_on_hand) || 0;
            const reorderPoint = Number(part.reorder_point) || 0;
            const unitCost = Number(part.unit_cost) || 0;
            const low = quantity <= reorderPoint;
            const restockNeed = Math.max(0, reorderPoint - quantity);
            return `
        <article class="part-card part-tile ${low ? "low-stock" : ""}" data-open-part="${part.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(part.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
              ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
              ${part.machine_note ? `<span class="chip">${escapeHtml(part.machine_note)}</span>` : ""}
              ${low ? `<span class="chip overdue">low stock</span>` : `<span class="chip open">stocked</span>`}
            </div>
            <h3>${escapeHtml(part.name)}</h3>
            <div class="part-card-meta">
              <span>${quantity} on hand</span>
              <span>reorder at ${reorderPoint}</span>
              <span>${getPartCostsReady() ? `${money(unitCost)} listed cost` : "Cost reference not active yet"}</span>
            </div>
            ${low && reorderPoint > 0 ? `<small>Need ${restockNeed} to reach reorder point.</small>` : ""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `;
          }
          function renderPartsHealth() {
            const locationParts = getParts().filter(matchesActiveLocation);
            const lowCount = locationParts.filter(isLowStockPart).length;
            const partInventoryFilter = getPartInventoryFilter();
            return [
              ["All Parts", locationParts.length, "all"],
              ["Low Stock", lowCount, "low"]
            ].map(([label, value, filter]) => `
        <button class="parts-health ${filter === "low" && value ? "attention" : ""} ${partInventoryFilter === filter ? "active" : ""}" data-part-inventory-filter="${filter}" type="button">
          <span>${label}</span>
          <strong>${value}</strong>
        </button>
      `).join("");
          }
          function renderPartSearch(partSort = "default") {
            return `
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${escapeHtml(getPartSearchQuery())}" placeholder="Search part name, SKU, source, count">
          </label>
          <button class="secondary-button" type="submit">Search</button>
        </form>
        <div class="part-sort-bar relationship-detail parts" aria-label="Parts sort">
          <label>Sort parts
            <select data-part-sort>
              <option value="default" ${partSort === "default" ? "selected" : ""}>Default</option>
              <option value="source" ${partSort === "source" ? "selected" : ""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `;
          }
          function renderPartDetail(part) {
            const quantity = Number(part.quantity_on_hand) || 0;
            const reorderPoint = Number(part.reorder_point) || 0;
            const unitCost = Number(part.unit_cost) || 0;
            const documents = getPartDocumentsByPartId()[part.id] || [];
            const documentSummary = renderPartDocumentSummary(documents);
            const canEditOperational = canEditOperationalRecords();
            return `
        <section class="part-detail-shell">
          ${canEditOperational ? renderPartSourceOptions() : ""}
          ${renderPartMachineOptions()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${part.sku ? `<span class="chip">${escapeHtml(part.sku)}</span>` : ""}
                ${part.supplier_name ? `<span class="chip part-source-chip">${escapeHtml(part.supplier_name)}</span>` : ""}
                ${part.machine_note ? `<span class="chip">${escapeHtml(part.machine_note)}</span>` : ""}
                <span class="chip ${quantity <= reorderPoint ? "overdue" : "open"}">${quantity <= reorderPoint ? "low stock" : "stocked"}</span>
              </div>
              <h3>${escapeHtml(part.name)}</h3>
              <p>${quantity} on hand - reorder at ${reorderPoint}</p>
              ${documentSummary ? `<div class="chip-row part-file-summary">${documentSummary}</div>` : ""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${canEditOperational ? `<div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${part.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${escapeHtml(part.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${part.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${escapeHtml(part.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>` : ""}
          </section>

          ${canEditOperational ? `<form class="part-detail-form relationship-detail parts" data-edit-part="${part.id}">
            <label>Name<input name="name" required value="${escapeHtml(part.name)}"></label>
            <label>SKU<input name="sku" value="${escapeHtml(part.sku || "")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${escapeHtml(part.supplier_name || "")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${escapeHtml(part.machine_note || "")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${quantity}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${reorderPoint}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${unitCost}"></label>
            <p class="error-text" data-part-edit-error="${part.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>` : ""}

          ${canEditOperational && getShowPartSourceManager() ? renderPartSourceManager() : ""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${documents.length} file${documents.length === 1 ? "" : "s"}</span>
            </div>
            ${canEditOperational ? `<form class="part-document-form" data-part-document="${part.id}">
              <label>File type<select name="document_type">${renderDocumentTypeOptions()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${part.id}">${getPartDocumentsReady() ? "" : "Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${getPartDocumentsReady() ? "" : "disabled"}>Attach File</button>
            </form>` : ""}
            <div class="part-document-list">
              ${documents.length ? PART_DOCUMENT_TYPES.map((type) => renderPartDocumentSection(type, documents)).join("") : `<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>`}
            </div>
          </section>

          ${canEditOperational ? renderPartDangerZone(part) : ""}
        </section>
      `;
          }
          function renderPartDangerZone(part) {
            const usageCount = partUsageRows(part.id).length;
            const documents = getPartDocumentsByPartId()[part.id] || [];
            const confirming = getPendingDeletePartId() === part.id;
            if (!canDeleteParts()) {
              return `<p class="muted">Admins and managers can delete unused parts.</p>`;
            }
            return `
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${usageCount ? `This part has ${usageCount} usage record${usageCount === 1 ? "" : "s"} tied to work order history, so it cannot be deleted.` : `This permanently removes the part${documents.length ? ` and ${documents.length} filed receipt/invoice record${documents.length === 1 ? "" : "s"}` : ""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${usageCount ? `
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          ` : confirming ? `
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${escapeHtml(part.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${escapeHtml(part.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          ` : `
            <button class="danger-action-button large-delete-button" data-delete-part="${escapeHtml(part.id)}" type="button">Delete Part</button>
          `}
        </section>
      `;
          }
          return {
            renderPart,
            renderPartsHealth,
            renderPartSearch,
            renderPartDetail,
            renderPartDangerZone
          };
        }
        window.MaintainOpsPartsDisplay = {
          createPartsDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createPartsDisplayHelpers };
        }
      })();
    }
  });

  // src/render/storageDashboardDisplay.js
  var require_storageDashboardDisplay = __commonJS({
    "src/render/storageDashboardDisplay.js"(exports, module) {
      (function() {
        function createStorageDashboardDisplayHelpers({
          escapeHtml,
          formatBytes
        }) {
          const bucketLabels = {
            "asset-documents": "Equipment files",
            "company-logos": "Company logos",
            "maintenance-request-photos": "Request photos",
            "part-documents": "Part files",
            "work-order-photos": "Work order photos"
          };
          const typeLabels = {
            company: "Company",
            equipment: "Equipment",
            part: "Part",
            request: "Request",
            work_order: "Work Order"
          };
          function byteText(value) {
            const bytes = Number(value) || 0;
            if (!bytes) return "0 B";
            if (bytes >= 1099511627776) {
              const terabytes = bytes / 1099511627776;
              return `${terabytes.toFixed(Number.isInteger(terabytes) ? 0 : 1)} TB`;
            }
            if (bytes >= 1073741824) {
              const gigabytes = bytes / 1073741824;
              return `${gigabytes.toFixed(Number.isInteger(gigabytes) ? 0 : 1)} GB`;
            }
            return formatBytes(bytes) || "0 B";
          }
          function percentText(value) {
            const number = Number(value) || 0;
            if (number <= 0) return "0%";
            if (number < 0.01) return "<0.01%";
            return `${number.toFixed(number >= 10 ? 1 : 2)}%`;
          }
          function medianBytes(values) {
            const sorted = values.map((value) => Number(value) || 0).sort((left, right) => left - right);
            if (!sorted.length) return 0;
            const middle = Math.floor(sorted.length / 2);
            if (sorted.length % 2) return sorted[middle];
            return (sorted[middle - 1] + sorted[middle]) / 2;
          }
          function durationTextFromMonths(value) {
            const totalMonths = Number(value) || 0;
            if (totalMonths <= 0) return "not enough usage history";
            const years = Math.floor(totalMonths / 12);
            const months = Math.floor(totalMonths % 12);
            const days = Math.max(Math.round((totalMonths - Math.floor(totalMonths)) * 30.4375), 0);
            const parts = [];
            if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
            if (months) parts.push(`${months} ${months === 1 ? "month" : "months"}`);
            if (days || !parts.length) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
            return parts.join(", ");
          }
          function bucketLabel(bucketId) {
            return bucketLabels[bucketId] || String(bucketId || "Storage");
          }
          function recordTypeLabel(recordType) {
            return typeLabels[recordType] || String(recordType || "Record");
          }
          function renderStorageMetric(label, value, detail) {
            return `
        <article class="storage-metric">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
          <small>${escapeHtml(detail || "")}</small>
        </article>
      `;
          }
          function renderStorageRules() {
            const rules = [
              {
                label: "Work Order Photos",
                cap: "Photos are automatically resized before upload",
                optimize: "Stored at 768px, target near 256 KB"
              },
              {
                label: "Request Photos",
                cap: "Photos are automatically resized before upload",
                optimize: "Stored at 768px, target near 256 KB"
              },
              {
                label: "Equipment Images",
                cap: "Images are resized before upload",
                optimize: "Target near 1 MB; non-image equipment files over 25 MB are blocked"
              },
              {
                label: "Part Images",
                cap: "Images are resized before upload",
                optimize: "Target near 1 MB; non-image part files over 25 MB are blocked"
              },
              {
                label: "Documents",
                cap: "Non-image files over 25 MB are blocked",
                optimize: "PDF, Word, Excel, CSV, and text files are stored as uploaded"
              },
              {
                label: "Company Logos",
                cap: "JPG, PNG, WebP, GIF, HEIC, and HEIF images are accepted",
                optimize: "Automatically resized to 1200px when possible"
              }
            ];
            return `
        <section class="storage-rules">
          <div class="settings-section-heading">
            <div>
              <strong>Storage Rules</strong>
              <span>Upload caps and optimization targets</span>
            </div>
          </div>
          <div class="storage-rule-list">
            ${rules.map((rule) => `
              <article class="storage-rule-row">
                <strong>${escapeHtml(rule.label)}</strong>
                <span>${escapeHtml(rule.cap)}</span>
                <small>${escapeHtml(rule.optimize)}</small>
              </article>
            `).join("")}
          </div>
        </section>
      `;
          }
          function renderBucketRow(bucket, totalBytes) {
            const sizeBytes = Number(bucket.size_bytes) || 0;
            const share = totalBytes ? sizeBytes / totalBytes * 100 : 0;
            return `
        <article class="storage-bucket-row">
          <div>
            <strong>${escapeHtml(bucketLabel(bucket.bucket_id))}</strong>
            <span>${Number(bucket.file_count) || 0} files</span>
          </div>
          <div class="storage-bar" aria-label="${escapeHtml(bucketLabel(bucket.bucket_id))} usage">
            <span style="width: ${Math.max(share, sizeBytes ? 1 : 0).toFixed(2)}%"></span>
          </div>
          <strong>${escapeHtml(byteText(sizeBytes))}</strong>
        </article>
      `;
          }
          function renderTopFileRow(file) {
            const section = file.link_section || "";
            const linkedId = file.linked_record_id || "";
            const canOpen = Boolean(section && linkedId);
            return `
        <article class="storage-file-row">
          <div class="storage-file-main">
            <strong title="${escapeHtml(file.object_path || "")}">${escapeHtml(file.file_name || file.object_path || "Stored file")}</strong>
            <span>${escapeHtml(bucketLabel(file.bucket_id))} - ${escapeHtml(recordTypeLabel(file.record_type))}</span>
          </div>
          <div class="storage-file-record">
            <span>${escapeHtml(file.linked_record_label || "Linked record")}</span>
            ${canOpen ? `<button class="secondary-button small" data-storage-record-link data-storage-link-section="${escapeHtml(section)}" data-storage-link-id="${escapeHtml(linkedId)}" data-storage-link-label="${escapeHtml(file.linked_record_label || "")}" type="button">Open</button>` : ""}
          </div>
          <strong class="storage-file-size">${escapeHtml(byteText(file.size_bytes))}</strong>
        </article>
      `;
          }
          function renderMonthlyUsageSummary(rows) {
            const monthWindow = 12;
            const monthlyBytes = rows.slice(-monthWindow).map((row) => Number(row.size_bytes) || 0);
            while (monthlyBytes.length < monthWindow) monthlyBytes.unshift(0);
            const visibleRows = rows.slice(-monthWindow);
            const largestMonth = visibleRows.reduce((largest, row) => {
              const currentBytes = Number(row.size_bytes) || 0;
              const largestBytes = Number(largest?.size_bytes) || 0;
              return currentBytes > largestBytes ? row : largest;
            }, null);
            const largestMonthBytes = Number(largestMonth?.size_bytes) || 0;
            const largestMonthPhotoCount = Number(largestMonth?.photo_count) || 0;
            const largestMonthFileCount = Math.max((Number(largestMonth?.file_count) || 0) - largestMonthPhotoCount, 0);
            const median = medianBytes(monthlyBytes);
            const latestRemaining = Math.max(Number(rows[rows.length - 1]?.remaining_bytes) || 0, 0);
            const monthsToCap = largestMonthBytes > 0 ? latestRemaining / largestMonthBytes : 0;
            const capText = largestMonthBytes > 0 ? `At the largest monthly usage rate of ${byteText(largestMonthBytes)} per month, the storage cap is estimated in ${durationTextFromMonths(monthsToCap)}.` : "At the current usage rate, there is not enough usage history to estimate the storage cap.";
            return `
        <div class="storage-month-summary" aria-label="Last 12 months storage trend">
          <article>
            <span>Largest Month</span>
            <strong>${escapeHtml(byteText(largestMonthBytes))}/mo</strong>
            <small>${largestMonthPhotoCount} photos, ${largestMonthFileCount} files</small>
          </article>
          <article>
            <span>12 Month Median</span>
            <strong>${escapeHtml(byteText(median))}/mo</strong>
          </article>
          <article class="storage-month-projection">
            <span>Cap Estimate</span>
            <strong>${escapeHtml(durationTextFromMonths(monthsToCap))}</strong>
            <small>${escapeHtml(capText)}</small>
          </article>
        </div>
      `;
          }
          function renderMonthlyUsageGraph(monthlyUsage) {
            const rows = Array.isArray(monthlyUsage) ? monthlyUsage : [];
            const maxMonthBytes = rows.reduce((max, row) => Math.max(max, Number(row.size_bytes) || 0), 0);
            const maxCumulativeBytes = rows.reduce((max, row) => Math.max(max, Number(row.cumulative_bytes) || 0), 0);
            return `
        <section class="storage-monthly-usage">
          <div class="settings-section-heading">
            <div>
              <strong>Month Over Month Usage</strong>
              <span>Last ${rows.length || 12} months</span>
            </div>
          </div>
          ${renderMonthlyUsageSummary(rows)}
          <div class="storage-month-chart" role="img" aria-label="Month over month storage usage">
            ${rows.map((row) => {
              const monthBytes = Number(row.size_bytes) || 0;
              const cumulativeBytes = Number(row.cumulative_bytes) || 0;
              const remainingBytes = Number(row.remaining_bytes) || 0;
              const barHeight = maxMonthBytes ? Math.max(monthBytes / maxMonthBytes * 100, monthBytes ? 6 : 0) : 0;
              const cumulativeHeight = maxCumulativeBytes ? Math.max(cumulativeBytes / maxCumulativeBytes * 100, cumulativeBytes ? 6 : 0) : 0;
              return `
                <article class="storage-month-column" title="${escapeHtml(row.month_label || row.month || "")}: ${escapeHtml(byteText(monthBytes))} added, ${escapeHtml(byteText(cumulativeBytes))} total, ${escapeHtml(byteText(remainingBytes))} remaining">
                  <div class="storage-month-bars">
                    <span class="storage-month-cumulative" style="height: ${cumulativeHeight.toFixed(2)}%"></span>
                    <span class="storage-month-added" style="height: ${barHeight.toFixed(2)}%"></span>
                  </div>
                  <strong>${escapeHtml(byteText(monthBytes))}</strong>
                  <small>${escapeHtml(byteText(remainingBytes))} left</small>
                  <span>${escapeHtml(String(row.month_label || row.month || "").replace(" ", "\n"))}</span>
                </article>
              `;
            }).join("") || `<p class="muted">No monthly storage history available yet.</p>`}
          </div>
          <div class="storage-month-legend">
            <span><i class="storage-legend-added"></i>Added that month</span>
            <span><i class="storage-legend-cumulative"></i>Cumulative total</span>
            <span><i class="storage-legend-remaining"></i>Remaining storage</span>
          </div>
        </section>
      `;
          }
          function renderStorageDashboardPanel({
            canView,
            dashboard,
            ready,
            error
          }) {
            if (!canView) return "";
            const data = dashboard || {};
            const totalBytes = Number(data.total_bytes) || 0;
            const allowanceBytes = Number(data.allowance_bytes) || 107374182400;
            const remainingBytes = Math.max(Number(data.remaining_bytes) || allowanceBytes - totalBytes, 0);
            const photoCount = Number(data.photo_count) || 0;
            const totalFileCount = Number(data.file_count) || 0;
            const nonPhotoFileCount = Math.max(totalFileCount - photoCount, 0);
            const bucketTotals = Array.isArray(data.bucket_totals) ? data.bucket_totals : [];
            const monthlyUsage = Array.isArray(data.monthly_usage) ? data.monthly_usage : [];
            const topFiles = Array.isArray(data.top_files) ? data.top_files : [];
            return `
        <section class="storage-dashboard relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Storage Usage</h3>
              <span>${ready ? `${totalFileCount} linked files tracked` : "loading storage usage"}</span>
            </div>
            <button class="secondary-button small" data-refresh-storage-dashboard type="button">Refresh</button>
          </div>
          ${error ? `<p class="warning-text">${escapeHtml(error)}</p>` : ""}
          <div class="storage-metric-grid">
            ${renderStorageMetric("Used", byteText(totalBytes), `${percentText(data.usage_percent)} of plan storage`)}
            ${renderStorageMetric("Remaining", byteText(remainingBytes), `${percentText(remainingBytes / allowanceBytes * 100)} open`)}
            ${renderStorageMetric("Photos", `${photoCount}`, "Image records linked to work, requests, equipment, and parts")}
            ${renderStorageMetric("Files", `${nonPhotoFileCount}`, "Non-photo files only")}
            ${renderStorageMetric("Available", byteText(allowanceBytes), "Supabase Pro file storage")}
            ${renderStorageMetric("Largest Files", `${topFiles.length}/10`, "Top linked storage objects")}
          </div>
          ${renderStorageRules()}
          ${renderMonthlyUsageGraph(monthlyUsage)}
          <div class="storage-dashboard-grid">
            <section class="storage-breakdown">
              <div class="settings-section-heading">
                <div>
                  <strong>What Is Taking Space</strong>
                  <span>${bucketTotals.length} buckets</span>
                </div>
              </div>
              <div class="storage-bucket-list">
                ${bucketTotals.map((bucket) => renderBucketRow(bucket, totalBytes)).join("") || `<p class="muted">No linked files found for this company yet.</p>`}
              </div>
            </section>
            <section class="storage-largest-files">
              <div class="settings-section-heading">
                <div>
                  <strong>Top 10 Largest Files</strong>
                  <span>${topFiles.length} shown</span>
                </div>
              </div>
              <div class="storage-file-list">
                ${topFiles.map(renderTopFileRow).join("") || `<p class="muted">No files to list yet.</p>`}
              </div>
            </section>
          </div>
        </section>
      `;
          }
          return {
            renderStorageDashboardPanel
          };
        }
        window.MaintainOpsStorageDashboardDisplay = {
          createStorageDashboardDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createStorageDashboardDisplayHelpers };
        }
      })();
    }
  });

  // src/render/financialDisplay.js
  var require_financialDisplay = __commonJS({
    "src/render/financialDisplay.js"(exports, module) {
      (function() {
        function createFinancialDisplayHelpers({
          escapeHtml,
          assetTypeLabel,
          parentAssetFor,
          getAssets,
          getAssetDocumentsByAssetId,
          getAssetFinancialsByAssetId,
          getAssetFinancials,
          getAssetFinancialsReady,
          getProfilesByUserId,
          getLocations,
          matchesActiveLocation,
          getFinancialPage,
          getFinancialMissingFilter,
          getFinancialLocationFilter,
          getFinancialTypeFilter,
          getFinancialAreaFilter,
          canEditFinancialRecords,
          ASSETS_PER_PAGE
        }) {
          const pageSize = ASSETS_PER_PAGE || 12;
          const currentPage = getFinancialPage || (() => 1);
          const canEditFinancial = canEditFinancialRecords || (() => true);
          const moneyFields = ["acquisition_cost", "current_book_value"];
          const requiredFinancialFields = ["asset_tag", "acquisition_date", "acquisition_cost", "depreciation_method", "useful_life_years", "current_book_value", "tax_jurisdiction", "ownership_status", "in_service_date", "gl_account_code", "cost_center"];
          const assetTypeOrder = {
            machine: 10,
            forklift: 20,
            secondary_machine: 30,
            tooling: 40,
            component: 50,
            shop_item: 60
          };
          function assetPictureDocuments(assetId) {
            return (getAssetDocumentsByAssetId()[assetId] || []).filter((document2) => String(document2.content_type || "").startsWith("image/") || document2.document_type === "machine_photo" || document2.document_type === "nameplate");
          }
          function financeFor(assetId) {
            return getAssetFinancialsByAssetId?.()[assetId] || {};
          }
          function financeForAsset(asset) {
            return asset?.financialRecord || financeFor(asset?.id);
          }
          function isArchivedFinancialAsset(asset) {
            return Boolean(asset?.financialRecord && !asset.financialRecord.asset_id);
          }
          function isMissingFinancialInfo(asset) {
            const finance = financeForAsset(asset);
            return requiredFinancialFields.some((field) => finance[field] == null || String(finance[field]).trim() === "");
          }
          function locationName(locationId) {
            return getLocations?.().find((location) => location.id === locationId)?.name || "";
          }
          function reviewedByName(finance) {
            if (!finance.reviewed_by) return "";
            return getProfilesByUserId?.()[finance.reviewed_by]?.full_name || `User ${String(finance.reviewed_by).slice(0, 8)}`;
          }
          function deletedByName(finance) {
            if (!finance.operational_deleted_by) return "";
            return getProfilesByUserId?.()[finance.operational_deleted_by]?.full_name || `User ${String(finance.operational_deleted_by).slice(0, 8)}`;
          }
          function archivedFinancialAsset(finance) {
            return {
              id: `financial:${finance.id}`,
              financialRecord: finance,
              name: finance.archived_asset_name || "Deleted equipment",
              asset_type: finance.archived_asset_type || "machine",
              asset_code: finance.archived_asset_code || "",
              manufacturer: finance.archived_manufacturer || "",
              model: finance.archived_model || "",
              location_id: finance.archived_location_id || "",
              location: finance.archived_location || "",
              status: "offline"
            };
          }
          function financialAssetRows() {
            const liveAssets = getAssets();
            const archivedRows = (getAssetFinancials?.() || []).filter((finance) => !finance.asset_id).map(archivedFinancialAsset);
            return [...liveAssets, ...archivedRows];
          }
          function financialAssets() {
            const missingFilter = getFinancialMissingFilter?.() || "all";
            const locationFilter = getFinancialLocationFilter?.() || "all";
            const typeFilter = getFinancialTypeFilter?.() || "all";
            const areaFilter = getFinancialAreaFilter?.() || "all";
            return financialAssetRows().filter((asset) => locationFilter === "all" || asset.location_id === locationFilter).filter((asset) => typeFilter === "all" || (asset.asset_type || "machine") === typeFilter).filter((asset) => areaFilter === "all" || String(asset.location || "").trim() === areaFilter).filter((asset) => {
              if (missingFilter === "missing") return isMissingFinancialInfo(asset);
              if (missingFilter === "review") return financeForAsset(asset).needs_review === true;
              return true;
            }).sort((a, b) => {
              const typeDelta = (assetTypeOrder[a.asset_type || "machine"] || 999) - (assetTypeOrder[b.asset_type || "machine"] || 999);
              if (typeDelta) return typeDelta;
              const parentDelta = String(parentAssetFor(a)?.name || "").localeCompare(String(parentAssetFor(b)?.name || ""));
              return parentDelta || String(locationName(a.location_id) || a.location || "").localeCompare(String(locationName(b.location_id) || b.location || "")) || String(a.location || "").localeCompare(String(b.location || "")) || String(a.name || "").localeCompare(String(b.name || ""));
            });
          }
          function dateValue(value) {
            return value ? String(value).slice(0, 10) : "";
          }
          function moneyValue(value) {
            return value == null || value === "" ? "" : String(value);
          }
          function fieldValue(finance, field) {
            return moneyFields.includes(field) ? moneyValue(finance[field]) : finance[field] || "";
          }
          function renderFinancialForm(asset) {
            const finance = financeForAsset(asset);
            const archived = isArchivedFinancialAsset(asset);
            return `
        <form class="form-grid financial-asset-form" data-financial-asset="${escapeHtml(asset.id)}"${archived ? ` data-financial-record="${escapeHtml(finance.id)}" data-financial-archived="true"` : ""}>
          ${archived ? "" : `<input name="asset_id" type="hidden" value="${escapeHtml(asset.id)}">`}
          <label>Asset tag / fixed asset number<input name="asset_tag" value="${escapeHtml(fieldValue(finance, "asset_tag"))}"></label>
          <label>Acquisition date<input name="acquisition_date" type="date" value="${escapeHtml(dateValue(finance.acquisition_date))}"></label>
          <label>Acquisition cost<input name="acquisition_cost" type="number" min="0" step="0.01" value="${escapeHtml(fieldValue(finance, "acquisition_cost"))}"></label>
          <label>Depreciation method<input name="depreciation_method" value="${escapeHtml(fieldValue(finance, "depreciation_method"))}" placeholder="Straight-line"></label>
          <label>Useful life years<input name="useful_life_years" type="number" min="0" step="0.1" value="${escapeHtml(fieldValue(finance, "useful_life_years"))}"></label>
          <label>Current book value<input name="current_book_value" type="number" min="0" step="0.01" value="${escapeHtml(fieldValue(finance, "current_book_value"))}"></label>
          <label>Tax jurisdiction / property tax location<input name="tax_jurisdiction" value="${escapeHtml(fieldValue(finance, "tax_jurisdiction"))}"></label>
          <label>Ownership status
            <select name="ownership_status">
              ${["", "owned", "leased", "rented", "disposed"].map((value) => `<option value="${value}" ${value === (finance.ownership_status || "") ? "selected" : ""}>${value ? value.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Unset"}</option>`).join("")}
            </select>
          </label>
          <label>In service date<input name="in_service_date" type="date" value="${escapeHtml(dateValue(finance.in_service_date))}"></label>
          <label>Disposal date<input name="disposal_date" type="date" value="${escapeHtml(dateValue(finance.disposal_date))}"></label>
          <label>GL / account code<input name="gl_account_code" value="${escapeHtml(fieldValue(finance, "gl_account_code"))}"></label>
          <label>Cost center / department<input name="cost_center" value="${escapeHtml(fieldValue(finance, "cost_center"))}"></label>
          <label>Disposal notes<textarea name="disposal_notes" rows="2">${escapeHtml(finance.disposal_notes || "")}</textarea></label>
          <label>Finance notes<textarea name="finance_notes" rows="2">${escapeHtml(finance.finance_notes || "")}</textarea></label>
          <label class="check-row"><input name="needs_review" type="checkbox" ${finance.needs_review ? "checked" : ""}> Needs review</label>
          <p class="error-text" data-financial-error="${escapeHtml(asset.id)}"></p>
          <button class="secondary-button asset-action-button" type="submit" ${getAssetFinancialsReady?.() === false ? "disabled" : ""}>Save Financial Info</button>
        </form>
      `;
          }
          function financialDisplayValue(value) {
            return value == null || value === "" ? "Not recorded" : String(value);
          }
          function ownershipLabel(value) {
            return value ? String(value).replace(/\b\w/g, (letter) => letter.toUpperCase()) : "";
          }
          function renderFinancialReadOnly(asset) {
            const finance = financeForAsset(asset);
            const rows = [
              ["Asset tag / fixed asset number", finance.asset_tag],
              ["Acquisition date", dateValue(finance.acquisition_date)],
              ["Acquisition cost", fieldValue(finance, "acquisition_cost")],
              ["Depreciation method", finance.depreciation_method],
              ["Useful life years", finance.useful_life_years],
              ["Current book value", fieldValue(finance, "current_book_value")],
              ["Tax jurisdiction / property tax location", finance.tax_jurisdiction],
              ["Ownership status", ownershipLabel(finance.ownership_status)],
              ["In service date", dateValue(finance.in_service_date)],
              ["Disposal date", dateValue(finance.disposal_date)],
              ["GL / account code", finance.gl_account_code],
              ["Cost center / department", finance.cost_center],
              ["Disposal notes", finance.disposal_notes],
              ["Finance notes", finance.finance_notes],
              ["Needs review", finance.needs_review ? "Yes" : "No"],
              ["Last reviewed", finance.last_reviewed_at ? new Date(finance.last_reviewed_at).toLocaleString() : ""],
              ["Reviewed by", reviewedByName(finance)]
            ];
            return `
        <div class="financial-readonly-list relationship-detail asset">
          ${rows.map(([label, value]) => `
            <div class="meta-row financial-readonly-row">
              <span><strong>${escapeHtml(label)}</strong>${escapeHtml(financialDisplayValue(value))}</span>
            </div>
          `).join("")}
        </div>
      `;
          }
          function renderFinancialAssetCard(asset) {
            const parent = parentAssetFor(asset);
            const pictures = assetPictureDocuments(asset.id);
            const finance = financeForAsset(asset);
            const missing = isMissingFinancialInfo(asset);
            const archived = isArchivedFinancialAsset(asset);
            return `
        <article class="asset-card asset-state-${escapeHtml(asset.status || "running")} financial-asset-card ${archived ? "financial-asset-deleted" : ""}" data-open-financial-asset="${escapeHtml(asset.id)}" tabindex="0" role="button" aria-label="Open financial details for ${escapeHtml(asset.name || "equipment")}">
          <div class="part-card-main">
            ${archived ? `<div class="financial-deleted-banner">Operational equipment deleted${finance.operational_deleted_at ? ` ${escapeHtml(new Date(finance.operational_deleted_at).toLocaleDateString())}` : ""}${finance.operational_deleted_by ? ` by ${escapeHtml(deletedByName(finance))}` : ""}</div>` : ""}
            <div class="chip-row">
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              <span class="chip">${escapeHtml(locationName(asset.location_id) || "Location unset")}</span>
              <span class="chip">${escapeHtml(asset.location || "Department unset")}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${pictures.length ? `<span class="chip">${pictures.length} photo${pictures.length === 1 ? "" : "s"}</span>` : `<span class="chip">photo missing</span>`}
              ${missing ? `<span class="chip status-open">missing finance info</span>` : `<span class="chip status-completed">finance complete</span>`}
              ${finance.needs_review ? `<span class="chip status-blocked">needs review</span>` : ""}
            </div>
            <h3>${escapeHtml(asset.name || "Equipment")}</h3>
            <p>${escapeHtml(parent ? `Part of ${parent.name}` : "Top level equipment")}</p>
            <p>${escapeHtml(asset.manufacturer || "Manufacturer blank")} ${asset.model ? `- ${escapeHtml(asset.model)}` : ""}</p>
            <p>${escapeHtml(finance.asset_tag || "Asset tag blank")} ${finance.cost_center ? `- ${escapeHtml(finance.cost_center)}` : ""}</p>
            <p class="muted">Last reviewed ${finance.last_reviewed_at ? new Date(finance.last_reviewed_at).toLocaleDateString() : "not recorded"}${finance.reviewed_by ? ` by ${escapeHtml(reviewedByName(finance))}` : ""}</p>
          </div>
        </article>
      `;
          }
          function renderFinancialFilters(rows) {
            const activeMissing = getFinancialMissingFilter?.() || "all";
            const activeLocation = getFinancialLocationFilter?.() || "all";
            const activeType = getFinancialTypeFilter?.() || "all";
            const activeArea = getFinancialAreaFilter?.() || "all";
            const locations = getLocations?.() || [];
            const allFinancialAssets = financialAssetRows();
            const areaOptions = [...new Set(allFinancialAssets.map((asset) => String(asset.location || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
            const typeOptions = [...new Set(allFinancialAssets.map((asset) => asset.asset_type || "machine"))].sort((a, b) => (assetTypeOrder[a] || 999) - (assetTypeOrder[b] || 999));
            return `
        <div class="asset-area-filter relationship-detail asset" aria-label="Financial asset filters">
          <label>Status
            <select data-financial-filter="missing">
              <option value="all" ${activeMissing === "all" ? "selected" : ""}>All financial records</option>
              <option value="missing" ${activeMissing === "missing" ? "selected" : ""}>Missing financial info</option>
              <option value="review" ${activeMissing === "review" ? "selected" : ""}>Needs review</option>
            </select>
          </label>
          <label>Facility
            <select data-financial-filter="location">
              <option value="all" ${activeLocation === "all" ? "selected" : ""}>All facilities</option>
              ${locations.map((location) => `<option value="${escapeHtml(location.id)}" ${activeLocation === location.id ? "selected" : ""}>${escapeHtml(location.name || "Location")}</option>`).join("")}
            </select>
          </label>
          <label>Equipment type
            <select data-financial-filter="type">
              <option value="all" ${activeType === "all" ? "selected" : ""}>All types</option>
              ${typeOptions.map((type) => `<option value="${escapeHtml(type)}" ${activeType === type ? "selected" : ""}>${escapeHtml(assetTypeLabel(type))}</option>`).join("")}
            </select>
          </label>
          <label>Area / spot
            <select data-financial-filter="area">
              <option value="all" ${activeArea === "all" ? "selected" : ""}>All areas</option>
              ${areaOptions.map((area) => `<option value="${escapeHtml(area)}" ${activeArea === area ? "selected" : ""}>${escapeHtml(area)}</option>`).join("")}
            </select>
          </label>
          <span>${rows.length} shown</span>
        </div>
      `;
          }
          function renderFinancialDetail(assetId) {
            const asset = financialAssetRows().find((row) => row.id === assetId || row.financialRecord?.asset_id === assetId);
            if (!asset) {
              return `
          <div class="relationship-detail asset">
            <button class="secondary-button back-action-button" data-back-financial-list type="button">Back to Financial</button>
            <p class="muted">This equipment record is no longer available.</p>
          </div>
        `;
            }
            const parent = parentAssetFor(asset);
            const pictures = assetPictureDocuments(asset.id);
            const finance = financeForAsset(asset);
            const missing = isMissingFinancialInfo(asset);
            const archived = isArchivedFinancialAsset(asset);
            return `
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>${escapeHtml(asset.name || "Equipment")}</strong>
            <span>${escapeHtml(assetTypeLabel(asset.asset_type))} - ${escapeHtml(locationName(asset.location_id) || "Location unset")} - ${escapeHtml(asset.location || "Department unset")}</span>
          </div>
          <div class="team-actions">
            <button class="secondary-button back-action-button" data-back-financial-list type="button">Back to Financial</button>
            ${archived ? "" : `<button class="secondary-button asset-action-button" data-open-financial-equipment="${escapeHtml(asset.id)}" type="button">Open Equipment Page</button>`}
          </div>
        </div>
        ${archived ? `
          <section class="relationship-detail asset financial-deleted-detail">
            <div class="financial-deleted-banner">Operational equipment deleted${finance.operational_deleted_at ? ` ${escapeHtml(new Date(finance.operational_deleted_at).toLocaleDateString())}` : ""}${finance.operational_deleted_by ? ` by ${escapeHtml(deletedByName(finance))}` : ""}</div>
            <p class="muted">This financial history was retained after the shop equipment record was deleted.</p>
            ${canEditFinancial() ? `<button class="danger-action-button" data-delete-financial-record="${escapeHtml(finance.id)}" type="button">Delete From Financials</button>` : ""}
            <p class="error-text" data-financial-delete-error="${escapeHtml(finance.id || "")}"></p>
          </section>
        ` : ""}
        <section class="relationship-detail asset">
          <div class="chip-row">
            <span class="chip">${escapeHtml(parent ? `Part of ${parent.name}` : "Top level equipment")}</span>
            ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
            <span class="chip">${escapeHtml(asset.manufacturer || "Manufacturer blank")}</span>
            <span class="chip">${escapeHtml(asset.model || "Model blank")}</span>
            ${pictures.length ? `<span class="chip">${pictures.length} photo${pictures.length === 1 ? "" : "s"}</span>` : `<span class="chip">photo missing</span>`}
            ${missing ? `<span class="chip status-open">missing finance info</span>` : `<span class="chip status-completed">finance complete</span>`}
            ${finance.needs_review ? `<span class="chip status-blocked">needs review</span>` : ""}
          </div>
          <p class="muted">${archived ? "Operational equipment fields are a retained snapshot." : "Operational equipment fields mirror the equipment record. Accounting changes on this screen save only financial fields."}</p>
        </section>
        <section class="relationship-detail asset">
          <h3>Financial Details</h3>
          ${canEditFinancial() ? renderFinancialForm(asset) : renderFinancialReadOnly(asset)}
        </section>
      `;
          }
          function renderFinancialPanel() {
            const rows = financialAssets();
            const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
            const page = Math.min(Math.max(Number(currentPage()) || 1, 1), totalPages);
            const pagedRows = rows.slice((page - 1) * pageSize, page * pageSize);
            const firstShown = (page - 1) * pageSize + 1;
            const lastShown = Math.min(rows.length, page * pageSize);
            const pagination = rows.length <= pageSize ? "" : `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-financial-page="prev" type="button" ${page <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${rows.length} - Page ${page} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-financial-page="next" type="button" ${page >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
            return `
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>Equipment Financial Register</strong>
            <span>Finance fields are stored separately from maintenance equipment records.</span>
          </div>
          <small>${getAssetFinancialsReady?.() === false ? "Run supabase/step-next-asset-financials.sql" : `${rows.length} equipment record${rows.length === 1 ? "" : "s"}`}</small>
        </div>
        ${renderFinancialFilters(rows)}
        <div class="asset-list">
          ${pagedRows.map(renderFinancialAssetCard).join("") || `<p class="muted">No equipment found for these financial filters.</p>`}
        </div>
        ${pagination}
      `;
          }
          return {
            financialAssets,
            isMissingFinancialInfo,
            renderFinancialPanel,
            renderFinancialAssetCard,
            renderFinancialDetail
          };
        }
        window.MaintainOpsFinancialDisplay = {
          createFinancialDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createFinancialDisplayHelpers };
        }
      })();
    }
  });

  // src/render/appIssuePanelDisplay.js
  var require_appIssuePanelDisplay = __commonJS({
    "src/render/appIssuePanelDisplay.js"(exports, module) {
      (function() {
        function createAppIssuePanelDisplayHelpers({
          canManageTeam,
          renderAppIssueReport,
          escapeHtml,
          getActiveSection,
          getAppIssueReportsReady,
          getAppIssueReports
        }) {
          function renderAppIssueReportForm() {
            const appIssueReportsReady = getAppIssueReportsReady();
            return `
        <section class="panel full-width focus-panel app-issue-report-panel">
          <div class="panel-header">
            <h2>Report App Issue</h2>
            <button class="secondary-button back-action-button" data-cancel-app-issue-report type="button">Cancel</button>
          </div>
          <form class="form-grid app-issue-report-form" id="app-issue-report-form">
            <label>Short title<input name="title" required maxlength="140" placeholder="What broke or felt confusing?"></label>
            <label>Details<textarea name="details" rows="4" required placeholder="What were you trying to do, what happened, and what device were you on?"></textarea></label>
            <label>Severity
              <select name="severity">
                <option value="normal">Normal</option>
                <option value="blocking">Blocking</option>
                <option value="minor">Minor</option>
              </select>
            </label>
            <input name="screen" type="hidden" value="${escapeHtml(getActiveSection())}">
            <p class="muted">This sends the current company, location, screen, and signed-in user with the report.</p>
            <p class="error-text" id="app-issue-report-error">${appIssueReportsReady ? "" : "Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${appIssueReportsReady ? "" : "disabled"}>Send Report</button>
          </form>
        </section>
      `;
          }
          function sortedAppIssueReports(reports) {
            const statusRank = { open: 0, reviewing: 1, resolved: 2 };
            return [...reports].sort((a, b) => {
              const statusDelta = (statusRank[a.status || "open"] ?? 1) - (statusRank[b.status || "open"] ?? 1);
              if (statusDelta) return statusDelta;
              return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });
          }
          function renderAppIssueReportsPanel() {
            if (!canManageTeam()) return "";
            const appIssueReportsReady = getAppIssueReportsReady();
            const appIssueReports = getAppIssueReports();
            const sortedReports = sortedAppIssueReports(appIssueReports);
            return `
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${appIssueReportsReady ? `${appIssueReports.length} captured` : "setup needed"}</span>
            </div>
          </div>
          ${appIssueReportsReady ? `
            <div class="issue-report-list">
              ${sortedReports.map(renderAppIssueReport).join("") || `<p class="muted">No app issues reported yet.</p>`}
            </div>
          ` : `<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>`}
        </section>
      `;
          }
          return {
            renderAppIssueReportForm,
            renderAppIssueReportsPanel,
            sortedAppIssueReports
          };
        }
        window.MaintainOpsAppIssuePanelDisplay = {
          createAppIssuePanelDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createAppIssuePanelDisplayHelpers };
        }
      })();
    }
  });

  // src/render/teamMemberDisplay.js
  var require_teamMemberDisplay = __commonJS({
    "src/render/teamMemberDisplay.js"(exports, module) {
      (function() {
        function createTeamMemberDisplayHelpers({
          getProfilesByUserId,
          getCurrentUser,
          getCompanyMembers,
          getTeamInvites,
          getTeamInvitesReady,
          getTeamInviteCancelError,
          getPendingCancelInviteId,
          getTeamInviteLinks,
          getTeamInviteLinksReady,
          getTeamInviteLinkError,
          getPendingRevokeInviteLinkId,
          getRequestNotificationRecipients,
          getRequestNotificationRecipientsReady,
          getRequestNotificationRecipientError,
          getSession,
          getLocations,
          getActiveCompanyMembership,
          matchesSearch,
          escapeHtml,
          roleDescription,
          roleLabel,
          normalizeRole,
          teamMemberWorkload,
          canManageTeam,
          canAdministerTeamRoles,
          teamRoleOptionsForActor,
          COMPANY_ROLES,
          renderLocationOptions,
          inviteDefaultLocationLabel,
          teamInviteSignupUrl,
          teamJoinUrl
        }) {
          const canGrantRoles = canAdministerTeamRoles || (() => false);
          const roleOptionsForActor = teamRoleOptionsForActor || (() => COMPANY_ROLES);
          const canAdministerRequestNotificationRecipients = canAdministerTeamRoles || (() => false);
          function locationName(locationId) {
            return getLocations().find((location) => location.id === locationId)?.name || "Default location";
          }
          function managerInviteLocationId(activeLocationId) {
            return getActiveCompanyMembership?.()?.default_location_id || activeLocationId || getLocations()[0]?.id || "";
          }
          function teamMemberName(userId) {
            const profile = getProfilesByUserId()[userId];
            const currentUser = getCurrentUser();
            if (userId === currentUser?.id) return profile?.full_name || currentUser?.email || "Me";
            return profile?.full_name || userId;
          }
          function filteredMembers() {
            return getCompanyMembers().filter((member) => matchesSearch([
              member.user_id,
              member.role,
              getProfilesByUserId()[member.user_id]?.full_name
            ]));
          }
          function renderMember(member) {
            const profile = getProfilesByUserId()[member.user_id];
            const currentUser = getSession().user;
            const isCurrentUser = member.user_id === currentUser.id;
            const editableRoleOptions = roleOptionsForActor(member.role);
            const canEditRole = canGrantRoles() && !isCurrentUser && editableRoleOptions.length > 1;
            const workload = teamMemberWorkload(member.user_id);
            return `
        <article class="member-card">
          <div>
            <strong>${escapeHtml(profile?.full_name || (isCurrentUser ? currentUser.email : member.user_id))}</strong>
            <p>${escapeHtml(roleDescription(member.role))}</p>
            <p>${isCurrentUser ? escapeHtml(currentUser.email || member.user_id) : escapeHtml(member.user_id)}</p>
            <div class="member-workload">
              <span class="chip open">${workload.newWork} New</span>
              <span class="chip in_progress">${workload.inProgress} In Progress</span>
              <span class="chip blocked">${workload.blocked} Blocked</span>
              ${workload.overdue ? `<span class="chip overdue">${workload.overdue} Overdue</span>` : ""}
            </div>
          </div>
          <div class="member-card-actions">
            <button class="secondary-button view-member-work-button" data-view-member-work="${member.user_id}" type="button">View Work</button>
            ${canEditRole ? `
              <form class="member-role-form" data-member-role="${member.user_id}">
                <select name="role" aria-label="Role for ${escapeHtml(profile?.full_name || member.user_id)}">
                  ${editableRoleOptions.map((role) => `<option value="${role}" ${role === normalizeRole(member.role) ? "selected" : ""}>${roleLabel(role)}</option>`).join("")}
                </select>
                <button class="secondary-button" type="submit">Save Role</button>
              </form>
            ` : `<span class="chip">${escapeHtml(roleLabel(member.role))}</span>`}
          </div>
        </article>
      `;
          }
          function renderMyProfileForm() {
            const currentUser = getSession().user;
            const profile = getProfilesByUserId()[currentUser.id] || {};
            return `
        <form class="team-profile-form relationship-detail comment" id="profile-form">
          <div>
            <h3>My Profile</h3>
            <p class="muted">${escapeHtml(currentUser.email || "Signed in user")}</p>
          </div>
          <label>Display name<input name="full_name" value="${escapeHtml(profile.full_name || "")}" placeholder="Name shown on work orders"></label>
          <label class="check-row mobile-tech-setting"><input name="mobile_tech" type="checkbox" ${profile.mobile_tech ? "checked" : ""}> Mobile tech - I intentionally work across locations</label>
          <p class="muted">When Mobile tech is off, your location is locked so work does not accidentally land in the wrong branch.</p>
          <p class="error-text" id="profile-error"></p>
          <button class="secondary-button" type="submit">Save My Settings</button>
        </form>
      `;
          }
          function renderPasswordChangeForm() {
            return `
        <form class="team-profile-form relationship-detail comment" id="password-change-form">
          <div>
            <h3>Account Security</h3>
            <p class="muted">Change the password used to sign in to MaintainOps.</p>
          </div>
          <label>New password<input name="password" type="password" minlength="8" required autocomplete="new-password"></label>
          <label>Confirm password<input name="confirmPassword" type="password" minlength="8" required autocomplete="new-password"></label>
          <p class="error-text" id="password-change-error"></p>
          <button class="secondary-button" type="submit">Update Password</button>
        </form>
      `;
          }
          function requestNotificationLocationLabel(recipient) {
            if (!recipient.location_id) return "All locations";
            const location = getLocations().find((item) => item.id === recipient.location_id);
            return location?.name || "Unknown location";
          }
          function renderRequestNotificationRecipients(activeLocationId) {
            const ready = getRequestNotificationRecipientsReady();
            const recipients = getRequestNotificationRecipients();
            const locations = getLocations();
            const canEditRecipients = canAdministerRequestNotificationRecipients();
            return `
        <section class="team-notification-panel relationship-detail comment">
          <div>
            <h3>Request Email Recipients</h3>
            <p class="muted">${canEditRecipients ? "Choose who should receive new request emails when the backend email sender is enabled. Shared inboxes are allowed." : "Only admins can change request email routing."}</p>
          </div>
          ${canEditRecipients ? `
            <form class="inline-form team-form" id="request-notification-recipient-form">
              <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="maintenance@company.com" ${ready ? "" : "disabled"}></label>
              <label>Label<input name="label" maxlength="120" placeholder="Maintenance desk" ${ready ? "" : "disabled"}></label>
              <label>Applies to
                <select name="location_id" ${ready ? "" : "disabled"}>
                  <option value="">All locations</option>
                  ${locations.map((location) => `<option value="${escapeHtml(location.id)}" ${location.id === activeLocationId ? "selected" : ""}>${escapeHtml(location.name || "Location")}</option>`).join("")}
                </select>
              </label>
              <button class="secondary-button" type="submit" ${ready ? "" : "disabled"}>Add Recipient</button>
            </form>
          ` : ""}
          <p class="error-text" id="request-notification-recipient-error">${escapeHtml(getRequestNotificationRecipientError() || (ready ? "" : "Run supabase/step-next-request-notification-recipients.sql before routing request emails."))}</p>
          <div class="member-list compact-list">
            ${recipients.map((recipient) => `
              <article class="member-card invite-card">
                <div>
                  <strong>${escapeHtml(recipient.label || recipient.email)}</strong>
                  <p>${escapeHtml(recipient.email)}</p>
                  <p>${escapeHtml(requestNotificationLocationLabel(recipient))}</p>
                </div>
                <div class="button-row">
                  <span class="chip">${recipient.is_active === false ? "Paused" : "Active"}</span>
                  ${canEditRecipients ? `<button class="danger-action-button" data-delete-request-notification-recipient="${escapeHtml(recipient.id)}" type="button">Remove</button>` : ""}
                </div>
              </article>
            `).join("") || `<p class="muted">No request email recipients yet.</p>`}
          </div>
        </section>
      `;
          }
          function renderTeamInviteForm(activeLocationId) {
            const teamInvitesReady = getTeamInvitesReady();
            const locations = getLocations();
            const inviteRoleOptions = roleOptionsForActor();
            const canChooseInviteLocation = canGrantRoles();
            const fixedLocationId = managerInviteLocationId(activeLocationId);
            return `
        <form class="team-invite-form relationship-detail comment" id="team-invite-form">
          <div>
            <h3>Invite Teammate</h3>
            <p class="muted">Invites are saved here. Copy the invite message and send it to them; when they sign up with the same email, the app adds them to this company automatically.</p>
          </div>
          <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="tech@company.com" ${teamInvitesReady ? "" : "disabled"}></label>
          <label>Role
            <select name="role" ${teamInvitesReady ? "" : "disabled"}>
              ${inviteRoleOptions.map((role) => `<option value="${role}">${roleLabel(role)}</option>`).join("")}
            </select>
          </label>
          ${canChooseInviteLocation ? `
            <label>Default location
              <select name="default_location_id" ${teamInvitesReady && locations.length ? "" : "disabled"}>
                ${locations.length ? "" : `<option value="">Run location setup first</option>`}
                ${renderLocationOptions(activeLocationId)}
              </select>
            </label>
          ` : `
            <label>Default location
              <input value="${escapeHtml(locationName(fixedLocationId))}" disabled>
              <input name="default_location_id" type="hidden" value="${escapeHtml(fixedLocationId)}">
            </label>
            <p class="muted">Manager invites add technicians to your default location.</p>
          `}
          <p class="error-text" id="team-invite-error">${teamInvitesReady ? "" : "Run supabase/step-next-invite-default-location.sql before inviting by email."}</p>
          <button class="secondary-button" type="submit" ${teamInvitesReady ? "" : "disabled"}>Create Invite</button>
        </form>
      `;
          }
          function renderTeamInvites() {
            const pending = getTeamInvites().filter((invite) => !invite.accepted_at);
            const signupUrl = teamInviteSignupUrl();
            return `
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Pending Invites</h3>
            <span>${pending.length}</span>
          </div>
          <p class="error-text" id="team-invite-cancel-error">${escapeHtml(getTeamInviteCancelError())}</p>
          <div class="member-list">
            ${pending.map((invite) => `
              ${(() => {
              const inviteMessage = `You have a MaintainOps invite for this company. Sign up or sign in with ${invite.email} here: ${signupUrl}`;
              return `
              <article class="member-card invite-card">
                <div>
                  <strong>${escapeHtml(invite.email)}</strong>
                  <p>Sent ${new Date(invite.created_at).toLocaleString()}</p>
                  <p>${escapeHtml(inviteDefaultLocationLabel(invite))}</p>
                  <p class="muted">Email is not sent automatically. Send this person the signup link.</p>
                </div>
                <div class="button-row">
                  <span class="chip">${escapeHtml(invite.role)}</span>
                  <button class="secondary-button" data-copy-team-invite="${escapeHtml(inviteMessage)}" type="button">Copy Invite</button>
                  ${getPendingCancelInviteId() === invite.id ? `
                    <button class="secondary-button" data-cancel-invite-cancel type="button">Keep</button>
                    <button class="danger-action-button confirm-delete-button" data-confirm-cancel-invite="${escapeHtml(invite.id)}" type="button">Cancel Invite</button>
                  ` : `
                    <button class="danger-action-button" data-cancel-invite="${escapeHtml(invite.id)}" type="button">Cancel Invite</button>
                  `}
                </div>
              </article>
                `;
            })()}
            `).join("") || `<p class="muted">No pending invites.</p>`}
          </div>
        </section>
      `;
          }
          function renderTeamInviteLinks(activeLocationId) {
            const ready = getTeamInviteLinksReady();
            const links = getTeamInviteLinks();
            const locations = getLocations();
            const canChooseInviteLocation = canGrantRoles();
            const fixedLocationId = managerInviteLocationId(activeLocationId);
            const linkRoleOptions = canChooseInviteLocation ? ["technician", "manager"] : ["technician"];
            const now = Date.now();
            return `
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Join Links</h3>
            <span>${links.filter((link) => !link.used_at && !link.revoked_at && new Date(link.expires_at).getTime() > now).length} active</span>
          </div>
          <p class="muted">${canChooseInviteLocation ? "Create single-use links for technicians or managers. Admin links are never created by link." : "Create one technician join link for your default location."}</p>
          <form class="inline-form team-form" id="team-invite-link-form">
            <label>Role
              <select name="role" ${ready ? "" : "disabled"}>
                ${linkRoleOptions.map((role) => `<option value="${role}">${roleLabel(role)}</option>`).join("")}
              </select>
            </label>
            ${canChooseInviteLocation ? `
              <label>Default location
                <select name="default_location_id" ${ready && locations.length ? "" : "disabled"}>
                  ${locations.length ? "" : `<option value="">Run location setup first</option>`}
                  ${renderLocationOptions(activeLocationId)}
                </select>
              </label>
            ` : `
              <label>Default location
                <input value="${escapeHtml(locationName(fixedLocationId))}" disabled>
                <input name="default_location_id" type="hidden" value="${escapeHtml(fixedLocationId)}">
              </label>
            `}
            <button class="secondary-button" type="submit" ${ready ? "" : "disabled"}>Create Join Link</button>
          </form>
          <p class="error-text" id="team-invite-link-error">${escapeHtml(getTeamInviteLinkError() || (ready ? "" : "Run supabase/step-next-invite-links.sql before creating join links."))}</p>
          <div class="member-list">
            ${links.map((link) => {
              const expired = new Date(link.expires_at).getTime() <= now;
              const status = link.revoked_at ? "Revoked" : link.used_at ? "Used" : expired ? "Expired" : "Active";
              const joinUrl = teamJoinUrl(link.token);
              const copyMessage = `You have a MaintainOps join link. Sign up or sign in here: ${joinUrl}`;
              return `
                <article class="member-card invite-card">
                  <div>
                    <strong>${escapeHtml(roleLabel(link.role))} join link</strong>
                    <p>${escapeHtml(locationName(link.default_location_id))}</p>
                    <p>Expires ${new Date(link.expires_at).toLocaleString()}</p>
                    <p class="muted">Single-use link. Email is not sent automatically.</p>
                  </div>
                  <div class="button-row">
                    <span class="chip">${escapeHtml(status)}</span>
                    ${status === "Active" ? `<button class="secondary-button" data-copy-team-invite="${escapeHtml(copyMessage)}" type="button">Copy Link</button>` : ""}
                    ${status === "Active" ? getPendingRevokeInviteLinkId() === link.id ? `
                      <button class="secondary-button" data-revoke-invite-link-cancel type="button">Keep</button>
                      <button class="danger-action-button confirm-delete-button" data-confirm-revoke-invite-link="${escapeHtml(link.id)}" type="button">Revoke Link</button>
                    ` : `
                      <button class="danger-action-button" data-revoke-invite-link="${escapeHtml(link.id)}" type="button">Revoke Link</button>
                    ` : ""}
                  </div>
                </article>
              `;
            }).join("") || `<p class="muted">No join links yet.</p>`}
          </div>
        </section>
      `;
          }
          return {
            teamMemberName,
            filteredMembers,
            renderMember,
            renderMyProfileForm,
            renderPasswordChangeForm,
            renderRequestNotificationRecipients,
            renderTeamInviteForm,
            renderTeamInvites,
            renderTeamInviteLinks
          };
        }
        window.MaintainOpsTeamMemberDisplay = {
          createTeamMemberDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createTeamMemberDisplayHelpers };
        }
      })();
    }
  });

  // src/render/maintenanceListDisplay.js
  var require_maintenanceListDisplay = __commonJS({
    "src/render/maintenanceListDisplay.js"(exports, module) {
      (function() {
        function createMaintenanceListDisplayHelpers(deps) {
          const escapeHtml = deps.escapeHtml;
          const getDueState = deps.getDueState;
          const procedureDeleteBlockerMessage = deps.procedureDeleteBlockerMessage;
          const canDeleteOperationalRecords = deps.canDeleteOperationalRecords;
          const canEditOperationalRecords = deps.canEditOperationalRecords || (() => true);
          function filteredPreventiveSchedules() {
            return deps.getPreventiveSchedules().filter((schedule) => deps.matchesActiveLocation(schedule) && deps.matchesSearch([
              schedule.title,
              schedule.frequency,
              schedule.next_due_at,
              schedule.assets?.name
            ]));
          }
          function filteredProcedureTemplates() {
            return deps.getProcedureTemplates().filter((template) => deps.matchesSearch([
              template.name,
              template.description,
              ...(template.procedure_steps || []).map((step) => step.prompt)
            ]));
          }
          function renderPreventiveSchedule(schedule) {
            const dueState = getDueState({ due_at: schedule.next_due_at, status: "open" });
            const confirming = deps.getPendingDeleteScheduleId() === schedule.id;
            const canEditOperational = canEditOperationalRecords();
            return `
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${escapeHtml(schedule.frequency)}</span>
              ${dueState ? `<span class="chip ${dueState.className}">${dueState.label}</span>` : ""}
            </div>
            <h3>${escapeHtml(schedule.title)}</h3>
            <p>${escapeHtml(schedule.assets?.name || "No equipment")} - Next due ${schedule.next_due_at}</p>
          </div>
          ${canEditOperational ? `<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${schedule.id}" type="button">Generate Work</button>
            ${canDeleteOperationalRecords() ? confirming ? `
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${escapeHtml(schedule.id)}" type="button">Permanently Delete</button>
            ` : `
              <button class="danger-action-button" data-delete-schedule="${escapeHtml(schedule.id)}" type="button">Delete</button>
            ` : ""}
          </div>` : ""}
        </article>
      `;
          }
          function renderProcedureTemplate(template) {
            const linkedWorkCount = deps.getWorkOrders().filter((workOrder) => workOrder.procedure_template_id === template.id).length;
            const linkedScheduleCount = deps.getPreventiveSchedules().filter((schedule) => schedule.procedure_template_id === template.id).length;
            const blockerMessage = procedureDeleteBlockerMessage({
              workOrders: linkedWorkCount,
              schedules: linkedScheduleCount
            });
            const confirming = deps.getPendingDeleteProcedureId() === template.id;
            const canEditOperational = canEditOperationalRecords();
            return `
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${template.procedure_steps?.length || 0} steps</span>
              <span class="chip">${linkedWorkCount} linked work orders</span>
              ${linkedScheduleCount ? `<span class="chip">${linkedScheduleCount} PM schedules</span>` : ""}
            </div>
            <h3>${escapeHtml(template.name)}</h3>
            <p>${escapeHtml(template.description || "No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(template.procedure_steps || []).map((step) => `
              <div class="checklist-step">
                <span>${step.position}. ${escapeHtml(step.prompt)}</span>
                <small>${escapeHtml(step.response_type)} ${step.required ? "- required" : "- optional"}</small>
              </div>
            `).join("") || `<p class="muted">No steps yet.</p>`}
          </div>
          ${canEditOperational ? `<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${template.id}">
            <input name="prompt" required placeholder="Step prompt">
            <select name="response_type">
              <option value="checkbox">Checkbox</option>
              <option value="pass_fail">Pass / Fail</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
            </select>
            <select name="required">
              <option value="true">Required</option>
              <option value="false">Optional</option>
            </select>
            <p class="error-text" data-step-error="${template.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
          </form>` : ""}
          ${canEditOperational && canDeleteOperationalRecords() ? `
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${blockerMessage || "This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${escapeHtml(template.id)}"></p>
              ${blockerMessage ? `
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              ` : confirming ? `
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${escapeHtml(template.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${escapeHtml(template.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              ` : `
                <button class="danger-action-button" data-delete-procedure="${escapeHtml(template.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          ` : ""}
        </article>
      `;
          }
          return {
            filteredPreventiveSchedules,
            filteredProcedureTemplates,
            renderPreventiveSchedule,
            renderProcedureTemplate
          };
        }
        window.MaintainOpsMaintenanceListDisplay = {
          createMaintenanceListDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createMaintenanceListDisplayHelpers };
        }
      })();
    }
  });

  // src/render/workOrderDetailDisplay.js
  var require_workOrderDetailDisplay = __commonJS({
    "src/render/workOrderDetailDisplay.js"(exports, module) {
      (function() {
        function createWorkOrderDetailDisplayHelpers(deps = {}) {
          const {
            renderMissingWorkOrderDetail,
            partUsageUnitCost,
            buildActivityFeed,
            checklistProgress,
            requiredChecklistProgress,
            escapeHtml,
            cleanWorkOrderDescription,
            renderRelationshipChips,
            renderWorkOrderCommandSummary,
            renderWorkOrderRecommendation,
            statusLabel,
            hasCompletedSafetyDeviceCheck,
            canAssignWorkOrderToMe,
            renderAssetOptions,
            assetLocationRoutingMessage,
            renderWorkOrderAssignmentField,
            requiresSafetyDeviceCheck,
            renderWorkOrderMessages,
            renderProcedureOptions,
            money,
            photoMetaText,
            renderActivityItem,
            canDeleteWorkOrders,
            canEditOperationalRecords = () => true
          } = deps;
          function renderChecklistStep(workOrder, step) {
            const result = deps.getStepResultsByWorkOrder()[workOrder.id]?.[step.id];
            const value = result?.value || "";
            const baseAttrs = `data-step-result="${step.id}" data-work-order-id="${workOrder.id}"`;
            let control = `<input ${baseAttrs} value="${escapeHtml(value)}" placeholder="Result">`;
            if (step.response_type === "checkbox") {
              control = `<label class="check-row"><input ${baseAttrs} type="checkbox" ${value === "checked" ? "checked" : ""}> Done</label>`;
            }
            if (step.response_type === "pass_fail") {
              control = `
          <select ${baseAttrs}>
            <option value="">Not checked</option>
            <option value="pass" ${value === "pass" ? "selected" : ""}>Pass</option>
            <option value="fail" ${value === "fail" ? "selected" : ""}>Fail</option>
          </select>
        `;
            }
            if (step.response_type === "number") {
              control = `<input ${baseAttrs} type="number" value="${escapeHtml(value)}" placeholder="Reading">`;
            }
            return `
        <div class="checklist-step relationship-detail procedure">
          <span>${step.position}. ${escapeHtml(step.prompt)} ${step.required ? `<small class="required-mark">Required</small>` : ""}</span>
          ${control}
          ${result?.completed_at ? `<small>Recorded ${new Date(result.completed_at).toLocaleString()}</small>` : ""}
        </div>
      `;
          }
          function renderWorkOrderDangerZone(workOrder) {
            const confirming = deps.getPendingDeleteWorkOrderId() === workOrder.id;
            return `
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${confirming ? `
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${escapeHtml(workOrder.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${workOrder.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          ` : `
            <button class="danger-action-button large-delete-button" data-delete-work-order="${workOrder.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `;
          }
          function renderWorkOrderDetail() {
            const activeWorkOrderId = deps.getActiveWorkOrderId();
            const workOrders = deps.getWorkOrders();
            const workOrder = workOrders.find((item) => item.id === activeWorkOrderId);
            if (!workOrder) return renderMissingWorkOrderDetail();
            const commentsByWorkOrder = deps.getCommentsByWorkOrder();
            const photosByWorkOrder = deps.getPhotosByWorkOrder();
            const eventsByWorkOrder = deps.getEventsByWorkOrder();
            const partsUsedByWorkOrder = deps.getPartsUsedByWorkOrder();
            const procedureTemplates = deps.getProcedureTemplates();
            const workOrderActionWarningId = deps.getWorkOrderActionWarningId();
            const workOrderActionWarning = deps.getWorkOrderActionWarning();
            const parts = deps.getParts();
            const profilesByUserId = deps.getProfilesByUserId();
            const commentsError = deps.getCommentsError();
            const STATUS_OPTIONS = deps.STATUS_OPTIONS || [];
            const TYPE_OPTIONS = deps.TYPE_OPTIONS || [];
            const comments = commentsByWorkOrder[workOrder.id] || [];
            const photos = photosByWorkOrder[workOrder.id] || [];
            const events = eventsByWorkOrder[workOrder.id] || [];
            const usedParts = partsUsedByWorkOrder[workOrder.id] || [];
            const partsCost = usedParts.reduce((sum, row) => sum + (Number(row.quantity_used) || 0) * partUsageUnitCost(row), 0);
            const partsQuantity = usedParts.reduce((sum, row) => sum + (Number(row.quantity_used) || 0), 0);
            const activity = buildActivityFeed(comments, photos, events, usedParts);
            const procedure = procedureTemplates.find((template) => template.id === workOrder.procedure_template_id);
            const progress = procedure ? checklistProgress(workOrder, procedure) : null;
            const requiredProgress = procedure ? requiredChecklistProgress(workOrder, procedure) : null;
            const canEditOperational = canEditOperationalRecords();
            return `
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${workOrder.priority}">${workOrder.priority}</span>
            <span class="chip">${escapeHtml(workOrder.type || "reactive")}</span>
            <span class="chip ${workOrder.status}">${statusLabel(workOrder.status)}</span>
          </div>
          <h2>${escapeHtml(workOrder.title)}</h2>
          <p>${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "No description.")}</p>
          ${renderRelationshipChips(workOrder)}
          ${workOrder.completed_at ? `<p class="completion-note">Completed ${new Date(workOrder.completed_at).toLocaleString()} \xC2\xB7 ${workOrder.actual_minutes || 0} min</p>` : ""}
          ${workOrder.asset_id && hasCompletedSafetyDeviceCheck(workOrder) ? `<p class="completion-note">Safety devices identified before completion.</p>` : ""}
          ${workOrder.completion_notes ? `<p>${escapeHtml(workOrder.completion_notes)}</p>` : ""}
        </div>

        ${renderWorkOrderCommandSummary(workOrder)}
        ${renderWorkOrderRecommendation(workOrder)}

        ${workOrder.completed_at && (workOrder.failure_cause || workOrder.resolution_summary || workOrder.follow_up_needed) ? `
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${workOrder.failure_cause ? `<article><span>Cause</span><strong>${escapeHtml(workOrder.failure_cause)}</strong></article>` : ""}
            ${workOrder.resolution_summary ? `<article><span>Resolution</span><strong>${escapeHtml(workOrder.resolution_summary)}</strong></article>` : ""}
            ${workOrder.follow_up_needed ? `<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>` : ""}
          </div>
        ` : ""}

        ${canEditOperational ? `<label>Status
          <select id="status-select">
            ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
          </select>
        </label>` : ""}

        ${canEditOperational ? `<div class="quick-actions detail-quick-actions">
          ${canAssignWorkOrderToMe(workOrder) ? `<button class="assign-action" data-assign-me="${workOrder.id}" type="button">${workOrder.assigned_to ? "Reassign to me" : "Assign to me"}</button>` : ""}
          ${STATUS_OPTIONS.filter((status) => status !== workOrder.status).map((status) => `
            <button data-quick-status="${status}" data-id="${workOrder.id}" type="button">${statusLabel(status)}</button>
          `).join("")}
        </div>` : ""}
        ${workOrderActionWarningId === workOrder.id && workOrderActionWarning ? `<p class="error-text action-warning">${escapeHtml(workOrderActionWarning)}</p>` : ""}

        ${canEditOperational ? `<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
            <fieldset class="equipment-choice" id="quick-update-equipment-field" data-equipment-choice>
              <legend>Machine / equipment</legend>
              <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
                <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
                <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
              </div>
              <div data-equipment-choice-panel="existing">
                <label>Existing machine / equipment
                  <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                    <option value="">No machine / equipment - general item or area</option>
                    ${renderAssetOptions(workOrder.asset_id || "")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${escapeHtml(assetLocationRoutingMessage(workOrder.asset_id || ""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${escapeHtml(workOrder.resolution_summary || "")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${escapeHtml(workOrder.due_at || "")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === workOrder.status ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
              </select>
            </label>
            ${renderWorkOrderAssignmentField(workOrder, "quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${renderProcedureOptions(workOrder.procedure_template_id || "")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${workOrder.assets?.status === "offline" ? "checked" : ""}> Machine is down</label>
            ${requiresSafetyDeviceCheck(workOrder) ? `<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${workOrder.safety_devices_checked ? "checked" : ""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>` : `<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>`}
            <p class="error-text" id="quick-update-error"></p>
            <button class="primary-button quick-fix-submit" type="submit">Save Quick Update</button>
          </form>
        </details>` : ""}

        <div class="downtime-copy relationship-detail asset" id="work-order-email-helper-target">
          <div>
            <h3>Email Helper</h3>
            <p class="muted">Copy a human update for email when this machine/equipment is down or needs attention.</p>
          </div>
          <div class="quick-actions">
            <button class="secondary-button" data-copy-downtime="subject" data-id="${workOrder.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${workOrder.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${renderWorkOrderMessages(workOrder)}

        ${canEditOperational ? `<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${escapeHtml(workOrder.title)}"></label>
          <label>Description<textarea name="description" rows="3">${escapeHtml(cleanWorkOrderDescription(workOrder.description) || "")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${escapeHtml(workOrder.due_at || "")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low", "medium", "high", "critical"].map((priority) => `<option value="${priority}" ${priority === workOrder.priority ? "selected" : ""}>${priority}</option>`).join("")}
            </select>
          </label>
          <label>Type
            <select name="type">
              ${TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (workOrder.type || "reactive") ? "selected" : ""}>${type}</option>`).join("")}
            </select>
          </label>
          ${renderWorkOrderAssignmentField(workOrder)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${renderProcedureOptions(workOrder.procedure_template_id || "")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${escapeHtml(workOrder.failure_cause || "")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${escapeHtml(workOrder.resolution_summary || "")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${workOrder.follow_up_needed ? "checked" : ""}> Follow-up needed</label>
          ${requiresSafetyDeviceCheck(workOrder) ? `
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${workOrder.safety_devices_checked ? "checked" : ""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          ` : ""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>` : ""}

        ${procedure ? `
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${escapeHtml(procedure.name)}</h3>
              <span>${progress.done} of ${progress.total} complete \xC2\xB7 required ${requiredProgress.done}/${requiredProgress.total}</span>
            </div>
            <div class="checklist-list">
              ${procedure.procedure_steps.map((step) => canEditOperational ? renderChecklistStep(workOrder, step) : `
                <div class="checklist-step relationship-detail procedure">
                  <span>${step.position}. ${escapeHtml(step.prompt)} ${step.required ? `<small class="required-mark">Required</small>` : ""}</span>
                  <small>${escapeHtml(deps.getStepResultsByWorkOrder()[workOrder.id]?.[step.id]?.value || "Not recorded")}</small>
                </div>
              `).join("") || `<p class="muted">This procedure has no steps yet.</p>`}
            </div>
          </details>
        ` : ""}

        ${canEditOperational && workOrder.status !== "completed" ? `
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${requiredProgress?.total ? `<p class="${requiredProgress.done === requiredProgress.total ? "completion-note" : "warning-text"}">Required checklist: ${requiredProgress.done}/${requiredProgress.total}</p>` : ""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${workOrder.actual_minutes || 0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${requiresSafetyDeviceCheck(workOrder) ? `
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${hasCompletedSafetyDeviceCheck(workOrder) ? "checked" : ""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            ` : ""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit">Complete Work Order</button>
          </form>
          </details>
        ` : ""}

        <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
          <summary>Parts Used</summary>
        ${canEditOperational ? `<form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>` : ""}

        <div class="parts-used-list">
          ${usedParts.length ? `<article class="parts-used-summary"><strong>Parts estimate</strong><span>${money(partsCost)}</span></article>` : ""}
          ${usedParts.map((row) => `
            <article class="relationship-detail parts">
              <strong>${escapeHtml(row.parts?.name || "Part")}</strong>
              <span>${row.quantity_used} used - ${money((Number(row.quantity_used) || 0) * partUsageUnitCost(row))}</span>
              <small>${row.created_at ? new Date(row.created_at).toLocaleString() : "time unavailable"} &middot; ${escapeHtml(profilesByUserId[row.created_by]?.full_name || "Team member")}</small>
            </article>
          `).join("") || `<p class="muted">No parts used yet.</p>`}
        </div>
        </details>

        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos</summary>
        ${canEditOperational ? `<form class="form-grid relationship-detail photo" id="photo-form">
          <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Images only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
          <p class="error-text" id="photo-error"></p>
          <button class="secondary-button" type="submit">Upload Photo</button>
        </form>` : ""}

        <div>
          <h3>Photos</h3>
          <div class="photo-list">
            ${photos.map((photo) => `
              <article class="relationship-detail photo">
                ${photo.signedUrl && photo.content_type?.startsWith("image/") ? `<img class="photo-thumb" src="${escapeHtml(photo.signedUrl)}" alt="${escapeHtml(photo.file_name)}">` : ""}
                <strong>${escapeHtml(photo.file_name)}</strong>
                <span>${photoMetaText(photo)}</span>
                ${photo.signedUrl ? `<a href="${escapeHtml(photo.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : ""}
                ${canEditOperational ? `<button class="text-button danger-link" data-delete-work-order-photo="${escapeHtml(photo.id || "")}" data-work-order-photo-path="${escapeHtml(photo.storage_path || "")}" type="button">Delete Photo</button>` : ""}
              </article>
            `).join("") || `<p class="muted">No photos uploaded yet.</p>`}
          </div>
        </div>
        </details>

        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        ${canEditOperational ? `<form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>` : ""}
        <div class="comment-list">
          ${comments.map((comment) => `
            <article class="relationship-detail comment">
              <strong>${escapeHtml(profilesByUserId[comment.author_id]?.full_name || "Team member")}</strong>
              <span>${comment.created_at ? new Date(comment.created_at).toLocaleString() : ""}</span>
              <p>${escapeHtml(comment.body)}</p>
            </article>
          `).join("") || `<p class="muted">No comments yet.</p>`}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${commentsError ? `<p class="error-text">${escapeHtml(commentsError)}</p>` : ""}
          ${activity.map(renderActivityItem).join("") || `<p class="muted">No activity yet.</p>`}
        </div>
        </details>

        ${canEditOperational && canDeleteWorkOrders() ? renderWorkOrderDangerZone(workOrder) : ""}
      </div>
    `;
          }
          return { renderWorkOrderDetail };
        }
        window.MaintainOpsWorkOrderDetailDisplay = {
          createWorkOrderDetailDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createWorkOrderDetailDisplayHelpers };
        }
      })();
    }
  });

  // src/render/equipmentStructureGuideDisplay.js
  var require_equipmentStructureGuideDisplay = __commonJS({
    "src/render/equipmentStructureGuideDisplay.js"(exports, module) {
      (function() {
        function createEquipmentStructureGuideDisplayHelpers() {
          function renderEquipmentStructureGuide() {
            return `
        <section class="equipment-structure-guide" aria-label="Equipment structure guide">
          <div class="guide-header">
            <span class="guide-kicker">Structure Guide</span>
            <strong>How to model primary equipment, sub equipment, tooling, components, parts, and shop items</strong>
          </div>
          <div class="equipment-structure-grid">
            <article>
              <span>Primary</span>
              <strong>Main equipment record</strong>
              <p>Use for the progressive roll former, ASC line, folder, press, or main equipment people open work against.</p>
            </article>
            <article>
              <span>Forklift</span>
              <strong>Mobile equipment record</strong>
              <p>Use for lift trucks that need repairs, inspections, battery/propane notes, attachments, PM, or recurring issue history.</p>
            </article>
            <article>
              <span>Sub Equipment</span>
              <strong>Major section under a primary</strong>
              <p>Use for uncoiler, forming section, shear, HPU, controls cabinet, conveyor, or another major section under a primary record.</p>
            </article>
            <article>
              <span>Tooling / Setup</span>
              <strong>Swappable profile or station setup</strong>
              <p>Use for roll tooling sets, die sets, profile setups, or station tooling worth tracking separately.</p>
            </article>
            <article>
              <span>Component</span>
              <strong>Tracked piece of equipment</strong>
              <p>Use when a piece of equipment needs its own repairs, PM, adjustments, serial, or recurring issue history.</p>
            </article>
            <article>
              <span>Part</span>
              <strong>Inventory item</strong>
              <p>Use for stocked, purchased, or consumed items like bearings, belts, sensors, fuses, filters, bolts, seals, and common spares.</p>
            </article>
            <article>
              <span>Shop Item</span>
              <strong>Standalone support asset</strong>
              <p>Use for tools or support equipment worth tracking, like welders, test meters, portable pumps, ladders, and tool carts.</p>
            </article>
          </div>
          <p class="guide-note"><strong>Quick rule:</strong> Primary = main equipment. Sub Equipment = major section. Component = tracked piece. Part = inventory. Shop Item = standalone support asset.</p>
          <p class="guide-note"><strong>Roll former rule:</strong> station = position on the machine. Track it separately only if it needs its own maintenance history.</p>
        </section>
      `;
          }
          return { renderEquipmentStructureGuide };
        }
        window.MaintainOpsEquipmentStructureGuideDisplay = {
          createEquipmentStructureGuideDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createEquipmentStructureGuideDisplayHelpers };
        }
      })();
    }
  });

  // src/render/assetDetailDisplay.js
  var require_assetDetailDisplay = __commonJS({
    "src/render/assetDetailDisplay.js"(exports, module) {
      (function() {
        function createAssetDetailDisplayHelpers(deps = {}) {
          const {
            renderCreateWorkOrder,
            parentAssetFor,
            childAssetsFor,
            escapeHtml,
            assetTypeLabel,
            renderParentAssetOptions,
            renderLocationOptions,
            renderAssetAreaOptions,
            assetStatusLabel,
            renderAssetMiniWorkOrder,
            assetDeleteBlockerMessage,
            canDeleteEquipment,
            canEditEquipmentRecords = () => true,
            renderEquipmentStructureGuide,
            renderProcedureOptions
          } = deps;
          function todayDateValue() {
            const now = /* @__PURE__ */ new Date();
            const local = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
            return local.toISOString().slice(0, 10);
          }
          function assetHistoryFor(asset, assetEvents, profilesByUserId) {
            const hasCreatedEvent = assetEvents.some((event) => event.event_type === "created");
            const creationHistory = asset.created_at && !hasCreatedEvent ? [{
              id: `${asset.id}-created`,
              event_type: "created",
              summary: `${assetTypeLabel(asset.asset_type)} created.`,
              actor_id: asset.created_by || "",
              created_at: asset.created_at
            }] : [];
            const equipmentHistory = [...assetEvents, ...creationHistory].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            const historyActorLabel = (event) => {
              if (event.actor_id && profilesByUserId[event.actor_id]?.full_name) return profilesByUserId[event.actor_id].full_name;
              if (event.actor_id) return `User ${String(event.actor_id).slice(0, 8)}`;
              return event.event_type === "created" ? "Creator not recorded" : "Team member not recorded";
            };
            return { equipmentHistory, historyActorLabel };
          }
          function renderHistoryEvents(rows, historyActorLabel) {
            return rows.map((event) => `
        <article>
          <strong>${escapeHtml(String(event.event_type || "noted").replaceAll("_", " "))}</strong>
          <span>${event.created_at ? new Date(event.created_at).toLocaleString() : "time unavailable"} &middot; ${escapeHtml(historyActorLabel(event))}</span>
          <p>${escapeHtml(event.summary || "Equipment history noted.")}</p>
        </article>
      `).join("");
          }
          function renderAssetHistoryScreen() {
            const assets = deps.getAssets();
            const activeAssetId = deps.getActiveAssetId();
            const asset = assets.find((item) => item.id === activeAssetId);
            if (!asset) return renderCreateWorkOrder();
            const assetEventsReady = deps.getAssetEventsReady?.() !== false;
            const profilesByUserId = deps.getProfilesByUserId?.() || {};
            const assetEvents = (deps.getAssetEventsByAssetId?.()[asset.id] || []).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            const { equipmentHistory, historyActorLabel } = assetHistoryFor(asset, assetEvents, profilesByUserId);
            const pageSize = deps.LIST_ITEMS_PER_PAGE || 12;
            const totalPages = Math.max(1, Math.ceil(equipmentHistory.length / pageSize));
            const page = Math.min(Math.max(1, deps.getAssetRelationshipPage?.(asset.id, "asset-history") || 1), totalPages);
            const firstShown = equipmentHistory.length ? (page - 1) * pageSize + 1 : 0;
            const lastShown = Math.min(equipmentHistory.length, page * pageSize);
            const rows = equipmentHistory.slice((page - 1) * pageSize, page * pageSize);
            return `
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${escapeHtml(asset.name)} - ${equipmentHistory.length} event${equipmentHistory.length === 1 ? "" : "s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${escapeHtml(asset.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${assetEventsReady ? "" : `<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>`}
              ${renderHistoryEvents(rows, historyActorLabel) || `<p class="muted">No equipment history notes yet.</p>`}
            </div>
            ${equipmentHistory.length > pageSize ? `
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${escapeHtml(asset.id)}" type="button" ${page <= 1 ? "disabled" : ""}>Previous</button>
                <span>Showing ${firstShown}-${lastShown} of ${equipmentHistory.length} - Page ${page} of ${totalPages}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${escapeHtml(asset.id)}" type="button" ${page >= totalPages ? "disabled" : ""}>Next</button>
              </div>
            ` : ""}
          </section>
        </div>
      `;
          }
          function renderAssetDetail() {
            const assets = deps.getAssets();
            const activeAssetId = deps.getActiveAssetId();
            const asset = assets.find((item) => item.id === activeAssetId);
            if (!asset) return renderCreateWorkOrder();
            if (typeof deps.ensureAssetDocumentSignedUrls === "function") deps.ensureAssetDocumentSignedUrls(asset.id);
            const workOrders = deps.getWorkOrders();
            const preventiveSchedules = deps.getPreventiveSchedules();
            const parts = deps.getParts();
            const assetParts = deps.getAssetParts();
            const assetPartsReady = deps.getAssetPartsReady();
            const assetDocuments = deps.getAssetDocumentsByAssetId?.()[asset.id] || [];
            const assetDocumentsReady = deps.getAssetDocumentsReady?.() !== false;
            const assetEventsReady = deps.getAssetEventsReady?.() !== false;
            const profilesByUserId = deps.getProfilesByUserId?.() || {};
            const partsUsedByWorkOrder = deps.getPartsUsedByWorkOrder();
            const locations = deps.getLocations();
            const activeLocationId = deps.getActiveLocationId();
            const ASSET_TYPE_OPTIONS = deps.ASSET_TYPE_OPTIONS || [];
            const parent = parentAssetFor(asset);
            const children = childAssetsFor(asset.id);
            const assetWorkOrders = workOrders.filter((workOrder) => workOrder.asset_id === asset.id);
            const openWork = assetWorkOrders.filter((workOrder) => workOrder.status !== "completed").sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            const completedWork = assetWorkOrders.filter((workOrder) => workOrder.status === "completed").sort((a, b) => new Date(b.completed_at || b.created_at || 0) - new Date(a.completed_at || a.created_at || 0));
            const assetSchedules = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id);
            const usedParts = Object.values(partsUsedByWorkOrder).flat().filter((row) => assetWorkOrders.some((workOrder) => workOrder.id === row.work_order_id));
            const linkedParts = assetParts.filter((row) => row.asset_id === asset.id);
            const linkedPartIds = new Set(linkedParts.map((row) => row.part_id));
            const attachableParts = parts.filter((part) => !linkedPartIds.has(part.id));
            const assetEvents = (deps.getAssetEventsByAssetId?.()[asset.id] || []).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            const { equipmentHistory } = assetHistoryFor(asset, assetEvents, profilesByUserId);
            const pageSize = deps.LIST_ITEMS_PER_PAGE || 12;
            const relationOpen = (section) => deps.getAssetRelationshipOpen?.(asset.id, section) || false;
            const relationPage = (section, total) => Math.min(
              Math.max(1, deps.getAssetRelationshipPage?.(asset.id, section) || 1),
              Math.max(1, Math.ceil(total / pageSize))
            );
            const pageRows = (rows, section) => {
              const page = relationPage(section, rows.length);
              return rows.slice((page - 1) * pageSize, page * pageSize);
            };
            const relationPagination = (section, total) => {
              if (total <= pageSize) return "";
              const page = relationPage(section, total);
              const totalPages = Math.max(1, Math.ceil(total / pageSize));
              const firstShown = (page - 1) * pageSize + 1;
              const lastShown = Math.min(total, page * pageSize);
              return `
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${escapeHtml(asset.id)}" data-asset-relation-section="${escapeHtml(section)}" type="button" ${page <= 1 ? "disabled" : ""}>Previous</button>
            <span>Showing ${firstShown}-${lastShown} of ${total} - Page ${page} of ${totalPages}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${escapeHtml(asset.id)}" data-asset-relation-section="${escapeHtml(section)}" type="button" ${page >= totalPages ? "disabled" : ""}>Next</button>
          </div>
        `;
            };
            const relationshipDetailsAttrs = (section) => `class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${escapeHtml(section)}" data-asset-id="${escapeHtml(asset.id)}" ${relationOpen(section) ? "open" : ""}`;
            const locationName = locations.find((location) => location.id === asset.location_id)?.name || asset.location || "No location set";
            const primaryLabel = parent ? parent.name : "Top level equipment";
            const statusTone = asset.status === "offline" ? "status-blocked" : asset.status === "degraded" ? "status-open" : asset.status === "watch" ? "status-in_progress" : "status-completed";
            const degradedWithoutOpenWork = asset.status === "degraded" && openWork.length === 0;
            const canEditEquipment = canEditEquipmentRecords();
            return `
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(assetStatusLabel(asset.status))}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.manufacturer ? `<span class="chip">${escapeHtml(asset.manufacturer)}</span>` : ""}
              ${asset.model ? `<span class="chip">${escapeHtml(asset.model)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="safety-check-note disabled">no safety devices identified</span>` : `<span class="safety-check-note">safety devices identified</span>`}
            </div>
            <h2>${escapeHtml(asset.name)}</h2>
            <p>${escapeHtml(asset.location || "No location set")}</p>
            ${parent ? `<p>Part of <button class="text-button inline-link-button" data-open-asset="${escapeHtml(parent.id)}" type="button">${escapeHtml(parent.name)}</button></p>` : ""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${statusTone}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${escapeHtml(assetStatusLabel(asset.status))}</strong>
              <small>${asset.safety_devices_required === false ? "No safety completion gate" : "Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${escapeHtml(locationName)}</strong>
              <small>${asset.location ? escapeHtml(asset.location) : "Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${escapeHtml(primaryLabel)}</strong>
              <small>${parent ? "Linked under parent equipment" : "Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${children.length ? "" : "empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${children.length}</strong>
              <small>${children.length ? "Linked child items" : "No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${linkedParts.length ? "" : "empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${linkedParts.length}</strong>
              <small>${linkedParts.length ? "Recommended/common parts linked" : "No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${openWork.length ? "" : "empty"}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong>${openWork.length}</strong>
              <small>${openWork.length ? "Active work tied to this equipment" : "No open work"}</small>
            </button>
            <button class="command-card command-photo ${assetDocuments.length ? "" : "empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${assetDocuments.length}</strong>
              <small>${assetDocuments.length ? "Machine files on record" : "No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${degradedWithoutOpenWork && canEditEquipment ? `
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${escapeHtml(asset.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          ` : ""}

          ${renderEquipmentStructureGuide ? renderEquipmentStructureGuide() : ""}

          ${canEditEquipment ? `<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${asset.id}" type="button">Quick Fix for this equipment</button>
          </div>` : ""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${assetDocuments.length} file${assetDocuments.length === 1 ? "" : "s"}</span>
            </div>
            ${canEditEquipment ? `<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${escapeHtml(asset.id)}">
              <label>File type
                <select name="document_type">
                  <option value="machine_photo">Machine photo</option>
                  <option value="schematic">Schematic / print</option>
                  <option value="settings">Settings / parameters</option>
                  <option value="manual">Manual / cut sheet</option>
                  <option value="nameplate">Nameplate photo</option>
                  <option value="inspection">Inspection reference</option>
                  <option value="receipt">Receipt / invoice</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-asset-document-error="${escapeHtml(asset.id)}">${assetDocumentsReady ? "" : "Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${assetDocumentsReady ? "" : "disabled"}>Attach Machine File</button>
            </form>` : `<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>`}
            <div class="asset-file-list">
              ${assetDocuments.map((document2) => `
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(document2.content_type || "").startsWith("image/") ? "" : "document-file"}">
                      ${String(document2.content_type || "").startsWith("image/") && document2.signedUrl ? `<img src="${escapeHtml(document2.signedUrl)}" alt="${escapeHtml(document2.original_file_name || document2.file_name || asset.name)}">` : `<strong>${escapeHtml(assetDocumentTypeLabel(document2.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${escapeHtml(assetDocumentTypeLabel(document2.document_type))}</strong>
                      <span>${escapeHtml(document2.original_file_name || document2.file_name || "Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(document2.content_type || "").startsWith("image/") && document2.signedUrl ? `<img src="${escapeHtml(document2.signedUrl)}" alt="${escapeHtml(document2.original_file_name || document2.file_name || asset.name)}">` : `<div class="asset-file-document-preview">${escapeHtml(assetDocumentTypeLabel(document2.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${escapeHtml(document2.content_type || "file")}</span>
                      <a class="secondary-button" href="${escapeHtml(document2.signedUrl || "#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${canEditEquipment ? `<button class="text-button danger-link" data-delete-asset-document="${escapeHtml(document2.id)}" data-asset-document-path="${escapeHtml(document2.storage_path || "")}" type="button">Delete File</button>` : ""}
                    </div>
                  </div>
                </details>
              `).join("") || `<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>`}
            </div>
          </section>

          ${canEditEquipment ? `<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${escapeHtml(asset.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${escapeHtml(asset.asset_code || "")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${escapeHtml(asset.manufacturer || "")}"></label>
            <label>Model<input name="model" value="${escapeHtml(asset.model || "")}"></label>
            <label>Type
              <select name="asset_type">
                ${ASSET_TYPE_OPTIONS.map((type) => `<option value="${type}" ${type === (asset.asset_type || "machine") ? "selected" : ""}>${assetTypeLabel(type)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${renderParentAssetOptions(asset.parent_asset_id || "", asset.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${locations.length ? "" : "disabled"}>
                ${renderLocationOptions(asset.location_id || activeLocationId)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${renderAssetAreaOptions(asset.location || "")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}" ${status === asset.status ? "selected" : ""}>${assetStatusLabel(status)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${asset.safety_devices_required === false ? "" : "checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>` : `<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>`}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${children.map((child) => `
                <article class="mini-work-order" data-open-asset="${escapeHtml(child.id)}">
                  <strong>${escapeHtml(child.name)}</strong>
                  <span>${escapeHtml(assetTypeLabel(child.asset_type))} - ${escapeHtml(assetStatusLabel(child.status))}</span>
                </article>
              `).join("") || `<p class="muted">No equipment is linked under this item yet.</p>`}
            </div>
          </section>

          <details ${relationshipDetailsAttrs("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${openWork.length}</span></summary>
            <div class="mini-list">
              ${relationOpen("open-work") ? pageRows(openWork, "open-work").map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No open work for this equipment.</p>` : `<p class="muted">Open this section to load and review active work for this equipment.</p>`}
            </div>
            ${relationOpen("open-work") ? relationPagination("open-work", openWork.length) : ""}
          </details>

          <details ${relationshipDetailsAttrs("completed-history")}>
            <summary>Completed History <span>${completedWork.length}</span></summary>
            <div class="mini-list">
              ${relationOpen("completed-history") ? pageRows(completedWork, "completed-history").map(renderAssetMiniWorkOrder).join("") || `<p class="muted">No completed work yet.</p>` : `<p class="muted">Open this section to load completed work history for this equipment.</p>`}
            </div>
            ${relationOpen("completed-history") ? relationPagination("completed-history", completedWork.length) : ""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${equipmentHistory.length} event${equipmentHistory.length === 1 ? "" : "s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${escapeHtml(asset.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${assetEventsReady ? `<p class="muted">Review who created or changed this equipment on its own history screen.</p>` : `<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>`}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${assetSchedules.length} schedule${assetSchedules.length === 1 ? "" : "s"}</span>
                ${canEditEquipment ? `<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>` : ""}
              </div>
            </div>
            ${canEditEquipment ? `<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${escapeHtml(asset.id)}">
              <input name="title" required placeholder="PM for ${escapeHtml(asset.name)}">
              <input name="asset_id" type="hidden" value="${escapeHtml(asset.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${renderProcedureOptions ? renderProcedureOptions() : `<option value="">No procedure checklist</option>`}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${todayDateValue()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
            </form>` : ""}
            <div class="mini-list">
              ${assetSchedules.map((schedule) => `<article><strong>${escapeHtml(schedule.title)}</strong><span>${schedule.frequency} - next due ${schedule.next_due_at}</span></article>`).join("") || `<p class="muted">No PM schedules for this equipment.</p>`}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${escapeHtml(asset.id)}" ${relationOpen("linked-parts") ? "open" : ""}>
            <summary>Linked Parts <span>${linkedParts.length}</span></summary>
            <div class="panel-header compact">
              ${canEditEquipment ? `<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>` : ""}
            </div>
            ${relationOpen("linked-parts") && assetPartsReady ? `
              ${canEditEquipment ? `<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${escapeHtml(asset.id)}">
                <label>Part
                  <select name="part_id" ${attachableParts.length ? "" : "disabled"}>
                    <option value="">Select part</option>
                    ${attachableParts.map((part) => `<option value="${escapeHtml(part.id)}">${escapeHtml(part.name)}${part.sku ? ` - ${escapeHtml(part.sku)}` : ""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${attachableParts.length ? "" : "disabled"}>Attach Part</button>
              </form>` : ""}
              <p class="error-text" data-asset-part-error="${escapeHtml(asset.id)}"></p>
              <div class="mini-list">
                ${pageRows(linkedParts, "linked-parts").map((row) => `<article>
                  <strong>${escapeHtml(row.parts?.name || "Part")}</strong>
                  <span>${escapeHtml(row.parts?.sku || "No SKU")} - recommended qty ${escapeHtml(row.quantity_recommended || 1)}${row.note ? ` - ${escapeHtml(row.note)}` : ""}</span>
                  ${canEditEquipment ? `<button class="text-button danger-link" data-remove-asset-part="${escapeHtml(row.id)}" type="button">Remove Link</button>` : ""}
                </article>`).join("") || `<p class="muted">No parts are linked to this equipment yet.</p>`}
              </div>
              ${relationPagination("linked-parts", linkedParts.length)}
            ` : assetPartsReady ? `<p class="muted">Open this section to review or attach linked parts for this equipment.</p>` : `<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>`}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${escapeHtml(asset.id)}" ${relationOpen("parts-used") ? "open" : ""}>
            <summary>Parts Used History <span>${usedParts.length}</span></summary>
            <div class="mini-list">
              ${relationOpen("parts-used") ? pageRows(usedParts, "parts-used").map((row) => `<article><strong>${escapeHtml(row.parts?.name || "Part")}</strong><span>${row.quantity_used} used</span></article>`).join("") || `<p class="muted">No parts history yet.</p>` : `<p class="muted">Open this section to load parts used history for this equipment.</p>`}
            </div>
            ${relationOpen("parts-used") ? relationPagination("parts-used", usedParts.length) : ""}
          </details>

          ${canEditEquipment ? renderAssetDangerZone(asset) : ""}
        </div>
      `;
          }
          function renderAssetDangerZone(asset) {
            const workOrders = deps.getWorkOrders();
            const preventiveSchedules = deps.getPreventiveSchedules();
            const assets = deps.getAssets();
            const activeAssetId = deps.getActiveAssetId();
            const assetWorkOrderCount = workOrders.filter((workOrder) => workOrder.asset_id === asset.id).length;
            const scheduleCount = preventiveSchedules.filter((schedule) => schedule.asset_id === asset.id).length;
            const childCount = assets.filter((item) => item.parent_asset_id === asset.id).length;
            const requestCount = deps.getMaintenanceRequests().filter((request) => request.asset_id === asset.id).length;
            const blockerMessage = assetDeleteBlockerMessage({
              workOrders: assetWorkOrderCount,
              children: childCount,
              schedules: scheduleCount,
              requests: requestCount
            });
            const confirming = deps.getPendingDeleteAssetId() === activeAssetId;
            if (!canDeleteEquipment()) {
              return `<p class="muted">Admins and managers can delete unused equipment.</p>`;
            }
            return `
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${blockerMessage ? blockerMessage : `This permanently removes "${escapeHtml(asset.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${blockerMessage ? `
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          ` : confirming ? `
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${escapeHtml(asset.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${escapeHtml(asset.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          ` : `
            <button class="danger-action-button large-delete-button" data-delete-asset="${escapeHtml(asset.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `;
          }
          function assetDocumentTypeLabel(type) {
            return {
              machine_photo: "Photo",
              schematic: "Schematic",
              settings: "Settings",
              manual: "Manual",
              nameplate: "Nameplate",
              inspection: "Inspection",
              receipt: "Receipt",
              other: "File"
            }[type] || "File";
          }
          return { renderAssetDetail, renderAssetHistoryScreen };
        }
        window.MaintainOpsAssetDetailDisplay = {
          createAssetDetailDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createAssetDetailDisplayHelpers };
        }
      })();
    }
  });

  // src/render/messageCenterDisplay.js
  var require_messageCenterDisplay = __commonJS({
    "src/render/messageCenterDisplay.js"(exports, module) {
      (function() {
        function createMessageCenterDisplayHelpers(deps = {}) {
          const {
            filteredMessageThreads,
            totalUnreadMessages,
            teamMemberName,
            escapeHtml,
            messageComposerScopeNote,
            recentMessageLinkWorkOrders,
            statusLabel,
            renderMessageThreadButton,
            messageThreadScopeLabel,
            renderMessageList
          } = deps;
          const canEditOperationalRecords = deps.canEditOperationalRecords || (() => true);
          function personInitials(name) {
            const parts = String(name || "?").trim().split(/\s+/).filter(Boolean);
            return (parts.length ? parts.map((part) => part[0]).join("") : "?").slice(0, 2).toUpperCase();
          }
          function renderMessageCenter() {
            const messagesReady = deps.getMessagesReady();
            if (!messagesReady) {
              return `<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>`;
            }
            const messageThreads = deps.getMessageThreads();
            const activeMessageThreadId = deps.getActiveMessageThreadId();
            const messagesByThreadId = deps.getMessagesByThreadId();
            const workOrders = deps.getWorkOrders();
            const messageComposerWorkOrderId = deps.getMessageComposerWorkOrderId();
            const messageComposerOpen = deps.getMessageComposerOpen();
            const companyMembers = deps.getCompanyMembers();
            const session = deps.getSession();
            const messageWorkOrderLinksReady = deps.getMessageWorkOrderLinksReady();
            const messageSearchQuery = deps.getMessageSearchQuery();
            const messageThreadFilter = deps.getMessageThreadFilter();
            const messagePeople = companyMembers.filter((member) => member.user_id !== session.user.id);
            const canEditOperational = canEditOperationalRecords();
            const activeThread = messageThreads.find((thread) => thread.id === activeMessageThreadId) || messageThreads[0];
            const threadMessages = activeThread ? messagesByThreadId[activeThread.id] || [] : [];
            const visibleThreads = filteredMessageThreads();
            const messageThreadsPage = deps.getMessageThreadsPage();
            const totalMessageThreadPages = Math.max(1, Math.ceil(visibleThreads.length / deps.LIST_ITEMS_PER_PAGE));
            const safeMessageThreadsPage = Math.min(Math.max(messageThreadsPage, 1), totalMessageThreadPages);
            const pagedVisibleThreads = visibleThreads.slice((safeMessageThreadsPage - 1) * deps.LIST_ITEMS_PER_PAGE, safeMessageThreadsPage * deps.LIST_ITEMS_PER_PAGE);
            const linkedDraftWorkOrder = workOrders.find((workOrder) => workOrder.id === messageComposerWorkOrderId);
            const renderMessagePerson = (member) => {
              const personName = teamMemberName(member.user_id);
              return `
          <button class="message-person-card" data-message-person="${escapeHtml(member.user_id)}" title="Message ${escapeHtml(personName)}" type="button">
            <span class="message-person-avatar" aria-hidden="true">${escapeHtml(personInitials(personName))}</span>
            <span class="message-person-name">${escapeHtml(personName)}</span>
          </button>
        `;
            };
            return `
        <section class="message-center">
          <div class="message-layout">
            <aside class="message-thread-rail">
              <div class="message-rail-header">
                <div>
                  <h3>Messages</h3>
                  <p>${totalUnreadMessages()} unread</p>
                </div>
              </div>
              <div class="message-people-strip" aria-label="Company message contacts">
                ${messagePeople.map(renderMessagePerson).join("") || `<span class="muted">No teammates added yet.</span>`}
              </div>
              ${canEditOperational ? `<form class="message-thread-form" id="message-thread-form">
                <details ${messageComposerOpen || linkedDraftWorkOrder ? "open" : ""}>
                  <summary>New message</summary>
                  <div class="message-thread-fields">
                    <label>Send to
                      <select name="thread_type" id="message-thread-type">
                        <option value="location">Current location</option>
                        <option value="direct">Direct message</option>
                      </select>
                    </label>
                    <label class="message-direct-field">Person
                      <select name="direct_user_id">
                        ${companyMembers.filter((member) => member.user_id !== session.user.id).map((member) => `<option value="${member.user_id}">${escapeHtml(teamMemberName(member.user_id))}</option>`).join("") || `<option value="">No teammates yet</option>`}
                      </select>
                    </label>
                    <div class="message-scope-note" id="message-scope-note">${messageComposerScopeNote("location")}</div>
                    <label>Subject<input name="title" required placeholder="Thread subject" value="${linkedDraftWorkOrder ? `Work order: ${escapeHtml(linkedDraftWorkOrder.title)}` : ""}"></label>
                    ${linkedDraftWorkOrder ? `
                      <input name="work_order_id" type="hidden" value="${linkedDraftWorkOrder.id}">
                      <div class="message-linked-draft">
                        <span>Linked work order</span>
                        <strong>${escapeHtml(linkedDraftWorkOrder.title)}</strong>
                        <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                      </div>
                    ` : `
                      <label>Recent work order
                        <select name="work_order_id" ${messageWorkOrderLinksReady ? "" : "disabled"}>
                          <option value="">No work order</option>
                          ${recentMessageLinkWorkOrders().map((workOrder) => `<option value="${workOrder.id}">${escapeHtml(workOrder.title)} - ${statusLabel(workOrder.status)}</option>`).join("")}
                        </select>
                      </label>
                    `}
                    <label>Message<textarea name="body" rows="3" required placeholder="Type the first message..."></textarea></label>
                    <p class="error-text" id="message-thread-error">${messageWorkOrderLinksReady ? "" : "Run supabase/step-next-message-work-order-links.sql before linking threads to work orders."}</p>
                    <button class="secondary-button message-action-button" type="submit">Start Thread</button>
                  </div>
                </details>
              </form>` : ""}
              <label class="message-search">
                <input id="message-search" type="search" value="${escapeHtml(messageSearchQuery)}" placeholder="Search messages">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[
              ["all", "All"],
              ["unread", "Unread"],
              ["company", "Company"],
              ["location", "Location"],
              ["direct", "Direct"]
            ].map(([id, label]) => `<button class="${messageThreadFilter === id ? "active" : ""}" data-message-filter="${id}" type="button">${label}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${pagedVisibleThreads.map(renderMessageThreadButton).join("") || `<p class="muted">No threads match this filter.</p>`}
              </div>
              ${deps.renderListPagination("messages", visibleThreads.length, safeMessageThreadsPage, totalMessageThreadPages)}
            </aside>
            <section class="message-thread-detail">
              ${activeThread ? `
                <div class="message-chat-header">
                  <div>
                    <h3>${escapeHtml(activeThread.title)}</h3>
                    <p class="muted">${messageThreadScopeLabel(activeThread)}</p>
                  </div>
                  <div class="message-header-actions">
                    ${activeThread.work_order_id ? `<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${activeThread.work_order_id}" type="button">Open Work Order</button>` : ""}
                    <span class="chip comment">${threadMessages.length} message${threadMessages.length === 1 ? "" : "s"}</span>
                    ${canEditOperational ? `<button class="text-button danger-link" data-delete-message-thread="${escapeHtml(activeThread.id)}" type="button">Delete Thread</button>` : ""}
                  </div>
                </div>
                <div class="message-list">
                  ${renderMessageList(threadMessages)}
                </div>
                ${canEditOperational ? `<form class="message-reply-form" id="message-reply-form" data-thread-id="${activeThread.id}">
                  <div class="message-quick-replies">
                    ${["On it", "Need more info", "Waiting on parts", "Complete"].map((reply) => `<button data-quick-reply="${escapeHtml(reply)}" type="button">${escapeHtml(reply)}</button>`).join("")}
                  </div>
                  <textarea name="body" rows="2" required placeholder="Reply to this thread..."></textarea>
                  <p class="error-text" id="message-reply-error"></p>
                  <button class="secondary-button message-action-button" type="submit">Send Reply</button>
                </form>` : ""}
              ` : `<p class="muted">Choose or start a thread.</p>`}
            </section>
          </div>
        </section>
      `;
          }
          return { renderMessageCenter };
        }
        window.MaintainOpsMessageCenterDisplay = {
          createMessageCenterDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createMessageCenterDisplayHelpers };
        }
      })();
    }
  });

  // src/render/createWorkOrderDisplay.js
  var require_createWorkOrderDisplay = __commonJS({
    "src/render/createWorkOrderDisplay.js"(exports, module) {
      (function() {
        function createCreateWorkOrderDisplayHelpers(deps = {}) {
          const {
            STATUS_OPTIONS = [],
            TYPE_OPTIONS = [],
            renderAssetOptions,
            statusLabel,
            renderAssignmentSelect,
            renderProcedureOptions,
            escapeHtml
          } = deps;
          function todayDateValue() {
            const now = /* @__PURE__ */ new Date();
            const local = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
            return local.toISOString().slice(0, 10);
          }
          function renderCreateWorkOrder() {
            const parts = deps.getParts();
            return `
        <form class="form-grid create-work-order-template relationship-detail asset" id="create-work-order-form">
          <div>
            <h3>Create Work Order</h3>
            <p class="muted">Build a complete work order step by step.</p>
          </div>

          <div class="form-section-title">1. What needs attention?</div>
          <label>Title<input name="title" required placeholder="Inspect packaging line sensor"></label>
          <label>Description<textarea name="description" rows="2" placeholder="What is happening, where, and what should be checked?"></textarea></label>
          <fieldset class="equipment-choice" data-equipment-choice>
            <legend>Machine / equipment</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
            </div>
            <div data-equipment-choice-panel="existing">
              <label>Existing machine / equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                  <option value="">No machine / equipment - general item or area</option>
                  ${renderAssetOptions()}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning></p>

          <details class="quick-fix-more" open>
            <summary>2. Priority and timing</summary>
            <div class="form-grid">
              <label>Status
                <select name="status">
                  ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${status === "open" ? "selected" : ""}>${statusLabel(status)}</option>`).join("")}
                </select>
              </label>
              <label>Priority
                <select name="priority">
                  <option>medium</option>
                  <option>high</option>
                  <option>critical</option>
                  <option>low</option>
                </select>
              </label>
              <label>Type
                <select name="type">
                  ${TYPE_OPTIONS.filter((type) => type !== "request").map((type) => `<option value="${type}">${type}</option>`).join("")}
                </select>
              </label>
              <label>Complete by / due date
                <span class="date-picker-row" data-date-picker-field>
                  <input name="due_at" type="date" value="${todayDateValue()}">
                  <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
                </span>
                <small>Defaults to today. Use the calendar to choose a different deadline.</small>
              </label>
            </div>
          </details>

          <details class="quick-fix-more">
            <summary>3. People and procedure</summary>
            <div class="form-grid">
              <label>Assign to
                <select name="assigned_to">
                  ${renderAssignmentSelect("", { selfLabel: "Assign to me" })}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${renderProcedureOptions()}
                </select>
              </label>
            </div>
          </details>

          <details class="quick-fix-more">
            <summary>4. Internal notes and completion</summary>
            <div class="form-grid">
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
              <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
              <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>
              <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="0"></label>
              <label>Completion notes<textarea name="completion_notes" rows="2" placeholder="Final notes if this is already complete."></textarea></label>
            </div>
          </details>

          <details class="quick-fix-more">
            <summary>5. Parts, photo, and first comment</summary>
            <div class="form-grid">
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
              <label>First comment<textarea name="initial_comment" rows="2" placeholder="Add the first update or note for the record."></textarea></label>
            </div>
          </details>

          <p class="error-text" id="create-work-order-error"></p>
          <button class="primary-button work-action-button quick-fix-submit" type="submit">Create Work Order</button>
        </form>
      `;
          }
          return { renderCreateWorkOrder };
        }
        window.MaintainOpsCreateWorkOrderDisplay = {
          createCreateWorkOrderDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createCreateWorkOrderDisplayHelpers };
        }
      })();
    }
  });

  // src/render/quickFixDisplay.js
  var require_quickFixDisplay = __commonJS({
    "src/render/quickFixDisplay.js"(exports, module) {
      (function() {
        function createQuickFixDisplayHelpers(deps = {}) {
          const {
            TYPE_OPTIONS = [],
            renderAssetOptions,
            assetLocationRoutingMessage,
            escapeHtml,
            renderAssignmentSelect,
            renderProcedureOptions,
            assetStatusLabel
          } = deps;
          function todayDateValue() {
            const now = /* @__PURE__ */ new Date();
            const local = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
            return local.toISOString().slice(0, 10);
          }
          function renderQuickFixForm() {
            const quickFixAssetId = deps.getQuickFixAssetId();
            const quickFixRequestId = deps.getQuickFixRequestId();
            const maintenanceRequests = deps.getMaintenanceRequests();
            const session = deps.getSession();
            const parts = deps.getParts();
            const selectedAssetId = quickFixAssetId || "";
            const sourceRequest = maintenanceRequests.find((request) => request.id === quickFixRequestId);
            return `
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${sourceRequest ? `<p class="completion-note">Resolving request: ${escapeHtml(sourceRequest.title)}</p>` : ""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${escapeHtml(sourceRequest?.title || "")}"></label>
          <label>Description<textarea name="description" rows="3" placeholder="Describe what happened, where it happened, and what should be checked.">${escapeHtml(sourceRequest?.description || "")}</textarea></label>
          <label>Complete by / due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${todayDateValue()}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
            <small>Defaults to today. Use the calendar to choose a different deadline.</small>
          </label>
          <fieldset class="equipment-choice" data-equipment-choice>
            <legend>Machine / equipment</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
            </div>
            <div data-equipment-choice-panel="existing">
              <label>Existing machine / equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                  <option value="">No machine / equipment - general item or area</option>
                  ${renderAssetOptions(selectedAssetId || sourceRequest?.asset_id || "")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${escapeHtml(assetLocationRoutingMessage(selectedAssetId || sourceRequest?.asset_id || ""))}</p>
          <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
          <label class="check-row"><input name="machine_down" type="checkbox"> Machine is down</label>
          <label class="check-row"><input name="mark_completed" type="checkbox"> Already fixed - mark complete now</label>
          <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices identified if completing equipment work: E-stops, sensors, guards, and interlocks</label>
          <details class="quick-fix-more">
            <summary>Optional details</summary>
            <div class="form-grid">
              <div class="form-section-title">Work Order Info</div>
              <label>Priority
                <select name="priority">
                  ${["medium", "high", "critical", "low"].map((priority) => `<option value="${priority}">${priority}</option>`).join("")}
                </select>
              </label>
              <label>Type
                <select name="type">
                  ${TYPE_OPTIONS.filter((type) => type !== "request").map((type) => `<option value="${type}" ${type === "corrective" ? "selected" : ""}>${type}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${renderAssignmentSelect(session.user.id, { selfLabel: "Assign to me" })}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${renderProcedureOptions()}
                </select>
              </label>
              <div class="form-section-title">Outcome / Notes</div>
              <label>What did you do?<textarea name="resolution_summary" rows="2" placeholder="Tightened mount, tested switch, line returned to normal."></textarea></label>
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="Loose mount, worn part, operator report, unknown..."></textarea></label>
            <label>Equipment status after fix
              <select name="asset_status">
                <option value="">Leave unchanged</option>
                  ${["running", "watch", "degraded", "offline"].map((status) => `<option value="${status}">${assetStatusLabel(status)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${parts.map((part) => `<option value="${part.id}">${escapeHtml(part.name)} (${part.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `;
          }
          return { renderQuickFixForm };
        }
        window.MaintainOpsQuickFixDisplay = {
          createQuickFixDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createQuickFixDisplayHelpers };
        }
      })();
    }
  });

  // src/render/authDisplay.js
  var require_authDisplay = __commonJS({
    "src/render/authDisplay.js"(exports, module) {
      (function() {
        function createAuthDisplayHelpers(deps = {}) {
          const escapeHtml = deps.escapeHtml;
          function workspaceLoading(message) {
            return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${escapeHtml(message)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `;
          }
          function workspaceLoadError(message) {
            return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${escapeHtml(message)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `;
          }
          function authForm(mode, initialError = "") {
            const isSignup = mode === "signup";
            return `
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${isSignup ? "Create Account" : "Welcome Back"}</h1>
                <p>${isSignup ? "Start with email and password." : "Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${isSignup ? `<label>Full name<input name="fullName" required autocomplete="name"></label>` : ""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${isSignup ? "new-password" : "current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${isSignup ? "Sign Up" : "Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${isSignup ? "I already have an account" : "Create an account"}</button>
            ${isSignup ? "" : `<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>`}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `;
          }
          function authCallback(message) {
            return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${escapeHtml(message)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `;
          }
          function authCallbackError(message) {
            return `
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${escapeHtml(message)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `;
          }
          function passwordResetRequest(initialError = "", initialStatus = "") {
            return `
        <section class="auth-shell">
          <form class="auth-card" id="password-reset-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Reset Password</h1>
                <p>Send a secure reset link to your email.</p>
              </div>
            </div>
            <div class="form-grid">
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
            </div>
            <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
            <p class="muted auth-status" id="auth-status">${escapeHtml(initialStatus)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `;
          }
          function passwordRecovery(options = {}) {
            const ready = Boolean(options.ready);
            const initialError = options.initialError || "";
            return `
        <section class="auth-shell">
          <form class="auth-card" id="password-recovery-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Set New Password</h1>
                <p>Enter a new password for this MaintainOps login.</p>
              </div>
            </div>
            <div class="form-grid">
              <label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password" ${ready ? "" : "disabled"}></label>
              <label>Confirm password<input name="confirmPassword" type="password" minlength="6" required autocomplete="new-password" ${ready ? "" : "disabled"}></label>
            </div>
            <p class="error-text" id="auth-error">${escapeHtml(initialError)}</p>
            <p class="muted auth-status" id="auth-status">${ready ? "Reset link accepted. Choose your new password." : ""}</p>
            <button class="primary-button" type="submit" ${ready ? "" : "disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `;
          }
          function companyCreate(appError = "") {
            return `
        <section class="auth-shell">
          <form class="auth-card" id="company-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Create Company</h1>
                <p>Your shared maintenance data will live inside this company.</p>
              </div>
            </div>
            <label>Company name<input name="name" required placeholder="North Plant Operations"></label>
            <p class="error-text" id="company-error">${escapeHtml(appError)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `;
          }
          return {
            workspaceLoading,
            workspaceLoadError,
            authForm,
            authCallback,
            authCallbackError,
            passwordResetRequest,
            passwordRecovery,
            companyCreate
          };
        }
        window.MaintainOpsAuthDisplay = {
          createAuthDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createAuthDisplayHelpers };
        }
      })();
    }
  });

  // src/render/publicRequestDisplay.js
  var require_publicRequestDisplay = __commonJS({
    "src/render/publicRequestDisplay.js"(exports, module) {
      (function() {
        function createPublicRequestDisplayHelpers(deps = {}) {
          const escapeHtml = deps.escapeHtml;
          const qrSvgFor = deps.qrSvgFor;
          const getLocations = deps.getLocations || (() => []);
          const getPublicRequestLinks = deps.getPublicRequestLinks || (() => []);
          const getPublicRequestLinksReady = deps.getPublicRequestLinksReady || (() => true);
          const getPublicAppUrlOverride = deps.getPublicAppUrlOverride || (() => "");
          const getWindowPublicAppUrl = deps.getWindowPublicAppUrl || (() => "");
          const canManageTeam = deps.canManageTeam || (() => false);
          const canAdministerPublicRequestLinks = deps.canAdministerPublicRequestLinks || (() => false);
          const publicAppBaseUrl = deps.publicAppBaseUrl;
          const publicRequestUrl = deps.publicRequestUrl;
          const publicRequestQrUrl = deps.publicRequestQrUrl;
          function loadingQrPage() {
            return `
        <section class="auth-shell public-request-shell qr-page-shell">
          <div class="auth-card public-qr-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Maintenance Request QR</h1>
                <p>Loading QR code...</p>
              </div>
            </div>
          </div>
        </section>
      `;
          }
          function publicRequestQrPage(intake, requestUrl) {
            return `
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${escapeHtml(intake.location_name)}</h1>
                <p>${escapeHtml(intake.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${qrSvgFor(requestUrl, 8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${escapeHtml(requestUrl)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${escapeHtml(requestUrl)}" target="_blank" rel="noreferrer">Test Form</a>
            </div>
          </article>
        </section>
      `;
          }
          function loadingRequestForm() {
            return `
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Maintenance Request</h1>
                <p>Loading request form...</p>
              </div>
            </div>
          </div>
        </section>
      `;
          }
          function publicRequestForm(intake) {
            return `
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${escapeHtml(intake.company_name)}</h1>
                <p>${escapeHtml(intake.location_name)} maintenance request</p>
              </div>
            </div>
            <div class="form-grid">
              <label>What needs attention?<input name="title" required maxlength="140" placeholder="Short issue description"></label>
              <label>Machine / area<input name="equipment_note" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
              <label>Details<textarea name="description" rows="4" required maxlength="1000" placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
              <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
              <label>Your name<input name="requester_name" required maxlength="120" placeholder="Who is submitting this?"></label>
              <label>Contact<input name="requester_contact" maxlength="160" placeholder="Optional phone, radio, or email"></label>
              <label>Urgency
                <select name="priority">
                  <option value="medium">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical / down</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
            <p class="error-text" id="public-request-error"></p>
            <button class="primary-button request-action-button" type="submit">Send Request</button>
          </form>
        </section>
      `;
          }
          function publicRequestError(message) {
            return `
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${escapeHtml(message)}</p>
              </div>
            </div>
          </div>
        </section>
      `;
          }
          function publicRequestSuccess(intake, photoWarning = "") {
            return `
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${escapeHtml(intake.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${photoWarning ? `<p class="error-text">${escapeHtml(photoWarning)}</p>` : ""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `;
          }
          function publicRequestLinkManager() {
            if (!canManageTeam()) return "";
            const publicBaseUrl = publicAppBaseUrl();
            const locations = getLocations();
            const publicRequestLinksReady = getPublicRequestLinksReady();
            return `
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${escapeHtml(getPublicAppUrlOverride() || String(getWindowPublicAppUrl() || ""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${publicBaseUrl ? `<p class="muted">QR codes will point to ${escapeHtml(publicBaseUrl)}</p>` : `<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>`}
          <p class="error-text" id="public-request-link-error">${publicRequestLinksReady ? "" : "Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${locations.map(publicRequestLocationCard).join("") || `<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>`}
          </div>
        </section>
      `;
          }
          function publicRequestLocationCard(location) {
            const link = getPublicRequestLinks().find((item) => item.location_id === location.id);
            const linkActive = Boolean(link && link.is_active !== false);
            const canAdministerLinks = canAdministerPublicRequestLinks();
            const requestUrl = linkActive ? publicRequestUrl(link.token) : "";
            const qrUrl = linkActive ? publicRequestQrUrl(link.token) : "";
            const hasUsableUrl = Boolean(requestUrl && qrUrl);
            return `
        <article class="public-request-link-card">
          <div>
            <strong>${escapeHtml(location.name)}</strong>
            <span>${linkActive ? "External request link active" : link ? "Request link disabled" : "No request link yet"}</span>
            ${link?.last_used_at ? `<span>Last used ${new Date(link.last_used_at).toLocaleString()}</span>` : ""}
          </div>
          ${linkActive ? `
            <div class="qr-preview">${hasUsableUrl ? qrSvgFor(requestUrl) : `<div class="qr-fallback">Set URL</div>`}</div>
            <input class="copy-field" value="${escapeHtml(qrUrl || "Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${hasUsableUrl ? "" : "disabled-link"}" href="${escapeHtml(qrUrl || "#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${escapeHtml(qrUrl)}" type="button" ${hasUsableUrl ? "" : "disabled"}>Copy QR Link</button>
              <a class="secondary-button ${hasUsableUrl ? "" : "disabled-link"}" href="${escapeHtml(requestUrl || "#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${canAdministerLinks ? `
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${escapeHtml(link.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${escapeHtml(link.id)}" type="button">Disable Link</button>
              ` : `<span class="muted">Only admins can replace or disable posted QR codes.</span>`}
            </div>
          ` : link ? `
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${canAdministerLinks ? `
                <button class="secondary-button request-action-button" data-enable-public-request-link="${escapeHtml(link.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${escapeHtml(link.id)}" type="button">Regenerate QR</button>
              ` : `<span class="muted">Only admins can reactivate or replace this QR code.</span>`}
            </div>
          ` : `
            <button class="secondary-button request-action-button" data-create-public-request-link="${escapeHtml(location.id)}" type="button" ${getPublicRequestLinksReady() ? "" : "disabled"}>Create QR Link</button>
          `}
        </article>
      `;
          }
          return {
            loadingQrPage,
            publicRequestQrPage,
            loadingRequestForm,
            publicRequestForm,
            publicRequestError,
            publicRequestSuccess,
            publicRequestLinkManager,
            publicRequestLocationCard
          };
        }
        window.MaintainOpsPublicRequestDisplay = {
          createPublicRequestDisplayHelpers
        };
        if (typeof module !== "undefined") {
          module.exports = { createPublicRequestDisplayHelpers };
        }
      })();
    }
  });

  // src/utils/authRedirects.js
  (function(global) {
    function stripTrailingSlash(value) {
      return String(value || "").replace(/\/+$/, "");
    }
    function appBaseUrl(locationLike = global.location, publicAppUrl = global.PUBLIC_APP_URL) {
      if (publicAppUrl) return `${stripTrailingSlash(publicAppUrl)}/`;
      const origin = locationLike?.origin || "";
      const path = locationLike?.pathname || "/";
      const marker = "/auth/callback";
      const callbackIndex = path.indexOf(marker);
      if (callbackIndex >= 0) return `${origin}${path.slice(0, callbackIndex + 1)}`;
      const directory = path.endsWith("/") ? path : path.replace(/[^/]*$/, "");
      return `${origin}${directory || "/"}`;
    }
    function authCallbackUrl(locationLike = global.location, publicAppUrl = global.PUBLIC_APP_URL) {
      return `${appBaseUrl(locationLike, publicAppUrl)}auth/callback/`;
    }
    function workspaceUrl(params = {}, locationLike = global.location, publicAppUrl = global.PUBLIC_APP_URL) {
      const url = new URL(appBaseUrl(locationLike, publicAppUrl));
      Object.entries(params).forEach(([key, value]) => {
        if (value !== void 0 && value !== null && value !== "") url.searchParams.set(key, value);
      });
      return url.href;
    }
    function authParamsFromHref(href) {
      const url = new URL(href);
      const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
      const queryParams = url.searchParams;
      return {
        code: queryParams.get("code") || "",
        type: hashParams.get("type") || queryParams.get("type") || "",
        accessToken: hashParams.get("access_token") || queryParams.get("access_token") || "",
        refreshToken: hashParams.get("refresh_token") || queryParams.get("refresh_token") || "",
        error: hashParams.get("error") || queryParams.get("error") || "",
        errorCode: hashParams.get("error_code") || queryParams.get("error_code") || "",
        errorDescription: hashParams.get("error_description") || queryParams.get("error_description") || ""
      };
    }
    function isAuthCallbackParams(params) {
      return Boolean(params?.code || params?.accessToken && params?.refreshToken || params?.error || params?.errorDescription);
    }
    function isPasswordRecoveryParams(params) {
      return params?.type === "recovery" || !params?.type && Boolean(params?.accessToken && params?.refreshToken);
    }
    function cleanAuthUrl(locationLike = global.location) {
      const url = new URL(locationLike.href);
      [
        "access_token",
        "code",
        "error",
        "error_code",
        "error_description",
        "expires_at",
        "expires_in",
        "refresh_token",
        "token_type",
        "type",
        "sb"
      ].forEach((key) => url.searchParams.delete(key));
      url.hash = "";
      return url.href;
    }
    global.MaintainOpsAuthRedirects = {
      appBaseUrl,
      authCallbackUrl,
      workspaceUrl,
      authParamsFromHref,
      isAuthCallbackParams,
      isPasswordRecoveryParams,
      cleanAuthUrl
    };
  })(window);

  // src/utils/constants.js
  (function() {
    window.MaintainOpsConstants = Object.freeze({
      STATUS_OPTIONS: Object.freeze(["open", "in_progress", "blocked", "completed"]),
      TYPE_OPTIONS: Object.freeze(["request", "reactive", "preventive", "inspection", "corrective"]),
      ASSET_TYPE_OPTIONS: Object.freeze(["machine", "forklift", "secondary_machine", "tooling", "component", "shop_item"]),
      WORK_ORDERS_PER_PAGE: 12,
      PARTS_PER_PAGE: 12,
      ASSETS_PER_PAGE: 12,
      LIST_ITEMS_PER_PAGE: 12,
      SEARCH_ID_PAGE_SIZE: 1e3,
      SEARCH_ID_CHUNK_SIZE: 100,
      SEARCH_PREVIEW_LIMIT: 6,
      OUTSIDE_VENDOR_VALUE: "__outside_vendor__",
      OUTSIDE_VENDOR_NOTE: "[Assignment: Outside vendor]",
      COMPANY_ROLES: Object.freeze(["technician", "accounting", "manager", "admin"]),
      ACTIVE_LOCATION_STORAGE_KEY: "maintainops.activeLocationId"
    });
  })();

  // src/utils/dom.js
  (function() {
    function escapeHtml(value) {
      return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }
    window.MaintainOpsDom = Object.freeze({
      escapeHtml
    });
  })();

  // src/utils/formatting.js
  (function() {
    function postgrestSearchTerm(value) {
      return String(value || "").trim().replace(/[,%()]/g, " ").replace(/\s+/g, " ").slice(0, 80);
    }
    function isoDate(date) {
      return date.toISOString().slice(0, 10);
    }
    function isoDateTime(date) {
      return date.toISOString();
    }
    function daysAgoDate(days) {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() - days);
      return date;
    }
    function monthStartDate() {
      const now = /* @__PURE__ */ new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    function chunkArray(items, size) {
      const chunks = [];
      for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
      }
      return chunks;
    }
    function fileBaseName(fileName) {
      return safeFileName(fileName).replace(/\.[^/.]+$/, "") || "photo";
    }
    function safeFileName(fileName) {
      return String(fileName || "photo").replace(/[^a-z0-9._-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "photo";
    }
    function statusLabel(status) {
      if (status === "active" || status === "all") return "Active";
      if (status === "overdue") return "Overdue";
      if (status === "completed") return "All Completed";
      if (status === "completed_month") return "Completed Month";
      if (status === "completed_week") return "Done This Week";
      if (status === "open") return "New";
      return String(status || "").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
    function normalizeRole(role) {
      const roles = window.MaintainOpsConstants?.COMPANY_ROLES || ["technician", "accounting", "manager", "admin"];
      const normalized = String(role || "technician").trim().toLowerCase();
      if (normalized === "member") return "technician";
      return roles.includes(normalized) ? normalized : "technician";
    }
    function roleLabel(role) {
      const labels = {
        admin: "Admin",
        manager: "Manager",
        accounting: "Accounting",
        technician: "Technician"
      };
      return labels[normalizeRole(role)] || "Technician";
    }
    function roleDescription(role) {
      const descriptions = {
        admin: "Full company setup, team, and work access.",
        manager: "Can manage work, settings, and teammates.",
        accounting: "Can review equipment financial records without changing operations.",
        technician: "Can create work, convert requests, and claim unassigned work."
      };
      return descriptions[normalizeRole(role)] || descriptions.technician;
    }
    function formatDate(value) {
      return (/* @__PURE__ */ new Date(`${value}T00:00:00`)).toLocaleDateString();
    }
    function photoMetaText(photo) {
      const parts = [new Date(photo.created_at).toLocaleString()];
      if (photo.file_size_bytes) parts.push(formatBytes(photo.file_size_bytes));
      if (photo.original_size_bytes && photo.file_size_bytes && photo.original_size_bytes !== photo.file_size_bytes) {
        parts.push(`optimized from ${formatBytes(photo.original_size_bytes)}`);
      }
      return parts.join(" - ");
    }
    function requestPhotoMetaText(request) {
      const parts = [];
      if (request.photo_uploaded_at || request.updated_at || request.created_at) {
        parts.push(new Date(request.photo_uploaded_at || request.updated_at || request.created_at).toLocaleString());
      }
      if (request.photo_file_size_bytes) parts.push(formatBytes(request.photo_file_size_bytes));
      if (request.photo_original_size_bytes && request.photo_file_size_bytes && request.photo_original_size_bytes !== request.photo_file_size_bytes) {
        parts.push(`optimized from ${formatBytes(request.photo_original_size_bytes)}`);
      }
      return parts.join(" - ") || "Photo attached";
    }
    function formatBytes(bytes) {
      const value = Number(bytes) || 0;
      if (!value) return "";
      if (value < 1024) return `${value} B`;
      if (value < 1048576) return `${Math.round(value / 1024)} KB`;
      return `${(value / 1048576).toFixed(value >= 10485760 ? 0 : 1)} MB`;
    }
    function money(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
      }).format(Number(value) || 0);
    }
    function partUsageUnitCost(row) {
      return Number(row.unit_cost_at_use ?? row.parts?.unit_cost ?? 0) || 0;
    }
    function getDueState(workOrder) {
      if (!workOrder.due_at || workOrder.status === "completed") return null;
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const due = /* @__PURE__ */ new Date(`${workOrder.due_at}T00:00:00`);
      const diffDays = Math.round((due - today) / 864e5);
      if (diffDays < 0) return { label: "overdue", className: "overdue" };
      if (diffDays === 0) return { label: "due today", className: "due_today" };
      return null;
    }
    function startOfToday() {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    function csvCell(value) {
      const text = String(value ?? "");
      return `"${text.replaceAll('"', '""')}"`;
    }
    window.MaintainOpsFormatting = Object.freeze({
      postgrestSearchTerm,
      isoDate,
      isoDateTime,
      daysAgoDate,
      monthStartDate,
      chunkArray,
      fileBaseName,
      safeFileName,
      statusLabel,
      normalizeRole,
      roleLabel,
      roleDescription,
      formatDate,
      photoMetaText,
      requestPhotoMetaText,
      formatBytes,
      money,
      partUsageUnitCost,
      getDueState,
      startOfToday,
      csvCell
    });
  })();

  // src/utils/schemaErrors.js
  (function() {
    function isColumnSchemaError(error, columns) {
      const message = error?.message || "";
      return columns.some((column) => message.includes(column));
    }
    function isMissingColumnError(error, columnName) {
      const message = error?.message || "";
      return message.includes(columnName) && (message.includes("column") || message.includes("schema cache"));
    }
    function isProfileMissingError(error) {
      const message = error?.message || "";
      return message.includes("work_order_comments_company_author_profile_fkey") || message.includes("profiles");
    }
    function isProcedureSchemaError(error) {
      const message = error?.message || "";
      return Boolean(message.includes("procedure_template_id") || message.includes("procedure_templates") || message.includes("procedure_steps"));
    }
    function isAssetHierarchySchemaError(error) {
      return isColumnSchemaError(error, ["parent_asset_id", "asset_type", "safety_devices_required", "safety_check_required"]);
    }
    window.MaintainOpsSchemaErrors = {
      isColumnSchemaError,
      isMissingColumnError,
      isProfileMissingError,
      isProcedureSchemaError,
      isAssetHierarchySchemaError
    };
  })();

  // src/utils/operationResults.js
  (function() {
    function withSetupError(response, message) {
      return {
        ...response,
        error: {
          ...response.error || {},
          message,
          originalMessage: response.error?.message || ""
        }
      };
    }
    window.MaintainOpsOperationResults = {
      withSetupError
    };
  })();

  // src/utils/operationTimeout.js
  (function() {
    function withOperationTimeout(promise, message, timeoutMs = 2e4) {
      let timeoutId;
      const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
      });
      return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
    }
    window.MaintainOpsOperationTimeout = {
      withOperationTimeout
    };
  })();

  // src/bundles/runtime.entry.js
  var import_authRenderPolicy = __toESM(require_authRenderPolicy());

  // src/utils/publicUrlQr.js
  (function() {
    function createPublicUrlQrHelpers(options = {}) {
      const win = options.windowRef || window;
      const getPublicAppUrlOverride = options.getPublicAppUrlOverride || (() => "");
      function publicRequestUrl(token) {
        return publicAppUrlWithSearch(`?request=${encodeURIComponent(token)}`);
      }
      function publicRequestQrUrl(token) {
        return publicAppUrlWithSearch(`?qr=${encodeURIComponent(token)}`);
      }
      function publicAppUrlWithSearch(search) {
        const base = publicAppBaseUrl();
        if (!base) return "";
        const url = new URL(base);
        url.search = search;
        url.hash = "";
        return url.toString();
      }
      function publicAppBaseUrl() {
        const configured = getPublicAppUrlOverride() || String(win.PUBLIC_APP_URL || "").trim();
        const candidate = configured || (win.location.protocol === "https:" ? win.location.href : "");
        if (!candidate) return "";
        return normalizePublicAppUrl(candidate);
      }
      function normalizePublicAppUrl(value) {
        try {
          const url = new URL(String(value || "").trim(), win.location.href);
          if (url.protocol !== "https:") return "";
          if (!isPublicAppHost(url.hostname)) return "";
          url.search = "";
          url.hash = "";
          if (url.pathname && url.pathname !== "/" && !url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
            url.pathname = `${url.pathname}/`;
          }
          return url.toString();
        } catch (error) {
          return "";
        }
      }
      function isPublicAppHost(hostname) {
        const host = String(hostname || "").toLowerCase();
        if (!host || host === "localhost" || host.endsWith(".localhost")) return false;
        if (host === "127.0.0.1" || host === "::1" || host === "[::1]") return false;
        if (/^10\./.test(host) || /^192\.168\./.test(host)) return false;
        if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false;
        return true;
      }
      function qrSvgFor(value, cellSize = 4) {
        if (!win.qrcode || !value) return `<div class="qr-fallback">QR</div>`;
        try {
          const qr = win.qrcode(0, "M");
          qr.addData(value);
          qr.make();
          return qr.createSvgTag(cellSize, 0).replace("<svg", '<svg class="qr-code"');
        } catch (error) {
          return `<div class="qr-fallback">QR</div>`;
        }
      }
      return {
        publicRequestUrl,
        publicRequestQrUrl,
        publicAppUrlWithSearch,
        publicAppBaseUrl,
        normalizePublicAppUrl,
        isPublicAppHost,
        qrSvgFor
      };
    }
    window.MaintainOpsPublicUrlQr = {
      createPublicUrlQrHelpers
    };
  })();

  // src/utils/publicQrPrintEvents.js
  (function() {
    function bindPublicQrPrintEvents(options = {}) {
      const doc = options.documentRef || document;
      const printRef = options.printRef || (() => window.print());
      const button = doc.querySelector("#print-public-qr");
      if (!button || typeof printRef !== "function") return;
      button.addEventListener("click", () => printRef());
    }
    window.MaintainOpsPublicQrPrintEvents = {
      bindPublicQrPrintEvents
    };
  })();

  // src/utils/maintenanceScheduleDates.js
  (function() {
    function nextDueDate(value, frequency) {
      const date = /* @__PURE__ */ new Date(`${value}T00:00:00`);
      if (frequency === "weekly") date.setDate(date.getDate() + 7);
      if (frequency === "monthly") date.setMonth(date.getMonth() + 1);
      if (frequency === "quarterly") date.setMonth(date.getMonth() + 3);
      return date.toISOString().slice(0, 10);
    }
    window.MaintainOpsMaintenanceScheduleDates = {
      nextDueDate
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workspaceUiState = __toESM(require_workspaceUiState());

  // src/utils/workOrderQueryFilters.js
  (function() {
    function createWorkOrderQueryFilterHelpers(deps) {
      function state(name) {
        return deps[name]();
      }
      function applyWorkOrderListFilters(query) {
        const searchQuery = state("searchQuery");
        const activeSection = state("activeSection");
        const activeStatusFilter = state("activeStatusFilter");
        const isGlobalSearch = Boolean(searchQuery.trim());
        const statusFilter = isGlobalSearch ? "__any__" : activeSection === "work" && activeStatusFilter === "requests" ? "__none__" : activeStatusFilter;
        return applyWorkOrderSort(applyWorkOrderFilters(query, {
          statusFilter,
          section: activeSection,
          includeQueue: !isGlobalSearch,
          includeSearch: true
        }));
      }
      function applyWorkOrderFilters(query, options = {}) {
        let nextQuery = query.eq("company_id", state("activeCompanyId"));
        if (state("locationsReady") && state("activeLocationId")) {
          nextQuery = nextQuery.eq("location_id", state("activeLocationId"));
        }
        if (options.includeQueue !== false) {
          nextQuery = applyWorkOrderQueueFilters(nextQuery, options.section || state("activeSection"));
        }
        nextQuery = applyWorkOrderStatusFilter(nextQuery, options.statusFilter || state("activeStatusFilter"));
        if (options.includeSearch !== false) {
          const term = deps.postgrestSearchTerm(state("searchQuery"));
          if (term) {
            const workOrderRelatedSearch = state("workOrderRelatedSearch");
            const searchClauses = [
              `title.ilike.%${term}%`,
              `description.ilike.%${term}%`,
              `priority.ilike.%${term}%`,
              `type.ilike.%${term}%`,
              `status.ilike.%${term}%`,
              ...workOrderRelatedSearch.assetIds.length ? [`asset_id.in.(${workOrderRelatedSearch.assetIds.join(",")})`] : [],
              ...workOrderRelatedSearch.procedureIds.length ? [`procedure_template_id.in.(${workOrderRelatedSearch.procedureIds.join(",")})`] : [],
              ...workOrderRelatedSearch.workOrderIds.length ? [`id.in.(${workOrderRelatedSearch.workOrderIds.join(",")})`] : []
            ];
            nextQuery = nextQuery.or(searchClauses.join(","));
          }
        }
        return nextQuery;
      }
      function applyWorkOrderQueueFilters(query, section) {
        if (section === "mywork") {
          return state("myWorkFilter") === "created" ? query.eq("created_by", state("session").user.id) : query.eq("assigned_to", state("session").user.id);
        }
        if (section !== "work") return query;
        if (state("workOrderAssigneeFilter")) return query.eq("assigned_to", state("workOrderAssigneeFilter"));
        if (state("workOrderFilter") === "assigned") return query.not("assigned_to", "is", null);
        if (state("workOrderFilter") === "vendor") return query.ilike("description", `%${deps.OUTSIDE_VENDOR_NOTE}%`);
        if (state("workOrderFilter") === "unassigned") {
          return query.is("assigned_to", null).not("description", "ilike", `%${deps.OUTSIDE_VENDOR_NOTE}%`);
        }
        return query;
      }
      function applyWorkOrderStatusFilter(query, statusFilter) {
        const today = deps.isoDate(deps.startOfToday());
        if (statusFilter === "__any__") return query;
        if (statusFilter === "__none__") return query.eq("id", "00000000-0000-0000-0000-000000000000");
        if (statusFilter === "overdue") return query.neq("status", "completed").lt("due_at", today);
        if (statusFilter === "completed_month") return query.gte("completed_at", deps.isoDateTime(deps.monthStartDate()));
        if (statusFilter === "completed_week") return query.gte("completed_at", deps.isoDateTime(deps.daysAgoDate(7)));
        if (statusFilter === "active" || statusFilter === "all") return query.neq("status", "completed");
        return query.eq("status", statusFilter);
      }
      function applyWorkOrderSort(query) {
        if (["completed", "completed_month", "completed_week"].includes(state("activeStatusFilter"))) {
          return query.order("completed_at", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
        }
        if (state("workSort") === "due") {
          return query.order("due_at", { ascending: true, nullsFirst: false }).order("created_at", { ascending: false });
        }
        if (state("workSort") === "priority") {
          return query.order("priority", { ascending: true }).order("due_at", { ascending: true, nullsFirst: false }).order("created_at", { ascending: false });
        }
        if (state("workSort") === "assigned") {
          return query.order("assigned_to", { ascending: true, nullsFirst: false }).order("created_at", { ascending: false });
        }
        return query.order("created_at", { ascending: false });
      }
      return {
        applyWorkOrderListFilters,
        applyWorkOrderFilters,
        applyWorkOrderQueueFilters,
        applyWorkOrderStatusFilter,
        applyWorkOrderSort
      };
    }
    window.MaintainOpsWorkOrderQueryFilters = {
      createWorkOrderQueryFilterHelpers
    };
  })();

  // src/utils/workSectionJumpEvents.js
  (function() {
    function bindWorkSectionJumpEvents(options = {}) {
      const doc = options.documentRef || document;
      const setTimeoutFn = options.setTimeoutFn || setTimeout;
      doc.querySelectorAll("[data-jump-work-section]").forEach((button) => {
        button.addEventListener("click", () => {
          const target = doc.querySelector(`#${button.dataset.jumpWorkSection}`);
          if (!target) return;
          const detailSection = target.closest("details");
          if (detailSection) detailSection.open = true;
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          const highlightTarget = target;
          highlightTarget.classList.add("jump-highlight", "field-jump-highlight");
          setTimeoutFn(() => highlightTarget.classList.remove("jump-highlight"), 1400);
          setTimeoutFn(() => highlightTarget.classList.remove("field-jump-highlight"), 1400);
        });
      });
    }
    window.MaintainOpsWorkSectionJumpEvents = {
      bindWorkSectionJumpEvents
    };
  })();

  // src/utils/globalSearchNavigationEvents.js
  (function() {
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
      bindGlobalSearchNavigationEvents
    };
  })();

  // src/utils/workspaceSearchEvents.js
  (function() {
    function bindWorkspaceSearchEvents(options = {}) {
      const doc = options.documentRef || document;
      const storage = options.storage || localStorage;
      const state = options.state;
      if (!state) return;
      const restoreSearchFocus = (inputId) => {
        const nextSearchInput = doc.getElementById ? doc.getElementById(inputId) : doc.querySelector(`#${inputId}`);
        if (!nextSearchInput) return;
        nextSearchInput.focus();
        nextSearchInput.setSelectionRange(state.getSearchQuery().length, state.getSearchQuery().length);
      };
      doc.querySelectorAll(".workspace-search-input").forEach((searchInput) => {
        searchInput.addEventListener("input", async () => {
          const activeSearchId = searchInput.id;
          state.setSearchQuery(searchInput.value);
          options.invalidateExactWorkOrderSearchCache();
          if (!state.getSearchQuery().trim()) options.setWorkOrderSearchMode(false);
          if (state.getSearchQuery().trim()) {
            state.setActiveWorkOrderId(null);
            state.setActiveAssetId(null);
            state.setActivePartId(null);
            state.setQuickFixMode(false);
            state.setCreateWorkOrderMode(false);
            state.setQuickFixAssetId(null);
            state.setQuickFixRequestId(null);
          }
          storage.setItem("maintainops.searchQuery", state.getSearchQuery());
          options.resetWorkOrderPage();
          options.resetPartsPage();
          options.resetRequestsPage();
          await options.reloadWorkOrderQueue();
          await options.reloadRequestQueue();
          restoreSearchFocus(activeSearchId);
        });
      });
      doc.querySelectorAll("[data-view-work-search]").forEach((button) => {
        button.addEventListener("click", async () => {
          state.setActiveSection("work");
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setActivePartId(null);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixMode(false);
          options.setWorkOrderSearchMode(true);
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          storage.setItem("maintainops.activeSection", state.getActiveSection());
          await options.reloadWorkOrderQueue();
        });
      });
      doc.querySelectorAll("[data-close-work-search]").forEach((button) => {
        button.addEventListener("click", async () => {
          options.setWorkOrderSearchMode(false);
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    }
    window.MaintainOpsWorkspaceSearchEvents = {
      bindWorkspaceSearchEvents
    };
  })();

  // src/utils/workspaceFilterPaginationEvents.js
  (function() {
    function bindWorkspaceFilterPaginationEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      const win = options.windowRef || (typeof window !== "undefined" ? window : null);
      if (!state) return;
      function restoreScroll(top) {
        if (!win || typeof win.scrollTo !== "function") return;
        win.scrollTo({ top, behavior: "auto" });
      }
      async function preserveScroll(action) {
        const top = Number(win?.scrollY ?? win?.pageYOffset ?? 0);
        await action();
        if (!win || typeof win.scrollTo !== "function") return;
        if (typeof win.requestAnimationFrame === "function") {
          win.requestAnimationFrame(() => restoreScroll(top));
          return;
        }
        restoreScroll(top);
      }
      doc.querySelectorAll("[data-status-filter]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setActiveStatusFilter(button.dataset.statusFilter);
            options.resetWorkOrderPage();
            if (state.getActiveStatusFilter() === "requests") {
              options.resetRequestsPage();
            }
            await options.reloadWorkOrderQueue();
            if (state.getActiveStatusFilter() === "requests") await options.reloadRequestQueue();
          });
        });
      });
      doc.querySelectorAll("[data-my-work-filter]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setMyWorkFilter(button.dataset.myWorkFilter);
            options.resetWorkOrderPage();
            await options.reloadWorkOrderQueue();
          });
        });
      });
      doc.querySelectorAll("[data-work-order-filter]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setWorkOrderFilter(button.dataset.workOrderFilter);
            state.setWorkOrderAssigneeFilter("");
            options.resetWorkOrderPage();
            await options.reloadWorkOrderQueue();
          });
        });
      });
      doc.querySelectorAll("[data-clear-assignee-filter]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setWorkOrderAssigneeFilter("");
            options.resetWorkOrderPage();
            await options.reloadWorkOrderQueue();
          });
        });
      });
      doc.querySelectorAll("[data-work-sort]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setWorkSort(button.dataset.workSort);
            options.invalidateExactWorkOrderSearchCache();
            options.resetWorkOrderPage();
            await options.reloadWorkOrderQueue();
          });
        });
      });
      doc.querySelectorAll("[data-work-assignee-sort-filter]").forEach((field) => {
        field.addEventListener("change", async () => {
          await preserveScroll(async () => {
            state.setWorkOrderAssigneeFilter(field.value || "");
            options.invalidateExactWorkOrderSearchCache();
            options.resetWorkOrderPage();
            await options.reloadWorkOrderQueue();
          });
        });
      });
      doc.querySelectorAll("[data-request-filter]").forEach((button) => {
        button.addEventListener("click", async () => {
          if (button.disabled) return;
          await preserveScroll(async () => {
            state.setRequestViewFilter(button.dataset.requestFilter || "active");
            options.resetRequestsPage();
            await options.reloadRequestQueue();
          });
        });
      });
      doc.querySelectorAll("[data-work-page]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setWorkOrderPage(state.getWorkOrderPage() + (button.dataset.workPage === "next" ? 1 : -1));
            await options.reloadWorkOrderQueue();
          });
        });
      });
      doc.querySelectorAll("[data-parts-page]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setPartsPage(state.getPartsPage() + (button.dataset.partsPage === "next" ? 1 : -1));
            options.renderWorkspace();
          });
        });
      });
      doc.querySelectorAll("[data-assets-page]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setAssetsPage(state.getAssetsPage() + (button.dataset.assetsPage === "next" ? 1 : -1));
            options.renderWorkspace();
          });
        });
      });
      doc.querySelectorAll("[data-financial-page]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            state.setFinancialPage(state.getFinancialPage() + (button.dataset.financialPage === "next" ? 1 : -1));
            options.renderWorkspace();
          });
        });
      });
      doc.querySelectorAll("[data-financial-filter]").forEach((field) => {
        field.addEventListener("change", async () => {
          await preserveScroll(async () => {
            if (field.dataset.financialFilter === "missing") state.setFinancialMissingFilter(field.value);
            if (field.dataset.financialFilter === "location") state.setFinancialLocationFilter(field.value);
            if (field.dataset.financialFilter === "type") state.setFinancialTypeFilter(field.value);
            if (field.dataset.financialFilter === "area") state.setFinancialAreaFilter(field.value);
            state.resetFinancialPage();
            options.renderWorkspace();
          });
        });
      });
      doc.querySelectorAll("[data-list-page]").forEach((button) => {
        button.addEventListener("click", async () => {
          await preserveScroll(async () => {
            const delta = button.dataset.pageDirection === "next" ? 1 : -1;
            if (button.dataset.listPage === "requests") {
              state.setRequestsPage(state.getRequestsPage() + delta);
              await options.reloadRequestQueue();
              return;
            }
            if (button.dataset.listPage === "schedules") {
              state.setSchedulesPage(state.getSchedulesPage() + delta);
            }
            if (button.dataset.listPage === "procedures") {
              state.setProceduresPage(state.getProceduresPage() + delta);
            }
            if (button.dataset.listPage === "members") {
              state.setMembersPage(state.getMembersPage() + delta);
            }
            if (button.dataset.listPage === "messages") {
              state.setMessageThreadsPage(state.getMessageThreadsPage() + delta);
            }
            if (button.dataset.listPage?.startsWith("planning-")) {
              const planningKind = button.dataset.listPage.replace("planning-", "");
              state.setPlanningPage(planningKind, state.getPlanningPage(planningKind) + delta);
            }
            options.renderWorkspace();
          });
        });
      });
    }
    window.MaintainOpsWorkspaceFilterPaginationEvents = {
      bindWorkspaceFilterPaginationEvents
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workspaceFinancialNavigationEvents = __toESM(require_workspaceFinancialNavigationEvents());

  // src/utils/workspaceDetailNavigationEvents.js
  (function() {
    function bindWorkspaceDetailNavigationEvents(options = {}) {
      const doc = options.documentRef || document;
      const storage = options.storage || localStorage;
      const state = options.state;
      const win = options.windowRef || (typeof window !== "undefined" ? window : null);
      const scrollToDetailTop = typeof options.scrollToDetailTop === "function" ? options.scrollToDetailTop : () => {
      };
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
      function renderWorkspaceWithoutScrollControl() {
        options.renderWorkspace();
      }
      function closeAssetHistoryScreen() {
        if (typeof options.setActiveAssetHistoryId === "function") options.setActiveAssetHistoryId(null);
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
          closeAssetHistoryScreen();
          resetWorkCreationState();
          options.renderWorkspace();
        });
      }
      const backToEquipment = doc.querySelector("#back-to-equipment");
      if (backToEquipment) {
        backToEquipment.addEventListener("click", () => {
          state.setActiveAssetId(null);
          closeAssetHistoryScreen();
          state.setPendingDeleteAssetId(null);
          options.renderWorkspace();
        });
      }
      doc.querySelectorAll(".work-card").forEach((card) => {
        card.addEventListener("click", () => {
          state.setActiveWorkOrderId(card.dataset.id);
          state.setActiveAssetId(null);
          closeAssetHistoryScreen();
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
          closeAssetHistoryScreen();
          state.setActiveSection("work");
          resetWorkCreationState();
          storage.setItem("maintainops.activeSection", state.getActiveSection());
          options.renderWorkspace();
          queueWorkPhotoScroll();
        });
      });
      doc.querySelectorAll("[data-open-asset]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          state.setActiveAssetId(button.dataset.openAsset);
          state.setActiveWorkOrderId(null);
          closeAssetHistoryScreen();
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
          closeAssetHistoryScreen();
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
          closeAssetHistoryScreen();
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
          renderWorkspaceWithoutScrollControl();
        });
      });
      doc.querySelectorAll("[data-asset-relation-page]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const assetId = button.dataset.assetId;
          const section = button.dataset.assetRelationSection;
          const currentPage = typeof options.getAssetRelationshipPage === "function" ? options.getAssetRelationshipPage(assetId, section) : 1;
          const nextPage = currentPage + (button.dataset.assetRelationPage === "next" ? 1 : -1);
          if (typeof options.setAssetRelationshipPage === "function") {
            options.setAssetRelationshipPage(assetId, section, nextPage);
          }
          renderWorkspaceWithoutScrollControl();
        });
      });
      doc.querySelectorAll("[data-open-asset-history]").forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();
          const assetId = button.dataset.openAssetHistory;
          if (!assetId) return;
          state.setActiveAssetId(assetId);
          state.setActiveWorkOrderId(null);
          resetWorkCreationState();
          if (typeof options.setActiveAssetHistoryId === "function") options.setActiveAssetHistoryId(assetId);
          await loadAssetEventHistory(assetId);
          options.renderWorkspace();
          scrollToDetailTop();
        });
      });
      doc.querySelectorAll("[data-back-asset-history]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const assetId = button.dataset.backAssetHistory;
          if (assetId) state.setActiveAssetId(assetId);
          closeAssetHistoryScreen();
          options.renderWorkspace();
          scrollToDetailTop();
        });
      });
      doc.querySelectorAll("[data-asset-history-page]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const assetId = button.dataset.assetId;
          const currentPage = typeof options.getAssetRelationshipPage === "function" ? options.getAssetRelationshipPage(assetId, "asset-history") : 1;
          const nextPage = currentPage + (button.dataset.assetHistoryPage === "next" ? 1 : -1);
          if (typeof options.setAssetRelationshipPage === "function") {
            options.setAssetRelationshipPage(assetId, "asset-history", nextPage);
          }
          options.renderWorkspace();
          scrollToDetailTop();
        });
      });
    }
    window.MaintainOpsWorkspaceDetailNavigationEvents = {
      bindWorkspaceDetailNavigationEvents
    };
  })();

  // src/utils/workspaceInventoryFilterEvents.js
  (function() {
    function bindWorkspaceInventoryFilterEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      const win = options.windowRef || (typeof window !== "undefined" ? window : null);
      if (!state) return;
      function restoreScroll(top) {
        if (!win || typeof win.scrollTo !== "function") return;
        win.scrollTo({ top, behavior: "auto" });
      }
      function renderWorkspacePreservingScroll() {
        const top = Number(win?.scrollY ?? win?.pageYOffset ?? 0);
        options.renderWorkspace();
        if (!win || typeof win.scrollTo !== "function") return;
        if (typeof win.requestAnimationFrame === "function") {
          win.requestAnimationFrame(() => restoreScroll(top));
          return;
        }
        restoreScroll(top);
      }
      doc.querySelectorAll("[data-part-inventory-filter]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setPartInventoryFilter(button.dataset.partInventoryFilter);
          options.resetPartsPage();
          renderWorkspacePreservingScroll();
        });
      });
      doc.querySelectorAll("[data-part-sort]").forEach((select) => {
        select.addEventListener("change", () => {
          if (!state.setPartSort) return;
          state.setPartSort(select.value || "default");
          options.resetPartsPage();
          renderWorkspacePreservingScroll();
        });
      });
      doc.querySelectorAll("[data-asset-status-filter]").forEach((button) => {
        button.addEventListener("click", () => {
          const nextFilter = state.getAssetStatusFilter() === button.dataset.assetStatusFilter ? "all" : button.dataset.assetStatusFilter;
          state.setAssetStatusFilter(nextFilter);
          if (state.setAssetTypeFilter) state.setAssetTypeFilter("all");
          options.resetAssetsPage();
          renderWorkspacePreservingScroll();
        });
      });
      doc.querySelectorAll("[data-asset-type-filter]").forEach((button) => {
        button.addEventListener("click", () => {
          if (!state.getAssetTypeFilter || !state.setAssetTypeFilter) return;
          const nextFilter = state.getAssetTypeFilter() === button.dataset.assetTypeFilter ? "all" : button.dataset.assetTypeFilter;
          state.setAssetTypeFilter(nextFilter);
          if (state.setAssetStatusFilter) state.setAssetStatusFilter("all");
          options.resetAssetsPage();
          renderWorkspacePreservingScroll();
        });
      });
      doc.querySelectorAll("[data-asset-area-filter]").forEach((select) => {
        select.addEventListener("change", () => {
          if (!state.setAssetAreaFilter) return;
          state.setAssetAreaFilter(select.value || "all");
          options.resetAssetsPage();
          renderWorkspacePreservingScroll();
        });
      });
    }
    window.MaintainOpsWorkspaceInventoryFilterEvents = {
      bindWorkspaceInventoryFilterEvents
    };
  })();

  // src/utils/workspaceWorkOrderStatusEvents.js
  (function() {
    function bindWorkspaceWorkOrderStatusEvents(options = {}) {
      const doc = options.documentRef || document;
      doc.querySelectorAll("[data-quick-status]").forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.stopPropagation();
          const originalText = button.textContent;
          button.disabled = true;
          button.textContent = "Saving...";
          try {
            const saved = await options.setWorkOrderStatus(button.dataset.id, button.dataset.quickStatus);
            if (!saved && button.isConnected) {
              button.disabled = false;
              button.textContent = originalText;
            }
          } catch (error) {
            options.showNotice(`Could not update status: ${error.message || error}`, "warning");
            if (button.isConnected) {
              button.disabled = false;
              button.textContent = originalText;
            }
          }
          if (button.isConnected) {
            button.disabled = false;
            button.textContent = originalText;
          }
        });
      });
    }
    window.MaintainOpsWorkspaceWorkOrderStatusEvents = {
      bindWorkspaceWorkOrderStatusEvents
    };
  })();

  // src/utils/workspaceWorkOrderAssignmentEvents.js
  (function() {
    function bindWorkspaceWorkOrderAssignmentEvents(options = {}) {
      const doc = options.documentRef || document;
      doc.querySelectorAll("[data-assign-me]").forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.stopPropagation();
          await options.assignWorkOrderToMe(button.dataset.assignMe);
        });
      });
      doc.querySelectorAll("[data-card-assign]").forEach((form) => {
        form.addEventListener("submit", options.assignWorkOrderFromCard);
        form.addEventListener("click", (event) => event.stopPropagation());
        form.addEventListener("change", (event) => {
          event.stopPropagation();
          if (event.target?.name === "assigned_to") form.requestSubmit();
        });
      });
    }
    window.MaintainOpsWorkspaceWorkOrderAssignmentEvents = {
      bindWorkspaceWorkOrderAssignmentEvents
    };
  })();

  // src/utils/workspaceWorkOrderDowntimeEvents.js
  (function() {
    function bindWorkspaceWorkOrderDowntimeEvents(options = {}) {
      const doc = options.documentRef || document;
      const resetDelayMs = options.resetDelayMs || 1600;
      const scheduleReset = options.setTimeoutRef || setTimeout;
      doc.querySelectorAll("[data-copy-downtime]").forEach((button) => {
        button.addEventListener("click", async () => {
          const workOrder = options.getWorkOrderById(button.dataset.id);
          if (!workOrder) return;
          const isSubject = button.dataset.copyDowntime === "subject";
          const text = isSubject ? options.downtimeEmailSubject(workOrder) : options.downtimeEmailBody(workOrder);
          const copied = await options.copyTextToClipboard(text);
          button.textContent = copied ? "Copied" : "Copy failed";
          scheduleReset(() => {
            button.textContent = isSubject ? "Copy Subject" : "Copy Email Body";
          }, resetDelayMs);
        });
      });
    }
    window.MaintainOpsWorkspaceWorkOrderDowntimeEvents = {
      bindWorkspaceWorkOrderDowntimeEvents
    };
  })();

  // src/utils/workspaceWorkOrderDetailStatusEvents.js
  (function() {
    function bindWorkspaceWorkOrderDetailStatusEvents(options = {}) {
      const doc = options.documentRef || document;
      const statusSelect = doc.querySelector("#status-select");
      if (statusSelect) statusSelect.addEventListener("change", options.updateWorkOrderStatus);
    }
    window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents = {
      bindWorkspaceWorkOrderDetailStatusEvents
    };
  })();

  // src/utils/workspaceWorkOrderCompletionEvents.js
  (function() {
    function createWorkspaceWorkOrderCompletionEvents(options = {}) {
      const doc = options.documentRef || document;
      const FormDataRef = options.FormDataRef || FormData;
      function currentSafetyCheckboxCheckedForWorkOrder(id) {
        if (options.getActiveWorkOrderId() !== id) return false;
        return Array.from(doc.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some((field) => field.checked);
      }
      function syncSafetyDeviceChecks(event) {
        doc.querySelectorAll('input[name="safety_devices_checked"]').forEach((field) => {
          field.checked = event.target.checked;
        });
      }
      async function completeWorkOrder(event) {
        event.preventDefault();
        const formElement = event.target;
        const submitButton = formElement.querySelector("button[type='submit']");
        const errorTarget = doc.querySelector("#completion-error");
        const activeWorkOrderId = options.getActiveWorkOrderId();
        const workOrder = options.getWorkOrderById(activeWorkOrderId);
        const procedure = options.getProcedureById(workOrder?.procedure_template_id);
        const requiredProgress = procedure ? options.requiredChecklistProgress(workOrder, procedure) : { done: 0, total: 0 };
        if (requiredProgress.done < requiredProgress.total) {
          if (errorTarget) errorTarget.textContent = `Complete required checklist steps first (${requiredProgress.done}/${requiredProgress.total}).`;
          return;
        }
        const form = new FormDataRef(formElement);
        const safetyChecked = form.get("safety_devices_checked") === "on" || currentSafetyCheckboxCheckedForWorkOrder(activeWorkOrderId) || options.hasCompletedSafetyDeviceCheck(workOrder);
        if (options.requiresSafetyDeviceCheck(workOrder) && !safetyChecked) {
          if (errorTarget) errorTarget.textContent = "Check safety devices before completing equipment work.";
          return;
        }
        submitButton.disabled = true;
        submitButton.textContent = "Completing...";
        if (errorTarget) errorTarget.textContent = "";
        try {
          const payload = {
            status: "completed",
            asset_id: workOrder?.asset_id || null,
            actual_minutes: Number(form.get("actual_minutes")) || 0,
            failure_cause: form.get("failure_cause") || null,
            resolution_summary: form.get("resolution_summary") || null,
            follow_up_needed: form.get("follow_up_needed") === "on",
            completion_notes: form.get("completion_notes") || null,
            completed_at: (/* @__PURE__ */ new Date()).toISOString()
          };
          options.applySafetyRequirementPayload(payload);
          options.applySafetyCheckPayload(payload, payload.safety_check_required && safetyChecked);
          delete payload.asset_id;
          const { error } = await options.withOperationTimeout(
            options.updateWorkOrderSafely(payload, activeWorkOrderId),
            "Complete work save timed out. Check your connection and try again.",
            2e4
          );
          if (error) {
            if (errorTarget) errorTarget.textContent = `Could not complete work order: ${options.friendlyWorkOrderSaveError(error)}`;
            return;
          }
          const logError = await options.withOperationTimeout(
            options.recordWorkOrderEvent(activeWorkOrderId, "completed", form.get("resolution_summary") || form.get("completion_notes") || "Work order completed."),
            "Activity log timed out.",
            8e3
          ).catch((error2) => error2);
          options.setWorkOrderActionWarning("", "");
          options.showNotice(logError ? `Work order completed, but history did not update: ${logError.message}` : "Work order completed.", logError ? "warning" : "success");
          await options.render();
        } catch (error) {
          if (errorTarget) errorTarget.textContent = `Could not complete work order: ${error.message || error}`;
          else options.alertRef(error.message || error);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = "Complete Work Order";
        }
      }
      function bindWorkspaceWorkOrderCompletionEvents() {
        const completionForm = doc.querySelector("#complete-work-order-form");
        if (completionForm) completionForm.addEventListener("submit", completeWorkOrder);
        doc.querySelectorAll('input[name="safety_devices_checked"]').forEach((field) => {
          field.addEventListener("change", syncSafetyDeviceChecks);
        });
      }
      return {
        bindWorkspaceWorkOrderCompletionEvents,
        completeWorkOrder,
        currentSafetyCheckboxCheckedForWorkOrder,
        syncSafetyDeviceChecks
      };
    }
    window.MaintainOpsWorkspaceWorkOrderCompletionEvents = {
      createWorkspaceWorkOrderCompletionEvents
    };
  })();

  // src/utils/workspaceWorkOrderDeleteEvents.js
  (function() {
    function createWorkspaceWorkOrderDeleteEvents(options = {}) {
      const doc = options.documentRef || document;
      function requestDeleteWorkOrder(id) {
        if (!options.canDeleteWorkOrders()) {
          options.alertRef("Only company admins can delete work orders.");
          return;
        }
        options.setPendingDeleteWorkOrderId(id);
        options.renderWorkspace();
      }
      async function deleteWorkOrder(id) {
        if (!options.canDeleteWorkOrders()) {
          options.alertRef("Only company admins can delete work orders.");
          return;
        }
        try {
          const photoPaths = options.getPhotoPathsByWorkOrder(id);
          if (photoPaths.length) {
            const storageDelete = await options.withOperationTimeout(
              options.removeWorkOrderPhotoStorage(photoPaths),
              "Work order photo cleanup timed out.",
              15e3
            );
            if (storageDelete.error) {
              options.warnRef("Work order photo storage cleanup failed", storageDelete.error);
            }
          }
          const { error } = await options.withOperationTimeout(
            options.deleteWorkOrderRecord(id),
            "Work order delete timed out. Check your connection and try again.",
            15e3
          );
          if (error) {
            options.alertRef(`Could not delete work order: ${options.friendlyWorkOrderSaveError(error)}`);
            return;
          }
          options.setActiveWorkOrderId(null);
          options.setActiveAssetId(null);
          options.setPendingDeleteWorkOrderId(null);
          options.showNotice("Work order deleted.");
          await options.render();
        } catch (error) {
          options.alertRef(`Could not delete work order: ${error.message || error}`);
        }
      }
      function bindWorkspaceWorkOrderDeleteEvents() {
        doc.querySelectorAll("[data-delete-work-order]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            requestDeleteWorkOrder(button.dataset.deleteWorkOrder);
          });
        });
        doc.querySelectorAll("[data-cancel-delete-work-order]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            options.setPendingDeleteWorkOrderId(null);
            options.renderWorkspace();
          });
        });
        doc.querySelectorAll("[data-confirm-delete-work-order]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            event.stopPropagation();
            await deleteWorkOrder(button.dataset.confirmDeleteWorkOrder);
          });
        });
      }
      return {
        bindWorkspaceWorkOrderDeleteEvents,
        deleteWorkOrder,
        requestDeleteWorkOrder
      };
    }
    window.MaintainOpsWorkspaceWorkOrderDeleteEvents = {
      createWorkspaceWorkOrderDeleteEvents
    };
  })();

  // src/utils/workspaceTeamWorkViewEvents.js
  (function() {
    function bindWorkspaceTeamWorkViewEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state) return;
      doc.querySelectorAll("[data-view-member-work]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setWorkOrderAssigneeFilter(button.dataset.viewMemberWork);
          state.setActiveSection("work");
          state.setActiveStatusFilter("active");
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixMode(false);
          options.resetWorkOrderPage();
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspaceTeamWorkViewEvents = {
      bindWorkspaceTeamWorkViewEvents
    };
  })();

  // src/utils/workspacePartDetailEvents.js
  (function() {
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
      bindWorkspacePartDetailEvents
    };
  })();

  // src/utils/workspaceMessageUiEvents.js
  (function() {
    function bindWorkspaceMessageUiEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      const renderWorkspace = options.renderWorkspace;
      const messageComposerScopeNote = options.messageComposerScopeNote;
      const autoGrowTextarea = options.autoGrowTextarea;
      if (!state || typeof renderWorkspace !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll("[data-message-filter]").forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.dataset.messageFilter;
          state.setMessageThreadFilter(value);
          if (typeof state.resetMessageThreadsPage === "function") state.resetMessageThreadsPage();
          storage.setItem("maintainops.messageThreadFilter", value);
          storage.setItem("maintainops.messageThreadsPage", "1");
          renderWorkspace();
        });
      });
      doc.querySelectorAll("[data-open-linked-work-order]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setActiveWorkOrderId(button.dataset.openLinkedWorkOrder);
          state.setActiveAssetId(null);
          state.setActivePartId(null);
          state.setQuickFixMode(false);
          state.setCreateWorkOrderMode(false);
          state.setActiveSection("work");
          storage.setItem("maintainops.activeSection", "work");
          renderWorkspace();
        });
      });
      const clearMessageWorkLink = doc.querySelector("[data-clear-message-work-link]");
      if (clearMessageWorkLink) {
        clearMessageWorkLink.addEventListener("click", () => {
          state.setMessageComposerWorkOrderId("");
          storage.setItem("maintainops.messageComposerWorkOrderId", "");
          renderWorkspace();
        });
      }
      const messageSearch = doc.querySelector("#message-search");
      if (messageSearch) {
        messageSearch.addEventListener("input", () => {
          const value = messageSearch.value;
          state.setMessageSearchQuery(value);
          if (typeof state.resetMessageThreadsPage === "function") state.resetMessageThreadsPage();
          storage.setItem("maintainops.messageSearchQuery", value);
          storage.setItem("maintainops.messageThreadsPage", "1");
          renderWorkspace();
          const nextSearch = doc.querySelector("#message-search");
          if (!nextSearch) return;
          nextSearch.focus();
          nextSearch.setSelectionRange(value.length, value.length);
        });
      }
      const messageThreadForm = doc.querySelector("#message-thread-form");
      if (messageThreadForm) {
        const typeSelect = messageThreadForm.querySelector("#message-thread-type");
        const directField = messageThreadForm.querySelector(".message-direct-field");
        const scopeNote = messageThreadForm.querySelector("#message-scope-note");
        if (typeSelect && directField && scopeNote && typeof messageComposerScopeNote === "function") {
          const syncMessageComposer = () => {
            const isDirect = typeSelect.value === "direct";
            directField.classList.toggle("hidden-section", !isDirect);
            const directSelect = directField.querySelector("select");
            if (directSelect) directSelect.disabled = !isDirect;
            scopeNote.textContent = messageComposerScopeNote(typeSelect.value);
          };
          typeSelect.addEventListener("change", syncMessageComposer);
          syncMessageComposer();
        }
      }
      doc.querySelectorAll("[data-message-person]").forEach((button) => {
        button.addEventListener("click", () => {
          const form = doc.querySelector("#message-thread-form");
          if (!form) return;
          const details = form.querySelector("details");
          const typeSelect = form.querySelector("#message-thread-type");
          const directSelect = form.querySelector("select[name='direct_user_id']");
          const directField = form.querySelector(".message-direct-field");
          const scopeNote = form.querySelector("#message-scope-note");
          const subjectField = form.querySelector("input[name='title']");
          if (details) details.open = true;
          if (typeSelect) typeSelect.value = "direct";
          if (directSelect) {
            directSelect.value = button.dataset.messagePerson || "";
            directSelect.disabled = false;
          }
          if (directField) directField.classList.remove("hidden-section");
          if (scopeNote && typeof messageComposerScopeNote === "function") {
            scopeNote.textContent = messageComposerScopeNote("direct");
          }
          if (subjectField) subjectField.focus();
        });
      });
      doc.querySelectorAll("[data-quick-reply]").forEach((button) => {
        button.addEventListener("click", () => {
          const replyForm = doc.querySelector("#message-reply-form");
          const field = replyForm?.querySelector("textarea[name='body']");
          if (!field) return;
          const prefix = field.value.trim();
          field.value = prefix ? `${prefix}
${button.dataset.quickReply}` : button.dataset.quickReply;
          field.focus();
          if (typeof autoGrowTextarea === "function") autoGrowTextarea(field);
        });
      });
    }
    window.MaintainOpsWorkspaceMessageUiEvents = {
      bindWorkspaceMessageUiEvents
    };
  })();

  // src/utils/workspacePartSearchEvents.js
  (function() {
    function bindWorkspacePartSearchEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      const renderWorkspace = options.renderWorkspace;
      const resetPartsPage = options.resetPartsPage;
      if (!state || typeof renderWorkspace !== "function" || typeof resetPartsPage !== "function") return;
      const partSearchForm = doc.querySelector("#part-search-form");
      if (!partSearchForm) return;
      const persistSearch = (value) => {
        state.setPartSearchQuery(value || "");
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
      bindWorkspacePartSearchEvents
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workspaceManagerDashboardEvents = __toESM(require_workspaceManagerDashboardEvents());

  // src/utils/workspaceSectionNavigationEvents.js
  (function() {
    function bindWorkspaceSectionNavigationEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function") return;
      const storage = options.storage || localStorage;
      const scrollToSectionTop = typeof options.scrollToSectionTop === "function" ? options.scrollToSectionTop : () => {
      };
      doc.querySelectorAll("[data-section]").forEach((button) => {
        button.addEventListener("click", async () => {
          const nextSection = button.dataset.section;
          if (!options.visibleNavItems().some(([id]) => id === nextSection)) return;
          state.setActiveSection(nextSection);
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setActivePartId(null);
          state.setShowPartSourceManager(false);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixMode(false);
          state.setReportIssueMode(false);
          state.setQuickFixAssetId(null);
          state.setQuickFixRequestId(null);
          if (nextSection !== "work") options.setWorkOrderSearchMode(false);
          options.resetWorkOrderPage();
          storage.setItem("maintainops.activeSection", nextSection);
          options.renderWorkspace();
          scrollToSectionTop();
          if (nextSection === "work" || nextSection === "mywork") await options.reloadWorkOrderQueue();
          if (nextSection === "requests") await options.reloadRequestQueue();
          if (nextSection === "team" && typeof options.reloadTeamWorkloads === "function") {
            await options.reloadTeamWorkloads();
          }
          if (nextSection === "setup" && typeof options.loadSetupStorageDashboard === "function") {
            await options.loadSetupStorageDashboard();
            options.renderWorkspace();
          }
          if (nextSection === "manager" && typeof options.loadManagerDashboardCompletedWork === "function") {
            await options.loadManagerDashboardCompletedWork();
            options.renderWorkspace();
          }
          if (nextSection === "performance" && typeof options.loadPlatformPerformance === "function") {
            await options.loadPlatformPerformance();
          }
        });
      });
    }
    window.MaintainOpsWorkspaceSectionNavigationEvents = {
      bindWorkspaceSectionNavigationEvents
    };
  })();

  // src/utils/workspaceMessageThreadEvents.js
  (function() {
    function bindWorkspaceMessageThreadEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function" || typeof options.markMessageThreadRead !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll("[data-message-thread]").forEach((button) => {
        button.addEventListener("click", async () => {
          const threadId = button.dataset.messageThread;
          state.setActiveMessageThreadId(threadId);
          storage.setItem("maintainops.activeMessageThreadId", threadId);
          if (typeof options.loadActiveMessageThreadMessages === "function") await options.loadActiveMessageThreadMessages(threadId);
          await options.markMessageThreadRead(threadId);
          options.renderWorkspace();
        });
      });
      doc.querySelectorAll("[data-open-work-message-thread]").forEach((button) => {
        button.addEventListener("click", async () => {
          const threadId = button.dataset.openWorkMessageThread;
          state.setActiveMessageThreadId(threadId);
          state.setMessageComposerOpen(false);
          state.setActiveSection("messages");
          storage.setItem("maintainops.activeMessageThreadId", threadId);
          storage.setItem("maintainops.activeSection", "messages");
          if (typeof options.loadActiveMessageThreadMessages === "function") await options.loadActiveMessageThreadMessages(threadId);
          await options.markMessageThreadRead(threadId);
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspaceMessageThreadEvents = {
      bindWorkspaceMessageThreadEvents
    };
  })();

  // src/utils/workspaceIssueAdminUiEvents.js
  (function() {
    function bindWorkspaceIssueAdminUiEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll("[data-cancel-app-issue-report]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setReportIssueMode(false);
          options.renderWorkspace();
        });
      });
      doc.querySelectorAll("[data-setup-action]").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.setupAction !== "confirm-admin-delete-sql") return;
          state.setAdminDeleteSqlConfirmed(true);
          storage.setItem("maintainops.adminDeleteSqlConfirmed", "true");
          if (typeof options.showNotice === "function") options.showNotice("Admin delete SQL marked as applied.");
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspaceIssueAdminUiEvents = {
      bindWorkspaceIssueAdminUiEvents
    };
  })();

  // src/utils/workspacePartDeleteCancelEvents.js
  (function() {
    function bindWorkspacePartDeleteCancelEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (typeof options.requestDeletePart === "function") {
        doc.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach((button) => {
          button.addEventListener("click", () => {
            options.requestDeletePart(button.dataset.deletePart);
          });
        });
        doc.querySelectorAll("[data-delete-part].permanent-delete-button").forEach((button) => {
          button.addEventListener("click", () => {
            options.requestDeletePart(button.dataset.deletePart);
          });
        });
      }
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll("[data-cancel-delete-part]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setPendingDeletePartId(null);
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspacePartDeleteCancelEvents = {
      bindWorkspacePartDeleteCancelEvents
    };
  })();

  // src/utils/workspaceWorkMessageStartEvents.js
  (function() {
    function bindWorkspaceWorkMessageStartEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll("[data-start-work-message]").forEach((button) => {
        button.addEventListener("click", () => {
          const workOrderId = button.dataset.startWorkMessage;
          state.setMessageComposerWorkOrderId(workOrderId);
          state.setMessageComposerOpen(true);
          state.setActiveMessageThreadId("");
          state.setActiveSection("messages");
          storage.setItem("maintainops.messageComposerWorkOrderId", workOrderId);
          storage.setItem("maintainops.activeSection", "messages");
          storage.setItem("maintainops.activeMessageThreadId", "");
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspaceWorkMessageStartEvents = {
      bindWorkspaceWorkMessageStartEvents
    };
  })();

  // src/utils/workspaceReportIssueCommandEvents.js
  (function() {
    function bindWorkspaceReportIssueCommandEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll('[data-command-action="report-issue"]').forEach((button) => {
        button.addEventListener("click", () => {
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setActivePartId(null);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixMode(false);
          state.setReportIssueMode(true);
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspaceReportIssueCommandEvents = {
      bindWorkspaceReportIssueCommandEvents
    };
  })();

  // src/utils/workspaceSubmitRequestCommandEvents.js
  (function() {
    function bindWorkspaceSubmitRequestCommandEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.reloadRequestQueue !== "function" || typeof options.resetRequestsPage !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll('[data-command-action="request"]').forEach((button) => {
        button.addEventListener("click", async () => {
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixMode(false);
          state.setReportIssueMode(false);
          state.setQuickFixAssetId(null);
          state.setQuickFixRequestId(null);
          state.setActiveSection("requests");
          options.setWorkOrderSearchMode(false);
          storage.setItem("maintainops.activeSection", "requests");
          options.resetRequestsPage();
          await options.reloadRequestQueue();
        });
      });
    }
    window.MaintainOpsWorkspaceSubmitRequestCommandEvents = {
      bindWorkspaceSubmitRequestCommandEvents
    };
  })();

  // src/utils/workspaceNewWorkOrderCommandEvents.js
  (function() {
    function bindWorkspaceNewWorkOrderCommandEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll('[data-command-action="create-work-order"]').forEach((button) => {
        button.addEventListener("click", () => {
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setCreateWorkOrderMode(true);
          state.setQuickFixMode(false);
          state.setReportIssueMode(false);
          state.setQuickFixAssetId(null);
          state.setQuickFixRequestId(null);
          state.setActiveSection("work");
          options.setWorkOrderSearchMode(false);
          storage.setItem("maintainops.activeSection", "work");
          options.renderWorkspace();
        });
      });
    }
    window.MaintainOpsWorkspaceNewWorkOrderCommandEvents = {
      bindWorkspaceNewWorkOrderCommandEvents
    };
  })();

  // src/utils/workspaceExportCsvCommandEvents.js
  (function() {
    function bindWorkspaceExportCsvCommandEvents(options = {}) {
      const doc = options.documentRef || document;
      if (typeof options.exportActiveSectionCsv !== "function") return;
      doc.querySelectorAll('[data-command-action="export-csv"]').forEach((button) => {
        button.addEventListener("click", () => {
          options.exportActiveSectionCsv();
        });
      });
    }
    window.MaintainOpsWorkspaceExportCsvCommandEvents = {
      bindWorkspaceExportCsvCommandEvents
    };
  })();

  // src/bundles/runtime.entry.js
  var import_csvExport = __toESM(require_csvExport());

  // src/utils/workspaceAssetDeleteCancelEvents.js
  (function() {
    function bindWorkspaceAssetDeleteCancelEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (typeof options.requestDeleteAsset === "function") {
        doc.querySelectorAll("[data-delete-asset]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            if (event && typeof event.stopPropagation === "function") event.stopPropagation();
            await options.requestDeleteAsset(button.dataset.deleteAsset);
          });
        });
      }
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll("[data-cancel-delete-asset]").forEach((button) => {
        button.addEventListener("click", (event) => {
          if (event && typeof event.stopPropagation === "function") event.stopPropagation();
          state.setPendingDeleteAssetId(null);
          options.renderWorkspace();
        });
      });
      if (typeof options.deleteAsset === "function") {
        doc.querySelectorAll("[data-confirm-delete-asset]").forEach((button) => {
          button.addEventListener("click", async (event) => {
            if (event && typeof event.stopPropagation === "function") event.stopPropagation();
            await options.deleteAsset(button.dataset.confirmDeleteAsset);
          });
        });
      }
    }
    window.MaintainOpsWorkspaceAssetDeleteCancelEvents = {
      bindWorkspaceAssetDeleteCancelEvents
    };
  })();

  // src/utils/workspaceRequestDeleteCancelEvents.js
  (function() {
    function bindWorkspaceRequestDeleteCancelEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (typeof options.requestDeleteMaintenanceRequest === "function") {
        doc.querySelectorAll("[data-delete-request]").forEach((button) => {
          button.addEventListener("click", () => {
            options.requestDeleteMaintenanceRequest(button.dataset.deleteRequest);
          });
        });
      }
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll("[data-cancel-delete-request]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setPendingDeleteRequestId(null);
          options.renderWorkspace();
        });
      });
      if (typeof options.deleteMaintenanceRequest === "function") {
        doc.querySelectorAll("[data-confirm-delete-request]").forEach((button) => {
          button.addEventListener("click", () => {
            options.deleteMaintenanceRequest(button.dataset.confirmDeleteRequest);
          });
        });
      }
    }
    window.MaintainOpsWorkspaceRequestDeleteCancelEvents = {
      bindWorkspaceRequestDeleteCancelEvents
    };
  })();

  // src/utils/workspaceScheduleDeleteCancelEvents.js
  (function() {
    function bindWorkspaceScheduleDeleteCancelEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (typeof options.requestDeletePreventiveSchedule === "function") {
        doc.querySelectorAll("[data-delete-schedule]").forEach((button) => {
          button.addEventListener("click", () => {
            options.requestDeletePreventiveSchedule(button.dataset.deleteSchedule);
          });
        });
      }
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll("[data-cancel-delete-schedule]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setPendingDeleteScheduleId(null);
          options.renderWorkspace();
        });
      });
      if (typeof options.deletePreventiveSchedule === "function") {
        doc.querySelectorAll("[data-confirm-delete-schedule]").forEach((button) => {
          button.addEventListener("click", () => {
            options.deletePreventiveSchedule(button.dataset.confirmDeleteSchedule);
          });
        });
      }
    }
    window.MaintainOpsWorkspaceScheduleDeleteCancelEvents = {
      bindWorkspaceScheduleDeleteCancelEvents
    };
  })();

  // src/utils/workspaceProcedureDeleteCancelEvents.js
  (function() {
    function bindWorkspaceProcedureDeleteCancelEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (typeof options.requestDeleteProcedureTemplate === "function") {
        doc.querySelectorAll("[data-delete-procedure]").forEach((button) => {
          button.addEventListener("click", async () => {
            await options.requestDeleteProcedureTemplate(button.dataset.deleteProcedure);
          });
        });
      }
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll("[data-cancel-delete-procedure]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setPendingDeleteProcedureId(null);
          options.renderWorkspace();
        });
      });
      if (typeof options.deleteProcedureTemplate === "function") {
        doc.querySelectorAll("[data-confirm-delete-procedure]").forEach((button) => {
          button.addEventListener("click", async () => {
            await options.deleteProcedureTemplate(button.dataset.confirmDeleteProcedure);
          });
        });
      }
    }
    window.MaintainOpsWorkspaceProcedureDeleteCancelEvents = {
      bindWorkspaceProcedureDeleteCancelEvents
    };
  })();

  // src/utils/workspaceTextareaAutoGrow.js
  (function() {
    function autoGrowTextarea(field) {
      if (!field || !field.style) return;
      field.style.height = "auto";
      field.style.height = `${field.scrollHeight}px`;
    }
    function bindWorkspaceTextareaAutoGrow(options = {}) {
      const doc = options.documentRef || document;
      doc.querySelectorAll("textarea").forEach((field) => {
        autoGrowTextarea(field);
        field.addEventListener("input", () => autoGrowTextarea(field));
      });
    }
    window.MaintainOpsWorkspaceTextareaAutoGrow = {
      autoGrowTextarea,
      bindWorkspaceTextareaAutoGrow
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workspaceDatePickerControls = __toESM(require_workspaceDatePickerControls());

  // src/utils/workspaceTeamInviteCancelEvents.js
  (function() {
    function bindWorkspaceTeamInviteCancelEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      if (!state || typeof options.renderWorkspace !== "function") return;
      doc.querySelectorAll("[data-cancel-invite]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setTeamInviteCancelError("");
          state.setPendingCancelInviteId(button.dataset.cancelInvite);
          options.renderWorkspace();
        });
      });
      doc.querySelectorAll("[data-cancel-invite-cancel]").forEach((button) => {
        button.addEventListener("click", () => {
          state.setTeamInviteCancelError("");
          state.setPendingCancelInviteId(null);
          options.renderWorkspace();
        });
      });
      if (typeof options.cancelTeamInvite === "function") {
        doc.querySelectorAll("[data-confirm-cancel-invite]").forEach((button) => {
          button.addEventListener("click", () => {
            options.cancelTeamInvite(button.dataset.confirmCancelInvite);
          });
        });
      }
    }
    window.MaintainOpsWorkspaceTeamInviteCancelEvents = {
      bindWorkspaceTeamInviteCancelEvents
    };
  })();

  // src/utils/workspaceTeamInviteCopyEvents.js
  (function() {
    function bindWorkspaceTeamInviteCopyEvents(options = {}) {
      const doc = options.documentRef || document;
      const copyTextToClipboard = options.copyTextToClipboard;
      const setTimer = options.setTimeoutRef || setTimeout;
      const resetDelayMs = Number.isFinite(options.resetDelayMs) ? options.resetDelayMs : 1600;
      if (typeof copyTextToClipboard !== "function") return;
      doc.querySelectorAll("[data-copy-team-invite]").forEach((button) => {
        button.addEventListener("click", async () => {
          const copied = await copyTextToClipboard(button.dataset.copyTeamInvite || "");
          button.textContent = copied ? "Copied" : "Copy failed";
          setTimer(() => {
            button.textContent = "Copy Invite";
          }, resetDelayMs);
        });
      });
    }
    window.MaintainOpsWorkspaceTeamInviteCopyEvents = {
      bindWorkspaceTeamInviteCopyEvents
    };
  })();

  // src/utils/workspaceQuickFixCommandEvents.js
  (function() {
    function bindWorkspaceQuickFixCommandEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      const scrollToQuickFixForm = typeof options.scrollToQuickFixForm === "function" ? options.scrollToQuickFixForm : () => {
      };
      if (!state || typeof options.renderWorkspace !== "function") return;
      const storage = options.storage || localStorage;
      doc.querySelectorAll('[data-command-action="quick-fix"]').forEach((button) => {
        button.addEventListener("click", () => {
          state.setActiveWorkOrderId(null);
          state.setActiveAssetId(null);
          state.setCreateWorkOrderMode(false);
          state.setQuickFixMode(true);
          state.setReportIssueMode(false);
          state.setQuickFixAssetId(null);
          state.setQuickFixRequestId(null);
          state.setActiveSection("mywork");
          options.setWorkOrderSearchMode(false);
          storage.setItem("maintainops.activeSection", "mywork");
          options.renderWorkspace();
          scrollToQuickFixForm();
        });
      });
    }
    window.MaintainOpsWorkspaceQuickFixCommandEvents = {
      bindWorkspaceQuickFixCommandEvents
    };
  })();

  // src/utils/workspaceAssetQuickFixEvents.js
  (function() {
    function bindWorkspaceAssetQuickFixEvents(options = {}) {
      const doc = options.documentRef || document;
      const state = options.state;
      const scrollToQuickFixForm = typeof options.scrollToQuickFixForm === "function" ? options.scrollToQuickFixForm : () => {
      };
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
          scrollToQuickFixForm();
        });
      });
    }
    window.MaintainOpsWorkspaceAssetQuickFixEvents = {
      bindWorkspaceAssetQuickFixEvents
    };
  })();

  // src/bundles/runtime.entry.js
  var import_publicRequestTokens = __toESM(require_publicRequestTokens());

  // src/utils/workspacePublicRequestLinkCopyEvents.js
  (function() {
    function bindWorkspacePublicRequestLinkCopyEvents(options = {}) {
      const doc = options.documentRef || document;
      const copyTextToClipboard = options.copyTextToClipboard;
      const setTimer = options.setTimeoutRef || setTimeout;
      const resetDelayMs = Number.isFinite(options.resetDelayMs) ? options.resetDelayMs : 1600;
      if (typeof copyTextToClipboard !== "function") return;
      doc.querySelectorAll("[data-copy-public-request-link]").forEach((button) => {
        button.addEventListener("click", async () => {
          const copied = await copyTextToClipboard(button.dataset.copyPublicRequestLink);
          button.textContent = copied ? "Copied" : "Copy failed";
          setTimer(() => {
            button.textContent = "Copy QR Link";
          }, resetDelayMs);
        });
      });
    }
    window.MaintainOpsWorkspacePublicRequestLinkCopyEvents = {
      bindWorkspacePublicRequestLinkCopyEvents
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workspacePublicRequestLinkAdminEvents = __toESM(require_workspacePublicRequestLinkAdminEvents());

  // src/utils/workspaceRequestConversionEvents.js
  (function() {
    function bindWorkspaceRequestConversionEvents(options = {}) {
      const doc = options.documentRef || document;
      const convertRequestToWorkOrder = options.convertRequestToWorkOrder;
      if (typeof convertRequestToWorkOrder !== "function") return;
      doc.querySelectorAll("[data-convert-request]").forEach((button) => {
        button.addEventListener("click", () => {
          convertRequestToWorkOrder(button.dataset.convertRequest);
        });
      });
    }
    window.MaintainOpsWorkspaceRequestConversionEvents = {
      bindWorkspaceRequestConversionEvents
    };
  })();

  // src/utils/workspacePmGenerationEvents.js
  (function() {
    function bindWorkspacePmGenerationEvents(options = {}) {
      const doc = options.documentRef || document;
      const generatePreventiveWorkOrder = options.generatePreventiveWorkOrder;
      if (typeof generatePreventiveWorkOrder !== "function") return;
      doc.querySelectorAll("[data-generate-pm]").forEach((button) => {
        button.addEventListener("click", () => {
          generatePreventiveWorkOrder(button.dataset.generatePm);
        });
      });
    }
    window.MaintainOpsWorkspacePmGenerationEvents = {
      bindWorkspacePmGenerationEvents
    };
  })();

  // src/utils/workspaceFollowUpWorkEvents.js
  (function() {
    function bindWorkspaceFollowUpWorkEvents(options = {}) {
      const doc = options.documentRef || document;
      const createFollowUpWorkOrder = options.createFollowUpWorkOrder;
      if (typeof createFollowUpWorkOrder !== "function") return;
      doc.querySelectorAll("[data-create-follow-up]").forEach((button) => {
        button.addEventListener("click", () => {
          const container = button.closest?.("[data-follow-up-create]");
          const daysInput = container?.querySelector?.("[name='follow_up_days']");
          createFollowUpWorkOrder(button.dataset.createFollowUp, daysInput?.value);
        });
      });
    }
    window.MaintainOpsWorkspaceFollowUpWorkEvents = {
      bindWorkspaceFollowUpWorkEvents
    };
  })();

  // src/utils/workspaceCommentEvents.js
  (function() {
    function bindWorkspaceCommentEvents(options = {}) {
      const doc = options.documentRef || document;
      const createComment = options.createComment;
      const form = doc.querySelector("#comment-form");
      if (!form || typeof createComment !== "function") return;
      form.addEventListener("submit", createComment);
    }
    window.MaintainOpsWorkspaceCommentEvents = {
      bindWorkspaceCommentEvents
    };
  })();

  // src/utils/workspaceQuickUpdateEvents.js
  (function() {
    function bindWorkspaceQuickUpdateEvents(options = {}) {
      const doc = options.documentRef || document;
      const updateWorkOrderQuickView = options.updateWorkOrderQuickView;
      const form = doc.querySelector("#quick-update-work-order-form");
      if (!form || typeof updateWorkOrderQuickView !== "function") return;
      form.addEventListener("submit", updateWorkOrderQuickView);
    }
    window.MaintainOpsWorkspaceQuickUpdateEvents = {
      bindWorkspaceQuickUpdateEvents
    };
  })();

  // src/utils/workspaceWorkOrderEditEvents.js
  (function() {
    function bindWorkspaceWorkOrderEditEvents(options = {}) {
      const doc = options.documentRef || document;
      const updateWorkOrderDetails = options.updateWorkOrderDetails;
      const form = doc.querySelector("#edit-work-order-form");
      if (!form || typeof updateWorkOrderDetails !== "function") return;
      form.addEventListener("submit", updateWorkOrderDetails);
    }
    window.MaintainOpsWorkspaceWorkOrderEditEvents = {
      bindWorkspaceWorkOrderEditEvents
    };
  })();

  // src/utils/workspaceRequestQuickFixEvents.js
  (function() {
    function bindWorkspaceRequestQuickFixEvents(options = {}) {
      const doc = options.documentRef || document;
      const openQuickFixForRequest = options.openQuickFixForRequest;
      if (typeof openQuickFixForRequest !== "function") return;
      doc.querySelectorAll("[data-quick-fix-request]").forEach((button) => {
        button.addEventListener("click", () => openQuickFixForRequest(button.dataset.quickFixRequest));
      });
    }
    window.MaintainOpsWorkspaceRequestQuickFixEvents = {
      bindWorkspaceRequestQuickFixEvents
    };
  })();

  // src/utils/workspaceAssetLocationWarningEvents.js
  (function() {
    function bindWorkspaceAssetLocationWarningEvents(options = {}) {
      const doc = options.documentRef || document;
      const updateAssetLocationWarning = options.updateAssetLocationWarning;
      if (typeof updateAssetLocationWarning !== "function") return;
      doc.querySelectorAll("[data-location-sensitive-asset]").forEach((select) => {
        updateAssetLocationWarning(select);
        select.addEventListener("change", () => updateAssetLocationWarning(select));
      });
    }
    window.MaintainOpsWorkspaceAssetLocationWarningEvents = {
      bindWorkspaceAssetLocationWarningEvents
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workspaceEquipmentChoiceEvents = __toESM(require_workspaceEquipmentChoiceEvents());
  var import_quickFixWorkflow = __toESM(require_quickFixWorkflow());
  var import_messageWorkflow = __toESM(require_messageWorkflow());
  var import_preventiveMaintenanceWorkflow = __toESM(require_preventiveMaintenanceWorkflow());
  var import_procedureWorkflow = __toESM(require_procedureWorkflow());
  var import_teamWorkflow = __toESM(require_teamWorkflow());
  var import_companySettingsWorkflow = __toESM(require_companySettingsWorkflow());
  var import_appIssueWorkflow = __toESM(require_appIssueWorkflow());
  var import_publicRequestLinkWorkflow = __toESM(require_publicRequestLinkWorkflow());
  var import_partInventoryWorkflow = __toESM(require_partInventoryWorkflow());
  var import_workOrderQuickUpdateWorkflow = __toESM(require_workOrderQuickUpdateWorkflow());
  var import_assetWorkflow = __toESM(require_assetWorkflow());
  var import_requestLifecycleWorkflow = __toESM(require_requestLifecycleWorkflow());
  var import_workOrderCreationWorkflow = __toESM(require_workOrderCreationWorkflow());
  var import_workOrderDetailEditWorkflow = __toESM(require_workOrderDetailEditWorkflow());
  var import_partUsageWorkflow = __toESM(require_partUsageWorkflow());
  var import_mediaStorageWorkflow = __toESM(require_mediaStorageWorkflow());
  var import_companyLogoWorkflow = __toESM(require_companyLogoWorkflow());
  var import_assetFinancialWorkflow = __toESM(require_assetFinancialWorkflow());
  var import_partDeleteWorkflow = __toESM(require_partDeleteWorkflow());
  var import_procedureChecklistWorkflow = __toESM(require_procedureChecklistWorkflow());
  var import_publicRequestIntakeWorkflow = __toESM(require_publicRequestIntakeWorkflow());
  var import_companySetupWorkflow = __toESM(require_companySetupWorkflow());
  var import_workOrderStatusWorkflow = __toESM(require_workOrderStatusWorkflow());

  // src/utils/requestQueryFilters.js
  (function() {
    function createRequestQueryFilterHelpers(deps) {
      function state(name) {
        return deps[name]();
      }
      function applyRequestQueryFilters(query, filter = state("requestViewFilter")) {
        let nextQuery = query.eq("company_id", state("activeCompanyId"));
        if (state("locationsReady") && state("activeLocationId")) nextQuery = nextQuery.eq("location_id", state("activeLocationId"));
        if (filter === "converted") {
          nextQuery = nextQuery.or("status.eq.converted,converted_work_order_id.not.is.null");
        } else if (filter !== "all") {
          nextQuery = nextQuery.eq("status", "submitted").is("converted_work_order_id", null);
        }
        const term = deps.postgrestSearchTerm(state("searchQuery"));
        if (term) {
          const pattern = `%${term}%`;
          const matchedAssetIds = state("assets").filter(deps.matchesActiveLocation).filter((asset) => deps.matchesQuery([
            asset.name,
            asset.asset_code,
            asset.manufacturer,
            asset.model,
            asset.location,
            asset.status,
            asset.asset_type,
            deps.parentAssetFor()(asset)?.name
          ], term)).map((asset) => asset.id).slice(0, deps.SEARCH_ID_PAGE_SIZE);
          nextQuery = nextQuery.or([
            `title.ilike.${pattern}`,
            `description.ilike.${pattern}`,
            `status.ilike.${pattern}`,
            `priority.ilike.${pattern}`,
            `requested_by_name.ilike.${pattern}`,
            `requested_by_contact.ilike.${pattern}`,
            ...matchedAssetIds.length ? [`asset_id.in.(${matchedAssetIds.join(",")})`] : []
          ].join(","));
        }
        return nextQuery;
      }
      return { applyRequestQueryFilters };
    }
    window.MaintainOpsRequestQueryFilters = {
      createRequestQueryFilterHelpers
    };
  })();

  // src/utils/workOrderSearch.js
  (function() {
    function createWorkOrderSearchHelpers(deps) {
      function state(name) {
        return deps[name]();
      }
      async function refreshWorkOrderRelatedSearch() {
        const query = state("searchQuery").trim();
        if (!query || state("workOrderSearchMode")) {
          deps.setWorkOrderRelatedSearch({ assetIds: [], workOrderIds: [], procedureIds: [] });
          return;
        }
        const matchedAssets = state("assets").filter(deps.matchesActiveLocation).filter((asset) => deps.matchesQuery([
          asset.name,
          asset.asset_code,
          asset.manufacturer,
          asset.model,
          asset.location,
          asset.status,
          asset.asset_type,
          deps.parentAssetFor()(asset)?.name
        ], query)).map((asset) => asset.id);
        const matchedProcedures = state("procedureTemplates").filter((template) => deps.matchesQuery([
          template.name,
          template.description,
          ...(template.procedure_steps || []).map((step) => step.prompt)
        ], query)).map((template) => template.id);
        const matchedPartIds = state("parts").filter(deps.matchesActiveLocation).filter((part) => deps.matchesQuery([
          part.name,
          part.sku,
          part.supplier_name,
          part.quantity_on_hand,
          part.reorder_point,
          part.unit_cost
        ], query)).map((part) => part.id);
        const workOrderIds = /* @__PURE__ */ new Set();
        await Promise.all([
          addRelatedWorkOrderIdsFromParts(workOrderIds, matchedPartIds),
          addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_comments", ["body"], query),
          addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_events", ["event_type", "summary"], query),
          addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_photos", ["file_name"], query),
          addRelatedWorkOrderIdsFromTable(workOrderIds, "work_order_step_results", ["value"], query)
        ]);
        deps.setWorkOrderRelatedSearch({
          assetIds: matchedAssets.slice(0, 200),
          procedureIds: matchedProcedures.slice(0, 200),
          workOrderIds: [...workOrderIds].slice(0, 300)
        });
      }
      async function addRelatedWorkOrderIdsFromParts(target, partIds, options = {}) {
        if (!partIds.length) return;
        const maxRows = options.maxRows ?? 300;
        let remaining = maxRows;
        for (const chunk of deps.chunkArray(partIds, deps.SEARCH_ID_CHUNK_SIZE)) {
          if (remaining <= 0) break;
          try {
            await deps.fetchPagedSearchRows(
              () => state("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id", state("activeCompanyId")).in("part_id", chunk),
              (rows) => {
                rows.forEach((row) => {
                  if (row.work_order_id) target.add(row.work_order_id);
                });
                remaining -= rows.length;
              },
              remaining
            );
          } catch (error) {
            deps.warn("Part-linked work order search failed", error);
            return;
          }
        }
      }
      async function addRelatedWorkOrderIdsFromTable(target, tableName, columns, query, options = {}) {
        const term = deps.postgrestSearchTerm(query);
        if (!term) return;
        const orClause = columns.map((column) => `${column}.ilike.%${term}%`).join(",");
        const maxRows = options.maxRows ?? 300;
        try {
          await deps.fetchPagedSearchRows(
            () => state("supabaseClient").from(tableName).select("work_order_id").eq("company_id", state("activeCompanyId")).or(orClause),
            (rows) => {
              rows.forEach((row) => {
                if (row.work_order_id) target.add(row.work_order_id);
              });
            },
            maxRows
          );
        } catch (error) {
          deps.warn(`${tableName} work order search failed`, error);
        }
      }
      async function fetchExactSearchedWorkOrderPage(options = {}) {
        const rows = await exactWorkOrderSearchRows();
        const total = rows.length;
        const totalPages = Math.max(1, Math.ceil(total / deps.WORK_ORDERS_PER_PAGE));
        if (state("workOrderPage") > totalPages) {
          deps.setWorkOrderPage(totalPages);
        }
        if (state("workOrderPage") < 1) {
          deps.setWorkOrderPage(1);
        }
        const from = (state("workOrderPage") - 1) * deps.WORK_ORDERS_PER_PAGE;
        const pageIds = rows.slice(from, from + deps.WORK_ORDERS_PER_PAGE).map((row) => row.id);
        if (!pageIds.length) return { data: [], error: null, count: total };
        const selectClause = options.includeLocationRelation === false ? deps.WORK_ORDER_FALLBACK_SELECT() : deps.WORK_ORDER_RELATION_SELECT();
        const response = await deps.fetchWorkOrdersByIds(state("supabaseClient"), {
          companyId: state("activeCompanyId"),
          locationId: state("activeLocationId"),
          locationsReady: state("locationsReady"),
          selectClause,
          ids: pageIds
        });
        if (response.error) return response;
        const byId = new Map((response.data || []).map((workOrder) => [workOrder.id, workOrder]));
        return {
          ...response,
          data: pageIds.map((id) => byId.get(id)).filter(Boolean),
          count: total
        };
      }
      async function exactWorkOrderSearchRows() {
        const key = [
          state("activeCompanyId") || "",
          state("locationsReady") ? state("activeLocationId") || "" : "all-locations",
          state("workSort"),
          state("searchQuery").trim().toLowerCase()
        ].join("|");
        const cache = state("exactWorkOrderSearchCache");
        if (cache.key === key) return cache.rows;
        const query = state("searchQuery").trim();
        const rowMap = /* @__PURE__ */ new Map();
        await addDirectWorkOrderSearchRows(rowMap, query);
        const matchedAssets = state("assets").filter(deps.matchesActiveLocation).filter((asset) => deps.matchesQuery([
          asset.name,
          asset.asset_code,
          asset.manufacturer,
          asset.model,
          asset.location,
          asset.status,
          asset.asset_type,
          deps.parentAssetFor()(asset)?.name
        ], query)).map((asset) => asset.id);
        const matchedProcedures = state("procedureTemplates").filter((template) => deps.matchesQuery([
          template.name,
          template.description,
          ...(template.procedure_steps || []).map((step) => step.prompt)
        ], query)).map((template) => template.id);
        const matchedPartIds = state("parts").filter(deps.matchesActiveLocation).filter((part) => deps.matchesQuery([
          part.name,
          part.sku,
          part.supplier_name,
          part.quantity_on_hand,
          part.reorder_point,
          part.unit_cost
        ], query)).map((part) => part.id);
        await Promise.all([
          addWorkOrderSearchRowsByColumn(rowMap, "asset_id", matchedAssets),
          addWorkOrderSearchRowsByColumn(rowMap, "procedure_template_id", matchedProcedures)
        ]);
        const relatedIds = /* @__PURE__ */ new Set();
        await Promise.all([
          addRelatedWorkOrderIdsFromParts(relatedIds, matchedPartIds, { maxRows: Infinity }),
          addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_comments", ["body"], query, { maxRows: Infinity }),
          addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_events", ["event_type", "summary"], query, { maxRows: Infinity }),
          addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_photos", ["file_name"], query, { maxRows: Infinity }),
          addRelatedWorkOrderIdsFromTable(relatedIds, "work_order_step_results", ["value"], query, { maxRows: Infinity })
        ]);
        await addWorkOrderSearchRowsByIds(rowMap, [...relatedIds]);
        const rows = [...rowMap.values()].sort(deps.compareWorkOrders);
        deps.setExactWorkOrderSearchCache({ key, rows });
        return rows;
      }
      async function addDirectWorkOrderSearchRows(target, query) {
        const term = deps.postgrestSearchTerm(query);
        if (!term) return;
        const orClause = [
          "title",
          "description",
          "priority",
          "type",
          "status",
          "failure_cause",
          "resolution_summary",
          "completion_notes"
        ].map((column) => `${column}.ilike.%${term}%`).join(",");
        await deps.fetchPagedSearchRows(
          () => scopedWorkOrderSearchQuery().or(orClause),
          (rows) => addWorkOrderSearchRows(target, rows)
        );
      }
      async function addWorkOrderSearchRowsByColumn(target, column, values) {
        if (!values.length) return;
        for (const chunk of deps.chunkArray(values, deps.SEARCH_ID_CHUNK_SIZE)) {
          await deps.fetchPagedSearchRows(
            () => scopedWorkOrderSearchQuery().in(column, chunk),
            (rows) => addWorkOrderSearchRows(target, rows)
          );
        }
      }
      async function addWorkOrderSearchRowsByIds(target, ids) {
        if (!ids.length) return;
        for (const chunk of deps.chunkArray(ids, deps.SEARCH_ID_CHUNK_SIZE)) {
          await deps.fetchPagedSearchRows(
            () => scopedWorkOrderSearchQuery().in("id", chunk),
            (rows) => addWorkOrderSearchRows(target, rows)
          );
        }
      }
      function scopedWorkOrderSearchQuery() {
        return deps.buildScopedWorkOrderSearchQuery(state("supabaseClient"), {
          companyId: state("activeCompanyId"),
          locationId: state("activeLocationId"),
          locationsReady: state("locationsReady")
        });
      }
      function addWorkOrderSearchRows(target, rows) {
        (rows || []).forEach((row) => {
          if (!row?.id) return;
          target.set(row.id, { ...target.get(row.id) || {}, ...row });
        });
      }
      return {
        refreshWorkOrderRelatedSearch,
        fetchExactSearchedWorkOrderPage,
        exactWorkOrderSearchRows,
        addRelatedWorkOrderIdsFromParts,
        addRelatedWorkOrderIdsFromTable
      };
    }
    window.MaintainOpsWorkOrderSearch = {
      createWorkOrderSearchHelpers
    };
  })();

  // src/utils/workspaceListBuilders.js
  (function() {
    function createWorkspaceListBuilders(deps) {
      function state(name) {
        return deps[name]();
      }
      function globalSearchResults() {
        const query = state("searchQuery").trim();
        const work = state("workOrders").filter(deps.matchesActiveLocation).sort(deps.compareWorkOrders).slice(0, deps.SEARCH_PREVIEW_LIMIT);
        const assetResults = state("assets").filter(deps.matchesActiveLocation).filter((asset) => deps.matchesQuery([asset.name, asset.asset_code, asset.manufacturer, asset.model, asset.location, asset.status], query)).sort((a, b) => a.name.localeCompare(b.name)).slice(0, deps.SEARCH_PREVIEW_LIMIT);
        const partResults = state("parts").filter(deps.matchesActiveLocation).filter((part) => deps.matchesQuery([part.name, part.sku, part.supplier_name, part.quantity_on_hand, part.reorder_point], query)).sort((a, b) => a.name.localeCompare(b.name)).slice(0, deps.SEARCH_PREVIEW_LIMIT);
        const requestResults = state("maintenanceRequests").filter(deps.matchesActiveLocation).filter((request) => deps.matchesQuery([
          request.title,
          request.description,
          request.status,
          request.priority,
          request.assets?.name,
          state("profilesByUserId")[request.requested_by]?.full_name
        ], query)).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, deps.SEARCH_PREVIEW_LIMIT);
        const pmResults = state("preventiveSchedules").filter(deps.matchesActiveLocation).filter((schedule) => deps.matchesQuery([schedule.title, schedule.frequency, schedule.next_due_at, schedule.assets?.name], query)).sort((a, b) => String(a.next_due_at || "").localeCompare(String(b.next_due_at || ""))).slice(0, deps.SEARCH_PREVIEW_LIMIT);
        const procedureResults = state("procedureTemplates").filter((template) => deps.matchesQuery([
          template.name,
          template.description,
          ...(template.procedure_steps || []).map((step) => step.prompt)
        ], query)).sort((a, b) => a.name.localeCompare(b.name)).slice(0, deps.SEARCH_PREVIEW_LIMIT);
        return { work, assets: assetResults, parts: partResults, requests: requestResults, pm: pmResults, procedures: procedureResults };
      }
      function planningItems(bucket = "all") {
        const today = deps.startOfToday();
        const soon = new Date(today);
        soon.setDate(soon.getDate() + 7);
        return state("planningWorkOrders").filter(deps.matchesActiveLocation).filter((workOrder) => workOrder.status !== "completed" && workOrder.due_at).filter((workOrder) => deps.matchesSearch([
          workOrder.title,
          workOrder.description,
          workOrder.priority,
          workOrder.status,
          workOrder.assets?.name,
          deps.assignmentLabel(workOrder)
        ])).map((workOrder) => {
          const due = /* @__PURE__ */ new Date(`${workOrder.due_at}T00:00:00`);
          return {
            kind: "work",
            id: workOrder.id,
            title: workOrder.title,
            priority: workOrder.priority,
            status: workOrder.status,
            assetName: workOrder.assets?.name || "No equipment",
            dueAt: workOrder.due_at,
            due,
            workOrder
          };
        }).filter((item) => {
          if (bucket === "overdue") return item.due < today;
          if (bucket === "today") return item.due.getTime() === today.getTime();
          if (bucket === "soon") return item.due > today && item.due <= soon;
          return true;
        }).sort((a, b) => a.due - b.due);
      }
      function planningPmItems() {
        const today = deps.startOfToday();
        const soon = new Date(today);
        soon.setDate(soon.getDate() + 7);
        return state("preventiveSchedules").filter(deps.matchesActiveLocation).filter((schedule) => {
          const due = /* @__PURE__ */ new Date(`${schedule.next_due_at}T00:00:00`);
          return due >= today && due <= soon;
        }).filter((schedule) => deps.matchesSearch([
          schedule.title,
          schedule.frequency,
          schedule.next_due_at,
          schedule.assets?.name
        ])).map((schedule) => ({
          kind: "pm",
          id: schedule.id,
          title: schedule.title,
          assetName: schedule.assets?.name || "No equipment",
          dueAt: schedule.next_due_at,
          due: /* @__PURE__ */ new Date(`${schedule.next_due_at}T00:00:00`)
        })).sort((a, b) => a.due - b.due);
      }
      function followUpItems() {
        return state("planningWorkOrders").filter(deps.matchesActiveLocation).filter((workOrder) => workOrder.follow_up_needed).filter((workOrder) => deps.matchesSearch([
          workOrder.title,
          workOrder.description,
          workOrder.failure_cause,
          workOrder.resolution_summary,
          workOrder.assets?.name,
          workOrder.assigned_profile?.full_name
        ])).map((workOrder) => ({
          kind: "follow_up",
          id: workOrder.id,
          title: workOrder.title,
          assetName: workOrder.assets?.name || "No equipment",
          completedAt: workOrder.completed_at ? new Date(workOrder.completed_at).toLocaleDateString() : "not completed",
          resolution: workOrder.resolution_summary || workOrder.completion_notes || "",
          workOrder
        })).sort((a, b) => a.title.localeCompare(b.title));
      }
      return {
        globalSearchResults,
        planningItems,
        planningPmItems,
        followUpItems
      };
    }
    window.MaintainOpsWorkspaceListBuilders = {
      createWorkspaceListBuilders
    };
  })();

  // src/services/locationsService.js
  (function() {
    function listLocations(supabaseClient, companyId) {
      return supabaseClient.from("locations").select("*").eq("company_id", companyId).order("name");
    }
    function createLocation(supabaseClient, companyId, name) {
      return supabaseClient.from("locations").insert({ company_id: companyId, name }).select("id").single();
    }
    window.MaintainOpsLocationsService = {
      listLocations,
      createLocation
    };
  })();

  // src/services/profilesService.js
  (function() {
    function listProfiles(supabaseClient, companyId) {
      return supabaseClient.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id", companyId);
    }
    function listCompanyMembers(supabaseClient, companyId) {
      return supabaseClient.from("company_members").select("*").eq("company_id", companyId).order("created_at", { ascending: true });
    }
    function listTeamInvites(supabaseClient, companyId) {
      return supabaseClient.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id", companyId).order("created_at", { ascending: false });
    }
    function listTeamInvitesLegacy(supabaseClient, companyId) {
      return supabaseClient.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id", companyId).order("created_at", { ascending: false });
    }
    function listTeamInviteLinks(supabaseClient, companyId) {
      return supabaseClient.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id", companyId).order("created_at", { ascending: false });
    }
    function listRequestNotificationRecipients(supabaseClient, companyId) {
      return supabaseClient.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id", companyId).order("created_at", { ascending: false });
    }
    window.MaintainOpsProfilesService = {
      listProfiles,
      listCompanyMembers,
      listTeamInvites,
      listTeamInvitesLegacy,
      listTeamInviteLinks,
      listRequestNotificationRecipients
    };
  })();

  // src/services/partsService.js
  (function() {
    function listParts(supabaseClient, companyId) {
      return supabaseClient.from("parts").select("*").eq("company_id", companyId).order("name");
    }
    window.MaintainOpsPartsService = {
      listParts
    };
  })();

  // src/services/assetsService.js
  (function() {
    function listAssets(supabaseClient, companyId) {
      return supabaseClient.from("assets").select("*").eq("company_id", companyId).order("name");
    }
    function listAssetFinancials(supabaseClient, companyId) {
      return supabaseClient.from("asset_financials").select("*").eq("company_id", companyId).order("updated_at", { ascending: false });
    }
    window.MaintainOpsAssetsService = {
      listAssets,
      listAssetFinancials
    };
  })();

  // src/services/workOrdersService.js
  (function() {
    function selectWorkOrders(supabaseClient, selectClause, options = {}) {
      return supabaseClient.from("work_orders").select(selectClause, options);
    }
    function countWorkOrdersQuery(supabaseClient) {
      return supabaseClient.from("work_orders").select("id", { count: "exact", head: true });
    }
    function fetchWorkOrderById(supabaseClient, companyId, workOrderId, selectClause) {
      return supabaseClient.from("work_orders").select(selectClause).eq("company_id", companyId).eq("id", workOrderId).maybeSingle();
    }
    function fetchWorkOrdersByAsset(supabaseClient, companyId, assetId, selectClause) {
      return supabaseClient.from("work_orders").select(selectClause).eq("company_id", companyId).eq("asset_id", assetId).order("completed_at", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
    }
    async function fetchWorkOrdersByIds(supabaseClient, params) {
      const {
        companyId,
        locationId,
        locationsReady,
        selectClause,
        ids
      } = params;
      let query = supabaseClient.from("work_orders").select(selectClause).eq("company_id", companyId).in("id", ids);
      if (locationsReady && locationId) query = query.eq("location_id", locationId);
      return query;
    }
    function scopedWorkOrderSearchQuery(supabaseClient, params) {
      const { companyId, locationId, locationsReady } = params;
      let query = supabaseClient.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id", companyId);
      if (locationsReady && locationId) query = query.eq("location_id", locationId);
      return query;
    }
    function scopedTeamWorkloadQuery(supabaseClient, params) {
      const { companyId, locationId, locationsReady } = params;
      let query = supabaseClient.from("work_orders").select("id, assigned_to, status, due_at, location_id").eq("company_id", companyId).in("status", ["open", "in_progress", "blocked"]).not("assigned_to", "is", null);
      if (locationsReady && locationId) query = query.eq("location_id", locationId);
      return query.order("id", { ascending: true });
    }
    async function fetchPagedSearchRows(buildQuery, onRows, maxRows = Infinity, pageSizeLimit = 1e3) {
      let from = 0;
      let fetched = 0;
      while (fetched < maxRows) {
        const pageSize = Math.min(pageSizeLimit, maxRows - fetched);
        const { data, error } = await buildQuery().range(from, from + pageSize - 1);
        if (error) throw error;
        const rows = data || [];
        onRows(rows);
        fetched += rows.length;
        if (rows.length < pageSize) break;
        from += pageSize;
      }
    }
    window.MaintainOpsWorkOrdersService = {
      selectWorkOrders,
      countWorkOrdersQuery,
      fetchWorkOrderById,
      fetchWorkOrdersByAsset,
      fetchWorkOrdersByIds,
      scopedWorkOrderSearchQuery,
      scopedTeamWorkloadQuery,
      fetchPagedSearchRows
    };
  })();

  // src/services/managerDashboardService.js
  (function() {
    function fetchRecentCompletedWorkOrders(supabaseClient, params = {}) {
      const {
        companyId,
        locationId,
        locationsReady,
        selectClause,
        cutoffIso,
        limit = 200
      } = params;
      let query = supabaseClient.from("work_orders").select(selectClause || "*").eq("company_id", companyId).eq("status", "completed").gte("completed_at", cutoffIso).order("completed_at", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false }).limit(limit);
      if (locationsReady && locationId) query = query.eq("location_id", locationId);
      return query;
    }
    window.MaintainOpsManagerDashboardService = {
      fetchRecentCompletedWorkOrders
    };
  })();

  // src/services/companyService.js
  (function() {
    function getMyCompanies(supabaseClient) {
      return supabaseClient.rpc("get_my_companies");
    }
    function listUserCompanyMemberships(supabaseClient, userId) {
      return supabaseClient.from("company_members").select("company_id, role, default_location_id").eq("user_id", userId).order("created_at", { ascending: true });
    }
    function listUserCompanyMembershipsLegacy(supabaseClient, userId) {
      return supabaseClient.from("company_members").select("company_id, role").eq("user_id", userId).order("created_at", { ascending: true });
    }
    function listCompaniesByIds(supabaseClient, companyIds) {
      return supabaseClient.from("companies").select("id, name, logo_path, created_at").in("id", companyIds).order("created_at", { ascending: true });
    }
    function listCompaniesByIdsLegacy(supabaseClient, companyIds) {
      return supabaseClient.from("companies").select("id, name, created_at").in("id", companyIds).order("created_at", { ascending: true });
    }
    window.MaintainOpsCompanyService = {
      getMyCompanies,
      listUserCompanyMemberships,
      listUserCompanyMembershipsLegacy,
      listCompaniesByIds,
      listCompaniesByIdsLegacy
    };
  })();

  // src/services/appIssueReportsService.js
  (function() {
    function listAppIssueReports(supabaseClient, companyId) {
      return supabaseClient.from("app_issue_reports").select("*").eq("company_id", companyId).order("created_at", { ascending: false });
    }
    function createAppIssueReportRecord(supabaseClient, payload) {
      return supabaseClient.from("app_issue_reports").insert(payload);
    }
    function updateAppIssueReportStatusRecord(supabaseClient, companyId, reportId, nextStatus) {
      return supabaseClient.from("app_issue_reports").update({
        status: nextStatus,
        resolved_at: nextStatus === "resolved" ? (/* @__PURE__ */ new Date()).toISOString() : null
      }).eq("company_id", companyId).eq("id", reportId);
    }
    function deleteAppIssueReportRecord(supabaseClient, companyId, reportId) {
      return supabaseClient.from("app_issue_reports").delete().eq("company_id", companyId).eq("id", reportId);
    }
    window.MaintainOpsAppIssueReportsService = {
      listAppIssueReports,
      createAppIssueReportRecord,
      updateAppIssueReportStatusRecord,
      deleteAppIssueReportRecord
    };
  })();

  // src/services/userPreferencesService.js
  (function() {
    const PREFERENCE_COLUMNS = "user_id, shop_reference_favorites, updated_at";
    function getUserPreferences(supabaseClient, userId) {
      return supabaseClient.from("user_preferences").select(PREFERENCE_COLUMNS).eq("user_id", userId).maybeSingle();
    }
    function saveShopReferenceFavorites(supabaseClient, userId, favorites) {
      return supabaseClient.from("user_preferences").upsert({
        user_id: userId,
        shop_reference_favorites: Array.isArray(favorites) ? favorites.filter(Boolean) : [],
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, { onConflict: "user_id" }).select(PREFERENCE_COLUMNS).single();
    }
    window.MaintainOpsUserPreferencesService = {
      getUserPreferences,
      saveShopReferenceFavorites
    };
  })();

  // src/bundles/runtime.entry.js
  var import_requestEmailNotificationService = __toESM(require_requestEmailNotificationService());
  var import_signedUrlService = __toESM(require_signedUrlService());
  var import_workspaceQueueLoadersService = __toESM(require_workspaceQueueLoadersService());
  var import_authSessionFlow = __toESM(require_authSessionFlow());

  // src/render/displayHelpers.js
  (function() {
    function renderMetric(label, value, tone = "neutral") {
      return `<article class="metric dashboard-card tone-${tone}"><span>${label}</span><strong>${value}</strong></article>`;
    }
    function renderInsight(label, value, description, tone = "neutral") {
      return `
    <article class="insight dashboard-card tone-${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${description}</p>
    </article>
  `;
    }
    function renderRoleGuide() {
      const roles = window.MaintainOpsConstants?.COMPANY_ROLES || ["technician", "accounting", "manager", "admin"];
      const roleLabel = window.MaintainOpsFormatting?.roleLabel || ((role) => String(role || ""));
      const roleDescription = window.MaintainOpsFormatting?.roleDescription || (() => "");
      const escapeHtml = window.MaintainOpsDom?.escapeHtml || ((value) => String(value ?? ""));
      return `
    <section class="team-role-guide">
      ${roles.map((role) => `
        <article>
          <strong>${roleLabel(role)}</strong>
          <span>${escapeHtml(roleDescription(role))}</span>
        </article>
      `).join("")}
    </section>
  `;
    }
    window.MaintainOpsRenderDisplayHelpers = Object.freeze({
      renderMetric,
      renderInsight,
      renderRoleGuide
    });
  })();

  // src/bundles/runtime.entry.js
  var import_relationshipDisplay = __toESM(require_relationshipDisplay());

  // src/render/dashboardDisplay.js
  (function() {
    function renderGaugeReadout(label, value, tone = "active", options = {}, deps) {
      const activeStatusFilter = deps.getActiveStatusFilter();
      const isAction = options.filter || options.section;
      const tag = isAction ? "button" : "article";
      const activeClass = options.filter && activeStatusFilter === options.filter ? " selected" : "";
      const isOverdueAlert = tone.includes("overdue") && Number(value) >= 3;
      const alertClass = isOverdueAlert ? " alert-blink" : "";
      const attributes = [
        isAction ? `type="button"` : "",
        options.filter ? `data-status-filter="${options.filter}" aria-pressed="${activeStatusFilter === options.filter}"` : "",
        options.section ? `data-section="${options.section}"` : ""
      ].filter(Boolean).join(" ");
      const attrText = attributes ? ` ${attributes}` : "";
      return `
    <${tag} class="gauge-readout ${tone}${activeClass}${alertClass}"${attrText}>
      ${isOverdueAlert ? `<span class="gauge-alert-badge" aria-hidden="true">!</span>` : ""}
      <div class="gauge-visual" aria-hidden="true">
        <span class="gauge-arc"></span>
        <span class="gauge-cut one"></span>
        <span class="gauge-cut two"></span>
        <span class="gauge-cut three"></span>
        <span class="gauge-cut four"></span>
        <span class="gauge-needle"></span>
        <span class="gauge-hub"></span>
      </div>
      <strong>${value}</strong>
      <span>${deps.escapeHtml(label)}</span>
    </${tag}>
  `;
    }
    function renderWorkOrderGaugeDashboard(deps) {
      const counts = deps.getWorkOrderDashboardCounts() || {};
      const activeWork = counts.activeWork || 0;
      const newWork = counts.newWork || 0;
      const inProgress = counts.inProgress || 0;
      const blocked = counts.blocked || 0;
      const overdue = counts.overdue || 0;
      const completedAll = counts.completedAll || 0;
      const completedMonth = counts.completedMonth || 0;
      const completedWeek = counts.completedWeek || 0;
      const requestCount = deps.getRequestsReady() ? deps.openMaintenanceRequests().filter(deps.matchesActiveLocation).length : 0;
      return `
    <div class="summary-gauge-grid">
      ${renderGaugeReadout("Active Work", activeWork, "active", { filter: "active" }, deps)}
      ${renderGaugeReadout("New", newWork, "new", { filter: "open" }, deps)}
      ${renderGaugeReadout("In Progress", inProgress, "in_progress", { filter: "in_progress" }, deps)}
      ${renderGaugeReadout("Blocked", blocked, "blocked", { filter: "blocked" }, deps)}
      ${renderGaugeReadout("Overdue", overdue, "overdue", { filter: "overdue" }, deps)}
      ${renderGaugeReadout("Requests", requestCount, "request", { filter: "requests" }, deps)}
      ${renderGaugeReadout("All Completed", completedAll, "completed", { filter: "completed" }, deps)}
      ${renderGaugeReadout("Completed Month", completedMonth, "completed", { filter: "completed_month" }, deps)}
      ${renderGaugeReadout("Done This Week", completedWeek, "completed", { filter: "completed_week" }, deps)}
    </div>
  `;
    }
    function renderWorkloadStrip(items, deps) {
      const counts = items || {};
      const newWork = counts.newWork || 0;
      const inProgress = counts.inProgress || 0;
      const blocked = counts.blocked || 0;
      const active = counts.activeWork ?? newWork + inProgress + blocked;
      const overdue = counts.overdue || 0;
      const completedAll = counts.completedAll || 0;
      const completedMonth = counts.completedMonth || 0;
      const completedWeek = counts.completedWeek || 0;
      return `
    <div class="workload-strip" aria-label="Active work summary">
      ${renderGaugeReadout("Active Work", active, "active workload-pill", { filter: "active" }, deps)}
      ${renderGaugeReadout("New", newWork, "new workload-pill", { filter: "open" }, deps)}
      ${renderGaugeReadout("In Progress", inProgress, "in_progress workload-pill", { filter: "in_progress" }, deps)}
      ${renderGaugeReadout("Blocked", blocked, "blocked workload-pill", { filter: "blocked" }, deps)}
      ${renderGaugeReadout("Overdue", overdue, "overdue workload-pill", { filter: "overdue" }, deps)}
      ${renderGaugeReadout("All Completed", completedAll, "completed workload-pill", { filter: "completed" }, deps)}
      ${renderGaugeReadout("Completed Month", completedMonth, "completed workload-pill", { filter: "completed_month" }, deps)}
      ${renderGaugeReadout("Done This Week", completedWeek, "completed workload-pill", { filter: "completed_week" }, deps)}
    </div>
  `;
    }
    function overdueWorkOrders(deps) {
      return deps.getWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
    }
    function completedThisWeek(deps) {
      return deps.getWorkOrders().filter(isCompletedThisWeek);
    }
    function isCompletedThisWeek(workOrder) {
      const cutoff = /* @__PURE__ */ new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      return Boolean(workOrder.completed_at && new Date(workOrder.completed_at) >= cutoff);
    }
    function completedThisMonth(deps) {
      return deps.getWorkOrders().filter(isCompletedThisMonth);
    }
    function isCompletedThisMonth(workOrder) {
      const now = /* @__PURE__ */ new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return Boolean(workOrder.completed_at && new Date(workOrder.completed_at) >= monthStart);
    }
    function averageCompletionMinutes(source) {
      const completed = source.filter((workOrder) => workOrder.status === "completed" && Number(workOrder.actual_minutes) > 0);
      if (!completed.length) return 0;
      const total = completed.reduce((sum, workOrder) => sum + Number(workOrder.actual_minutes || 0), 0);
      return Math.round(total / completed.length);
    }
    function preventiveDueSoon(deps) {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const soon = new Date(today);
      soon.setDate(soon.getDate() + 7);
      return deps.getPreventiveSchedules().filter((schedule) => {
        const due = /* @__PURE__ */ new Date(`${schedule.next_due_at}T00:00:00`);
        return due >= today && due <= soon;
      });
    }
    function createDashboardDisplayHelpers(deps) {
      return Object.freeze({
        renderGaugeReadout: (label, value, tone = "active", options = {}) => renderGaugeReadout(label, value, tone, options, deps),
        renderWorkOrderGaugeDashboard: () => renderWorkOrderGaugeDashboard(deps),
        renderWorkloadStrip: (items) => renderWorkloadStrip(items, deps),
        overdueWorkOrders: () => overdueWorkOrders(deps),
        completedThisWeek: () => completedThisWeek(deps),
        isCompletedThisWeek,
        completedThisMonth: () => completedThisMonth(deps),
        isCompletedThisMonth,
        averageCompletionMinutes: (source = deps.getWorkOrders()) => averageCompletionMinutes(source),
        preventiveDueSoon: () => preventiveDueSoon(deps)
      });
    }
    window.MaintainOpsDashboardDisplay = Object.freeze({
      createDashboardDisplayHelpers
    });
  })();

  // src/render/iconDisplay.js
  (function() {
    function segmentIcon(type) {
      const icons = {
        active: `<path d="M4 12h5l2-6 4 12 2-6h3"></path>`,
        all: `<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>`,
        mine: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
        created: `<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>`,
        vendor: `<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>`,
        unassigned: `<path d="M12 5v14"></path><path d="M5 12h14"></path>`,
        open: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
        in_progress: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
        blocked: `<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>`,
        completed: `<path d="M4 12l5 5L20 6"></path>`,
        overdue: `<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>`,
        newest: `<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>`,
        due: `<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>`,
        priority: `<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>`
      };
      return `<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.all}</svg>`;
    }
    function navIcon(type) {
      const icons = {
        mywork: `<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>`,
        work: `<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>`,
        planning: `<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>`,
        requests: `<path d="M5 5h14v10H8l-3 3V5z"></path>`,
        assets: `<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>`,
        financial: `<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>`,
        pm: `<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>`,
        procedures: `<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>`,
        parts: `<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>`,
        conversions: `<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>`,
        performance: `<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>`,
        messages: `<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>`,
        team: `<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>`,
        manager: `<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>`,
        setup: `<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>`,
        settings: `<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>`
      };
      return `<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[type] || icons.work}</svg>`;
    }
    window.MaintainOpsIconDisplay = Object.freeze({
      segmentIcon,
      navIcon
    });
  })();

  // src/render/equipmentLabels.js
  (function() {
    function assetTypeLabel(type) {
      const labels = {
        machine: "Primary",
        forklift: "Forklift",
        secondary_machine: "Sub Equipment",
        tooling: "Tooling / Setup",
        component: "Component",
        shop_item: "Shop Item"
      };
      if (labels[type]) return labels[type];
      return String(type || "machine").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
    function assetStatusLabel(status) {
      if (status === "offline") return "Offline / Down";
      return String(status || "running").replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
    window.MaintainOpsEquipmentLabels = Object.freeze({
      assetTypeLabel,
      assetStatusLabel
    });
  })();

  // src/render/emptyStateText.js
  (function() {
    function createEmptyStateTextHelpers({
      getSearchQuery,
      getAssetStatusFilter,
      getAssetTypeFilter,
      getPartSearchQuery,
      getPartInventoryFilter,
      assetTypeLabel,
      assetStatusLabel
    }) {
      function requestEmptyStateText(filter) {
        if (getSearchQuery().trim()) return "No requests match this search.";
        if (filter === "converted") return "No converted requests at this location.";
        if (filter === "all") return "No requests at this location yet.";
        return "No active requests waiting for review.";
      }
      function assetEmptyStateText() {
        const assetStatusFilter = getAssetStatusFilter();
        const assetTypeFilter = getAssetTypeFilter ? getAssetTypeFilter() : "all";
        if (getSearchQuery().trim()) return "No equipment matches this search.";
        if (assetStatusFilter !== "all") return `No ${assetStatusLabel(assetStatusFilter).toLowerCase()} equipment found.`;
        if (assetTypeFilter !== "all") return `No ${assetTypeLabel(assetTypeFilter).toLowerCase()} equipment found.`;
        return "No equipment added yet.";
      }
      function partEmptyStateText() {
        if (getPartSearchQuery().trim()) return "No parts match this search.";
        if (getPartInventoryFilter() === "low") return "No low stock parts right now.";
        return "No parts added yet.";
      }
      return {
        requestEmptyStateText,
        assetEmptyStateText,
        partEmptyStateText
      };
    }
    window.MaintainOpsEmptyStateText = {
      createEmptyStateTextHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_requestDisplay = __toESM(require_requestDisplay());

  // src/render/globalSearchDisplay.js
  (function() {
    function createGlobalSearchDisplayHelpers({
      escapeHtml,
      statusLabel,
      assignmentLabel,
      activeLocationName,
      getSearchQuery
    }) {
      function renderGlobalSearchResults(results) {
        const total = globalResultCount(results);
        return `
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${total} previewed in ${escapeHtml(activeLocationName())}</span>
          </div>
          <div class="global-search-grid">
            ${renderGlobalResultGroup("Work Orders", results.work, renderGlobalWorkResult, "work", { showWorkSearchAction: Boolean(getSearchQuery().trim()) })}
            ${renderGlobalResultGroup("Equipment", results.assets, renderGlobalAssetResult, "asset")}
            ${renderGlobalResultGroup("Parts", results.parts, renderGlobalPartResult, "parts")}
            ${renderGlobalResultGroup("Requests", results.requests, renderGlobalRequestResult, "comment")}
            ${renderGlobalResultGroup("PM", results.pm, renderGlobalPmResult, "procedure")}
            ${renderGlobalResultGroup("Procedure Checklists", results.procedures, renderGlobalProcedureResult, "procedure")}
          </div>
        </section>
      `;
      }
      function renderGlobalResultGroup(title, items, renderer, tone, options = {}) {
        return `
        <section class="global-result-group relationship-detail ${tone}">
          <div class="panel-header compact">
            <h3>${escapeHtml(title)}</h3>
            <span class="chip">${items.length}</span>
          </div>
          <div class="global-result-list">
            ${items.map(renderer).join("") || `<p class="muted">No matches.</p>`}
            ${options.showWorkSearchAction ? `<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>` : ""}
          </div>
        </section>
      `;
      }
      function renderGlobalWorkResult(workOrder) {
        return `
        <button class="global-result-item" data-search-work-order="${workOrder.id}" type="button">
          <strong>${escapeHtml(workOrder.title)}</strong>
          <span>${statusLabel(workOrder.status)} - ${escapeHtml(workOrder.assets?.name || "No equipment")} - ${escapeHtml(assignmentLabel(workOrder))}</span>
        </button>
      `;
      }
      function renderGlobalAssetResult(asset) {
        return `
        <button class="global-result-item" data-search-asset="${asset.id}" type="button">
          <strong>${escapeHtml(asset.name)}</strong>
          <span>${escapeHtml(asset.asset_code || "No serial")} - ${escapeHtml(asset.status)} - ${escapeHtml(asset.location || activeLocationName())}</span>
        </button>
      `;
      }
      function renderGlobalPartResult(part) {
        const quantity = Number(part.quantity_on_hand) || 0;
        return `
        <button class="global-result-item" data-search-part="${part.id}" type="button">
          <strong>${escapeHtml(part.name)}</strong>
          <span>${escapeHtml(part.sku || "No SKU")} - ${quantity} on hand${part.supplier_name ? ` - ${escapeHtml(part.supplier_name)}` : ""}</span>
        </button>
      `;
      }
      function renderGlobalRequestResult(request) {
        return `
        <button class="global-result-item" data-search-request="${request.id}" type="button">
          <strong>${escapeHtml(request.title)}</strong>
          <span>${escapeHtml(request.status)} - ${escapeHtml(request.assets?.name || "No equipment")}</span>
        </button>
      `;
      }
      function renderGlobalPmResult(schedule) {
        return `
        <button class="global-result-item" data-search-section="pm" data-search-label="${escapeHtml(schedule.title)}" type="button">
          <strong>${escapeHtml(schedule.title)}</strong>
          <span>${escapeHtml(schedule.assets?.name || "No equipment")} - due ${escapeHtml(schedule.next_due_at || "unset")}</span>
        </button>
      `;
      }
      function renderGlobalProcedureResult(template) {
        return `
        <button class="global-result-item" data-search-section="procedures" data-search-label="${escapeHtml(template.name)}" type="button">
          <strong>${escapeHtml(template.name)}</strong>
          <span>${(template.procedure_steps || []).length} steps</span>
        </button>
      `;
      }
      function globalResultCount(results) {
        return Object.values(results).reduce((sum, list) => sum + list.length, 0);
      }
      return {
        renderGlobalSearchResults,
        renderGlobalResultGroup,
        renderGlobalWorkResult,
        renderGlobalAssetResult,
        renderGlobalPartResult,
        renderGlobalRequestResult,
        renderGlobalPmResult,
        renderGlobalProcedureResult,
        globalResultCount
      };
    }
    window.MaintainOpsGlobalSearchDisplay = {
      createGlobalSearchDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workQueueDisplay = __toESM(require_workQueueDisplay());

  // src/render/planningDisplay.js
  (function() {
    function createPlanningDisplayHelpers({
      escapeHtml,
      LIST_ITEMS_PER_PAGE,
      getPlanningPage,
      renderListPagination,
      statusLabel,
      renderRelationshipChips
    }) {
      function renderPlanningGroup(title, items, chipClass, pageKind) {
        const pageSize = LIST_ITEMS_PER_PAGE || 12;
        const currentPage = typeof getPlanningPage === "function" ? getPlanningPage(pageKind) : 1;
        const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        const safePage = Math.min(Math.max(currentPage, 1), totalPages);
        const pagedItems = items.slice((safePage - 1) * pageSize, safePage * pageSize);
        return `
        <section class="planning-group">
          <div class="panel-header compact-header">
            <h3>${escapeHtml(title)}</h3>
            <span class="chip ${chipClass}">${items.length}</span>
          </div>
          <div class="planning-list">
            ${pagedItems.map(renderPlanningItem).join("") || `<p class="muted">Nothing here.</p>`}
          </div>
          ${typeof renderListPagination === "function" ? renderListPagination(`planning-${pageKind}`, items.length, safePage, totalPages) : ""}
        </section>
      `;
      }
      function renderPlanningItem(item) {
        if (item.kind === "follow_up") {
          return `
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.assetName)} - completed ${escapeHtml(item.completedAt)}</p>
              ${item.resolution ? `<p>${escapeHtml(item.resolution)}</p>` : ""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${escapeHtml(item.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${escapeHtml(item.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;
        }
        if (item.kind === "pm") {
          return `
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
            </div>
            <button class="secondary-button" data-generate-pm="${item.id}" type="button">Generate Work</button>
          </article>
        `;
        }
        return `
        <article class="planning-item mini-work-order" data-mini-work-order="${item.id}">
          <div>
            <span class="eyebrow">${escapeHtml(item.priority)} ${escapeHtml(statusLabel(item.status))}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.assetName)} - due ${escapeHtml(item.dueAt)}</p>
          </div>
          ${renderRelationshipChips(item.workOrder)}
        </article>
      `;
      }
      return {
        renderPlanningGroup,
        renderPlanningItem
      };
    }
    window.MaintainOpsPlanningDisplay = {
      createPlanningDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_miniWorkOrderDisplay = __toESM(require_miniWorkOrderDisplay());

  // src/render/paginationDisplay.js
  (function() {
    function createPaginationDisplayHelpers({
      WORK_ORDERS_PER_PAGE,
      PARTS_PER_PAGE,
      ASSETS_PER_PAGE,
      LIST_ITEMS_PER_PAGE,
      getWorkOrderPage,
      getPartsPage,
      getAssetsPage
    }) {
      function renderWorkPagination(totalCount, totalPages) {
        if (totalCount <= WORK_ORDERS_PER_PAGE) return "";
        const workOrderPage = getWorkOrderPage();
        const firstShown = (workOrderPage - 1) * WORK_ORDERS_PER_PAGE + 1;
        const lastShown = Math.min(totalCount, workOrderPage * WORK_ORDERS_PER_PAGE);
        return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${workOrderPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${workOrderPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${workOrderPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
      }
      function renderPartsPagination(totalCount, totalPages) {
        if (totalCount <= PARTS_PER_PAGE) return "";
        const partsPage = getPartsPage();
        const firstShown = (partsPage - 1) * PARTS_PER_PAGE + 1;
        const lastShown = Math.min(totalCount, partsPage * PARTS_PER_PAGE);
        return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${partsPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${partsPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${partsPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
      }
      function renderAssetsPagination(totalCount, totalPages) {
        if (totalCount <= ASSETS_PER_PAGE) return "";
        const assetsPage = getAssetsPage();
        const firstShown = (assetsPage - 1) * ASSETS_PER_PAGE + 1;
        const lastShown = Math.min(totalCount, assetsPage * ASSETS_PER_PAGE);
        return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${assetsPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${assetsPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${assetsPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
      }
      function renderListPagination(kind, totalCount, currentPage, totalPages) {
        if (totalCount <= LIST_ITEMS_PER_PAGE) return "";
        const firstShown = (currentPage - 1) * LIST_ITEMS_PER_PAGE + 1;
        const lastShown = Math.min(totalCount, currentPage * LIST_ITEMS_PER_PAGE);
        return `
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${kind}" data-page-direction="prev" type="button" ${currentPage <= 1 ? "disabled" : ""}>Previous</button>
          <span>Showing ${firstShown}-${lastShown} of ${totalCount} - Page ${currentPage} of ${totalPages}</span>
          <button class="secondary-button page-action-button" data-list-page="${kind}" data-page-direction="next" type="button" ${currentPage >= totalPages ? "disabled" : ""}>Next</button>
        </div>
      `;
      }
      return {
        renderWorkPagination,
        renderPartsPagination,
        renderAssetsPagination,
        renderListPagination
      };
    }
    window.MaintainOpsPaginationDisplay = {
      createPaginationDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_partsDisplay = __toESM(require_partsDisplay());

  // src/render/optionDisplay.js
  (function() {
    function createOptionDisplayHelpers({
      escapeHtml,
      getLocations,
      getActiveLocationId,
      getAssets,
      matchesActiveLocation,
      isAssetDescendantOf,
      parentAssetFor
    }) {
      function renderLocationOptions(selectedId = getActiveLocationId()) {
        return getLocations().map((location) => `<option value="${location.id}" ${location.id === selectedId ? "selected" : ""}>${escapeHtml(location.name)}</option>`).join("");
      }
      function assetOptionLabel(asset) {
        const parent = parentAssetFor(asset);
        return parent ? `${asset.name} - part of ${parent.name}` : asset.name;
      }
      function renderAssetOptions(selectedId = "") {
        const options = getAssets().filter(matchesActiveLocation).sort((a, b) => assetOptionLabel(a).localeCompare(assetOptionLabel(b)));
        const selectedAsset = selectedId ? getAssets().find((asset) => asset.id === selectedId) : null;
        const list = selectedAsset && !options.some((asset) => asset.id === selectedAsset.id) ? [selectedAsset, ...options] : options;
        return list.map((asset) => `<option value="${asset.id}" ${asset.id === selectedId ? "selected" : ""}>${escapeHtml(assetOptionLabel(asset))}</option>`).join("");
      }
      function renderParentAssetOptions(selectedId = "", currentAssetId = "") {
        return getAssets().filter(matchesActiveLocation).filter((asset) => asset.id !== currentAssetId && !isAssetDescendantOf(asset.id, currentAssetId)).sort((a, b) => assetOptionLabel(a).localeCompare(assetOptionLabel(b))).map((asset) => `<option value="${asset.id}" ${asset.id === selectedId ? "selected" : ""}>${escapeHtml(assetOptionLabel(asset))}</option>`).join("");
      }
      function assetAreaOptions(selectedArea = "") {
        const areas = [...new Set(getAssets().filter(matchesActiveLocation).map((asset) => String(asset.location || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
        const cleanSelected = String(selectedArea || "").trim();
        return cleanSelected && !areas.includes(cleanSelected) ? [cleanSelected, ...areas] : areas;
      }
      function renderAssetAreaOptions(selectedArea = "") {
        return assetAreaOptions(selectedArea).map((area) => `<option value="${escapeHtml(area)}" ${area === selectedArea ? "selected" : ""}>${escapeHtml(area)}</option>`).join("");
      }
      return {
        renderLocationOptions,
        renderAssetOptions,
        renderParentAssetOptions,
        renderAssetAreaOptions,
        assetOptionLabel
      };
    }
    window.MaintainOpsOptionDisplay = {
      createOptionDisplayHelpers
    };
  })();

  // src/render/setupDisplay.js
  (function() {
    function createSetupDisplayHelpers({
      escapeHtml
    }) {
      function renderSetupItem(item) {
        return `
        <article class="setup-item ${item.ready ? "ready" : "needs-work"}">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.detail)}</span>
            ${item.action ? `<button class="secondary-button setup-action-button" data-setup-action="${escapeHtml(item.action)}" type="button">${escapeHtml(item.actionLabel)}</button>` : ""}
          </div>
          <span class="chip ${item.ready ? "completed" : "blocked"}">${item.ready ? "ready" : "setup"}</span>
        </article>
      `;
      }
      return {
        renderSetupItem
      };
    }
    window.MaintainOpsSetupDisplay = {
      createSetupDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_storageDashboardDisplay = __toESM(require_storageDashboardDisplay());

  // src/render/requestPhotoDisplay.js
  (function() {
    function createRequestPhotoDisplayHelpers({
      escapeHtml,
      requestPhotoMetaText,
      getRequestPhotosReady
    }) {
      function renderMaintenanceRequestPhoto(request) {
        if (!request.photo_storage_path) return "";
        const fileName = request.photo_file_name || request.photo_original_file_name || "Request photo";
        const meta = requestPhotoMetaText(request);
        return `
        <div class="request-photo-preview">
          ${request.photoSignedUrl && request.photo_content_type?.startsWith("image/") ? `<img class="photo-thumb" src="${escapeHtml(request.photoSignedUrl)}" alt="${escapeHtml(fileName)}">` : ""}
          <div>
            <strong>${escapeHtml(fileName)}</strong>
            <span>${escapeHtml(meta)}</span>
            ${request.photoSignedUrl ? `<a href="${escapeHtml(request.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>` : `<span>${getRequestPhotosReady() ? "Photo attached" : "Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `;
      }
      return {
        renderMaintenanceRequestPhoto
      };
    }
    window.MaintainOpsRequestPhotoDisplay = {
      createRequestPhotoDisplayHelpers
    };
  })();

  // src/render/messageBadgeDisplay.js
  (function() {
    function createMessageBadgeDisplayHelpers({
      directUnreadMessages,
      totalUnreadMessages
    }) {
      function renderMessageNavBadge() {
        const directUnread = directUnreadMessages();
        if (directUnread > 0) return `<b class="nav-badge nav-alert-badge">${directUnread}!</b>`;
        const unread = totalUnreadMessages();
        return unread > 0 ? `<b class="nav-badge">${unread}</b>` : "";
      }
      return {
        renderMessageNavBadge
      };
    }
    window.MaintainOpsMessageBadgeDisplay = {
      createMessageBadgeDisplayHelpers
    };
  })();

  // src/render/navBadgeDisplay.js
  (function() {
    function createNavBadgeDisplayHelpers() {
      function normalizedCount(count) {
        const value = Number(count);
        if (!Number.isFinite(value) || value <= 0) return 0;
        return Math.floor(value);
      }
      function navBadgeText(count) {
        const value = normalizedCount(count);
        if (!value) return "";
        return value > 99 ? "99+" : String(value);
      }
      function renderNavCountBadge(count, options = {}) {
        const text = navBadgeText(count);
        if (!text) return "";
        const alertClass = options.alert ? " nav-alert-badge" : "";
        const suffix = options.alertSuffix ? "!" : "";
        return `<b class="nav-badge${alertClass}">${text}${suffix}</b>`;
      }
      return {
        navBadgeText,
        renderNavCountBadge
      };
    }
    window.MaintainOpsNavBadgeDisplay = {
      createNavBadgeDisplayHelpers
    };
  })();

  // src/render/appIssueDisplay.js
  (function() {
    function createAppIssueDisplayHelpers({
      escapeHtml,
      getProfilesByUserId,
      getLocations
    }) {
      function renderAppIssueReport(report) {
        const reporter = getProfilesByUserId()[report.reporter_id]?.full_name || "Team member";
        const location = getLocations().find((item) => item.id === report.location_id)?.name || "No location";
        const status = report.status || "open";
        const severity = report.severity || "normal";
        return `
        <article class="issue-report-card issue-${status}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${severity === "blocking" ? "critical" : severity === "minor" ? "completed" : "open"}">${escapeHtml(severity)}</span>
              <span class="chip issue-status-chip issue-status-${status}">${escapeHtml(status)}</span>
              <span>${escapeHtml(location)}</span>
              <span>${report.created_at ? new Date(report.created_at).toLocaleString() : ""}</span>
            </div>
            <strong>${escapeHtml(report.title)}</strong>
            <p>${escapeHtml(report.details || "")}</p>
            <small>${escapeHtml(reporter)} - ${escapeHtml(report.screen || "workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${escapeHtml(report.id)}">
              <select name="status" aria-label="Issue status">
                ${["open", "reviewing", "resolved"].map((option) => `<option value="${option}" ${option === status ? "selected" : ""}>${option}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${escapeHtml(report.id)}" type="button">Delete</button>
          </div>
        </article>
      `;
      }
      return {
        renderAppIssueReport
      };
    }
    window.MaintainOpsAppIssueDisplay = {
      createAppIssueDisplayHelpers
    };
  })();

  // src/render/workMessageDisplay.js
  (function() {
    function createWorkMessageDisplayHelpers({
      escapeHtml,
      formatMessageTime,
      messageThreadScopeLabel,
      getMessageThreads,
      getMessagesByThreadId,
      getMessageWorkOrderLinksReady
    }) {
      function renderLinkedWorkMessageThread(thread) {
        const messages = getMessagesByThreadId()[thread.id] || [];
        const lastMessage = messages[messages.length - 1];
        return `
        <article class="work-linked-thread">
          <div>
            <strong>${escapeHtml(thread.title)}</strong>
            <span>${escapeHtml(messageThreadScopeLabel(thread))}${lastMessage ? ` - ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : ""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${thread.id}" type="button">Open Thread</button>
        </article>
      `;
      }
      function renderWorkOrderMessages(workOrder) {
        const linkedThreads = getMessageThreads().filter((thread) => thread.work_order_id === workOrder.id);
        return `
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${workOrder.id}" type="button">Message Team</button>
            ${getMessageWorkOrderLinksReady() ? `
              <div class="work-linked-thread-list">
                ${linkedThreads.map(renderLinkedWorkMessageThread).join("") || `<p class="muted">No message threads linked yet.</p>`}
              </div>
            ` : `<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>`}
          </div>
        </details>
      `;
      }
      return {
        renderWorkOrderMessages,
        renderLinkedWorkMessageThread
      };
    }
    window.MaintainOpsWorkMessageDisplay = {
      createWorkMessageDisplayHelpers
    };
  })();

  // src/render/workRecommendationDisplay.js
  (function() {
    function createWorkRecommendationDisplayHelpers({
      escapeHtml,
      recommendedWorkOrderStep
    }) {
      function renderWorkOrderRecommendation(workOrder) {
        const recommendation = recommendedWorkOrderStep(workOrder);
        if (!recommendation) return "";
        return `
        <section class="work-recommendation ${recommendation.tone || ""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${escapeHtml(recommendation.title)}</strong>
            <p>${escapeHtml(recommendation.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${recommendation.target}" type="button">${escapeHtml(recommendation.action)}</button>
        </section>
      `;
      }
      return {
        renderWorkOrderRecommendation
      };
    }
    window.MaintainOpsWorkRecommendationDisplay = {
      createWorkRecommendationDisplayHelpers
    };
  })();

  // src/render/commandCardDisplay.js
  (function() {
    function createCommandCardDisplayHelpers({
      escapeHtml
    }) {
      function commandShortcut(label, count, targetId, helper, tone) {
        return `
        <button class="command-card command-${tone} ${count ? "" : "empty"}" data-jump-work-section="${targetId}" type="button">
          <span>${escapeHtml(label)}</span>
          <strong>${count}</strong>
          <small>${escapeHtml(helper)}</small>
        </button>
      `;
      }
      function renderEmailHelperCommandCard(workOrder) {
        if (!workOrder.asset_id) return "";
        return commandShortcut("Email Helper", "Copy", "work-order-email-helper-target", "Copy to paste an email update", "email");
      }
      return {
        renderEmailHelperCommandCard,
        commandShortcut
      };
    }
    window.MaintainOpsCommandCardDisplay = {
      createCommandCardDisplayHelpers
    };
  })();

  // src/render/workCommandDisplay.js
  (function() {
    function createWorkCommandDisplayHelpers({
      escapeHtml,
      statusLabel,
      assignmentLabel,
      isVendorAssigned,
      hasCompletedSafetyDeviceCheck,
      renderEmailHelperCommandCard,
      getMessageThreads,
      getPartsUsedByWorkOrder
    }) {
      function renderWorkOrderCommandSummary(workOrder) {
        const linkedMessages = getMessageThreads().filter((thread) => thread.work_order_id === workOrder.id).length;
        const partsCount = (getPartsUsedByWorkOrder()[workOrder.id] || []).reduce((sum, row) => sum + (Number(row.quantity_used) || 0), 0);
        const safetyState = !workOrder.asset_id ? ["General", "No equipment safety check required", "neutral"] : hasCompletedSafetyDeviceCheck(workOrder) ? ["Checked", "Safety devices confirmed", "safe"] : ["Required", "Check E-stops, sensors, guards, and interlocks before completion", "danger"];
        const nextAction = workOrder.status === "completed" ? "Review history or create follow-up if needed" : workOrder.status === "blocked" ? "Resolve blocker or add current update" : workOrder.status === "in_progress" ? "Add update, parts, photos, or complete work" : "Assign owner or start work";
        return `
        <section class="work-command-summary">
          <button class="command-card status-${workOrder.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${statusLabel(workOrder.status)}</strong>
            <small>${escapeHtml(nextAction)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${escapeHtml(workOrder.assets?.name || "General item / area")}</strong>
            <small>${escapeHtml(workOrder.due_at ? `Due ${workOrder.due_at}` : "Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${escapeHtml(assignmentLabel(workOrder))}</strong>
            <small>${isVendorAssigned(workOrder) ? "Outside vendor" : "Internal assignment"}</small>
          </button>
          <button class="command-card safety-${safetyState[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${safetyState[0]}</strong>
            <small>${escapeHtml(safetyState[1])}</small>
          </button>
          ${renderEmailHelperCommandCard(workOrder)}
        </section>
      `;
      }
      return {
        renderWorkOrderCommandSummary
      };
    }
    window.MaintainOpsWorkCommandDisplay = {
      createWorkCommandDisplayHelpers
    };
  })();

  // src/render/missingWorkDetailDisplay.js
  (function() {
    function createMissingWorkDetailDisplayHelpers() {
      function renderMissingWorkOrderDetail() {
        return `
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `;
      }
      return {
        renderMissingWorkOrderDetail
      };
    }
    window.MaintainOpsMissingWorkDetailDisplay = {
      createMissingWorkDetailDisplayHelpers
    };
  })();

  // src/render/partSourceDisplay.js
  (function() {
    function createPartSourceDisplayHelpers({
      escapeHtml,
      getPartSources,
      getPartSuppliersReady
    }) {
      function renderPartSourceOptions() {
        const options = getPartSources();
        return `
        <datalist id="part-source-options">
          ${options.map((source) => `<option value="${escapeHtml(source)}"></option>`).join("")}
        </datalist>
      `;
      }
      function renderPartSourceManager() {
        const sources = getPartSources();
        return `
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${getPartSuppliersReady() ? `
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${sources.map((source) => `
                <form class="part-source-row" data-rename-part-source>
                  <input name="old_source" type="hidden" value="${escapeHtml(source)}">
                  <span>${escapeHtml(source)}</span>
                  <input name="new_source" list="part-source-options" value="${escapeHtml(source)}" aria-label="New source name for ${escapeHtml(source)}">
                  <button class="secondary-button" type="submit">Rename</button>
                </form>
              `).join("") || `<p class="muted">No sources have been added yet.</p>`}
            </div>
            <p class="error-text" id="part-source-error"></p>
          ` : `<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>`}
        </section>
      `;
      }
      return {
        renderPartSourceOptions,
        renderPartSourceManager
      };
    }
    window.MaintainOpsPartSourceDisplay = {
      createPartSourceDisplayHelpers
    };
  })();

  // src/render/assetCardDisplay.js
  (function() {
    function createAssetCardDisplayHelpers({
      escapeHtml,
      assetTypeLabel,
      getWorkOrders,
      getActiveAssetId,
      parentAssetFor,
      childAssetsFor
    }) {
      function renderAssetCard(asset) {
        const openWork = getWorkOrders().filter((workOrder) => workOrder.asset_id === asset.id && workOrder.status !== "completed").length;
        const parent = parentAssetFor(asset);
        const children = childAssetsFor(asset.id);
        return `
        <article class="asset-card asset-state-${asset.status} ${asset.id === getActiveAssetId() ? "selected" : ""}" data-asset-id="${asset.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${asset.status}">${escapeHtml(asset.status)}</span>
              <span class="chip">${escapeHtml(assetTypeLabel(asset.asset_type))}</span>
              ${asset.asset_code ? `<span class="chip">${escapeHtml(asset.asset_code)}</span>` : ""}
              ${asset.manufacturer ? `<span class="chip">${escapeHtml(asset.manufacturer)}</span>` : ""}
              ${asset.model ? `<span class="chip">${escapeHtml(asset.model)}</span>` : ""}
              ${asset.safety_devices_required === false ? `<span class="safety-check-note disabled">no safety devices identified</span>` : `<span class="safety-check-note">safety devices identified</span>`}
            </div>
            <h3>${escapeHtml(asset.name)}</h3>
            <p>${escapeHtml(asset.location || "No location set")}</p>
            ${parent ? `<p>Part of ${escapeHtml(parent.name)}</p>` : ""}
            ${children.length ? `<p>${children.length} linked item${children.length === 1 ? "" : "s"}</p>` : ""}
          </div>
          <span class="muted">${openWork} open work</span>
        </article>
      `;
      }
      return {
        renderAssetCard
      };
    }
    window.MaintainOpsAssetCardDisplay = {
      createAssetCardDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_financialDisplay = __toESM(require_financialDisplay());

  // src/render/procedureOptionsDisplay.js
  (function() {
    function createProcedureOptionsDisplayHelpers({
      escapeHtml,
      getProceduresReady,
      getProcedureTemplates
    }) {
      function renderProcedureOptions(selectedId = "") {
        if (!getProceduresReady()) return `<option value="">No procedure checklist</option>`;
        return `
        <option value="">No procedure checklist</option>
        ${getProcedureTemplates().map((template) => `<option value="${template.id}" ${template.id === selectedId ? "selected" : ""}>${escapeHtml(template.name)}</option>`).join("")}
      `;
      }
      return {
        renderProcedureOptions
      };
    }
    window.MaintainOpsProcedureOptionsDisplay = {
      createProcedureOptionsDisplayHelpers
    };
  })();

  // src/render/messageThreadLabelDisplay.js
  (function() {
    function createMessageThreadLabelDisplayHelpers({
      getLocations,
      getMessageThreadMembers,
      teamMemberName
    }) {
      function directThreadNames(thread) {
        const members = getMessageThreadMembers().filter((member) => member.thread_id === thread.id).map((member) => teamMemberName(member.user_id));
        return members.length ? members.join(", ") : "Direct message";
      }
      function messageThreadScopeLabel(thread) {
        if (thread.thread_type === "direct") return directThreadNames(thread);
        if (thread.thread_type === "location") return getLocations().find((location) => location.id === thread.location_id)?.name || "Location thread";
        return "Whole company";
      }
      return {
        directThreadNames,
        messageThreadScopeLabel
      };
    }
    window.MaintainOpsMessageThreadLabelDisplay = {
      createMessageThreadLabelDisplayHelpers
    };
  })();

  // src/render/messageThreadButtonDisplay.js
  (function() {
    function createMessageThreadButtonDisplayHelpers({
      escapeHtml,
      formatMessageTime,
      teamMemberName,
      messageThreadScopeLabel,
      unreadMessageCount,
      getMessagesByThreadId,
      getActiveMessageThreadId
    }) {
      function renderMessageThreadButton(thread) {
        const messages = getMessagesByThreadId()[thread.id] || [];
        const visibleMessages = messages.filter((message) => !message.deleted_at);
        const lastMessage = visibleMessages[visibleMessages.length - 1];
        const unreadCount = unreadMessageCount(thread.id);
        const lastMessageBody = lastMessage?.body ? `${escapeHtml(teamMemberName(lastMessage.sender_id))}: ${escapeHtml(lastMessage.body)}` : "Last activity";
        const lastMessageText = lastMessage ? `${lastMessageBody} - ${escapeHtml(formatMessageTime(lastMessage.created_at))}` : "No messages yet";
        return `
        <button class="message-thread-button ${thread.id === getActiveMessageThreadId() ? "active" : ""}" data-message-thread="${thread.id}" type="button">
          <strong>${escapeHtml(thread.title)}${unreadCount ? `<span class="message-unread-pill">${unreadCount}</span>` : ""}</strong>
          <span>${escapeHtml(messageThreadScopeLabel(thread))}</span>
          <small>${lastMessageText}</small>
        </button>
      `;
      }
      return {
        renderMessageThreadButton
      };
    }
    window.MaintainOpsMessageThreadButtonDisplay = {
      createMessageThreadButtonDisplayHelpers
    };
  })();

  // src/render/messageComposerDisplay.js
  (function() {
    function createMessageComposerDisplayHelpers({
      activeLocationName
    }) {
      function messageComposerScopeNote(threadType) {
        if (threadType === "direct") return "Only you and the selected teammate will see this thread.";
        if (threadType === "location") return `Visible to company members. Tagged to ${activeLocationName()}.`;
        return "Visible to everyone in this company.";
      }
      return {
        messageComposerScopeNote
      };
    }
    window.MaintainOpsMessageComposerDisplay = {
      createMessageComposerDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_appIssuePanelDisplay = __toESM(require_appIssuePanelDisplay());

  // src/render/inviteLocationDisplay.js
  (function() {
    function createInviteLocationDisplayHelpers({
      getLocations
    }) {
      function inviteDefaultLocationLabel(invite) {
        const location = getLocations().find((item) => item.id === invite.default_location_id);
        return location ? `Default location: ${location.name}` : "Default location: first available";
      }
      return {
        inviteDefaultLocationLabel
      };
    }
    window.MaintainOpsInviteLocationDisplay = {
      createInviteLocationDisplayHelpers
    };
  })();

  // src/render/partSetupDisplay.js
  (function() {
    function createPartSetupDisplayHelpers({
      getPartCostsReady,
      getPartSuppliersReady,
      getPartMachineNotesReady
    }) {
      function partSetupMessage() {
        const messages = [];
        if (!getPartCostsReady()) messages.push("Run supabase/step-next-part-costs.sql before saving unit costs.");
        if (!getPartSuppliersReady()) messages.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names.");
        if (getPartMachineNotesReady && !getPartMachineNotesReady()) messages.push("Run supabase/step-next-part-machine-note.sql before saving machine notes.");
        return messages.join(" ");
      }
      return {
        partSetupMessage
      };
    }
    window.MaintainOpsPartSetupDisplay = {
      createPartSetupDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_teamMemberDisplay = __toESM(require_teamMemberDisplay());

  // src/render/teamWorkloadDisplay.js
  (function() {
    function createTeamWorkloadDisplayHelpers(deps) {
      function teamMemberWorkload(userId) {
        const workOrders = deps.getWorkOrders();
        const assigned = workOrders.filter((workOrder) => deps.matchesActiveLocation(workOrder) && workOrder.assigned_to === userId);
        return {
          newWork: assigned.filter((workOrder) => workOrder.status === "open").length,
          inProgress: assigned.filter((workOrder) => workOrder.status === "in_progress").length,
          blocked: assigned.filter((workOrder) => workOrder.status === "blocked").length,
          overdue: assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length
        };
      }
      return {
        teamMemberWorkload
      };
    }
    window.MaintainOpsTeamWorkloadDisplay = {
      createTeamWorkloadDisplayHelpers
    };
  })();

  // src/render/locationDisplay.js
  (function() {
    function createLocationDisplayHelpers(deps) {
      function activeLocationName() {
        return deps.getLocations().find((location) => location.id === deps.getActiveLocationId())?.name || "Location";
      }
      return {
        activeLocationName
      };
    }
    window.MaintainOpsLocationDisplay = {
      createLocationDisplayHelpers
    };
  })();

  // src/render/downtimeEmailDisplay.js
  (function() {
    function createDowntimeEmailDisplayHelpers(deps) {
      function assetNameForWorkOrder(workOrder) {
        return workOrder.assets?.name || "Equipment";
      }
      function downtimeEmailSubject(workOrder) {
        return `Machine Down Update - ${assetNameForWorkOrder(workOrder)} - ${(/* @__PURE__ */ new Date()).toLocaleString()}`;
      }
      function downtimeEmailBody(workOrder) {
        const assetName = assetNameForWorkOrder(workOrder);
        const eta = workOrder.due_at ? `known, target ${deps.formatDate(workOrder.due_at)}` : "unknown at this time";
        const assignedTo = deps.assignmentLabel(workOrder);
        const issue = deps.cleanWorkOrderDescription(workOrder.description) || workOrder.title;
        const currentUpdate = workOrder.resolution_summary || workOrder.failure_cause || workOrder.completion_notes || "No additional update has been entered yet.";
        return [
          `${assetName} is down or needs maintenance attention. At this time, the expected downtime is ${eta}. We will update the team as more information becomes available.`,
          "",
          "Technical details:",
          `Issue: ${issue}`,
          `Work order: ${workOrder.title}`,
          `Equipment: ${assetName}`,
          `Current update: ${currentUpdate}`,
          `Assigned to: ${assignedTo}`,
          `Priority: ${workOrder.priority || "medium"}`,
          `ETA / due date: ${workOrder.due_at ? deps.formatDate(workOrder.due_at) : "Unknown"}`
        ].join("\n");
      }
      return {
        downtimeEmailSubject,
        downtimeEmailBody
      };
    }
    window.MaintainOpsDowntimeEmailDisplay = {
      createDowntimeEmailDisplayHelpers
    };
  })();

  // src/render/setupErrorDisplay.js
  (function() {
    function createSetupErrorDisplayHelpers() {
      function equipmentSchemaMessage(error) {
        const message = error?.message || "";
        if (message.includes("assets_asset_type_check") || message.includes("asset_type")) {
          return "Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.";
        }
        return "Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy.";
      }
      function databaseSetupRequiredMessage(area = "this save") {
        return `Database update required before ${area}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`;
      }
      return {
        equipmentSchemaMessage,
        databaseSetupRequiredMessage
      };
    }
    window.MaintainOpsSetupErrorDisplay = {
      createSetupErrorDisplayHelpers
    };
  })();

  // src/render/workOrderErrorDisplay.js
  (function() {
    function createWorkOrderErrorDisplayHelpers() {
      function friendlyWorkOrderSaveError(error) {
        const message = error?.message || "Unknown error";
        if (message.includes("work_orders_company_assigned_profile_fkey")) {
          return "The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.";
        }
        if (message.includes("row-level security")) {
          return "Supabase permissions rejected this update. Make sure you are still a member of this company.";
        }
        return message;
      }
      return {
        friendlyWorkOrderSaveError
      };
    }
    window.MaintainOpsWorkOrderErrorDisplay = {
      createWorkOrderErrorDisplayHelpers
    };
  })();

  // src/render/assignmentDisplay.js
  (function() {
    function createAssignmentDisplayHelpers(deps) {
      function assignmentLabel(workOrder) {
        if (deps.isVendorAssigned(workOrder)) return "Outside vendor";
        return workOrder.assigned_profile?.full_name || "Unassigned";
      }
      return {
        assignmentLabel
      };
    }
    window.MaintainOpsAssignmentDisplay = {
      createAssignmentDisplayHelpers
    };
  })();

  // src/render/workOrderDescriptionDisplay.js
  (function() {
    function createWorkOrderDescriptionDisplayHelpers(deps) {
      function cleanWorkOrderDescription(description) {
        return String(description || "").replace(deps.OUTSIDE_VENDOR_NOTE, "").replace(/\n{3,}/g, "\n\n").trim();
      }
      function descriptionWithAssignmentNote(description, assignmentValue) {
        const cleanDescription = cleanWorkOrderDescription(description);
        if (assignmentValue !== deps.OUTSIDE_VENDOR_VALUE) return cleanDescription || null;
        return [cleanDescription, deps.OUTSIDE_VENDOR_NOTE].filter(Boolean).join("\n\n");
      }
      function descriptionWithRequestPhotoNote(description, request) {
        const cleanDescription = String(description || "").trim();
        if (!request?.photo_storage_path) return cleanDescription || null;
        const note = "[Request photo attached to original request]";
        return cleanDescription ? `${cleanDescription}

${note}` : note;
      }
      return {
        cleanWorkOrderDescription,
        descriptionWithAssignmentNote,
        descriptionWithRequestPhotoNote
      };
    }
    window.MaintainOpsWorkOrderDescriptionDisplay = {
      createWorkOrderDescriptionDisplayHelpers
    };
  })();

  // src/render/workOrderChangeDisplay.js
  (function() {
    function createWorkOrderChangeDisplayHelpers() {
      function describeWorkOrderChanges(previous, next) {
        if (!previous) return "Work order updated.";
        const changes = [];
        if (previous.title !== next.title) changes.push("title");
        if ((previous.description || "") !== (next.description || "")) changes.push("description");
        if ((previous.due_at || "") !== (next.due_at || "")) changes.push("due date");
        if (previous.priority !== next.priority) changes.push("priority");
        if ((previous.type || "reactive") !== next.type) changes.push("type");
        if ((previous.assigned_to || "") !== (next.assigned_to || "")) changes.push("assignment");
        if ((previous.procedure_template_id || "") !== (next.procedure_template_id || "")) changes.push("procedure");
        if (String(previous.actual_minutes || 0) !== String(next.actual_minutes || 0)) changes.push("actual minutes");
        return changes.length ? `Updated ${changes.join(", ")}.` : "Work order saved.";
      }
      return {
        describeWorkOrderChanges
      };
    }
    window.MaintainOpsWorkOrderChangeDisplay = {
      createWorkOrderChangeDisplayHelpers
    };
  })();

  // src/render/activityFeedDisplay.js
  (function() {
    function createActivityFeedDisplayHelpers() {
      function buildActivityFeed(comments, photos, events, usedParts = []) {
        return [
          ...comments.map((comment) => ({ ...comment, type: "comment" })),
          ...photos.map((photo) => ({ ...photo, type: "photo" })),
          ...usedParts.map((part) => ({ ...part, type: "part" })),
          ...events.map((event) => ({ ...event, type: "event" }))
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      return {
        buildActivityFeed
      };
    }
    window.MaintainOpsActivityFeedDisplay = {
      createActivityFeedDisplayHelpers
    };
  })();

  // src/render/partInventoryDisplay.js
  (function() {
    function createPartInventoryDisplayHelpers(deps) {
      function isLowStockPart(part) {
        return Number(part.quantity_on_hand) <= Number(part.reorder_point);
      }
      function lowStockParts() {
        return deps.getParts().filter(isLowStockPart);
      }
      function matchesPartSearch(values) {
        const query = deps.getPartSearchQuery().trim().toLowerCase();
        if (!query) return true;
        return values.some((value) => String(value ?? "").toLowerCase().includes(query));
      }
      function filteredParts() {
        const rows = deps.getParts().filter((part) => {
          if (!deps.matchesActiveLocation(part)) return false;
          if (deps.getPartInventoryFilter() === "low" && !isLowStockPart(part)) return false;
          return matchesPartSearch([
            part.name,
            part.sku,
            part.supplier_name,
            part.machine_note,
            part.quantity_on_hand,
            part.reorder_point,
            part.unit_cost
          ]);
        });
        if (deps.getPartSort && deps.getPartSort() === "source") {
          return [...rows].sort((a, b) => {
            const sourceCompare = String(a.supplier_name || "zzzzzz").localeCompare(String(b.supplier_name || "zzzzzz"), void 0, { sensitivity: "base" });
            if (sourceCompare) return sourceCompare;
            return String(a.name || "").localeCompare(String(b.name || ""), void 0, { sensitivity: "base" });
          });
        }
        return rows;
      }
      function partSourceOptions() {
        return [...new Set(deps.getParts().filter(deps.matchesActiveLocation).map((part) => String(part.supplier_name || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
      }
      return {
        isLowStockPart,
        lowStockParts,
        filteredParts,
        matchesPartSearch,
        partSourceOptions
      };
    }
    window.MaintainOpsPartInventoryDisplay = {
      createPartInventoryDisplayHelpers
    };
  })();

  // src/render/partUsageDisplay.js
  (function() {
    function createPartUsageDisplayHelpers(deps) {
      function partUsageRows(partId) {
        return Object.values(deps.getPartsUsedByWorkOrder()).flat().filter((row) => row.part_id === partId);
      }
      return {
        partUsageRows
      };
    }
    window.MaintainOpsPartUsageDisplay = {
      createPartUsageDisplayHelpers
    };
  })();

  // src/render/requestQueueDisplay.js
  (function() {
    function createRequestQueueDisplayHelpers(deps) {
      function openMaintenanceRequests() {
        return deps.getMaintenanceRequests().filter((request) => request.status === "submitted");
      }
      function requestMatchesBaseFilters(request) {
        return deps.matchesActiveLocation(request) && deps.matchesSearch([
          request.title,
          request.description,
          request.status,
          request.priority,
          request.assets?.name,
          deps.getProfilesByUserId()[request.requested_by]?.full_name
        ]);
      }
      function isConvertedRequest(request) {
        return request.status === "converted" || Boolean(request.converted_work_order_id);
      }
      function requestMatchesViewFilter(request, filter = deps.getRequestViewFilter()) {
        if (filter === "converted") return isConvertedRequest(request);
        if (filter === "all") return true;
        return !isConvertedRequest(request) && request.status === "submitted";
      }
      function filteredRequests(filter = deps.getRequestViewFilter()) {
        return deps.getMaintenanceRequests().filter((request) => requestMatchesBaseFilters(request) && requestMatchesViewFilter(request, filter));
      }
      function requestFilterCounts() {
        return deps.getRequestDashboardCounts() || { active: 0, converted: 0, all: 0 };
      }
      return {
        openMaintenanceRequests,
        requestMatchesBaseFilters,
        isConvertedRequest,
        requestMatchesViewFilter,
        filteredRequests,
        requestFilterCounts
      };
    }
    window.MaintainOpsRequestQueueDisplay = {
      createRequestQueueDisplayHelpers
    };
  })();

  // src/render/deleteBlockerDisplay.js
  (function() {
    function createDeleteBlockerDisplayHelpers() {
      function assetDeleteBlockerMessage(blockers) {
        const parts = [
          blockers.workOrders ? `${blockers.workOrders} work order${blockers.workOrders === 1 ? "" : "s"}` : "",
          blockers.children ? `${blockers.children} linked equipment item${blockers.children === 1 ? "" : "s"}` : "",
          blockers.schedules ? `${blockers.schedules} PM schedule${blockers.schedules === 1 ? "" : "s"}` : "",
          blockers.requests ? `${blockers.requests} request${blockers.requests === 1 ? "" : "s"}` : ""
        ].filter(Boolean);
        return parts.length ? `This equipment is kept for traceability because it has ${parts.join(", ")}.` : "";
      }
      function procedureDeleteBlockerMessage(blockers) {
        const parts = [
          blockers.workOrders ? `${blockers.workOrders} work order${blockers.workOrders === 1 ? "" : "s"}` : "",
          blockers.schedules ? `${blockers.schedules} PM schedule${blockers.schedules === 1 ? "" : "s"}` : ""
        ].filter(Boolean);
        return parts.length ? `This procedure is kept for traceability because it is linked to ${parts.join(", ")}.` : "";
      }
      return {
        assetDeleteBlockerMessage,
        procedureDeleteBlockerMessage
      };
    }
    window.MaintainOpsDeleteBlockerDisplay = {
      createDeleteBlockerDisplayHelpers
    };
  })();

  // src/render/assetHierarchyDisplay.js
  (function() {
    function createAssetHierarchyDisplayHelpers(deps) {
      function parentAssetFor(asset) {
        return deps.getAssets().find((item) => item.id === asset?.parent_asset_id) || null;
      }
      function childAssetsFor(assetId) {
        return deps.getAssets().filter((asset) => asset.parent_asset_id === assetId).sort((a, b) => a.name.localeCompare(b.name));
      }
      function isAssetDescendantOf(assetId, ancestorId) {
        if (!assetId || !ancestorId) return false;
        let current = deps.getAssets().find((asset) => asset.id === assetId);
        const seen = /* @__PURE__ */ new Set();
        while (current?.parent_asset_id && !seen.has(current.id)) {
          if (current.parent_asset_id === ancestorId) return true;
          seen.add(current.id);
          current = deps.getAssets().find((asset) => asset.id === current.parent_asset_id);
        }
        return false;
      }
      function filteredAssets() {
        return deps.getAssets().filter((asset) => {
          if (!deps.matchesActiveLocation(asset)) return false;
          if (deps.getAssetStatusFilter() !== "all" && asset.status !== deps.getAssetStatusFilter()) return false;
          if (deps.getAssetTypeFilter && deps.getAssetTypeFilter() !== "all" && (asset.asset_type || "machine") !== deps.getAssetTypeFilter()) return false;
          if (deps.getAssetAreaFilter && deps.getAssetAreaFilter() !== "all" && (asset.location || "") !== deps.getAssetAreaFilter()) return false;
          return deps.matchesSearch([
            asset.name,
            asset.asset_code,
            asset.manufacturer,
            asset.model,
            asset.location,
            asset.status,
            asset.asset_type,
            parentAssetFor(asset)?.name
          ]);
        });
      }
      return {
        filteredAssets,
        parentAssetFor,
        childAssetsFor,
        isAssetDescendantOf
      };
    }
    window.MaintainOpsAssetHierarchyDisplay = {
      createAssetHierarchyDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_maintenanceListDisplay = __toESM(require_maintenanceListDisplay());

  // src/render/searchFilterDisplay.js
  (function() {
    function createSearchFilterDisplayHelpers(deps) {
      function matchesSearch(values) {
        const query = deps.getSearchQuery().trim().toLowerCase();
        if (!query) return true;
        return values.some((value) => String(value ?? "").toLowerCase().includes(query));
      }
      function matchesQuery(values, query = deps.getSearchQuery()) {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return true;
        return values.some((value) => String(value ?? "").toLowerCase().includes(normalized));
      }
      return {
        matchesSearch,
        matchesQuery
      };
    }
    window.MaintainOpsSearchFilterDisplay = {
      createSearchFilterDisplayHelpers
    };
  })();

  // src/render/workOrderSortDisplay.js
  (function() {
    function createWorkOrderSortDisplayHelpers(deps) {
      function dueSortValue(workOrder) {
        if (!workOrder.due_at) return Number.MAX_SAFE_INTEGER;
        return (/* @__PURE__ */ new Date(`${workOrder.due_at}T00:00:00`)).getTime();
      }
      function prioritySortValue(priority) {
        return { low: 1, medium: 2, high: 3, critical: 4 }[priority] || 0;
      }
      function completedSortValue(workOrder) {
        return workOrder.completed_at ? new Date(workOrder.completed_at).getTime() : 0;
      }
      function assigneeSortLabel(workOrder) {
        if (typeof deps.assignmentLabel === "function") {
          return deps.assignmentLabel(workOrder);
        }
        return workOrder.assigned_profile?.full_name || workOrder.assigned_to || "Unassigned";
      }
      function compareWorkOrders(a, b) {
        if (["completed", "completed_month", "completed_week"].includes(deps.getActiveStatusFilter())) {
          return completedSortValue(b) - completedSortValue(a) || new Date(b.created_at) - new Date(a.created_at);
        }
        if (deps.getWorkSort() === "due") {
          return dueSortValue(a) - dueSortValue(b) || new Date(b.created_at) - new Date(a.created_at);
        }
        if (deps.getWorkSort() === "priority") {
          return prioritySortValue(b.priority) - prioritySortValue(a.priority) || dueSortValue(a) - dueSortValue(b);
        }
        if (deps.getWorkSort() === "assigned") {
          return assigneeSortLabel(a).localeCompare(assigneeSortLabel(b)) || new Date(b.created_at) - new Date(a.created_at);
        }
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return {
        compareWorkOrders,
        dueSortValue,
        prioritySortValue,
        completedSortValue,
        assigneeSortLabel
      };
    }
    window.MaintainOpsWorkOrderSortDisplay = {
      createWorkOrderSortDisplayHelpers
    };
  })();

  // src/render/locationFilterDisplay.js
  (function() {
    function createLocationFilterDisplayHelpers(deps) {
      function recordLocationId(record) {
        return record?.location_id || record?.assets?.location_id || null;
      }
      function matchesActiveLocation(record) {
        if (!deps.getLocationsReady() || !deps.getActiveLocationId()) return true;
        return recordLocationId(record) === deps.getActiveLocationId();
      }
      return {
        recordLocationId,
        matchesActiveLocation
      };
    }
    window.MaintainOpsLocationFilterDisplay = {
      createLocationFilterDisplayHelpers
    };
  })();

  // src/render/messageThreadFilterDisplay.js
  (function() {
    function createMessageThreadFilterDisplayHelpers(deps) {
      function recentMessageLinkWorkOrders() {
        return deps.getWorkOrders().filter((workOrder) => deps.matchesActiveLocation(workOrder) && workOrder.status !== "completed").slice(0, 8);
      }
      function filteredMessageThreads() {
        const messageThreadFilter = deps.getMessageThreadFilter();
        return deps.getMessageThreads().filter((thread) => {
          const filterMatch = messageThreadFilter === "all" || messageThreadFilter === "unread" && unreadMessageCount(thread.id) > 0 || thread.thread_type === messageThreadFilter;
          return filterMatch && deps.matchesQuery(messageThreadSearchValues(thread), deps.getMessageSearchQuery());
        });
      }
      function messageThreadSearchValues(thread) {
        const messages = deps.getMessagesByThreadId()[thread.id] || [];
        const participants = deps.getMessageThreadMembers().filter((member) => member.thread_id === thread.id).map((member) => deps.teamMemberName(member.user_id));
        return [
          thread.title,
          deps.messageThreadScopeLabel(thread),
          ...participants,
          ...messages.map((message) => message.body || "")
        ];
      }
      function unreadMessageCount(threadId) {
        const lastReadAt = deps.getMessageReadsByThreadId()[threadId]?.last_read_at;
        const lastReadTime = lastReadAt ? new Date(lastReadAt).getTime() : 0;
        return (deps.getMessagesByThreadId()[threadId] || []).filter((message) => {
          if (message.sender_id === deps.getCurrentUser()?.id) return false;
          return new Date(message.created_at).getTime() > lastReadTime;
        }).length;
      }
      function totalUnreadMessages() {
        return deps.getMessageThreads().reduce((total, thread) => total + unreadMessageCount(thread.id), 0);
      }
      function directUnreadMessages() {
        return deps.getMessageThreads().filter((thread) => thread.thread_type === "direct").reduce((total, thread) => total + unreadMessageCount(thread.id), 0);
      }
      return {
        recentMessageLinkWorkOrders,
        filteredMessageThreads,
        messageThreadSearchValues,
        unreadMessageCount,
        totalUnreadMessages,
        directUnreadMessages
      };
    }
    window.MaintainOpsMessageThreadFilterDisplay = {
      createMessageThreadFilterDisplayHelpers
    };
  })();

  // src/render/setupStatusDisplay.js
  (function() {
    function createSetupStatusDisplayHelpers(deps) {
      function setupItems() {
        return [
          {
            name: "Supabase config",
            ready: Boolean(deps.getSupabaseUrl() && deps.getSupabaseAnonKey()),
            detail: deps.getSupabaseUrl() || "Missing supabase-config.js"
          },
          {
            name: "Company data",
            ready: Boolean(deps.getActiveCompanyId()),
            detail: deps.getActiveCompanyId() ? "Active tenant selected" : "Create or select a company"
          },
          {
            name: "Requests",
            ready: deps.getRequestsReady(),
            detail: deps.getRequestsReady() ? "Stored in maintenance_requests" : "Run step-next-maintenance-requests.sql"
          },
          {
            name: "Public request QR links",
            ready: deps.getPublicRequestLinksReady(),
            detail: deps.getPublicRequestLinksReady() ? "External location intake is available" : "Run step-next-public-request-links.sql"
          },
          {
            name: "Preventive schedules",
            ready: deps.getSchedulesReady(),
            detail: deps.getSchedulesReady() ? "PM schedules available" : "Run step-next-preventive-schedules.sql"
          },
          {
            name: "Procedure Checklists",
            ready: deps.getProceduresReady(),
            detail: deps.getProceduresReady() ? "Procedure checklists available" : "Run step-next-procedures.sql"
          },
          {
            name: "Part costs",
            ready: deps.getPartCostsReady(),
            detail: deps.getPartCostsReady() ? "Unit costs available" : "Run step-next-part-costs.sql"
          },
          {
            name: "Part sources",
            ready: deps.getPartSuppliersReady(),
            detail: deps.getPartSuppliersReady() ? "Vendor/source names available" : "Run step-next-part-suppliers.sql"
          },
          {
            name: "Part files",
            ready: deps.getPartDocumentsReady(),
            detail: deps.getPartDocumentsReady() ? "Receipts and invoices can be filed with parts" : "Run step-next-part-documents.sql"
          },
          {
            name: "App issue reports",
            ready: deps.getAppIssueReportsReady(),
            detail: deps.getAppIssueReportsReady() ? "Live tester feedback can be captured" : "Run step-next-app-issue-reports.sql"
          },
          {
            name: "Message center",
            ready: deps.getMessagesReady(),
            detail: deps.getMessagesReady() ? "Company, location, and direct message threads available" : "Run step-next-message-center.sql"
          },
          {
            name: "Message work links",
            ready: deps.getMessageWorkOrderLinksReady(),
            detail: deps.getMessageWorkOrderLinksReady() ? "Message threads can link back to work orders" : "Run step-next-message-work-order-links.sql"
          },
          {
            name: "Work outcomes",
            ready: deps.getOutcomesReady(),
            detail: deps.getOutcomesReady() ? "Cause/resolution/follow-up available" : "Run step-next-work-order-outcomes.sql"
          },
          {
            name: "Safety checks",
            ready: deps.getSafetyChecksReady(),
            detail: deps.getSafetyChecksReady() ? "Asset safety check completion available" : "Run step-next-safety-checks.sql"
          },
          {
            name: "Admin delete protection",
            ready: deps.getAdminDeleteSqlConfirmed(),
            detail: deps.getAdminDeleteSqlConfirmed() ? "Admin-only delete SQL marked applied" : "Run step-next-admin-delete-work-orders.sql, then mark it applied",
            action: deps.getAdminDeleteSqlConfirmed() ? "" : "confirm-admin-delete-sql",
            actionLabel: "Mark SQL Applied"
          },
          {
            name: "Photos",
            ready: deps.getPhotosReady(),
            detail: deps.getPhotosReady() ? "Photo records available" : "Check storage bucket and photo table policies"
          }
        ];
      }
      return { setupItems };
    }
    window.MaintainOpsSetupStatusDisplay = {
      createSetupStatusDisplayHelpers
    };
  })();

  // src/render/workOrderStatusFilterDisplay.js
  (function() {
    function createWorkOrderStatusFilterDisplayHelpers(deps) {
      function workOrderMatchesStatusFilter(workOrder) {
        const activeStatusFilter = deps.getActiveStatusFilter();
        if (activeStatusFilter === "overdue") return deps.getDueState(workOrder)?.className === "overdue";
        if (activeStatusFilter === "completed_month") return deps.isCompletedThisMonth(workOrder);
        if (activeStatusFilter === "completed_week") return deps.isCompletedThisWeek(workOrder);
        if (activeStatusFilter === "active" || activeStatusFilter === "all") return workOrder.status !== "completed";
        return workOrder.status === activeStatusFilter;
      }
      return {
        workOrderMatchesStatusFilter
      };
    }
    window.MaintainOpsWorkOrderStatusFilterDisplay = {
      createWorkOrderStatusFilterDisplayHelpers
    };
  })();

  // src/render/workOrderSearchDisplay.js
  (function() {
    function createWorkOrderSearchDisplayHelpers(deps) {
      function workOrderSearchValues(workOrder) {
        const usedParts = deps.getPartsUsedByWorkOrder()[workOrder.id] || [];
        const comments = deps.getCommentsByWorkOrder()[workOrder.id] || [];
        const events = deps.getEventsByWorkOrder()[workOrder.id] || [];
        const photos = deps.getPhotosByWorkOrder()[workOrder.id] || [];
        const procedure = deps.getProcedureTemplates().find((template) => template.id === workOrder.procedure_template_id);
        const stepResults = Object.values(deps.getStepResultsByWorkOrder()[workOrder.id] || {});
        const profilesByUserId = deps.getProfilesByUserId();
        return [
          workOrder.title,
          workOrder.description,
          workOrder.status,
          deps.statusLabel(workOrder.status),
          workOrder.priority,
          workOrder.type,
          workOrder.assets?.name,
          deps.assignmentLabel(workOrder),
          workOrder.failure_cause,
          workOrder.resolution_summary,
          workOrder.completion_notes,
          workOrder.current_update,
          procedure?.name,
          procedure?.description,
          ...(procedure?.procedure_steps || []).flatMap((step) => [step.prompt, step.step_type]),
          ...usedParts.flatMap((row) => [
            row.parts?.name,
            row.parts?.sku,
            row.parts?.supplier_name,
            row.quantity_used,
            row.unit_cost
          ]),
          ...comments.flatMap((comment) => [
            comment.body,
            profilesByUserId[comment.author_id]?.full_name
          ]),
          ...events.flatMap((event) => [
            event.event_type,
            event.summary,
            profilesByUserId[event.actor_id]?.full_name
          ]),
          ...photos.flatMap((photo) => [
            photo.file_name,
            photo.original_file_name,
            photo.content_type
          ]),
          ...stepResults.flatMap((result) => [
            result.value,
            result.notes
          ])
        ];
      }
      return {
        workOrderSearchValues
      };
    }
    window.MaintainOpsWorkOrderSearchDisplay = {
      createWorkOrderSearchDisplayHelpers
    };
  })();

  // src/render/myWorkQueueDisplay.js
  (function() {
    function createMyWorkQueueDisplayHelpers(deps) {
      function myWorkQueueOrders() {
        const currentUserId = deps.getCurrentUser()?.id;
        return deps.getWorkOrders().filter((workOrder) => {
          if (!deps.matchesActiveLocation(workOrder)) return false;
          const queueMatch = deps.getMyWorkFilter() === "created" ? workOrder.created_by === currentUserId : workOrder.assigned_to === currentUserId;
          return queueMatch && deps.matchesSearch(deps.workOrderSearchValues(workOrder));
        });
      }
      return {
        myWorkQueueOrders
      };
    }
    window.MaintainOpsMyWorkQueueDisplay = {
      createMyWorkQueueDisplayHelpers
    };
  })();

  // src/render/messageCenterErrorDisplay.js
  (function() {
    function createMessageCenterErrorDisplayHelpers(deps) {
      function messageCenterErrorState(error) {
        if (deps.isMissingColumnError(error, "work_order_id")) {
          return {
            message: "Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",
            messagesReady: null
          };
        }
        if (deps.isColumnSchemaError(error, ["message_threads", "message_thread_members", "messages"]) || String(error?.message || "").includes("message_threads")) {
          return {
            message: "Run supabase/step-next-message-center.sql before using Messages.",
            messagesReady: false
          };
        }
        return {
          message: error?.message || String(error),
          messagesReady: null
        };
      }
      return {
        messageCenterErrorState
      };
    }
    window.MaintainOpsMessageCenterErrorDisplay = {
      createMessageCenterErrorDisplayHelpers
    };
  })();

  // src/render/appIssueErrorDisplay.js
  (function() {
    function createAppIssueErrorDisplayHelpers(deps) {
      function appIssueReportErrorState(error) {
        if (deps.isColumnSchemaError(error, ["app_issue_reports"]) || String(error?.message || "").includes("app_issue_reports")) {
          return {
            message: "Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",
            appIssueReportsReady: false
          };
        }
        return {
          message: error?.message || String(error),
          appIssueReportsReady: null
        };
      }
      return {
        appIssueReportErrorState
      };
    }
    window.MaintainOpsAppIssueErrorDisplay = {
      createAppIssueErrorDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_workOrderDetailDisplay = __toESM(require_workOrderDetailDisplay());
  var import_equipmentStructureGuideDisplay = __toESM(require_equipmentStructureGuideDisplay());
  var import_assetDetailDisplay = __toESM(require_assetDetailDisplay());
  var import_messageCenterDisplay = __toESM(require_messageCenterDisplay());
  var import_createWorkOrderDisplay = __toESM(require_createWorkOrderDisplay());
  var import_quickFixDisplay = __toESM(require_quickFixDisplay());

  // src/render/managerDashboardDisplay.js
  (function() {
    function createManagerDashboardDisplayHelpers(deps) {
      const dayMs = 24 * 60 * 60 * 1e3;
      const summaryUserId = "__summary__";
      function todayStart() {
        const date = /* @__PURE__ */ new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
      function daysAgo(days) {
        return new Date(todayStart().getTime() - days * dayMs);
      }
      function isCompletedSince(workOrder, cutoff) {
        return Boolean(workOrder.completed_at && new Date(workOrder.completed_at) >= cutoff);
      }
      function ageDays(workOrder) {
        const created = new Date(workOrder.created_at || Date.now()).getTime();
        if (!Number.isFinite(created)) return 0;
        return Math.max(0, Math.round((Date.now() - created) / dayMs));
      }
      function priorityRank(priority) {
        return { critical: 4, high: 3, medium: 2, low: 1 }[String(priority || "").toLowerCase()] || 0;
      }
      function isCriticalOpen(workOrder) {
        return workOrder.status !== "completed" && priorityRank(workOrder.priority) >= 4;
      }
      function isHighPriorityOpen(workOrder) {
        return workOrder.status !== "completed" && priorityRank(workOrder.priority) >= 3;
      }
      function isStaleOpen(workOrder) {
        return workOrder.status !== "completed" && ageDays(workOrder) >= 7;
      }
      function needsFollowUp(workOrder) {
        return workOrder.status !== "completed" && Boolean(workOrder.follow_up_needed);
      }
      function openWorkOrders() {
        return deps.getWorkOrders().filter((workOrder) => deps.matchesActiveLocation(workOrder) && workOrder.status !== "completed");
      }
      function completedWorkOrders() {
        const rowsById = /* @__PURE__ */ new Map();
        const loadedRows = [
          ...deps.getWorkOrders(),
          ...typeof deps.getManagerCompletedWorkOrders === "function" ? deps.getManagerCompletedWorkOrders() : []
        ];
        loadedRows.forEach((workOrder) => {
          if (workOrder?.id && deps.matchesActiveLocation(workOrder) && workOrder.status === "completed") {
            rowsById.set(workOrder.id, workOrder);
          }
        });
        return [...rowsById.values()];
      }
      function activeRequests() {
        return deps.getMaintenanceRequests().filter((request) => deps.matchesActiveLocation(request) && !deps.isConvertedRequest(request) && request.status === "submitted");
      }
      function convertedRequests() {
        return deps.getMaintenanceRequests().filter((request) => deps.matchesActiveLocation(request) && deps.isConvertedRequest(request));
      }
      function equipmentRows() {
        return (typeof deps.getAssets === "function" ? deps.getAssets() : []).filter(deps.matchesActiveLocation);
      }
      function preventiveRows() {
        return (typeof deps.getPreventiveSchedules === "function" ? deps.getPreventiveSchedules() : []).filter(deps.matchesActiveLocation);
      }
      function assignedOpenWork(userId) {
        return openWorkOrders().filter((workOrder) => workOrder.assigned_to === userId);
      }
      function completedOwnerId(workOrder) {
        return workOrder.completed_by || workOrder.assigned_to || workOrder.created_by || "";
      }
      function completedOwnerLabel(workOrder) {
        const ownerId = completedOwnerId(workOrder);
        return ownerId ? deps.teamMemberName(ownerId) : "Completion owner unknown";
      }
      function requestAgeDays(request) {
        const created = new Date(request.created_at || Date.now()).getTime();
        if (!Number.isFinite(created)) return 0;
        return Math.max(0, Math.round((Date.now() - created) / dayMs));
      }
      function isStaleRequest(request) {
        return requestAgeDays(request) >= 2;
      }
      function requestConvertedByLabel(request) {
        const userId = request.converted_by || request.created_by || "";
        return userId ? deps.teamMemberName(userId) : "Converter not recorded";
      }
      function dateOnly(value) {
        if (!value) return null;
        const date = /* @__PURE__ */ new Date(`${String(value).slice(0, 10)}T00:00:00`);
        return Number.isFinite(date.getTime()) ? date : null;
      }
      function scheduleDueState(schedule) {
        const due = dateOnly(schedule.next_due_at || schedule.due_at);
        if (!due) return "unscheduled";
        const days = Math.round((due.getTime() - todayStart().getTime()) / dayMs);
        if (days < 0) return "overdue";
        if (days <= 7) return "due_soon";
        return "planned";
      }
      function workAgeBuckets() {
        const buckets = { fresh: 0, watch: 0, stale: 0, old: 0 };
        openWorkOrders().forEach((workOrder) => {
          const age = ageDays(workOrder);
          if (age <= 2) buckets.fresh += 1;
          else if (age <= 7) buckets.watch += 1;
          else if (age <= 14) buckets.stale += 1;
          else buckets.old += 1;
        });
        return buckets;
      }
      function requestFunnel() {
        return {
          submitted: activeRequests().length,
          converted: convertedRequests().length,
          stale: activeRequests().filter(isStaleRequest).length
        };
      }
      function equipmentHealthSummary() {
        const rows = equipmentRows();
        const down = rows.filter((asset) => asset.status === "offline");
        const degraded = rows.filter((asset) => asset.status === "degraded");
        const watch = rows.filter((asset) => asset.status === "watch");
        const running = rows.filter((asset) => asset.status === "running");
        return { total: rows.length, running, watch, degraded, down };
      }
      function preventiveSummary() {
        const rows = preventiveRows();
        const overdue = rows.filter((schedule) => scheduleDueState(schedule) === "overdue");
        const dueSoon = rows.filter((schedule) => scheduleDueState(schedule) === "due_soon");
        const unscheduled = rows.filter((schedule) => scheduleDueState(schedule) === "unscheduled");
        return { total: rows.length, overdue, dueSoon, unscheduled };
      }
      function selectedUserId() {
        return typeof deps.getManagerDashboardUserId === "function" ? deps.getManagerDashboardUserId() : "";
      }
      function selectedMetric() {
        return typeof deps.getManagerDashboardMetric === "function" ? deps.getManagerDashboardMetric() : "open";
      }
      function metricLabel(metric) {
        return {
          open: "Open Work",
          in_progress: "In Progress",
          blocked: "Blocked",
          overdue: "Overdue",
          completed_week: "Done 7d",
          completed_month: "Done 30d",
          converted_requests: "Converted Requests",
          summary_open: "Open Work",
          summary_requests: "New Requests",
          summary_overdue: "Overdue",
          summary_unassigned: "Unassigned",
          summary_critical: "Critical Open",
          summary_high_priority: "High Priority",
          summary_stale: "Stale 7d+",
          summary_follow_up: "Follow-up Needed",
          summary_completed_week: "Completed Week",
          summary_completed_month: "Completed Month",
          summary_converted_requests: "Converted Requests",
          summary_stale_requests: "Stale Requests",
          summary_completion_rate: "7d Completion Rate"
        }[metric] || "Open Work";
      }
      function summaryWorkOrders(metric) {
        if (metric === "summary_overdue") return openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
        if (metric === "summary_unassigned") return openWorkOrders().filter((workOrder) => !workOrder.assigned_to);
        if (metric === "summary_critical") return openWorkOrders().filter(isCriticalOpen);
        if (metric === "summary_high_priority") return openWorkOrders().filter(isHighPriorityOpen);
        if (metric === "summary_stale") return openWorkOrders().filter(isStaleOpen);
        if (metric === "summary_follow_up") return openWorkOrders().filter(needsFollowUp);
        if (metric === "summary_completed_week") return completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7)));
        if (metric === "summary_completed_month") return completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30)));
        return openWorkOrders();
      }
      function summaryRequests(metric) {
        if (metric === "summary_converted_requests") return convertedRequests();
        if (metric === "summary_stale_requests") return activeRequests().filter(isStaleRequest);
        return activeRequests();
      }
      function metricWorkOrders(userId, metric) {
        const assigned = assignedOpenWork(userId);
        const completed = completedWorkOrders().filter((workOrder) => workOrder.completed_by === userId || workOrder.assigned_to === userId);
        if (metric === "in_progress") return assigned.filter((workOrder) => workOrder.status === "in_progress");
        if (metric === "blocked") return assigned.filter((workOrder) => workOrder.status === "blocked");
        if (metric === "overdue") return assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue");
        if (metric === "critical") return assigned.filter(isCriticalOpen);
        if (metric === "stale") return assigned.filter(isStaleOpen);
        if (metric === "follow_up") return assigned.filter(needsFollowUp);
        if (metric === "completed_week") return completed.filter((workOrder) => isCompletedSince(workOrder, daysAgo(7)));
        if (metric === "completed_month") return completed.filter((workOrder) => isCompletedSince(workOrder, daysAgo(30)));
        return assigned;
      }
      function metricRequests(userId, metric) {
        if (metric === "converted_requests") return convertedRequests().filter((request) => request.converted_by === userId || !request.converted_by && request.created_by === userId);
        return [];
      }
      function managerCompletionRate() {
        const completedWeek = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length;
        const currentOpen = openWorkOrders().length;
        const total = currentOpen + completedWeek;
        if (!total) return 0;
        return Math.round(completedWeek / total * 100);
      }
      function overloadLevel(row) {
        if (row.critical > 0 || row.overdue >= 3 || row.blocked >= 2 || row.open >= 10) return "high";
        if (row.overdue > 0 || row.blocked > 0 || row.open >= 6 || row.followUp > 0) return "watch";
        return "normal";
      }
      function overloadLabel(level) {
        return { high: "Needs manager review", watch: "Watch workload", normal: "Normal load" }[level] || "Normal load";
      }
      function latestActivityFor(userId) {
        const dates = deps.getWorkOrders().filter((workOrder) => deps.matchesActiveLocation(workOrder) && (workOrder.assigned_to === userId || workOrder.completed_by === userId || workOrder.created_by === userId)).map((workOrder) => workOrder.completed_at || workOrder.updated_at || workOrder.created_at).filter(Boolean).map((value) => new Date(value)).filter((date) => Number.isFinite(date.getTime())).sort((a, b) => b - a);
        return dates[0] || null;
      }
      function averageAgeDays(rows) {
        if (!rows.length) return 0;
        const now = Date.now();
        const total = rows.reduce((sum, workOrder) => {
          const created = new Date(workOrder.created_at || now).getTime();
          return sum + Math.max(0, Math.round((now - created) / dayMs));
        }, 0);
        return Math.round(total / rows.length);
      }
      function shortDateTime(value) {
        if (!value) return "No recent activity";
        return value.toLocaleString([], {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
          hour: "numeric",
          minute: "2-digit"
        });
      }
      function managerSummaryCards() {
        const counts = deps.getWorkOrderDashboardCounts() || {};
        const requestCounts = deps.getRequestDashboardCounts() || {};
        const openRows = openWorkOrders();
        const unassigned = openWorkOrders().filter((workOrder) => !workOrder.assigned_to).length;
        const staleRequests = activeRequests().filter(isStaleRequest).length;
        return [
          ["Open Work", counts.activeWork ?? openWorkOrders().length, "Current active work in this location.", "summary_open"],
          ["New Requests", requestCounts.active ?? activeRequests().length, "Submitted requests waiting for review.", "summary_requests"],
          ["Overdue", counts.overdue ?? openWorkOrders().filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length, "Open work past due.", "summary_overdue"],
          ["Unassigned", unassigned, "Open work with no internal owner.", "summary_unassigned"],
          ["Critical Open", openRows.filter(isCriticalOpen).length, "Critical open work needing manager attention.", "summary_critical"],
          ["Stale 7d+", openRows.filter(isStaleOpen).length, "Open work older than 7 days.", "summary_stale"],
          ["Follow-up Needed", openRows.filter(needsFollowUp).length, "Open work marked for follow-up.", "summary_follow_up"],
          ["Completed Week", counts.completedWeek ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length, "Work completed in the last 7 days.", "summary_completed_week"],
          ["Completed Month", counts.completedMonth ?? completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30))).length, "Work completed in the last 30 days.", "summary_completed_month"],
          ["Converted Requests", requestCounts.converted ?? convertedRequests().length, "Requests already turned into work orders.", "summary_converted_requests"],
          ["Stale Requests", staleRequests, "Submitted requests older than 2 days.", "summary_stale_requests"],
          ["7d Completion Rate", `${managerCompletionRate()}%`, "Completed this week compared with current open work.", "summary_completion_rate"]
        ];
      }
      function technicianRows() {
        const weekCutoff = daysAgo(7);
        const monthCutoff = daysAgo(30);
        return deps.getCompanyMembers().filter((member) => ["technician", "manager", "admin"].includes(deps.normalizeRole(member.role))).map((member) => {
          const userId = member.user_id;
          const assigned = assignedOpenWork(userId);
          const completed = completedWorkOrders().filter((workOrder) => workOrder.completed_by === userId || workOrder.assigned_to === userId);
          const converted = metricRequests(userId, "converted_requests");
          const latest = latestActivityFor(userId);
          return {
            userId,
            name: deps.teamMemberName(userId),
            role: deps.roleLabel(member.role),
            open: assigned.length,
            inProgress: assigned.filter((workOrder) => workOrder.status === "in_progress").length,
            blocked: assigned.filter((workOrder) => workOrder.status === "blocked").length,
            overdue: assigned.filter((workOrder) => deps.getDueState(workOrder)?.className === "overdue").length,
            critical: assigned.filter(isCriticalOpen).length,
            followUp: assigned.filter(needsFollowUp).length,
            completedWeek: completed.filter((workOrder) => isCompletedSince(workOrder, weekCutoff)).length,
            completedMonth: completed.filter((workOrder) => isCompletedSince(workOrder, monthCutoff)).length,
            convertedRequests: converted.length,
            averageAge: averageAgeDays(assigned),
            latestActivity: shortDateTime(latest)
          };
        }).map((row) => {
          const level = overloadLevel(row);
          return { ...row, overloadLevel: level, overloadLabel: overloadLabel(level) };
        }).sort((a, b) => ({ high: 2, watch: 1, normal: 0 })[b.overloadLevel] - { high: 2, watch: 1, normal: 0 }[a.overloadLevel] || b.open - a.open || b.overdue - a.overdue || a.name.localeCompare(b.name));
      }
      function renderMetricCard([label, value, detail, metric]) {
        const activeClass = selectedUserId() === summaryUserId && selectedMetric() === metric ? " active" : "";
        return `
        <button type="button" class="manager-metric-card${activeClass}" data-manager-drill-user="${summaryUserId}" data-manager-drill-metric="${deps.escapeHtml(metric)}">
          <span>${deps.escapeHtml(label)}</span>
          <strong>${deps.escapeHtml(value)}</strong>
          <small>${deps.escapeHtml(detail)}</small>
        </button>
      `;
      }
      function renderTechnicianRow(row) {
        const activeUserId = selectedUserId();
        const activeMetric = selectedMetric();
        const activeClass = (metric) => row.userId === activeUserId && metric === activeMetric ? " active" : "";
        return `
        <article class="manager-tech-row workload-${deps.escapeHtml(row.overloadLevel)}${row.userId === activeUserId ? " selected" : ""}">
          <button type="button" class="manager-tech-person manager-drill-button${activeClass("open")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="open">
            <strong>${deps.escapeHtml(row.name)}</strong>
            <span>${deps.escapeHtml(row.role)} - ${deps.escapeHtml(row.overloadLabel)}</span>
          </button>
          <button type="button" class="manager-drill-button${activeClass("open")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="open"><span>Open</span><strong>${row.open}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("in_progress")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="in_progress"><span>In Progress</span><strong>${row.inProgress}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("blocked")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="blocked"><span>Blocked</span><strong>${row.blocked}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("overdue")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="overdue"><span>Overdue</span><strong>${row.overdue}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("critical")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="critical"><span>Critical</span><strong>${row.critical}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("follow_up")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="follow_up"><span>Follow-up</span><strong>${row.followUp}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("completed_week")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="completed_week"><span>Done 7d</span><strong>${row.completedWeek}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("completed_month")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="completed_month"><span>Done 30d</span><strong>${row.completedMonth}</strong></button>
          <button type="button" class="manager-drill-button${activeClass("converted_requests")}" data-manager-drill-user="${deps.escapeHtml(row.userId)}" data-manager-drill-metric="converted_requests"><span>Converted</span><strong>${row.convertedRequests}</strong></button>
          <div><span>Avg Age</span><strong>${row.averageAge}d</strong></div>
          <small>${deps.escapeHtml(row.latestActivity)}</small>
        </article>
      `;
      }
      function formatDate(value) {
        if (!value) return "Date unset";
        const date = new Date(value);
        if (!Number.isFinite(date.getTime())) return String(value);
        return date.toLocaleDateString();
      }
      function workOrderTitle(workOrder) {
        return workOrder.title || workOrder.description || workOrder.name || "Untitled work order";
      }
      function renderDrillWorkOrder(workOrder) {
        const dueState = deps.getDueState(workOrder) || {};
        const dueLabel = dueState.label || (workOrder.due_at ? `Due ${formatDate(workOrder.due_at)}` : "Due date unset");
        const assignedLabel = workOrder.assigned_to ? deps.teamMemberName(workOrder.assigned_to) : "Unassigned";
        const ageLabel = workOrder.status === "completed" ? "completed" : `${ageDays(workOrder)}d open`;
        const completionLabel = workOrder.status === "completed" ? ` - Completed by ${completedOwnerLabel(workOrder)}${workOrder.completed_at ? ` on ${formatDate(workOrder.completed_at)}` : ""}` : "";
        return `
        <article class="mini-work-order manager-drill-work-order" data-mini-work-order="${deps.escapeHtml(workOrder.id)}">
          <strong>${deps.escapeHtml(workOrderTitle(workOrder))}</strong>
          <span>${deps.escapeHtml(deps.statusLabel ? deps.statusLabel(workOrder.status) : workOrder.status || "Open")} - ${deps.escapeHtml(workOrder.priority || "medium")} - ${deps.escapeHtml(assignedLabel)}</span>
          <small>${deps.escapeHtml(dueLabel)} - ${deps.escapeHtml(ageLabel)} - Created ${deps.escapeHtml(formatDate(workOrder.created_at))}${workOrder.follow_up_needed ? " - follow-up" : ""}${deps.escapeHtml(completionLabel)}</small>
        </article>
      `;
      }
      function requestTitle(request) {
        return request.title || request.description || "Untitled request";
      }
      function requestRequester(request) {
        return request.requested_by_name || request.requester_name || "Requester unknown";
      }
      function requestEquipmentLabel(request) {
        return request.assets?.name || request.equipment_note || "Machine / area not set";
      }
      function renderDrillRequest(request) {
        const converted = deps.isConvertedRequest(request);
        const ageLabel = `${requestAgeDays(request)}d old`;
        return `
        <article class="mini-work-order manager-drill-request" data-manager-request-jump="${deps.escapeHtml(converted ? "converted" : "active")}">
          <strong>${deps.escapeHtml(requestTitle(request))}</strong>
          <span>${deps.escapeHtml(request.priority || "Medium")} priority - ${deps.escapeHtml(converted ? "converted" : "submitted")}</span>
          <small>${deps.escapeHtml(requestEquipmentLabel(request))} - ${deps.escapeHtml(requestRequester(request))} - ${deps.escapeHtml(formatDate(request.created_at))} - ${deps.escapeHtml(ageLabel)}${converted ? ` - ${deps.escapeHtml(requestConvertedByLabel(request))}` : ""}</small>
        </article>
      `;
      }
      function renderManagerDrillIn(rows) {
        const userId = selectedUserId();
        if (!userId) return "";
        const metric = selectedMetric();
        if (userId === summaryUserId) {
          const requestMetric = metric === "summary_requests" || metric === "summary_converted_requests" || metric === "summary_stale_requests";
          const rateMetric = metric === "summary_completion_rate";
          const workRows2 = requestMetric ? [] : summaryWorkOrders(metric);
          const requestRows2 = requestMetric ? summaryRequests(metric) : [];
          const itemCount = rateMetric ? 1 : requestMetric ? requestRows2.length : workRows2.length;
          return `
          <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
            <div class="panel-header compact">
              <div>
                <h3>${deps.escapeHtml(metricLabel(metric))}</h3>
                <span>Manager snapshot - ${itemCount} loaded item${itemCount === 1 ? "" : "s"}</span>
              </div>
              <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
            </div>
            <div class="manager-drill-list">
              ${rateMetric ? renderCompletionRateDetail() : requestMetric ? requestRows2.map(renderDrillRequest).join("") : workRows2.map(renderDrillWorkOrder).join("")}
              ${itemCount ? "" : `<p class="muted">No loaded items match this view.</p>`}
            </div>
          </section>
        `;
        }
        const userRow = rows.find((row) => row.userId === userId);
        const workRows = metricWorkOrders(userId, metric);
        const requestRows = metricRequests(userId, metric);
        const isRequestMetric = metric === "converted_requests";
        return `
        <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
          <div class="panel-header compact">
            <div>
              <h3>${deps.escapeHtml(userRow?.name || deps.teamMemberName(userId))}</h3>
              <span>${deps.escapeHtml(metricLabel(metric))} - ${isRequestMetric ? requestRows.length : workRows.length} loaded item${(isRequestMetric ? requestRows.length : workRows.length) === 1 ? "" : "s"}</span>
            </div>
            <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
          </div>
          <div class="manager-drill-list">
            ${isRequestMetric ? requestRows.map(renderDrillRequest).join("") || `<p class="muted">No loaded requests match this view.</p>` : workRows.map(renderDrillWorkOrder).join("") || `<p class="muted">No loaded work orders match this view.</p>`}
          </div>
        </section>
      `;
      }
      function managerAttentionItems() {
        const openRows = openWorkOrders();
        const items = [
          ["Critical Open", openRows.filter(isCriticalOpen), "summary_critical"],
          ["Stale 7d+", openRows.filter(isStaleOpen), "summary_stale"],
          ["Follow-up Needed", openRows.filter(needsFollowUp), "summary_follow_up"],
          ["New Requests", activeRequests(), "summary_requests"],
          ["Stale Requests", activeRequests().filter(isStaleRequest), "summary_stale_requests"],
          ["Unassigned", openRows.filter((workOrder) => !workOrder.assigned_to), "summary_unassigned"]
        ];
        return items.map(([label, rows, metric]) => ({ label, count: rows.length, metric })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
      }
      function renderCompletionRateDetail() {
        const completedWeek = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length;
        const currentOpen = openWorkOrders().length;
        return `
        <article class="manager-report-card">
          <strong>${managerCompletionRate()}%</strong>
          <span>${completedWeek} completed in 7 days against ${currentOpen} currently open.</span>
          <small>Use this as a manager signal, not a productivity score. It depends on work mix, staffing, and request volume.</small>
        </article>
      `;
      }
      function renderManagerTrendBoard() {
        const completed7 = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(7))).length;
        const completed30 = completedWorkOrders().filter((workOrder) => isCompletedSince(workOrder, daysAgo(30))).length;
        const requestAges = activeRequests().map(requestAgeDays);
        const avgRequestAge = requestAges.length ? Math.round(requestAges.reduce((sum, value) => sum + value, 0) / requestAges.length) : 0;
        const overloaded = technicianRows().filter((row) => row.overloadLevel !== "normal").length;
        return `
        <section class="manager-trend-panel relationship-detail asset">
          <div class="panel-header compact">
            <h3>Manager Trends</h3>
            <span>Loaded snapshot</span>
          </div>
          <div class="manager-trend-grid">
            <article><strong>${completed7}</strong><span>Completed 7d</span></article>
            <article><strong>${completed30}</strong><span>Completed 30d</span></article>
            <article><strong>${avgRequestAge}d</strong><span>Avg request age</span></article>
            <article><strong>${overloaded}</strong><span>Workloads to review</span></article>
          </div>
        </section>
      `;
      }
      function renderIntelligenceCard(label, value, detail, tone = "normal") {
        return `
        <article class="manager-intel-card intel-${deps.escapeHtml(tone)}">
          <span>${deps.escapeHtml(label)}</span>
          <strong>${deps.escapeHtml(value)}</strong>
          <small>${deps.escapeHtml(detail)}</small>
        </article>
      `;
      }
      function renderMiniSignalList(title, items, emptyText) {
        return `
        <article class="manager-signal-list">
          <strong>${deps.escapeHtml(title)}</strong>
          <div>
            ${items.slice(0, 5).map((item) => `<span>${deps.escapeHtml(item)}</span>`).join("") || `<span>${deps.escapeHtml(emptyText)}</span>`}
          </div>
        </article>
      `;
      }
      function renderOperationsIntelligenceBoard() {
        const equipment = equipmentHealthSummary();
        const pm = preventiveSummary();
        const funnel = requestFunnel();
        const aging = workAgeBuckets();
        const downEquipmentNames = equipment.down.map((asset) => asset.name || "Unnamed equipment");
        const degradedNames = equipment.degraded.map((asset) => asset.name || "Unnamed equipment");
        const duePmNames = [...pm.overdue, ...pm.dueSoon].map((schedule) => schedule.title || schedule.name || schedule.assets?.name || "PM schedule");
        return `
        <section class="manager-intelligence-panel relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Operations Intelligence</h3>
              <span>Exception-first view across equipment, PM, request flow, and work age.</span>
            </div>
          </div>
          <div class="manager-intel-grid">
            ${renderIntelligenceCard("Equipment Risk", equipment.down.length + equipment.degraded.length, `${equipment.down.length} down, ${equipment.degraded.length} degraded, ${equipment.watch.length} watch`, equipment.down.length ? "danger" : equipment.degraded.length ? "watch" : "normal")}
            ${renderIntelligenceCard("PM Risk", pm.overdue.length + pm.dueSoon.length, `${pm.overdue.length} overdue, ${pm.dueSoon.length} due in 7 days`, pm.overdue.length ? "danger" : pm.dueSoon.length ? "watch" : "normal")}
            ${renderIntelligenceCard("Request Flow", `${funnel.converted}/${funnel.submitted + funnel.converted}`, `${funnel.submitted} new, ${funnel.converted} converted, ${funnel.stale} stale`, funnel.stale ? "watch" : "normal")}
            ${renderIntelligenceCard("Aging Load", aging.stale + aging.old, `${aging.fresh} fresh, ${aging.watch} 3-7d, ${aging.stale} 8-14d, ${aging.old} 15d+`, aging.old ? "danger" : aging.stale ? "watch" : "normal")}
          </div>
          <div class="manager-signal-grid">
            ${renderMiniSignalList("Down Equipment", downEquipmentNames, "No equipment marked offline/down.")}
            ${renderMiniSignalList("Degraded Equipment", degradedNames, "No equipment marked degraded.")}
            ${renderMiniSignalList("PM To Watch", duePmNames, "No PM schedules due soon.")}
          </div>
        </section>
      `;
      }
      function renderManagerReportBoard() {
        return `
        <section class="manager-report-panel relationship-detail procedure">
          <div class="panel-header compact">
            <h3>Manager Report</h3>
            <span>Use Export CSV from this screen for the current loaded data.</span>
          </div>
          <div class="manager-report-grid">
            <article><strong>Focus</strong><span>Critical, stale, follow-up, unassigned, and request intake are the first review path.</span></article>
            <article><strong>Action</strong><span>Click work rows to open the work order. Click request rows to jump to the request queue.</span></article>
            <article><strong>Limit</strong><span>Metrics are a live operational snapshot, not payroll or performance discipline.</span></article>
          </div>
        </section>
      `;
      }
      function renderManagerAttentionBoard() {
        const items = managerAttentionItems();
        return `
        <section class="manager-attention-panel relationship-detail warning">
          <div class="panel-header compact">
            <h3>Manager Attention</h3>
            <span>Review first</span>
          </div>
          <div class="manager-attention-list">
            ${items.map((item) => `
              <button type="button" class="manager-attention-card ${item.count ? "" : "empty"}" data-manager-drill-user="${summaryUserId}" data-manager-drill-metric="${deps.escapeHtml(item.metric)}">
                <span>${deps.escapeHtml(item.label)}</span>
                <strong>${item.count}</strong>
              </button>
            `).join("")}
          </div>
        </section>
      `;
      }
      function renderManagerDashboard() {
        const rows = technicianRows();
        return `
        <section class="manager-dashboard" aria-label="Manager dashboard">
          <div class="queue-context-card manager-context-card">
            <div>
              <strong>Manager Beta Dashboard</strong>
              <span>Operational snapshot for workload, request intake, and team follow-up.</span>
            </div>
            <small>${deps.getManagerCompletedWorkReady && !deps.getManagerCompletedWorkReady() ? "Recent completed work is still loading or needs refresh." : "Completed metrics include recent manager history when loaded."}</small>
          </div>
          <div class="manager-metric-grid">
            ${managerSummaryCards().map(renderMetricCard).join("")}
          </div>
          ${renderOperationsIntelligenceBoard()}
          ${renderManagerAttentionBoard()}
          ${renderManagerTrendBoard()}
          <section class="manager-tech-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Technician Workload</h3>
              <span>${rows.length} people</span>
            </div>
            <div class="manager-tech-list">
              ${rows.map(renderTechnicianRow).join("") || `<p class="muted">No team members loaded yet.</p>`}
            </div>
          </section>
          ${renderManagerReportBoard()}
          ${renderManagerDrillIn(rows)}
        </section>
      `;
      }
      return {
        renderManagerDashboard,
        metricWorkOrders,
        managerAttentionItems,
        managerSummaryCards,
        managerCompletionRate,
        technicianRows,
        metricRequests,
        equipmentHealthSummary,
        preventiveSummary,
        requestFunnel,
        workAgeBuckets
      };
    }
    window.MaintainOpsManagerDashboardDisplay = {
      createManagerDashboardDisplayHelpers
    };
  })();

  // src/bundles/runtime.entry.js
  var import_authDisplay = __toESM(require_authDisplay());
  var import_publicRequestDisplay = __toESM(require_publicRequestDisplay());

  // src/render/messageFormatting.js
  (function() {
    function formatMessageTime(value) {
      if (!value) return "";
      const date = new Date(value);
      const now = /* @__PURE__ */ new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      if (messageDay === today) return `Today ${time}`;
      if (messageDay === today - 864e5) return `Yesterday ${time}`;
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
    function formatMessageDay(value) {
      if (!value) return "";
      const date = new Date(value);
      const now = /* @__PURE__ */ new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      if (messageDay === today) return "Today";
      if (messageDay === today - 864e5) return "Yesterday";
      return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
    }
    function initials(name) {
      const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
      if (!parts.length) return "MO";
      return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    }
    window.MaintainOpsMessageFormatting = Object.freeze({
      formatMessageTime,
      formatMessageDay,
      initials
    });
  })();

  // src/render/messageDisplay.js
  (function() {
    function createMessageDisplayHelpers(deps) {
      function renderMessageBubble(message) {
        const mine = message.sender_id === deps.getCurrentUserId();
        const senderName = deps.teamMemberName(message.sender_id);
        return `
    <article class="message-bubble ${mine ? "mine" : ""}">
      <span class="message-avatar" aria-hidden="true">${deps.escapeHtml(deps.initials(senderName))}</span>
      <div class="message-bubble-meta">
        <strong>${deps.escapeHtml(senderName)}</strong>
        <span>${deps.escapeHtml(deps.formatMessageTime(message.created_at))}</span>
      </div>
      <p>${deps.escapeHtml(message.body)}</p>
      ${mine ? `<button class="message-delete-button" data-delete-message="${deps.escapeHtml(message.id)}" type="button">Delete</button>` : ""}
    </article>
  `;
      }
      function renderMessageList(messages) {
        const visibleMessages = messages.filter((message) => !message.deleted_at);
        if (!visibleMessages.length) return `<p class="muted">No messages yet.</p>`;
        let lastDay = "";
        return visibleMessages.map((message) => {
          const day = deps.formatMessageDay(message.created_at);
          const divider = day !== lastDay ? `<div class="message-day-divider"><span>${deps.escapeHtml(day)}</span></div>` : "";
          lastDay = day;
          return `${divider}${renderMessageBubble(message)}`;
        }).join("");
      }
      return Object.freeze({
        renderMessageBubble,
        renderMessageList
      });
    }
    window.MaintainOpsMessageDisplay = Object.freeze({
      createMessageDisplayHelpers
    });
  })();
})();
