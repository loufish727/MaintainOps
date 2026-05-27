(function () {
  /*
   * Module contract: owns public request link copy-button UI binding only.
   * Requires an injected clipboard copy callback. May update temporary button text.
   * Must not create, enable, disable, regenerate links, touch Supabase/RLS,
   * or own public request link data.
   */
  function bindWorkspacePublicRequestLinkCopyEvents(options = {}) {
    const doc = options.documentRef || document;
    const copyTextToClipboard = options.copyTextToClipboard;
    const setTimer = options.setTimeoutRef || setTimeout;
    const resetDelayMs = Number.isFinite(options.resetDelayMs) ? options.resetDelayMs : 1600;

    if (typeof copyTextToClipboard !== "function") return;

    doc.querySelectorAll("[data-copy-public-request-link]").forEach((button) => {
      button.addEventListener("click", async () => {
        const copied = await copyTextToClipboard(button.dataset.copyPublicRequestLink);
        button.textContent = copied ? "Copied" : "Copy failed";
        setTimer(() => {
          button.textContent = "Copy QR Link";
        }, resetDelayMs);
      });
    });
  }

  window.MaintainOpsWorkspacePublicRequestLinkCopyEvents = {
    bindWorkspacePublicRequestLinkCopyEvents,
  };
})();
