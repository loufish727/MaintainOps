const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "..", "styles.css"), "utf8");

const gridRule = css.match(/\.storage-dashboard-grid\s*\{[^}]+\}/)?.[0] || "";
assert.match(gridRule, /align-items:\s*start;/, "storage dashboard columns should not stretch to equal height");

const panelRule = css.match(/\.storage-breakdown,\s*\.storage-largest-files,\s*\.storage-bucket-list,\s*\.storage-file-list\s*\{[^}]+\}/)?.[0] || "";
assert.match(panelRule, /align-self:\s*start;/, "storage dashboard panels should size to their own content");

console.log("storage dashboard layout smoke passed");
