alter table public.part_documents
add column if not exists file_size_bytes bigint,
add column if not exists original_file_name text,
add column if not exists original_size_bytes bigint;

create or replace function public.get_storage_dashboard(target_company_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, private, storage
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

    select
      o.bucket_id,
      o.name as object_path,
      coalesce(nullif(mr.photo_file_name, ''), nullif(mr.photo_original_file_name, ''), o.name) as file_name,
      coalesce(mr.photo_file_size_bytes, nullif(o.metadata->>'size', '')::bigint, 0) as size_bytes,
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
  ),
  totals as (
    select
      coalesce(sum(size_bytes), 0)::bigint as total_bytes,
      count(*)::integer as file_count
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
      coalesce(sum(size_bytes), 0)::bigint as size_bytes
    from linked_objects
    where created_at >= date_trunc('month', now()) - interval '11 months'
    group by date_trunc('month', created_at)
  ),
  monthly_usage as (
    select
      ms.month_start,
      coalesce(mt.file_count, 0)::integer as file_count,
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

grant execute on function public.get_storage_dashboard(uuid) to authenticated;

notify pgrst, 'reload schema';
