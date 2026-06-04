(function () {
  function listAppIssueReports(supabaseClient, companyId) {
    return supabaseClient
      .from("app_issue_reports")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });
  }

  function createAppIssueReportRecord(supabaseClient, payload) {
    return supabaseClient.from("app_issue_reports").insert(payload);
  }

  function updateAppIssueReportStatusRecord(supabaseClient, companyId, reportId, nextStatus) {
    return supabaseClient
      .from("app_issue_reports")
      .update({
        status: nextStatus,
        resolved_at: nextStatus === "resolved" ? new Date().toISOString() : null,
      })
      .eq("company_id", companyId)
      .eq("id", reportId);
  }

  function deleteAppIssueReportRecord(supabaseClient, companyId, reportId) {
    return supabaseClient
      .from("app_issue_reports")
      .delete()
      .eq("company_id", companyId)
      .eq("id", reportId);
  }

  window.MaintainOpsAppIssueReportsService = {
    listAppIssueReports,
    createAppIssueReportRecord,
    updateAppIssueReportStatusRecord,
    deleteAppIssueReportRecord,
  };
})();
