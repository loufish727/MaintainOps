(function () {
  function listProfiles(supabaseClient, companyId) {
    return supabaseClient
      .from("profiles")
      .select("user_id, full_name, mobile_tech")
      .eq("company_id", companyId);
  }

  function listCompanyMembers(supabaseClient, companyId) {
    return supabaseClient
      .from("company_members")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: true });
  }

  function listTeamInvites(supabaseClient, companyId) {
    return supabaseClient
      .from("company_invites")
      .select("id, email, role, invited_by, accepted_at, created_at, default_location_id")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });
  }

  function listTeamInvitesLegacy(supabaseClient, companyId) {
    return supabaseClient
      .from("company_invites")
      .select("id, email, role, invited_by, accepted_at, created_at")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });
  }

  window.MaintainOpsProfilesService = {
    listProfiles,
    listCompanyMembers,
    listTeamInvites,
    listTeamInvitesLegacy,
  };
})();
