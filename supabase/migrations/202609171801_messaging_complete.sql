-- Personal organization, indexed content search, discussions and private attachments.
alter table public.message_thread_members add column if not exists favorite boolean not null default false;
alter table public.message_thread_members add column if not exists section_name text check (length(section_name) <= 40);
alter table public.messages add column if not exists parent_message_id uuid;
alter table public.messages add column if not exists search_document tsvector
  generated always as (to_tsvector('simple'::regconfig, body)) stored;
create index if not exists messages_search_idx on public.messages using gin(search_document) where deleted_at is null;
create index if not exists messages_parent_idx on public.messages(parent_message_id, created_at, id) where parent_message_id is not null;
alter table public.messages add constraint messages_parent_same_thread_fk
  foreign key(parent_message_id,thread_id,company_id) references public.messages(id,thread_id,company_id);

create or replace function private.validate_message_parent()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.parent_message_id is not null and not exists (
    select 1 from public.messages p where p.id=new.parent_message_id and p.company_id=new.company_id
      and p.thread_id=new.thread_id and p.parent_message_id is null and p.deleted_at is null
  ) then raise exception 'Reply thread is unavailable.'; end if;
  return new;
end;
$$;
create trigger validate_message_parent before insert on public.messages for each row execute function private.validate_message_parent();

create or replace function public.search_company_messages(target_company uuid, search_text text,
  page_offset integer default 0, target_thread uuid default null, target_sender uuid default null, since_date timestamptz default null)
returns table(id uuid,thread_id uuid,sender_id uuid,body text,created_at timestamptz,parent_message_id uuid,title text)
language sql stable security invoker set search_path = '' as $$
  select m.id,m.thread_id,m.sender_id,left(m.body,500),m.created_at,m.parent_message_id,t.title
  from public.messages m join public.message_threads t on t.id=m.thread_id and t.company_id=m.company_id
  where m.company_id=target_company and m.deleted_at is null and length(trim(search_text)) between 1 and 300
    and m.search_document @@ websearch_to_tsquery('simple'::regconfig,search_text)
    and (target_thread is null or m.thread_id=target_thread)
    and (target_sender is null or m.sender_id=target_sender)
    and (since_date is null or m.created_at>=since_date)
  order by m.created_at desc,m.id desc limit 13 offset greatest(page_offset,0);
$$;
revoke all on function public.search_company_messages(uuid,text,integer,uuid,uuid,timestamptz) from public,anon;
grant execute on function public.search_company_messages(uuid,text,integer,uuid,uuid,timestamptz) to authenticated;

create or replace function public.organize_my_conversation(target_thread uuid, is_favorite boolean, section_label text)
returns void language plpgsql security definer set search_path = public, private as $$
declare company uuid;
begin
  select company_id into company from public.message_thread_members where thread_id=target_thread and user_id=auth.uid();
  if auth.uid() is null or company is null or not private.is_company_operational_editor(company) then raise exception 'Conversation is unavailable or read-only.'; end if;
  if length(trim(section_label))>40 then raise exception 'Section names are limited to 40 characters.'; end if;
  update public.message_thread_members set favorite=coalesce(is_favorite,favorite),
    section_name=case when is_favorite is null then nullif(trim(section_label),'') else section_name end
    where thread_id=target_thread and user_id=auth.uid() and company_id=company;
end;
$$;
revoke all on function public.organize_my_conversation(uuid,boolean,text) from public,anon;
grant execute on function public.organize_my_conversation(uuid,boolean,text) to authenticated;

create table public.message_files (
  id uuid primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  message_id uuid,
  draft_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null check(length(file_name) between 1 and 180),
  content_type text not null check(content_type in ('image/jpeg','image/png','image/webp','application/pdf','text/plain','text/csv','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav')),
  byte_size bigint not null check(byte_size between 1 and 26214400),
  object_path text not null unique,
  created_at timestamptz not null default now(),
  foreign key(message_id,thread_id,company_id) references public.messages(id,thread_id,company_id) on delete cascade,
  check(object_path=company_id::text||'/'||thread_id::text||'/'||user_id::text||'/'||id::text),
  check(content_type not like 'image/%' or byte_size<=5242880)
);
create index message_files_message_idx on public.message_files(message_id);
create index message_files_thread_idx on public.message_files(thread_id,company_id);
create index message_files_pending_idx on public.message_files(user_id,created_at) where message_id is null;
alter table public.message_files enable row level security;
revoke all on public.message_files from public,anon,authenticated;
grant select,insert,delete on public.message_files to authenticated;
create policy "Participants read sent files or own pending uploads" on public.message_files for select to authenticated
using (private.is_company_member(company_id) and private.is_message_thread_member(thread_id,company_id)
  and ((message_id is null and user_id=auth.uid()) or exists(select 1 from public.messages m where m.id=message_id and m.deleted_at is null)));
create policy "Editors reserve own pending files" on public.message_files for insert to authenticated
with check (user_id=auth.uid() and message_id is null and private.is_company_operational_editor(company_id)
  and private.is_message_thread_member(thread_id,company_id)
  and exists(select 1 from public.message_threads t where t.id=message_files.thread_id and t.company_id=message_files.company_id));
create policy "Owners remove pending file reservations" on public.message_files for delete to authenticated
using (user_id=auth.uid() and message_id is null and private.is_company_operational_editor(company_id)
  and private.is_message_thread_member(thread_id,company_id));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('message-files','message-files',false,26214400,array['image/jpeg','image/png','image/webp','application/pdf','text/plain','text/csv','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

create or replace function private.can_access_message_file(file_path text, writing boolean default false)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists(select 1 from public.message_files f where f.object_path=file_path
    and private.is_company_member(f.company_id) and private.is_message_thread_member(f.thread_id,f.company_id)
    and case when writing then f.user_id=auth.uid() and f.message_id is null and private.is_company_operational_editor(f.company_id)
      else (f.message_id is null and f.user_id=auth.uid()) or exists(select 1 from public.messages m where m.id=f.message_id and m.deleted_at is null) end);
$$;
revoke all on function private.can_access_message_file(text,boolean) from public,anon;
grant execute on function private.can_access_message_file(text,boolean) to authenticated;
create policy "Conversation file download" on storage.objects for select to authenticated
using (bucket_id='message-files' and private.can_access_message_file(name,false));
create policy "Conversation file upload" on storage.objects for insert to authenticated
with check (bucket_id='message-files' and private.can_access_message_file(name,true));
create policy "Conversation pending file cleanup" on storage.objects for delete to authenticated
using (bucket_id='message-files' and private.can_access_message_file(name,true));

-- Authors may remove blobs after deleting their own message; other participants cannot.
create or replace function private.can_remove_deleted_message_file(file_path text)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists(select 1 from public.message_files f join public.messages m on m.id=f.message_id
    where f.object_path=file_path and f.user_id=auth.uid() and m.sender_id=auth.uid() and m.deleted_at is not null
      and private.is_company_operational_editor(f.company_id) and private.is_message_thread_member(f.thread_id,f.company_id));
$$;
revoke all on function private.can_remove_deleted_message_file(text) from public,anon;
grant execute on function private.can_remove_deleted_message_file(text) to authenticated;
create policy "Deleted own message file cleanup" on storage.objects for delete to authenticated
using (bucket_id='message-files' and private.can_remove_deleted_message_file(name));
-- Storage's delete endpoint also requires SELECT. Only the original author retains this access.
create policy "Deleted own message file cleanup lookup" on storage.objects for select to authenticated
using (bucket_id='message-files' and private.can_remove_deleted_message_file(name));

-- Commit file membership and the message atomically after Storage confirms the objects.
create or replace function public.send_message_with_files(message_key uuid,target_thread uuid,message_body text,
  upload_ids uuid[],quote_id uuid default null,parent_id uuid default null)
returns uuid language plpgsql security definer set search_path = public, private as $$
declare company uuid; existing public.messages; expected integer; valid integer;
begin
  select company_id into company from public.message_threads where id=target_thread;
  if auth.uid() is null or company is null or not private.is_company_operational_editor(company)
    or not private.is_message_thread_member(target_thread,company) then raise exception 'Conversation is unavailable or read-only.'; end if;
  if length(message_body)>12000 then raise exception 'Message is too long.'; end if;
  select * into existing from public.messages where id=message_key;
  if found then
    if existing.sender_id<>auth.uid() or existing.thread_id<>target_thread or existing.company_id<>company
      or existing.body<>message_body or existing.reply_to_id is distinct from quote_id or existing.parent_message_id is distinct from parent_id then
      raise exception 'Message retry does not match the saved message.';
    end if;
    return message_key;
  end if;
  expected:=coalesce(cardinality(upload_ids),0);
  if expected=0 or expected>20 or expected<>(select count(distinct x) from unnest(upload_ids) x) then raise exception 'Choose between 1 and 20 files.'; end if;
  perform 1 from public.message_files where id=any(upload_ids) for update;
  select count(*) into valid from public.message_files f join storage.objects o on o.bucket_id='message-files' and o.name=f.object_path
    where f.id=any(upload_ids) and f.message_id is null and f.draft_id=message_key and f.user_id=auth.uid()
      and f.company_id=company and f.thread_id=target_thread
      and coalesce(o.metadata->>'size','0')::bigint=f.byte_size and o.metadata->>'mimetype'=f.content_type;
  if valid<>expected then raise exception 'Files are not fully uploaded. Retry this message.'; end if;
  insert into public.messages(id,company_id,thread_id,sender_id,body,reply_to_id,parent_message_id)
    values(message_key,company,target_thread,auth.uid(),message_body,quote_id,parent_id);
  update public.message_files set message_id=message_key where id=any(upload_ids) and user_id=auth.uid();
  update public.message_threads set updated_at=now() where id=target_thread;
  return message_key;
end;
$$;
revoke all on function public.send_message_with_files(uuid,uuid,text,uuid[],uuid,uuid) from public,anon;
grant execute on function public.send_message_with_files(uuid,uuid,text,uuid[],uuid,uuid) to authenticated;
notify pgrst, 'reload schema';
