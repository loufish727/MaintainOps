-- CURRENT_ROLE is a PostgreSQL keyword, not a safe authorization variable.
create or replace function public.update_company_member_role(
  target_company_id uuid, target_user_id uuid, new_role text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_role text;
begin
  if auth.uid() is null then raise exception 'Sign in before changing team roles.'; end if;
  if new_role is null or new_role not in ('admin', 'manager', 'accounting', 'production', 'technician') then
    raise exception 'Invalid role.';
  end if;
  -- Serialize role changes so two admins cannot concurrently remove the last admin.
  perform 1 from public.companies c where c.id = target_company_id for update;
  select cm.role into actor_role from public.company_members cm
  where cm.company_id = target_company_id and cm.user_id = auth.uid();
  if actor_role is distinct from 'admin' then raise exception 'Only admins can change team roles.'; end if;
  if target_user_id = auth.uid() then raise exception 'You cannot change your own role here.'; end if;
  if not exists (select 1 from public.company_members cm where cm.company_id = target_company_id and cm.user_id = target_user_id) then
    raise exception 'Team member not found.';
  end if;
  if new_role <> 'admin'
    and exists (select 1 from public.company_members cm where cm.company_id = target_company_id and cm.user_id = target_user_id and cm.role = 'admin')
    and (select count(*) from public.company_members cm where cm.company_id = target_company_id and cm.role = 'admin') <= 1 then
    raise exception 'A company must keep at least one admin.';
  end if;
  update public.company_members set role = new_role where company_id = target_company_id and user_id = target_user_id;
end;
$$;
revoke all on function public.update_company_member_role(uuid, uuid, text) from public, anon;
grant execute on function public.update_company_member_role(uuid, uuid, text) to authenticated, service_role;

-- Row locking plus one transaction makes retries and concurrent conversions idempotent.
-- SECURITY INVOKER retains the caller's RLS policies for every read and write.
create or replace function public.convert_maintenance_request(
  target_company_id uuid, target_request_id uuid
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  source_request record;
  result_id uuid;
  equipment_location uuid;
  safety_required boolean := false;
  work_description text;
begin
  if auth.uid() is null or not exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager', 'technician', 'production')
  ) then raise exception 'This account cannot convert requests.'; end if;

  select mr.* into source_request from public.maintenance_requests mr
  where mr.id = target_request_id and mr.company_id = target_company_id for update;
  if not found then raise exception 'Request not found or unavailable.'; end if;
  if source_request.converted_work_order_id is not null then
    return jsonb_build_object('id', source_request.converted_work_order_id);
  end if;
  if source_request.status <> 'submitted' then
    raise exception 'This request is no longer awaiting conversion. Review its history before creating more work.';
  end if;
  if source_request.asset_id is not null then
    select a.location_id, a.safety_devices_required into equipment_location, safety_required
    from public.assets a where a.id = source_request.asset_id and a.company_id = target_company_id;
    if not found then raise exception 'Request equipment is not available in this company.'; end if;
  end if;
  work_description := nullif(btrim(source_request.description), '');
  if nullif(to_jsonb(source_request)->>'photo_storage_path', '') is not null then
    work_description := concat_ws(E'\n\n', work_description, '[Request photo attached to original request]');
  end if;
  insert into public.work_orders (
    company_id, location_id, title, description, asset_id, priority, type, status,
    created_by, safety_check_required, safety_devices_checked
  ) values (
    target_company_id, coalesce((to_jsonb(source_request)->>'location_id')::uuid, equipment_location),
    source_request.title, work_description, source_request.asset_id, source_request.priority,
    'corrective', 'open', auth.uid(), coalesce(safety_required, false), false
  ) returning id into result_id;
  update public.maintenance_requests set status = 'converted', reviewed_by = auth.uid(),
    reviewed_at = now(), converted_work_order_id = result_id
  where id = target_request_id and company_id = target_company_id;
  if not found then raise exception 'Request link could not be saved.'; end if;
  insert into public.work_order_events(company_id, work_order_id, actor_id, event_type, summary)
  values (target_company_id, result_id, auth.uid(), 'request_converted', 'Request converted to work order.');
  return jsonb_build_object('id', result_id);
end;
$$;
revoke all on function public.convert_maintenance_request(uuid, uuid) from public, anon;
grant execute on function public.convert_maintenance_request(uuid, uuid) to authenticated;
notify pgrst, 'reload schema';
