const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const moduleSource = fs.readFileSync(path.join(root, "src", "appShell", "companyLocationState.js"), "utf8");

assert.match(
  appSource,
  /import\s+\{\s*createCompanyLocationStateHelpers\s*\}\s+from\s+"\.\/src\/appShell\/companyLocationState\.js"/,
  "app.js must import the company/location state helper module"
);
assert.match(
  appSource,
  /const\s+\{\s*activeLocationStorageKey,\s*readStoredActiveLocationId,\s*persistActiveLocationId,\s*activeCompanyMembership,\s*companyOptionLabel,\s*storedLocationForLoadedCompany,\s*\}\s*=\s*createCompanyLocationStateHelpers\(/s,
  "app.js must hydrate company/location state helpers from the extracted module"
);
assert.match(
  moduleSource,
  /export function createCompanyLocationStateHelpers/,
  "company/location state module must export the helper factory"
);
assert.doesNotMatch(
  appSource,
  /function activeLocationStorageKey\(/,
  "app.js must no longer inline the activeLocationStorageKey helper"
);

console.log("company location state source smoke passed");
