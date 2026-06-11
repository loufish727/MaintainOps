create table if not exists public.applied_migrations (
  id uuid primary key default gen_random_uuid(),
  filename text not null unique,
  applied_at timestamptz not null default now(),
  project_ref text,
  applied_by uuid references auth.users(id) on delete set null,
  applied_by_note text,
  verification text,
  rollback_note text,
  created_at timestamptz not null default now()
);

alter table public.applied_migrations enable row level security;

drop policy if exists "Admins can read applied migrations" on public.applied_migrations;
create policy "Admins can read applied migrations"
on public.applied_migrations for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

revoke all on public.applied_migrations from public, anon;
grant select on public.applied_migrations to authenticated;

create or replace function public.record_applied_migration(
  migration_filename text,
  migration_project_ref text default null,
  migration_verification text default null,
  migration_rollback_note text default null,
  migration_applied_by_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  actor_role text;
  migration_id uuid;
begin
  select cm.role
  into actor_role
  from public.company_members cm
  where cm.user_id = auth.uid()
    and cm.role = 'admin'
  limit 1;

  if actor_role is distinct from 'admin' then
    raise exception 'Only admins can record applied migrations.';
  end if;

  insert into public.applied_migrations (
    filename,
    project_ref,
    applied_by,
    applied_by_note,
    verification,
    rollback_note
  )
  values (
    migration_filename,
    migration_project_ref,
    auth.uid(),
    migration_applied_by_note,
    migration_verification,
    migration_rollback_note
  )
  on conflict (filename) do update
  set
    applied_at = now(),
    project_ref = excluded.project_ref,
    applied_by = excluded.applied_by,
    applied_by_note = excluded.applied_by_note,
    verification = excluded.verification,
    rollback_note = excluded.rollback_note
  returning id into migration_id;

  return migration_id;
end;
$$;

revoke all on function public.record_applied_migration(text, text, text, text, text) from public, anon;
grant execute on function public.record_applied_migration(text, text, text, text, text) to authenticated;
