const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

assert.doesNotMatch(appSource, /Authenticated Multi-Tenant MVP/);
assert.match(appSource, /class="skip-link" href="#workspace-main"/);
assert.match(appSource, /id="workspace-main" tabindex="-1"/);
assert.match(appSource, /aria-current="page"/);
assert.match(appSource, /class="visually-hidden".*MaintainOps workspace/);
assert.match(appSource, /id="app-notice-slot"[^>]*role="status"[^>]*aria-live="polite"/);
assert.equal((appSource.match(/<h1 class="visually-hidden"/g) || []).length, 1);
assert.match(styles, /\.skip-link:focus/);
assert.match(styles, /\.visually-hidden/);

console.log("workspace accessibility static smoke passed");
