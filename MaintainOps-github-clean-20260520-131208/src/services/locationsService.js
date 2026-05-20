(function () {
  function listLocations(supabaseClient, companyId) {
    return supabaseClient
      .from("locations")
      .select("*")
      .eq("company_id", companyId)
      .order("name");
  }

  function createLocation(supabaseClient, companyId, name) {
    return supabaseClient
      .from("locations")
      .insert({ company_id: companyId, name })
      .select("id")
      .single();
  }

  window.MaintainOpsLocationsService = {
    listLocations,
    createLocation,
  };
})();
