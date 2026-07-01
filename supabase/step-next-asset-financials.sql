-- LFES asset financial register
-- Stores accounting-only asset fields separately from operational equipment records.

create table if not exists public.asset_financials (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  asset_tag text,
  acquisition_date date,
  acquisition_cost numeric(14, 2),
  depreciation_method text,
  useful_life_years numeric(6, 2),
  current_book_value numeric(14, 2),
  tax_jurisdiction text,
  ownership_status text check (ownership_status in ('owned', 'leased', 'rented', 'disposed') or ownership_status is null),
  in_service_date date,
  disposal_date date,
  disposal_notes text,
  gl_account_code text,
  cost_center text,
  finance_notes text,
  needs_review boolean not null default true,
  last_reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (asset_id),
  unique (company_id, asset_id)
);

create index if not exists asset_financials_company_idx on public.asset_financials(company_id);
create index if not exists asset_financials_asset_idx on public.asset_financials(asset_id);
create index if not exists asset_financials_review_idx on public.asset_financials(company_id, needs_review);

alter table public.asset_financials enable row level security;

drop policy if exists "Company members can read asset financials" on public.asset_financials;
create policy "Company members can read asset financials"
on public.asset_financials for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
  )
);

drop policy if exists "Finance roles can insert asset financials" on public.asset_financials;
create policy "Finance roles can insert asset financials"
on public.asset_financials for insert
to authenticated
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and exists (
    select 1
    from public.assets a
    where a.id = asset_financials.asset_id
      and a.company_id = asset_financials.company_id
  )
);

drop policy if exists "Finance roles can update asset financials" on public.asset_financials;
create policy "Finance roles can update asset financials"
on public.asset_financials for update
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
)
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and exists (
    select 1
    from public.assets a
    where a.id = asset_financials.asset_id
      and a.company_id = asset_financials.company_id
  )
);

revoke all on public.asset_financials from public, anon;
grant select, insert, update on public.asset_financials to authenticated;
grant select, insert, update, delete on public.asset_financials to service_role;

notify pgrst, 'reload schema';
