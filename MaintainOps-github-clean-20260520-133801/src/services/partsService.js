(function () {
  function listParts(supabaseClient, companyId) {
    return supabaseClient
      .from("parts")
      .select("*")
      .eq("company_id", companyId)
      .order("name");
  }

  window.MaintainOpsPartsService = {
    listParts,
  };
})();
