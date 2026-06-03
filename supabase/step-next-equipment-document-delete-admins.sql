-- Allow company admins/managers to clean up equipment document storage during equipment delete.
-- Upload owners can still delete their own equipment documents.

drop policy if exists "Upload owners can delete equipment documents" on storage.objects;
create policy "Upload owners can delete equipment documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'asset-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

drop policy if exists "Managers can delete equipment documents" on storage.objects;
create policy "Managers can delete equipment documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'asset-documents'
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = (storage.foldername(name))[1]::uuid
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
