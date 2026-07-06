const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const outputPath = path.join(root, "docs", "SCRIPT_LOAD_INVENTORY.md");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseScriptSources(html) {
  const sources = [];
  const scriptTagPattern = /<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/gi;
  let match;
  while ((match = scriptTagPattern.exec(html))) {
    const [source] = match.slice(1);
    sources.push(source);
  }
  return sources;
}

function stripQuery(source) {
  return source.split("?")[0];
}

function isLocalSource(source) {
  return !/^https?:\/\//i.test(source);
}

function getLocalText(source) {
  const cleanSource = stripQuery(source);
  const filePath = path.join(root, cleanSource);
  if (!fs.existsSync(filePath)) return "";
  return readText(filePath);
}

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function findProvidedGlobals(text) {
  const globals = [];
  const patterns = [
    /\bwindow\.(MaintainOps[A-Za-z0-9_]+)\s*=/g,
    /\bwindow\["(MaintainOps[A-Za-z0-9_]+)"\]\s*=/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text))) {
      globals.push(match[1]);
    }
  }
  return uniqueSorted(globals);
}

function findConsumedGlobals(text, providedGlobals) {
  const globals = [];
  const pattern = /\bwindow\.(MaintainOps[A-Za-z0-9_]+)/g;
  let match;
  while ((match = pattern.exec(text))) {
    const name = match[1];
    if (!providedGlobals.includes(name)) {
      globals.push(name);
    }
  }
  return uniqueSorted(globals);
}

function classifySource(source, providedGlobals) {
  if (/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js/i.test(source)) {
    return {
      layer: "vendor",
      notes: "Provides `window.supabase` from jsDelivr.",
    };
  }
  if (stripQuery(source) === "supabase-config.js") {
    return {
      layer: "config",
      notes: "Provides browser-safe Supabase config globals.",
    };
  }
  if (stripQuery(source) === "app.js") {
    return {
      layer: "app shell",
      notes: "Consumes most app globals and boots the workspace.",
    };
  }
  if (!isLocalSource(source)) {
    return {
      layer: "external",
      notes: "External browser script.",
    };
  }
  if (providedGlobals.some((name) => name.includes("Service"))) return { layer: "service", notes: "" };
  if (source.includes("/workflows/")) return { layer: "workflow", notes: "" };
  if (source.includes("/render/")) return { layer: "render", notes: "" };
  if (source.includes("/utils/")) return { layer: "utility", notes: "" };
  if (source.includes("/data/")) return { layer: "data", notes: "" };
  return { layer: "local", notes: "" };
}

function buildInventory() {
  const html = readText(indexPath);
  const sources = parseScriptSources(html);
  const rows = sources.map((source, index) => {
    const text = isLocalSource(source) ? getLocalText(source) : "";
    const providedGlobals = findProvidedGlobals(text);
    const consumedGlobals = findConsumedGlobals(text, providedGlobals);
    const classification = classifySource(source, providedGlobals);
    return {
      order: index + 1,
      source,
      layer: classification.layer,
      providedGlobals,
      consumedGlobals,
      notes: classification.notes,
    };
  });

  const localRows = rows.filter((row) => isLocalSource(row.source));
  const totalProvided = uniqueSorted(localRows.flatMap((row) => row.providedGlobals));
  const totalConsumed = uniqueSorted(localRows.flatMap((row) => row.consumedGlobals));
  const appShell = rows.find((row) => stripQuery(row.source) === "app.js");

  const lines = [];
  lines.push("# Script Load Inventory");
  lines.push("");
  lines.push("Generated from `index.html` by `node scripts/script-load-inventory.js --write`.");
  lines.push("Run `npm run test:scripts:inventory` to verify this document stays in sync with the browser load order.");
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Total deferred scripts: ${rows.length}`);
  lines.push(`- Local scripts: ${localRows.length}`);
  lines.push(`- Local ` + "`window.MaintainOps...` globals provided: " + `${totalProvided.length}`);
  lines.push(`- Local ` + "`window.MaintainOps...` globals consumed: " + `${totalConsumed.length}`);
  lines.push(`- App shell source: ${appShell ? "`" + appShell.source + "`" : "not found"}`);
  lines.push("");
  lines.push("## Bundling Notes");
  lines.push("");
  lines.push("- Keep vendor and `supabase-config.js` outside the first bundling pass.");
  lines.push("- Preserve `window.MaintainOps...` globals while bundling compatibility is being introduced.");
  lines.push("- Bundle candidates should start with leaf utilities/render helpers that provide globals but consume few or none.");
  lines.push("- `app.js` should remain last until its imports are converted deliberately.");
  lines.push("");
  lines.push("## Load Order");
  lines.push("");
  lines.push("| # | Layer | Script | Provides | Consumes | Notes |");
  lines.push("|---:|---|---|---|---|---|");
  for (const row of rows) {
    const provided = row.providedGlobals.length ? row.providedGlobals.map((name) => "`" + name + "`").join("<br>") : "";
    const consumed = row.consumedGlobals.length ? row.consumedGlobals.map((name) => "`" + name + "`").join("<br>") : "";
    const notes = row.notes || "";
    lines.push(`| ${row.order} | ${row.layer} | \`${row.source}\` | ${provided} | ${consumed} | ${notes} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function main() {
  const nextContent = buildInventory();
  const shouldWrite = process.argv.includes("--write");
  if (shouldWrite) {
    fs.writeFileSync(outputPath, `${nextContent}\n`);
    console.log(`Updated ${path.relative(root, outputPath)}`);
    return;
  }

  const currentContent = fs.existsSync(outputPath) ? readText(outputPath).replace(/\r\n/g, "\n") : "";
  if (currentContent.trim() !== nextContent.trim()) {
    console.error("Script load inventory is out of date. Run `node scripts/script-load-inventory.js --write`.");
    process.exit(1);
  }
  console.log("script load inventory is current");
}

main();
