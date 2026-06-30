alter table public.assets
add column if not exists created_by uuid references auth.users(id) on delete set null;

create or replace function private.set_asset_created_by()
returns trigger
language plpgsql
set search_path = public, private, pg_temp
as $$
begin
  if new.created_by is null then
    new.created_by := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists assets_set_created_by_trigger on public.assets;
create trigger assets_set_created_by_trigger
before insert on public.assets
for each row execute function private.set_asset_created_by();

do $$
begin
  if to_regclass('public.audit_log') is not null then
    update public.assets a
    set created_by = al.actor_id
    from (
      select distinct on (record_id) record_id, actor_id
      from public.audit_log
      where table_name = 'assets'
        and event_type = 'insert'
        and actor_id is not null
      order by record_id, created_at asc
    ) al
    where a.id = al.record_id
      and a.created_by is null;
  end if;
end $$;

create table if not exists public.asset_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  event_type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create index if not exists asset_events_company_id_idx on public.asset_events(company_id);
create index if not exists asset_events_asset_id_idx on public.asset_events(asset_id);
create index if not exists asset_events_company_asset_created_idx on public.asset_events(company_id, asset_id, created_at desc);

alter table public.asset_events enable row level security;

grant select, insert on public.asset_events to authenticated;
grant select, insert, update, delete on public.asset_events to service_role;

drop policy if exists "Members can read asset events" on public.asset_events;
create policy "Members can read asset events"
on public.asset_events for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create asset events" on public.asset_events;
create policy "Members can create asset events"
on public.asset_events for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and actor_id = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_events.company_id
  )
);

notify pgrst, 'reload schema';
