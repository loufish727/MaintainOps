const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

async function main() {
  const { PGlite } = await import('@electric-sql/pglite');
  const { pgcrypto } = await import('@electric-sql/pglite/contrib/pgcrypto');
  const db = new PGlite({ extensions: { pgcrypto } });
  const q = (sql, values = []) => db.query(sql, values);
  const one = async (sql, values) => (await q(sql, values)).rows[0];
  const as = async (id, role = 'authenticated') => {
    assert.ok(['authenticated', 'anon'].includes(role));
    await db.exec(`reset role; set role ${role}`);
    await q("select set_config('request.jwt.claim.sub',$1,false)", [id || '']);
  };
  const check = [];
  try {
    await db.exec(read('tests/fixtures/supabase-postgres-prelude.sql'));
    await db.exec(read('supabase/schema.sql'));
    for (const name of ['maintenance-requests', 'maintenance-request-photos', 'asset-documents', 'asset-parts', 'procedures',
      'cleanup-delete-paths', 'admin-delete-work-orders', 'message-center', 'message-soft-delete-and-thread-scope',
      'message-thread-soft-delete', 'message-work-order-links', 'app-issue-reports']) await db.exec(read(`supabase/step-next-${name}.sql`));
    for (const name of fs.readdirSync(path.join(root, 'supabase/migrations')).filter(x => x.endsWith('.sql')).sort()) {
      await db.exec(read(`supabase/migrations/${name}`));
    }
    const users = Object.fromEntries(['admin','manager','technician','production','accounting','outsider'].map(role => [role, randomUUID()]));
    for (const id of Object.values(users)) await q('insert into auth.users(id) values ($1)', [id]);
    const company = (await one("insert into public.companies(name,created_by) values ('Travel A',$1) returning id", [users.admin])).id;
    const other = (await one("insert into public.companies(name,created_by) values ('Travel B',$1) returning id", [users.outsider])).id;
    for (const [role,id] of Object.entries(users)) {
      const tenant = role === 'outsider' ? other : company;
      await q('insert into public.company_members(company_id,user_id,role) values ($1,$2,$3)', [tenant,id,role === 'outsider' ? 'admin' : role]);
      await q('insert into public.profiles(company_id,user_id,full_name) values ($1,$2,$3)', [tenant,id,role]);
    }
    const locations = [];
    for (const [name,tenant] of [['Salem',company],['Riverside',company],['Spokane',company],['Foreign',other]]) {
      locations.push((await one('insert into public.locations(company_id,name) values ($1,$2) returning id', [tenant,name])).id);
    }
    await as(users.admin);
    const asset = (await one("insert into public.assets(company_id,location_id,name,asset_type,location,safety_devices_required,created_by) values ($1,$2,'Curving unit','traveling_machine','Bay 1',false,$3) returning id", [company, locations[0], users.admin])).id;
    const work = (await one("insert into public.work_orders(company_id,location_id,asset_id,title,assigned_to,created_by) values ($1,$2,$3,'Repair',$4,$4) returning id", [company, locations[0], asset, users.admin])).id;
    const schedule = (await one("insert into public.preventive_schedules(company_id,location_id,asset_id,title,frequency,next_due_at,created_by) values ($1,$2,$3,'Inspection','monthly','2026-01-01',$4) returning id", [company, locations[0], asset, users.admin])).id;
    const part = (await one("insert into public.parts(company_id,location_id,name,quantity_on_hand) values ($1,$2,'Bearing',10) returning id", [company, locations[0]])).id;
    await q('insert into public.asset_parts(company_id,asset_id,part_id) values ($1,$2,$3)', [company,asset,part]);
    await q('insert into public.work_order_parts(company_id,work_order_id,part_id,quantity_used,created_by) values ($1,$2,$3,1,$4)', [company,work,part,users.admin]);
    await q('insert into public.asset_financials(company_id,asset_id,acquisition_cost) values ($1,$2,5000)', [company,asset]);
    for (const [file,type] of [['photo.jpg','image/jpeg'],['manual.pdf','application/pdf']]) {
      await q('insert into public.asset_documents(company_id,asset_id,uploaded_by,storage_path,file_name,content_type) values ($1,$2,$3,$4,$5,$6)', [company,asset,users.admin,`${company}/${asset}/${file}`,file,type]);
    }
    const tables = ['work_orders','preventive_schedules','parts','asset_parts','work_order_parts','asset_financials','asset_documents'];
    const snapshot = async () => Object.fromEntries(await Promise.all(tables.map(async table => [table,(await q(`select * from public.${table} where company_id=$1 order by id`,[company])).rows])));
    const before = await snapshot();
    const move = (to,from,tenant=company,id=asset) => q('select public.move_traveling_equipment($1,$2,$3,$4)',[tenant,id,to,from]);
    await as(users.technician);
    await move(locations[1],locations[0]);
    const moved = await one('select * from public.assets where id=$1',[asset]);
    assert.equal(moved.location_id,locations[1]); assert.equal(moved.location,null);
    const event = await one("select * from public.asset_events where asset_id=$1 and event_type='location_changed'",[asset]);
    assert.equal(event.actor_id, users.technician); assert.match(event.summary,/Salem to Riverside/);
    await as(users.admin); assert.deepEqual(await snapshot(),before);
    check.push('same asset identity; all work, PM, stock, usage, files and finance unchanged; actor history atomic');
    await move(locations[1],locations[0]);
    assert.equal(Number((await one('select count(*) as n from public.asset_events where asset_id=$1',[asset])).n),1);
    await assert.rejects(move(locations[2],locations[0]),/already moved/);
    await assert.rejects(move(locations[3],locations[1]),/facility in this company/);
    await assert.rejects(move(null,locations[1]),/facility in this company/);
    check.push('retry idempotency, stale and foreign destination rejection');
    for (const role of ['accounting','outsider']) {
      await as(users[role]); await assert.rejects(move(locations[0],locations[1]),/permission required/);
      assert.equal((await q('update public.assets set location_id=$1 where id=$2 returning id',[locations[0],asset])).rows.length,0);
    }
    await as(null); await assert.rejects(move(locations[0],locations[1]),/permission required/);
    await as(null,'anon'); await assert.rejects(move(locations[0],locations[1]),/permission denied/);
    await as(users.outsider); assert.equal((await q('select * from public.assets where id=$1',[asset])).rows.length,0);
    check.push('accounting, anonymous and cross-company write/read boundaries');
    await as(users.admin);
    const primary = (await one("insert into public.assets(company_id,location_id,name) values ($1,$2,'Stationary primary') returning id",[company,locations[0]])).id;
    const child = (await one("insert into public.assets(company_id,location_id,name,parent_asset_id,asset_type) values ($1,$2,'Sub equipment',$3,'secondary_machine') returning id",[company,locations[0],primary])).id;
    await assert.rejects(q("update public.assets set asset_type='traveling_machine' where id=$1",[primary]),/hierarchy first/);
    await assert.rejects(q("update public.assets set asset_type='traveling_machine' where id=$1",[child]),/hierarchy first/);
    await assert.rejects(q('update public.assets set parent_asset_id=$1 where id=$2',[asset,child]),/travels alone/);
    await assert.rejects(q('update public.assets set parent_asset_id=$1 where id=$2',[primary,asset]),/hierarchy first/);
    await assert.rejects(q('update public.assets set location_id=null where id=$1',[asset]),/current facility/);
    await assert.rejects(move(locations[1],locations[0],company,primary),/not found/);
    await assert.rejects(q("update public.assets set asset_type='machine',location_id=$1 where id=$2",[locations[0],asset]),/type separately/);
    check.push('ordinary equipment unaffected; parent, child and ambiguous move guards');
    await db.exec('reset role; create policy travel_test_deny_event on public.asset_events as restrictive for insert to authenticated with check (false)');
    await as(users.admin); await assert.rejects(move(locations[0],locations[1]),/row-level security/);
    assert.equal((await one('select location_id from public.assets where id=$1',[asset])).location_id,locations[1]);
    await db.exec('reset role; drop policy travel_test_deny_event on public.asset_events');
    check.push('history failure rolls location change back');
    let current = locations[1];
    for (const role of ['manager','production','admin']) {
      await as(users[role]); const next = current === locations[1] ? locations[0] : locations[1];
      await move(next,current); current=next;
    }
    // Direct API updates receive the same guard and atomic history.
    await q('update public.assets set location_id=$1 where id=$2',[locations[2],asset]); current=locations[2];
    const generated = (await one("select public.generate_preventive_work_order($1,$2,'2026-01-01') as result",[company,schedule])).result;
    const generatedWork = await one('select * from public.work_orders where id=$1',[generated.work_order_id]);
    assert.equal(generatedWork.location_id,current); assert.equal(generatedWork.asset_id,asset);
    assert.equal((await one('select location_id from public.work_orders where id=$1',[work])).location_id,locations[0]);
    await q("update public.work_orders set status='completed',completed_at=now(),safety_devices_checked=true where id=$1",[generatedWork.id]);
    await q("update public.work_orders set status='open',completed_at=null,safety_devices_checked=false where id=$1",[generatedWork.id]);
    assert.equal((await one('select asset_id from public.work_orders where id=$1',[generatedWork.id])).asset_id,asset);
    await q('delete from public.work_orders where id=$1',[generatedWork.id]);
    assert.equal((await one('select id from public.assets where id=$1',[asset])).id,asset);
    check.push('all operational roles; PM generated at destination; completion, reopen and deletion preserve asset');
    const privileges = (await q("select n.nspname,p.proname,p.prosecdef,p.proconfig,has_function_privilege('anon',p.oid,'EXECUTE') as anon from pg_proc p join pg_namespace n on n.oid=p.pronamespace where p.proname in ('move_traveling_equipment','guard_traveling_equipment','record_traveling_equipment_location')")).rows;
    assert.equal(privileges.length,3);
    for (const p of privileges) { assert.equal(p.prosecdef,false); assert.equal(p.anon,false); assert.deepEqual(p.proconfig,['search_path=""']); }
    check.push('invoker-only functions, pinned search paths and no anonymous execute');
    const summary = async (tenant=company,page=1) => (await one('select public.traveling_units_summary($1,$2) as result',[tenant,page])).result;
    let board = await summary();
    assert.equal(board.total,1); assert.equal(board.page,1);
    assert.equal(board.units[0].asset.id,asset); assert.equal(board.units[0].current_facility,'Spokane');
    assert.equal(board.units[0].open_work_count,1); assert.equal(board.units[0].moved_by,'admin');
    assert.equal(board.units[0].previous_facility,'Salem');
    let live = board.units[0].asset;
    const condition = (status,expected=live) => q('select public.update_traveling_equipment_condition($1,$2,$3,$4,$5,$6)',[company,asset,status,expected.status,expected.location_id,expected.traveling_revision]);
    const guardedMove = (to,expected=live) => q('select public.update_traveling_equipment_location($1,$2,$3,$4,$5)',[company,asset,to,expected.location_id,expected.traveling_revision]);
    await assert.rejects(q("insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary,created_at) values ($1,$2,$3,'location_changed','forged','2099-01-01')",[company,asset,users.admin]),/recorded by equipment updates only/);
    await assert.rejects(q("insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary,location_change) values ($1,$2,$3,'updated','forged','{}')",[company,asset,users.admin]),/recorded by equipment updates only/);
    await q('update public.assets set traveling_revision=999 where id=$1',[asset]);
    assert.equal((await one('select traveling_revision from public.assets where id=$1',[asset])).traveling_revision,live.traveling_revision);
    await condition('offline');
    await condition('offline');
    assert.equal(Number((await one("select count(*) n from public.asset_events where asset_id=$1 and event_type='status_updated'",[asset])).n),1);
    await assert.rejects(condition('watch'),/changed since/);
    await assert.rejects(guardedMove(locations[0]),/changed since/);
    // A stale full Equipment edit cannot overwrite a condition changed on the board.
    assert.equal((await q("update public.assets set status='running' where id=$1 and traveling_revision=$2 returning id",[asset,live.traveling_revision])).rows.length,0);
    live=(await summary()).units[0].asset;
    await guardedMove(locations[0]);
    let latest=(await summary()).units[0];
    assert.equal(latest.asset.status,'offline'); assert.equal(latest.previous_facility,'Spokane');
    await guardedMove(locations[2],latest.asset);
    await assert.rejects(guardedMove(locations[1]),/changed since/);
    live=(await summary()).units[0].asset;
    await db.exec('reset role; create policy travel_test_deny_condition on public.asset_events as restrictive for insert to authenticated with check (false)');
    await as(users.admin); await assert.rejects(condition('degraded'),/row-level security/);
    assert.equal((await summary()).units[0].asset.status,'offline');
    await db.exec('reset role; drop policy travel_test_deny_condition on public.asset_events');
    for (const role of ['admin','manager','technician','production']) {
      await as(users[role]); live=(await summary()).units[0].asset;
      await condition(live.status==='watch'?'running':'watch');
    }
    for (const role of ['accounting','outsider']) {
      await as(users[role]); await assert.rejects(condition('degraded'),/permission required/);
      await assert.rejects(guardedMove(locations[0]),/permission required/);
    }
    await as(users.outsider); await assert.rejects(summary(),/membership required/);
    await as(users.accounting); assert.equal((await summary()).total,1);
    await as(null); await assert.rejects(summary(),/membership required/);
    await as(null,'anon'); await assert.rejects(summary(),/permission denied/);
    await as(users.admin);
    // Discovery is paged in SQL, not filtered from a capped startup asset response.
    await q("insert into public.assets(company_id,location_id,name,asset_type) select $1,$2,'Unit '||s,'traveling_machine' from generate_series(1,25) s",[company,locations[1]]);
    board=await summary(); assert.equal(board.total,26); assert.equal(board.units.length,12);
    assert.equal((await summary(company,2)).units.length,12);
    assert.equal((await summary(company,3)).units.length,2);
    assert.equal((await summary(company,999)).page,3);
    await assert.rejects(summary(company,0),/valid page/);
    await q("insert into public.work_orders(company_id,location_id,asset_id,title,created_by) select $1,$2,$3,'Count '||s,$4 from generate_series(1,1005) s",[company,locations[0],asset,users.admin]);
    board=await summary(); assert.equal(board.units.find(row=>row.asset.id===asset).open_work_count,1006);
    await q("update public.work_orders set status='completed',completed_at=now(),safety_devices_checked=true where id=$1",[work]);
    assert.equal((await summary()).units.find(row=>row.asset.id===asset).open_work_count,1005);
    await q("update public.work_orders set status='open',completed_at=null,safety_devices_checked=false where id=$1",[work]);
    assert.equal((await summary()).units.find(row=>row.asset.id===asset).open_work_count,1006);
    const boardPrivileges=(await q("select p.prosecdef,p.proconfig,has_function_privilege('anon',p.oid,'EXECUTE') as anon from pg_proc p where p.proname in ('traveling_units_summary','update_traveling_equipment_location','update_traveling_equipment_condition','stamp_traveling_revision','guard_traveling_location_event')")).rows;
    assert.equal(boardPrivileges.length,5);
    for(const p of boardPrivileges) { assert.equal(p.prosecdef,false); assert.equal(p.anon,false); assert.deepEqual(p.proconfig,['search_path=""']); }
    check.push('board paging, counts beyond API cap, all roles, immutable move history, revision/ABA/stale edit guards, independent and atomic condition changes');
    console.log(`Traveling equipment SQL passed (${check.length} proof groups):\n${check.join('\n')}`);
  } finally { await db.close(); }
}
main().catch(error => { console.error(error); process.exitCode=1; });
