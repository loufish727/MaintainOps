grant delete on public.assets to authenticated;

drop policy if exists "Managers can delete unused assets" on public.assets;

create policy "Managers can delete unused assets"
on public.assets for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = assets.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
