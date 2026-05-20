drop policy if exists "Members can add company members" on public.company_members;
create policy "Members can add company members"
on public.company_members for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.company_members cm
    where cm.company_id = company_members.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
