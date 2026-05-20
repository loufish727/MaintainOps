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
add column if not exists safety_check_required boolean not null default false;

create index if not exists assets_parent_asset_id_idx on public.assets(parent_asset_id);
create index if not exists assets_company_parent_asset_id_idx on public.assets(company_id, parent_asset_id);
create index if not exists assets_company_asset_type_idx on public.assets(company_id, asset_type);
create index if not exists work_orders_safety_check_required_idx on public.work_orders(company_id, safety_check_required);

alter table public.work_orders
drop constraint if exists work_orders_asset_completion_safety_check;

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
end $$;

update public.work_orders wo
set safety_check_required = coalesce(a.safety_devices_required, true)
from public.assets a
where wo.asset_id = a.id
  and wo.company_id = a.company_id;

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

notify pgrst, 'reload schema';
