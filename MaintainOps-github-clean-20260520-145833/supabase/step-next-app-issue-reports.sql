create table if not exists public.app_issue_reports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  screen text,
  page_url text,
  severity text not null default 'normal' check (severity in ('minor', 'normal', 'blocking')),
  title text not null,
  details text not null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists app_issue_reports_company_created_idx
on public.app_issue_reports(company_id, created_at desc);

create index if not exists app_issue_reports_company_status_idx
on public.app_issue_reports(company_id, status);

alter table public.app_issue_reports enable row level security;

grant select, insert, update on public.app_issue_reports to authenticated;

drop policy if exists "Members can read app issue reports" on public.app_issue_reports;
create policy "Members can read app issue reports"
on public.app_issue_reports for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create app issue reports" on public.app_issue_reports;
create policy "Members can create app issue reports"
on public.app_issue_reports for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and reporter_id = auth.uid()
);

drop policy if exists "Managers can update app issue reports" on public.app_issue_reports;
create policy "Managers can update app issue reports"
on public.app_issue_reports for update
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
)
with check (
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
