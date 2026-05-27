(function () {
  function createPublicRequestTokenHelpers(options = {}) {
    const win = options.windowRef || window;

    function base64UrlEncodeBytes(bytes) {
      const binary = String.fromCharCode(...bytes);
      const encode = typeof win.btoa === "function"
        ? win.btoa.bind(win)
        : typeof btoa === "function"
          ? btoa
          : null;

      if (!encode) {
        return "";
      }

      return encode(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
    }

    function generatePublicRequestToken() {
      if (win.crypto?.getRandomValues) {
        const bytes = new Uint8Array(18);
        win.crypto.getRandomValues(bytes);
        return base64UrlEncodeBytes(bytes);
      }

      return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    }

    return {
      generatePublicRequestToken,
    };
  }

  window.MaintainOpsPublicRequestTokens = createPublicRequestTokenHelpers();

  if (typeof module !== "undefined") {
    module.exports = { createPublicRequestTokenHelpers };
  }
})();
