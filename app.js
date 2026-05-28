const app = document.querySelector("#app");

const {
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  ASSET_TYPE_OPTIONS,
  WORK_ORDERS_PER_PAGE,
  PARTS_PER_PAGE,
  ASSETS_PER_PAGE,
  LIST_ITEMS_PER_PAGE,
  SEARCH_ID_PAGE_SIZE,
  SEARCH_ID_CHUNK_SIZE,
  SEARCH_PREVIEW_LIMIT,
  OUTSIDE_VENDOR_VALUE,
  OUTSIDE_VENDOR_NOTE,
  COMPANY_ROLES,
  ACTIVE_LOCATION_STORAGE_KEY,
} = window.MaintainOpsConstants;
const { escapeHtml } = window.MaintainOpsDom;
const {
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
  csvCell,
} = window.MaintainOpsFormatting;
const {
  isColumnSchemaError,
  isMissingColumnError,
  isProfileMissingError,
  isProcedureSchemaError,
  isAssetHierarchySchemaError,
} = window.MaintainOpsSchemaErrors;
const { withSetupError } = window.MaintainOpsOperationResults;
const { withOperationTimeout } = window.MaintainOpsOperationTimeout;
const { createAuthSessionFlow } = window.MaintainOpsAuthSessionFlow;
const { createMessageWorkflow } = window.MaintainOpsMessageWorkflow;
const { createPreventiveMaintenanceWorkflow } = window.MaintainOpsPreventiveMaintenanceWorkflow;
const { createProcedureWorkflow } = window.MaintainOpsProcedureWorkflow;
const { createTeamWorkflow } = window.MaintainOpsTeamWorkflow;
const { createCompanySettingsWorkflow } = window.MaintainOpsCompanySettingsWorkflow;
const { createAppIssueWorkflow } = window.MaintainOpsAppIssueWorkflow;
const { nextDueDate } = window.MaintainOpsMaintenanceScheduleDates;
const { createWorkspaceUiState } = window.MaintainOpsWorkspaceUiState;
const { createWorkOrderQueryFilterHelpers } = window.MaintainOpsWorkOrderQueryFilters;
const { bindWorkSectionJumpEvents } = window.MaintainOpsWorkSectionJumpEvents;
const { bindGlobalSearchNavigationEvents } = window.MaintainOpsGlobalSearchNavigationEvents;
const { bindWorkspaceSearchEvents } = window.MaintainOpsWorkspaceSearchEvents;
const { bindWorkspaceFilterPaginationEvents } = window.MaintainOpsWorkspaceFilterPaginationEvents;
const { bindWorkspaceDetailNavigationEvents } = window.MaintainOpsWorkspaceDetailNavigationEvents;
const { bindWorkspaceInventoryFilterEvents } = window.MaintainOpsWorkspaceInventoryFilterEvents;
const { bindWorkspaceWorkOrderStatusEvents } = window.MaintainOpsWorkspaceWorkOrderStatusEvents;
const { bindWorkspaceWorkOrderAssignmentEvents } = window.MaintainOpsWorkspaceWorkOrderAssignmentEvents;
const { bindWorkspaceWorkOrderDowntimeEvents } = window.MaintainOpsWorkspaceWorkOrderDowntimeEvents;
const { bindWorkspaceWorkOrderDetailStatusEvents } = window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents;
const { createWorkspaceWorkOrderCompletionEvents } = window.MaintainOpsWorkspaceWorkOrderCompletionEvents;
const { createWorkspaceWorkOrderDeleteEvents } = window.MaintainOpsWorkspaceWorkOrderDeleteEvents;
const { bindWorkspaceTeamWorkViewEvents } = window.MaintainOpsWorkspaceTeamWorkViewEvents;
const { bindWorkspacePartDetailEvents } = window.MaintainOpsWorkspacePartDetailEvents;
const { bindWorkspaceMessageUiEvents } = window.MaintainOpsWorkspaceMessageUiEvents;
const { bindWorkspacePartSearchEvents } = window.MaintainOpsWorkspacePartSearchEvents;
const { bindWorkspaceSectionNavigationEvents } = window.MaintainOpsWorkspaceSectionNavigationEvents;
const { bindWorkspaceMessageThreadEvents } = window.MaintainOpsWorkspaceMessageThreadEvents;
const { bindWorkspaceIssueAdminUiEvents } = window.MaintainOpsWorkspaceIssueAdminUiEvents;
const { bindWorkspacePartDeleteCancelEvents } = window.MaintainOpsWorkspacePartDeleteCancelEvents;
const { bindWorkspaceWorkMessageStartEvents } = window.MaintainOpsWorkspaceWorkMessageStartEvents;
const { bindWorkspaceReportIssueCommandEvents } = window.MaintainOpsWorkspaceReportIssueCommandEvents;
const { bindWorkspaceSubmitRequestCommandEvents } = window.MaintainOpsWorkspaceSubmitRequestCommandEvents;
const { bindWorkspaceNewWorkOrderCommandEvents } = window.MaintainOpsWorkspaceNewWorkOrderCommandEvents;
const { bindWorkspaceExportCsvCommandEvents } = window.MaintainOpsWorkspaceExportCsvCommandEvents;
const { bindWorkspaceAssetDeleteCancelEvents } = window.MaintainOpsWorkspaceAssetDeleteCancelEvents;
const { bindWorkspaceRequestDeleteCancelEvents } = window.MaintainOpsWorkspaceRequestDeleteCancelEvents;
const { bindWorkspaceScheduleDeleteCancelEvents } = window.MaintainOpsWorkspaceScheduleDeleteCancelEvents;
const { bindWorkspaceProcedureDeleteCancelEvents } = window.MaintainOpsWorkspaceProcedureDeleteCancelEvents;
const { autoGrowTextarea, bindWorkspaceTextareaAutoGrow } = window.MaintainOpsWorkspaceTextareaAutoGrow;
const { bindWorkspaceTeamInviteCancelEvents } = window.MaintainOpsWorkspaceTeamInviteCancelEvents;
const { bindWorkspaceQuickFixCommandEvents } = window.MaintainOpsWorkspaceQuickFixCommandEvents;
const { bindWorkspaceAssetQuickFixEvents } = window.MaintainOpsWorkspaceAssetQuickFixEvents;
const { bindWorkspacePublicRequestLinkCopyEvents } = window.MaintainOpsWorkspacePublicRequestLinkCopyEvents;
const { bindWorkspacePublicRequestLinkAdminEvents } = window.MaintainOpsWorkspacePublicRequestLinkAdminEvents;
const { bindWorkspaceRequestConversionEvents } = window.MaintainOpsWorkspaceRequestConversionEvents;
const { bindWorkspacePmGenerationEvents } = window.MaintainOpsWorkspacePmGenerationEvents;
const { bindWorkspaceFollowUpWorkEvents } = window.MaintainOpsWorkspaceFollowUpWorkEvents;
const { bindWorkspaceCommentEvents } = window.MaintainOpsWorkspaceCommentEvents;
const { bindWorkspaceQuickUpdateEvents } = window.MaintainOpsWorkspaceQuickUpdateEvents;
const { bindWorkspaceWorkOrderEditEvents } = window.MaintainOpsWorkspaceWorkOrderEditEvents;
const { bindWorkspaceRequestQuickFixEvents } = window.MaintainOpsWorkspaceRequestQuickFixEvents;
const { bindWorkspaceAssetLocationWarningEvents } = window.MaintainOpsWorkspaceAssetLocationWarningEvents;
const { bindPublicQrPrintEvents } = window.MaintainOpsPublicQrPrintEvents;
const { generatePublicRequestToken } = window.MaintainOpsPublicRequestTokens;
const { createRequestQueryFilterHelpers } = window.MaintainOpsRequestQueryFilters;
const { createWorkOrderSearchHelpers } = window.MaintainOpsWorkOrderSearch;
const { createWorkspaceListBuilders } = window.MaintainOpsWorkspaceListBuilders;
const { listLocations, createLocation: createLocationRecord } = window.MaintainOpsLocationsService;
const {
  listProfiles,
  listCompanyMembers,
  listTeamInvites,
  listTeamInvitesLegacy,
} = window.MaintainOpsProfilesService;
const { listParts } = window.MaintainOpsPartsService;
const { listAssets } = window.MaintainOpsAssetsService;
const {
  selectWorkOrders,
  countWorkOrdersQuery,
  fetchWorkOrderById,
  fetchWorkOrdersByIds,
  scopedWorkOrderSearchQuery: buildScopedWorkOrderSearchQuery,
  fetchPagedSearchRows,
} = window.MaintainOpsWorkOrdersService;
const {
  getMyCompanies,
  listUserCompanyMemberships,
  listUserCompanyMembershipsLegacy,
  listCompaniesByIds,
  listCompaniesByIdsLegacy,
} = window.MaintainOpsCompanyService;
const {
  listAppIssueReports,
  createAppIssueReportRecord,
  updateAppIssueReportStatusRecord,
} = window.MaintainOpsAppIssueReportsService;
const {
  renderMetric,
  renderInsight,
  renderRoleGuide,
} = window.MaintainOpsRenderDisplayHelpers;
const { createRelationshipDisplayHelpers } = window.MaintainOpsRelationshipDisplay;
const { createDashboardDisplayHelpers } = window.MaintainOpsDashboardDisplay;
const { segmentIcon, navIcon } = window.MaintainOpsIconDisplay;
const { assetTypeLabel, assetStatusLabel } = window.MaintainOpsEquipmentLabels;
const { createEmptyStateTextHelpers } = window.MaintainOpsEmptyStateText;
const { createRequestDisplayHelpers } = window.MaintainOpsRequestDisplay;
const { createGlobalSearchDisplayHelpers } = window.MaintainOpsGlobalSearchDisplay;
const { createWorkQueueDisplayHelpers } = window.MaintainOpsWorkQueueDisplay;
const { createPlanningDisplayHelpers } = window.MaintainOpsPlanningDisplay;
const { createMiniWorkOrderDisplayHelpers } = window.MaintainOpsMiniWorkOrderDisplay;
const { createPaginationDisplayHelpers } = window.MaintainOpsPaginationDisplay;
const { createPartsDisplayHelpers } = window.MaintainOpsPartsDisplay;
const { createOptionDisplayHelpers } = window.MaintainOpsOptionDisplay;
const { createSetupDisplayHelpers } = window.MaintainOpsSetupDisplay;
const { createRequestPhotoDisplayHelpers } = window.MaintainOpsRequestPhotoDisplay;
const { createMessageBadgeDisplayHelpers } = window.MaintainOpsMessageBadgeDisplay;
const { createAppIssueDisplayHelpers } = window.MaintainOpsAppIssueDisplay;
const { createWorkMessageDisplayHelpers } = window.MaintainOpsWorkMessageDisplay;
const { createWorkRecommendationDisplayHelpers } = window.MaintainOpsWorkRecommendationDisplay;
const { createCommandCardDisplayHelpers } = window.MaintainOpsCommandCardDisplay;
const { createWorkCommandDisplayHelpers } = window.MaintainOpsWorkCommandDisplay;
const { createMissingWorkDetailDisplayHelpers } = window.MaintainOpsMissingWorkDetailDisplay;
const { createPartSourceDisplayHelpers } = window.MaintainOpsPartSourceDisplay;
const { createAssetCardDisplayHelpers } = window.MaintainOpsAssetCardDisplay;
const { createProcedureOptionsDisplayHelpers } = window.MaintainOpsProcedureOptionsDisplay;
const { createMessageThreadLabelDisplayHelpers } = window.MaintainOpsMessageThreadLabelDisplay;
const { createMessageThreadButtonDisplayHelpers } = window.MaintainOpsMessageThreadButtonDisplay;
const { createMessageComposerDisplayHelpers } = window.MaintainOpsMessageComposerDisplay;
const { createAppIssuePanelDisplayHelpers } = window.MaintainOpsAppIssuePanelDisplay;
const { createInviteLocationDisplayHelpers } = window.MaintainOpsInviteLocationDisplay;
const { createPartSetupDisplayHelpers } = window.MaintainOpsPartSetupDisplay;
const { createTeamMemberDisplayHelpers } = window.MaintainOpsTeamMemberDisplay;
const { createTeamWorkloadDisplayHelpers } = window.MaintainOpsTeamWorkloadDisplay;
const { createLocationDisplayHelpers } = window.MaintainOpsLocationDisplay;
const { createDowntimeEmailDisplayHelpers } = window.MaintainOpsDowntimeEmailDisplay;
const { createSetupErrorDisplayHelpers } = window.MaintainOpsSetupErrorDisplay;
const { createWorkOrderErrorDisplayHelpers } = window.MaintainOpsWorkOrderErrorDisplay;
const { createAssignmentDisplayHelpers } = window.MaintainOpsAssignmentDisplay;
const { createWorkOrderDescriptionDisplayHelpers } = window.MaintainOpsWorkOrderDescriptionDisplay;
const { createWorkOrderChangeDisplayHelpers } = window.MaintainOpsWorkOrderChangeDisplay;
const { createActivityFeedDisplayHelpers } = window.MaintainOpsActivityFeedDisplay;
const { createPartInventoryDisplayHelpers } = window.MaintainOpsPartInventoryDisplay;
const { createPartUsageDisplayHelpers } = window.MaintainOpsPartUsageDisplay;
const { createRequestQueueDisplayHelpers } = window.MaintainOpsRequestQueueDisplay;
const { createDeleteBlockerDisplayHelpers } = window.MaintainOpsDeleteBlockerDisplay;
const { createAssetHierarchyDisplayHelpers } = window.MaintainOpsAssetHierarchyDisplay;
const { createMaintenanceListDisplayHelpers } = window.MaintainOpsMaintenanceListDisplay;
const { createSearchFilterDisplayHelpers } = window.MaintainOpsSearchFilterDisplay;
const { createWorkOrderSortDisplayHelpers } = window.MaintainOpsWorkOrderSortDisplay;
const { createLocationFilterDisplayHelpers } = window.MaintainOpsLocationFilterDisplay;
const { createMessageThreadFilterDisplayHelpers } = window.MaintainOpsMessageThreadFilterDisplay;
const { createSetupStatusDisplayHelpers } = window.MaintainOpsSetupStatusDisplay;
const { createWorkOrderStatusFilterDisplayHelpers } = window.MaintainOpsWorkOrderStatusFilterDisplay;
const { createWorkOrderSearchDisplayHelpers } = window.MaintainOpsWorkOrderSearchDisplay;
const { createMyWorkQueueDisplayHelpers } = window.MaintainOpsMyWorkQueueDisplay;
const { createMessageCenterErrorDisplayHelpers } = window.MaintainOpsMessageCenterErrorDisplay;
const { createAppIssueErrorDisplayHelpers } = window.MaintainOpsAppIssueErrorDisplay;
const { createWorkOrderDetailDisplayHelpers } = window.MaintainOpsWorkOrderDetailDisplay;
const { createAssetDetailDisplayHelpers } = window.MaintainOpsAssetDetailDisplay;
const { createMessageCenterDisplayHelpers } = window.MaintainOpsMessageCenterDisplay;
const { createCreateWorkOrderDisplayHelpers } = window.MaintainOpsCreateWorkOrderDisplay;
const { createQuickFixDisplayHelpers } = window.MaintainOpsQuickFixDisplay;
const {
  workspaceLoading,
  workspaceLoadError,
  authForm,
  authCallback,
  authCallbackError,
  passwordResetRequest,
  passwordRecovery,
  companyCreate: companyCreateForm,
} = window.MaintainOpsAuthDisplay.createAuthDisplayHelpers({ escapeHtml });
const { createQuickFixWorkflow } = window.MaintainOpsQuickFixWorkflow;
const workspaceUiState = createWorkspaceUiState({ storage: localStorage });
const {
  applyWorkOrderListFilters,
  applyWorkOrderFilters,
  applyWorkOrderQueueFilters,
  applyWorkOrderStatusFilter,
  applyWorkOrderSort,
} = createWorkOrderQueryFilterHelpers({
  activeCompanyId: () => activeCompanyId,
  activeLocationId: () => activeLocationId,
  activeSection: () => activeSection,
  activeStatusFilter: () => workspaceUiState.getActiveStatusFilter(),
  daysAgoDate,
  isoDate,
  isoDateTime,
  locationsReady: () => locationsReady,
  monthStartDate,
  myWorkFilter: () => workspaceUiState.getMyWorkFilter(),
  OUTSIDE_VENDOR_NOTE,
  postgrestSearchTerm,
  searchQuery: () => workspaceUiState.getSearchQuery(),
  session: () => session,
  startOfToday,
  workOrderAssigneeFilter: () => workspaceUiState.getWorkOrderAssigneeFilter(),
  workOrderFilter: () => workspaceUiState.getWorkOrderFilter(),
  workOrderRelatedSearch: () => workOrderRelatedSearch,
  workSort: () => workspaceUiState.getWorkSort(),
});
const {
  formatMessageTime,
  formatMessageDay,
  initials,
} = window.MaintainOpsMessageFormatting;
const { createMessageDisplayHelpers } = window.MaintainOpsMessageDisplay;
let supabaseClient;
let session;
const {
  authCallbackRedirectUrl,
  passwordResetRedirectUrl,
  clearPasswordRecoveryUrl,
  startAuthCallback,
  renderAuthCallback,
  renderAuthCallbackError,
  startPasswordRecovery,
  renderPasswordResetRequest,
  renderPasswordRecovery,
} = createAuthSessionFlow({
  windowRef: window,
  documentRef: document,
  app,
  get supabaseClient() { return supabaseClient; },
  setSession: (value) => { session = value; },
  render: (...args) => render(...args),
  renderAuth: (...args) => renderAuth(...args),
  resetLoginState: (...args) => resetLoginState(...args),
  withOperationTimeout,
  authCallback,
  authCallbackError,
  passwordResetRequest,
  passwordRecovery,
  passwordRecoveryParamsFromUrl,
});
let companies = [];
let activeCompanyId = localStorage.getItem("maintainops.activeCompanyId");
let locations = [];
let locationsReady = true;
let activeLocationId = localStorage.getItem(ACTIVE_LOCATION_STORAGE_KEY) || "";
let assets = [];
let workOrders = [];
let workOrderServerTotal = 0;
let workOrderDashboardCounts = null;
let myWorkDashboardCounts = null;
let workOrderRelatedSearch = { assetIds: [], workOrderIds: [], procedureIds: [] };
let exactWorkOrderSearchCache = { key: "", rows: [] };
let maintenanceRequests = [];
let requestServerTotal = 0;
let requestDashboardCounts = { active: 0, converted: 0, all: 0 };
let requestsReady = false;
let publicRequestLinks = [];
let publicRequestLinksReady = true;
let preventiveSchedules = [];
let companyMembers = [];
let teamInvites = [];
let teamInvitesReady = true;
let teamInviteCancelError = "";
let messageThreads = [];
let messageThreadMembers = [];
let messagesByThreadId = {};
let messageReadsByThreadId = {};
let messagesReady = true;
let messageWorkOrderLinksReady = true;
let appIssueReports = [];
let appIssueReportsReady = true;
let reportIssueMode = false;
let activeMessageThreadId = workspaceUiState.getActiveMessageThreadId();
function setActiveMessageThreadIdState(value) {
  activeMessageThreadId = value;
  workspaceUiState.setActiveMessageThreadId(value);
}
let messageThreadFilter = workspaceUiState.getMessageThreadFilter();
function setMessageThreadFilterState(value) {
  messageThreadFilter = value;
  workspaceUiState.setMessageThreadFilter(value);
}
let messageSearchQuery = workspaceUiState.getMessageSearchQuery();
function setMessageSearchQueryState(value) {
  messageSearchQuery = value;
  workspaceUiState.setMessageSearchQuery(value);
}
let messageComposerWorkOrderId = workspaceUiState.getMessageComposerWorkOrderId();
function setMessageComposerWorkOrderIdState(value) {
  messageComposerWorkOrderId = value;
  workspaceUiState.setMessageComposerWorkOrderId(value);
}
let messageComposerOpen = workspaceUiState.getMessageComposerOpen();
function setMessageComposerOpenState(value) {
  messageComposerOpen = Boolean(value);
  workspaceUiState.setMessageComposerOpen(value);
}
let parts = [];
let partCostsReady = true;
let partSuppliersReady = true;
let partDocumentsReady = true;
let partDocumentsByPartId = {};
let procedureTemplates = [];
let proceduresReady = false;
let schedulesReady = false;
let outcomesReady = true;
let safetyChecksReady = true;
let photosReady = true;
let adminDeleteSqlConfirmed = localStorage.getItem("maintainops.adminDeleteSqlConfirmed") === "true";
let partsUsedByWorkOrder = {};
let eventsByWorkOrder = {};
let commentsByWorkOrder = {};
let photosByWorkOrder = {};
let stepResultsByWorkOrder = {};
let profilesByUserId = {};
let commentsError = "";
let requestPhotosReady = true;
let activeWorkOrderId = workspaceUiState.getActiveWorkOrderId();
function setActiveWorkOrderIdState(value) {
  activeWorkOrderId = value;
  workspaceUiState.setActiveWorkOrderId(value);
}
let activeAssetId = workspaceUiState.getActiveAssetId();
function setActiveAssetIdState(value) {
  activeAssetId = value;
  workspaceUiState.setActiveAssetId(value);
}
let activePartId = workspaceUiState.getActivePartId();
function setActivePartIdState(value) {
  activePartId = value;
  workspaceUiState.setActivePartId(value);
}
let pendingDeleteWorkOrderId = null;
let pendingDeletePartId = null;
let pendingDeleteAssetId = null;
let pendingDeleteRequestId = null;
let pendingDeleteScheduleId = null;
let pendingDeleteProcedureId = null;
let pendingCancelInviteId = null;
let showPartSourceManager = false;
let createWorkOrderMode = false;
let quickFixMode = false;
let quickFixAssetId = null;
let quickFixRequestId = null;
let publicAppUrlOverride = localStorage.getItem("maintainops.publicAppUrl") || "";
const {
  publicRequestUrl,
  publicRequestQrUrl,
  publicAppUrlWithSearch,
  publicAppBaseUrl,
  normalizePublicAppUrl,
  isPublicAppHost,
  qrSvgFor,
} = window.MaintainOpsPublicUrlQr.createPublicUrlQrHelpers({
  getPublicAppUrlOverride: () => publicAppUrlOverride,
});
const {
  loadingQrPage,
  publicRequestQrPage,
  loadingRequestForm,
  publicRequestForm,
  publicRequestError,
  publicRequestSuccess,
  publicRequestLinkManager: renderPublicRequestLinkManager,
  publicRequestLocationCard: renderPublicRequestLocationCard,
} = window.MaintainOpsPublicRequestDisplay.createPublicRequestDisplayHelpers({
  escapeHtml,
  qrSvgFor,
  getLocations: () => locations,
  getPublicRequestLinks: () => publicRequestLinks,
  getPublicRequestLinksReady: () => publicRequestLinksReady,
  getPublicAppUrlOverride: () => publicAppUrlOverride,
  getWindowPublicAppUrl: () => window.PUBLIC_APP_URL,
  canManageTeam,
  canAdministerPublicRequestLinks,
  publicAppBaseUrl,
  publicRequestUrl,
  publicRequestQrUrl,
});
let activeSection = workspaceUiState.getActiveSection();
function setActiveSectionState(value) {
  activeSection = value;
  workspaceUiState.setActiveSection(value);
}
let appError = "";
let appNotice = "";
let appNoticeTone = "success";
let noticeTimer;
let workOrderActionWarningId = "";
let workOrderActionWarning = "";

const {
  matchesSearch,
  matchesQuery,
} = createSearchFilterDisplayHelpers({
  getSearchQuery: () => workspaceUiState.getSearchQuery(),
});
const {
  compareWorkOrders,
  dueSortValue,
  prioritySortValue,
  completedSortValue,
} = createWorkOrderSortDisplayHelpers({
  getActiveStatusFilter: () => workspaceUiState.getActiveStatusFilter(),
  getWorkSort: () => workspaceUiState.getWorkSort(),
});
const {
  recordLocationId,
  matchesActiveLocation,
} = createLocationFilterDisplayHelpers({
  getLocationsReady: () => locationsReady,
  getActiveLocationId: () => activeLocationId,
});
const { applyRequestQueryFilters } = createRequestQueryFilterHelpers({
  activeCompanyId: () => activeCompanyId,
  activeLocationId: () => activeLocationId,
  assets: () => assets,
  locationsReady: () => locationsReady,
  matchesActiveLocation,
  matchesQuery,
  parentAssetFor: () => parentAssetFor,
  postgrestSearchTerm,
  requestViewFilter: () => workspaceUiState.getRequestViewFilter(),
  SEARCH_ID_PAGE_SIZE,
  searchQuery: () => workspaceUiState.getSearchQuery(),
});
const {
  teamMemberName,
  filteredMembers,
  renderMember,
  renderMyProfileForm,
  renderTeamInviteForm,
  renderTeamInvites,
} = createTeamMemberDisplayHelpers({
  getProfilesByUserId: () => profilesByUserId,
  getCurrentUser: () => session?.user,
  getCompanyMembers: () => companyMembers,
  getTeamInvites: () => teamInvites,
  getTeamInvitesReady: () => teamInvitesReady,
  getTeamInviteCancelError: () => teamInviteCancelError,
  getPendingCancelInviteId: () => pendingCancelInviteId,
  getSession: () => session,
  getLocations: () => locations,
  matchesSearch,
  escapeHtml,
  roleDescription,
  roleLabel,
  normalizeRole,
  teamMemberWorkload: (...args) => teamMemberWorkload(...args),
  canManageTeam,
  COMPANY_ROLES,
  renderLocationOptions: (...args) => renderLocationOptions(...args),
  inviteDefaultLocationLabel: (...args) => inviteDefaultLocationLabel(...args),
});
const {
  teamMemberWorkload,
} = createTeamWorkloadDisplayHelpers({
  getWorkOrders: () => workOrders,
  matchesActiveLocation,
  getDueState,
});
const {
  activeLocationName,
} = createLocationDisplayHelpers({
  getLocations: () => locations,
  getActiveLocationId: () => activeLocationId,
});
const {
  assignmentLabel,
} = createAssignmentDisplayHelpers({
  isVendorAssigned,
});
const {
  refreshWorkOrderRelatedSearch,
  fetchExactSearchedWorkOrderPage,
} = createWorkOrderSearchHelpers({
  activeCompanyId: () => activeCompanyId,
  activeLocationId: () => activeLocationId,
  assets: () => assets,
  buildScopedWorkOrderSearchQuery,
  chunkArray,
  compareWorkOrders,
  exactWorkOrderSearchCache: () => exactWorkOrderSearchCache,
  fetchPagedSearchRows,
  fetchWorkOrdersByIds,
  locationsReady: () => locationsReady,
  matchesActiveLocation,
  matchesQuery,
  parentAssetFor: () => parentAssetFor,
  parts: () => parts,
  postgrestSearchTerm,
  procedureTemplates: () => procedureTemplates,
  searchQuery: () => workspaceUiState.getSearchQuery(),
  SEARCH_ID_CHUNK_SIZE,
  setExactWorkOrderSearchCache: (value) => { exactWorkOrderSearchCache = value; },
  setWorkOrderPage: (value) => {
    workspaceUiState.setWorkOrderPage(value);
  },
  setWorkOrderRelatedSearch: (value) => { workOrderRelatedSearch = value; },
  supabaseClient: () => supabaseClient,
  warn: console.warn,
  workOrderPage: () => workspaceUiState.getWorkOrderPage(),
  WORK_ORDER_FALLBACK_SELECT: () => WORK_ORDER_FALLBACK_SELECT,
  WORK_ORDER_RELATION_SELECT: () => WORK_ORDER_RELATION_SELECT,
  WORK_ORDERS_PER_PAGE,
  workOrderSearchMode: () => workspaceUiState.getWorkOrderSearchMode(),
  workSort: () => workspaceUiState.getWorkSort(),
});
const {
  globalSearchResults,
  planningItems,
  planningPmItems,
  followUpItems,
} = createWorkspaceListBuilders({
  assets: () => assets,
  assignmentLabel,
  compareWorkOrders,
  maintenanceRequests: () => maintenanceRequests,
  matchesActiveLocation,
  matchesQuery,
  matchesSearch,
  parts: () => parts,
  preventiveSchedules: () => preventiveSchedules,
  procedureTemplates: () => procedureTemplates,
  profilesByUserId: () => profilesByUserId,
  searchQuery: () => workspaceUiState.getSearchQuery(),
  SEARCH_PREVIEW_LIMIT,
  startOfToday,
  workOrders: () => workOrders,
});
const {
  cleanWorkOrderDescription,
  descriptionWithAssignmentNote,
  descriptionWithRequestPhotoNote,
} = createWorkOrderDescriptionDisplayHelpers({
  OUTSIDE_VENDOR_NOTE,
  OUTSIDE_VENDOR_VALUE,
});
const {
  downtimeEmailSubject,
  downtimeEmailBody,
} = createDowntimeEmailDisplayHelpers({
  formatDate,
  assignmentLabel,
  cleanWorkOrderDescription,
});
const {
  equipmentSchemaMessage,
  databaseSetupRequiredMessage,
} = createSetupErrorDisplayHelpers();
const {
  friendlyWorkOrderSaveError,
} = createWorkOrderErrorDisplayHelpers();
const {
  describeWorkOrderChanges,
} = createWorkOrderChangeDisplayHelpers();
const {
  buildActivityFeed,
} = createActivityFeedDisplayHelpers();
const {
  isLowStockPart,
  lowStockParts,
  filteredParts,
  matchesPartSearch,
  partSourceOptions,
} = createPartInventoryDisplayHelpers({
  getParts: () => parts,
  getPartInventoryFilter: () => workspaceUiState.getPartInventoryFilter(),
  getPartSearchQuery: () => workspaceUiState.getPartSearchQuery(),
  matchesActiveLocation,
});
const {
  partUsageRows,
} = createPartUsageDisplayHelpers({
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
});
const {
  openMaintenanceRequests,
  requestMatchesBaseFilters,
  isConvertedRequest,
  requestMatchesViewFilter,
  filteredRequests,
  requestFilterCounts,
} = createRequestQueueDisplayHelpers({
  getMaintenanceRequests: () => maintenanceRequests,
  getProfilesByUserId: () => profilesByUserId,
  getRequestViewFilter: () => workspaceUiState.getRequestViewFilter(),
  getRequestDashboardCounts: () => requestDashboardCounts,
  matchesActiveLocation,
  matchesSearch,
});
const {
  assetDeleteBlockerMessage,
  procedureDeleteBlockerMessage,
} = createDeleteBlockerDisplayHelpers();
const {
  filteredAssets,
  parentAssetFor,
  childAssetsFor,
  isAssetDescendantOf,
} = createAssetHierarchyDisplayHelpers({
  getAssets: () => assets,
  getAssetStatusFilter: () => workspaceUiState.getAssetStatusFilter(),
  matchesActiveLocation,
  matchesSearch,
});
const {
  filteredPreventiveSchedules,
  filteredProcedureTemplates,
  renderPreventiveSchedule,
  renderProcedureTemplate,
} = createMaintenanceListDisplayHelpers({
  getPreventiveSchedules: () => preventiveSchedules,
  getProcedureTemplates: () => procedureTemplates,
  getWorkOrders: () => workOrders,
  getPendingDeleteScheduleId: () => pendingDeleteScheduleId,
  getPendingDeleteProcedureId: () => pendingDeleteProcedureId,
  matchesActiveLocation,
  matchesSearch,
  escapeHtml,
  getDueState,
  procedureDeleteBlockerMessage,
  canDeleteOperationalRecords,
});
const relationshipDisplayHelpers = createRelationshipDisplayHelpers({
  escapeHtml,
  photoMetaText,
  partUsageUnitCost,
  money,
  checklistProgress,
  getProfilesByUserId: () => profilesByUserId,
  getProcedureTemplates: () => procedureTemplates,
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
  getCommentsByWorkOrder: () => commentsByWorkOrder,
  getPhotosByWorkOrder: () => photosByWorkOrder,
  getMessageThreads: () => messageThreads,
});
const {
  renderActivityItem,
  renderRelationshipChips,
  relationshipChip,
  relationshipIcon,
} = relationshipDisplayHelpers;
const dashboardDisplayHelpers = createDashboardDisplayHelpers({
  escapeHtml,
  getActiveStatusFilter: () => workspaceUiState.getActiveStatusFilter(),
  getWorkOrderDashboardCounts: () => workOrderDashboardCounts,
  getWorkOrders: () => workOrders,
  getPreventiveSchedules: () => preventiveSchedules,
  getDueState,
  getRequestsReady: () => requestsReady,
  openMaintenanceRequests,
  matchesActiveLocation,
});
const {
  renderGaugeReadout,
  renderWorkOrderGaugeDashboard,
  renderWorkloadStrip,
  overdueWorkOrders,
  completedThisWeek,
  isCompletedThisWeek,
  completedThisMonth,
  isCompletedThisMonth,
  averageCompletionMinutes,
  preventiveDueSoon,
} = dashboardDisplayHelpers;
const emptyStateTextHelpers = createEmptyStateTextHelpers({
  getSearchQuery: () => workspaceUiState.getSearchQuery(),
  getAssetStatusFilter: () => workspaceUiState.getAssetStatusFilter(),
  getPartSearchQuery: () => workspaceUiState.getPartSearchQuery(),
  getPartInventoryFilter: () => workspaceUiState.getPartInventoryFilter(),
  assetStatusLabel,
});
const {
  requestEmptyStateText,
  assetEmptyStateText,
  partEmptyStateText,
} = emptyStateTextHelpers;
const {
  renderGlobalSearchResults,
} = createGlobalSearchDisplayHelpers({
  escapeHtml,
  statusLabel,
  assignmentLabel,
  activeLocationName,
  getSearchQuery: () => workspaceUiState.getSearchQuery(),
});
const {
  workOrdersPanelTitle,
  myWorkPanelTitle,
  workQueuePanelTitle,
  workQueuePanelSubtitle,
  renderWorkOrderCard,
  renderCardAssignmentControl,
  renderAssignmentSelect,
  renderWorkOrderAssignmentField,
} = createWorkQueueDisplayHelpers({
  statusLabel,
  teamMemberName,
  getWorkOrderAssigneeFilter: () => workspaceUiState.getWorkOrderAssigneeFilter(),
  getWorkOrderFilter: () => workspaceUiState.getWorkOrderFilter(),
  getActiveStatusFilter: () => workspaceUiState.getActiveStatusFilter(),
  getMyWorkFilter: () => workspaceUiState.getMyWorkFilter(),
  getActiveSection: () => activeSection,
  getDueState,
  getProcedureTemplates: () => procedureTemplates,
  getActiveWorkOrderId: () => activeWorkOrderId,
  getProfilesByUserId: () => profilesByUserId,
  getSession: () => session,
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
  canManageTeam,
});
const {
  renderPlanningGroup,
  renderPlanningItem,
} = createPlanningDisplayHelpers({
  escapeHtml,
  statusLabel,
  renderRelationshipChips,
});
const {
  renderMiniWorkOrder,
  renderAssetMiniWorkOrder,
} = createMiniWorkOrderDisplayHelpers({
  escapeHtml,
  statusLabel,
  relationshipIcon,
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
  getPhotosByWorkOrder: () => photosByWorkOrder,
});
const {
  renderWorkPagination,
  renderPartsPagination,
  renderAssetsPagination,
  renderListPagination,
} = createPaginationDisplayHelpers({
  WORK_ORDERS_PER_PAGE,
  PARTS_PER_PAGE,
  ASSETS_PER_PAGE,
  LIST_ITEMS_PER_PAGE,
  getWorkOrderPage: () => workspaceUiState.getWorkOrderPage(),
  getPartsPage: () => workspaceUiState.getPartsPage(),
  getAssetsPage: () => workspaceUiState.getAssetsPage(),
});
const {
  renderLocationOptions,
  renderAssetOptions,
  renderParentAssetOptions,
  assetOptionLabel,
} = createOptionDisplayHelpers({
  escapeHtml,
  getLocations: () => locations,
  getActiveLocationId: () => activeLocationId,
  getAssets: () => assets,
  filteredAssets,
  matchesActiveLocation,
  isAssetDescendantOf,
  parentAssetFor,
});
const {
  renderSetupItem,
} = createSetupDisplayHelpers({
  escapeHtml,
});
const {
  renderMaintenanceRequestPhoto,
} = createRequestPhotoDisplayHelpers({
  escapeHtml,
  requestPhotoMetaText,
  getRequestPhotosReady: () => requestPhotosReady,
});
const {
  requestPanelSubtitle,
  renderRequestFilterBar,
  renderMaintenanceRequest,
  renderRequestFormContent,
} = createRequestDisplayHelpers({
  segmentIcon,
  escapeHtml,
  renderAssetOptions,
  renderMaintenanceRequestPhoto,
  isConvertedRequest,
  canDeleteOperationalRecords,
  getPendingDeleteRequestId: () => pendingDeleteRequestId,
  getProfilesByUserId: () => profilesByUserId,
});
const {
  renderAppIssueReport,
} = createAppIssueDisplayHelpers({
  escapeHtml,
  getProfilesByUserId: () => profilesByUserId,
  getLocations: () => locations,
});
const {
  directThreadNames,
  messageThreadScopeLabel,
} = createMessageThreadLabelDisplayHelpers({
  getLocations: () => locations,
  getMessageThreadMembers: () => messageThreadMembers,
  teamMemberName,
});
const {
  renderWorkOrderMessages,
  renderLinkedWorkMessageThread,
} = createWorkMessageDisplayHelpers({
  escapeHtml,
  formatMessageTime,
  messageThreadScopeLabel,
  getMessageThreads: () => messageThreads,
  getMessagesByThreadId: () => messagesByThreadId,
  getMessageWorkOrderLinksReady: () => messageWorkOrderLinksReady,
});
const {
  renderWorkOrderRecommendation,
} = createWorkRecommendationDisplayHelpers({
  escapeHtml,
  recommendedWorkOrderStep,
});
const {
  renderEmailHelperCommandCard,
  commandShortcut,
} = createCommandCardDisplayHelpers({
  escapeHtml,
});
const {
  renderWorkOrderCommandSummary,
} = createWorkCommandDisplayHelpers({
  escapeHtml,
  statusLabel,
  assignmentLabel,
  isVendorAssigned,
  hasCompletedSafetyDeviceCheck,
  renderEmailHelperCommandCard,
  getMessageThreads: () => messageThreads,
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
});
const {
  renderMissingWorkOrderDetail,
} = createMissingWorkDetailDisplayHelpers();
const {
  renderPartSourceOptions,
  renderPartSourceManager,
} = createPartSourceDisplayHelpers({
  escapeHtml,
  getPartSources: () => partSourceOptions(),
  getPartSuppliersReady: () => partSuppliersReady,
});
const {
  renderPart,
  renderPartsHealth,
  renderPartSearch,
  renderPartDetail: renderPartDetailMarkup,
  renderPartDangerZone,
} = createPartsDisplayHelpers({
  escapeHtml,
  money,
  isLowStockPart,
  matchesActiveLocation,
  getParts: () => parts,
  getPartDocumentsByPartId: () => partDocumentsByPartId,
  getPartDocumentsReady: () => partDocumentsReady,
  getPendingDeletePartId: () => pendingDeletePartId,
  getShowPartSourceManager: () => showPartSourceManager,
  getPartCostsReady: () => partCostsReady,
  getPartInventoryFilter: () => workspaceUiState.getPartInventoryFilter(),
  getPartSearchQuery: () => workspaceUiState.getPartSearchQuery(),
  partUsageRows,
  canDeleteParts,
  renderPartSourceOptions,
  renderPartSourceManager,
});
const {
  renderAssetCard,
} = createAssetCardDisplayHelpers({
  escapeHtml,
  assetTypeLabel,
  getWorkOrders: () => workOrders,
  getActiveAssetId: () => activeAssetId,
  parentAssetFor,
  childAssetsFor,
});
const {
  renderProcedureOptions,
} = createProcedureOptionsDisplayHelpers({
  escapeHtml,
  getProceduresReady: () => proceduresReady,
  getProcedureTemplates: () => procedureTemplates,
});
const {
  messageComposerScopeNote,
} = createMessageComposerDisplayHelpers({
  activeLocationName,
});
const {
  renderAppIssueReportForm,
  renderAppIssueReportsPanel,
} = createAppIssuePanelDisplayHelpers({
  canManageTeam,
  renderAppIssueReport,
  escapeHtml,
  getActiveSection: () => activeSection,
  getAppIssueReportsReady: () => appIssueReportsReady,
  getAppIssueReports: () => appIssueReports,
});
const {
  inviteDefaultLocationLabel,
} = createInviteLocationDisplayHelpers({
  getLocations: () => locations,
});
const {
  partSetupMessage,
} = createPartSetupDisplayHelpers({
  getPartCostsReady: () => partCostsReady,
  getPartSuppliersReady: () => partSuppliersReady,
});
const messageDisplayHelpers = createMessageDisplayHelpers({
  escapeHtml,
  getCurrentUserId: () => session?.user?.id,
  teamMemberName,
  initials,
  formatMessageTime,
  formatMessageDay,
});
const {
  renderMessageBubble,
  renderMessageList,
} = messageDisplayHelpers;
const {
  recentMessageLinkWorkOrders,
  filteredMessageThreads,
  messageThreadSearchValues,
  unreadMessageCount,
  totalUnreadMessages,
  directUnreadMessages,
} = createMessageThreadFilterDisplayHelpers({
  getWorkOrders: () => workOrders,
  matchesActiveLocation,
  getMessageThreads: () => messageThreads,
  getMessageThreadFilter: () => messageThreadFilter,
  getMessageSearchQuery: () => messageSearchQuery,
  matchesQuery,
  getMessagesByThreadId: () => messagesByThreadId,
  getMessageThreadMembers: () => messageThreadMembers,
  teamMemberName,
  messageThreadScopeLabel,
  getMessageReadsByThreadId: () => messageReadsByThreadId,
  getCurrentUser: () => session?.user,
});
const {
  renderMessageNavBadge,
} = createMessageBadgeDisplayHelpers({
  directUnreadMessages,
  totalUnreadMessages,
});
const {
  setupItems,
} = createSetupStatusDisplayHelpers({
  getSupabaseUrl: () => window.SUPABASE_URL,
  getSupabaseAnonKey: () => window.SUPABASE_ANON_KEY,
  getActiveCompanyId: () => activeCompanyId,
  getRequestsReady: () => requestsReady,
  getPublicRequestLinksReady: () => publicRequestLinksReady,
  getSchedulesReady: () => schedulesReady,
  getProceduresReady: () => proceduresReady,
  getPartCostsReady: () => partCostsReady,
  getPartSuppliersReady: () => partSuppliersReady,
  getPartDocumentsReady: () => partDocumentsReady,
  getAppIssueReportsReady: () => appIssueReportsReady,
  getMessagesReady: () => messagesReady,
  getMessageWorkOrderLinksReady: () => messageWorkOrderLinksReady,
  getOutcomesReady: () => outcomesReady,
  getSafetyChecksReady: () => safetyChecksReady,
  getAdminDeleteSqlConfirmed: () => adminDeleteSqlConfirmed,
  getPhotosReady: () => photosReady,
});
const {
  renderMessageThreadButton,
} = createMessageThreadButtonDisplayHelpers({
  escapeHtml,
  formatMessageTime,
  teamMemberName,
  messageThreadScopeLabel,
  unreadMessageCount,
  getMessagesByThreadId: () => messagesByThreadId,
  getActiveMessageThreadId: () => activeMessageThreadId,
});
const {
  workOrderMatchesStatusFilter,
} = createWorkOrderStatusFilterDisplayHelpers({
  getActiveStatusFilter: () => workspaceUiState.getActiveStatusFilter(),
  getDueState,
  isCompletedThisMonth,
  isCompletedThisWeek,
});
const {
  workOrderSearchValues,
} = createWorkOrderSearchDisplayHelpers({
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
  getCommentsByWorkOrder: () => commentsByWorkOrder,
  getEventsByWorkOrder: () => eventsByWorkOrder,
  getPhotosByWorkOrder: () => photosByWorkOrder,
  getProcedureTemplates: () => procedureTemplates,
  getStepResultsByWorkOrder: () => stepResultsByWorkOrder,
  getProfilesByUserId: () => profilesByUserId,
  statusLabel,
  assignmentLabel,
});
const {
  myWorkQueueOrders,
} = createMyWorkQueueDisplayHelpers({
  getWorkOrders: () => workOrders,
  getCurrentUser: () => session?.user,
  getMyWorkFilter: () => workspaceUiState.getMyWorkFilter(),
  matchesActiveLocation,
  matchesSearch,
  workOrderSearchValues,
});
const {
  messageCenterErrorState,
} = createMessageCenterErrorDisplayHelpers({
  isMissingColumnError,
  isColumnSchemaError,
});
const {
  appIssueReportErrorState,
} = createAppIssueErrorDisplayHelpers({
  isColumnSchemaError,
});

// OBSERVABILITY: Active location is operational state; keep it scoped per user/company so reopen behavior stays explainable.
function activeLocationStorageKey(companyId = activeCompanyId, userId = session?.user?.id) {
  return companyId && userId
    ? `${ACTIVE_LOCATION_STORAGE_KEY}:${userId}:${companyId}`
    : ACTIVE_LOCATION_STORAGE_KEY;
}

function readStoredActiveLocationId(companyId = activeCompanyId, userId = session?.user?.id) {
  const scopedKey = activeLocationStorageKey(companyId, userId);
  if (scopedKey !== ACTIVE_LOCATION_STORAGE_KEY) {
    const scopedValue = localStorage.getItem(scopedKey);
    if (scopedValue) return scopedValue;
  }
  return localStorage.getItem(ACTIVE_LOCATION_STORAGE_KEY) || "";
}

function persistActiveLocationId(locationId, companyId = activeCompanyId, userId = session?.user?.id) {
  const value = locationId || "";
  const scopedKey = activeLocationStorageKey(companyId, userId);
  if (scopedKey !== ACTIVE_LOCATION_STORAGE_KEY) {
    localStorage.setItem(scopedKey, value);
    localStorage.removeItem(ACTIVE_LOCATION_STORAGE_KEY);
    return;
  }
  localStorage.setItem(ACTIVE_LOCATION_STORAGE_KEY, value);
}

function activeCompanyMembership() {
  return companies.find((company) => company.id === activeCompanyId) || null;
}

function storedLocationForLoadedCompany() {
  const scopedKey = activeLocationStorageKey();
  const scopedLocationId = scopedKey !== ACTIVE_LOCATION_STORAGE_KEY ? localStorage.getItem(scopedKey) : "";
  if (scopedLocationId && locations.some((location) => location.id === scopedLocationId)) {
    return scopedLocationId;
  }
  const storedLocationId = readStoredActiveLocationId();
  if (storedLocationId && locations.some((location) => location.id === storedLocationId)) {
    return storedLocationId;
  }
  if (activeLocationId && locations.some((location) => location.id === activeLocationId)) {
    return activeLocationId;
  }
  const defaultLocationId = activeCompanyMembership()?.default_location_id || "";
  if (defaultLocationId && locations.some((location) => location.id === defaultLocationId)) {
    return defaultLocationId;
  }
  return locations[0]?.id || "";
}

document.addEventListener("click", (event) => {
  const confirmPartDeleteButton = event.target.closest("[data-confirm-delete-part]");
  if (!confirmPartDeleteButton) return;
  event.preventDefault();
  deletePart(confirmPartDeleteButton.dataset.confirmDeletePart);
});

document.addEventListener("submit", (event) => {
  if (event.target?.id !== "request-form") return;
  createRequest(event);
});

async function init() {
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
    renderAuth("login", "Supabase config is missing. Add your project URL and publishable anon key to supabase-config.js.");
    return;
  }

  if (window.SUPABASE_ANON_KEY === "PASTE_MY_PUBLISHABLE_KEY_HERE") {
    renderAuth("login", "Invalid API key: replace PASTE_MY_PUBLISHABLE_KEY_HERE in supabase-config.js with your Supabase publishable anon key.");
    return;
  }

  try {
    const recoveryParams = passwordRecoveryParamsFromHref(window.location.href);
    supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    if (isPasswordRecoveryParams(recoveryParams)) {
      await startPasswordRecovery(recoveryParams);
      return;
    }
    if (isAuthCallbackParams(recoveryParams)) {
      await startAuthCallback(recoveryParams);
      return;
    }
    const qrToken = publicRequestQrTokenFromUrl();
    if (qrToken) {
      await renderPublicRequestQrPage(qrToken);
      return;
    }
    const requestToken = publicRequestTokenFromUrl();
    if (requestToken) {
      await renderPublicRequestIntake(requestToken);
      return;
    }
    renderAuth("login");
    const { data } = await supabaseClient.auth.getSession();
    session = data.session;
  } catch (error) {
    renderAuth("login", `Supabase initialization failed: ${error.message}`);
    return;
  }

  supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
    session = nextSession;
    setTimeout(() => {
      render().catch((error) => {
        appError = `Could not load workspace: ${error.message || error}`;
        if (session) renderWorkspaceLoadError(appError);
        else renderAuth("login", appError);
      });
    }, 0);
  });

  await render();
}

async function render() {
  if (!session) {
    renderAuth("login");
    return;
  }

  try {
    renderWorkspaceLoading("Checking team access...");
    const inviteError = await withOperationTimeout(
      acceptTeamInvites(),
      "Team invite check timed out.",
      5000
    ).catch((error) => error);
    if (inviteError) {
      appNotice = `Team invite check skipped: ${inviteError.message || inviteError}`;
      appNoticeTone = "warning";
    }

    renderWorkspaceLoading("Loading companies...");
    await withOperationTimeout(
      loadCompanies(),
      "Company membership load timed out. Supabase may be slow or blocking the request.",
      16000
    );
  } catch (error) {
    appError = error.message || String(error);
    renderWorkspaceLoadError(appError);
    return;
  }

  if (!companies.length || appError) {
    renderCompanyCreate();
    return;
  }

  if (!activeCompanyId || !companies.some((company) => company.id === activeCompanyId)) {
    activeCompanyId = companies[0].id;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
  }

  try {
    renderWorkspaceLoading("Preparing your company profile...");
    const profileReady = await withOperationTimeout(
      ensureProfileForActiveCompany(),
      "Company profile setup timed out. Refresh and try again.",
      12000
    );
    if (!profileReady) throw new Error(appError || "Could not prepare your company profile.");

    renderWorkspaceLoading("Loading workspace data...");
    await withOperationTimeout(
      loadCompanyData(),
      "Workspace data load timed out. One of the Supabase data requests is not returning.",
      22000
    );
    renderWorkspace();
  } catch (error) {
    appError = error.message || String(error);
    renderWorkspaceLoadError(appError);
  }
}

function renderWorkspaceLoading(message) {
  document.body.classList.remove("public-qr-mode");
  app.innerHTML = workspaceLoading(message);
}

function renderWorkspaceLoadError(message) {
  document.body.classList.remove("public-qr-mode");
  app.innerHTML = workspaceLoadError(message);
  document.querySelector("#retry-workspace-load").addEventListener("click", () => render());
  document.querySelector("#auth-reset").addEventListener("click", resetLoginState);
}

function renderAuth(mode, initialError = "") {
  document.body.classList.remove("public-qr-mode");
  const isSignup = mode === "signup";
  app.innerHTML = authForm(mode, initialError);

  document.querySelector("#auth-mode").addEventListener("click", () => renderAuth(isSignup ? "login" : "signup"));
  document.querySelector("#auth-forgot-password")?.addEventListener("click", () => renderPasswordResetRequest());
  document.querySelector("#auth-reset").addEventListener("click", resetLoginState);
  document.querySelector("#auth-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const submitButton = formElement.querySelector("button[type='submit']");
    const originalButtonText = submitButton?.textContent || (isSignup ? "Sign Up" : "Log In");
    const form = new FormData(formElement);
    const email = form.get("email");
    const password = form.get("password");
    const fullName = form.get("fullName");
    const errorTarget = document.querySelector("#auth-error");
    const statusTarget = document.querySelector("#auth-status");
    errorTarget.textContent = "";
    if (statusTarget) statusTarget.textContent = "Connecting to Supabase...";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = isSignup ? "Creating..." : "Logging in...";
    }

    try {
      const response = isSignup
        ? await withOperationTimeout(
          supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
              emailRedirectTo: authCallbackRedirectUrl(),
            },
          }),
          "Sign up timed out. Check your connection and try again.",
          20000
        )
        : await signInWithPasswordWithFallback(email, password);

      if (response.error) {
        if (statusTarget) statusTarget.textContent = "";
        errorTarget.textContent = response.error.message;
        return;
      }

      if (isSignup && !response.data.session) {
        if (statusTarget) statusTarget.textContent = "";
        errorTarget.textContent = "Check your email to confirm your account. The verification link will bring you back into MaintainOps automatically.";
        return;
      }

      if (response.data.session) {
        if (statusTarget) statusTarget.textContent = "Login accepted. Loading workspace...";
        session = response.data.session;
        await render();
        return;
      }
      if (statusTarget) statusTarget.textContent = "";
      errorTarget.textContent = "Supabase did not return a login session. Check that email confirmation is complete, then try again.";
    } catch (error) {
      if (statusTarget) statusTarget.textContent = "";
      errorTarget.textContent = error.message || "Login failed. Please try again.";
    } finally {
      if (submitButton && document.body.contains(submitButton)) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

function passwordRecoveryParamsFromUrl() {
  return passwordRecoveryParamsFromHref(window.location.href);
}

function passwordRecoveryParamsFromHref(href) {
  return window.MaintainOpsAuthRedirects.authParamsFromHref(href);
}

function isPasswordRecoveryUrl() {
  return isPasswordRecoveryParams(passwordRecoveryParamsFromUrl());
}

function isPasswordRecoveryParams(params) {
  return window.MaintainOpsAuthRedirects.isPasswordRecoveryParams(params);
}

function isAuthCallbackParams(params) {
  return window.MaintainOpsAuthRedirects.isAuthCallbackParams(params);
}

async function signInWithPasswordWithFallback(email, password) {
  try {
    return await withOperationTimeout(
      supabaseClient.auth.signInWithPassword({ email, password }),
      "Login timed out. Retrying secure login...",
      12000
    );
  } catch (error) {
    if (!String(error?.message || error).includes("Retrying secure login")) throw error;
  }

  const response = await withOperationTimeout(
    fetch(`${window.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: window.SUPABASE_ANON_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }),
    "Login timed out. Check your connection and try again.",
    20000
  );
  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }
  if (!response.ok) {
    return { error: { message: payload?.error_description || payload?.msg || payload?.message || "Login failed. Check your email and password." } };
  }
  if (!payload?.access_token || !payload?.refresh_token) {
    return { error: { message: "Supabase did not return a login session. Try again." } };
  }
  return supabaseClient.auth.setSession({
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
  });
}

async function resetLoginState() {
  const statusTarget = document.querySelector("#auth-status");
  const errorTarget = document.querySelector("#auth-error");
  if (errorTarget) errorTarget.textContent = "";
  if (statusTarget) statusTarget.textContent = "Clearing saved login state...";

  try {
    if (supabaseClient) await supabaseClient.auth.signOut({ scope: "local" });
  } catch (error) {
    console.warn("Could not sign out before reset", error);
  }

  Object.keys(localStorage)
    .filter((key) => key.startsWith("maintainops.") || key.startsWith("sb-"))
    .forEach((key) => localStorage.removeItem(key));

  session = null;
  activeCompanyId = "";
  activeLocationId = "";
  appError = "";
  if (statusTarget) statusTarget.textContent = "Login reset. Try signing in again.";
  renderAuth("login", "Login reset. Try signing in again.");
}

function publicRequestTokenFromUrl() {
  const url = new URL(window.location.href);
  return String(url.searchParams.get("request") || url.searchParams.get("public_request") || "").trim();
}

function publicRequestQrTokenFromUrl() {
  const url = new URL(window.location.href);
  return String(url.searchParams.get("qr") || "").trim();
}

async function renderPublicRequestQrPage(token) {
  document.body.classList.add("public-qr-mode");
  app.innerHTML = loadingQrPage();

  let intake = null;
  try {
    const { data, error } = await withOperationTimeout(
      supabaseClient.rpc("get_public_request_intake", { request_token: token }),
      "Request QR lookup timed out."
    );
    intake = Array.isArray(data) ? data[0] : data;
    if (error || !intake) {
      renderPublicRequestError("This QR code link is inactive or invalid.");
      return;
    }
  } catch (error) {
    renderPublicRequestError("This QR code link is inactive or invalid.");
    return;
  }

  const requestUrl = publicRequestUrl(token);
  app.innerHTML = publicRequestQrPage(intake, requestUrl);

  bindPublicQrPrintEvents();
}

async function renderPublicRequestIntake(token) {
  document.body.classList.remove("public-qr-mode");
  app.innerHTML = loadingRequestForm();

  let intake = null;
  try {
    const { data, error } = await withOperationTimeout(
      supabaseClient.rpc("get_public_request_intake", { request_token: token }),
      "Request form lookup timed out."
    );
    if (error) {
      renderPublicRequestError("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");
      return;
    }
    intake = Array.isArray(data) ? data[0] : data;
  } catch (error) {
    renderPublicRequestError(error.message || "This request link could not be loaded.");
    return;
  }
  if (!intake) {
    renderPublicRequestError("This request link is inactive or invalid.");
    return;
  }

  app.innerHTML = publicRequestForm(intake);

  document.querySelector("#public-request-form").addEventListener("submit", (event) => submitPublicRequest(event, token, intake));
}

function renderPublicRequestError(message) {
  app.innerHTML = publicRequestError(message);
}

// SECURITY: Public QR intake is intentionally anonymous; all company/location authority must stay inside scoped Supabase RPCs.
async function submitPublicRequest(event, token, intake) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const errorElement = document.querySelector("#public-request-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  try {
    const { data: requestId, error } = await withOperationTimeout(
      supabaseClient.rpc("submit_public_location_request", {
        request_token: token,
        request_title: requiredText(form.get("title"), "Request title"),
        equipment_note: String(form.get("equipment_note") || "").trim() || null,
        request_description: String(form.get("description") || "").trim() || null,
        requester_name: String(form.get("requester_name") || "").trim() || null,
        requester_contact: String(form.get("requester_contact") || "").trim() || null,
        request_priority: form.get("priority") || "medium",
      }),
      "Request send timed out."
    );

    if (error) throw error;
    const photo = form.get("photo");
    let photoWarning = "";
    if (photo && photo.name) {
      const photoError = await addPhotoToMaintenanceRequest(requestId, photo);
      if (photoError) photoWarning = `Request sent, but the photo did not upload: ${photoError.message || photoError}`;
    }

    app.innerHTML = publicRequestSuccess(intake, photoWarning);
    document.querySelector("#public-request-another").addEventListener("click", () => renderPublicRequestIntake(token));
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not send the request.";
  } finally {
    if (submitButton?.isConnected) {
      submitButton.disabled = false;
      submitButton.textContent = "Send Request";
    }
  }
}

async function loadCompanies() {
  appError = "";
  const companyRpc = await getMyCompanies(supabaseClient);
  if (!companyRpc.error) {
    const seenCompanies = new Set();
    companies = (companyRpc.data || [])
      .filter((company) => {
        const key = String(company.name || "").trim().toLowerCase();
        if (seenCompanies.has(key)) return false;
        seenCompanies.add(key);
        return true;
      })
      .map((company) => ({
        id: company.id,
        name: company.name,
        logo_path: company.logo_path,
        created_at: company.created_at,
        role: normalizeRole(company.role),
        default_location_id: company.default_location_id || "",
      }));

    await loadCompanyLogoUrls();
    return;
  }

  if (!String(companyRpc.error.message || "").includes("get_my_companies")) {
    appError = `Could not load companies: ${companyRpc.error.message}`;
    companies = [];
    return;
  }

  const { data: memberships, error: membershipError } = await listUserCompanyMemberships(supabaseClient, session.user.id);

  if (membershipError && isColumnSchemaError(membershipError, ["default_location_id"])) {
    const retry = await listUserCompanyMembershipsLegacy(supabaseClient, session.user.id);
    if (!retry.error) {
      return loadCompaniesFromMembershipRows(retry.data || []);
    }
  }

  if (membershipError) {
    appError = `Could not load company memberships: ${membershipError.message}`;
    companies = [];
    return;
  }

  await loadCompaniesFromMembershipRows(memberships || []);
}

async function loadCompaniesFromMembershipRows(memberships) {
  if (!memberships.length) {
    companies = [];
    return;
  }

  const ids = memberships.map((membership) => membership.company_id);
  let { data: companyRows, error: companyError } = await listCompaniesByIds(supabaseClient, ids);

  if (companyError && isColumnSchemaError(companyError, ["logo_path"])) {
    const retry = await listCompaniesByIdsLegacy(supabaseClient, ids);
    companyRows = retry.data;
    companyError = retry.error;
  }

  if (companyError) {
    appError = `Could not load companies: ${companyError.message}`;
    companies = [];
    return;
  }

  const seenCompanies = new Set();
  companies = companyRows
    .filter((company) => {
      const key = company.name.trim().toLowerCase();
      if (seenCompanies.has(key)) return false;
      seenCompanies.add(key);
      return true;
    })
    .map((company) => ({
      ...company,
      role: normalizeRole(memberships.find((membership) => membership.company_id === company.id)?.role),
      default_location_id: memberships.find((membership) => membership.company_id === company.id)?.default_location_id || "",
    }));

  await loadCompanyLogoUrls();
}

async function loadCompanyLogoUrls() {
  await Promise.all(companies.map(async (company) => {
    company.logoUrl = "";
    company.logoError = "";
    if (!company.logo_path) return;
    const { data, error } = await supabaseClient.storage
      .from("company-logos")
      .createSignedUrl(company.logo_path, 60 * 10);
    if (error) {
      company.logoError = error.message;
      return;
    }
    company.logoUrl = data?.signedUrl || "";
  }));
}

function renderCompanyCreate() {
  app.innerHTML = companyCreateForm(appError);

  document.querySelector("#company-form").addEventListener("submit", createCompany);
  document.querySelector("#sign-out").addEventListener("click", () => supabaseClient.auth.signOut());
}

async function createCompany(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#company-error");
  const name = String(new FormData(formElement).get("name") || "").trim();
  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  errorTarget.textContent = "";

  try {
    if (!name) throw new Error("Company name is required.");
    const existing = companies.find((company) => company.name.trim().toLowerCase() === name.trim().toLowerCase());
    if (existing) {
      activeCompanyId = existing.id;
      localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
      await render();
      return;
    }

    const { data, error } = await withOperationTimeout(
      supabaseClient.rpc("create_company", { company_name: name }),
      "Company creation timed out."
    );

    if (error) {
      errorTarget.textContent = error.message.includes("create_company")
        ? "Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again."
        : error.message;
      return;
    }

    activeCompanyId = data;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
    const profileReady = await ensureProfileForActiveCompany(name);
    if (!profileReady) throw new Error(appError || "Could not create your company profile.");
    await seedStarterAssets();
    await render();
  } catch (error) {
    errorTarget.textContent = error.message || "Could not create company.";
  } finally {
    if (submitButton?.isConnected) {
      submitButton.disabled = false;
      submitButton.textContent = "Create Company";
    }
  }
}

async function ensureProfileForActiveCompany() {
  const { error } = await withOperationTimeout(
    supabaseClient.rpc("ensure_company_profile", {
      target_company_id: activeCompanyId,
    }),
    "Profile setup timed out."
  );

  if (error) {
    appError = `Could not create your company profile: ${error.message}`;
    return false;
  }
  return true;
}

async function acceptTeamInvites() {
  if (!teamInvitesReady) return;
  const { error } = await supabaseClient.rpc("accept_company_invites");
  if (error && (error.message.includes("accept_company_invites") || isColumnSchemaError(error, ["company_invites"]))) {
    teamInvitesReady = false;
  }
}

async function seedStarterAssets() {
  const locationId = activeLocationDatabaseId();
  await withOperationTimeout(
    supabaseClient.from("assets").insert([
      { company_id: activeCompanyId, location_id: locationId, name: "Packaging Line 2", asset_code: "PKG-002", location: "Plant A / Floor 1", status: "running" },
      { company_id: activeCompanyId, location_id: locationId, name: "Boiler Room Pump", asset_code: "BLR-P-014", location: "Utilities / Boiler Room", status: "watch" },
    ]),
    "Starter equipment setup timed out."
  );
}

const WORK_ORDER_RELATION_SELECT = "*, assets(name, location_id), locations!work_orders_company_location_fkey(name), assigned_profile:profiles!work_orders_company_assigned_profile_fkey(full_name)";
const WORK_ORDER_FALLBACK_SELECT = "*, assets(name), assigned_profile:profiles!work_orders_company_assigned_profile_fkey(full_name)";

async function loadServerWorkOrderSlice() {
  await refreshWorkOrderRelatedSearch();
  const [pageResponse, dashboardCounts, myCounts] = await Promise.all([
    fetchWorkOrderPage(),
    loadWorkOrderDashboardCounts(),
    loadMyWorkDashboardCounts(),
  ]);

  if (pageResponse.error && isColumnSchemaError(pageResponse.error, ["location_id", "locations"])) {
    const fallbackResponse = await fetchWorkOrderPage({ includeLocationRelation: false });
    workOrders = fallbackResponse.data || [];
    workOrderServerTotal = fallbackResponse.count ?? workOrders.length;
    workOrderDashboardCounts = dashboardCounts;
    myWorkDashboardCounts = myCounts;
    return fallbackResponse;
  }

  workOrders = pageResponse.data || [];
  workOrderServerTotal = pageResponse.count ?? workOrders.length;
  workOrderDashboardCounts = dashboardCounts;
  myWorkDashboardCounts = myCounts;
  return pageResponse;
}

const REQUEST_RELATION_SELECT = "*, assets(name, location_id), locations(name)";
const REQUEST_ASSET_FALLBACK_SELECT = "*, assets(name)";
const REQUEST_FALLBACK_SELECT = "*";

async function loadServerRequestSlice() {
  const activeFilter = workspaceUiState.getRequestViewFilter() || "active";
  const [pageResponse, counts] = await Promise.all([
    fetchRequestPage(activeFilter),
    loadRequestDashboardCounts(),
  ]);

  maintenanceRequests = pageResponse.data || [];
  requestServerTotal = pageResponse.count ?? maintenanceRequests.length;
  requestDashboardCounts = counts;

  return pageResponse;
}

async function fetchRequestPage(filter = workspaceUiState.getRequestViewFilter(), options = {}) {
  const page = Math.max(1, workspaceUiState.getRequestsPage());
  const from = (page - 1) * LIST_ITEMS_PER_PAGE;
  const to = from + LIST_ITEMS_PER_PAGE - 1;
  const selectClause = options.includeRelations === false
    ? REQUEST_FALLBACK_SELECT
    : options.includeLocationRelation === false
      ? REQUEST_ASSET_FALLBACK_SELECT
      : REQUEST_RELATION_SELECT;

  const response = await applyRequestQueryFilters(
    supabaseClient
      .from("maintenance_requests")
      .select(selectClause, { count: "exact" }),
    filter
  )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (response.error && options.includeLocationRelation !== false && isColumnSchemaError(response.error, ["location_id", "locations"])) {
    return fetchRequestPage(filter, { includeLocationRelation: false });
  }
  if (response.error && options.includeRelations !== false) {
    return fetchRequestPage(filter, { includeRelations: false });
  }
  if (!response.error && response.count && page > 1 && from >= response.count) {
    workspaceUiState.setRequestsPage(Math.max(1, Math.ceil(response.count / LIST_ITEMS_PER_PAGE)));
    return fetchRequestPage(filter, options);
  }
  return response;
}

async function loadRequestDashboardCounts() {
  const [active, converted, all] = await Promise.all([
    countRequests("active"),
    countRequests("converted"),
    countRequests("all"),
  ]);
  return { active, converted, all };
}

async function countRequests(filter) {
  const response = await applyRequestQueryFilters(
    supabaseClient
      .from("maintenance_requests")
      .select("id", { count: "exact", head: true }),
    filter
  );
  if (response.error) {
    console.warn("Request count failed", response.error);
    return 0;
  }
  return response.count || 0;
}

async function fetchWorkOrderPage(options = {}) {
  if (workspaceUiState.getWorkOrderSearchMode() && workspaceUiState.getSearchQuery().trim()) {
    return fetchExactSearchedWorkOrderPage(options);
  }

  const page = Math.max(1, workspaceUiState.getWorkOrderPage());
  const from = (page - 1) * WORK_ORDERS_PER_PAGE;
  const to = from + WORK_ORDERS_PER_PAGE - 1;
  const selectClause = options.includeLocationRelation === false ? WORK_ORDER_FALLBACK_SELECT : WORK_ORDER_RELATION_SELECT;
  const response = await applyWorkOrderListFilters(
    selectWorkOrders(supabaseClient, selectClause, { count: "exact" })
  )
    .range(from, to);

  if (!response.error && response.count && page > 1 && from >= response.count) {
    workspaceUiState.setWorkOrderPage(Math.max(1, Math.ceil(response.count / WORK_ORDERS_PER_PAGE)));
    return fetchWorkOrderPage(options);
  }

  return response;
}

async function loadWorkOrderDashboardCounts() {
  const [activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek] = await Promise.all([
    countWorkOrders({ statusFilter: "active", includeQueue: false, includeSearch: false }),
    countWorkOrders({ statusFilter: "open", includeQueue: false, includeSearch: false }),
    countWorkOrders({ statusFilter: "in_progress", includeQueue: false, includeSearch: false }),
    countWorkOrders({ statusFilter: "blocked", includeQueue: false, includeSearch: false }),
    countWorkOrders({ statusFilter: "overdue", includeQueue: false, includeSearch: false }),
    countWorkOrders({ statusFilter: "completed_month", includeQueue: false, includeSearch: false }),
    countWorkOrders({ statusFilter: "completed_week", includeQueue: false, includeSearch: false }),
  ]);
  return { activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek };
}

async function loadMyWorkDashboardCounts() {
  const [activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek] = await Promise.all([
    countWorkOrders({ statusFilter: "active", section: "mywork", includeQueue: true, includeSearch: true }),
    countWorkOrders({ statusFilter: "open", section: "mywork", includeQueue: true, includeSearch: true }),
    countWorkOrders({ statusFilter: "in_progress", section: "mywork", includeQueue: true, includeSearch: true }),
    countWorkOrders({ statusFilter: "blocked", section: "mywork", includeQueue: true, includeSearch: true }),
    countWorkOrders({ statusFilter: "overdue", section: "mywork", includeQueue: true, includeSearch: true }),
    countWorkOrders({ statusFilter: "completed_month", section: "mywork", includeQueue: true, includeSearch: true }),
    countWorkOrders({ statusFilter: "completed_week", section: "mywork", includeQueue: true, includeSearch: true }),
  ]);
  return { activeWork, newWork, inProgress, blocked, overdue, completedMonth, completedWeek };
}

async function countWorkOrders(options = {}) {
  const response = await applyWorkOrderFilters(countWorkOrdersQuery(supabaseClient), options);
  if (response.error) {
    console.warn("Work order count failed", response.error);
    return 0;
  }
  return response.count || 0;
}

async function loadCompanyData() {
  let [locationResponse, assetResponse, scheduleResponse, partsResponse, procedureResponse, issueReportResponse] = await Promise.all([
    listLocations(supabaseClient, activeCompanyId),
    listAssets(supabaseClient, activeCompanyId),
    supabaseClient
      .from("preventive_schedules")
      .select("*, assets(name, location_id)")
      .eq("company_id", activeCompanyId)
      .order("next_due_at", { ascending: true }),
    listParts(supabaseClient, activeCompanyId),
    supabaseClient
      .from("procedure_templates")
      .select("*, procedure_steps(*)")
      .eq("company_id", activeCompanyId)
      .order("name"),
    listAppIssueReports(supabaseClient, activeCompanyId),
  ]);

  locationsReady = !locationResponse.error;
  locations = locationResponse.error ? [] : (locationResponse.data || []);
  activeLocationId = storedLocationForLoadedCompany();
  persistActiveLocationId(activeLocationId);
  assets = assetResponse.data || [];
  preventiveSchedules = scheduleResponse.error ? [] : (scheduleResponse.data || []);
  parts = partsResponse.error ? [] : (partsResponse.data || []);
  appIssueReportsReady = !issueReportResponse.error;
  appIssueReports = issueReportResponse.error ? [] : (issueReportResponse.data || []);
  procedureTemplates = procedureResponse.error ? [] : (procedureResponse.data || []).map((template) => ({
    ...template,
    procedure_steps: (template.procedure_steps || []).sort((a, b) => Number(a.position) - Number(b.position)),
  }));
  const workOrderResponse = await loadServerWorkOrderSlice();
  const requestResponse = await loadServerRequestSlice();
  if (activeWorkOrderId && !workOrders.some((workOrder) => workOrder.id === activeWorkOrderId)) {
    const activeResponse = await fetchWorkOrderById(supabaseClient, activeCompanyId, activeWorkOrderId, WORK_ORDER_RELATION_SELECT);
    if (!activeResponse.error && activeResponse.data) {
      workOrders = [activeResponse.data, ...workOrders];
    }
  }
  requestsReady = !requestResponse.error;
  partCostsReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "unit_cost");
  partSuppliersReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "supplier_name");
  schedulesReady = !scheduleResponse.error;
  outcomesReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "resolution_summary");
  safetyChecksReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "safety_devices_checked");
  proceduresReady = !procedureResponse.error;
  await Promise.all([loadProfiles(), loadMembers(), loadMessageCenter(), loadPublicRequestLinks(), addSignedRequestPhotoUrls(), loadComments(), loadPhotos(), loadPartsUsed(), loadPartDocuments(), loadStepResults(), loadWorkOrderEvents()]);
}

async function reloadWorkOrderQueue() {
  try {
    const response = await loadServerWorkOrderSlice();
    if (response.error) {
      showNotice(`Could not load work orders: ${response.error.message}`, "warning");
      return;
    }
    await Promise.all([loadComments(), loadPhotos(), loadPartsUsed(), loadStepResults(), loadWorkOrderEvents()]);
    renderWorkspace();
  } catch (error) {
    showNotice(`Could not load work orders: ${error.message || error}`, "warning");
  }
}

async function reloadRequestQueue() {
  try {
    const response = await loadServerRequestSlice();
    requestsReady = !response.error;
    if (response.error) {
      showNotice(`Could not load requests: ${response.error.message}`, "warning");
      return;
    }
    await addSignedRequestPhotoUrls();
    renderWorkspace();
  } catch (error) {
    requestsReady = false;
    showNotice(`Could not load requests: ${error.message || error}`, "warning");
  }
}

async function loadProfiles() {
  const { data } = await listProfiles(supabaseClient, activeCompanyId);

  profilesByUserId = (data || []).reduce((profiles, profile) => {
    profiles[profile.user_id] = profile;
    return profiles;
  }, {});
}

async function loadMembers() {
  const { data } = await listCompanyMembers(supabaseClient, activeCompanyId);

  companyMembers = data || [];
  await loadTeamInvites();
}

async function loadTeamInvites() {
  if (!teamInvitesReady) {
    teamInvites = [];
    return;
  }
  const { data, error } = await listTeamInvites(supabaseClient, activeCompanyId);

  if (error) {
    if (isColumnSchemaError(error, ["default_location_id"])) {
      const retry = await listTeamInvitesLegacy(supabaseClient, activeCompanyId);
      teamInvites = retry.error ? [] : (retry.data || []);
      if (retry.error && (isColumnSchemaError(retry.error, ["company_invites"]) || retry.error.message.includes("company_invites"))) {
        teamInvitesReady = false;
      }
      return;
    }
    if (isColumnSchemaError(error, ["company_invites"]) || error.message.includes("company_invites")) {
      teamInvitesReady = false;
      teamInvites = [];
      return;
    }
    teamInvites = [];
    return;
  }

  teamInvites = data || [];
}

async function loadMessageCenter() {
  messagesReady = true;
  messageThreads = [];
  messageThreadMembers = [];
  messagesByThreadId = {};
  messageReadsByThreadId = {};

  const { data: threads, error: threadError } = await supabaseClient
    .from("message_threads")
    .select("*")
    .eq("company_id", activeCompanyId)
    .order("updated_at", { ascending: false });

  if (threadError) {
    messagesReady = false;
    return;
  }

  messageThreads = threads || [];
  if (!messageThreads.length) {
    setActiveMessageThreadIdState("");
    return;
  }

  const threadIds = messageThreads.map((thread) => thread.id);
  const [memberResponse, messageResponse, readResponse] = await Promise.all([
    supabaseClient
      .from("message_thread_members")
      .select("*")
      .eq("company_id", activeCompanyId)
      .in("thread_id", threadIds),
    supabaseClient
      .from("messages")
      .select("*")
      .eq("company_id", activeCompanyId)
      .in("thread_id", threadIds)
      .order("created_at", { ascending: true }),
    supabaseClient
      .from("message_reads")
      .select("*")
      .eq("company_id", activeCompanyId)
      .eq("user_id", session.user.id)
      .in("thread_id", threadIds),
  ]);

  if (memberResponse.error || messageResponse.error || readResponse.error) {
    messagesReady = false;
    return;
  }

  messageThreadMembers = memberResponse.data || [];
  messagesByThreadId = (messageResponse.data || []).reduce((groups, message) => {
    if (!groups[message.thread_id]) groups[message.thread_id] = [];
    groups[message.thread_id].push(message);
    return groups;
  }, {});
  messageReadsByThreadId = (readResponse.data || []).reduce((reads, read) => {
    reads[read.thread_id] = read;
    return reads;
  }, {});

  if (!activeMessageThreadId || !messageThreads.some((thread) => thread.id === activeMessageThreadId)) {
    setActiveMessageThreadIdState(messageThreads[0]?.id || "");
  }
}

async function loadPublicRequestLinks() {
  publicRequestLinks = [];
  publicRequestLinksReady = true;
  if (!requestsReady || !locationsReady) return;

  const { data, error } = await supabaseClient
    .from("public_request_links")
    .select("*")
    .eq("company_id", activeCompanyId)
    .order("created_at", { ascending: true });

  if (error) {
    publicRequestLinksReady = false;
    publicRequestLinks = [];
    return;
  }

  publicRequestLinks = data || [];
}

async function loadComments() {
  commentsError = "";
  if (!workOrders.length) {
    commentsByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data, error } = await supabaseClient
    .from("work_order_comments")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: true });

  if (error) {
    commentsByWorkOrder = {};
    commentsError = `Could not load comments: ${error.message}`;
    return;
  }

  commentsByWorkOrder = (data || []).reduce((groups, comment) => {
    groups[comment.work_order_id] ||= [];
    groups[comment.work_order_id].push(comment);
    return groups;
  }, {});
}

async function loadPhotos() {
  if (!workOrders.length) {
    photosByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data, error } = await supabaseClient
    .from("work_order_photos")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    photosReady = false;
    photosByWorkOrder = {};
    return;
  }
  photosReady = true;

  photosByWorkOrder = (data || []).reduce((groups, photo) => {
    groups[photo.work_order_id] ||= [];
    groups[photo.work_order_id].push(photo);
    return groups;
  }, {});

  await addSignedPhotoUrls();
}

async function loadPartsUsed() {
  if (!workOrders.length) {
    partsUsedByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data } = await supabaseClient
    .from("work_order_parts")
    .select("*, parts(*)")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: true });

  partsUsedByWorkOrder = (data || []).reduce((groups, row) => {
    groups[row.work_order_id] ||= [];
    groups[row.work_order_id].push(row);
    return groups;
  }, {});
}

async function loadPartDocuments() {
  if (!parts.length) {
    partDocumentsByPartId = {};
    partDocumentsReady = true;
    return;
  }

  const ids = parts.map((part) => part.id);
  const { data, error } = await supabaseClient
    .from("part_documents")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("part_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    partDocumentsReady = false;
    partDocumentsByPartId = {};
    return;
  }

  partDocumentsReady = true;
  partDocumentsByPartId = (data || []).reduce((groups, document) => {
    groups[document.part_id] ||= [];
    groups[document.part_id].push(document);
    return groups;
  }, {});

  await addSignedPartDocumentUrls();
}

async function loadWorkOrderEvents() {
  if (!workOrders.length) {
    eventsByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data } = await supabaseClient
    .from("work_order_events")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

  if (!data) {
    eventsByWorkOrder = {};
    return;
  }

  eventsByWorkOrder = (data || []).reduce((groups, event) => {
    groups[event.work_order_id] ||= [];
    groups[event.work_order_id].push(event);
    return groups;
  }, {});
}

async function loadStepResults() {
  if (!workOrders.length) {
    stepResultsByWorkOrder = {};
    return;
  }

  const ids = workOrders.map((workOrder) => workOrder.id);
  const { data } = await supabaseClient
    .from("work_order_step_results")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids);

  stepResultsByWorkOrder = (data || []).reduce((groups, result) => {
    groups[result.work_order_id] ||= {};
    groups[result.work_order_id][result.procedure_step_id] = result;
    return groups;
  }, {});
}

async function addSignedPhotoUrls() {
  const photos = Object.values(photosByWorkOrder).flat();
  await Promise.all(photos.map(async (photo) => {
    const { data } = await supabaseClient.storage
      .from("work-order-photos")
      .createSignedUrl(photo.storage_path, 60 * 10);
    photo.signedUrl = data?.signedUrl || "";
  }));
}

async function addSignedRequestPhotoUrls() {
  requestPhotosReady = true;
  const requestsWithPhotos = maintenanceRequests.filter((request) => request.photo_storage_path);
  if (!requestsWithPhotos.length) return;

  await Promise.all(requestsWithPhotos.map(async (request) => {
    const { data, error } = await supabaseClient.storage
      .from("maintenance-request-photos")
      .createSignedUrl(request.photo_storage_path, 60 * 10);
    if (error) {
      requestPhotosReady = false;
      request.photoSignedUrl = "";
      return;
    }
    request.photoSignedUrl = data?.signedUrl || "";
  }));
}

async function addSignedPartDocumentUrls() {
  const documents = Object.values(partDocumentsByPartId).flat();
  await Promise.all(documents.map(async (document) => {
    const { data } = await supabaseClient.storage
      .from("part-documents")
      .createSignedUrl(document.storage_path, 60 * 10);
    document.signedUrl = data?.signedUrl || "";
  }));
}

function renderWorkspace() {
  const activeCompany = companies.find((company) => company.id === activeCompanyId);
  const navItems = visibleNavItems();
  if (!navItems.some(([id]) => id === activeSection)) {
    setActiveSectionState("mywork");
  }
  const isWorkArea = activeSection === "mywork" || activeSection === "work";
  const myWorkGaugeFilters = ["active", "open", "in_progress", "blocked", "overdue", "completed_month", "completed_week"];
  if (activeSection === "mywork" && !myWorkGaugeFilters.includes(workspaceUiState.getActiveStatusFilter())) {
    workspaceUiState.setActiveStatusFilter("active");
  }
  const activeStatusFilter = workspaceUiState.getActiveStatusFilter();
  const myWorkFilter = workspaceUiState.getMyWorkFilter();
  const workOrderFilter = workspaceUiState.getWorkOrderFilter();
  const workOrderAssigneeFilter = workspaceUiState.getWorkOrderAssigneeFilter();
  const workSort = workspaceUiState.getWorkSort();
  const requestViewFilter = workspaceUiState.getRequestViewFilter();
  const searchQuery = workspaceUiState.getSearchQuery();
  const workOrderSearchMode = workspaceUiState.getWorkOrderSearchMode();
  const isViewingWorkOrderSearch = activeSection === "work" && workOrderSearchMode && Boolean(searchQuery.trim());
  const profile = profilesByUserId[session.user.id] || {};
  const canSwitchLocation = canSwitchLocations();
  const locationSwitchDisabled = locationsReady && canSwitchLocation ? "" : "disabled";
  const locationSwitchNote = locationsReady
    ? (canSwitchLocation ? "Changing this moves your active workspace." : "Enable Mobile tech in Team to switch locations.")
    : "Run location setup to enable locations.";
  const showWorkDashboard = activeSection === "work" && !isViewingWorkOrderSearch && !activeAssetId && !activeWorkOrderId && !quickFixMode && !createWorkOrderMode;
  const showIssueReportPanel = reportIssueMode && !activeAssetId && !activeWorkOrderId && !quickFixMode && !createWorkOrderMode;
  const showingRequestsInWorkQueue = activeSection === "work" && activeStatusFilter === "requests";
  const activeRequestViewFilter = showingRequestsInWorkQueue ? "active" : requestViewFilter;
  const requestCounts = requestFilterCounts();
  const visibleRequests = filteredRequests(activeRequestViewFilter);
  const visibleRequestCount = requestCounts[activeRequestViewFilter] ?? requestServerTotal;
  const visibleWorkOrders = workOrders;
  const visibleWorkOrderCount = showingRequestsInWorkQueue ? 0 : workOrderServerTotal;
  const totalWorkOrderPages = Math.max(1, Math.ceil(visibleWorkOrderCount / WORK_ORDERS_PER_PAGE));
  if (workspaceUiState.getWorkOrderPage() > totalWorkOrderPages) workspaceUiState.setWorkOrderPage(totalWorkOrderPages);
  if (workspaceUiState.getWorkOrderPage() < 1) workspaceUiState.setWorkOrderPage(1);
  const pagedWorkOrders = visibleWorkOrders;
  const myWork = workOrders.filter((workOrder) => workOrder.assigned_to === session.user.id);
  const myOpenWork = myWork.filter((workOrder) => workOrder.status !== "completed");
  const createdByMe = workOrders.filter((workOrder) => workOrder.created_by === session.user.id && workOrder.status !== "completed");
  const visibleAssets = filteredAssets();
  const visibleSchedules = filteredPreventiveSchedules();
  const visibleProcedures = filteredProcedureTemplates();
  const visibleParts = filteredParts();
  const showGlobalSearch = Boolean(searchQuery.trim()) && !workOrderSearchMode && !activeAssetId && !activeWorkOrderId && !activePartId && !quickFixMode && !createWorkOrderMode;
  const globalResults = showGlobalSearch ? globalSearchResults() : null;
  const totalPartsPages = Math.max(1, Math.ceil(visibleParts.length / PARTS_PER_PAGE));
  if (workspaceUiState.getPartsPage() > totalPartsPages) workspaceUiState.setPartsPage(totalPartsPages);
  if (workspaceUiState.getPartsPage() < 1) workspaceUiState.setPartsPage(1);
  const partsPage = workspaceUiState.getPartsPage();
  const pagedParts = visibleParts.slice((partsPage - 1) * PARTS_PER_PAGE, partsPage * PARTS_PER_PAGE);
  const totalAssetPages = Math.max(1, Math.ceil(visibleAssets.length / ASSETS_PER_PAGE));
  if (workspaceUiState.getAssetsPage() > totalAssetPages) workspaceUiState.setAssetsPage(totalAssetPages);
  if (workspaceUiState.getAssetsPage() < 1) workspaceUiState.setAssetsPage(1);
  const assetsPage = workspaceUiState.getAssetsPage();
  const pagedAssets = visibleAssets.slice((assetsPage - 1) * ASSETS_PER_PAGE, assetsPage * ASSETS_PER_PAGE);
  const visibleMembers = filteredMembers();
  const totalRequestPages = Math.max(1, Math.ceil(visibleRequestCount / LIST_ITEMS_PER_PAGE));
  if (workspaceUiState.getRequestsPage() > totalRequestPages) workspaceUiState.setRequestsPage(totalRequestPages);
  if (workspaceUiState.getRequestsPage() < 1) workspaceUiState.setRequestsPage(1);
  const requestsPage = workspaceUiState.getRequestsPage();
  const pagedRequests = visibleRequests;
  const totalSchedulePages = Math.max(1, Math.ceil(visibleSchedules.length / LIST_ITEMS_PER_PAGE));
  if (workspaceUiState.getSchedulesPage() > totalSchedulePages) workspaceUiState.setSchedulesPage(totalSchedulePages);
  if (workspaceUiState.getSchedulesPage() < 1) workspaceUiState.setSchedulesPage(1);
  const schedulesPage = workspaceUiState.getSchedulesPage();
  const pagedSchedules = visibleSchedules.slice((schedulesPage - 1) * LIST_ITEMS_PER_PAGE, schedulesPage * LIST_ITEMS_PER_PAGE);
  const totalProcedurePages = Math.max(1, Math.ceil(visibleProcedures.length / LIST_ITEMS_PER_PAGE));
  if (workspaceUiState.getProceduresPage() > totalProcedurePages) workspaceUiState.setProceduresPage(totalProcedurePages);
  if (workspaceUiState.getProceduresPage() < 1) workspaceUiState.setProceduresPage(1);
  const proceduresPage = workspaceUiState.getProceduresPage();
  const pagedProcedures = visibleProcedures.slice((proceduresPage - 1) * LIST_ITEMS_PER_PAGE, proceduresPage * LIST_ITEMS_PER_PAGE);
  const totalMemberPages = Math.max(1, Math.ceil(visibleMembers.length / LIST_ITEMS_PER_PAGE));
  if (workspaceUiState.getMembersPage() > totalMemberPages) workspaceUiState.setMembersPage(totalMemberPages);
  if (workspaceUiState.getMembersPage() < 1) workspaceUiState.setMembersPage(1);
  const membersPage = workspaceUiState.getMembersPage();
  const pagedMembers = visibleMembers.slice((membersPage - 1) * LIST_ITEMS_PER_PAGE, membersPage * LIST_ITEMS_PER_PAGE);
  const renderCommandStack = (variant = "desktop") => {
    const isMobile = variant === "mobile";
    const suffix = isMobile ? "-mobile" : "";
    return `
      <div class="command-stack ${isMobile ? "mobile-command-stack" : "desktop-command-stack"}">
        <header class="topbar">
          <div class="topbar-main">
            <p class="eyebrow">Authenticated Multi-Tenant MVP</p>
            <div class="company-banner-title">
              ${activeCompany?.logoUrl ? `<img class="company-banner-logo" src="${escapeHtml(activeCompany.logoUrl)}" alt="${escapeHtml(activeCompany?.name || "Company")} logo">` : ""}
              <div>
                <h1>${escapeHtml(activeCompany?.name || "Company")}</h1>
                <label class="topbar-location-switcher">
                  <span>Location</span>
                  <select class="location-select-control" data-location-select ${locationSwitchDisabled} title="${escapeHtml(locationSwitchNote)}">
                    ${locations.length ? "" : `<option value="">Run location setup</option>`}
                    ${locations.map((location) => `<option value="${location.id}" ${location.id === activeLocationId ? "selected" : ""}>${escapeHtml(location.name)}</option>`).join("")}
                  </select>
                  <small>${escapeHtml(locationSwitchNote)}</small>
                </label>
              </div>
            </div>
          </div>
          <div class="topbar-actions">
            <button class="primary-button quick-fix-button" id="show-quick-fix${suffix}" data-command-action="quick-fix" type="button">Quick Fix</button>
            <button class="secondary-button report-issue-button" id="show-report-issue${suffix}" data-command-action="report-issue" type="button">Report Issue</button>
            <details class="topbar-more">
              <summary>More</summary>
              <div>
                <button class="primary-button work-action-button" id="show-create-work-order${suffix}" data-command-action="create-work-order" type="button">New Work Order</button>
                <button class="secondary-button request-action-button" id="show-request${suffix}" data-command-action="request" type="button">Submit Request</button>
                <button class="secondary-button export-action-button" id="export-csv${suffix}" data-command-action="export-csv" type="button">Export CSV</button>
              </div>
            </details>
          </div>
        </header>

        ${appNotice ? `<div class="app-notice ${appNoticeTone}">${escapeHtml(appNotice)}</div>` : ""}
        ${appNotice && appNoticeTone === "success" ? `<div class="save-overlay" aria-hidden="true">SAVED</div>` : ""}
        ${appNotice && appNoticeTone === "warning" ? `<div class="warning-overlay" aria-hidden="true">ACTION NEEDED</div>` : ""}

        <label class="search-bar">
          Search workspace
          <input id="workspace-search${suffix}" class="workspace-search-input" type="search" value="${escapeHtml(searchQuery)}" placeholder="Search work, equipment, parts, people">
        </label>
      </div>
    `;
  };
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">MO</span>
          <span><strong>MaintainOps</strong><small>Maintenance work, clearly tracked.</small></span>
        </div>
        <details class="sidebar-controls">
          <summary>Workspace</summary>
          <label class="company-switcher">
            Company
            <select id="company-select">
              ${companies.map((company) => `<option value="${escapeHtml(company.id)}" ${company.id === activeCompanyId ? "selected" : ""}>${escapeHtml(company.name)}</option>`).join("")}
            </select>
          </label>
          <label class="company-switcher">
            Location
            <select id="location-select" ${locationSwitchDisabled}>
              ${locations.length ? "" : `<option value="">Run location setup</option>`}
              ${locations.map((location) => `<option value="${location.id}" ${location.id === activeLocationId ? "selected" : ""}>${escapeHtml(location.name)}</option>`).join("")}
            </select>
          </label>
          ${locationsReady ? "" : `<p class="warning-text">Run supabase/step-next-locations.sql to enable locations.</p>`}
          <button class="secondary-button" id="new-company" type="button">New Company</button>
          <button class="text-button inverse" data-sign-out type="button">Sign out</button>
        </details>
        <button class="text-button inverse desktop-sign-out" data-sign-out type="button">Sign out</button>
        ${renderCommandStack("mobile")}
        <nav class="section-nav" aria-label="Workspace sections">
          ${navItems.map(([id, label]) => `<button class="nav-${id} ${activeSection === id ? "active" : ""}" data-section="${id}" type="button">${navIcon(id)}<span>${label}</span>${id === "messages" ? renderMessageNavBadge() : ""}</button>`).join("")}
        </nav>
      </aside>

      <main class="workspace">
        ${renderCommandStack("desktop")}

        ${showGlobalSearch ? renderGlobalSearchResults(globalResults) : ""}

        ${showIssueReportPanel ? renderAppIssueReportForm() : ""}

        ${showWorkDashboard ? `
          <section class="panel full-width screen-gauge-panel">
            <div class="panel-header">
              <h2>Work Orders</h2>
              <span>${escapeHtml(activeLocationName())}</span>
            </div>
            ${renderWorkOrderGaugeDashboard()}
          </section>
        ` : ""}

        <section class="layout-grid single-column ${showGlobalSearch ? "hidden-section" : ""}">
          ${isWorkArea ? `
            ${activeSection !== "assets" && (activeAssetId || activeWorkOrderId || quickFixMode || createWorkOrderMode) ? `
              <section class="panel full-width focus-panel">
                <div class="panel-header">
                  <h2>${activeAssetId ? "Equipment Detail" : activeWorkOrderId ? "Work Order Detail" : quickFixMode ? "Quick Fix" : "Create Work Order"}</h2>
                  <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to ${activeSection === "work" ? "Work Orders" : "My Work"}</button>
                </div>
                <div id="detail-panel">${activeAssetId ? renderAssetDetail() : activeWorkOrderId ? renderWorkOrderDetail() : quickFixMode ? renderQuickFixForm() : renderCreateWorkOrder()}</div>
              </section>
            ` : `
              <section class="panel full-width my-work-panel queue-panel">
                <div class="panel-header">
                  <h2>${isViewingWorkOrderSearch ? "Matching Work Orders" : showingRequestsInWorkQueue ? "Requests" : workQueuePanelTitle()}</h2>
                  <span>${isViewingWorkOrderSearch ? `${visibleWorkOrderCount} found for "${escapeHtml(searchQuery.trim())}"` : showingRequestsInWorkQueue ? `${visibleRequestCount} shown` : workQueuePanelSubtitle(visibleWorkOrderCount)}</span>
                </div>
                ${activeSection === "mywork" ? renderWorkloadStrip(myWorkDashboardCounts) : ""}
                ${activeSection === "mywork" ? `
                  <div class="segmented-control" aria-label="My work filter">
                    <button class="segment ${myWorkFilter === "assigned" ? "active" : ""}" data-my-work-filter="assigned" type="button">${segmentIcon("mine")}Assigned To Me</button>
                    <button class="segment ${myWorkFilter === "created" ? "active" : ""}" data-my-work-filter="created" type="button">${segmentIcon("created")}Created By Me</button>
                  </div>
                ` : showingRequestsInWorkQueue ? `
                  ${renderRequestFilterBar(requestCounts, activeRequestViewFilter, { locked: true })}
                  <p class="muted inline-request-note">Active requests waiting for review at this location. Converted requests stay out of this queue.</p>
                ` : isViewingWorkOrderSearch ? `
                  <div class="active-team-filter search-mode-filter">
                    <span>Showing exact paged work order matches at this location.</span>
                    <button class="text-button" data-close-work-search type="button">Back to search preview</button>
                  </div>
                ` : `
                  <div class="segmented-control" aria-label="Work order filter">
                    <button class="segment ${workOrderFilter === "all" ? "active" : ""}" data-work-order-filter="all" type="button">${segmentIcon("all")}All Work Orders</button>
                    <button class="segment ${workOrderFilter === "assigned" ? "active" : ""}" data-work-order-filter="assigned" type="button">${segmentIcon("mine")}Assigned</button>
                    <button class="segment ${workOrderFilter === "vendor" ? "active" : ""}" data-work-order-filter="vendor" type="button">${segmentIcon("vendor")}Vendor</button>
                    <button class="segment ${workOrderFilter === "unassigned" ? "active" : ""}" data-work-order-filter="unassigned" type="button">${segmentIcon("unassigned")}Unassigned</button>
                  </div>
                  ${workOrderAssigneeFilter ? `
                    <div class="active-team-filter">
                      <span>Assigned to ${escapeHtml(teamMemberName(workOrderAssigneeFilter))}</span>
                      <button class="text-button" data-clear-assignee-filter type="button">Clear</button>
                    </div>
                  ` : ""}
                `}
                ${showingRequestsInWorkQueue ? "" : `
                  <div class="segmented-control" aria-label="Work order sort">
                    ${[
                      ["newest", "Newest"],
                      ["due", "Due First"],
                      ["priority", "Priority"],
                    ].map(([id, label]) => `
                      <button class="segment ${workSort === id ? "active" : ""}" data-work-sort="${id}" type="button">${segmentIcon(id)}${label}</button>
                    `).join("")}
                  </div>
                `}
                ${!showingRequestsInWorkQueue && ["completed", "completed_month", "completed_week"].includes(activeStatusFilter) ? `
                  <p class="completion-note completed-history-note">Completed history is paged ${WORK_ORDERS_PER_PAGE} at a time and sorted by most recently completed.</p>
                ` : ""}
                ${showingRequestsInWorkQueue ? `
                  <div class="request-list">
                    ${pagedRequests.map(renderMaintenanceRequest).join("") || `<p class="muted">${escapeHtml(requestEmptyStateText(activeRequestViewFilter))}</p>`}
                  </div>
                  ${renderListPagination("requests", visibleRequestCount, requestsPage, totalRequestPages)}
                ` : `
                  <div class="work-list" id="work-order-list">
                    ${pagedWorkOrders.map(renderWorkOrderCard).join("") || `<p class="muted">No work orders match this filter.</p>`}
                  </div>
                  ${renderWorkPagination(visibleWorkOrderCount, totalWorkOrderPages)}
                `}
              </section>
            `}
          ` : ""}

          <section class="panel full-width ${activeSection === "planning" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Planning</h2>
              <span>${planningItems().length + followUpItems().length} items</span>
            </div>
            <div class="planning-grid">
              ${renderPlanningGroup("Overdue", planningItems("overdue"), "overdue")}
              ${renderPlanningGroup("Due Today", planningItems("today"), "due_today")}
              ${renderPlanningGroup("Next 7 Days", planningItems("soon"), "in_progress")}
              ${renderPlanningGroup("Follow-up Needed", followUpItems(), "blocked")}
              ${renderPlanningGroup("PM Due Soon", planningPmItems(), "open")}
            </div>
          </section>

          <section class="panel full-width ${activeSection === "requests" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Requests</h2>
              <span>${requestsReady ? requestPanelSubtitle(activeRequestViewFilter, visibleRequestCount) : "setup needed"}</span>
            </div>
            ${renderRequestFormContent()}
            ${requestsReady ? `
              ${renderRequestFilterBar(requestCounts, activeRequestViewFilter)}
              <div class="request-list">
                ${pagedRequests.map(renderMaintenanceRequest).join("") || `<p class="muted">${escapeHtml(requestEmptyStateText(activeRequestViewFilter))}</p>`}
              </div>
              ${renderListPagination("requests", visibleRequestCount, requestsPage, totalRequestPages)}
            ` : `<p class="muted">Run supabase/step-next-maintenance-requests.sql before submitting and reviewing requests.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "assets" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>${activeAssetId ? "Equipment Detail" : "Equipment"}</h2>
              ${activeAssetId ? `<button class="secondary-button back-action-button" id="back-to-equipment" type="button">Back to Equipment</button>` : `<span>${visibleAssets.length} shown</span>`}
            </div>
            ${activeAssetId ? renderAssetDetail() : `
            <form class="inline-form" id="create-asset-form">
              <input name="name" required placeholder="Machine or equipment name">
              <input name="asset_code" placeholder="Equipment ID">
              <input name="location" placeholder="Area / line">
              <select name="asset_type" aria-label="Equipment type">
                ${ASSET_TYPE_OPTIONS.map((type) => `<option value="${type}">${assetTypeLabel(type)}</option>`).join("")}
              </select>
              <select name="parent_asset_id" aria-label="Part of equipment">
                <option value="">Top level equipment</option>
                ${renderParentAssetOptions()}
              </select>
              <select name="location_id" ${locations.length ? "required" : "disabled"}>
                ${renderLocationOptions()}
              </select>
              <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety devices</label>
              <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
            </form>
            <p class="error-text" id="asset-create-error"></p>
            <div class="asset-health-grid">
              ${["running", "watch", "degraded", "offline"].map((status) => `
                <button class="asset-health ${status} ${workspaceUiState.getAssetStatusFilter() === status ? "active" : ""}" data-asset-status-filter="${status}" type="button">
                  <span>${assetStatusLabel(status)}</span>
                  <strong>${assets.filter((asset) => matchesActiveLocation(asset) && asset.status === status).length}</strong>
                </button>
              `).join("")}
            </div>
            <div class="asset-list">
              ${pagedAssets.map(renderAssetCard).join("") || `<p class="muted">${assetEmptyStateText()}</p>`}
            </div>
            ${renderAssetsPagination(visibleAssets.length, totalAssetPages)}
            `}
          </section>

          <section class="panel full-width ${activeSection === "pm" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Preventive Maintenance</h2>
              <span>${visibleSchedules.length} shown</span>
            </div>
            <form class="inline-form pm-form" id="create-pm-form">
              <input name="title" required placeholder="Monthly compressor PM">
              <select name="asset_id" required data-location-sensitive-asset>
                <option value="">Machine / equipment</option>
                ${renderAssetOptions()}
              </select>
              <p class="error-text" data-asset-location-warning></p>
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${renderProcedureOptions()}
              </select>
              <input name="next_due_at" type="date" required>
              <p class="error-text" id="pm-error"></p>
              <button class="secondary-button" type="submit">Add Schedule</button>
            </form>
            <div class="pm-list">
              ${pagedSchedules.map(renderPreventiveSchedule).join("") || `<p class="muted">No schedules match this search.</p>`}
            </div>
            ${renderListPagination("schedules", visibleSchedules.length, schedulesPage, totalSchedulePages)}
          </section>

          <section class="panel full-width ${activeSection === "procedures" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Procedures</h2>
              <span>${visibleProcedures.length} shown</span>
            </div>
            ${proceduresReady ? `
            <form class="form-grid procedure-form relationship-detail procedure" id="create-procedure-form">
              <label>Procedure name<input name="name" required placeholder="Monthly compressor inspection"></label>
              <label>Description<textarea name="description" rows="3" placeholder="Use this checklist when creating repeat work."></textarea></label>
              <p class="error-text" id="procedure-error"></p>
              <button class="secondary-button" type="submit">Add Procedure</button>
            </form>
            <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection procedure</button>
            <div class="procedure-list">
              ${pagedProcedures.map(renderProcedureTemplate).join("") || `<p class="muted">No procedures match this search.</p>`}
            </div>
            ${renderListPagination("procedures", visibleProcedures.length, proceduresPage, totalProcedurePages)}
            ` : `<p class="muted">Run supabase/step-next-procedures.sql to turn on procedure templates.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "messages" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Messages</h2>
              <span>${messagesReady ? `${messageThreads.length} threads` : "setup needed"}</span>
            </div>
            ${renderMessageCenter()}
          </section>

          <section class="panel full-width ${activeSection === "team" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Team</h2>
              <span>${visibleMembers.length} shown</span>
            </div>
            ${renderMyProfileForm()}
            ${renderRoleGuide()}
            ${canManageTeam() ? `
              ${renderTeamInviteForm(activeLocationId)}
              ${teamInvitesReady ? renderTeamInvites() : `<p class="warning-text">Run supabase/step-next-invite-default-location.sql to invite teammates by email.</p>`}
              <details class="developer-details">
                <summary>Developer add by User UUID</summary>
                <form class="inline-form team-form" id="add-member-form">
                  <input name="user_id" required placeholder="User UUID">
                  <select name="role">
                    <option value="technician">Technician</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button class="secondary-button" type="submit">Add Member</button>
                </form>
              </details>
            ` : `<p class="muted team-permission-note">Admins and managers can invite teammates and change roles.</p>`}
            <div class="member-list">
              ${pagedMembers.map(renderMember).join("") || `<p class="muted">No team members match this search.</p>`}
            </div>
            ${renderListPagination("members", visibleMembers.length, membersPage, totalMemberPages)}
          </section>

          <section class="panel full-width ${activeSection === "parts" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>${activePartId ? "Part Detail" : "Parts Inventory"}</h2>
              <span>${activePartId ? "editing" : `${visibleParts.length} shown`}</span>
            </div>
            ${activePartId ? renderPartDetail() : `
              <div class="parts-health-grid">
                ${renderPartsHealth()}
              </div>
              ${renderPartSearch()}
              ${renderPartSourceOptions()}
              <form class="inline-form parts-form relationship-detail parts" id="create-part-form">
                <div class="parts-form-header">
                  <h3>Add Part</h3>
                  <button class="text-button danger-link source-edit-button" data-toggle-part-sources type="button">Edit sources</button>
                </div>
                <label>Part name<input name="name" required placeholder="Motor bearing"></label>
                <label>SKU<input name="sku" placeholder="BRG-204"></label>
                <label>Source / vendor<input name="supplier_name" list="part-source-options" placeholder="Grainger, McMaster, local supplier"></label>
                <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="0"></label>
                <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="0"></label>
                <label>Unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="0"></label>
                <p class="error-text" id="part-create-error">${partSetupMessage()}</p>
                <button class="secondary-button add-part-button" type="submit">Add Part</button>
              </form>
              ${showPartSourceManager ? renderPartSourceManager() : ""}
              <div class="parts-list" id="parts-list">
                ${pagedParts.map(renderPart).join("") || `<p class="muted">${partEmptyStateText()}</p>`}
              </div>
              ${renderPartsPagination(visibleParts.length, totalPartsPages)}
            `}
          </section>

          <section class="panel full-width ${activeSection === "settings" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Company Settings</h2>
              <span>${escapeHtml(roleLabel(activeCompany?.role))}</span>
            </div>
            ${canManageTeam() ? `
              <form class="form-grid settings-form" id="company-settings-form">
                <label>Company name<input name="name" required value="${escapeHtml(activeCompany?.name || "")}"></label>
                <button class="secondary-button" type="submit">Save Company</button>
              </form>
              <form class="form-grid settings-form logo-form" id="company-logo-form">
                <div class="company-logo-preview">
                  ${activeCompany?.logoUrl ? `<img src="${escapeHtml(activeCompany.logoUrl)}" alt="${escapeHtml(activeCompany?.name || "Company")} logo preview">` : `<span>MO</span>`}
                </div>
                <label>Company logo<input name="logo" type="file" accept="image/*"><small>Optional. Logos are optimized before upload.</small></label>
                <p class="error-text" id="company-logo-error">${escapeHtml(activeCompany?.logoError || "")}</p>
                <button class="secondary-button" type="submit">Upload Logo</button>
              </form>
              <div class="settings-summary logo-status">
                <article><strong>Logo status</strong><span>${activeCompany?.logo_path ? (activeCompany?.logoUrl ? "loaded" : "saved, cannot display") : "none uploaded"}</span></article>
                ${activeCompany?.logo_path ? `<article><strong>Logo path</strong><span>${escapeHtml(activeCompany.logo_path)}</span></article>` : ""}
              </div>
              <form class="form-grid settings-form" id="location-form">
                <label>New location<input name="name" required placeholder="North Plant"></label>
                <p class="error-text" id="location-error">${locationsReady ? "" : "Run supabase/step-next-locations.sql before adding locations."}</p>
                <button class="secondary-button" type="submit" ${locationsReady ? "" : "disabled"}>Add Location</button>
              </form>
              <div class="settings-summary">
                ${locations.map((location) => `<article><strong>${escapeHtml(location.name)}</strong><span>${location.id === activeLocationId ? "active location" : "available"}</span></article>`).join("") || `<article><strong>No locations yet</strong><span>Run the location setup SQL</span></article>`}
              </div>
              ${renderPublicRequestLinkManager()}
              <div class="settings-summary">
                <article><strong>Company ID</strong><span>${escapeHtml(activeCompanyId)}</span></article>
                <article><strong>Signed in as</strong><span>${escapeHtml(session.user.email || session.user.id)}</span></article>
                <article><strong>Active section</strong><span>${escapeHtml(activeSection)}</span></article>
              </div>
            ` : `<p class="muted">Company settings are available to managers and admins.</p>`}
          </section>

          <section class="panel full-width ${activeSection === "setup" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Admin Setup</h2>
              <span>${setupItems().filter((item) => item.ready).length}/${setupItems().length} ready</span>
            </div>
            <p class="muted setup-note">Builder diagnostic area. Use this to confirm Supabase tables, columns, storage, and config are ready before demos or deployment.</p>
            <div class="setup-list">
              ${setupItems().map(renderSetupItem).join("")}
            </div>
            ${renderAppIssueReportsPanel()}
          </section>
        </section>
      </main>
    </div>
  `;

  bindWorkspaceEvents();
}

function filteredWorkOrders() {
  return workOrders.filter((workOrder) => {
    if (!matchesActiveLocation(workOrder)) return false;
    const statusMatch = workOrderMatchesStatusFilter(workOrder);
    const myWorkFilter = workspaceUiState.getMyWorkFilter();
    const workOrderAssigneeFilter = workspaceUiState.getWorkOrderAssigneeFilter();
    const workOrderFilter = workspaceUiState.getWorkOrderFilter();
    const queueMatch = activeSection === "mywork"
      ? (myWorkFilter === "created" ? workOrder.created_by === session.user.id : workOrder.assigned_to === session.user.id)
      : workOrderAssigneeFilter
        ? workOrder.assigned_to === workOrderAssigneeFilter
        : workOrderFilter === "all" ||
          (workOrderFilter === "assigned" && Boolean(workOrder.assigned_to)) ||
          (workOrderFilter === "vendor" && isVendorAssigned(workOrder)) ||
          (workOrderFilter === "unassigned" && !workOrder.assigned_to && !isVendorAssigned(workOrder));
    return statusMatch && queueMatch && matchesSearch(workOrderSearchValues(workOrder));
  }).sort(compareWorkOrders);
}

function resetWorkOrderPage() {
  workspaceUiState.resetWorkOrderPage();
}

function setWorkOrderSearchMode(enabled) {
  workspaceUiState.setWorkOrderSearchMode(Boolean(enabled && workspaceUiState.getSearchQuery().trim()));
}

function invalidateExactWorkOrderSearchCache() {
  exactWorkOrderSearchCache = { key: "", rows: [] };
}

function resetPartsPage() {
  workspaceUiState.resetPartsPage();
}

function resetRequestsPage() {
  workspaceUiState.resetRequestsPage();
}

function clearPartSearchState() {
  workspaceUiState.setPartSearchQuery("");
  resetPartsPage();
}

function resetAssetsPage() {
  workspaceUiState.resetAssetsPage();
}

function activeLocationDatabaseId() {
  return locationsReady && activeLocationId ? activeLocationId : null;
}

function locationIdForAsset(assetId) {
  return assets.find((asset) => asset.id === assetId)?.location_id || activeLocationDatabaseId();
}

function assetLocationMismatch(assetId) {
  if (!assetId || !locationsReady || !activeLocationId) return null;
  const asset = assets.find((item) => item.id === assetId);
  if (!asset?.location_id || asset.location_id === activeLocationId) return null;
  const assetLocation = locations.find((location) => location.id === asset.location_id);
  const activeLocation = locations.find((location) => location.id === activeLocationId);
  return {
    asset,
    assetLocationName: assetLocation?.name || "another location",
    activeLocationName: activeLocation?.name || "the selected location",
  };
}

function assetLocationRoutingMessage(assetId) {
  const mismatch = assetLocationMismatch(assetId);
  if (!mismatch) return "";
  return `${mismatch.asset.name} belongs to ${mismatch.assetLocationName}. This will save to ${mismatch.assetLocationName}, not ${mismatch.activeLocationName}.`;
}

// TRACEABILITY: Cross-location equipment routing is allowed only with visible user intent because it changes where work lands.
function confirmAssetLocationRouting(assetId, actionLabel, errorTarget) {
  const message = assetLocationRoutingMessage(assetId);
  if (!message) return true;
  const confirmed = window.confirm(`${message}\n\nContinue ${actionLabel}?`);
  if (!confirmed && errorTarget) {
    errorTarget.textContent = "Save cancelled. Switch location or choose equipment from the current location before trying again.";
  }
  return confirmed;
}

function updateAssetLocationWarning(select) {
  const form = select.closest("form");
  const warning = form?.querySelector("[data-asset-location-warning]");
  if (!warning) return;
  warning.textContent = assetLocationRoutingMessage(select.value);
}

function showNotice(message, tone = "success") {
  appNotice = message;
  appNoticeTone = tone;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    appNotice = "";
    appNoticeTone = "success";
    renderWorkspace();
  }, tone === "warning" ? 4200 : 2600);
}

function setWorkOrderActionWarning(id, message) {
  workOrderActionWarningId = id || "";
  workOrderActionWarning = message || "";
}

function bindAutoGrowTextareas() {
  bindWorkspaceTextareaAutoGrow();
}

const { renderAssetDetail } = createAssetDetailDisplayHelpers({
  ASSET_TYPE_OPTIONS,
  getAssets: () => assets,
  getActiveAssetId: () => activeAssetId,
  getWorkOrders: () => workOrders,
  getPreventiveSchedules: () => preventiveSchedules,
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
  getMaintenanceRequests: () => maintenanceRequests,
  getPendingDeleteAssetId: () => pendingDeleteAssetId,
  getLocations: () => locations,
  getActiveLocationId: () => activeLocationId,
  renderCreateWorkOrder: (...args) => renderCreateWorkOrder(...args),
  parentAssetFor,
  childAssetsFor,
  escapeHtml,
  assetTypeLabel,
  renderParentAssetOptions,
  renderLocationOptions,
  assetStatusLabel,
  renderAssetMiniWorkOrder,
  assetDeleteBlockerMessage,
  canDeleteEquipment,
});

function procedureColumn(value) {
  return proceduresReady ? { procedure_template_id: value || null } : {};
}

function markSchemaReadiness(error) {
  if (isMissingColumnError(error, "location_id") || error?.message?.includes("locations")) locationsReady = false;
  if (isProcedureSchemaError(error)) proceduresReady = false;
  if (isColumnSchemaError(error, ["safety_devices_checked", "safety_devices_checked_at", "safety_check_required"])) safetyChecksReady = false;
}

function workOrderDateValue(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const parsed = new Date(`${trimmed}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) throw new Error("Enter a real expected back up / due date as YYYY-MM-DD.");
    const parsedIso = parsed.toISOString().slice(0, 10);
    if (parsedIso === trimmed) return trimmed;
    throw new Error("Enter a real expected back up / due date as YYYY-MM-DD.");
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Enter the expected back up / due date as YYYY-MM-DD.");
  }
  return parsed.toISOString().slice(0, 10);
}

function requiredText(value, label) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`${label} is required.`);
  return text;
}

const WORK_ORDER_SCHEMA_FIELDS = [
  "location_id",
  "assigned_to",
  "procedure_template_id",
  "actual_minutes",
  "failure_cause",
  "resolution_summary",
  "follow_up_needed",
  "completion_notes",
  "completed_at",
  "safety_devices_checked",
  "safety_devices_checked_at",
  "safety_check_required",
];

async function insertWithOptionalProcedure(table, payload, options = {}) {
  let query = supabaseClient.from(table).insert(payload);
  if (options.returnSingle) query = query.select().single();
  const response = await query;
  if (!response.error) return response;
  const setupColumns = table === "work_orders" ? WORK_ORDER_SCHEMA_FIELDS : ["location_id", "procedure_template_id"];
  if (isColumnSchemaError(response.error, setupColumns)) {
    markSchemaReadiness(response.error);
    return withSetupError(response, databaseSetupRequiredMessage(`saving ${table.replaceAll("_", " ")}`));
  }
  return response;
}

async function updateWithOptionalProcedure(table, payload, id) {
  const response = await supabaseClient
    .from(table)
    .update(payload)
    .eq("id", id)
    .eq("company_id", activeCompanyId);
  if (response.error && isColumnSchemaError(response.error, ["location_id", "procedure_template_id"])) {
    markSchemaReadiness(response.error);
    return withSetupError(response, databaseSetupRequiredMessage(`saving ${table.replaceAll("_", " ")}`));
  }
  return response;
}

async function updateWorkOrderSafely(payload, id) {
  const response = await updateWithOptionalProcedure("work_orders", payload, id);
  if (response.error && isColumnSchemaError(response.error, WORK_ORDER_SCHEMA_FIELDS)) {
    markSchemaReadiness(response.error);
    return withSetupError(response, databaseSetupRequiredMessage("saving work order details"));
  }
  return response;
}

function checklistProgress(workOrder, procedure) {
  const steps = procedure.procedure_steps || [];
  const results = stepResultsByWorkOrder[workOrder.id] || {};
  const done = steps.filter((step) => Boolean(results[step.id]?.value)).length;
  return { done, total: steps.length };
}

function requiredChecklistProgress(workOrder, procedure) {
  const steps = (procedure?.procedure_steps || []).filter((step) => step.required);
  const results = stepResultsByWorkOrder[workOrder.id] || {};
  const done = steps.filter((step) => Boolean(results[step.id]?.value)).length;
  return { done, total: steps.length };
}

function requiredChecklistProgressFor(workOrder, procedureTemplateId = workOrder?.procedure_template_id) {
  const procedure = procedureTemplates.find((template) => template.id === procedureTemplateId);
  if (!procedure) return { done: 0, total: 0 };
  if (!workOrder?.id) return { done: 0, total: (procedure.procedure_steps || []).filter((step) => step.required).length };
  return requiredChecklistProgress(workOrder, procedure);
}

function requiredChecklistCompletionMessage(workOrder, procedureTemplateId = workOrder?.procedure_template_id) {
  const progress = requiredChecklistProgressFor(workOrder, procedureTemplateId);
  if (progress.done >= progress.total) return "";
  return `Complete required procedure checklist steps first (${progress.done}/${progress.total}).`;
}

function blocksProcedureCompletion(workOrder, procedureTemplateId = workOrder?.procedure_template_id) {
  return requiredChecklistCompletionMessage(workOrder, procedureTemplateId);
}

const { renderMessageCenter } = createMessageCenterDisplayHelpers({
  getMessagesReady: () => messagesReady,
  getMessageThreads: () => messageThreads,
  getActiveMessageThreadId: () => activeMessageThreadId,
  getMessagesByThreadId: () => messagesByThreadId,
  getWorkOrders: () => workOrders,
  getMessageComposerWorkOrderId: () => messageComposerWorkOrderId,
  getMessageComposerOpen: () => messageComposerOpen,
  getCompanyMembers: () => companyMembers,
  getSession: () => session,
  getMessageWorkOrderLinksReady: () => messageWorkOrderLinksReady,
  getMessageSearchQuery: () => messageSearchQuery,
  getMessageThreadFilter: () => messageThreadFilter,
  filteredMessageThreads,
  totalUnreadMessages,
  teamMemberName,
  escapeHtml,
  messageComposerScopeNote,
  recentMessageLinkWorkOrders,
  statusLabel,
  renderMessageThreadButton,
  messageThreadScopeLabel,
  renderMessageList,
});

const {
  bindMessageWorkflowEvents,
  markMessageThreadRead,
} = createMessageWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  isMissingColumnError,
  messageCenterErrorState,
  warn: console.warn,
  getSession: () => session,
  getActiveCompanyId: () => activeCompanyId,
  getCompanyMembers: () => companyMembers,
  getMessagesReady: () => messagesReady,
  setMessagesReady: (value) => { messagesReady = value; },
  getMessageWorkOrderLinksReady: () => messageWorkOrderLinksReady,
  setMessageWorkOrderLinksReady: (value) => { messageWorkOrderLinksReady = value; },
  activeLocationDatabaseId,
  setActiveMessageThreadId: setActiveMessageThreadIdState,
  setMessageComposerWorkOrderId: setMessageComposerWorkOrderIdState,
  setMessageComposerOpen: setMessageComposerOpenState,
  setMessageThreadRead: (threadId, readRow) => { messageReadsByThreadId[threadId] = readRow; },
  showNotice,
  render: () => render(),
});
const {
  bindPreventiveMaintenanceWorkflowEvents,
  requestDeletePreventiveSchedule,
  deletePreventiveSchedule,
  generatePreventiveWorkOrder,
} = createPreventiveMaintenanceWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  CSSRef: CSS,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  insertWithOptionalProcedure,
  confirmAssetLocationRouting,
  locationIdForAsset,
  requiredText,
  procedureColumn,
  canDeleteOperationalRecords,
  applySafetyRequirementPayload,
  applySafetyCheckPayload,
  nextDueDate,
  alertUser: (message) => alert(message),
  getSession: () => session,
  getActiveCompanyId: () => activeCompanyId,
  getPreventiveSchedules: () => preventiveSchedules,
  setPendingDeleteScheduleId: (value) => { pendingDeleteScheduleId = value; },
  setActiveWorkOrderId: setActiveWorkOrderIdState,
  setActiveSection: setActiveSectionState,
  showNotice,
  render: () => render(),
  renderWorkspace,
});
const {
  bindProcedureWorkflowEvents,
  requestDeleteProcedureTemplate,
  deleteProcedureTemplate,
} = createProcedureWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  CSSRef: CSS,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  requiredText,
  canDeleteOperationalRecords,
  procedureDeleteBlockerMessage,
  alertUser: (message) => alert(message),
  getSession: () => session,
  getActiveCompanyId: () => activeCompanyId,
  getProcedureTemplates: () => procedureTemplates,
  setPendingDeleteProcedureId: (value) => { pendingDeleteProcedureId = value; },
  showNotice,
  render: () => render(),
  renderWorkspace,
});
const {
  bindTeamWorkflowEvents,
  cancelTeamInvite,
} = createTeamWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  isMissingColumnError,
  isColumnSchemaError,
  alertUser: (message) => alert(message),
  getSession: () => session,
  getActiveCompanyId: () => activeCompanyId,
  getProfilesByUserId: () => profilesByUserId,
  getTeamInvitesReady: () => teamInvitesReady,
  setTeamInvitesReady: (value) => { teamInvitesReady = value; },
  setPendingCancelInviteId: (value) => { pendingCancelInviteId = value; },
  setTeamInviteCancelError: (value) => { teamInviteCancelError = value; },
  loadMembers,
  loadTeamInvites,
  showNotice,
  render: () => render(),
  renderWorkspace,
});
const {
  bindCompanySettingsWorkflowEvents,
} = createCompanySettingsWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  storage: localStorage,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  requiredText,
  createLocationRecord,
  isColumnSchemaError,
  normalizePublicAppUrl,
  getActiveCompanyId: () => activeCompanyId,
  getLocationsReady: () => locationsReady,
  setLocationsReady: (value) => { locationsReady = value; },
  setActiveLocationId: (value) => { activeLocationId = value; },
  setPublicAppUrlOverride: (value) => { publicAppUrlOverride = value; },
  persistActiveLocationId,
  showNotice,
  render: () => render(),
  renderWorkspace,
});
const {
  bindAppIssueWorkflowEvents,
  reloadAppIssueReports,
} = createAppIssueWorkflow({
  documentRef: document,
  windowRef: window,
  FormDataCtor: FormData,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  listAppIssueReports,
  createAppIssueReportRecord,
  updateAppIssueReportStatusRecord,
  appIssueReportErrorState,
  activeLocationDatabaseId,
  requiredText,
  canManageTeam,
  getSession: () => session,
  getActiveCompanyId: () => activeCompanyId,
  getActiveSection: () => activeSection,
  setAppIssueReportsReady: (value) => { appIssueReportsReady = value; },
  setAppIssueReports: (value) => { appIssueReports = value; },
  setReportIssueMode: (value) => { reportIssueMode = value; },
  showNotice,
  renderWorkspace,
});

function renderPartDetail() {
  const part = parts.find((item) => item.id === activePartId);
  if (!part) {
    setActivePartIdState(null);
    return `<p class="muted">Part not found.</p>`;
  }
  return renderPartDetailMarkup(part);
}

const { renderCreateWorkOrder } = createCreateWorkOrderDisplayHelpers({
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  getParts: () => parts,
  renderAssetOptions,
  statusLabel,
  renderAssignmentSelect,
  renderProcedureOptions,
  escapeHtml,
});

const { renderQuickFixForm } = createQuickFixDisplayHelpers({
  TYPE_OPTIONS,
  getQuickFixAssetId: () => quickFixAssetId,
  getQuickFixRequestId: () => quickFixRequestId,
  getMaintenanceRequests: () => maintenanceRequests,
  getSession: () => session,
  getParts: () => parts,
  renderAssetOptions,
  assetLocationRoutingMessage,
  escapeHtml,
  renderAssignmentSelect,
  renderProcedureOptions,
  assetStatusLabel,
});

const { renderWorkOrderDetail } = createWorkOrderDetailDisplayHelpers({
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  getActiveWorkOrderId: () => activeWorkOrderId,
  getWorkOrders: () => workOrders,
  getCommentsByWorkOrder: () => commentsByWorkOrder,
  getPhotosByWorkOrder: () => photosByWorkOrder,
  getEventsByWorkOrder: () => eventsByWorkOrder,
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
  getProcedureTemplates: () => procedureTemplates,
  getWorkOrderActionWarningId: () => workOrderActionWarningId,
  getWorkOrderActionWarning: () => workOrderActionWarning,
  getParts: () => parts,
  getStepResultsByWorkOrder: () => stepResultsByWorkOrder,
  getPendingDeleteWorkOrderId: () => pendingDeleteWorkOrderId,
  getProfilesByUserId: () => profilesByUserId,
  getCommentsError: () => commentsError,
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
});

function recommendedWorkOrderStep(workOrder) {
  const orderedFields = [
    {
      isMissing: () => !String(workOrder.title || "").trim(),
      title: "Issue",
      target: "quick-update-issue-field",
    },
    {
      isMissing: () => !workOrder.asset_id,
      title: "Machine / Equipment",
      target: "quick-update-equipment-field",
    },
    {
      isMissing: () => !workOrder.assigned_to && !isVendorAssigned(workOrder),
      title: "Assign To",
      target: "quick-update-owner-field",
    },
    {
      isMissing: () => !workOrder.due_at,
      title: "Expected Back Up / Due Date",
      target: "quick-update-due-field",
    },
    {
      isMissing: () => !String(workOrder.resolution_summary || workOrder.completion_notes || "").trim(),
      title: "Resolution",
      target: "quick-update-resolution-field",
    },
    {
      isMissing: () => workOrder.status === "completed" && requiresSafetyDeviceCheck(workOrder) && !hasCompletedSafetyDeviceCheck(workOrder),
      title: "Safety Devices",
      target: "quick-update-safety-field",
      tone: "warning",
    },
  ];
  const nextField = orderedFields.find((field) => field.isMissing());
  if (nextField) {
    return {
      title: nextField.title,
      helper: "Want to update this next? Skip it if it does not apply.",
      action: "Go To Field",
      target: nextField.target,
      tone: nextField.tone || "",
    };
  }

  if (workOrder.status !== "completed") {
    return {
      title: "Complete Work",
      helper: "The quick update fields are filled in. When the work is done, complete the order.",
      action: "Go To Completion",
      target: "work-order-complete-target",
    };
  }

  return "";
}

function bindWorkspaceEvents() {
  document.querySelector("#company-select").addEventListener("change", async (event) => {
    activeCompanyId = event.target.value;
    activeLocationId = "";
    setActiveWorkOrderIdState(null);
    createWorkOrderMode = false;
    reportIssueMode = false;
    localStorage.setItem("maintainops.activeCompanyId", activeCompanyId);
    await render();
  });

  const switchLocation = async (nextLocationId) => {
      activeLocationId = nextLocationId;
      setActiveWorkOrderIdState(null);
      setActiveAssetIdState(null);
      setActivePartIdState(null);
      reportIssueMode = false;
      resetWorkOrderPage();
      resetPartsPage();
      resetAssetsPage();
      resetRequestsPage();
      invalidateExactWorkOrderSearchCache();
      persistActiveLocationId(activeLocationId);
      await reloadWorkOrderQueue();
      await reloadRequestQueue();
  };

  const locationSelect = document.querySelector("#location-select");
  if (locationSelect) {
    locationSelect.addEventListener("change", async () => {
      await switchLocation(locationSelect.value);
    });
  }

  document.querySelectorAll("[data-location-select]").forEach((select) => {
    select.addEventListener("change", async () => {
      await switchLocation(select.value);
    });
  });

  bindWorkspaceAssetLocationWarningEvents({
    updateAssetLocationWarning,
  });

  document.querySelectorAll("[data-sign-out]").forEach((button) => {
    button.addEventListener("click", () => supabaseClient.auth.signOut());
  });
  document.querySelector("#new-company").addEventListener("click", renderCompanyCreate);
  bindWorkspaceSectionNavigationEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActivePartId: setActivePartIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { quickFixAssetId = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setQuickFixRequestId: (value) => { quickFixRequestId = value; },
      setReportIssueMode: (value) => { reportIssueMode = value; },
      setShowPartSourceManager: (value) => { showPartSourceManager = value; },
    },
    reloadRequestQueue,
    reloadWorkOrderQueue,
    renderWorkspace,
    resetWorkOrderPage,
    setWorkOrderSearchMode,
    visibleNavItems,
  });
  bindWorkspaceQuickFixCommandEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { quickFixAssetId = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setQuickFixRequestId: (value) => { quickFixRequestId = value; },
      setReportIssueMode: (value) => { reportIssueMode = value; },
    },
    renderWorkspace,
    setWorkOrderSearchMode,
  });

  bindWorkspaceReportIssueCommandEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActivePartId: setActivePartIdState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setReportIssueMode: (value) => { reportIssueMode = value; },
    },
    renderWorkspace,
  });

  bindWorkspaceSubmitRequestCommandEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { quickFixAssetId = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setQuickFixRequestId: (value) => { quickFixRequestId = value; },
      setReportIssueMode: (value) => { reportIssueMode = value; },
    },
    reloadRequestQueue,
    resetRequestsPage,
    setWorkOrderSearchMode,
  });

  bindWorkspaceNewWorkOrderCommandEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { quickFixAssetId = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setQuickFixRequestId: (value) => { quickFixRequestId = value; },
      setReportIssueMode: (value) => { reportIssueMode = value; },
    },
    renderWorkspace,
    setWorkOrderSearchMode,
  });

  bindWorkspaceExportCsvCommandEvents({
    exportActiveSectionCsv,
  });

  bindAppIssueWorkflowEvents();

  bindWorkspaceIssueAdminUiEvents({
    state: {
      setAdminDeleteSqlConfirmed: (value) => { adminDeleteSqlConfirmed = value; },
      setReportIssueMode: (value) => { reportIssueMode = value; },
    },
    renderWorkspace,
    showNotice,
  });

  bindWorkspaceMessageThreadEvents({
    state: {
      setActiveMessageThreadId: setActiveMessageThreadIdState,
      setActiveSection: setActiveSectionState,
      setMessageComposerOpen: setMessageComposerOpenState,
    },
    markMessageThreadRead,
    renderWorkspace,
  });

  bindWorkSectionJumpEvents();

  bindWorkspaceWorkMessageStartEvents({
    state: {
      setActiveMessageThreadId: setActiveMessageThreadIdState,
      setActiveSection: setActiveSectionState,
      setMessageComposerOpen: setMessageComposerOpenState,
      setMessageComposerWorkOrderId: setMessageComposerWorkOrderIdState,
    },
    renderWorkspace,
  });

  bindMessageWorkflowEvents();

  bindWorkspaceMessageUiEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActivePartId: setActivePartIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setMessageComposerWorkOrderId: setMessageComposerWorkOrderIdState,
      setMessageSearchQuery: setMessageSearchQueryState,
      setMessageThreadFilter: setMessageThreadFilterState,
      setQuickFixMode: (value) => { quickFixMode = value; },
    },
    autoGrowTextarea,
    messageComposerScopeNote,
    renderWorkspace,
  });

  bindWorkspaceDetailNavigationEvents({
    state: {
      getActiveSection: () => activeSection,
      setActiveAssetId: setActiveAssetIdState,
      setActivePartId: setActivePartIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => {
        createWorkOrderMode = value;
      },
      setPendingDeleteAssetId: (value) => {
        pendingDeleteAssetId = value;
      },
      setQuickFixAssetId: (value) => {
        quickFixAssetId = value;
      },
      setQuickFixMode: (value) => {
        quickFixMode = value;
      },
      setQuickFixRequestId: (value) => {
        quickFixRequestId = value;
      },
      setReportIssueMode: (value) => {
        reportIssueMode = value;
      },
    },
    renderWorkspace,
  });

  bindWorkspaceSearchEvents({
    state: {
      getActiveSection: () => activeSection,
      getSearchQuery: () => workspaceUiState.getSearchQuery(),
      setActiveAssetId: setActiveAssetIdState,
      setActivePartId: setActivePartIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { quickFixAssetId = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setQuickFixRequestId: (value) => { quickFixRequestId = value; },
      setSearchQuery: (value) => { workspaceUiState.setSearchQuery(value); },
    },
    invalidateExactWorkOrderSearchCache,
    reloadRequestQueue,
    reloadWorkOrderQueue,
    resetPartsPage,
    resetRequestsPage,
    resetWorkOrderPage,
    setWorkOrderSearchMode,
  });

  bindGlobalSearchNavigationEvents({
    state: {
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setActiveAssetId: setActiveAssetIdState,
      setActivePartId: setActivePartIdState,
      setActiveSection: setActiveSectionState,
      setSearchQuery: (value) => { workspaceUiState.setSearchQuery(value); },
    },
    renderWorkspace,
    setWorkOrderSearchMode,
  });

  bindWorkspaceAssetQuickFixEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActiveSection: setActiveSectionState,
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixAssetId: (value) => { quickFixAssetId = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setQuickFixRequestId: (value) => { quickFixRequestId = value; },
    },
    renderWorkspace,
  });

  bindWorkspaceWorkOrderStatusEvents({
    setWorkOrderStatus,
    showNotice,
  });

  bindWorkspaceWorkOrderAssignmentEvents({
    assignWorkOrderToMe,
    assignWorkOrderFromCard,
  });

  createWorkspaceWorkOrderDeleteEvents({
    alertRef: alert,
    canDeleteWorkOrders,
    deleteWorkOrderRecord: (id) => supabaseClient
      .from("work_orders")
      .delete()
      .eq("id", id)
      .eq("company_id", activeCompanyId),
    documentRef: document,
    friendlyWorkOrderSaveError,
    getPhotoPathsByWorkOrder: (id) => (photosByWorkOrder[id] || [])
      .map((photo) => photo.storage_path)
      .filter(Boolean),
    removeWorkOrderPhotoStorage: (photoPaths) => supabaseClient.storage.from("work-order-photos").remove(photoPaths),
    render,
    renderWorkspace,
    setActiveAssetId: setActiveAssetIdState,
    setActiveWorkOrderId: setActiveWorkOrderIdState,
    setPendingDeleteWorkOrderId: (id) => { pendingDeleteWorkOrderId = id; },
    showNotice,
    warnRef: console.warn.bind(console),
    withOperationTimeout,
  }).bindWorkspaceWorkOrderDeleteEvents();


  bindWorkspaceAssetDeleteCancelEvents({
    requestDeleteAsset,
    deleteAsset,
    state: {
      setPendingDeleteAssetId: (value) => { pendingDeleteAssetId = value; },
    },
    renderWorkspace,
  });

  bindWorkspaceFilterPaginationEvents({
    state: workspaceUiState,
    invalidateExactWorkOrderSearchCache,
    reloadRequestQueue,
    reloadWorkOrderQueue,
    renderWorkspace,
    resetRequestsPage,
    resetWorkOrderPage,
  });

  bindWorkspaceWorkOrderDowntimeEvents({
    getWorkOrderById: (id) => workOrders.find((item) => item.id === id),
    downtimeEmailSubject,
    downtimeEmailBody,
    copyTextToClipboard,
  });

  bindAutoGrowTextareas();

  const createForm = document.querySelector("#create-work-order-form");
  if (createForm) createForm.addEventListener("submit", createWorkOrder);

  const quickFixForm = document.querySelector("#quick-fix-form");
  if (quickFixForm) quickFixForm.addEventListener("submit", createQuickFix);

  bindWorkspacePublicRequestLinkAdminEvents({
    createPublicRequestLink,
    disablePublicRequestLink,
    setPublicRequestLinkActive,
    regeneratePublicRequestLink,
  });

  bindWorkspacePublicRequestLinkCopyEvents({
    copyTextToClipboard,
  });

  bindWorkspaceRequestConversionEvents({
    convertRequestToWorkOrder,
  });

  bindWorkspaceRequestQuickFixEvents({
    openQuickFixForRequest,
  });

  bindWorkspaceRequestDeleteCancelEvents({
    requestDeleteMaintenanceRequest,
    deleteMaintenanceRequest,
    state: {
      setPendingDeleteRequestId: (value) => { pendingDeleteRequestId = value; },
    },
    renderWorkspace,
  });

  bindWorkspaceWorkOrderEditEvents({
    updateWorkOrderDetails,
  });

  bindWorkspaceQuickUpdateEvents({
    updateWorkOrderQuickView,
  });

  createWorkspaceWorkOrderCompletionEvents({
    alertRef: alert,
    applySafetyCheckPayload,
    applySafetyRequirementPayload,
    documentRef: document,
    friendlyWorkOrderSaveError,
    getActiveWorkOrderId: () => activeWorkOrderId,
    getProcedureById: (id) => procedureTemplates.find((template) => template.id === id),
    getWorkOrderById: (id) => workOrders.find((item) => item.id === id),
    hasCompletedSafetyDeviceCheck,
    recordWorkOrderEvent,
    render,
    requiredChecklistProgress,
    requiresSafetyDeviceCheck,
    setWorkOrderActionWarning,
    showNotice,
    updateWorkOrderSafely,
    withOperationTimeout,
  }).bindWorkspaceWorkOrderCompletionEvents();

  bindWorkspaceWorkOrderDetailStatusEvents({ updateWorkOrderStatus });

  bindWorkspaceCommentEvents({
    createComment,
  });

  const photoForm = document.querySelector("#photo-form");
  if (photoForm) photoForm.addEventListener("submit", uploadPhoto);

  const assetForm = document.querySelector("#create-asset-form");
  if (assetForm) assetForm.addEventListener("submit", createAsset);

  const editAssetForm = document.querySelector("#edit-asset-form");
  if (editAssetForm) editAssetForm.addEventListener("submit", updateAsset);

  bindPreventiveMaintenanceWorkflowEvents();

  bindWorkspacePmGenerationEvents({
    generatePreventiveWorkOrder,
  });

  bindWorkspaceScheduleDeleteCancelEvents({
    requestDeletePreventiveSchedule,
    deletePreventiveSchedule,
    state: {
      setPendingDeleteScheduleId: (value) => { pendingDeleteScheduleId = value; },
    },
    renderWorkspace,
  });

  bindWorkspaceFollowUpWorkEvents({
    createFollowUpWorkOrder,
  });

  bindProcedureWorkflowEvents();

  bindWorkspaceProcedureDeleteCancelEvents({
    requestDeleteProcedureTemplate,
    deleteProcedureTemplate,
    state: {
      setPendingDeleteProcedureId: (value) => { pendingDeleteProcedureId = value; },
    },
    renderWorkspace,
  });

  document.querySelectorAll("[data-step-result]").forEach((field) => {
    field.addEventListener("change", saveStepResult);
  });

  bindTeamWorkflowEvents();

  bindWorkspaceTeamWorkViewEvents({
    state: {
      setActiveAssetId: setActiveAssetIdState,
      setActiveSection: setActiveSectionState,
      setActiveStatusFilter: (value) => { workspaceUiState.setActiveStatusFilter(value); },
      setActiveWorkOrderId: setActiveWorkOrderIdState,
      setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
      setQuickFixMode: (value) => { quickFixMode = value; },
      setWorkOrderAssigneeFilter: (value) => { workspaceUiState.setWorkOrderAssigneeFilter(value); },
    },
    renderWorkspace,
    resetWorkOrderPage,
  });


  bindWorkspaceTeamInviteCancelEvents({
    state: {
      setPendingCancelInviteId: (value) => { pendingCancelInviteId = value; },
      setTeamInviteCancelError: (value) => { teamInviteCancelError = value; },
    },
    renderWorkspace,
    cancelTeamInvite,
  });

  const partForm = document.querySelector("#create-part-form");
  if (partForm) partForm.addEventListener("submit", createPart);

  bindWorkspaceInventoryFilterEvents({
    state: workspaceUiState,
    renderWorkspace,
    resetAssetsPage,
    resetPartsPage,
  });

  bindWorkspacePartSearchEvents({
    state: workspaceUiState,
    renderWorkspace,
    resetPartsPage,
  });

  document.querySelectorAll("[data-restock-part]").forEach((form) => {
    form.addEventListener("submit", restockPart);
  });

  document.querySelectorAll("[data-use-part]").forEach((form) => {
    form.addEventListener("submit", usePartFromInventory);
  });

  document.querySelectorAll("[data-edit-part]").forEach((form) => {
    form.addEventListener("submit", updatePart);
  });

  bindWorkspacePartDeleteCancelEvents({
    requestDeletePart,
    state: {
      setPendingDeletePartId: (value) => { pendingDeletePartId = value; },
    },
    renderWorkspace,
  });

  bindWorkspacePartDetailEvents({
    state: {
      getShowPartSourceManager: () => showPartSourceManager,
      setActivePartId: setActivePartIdState,
      setShowPartSourceManager: (value) => {
        showPartSourceManager = value;
      },
    },
    renderWorkspace,
  });

  document.querySelectorAll("[data-rename-part-source]").forEach((form) => {
    form.addEventListener("submit", renamePartSource);
  });

  document.querySelectorAll("[data-part-document]").forEach((form) => {
    form.addEventListener("submit", uploadPartDocument);
  });

  const partsUsedForm = document.querySelector("#parts-used-form");
  if (partsUsedForm) partsUsedForm.addEventListener("submit", recordPartUsed);

  bindCompanySettingsWorkflowEvents();

  const logoForm = document.querySelector("#company-logo-form");
  if (logoForm) logoForm.addEventListener("submit", uploadCompanyLogo);
}

async function createAsset(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#asset-create-error");
  if (errorElement) errorElement.textContent = "";
  const submitButton = formElement.querySelector("button[type='submit']");
  const originalButtonText = submitButton?.textContent || "Add Equipment";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }
  try {
    const form = new FormData(formElement);
    const payload = {
      company_id: activeCompanyId,
      location_id: form.get("location_id") || activeLocationDatabaseId(),
      name: requiredText(form.get("name"), "Equipment name"),
      asset_code: String(form.get("asset_code") || "").trim() || null,
      location: String(form.get("location") || "").trim() || null,
      parent_asset_id: form.get("parent_asset_id") || null,
      asset_type: form.get("asset_type") || "machine",
      safety_devices_required: form.get("safety_devices_required") === "on",
      status: "running",
    };
    const { error } = await withOperationTimeout(
      supabaseClient.from("assets").insert(payload),
      "Equipment save timed out. Check your connection and try again.",
      15000
    );
    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving equipment locations"));
    }
    if (error && isAssetHierarchySchemaError(error)) {
      throw new Error(equipmentSchemaMessage(error));
    }
    if (error) throw error;
    showNotice("Equipment added.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message;
    else alert(error.message);
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
  const errorElement = document.querySelector("#asset-edit-error");
  if (errorElement) errorElement.textContent = "";
  const submitButton = formElement.querySelector("button[type='submit']");
  const originalButtonText = submitButton?.textContent || "Save Equipment";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }
  try {
    const form = new FormData(formElement);
    const payload = {
      name: requiredText(form.get("name"), "Equipment name"),
      asset_code: String(form.get("asset_code") || "").trim() || null,
      location_id: form.get("location_id") || activeLocationDatabaseId(),
      location: String(form.get("location") || "").trim() || null,
      parent_asset_id: form.get("parent_asset_id") || null,
      asset_type: form.get("asset_type") || "machine",
      safety_devices_required: form.get("safety_devices_required") === "on",
      status: form.get("status"),
    };
    const { error } = await withOperationTimeout(
      supabaseClient
        .from("assets")
        .update(payload)
        .eq("id", activeAssetId)
        .eq("company_id", activeCompanyId),
      "Equipment save timed out. Check your connection and try again.",
      15000
    );
    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving equipment locations"));
    }
    if (error && isAssetHierarchySchemaError(error)) {
      throw new Error(equipmentSchemaMessage(error));
    }
    if (error) throw error;
    showNotice("Equipment saved.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message;
    else alert(error.message);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

async function updateAssetStatus(assetId, status) {
  const { error } = await withOperationTimeout(
    supabaseClient
      .from("assets")
      .update({ status })
      .eq("id", assetId)
      .eq("company_id", activeCompanyId),
    "Equipment status save timed out. Check your connection and try again.",
    12000
  );
  return error || null;
}

function assetDeleteBlockers(assetId) {
  return {
    workOrders: workOrders.filter((workOrder) => workOrder.asset_id === assetId).length,
    children: childAssetsFor(assetId).length,
    schedules: preventiveSchedules.filter((schedule) => schedule.asset_id === assetId).length,
    requests: maintenanceRequests.filter((request) => request.asset_id === assetId).length,
  };
}

function assetHasDeleteBlockers(assetId) {
  const blockers = assetDeleteBlockers(assetId);
  return Object.values(blockers).some(Boolean);
}

// RELIABILITY: Delete guards query live linked counts because paged client lists can hide traceability blockers.
async function loadAssetDeleteBlockers(assetId) {
  const [workOrdersCount, schedulesCount, requestsCount] = await Promise.all([
    countAssetLinkedRows("work_orders", assetId),
    countAssetLinkedRows("preventive_schedules", assetId),
    countAssetLinkedRows("maintenance_requests", assetId),
  ]);
  return {
    workOrders: workOrdersCount,
    children: childAssetsFor(assetId).length,
    schedules: schedulesCount,
    requests: requestsCount,
  };
}

async function countAssetLinkedRows(tableName, assetId) {
  const { count, error } = await withOperationTimeout(
    supabaseClient
      .from(tableName)
      .select("id", { count: "exact", head: true })
      .eq("company_id", activeCompanyId)
      .eq("asset_id", assetId),
    `Equipment delete check timed out while checking ${tableName}.`,
    15000
  );
  if (error) throw new Error(`Could not verify linked ${tableName.replaceAll("_", " ")} before deleting equipment: ${error.message}`);
  return count || 0;
}

async function requestDeleteAsset(id) {
  if (!canDeleteEquipment()) {
    alert("Only company admins and managers can delete equipment.");
    return;
  }
  const errorElement = document.querySelector("#asset-delete-error");
  if (errorElement) errorElement.textContent = "";
  try {
    const blockers = await loadAssetDeleteBlockers(id);
    const message = assetDeleteBlockerMessage(blockers);
    if (message) {
      if (errorElement) errorElement.textContent = message;
      return;
    }
    pendingDeleteAssetId = id;
    renderWorkspace();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not verify equipment links before delete.";
    else showNotice(error.message || "Could not verify equipment links before delete.", "warning");
  }
}

async function deleteAsset(id) {
  if (!canDeleteEquipment()) {
    alert("Only company admins and managers can delete equipment.");
    return;
  }
  const errorElement = document.querySelector("#asset-delete-error");
  if (errorElement) errorElement.textContent = "";
  const confirmButton = document.querySelector(`[data-confirm-delete-asset="${CSS.escape(id)}"]`);
  if (confirmButton) {
    confirmButton.disabled = true;
    confirmButton.textContent = "Deleting...";
  }

  try {
    const blockers = await loadAssetDeleteBlockers(id);
    const blockerMessage = assetDeleteBlockerMessage(blockers);
    if (blockerMessage) throw new Error(blockerMessage);

    const { error } = await withOperationTimeout(
      supabaseClient
        .from("assets")
        .delete()
        .eq("id", id)
        .eq("company_id", activeCompanyId),
      "Equipment delete timed out. Check your connection and try again.",
      15000
    );
    if (error) {
      throw new Error(error.message.includes("violates foreign key constraint")
        ? "This equipment is linked to records and cannot be deleted."
        : error.message);
    }
    setActiveAssetIdState(null);
    pendingDeleteAssetId = null;
    setActiveSectionState("assets");
    showNotice("Equipment deleted.");
    await render();
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
    company_id: activeCompanyId,
    location_id: activeLocationDatabaseId(),
    name,
    asset_type: "machine",
    safety_devices_required: true,
    status,
  };
  let response = await withOperationTimeout(
    supabaseClient
      .from("assets")
      .insert(payload)
      .select()
      .single(),
    "Equipment save timed out. Check your connection and try again.",
    15000
  );
  if (response.error && isMissingColumnError(response.error, "location_id")) {
    locationsReady = false;
    return withSetupError(response, databaseSetupRequiredMessage("adding equipment in this location"));
  }
  if (response.error && isAssetHierarchySchemaError(response.error)) {
    return withSetupError(response, equipmentSchemaMessage(response.error).replace("saving", "adding"));
  }
  return response;
}

async function uploadCompanyLogo(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#company-logo-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const file = new FormData(formElement).get("logo");
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
    const optimized = await optimizeLogo(file);
    const path = `${activeCompanyId}/logo-${crypto.randomUUID()}-${optimized.fileName}`;
    const upload = await withOperationTimeout(
      supabaseClient.storage.from("company-logos").upload(path, optimized.blob, {
        contentType: optimized.contentType,
        upsert: false,
      }),
      "Company logo upload timed out. Check your connection and try again.",
      25000
    );

    if (upload.error) {
      throw new Error(upload.error.message.includes("Bucket not found")
        ? "Run supabase/step-next-company-logo.sql before uploading a logo."
        : upload.error.message);
    }

    const { error } = await withOperationTimeout(
      supabaseClient.rpc("set_company_logo", {
        target_company_id: activeCompanyId,
        new_logo_path: path,
      }),
      "Company logo record save timed out. Check your connection and try again.",
      15000
    );

    if (error) {
      await removeUploadedObject("company-logos", path);
      throw new Error(isColumnSchemaError(error, ["logo_path"])
        ? "Run supabase/step-next-company-logo.sql before saving a company logo."
        : error.message.includes("set_company_logo")
        ? "Run supabase/step-next-company-logo.sql, then try uploading the logo again."
        : error.message);
    }

    const activeCompany = companies.find((company) => company.id === activeCompanyId);
    if (activeCompany) {
      activeCompany.logo_path = path;
      activeCompany.logoUrl = URL.createObjectURL(optimized.blob);
    }

    showNotice("Company logo uploaded.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not upload logo.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Upload Logo";
    }
  }
}

async function createPublicRequestLink(locationId) {
  const errorElement = document.querySelector("#public-request-link-error");
  const button = document.querySelector(`[data-create-public-request-link="${CSS.escape(locationId)}"]`);
  if (errorElement) errorElement.textContent = "";
  if (button) {
    button.disabled = true;
    button.textContent = "Creating...";
  }

  try {
    const { error } = await withOperationTimeout(
      supabaseClient.rpc("ensure_location_request_link", {
        target_location_id: locationId,
      }),
      "QR link save timed out. Check your connection and try again.",
      15000
    );

    if (error) {
      publicRequestLinksReady = false;
      throw new Error(error.message.includes("ensure_location_request_link")
        ? "Run supabase/step-next-public-request-links.sql before creating QR request links."
        : error.message);
    }

    showNotice("Location request QR link ready.");
    await render();
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
  if (!canAdministerPublicRequestLinks()) {
    const errorElement = document.querySelector("#public-request-link-error");
    if (errorElement) errorElement.textContent = "Only admins can disable posted QR request links.";
    return;
  }
  const confirmed = window.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.");
  if (!confirmed) return;
  await setPublicRequestLinkActive(linkId, false);
}

async function setPublicRequestLinkActive(linkId, isActive) {
  if (!canAdministerPublicRequestLinks()) {
    const errorElement = document.querySelector("#public-request-link-error");
    if (errorElement) errorElement.textContent = "Only admins can reactivate or disable posted QR request links.";
    return;
  }
  await updatePublicRequestLink(
    linkId,
    { is_active: Boolean(isActive) },
    isActive ? "Request link reactivated." : "Request link disabled.",
  );
}

async function regeneratePublicRequestLink(linkId) {
  if (!canAdministerPublicRequestLinks()) {
    const errorElement = document.querySelector("#public-request-link-error");
    if (errorElement) errorElement.textContent = "Only admins can replace posted QR request links.";
    return;
  }
  const confirmed = window.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.");
  if (!confirmed) return;

  await updatePublicRequestLink(
    linkId,
    {
      token: generatePublicRequestToken(),
      is_active: true,
    },
    "Request QR regenerated.",
  );
}

async function updatePublicRequestLink(linkId, patch, successMessage) {
  const errorElement = document.querySelector("#public-request-link-error");
  if (errorElement) errorElement.textContent = "";

  if (!canAdministerPublicRequestLinks()) {
    if (errorElement) errorElement.textContent = "Only admins can replace, disable, or reactivate posted QR request links.";
    return;
  }

  if (!linkId || !activeCompanyId) {
    if (errorElement) errorElement.textContent = "Select a company before updating request links.";
    return;
  }

  try {
    const { data, error } = await withOperationTimeout(
      supabaseClient
        .from("public_request_links")
        .update({
          ...patch,
          updated_at: new Date().toISOString(),
        })
        .eq("id", linkId)
        .eq("company_id", activeCompanyId)
        .select("id"),
      "Request link update timed out. Check your connection and try again.",
      15000
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

    showNotice(successMessage);
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not update the request link.";
  }
}

async function createPart(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#part-create-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }
  let saveTimeoutId;

  try {
    const payload = {
      company_id: activeCompanyId,
      location_id: activeLocationDatabaseId(),
      name: String(form.get("name") || "").trim(),
      sku: String(form.get("sku") || "").trim() || null,
      supplier_name: String(form.get("supplier_name") || "").trim() || null,
      quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
      reorder_point: Number(form.get("reorder_point")) || 0,
      unit_cost: Number(form.get("unit_cost")) || 0,
    };

    if (!payload.company_id) {
      throw new Error("Choose a company before adding parts.");
    }
    if (!payload.name) {
      throw new Error("Part name is required.");
    }

    const saveTimeout = new Promise((_, reject) => {
      saveTimeoutId = setTimeout(() => reject(new Error("Part save timed out. Check your connection and try again.")), 20000);
    });
    const { data, error } = await Promise.race([
      supabaseClient.from("parts").insert(payload).select("id").single(),
      saveTimeout,
    ]);
    clearTimeout(saveTimeoutId);

    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving parts by location"));
    }
    if (error && isMissingColumnError(error, "supplier_name")) {
      partSuppliersReady = false;
      throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");
    }
    if (error && isMissingColumnError(error, "unit_cost")) {
      partCostsReady = false;
      throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");
    }
    if (error) {
      throw error;
    }

    setActivePartIdState(data?.id || null);
    clearPartSearchState();
    showNotice("Part added.");
    formElement.reset();
    await render();
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
  const part = parts.find((item) => item.id === formElement.dataset.restockPart);
  const quantity = Number(new FormData(formElement).get("quantity")) || 0;
  if (!part || quantity <= 0) return;
  const originalText = submitButton?.textContent || "Restock";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    const { error } = await withOperationTimeout(
      supabaseClient
        .from("parts")
        .update({ quantity_on_hand: (Number(part.quantity_on_hand) || 0) + quantity })
        .eq("id", part.id)
        .eq("company_id", activeCompanyId),
      "Part restock timed out. Check your connection and try again.",
      15000
    );
    if (error) throw error;
    showNotice("Part restocked.");
    await render();
  } catch (error) {
    showNotice(`Could not restock part: ${error.message || error}`, "warning");
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
  const part = parts.find((item) => item.id === formElement.dataset.usePart);
  const quantity = Number(new FormData(formElement).get("quantity")) || 0;
  if (!part || quantity <= 0) return;
  const originalText = submitButton?.textContent || "Use";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    const currentQuantity = Number(part.quantity_on_hand) || 0;
    const nextQuantity = Math.max(0, currentQuantity - quantity);
    const { error } = await withOperationTimeout(
      supabaseClient
        .from("parts")
        .update({ quantity_on_hand: nextQuantity })
        .eq("id", part.id)
        .eq("company_id", activeCompanyId),
      "Part use save timed out. Check your connection and try again.",
      15000
    );
    if (error) throw error;
    showNotice("Part used.");
    await render();
  } catch (error) {
    showNotice(`Could not use part: ${error.message || error}`, "warning");
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
  const errorElement = document.querySelector(`[data-part-edit-error="${partId}"]`);
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
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
    quantity_on_hand: Number(form.get("quantity_on_hand")) || 0,
    reorder_point: Number(form.get("reorder_point")) || 0,
    unit_cost: Number(form.get("unit_cost")) || 0,
  };

  try {
    if (!payload.name) throw new Error("Part name is required.");

    const { error } = await withOperationTimeout(
      supabaseClient
        .from("parts")
        .update(payload)
        .eq("id", partId)
        .eq("company_id", activeCompanyId),
      "Part save timed out. Check your connection and try again.",
      15000
    );

    if (error && isMissingColumnError(error, "supplier_name")) {
      partSuppliersReady = false;
      throw new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");
    }

    if (error && isMissingColumnError(error, "unit_cost")) {
      partCostsReady = false;
      throw new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");
    }

    if (error) throw error;

    setActivePartIdState(null);
    clearPartSearchState();
    showNotice("Part saved.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not save part.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}

function requestDeletePart(id) {
  if (!canDeleteParts()) {
    alert("Only company admins and managers can delete parts.");
    return;
  }

  const part = parts.find((item) => item.id === id);
  if (!part) return;
  if (partUsageRows(id).length) {
    alert("This part has work order usage history and is kept for traceability.");
    return;
  }

  const confirmButtonVisible = Boolean(document.querySelector(`[data-delete-part="${CSS.escape(id)}"].permanent-delete-button`));
  if (pendingDeletePartId === id || confirmButtonVisible) {
    deletePart(id);
    return;
  }

  pendingDeletePartId = id;
  renderWorkspace();
}

async function deletePart(id) {
  if (!canDeleteParts()) {
    alert("Only company admins and managers can delete parts.");
    return;
  }

  const part = parts.find((item) => item.id === id);
  const errorElement = document.querySelector("#part-delete-error");
  if (errorElement) errorElement.textContent = "";
  if (!part) return;

  if (partUsageRows(id).length) {
    if (errorElement) errorElement.textContent = "This part has work order usage history and is kept for traceability.";
    return;
  }
  const confirmButton = document.querySelector(`[data-delete-part="${CSS.escape(id)}"].permanent-delete-button`);
  if (confirmButton) {
    confirmButton.disabled = true;
    confirmButton.textContent = "Deleting...";
  }

  try {
    const documentPaths = (partDocumentsByPartId[id] || [])
      .map((document) => document.storage_path)
      .filter(Boolean);
    if (documentPaths.length) {
      const storageDelete = await withOperationTimeout(
        supabaseClient.storage.from("part-documents").remove(documentPaths),
        "Part document cleanup timed out. Try deleting again.",
        15000
      );
      if (storageDelete.error) {
        throw new Error(`Could not remove filed receipts/invoices: ${storageDelete.error.message}`);
      }
    }

    const { data, error } = await withOperationTimeout(
      supabaseClient
        .from("parts")
        .delete()
        .eq("id", id)
        .eq("company_id", activeCompanyId)
        .select("id"),
      "Part delete timed out. Check your connection and try again.",
      15000
    );

    if (error) {
      throw new Error(error.message.includes("violates foreign key constraint")
        ? "This part is used on a work order and cannot be deleted."
        : error.message);
    }

    if (!data?.length) {
      throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");
    }

    const verification = await withOperationTimeout(
      supabaseClient
        .from("parts")
        .select("id")
        .eq("id", id)
        .eq("company_id", activeCompanyId)
        .maybeSingle(),
      "Part delete verification timed out. Refresh and check the part list.",
      15000
    );

    if (verification.error) {
      throw new Error(`Part delete verification failed: ${verification.error.message}`);
    }

    if (verification.data) {
      throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");
    }

    setActivePartIdState(null);
    pendingDeletePartId = null;
    showNotice("Part deleted.");
    await render();
  } catch (error) {
    showNotice(error.message || "Could not delete part.", "warning");
    if (errorElement) {
      errorElement.textContent = error.message || "Could not delete part.";
    }
    if (confirmButton) {
      confirmButton.disabled = false;
      confirmButton.textContent = "Permanently Delete";
    }
  }
}

async function renamePartSource(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#part-source-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  const form = new FormData(formElement);
  const oldSource = String(form.get("old_source") || "").trim();
  const newSource = String(form.get("new_source") || "").trim();

  if (errorElement) errorElement.textContent = "";
  if (!oldSource) return;
  if (!partSuppliersReady) {
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
    const { error } = await withOperationTimeout(
      supabaseClient
        .from("parts")
        .update({ supplier_name: newSource || null })
        .eq("company_id", activeCompanyId)
        .eq("supplier_name", oldSource),
      "Part source rename timed out. Check your connection and try again.",
      15000
    );

    if (error) {
      if (isMissingColumnError(error, "supplier_name")) partSuppliersReady = false;
      throw new Error(partSuppliersReady
        ? error.message
        : "Run supabase/step-next-part-suppliers.sql before editing sources.");
    }

    showNotice("Part source updated.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not update part source.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Rename";
    }
  }
}

async function uploadPartDocument(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const partId = formElement.dataset.partDocument;
  const errorElement = document.querySelector(`[data-part-document-error="${partId}"]`);
  const submitButton = formElement.querySelector("button[type='submit']");
  const file = new FormData(formElement).get("document");

  if (errorElement) errorElement.textContent = "";
  if (!partDocumentsReady) {
    if (errorElement) errorElement.textContent = "Run supabase/step-next-part-documents.sql before attaching files.";
    return;
  }
  if (!file || !file.name) {
    if (errorElement) errorElement.textContent = "Choose a receipt, invoice, photo, or PDF first.";
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Attaching...";
  }

  const fileName = safeFileName(file.name || "part-file");
  const path = `${activeCompanyId}/${partId}/${crypto.randomUUID()}-${fileName}`;
  try {
    const upload = await withOperationTimeout(
      supabaseClient.storage.from("part-documents").upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      }),
      "Part file upload timed out. Check your connection and try again.",
      25000
    );

    if (upload.error) throw upload.error;

    const { error } = await withOperationTimeout(
      supabaseClient.from("part_documents").insert({
        company_id: activeCompanyId,
        part_id: partId,
        uploaded_by: session.user.id,
        storage_path: path,
        file_name: fileName,
        content_type: file.type || null,
      }),
      "Part file record save timed out. Check your connection and try again.",
      15000
    );

    if (error) {
      await removeUploadedObject("part-documents", path);
      if (isColumnSchemaError(error, ["part_documents"])) partDocumentsReady = false;
      throw new Error(partDocumentsReady
        ? error.message
        : "Run supabase/step-next-part-documents.sql before attaching files.");
    }

    showNotice("Part file attached.");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not attach file.";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Attach File";
    }
  }
}

async function recordPartUsed(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const errorElement = document.querySelector("#parts-used-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Recording...";
  }

  try {
    const form = new FormData(formElement);
    const partId = form.get("part_id");
    const quantity = Number(form.get("quantity_used")) || 1;
    const part = parts.find((item) => item.id === partId);
    if (!activeWorkOrderId) throw new Error("Open a work order before recording parts.");
    if (!part) throw new Error("Choose a part first.");

    const usageError = await addPartUsageToWorkOrder(activeWorkOrderId, part, quantity);
    if (usageError) throw usageError;

    showNotice("Part recorded on work order.");
    await render();
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

  const { error } = await withOperationTimeout(
    supabaseClient.rpc("record_work_order_part_usage", {
      p_company_id: activeCompanyId,
      p_work_order_id: workOrderId,
      p_part_id: part.id,
      p_quantity: quantity,
    }),
    "Part usage save timed out."
  );
  if (error) return error;
  return null;
}

async function createFollowUpWorkOrder(sourceId) {
  const source = workOrders.find((item) => item.id === sourceId);
  if (!source) return;

  const payload = {
    company_id: activeCompanyId,
    location_id: source.location_id || locationIdForAsset(source.asset_id),
    asset_id: source.asset_id || null,
    assigned_to: source.assigned_to || null,
    title: `Follow-up: ${source.title}`,
    description: [
      source.resolution_summary ? `Prior resolution: ${source.resolution_summary}` : "",
      source.completion_notes ? `Prior notes: ${source.completion_notes}` : "",
      `Created from completed work order ${source.title}.`,
    ].filter(Boolean).join("\n\n"),
    priority: source.priority || "medium",
    type: "corrective",
    status: "open",
    due_at: null,
    created_by: session.user.id,
  };
  applySafetyRequirementPayload(payload);
  applySafetyCheckPayload(payload, false);
  try {
    const { data, error } = await withOperationTimeout(
      insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
      "Follow-up work order save timed out."
    );
    if (error) throw error;

    let sourceWarning = "";
    try {
      const sourceUpdate = await withOperationTimeout(
        updateWorkOrderSafely({ follow_up_needed: false }, source.id),
        "Follow-up source update timed out."
      );
      if (sourceUpdate.error) sourceWarning = sourceUpdate.error.message;
    } catch (updateError) {
      sourceWarning = updateError.message || String(updateError);
    }
    if (sourceWarning) showNotice(`Follow-up created, but source order did not update: ${sourceWarning}`, "warning");
    await recordWorkOrderEvent(source.id, "follow_up_created", `Follow-up work order created: ${data.title}.`);
    await recordWorkOrderEvent(data.id, "created", `Created as follow-up from ${source.title}.`);
    setActiveSectionState("work");
    setActiveWorkOrderIdState(data.id);
    await render();
  } catch (error) {
    showNotice(`Could not create follow-up work: ${error.message || error}`, "warning");
  }
}

async function createWorkOrder(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#create-work-order-error");
  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const form = new FormData(formElement);
    const status = form.get("status") || "open";
    let assetId = form.get("asset_id") || null;
    const newAssetName = String(form.get("new_asset_name") || "").trim();
    if (newAssetName) {
      const { data: newAsset, error: assetError } = await createQuickFixAsset(newAssetName, "running");
      if (assetError) {
        if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
        return;
      }
      assetId = newAsset.id;
    }
    if (!newAssetName && !confirmAssetLocationRouting(assetId, "creating this work order", errorTarget)) return;
    if (status === "completed" && assetRequiresSafety(assetId) && form.get("safety_devices_checked") !== "on") {
      if (errorTarget) errorTarget.textContent = "Check safety devices before creating completed work tied to equipment.";
      return;
    }
    const procedureCompletionMessage = status === "completed"
      ? blocksProcedureCompletion(null, form.get("procedure_template_id") || null)
      : "";
    if (procedureCompletionMessage) {
      setWorkOrderActionWarning("", "");
      if (errorTarget) errorTarget.textContent = `${procedureCompletionMessage} Create the work order first, then complete the checklist before marking it complete.`;
      return;
    }
    const payload = {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(assetId),
      title: requiredText(form.get("title"), "Work order title"),
      description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
      asset_id: assetId,
      priority: form.get("priority"),
      type: form.get("type") || "reactive",
      due_at: workOrderDateValue(form.get("due_at")),
      assigned_to: assignedUserFromForm(form),
      ...procedureColumn(form.get("procedure_template_id")),
      status,
      created_by: session.user.id,
      actual_minutes: Number(form.get("actual_minutes")) || 0,
      failure_cause: form.get("failure_cause") || null,
      resolution_summary: form.get("resolution_summary") || null,
      follow_up_needed: form.get("follow_up_needed") === "on",
      completion_notes: form.get("completion_notes") || null,
      completed_at: status === "completed" ? new Date().toISOString() : null,
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, status === "completed" && payload.safety_check_required && form.get("safety_devices_checked") === "on");
    const { data, error } = await withOperationTimeout(
      insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
      "Work order creation timed out. Check your connection and try again."
    );
    if (error) {
      if (errorTarget) errorTarget.textContent = `Could not create work order: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }
    await recordWorkOrderEvent(data.id, "created", "Work order created.");
    if (newAssetName) {
      await recordWorkOrderEvent(data.id, "equipment_created", `Equipment created from work order: ${newAssetName}.`);
    }

    const warnings = [];
    const partId = form.get("part_id");
    if (partId) {
      const part = parts.find((item) => item.id === partId);
      const partError = await addPartUsageToWorkOrder(data.id, part, Number(form.get("quantity_used")) || 1);
      if (partError) warnings.push(`part usage failed: ${partError.message}`);
      else await recordWorkOrderEvent(data.id, "part_used", `Part recorded: ${part?.name || "Part"}.`);
    }

    const photo = form.get("photo");
    if (photo && photo.name) {
      const photoError = await addPhotoToWorkOrder(data.id, photo);
      if (photoError) warnings.push(`photo upload failed: ${photoError.message}`);
      else await recordWorkOrderEvent(data.id, "photo_uploaded", `Photo uploaded: ${photo.name}.`);
    }

    const initialComment = String(form.get("initial_comment") || "").trim();
    if (initialComment) {
      const commentError = await addCommentToWorkOrder(data.id, initialComment);
      if (commentError) warnings.push(`comment failed: ${commentError.message}`);
      else await recordWorkOrderEvent(data.id, "comment_added", "Initial comment added.");
    }

    setActiveWorkOrderIdState(data.id);
    createWorkOrderMode = false;
    showNotice(warnings.length ? `Work order created with warning: ${warnings[0]}` : "Work order created.", warnings.length ? "warning" : "success");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not create work order: ${error.message || error}`;
    else alert(error.message || error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create Work Order";
  }
}

function openQuickFixForRequest(requestId) {
  const request = maintenanceRequests.find((item) => item.id === requestId);
  if (!request) return;
  quickFixRequestId = requestId;
  quickFixAssetId = request.asset_id || null;
  quickFixMode = true;
  setActiveWorkOrderIdState(null);
  setActiveAssetIdState(null);
  createWorkOrderMode = false;
  setActiveSectionState("mywork");
  renderWorkspace();
}

const { createQuickFix } = createQuickFixWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  withOperationTimeout,
  createQuickFixAsset,
  getMaintenanceRequests: () => maintenanceRequests,
  getQuickFixRequestId: () => quickFixRequestId,
  getActiveCompanyId: () => activeCompanyId,
  getSession: () => session,
  getParts: () => parts,
  getRequestsReady: () => requestsReady,
  getSupabaseClient: () => supabaseClient,
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
  setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
  setQuickFixMode: (value) => { quickFixMode = value; },
  setQuickFixAssetId: (value) => { quickFixAssetId = value; },
  setQuickFixRequestId: (value) => { quickFixRequestId = value; },
  showNotice,
  render,
  alertUser: (message) => alert(message),
});

async function updateWorkOrderDetails(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#work-order-save-error");
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const form = new FormData(event.target);
    const previous = workOrders.find((workOrder) => workOrder.id === activeWorkOrderId);
    const currentStatus = document.querySelector("#status-select")?.value || previous?.status || "open";
    const payload = {
      title: requiredText(form.get("title"), "Work order title"),
      description: descriptionWithAssignmentNote(form.get("description"), form.get("assigned_to")),
      due_at: workOrderDateValue(form.get("due_at")),
      location_id: locationIdForAsset(previous?.asset_id || null),
      status: currentStatus,
      priority: form.get("priority"),
      type: form.get("type"),
      assigned_to: assignedUserFromForm(form),
      ...procedureColumn(form.get("procedure_template_id")),
      failure_cause: form.get("failure_cause") || null,
      resolution_summary: form.get("resolution_summary") || null,
      follow_up_needed: form.get("follow_up_needed") === "on",
      actual_minutes: Number(form.get("actual_minutes")) || 0,
    };
    payload.safety_check_required = assetRequiresSafety(previous?.asset_id || null);
    if (payload.status === "completed" && previous?.status !== "completed" && payload.safety_check_required && !hasCompletedSafetyDeviceCheck(previous) && form.get("safety_devices_checked") !== "on") {
      submitButton.disabled = false;
      submitButton.textContent = "Save Work Order";
      if (errorTarget) errorTarget.textContent = "Use Complete Work and check safety devices before completing equipment work.";
      return;
    }
    const procedureChanged = (previous?.procedure_template_id || "") !== (payload.procedure_template_id || "");
    const procedureCompletionMessage = payload.status === "completed" && (previous?.status !== "completed" || procedureChanged)
      ? blocksProcedureCompletion(previous, payload.procedure_template_id || null)
      : "";
    if (procedureCompletionMessage) {
      setWorkOrderActionWarning(activeWorkOrderId, procedureCompletionMessage);
      submitButton.disabled = false;
      submitButton.textContent = "Save Work Order";
      if (errorTarget) errorTarget.textContent = procedureCompletionMessage;
      return;
    }
    if (payload.status === "completed" && previous?.status !== "completed") {
      payload.completed_at = new Date().toISOString();
      applySafetyCheckPayload(payload, payload.safety_check_required && (form.get("safety_devices_checked") === "on" || hasCompletedSafetyDeviceCheck(previous)));
    } else if (payload.status !== "completed") {
      payload.completed_at = null;
      applySafetyCheckPayload(payload, false);
    } else if (previous?.status === "completed" && payload.safety_check_required && form.has("safety_devices_checked")) {
      applySafetyCheckPayload(payload, form.get("safety_devices_checked") === "on" || hasCompletedSafetyDeviceCheck(previous));
    } else if (previous?.status === "completed" && !payload.safety_check_required) {
      applySafetyCheckPayload(payload, false);
    }
    const { error } = await withOperationTimeout(
      updateWorkOrderSafely(payload, activeWorkOrderId),
      "Work order save timed out. Check your connection and try again.",
      20000
    );
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Work Order";
      if (errorTarget) errorTarget.textContent = `Could not save work order: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }
    const changeSnapshot = { ...Object.fromEntries(form.entries()), status: currentStatus };
    const logError = await withOperationTimeout(
      recordWorkOrderEvent(activeWorkOrderId, "updated", describeWorkOrderChanges(previous, changeSnapshot)),
      "Activity log timed out.",
      8000
    ).catch((error) => error);
    setWorkOrderActionWarning("", "");
    showNotice(logError ? `Work order saved, but history did not update: ${logError.message}` : "Work order saved.", logError ? "warning" : "success");
    await render();
  } catch (error) {
    console.error("Work order save failed", error);
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

async function updateWorkOrderQuickView(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#quick-update-error");
  const previous = workOrders.find((workOrder) => workOrder.id === activeWorkOrderId);
  const form = new FormData(formElement);
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    let assetId = form.get("asset_id") || null;
    const newAssetName = String(form.get("new_asset_name") || "").trim();
    if (newAssetName) {
      const { data: newAsset, error: assetError } = await createQuickFixAsset(newAssetName, "running");
      if (assetError) {
        submitButton.disabled = false;
        submitButton.textContent = "Save Quick Update";
        if (errorTarget) errorTarget.textContent = `Could not add equipment: ${assetError.message}`;
        return;
      }
      assetId = newAsset.id;
    }
    if (!newAssetName && !confirmAssetLocationRouting(assetId, "saving this work update", errorTarget)) return;
    const payload = {
      title: requiredText(form.get("title"), "Issue"),
      description: descriptionWithAssignmentNote(previous?.description || "", form.get("assigned_to")),
      asset_id: assetId,
      location_id: locationIdForAsset(assetId),
      due_at: workOrderDateValue(form.get("due_at")),
      status: form.get("status"),
      priority: form.get("priority"),
      assigned_to: assignedUserFromForm(form),
      resolution_summary: form.get("resolution_summary") || null,
    };
    applySafetyRequirementPayload(payload);
    const safetyChecked = form.get("safety_devices_checked") === "on";
    if (payload.status === "completed" && previous?.status !== "completed") {
      const procedureCompletionMessage = blocksProcedureCompletion(previous);
      if (procedureCompletionMessage) {
        setWorkOrderActionWarning(activeWorkOrderId, procedureCompletionMessage);
        submitButton.disabled = false;
        submitButton.textContent = "Save Quick Update";
        if (errorTarget) errorTarget.textContent = procedureCompletionMessage;
        return;
      }
      applySafetyCheckPayload(payload, safetyChecked);
      if (requiresSafetyDeviceCheck(payload) && !payload.safety_devices_checked) {
        submitButton.disabled = false;
        submitButton.textContent = "Save Quick Update";
        if (errorTarget) errorTarget.textContent = "Check safety devices before completing work tied to equipment.";
        return;
      }
      payload.completed_at = new Date().toISOString();
    }
    if (payload.status !== "completed") {
      payload.completed_at = null;
      applySafetyCheckPayload(payload, false);
    } else if (previous?.status === "completed") {
      applySafetyCheckPayload(payload, payload.safety_check_required && (safetyChecked || hasCompletedSafetyDeviceCheck(previous)));
    }

    const { error } = await withOperationTimeout(
      updateWorkOrderSafely(payload, activeWorkOrderId),
      "Quick update save timed out. Check your connection and try again.",
      20000
    );
    if (error) {
      submitButton.disabled = false;
      submitButton.textContent = "Save Quick Update";
      if (errorTarget) errorTarget.textContent = `Could not save update: ${friendlyWorkOrderSaveError(error)}`;
      return;
    }

    const warnings = [];
    if (payload.asset_id && form.get("machine_down") === "on") {
      const assetError = await updateAssetStatus(payload.asset_id, "offline");
      if (assetError) {
        warnings.push(`equipment status did not update: ${assetError.message}`);
      } else {
        await recordWorkOrderEvent(activeWorkOrderId, "asset_status_updated", "Equipment marked down/offline.");
      }
    }

    const logError = await withOperationTimeout(
      recordWorkOrderEvent(activeWorkOrderId, "quick_update", describeWorkOrderChanges(previous, Object.fromEntries(form.entries()))),
      "Activity log timed out.",
      8000
    ).catch((error) => error);
    if (newAssetName) {
      await withOperationTimeout(
        recordWorkOrderEvent(activeWorkOrderId, "equipment_created", `Equipment created from work order: ${newAssetName}.`),
        "Activity log timed out.",
        8000
      ).catch(() => null);
    }
    if (logError) warnings.push(`history did not update: ${logError.message}`);
    setWorkOrderActionWarning("", "");
    showNotice(warnings.length ? `Quick update saved with warning: ${warnings[0]}` : "Quick update saved.", warnings.length ? "warning" : "success");
    await render();
  } catch (error) {
    console.error("Quick update save failed", error);
    submitButton.disabled = false;
    submitButton.textContent = "Save Quick Update";
    if (errorTarget) errorTarget.textContent = `Could not save update: ${error.message || error}`;
  }
}

function renderRequestForm() {
  const detailPanel = document.querySelector("#detail-panel");
  detailPanel.innerHTML = renderRequestFormContent();
}

async function createRequest(event) {
  event.preventDefault();
  await createRequestFromForm(event.target);
}

async function createRequestFromForm(formElement) {
  const errorElement = document.querySelector("#request-error");
  const submitButton = formElement.querySelector("button[type='submit']");
  if (errorElement) errorElement.textContent = "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
  }

  try {
    const form = new FormData(formElement);
    const assetId = form.get("asset_id") || null;
    if (!confirmAssetLocationRouting(assetId, "submitting this request", errorElement)) return;
    const requestPayload = {
      company_id: activeCompanyId,
      location_id: locationIdForAsset(assetId),
      title: requiredText(form.get("title"), "Request title"),
      description: requiredText(form.get("description"), "Request description"),
      asset_id: assetId,
      priority: form.get("priority"),
      status: "submitted",
      requested_by: session.user.id,
    };

    if (!requestsReady) {
      throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");
    }
    const { data, error } = await withOperationTimeout(
      supabaseClient.from("maintenance_requests").insert(requestPayload).select("*").single(),
      "Request save timed out. Check your connection and try again.",
      15000
    );
    if (error && isMissingColumnError(error, "location_id")) {
      locationsReady = false;
      throw new Error(databaseSetupRequiredMessage("saving requests by location"));
    }
    if (error) throw error;
    const photo = form.get("photo");
    let photoWarning = "";
    if (photo && photo.name) {
      const photoError = await addPhotoToMaintenanceRequest(data.id, photo);
      if (photoError) photoWarning = ` Photo did not upload: ${photoError.message || photoError}`;
    }
    setActiveSectionState("requests");
    workspaceUiState.setRequestViewFilter("active");
    workspaceUiState.resetRequestsPage();
    showNotice(`Request submitted.${photoWarning}`, photoWarning ? "warning" : "success");
    await render();
  } catch (error) {
    if (errorElement) errorElement.textContent = error.message || "Could not submit request.";
    else alert(error.message || error);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Request";
    }
  }
}

// WORKFLOW NOTE: Request conversion is a workflow mutation boundary; preserve source request context and location when changing it.
async function convertRequestToWorkOrder(requestId) {
  const request = maintenanceRequests.find((item) => item.id === requestId);
  if (!request) return;
  const button = document.querySelector(`[data-convert-request="${CSS.escape(requestId)}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = "Converting...";
  }

  try {
    const payload = {
      company_id: activeCompanyId,
      location_id: request.location_id || locationIdForAsset(request.asset_id),
      title: request.title,
      description: descriptionWithRequestPhotoNote(request.description, request),
      asset_id: request.asset_id || null,
      priority: request.priority || "medium",
      type: "reactive",
      status: "open",
      created_by: session.user.id,
    };
    applySafetyRequirementPayload(payload);
    applySafetyCheckPayload(payload, false);
    const { data, error } = await withOperationTimeout(
      insertWithOptionalProcedure("work_orders", payload, { returnSingle: true }),
      "Request conversion timed out. Check your connection and try again.",
      15000
    );
    if (error) throw error;

    const { error: updateError } = await withOperationTimeout(
      supabaseClient
        .from("maintenance_requests")
        .update({
          status: "converted",
          reviewed_by: session.user.id,
          reviewed_at: new Date().toISOString(),
          converted_work_order_id: data.id,
        })
        .eq("id", requestId)
        .eq("company_id", activeCompanyId),
      "Request status update timed out. Check your connection and try again.",
      15000
    );
    if (updateError) throw updateError;

    setActiveSectionState("work");
    setActiveWorkOrderIdState(data.id);
    await withOperationTimeout(
      recordWorkOrderEvent(data.id, "request_converted", "Request converted to work order."),
      "Activity log timed out.",
      8000
    ).catch(() => null);
    showNotice("Request converted to work order.");
    await render();
  } catch (error) {
    showNotice(`Could not convert request: ${error.message || error}`, "warning");
    if (button) {
      button.disabled = false;
      button.textContent = "Convert to Work Order";
    }
  }
}

function requestDeleteMaintenanceRequest(id) {
  if (!canDeleteOperationalRecords()) {
    alert("Only company admins and managers can delete requests.");
    return;
  }
  if (!maintenanceRequests.some((request) => request.id === id)) return;
  pendingDeleteRequestId = id;
  renderWorkspace();
}

async function deleteMaintenanceRequest(id) {
  if (!canDeleteOperationalRecords()) {
    alert("Only company admins and managers can delete requests.");
    return;
  }

  const request = maintenanceRequests.find((item) => item.id === id);
  if (!request) return;
  const button = document.querySelector(`[data-confirm-delete-request="${CSS.escape(id)}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = "Deleting...";
  }

  try {
    if (request.photo_storage_path) {
      const storageDelete = await withOperationTimeout(
        supabaseClient.storage.from("maintenance-request-photos").remove([request.photo_storage_path]),
        "Request photo cleanup timed out.",
        15000
      );
      if (storageDelete.error) throw new Error(`Could not remove request photo: ${storageDelete.error.message}`);
    }

    const { data, error } = await withOperationTimeout(
      supabaseClient
        .from("maintenance_requests")
        .delete()
        .eq("id", id)
        .eq("company_id", activeCompanyId)
        .select("id"),
      "Request delete timed out. Check your connection and try again.",
      15000
    );
    if (error) throw error;
    if (!data?.length) {
      throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");
    }

    const verification = await withOperationTimeout(
      supabaseClient
        .from("maintenance_requests")
        .select("id")
        .eq("id", id)
        .eq("company_id", activeCompanyId)
        .maybeSingle(),
      "Request delete verification timed out. Refresh and check the request list.",
      15000
    );
    if (verification.error) throw new Error(`Request delete verification failed: ${verification.error.message}`);
    if (verification.data) throw new Error("Request delete did not persist in Supabase.");

    pendingDeleteRequestId = null;
    showNotice("Request deleted.");
    await render();
  } catch (error) {
    showNotice(error.message || "Could not delete request.", "warning");
    if (button) {
      button.disabled = false;
      button.textContent = "Permanently Delete";
    }
  }
}

async function updateWorkOrderStatus(event) {
  const previous = workOrders.find((item) => item.id === activeWorkOrderId);
  event.target.disabled = true;
  try {
    const saved = await setWorkOrderStatus(activeWorkOrderId, event.target.value);
    if (!saved) event.target.value = previous?.status || "open";
  } catch (error) {
    event.target.value = previous?.status || "open";
    showNotice(`Could not update status: ${error.message || error}`, "warning");
  } finally {
    event.target.disabled = false;
  }
}

async function saveStepResult(event) {
  const field = event.target;
  const value = field.type === "checkbox" ? (field.checked ? "checked" : "") : field.value;
  field.disabled = true;
  try {
    const { error } = await withOperationTimeout(
      supabaseClient.from("work_order_step_results").upsert({
        company_id: activeCompanyId,
        work_order_id: field.dataset.workOrderId,
        procedure_step_id: field.dataset.stepResult,
        completed_by: value ? session.user.id : null,
        value,
        completed_at: value ? new Date().toISOString() : null,
      }, { onConflict: "work_order_id,procedure_step_id" }),
      "Checklist save timed out. Check your connection and try again.",
      15000
    );

    if (error) throw error;
    await withOperationTimeout(
      recordWorkOrderEvent(field.dataset.workOrderId, "checklist_updated", "Procedure checklist updated."),
      "Activity log timed out.",
      8000
    ).catch(() => null);
    const reloadError = await withOperationTimeout(
      loadStepResults(),
      "Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",
      10000
    ).catch((error) => error);
    if (reloadError) {
      showNotice(`Checklist saved, but refresh did not finish: ${reloadError.message || reloadError}`, "warning");
      field.disabled = false;
      return;
    }
    if (workOrderActionWarningId === field.dataset.workOrderId) {
      const refreshedWorkOrder = workOrders.find((item) => item.id === field.dataset.workOrderId);
      if (!blocksProcedureCompletion(refreshedWorkOrder)) setWorkOrderActionWarning("", "");
    }
    renderWorkspace();
  } catch (error) {
    showNotice(`Could not save checklist step: ${error.message || error}`, "warning");
    field.disabled = false;
  }
}

async function setWorkOrderStatus(id, status) {
  const workOrder = workOrders.find((item) => item.id === id);
  if (status === "completed") {
    const procedureCompletionMessage = blocksProcedureCompletion(workOrder);
    if (procedureCompletionMessage) {
      setActiveWorkOrderIdState(id);
      setWorkOrderActionWarning(id, procedureCompletionMessage);
      showNotice(procedureCompletionMessage, "warning");
      await render();
      return false;
    }
  }
  const safetyCheckedNow = currentSafetyCheckboxCheckedForWorkOrder(id);
  const hasSafetyCheck = hasCompletedSafetyDeviceCheck(workOrder) || safetyCheckedNow;
  if (status === "completed" && requiresSafetyDeviceCheck(workOrder) && !hasSafetyCheck) {
    setActiveWorkOrderIdState(id);
    const safetyMessage = "Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";
    setWorkOrderActionWarning(id, safetyMessage);
    showNotice(safetyMessage, "warning");
    await render();
    return false;
  }
  const payload = {
    status,
    asset_id: workOrder?.asset_id || null,
    completed_at: status === "completed" ? new Date().toISOString() : null,
  };
  applySafetyRequirementPayload(payload);
  if (status === "completed") {
    applySafetyCheckPayload(payload, payload.safety_check_required && hasSafetyCheck);
  } else if (status !== "completed") {
    applySafetyCheckPayload(payload, false);
  }
  delete payload.asset_id;
  const { error } = await withOperationTimeout(
    updateWorkOrderSafely(payload, id),
    "Status save timed out. Check your connection and try again.",
    15000
  );
  if (error) {
    showNotice(`Could not update status: ${friendlyWorkOrderSaveError(error)}`, "warning");
    return false;
  }
  setActiveWorkOrderIdState(id);
  setWorkOrderActionWarning("", "");
  await recordWorkOrderEvent(id, "status_changed", `Status changed to ${statusLabel(status)}.`);
  showNotice(`Status changed to ${statusLabel(status)}.`);
  await render();
  return true;
}

async function assignWorkOrderToMe(id) {
  try {
    const hasProfile = await ensureProfileForActiveCompany();
    if (!hasProfile) return alert(appError);
    const workOrder = workOrders.find((item) => item.id === id);
    if (!canAssignWorkOrderToMe(workOrder)) {
      return alert("Technicians can only claim unassigned work. Managers can reassign work.");
    }

    const { error } = await withOperationTimeout(
      supabaseClient
        .from("work_orders")
        .update({
          assigned_to: session.user.id,
          description: cleanWorkOrderDescription(workOrder?.description) || null,
        })
        .eq("id", id)
        .eq("company_id", activeCompanyId),
      "Assignment save timed out. Check your connection and try again.",
      15000
    );

    if (error) return alert(friendlyWorkOrderSaveError(error));
    setActiveWorkOrderIdState(id);
    setActiveAssetIdState(null);
    await recordWorkOrderEvent(id, "assigned", "Assigned to self.");
    await render();
  } catch (error) {
    alert(error.message || error);
  }
}

async function assignWorkOrderFromCard(event) {
  event.preventDefault();
  event.stopPropagation();
  const formElement = event.currentTarget;
  const workOrder = workOrders.find((item) => item.id === formElement.dataset.cardAssign);
  const form = new FormData(formElement);
  if (!workOrder) return;
  if (formElement.dataset.saving === "true") return;

  const assignmentValue = form.get("assigned_to") || "";
  const assignedTo = assignmentValue === OUTSIDE_VENDOR_VALUE ? null : assignmentValue || null;
  const nextDescription = descriptionWithAssignmentNote(workOrder.description, assignmentValue);
  const submitButton = formElement.querySelector("button[type='submit']");
  const originalButtonText = submitButton?.textContent || "Assign";

  formElement.dataset.saving = "true";
  formElement.classList.add("is-saving");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Saving...";
  }

  try {
    const { error } = await withOperationTimeout(
      supabaseClient
        .from("work_orders")
        .update({
          assigned_to: assignedTo,
          description: nextDescription,
        })
        .eq("id", workOrder.id)
        .eq("company_id", activeCompanyId),
      "Assignment save timed out. Check your connection and try again.",
      15000
    );

    if (error) {
      showNotice(`Could not assign: ${friendlyWorkOrderSaveError(error)}`, "warning");
      return;
    }

    Object.assign(workOrder, {
      assigned_to: assignedTo,
      description: nextDescription,
      assigned_profile: assignedTo ? { full_name: teamMemberName(assignedTo) } : null,
    });

    const summary = assignmentValue === OUTSIDE_VENDOR_VALUE
      ? "Assigned to outside vendor."
      : assignmentValue
        ? `Assigned to ${teamMemberName(assignmentValue)}.`
        : "Assignment cleared.";
    await recordWorkOrderEvent(workOrder.id, "assigned", summary);
    showNotice("Assignment saved.");
    await render();
  } catch (error) {
    showNotice(`Could not assign: ${error.message || error}`, "warning");
  } finally {
    delete formElement.dataset.saving;
    formElement.classList.remove("is-saving");
    if (submitButton && document.body.contains(submitButton)) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

async function createComment(event) {
  event.preventDefault();
  const formElement = event.target;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#comment-error");
  const body = new FormData(formElement).get("body")?.trim();
  if (!body) return;

  submitButton.disabled = true;
  submitButton.textContent = "Adding...";
  if (errorTarget) errorTarget.textContent = "";

  try {
    const error = await addCommentToWorkOrder(activeWorkOrderId, body);

    if (error) {
      if (errorTarget) errorTarget.textContent = `Could not add comment: ${error.message || error}`;
      return;
    }

    await recordWorkOrderEvent(activeWorkOrderId, "comment_added", "Comment added.");
    await loadComments();
    await loadWorkOrderEvents();
    showNotice("Comment added.");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not add comment: ${error.message || error}`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Add Comment";
  }
}

async function addCommentToWorkOrder(workOrderId, body) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return new Error(appError);

  const payload = {
    company_id: activeCompanyId,
    work_order_id: workOrderId,
    author_id: session.user.id,
    body,
  };
  let { error } = await withOperationTimeout(
    supabaseClient.from("work_order_comments").insert(payload),
    "Comment save timed out. Check your connection and try again.",
    15000
  );

  if (error && isProfileMissingError(error)) {
    await ensureProfileForActiveCompany();
    const retry = await withOperationTimeout(
      supabaseClient.from("work_order_comments").insert(payload),
      "Comment retry timed out. Check your connection and try again.",
      15000
    );
    error = retry.error;
  }
  return error || null;
}

async function uploadPhoto(event) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const submitButton = formElement.querySelector("button[type='submit']");
  const errorTarget = document.querySelector("#photo-error");
  if (errorTarget) errorTarget.textContent = "";
  const file = new FormData(formElement).get("photo");
  if (!file || !file.name) {
    if (errorTarget) errorTarget.textContent = "Choose a photo first.";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Uploading...";
  try {
    const hasProfile = await ensureProfileForActiveCompany();
    if (!hasProfile) throw new Error(appError);

    const error = await addPhotoToWorkOrder(activeWorkOrderId, file);
    if (error) throw error;
    await withOperationTimeout(
      recordWorkOrderEvent(activeWorkOrderId, "photo_uploaded", `Photo uploaded: ${file.name}.`),
      "Activity log timed out.",
      8000
    ).catch(() => null);
    showNotice("Photo uploaded.");
    await render();
  } catch (error) {
    if (errorTarget) errorTarget.textContent = `Could not upload photo: ${error.message || error}`;
    else alert(error.message || error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Upload Photo";
  }
}

async function removeUploadedObject(bucket, path) {
  try {
    const { error } = await withOperationTimeout(
      supabaseClient.storage.from(bucket).remove([path]),
      "Uploaded file cleanup timed out.",
      10000
    );
    if (error) console.warn(`Could not remove uploaded ${bucket} object`, error);
  } catch (error) {
    console.warn(`Could not remove uploaded ${bucket} object`, error);
  }
}

async function addPhotoToWorkOrder(workOrderId, file) {
  const hasProfile = await ensureProfileForActiveCompany();
  if (!hasProfile) return new Error(appError);

  const optimized = await optimizePhoto(file);
  const path = `${activeCompanyId}/${workOrderId}/${crypto.randomUUID()}-${optimized.fileName}`;
  const upload = await withOperationTimeout(
    supabaseClient.storage.from("work-order-photos").upload(path, optimized.blob, {
      contentType: optimized.contentType,
      upsert: false,
    }),
    "Photo upload timed out. Check your connection and try again.",
    25000
  );
  if (upload.error) return upload.error;

  const photoRecord = {
    company_id: activeCompanyId,
    work_order_id: workOrderId,
    uploaded_by: session.user.id,
    storage_path: path,
    file_name: optimized.fileName,
    content_type: optimized.contentType,
    file_size_bytes: optimized.blob.size || null,
    original_file_name: safeFileName(file.name || "photo"),
    original_size_bytes: file.size || null,
  };

  let { error } = await withOperationTimeout(
    supabaseClient.from("work_order_photos").insert(photoRecord),
    "Photo record save timed out. Check your connection and try again.",
    15000
  );
  if (error && isColumnSchemaError(error, ["file_size_bytes", "original_file_name", "original_size_bytes"])) {
    delete photoRecord.file_size_bytes;
    delete photoRecord.original_file_name;
    delete photoRecord.original_size_bytes;
    const retry = await withOperationTimeout(
      supabaseClient.from("work_order_photos").insert(photoRecord),
      "Photo record retry timed out. Check your connection and try again.",
      15000
    );
    error = retry.error;
  }
  if (error) await removeUploadedObject("work-order-photos", path);
  return error || null;
}

async function addPhotoToMaintenanceRequest(requestId, file) {
  if (!requestId) return new Error("Request was not saved before photo upload.");

  const optimized = await optimizePhoto(file);
  const path = `${requestId}/${crypto.randomUUID()}-${optimized.fileName}`;
  const upload = await withOperationTimeout(
    supabaseClient.storage.from("maintenance-request-photos").upload(path, optimized.blob, {
      contentType: optimized.contentType,
      upsert: false,
    }),
    "Request photo upload timed out. Check your connection and try again.",
    25000
  );
  if (upload.error) return upload.error;

  const { error } = await withOperationTimeout(
    supabaseClient.rpc("attach_maintenance_request_photo", {
      target_request_id: requestId,
      p_photo_storage_path: path,
      p_photo_file_name: optimized.fileName,
      p_photo_content_type: optimized.contentType,
      p_photo_file_size_bytes: optimized.blob.size || null,
      p_photo_original_file_name: safeFileName(file.name || "photo"),
      p_photo_original_size_bytes: file.size || null,
    }),
    "Request photo record save timed out. Check your connection and try again.",
    15000
  );
  if (error) {
    await removeUploadedObject("maintenance-request-photos", path);
  }
  return error || null;
}

async function optimizePhoto(file) {
  const imageTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!imageTypes.includes(file.type)) {
    return {
      blob: file,
      fileName: safeFileName(file.name || "photo"),
      contentType: file.type || "application/octet-stream",
    };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 2400;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(bitmap, 0, 0, width, height);
    if (bitmap.close) bitmap.close();

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    if (!blob) throw new Error("Browser could not optimize this image.");

    return {
      blob,
      fileName: `${fileBaseName(file.name || "photo")}.jpg`,
      contentType: "image/jpeg",
    };
  } catch (error) {
    console.warn("Photo optimization failed; uploading original.", error);
    return {
      blob: file,
      fileName: safeFileName(file.name || "photo"),
      contentType: file.type || "application/octet-stream",
    };
  }
}

async function optimizeLogo(file) {
  const imageTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!imageTypes.includes(file.type)) {
    return {
      blob: file,
      fileName: safeFileName(file.name || "logo"),
      contentType: file.type || "application/octet-stream",
    };
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 1200;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
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
      fileName: `${fileBaseName(file.name || "logo")}.png`,
      contentType: "image/png",
    };
  } catch (error) {
    console.warn("Logo optimization failed; uploading original.", error);
    return {
      blob: file,
      fileName: safeFileName(file.name || "logo"),
      contentType: file.type || "application/octet-stream",
    };
  }
}

function activeCompanyRole() {
  const activeMembership = companyMembers.find((member) =>
    member.company_id === activeCompanyId && member.user_id === session?.user?.id
  );
  if (activeMembership?.role) return normalizeRole(activeMembership.role);
  return normalizeRole(companies.find((company) => company.id === activeCompanyId)?.role);
}

function canManageTeam() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function canAdministerPublicRequestLinks() {
  return activeCompanyRole() === "admin";
}

function canSwitchLocations() {
  return canManageTeam() || Boolean(profilesByUserId[session.user.id]?.mobile_tech);
}

function canDeleteWorkOrders() {
  return activeCompanyRole() === "admin";
}

function canDeleteParts() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function canDeleteEquipment() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function canDeleteOperationalRecords() {
  return ["admin", "manager"].includes(activeCompanyRole());
}

function canAssignWorkOrderToMe(workOrder) {
  if (!workOrder || workOrder.assigned_to === session?.user?.id) return false;
  if (canManageTeam()) return true;
  return !workOrder.assigned_to && !isVendorAssigned(workOrder);
}

function visibleNavItems() {
  const items = [
    ["mywork", "My Work"],
    ["work", "Work Orders"],
    ["planning", "Planning"],
    ["requests", "Requests"],
    ["assets", "Equipment"],
    ["pm", "PM"],
    ["procedures", "Procedures"],
    ["parts", "Parts"],
    ["messages", "Messages"],
    ["team", "Team"],
  ];
  if (canManageTeam()) {
    items.push(["setup", "Admin Setup"], ["settings", "Settings"]);
  }
  return items;
}

function assignedUserFromForm(form, defaultUserId = null) {
  const value = form.has("assigned_to") ? form.get("assigned_to") : (defaultUserId || "");
  return value === OUTSIDE_VENDOR_VALUE ? null : value || null;
}

function isVendorAssigned(workOrder) {
  return String(workOrder.description || "").includes(OUTSIDE_VENDOR_NOTE);
}

function requiresSafetyDeviceCheck(workOrderOrPayload) {
  if (!workOrderOrPayload) return false;
  if (Object.prototype.hasOwnProperty.call(workOrderOrPayload, "safety_check_required")) {
    return Boolean(workOrderOrPayload.safety_check_required);
  }
  if (workOrderOrPayload.asset_id) return assetRequiresSafety(workOrderOrPayload.asset_id);
  if (Object.prototype.hasOwnProperty.call(workOrderOrPayload.assets || {}, "safety_devices_required")) {
    return workOrderOrPayload.assets.safety_devices_required !== false;
  }
  return Boolean(workOrderOrPayload.assets?.name);
}

function hasCompletedSafetyDeviceCheck(workOrderOrPayload) {
  return workOrderOrPayload?.status === "completed" && Boolean(workOrderOrPayload?.safety_devices_checked);
}

function currentSafetyCheckboxCheckedForWorkOrder(id) {
  if (activeWorkOrderId !== id) return false;
  return Array.from(document.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some((field) => field.checked);
}

function applySafetyCheckPayload(payload, checked) {
  payload.safety_devices_checked = Boolean(checked);
  payload.safety_devices_checked_at = checked ? new Date().toISOString() : null;
  return payload;
}

function assetRequiresSafety(assetId) {
  if (!assetId) return false;
  const asset = assets.find((item) => item.id === assetId);
  return asset ? asset.safety_devices_required !== false : true;
}

function applySafetyRequirementPayload(payload) {
  payload.safety_check_required = assetRequiresSafety(payload.asset_id);
  return payload;
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Clipboard API failed; using fallback.", error);
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    console.warn("Clipboard fallback failed.", error);
  }
  field.remove();
  return copied;
}

async function recordWorkOrderEvent(workOrderId, eventType, summary) {
  try {
    await withOperationTimeout(
      supabaseClient.from("work_order_events").insert({
        company_id: activeCompanyId,
        work_order_id: workOrderId,
        actor_id: session.user.id,
        event_type: eventType,
        summary,
      }),
      "Activity log timed out.",
      8000
    );
  } catch (error) {
    console.warn("Could not record work order event", error);
  }
}

function exportActiveSectionCsv() {
  const exports = {
    work: {
      filename: "work-orders.csv",
      rows: workOrders.map((workOrder) => ({
        title: workOrder.title,
        status: workOrder.status,
        priority: workOrder.priority,
        type: workOrder.type || "reactive",
        equipment: workOrder.assets?.name || "",
        assigned_to: assignmentLabel(workOrder),
        due_at: workOrder.due_at || "",
        completed_at: workOrder.completed_at || "",
        actual_minutes: workOrder.actual_minutes || 0,
        failure_cause: workOrder.failure_cause || "",
        resolution_summary: workOrder.resolution_summary || "",
        follow_up_needed: Boolean(workOrder.follow_up_needed),
      })),
    },
    assets: {
      filename: "equipment.csv",
      rows: assets.map((asset) => ({
        name: asset.name,
        equipment_id: asset.asset_code || "",
        location: asset.location || "",
        status: asset.status,
      })),
    },
    requests: {
      filename: "maintenance-requests.csv",
      rows: maintenanceRequests.map((request) => ({
        title: request.title,
        status: request.status,
        priority: request.priority,
        equipment: request.assets?.name || "",
        requested_by: profilesByUserId[request.requested_by]?.full_name || "",
        created_at: request.created_at || "",
        converted_work_order_id: request.converted_work_order_id || "",
      })),
    },
    pm: {
      filename: "preventive-schedules.csv",
      rows: preventiveSchedules.map((schedule) => ({
        title: schedule.title,
        equipment: schedule.assets?.name || "",
        frequency: schedule.frequency,
        next_due_at: schedule.next_due_at,
        active: schedule.active,
      })),
    },
    parts: {
      filename: "parts.csv",
      rows: parts.map((part) => ({
        name: part.name,
        sku: part.sku || "",
        supplier_name: part.supplier_name || "",
        quantity_on_hand: part.quantity_on_hand,
        reorder_point: part.reorder_point,
        unit_cost: part.unit_cost || 0,
      })),
    },
    procedures: {
      filename: "procedures.csv",
      rows: procedureTemplates.map((template) => ({
        name: template.name,
        description: template.description || "",
        steps: template.procedure_steps?.length || 0,
      })),
    },
    team: {
      filename: "team.csv",
      rows: companyMembers.map((member) => ({
        user_id: member.user_id,
        name: profilesByUserId[member.user_id]?.full_name || "",
        role: member.role,
      })),
    },
  };

  const selected = exports[activeSection] || exports.work;
  if (!selected.rows.length) return alert("Nothing to export in this section yet.");
  downloadCsv(selected.filename, selected.rows);
}

function downloadCsv(filename, rows) {
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

init();
