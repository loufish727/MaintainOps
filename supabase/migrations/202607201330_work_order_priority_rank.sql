begin;

alter table public.work_orders
add column if not exists priority_rank smallint generated always as (
  case priority
    when 'critical' then 4
    when 'high' then 3
    when 'medium' then 2
    when 'low' then 1
    else 0
  end
) stored;

create index if not exists work_orders_company_location_priority_idx
on public.work_orders(company_id, location_id, priority_rank desc, created_at desc);

commit;
