create or replace function public.claim_request_email_notifications(p_request_id uuid)
returns table (
  id uuid,
  request_id uuid,
  recipient_email text,
  recipient_label text,
  request_title text,
  request_description text,
  request_priority text,
  requested_by_name text,
  requested_by_contact text,
  external_source text,
  attempt_count integer
)
language plpgsql
security definer
set search_path = public, private
as $$
begin
  return query
  update private.request_email_notifications n
  set
    status = 'sending',
    attempt_count = n.attempt_count + 1,
    locked_at = now(),
    updated_at = now()
  where n.request_id = p_request_id
    and n.status in ('queued', 'failed')
    and n.attempt_count < 3
  returning
    n.id,
    n.request_id,
    n.recipient_email,
    n.recipient_label,
    n.request_title,
    n.request_description,
    n.request_priority,
    n.requested_by_name,
    n.requested_by_contact,
    n.external_source,
    n.attempt_count;
end;
$$;

create or replace function public.complete_request_email_notification(
  p_notification_id uuid,
  p_sent boolean,
  p_error text default null
)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  update private.request_email_notifications
  set
    status = case when p_sent then 'sent' else 'failed' end,
    sent_at = case when p_sent then now() else sent_at end,
    last_error = case when p_sent then null else left(coalesce(p_error, 'Unknown email sender error'), 1000) end,
    updated_at = now()
  where id = p_notification_id;
end;
$$;

revoke all on function public.claim_request_email_notifications(uuid) from anon, authenticated;
revoke all on function public.complete_request_email_notification(uuid, boolean, text) from anon, authenticated;
grant execute on function public.claim_request_email_notifications(uuid) to service_role;
grant execute on function public.complete_request_email_notification(uuid, boolean, text) to service_role;

notify pgrst, 'reload schema';
