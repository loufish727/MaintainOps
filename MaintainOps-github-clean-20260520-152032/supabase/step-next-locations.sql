create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (company_id, name)
);

alter table public.assets
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.work_orders
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.maintenance_requests
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.preventive_schedules
add column if not exists location_id uuid references public.locations(id) on delete set null;

alter table public.parts
add column if not exists location_id uuid references public.locations(id) on delete set null;

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

update public.maintenance_requests mr
set location_id = coalesce((select a.location_id from public.assets a where a.id = mr.asset_id), l.id)
from public.locations l
where mr.company_id = l.company_id
  and mr.location_id is null
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

create index if not exists locations_company_id_idx on public.locations(company_id);
create index if not exists assets_location_id_idx on public.assets(location_id);
create index if not exists work_orders_location_id_idx on public.work_orders(location_id);
create index if not exists maintenance_requests_location_id_idx on public.maintenance_requests(location_id);
create index if not exists preventive_schedules_location_id_idx on public.preventive_schedules(location_id);
create index if not exists parts_location_id_idx on public.parts(location_id);

grant select, insert, update on public.locations to authenticated;

alter table public.locations enable row level security;

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

notify pgrst, 'reload schema';
