const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function createDocumentHarness() {
  const scripts = [];

  function removeScript(script) {
    const index = scripts.indexOf(script);
    if (index >= 0) scripts.splice(index, 1);
  }

  return {
    scripts,
    documentRef: {
      querySelector(selector) {
        return scripts.find((script) =>
          selector.includes(`data-lazy-src="${script.dataset.lazySrc}"`) ||
          selector.includes(`src="${script.src}"`)
        ) || null;
      },
      createElement(tagName) {
        assert.equal(tagName, "script");
        const listeners = { load: [], error: [] };
        return {
          async: true,
          dataset: {},
          src: "",
          addEventListener(type, listener) {
            listeners[type].push(listener);
          },
          dispatch(type) {
            for (const listener of listeners[type]) listener();
          },
          remove() {
            removeScript(this);
          },
        };
      },
      body: {
        appendChild(script) {
          scripts.push(script);
        },
      },
    },
  };
}

async function importLazyResources() {
  const sourcePath = path.resolve(__dirname, "../../src/appShell/lazyResources.js");
  const source = fs.readFileSync(sourcePath, "utf8");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  return import(moduleUrl);
}

(async () => {
  const { createLazyResourceHelpers } = await importLazyResources();
  const harness = createDocumentHarness();
  let activeSection = "manager";
  let initializeCount = 0;
  let renderCount = 0;

  const helpers = createLazyResourceHelpers({
    windowRef: {},
    documentRef: harness.documentRef,
    escapeHtml: (value) => String(value),
    qrCodeResource: {},
    conversionResourcePaths: [],
    platformPerformanceResourcePaths: [],
    featureBundlePaths: { manager: "managerFeature.test.js" },
    initializeFeature: async (featureId) => {
      assert.equal(featureId, "manager");
      initializeCount += 1;
    },
    getActiveSection: () => activeSection,
    getPublicRequestLinks: () => [],
    canManageTeam: () => false,
    requestWorkspaceRender: () => {
      renderCount += 1;
    },
  });

  const firstLoad = helpers.ensureFeatureBundleLoaded("manager");
  const sharedLoad = helpers.ensureFeatureBundleLoaded("manager");
  assert.equal(harness.scripts.length, 1, "concurrent feature requests must share one script element");
  harness.scripts[0].onload();
  await Promise.all([firstLoad, sharedLoad]);
  assert.equal(initializeCount, 1, "a feature bundle must initialize once");
  assert.equal(helpers.isFeatureBundleReady("manager"), true);

  helpers.scheduleFeatureBundleLoad("manager");
  assert.equal(harness.scripts.length, 1, "a ready feature must not be requested again");

  const retryHarness = createDocumentHarness();
  let retryRenderCount = 0;
  const retryHelpers = createLazyResourceHelpers({
    windowRef: {},
    documentRef: retryHarness.documentRef,
    escapeHtml: (value) => String(value),
    qrCodeResource: {},
    conversionResourcePaths: [],
    platformPerformanceResourcePaths: [],
    featureBundlePaths: { manager: "managerFeature.retry.js" },
    initializeFeature: async () => {},
    getActiveSection: () => activeSection,
    getPublicRequestLinks: () => [],
    canManageTeam: () => false,
    requestWorkspaceRender: () => {
      retryRenderCount += 1;
    },
  });

  const failedLoad = retryHelpers.ensureFeatureBundleLoaded("manager");
  retryHarness.scripts[0].onerror();
  await assert.rejects(failedLoad, /Could not load managerFeature\.retry\.js/);
  assert.equal(retryHarness.scripts.length, 0, "a failed feature script must be removed so Retry can request it again");

  retryHelpers.scheduleFeatureBundleLoad("manager");
  assert.equal(retryHarness.scripts.length, 1, "Retry must append a new feature script");
  retryHarness.scripts[0].onload();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(retryHelpers.isFeatureBundleReady("manager"), true);
  assert.equal(retryRenderCount, 1, "a successful scheduled feature load must rerender its active screen");

  activeSection = "work";
  assert.equal(renderCount, 0);
  console.log("lazy feature loader smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
