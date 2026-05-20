alter table public.work_orders
add column if not exists failure_cause text,
add column if not exists resolution_summary text,
add column if not exists follow_up_needed boolean not null default false;

notify pgrst, 'reload schema';
