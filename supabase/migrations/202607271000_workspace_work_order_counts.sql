create or replace function public.get_workspace_work_order_counts(
  target_company_id uuid,
  target_location_id uuid,
  target_my_work_filter text,
  target_today date,
  target_month_start timestamptz,
  target_week_start timestamptz,
  target_week_end timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = public, private
stable
as $$
declare
  result jsonb;
begin
  if auth.uid() is null or not private.is_company_member(target_company_id) then
    raise exception 'Company membership is required.';
  end if;

  if target_location_id is not null
    and not private.location_belongs_to_company(target_company_id, target_location_id) then
    raise exception 'Location does not belong to the company.';
  end if;

  if target_my_work_filter not in ('assigned', 'created') then
    raise exception 'Unsupported My Work filter.';
  end if;

  with scoped_work_orders as (
    select
      wo.status,
      wo.due_at,
      wo.completed_at,
      wo.assigned_to,
      wo.created_by
    from public.work_orders wo
    where wo.company_id = target_company_id
      and (target_location_id is null or wo.location_id = target_location_id)
  ),
  my_work_orders as (
    select *
    from scoped_work_orders wo
    where
      (target_my_work_filter = 'created' and wo.created_by = auth.uid())
      or
      (target_my_work_filter = 'assigned' and wo.assigned_to = auth.uid())
  ),
  company_counts as (
    select
      count(*) filter (where status <> 'completed')::integer as active_work,
      count(*) filter (where status = 'open')::integer as new_work,
      count(*) filter (where status = 'in_progress')::integer as in_progress,
      count(*) filter (where status = 'blocked')::integer as blocked,
      count(*) filter (where status <> 'completed' and due_at < target_today)::integer as overdue,
      count(*) filter (where status = 'completed')::integer as completed_all,
      count(*) filter (where completed_at >= target_month_start)::integer as completed_month,
      count(*) filter (
        where completed_at >= target_week_start
          and completed_at < target_week_end
      )::integer as completed_week
    from scoped_work_orders
  ),
  my_counts as (
    select
      count(*) filter (where status <> 'completed')::integer as active_work,
      count(*) filter (where status = 'open')::integer as new_work,
      count(*) filter (where status = 'in_progress')::integer as in_progress,
      count(*) filter (where status = 'blocked')::integer as blocked,
      count(*) filter (where status <> 'completed' and due_at < target_today)::integer as overdue,
      count(*) filter (where status = 'completed')::integer as completed_all,
      count(*) filter (where completed_at >= target_month_start)::integer as completed_month,
      count(*) filter (
        where completed_at >= target_week_start
          and completed_at < target_week_end
      )::integer as completed_week
    from my_work_orders
  )
  select jsonb_build_object(
    'workOrders', jsonb_build_object(
      'activeWork', company_counts.active_work,
      'newWork', company_counts.new_work,
      'inProgress', company_counts.in_progress,
      'blocked', company_counts.blocked,
      'overdue', company_counts.overdue,
      'completedAll', company_counts.completed_all,
      'completedMonth', company_counts.completed_month,
      'completedWeek', company_counts.completed_week
    ),
    'myWork', jsonb_build_object(
      'activeWork', my_counts.active_work,
      'newWork', my_counts.new_work,
      'inProgress', my_counts.in_progress,
      'blocked', my_counts.blocked,
      'overdue', my_counts.overdue,
      'completedAll', my_counts.completed_all,
      'completedMonth', my_counts.completed_month,
      'completedWeek', my_counts.completed_week
    )
  )
  into result
  from company_counts
  cross join my_counts;

  return result;
end;
$$;

revoke all on function public.get_workspace_work_order_counts(
  uuid,
  uuid,
  text,
  date,
  timestamptz,
  timestamptz,
  timestamptz
) from public, anon;

grant execute on function public.get_workspace_work_order_counts(
  uuid,
  uuid,
  text,
  date,
  timestamptz,
  timestamptz,
  timestamptz
) to authenticated;
