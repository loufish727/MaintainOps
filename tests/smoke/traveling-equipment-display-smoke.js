const assert = require('node:assert/strict');
global.window = {};
for (const name of ['equipmentLabels','assetHierarchyDisplay','assetInventoryDisplay','optionDisplay','assetCardDisplay']) require(`../../src/render/${name}.js`);
const assets = [
  { id:'north', name:'North primary', location_id:'north', asset_type:'machine',status:'running' },
  { id:'south', name:'South primary', location_id:'south', asset_type:'machine',status:'running' },
  { id:'travel-n', name:'Curver 1', location_id:'north', asset_type:'traveling_machine',status:'running' },
  { id:'travel-s', name:'Curver 2', location_id:'south', asset_type:'traveling_machine',status:'offline' },
];
let type='all', area='all', status='all';
const escapeHtml = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const state = { getAssetTypeFilter:()=>type, getAssetAreaFilter:()=>area, setAssetAreaFilter:value=>area=value, getAssetStatusFilter:()=>status };
const hierarchy = window.MaintainOpsAssetHierarchyDisplay.createAssetHierarchyDisplayHelpers({
  getAssets:()=>assets, ...state, matchesActiveLocation:asset=>asset.location_id==='north', matchesSearch:()=>true,
});
assert.deepEqual(hierarchy.filteredAssets().map(a=>a.id),['north','travel-n']);
type='traveling_machine'; assert.deepEqual(hierarchy.filteredAssets().map(a=>a.id),['travel-n','travel-s']);
status='offline'; assert.deepEqual(hierarchy.filteredAssets().map(a=>a.id),['travel-s']);
status='all'; area='stale area';
const controls=window.MaintainOpsAssetInventoryDisplay.renderAssetInventoryControls({
  assets, matchesActiveLocation:a=>a.location_id==='north', workspaceUiState:state,
  ASSET_TYPE_OPTIONS:['machine','traveling_machine'], escapeHtml,
});
assert.equal(area,'all'); assert.match(controls,/Traveling Equipment/); assert.match(controls,/All facilities/);
const options=window.MaintainOpsOptionDisplay.createOptionDisplayHelpers({escapeHtml,getAssets:()=>assets,
  getLocations:()=>[],getActiveLocationId:()=> 'north',matchesActiveLocation:a=>a.location_id==='north', ...hierarchy});
assert.doesNotMatch(options.renderParentAssetOptions(),/Curver/);
assert.match(options.renderAssetOptions('travel-s'),/value="travel-s" selected/);
const card=window.MaintainOpsAssetCardDisplay.createAssetCardDisplayHelpers({escapeHtml,
  assetTypeLabel:window.MaintainOpsEquipmentLabels.assetTypeLabel,getWorkOrders:()=>[],getActiveAssetId:()=>'',
  getLocations:()=>[{id:'south',name:'South <Plant>'}],...hierarchy}).renderAssetCard(assets[3]);
assert.match(card,/Current facility: South &lt;Plant>/); assert.match(card,/Traveling Primary/);
console.log('Traveling equipment display smoke passed');
