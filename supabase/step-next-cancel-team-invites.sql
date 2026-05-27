drop function if exists public.cancel_company_invite(uuid, uuid);

create or replace function public.cancel_company_invite(
  target_company_id uuid,
  target_invite_id uuid
)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if auth.uid() is null then
    raise exception 'Sign in before canceling invites.';
  end if;

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
    and ci.accepted_at is null;

  if not found then
    raise exception 'Pending invite not found.';
  end if;
end;
$$;

revoke all on function public.cancel_company_invite(uuid, uuid) from public, anon;
grant execute on function public.cancel_company_invite(uuid, uuid) to authenticated;

notify pgrst, 'reload schema';
