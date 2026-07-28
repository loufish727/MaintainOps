-- Report at most one Web Vital reading per browser session.
-- Existing raw samples remain untouched; repeated visibility-change captures are
-- excluded only while building the aggregate dashboard.

create or replace function public.get_app_performance_dashboard(
  target_company_id uuid,
  window_days integer default 30
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, private, pg_temp
as $$
declare
  safe_days integer := greatest(1, least(coalesce(window_days, 30), 90));
  result jsonb;
begin
  if auth.uid() is null or not private.is_company_member(target_company_id) then
    raise exception 'Company membership required.';
  end if;

  with raw_samples as (
    select
      id,
      metric_name,
      metric_value,
      metric_unit,
      recorded_by,
      sampled_at
    from public.app_performance_samples
    where company_id = target_company_id
      and sampled_at >= now() - make_interval(days => safe_days)
  ),
  sessionized as (
    select
      raw_samples.*,
      count(*) filter (where metric_name = 'session_start') over (
        partition by recorded_by
        order by sampled_at, id
        rows between unbounded preceding and current row
      ) as session_number
    from raw_samples
  ),
  ranked as (
    select
      sessionized.*,
      row_number() over (
        partition by recorded_by, session_number, metric_name
        order by sampled_at desc, id desc
      ) as session_metric_rank
    from sessionized
  ),
  filtered as (
    select metric_name, metric_value, metric_unit, recorded_by, sampled_at
    from ranked
    where metric_name not in ('fcp_ms', 'lcp_ms', 'inp_ms', 'cls')
       or session_metric_rank = 1
  ),
  metric_stats as (
    select
      metric_name,
      min(metric_unit) as unit,
      count(*) as sample_count,
      round(avg(metric_value)::numeric, 3) as average,
      round(percentile_disc(0.50) within group (order by metric_value)::numeric, 3) as p50,
      round(percentile_disc(0.75) within group (order by metric_value)::numeric, 3) as p75,
      round(percentile_disc(0.95) within group (order by metric_value)::numeric, 3) as p95,
      round(max(metric_value)::numeric, 3) as maximum,
      max(sampled_at) as latest_at
    from filtered
    group by metric_name
  ),
  days as (
    select generate_series(
      current_date - (safe_days - 1),
      current_date,
      interval '1 day'
    )::date as day
  ),
  daily_stats as (
    select
      days.day,
      count(filtered.metric_name) as sample_count,
      count(*) filter (where filtered.metric_name = 'session_start') as sessions,
      coalesce(sum(filtered.metric_value) filter (where filtered.metric_name = 'client_error'), 0) as errors,
      round(percentile_disc(0.75) within group (order by filtered.metric_value)
        filter (where filtered.metric_name = 'lcp_ms')::numeric, 3) as lcp_p75,
      round(percentile_disc(0.75) within group (order by filtered.metric_value)
        filter (where filtered.metric_name = 'query_latency_ms')::numeric, 3) as query_p75
    from days
    left join filtered on filtered.sampled_at >= days.day::timestamptz
      and filtered.sampled_at < (days.day + 1)::timestamptz
    group by days.day
    order by days.day
  )
  select jsonb_build_object(
    'status', case when exists(select 1 from filtered) then 'current' else 'collecting' end,
    'window_days', safe_days,
    'retention_days', 90,
    'sample_count', (select count(*) from filtered),
    'raw_sample_count', (select count(*) from raw_samples),
    'duplicate_vital_samples_ignored', (
      select count(*)
      from ranked
      where metric_name in ('fcp_ms', 'lcp_ms', 'inp_ms', 'cls')
        and session_metric_rank > 1
    ),
    'session_count', coalesce((select sum(metric_value) from filtered where metric_name = 'session_start'), 0),
    'contributing_users', (select count(distinct recorded_by) from filtered),
    'updated_at', (select max(sampled_at) from filtered),
    'metrics', coalesce((
      select jsonb_object_agg(metric_name, jsonb_build_object(
        'unit', unit,
        'count', sample_count,
        'average', average,
        'p50', p50,
        'p75', p75,
        'p95', p95,
        'max', maximum,
        'latest_at', latest_at
      ))
      from metric_stats
    ), '{}'::jsonb),
    'daily', coalesce((
      select jsonb_agg(jsonb_build_object(
        'date', day,
        'samples', sample_count,
        'sessions', sessions,
        'errors', errors,
        'lcp_p75', lcp_p75,
        'query_p75', query_p75
      ) order by day)
      from daily_stats
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_app_performance_dashboard(uuid, integer) from public, anon;
grant execute on function public.get_app_performance_dashboard(uuid, integer) to authenticated;

notify pgrst, 'reload schema';
