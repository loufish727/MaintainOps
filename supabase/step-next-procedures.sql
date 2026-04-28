create table if not exists public.procedure_templates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  description text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.procedure_steps (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  procedure_template_id uuid not null references public.procedure_templates(id) on delete cascade,
  position integer not null,
  prompt text not null,
  response_type text not null default 'checkbox' check (response_type in ('checkbox', 'pass_fail', 'number', 'text')),
  required boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.work_order_step_results (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  procedure_step_id uuid not null references public.procedure_steps(id) on delete cascade,
  completed_by uuid references auth.users(id) on delete set null,
  value text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (work_order_id, procedure_step_id)
);

alter table public.work_orders
add column if not exists procedure_template_id uuid references public.procedure_templates(id) on delete set null;

alter table public.preventive_schedules
add column if not exists procedure_template_id uuid references public.procedure_templates(id) on delete set null;

alter table public.procedure_templates enable row level security;
alter table public.procedure_steps enable row level security;
alter table public.work_order_step_results enable row level security;

drop policy if exists "Members can read procedure templates" on public.procedure_templates;
create policy "Members can read procedure templates"
on public.procedure_templates for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create procedure templates" on public.procedure_templates;
create policy "Members can create procedure templates"
on public.procedure_templates for insert
to authenticated
with check (private.is_company_member(company_id) and created_by = auth.uid());

drop policy if exists "Members can update procedure templates" on public.procedure_templates;
create policy "Members can update procedure templates"
on public.procedure_templates for update
to authenticated
using (private.is_company_member(company_id))
with check (private.is_company_member(company_id));

drop policy if exists "Members can read procedure steps" on public.procedure_steps;
create policy "Members can read procedure steps"
on public.procedure_steps for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create procedure steps" on public.procedure_steps;
create policy "Members can create procedure steps"
on public.procedure_steps for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.procedure_templates template
    where template.id = procedure_steps.procedure_template_id
      and template.company_id = procedure_steps.company_id
  )
);

drop policy if exists "Members can update procedure steps" on public.procedure_steps;
create policy "Members can update procedure steps"
on public.procedure_steps for update
to authenticated
using (private.is_company_member(company_id))
with check (private.is_company_member(company_id));

drop policy if exists "Members can read work order step results" on public.work_order_step_results;
create policy "Members can read work order step results"
on public.work_order_step_results for select
to authenticated
using (private.is_company_member(company_id));

drop policy if exists "Members can create work order step results" on public.work_order_step_results;
create policy "Members can create work order step results"
on public.work_order_step_results for insert
to authenticated
with check (
  private.is_company_member(company_id)
  and exists (
    select 1
    from public.work_orders work_order
    where work_order.id = work_order_step_results.work_order_id
      and work_order.company_id = work_order_step_results.company_id
  )
  and exists (
    select 1
    from public.procedure_steps step
    where step.id = work_order_step_results.procedure_step_id
      and step.company_id = work_order_step_results.company_id
  )
);

drop policy if exists "Members can update work order step results" on public.work_order_step_results;
create policy "Members can update work order step results"
on public.work_order_step_results for update
to authenticated
using (private.is_company_member(company_id))
with check (private.is_company_member(company_id));

create index if not exists procedure_templates_company_id_idx on public.procedure_templates(company_id);
create index if not exists procedure_steps_company_template_idx on public.procedure_steps(company_id, procedure_template_id);
create index if not exists work_order_step_results_company_work_order_idx on public.work_order_step_results(company_id, work_order_id);

grant select, insert, update on public.procedure_templates to authenticated;
grant select, insert, update on public.procedure_steps to authenticated;
grant select, insert, update on public.work_order_step_results to authenticated;

notify pgrst, 'reload schema';
