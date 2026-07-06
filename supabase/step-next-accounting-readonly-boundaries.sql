-- LFES accounting read-only hardening.
--
-- Accounting users remain company members so they can view operational screens,
-- but operational mutations must be denied at the database boundary. Financial
-- records are readable only by admin, manager, and accounting roles; writes stay
-- limited to admin and accounting.

create or replace function private.is_company_operational_editor(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager', 'technician', 'member')
  );
$$;

drop policy if exists "Financial roles can read asset financials" on public.asset_financials;
drop policy if exists "Company members can read asset financials" on public.asset_financials;
create policy "Financial roles can read asset financials"
on public.asset_financials for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager', 'accounting')
  )
);

drop policy if exists "Members can create locations" on public.locations;
create policy "Members can create locations"
on public.locations for insert
to authenticated
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can update locations" on public.locations;
create policy "Members can update locations"
on public.locations for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can create assets" on public.assets;
create policy "Members can create assets"
on public.assets for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and private.asset_belongs_to_company(company_id, parent_asset_id)
);

drop policy if exists "Members can update assets" on public.assets;
create policy "Members can update assets"
on public.assets for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and private.asset_belongs_to_company(company_id, parent_asset_id)
);

drop policy if exists "Members can create work orders" on public.work_orders;
create policy "Members can create work orders"
on public.work_orders for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and created_by = auth.uid()
  and (
    assigned_to is null
    or exists (
      select 1 from public.profiles p
      where p.company_id = work_orders.company_id
        and p.user_id = assigned_to
    )
  )
  and (
    asset_id is null
    or exists (
      select 1 from public.assets a
      where a.id = asset_id
        and a.company_id = work_orders.company_id
    )
  )
);

drop policy if exists "Members can update work orders" on public.work_orders;
create policy "Members can update work orders"
on public.work_orders for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and (
    assigned_to is null
    or exists (
      select 1 from public.profiles p
      where p.company_id = work_orders.company_id
        and p.user_id = assigned_to
    )
  )
  and (
    asset_id is null
    or exists (
      select 1 from public.assets a
      where a.id = asset_id
        and a.company_id = work_orders.company_id
    )
  )
);

drop policy if exists "Members can create comments" on public.work_order_comments;
create policy "Members can create comments"
on public.work_order_comments for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and author_id = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_comments.company_id
  )
);

drop policy if exists "Members can create photo records" on public.work_order_photos;
create policy "Members can create photo records"
on public.work_order_photos for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_photos.company_id
  )
);

drop policy if exists "Upload owners and managers can delete photo records" on public.work_order_photos;
create policy "Upload owners and managers can delete photo records"
on public.work_order_photos for delete
to authenticated
using (
  private.is_company_operational_editor(company_id)
  and (
    uploaded_by = auth.uid()
    or exists (
      select 1
      from public.company_members cm
      where cm.company_id = work_order_photos.company_id
        and cm.user_id = auth.uid()
        and cm.role in ('admin', 'manager')
    )
  )
);

drop policy if exists "Members can create preventive schedules" on public.preventive_schedules;
create policy "Members can create preventive schedules"
on public.preventive_schedules for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and created_by = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = preventive_schedules.company_id
  )
);

drop policy if exists "Members can update preventive schedules" on public.preventive_schedules;
create policy "Members can update preventive schedules"
on public.preventive_schedules for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = preventive_schedules.company_id
  )
);

drop policy if exists "Members can create parts" on public.parts;
create policy "Members can create parts"
on public.parts for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

drop policy if exists "Members can update parts" on public.parts;
create policy "Members can update parts"
on public.parts for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (
  private.is_company_operational_editor(company_id)
  and private.location_belongs_to_company(company_id, location_id)
);

drop policy if exists "Members can create work order parts" on public.work_order_parts;
create policy "Members can create work order parts"
on public.work_order_parts for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_parts.company_id
  )
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = work_order_parts.company_id
  )
);

drop policy if exists "Members can create part documents" on public.part_documents;
create policy "Members can create part documents"
on public.part_documents for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = part_documents.company_id
  )
);

drop policy if exists "Members can create work order events" on public.work_order_events;
create policy "Members can create work order events"
on public.work_order_events for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_events.company_id
  )
);

drop policy if exists "Members can create asset events" on public.asset_events;
create policy "Members can create asset events"
on public.asset_events for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_events.company_id
  )
);

drop policy if exists "Members can create maintenance requests" on public.maintenance_requests;
create policy "Members can create maintenance requests"
on public.maintenance_requests for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and requested_by = auth.uid()
);

drop policy if exists "Members can update maintenance requests" on public.maintenance_requests;
create policy "Members can update maintenance requests"
on public.maintenance_requests for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can create procedure templates" on public.procedure_templates;
create policy "Members can create procedure templates"
on public.procedure_templates for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and created_by = auth.uid()
);

drop policy if exists "Members can update procedure templates" on public.procedure_templates;
create policy "Members can update procedure templates"
on public.procedure_templates for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can create procedure steps" on public.procedure_steps;
create policy "Members can create procedure steps"
on public.procedure_steps for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and exists (
    select 1
    from public.procedure_templates template
    where template.id = procedure_steps.procedure_template_id
      and template.company_id = procedure_steps.company_id
  )
);

drop policy if exists "Members can update procedure steps" on public.procedure_steps;
create policy "Members can update procedure steps"
on public.procedure_steps for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can create work order step results" on public.work_order_step_results;
create policy "Members can create work order step results"
on public.work_order_step_results for insert
to authenticated
with check (
  private.is_company_operational_editor(company_id)
  and exists (
    select 1
    from public.work_orders work_order
    where work_order.id = work_order_step_results.work_order_id
      and work_order.company_id = work_order_step_results.company_id
  )
  and exists (
    select 1
    from public.procedure_steps step
    where step.id = work_order_step_results.procedure_step_id
      and step.company_id = work_order_step_results.company_id
  )
);

drop policy if exists "Members can update work order step results" on public.work_order_step_results;
create policy "Members can update work order step results"
on public.work_order_step_results for update
to authenticated
using (private.is_company_operational_editor(company_id))
with check (private.is_company_operational_editor(company_id));

drop policy if exists "Members can upload work order photos" on storage.objects;
create policy "Members can upload work order photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'work-order-photos'
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Upload owners can delete work order photos" on storage.objects;
create policy "Upload owners can delete work order photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'work-order-photos'
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

drop policy if exists "Members can upload part documents" on storage.objects;
create policy "Members can upload part documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'part-documents'
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Upload owners can delete part documents" on storage.objects;
create policy "Upload owners can delete part documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_operational_editor((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

notify pgrst, 'reload schema';
