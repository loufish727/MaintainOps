(function () {
  function listAppIssueReports(supabaseClient, companyId) {
    return supabaseClient
      .from("app_issue_reports")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });
  }

  async function createAppIssueReportRecord(supabaseClient, payload) {
    const result = await supabaseClient.from("app_issue_reports").insert(payload);
    if (result.error?.code !== "23505" || !payload.id) return result;
    // A timed-out insert may already have committed both report and relay.
    const existing = await supabaseClient.from("app_issue_reports").select("*")
      .eq("id", payload.id).eq("company_id", payload.company_id).eq("reporter_id", payload.reporter_id).maybeSingle();
    const fields = ["company_id", "reporter_id", "location_id", "screen", "page_url", "severity", "title", "details"];
    return !existing.error && existing.data && fields.every((key) => (existing.data[key] ?? null) === (payload[key] ?? null))
      ? { data: existing.data, error: null } : result;
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
