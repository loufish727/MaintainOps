grant delete on public.work_order_photos to authenticated;

drop policy if exists "Upload owners and managers can delete photo records" on public.work_order_photos;
create policy "Upload owners and managers can delete photo records"
on public.work_order_photos for delete
to authenticated
using (
  private.is_company_member(company_id)
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

notify pgrst, 'reload schema';
