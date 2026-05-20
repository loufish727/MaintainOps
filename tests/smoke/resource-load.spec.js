const { expect, test } = require("@playwright/test");

const requiredResources = [
  "app.js",
  "styles.css",
  "supabase-config.js",
  "src/utils/constants.js",
  "src/utils/dom.js",
  "src/utils/formatting.js",
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
