alter table public.message_threads
add column if not exists work_order_id uuid references public.work_orders(id) on delete set null;

create index if not exists message_threads_work_order_id_idx
on public.message_threads(work_order_id);

drop policy if exists "Company members can create message threads" on public.message_threads;
create policy "Company members can create message threads"
on public.message_threads for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and created_by = auth.uid()
  and (
    work_order_id is null
    or exists (
      select 1
      from public.work_orders wo
      where wo.id = message_threads.work_order_id
        and wo.company_id = message_threads.company_id
    )
  )
);

drop policy if exists "Thread members can update their message threads" on public.message_threads;
create policy "Thread members can update their message threads"
on public.message_threads for update
to authenticated
using (
  private.is_company_member(company_id)
  and (private.is_message_thread_member(id, company_id) or created_by = auth.uid())
)
with check (
  private.is_company_member(company_id)
  and (
    work_order_id is null
    or exists (
      select 1
      from public.work_orders wo
      where wo.id = message_threads.work_order_id
        and wo.company_id = message_threads.company_id
    )
  )
);

notify pgrst, 'reload schema';
