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
  const q = (sql, values=[]) => db.query(sql, values);
  const one = async (sql, values) => (await q(sql,values)).rows[0];
  const as = async (id,role='authenticated') => { assert.ok(['authenticated','anon'].includes(role)); await db.exec(`reset role; set role ${role}`); await q("select set_config('request.jwt.claim.sub',$1,false)",[id || '']); };
  try {
    await db.exec(read('tests/fixtures/supabase-postgres-prelude.sql')); await db.exec(read('supabase/schema.sql'));
    for(const name of ['maintenance-requests','maintenance-request-photos','asset-documents','asset-parts','procedures','cleanup-delete-paths','admin-delete-work-orders','message-center','message-soft-delete-and-thread-scope','message-thread-soft-delete','message-work-order-links','app-issue-reports']) await db.exec(read(`supabase/step-next-${name}.sql`));
    for(const name of fs.readdirSync(path.join(root,'supabase/migrations')).filter(n=>n.endsWith('.sql')).sort()) await db.exec(read(`supabase/migrations/${name}`));
    const users=Object.fromEntries(['admin','manager','technician','production','accounting','outsider'].map(r=>[r,randomUUID()]));
    for(const id of Object.values(users)) await q('insert into auth.users(id) values ($1)',[id]);
    const company=(await one("insert into public.companies(name,created_by) values ('Relocate QA',$1) returning id",[users.admin])).id;
    const other=(await one("insert into public.companies(name,created_by) values ('Other QA',$1) returning id",[users.outsider])).id;
    for(const [role,id] of Object.entries(users)) await q('insert into public.company_members(company_id,user_id,role) values ($1,$2,$3)',[role==='outsider'?other:company,id,role==='outsider'?'admin':role]);
    for(const [role,id] of Object.entries(users)) await q('insert into public.profiles(company_id,user_id,full_name) values ($1,$2,$3)',[role==='outsider'?other:company,id,role]);
    const sites=[];
    for(const [name,tenant] of [['North',company],['South',company],['Foreign',other]]) sites.push((await one('insert into public.locations(company_id,name) values ($1,$2) returning id',[tenant,name])).id);
    await as(users.admin);
    const add=async(name,parent=null,type='secondary_machine')=>(await one("insert into public.assets(company_id,location_id,name,parent_asset_id,asset_type,status,location,safety_devices_required) values ($1,$2,$3,$4,$5,'degraded','Bay 1',false) returning *",[company,sites[0],name,parent,type]));
    const ancestor=await add('Line',null,'machine'), machine=await add('Folder',ancestor.id,'machine');
    const branch=await add('HPU',machine.id), child=await add('Pump',branch.id,'component');
    const stay=await add('Conveyor',machine.id), stayChild=await add('Motor',stay.id,'component');
    const leaf=await add('Saw',null,'shop_item');
    const travel=await add('Curver',null,'traveling_machine');
    const preview=async(id=machine.id,tenant=company)=>(await one('select public.equipment_relocation_review($1,$2) as r',[tenant,id])).r;
    const relocate=(review,ids=[branch.id],to=sites[1],id=machine.id,tenant=company)=>one('select public.relocate_equipment($1,$2,$3,$4,$5) as r',[tenant,id,to,ids,review.token]);
    const initial=await preview(); assert.equal(initial.nodes.length,5); assert.equal(initial.parent.id,ancestor.id);
    const work=(await one("insert into public.work_orders(company_id,location_id,asset_id,title,created_by,assigned_to) values ($1,$2,$3,'Repair',$4,$5) returning id",[company,sites[0],machine.id,users.admin,users.technician])).id;
    const pm=(await one("insert into public.preventive_schedules(company_id,location_id,asset_id,title,frequency,next_due_at,created_by) values ($1,$2,$3,'Inspect','monthly','2026-01-01',$4) returning id",[company,sites[0],machine.id,users.admin])).id;
    const part=(await one("insert into public.parts(company_id,location_id,name,quantity_on_hand) values ($1,$2,'Seal',6) returning id",[company,sites[0]])).id;
    await q('insert into public.asset_parts(company_id,asset_id,part_id) values ($1,$2,$3)',[company,machine.id,part]);
    await q('insert into public.asset_financials(company_id,asset_id,acquisition_cost) values ($1,$2,5000)',[company,machine.id]);
    await q("insert into public.asset_documents(company_id,asset_id,uploaded_by,storage_path,file_name,content_type) values ($1,$2,$3,'fixture.pdf','fixture.pdf','application/pdf')",[company,machine.id,users.admin]);
    const snapshot=async()=>{const result={};for(const t of ['work_orders','preventive_schedules','parts','asset_parts','asset_financials','asset_documents'])result[t]=(await q(`select * from public.${t} where company_id=$1 order by id`,[company])).rows;return result;};
    const before=await snapshot();
    for(const role of ['technician','production','accounting','outsider']) {
      await as(users[role]); await assert.rejects(preview(),/Only managers/); await assert.rejects(relocate(initial),/Only managers/);
      if(['technician','production'].includes(role)) await assert.rejects(q('update public.assets set location_id=$1 where id=$2',[sites[1],leaf.id]),/Only managers/);
      if(['technician','production'].includes(role)) {
        await assert.rejects(q("update public.assets set asset_type='traveling_machine' where id=$1",[leaf.id]),/Only managers/);
        await assert.rejects(q("update public.assets set asset_type='machine' where id=$1",[travel.id]),/Only managers/);
      }
    }
    await as(null); await assert.rejects(preview(),/Only managers/);
    await as(null,'anon'); await assert.rejects(preview(),/permission denied/);
    await as(users.manager);
    await assert.rejects(preview(travel.id),/Update Location/);
    await assert.rejects(preview(machine.id,other),/Only managers/);
    await assert.rejects(relocate(initial,[child.id]),/attached branches/);
    await assert.rejects(relocate(initial,null),/attached branches/);
    await assert.rejects(relocate(initial,[branch.id],sites[2]),/different facility/);
    await assert.rejects(relocate(initial,[branch.id],sites[0]),/different facility/);
    const phantom=await add('New attachment',machine.id);
    await assert.rejects(relocate(initial),/changed since this review/);
    await as(users.admin); await q('delete from public.assets where id=$1',[phantom.id]);
    await q('delete from public.asset_financials where archived_asset_id=$1',[phantom.id]);
    await as(users.manager);
    const result=(await relocate(await preview())).r;
    assert.equal(result.moved_count,3); assert.deepEqual(new Set(result.detached_ids),new Set([machine.id,stay.id]));
    for(const id of [machine.id,branch.id,child.id]) {
      const a=await one('select * from public.assets where id=$1',[id]); assert.equal(a.location_id,sites[1]);assert.equal(a.status,'degraded');assert.equal(a.location,null);
    }
    for(const id of [ancestor.id,stay.id,stayChild.id]) assert.equal((await one('select location_id from public.assets where id=$1',[id])).location_id,sites[0]);
    assert.equal((await one('select parent_asset_id from public.assets where id=$1',[stay.id])).parent_asset_id,null);
    assert.equal((await one('select parent_asset_id from public.assets where id=$1',[stayChild.id])).parent_asset_id,stay.id);
    assert.equal((await one('select parent_asset_id from public.assets where id=$1',[branch.id])).parent_asset_id,machine.id);
    assert.deepEqual(await snapshot(),before);
    assert.equal(result.events.filter(e=>e.event_type==='location_changed').length,3);
    const detaches=result.events.filter(e=>e.event_type==='hierarchy_changed'); assert.equal(detaches.length,4);
    assert.ok(detaches.every(e=>e.actor_id===users.manager && /Unlinked|unlinked/.test(e.summary)));
    await assert.rejects(relocate(initial),/changed since this review/);
    assert.equal((await q("update public.assets set location='Stale area',parent_asset_id=$1 where id=$2 and traveling_revision=0 returning id",[ancestor.id,machine.id])).rows.length,0);
    await assert.rejects(q('update public.assets set location_id=$1 where id=$2',[sites[0],machine.id]),/Linked equipment must share/);
    await assert.rejects(q('update public.assets set parent_asset_id=$1 where id=$2',[child.id,machine.id]),/own ancestor/);
    await assert.rejects(q('update public.assets set parent_asset_id=$1 where id=$2',[stay.id,child.id]),/Linked equipment must share/);
    // Moving just a leaf retains its type and identity without becoming traveling.
    const leafResult=(await relocate(await preview(leaf.id),[],sites[1],leaf.id)).r;
    assert.equal(leafResult.assets[0].asset_type,'shop_item');
    // History is mandatory; failure must roll back the entire multi-row relocation.
    await db.exec("reset role; create function private.fail_relocation_proof() returns trigger language plpgsql as $$ begin if new.event_type='location_changed' then raise exception 'history proof failure'; end if; return new; end $$; create trigger fail_relocation_proof before insert on public.asset_events for each row execute function private.fail_relocation_proof();");
    await as(users.manager); const fresh=await preview();
    await assert.rejects(relocate(fresh,[branch.id],sites[0]),/history proof failure/);
    assert.deepEqual(await preview(),fresh);
    await db.exec('reset role; drop trigger fail_relocation_proof on public.asset_events; drop function private.fail_relocation_proof()');
    await as(users.admin);
    const generated=(await one("select public.generate_preventive_work_order($1,$2,'2026-01-01') as result",[company,pm])).result;
    const generatedId=generated.work_order_id;
    assert.ok(generatedId); assert.equal((await one('select location_id from public.work_orders where id=$1',[generatedId])).location_id,sites[1]);
    assert.equal((await one('select location_id from public.work_orders where id=$1',[work])).location_id,sites[0]);
    const large=await add('Large hierarchy',null,'machine');
    await q("insert into public.assets(company_id,location_id,name,parent_asset_id,asset_type) select $1,$2,'Item '||n,$3,'component' from generate_series(1,250) n",[company,sites[0],large.id]);
    await assert.rejects(preview(large.id),/too large/);
    const catalog=(await q("select p.prosecdef,p.proconfig,has_function_privilege('anon',p.oid,'EXECUTE') as anon from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('equipment_relocation_review','relocate_equipment')")).rows;
    assert.equal(catalog.length,2);assert.ok(catalog.every(f=>!f.prosecdef&&!f.anon&&f.proconfig.includes('search_path=""')));
    console.log('Equipment relocation SQL passed: roles/RLS, selective branches, detach history, unchanged records, stale/phantom/foreign guards, rollback, PM destination, bounded review, invoker grants.');
  } finally { await db.close(); }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
