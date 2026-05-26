(function () {
  /*
   * LFES contract: owns Team invite cancel-warning and confirm event binding only.
   * May set/clear pending invite-cancel state, clear the local cancel error,
   * render, and call the app-owned cancel callback.
   * Must not submit invite forms, touch Supabase/RLS, or own team invite data.
   */
  function bindWorkspaceTeamInviteCancelEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state || typeof options.renderWorkspace !== "function") return;

    doc.querySelectorAll("[data-cancel-invite]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setTeamInviteCancelError("");
        state.setPendingCancelInviteId(button.dataset.cancelInvite);
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-cancel-invite-cancel]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setTeamInviteCancelError("");
        state.setPendingCancelInviteId(null);
        options.renderWorkspace();
      });
    });

    if (typeof options.cancelTeamInvite === "function") {
      doc.querySelectorAll("[data-confirm-cancel-invite]").forEach((button) => {
        button.addEventListener("click", () => {
          options.cancelTeamInvite(button.dataset.confirmCancelInvite);
        });
      });
    }
  }

  window.MaintainOpsWorkspaceTeamInviteCancelEvents = {
    bindWorkspaceTeamInviteCancelEvents,
  };
})();
