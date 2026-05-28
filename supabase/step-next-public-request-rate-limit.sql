-- Adds a lightweight per-link throttle to anonymous public request intake.
-- Intended limit: 10 submissions per public request link per minute.

create table if not exists private.public_request_rate_limits (
  public_request_link_id uuid not null references public.public_request_links(id) on delete cascade,
  window_start timestamptz not null,
  submission_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (public_request_link_id, window_start)
);

alter table private.public_request_rate_limits enable row level security;

revoke all on table private.public_request_rate_limits from anon;
revoke all on table private.public_request_rate_limits from authenticated;

create or replace function public.submit_public_location_request(
  request_token text,
  request_title text,
  request_description text default null,
  requester_name text default null,
  requester_contact text default null,
  equipment_note text default null,
  request_priority text default 'medium'
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  link_row record;
  clean_title text;
  clean_priority text;
  clean_description text;
  new_request_id uuid;
  rate_window timestamptz;
  current_count integer;
begin
  select prl.id, prl.company_id, prl.location_id
  into link_row
  from public.public_request_links prl
  where prl.token = request_token
    and prl.is_active = true;

  if link_row.company_id is null then
    raise exception 'Request link is inactive or invalid.';
  end if;

  rate_window := date_trunc('minute', now());

  insert into private.public_request_rate_limits (
    public_request_link_id,
    window_start,
    submission_count
  )
  values (
    link_row.id,
    rate_window,
    1
  )
  on conflict (public_request_link_id, window_start)
  do update
    set submission_count = private.public_request_rate_limits.submission_count + 1,
        updated_at = now()
  returning submission_count into current_count;

  if current_count > 10 then
    raise exception 'Too many requests. Please wait a minute and try again.';
  end if;

  delete from private.public_request_rate_limits
  where window_start < now() - interval '1 day';

  clean_title := left(trim(coalesce(request_title, '')), 140);
  if clean_title = '' then
    raise exception 'Issue description is required.';
  end if;

  clean_priority := case
    when request_priority in ('low', 'medium', 'high', 'critical') then request_priority
    else 'medium'
  end;

  clean_description := concat_ws(E'\n\n',
    nullif(left(trim(coalesce(request_description, '')), 1000), ''),
    case when nullif(trim(coalesce(equipment_note, '')), '') is not null
      then 'Machine / area: ' || left(trim(equipment_note), 140)
      else null
    end,
    case when nullif(trim(coalesce(requester_name, '')), '') is not null
      then 'Submitted by: ' || left(trim(requester_name), 120)
      else null
    end,
    case when nullif(trim(coalesce(requester_contact, '')), '') is not null
      then 'Contact: ' || left(trim(requester_contact), 160)
      else null
    end
  );

  insert into public.maintenance_requests (
    company_id,
    location_id,
    title,
    description,
    priority,
    status,
    requested_by,
    requested_by_name,
    requested_by_contact,
    external_source
  )
  values (
    link_row.company_id,
    link_row.location_id,
    clean_title,
    nullif(clean_description, ''),
    clean_priority,
    'submitted',
    null,
    nullif(left(trim(coalesce(requester_name, '')), 120), ''),
    nullif(left(trim(coalesce(requester_contact, '')), 160), ''),
    'public_location_qr'
  )
  returning id into new_request_id;

  update public.public_request_links
  set last_used_at = now(),
      updated_at = now()
  where token = request_token;

  return new_request_id;
end;
$$;

grant execute on function public.submit_public_location_request(text, text, text, text, text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
