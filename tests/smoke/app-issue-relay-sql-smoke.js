const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const migration = '20260923181857_app_issue_message_relay.sql';

async function main() {
  const { PGlite } = await import('@electric-sql/pglite');
  const { pgcrypto } = await import('@electric-sql/pglite/contrib/pgcrypto');
  const db = new PGlite({ extensions: { pgcrypto } });
  const query = (sql, args = []) => db.query(sql, args);
  const row = async (sql, args) => (await query(sql, args)).rows[0];
  const owner = () => db.exec('reset role');
  const as = async (id, role = 'authenticated') => {
    assert.ok(['authenticated', 'anon'].includes(role));
    await db.exec(`reset role; set role ${role}`);
    await query("select set_config('request.jwt.claim.sub',$1,false)", [id || '']);
  };
  const checks = [];
  const pass = label => checks.push(label);
  try {
    await db.exec(read('tests/fixtures/supabase-postgres-prelude.sql'));
    await db.exec(read('supabase/schema.sql'));
    for (const name of ['maintenance-requests', 'procedures', 'message-center',
      'message-soft-delete-and-thread-scope', 'message-thread-soft-delete', 'message-work-order-links', 'app-issue-reports']) {
      await db.exec(read(`supabase/step-next-${name}.sql`));
    }
    for (const file of fs.readdirSync(path.join(root, 'supabase/migrations')).filter(x => x.endsWith('.sql') && x < migration).sort()) {
      await db.exec(read(`supabase/migrations/${file}`));
    }
    const users = Object.fromEntries(['admin','manager','technician','production','accounting','outsider'].map(name => [name, randomUUID()]));
    for (const id of Object.values(users)) await query('insert into auth.users(id) values ($1)', [id]);
    const company = (await row("insert into public.companies(name,created_by) values ('Relay A',$1) returning id", [users.admin])).id;
    const other = (await row("insert into public.companies(name,created_by) values ('Relay B',$1) returning id", [users.outsider])).id;
    for (const [role,id] of Object.entries(users)) {
      const tenant = role === 'outsider' ? other : company;
      await query('insert into public.company_members(company_id,user_id,role) values ($1,$2,$3)', [tenant,id,role === 'outsider' ? 'admin' : role]);
      await query('insert into public.profiles(company_id,user_id,full_name) values ($1,$2,$3)', [tenant,id,role]);
    }
    const loc = (await row("insert into public.locations(company_id,name) values($1,'Salem') returning id", [company])).id;
    const second = (await row("insert into public.locations(company_id,name) values($1,'Riverside') returning id", [company])).id;
    const foreignLoc = (await row("insert into public.locations(company_id,name) values($1,'Other') returning id", [other])).id;
    const report = (user = users.technician, values = {}) => ({ id:randomUUID(),company_id:company,reporter_id:user,
      location_id:loc,screen:'work',severity:'normal',title:'Save failed',details:'Please investigate.',...values });
    const insert = r => query(`insert into public.app_issue_reports(id,company_id,reporter_id,location_id,screen,severity,title,details)
      values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`, [r.id,r.company_id,r.reporter_id,r.location_id,r.screen,r.severity,r.title,r.details]);
    const message = id => row('select * from public.messages where id=$1', [id]);
    const configure = (recipient, tenant = company) => query('select public.set_app_issue_message_recipient($1,$2)', [tenant,recipient]);
    await as(users.technician);
    const old = report(); await insert(old);
    await owner();
    const policies = (await query("select * from pg_policies where tablename in ('messages','message_threads','message_thread_members') order by tablename,policyname")).rows;
    await db.exec(read(`supabase/migrations/${migration}`));
    assert.deepEqual((await query("select * from pg_policies where tablename in ('messages','message_threads','message_thread_members') order by tablename,policyname")).rows, policies);
    assert.equal(await message(old.id), undefined);
    const security = (await query(`select proname,prosecdef,proconfig,
      has_function_privilege('anon',oid,'execute') as anon,
      has_function_privilege('authenticated',oid,'execute') as signed_in
      from pg_proc where proname in ('relay_app_issue_message','set_app_issue_message_recipient') order by proname`)).rows;
    assert.deepEqual(security.map(r => [r.proname,r.prosecdef,r.anon,r.signed_in]),
      [['relay_app_issue_message',true,false,false],['set_app_issue_message_recipient',true,false,true]]);
    security.forEach(r => assert.deepEqual(r.proconfig, ['search_path=""']));
    pass('no_backfill_and_existing_messaging_permissions_unchanged');

    for (const role of ['manager','technician','production','accounting','outsider']) {
      await as(users[role]);
      await assert.rejects(configure(users.admin), /Only company admins/);
      await assert.rejects(query('select * from private.app_issue_message_recipients'), /permission denied/);
      await assert.rejects(query('select private.relay_app_issue_message()'), /permission denied/);
    }
    await as(null,'anon'); await assert.rejects(configure(users.admin), /permission denied/);
    await as(users.admin);
    await assert.rejects(configure(users.outsider), /Choose an admin/);
    await assert.rejects(configure(users.technician), /Choose an admin/);
    await assert.rejects(configure(users.admin,other), /Only company admins/);
    await configure(users.admin);
    assert.equal(await message(old.id), undefined);
    pass('routing_admin_only_no_cross_company_or_raw_configuration_access');

    const self = report(users.admin); await insert(self); assert.equal(await message(self.id), undefined);
    await as(users.outsider);
    const unrouted = report(users.outsider,{ company_id:other,location_id:foreignLoc });
    await insert(unrouted); assert.equal(await message(unrouted.id), undefined);
    await as(users.technician);
    await assert.rejects(insert(report(users.admin)), /row-level security/);
    await assert.rejects(insert(report(users.technician,{company_id:other,location_id:foreignLoc})), /row-level security/);
    await assert.rejects(insert(report(users.technician,{location_id:foreignLoc})), /report location/);
    pass('self_and_unconfigured_reports_not_relayed_forgery_and_foreign_location_denied');

    // An ordinary recipient-created direct conversation must also be reusable.
    await as(users.admin);
    const direct = (await row("insert into public.message_threads(company_id,thread_type,title,created_by) values($1,'direct','Direct message',$2) returning id", [company,users.admin])).id;
    await query('insert into public.message_thread_members(company_id,thread_id,user_id) values($1,$2,$3),($1,$2,$4)', [company,direct,users.admin,users.technician]);
    await query('select public.set_my_message_preferences($1,true,true)', [direct]);
    await query('insert into public.message_reads(company_id,thread_id,user_id) values($1,$2,$3)', [company,direct,users.admin]);
    const reads = await row('select * from public.message_reads where thread_id=$1',[direct]);
    const prefs = await row('select archived_at,muted from public.message_thread_members where thread_id=$1 and user_id=$2',[direct,users.admin]);
    await as(users.technician);
    const first = report(); await insert(first);
    const sent = await message(first.id);
    assert.equal(sent.thread_id,direct); assert.equal(sent.sender_id,users.technician);
    assert.equal(sent.body,'Automatically sent from an issue report.\n\nApp issue: Save failed\nLocation: Salem\nScreen: work\nSeverity: normal\n\nPlease investigate.');
    assert.ok(new Date(sent.created_at) > new Date(prefs.archived_at));
    await assert.rejects(insert(first), error => error.code === '23505');
    const next = report(users.technician,{location_id:second}); await insert(next);
    assert.equal((await message(next.id)).thread_id,direct);
    assert.match((await message(next.id)).body,/Location: Riverside/);
    await as(users.admin);
    assert.deepEqual(await row('select archived_at,muted from public.message_thread_members where thread_id=$1 and user_id=$2',[direct,users.admin]),prefs);
    assert.deepEqual(await row('select * from public.message_reads where thread_id=$1',[direct]),reads);
    await query("insert into public.messages(company_id,thread_id,sender_id,body) values($1,$2,$3,'Resolved; please try again.')",[company,direct,users.admin]);
    await query("update public.app_issue_reports set status='resolved' where id=$1",[first.id]);
    await query('delete from public.app_issue_reports where id=$1',[first.id]);
    assert.deepEqual(await message(first.id),sent);
    await as(users.technician);
    await query("insert into public.messages(company_id,thread_id,sender_id,body) values($1,$2,$3,'Working now, thanks.')",[company,direct,users.technician]);
    pass('existing_dm_reused_cross_location_retry_archive_mute_read_and_issue_lifecycle_independent');

    for (const role of ['manager','outsider']) {
      await as(users[role]); assert.equal(await message(next.id),undefined);
    }
    pass('conversation_private_to_reporter_and_recipient');

    await as(users.admin);
    const work = (await row("insert into public.work_orders(company_id,title,created_by) values($1,'Fixture',$2) returning id",[company,users.admin])).id;
    for (const [title,linked,third,creator] of [['Direct message',work,false,users.admin],['Specific topic',null,false,users.admin],
      ['Direct message',null,true,users.admin],['Direct message',null,false,users.manager]]) {
      await owner();
      const t = (await row("insert into public.message_threads(company_id,thread_type,title,created_by,work_order_id) values($1,'direct',$2,$3,$4) returning id",[company,title,creator,linked])).id;
      await query('insert into public.message_thread_members(company_id,thread_id,user_id) values($1,$2,$3),($1,$2,$4)',[company,t,users.admin,users.production]);
      if(third) await query('insert into public.message_thread_members(company_id,thread_id,user_id) values($1,$2,$3)',[company,t,users.manager]);
    }
    await as(users.production);
    const prod = report(users.production); await insert(prod);
    const prodMessage = await message(prod.id);
    const audience = (await query('select user_id from public.message_thread_members where thread_id=$1',[prodMessage.thread_id])).rows;
    assert.deepEqual(audience.map(r=>r.user_id).sort(),[users.admin,users.production].sort());
    assert.equal((await row('select count(*)::int as n from public.messages where thread_id=$1',[prodMessage.thread_id])).n,1);
    const another = report(users.production); await insert(another);
    assert.equal((await message(another.id)).thread_id,prodMessage.thread_id);
    pass('fresh_two_person_dm_excludes_work_topics_expanded_audiences_and_third_party_owners');

    await as(users.accounting);
    const collision = report(users.accounting,{id:next.id});
    await assert.rejects(insert(collision),error=>error.code==='23505');
    const ac = report(users.accounting); await insert(ac);
    const accountMessage = await message(ac.id);
    assert.equal(accountMessage.sender_id,users.accounting);
    await assert.rejects(query("insert into public.messages(company_id,thread_id,sender_id,body) values($1,$2,$3,'Not permitted')",[company,accountMessage.thread_id,users.accounting]),/row-level security/);
    await as(users.admin);
    await query("insert into public.messages(company_id,thread_id,sender_id,body) values($1,$2,$3,'We received your report.')",[company,accountMessage.thread_id,users.admin]);
    await as(users.accounting);
    assert.equal((await row('select count(*)::int as n from public.messages where thread_id=$1',[accountMessage.thread_id])).n,2);
    pass('accounting_report_relay_and_receiving_work_without_expanding_manual_send_permissions');

    // Force a downstream message collision after a new report begins inserting.
    await as(users.manager);
    const failure = report(users.manager); await owner();
    await query("insert into public.messages(id,company_id,thread_id,sender_id,body) values($1,$2,$3,$4,'Existing message')",[failure.id,company,direct,users.admin]);
    const threadCount = (await row('select count(*)::int as n from public.message_threads')).n;
    await as(users.manager);
    await assert.rejects(insert(failure),error=>error.code==='23505');
    await owner();
    assert.equal((await row('select count(*)::int as n from public.message_threads')).n,threadCount);
    assert.equal((await row('select count(*)::int as n from public.app_issue_reports where id=$1',[failure.id])).n,0);
    pass('relay_failure_rolls_back_report_thread_and_memberships');

    await as(users.admin); await configure(users.manager);
    await owner(); await query("update public.company_members set role='technician' where company_id=$1 and user_id=$2",[company,users.manager]);
    await as(users.technician);
    await assert.rejects(insert(report()),/recipient is unavailable/);
    await as(users.admin); await configure(null);
    await as(users.technician);
    const disabled = report(); await insert(disabled); assert.equal(await message(disabled.id),undefined);
    pass('invalid_recipient_fails_visibly_and_disabling_does_not_backfill');
    console.log(JSON.stringify({status:'PASS',checks},null,2));
  } finally { await db.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
