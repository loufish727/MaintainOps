(function () {
  function createAppIssueErrorDisplayHelpers(deps) {
    function appIssueReportErrorState(error) {
      if (deps.isColumnSchemaError(error, ["app_issue_reports"]) || String(error?.message || "").includes("app_issue_reports")) {
        return {
          message: "Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",
          appIssueReportsReady: false,
        };
      }
      return {
        message: error?.message || String(error),
        appIssueReportsReady: null,
      };
    }

    return {
      appIssueReportErrorState,
    };
  }

  window.MaintainOpsAppIssueErrorDisplay = {
    createAppIssueErrorDisplayHelpers,
  };
})();
