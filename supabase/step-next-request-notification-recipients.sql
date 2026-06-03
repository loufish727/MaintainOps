create table if not exists public.request_notification_recipients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  email text not null,
  label text,
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  email_key text generated always as (lower(trim(email))) stored,
  constraint request_notification_recipients_email_format
    check (email_key ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create unique index if not exists request_notification_recipients_company_location_email_idx
on public.request_notification_recipients(company_id, coalesce(location_id, '00000000-0000-0000-0000-000000000000'::uuid), email_key);

create index if not exists request_notification_recipients_company_idx
on public.request_notification_recipients(company_id, is_active);

alter table public.request_notification_recipients enable row level security;

grant select, insert, update, delete on public.request_notification_recipients to authenticated;
grant select, insert, update, delete on public.request_notification_recipients to service_role;

drop policy if exists "Members can read request notification recipients" on public.request_notification_recipients;
create policy "Members can read request notification recipients"
on public.request_notification_recipients for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Managers can create request notification recipients" on public.request_notification_recipients;
create policy "Managers can create request notification recipients"
on public.request_notification_recipients for insert
to authenticated
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = request_notification_recipients.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
  and (
    location_id is null
    or exists (
      select 1
      from public.locations l
      where l.id = request_notification_recipients.location_id
        and l.company_id = request_notification_recipients.company_id
    )
  )
);

drop policy if exists "Managers can update request notification recipients" on public.request_notification_recipients;
create policy "Managers can update request notification recipients"
on public.request_notification_recipients for update
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = request_notification_recipients.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
)
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = request_notification_recipients.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
  and (
    location_id is null
    or exists (
      select 1
      from public.locations l
      where l.id = request_notification_recipients.location_id
        and l.company_id = request_notification_recipients.company_id
    )
  )
);

drop policy if exists "Managers can delete request notification recipients" on public.request_notification_recipients;
create policy "Managers can delete request notification recipients"
on public.request_notification_recipients for delete
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = request_notification_recipients.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

notify pgrst, 'reload schema';
