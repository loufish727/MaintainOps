-- Allow equipment file records to be deleted by the upload owner or company admins/managers.
-- Storage object delete is handled by step-next-equipment-document-delete-admins.sql.

grant delete on public.asset_documents to authenticated;
grant delete on public.asset_documents to service_role;

drop policy if exists "Upload owners can delete equipment document records" on public.asset_documents;
create policy "Upload owners can delete equipment document records"
on public.asset_documents for delete
to authenticated
using (
  private.is_company_member(company_id)
  and uploaded_by = auth.uid()
);

drop policy if exists "Managers can delete equipment document records" on public.asset_documents;
create policy "Managers can delete equipment document records"
on public.asset_documents for delete
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_documents.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
