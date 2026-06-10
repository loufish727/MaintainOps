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
const { shouldRenderForAuthEvent } = window.MaintainOpsAuthRenderPolicy;
const { createMessageWorkflow } = window.MaintainOpsMessageWorkflow;
const { createPreventiveMaintenanceWorkflow } = window.MaintainOpsPreventiveMaintenanceWorkflow;
const { createProcedureWorkflow } = window.MaintainOpsProcedureWorkflow;
const { createTeamWorkflow } = window.MaintainOpsTeamWorkflow;
const { createCompanySettingsWorkflow } = window.MaintainOpsCompanySettingsWorkflow;
const { createAppIssueWorkflow } = window.MaintainOpsAppIssueWorkflow;
const { createPublicRequestLinkWorkflow } = window.MaintainOpsPublicRequestLinkWorkflow;
const { createPartInventoryWorkflow } = window.MaintainOpsPartInventoryWorkflow;
const { createWorkOrderQuickUpdateWorkflow } = window.MaintainOpsWorkOrderQuickUpdateWorkflow;
const { createAssetWorkflow } = window.MaintainOpsAssetWorkflow;
const { createRequestLifecycleWorkflow } = window.MaintainOpsRequestLifecycleWorkflow;
const { createWorkOrderCreationWorkflow } = window.MaintainOpsWorkOrderCreationWorkflow;
const { createWorkOrderDetailEditWorkflow } = window.MaintainOpsWorkOrderDetailEditWorkflow;
const { createPartUsageWorkflow } = window.MaintainOpsPartUsageWorkflow;
const { createMediaStorageWorkflow } = window.MaintainOpsMediaStorageWorkflow;
const { createCompanyLogoWorkflow } = window.MaintainOpsCompanyLogoWorkflow;
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
const { bindWorkspaceManagerDashboardEvents } = window.MaintainOpsWorkspaceManagerDashboardEvents;
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
const { bindWorkspaceDatePickerControls } = window.MaintainOpsWorkspaceDatePickerControls;
const { bindWorkspaceTeamInviteCancelEvents } = window.MaintainOpsWorkspaceTeamInviteCancelEvents;
const { bindWorkspaceTeamInviteCopyEvents } = window.MaintainOpsWorkspaceTeamInviteCopyEvents;
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
const { createCsvExportHelpers } = window.MaintainOpsCsvExport;
const { createRequestQueryFilterHelpers } = window.MaintainOpsRequestQueryFilters;
const { createWorkOrderSearchHelpers } = window.MaintainOpsWorkOrderSearch;
const { createWorkspaceListBuilders } = window.MaintainOpsWorkspaceListBuilders;
const { listLocations, createLocation: createLocationRecord } = window.MaintainOpsLocationsService;
const {
  listProfiles,
  listCompanyMembers,
  listTeamInvites,
  listTeamInvitesLegacy,
  listRequestNotificationRecipients,
} = window.MaintainOpsProfilesService;
const { listParts } = window.MaintainOpsPartsService;
const { listAssets } = window.MaintainOpsAssetsService;
const {
  selectWorkOrders,
  countWorkOrdersQuery,
  fetchWorkOrderById,
  fetchWorkOrdersByAsset,
  fetchWorkOrdersByIds,
  scopedWorkOrderSearchQuery: buildScopedWorkOrderSearchQuery,
  fetchPagedSearchRows,
} = window.MaintainOpsWorkOrdersService;
const { fetchRecentCompletedWorkOrders } = window.MaintainOpsManagerDashboardService;
const {
  getMyCompanies,
  listUserCompanyMemberships,
  listUserCompanyMembershipsLegacy,
  listCompaniesByIds,
  listCompaniesByIdsLegacy,
} = window.MaintainOpsCompanyService;
const { notifyRequestEmailer } = window.MaintainOpsRequestEmailNotificationService;
const {
  listAppIssueReports,
  createAppIssueReportRecord,
  updateAppIssueReportStatusRecord,
  deleteAppIssueReportRecord,
} = window.MaintainOpsAppIssueReportsService;
const {
  getUserPreferences,
  saveShopReferenceFavorites,
} = window.MaintainOpsUserPreferencesService;
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
const { createNavBadgeDisplayHelpers } = window.MaintainOpsNavBadgeDisplay;
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
const { createManagerDashboardDisplayHelpers } = window.MaintainOpsManagerDashboardDisplay;
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
const { createEquipmentStructureGuideDisplayHelpers } = window.MaintainOpsEquipmentStructureGuideDisplay;
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
const { renderEquipmentStructureGuide } = createEquipmentStructureGuideDisplayHelpers();
let supabaseClient;
let session;
const CONVERSION_RESOURCE_PATHS = [
  "src/utils/conversions.js?v=conversion-lazy-load-1",
  "src/data/reference/fasteners.js?v=conversion-lazy-load-1",
  "src/data/reference/electricalControls.js?v=conversion-lazy-load-1",
  "src/data/reference/dieselMobile.js?v=conversion-lazy-load-1",
  "src/data/reference/machiningCnc.js?v=conversion-lazy-load-1",
  "src/data/reference/fabrication.js?v=conversion-lazy-load-1",
  "src/data/reference/motorsDrives.js?v=conversion-lazy-load-1",
  "src/data/reference/fluidPower.js?v=conversion-lazy-load-1",
  "src/data/reference/pneumatics.js?v=conversion-lazy-load-1",
  "src/data/reference/bearingsBeltsChain.js?v=conversion-lazy-load-1",
  "src/data/reference/pmTroubleshooting.js?v=conversion-lazy-load-1",
  "src/data/reference/pipeHoseFittings.js?v=conversion-lazy-load-1",
  "src/data/reference/materialsShop.js?v=conversion-lazy-load-1",
  "src/data/shopReferenceCharts.js?v=conversion-lazy-load-1",
  "src/render/conversionDisplay.js?v=conversion-lazy-load-1",
];
let conversionResourcesPromise = null;
let conversionResourcesError = "";
let conversionDisplayHelpers = null;
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
let managerCompletedWorkOrders = [];
let managerCompletedWorkReady = true;
const assetRelationshipOpenKeys = new Set();
const assetRelationshipPages = {};
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
let requestNotificationRecipients = [];
let requestNotificationRecipientsReady = true;
let requestNotificationRecipientError = "";
let workspaceLoadWarnings = [];
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
function currentPartSort() {
  return workspaceUiState.getPartSort ? workspaceUiState.getPartSort() : "default";
}
let parts = [];
let partCostsReady = true;
let partSuppliersReady = true;
let partMachineNotesReady = true;
let partDocumentsReady = true;
let partDocumentsByPartId = {};
let assetParts = [];
let assetPartsReady = true;
let assetDocumentsReady = true;
let assetDocumentsByAssetId = {};
let assetDocumentSigningByAssetId = {};
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
  renderRequestNotificationRecipients,
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
  getRequestNotificationRecipients: () => requestNotificationRecipients,
  getRequestNotificationRecipientsReady: () => requestNotificationRecipientsReady,
  getRequestNotificationRecipientError: () => requestNotificationRecipientError,
  getSession: () => session,
  getLocations: () => locations,
  matchesSearch,
  escapeHtml,
  roleDescription,
  roleLabel,
  normalizeRole,
  teamMemberWorkload: (...args) => teamMemberWorkload(...args),
  canManageTeam,
  canAdministerTeamRoles,
  teamRoleOptionsForActor,
  COMPANY_ROLES,
  renderLocationOptions: (...args) => renderLocationOptions(...args),
  inviteDefaultLocationLabel: (...args) => inviteDefaultLocationLabel(...args),
  teamInviteSignupUrl,
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
  getPartSort: currentPartSort,
  getPartSearchQuery: () => workspaceUiState.getPartSearchQuery(),
  matchesActiveLocation,
});
const {
  partUsageRows,
} = createPartUsageDisplayHelpers({
  getPartsUsedByWorkOrder: () => partsUsedByWorkOrder,
});
function assetPartRows(partId) {
  return assetParts.filter((row) => row.part_id === partId);
}
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
  getAssetTypeFilter: () => workspaceUiState.getAssetTypeFilter(),
  getAssetAreaFilter: () => workspaceUiState.getAssetAreaFilter(),
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
const {
  renderManagerDashboard,
} = createManagerDashboardDisplayHelpers({
  getWorkOrders: () => workOrders,
  getManagerCompletedWorkOrders: () => managerCompletedWorkOrders,
  getManagerCompletedWorkReady: () => managerCompletedWorkReady,
  getMaintenanceRequests: () => maintenanceRequests,
  getCompanyMembers: () => companyMembers,
  getWorkOrderDashboardCounts: () => workOrderDashboardCounts,
  getRequestDashboardCounts: () => requestDashboardCounts,
  matchesActiveLocation,
  isConvertedRequest,
  getDueState,
  getManagerDashboardMetric: () => workspaceUiState.getManagerDashboardMetric(),
  getManagerDashboardUserId: () => workspaceUiState.getManagerDashboardUserId(),
  teamMemberName,
  roleLabel,
  normalizeRole,
  statusLabel,
  escapeHtml,
});
const emptyStateTextHelpers = createEmptyStateTextHelpers({
  getSearchQuery: () => workspaceUiState.getSearchQuery(),
  getAssetStatusFilter: () => workspaceUiState.getAssetStatusFilter(),
  getAssetTypeFilter: () => workspaceUiState.getAssetTypeFilter(),
  getPartSearchQuery: () => workspaceUiState.getPartSearchQuery(),
  getPartInventoryFilter: () => workspaceUiState.getPartInventoryFilter(),
  assetTypeLabel,
  assetStatusLabel,
});
const {
  requestEmptyStateText,
  assetEmptyStateText,
  partEmptyStateText,
} = emptyStateTextHelpers;
const {
  downloadCsv,
  exportActiveSectionCsv,
} = createCsvExportHelpers({
  documentRef: document,
  URLRef: URL,
  BlobCtor: Blob,
  alertRef: alert,
  getActiveSection: () => activeSection,
  getWorkOrders: () => workOrders,
  getAssets: () => assets,
  getMaintenanceRequests: () => maintenanceRequests,
  getPreventiveSchedules: () => preventiveSchedules,
  getParts: () => parts,
  getProcedureTemplates: () => procedureTemplates,
  getCompanyMembers: () => companyMembers,
  getProfilesByUserId: () => profilesByUserId,
  assignmentLabel,
  csvCell,
});
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
  teamMemberName,
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
  renderAssetAreaOptions,
  assetOptionLabel,
} = createOptionDisplayHelpers({
  escapeHtml,
  getLocations: () => locations,
  getActiveLocationId: () => activeLocationId,
  getAssets: () => assets,
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
function partMachineOptions() {
  return [...new Set(assets
    .filter(matchesActiveLocation)
    .map((asset) => String(asset.name || "").trim())
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
}
function renderPartMachineOptions() {
  return `
    <datalist id="part-machine-options">
      ${partMachineOptions().map((name) => `<option value="${escapeHtml(name)}"></option>`).join("")}
    </datalist>
  `;
}
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
  renderPartMachineOptions,
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
  getPartMachineNotesReady: () => partMachineNotesReady,
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
  renderNavCountBadge,
} = createNavBadgeDisplayHelpers();
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

  supabaseClient.auth.onAuthStateChange((eventName, nextSession) => {
    const previousSession = session;
    session = nextSession;
    if (!shouldRenderForAuthEvent(eventName, previousSession, nextSession)) return;
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
    if (activeSection === "manager" && canAdministerTeamRoles()) {
      await loadManagerDashboardCompletedWork();
    }
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

function loadScriptResource(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-lazy-src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.dataset.lazySrc = src;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.body.appendChild(script);
  });
}

async function ensureConversionResourcesLoaded() {
  if (conversionDisplayHelpers) return conversionDisplayHelpers;
  if (!conversionResourcesPromise) {
    conversionResourcesError = "";
    conversionResourcesPromise = (async () => {
      for (const src of CONVERSION_RESOURCE_PATHS) {
        await loadScriptResource(src);
      }
      const conversions = window.MaintainOpsConversions;
      const display = window.MaintainOpsConversionDisplay;
      if (!conversions || !display) throw new Error("Conversion tools did not initialize.");
      conversionDisplayHelpers = display.createConversionDisplayHelpers({
        escapeHtml,
        conversionGroups: conversions.UNIT_GROUPS,
        boltReference: conversions.BOLT_REFERENCE,
        wrenchReference: conversions.WRENCH_REFERENCE,
        conversionResultText: conversions.conversionResultText,
      });
      return conversionDisplayHelpers;
    })().catch((error) => {
      conversionResourcesError = error.message || "Could not load conversion tools.";
      conversionResourcesPromise = null;
      throw error;
    });
  }
  return conversionResourcesPromise;
}

function renderConversionsLazyPanel() {
  if (conversionDisplayHelpers) return conversionDisplayHelpers.renderConversionsPanel();
  const status = conversionResourcesError || "Loading shop converters and reference charts...";
  const toneClass = conversionResourcesError ? "status-blocked" : "status-in_progress";
  return `
    <section class="setup-card conversion-loading-card ${toneClass}">
      <h3>Conversions</h3>
      <p>${escapeHtml(status)}</p>
      ${conversionResourcesError ? `<button class="secondary-button" data-retry-conversions type="button">Retry</button>` : ""}
    </section>
  `;
}

function scheduleConversionResourceLoad() {
  if (activeSection !== "conversions" || conversionDisplayHelpers || conversionResourcesPromise) return;
  ensureConversionResourcesLoaded()
    .then(() => {
      if (activeSection === "conversions") renderWorkspace();
    })
    .catch(() => {
      if (activeSection === "conversions") renderWorkspace();
    });
}

function createShopReferenceFavoriteStore() {
  return {
    async load() {
      if (!supabaseClient || !session?.user?.id) return null;
      const { data, error } = await getUserPreferences(supabaseClient, session.user.id);
      if (error) throw error;
      return Array.isArray(data?.shop_reference_favorites) ? data.shop_reference_favorites : [];
    },
    async save(favorites) {
      if (!supabaseClient || !session?.user?.id) return null;
      const { error } = await saveShopReferenceFavorites(supabaseClient, session.user.id, favorites);
      if (error) throw error;
      return true;
    },
  };
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
        equipment_note: requiredText(form.get("equipment_note"), "Machine / area"),
        request_description: requiredText(form.get("description"), "Request details"),
        requester_name: requiredText(form.get("requester_name"), "Your name"),
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
    const emailResult = await notifyRequestEmailer(supabaseClient, requestId);
    if (emailResult.error) console.warn("Request email notification did not send", emailResult.error);

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

function mergeWorkOrdersById(rows = []) {
  if (!rows.length) return;
  const incoming = new Map(rows.map((row) => [row.id, row]));
  const existingIds = new Set(workOrders.map((row) => row.id));
  workOrders = workOrders.map((row) => incoming.get(row.id) || row);
  rows.forEach((row) => {
    if (!existingIds.has(row.id)) workOrders.push(row);
  });
}

function assetRelationshipKey(assetId, section) {
  return `${assetId}:${section}`;
}

function getAssetRelationshipOpen(assetId, section) {
  return assetRelationshipOpenKeys.has(assetRelationshipKey(assetId, section));
}

function setAssetRelationshipOpen(assetId, section, isOpen) {
  const key = assetRelationshipKey(assetId, section);
  if (isOpen) assetRelationshipOpenKeys.add(key);
  else assetRelationshipOpenKeys.delete(key);
}

function getAssetRelationshipPage(assetId, section) {
  return assetRelationshipPages[assetRelationshipKey(assetId, section)] || 1;
}

function setAssetRelationshipPage(assetId, section, page) {
  assetRelationshipPages[assetRelationshipKey(assetId, section)] = Math.max(1, Number(page) || 1);
}

async function loadAssetWorkOrderHistory(assetId) {
  if (!assetId || !activeCompanyId) return;
  const response = await withOperationTimeout(
    fetchWorkOrdersByAsset(supabaseClient, activeCompanyId, assetId, WORK_ORDER_RELATION_SELECT),
    "Equipment work history timed out.",
    12000
  );
  if (response.error) {
    showNotice(`Could not load equipment work history: ${response.error.message}`, "warning");
    return;
  }
  const rows = response.data || [];
  mergeWorkOrdersById(rows);
  const ids = rows.map((row) => row.id);
  await Promise.all([
    loadCommentsForWorkOrderIds(ids),
    loadPhotosForWorkOrderIds(ids),
    loadPartsUsedForWorkOrderIds(ids),
    loadStepResultsForWorkOrderIds(ids),
    loadWorkOrderEventsForWorkOrderIds(ids),
  ]);
}

async function loadManagerDashboardCompletedWork() {
  if (!activeCompanyId) return;
  managerCompletedWorkReady = false;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const params = {
    companyId: activeCompanyId,
    locationId: activeLocationId,
    locationsReady,
    selectClause: WORK_ORDER_RELATION_SELECT,
    cutoffIso: cutoff.toISOString(),
  };
  const response = await withOperationTimeout(
    fetchRecentCompletedWorkOrders(supabaseClient, params),
    "Manager completed work load timed out.",
    12000
  );
  if (response.error && isColumnSchemaError(response.error, ["location_id", "locations"])) {
    const fallbackResponse = await withOperationTimeout(
      fetchRecentCompletedWorkOrders(supabaseClient, { ...params, selectClause: WORK_ORDER_FALLBACK_SELECT, locationsReady: false }),
      "Manager completed work fallback load timed out.",
      12000
    );
    managerCompletedWorkReady = !fallbackResponse.error;
    managerCompletedWorkOrders = fallbackResponse.data || [];
    if (fallbackResponse.error) showNotice(`Could not load manager completed work: ${fallbackResponse.error.message}`, "warning");
    return;
  }
  managerCompletedWorkReady = !response.error;
  managerCompletedWorkOrders = response.data || [];
  if (response.error) showNotice(`Could not load manager completed work: ${response.error.message}`, "warning");
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
  workspaceLoadWarnings = [];
  let [locationResponse, assetResponse, scheduleResponse, partsResponse, procedureResponse, issueReportResponse] = await Promise.all([
    loadWorkspaceResponse("Locations", listLocations(supabaseClient, activeCompanyId)),
    loadWorkspaceResponse("Equipment", listAssets(supabaseClient, activeCompanyId)),
    loadWorkspaceResponse("PM schedules", supabaseClient
      .from("preventive_schedules")
      .select("*, assets(name, location_id)")
      .eq("company_id", activeCompanyId)
      .order("next_due_at", { ascending: true })),
    loadWorkspaceResponse("Parts", listParts(supabaseClient, activeCompanyId)),
    loadWorkspaceResponse("Procedure checklists", supabaseClient
      .from("procedure_templates")
      .select("*, procedure_steps(*)")
      .eq("company_id", activeCompanyId)
      .order("name")),
    loadWorkspaceResponse("App issue reports", listAppIssueReports(supabaseClient, activeCompanyId)),
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
  const workOrderResponse = await loadWorkspaceResponse("Work orders", loadServerWorkOrderSlice(), 16000);
  const requestResponse = await loadWorkspaceResponse("Requests", loadServerRequestSlice(), 14000);
  if (activeWorkOrderId && !workOrders.some((workOrder) => workOrder.id === activeWorkOrderId)) {
    const activeResponse = await loadWorkspaceResponse("Selected work order", fetchWorkOrderById(supabaseClient, activeCompanyId, activeWorkOrderId, WORK_ORDER_RELATION_SELECT));
    if (!activeResponse.error && activeResponse.data) {
      workOrders = [activeResponse.data, ...workOrders];
    }
  }
  requestsReady = !requestResponse.error;
  partCostsReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "unit_cost");
  partSuppliersReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "supplier_name");
  partMachineNotesReady = !parts.length || Object.prototype.hasOwnProperty.call(parts[0], "machine_note");
  schedulesReady = !scheduleResponse.error;
  outcomesReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "resolution_summary");
  safetyChecksReady = !workOrders.length || Object.prototype.hasOwnProperty.call(workOrders[0], "safety_devices_checked");
  proceduresReady = !procedureResponse.error;
  await Promise.all([
    runWorkspaceLoader("Profiles", loadProfiles),
    runWorkspaceLoader("Team members", loadMembers),
    runWorkspaceLoader("Messages", loadMessageCenter),
    runWorkspaceLoader("Public request links", loadPublicRequestLinks),
    runWorkspaceLoader("Request photos", addSignedRequestPhotoUrls),
    runWorkspaceLoader("Comments", loadComments),
    runWorkspaceLoader("Work photos", loadPhotos),
    runWorkspaceLoader("Parts used", loadPartsUsed),
    runWorkspaceLoader("Equipment parts", loadAssetParts),
    runWorkspaceLoader("Equipment files", loadAssetDocuments),
    runWorkspaceLoader("Part files", loadPartDocuments),
    runWorkspaceLoader("Checklist results", loadStepResults),
    runWorkspaceLoader("Work history", loadWorkOrderEvents),
  ]);
  applyWorkspaceLoadWarnings();
}

async function loadWorkspaceResponse(label, promise, timeoutMs = 12000) {
  const response = await withOperationTimeout(
    promise,
    `${label} timed out.`,
    timeoutMs
  ).catch((error) => ({ error, data: [] }));
  if (response.error) workspaceLoadWarnings.push(`${label}: ${response.error.message || response.error}`);
  return response;
}

async function runWorkspaceLoader(label, loader, timeoutMs = 12000) {
  const error = await withOperationTimeout(
    loader(),
    `${label} timed out.`,
    timeoutMs
  ).then(() => null).catch((failure) => failure);
  if (error) workspaceLoadWarnings.push(`${label}: ${error.message || error}`);
}

function applyWorkspaceLoadWarnings() {
  if (!workspaceLoadWarnings.length) return;
  const visibleWarnings = workspaceLoadWarnings.slice(0, 2).join("; ");
  const extraCount = workspaceLoadWarnings.length > 2 ? ` (+${workspaceLoadWarnings.length - 2} more)` : "";
  appNotice = `Some workspace data loaded slowly: ${visibleWarnings}${extraCount}`;
  appNoticeTone = "warning";
}

async function reloadWorkOrderQueue() {
  try {
    const response = await loadServerWorkOrderSlice();
    if (response.error) {
      showNotice(`Could not load work orders: ${response.error.message}`, "warning");
      return;
    }
    await Promise.all([loadComments(), loadPhotos(), loadPartsUsed(), loadAssetParts(), loadAssetDocuments(), loadStepResults(), loadWorkOrderEvents()]);
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
  await Promise.all([loadTeamInvites(), loadRequestNotificationRecipients()]);
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

async function loadRequestNotificationRecipients() {
  if (!requestNotificationRecipientsReady) {
    requestNotificationRecipients = [];
    return;
  }
  const { data, error } = await listRequestNotificationRecipients(supabaseClient, activeCompanyId);

  if (error) {
    if (isColumnSchemaError(error, ["request_notification_recipients"]) || error.message.includes("request_notification_recipients")) {
      requestNotificationRecipientsReady = false;
    }
    requestNotificationRecipients = [];
    return;
  }

  requestNotificationRecipients = data || [];
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
  const visibleThreadIds = new Set(messageThreadMembers
    .filter((member) => member.user_id === session.user.id && !member.deleted_at)
    .map((member) => member.thread_id));
  messageThreads = messageThreads.filter((thread) => visibleThreadIds.has(thread.id));
  if (!messageThreads.length) {
    setActiveMessageThreadIdState("");
    return;
  }
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

function replaceArrayGroupsForIds(currentGroups, ids, rows) {
  const idSet = new Set(ids);
  const nextGroups = { ...currentGroups };
  idSet.forEach((id) => { delete nextGroups[id]; });
  (rows || []).forEach((row) => {
    nextGroups[row.work_order_id] ||= [];
    nextGroups[row.work_order_id].push(row);
  });
  return nextGroups;
}

function replaceStepResultGroupsForIds(currentGroups, ids, rows) {
  const idSet = new Set(ids);
  const nextGroups = { ...currentGroups };
  idSet.forEach((id) => { delete nextGroups[id]; });
  (rows || []).forEach((result) => {
    nextGroups[result.work_order_id] ||= {};
    nextGroups[result.work_order_id][result.procedure_step_id] = result;
  });
  return nextGroups;
}

async function loadCommentsForWorkOrderIds(ids = []) {
  commentsError = "";
  if (!ids.length) return;

  const { data, error } = await supabaseClient
    .from("work_order_comments")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: true });

  if (error) {
    commentsError = `Could not load comments: ${error.message}`;
    return;
  }

  commentsByWorkOrder = replaceArrayGroupsForIds(commentsByWorkOrder, ids, data || []);
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

async function loadPhotosForWorkOrderIds(ids = []) {
  if (!ids.length) return;

  const { data, error } = await supabaseClient
    .from("work_order_photos")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    photosReady = false;
    return;
  }
  photosReady = true;

  const rows = data || [];
  photosByWorkOrder = replaceArrayGroupsForIds(photosByWorkOrder, ids, rows);
  await addSignedPhotoUrlsForRows(rows);
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

async function loadPartsUsedForWorkOrderIds(ids = []) {
  if (!ids.length) return;

  const { data } = await supabaseClient
    .from("work_order_parts")
    .select("*, parts(*)")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: true });

  partsUsedByWorkOrder = replaceArrayGroupsForIds(partsUsedByWorkOrder, ids, data || []);
}

async function loadAssetParts() {
  if (!activeCompanyId || !assets.length) {
    assetParts = [];
    assetPartsReady = true;
    return;
  }

  const ids = assets.map((asset) => asset.id);
  const { data, error } = await supabaseClient
    .from("asset_parts")
    .select("*, parts(*)")
    .eq("company_id", activeCompanyId)
    .in("asset_id", ids)
    .order("created_at", { ascending: true });

  if (error) {
    assetParts = [];
    assetPartsReady = false;
    return;
  }

  assetParts = data || [];
  assetPartsReady = true;
}

async function loadAssetDocuments() {
  if (!activeCompanyId || !assets.length) {
    assetDocumentsByAssetId = {};
    assetDocumentsReady = true;
    return;
  }

  const ids = assets.map((asset) => asset.id);
  const { data, error } = await supabaseClient
    .from("asset_documents")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("asset_id", ids)
    .order("created_at", { ascending: false });

  if (error) {
    assetDocumentsReady = false;
    assetDocumentsByAssetId = {};
    return;
  }

  assetDocumentsReady = true;
  assetDocumentsByAssetId = (data || []).reduce((groups, document) => {
    groups[document.asset_id] ||= [];
    groups[document.asset_id].push(document);
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

async function loadWorkOrderEventsForWorkOrderIds(ids = []) {
  if (!ids.length) return;

  const { data } = await supabaseClient
    .from("work_order_events")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids)
    .order("created_at", { ascending: false });

  if (!data) return;

  eventsByWorkOrder = replaceArrayGroupsForIds(eventsByWorkOrder, ids, data || []);
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

async function loadStepResultsForWorkOrderIds(ids = []) {
  if (!ids.length) return;

  const { data } = await supabaseClient
    .from("work_order_step_results")
    .select("*")
    .eq("company_id", activeCompanyId)
    .in("work_order_id", ids);

  stepResultsByWorkOrder = replaceStepResultGroupsForIds(stepResultsByWorkOrder, ids, data || []);
}

async function addSignedPhotoUrls() {
  const photos = Object.values(photosByWorkOrder).flat();
  await addSignedPhotoUrlsForRows(photos);
}

async function addSignedPhotoUrlsForRows(photos = []) {
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

async function addSignedAssetDocumentUrls() {
  const documents = Object.values(assetDocumentsByAssetId).flat();
  await Promise.all(documents.map(async (document) => {
    const { data } = await supabaseClient.storage
      .from("asset-documents")
      .createSignedUrl(document.storage_path, 60 * 10);
    document.signedUrl = data?.signedUrl || "";
  }));
}

function ensureAssetDocumentSignedUrls(assetId) {
  if (!assetId || !assetDocumentsReady) return;
  const documents = assetDocumentsByAssetId[assetId] || [];
  const pending = documents.filter((document) => document.storage_path && !document.signedUrl);
  if (!pending.length || assetDocumentSigningByAssetId[assetId]) return;

  assetDocumentSigningByAssetId[assetId] = true;
  withOperationTimeout(
    Promise.all(pending.map(async (document) => {
      const { data } = await supabaseClient.storage
        .from("asset-documents")
        .createSignedUrl(document.storage_path, 60 * 10);
      document.signedUrl = data?.signedUrl || "";
    })),
    "Equipment file link load timed out.",
    10000
  )
    .catch((error) => {
      console.warn("Could not load equipment file links", error);
    })
    .finally(() => {
      delete assetDocumentSigningByAssetId[assetId];
      if (activeAssetId === assetId) renderWorkspace();
    });
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
  const renderSectionNavBadge = (id) => {
    if (id === "messages") return renderMessageNavBadge();
    if (id === "mywork") return renderNavCountBadge(myWorkDashboardCounts?.activeWork || 0);
    if (id === "work") return renderNavCountBadge(workOrderDashboardCounts?.newWork || 0);
    if (id === "requests") return renderNavCountBadge(requestCounts.active || 0, { alert: true });
    return "";
  };
  const totalWorkOrderPages = Math.max(1, Math.ceil(visibleWorkOrderCount / WORK_ORDERS_PER_PAGE));
  if (workspaceUiState.getWorkOrderPage() > totalWorkOrderPages) workspaceUiState.setWorkOrderPage(totalWorkOrderPages);
  if (workspaceUiState.getWorkOrderPage() < 1) workspaceUiState.setWorkOrderPage(1);
  const pagedWorkOrders = visibleWorkOrders;
  const myWork = workOrders.filter((workOrder) => workOrder.assigned_to === session.user.id);
  const myOpenWork = myWork.filter((workOrder) => workOrder.status !== "completed");
  const createdByMe = workOrders.filter((workOrder) => workOrder.created_by === session.user.id && workOrder.status !== "completed");
  const locationAssets = assets.filter(matchesActiveLocation);
  const assetAreaOptions = [...new Set(locationAssets.map((asset) => String(asset.location || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  if (workspaceUiState.getAssetAreaFilter() !== "all" && !assetAreaOptions.includes(workspaceUiState.getAssetAreaFilter())) {
    workspaceUiState.setAssetAreaFilter("all");
  }
  const activeAssetAreaFilter = workspaceUiState.getAssetAreaFilter();
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
  const assetTypeCounts = ASSET_TYPE_OPTIONS.reduce((counts, type) => {
    counts[type] = locationAssets.filter((asset) => (asset.asset_type || "machine") === type).length;
    return counts;
  }, {});
  const runningAssetCount = locationAssets.filter((asset) => asset.status === "running").length;
  const degradedAssetCount = locationAssets.filter((asset) => asset.status === "degraded").length;
  const downAssetCount = locationAssets.filter((asset) => asset.status === "offline").length;
  const activeAssetStatusFilter = workspaceUiState.getAssetStatusFilter();
  const activeAssetTypeFilter = workspaceUiState.getAssetTypeFilter();
  const renderAssetAreaFilter = () => `
    <div class="asset-area-filter relationship-detail asset" aria-label="Equipment area filter">
      <label>Area / spot
        <select data-asset-area-filter>
          <option value="all" ${activeAssetAreaFilter === "all" ? "selected" : ""}>Display all areas</option>
          ${assetAreaOptions.map((area) => `<option value="${escapeHtml(area)}" ${activeAssetAreaFilter === area ? "selected" : ""}>${escapeHtml(area)}</option>`).join("")}
        </select>
      </label>
      <span>${activeAssetAreaFilter === "all" ? "Showing all equipment areas." : `Showing ${escapeHtml(activeAssetAreaFilter)}.`}</span>
    </div>
  `;
  const assetTypeSummaryCards = [
    {
      label: "Running",
      count: runningAssetCount,
      tone: "status-completed",
      statusFilter: "running",
      detail: "Equipment currently marked running.",
      empty: "No equipment marked running.",
    },
    {
      label: "Degraded",
      count: degradedAssetCount,
      tone: "status-open",
      statusFilter: "degraded",
      detail: "Known issue, still usable.",
      empty: "No degraded equipment.",
    },
    {
      label: "Offline / Down",
      count: downAssetCount,
      tone: "status-blocked",
      statusFilter: "offline",
      detail: "Equipment currently marked offline/down.",
      empty: "No equipment marked offline/down.",
    },
    {
      type: "machine",
      label: "Primary",
      count: assetTypeCounts.machine || 0,
      tone: "command-owner",
      typeFilter: "machine",
      detail: "Main machines, lines, and standalone equipment.",
      empty: "No primary equipment yet.",
    },
    {
      type: "secondary_machine",
      label: "Sub Equipment",
      count: assetTypeCounts.secondary_machine || 0,
      tone: "command-equipment",
      typeFilter: "secondary_machine",
      detail: "Major sections under a main machine or line.",
      empty: "No sub equipment yet.",
    },
    {
      type: "tooling",
      label: "Tooling / Setup",
      count: assetTypeCounts.tooling || 0,
      tone: "command-equipment",
      typeFilter: "tooling",
      detail: "Roll tooling, die sets, profiles, and setup records.",
      empty: "No tooling/setup records yet.",
    },
    {
      type: "component",
      label: "Components",
      count: assetTypeCounts.component || 0,
      tone: "command-equipment",
      typeFilter: "component",
      detail: "Tracked equipment components; inventory parts stay in detail.",
      empty: "No component records yet.",
    },
    {
      type: "shop_item",
      label: "Shop Items",
      count: assetTypeCounts.shop_item || 0,
      tone: "command-equipment",
      typeFilter: "shop_item",
      detail: "Support equipment or shop assets worth tracking.",
      empty: "No shop item records yet.",
    },
  ];
  const renderAssetMasterSummary = () => `
    <section class="work-command-summary asset-command-summary asset-master-summary" aria-label="Equipment master summary">
      ${assetTypeSummaryCards.map((card) => {
        const count = card.count || 0;
        const active = (card.statusFilter && activeAssetStatusFilter === card.statusFilter) || (card.typeFilter && activeAssetTypeFilter === card.typeFilter);
        const filterAttribute = card.statusFilter
          ? `data-asset-status-filter="${escapeHtml(card.statusFilter)}"`
          : `data-asset-type-filter="${escapeHtml(card.typeFilter)}"`;
        return `
          <button class="command-card ${card.tone} ${count ? "" : "empty"} ${active ? "active" : ""}" ${filterAttribute} aria-pressed="${active}" type="button">
            <span>${escapeHtml(card.label)}</span>
            <strong>${count}</strong>
            <small>${escapeHtml(count ? card.detail : card.empty)}</small>
          </button>
        `;
      }).join("")}
    </section>
  `;
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
                <button class="secondary-button export-action-button" id="export-csv${suffix}" data-command-action="export-csv" type="button">Export CSV</button>
              </div>
            </details>
          </div>
        </header>

        <div id="app-notice-slot">${renderAppNoticeMarkup()}</div>

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
          ${navItems.map(([id, label]) => `<button class="nav-${id} ${activeSection === id ? "active" : ""}" data-section="${id}" type="button">${navIcon(id)}<span>${label}</span>${renderSectionNavBadge(id)}</button>`).join("")}
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
            ${requestsReady ? `
              <div class="queue-context-card request-intake-context">
                <div>
                  <strong>Request Intake Queue</strong>
                  <span>Requests come from posted QR/public intake links. Review, quick-fix, convert, or delete from this queue.</span>
                </div>
                <small>Paged ${LIST_ITEMS_PER_PAGE} at a time, newest first.</small>
              </div>
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
              <select name="location_existing" aria-label="Area / spot">
                <option value="">Area / spot unset</option>
                ${renderAssetAreaOptions()}
              </select>
              <input name="location_new" placeholder="New area / spot">
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
              <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
            </form>
            <p class="error-text" id="asset-create-error"></p>
            ${renderEquipmentStructureGuide()}
            <section class="equipment-status-guide" aria-label="Equipment status guide">
              <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
              <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
              <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
            </section>
            ${renderAssetMasterSummary()}
            ${renderAssetAreaFilter()}
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
            <form class="inline-form pm-form" id="create-pm-form" data-create-pm-form>
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
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${isoDate(startOfToday())}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
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
              <h2>Procedure Checklists</h2>
              <span>${visibleProcedures.length} shown</span>
            </div>
            ${proceduresReady ? `
            <form class="form-grid procedure-form relationship-detail procedure" id="create-procedure-form">
              <label>Procedure checklist name<input name="name" required placeholder="Monthly compressor inspection"></label>
              <label>Description<textarea name="description" rows="3" placeholder="Use this checklist when creating repeat work."></textarea></label>
              <p class="error-text" id="procedure-error"></p>
              <button class="secondary-button" type="submit">Add Checklist</button>
            </form>
            <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection checklist</button>
            <div class="procedure-list">
              ${pagedProcedures.map(renderProcedureTemplate).join("") || `<p class="muted">No procedure checklists match this search.</p>`}
            </div>
            ${renderListPagination("procedures", visibleProcedures.length, proceduresPage, totalProcedurePages)}
            ` : `<p class="muted">Run supabase/step-next-procedures.sql to turn on procedure checklists.</p>`}
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
              ${renderRequestNotificationRecipients(activeLocationId)}
              ${renderTeamInviteForm(activeLocationId)}
              ${teamInvitesReady ? renderTeamInvites() : `<p class="warning-text">Run supabase/step-next-invite-default-location.sql to invite teammates by email.</p>`}
              <details class="developer-details">
                <summary>Developer add by User UUID</summary>
                <form class="inline-form team-form" id="add-member-form">
                  <input name="user_id" required placeholder="User UUID">
                  <select name="role">
                    ${teamRoleOptionsForActor().map((role) => `<option value="${role}">${escapeHtml(roleLabel(role))}</option>`).join("")}
                  </select>
                  <button class="secondary-button" type="submit">Add Member</button>
                </form>
              </details>
            ` : `<p class="muted team-permission-note">Admins can grant roles. Managers can invite technicians.</p>`}
            <div class="member-list">
              ${pagedMembers.map(renderMember).join("") || `<p class="muted">No team members match this search.</p>`}
            </div>
            ${renderListPagination("members", visibleMembers.length, membersPage, totalMemberPages)}
          </section>

          <section class="panel full-width ${activeSection === "manager" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Manager</h2>
              <span>${escapeHtml(activeLocationName())}</span>
            </div>
            ${canManageTeam() ? renderManagerDashboard() : `<p class="muted">Manager dashboard is available to managers and admins.</p>`}
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
              ${renderPartSearch(currentPartSort())}
              ${renderPartSourceOptions()}
              ${renderPartMachineOptions()}
              <form class="inline-form parts-form relationship-detail parts" id="create-part-form">
                <div class="parts-form-header">
                  <h3>Add Part</h3>
                  <button class="text-button danger-link source-edit-button" data-toggle-part-sources type="button">Edit sources</button>
                </div>
                <label>Part name<input name="name" required placeholder="Motor bearing"></label>
                <label>SKU<input name="sku" placeholder="BRG-204"></label>
                <label>Source / vendor<input name="supplier_name" list="part-source-options" placeholder="Grainger, McMaster, local supplier"></label>
                <label>Common machine / area<input name="machine_note" list="part-machine-options" placeholder="Optional, for sorting/search context"></label>
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

          <section class="panel full-width ${activeSection === "conversions" ? "" : "hidden-section"}">
            <div class="panel-header">
              <h2>Conversions</h2>
              <span>shop reference</span>
            </div>
            ${activeSection === "conversions" ? renderConversionsLazyPanel() : ""}
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
  updateAppNoticeUi();
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    appNotice = "";
    appNoticeTone = "success";
    updateAppNoticeUi();
  }, tone === "warning" ? 4200 : 2600);
}

function renderAppNoticeMarkup() {
  if (!appNotice) return "";
  return `
    <div class="app-notice ${appNoticeTone}">${escapeHtml(appNotice)}</div>
    ${appNoticeTone === "success" ? `<div class="save-overlay" aria-hidden="true">SAVED</div>` : ""}
    ${appNoticeTone === "warning" ? `<div class="warning-overlay" aria-hidden="true">ACTION NEEDED</div>` : ""}
  `;
}

function updateAppNoticeUi() {
  const slot = document.querySelector("#app-notice-slot");
  if (!slot) return;
  slot.innerHTML = renderAppNoticeMarkup();
}

function setWorkOrderActionWarning(id, message) {
  workOrderActionWarningId = id || "";
  workOrderActionWarning = message || "";
}

function bindAutoGrowTextareas() {
  bindWorkspaceTextareaAutoGrow();
}

function scrollEquipmentDetailToActions() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector("#equipment-action-cards") || document.querySelector(".asset-command-summary");
      if (target?.scrollIntoView) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  });
}

function scrollQuickFixFormIntoView() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector("#quick-fix-form");
      if (target?.scrollIntoView) target.scrollIntoView({ behavior: "auto", block: "start" });
    });
  });
}

function scrollWorkspaceTopIntoView() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector(".workspace") || document.querySelector(".topbar-main");
      if (target?.scrollIntoView) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  });
}

const { renderAssetDetail } = createAssetDetailDisplayHelpers({
  ASSET_TYPE_OPTIONS,
  getAssets: () => assets,
  getActiveAssetId: () => activeAssetId,
  getWorkOrders: () => workOrders,
  getPreventiveSchedules: () => preventiveSchedules,
  getParts: () => parts,
  getAssetParts: () => assetParts,
  getAssetPartsReady: () => assetPartsReady,
  getAssetDocumentsByAssetId: () => assetDocumentsByAssetId,
  getAssetDocumentsReady: () => assetDocumentsReady,
  ensureAssetDocumentSignedUrls,
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
  renderAssetAreaOptions,
  assetStatusLabel,
  renderAssetMiniWorkOrder,
  assetDeleteBlockerMessage,
  canDeleteEquipment,
  renderEquipmentStructureGuide,
  renderProcedureOptions,
  getAssetRelationshipOpen,
  getAssetRelationshipPage,
  LIST_ITEMS_PER_PAGE,
});

const {
  attachAssetPart,
  createAsset,
  createQuickFixAsset,
  deleteAsset,
  removeAssetPart,
  requestDeleteAsset,
  updateAsset,
  updateAssetStatus,
} = createAssetWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  alertRef: alert,
  CSSRef: CSS,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  withSetupError,
  getActiveCompanyId: () => activeCompanyId,
  getActiveAssetId: () => activeAssetId,
  getWorkOrders: () => workOrders,
  getPreventiveSchedules: () => preventiveSchedules,
  getMaintenanceRequests: () => maintenanceRequests,
  getAssetDocumentStoragePaths: (assetId) => (assetDocumentsByAssetId[assetId] || [])
    .map((document) => document.storage_path)
    .filter(Boolean),
  removeAssetDocumentStorage: (documentPaths) => supabaseClient.storage.from("asset-documents").remove(documentPaths),
  activeLocationDatabaseId,
  childAssetsFor,
  requiredText,
  isMissingColumnError,
  isMissingTableError,
  isAssetHierarchySchemaError,
  databaseSetupRequiredMessage,
  equipmentSchemaMessage,
  assetDeleteBlockerMessage,
  canDeleteEquipment,
  setAssetPartsReady: (value) => { assetPartsReady = value; },
  setLocationsReady: (value) => { locationsReady = value; },
  setPendingDeleteAssetId: (value) => { pendingDeleteAssetId = value; },
  setActiveAssetId: setActiveAssetIdState,
  setActiveSection: setActiveSectionState,
  showNotice,
  render,
  renderWorkspace,
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

function followUpDueDateFromDays(value) {
  const parsed = Number.parseInt(String(value ?? "7"), 10);
  const days = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 365) : 7;
  const due = startOfToday();
  due.setDate(due.getDate() + days);
  return isoDate(due);
}

function requiredText(value, label) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`${label} is required.`);
  return text;
}

function isMissingTableError(error, tableName) {
  const message = String(error?.message || error?.details || "").toLowerCase();
  return error?.code === "PGRST205" || (message.includes(tableName.toLowerCase()) && message.includes("schema cache"));
}

function teamInviteSignupUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  return url.toString();
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
  activeCompanyRole,
  canAdministerTeamRoles,
  getTeamInvitesReady: () => teamInvitesReady,
  setTeamInvitesReady: (value) => { teamInvitesReady = value; },
  getRequestNotificationRecipientsReady: () => requestNotificationRecipientsReady,
  setRequestNotificationRecipientsReady: (value) => { requestNotificationRecipientsReady = value; },
  setRequestNotificationRecipientError: (value) => { requestNotificationRecipientError = value; },
  setPendingCancelInviteId: (value) => { pendingCancelInviteId = value; },
  setTeamInviteCancelError: (value) => { teamInviteCancelError = value; },
  loadMembers,
  loadTeamInvites,
  loadRequestNotificationRecipients,
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
  deleteAppIssueReportRecord,
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
  confirmUser: (message) => confirm(message),
  renderWorkspace,
});
const {
  createPublicRequestLink,
  disablePublicRequestLink,
  setPublicRequestLinkActive,
  regeneratePublicRequestLink,
} = createPublicRequestLinkWorkflow({
  documentRef: document,
  windowRef: window,
  CSSRef: CSS,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  generatePublicRequestToken,
  canAdministerPublicRequestLinks,
  getActiveCompanyId: () => activeCompanyId,
  setPublicRequestLinksReady: (value) => { publicRequestLinksReady = value; },
  showNotice,
  render: () => render(),
});
const {
  bindPartInventoryWorkflowEvents,
} = createPartInventoryWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  activeLocationDatabaseId,
  isMissingColumnError,
  databaseSetupRequiredMessage,
  getActiveCompanyId: () => activeCompanyId,
  getParts: () => parts,
  getPartSuppliersReady: () => partSuppliersReady,
  setLocationsReady: (value) => { locationsReady = value; },
  setPartSuppliersReady: (value) => { partSuppliersReady = value; },
  setPartCostsReady: (value) => { partCostsReady = value; },
  setPartMachineNotesReady: (value) => { partMachineNotesReady = value; },
  setActivePartId: setActivePartIdState,
  clearPartSearchState,
  showNotice,
  render: () => render(),
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

const { updateWorkOrderQuickView } = createWorkOrderQuickUpdateWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  consoleRef: console,
  getWorkOrders: () => workOrders,
  getActiveWorkOrderId: () => activeWorkOrderId,
  createQuickFixAsset,
  confirmAssetLocationRouting,
  requiredText,
  descriptionWithAssignmentNote,
  locationIdForAsset,
  workOrderDateValue,
  assignedUserFromForm,
  procedureColumn,
  applySafetyRequirementPayload,
  blocksProcedureCompletion,
  setWorkOrderActionWarning,
  applySafetyCheckPayload,
  requiresSafetyDeviceCheck,
  hasCompletedSafetyDeviceCheck,
  withOperationTimeout,
  updateWorkOrderSafely,
  friendlyWorkOrderSaveError,
  updateAssetStatus,
  recordWorkOrderEvent,
  describeWorkOrderChanges,
  showNotice,
  render,
});

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
    loadManagerDashboardCompletedWork,
    reloadWorkOrderQueue,
    renderWorkspace,
    resetWorkOrderPage,
    scrollToSectionTop: scrollWorkspaceTopIntoView,
    setWorkOrderSearchMode,
    visibleNavItems,
  });
  if (activeSection === "conversions") {
    if (conversionDisplayHelpers) {
      window.MaintainOpsConversions.bindConversionEvents({ favoriteStore: createShopReferenceFavoriteStore() });
    } else {
      document.querySelector("[data-retry-conversions]")?.addEventListener("click", () => {
        conversionResourcesError = "";
        scheduleConversionResourceLoad();
        renderWorkspace();
      });
      scheduleConversionResourceLoad();
    }
  }
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
    scrollToQuickFixForm: scrollQuickFixFormIntoView,
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

  bindWorkspaceManagerDashboardEvents({
    state: {
      setActiveSection: setActiveSectionState,
      setManagerDashboardMetric: (value) => workspaceUiState.setManagerDashboardMetric(value),
      setManagerDashboardUserId: (value) => workspaceUiState.setManagerDashboardUserId(value),
      setRequestViewFilter: (value) => workspaceUiState.setRequestViewFilter(value),
    },
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
    getAssetRelationshipPage,
    loadAssetWorkOrderHistory,
    renderWorkspace,
    setAssetRelationshipOpen,
    setAssetRelationshipPage,
    scrollToDetailTop: scrollEquipmentDetailToActions,
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
  bindWorkspaceDatePickerControls();

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

  document.querySelectorAll("[data-attach-asset-part]").forEach((form) => {
    form.addEventListener("submit", attachAssetPart);
  });

  document.querySelectorAll("[data-remove-asset-part]").forEach((button) => {
    button.addEventListener("click", () => removeAssetPart(button.dataset.removeAssetPart));
  });

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

  bindWorkspaceTeamInviteCopyEvents({
    copyTextToClipboard,
  });

  bindPartInventoryWorkflowEvents();

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

  document.querySelectorAll("[data-part-document]").forEach((form) => {
    form.addEventListener("submit", uploadPartDocument);
  });

  document.querySelectorAll("[data-asset-document]").forEach((form) => {
    form.addEventListener("submit", uploadAssetDocument);
  });

  document.querySelectorAll("[data-delete-asset-document]").forEach((button) => {
    button.addEventListener("click", () => deleteAssetDocument(button.dataset.deleteAssetDocument, button.dataset.assetDocumentPath));
  });

  const partsUsedForm = document.querySelector("#parts-used-form");
  if (partsUsedForm) partsUsedForm.addEventListener("submit", recordPartUsed);

  bindCompanySettingsWorkflowEvents();

  const logoForm = document.querySelector("#company-logo-form");
  if (logoForm) logoForm.addEventListener("submit", uploadCompanyLogo);
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
  if (assetPartRows(id).length) {
    alert("This part is linked to equipment and is kept for traceability.");
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
  if (assetPartRows(id).length) {
    if (errorElement) errorElement.textContent = "This part is linked to equipment and is kept for traceability.";
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
        ? "This part is linked to work or equipment and cannot be deleted."
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

async function createFollowUpWorkOrder(sourceId, dueInDays) {
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
    due_at: followUpDueDateFromDays(dueInDays),
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

const {
  addPhotoToMaintenanceRequest,
  addPhotoToWorkOrder,
  deleteAssetDocument,
  optimizePhoto,
  removeUploadedObject,
  uploadAssetDocument,
  uploadPartDocument,
  uploadPhoto,
} = createMediaStorageWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  cryptoRef: crypto,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  getActiveCompanyId: () => activeCompanyId,
  getActiveWorkOrderId: () => activeWorkOrderId,
  getSession: () => session,
  safeFileName,
  fileBaseName,
  isColumnSchemaError,
  ensureProfileForActiveCompany,
  getAppError: () => appError,
  recordWorkOrderEvent,
  getAssetDocumentsReady: () => assetDocumentsReady,
  setAssetDocumentsReady: (value) => { assetDocumentsReady = value; },
  getPartDocumentsReady: () => partDocumentsReady,
  setPartDocumentsReady: (value) => { partDocumentsReady = value; },
  setPhotosReady: (value) => { photosReady = value; },
  setRequestPhotosReady: (value) => { requestPhotosReady = value; },
  getAppIssueReportsReady: () => appIssueReportsReady,
  createAppIssueReportRecord,
  activeLocationDatabaseId,
  getActiveSection: () => activeSection,
  getPageUrl: () => window.location.href,
  showNotice,
  render,
});

const { uploadCompanyLogo } = createCompanyLogoWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  cryptoRef: crypto,
  URLRef: URL,
  consoleRef: console,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  removeUploadedObject,
  getActiveCompanyId: () => activeCompanyId,
  getCompanies: () => companies,
  safeFileName,
  fileBaseName,
  isColumnSchemaError,
  showNotice,
  render,
});

const {
  addPartUsageToWorkOrder,
  recordPartUsed,
} = createPartUsageWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  getActiveCompanyId: () => activeCompanyId,
  getActiveWorkOrderId: () => activeWorkOrderId,
  getParts: () => parts,
  showNotice,
  render,
});

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

const { createWorkOrder } = createWorkOrderCreationWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  alertRef: alert,
  withOperationTimeout,
  createQuickFixAsset,
  getActiveCompanyId: () => activeCompanyId,
  getSession: () => session,
  getParts: () => parts,
  confirmAssetLocationRouting,
  assetRequiresSafety,
  blocksProcedureCompletion,
  setWorkOrderActionWarning,
  locationIdForAsset,
  requiredText,
  descriptionWithAssignmentNote,
  assignedUserFromForm,
  procedureColumn,
  workOrderDateValue,
  applySafetyRequirementPayload,
  applySafetyCheckPayload,
  insertWithOptionalProcedure,
  friendlyWorkOrderSaveError,
  recordWorkOrderEvent,
  addPartUsageToWorkOrder,
  addPhotoToWorkOrder,
  addCommentToWorkOrder,
  setActiveWorkOrderId: setActiveWorkOrderIdState,
  setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
  showNotice,
  render,
});

const {
  convertRequestToWorkOrder,
  createRequest,
  createRequestFromForm,
  deleteMaintenanceRequest,
  openQuickFixForRequest,
  renderRequestForm,
  requestDeleteMaintenanceRequest,
} = createRequestLifecycleWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  alertRef: alert,
  CSSRef: CSS,
  supabaseClient: () => supabaseClient,
  withOperationTimeout,
  getActiveCompanyId: () => activeCompanyId,
  getSession: () => session,
  getRequestsReady: () => requestsReady,
  getMaintenanceRequests: () => maintenanceRequests,
  renderRequestFormContent,
  confirmAssetLocationRouting,
  locationIdForAsset,
  requiredText,
  isMissingColumnError,
  databaseSetupRequiredMessage,
  addPhotoToMaintenanceRequest,
  notifyRequestEmailer: (requestId) => notifyRequestEmailer(supabaseClient, requestId),
  setLocationsReady: (value) => { locationsReady = value; },
  setActiveSection: setActiveSectionState,
  setActiveWorkOrderId: setActiveWorkOrderIdState,
  setActiveAssetId: setActiveAssetIdState,
  setRequestViewFilter: (value) => { workspaceUiState.setRequestViewFilter(value); },
  resetRequestsPage,
  descriptionWithRequestPhotoNote,
  applySafetyRequirementPayload,
  applySafetyCheckPayload,
  insertWithOptionalProcedure,
  recordWorkOrderEvent,
  setQuickFixRequestId: (value) => { quickFixRequestId = value; },
  setQuickFixAssetId: (value) => { quickFixAssetId = value; },
  setQuickFixMode: (value) => { quickFixMode = value; },
  setCreateWorkOrderMode: (value) => { createWorkOrderMode = value; },
  setPendingDeleteRequestId: (value) => { pendingDeleteRequestId = value; },
  canDeleteOperationalRecords,
  showNotice,
  render,
  renderWorkspace,
});

const { updateWorkOrderDetails } = createWorkOrderDetailEditWorkflow({
  documentRef: document,
  FormDataCtor: FormData,
  consoleRef: console,
  getActiveWorkOrderId: () => activeWorkOrderId,
  getWorkOrders: () => workOrders,
  requiredText,
  descriptionWithAssignmentNote,
  workOrderDateValue,
  locationIdForAsset,
  assignedUserFromForm,
  procedureColumn,
  assetRequiresSafety,
  hasCompletedSafetyDeviceCheck,
  blocksProcedureCompletion,
  setWorkOrderActionWarning,
  applySafetyCheckPayload,
  withOperationTimeout,
  updateWorkOrderSafely,
  friendlyWorkOrderSaveError,
  recordWorkOrderEvent,
  describeWorkOrderChanges,
  showNotice,
  render,
});

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
    if (workOrder?.status === "completed") {
      return alert("Completed work orders cannot be reassigned.");
    }
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
  if (workOrder.status === "completed") {
    showNotice("Completed work orders cannot be reassigned.", "warning");
    return;
  }
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

function canAdministerTeamRoles() {
  return activeCompanyRole() === "admin";
}

function teamRoleOptionsForActor() {
  return canAdministerTeamRoles() ? COMPANY_ROLES : ["technician"];
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
  if (workOrder.status === "completed") return false;
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
    ["procedures", "Procedure Checklist"],
    ["parts", "Parts"],
    ["conversions", "Conversions"],
    ["messages", "Messages"],
    ["team", "Team"],
  ];
  if (canAdministerTeamRoles()) {
    items.push(["manager", "Manager"]);
  }
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

init();
