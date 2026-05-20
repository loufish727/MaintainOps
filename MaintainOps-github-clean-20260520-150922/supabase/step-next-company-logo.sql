alter table public.companies
add column if not exists logo_path text;

drop policy if exists "Admins can update companies" on public.companies;
create policy "Admins can update companies"
on public.companies for update
to authenticated
using (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = companies.id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
)
with check (
  exists (
    select 1 from public.company_members cm
    where cm.company_id = companies.id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

insert into storage.buckets (id, name, public)
values ('company-logos', 'company-logos', false)
on conflict (id) do nothing;

drop policy if exists "Admins can upload company logos" on storage.objects;
create policy "Admins can upload company logos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'company-logos'
  and exists (
    select 1 from public.company_members cm
    where cm.company_id = (storage.foldername(name))[1]::uuid
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

drop policy if exists "Members can read company logos" on storage.objects;
create policy "Members can read company logos"
on storage.objects for select
to authenticated
using (
  bucket_id = 'company-logos'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

create or replace function public.set_company_logo(target_company_id uuid, new_logo_path text)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not exists (
    select 1 from public.company_members cm
    where cm.company_id = target_company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  ) then
    raise exception 'Only company admins or managers can update the company logo.';
  end if;

  update public.companies
  set logo_path = new_logo_path
  where id = target_company_id;
end;
$$;

grant execute on function public.set_company_logo(uuid, text) to authenticated;

notify pgrst, 'reload schema';
