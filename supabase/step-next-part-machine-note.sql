alter table public.parts
  add column if not exists machine_note text;

notify pgrst, 'reload schema';
