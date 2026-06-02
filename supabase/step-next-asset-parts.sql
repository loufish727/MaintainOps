create table if not exists public.asset_parts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete restrict,
  quantity_recommended integer not null default 1 check (quantity_recommended > 0),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, asset_id, part_id)
);

create index if not exists asset_parts_company_id_idx on public.asset_parts(company_id);
create index if not exists asset_parts_asset_id_idx on public.asset_parts(asset_id);
create index if not exists asset_parts_part_id_idx on public.asset_parts(part_id);

alter table public.asset_parts enable row level security;

grant select, insert, update, delete on public.asset_parts to authenticated;
grant select, insert, update, delete on public.asset_parts to service_role;

drop policy if exists "Members can read equipment parts" on public.asset_parts;
create policy "Members can read equipment parts"
on public.asset_parts for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create equipment parts" on public.asset_parts;
create policy "Members can create equipment parts"
on public.asset_parts for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_parts.company_id
  )
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = asset_parts.company_id
  )
);

drop policy if exists "Members can update equipment parts" on public.asset_parts;
create policy "Members can update equipment parts"
on public.asset_parts for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_parts.company_id
  )
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = asset_parts.company_id
  )
);

drop policy if exists "Members can remove equipment parts" on public.asset_parts;
create policy "Members can remove equipment parts"
on public.asset_parts for delete
to authenticated
using (private.is_company_member(company_id));

notify pgrst, 'reload schema';
