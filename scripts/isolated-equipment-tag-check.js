const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function verifyEquipmentTags(db, ids, asUser, resetRole) {
  // Recreate the pre-migration shape only in the disposable in-memory database.
  await resetRole(db);
  await db.exec('alter table public.assets drop column asset_tag; alter table public.asset_financials drop column archived_asset_tag;');
  const before = (await db.query('select id,asset_code from public.assets order by id')).rows;
  const financeBefore = (await db.query('select id,asset_tag from public.asset_financials order by id')).rows;
  const migration = fs.readFileSync(path.join(__dirname, '../supabase/migrations/202609222255_equipment_asset_tag.sql'), 'utf8');
  await db.exec(migration);
  await db.exec(migration);
  assert.deepEqual((await db.query('select id,asset_code from public.assets order by id')).rows, before);
  assert.deepEqual((await db.query('select id,asset_tag from public.asset_financials order by id')).rows, financeBefore);
  assert.equal(Number((await db.query('select count(*) from public.assets where asset_tag is not null')).rows[0].count), 0);
  await asUser(db, ids.admin);
  const asset = (await db.query("insert into public.assets(company_id,location_id,name,asset_code,asset_tag) values ($1,$2,'Tag proof','SERIAL-1','0007-A') returning id", [ids.companyA, ids.locationA])).rows[0].id;
  const finance = (await db.query("insert into public.asset_financials(company_id,asset_id,asset_tag) values ($1,$2,'FIXED-99') returning id", [ids.companyA, asset])).rows[0].id;
  for (const role of ['admin', 'manager', 'technician', 'production']) {
    await asUser(db, ids[role]);
    const result = await db.query('update public.assets set asset_tag=$1 where id=$2 returning asset_tag,asset_code', [`0007-${role}`, asset]);
    assert.deepEqual(result.rows, [{ asset_tag: `0007-${role}`, asset_code: 'SERIAL-1' }]);
  }
  await asUser(db, ids.accounting);
  assert.equal((await db.query('select asset_tag from public.assets where id=$1', [asset])).rows[0].asset_tag, '0007-production');
  assert.equal((await db.query("update public.assets set asset_tag='DENIED' where id=$1 returning id", [asset])).rows.length, 0);
  await asUser(db, ids.outsider);
  assert.equal((await db.query('select asset_tag from public.assets where id=$1', [asset])).rows.length, 0);
  assert.equal((await db.query("update public.assets set asset_tag='DENIED' where id=$1 returning id", [asset])).rows.length, 0);
  await asUser(db, ids.admin);
  assert.equal((await db.query('select asset_tag from public.asset_financials where id=$1', [finance])).rows[0].asset_tag, 'FIXED-99');
  await db.query('update public.assets set asset_tag=null where id=$1', [asset]);
  assert.equal((await db.query('select asset_tag from public.assets where id=$1', [asset])).rows[0].asset_tag, null);
  await db.query("update public.assets set asset_tag='0007-final' where id=$1", [asset]);
  await asUser(db, ids.manager);
  await assert.rejects(db.query('delete from public.assets where id=$1', [asset]), /permission denied|Archive/);
  // Retain proof for the legacy snapshot trigger using privileged fixture cleanup only.
  await resetRole(db);
  await db.query('delete from public.assets where id=$1', [asset]);
  const retained = (await db.query('select asset_id,asset_tag,archived_asset_tag,archived_asset_code from public.asset_financials where id=$1', [finance])).rows[0];
  assert.deepEqual(retained, { asset_id: null, asset_tag: 'FIXED-99', archived_asset_tag: '0007-final', archived_asset_code: 'SERIAL-1' });
  const withoutFinance = (await db.query("insert into public.assets(company_id,location_id,name,asset_tag) values ($1,$2,'No finance tag proof','0008-B') returning id", [ids.companyA, ids.locationA])).rows[0].id;
  await db.query('delete from public.assets where id=$1', [withoutFinance]);
  const archived = (await db.query('select asset_tag,archived_asset_tag from public.asset_financials where archived_asset_id=$1', [withoutFinance])).rows[0];
  assert.deepEqual(archived, { asset_tag: null, archived_asset_tag: '0008-B' });
  await resetRole(db);
  return [{ name: 'equipment_tags:role_tenant_boundaries_serial_finance_independence_and_both_retention_paths', verdict: 'PASS' }];
}

module.exports = { verifyEquipmentTags };
