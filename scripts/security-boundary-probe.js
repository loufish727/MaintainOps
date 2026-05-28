const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const configPath = path.join(rootDir, "supabase-config.js");

function readBrowserConfig() {
  const source = fs.readFileSync(configPath, "utf8");
  const url = source.match(/window\.SUPABASE_URL\s*=\s*"([^"]+)"/)?.[1];
  const anonKey = source.match(/window\.SUPABASE_ANON_KEY\s*=\s*"([^"]+)"/)?.[1];
  if (!url || !anonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in supabase-config.js");
  }
  return { url: url.replace(/\/$/, ""), anonKey };
}

async function requestJson({ url, anonKey, path: requestPath, token, method = "GET", body }) {
  const response = await fetch(`${url}${requestPath}`, {
    method,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token || anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }
  return { ok: response.ok, status: response.status, payload };
}

async function signIn({ url, anonKey, email, password }) {
  const result = await requestJson({
    url,
    anonKey,
    path: "/auth/v1/token?grant_type=password",
    method: "POST",
    body: { email, password },
  });
  if (!result.ok || !result.payload?.access_token) {
    throw new Error(`Auth probe login failed: HTTP ${result.status}`);
  }
  return result.payload.access_token;
}

function pass(name, detail) {
  return { name, verdict: "PASS", detail };
}

function review(name, detail) {
  return { name, verdict: "REVIEW", detail };
}

function info(name, detail) {
  return { name, verdict: "INFO", detail };
}

function fail(name, detail) {
  return { name, verdict: "FAIL", detail };
}

async function run() {
  const config = readBrowserConfig();
  const appTables = [
    "companies",
    "company_members",
    "profiles",
    "locations",
    "assets",
    "work_orders",
    "work_order_comments",
    "work_order_photos",
    "preventive_schedules",
    "parts",
    "work_order_parts",
    "part_documents",
    "work_order_events",
    "maintenance_requests",
    "procedure_templates",
    "procedure_steps",
    "work_order_step_results",
    "message_threads",
    "message_thread_members",
    "messages",
    "message_reads",
    "company_invites",
    "public_request_links",
    "app_issue_reports",
  ];

  const results = [];

  for (const table of appTables) {
    const result = await requestJson({
      ...config,
      path: `/rest/v1/${table}?select=*&limit=1`,
    });
    if (result.status === 401 || result.status === 403) {
      results.push(pass(`anon_table_denied:${table}`, `HTTP ${result.status}`));
    } else if (result.ok && Array.isArray(result.payload) && result.payload.length === 0) {
      results.push(review(`anon_table_empty:${table}`, "Anonymous request succeeded but returned no rows; verify this is intended."));
    } else {
      results.push(fail(`anon_table_access:${table}`, `HTTP ${result.status}; anonymous table request was not denied.`));
    }
  }

  const allowedAnonRpc = [
    { name: "get_public_request_intake", body: { request_token: "invalid-security-probe-token" } },
    {
      name: "submit_public_location_request",
      body: {
        request_token: "invalid-security-probe-token",
        request_title: "Security probe",
        request_description: "Invalid token should not create a request.",
        requester_name: "Security Probe",
        requester_contact: "probe@example.invalid",
        equipment_note: null,
        request_priority: "medium",
      },
    },
  ];

  for (const rpc of allowedAnonRpc) {
    const result = await requestJson({
      ...config,
      path: `/rest/v1/rpc/${rpc.name}`,
      method: "POST",
      body: rpc.body,
    });
    if (
      result.status === 400 ||
      result.status === 404 ||
      (result.ok && Array.isArray(result.payload) && result.payload.length === 0)
    ) {
      results.push(pass(`anon_rpc_invalid_token_rejected:${rpc.name}`, `HTTP ${result.status}`));
    } else {
      results.push(review(`anon_rpc_probe:${rpc.name}`, `HTTP ${result.status}; inspect payload to confirm invalid token was rejected.`));
    }
  }

  const authEmail = process.env.MAINTAINOPS_PROBE_EMAIL;
  const authPassword = process.env.MAINTAINOPS_PROBE_PASSWORD;
  const forbiddenCompanyId = process.env.MAINTAINOPS_FORBIDDEN_COMPANY_ID;

  if (authEmail && authPassword && forbiddenCompanyId) {
    const token = await signIn({ ...config, email: authEmail, password: authPassword });
    const crossTenantTables = ["work_orders", "assets", "parts", "maintenance_requests", "public_request_links"];
    for (const table of crossTenantTables) {
      const result = await requestJson({
        ...config,
        token,
        path: `/rest/v1/${table}?company_id=eq.${encodeURIComponent(forbiddenCompanyId)}&select=*&limit=1`,
      });
      if (result.ok && Array.isArray(result.payload) && result.payload.length === 0) {
        results.push(pass(`cross_tenant_filtered:${table}`, "Authenticated probe saw zero forbidden-company rows."));
      } else {
        results.push(fail(`cross_tenant_visible:${table}`, `HTTP ${result.status}; forbidden-company probe was not empty.`));
      }
    }
  } else {
    results.push(info("cross_tenant_probe_not_run", "Set MAINTAINOPS_PROBE_EMAIL, MAINTAINOPS_PROBE_PASSWORD, and MAINTAINOPS_FORBIDDEN_COMPANY_ID to run authenticated cross-company probes."));
  }

  const failures = results.filter((result) => result.verdict === "FAIL");
  const reviews = results.filter((result) => result.verdict === "REVIEW");

  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));

  if (failures.length > 0) {
    process.exitCode = 1;
  } else if (reviews.length > 0) {
    process.exitCode = 2;
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
