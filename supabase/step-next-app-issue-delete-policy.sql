grant delete on public.app_issue_reports to authenticated;

drop policy if exists "Managers can delete app issue reports" on public.app_issue_reports;
create policy "Managers can delete app issue reports"
on public.app_issue_reports for delete
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = app_issue_reports.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
