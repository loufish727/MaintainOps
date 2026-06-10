(function () {
  /*
   * Module contract: owns signed storage URL creation helpers only.
   * May mutate injected row objects by assigning signed URL fields.
   * Must not upload, delete, create records, own app state, touch auth/session, SQL, or RLS.
   */
  async function addSignedUrlsToRows(supabaseClient, bucketName, rows = [], options = {}) {
    const pathKey = options.pathKey || "storage_path";
    const urlKey = options.urlKey || "signedUrl";
    const expiresIn = options.expiresIn || 60 * 10;
    const onError = options.onError;

    await Promise.all(rows.map(async (row) => {
      const path = row?.[pathKey];
      if (!path) return;
      const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .createSignedUrl(path, expiresIn);
      if (error) {
        row[urlKey] = "";
        if (typeof onError === "function") onError(row, error);
        return;
      }
      row[urlKey] = data?.signedUrl || "";
    }));
  }

  function createDeferredSignedUrlLoader(deps = {}) {
    function ensureGroupSignedUrls(groupId) {
      if (!groupId || !deps.getReady()) return;
      const rows = deps.getRows(groupId) || [];
      const pending = rows.filter((row) => row.storage_path && !row.signedUrl);
      const signingMap = deps.getSigningMap();
      if (!pending.length || signingMap[groupId]) return;

      signingMap[groupId] = true;
      deps.withOperationTimeout(
        addSignedUrlsToRows(deps.supabaseClient(), deps.bucketName, pending),
        deps.timeoutMessage || "Signed file link load timed out.",
        deps.timeoutMs || 10000
      )
        .catch((error) => {
          deps.warn("Could not load signed file links", error);
        })
        .finally(() => {
          delete signingMap[groupId];
          if (deps.getActiveGroupId() === groupId) deps.renderWorkspace();
        });
    }

    return { ensureGroupSignedUrls };
  }

  window.MaintainOpsSignedUrlService = {
    addSignedUrlsToRows,
    createDeferredSignedUrlLoader,
  };

  if (typeof module !== "undefined") {
    module.exports = { addSignedUrlsToRows, createDeferredSignedUrlLoader };
  }
})();
