create table if not exists private.request_email_notifications (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.maintenance_requests(id) on delete cascade,
  recipient_id uuid references public.request_notification_recipients(id) on delete set null,
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  recipient_email text not null,
  recipient_label text,
  request_title text not null,
  request_description text,
  request_priority text,
  requested_by_name text,
  requested_by_contact text,
  external_source text,
  status text not null default 'queued'
    check (status in ('queued', 'sending', 'sent', 'failed')),
  attempt_count integer not null default 0,
  last_error text,
  locked_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  recipient_key text generated always as (lower(trim(recipient_email))) stored,
  constraint request_email_notifications_email_format
    check (recipient_key ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create unique index if not exists request_email_notifications_request_email_idx
on private.request_email_notifications(request_id, recipient_key);

create index if not exists request_email_notifications_status_idx
on private.request_email_notifications(status, created_at);

create index if not exists request_email_notifications_request_idx
on private.request_email_notifications(request_id);

alter table private.request_email_notifications enable row level security;

revoke all on table private.request_email_notifications from anon;
revoke all on table private.request_email_notifications from authenticated;
grant usage on schema private to service_role;
grant select, insert, update, delete on private.request_email_notifications to service_role;

create or replace function private.enqueue_request_email_notifications()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  insert into private.request_email_notifications (
    request_id,
    recipient_id,
    company_id,
    location_id,
    recipient_email,
    recipient_label,
    request_title,
    request_description,
    request_priority,
    requested_by_name,
    requested_by_contact,
    external_source
  )
  select
    new.id,
    r.id,
    new.company_id,
    new.location_id,
    r.email,
    r.label,
    new.title,
    new.description,
    new.priority,
    new.requested_by_name,
    new.requested_by_contact,
    new.external_source
  from public.request_notification_recipients r
  where r.company_id = new.company_id
    and r.is_active = true
    and (r.location_id is null or r.location_id = new.location_id)
  on conflict (request_id, recipient_key) do nothing;

  return new;
end;
$$;

drop trigger if exists maintenance_requests_enqueue_request_email_notifications
on public.maintenance_requests;

create trigger maintenance_requests_enqueue_request_email_notifications
after insert on public.maintenance_requests
for each row
execute function private.enqueue_request_email_notifications();

notify pgrst, 'reload schema';
