(function () {
  /*
   * Module contract: binds manager dashboard drill-in controls only.
   * May update manager dashboard UI state and re-render workspace.
   * Must not mutate work records, submit forms, call Supabase, change roles,
   * alter auth/session startup, upload files, or own app.js state.
   */
  function bindWorkspaceManagerDashboardEvents(options = {}) {
    const doc = options.documentRef || document;
    const state = options.state;
    const renderWorkspace = typeof options.renderWorkspace === "function" ? options.renderWorkspace : () => {};
    const win = options.windowRef || (typeof window !== "undefined" ? window : null);
    const storage = options.storage || (typeof localStorage !== "undefined" ? localStorage : null);

    if (!state) return;

    function scrollToDrillIn() {
      const target = doc.querySelector("[data-manager-drill-in]");
      if (!target || typeof target.scrollIntoView !== "function") return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    doc.querySelectorAll("[data-manager-drill-user][data-manager-drill-metric]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setManagerDashboardUserId(button.dataset.managerDrillUser || "");
        state.setManagerDashboardMetric(button.dataset.managerDrillMetric || "open");
        renderWorkspace();
        if (win && typeof win.requestAnimationFrame === "function") {
          win.requestAnimationFrame(scrollToDrillIn);
          return;
        }
        scrollToDrillIn();
      });
    });

    doc.querySelectorAll("[data-manager-drill-clear]").forEach((button) => {
      button.addEventListener("click", () => {
        state.setManagerDashboardUserId("");
        state.setManagerDashboardMetric("open");
        renderWorkspace();
      });
    });

    doc.querySelectorAll("[data-manager-request-jump]").forEach((item) => {
      item.addEventListener("click", () => {
        if (typeof state.setActiveSection === "function") {
          state.setActiveSection("requests");
          storage?.setItem?.("maintainops.activeSection", "requests");
        }
        if (typeof state.setRequestViewFilter === "function") {
          state.setRequestViewFilter(item.dataset.managerRequestJump === "converted" ? "converted" : "active");
        }
        renderWorkspace();
      });
    });
  }

  window.MaintainOpsWorkspaceManagerDashboardEvents = {
    bindWorkspaceManagerDashboardEvents,
  };

  if (typeof module !== "undefined") {
    module.exports = { bindWorkspaceManagerDashboardEvents };
  }
})();
