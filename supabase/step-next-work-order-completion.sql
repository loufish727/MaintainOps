alter table public.work_orders
add column if not exists actual_minutes integer not null default 0;

alter table public.work_orders
add column if not exists completion_notes text;

alter table public.work_orders
add column if not exists completed_at timestamptz;

notify pgrst, 'reload schema';
