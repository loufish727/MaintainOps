-- Add a Production role and a second, independently completable assignment lane
-- for production action items on work orders.

alter table public.company_members
drop constraint if exists company_members_role_check;

alter table public.company_members
add constraint company_members_role_check
check (role in ('admin', 'manager', 'accounting', 'production', 'technician', 'member'));

do $$
declare
  constraint_name text;
begin
  if to_regclass('public.company_invites') is null then return; end if;
  for constraint_name in
    select con.conname
    from pg_constraint con
    where con.conrelid = 'public.company_invites'::regclass
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ilike '%role%'
  loop
    execute format('alter table public.company_invites drop constraint %I', constraint_name);
  end loop;
  alter table public.company_invites
    add constraint company_invites_role_check
    check (role in ('admin', 'manager', 'accounting', 'production', 'technician'));
end $$;

create or replace function private.role_rank(role_name text)
returns integer
language sql
immutable
set search_path = public, private
as $$
  select case role_name
    when 'admin' then 4
    when 'manager' then 3
    when 'accounting' then 2
    when 'production' then 2
    when 'technician' then 2
    when 'member' then 1
    else 0
  end;
$$;

create or replace function private.is_company_operational_editor(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager', 'production', 'technician', 'member')
  );
$$;

create or replace function public.update_company_member_role(
  target_company_id uuid,
  target_user_id uuid,
  new_role text
)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  current_role text;
  admin_count integer;
begin
  if new_role not in ('admin', 'manager', 'accounting', 'production', 'technician') then
    raise exception 'Invalid role.';
  end if;

  select cm.role into current_role
  from public.company_members cm
  where cm.company_id = target_company_id
    and cm.user_id = auth.uid();

  if current_role <> 'admin' then
    raise exception 'Only admins can change team roles.';
  end if;
  if target_user_id = auth.uid() then
    raise exception 'You cannot change your own role here.';
  end if;
  if not exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = target_user_id
  ) then
    raise exception 'Team member not found.';
  end if;

  select count(*) into admin_count
  from public.company_members cm
  where cm.company_id = target_company_id
    and cm.role = 'admin';

  if admin_count <= 1 and exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = target_user_id
      and cm.role = 'admin'
  ) and new_role <> 'admin' then
    raise exception 'A company must keep at least one admin.';
  end if;

  update public.company_members
  set role = new_role
  where company_id = target_company_id
    and user_id = target_user_id;
end;
$$;

create or replace function public.create_company_invite(
  target_company_id uuid,
  invite_email text,
  invite_role text default 'technician',
  invite_default_location_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  new_invite_id uuid;
  normalized_email text;
  selected_role text;
  actor_role text;
begin
  normalized_email := lower(trim(invite_email));
  selected_role := coalesce(nullif(invite_role, ''), 'technician');

  if auth.uid() is null then raise exception 'Sign in before inviting teammates.'; end if;
  if normalized_email = '' or normalized_email not like '%@%' then raise exception 'Enter a valid email address.'; end if;
  if selected_role not in ('admin', 'manager', 'accounting', 'production', 'technician') then
    raise exception 'Invalid role.';
  end if;

  select cm.role into actor_role
  from public.company_members cm
  where cm.company_id = target_company_id
    and cm.user_id = auth.uid();

  if actor_role not in ('admin', 'manager') then
    raise exception 'Only admins or managers can invite teammates.';
  end if;
  if actor_role <> 'admin' and selected_role <> 'technician' then
    raise exception 'Only admins can invite managers, accounting, production, or admins.';
  end if;
  if invite_default_location_id is not null and not exists (
    select 1 from public.locations loc
    where loc.company_id = target_company_id
      and loc.id = invite_default_location_id
  ) then
    raise exception 'Default location does not belong to this company.';
  end if;

  insert into public.company_invites (company_id, email, role, invited_by, default_location_id)
  values (target_company_id, normalized_email, selected_role, auth.uid(), invite_default_location_id)
  on conflict (company_id, email) do update
  set role = excluded.role,
      invited_by = auth.uid(),
      default_location_id = excluded.default_location_id,
      accepted_by = null,
      accepted_at = null
  returning id into new_invite_id;

  return new_invite_id;
end;
$$;

revoke all on function public.update_company_member_role(uuid, uuid, text) from public, anon;
revoke all on function public.create_company_invite(uuid, text, text, uuid) from public, anon;
grant execute on function public.update_company_member_role(uuid, uuid, text) to authenticated, service_role;
grant execute on function public.create_company_invite(uuid, text, text, uuid) to authenticated, service_role;

alter table public.work_orders add column if not exists production_action text;
alter table public.work_orders add column if not exists production_action_assigned_to uuid;
alter table public.work_orders add column if not exists production_action_status text;
alter table public.work_orders add column if not exists production_action_created_by uuid;
alter table public.work_orders add column if not exists production_action_created_at timestamptz;
alter table public.work_orders add column if not exists production_action_completed_by uuid;
alter table public.work_orders add column if not exists production_action_completed_at timestamptz;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'work_orders_production_action_status_check') then
    alter table public.work_orders
      add constraint work_orders_production_action_status_check
      check (production_action_status in ('open', 'completed') or production_action_status is null)
      not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'work_orders_production_action_created_by_fkey') then
    alter table public.work_orders
      add constraint work_orders_production_action_created_by_fkey
      foreign key (production_action_created_by) references auth.users(id) on delete set null
      not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'work_orders_production_action_completed_by_fkey') then
    alter table public.work_orders
      add constraint work_orders_production_action_completed_by_fkey
      foreign key (production_action_completed_by) references auth.users(id) on delete set null
      not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'work_orders_company_production_action_assigned_profile_fkey') then
    alter table public.work_orders
      add constraint work_orders_company_production_action_assigned_profile_fkey
      foreign key (company_id, production_action_assigned_to)
      references public.profiles(company_id, user_id)
      on delete restrict
      not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'work_orders_production_action_consistency_check') then
    alter table public.work_orders
      add constraint work_orders_production_action_consistency_check
      check (
        (
          production_action is null
          and production_action_assigned_to is null
          and production_action_status is null
          and production_action_created_by is null
          and production_action_created_at is null
          and production_action_completed_by is null
          and production_action_completed_at is null
        )
        or
        (
          nullif(btrim(production_action), '') is not null
          and production_action_assigned_to is not null
          and production_action_status in ('open', 'completed')
          and production_action_created_at is not null
          and (
            (production_action_status = 'open' and production_action_completed_by is null and production_action_completed_at is null)
            or
            (production_action_status = 'completed' and production_action_completed_at is not null)
          )
        )
      ) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'work_orders_production_action_completion_check') then
    alter table public.work_orders
      add constraint work_orders_production_action_completion_check
      check (status <> 'completed' or production_action_status is distinct from 'open')
      not valid;
  end if;
end $$;

alter table public.work_orders validate constraint work_orders_production_action_status_check;
alter table public.work_orders validate constraint work_orders_production_action_created_by_fkey;
alter table public.work_orders validate constraint work_orders_production_action_completed_by_fkey;
alter table public.work_orders validate constraint work_orders_company_production_action_assigned_profile_fkey;
alter table public.work_orders validate constraint work_orders_production_action_consistency_check;
alter table public.work_orders validate constraint work_orders_production_action_completion_check;

create index if not exists work_orders_company_production_action_idx
on public.work_orders(company_id, production_action_assigned_to, production_action_status)
where production_action_assigned_to is not null;

create or replace function private.enforce_work_order_production_action()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  target_role text;
  normalized_action text;
  action_details_changed boolean := false;
  action_status_changed boolean := false;
  audit_fields_changed boolean := false;
begin
  normalized_action := nullif(btrim(new.production_action), '');

  if tg_op = 'INSERT' then
    if normalized_action is null then
      new.production_action := null;
      new.production_action_assigned_to := null;
      new.production_action_status := null;
      new.production_action_created_by := null;
      new.production_action_created_at := null;
      new.production_action_completed_by := null;
      new.production_action_completed_at := null;
      return new;
    end if;
    if not private.is_company_operational_editor(new.company_id) then
      raise exception 'Operational edit access is required to create a Production Action.';
    end if;
    select cm.role into target_role from public.company_members cm
    where cm.company_id = new.company_id and cm.user_id = new.production_action_assigned_to;
    if target_role is distinct from 'production' then
      raise exception 'Production Actions must be assigned to a Production user.';
    end if;
    if new.status = 'completed' then
      raise exception 'Complete or remove the open Production Action before completing this work order.';
    end if;
    new.production_action := normalized_action;
    new.production_action_status := 'open';
    new.production_action_created_by := auth.uid();
    new.production_action_created_at := now();
    new.production_action_completed_by := null;
    new.production_action_completed_at := null;
    return new;
  end if;

  action_details_changed := normalized_action is distinct from nullif(btrim(old.production_action), '')
    or new.production_action_assigned_to is distinct from old.production_action_assigned_to;
  action_status_changed := new.production_action_status is distinct from old.production_action_status;
  audit_fields_changed := new.production_action_created_by is distinct from old.production_action_created_by
    or new.production_action_created_at is distinct from old.production_action_created_at
    or new.production_action_completed_by is distinct from old.production_action_completed_by
    or new.production_action_completed_at is distinct from old.production_action_completed_at;
  select cm.role into actor_role from public.company_members cm
  where cm.company_id = new.company_id and cm.user_id = auth.uid();

  if normalized_action is null then
    if old.production_action is not null
      and actor_role not in ('admin', 'manager', 'production', 'technician', 'member') then
      raise exception 'Operational edit access is required to remove a Production Action.';
    end if;
    new.production_action := null;
    new.production_action_assigned_to := null;
    new.production_action_status := null;
    new.production_action_created_by := null;
    new.production_action_created_at := null;
    new.production_action_completed_by := null;
    new.production_action_completed_at := null;
    return new;
  end if;

  if old.production_action is null then
    if actor_role not in ('admin', 'manager', 'production', 'technician', 'member') then
      raise exception 'Operational edit access is required to create a Production Action.';
    end if;
    select cm.role into target_role from public.company_members cm
    where cm.company_id = new.company_id and cm.user_id = new.production_action_assigned_to;
    if target_role is distinct from 'production' then
      raise exception 'Production Actions must be assigned to a Production user.';
    end if;
    new.production_action := normalized_action;
    new.production_action_status := 'open';
    new.production_action_created_by := auth.uid();
    new.production_action_created_at := now();
    new.production_action_completed_by := null;
    new.production_action_completed_at := null;
  elsif action_details_changed then
    if actor_role not in ('admin', 'manager', 'production', 'technician', 'member') then
      raise exception 'Operational edit access is required to edit a Production Action.';
    end if;
    select cm.role into target_role from public.company_members cm
    where cm.company_id = new.company_id and cm.user_id = new.production_action_assigned_to;
    if target_role is distinct from 'production' then
      raise exception 'Production Actions must be assigned to a Production user.';
    end if;
    new.production_action := normalized_action;
    new.production_action_status := 'open';
    new.production_action_created_by := old.production_action_created_by;
    new.production_action_created_at := old.production_action_created_at;
    new.production_action_completed_by := null;
    new.production_action_completed_at := null;
  elsif action_status_changed then
    if actor_role not in ('admin', 'manager')
      and auth.uid() is distinct from old.production_action_assigned_to then
      raise exception 'Only the assigned Production user or a manager can change this Production Action status.';
    end if;
    new.production_action := old.production_action;
    new.production_action_assigned_to := old.production_action_assigned_to;
    new.production_action_created_by := old.production_action_created_by;
    new.production_action_created_at := old.production_action_created_at;
    if new.production_action_status = 'completed' then
      new.production_action_completed_by := auth.uid();
      new.production_action_completed_at := now();
    elsif new.production_action_status = 'open' then
      new.production_action_completed_by := null;
      new.production_action_completed_at := null;
    else
      raise exception 'Production Action status must be open or completed.';
    end if;
  elsif audit_fields_changed then
    raise exception 'Production Action audit fields cannot be edited directly.';
  else
    new.production_action := normalized_action;
  end if;

  if new.status = 'completed' and new.production_action_status = 'open' then
    raise exception 'Complete or remove the open Production Action before completing this work order.';
  end if;
  return new;
end;
$$;

create or replace function private.record_work_order_production_action_event()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
declare
  event_name text;
  event_summary text;
  assignee_name text;
  action_text text;
  assignee_id uuid;
begin
  if tg_op = 'INSERT' then
    if new.production_action is null then return new; end if;
    event_name := 'production_action_created';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action is null and new.production_action is not null then
    event_name := 'production_action_created';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action is not null and new.production_action is null then
    event_name := 'production_action_removed';
    action_text := old.production_action;
    assignee_id := old.production_action_assigned_to;
  elsif old.production_action_status is distinct from new.production_action_status
    and new.production_action_status = 'completed' then
    event_name := 'production_action_completed';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action_status is distinct from new.production_action_status
    and new.production_action_status = 'open' then
    event_name := 'production_action_reopened';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action is distinct from new.production_action
    or old.production_action_assigned_to is distinct from new.production_action_assigned_to then
    event_name := 'production_action_updated';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  else
    return new;
  end if;

  select p.full_name into assignee_name
  from public.profiles p
  where p.company_id = new.company_id and p.user_id = assignee_id;
  event_summary := case event_name
    when 'production_action_created' then format('Production Action assigned to %s: %s', coalesce(nullif(assignee_name, ''), 'Production'), left(action_text, 180))
    when 'production_action_updated' then format('Production Action updated for %s: %s', coalesce(nullif(assignee_name, ''), 'Production'), left(action_text, 180))
    when 'production_action_completed' then format('Production Action completed by %s.', coalesce(nullif(assignee_name, ''), 'Production'))
    when 'production_action_reopened' then format('Production Action reopened for %s: %s', coalesce(nullif(assignee_name, ''), 'Production'), left(action_text, 180))
    else format('Production Action removed: %s', left(action_text, 180))
  end;

  insert into public.work_order_events (company_id, work_order_id, actor_id, event_type, summary)
  values (new.company_id, new.id, auth.uid(), event_name, event_summary);
  return new;
end;
$$;

create or replace function private.guard_production_role_change()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if old.role <> 'production' then
    if tg_op = 'DELETE' then return old; end if;
    return new;
  end if;
  if tg_op = 'UPDATE' and new.role = 'production' then return new; end if;
  if exists (
    select 1 from public.work_orders wo
    where wo.company_id = old.company_id
      and wo.production_action_assigned_to = old.user_id
      and wo.production_action_status = 'open'
  ) then
    raise exception 'Reassign or complete this user''s open Production Actions before changing or removing their role.';
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists enforce_work_order_production_action on public.work_orders;
create trigger enforce_work_order_production_action
before insert or update on public.work_orders
for each row execute function private.enforce_work_order_production_action();

drop trigger if exists record_work_order_production_action_event on public.work_orders;
create trigger record_work_order_production_action_event
after insert or update on public.work_orders
for each row execute function private.record_work_order_production_action_event();

drop trigger if exists guard_production_role_update on public.company_members;
create trigger guard_production_role_update
before update of role on public.company_members
for each row execute function private.guard_production_role_change();

drop trigger if exists guard_production_role_delete on public.company_members;
create trigger guard_production_role_delete
before delete on public.company_members
for each row execute function private.guard_production_role_change();

revoke all on function private.enforce_work_order_production_action() from public, anon, authenticated;
revoke all on function private.record_work_order_production_action_event() from public, anon, authenticated;
revoke all on function private.guard_production_role_change() from public, anon, authenticated;

create or replace function public.enforce_work_order_assignment_role()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  new_has_vendor_note boolean;
  old_has_vendor_note boolean;
begin
  select cm.role into actor_role
  from public.company_members cm
  where cm.company_id = new.company_id and cm.user_id = auth.uid();
  if actor_role is null then raise exception 'Not a member of this company.'; end if;
  if actor_role in ('admin', 'manager') then return new; end if;

  if tg_op = 'INSERT' then
    new_has_vendor_note := coalesce(new.description, '') like '%[Assignment: Outside vendor]%';
    if new.assigned_to is not null and new.assigned_to <> auth.uid() then
      raise exception 'Technician and Production users can only assign new work to themselves or leave it unassigned.';
    end if;
    if new_has_vendor_note then raise exception 'Only managers or admins can assign work to an outside vendor.'; end if;
    return new;
  end if;

  new_has_vendor_note := coalesce(new.description, '') like '%[Assignment: Outside vendor]%';
  old_has_vendor_note := coalesce(old.description, '') like '%[Assignment: Outside vendor]%';
  if new.assigned_to is distinct from old.assigned_to then
    if old.assigned_to is null and not old_has_vendor_note and new.assigned_to = auth.uid() then return new; end if;
    raise exception 'Technician and Production users can only claim unassigned work for themselves.';
  end if;
  if new_has_vendor_note and not old_has_vendor_note then
    raise exception 'Only managers or admins can assign work to an outside vendor.';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_work_order_assignment_role on public.work_orders;
create trigger enforce_work_order_assignment_role
before insert or update on public.work_orders
for each row execute function public.enforce_work_order_assignment_role();

revoke all on function public.enforce_work_order_assignment_role() from public, anon, authenticated;

create or replace function public.get_workspace_work_order_counts(
  target_company_id uuid,
  target_location_id uuid,
  target_my_work_filter text,
  target_today date,
  target_month_start timestamptz,
  target_week_start timestamptz,
  target_week_end timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = public, private
stable
as $$
declare
  result jsonb;
begin
  if auth.uid() is null or not private.is_company_member(target_company_id) then
    raise exception 'Company membership is required.';
  end if;
  if target_location_id is not null
    and not private.location_belongs_to_company(target_company_id, target_location_id) then
    raise exception 'Location does not belong to the company.';
  end if;
  if target_my_work_filter not in ('assigned', 'created') then
    raise exception 'Unsupported My Work filter.';
  end if;

  with scoped_work_orders as (
    select wo.status, wo.due_at, wo.completed_at, wo.assigned_to, wo.created_by,
      wo.production_action_assigned_to, wo.production_action_status
    from public.work_orders wo
    where wo.company_id = target_company_id
      and (target_location_id is null or wo.location_id = target_location_id)
  ),
  my_work_orders as (
    select * from scoped_work_orders wo
    where (target_my_work_filter = 'created' and wo.created_by = auth.uid())
      or (
        target_my_work_filter = 'assigned'
        and (
          wo.assigned_to = auth.uid()
          or (wo.production_action_assigned_to = auth.uid() and wo.production_action_status = 'open')
        )
      )
  ),
  company_counts as (
    select
      count(*) filter (where status <> 'completed')::integer as active_work,
      count(*) filter (where status = 'open')::integer as new_work,
      count(*) filter (where status = 'in_progress')::integer as in_progress,
      count(*) filter (where status = 'blocked')::integer as blocked,
      count(*) filter (where status <> 'completed' and due_at < target_today)::integer as overdue,
      count(*) filter (where status = 'completed')::integer as completed_all,
      count(*) filter (where completed_at >= target_month_start)::integer as completed_month,
      count(*) filter (where completed_at >= target_week_start and completed_at < target_week_end)::integer as completed_week
    from scoped_work_orders
  ),
  my_counts as (
    select
      count(*) filter (where status <> 'completed')::integer as active_work,
      count(*) filter (where status = 'open')::integer as new_work,
      count(*) filter (where status = 'in_progress')::integer as in_progress,
      count(*) filter (where status = 'blocked')::integer as blocked,
      count(*) filter (where status <> 'completed' and due_at < target_today)::integer as overdue,
      count(*) filter (where status = 'completed')::integer as completed_all,
      count(*) filter (where completed_at >= target_month_start)::integer as completed_month,
      count(*) filter (where completed_at >= target_week_start and completed_at < target_week_end)::integer as completed_week
    from my_work_orders
  )
  select jsonb_build_object(
    'workOrders', jsonb_build_object(
      'activeWork', company_counts.active_work,
      'newWork', company_counts.new_work,
      'inProgress', company_counts.in_progress,
      'blocked', company_counts.blocked,
      'overdue', company_counts.overdue,
      'completedAll', company_counts.completed_all,
      'completedMonth', company_counts.completed_month,
      'completedWeek', company_counts.completed_week
    ),
    'myWork', jsonb_build_object(
      'activeWork', my_counts.active_work,
      'newWork', my_counts.new_work,
      'inProgress', my_counts.in_progress,
      'blocked', my_counts.blocked,
      'overdue', my_counts.overdue,
      'completedAll', my_counts.completed_all,
      'completedMonth', my_counts.completed_month,
      'completedWeek', my_counts.completed_week
    )
  ) into result from company_counts cross join my_counts;
  return result;
end;
$$;

revoke all on function public.get_workspace_work_order_counts(uuid, uuid, text, date, timestamptz, timestamptz, timestamptz) from public, anon;
grant execute on function public.get_workspace_work_order_counts(uuid, uuid, text, date, timestamptz, timestamptz, timestamptz) to authenticated;

notify pgrst, 'reload schema';
