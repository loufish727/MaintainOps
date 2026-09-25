-- QR replacements only. The broader audit_log foundation is intentionally untouched.
create table if not exists public.qr_replacement_history (
  id bigint generated always as identity primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  link_id uuid not null,
  location_id uuid not null,
  facility_name text not null,
  actor_id uuid,
  actor_name text not null,
  replaced_at timestamptz not null default clock_timestamp()
);

-- Snapshot identifiers/names survive removal of a link, location, profile, or account.
create index if not exists qr_replacement_history_link_idx
on public.qr_replacement_history(company_id, link_id, replaced_at desc, id desc);

alter table public.qr_replacement_history enable row level security;
revoke all on public.qr_replacement_history from public, anon, authenticated;
grant select on public.qr_replacement_history to authenticated, service_role;
revoke all on sequence public.qr_replacement_history_id_seq from public, anon, authenticated;

drop policy if exists "Managers and admins can read QR replacements" on public.qr_replacement_history;
create policy "Managers and admins can read QR replacements"
on public.qr_replacement_history for select to authenticated
using (exists (
  select 1 from public.company_members cm
  where cm.company_id = qr_replacement_history.company_id
    and cm.user_id = (select auth.uid()) and cm.role in ('admin', 'manager')
));

create or replace function private.record_qr_replacement()
returns trigger
language plpgsql
security definer
set search_path = public, private, pg_temp
as $$
declare
  actor uuid := auth.uid();
  actor_label text;
  facility_label text;
begin
  if new.id is distinct from old.id or new.company_id is distinct from old.company_id
    or new.location_id is distinct from old.location_id then
    raise exception 'A posted QR link cannot be reassigned to another record, company, or location.';
  end if;
  if new.token is not distinct from old.token then return new; end if;

  if actor is null then
    actor_label := 'System / service (no signed-in account)';
  else
    select nullif(btrim(p.full_name), '') into actor_label
    from public.profiles p where p.company_id = old.company_id and p.user_id = actor;
    if actor_label is null then
      select nullif(btrim(u.email), '') into actor_label from auth.users u where u.id = actor;
    end if;
    actor_label := coalesce(actor_label, 'Signed-in account (name unavailable)');
  end if;
  select l.name into facility_label from public.locations l
  where l.id = old.location_id and l.company_id = old.company_id;

  insert into public.qr_replacement_history
    (company_id, link_id, location_id, facility_name, actor_id, actor_name)
  values
    (old.company_id, old.id, old.location_id, coalesce(facility_label, 'Location unavailable'), actor, actor_label);
  return new;
end;
$$;
revoke all on function private.record_qr_replacement() from public, anon, authenticated;

drop trigger if exists record_qr_replacement on public.public_request_links;
create trigger record_qr_replacement
before update on public.public_request_links for each row
when (old.token is distinct from new.token or old.id is distinct from new.id
  or old.company_id is distinct from new.company_id or old.location_id is distinct from new.location_id)
execute function private.record_qr_replacement();

create or replace function public.get_qr_replacement_summaries(target_company_id uuid)
returns table(link_id uuid, actor_name text, replaced_at timestamptz)
language sql stable security invoker
set search_path = public, private, pg_temp
as $$
  select l.id, h.actor_name, h.replaced_at
  from public.public_request_links l
  join lateral (
    select e.actor_name, e.replaced_at from public.qr_replacement_history e
    where e.company_id = target_company_id and e.link_id = l.id
    order by e.replaced_at desc, e.id desc limit 1
  ) h on true
  where l.company_id = target_company_id;
$$;
revoke all on function public.get_qr_replacement_summaries(uuid) from public, anon;
grant execute on function public.get_qr_replacement_summaries(uuid) to authenticated;

notify pgrst, 'reload schema';
