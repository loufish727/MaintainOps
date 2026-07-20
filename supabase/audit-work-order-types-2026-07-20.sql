select jsonb_build_object(
  'counts', (
    select coalesce(jsonb_object_agg(type, work_order_count), '{}'::jsonb)
    from (
      select type, count(*) as work_order_count
      from public.work_orders
      group by type
      order by type
    ) counts_by_type
  ),
  'default', (
    select column_default
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'work_orders'
      and column_name = 'type'
  ),
  'constraint', (
    select pg_get_constraintdef(oid)
    from pg_constraint
    where conrelid = 'public.work_orders'::regclass
      and conname = 'work_orders_type_check'
  ),
  'assignment_trigger_enabled', (
    select tgenabled = 'O'
    from pg_trigger
    where tgrelid = 'public.work_orders'::regclass
      and tgname = 'enforce_work_order_assignment_role'
  )
) as work_order_type_audit;
