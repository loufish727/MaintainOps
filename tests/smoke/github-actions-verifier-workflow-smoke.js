const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const verifier = fs.readFileSync(path.join(root, "scripts", "verify-github-actions-run.js"), "utf8");
const workflow = fs.readFileSync(path.join(root, ".github", "workflows", "hosted-resource-smoke.yml"), "utf8");

const workflowName = workflow.match(/^name:\s*(.+)$/m)?.[1]?.trim();
assert.ok(workflowName, "hosted smoke workflow must declare a name");
assert.match(verifier, new RegExp(`MAINTAINOPS_ACTION_WORKFLOW \\|\\| ${JSON.stringify(workflowName)}`));

console.log("GitHub Actions verifier workflow-name smoke passed");
