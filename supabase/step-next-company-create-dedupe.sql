create or replace function public.create_company(company_name text)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  normalized_company_name text;
  existing_company_id uuid;
  new_company_id uuid;
  user_name text;
begin
  if auth.uid() is null then
    raise exception 'Authentication is required to create a company.';
  end if;

  normalized_company_name := btrim(coalesce(company_name, ''));

  if normalized_company_name = '' then
    raise exception 'Company name is required.';
  end if;

  select c.id
  into existing_company_id
  from public.companies c
  join public.company_members cm
    on cm.company_id = c.id
   and cm.user_id = auth.uid()
  where lower(btrim(c.name)) = lower(normalized_company_name)
  order by
    case when cm.default_location_id is not null then 0 else 1 end,
    case when cm.role = 'admin' then 0 else 1 end,
    c.created_at asc
  limit 1;

  if existing_company_id is not null then
    return existing_company_id;
  end if;

  insert into public.companies (name, created_by)
  values (normalized_company_name, auth.uid())
  returning id into new_company_id;

  insert into public.company_members (company_id, user_id, role)
  values (new_company_id, auth.uid(), 'admin');

  insert into public.locations (company_id, name)
  values (new_company_id, 'Main Location')
  on conflict (company_id, name) do nothing;

  user_name := coalesce(auth.jwt() -> 'user_metadata' ->> 'full_name', split_part(coalesce(auth.jwt() ->> 'email', ''), '@', 1), '');

  insert into public.profiles (company_id, user_id, full_name)
  values (new_company_id, auth.uid(), user_name)
  on conflict (company_id, user_id) do update
  set full_name = excluded.full_name,
      updated_at = now();

  return new_company_id;
end;
$$;

grant execute on function public.create_company(text) to authenticated, service_role;

notify pgrst, 'reload schema';
