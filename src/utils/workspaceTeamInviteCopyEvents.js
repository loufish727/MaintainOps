(function () {
  /*
   * Module contract: owns Team invite copy-message UI binding only.
   * Requires an injected clipboard copy callback. May update temporary button text.
   * Must not create/cancel invites, touch Supabase/RLS, or own team invite data.
   */
  function bindWorkspaceTeamInviteCopyEvents(options = {}) {
    const doc = options.documentRef || document;
    const copyTextToClipboard = options.copyTextToClipboard;
    const setTimer = options.setTimeoutRef || setTimeout;
    const resetDelayMs = Number.isFinite(options.resetDelayMs) ? options.resetDelayMs : 1600;

    if (typeof copyTextToClipboard !== "function") return;

    doc.querySelectorAll("[data-copy-team-invite]").forEach((button) => {
      button.addEventListener("click", async () => {
        const copied = await copyTextToClipboard(button.dataset.copyTeamInvite || "");
        button.textContent = copied ? "Copied" : "Copy failed";
        setTimer(() => {
          button.textContent = "Copy Invite";
        }, resetDelayMs);
      });
    });
  }

  window.MaintainOpsWorkspaceTeamInviteCopyEvents = {
    bindWorkspaceTeamInviteCopyEvents,
  };
})();
