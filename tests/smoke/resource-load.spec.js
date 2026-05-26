const { expect, test } = require("@playwright/test");

const requiredResources = [
  "app.js",
  "styles.css",
  "supabase-config.js",
  "src/utils/constants.js",
  "src/utils/dom.js",
  "src/utils/formatting.js",
  "src/utils/schemaErrors.js",
  "src/utils/operationResults.js",
  "src/utils/operationTimeout.js",
  "src/utils/publicUrlQr.js",
  "src/utils/publicQrPrintEvents.js",
  "src/utils/maintenanceScheduleDates.js",
  "src/utils/workOrderQueryFilters.js",
  "src/utils/workSectionJumpEvents.js",
  "src/utils/globalSearchNavigationEvents.js",
  "src/utils/workspaceSearchEvents.js",
  "src/utils/workspaceFilterPaginationEvents.js",
  "src/utils/workspaceDetailNavigationEvents.js",
  "src/utils/workspaceInventoryFilterEvents.js",
  "src/utils/workspaceWorkOrderStatusEvents.js",
  "src/utils/workspaceWorkOrderAssignmentEvents.js",
  "src/utils/workspaceWorkOrderDowntimeEvents.js",
  "src/utils/workspaceWorkOrderDetailStatusEvents.js",
  "src/utils/workspaceWorkOrderCompletionEvents.js",
  "src/utils/workspaceWorkOrderDeleteEvents.js",
  "src/utils/workspaceTeamWorkViewEvents.js",
  "src/utils/workspacePartDetailEvents.js",
  "src/utils/workspaceMessageUiEvents.js",
  "src/utils/workspacePartSearchEvents.js",
  "src/utils/workspaceSectionNavigationEvents.js",
  "src/utils/workspaceMessageThreadEvents.js",
  "src/utils/workspaceIssueAdminUiEvents.js",
  "src/utils/workspacePartDeleteCancelEvents.js",
  "src/utils/workspaceWorkMessageStartEvents.js",
  "src/utils/workspaceReportIssueCommandEvents.js",
  "src/utils/workspaceSubmitRequestCommandEvents.js",
  "src/utils/workspaceNewWorkOrderCommandEvents.js",
  "src/utils/workspaceExportCsvCommandEvents.js",
  "src/utils/workspaceAssetDeleteCancelEvents.js",
  "src/utils/workspaceRequestDeleteCancelEvents.js",
  "src/utils/workspaceScheduleDeleteCancelEvents.js",
  "src/utils/workspaceProcedureDeleteCancelEvents.js",
  "src/utils/workspaceTextareaAutoGrow.js",
  "src/utils/workspaceTeamInviteCancelEvents.js",
  "src/utils/workspaceQuickFixCommandEvents.js",
  "src/utils/workspaceAssetQuickFixEvents.js",
  "src/utils/workspacePublicRequestLinkCopyEvents.js",
  "src/utils/workspaceRequestQuickFixEvents.js",
  "src/utils/workspaceAssetLocationWarningEvents.js",
  "src/utils/requestQueryFilters.js",
  "src/utils/workOrderSearch.js",
  "src/utils/workspaceListBuilders.js",
  "src/services/locationsService.js",
  "src/services/profilesService.js",
  "src/services/partsService.js",
  "src/services/assetsService.js",
  "src/services/workOrdersService.js",
  "src/services/companyService.js",
  "src/services/appIssueReportsService.js",
  "src/render/displayHelpers.js",
  "src/render/relationshipDisplay.js",
  "src/render/dashboardDisplay.js",
  "src/render/iconDisplay.js",
  "src/render/equipmentLabels.js",
  "src/render/emptyStateText.js",
  "src/render/requestDisplay.js",
  "src/render/globalSearchDisplay.js",
  "src/render/workQueueDisplay.js",
  "src/render/planningDisplay.js",
  "src/render/miniWorkOrderDisplay.js",
  "src/render/paginationDisplay.js",
  "src/render/partsDisplay.js",
  "src/render/optionDisplay.js",
  "src/render/setupDisplay.js",
  "src/render/requestPhotoDisplay.js",
  "src/render/messageBadgeDisplay.js",
  "src/render/appIssueDisplay.js",
  "src/render/workMessageDisplay.js",
  "src/render/workRecommendationDisplay.js",
  "src/render/commandCardDisplay.js",
  "src/render/workCommandDisplay.js",
  "src/render/missingWorkDetailDisplay.js",
  "src/render/partSourceDisplay.js",
  "src/render/assetCardDisplay.js",
  "src/render/procedureOptionsDisplay.js",
  "src/render/messageThreadLabelDisplay.js",
  "src/render/messageThreadButtonDisplay.js",
  "src/render/messageComposerDisplay.js",
  "src/render/appIssuePanelDisplay.js",
  "src/render/inviteLocationDisplay.js",
  "src/render/partSetupDisplay.js",
  "src/render/teamMemberDisplay.js",
  "src/render/teamWorkloadDisplay.js",
  "src/render/locationDisplay.js",
  "src/render/downtimeEmailDisplay.js",
  "src/render/setupErrorDisplay.js",
  "src/render/workOrderErrorDisplay.js",
  "src/render/assignmentDisplay.js",
  "src/render/workOrderDescriptionDisplay.js",
  "src/render/workOrderChangeDisplay.js",
  "src/render/activityFeedDisplay.js",
  "src/render/partInventoryDisplay.js",
  "src/render/partUsageDisplay.js",
  "src/render/requestQueueDisplay.js",
  "src/render/deleteBlockerDisplay.js",
  "src/render/assetHierarchyDisplay.js",
  "src/render/maintenanceListDisplay.js",
  "src/render/searchFilterDisplay.js",
  "src/render/workOrderSortDisplay.js",
  "src/render/locationFilterDisplay.js",
  "src/render/messageThreadFilterDisplay.js",
  "src/render/setupStatusDisplay.js",
  "src/render/workOrderStatusFilterDisplay.js",
  "src/render/workOrderSearchDisplay.js",
  "src/render/myWorkQueueDisplay.js",
  "src/render/messageCenterErrorDisplay.js",
  "src/render/appIssueErrorDisplay.js",
  "src/render/messageFormatting.js",
  "src/render/messageDisplay.js",
];

test.describe("MaintainOps hosted resource smoke", () => {
  test("live GitHub Pages serves required app resources", async ({ request, baseURL }) => {
    test.setTimeout(180000);

    let lastError;

    for (let attempt = 1; attempt <= 36; attempt += 1) {
      try {
        const indexResponse = await request.get(`${baseURL}index.html?qa_bust=resource-smoke-${attempt}`);
        expect(indexResponse.status(), "index.html should load").toBe(200);

        const indexHtml = await indexResponse.text();

        for (const resource of requiredResources) {
          expect(indexHtml, `index.html should reference ${resource}`).toContain(resource);

          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load`).toBe(200);
        }

        return;
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    throw lastError;
  });
});
