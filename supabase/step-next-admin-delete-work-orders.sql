grant delete on public.work_orders to authenticated;

drop policy if exists "Admins can delete work orders" on public.work_orders;
create policy "Admins can delete work orders"
on public.work_orders for delete
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = work_orders.company_id
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

drop policy if exists "Admins can delete work order photos" on storage.objects;
create policy "Admins can delete work order photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'work-order-photos'
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = (storage.foldername(name))[1]::uuid
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

notify pgrst, 'reload schema';
