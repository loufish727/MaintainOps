-- MaintainOps audit log foundation.
-- Purpose: append-only backend audit trail for important company-scoped record changes.
-- First phase is backend capture only; UI/search can be added after the table is collecting data.

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  event_type text not null check (event_type in ('insert', 'update', 'delete')),
  table_name text not null,
  record_id uuid,
  record_label text,
  changed_fields text[] not null default '{}',
  old_data jsonb,
  new_data jsonb,
  source text not null default current_user,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_company_created_idx
on public.audit_log(company_id, created_at desc);

create index if not exists audit_log_company_table_created_idx
on public.audit_log(company_id, table_name, created_at desc);

create index if not exists audit_log_company_record_idx
on public.audit_log(company_id, table_name, record_id, created_at desc);

create index if not exists audit_log_actor_created_idx
on public.audit_log(company_id, actor_id, created_at desc);

alter table public.audit_log enable row level security;

revoke all on public.audit_log from anon;
revoke all on public.audit_log from authenticated;
grant select on public.audit_log to authenticated;

drop policy if exists "Admins can read audit log" on public.audit_log;
create policy "Admins can read audit log"
on public.audit_log for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = audit_log.company_id
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

drop policy if exists "No client audit log inserts" on public.audit_log;
create policy "No client audit log inserts"
on public.audit_log for insert
to authenticated
with check (false);

drop policy if exists "No client audit log updates" on public.audit_log;
create policy "No client audit log updates"
on public.audit_log for update
to authenticated
using (false)
with check (false);

drop policy if exists "No client audit log deletes" on public.audit_log;
create policy "No client audit log deletes"
on public.audit_log for delete
to authenticated
using (false);

create or replace function private.audit_row_change()
returns trigger
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  old_row jsonb;
  new_row jsonb;
  audit_company_id uuid;
  audit_record_id uuid;
  audit_record_label text;
  audit_changed_fields text[] := '{}';
begin
  if TG_OP in ('UPDATE', 'DELETE') then
    old_row := to_jsonb(OLD);
  end if;

  if TG_OP in ('INSERT', 'UPDATE') then
    new_row := to_jsonb(NEW);
  end if;

  audit_company_id := coalesce(
    nullif(new_row ->> 'company_id', '')::uuid,
    nullif(old_row ->> 'company_id', '')::uuid
  );

  if audit_company_id is null then
    raise warning 'Audit skipped for %.% because company_id was not available.', TG_TABLE_SCHEMA, TG_TABLE_NAME;
    return coalesce(NEW, OLD);
  end if;

  audit_record_id := coalesce(
    nullif(new_row ->> 'id', '')::uuid,
    nullif(old_row ->> 'id', '')::uuid
  );

  audit_record_label := coalesce(
    nullif(new_row ->> 'title', ''),
    nullif(new_row ->> 'name', ''),
    nullif(new_row ->> 'email', ''),
    nullif(new_row ->> 'description', ''),
    nullif(new_row ->> 'summary', ''),
    nullif(old_row ->> 'title', ''),
    nullif(old_row ->> 'name', ''),
    nullif(old_row ->> 'email', ''),
    nullif(old_row ->> 'description', ''),
    nullif(old_row ->> 'summary', '')
  );

  if TG_OP = 'UPDATE' then
    select coalesce(array_agg(key order by key), '{}')
    into audit_changed_fields
    from jsonb_object_keys(new_row) as fields(key)
    where key not in ('updated_at')
      and (old_row -> key) is distinct from (new_row -> key);

    if coalesce(array_length(audit_changed_fields, 1), 0) = 0 then
      return NEW;
    end if;
  elsif TG_OP = 'INSERT' then
    select coalesce(array_agg(key order by key), '{}')
    into audit_changed_fields
    from jsonb_object_keys(new_row) as fields(key);
  elsif TG_OP = 'DELETE' then
    select coalesce(array_agg(key order by key), '{}')
    into audit_changed_fields
    from jsonb_object_keys(old_row) as fields(key);
  end if;

  insert into public.audit_log (
    company_id,
    actor_id,
    event_type,
    table_name,
    record_id,
    record_label,
    changed_fields,
    old_data,
    new_data,
    source
  )
  values (
    audit_company_id,
    auth.uid(),
    lower(TG_OP),
    TG_TABLE_NAME,
    audit_record_id,
    audit_record_label,
    audit_changed_fields,
    old_row,
    new_row,
    current_user
  );

  return coalesce(NEW, OLD);
end;
$$;

create or replace procedure private.attach_audit_trigger(target_table regclass)
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  trigger_name text;
begin
  trigger_name := replace(target_table::text, '.', '_') || '_audit_log_trigger';
  execute format('drop trigger if exists %I on %s', trigger_name, target_table);
  execute format(
    'create trigger %I after insert or update or delete on %s for each row execute function private.audit_row_change()',
    trigger_name,
    target_table
  );
end;
$$;

call private.attach_audit_trigger('public.assets'::regclass);
call private.attach_audit_trigger('public.work_orders'::regclass);
call private.attach_audit_trigger('public.maintenance_requests'::regclass);
call private.attach_audit_trigger('public.parts'::regclass);
call private.attach_audit_trigger('public.work_order_parts'::regclass);
call private.attach_audit_trigger('public.preventive_schedules'::regclass);
call private.attach_audit_trigger('public.procedure_templates'::regclass);
call private.attach_audit_trigger('public.procedure_steps'::regclass);
call private.attach_audit_trigger('public.work_order_step_results'::regclass);
call private.attach_audit_trigger('public.part_documents'::regclass);
call private.attach_audit_trigger('public.asset_documents'::regclass);
call private.attach_audit_trigger('public.asset_parts'::regclass);
call private.attach_audit_trigger('public.company_members'::regclass);
call private.attach_audit_trigger('public.company_invites'::regclass);
call private.attach_audit_trigger('public.request_notification_recipients'::regclass);
call private.attach_audit_trigger('public.public_request_links'::regclass);
call private.attach_audit_trigger('public.app_issue_reports'::regclass);

notify pgrst, 'reload schema';
