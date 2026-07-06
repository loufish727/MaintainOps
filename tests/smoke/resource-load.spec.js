const { expect, test } = require("@playwright/test");

const requiredResources = [
  "app.js",
  "styles.css",
  "supabase-config.js",
  "src/utils/authRedirects.js",
  "src/utils/constants.js",
  "src/utils/dom.js",
  "src/utils/formatting.js",
  "src/utils/schemaErrors.js",
  "src/utils/operationResults.js",
  "src/utils/operationTimeout.js",
  "src/utils/authRenderPolicy.js",
  "src/utils/publicUrlQr.js",
  "src/utils/publicQrPrintEvents.js",
  "src/utils/maintenanceScheduleDates.js",
  "src/utils/workspaceUiState.js",
  "src/utils/workOrderQueryFilters.js",
  "src/utils/workSectionJumpEvents.js",
  "src/utils/globalSearchNavigationEvents.js",
  "src/utils/workspaceSearchEvents.js",
  "src/utils/workspaceFilterPaginationEvents.js",
  "src/utils/workspaceFinancialNavigationEvents.js",
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
  "src/utils/workspaceManagerDashboardEvents.js",
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
  "src/utils/workspaceDatePickerControls.js",
  "src/utils/workspaceTeamInviteCancelEvents.js",
  "src/utils/workspaceTeamInviteCopyEvents.js",
  "src/utils/workspaceQuickFixCommandEvents.js",
  "src/utils/workspaceAssetQuickFixEvents.js",
  "src/utils/publicRequestTokens.js",
  "src/utils/workspacePublicRequestLinkCopyEvents.js",
  "src/utils/workspacePublicRequestLinkAdminEvents.js",
  "src/utils/workspaceRequestConversionEvents.js",
  "src/utils/workspacePmGenerationEvents.js",
  "src/utils/workspaceFollowUpWorkEvents.js",
  "src/utils/workspaceCommentEvents.js",
  "src/utils/workspaceQuickUpdateEvents.js",
  "src/utils/workspaceWorkOrderEditEvents.js",
  "src/utils/workspaceRequestQuickFixEvents.js",
  "src/utils/workspaceAssetLocationWarningEvents.js",
  "src/workflows/quickFixWorkflow.js",
  "src/workflows/assetFinancialWorkflow.js",
  "src/workflows/partDeleteWorkflow.js",
  "src/workflows/procedureChecklistWorkflow.js",
  "src/workflows/publicRequestIntakeWorkflow.js",
  "src/workflows/companySetupWorkflow.js",
  "src/workflows/workOrderStatusWorkflow.js",
  "src/utils/requestQueryFilters.js",
  "src/utils/workOrderSearch.js",
  "src/utils/workspaceListBuilders.js",
  "src/services/locationsService.js",
  "src/services/profilesService.js",
  "src/services/partsService.js",
  "src/services/assetsService.js",
  "src/services/workOrdersService.js",
  "src/services/managerDashboardService.js",
  "src/services/companyService.js",
  "src/services/appIssueReportsService.js",
  "src/services/userPreferencesService.js",
  "src/services/requestEmailNotificationService.js",
  "src/services/signedUrlService.js",
  "src/services/workspaceQueueLoadersService.js",
  "src/render/displayHelpers.js",
  "src/render/relationshipDisplay.js",
  "src/render/dashboardDisplay.js",
  "src/render/iconDisplay.js",
  "src/render/equipmentLabels.js",
  "src/bundles/emptyStateText.bundle.js",
  "src/render/requestDisplay.js",
  "src/render/globalSearchDisplay.js",
  "src/render/workQueueDisplay.js",
  "src/render/planningDisplay.js",
  "src/render/miniWorkOrderDisplay.js",
  "src/render/paginationDisplay.js",
  "src/render/partsDisplay.js",
  "src/render/optionDisplay.js",
  "src/render/setupDisplay.js",
  "src/render/storageDashboardDisplay.js",
  "src/bundles/renderLeaf.bundle.js",
  "src/render/appIssueDisplay.js",
  "src/render/workMessageDisplay.js",
  "src/render/workRecommendationDisplay.js",
  "src/render/commandCardDisplay.js",
  "src/render/workCommandDisplay.js",
  "src/render/missingWorkDetailDisplay.js",
  "src/render/assetCardDisplay.js",
  "src/render/financialDisplay.js",
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
  "src/render/workOrderDetailDisplay.js",
  "src/render/equipmentStructureGuideDisplay.js",
  "src/render/assetDetailDisplay.js",
  "src/render/messageCenterDisplay.js",
  "src/render/createWorkOrderDisplay.js",
  "src/render/quickFixDisplay.js",
  "src/render/managerDashboardDisplay.js",
  "src/render/authDisplay.js",
  "src/render/publicRequestDisplay.js",
  "src/render/messageFormatting.js",
  "src/render/messageDisplay.js",
];

const lazyResources = [
  "src/utils/conversions.js",
  "src/data/reference/fasteners.js",
  "src/data/reference/electricalControls.js",
  "src/data/reference/dieselMobile.js",
  "src/data/reference/machiningCnc.js",
  "src/data/reference/fabrication.js",
  "src/data/reference/motorsDrives.js",
  "src/data/reference/fluidPower.js",
  "src/data/reference/pneumatics.js",
  "src/data/reference/bearingsBeltsChain.js",
  "src/data/reference/pmTroubleshooting.js",
  "src/data/reference/pipeHoseFittings.js",
  "src/data/reference/materialsShop.js",
  "src/data/shopReferenceCharts.js",
  "src/render/conversionDisplay.js",
];

const additionalResources = [
  "auth/callback/index.html",
  "auth/callback/callback.js",
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
        expect(indexHtml, "QR code generator should lazy-load only on QR surfaces").not.toContain("qrcode-generator");

        for (const resource of requiredResources) {
          expect(indexHtml, `index.html should reference ${resource}`).toContain(resource);

          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load`).toBe(200);
        }

        for (const resource of additionalResources) {
          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load`).toBe(200);
        }

        for (const resource of lazyResources) {
          expect(indexHtml, `index.html should not eagerly load lazy resource ${resource}`).not.toContain(resource);

          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load when requested`).toBe(200);
        }

        return;
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    throw lastError;
  });

  test("live GitHub Pages renders the app shell", async ({ page, baseURL }) => {
    test.setTimeout(90000);

    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(`${baseURL}index.html?qa_bust=app-shell-${Date.now()}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForFunction(() => {
      const app = document.querySelector("#app");
      return Boolean(app && app.innerHTML.trim().length > 0);
    }, null, { timeout: 30000 });

    expect(pageErrors).toEqual([]);
  });
});
