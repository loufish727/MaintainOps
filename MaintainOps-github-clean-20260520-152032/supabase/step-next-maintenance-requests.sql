create table if not exists public.maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid references public.assets(id) on delete set null,
  title text not null,
  description text,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'critical')),
  status text not null default 'submitted' check (status in ('submitted', 'converted', 'rejected')),
  requested_by uuid not null references auth.users(id) on delete restrict,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  converted_work_order_id uuid references public.work_orders(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.maintenance_requests enable row level security;

drop policy if exists "Members can read maintenance requests" on public.maintenance_requests;
create policy "Members can read maintenance requests"
on public.maintenance_requests for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create maintenance requests" on public.maintenance_requests;
create policy "Members can create maintenance requests"
on public.maintenance_requests for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and requested_by = auth.uid()
);

drop policy if exists "Members can update maintenance requests" on public.maintenance_requests;
create policy "Members can update maintenance requests"
on public.maintenance_requests for update
to authenticated
using (private.is_company_member(company_id))
with check (private.is_company_member(company_id));

create index if not exists maintenance_requests_company_status_idx on public.maintenance_requests(company_id, status);
create index if not exists maintenance_requests_company_asset_idx on public.maintenance_requests(company_id, asset_id);

grant select, insert, update on public.maintenance_requests to authenticated;

notify pgrst, 'reload schema';
