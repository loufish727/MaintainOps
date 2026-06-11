const fs = require("node:fs");
const path = require("node:path");

const indexPath = path.join(process.cwd(), "index.html");
const tag = process.argv[2];
const files = process.argv.slice(3).map((file) => file.replaceAll("\\", "/"));

if (!tag || !files.length) {
  console.error("Usage: node scripts/bump-cache-tags.js <tag> <file...>");
  console.error("Example: node scripts/bump-cache-tags.js mo-build-20260611-join-links-3 app.js src/workflows/teamWorkflow.js");
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");
let changed = 0;

for (const file of files) {
  const escapedFile = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(src=["']${escapedFile})(?:\\?v=[^"']*)?(["'])`, "g");
  html = html.replace(pattern, (_match, start, quote) => {
    changed += 1;
    return `${start}?v=${tag}${quote}`;
  });
}

if (!changed) {
  console.error("No matching script tags were found.");
  process.exit(1);
}

fs.writeFileSync(indexPath, html);
console.log(`Updated ${changed} cache tag${changed === 1 ? "" : "s"} to ${tag}.`);
