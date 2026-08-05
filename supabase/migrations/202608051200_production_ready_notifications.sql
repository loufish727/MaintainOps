-- Add targeted, in-app Production Ready notifications without changing work-order
-- status, assignment, dashboard counts, or email delivery.

create table if not exists public.work_order_notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  source_event_id uuid not null references public.work_order_events(id) on delete cascade,
  kind text not null check (kind in ('production_action_completed')),
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  unique (source_event_id, recipient_id)
);

create index if not exists work_order_notifications_recipient_unread_idx
on public.work_order_notifications(company_id, recipient_id, created_at desc)
where read_at is null;

create index if not exists work_order_notifications_work_order_idx
on public.work_order_notifications(company_id, work_order_id, created_at desc);

alter table public.work_order_notifications enable row level security;

revoke all on public.work_order_notifications from public, anon, authenticated;
grant select on public.work_order_notifications to authenticated;
grant update (read_at) on public.work_order_notifications to authenticated;

drop policy if exists "Recipients can read work order notifications" on public.work_order_notifications;
create policy "Recipients can read work order notifications"
on public.work_order_notifications for select
to authenticated
using (
  recipient_id = auth.uid()
  and private.is_company_member(company_id)
);

drop policy if exists "Recipients can mark work order notifications read" on public.work_order_notifications;
create policy "Recipients can mark work order notifications read"
on public.work_order_notifications for update
to authenticated
using (
  recipient_id = auth.uid()
  and private.is_company_member(company_id)
)
with check (
  recipient_id = auth.uid()
  and private.is_company_member(company_id)
);

create or replace function private.record_work_order_production_action_event()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
declare
  event_name text;
  event_summary text;
  assignee_name text;
  actor_name text;
  action_text text;
  assignee_id uuid;
  event_id uuid;
  primary_recipient_id uuid;
begin
  if tg_op = 'INSERT' then
    if new.production_action is null then return new; end if;
    event_name := 'production_action_created';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action is null and new.production_action is not null then
    event_name := 'production_action_created';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action is not null and new.production_action is null then
    event_name := 'production_action_removed';
    action_text := old.production_action;
    assignee_id := old.production_action_assigned_to;
  elsif old.production_action_status is distinct from new.production_action_status
    and new.production_action_status = 'completed' then
    event_name := 'production_action_completed';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action_status is distinct from new.production_action_status
    and new.production_action_status = 'open' then
    event_name := 'production_action_reopened';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  elsif old.production_action is distinct from new.production_action
    or old.production_action_assigned_to is distinct from new.production_action_assigned_to then
    event_name := 'production_action_updated';
    action_text := new.production_action;
    assignee_id := new.production_action_assigned_to;
  else
    return new;
  end if;

  select p.full_name into assignee_name
  from public.profiles p
  where p.company_id = new.company_id and p.user_id = assignee_id;

  select p.full_name into actor_name
  from public.profiles p
  where p.company_id = new.company_id and p.user_id = auth.uid();

  event_summary := case event_name
    when 'production_action_created' then format('Production Action assigned to %s: %s', coalesce(nullif(assignee_name, ''), 'Production'), left(action_text, 180))
    when 'production_action_updated' then format('Production Action updated for %s: %s', coalesce(nullif(assignee_name, ''), 'Production'), left(action_text, 180))
    when 'production_action_completed' then format('Production Action completed by %s.', coalesce(nullif(actor_name, ''), 'Production'))
    when 'production_action_reopened' then format('Production Action reopened for %s: %s', coalesce(nullif(assignee_name, ''), 'Production'), left(action_text, 180))
    else format('Production Action removed: %s', left(action_text, 180))
  end;

  insert into public.work_order_events (company_id, work_order_id, actor_id, event_type, summary)
  values (new.company_id, new.id, auth.uid(), event_name, event_summary)
  returning id into event_id;

  if event_name <> 'production_action_completed' then return new; end if;

  select cm.user_id into primary_recipient_id
  from public.company_members cm
  where cm.company_id = new.company_id
    and cm.user_id = new.assigned_to
    and cm.user_id is distinct from auth.uid()
  limit 1;

  if primary_recipient_id is not null then
    insert into public.work_order_notifications (
      company_id,
      work_order_id,
      recipient_id,
      actor_id,
      source_event_id,
      kind,
      title,
      body
    ) values (
      new.company_id,
      new.id,
      primary_recipient_id,
      auth.uid(),
      event_id,
      'production_action_completed',
      format('Production ready: %s', new.title),
      format(
        'Production Action completed by %s. This work order is ready for Maintenance.',
        coalesce(nullif(actor_name, ''), 'Production')
      )
    )
    on conflict (source_event_id, recipient_id) do nothing;
  else
    insert into public.work_order_notifications (
      company_id,
      work_order_id,
      recipient_id,
      actor_id,
      source_event_id,
      kind,
      title,
      body
    )
    select
      new.company_id,
      new.id,
      cm.user_id,
      auth.uid(),
      event_id,
      'production_action_completed',
      format('Production ready: %s', new.title),
      format(
        'Production Action completed by %s. This unassigned work order is ready for Maintenance.',
        coalesce(nullif(actor_name, ''), 'Production')
      )
    from public.company_members cm
    where cm.company_id = new.company_id
      and (cm.user_id = new.created_by or cm.role in ('admin', 'manager'))
      and cm.user_id is distinct from auth.uid()
    on conflict (source_event_id, recipient_id) do nothing;
  end if;

  return new;
end;
$$;

revoke all on function private.record_work_order_production_action_event() from public, anon, authenticated;

notify pgrst, 'reload schema';
