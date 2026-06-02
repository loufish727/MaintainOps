create or replace function private.role_rank(role_name text)
returns integer
language sql
immutable
set search_path = public, private
as $$
  select case role_name
    when 'admin' then 4
    when 'manager' then 3
    when 'technician' then 2
    when 'member' then 1
    else 0
  end;
$$;

create or replace function public.accept_company_invites()
returns integer
language plpgsql
security definer
set search_path = public, private
as $$
declare
  user_email text;
  user_name text;
  accepted_count integer := 0;
begin
  user_email := lower(coalesce(auth.jwt() ->> 'email', ''));
  user_name := coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', split_part(user_email, '@', 1), '');

  if auth.uid() is null or user_email = '' then
    return 0;
  end if;

  insert into public.company_members (company_id, user_id, role, default_location_id)
  select ci.company_id, auth.uid(), ci.role, ci.default_location_id
  from public.company_invites ci
  where lower(ci.email) = user_email
    and ci.accepted_at is null
  on conflict (company_id, user_id) do update
  set role = case
        when private.role_rank(public.company_members.role) >= private.role_rank(excluded.role)
          then public.company_members.role
        else excluded.role
      end,
      default_location_id = coalesce(excluded.default_location_id, public.company_members.default_location_id);

  insert into public.profiles (company_id, user_id, full_name)
  select ci.company_id, auth.uid(), user_name
  from public.company_invites ci
  where lower(ci.email) = user_email
    and ci.accepted_at is null
  on conflict (company_id, user_id) do update
  set full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name),
      updated_at = now();

  update public.company_invites
  set accepted_by = auth.uid(),
      accepted_at = now()
  where lower(email) = user_email
    and accepted_at is null;

  get diagnostics accepted_count = row_count;
  return accepted_count;
end;
$$;

grant execute on function public.accept_company_invites() to authenticated, service_role;

notify pgrst, 'reload schema';
