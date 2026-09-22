const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const source = fs.readFileSync(path.resolve(__dirname, "../../src/appShell/companyLocationState.js"), "utf8");
  const { createCompanyLocationStateHelpers } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const values = new Map();
  const base = "maintainops.activeLocationId";
  let user = "first-tech", company = "company-a", active = "auburn", defaultLocation = "auburn";
  let locations = [{ id: "auburn" }, { id: "riverside" }];
  const state = createCompanyLocationStateHelpers({
    activeLocationStorageKeyBase: base,
    storage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) },
    getSessionUserId: () => user, getActiveCompanyId: () => company,
    getCompanies: () => [{ id: company, default_location_id: defaultLocation }],
    getLocations: () => locations, getActiveLocationId: () => active,
  });
  assert.equal(state.storedLocationForLoadedCompany(), "auburn");
  state.persistActiveLocationId("auburn");
  user = "";
  user = "second-tech";
  defaultLocation = "riverside";
  assert.equal(state.storedLocationForLoadedCompany(), "riverside", "same-page account switch must not inherit the previous account's in-memory location");

  values.set(base, "auburn");
  values.set(`${base}:${user}:${company}`, "auburn");
  assert.equal(state.readStoredActiveLocationId(), "", "legacy selections may already have been contaminated by account switching");
  assert.equal(state.storedLocationForLoadedCompany(), "riverside");
  state.persistActiveLocationId("riverside");
  assert.equal(state.readStoredActiveLocationId(), "riverside");
  state.persistActiveLocationId("auburn");
  assert.equal(state.storedLocationForLoadedCompany(), "auburn", "explicit current-user selections survive reloads and same-user auth events");

  company = "company-b";
  assert.equal(state.storedLocationForLoadedCompany(), "riverside", "preferences are company-scoped too");
  company = "company-a";
  user = "first-tech";
  assert.equal(state.storedLocationForLoadedCompany(), "auburn", "switching back restores only that user's preference");
  user = "second-tech";
  state.persistActiveLocationId("deleted-location");
  assert.equal(state.storedLocationForLoadedCompany(), "riverside", "deleted remembered locations fall back to the assigned default");
  defaultLocation = "deleted-default";
  assert.equal(state.storedLocationForLoadedCompany(), "auburn", "missing defaults fall back to the first available location");
  locations = [];
  assert.equal(state.storedLocationForLoadedCompany(), "");
  user = "";
  const before = [...values.entries()];
  state.persistActiveLocationId("unowned");
  assert.equal(state.readStoredActiveLocationId(), "");
  assert.deepEqual([...values.entries()], before, "signed-out state must not write unowned location preferences");
  user = "second-tech";
  company = "";
  state.persistActiveLocationId("unowned");
  assert.equal(state.readStoredActiveLocationId(), "");
  assert.deepEqual([...values.entries()], before);
  console.log("company location state behavior smoke passed");
}

main().catch(error => { console.error(error); process.exitCode = 1; });
