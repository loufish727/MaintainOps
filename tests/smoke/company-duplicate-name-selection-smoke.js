const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

const appSource = readFileSync("app.js", "utf8");
const loadCompaniesMatch = appSource.match(/async function loadCompanies\(\) \{[\s\S]*?async function loadCompaniesFromMembershipRows/);
assert.ok(loadCompaniesMatch, "loadCompanies source should be present");
assert.doesNotMatch(loadCompaniesMatch[0], /seenCompanies/, "loadCompanies must not collapse memberships with duplicate company names");

const fallbackLoaderMatch = appSource.match(/async function loadCompaniesFromMembershipRows\(memberships\) \{[\s\S]*?async function loadCompanyLogoUrls/);
assert.ok(fallbackLoaderMatch, "loadCompaniesFromMembershipRows source should be present");
assert.doesNotMatch(fallbackLoaderMatch[0], /seenCompanies/, "fallback company loading must not collapse duplicate company names");

assert.match(appSource, /function companyOptionLabel\(company\)/, "company options should have a disambiguating label helper");
assert.match(appSource, /companyOptionLabel\(company\)/, "company select should render the disambiguated company label");
assert.match(appSource, /duplicateCount > 1 \? `\$\{name\} \(\$\{String\(company\.id \|\| ""\)\.slice\(0, 8\)\}\)` : name/, "duplicate company names should show an id suffix");

console.log("company duplicate name selection smoke passed");
