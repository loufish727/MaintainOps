const assert=require('node:assert/strict');
(async()=>{
  global.window={MaintainOpsMaintenanceWorkspaceRows:await import('../../src/services/maintenanceWorkspaceRows.mjs')};
  require('../../src/services/assetsService.js');
  for(const count of [0,141,1000,1001,2025]) {
    const rows=Array.from({length:count},(_,i)=>({id:String(i),name:'Unit '+i})),calls=[];
    const client={from(table){assert.equal(table,'assets');const call={order:[]};return{
      select(columns,options){assert.equal(columns,'*');assert.deepEqual(options,{count:'exact'});return this;},
      eq(column,value){assert.equal(column,'company_id');assert.equal(value,'company');return this;},
      is(column,value){assert.equal(column,'archived_at');assert.equal(value,null);return this;},
      order(column){call.order.push(column);return this;},
      async range(from,to){calls.push({...call,from,to});return{data:rows.slice(from,to+1),count,error:null};}
    };}};
    const response=await window.MaintainOpsAssetsService.listAssets(client,'company');
    assert.equal(response.error,null);assert.deepEqual(response.data,rows);
    assert.equal(calls.length,Math.max(1,Math.ceil(count/1000)));
    for(const call of calls)assert.deepEqual(call.order,['name','id']);
  }
  console.log('Complete equipment loads: zero/small/1000+ datasets, same-query exact counts and stable paging passed');
})().catch(error=>{console.error(error);process.exitCode=1;});
