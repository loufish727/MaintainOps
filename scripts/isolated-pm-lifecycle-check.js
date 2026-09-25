const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const root = path.resolve(__dirname, "..");
const migrationName = "20260923051845_pm_lifecycle_integrity.sql";
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");

async function checkPmLifecycle() {
  const { PGlite } = await import("@electric-sql/pglite");
  const { pgcrypto } = await import("@electric-sql/pglite/contrib/pgcrypto");
  // No URL, data directory, credentials, network client, or evidence-file writes.
  const db = new PGlite({ extensions: { pgcrypto } });
  const checks = [];
  const query = (sql, args = []) => db.query(sql, args);
  const row = async (sql, args = []) => {
    const value = (await query(sql, args)).rows[0];
    if (!value) return value;
    for (const key of ["due_at", "next_due_at", "preventive_due_at"]) {
      if (value[key] instanceof Date) value[key] = value[key].toISOString().slice(0, 10);
    }
    return value;
  };
  const owner = () => db.exec("reset role");
  const asUser = async (id, role = "authenticated") => {
    assert.ok(["authenticated", "anon"].includes(role));
    await db.exec(`reset role; set role ${role}`);
    await query("select set_config('request.jwt.claim.sub', $1, false)", [id || ""]);
    await query("select set_config('request.jwt.claims', $1, false)", [JSON.stringify({ sub: id })]);
  };
  const denied = async (sql, args, message) => {
    await assert.rejects(query(sql, args), message);
  };
  const pass = (name) => checks.push(name);
  try {
    await db.exec(read("tests/fixtures/supabase-postgres-prelude.sql"));
    await db.exec(read("supabase/schema.sql"));
    for (const name of ["maintenance-requests", "maintenance-request-photos", "locations", "public-request-links", "asset-parts", "asset-documents", "procedures", "cleanup-delete-paths",
      "admin-delete-work-orders", "message-center", "message-soft-delete-and-thread-scope", "message-thread-soft-delete", "message-work-order-links", "app-issue-reports"]) {
      await db.exec(read(`supabase/step-next-${name}.sql`));
    }
    const migrations = fs.readdirSync(path.join(root, "supabase/migrations")).filter(name => name.endsWith(".sql")).sort();
    for (const name of migrations.filter(name => name < migrationName)) await db.exec(read(`supabase/migrations/${name}`));

    const users = Object.fromEntries(["admin", "manager", "technician", "production", "accounting", "outsider"].map(role => [role, randomUUID()]));
    for (const id of Object.values(users)) await query("insert into auth.users(id) values ($1)", [id]);
    const company = (await row("insert into public.companies(name, created_by) values ('PM A', $1) returning id", [users.admin])).id;
    const other = (await row("insert into public.companies(name, created_by) values ('PM B', $1) returning id", [users.outsider])).id;
    for (const [role, id] of Object.entries(users)) {
      await query("insert into public.company_members(company_id, user_id, role) values ($1, $2, $3)",
        [role === "outsider" ? other : company, id, role === "outsider" ? "admin" : role]);
      await query("insert into public.profiles(company_id, user_id, full_name) values ($1, $2, $3)",
        [role === "outsider" ? other : company, id, role]);
    }
    await query("select set_config('request.jwt.claim.sub', $1, false)", [users.admin]);
    const location = (await row("insert into public.locations(company_id,name) values ($1,'Current') returning id", [company])).id;
    const oldLocation = (await row("insert into public.locations(company_id,name) values ($1,'Old') returning id", [company])).id;
    const asset = (await row("insert into public.assets(company_id,location_id,name,safety_devices_required) values ($1,$2,'Press',true) returning id", [company, location])).id;
    const template = (await row("insert into public.procedure_templates(company_id,name,created_by) values ($1,'Inspection',$2) returning id", [company, users.admin])).id;
    const emptyTemplate = (await row("insert into public.procedure_templates(company_id,name,created_by) values ($1,'Other inspection',$2) returning id", [company, users.admin])).id;
    const foreignTemplate = (await row("insert into public.procedure_templates(company_id,name,created_by) values ($1,'Foreign',$2) returning id", [other, users.outsider])).id;
    const step = (await row("insert into public.procedure_steps(company_id,procedure_template_id,position,prompt) values ($1,$2,1,'Check') returning id", [company, template])).id;
    const otherStep = (await row("insert into public.procedure_steps(company_id,procedure_template_id,position,prompt,required) values ($1,$2,1,'Other',false) returning id", [company, emptyTemplate])).id;
    const legacy = (await row("insert into public.work_orders(company_id,title,created_by,status,completed_at,procedure_template_id) values ($1,'Historical incomplete',$2,'completed',now(),$3) returning id", [company, users.admin, template])).id;

    await db.exec(read(`supabase/migrations/${migrationName}`));
    for (const name of migrations.filter(name => name > migrationName)) await db.exec(read(`supabase/migrations/${name}`));
    pass("legacy_baselines_and_all_dated_migrations_compile");
    const api = (schedule, due, targetCompany = company) => query(
      "select public.generate_preventive_work_order($1,$2,$3::date) as result", [targetCompany, schedule, due]);
    const generate = async (schedule, due, targetCompany = company) => (await api(schedule, due, targetCompany)).rows[0].result;
    const schedule = async (due = "2026-01-31", frequency = "monthly", procedure = template) => {
      await owner();
      return (await row("insert into public.preventive_schedules(company_id,location_id,asset_id,title,frequency,next_due_at,procedure_template_id,created_by) values ($1,$2,$3,'Monthly Press',$4,$5,$6,$7) returning id",
        [company, oldLocation, asset, frequency, due, procedure, users.admin])).id;
    };
    const source = await schedule();
    await asUser(users.technician);
    const first = await generate(source, "2026-01-31");
    assert.equal(first.next_due_at, "2026-02-28");
    assert.equal(first.reused, false);
    const work = await row("select * from public.work_orders where id=$1", [first.work_order_id]);
    assert.equal(work.asset_id, asset);
    assert.equal(work.location_id, location);
    assert.equal(work.procedure_template_id, template);
    assert.equal(work.preventive_schedule_id, source);
    assert.equal(work.preventive_source_id, source);
    assert.equal(work.preventive_source_title, "Monthly Press");
    assert.equal(work.preventive_due_at, "2026-01-31");
    assert.equal(work.type, "preventive");
    assert.equal(work.safety_check_required, true);
    assert.equal(work.safety_devices_checked, false);
    assert.equal(work.created_by, users.technician);
    const history = await row("select * from public.work_order_events where work_order_id=$1", [work.id]);
    assert.equal(history.actor_id, users.technician);
    assert.equal(history.event_type, "created");
    assert.match(history.summary, /Monthly Press.*2026-01-31/);
    pass("generation_copies_current_asset_location_safety_procedure_and_durable_source");

    const retry = await generate(source, "2026-01-31");
    assert.deepEqual(retry, { ...first, reused: true });
    assert.equal(Number((await row("select count(*) as count from public.work_order_events where work_order_id=$1", [work.id])).count), 1);
    await assert.rejects(api(source, "2026-02-01"), /due date changed/);
    await assert.rejects(api(source, null), /valid schedule/);
    pass("retry_reuses_occurrence_without_another_advance_or_created_event");

    for (const role of ["accounting", "outsider"]) {
      await asUser(users[role]);
      await assert.rejects(api(source, "2026-01-31"), /Operational edit access/);
    }
    await asUser(null);
    await assert.rejects(api(source, "2026-01-31"), /Operational edit access/);
    await asUser(null, "anon");
    await assert.rejects(api(source, "2026-01-31"), /permission denied/);
    await asUser(users.admin);
    await assert.rejects(api(source, "2026-01-31", other), /Operational edit access/);
    await asUser(users.outsider);
    await assert.rejects(api(source, "2026-01-31", other), /not found/);
    pass("anonymous_accounting_outsider_and_wrong_company_generation_denied");

    for (const [role, date, frequency, expected] of [
      ["admin", "2028-01-31", "monthly", "2028-02-29"],
      ["manager", "2026-11-30", "quarterly", "2027-02-28"],
      ["production", "2026-03-08", "weekly", "2026-03-15"],
    ]) {
      const id = await schedule(date, frequency, null);
      await asUser(users[role]);
      assert.equal((await generate(id, date)).next_due_at, expected);
    }
    pass("modern_operational_roles_and_month_end_leap_weekly_recurrence");
    const inactive = await schedule();
    await query("update public.preventive_schedules set active=false where id=$1", [inactive]);
    await asUser(users.admin);
    await assert.rejects(api(inactive, "2026-01-31"), /inactive/);
    const maxDate = await schedule("9999-12-31");
    await asUser(users.admin);
    await assert.rejects(api(maxDate, "9999-12-31"), /supported date range/);
    pass("inactive_and_date_overflow_generation_denied");

    const rollback = await schedule();
    await db.exec("create policy pm_test_deny_created on public.work_order_events as restrictive for insert to authenticated with check (false)");
    await asUser(users.admin);
    await assert.rejects(api(rollback, "2026-01-31"), /row-level security/);
    assert.equal((await row("select next_due_at from public.preventive_schedules where id=$1", [rollback])).next_due_at, "2026-01-31");
    assert.equal(Number((await row("select count(*) as count from public.work_orders where preventive_source_id=$1", [rollback])).count), 0);
    await owner();
    await db.exec("drop policy pm_test_deny_created on public.work_order_events");
    await asUser(users.admin);
    assert.equal((await generate(rollback, "2026-01-31")).reused, false);
    pass("history_rls_failure_rolls_back_work_order_and_schedule_advance");

    await denied("update public.work_orders set procedure_template_id=$1 where id=$2", [foreignTemplate, work.id], /company/);
    await denied("update public.work_orders set company_id=$1 where id=$2", [other, work.id], /company cannot|Not a member/);
    await denied("update public.procedure_templates set company_id=$1 where id=$2", [other, template], /company cannot/);
    await denied("update public.preventive_schedules set procedure_template_id=$1 where id=$2", [foreignTemplate, source], /company/);
    await denied("update public.procedure_steps set procedure_template_id=$1 where id=$2", [foreignTemplate, step], /parent/);
    await denied("insert into public.work_order_step_results(company_id,work_order_id,procedure_step_id,value) values ($1,$2,$3,'checked')", [company, work.id, otherStep], /current work order procedure/);
    await denied("insert into public.work_order_step_results(company_id,work_order_id,procedure_step_id,value) values ($1,$2,$3,'checked')", [other, work.id, step], /company|Work history is not available/);
    await denied("update public.work_orders set status='completed',completed_at=now(),safety_devices_checked=true where id=$1", [work.id], /required procedure/);
    const result = (await row("insert into public.work_order_step_results(company_id,work_order_id,procedure_step_id,value,completed_by,completed_at) values ($1,$2,$3,'checked',$4,now()) returning id", [company, work.id, step, users.admin])).id;
    await denied("update public.work_order_step_results set procedure_step_id=$1 where id=$2", [otherStep, result], /parent/);
    await denied("update public.work_order_step_results set work_order_id=$1 where id=$2", [legacy, result], /parent/);
    await denied("update public.work_order_step_results set company_id=$1 where id=$2", [other, result], /parent|cannot change company/);
    await denied("insert into public.work_order_step_results(company_id,work_order_id,procedure_step_id,value) values ($1,$2,$3,'')", [company, legacy, step], /Reopen/);
    await asUser(users.accounting);
    assert.equal((await query("update public.work_order_step_results set value='' where id=$1 returning id", [result])).rows.length, 0);
    await denied("insert into public.work_order_step_results(company_id,work_order_id,procedure_step_id,value) values ($1,$2,$3,'checked')", [company, legacy, step], /not available|row-level security/);
    await asUser(users.admin);
    await denied("insert into public.work_orders(company_id,title,created_by,procedure_template_id,status,completed_at) values ($1,'Forbidden completed',$2,$3,'completed',now())", [company, users.admin, template], /required procedure/);
    await denied("insert into public.work_orders(company_id,title,created_by,procedure_template_id) values ($1,'Wrong procedure',$2,$3)", [company, users.admin, foreignTemplate], /company/);
    pass("result_insert_update_parent_company_current_procedure_and_role_boundaries");

    await query("update public.work_orders set status='completed',completed_at=now(),safety_devices_checked=true where id=$1", [work.id]);
    await denied("update public.work_order_step_results set value='' where id=$1", [result], /Reopen/);
    await query("update public.work_orders set status='open',completed_at=null,safety_devices_checked=false where id=$1", [work.id]);
    assert.equal((await row("select value from public.work_order_step_results where id=$1", [result])).value, "checked");
    await query("update public.work_order_step_results set value='' where id=$1", [result]);
    await denied("update public.work_orders set status='completed',completed_at=now(),safety_devices_checked=true where id=$1", [work.id], /required procedure/);
    await query("update public.work_order_step_results set value='checked' where id=$1", [result]);
    await query("update public.work_orders set status='completed',completed_at=now(),safety_devices_checked=true where id=$1", [work.id]);
    const completed = await row("select * from public.work_orders where id=$1", [work.id]);
    for (const key of ["asset_id", "procedure_template_id", "preventive_source_id", "preventive_source_title", "preventive_due_at"]) assert.equal(completed[key], work[key]);
    assert.equal((await row("select next_due_at from public.preventive_schedules where id=$1", [source])).next_due_at, "2026-02-28");
    pass("both_completion_clear_orderings_enforced_and_reopen_retains_connections");

    assert.equal((await row("select preventive_source_id from public.work_orders where id=$1", [legacy])).preventive_source_id, null);
    await query("update public.work_orders set title='Historical title edit' where id=$1", [legacy]);
    await query("update public.work_orders set status='open',completed_at=null where id=$1", [legacy]);
    await denied("update public.work_orders set status='completed',completed_at=now() where id=$1", [legacy], /required procedure/);
    pass("no_backfill_and_legacy_completed_edits_allowed_until_recompletion");

    for (const [type, value, expected] of [["checkbox", "checked", true], ["checkbox", "false", false], ["checkbox", " checked ", false],
      ["pass_fail", "pass", true], ["pass_fail", "fail", true], ["pass_fail", "other", false],
      ["number", "0", true], ["number", "1.2e3", true], ["number", "NaN", false],
      ["number", "Infinity", false], ["number", "1e999", false], ["text", " \t\n", false]]) {
      assert.equal((await row("select private.procedure_result_answered($1,$2) as answered", [type, value])).answered, expected);
    }
    pass("typed_required_answer_semantics");

    const overlappingCounts = await row("select * from public.get_procedure_link_counts($1,$2::uuid[])", [company, [template]]);
    const currentLinked = await row("select count(*) as count from public.work_orders where company_id=$1 and procedure_template_id=$2", [company, template]);
    assert.equal(Number(overlappingCounts.work_order_count), Number(currentLinked.count));
    await denied("delete from public.procedure_templates where id=$1", [template], /foreign key/);
    await query("update public.work_orders set procedure_template_id=$1 where id=$2", [emptyTemplate, work.id]);
    const unansweredTemplate = (await row("insert into public.procedure_templates(company_id,name,created_by) values ($1,'Unanswered',$2) returning id", [company, users.admin])).id;
    await query("insert into public.procedure_steps(company_id,procedure_template_id,position,prompt) values ($1,$2,1,'Required')", [company, unansweredTemplate]);
    await denied("update public.work_orders set procedure_template_id=$1 where id=$2", [unansweredTemplate, work.id], /required procedure/);
    await denied("update public.work_order_step_results set value='checked' where id=$1", [result], /current work order procedure/);
    await query("update public.work_orders set procedure_template_id=null where id=$1", [legacy]);
    await query("update public.work_orders set procedure_template_id=null where preventive_source_id=$1", [rollback]);
    await query("update public.preventive_schedules set procedure_template_id=null where company_id=$1", [company]);
    await denied("delete from public.procedure_steps where id=$1", [step], /foreign key/);
    await denied("delete from public.procedure_templates where id=$1", [template], /foreign key/);
    assert.equal((await row("select value from public.work_order_step_results where id=$1", [result])).value, "checked");
    const retainedCounts = await row("select * from public.get_procedure_link_counts($1,$2::uuid[])", [company, [template]]);
    assert.equal(Number(retainedCounts.work_order_count), 1);
    assert.equal(Number(retainedCounts.schedule_count), 0);
    pass("recorded_results_block_procedure_deletion_after_current_links_change");

    await query("update public.work_orders set title='Editable title',due_at='2026-02-02' where id=$1", [work.id]);
    await denied("update public.work_orders set preventive_source_title='Changed' where id=$1", [work.id], /cannot be changed/);
    await denied("update public.work_orders set preventive_schedule_id=null where id=$1", [work.id], /deleting its schedule/);
    await query("delete from public.preventive_schedules where id=$1", [source]);
    const retained = await row("select * from public.work_orders where id=$1", [work.id]);
    assert.equal(retained.preventive_schedule_id, null);
    for (const key of ["preventive_source_id", "preventive_source_title", "preventive_due_at"]) assert.equal(retained[key], work[key]);
    assert.equal((await generate(source, "2026-01-31")).work_order_id, work.id);
    assert.equal((await generate(source, "2026-01-31")).next_due_at, null);
    assert.equal(Number((await row("select count(*) as count from public.work_order_events where work_order_id=$1", [work.id])).count), 1);
    pass("schedule_delete_preserves_work_results_history_source_and_retry_identity");

    const disposable = await schedule("2026-05-01", "weekly", null);
    await asUser(users.admin);
    const disposableWork = await generate(disposable, "2026-05-01");
    await query("delete from public.work_orders where id=$1", [disposableWork.work_order_id]);
    assert.equal((await row("select next_due_at from public.preventive_schedules where id=$1", [disposable])).next_due_at, "2026-05-08");
    await assert.rejects(api(disposable, "2026-05-01"), /due date changed/);
    pass("work_order_delete_does_not_rewind_or_regenerate_stale_occurrence");

    await owner();
    await query("insert into public.work_orders(company_id,title,created_by,procedure_template_id) select $1,'Count ' || n,$2,$3 from generate_series(1,1001) n", [company, users.admin, emptyTemplate]);
    const expectedCount = Number((await row("select count(*) as count from public.work_orders where company_id=$1 and procedure_template_id=$2", [company, emptyTemplate])).count);
    await schedule("2026-08-01", "monthly", emptyTemplate);
    const countInactive = await schedule("2026-08-01", "monthly", emptyTemplate);
    await query("update public.preventive_schedules set active=false where id=$1", [countInactive]);
    await asUser(users.accounting);
    const counts = (await query("select * from public.get_procedure_link_counts($1,$2::uuid[])", [company, [emptyTemplate, emptyTemplate, foreignTemplate]])).rows;
    assert.equal(counts.length, 1);
    assert.equal(counts[0].procedure_template_id, emptyTemplate);
    assert.equal(Number(counts[0].work_order_count), expectedCount);
    assert.equal(Number(counts[0].schedule_count), 2);
    assert.equal((await query("select * from public.get_procedure_link_counts($1,$2::uuid[])", [company, []])).rows.length, 0);
    await asUser(users.outsider);
    assert.equal((await query("select * from public.get_procedure_link_counts($1,$2::uuid[])", [company, [emptyTemplate]])).rows.length, 0);
    pass("aggregate_counts_exceed_api_page_size_deduplicate_requested_ids_and_respect_rls");

    await owner();
    const functions = (await query("select proname,prosecdef from pg_proc where proname in ('generate_preventive_work_order','get_procedure_link_counts','guard_work_order_step_result','guard_procedure_work_order')")).rows;
    assert.equal(functions.length, 4);
    assert.ok(functions.every(fn => !fn.prosecdef));
    const sourceText = (await row("select pg_get_functiondef('private.guard_work_order_step_result()'::regprocedure) as definition")).definition;
    assert.match(sourceText, /for update/i);
    pass("invoker_execution_and_parent_lock_catalog_contract");
    await db.exec(read(`supabase/migrations/${migrationName}`));
    assert.equal((await row("select preventive_source_title from public.work_orders where id=$1", [work.id])).preventive_source_title, "Monthly Press");
    pass("migration_reapplication_preserves_existing_history");
    return { status: "PASS", scope: "Isolated in-memory PM lifecycle and RLS; no hosted backend", checks };
  } finally {
    await db.close();
  }
}

module.exports = { checkPmLifecycle };
if (require.main === module) {
  checkPmLifecycle().then(report => console.log(JSON.stringify(report, null, 2))).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
