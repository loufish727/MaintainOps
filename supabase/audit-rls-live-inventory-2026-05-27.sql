-- MaintainOps live RLS inventory - read only.
-- Run in Supabase SQL Editor. This does not mutate data, grants, policies, or functions.

with app_tables(table_name) as (
  values
    ('companies'),
    ('company_members'),
    ('locations'),
    ('profiles'),
    ('assets'),
    ('work_orders'),
    ('work_order_comments'),
    ('work_order_photos'),
    ('preventive_schedules'),
    ('parts'),
    ('work_order_parts'),
    ('part_documents'),
    ('work_order_events'),
    ('maintenance_requests'),
    ('procedure_templates'),
    ('procedure_steps'),
    ('work_order_step_results'),
    ('message_threads'),
    ('message_thread_members'),
    ('messages'),
    ('message_reads'),
    ('company_invites'),
    ('public_request_links'),
    ('app_issue_reports')
)
select
  'TABLE_RLS' as audit_section,
  a.table_name,
  coalesce(c.relrowsecurity, false) as rls_enabled,
  coalesce(c.relforcerowsecurity, false) as force_rls,
  case
    when c.oid is null then 'MISSING_TABLE'
    when c.relrowsecurity then 'PASS'
    else 'FAIL_RLS_DISABLED'
  end as verdict
from app_tables a
left join pg_class c
  on c.relname = a.table_name
left join pg_namespace n
  on n.oid = c.relnamespace
  and n.nspname = 'public'
order by a.table_name;

with app_tables(table_name) as (
  values
    ('companies'), ('company_members'), ('locations'), ('profiles'), ('assets'),
    ('work_orders'), ('work_order_comments'), ('work_order_photos'),
    ('preventive_schedules'), ('parts'), ('work_order_parts'), ('part_documents'),
    ('work_order_events'), ('maintenance_requests'), ('procedure_templates'),
    ('procedure_steps'), ('work_order_step_results'), ('message_threads'),
    ('message_thread_members'), ('messages'), ('message_reads'), ('company_invites'),
    ('public_request_links'), ('app_issue_reports')
)
select
  'POLICY_SUMMARY' as audit_section,
  a.table_name,
  count(p.policyname) as policy_count,
  array_agg(distinct p.cmd order by p.cmd) filter (where p.policyname is not null) as policy_ops,
  case when count(p.policyname) > 0 then 'PASS' else 'REVIEW_NO_POLICY' end as verdict
from app_tables a
left join pg_policies p
  on p.schemaname = 'public'
  and p.tablename = a.table_name
group by a.table_name
order by a.table_name;

select
  'POLICY_DETAIL' as audit_section,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

with app_tables(table_name) as (
  values
    ('companies'), ('company_members'), ('locations'), ('profiles'), ('assets'),
    ('work_orders'), ('work_order_comments'), ('work_order_photos'),
    ('preventive_schedules'), ('parts'), ('work_order_parts'), ('part_documents'),
    ('work_order_events'), ('maintenance_requests'), ('procedure_templates'),
    ('procedure_steps'), ('work_order_step_results'), ('message_threads'),
    ('message_thread_members'), ('messages'), ('message_reads'), ('company_invites'),
    ('public_request_links'), ('app_issue_reports')
)
select
  'ANON_TABLE_GRANTS' as audit_section,
  table_schema,
  table_name,
  privilege_type,
  grantee,
  'FAIL_DIRECT_ANON_TABLE_GRANT' as verdict
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in (select table_name from app_tables)
  and grantee = 'anon'
order by table_name, privilege_type;

with app_tables(table_name) as (
  values
    ('companies'), ('company_members'), ('locations'), ('profiles'), ('assets'),
    ('work_orders'), ('work_order_comments'), ('work_order_photos'),
    ('preventive_schedules'), ('parts'), ('work_order_parts'), ('part_documents'),
    ('work_order_events'), ('maintenance_requests'), ('procedure_templates'),
    ('procedure_steps'), ('work_order_step_results'), ('message_threads'),
    ('message_thread_members'), ('messages'), ('message_reads'), ('company_invites'),
    ('public_request_links'), ('app_issue_reports')
)
select
  'TABLE_GRANTS' as audit_section,
  table_schema,
  table_name,
  grantee,
  array_agg(privilege_type order by privilege_type) as privileges
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in (select table_name from app_tables)
  and grantee in ('anon', 'authenticated', 'service_role')
group by table_schema, table_name, grantee
order by table_name, grantee;

with allowed_anon(function_name) as (
  values
    ('get_public_request_intake'),
    ('submit_public_location_request'),
    ('attach_maintenance_request_photo')
),
public_functions as (
  select
    n.nspname as schema_name,
    p.proname as function_name,
    p.oid,
    pg_get_function_identity_arguments(p.oid) as identity_args,
    p.prosecdef as security_definer,
    p.proconfig,
    has_function_privilege('anon', p.oid, 'EXECUTE') as anon_can_execute,
    has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_can_execute,
    has_function_privilege('service_role', p.oid, 'EXECUTE') as service_role_can_execute
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public'
)
select
  'FUNCTION_EXECUTE' as audit_section,
  schema_name,
  function_name,
  identity_args,
  security_definer,
  coalesce(array_to_string(proconfig, ', '), '') as function_config,
  anon_can_execute,
  authenticated_can_execute,
  service_role_can_execute,
  case
    when anon_can_execute and function_name not in (select function_name from allowed_anon) then 'FAIL_UNEXPECTED_ANON_EXECUTE'
    when function_name in (select function_name from allowed_anon) and not anon_can_execute then 'REVIEW_PUBLIC_RPC_NOT_ANON'
    else 'PASS'
  end as verdict
from public_functions
order by verdict desc, function_name, identity_args;

select
  'STORAGE_BUCKETS' as audit_section,
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  case when public then 'REVIEW_PUBLIC_BUCKET' else 'PASS_PRIVATE_BUCKET' end as verdict
from storage.buckets
order by id;

select
  'STORAGE_POLICIES' as audit_section,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'storage'
order by tablename, policyname;

select
  'QA_FACILITY_LOCATION_STATUS' as audit_section,
  c.id as company_id,
  c.name as company_name,
  count(l.id) as location_count,
  array_agg(l.name order by l.name) filter (where l.id is not null) as location_names,
  case when count(l.id) > 0 then 'PASS_HAS_LOCATION' else 'NEEDS_QA_LOCATION_FOR_QR_RPC_DENIAL_TEST' end as verdict
from public.companies c
left join public.locations l on l.company_id = c.id
where c.id = 'f599e431-45c3-4f93-b1a9-6c29e009b1b3'
group by c.id, c.name;
