const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function verifyQrHistory(db, ids, asUser, resetRole) {
  await resetRole(db);
  const migration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/20260925202019_qr_replacement_history.sql'), 'utf8');
  const link = (await db.query("insert into public.public_request_links(company_id,location_id,token,created_by) values($1,$2,'qr-proof-original',$3) returning id", [ids.companyA, ids.locationA, ids.manager])).rows[0].id;
  const foreignLink = (await db.query("insert into public.public_request_links(company_id,location_id,token) values($1,$2,'qr-proof-foreign') returning id", [ids.companyB, ids.locationB])).rows[0].id;
  await db.exec(migration);
  await db.exec(migration);
  assert.equal((await db.query('select * from public.qr_replacement_history')).rows.length, 0, 'No invented backfill');
  await db.query("update public.profiles set full_name='QR Admin Before' where company_id=$1 and user_id=$2", [ids.companyA, ids.admin]);
  await asUser(db, ids.admin);
  await db.query("update public.public_request_links set token='qr-proof-replaced' where id=$1", [link]);
  const event = (await db.query('select * from public.qr_replacement_history')).rows[0];
  assert.equal(event.actor_id, ids.admin);
  assert.equal(event.actor_name, 'QR Admin Before');
  assert.equal(event.link_id, link);
  assert.equal(event.company_id, ids.companyA);
  assert.equal(event.location_id, ids.locationA);
  assert.ok(event.facility_name);
  assert.ok(event.replaced_at);
  assert.equal(JSON.stringify(event).includes('qr-proof-replaced'), false, 'Never store the QR token');
  assert.equal((await db.query('select created_by from public.public_request_links where id=$1', [link])).rows[0].created_by, ids.manager);
  await db.query("update public.public_request_links set token='qr-proof-replaced',is_active=false,last_used_at=now(),updated_at=now() where id=$1", [link]);
  assert.equal((await db.query('select * from public.qr_replacement_history')).rows.length, 1, 'No events for same token or unrelated updates');
  await db.query("update public.profiles set full_name='QR Admin After' where company_id=$1 and user_id=$2", [ids.companyA, ids.admin]);
  await db.query('update public.locations set name=$1 where id=$2', ['QA renamed facility', ids.locationA]);
  assert.equal((await db.query('select actor_name,facility_name from public.qr_replacement_history')).rows[0].actor_name, 'QR Admin Before');
  assert.equal((await db.query('select facility_name from public.qr_replacement_history')).rows[0].facility_name, event.facility_name);
  await assert.rejects(db.query('update public.public_request_links set location_id=$1 where id=$2', [ids.locationB, link]), /cannot be reassigned/);
  await assert.rejects(db.query('update public.public_request_links set company_id=$1 where id=$2', [ids.companyB, link]), /cannot be reassigned/);
  await assert.rejects(db.query("update public.public_request_links set token='qr-proof-foreign' where id=$1", [link]), /duplicate key/);
  assert.equal((await db.query('select * from public.qr_replacement_history')).rows.length, 1, 'Failed token change rolls history back');
  for (const role of ['admin', 'manager', 'technician', 'production', 'accounting', 'outsider']) {
    await asUser(db, ids[role]);
    const mayRead = ['admin', 'manager'].includes(role);
    assert.equal((await db.query('select * from public.qr_replacement_history')).rows.length, mayRead ? 1 : 0, role);
    assert.equal((await db.query('select * from public.get_qr_replacement_summaries($1)', [ids.companyA])).rows.length, mayRead ? 1 : 0, `${role} summary`);
    for (const sql of [
      "insert into public.qr_replacement_history(company_id,link_id,location_id,facility_name,actor_name) values($1,$2,$3,'Forged','Forged')",
      "update public.qr_replacement_history set actor_name='Forged' where company_id=$1 and link_id=$2 and location_id=$3",
      'delete from public.qr_replacement_history where company_id=$1 and link_id=$2 and location_id=$3',
    ]) await assert.rejects(db.query(sql, [ids.companyA, link, ids.locationA]), /permission denied/);
    if (role !== 'admin') assert.equal((await db.query("update public.public_request_links set token='qr-proof-denied' where id=$1 returning id", [link])).rows.length, 0, `${role} cannot replace`);
  }
  await resetRole(db);
  await db.exec("set role anon");
  await assert.rejects(db.query('select * from public.qr_replacement_history'), /permission denied/);
  await assert.rejects(db.query('select * from public.get_qr_replacement_summaries($1)', [ids.companyA]), /permission denied/);
  await resetRole(db);
  await db.exec("select set_config('request.jwt.claim.sub','',false)");
  await db.query("update public.public_request_links set token='qr-proof-system' where id=$1", [link]);
  assert.equal((await db.query('select actor_id,actor_name from public.qr_replacement_history order by id desc limit 1')).rows[0].actor_name, 'System / service (no signed-in account)');
  await asUser(db, ids.admin);
  for (let i = 0; i < 13; i++) await db.query('update public.public_request_links set token=$1 where id=$2', [`qr-proof-page-${i}`, link]);
  const latest = (await db.query('select * from public.get_qr_replacement_summaries($1)', [ids.companyA])).rows;
  assert.equal(latest.length, 1);
  assert.equal(latest[0].actor_name, 'QR Admin After');
  assert.equal((await db.query('select id from public.qr_replacement_history order by replaced_at desc,id desc limit 12')).rows.length, 12);
  assert.equal((await db.query('select id from public.qr_replacement_history order by replaced_at desc,id desc limit 12 offset 12')).rows.length, 3);
  await resetRole(db);
  await db.query('delete from public.public_request_links where id=any($1::uuid[])', [[link, foreignLink]]);
  assert.equal((await db.query('select * from public.qr_replacement_history')).rows.length, 15, 'Link deletion does not erase retained history');
  return [{ name: 'qr_history:atomic_capture_no_backfill_token_redaction_snapshots_six_role_boundaries_immutability_paging_retention', verdict: 'PASS' }];
}
module.exports = { verifyQrHistory };
