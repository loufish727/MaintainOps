alter table public.assets
drop constraint if exists assets_asset_type_check;

update public.assets
set asset_type = 'secondary_machine'
where asset_type = 'attachment';

update public.assets
set asset_type = 'component'
where asset_type = 'tooling';

update public.assets
set asset_type = 'shop_item'
where asset_type = 'support';

alter table public.assets
add constraint assets_asset_type_check
check (asset_type in ('machine', 'secondary_machine', 'component', 'shop_item'))
not valid;

notify pgrst, 'reload schema';
