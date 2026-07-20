const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const strictSource = fs.readFileSync(path.join(root, "scripts", "lfes-strict-check.js"), "utf8");
const evidenceSource = fs.readFileSync(path.join(root, "scripts", "lfes-evidence.js"), "utf8");
const securitySource = fs.readFileSync(path.join(root, "scripts", "sql-security-static-audit.js"), "utf8");
const boundarySource = fs.readFileSync(path.join(root, "scripts", "security-boundary-probe.js"), "utf8");
const indexSource = fs.readFileSync(path.join(root, "index.html"), "utf8");
const requiredWorkflow = fs.readFileSync(path.join(root, ".github", "workflows", "resource-load-smoke.yml"), "utf8");
const authenticatedWorkflow = fs.readFileSync(path.join(root, ".github", "workflows", "lfes-authenticated-proof.yml"), "utf8");

assert.equal(packageJson.scripts["test:schema:isolated"], "node scripts/isolated-schema-check.js");
assert.equal(packageJson.scripts["test:lfes:authenticated"], "node scripts/lfes-authenticated-check.js");
assert.match(strictSource, /test:schema:isolated/);
assert.match(strictSource, /verifyGeneratedBundlesClean/);
assert.match(strictSource, /authenticatedLiveProof:\s*"NOT_RUN_BY_STRICT_GATE"/);
assert.match(evidenceSource, /path\.join\(root, "lfes-evidence"\)/);
assert.doesNotMatch(evidenceSource, /test-results/);
assert.match(securitySource, /entry\.isDirectory\(\).*listSqlFiles/);
assert.match(boundarySource, /or=\(external_source\.is\.null,external_source\.neq\.public_location_qr\)&select=id/);
assert.match(requiredWorkflow, /uses:\s*actions\/upload-artifact@v6/);
assert.match(requiredWorkflow, /path:\s*lfes-evidence\//);
assert.match(authenticatedWorkflow, /environment:\s*lfes-qa/);
assert.match(authenticatedWorkflow, /LFES_SUPABASE_URL:\s*\$\{\{ secrets\.LFES_SUPABASE_URL \}\}/);
assert.match(authenticatedWorkflow, /LFES_SUPABASE_ANON_KEY:\s*\$\{\{ secrets\.LFES_SUPABASE_ANON_KEY \}\}/);
assert.match(authenticatedWorkflow, /expectedTestingHost = "fsxqrngpaseqdxijggcm\.supabase\.co"/);
assert.match(authenticatedWorkflow, /allowOriginInDirective\(indexSource, "connect-src"/);
assert.match(authenticatedWorkflow, /allowOriginInDirective\(indexSource, "img-src"/);
assert.doesNotMatch(indexSource, /fsxqrngpaseqdxijggcm\.supabase\.co/);
assert.match(authenticatedWorkflow, /MAINTAINOPS_BASE_URL:\s*http:\/\/127\.0\.0\.1:4195\//);
assert.match(authenticatedWorkflow, /node scripts\/local-static-server\.js 4195/);
assert.match(authenticatedWorkflow, /npm run test:lfes:authenticated/);
assert.match(authenticatedWorkflow, /path:\s*lfes-evidence\//);

console.log("LFES proof integration smoke passed");
