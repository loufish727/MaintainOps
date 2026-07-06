const assert = require("node:assert/strict");

const {
  BUCKET_OPTIONS,
  DEFAULT_BUCKETS,
  formatBytes,
  isImagePath,
  parseArgs,
} = require("../../scripts/storage-photo-resize-existing.js");

const local = parseArgs(["--source=local", "--limit=10", "--min-bytes=1048576", "--buckets=asset-documents,part-documents"], {});
assert.equal(local.source, "local");
assert.equal(local.dryRun, true);
assert.equal(local.execute, false);
assert.equal(local.limit, 10);
assert.equal(local.minBytes, 1048576);
assert.deepEqual(local.buckets, ["asset-documents", "part-documents"]);

const remote = parseArgs(["--source=remote", "--execute"], { MAINTAINOPS_SERVICE_ROLE_KEY: "secret" });
assert.equal(remote.source, "remote");
assert.equal(remote.execute, true);
assert.equal(remote.dryRun, false);

assert.throws(
  () => parseArgs(["--source=remote"], {}),
  /MAINTAINOPS_SERVICE_ROLE_KEY/
);
assert.throws(
  () => parseArgs(["--source=local", "--execute"], { MAINTAINOPS_SERVICE_ROLE_KEY: "secret" }),
  /--execute requires --source=remote/
);
assert.throws(
  () => parseArgs(["--buckets=unknown-bucket"], {}),
  /Unsupported bucket/
);

assert.ok(DEFAULT_BUCKETS.includes("asset-documents"));
assert.equal(BUCKET_OPTIONS["asset-documents"].targetBytes, 1024 * 1024);
assert.equal(BUCKET_OPTIONS["work-order-photos"].targetBytes, 256 * 1024);
assert.equal(isImagePath("photo.JPG"), true);
assert.equal(isImagePath("manual.pdf"), false);
assert.equal(formatBytes(1024 * 1024), "1.0 MB");

console.log("storage photo resize existing smoke passed");
