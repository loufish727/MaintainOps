create table if not exists public.work_order_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  event_type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create index if not exists work_order_events_company_id_idx on public.work_order_events(company_id);
create index if not exists work_order_events_work_order_id_idx on public.work_order_events(work_order_id);

alter table public.work_order_events enable row level security;

grant select, insert on public.work_order_events to authenticated;

drop policy if exists "Members can read work order events" on public.work_order_events;
create policy "Members can read work order events"
on public.work_order_events for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create work order events" on public.work_order_events;
create policy "Members can create work order events"
on public.work_order_events for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_events.company_id
  )
);

notify pgrst, 'reload schema';
