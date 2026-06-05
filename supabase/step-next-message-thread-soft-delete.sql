alter table public.message_thread_members
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by uuid references auth.users(id) on delete set null;

create index if not exists message_thread_members_user_deleted_idx
on public.message_thread_members(user_id, deleted_at);

create or replace function public.soft_delete_own_message_thread(target_thread_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  target_member public.message_thread_members%rowtype;
begin
  select *
    into target_member
  from public.message_thread_members
  where thread_id = target_thread_id
    and user_id = auth.uid();

  if not found then
    raise exception 'Message thread not found.';
  end if;

  if not private.is_company_member(target_member.company_id) then
    raise exception 'Message thread is not available for this company.';
  end if;

  update public.message_thread_members
  set deleted_at = coalesce(deleted_at, now()),
      deleted_by = coalesce(deleted_by, auth.uid())
  where id = target_member.id;
end;
$$;

revoke all on function public.soft_delete_own_message_thread(uuid) from public;
grant execute on function public.soft_delete_own_message_thread(uuid) to authenticated;

notify pgrst, 'reload schema';
