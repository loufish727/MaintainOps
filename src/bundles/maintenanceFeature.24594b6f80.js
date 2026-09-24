(()=>{var Ge=Object.create;var Pe=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var Ye=Object.getOwnPropertyNames;var Je=Object.getPrototypeOf,Xe=Object.prototype.hasOwnProperty;var oe=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(s){throw e=0,s}};var Qe=(t,e,s,v)=>{if(e&&typeof e=="object"||typeof e=="function")for(let R of Ye(e))!Xe.call(t,R)&&R!==s&&Pe(t,R,{get:()=>e[R],enumerable:!(v=Ke(e,R))||v.enumerable});return t};var de=(t,e,s)=>(s=t!=null?Ge(Je(t)):{},Qe(e||!t||!t.__esModule?Pe(s,"default",{value:t,enumerable:!0}):s,t));var Ae=oe((nt,fe)=>{(function(){function t(e={}){let s=e.documentRef||document,v=e.FormDataCtor||FormData,R=e.CSSRef||CSS,o=new Map,E=new Set;function N(){let l=e.getActiveCompanyId(),w=e.getSession()?.user?.id,q=e.getScope?.();return{companyId:l,userId:w,client:e.supabaseClient(),isCurrent:()=>e.getActiveCompanyId()===l&&e.getSession()?.user?.id===w&&e.getScope?.()===q}}function T(l){if(!l.companyId||!l.userId||e.canEditOperationalRecords?.()!==!0)throw new Error("You do not have permission to edit PM schedules.")}function u(l){if(T(l),!e.canDeleteOperationalRecords())throw new Error("Only company admins and managers can delete PM schedules.")}function x(l,w,q){l&&l.isConnected!==!1&&w.isCurrent()&&(l.disabled=!1,l.textContent=q)}function D(){let l=Array.from(s.querySelectorAll?.("[data-create-pm-form]")||[]),w=s.querySelector("#create-pm-form");w&&!l.includes(w)&&l.push(w),l.forEach(q=>q.addEventListener("submit",F))}async function F(l){l.preventDefault();let w=l.currentTarget,q=N(),M=`${q.companyId}:create`;if(E.has(M))return;E.add(M);let i=w.querySelector("button[type='submit']"),y=w.querySelector("[data-pm-error]")||s.querySelector("#pm-error");y&&(y.textContent=""),i&&(i.disabled=!0,i.textContent="Adding...");try{T(q);let k=e.captureCreateDraft?.(w),S=new v(w);if(e.nextDueDate(String(S.get("next_due_at")||""),String(S.get("frequency")||"")),!e.confirmAssetLocationRouting(S.get("asset_id")||null,"this PM schedule",y))return;let{error:$}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:q.companyId,location_id:e.locationIdForAsset(S.get("asset_id")),asset_id:S.get("asset_id"),title:e.requiredText(S.get("title"),"PM title"),frequency:S.get("frequency"),next_due_at:S.get("next_due_at"),...e.procedureColumn(S.get("procedure_template_id")),active:!0,created_by:q.userId}),"PM schedule save timed out. Check your connection and try again.",15e3);if($)throw $;if(k&&e.clearCreateDraft?.(k),!q.isCurrent())return;e.showNotice("PM schedule added."),await e.render()}catch(k){if(!q.isCurrent())return;y?y.textContent=k.message||"Could not add PM schedule.":e.alertUser(k.message||k)}finally{E.delete(M),x(i,q,"Add Schedule")}}function L(l){let w=N();try{if(u(w),E.has(`${w.companyId}:delete:${l}`)||!e.getPreventiveSchedules().some(q=>q.id===l&&q.company_id===w.companyId))return;e.setPendingDeleteScheduleId(l),e.renderWorkspace()}catch(q){e.alertUser(q.message)}}async function m(l){let w=N(),q=`${w.companyId}:delete:${l}`;if(E.has(q)||!e.getPreventiveSchedules().find(y=>y.id===l&&y.company_id===w.companyId))return;E.add(q);let i=s.querySelector(`[data-confirm-delete-schedule="${R.escape(l)}"]`);i&&(i.disabled=!0,i.textContent="Deleting...");try{u(w);let{data:y,error:k}=await e.withOperationTimeout(w.client.from("preventive_schedules").delete().eq("id",l).eq("company_id",w.companyId).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(!w.isCurrent())return;if(k)throw k;if(!Array.isArray(y)||!y.some($=>$.id===l))throw new Error("PM schedule was not deleted. Refresh and check your access before retrying.");let S=await e.withOperationTimeout(w.client.from("preventive_schedules").select("id").eq("id",l).eq("company_id",w.companyId).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(!w.isCurrent())return;if(S.error)throw new Error(`PM schedule delete verification failed: ${S.error.message}`);if(S.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(y){if(!w.isCurrent())return;e.showNotice(y.message||"Could not delete PM schedule.","warning")}finally{E.delete(q),x(i,w,"Permanently Delete")}}function A(l){let w=`${e.getActiveCompanyId()}:${l}`;if(o.has(w))return o.get(w);let q=_(l).finally(()=>o.delete(w));return o.set(w,q),q}async function _(l){let w=N(),q=e.getPreventiveSchedules().find(i=>i.id===l&&i.company_id===w.companyId);if(!q)return;let M=s.querySelector(`[data-generate-pm="${R.escape(l)}"]`);M&&(M.disabled=!0,M.textContent="Generating...");try{if(T(w),q.active===!1)throw new Error("This PM schedule cannot generate work.");e.nextDueDate(q.next_due_at,q.frequency);let{data:i,error:y}=await e.withOperationTimeout(w.client.rpc("generate_preventive_work_order",{p_company_id:w.companyId,p_schedule_id:q.id,p_expected_due_at:q.next_due_at}),"PM work order generation timed out. Retry this schedule to check the same occurrence.");if(y)throw y;if(!i?.work_order_id)throw new Error("PM generation did not return a work order.");if(!w.isCurrent())return;e.setActiveWorkOrderId(i.work_order_id),e.setActiveSection("work"),e.showNotice(i.reused?"Opened the work order already generated for this PM occurrence.":"PM work order generated."),await e.render()}catch(i){w.isCurrent()&&e.showNotice(`Could not generate PM work: ${i.message||i}`,"warning")}finally{x(M,w,"Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:D,createPreventiveSchedule:F,requestDeletePreventiveSchedule:L,deletePreventiveSchedule:m,generatePreventiveWorkOrder:A}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:t},typeof fe<"u"&&(fe.exports={createPreventiveMaintenanceWorkflow:t})})()});var Re=oe((rt,ye)=>{(function(){function t(e={}){let s=e.documentRef||document,v=e.FormDataCtor||FormData,R=e.CSSRef||CSS,o=new Set,E="Basic Equipment Inspection",N="A simple starter checklist for visual checks, readings, and final pass/fail.",T=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}];function u(){let i=e.getActiveCompanyId(),y=e.getSession()?.user?.id,k=e.getScope?.();return{companyId:i,userId:y,client:e.supabaseClient(),isCurrent:()=>e.getActiveCompanyId()===i&&e.getSession()?.user?.id===y&&e.getScope?.()===k}}function x(i){if(!i.companyId||!i.userId||e.canEditOperationalRecords?.()!==!0)throw new Error("You do not have permission to edit procedure checklists.")}function D(i){if(x(i),!e.canDeleteOperationalRecords())throw new Error("Only company admins and managers can delete procedures.")}function F(i,y,k){i&&i.isConnected!==!1&&y.isCurrent()&&(i.disabled=!1,i.textContent=k)}function L(){let i=s.querySelector("#create-procedure-form");i&&i.addEventListener("submit",m);let y=s.querySelector("#seed-sample-procedure");y&&y.addEventListener("click",A),s.querySelectorAll("[data-add-step]").forEach(k=>{k.addEventListener("submit",_)})}async function m(i){i.preventDefault();let y=i.currentTarget,k=u(),S=`${k.companyId}:create`;if(o.has(S))return;o.add(S);let $=y.querySelector("button[type='submit']"),P=s.querySelector("#procedure-error");P&&(P.textContent=""),$&&($.disabled=!0,$.textContent="Adding...");try{x(k);let r=e.captureCreateDraft?.(y),n=new v(y),{error:c}=await e.withOperationTimeout(k.client.from("procedure_templates").insert({company_id:k.companyId,name:e.requiredText(n.get("name"),"Procedure checklist name"),description:String(n.get("description")||"").trim()||null,created_by:k.userId}),"Procedure save timed out.");if(c)throw c;if(r&&e.clearCreateDraft?.(r),!k.isCurrent())return;e.showNotice("Procedure checklist added."),await e.render()}catch(r){if(!k.isCurrent())return;P?P.textContent=r.message||"Could not add procedure.":e.alertUser(r.message||r)}finally{o.delete(S),F($,k,"Add Checklist")}}async function A(){let i=u(),y=`${i.companyId}:sample`;if(o.has(y))return;o.add(y);let k=s.querySelector("#seed-sample-procedure"),S=null,$=!1;k&&(k.disabled=!0,k.textContent="Adding sample...");try{x(i);let P=await e.withOperationTimeout(i.client.from("procedure_templates").select("id, company_id, name, description").eq("company_id",i.companyId).ilike("name",E),"Sample procedure lookup timed out.");if(!i.isCurrent())return;if(P.error)throw P.error;if(!Array.isArray(P.data))throw new Error("Could not verify existing sample checklists.");if(P.data.length>1)throw new Error("Multiple sample checklists already exist. No checklists were changed.");x(i);let r=P.data[0];if(!r){let g=await e.withOperationTimeout(i.client.from("procedure_templates").insert({company_id:i.companyId,name:E,description:N,created_by:i.userId}).select("id, company_id, name, description").single(),"Sample procedure save timed out. Retry to check whether the checklist was saved.");if(!i.isCurrent())return;if(g.error)throw g.error;r=g.data}if(!r?.id||r.company_id!==i.companyId)throw new Error("Could not verify the saved sample checklist.");let n=`${i.companyId}:steps:${r.id}`;if(o.has(n))throw new Error("Checklist steps are already being saved. Retry when that save finishes.");S=n,o.add(S),$=!0;let c=await e.withOperationTimeout(i.client.from("procedure_steps").select("*").eq("company_id",i.companyId).eq("procedure_template_id",r.id),"Sample procedure steps lookup timed out.");if(!i.isCurrent())return;if(c.error)throw c.error;if(!Array.isArray(c.data))throw new Error("Could not verify saved sample steps.");let a=new Set;for(let g of c.data){let I=T.find(U=>U.position===g.position);if(!I||a.has(g.position)||g.company_id!==i.companyId||g.procedure_template_id!==r.id||g.prompt!==I.prompt||g.response_type!==I.response_type||g.required!==I.required)throw $=!1,new Error("The existing sample checklist has customized steps. No steps were changed.");a.add(g.position)}let h=T.filter(g=>!a.has(g.position));if(!h.length){$=!1,e.showNotice("Sample inspection procedure already exists.","warning"),await e.render();return}if(r.description!==N)throw $=!1,new Error("The existing sample checklist has been customized. Review its steps manually; no steps were changed.");let d=await l(r.id,i);if(!i.isCurrent())return;if(d.workOrders||d.schedules)throw $=!1,new Error("The partial sample checklist is already linked to work or PM schedules. Review its steps manually; no steps were changed.");x(i);let b=h.map(g=>({...g,company_id:i.companyId,procedure_template_id:r.id})),{error:f}=await e.withOperationTimeout(i.client.from("procedure_steps").insert(b),"Sample procedure steps save timed out.");if(f)throw f;if($=!1,!i.isCurrent())return;e.showNotice("Sample procedure checklist added."),await e.render()}catch(P){i.isCurrent()&&e.showNotice($?`Sample checklist retained, but completion failed: ${P.message||P} Retry to finish missing steps.`:`Could not add sample procedure: ${P.message||P}`,"warning")}finally{o.delete(y),S&&o.delete(S),F(k,i,$?"Retry sample checklist completion":"Add sample inspection checklist")}}async function _(i){i.preventDefault();let y=i.currentTarget,k=u(),S=y.dataset.addStep,$=`${k.companyId}:steps:${S}`;if(o.has($))return;o.add($);let P=y.querySelector("button[type='submit']"),r=s.querySelector(`[data-step-error="${R.escape(S)}"]`);r&&(r.textContent=""),P&&(P.disabled=!0,P.textContent="Adding...");try{x(k);let n=e.getProcedureTemplates().find(f=>f.id===S&&f.company_id===k.companyId);if(!n||!Array.isArray(n.procedure_steps))throw new Error("Procedure checklist is unavailable. Refresh before adding a step.");let c=n.procedure_steps.map(f=>Number(f.position));if(c.some(f=>!Number.isSafeInteger(f)||f<1))throw new Error("Procedure step positions could not be verified.");let a=Math.max(0,...c)+1;if(!Number.isSafeInteger(a))throw new Error("Procedure step position is out of range.");let h=e.captureCreateDraft?.(y),d=new v(y),{error:b}=await e.withOperationTimeout(k.client.from("procedure_steps").insert({company_id:k.companyId,procedure_template_id:S,position:a,prompt:e.requiredText(d.get("prompt"),"Procedure checklist step"),response_type:d.get("response_type"),required:d.get("required")==="true"}),"Procedure step save timed out.");if(b)throw b;if(h&&e.clearCreateDraft?.(h),!k.isCurrent())return;e.showNotice("Procedure checklist step added."),await e.render()}catch(n){if(!k.isCurrent())return;r?r.textContent=n.message||"Could not add procedure step.":e.alertUser(n.message||n)}finally{o.delete($),F(P,k,"Add Step")}}async function l(i,y=u()){let{data:k,error:S}=await e.withOperationTimeout(y.client.rpc("get_procedure_link_counts",{p_company_id:y.companyId,p_template_ids:[i]}),"Procedure delete check timed out.",15e3);if(S)throw new Error(`Could not verify procedure links: ${S.message}`);if(!Array.isArray(k)||k.length!==1||k[0]?.procedure_template_id!==i)throw new Error("Could not verify procedure links. No checklist was deleted.");function $(P){if(typeof P!="number"&&!(typeof P=="string"&&/^\d+$/.test(P))||!Number.isSafeInteger(Number(P))||Number(P)<0)throw new Error("Could not verify procedure link counts. No checklist was deleted.");return Number(P)}return{workOrders:$(k[0].work_order_count),schedules:$(k[0].schedule_count)}}async function w(i,y){if(!["work_orders","preventive_schedules"].includes(i))throw new Error("Unsupported procedure relationship.");let k=await l(y);return i==="work_orders"?k.workOrders:k.schedules}async function q(i){let y=u(),k=`${y.companyId}:delete:${i}`;if(o.has(k)||!e.getProcedureTemplates().some($=>$.id===i&&$.company_id===y.companyId))return;o.add(k);let S=s.querySelector(`[data-procedure-delete-error="${R.escape(i)}"]`);S&&(S.textContent="");try{D(y);let $=await l(i,y);if(!y.isCurrent())return;D(y);let P=e.procedureDeleteBlockerMessage($);if(P){S&&(S.textContent=P);return}e.setPendingDeleteProcedureId(i),e.renderWorkspace()}catch($){if(!y.isCurrent())return;S?S.textContent=$.message||"Could not verify procedure links before delete.":e.showNotice($.message||"Could not verify procedure links before delete.","warning")}finally{o.delete(k)}}async function M(i){let y=u(),k=`${y.companyId}:delete:${i}`;if(o.has(k)||!e.getProcedureTemplates().find(r=>r.id===i&&r.company_id===y.companyId))return;o.add(k);let $=s.querySelector(`[data-confirm-delete-procedure="${R.escape(i)}"]`),P=s.querySelector(`[data-procedure-delete-error="${R.escape(i)}"]`);P&&(P.textContent=""),$&&($.disabled=!0,$.textContent="Deleting...");try{D(y);let r=await l(i,y);if(!y.isCurrent())return;D(y);let n=e.procedureDeleteBlockerMessage(r);if(n)throw new Error(n);let{data:c,error:a}=await e.withOperationTimeout(y.client.from("procedure_templates").delete().eq("id",i).eq("company_id",y.companyId).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(!y.isCurrent())return;if(a)throw a;if(!Array.isArray(c)||!c.some(d=>d.id===i))throw new Error("Procedure checklist was not deleted. Refresh and check your access before retrying.");let h=await e.withOperationTimeout(y.client.from("procedure_templates").select("id").eq("id",i).eq("company_id",y.companyId).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if(!y.isCurrent())return;if(h.error)throw new Error(`Procedure checklist delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(r){if(!y.isCurrent())return;let n=r.message||"Could not delete procedure.";e.showNotice(n,"warning"),P&&(P.textContent=n)}finally{o.delete(k),F($,y,"Permanently Delete")}}return{bindProcedureWorkflowEvents:L,createProcedureTemplate:m,seedSampleProcedure:A,createProcedureStep:_,loadProcedureDeleteBlockers:l,countProcedureLinkedRows:w,requestDeleteProcedureTemplate:q,deleteProcedureTemplate:M}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:t},typeof ye<"u"&&(ye.exports={createProcedureWorkflow:t})})()});var Me=oe((ot,ge)=>{(function(){function t(v,R){return v?.response_type==="checkbox"?R===!0||R==="checked"?"checked":"":String(R??"").trim()}function e(v,R){let o=t(v,R);return o?v?.response_type==="checkbox"?o==="checked":v?.response_type==="pass_fail"?o==="pass"||o==="fail":v?.response_type==="number"?Number.isFinite(Number(o)):!0:!1}let s={normalizeChecklistResponseValue:t,isChecklistStepAnswered:e};typeof window<"u"&&(window.MaintainOpsChecklistResponseValues=s),typeof ge<"u"&&(ge.exports=s)})()});var Ne=oe((st,be)=>{(function(){let{normalizeChecklistResponseValue:t,isChecklistStepAnswered:e}=window.MaintainOpsChecklistResponseValues||Me();function s(v={}){function R(E,N,T){if(!E.isConnected||E.dataset.workOrderId!==N||E.dataset.stepResult!==T)return;let u=v.getWorkOrders().find(w=>w.id===N);if(!u)return;let x=v.getProcedureTemplates().find(w=>w.id===u?.procedure_template_id);if(!x)return;let D=v.checklistProgress(u,x),F=v.requiredChecklistProgress(u,x),L=E.closest(".detail-stack"),m=L?.querySelector("[data-checklist-summary]"),A=L?.querySelector(".relationship-chip.procedure > span");m&&(m.textContent=`${D.done} of ${D.total} complete - required ${F.done}/${F.total}`),A&&(A.textContent=`${D.done}/${D.total}`);let _=E.closest(".checklist-step")?.querySelector("[data-checklist-recorded]"),l=v.getStepResultsByWorkOrder()[N]?.[T];_&&(_.textContent=l?.completed_at?`Recorded ${new Date(l.completed_at).toLocaleString()}`:"")}async function o(E){let N=E.target;if(N.disabled)return;let T=N.dataset.workOrderId,u=N.dataset.stepResult,x=v.getActiveCompanyId(),D=v.getSession()?.user?.id,F=v.getScope?.(),L=()=>v.getActiveCompanyId()===x&&v.getSession()?.user?.id===D&&v.getScope?.()===F,m=v.captureResponseDraft?.(N);N.disabled=!0;try{let A=v.getWorkOrders().find(k=>k.id===T),_=v.getProcedureTemplates().find(k=>k.id===A?.procedure_template_id),l=_?.procedure_steps?.find(k=>k.id===u);if(!x||!D||!A||!_||!l||A.company_id!==x||_.company_id!==x||l.company_id!==x||l.procedure_template_id!==_.id)throw new Error("This checklist step is no longer attached to this work order. Refresh and try again.");let w=t(l,l.response_type==="checkbox"?N.checked:N.value),q=e(l,w);if(l.response_type==="number"&&w&&!q)throw new Error("Enter a valid numeric reading.");if(l.response_type==="pass_fail"&&w&&!q)throw new Error("Choose Pass, Fail, or Not checked.");let{error:M}=await v.withOperationTimeout(v.upsertStepResult({company_id:x,work_order_id:T,procedure_step_id:u,completed_by:q?D:null,value:w,completed_at:q?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(M)throw M;if(v.clearResponseDraft?.(m),!L())return;let i=await v.withOperationTimeout(v.recordWorkOrderEvent(T,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(k=>({error:k}));if(!L())return;i?.error&&v.showNotice(`Checklist saved, but history did not update: ${i.error.message||i.error}`,"warning");let y=await v.withOperationTimeout(v.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(k=>k);if(!L())return;if(y){v.showNotice(`Checklist saved, but refresh did not finish: ${y.message||y}`,"warning");return}if(v.getWorkOrderActionWarningId()===T){let k=v.getWorkOrders().find(S=>S.id===T);k&&!v.blocksProcedureCompletion(k)&&v.setWorkOrderActionWarning("","")}R(N,T,u)}catch(A){L()&&v.showNotice(`Could not save checklist step: ${A.message||A}`,"warning")}finally{N.disabled=!1}}return{saveStepResult:o,normalizeChecklistResponseValue:t,isChecklistStepAnswered:e}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:s,normalizeChecklistResponseValue:t,isChecklistStepAnswered:e},typeof be<"u"&&(be.exports={createProcedureChecklistWorkflow:s,normalizeChecklistResponseValue:t,isChecklistStepAnswered:e})})()});var De=oe((it,ve)=>{(function(){function t(e){let s=e.escapeHtml,v=e.getDueState,R=e.procedureDeleteBlockerMessage,o=e.canDeleteOperationalRecords,E=e.canEditOperationalRecords||(()=>!0);function N(m,{count:A,rows:_,pagination:l,ready:w,assetOptions:q,procedureOptions:M,date:i}){let y=m==="pm";return`<section class="panel full-width">
        <div class="panel-header"><h2>${y?"Preventive Maintenance":"Procedure Checklists"}</h2><span>${w?`${A} shown`:"Unavailable"}</span></div>
        ${w?`${E()?y?u({assetOptions:q,procedureOptions:M,date:i}):T():""}
          <div class="${y?"pm":"procedure"}-list">${_.map(y?F:L).join("")||`<p class="muted">No ${y?"schedules":"procedure checklists"} match this search.</p>`}</div>
          ${l}`:`<p class="error-text" role="alert">${y?"PM schedules":"Procedure checklists"} could not be loaded. Try again.</p>`}
      </section>`}function T(){return`<form class="form-grid procedure-form relationship-detail procedure" id="create-procedure-form">
        <label>Procedure checklist name<input name="name" required placeholder="Monthly compressor inspection"></label>
        <label>Description<textarea name="description" rows="3" placeholder="Use this checklist when creating repeat work."></textarea></label>
        <p class="error-text" id="procedure-error"></p>
        <button class="secondary-button" type="submit">Add Checklist</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form>
      <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection checklist</button>`}function u({assetOptions:m,procedureOptions:A,date:_}){return`<form class="inline-form pm-form" id="create-pm-form" data-create-pm-form>
        <input name="title" required placeholder="Monthly compressor PM">
        <select name="asset_id" required data-location-sensitive-asset><option value="">Machine / equipment</option>${m}</select>
        <p class="error-text" data-asset-location-warning></p>
        <select name="frequency"><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option></select>
        <select name="procedure_template_id">${A}</select>
        <span class="date-picker-row inline-date-picker" data-date-picker-field>
          <input name="next_due_at" type="date" value="${s(_)}" required>
          <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
        </span>
        <p class="error-text" id="pm-error"></p>
        <button class="secondary-button" type="submit">Add Schedule</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form>`}function x(){return e.getPreventiveSchedules().filter(m=>e.matchesActiveLocation(m)&&e.matchesSearch([m.title,m.frequency,m.next_due_at,m.assets?.name]))}function D(){return e.getProcedureTemplates().filter(m=>e.matchesSearch([m.name,m.description,...(m.procedure_steps||[]).map(A=>A.prompt)]))}function F(m){let A=m.active===!1?null:v({due_at:m.next_due_at,status:"open"}),_=e.getPendingDeleteScheduleId()===m.id,l=E();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${s(m.frequency)}</span>
              ${m.active===!1?'<span class="chip">Inactive</span>':""}
              ${m.equipment_archive_paused?'<span class="chip">Equipment restored / PM needs review</span>':""}
              ${A?`<span class="chip ${A.className}">${A.label}</span>`:""}
            </div>
            <h3>${s(m.title)}</h3>
            <p>${s(m.assets?.name||"No equipment")} - Next due ${s(m.next_due_at)}</p>
          </div>
          ${l?`<div class="request-actions">
            ${m.equipment_archive_paused&&e.canManageEquipmentArchive?.()?`<button class="primary-button" data-resume-equipment-pm="${s(m.id)}" type="button">Review / Resume PM</button>`:""}
            <button class="secondary-button" data-generate-pm="${s(m.id)}" type="button" ${m.active===!1?"disabled":""}>Generate Work</button>
            ${o()?_?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${s(m.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${s(m.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
          <details data-pm-history="${s(m.id)}">
            <summary>Generated Work History</summary>
            <div class="mini-list" data-pm-history-content></div>
          </details>
        </article>
      `}function L(m){let A=e.getProcedureLinkCounts?.(m.id),_=A?.status==="ready"?Number(A.work_order_count):null,l=A?.status==="ready"?Number(A.schedule_count):null,w=R({workOrders:_,schedules:l}),q=e.getPendingDeleteProcedureId()===m.id,M=E();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${m.procedure_steps?.length||0} steps</span>
              <span class="chip" data-procedure-links="${s(m.id)}">${_===null?"Loading work links...":`${_} linked work orders`}</span>
              <span class="chip" data-procedure-schedules>${l===null?"Loading PM links...":`${l} PM schedules`}</span>
            </div>
            <h3>${s(m.name)}</h3>
            <p>${s(m.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(m.procedure_steps||[]).map(i=>`
              <div class="checklist-step">
                <span>${i.position}. ${s(i.prompt)}</span>
                <small>${s(i.response_type)} ${i.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${M&&e.canUseMaintenanceTools?.()!==!1?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${m.id}">
            <input name="prompt" required placeholder="Step prompt">
            <select name="response_type">
              <option value="checkbox">Checkbox</option>
              <option value="pass_fail">Pass / Fail</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
            </select>
            <select name="required">
              <option value="true">Required</option>
              <option value="false">Optional</option>
            </select>
            <p class="error-text" data-step-error="${m.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
            <button class="secondary-button" type="reset">Clear Form</button>
          </form>`:""}
          ${M&&o()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${w||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${s(m.id)}"></p>
              ${w?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:q?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${s(m.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${s(m.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${s(m.id)}" type="button" ${A?.status!=="ready"?"disabled":""}>${A?.status!=="ready"?"Checking Links...":"Delete Checklist"}</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:x,filteredProcedureTemplates:D,renderPreventiveSchedule:F,renderProcedureTemplate:L,renderPmCreateForm:u,renderProcedureCreateForm:T,renderPanel:N}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:t},typeof ve<"u"&&(ve.exports={createMaintenanceListDisplayHelpers:t})})()});var Ie=oe((ct,ke)=>{(function(){function t(e={}){let{renderCreateWorkOrder:s,parentAssetFor:v,childAssetsFor:R,escapeHtml:o,assetTypeLabel:E,renderParentAssetOptions:N,renderLocationOptions:T,renderAssetAreaOptions:u,assetStatusLabel:x,renderAssetMiniWorkOrder:D,assetDeleteBlockerMessage:F,canDeleteEquipment:L,canEditEquipmentRecords:m=()=>!0,renderEquipmentStructureGuide:A,renderProcedureOptions:_}=e;function l(){let $=new Date;return new Date($.getTime()-$.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function w(){return m()?`<form class="inline-form" id="create-asset-form">
        <input name="name" required placeholder="Machine or equipment name">
        <input name="asset_code" placeholder="Serial number">
        <input name="asset_tag" aria-label="Asset tag" placeholder="Asset tag (optional)">
        <input name="manufacturer" placeholder="Manufacturer">
        <input name="model" placeholder="Model">
        <select name="location_existing" aria-label="Area / spot"><option value="">No area / spot set</option>${u()}</select>
        <input name="location_new" placeholder="New area / spot">
        <select name="asset_type" aria-label="Equipment type">${e.ASSET_TYPE_OPTIONS.map($=>`<option value="${$}">${E($)}</option>`).join("")}</select>
        <p class="muted">Traveling Equipment is routinely shared between facilities. For a one-time move, keep the normal type and use Relocate Equipment.</p>
        <select name="parent_asset_id" aria-label="Part of equipment"><option value="">Top level equipment</option>${N()}</select>
        <select name="location_id" ${e.getLocations().length?"required":"disabled"}>${T()}</select>
        <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety device identification</label>
        <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
        <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form><p class="error-text" id="asset-create-error"></p>`:'<p class="muted">Accounting can view equipment here. Maintenance and admins manage operational equipment changes.</p>'}function q($,P,r){let n=P.some(d=>d.event_type==="created"),c=$.created_at&&!n?[{id:`${$.id}-created`,event_type:"created",summary:`${E($.asset_type)} created.`,actor_id:$.created_by||"",created_at:$.created_at}]:[];return{equipmentHistory:[...P,...c].sort((d,b)=>new Date(b.created_at||0)-new Date(d.created_at||0)),historyActorLabel:d=>d.actor_id&&r[d.actor_id]?.full_name?r[d.actor_id].full_name:d.actor_id?`User ${String(d.actor_id).slice(0,8)}`:d.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function M($,P){return $.map(r=>`
        <article>
          <strong>${o(String(r.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${r.created_at?new Date(r.created_at).toLocaleString():"time unavailable"} &middot; ${o(P(r))}</span>
          <p>${o(r.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function i(){let $=e.getAssets(),P=e.getActiveAssetId(),r=$.find(B=>B.id===P);if(!r)return s();let n=e.getAssetEventsReady?.()!==!1,c=e.getProfilesByUserId?.()||{},a=(e.getAssetEventsByAssetId?.()[r.id]||[]).sort((B,V)=>new Date(V.created_at||0)-new Date(B.created_at||0)),{equipmentHistory:h,historyActorLabel:d}=q(r,a,c),b=e.LIST_ITEMS_PER_PAGE||12,f=Math.max(1,Math.ceil(h.length/b)),g=Math.min(Math.max(1,e.getAssetRelationshipPage?.(r.id,"asset-history")||1),f),I=h.length?(g-1)*b+1:0,U=Math.min(h.length,g*b),C=h.slice((g-1)*b,g*b);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${o(r.name)} - ${h.length} event${h.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${o(r.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${n?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${M(C,d)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${h.length>b?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${o(r.id)}" type="button" ${g<=1?"disabled":""}>Previous</button>
                <span>Showing ${I}-${U} of ${h.length} - Page ${g} of ${f}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${o(r.id)}" type="button" ${g>=f?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function y(){let $=e.getAssets(),P=e.getActiveAssetId(),r=$.find(p=>p.id===P);if(!r)return s();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(r.id);let n=e.getWorkOrders(),c=e.getPreventiveSchedules(),a=e.getParts(),h=e.getAssetParts(),d=e.getAssetPartsReady(),b=e.getAssetDocumentsByAssetId?.()[r.id]||[],f=e.getAssetDocumentsReady?.()!==!1,g=e.getAssetEventsReady?.()!==!1,I=e.getProfilesByUserId?.()||{},U=e.getPartsUsedByWorkOrder(),C=e.getLocations(),B=e.getActiveLocationId(),V=e.ASSET_TYPE_OPTIONS||[],Y=v(r),J=R(r.id),ue=n.filter(p=>p.asset_id===r.id),z=e.getAssetWorkHistory?.(r.id),K=!z||z.historyStatus==="ready",ae=z?z.rows:ue,se=z?.historyStatus==="error"?'<p class="error-text" role="alert">Could not load work history.</p>':'<p class="muted" role="status">Loading work history...</p>',Z=ae.filter(p=>p.status!=="completed").sort((p,H)=>new Date(H.created_at||0)-new Date(p.created_at||0)),ne=ae.filter(p=>p.status==="completed").sort((p,H)=>new Date(H.completed_at||H.created_at||0)-new Date(p.completed_at||p.created_at||0)),O=c.filter(p=>p.asset_id===r.id),j=Object.values(U).flat().filter(p=>ue.some(H=>H.id===p.work_order_id)),W=h.filter(p=>p.asset_id===r.id),X=new Set(W.map(p=>p.part_id)),me=a.filter(p=>!X.has(p.id)),Ue=(e.getAssetEventsByAssetId?.()[r.id]||[]).sort((p,H)=>new Date(H.created_at||0)-new Date(p.created_at||0)),{equipmentHistory:qe}=q(r,Ue,I),ie=(p,H)=>z?z.countsStatus==="ready"?z.counts[p]:z.countsStatus==="error"?"Unavailable":"Loading...":H,he=p=>`data-asset-work-count="${o(r.id)}" data-work-count-kind="${p}"`,te=e.LIST_ITEMS_PER_PAGE||12,Q=p=>e.getAssetRelationshipOpen?.(r.id,p)||!1,Se=(p,H)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(r.id,p)||1),Math.max(1,Math.ceil(H/te))),ce=(p,H)=>{let ee=Se(H,p.length);return p.slice((ee-1)*te,ee*te)},le=(p,H)=>{if(H<=te)return"";let ee=Se(p,H),xe=Math.max(1,Math.ceil(H/te)),Ve=(ee-1)*te+1,ze=Math.min(H,ee*te);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${o(r.id)}" data-asset-relation-section="${o(p)}" type="button" ${ee<=1?"disabled":""}>Previous</button>
            <span>Showing ${Ve}-${ze} of ${H} - Page ${ee} of ${xe}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${o(r.id)}" data-asset-relation-section="${o(p)}" type="button" ${ee>=xe?"disabled":""}>Next</button>
          </div>
        `},Ce=p=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${o(p)}" data-asset-id="${o(r.id)}" ${Q(p)?"open":""}`,Ee=C.find(p=>p.id===r.location_id)?.name||r.location||"No location set",je=Y?Y.name:"Top level equipment",He=r.status==="offline"?"status-blocked":r.status==="degraded"?"status-open":r.status==="watch"?"status-in_progress":"status-completed",Be=r.status==="degraded"&&ie("open",Z.length)===0,G=m(),re=r.asset_type==="traveling_machine";return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${r.status}">${o(x(r.status))}</span>
              <span class="chip">${o(E(r.asset_type))}</span>
              ${r.asset_code?`<span class="chip">${o(r.asset_code)}</span>`:""}
              ${r.asset_tag?`<span class="chip">Asset tag: ${o(r.asset_tag)}</span>`:""}
              ${r.manufacturer?`<span class="chip">${o(r.manufacturer)}</span>`:""}
              ${r.model?`<span class="chip">${o(r.model)}</span>`:""}
              ${r.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${o(r.name)}</h2>
            <p>${o(r.location||"No area / spot set")}</p>
            ${Y?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${o(Y.id)}" type="button">${o(Y.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${He}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${o(x(r.status))}</strong>
              <small>${r.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${o(Ee)}</strong>
              <small>${r.location?o(r.location):"No area / spot set"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${o(je)}</strong>
              <small>${Y?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${J.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${J.length}</strong>
              <small>${J.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${W.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${W.length}</strong>
              <small>${W.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${ie("open",Z.length)===0?"empty":""}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong ${he("open")}>${ie("open",Z.length)}</strong>
              <small>Active work tied to this equipment</small>
            </button>
            <button class="command-card command-photo ${b.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${b.length}</strong>
              <small>${b.length?"Machine files on record":"No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${Be&&G?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${o(r.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${A?A():""}

          ${G?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${r.id}" type="button">Quick Fix for this equipment</button>
            ${!re&&e.canRelocateEquipment?.()?`<details class="equipment-actions"><summary>Actions</summary><button class="secondary-button" data-relocate-equipment="${o(r.id)}" type="button">Relocate Equipment</button></details>`:""}
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${b.length} file${b.length===1?"":"s"}</span>
            </div>
            ${G?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${o(r.id)}">
              <label>Attach photos or files<input name="document" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <p class="error-text" data-asset-document-error="${o(r.id)}">${f?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${f?"":"disabled"}>Review Attachments</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${b.map(p=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(p.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(p.content_type||"").startsWith("image/")&&p.signedUrl?`<img src="${o(p.signedUrl)}" alt="${o(p.original_file_name||p.file_name||r.name)}">`:`<strong>${o(S(p.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${o(S(p.document_type))}</strong>
                      <span>${o(p.original_file_name||p.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(p.content_type||"").startsWith("image/")&&p.signedUrl?`<img src="${o(p.signedUrl)}" alt="${o(p.original_file_name||p.file_name||r.name)}">`:`<div class="asset-file-document-preview">${o(S(p.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${o(p.content_type||"file")}</span>
                      <a class="secondary-button" href="${o(p.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${G?`<button class="text-button danger-link" data-delete-asset-document="${o(p.id)}" data-asset-document-path="${o(p.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${re&&G?`<form class="form-grid relationship-detail asset asset-move" id="move-traveling-asset-form"
            data-asset-id="${o(r.id)}" data-company-id="${o(r.company_id)}" data-from-location="${o(r.location_id||"")}" data-travel-revision="${Number(r.traveling_revision||0)}">
            <h3>Change current facility</h3>
            <p>Currently at ${o(Ee)}. All work history, part links, files and financials stay with this machine. Existing orders keep their original facility and assigned person. Warehouse stock stays at its current facility.</p>
            <label>New facility<select name="destination_id" required>
              <option value="">Choose facility</option>
              ${C.filter(p=>p.id!==r.location_id).map(p=>`<option value="${o(p.id)}">${o(p.name)}</option>`).join("")}
            </select></label>
            <button class="secondary-button" type="submit">Change location</button>
            <p class="error-text" role="alert" data-transfer-error></p>
          </form>`:""}
          ${G?`<form class="form-grid" id="edit-asset-form" data-travel-revision="${Number(r.traveling_revision||0)}">
            <label>Equipment name<input name="name" required value="${o(r.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${o(r.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${o(r.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${o(r.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${o(r.model||"")}"></label>
            <label>Type
              <select name="asset_type" ${re&&!e.canRelocateEquipment?.()?"disabled":""}>
                ${V.filter(p=>p!=="traveling_machine"||re||e.canRelocateEquipment?.()).map(p=>`<option value="${p}" ${p===(r.asset_type||"machine")?"selected":""}>${E(p)}</option>`).join("")}
              </select>
              <span class="muted">Traveling Equipment is for routine sharing, not a one-time relocation.</span>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id" ${re?"disabled":""}>
                <option value="">Top level equipment</option>
                ${N(r.parent_asset_id||"",r.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" disabled>
                ${T(r.location_id||B)}
              </select>
              <span class="muted">${re?"Use Change current facility above.":e.canRelocateEquipment?.()?"Actions: Relocate Equipment.":"A manager or admin can relocate this equipment."}</span>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">No area / spot set</option>
                ${u(r.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(p=>`<option value="${p}" ${p===r.status?"selected":""}>${x(p)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${r.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${J.map(p=>`
                <article class="mini-work-order" data-open-asset="${o(p.id)}">
                  <strong>${o(p.name)}</strong>
                  <span>${o(E(p.asset_type))} - ${o(x(p.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${Ce("open-work")} id="asset-open-work-target">
            <summary>Open Work <span ${he("open")}>${ie("open",Z.length)}</span></summary>
            <div class="mini-list">
              ${Q("open-work")?K?ce(Z,"open-work").map(D).join("")||'<p class="muted">No open work for this equipment.</p>':se:'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${Q("open-work")&&K?le("open-work",Z.length):""}
          </details>

          <details ${Ce("completed-history")}>
            <summary>Completed History <span ${he("completed")}>${ie("completed",ne.length)}</span></summary>
            <div class="mini-list">
              ${Q("completed-history")?K?ce(ne,"completed-history").map(D).join("")||'<p class="muted">No completed work yet.</p>':se:'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${Q("completed-history")&&K?le("completed-history",ne.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${qe.length} event${qe.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${o(r.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${g?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure" data-asset-pm-schedules="${o(r.id)}">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${e.getSchedulesReady?.()===!1?"Unavailable":`${O.length} schedule${O.length===1?"":"s"}`}</span>
                ${G?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${G&&e.canCreatePreventiveSchedule?.()===!1?e.renderMaintenanceLoading():""}
            ${G&&e.canCreatePreventiveSchedule?.()!==!1?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${o(r.id)}">
              <input name="title" required placeholder="PM for ${o(r.name)}">
              <input name="asset_id" type="hidden" value="${o(r.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${_?_():'<option value="">No procedure checklist</option>'}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${l()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
              <button class="secondary-button" type="reset">Clear Form</button>
            </form>`:""}
            <div class="mini-list">
              ${e.getSchedulesReady?.()===!1?'<p class="error-text" role="alert">PM schedules could not be loaded.</p>':ce(O,"pm-schedules").map(p=>`<article><strong>${o(p.title)}</strong><span>${o(p.frequency||"")} - next due ${o(p.next_due_at||"")}</span>${p.active===!1?'<span class="chip">Inactive</span>':""}</article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
            ${le("pm-schedules",O.length)}
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${o(r.id)}" ${Q("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${W.length}</span></summary>
            <div class="panel-header compact">
              ${G?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${d?`
              ${G?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${o(r.id)}">
                <label>Part
                  <select name="part_id" ${me.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${me.map(p=>`<option value="${o(p.id)}">${o(p.name)}${p.sku?` - ${o(p.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${me.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${o(r.id)}"></p>
              <div class="mini-list">
                ${ce(W,"linked-parts").map(p=>`<article>
                  <strong>${o(p.parts?.name||"Part")}</strong>
                  <span>${o(p.parts?.sku||"No SKU")} - recommended qty ${o(p.quantity_recommended||1)}${p.note?` - ${o(p.note)}`:""}</span>
                  ${G?`<button class="text-button danger-link" data-remove-asset-part="${o(p.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${le("linked-parts",W.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${o(r.id)}" ${Q("parts-used")?"open":""}>
            <summary>Parts Used History <span>${K?j.length:"Not loaded"}</span></summary>
            <div class="mini-list">
              ${Q("parts-used")?K?ce(j,"parts-used").map(p=>`<article><strong>${o(p.parts?.name||"Part")}</strong><span>${p.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':se:'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${Q("parts-used")&&K?le("parts-used",j.length):""}
          </details>

          ${G?k(r):""}
        </div>
      `}function k($){return L()?`<section class="delete-zone asset-delete-zone"><div><h3>Archive / Delete Equipment</h3>
        <p>Remove this equipment from normal workflow. History, files and financial records are retained. A manager or admin can restore it.</p></div>
        <button class="danger-action-button large-delete-button" data-archive-equipment="${o($.id)}" type="button">Archive / Delete Equipment</button></section>`:""}function S($){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[$]||"File"}return{renderAssetDetail:y,renderAssetHistoryScreen:i,renderCreateAssetForm:w}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:t},typeof ke<"u"&&(ke.exports={createAssetDetailDisplayHelpers:t})})()});var mt=de(Ae()),ht=de(Re()),ft=de(Ne()),yt=de(De()),gt=de(Ie());var Ze={running:"Running",watch:"Watch",degraded:"Degraded",offline:"Offline / Down"};function Oe(t){let e=t.documentRef,s=t.escapeHtml,v,R,o;function E(){v&&(v.close(),v.remove(),v=null),R?.isConnected&&R.focus(),R=null}function N(x){return[...x?.elements||[]].some(D=>!D.disabled&&(D.type==="checkbox"?D.checked!==D.defaultChecked:D.tagName==="SELECT"?D.selectedIndex!==Math.max(0,[...D.options].findIndex(F=>F.defaultSelected)):["INPUT","TEXTAREA"].includes(D.tagName)&&D.value!==D.defaultValue))}async function T(x,D){if(!t.canRelocate())return;if(N(e.querySelector("#edit-asset-form"))){t.showNotice("Save equipment edits before relocating.","warning");return}E(),R=D,o=t.getContext();let F=t.getCompanyId(),L=o;v=e.createElement("dialog"),v.className="travel-dialog relocation-dialog",v.setAttribute("aria-labelledby","relocation-heading");let m=v,A,_=new Set,l="",w=1,q=!1,M=!1,i=()=>v===m&&L===t.getContext()&&t.canRelocate(),y=()=>A.nodes.find(f=>f.id===x),k=()=>A.nodes.filter(f=>f.parent_asset_id===x).sort((f,g)=>f.name.localeCompare(g.name)||f.id.localeCompare(g.id)),S=()=>A.nodes.filter(f=>f.id===x||_.has(f.branch_id)),$=()=>A.nodes.filter(f=>f.id!==x&&!_.has(f.branch_id)),P='<h2 id="relocation-heading">Relocate Equipment</h2>',r='<button type="button" class="secondary-button" data-relocate-cancel>Cancel</button>',n=f=>`<ul class="relocation-names">${f.map(g=>`<li>${s(g.name)}</li>`).join("")}</ul>`;function c(f){m.innerHTML=`${P}${f}`,m.querySelector("[data-relocate-cancel]")?.addEventListener("click",()=>{q||E()})}function a(){if(!i()){E();return}let f=k(),g=Math.max(1,Math.ceil(f.length/12));w=Math.min(w,g);let I=y();c(`<h3>${s(I.name)}</h3><p class="muted">Current facility: <strong class="asset-facility">${s(I.facility||"Unassigned")}</strong> / ${s(Ze[I.status]||I.status)}</p>
        <form data-relocate-form><label for="relocation-destination">New facility</label><select id="relocation-destination" required><option value="">Choose facility</option>${t.getLocations().filter(C=>C.id!==I.location_id).map(C=>`<option value="${s(C.id)}" ${l===C.id?"selected":""}>${s(C.name)}</option>`).join("")}</select>
        <fieldset class="relocation-branches"><legend>Attached equipment to move</legend>${f.length?f.slice((w-1)*12,w*12).map(C=>{let B=A.nodes.filter(V=>V.branch_id===C.id&&V.id!==C.id);return`<div class="relocation-branch"><label class="relocation-choice"><input type="checkbox" data-relocate-branch="${s(C.id)}" ${_.has(C.id)?"checked":""}><span>${s(C.name)}${B.length?`<small>Plus ${B.length} attached record${B.length===1?"":"s"}</small>`:""}</span></label>${B.length?`<details><summary>Attached records</summary>${n(B)}</details>`:""}</div>`}).join(""):'<p class="muted">No attached equipment.</p>'}</fieldset>
        ${g>1?`<nav class="travel-pagination" aria-label="Attached equipment pages"><button type="button" class="secondary-button" data-relocate-page="-1" ${w===1?"disabled":""}>Previous</button><span>${w} / ${g}</span><button type="button" class="secondary-button" data-relocate-page="1" ${w===g?"disabled":""}>Next</button></nav>`:""}
        <p class="relocation-impact" data-relocate-impact></p><p class="muted">Unchecked branches stay at their current facility and are detached from this equipment, with history recorded.</p>
        ${A.parent?`<p class="relocation-impact">${s(I.name)} will be detached from ${s(A.parent.name)}.</p>`:""}
        <p class="muted">Condition, history, files, part links and financial records are retained. Existing work orders and stock keep their facilities. PM follows the equipment. Area / spot is cleared for moved equipment.</p>
        <div class="travel-dialog-actions">${r}<button type="submit" class="primary-button">Review Relocation</button></div></form>`);let U=()=>{m.querySelector("[data-relocate-impact]").textContent=`${S().length} moving / ${$().length} staying`};U(),m.querySelector("#relocation-destination").onchange=C=>{l=C.target.value},m.querySelectorAll("[data-relocate-branch]").forEach(C=>{C.onchange=()=>{C.checked?_.add(C.dataset.relocateBranch):_.delete(C.dataset.relocateBranch),U()}}),m.querySelectorAll("[data-relocate-page]").forEach(C=>{C.onclick=()=>{w+=Number(C.dataset.relocatePage),a()}}),m.querySelector("form").onsubmit=C=>{C.preventDefault(),i()&&l&&h()},m.querySelector("#relocation-destination").focus()}function h(){let f=t.getLocations().find(g=>g.id===l);!f||!i()||(c(`<h3>${s(y().name)}</h3><p>Relocate from <strong>${s(y().facility||"Unassigned")}</strong> to <strong class="asset-facility">${s(f.name)}</strong>?</p>
        <section><h3>Moving (${S().length})</h3>${n(S())}</section>
        ${$().length?`<section><h3>Staying (${$().length})</h3>${n($())}<p class="relocation-impact">${k().filter(g=>!_.has(g.id)).map(g=>s(g.name)).join(", ")} will be detached from ${s(y().name)}. Their own attached records stay linked.</p></section>`:""}
        ${A.parent?`<p class="relocation-impact">${s(y().name)} will be detached from ${s(A.parent.name)}.</p>`:""}
        <p class="muted">These changes are recorded in equipment history. Existing work orders, stock and financial records will not be relocated. Condition is unchanged.</p>
        <p role="alert" data-relocate-error></p><div class="travel-dialog-actions">${r}<button type="button" class="secondary-button" data-relocate-back>Back</button><button type="button" class="primary-button" data-relocate-save>Relocate Equipment</button></div><button type="button" class="secondary-button" data-relocate-retry hidden>Review Again</button>`),m.querySelector("[data-relocate-back]").onclick=a,m.querySelector("[data-relocate-retry]").onclick=b,m.querySelector("[data-relocate-save]").onclick=d,m.querySelector("[data-relocate-back]").focus())}async function d(){if(q||M||!i())return;q=!0,m.querySelectorAll("button").forEach(g=>{g.disabled=!0});let f=m.querySelector("[data-relocate-error]");f.textContent="Saving relocation...";try{let g=await t.timeout(t.client().rpc("relocate_equipment",{p_company_id:F,p_asset_id:x,p_location_id:l,p_move_branch_ids:[..._],p_review_token:A.token}),"The response timed out. Review again to check whether the relocation completed.",15e3);if(!i())return;if(g.error)throw g.error;if(!Array.isArray(g.data?.assets)||!Array.isArray(g.data?.events))throw Error("Could not verify the result. Review again before retrying.");q=!1,E(),t.onSaved(g.data),t.showNotice("Equipment relocated. History and linked records retained.")}catch(g){if(!i())return;M=!0,f.textContent=g.message||"Could not relocate equipment. Review again before retrying.",m.querySelector("[data-relocate-retry]").hidden=!1}finally{q=!1,i()&&m.querySelectorAll("button").forEach(g=>{g.disabled=g.hasAttribute("data-relocate-save")||g.hasAttribute("data-relocate-back")})}}async function b(){if(i()){q=!1,M=!1,l="",w=1,c(`<p role="status">Loading equipment and attached records...</p>${r}`);try{let f=await t.timeout(t.client().rpc("equipment_relocation_review",{p_company_id:F,p_asset_id:x}),"Equipment review took too long. Try again.",15e3);if(!i())return;if(f.error)throw f.error;if(!Array.isArray(f.data?.nodes)||!f.data.nodes.some(g=>g.id===x)||!f.data.token)throw Error("Could not verify the equipment hierarchy.");A=f.data,_=new Set(k().map(g=>g.id)),a()}catch(f){if(!i())return;c(`<p role="alert">${s(f.message||"Equipment review failed.")}</p><div class="travel-dialog-actions">${r}<button type="button" class="secondary-button" data-relocate-retry>Review Again</button></div>`),m.querySelector("[data-relocate-retry]").onclick=b}}}m.addEventListener("cancel",f=>{f.preventDefault(),q||E()}),e.body.append(m),m.showModal(),await b()}function u(){v&&o!==t.getContext()&&E(),e.querySelectorAll("[data-relocate-equipment]").forEach(x=>{x.onclick=()=>T(x.dataset.relocateEquipment,x)})}return{bind:u,dispose:E}}var pe={sold:"Sold",scrapped:"Scrapped",delete:"Delete",other:"Other"},et={work:"Work History",events:"Equipment History",files:"Files",parts:"Parts",pm:"PM"},tt={work:["work_orders","id,title,status,completed_at,created_at","created_at"],events:["asset_events","id,actor_id,summary,created_at","created_at"],files:["asset_documents","id,file_name,storage_path,created_at","created_at"],parts:["asset_parts","id,note,quantity_recommended,parts(name,sku),created_at","created_at"],pm:["preventive_schedules","id,title,active,equipment_archive_paused,next_due_at,created_at","created_at"]};async function we(t,e,s,v){let R=[...new Set([...s.archived_ids||[],...s.restored_ids||[],...s.detached_ids||[]])],o={ids:R,assets:[],schedules:[],financials:[]};if(!R.length)return o;for(let[E,N,T,u]of[["assets","assets","*","id"],["schedules","preventive_schedules","*, assets(name, location_id, asset_type, archived_at)","asset_id"],["financials","asset_financials","*, assets(*)","asset_id"]]){let x=await v(window.MaintainOpsMaintenanceWorkspaceRows.loadCompleteWorkspaceRows("Retained equipment records",()=>t.from(N).select(T,{count:"exact"}).eq("company_id",e).in(u,R).order("id")),"Saved, but current records could not load. Reopen this screen.",15e3);if(x.error)throw x.error;o[E]=x.data||[]}return o}function Te(t){let e=t.documentRef,s=t.escapeHtml,v,R,o,E=0,N=!1,T=`${t.getCompanyContext?.()||t.getCompanyId()}`,u={page:1,query:"",location:"",data:null,record:null,section:"work",relatedPage:1,related:null,loading:!1,error:""},x=n=>t.getLocations().find(c=>c.id===n)?.name||"Unassigned",D=n=>n?new Date(n).toLocaleDateString():"";async function F(n){if(t.onSaved)return t.onSaved(n);let c=t.getCompanyId(),a=t.getCompanyContext(),h=t.getContext(),d=new Set(n.archived_ids||[]),b=t.getData();t.setData({...b,assets:b.assets.filter(C=>!d.has(C.id)),workOrders:b.workOrders.map(C=>d.has(C.asset_id)?{...C,assets:{...C.assets,archived_at:new Date().toISOString()}}:C),preventiveSchedules:b.preventiveSchedules.filter(C=>!d.has(C.asset_id))});let f;try{f=await we(t.client(),c,n,t.timeout)}catch(C){throw a===t.getCompanyContext()&&h===t.getContext()&&t.onChanged(d),C}if(a!==t.getCompanyContext())return;let g=t.getData(),I=new Set(f.ids),U=new Map(f.assets.map(C=>[C.id,C]));t.setData({assets:[...g.assets.filter(C=>!I.has(C.id)),...f.assets.filter(C=>!C.archived_at)],workOrders:g.workOrders.map(C=>U.has(C.asset_id)?{...C,assets:{...C.assets,name:U.get(C.asset_id).name,archived_at:U.get(C.asset_id).archived_at}}:C),preventiveSchedules:[...g.preventiveSchedules.filter(C=>!I.has(C.asset_id)),...f.schedules.filter(C=>!C.assets?.archived_at)].map(C=>C.id===n.resumed_schedule?.id?{...C,...n.resumed_schedule}:C),assetFinancials:[...g.assetFinancials.filter(C=>!I.has(C.asset_id)),...f.financials]}),h===t.getContext()&&t.onChanged(d)}let L=async(n,c)=>{let a=await t.timeout(t.client().rpc(n,{p_company_id:t.getCompanyId(),...c}),"The response timed out. Review again before retrying.",15e3);if(a.error)throw a.error;return a.data};function m(){E++,v&&(v.close(),v.remove(),v=null),R?.isConnected&&R.focus(),R=null}function A(){m(),u={page:1,query:"",location:"",data:null,record:null,section:"work",relatedPage:1,related:null,loading:!1,error:""}}function _(){let n=`${t.getCompanyContext?.()||t.getCompanyId()}`;n!==T&&(A(),T=n)}async function l(){if(!t.canManage())return;let n=++E,c=t.getContext();u.loading=!0,u.error="",t.redraw();try{let a=await L("list_archived_equipment",{p_page:u.page,p_query:u.query,p_location_id:u.location||null});if(n!==E||c!==t.getContext()||!t.isVisible())return;if(!Array.isArray(a?.rows)||!Number.isSafeInteger(a.total))throw Error("Could not verify archived equipment.");u.data=a,u.page=a.page}catch(a){n===E&&(u.error=a.message||"Could not load archived equipment.")}finally{n===E&&(u.loading=!1,t.redraw())}}async function w(){_(),t.canManage()&&(t.enter(),u.record=null,u.related=null,await l())}async function q(n){if(_(),!t.canManage())return;t.enter();let c=++E,a=t.getContext();u.loading=!0,u.error="",t.redraw();try{let h=await t.timeout(t.client().from("assets").select("*").eq("company_id",t.getCompanyId()).eq("id",n).not("archived_at","is",null).single(),"Equipment took too long to load.",15e3);if(c!==E||a!==t.getContext()||!t.isVisible())return;if(h.error)throw h.error;u.record=h.data,u.section="work",u.relatedPage=1,await M()}catch(h){c===E&&(u.error=h.message,u.loading=!1,t.redraw())}}async function M(){let n=++E,c=t.getContext(),a=u.record;if(!(!a||!t.canManage())){u.loading=!0,u.related=null,u.error="",t.redraw();try{let[h,d,b]=tt[u.section],f=await t.timeout(t.client().from(h).select(d,{count:"exact"}).eq("company_id",t.getCompanyId()).eq("asset_id",a.id).order(b,{ascending:!1}).order("id").range((u.relatedPage-1)*12,u.relatedPage*12-1),"History took too long to load.",15e3);if(f.error)throw f.error;if(!Number.isSafeInteger(f.count))throw Error("Could not verify the history count.");if(u.section==="files"&&f.data.length){let g=await t.timeout(t.client().storage.from("asset-documents").createSignedUrls(f.data.map(I=>I.storage_path),300),"File links took too long to load.",15e3);if(g.error)throw g.error;for(let I of f.data)I.url=g.data.find(U=>U.path===I.storage_path)?.signedUrl}if(n!==E||c!==t.getContext()||!t.isVisible())return;u.related={rows:f.data,total:f.count}}catch(h){n===E&&(u.error=h.message||"Could not load history.")}finally{n===E&&(u.loading=!1,t.redraw())}}}let i=(n,c,a)=>c>12?`<nav class="travel-pagination" aria-label="${a==="list"?"Archived equipment":"History"} pages"><button class="secondary-button" data-archive-page="${a}:-1" ${n<=1?"disabled":""}>Previous</button><span>${n} / ${Math.max(1,Math.ceil(c/12))}</span><button class="secondary-button" data-archive-page="${a}:1" ${n*12>=c?"disabled":""}>Next</button></nav>`:"";function y(n){return u.section==="work"?`<button class="secondary-button archive-history-link" data-archive-work="${s(n.id)}"><strong>${s(n.title)}</strong><span>${s(n.status)} ${s(D(n.completed_at))}</span></button>`:u.section==="files"?n.url&&/^https:\/\//.test(n.url)?`<a class="archive-history-link" href="${s(n.url)}" target="_blank" rel="noopener noreferrer">${s(n.file_name)}</a>`:`<p>${s(n.file_name)} (link unavailable)</p>`:u.section==="events"?`<div class="archive-history-row"><strong>${s(t.getMemberName(n.actor_id))}</strong><time>${s(D(n.created_at))}</time><p>${s(n.summary)}</p></div>`:u.section==="parts"?`<div class="archive-history-row"><strong>${s(n.parts?.name||"Part")}</strong><span>${s(n.parts?.sku||"")} / Recommended ${s(n.quantity_recommended)}</span><p>${s(n.note||"")}</p></div>`:`<div class="archive-history-row"><strong>${s(n.title)}</strong><span>${n.equipment_archive_paused?"Paused by equipment archive":"Inactive"} / Last scheduled due ${s(n.next_due_at)}</span></div>`}function k(){if(_(),!t.canManage())return"";let n=u.record;return`<div class="equipment-archive"><div class="panel-header"><h2>${n?s(n.name):"Archived Equipment"}</h2><button class="secondary-button" data-archive-back>${n?"Back to Archived Equipment":"Back to Equipment"}</button></div>
      ${n?`<div class="archive-retained-banner"><strong>Archived / ${s(pe[n.archive_reason]||n.archive_reason)}</strong><span>${s(D(n.archived_at))} / ${s(x(n.location_id))} / ${s(n.status)}</span><p>${s(n.archive_notes||"")}</p></div>
        <div class="button-row"><button class="primary-button" data-restore-equipment="${s(n.id)}">Restore Equipment</button><button class="secondary-button" data-archive-financial="${s(n.id)}">Financial Record</button></div>
        <dl class="archive-metadata"><div><dt>Serial number</dt><dd>${s(n.asset_code||"Not set")}</dd></div><div><dt>Asset tag</dt><dd>${s(n.asset_tag||"Not set")}</dd></div><div><dt>Manufacturer / model</dt><dd>${s([n.manufacturer,n.model].filter(Boolean).join(" / ")||"Not set")}</dd></div></dl>
        <div class="button-row archive-sections" role="tablist" aria-label="Retained equipment records">${Object.entries(et).map(([c,a])=>`<button class="secondary-button" role="tab" aria-selected="${u.section===c}" data-archive-section="${c}">${a}</button>`).join("")}</div>`:`
        <form class="archive-filters"><label>Search archived equipment<input name="query" maxlength="200" value="${s(u.query)}" type="search"></label><label>Facility<select name="location"><option value="">All facilities</option>${t.getLocations().map(c=>`<option value="${s(c.id)}" ${c.id===u.location?"selected":""}>${s(c.name)}</option>`).join("")}</select></label><button class="secondary-button" type="submit">Filter</button></form>`}
      ${u.error?`<p role="alert">${s(u.error)}</p><button class="secondary-button" data-archive-retry>Retry</button>`:u.loading?'<p role="status">Loading retained records...</p>':n?`
        <div class="archive-history">${u.related?.rows.map(y).join("")||'<p class="muted">No records.</p>'}</div>${i(u.relatedPage,u.related?.total||0,"related")}`:`
        <p class="muted">${u.data?.total||0} archived equipment records</p><div class="archive-list">${u.data?.rows.map(c=>`<article class="archive-card"><div class="archive-retained-banner">Archived / ${s(pe[c.archive_reason]||c.archive_reason)}</div><h3>${s(c.name)}</h3><p class="asset-facility">${s(c.facility||"Unassigned")}</p><p>${s(c.status)} / ${s(D(c.archived_at))}</p><div class="button-row"><button class="secondary-button" data-archive-record="${s(c.id)}">View Record</button><button class="primary-button" data-restore-equipment="${s(c.id)}">Restore</button></div></article>`).join("")||'<p class="muted">No archived equipment.</p>'}</div>${i(u.page,u.data?.total||0,"list")}`}
    </div>`}function S(){return[...e.querySelector("#edit-asset-form")?.elements||[]].some(n=>!n.disabled&&(n.type==="checkbox"?n.checked!==n.defaultChecked:n.tagName==="SELECT"?n.selectedIndex!==Math.max(0,[...n.options].findIndex(c=>c.defaultSelected)):["INPUT","TEXTAREA"].includes(n.tagName)&&n.value!==n.defaultValue))}async function $(n,c=!1,a){if(_(),!t.canManage())return;if(S()){t.showNotice("Save equipment edits before removing it.","warning");return}m(),R=a,o=t.getContext();let h=o,d=T;v=e.createElement("dialog"),v.className="travel-dialog relocation-dialog equipment-archive-dialog",v.setAttribute("aria-labelledby","equipment-archive-title");let b=v,f,g=!1,I=new Set,U="",C="",B=1,V=()=>v===b&&h===t.getContext()&&t.canManage(),Y='<button class="secondary-button" type="button" data-archive-cancel>Cancel</button>',J=()=>f.nodes.find(O=>O.id===n),ue=()=>f.nodes.filter(O=>c||O.id===n||I.has(O.branch_id)),z=O=>`<ul class="relocation-names">${O.map(j=>`<li>${s(j.name||j.title)}</li>`).join("")}</ul>`;function K(O){b.innerHTML=`<h2 id="equipment-archive-title">${c?"Restore Equipment":"Archive / Delete Equipment"}</h2>${O}`,b.querySelector("[data-archive-cancel]")?.addEventListener("click",()=>{g||m()})}function ae(){let O=f.nodes.filter(W=>W.parent_asset_id===n);K(`<h3>${s(J().name)}</h3><p><strong class="asset-facility">${s(x(J().location_id))}</strong> / ${s(J().status)}</p><form data-archive-action-form>
        ${c?`<p>Restore ${f.nodes.length} record${f.nodes.length===1?"":"s"} to workflow. Condition and facility stay unchanged. PM remains paused until its next due date is reviewed.</p>${z(f.nodes)}`:`
          <label>Reason<select name="reason" required><option value="">Choose reason</option>${Object.entries(pe).map(([W,X])=>`<option value="${W}" ${U===W?"selected":""}>${X}</option>`).join("")}</select></label>
          ${O.length?`<fieldset class="relocation-branches"><legend>Also archive attached equipment</legend>${O.slice((B-1)*12,B*12).map(W=>`<label class="relocation-choice"><input type="checkbox" data-archive-branch="${s(W.id)}" ${I.has(W.id)?"checked":""}><span>${s(W.name)}<small>${f.nodes.filter(X=>X.branch_id===W.id).length} record(s), including attached equipment</small></span></label>`).join("")}</fieldset>${O.length>12?`<div class="button-row"><button type="button" data-branch-page="-1" ${B===1?"disabled":""}>Previous</button><span>${B} / ${Math.ceil(O.length/12)}</span><button type="button" data-branch-page="1" ${B*12>=O.length?"disabled":""}>Next</button></div>`:""}<p>Unchecked branches stay active and detach from this equipment. Each separation is recorded in history.</p>`:""}
          ${f.parent?`<p>This equipment will detach from ${s(f.parent.name)}. Restoration will not automatically reattach it.</p>`:""}
          <p>Removed equipment leaves normal workflow. Its history, files, part links and financial record stay intact. PM is paused. A manager or admin can restore it.</p>`}
        <label>${c?"Restoration note":"Notes"}<textarea name="notes" maxlength="2000" rows="3" ${c||U==="other"?"required":""}>${s(C)}</textarea></label>
        <div class="travel-dialog-actions">${Y}<button class="primary-button" type="submit">Review ${c?"Restoration":"Removal"}</button></div></form>`);let j=b.querySelector("form");j.oninput=()=>{U=j.elements.reason?.value||"",C=j.elements.notes.value,j.elements.notes.required=c||U==="other"},b.querySelectorAll("[data-archive-branch]").forEach(W=>{W.onchange=()=>W.checked?I.add(W.dataset.archiveBranch):I.delete(W.dataset.archiveBranch)}),b.querySelectorAll("[data-branch-page]").forEach(W=>{W.onclick=()=>{B+=Number(W.dataset.branchPage),ae()}}),j.onsubmit=W=>{W.preventDefault(),U=j.elements.reason?.value||"",C=j.elements.notes.value,V()&&se()},j.querySelector("select,textarea").focus()}function se(){let O=ue(),j=new Set(O.map(X=>X.id)),W=[...f.work,...f.requests].filter(X=>j.has(X.asset_id));K(`<h3>${c?"Restore":"Remove"} ${O.length} equipment record${O.length===1?"":"s"}?</h3>${z(O)}
        ${c?"":`<p>Reason: <strong>${s(pe[U])}</strong></p>`}<p>${s(C)}</p>
        ${!c&&W.length?`<p role="alert">Resolve these work orders, production actions, follow-ups or requests before removal.</p>${z(W)}`:`<p>${c?"PM stays paused. Condition and facility are unchanged.":"History stays intact. This is reversible; it does not permanently erase equipment."}</p>`}
        <p role="alert" data-action-error></p><div class="travel-dialog-actions">${Y}<button class="secondary-button" data-action-back>Back</button><button class="${c?"primary-button":"danger-action-button"}" data-action-save ${!c&&W.length?"disabled":""}>${c?"Restore Equipment":"Archive / Delete Equipment"}</button></div><button class="secondary-button" data-action-retry hidden>Review Again</button>`),b.querySelector("[data-action-back]").onclick=ae,b.querySelector("[data-action-retry]").onclick=ne,b.querySelector("[data-action-save]").onclick=Z,b.querySelector("[data-action-back]").focus()}async function Z(){if(!(g||!V())){g=!0,b.querySelectorAll("button").forEach(O=>{O.disabled=!0});try{let O=await L(c?"restore_equipment":"archive_equipment",{p_asset_id:n,p_review_token:f.token,p_notes:C,...c?{}:{p_branch_ids:[...I],p_reason:U}});if(!V())return;if(!Array.isArray(O?.[c?"restored_ids":"archived_ids"]))throw Error("Could not verify the result. Review again.");try{await F(O)}catch(j){if(d!==`${t.getCompanyContext?.()||t.getCompanyId()}`||v&&v!==b)return;g=!1,m(),t.showNotice(`Change saved. ${j.message||"Reopen equipment to load its current state."}`,"warning");return}if(d!==`${t.getCompanyContext?.()||t.getCompanyId()}`||v&&v!==b)return;g=!1,m(),t.showNotice(c?"Equipment restored. Review paused PM before resuming it.":"Equipment removed from workflow. History is retained in Archived Equipment."),t.isVisible()&&(u.record=null,await l())}catch(O){if(!V())return;b.querySelector("[data-action-error]").textContent=O.message||"Could not verify the change. Review again.",b.querySelector("[data-action-retry]").hidden=!1,b.querySelector("[data-action-retry]").disabled=!1,b.querySelector("[data-archive-cancel]").disabled=!1}finally{g=!1}}}async function ne(){K(`<p role="status">Checking equipment and connected records...</p>${Y}`);try{let O=await L("equipment_archive_review",{p_asset_id:n});if(!V())return;if(!Array.isArray(O?.nodes)||!O.nodes.some(j=>j.id===n)||!O.token)throw Error("Could not verify the equipment hierarchy.");if(f=O,!!J().archived_at!==c)throw Error(c?"This equipment is already active.":"This equipment is already archived.");I=new Set,B=1,ae()}catch(O){V()&&K(`<p role="alert">${s(O.message||"Could not review equipment.")}</p>${Y}`)}}b.addEventListener("cancel",O=>{O.preventDefault(),g||m()}),e.body.append(b),b.showModal(),await ne()}async function P(n,c){if(_(),!t.canManage())return;m(),R=c,o=t.getContext();let a=o,h=T;v=e.createElement("dialog"),v.className="travel-dialog equipment-archive-dialog";let d=v;d.innerHTML='<h2>Resume PM</h2><form><label>Reviewed next due date<input type="date" name="due" required></label><p role="alert"></p><div class="travel-dialog-actions"><button type="button" class="secondary-button" data-cancel>Cancel</button><button class="primary-button" type="submit">Resume PM</button></div></form>',d.querySelector("[data-cancel]").onclick=m;let b=!1;d.addEventListener("cancel",f=>{f.preventDefault(),b||m()}),d.querySelector("form").onsubmit=async f=>{if(f.preventDefault(),!(b||a!==t.getContext())){b=!0,d.querySelectorAll("button").forEach(g=>{g.disabled=!0});try{let g=await L("resume_equipment_pm",{p_schedule_id:n,p_next_due_at:d.querySelector("input").value});if(v!==d||a!==t.getContext())return;try{await F({resumed_schedule:g})}catch(I){if(h!==`${t.getCompanyContext?.()||t.getCompanyId()}`||v&&v!==d)return;m(),t.showNotice(`PM saved. ${I.message||"Reopen PM to load its current state."}`,"warning");return}if(h!==`${t.getCompanyContext?.()||t.getCompanyId()}`||v&&v!==d)return;m(),t.showNotice("PM resumed with the reviewed due date.")}catch(g){v===d&&(d.querySelector('[role="alert"]').textContent=`${g.message} Close this review and check PM before retrying.`,d.querySelector("[data-cancel]").disabled=!1)}finally{b=!1}}},e.body.append(d),d.showModal(),d.querySelector("input").focus()}function r(){_(),v&&o!==t.getContext()&&m(),e.querySelectorAll("[data-open-equipment-archive]").forEach(c=>{c.onclick=w}),e.querySelectorAll("[data-archive-equipment]").forEach(c=>{c.onclick=()=>$(c.dataset.archiveEquipment,!1,c)}),e.querySelectorAll("[data-restore-equipment]").forEach(c=>{c.onclick=()=>$(c.dataset.restoreEquipment,!0,c)}),e.querySelectorAll("[data-resume-equipment-pm]").forEach(c=>{c.onclick=()=>P(c.dataset.resumeEquipmentPm,c)}),e.querySelectorAll("[data-archive-record]").forEach(c=>{c.onclick=()=>q(c.dataset.archiveRecord)}),e.querySelectorAll("[data-archive-work]").forEach(c=>{c.onclick=()=>t.openWork(c.dataset.archiveWork)}),e.querySelectorAll("[data-archive-financial]").forEach(c=>{c.onclick=()=>t.openFinancial(c.dataset.archiveFinancial)}),e.querySelector("[data-archive-back]")?.addEventListener("click",()=>u.record?w():t.leave()),e.querySelector("[data-archive-retry]")?.addEventListener("click",()=>u.record?M():l()),e.querySelector(".archive-filters")?.addEventListener("submit",c=>{c.preventDefault(),u.query=c.target.elements.query.value.trim(),u.location=c.target.elements.location.value,u.page=1,l()}),e.querySelectorAll("[data-archive-section]").forEach(c=>{c.onclick=()=>{u.section=c.dataset.archiveSection,u.relatedPage=1,M()}});let n=[...e.querySelectorAll("[data-archive-section]")];n.forEach((c,a)=>{c.tabIndex=c.dataset.archiveSection===u.section?0:-1,c.onkeydown=h=>{let d=h.key==="ArrowRight"?(a+1)%n.length:h.key==="ArrowLeft"?(a+n.length-1)%n.length:h.key==="Home"?0:h.key==="End"?n.length-1:-1;d<0||(h.preventDefault(),N=!0,n[d].click())}}),N&&(n.find(c=>c.dataset.archiveSection===u.section)?.focus(),u.loading||(N=!1)),e.querySelectorAll("[data-archive-page]").forEach(c=>{c.onclick=()=>{let[a,h]=c.dataset.archivePage.split(":");a==="list"?(u.page+=Number(h),l()):(u.relatedPage+=Number(h),M())}})}return{render:k,bind:r,dispose:m,reset:A,openList:w,openRecord:q,openAction:$}}function Le({documentRef:t,getScope:e,getCompanyId:s,client:v,withOperationTimeout:R,openWorkOrder:o}){let E,N=new Map,T=new Map;function u(){let _=e();return E!==_&&(E=_,N.clear(),T.clear()),_}function x(_){return u(),N.get(_)}function D(){for(let _ of t.querySelectorAll("[data-procedure-links]")){let l=x(_.dataset.procedureLinks);_.textContent=l?.status==="ready"?`${l.work_order_count} linked work orders`:l?.status==="error"?"Work links unavailable":"Loading work links...";let w=_.closest(".procedure-card"),q=w?.querySelector("[data-procedure-schedules]");q&&(q.textContent=l?.status==="ready"?`${l.schedule_count} PM schedules`:l?.status==="error"?"PM links unavailable":"Loading PM links...");let M=w?.querySelector("[data-delete-procedure]");if(M){let i=l?.status==="ready"&&(l.work_order_count>0||l.schedule_count>0);M.disabled=l?.status!=="ready"||i,M.textContent=i?"Kept For Traceability":l?.status==="ready"?"Delete Checklist":"Checking Links..."}}}async function F(_){let l=u(),w=s(),q=[...new Set(_)].filter(M=>!N.has(M));if(!q.length)return D();q.forEach(M=>N.set(M,{status:"loading"})),D();try{let{data:M,error:i}=await R(v().rpc("get_procedure_link_counts",{p_company_id:w,p_template_ids:q}),"Procedure links timed out.",12e3);if(l!==u())return;if(i)throw i;for(let y of q){let k=M?.find(S=>S.procedure_template_id===y);!k||![k.work_order_count,k.schedule_count].every(S=>(typeof S=="number"||typeof S=="string"&&/^\d+$/.test(S))&&Number.isSafeInteger(Number(S))&&Number(S)>=0)?N.set(y,{status:"error"}):N.set(y,{...k,status:"ready"})}}catch{l===u()&&q.forEach(M=>N.set(M,{status:"error"}))}l===u()&&D()}function L(_,l,w){let q=t.createElement(_);return l!==void 0&&(q.textContent=l),w&&(q.className=w),q}async function m(_,l=1){let w=u(),q=s(),M=_.dataset.pmHistory,i=_.querySelector("[data-pm-history-content]");if(!i)return;let y={};T.set(M,y);let k=()=>w===u()&&T.get(M)===y&&_.isConnected;i.textContent="Loading work history...";try{let{data:S,count:$,error:P}=await R(v().from("work_orders").select("id,title,status,due_at,completed_at,preventive_due_at",{count:"exact"}).eq("company_id",q).eq("preventive_source_id",M).order("created_at",{ascending:!1}).order("id").range((l-1)*12,l*12-1),"PM work history timed out.",12e3);if(!k())return;if(P)throw P;if(!Number.isInteger($)||$<0)throw Error("PM history count unavailable.");if(l>1&&(l-1)*12>=$)return m(_,Math.max(1,Math.ceil($/12)));if(!Array.isArray(S)||S.length!==Math.min(12,$-(l-1)*12)||new Set(S.map(n=>n.id)).size!==S.length||S.some(n=>!n.id||typeof n.status!="string"))throw Error("PM work history was incomplete. Try again.");i.replaceChildren();for(let n of S||[]){let c=L("article",void 0,"mini-work-order");c.dataset.miniWorkOrder=n.id;let a=L("button",n.title,"text-button");a.type="button",a.addEventListener("click",async()=>{a.disabled=!0;try{await o(n.id)}catch{i.append(L("p","Could not open this work order. Try again.","error-text"))}finally{a.disabled=!1}}),c.append(a,L("span",`${n.status.replaceAll("_"," ")} - Due ${n.due_at||n.preventive_due_at||"unset"}`)),i.append(c)}$||i.append(L("p","No linked generated work orders.","muted"));let r=L("div",void 0,"list-pagination");r.append(L("span",$?`Showing ${(l-1)*12+1}-${Math.min(l*12,$)} of ${$}`:"0 work orders"));for(let[n,c,a,h]of[["prev","Previous",l-1,l===1],["next","Next",l+1,l*12>=$]]){let d=L("button",c,"secondary-button");d.type="button",d.dataset.pmHistoryPage=n,d.disabled=h,d.addEventListener("click",()=>m(_,a)),r.append(d)}i.append(r)}catch(S){if(!k())return;i.replaceChildren(L("p",S.message||"PM work history unavailable.","error-text"));let $=L("button","Retry","secondary-button");$.type="button",$.addEventListener("click",()=>m(_,l)),i.append($)}}function A(){u(),F([...t.querySelectorAll("[data-procedure-links]")].map(_=>_.dataset.procedureLinks));for(let _ of t.querySelectorAll("[data-pm-history]"))_.dataset.pmBound||(_.dataset.pmBound="true",_.addEventListener("toggle",()=>{_.open&&m(_)}))}return{bind:A,getProcedureCounts:x,loadCounts:F,loadHistory:m}}var $e="maintainops.checklistResponseDraft.v1:",We="[data-step-result][data-work-order-id]";var _e=new WeakMap;function Fe({documentRef:t=document,getScope:e,storage:s=()=>sessionStorage,now:v=Date.now}){if(_e.has(t))return _e.get(t);let R=new Map,o=new WeakMap,E=new Map,N=new WeakMap,T=0,u=0,x=()=>String(e()||""),D=a=>a.type==="checkbox"?"checkbox":"value",F=a=>a.type==="checkbox"?a.checked:a.value,L=a=>a?.matches?.(We)&&["INPUT","TEXTAREA","SELECT"].includes(a.tagName)&&!["hidden","file","password","button","submit","reset"].includes(a.type)&&a.dataset.workOrderId&&a.dataset.stepResult,m=()=>[...t.querySelectorAll(We)].filter(L),A=(a,h,d)=>$e+JSON.stringify([a,h,d]);function _(a){R.delete(a);try{s().removeItem(a)}catch{}for(let[h,d]of E)d.key===a&&(d.node.remove(),E.delete(h))}function l(a){if(!R.has(a))try{let b=s().getItem(a);b&&b.length<=1e6&&R.set(a,JSON.parse(b))}catch{}let h=R.get(a),d=v();return!h||!Number.isFinite(h.at)||h.at>d||d-h.at>=864e5||!Number.isSafeInteger(h.revision)||h.revision<1||!(h.kind==="checkbox"?typeof h.value=="boolean":h.kind==="value"&&typeof h.value=="string")?(_(a),null):(T=Math.max(T,h.revision),h)}function w(a){return a.type==="checkbox"?a.defaultChecked:a.tagName==="SELECT"?[...a.options].find(h=>h.defaultSelected)?.value||a.options[0]?.value||"":a.defaultValue}function q(a,h=!1){if(!L(a)||!a.isConnected)return null;let d=x();if(!d)return null;let b=o.get(a),f=A(d,a.dataset.workOrderId,a.dataset.stepResult);return b&&(b.key!==f||b.epoch!==u)?null:(b||(b={key:f,scope:d,epoch:u,baseline:h?F(a):w(a)},o.set(a,b)),b)}function M(){for(let[a,h]of E)a.isConnected||(h.node.remove(),E.delete(a))}function i(a,h){let d=E.get(a);if(d?.node.isConnected)return d.button;let b=t.createElement("span");b.dataset.checklistResponseDraft="";let f=t.createElement("small");f.className="muted",f.textContent="Unsaved answer";let g=t.createElement("button");return g.type="button",g.className="secondary-button small",g.dataset.checklistDraftRetry="",g.textContent="Save answer",b.append(f,t.createTextNode(" "),g),(a.closest("label")||a).insertAdjacentElement("afterend",b),N.set(g,a),E.set(a,{key:h.key,node:b,button:g}),g}function y(a,h=!1){let d=q(a);if(!d)return null;let b=F(a),f=l(d.key),g=D(a);if(!f&&!h&&b===d.baseline)return null;let I=f;if(!I||I.value!==b||I.kind!==g){I={at:v(),revision:++T,kind:g,value:b},R.set(d.key,I);try{s().setItem(d.key,JSON.stringify(I))}catch{}}return i(a,d),Object.freeze({key:d.key,revision:I.revision,epoch:u})}function k(){M();for(let a of m())y(a)}function S(){M();let a=[];for(let h of m()){let d=q(h,!0);if(!d)continue;let b=l(d.key);if(b){if(b.kind!==D(h)){_(d.key);continue}b.kind==="checkbox"?h.checked=b.value:h.value=b.value,a.push(i(h,d))}}return a}function $(a){if(!a||a.epoch!==u)return!1;for(let d of m())o.get(d)?.key===a.key&&y(d);let h=l(a.key);if(!h||h.revision!==a.revision)return!1;for(let d of m()){let b=o.get(d);b?.key===a.key&&b.epoch===u&&(b.baseline=h.value)}return _(a.key),!0}function P(){let a=new Set(R.keys());try{let h=s();for(let d=0;d<h.length;d++)h.key(d)?.startsWith($e)&&a.add(h.key(d))}catch{}return a}function r(a){let h=x();if(!h)return!1;for(let d of P()){let b;try{b=JSON.parse(d.slice($e.length))}catch{_(d);continue}if(Array.isArray(b)&&b[0]===h&&b[1]===a&&l(d))return!0}return!1}function n(){u++;for(let a of P())_(a);R.clear();for(let a of E.values())a.node.remove();E.clear()}for(let a of["input","change"])t.addEventListener(a,h=>{L(h.target)&&!h.target.disabled&&y(h.target)},!0);t.addEventListener("click",a=>{let h=a.target.closest?.("[data-checklist-draft-retry]"),d=h&&N.get(h);d&&(a.preventDefault(),!(d.disabled||!q(d))&&d.dispatchEvent(new t.defaultView.Event("change",{bubbles:!0})))}),t.defaultView?.addEventListener("pagehide",k),t.addEventListener("visibilitychange",()=>{t.hidden&&k()});let c={capture:k,restore:S,snapshot:a=>y(a,!0),clear:$,reset:n,hasDraft:r};return _e.set(t,c),c}window.MaintainOpsEquipmentRelocation={createEquipmentRelocation:Oe};window.MaintainOpsEquipmentArchive={createEquipmentArchive:Te,loadEquipmentArchiveChanges:we};window.MaintainOpsMaintenanceRelations={createMaintenanceRelations:Le};window.MaintainOpsChecklistResponseDrafts={createChecklistResponseDrafts:Fe};})();
//# sourceMappingURL=maintenanceFeature.24594b6f80.js.map
