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

  if to_regclass('public.maintenance_requests') is not null
     and exists (
       select 1
       from information_schema.columns
       where table_schema = 'public'
         and table_name = 'maintenance_requests'
         and column_name = 'location_id'
     )
     and not exists (
       select 1 from pg_constraint
       where conname = 'maintenance_requests_company_location_fkey'
         and conrelid = 'public.maintenance_requests'::regclass
     ) then
    alter table public.maintenance_requests
    add constraint maintenance_requests_company_location_fkey
    foreign key (company_id, location_id)
    references public.locations(company_id, id)
    not valid;
  end if;
end;
$$;

drop policy if exists "Members can create assets" on public.assets;
create policy "Members can create assets"
on public.assets for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

drop policy if exists "Members can update assets" on public.assets;
create policy "Members can update assets"
on public.assets for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

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

do $$
begin
  if to_regclass('public.maintenance_requests') is not null
     and exists (
       select 1
       from information_schema.columns
       where table_schema = 'public'
         and table_name = 'maintenance_requests'
         and column_name = 'location_id'
     ) then
    execute 'drop policy if exists "Members can create maintenance requests" on public.maintenance_requests';
    execute $policy$
      create policy "Members can create maintenance requests"
      on public.maintenance_requests for insert
      to authenticated
      with check (
        private.is_company_member(company_id)
        and private.location_belongs_to_company(company_id, location_id)
        and requested_by = auth.uid()
      )
    $policy$;

    execute 'drop policy if exists "Members can update maintenance requests" on public.maintenance_requests';
    execute $policy$
      create policy "Members can update maintenance requests"
      on public.maintenance_requests for update
      to authenticated
      using (private.is_company_member(company_id))
      with check (
        private.is_company_member(company_id)
        and private.location_belongs_to_company(company_id, location_id)
      )
    $policy$;
  end if;
end;
$$;

notify pgrst, 'reload schema';
