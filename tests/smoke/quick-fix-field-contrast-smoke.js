const fs = require("fs");
const path = require("path");
const assert = require("assert");

const styles = fs.readFileSync(path.join(__dirname, "..", "..", "styles.css"), "utf8");

assert.match(styles, /\.quick-fix-form input\[name="title"\]\s*{[^}]*color:\s*var\(--field-ink\);/s);
assert.match(styles, /\.quick-fix-form input,\s*\.quick-fix-form select,\s*\.quick-fix-form textarea\s*{[^}]*color:\s*var\(--field-ink\);/s);
assert.match(styles, /\.quick-fix-form input,\s*\.quick-fix-form select,\s*\.quick-fix-form textarea\s*{[^}]*caret-color:\s*var\(--field-ink\);/s);
assert.match(styles, /\.quick-fix-form input:not\(\[type="checkbox"\]\):not\(\[type="file"\]\),\s*\.quick-fix-form textarea\s*{[^}]*color:\s*#f5fbf8 !important;/s);
assert.match(styles, /\.quick-fix-form input:not\(\[type="checkbox"\]\):not\(\[type="file"\]\),\s*\.quick-fix-form textarea\s*{[^}]*-webkit-text-fill-color:\s*#f5fbf8;/s);

console.log("quick fix field contrast smoke passed");
