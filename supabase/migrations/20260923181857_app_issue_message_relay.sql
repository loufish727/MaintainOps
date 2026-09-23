-- Routing is company-scoped configuration, not a new messaging surface.
create table private.app_issue_message_recipients (
  company_id uuid primary key references public.companies(id) on delete cascade,
  recipient_id uuid not null,
  foreign key (company_id, recipient_id) references public.company_members(company_id, user_id) on delete cascade
);
alter table private.app_issue_message_recipients enable row level security;
revoke all on private.app_issue_message_recipients from public, anon, authenticated;
grant all on private.app_issue_message_recipients to service_role;
create policy "Backend manages app issue recipient" on private.app_issue_message_recipients
for all to service_role using (true) with check (true);

create function public.set_app_issue_message_recipient(target_company_id uuid, target_recipient_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null or not exists (select 1 from public.company_members
    where company_id = target_company_id and user_id = auth.uid() and role = 'admin') then
    raise exception 'Only company admins can configure the issue recipient.' using errcode = '42501';
  end if;
  if target_recipient_id is null then
    delete from private.app_issue_message_recipients where company_id = target_company_id;
    return;
  end if;
  if not exists (select 1 from public.company_members where company_id = target_company_id
    and user_id = target_recipient_id and role in ('admin', 'manager')) then
    raise exception 'Choose an admin or manager in this company.' using errcode = '42501';
  end if;
  insert into private.app_issue_message_recipients(company_id, recipient_id)
  values (target_company_id, target_recipient_id)
  on conflict (company_id) do update set recipient_id = excluded.recipient_id;
end;
$$;
revoke all on function public.set_app_issue_message_recipient(uuid, uuid) from public, anon;
grant execute on function public.set_app_issue_message_recipient(uuid, uuid) to authenticated;

-- Only this INSERT trigger may relay on behalf of the reporting user. Ordinary
-- messaging grants, including Accounting's read-only contract, stay unchanged.
create function private.relay_app_issue_message()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  recipient uuid;
  conversation uuid;
  location_name text;
  sent_at timestamptz;
begin
  select recipient_id into recipient from private.app_issue_message_recipients
    where company_id = new.company_id;
  if recipient is null then return new; end if;
  if auth.uid() is null or auth.uid() <> new.reporter_id or not exists (
    select 1 from public.company_members where company_id = new.company_id and user_id = new.reporter_id
  ) then
    raise exception 'The report must be submitted by its signed-in author.' using errcode = '42501';
  end if;
  if not exists (select 1 from public.company_members where company_id = new.company_id
    and user_id = recipient and role in ('admin', 'manager')) then
    raise exception 'The issue recipient is unavailable. Ask a company admin to update routing.';
  end if;
  if new.location_id is not null then
    select name into location_name from public.locations where id = new.location_id and company_id = new.company_id;
    if not found then raise exception 'The report location is not in this company.' using errcode = '42501'; end if;
  end if;
  -- Reporting to oneself needs no artificial unread message or self-conversation.
  if recipient = new.reporter_id then return new; end if;

  -- Concurrent reports for the same pair must choose/create one conversation.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'app-issue-relay:' || new.company_id::text || ':' || least(recipient, new.reporter_id)::text
    || ':' || greatest(recipient, new.reporter_id)::text, 0));
  select t.id into conversation from public.message_threads t
  where t.company_id = new.company_id and t.thread_type = 'direct'
    and t.title = 'Direct message' and t.location_id is null and t.work_order_id is null
    and t.created_by in (new.reporter_id, recipient)
    and (select count(*) from public.message_thread_members m where m.thread_id = t.id) = 2
    and exists (select 1 from public.message_thread_members m where m.thread_id = t.id
      and m.company_id = new.company_id and m.user_id = new.reporter_id)
    and exists (select 1 from public.message_thread_members m where m.thread_id = t.id
      and m.company_id = new.company_id and m.user_id = recipient)
  order by t.updated_at desc, t.id
  limit 1 for update of t;

  if conversation is null then
    insert into public.message_threads(company_id, thread_type, title, created_by)
    values (new.company_id, 'direct', 'Direct message', new.reporter_id) returning id into conversation;
    insert into public.message_thread_members(company_id, thread_id, user_id)
    values (new.company_id, conversation, new.reporter_id), (new.company_id, conversation, recipient);
  end if;

  sent_at := clock_timestamp();
  insert into public.messages(id, company_id, thread_id, sender_id, body, created_at)
  values (new.id, new.company_id, conversation, new.reporter_id,
    'Automatically sent from an issue report.' || E'\n\n'
    || 'App issue: ' || new.title || E'\n'
    || 'Location: ' || coalesce(location_name, 'No location') || E'\n'
    || 'Screen: ' || coalesce(nullif(new.screen, ''), 'Workspace') || E'\n'
    || 'Severity: ' || new.severity || E'\n\n' || new.details, sent_at);
  update public.message_threads set updated_at = sent_at where id = conversation;
  return new;
end;
$$;
revoke all on function private.relay_app_issue_message() from public, anon, authenticated;
create trigger relay_app_issue_message after insert on public.app_issue_reports
for each row execute function private.relay_app_issue_message();

-- No backfill, status synchronization, or report/message deletion cascade.
notify pgrst, 'reload schema';
