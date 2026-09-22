export function createCompanyLocationStateHelpers({
  activeLocationStorageKeyBase,
  storage,
  getActiveCompanyId,
  getSessionUserId,
  getCompanies,
  getLocations,
}) {
  function activeLocationStorageKey(companyId = getActiveCompanyId(), userId = getSessionUserId()) {
    // Older preferences could be copied from another account by the shared fallback.
    return companyId && userId
      ? `${activeLocationStorageKeyBase}:v2:${userId}:${companyId}`
      : "";
  }

  function readStoredActiveLocationId(companyId = getActiveCompanyId(), userId = getSessionUserId()) {
    const scopedKey = activeLocationStorageKey(companyId, userId);
    return scopedKey ? storage.getItem(scopedKey) || "" : "";
  }

  function persistActiveLocationId(locationId, companyId = getActiveCompanyId(), userId = getSessionUserId()) {
    const value = locationId || "";
    const scopedKey = activeLocationStorageKey(companyId, userId);
    if (!scopedKey) return;
    storage.setItem(scopedKey, value);
    storage.removeItem(activeLocationStorageKeyBase);
  }

  function activeCompanyMembership() {
    return getCompanies().find((company) => company.id === getActiveCompanyId()) || null;
  }

  function companyOptionLabel(company) {
    const companies = getCompanies();
    const name = company?.name || "Company";
    const duplicateCount = companies
      .filter((item) => String(item.name || "").trim().toLowerCase() === String(name).trim().toLowerCase())
      .length;
    return duplicateCount > 1 ? `${name} (${String(company.id || "").slice(0, 8)})` : name;
  }

  function storedLocationForLoadedCompany() {
    const locations = getLocations();
    const storedLocationId = readStoredActiveLocationId();
    if (storedLocationId && locations.some((location) => location.id === storedLocationId)) {
      return storedLocationId;
    }
    const defaultLocationId = activeCompanyMembership()?.default_location_id || "";
    if (defaultLocationId && locations.some((location) => location.id === defaultLocationId)) {
      return defaultLocationId;
    }
    return locations[0]?.id || "";
  }

  return {
    activeLocationStorageKey,
    readStoredActiveLocationId,
    persistActiveLocationId,
    activeCompanyMembership,
    companyOptionLabel,
    storedLocationForLoadedCompany,
  };
}
