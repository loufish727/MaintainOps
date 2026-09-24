begin;

alter table public.asset_events add column if not exists location_change jsonb;
alter table public.assets add column if not exists traveling_revision bigint not null default 0;

create or replace function private.stamp_traveling_revision()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'INSERT' then new.traveling_revision := 0;
  else
    new.traveling_revision := old.traveling_revision;
    if (old.asset_type = 'traveling_machine' or new.asset_type = 'traveling_machine')
      and (new.location_id is distinct from old.location_id or new.status is distinct from old.status or new.asset_type is distinct from old.asset_type) then
      new.traveling_revision := old.traveling_revision + 1;
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.stamp_traveling_revision() from public, anon, authenticated;
create trigger stamp_traveling_revision before insert or update on public.assets
for each row execute function private.stamp_traveling_revision();

create or replace function private.guard_traveling_location_event()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if (new.event_type = 'location_changed' or new.location_change is not null) and pg_trigger_depth() < 2 then
    raise exception 'Movement history is recorded by equipment updates only.' using errcode = '42501';
  end if;
  return new;
end;
$$;
revoke all on function private.guard_traveling_location_event() from public, anon, authenticated;
create trigger guard_traveling_location_event before insert on public.asset_events
for each row execute function private.guard_traveling_location_event();

create or replace function private.record_traveling_equipment_location()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare from_name text; to_name text;
begin
  if old.asset_type = 'traveling_machine' and new.location_id is distinct from old.location_id then
    select name into from_name from public.locations where id = old.location_id and company_id = old.company_id;
    select name into to_name from public.locations where id = new.location_id and company_id = new.company_id;
    insert into public.asset_events(company_id, asset_id, actor_id, event_type, summary, location_change, created_at)
    values (new.company_id, new.id, auth.uid(), 'location_changed',
      format('Moved from %s to %s. Area / spot cleared. Existing work, parts and financial records retained.', coalesce(from_name, 'Unassigned'), to_name),
      jsonb_build_object('from_id', old.location_id, 'to_id', new.location_id, 'from_name', from_name, 'to_name', to_name, 'revision', new.traveling_revision), clock_timestamp());
  end if;
  return new;
end;
$$;
revoke all on function private.record_traveling_equipment_location() from public, anon, authenticated;

-- One bounded read per visible page; counts do not depend on the loaded work queue.
create or replace function public.traveling_units_summary(p_company_id uuid, p_page integer default 1)
returns jsonb
language plpgsql stable security invoker set search_path = '' as $$
declare total bigint; page_number integer; units jsonb;
begin
  if auth.uid() is null or not private.is_company_member(p_company_id) then
    raise exception 'Company membership required.' using errcode = '42501';
  end if;
  if p_page is null or p_page < 1 then
    raise exception 'Choose a valid page.' using errcode = '22023';
  end if;
  select count(*) into total from public.assets a where a.company_id = p_company_id and a.asset_type = 'traveling_machine';
  page_number := least(p_page, greatest(1, ceil(total / 12.0)::integer));
  select coalesce(jsonb_agg(to_jsonb(result) order by result.asset->>'name', result.asset->>'id'), '[]'::jsonb) into units from (
  select to_jsonb(a) as asset, l.name as current_facility,
    coalesce(e.location_change->>'from_name', legacy.name) as previous_facility, e.created_at as moved_at, nullif(p.full_name, '') as moved_by,
    (select count(*) from public.work_orders w where w.company_id = p_company_id and w.asset_id = a.id and w.status <> 'completed') as open_work_count
  from (select * from public.assets where company_id = p_company_id and asset_type = 'traveling_machine' order by name, id limit 12 offset (page_number - 1) * 12) a
  left join public.locations l on l.id = a.location_id and l.company_id = p_company_id
  left join lateral (
    select ev.* from public.asset_events ev
    where ev.company_id = p_company_id and ev.asset_id = a.id and ev.event_type = 'location_changed'
    order by (ev.location_change->>'revision')::bigint desc nulls last, ev.created_at desc, ev.id desc limit 1
  ) e on true
  left join public.profiles p on p.company_id = p_company_id and p.user_id = e.actor_id
  -- Old events are never rewritten. Recognize only the exact historical formatter
  -- and an unambiguous same-company facility pair; otherwise leave previous unknown.
  left join lateral (
    select min(f.name) as name from public.locations f cross join public.locations t
    where e.location_change is null and f.company_id = p_company_id and t.company_id = p_company_id
      and e.summary = format('Moved from %s to %s. Area / spot cleared. Existing work, parts and financial records retained.', f.name, t.name)
    having count(*) = 1
  ) legacy on true
  ) result;
  return jsonb_build_object('total', total, 'page', page_number, 'units', units);
end;
$$;
revoke all on function public.traveling_units_summary(uuid, integer) from public, anon;
grant execute on function public.traveling_units_summary(uuid, integer) to authenticated;

create or replace function public.update_traveling_equipment_location(
  p_company_id uuid, p_asset_id uuid, p_location_id uuid, p_expected_location_id uuid, p_expected_revision bigint
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
  if equipment.location_id = p_location_id then return equipment; end if;
  if equipment.traveling_revision is distinct from p_expected_revision then
    raise exception 'This unit changed since you opened it. Reopen the update before saving.' using errcode = 'PT409';
  end if;
  return public.move_traveling_equipment(p_company_id, p_asset_id, p_location_id, p_expected_location_id);
end;
$$;
revoke all on function public.update_traveling_equipment_location(uuid, uuid, uuid, uuid, bigint) from public, anon;
grant execute on function public.update_traveling_equipment_location(uuid, uuid, uuid, uuid, bigint) to authenticated;

create or replace function public.update_traveling_equipment_condition(
  p_company_id uuid, p_asset_id uuid, p_status text, p_expected_status text, p_expected_location_id uuid, p_expected_revision bigint
) returns public.assets language plpgsql security invoker set search_path = '' as $$
declare equipment public.assets; previous_status text;
begin
  if auth.uid() is null or not private.is_company_operational_editor(p_company_id) then
    raise exception 'Equipment editing permission required.' using errcode = '42501';
  end if;
  if p_status is null or p_status not in ('running', 'watch', 'degraded', 'offline') then
    raise exception 'Choose a valid equipment condition.' using errcode = '22023';
  end if;
  select * into equipment from public.assets where id = p_asset_id and company_id = p_company_id for update;
  if not found or equipment.asset_type <> 'traveling_machine' then
    raise exception 'Traveling equipment not found.' using errcode = '22023';
  end if;
  if equipment.status = p_status then return equipment; end if;
  if equipment.status is distinct from p_expected_status or equipment.location_id is distinct from p_expected_location_id
    or equipment.traveling_revision is distinct from p_expected_revision then
    raise exception 'This unit changed since you opened it. Reopen the update before saving.' using errcode = 'PT409';
  end if;
  previous_status := equipment.status;
  update public.assets set status = p_status, updated_at = clock_timestamp()
  where id = p_asset_id and company_id = p_company_id returning * into equipment;
  insert into public.asset_events(company_id, asset_id, actor_id, event_type, summary)
  values (p_company_id, p_asset_id, auth.uid(), 'status_updated',
    format('Condition changed from %s to %s.', previous_status, p_status));
  return equipment;
end;
$$;
revoke all on function public.update_traveling_equipment_condition(uuid, uuid, text, text, uuid, bigint) from public, anon;
grant execute on function public.update_traveling_equipment_condition(uuid, uuid, text, text, uuid, bigint) to authenticated;

notify pgrst, 'reload schema';
commit;
