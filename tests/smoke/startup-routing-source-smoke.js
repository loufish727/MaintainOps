const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const startupRoutingSource = fs.readFileSync(path.join(root, "src", "appShell", "startupRouting.js"), "utf8");

assert.match(appSource, /import\s+\{[\s\S]*initializeStartupRoute[\s\S]*\}\s+from "\.\/src\/appShell\/startupRouting\.js";/);
assert.match(appSource, /await initializeStartupRoute\(/, "app.js must delegate initial route branching to the startup routing module");
assert.match(startupRoutingSource, /export async function initializeStartupRoute\(/, "startup routing module must expose initializeStartupRoute");
assert.match(startupRoutingSource, /export function publicRequestTokenFromUrl\(/, "startup routing module must own public request token parsing");
assert.match(startupRoutingSource, /export function publicRequestQrTokenFromUrl\(/, "startup routing module must own QR token parsing");
assert.match(appSource, /renderWorkspaceLoading\("Checking sign-in\.\.\."\);/, "startup should show a non-editable sign-in check");
assert.doesNotMatch(
  startupRoutingSource,
  /\brenderAuth\("login"\)/,
  "startup routing must not render an editable login form before getSession settles"
);

console.log("startup routing source smoke passed");
