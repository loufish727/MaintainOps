-- TEST PLATFORM ONLY. Never deploy to a customer/production project.
-- CI cleanup is separate from application DELETE privileges.
create or replace function public.qa_cleanup_equipment_fixture(p_ids uuid[], p_prefix text)
returns integer language plpgsql security definer set search_path = public, pg_temp as $$
declare
  c constant uuid := '0d6fd8f1-428d-4192-8176-48943e3ec119';
  u uuid := auth.uid();
  removed integer;
begin
  if u is null or not exists (select 1 from public.company_members where company_id=c and user_id=u and role='admin') then
    raise exception 'QA administrator required' using errcode='42501';
  end if;
  if p_prefix is null or p_prefix !~ '^000LFES (Relocate|Travel) [a-f0-9-]{36}$'
     or coalesce(cardinality(p_ids),0) not between 1 and 32
     or exists(select 1 from unnest(p_ids) id where id is null)
     or (select count(distinct id) from unnest(p_ids) id) <> cardinality(p_ids) then
    raise exception 'Invalid QA fixture manifest';
  end if;
  perform 1 from public.assets where id=any(p_ids) order by id for update;
  if exists(select 1 from public.assets where id=any(p_ids)
      and (company_id<>c or created_by is distinct from u or name not like p_prefix||' %' or archived_at is not null)) then
    raise exception 'QA fixture ownership mismatch';
  end if;
  if exists(select 1 from public.assets where parent_asset_id=any(p_ids) and not id=any(p_ids))
    or exists(select 1 from public.work_orders where asset_id=any(p_ids))
    or exists(select 1 from public.maintenance_requests where asset_id=any(p_ids))
    or exists(select 1 from public.preventive_schedules where asset_id=any(p_ids))
    or exists(select 1 from public.asset_parts where asset_id=any(p_ids))
    or exists(select 1 from public.asset_documents where asset_id=any(p_ids))
    or exists(select 1 from storage.objects where bucket_id='asset-documents'
      and split_part(name,'/',2)=any(array(select id::text from unnest(p_ids) id))) then
    raise exception 'QA fixture still has connected records or stored files';
  end if;
  delete from public.assets where company_id=c and id=any(p_ids);
  get diagnostics removed = row_count;
  delete from public.asset_financials where company_id=c and archived_asset_id=any(p_ids);
  return removed;
end $$;
revoke all on function public.qa_cleanup_equipment_fixture(uuid[],text) from public,anon;
grant execute on function public.qa_cleanup_equipment_fixture(uuid[],text) to authenticated;
