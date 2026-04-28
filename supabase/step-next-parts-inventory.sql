create table if not exists public.parts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  sku text,
  quantity_on_hand integer not null default 0,
  reorder_point integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_order_parts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete restrict,
  quantity_used integer not null check (quantity_used > 0),
  created_at timestamptz not null default now()
);

create index if not exists parts_company_id_idx on public.parts(company_id);
create index if not exists work_order_parts_company_id_idx on public.work_order_parts(company_id);
create index if not exists work_order_parts_work_order_id_idx on public.work_order_parts(work_order_id);

alter table public.parts enable row level security;
alter table public.work_order_parts enable row level security;

grant select, insert, update on public.parts to authenticated;
grant select, insert on public.work_order_parts to authenticated;

drop policy if exists "Members can read parts" on public.parts;
create policy "Members can read parts"
on public.parts for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create parts" on public.parts;
create policy "Members can create parts"
on public.parts for insert
to authenticated
with check (private.is_company_member(company_id));

drop policy if exists "Members can update parts" on public.parts;
create policy "Members can update parts"
on public.parts for update
to authenticated
using (private.is_company_member(company_id))
with check (private.is_company_member(company_id));

drop policy if exists "Members can read work order parts" on public.work_order_parts;
create policy "Members can read work order parts"
on public.work_order_parts for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create work order parts" on public.work_order_parts;
create policy "Members can create work order parts"
on public.work_order_parts for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.work_orders wo
    where wo.id = work_order_id
      and wo.company_id = work_order_parts.company_id
  )
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = work_order_parts.company_id
  )
);

notify pgrst, 'reload schema';
