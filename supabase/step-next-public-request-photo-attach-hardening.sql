-- Harden public maintenance request photo attachment.
--
-- This intentionally recreates the RPC because live probing showed that the
-- deployed function can return success for random or mismatched request IDs.
-- The function must reject:
-- - missing requests
-- - storage paths whose first folder does not match the request id
-- - anonymous attachment to non-public or expired requests
-- - authenticated attachment outside the caller's company membership
-- - no-op updates

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
  if target_request_id is null then
    raise exception 'Request id is required.';
  end if;

  if nullif(trim(coalesce(p_photo_storage_path, '')), '') is null then
    raise exception 'Photo storage path is required.';
  end if;

  folders := storage.foldername(p_photo_storage_path);
  if array_length(folders, 1) < 1 or folders[1] <> target_request_id::text then
    raise exception 'Request photo path does not match the request.';
  end if;

  select mr.id, mr.company_id, mr.external_source, mr.created_at
  into request_row
  from public.maintenance_requests mr
  where mr.id = target_request_id;

  if request_row.id is null or request_row.company_id is null then
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

  if not found then
    raise exception 'Request photo attach failed.';
  end if;
end;
$$;

revoke all on function public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint) from public;
grant execute on function public.attach_maintenance_request_photo(uuid, text, text, text, bigint, text, bigint) to anon, authenticated, service_role;

notify pgrst, 'reload schema';
