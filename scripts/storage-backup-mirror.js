// Storage backup mirror for MaintainOps.
// Downloads every object from the project's storage buckets to a local mirror
// directory, because Supabase database backups do NOT include storage objects
// (confirmed during the 2026-06-11 restore drill — see docs/BACKUP_RESTORE_VALIDATION.md).
//
// Read-only against Supabase: list + GET only. Never deletes remote objects.
// Local mirror is incremental: files already present with the same byte size are skipped.
//
// Usage:
//   set MAINTAINOPS_SERVICE_ROLE_KEY=...   (required; never commit this)
//   node scripts/storage-backup-mirror.js
// Optional env:
//   SUPABASE_URL              (defaults to the MaintainOps project URL)
//   MAINTAINOPS_BACKUP_DIR    (defaults to %USERPROFILE%/Documents/MaintainOps-backups/storage)

const fs = require("fs");
const path = require("path");

const SUPABASE_URL = (process.env.SUPABASE_URL || "https://lbphkzznvvumemdkqoay.supabase.co").replace(/\/+$/, "");
const SERVICE_KEY = process.env.MAINTAINOPS_SERVICE_ROLE_KEY || "";
const BACKUP_DIR = process.env.MAINTAINOPS_BACKUP_DIR
  || path.join(process.env.USERPROFILE || process.env.HOME || ".", "Documents", "MaintainOps-backups", "storage");

if (!SERVICE_KEY) {
  console.error("MAINTAINOPS_SERVICE_ROLE_KEY is required (service role key from the Supabase dashboard or CLI).");
  process.exit(1);
}

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
};

async function listBuckets() {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, { headers });
  if (!res.ok) throw new Error(`bucket list failed: HTTP ${res.status} ${await res.text()}`);
  return res.json();
}

async function listObjects(bucket, prefix) {
  const results = [];
  let offset = 0;
  const limit = 100;
  for (;;) {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${encodeURIComponent(bucket)}`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
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

async function walkBucket(bucket, prefix, files) {
  const entries = await listObjects(bucket, prefix);
  for (const entry of entries) {
    const full = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.id === null || entry.id === undefined) {
      // Folder-style prefix; recurse.
      await walkBucket(bucket, full, files);
    } else {
      files.push({ path: full, size: entry?.metadata?.size ?? null });
    }
  }
  return files;
}

async function downloadObject(bucket, objectPath, destination) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(bucket)}/${objectPath.split("/").map(encodeURIComponent).join("/")}`, { headers });
  if (!res.ok) throw new Error(`download ${bucket}/${objectPath} failed: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, buffer);
  return buffer.length;
}

async function main() {
  const startedAt = new Date().toISOString();
  const buckets = await listBuckets();
  const summary = { startedAt, supabaseUrl: SUPABASE_URL, backupDir: BACKUP_DIR, buckets: {} };
  let totalDownloaded = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const bucket of buckets) {
    const name = bucket.name;
    const files = await walkBucket(name, "", []);
    const bucketSummary = { objects: files.length, downloaded: 0, skipped: 0, errors: [] };

    for (const file of files) {
      const destination = path.join(BACKUP_DIR, name, ...file.path.split("/"));
      try {
        if (file.size !== null && fs.existsSync(destination) && fs.statSync(destination).size === file.size) {
          bucketSummary.skipped += 1;
          totalSkipped += 1;
          continue;
        }
        await downloadObject(name, file.path, destination);
        bucketSummary.downloaded += 1;
        totalDownloaded += 1;
      } catch (error) {
        bucketSummary.errors.push({ path: file.path, error: String(error.message || error) });
        totalErrors += 1;
      }
    }

    summary.buckets[name] = bucketSummary;
    console.log(`${name}: ${bucketSummary.objects} objects, ${bucketSummary.downloaded} downloaded, ${bucketSummary.skipped} up to date, ${bucketSummary.errors.length} errors`);
  }

  summary.finishedAt = new Date().toISOString();
  summary.totals = { downloaded: totalDownloaded, skipped: totalSkipped, errors: totalErrors };
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const manifestPath = path.join(BACKUP_DIR, `manifest-${startedAt.replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(manifestPath, JSON.stringify(summary, null, 2));
  console.log(`Mirror complete. Downloaded ${totalDownloaded}, up to date ${totalSkipped}, errors ${totalErrors}.`);
  console.log(`Manifest: ${manifestPath}`);
  if (totalErrors > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`Storage mirror failed: ${error.message || error}`);
  process.exit(1);
});
