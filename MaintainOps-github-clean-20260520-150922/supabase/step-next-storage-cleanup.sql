drop policy if exists "Upload owners can delete work order photos" on storage.objects;
create policy "Upload owners can delete work order photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'work-order-photos'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

drop policy if exists "Upload owners can delete part documents" on storage.objects;
create policy "Upload owners can delete part documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

notify pgrst, 'reload schema';
