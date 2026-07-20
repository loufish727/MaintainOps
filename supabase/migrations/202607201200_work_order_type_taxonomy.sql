begin;

alter table public.work_orders
drop constraint if exists work_orders_type_check;

do $$
begin
  if exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.work_orders'::regclass
      and tgname = 'enforce_work_order_assignment_role'
      and not tgisinternal
  ) then
    alter table public.work_orders
    disable trigger enforce_work_order_assignment_role;
  end if;
end;
$$;

update public.work_orders
set type = case
  when type in ('reactive', 'request') then 'corrective'
  when type = 'inspection' then 'preventive'
  else type
end
where type in ('reactive', 'request', 'inspection');

do $$
begin
  if exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.work_orders'::regclass
      and tgname = 'enforce_work_order_assignment_role'
      and not tgisinternal
  ) then
    alter table public.work_orders
    enable trigger enforce_work_order_assignment_role;
  end if;
end;
$$;

alter table public.work_orders
alter column type set default 'corrective';

alter table public.work_orders
add constraint work_orders_type_check
check (type in ('corrective', 'preventive', 'fabrication'));

commit;
