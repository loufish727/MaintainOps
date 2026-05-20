create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  thread_type text not null default 'company' check (thread_type in ('company', 'location', 'direct')),
  title text not null,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_thread_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (thread_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete restrict,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.message_reads (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  last_read_at timestamptz not null default now(),
  unique (thread_id, user_id)
);

create index if not exists message_threads_company_id_idx on public.message_threads(company_id);
create index if not exists message_threads_location_id_idx on public.message_threads(location_id);
create index if not exists message_thread_members_thread_id_idx on public.message_thread_members(thread_id);
create index if not exists message_thread_members_user_id_idx on public.message_thread_members(user_id);
create index if not exists messages_thread_id_created_at_idx on public.messages(thread_id, created_at);
create index if not exists message_reads_user_id_idx on public.message_reads(user_id);

grant select, insert, update on public.message_threads to authenticated;
grant select, insert on public.message_thread_members to authenticated;
grant select, insert on public.messages to authenticated;
grant select, insert, update on public.message_reads to authenticated;

alter table public.message_threads enable row level security;
alter table public.message_thread_members enable row level security;
alter table public.messages enable row level security;
alter table public.message_reads enable row level security;

create or replace function private.is_message_thread_member(target_thread_id uuid, target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.message_thread_members mtm
    where mtm.thread_id = target_thread_id
      and mtm.company_id = target_company_id
      and mtm.user_id = auth.uid()
  );
$$;

drop policy if exists "Thread members can read message threads" on public.message_threads;
create policy "Thread members can read message threads"
on public.message_threads for select
to authenticated
using (
  private.is_company_member(company_id)
  and (private.is_message_thread_member(id, company_id) or created_by = auth.uid())
);

drop policy if exists "Company members can create message threads" on public.message_threads;
create policy "Company members can create message threads"
on public.message_threads for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and created_by = auth.uid()
);

drop policy if exists "Thread members can update their message threads" on public.message_threads;
create policy "Thread members can update their message threads"
on public.message_threads for update
to authenticated
using (
  private.is_company_member(company_id)
  and (private.is_message_thread_member(id, company_id) or created_by = auth.uid())
)
with check (private.is_company_member(company_id));

drop policy if exists "Thread members can read membership" on public.message_thread_members;
create policy "Thread members can read membership"
on public.message_thread_members for select
to authenticated
using (
  private.is_company_member(company_id)
  and private.is_message_thread_member(thread_id, company_id)
);

drop policy if exists "Company members can add thread members" on public.message_thread_members;
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
);

drop policy if exists "Thread members can read messages" on public.messages;
create policy "Thread members can read messages"
on public.messages for select
to authenticated
using (
  private.is_company_member(company_id)
  and private.is_message_thread_member(thread_id, company_id)
);

drop policy if exists "Thread members can send messages" on public.messages;
create policy "Thread members can send messages"
on public.messages for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and sender_id = auth.uid()
  and private.is_message_thread_member(thread_id, company_id)
);

drop policy if exists "Users can read their message reads" on public.message_reads;
create policy "Users can read their message reads"
on public.message_reads for select
to authenticated
using (private.is_company_member(company_id) and user_id = auth.uid());

drop policy if exists "Users can write their message reads" on public.message_reads;
create policy "Users can write their message reads"
on public.message_reads for insert
to authenticated
with check (private.is_company_member(company_id) and user_id = auth.uid());

drop policy if exists "Users can update their message reads" on public.message_reads;
create policy "Users can update their message reads"
on public.message_reads for update
to authenticated
using (private.is_company_member(company_id) and user_id = auth.uid())
with check (private.is_company_member(company_id) and user_id = auth.uid());

notify pgrst, 'reload schema';
