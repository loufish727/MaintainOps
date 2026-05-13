grant select, insert, update, delete on public.maintenance_requests to authenticated;
grant select, insert, update, delete on public.preventive_schedules to authenticated;
grant select, insert, update, delete on public.procedure_templates to authenticated;
grant select, insert, update, delete on public.procedure_steps to authenticated;

grant select, insert, update, delete on public.maintenance_requests to service_role;
grant select, insert, update, delete on public.preventive_schedules to service_role;
grant select, insert, update, delete on public.procedure_templates to service_role;
grant select, insert, update, delete on public.procedure_steps to service_role;

drop policy if exists "Managers can delete maintenance requests" on public.maintenance_requests;
create policy "Managers can delete maintenance requests"
on public.maintenance_requests for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = maintenance_requests.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Managers can delete preventive schedules" on public.preventive_schedules;
create policy "Managers can delete preventive schedules"
on public.preventive_schedules for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = preventive_schedules.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Managers can delete procedure templates" on public.procedure_templates;
create policy "Managers can delete procedure templates"
on public.procedure_templates for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = procedure_templates.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Managers can delete procedure steps" on public.procedure_steps;
create policy "Managers can delete procedure steps"
on public.procedure_steps for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.procedure_templates template
    join public.company_members cm on cm.company_id = template.company_id
    where template.id = procedure_steps.procedure_template_id
      and template.company_id = procedure_steps.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Managers can delete maintenance request photos" on storage.objects;
create policy "Managers can delete maintenance request photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'maintenance-request-photos'
  and exists (
    select 1
    from public.maintenance_requests mr
    join public.company_members cm on cm.company_id = mr.company_id
    where mr.photo_storage_path = storage.objects.name
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
