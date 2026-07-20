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
    const win = options.windowRef || (typeof window !== "undefined" ? window : null);

    if (!state) return;

    function restoreScroll(top) {
      if (!win || typeof win.scrollTo !== "function") return;
      win.scrollTo({ top, behavior: "auto" });
    }

    async function preserveScroll(action) {
      const top = Number(win?.scrollY ?? win?.pageYOffset ?? 0);
      await action();
      if (!win || typeof win.scrollTo !== "function") return;
      if (typeof win.requestAnimationFrame === "function") {
        win.requestAnimationFrame(() => restoreScroll(top));
        return;
      }
      restoreScroll(top);
    }

    doc.querySelectorAll("[data-status-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setActiveStatusFilter(button.dataset.statusFilter);
          options.resetWorkOrderPage();
          if (state.getActiveStatusFilter() === "requests") {
            options.resetRequestsPage();
          }
          await options.reloadWorkOrderQueue();
          if (state.getActiveStatusFilter() === "requests") await options.reloadRequestQueue();
        });
      });
    });

    doc.querySelectorAll("[data-my-work-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setMyWorkFilter(button.dataset.myWorkFilter);
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-order-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setWorkOrderFilter(button.dataset.workOrderFilter);
          state.setWorkOrderAssigneeFilter("");
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-status-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          state.setActiveStatusFilter(field.value || "active");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-assignment-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          const assignment = field.value || "all";
          state.setWorkOrderFilter(assignment);
          if (assignment !== "assigned") state.setWorkOrderAssigneeFilter("");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-assignee-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          const assigneeId = field.value || "";
          state.setWorkOrderAssigneeFilter(assigneeId);
          if (assigneeId) state.setWorkOrderFilter("assigned");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-type-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          state.setWorkOrderTypeFilter(field.value || "all");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-priority-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          state.setWorkOrderPriorityFilter(field.value || "all");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-clear-assignee-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setWorkOrderAssigneeFilter("");
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-sort]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setWorkSort(button.dataset.workSort);
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-sort-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          state.setWorkSort(field.value || "newest");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-group-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          state.setWorkGroup(field.value || "none");
          options.renderWorkspace();
        });
      });
    });

    doc.querySelectorAll("[data-clear-work-filters]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setActiveStatusFilter("active");
          state.setWorkOrderFilter("all");
          state.setWorkOrderAssigneeFilter("");
          state.setWorkOrderTypeFilter("all");
          state.setWorkOrderPriorityFilter("all");
          state.setWorkSort("newest");
          state.setWorkGroup("none");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-assignee-sort-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          state.setWorkOrderAssigneeFilter(field.value || "");
          options.invalidateExactWorkOrderSearchCache();
          options.resetWorkOrderPage();
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-request-filter]").forEach((button) => {
      button.addEventListener("click", async () => {
        if (button.disabled) return;
        await preserveScroll(async () => {
          state.setRequestViewFilter(button.dataset.requestFilter || "active");
          options.resetRequestsPage();
          await options.reloadRequestQueue();
        });
      });
    });

    doc.querySelectorAll("[data-work-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setWorkOrderPage(state.getWorkOrderPage() + (button.dataset.workPage === "next" ? 1 : -1));
          await options.reloadWorkOrderQueue();
        });
      });
    });

    doc.querySelectorAll("[data-parts-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setPartsPage(state.getPartsPage() + (button.dataset.partsPage === "next" ? 1 : -1));
          options.renderWorkspace();
        });
      });
    });

    doc.querySelectorAll("[data-assets-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setAssetsPage(state.getAssetsPage() + (button.dataset.assetsPage === "next" ? 1 : -1));
          options.renderWorkspace();
        });
      });
    });

    doc.querySelectorAll("[data-financial-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
          state.setFinancialPage(state.getFinancialPage() + (button.dataset.financialPage === "next" ? 1 : -1));
          options.renderWorkspace();
        });
      });
    });

    doc.querySelectorAll("[data-financial-filter]").forEach((field) => {
      field.addEventListener("change", async () => {
        await preserveScroll(async () => {
          if (field.dataset.financialFilter === "missing") state.setFinancialMissingFilter(field.value);
          if (field.dataset.financialFilter === "location") state.setFinancialLocationFilter(field.value);
          if (field.dataset.financialFilter === "type") state.setFinancialTypeFilter(field.value);
          if (field.dataset.financialFilter === "area") state.setFinancialAreaFilter(field.value);
          state.resetFinancialPage();
          options.renderWorkspace();
        });
      });
    });

    doc.querySelectorAll("[data-list-page]").forEach((button) => {
      button.addEventListener("click", async () => {
        await preserveScroll(async () => {
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
    });

    doc.querySelectorAll("[data-planning-group]").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (typeof state.setPlanningGroupOpen !== "function") return;
        state.setPlanningGroupOpen(details.dataset.planningGroup, Boolean(details.open));
      });
    });
  }

  window.MaintainOpsWorkspaceFilterPaginationEvents = {
    bindWorkspaceFilterPaginationEvents,
  };
})();
