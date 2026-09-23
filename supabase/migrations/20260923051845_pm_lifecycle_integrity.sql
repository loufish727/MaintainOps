begin;

-- Invoker function bodies need name lookup access to the existing private RLS helpers.
grant usage on schema private to authenticated, service_role;

-- The live link may disappear; occurrence identity and snapshots never do.
alter table public.work_orders
  add column if not exists preventive_schedule_id uuid references public.preventive_schedules(id) on delete set null,
  add column if not exists preventive_source_id uuid,
  add column if not exists preventive_source_title text,
  add column if not exists preventive_due_at date;

alter table public.work_orders drop constraint if exists work_orders_preventive_source_check;
alter table public.work_orders add constraint work_orders_preventive_source_check check (
  (preventive_schedule_id is null and preventive_source_id is null and preventive_source_title is null and preventive_due_at is null)
  or (preventive_source_id is not null and preventive_source_title is not null and preventive_due_at is not null
    and (preventive_schedule_id is null or preventive_schedule_id = preventive_source_id))
);
create unique index if not exists work_orders_preventive_occurrence_key
  on public.work_orders(company_id, preventive_source_id, preventive_due_at);
create index if not exists work_orders_company_procedure_idx on public.work_orders(company_id, procedure_template_id);
create index if not exists preventive_schedules_company_procedure_idx on public.preventive_schedules(company_id, procedure_template_id);
create index if not exists work_order_step_results_step_idx on public.work_order_step_results(procedure_step_id);
create index if not exists work_orders_preventive_schedule_idx on public.work_orders(preventive_schedule_id);

-- Keep recorded results even after a work order switches to another procedure.
alter table public.work_orders drop constraint if exists work_orders_procedure_template_id_fkey;
alter table public.work_orders add constraint work_orders_procedure_template_id_fkey
  foreign key (procedure_template_id) references public.procedure_templates(id) on delete restrict;
alter table public.preventive_schedules drop constraint if exists preventive_schedules_procedure_template_id_fkey;
alter table public.preventive_schedules add constraint preventive_schedules_procedure_template_id_fkey
  foreign key (procedure_template_id) references public.procedure_templates(id) on delete restrict;
alter table public.work_order_step_results drop constraint if exists work_order_step_results_procedure_step_id_fkey;
alter table public.work_order_step_results add constraint work_order_step_results_procedure_step_id_fkey
  foreign key (procedure_step_id) references public.procedure_steps(id) on delete restrict;

create or replace function private.procedure_result_answered(response_type text, response_value text)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare
  value_text text := regexp_replace(coalesce(response_value, ''), '^[[:space:]]+|[[:space:]]+$', '', 'g');
  reading double precision;
begin
  if value_text = '' then return false; end if;
  case response_type
    when 'checkbox' then return response_value = 'checked';
    when 'pass_fail' then return value_text in ('pass', 'fail');
    when 'number' then
      begin
        reading := value_text::double precision;
        return reading not in ('Infinity'::double precision, '-Infinity'::double precision, 'NaN'::double precision);
      exception when invalid_text_representation or numeric_value_out_of_range then return false;
      end;
    when 'text' then return true;
    else return false;
  end case;
end;
$$;

create or replace function private.guard_procedure_work_order()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  check_procedure boolean := tg_op = 'INSERT';
  check_completion boolean := tg_op = 'INSERT';
  source_schedule public.preventive_schedules%rowtype;
begin
  if tg_op = 'UPDATE' then
    if new.company_id is distinct from old.company_id then
      raise exception 'Work order company cannot be changed.' using errcode = '23514';
    end if;
    check_procedure := new.company_id is distinct from old.company_id
      or new.procedure_template_id is distinct from old.procedure_template_id;
    check_completion := check_procedure or old.status is distinct from 'completed';
    if (new.preventive_source_id, new.preventive_source_title, new.preventive_due_at)
      is distinct from (old.preventive_source_id, old.preventive_source_title, old.preventive_due_at)
      or (old.preventive_source_id is not null and new.company_id is distinct from old.company_id) then
      raise exception 'PM source history cannot be changed.' using errcode = '23514';
    end if;
    if new.preventive_schedule_id is distinct from old.preventive_schedule_id then
      if new.preventive_schedule_id is not null or exists (
        select 1 from public.preventive_schedules s where s.id = old.preventive_schedule_id
      ) then
        raise exception 'PM source link can only be cleared by deleting its schedule.' using errcode = '23514';
      end if;
    end if;
  elsif new.preventive_source_id is not null then
    select * into source_schedule from public.preventive_schedules s
      where s.id = new.preventive_schedule_id and s.company_id = new.company_id for key share;
    if not found or source_schedule.id is distinct from new.preventive_source_id
      or source_schedule.title is distinct from new.preventive_source_title
      or source_schedule.next_due_at is distinct from new.preventive_due_at then
      raise exception 'PM source must match its company schedule and occurrence.' using errcode = '23514';
    end if;
  end if;
  if check_procedure and new.procedure_template_id is not null and not exists (
    select 1 from public.procedure_templates p where p.id = new.procedure_template_id and p.company_id = new.company_id
  ) then
    raise exception 'Procedure must belong to the work order company.' using errcode = '23514';
  end if;
  if check_completion and new.status = 'completed' and new.procedure_template_id is not null and exists (
    select 1 from public.procedure_steps s
    where s.procedure_template_id = new.procedure_template_id and s.company_id = new.company_id and s.required
      and not exists (select 1 from public.work_order_step_results r
        where r.work_order_id = new.id and r.procedure_step_id = s.id and r.company_id = new.company_id
          and private.procedure_result_answered(s.response_type, r.value))
  ) then
    raise exception 'Complete required procedure checklist steps first.' using errcode = '23514';
  end if;
  return new;
end;
$$;
drop trigger if exists guard_procedure_work_order on public.work_orders;
create trigger guard_procedure_work_order before insert or update on public.work_orders
  for each row execute function private.guard_procedure_work_order();

create or replace function private.guard_procedure_parent()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'UPDATE' and new.company_id is distinct from old.company_id then
    raise exception 'Procedure or schedule company cannot be changed.' using errcode = '23514';
  end if;
  if tg_table_name = 'procedure_templates' then return new; end if;
  if tg_table_name = 'procedure_steps' and tg_op = 'UPDATE' then
    if (new.company_id, new.procedure_template_id) is distinct from (old.company_id, old.procedure_template_id) then
      raise exception 'Procedure step parent cannot be changed.' using errcode = '23514';
    end if;
  end if;
  if new.procedure_template_id is not null and (tg_op = 'INSERT'
    or (new.company_id, new.procedure_template_id) is distinct from (old.company_id, old.procedure_template_id)) then
    if not exists (select 1 from public.procedure_templates p
      where p.id = new.procedure_template_id and p.company_id = new.company_id) then
      raise exception 'Procedure must belong to the record company.' using errcode = '23514';
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists guard_schedule_procedure on public.preventive_schedules;
create trigger guard_schedule_procedure before insert or update on public.preventive_schedules
  for each row execute function private.guard_procedure_parent();
drop trigger if exists guard_step_procedure on public.procedure_steps;
create trigger guard_step_procedure before insert or update on public.procedure_steps
  for each row execute function private.guard_procedure_parent();
drop trigger if exists guard_template_company on public.procedure_templates;
create trigger guard_template_company before update on public.procedure_templates
  for each row execute function private.guard_procedure_parent();

create or replace function private.guard_work_order_step_result()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  parent_work public.work_orders%rowtype;
  step public.procedure_steps%rowtype;
begin
  if tg_op = 'UPDATE' and (new.company_id, new.work_order_id, new.procedure_step_id)
    is distinct from (old.company_id, old.work_order_id, old.procedure_step_id) then
    raise exception 'Recorded checklist result parent cannot be changed.' using errcode = '23514';
  end if;
  -- Completion UPDATE and response writes serialize on the same parent row.
  select * into parent_work from public.work_orders w
    where w.id = new.work_order_id and w.company_id = new.company_id for update;
  if not found then raise exception 'Work order not available for this company.' using errcode = '42501'; end if;
  select * into step from public.procedure_steps s where s.id = new.procedure_step_id
    and s.company_id = new.company_id and s.procedure_template_id = parent_work.procedure_template_id;
  if not found then raise exception 'Step must belong to the current work order procedure.' using errcode = '23514'; end if;
  if parent_work.status = 'completed' and step.required and not private.procedure_result_answered(step.response_type, new.value) then
    raise exception 'Reopen the work order before clearing a required checklist result.' using errcode = '23514';
  end if;
  return new;
end;
$$;
drop trigger if exists guard_work_order_step_result on public.work_order_step_results;
create trigger guard_work_order_step_result before insert or update on public.work_order_step_results
  for each row execute function private.guard_work_order_step_result();

-- Restrictive policies supplement all existing permissive role policies.
drop policy if exists "Checklist results match current procedure" on public.work_order_step_results;
create policy "Checklist results match current procedure" on public.work_order_step_results
  as restrictive for all to authenticated
  using (private.is_company_member(company_id))
  with check (private.is_company_operational_editor(company_id) and exists (
    select 1 from public.work_orders w join public.procedure_steps s
      on s.procedure_template_id = w.procedure_template_id and s.company_id = w.company_id
    where w.id = work_order_step_results.work_order_id
      and s.id = work_order_step_results.procedure_step_id
      and w.company_id = work_order_step_results.company_id
  ));

create or replace function public.generate_preventive_work_order(
  p_company_id uuid, p_schedule_id uuid, p_expected_due_at date
)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  schedule public.preventive_schedules%rowtype;
  equipment public.assets%rowtype;
  existing_work_id uuid;
  generated_id uuid;
  next_date date;
begin
  if auth.uid() is null or not coalesce(private.is_company_operational_editor(p_company_id), false) then
    raise exception 'Operational edit access is required to generate PM work.' using errcode = '42501';
  end if;
  if p_schedule_id is null or p_expected_due_at is null or not isfinite(p_expected_due_at)
    or p_expected_due_at < date '0001-01-01' or p_expected_due_at > date '9999-12-31' then
    raise exception 'A valid schedule and expected due date are required.' using errcode = '22023';
  end if;
  select * into schedule from public.preventive_schedules s
    where s.id = p_schedule_id and s.company_id = p_company_id for update;
  select w.id into existing_work_id from public.work_orders w
    where w.company_id = p_company_id and w.preventive_source_id = p_schedule_id and w.preventive_due_at = p_expected_due_at;
  if existing_work_id is not null then
    return jsonb_build_object('work_order_id', existing_work_id, 'next_due_at', schedule.next_due_at, 'reused', true);
  end if;
  if schedule.id is null then raise exception 'PM schedule not found for this company.' using errcode = '42501'; end if;
  if not schedule.active then raise exception 'PM schedule is inactive.' using errcode = '22023'; end if;
  if schedule.next_due_at is distinct from p_expected_due_at then
    raise exception 'PM due date changed. Refresh before generating work.' using errcode = '40001';
  end if;
  select * into equipment from public.assets a where a.id = schedule.asset_id and a.company_id = p_company_id for share;
  if not found then raise exception 'PM equipment not found for this company.' using errcode = '23514'; end if;
  if schedule.procedure_template_id is not null and not exists (
    select 1 from public.procedure_templates p where p.id = schedule.procedure_template_id and p.company_id = p_company_id
  ) then raise exception 'PM procedure not found for this company.' using errcode = '23514'; end if;
  next_date := case schedule.frequency
    when 'weekly' then schedule.next_due_at + 7
    when 'monthly' then (schedule.next_due_at + interval '1 month')::date
    when 'quarterly' then (schedule.next_due_at + interval '3 months')::date
    else null end;
  if next_date is null or next_date > date '9999-12-31' then
    raise exception 'PM next due date is outside the supported date range.' using errcode = '22023';
  end if;
  insert into public.work_orders(company_id, location_id, asset_id, procedure_template_id, title, description,
    type, priority, status, due_at, created_by, safety_check_required, safety_devices_checked,
    preventive_schedule_id, preventive_source_id, preventive_source_title, preventive_due_at)
  values (p_company_id, equipment.location_id, equipment.id, schedule.procedure_template_id, schedule.title,
    format('Generated from preventive schedule: %s.', schedule.frequency), 'preventive', 'medium', 'open',
    schedule.next_due_at, auth.uid(), coalesce(equipment.safety_devices_required, true), false,
    schedule.id, schedule.id, schedule.title, schedule.next_due_at)
  returning id into generated_id;
  update public.preventive_schedules set next_due_at = next_date, updated_at = now()
    where id = schedule.id and company_id = p_company_id;
  if not found then raise exception 'PM schedule advance was denied.' using errcode = '42501'; end if;
  insert into public.work_order_events(company_id, work_order_id, actor_id, event_type, summary)
    values (p_company_id, generated_id, auth.uid(), 'created',
      format('Generated from PM schedule "%s" for %s.', schedule.title, schedule.next_due_at));
  return jsonb_build_object('work_order_id', generated_id, 'next_due_at', next_date, 'reused', false);
end;
$$;

create or replace function public.get_procedure_link_counts(p_company_id uuid, p_template_ids uuid[])
returns table(procedure_template_id uuid, work_order_count bigint, schedule_count bigint)
language sql stable security invoker set search_path = '' as $$
  select p.id,
    (select count(*) from public.work_orders w where w.company_id = p_company_id and (
      w.procedure_template_id = p.id or exists (
        select 1 from public.work_order_step_results r join public.procedure_steps step
          on step.id = r.procedure_step_id and step.company_id = r.company_id
        where r.work_order_id = w.id and r.company_id = w.company_id and step.procedure_template_id = p.id
      )
    )),
    (select count(*) from public.preventive_schedules s where s.company_id = p_company_id and s.procedure_template_id = p.id)
  from public.procedure_templates p
  where auth.uid() is not null and private.is_company_member(p_company_id)
    and p.company_id = p_company_id and p.id = any(p_template_ids);
$$;

revoke all on function private.procedure_result_answered(text, text) from public, anon;
grant execute on function private.procedure_result_answered(text, text) to authenticated, service_role;
revoke all on function private.guard_procedure_work_order() from public, anon, authenticated;
revoke all on function private.guard_procedure_parent() from public, anon, authenticated;
revoke all on function private.guard_work_order_step_result() from public, anon, authenticated;
revoke all on function public.generate_preventive_work_order(uuid, uuid, date) from public, anon;
grant execute on function public.generate_preventive_work_order(uuid, uuid, date) to authenticated;
revoke all on function public.get_procedure_link_counts(uuid, uuid[]) from public, anon;
grant execute on function public.get_procedure_link_counts(uuid, uuid[]) to authenticated;

notify pgrst, 'reload schema';
commit;
