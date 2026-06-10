const assert = require("node:assert/strict");

global.window = {};

const { addSignedUrlsToRows, createDeferredSignedUrlLoader } = require("../../src/services/signedUrlService.js");

const calls = [];
const rows = [
  { id: "one", storage_path: "one.jpg" },
  { id: "two", storage_path: "two.jpg" },
];
const requestRows = [
  { id: "request-1", photo_storage_path: "request.jpg" },
  { id: "request-2", photo_storage_path: "bad.jpg" },
];
const supabaseClient = {
  storage: {
    from(bucketName) {
      return {
        async createSignedUrl(path, expiresIn) {
          calls.push(["createSignedUrl", bucketName, path, expiresIn]);
          if (path === "bad.jpg") return { data: null, error: new Error("bad path") };
          return { data: { signedUrl: `signed:${bucketName}:${path}` }, error: null };
        },
      };
    },
  },
};

(async () => {
  await addSignedUrlsToRows(supabaseClient, "work-order-photos", rows);
  assert.equal(rows[0].signedUrl, "signed:work-order-photos:one.jpg");
  assert.equal(rows[1].signedUrl, "signed:work-order-photos:two.jpg");

  let errorSeen = false;
  await addSignedUrlsToRows(supabaseClient, "maintenance-request-photos", requestRows, {
    pathKey: "photo_storage_path",
    urlKey: "photoSignedUrl",
    onError: () => {
      errorSeen = true;
    },
  });
  assert.equal(requestRows[0].photoSignedUrl, "signed:maintenance-request-photos:request.jpg");
  assert.equal(requestRows[1].photoSignedUrl, "");
  assert.equal(errorSeen, true);

  const signingMap = {};
  const groupRows = { "asset-1": [{ storage_path: "asset.jpg" }] };
  let rendered = false;
  const loader = createDeferredSignedUrlLoader({
    bucketName: "asset-documents",
    getActiveGroupId: () => "asset-1",
    getReady: () => true,
    getRows: (id) => groupRows[id] || [],
    getSigningMap: () => signingMap,
    renderWorkspace: () => {
      rendered = true;
    },
    supabaseClient: () => supabaseClient,
    warn: () => {},
    withOperationTimeout: (promise) => promise,
  });

  loader.ensureGroupSignedUrls("asset-1");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(groupRows["asset-1"][0].signedUrl, "signed:asset-documents:asset.jpg");
  assert.equal(signingMap["asset-1"], undefined);
  assert.equal(rendered, true);

  console.log("signed url service smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
