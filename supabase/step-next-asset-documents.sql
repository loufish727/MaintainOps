create table if not exists public.asset_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  storage_path text not null,
  file_name text not null,
  content_type text,
  document_type text not null default 'other',
  file_size_bytes bigint,
  original_file_name text,
  original_size_bytes bigint,
  created_at timestamptz not null default now(),
  constraint asset_documents_document_type_check
    check (document_type in (
      'machine_photo',
      'schematic',
      'settings',
      'manual',
      'nameplate',
      'inspection',
      'receipt',
      'other'
    ))
);

create index if not exists asset_documents_company_id_idx on public.asset_documents(company_id);
create index if not exists asset_documents_asset_id_idx on public.asset_documents(asset_id);

grant select, insert on public.asset_documents to authenticated;

alter table public.asset_documents enable row level security;

drop policy if exists "Members can read equipment documents" on public.asset_documents;
create policy "Members can read equipment documents"
on public.asset_documents for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create equipment documents" on public.asset_documents;
create policy "Members can create equipment documents"
on public.asset_documents for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and uploaded_by = auth.uid()
  and exists (
    select 1 from public.assets a
    where a.id = asset_id
      and a.company_id = asset_documents.company_id
  )
);

insert into storage.buckets (id, name, public)
values ('asset-documents', 'asset-documents', false)
on conflict (id) do nothing;

drop policy if exists "Members can upload equipment documents" on storage.objects;
create policy "Members can upload equipment documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'asset-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Members can read equipment document storage" on storage.objects;
create policy "Members can read equipment document storage"
on storage.objects for select
to authenticated
using (
  bucket_id = 'asset-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
);

drop policy if exists "Upload owners can delete equipment documents" on storage.objects;
create policy "Upload owners can delete equipment documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'asset-documents'
  and private.is_company_member((storage.foldername(name))[1]::uuid)
  and owner_id = (select auth.uid()::text)
);

notify pgrst, 'reload schema';
