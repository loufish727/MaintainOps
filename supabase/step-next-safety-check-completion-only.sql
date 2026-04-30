update public.work_orders
set safety_devices_checked = false,
    safety_devices_checked_at = null
where status <> 'completed'
  and safety_devices_checked = true;

alter table public.work_orders
drop constraint if exists work_orders_safety_check_completion_only;

alter table public.work_orders
add constraint work_orders_safety_check_completion_only
check (status = 'completed' or safety_devices_checked = false)
not valid;

alter table public.work_orders
validate constraint work_orders_safety_check_completion_only;
