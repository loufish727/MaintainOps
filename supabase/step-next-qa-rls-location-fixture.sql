-- MaintainOps QA RLS fixture.
-- Creates one minimal location for QA Test Facility when missing so cross-company
-- public-link RPC denial can be tested against a real target location.

insert into public.locations (company_id, name)
select 'f599e431-45c3-4f93-b1a9-6c29e009b1b3'::uuid, 'QA RLS Audit Location'
where not exists (
  select 1
  from public.locations
  where company_id = 'f599e431-45c3-4f93-b1a9-6c29e009b1b3'::uuid
    and name = 'QA RLS Audit Location'
);

select
  id,
  company_id,
  name
from public.locations
where company_id = 'f599e431-45c3-4f93-b1a9-6c29e009b1b3'::uuid
order by created_at nulls last, name;
