-- MaintainOps RLS hardening checkpoint.
-- Idempotent defensive grants/revokes for the current app-used surface.
-- Run after reviewing audit-rls-live-inventory-2026-05-27.sql output.

begin;

-- Ensure RLS is enabled on every app-used public table.
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.locations enable row level security;
alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.work_orders enable row level security;
alter table public.work_order_comments enable row level security;
alter table public.work_order_photos enable row level security;
alter table public.preventive_schedules enable row level security;
alter table public.parts enable row level security;
alter table public.work_order_parts enable row level security;
alter table public.part_documents enable row level security;
alter table public.work_order_events enable row level security;
alter table public.maintenance_requests enable row level security;
alter table public.procedure_templates enable row level security;
alter table public.procedure_steps enable row level security;
alter table public.work_order_step_results enable row level security;
alter table public.message_threads enable row level security;
alter table public.message_thread_members enable row level security;
alter table public.messages enable row level security;
alter table public.message_reads enable row level security;
alter table public.company_invites enable row level security;
alter table public.public_request_links enable row level security;
alter table public.app_issue_reports enable row level security;

-- Defensive: the browser/public QR path should not have direct anon table access.
revoke all on table
  public.companies,
  public.company_members,
  public.locations,
  public.profiles,
  public.assets,
  public.work_orders,
  public.work_order_comments,
  public.work_order_photos,
  public.preventive_schedules,
  public.parts,
  public.work_order_parts,
  public.part_documents,
  public.work_order_events,
  public.maintenance_requests,
  public.procedure_templates,
  public.procedure_steps,
  public.work_order_step_results,
  public.message_threads,
  public.message_thread_members,
  public.messages,
  public.message_reads,
  public.company_invites,
  public.public_request_links,
  public.app_issue_reports
from anon;

-- Keep Data API exposure explicit for authenticated app users and backend/admin tooling.
grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update on public.companies to authenticated;
grant select, insert, update on public.company_members to authenticated;
grant select, insert, update on public.locations to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.assets to authenticated;
grant select, insert, update, delete on public.work_orders to authenticated;
grant select, insert on public.work_order_comments to authenticated;
grant select, insert on public.work_order_photos to authenticated;
grant select, insert, update, delete on public.preventive_schedules to authenticated;
grant select, insert, update, delete on public.parts to authenticated;
grant select, insert on public.work_order_parts to authenticated;
grant select, insert on public.part_documents to authenticated;
grant select, insert on public.work_order_events to authenticated;
grant select, insert, update, delete on public.maintenance_requests to authenticated;
grant select, insert, update, delete on public.procedure_templates to authenticated;
grant select, insert, update, delete on public.procedure_steps to authenticated;
grant select, insert, update on public.work_order_step_results to authenticated;
grant select, insert, update on public.message_threads to authenticated;
grant select, insert on public.message_thread_members to authenticated;
grant select, insert on public.messages to authenticated;
grant select, insert, update on public.message_reads to authenticated;
grant select on public.company_invites to authenticated;
grant select, insert, update on public.public_request_links to authenticated;
grant select, insert, update on public.app_issue_reports to authenticated;

grant select, insert, update, delete on public.companies to service_role;
grant select, insert, update, delete on public.company_members to service_role;
grant select, insert, update, delete on public.locations to service_role;
grant select, insert, update, delete on public.profiles to service_role;
grant select, insert, update, delete on public.assets to service_role;
grant select, insert, update, delete on public.work_orders to service_role;
grant select, insert, update, delete on public.work_order_comments to service_role;
grant select, insert, update, delete on public.work_order_photos to service_role;
grant select, insert, update, delete on public.preventive_schedules to service_role;
grant select, insert, update, delete on public.parts to service_role;
grant select, insert, update, delete on public.work_order_parts to service_role;
grant select, insert, update, delete on public.part_documents to service_role;
grant select, insert, update, delete on public.work_order_events to service_role;
grant select, insert, update, delete on public.maintenance_requests to service_role;
grant select, insert, update, delete on public.procedure_templates to service_role;
grant select, insert, update, delete on public.procedure_steps to service_role;
grant select, insert, update, delete on public.work_order_step_results to service_role;
grant select, insert, update, delete on public.message_threads to service_role;
grant select, insert, update, delete on public.message_thread_members to service_role;
grant select, insert, update, delete on public.messages to service_role;
grant select, insert, update, delete on public.message_reads to service_role;
grant select, insert, update, delete on public.company_invites to service_role;
grant select, insert, update, delete on public.public_request_links to service_role;
grant select, insert, update, delete on public.app_issue_reports to service_role;

-- Remove anonymous/PUBLIC execute from every public function, then grant back the exact app surface.
do $$
declare
  signature text;
begin
  for signature in
    select p.oid::regprocedure::text
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
  loop
    execute format('revoke all on function %s from public, anon', signature);
  end loop;
end $$;

grant execute on function public.get_public_request_intake(text) to anon, authenticated, service_role;
grant execute on function public.submit_public_location_request(text, text, text, text, text, text, text) to anon, authenticated, service_role;
grant execute on function public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint) to anon, authenticated, service_role;

grant execute on function public.create_company(text) to authenticated, service_role;
grant execute on function public.ensure_company_profile(uuid) to authenticated, service_role;
grant execute on function public.set_company_logo(uuid, text) to authenticated, service_role;
grant execute on function public.get_my_companies() to authenticated, service_role;
grant execute on function public.update_company_member_role(uuid, uuid, text) to authenticated, service_role;
grant execute on function public.create_company_invite(uuid, text, text, uuid) to authenticated, service_role;
grant execute on function public.accept_company_invites() to authenticated, service_role;
grant execute on function public.ensure_location_request_link(uuid) to authenticated, service_role;
grant execute on function public.cancel_company_invite(uuid, uuid) to authenticated, service_role;
grant execute on function public.record_work_order_part_usage(uuid, uuid, uuid, integer) to authenticated, service_role;

notify pgrst, 'reload schema';

commit;
