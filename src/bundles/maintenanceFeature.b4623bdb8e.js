(()=>{var He=Object.create;var Ce=Object.defineProperty;var ze=Object.getOwnPropertyDescriptor;var Ve=Object.getOwnPropertyNames;var Ge=Object.getPrototypeOf,Ke=Object.prototype.hasOwnProperty;var Z=(g,e)=>()=>{try{return e||g((e={exports:{}}).exports,e),e.exports}catch(m){throw e=0,m}};var Ye=(g,e,m,w)=>{if(e&&typeof e=="object"||typeof e=="function")for(let A of Ve(e))!Ke.call(g,A)&&A!==m&&Ce(g,A,{get:()=>e[A],enumerable:!(w=ze(e,A))||w.enumerable});return g};var ae=(g,e,m)=>(m=g!=null?He(Ge(g)):{},Ye(e||!g||!g.__esModule?Ce(m,"default",{value:g,enumerable:!0}):m,g));var Pe=Z((Xe,ue)=>{(function(){function g(e={}){let m=e.documentRef||document,w=e.FormDataCtor||FormData,A=e.CSSRef||CSS,n=new Map,S=new Set;function R(){let o=e.getActiveCompanyId(),u=e.getSession()?.user?.id,y=e.getScope?.();return{companyId:o,userId:u,client:e.supabaseClient(),isCurrent:()=>e.getActiveCompanyId()===o&&e.getSession()?.user?.id===u&&e.getScope?.()===y}}function N(o){if(!o.companyId||!o.userId||e.canEditOperationalRecords?.()!==!0)throw new Error("You do not have permission to edit PM schedules.")}function x(o){if(N(o),!e.canDeleteOperationalRecords())throw new Error("Only company admins and managers can delete PM schedules.")}function C(o,u,y){o&&o.isConnected!==!1&&u.isCurrent()&&(o.disabled=!1,o.textContent=y)}function M(){let o=Array.from(m.querySelectorAll?.("[data-create-pm-form]")||[]),u=m.querySelector("#create-pm-form");u&&!o.includes(u)&&o.push(u),o.forEach(y=>y.addEventListener("submit",T))}async function T(o){o.preventDefault();let u=o.currentTarget,y=R(),E=`${y.companyId}:create`;if(S.has(E))return;S.add(E);let a=u.querySelector("button[type='submit']"),i=u.querySelector("[data-pm-error]")||m.querySelector("#pm-error");i&&(i.textContent=""),a&&(a.disabled=!0,a.textContent="Adding...");try{N(y);let d=e.captureCreateDraft?.(u),k=new w(u);if(e.nextDueDate(String(k.get("next_due_at")||""),String(k.get("frequency")||"")),!e.confirmAssetLocationRouting(k.get("asset_id")||null,"this PM schedule",i))return;let{error:c}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:y.companyId,location_id:e.locationIdForAsset(k.get("asset_id")),asset_id:k.get("asset_id"),title:e.requiredText(k.get("title"),"PM title"),frequency:k.get("frequency"),next_due_at:k.get("next_due_at"),...e.procedureColumn(k.get("procedure_template_id")),active:!0,created_by:y.userId}),"PM schedule save timed out. Check your connection and try again.",15e3);if(c)throw c;if(d&&e.clearCreateDraft?.(d),!y.isCurrent())return;e.showNotice("PM schedule added."),await e.render()}catch(d){if(!y.isCurrent())return;i?i.textContent=d.message||"Could not add PM schedule.":e.alertUser(d.message||d)}finally{S.delete(E),C(a,y,"Add Schedule")}}function O(o){let u=R();try{if(x(u),S.has(`${u.companyId}:delete:${o}`)||!e.getPreventiveSchedules().some(y=>y.id===o&&y.company_id===u.companyId))return;e.setPendingDeleteScheduleId(o),e.renderWorkspace()}catch(y){e.alertUser(y.message)}}async function l(o){let u=R(),y=`${u.companyId}:delete:${o}`;if(S.has(y)||!e.getPreventiveSchedules().find(i=>i.id===o&&i.company_id===u.companyId))return;S.add(y);let a=m.querySelector(`[data-confirm-delete-schedule="${A.escape(o)}"]`);a&&(a.disabled=!0,a.textContent="Deleting...");try{x(u);let{data:i,error:d}=await e.withOperationTimeout(u.client.from("preventive_schedules").delete().eq("id",o).eq("company_id",u.companyId).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(!u.isCurrent())return;if(d)throw d;if(!Array.isArray(i)||!i.some(c=>c.id===o))throw new Error("PM schedule was not deleted. Refresh and check your access before retrying.");let k=await e.withOperationTimeout(u.client.from("preventive_schedules").select("id").eq("id",o).eq("company_id",u.companyId).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(!u.isCurrent())return;if(k.error)throw new Error(`PM schedule delete verification failed: ${k.error.message}`);if(k.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(i){if(!u.isCurrent())return;e.showNotice(i.message||"Could not delete PM schedule.","warning")}finally{S.delete(y),C(a,u,"Permanently Delete")}}function q(o){let u=`${e.getActiveCompanyId()}:${o}`;if(n.has(u))return n.get(u);let y=b(o).finally(()=>n.delete(u));return n.set(u,y),y}async function b(o){let u=R(),y=e.getPreventiveSchedules().find(a=>a.id===o&&a.company_id===u.companyId);if(!y)return;let E=m.querySelector(`[data-generate-pm="${A.escape(o)}"]`);E&&(E.disabled=!0,E.textContent="Generating...");try{if(N(u),y.active===!1)throw new Error("This PM schedule cannot generate work.");e.nextDueDate(y.next_due_at,y.frequency);let{data:a,error:i}=await e.withOperationTimeout(u.client.rpc("generate_preventive_work_order",{p_company_id:u.companyId,p_schedule_id:y.id,p_expected_due_at:y.next_due_at}),"PM work order generation timed out. Retry this schedule to check the same occurrence.");if(i)throw i;if(!a?.work_order_id)throw new Error("PM generation did not return a work order.");if(!u.isCurrent())return;e.setActiveWorkOrderId(a.work_order_id),e.setActiveSection("work"),e.showNotice(a.reused?"Opened the work order already generated for this PM occurrence.":"PM work order generated."),await e.render()}catch(a){u.isCurrent()&&e.showNotice(`Could not generate PM work: ${a.message||a}`,"warning")}finally{C(E,u,"Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:M,createPreventiveSchedule:T,requestDeletePreventiveSchedule:O,deletePreventiveSchedule:l,generatePreventiveWorkOrder:q}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:g},typeof ue<"u"&&(ue.exports={createPreventiveMaintenanceWorkflow:g})})()});var Ee=Z((Ze,pe)=>{(function(){function g(e={}){let m=e.documentRef||document,w=e.FormDataCtor||FormData,A=e.CSSRef||CSS,n=new Set,S="Basic Equipment Inspection",R="A simple starter checklist for visual checks, readings, and final pass/fail.",N=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}];function x(){let a=e.getActiveCompanyId(),i=e.getSession()?.user?.id,d=e.getScope?.();return{companyId:a,userId:i,client:e.supabaseClient(),isCurrent:()=>e.getActiveCompanyId()===a&&e.getSession()?.user?.id===i&&e.getScope?.()===d}}function C(a){if(!a.companyId||!a.userId||e.canEditOperationalRecords?.()!==!0)throw new Error("You do not have permission to edit procedure checklists.")}function M(a){if(C(a),!e.canDeleteOperationalRecords())throw new Error("Only company admins and managers can delete procedures.")}function T(a,i,d){a&&a.isConnected!==!1&&i.isCurrent()&&(a.disabled=!1,a.textContent=d)}function O(){let a=m.querySelector("#create-procedure-form");a&&a.addEventListener("submit",l);let i=m.querySelector("#seed-sample-procedure");i&&i.addEventListener("click",q),m.querySelectorAll("[data-add-step]").forEach(d=>{d.addEventListener("submit",b)})}async function l(a){a.preventDefault();let i=a.currentTarget,d=x(),k=`${d.companyId}:create`;if(n.has(k))return;n.add(k);let c=i.querySelector("button[type='submit']"),_=m.querySelector("#procedure-error");_&&(_.textContent=""),c&&(c.disabled=!0,c.textContent="Adding...");try{C(d);let t=e.captureCreateDraft?.(i),P=new w(i),{error:D}=await e.withOperationTimeout(d.client.from("procedure_templates").insert({company_id:d.companyId,name:e.requiredText(P.get("name"),"Procedure checklist name"),description:String(P.get("description")||"").trim()||null,created_by:d.userId}),"Procedure save timed out.");if(D)throw D;if(t&&e.clearCreateDraft?.(t),!d.isCurrent())return;e.showNotice("Procedure checklist added."),await e.render()}catch(t){if(!d.isCurrent())return;_?_.textContent=t.message||"Could not add procedure.":e.alertUser(t.message||t)}finally{n.delete(k),T(c,d,"Add Checklist")}}async function q(){let a=x(),i=`${a.companyId}:sample`;if(n.has(i))return;n.add(i);let d=m.querySelector("#seed-sample-procedure"),k=null,c=!1;d&&(d.disabled=!0,d.textContent="Adding sample...");try{C(a);let _=await e.withOperationTimeout(a.client.from("procedure_templates").select("id, company_id, name, description").eq("company_id",a.companyId).ilike("name",S),"Sample procedure lookup timed out.");if(!a.isCurrent())return;if(_.error)throw _.error;if(!Array.isArray(_.data))throw new Error("Could not verify existing sample checklists.");if(_.data.length>1)throw new Error("Multiple sample checklists already exist. No checklists were changed.");C(a);let t=_.data[0];if(!t){let h=await e.withOperationTimeout(a.client.from("procedure_templates").insert({company_id:a.companyId,name:S,description:R,created_by:a.userId}).select("id, company_id, name, description").single(),"Sample procedure save timed out. Retry to check whether the checklist was saved.");if(!a.isCurrent())return;if(h.error)throw h.error;t=h.data}if(!t?.id||t.company_id!==a.companyId)throw new Error("Could not verify the saved sample checklist.");let P=`${a.companyId}:steps:${t.id}`;if(n.has(P))throw new Error("Checklist steps are already being saved. Retry when that save finishes.");k=P,n.add(k),c=!0;let D=await e.withOperationTimeout(a.client.from("procedure_steps").select("*").eq("company_id",a.companyId).eq("procedure_template_id",t.id),"Sample procedure steps lookup timed out.");if(!a.isCurrent())return;if(D.error)throw D.error;if(!Array.isArray(D.data))throw new Error("Could not verify saved sample steps.");let r=new Set;for(let h of D.data){let I=N.find(H=>H.position===h.position);if(!I||r.has(h.position)||h.company_id!==a.companyId||h.procedure_template_id!==t.id||h.prompt!==I.prompt||h.response_type!==I.response_type||h.required!==I.required)throw c=!1,new Error("The existing sample checklist has customized steps. No steps were changed.");r.add(h.position)}let f=N.filter(h=>!r.has(h.position));if(!f.length){c=!1,e.showNotice("Sample inspection procedure already exists.","warning"),await e.render();return}if(t.description!==R)throw c=!1,new Error("The existing sample checklist has been customized. Review its steps manually; no steps were changed.");let p=await o(t.id,a);if(!a.isCurrent())return;if(p.workOrders||p.schedules)throw c=!1,new Error("The partial sample checklist is already linked to work or PM schedules. Review its steps manually; no steps were changed.");C(a);let $=f.map(h=>({...h,company_id:a.companyId,procedure_template_id:t.id})),{error:v}=await e.withOperationTimeout(a.client.from("procedure_steps").insert($),"Sample procedure steps save timed out.");if(v)throw v;if(c=!1,!a.isCurrent())return;e.showNotice("Sample procedure checklist added."),await e.render()}catch(_){a.isCurrent()&&e.showNotice(c?`Sample checklist retained, but completion failed: ${_.message||_} Retry to finish missing steps.`:`Could not add sample procedure: ${_.message||_}`,"warning")}finally{n.delete(i),k&&n.delete(k),T(d,a,c?"Retry sample checklist completion":"Add sample inspection checklist")}}async function b(a){a.preventDefault();let i=a.currentTarget,d=x(),k=i.dataset.addStep,c=`${d.companyId}:steps:${k}`;if(n.has(c))return;n.add(c);let _=i.querySelector("button[type='submit']"),t=m.querySelector(`[data-step-error="${A.escape(k)}"]`);t&&(t.textContent=""),_&&(_.disabled=!0,_.textContent="Adding...");try{C(d);let P=e.getProcedureTemplates().find(v=>v.id===k&&v.company_id===d.companyId);if(!P||!Array.isArray(P.procedure_steps))throw new Error("Procedure checklist is unavailable. Refresh before adding a step.");let D=P.procedure_steps.map(v=>Number(v.position));if(D.some(v=>!Number.isSafeInteger(v)||v<1))throw new Error("Procedure step positions could not be verified.");let r=Math.max(0,...D)+1;if(!Number.isSafeInteger(r))throw new Error("Procedure step position is out of range.");let f=e.captureCreateDraft?.(i),p=new w(i),{error:$}=await e.withOperationTimeout(d.client.from("procedure_steps").insert({company_id:d.companyId,procedure_template_id:k,position:r,prompt:e.requiredText(p.get("prompt"),"Procedure checklist step"),response_type:p.get("response_type"),required:p.get("required")==="true"}),"Procedure step save timed out.");if($)throw $;if(f&&e.clearCreateDraft?.(f),!d.isCurrent())return;e.showNotice("Procedure checklist step added."),await e.render()}catch(P){if(!d.isCurrent())return;t?t.textContent=P.message||"Could not add procedure step.":e.alertUser(P.message||P)}finally{n.delete(c),T(_,d,"Add Step")}}async function o(a,i=x()){let{data:d,error:k}=await e.withOperationTimeout(i.client.rpc("get_procedure_link_counts",{p_company_id:i.companyId,p_template_ids:[a]}),"Procedure delete check timed out.",15e3);if(k)throw new Error(`Could not verify procedure links: ${k.message}`);if(!Array.isArray(d)||d.length!==1||d[0]?.procedure_template_id!==a)throw new Error("Could not verify procedure links. No checklist was deleted.");function c(_){if(typeof _!="number"&&!(typeof _=="string"&&/^\d+$/.test(_))||!Number.isSafeInteger(Number(_))||Number(_)<0)throw new Error("Could not verify procedure link counts. No checklist was deleted.");return Number(_)}return{workOrders:c(d[0].work_order_count),schedules:c(d[0].schedule_count)}}async function u(a,i){if(!["work_orders","preventive_schedules"].includes(a))throw new Error("Unsupported procedure relationship.");let d=await o(i);return a==="work_orders"?d.workOrders:d.schedules}async function y(a){let i=x(),d=`${i.companyId}:delete:${a}`;if(n.has(d)||!e.getProcedureTemplates().some(c=>c.id===a&&c.company_id===i.companyId))return;n.add(d);let k=m.querySelector(`[data-procedure-delete-error="${A.escape(a)}"]`);k&&(k.textContent="");try{M(i);let c=await o(a,i);if(!i.isCurrent())return;M(i);let _=e.procedureDeleteBlockerMessage(c);if(_){k&&(k.textContent=_);return}e.setPendingDeleteProcedureId(a),e.renderWorkspace()}catch(c){if(!i.isCurrent())return;k?k.textContent=c.message||"Could not verify procedure links before delete.":e.showNotice(c.message||"Could not verify procedure links before delete.","warning")}finally{n.delete(d)}}async function E(a){let i=x(),d=`${i.companyId}:delete:${a}`;if(n.has(d)||!e.getProcedureTemplates().find(t=>t.id===a&&t.company_id===i.companyId))return;n.add(d);let c=m.querySelector(`[data-confirm-delete-procedure="${A.escape(a)}"]`),_=m.querySelector(`[data-procedure-delete-error="${A.escape(a)}"]`);_&&(_.textContent=""),c&&(c.disabled=!0,c.textContent="Deleting...");try{M(i);let t=await o(a,i);if(!i.isCurrent())return;M(i);let P=e.procedureDeleteBlockerMessage(t);if(P)throw new Error(P);let{data:D,error:r}=await e.withOperationTimeout(i.client.from("procedure_templates").delete().eq("id",a).eq("company_id",i.companyId).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(!i.isCurrent())return;if(r)throw r;if(!Array.isArray(D)||!D.some(p=>p.id===a))throw new Error("Procedure checklist was not deleted. Refresh and check your access before retrying.");let f=await e.withOperationTimeout(i.client.from("procedure_templates").select("id").eq("id",a).eq("company_id",i.companyId).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if(!i.isCurrent())return;if(f.error)throw new Error(`Procedure checklist delete verification failed: ${f.error.message}`);if(f.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(t){if(!i.isCurrent())return;let P=t.message||"Could not delete procedure.";e.showNotice(P,"warning"),_&&(_.textContent=P)}finally{n.delete(d),T(c,i,"Permanently Delete")}}return{bindProcedureWorkflowEvents:O,createProcedureTemplate:l,seedSampleProcedure:q,createProcedureStep:b,loadProcedureDeleteBlockers:o,countProcedureLinkedRows:u,requestDeleteProcedureTemplate:y,deleteProcedureTemplate:E}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:g},typeof pe<"u"&&(pe.exports={createProcedureWorkflow:g})})()});var xe=Z((et,me)=>{(function(){function g(w,A){return w?.response_type==="checkbox"?A===!0||A==="checked"?"checked":"":String(A??"").trim()}function e(w,A){let n=g(w,A);return n?w?.response_type==="checkbox"?n==="checked":w?.response_type==="pass_fail"?n==="pass"||n==="fail":w?.response_type==="number"?Number.isFinite(Number(n)):!0:!1}let m={normalizeChecklistResponseValue:g,isChecklistStepAnswered:e};typeof window<"u"&&(window.MaintainOpsChecklistResponseValues=m),typeof me<"u"&&(me.exports=m)})()});var Ae=Z((tt,fe)=>{(function(){let{normalizeChecklistResponseValue:g,isChecklistStepAnswered:e}=window.MaintainOpsChecklistResponseValues||xe();function m(w={}){function A(S,R,N){if(!S.isConnected||S.dataset.workOrderId!==R||S.dataset.stepResult!==N)return;let x=w.getWorkOrders().find(u=>u.id===R);if(!x)return;let C=w.getProcedureTemplates().find(u=>u.id===x?.procedure_template_id);if(!C)return;let M=w.checklistProgress(x,C),T=w.requiredChecklistProgress(x,C),O=S.closest(".detail-stack"),l=O?.querySelector("[data-checklist-summary]"),q=O?.querySelector(".relationship-chip.procedure > span");l&&(l.textContent=`${M.done} of ${M.total} complete - required ${T.done}/${T.total}`),q&&(q.textContent=`${M.done}/${M.total}`);let b=S.closest(".checklist-step")?.querySelector("[data-checklist-recorded]"),o=w.getStepResultsByWorkOrder()[R]?.[N];b&&(b.textContent=o?.completed_at?`Recorded ${new Date(o.completed_at).toLocaleString()}`:"")}async function n(S){let R=S.target;if(R.disabled)return;let N=R.dataset.workOrderId,x=R.dataset.stepResult,C=w.getActiveCompanyId(),M=w.getSession()?.user?.id,T=w.getScope?.(),O=()=>w.getActiveCompanyId()===C&&w.getSession()?.user?.id===M&&w.getScope?.()===T,l=w.captureResponseDraft?.(R);R.disabled=!0;try{let q=w.getWorkOrders().find(d=>d.id===N),b=w.getProcedureTemplates().find(d=>d.id===q?.procedure_template_id),o=b?.procedure_steps?.find(d=>d.id===x);if(!C||!M||!q||!b||!o||q.company_id!==C||b.company_id!==C||o.company_id!==C||o.procedure_template_id!==b.id)throw new Error("This checklist step is no longer attached to this work order. Refresh and try again.");let u=g(o,o.response_type==="checkbox"?R.checked:R.value),y=e(o,u);if(o.response_type==="number"&&u&&!y)throw new Error("Enter a valid numeric reading.");if(o.response_type==="pass_fail"&&u&&!y)throw new Error("Choose Pass, Fail, or Not checked.");let{error:E}=await w.withOperationTimeout(w.upsertStepResult({company_id:C,work_order_id:N,procedure_step_id:x,completed_by:y?M:null,value:u,completed_at:y?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(E)throw E;if(w.clearResponseDraft?.(l),!O())return;let a=await w.withOperationTimeout(w.recordWorkOrderEvent(N,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(d=>({error:d}));if(!O())return;a?.error&&w.showNotice(`Checklist saved, but history did not update: ${a.error.message||a.error}`,"warning");let i=await w.withOperationTimeout(w.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(d=>d);if(!O())return;if(i){w.showNotice(`Checklist saved, but refresh did not finish: ${i.message||i}`,"warning");return}if(w.getWorkOrderActionWarningId()===N){let d=w.getWorkOrders().find(k=>k.id===N);d&&!w.blocksProcedureCompletion(d)&&w.setWorkOrderActionWarning("","")}A(R,N,x)}catch(q){O()&&w.showNotice(`Could not save checklist step: ${q.message||q}`,"warning")}finally{R.disabled=!1}}return{saveStepResult:n,normalizeChecklistResponseValue:g,isChecklistStepAnswered:e}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:m,normalizeChecklistResponseValue:g,isChecklistStepAnswered:e},typeof fe<"u"&&(fe.exports={createProcedureChecklistWorkflow:m,normalizeChecklistResponseValue:g,isChecklistStepAnswered:e})})()});var Me=Z((nt,he)=>{(function(){function g(e){let m=e.escapeHtml,w=e.getDueState,A=e.procedureDeleteBlockerMessage,n=e.canDeleteOperationalRecords,S=e.canEditOperationalRecords||(()=>!0);function R(l,{count:q,rows:b,pagination:o,ready:u,assetOptions:y,procedureOptions:E,date:a}){let i=l==="pm";return`<section class="panel full-width">
        <div class="panel-header"><h2>${i?"Preventive Maintenance":"Procedure Checklists"}</h2><span>${u?`${q} shown`:"Unavailable"}</span></div>
        ${u?`${S()?i?x({assetOptions:y,procedureOptions:E,date:a}):N():""}
          <div class="${i?"pm":"procedure"}-list">${b.map(i?T:O).join("")||`<p class="muted">No ${i?"schedules":"procedure checklists"} match this search.</p>`}</div>
          ${o}`:`<p class="error-text" role="alert">${i?"PM schedules":"Procedure checklists"} could not be loaded. Try again.</p>`}
      </section>`}function N(){return`<form class="form-grid procedure-form relationship-detail procedure" id="create-procedure-form">
        <label>Procedure checklist name<input name="name" required placeholder="Monthly compressor inspection"></label>
        <label>Description<textarea name="description" rows="3" placeholder="Use this checklist when creating repeat work."></textarea></label>
        <p class="error-text" id="procedure-error"></p>
        <button class="secondary-button" type="submit">Add Checklist</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form>
      <button class="text-button" id="seed-sample-procedure" type="button">Add sample inspection checklist</button>`}function x({assetOptions:l,procedureOptions:q,date:b}){return`<form class="inline-form pm-form" id="create-pm-form" data-create-pm-form>
        <input name="title" required placeholder="Monthly compressor PM">
        <select name="asset_id" required data-location-sensitive-asset><option value="">Machine / equipment</option>${l}</select>
        <p class="error-text" data-asset-location-warning></p>
        <select name="frequency"><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option></select>
        <select name="procedure_template_id">${q}</select>
        <span class="date-picker-row inline-date-picker" data-date-picker-field>
          <input name="next_due_at" type="date" value="${m(b)}" required>
          <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
        </span>
        <p class="error-text" id="pm-error"></p>
        <button class="secondary-button" type="submit">Add Schedule</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form>`}function C(){return e.getPreventiveSchedules().filter(l=>e.matchesActiveLocation(l)&&e.matchesSearch([l.title,l.frequency,l.next_due_at,l.assets?.name]))}function M(){return e.getProcedureTemplates().filter(l=>e.matchesSearch([l.name,l.description,...(l.procedure_steps||[]).map(q=>q.prompt)]))}function T(l){let q=l.active===!1?null:w({due_at:l.next_due_at,status:"open"}),b=e.getPendingDeleteScheduleId()===l.id,o=S();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${m(l.frequency)}</span>
              ${l.active===!1?'<span class="chip">Inactive</span>':""}
              ${q?`<span class="chip ${q.className}">${q.label}</span>`:""}
            </div>
            <h3>${m(l.title)}</h3>
            <p>${m(l.assets?.name||"No equipment")} - Next due ${m(l.next_due_at)}</p>
          </div>
          ${o?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${m(l.id)}" type="button" ${l.active===!1?"disabled":""}>Generate Work</button>
            ${n()?b?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${m(l.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${m(l.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
          <details data-pm-history="${m(l.id)}">
            <summary>Generated Work History</summary>
            <div class="mini-list" data-pm-history-content></div>
          </details>
        </article>
      `}function O(l){let q=e.getProcedureLinkCounts?.(l.id),b=q?.status==="ready"?Number(q.work_order_count):null,o=q?.status==="ready"?Number(q.schedule_count):null,u=A({workOrders:b,schedules:o}),y=e.getPendingDeleteProcedureId()===l.id,E=S();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${l.procedure_steps?.length||0} steps</span>
              <span class="chip" data-procedure-links="${m(l.id)}">${b===null?"Loading work links...":`${b} linked work orders`}</span>
              <span class="chip" data-procedure-schedules>${o===null?"Loading PM links...":`${o} PM schedules`}</span>
            </div>
            <h3>${m(l.name)}</h3>
            <p>${m(l.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(l.procedure_steps||[]).map(a=>`
              <div class="checklist-step">
                <span>${a.position}. ${m(a.prompt)}</span>
                <small>${m(a.response_type)} ${a.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${E&&e.canUseMaintenanceTools?.()!==!1?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${l.id}">
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
            <p class="error-text" data-step-error="${l.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
            <button class="secondary-button" type="reset">Clear Form</button>
          </form>`:""}
          ${E&&n()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${u||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${m(l.id)}"></p>
              ${u?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:y?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${m(l.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${m(l.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${m(l.id)}" type="button" ${q?.status!=="ready"?"disabled":""}>${q?.status!=="ready"?"Checking Links...":"Delete Checklist"}</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:C,filteredProcedureTemplates:M,renderPreventiveSchedule:T,renderProcedureTemplate:O,renderPmCreateForm:x,renderProcedureCreateForm:N,renderPanel:R}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:g},typeof he<"u"&&(he.exports={createMaintenanceListDisplayHelpers:g})})()});var Re=Z((at,ye)=>{(function(){function g(e={}){let{renderCreateWorkOrder:m,parentAssetFor:w,childAssetsFor:A,escapeHtml:n,assetTypeLabel:S,renderParentAssetOptions:R,renderLocationOptions:N,renderAssetAreaOptions:x,assetStatusLabel:C,renderAssetMiniWorkOrder:M,assetDeleteBlockerMessage:T,canDeleteEquipment:O,canEditEquipmentRecords:l=()=>!0,renderEquipmentStructureGuide:q,renderProcedureOptions:b}=e;function o(){let c=new Date;return new Date(c.getTime()-c.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function u(){return l()?`<form class="inline-form" id="create-asset-form">
        <input name="name" required placeholder="Machine or equipment name">
        <input name="asset_code" placeholder="Serial number">
        <input name="asset_tag" aria-label="Asset tag" placeholder="Asset tag (optional)">
        <input name="manufacturer" placeholder="Manufacturer">
        <input name="model" placeholder="Model">
        <select name="location_existing" aria-label="Area / spot"><option value="">No area / spot set</option>${x()}</select>
        <input name="location_new" placeholder="New area / spot">
        <select name="asset_type" aria-label="Equipment type">${e.ASSET_TYPE_OPTIONS.map(c=>`<option value="${c}">${S(c)}</option>`).join("")}</select>
        <p class="muted">Traveling Equipment is routinely shared between facilities. For a one-time move, keep the normal type and use Relocate Equipment.</p>
        <select name="parent_asset_id" aria-label="Part of equipment"><option value="">Top level equipment</option>${R()}</select>
        <select name="location_id" ${e.getLocations().length?"required":"disabled"}>${N()}</select>
        <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety device identification</label>
        <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
        <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form><p class="error-text" id="asset-create-error"></p>`:'<p class="muted">Accounting can view equipment here. Maintenance and admins manage operational equipment changes.</p>'}function y(c,_,t){let P=_.some(p=>p.event_type==="created"),D=c.created_at&&!P?[{id:`${c.id}-created`,event_type:"created",summary:`${S(c.asset_type)} created.`,actor_id:c.created_by||"",created_at:c.created_at}]:[];return{equipmentHistory:[..._,...D].sort((p,$)=>new Date($.created_at||0)-new Date(p.created_at||0)),historyActorLabel:p=>p.actor_id&&t[p.actor_id]?.full_name?t[p.actor_id].full_name:p.actor_id?`User ${String(p.actor_id).slice(0,8)}`:p.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function E(c,_){return c.map(t=>`
        <article>
          <strong>${n(String(t.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${t.created_at?new Date(t.created_at).toLocaleString():"time unavailable"} &middot; ${n(_(t))}</span>
          <p>${n(t.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function a(){let c=e.getAssets(),_=e.getActiveAssetId(),t=c.find(U=>U.id===_);if(!t)return m();let P=e.getAssetEventsReady?.()!==!1,D=e.getProfilesByUserId?.()||{},r=(e.getAssetEventsByAssetId?.()[t.id]||[]).sort((U,Y)=>new Date(Y.created_at||0)-new Date(U.created_at||0)),{equipmentHistory:f,historyActorLabel:p}=y(t,r,D),$=e.LIST_ITEMS_PER_PAGE||12,v=Math.max(1,Math.ceil(f.length/$)),h=Math.min(Math.max(1,e.getAssetRelationshipPage?.(t.id,"asset-history")||1),v),I=f.length?(h-1)*$+1:0,H=Math.min(f.length,h*$),L=f.slice((h-1)*$,h*$);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${n(t.name)} - ${f.length} event${f.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${n(t.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${P?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${E(L,p)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${f.length>$?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${n(t.id)}" type="button" ${h<=1?"disabled":""}>Previous</button>
                <span>Showing ${I}-${H} of ${f.length} - Page ${h} of ${v}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${n(t.id)}" type="button" ${h>=v?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function i(){let c=e.getAssets(),_=e.getActiveAssetId(),t=c.find(s=>s.id===_);if(!t)return m();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(t.id);let P=e.getWorkOrders(),D=e.getPreventiveSchedules(),r=e.getParts(),f=e.getAssetParts(),p=e.getAssetPartsReady(),$=e.getAssetDocumentsByAssetId?.()[t.id]||[],v=e.getAssetDocumentsReady?.()!==!1,h=e.getAssetEventsReady?.()!==!1,I=e.getProfilesByUserId?.()||{},H=e.getPartsUsedByWorkOrder(),L=e.getLocations(),U=e.getActiveLocationId(),Y=e.ASSET_TYPE_OPTIONS||[],J=w(t),re=A(t.id),ve=P.filter(s=>s.asset_id===t.id),j=e.getAssetWorkHistory?.(t.id),V=!j||j.historyStatus==="ready",ke=j?j.rows:ve,se=j?.historyStatus==="error"?'<p class="error-text" role="alert">Could not load work history.</p>':'<p class="muted" role="status">Loading work history...</p>',Q=ke.filter(s=>s.status!=="completed").sort((s,W)=>new Date(W.created_at||0)-new Date(s.created_at||0)),ie=ke.filter(s=>s.status==="completed").sort((s,W)=>new Date(W.completed_at||W.created_at||0)-new Date(s.completed_at||s.created_at||0)),oe=D.filter(s=>s.asset_id===t.id),ce=Object.values(H).flat().filter(s=>ve.some(W=>W.id===s.work_order_id)),G=f.filter(s=>s.asset_id===t.id),Te=new Set(G.map(s=>s.part_id)),le=r.filter(s=>!Te.has(s.id)),Le=(e.getAssetEventsByAssetId?.()[t.id]||[]).sort((s,W)=>new Date(W.created_at||0)-new Date(s.created_at||0)),{equipmentHistory:we}=y(t,Le,I),ee=(s,W)=>j?j.countsStatus==="ready"?j.counts[s]:j.countsStatus==="error"?"Unavailable":"Loading...":W,de=s=>`data-asset-work-count="${n(t.id)}" data-work-count-kind="${s}"`,K=e.LIST_ITEMS_PER_PAGE||12,B=s=>e.getAssetRelationshipOpen?.(t.id,s)||!1,$e=(s,W)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(t.id,s)||1),Math.max(1,Math.ceil(W/K))),te=(s,W)=>{let z=$e(W,s.length);return s.slice((z-1)*K,z*K)},ne=(s,W)=>{if(W<=K)return"";let z=$e(s,W),Se=Math.max(1,Math.ceil(W/K)),je=(z-1)*K+1,Be=Math.min(W,z*K);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${n(t.id)}" data-asset-relation-section="${n(s)}" type="button" ${z<=1?"disabled":""}>Previous</button>
            <span>Showing ${je}-${Be} of ${W} - Page ${z} of ${Se}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${n(t.id)}" data-asset-relation-section="${n(s)}" type="button" ${z>=Se?"disabled":""}>Next</button>
          </div>
        `},_e=s=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${n(s)}" data-asset-id="${n(t.id)}" ${B(s)?"open":""}`,qe=L.find(s=>s.id===t.location_id)?.name||t.location||"No location set",We=J?J.name:"Top level equipment",Fe=t.status==="offline"?"status-blocked":t.status==="degraded"?"status-open":t.status==="watch"?"status-in_progress":"status-completed",Ue=t.status==="degraded"&&ee("open",Q.length)===0,F=l(),X=t.asset_type==="traveling_machine";return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${t.status}">${n(C(t.status))}</span>
              <span class="chip">${n(S(t.asset_type))}</span>
              ${t.asset_code?`<span class="chip">${n(t.asset_code)}</span>`:""}
              ${t.asset_tag?`<span class="chip">Asset tag: ${n(t.asset_tag)}</span>`:""}
              ${t.manufacturer?`<span class="chip">${n(t.manufacturer)}</span>`:""}
              ${t.model?`<span class="chip">${n(t.model)}</span>`:""}
              ${t.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${n(t.name)}</h2>
            <p>${n(t.location||"No area / spot set")}</p>
            ${J?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${n(J.id)}" type="button">${n(J.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${Fe}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${n(C(t.status))}</strong>
              <small>${t.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${n(qe)}</strong>
              <small>${t.location?n(t.location):"No area / spot set"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${n(We)}</strong>
              <small>${J?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${re.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${re.length}</strong>
              <small>${re.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${G.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${G.length}</strong>
              <small>${G.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${ee("open",Q.length)===0?"empty":""}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong ${de("open")}>${ee("open",Q.length)}</strong>
              <small>Active work tied to this equipment</small>
            </button>
            <button class="command-card command-photo ${$.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${$.length}</strong>
              <small>${$.length?"Machine files on record":"No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${Ue&&F?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${n(t.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${q?q():""}

          ${F?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${t.id}" type="button">Quick Fix for this equipment</button>
            ${!X&&e.canRelocateEquipment?.()?`<details class="equipment-actions"><summary>Actions</summary><button class="secondary-button" data-relocate-equipment="${n(t.id)}" type="button">Relocate Equipment</button></details>`:""}
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${$.length} file${$.length===1?"":"s"}</span>
            </div>
            ${F?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${n(t.id)}">
              <label>Attach photos or files<input name="document" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <p class="error-text" data-asset-document-error="${n(t.id)}">${v?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${v?"":"disabled"}>Review Attachments</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${$.map(s=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(s.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(s.content_type||"").startsWith("image/")&&s.signedUrl?`<img src="${n(s.signedUrl)}" alt="${n(s.original_file_name||s.file_name||t.name)}">`:`<strong>${n(k(s.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${n(k(s.document_type))}</strong>
                      <span>${n(s.original_file_name||s.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(s.content_type||"").startsWith("image/")&&s.signedUrl?`<img src="${n(s.signedUrl)}" alt="${n(s.original_file_name||s.file_name||t.name)}">`:`<div class="asset-file-document-preview">${n(k(s.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${n(s.content_type||"file")}</span>
                      <a class="secondary-button" href="${n(s.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${F?`<button class="text-button danger-link" data-delete-asset-document="${n(s.id)}" data-asset-document-path="${n(s.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${X&&F?`<form class="form-grid relationship-detail asset asset-move" id="move-traveling-asset-form"
            data-asset-id="${n(t.id)}" data-company-id="${n(t.company_id)}" data-from-location="${n(t.location_id||"")}" data-travel-revision="${Number(t.traveling_revision||0)}">
            <h3>Change current facility</h3>
            <p>Currently at ${n(qe)}. All work history, part links, files and financials stay with this machine. Existing orders keep their original facility and assigned person. Warehouse stock stays at its current facility.</p>
            <label>New facility<select name="destination_id" required>
              <option value="">Choose facility</option>
              ${L.filter(s=>s.id!==t.location_id).map(s=>`<option value="${n(s.id)}">${n(s.name)}</option>`).join("")}
            </select></label>
            <button class="secondary-button" type="submit">Change location</button>
            <p class="error-text" role="alert" data-transfer-error></p>
          </form>`:""}
          ${F?`<form class="form-grid" id="edit-asset-form" data-travel-revision="${Number(t.traveling_revision||0)}">
            <label>Equipment name<input name="name" required value="${n(t.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${n(t.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${n(t.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${n(t.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${n(t.model||"")}"></label>
            <label>Type
              <select name="asset_type" ${X&&!e.canRelocateEquipment?.()?"disabled":""}>
                ${Y.filter(s=>s!=="traveling_machine"||X||e.canRelocateEquipment?.()).map(s=>`<option value="${s}" ${s===(t.asset_type||"machine")?"selected":""}>${S(s)}</option>`).join("")}
              </select>
              <span class="muted">Traveling Equipment is for routine sharing, not a one-time relocation.</span>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id" ${X?"disabled":""}>
                <option value="">Top level equipment</option>
                ${R(t.parent_asset_id||"",t.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" disabled>
                ${N(t.location_id||U)}
              </select>
              <span class="muted">${X?"Use Change current facility above.":e.canRelocateEquipment?.()?"Actions: Relocate Equipment.":"A manager or admin can relocate this equipment."}</span>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">No area / spot set</option>
                ${x(t.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(s=>`<option value="${s}" ${s===t.status?"selected":""}>${C(s)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${t.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${re.map(s=>`
                <article class="mini-work-order" data-open-asset="${n(s.id)}">
                  <strong>${n(s.name)}</strong>
                  <span>${n(S(s.asset_type))} - ${n(C(s.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${_e("open-work")} id="asset-open-work-target">
            <summary>Open Work <span ${de("open")}>${ee("open",Q.length)}</span></summary>
            <div class="mini-list">
              ${B("open-work")?V?te(Q,"open-work").map(M).join("")||'<p class="muted">No open work for this equipment.</p>':se:'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${B("open-work")&&V?ne("open-work",Q.length):""}
          </details>

          <details ${_e("completed-history")}>
            <summary>Completed History <span ${de("completed")}>${ee("completed",ie.length)}</span></summary>
            <div class="mini-list">
              ${B("completed-history")?V?te(ie,"completed-history").map(M).join("")||'<p class="muted">No completed work yet.</p>':se:'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${B("completed-history")&&V?ne("completed-history",ie.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${we.length} event${we.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${n(t.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${h?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure" data-asset-pm-schedules="${n(t.id)}">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${e.getSchedulesReady?.()===!1?"Unavailable":`${oe.length} schedule${oe.length===1?"":"s"}`}</span>
                ${F?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${F&&e.canCreatePreventiveSchedule?.()===!1?e.renderMaintenanceLoading():""}
            ${F&&e.canCreatePreventiveSchedule?.()!==!1?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${n(t.id)}">
              <input name="title" required placeholder="PM for ${n(t.name)}">
              <input name="asset_id" type="hidden" value="${n(t.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${b?b():'<option value="">No procedure checklist</option>'}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${o()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
              <button class="secondary-button" type="reset">Clear Form</button>
            </form>`:""}
            <div class="mini-list">
              ${e.getSchedulesReady?.()===!1?'<p class="error-text" role="alert">PM schedules could not be loaded.</p>':te(oe,"pm-schedules").map(s=>`<article><strong>${n(s.title)}</strong><span>${n(s.frequency||"")} - next due ${n(s.next_due_at||"")}</span>${s.active===!1?'<span class="chip">Inactive</span>':""}</article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
            ${ne("pm-schedules",oe.length)}
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${n(t.id)}" ${B("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${G.length}</span></summary>
            <div class="panel-header compact">
              ${F?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${p?`
              ${F?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${n(t.id)}">
                <label>Part
                  <select name="part_id" ${le.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${le.map(s=>`<option value="${n(s.id)}">${n(s.name)}${s.sku?` - ${n(s.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${le.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${n(t.id)}"></p>
              <div class="mini-list">
                ${te(G,"linked-parts").map(s=>`<article>
                  <strong>${n(s.parts?.name||"Part")}</strong>
                  <span>${n(s.parts?.sku||"No SKU")} - recommended qty ${n(s.quantity_recommended||1)}${s.note?` - ${n(s.note)}`:""}</span>
                  ${F?`<button class="text-button danger-link" data-remove-asset-part="${n(s.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${ne("linked-parts",G.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${n(t.id)}" ${B("parts-used")?"open":""}>
            <summary>Parts Used History <span>${V?ce.length:"Not loaded"}</span></summary>
            <div class="mini-list">
              ${B("parts-used")?V?te(ce,"parts-used").map(s=>`<article><strong>${n(s.parts?.name||"Part")}</strong><span>${s.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':se:'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${B("parts-used")&&V?ne("parts-used",ce.length):""}
          </details>

          ${F?d(t):""}
        </div>
      `}function d(c){let _=e.getWorkOrders(),t=e.getPreventiveSchedules(),P=e.getAssets(),D=e.getActiveAssetId(),r=_.filter(I=>I.asset_id===c.id).length,f=t.filter(I=>I.asset_id===c.id).length,p=P.filter(I=>I.parent_asset_id===c.id).length,$=e.getMaintenanceRequests().filter(I=>I.asset_id===c.id).length,v=T({workOrders:r,children:p,schedules:f,requests:$}),h=e.getPendingDeleteAssetId()===D;return O()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${v||`This permanently removes "${n(c.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${v?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:h?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${n(c.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${n(c.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${n(c.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function k(c){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[c]||"File"}return{renderAssetDetail:i,renderAssetHistoryScreen:a,renderCreateAssetForm:u}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:g},typeof ye<"u"&&(ye.exports={createAssetDetailDisplayHelpers:g})})()});var it=ae(Pe()),ct=ae(Ee()),lt=ae(Ae()),dt=ae(Me()),ut=ae(Re());var Je={running:"Running",watch:"Watch",degraded:"Degraded",offline:"Offline / Down"};function De(g){let e=g.documentRef,m=g.escapeHtml,w,A,n;function S(){w&&(w.close(),w.remove(),w=null),A?.isConnected&&A.focus(),A=null}function R(C){return[...C?.elements||[]].some(M=>!M.disabled&&(M.type==="checkbox"?M.checked!==M.defaultChecked:M.tagName==="SELECT"?M.selectedIndex!==Math.max(0,[...M.options].findIndex(T=>T.defaultSelected)):["INPUT","TEXTAREA"].includes(M.tagName)&&M.value!==M.defaultValue))}async function N(C,M){if(!g.canRelocate())return;if(R(e.querySelector("#edit-asset-form"))){g.showNotice("Save equipment edits before relocating.","warning");return}S(),A=M,n=g.getContext();let T=g.getCompanyId(),O=n;w=e.createElement("dialog"),w.className="travel-dialog relocation-dialog",w.setAttribute("aria-labelledby","relocation-heading");let l=w,q,b=new Set,o="",u=1,y=!1,E=!1,a=()=>w===l&&O===g.getContext()&&g.canRelocate(),i=()=>q.nodes.find(v=>v.id===C),d=()=>q.nodes.filter(v=>v.parent_asset_id===C).sort((v,h)=>v.name.localeCompare(h.name)||v.id.localeCompare(h.id)),k=()=>q.nodes.filter(v=>v.id===C||b.has(v.branch_id)),c=()=>q.nodes.filter(v=>v.id!==C&&!b.has(v.branch_id)),_='<h2 id="relocation-heading">Relocate Equipment</h2>',t='<button type="button" class="secondary-button" data-relocate-cancel>Cancel</button>',P=v=>`<ul class="relocation-names">${v.map(h=>`<li>${m(h.name)}</li>`).join("")}</ul>`;function D(v){l.innerHTML=`${_}${v}`,l.querySelector("[data-relocate-cancel]")?.addEventListener("click",()=>{y||S()})}function r(){if(!a()){S();return}let v=d(),h=Math.max(1,Math.ceil(v.length/12));u=Math.min(u,h);let I=i();D(`<h3>${m(I.name)}</h3><p class="muted">Current facility: <strong class="asset-facility">${m(I.facility||"Unassigned")}</strong> / ${m(Je[I.status]||I.status)}</p>
        <form data-relocate-form><label for="relocation-destination">New facility</label><select id="relocation-destination" required><option value="">Choose facility</option>${g.getLocations().filter(L=>L.id!==I.location_id).map(L=>`<option value="${m(L.id)}" ${o===L.id?"selected":""}>${m(L.name)}</option>`).join("")}</select>
        <fieldset class="relocation-branches"><legend>Attached equipment to move</legend>${v.length?v.slice((u-1)*12,u*12).map(L=>{let U=q.nodes.filter(Y=>Y.branch_id===L.id&&Y.id!==L.id);return`<div class="relocation-branch"><label class="relocation-choice"><input type="checkbox" data-relocate-branch="${m(L.id)}" ${b.has(L.id)?"checked":""}><span>${m(L.name)}${U.length?`<small>Plus ${U.length} attached record${U.length===1?"":"s"}</small>`:""}</span></label>${U.length?`<details><summary>Attached records</summary>${P(U)}</details>`:""}</div>`}).join(""):'<p class="muted">No attached equipment.</p>'}</fieldset>
        ${h>1?`<nav class="travel-pagination" aria-label="Attached equipment pages"><button type="button" class="secondary-button" data-relocate-page="-1" ${u===1?"disabled":""}>Previous</button><span>${u} / ${h}</span><button type="button" class="secondary-button" data-relocate-page="1" ${u===h?"disabled":""}>Next</button></nav>`:""}
        <p class="relocation-impact" data-relocate-impact></p><p class="muted">Unchecked branches stay at their current facility and are detached from this equipment, with history recorded.</p>
        ${q.parent?`<p class="relocation-impact">${m(I.name)} will be detached from ${m(q.parent.name)}.</p>`:""}
        <p class="muted">Condition, history, files, part links and financial records are retained. Existing work orders and stock keep their facilities. PM follows the equipment. Area / spot is cleared for moved equipment.</p>
        <div class="travel-dialog-actions">${t}<button type="submit" class="primary-button">Review Relocation</button></div></form>`);let H=()=>{l.querySelector("[data-relocate-impact]").textContent=`${k().length} moving / ${c().length} staying`};H(),l.querySelector("#relocation-destination").onchange=L=>{o=L.target.value},l.querySelectorAll("[data-relocate-branch]").forEach(L=>{L.onchange=()=>{L.checked?b.add(L.dataset.relocateBranch):b.delete(L.dataset.relocateBranch),H()}}),l.querySelectorAll("[data-relocate-page]").forEach(L=>{L.onclick=()=>{u+=Number(L.dataset.relocatePage),r()}}),l.querySelector("form").onsubmit=L=>{L.preventDefault(),a()&&o&&f()},l.querySelector("#relocation-destination").focus()}function f(){let v=g.getLocations().find(h=>h.id===o);!v||!a()||(D(`<h3>${m(i().name)}</h3><p>Relocate from <strong>${m(i().facility||"Unassigned")}</strong> to <strong class="asset-facility">${m(v.name)}</strong>?</p>
        <section><h3>Moving (${k().length})</h3>${P(k())}</section>
        ${c().length?`<section><h3>Staying (${c().length})</h3>${P(c())}<p class="relocation-impact">${d().filter(h=>!b.has(h.id)).map(h=>m(h.name)).join(", ")} will be detached from ${m(i().name)}. Their own attached records stay linked.</p></section>`:""}
        ${q.parent?`<p class="relocation-impact">${m(i().name)} will be detached from ${m(q.parent.name)}.</p>`:""}
        <p class="muted">These changes are recorded in equipment history. Existing work orders, stock and financial records will not be relocated. Condition is unchanged.</p>
        <p role="alert" data-relocate-error></p><div class="travel-dialog-actions">${t}<button type="button" class="secondary-button" data-relocate-back>Back</button><button type="button" class="primary-button" data-relocate-save>Relocate Equipment</button></div><button type="button" class="secondary-button" data-relocate-retry hidden>Review Again</button>`),l.querySelector("[data-relocate-back]").onclick=r,l.querySelector("[data-relocate-retry]").onclick=$,l.querySelector("[data-relocate-save]").onclick=p,l.querySelector("[data-relocate-back]").focus())}async function p(){if(y||E||!a())return;y=!0,l.querySelectorAll("button").forEach(h=>{h.disabled=!0});let v=l.querySelector("[data-relocate-error]");v.textContent="Saving relocation...";try{let h=await g.timeout(g.client().rpc("relocate_equipment",{p_company_id:T,p_asset_id:C,p_location_id:o,p_move_branch_ids:[...b],p_review_token:q.token}),"The response timed out. Review again to check whether the relocation completed.",15e3);if(!a())return;if(h.error)throw h.error;if(!Array.isArray(h.data?.assets)||!Array.isArray(h.data?.events))throw Error("Could not verify the result. Review again before retrying.");y=!1,S(),g.onSaved(h.data),g.showNotice("Equipment relocated. History and linked records retained.")}catch(h){if(!a())return;E=!0,v.textContent=h.message||"Could not relocate equipment. Review again before retrying.",l.querySelector("[data-relocate-retry]").hidden=!1}finally{y=!1,a()&&l.querySelectorAll("button").forEach(h=>{h.disabled=h.hasAttribute("data-relocate-save")||h.hasAttribute("data-relocate-back")})}}async function $(){if(a()){y=!1,E=!1,o="",u=1,D(`<p role="status">Loading equipment and attached records...</p>${t}`);try{let v=await g.timeout(g.client().rpc("equipment_relocation_review",{p_company_id:T,p_asset_id:C}),"Equipment review took too long. Try again.",15e3);if(!a())return;if(v.error)throw v.error;if(!Array.isArray(v.data?.nodes)||!v.data.nodes.some(h=>h.id===C)||!v.data.token)throw Error("Could not verify the equipment hierarchy.");q=v.data,b=new Set(d().map(h=>h.id)),r()}catch(v){if(!a())return;D(`<p role="alert">${m(v.message||"Equipment review failed.")}</p><div class="travel-dialog-actions">${t}<button type="button" class="secondary-button" data-relocate-retry>Review Again</button></div>`),l.querySelector("[data-relocate-retry]").onclick=$}}}l.addEventListener("cancel",v=>{v.preventDefault(),y||S()}),e.body.append(l),l.showModal(),await $()}function x(){w&&n!==g.getContext()&&S(),e.querySelectorAll("[data-relocate-equipment]").forEach(C=>{C.onclick=()=>N(C.dataset.relocateEquipment,C)})}return{bind:x,dispose:S}}function Oe({documentRef:g,getScope:e,getCompanyId:m,client:w,withOperationTimeout:A,openWorkOrder:n}){let S,R=new Map,N=new Map;function x(){let b=e();return S!==b&&(S=b,R.clear(),N.clear()),b}function C(b){return x(),R.get(b)}function M(){for(let b of g.querySelectorAll("[data-procedure-links]")){let o=C(b.dataset.procedureLinks);b.textContent=o?.status==="ready"?`${o.work_order_count} linked work orders`:o?.status==="error"?"Work links unavailable":"Loading work links...";let u=b.closest(".procedure-card"),y=u?.querySelector("[data-procedure-schedules]");y&&(y.textContent=o?.status==="ready"?`${o.schedule_count} PM schedules`:o?.status==="error"?"PM links unavailable":"Loading PM links...");let E=u?.querySelector("[data-delete-procedure]");if(E){let a=o?.status==="ready"&&(o.work_order_count>0||o.schedule_count>0);E.disabled=o?.status!=="ready"||a,E.textContent=a?"Kept For Traceability":o?.status==="ready"?"Delete Checklist":"Checking Links..."}}}async function T(b){let o=x(),u=m(),y=[...new Set(b)].filter(E=>!R.has(E));if(!y.length)return M();y.forEach(E=>R.set(E,{status:"loading"})),M();try{let{data:E,error:a}=await A(w().rpc("get_procedure_link_counts",{p_company_id:u,p_template_ids:y}),"Procedure links timed out.",12e3);if(o!==x())return;if(a)throw a;for(let i of y){let d=E?.find(k=>k.procedure_template_id===i);!d||![d.work_order_count,d.schedule_count].every(k=>(typeof k=="number"||typeof k=="string"&&/^\d+$/.test(k))&&Number.isSafeInteger(Number(k))&&Number(k)>=0)?R.set(i,{status:"error"}):R.set(i,{...d,status:"ready"})}}catch{o===x()&&y.forEach(E=>R.set(E,{status:"error"}))}o===x()&&M()}function O(b,o,u){let y=g.createElement(b);return o!==void 0&&(y.textContent=o),u&&(y.className=u),y}async function l(b,o=1){let u=x(),y=m(),E=b.dataset.pmHistory,a=b.querySelector("[data-pm-history-content]");if(!a)return;let i={};N.set(E,i);let d=()=>u===x()&&N.get(E)===i&&b.isConnected;a.textContent="Loading work history...";try{let{data:k,count:c,error:_}=await A(w().from("work_orders").select("id,title,status,due_at,completed_at,preventive_due_at",{count:"exact"}).eq("company_id",y).eq("preventive_source_id",E).order("created_at",{ascending:!1}).order("id").range((o-1)*12,o*12-1),"PM work history timed out.",12e3);if(!d())return;if(_)throw _;if(!Number.isInteger(c)||c<0)throw Error("PM history count unavailable.");if(o>1&&(o-1)*12>=c)return l(b,Math.max(1,Math.ceil(c/12)));if(!Array.isArray(k)||k.length!==Math.min(12,c-(o-1)*12)||new Set(k.map(P=>P.id)).size!==k.length||k.some(P=>!P.id||typeof P.status!="string"))throw Error("PM work history was incomplete. Try again.");a.replaceChildren();for(let P of k||[]){let D=O("article",void 0,"mini-work-order");D.dataset.miniWorkOrder=P.id;let r=O("button",P.title,"text-button");r.type="button",r.addEventListener("click",async()=>{r.disabled=!0;try{await n(P.id)}catch{a.append(O("p","Could not open this work order. Try again.","error-text"))}finally{r.disabled=!1}}),D.append(r,O("span",`${P.status.replaceAll("_"," ")} - Due ${P.due_at||P.preventive_due_at||"unset"}`)),a.append(D)}c||a.append(O("p","No linked generated work orders.","muted"));let t=O("div",void 0,"list-pagination");t.append(O("span",c?`Showing ${(o-1)*12+1}-${Math.min(o*12,c)} of ${c}`:"0 work orders"));for(let[P,D,r,f]of[["prev","Previous",o-1,o===1],["next","Next",o+1,o*12>=c]]){let p=O("button",D,"secondary-button");p.type="button",p.dataset.pmHistoryPage=P,p.disabled=f,p.addEventListener("click",()=>l(b,r)),t.append(p)}a.append(t)}catch(k){if(!d())return;a.replaceChildren(O("p",k.message||"PM work history unavailable.","error-text"));let c=O("button","Retry","secondary-button");c.type="button",c.addEventListener("click",()=>l(b,o)),a.append(c)}}function q(){x(),T([...g.querySelectorAll("[data-procedure-links]")].map(b=>b.dataset.procedureLinks));for(let b of g.querySelectorAll("[data-pm-history]"))b.dataset.pmBound||(b.dataset.pmBound="true",b.addEventListener("toggle",()=>{b.open&&l(b)}))}return{bind:q,getProcedureCounts:C,loadCounts:T,loadHistory:l}}var ge="maintainops.checklistResponseDraft.v1:",Ne="[data-step-result][data-work-order-id]";var be=new WeakMap;function Ie({documentRef:g=document,getScope:e,storage:m=()=>sessionStorage,now:w=Date.now}){if(be.has(g))return be.get(g);let A=new Map,n=new WeakMap,S=new Map,R=new WeakMap,N=0,x=0,C=()=>String(e()||""),M=r=>r.type==="checkbox"?"checkbox":"value",T=r=>r.type==="checkbox"?r.checked:r.value,O=r=>r?.matches?.(Ne)&&["INPUT","TEXTAREA","SELECT"].includes(r.tagName)&&!["hidden","file","password","button","submit","reset"].includes(r.type)&&r.dataset.workOrderId&&r.dataset.stepResult,l=()=>[...g.querySelectorAll(Ne)].filter(O),q=(r,f,p)=>ge+JSON.stringify([r,f,p]);function b(r){A.delete(r);try{m().removeItem(r)}catch{}for(let[f,p]of S)p.key===r&&(p.node.remove(),S.delete(f))}function o(r){if(!A.has(r))try{let $=m().getItem(r);$&&$.length<=1e6&&A.set(r,JSON.parse($))}catch{}let f=A.get(r),p=w();return!f||!Number.isFinite(f.at)||f.at>p||p-f.at>=864e5||!Number.isSafeInteger(f.revision)||f.revision<1||!(f.kind==="checkbox"?typeof f.value=="boolean":f.kind==="value"&&typeof f.value=="string")?(b(r),null):(N=Math.max(N,f.revision),f)}function u(r){return r.type==="checkbox"?r.defaultChecked:r.tagName==="SELECT"?[...r.options].find(f=>f.defaultSelected)?.value||r.options[0]?.value||"":r.defaultValue}function y(r,f=!1){if(!O(r)||!r.isConnected)return null;let p=C();if(!p)return null;let $=n.get(r),v=q(p,r.dataset.workOrderId,r.dataset.stepResult);return $&&($.key!==v||$.epoch!==x)?null:($||($={key:v,scope:p,epoch:x,baseline:f?T(r):u(r)},n.set(r,$)),$)}function E(){for(let[r,f]of S)r.isConnected||(f.node.remove(),S.delete(r))}function a(r,f){let p=S.get(r);if(p?.node.isConnected)return p.button;let $=g.createElement("span");$.dataset.checklistResponseDraft="";let v=g.createElement("small");v.className="muted",v.textContent="Unsaved answer";let h=g.createElement("button");return h.type="button",h.className="secondary-button small",h.dataset.checklistDraftRetry="",h.textContent="Save answer",$.append(v,g.createTextNode(" "),h),(r.closest("label")||r).insertAdjacentElement("afterend",$),R.set(h,r),S.set(r,{key:f.key,node:$,button:h}),h}function i(r,f=!1){let p=y(r);if(!p)return null;let $=T(r),v=o(p.key),h=M(r);if(!v&&!f&&$===p.baseline)return null;let I=v;if(!I||I.value!==$||I.kind!==h){I={at:w(),revision:++N,kind:h,value:$},A.set(p.key,I);try{m().setItem(p.key,JSON.stringify(I))}catch{}}return a(r,p),Object.freeze({key:p.key,revision:I.revision,epoch:x})}function d(){E();for(let r of l())i(r)}function k(){E();let r=[];for(let f of l()){let p=y(f,!0);if(!p)continue;let $=o(p.key);if($){if($.kind!==M(f)){b(p.key);continue}$.kind==="checkbox"?f.checked=$.value:f.value=$.value,r.push(a(f,p))}}return r}function c(r){if(!r||r.epoch!==x)return!1;for(let p of l())n.get(p)?.key===r.key&&i(p);let f=o(r.key);if(!f||f.revision!==r.revision)return!1;for(let p of l()){let $=n.get(p);$?.key===r.key&&$.epoch===x&&($.baseline=f.value)}return b(r.key),!0}function _(){let r=new Set(A.keys());try{let f=m();for(let p=0;p<f.length;p++)f.key(p)?.startsWith(ge)&&r.add(f.key(p))}catch{}return r}function t(r){let f=C();if(!f)return!1;for(let p of _()){let $;try{$=JSON.parse(p.slice(ge.length))}catch{b(p);continue}if(Array.isArray($)&&$[0]===f&&$[1]===r&&o(p))return!0}return!1}function P(){x++;for(let r of _())b(r);A.clear();for(let r of S.values())r.node.remove();S.clear()}for(let r of["input","change"])g.addEventListener(r,f=>{O(f.target)&&!f.target.disabled&&i(f.target)},!0);g.addEventListener("click",r=>{let f=r.target.closest?.("[data-checklist-draft-retry]"),p=f&&R.get(f);p&&(r.preventDefault(),!(p.disabled||!y(p))&&p.dispatchEvent(new g.defaultView.Event("change",{bubbles:!0})))}),g.defaultView?.addEventListener("pagehide",d),g.addEventListener("visibilitychange",()=>{g.hidden&&d()});let D={capture:d,restore:k,snapshot:r=>i(r,!0),clear:c,reset:P,hasDraft:t};return be.set(g,D),D}window.MaintainOpsEquipmentRelocation={createEquipmentRelocation:De};window.MaintainOpsMaintenanceRelations={createMaintenanceRelations:Oe};window.MaintainOpsChecklistResponseDrafts={createChecklistResponseDrafts:Ie};})();
//# sourceMappingURL=maintenanceFeature.b4623bdb8e.js.map
