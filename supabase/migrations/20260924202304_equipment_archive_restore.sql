begin;

alter table public.assets
  add column archived_at timestamptz,
  add column archived_by uuid references auth.users(id) on delete set null,
  add column archive_reason text check (archive_reason in ('sold','scrapped','delete','other')),
  add column archive_notes text check (length(archive_notes)<=2000),
  add column archive_batch_id uuid;
alter table public.assets add constraint assets_archive_state_check check (
  (archived_at is null and archived_by is null and archive_reason is null and archive_notes is null and archive_batch_id is null)
  or (archived_at is not null and archive_reason is not null and archive_batch_id is not null)
);
create index assets_company_archived_idx on public.assets(company_id,archived_at desc,id) where archived_at is not null;
alter table public.preventive_schedules add column equipment_archive_paused boolean not null default false;

create or replace function private.can_archive_equipment(p_company_id uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select auth.uid() is not null and exists (select 1 from public.company_members
    where company_id=p_company_id and user_id=auth.uid() and role in ('admin','manager'));
$$;
revoke all on function private.can_archive_equipment(uuid) from public,anon;
grant execute on function private.can_archive_equipment(uuid) to authenticated;

-- Old clients must not be able to erase the record before learning about archives.
revoke delete on public.assets from authenticated;
create or replace function private.guard_equipment_archive_state()
returns trigger language plpgsql security invoker set search_path='' as $$
declare target public.assets;
begin
  if tg_op='DELETE' then
    if current_user in ('authenticated','anon') then
      raise exception 'Use Archive / Delete Equipment. Equipment and history are retained.' using errcode='42501';
    end if;
    return old;
  end if;
  if tg_op='UPDATE' and old.archived_at is not null and new.archived_at is not null and to_jsonb(new) is distinct from to_jsonb(old) then
    raise exception 'Archived equipment is read-only. Restore it before changing it.' using errcode='23514';
  end if;
  if current_user in ('authenticated','anon') then
    if tg_op='INSERT' and (new.archived_at is not null or new.archive_reason is not null or new.archive_batch_id is not null or new.archived_by is not null or new.archive_notes is not null) then
      raise exception 'Use Archive / Delete Equipment.' using errcode='42501';
    elsif tg_op='UPDATE' and (old.archived_at is not null or
      row(new.archived_at,new.archived_by,new.archive_reason,new.archive_notes,new.archive_batch_id)
        is distinct from row(old.archived_at,old.archived_by,old.archive_reason,old.archive_notes,old.archive_batch_id)) then
      raise exception 'Archived equipment is read-only. Use the manager archive/restore action.' using errcode='42501';
    end if;
  end if;
  if new.parent_asset_id is not null and (tg_op='INSERT' or new.parent_asset_id is distinct from old.parent_asset_id) then
    select * into target from public.assets where id=new.parent_asset_id and company_id=new.company_id for share;
    if target.archived_at is not null and new.archived_at is null then
      raise exception 'Active equipment cannot be attached to archived equipment.' using errcode='23514';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.guard_equipment_archive_state() from public,anon,authenticated;
create trigger guard_equipment_archive_state before insert or update or delete on public.assets
for each row execute function private.guard_equipment_archive_state();

-- The share lock makes reference writes serialize with archive/restore row locks.
create or replace function private.guard_archived_equipment_reference()
returns trigger language plpgsql security invoker set search_path='' as $$
declare target public.assets; row_data jsonb; old_data jsonb;
begin
  row_data:=case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
  if tg_op='UPDATE' then old_data:=to_jsonb(old); end if;
  if tg_op='UPDATE' and old_data->>'company_id' is distinct from row_data->>'company_id' then
    raise exception 'Operational records cannot change company.' using errcode='23514';
  end if;
  if tg_table_name='asset_events' and current_user in ('authenticated','anon') and (
    row_data->>'event_type' in ('archived','restored','pm_resumed') or old_data->>'event_type' in ('archived','restored','pm_resumed')) then
    raise exception 'Equipment lifecycle history is recorded by archive and restore actions only.' using errcode='42501';
  end if;
  if tg_op='UPDATE' and old_data->>'asset_id' is not null and old_data->>'asset_id' is distinct from row_data->>'asset_id' then
    select * into target from public.assets where id=(old_data->>'asset_id')::uuid and company_id=(old_data->>'company_id')::uuid for share;
    if not found and current_user in ('authenticated','anon') then raise exception 'Equipment reference is not available for changes.' using errcode='42501'; end if;
    if target.archived_at is not null then raise exception 'Archived equipment history cannot be detached. Restore the equipment first.' using errcode='23514'; end if;
  end if;
  if row_data->>'asset_id' is null then return coalesce(new,old); end if;
  select * into target from public.assets where id=(row_data->>'asset_id')::uuid
    and company_id=(row_data->>'company_id')::uuid for share;
  if not found and current_user in ('authenticated','anon') then raise exception 'Equipment reference is not available for changes.' using errcode='42501'; end if;
  if not found or target.archived_at is null then return coalesce(new,old); end if;
  if tg_table_name='asset_events' and current_user not in ('authenticated','anon') then return coalesce(new,old); end if;
  if tg_table_name='preventive_schedules' and current_user not in ('authenticated','anon') then return coalesce(new,old); end if;
  raise exception 'This equipment is archived. Restore it before adding or changing operational records.' using errcode='23514';
end;
$$;
revoke all on function private.guard_archived_equipment_reference() from public,anon,authenticated;
create trigger guard_archived_equipment_reference before insert or update or delete on public.work_orders
for each row execute function private.guard_archived_equipment_reference();
create trigger guard_archived_equipment_reference before insert or update or delete on public.maintenance_requests
for each row execute function private.guard_archived_equipment_reference();
create trigger guard_archived_equipment_reference before insert or update or delete on public.preventive_schedules
for each row execute function private.guard_archived_equipment_reference();
create trigger guard_archived_equipment_reference before insert or update or delete on public.asset_parts
for each row execute function private.guard_archived_equipment_reference();
create trigger guard_archived_equipment_reference before insert or update or delete on public.asset_documents
for each row execute function private.guard_archived_equipment_reference();
create trigger guard_archived_equipment_reference before insert or update or delete on public.asset_events
for each row execute function private.guard_archived_equipment_reference();

create or replace function private.equipment_storage_writable(object_name text)
returns boolean language plpgsql security definer set search_path='' as $$
declare equipment public.assets; company_key uuid; asset_key uuid;
begin
  begin
    company_key:=split_part(object_name,'/',1)::uuid;
    asset_key:=split_part(object_name,'/',2)::uuid;
  exception when invalid_text_representation then return false; end;
  if auth.uid() is null or not private.is_company_operational_editor(company_key) then return false; end if;
  select * into equipment from public.assets a where a.id=asset_key and a.company_id=company_key for share;
  return found and equipment.archived_at is null;
end;
$$;
revoke all on function private.equipment_storage_writable(text) from public,anon;
grant execute on function private.equipment_storage_writable(text) to authenticated;
create policy "Archived equipment files cannot be uploaded" on storage.objects as restrictive for insert to authenticated
with check (bucket_id<>'asset-documents' or private.equipment_storage_writable(name));
create policy "Archived equipment files cannot be replaced" on storage.objects as restrictive for update to authenticated
using (bucket_id<>'asset-documents' or private.equipment_storage_writable(name))
with check (bucket_id<>'asset-documents' or private.equipment_storage_writable(name));
create policy "Archived equipment files cannot be removed" on storage.objects as restrictive for delete to authenticated
using (bucket_id<>'asset-documents' or private.equipment_storage_writable(name));

create or replace function public.equipment_archive_review(p_company_id uuid,p_asset_id uuid)
returns jsonb language plpgsql stable security invoker set search_path='' as $$
declare equipment public.assets; nodes jsonb; schedules jsonb; work jsonb; requests jsonb; parent jsonb;
begin
  if not private.can_archive_equipment(p_company_id) then raise exception 'Only managers and admins can archive or restore equipment.' using errcode='42501'; end if;
  select * into equipment from public.assets where company_id=p_company_id and id=p_asset_id;
  if not found then raise exception 'Equipment not found.' using errcode='22023'; end if;
  select jsonb_build_object('id',id,'name',name,'updated_at',updated_at) into parent from public.assets
    where id=equipment.parent_asset_id and company_id=p_company_id;
  with recursive tree as (
    select a.*,array[a.id] as path,false as cycle from public.assets a where a.id=p_asset_id and a.company_id=p_company_id
    union all
    select a.*,t.path||a.id,a.id=any(t.path) from public.assets a join tree t on a.parent_asset_id=t.id
    where a.company_id=p_company_id and not t.cycle and cardinality(t.path)<64
      and (case when equipment.archived_at is null then a.archived_at is null else a.archive_batch_id=equipment.archive_batch_id end)
  ) select jsonb_agg(to_jsonb(r) order by r.id) into nodes from (
    select id,name,parent_asset_id,location_id,status,archived_at,archive_reason,archive_notes,updated_at,
      traveling_revision,path[2] as branch_id,cardinality(path)-1 as depth,cycle from tree limit 251
  ) r;
  if jsonb_array_length(nodes)>250 or exists(select 1 from jsonb_array_elements(nodes) n where (n->>'cycle')::boolean or (n->>'depth')::int>=63) then
    raise exception 'Review this equipment hierarchy before archiving: too large or cyclic.' using errcode='22023';
  end if;
  select coalesce(jsonb_agg(to_jsonb(r) order by r.id),'[]') into work from (
    select w.id,w.asset_id,w.title,w.status,w.follow_up_needed,w.production_action_status from public.work_orders w
    where w.company_id=p_company_id and w.asset_id in (select (n->>'id')::uuid from jsonb_array_elements(nodes) n)
      and (w.status<>'completed' or w.follow_up_needed or w.production_action_status='open')
  ) r;
  select coalesce(jsonb_agg(to_jsonb(r) order by r.id),'[]') into requests from (
    select m.id,m.asset_id,m.title from public.maintenance_requests m where m.company_id=p_company_id and m.status='submitted'
      and m.asset_id in (select (n->>'id')::uuid from jsonb_array_elements(nodes) n)
  ) r;
  select coalesce(jsonb_agg(to_jsonb(r) order by r.id),'[]') into schedules from (
    select s.id,s.asset_id,s.title,s.active,s.next_due_at,s.equipment_archive_paused from public.preventive_schedules s
    where s.company_id=p_company_id and s.asset_id in (select (n->>'id')::uuid from jsonb_array_elements(nodes) n)
  ) r;
  return jsonb_build_object('nodes',nodes,'parent',parent,'work',work,'requests',requests,'schedules',schedules,
    'token',md5(jsonb_build_array(nodes,parent,work,requests,schedules)::text));
end;
$$;
revoke all on function public.equipment_archive_review(uuid,uuid) from public,anon;
grant execute on function public.equipment_archive_review(uuid,uuid) to authenticated;

create or replace function public.archive_equipment(
  p_company_id uuid,p_asset_id uuid,p_branch_ids uuid[],p_reason text,p_notes text,p_review_token text
) returns jsonb language plpgsql security definer set search_path='' set lock_timeout='3s' as $$
declare review jsonb; chosen uuid[]; detached uuid[]; batch uuid:=gen_random_uuid(); item record; at_time timestamptz:=clock_timestamp();
begin
  if not private.can_archive_equipment(p_company_id) then raise exception 'Only managers and admins can archive equipment.' using errcode='42501'; end if;
  if p_reason is null or p_reason not in ('sold','scrapped','delete','other') or length(coalesce(p_notes,''))>2000 then raise exception 'Choose a valid removal reason.' using errcode='22023'; end if;
  if p_reason='other' and nullif(btrim(p_notes),'') is null then raise exception 'Describe the reason for removal.' using errcode='22023'; end if;
  -- PM generation locks its schedule before the equipment; use the same order.
  perform 1 from public.preventive_schedules where company_id=p_company_id order by id for update;
  lock table public.assets in share row exclusive mode;
  perform 1 from public.assets where company_id=p_company_id order by id for update;
  review:=public.equipment_archive_review(p_company_id,p_asset_id);
  if p_review_token is distinct from review->>'token' then raise exception 'Equipment or related work changed. Review again before removing it.' using errcode='PT409'; end if;
  if exists(select 1 from public.assets where id=p_asset_id and archived_at is not null) then raise exception 'Equipment is already archived.' using errcode='PT409'; end if;
  if p_branch_ids is null or exists(select 1 from unnest(p_branch_ids) id where id is null or not exists (
    select 1 from jsonb_array_elements(review->'nodes') n where (n->>'id')::uuid=id and (n->>'parent_asset_id')::uuid=p_asset_id)) then
    raise exception 'Choose attached branches from this review.' using errcode='22023'; end if;
  select array_agg((n->>'id')::uuid) into chosen from jsonb_array_elements(review->'nodes') n
    where (n->>'id')::uuid=p_asset_id or (n->>'branch_id')::uuid=any(p_branch_ids);
  if exists(select 1 from jsonb_array_elements((review->'work')||(review->'requests')) n where (n->>'asset_id')::uuid=any(chosen)) then
    raise exception 'Resolve open work, production actions, follow-ups and submitted requests before removing this equipment.' using errcode='23514'; end if;
  select coalesce(array_agg(id),'{}') into detached from public.assets
    where company_id=p_company_id and parent_asset_id=p_asset_id and archived_at is null and not(id=any(chosen));
  for item in select c.id,c.name,p.name as parent_name from public.assets c join public.assets p on p.id=c.parent_asset_id where c.id=any(detached) loop
    insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary) values
      (p_company_id,item.id,auth.uid(),'parent_detached',format('Detached from %s when the parent was archived. This equipment stays active.',item.parent_name)),
      (p_company_id,p_asset_id,auth.uid(),'child_detached',format('%s detached and kept active during archive.',item.name));
  end loop;
  update public.assets set parent_asset_id=null,updated_at=at_time where id=any(detached);
  if review->'parent'->>'id' is not null then
    insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary) values
      (p_company_id,p_asset_id,auth.uid(),'parent_detached',format('Detached from %s when archived. Restoring will not automatically reattach it.',review->'parent'->>'name')),
      (p_company_id,(review->'parent'->>'id')::uuid,auth.uid(),'child_detached',format('%s detached when archived.',(select name from public.assets where id=p_asset_id)));
    update public.assets set parent_asset_id=null,updated_at=at_time where id=p_asset_id;
  end if;
  update public.preventive_schedules set equipment_archive_paused=true,active=false where company_id=p_company_id and asset_id=any(chosen) and active;
  insert into public.asset_financials(company_id,asset_id,needs_review)
    select company_id,id,true from public.assets where id=any(chosen)
    on conflict (asset_id) do nothing;
  update public.assets set archived_at=at_time,archived_by=auth.uid(),archive_reason=p_reason,
    archive_notes=nullif(btrim(p_notes),''),archive_batch_id=batch,updated_at=at_time where id=any(chosen);
  insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary)
    select company_id,id,auth.uid(),'archived',format('Removed from workflow. Reason: %s.%s History, files, part links and financial records retained. PM paused.',p_reason,
      case when nullif(btrim(p_notes),'') is null then '' else ' '||btrim(p_notes) end) from public.assets where id=any(chosen);
  return jsonb_build_object('archived_ids',chosen,'detached_ids',detached,'batch_id',batch);
end;
$$;
revoke all on function public.archive_equipment(uuid,uuid,uuid[],text,text,text) from public,anon;
grant execute on function public.archive_equipment(uuid,uuid,uuid[],text,text,text) to authenticated;

create or replace function public.restore_equipment(p_company_id uuid,p_asset_id uuid,p_review_token text,p_notes text)
returns jsonb language plpgsql security definer set search_path='' set lock_timeout='3s' as $$
declare review jsonb; chosen uuid[]; item record;
begin
  if not private.can_archive_equipment(p_company_id) then raise exception 'Only managers and admins can restore equipment.' using errcode='42501'; end if;
  if nullif(btrim(p_notes),'') is null or length(p_notes)>2000 then raise exception 'Record a restoration note.' using errcode='22023'; end if;
  lock table public.assets in share row exclusive mode;
  perform 1 from public.assets where company_id=p_company_id order by id for update;
  review:=public.equipment_archive_review(p_company_id,p_asset_id);
  if p_review_token is distinct from review->>'token' then raise exception 'Equipment changed. Review again before restoring.' using errcode='PT409'; end if;
  if exists(select 1 from public.assets where id=p_asset_id and archived_at is null) then raise exception 'Equipment is already active.' using errcode='PT409'; end if;
  select array_agg((n->>'id')::uuid) into chosen from jsonb_array_elements(review->'nodes') n;
  if exists(select 1 from public.assets a join public.assets p on p.id=a.parent_asset_id
    where a.id=any(chosen) and p.archived_at is not null and not(p.id=any(chosen))) then
    raise exception 'Restore the archived parent first, then review this equipment.' using errcode='23514'; end if;
  update public.assets set archived_at=null,archived_by=null,archive_reason=null,archive_notes=null,archive_batch_id=null,updated_at=clock_timestamp() where id=any(chosen);
  insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary)
    select company_id,id,auth.uid(),'restored','Restored to workflow. Condition and facility unchanged. PM remains paused until reviewed. '||btrim(p_notes)
    from public.assets where id=any(chosen);
  return jsonb_build_object('restored_ids',chosen);
end;
$$;
revoke all on function public.restore_equipment(uuid,uuid,text,text) from public,anon;
grant execute on function public.restore_equipment(uuid,uuid,text,text) to authenticated;

create or replace function public.list_archived_equipment(p_company_id uuid,p_query text default '',p_location_id uuid default null,p_page integer default 1)
returns jsonb language plpgsql stable security invoker set search_path='' as $$
declare rows jsonb; total bigint; page integer;
begin
  if not private.can_archive_equipment(p_company_id) then raise exception 'Only managers and admins can open Archived Equipment.' using errcode='42501'; end if;
  if length(coalesce(p_query,''))>200 then raise exception 'Search is too long.' using errcode='22023'; end if;
  select count(*) into total from public.assets a where a.company_id=p_company_id and a.archived_at is not null
    and (p_location_id is null or a.location_id=p_location_id) and (coalesce(p_query,'')='' or position(lower(p_query) in lower(a.name||' '||coalesce(a.asset_code,'')||' '||coalesce(a.asset_tag,'')))>0);
  page:=least(greatest(coalesce(p_page,1),1),greatest(ceil(total/12.0)::integer,1));
  select coalesce(jsonb_agg(to_jsonb(r) order by r.archived_at desc,r.id),'[]') into rows from (
    select a.id,a.name,a.asset_type,a.status,a.location_id,a.archived_at,a.archive_reason,a.archive_notes,
      l.name as facility,p.full_name as archived_by_name
    from public.assets a left join public.locations l on l.id=a.location_id and l.company_id=a.company_id
    left join public.profiles p on p.user_id=a.archived_by and p.company_id=a.company_id
    where a.company_id=p_company_id and a.archived_at is not null and (p_location_id is null or a.location_id=p_location_id)
      and (coalesce(p_query,'')='' or position(lower(p_query) in lower(a.name||' '||coalesce(a.asset_code,'')||' '||coalesce(a.asset_tag,'')))>0)
    order by a.archived_at desc,a.id limit 12 offset (page-1)*12
  ) r;
  return jsonb_build_object('rows',rows,'total',total,'page',page);
end;
$$;
revoke all on function public.list_archived_equipment(uuid,text,uuid,integer) from public,anon;
grant execute on function public.list_archived_equipment(uuid,text,uuid,integer) to authenticated;

create or replace function public.resume_equipment_pm(p_company_id uuid,p_schedule_id uuid,p_next_due_at date)
returns jsonb language plpgsql security definer set search_path='' as $$
declare schedule public.preventive_schedules; equipment public.assets;
begin
  if not private.can_archive_equipment(p_company_id) then raise exception 'Only managers and admins can resume archived equipment PM.' using errcode='42501'; end if;
  select * into schedule from public.preventive_schedules where id=p_schedule_id and company_id=p_company_id for update;
  if not found then raise exception 'PM schedule not found.' using errcode='22023'; end if;
  select * into equipment from public.assets where id=schedule.asset_id and company_id=p_company_id for share;
  if not found or equipment.archived_at is not null then raise exception 'Restore the equipment before resuming PM.' using errcode='23514'; end if;
  if p_next_due_at is null then raise exception 'Choose the next due date.' using errcode='22023'; end if;
  update public.preventive_schedules set active=true,equipment_archive_paused=false,next_due_at=p_next_due_at
    where id=p_schedule_id and company_id=p_company_id and equipment_archive_paused returning * into schedule;
  if not found then raise exception 'PM changed. Review it again.' using errcode='PT409'; end if;
  insert into public.asset_events(company_id,asset_id,actor_id,event_type,summary)
    values(p_company_id,equipment.id,auth.uid(),'pm_resumed',format('Resumed %s; next due %s.',schedule.title,p_next_due_at));
  return to_jsonb(schedule);
end;
$$;
revoke all on function public.resume_equipment_pm(uuid,uuid,date) from public,anon;
grant execute on function public.resume_equipment_pm(uuid,uuid,date) to authenticated;

create or replace function private.stamp_traveling_revision()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='INSERT' then new.traveling_revision:=0;
  else
    new.traveling_revision:=old.traveling_revision;
    if row(new.location_id,new.status,new.asset_type,new.parent_asset_id,new.archived_at)
       is distinct from row(old.location_id,old.status,old.asset_type,old.parent_asset_id,old.archived_at) then
      new.traveling_revision:=old.traveling_revision+1;
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.stamp_traveling_revision() from public,anon,authenticated;

create or replace function private.guard_archive_pm_review()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if current_user in ('authenticated','anon') and (
    (tg_op='INSERT' and new.equipment_archive_paused) or
    (tg_op='UPDATE' and (new.equipment_archive_paused is distinct from old.equipment_archive_paused
      or (old.equipment_archive_paused and new.active)))) then
    raise exception 'Review the next due date using Resume PM.' using errcode='42501';
  end if;
  return new;
end;
$$;
revoke all on function private.guard_archive_pm_review() from public,anon,authenticated;
create trigger guard_archive_pm_review before insert or update on public.preventive_schedules
for each row execute function private.guard_archive_pm_review();

create or replace function private.guard_archived_work_history()
returns trigger language plpgsql security invoker set search_path='' as $$
declare equipment public.assets; linked_work public.work_orders; work_id uuid; row_data jsonb; old_data jsonb;
begin
  row_data:=case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
  if tg_op='UPDATE' then old_data:=to_jsonb(old); end if;
  if tg_op='UPDATE' and old_data->>'company_id' is distinct from row_data->>'company_id' then
    raise exception 'Work history cannot change company.' using errcode='23514';
  end if;
  for work_id in select distinct value::uuid from jsonb_array_elements_text(
    jsonb_build_array(row_data->>'work_order_id',old_data->>'work_order_id')) where value is not null loop
    select * into linked_work from public.work_orders where id=work_id and company_id=(row_data->>'company_id')::uuid;
    if not found and current_user in ('authenticated','anon') then raise exception 'Work history is not available for changes.' using errcode='42501'; end if;
    if linked_work.asset_id is null then continue; end if;
    select * into equipment from public.assets where id=linked_work.asset_id and company_id=linked_work.company_id for share;
    if not found and current_user in ('authenticated','anon') then raise exception 'Equipment reference is not available for changes.' using errcode='42501'; end if;
    if equipment.archived_at is not null then
      raise exception 'This equipment is archived. Its work history is read-only until restored.' using errcode='23514';
    end if;
  end loop;
  return coalesce(new,old);
end;
$$;
revoke all on function private.guard_archived_work_history() from public,anon,authenticated;
create trigger guard_archived_work_history before insert or update or delete on public.work_order_comments
for each row execute function private.guard_archived_work_history();
create trigger guard_archived_work_history before insert or update or delete on public.work_order_photos
for each row execute function private.guard_archived_work_history();
create trigger guard_archived_work_history before insert or update or delete on public.work_order_documents
for each row execute function private.guard_archived_work_history();
create trigger guard_archived_work_history before insert or update or delete on public.work_order_parts
for each row execute function private.guard_archived_work_history();
create trigger guard_archived_work_history before insert or update or delete on public.work_order_step_results
for each row execute function private.guard_archived_work_history();
create trigger guard_archived_work_history before insert or update or delete on public.work_order_events
for each row execute function private.guard_archived_work_history();

create or replace function private.archived_work_storage_writable(object_name text)
returns boolean language plpgsql security definer set search_path='' as $$
declare equipment public.assets; company_key uuid; work_key uuid;
begin
  begin
    company_key:=split_part(object_name,'/',1)::uuid;
    work_key:=split_part(object_name,'/',2)::uuid;
  exception when invalid_text_representation then return false; end;
  if auth.uid() is null or not private.is_company_operational_editor(company_key) then return false; end if;
  select a.* into equipment from public.assets a join public.work_orders w on w.asset_id=a.id and w.company_id=a.company_id
    where w.id=work_key and w.company_id=company_key for share of a;
  return not found or equipment.archived_at is null;
end;
$$;
revoke all on function private.archived_work_storage_writable(text) from public,anon;
grant execute on function private.archived_work_storage_writable(text) to authenticated;
create policy "Archived work files cannot be uploaded" on storage.objects as restrictive for insert to authenticated
with check (bucket_id not in ('work-order-photos','work-order-documents') or private.archived_work_storage_writable(name));
create policy "Archived work files cannot be replaced" on storage.objects as restrictive for update to authenticated
using (bucket_id not in ('work-order-photos','work-order-documents') or private.archived_work_storage_writable(name))
with check (bucket_id not in ('work-order-photos','work-order-documents') or private.archived_work_storage_writable(name));
create policy "Archived work files cannot be removed" on storage.objects as restrictive for delete to authenticated
using (bucket_id not in ('work-order-photos','work-order-documents') or private.archived_work_storage_writable(name));

create or replace function private.archived_request_storage_writable(object_name text)
returns boolean language plpgsql security definer set search_path='' as $$
declare equipment public.assets; request_key uuid;
begin
  begin request_key:=split_part(object_name,'/',1)::uuid;
  exception when invalid_text_representation then return false; end;
  select a.* into equipment from public.assets a join public.maintenance_requests r on r.asset_id=a.id and r.company_id=a.company_id
    where r.id=request_key for share of a;
  if not found then return true; end if;
  if auth.uid() is null or not private.is_company_member(equipment.company_id) then return false; end if;
  return equipment.archived_at is null;
end;
$$;
revoke all on function private.archived_request_storage_writable(text) from public,anon;
grant execute on function private.archived_request_storage_writable(text) to authenticated;
create policy "Archived request files cannot be replaced" on storage.objects as restrictive for update to authenticated
using (bucket_id<>'maintenance-request-photos' or private.archived_request_storage_writable(name))
with check (bucket_id<>'maintenance-request-photos' or private.archived_request_storage_writable(name));
create policy "Archived request files cannot be removed" on storage.objects as restrictive for delete to authenticated
using (bucket_id<>'maintenance-request-photos' or private.archived_request_storage_writable(name));

create or replace function public.traveling_units_summary(p_company_id uuid,p_page integer default 1)
returns jsonb language plpgsql stable security invoker set search_path='' as $$
declare total bigint; page_number integer; units jsonb;
begin
  if auth.uid() is null or not private.is_company_member(p_company_id) then raise exception 'Company membership required.' using errcode='42501'; end if;
  if p_page is null or p_page<1 then raise exception 'Choose a valid page.' using errcode='22023'; end if;
  select count(*) into total from public.assets where company_id=p_company_id and asset_type='traveling_machine' and archived_at is null;
  page_number:=least(p_page,greatest(1,ceil(total/12.0)::integer));
  select coalesce(jsonb_agg(to_jsonb(result) order by result.asset->>'name',result.asset->>'id'),'[]') into units from (
    select to_jsonb(a) as asset,l.name as current_facility,
      coalesce(e.location_change->>'from_name',legacy.name) as previous_facility,e.created_at as moved_at,nullif(p.full_name,'') as moved_by,
      (select count(*) from public.work_orders w where w.company_id=p_company_id and w.asset_id=a.id and w.status<>'completed') as open_work_count
    from (select * from public.assets where company_id=p_company_id and asset_type='traveling_machine' and archived_at is null order by name,id limit 12 offset (page_number-1)*12) a
    left join public.locations l on l.id=a.location_id and l.company_id=p_company_id
    left join lateral (select ev.* from public.asset_events ev where ev.company_id=p_company_id and ev.asset_id=a.id and ev.event_type='location_changed'
      order by (ev.location_change->>'revision')::bigint desc nulls last,ev.created_at desc,ev.id desc limit 1) e on true
    left join public.profiles p on p.company_id=p_company_id and p.user_id=e.actor_id
    left join lateral (
      select min(f.name) as name from public.locations f cross join public.locations t
      where e.location_change is null and f.company_id=p_company_id and t.company_id=p_company_id
        and e.summary=format('Moved from %s to %s. Area / spot cleared. Existing work, parts and financial records retained.',f.name,t.name)
      having count(*)=1
    ) legacy on true
  ) result;
  return jsonb_build_object('total',total,'page',page_number,'units',units);
end;
$$;
revoke all on function public.traveling_units_summary(uuid,integer) from public,anon;
grant execute on function public.traveling_units_summary(uuid,integer) to authenticated;

notify pgrst,'reload schema';
commit;
