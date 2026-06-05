alter table public.messages
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by uuid references auth.users(id) on delete set null;

create index if not exists messages_deleted_at_idx on public.messages(deleted_at);

create or replace function public.soft_delete_own_message(target_message_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  target_message public.messages%rowtype;
begin
  select *
    into target_message
  from public.messages
  where id = target_message_id;

  if not found then
    raise exception 'Message not found.';
  end if;

  if target_message.sender_id <> auth.uid() then
    raise exception 'Only the sender can delete this message.';
  end if;

  if not private.is_company_member(target_message.company_id) then
    raise exception 'Message is not available for this company.';
  end if;

  if not private.is_message_thread_member(target_message.thread_id, target_message.company_id) then
    raise exception 'Message thread is not available.';
  end if;

  update public.messages
  set deleted_at = coalesce(deleted_at, now()),
      deleted_by = coalesce(deleted_by, auth.uid())
  where id = target_message_id;
end;
$$;

revoke all on function public.soft_delete_own_message(uuid) from public;
grant execute on function public.soft_delete_own_message(uuid) to authenticated;

drop policy if exists "Company members can create message threads" on public.message_threads;
create policy "Company members can create location or direct message threads"
on public.message_threads for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and created_by = auth.uid()
  and thread_type in ('location', 'direct')
);

notify pgrst, 'reload schema';
