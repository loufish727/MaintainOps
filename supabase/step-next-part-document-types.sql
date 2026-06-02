alter table public.part_documents
  add column if not exists document_type text not null default 'other',
  add column if not exists file_size_bytes bigint,
  add column if not exists original_file_name text,
  add column if not exists original_size_bytes bigint;

alter table public.part_documents
  drop constraint if exists part_documents_document_type_check;

alter table public.part_documents
  add constraint part_documents_document_type_check
  check (document_type in (
    'part_photo',
    'receipt',
    'invoice',
    'part_print',
    'schematic',
    'manual',
    'spec_sheet',
    'warranty',
    'other'
  ));

update public.part_documents
set document_type = case
  when content_type ilike 'image/%' then 'part_photo'
  when file_name ~* 'invoice' then 'invoice'
  when file_name ~* 'receipt' then 'receipt'
  when file_name ~* 'schematic|diagram' then 'schematic'
  when file_name ~* 'print|drawing' then 'part_print'
  when file_name ~* 'manual' then 'manual'
  when file_name ~* 'spec|cut.?sheet|datasheet' then 'spec_sheet'
  else document_type
end
where document_type = 'other';

notify pgrst, 'reload schema';
