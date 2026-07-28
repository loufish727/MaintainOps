const fs = require("node:fs");
const path = require("node:path");
const { writeEvidence } = require("./lfes-evidence");

const root = path.resolve(__dirname, "..");
const schemaPath = path.join(root, "supabase", "schema.sql");
const migrationsDir = path.join(root, "supabase", "migrations");
const preludePath = path.join(root, "tests", "fixtures", "supabase-postgres-prelude.sql");

const ids = {
  admin: "00000000-0000-4000-8000-000000000001",
  manager: "00000000-0000-4000-8000-000000000002",
  accounting: "00000000-0000-4000-8000-000000000003",
  technician: "00000000-0000-4000-8000-000000000004",
  outsider: "00000000-0000-4000-8000-000000000005",
  companyA: "10000000-0000-4000-8000-000000000001",
  companyB: "10000000-0000-4000-8000-000000000002",
  locationA: "20000000-0000-4000-8000-000000000001",
  locationB: "20000000-0000-4000-8000-000000000002",
  assetA: "30000000-0000-4000-8000-000000000001",
  assetB: "30000000-0000-4000-8000-000000000002",
  financialA: "40000000-0000-4000-8000-000000000001",
};

function sqlFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
}

function sqlLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

async function setAuthenticatedUser(database, userId) {
  await database.exec("reset role; set role authenticated;");
  await database.query("select set_config('request.jwt.claim.sub', $1, false)", [userId]);
  await database.query("select set_config('request.jwt.claims', $1, false)", [JSON.stringify({ sub: userId })]);
}

async function resetRole(database) {
  await database.exec("reset role;");
}

async function main() {
  const { PGlite } = await import("@electric-sql/pglite");
  const { pgcrypto } = await import("@electric-sql/pglite/contrib/pgcrypto");
  const database = new PGlite({ extensions: { pgcrypto } });
  const startedAt = new Date().toISOString();
  const migrationFiles = sqlFiles(migrationsDir);
  const checks = [];

  try {
    await database.exec(fs.readFileSync(preludePath, "utf8"));
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await database.exec(schemaSql);
    checks.push({ name: "schema_compiles", verdict: "PASS" });

    for (const fileName of migrationFiles) {
      await database.exec(fs.readFileSync(path.join(migrationsDir, fileName), "utf8"));
      checks.push({ name: `migration_compiles:${fileName}`, verdict: "PASS" });
    }

    const declaredTables = [...schemaSql.matchAll(/create\s+table\s+if\s+not\s+exists\s+public\.([a-z0-9_]+)/gi)]
      .map((match) => match[1]);
    const relationResult = await database.query(`
      select c.relname
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relkind in ('r', 'p')
    `);
    const actualRelations = new Set(relationResult.rows.map((row) => row.relname));
    const missingRelations = declaredTables.filter((name) => !actualRelations.has(name));
    if (missingRelations.length) throw new Error(`Compiled schema is missing declared relations: ${missingRelations.join(", ")}`);
    checks.push({ name: "declared_relations_exist", verdict: "PASS", count: declaredTables.length });

    const missingSearchPath = await database.query(`
      select n.nspname as schema_name, p.proname as function_name
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname in ('public', 'private')
        and p.prosecdef
        and not exists (
          select 1
          from unnest(coalesce(p.proconfig, array[]::text[])) setting
          where setting like 'search_path=%'
        )
      order by n.nspname, p.proname
    `);
    if (missingSearchPath.rows.length) {
      throw new Error(`Compiled security-definer functions missing search_path: ${missingSearchPath.rows.map((row) => `${row.schema_name}.${row.function_name}`).join(", ")}`);
    }
    checks.push({ name: "compiled_security_definers_have_search_path", verdict: "PASS" });

    const rlsResult = await database.query(`
      select c.relname
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public'
        and c.relkind in ('r', 'p')
        and not c.relrowsecurity
      order by c.relname
    `);
    if (rlsResult.rows.length) {
      throw new Error(`Public tables missing RLS in compiled schema: ${rlsResult.rows.map((row) => row.relname).join(", ")}`);
    }
    checks.push({ name: "compiled_public_tables_have_rls", verdict: "PASS", count: declaredTables.length });

    await database.exec(`
      insert into auth.users (id, email) values
        (${sqlLiteral(ids.admin)}::uuid, 'admin@lfes.invalid'),
        (${sqlLiteral(ids.manager)}::uuid, 'manager@lfes.invalid'),
        (${sqlLiteral(ids.accounting)}::uuid, 'accounting@lfes.invalid'),
        (${sqlLiteral(ids.technician)}::uuid, 'technician@lfes.invalid'),
        (${sqlLiteral(ids.outsider)}::uuid, 'outsider@lfes.invalid');

      insert into public.companies (id, name, created_by) values
        (${sqlLiteral(ids.companyA)}::uuid, 'LFES Company A', ${sqlLiteral(ids.admin)}::uuid),
        (${sqlLiteral(ids.companyB)}::uuid, 'LFES Company B', ${sqlLiteral(ids.outsider)}::uuid);

      insert into public.locations (id, company_id, name) values
        (${sqlLiteral(ids.locationA)}::uuid, ${sqlLiteral(ids.companyA)}::uuid, 'A'),
        (${sqlLiteral(ids.locationB)}::uuid, ${sqlLiteral(ids.companyB)}::uuid, 'B');

      insert into public.company_members (company_id, user_id, role, default_location_id) values
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.admin)}::uuid, 'admin', ${sqlLiteral(ids.locationA)}::uuid),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.manager)}::uuid, 'manager', ${sqlLiteral(ids.locationA)}::uuid),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.accounting)}::uuid, 'accounting', ${sqlLiteral(ids.locationA)}::uuid),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.technician)}::uuid, 'technician', ${sqlLiteral(ids.locationA)}::uuid),
        (${sqlLiteral(ids.companyB)}::uuid, ${sqlLiteral(ids.outsider)}::uuid, 'admin', ${sqlLiteral(ids.locationB)}::uuid);

      insert into public.profiles (company_id, user_id, full_name) values
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.admin)}::uuid, 'LFES Admin'),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.manager)}::uuid, 'LFES Manager'),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.accounting)}::uuid, 'LFES Accounting'),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.technician)}::uuid, 'LFES Technician'),
        (${sqlLiteral(ids.companyB)}::uuid, ${sqlLiteral(ids.outsider)}::uuid, 'LFES Outsider');

      insert into public.assets (id, company_id, location_id, name, created_by) values
        (${sqlLiteral(ids.assetA)}::uuid, ${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, 'LFES Asset A', ${sqlLiteral(ids.admin)}::uuid),
        (${sqlLiteral(ids.assetB)}::uuid, ${sqlLiteral(ids.companyB)}::uuid, ${sqlLiteral(ids.locationB)}::uuid, 'LFES Asset B', ${sqlLiteral(ids.outsider)}::uuid);

      insert into public.asset_financials (id, company_id, asset_id, finance_notes, updated_by) values
        (${sqlLiteral(ids.financialA)}::uuid, ${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.assetA)}::uuid, 'seed', ${sqlLiteral(ids.admin)}::uuid);

      insert into public.work_orders (
        company_id,
        location_id,
        asset_id,
        assigned_to,
        title,
        status,
        due_at,
        created_by,
        completed_at
      ) values
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, ${sqlLiteral(ids.assetA)}::uuid, ${sqlLiteral(ids.technician)}::uuid, 'Assigned open', 'open', '2026-07-26', ${sqlLiteral(ids.admin)}::uuid, null),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, ${sqlLiteral(ids.assetA)}::uuid, ${sqlLiteral(ids.technician)}::uuid, 'Assigned in progress', 'in_progress', '2026-08-10', ${sqlLiteral(ids.technician)}::uuid, null),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, ${sqlLiteral(ids.assetA)}::uuid, ${sqlLiteral(ids.manager)}::uuid, 'Manager blocked', 'blocked', '2026-08-10', ${sqlLiteral(ids.manager)}::uuid, null),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, ${sqlLiteral(ids.assetA)}::uuid, ${sqlLiteral(ids.technician)}::uuid, 'Completed this month', 'completed', null, ${sqlLiteral(ids.admin)}::uuid, '2026-07-20T12:00:00Z'),
        (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, ${sqlLiteral(ids.assetA)}::uuid, ${sqlLiteral(ids.technician)}::uuid, 'Completed this week', 'completed', null, ${sqlLiteral(ids.admin)}::uuid, '2026-07-27T12:00:00Z');
    `);

    await setAuthenticatedUser(database, ids.technician);
    const visibleAssets = await database.query("select id from public.assets order by id");
    if (visibleAssets.rows.length !== 1 || visibleAssets.rows[0].id !== ids.assetA) {
      throw new Error("Technician RLS did not isolate assets to the member company.");
    }
    checks.push({ name: "technician_cross_company_assets_filtered", verdict: "PASS" });

    const workspaceCountsResult = await database.query(
      `select public.get_workspace_work_order_counts(
        $1::uuid,
        $2::uuid,
        $3::text,
        $4::date,
        $5::timestamptz,
        $6::timestamptz,
        $7::timestamptz
      ) as counts`,
      [
        ids.companyA,
        ids.locationA,
        "assigned",
        "2026-07-27",
        "2026-07-01T00:00:00Z",
        "2026-07-26T00:00:00Z",
        "2026-08-02T00:00:00Z",
      ]
    );
    const workspaceCounts = typeof workspaceCountsResult.rows[0]?.counts === "string"
      ? JSON.parse(workspaceCountsResult.rows[0].counts)
      : workspaceCountsResult.rows[0]?.counts;
    const expectedCompanyCounts = {
      activeWork: 3,
      newWork: 1,
      inProgress: 1,
      blocked: 1,
      overdue: 1,
      completedAll: 2,
      completedMonth: 2,
      completedWeek: 1,
    };
    const expectedAssignedCounts = {
      activeWork: 2,
      newWork: 1,
      inProgress: 1,
      blocked: 0,
      overdue: 1,
      completedAll: 2,
      completedMonth: 2,
      completedWeek: 1,
    };
    if (Object.entries(expectedCompanyCounts).some(([key, value]) => Number(workspaceCounts?.workOrders?.[key]) !== value)) {
      throw new Error(`Workspace company counts were incorrect: ${JSON.stringify(workspaceCounts?.workOrders)}`);
    }
    if (Object.entries(expectedAssignedCounts).some(([key, value]) => Number(workspaceCounts?.myWork?.[key]) !== value)) {
      throw new Error(`Workspace assigned counts were incorrect: ${JSON.stringify(workspaceCounts?.myWork)}`);
    }

    const createdCountsResult = await database.query(
      `select public.get_workspace_work_order_counts(
        $1::uuid,
        $2::uuid,
        'created',
        '2026-07-27'::date,
        '2026-07-01T00:00:00Z'::timestamptz,
        '2026-07-26T00:00:00Z'::timestamptz,
        '2026-08-02T00:00:00Z'::timestamptz
      ) as counts`,
      [ids.companyA, ids.locationA]
    );
    const createdCounts = typeof createdCountsResult.rows[0]?.counts === "string"
      ? JSON.parse(createdCountsResult.rows[0].counts)
      : createdCountsResult.rows[0]?.counts;
    if (
      Number(createdCounts?.myWork?.activeWork) !== 1
      || Number(createdCounts?.myWork?.inProgress) !== 1
      || Number(createdCounts?.myWork?.completedAll) !== 0
    ) {
      throw new Error(`Workspace created-by counts were incorrect: ${JSON.stringify(createdCounts?.myWork)}`);
    }
    checks.push({ name: "workspace_work_order_counts_match_role_and_date_scope", verdict: "PASS" });

    let mismatchedLocationDenied = false;
    try {
      await database.query(
        `select public.get_workspace_work_order_counts(
          $1::uuid,
          $2::uuid,
          'assigned',
          '2026-07-27'::date,
          '2026-07-01T00:00:00Z'::timestamptz,
          '2026-07-26T00:00:00Z'::timestamptz,
          '2026-08-02T00:00:00Z'::timestamptz
        )`,
        [ids.companyA, ids.locationB]
      );
    } catch {
      mismatchedLocationDenied = true;
    }
    if (!mismatchedLocationDenied) throw new Error("Workspace count RPC allowed a location from another company.");
    checks.push({ name: "workspace_work_order_counts_cross_company_location_denied", verdict: "PASS" });

    let invalidFilterDenied = false;
    try {
      await database.query(
        `select public.get_workspace_work_order_counts(
          $1::uuid,
          $2::uuid,
          'unsupported',
          '2026-07-27'::date,
          '2026-07-01T00:00:00Z'::timestamptz,
          '2026-07-26T00:00:00Z'::timestamptz,
          '2026-08-02T00:00:00Z'::timestamptz
        )`,
        [ids.companyA, ids.locationA]
      );
    } catch {
      invalidFilterDenied = true;
    }
    if (!invalidFilterDenied) throw new Error("Workspace count RPC accepted an unsupported My Work filter.");
    checks.push({ name: "workspace_work_order_counts_invalid_filter_denied", verdict: "PASS" });

    let crossCompanyCountsDenied = false;
    try {
      await database.query(
        `select public.get_workspace_work_order_counts(
          $1::uuid,
          $2::uuid,
          'assigned',
          '2026-07-27'::date,
          '2026-07-01T00:00:00Z'::timestamptz,
          '2026-07-26T00:00:00Z'::timestamptz,
          '2026-08-02T00:00:00Z'::timestamptz
        )`,
        [ids.companyB, ids.locationB]
      );
    } catch {
      crossCompanyCountsDenied = true;
    }
    if (!crossCompanyCountsDenied) throw new Error("Workspace count RPC allowed a cross-company read.");
    checks.push({ name: "workspace_work_order_counts_cross_company_denied", verdict: "PASS" });

    let crossCompanyInsertDenied = false;
    try {
      await database.exec(`
        insert into public.assets (company_id, location_id, name, created_by)
        values (${sqlLiteral(ids.companyB)}::uuid, ${sqlLiteral(ids.locationB)}::uuid, 'Forbidden', ${sqlLiteral(ids.technician)}::uuid)
      `);
    } catch {
      crossCompanyInsertDenied = true;
    }
    if (!crossCompanyInsertDenied) throw new Error("Technician cross-company asset insert was allowed.");
    checks.push({ name: "technician_cross_company_asset_insert_denied", verdict: "PASS" });

    let rawTelemetryReadDenied = false;
    try {
      await database.query("select * from public.app_performance_samples");
    } catch {
      rawTelemetryReadDenied = true;
    }
    if (!rawTelemetryReadDenied) throw new Error("Authenticated users can read raw performance telemetry.");
    checks.push({ name: "performance_raw_samples_not_client_readable", verdict: "PASS" });

    const telemetryInsert = await database.query(
      "select public.record_app_performance_samples($1::uuid, $2::jsonb) as inserted",
      [ids.companyA, JSON.stringify([
        { metric: "session_start", value: 1, unit: "count", context: { source: "isolated-lfes" } },
        { metric: "lcp_ms", value: 2200, unit: "ms", context: { source: "isolated-lfes", viewport_class: "desktop" } },
      ])]
    );
    if (Number(telemetryInsert.rows[0]?.inserted) !== 2) throw new Error("Technician could not submit allowed company telemetry.");
    checks.push({ name: "company_member_performance_sample_insert", verdict: "PASS" });

    await database.query(
      "select public.record_app_performance_samples($1::uuid, $2::jsonb)",
      [ids.companyA, JSON.stringify([
        { metric: "lcp_ms", value: 5900, unit: "ms", context: { source: "isolated-lfes", viewport_class: "desktop" } },
        { metric: "session_start", value: 1, unit: "count", context: { source: "isolated-lfes" } },
        { metric: "lcp_ms", value: 1800, unit: "ms", context: { source: "isolated-lfes", viewport_class: "mobile" } },
      ])]
    );

    let crossCompanyTelemetryDenied = false;
    try {
      await database.query(
        "select public.record_app_performance_samples($1::uuid, $2::jsonb)",
        [ids.companyB, JSON.stringify([{ metric: "lcp_ms", value: 2000, unit: "ms" }])]
      );
    } catch {
      crossCompanyTelemetryDenied = true;
    }
    if (!crossCompanyTelemetryDenied) throw new Error("Technician submitted telemetry to another company.");

    let crossCompanyDashboardDenied = false;
    try {
      await database.query("select public.get_app_performance_dashboard($1::uuid, 30)", [ids.companyB]);
    } catch {
      crossCompanyDashboardDenied = true;
    }
    if (!crossCompanyDashboardDenied) throw new Error("Technician read another company's performance dashboard.");
    checks.push({ name: "performance_cross_company_rpc_denied", verdict: "PASS" });

    let mismatchedTelemetryUnitDenied = false;
    try {
      await database.query(
        "select public.record_app_performance_samples($1::uuid, $2::jsonb)",
        [ids.companyA, JSON.stringify([{ metric: "lcp_ms", value: 2000, unit: "fps" }])]
      );
    } catch {
      mismatchedTelemetryUnitDenied = true;
    }
    if (!mismatchedTelemetryUnitDenied) throw new Error("Telemetry accepted a mismatched metric unit.");
    checks.push({ name: "performance_metric_shape_enforced", verdict: "PASS" });

    const dashboardResult = await database.query(
      "select public.get_app_performance_dashboard($1::uuid, 30) as dashboard",
      [ids.companyA]
    );
    const dashboard = typeof dashboardResult.rows[0]?.dashboard === "string"
      ? JSON.parse(dashboardResult.rows[0].dashboard)
      : dashboardResult.rows[0]?.dashboard;
    if (
      Number(dashboard?.sample_count) !== 4
      || Number(dashboard?.raw_sample_count) !== 5
      || Number(dashboard?.duplicate_vital_samples_ignored) !== 1
      || Number(dashboard?.metrics?.lcp_ms?.count) !== 2
      || Number(dashboard?.metrics?.lcp_ms?.p75) !== 5900
    ) {
      throw new Error("Performance dashboard did not return the expected company aggregate.");
    }
    if (JSON.stringify(dashboard).includes(ids.technician) || Object.hasOwn(dashboard || {}, "recorded_by")) {
      throw new Error("Performance dashboard exposed a contributor identity.");
    }
    checks.push({ name: "performance_dashboard_is_aggregate_without_identity", verdict: "PASS" });
    checks.push({ name: "performance_dashboard_deduplicates_vitals_by_session", verdict: "PASS" });

    await setAuthenticatedUser(database, ids.manager);
    const managerFinancialRead = await database.query("select id from public.asset_financials");
    if (managerFinancialRead.rows.length !== 1) throw new Error("Manager could not read company financial records.");
    const managerFinancialUpdate = await database.query(
      "update public.asset_financials set finance_notes = 'manager write' where id = $1 returning id",
      [ids.financialA]
    );
    if (managerFinancialUpdate.rows.length !== 0) throw new Error("Manager was allowed to update financial records.");
    checks.push({ name: "manager_financial_read_only", verdict: "PASS" });

    await setAuthenticatedUser(database, ids.accounting);
    const accountingFinancialUpdate = await database.query(
      "update public.asset_financials set finance_notes = 'accounting write', updated_by = $1 where id = $2 returning id",
      [ids.accounting, ids.financialA]
    );
    if (accountingFinancialUpdate.rows.length !== 1) throw new Error("Accounting could not update financial records.");
    checks.push({ name: "accounting_financial_update_allowed", verdict: "PASS" });

    const accountingOperationalUpdate = await database.query(
      "update public.assets set name = 'accounting write' where id = $1 returning id",
      [ids.assetA]
    );
    if (accountingOperationalUpdate.rows.length !== 0) throw new Error("Accounting was allowed to update operational equipment.");
    let accountingOperationalInsertDenied = false;
    try {
      await database.exec(`
        insert into public.assets (company_id, location_id, name, created_by)
        values (${sqlLiteral(ids.companyA)}::uuid, ${sqlLiteral(ids.locationA)}::uuid, 'Accounting Forbidden', ${sqlLiteral(ids.accounting)}::uuid)
      `);
    } catch {
      accountingOperationalInsertDenied = true;
    }
    if (!accountingOperationalInsertDenied) throw new Error("Accounting was allowed to create operational equipment.");
    checks.push({ name: "accounting_operational_asset_writes_denied", verdict: "PASS" });

    await resetRole(database);
    const report = {
      status: "PASS",
      scope: "Isolated PostgreSQL compile, migration apply, catalog security checks, and seeded RLS role checks",
      startedAt,
      completedAt: new Date().toISOString(),
      migrations: migrationFiles,
      checks,
    };
    writeEvidence("isolated-schema.json", report);
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await database.close();
  }
}

main().catch((error) => {
  const report = {
    status: "FAIL",
    scope: "Isolated PostgreSQL compile, migration apply, catalog security checks, and seeded RLS role checks",
    completedAt: new Date().toISOString(),
    error: error.message,
  };
  writeEvidence("isolated-schema.json", report);
  console.error(JSON.stringify(report, null, 2));
  process.exitCode = 1;
});
