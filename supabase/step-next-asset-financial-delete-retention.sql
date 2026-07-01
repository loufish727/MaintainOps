-- Retain finance history when operational equipment is deleted.
--
-- Existing asset_financials rows are archived before the assets row is removed.
-- The archived row keeps a snapshot of the operational equipment identity and
-- can later be explicitly deleted by admin/accounting from the Financial tab.

alter table public.asset_financials
add column if not exists archived_asset_id uuid,
add column if not exists archived_asset_name text,
add column if not exists archived_asset_type text,
add column if not exists archived_asset_code text,
add column if not exists archived_manufacturer text,
add column if not exists archived_model text,
add column if not exists archived_location_id uuid,
add column if not exists archived_location text,
add column if not exists operational_deleted_at timestamptz,
add column if not exists operational_deleted_by uuid references auth.users(id) on delete set null;

alter table public.asset_financials
alter column asset_id drop not null;

alter table public.asset_financials
drop constraint if exists asset_financials_asset_id_fkey;

alter table public.asset_financials
add constraint asset_financials_asset_id_fkey
foreign key (asset_id) references public.assets(id) on delete set null;

create index if not exists asset_financials_archived_asset_idx
on public.asset_financials(company_id, archived_asset_id)
where asset_id is null;

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

  return old;
end;
$$;

drop trigger if exists archive_asset_financial_before_delete on public.assets;
create trigger archive_asset_financial_before_delete
before delete on public.assets
for each row
execute function private.archive_asset_financial_before_delete();

drop policy if exists "Finance roles can insert asset financials" on public.asset_financials;
create policy "Finance roles can insert asset financials"
on public.asset_financials for insert
to authenticated
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and asset_financials.asset_id is not null
  and exists (
    select 1
    from public.assets a
    where a.id = asset_financials.asset_id
      and a.company_id = asset_financials.company_id
  )
);

drop policy if exists "Finance roles can update asset financials" on public.asset_financials;
create policy "Finance roles can update asset financials"
on public.asset_financials for update
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
)
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and (
    (
      asset_financials.asset_id is not null
      and exists (
        select 1
        from public.assets a
        where a.id = asset_financials.asset_id
          and a.company_id = asset_financials.company_id
      )
    )
    or (
      asset_financials.asset_id is null
      and asset_financials.archived_asset_id is not null
    )
  )
);

grant delete on public.asset_financials to authenticated;

drop policy if exists "Finance roles can delete archived asset financials" on public.asset_financials;
create policy "Finance roles can delete archived asset financials"
on public.asset_financials for delete
to authenticated
using (
  asset_financials.asset_id is null
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
);

notify pgrst, 'reload schema';
