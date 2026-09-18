const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");

async function verifyMessaging(database, ids, setUser, resetRole) {
  const checks = [];
  const pass = (name) => checks.push({ name: `messaging:${name}`, verdict: "PASS" });
  const denied = async (sql, params) => assert.rejects(() => database.query(sql, params));
  const thread = randomUUID(), other = randomUUID(), foreign = randomUUID(), message = randomUUID(), otherMessage = randomUUID();
  await resetRole(database);
  for (const [id, company, creator] of [[thread, ids.companyA, ids.admin], [other, ids.companyA, ids.admin], [foreign, ids.companyB, ids.outsider]]) {
    await database.query("insert into public.message_threads (id,company_id,created_by,title,thread_type) values ($1,$2,$3,'Isolated proof','direct')", [id, company, creator]);
  }
  for (const user of [ids.admin, ids.technician, ids.production, ids.accounting]) {
    await database.query("insert into public.message_thread_members (company_id,thread_id,user_id) values ($1,$2,$3)", [ids.companyA, thread, user]);
  }
  await database.query("insert into public.messages (id,company_id,thread_id,sender_id,body) values ($1,$2,$3,$4,'Original'),($5,$2,$6,$4,'Private other')", [message, ids.companyA, thread, ids.admin, otherMessage, other]);

  await setUser(database, ids.technician);
  assert.equal((await database.query("select id from public.messages")).rows.length, 1);
  await denied("update public.message_threads set created_by=$1 where id=$2", [ids.technician, thread]);
  await denied("insert into public.message_reads(company_id,thread_id,user_id) values($1,$2,$3)", [ids.companyA, other, ids.technician]);
  pass("client_cannot_change_audience_or_mark_nonmember_threads");
  await database.query("select public.set_my_message_preferences($1,true,true)", [thread]);
  let members = (await database.query("select * from public.message_thread_members where thread_id=$1", [thread])).rows;
  assert.ok(members.find((row) => row.user_id === ids.technician).archived_at);
  assert.equal(members.find((row) => row.user_id === ids.technician).muted, true);
  assert.ok(members.filter((row) => row.user_id !== ids.technician).every((row) => !row.archived_at && !row.muted));
  await database.query("select public.set_my_message_preferences($1,false,null)", [thread]);
  members = (await database.query("select * from public.message_thread_members where thread_id=$1 and user_id=$2", [thread, ids.technician])).rows;
  assert.equal(members[0].archived_at, null);
  assert.equal(members[0].muted, true);
  await database.query("select public.set_my_message_preferences($1,null,false)", [thread]);
  await denied("select public.set_my_message_preferences($1,true,true)", [other]);
  await denied("select public.set_my_message_preferences($1,true,true)", [foreign]);
  pass("archive_restore_mute_own_membership_only");

  const reply = (await database.query("insert into public.messages(company_id,thread_id,sender_id,body,reply_to_id) values($1,$2,$3,'Quoted',$4) returning id", [ids.companyA, thread, ids.technician, message])).rows[0].id;
  await denied("insert into public.messages(company_id,thread_id,sender_id,body,reply_to_id) values($1,$2,$3,'Forbidden quote',$4)", [ids.companyA, thread, ids.technician, otherMessage]);
  pass("quotes_cannot_cross_conversations");

  const reaction = (await database.query("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'acknowledged') returning id", [ids.companyA, thread, message, ids.technician])).rows[0].id;
  await database.query("update public.message_reactions set active=false where id=$1", [reaction]);
  assert.equal((await database.query("select active from public.message_reactions where id=$1", [reaction])).rows[0].active, false);
  await denied("update public.message_reactions set user_id=$1 where id=$2", [ids.admin, reaction]);
  await denied("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'thanks')", [ids.companyA, thread, message, ids.admin]);
  await denied("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'arbitrary')", [ids.companyA, thread, message, ids.technician]);
  await denied("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'looking')", [ids.companyA, thread, otherMessage, ids.technician]);
  pass("reactions_own_scoped_allowlisted_and_toggleable");

  await setUser(database, ids.production);
  assert.equal((await database.query("update public.message_reactions set active=true where id=$1 returning id", [reaction])).rows.length, 0);
  await database.query("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'looking')", [ids.companyA, thread, message, ids.production]);
  pass("production_allowed_other_user_reaction_protected");

  await setUser(database, ids.accounting);
  assert.equal((await database.query("select id from public.message_reactions")).rows.length, 2);
  await denied("select public.set_my_message_preferences($1,true,true)", [thread]);
  await denied("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'thanks')", [ids.companyA, thread, message, ids.accounting]);
  await denied("insert into public.messages(company_id,thread_id,sender_id,body) values($1,$2,$3,'Forbidden')", [ids.companyA, thread, ids.accounting]);
  await denied("insert into public.message_threads(company_id,created_by,title) values($1,$2,'Forbidden')", [ids.companyA, ids.accounting]);
  pass("accounting_reads_but_cannot_mutate");
  await resetRole(database);
  const legacy = randomUUID();
  await database.query("insert into public.messages(id,company_id,thread_id,sender_id,body) values($1,$2,$3,$4,'Legacy own message')", [legacy, ids.companyA, thread, ids.accounting]);
  await setUser(database, ids.accounting);
  await denied("select public.soft_delete_own_message($1)", [legacy]);
  await denied("select public.soft_delete_own_message_thread($1)", [thread]);
  await setUser(database, ids.technician);
  await denied("select public.soft_delete_own_message($1)", [message]);
  await database.query("select public.soft_delete_own_message($1)", [reply]);
  pass("delete_requires_current_editor_role_and_ownership");

  await setUser(database, ids.manager);
  assert.equal((await database.query("select id from public.message_reactions")).rows.length, 0);
  assert.equal((await database.query("select id from public.messages")).rows.length, 0);
  await denied("select public.set_my_message_preferences($1,true,true)", [thread]);
  await setUser(database, ids.outsider);
  assert.equal((await database.query("select id from public.message_reactions")).rows.length, 0);
  await denied("select public.set_my_message_preferences($1,true,true)", [thread]);
  pass("nonparticipant_and_cross_tenant_privacy");

  checks.push(...await require('./isolated-message-tools-check').verifyMessageTools(database, ids, setUser, resetRole, thread, other, message));

  await resetRole(database);
  await database.query("update public.messages set deleted_at=now() where id=$1", [message]);
  await setUser(database, ids.technician);
  await denied("insert into public.message_reactions(company_id,thread_id,message_id,user_id,reaction) values($1,$2,$3,$4,'question')", [ids.companyA, thread, message, ids.technician]);
  pass("cannot_react_to_deleted_message");
  await resetRole(database);
  await database.query("delete from public.message_threads where id=any($1::uuid[])", [[thread, other, foreign]]);
  assert.equal((await database.query("select id from public.messages where id=$1", [reply])).rows.length, 0);
  assert.equal((await database.query("select id from public.message_reactions")).rows.length, 0);
  pass("thread_cleanup_with_quotes_and_reactions");
  return checks;
}

module.exports = { verifyMessaging };
