alter table public.work_order_photos
add column if not exists file_size_bytes bigint,
add column if not exists original_file_name text,
add column if not exists original_size_bytes bigint;

notify pgrst, 'reload schema';
