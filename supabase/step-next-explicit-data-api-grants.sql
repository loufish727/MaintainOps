-- Explicit Data API grants for Supabase public schema tables.
--
-- Supabase is changing default public schema grants in 2026. Keep every table
-- exposed to supabase-js/PostgREST/GraphQL explicit, intentional, and paired
-- with RLS policies.
--
-- MaintainOps stance:
-- - Browser app access uses authenticated table grants plus RLS.
-- - Anonymous public QR access uses specific RPC grants, not direct table grants.
-- - service_role gets explicit table access for backend/admin tooling.

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update on public.companies to authenticated;
grant select, insert, update on public.company_members to authenticated;
grant select, insert, update on public.locations to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.assets to authenticated;
grant select, insert, update on public.asset_financials to authenticated;
grant select, insert, update, delete on public.work_orders to authenticated;
grant select, insert on public.work_order_comments to authenticated;
grant select, insert on public.work_order_photos to authenticated;
grant select, insert, update on public.preventive_schedules to authenticated;
grant select, insert, update, delete on public.parts to authenticated;
grant select, insert on public.work_order_parts to authenticated;
grant select, insert on public.part_documents to authenticated;
grant select, insert on public.work_order_events to authenticated;
grant select, insert, update on public.maintenance_requests to authenticated;
grant select, insert, update on public.procedure_templates to authenticated;
grant select, insert, update on public.procedure_steps to authenticated;
grant select, insert, update on public.work_order_step_results to authenticated;
grant select, insert, update on public.message_threads to authenticated;
grant select, insert on public.message_thread_members to authenticated;
grant select, insert on public.messages to authenticated;
grant select, insert, update on public.message_reads to authenticated;
grant select, insert, update on public.company_invites to authenticated;
grant select, insert, update on public.public_request_links to authenticated;
grant select, insert, update, delete on public.app_issue_reports to authenticated;

grant select, insert, update, delete on public.companies to service_role;
grant select, insert, update, delete on public.company_members to service_role;
grant select, insert, update, delete on public.locations to service_role;
grant select, insert, update, delete on public.profiles to service_role;
grant select, insert, update, delete on public.assets to service_role;
grant select, insert, update, delete on public.asset_financials to service_role;
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

grant execute on function public.create_company(text) to authenticated, service_role;
grant execute on function public.ensure_company_profile(uuid) to authenticated, service_role;
grant execute on function public.set_company_logo(uuid, text) to authenticated, service_role;
grant execute on function public.get_my_companies() to authenticated, service_role;
grant execute on function public.update_company_member_role(uuid, uuid, text) to authenticated, service_role;
grant execute on function public.create_company_invite(uuid, text, text) to authenticated, service_role;
grant execute on function public.accept_company_invites() to authenticated, service_role;
grant execute on function public.ensure_location_request_link(uuid) to authenticated, service_role;
grant execute on function public.get_public_request_intake(text) to anon, authenticated, service_role;
grant execute on function public.submit_public_location_request(text, text, text, text, text, text, text) to anon, authenticated, service_role;
grant execute on function public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint) to anon, authenticated, service_role;

notify pgrst, 'reload schema';
