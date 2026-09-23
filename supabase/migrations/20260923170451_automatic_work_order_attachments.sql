-- Documents are separate from photo records: existing photo limits and URLs do not change.
create table if not exists public.work_order_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  uploaded_by uuid not null,
  storage_path text not null unique,
  file_name text not null check (length(file_name) between 1 and 240),
  content_type text not null check (content_type in ('application/pdf', 'text/plain', 'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip')),
  file_size_bytes bigint not null check (file_size_bytes between 1 and 26214400),
  original_file_name text,
  original_size_bytes bigint,
  created_at timestamptz not null default now(),
  foreign key (company_id, uploaded_by) references public.profiles(company_id, user_id),
  check (split_part(storage_path, '/', 1) = company_id::text and split_part(storage_path, '/', 2) = work_order_id::text and split_part(storage_path, '/', 3) like id::text || '-%' and array_length(string_to_array(storage_path, '/'), 1) = 3)
);
create index if not exists work_order_documents_company_work_idx on public.work_order_documents(company_id, work_order_id, created_at, id);
create index if not exists work_order_documents_work_idx on public.work_order_documents(work_order_id);
create index if not exists work_order_documents_uploader_idx on public.work_order_documents(company_id, uploaded_by);
alter table public.work_order_documents enable row level security;
-- QA DELTA BEGIN document integrity and grants
alter table public.work_order_documents drop constraint if exists work_order_documents_safe_path;
alter table public.work_order_documents add constraint work_order_documents_safe_path check (
  file_name ~ '^[A-Za-z0-9._-]{1,240}$' and file_name not in ('.', '..')
  and storage_path = company_id::text || '/' || work_order_id::text || '/' || id::text || '-' || file_name
);
revoke all on public.work_order_documents from public, anon, authenticated;
grant select, delete on public.work_order_documents to authenticated;
grant insert (id, company_id, work_order_id, uploaded_by, storage_path, file_name,
  content_type, file_size_bytes, original_file_name, original_size_bytes)
on public.work_order_documents to authenticated;
-- QA DELTA END document integrity and grants

create policy "Members read work order documents" on public.work_order_documents for select to authenticated
using (private.is_company_member(company_id));
-- QA DELTA BEGIN document storage binding
drop policy if exists "Editors attach work order documents" on public.work_order_documents;
create policy "Editors attach work order documents" on public.work_order_documents for insert to authenticated
with check (uploaded_by = (select auth.uid()) and private.is_company_operational_editor(company_id)
  and exists (select 1 from public.work_orders w where w.id = work_order_id and w.company_id = work_order_documents.company_id)
  and exists (select 1 from storage.objects o where o.bucket_id = 'work-order-documents' and o.name = storage_path
    and o.owner_id = (select auth.uid())::text
    and o.metadata->>'size' = file_size_bytes::text
    and o.metadata->>'mimetype' = content_type));
-- QA DELTA END document storage binding
create policy "Owners and managers remove work order documents" on public.work_order_documents for delete to authenticated
using (private.is_company_operational_editor(company_id) and (uploaded_by = (select auth.uid()) or exists (
  select 1 from public.company_members m where m.company_id = work_order_documents.company_id and m.user_id = (select auth.uid()) and m.role in ('admin','manager'))));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('work-order-documents', 'work-order-documents', false, 26214400, array['application/pdf','text/plain','text/csv','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/zip'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
update storage.buckets set allowed_mime_types = array_append(allowed_mime_types, 'application/zip')
where id in ('asset-documents','part-documents') and not ('application/zip' = any(allowed_mime_types));

-- QA DELTA BEGIN storage boundaries
-- Restrictive guards apply even if another permissive storage policy matches.
-- Other buckets keep their existing policies, including all legacy photo rules.
drop policy if exists "Work document object access" on storage.objects;
create policy "Work document object access" on storage.objects for all to authenticated
using (bucket_id = 'work-order-documents') with check (bucket_id = 'work-order-documents');
drop policy if exists "Members read work document objects" on storage.objects;
create policy "Members read work document objects" on storage.objects as restrictive for select to authenticated
using (bucket_id <> 'work-order-documents' or exists (select 1 from public.company_members m
  where m.company_id::text = split_part(name,'/',1) and m.user_id = (select auth.uid())));
drop policy if exists "Editors upload work document objects" on storage.objects;
create policy "Editors upload work document objects" on storage.objects as restrictive for insert to authenticated
with check (bucket_id <> 'work-order-documents' or (
  owner_id = (select auth.uid())::text
  and array_length(string_to_array(name, '/'), 1) = 3
  and split_part(name, '/', 3) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-[A-Za-z0-9._-]{1,240}$'
  and substring(split_part(name, '/', 3) from 38) not in ('.', '..')
  and exists (select 1 from public.work_orders w
    where w.company_id::text = split_part(name,'/',1) and w.id::text = split_part(name,'/',2)
    and private.is_company_operational_editor(w.company_id))
  and not exists (select 1 from public.work_order_documents d where d.storage_path = name)
));
drop policy if exists "Owners and managers remove work document objects" on storage.objects;
create policy "Owners and managers remove work document objects" on storage.objects as restrictive for delete to authenticated
using (bucket_id <> 'work-order-documents' or exists (select 1 from public.company_members m
  where m.company_id::text = split_part(name,'/',1) and m.user_id = (select auth.uid())
  and private.is_company_operational_editor(m.company_id) and (owner_id = (select auth.uid())::text or m.role in ('admin','manager'))));
drop policy if exists "Work document objects are immutable" on storage.objects;
create policy "Work document objects are immutable" on storage.objects as restrictive for update to authenticated
using (bucket_id <> 'work-order-documents') with check (bucket_id <> 'work-order-documents');
-- QA DELTA END storage boundaries

create or replace function private.record_work_document_event()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare row_value public.work_order_documents;
begin
  row_value := case when tg_op = 'DELETE' then old else new end;
  -- Skip a cascading work-order/company deletion, where the parent history also goes away.
  if exists (select 1 from public.work_orders w where w.id = row_value.work_order_id and w.company_id = row_value.company_id) then
    insert into public.work_order_events(company_id,work_order_id,actor_id,event_type,summary)
    values(row_value.company_id,row_value.work_order_id,auth.uid(),
      case when tg_op = 'DELETE' then 'file_deleted' else 'file_uploaded' end,
      case when tg_op = 'DELETE' then 'File deleted: ' else 'File uploaded: ' end || row_value.file_name || '.');
  end if;
  return row_value;
end;
$$;
revoke all on function private.record_work_document_event() from public, anon, authenticated;
create trigger record_work_document_event after insert or delete on public.work_order_documents for each row execute function private.record_work_document_event();

notify pgrst, 'reload schema';

-- QA DELTA BEGIN dashboard
create or replace function public.get_storage_dashboard(target_company_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowance_bytes constant bigint := 107374182400;
  result jsonb;
begin
  if auth.uid() is null or not exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only company admins and managers can view storage usage.';
  end if;

  with linked_objects as (
    select
      o.bucket_id,
      o.name as object_path,
      coalesce(nullif(wop.file_name, ''), nullif(wop.original_file_name, ''), o.name) as file_name,
      coalesce(wop.file_size_bytes, nullif(o.metadata->>'size', '')::bigint, 0) as size_bytes,
      coalesce(nullif(wop.content_type, ''), nullif(o.metadata->>'mimetype', ''), 'image/jpeg') as content_type,
      o.created_at,
      'work_order'::text as record_type,
      wop.id as file_record_id,
      wo.id as linked_record_id,
      coalesce(nullif(wo.title, ''), 'Work order') as linked_record_label,
      'work'::text as link_section
    from storage.objects o
    join public.work_order_photos wop
      on wop.storage_path = o.name
     and wop.company_id = target_company_id
    join public.work_orders wo
      on wo.id = wop.work_order_id
     and wo.company_id = wop.company_id
    where o.bucket_id = 'work-order-photos'

    union all
    select o.bucket_id, o.name, d.file_name,
      coalesce(nullif(o.metadata->>'size', '')::bigint, d.file_size_bytes, 0),
      coalesce(nullif(o.metadata->>'mimetype', ''), d.content_type),
      o.created_at, 'work_order_document'::text, d.id, w.id,
      coalesce(nullif(w.title, ''), 'Work order'), 'work'::text
    from storage.objects o
    join public.work_order_documents d on d.storage_path = o.name and d.company_id = target_company_id
    join public.work_orders w on w.id = d.work_order_id and w.company_id = d.company_id
    where o.bucket_id = 'work-order-documents'

    union all

    select
      o.bucket_id,
      o.name as object_path,
      coalesce(nullif(mr.photo_file_name, ''), nullif(mr.photo_original_file_name, ''), o.name) as file_name,
      coalesce(mr.photo_file_size_bytes, nullif(o.metadata->>'size', '')::bigint, 0) as size_bytes,
      coalesce(nullif(mr.photo_content_type, ''), nullif(o.metadata->>'mimetype', ''), 'image/jpeg') as content_type,
      o.created_at,
      'request'::text as record_type,
      mr.id as file_record_id,
      mr.id as linked_record_id,
      coalesce(nullif(mr.title, ''), 'Maintenance request') as linked_record_label,
      'requests'::text as link_section
    from storage.objects o
    join public.maintenance_requests mr
      on mr.photo_storage_path = o.name
     and mr.company_id = target_company_id
    where o.bucket_id = 'maintenance-request-photos'

    union all

    select
      o.bucket_id,
      o.name as object_path,
      coalesce(nullif(ad.file_name, ''), nullif(ad.original_file_name, ''), o.name) as file_name,
      coalesce(ad.file_size_bytes, nullif(o.metadata->>'size', '')::bigint, 0) as size_bytes,
      coalesce(nullif(ad.content_type, ''), nullif(o.metadata->>'mimetype', ''), 'application/octet-stream') as content_type,
      o.created_at,
      'equipment'::text as record_type,
      ad.id as file_record_id,
      a.id as linked_record_id,
      coalesce(nullif(a.name, ''), 'Equipment') as linked_record_label,
      'assets'::text as link_section
    from storage.objects o
    join public.asset_documents ad
      on ad.storage_path = o.name
     and ad.company_id = target_company_id
    join public.assets a
      on a.id = ad.asset_id
     and a.company_id = ad.company_id
    where o.bucket_id = 'asset-documents'

    union all

    select
      o.bucket_id,
      o.name as object_path,
      coalesce(nullif(pd.file_name, ''), nullif(pd.original_file_name, ''), o.name) as file_name,
      coalesce(pd.file_size_bytes, nullif(o.metadata->>'size', '')::bigint, 0) as size_bytes,
      coalesce(nullif(pd.content_type, ''), nullif(o.metadata->>'mimetype', ''), 'application/octet-stream') as content_type,
      o.created_at,
      'part'::text as record_type,
      pd.id as file_record_id,
      p.id as linked_record_id,
      coalesce(nullif(p.name, ''), 'Part') as linked_record_label,
      'parts'::text as link_section
    from storage.objects o
    join public.part_documents pd
      on pd.storage_path = o.name
     and pd.company_id = target_company_id
    join public.parts p
      on p.id = pd.part_id
     and p.company_id = pd.company_id
    where o.bucket_id = 'part-documents'

    union all

    select
      o.bucket_id,
      o.name as object_path,
      o.name as file_name,
      coalesce(nullif(o.metadata->>'size', '')::bigint, 0) as size_bytes,
      coalesce(nullif(o.metadata->>'mimetype', ''), 'image/png') as content_type,
      o.created_at,
      'company'::text as record_type,
      c.id as file_record_id,
      c.id as linked_record_id,
      coalesce(nullif(c.name, ''), 'Company logo') as linked_record_label,
      'settings'::text as link_section
    from storage.objects o
    join public.companies c
      on c.logo_path = o.name
     and c.id = target_company_id
    where o.bucket_id = 'company-logos'

    union all
    select o.bucket_id,
      case when m.id is not null and m.deleted_at is null and private.is_message_thread_member(f.thread_id,target_company_id) then o.name else '' end,
      case when m.id is not null and m.deleted_at is null and private.is_message_thread_member(f.thread_id,target_company_id) then f.file_name else 'Private message attachment' end,
      coalesce(nullif(o.metadata->>'size','')::bigint,f.byte_size,0), f.content_type, o.created_at, 'message'::text,
      case when m.id is not null and m.deleted_at is null and private.is_message_thread_member(f.thread_id,target_company_id) then f.id else null end,
      case when m.id is not null and m.deleted_at is null and private.is_message_thread_member(f.thread_id,target_company_id) then f.thread_id else null end,
      case when m.id is not null and m.deleted_at is null and private.is_message_thread_member(f.thread_id,target_company_id) then t.title else 'Private conversation' end,
      'messages'::text
    from storage.objects o
    join public.message_files f on f.object_path=o.name and f.company_id=target_company_id
    join public.message_threads t on t.id=f.thread_id and t.company_id=f.company_id
    left join public.messages m on m.id=f.message_id
    where o.bucket_id='message-files'
  ),
  totals as (
    select
      coalesce(sum(size_bytes), 0)::bigint as total_bytes,
      count(*)::integer as file_count,
      count(*) filter (
        where record_type in ('work_order', 'request')
           or (record_type in ('equipment', 'part', 'message') and content_type ilike 'image/%')
      )::integer as photo_count
    from linked_objects
  ),
  bucket_totals as (
    select
      bucket_id,
      count(*)::integer as file_count,
      coalesce(sum(size_bytes), 0)::bigint as size_bytes
    from linked_objects
    group by bucket_id
  ),
  month_series as (
    select generate_series(
      date_trunc('month', now()) - interval '11 months',
      date_trunc('month', now()),
      interval '1 month'
    ) as month_start
  ),
  monthly_totals as (
    select
      date_trunc('month', created_at) as month_start,
      count(*)::integer as file_count,
      count(*) filter (
        where record_type in ('work_order', 'request')
           or (record_type in ('equipment', 'part', 'message') and content_type ilike 'image/%')
      )::integer as photo_count,
      coalesce(sum(size_bytes), 0)::bigint as size_bytes
    from linked_objects
    where created_at >= date_trunc('month', now()) - interval '11 months'
    group by date_trunc('month', created_at)
  ),
  monthly_usage as (
    select
      ms.month_start,
      coalesce(mt.file_count, 0)::integer as file_count,
      coalesce(mt.photo_count, 0)::integer as photo_count,
      coalesce(mt.size_bytes, 0)::bigint as size_bytes,
      (
        select coalesce(sum(lo.size_bytes), 0)::bigint
        from linked_objects lo
        where lo.created_at < ms.month_start + interval '1 month'
      ) as cumulative_bytes,
      greatest(allowance_bytes - (
        select coalesce(sum(lo.size_bytes), 0)::bigint
        from linked_objects lo
        where lo.created_at < ms.month_start + interval '1 month'
      ), 0)::bigint as remaining_bytes
    from month_series ms
    left join monthly_totals mt on mt.month_start = ms.month_start
  ),
  bucket_json as (
    select coalesce(jsonb_agg(
      jsonb_build_object(
        'bucket_id', bucket_id,
        'file_count', file_count,
        'size_bytes', size_bytes
      )
      order by size_bytes desc, bucket_id
    ), '[]'::jsonb) as rows
    from bucket_totals
  ),
  monthly_json as (
    select coalesce(jsonb_agg(
      jsonb_build_object(
        'month', to_char(month_start, 'YYYY-MM'),
        'month_label', to_char(month_start, 'Mon YYYY'),
        'file_count', file_count,
        'photo_count', photo_count,
        'size_bytes', size_bytes,
        'cumulative_bytes', cumulative_bytes,
        'remaining_bytes', remaining_bytes
      )
      order by month_start
    ), '[]'::jsonb) as rows
    from monthly_usage
  ),
  top_json as (
    select coalesce(jsonb_agg(
      jsonb_build_object(
        'bucket_id', bucket_id,
        'object_path', object_path,
        'file_name', file_name,
        'size_bytes', size_bytes,
        'created_at', created_at,
        'content_type', content_type,
        'record_type', record_type,
        'file_record_id', file_record_id,
        'linked_record_id', linked_record_id,
        'linked_record_label', linked_record_label,
        'link_section', link_section
      )
      order by size_bytes desc, created_at desc
    ), '[]'::jsonb) as rows
    from (
      select *
      from linked_objects
      order by size_bytes desc, created_at desc
      limit 10
    ) ranked
  )
  select jsonb_build_object(
    'allowance_bytes', allowance_bytes,
    'total_bytes', totals.total_bytes,
    'remaining_bytes', greatest(allowance_bytes - totals.total_bytes, 0),
    'usage_percent', case when allowance_bytes > 0 then round((totals.total_bytes::numeric / allowance_bytes::numeric) * 100, 3) else 0 end,
    'file_count', totals.file_count,
    'photo_count', totals.photo_count,
    'bucket_totals', bucket_json.rows,
    'monthly_usage', monthly_json.rows,
    'top_files', top_json.rows,
    'generated_at', now()
  )
  into result
  from totals, bucket_json, monthly_json, top_json;

  return result;
end;
$$;

revoke all on function public.get_storage_dashboard(uuid) from public, anon;
grant execute on function public.get_storage_dashboard(uuid) to authenticated;
-- QA DELTA END dashboard

notify pgrst, 'reload schema';
