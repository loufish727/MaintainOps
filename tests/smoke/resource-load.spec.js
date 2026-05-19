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
];

test.describe("MaintainOps hosted resource smoke", () => {
  test("live GitHub Pages serves required app resources", async ({ request, baseURL }) => {
    const indexResponse = await request.get(`${baseURL}index.html?qa_bust=resource-smoke`);
    expect(indexResponse.status(), "index.html should load").toBe(200);

    const indexHtml = await indexResponse.text();

    for (const resource of requiredResources) {
      expect(indexHtml, `index.html should reference ${resource}`).toContain(resource);

      const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke`);
      expect(response.status(), `${resource} should load`).toBe(200);
    }
  });
});
