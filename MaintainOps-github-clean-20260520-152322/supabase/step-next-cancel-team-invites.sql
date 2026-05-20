create or replace function public.cancel_company_invite(
  target_company_id uuid,
  target_invite_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  deleted_invite_id uuid;
begin
  if not exists (
    select 1
    from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only admins or managers can cancel invites.';
  end if;

  delete from public.company_invites ci
  where ci.id = target_invite_id
    and ci.company_id = target_company_id
    and ci.accepted_at is null
  returning ci.id into deleted_invite_id;

  if deleted_invite_id is null then
    raise exception 'Invite not found or already accepted.';
  end if;

  return deleted_invite_id;
end;
$$;

grant execute on function public.cancel_company_invite(uuid, uuid) to authenticated, service_role;

notify pgrst, 'reload schema';
