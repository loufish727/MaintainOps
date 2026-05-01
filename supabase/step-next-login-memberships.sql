create or replace function public.get_my_companies()
returns table (
  id uuid,
  name text,
  logo_path text,
  created_at timestamptz,
  role text
)
language sql
security definer
set search_path = public, private
stable
as $$
  select
    c.id,
    c.name,
    c.logo_path,
    c.created_at,
    cm.role
  from public.company_members cm
  join public.companies c on c.id = cm.company_id
  where cm.user_id = auth.uid()
  order by cm.created_at asc;
$$;

grant execute on function public.get_my_companies() to authenticated;

notify pgrst, 'reload schema';
