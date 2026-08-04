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
  role text not null default 'member' check (role in ('admin', 'manager', 'accounting', 'production', 'technician', 'member')),
  default_location_id uuid,
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

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'company_members_default_location_id_fkey'
      and conrelid = 'public.company_members'::regclass
  ) then
    alter table public.company_members
      add constraint company_members_default_location_id_fkey
      foreign key (default_location_id)
      references public.locations(id)
      on delete set null;
  end if;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null default '',
  mobile_tech boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  shop_reference_favorites jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_preferences_shop_reference_favorites_array
    check (jsonb_typeof(shop_reference_favorites) = 'array')
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  parent_asset_id uuid references public.assets(id) on delete set null,
  name text not null,
  asset_code text,
  manufacturer text,
  model text,
  asset_type text not null default 'machine' check (asset_type in ('machine', 'secondary_machine', 'tooling', 'component', 'shop_item')),
  safety_devices_required boolean not null default true,
  location text,
  status text not null default 'running' check (status in ('running', 'watch', 'degraded', 'offline')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.asset_financials (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid references public.assets(id) on delete set null,
  archived_asset_id uuid,
  archived_asset_name text,
  archived_asset_type text,
  archived_asset_code text,
  archived_manufacturer text,
  archived_model text,
  archived_location_id uuid,
  archived_location text,
  operational_deleted_at timestamptz,
  operational_deleted_by uuid references auth.users(id) on delete set null,
  asset_tag text,
  acquisition_date date,
  acquisition_cost numeric(14, 2),
  depreciation_method text,
  useful_life_years numeric(6, 2),
  current_book_value numeric(14, 2),
  tax_jurisdiction text,
  ownership_status text check (ownership_status in ('owned', 'leased', 'rented', 'disposed') or ownership_status is null),
  in_service_date date,
  disposal_date date,
  disposal_notes text,
  gl_account_code text,
  cost_center text,
  finance_notes text,
  needs_review boolean not null default true,
  last_reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (asset_id),
  unique (company_id, asset_id)
);

create table if not exists public.work_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  asset_id uuid references public.assets(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  type text not null default 'corrective' check (type in ('corrective', 'preventive', 'fabrication')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'blocked', 'completed')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'critical')),
  priority_rank smallint generated always as (
    case priority
      when 'critical' then 4
      when 'high' then 3
      when 'medium' then 2
      when 'low' then 1
      else 0
    end
  ) stored,
  due_at date,
  created_by uuid not null references auth.users(id) on delete restrict,
  actual_minutes integer not null default 0,
  failure_cause text,
  resolution_summary text,
  follow_up_needed boolean not null default false,
  completion_notes text,
  completed_at timestamptz,
  production_action text,
  production_action_assigned_to uuid,
  production_action_status text check (production_action_status in ('open', 'completed') or production_action_status is null),
  production_action_created_by uuid references auth.users(id) on delete set null,
  production_action_created_at timestamptz,
  production_action_completed_by uuid references auth.users(id) on delete set null,
  production_action_completed_at timestamptz,
  safety_devices_checked boolean not null default false,
  safety_devices_checked_at timestamptz,
  safety_check_required boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint work_orders_production_action_consistency_check check (
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
  ),
  constraint work_orders_production_action_completion_check check (
    status <> 'completed' or production_action_status is distinct from 'open'
  )
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
  created_by uuid references auth.users(id) on delete set null,
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

create table if not exists public.asset_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  event_type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.applied_migrations (
  id uuid primary key default gen_random_uuid(),
  filename text not null unique,
  applied_at timestamptz not null default now(),
  project_ref text,
  applied_by uuid references auth.users(id) on delete set null,
  applied_by_note text,
  verification text,
  rollback_note text,
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
add column if not exists created_by uuid references auth.users(id) on delete set null;

create or replace function private.set_asset_created_by()
returns trigger
language plpgsql
set search_path = public, private, pg_temp
as $$
begin
  if new.created_by is null then
    new.created_by := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists assets_set_created_by_trigger on public.assets;
create trigger assets_set_created_by_trigger
before insert on public.assets
for each row execute function private.set_asset_created_by();

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
add column if not exists type text not null default 'corrective'
check (type in ('corrective', 'preventive', 'fabrication'));

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
    check (asset_type in ('machine', 'secondary_machine', 'tooling', 'component', 'shop_item'))
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

  if not exists (
    select 1 from pg_constraint where conname = 'work_orders_company_production_action_assigned_profile_fkey'
  ) then
    alter table public.work_orders
      add constraint work_orders_company_production_action_assigned_profile_fkey
      foreign key (company_id, production_action_assigned_to)
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
create index if not exists work_orders_company_production_action_idx
on public.work_orders(company_id, production_action_assigned_to, production_action_status)
where production_action_assigned_to is not null;
create index if not exists work_orders_safety_check_required_idx on public.work_orders(company_id, safety_check_required);
create index if not exists work_orders_company_location_priority_idx on public.work_orders(company_id, location_id, priority_rank desc, created_at desc);
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
create index if not exists work_order_parts_created_by_idx on public.work_order_parts(created_by);
create index if not exists part_documents_company_id_idx on public.part_documents(company_id);
create index if not exists part_documents_part_id_idx on public.part_documents(part_id);
create index if not exists work_order_events_company_id_idx on public.work_order_events(company_id);
create index if not exists work_order_events_work_order_id_idx on public.work_order_events(work_order_id);
create index if not exists asset_events_company_id_idx on public.asset_events(company_id);
create index if not exists asset_events_asset_id_idx on public.asset_events(asset_id);
create index if not exists asset_events_company_asset_created_idx on public.asset_events(company_id, asset_id, created_at desc);
create index if not exists asset_financials_company_idx on public.asset_financials(company_id);
create index if not exists asset_financials_asset_idx on public.asset_financials(asset_id);
create index if not exists asset_financials_review_idx on public.asset_financials(company_id, needs_review);

grant usage on schema public to authenticated;
grant select, insert, update on public.companies to authenticated;
grant select, insert, update on public.company_members to authenticated;
grant select, insert, update on public.locations to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.user_preferences to authenticated;
grant select, insert, update, delete on public.assets to authenticated;
grant select, insert, update, delete on public.asset_financials to authenticated;
grant select, insert, update, delete on public.work_orders to authenticated;
grant select, insert on public.work_order_comments to authenticated;
grant select, insert, delete on public.work_order_photos to authenticated;
grant select, insert, update on public.preventive_schedules to authenticated;
grant select, insert, update, delete on public.parts to authenticated;
grant select, insert on public.work_order_parts to authenticated;
grant select, insert on public.part_documents to authenticated;
grant select, insert on public.work_order_events to authenticated;
grant select, insert on public.asset_events to authenticated;
grant select on public.applied_migrations to authenticated;

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

    select cm.role into target_role
    from public.company_members cm
    where cm.company_id = new.company_id
      and cm.user_id = new.production_action_assigned_to;

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

  select cm.role into actor_role
  from public.company_members cm
  where cm.company_id = new.company_id
    and cm.user_id = auth.uid();

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

    select cm.role into target_role
    from public.company_members cm
    where cm.company_id = new.company_id
      and cm.user_id = new.production_action_assigned_to;

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

    select cm.role into target_role
    from public.company_members cm
    where cm.company_id = new.company_id
      and cm.user_id = new.production_action_assigned_to;

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
  where p.company_id = new.company_id
    and p.user_id = assignee_id;

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
    select 1
    from public.work_orders wo
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
  where cm.company_id = new.company_id
    and cm.user_id = auth.uid();

  if actor_role is null then raise exception 'Not a member of this company.'; end if;
  if actor_role in ('admin', 'manager') then return new; end if;

  if tg_op = 'INSERT' then
    new_has_vendor_note := coalesce(new.description, '') like '%[Assignment: Outside vendor]%';
    if new.assigned_to is not null and new.assigned_to <> auth.uid() then
      raise exception 'Technician and Production users can only assign new work to themselves or leave it unassigned.';
    end if;
    if new_has_vendor_note then
      raise exception 'Only managers or admins can assign work to an outside vendor.';
    end if;
    return new;
  end if;

  new_has_vendor_note := coalesce(new.description, '') like '%[Assignment: Outside vendor]%';
  old_has_vendor_note := coalesce(old.description, '') like '%[Assignment: Outside vendor]%';
  if new.assigned_to is distinct from old.assigned_to then
    if old.assigned_to is null and not old_has_vendor_note and new.assigned_to = auth.uid() then
      return new;
    end if;
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
  normalized_company_name text;
  existing_company_id uuid;
  new_company_id uuid;
  user_name text;
begin
  if auth.uid() is null then
    raise exception 'Authentication is required to create a company.';
  end if;

  normalized_company_name := btrim(coalesce(company_name, ''));

  if normalized_company_name = '' then
    raise exception 'Company name is required.';
  end if;

  select c.id
  into existing_company_id
  from public.companies c
  join public.company_members cm
    on cm.company_id = c.id
   and cm.user_id = auth.uid()
  where lower(btrim(c.name)) = lower(normalized_company_name)
  order by
    case when cm.default_location_id is not null then 0 else 1 end,
    case when cm.role = 'admin' then 0 else 1 end,
    c.created_at asc
  limit 1;

  if existing_company_id is not null then
    return existing_company_id;
  end if;

  insert into public.companies (name, created_by)
  values (normalized_company_name, auth.uid())
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

grant execute on function public.create_company(text) to authenticated;
grant execute on function public.ensure_company_profile(uuid) to authenticated;

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
    select
      wo.status,
      wo.due_at,
      wo.completed_at,
      wo.assigned_to,
      wo.created_by,
      wo.production_action_assigned_to,
      wo.production_action_status
    from public.work_orders wo
    where wo.company_id = target_company_id
      and (target_location_id is null or wo.location_id = target_location_id)
  ),
  my_work_orders as (
    select *
    from scoped_work_orders wo
    where
      (target_my_work_filter = 'created' and wo.created_by = auth.uid())
      or
      (
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
      count(*) filter (
        where completed_at >= target_week_start
          and completed_at < target_week_end
      )::integer as completed_week
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
      count(*) filter (
        where completed_at >= target_week_start
          and completed_at < target_week_end
      )::integer as completed_week
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
  )
  into result
  from company_counts
  cross join my_counts;

  return result;
end;
$$;

revoke all on function public.get_workspace_work_order_counts(
  uuid,
  uuid,
  text,
  date,
  timestamptz,
  timestamptz,
  timestamptz
) from public, anon;

grant execute on function public.get_workspace_work_order_counts(
  uuid,
  uuid,
  text,
  date,
  timestamptz,
  timestamptz,
  timestamptz
) to authenticated;

create or replace function public.record_applied_migration(
  migration_filename text,
  migration_project_ref text default null,
  migration_verification text default null,
  migration_rollback_note text default null,
  migration_applied_by_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  migration_id uuid;
begin
  select cm.role
  into actor_role
  from public.company_members cm
  where cm.user_id = auth.uid()
    and cm.role = 'admin'
  limit 1;

  if actor_role is distinct from 'admin' then
    raise exception 'Only admins can record applied migrations.';
  end if;

  insert into public.applied_migrations (
    filename,
    project_ref,
    applied_by,
    applied_by_note,
    verification,
    rollback_note
  )
  values (
    migration_filename,
    migration_project_ref,
    auth.uid(),
    migration_applied_by_note,
    migration_verification,
    migration_rollback_note
  )
  on conflict (filename) do update
  set
    applied_at = now(),
    project_ref = excluded.project_ref,
    applied_by = excluded.applied_by,
    applied_by_note = excluded.applied_by_note,
    verification = excluded.verification,
    rollback_note = excluded.rollback_note
  returning id into migration_id;

  return migration_id;
end;
$$;

revoke all on function public.record_applied_migration(text, text, text, text, text) from public, anon;
grant execute on function public.record_applied_migration(text, text, text, text, text) to authenticated;

alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.locations enable row level security;
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.assets enable row level security;
alter table public.asset_financials enable row level security;
alter table public.work_orders enable row level security;
alter table public.work_order_comments enable row level security;
alter table public.work_order_photos enable row level security;
alter table public.preventive_schedules enable row level security;
alter table public.parts enable row level security;
alter table public.work_order_parts enable row level security;
alter table public.part_documents enable row level security;
alter table public.work_order_events enable row level security;
alter table public.asset_events enable row level security;
alter table public.applied_migrations enable row level security;

drop policy if exists "Admins can read applied migrations" on public.applied_migrations;
create policy "Admins can read applied migrations"
on public.applied_migrations for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

revoke all on public.applied_migrations from public, anon;

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
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can update locations" on public.locations;
create policy "Members can update locations"
on public.locations for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (private.is_company_operational_editor(company_id));

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

drop policy if exists "Users can read their preferences" on public.user_preferences;
create policy "Users can read their preferences"
on public.user_preferences for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create their preferences" on public.user_preferences;
create policy "Users can create their preferences"
on public.user_preferences for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can update their preferences" on public.user_preferences;
create policy "Users can update their preferences"
on public.user_preferences for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

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
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and private.asset_belongs_to_company(company_id, parent_asset_id)
);

drop policy if exists "Members can update assets" on public.assets;
create policy "Members can update assets"
on public.assets for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
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
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_photos.company_id
  )
);

drop policy if exists "Upload owners and managers can delete photo records" on public.work_order_photos;
create policy "Upload owners and managers can delete photo records"
on public.work_order_photos for delete
to authenticated
using (
  private.is_company_operational_editor(company_id)
  and (
    uploaded_by = auth.uid()
    or exists (
      select 1
      from public.company_members cm
      where cm.company_id = work_order_photos.company_id
        and cm.user_id = auth.uid()
        and cm.role in ('admin', 'manager')
    )
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
  private.is_company_operational_editor(company_id)
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
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

drop policy if exists "Members can update parts" on public.parts;
create policy "Members can update parts"
on public.parts for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
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
  private.is_company_operational_editor(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_events.company_id
  )
);

drop policy if exists "Members can read asset events" on public.asset_events;
create policy "Members can read asset events"
on public.asset_events for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create asset events" on public.asset_events;
create policy "Members can create asset events"
on public.asset_events for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_events.company_id
  )
);

create or replace function private.archive_asset_financial_before_delete()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  update public.asset_financials af
  set asset_id = null,
      archived_asset_id = old.id,
      archived_asset_name = old.name,
      archived_asset_type = old.asset_type,
      archived_asset_code = old.asset_code,
      archived_manufacturer = old.manufacturer,
      archived_model = old.model,
      archived_location_id = old.location_id,
      archived_location = old.location,
      operational_deleted_at = now(),
      operational_deleted_by = auth.uid(),
      updated_at = now()
  where af.asset_id = old.id
    and af.company_id = old.company_id;

  if not found then
    insert into public.asset_financials (
      company_id,
      asset_id,
      archived_asset_id,
      archived_asset_name,
      archived_asset_type,
      archived_asset_code,
      archived_manufacturer,
      archived_model,
      archived_location_id,
      archived_location,
      operational_deleted_at,
      operational_deleted_by,
      needs_review
    )
    values (
      old.company_id,
      null,
      old.id,
      old.name,
      old.asset_type,
      old.asset_code,
      old.manufacturer,
      old.model,
      old.location_id,
      old.location,
      now(),
      auth.uid(),
      true
    );
  end if;

  return old;
end;
$$;

drop trigger if exists archive_asset_financial_before_delete on public.assets;
create trigger archive_asset_financial_before_delete
before delete on public.assets
for each row
execute function private.archive_asset_financial_before_delete();

drop policy if exists "Company members can read asset financials" on public.asset_financials;
drop policy if exists "Financial roles can read asset financials" on public.asset_financials;
create policy "Financial roles can read asset financials"
on public.asset_financials for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager', 'accounting')
  )
);

drop policy if exists "Finance roles can insert asset financials" on public.asset_financials;
create policy "Finance roles can insert asset financials"
on public.asset_financials for insert
to authenticated
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and asset_financials.asset_id is not null
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_financials.company_id
  )
);

drop policy if exists "Finance roles can update asset financials" on public.asset_financials;
create policy "Finance roles can update asset financials"
on public.asset_financials for update
to authenticated
using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and (
    (
      asset_financials.asset_id is not null
      and exists (
        select 1 from public.assets a
        where a.id = asset_id
          and a.company_id = asset_financials.company_id
      )
    )
    or (
      asset_financials.asset_id is null
      and asset_financials.archived_asset_id is not null
    )
  )
);

drop policy if exists "Finance roles can delete archived asset financials" on public.asset_financials;
create policy "Finance roles can delete archived asset financials"
on public.asset_financials for delete
to authenticated
using (
  asset_financials.asset_id is null
  and exists (
    select 1 from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
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

update storage.buckets
set file_size_limit = 26214400,
    allowed_mime_types = array[
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/heic',
      'image/heif'
    ]
where id = 'company-logos';

drop policy if exists "Members can upload work order photos" on storage.objects;
create policy "Members can upload work order photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'work-order-photos'
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
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
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
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
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
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
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
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
