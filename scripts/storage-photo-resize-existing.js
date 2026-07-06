// Dry-run or resize existing MaintainOps storage images.
//
// Defaults are non-destructive:
//   node scripts/storage-photo-resize-existing.js
//   node scripts/storage-photo-resize-existing.js --source=local
//
// Live execution requires the Supabase service role key and an explicit flag:
//   set MAINTAINOPS_SERVICE_ROLE_KEY=...
//   node scripts/storage-photo-resize-existing.js --source=remote --execute
//
// Optional flags:
//   --buckets=asset-documents,part-documents,work-order-photos,maintenance-request-photos
//   --limit=25
//   --min-bytes=1048576
//   --local-dir=C:\Users\louie\Documents\MaintainOps-backups\storage
//   --json

const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const SUPABASE_URL = (process.env.SUPABASE_URL || "https://lbphkzznvvumemdkqoay.supabase.co").replace(/\/+$/, "");
const SERVICE_KEY = process.env.MAINTAINOPS_SERVICE_ROLE_KEY || "";
const DEFAULT_LOCAL_DIR = path.join(process.env.USERPROFILE || process.env.HOME || ".", "Documents", "MaintainOps-backups", "storage");
const DEFAULT_BUCKETS = ["asset-documents", "part-documents", "work-order-photos", "maintenance-request-photos"];
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const BUCKET_OPTIONS = {
  "asset-documents": {
    targetBytes: 1 * 1024 * 1024,
    passes: [
      { maxDimension: 2000, quality: 0.82 },
      { maxDimension: 1800, quality: 0.78 },
      { maxDimension: 1600, quality: 0.74 },
    ],
  },
  "part-documents": {
    targetBytes: 1 * 1024 * 1024,
    passes: [
      { maxDimension: 2000, quality: 0.82 },
      { maxDimension: 1800, quality: 0.78 },
      { maxDimension: 1600, quality: 0.74 },
    ],
  },
  "work-order-photos": {
    targetBytes: 256 * 1024,
    passes: [
      { maxDimension: 768, quality: 0.78 },
      { maxDimension: 768, quality: 0.74 },
      { maxDimension: 768, quality: 0.70 },
    ],
  },
  "maintenance-request-photos": {
    targetBytes: 256 * 1024,
    passes: [
      { maxDimension: 768, quality: 0.78 },
      { maxDimension: 768, quality: 0.74 },
      { maxDimension: 768, quality: 0.70 },
    ],
  },
};

function parseArgs(argv = process.argv.slice(2), env = process.env) {
  const serviceKey = env.MAINTAINOPS_SERVICE_ROLE_KEY || "";
  const options = {
    buckets: [...DEFAULT_BUCKETS],
    dryRun: true,
    execute: false,
    json: false,
    limit: 0,
    localDir: env.MAINTAINOPS_STORAGE_MIRROR || DEFAULT_LOCAL_DIR,
    minBytes: 0,
    source: serviceKey ? "remote" : "local",
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--execute") {
      options.execute = true;
      options.dryRun = false;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
      options.execute = false;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg.startsWith("--source=")) {
      options.source = arg.slice("--source=".length).trim();
    } else if (arg.startsWith("--buckets=")) {
      options.buckets = arg.slice("--buckets=".length).split(",").map((item) => item.trim()).filter(Boolean);
    } else if (arg.startsWith("--limit=")) {
      options.limit = Math.max(0, Number.parseInt(arg.slice("--limit=".length), 10) || 0);
    } else if (arg.startsWith("--min-bytes=")) {
      options.minBytes = Math.max(0, Number.parseInt(arg.slice("--min-bytes=".length), 10) || 0);
    } else if (arg.startsWith("--local-dir=")) {
      options.localDir = arg.slice("--local-dir=".length);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!["local", "remote"].includes(options.source)) {
    throw new Error("--source must be local or remote.");
  }
  for (const bucket of options.buckets) {
    if (!BUCKET_OPTIONS[bucket]) throw new Error(`Unsupported bucket: ${bucket}`);
  }
  if (options.execute && options.source !== "remote") {
    throw new Error("--execute requires --source=remote.");
  }
  if (options.source === "remote" && !serviceKey) {
    throw new Error("MAINTAINOPS_SERVICE_ROLE_KEY is required for --source=remote.");
  }
  return options;
}

function printHelp() {
  console.log([
    "MaintainOps existing image resize maintenance",
    "",
    "Dry-run local backup mirror:",
    "  node scripts/storage-photo-resize-existing.js --source=local",
    "",
    "Dry-run live storage:",
    "  set MAINTAINOPS_SERVICE_ROLE_KEY=...",
    "  node scripts/storage-photo-resize-existing.js --source=remote",
    "",
    "Resize live storage:",
    "  set MAINTAINOPS_SERVICE_ROLE_KEY=...",
    "  node scripts/storage-photo-resize-existing.js --source=remote --execute",
  ].join("\n"));
}

function headers(extra = {}) {
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    ...extra,
  };
}

function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (value < 1024) return `${value} B`;
  if (value < 1048576) return `${Math.round(value / 1024)} KB`;
  if (value < 1073741824) return `${(value / 1048576).toFixed(value >= 10485760 ? 0 : 1)} MB`;
  return `${(value / 1073741824).toFixed(1)} GB`;
}

function isImagePath(filePath) {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function contentTypeFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

function relativeObjectPath(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function listLocalFiles(bucket, localDir) {
  const bucketDir = path.join(localDir, bucket);
  const files = [];
  if (!fs.existsSync(bucketDir)) return files;
  const stack = [bucketDir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && isImagePath(fullPath)) {
        files.push({
          bucket,
          path: relativeObjectPath(bucketDir, fullPath),
          localPath: fullPath,
          size: fs.statSync(fullPath).size,
          contentType: contentTypeFromPath(fullPath),
        });
      }
    }
  }
  return files.sort((a, b) => b.size - a.size || a.path.localeCompare(b.path));
}

async function listRemoteObjects(bucket, prefix = "") {
  const results = [];
  let offset = 0;
  const limit = 100;
  for (;;) {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${encodeURIComponent(bucket)}`, {
      method: "POST",
      headers: headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ prefix, limit, offset, sortBy: { column: "name", order: "asc" } }),
    });
    if (!res.ok) throw new Error(`list ${bucket}/${prefix} failed: HTTP ${res.status} ${await res.text()}`);
    const entries = await res.json();
    if (!Array.isArray(entries) || entries.length === 0) break;
    results.push(...entries);
    if (entries.length < limit) break;
    offset += limit;
  }
  return results;
}

async function walkRemoteBucket(bucket, prefix = "", files = []) {
  const entries = await listRemoteObjects(bucket, prefix);
  for (const entry of entries) {
    const full = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.id === null || entry.id === undefined) {
      await walkRemoteBucket(bucket, full, files);
    } else if (isImagePath(full)) {
      files.push({
        bucket,
        path: full,
        size: Number(entry?.metadata?.size || 0),
        contentType: String(entry?.metadata?.mimetype || contentTypeFromPath(full)),
      });
    }
  }
  return files;
}

async function downloadRemoteObject(bucket, objectPath) {
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(bucket)}/${encodedPath}`, { headers: headers() });
  if (!res.ok) throw new Error(`download ${bucket}/${objectPath} failed: HTTP ${res.status} ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadRemoteObject(bucket, objectPath, buffer) {
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(bucket)}/${encodedPath}`, {
    method: "POST",
    headers: headers({
      "Content-Type": "image/jpeg",
      "x-upsert": "true",
    }),
    body: buffer,
  });
  if (!res.ok) throw new Error(`upload ${bucket}/${objectPath} failed: HTTP ${res.status} ${await res.text()}`);
}

function metadataPatchForBucket(bucket, objectPath, sizeBytes) {
  if (bucket === "asset-documents") {
    return { table: "asset_documents", filterColumn: "storage_path", filterValue: objectPath, payload: { file_size_bytes: sizeBytes, content_type: "image/jpeg" } };
  }
  if (bucket === "part-documents") {
    return { table: "part_documents", filterColumn: "storage_path", filterValue: objectPath, payload: { file_size_bytes: sizeBytes, content_type: "image/jpeg" } };
  }
  if (bucket === "work-order-photos") {
    return { table: "work_order_photos", filterColumn: "storage_path", filterValue: objectPath, payload: { file_size_bytes: sizeBytes, content_type: "image/jpeg" } };
  }
  if (bucket === "maintenance-request-photos") {
    return { table: "maintenance_requests", filterColumn: "photo_storage_path", filterValue: objectPath, payload: { photo_file_size_bytes: sizeBytes, photo_content_type: "image/jpeg" } };
  }
  return null;
}

async function patchMetadata(bucket, objectPath, sizeBytes) {
  const patch = metadataPatchForBucket(bucket, objectPath, sizeBytes);
  if (!patch) return;
  const filter = `${patch.filterColumn}=eq.${encodeURIComponent(patch.filterValue)}`;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${patch.table}?${filter}`, {
    method: "PATCH",
    headers: headers({
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify(patch.payload),
  });
  if (!res.ok) throw new Error(`metadata patch ${patch.table}/${objectPath} failed: HTTP ${res.status} ${await res.text()}`);
}

async function optimizeImage(page, buffer, options) {
  const input = buffer.toString("base64");
  const result = await page.evaluate(async ({ inputBase64, passes }) => {
    function bytesToBase64(bytes) {
      const chunkSize = 0x8000;
      let binary = "";
      for (let index = 0; index < bytes.length; index += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
      }
      return btoa(binary);
    }

    const bytes = Uint8Array.from(atob(inputBase64), (char) => char.charCodeAt(0));
    const blob = new Blob([bytes]);
    const bitmap = await createImageBitmap(blob);
    let selected = null;

    for (const pass of passes) {
      const scale = Math.min(1, pass.maxDimension / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d", { alpha: false });
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const outputBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", pass.quality));
      const outputBytes = new Uint8Array(await outputBlob.arrayBuffer());
      selected = {
        base64: bytesToBase64(outputBytes),
        height: canvas.height,
        quality: pass.quality,
        size: outputBytes.byteLength,
        width: canvas.width,
      };
      if (outputBytes.byteLength <= pass.targetBytes) break;
    }

    if (bitmap.close) bitmap.close();
    return selected;
  }, {
    inputBase64: input,
    passes: options.passes.map((pass) => ({ ...pass, targetBytes: options.targetBytes })),
  });

  return {
    ...result,
    buffer: Buffer.from(result.base64, "base64"),
  };
}

function createSummary(options) {
  return {
    startedAt: new Date().toISOString(),
    source: options.source,
    execute: options.execute,
    dryRun: options.dryRun,
    buckets: {},
    totals: {
      checked: 0,
      changed: 0,
      skipped: 0,
      errors: 0,
      beforeBytes: 0,
      afterBytes: 0,
      savedBytes: 0,
    },
  };
}

function addBucketSummary(summary, bucket) {
  summary.buckets[bucket] ||= {
    checked: 0,
    changed: 0,
    skipped: 0,
    errors: [],
    beforeBytes: 0,
    afterBytes: 0,
    savedBytes: 0,
    largestSavings: [],
  };
  return summary.buckets[bucket];
}

function recordResult(summary, bucket, result) {
  const bucketSummary = addBucketSummary(summary, bucket);
  bucketSummary.checked += 1;
  summary.totals.checked += 1;
  if (result.error) {
    bucketSummary.errors.push({ path: result.path, error: result.error });
    summary.totals.errors += 1;
    return;
  }
  if (result.changed) {
    bucketSummary.changed += 1;
    summary.totals.changed += 1;
  } else {
    bucketSummary.skipped += 1;
    summary.totals.skipped += 1;
  }
  bucketSummary.beforeBytes += result.beforeBytes;
  bucketSummary.afterBytes += result.afterBytes;
  bucketSummary.savedBytes += result.savedBytes;
  summary.totals.beforeBytes += result.beforeBytes;
  summary.totals.afterBytes += result.afterBytes;
  summary.totals.savedBytes += result.savedBytes;
  if (result.savedBytes > 0) {
    bucketSummary.largestSavings.push({
      path: result.path,
      beforeBytes: result.beforeBytes,
      afterBytes: result.afterBytes,
      savedBytes: result.savedBytes,
      width: result.width,
      height: result.height,
      quality: result.quality,
    });
    bucketSummary.largestSavings.sort((a, b) => b.savedBytes - a.savedBytes);
    bucketSummary.largestSavings = bucketSummary.largestSavings.slice(0, 10);
  }
}

async function fileBufferForObject(options, file) {
  if (options.source === "local") return fs.readFileSync(file.localPath);
  return downloadRemoteObject(file.bucket, file.path);
}

async function loadCandidateFiles(options) {
  const files = [];
  for (const bucket of options.buckets) {
    const bucketFiles = options.source === "local"
      ? listLocalFiles(bucket, options.localDir)
      : await walkRemoteBucket(bucket);
    files.push(...bucketFiles.map((file) => ({ ...file, bucket })));
  }
  return files
    .filter((file) => !options.minBytes || Number(file.size || 0) >= options.minBytes)
    .sort((a, b) => b.size - a.size || a.bucket.localeCompare(b.bucket) || a.path.localeCompare(b.path))
    .slice(0, options.limit || undefined);
}

async function run(options) {
  const summary = createSummary(options);
  const files = await loadCandidateFiles(options);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const file of files) {
      const bucketOptions = BUCKET_OPTIONS[file.bucket];
      try {
        const beforeBuffer = await fileBufferForObject(options, file);
        const optimized = await optimizeImage(page, beforeBuffer, bucketOptions);
        const beforeBytes = beforeBuffer.length;
        const afterBytes = optimized.buffer.length;
        const changed = afterBytes > 0 && afterBytes < beforeBytes;
        if (changed && options.execute) {
          await uploadRemoteObject(file.bucket, file.path, optimized.buffer);
          await patchMetadata(file.bucket, file.path, afterBytes);
        }
        recordResult(summary, file.bucket, {
          path: file.path,
          changed,
          beforeBytes,
          afterBytes: changed ? afterBytes : beforeBytes,
          savedBytes: changed ? beforeBytes - afterBytes : 0,
          width: optimized.width,
          height: optimized.height,
          quality: optimized.quality,
        });
      } catch (error) {
        recordResult(summary, file.bucket, {
          path: file.path,
          error: String(error.message || error),
        });
      }
    }
  } finally {
    await browser.close();
  }

  summary.finishedAt = new Date().toISOString();
  return summary;
}

function printSummary(summary) {
  console.log(`${summary.execute ? "Resize" : "Dry-run"} complete from ${summary.source} source.`);
  for (const [bucket, bucketSummary] of Object.entries(summary.buckets)) {
    console.log(`${bucket}: ${bucketSummary.changed} ${summary.execute ? "changed" : "would change"}, ${bucketSummary.skipped} skipped, ${bucketSummary.errors.length} errors, savings ${formatBytes(bucketSummary.savedBytes)} (${formatBytes(bucketSummary.beforeBytes)} -> ${formatBytes(bucketSummary.afterBytes)})`);
    for (const row of bucketSummary.largestSavings.slice(0, 5)) {
      console.log(`  ${formatBytes(row.savedBytes)} saved | ${formatBytes(row.beforeBytes)} -> ${formatBytes(row.afterBytes)} | ${row.path}`);
    }
    for (const row of bucketSummary.errors.slice(0, 5)) {
      console.log(`  ERROR | ${row.path} | ${row.error}`);
    }
  }
  console.log(`Total: ${summary.totals.changed} ${summary.execute ? "changed" : "would change"}, ${summary.totals.skipped} skipped, ${summary.totals.errors} errors, savings ${formatBytes(summary.totals.savedBytes)} (${formatBytes(summary.totals.beforeBytes)} -> ${formatBytes(summary.totals.afterBytes)})`);
  if (!summary.execute) {
    console.log("No remote files were changed. Add --source=remote --execute with MAINTAINOPS_SERVICE_ROLE_KEY set to resize live storage.");
  }
}

async function main() {
  const options = parseArgs();
  if (options.help) {
    printHelp();
    return;
  }
  const summary = await run(options);
  if (options.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    printSummary(summary);
  }
  if (options.execute && summary.totals.errors > 0) process.exitCode = 1;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}

module.exports = {
  BUCKET_OPTIONS,
  DEFAULT_BUCKETS,
  formatBytes,
  isImagePath,
  parseArgs,
};
