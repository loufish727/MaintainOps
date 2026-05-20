alter table public.work_orders
add column if not exists safety_devices_checked boolean not null default false;

alter table public.work_orders
add column if not exists safety_devices_checked_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'work_orders_asset_completion_safety_check'
  ) then
    alter table public.work_orders
      add constraint work_orders_asset_completion_safety_check
      check (status <> 'completed' or asset_id is null or safety_devices_checked)
      not valid;
  end if;
end;
$$;

notify pgrst, 'reload schema';
