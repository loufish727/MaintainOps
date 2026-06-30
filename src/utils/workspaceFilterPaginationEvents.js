(function () {
  /*
   * Module contract: binds workspace filter and pagination controls only.
   * Requires app.js-owned state getters/setters plus render/reload/reset callbacks.
   * May update local filter/page state, persist matching localStorage keys, invalidate
   * exact-search cache through the injected callback, and choose render vs. read reload.
   * Must not mutate business records, change selectors, submit forms, delete, upload,
   * route auth/startup, touch Supabase/RLS, or take ownership of app.js state.
   */
  function bindWorkspaceFilterPaginationEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;

    if (!state) return;

    doc.querySelectorAll("[data-status-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setActiveStatusFilter(button.dataset.statusFilter);
        options.resetWorkOrderPage();
        if (state.getActiveStatusFilter() === "requests") {
          options.resetRequestsPage();
        }
        await options.reloadWorkOrderQueue();
        if (state.getActiveStatusFilter() === "requests") await options.reloadRequestQueue();
      });
    });

    doc.querySelectorAll("[data-my-work-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setMyWorkFilter(button.dataset.myWorkFilter);
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-work-order-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkOrderFilter(button.dataset.workOrderFilter);
        state.setWorkOrderAssigneeFilter("");
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-clear-assignee-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkOrderAssigneeFilter("");
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-work-sort]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkSort(button.dataset.workSort);
        options.invalidateExactWorkOrderSearchCache();
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-request-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        if (button.disabled) return;
        state.setRequestViewFilter(button.dataset.requestFilter || "active");
        options.resetRequestsPage();
        await options.reloadRequestQueue();
      });
    });

    doc.querySelectorAll("[data-work-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkOrderPage(state.getWorkOrderPage() + (button.dataset.workPage === "next" ? 1 : -1));
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-parts-page]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPartsPage(state.getPartsPage() + (button.dataset.partsPage === "next" ? 1 : -1));
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-assets-page]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setAssetsPage(state.getAssetsPage() + (button.dataset.assetsPage === "next" ? 1 : -1));
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-list-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        const delta = button.dataset.pageDirection === "next" ? 1 : -1;
        if (button.dataset.listPage === "requests") {
          state.setRequestsPage(state.getRequestsPage() + delta);
          await options.reloadRequestQueue();
          return;
        }
        if (button.dataset.listPage === "schedules") {
          state.setSchedulesPage(state.getSchedulesPage() + delta);
        }
        if (button.dataset.listPage === "procedures") {
          state.setProceduresPage(state.getProceduresPage() + delta);
        }
        if (button.dataset.listPage === "members") {
          state.setMembersPage(state.getMembersPage() + delta);
        }
        if (button.dataset.listPage === "messages") {
          state.setMessageThreadsPage(state.getMessageThreadsPage() + delta);
        }
        if (button.dataset.listPage?.startsWith("planning-")) {
          const planningKind = button.dataset.listPage.replace("planning-", "");
          state.setPlanningPage(planningKind, state.getPlanningPage(planningKind) + delta);
        }
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceFilterPaginationEvents = {
    bindWorkspaceFilterPaginationEvents,
  };
})();
