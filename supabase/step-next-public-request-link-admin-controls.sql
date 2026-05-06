-- Restrict public request QR replacement/deactivation/reactivation to admins.
-- Managers can still create a first QR link for a location, but cannot update an existing posted QR.

drop policy if exists "Managers can update public request links" on public.public_request_links;
drop policy if exists "Admins can update public request links" on public.public_request_links;

create policy "Admins can update public request links"
on public.public_request_links for update
to authenticated
using (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = public_request_links.company_id
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
)
with check (
  private.location_belongs_to_company(company_id, location_id)
  and exists (
    select 1
    from public.company_members cm
    where cm.company_id = public_request_links.company_id
      and cm.user_id = auth.uid()
      and cm.role = 'admin'
  )
);

create or replace function public.ensure_location_request_link(target_location_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  location_row record;
begin
  select l.id, l.company_id, l.name
  into location_row
  from public.locations l
  where l.id = target_location_id;

  if location_row.id is null then
    raise exception 'Location not found.';
  end if;

  if not exists (
    select 1
    from public.company_members cm
    where cm.company_id = location_row.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only admins or managers can create public request links.';
  end if;

  insert into public.public_request_links (company_id, location_id, token, label, created_by, is_active, updated_at)
  values (location_row.company_id, location_row.id, private.new_public_request_token(), location_row.name, auth.uid(), true, now())
  on conflict (company_id, location_id) do nothing;
end;
$$;

grant execute on function public.ensure_location_request_link(uuid) to authenticated;

notify pgrst, 'reload schema';
