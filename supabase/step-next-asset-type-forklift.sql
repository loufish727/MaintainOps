alter table public.assets
drop constraint if exists assets_asset_type_check;

alter table public.assets
add constraint assets_asset_type_check
check (asset_type in ('machine', 'forklift', 'secondary_machine', 'tooling', 'component', 'shop_item'));

notify pgrst, 'reload schema';
