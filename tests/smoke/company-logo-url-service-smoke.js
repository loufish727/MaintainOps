const assert = require("node:assert/strict");

(async () => {
  const { createCompanyLogoUrlLoader } = await import("../../src/services/companyLogoUrlService.mjs");
  let currentTime = 1000;
  let signedUrlCalls = 0;
  const loader = createCompanyLogoUrlLoader({
    now: () => currentTime,
    ttlMs: 5000,
  });
  const client = {
    storage: {
      from(bucket) {
        assert.equal(bucket, "company-logos");
        return {
          async createSignedUrl(path, seconds) {
            signedUrlCalls += 1;
            return { data: { signedUrl: `https://example.test/${path}?call=${signedUrlCalls}&ttl=${seconds}` }, error: null };
          },
        };
      },
    },
  };

  const first = [{ id: "company-1", logo_path: "company-1/logo.png" }];
  await loader(client, first);
  assert.equal(signedUrlCalls, 1);
  assert.match(first[0].logoUrl, /call=1/);

  const second = [{ id: "company-1", logo_path: "company-1/logo.png" }];
  await loader(client, second);
  assert.equal(signedUrlCalls, 1);
  assert.equal(second[0].logoUrl, first[0].logoUrl);

  currentTime += 5001;
  const expired = [{ id: "company-1", logo_path: "company-1/logo.png" }];
  await loader(client, expired);
  assert.equal(signedUrlCalls, 2);
  assert.match(expired[0].logoUrl, /call=2/);

  console.log("company logo URL service smoke passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
