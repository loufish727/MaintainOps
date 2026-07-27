const { expect, test } = require("@playwright/test");

const requiredResources = [
  "supabase-config.js",
];

const requiredBundlePatterns = [
  /src\/bundles\/runtime\.[a-f0-9]{10}\.js/,
  /src\/bundles\/appShell\.[a-f0-9]{10}\.js/,
];
const requiredStylePattern = /appStyles\.[a-f0-9]{10}\.css/;
const lazyFeaturePatterns = [
  /src\/bundles\/managerFeature\.[a-f0-9]{10}\.js/,
  /src\/bundles\/financialFeature\.[a-f0-9]{10}\.js/,
  /src\/bundles\/teamFeature\.[a-f0-9]{10}\.js/,
  /src\/bundles\/setupFeature\.[a-f0-9]{10}\.js/,
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
  "src/performance/platformPerformanceService.js",
  "src/performance/platformPerformanceDisplay.js",
];

const additionalResources = [
  "auth/callback/index.html",
  "auth/callback/callback.js",
  "performance-spatial.html",
  "assets/performance-spatial/textures/file-cube-skins.png",
  "assets/performance-spatial/textures/silo-open-panels.png",
  "assets/performance-spatial/textures/silo-closed-panels.png",
  "assets/performance-spatial/textures/capacity-core-kit.png",
  "assets/performance-spatial/textures/floor-deck.png",
  "assets/performance-spatial/textures/outer-walls.png",
  "assets/performance-spatial/hdri/studio_small_01_1k.hdr",
  "assets/performance-spatial/models/maintain_ops_concept_kit.glb",
];

test.describe("MaintainOps hosted resource smoke", () => {
  test("live GitHub Pages serves required app resources", async ({ request, baseURL }) => {
    test.setTimeout(180000);

    let lastError;
    const maxAttempts = new URL(baseURL).hostname.endsWith("github.io") ? 36 : 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const indexResponse = await request.get(`${baseURL}index.html?qa_bust=resource-smoke-${attempt}`);
        expect(indexResponse.status(), "index.html should load").toBe(200);

        const indexHtml = await indexResponse.text();
        expect(indexHtml, "QR code generator should lazy-load only on QR surfaces").not.toContain("qrcode-generator");

        const styleMatch = indexHtml.match(requiredStylePattern);
        expect(styleMatch, "index.html should reference the hashed application stylesheet").not.toBeNull();
        const styleResponse = await request.get(`${baseURL}${styleMatch[0]}?qa_bust=resource-smoke-${attempt}`);
        expect(styleResponse.status(), `${styleMatch[0]} should load`).toBe(200);

        for (const resource of requiredResources) {
          expect(indexHtml, `index.html should reference ${resource}`).toContain(resource);

          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load`).toBe(200);
        }

        let appShellText = "";
        for (const pattern of requiredBundlePatterns) {
          const match = indexHtml.match(pattern);
          expect(match, `index.html should reference ${pattern}`).not.toBeNull();
          const resource = match[0];
          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load`).toBe(200);
          if (resource.includes("/appShell.")) appShellText = await response.text();
        }

        for (const pattern of lazyFeaturePatterns) {
          expect(indexHtml, `index.html should not eagerly load ${pattern}`).not.toMatch(pattern);
          const match = appShellText.match(pattern);
          expect(match, `app shell should reference lazy feature ${pattern}`).not.toBeNull();
          const response = await request.get(`${baseURL}${match[0]}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${match[0]} should load`).toBe(200);
        }

        for (const resource of additionalResources) {
          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load`).toBe(200);
        }

        const spatialResponse = await request.get(`${baseURL}performance-spatial.html?qa_bust=spatial-${attempt}`);
        expect(spatialResponse.status(), "performance-spatial.html should load").toBe(200);
        const spatialHtml = await spatialResponse.text();
        const spatialStyle = spatialHtml.match(/src\/bundles\/platformSpatialStyles\.[a-f0-9]{10}\.css/);
        expect(spatialStyle, "spatial performance page should reference its minified stylesheet").not.toBeNull();
        const spatialStyleResponse = await request.get(`${baseURL}${spatialStyle[0]}?qa_bust=spatial-style-${attempt}`);
        expect(spatialStyleResponse.status(), "spatial performance stylesheet should load").toBe(200);
        const spatialBundle = spatialHtml.match(/src\/bundles\/platformSpatial\.[a-f0-9]{10}\.js/);
        expect(spatialBundle, "spatial performance page should reference its lazy bundle").not.toBeNull();
        const spatialBundleResponse = await request.get(`${baseURL}${spatialBundle[0]}?qa_bust=spatial-${attempt}`);
        expect(spatialBundleResponse.status(), "spatial performance bundle should load").toBe(200);
        const spatialBundleText = await spatialBundleResponse.text();
        expect(
          spatialBundleText,
          "spatial assets must stay relative to the GitHub Pages project path"
        ).not.toContain('"/assets/performance-spatial/');

        for (const resource of lazyResources) {
          expect(indexHtml, `index.html should not eagerly load lazy resource ${resource}`).not.toContain(resource);

          const response = await request.get(`${baseURL}${resource}?qa_bust=resource-smoke-${attempt}`);
          expect(response.status(), `${resource} should load when requested`).toBe(200);
        }

        return;
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
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

    const eagerFeatureLoads = await page.evaluate(() => performance.getEntriesByType("resource")
      .map((entry) => entry.name)
      .filter((name) => /\/(?:manager|financial|team|setup)Feature\.[a-f0-9]{10}\.js/.test(name)));
    expect(eagerFeatureLoads, "optional feature bundles must not load on the auth shell").toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});
