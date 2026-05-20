-- MaintainOps location integrity audit.
--
-- This file is read-only. It does not update or delete anything.
-- Run each SELECT separately in Supabase SQL Editor when investigating
-- location routing, equipment/location mismatches, or before validating
-- location foreign-key constraints.

-- 1. Work orders with a location that does not belong to the same company.
select
  wo.id,
  wo.title,
  wo.company_id,
  wo.location_id,
  wo.asset_id,
  wo.created_at
from public.work_orders wo
left join public.locations l
  on l.id = wo.location_id
 and l.company_id = wo.company_id
where wo.location_id is not null
  and l.id is null
order by wo.created_at desc;

-- 2. Equipment with a location that does not belong to the same company.
select
  a.id,
  a.name,
  a.company_id,
  a.location_id,
  a.created_at
from public.assets a
left join public.locations l
  on l.id = a.location_id
 and l.company_id = a.company_id
where a.location_id is not null
  and l.id is null
order by a.created_at desc;

-- 3. Requests with a location that does not belong to the same company.
select
  mr.id,
  mr.title,
  mr.company_id,
  mr.location_id,
  mr.asset_id,
  mr.status,
  mr.created_at
from public.maintenance_requests mr
left join public.locations l
  on l.id = mr.location_id
 and l.company_id = mr.company_id
where mr.location_id is not null
  and l.id is null
order by mr.created_at desc;

-- 4. Parts with a location that does not belong to the same company.
select
  p.id,
  p.name,
  p.company_id,
  p.location_id,
  p.created_at
from public.parts p
left join public.locations l
  on l.id = p.location_id
 and l.company_id = p.company_id
where p.location_id is not null
  and l.id is null
order by p.created_at desc;

-- 5. PM schedules with a location that does not belong to the same company.
select
  ps.id,
  ps.title,
  ps.company_id,
  ps.location_id,
  ps.asset_id,
  ps.next_due_at,
  ps.created_at
from public.preventive_schedules ps
left join public.locations l
  on l.id = ps.location_id
 and l.company_id = ps.company_id
where ps.location_id is not null
  and l.id is null
order by ps.created_at desc;

-- 6. Work orders where the work order location differs from linked equipment location.
-- These can be legitimate after equipment moves, but they should be reviewed.
select
  wo.id as work_order_id,
  wo.title,
  wo.company_id,
  wo.location_id as work_order_location_id,
  wl.name as work_order_location,
  wo.asset_id,
  a.name as equipment_name,
  a.location_id as equipment_location_id,
  al.name as equipment_location,
  wo.created_at
from public.work_orders wo
join public.assets a
  on a.id = wo.asset_id
 and a.company_id = wo.company_id
left join public.locations wl
  on wl.id = wo.location_id
 and wl.company_id = wo.company_id
left join public.locations al
  on al.id = a.location_id
 and al.company_id = a.company_id
where wo.location_id is distinct from a.location_id
order by wo.created_at desc;

-- 7. Requests where the request location differs from linked equipment location.
select
  mr.id as request_id,
  mr.title,
  mr.company_id,
  mr.location_id as request_location_id,
  rl.name as request_location,
  mr.asset_id,
  a.name as equipment_name,
  a.location_id as equipment_location_id,
  al.name as equipment_location,
  mr.status,
  mr.created_at
from public.maintenance_requests mr
join public.assets a
  on a.id = mr.asset_id
 and a.company_id = mr.company_id
left join public.locations rl
  on rl.id = mr.location_id
 and rl.company_id = mr.company_id
left join public.locations al
  on al.id = a.location_id
 and al.company_id = a.company_id
where mr.location_id is distinct from a.location_id
order by mr.created_at desc;

-- 8. PM schedules where the schedule location differs from linked equipment location.
select
  ps.id as schedule_id,
  ps.title,
  ps.company_id,
  ps.location_id as schedule_location_id,
  sl.name as schedule_location,
  ps.asset_id,
  a.name as equipment_name,
  a.location_id as equipment_location_id,
  al.name as equipment_location,
  ps.next_due_at,
  ps.created_at
from public.preventive_schedules ps
join public.assets a
  on a.id = ps.asset_id
 and a.company_id = ps.company_id
left join public.locations sl
  on sl.id = ps.location_id
 and sl.company_id = ps.company_id
left join public.locations al
  on al.id = a.location_id
 and al.company_id = a.company_id
where ps.location_id is distinct from a.location_id
order by ps.created_at desc;

-- 9. Constraint validation status for location integrity constraints.
select
  conrelid::regclass as table_name,
  conname as constraint_name,
  convalidated as is_validated
from pg_constraint
where conname in (
  'assets_company_location_fkey',
  'work_orders_company_location_fkey',
  'preventive_schedules_company_location_fkey',
  'parts_company_location_fkey',
  'maintenance_requests_company_location_fkey'
)
order by table_name::text, constraint_name;
