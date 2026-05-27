drop function if exists public.record_work_order_part_usage(uuid, uuid, uuid, integer);

create or replace function public.record_work_order_part_usage(
  p_company_id uuid,
  p_work_order_id uuid,
  p_part_id uuid,
  p_quantity integer
)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  current_quantity integer;
  current_unit_cost numeric(12,2);
begin
  if auth.uid() is null then
    raise exception 'Sign in before recording part usage.';
  end if;

  if p_quantity is null or p_quantity <= 0 then
    raise exception 'Quantity used must be greater than zero.';
  end if;

  if not private.is_company_member(p_company_id) then
    raise exception 'You do not have access to this company.';
  end if;

  if not exists (
    select 1
    from public.work_orders wo
    where wo.id = p_work_order_id
      and wo.company_id = p_company_id
  ) then
    raise exception 'Work order not found for this company.';
  end if;

  select p.quantity_on_hand, coalesce(p.unit_cost, 0)
  into current_quantity, current_unit_cost
  from public.parts p
  where p.id = p_part_id
    and p.company_id = p_company_id
  for update;

  if not found then
    raise exception 'Part not found for this company.';
  end if;

  insert into public.work_order_parts (
    company_id,
    work_order_id,
    part_id,
    quantity_used,
    unit_cost_at_use
  )
  values (
    p_company_id,
    p_work_order_id,
    p_part_id,
    p_quantity,
    current_unit_cost
  );

  update public.parts
  set quantity_on_hand = greatest(0, current_quantity - p_quantity),
      updated_at = now()
  where id = p_part_id
    and company_id = p_company_id;
end;
$$;

revoke all on function public.record_work_order_part_usage(uuid, uuid, uuid, integer) from public, anon;
grant execute on function public.record_work_order_part_usage(uuid, uuid, uuid, integer) to authenticated;

notify pgrst, 'reload schema';
