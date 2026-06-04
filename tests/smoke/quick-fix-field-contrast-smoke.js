const fs = require("fs");
const path = require("path");
const assert = require("assert");

const styles = fs.readFileSync(path.join(__dirname, "..", "..", "styles.css"), "utf8");

assert.match(styles, /\.quick-fix-form input\[name="title"\]\s*{[^}]*color:\s*var\(--field-ink\);/s);
assert.match(styles, /\.quick-fix-form input,\s*\.quick-fix-form select,\s*\.quick-fix-form textarea\s*{[^}]*color:\s*var\(--field-ink\);/s);
assert.match(styles, /\.quick-fix-form input,\s*\.quick-fix-form select,\s*\.quick-fix-form textarea\s*{[^}]*caret-color:\s*var\(--field-ink\);/s);

console.log("quick fix field contrast smoke passed");
