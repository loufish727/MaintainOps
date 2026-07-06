const { expect, test } = require("@playwright/test");

const requiredResources = [
  "styles.css",
  "supabase-config.js",
];

const requiredBundlePatterns = [
  /src\/bundles\/runtime\.[a-f0-9]{10}\.js/,
  /src\/bundles\/appShell\.[a-f0-9]{10}\.js/,
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

        for (const pattern of requiredBundlePatterns) {
          const match = indexHtml.match(pattern);
          expect(match, `index.html should reference ${pattern}`).not.toBeNull();
          const resource = match[0];
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
