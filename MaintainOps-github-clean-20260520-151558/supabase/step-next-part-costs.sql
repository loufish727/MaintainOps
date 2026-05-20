alter table public.parts
add column if not exists unit_cost numeric(12,2) not null default 0;

alter table public.work_order_parts
add column if not exists unit_cost_at_use numeric(12,2) not null default 0;

notify pgrst, 'reload schema';
