alter table public.assets
add column if not exists manufacturer text;

alter table public.assets
add column if not exists model text;
