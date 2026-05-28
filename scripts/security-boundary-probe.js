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

async function requestStorage({ url, anonKey, path: requestPath, token, method = "GET", body, contentType = "application/json" }) {
  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${token || anonKey}`,
  };
  if (contentType) headers["Content-Type"] = contentType;

  const response = await fetch(`${url}${requestPath}`, {
    method,
    headers,
    body,
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
  return {
    token: result.payload.access_token,
    userId: result.payload.user?.id,
  };
}

function isDenied(result) {
  return result.status === 400 || result.status === 401 || result.status === 403 || result.status === 404;
}

function isSuccessfulNoRows(result) {
  return result.ok && Array.isArray(result.payload) && result.payload.length === 0;
}

async function firstRow(config, token, table, query) {
  const result = await requestJson({
    ...config,
    token,
    path: `/rest/v1/${table}?${query}&limit=1`,
  });
  if (!result.ok || !Array.isArray(result.payload) || result.payload.length === 0) return null;
  return result.payload[0];
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
  const randomUuid = "00000000-0000-4000-8000-000000000001";
  const randomUuidTwo = "00000000-0000-4000-8000-000000000002";

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
      isSuccessfulNoRows(result)
    ) {
      results.push(pass(`anon_rpc_invalid_token_rejected:${rpc.name}`, `HTTP ${result.status}`));
    } else {
      results.push(review(`anon_rpc_probe:${rpc.name}`, `HTTP ${result.status}; inspect payload to confirm invalid token was rejected.`));
    }
  }

  const authEmail = process.env.MAINTAINOPS_PROBE_EMAIL;
  const authPassword = process.env.MAINTAINOPS_PROBE_PASSWORD;
  const probeCompanyId = process.env.MAINTAINOPS_PROBE_COMPANY_ID;
  const forbiddenCompanyId = process.env.MAINTAINOPS_FORBIDDEN_COMPANY_ID;
  let authToken = null;
  let authUserId = null;
  let authProfile = null;

  if (authEmail && authPassword) {
    const authSession = await signIn({ ...config, email: authEmail, password: authPassword });
    authToken = authSession.token;
    authUserId = authSession.userId;
    const membershipQuery = probeCompanyId
      ? `company_id=eq.${encodeURIComponent(probeCompanyId)}&user_id=eq.${encodeURIComponent(authUserId)}&select=company_id,user_id,role`
      : `user_id=eq.${encodeURIComponent(authUserId)}&select=company_id,user_id,role`;
    authProfile = await firstRow(config, authToken, "company_members", membershipQuery);
    if (authProfile) {
      results.push(info("authenticated_probe_identity", `role=${authProfile.role}; company_id=${authProfile.company_id}`));
    } else {
      results.push(review("authenticated_probe_identity_missing", "Signed-in probe could not read a company_members row."));
    }
  }

  if (authToken && forbiddenCompanyId) {
    const crossTenantTables = ["work_orders", "assets", "parts", "maintenance_requests", "public_request_links"];
    for (const table of crossTenantTables) {
      const result = await requestJson({
        ...config,
        token: authToken,
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

  if (authToken && authProfile?.role === "technician") {
    const companyId = authProfile.company_id;
    const userId = authProfile.user_id;
    const location = await firstRow(config, authToken, "locations", `company_id=eq.${encodeURIComponent(companyId)}&select=id`);
    const roleMutationProbes = [
      {
        name: "technician_denied:update_company_member_role",
        path: "/rest/v1/rpc/update_company_member_role",
        body: { target_company_id: companyId, target_user_id: userId, new_role: "manager" },
      },
      {
        name: "technician_denied:create_company_invite",
        path: "/rest/v1/rpc/create_company_invite",
        body: {
          target_company_id: companyId,
          invite_email: `security-probe-${Date.now()}@example.invalid`,
          invite_role: "technician",
        },
      },
      {
        name: "technician_denied:set_company_logo",
        path: "/rest/v1/rpc/set_company_logo",
        body: { target_company_id: companyId, new_logo_path: `${companyId}/security-probe-logo.png` },
      },
    ];
    if (location?.id) {
      roleMutationProbes.push({
        name: "technician_denied:ensure_location_request_link",
        path: "/rest/v1/rpc/ensure_location_request_link",
        body: { target_location_id: location.id },
      });
    } else {
      results.push(info("technician_public_link_probe_not_run", "No location row was visible for the technician probe account."));
    }

    for (const probe of roleMutationProbes) {
      const result = await requestJson({ ...config, token: authToken, path: probe.path, method: "POST", body: probe.body });
      if (isDenied(result)) {
        results.push(pass(probe.name, `HTTP ${result.status}`));
      } else {
        results.push(fail(probe.name.replace("_denied", "_allowed"), `HTTP ${result.status}; technician manager/admin RPC probe was not rejected.`));
      }
    }
  } else {
    results.push(info("technician_role_mutation_probes_not_run", "Set MAINTAINOPS_PROBE_EMAIL/PASSWORD to a technician account to run manager/admin rejection probes."));
  }

  const storageBuckets = ["work-order-photos", "part-documents", "company-logos", "maintenance-request-photos"];
  for (const bucket of storageBuckets) {
    const result = await requestStorage({
      ...config,
      path: `/storage/v1/object/list/${bucket}`,
      method: "POST",
      body: JSON.stringify({ limit: 1, offset: 0, prefix: "" }),
    });
    if (result.status === 401 || result.status === 403 || result.status === 404) {
      results.push(pass(`anon_storage_list_denied:${bucket}`, `HTTP ${result.status}`));
    } else if (isSuccessfulNoRows(result)) {
      results.push(info(`anon_storage_list_empty:${bucket}`, "Anonymous storage list returned no objects."));
    } else {
      results.push(fail(`anon_storage_list_access:${bucket}`, `HTTP ${result.status}; anonymous storage list was not denied.`));
    }
  }

  const anonUploadPath = `${randomUuid}/security-probe-${Date.now()}.txt`;
  const anonUpload = await requestStorage({
    ...config,
    path: `/storage/v1/object/maintenance-request-photos/${anonUploadPath}`,
    method: "POST",
    contentType: "text/plain",
    body: "security probe",
  });
  if (isDenied(anonUpload)) {
    results.push(pass("anon_storage_upload_invalid_request_denied:maintenance-request-photos", `HTTP ${anonUpload.status}`));
  } else {
    results.push(fail("anon_storage_upload_invalid_request_allowed:maintenance-request-photos", `HTTP ${anonUpload.status}; invalid public request photo upload was not denied.`));
  }

  if (authToken && forbiddenCompanyId) {
    const forbiddenLogoUpload = await requestStorage({
      ...config,
      token: authToken,
      path: `/storage/v1/object/company-logos/${forbiddenCompanyId}/security-probe-${Date.now()}.txt`,
      method: "POST",
      contentType: "text/plain",
      body: "security probe",
    });
    if (isDenied(forbiddenLogoUpload)) {
      results.push(pass("auth_storage_upload_forbidden_company_denied:company-logos", `HTTP ${forbiddenLogoUpload.status}`));
    } else {
      results.push(fail("auth_storage_upload_forbidden_company_allowed:company-logos", `HTTP ${forbiddenLogoUpload.status}; forbidden-company storage upload was not denied.`));
    }
  } else {
    results.push(info("auth_storage_path_abuse_probe_not_run", "Set authenticated probe credentials and MAINTAINOPS_FORBIDDEN_COMPANY_ID to test forbidden-company storage upload."));
  }

  const attachProbes = [
    {
      name: "anon_attach_photo_random_request_denied",
      body: {
        target_request_id: randomUuid,
        p_photo_storage_path: `${randomUuid}/security-probe.jpg`,
        p_photo_file_name: "security-probe.jpg",
        p_photo_content_type: "image/jpeg",
        p_photo_file_size_bytes: 10,
        p_photo_original_file_name: "security-probe.jpg",
        p_photo_original_size_bytes: 10,
      },
    },
    {
      name: "anon_attach_photo_path_mismatch_denied",
      body: {
        target_request_id: randomUuid,
        p_photo_storage_path: `${randomUuidTwo}/security-probe.jpg`,
        p_photo_file_name: "security-probe.jpg",
        p_photo_content_type: "image/jpeg",
        p_photo_file_size_bytes: 10,
        p_photo_original_file_name: "security-probe.jpg",
        p_photo_original_size_bytes: 10,
      },
    },
  ];

  for (const probe of attachProbes) {
    const result = await requestJson({
      ...config,
      path: "/rest/v1/rpc/attach_maintenance_request_photo",
      method: "POST",
      body: probe.body,
    });
    if (isDenied(result)) {
      results.push(pass(probe.name, `HTTP ${result.status}`));
    } else {
      results.push(fail(probe.name.replace("_denied", "_allowed"), `HTTP ${result.status}; public photo attach probe was not rejected.`));
    }
  }

  if (authToken) {
    const internalRequest = await firstRow(
      config,
      authToken,
      "maintenance_requests",
      "external_source=neq.public_location_qr&select=id"
    );
    if (internalRequest?.id) {
      const result = await requestJson({
        ...config,
        path: "/rest/v1/rpc/attach_maintenance_request_photo",
        method: "POST",
        body: {
          target_request_id: internalRequest.id,
          p_photo_storage_path: `${internalRequest.id}/security-probe.jpg`,
          p_photo_file_name: "security-probe.jpg",
          p_photo_content_type: "image/jpeg",
          p_photo_file_size_bytes: 10,
          p_photo_original_file_name: "security-probe.jpg",
          p_photo_original_size_bytes: 10,
        },
      });
      if (isDenied(result)) {
        results.push(pass("anon_attach_photo_internal_request_denied", `HTTP ${result.status}`));
      } else {
        results.push(fail("anon_attach_photo_internal_request_allowed", `HTTP ${result.status}; anon photo attach to internal request was not rejected.`));
      }
    } else {
      results.push(info("anon_attach_photo_internal_request_probe_not_run", "No internal maintenance request was visible to the authenticated probe account."));
    }
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
