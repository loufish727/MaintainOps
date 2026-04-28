alter table public.work_orders
add column if not exists type text not null default 'reactive'
check (type in ('request', 'reactive', 'preventive', 'inspection', 'corrective'));

notify pgrst, 'reload schema';
