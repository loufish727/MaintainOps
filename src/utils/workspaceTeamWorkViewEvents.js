(function () {
  /*
   * Module contract: owns Team -> View Work event binding only.
   * Requires app.js-owned state setters, page reset, storage, and render callback.
   * May switch to Work Orders, apply the selected assignee filter, clear detail/form modes,
   * persist active section and assignee filter, reset the work page, and render.
   * Must not mutate business records, submit forms, delete, upload, touch Supabase/RLS,
   * or take ownership of auth/company/location state.
   */
  function bindWorkspaceTeamWorkViewEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state) return;

    doc.querySelectorAll("[data-view-member-work]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setWorkOrderAssigneeFilter(button.dataset.viewMemberWork);
        state.setActiveSection("work");
        state.setActiveStatusFilter("active");
        state.setActiveWorkOrderId(null);
        state.setActiveAssetId(null);
        state.setCreateWorkOrderMode(false);
        state.setQuickFixMode(false);
        options.resetWorkOrderPage();
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceTeamWorkViewEvents = {
    bindWorkspaceTeamWorkViewEvents,
  };
})();
