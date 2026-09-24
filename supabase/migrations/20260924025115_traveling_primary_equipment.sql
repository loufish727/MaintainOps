begin;

alter table public.assets drop constraint if exists assets_asset_type_check;
alter table public.assets add constraint assets_asset_type_check
  check (asset_type in ('machine', 'traveling_machine', 'forklift', 'secondary_machine', 'tooling', 'component', 'shop_item'));

-- Lock the proposed parent so classification and child attachment cannot race.
create or replace function private.guard_traveling_equipment()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare parent_type text;
begin
  if new.parent_asset_id is not null then
    select a.asset_type into parent_type from public.assets a
    where a.id = new.parent_asset_id and a.company_id = new.company_id for update;
    if parent_type = 'traveling_machine' then
      raise exception 'Traveling Primary travels alone. Do not attach sub equipment to it.' using errcode = '23514';
    end if;
  end if;
  if new.asset_type = 'traveling_machine' then
    if new.location_id is null or new.parent_asset_id is not null
       or exists (select 1 from public.assets a where a.parent_asset_id = new.id) then
      raise exception 'Traveling Primary requires a current facility and no parent or linked equipment. Resolve the equipment hierarchy first.' using errcode = '23514';
    end if;
  end if;
  if tg_op = 'UPDATE' and (old.asset_type = 'traveling_machine' or new.asset_type = 'traveling_machine') then
    if new.company_id is distinct from old.company_id then
      raise exception 'Traveling equipment cannot change company.' using errcode = '23514';
    end if;
    if new.location_id is distinct from old.location_id then
      if old.asset_type <> 'traveling_machine' or new.asset_type <> 'traveling_machine' then
        raise exception 'Save the equipment type separately before changing its location.' using errcode = '23514';
      end if;
      if auth.uid() is null or not private.is_company_operational_editor(old.company_id) then
        raise exception 'Equipment editing permission required.' using errcode = '42501';
      end if;
      -- Area names belong to the old facility. No work, stock, schedule or financial row is moved.
      new.location := null;
      new.updated_at := clock_timestamp();
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.guard_traveling_equipment() from public, anon, authenticated;
drop trigger if exists guard_traveling_equipment on public.assets;
create trigger guard_traveling_equipment before insert or update on public.assets
for each row execute function private.guard_traveling_equipment();

create or replace function private.record_traveling_equipment_location()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare from_name text; to_name text;
begin
  if old.asset_type = 'traveling_machine' and new.location_id is distinct from old.location_id then
    select name into from_name from public.locations where id = old.location_id and company_id = old.company_id;
    select name into to_name from public.locations where id = new.location_id and company_id = new.company_id;
    insert into public.asset_events(company_id, asset_id, actor_id, event_type, summary)
    values (new.company_id, new.id, auth.uid(), 'location_changed',
      format('Moved from %s to %s. Area / spot cleared. Existing work, parts and financial records retained.', coalesce(from_name, 'Unassigned'), to_name));
  end if;
  return new;
end;
$$;
revoke all on function private.record_traveling_equipment_location() from public, anon, authenticated;
drop trigger if exists record_traveling_equipment_location on public.assets;
create trigger record_traveling_equipment_location after update on public.assets
for each row execute function private.record_traveling_equipment_location();

create or replace function public.move_traveling_equipment(
  p_company_id uuid, p_asset_id uuid, p_location_id uuid, p_expected_location_id uuid
) returns public.assets language plpgsql security invoker set search_path = '' as $$
declare equipment public.assets;
begin
  if auth.uid() is null or not private.is_company_operational_editor(p_company_id) then
    raise exception 'Equipment editing permission required.' using errcode = '42501';
  end if;
  select * into equipment from public.assets where id = p_asset_id and company_id = p_company_id for update;
  if not found or equipment.asset_type <> 'traveling_machine' then
    raise exception 'Traveling equipment not found.' using errcode = '22023';
  end if;
  if p_location_id is null or not exists (select 1 from public.locations where id = p_location_id and company_id = p_company_id) then
    raise exception 'Choose a facility in this company.' using errcode = '22023';
  end if;
  -- A retry after a lost response is a no-op, not a duplicate history event.
  if equipment.location_id = p_location_id then return equipment; end if;
  if equipment.location_id is distinct from p_expected_location_id then
    raise exception 'This machine has already moved. Reopen its details before changing location.' using errcode = '40001';
  end if;
  update public.assets set location_id = p_location_id where id = p_asset_id and company_id = p_company_id returning * into equipment;
  return equipment;
end;
$$;
revoke all on function public.move_traveling_equipment(uuid, uuid, uuid, uuid) from public, anon;
grant execute on function public.move_traveling_equipment(uuid, uuid, uuid, uuid) to authenticated;
notify pgrst, 'reload schema';
commit;
