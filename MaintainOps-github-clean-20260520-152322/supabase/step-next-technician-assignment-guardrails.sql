-- Technician assignment guardrails.
--
-- Rule:
-- - Admins/managers can assign or reassign work to anyone.
-- - Technicians can create work orders and convert requests into work orders.
-- - Technicians can claim unassigned work for themselves.
-- - Technicians cannot assign work to another person, assign to an outside vendor,
--   clear an assignment, or steal work already assigned to another user.

drop trigger if exists enforce_work_order_assignment_role on public.work_orders;
drop function if exists public.enforce_work_order_assignment_role();

create or replace function public.enforce_work_order_assignment_role()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  new_has_vendor_note boolean;
  old_has_vendor_note boolean;
begin
  select cm.role into actor_role
  from public.company_members cm
  where cm.company_id = new.company_id
    and cm.user_id = auth.uid();

  if actor_role is null then
    raise exception 'Not a member of this company.';
  end if;

  if actor_role in ('admin', 'manager') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new_has_vendor_note := coalesce(new.description, '') like '%[Assignment: Outside vendor]%';

    if new.assigned_to is not null and new.assigned_to <> auth.uid() then
      raise exception 'Technicians can only assign new work to themselves or leave it unassigned.';
    end if;

    if new_has_vendor_note then
      raise exception 'Only managers or admins can assign work to an outside vendor.';
    end if;

    return new;
  end if;

  new_has_vendor_note := coalesce(new.description, '') like '%[Assignment: Outside vendor]%';
  old_has_vendor_note := coalesce(old.description, '') like '%[Assignment: Outside vendor]%';

  if new.assigned_to is distinct from old.assigned_to then
    if old.assigned_to is null and not old_has_vendor_note and new.assigned_to = auth.uid() then
      return new;
    end if;

    raise exception 'Technicians can only claim unassigned work for themselves.';
  end if;

  if new_has_vendor_note and not old_has_vendor_note then
    raise exception 'Only managers or admins can assign work to an outside vendor.';
  end if;

  return new;
end;
$$;

create trigger enforce_work_order_assignment_role
before insert or update on public.work_orders
for each row
execute function public.enforce_work_order_assignment_role();

drop policy if exists "Members can create work orders" on public.work_orders;
create policy "Members can create work orders"
on public.work_orders for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and created_by = auth.uid()
  and (
    assigned_to is null
    or assigned_to = auth.uid()
    or exists (
      select 1
      from public.company_members cm
      where cm.company_id = work_orders.company_id
        and cm.user_id = auth.uid()
        and cm.role in ('admin', 'manager')
    )
  )
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
    or assigned_to = auth.uid()
    or exists (
      select 1
      from public.company_members cm
      where cm.company_id = work_orders.company_id
        and cm.user_id = auth.uid()
        and cm.role in ('admin', 'manager')
    )
  )
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
