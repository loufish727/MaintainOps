(function () {
  function listAppIssueReports(supabaseClient, companyId) {
    return supabaseClient
      .from("app_issue_reports")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });
  }

  window.MaintainOpsAppIssueReportsService = {
    listAppIssueReports,
  };
})();
