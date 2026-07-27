const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const approvals = [
  {
    file: "app.js",
    line: /^setAppHtml: \(html\) => \{ app\.innerHTML = html; \},$/,
    maxOccurrences: 2,
    reason: "Reviewed root-render dependency boundary.",
  },
  {
    file: "app.js",
    line: /^app\.innerHTML = workspaceLoading\(message\);$/,
    maxOccurrences: 1,
    reason: "Reviewed escaped loading renderer.",
  },
  {
    file: "app.js",
    line: /^app\.innerHTML = workspaceLoadError\(message\);$/,
    maxOccurrences: 1,
    reason: "Reviewed escaped load-error renderer.",
  },
  {
    file: "app.js",
    line: /^app\.innerHTML = authForm\(mode, initialError\);$/,
    maxOccurrences: 1,
    reason: "Reviewed escaped authentication renderer.",
  },
  {
    file: "app.js",
    line: /^app\.innerHTML = `$/,
    maxOccurrences: 1,
    reason: "Reviewed workspace shell renderer; dynamic text uses escapeHtml.",
  },
  {
    file: "app.js",
    line: /^slot\.innerHTML = renderAppNoticeMarkup\(\);$/,
    maxOccurrences: 1,
    reason: "Reviewed notice renderer; notice text uses escapeHtml.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^els\.headerSubtitle\.innerHTML = summary\.totalRecords === null$/,
    maxOccurrences: 1,
    reason: "Reviewed Performance renderer; dynamic value is escaped.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^els\.headerState\.innerHTML = /,
    maxOccurrences: 1,
    reason: "Reviewed Performance renderer; dynamic value is escaped.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^els\.stageReadoutStatus\.innerHTML = /,
    maxOccurrences: 1,
    reason: "Reviewed Performance renderer; dynamic value is escaped.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^row\.querySelector\("strong"\)\.innerHTML = /,
    maxOccurrences: 1,
    reason: "Reviewed Performance renderer; dynamic values are escaped.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^activityHead\.querySelector\("b"\)\.innerHTML = /,
    maxOccurrences: 1,
    reason: "Reviewed Performance renderer; dynamic value is escaped.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^document\.querySelector\("\.source-lattice-head > span"\)\.innerHTML = /,
    maxOccurrences: 1,
    reason: "Reviewed Performance renderer; dynamic value is numeric.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^document\.querySelector\("#(?:rules|month|space|files|ops)-title"\)\.innerHTML = /,
    maxOccurrences: 5,
    reason: "Reviewed fixed heading markup.",
  },
  {
    file: "src/performance/platformSpatialFrame.js",
    line: /^(?:container|els\.(?:rulesGrid|usageChart|bucketList|fileList|opsGrid|dialogDetails))\.innerHTML = /,
    maxOccurrences: 7,
    reason: "Reviewed Performance list/detail builders; text is escaped and layout values are numeric.",
  },
  {
    file: "src/utils/conversions.js",
    line: /^button\.innerHTML = active \? "&#9733;" : "&#9734;";$/,
    maxOccurrences: 1,
    reason: "Fixed numeric character entities only.",
  },
  {
    file: "src/workflows/requestLifecycleWorkflow.js",
    line: /^detailPanel\.innerHTML = deps\.renderRequestFormContent\(\);$/,
    maxOccurrences: 1,
    reason: "Reviewed request-form renderer boundary.",
  },
  {
    file: "src/services/authSessionFlow.js",
    line: /^app\.innerHTML = deps\.(?:authCallback|authCallbackError|passwordResetRequest|passwordRecovery)\(/,
    maxOccurrences: 4,
    reason: "Reviewed escaped authentication renderer boundaries.",
  },
];

function listJavaScriptFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "bundles") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listJavaScriptFiles(fullPath));
    else if (entry.isFile() && /\.(?:m?js)$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

const files = [
  path.join(root, "app.js"),
  ...listJavaScriptFiles(path.join(root, "src")),
  ...listJavaScriptFiles(path.join(root, "auth")),
];
const counts = new Map();
const violations = [];
let assignmentCount = 0;

for (const filePath of files) {
  const relativePath = path.relative(root, filePath).replaceAll("\\", "/");
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  lines.forEach((sourceLine, index) => {
    if (!/\.innerHTML\s*=/.test(sourceLine)) return;
    assignmentCount += 1;
    const trimmed = sourceLine.trim();
    const approvalIndex = approvals.findIndex(
      (approval) => approval.file === relativePath && approval.line.test(trimmed)
    );
    if (approvalIndex < 0) {
      violations.push(`${relativePath}:${index + 1}: unreviewed innerHTML assignment: ${trimmed}`);
      return;
    }
    counts.set(approvalIndex, (counts.get(approvalIndex) || 0) + 1);
  });
}

approvals.forEach((approval, index) => {
  const occurrences = counts.get(index) || 0;
  if (occurrences > approval.maxOccurrences) {
    violations.push(
      `${approval.file}: reviewed assignment pattern appeared ${occurrences} times; maximum is ${approval.maxOccurrences}.`
    );
  }
});

if (violations.length) {
  console.error("DOM HTML assignment audit failed.");
  violations.forEach((violation) => console.error(`- ${violation}`));
  console.error("Review the data source and escaping before adding a narrowly scoped approval.");
  process.exit(1);
}

console.log(`DOM HTML assignment audit passed: ${assignmentCount} reviewed first-party assignment sites.`);
