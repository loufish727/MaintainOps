-- LFES asset financial register
-- Stores accounting-only asset fields separately from operational equipment records.

create table if not exists public.asset_financials (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid references public.assets(id) on delete set null,
  archived_asset_id uuid,
  archived_asset_name text,
  archived_asset_type text,
  archived_asset_code text,
  archived_manufacturer text,
  archived_model text,
  archived_location_id uuid,
  archived_location text,
  operational_deleted_at timestamptz,
  operational_deleted_by uuid references auth.users(id) on delete set null,
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

create or replace function private.archive_asset_financial_before_delete()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  update public.asset_financials af
  set asset_id = null,
      archived_asset_id = old.id,
      archived_asset_name = old.name,
      archived_asset_type = old.asset_type,
      archived_asset_code = old.asset_code,
      archived_manufacturer = old.manufacturer,
      archived_model = old.model,
      archived_location_id = old.location_id,
      archived_location = old.location,
      operational_deleted_at = now(),
      operational_deleted_by = auth.uid(),
      updated_at = now()
  where af.asset_id = old.id
    and af.company_id = old.company_id;

  return old;
end;
$$;

drop trigger if exists archive_asset_financial_before_delete on public.assets;
create trigger archive_asset_financial_before_delete
before delete on public.assets
for each row
execute function private.archive_asset_financial_before_delete();

drop policy if exists "Company members can read asset financials" on public.asset_financials;
drop policy if exists "Financial roles can read asset financials" on public.asset_financials;
create policy "Financial roles can read asset financials"
on public.asset_financials for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager', 'accounting')
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
  and asset_financials.asset_id is not null
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
  and (
    (
      asset_financials.asset_id is not null
      and exists (
        select 1
        from public.assets a
        where a.id = asset_financials.asset_id
          and a.company_id = asset_financials.company_id
      )
    )
    or (
      asset_financials.asset_id is null
      and asset_financials.archived_asset_id is not null
    )
  )
);

grant delete on public.asset_financials to authenticated;

drop policy if exists "Finance roles can delete archived asset financials" on public.asset_financials;
create policy "Finance roles can delete archived asset financials"
on public.asset_financials for delete
to authenticated
using (
  asset_financials.asset_id is null
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
);

revoke all on public.asset_financials from public, anon;
grant select, insert, update, delete on public.asset_financials to authenticated;
grant select, insert, update, delete on public.asset_financials to service_role;

notify pgrst, 'reload schema';
