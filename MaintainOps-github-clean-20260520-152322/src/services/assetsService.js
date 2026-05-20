(function () {
  function listAssets(supabaseClient, companyId) {
    return supabaseClient
      .from("assets")
      .select("*")
      .eq("company_id", companyId)
      .order("name");
  }

  window.MaintainOpsAssetsService = {
    listAssets,
  };
})();
