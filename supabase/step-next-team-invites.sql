create table if not exists public.company_invites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  email text not null,
  role text not null default 'technician' check (role in ('admin', 'manager', 'technician', 'member')),
  invited_by uuid not null references auth.users(id) on delete restrict,
  accepted_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  unique (company_id, email)
);

create index if not exists company_invites_company_id_idx on public.company_invites(company_id);
create index if not exists company_invites_email_idx on public.company_invites(lower(email));

grant select, insert, update on public.company_invites to authenticated;

alter table public.company_invites enable row level security;

drop policy if exists "Managers can read company invites" on public.company_invites;
create policy "Managers can read company invites"
on public.company_invites for select
to authenticated
using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = company_invites.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

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

  if selected_role not in ('admin', 'manager', 'technician', 'member') then
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

  insert into public.company_members (company_id, user_id, role)
  select ci.company_id, auth.uid(), ci.role
  from public.company_invites ci
  where lower(ci.email) = user_email
    and ci.accepted_at is null
  on conflict (company_id, user_id) do update
  set role = excluded.role;

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

grant execute on function public.create_company_invite(uuid, text, text) to authenticated;
grant execute on function public.accept_company_invites() to authenticated;

notify pgrst, 'reload schema';
