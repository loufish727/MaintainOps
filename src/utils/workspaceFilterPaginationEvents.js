(function () {
  /*
   * LFES contract: binds workspace filter and pagination controls only.
   * Requires app.js-owned state getters/setters plus render/reload/reset callbacks.
   * May update local filter/page state, persist matching localStorage keys, invalidate
   * exact-search cache through the injected callback, and choose render vs. read reload.
   * Must not mutate business records, change selectors, submit forms, delete, upload,
   * route auth/startup, touch Supabase/RLS, or take ownership of app.js state.
   */
  function bindWorkspaceFilterPaginationEvents(options = {}) {
    const doc = options.documentRef || document;
    const storage = options.storage || localStorage;
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
        storage.setItem("maintainops.myWorkFilter", state.getMyWorkFilter());
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-work-order-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkOrderFilter(button.dataset.workOrderFilter);
        state.setWorkOrderAssigneeFilter("");
        storage.setItem("maintainops.workOrderFilter", state.getWorkOrderFilter());
        storage.removeItem("maintainops.workOrderAssigneeFilter");
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-clear-assignee-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkOrderAssigneeFilter("");
        storage.removeItem("maintainops.workOrderAssigneeFilter");
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-work-sort]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkSort(button.dataset.workSort);
        storage.setItem("maintainops.workSort", state.getWorkSort());
        options.invalidateExactWorkOrderSearchCache();
        options.resetWorkOrderPage();
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-request-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        if (button.disabled) return;
        state.setRequestViewFilter(button.dataset.requestFilter || "active");
        storage.setItem("maintainops.requestViewFilter", state.getRequestViewFilter());
        options.resetRequestsPage();
        await options.reloadRequestQueue();
      });
    });

    doc.querySelectorAll("[data-work-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        state.setWorkOrderPage(state.getWorkOrderPage() + (button.dataset.workPage === "next" ? 1 : -1));
        storage.setItem("maintainops.workOrderPage", String(state.getWorkOrderPage()));
        await options.reloadWorkOrderQueue();
      });
    });

    doc.querySelectorAll("[data-parts-page]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setPartsPage(state.getPartsPage() + (button.dataset.partsPage === "next" ? 1 : -1));
        storage.setItem("maintainops.partsPage", String(state.getPartsPage()));
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-assets-page]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setAssetsPage(state.getAssetsPage() + (button.dataset.assetsPage === "next" ? 1 : -1));
        storage.setItem("maintainops.assetsPage", String(state.getAssetsPage()));
        options.renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-list-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        const delta = button.dataset.pageDirection === "next" ? 1 : -1;
        if (button.dataset.listPage === "requests") {
          state.setRequestsPage(state.getRequestsPage() + delta);
          storage.setItem("maintainops.requestsPage", String(state.getRequestsPage()));
          await options.reloadRequestQueue();
          return;
        }
        if (button.dataset.listPage === "schedules") {
          state.setSchedulesPage(state.getSchedulesPage() + delta);
          storage.setItem("maintainops.schedulesPage", String(state.getSchedulesPage()));
        }
        if (button.dataset.listPage === "procedures") {
          state.setProceduresPage(state.getProceduresPage() + delta);
          storage.setItem("maintainops.proceduresPage", String(state.getProceduresPage()));
        }
        if (button.dataset.listPage === "members") {
          state.setMembersPage(state.getMembersPage() + delta);
          storage.setItem("maintainops.membersPage", String(state.getMembersPage()));
        }
        options.renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceFilterPaginationEvents = {
    bindWorkspaceFilterPaginationEvents,
  };
})();
