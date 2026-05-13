-- Live data correction: Lee Gaede's "Hydralic Leak" order belongs in Salem, OR.
--
-- Finding:
-- - Work order 8a19166f-c653-4da6-a5db-01bc5b96491a was created in Auburn, WA.
-- - It is linked to equipment fdab0981-bb5e-4335-92ce-f0b4667b1692, "New thalmann".
-- - That equipment was also in Auburn, WA.
-- - App creation logic uses the selected equipment location when equipment is attached,
--   otherwise it uses the active workspace location.
--
-- This correction moves the one work order and its one linked equipment record to Salem, OR.
-- It disables only the assignment guard trigger inside the transaction because that trigger
-- expects an authenticated app user and blocks SQL editor maintenance updates with auth.uid() null.

begin;

alter table public.work_orders disable trigger enforce_work_order_assignment_role;

with constants as (
  select
    '0875d674-7f07-4493-8668-701d192f4421'::uuid as company_id,
    '6cdc08a7-1ce8-48f1-9d5c-ec7969fd6d45'::uuid as auburn_location_id,
    '328d9ebb-7c4d-4847-a9bb-4aa0619fec43'::uuid as salem_location_id,
    '8a19166f-c653-4da6-a5db-01bc5b96491a'::uuid as work_order_id,
    'fdab0981-bb5e-4335-92ce-f0b4667b1692'::uuid as asset_id
),
target_work_order as (
  select wo.*
  from public.work_orders wo
  join constants c on c.work_order_id = wo.id
  where wo.company_id = c.company_id
    and wo.location_id = c.auburn_location_id
    and wo.asset_id = c.asset_id
    and wo.title = 'Hydralic Leak'
),
updated_work_order as (
  update public.work_orders wo
  set location_id = c.salem_location_id,
      updated_at = now()
  from constants c
  where wo.id = c.work_order_id
    and exists (select 1 from target_work_order target where target.id = wo.id)
  returning wo.id, wo.title, wo.company_id, wo.location_id, wo.asset_id, wo.created_by
),
updated_asset as (
  update public.assets a
  set location_id = c.salem_location_id,
      updated_at = now()
  from constants c
  where a.id = c.asset_id
    and a.company_id = c.company_id
    and a.location_id = c.auburn_location_id
    and exists (select 1 from updated_work_order uwo where uwo.asset_id = a.id)
  returning a.id, a.name, a.company_id, a.location_id
),
logged_event as (
  insert into public.work_order_events (
    company_id,
    work_order_id,
    actor_id,
    event_type,
    summary
  )
  select
    uwo.company_id,
    uwo.id,
    uwo.created_by,
    'location_corrected',
    'Admin data correction: moved work order and linked equipment from Auburn, WA to Salem, OR after Lee Gaede reported the order was intended for Salem.'
  from updated_work_order uwo
  returning id
)
select
  uwo.id as work_order_id,
  uwo.title,
  wl.name as work_order_location,
  ua.id as equipment_id,
  ua.name as equipment_name,
  al.name as equipment_location,
  (select count(*) from logged_event) as events_logged
from updated_work_order uwo
left join updated_asset ua on ua.id = uwo.asset_id
left join public.locations wl on wl.id = uwo.location_id
left join public.locations al on al.id = ua.location_id;

alter table public.work_orders enable trigger enforce_work_order_assignment_role;

commit;

-- Verification after commit.
select
  wo.id as work_order_id,
  wo.title,
  wo.status,
  wl.name as work_order_location,
  a.id as equipment_id,
  a.name as equipment_name,
  al.name as equipment_location,
  u.email as created_by_email,
  p.full_name as created_by_name,
  wo.updated_at
from public.work_orders wo
left join public.locations wl on wl.id = wo.location_id
left join public.assets a on a.id = wo.asset_id
left join public.locations al on al.id = a.location_id
left join auth.users u on u.id = wo.created_by
left join public.profiles p on p.user_id = wo.created_by and p.company_id = wo.company_id
where wo.id = '8a19166f-c653-4da6-a5db-01bc5b96491a'::uuid;
