const assert=require('node:assert/strict');
global.window={};
const {createAssetWorkflow}=require('../../src/workflows/assetWorkflow.js');
async function main() {
  let company='company',activeAsset='asset',confirm=true,response={error:null},pending;
  const calls=[],notice=[],confirmations=[],audit=[],errors={textContent:''},button={disabled:false};
  const asset={id:'asset',company_id:company,location_id:'north',name:'Curver',asset_type:'traveling_machine'};
  const values={destination_id:'south',name:'Curver',asset_type:'traveling_machine',status:'running',location_id:'north'};
  const element={dataset:{companyId:company,assetId:'asset',fromLocation:'north'},values,
    querySelector:s=>s==="button[type='submit']" ? button : s==='[data-transfer-error]' ? errors : {textContent:'South'}};
  const client={rpc:(name,args)=>{calls.push({name,args});return pending || Promise.resolve(response);},
    from:table=>({update(payload){calls.push({table,payload});return this;},eq(column,value){calls.push({column,value});return this;},select(){return this;},then(resolve){return Promise.resolve(pending||response).then(resolve);}})};
  const workflow=createAssetWorkflow({documentRef:{querySelector:()=>errors},CSSRef:{},alertRef:()=>{},
    FormDataCtor:class{constructor(form){this.values=form.values;}get(name){return this.values[name];}},
    getAssets:()=>[asset],getActiveCompanyId:()=>company,getActiveAssetId:()=>activeAsset,getSession:()=>({user:{id:'tech'}}),
    supabaseClient:()=>client,withOperationTimeout:p=>p,confirmRef:text=>{confirmations.push(text);return confirm;},showNotice:text=>notice.push(text),
    render:async()=>notice.push('render'),recordAssetEvent:async(...args)=>audit.push(args),requiredText:value=>value,activeLocationDatabaseId:()=> 'north',
    isMissingColumnError:()=>false,isAssetHierarchySchemaError:()=>false});
  const event={preventDefault(){},currentTarget:element};
  confirm=false; await workflow.moveTravelingAsset(event); assert.equal(calls.length,0);
  assert.match(confirmations[0],/All work history stays linked to this machine/);
  assert.match(confirmations[0],/Existing work orders keep their original facility and assigned person/);
  assert.match(confirmations[0],/Warehouse stock stays at its current facility/);
  assert.match(confirmations[0],/Save any equipment edits before moving; unsaved edits will be lost/);
  assert.doesNotMatch(confirmations[0],/Existing work and stock will not move/);
  confirm=true; pending=new Promise(resolve=>{pendingResolve=resolve;});
  const operation=workflow.moveTravelingAsset(event);
  await workflow.moveTravelingAsset(event); assert.equal(calls.length,1); assert.equal(button.disabled,true);
  assert.deepEqual(calls[0],{name:'update_traveling_equipment_location',args:{p_company_id:'company',p_asset_id:'asset',p_location_id:'south',p_expected_location_id:'north',p_expected_revision:0}});
  company='elsewhere'; pendingResolve({error:null}); await operation;
  assert.deepEqual(notice,[]); assert.equal(button.disabled,false);
  company='company'; pending=null; response={error:{message:'This machine has already moved.'}};
  await workflow.moveTravelingAsset(event); assert.match(errors.textContent,/already moved/); assert.deepEqual(notice,[]);
  response={error:null}; await workflow.moveTravelingAsset(event); assert.equal(notice.filter(x=>x==='render').length,1);
  response={data:[{id:'asset'}],error:null}; await workflow.updateAsset(event);
  const update=calls.find(call=>call.table==='assets'); assert.ok(update); assert.equal(Object.hasOwn(update.payload,'location_id'),false);
  assert.ok(calls.some(call=>call.column==='location_id' && call.value==='north'));
  assert.ok(calls.some(call=>call.column==='traveling_revision' && call.value===0));
  response={data:[],error:null}; await workflow.updateAsset(event); assert.match(errors.textContent,/moved, changed condition, or is no longer editable/);
  asset.status='running'; asset.traveling_revision=5;
  response={error:{message:'changed since you opened'}};
  assert.equal((await workflow.updateAssetStatus('asset','offline')).message,'changed since you opened');
  assert.deepEqual(calls.at(-1),{name:'update_traveling_equipment_condition',args:{p_company_id:'company',p_asset_id:'asset',p_status:'offline',p_expected_status:'running',p_expected_location_id:'north',p_expected_revision:5}});
  const count=calls.length;
  assert.match((await workflow.updateAssetStatus('missing','offline')).message,/not loaded/);
  assert.equal(calls.length,count,'missing cache entry must never permit an unguarded PATCH');
  asset.asset_type='machine'; response={data:[],error:null};
  assert.match((await workflow.updateAssetStatus('asset','offline')).message,/no longer editable/);
  assert.ok(calls.some(c=>c.column==='asset_type'&&c.value==='machine'));
  notice.length=0; audit.length=0;
  pending=new Promise(resolve=>{pendingResolve=resolve;}); values.name='Changed';
  const saving=workflow.updateAsset(event); activeAsset='other'; company='another-company';
  pendingResolve({data:[{id:'asset'}],error:null}); await saving;
  assert.equal(audit[0][0],'asset'); assert.deepEqual(audit[0][3],{companyId:'company',actorId:'tech'});
  assert.deepEqual(notice,[],'late save cannot rerender another asset or company');
  console.log('Traveling workflow passed: confirmation, duplicate submit, scope race, failure and stale edit');
}
let pendingResolve;
main().catch(error=>{console.error(error);process.exitCode=1;});
