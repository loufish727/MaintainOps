const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const read = name => fs.readFileSync(path.resolve(__dirname, '../..', name), 'utf8');
const migrationPath = 'supabase/migrations/20260923170451_automatic_work_order_attachments.sql';
const migration = read(migrationPath);
const deltaBlocks = [...migration.matchAll(/^-- QA DELTA BEGIN ([^\r\n]+)\r?\n([\s\S]*?)^-- QA DELTA END \1\r?$/gm)];
assert.equal(deltaBlocks.length, 4, 'All QA correction blocks must be present');
const qaDelta = `begin;\n${deltaBlocks.map(match => match[2]).join('\n')}\nnotify pgrst, 'reload schema';\ncommit;\n`;

// This mode only prints SQL. It never connects to a database or writes a file.
if (process.argv.includes('--qa-delta')) {
  process.stdout.write(qaDelta);
} else {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}

async function main() {
  const { PGlite } = await import('@electric-sql/pglite');
  const { pgcrypto } = await import('@electric-sql/pglite/contrib/pgcrypto');
  const db = new PGlite({ extensions: { pgcrypto } });
  const query = (sql, params = []) => db.query(sql, params);
  const scalar = async (sql, params) => (await query(sql, params)).rows[0];
  const as = async (id, role = 'authenticated') => {
    assert.ok(['authenticated', 'anon'].includes(role));
    await db.exec(`reset role; set role ${role}`);
    await query("select set_config('request.jwt.claim.sub',$1,false)", [id || '']);
  };
  const denied = (promise, label, codes = ['42501']) => assert.rejects(promise,
    error => codes.includes(error.code), label);
  const unchanged = async (promise, label) => assert.equal((await promise).rows.length, 0, label);
  try {
    await db.exec(read('tests/fixtures/supabase-postgres-prelude.sql'));
    // Match the Storage columns/index used in production; the shared prelude is minimal.
    await db.exec(`alter table storage.objects add column created_at timestamptz not null default now();
      create unique index objects_bucket_name_key on storage.objects(bucket_id, name);`);
    await db.exec(read('supabase/schema.sql'));
    for (const name of ['maintenance-requests', 'maintenance-request-photos', 'asset-documents',
      'procedures', 'admin-delete-work-orders', 'message-center', 'message-soft-delete-and-thread-scope',
      'message-thread-soft-delete', 'message-work-order-links', 'app-issue-reports']) {
      await db.exec(read(`supabase/step-next-${name}.sql`));
    }
    const oldPhotoBucket = await scalar("select * from storage.buckets where id='work-order-photos'");
    const oldPolicies = (await query(`select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
      from pg_policies where (schemaname='storage' and tablename='objects')
        or (schemaname='public' and tablename in ('work_order_photos','asset_financials'))
      order by schemaname, tablename, policyname`)).rows;
    for (const file of fs.readdirSync(path.resolve(__dirname, '../../supabase/migrations')).filter(x => x.endsWith('.sql')).sort()) {
      await db.exec(read(`supabase/migrations/${file}`));
    }
    // The same exact correction SQL must be retryable against an already-applied QA schema.
    await db.exec(qaDelta);
    await db.exec(qaDelta);
    for (const policy of oldPolicies) {
      const current = await scalar(`select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
        from pg_policies where schemaname=$1 and tablename=$2 and policyname=$3`,
      [policy.schemaname, policy.tablename, policy.policyname]);
      assert.deepEqual(current, policy, `Legacy policy unchanged: ${policy.policyname}`);
    }
    const bucket = await scalar("select * from storage.buckets where id='work-order-documents'");
    assert.equal(bucket.public, false);
    assert.equal(Number(bucket.file_size_limit), 26214400);
    assert.equal(bucket.allowed_mime_types.length, 8);
    assert.ok(bucket.allowed_mime_types.includes('application/zip'));
    assert.deepEqual(await scalar("select * from storage.buckets where id='work-order-photos'"), oldPhotoBucket);
    const functionSecurity = (await query(`select p.proname, p.prosecdef, p.proconfig,
      has_function_privilege('anon',p.oid,'EXECUTE') as anon_execute,
      has_function_privilege('authenticated',p.oid,'EXECUTE') as user_execute
      from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where (n.nspname='public' and p.proname='get_storage_dashboard')
        or (n.nspname='private' and p.proname='record_work_document_event') order by p.proname`)).rows;
    assert.deepEqual(functionSecurity.map(row => [row.proname,row.prosecdef,row.anon_execute,row.user_execute]),
      [['get_storage_dashboard',true,false,true], ['record_work_document_event',false,false,false]]);
    for (const row of functionSecurity) assert.deepEqual(row.proconfig, ['search_path=""']);

    const users = Object.fromEntries(['admin','manager','technician','production','accounting','member','outsider'].map(role => [role, randomUUID()]));
    for (const id of Object.values(users)) await query('insert into auth.users(id) values ($1)', [id]);
    const company = (await scalar("insert into public.companies(name,created_by) values ('Attachments A',$1) returning id", [users.admin])).id;
    const foreign = (await scalar("insert into public.companies(name,created_by) values ('Attachments B',$1) returning id", [users.outsider])).id;
    for (const [role,id] of Object.entries(users)) {
      const tenant = role === 'outsider' ? foreign : company;
      await query('insert into public.company_members(company_id,user_id,role) values ($1,$2,$3)', [tenant,id,role === 'outsider' ? 'admin' : role]);
      await query('insert into public.profiles(company_id,user_id,full_name) values ($1,$2,$3)', [tenant,id,role]);
    }
    await as(users.admin);
    const work = (await scalar("insert into public.work_orders(company_id,title,created_by) values ($1,'Attachment Work',$2) returning id", [company,users.admin])).id;
    const asset = (await scalar("insert into public.assets(company_id,name,created_by) values ($1,'Financial fixture',$2) returning id", [company,users.admin])).id;
    await query('insert into public.asset_financials(company_id,asset_id,acquisition_cost) values ($1,$2,100)', [company,asset]);
    await as(users.outsider);
    const otherWork = (await scalar("insert into public.work_orders(company_id,title,created_by) values ($1,'Other Work',$2) returning id", [foreign,users.outsider])).id;

    const item = (overrides = {}) => {
      const row = { id:randomUUID(), tenant:company, parent:work, fileName:'manual.pdf', mime:'application/pdf', size:12, ...overrides };
      row.objectPath ||= `${row.tenant}/${row.parent}/${row.id}-${row.fileName}`;
      return row;
    };
    const upload = (row, user, metadata = { size:row.size, mimetype:row.mime }) => query(
      "insert into storage.objects(bucket_id,name,owner_id,metadata) values ('work-order-documents',$1,$2,$3::jsonb)",
      [row.objectPath,user,JSON.stringify(metadata)]);
    const attach = (row, user) => query(`insert into public.work_order_documents
      (id,company_id,work_order_id,uploaded_by,storage_path,file_name,content_type,file_size_bytes)
      values ($1,$2,$3,$4,$5,$6,$7,$8)`, [row.id,row.tenant,row.parent,user,row.objectPath,row.fileName,row.mime,row.size]);
    const removeRow = row => query('delete from public.work_order_documents where id=$1 returning id', [row.id]);
    const removeObject = row => query("delete from storage.objects where bucket_id='work-order-documents' and name=$1 returning id", [row.objectPath]);
    const dashboard = async tenant => (await scalar('select public.get_storage_dashboard($1) as dashboard', [tenant])).dashboard;
    const events = type => query('select actor_id, summary from public.work_order_events where work_order_id=$1 and event_type=$2', [work,type]);
    const saved = {};
    for (const role of ['admin','manager','technician','production','member']) {
      await as(users[role]);
      saved[role] = item();
      await upload(saved[role], users[role]);
      await attach(saved[role], users[role]);
      await denied(query('update public.work_order_documents set file_size_bytes=1 where id=$1', [saved[role].id]), `${role}: metadata immutable`);
      await unchanged(query("update storage.objects set metadata='{}' where name=$1 returning id", [saved[role].objectPath]), `${role}: object immutable`);
    }
    assert.equal((await events('file_uploaded')).rows.length, 5);
    for (const role of ['admin','manager','technician','production','accounting','member']) {
      await as(users[role]);
      assert.equal((await scalar('select count(*)::int as n from public.work_order_documents')).n, 5, `${role}: read rows`);
      assert.equal((await scalar("select count(*)::int as n from storage.objects where bucket_id='work-order-documents'")).n, 5, `${role}: read objects`);
      if (!['admin','manager'].includes(role)) await assert.rejects(dashboard(company), /Only company admins and managers/);
      assert.equal((await scalar('select count(*)::int as n from public.asset_financials')).n,
        ['admin','manager','accounting'].includes(role) ? 1 : 0, `${role}: financial visibility preserved`);
      if (!['admin','accounting'].includes(role)) {
        await unchanged(query('update public.asset_financials set acquisition_cost=999 returning id'), `${role}: no financial edit`);
      }
    }
    await as(users.accounting);
    await denied(upload(item(), users.accounting), 'Accounting cannot upload');
    await denied(attach(item(), users.accounting), 'Accounting cannot attach');
    await unchanged(removeRow(saved.admin), 'Accounting cannot delete metadata');
    await unchanged(removeObject(saved.admin), 'Accounting cannot delete objects');
    assert.equal((await query('update public.asset_financials set acquisition_cost=101 where asset_id=$1 returning id', [asset])).rows.length, 1);
    await unchanged(query("update public.work_orders set title='forged' where id=$1 returning id", [work]), 'Accounting remains operationally read-only');

    await as(users.technician);
    await unchanged(removeRow(saved.production), 'Technician cannot delete another uploader');
    await unchanged(removeObject(saved.production), 'Technician cannot delete another object');
    await as(users.production);
    await unchanged(removeRow(saved.technician), 'Production cannot delete another uploader');
    await unchanged(removeObject(saved.technician), 'Production cannot delete another object');
    await as(users.outsider);
    assert.equal((await scalar('select count(*)::int as n from public.work_order_documents')).n, 0);
    assert.equal((await scalar("select count(*)::int as n from storage.objects where bucket_id='work-order-documents'")).n, 0);
    await unchanged(removeRow(saved.admin), 'Cross-company row deletion denied');
    await unchanged(removeObject(saved.admin), 'Cross-company object deletion denied');
    await assert.rejects(dashboard(company), /Only company admins and managers/);
    const foreignDocument = item({tenant:foreign,parent:otherWork,size:900000});
    await upload(foreignDocument, users.outsider);
    await attach(foreignDocument, users.outsider);

    await as(users.technician);
    const backed = item();
    await upload(backed, users.technician);
    for (const forged of [{size:1}, {size:13}, {mime:'text/plain'}, {tenant:foreign},
      {parent:otherWork}, {id:randomUUID()}, {fileName:'different.pdf'}]) {
      await denied(attach({...backed,...forged}, users.technician), `Forged metadata: ${JSON.stringify(forged)}`, ['42501','23514']);
    }
    await denied(attach(backed, users.admin), 'Cannot forge uploader');
    await denied(attach(saved.production, users.technician), 'Cannot claim another uploader object');
    await denied(attach(item(), users.technician), 'Unbacked metadata rejected');
    await denied(upload(item(), users.admin), 'Cannot forge storage owner');
    await denied(upload(item(), null), 'Cannot omit storage owner');
    await denied(upload(item({parent:otherWork}), users.technician), 'Cannot forge same-company work relationship');
    await denied(upload(item({tenant:foreign,parent:otherWork}), users.technician), 'Cannot upload across tenants');
    await denied(upload(item({parent:randomUUID()}), users.technician), 'Cannot upload to missing work order');
    for (const tail of ['no-document-id.pdf', `${randomUUID()}-`, `${randomUUID()}-..`,
      `${randomUUID()}-bad/name.pdf`, `${randomUUID()}-bad\\name.pdf`, `${randomUUID()}-%2e%2e.pdf`,
      `${randomUUID()}-bad\nname.pdf`, `${randomUUID()}-${'a'.repeat(241)}`]) {
      await denied(upload(item({objectPath:`${company}/${work}/${tail}`}), users.technician), `Unsafe path: ${JSON.stringify(tail)}`);
    }
    for (const metadata of [{}, {size:12}, {mimetype:'application/pdf'}, {size:'not-a-size',mimetype:'application/pdf'},
      {size:12,mimetype:'image/jpeg'}]) {
      const missing = item();
      await upload(missing, users.technician, metadata);
      await denied(attach(missing, users.technician), 'Missing or mismatched authoritative metadata');
      await removeObject(missing);
    }
    for (const invalid of [{size:0}, {size:-1}, {size:26214401}, {mime:'application/x-msdownload'}]) {
      const row = item(invalid);
      await upload(row, users.technician);
      await denied(attach(row, users.technician), 'Table size/type limits', ['23514']);
      await removeObject(row);
    }
    await denied(query(`insert into public.work_order_documents
      (id,company_id,work_order_id,uploaded_by,storage_path,file_name,content_type,file_size_bytes,created_at)
      values ($1,$2,$3,$4,$5,'manual.pdf','application/pdf',12,'2000-01-01')`,
    [backed.id,company,work,users.technician,backed.objectPath]), 'Client cannot forge attachment timestamp');

    // Both row mutations must roll back when the invoker cannot record their history.
    await db.exec(`reset role; create policy smoke_block_document_history on public.work_order_events
      as restrictive for insert to authenticated with check (event_type not in ('file_uploaded','file_deleted'));`);
    await as(users.technician);
    await denied(attach(backed, users.technician), 'Upload history is atomic');
    assert.equal((await scalar('select count(*)::int as n from public.work_order_documents where id=$1', [backed.id])).n, 0);
    await denied(removeRow(saved.technician), 'Delete history is atomic');
    assert.equal((await scalar('select count(*)::int as n from public.work_order_documents where id=$1', [saved.technician.id])).n, 1);
    await db.exec('reset role; drop policy smoke_block_document_history on public.work_order_events');
    await as(users.technician);
    await attach(backed, users.technician);
    await denied(attach(backed, users.technician), 'Duplicate attachment rejected', ['23505']);
    assert.equal((await events('file_uploaded')).rows.length, 6);
    assert.ok((await events('file_uploaded')).rows.some(row => row.actor_id === users.technician && row.summary === 'File uploaded: manual.pdf.'));

    // Existing broad permissive policies must not grant access to this new bucket.
    await db.exec(`reset role; create policy smoke_legacy_storage_access on storage.objects
      for all to authenticated using (true) with check (true);`);
    await as(users.accounting);
    await denied(upload(item(), users.accounting), 'Broad policy cannot grant accounting uploads');
    await unchanged(removeObject(saved.admin), 'Broad policy cannot grant accounting deletes');
    await unchanged(query("update storage.objects set owner_id=$1 where name=$2 returning id", [users.accounting,saved.admin.objectPath]), 'Broad policy cannot overwrite documents');
    await as(users.outsider);
    assert.equal((await scalar("select count(*)::int as n from storage.objects where bucket_id='work-order-documents' and name=$1", [saved.admin.objectPath])).n, 0);
    await unchanged(removeObject(saved.admin), 'Broad policy cannot grant outsider deletes');
    await as(users.admin);
    await unchanged(query("update storage.objects set bucket_id='part-documents' where name=$1 returning id", [saved.admin.objectPath]), 'Cannot move objects out of protected bucket');
    const otherBucket = `${company}/${randomUUID()}/move.pdf`;
    await query("insert into storage.objects(bucket_id,name,owner_id) values ('part-documents',$1,$2)", [otherBucket,users.admin]);
    await denied(query("update storage.objects set bucket_id='work-order-documents' where name=$1", [otherBucket]), 'Cannot move objects into protected bucket');
    await query('delete from storage.objects where name=$1', [otherBucket]);
    await db.exec('reset role; drop policy smoke_legacy_storage_access on storage.objects');

    // Legacy photos still work, remain separately classified, and retain their limit.
    await as(users.technician);
    const photoPath = `${company}/${work}/legacy-photo.jpg`;
    await query("insert into storage.objects(bucket_id,name,owner_id,metadata) values ('work-order-photos',$1,$2,'{\"size\":7,\"mimetype\":\"image/jpeg\"}')", [photoPath,users.technician]);
    await query(`insert into public.work_order_photos(company_id,work_order_id,uploaded_by,storage_path,file_name,content_type,file_size_bytes)
      values ($1,$2,$3,$4,'legacy-photo.jpg','image/jpeg',7)`, [company,work,users.technician,photoPath]);
    const typed = [];
    for (const [index,mime] of bucket.allowed_mime_types.entries()) {
      const row = item({mime,size:index === 0 ? 26214400 : 100 + index});
      await upload(row, users.technician);
      await attach(row, users.technician);
      typed.push(row);
    }
    // Month attribution comes from Storage, not caller-controlled document metadata.
    await db.exec('reset role');
    await query("update storage.objects set created_at=date_trunc('month',now())-interval '1 month'+interval '1 day' where name=$1", [typed[0].objectPath]);
    await query("update storage.objects set created_at=date_trunc('month',now())-interval '12 months' where name=$1", [photoPath]);
    await query("update public.work_orders set title='' where id=$1", [work]);
    await as(users.admin);
    const totalBytes = 6 * 12 + typed.reduce((sum,row) => sum + row.size, 0) + 7;
    const usage = await dashboard(company);
    assert.equal(usage.file_count, 15);
    assert.equal(usage.photo_count, 1);
    assert.equal(usage.total_bytes, totalBytes);
    assert.equal(usage.remaining_bytes, 107374182400 - totalBytes);
    assert.deepEqual(usage.bucket_totals.find(row => row.bucket_id === 'work-order-documents'),
      {bucket_id:'work-order-documents',file_count:14,size_bytes:totalBytes - 7});
    assert.equal(usage.monthly_usage.length, 12);
    assert.equal(usage.monthly_usage.at(-2).file_count, 1);
    assert.equal(usage.monthly_usage.at(-2).size_bytes, 26214400);
    assert.equal(usage.monthly_usage.at(-2).photo_count, 0);
    assert.equal(usage.monthly_usage.at(-2).cumulative_bytes, 26214407);
    assert.equal(usage.monthly_usage.at(-1).file_count, 13);
    assert.equal(usage.monthly_usage.at(-1).size_bytes, totalBytes - 26214407);
    assert.equal(usage.monthly_usage.at(-1).cumulative_bytes, totalBytes);
    assert.equal(usage.top_files.length, 10);
    assert.deepEqual(Object.fromEntries(['bucket_id','object_path','size_bytes','content_type','record_type','file_record_id',
      'linked_record_id','linked_record_label','link_section'].map(key => [key,usage.top_files[0][key]])),
    {bucket_id:'work-order-documents',object_path:typed[0].objectPath,size_bytes:26214400,content_type:typed[0].mime,
      record_type:'work_order_document',file_record_id:typed[0].id,linked_record_id:work,linked_record_label:'Work order',link_section:'work'});
    assert.ok(usage.top_files.every(row => row.linked_record_id !== otherWork));
    assert.deepEqual(usage.top_files.map(row => row.size_bytes), usage.top_files.map(row => row.size_bytes).sort((a,b) => b-a));
    await as(users.manager);
    assert.equal((await dashboard(company)).total_bytes, totalBytes);

    // Owner cleanup, managerial cleanup, and storage-first whole-work-order cleanup.
    for (const [actor, row] of [['technician',backed], ['production',saved.production], ['member',saved.member],
      ['manager',saved.technician], ['admin',saved.manager]]) {
      await as(users[actor]);
      assert.equal((await removeRow(row)).rows.length, 1, `${actor}: permitted metadata deletion`);
      assert.equal((await removeObject(row)).rows.length, 1, `${actor}: permitted storage deletion`);
    }
    assert.equal((await events('file_deleted')).rows.length, 5);
    assert.ok((await events('file_deleted')).rows.some(row => row.actor_id === users.manager && row.summary === 'File deleted: manual.pdf.'));
    assert.equal((await dashboard(company)).file_count, 10);
    assert.equal((await removeObject(saved.admin)).rows.length, 1);
    await denied(upload(saved.admin, users.admin), 'Cannot rebind an existing document by deleting and reuploading its object');
    assert.equal((await dashboard(company)).file_count, 9, 'Missing objects are not billed');
    await query('delete from public.work_orders where id=$1', [work]);
    assert.equal((await scalar('select count(*)::int as n from public.work_order_documents')).n, 0);
    assert.equal((await events('file_deleted')).rows.length, 0, 'Parent cascade does not recreate deleted history');
    assert.equal((await dashboard(company)).file_count, 0);
    for (const row of typed) assert.equal((await removeObject(row)).rows.length, 1, 'Orphan cleanup works after parent deletion');
    assert.equal(Number((await scalar('select acquisition_cost from public.asset_financials where asset_id=$1', [asset])).acquisition_cost), 101);
    await as(users.outsider);
    assert.equal((await dashboard(foreign)).file_count, 1, 'Other tenant remains untouched');

    await as(null, 'anon');
    await denied(query('select * from public.work_order_documents'), 'Anonymous metadata denied');
    await denied(query('select public.get_storage_dashboard($1)', [company]), 'Anonymous dashboard denied');
    assert.equal((await scalar("select count(*)::int as n from storage.objects where bucket_id='work-order-documents'")).n, 0);
    await denied(upload(item(), users.admin), 'Anonymous upload denied');
    await as(null);
    await assert.rejects(dashboard(company), /Only company admins and managers/);
    console.log('work order document SQL smoke passed: role/tenant matrix, storage metadata binding, safe paths, immutable objects, policy interference, atomic history, dashboard totals/months/links, legacy photos/finance, retryable QA delta');
  } finally {
    await db.close();
  }
}
