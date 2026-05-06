-- MaintainOps QA-only cleanup
-- Purpose: remove generated QA/stress records without touching separately entered live data.
-- IMPORTANT: This file intentionally filters by QA/test naming patterns.
-- Do not use a company-wide delete for live testing cleanup.

-- 1) Preview first. Run this section by itself before deleting.
with target_company as (
  select '0875d674-7f07-4493-8668-701d192f4421'::uuid as company_id
),
qa_work_orders as (
  select wo.id
  from public.work_orders wo
  join target_company tc on tc.company_id = wo.company_id
  where
    wo.title ilike 'QA %'
    or wo.title ilike 'qa-%'
    or wo.title ilike '%stress%'
    or wo.description ilike 'QA %'
    or wo.description ilike '%qa-loc-%'
    or wo.description ilike '%regression%'
    or wo.description ilike '%stress%'
),
qa_parts as (
  select p.id
  from public.parts p
  join target_company tc on tc.company_id = p.company_id
  where
    p.name ilike 'QA %'
    or p.name ilike 'qa-%'
    or p.name ilike '%stress%'
    or p.sku ilike 'QA%'
    or p.sku ilike 'qa-%'
),
qa_assets as (
  select a.id
  from public.assets a
  join target_company tc on tc.company_id = a.company_id
  where
    a.name ilike 'QA %'
    or a.name ilike 'qa-%'
    or a.name ilike '%stress%'
    or a.name ilike '%qa-loc-%'
),
qa_procedures as (
  select pt.id
  from public.procedure_templates pt
  join target_company tc on tc.company_id = pt.company_id
  where
    pt.name ilike 'QA %'
    or pt.name ilike 'qa-%'
    or pt.name ilike '%stress%'
    or pt.name ilike '%qa-loc-%'
)
select 'qa_work_orders' as record_type, count(*) as rows_to_delete from qa_work_orders
union all
select 'qa_parts', count(*) from qa_parts
union all
select 'qa_assets', count(*) from qa_assets
union all
select 'qa_procedures', count(*) from qa_procedures;

-- 2) Delete QA/test records only. Run after the preview looks right.
begin;

create temp table cleanup_qa_work_orders on commit drop as
select wo.id
from public.work_orders wo
where wo.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    wo.title ilike 'QA %'
    or wo.title ilike 'qa-%'
    or wo.title ilike '%stress%'
    or wo.description ilike 'QA %'
    or wo.description ilike '%qa-loc-%'
    or wo.description ilike '%regression%'
    or wo.description ilike '%stress%'
  );

create temp table cleanup_qa_parts on commit drop as
select p.id
from public.parts p
where p.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    p.name ilike 'QA %'
    or p.name ilike 'qa-%'
    or p.name ilike '%stress%'
    or p.sku ilike 'QA%'
    or p.sku ilike 'qa-%'
  );

create temp table cleanup_qa_assets on commit drop as
select a.id
from public.assets a
where a.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    a.name ilike 'QA %'
    or a.name ilike 'qa-%'
    or a.name ilike '%stress%'
    or a.name ilike '%qa-loc-%'
  );

create temp table cleanup_qa_procedures on commit drop as
select pt.id
from public.procedure_templates pt
where pt.company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    pt.name ilike 'QA %'
    or pt.name ilike 'qa-%'
    or pt.name ilike '%stress%'
    or pt.name ilike '%qa-loc-%'
  );

delete from public.message_threads
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and work_order_id in (select id from cleanup_qa_work_orders);

delete from public.work_order_step_results
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and work_order_id in (select id from cleanup_qa_work_orders);

delete from public.work_order_events
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and work_order_id in (select id from cleanup_qa_work_orders);

delete from public.work_order_photos
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and work_order_id in (select id from cleanup_qa_work_orders);

delete from public.work_order_comments
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and work_order_id in (select id from cleanup_qa_work_orders);

delete from public.work_order_parts
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    work_order_id in (select id from cleanup_qa_work_orders)
    or part_id in (select id from cleanup_qa_parts)
  );

delete from public.maintenance_requests
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    title ilike 'QA %'
    or title ilike 'qa-%'
    or title ilike '%stress%'
    or description ilike 'QA %'
    or description ilike '%qa-loc-%'
    or description ilike '%stress%'
  );

delete from public.preventive_schedules
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and (
    title ilike 'QA %'
    or title ilike 'qa-%'
    or title ilike '%stress%'
    or asset_id in (select id from cleanup_qa_assets)
    or procedure_template_id in (select id from cleanup_qa_procedures)
  );

delete from public.work_orders
where id in (select id from cleanup_qa_work_orders);

delete from public.procedure_steps
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and procedure_template_id in (select id from cleanup_qa_procedures);

delete from public.procedure_templates
where id in (select id from cleanup_qa_procedures);

delete from public.part_documents
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and part_id in (select id from cleanup_qa_parts);

delete from public.parts
where id in (select id from cleanup_qa_parts);

update public.assets
set parent_asset_id = null
where company_id = '0875d674-7f07-4493-8668-701d192f4421'::uuid
  and parent_asset_id in (select id from cleanup_qa_assets);

delete from public.assets
where id in (select id from cleanup_qa_assets);

notify pgrst, 'reload schema';

commit;
