alter table public.maintenance_requests
add column if not exists photo_storage_path text,
add column if not exists photo_file_name text,
add column if not exists photo_content_type text,
add column if not exists photo_file_size_bytes bigint,
add column if not exists photo_original_file_name text,
add column if not exists photo_original_size_bytes bigint,
add column if not exists photo_uploaded_at timestamptz;

insert into storage.buckets (id, name, public)
values ('maintenance-request-photos', 'maintenance-request-photos', false)
on conflict (id) do nothing;

update storage.buckets
set file_size_limit = 5242880,
    allowed_mime_types = array[
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/heic',
      'image/heif'
    ]
where id = 'maintenance-request-photos';

create or replace function private.can_write_maintenance_request_photo(object_name text)
returns boolean
language plpgsql
security definer
set search_path = public, private, storage
as $$
declare
  folders text[];
  request_id uuid;
  request_row record;
begin
  folders := storage.foldername(object_name);
  if array_length(folders, 1) < 1 or folders[1] !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    return false;
  end if;

  request_id := folders[1]::uuid;

  select mr.company_id, mr.external_source, mr.created_at
  into request_row
  from public.maintenance_requests mr
  where mr.id = request_id;

  if request_row.company_id is null then
    return false;
  end if;

  if auth.uid() is not null and private.is_company_member(request_row.company_id) then
    return true;
  end if;

  return request_row.external_source = 'public_location_qr'
    and request_row.created_at > now() - interval '1 day';
end;
$$;

create or replace function private.can_read_maintenance_request_photo(object_name text)
returns boolean
language plpgsql
security definer
set search_path = public, private, storage
as $$
declare
  request_row record;
begin
  select mr.company_id
  into request_row
  from public.maintenance_requests mr
  where mr.photo_storage_path = object_name;

  return request_row.company_id is not null
    and auth.uid() is not null
    and private.is_company_member(request_row.company_id);
end;
$$;

drop policy if exists "Request photo uploads are allowed for valid requests" on storage.objects;
create policy "Request photo uploads are allowed for valid requests"
on storage.objects for insert
to anon, authenticated
with check (
  bucket_id = 'maintenance-request-photos'
  and private.can_write_maintenance_request_photo(name)
);

drop policy if exists "Members can read maintenance request photos" on storage.objects;
create policy "Members can read maintenance request photos"
on storage.objects for select
to authenticated
using (
  bucket_id = 'maintenance-request-photos'
  and private.can_read_maintenance_request_photo(name)
);

drop policy if exists "Managers can delete maintenance request photos" on storage.objects;
create policy "Managers can delete maintenance request photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'maintenance-request-photos'
  and exists (
    select 1
    from public.maintenance_requests mr
    join public.company_members cm on cm.company_id = mr.company_id
    where mr.photo_storage_path = storage.objects.name
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'manager')
  )
);

create or replace function public.attach_maintenance_request_photo(
  target_request_id uuid,
  p_photo_storage_path text,
  p_photo_file_name text,
  p_photo_content_type text default null,
  p_photo_file_size_bytes bigint default null,
  p_photo_original_file_name text default null,
  p_photo_original_size_bytes bigint default null
)
returns void
language plpgsql
security definer
set search_path = public, private, storage
as $$
declare
  request_row record;
  folders text[];
begin
  folders := storage.foldername(p_photo_storage_path);
  if array_length(folders, 1) < 1 or folders[1] <> target_request_id::text then
    raise exception 'Request photo path does not match the request.';
  end if;

  select mr.company_id, mr.external_source, mr.created_at
  into request_row
  from public.maintenance_requests mr
  where mr.id = target_request_id;

  if request_row.company_id is null then
    raise exception 'Request not found.';
  end if;

  if auth.uid() is null then
    if request_row.external_source is distinct from 'public_location_qr'
       or request_row.created_at <= now() - interval '1 day' then
      raise exception 'Request photo upload is no longer available.';
    end if;
  elsif not private.is_company_member(request_row.company_id) then
    raise exception 'You are not allowed to attach photos to this request.';
  end if;

  if nullif(trim(coalesce(p_photo_file_name, '')), '') is null then
    raise exception 'Photo file name is required.';
  end if;

  update public.maintenance_requests
  set photo_storage_path = p_photo_storage_path,
      photo_file_name = left(trim(p_photo_file_name), 160),
      photo_content_type = left(trim(coalesce(p_photo_content_type, '')), 120),
      photo_file_size_bytes = p_photo_file_size_bytes,
      photo_original_file_name = left(trim(coalesce(p_photo_original_file_name, p_photo_file_name)), 160),
      photo_original_size_bytes = p_photo_original_size_bytes,
      photo_uploaded_at = now(),
      updated_at = now()
  where id = target_request_id;
end;
$$;

grant execute on function public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint) to anon, authenticated;

notify pgrst, 'reload schema';
