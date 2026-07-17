function defaultLoadScriptResource(documentRef, src, options = {}) {
  return new Promise((resolve, reject) => {
    const existing = documentRef.querySelector(`script[data-lazy-src="${src}"], script[src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
      return;
    }

    const script = documentRef.createElement("script");
    script.src = src;
    script.dataset.lazySrc = src;
    script.async = Boolean(options.async);
    if (options.integrity) script.integrity = options.integrity;
    if (options.crossOrigin) script.crossOrigin = options.crossOrigin;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    documentRef.body.appendChild(script);
  });
}

export function createLazyResourceHelpers({
  windowRef,
  documentRef,
  escapeHtml,
  qrCodeResource,
  conversionResourcePaths,
  platformPerformanceResourcePaths,
  loadScriptResource = defaultLoadScriptResource,
  getActiveSection,
  getPublicRequestLinks,
  canManageTeam,
  requestWorkspaceRender,
}) {
  let conversionResourcesPromise = null;
  let conversionResourcesError = "";
  let conversionDisplayHelpers = null;
  let platformPerformanceResourcesPromise = null;
  let platformPerformanceResourcesError = "";
  let platformPerformanceDisplayHelpers = null;
  let qrLibraryPromise = null;

  function hasConversionDisplayHelpers() {
    return Boolean(conversionDisplayHelpers);
  }

  function clearConversionResourcesError() {
    conversionResourcesError = "";
  }

  function getConversionDisplayHelpers() {
    return conversionDisplayHelpers;
  }

  function hasPlatformPerformanceDisplayHelpers() {
    return Boolean(platformPerformanceDisplayHelpers);
  }

  function clearPlatformPerformanceResourcesError() {
    platformPerformanceResourcesError = "";
  }

  function getPlatformPerformanceDisplayHelpers() {
    return platformPerformanceDisplayHelpers;
  }

  function ensureQrLibraryLoaded() {
    if (windowRef.qrcode) return Promise.resolve();
    if (!qrLibraryPromise) {
      qrLibraryPromise = loadScriptResource(documentRef, qrCodeResource.src, {
        async: true,
        integrity: qrCodeResource.integrity,
        crossOrigin: qrCodeResource.crossOrigin,
      }).then(() => {
        if (!windowRef.qrcode) throw new Error("QR code generator did not initialize.");
      }).catch((error) => {
        qrLibraryPromise = null;
        throw error;
      });
    }
    return qrLibraryPromise;
  }

  async function ensureConversionResourcesLoaded() {
    if (conversionDisplayHelpers) return conversionDisplayHelpers;
    if (!conversionResourcesPromise) {
      conversionResourcesError = "";
      conversionResourcesPromise = (async () => {
        for (const src of conversionResourcePaths) {
          await loadScriptResource(documentRef, src);
        }
        const conversions = windowRef.MaintainOpsConversions;
        const display = windowRef.MaintainOpsConversionDisplay;
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

  async function ensurePlatformPerformanceResourcesLoaded() {
    if (platformPerformanceDisplayHelpers) return platformPerformanceDisplayHelpers;
    if (!platformPerformanceResourcesPromise) {
      platformPerformanceResourcesError = "";
      platformPerformanceResourcesPromise = (async () => {
        for (const src of platformPerformanceResourcePaths || []) {
          await loadScriptResource(documentRef, src);
        }
        const service = windowRef.MaintainOpsPlatformPerformanceService;
        const display = windowRef.MaintainOpsPlatformPerformanceDisplay;
        if (!service || !display) throw new Error("Platform Performance resources did not initialize.");
        platformPerformanceDisplayHelpers = display.createPlatformPerformanceDisplayHelpers({ escapeHtml });
        return platformPerformanceDisplayHelpers;
      })().catch((error) => {
        platformPerformanceResourcesError = error.message || "Could not load Platform Performance.";
        platformPerformanceResourcesPromise = null;
        throw error;
      });
    }
    return platformPerformanceResourcesPromise;
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

  function renderPlatformPerformanceLazyPanel(state = {}) {
    if (platformPerformanceDisplayHelpers) {
      return platformPerformanceDisplayHelpers.renderPlatformPerformancePanel(state);
    }
    const status = platformPerformanceResourcesError || "Loading the platform command surface...";
    const toneClass = platformPerformanceResourcesError ? "status-blocked" : "status-in_progress";
    return `
      <section class="setup-card performance-resource-loading ${toneClass}" aria-live="polite">
        <h3>Platform Performance</h3>
        <p>${escapeHtml(status)}</p>
        ${platformPerformanceResourcesError ? `<button class="secondary-button" data-retry-platform-performance type="button">Retry</button>` : ""}
      </section>
    `;
  }

  function scheduleQrLibraryLoad() {
    if (windowRef.qrcode || qrLibraryPromise) return;
    const settingsNeedsQr = getActiveSection() === "settings" &&
      canManageTeam() &&
      getPublicRequestLinks().some((link) => link && link.is_active !== false);
    if (!settingsNeedsQr) return;

    ensureQrLibraryLoaded()
      .then(() => {
        if (getActiveSection() === "settings") requestWorkspaceRender();
      })
      .catch(() => {});
  }

  function scheduleConversionResourceLoad() {
    if (getActiveSection() !== "conversions" || conversionDisplayHelpers || conversionResourcesPromise) return;
    ensureConversionResourcesLoaded()
      .then(() => {
        if (getActiveSection() === "conversions") requestWorkspaceRender();
      })
      .catch(() => {
        if (getActiveSection() === "conversions") requestWorkspaceRender();
      });
  }

  function schedulePlatformPerformanceResourceLoad() {
    if (
      getActiveSection() !== "performance" ||
      platformPerformanceDisplayHelpers ||
      platformPerformanceResourcesPromise
    ) return;
    ensurePlatformPerformanceResourcesLoaded()
      .then(() => {
        if (getActiveSection() === "performance") requestWorkspaceRender();
      })
      .catch(() => {
        if (getActiveSection() === "performance") requestWorkspaceRender();
      });
  }

  return {
    clearConversionResourcesError,
    clearPlatformPerformanceResourcesError,
    ensureConversionResourcesLoaded,
    ensurePlatformPerformanceResourcesLoaded,
    ensureQrLibraryLoaded,
    getConversionDisplayHelpers,
    getPlatformPerformanceDisplayHelpers,
    hasConversionDisplayHelpers,
    hasPlatformPerformanceDisplayHelpers,
    renderConversionsLazyPanel,
    renderPlatformPerformanceLazyPanel,
    scheduleConversionResourceLoad,
    schedulePlatformPerformanceResourceLoad,
    scheduleQrLibraryLoad,
  };
}
