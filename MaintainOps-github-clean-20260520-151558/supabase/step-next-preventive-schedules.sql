create table if not exists public.preventive_schedules (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  title text not null,
  frequency text not null default 'monthly' check (frequency in ('weekly', 'monthly', 'quarterly')),
  next_due_at date not null,
  active boolean not null default true,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists preventive_schedules_company_id_idx on public.preventive_schedules(company_id);
create index if not exists preventive_schedules_asset_id_idx on public.preventive_schedules(asset_id);

alter table public.preventive_schedules enable row level security;

grant select, insert, update on public.preventive_schedules to authenticated;

drop policy if exists "Members can read preventive schedules" on public.preventive_schedules;
create policy "Members can read preventive schedules"
on public.preventive_schedules for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create preventive schedules" on public.preventive_schedules;
create policy "Members can create preventive schedules"
on public.preventive_schedules for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and created_by = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = preventive_schedules.company_id
  )
);

drop policy if exists "Members can update preventive schedules" on public.preventive_schedules;
create policy "Members can update preventive schedules"
on public.preventive_schedules for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = preventive_schedules.company_id
  )
);

notify pgrst, 'reload schema';
