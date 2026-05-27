-- Harden function execute privileges so internal authenticated RPCs are not
-- callable by anonymous clients through default PUBLIC function privileges.

do $$
declare
  signature text;
  internal_signatures text[] := array[
    'public.create_company(text)',
    'public.ensure_company_profile(uuid)',
    'public.set_company_logo(uuid,text)',
    'public.get_my_companies()',
    'public.update_company_member_role(uuid,uuid,text)',
    'public.create_company_invite(uuid,text,text)',
    'public.create_company_invite(uuid,text,text,uuid)',
    'public.accept_company_invites()',
    'public.ensure_location_request_link(uuid)',
    'public.cancel_company_invite(uuid,uuid)',
    'public.record_work_order_part_usage(uuid,uuid,uuid,integer)'
  ];
begin
  foreach signature in array internal_signatures loop
    if to_regprocedure(signature) is not null then
      execute format('revoke all on function %s from public, anon', signature);
      execute format('grant execute on function %s to authenticated', signature);
    end if;
  end loop;
end $$;

-- Keep only the intentionally public QR/intake RPCs executable by anon.
do $$
declare
  signature text;
  public_signatures text[] := array[
    'public.get_public_request_intake(text)',
    'public.submit_public_location_request(text,text,text,text,text,text,text)',
    'public.attach_maintenance_request_photo(uuid,text,text,text,bigint,text,bigint)'
  ];
begin
  foreach signature in array public_signatures loop
    if to_regprocedure(signature) is not null then
      execute format('revoke all on function %s from public', signature);
      execute format('grant execute on function %s to anon, authenticated', signature);
    end if;
  end loop;
end $$;

notify pgrst, 'reload schema';
