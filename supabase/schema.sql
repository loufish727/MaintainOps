-- MaintainOps Supabase schema
-- Run this in the Supabase SQL editor before using the app.

create extension if not exists "pgcrypto";

create schema if not exists private;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_key text generated always as (lower(btrim(name))) stored,
  logo_path text,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (created_by, name_key)
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'manager', 'technician', 'member')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (company_id, id),
  unique (company_id, name)
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  parent_asset_id uuid references public.assets(id) on delete set null,
  name text not null,
  asset_code text,
  asset_type text not null default 'machine' check (asset_type in ('machine', 'secondary_machine', 'component', 'shop_item')),
  safety_devices_required boolean not null default true,
  location text,
  status text not null default 'running' check (status in ('running', 'watch', 'degraded', 'offline')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  asset_id uuid references public.assets(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  type text not null default 'reactive' check (type in ('request', 'reactive', 'preventive', 'inspection', 'corrective')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'blocked', 'completed')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'critical')),
  due_at date,
  created_by uuid not null references auth.users(id) on delete restrict,
  actual_minutes integer not null default 0,
  failure_cause text,
  resolution_summary text,
  follow_up_needed boolean not null default false,
  completion_notes text,
  completed_at timestamptz,
  safety_devices_checked boolean not null default false,
  safety_devices_checked_at timestamptz,
  safety_check_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_order_comments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete restrict,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.work_order_photos (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  storage_path text not null,
  file_name text not null,
  content_type text,
  file_size_bytes bigint,
  original_file_name text,
  original_size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.preventive_schedules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  asset_id uuid not null references public.assets(id) on delete cascade,
  title text not null,
  frequency text not null default 'monthly' check (frequency in ('weekly', 'monthly', 'quarterly')),
  next_due_at date not null,
  active boolean not null default true,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  name text not null,
  sku text,
  supplier_name text,
  quantity_on_hand integer not null default 0,
  reorder_point integer not null default 0,
  unit_cost numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_order_parts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete restrict,
  quantity_used integer not null check (quantity_used > 0),
  unit_cost_at_use numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.part_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  storage_path text not null,
  file_name text not null,
  content_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.work_order_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  event_type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

alter table public.work_orders
add column if not exists assigned_to uuid references auth.users(id) on delete set null;

alter table public.assets
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.assets
add column if not exists parent_asset_id uuid references public.assets(id) on delete set null;

alter table public.assets
add column if not exists asset_type text not null default 'machine';

alter table public.assets
add column if not exists safety_devices_required boolean not null default true;

alter table public.assets
drop constraint if exists assets_asset_type_check;

update public.assets
set asset_type = 'secondary_machine'
where asset_type = 'attachment';

update public.assets
set asset_type = 'component'
where asset_type = 'tooling';

update public.assets
set asset_type = 'shop_item'
where asset_type = 'support';

alter table public.work_orders
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.preventive_schedules
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.parts
add column if not exists location_id uuid references public.locations(id) on delete set null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'locations_company_id_id_key'
      and conrelid = 'public.locations'::regclass
  ) then
    alter table public.locations
    add constraint locations_company_id_id_key unique (company_id, id);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'assets_company_location_fkey'
      and conrelid = 'public.assets'::regclass
  ) then
    alter table public.assets
    add constraint assets_company_location_fkey
    foreign key (company_id, location_id)
    references public.locations(company_id, id)
    not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'work_orders_company_location_fkey'
      and conrelid = 'public.work_orders'::regclass
  ) then
    alter table public.work_orders
    add constraint work_orders_company_location_fkey
    foreign key (company_id, location_id)
    references public.locations(company_id, id)
    not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'preventive_schedules_company_location_fkey'
      and conrelid = 'public.preventive_schedules'::regclass
  ) then
    alter table public.preventive_schedules
    add constraint preventive_schedules_company_location_fkey
    foreign key (company_id, location_id)
    references public.locations(company_id, id)
    not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'parts_company_location_fkey'
      and conrelid = 'public.parts'::regclass
  ) then
    alter table public.parts
    add constraint parts_company_location_fkey
    foreign key (company_id, location_id)
    references public.locations(company_id, id)
    not valid;
  end if;
end;
$$;

alter table public.work_orders
add column if not exists type text not null default 'reactive'
check (type in ('request', 'reactive', 'preventive', 'inspection', 'corrective'));

alter table public.work_orders
add column if not exists actual_minutes integer not null default 0;

alter table public.work_orders
add column if not exists completion_notes text;

alter table public.work_orders
add column if not exists completed_at timestamptz;

alter table public.work_orders
add column if not exists safety_devices_checked boolean not null default false;

alter table public.work_orders
add column if not exists safety_devices_checked_at timestamptz;

alter table public.work_orders
add column if not exists safety_check_required boolean not null default false;

alter table public.work_orders
drop constraint if exists work_orders_asset_completion_safety_check;

insert into public.locations (company_id, name)
select c.id, 'Main Location'
from public.companies c
where not exists (
  select 1 from public.locations l where l.company_id = c.id
);

update public.assets a
set location_id = l.id
from public.locations l
where a.company_id = l.company_id
  and a.location_id is null
  and l.name = 'Main Location';

update public.work_orders wo
set location_id = coalesce((select a.location_id from public.assets a where a.id = wo.asset_id), l.id)
from public.locations l
where wo.company_id = l.company_id
  and wo.location_id is null
  and l.name = 'Main Location';

update public.preventive_schedules ps
set location_id = coalesce((select a.location_id from public.assets a where a.id = ps.asset_id), l.id)
from public.locations l
where ps.company_id = l.company_id
  and ps.location_id is null
  and l.name = 'Main Location';

update public.parts p
set location_id = l.id
from public.locations l
where p.company_id = l.company_id
  and p.location_id is null
  and l.name = 'Main Location';

alter table public.companies
add column if not exists name_key text generated always as (lower(btrim(name))) stored;

create unique index if not exists companies_created_by_name_key_idx
on public.companies(created_by, name_key);

do $$
begin
  alter table public.assets
    add constraint assets_asset_type_check
    check (asset_type in ('machine', 'secondary_machine', 'component', 'shop_item'))
    not valid;

  if not exists (
    select 1 from pg_constraint where conname = 'assets_not_own_parent_check'
  ) then
    alter table public.assets
      add constraint assets_not_own_parent_check
      check (parent_asset_id is null or parent_asset_id <> id)
      not valid;
  end if;

  update public.work_orders
  set safety_devices_checked = false,
      safety_devices_checked_at = null
  where status <> 'completed'
    and safety_devices_checked = true;

  if not exists (
    select 1 from pg_constraint where conname = 'work_orders_safety_check_completion_only'
  ) then
    alter table public.work_orders
      add constraint work_orders_safety_check_completion_only
      check (status = 'completed' or safety_devices_checked = false)
      not valid;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'work_order_comments_company_author_profile_fkey'
  ) then
    alter table public.work_order_comments
      add constraint work_order_comments_company_author_profile_fkey
      foreign key (company_id, author_id)
      references public.profiles(company_id, user_id)
      on delete restrict;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'work_order_photos_company_uploader_profile_fkey'
  ) then
    alter table public.work_order_photos
      add constraint work_order_photos_company_uploader_profile_fkey
      foreign key (company_id, uploaded_by)
      references public.profiles(company_id, user_id)
      on delete restrict;
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'work_orders_company_assigned_profile_fkey'
  ) then
    alter table public.work_orders
      add constraint work_orders_company_assigned_profile_fkey
      foreign key (company_id, assigned_to)
      references public.profiles(company_id, user_id)
      on delete restrict;
  end if;
end $$;

update public.work_orders wo
set safety_check_required = coalesce(a.safety_devices_required, true)
from public.assets a
where wo.asset_id = a.id
  and wo.company_id = a.company_id;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'work_orders_required_safety_completion_check'
  ) then
    alter table public.work_orders
      add constraint work_orders_required_safety_completion_check
      check (status <> 'completed' or safety_check_required = false or safety_devices_checked)
      not valid;
  end if;
end $$;

create index if not exists company_members_user_id_idx on public.company_members(user_id);
create index if not exists company_members_company_id_idx on public.company_members(company_id);
create index if not exists locations_company_id_idx on public.locations(company_id);
create index if not exists profiles_company_id_idx on public.profiles(company_id);
create index if not exists assets_company_id_idx on public.assets(company_id);
create index if not exists assets_location_id_idx on public.assets(location_id);
create index if not exists assets_parent_asset_id_idx on public.assets(parent_asset_id);
create index if not exists assets_company_parent_asset_id_idx on public.assets(company_id, parent_asset_id);
create index if not exists assets_company_asset_type_idx on public.assets(company_id, asset_type);
create index if not exists work_orders_company_id_idx on public.work_orders(company_id);
create index if not exists work_orders_location_id_idx on public.work_orders(location_id);
create index if not exists work_orders_assigned_to_idx on public.work_orders(assigned_to);
create index if not exists work_orders_safety_check_required_idx on public.work_orders(company_id, safety_check_required);
create index if not exists work_order_comments_company_id_idx on public.work_order_comments(company_id);
create index if not exists work_order_photos_company_id_idx on public.work_order_photos(company_id);
create index if not exists preventive_schedules_company_id_idx on public.preventive_schedules(company_id);
create index if not exists preventive_schedules_location_id_idx on public.preventive_schedules(location_id);
create index if not exists preventive_schedules_asset_id_idx on public.preventive_schedules(asset_id);
create index if not exists parts_company_id_idx on public.parts(company_id);
create index if not exists parts_location_id_idx on public.parts(location_id);
create index if not exists parts_company_supplier_name_idx on public.parts(company_id, supplier_name);
create index if not exists work_order_parts_company_id_idx on public.work_order_parts(company_id);
create index if not exists work_order_parts_work_order_id_idx on public.work_order_parts(work_order_id);
create index if not exists part_documents_company_id_idx on public.part_documents(company_id);
create index if not exists part_documents_part_id_idx on public.part_documents(part_id);
create index if not exists work_order_events_company_id_idx on public.work_order_events(company_id);
create index if not exists work_order_events_work_order_id_idx on public.work_order_events(work_order_id);

grant usage on schema public to authenticated;
grant select, insert, update on public.companies to authenticated;
grant select, insert, update on public.company_members to authenticated;
grant select, insert, update on public.locations to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.assets to authenticated;
grant select, insert, update, delete on public.work_orders to authenticated;
grant select, insert on public.work_order_comments to authenticated;
grant select, insert on public.work_order_photos to authenticated;
grant select, insert, update on public.preventive_schedules to authenticated;
grant select, insert, update, delete on public.parts to authenticated;
grant select, insert on public.work_order_parts to authenticated;
grant select, insert on public.part_documents to authenticated;
grant select, insert on public.work_order_events to authenticated;
grant execute on function public.create_company(text) to authenticated;
grant execute on function public.ensure_company_profile(uuid) to authenticated;

create or replace function private.is_company_member(target_company_id uuid)
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
  );
$$;

create or replace function private.location_belongs_to_company(target_company_id uuid, target_location_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select target_location_id is null
    or exists (
      select 1
      from public.locations l
      where l.id = target_location_id
        and l.company_id = target_company_id
    );
$$;

create or replace function private.asset_belongs_to_company(target_company_id uuid, target_asset_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select target_asset_id is null
    or exists (
      select 1
      from public.assets a
      where a.id = target_asset_id
        and a.company_id = target_company_id
    );
$$;

create or replace function public.create_company(company_name text)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  new_company_id uuid;
  user_name text;
begin
  insert into public.companies (name, created_by)
  values (company_name, auth.uid())
  returning id into new_company_id;

  insert into public.company_members (company_id, user_id, role)
  values (new_company_id, auth.uid(), 'admin');

  insert into public.locations (company_id, name)
  values (new_company_id, 'Main Location')
  on conflict (company_id, name) do nothing;

  user_name := coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', split_part(coalesce(auth.jwt() ->> 'email', ''), '@', 1), '');

  insert into public.profiles (company_id, user_id, full_name)
  values (new_company_id, auth.uid(), user_name)
  on conflict (company_id, user_id) do update
  set full_name = excluded.full_name,
      updated_at = now();

  return new_company_id;
end;
$$;

create or replace function public.ensure_company_profile(target_company_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  user_name text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
  ) then
    raise exception 'Not a member of this company';
  end if;

  user_name := coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', split_part(coalesce(auth.jwt() ->> 'email', ''), '@', 1), '');

  insert into public.profiles (company_id, user_id, full_name)
  values (target_company_id, auth.uid(), user_name)
  on conflict (company_id, user_id) do update
  set full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name),
      updated_at = now();
end;
$$;

alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.locations enable row level security;
alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.work_orders enable row level security;
alter table public.work_order_comments enable row level security;
alter table public.work_order_photos enable row level security;
alter table public.preventive_schedules enable row level security;
alter table public.parts enable row level security;
alter table public.work_order_parts enable row level security;
alter table public.part_documents enable row level security;
alter table public.work_order_events enable row level security;

drop policy if exists "Members can read companies" on public.companies;
create policy "Members can read companies"
on public.companies for select
to authenticated
using (private.is_company_member(id));

drop policy if exists "Admins can update companies" on public.companies;
create policy "Admins can update companies"
on public.companies for update
to authenticated
using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = companies.id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = companies.id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Members can read company members" on public.company_members;
create policy "Members can read company members"
on public.company_members for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can add company members" on public.company_members;
create policy "Members can add company members"
on public.company_members for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.company_members cm
    where cm.company_id = company_members.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Members can read profiles" on public.profiles;
create policy "Members can read profiles"
on public.profiles for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can read locations" on public.locations;
create policy "Members can read locations"
on public.locations for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create locations" on public.locations;
create policy "Members can create locations"
on public.locations for insert
to authenticated
with check (private.is_company_member(company_id));

drop policy if exists "Members can update locations" on public.locations;
create policy "Members can update locations"
on public.locations for update
to authenticated
using (private.is_company_member(company_id))
with check (private.is_company_member(company_id));

drop policy if exists "Members can create their profile" on public.profiles;
create policy "Members can create their profile"
on public.profiles for insert
to authenticated
with check (private.is_company_member(company_id) and user_id = auth.uid());

drop policy if exists "Members can update their profile" on public.profiles;
create policy "Members can update their profile"
on public.profiles for update
to authenticated
using (private.is_company_member(company_id) and user_id = auth.uid())
with check (private.is_company_member(company_id) and user_id = auth.uid());

drop policy if exists "Members can read assets" on public.assets;
create policy "Members can read assets"
on public.assets for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create assets" on public.assets;
create policy "Members can create assets"
on public.assets for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and private.asset_belongs_to_company(company_id, parent_asset_id)
);

drop policy if exists "Members can update assets" on public.assets;
create policy "Members can update assets"
on public.assets for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and private.asset_belongs_to_company(company_id, parent_asset_id)
);

drop policy if exists "Managers can delete unused assets" on public.assets;
create policy "Managers can delete unused assets"
on public.assets for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = assets.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Members can read work orders" on public.work_orders;
create policy "Members can read work orders"
on public.work_orders for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create work orders" on public.work_orders;
create policy "Members can create work orders"
on public.work_orders for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and created_by = auth.uid()
  and (
    assigned_to is null
    or exists (
      select 1 from public.profiles p
      where p.company_id = work_orders.company_id
        and p.user_id = assigned_to
    )
  )
  and (
    asset_id is null
    or exists (
      select 1 from public.assets a
      where a.id = asset_id
        and a.company_id = work_orders.company_id
    )
  )
);

drop policy if exists "Members can update work orders" on public.work_orders;
create policy "Members can update work orders"
on public.work_orders for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and (
    assigned_to is null
    or exists (
      select 1 from public.profiles p
      where p.company_id = work_orders.company_id
        and p.user_id = assigned_to
    )
  )
  and (
    asset_id is null
    or exists (
      select 1 from public.assets a
      where a.id = asset_id
        and a.company_id = work_orders.company_id
    )
  )
);

drop policy if exists "Admins can delete work orders" on public.work_orders;
create policy "Admins can delete work orders"
on public.work_orders for delete
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = work_orders.company_id
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

drop policy if exists "Members can read comments" on public.work_order_comments;
create policy "Members can read comments"
on public.work_order_comments for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create comments" on public.work_order_comments;
create policy "Members can create comments"
on public.work_order_comments for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and author_id = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_comments.company_id
  )
);

drop policy if exists "Members can read photo records" on public.work_order_photos;
create policy "Members can read photo records"
on public.work_order_photos for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create photo records" on public.work_order_photos;
create policy "Members can create photo records"
on public.work_order_photos for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_photos.company_id
  )
);

drop policy if exists "Members can read preventive schedules" on public.preventive_schedules;
create policy "Members can read preventive schedules"
on public.preventive_schedules for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create preventive schedules" on public.preventive_schedules;
create policy "Members can create preventive schedules"
on public.preventive_schedules for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and created_by = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = preventive_schedules.company_id
  )
);

drop policy if exists "Members can update preventive schedules" on public.preventive_schedules;
create policy "Members can update preventive schedules"
on public.preventive_schedules for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = preventive_schedules.company_id
  )
);

drop policy if exists "Members can read parts" on public.parts;
create policy "Members can read parts"
on public.parts for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create parts" on public.parts;
create policy "Members can create parts"
on public.parts for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

drop policy if exists "Members can update parts" on public.parts;
create policy "Members can update parts"
on public.parts for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

drop policy if exists "Managers can delete unused parts" on public.parts;
create policy "Managers can delete unused parts"
on public.parts for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = parts.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
  and not exists (
    select 1
    from public.work_order_parts wop
    where wop.part_id = parts.id
      and wop.company_id = parts.company_id
  )
);

drop policy if exists "Members can read work order parts" on public.work_order_parts;
create policy "Members can read work order parts"
on public.work_order_parts for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create work order parts" on public.work_order_parts;
create policy "Members can create work order parts"
on public.work_order_parts for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_parts.company_id
  )
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = work_order_parts.company_id
  )
);

drop policy if exists "Members can read part documents" on public.part_documents;
create policy "Members can read part documents"
on public.part_documents for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create part documents" on public.part_documents;
create policy "Members can create part documents"
on public.part_documents for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = part_documents.company_id
  )
);

drop policy if exists "Members can read work order events" on public.work_order_events;
create policy "Members can read work order events"
on public.work_order_events for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create work order events" on public.work_order_events;
create policy "Members can create work order events"
on public.work_order_events for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_events.company_id
  )
);

insert into storage.buckets (id, name, public)
values ('work-order-photos', 'work-order-photos', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('part-documents', 'part-documents', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('company-logos', 'company-logos', false)
on conflict (id) do nothing;

drop policy if exists "Members can upload work order photos" on storage.objects;
create policy "Members can upload work order photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'work-order-photos'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Members can read work order photos" on storage.objects;
create policy "Members can read work order photos"
on storage.objects for select
to authenticated
using (
  bucket_id = 'work-order-photos'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Upload owners can delete work order photos" on storage.objects;
create policy "Upload owners can delete work order photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'work-order-photos'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

drop policy if exists "Admins can delete work order photos" on storage.objects;
create policy "Admins can delete work order photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'work-order-photos'
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = (storage.foldername(name))[1]::uuid
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

drop policy if exists "Members can upload part documents" on storage.objects;
create policy "Members can upload part documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Members can read part documents storage" on storage.objects;
create policy "Members can read part documents storage"
on storage.objects for select
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Upload owners can delete part documents" on storage.objects;
create policy "Upload owners can delete part documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

drop policy if exists "Admins can upload company logos" on storage.objects;
create policy "Admins can upload company logos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'company-logos'
  and exists (
    select 1 from public.company_members cm
    where cm.company_id = (storage.foldername(name))[1]::uuid
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Members can read company logos" on storage.objects;
create policy "Members can read company logos"
on storage.objects for select
to authenticated
using (
  bucket_id = 'company-logos'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

create or replace function public.set_company_logo(target_company_id uuid, new_logo_path text)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only company admins or managers can update the company logo.';
  end if;

  update public.companies
  set logo_path = new_logo_path
  where id = target_company_id;
end;
$$;

grant execute on function public.set_company_logo(uuid, text) to authenticated;

notify pgrst, 'reload schema';
