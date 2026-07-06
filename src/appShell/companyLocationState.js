export function createCompanyLocationStateHelpers({
  activeLocationStorageKeyBase,
  storage,
  getActiveCompanyId,
  getSessionUserId,
  getCompanies,
  getLocations,
  getActiveLocationId,
}) {
  function activeLocationStorageKey(companyId = getActiveCompanyId(), userId = getSessionUserId()) {
    return companyId && userId
      ? `${activeLocationStorageKeyBase}:${userId}:${companyId}`
      : activeLocationStorageKeyBase;
  }

  function readStoredActiveLocationId(companyId = getActiveCompanyId(), userId = getSessionUserId()) {
    const scopedKey = activeLocationStorageKey(companyId, userId);
    if (scopedKey !== activeLocationStorageKeyBase) {
      const scopedValue = storage.getItem(scopedKey);
      if (scopedValue) return scopedValue;
    }
    return storage.getItem(activeLocationStorageKeyBase) || "";
  }

  function persistActiveLocationId(locationId, companyId = getActiveCompanyId(), userId = getSessionUserId()) {
    const value = locationId || "";
    const scopedKey = activeLocationStorageKey(companyId, userId);
    if (scopedKey !== activeLocationStorageKeyBase) {
      storage.setItem(scopedKey, value);
      storage.removeItem(activeLocationStorageKeyBase);
      return;
    }
    storage.setItem(activeLocationStorageKeyBase, value);
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
    const scopedKey = activeLocationStorageKey();
    const scopedLocationId = scopedKey !== activeLocationStorageKeyBase ? storage.getItem(scopedKey) : "";
    if (scopedLocationId && locations.some((location) => location.id === scopedLocationId)) {
      return scopedLocationId;
    }
    const storedLocationId = readStoredActiveLocationId();
    if (storedLocationId && locations.some((location) => location.id === storedLocationId)) {
      return storedLocationId;
    }
    const activeLocationId = getActiveLocationId();
    if (activeLocationId && locations.some((location) => location.id === activeLocationId)) {
      return activeLocationId;
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
