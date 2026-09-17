-- Additive messaging changes. Existing hidden memberships remain recoverable.
-- The UI's operational read-only contract must also hold for direct API calls.
drop policy if exists "Operational editors create conversations" on public.message_threads;
create policy "Operational editors create conversations" on public.message_threads as restrictive for insert to authenticated
with check (private.is_company_operational_editor(company_id));

-- Client writes only bump activity; audience and ownership are not editable metadata.
revoke update on public.message_threads from public, authenticated;
grant update (updated_at) on public.message_threads to authenticated;

drop policy if exists "Read markers require conversation membership" on public.message_reads;
create policy "Read markers require conversation membership" on public.message_reads as restrictive for all to authenticated
using (private.is_message_thread_member(thread_id, company_id))
with check (private.is_message_thread_member(thread_id, company_id));
drop policy if exists "Operational editors update conversations" on public.message_threads;
create policy "Operational editors update conversations" on public.message_threads as restrictive for update to authenticated
using (private.is_company_operational_editor(company_id)) with check (private.is_company_operational_editor(company_id));
drop policy if exists "Operational editors add conversation members" on public.message_thread_members;
create policy "Operational editors add conversation members" on public.message_thread_members as restrictive for insert to authenticated
with check (private.is_company_operational_editor(company_id));
drop policy if exists "Operational editors send messages" on public.messages;
create policy "Operational editors send messages" on public.messages as restrictive for insert to authenticated
with check (private.is_company_operational_editor(company_id));

alter table public.message_thread_members
  add column if not exists archived_at timestamptz,
  add column if not exists muted boolean not null default false;

alter table public.messages add column if not exists reply_to_id uuid;
create unique index if not exists messages_thread_company_identity_idx on public.messages(id, thread_id, company_id);
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'messages_reply_same_thread_fk' and conrelid = 'public.messages'::regclass) then
    alter table public.messages add constraint messages_reply_same_thread_fk
      foreign key (reply_to_id, thread_id, company_id) references public.messages(id, thread_id, company_id);
  end if;
end $$;
create index if not exists messages_reply_to_idx on public.messages(reply_to_id) where reply_to_id is not null;

-- PostgREST uses a computed relationship for the recursive quote, under caller RLS.
create or replace function public.message_reply(source public.messages)
returns setof public.messages rows 1 language sql stable security invoker set search_path = ''
as $$
  select original.* from public.messages original
  where original.id = source.reply_to_id and original.thread_id = source.thread_id
    and original.company_id = source.company_id and original.deleted_at is null;
$$;
revoke all on function public.message_reply(public.messages) from public, anon;
grant execute on function public.message_reply(public.messages) to authenticated;

create table if not exists public.message_reactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  message_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  reaction text not null check (reaction in ('acknowledged', 'looking', 'thanks', 'question')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (message_id, user_id, reaction),
  foreign key (message_id, thread_id, company_id) references public.messages(id, thread_id, company_id) on delete cascade
);
create index if not exists message_reactions_thread_idx on public.message_reactions(thread_id, company_id);
create index if not exists message_reactions_user_idx on public.message_reactions(user_id);
alter table public.message_reactions enable row level security;
revoke all on public.message_reactions from public, anon, authenticated;
grant select, insert on public.message_reactions to authenticated;
grant update (active) on public.message_reactions to authenticated;

drop policy if exists "Members read conversation reactions" on public.message_reactions;
create policy "Members read conversation reactions" on public.message_reactions for select to authenticated
using (private.is_company_member(company_id) and private.is_message_thread_member(thread_id, company_id));
drop policy if exists "Editors add own conversation reactions" on public.message_reactions;
create policy "Editors add own conversation reactions" on public.message_reactions for insert to authenticated
with check (user_id = (select auth.uid()) and private.is_company_operational_editor(company_id)
  and private.is_message_thread_member(thread_id, company_id)
  and exists (select 1 from public.messages m where m.id = message_id and m.deleted_at is null));
drop policy if exists "Editors toggle own conversation reactions" on public.message_reactions;
create policy "Editors toggle own conversation reactions" on public.message_reactions for update to authenticated
using (user_id = (select auth.uid()) and private.is_company_operational_editor(company_id)
  and private.is_message_thread_member(thread_id, company_id))
with check (user_id = (select auth.uid()) and private.is_company_operational_editor(company_id)
  and private.is_message_thread_member(thread_id, company_id));

-- Limit the definer operation to the caller's membership; no audience or record changes.
create or replace function public.set_my_message_preferences(target_thread_id uuid, archive boolean default null, mute boolean default null)
returns void language plpgsql security definer set search_path = public, private
as $$
declare target_company uuid;
begin
  if auth.uid() is null then raise exception 'Sign in required.'; end if;
  select company_id into target_company from public.message_thread_members
    where thread_id = target_thread_id and user_id = auth.uid();
  if not found or not private.is_company_operational_editor(target_company) then
    raise exception 'Conversation is unavailable or read-only.';
  end if;
  update public.message_thread_members set
    archived_at = case when archive is true then clock_timestamp() when archive is false then null else archived_at end,
    deleted_at = case when archive is not null then null else deleted_at end,
    deleted_by = case when archive is not null then null else deleted_by end,
    muted = coalesce(mute, muted)
  where thread_id = target_thread_id and user_id = auth.uid() and company_id = target_company;
end;
$$;
revoke all on function public.set_my_message_preferences(uuid, boolean, boolean) from public, anon;
grant execute on function public.set_my_message_preferences(uuid, boolean, boolean) to authenticated;

create or replace function public.soft_delete_own_message(target_message_id uuid)
returns void language plpgsql security definer set search_path = public, private
as $$
begin
  if auth.uid() is null then raise exception 'Sign in required.'; end if;
  update public.messages set deleted_at = coalesce(deleted_at, now()), deleted_by = coalesce(deleted_by, auth.uid())
  where id = target_message_id and sender_id = auth.uid()
    and private.is_company_operational_editor(company_id)
    and private.is_message_thread_member(thread_id, company_id);
  if not found then raise exception 'Message is unavailable or read-only.'; end if;
end;
$$;
revoke all on function public.soft_delete_own_message(uuid) from public, anon;
grant execute on function public.soft_delete_own_message(uuid) to authenticated;

-- Old clients retain a working control, with the same recoverable archive contract.
create or replace function public.soft_delete_own_message_thread(target_thread_id uuid)
returns void language sql security invoker set search_path = public, private
as $$ select public.set_my_message_preferences(target_thread_id, true, null); $$;
revoke all on function public.soft_delete_own_message_thread(uuid) from public, anon;
grant execute on function public.soft_delete_own_message_thread(uuid) to authenticated;

-- No DELETE replication: reaction removal is a scoped UPDATE and messages are soft-deleted.
do $$ declare target text; begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    foreach target in array array['messages', 'message_thread_members', 'message_reactions'] loop
      if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = target) then
        execute format('alter publication supabase_realtime add table public.%I', target);
      end if;
    end loop;
  end if;
end $$;
notify pgrst, 'reload schema';
