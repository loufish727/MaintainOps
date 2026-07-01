(function () {
  function listAssets(supabaseClient, companyId) {
    return supabaseClient
      .from("assets")
      .select("*")
      .eq("company_id", companyId)
      .order("name");
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
