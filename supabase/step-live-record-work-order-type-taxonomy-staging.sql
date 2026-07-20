insert into public.applied_migrations (
  filename,
  project_ref,
  applied_by_note,
  verification,
  rollback_note
)
values (
  '202607201200_work_order_type_taxonomy.sql',
  'fsxqrngpaseqdxijggcm',
  'Codex through linked Supabase CLI',
  'Preflight: 2 corrective, 2 reactive, 2 inspection, 2 preventive. Postflight: 4 corrective, 4 preventive; corrective default; corrective/preventive/fabrication constraint; assignment trigger enabled.',
  'Testing data can be reseeded. The prior five-value constraint can be restored, but the original legacy distinctions are not retained by the consolidated rows.'
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
