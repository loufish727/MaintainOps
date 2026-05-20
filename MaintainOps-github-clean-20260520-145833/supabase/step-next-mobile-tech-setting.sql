alter table public.profiles
add column if not exists mobile_tech boolean not null default false;

notify pgrst, 'reload schema';
