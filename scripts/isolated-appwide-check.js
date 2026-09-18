const assert = require('node:assert/strict');

async function verifyAppwide(db, ids, asUser, resetRole) {
  const checks = [];
  await asUser(db, ids.admin);
  await db.query('select public.update_company_member_role($1,$2,$3)', [ids.companyA, ids.technician, 'manager']);
  assert.equal((await db.query('select role from public.company_members where company_id=$1 and user_id=$2', [ids.companyA, ids.technician])).rows[0].role, 'manager');
  await db.query('select public.update_company_member_role($1,$2,$3)', [ids.companyA, ids.technician, 'technician']);
  await assert.rejects(() => db.query('select public.update_company_member_role($1,$2,$3)', [ids.companyA, ids.admin, 'technician']), /own role/);
  for (const actor of [ids.manager, ids.technician, ids.accounting, ids.production, ids.outsider]) {
    await asUser(db, actor);
    await assert.rejects(() => db.query('select public.update_company_member_role($1,$2,$3)', [ids.companyA, ids.technician, 'admin']), /Only admins/);
  }
  checks.push({ name: 'appwide:admin_role_round_trip_self_nonadmin_and_outsider_denial', verdict: 'PASS' });
  await asUser(db, ids.technician);
  const source = (await db.query("insert into public.maintenance_requests(company_id,asset_id,title,requested_by) values ($1,$2,'Isolated conversion',$3) returning id", [ids.companyA, ids.assetA, ids.technician])).rows[0].id;
  await resetRole(db);
  await db.exec(`create function public.qa_reject_request_link() returns trigger language plpgsql as $$ begin raise exception 'QA link write failed'; end $$;
    create trigger qa_reject_request_link before update on public.maintenance_requests for each row execute function public.qa_reject_request_link();`);
  await asUser(db, ids.technician);
  const before = Number((await db.query('select count(*) from public.work_orders')).rows[0].count);
  await assert.rejects(() => db.query('select public.convert_maintenance_request($1,$2)', [ids.companyA, source]), /QA link write failed/);
  assert.equal(Number((await db.query('select count(*) from public.work_orders')).rows[0].count), before, 'Failed link must roll back the inserted work order');
  assert.equal((await db.query('select status from public.maintenance_requests where id=$1', [source])).rows[0].status, 'submitted');
  await resetRole(db);
  await db.exec('drop trigger qa_reject_request_link on public.maintenance_requests; drop function public.qa_reject_request_link();');
  await asUser(db, ids.technician);
  const converted = (await db.query('select public.convert_maintenance_request($1,$2) as result', [ids.companyA, source])).rows[0].result;
  const replayed = (await db.query('select public.convert_maintenance_request($1,$2) as result', [ids.companyA, source])).rows[0].result;
  assert.deepEqual(replayed, converted);
  assert.equal(Number((await db.query('select count(*) from public.work_orders')).rows[0].count), before + 1);
  const linked = (await db.query('select * from public.maintenance_requests where id=$1', [source])).rows[0];
  assert.equal(linked.converted_work_order_id, converted.id);
  assert.equal(linked.reviewed_by, ids.technician);
  assert.equal(Number((await db.query("select count(*) from public.work_order_events where work_order_id=$1 and event_type='request_converted'", [converted.id])).rows[0].count), 1);
  for (const actor of [ids.accounting, ids.outsider]) {
    await asUser(db, actor);
    await assert.rejects(() => db.query('select public.convert_maintenance_request($1,$2)', [ids.companyA, source]), /cannot convert/);
  }
  await asUser(db, ids.technician);
  await assert.rejects(() => db.query('select public.convert_maintenance_request($1,$2)', [ids.companyB, source]), /cannot convert|not found/);
  checks.push({ name: 'appwide:conversion_rollback_retry_history_and_role_tenant_boundaries', verdict: 'PASS' });
  return checks;
}
module.exports = { verifyAppwide };
