(function () {
  function createPublicUrlQrHelpers(options = {}) {
    const win = options.windowRef || window;
    const getPublicAppUrlOverride = options.getPublicAppUrlOverride || (() => "");

    function publicRequestUrl(token) {
      return publicAppUrlWithSearch(`?request=${encodeURIComponent(token)}`);
    }

    function publicRequestQrUrl(token) {
      return publicAppUrlWithSearch(`?qr=${encodeURIComponent(token)}`);
    }

    function publicAppUrlWithSearch(search) {
      const base = publicAppBaseUrl();
      if (!base) return "";
      const url = new URL(base);
      url.search = search;
      url.hash = "";
      return url.toString();
    }

    function publicAppBaseUrl() {
      const configured = getPublicAppUrlOverride() || String(win.PUBLIC_APP_URL || "").trim();
      const candidate = configured || (win.location.protocol === "https:" ? win.location.href : "");
      if (!candidate) return "";
      return normalizePublicAppUrl(candidate);
    }

    function normalizePublicAppUrl(value) {
      try {
        const url = new URL(String(value || "").trim(), win.location.href);
        if (url.protocol !== "https:") return "";
        if (!isPublicAppHost(url.hostname)) return "";
        url.search = "";
        url.hash = "";
        if (url.pathname && url.pathname !== "/" && !url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) {
          url.pathname = `${url.pathname}/`;
        }
        return url.toString();
      } catch (error) {
        return "";
      }
    }

    function isPublicAppHost(hostname) {
      const host = String(hostname || "").toLowerCase();
      if (!host || host === "localhost" || host.endsWith(".localhost")) return false;
      if (host === "127.0.0.1" || host === "::1" || host === "[::1]") return false;
      if (/^10\./.test(host) || /^192\.168\./.test(host)) return false;
      if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false;
      return true;
    }

    function qrSvgFor(value, cellSize = 4) {
      if (!win.qrcode || !value) return `<div class="qr-fallback">QR</div>`;
      try {
        const qr = win.qrcode(0, "M");
        qr.addData(value);
        qr.make();
        return qr.createSvgTag(cellSize, 0).replace("<svg", "<svg class=\"qr-code\"");
      } catch (error) {
        return `<div class="qr-fallback">QR</div>`;
      }
    }

    return {
      publicRequestUrl,
      publicRequestQrUrl,
      publicAppUrlWithSearch,
      publicAppBaseUrl,
      normalizePublicAppUrl,
      isPublicAppHost,
      qrSvgFor,
    };
  }

  window.MaintainOpsPublicUrlQr = {
    createPublicUrlQrHelpers,
  };
})();
