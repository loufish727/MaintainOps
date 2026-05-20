(function () {
  function getMyCompanies(supabaseClient) {
    return supabaseClient.rpc("get_my_companies");
  }

  function listUserCompanyMemberships(supabaseClient, userId) {
    return supabaseClient
      .from("company_members")
      .select("company_id, role, default_location_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
  }

  function listUserCompanyMembershipsLegacy(supabaseClient, userId) {
    return supabaseClient
      .from("company_members")
      .select("company_id, role")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
  }

  function listCompaniesByIds(supabaseClient, companyIds) {
    return supabaseClient
      .from("companies")
      .select("id, name, logo_path, created_at")
      .in("id", companyIds)
      .order("created_at", { ascending: true });
  }

  function listCompaniesByIdsLegacy(supabaseClient, companyIds) {
    return supabaseClient
      .from("companies")
      .select("id, name, created_at")
      .in("id", companyIds)
      .order("created_at", { ascending: true });
  }

  window.MaintainOpsCompanyService = {
    getMyCompanies,
    listUserCompanyMemberships,
    listUserCompanyMembershipsLegacy,
    listCompaniesByIds,
    listCompaniesByIdsLegacy,
  };
})();
