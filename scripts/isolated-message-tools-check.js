const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');

async function verifyMessageTools(db, ids, setUser, resetRole, thread, other, root) {
  const checks = [], pass = name => checks.push({ name: `message_tools:${name}`, verdict: 'PASS' });
  const denied = (sql, args) => assert.rejects(() => db.query(sql,args));
  await setUser(db,ids.technician);
  await db.query('select public.organize_my_conversation($1,true,$2)',[thread,'Equipment <script>']);
  const prefs = (await db.query('select user_id,favorite,section_name from public.message_thread_members where thread_id=$1',[thread])).rows;
  assert.equal(prefs.find(row=>row.user_id===ids.technician).favorite,true);
  assert.ok(prefs.filter(row=>row.user_id!==ids.technician).every(row=>!row.favorite&&!row.section_name));
  await denied('select public.organize_my_conversation($1,true,$2)',[thread,'x'.repeat(41)]);
  await denied('select public.organize_my_conversation($1,true,null)',[other]);
  pass('personal_organization_only_and_bounded');
  const reply = randomUUID();
  await db.query("insert into public.messages(id,company_id,thread_id,sender_id,body,parent_message_id) values($1,$2,$3,$4,'Indexed hydraulic repair',$5)",[reply,ids.companyA,thread,ids.technician,root]);
  await denied("insert into public.messages(company_id,thread_id,sender_id,body,parent_message_id) values($1,$2,$3,'Nested',$4)",[ids.companyA,thread,ids.technician,reply]);
  await denied("insert into public.messages(company_id,thread_id,sender_id,body,parent_message_id) values($1,$2,$3,'Wrong thread',$4)",[ids.companyA,other,ids.technician,root]);
  assert.equal((await db.query('select * from public.search_company_messages($1,$2)',[ids.companyA,'hydraulic'])).rows[0].id,reply);
  assert.equal((await db.query('select * from public.search_company_messages($1,$2,0,null,$3)',[ids.companyA,'hydraulic',ids.admin])).rows.length,0);
  assert.equal((await db.query('select * from public.search_company_messages($1,$2)',[ids.companyA,'Private other'])).rows.length,0);
  pass('root_only_discussions_and_rls_indexed_search');

  const file = randomUUID(), message = randomUUID();
  const objectPath = `${ids.companyA}/${thread}/${ids.technician}/${file}`;
  const reserve = 'insert into public.message_files(id,company_id,thread_id,draft_id,user_id,file_name,content_type,byte_size,object_path) values($1,$2,$3,$4,$5,$6,$7,$8,$9)';
  const args = [file,ids.companyA,thread,message,ids.technician,'manual.pdf','application/pdf',100,objectPath];
  await denied(reserve,[...args.slice(0,8),'wrong/path']);
  await denied(reserve,[...args.slice(0,7),26214401,objectPath]);
  await db.query(reserve,args);
  const commit = 'select public.send_message_with_files($1,$2,$3,$4::uuid[],null,null)';
  await denied(commit,[message,thread,'',[file]]);
  await db.query("insert into storage.objects(bucket_id,name,metadata) values('message-files',$1,$2)",[objectPath,{size:99,mimetype:'application/pdf'}]);
  await denied(commit,[message,thread,'',[file]]);
  await denied('update public.message_files set message_id=$1 where id=$2',[root,file]);
  pass('attachment_limits_path_and_missing_or_mismatched_upload_denied');
  await setUser(db,ids.admin);
  assert.equal((await db.query('select id from public.message_files where id=$1',[file])).rows.length,0);
  assert.equal((await db.query('select id from storage.objects where name=$1',[objectPath])).rows.length,0);
  await denied(commit,[message,thread,'',[file]]);
  pass('pending_uploads_private_even_to_other_participants');
  await resetRole(db);
  await db.query('update storage.objects set metadata=$1 where name=$2',[{size:100,mimetype:'application/pdf'},objectPath]);
  await setUser(db,ids.technician);
  await db.query(commit,[message,thread,'',[file]]);
  await db.query(commit,[message,thread,'',[file]]);
  await denied(commit,[message,thread,'Changed retry',[file]]);
  assert.equal((await db.query('select id from public.messages where id=$1',[message])).rows.length,1);
  assert.equal((await db.query('delete from storage.objects where name=$1 returning id',[objectPath])).rows.length,0);
  pass('atomic_attachment_message_commit_idempotent_and_immutable');
  for (const role of ['admin','accounting','manager','outsider']) {
    await setUser(db,ids[role]);
    const count = ['admin','accounting'].includes(role)?1:0;
    assert.equal((await db.query('select id from public.message_files where id=$1',[file])).rows.length,count);
    assert.equal((await db.query('select id from storage.objects where name=$1',[objectPath])).rows.length,count);
    if(role==='accounting') {
      await denied('select public.organize_my_conversation($1,true,null)',[thread]);
      await denied(commit,[randomUUID(),thread,'No write',[file]]);
    }
    if(!count) assert.equal((await db.query('select * from public.search_company_messages($1,$2)',[ids.companyA,'hydraulic'])).rows.length,0);
  }
  pass('file_search_participant_tenant_and_accounting_boundaries');
  await setUser(db,ids.technician);
  await db.query('select public.soft_delete_own_message($1)',[message]);
  assert.equal((await db.query('select id from storage.objects where name=$1',[objectPath])).rows.length,1);
  // Storage removes as its service identity after evaluating the author's delete permission.
  await resetRole(db);
  assert.equal((await db.query('select private.can_remove_deleted_message_file($1) as allowed',[objectPath])).rows[0].allowed,true);
  await setUser(db,ids.admin);
  assert.equal((await db.query('select id from storage.objects where name=$1',[objectPath])).rows.length,0);
  await resetRole(db);
  assert.equal((await db.query('select private.can_remove_deleted_message_file($1) as allowed',[objectPath])).rows[0].allowed,false);
  await resetRole(db);
  await db.query('delete from storage.objects where name=$1',[objectPath]);
  pass('deleted_attachment_revoked_for_recipients_cleanup_author_only');
  return checks;
}
module.exports = { verifyMessageTools };
