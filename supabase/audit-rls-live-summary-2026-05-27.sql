-- MaintainOps live RLS summary - read only.
-- Single result grid for Supabase SQL Editor.

with app_tables(table_name) as (
  values
    ('companies'), ('company_members'), ('locations'), ('profiles'), ('assets'),
    ('work_orders'), ('work_order_comments'), ('work_order_photos'),
    ('preventive_schedules'), ('parts'), ('work_order_parts'), ('part_documents'),
    ('work_order_events'), ('maintenance_requests'), ('procedure_templates'),
    ('procedure_steps'), ('work_order_step_results'), ('message_threads'),
    ('message_thread_members'), ('messages'), ('message_reads'), ('company_invites'),
    ('public_request_links'), ('app_issue_reports')
),
allowed_anon(function_name) as (
  values
    ('get_public_request_intake'),
    ('submit_public_location_request'),
    ('attach_maintenance_request_photo')
),
rls_disabled as (
  select a.table_name
  from app_tables a
  left join pg_class c on c.relname = a.table_name
  left join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
  where c.oid is null or not c.relrowsecurity
),
no_policy as (
  select a.table_name
  from app_tables a
  left join pg_policies p on p.schemaname = 'public' and p.tablename = a.table_name
  group by a.table_name
  having count(p.policyname) = 0
),
anon_table_grants as (
  select table_name || ':' || privilege_type as grant_name
  from information_schema.role_table_grants
  where table_schema = 'public'
    and table_name in (select table_name from app_tables)
    and grantee = 'anon'
),
unexpected_anon_functions as (
  select p.oid::regprocedure::text as function_signature
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public'
    and has_function_privilege('anon', p.oid, 'EXECUTE')
    and p.proname not in (select function_name from allowed_anon)
),
public_rpc_missing_anon as (
  select a.function_name
  from allowed_anon a
  where not exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = a.function_name
      and has_function_privilege('anon', p.oid, 'EXECUTE')
  )
),
security_definer_without_search_path as (
  select p.oid::regprocedure::text as function_signature
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public'
    and p.prosecdef
    and not exists (
      select 1
      from unnest(coalesce(p.proconfig, array[]::text[])) cfg
      where cfg like 'search_path=%'
    )
),
public_buckets as (
  select id
  from storage.buckets
  where public
),
storage_policy_count as (
  select count(*) as count
  from pg_policies
  where schemaname = 'storage'
),
qa_location as (
  select count(l.id) as count
  from public.companies c
  left join public.locations l on l.company_id = c.id
  where c.id = 'f599e431-45c3-4f93-b1a9-6c29e009b1b3'
),
findings as (
select
  'rls_enabled_all_app_tables' as check_name,
  case when exists (select 1 from rls_disabled) then 'FAIL' else 'PASS' end as status,
  coalesce((select string_agg(table_name, ', ' order by table_name) from rls_disabled), 'all app tables have RLS enabled') as details
union all
select
  'policy_exists_all_app_tables',
  case when exists (select 1 from no_policy) then 'REVIEW' else 'PASS' end,
  coalesce((select string_agg(table_name, ', ' order by table_name) from no_policy), 'all app tables have at least one policy')
union all
select
  'no_direct_anon_table_grants',
  case when exists (select 1 from anon_table_grants) then 'FAIL' else 'PASS' end,
  coalesce((select string_agg(grant_name, ', ' order by grant_name) from anon_table_grants), 'no direct anon table grants on app tables')
union all
select
  'no_unexpected_anon_rpc_execute',
  case when exists (select 1 from unexpected_anon_functions) then 'FAIL' else 'PASS' end,
  coalesce((select string_agg(function_signature, ', ' order by function_signature) from unexpected_anon_functions), 'only approved public QR/photo RPCs are anon-executable')
union all
select
  'public_rpc_anon_grants_present',
  case when exists (select 1 from public_rpc_missing_anon) then 'REVIEW' else 'PASS' end,
  coalesce((select string_agg(function_name, ', ' order by function_name) from public_rpc_missing_anon), 'approved public RPCs are anon-executable')
union all
select
  'security_definer_search_path_pinned',
  case when exists (select 1 from security_definer_without_search_path) then 'FAIL' else 'PASS' end,
  coalesce((select string_agg(function_signature, ', ' order by function_signature) from security_definer_without_search_path), 'security definer functions have explicit search_path')
union all
select
  'storage_buckets_private',
  case when exists (select 1 from public_buckets) then 'REVIEW' else 'PASS' end,
  coalesce((select string_agg(id, ', ' order by id) from public_buckets), 'all storage buckets are private')
union all
select
  'storage_policy_inventory_present',
  case when (select count from storage_policy_count) > 0 then 'PASS' else 'REVIEW' end,
  'storage policy count: ' || (select count::text from storage_policy_count)
union all
select
  'qa_facility_has_location_for_qr_rpc_denial',
  case when (select count from qa_location) > 0 then 'PASS' else 'REVIEW' end,
  'QA Test Facility location count: ' || (select count::text from qa_location)
)
select *
from findings
order by
  case status when 'FAIL' then 1 when 'REVIEW' then 2 else 3 end,
  check_name;
