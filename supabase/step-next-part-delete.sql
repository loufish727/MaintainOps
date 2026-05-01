grant select, insert, update, delete on public.parts to authenticated;

drop policy if exists "Managers can delete unused parts" on public.parts;
create policy "Managers can delete unused parts"
on public.parts for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = parts.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
  and not exists (
    select 1
    from public.work_order_parts wop
    where wop.part_id = parts.id
      and wop.company_id = parts.company_id
  )
);

drop policy if exists "Upload owners can delete part documents" on storage.objects;
create policy "Upload owners can delete part documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

notify pgrst, 'reload schema';
