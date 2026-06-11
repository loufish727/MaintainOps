create extension if not exists pgcrypto with schema extensions;

create table if not exists public.company_invite_links (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  role text not null default 'technician' check (role in ('manager', 'technician')),
  default_location_id uuid not null references public.locations(id) on delete cascade,
  token text not null unique,
  created_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz not null default now() + interval '7 days',
  used_at timestamptz,
  used_by uuid references auth.users(id) on delete set null,
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists company_invite_links_company_idx on public.company_invite_links(company_id);
create index if not exists company_invite_links_token_idx on public.company_invite_links(token);

alter table public.company_invite_links enable row level security;

drop policy if exists "Managers can read company invite links" on public.company_invite_links;
create policy "Managers can read company invite links"
on public.company_invite_links for select
to authenticated
using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = company_invite_links.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

grant select on public.company_invite_links to authenticated;

create or replace function private.new_invite_link_token()
returns text
language sql
security definer
set search_path = public, private, extensions
as $$
  select translate(rtrim(encode(extensions.gen_random_bytes(18), 'base64'), '='), '+/', '-_');
$$;

create or replace function public.create_company_invite_link(
  target_company_id uuid,
  link_role text default 'technician',
  link_location_id uuid default null
)
returns table (id uuid, token text, role text, default_location_id uuid, expires_at timestamptz)
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  actor_default_location_id uuid;
  selected_role text;
  resolved_location_id uuid;
begin
  selected_role := coalesce(nullif(trim(link_role), ''), 'technician');

  if auth.uid() is null then
    raise exception 'Sign in before creating join links.';
  end if;

  if selected_role not in ('manager', 'technician') then
    raise exception 'Join links can only create managers or technicians.';
  end if;

  select cm.role, cm.default_location_id
  into actor_role, actor_default_location_id
  from public.company_members cm
  where cm.company_id = target_company_id
    and cm.user_id = auth.uid();

  if actor_role not in ('admin', 'manager') then
    raise exception 'Only admins or managers can create join links.';
  end if;

  if actor_role <> 'admin' then
    if selected_role <> 'technician' then
      raise exception 'Only admins can create manager join links.';
    end if;
    if actor_default_location_id is null then
      raise exception 'Set your default location before creating a join link.';
    end if;
    resolved_location_id := actor_default_location_id;
  else
    resolved_location_id := link_location_id;
  end if;

  if resolved_location_id is null or not exists (
    select 1
    from public.locations loc
    where loc.company_id = target_company_id
      and loc.id = resolved_location_id
  ) then
    raise exception 'Choose a location that belongs to this company.';
  end if;

  return query
  insert into public.company_invite_links (company_id, role, default_location_id, token, created_by)
  values (target_company_id, selected_role, resolved_location_id, private.new_invite_link_token(), auth.uid())
  returning
    company_invite_links.id,
    company_invite_links.token,
    company_invite_links.role,
    company_invite_links.default_location_id,
    company_invite_links.expires_at;
end;
$$;

create or replace function public.accept_company_invite_link(join_token text)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  link_row record;
  user_name text;
begin
  if auth.uid() is null then
    raise exception 'Sign in before using a join link.';
  end if;

  if coalesce(trim(join_token), '') = '' then
    raise exception 'Join link token is required.';
  end if;

  update public.company_invite_links
  set used_at = now(),
      used_by = auth.uid()
  where token = trim(join_token)
    and used_at is null
    and revoked_at is null
    and expires_at > now()
  returning company_id, role, default_location_id
  into link_row;

  if link_row.company_id is null then
    -- Idempotent retry: the same user re-submitting an already-claimed token
    -- (page reload after acceptance) should not see an error.
    select cil.company_id, cil.role, cil.default_location_id
    into link_row
    from public.company_invite_links cil
    where cil.token = trim(join_token)
      and cil.used_by = auth.uid();

    if link_row.company_id is null then
      raise exception 'This join link is invalid, expired, or already used.';
    end if;

    return link_row.company_id;
  end if;

  user_name := coalesce(
    auth.jwt() -> 'user_metadata' ->> 'full_name',
    split_part(lower(coalesce(auth.jwt() ->> 'email', '')), '@', 1),
    ''
  );

  insert into public.company_members (company_id, user_id, role, default_location_id)
  values (link_row.company_id, auth.uid(), link_row.role, link_row.default_location_id)
  on conflict (company_id, user_id) do update
  set role = case
        when private.role_rank(public.company_members.role) >= private.role_rank(excluded.role)
          then public.company_members.role
        else excluded.role
      end,
      default_location_id = coalesce(excluded.default_location_id, public.company_members.default_location_id);

  insert into public.profiles (company_id, user_id, full_name)
  values (link_row.company_id, auth.uid(), user_name)
  on conflict (company_id, user_id) do update
  set full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name),
      updated_at = now();

  return link_row.company_id;
end;
$$;

create or replace function public.revoke_company_invite_link(link_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  link_company_id uuid;
  link_created_by uuid;
begin
  if auth.uid() is null then
    raise exception 'Sign in before revoking join links.';
  end if;

  select cil.company_id, cil.created_by
  into link_company_id, link_created_by
  from public.company_invite_links cil
  where cil.id = link_id;

  if link_company_id is null then
    raise exception 'Join link not found.';
  end if;

  select cm.role into actor_role
  from public.company_members cm
  where cm.company_id = link_company_id
    and cm.user_id = auth.uid();

  if actor_role is null or actor_role not in ('admin', 'manager') then
    raise exception 'Only admins or managers can revoke join links.';
  end if;

  if actor_role <> 'admin' and link_created_by is distinct from auth.uid() then
    raise exception 'Managers can only revoke join links they created.';
  end if;

  update public.company_invite_links
  set revoked_at = now(),
      revoked_by = auth.uid()
  where id = link_id
    and used_at is null
    and revoked_at is null;
end;
$$;

revoke all on function private.new_invite_link_token() from public, anon, authenticated;
revoke all on function public.create_company_invite_link(uuid, text, uuid) from public, anon;
revoke all on function public.accept_company_invite_link(text) from public, anon;
revoke all on function public.revoke_company_invite_link(uuid) from public, anon;

grant execute on function public.create_company_invite_link(uuid, text, uuid) to authenticated;
grant execute on function public.accept_company_invite_link(text) to authenticated;
grant execute on function public.revoke_company_invite_link(uuid) to authenticated;

notify pgrst, 'reload schema';
