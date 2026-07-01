-- Live role correction: Louie Andrade should be a technician in Taylor Metal Products.
--
-- This is a live data operation, not a schema migration. It is scoped to the
-- canonical Taylor Metal Products company used by the Salem team.

begin;

with target as (
  select
    '0875d674-7f07-4493-8668-701d192f4421'::uuid as company_id,
    u.id as user_id
  from auth.users u
  where lower(u.email) = lower('louie.andrade@taylormetal.com')
),
updated as (
  update public.company_members cm
  set role = 'technician'
  from target t
  where cm.company_id = t.company_id
    and cm.user_id = t.user_id
    and cm.role <> 'technician'
  returning cm.company_id, cm.user_id, cm.role, cm.default_location_id
)
select
  au.email,
  co.name as company_name,
  updated.role,
  loc.name as default_location_name
from updated
join auth.users au on au.id = updated.user_id
join public.companies co on co.id = updated.company_id
left join public.locations loc on loc.id = updated.default_location_id;

commit;

-- Verification after commit.
select
  au.email,
  co.name as company_name,
  cm.role,
  loc.name as default_location_name,
  p.full_name
from public.company_members cm
join auth.users au on au.id = cm.user_id
join public.companies co on co.id = cm.company_id
left join public.locations loc on loc.id = cm.default_location_id
left join public.profiles p on p.company_id = cm.company_id and p.user_id = cm.user_id
where cm.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and lower(au.email) = lower('louie.andrade@taylormetal.com');
