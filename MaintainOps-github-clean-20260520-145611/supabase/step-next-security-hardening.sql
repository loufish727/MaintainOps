alter function public.create_company(text)
set search_path = public, private;

alter function public.ensure_company_profile(uuid)
set search_path = public, private;

do $$
begin
  if to_regclass('public.message_thread_members') is not null
     and to_regclass('public.message_threads') is not null then
    execute 'drop policy if exists "Company members can add thread members" on public.message_thread_members';
    execute $policy$
      create policy "Company members can add thread members"
      on public.message_thread_members for insert
      to authenticated
      with check (
        private.is_company_member(company_id)
        and exists (
          select 1
          from public.company_members target_member
          where target_member.company_id = message_thread_members.company_id
            and target_member.user_id = message_thread_members.user_id
        )
        and exists (
          select 1
          from public.message_threads mt
          where mt.id = message_thread_members.thread_id
            and mt.company_id = message_thread_members.company_id
            and (
              mt.created_by = auth.uid()
              or private.is_message_thread_member(mt.id, mt.company_id)
              or exists (
                select 1
                from public.company_members actor_member
                where actor_member.company_id = message_thread_members.company_id
                  and actor_member.user_id = auth.uid()
                  and actor_member.role in ('admin', 'manager')
              )
            )
        )
      )
    $policy$;
  end if;
end;
$$;

notify pgrst, 'reload schema';
