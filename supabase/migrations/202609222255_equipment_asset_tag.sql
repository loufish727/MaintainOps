begin;
set local lock_timeout = '5s';

-- Operational identifiers are separate from accounting's fixed asset number.
alter table public.assets add column if not exists asset_tag text;
alter table public.asset_financials add column if not exists archived_asset_tag text;

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
      archived_asset_tag = old.asset_tag,
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
      company_id, asset_id, archived_asset_id, archived_asset_name,
      archived_asset_type, archived_asset_code, archived_asset_tag,
      archived_manufacturer, archived_model, archived_location_id,
      archived_location, operational_deleted_at, operational_deleted_by, needs_review
    ) values (
      old.company_id, null, old.id, old.name,
      old.asset_type, old.asset_code, old.asset_tag,
      old.manufacturer, old.model, old.location_id,
      old.location, now(), auth.uid(), true
    );
  end if;

  return old;
end;
$$;

commit;
