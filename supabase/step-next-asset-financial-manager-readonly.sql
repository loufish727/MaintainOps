-- Make managers read-only in the Financial tab.
--
-- Managers keep select access through "Financial roles can read asset financials",
-- but finance field writes are limited to admins and accounting.

drop policy if exists "Finance roles can insert asset financials" on public.asset_financials;
create policy "Finance roles can insert asset financials"
on public.asset_financials for insert
to authenticated
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and exists (
    select 1
    from public.assets a
    where a.id = asset_financials.asset_id
      and a.company_id = asset_financials.company_id
  )
);

drop policy if exists "Finance roles can update asset financials" on public.asset_financials;
create policy "Finance roles can update asset financials"
on public.asset_financials for update
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
)
with check (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = asset_financials.company_id
      and cm.user_id = auth.uid()
      and cm.role in ('admin', 'accounting')
  )
  and exists (
    select 1
    from public.assets a
    where a.id = asset_financials.asset_id
      and a.company_id = asset_financials.company_id
  )
);

notify pgrst, 'reload schema';
