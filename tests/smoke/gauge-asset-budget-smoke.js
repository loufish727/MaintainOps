const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const webpPath = path.join(root, "assets", "gauges", "gauge-status-sprite.webp");
const legacyPngPath = path.join(root, "assets", "gauges", "gauge-status-sprite.png");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

assert.equal(fs.existsSync(webpPath), true);
assert.equal(fs.statSync(webpPath).size <= 250 * 1024, true);
assert.equal(fs.existsSync(legacyPngPath), false);
assert.match(styles, /assets\/gauges\/gauge-status-sprite\.webp/);
assert.doesNotMatch(styles, /assets\/gauges\/gauge-status-sprite\.png/);

console.log("gauge asset budget smoke passed");
