const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

async function main() {
  const source = fs.readFileSync(path.resolve(__dirname, "../../app.js"), "utf8");
  const start = source.indexOf("async function loadCompanyData() {");
  const end = source.indexOf("function scheduleWorkspaceHydration(", start);
  assert.ok(start >= 0 && end > start);
  for (const change of ["user", "company"]) {
    let user = "original-user", resolveCore;
    const core = new Promise(resolve => { resolveCore = resolve; });
    const context = vm.createContext({
      currentRenderSessionId: () => user, activeCompanyId: "original-company",
      workspaceHydrationToken: 0, workspaceLoadWarnings: [],
      invalidatePlanningWorkOrders: () => {}, loadWorkspaceCoreData: () => core,
      supabaseClient: {}, listLocations: () => {}, listAssets: () => {},
      listParts: () => {}, listAppIssueReports: () => {}, loadWorkspaceResponse: () => {},
      locations: ["current-session-locations"], activeLocationId: "current-session-location",
      storedLocationForLoadedCompany: () => { throw Error("Stale load must not resolve the new account's location"); },
      persistActiveLocationId: () => { throw Error("Stale load must not persist a location"); },
    });
    vm.runInContext(source.slice(start, end), context);
    const loading = context.loadCompanyData();
    if (change === "user") user = "new-user";
    else context.activeCompanyId = "new-company";
    resolveCore({ locationResponse: { data: [{ id: "old-location" }] } });
    await loading;
    assert.deepEqual(Array.from(context.locations), ["current-session-locations"]);
    assert.equal(context.activeLocationId, "current-session-location");
  }
  console.log("workspace stale location load smoke passed");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
