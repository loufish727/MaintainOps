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
  if new_role not in ('admin', 'manager', 'technician', 'member') then
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

grant execute on function public.update_company_member_role(uuid, uuid, text) to authenticated;

notify pgrst, 'reload schema';
