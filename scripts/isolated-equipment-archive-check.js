const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function verifyEquipmentArchive(db, ids, asUser, resetRole) {
  const checks = [];
  const pass = name => checks.push({ name: `equipment_archive:${name}`, verdict: 'PASS' });
  const scalar = async (sql, args) => (await db.query(sql, args)).rows[0].result;
  const review = id => scalar('select public.equipment_archive_review($1,$2) as result', [ids.companyA, id]);
  const archive = async (id, children = [], token) => scalar('select public.archive_equipment($1,$2,$3,$4,$5,$6) as result',
    [ids.companyA, id, children, 'delete', 'Isolated retention proof', token || (await review(id)).token]);
  const make = async (name, parent = null, type = 'machine') => scalar(
    "insert into public.assets(company_id,location_id,name,parent_asset_id,asset_type,status) values ($1,$2,$3,$4,$5,'degraded') returning id as result",
    [ids.companyA, ids.locationA, name, parent, type]);
  await asUser(db, ids.manager);
  const parent = await make('Archive proof parent');
  const root = await make('Archive proof root', parent, 'secondary_machine');
  const child = await make('Archive proof selected', root, 'component');
  const stay = await make('Archive proof stays', root, 'component');
  const wo = await scalar("insert into public.work_orders(company_id,location_id,asset_id,title,created_by) values ($1,$2,$3,'Archive proof work',$4) returning id as result", [ids.companyA, ids.locationA, root, ids.manager]);
  await assert.rejects(archive(root, [child]), /Resolve open work/);
  await db.query("update public.work_orders set status='completed',completed_at=now(),resolution_summary='QA complete' where id=$1", [wo]);
  const request = await scalar("insert into public.maintenance_requests(company_id,asset_id,title,requested_by) values ($1,$2,'Archive proof request',$3) returning id as result", [ids.companyA, root, ids.manager]);
  await assert.rejects(archive(root, [child]), /Resolve open work/);
  await db.query("update public.maintenance_requests set status='rejected' where id=$1", [request]);
  const pm = await scalar("insert into public.preventive_schedules(company_id,location_id,asset_id,title,next_due_at,created_by) values ($1,$2,$3,'Archive proof PM','2026-10-01',$4) returning id as result", [ids.companyA, ids.locationA, root, ids.manager]);
  await assert.rejects(db.query("insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary) values ($1,$2,$3,'archived','Forged')", [ids.companyA, root, ids.manager]), /lifecycle history/);
  const originalRevision = await scalar('select traveling_revision as result from public.assets where id=$1', [root]);
  const token = (await review(root)).token;
  await db.query("update public.assets set name=name||' updated',updated_at=now() where id=$1", [child]);
  await assert.rejects(archive(root, [child], token), /changed/);
  await assert.rejects(archive(root, [ids.assetB]), /Choose attached branches/);
  pass('open_work_requests_stale_review_and_foreign_branches_denied');

  for (const role of ['technician', 'production', 'accounting', 'outsider']) {
    await asUser(db, ids[role]);
    await assert.rejects(review(root), /Only managers/);
    await assert.rejects(scalar('select public.archive_equipment($1,$2,$3,$4,$5,$6) as result', [ids.companyA, root, [], 'delete', '', 'fake']), /Only managers/);
    await assert.rejects(scalar('select public.restore_equipment($1,$2,$3,$4) as result', [ids.companyA, root, 'fake', 'test']), /Only managers/);
    await assert.rejects(scalar('select public.list_archived_equipment($1) as result', [ids.companyA]), /Only managers/);
  }
  await asUser(db, ids.manager);
  await assert.rejects(scalar('select public.equipment_archive_review($1,$2) as result', [ids.companyB, ids.assetB]), /Only managers/);
  await assert.rejects(db.query('delete from public.assets where id=$1', [root]), /permission denied/);
  await assert.rejects(db.query("update public.assets set archived_at=now(),archive_reason='delete',archive_batch_id=gen_random_uuid() where id=$1", [root]), /archive\/restore/);
  pass('five_role_company_boundaries_and_direct_delete_metadata_denied');

  const result = await archive(root, [child]);
  assert.deepEqual(new Set(result.archived_ids), new Set([root, child]));
  assert.deepEqual(result.detached_ids, [stay]);
  const rows = (await db.query('select id,parent_asset_id,archived_at,status,location_id from public.assets where id=any($1)', [[parent, root, child, stay]])).rows;
  assert.equal(rows.find(r => r.id === root).parent_asset_id, null);
  assert.equal(rows.find(r => r.id === stay).parent_asset_id, null);
  assert.equal(rows.find(r => r.id === child).parent_asset_id, root);
  assert(rows.every(r => r.location_id === ids.locationA && r.status === 'degraded'));
  assert.equal((await db.query('select asset_id from public.work_orders where id=$1', [wo])).rows[0].asset_id, root);
  assert.equal((await db.query('select asset_id from public.maintenance_requests where id=$1', [request])).rows[0].asset_id, root);
  assert.deepEqual((await db.query('select active,equipment_archive_paused,next_due_at::text from public.preventive_schedules where id=$1', [pm])).rows[0], { active: false, equipment_archive_paused: true, next_due_at: '2026-10-01' });
  assert.equal(Number((await db.query('select count(*) from public.asset_financials where asset_id=any($1)', [[root,child]])).rows[0].count), 2);
  assert.equal(Number((await db.query("select count(*) from public.asset_events where asset_id=$1 and event_type in ('parent_detached','archived')", [root])).rows[0].count), 2);
  assert(Number(await scalar('select traveling_revision as result from public.assets where id=$1', [root])) > Number(originalRevision));
  await assert.rejects(scalar('select public.generate_preventive_work_order($1,$2,$3) as result', [ids.companyA, pm, '2026-10-01']), /inactive|paused/i);
  pass('same_identity_work_finance_condition_location_children_history_and_pm_retained');

  for (const role of ['admin', 'manager', 'technician', 'production']) {
    await asUser(db, ids[role]);
    await assert.rejects(db.query("update public.assets set name='bad' where id=$1", [root]), /Archived equipment/);
    await assert.rejects(db.query("insert into public.work_orders(company_id,asset_id,title,created_by) values ($1,$2,'bad',$3)", [ids.companyA, root, ids[role]]), /archived/);
    await assert.rejects(db.query("update public.work_orders set status='open',completed_at=null where id=$1", [wo]), /archived/);
    await assert.rejects(db.query('update public.work_orders set asset_id=null where id=$1', [wo]), /cannot be detached/);
    await assert.rejects(db.query("insert into public.work_order_comments(company_id,work_order_id,author_id,body) values ($1,$2,$3,'bad')", [ids.companyA, wo, ids[role]]), /archived/);
  }
  await asUser(db, ids.manager);
  assert.equal(await scalar('select private.equipment_storage_writable($1) as result', [`${ids.companyA}/${root}/photo.jpg`]), false);
  assert.equal(await scalar('select private.archived_work_storage_writable($1) as result', [`${ids.companyA}/${wo}/photo.jpg`]), false);
  assert.equal(await scalar('select private.archived_request_storage_writable($1) as result', [`${request}/photo.jpg`]), false);
  assert.equal((await db.query('delete from public.work_orders where id=$1 returning id', [wo])).rows.length, 0);
  await asUser(db, ids.admin);
  await assert.rejects(db.query('delete from public.work_orders where id=$1', [wo]), /archived/);
  await assert.rejects(db.query('update public.assets set parent_asset_id=$1 where id=$2', [root, stay]), /Active equipment/);
  pass('stale_clients_cannot_reopen_unlink_mutate_history_upload_delete_or_attach');

  await asUser(db, ids.accounting);
  assert.equal((await db.query("update public.asset_financials set finance_notes='retained' where asset_id=$1 returning id", [root])).rows.length, 1);
  await asUser(db, ids.manager);
  assert.equal((await db.query("update public.asset_financials set finance_notes='denied' where asset_id=$1 returning id", [root])).rows.length, 0);
  const childReview = await review(child);
  await assert.rejects(scalar('select public.restore_equipment($1,$2,$3,$4) as result', [ids.companyA, child, childReview.token, 'Review']), /parent first/);
  const restored = await scalar('select public.restore_equipment($1,$2,$3,$4) as result', [ids.companyA, root, (await review(root)).token, 'Inspected before restoration']);
  assert.deepEqual(new Set(restored.restored_ids), new Set([root, child]));
  assert.equal((await db.query('select status,archived_at,parent_asset_id from public.assets where id=$1', [root])).rows[0].status, 'degraded');
  assert.equal((await db.query('select active from public.preventive_schedules where id=$1', [pm])).rows[0].active, false);
  await assert.rejects(db.query('update public.preventive_schedules set active=true where id=$1', [pm]), /Resume PM/);
  const resumed = await scalar('select public.resume_equipment_pm($1,$2,$3) as result', [ids.companyA, pm, '2026-11-01']);
  assert.equal(resumed.active, true);
  assert.equal(resumed.equipment_archive_paused, false);
  assert.equal(resumed.next_due_at, '2026-11-01');
  pass('finance_permissions_restore_batch_preserves_condition_and_explicit_pm_resume');

  const travel = await make('Archive proof traveling', null, 'traveling_machine');
  const beforeTravel = await scalar('select public.traveling_units_summary($1) as result', [ids.companyA]);
  await archive(travel);
  const afterTravel = await scalar('select public.traveling_units_summary($1) as result', [ids.companyA]);
  assert.equal(afterTravel.total, beforeTravel.total - 1);
  assert(!afterTravel.units.some(u => u.asset.id === travel));
  for (let i=0; i<13; i++) await archive(await make(`Archive page proof ${i}`));
  const page1 = await scalar('select public.list_archived_equipment($1,$2,null,1) as result', [ids.companyA, 'Archive page proof']);
  const page2 = await scalar('select public.list_archived_equipment($1,$2,null,2) as result', [ids.companyA, 'Archive page proof']);
  assert.equal(page1.total, 13); assert.equal(page1.rows.length, 12); assert.equal(page2.rows.length, 1);
  assert(!page1.rows.some(a => a.id === page2.rows[0].id));
  pass('traveling_exclusion_and_twelve_item_archive_pagination');
  checks.push(...await verifyRetainedArchiveReferences(db, ids, asUser, resetRole));
  await resetRole(db);
  return checks;
}

async function verifyRetainedArchiveReferences(db, ids, asUser, resetRole) {
  const checks = [];
  const pass = name => checks.push({ name: `equipment_archive:${name}`, verdict: 'PASS' });
  const scalar = async (sql, args) => (await db.query(sql, args)).rows[0].result;
  const unavailableAsset = { code: '42501', message: 'Equipment reference is not available for changes.' };
  const unavailableWork = { code: '42501', message: 'Work history is not available for changes.' };
  const archivedWork = { code: '23514', message: 'This equipment is archived. Its work history is read-only until restored.' };

  await resetRole(db);
  await db.exec('begin');
  try {
    // Load the real legacy owner-delete policy missing from the runner's baseline.
    await db.exec(fs.readFileSync(path.join(__dirname, '../supabase/step-next-equipment-document-record-delete.sql'), 'utf8'));
    // Reach the reference triggers on UPDATE independently of today's table grants.
    // These test-only grants, policies, and fixtures all disappear on rollback.
    await db.exec(`
      grant update on public.asset_documents, public.work_order_photos to authenticated;
      create policy "Isolated archive document updates" on public.asset_documents for update to authenticated
        using (private.is_company_member(company_id)) with check (private.is_company_member(company_id));
      create policy "Isolated archive photo updates" on public.work_order_photos for update to authenticated
        using (private.is_company_member(company_id)) with check (private.is_company_member(company_id));
    `);
    await asUser(db, ids.manager);
    const equipment = await scalar("insert into public.assets(company_id,location_id,name,status) values ($1,$2,'Retained reference proof','degraded') returning id as result", [ids.companyA, ids.locationA]);
    const activeEquipment = await scalar("insert into public.assets(company_id,location_id,name) values ($1,$2,'Active reference target') returning id as result", [ids.companyA, ids.locationA]);
    const work = await scalar("insert into public.work_orders(company_id,location_id,asset_id,title,created_by,status,completed_at,resolution_summary) values ($1,$2,$3,'Retained parent proof',$4,'completed',now(),'Complete') returning id as result", [ids.companyA, ids.locationA, equipment, ids.manager]);
    const assetlessWork = await scalar("insert into public.work_orders(company_id,title,created_by) values ($1,'Equipment-less work proof',$2) returning id as result", [ids.companyA, ids.manager]);
    const part = await scalar("insert into public.parts(company_id,name) values ($1,'Retained part proof') returning id as result", [ids.companyA]);
    const partLink = await scalar('insert into public.asset_parts(company_id,asset_id,part_id) values ($1,$2,$3) returning id as result', [ids.companyA, equipment, part]);
    await resetRole(db);
    const document = await scalar("insert into public.asset_documents(company_id,asset_id,uploaded_by,storage_path,file_name) values ($1,$2,$3,$4,'retained.pdf') returning id as result", [ids.companyA, equipment, ids.accounting, `${ids.companyA}/${equipment}/retained.pdf`]);
    await asUser(db, ids.outsider);
    const foreignWork = await scalar("insert into public.work_orders(company_id,asset_id,title,created_by) values ($1,$2,'Foreign parent proof',$3) returning id as result", [ids.companyB, ids.assetB, ids.outsider]);
    await asUser(db, ids.manager);
    await resetRole(db);
    const photo = async (workId, name) => scalar('insert into public.work_order_photos(company_id,work_order_id,uploaded_by,storage_path,file_name) values ($1,$2,$3,$4,$5) returning id as result', [ids.companyA, workId, ids.manager, `${ids.companyA}/${workId}/${name}`, name]);
    const retainedPhoto = await photo(work, 'retained.jpg');
    const assetlessPhoto = await photo(assetlessWork, 'assetless.jpg');
    // Legacy single-column FKs can retain a non-null parent outside the child's company.
    const foreignParentPhoto = await photo(foreignWork, 'foreign-parent.jpg');
    const snapshot = async () => (await db.query(`
      select * from (
        select 'part' as kind, to_jsonb(p) as value from public.asset_parts p where id=$1
        union all select 'document', to_jsonb(d) from public.asset_documents d where id=$2
        union all select 'photo', to_jsonb(p) from public.work_order_photos p where id=any($3)
      ) retained order by kind, value->>'id'
    `, [partLink, document, [retainedPhoto, assetlessPhoto, foreignParentPhoto]])).rows;
    const originalRows = await snapshot();
    assert.equal(originalRows.length, 5);
    await asUser(db, ids.manager);
    const review = await scalar('select public.equipment_archive_review($1,$2) as result', [ids.companyA, equipment]);
    await scalar("select public.archive_equipment($1,$2,$3,'delete','Retained reference regression',$4) as result", [ids.companyA, equipment, [], review.token]);
    assert.deepEqual(await snapshot(), originalRows, 'Archive must preserve complete child records');

    const denied = async (name, sql, args, error) => {
      await db.exec('savepoint retained_reference_write');
      try {
        await assert.rejects(db.query(sql, args), error, name);
      } finally {
        await db.exec('rollback to savepoint retained_reference_write; release savepoint retained_reference_write');
      }
      assert.deepEqual(await snapshot(), originalRows, `${name}: retained rows changed`);
    };
    await asUser(db, ids.accounting);
    assert.equal((await db.query('select id from public.assets where id=$1', [equipment])).rows.length, 1);
    assert.equal((await db.query('select id from public.assets where id=$1 for share', [equipment])).rows.length, 0);
    for (const [table, id] of [['asset_parts', partLink], ['asset_documents', document]]) {
      await denied(`${table}: accounting delete`, `delete from public.${table} where id=$1`, [id], unavailableAsset);
      await denied(`${table}: accounting unchanged reference`, `update public.${table} set asset_id=asset_id where id=$1`, [id], unavailableAsset);
      await denied(`${table}: accounting relink`, `update public.${table} set asset_id=$1 where id=$2`, [activeEquipment, id], unavailableAsset);
      await denied(`${table}: accounting clear old reference`, `update public.${table} set asset_id=null where id=$1`, [id], unavailableAsset);
      await denied(`${table}: accounting company move`, `update public.${table} set company_id=$1,asset_id=$2 where id=$3`, [ids.companyB, ids.assetB, id], { code: '23514', message: 'Operational records cannot change company.' });
    }
    await denied('accounting insert part link', 'insert into public.asset_parts(company_id,asset_id,part_id) values ($1,$2,$3)', [ids.companyA, equipment, part], unavailableAsset);
    await denied('accounting insert document', "insert into public.asset_documents(company_id,asset_id,uploaded_by,storage_path,file_name) values ($1,$2,$3,$4,'new.pdf')", [ids.companyA, equipment, ids.accounting, `${ids.companyA}/${equipment}/new.pdf`], unavailableAsset);
    pass('accounting_hidden_asset_delete_relink_company_move_and_insert_fail_closed');

    await denied('accounting work child with hidden equipment', "insert into public.work_order_comments(company_id,work_order_id,author_id,body) values ($1,$2,$3,'bad')", [ids.companyA, work, ids.accounting], unavailableAsset);
    await denied('accounting old retained work cannot relink to equipment-less work', 'update public.work_order_photos set work_order_id=$1 where id=$2', [assetlessWork, retainedPhoto], unavailableAsset);
    await denied('accounting old retained work cannot be cleared', 'update public.work_order_photos set work_order_id=null where id=$1', [retainedPhoto], unavailableAsset);
    await denied('accounting new retained work cannot accept relink', 'update public.work_order_photos set work_order_id=$1 where id=$2', [work, assetlessPhoto], unavailableAsset);
    pass('work_children_hidden_equipment_old_and_new_nonnull_references_fail_closed');

    await asUser(db, ids.manager);
    await denied('manager retained photo delete', 'delete from public.work_order_photos where id=$1', [retainedPhoto], archivedWork);
    await denied('manager retained photo relink', 'update public.work_order_photos set work_order_id=$1 where id=$2', [assetlessWork, retainedPhoto], archivedWork);
    await denied('manager retained photo clear parent', 'update public.work_order_photos set work_order_id=null where id=$1', [retainedPhoto], archivedWork);
    await denied('manager relink into archived work', 'update public.work_order_photos set work_order_id=$1 where id=$2', [work, assetlessPhoto], archivedWork);
    await denied('manager work child company move', 'update public.work_order_photos set company_id=$1,work_order_id=$2 where id=$3', [ids.companyB, foreignWork, retainedPhoto], { code: '23514', message: 'Work history cannot change company.' });
    for (const parent of [foreignWork, 'ffffffff-ffff-4fff-8fff-ffffffffffff']) {
      await denied('new non-null work parent must be available', "insert into public.work_order_comments(company_id,work_order_id,author_id,body) values ($1,$2,$3,'bad')", [ids.companyA, parent, ids.manager], unavailableWork);
      await denied('new non-null relink parent must be available', 'update public.work_order_photos set work_order_id=$1 where id=$2', [parent, assetlessPhoto], unavailableWork);
    }
    await denied('old non-null unavailable work parent cannot be deleted', 'delete from public.work_order_photos where id=$1', [foreignParentPhoto], unavailableWork);
    await denied('old non-null unavailable work parent cannot be relinked', 'update public.work_order_photos set work_order_id=$1 where id=$2', [assetlessWork, foreignParentPhoto], unavailableWork);
    await denied('old non-null unavailable work parent cannot be cleared', 'update public.work_order_photos set work_order_id=null where id=$1', [foreignParentPhoto], unavailableWork);
    pass('work_children_archived_or_unavailable_parent_delete_relink_company_move_fail_closed');

    const allowed = await db.query("insert into public.work_order_comments(company_id,work_order_id,author_id,body) values ($1,$2,$3,'Equipment-less work remains editable') returning id", [ids.companyA, assetlessWork, ids.manager]);
    assert.equal(allowed.rows.length, 1);
    assert.deepEqual(await snapshot(), originalRows);
    pass('retained_children_unchanged_and_genuinely_equipmentless_work_allowed');
  } finally {
    await db.exec('rollback');
    await resetRole(db);
  }
  return checks;
}

module.exports = { verifyEquipmentArchive };
