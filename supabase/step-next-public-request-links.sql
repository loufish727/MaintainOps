create extension if not exists pgcrypto with schema extensions;

alter table public.maintenance_requests
alter column requested_by drop not null;

alter table public.maintenance_requests
add column if not exists requested_by_name text,
add column if not exists requested_by_contact text,
add column if not exists external_source text;

create table if not exists public.public_request_links (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  token text not null unique,
  label text,
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  last_used_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, location_id)
);

create index if not exists public_request_links_company_idx on public.public_request_links(company_id);
create index if not exists public_request_links_location_idx on public.public_request_links(location_id);
create index if not exists public_request_links_token_idx on public.public_request_links(token);
create index if not exists maintenance_requests_company_location_status_idx
on public.maintenance_requests(company_id, location_id, status);

alter table public.public_request_links enable row level security;

drop policy if exists "Members can read public request links" on public.public_request_links;
create policy "Members can read public request links"
on public.public_request_links for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Managers can create public request links" on public.public_request_links;
create policy "Managers can create public request links"
on public.public_request_links for insert
to authenticated
with check (
  private.location_belongs_to_company(company_id, location_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = public_request_links.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Managers can update public request links" on public.public_request_links;
create policy "Managers can update public request links"
on public.public_request_links for update
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = public_request_links.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
)
with check (
  private.location_belongs_to_company(company_id, location_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = public_request_links.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

grant select, insert, update on public.public_request_links to authenticated;

create or replace function private.new_public_request_token()
returns text
language sql
security definer
set search_path = public, private, extensions
as $$
  select translate(rtrim(encode(extensions.gen_random_bytes(18), 'base64'), '='), '+/', '-_');
$$;

drop function if exists public.ensure_location_request_link(uuid);

create or replace function public.ensure_location_request_link(target_location_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  location_row record;
begin
  select l.id, l.company_id, l.name
  into location_row
  from public.locations l
  where l.id = target_location_id;

  if location_row.id is null then
    raise exception 'Location not found.';
  end if;

  if not exists (
    select 1
    from public.company_members cm
    where cm.company_id = location_row.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only admins or managers can create public request links.';
  end if;

  insert into public.public_request_links (company_id, location_id, token, label, created_by, is_active, updated_at)
  values (location_row.company_id, location_row.id, private.new_public_request_token(), location_row.name, auth.uid(), true, now())
  on conflict (company_id, location_id) do update
  set is_active = true,
      updated_at = now();
end;
$$;

grant execute on function public.ensure_location_request_link(uuid) to authenticated;

create or replace function public.get_public_request_intake(request_token text)
returns table(company_name text, location_name text)
language sql
security definer
set search_path = public, private
as $$
  select c.name as company_name,
         l.name as location_name
  from public.public_request_links prl
  join public.companies c on c.id = prl.company_id
  join public.locations l on l.id = prl.location_id
  where prl.token = request_token
    and prl.is_active = true
  limit 1;
$$;

grant execute on function public.get_public_request_intake(text) to anon, authenticated;

create or replace function public.submit_public_location_request(
  request_token text,
  request_title text,
  request_description text default null,
  requester_name text default null,
  requester_contact text default null,
  equipment_note text default null,
  request_priority text default 'medium'
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  link_row record;
  clean_title text;
  clean_priority text;
  clean_description text;
  new_request_id uuid;
begin
  select prl.company_id, prl.location_id
  into link_row
  from public.public_request_links prl
  where prl.token = request_token
    and prl.is_active = true;

  if link_row.company_id is null then
    raise exception 'Request link is inactive or invalid.';
  end if;

  clean_title := left(trim(coalesce(request_title, '')), 140);
  if clean_title = '' then
    raise exception 'Issue description is required.';
  end if;

  clean_priority := case
    when request_priority in ('low', 'medium', 'high', 'critical') then request_priority
    else 'medium'
  end;

  clean_description := concat_ws(E'\n\n',
    nullif(left(trim(coalesce(request_description, '')), 1000), ''),
    case when nullif(trim(coalesce(equipment_note, '')), '') is not null
      then 'Machine / area: ' || left(trim(equipment_note), 140)
      else null
    end,
    case when nullif(trim(coalesce(requester_name, '')), '') is not null
      then 'Submitted by: ' || left(trim(requester_name), 120)
      else null
    end,
    case when nullif(trim(coalesce(requester_contact, '')), '') is not null
      then 'Contact: ' || left(trim(requester_contact), 160)
      else null
    end
  );

  insert into public.maintenance_requests (
    company_id,
    location_id,
    title,
    description,
    priority,
    status,
    requested_by,
    requested_by_name,
    requested_by_contact,
    external_source
  )
  values (
    link_row.company_id,
    link_row.location_id,
    clean_title,
    nullif(clean_description, ''),
    clean_priority,
    'submitted',
    null,
    nullif(left(trim(coalesce(requester_name, '')), 120), ''),
    nullif(left(trim(coalesce(requester_contact, '')), 160), ''),
    'public_location_qr'
  )
  returning id into new_request_id;

  update public.public_request_links
  set last_used_at = now(),
      updated_at = now()
  where token = request_token;

  return new_request_id;
end;
$$;

grant execute on function public.submit_public_location_request(text, text, text, text, text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
