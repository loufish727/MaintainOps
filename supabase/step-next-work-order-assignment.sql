alter table public.work_orders
add column if not exists assigned_to uuid references auth.users(id) on delete set null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'work_orders_company_assigned_profile_fkey'
  ) then
    alter table public.work_orders
      add constraint work_orders_company_assigned_profile_fkey
      foreign key (company_id, assigned_to)
      references public.profiles(company_id, user_id)
      on delete restrict;
  end if;
end $$;

create index if not exists work_orders_assigned_to_idx on public.work_orders(assigned_to);

drop policy if exists "Members can create work orders" on public.work_orders;
create policy "Members can create work orders"
on public.work_orders for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and created_by = auth.uid()
  and (
    assigned_to is null
    or exists (
      select 1 from public.profiles p
      where p.company_id = work_orders.company_id
        and p.user_id = assigned_to
    )
  )
  and (
    asset_id is null
    or exists (
      select 1 from public.assets a
      where a.id = asset_id
        and a.company_id = work_orders.company_id
    )
  )
);

drop policy if exists "Members can update work orders" on public.work_orders;
create policy "Members can update work orders"
on public.work_orders for update
to authenticated
using (private.is_company_member(company_id))
with check (
  private.is_company_member(company_id)
  and (
    assigned_to is null
    or exists (
      select 1 from public.profiles p
      where p.company_id = work_orders.company_id
        and p.user_id = assigned_to
    )
  )
  and (
    asset_id is null
    or exists (
      select 1 from public.assets a
      where a.id = asset_id
        and a.company_id = work_orders.company_id
    )
  )
);

notify pgrst, 'reload schema';
