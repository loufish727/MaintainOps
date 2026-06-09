-- LFES team authority guardrails
-- Goal: managers can manage work and invite technicians, but only admins can grant authority.

drop policy if exists "Members can add company members" on public.company_members;
create policy "Members can add company members"
on public.company_members for insert
to authenticated
with check (
  exists (
    select 1
    from public.company_members actor
    where actor.company_id = company_members.company_id
      and actor.user_id = auth.uid()
      and (
        actor.role = 'admin'
        or (
          actor.role = 'manager'
          and company_members.role = 'technician'
        )
      )
  )
);

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

  if auth.uid() is null then
    raise exception 'Sign in before inviting teammates.';
  end if;

  if normalized_email = '' or normalized_email not like '%@%' then
    raise exception 'Enter a valid email address.';
  end if;

  if selected_role not in ('admin', 'manager', 'technician') then
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
    raise exception 'Only admins can invite managers or admins.';
  end if;

  if invite_default_location_id is not null and not exists (
    select 1
    from public.locations loc
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

notify pgrst, 'reload schema';
