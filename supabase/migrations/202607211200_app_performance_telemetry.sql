create table if not exists public.app_performance_samples (
  id bigint generated always as identity primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  recorded_by uuid default auth.uid() references auth.users(id) on delete set null,
  metric_name text not null,
  metric_value double precision not null,
  metric_unit text not null,
  context jsonb not null default '{}'::jsonb,
  sampled_at timestamptz not null default now(),
  constraint app_performance_samples_metric_name_check check (
    metric_name in (
      'session_start',
      'fcp_ms',
      'lcp_ms',
      'inp_ms',
      'cls',
      'workspace_ready_ms',
      'section_navigation_ms',
      'query_latency_ms',
      'client_error',
      'offline_event',
      'reconnect_ms',
      'connection_downlink_mbps',
      'connection_rtt_ms',
      'spatial_ready_ms',
      'spatial_fps',
      'spatial_frame_ms',
      'spatial_slow_frame_pct',
      'spatial_draw_calls',
      'spatial_triangles',
      'spatial_geometries',
      'spatial_textures',
      'webgl_context_loss'
    )
  ),
  constraint app_performance_samples_metric_unit_check check (
    metric_unit in ('count', 'ms', 'score', 'percent', 'fps', 'mbps')
  ),
  constraint app_performance_samples_metric_unit_pair_check check (
    (metric_name in ('session_start', 'client_error', 'offline_event', 'spatial_draw_calls', 'spatial_triangles', 'spatial_geometries', 'spatial_textures', 'webgl_context_loss') and metric_unit = 'count')
    or (metric_name in ('fcp_ms', 'lcp_ms', 'inp_ms', 'workspace_ready_ms', 'section_navigation_ms', 'query_latency_ms', 'reconnect_ms', 'connection_rtt_ms', 'spatial_ready_ms', 'spatial_frame_ms') and metric_unit = 'ms')
    or (metric_name = 'cls' and metric_unit = 'score')
    or (metric_name = 'spatial_slow_frame_pct' and metric_unit = 'percent')
    or (metric_name = 'spatial_fps' and metric_unit = 'fps')
    or (metric_name = 'connection_downlink_mbps' and metric_unit = 'mbps')
  ),
  constraint app_performance_samples_metric_value_check check (
    metric_value between 0 and 1000000000
  ),
  constraint app_performance_samples_context_check check (
    jsonb_typeof(context) = 'object' and octet_length(context::text) <= 2048
  )
);

create index if not exists app_performance_samples_company_metric_sampled_idx
  on public.app_performance_samples(company_id, metric_name, sampled_at desc);

create index if not exists app_performance_samples_sampled_idx
  on public.app_performance_samples(sampled_at);

alter table public.app_performance_samples enable row level security;

revoke all on table public.app_performance_samples from public, anon, authenticated;
revoke all on sequence public.app_performance_samples_id_seq from public, anon, authenticated;

create or replace function public.record_app_performance_samples(
  target_company_id uuid,
  samples jsonb
)
returns integer
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  sample jsonb;
  sample_metric text;
  sample_unit text;
  expected_unit text;
  sample_value double precision;
  inserted_count integer := 0;
  recent_count integer := 0;
begin
  if auth.uid() is null or not private.is_company_member(target_company_id) then
    raise exception 'Company membership required.';
  end if;

  if jsonb_typeof(samples) <> 'array'
     or jsonb_array_length(samples) < 1
     or jsonb_array_length(samples) > 20 then
    raise exception 'Provide between 1 and 20 performance samples.';
  end if;

  select count(*)
  into recent_count
  from public.app_performance_samples
  where company_id = target_company_id
    and recorded_by = auth.uid()
    and sampled_at >= now() - interval '1 minute';

  if recent_count + jsonb_array_length(samples) > 120 then
    raise exception 'Performance sample rate limit reached.';
  end if;

  for sample in select value from jsonb_array_elements(samples)
  loop
    if jsonb_typeof(sample) <> 'object' or jsonb_typeof(sample -> 'value') <> 'number' then
      raise exception 'Each performance sample must contain a numeric value.';
    end if;

    sample_metric := sample ->> 'metric';
    sample_unit := sample ->> 'unit';
    sample_value := (sample ->> 'value')::double precision;

    if sample_metric not in (
      'session_start', 'fcp_ms', 'lcp_ms', 'inp_ms', 'cls',
      'workspace_ready_ms', 'section_navigation_ms', 'query_latency_ms',
      'client_error', 'offline_event', 'reconnect_ms',
      'connection_downlink_mbps', 'connection_rtt_ms',
      'spatial_ready_ms', 'spatial_fps', 'spatial_frame_ms',
      'spatial_slow_frame_pct', 'spatial_draw_calls', 'spatial_triangles',
      'spatial_geometries', 'spatial_textures', 'webgl_context_loss'
    ) then
      raise exception 'Unsupported performance metric.';
    end if;

    if sample_unit not in ('count', 'ms', 'score', 'percent', 'fps', 'mbps') then
      raise exception 'Unsupported performance unit.';
    end if;

    expected_unit := case
      when sample_metric in ('session_start', 'client_error', 'offline_event', 'spatial_draw_calls', 'spatial_triangles', 'spatial_geometries', 'spatial_textures', 'webgl_context_loss') then 'count'
      when sample_metric in ('fcp_ms', 'lcp_ms', 'inp_ms', 'workspace_ready_ms', 'section_navigation_ms', 'query_latency_ms', 'reconnect_ms', 'connection_rtt_ms', 'spatial_ready_ms', 'spatial_frame_ms') then 'ms'
      when sample_metric = 'cls' then 'score'
      when sample_metric = 'spatial_slow_frame_pct' then 'percent'
      when sample_metric = 'spatial_fps' then 'fps'
      when sample_metric = 'connection_downlink_mbps' then 'mbps'
    end;

    if sample_unit is distinct from expected_unit then
      raise exception 'Performance metric unit does not match the metric.';
    end if;

    if sample_value < 0 or sample_value > 1000000000 then
      raise exception 'Performance sample is outside the accepted range.';
    end if;

    insert into public.app_performance_samples (
      company_id,
      recorded_by,
      metric_name,
      metric_value,
      metric_unit,
      context
    ) values (
      target_company_id,
      auth.uid(),
      sample_metric,
      sample_value,
      sample_unit,
      jsonb_strip_nulls(jsonb_build_object(
        'source', nullif(left(sample #>> '{context,source}', 48), ''),
        'device_tier', nullif(left(sample #>> '{context,device_tier}', 24), ''),
        'viewport_class', nullif(left(sample #>> '{context,viewport_class}', 24), ''),
        'connection_type', nullif(left(sample #>> '{context,connection_type}', 24), ''),
        'quality_tier', nullif(left(sample #>> '{context,quality_tier}', 24), ''),
        'online', case when sample #>> '{context,online}' in ('true', 'false') then (sample #>> '{context,online}')::boolean end,
        'save_data', case when sample #>> '{context,save_data}' in ('true', 'false') then (sample #>> '{context,save_data}')::boolean end
      ))
    );
    inserted_count := inserted_count + 1;
  end loop;

  delete from public.app_performance_samples
  where sampled_at < now() - interval '90 days';

  return inserted_count;
end;
$$;

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

  with filtered as (
    select metric_name, metric_value, metric_unit, recorded_by, sampled_at
    from public.app_performance_samples
    where company_id = target_company_id
      and sampled_at >= now() - make_interval(days => safe_days)
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

revoke all on function public.record_app_performance_samples(uuid, jsonb) from public, anon;
revoke all on function public.get_app_performance_dashboard(uuid, integer) from public, anon;
grant execute on function public.record_app_performance_samples(uuid, jsonb) to authenticated;
grant execute on function public.get_app_performance_dashboard(uuid, integer) to authenticated;
