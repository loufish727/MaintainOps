const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");

const appSource = fs.readFileSync(path.join(__dirname, "..", "..", "app.js"), "utf8");

assert.match(appSource, /function loadWorkspaceResponse\(label, promise, timeoutMs = 12000\)/);
assert.match(appSource, /function runWorkspaceLoader\(label, loader, timeoutMs = 12000\)/);
assert.match(appSource, /function scheduleWorkspaceHydration\(\)/);
assert.match(appSource, /loadWorkspaceResponse\("Work orders", loadServerWorkOrderSlice\(\), 16000\)/);
assert.match(appSource, /runWorkspaceLoader\("Messages", loadMessageCenter\)/);
assert.match(appSource, /runWorkspaceLoader\("Work photos", loadPhotos\)/);
assert.match(appSource, /Some workspace data loaded slowly:/);

console.log("workspace load timeout guard smoke passed");
