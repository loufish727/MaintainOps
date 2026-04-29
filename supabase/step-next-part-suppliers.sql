alter table public.parts
add column if not exists supplier_name text;

create index if not exists parts_company_supplier_name_idx
on public.parts(company_id, supplier_name);

notify pgrst, 'reload schema';
