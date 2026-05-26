(function () {
  /*
   * LFES contract: owns Team invite cancel-warning UI binding only.
   * May set/clear pending invite-cancel state, clear the local cancel error,
   * and render. Must not confirm/cancel invites, submit invite forms,
   * touch Supabase/RLS, or own team invite data.
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
  }

  window.MaintainOpsWorkspaceTeamInviteCancelEvents = {
    bindWorkspaceTeamInviteCancelEvents,
  };
})();
