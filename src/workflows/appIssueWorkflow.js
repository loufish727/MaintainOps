(function () {
  function createAppIssueWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const windowRef = deps.windowRef || window;
    const FormDataCtor = deps.FormDataCtor || FormData;
    const confirmUser = deps.confirmUser || ((message) => windowRef.confirm(message));

    function bindAppIssueWorkflowEvents() {
      const appIssueReportForm = documentRef.querySelector("#app-issue-report-form");
      if (appIssueReportForm) appIssueReportForm.addEventListener("submit", createAppIssueReport);

      documentRef.querySelectorAll("[data-app-issue-status]").forEach((form) => {
        form.addEventListener("submit", updateAppIssueReportStatus);
      });

      documentRef.querySelectorAll("[data-delete-app-issue]").forEach((button) => {
        button.addEventListener("click", deleteAppIssueReport);
      });
    }

    async function reloadAppIssueReports() {
      const { data, error } = await deps.withOperationTimeout(
        deps.listAppIssueReports(deps.supabaseClient(), deps.getActiveCompanyId()),
        "App issue report load timed out. Check your connection and try again.",
        12000
      );
      deps.setAppIssueReportsReady(!error);
      deps.setAppIssueReports(error ? [] : (data || []));
      if (error) throw error;
    }

    function appIssueReportError(error) {
      const state = deps.appIssueReportErrorState(error);
      if (state.appIssueReportsReady === false) deps.setAppIssueReportsReady(false);
      return state.message;
    }

    async function createAppIssueReport(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#app-issue-report-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const payload = {
          company_id: deps.getActiveCompanyId(),
          location_id: deps.activeLocationDatabaseId(),
          reporter_id: deps.getSession().user.id,
          screen: String(form.get("screen") || deps.getActiveSection() || "workspace").slice(0, 80),
          page_url: windowRef.location.href,
          severity: String(form.get("severity") || "normal"),
          title: deps.requiredText(form.get("title"), "Short title").slice(0, 140),
          details: deps.requiredText(form.get("details"), "Details"),
          status: "open",
        };

        const { error } = await deps.withOperationTimeout(
          deps.createAppIssueReportRecord(deps.supabaseClient(), payload),
          "App issue report save timed out. Check your connection and try again.",
          15000
        );
        if (error) throw error;

        deps.setReportIssueMode(false);
        deps.showNotice("Issue report sent.");
        await reloadAppIssueReports();
        deps.renderWorkspace();
      } catch (error) {
        if (errorElement) errorElement.textContent = appIssueReportError(error);
      } finally {
        if (submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Report";
        }
      }
    }

    async function updateAppIssueReportStatus(event) {
      event.preventDefault();
      if (!deps.canManageTeam()) return;
      const formElement = event.currentTarget;
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      try {
        const nextStatus = String(form.get("status") || "open");
        const { error } = await deps.withOperationTimeout(
          deps.updateAppIssueReportStatusRecord(
            deps.supabaseClient(),
            deps.getActiveCompanyId(),
            formElement.dataset.appIssueStatus,
            nextStatus
          ),
          "Issue report status save timed out. Check your connection and try again.",
          12000
        );
        if (error) throw error;

        deps.showNotice("Issue report updated.");
        await reloadAppIssueReports();
        deps.renderWorkspace();
      } catch (error) {
        deps.showNotice(`Could not update issue report: ${appIssueReportError(error)}`, "warning");
      } finally {
        if (submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Save";
        }
      }
    }

    async function deleteAppIssueReport(event) {
      event.preventDefault();
      if (!deps.canManageTeam()) return;
      const button = event.currentTarget;
      const reportId = button.dataset.deleteAppIssue;
      if (!reportId) return;
      if (!confirmUser("Delete this app issue report? This cannot be undone.")) return;

      button.disabled = true;
      const originalText = button.textContent;
      button.textContent = "Deleting...";

      try {
        const { error } = await deps.withOperationTimeout(
          deps.deleteAppIssueReportRecord(
            deps.supabaseClient(),
            deps.getActiveCompanyId(),
            reportId
          ),
          "Issue report delete timed out. Check your connection and try again.",
          12000
        );
        if (error) throw error;

        deps.showNotice("Issue report deleted.");
        await reloadAppIssueReports();
        deps.renderWorkspace();
      } catch (error) {
        deps.showNotice(`Could not delete issue report: ${appIssueReportError(error)}`, "warning");
      } finally {
        if (button?.isConnected) {
          button.disabled = false;
          button.textContent = originalText || "Delete";
        }
      }
    }

    return {
      bindAppIssueWorkflowEvents,
      reloadAppIssueReports,
      appIssueReportError,
      createAppIssueReport,
      updateAppIssueReportStatus,
      deleteAppIssueReport,
    };
  }

  window.MaintainOpsAppIssueWorkflow = {
    createAppIssueWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createAppIssueWorkflow };
  }
})();
