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
  await asUser(db, ids.admin);
  const part = (await db.query("insert into public.parts(company_id,location_id,name,quantity_on_hand,unit_cost) values ($1,$2,'Boundary part',10,12.50) returning id", [ids.companyA, ids.locationA])).rows[0].id;
  const beforeUsage = Number((await db.query('select count(*) from public.work_order_parts where work_order_id=$1', [converted.id])).rows[0].count);
  for (const actor of [ids.accounting, ids.outsider]) {
    await asUser(db, actor);
    await assert.rejects(() => db.query('select public.record_work_order_part_usage($1,$2,$3,$4)', [ids.companyA, converted.id, part, 1]), /cannot record part usage/);
  }
  await asUser(db, ids.admin);
  assert.equal((await db.query('select quantity_on_hand from public.parts where id=$1', [part])).rows[0].quantity_on_hand, 10);
  assert.equal(Number((await db.query('select count(*) from public.work_order_parts where work_order_id=$1', [converted.id])).rows[0].count), beforeUsage);
  for (const actor of [ids.technician, ids.production, ids.manager, ids.admin]) {
    await asUser(db, actor);
    await db.query('select public.record_work_order_part_usage($1,$2,$3,$4)', [ids.companyA, converted.id, part, 1]);
  }
  assert.equal((await db.query('select quantity_on_hand from public.parts where id=$1', [part])).rows[0].quantity_on_hand, 6);
  const usage = (await db.query('select created_by,quantity_used,unit_cost_at_use from public.work_order_parts where part_id=$1', [part])).rows;
  assert.equal(usage.length, 4);
  assert.equal(new Set(usage.map(row => row.created_by)).size, 4);
  assert(usage.every(row => row.quantity_used === 1 && Number(row.unit_cost_at_use) === 12.5));
  checks.push({ name: 'appwide:part_usage_role_denial_and_operational_success', verdict: 'PASS' });
  return checks;
}
module.exports = { verifyAppwide };
