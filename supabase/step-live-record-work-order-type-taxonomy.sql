insert into public.applied_migrations (
  filename,
  project_ref,
  applied_by_note,
  verification,
  rollback_note
)
values (
  '202607201200_work_order_type_taxonomy.sql',
  'lbphkzznvvumemdkqoay',
  'Codex through linked Supabase CLI',
  'Preflight: 31 corrective, 59 reactive, 3 preventive. Postflight: 90 corrective, 3 preventive; corrective default; corrective/preventive/fabrication constraint; assignment trigger enabled.',
  'The prior five-value constraint and reactive default can be restored, but the original Reactive versus Corrective distinction cannot be reconstructed without a pre-migration backup.'
)
on conflict (filename) do update
set
  applied_at = now(),
  project_ref = excluded.project_ref,
  applied_by_note = excluded.applied_by_note,
  verification = excluded.verification,
  rollback_note = excluded.rollback_note;

select
  filename,
  project_ref,
  applied_at,
  applied_by_note,
  verification,
  rollback_note
from public.applied_migrations
where filename = '202607201200_work_order_type_taxonomy.sql';
