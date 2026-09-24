(function () {
  function listAssets(supabaseClient, companyId) {
    return window.MaintainOpsMaintenanceWorkspaceRows.loadCompleteWorkspaceRows("Equipment", () => supabaseClient
      .from("assets")
      .select("*", { count: "exact" })
      .eq("company_id", companyId)
      .order("name")
      .order("id"));
  }

  function listAssetFinancials(supabaseClient, companyId) {
    return supabaseClient
      .from("asset_financials")
      .select("*")
      .eq("company_id", companyId)
      .order("updated_at", { ascending: false });
  }

  window.MaintainOpsAssetsService = {
    listAssets,
    listAssetFinancials,
  };
})();
