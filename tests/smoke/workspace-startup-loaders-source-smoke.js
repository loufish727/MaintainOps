const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const startupLoaderSource = fs.readFileSync(path.join(root, "src", "appShell", "workspaceStartupLoaders.js"), "utf8");

assert.match(appSource, /import\s+\{[\s\S]*createWorkspaceStartupLoaders,[\s\S]*loadWorkspaceCoreData[\s\S]*\}\s+from "\.\/src\/appShell\/workspaceStartupLoaders\.js";/);
assert.match(appSource, /const coreData = await loadWorkspaceCoreData\(/, "app.js must delegate core workspace startup reads");
assert.match(appSource, /const startupLoaders = createWorkspaceStartupLoaders\(/, "app.js must build startup loader plans through the module");
assert.match(startupLoaderSource, /export async function loadWorkspaceCoreData\(/, "workspace startup loader module must expose loadWorkspaceCoreData");
assert.match(startupLoaderSource, /export function createWorkspaceStartupLoaders\(/, "workspace startup loader module must expose loader plan creation");

console.log("workspace startup loaders source smoke passed");
