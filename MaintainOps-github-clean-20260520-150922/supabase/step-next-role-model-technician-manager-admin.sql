-- Simplify MaintainOps roles to the three roles used by the app:
-- technician, manager, admin.
--
-- Existing legacy "member" rows are converted to technician before the
-- database checks are tightened.

update public.company_members
set role = 'technician'
where role = 'member';

update public.company_invites
set role = 'technician'
where role = 'member';

alter table public.company_members
alter column role set default 'technician';

alter table public.company_invites
alter column role set default 'technician';

do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace nsp on nsp.oid = rel.relnamespace
    where nsp.nspname = 'public'
      and rel.relname = 'company_members'
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ilike '%role%'
  loop
    execute format('alter table public.company_members drop constraint %I', constraint_name);
  end loop;
end $$;

alter table public.company_members
add constraint company_members_role_check
check (role in ('admin', 'manager', 'technician'));

do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace nsp on nsp.oid = rel.relnamespace
    where nsp.nspname = 'public'
      and rel.relname = 'company_invites'
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ilike '%role%'
  loop
    execute format('alter table public.company_invites drop constraint %I', constraint_name);
  end loop;
end $$;

alter table public.company_invites
add constraint company_invites_role_check
check (role in ('admin', 'manager', 'technician'));

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
  if new_role not in ('admin', 'manager', 'technician') then
    raise exception 'Invalid role.';
  end if;

  select cm.role into current_role
  from public.company_members cm
  where cm.company_id = target_company_id
    and cm.user_id = auth.uid();

  if current_role not in ('admin', 'manager') then
    raise exception 'Only admins or managers can change team roles.';
  end if;

  if target_user_id = auth.uid() then
    raise exception 'You cannot change your own role here.';
  end if;

  if current_role = 'manager' and new_role = 'admin' then
    raise exception 'Only admins can make another user an admin.';
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
  invite_role text default 'technician'
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
begin
  normalized_email := lower(trim(invite_email));
  selected_role := coalesce(nullif(invite_role, ''), 'technician');

  if normalized_email = '' or normalized_email not like '%@%' then
    raise exception 'Enter a valid email address.';
  end if;

  if selected_role not in ('admin', 'manager', 'technician') then
    raise exception 'Invalid role.';
  end if;

  if not exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only admins or managers can invite teammates.';
  end if;

  insert into public.company_invites (company_id, email, role, invited_by)
  values (target_company_id, normalized_email, selected_role, auth.uid())
  on conflict (company_id, email) do update
  set role = excluded.role,
      invited_by = auth.uid(),
      accepted_by = null,
      accepted_at = null
  returning id into new_invite_id;

  return new_invite_id;
end;
$$;

grant execute on function public.update_company_member_role(uuid, uuid, text) to authenticated;
grant execute on function public.create_company_invite(uuid, text, text) to authenticated;

notify pgrst, 'reload schema';
