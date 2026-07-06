const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "..", "..", "styles.css"), "utf8");

const gridRule = css.match(/\.storage-dashboard-grid\s*\{[^}]+\}/)?.[0] || "";
assert.match(gridRule, /align-items:\s*start;/, "storage dashboard columns should not stretch to equal height");

const panelRule = css.match(/\.storage-breakdown,\s*\.storage-largest-files,\s*\.storage-type-counts,\s*\.storage-bucket-list,\s*\.storage-type-list,\s*\.storage-file-list\s*\{[^}]+\}/)?.[0] || "";
assert.match(panelRule, /align-self:\s*start;/, "storage dashboard panels should size to their own content");

const monthlySummaryRule = css.match(/\.storage-month-summary\s*\{[^}]+\}/)?.[0] || "";
assert.match(monthlySummaryRule, /grid-template-columns:/, "storage monthly summary should use a stable grid");

const mobileSummaryRule = css.match(/\.storage-metric-grid,\s*\.storage-month-summary,\s*\.storage-rule-list,\s*\.storage-dashboard-grid\s*\{[^}]+\}/)?.[0] || "";
assert.match(mobileSummaryRule, /grid-template-columns:\s*1fr;/, "storage monthly summary should collapse on smaller screens");

console.log("storage dashboard layout smoke passed");
