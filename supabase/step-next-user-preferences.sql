create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  shop_reference_favorites jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_preferences_shop_reference_favorites_array
    check (jsonb_typeof(shop_reference_favorites) = 'array')
);

alter table public.user_preferences enable row level security;

grant select, insert, update on public.user_preferences to authenticated;
grant select, insert, update, delete on public.user_preferences to service_role;

drop policy if exists "Users can read their preferences" on public.user_preferences;
create policy "Users can read their preferences"
on public.user_preferences for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create their preferences" on public.user_preferences;
create policy "Users can create their preferences"
on public.user_preferences for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can update their preferences" on public.user_preferences;
create policy "Users can update their preferences"
on public.user_preferences for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());
