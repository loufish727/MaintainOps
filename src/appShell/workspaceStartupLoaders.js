export async function loadWorkspaceCoreData({
  activeCompanyId,
  supabaseClient,
  listLocations,
  listAssets,
  listParts,
  listAppIssueReports,
  loadWorkspaceResponse,
}) {
  const [locationResponse, assetResponse, scheduleResponse, partsResponse, procedureResponse, issueReportResponse] = await Promise.all([
    loadWorkspaceResponse("Locations", listLocations(supabaseClient, activeCompanyId)),
    loadWorkspaceResponse("Equipment", listAssets(supabaseClient, activeCompanyId)),
    loadWorkspaceResponse("PM schedules", supabaseClient
      .from("preventive_schedules")
      .select("*, assets(name, location_id)")
      .eq("company_id", activeCompanyId)
      .order("next_due_at", { ascending: true })),
    loadWorkspaceResponse("Parts", listParts(supabaseClient, activeCompanyId)),
    loadWorkspaceResponse("Procedure checklists", supabaseClient
      .from("procedure_templates")
      .select("*, procedure_steps(*)")
      .eq("company_id", activeCompanyId)
      .order("name")),
    loadWorkspaceResponse("App issue reports", listAppIssueReports(supabaseClient, activeCompanyId)),
  ]);

  return {
    assetResponse,
    issueReportResponse,
    locationResponse,
    partsResponse,
    procedureResponse,
    scheduleResponse,
  };
}

export function createWorkspaceStartupLoaders({
  activeSection,
  activeWorkOrderId,
  activeAssetId,
}) {
  const relatedLoaders = [
    ["Comments", "loadComments"],
    ["Work photos", "loadPhotos"],
    ["Parts used", "loadPartsUsed"],
    ["Equipment parts", "loadAssetParts"],
    ["Equipment files", "loadAssetDocuments"],
    ["Part files", "loadPartDocuments"],
    ["Checklist results", "loadStepResults"],
    ["Work history", "loadWorkOrderEvents"],
    ["Equipment history", "loadAssetEvents"],
  ];

  const immediateLoaders = [];
  if (activeSection === "messages") immediateLoaders.push(["Messages", "loadMessageCenter"]);
  if (activeSection === "settings") immediateLoaders.push(["Public request links", "loadPublicRequestLinks"]);
  if (activeSection === "setup") immediateLoaders.push(["Storage dashboard", "loadStorageDashboard"]);
  if (activeSection === "requests") immediateLoaders.push(["Request photos", "addSignedRequestPhotoUrls"]);
  if (activeSection === "team") immediateLoaders.push(["Team workloads", "loadTeamWorkOrders"]);
  if (activeWorkOrderId || activeAssetId || activeSection === "parts") {
    immediateLoaders.push(...relatedLoaders);
  }

  const hydrationLoaders = [
    ["Messages", "loadMessageCenter"],
    ["Public request links", "loadPublicRequestLinks"],
    ["Request photos", "addSignedRequestPhotoUrls"],
    ...relatedLoaders,
  ];

  return {
    hydrationLoaders,
    immediateLoaders,
  };
}
