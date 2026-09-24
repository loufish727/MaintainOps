begin;

-- Structural statements serialize before taking asset row locks. Ordinary
-- status/name edits do not take this gate. Relocation also excludes phantoms.
create or replace function private.serialize_equipment_structure()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if not pg_try_advisory_xact_lock(7241,1) then
    raise exception 'Another equipment structure update is saving. Your changes were not saved; review and try again.' using errcode='PT409';
  end if;
  return null;
end;
$$;
revoke all on function private.serialize_equipment_structure() from public,anon,authenticated;
create trigger serialize_equipment_structure before insert or delete or update of parent_asset_id,asset_type,location_id on public.assets
for each statement execute function private.serialize_equipment_structure();

create or replace function private.guard_traveling_equipment()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare parent_type text;
begin
  if new.parent_asset_id is not null and (tg_op='INSERT' or new.parent_asset_id is distinct from old.parent_asset_id) then
    select a.asset_type into parent_type from public.assets a
      where a.id=new.parent_asset_id and a.company_id=new.company_id for update;
    if parent_type='traveling_machine' then
      raise exception 'Traveling Primary travels alone. Do not attach sub equipment to it.' using errcode='23514';
    end if;
  end if;
  if new.asset_type='traveling_machine' then
    if new.location_id is null or new.parent_asset_id is not null
      or exists (select 1 from public.assets a where a.parent_asset_id=new.id) then
      raise exception 'Traveling Primary requires a current facility and no parent or linked equipment. Resolve the equipment hierarchy first.' using errcode='23514';
    end if;
  end if;
  if tg_op='UPDATE' and (old.asset_type='traveling_machine' or new.asset_type='traveling_machine') then
    if new.company_id is distinct from old.company_id then
      raise exception 'Traveling equipment cannot change company.' using errcode='23514';
    end if;
    if new.location_id is distinct from old.location_id then
      if old.asset_type<>'traveling_machine' or new.asset_type<>'traveling_machine' then
        raise exception 'Save the equipment type separately before changing its location.' using errcode='23514';
      end if;
      if auth.uid() is null or not private.is_company_operational_editor(old.company_id) then
        raise exception 'Equipment editing permission required.' using errcode='42501';
      end if;
      new.location:=null;
      new.updated_at:=clock_timestamp();
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.guard_traveling_equipment() from public,anon,authenticated;

-- Retain the existing token name for old clients; normal equipment needs it too.
create or replace function private.stamp_traveling_revision()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'INSERT' then new.traveling_revision := 0;
  else
    new.traveling_revision := old.traveling_revision;
    if row(new.location_id,new.status,new.asset_type,new.parent_asset_id)
       is distinct from row(old.location_id,old.status,old.asset_type,old.parent_asset_id) then
      new.traveling_revision := old.traveling_revision + 1;
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.stamp_traveling_revision() from public, anon, authenticated;

create or replace function private.guard_equipment_relocation()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'UPDATE' and new.company_id is distinct from old.company_id then
    raise exception 'Equipment cannot change company.' using errcode = '23514';
  end if;
  if tg_op = 'UPDATE' and new.asset_type is distinct from old.asset_type
    and (old.asset_type='traveling_machine' or new.asset_type='traveling_machine')
    and (auth.uid() is null or not exists (select 1 from public.company_members
      where company_id=old.company_id and user_id=auth.uid() and role in ('admin','manager'))) then
    raise exception 'Only managers and admins can change the Traveling Equipment classification.' using errcode='42501';
  end if;
  if tg_op = 'UPDATE' and old.asset_type <> 'traveling_machine' and new.location_id is distinct from old.location_id then
    if auth.uid() is null or not exists (select 1 from public.company_members
      where company_id=old.company_id and user_id=auth.uid() and role in ('admin','manager')) then
      raise exception 'Only managers and admins can relocate normal equipment.' using errcode = '42501';
    end if;
    if current_setting('maintainops.reviewed_equipment_relocation',true) is distinct from 'on' then
      raise exception 'Use Actions > Relocate Equipment to review this move. Reopen the app if this is an older equipment form.' using errcode = 'PT409';
    end if;
    if new.location_id is null or not private.location_belongs_to_company(new.company_id,new.location_id) then
      raise exception 'Choose a facility in this company.' using errcode = '22023';
    end if;
    new.location := null;
    new.updated_at := clock_timestamp();
  end if;
  if new.parent_asset_id is not null and (tg_op = 'INSERT' or new.parent_asset_id is distinct from old.parent_asset_id) then
    if exists (with recursive ancestors as (
      select id,parent_asset_id from public.assets where id=new.parent_asset_id and company_id=new.company_id
      union
      select a.id,a.parent_asset_id from public.assets a join ancestors p on a.id=p.parent_asset_id where a.company_id=new.company_id
    ) select 1 from ancestors where id=new.id) then
      raise exception 'Equipment cannot be its own ancestor.' using errcode = '23514';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.guard_equipment_relocation() from public, anon, authenticated;
create trigger guard_equipment_relocation before insert or update on public.assets
for each row execute function private.guard_equipment_relocation();

-- Deferred validation permits an entire reviewed branch to move atomically.
create or replace function private.check_equipment_facility_links()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare equipment public.assets;
begin
  if tg_op = 'UPDATE' and new.location_id is not distinct from old.location_id
    and new.parent_asset_id is not distinct from old.parent_asset_id then return null; end if;
  select * into equipment from public.assets where id=new.id and company_id=new.company_id;
  if not found then return null; end if;
  if exists (select 1 from public.assets p where p.id=equipment.parent_asset_id
      and (p.company_id is distinct from equipment.company_id or p.location_id is distinct from equipment.location_id))
    or exists (select 1 from public.assets c where c.parent_asset_id=equipment.id
      and (c.company_id is distinct from equipment.company_id or c.location_id is distinct from equipment.location_id)) then
    raise exception 'Linked equipment must share a facility. Review what moves and what stays behind.' using errcode = '23514';
  end if;
  return null;
end;
$$;
revoke all on function private.check_equipment_facility_links() from public, anon, authenticated;
create constraint trigger check_equipment_facility_links after insert or update on public.assets
deferrable initially deferred for each row execute function private.check_equipment_facility_links();

create or replace function private.record_equipment_relocation()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare from_name text; to_name text;
begin
  if old.asset_type <> 'traveling_machine' and new.location_id is distinct from old.location_id then
    select name into from_name from public.locations where id=old.location_id and company_id=old.company_id;
    select name into to_name from public.locations where id=new.location_id and company_id=new.company_id;
    insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary,location_change,created_at)
    values (new.company_id,new.id,auth.uid(),'location_changed',
      format('Relocated from %s to %s. Area / spot cleared. Work history, files, part links and financial records retained; existing orders and stock keep their facilities.',coalesce(from_name,'Unassigned'),to_name),
      jsonb_build_object('from_id',old.location_id,'to_id',new.location_id,'from_name',from_name,'to_name',to_name,'revision',new.traveling_revision),clock_timestamp());
  end if;
  return new;
end;
$$;
revoke all on function private.record_equipment_relocation() from public, anon, authenticated;
create trigger record_equipment_relocation after update on public.assets
for each row execute function private.record_equipment_relocation();

create or replace function public.equipment_relocation_review(p_company_id uuid,p_asset_id uuid)
returns jsonb language plpgsql stable security invoker set search_path = '' as $$
declare equipment public.assets; nodes jsonb; parent jsonb;
begin
  if auth.uid() is null or not exists (select 1 from public.company_members
    where company_id=p_company_id and user_id=auth.uid() and role in ('admin','manager')) then
    raise exception 'Only managers and admins can relocate normal equipment.' using errcode = '42501';
  end if;
  select * into equipment from public.assets where id=p_asset_id and company_id=p_company_id;
  if not found then raise exception 'Equipment not found.' using errcode = '22023'; end if;
  if equipment.asset_type='traveling_machine' then
    raise exception 'Use Update Location for Traveling Equipment.' using errcode = '22023';
  end if;
  with recursive tree as (
    select a.id,a.name,a.parent_asset_id,a.location_id,a.asset_type,a.status,a.traveling_revision,
      array[a.id] as path,false as cycle from public.assets a where a.id=p_asset_id and a.company_id=p_company_id
    union all
    select a.id,a.name,a.parent_asset_id,a.location_id,a.asset_type,a.status,a.traveling_revision,
      t.path||a.id,a.id=any(t.path) from public.assets a join tree t on a.parent_asset_id=t.id
    where a.company_id=p_company_id and not t.cycle and cardinality(t.path)<64
  ) select jsonb_agg(to_jsonb(r) order by r.id) into nodes from (
    select t.id,t.name,t.parent_asset_id,t.location_id,t.asset_type,t.status,t.traveling_revision,
      t.path[2] as branch_id,cardinality(t.path)-1 as depth,t.cycle,l.name as facility
    from tree t left join public.locations l on l.id=t.location_id and l.company_id=p_company_id limit 251
  ) r;
  if jsonb_array_length(nodes)>250 or exists (select 1 from jsonb_array_elements(nodes) n
    where (n->>'cycle')::boolean or (n->>'depth')::integer>=63) then
    raise exception 'This hierarchy is too large or contains a loop. Review its structure before relocating.' using errcode='22023';
  end if;
  if exists (select 1 from jsonb_array_elements(nodes) n where (n->>'location_id')::uuid is distinct from equipment.location_id) then
    raise exception 'Linked equipment spans multiple facilities. Resolve those links before relocating.' using errcode='23514';
  end if;
  select jsonb_build_object('id',id,'name',name,'location_id',location_id,'revision',traveling_revision)
    into parent from public.assets where id=equipment.parent_asset_id and company_id=p_company_id;
  return jsonb_build_object('nodes',nodes,'parent',parent,'token',md5(jsonb_build_array(nodes,parent)::text));
end;
$$;
revoke all on function public.equipment_relocation_review(uuid,uuid) from public,anon;
grant execute on function public.equipment_relocation_review(uuid,uuid) to authenticated;

create or replace function public.relocate_equipment(
  p_company_id uuid,p_asset_id uuid,p_location_id uuid,p_move_branch_ids uuid[],p_review_token text
) returns jsonb language plpgsql security invoker set search_path = '' set lock_timeout = '3s' as $$
declare review jsonb; equipment public.assets; moving uuid[]; staying uuid[]; changed uuid[];
  destination text; old_parent uuid; item record; previous_review_setting text;
begin
  if auth.uid() is null or not exists (select 1 from public.company_members
    where company_id=p_company_id and user_id=auth.uid() and role in ('admin','manager')) then
    raise exception 'Only managers and admins can relocate normal equipment.' using errcode='42501';
  end if;
  -- Rare multi-row operation: also exclude concurrent new children and deletes.
  -- Reads remain available; ordinary saves acquire no additional table locks.
  lock table public.assets in share row exclusive mode;
  review := public.equipment_relocation_review(p_company_id,p_asset_id);
  if p_review_token is null or p_review_token is distinct from review->>'token' then
    raise exception 'Equipment changed since this review. Review again before relocating.' using errcode='PT409';
  end if;
  select * into equipment from public.assets where id=p_asset_id and company_id=p_company_id;
  select name into destination from public.locations where id=p_location_id and company_id=p_company_id;
  if destination is null or p_location_id is not distinct from equipment.location_id then
    raise exception 'Choose a different facility in this company.' using errcode='22023';
  end if;
  if p_move_branch_ids is null or exists (select 1 from unnest(p_move_branch_ids) branch where branch is null or not exists (
    select 1 from jsonb_array_elements(review->'nodes') n where (n->>'id')::uuid=branch and (n->>'parent_asset_id')::uuid=p_asset_id)) then
    raise exception 'Choose attached branches from this review.' using errcode='22023';
  end if;
  select array_agg((n->>'id')::uuid) into moving from jsonb_array_elements(review->'nodes') n
    where (n->>'id')::uuid=p_asset_id or (n->>'branch_id')::uuid=any(p_move_branch_ids);
  select coalesce(array_agg((n->>'id')::uuid),'{}'::uuid[]) into staying from jsonb_array_elements(review->'nodes') n
    where (n->>'parent_asset_id')::uuid=p_asset_id and not (n->>'id')::uuid=any(p_move_branch_ids);
  old_parent := equipment.parent_asset_id;
  changed := moving||staying;
  for item in select a.id,a.name,a.parent_asset_id,p.name as parent_name from public.assets a
    join public.assets p on p.id=a.parent_asset_id and p.company_id=p_company_id
    where a.company_id=p_company_id and (a.id=p_asset_id or a.id=any(staying)) loop
    insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary)
    values (p_company_id,item.id,auth.uid(),'hierarchy_changed',format('Unlinked from %s during relocation of %s to %s. Equipment records retained.',item.parent_name,equipment.name,destination)),
      (p_company_id,item.parent_asset_id,auth.uid(),'hierarchy_changed',format('%s unlinked during relocation of %s to %s. Equipment records retained.',item.name,equipment.name,destination));
  end loop;
  update public.assets set parent_asset_id=null,updated_at=clock_timestamp()
    where company_id=p_company_id and (id=p_asset_id or id=any(staying)) and parent_asset_id is not null;
  previous_review_setting := current_setting('maintainops.reviewed_equipment_relocation',true);
  perform set_config('maintainops.reviewed_equipment_relocation','on',true);
  update public.assets set location_id=p_location_id where company_id=p_company_id and id=any(moving);
  perform set_config('maintainops.reviewed_equipment_relocation',coalesce(previous_review_setting,''),true);
  -- Surface any final relationship failure before returning a success payload.
  set constraints public.check_equipment_facility_links immediate;
  return jsonb_build_object('assets',(select jsonb_agg(to_jsonb(a) order by a.id) from public.assets a where a.company_id=p_company_id and a.id=any(changed)),
    'events',(select coalesce(jsonb_agg(to_jsonb(e)),'[]'::jsonb) from public.asset_events e
      where e.company_id=p_company_id and (e.asset_id=any(changed) or e.asset_id=old_parent) and e.created_at>=transaction_timestamp()),
    'moved_count',cardinality(moving),'detached_ids',to_jsonb(staying||case when old_parent is not null then array[p_asset_id] else '{}'::uuid[] end));
end;
$$;
revoke all on function public.relocate_equipment(uuid,uuid,uuid,uuid[],text) from public,anon;
grant execute on function public.relocate_equipment(uuid,uuid,uuid,uuid[],text) to authenticated;

notify pgrst,'reload schema';
commit;
