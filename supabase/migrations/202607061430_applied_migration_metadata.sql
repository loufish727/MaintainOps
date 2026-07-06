begin;

comment on table public.applied_migrations is
  'Tracks MaintainOps step-next and dated SQL files after live apply verification.';

comment on function public.record_applied_migration(text, text, text, text, text) is
  'Records the live application and verification metadata for a MaintainOps SQL migration.';

commit;
