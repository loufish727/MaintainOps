alter table public.company_members
add column if not exists default_location_id uuid references public.locations(id) on delete set null;

alter table public.company_invites
add column if not exists default_location_id uuid references public.locations(id) on delete set null;

create index if not exists company_members_default_location_id_idx
on public.company_members(default_location_id);

create index if not exists company_invites_default_location_id_idx
on public.company_invites(default_location_id);

grant select, insert, update on public.company_members to authenticated;
grant select, insert, update on public.company_invites to authenticated;
grant select, insert, update, delete on public.company_members to service_role;
grant select, insert, update, delete on public.company_invites to service_role;

drop function if exists public.get_my_companies();

create or replace function public.get_my_companies()
returns table (
  id uuid,
  name text,
  logo_path text,
  created_at timestamptz,
  role text,
  default_location_id uuid
)
language sql
security definer
set search_path = public, private
stable
as $$
  select
    c.id,
    c.name,
    c.logo_path,
    c.created_at,
    cm.role,
    cm.default_location_id
  from public.company_members cm
  join public.companies c on c.id = cm.company_id
  where cm.user_id = auth.uid()
  order by cm.created_at asc;
$$;

drop function if exists public.create_company_invite(uuid, text, text);
drop function if exists public.create_company_invite(uuid, text, text, uuid);

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
begin
  normalized_email := lower(trim(invite_email));
  selected_role := coalesce(nullif(invite_role, ''), 'technician');

  if normalized_email = '' or normalized_email not like '%@%' then
    raise exception 'Enter a valid email address.';
  end if;

  if selected_role not in ('admin', 'manager', 'technician') then
    raise exception 'Invalid role.';
  end if;

  if invite_default_location_id is not null and not exists (
    select 1
    from public.locations l
    where l.id = invite_default_location_id
      and l.company_id = target_company_id
  ) then
    raise exception 'Default location must belong to this company.';
  end if;

  if not exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only admins or managers can invite teammates.';
  end if;

  insert into public.company_invites (company_id, email, role, default_location_id, invited_by)
  values (target_company_id, normalized_email, selected_role, invite_default_location_id, auth.uid())
  on conflict (company_id, email) do update
  set role = excluded.role,
      default_location_id = excluded.default_location_id,
      invited_by = auth.uid(),
      accepted_by = null,
      accepted_at = null
  returning id into new_invite_id;

  return new_invite_id;
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

  if user_email = '' then
    return 0;
  end if;

  insert into public.company_members (company_id, user_id, role, default_location_id)
  select ci.company_id, auth.uid(), ci.role, ci.default_location_id
  from public.company_invites ci
  where lower(ci.email) = user_email
    and ci.accepted_at is null
  on conflict (company_id, user_id) do update
  set role = excluded.role,
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

grant execute on function public.get_my_companies() to authenticated, service_role;
grant execute on function public.create_company_invite(uuid, text, text, uuid) to authenticated, service_role;
grant execute on function public.accept_company_invites() to authenticated, service_role;

notify pgrst, 'reload schema';
