const assert = require('node:assert/strict');
global.window = {};
require('../../src/services/appIssueReportsService.js');
const service = window.MaintainOpsAppIssueReportsService.createAppIssueReportRecord;
const { createAppIssueWorkflow } = require('../../src/workflows/appIssueWorkflow.js');
const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => {resolve=a;reject=b;}); return {promise,resolve,reject}; };
const conflict = {error:{code:'23505',message:'duplicate'}};

function backend(insertResult, existing) {
  const calls = [];
  const chain = { select(value) { calls.push(['select',value]); return this; },
    eq(key,value) { calls.push(['eq',key,value]); return this; }, async maybeSingle() { return existing; } };
  return { calls, from(table) { assert.equal(table,'app_issue_reports'); return { ...chain, async insert(payload) {calls.push(['insert',payload]);return insertResult;} }; } };
}
function setup() {
  const s = {company:'company',user:'user',records:[],notices:[],renders:0,closed:false,loaded:[],pending:null};
  const error = {textContent:''}, button = {disabled:false,textContent:'Send Report',isConnected:true};
  const form = { values:{title:'Help',details:'Save failed',screen:'work'},querySelector:()=>button };
  const event = {preventDefault(){},currentTarget:form};
  const deps = { documentRef:{querySelector:()=>error},windowRef:{location:{href:'https://app.invalid/'}},
    FormDataCtor:class {constructor(f){this.values=f.values;}get(k){return this.values[k]||'';}},
    getActiveCompanyId:()=>s.company,getSession:()=>({user:{id:s.user}}),activeLocationDatabaseId:()=>s.location||'location',
    getActiveSection:()=> 'work',supabaseClient:()=>({}),requiredText:v=>String(v).trim(),
    withOperationTimeout:p=>p,appIssueReportErrorState:e=>({message:e.message}),
    createAppIssueReportRecord:async(_client,p)=>{s.records.push({...p});return s.pending?s.pending.promise:{error:null};},
    listAppIssueReports:async(_client,id)=>{s.loaded.push(id);if(s.listError)throw Error('list unavailable');return {data:[],error:null};},
    setAppIssueReportsReady:v=>{s.ready=v;},setAppIssueReports:v=>{s.list=v;},
    setReportIssueMode:v=>{s.closed=!v;},showNotice:(...args)=>s.notices.push(args),renderWorkspace:()=>s.renders++,
  };
  return {s,deps,event,error,button,form};
}

(async()=>{
  const payload={id:'report',company_id:'company',reporter_id:'user',location_id:'location',screen:'work',page_url:'url',severity:'normal',title:'Help',details:'Save failed'};
  let client=backend({error:null},null);
  assert.equal((await service(client,payload)).error,null);assert.equal(client.calls.length,1);
  client=backend(conflict,{data:{...payload,status:'resolved'},error:null});
  assert.equal((await service(client,payload)).error,null);
  assert.deepEqual(client.calls.filter(c=>c[0]==='eq'),[['eq','id','report'],['eq','company_id','company'],['eq','reporter_id','user']]);
  for(const mismatch of [null,{...payload,reporter_id:'other'},{...payload,title:'Changed'}]) {
    client=backend(conflict,{data:mismatch,error:null});assert.equal(await service(client,payload),conflict);
  }
  client=backend(conflict,{error:{message:'offline'}});assert.equal(await service(client,payload),conflict);
  const denied={error:{code:'42501'}};
  client=backend(denied,null);assert.equal(await service(client,payload),denied);assert.equal(client.calls.length,1);

  let x=setup(), w=createAppIssueWorkflow(x.deps);
  x.s.pending=deferred();const first=w.createAppIssueReport(x.event);
  await w.createAppIssueReport(x.event);assert.equal(x.s.records.length,1,'Double submit is single-flight');
  x.s.pending.reject(Error('response lost'));await first;
  assert.match(x.error.textContent,/response lost/);assert.equal(x.s.closed,false);
  const id=x.s.records[0].id;assert.match(id,/^[a-f0-9-]{36}$/);
  x.s.pending=null;await w.createAppIssueReport(x.event);
  assert.equal(x.s.records[1].id,id,'Lost-response retry reuses its ID');assert.equal(x.s.closed,true);
  await w.createAppIssueReport(x.event);assert.notEqual(x.s.records[2].id,id,'A confirmed new submission is a new report');

  x=setup();w=createAppIssueWorkflow(x.deps);x.s.pending=deferred();const changed=w.createAppIssueReport(x.event);
  x.s.pending.reject(Error('lost'));await changed;x.form.values.details='A different problem';x.s.pending=null;
  await w.createAppIssueReport(x.event);assert.notEqual(x.s.records[0].id,x.s.records[1].id);

  for(const switchAccount of [false,true]) {
    x=setup();w=createAppIssueWorkflow(x.deps);x.s.pending=deferred();const saving=w.createAppIssueReport(x.event);
    if(switchAccount)x.s.user='second';else x.s.company='second';
    x.s.pending.resolve({error:null});await saving;
    assert.equal(x.s.renders,0);assert.deepEqual(x.s.notices,[]);assert.deepEqual(x.s.loaded,[]);
  }
  x=setup();w=createAppIssueWorkflow(x.deps);x.s.listError=true;await w.createAppIssueReport(x.event);
  assert.equal(x.s.closed,true);assert.equal(x.error.textContent,'');assert.equal(x.s.renders,1);
  assert.match(x.s.notices.at(-1)[0],/report sent, but/);

  x=setup();const loading=deferred();x.deps.listAppIssueReports=()=>loading.promise;w=createAppIssueWorkflow(x.deps);
  const load=w.reloadAppIssueReports();x.s.company='changed';loading.resolve({data:[{id:'old'}],error:null});await load;
  assert.equal(x.s.list,undefined,'Late list response cannot overwrite a different workspace');
  console.log('app issue relay retry smoke passed: service reconciliation, single-flight, lost response, new content, account/company isolation, saved-but-list-failed');
})().catch(error=>{console.error(error);process.exitCode=1;});
