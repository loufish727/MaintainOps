create table if not exists public.part_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  storage_path text not null,
  file_name text not null,
  content_type text,
  created_at timestamptz not null default now()
);

create index if not exists part_documents_company_id_idx on public.part_documents(company_id);
create index if not exists part_documents_part_id_idx on public.part_documents(part_id);

grant select, insert on public.part_documents to authenticated;

alter table public.part_documents enable row level security;

drop policy if exists "Members can read part documents" on public.part_documents;
create policy "Members can read part documents"
on public.part_documents for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create part documents" on public.part_documents;
create policy "Members can create part documents"
on public.part_documents for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.parts p
    where p.id = part_id
      and p.company_id = part_documents.company_id
  )
);

insert into storage.buckets (id, name, public)
values ('part-documents', 'part-documents', false)
on conflict (id) do nothing;

drop policy if exists "Members can upload part documents" on storage.objects;
create policy "Members can upload part documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Members can read part documents storage" on storage.objects;
create policy "Members can read part documents storage"
on storage.objects for select
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Upload owners can delete part documents" on storage.objects;
create policy "Upload owners can delete part documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'part-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

notify pgrst, 'reload schema';
