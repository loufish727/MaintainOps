export function createCompanyLogoUrlLoader(options = {}) {
  const cache = new Map();
  const now = options.now || (() => Date.now());
  const ttlMs = Math.max(1000, Number(options.ttlMs) || 8 * 60 * 1000);

  return async function loadCompanyLogoUrls(supabaseClient, companies) {
    await Promise.all(companies.map(async (company) => {
      company.logoUrl = "";
      company.logoError = "";
      if (!company.logo_path) return;

      const cached = cache.get(company.logo_path);
      if (cached && cached.expiresAt > now()) {
        company.logoUrl = cached.url;
        return;
      }

      const { data, error } = await supabaseClient.storage
        .from("company-logos")
        .createSignedUrl(company.logo_path, 60 * 10);
      if (error) {
        company.logoError = error.message;
        return;
      }

      company.logoUrl = data?.signedUrl || "";
      if (company.logoUrl) {
        cache.set(company.logo_path, {
          expiresAt: now() + ttlMs,
          url: company.logoUrl,
        });
      }
    }));
  };
}
