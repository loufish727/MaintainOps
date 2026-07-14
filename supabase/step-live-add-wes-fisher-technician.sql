-- Live access add: Wes Fisher technician access for Taylor Metal Products / Salem, OR.
--
-- This is a live data operation, not a schema migration. Wes already has an
-- auth.users account, so this grants company membership directly and sets the
-- default location to Salem, OR.

begin;

with constants as (
  select
    '0875d674-7f07-4493-8668-701d192f4421'::uuid as company_id,
    '328d9ebb-7c4d-4847-a9bb-4aa0619fec43'::uuid as salem_location_id,
    'wes.fisher@taylormetal.com'::text as email,
    'Wes Fisher'::text as full_name
),
target_user as (
  select u.id as user_id, c.company_id, c.salem_location_id, c.full_name
  from auth.users u
  join constants c on lower(u.email) = lower(c.email)
),
membership as (
  insert into public.company_members (company_id, user_id, role, default_location_id)
  select company_id, user_id, 'technician', salem_location_id
  from target_user
  on conflict (company_id, user_id) do update
  set role = 'technician',
      default_location_id = excluded.default_location_id
  returning company_id, user_id, role, default_location_id
),
profile as (
  insert into public.profiles (company_id, user_id, full_name)
  select company_id, user_id, full_name
  from target_user
  on conflict (company_id, user_id) do update
  set full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name),
      updated_at = now()
  returning company_id, user_id, full_name
)
select
  au.email,
  co.name as company_name,
  m.role,
  loc.name as default_location_name,
  p.full_name
from membership m
join auth.users au on au.id = m.user_id
join public.companies co on co.id = m.company_id
left join public.locations loc on loc.id = m.default_location_id
left join profile p on p.company_id = m.company_id and p.user_id = m.user_id;

commit;

-- Verification after commit.
select
  au.email,
  co.name as company_name,
  cm.role,
  loc.name as default_location_name,
  p.full_name,
  cm.created_at
from public.company_members cm
join auth.users au on au.id = cm.user_id
join public.companies co on co.id = cm.company_id
left join public.locations loc on loc.id = cm.default_location_id
left join public.profiles p on p.company_id = cm.company_id and p.user_id = cm.user_id
where lower(au.email) = lower('wes.fisher@taylormetal.com')
  and cm.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid;
