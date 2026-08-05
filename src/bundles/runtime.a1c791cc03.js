(()=>{var Cn=Object.create;var kt=Object.defineProperty;var $n=Object.getOwnPropertyDescriptor;var Pn=Object.getOwnPropertyNames;var An=Object.getPrototypeOf,Rn=Object.prototype.hasOwnProperty;var Q=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var En=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Pn(e))!Rn.call(l,r)&&r!==n&&kt(l,r,{get:()=>e[r],enumerable:!(t=$n(e,r))||t.enumerable});return l};var B=(l,e,n)=>(n=l!=null?Cn(An(l)):{},En(e||!l||!l.__esModule?kt(n,"default",{value:l,enumerable:!0}):n,l));var _t=Q((Wn,Te)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,r=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},f=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),a=f(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:a,workspaceLoadPending:!1,workspaceLoadWasHidden:r?.visibilityState==="hidden",navigationStartedAt:f(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},d=new Map,m=0;function c(W){if(W==null||W==="")return null;let w=Number(W);return Number.isFinite(w)&&w>=0?w:null}function o(){let W=s.connection||s.mozConnection||s.webkitConnection,w=t?.matchMedia?.("(pointer: coarse)")?.matches,P=c(s.deviceMemory),R=c(s.hardwareConcurrency),E=P!==null&&P<=4||R!==null&&R<=4||w?"constrained":"standard",C=c(t?.innerWidth);return{source:"browser",device_tier:E,viewport_class:C!==null&&C<720?"mobile":C!==null&&C<1100?"tablet":"desktop",connection_type:String(W?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!W?.saveData}}function p(W={}){let w={...o(),measurement_version:n,...W};return Object.fromEntries(Object.entries(w).filter(([,P])=>P!=null&&P!==""))}function g(W=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},W))}function u(W,w,P={},R={}){if(!l.has(W))return!1;let E=c(w);if(E===null)return!1;let C=Number(E.toFixed(W==="cls"?4:2));return i.latest[W]={metric:W,value:C,unit:e[W],context:p(P),measuredAt:new Date().toISOString()},R.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:W,value:C,unit:e[W],context:p(P)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(R.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let W=i.companyId,w=i.pending.splice(0,20),P=null;try{P=(await i.client.rpc("record_app_performance_samples",{target_company_id:W,samples:w})).error||null}catch(E){P=E}if(!P)return i.pending.length&&g(1e3),!0;i.companyId===W&&i.pending.unshift(...w);let R=String(P.message||P).toLowerCase();return i.disabledUntil=Date.now()+(R.includes("could not find")||R.includes("does not exist")?3e5:6e4),!1}function y({client:W,companyId:w}){if(i.client=W||null,i.companyId=w||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,u("session_start",1,{source:"workspace"},{immediate:!0});let P=s.connection||s.mozConnection||s.webkitConnection;c(P?.downlink)!==null&&u("connection_downlink_mbps",P.downlink,{source:"browser-estimate"}),c(P?.rtt)!==null&&u("connection_rtt_ms",P.rtt,{source:"browser-estimate"})}g(250)}}function b(){i.workspaceStartedAt=f(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=r?.visibilityState==="hidden"}function k(W){if(!W)return;if(i.workspaceCompanies.has(W)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(W);let w=!i.workspaceLoadWasHidden&&r?.visibilityState!=="hidden";u("workspace_ready_ms",f()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:w}),i.workspaceLoadPending=!1,i.latest.cls||u("cls",m,{source:"performance-observer"},{persist:!1}),w&&t?.setTimeout?.(()=>A(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function A(W=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let w=new Set(W);Object.values(i.latest).filter(P=>w.has(P.metric)).forEach(P=>{let R=P.metric==="inp_ms";(R?i.lastPersistedInpValue===P.value:i.persistedVitals.has(P.metric))||u(P.metric,P.value,{source:"performance-observer"})&&(R?i.lastPersistedInpValue=P.value:i.persistedVitals.add(P.metric))})}function $(W=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,A(["inp_ms"])},W))}function O(){i.navigationStartedAt=f()}function q(W){let w=Number(W);return r?.visibilityState==="hidden"||Number.isFinite(w)&&i.lastHiddenAt>=w}function v(W,w=i.navigationStartedAt){u("section_navigation_ms",f()-w,{source:String(W||"workspace").slice(0,48)},{persist:!q(w)})}function S(W,w,P=null){u("query_latency_ms",f()-w,{source:String(W||"query").slice(0,48)},{persist:!q(w)}),P&&u("client_error",1,{source:`query:${String(W||"unknown").slice(0,36)}`},{immediate:!0})}function _(W={}){let w={source:"performance-room",quality_tier:W.qualityTier||"unknown"};Object.entries({spatial_ready_ms:W.readyMs,spatial_fps:W.fps,spatial_frame_ms:W.frameMs,spatial_slow_frame_pct:W.slowFramePercent,spatial_draw_calls:W.drawCalls,spatial_triangles:W.triangles,spatial_geometries:W.geometries,spatial_textures:W.textures,webgl_context_loss:Number(W.contextLosses)>0?W.contextLosses:void 0}).forEach(([P,R])=>{c(R)!==null&&u(P,R,w)}),g(500)}function D(){return{latest:{...i.latest},connection:o(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function U(W,w,P={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(W)))try{new PerformanceObserver(E=>w(E.getEntries())).observe({type:W,...P})}catch{}}U("paint",W=>{let w=W.find(P=>P.name==="first-contentful-paint");w&&u("fcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),U("largest-contentful-paint",W=>{let w=W.at(-1);w&&u("lcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),U("layout-shift",W=>{W.forEach(w=>{w.hadRecentInput||(m+=w.value)}),u("cls",m,{source:"performance-observer"},{persist:!1})}),U("event",W=>{W.forEach(P=>{P.interactionId&&d.set(P.interactionId,Math.max(d.get(P.interactionId)||0,P.duration))});let w=[...d.values()].sort((P,R)=>R-P);w.length&&(u("inp_ms",w[Math.min(Math.floor(w.length/50),10)],{source:"performance-observer"},{persist:!1}),$())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>u("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>u("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=f(),u("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&u("reconnect_ms",f()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),r?.addEventListener?.("visibilitychange",()=>{r.visibilityState==="hidden"&&(i.lastHiddenAt=f(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),A(),h())});let T={beginWorkspaceLoad:b,configure:y,flush:h,markNavigationStart:O,markWorkspaceReady:k,record:u,recordQueryLatency:S,recordSectionNavigation:v,recordSpatial:_,snapshot:D};typeof window<"u"&&(window.MaintainOpsAppTelemetry=T),typeof Te<"u"&&(Te.exports=T)})()});var St=Q((xn,De)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,r){let s=String(n||"");return!(!l(t)&&!l(r)||s==="TOKEN_REFRESHED"&&l(t)&&l(t)===l(r))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof De<"u"&&(De.exports={shouldRenderForAuthEvent:e})})()});var qt=Q((Mn,Ie)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(a,i,d){if(!a||!a.getItem)return d;let m=a.getItem(i);return m??d}function n(a,i){let d=Number(e(a,i,"1"));return Number.isFinite(d)&&d>0?d:1}function t(a,i,d){!a||!a.setItem||a.setItem(i,String(d))}function r(a,i){try{let d=JSON.parse(e(a,i,"{}"));return d&&typeof d=="object"&&!Array.isArray(d)?d:{}}catch{return{}}}function s(a,i){!a||!a.removeItem||a.removeItem(i)}function f(a={}){let i=a.storage||localStorage,d={activeSection:e(i,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,l.activeMessageThreadId,""),searchQuery:e(i,l.searchQuery,""),workOrderSearchMode:e(i,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,l.messageThreadFilter,"all"),messageThreadsPage:n(i,l.messageThreadsPage),messageSearchQuery:e(i,l.messageSearchQuery,""),messageComposerWorkOrderId:e(i,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,l.managerDashboardUserId,""),managerDashboardMetric:e(i,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,l.myWorkFilter,"assigned"),workOrderFilter:e(i,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,l.workOrderPriorityFilter,"all"),workSort:e(i,l.workSort,"newest"),workGroup:e(i,l.workGroup,"none"),requestViewFilter:e(i,l.requestViewFilter,"active"),workOrderPage:n(i,l.workOrderPage),partsPage:n(i,l.partsPage),assetsPage:n(i,l.assetsPage),financialPage:n(i,l.financialPage),financialMissingFilter:e(i,l.financialMissingFilter,"all"),financialLocationFilter:e(i,l.financialLocationFilter,"all"),financialTypeFilter:e(i,l.financialTypeFilter,"all"),financialAreaFilter:e(i,l.financialAreaFilter,"all"),requestsPage:n(i,l.requestsPage),planningOverduePage:n(i,l.planningOverduePage),planningTodayPage:n(i,l.planningTodayPage),planningSoonPage:n(i,l.planningSoonPage),planningNoDuePage:n(i,l.planningNoDuePage),planningFollowUpPage:n(i,l.planningFollowUpPage),planningPmPage:n(i,l.planningPmPage),planningGroupOpen:r(i,l.planningGroupOpen),schedulesPage:n(i,l.schedulesPage),proceduresPage:n(i,l.proceduresPage),membersPage:n(i,l.membersPage),assetStatusFilter:e(i,l.assetStatusFilter,"all"),assetTypeFilter:e(i,l.assetTypeFilter,"all"),assetAreaFilter:e(i,l.assetAreaFilter,"all"),partInventoryFilter:e(i,l.partInventoryFilter,"all"),partSort:e(i,l.partSort,"default"),partSearchQuery:e(i,l.partSearchQuery,"")};e(i,l.sectionSplitDone,"")!=="true"&&d.activeSection==="work"&&(d.activeSection="mywork",t(i,l.activeSection,d.activeSection),t(i,l.sectionSplitDone,"true")),d.activeSection==="performance"&&(d.activeSection="mywork",t(i,l.activeSection,d.activeSection));let m=(o,p,g)=>{d[o]=p,g&&t(i,g,p)},c=(o,p)=>{m(o,1,p)};return{getActiveSection:()=>d.activeSection,setActiveSection:o=>m("activeSection",o,l.activeSection),getActiveWorkOrderId:()=>d.activeWorkOrderId,setActiveWorkOrderId:o=>m("activeWorkOrderId",o),getActiveAssetId:()=>d.activeAssetId,setActiveAssetId:o=>m("activeAssetId",o),getActivePartId:()=>d.activePartId,setActivePartId:o=>m("activePartId",o),getActiveMessageThreadId:()=>d.activeMessageThreadId,setActiveMessageThreadId:o=>m("activeMessageThreadId",o,l.activeMessageThreadId),getMessageThreadFilter:()=>d.messageThreadFilter,setMessageThreadFilter:o=>m("messageThreadFilter",o,l.messageThreadFilter),getMessageThreadsPage:()=>d.messageThreadsPage,setMessageThreadsPage:o=>m("messageThreadsPage",o,l.messageThreadsPage),resetMessageThreadsPage:()=>c("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>d.messageSearchQuery,setMessageSearchQuery:o=>m("messageSearchQuery",o,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>d.messageComposerWorkOrderId,setMessageComposerWorkOrderId:o=>m("messageComposerWorkOrderId",o,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>d.messageComposerOpen,setMessageComposerOpen:o=>m("messageComposerOpen",!!o),getManagerDashboardUserId:()=>d.managerDashboardUserId,setManagerDashboardUserId:o=>m("managerDashboardUserId",o||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>d.managerDashboardMetric,setManagerDashboardMetric:o=>m("managerDashboardMetric",o||"open",l.managerDashboardMetric),getSearchQuery:()=>d.searchQuery,setSearchQuery:o=>m("searchQuery",o,l.searchQuery),getWorkOrderSearchMode:()=>d.workOrderSearchMode,setWorkOrderSearchMode:o=>m("workOrderSearchMode",!!o,l.workOrderSearchMode),getActiveStatusFilter:()=>d.activeStatusFilter,setActiveStatusFilter:o=>m("activeStatusFilter",o),getMyWorkFilter:()=>d.myWorkFilter,setMyWorkFilter:o=>m("myWorkFilter",o,l.myWorkFilter),getWorkOrderFilter:()=>d.workOrderFilter,setWorkOrderFilter:o=>m("workOrderFilter",o,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>d.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:o=>{m("workOrderAssigneeFilter",o),o?t(i,l.workOrderAssigneeFilter,o):s(i,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>d.workOrderTypeFilter,setWorkOrderTypeFilter:o=>m("workOrderTypeFilter",o||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>d.workOrderPriorityFilter,setWorkOrderPriorityFilter:o=>m("workOrderPriorityFilter",o||"all",l.workOrderPriorityFilter),getWorkSort:()=>d.workSort,setWorkSort:o=>m("workSort",o,l.workSort),getWorkGroup:()=>d.workGroup,setWorkGroup:o=>m("workGroup",o||"none",l.workGroup),getRequestViewFilter:()=>d.requestViewFilter,setRequestViewFilter:o=>m("requestViewFilter",o,l.requestViewFilter),getWorkOrderPage:()=>d.workOrderPage,setWorkOrderPage:o=>m("workOrderPage",o,l.workOrderPage),resetWorkOrderPage:()=>c("workOrderPage",l.workOrderPage),getPartsPage:()=>d.partsPage,setPartsPage:o=>m("partsPage",o,l.partsPage),resetPartsPage:()=>c("partsPage",l.partsPage),getAssetsPage:()=>d.assetsPage,setAssetsPage:o=>m("assetsPage",o,l.assetsPage),resetAssetsPage:()=>c("assetsPage",l.assetsPage),getFinancialPage:()=>d.financialPage,setFinancialPage:o=>m("financialPage",o,l.financialPage),resetFinancialPage:()=>c("financialPage",l.financialPage),getFinancialMissingFilter:()=>d.financialMissingFilter,setFinancialMissingFilter:o=>m("financialMissingFilter",o||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>d.financialLocationFilter,setFinancialLocationFilter:o=>m("financialLocationFilter",o||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>d.financialTypeFilter,setFinancialTypeFilter:o=>m("financialTypeFilter",o||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>d.financialAreaFilter,setFinancialAreaFilter:o=>m("financialAreaFilter",o||"all",l.financialAreaFilter),getRequestsPage:()=>d.requestsPage,setRequestsPage:o=>m("requestsPage",o,l.requestsPage),resetRequestsPage:()=>c("requestsPage",l.requestsPage),getPlanningPage:o=>o==="overdue"?d.planningOverduePage:o==="today"?d.planningTodayPage:o==="soon"?d.planningSoonPage:o==="no-due"?d.planningNoDuePage:o==="follow-up"?d.planningFollowUpPage:o==="pm"?d.planningPmPage:1,setPlanningPage:(o,p)=>{o==="overdue"&&m("planningOverduePage",p,l.planningOverduePage),o==="today"&&m("planningTodayPage",p,l.planningTodayPage),o==="soon"&&m("planningSoonPage",p,l.planningSoonPage),o==="no-due"&&m("planningNoDuePage",p,l.planningNoDuePage),o==="follow-up"&&m("planningFollowUpPage",p,l.planningFollowUpPage),o==="pm"&&m("planningPmPage",p,l.planningPmPage)},getPlanningGroupOpen:(o,p=!1)=>Object.prototype.hasOwnProperty.call(d.planningGroupOpen,o)?!!d.planningGroupOpen[o]:!!p,setPlanningGroupOpen:(o,p)=>{d.planningGroupOpen={...d.planningGroupOpen,[o]:!!p},t(i,l.planningGroupOpen,JSON.stringify(d.planningGroupOpen))},getSchedulesPage:()=>d.schedulesPage,setSchedulesPage:o=>m("schedulesPage",o,l.schedulesPage),resetSchedulesPage:()=>c("schedulesPage",l.schedulesPage),getProceduresPage:()=>d.proceduresPage,setProceduresPage:o=>m("proceduresPage",o,l.proceduresPage),resetProceduresPage:()=>c("proceduresPage",l.proceduresPage),getMembersPage:()=>d.membersPage,setMembersPage:o=>m("membersPage",o,l.membersPage),resetMembersPage:()=>c("membersPage",l.membersPage),getAssetStatusFilter:()=>d.assetStatusFilter,setAssetStatusFilter:o=>m("assetStatusFilter",o,l.assetStatusFilter),getAssetTypeFilter:()=>d.assetTypeFilter,setAssetTypeFilter:o=>m("assetTypeFilter",o,l.assetTypeFilter),getAssetAreaFilter:()=>d.assetAreaFilter,setAssetAreaFilter:o=>m("assetAreaFilter",o,l.assetAreaFilter),getPartInventoryFilter:()=>d.partInventoryFilter,setPartInventoryFilter:o=>m("partInventoryFilter",o,l.partInventoryFilter),getPartSort:()=>d.partSort,setPartSort:o=>m("partSort",o||"default",l.partSort),getPartSearchQuery:()=>d.partSearchQuery,setPartSearchQuery:o=>m("partSearchQuery",o,l.partSearchQuery),snapshot:()=>({...d})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:f},typeof Ie<"u"&&(Ie.exports={createWorkspaceUiState:f})})()});var Ct=Q((Tn,be)=>{(function(){function l(r){return!!String(r?.production_action||"").trim()}function e(r){return l(r)&&r?.production_action_status==="open"}function n(r,s){return!r||!s?!1:r.assigned_to===s||e(r)&&r.production_action_assigned_to===s}function t(r){return e(r)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof be<"u"&&be.exports&&(be.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var $t=Q((Dn,we)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",r=>r.stopPropagation())}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof we<"u"&&we.exports&&(we.exports={bindWorkspaceProductionActionEvents:l})})()});var Pt=Q((In,ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function r(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(d=>d.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.checked=i.target.checked})}async function f(i){i.preventDefault();let d=i.target,m=d.querySelector("button[type='submit']"),c=n.querySelector("#completion-error"),o=e.getActiveWorkOrderId(),p=e.getWorkOrderById(o),g=e.getProcedureById(p?.procedure_template_id),u=g?e.requiredChecklistProgress(p,g):{done:0,total:0},h=e.productionActionCompletionMessage?.(p)||"";if(h){c&&(c.textContent=h),e.setWorkOrderActionWarning(o,h),e.showNotice(h,"warning");return}if(u.done<u.total){c&&(c.textContent=`Complete required checklist steps first (${u.done}/${u.total}).`);return}let y=new t(d),b=y.get("safety_devices_checked")==="on"||r(o)||e.hasCompletedSafetyDeviceCheck(p);if(e.requiresSafetyDeviceCheck(p)&&!b){c&&(c.textContent="Check safety devices before completing equipment work.");return}m.disabled=!0,m.textContent="Completing...",c&&(c.textContent="");try{let k={status:"completed",asset_id:p?.asset_id||null,actual_minutes:Number(y.get("actual_minutes"))||0,failure_cause:y.get("failure_cause")||null,resolution_summary:y.get("resolution_summary")||null,follow_up_needed:y.get("follow_up_needed")==="on",completion_notes:y.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(k),e.applySafetyCheckPayload(k,k.safety_check_required&&b),delete k.asset_id;let{error:A}=await e.withOperationTimeout(e.updateWorkOrderSafely(k,o),"Complete work save timed out. Check your connection and try again.",2e4);if(A){c&&(c.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(A)}`);return}let $=await e.withOperationTimeout(e.recordWorkOrderEvent(o,"completed",y.get("resolution_summary")||y.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(O=>O);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order completed, but history did not update: ${$.message}`:"Work order completed.",$?"warning":"success"),await e.render()}catch(k){c?c.textContent=`Could not complete work order: ${k.message||k}`:e.alertRef(k.message||k)}finally{m.disabled=!1,m.textContent="Complete Work Order"}}function a(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",f),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:a,completeWorkOrder:f,currentSafetyCheckboxCheckedForWorkOrder:r,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof ve<"u"&&ve.exports&&(ve.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var At=Q((Fn,ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,r=e.BlobCtor||Blob,s=e.alertRef||alert,f=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,a=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:q=>String(q||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:q=>String(q||"corrective").replaceAll("_"," "),d={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function m(q){return(e.getAssetDocumentsByAssetId?.()[q]||[]).filter(v=>String(v.content_type||"").startsWith("image/")||v.document_type==="machine_photo"||v.document_type==="nameplate")}function c(q){return m(q).map(v=>v.original_file_name||v.file_name||v.storage_path||v.id).filter(Boolean).join("; ")}function o(q,v){return q?.parent_asset_id&&v.get(q.parent_asset_id)?.name||""}function p(q){return e.getLocations?.().find(v=>v.id===q)?.name||""}function g(q){if(!q)return"";let v=e.getProfilesByUserId?.()[q];return v?.full_name||v?.email||q}function u(q){return String(p(q.location_id)||q.location_id||q.location||"")}function h(q){return{id:`financial:${q.id}`,financialRecord:q,name:q.archived_asset_name||"Deleted equipment",asset_type:q.archived_asset_type||"machine",asset_code:q.archived_asset_code||"",manufacturer:q.archived_manufacturer||"",model:q.archived_model||"",location_id:q.archived_location_id||"",location:q.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(q=>!q.asset_id).map(h)]}function b(q,v,S){let _=u(q).localeCompare(u(v));if(_)return _;let D=(d[q.asset_type||"machine"]||999)-(d[v.asset_type||"machine"]||999);return D||String(o(q,S)).localeCompare(String(o(v,S)))||String(q.location||"").localeCompare(String(v.location||""))||String(q.name||"").localeCompare(String(v.name||""))}function k(){let q=e.getAssets().filter(f),v=new Map(q.map(S=>[S.id,S]));return[...q].sort((S,_)=>b(S,_,v)).map(S=>({equipment_type:a(S.asset_type),name:S.name,parent_equipment:o(S,v),serial_number:S.asset_code||"",manufacturer:S.manufacturer||"",model:S.model||"",picture_id:c(S.id),picture_count:m(S.id).length,picture_status:m(S.id).length?"attached":"missing",facility:p(S.location_id)||S.location_id||"",area_department:S.location||"",status:S.status}))}function A(){let q=y(),v=new Map(q.map(_=>[_.id,_])),S=e.getAssetFinancialsByAssetId?.()||{};return[...q].sort((_,D)=>b(_,D,v)).map(_=>{let D=_.financialRecord||S[_.id]||{};return{operational_status:_.financialRecord?"deleted":"active",equipment_type:a(_.asset_type),name:_.name,parent_equipment:o(_,v),facility:p(_.location_id)||_.location_id||"",area_department:_.location||"",serial_number:_.asset_code||"",manufacturer:_.manufacturer||"",model:_.model||"",picture_status:m(_.id).length?"attached":"missing",asset_tag:D.asset_tag||"",acquisition_date:D.acquisition_date||"",acquisition_cost:D.acquisition_cost||"",depreciation_method:D.depreciation_method||"",useful_life_years:D.useful_life_years||"",current_book_value:D.current_book_value||"",tax_jurisdiction:D.tax_jurisdiction||"",ownership_status:D.ownership_status||"",in_service_date:D.in_service_date||"",disposal_date:D.disposal_date||"",disposal_notes:D.disposal_notes||"",gl_account_code:D.gl_account_code||"",cost_center:D.cost_center||"",finance_notes:D.finance_notes||"",needs_review:!!D.needs_review,last_reviewed_at:D.last_reviewed_at||"",reviewed_by:g(D.reviewed_by)}})}function $(){let q={work:{filename:"work-orders.csv",rows:e.getWorkOrders().map(S=>({title:S.title,status:S.status,priority:S.priority,type:i(S.type),equipment:S.assets?.name||"",assigned_to:e.assignmentLabel(S),due_at:S.due_at||"",completed_at:S.completed_at||"",actual_minutes:S.actual_minutes||0,failure_cause:S.failure_cause||"",resolution_summary:S.resolution_summary||"",follow_up_needed:!!S.follow_up_needed}))},assets:{filename:"equipment.csv",rows:k()},financial:{filename:"equipment-financial.csv",rows:A()},requests:{filename:"maintenance-requests.csv",rows:e.getMaintenanceRequests().map(S=>({title:S.title,status:S.status,priority:S.priority,equipment:S.assets?.name||"",requested_by:e.getProfilesByUserId()[S.requested_by]?.full_name||"",created_at:S.created_at||"",converted_work_order_id:S.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(S=>({title:S.title,equipment:S.assets?.name||"",frequency:S.frequency,next_due_at:S.next_due_at,active:S.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(S=>({name:S.name,sku:S.sku||"",supplier_name:S.supplier_name||"",quantity_on_hand:S.quantity_on_hand,reorder_point:S.reorder_point,unit_cost:S.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(S=>({name:S.name,description:S.description||"",steps:S.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(S=>({user_id:S.user_id,name:e.getProfilesByUserId()[S.user_id]?.full_name||"",role:S.role}))}},v=q[e.getActiveSection()]||q.work;if(!v.rows.length)return s("Nothing to export in this section yet.");O(v.filename,v.rows)}function O(q,v){let S=Object.keys(v[0]),_=[S.join(","),...v.map(W=>S.map(w=>e.csvCell(W[w])).join(","))],D=new r([`\uFEFF${_.join(`
`)}`],{type:"text/csv;charset=utf-8"}),U=t.createObjectURL(D),T=n.createElement("a");T.href=U,T.download=q,n.body.appendChild(T),T.click(),T.remove(),t.revokeObjectURL(U)}return{downloadCsv:O,exportActiveSectionCsv:$}}typeof ke<"u"&&ke.exports&&(ke.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Rt=Q((Ln,Fe)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(r=>{r.addEventListener("click",()=>{let f=r.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(f)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Fe<"u"&&(Fe.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var Et=Q((Nn,Le)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(s){let f=String.fromCharCode(...s),a=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return a?a(f).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function r(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:r}}window.MaintainOpsPublicRequestTokens=l(),typeof Le<"u"&&(Le.exports={createPublicRequestTokenHelpers:l})})()});var Ot=Q((Un,Ne)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,r=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,f=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.createPublicRequestLink))}),typeof r=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(a=>{a.addEventListener("click",()=>r(a.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(a=>{a.addEventListener("click",()=>s(a.dataset.enablePublicRequestLink,!0))}),typeof f=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(a=>{a.addEventListener("click",()=>f(a.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof Ne<"u"&&(Ne.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Wt=Q((Qn,Ue)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(r=>{r.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let f=r.querySelector?.("button[type='submit']");if(!f?.disabled){f&&(f.disabled=!0);try{let a=r.querySelector?.("[name='planning_due_at']");await t(r.dataset.planningDueForm,a?.value)}finally{f?.isConnected&&(f.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof Ue<"u"&&(Ue.exports={bindWorkspacePlanningDueDateEvents:l})})()});var xt=Q((Bn,Qe)=>{(function(){let l=new WeakSet;function e(r,s,f){if(!r)return;let a=r.querySelector("[data-equipment-choice-existing]"),i=r.querySelector("[data-equipment-choice-new]"),d=s==="new";r.querySelectorAll("[data-equipment-choice-mode]").forEach(m=>{let c=m.value===(d?"new":"existing");m.checked=c,m.closest("label")?.classList.toggle("active",c)}),r.querySelectorAll("[data-equipment-choice-panel]").forEach(m=>{m.hidden=m.dataset.equipmentChoicePanel!==(d?"new":"existing")}),a&&(a.disabled=d,a.required=!d&&a.dataset.equipmentChoiceRequired==="true",d&&(a.value=""),typeof f=="function"&&f(a)),i&&(i.disabled=!d,i.required=d&&i.dataset.equipmentChoiceRequired==="true",d||(i.value=""))}function n(r,s){r.querySelectorAll("[data-equipment-choice]").forEach(f=>{let a=f.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(f,a,s)})}function t(r={}){let s=r.documentRef||document,f=r.updateAssetLocationWarning;n(s,f),!l.has(s)&&(l.add(s),s.addEventListener("change",a=>{let i=a.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,f);return}let d=a.target.closest?.("[data-equipment-choice-existing]");d&&typeof f=="function"&&f(d)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Qe<"u"&&(Qe.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var Mt=Q((jn,Be)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:r,createQuickFixAsset:s,getMaintenanceRequests:f,getQuickFixRequestId:a,getActiveCompanyId:i,getSession:d,getParts:m,getRequestsReady:c,getSupabaseClient:o,confirmAssetLocationRouting:p,assetRequiresSafety:g,blocksProcedureCompletion:u,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:b,descriptionWithAssignmentNote:k,assignedUserFromForm:A,procedureColumn:$,workOrderDateValue:O,applySafetyRequirementPayload:q,applySafetyCheckPayload:v,insertWithOptionalProcedure:S,friendlyWorkOrderSaveError:_,addPartUsageToWorkOrder:D,addPhotoToWorkOrder:U,updateAssetStatus:T,recordWorkOrderEvent:W,setActiveWorkOrderIdState:w,setActiveAssetIdState:P,setCreateWorkOrderMode:R,setQuickFixMode:E,setQuickFixAssetId:C,setQuickFixRequestId:I,showNotice:N,render:L,alertUser:G=ae=>window.alert(ae)}=e;async function X(ae){ae.preventDefault();let ie=ae.currentTarget,Z=n.querySelector("#quick-fix-error"),re=ie.querySelector("button[type='submit']");Z&&(Z.textContent=""),re&&(re.disabled=!0,re.textContent="Saving...");try{let H=new t(ie),me=String(H.get("title")||"").trim();if(!me)throw new Error("Quick Fix issue is required.");let M=a(),j=i(),z=d(),te=String(H.get("description")||"").trim(),ee=String(H.get("resolution_summary")||"").trim(),K=ee||me,Y=te||me,ne=H.get("mark_completed")==="on",J=H.get("machine_down")==="on",le=H.get("asset_id")||null,fe=M?f().find(se=>se.id===M):null,oe=String(H.get("new_asset_name")||"").trim();if(le&&oe)throw new Error("Choose existing equipment or create new equipment, not both.");if(oe){let{data:se,error:pe}=await r(s(oe,J?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(pe){Z&&(Z.textContent=pe.message);return}le=se.id}if(!oe&&!p(le,"logging this Quick Fix",Z))return;if(ne&&g(le)&&H.get("safety_devices_checked")!=="on"){Z&&(Z.textContent="Check safety devices before marking equipment work complete.");return}let F=ne?u(null,H.get("procedure_template_id")||null):"";if(F){h("",""),Z&&(Z.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let de={company_id:j,location_id:y(le),title:me,description:b(k(Y,H.get("assigned_to")),fe),asset_id:le,assigned_to:A(H,z.user.id),priority:H.get("priority")||"medium",type:H.get("type")||"corrective",status:ne?"completed":"open",due_at:O(H.get("due_at")),created_by:z.user.id,...$(H.get("procedure_template_id")),actual_minutes:0,failure_cause:H.get("failure_cause")||null,resolution_summary:ne?K:ee||null,follow_up_needed:H.get("follow_up_needed")==="on",completion_notes:ne?K:null,completed_at:ne?new Date().toISOString():null};q(de),v(de,ne&&de.safety_check_required&&H.get("safety_devices_checked")==="on");let{data:ge,error:ue}=await r(S("work_orders",de,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ue){Z&&(Z.textContent=`Could not log quick fix: ${_(ue)}`);return}let x=[],V=H.get("part_id"),ce=Number(H.get("quantity_used"))||1;if(V){let se=m().find(Me=>Me.id===V),pe=await r(D(ge.id,se,ce),"Part usage save timed out.",12e3).catch(Me=>Me);pe&&x.push(`part usage failed: ${pe.message}`)}let he=H.get("photo");if(he&&he.name){let se=await r(U(ge.id,he),"Photo upload timed out.",25e3).catch(pe=>pe);se&&x.push(`photo upload failed: ${se.message}`)}let ye=J?"offline":H.get("asset_status");if(de.asset_id&&!oe&&(J||ne&&ye)){let se=await r(T(de.asset_id,ye),"Equipment status update timed out.",12e3).catch(pe=>pe);se?x.push(`equipment status did not update: ${se.message}`):await r(W(ge.id,"asset_status_updated",J?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(pe=>x.push(`history did not update: ${pe.message}`))}if(await r(W(ge.id,"quick_fix",ne?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(se=>x.push(`history did not update: ${se.message}`)),oe&&await r(W(ge.id,"equipment_created",`Equipment created from Quick Fix: ${oe}.`),"Activity log timed out.",8e3).catch(se=>x.push(`history did not update: ${se.message}`)),M&&c()){let se=await r(o().from("maintenance_requests").update({status:"converted",reviewed_by:z.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:ge.id}).eq("id",M).eq("company_id",j),"Request status update timed out.",12e3).catch(pe=>({error:pe}));se.error?x.push(`request status did not update: ${se.error.message}`):await r(W(ge.id,"request_quick_fixed",ne?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(pe=>x.push(`history did not update: ${pe.message}`))}w(ge.id),P(null),R(!1),E(!1),C(null),I(null),N(x.length?`Quick Fix saved with warning: ${x[0]}`:"Quick Fix saved.",x.length?"warning":"success"),await L()}catch(H){Z?Z.textContent=`Could not log quick fix: ${H.message||H}`:G(H.message||H)}finally{re&&re.isConnected&&(re.disabled=!1,re.textContent="Log Quick Fix")}}return{createQuickFix:X}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof Be<"u"&&(Be.exports={createQuickFixWorkflow:l})})()});var Tt=Q((zn,je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(p,g){return p==="direct"?[e.getSession().user.id,g].filter(Boolean):e.getCompanyMembers().map(u=>u.user_id)}function s(){let p=n.querySelector("#message-thread-form");p&&p.addEventListener("submit",f);let g=n.querySelector("#message-reply-form");g&&g.addEventListener("submit",a),n.querySelectorAll("[data-delete-message]").forEach(u=>{u.addEventListener("click",i)}),n.querySelectorAll("[data-delete-message-thread]").forEach(u=>{u.addEventListener("click",d)})}async function f(p){p.preventDefault();let g=p.currentTarget,u=n.querySelector("#message-thread-error"),h=g.querySelector("button[type='submit']"),y=new t(g);if(u&&(u.textContent=""),!e.getMessagesReady()){u&&(u.textContent="Run supabase/step-next-message-center.sql before creating threads.");return}let b=y.get("thread_type"),k=y.get("direct_user_id"),A=r(b,k),$=String(y.get("title")||"").trim(),O=String(y.get("body")||"").trim();if(b==="company"){u&&(u.textContent="Company-wide broadcast threads are disabled. Choose location or direct.");return}if(b==="direct"&&!k){u&&(u.textContent="Choose a teammate for a direct message.");return}if(!$||!O){u&&(u.textContent="Add a subject and message before starting the thread.");return}A.includes(e.getSession().user.id)||A.push(e.getSession().user.id),h&&(h.disabled=!0,h.textContent="Starting...");let q=!1;try{let v=y.get("work_order_id")||null,S={company_id:e.getActiveCompanyId(),location_id:b==="location"?e.activeLocationDatabaseId():null,thread_type:b,title:$,created_by:e.getSession().user.id};v&&e.getMessageWorkOrderLinksReady()&&(S.work_order_id=v);let{data:_,error:D}=await e.withOperationTimeout(e.supabaseClient().from("message_threads").insert(S).select("*").single(),"Message thread save timed out. Check your connection and try again.",15e3);if(D)throw e.isMissingColumnError(D,"work_order_id")&&e.setMessageWorkOrderLinksReady(!1),D;let U=[...new Set(A)].map(w=>({company_id:e.getActiveCompanyId(),thread_id:_.id,user_id:w})),{error:T}=await e.withOperationTimeout(e.supabaseClient().from("message_thread_members").insert(U),"Message member save timed out. Check your connection and try again.",15e3);if(T)throw T;let{error:W}=await c(_.id,O);if(W)throw W;e.setActiveMessageThreadId(_.id),e.setMessageComposerWorkOrderId(""),e.setMessageComposerOpen(!1),await m(_.id),e.showNotice("Thread started."),q=!0,await e.render()}catch(v){u&&(u.textContent=o(v))}finally{!q&&h?.isConnected&&(h.disabled=!1,h.textContent="Start Thread")}}async function a(p){p.preventDefault();let g=p.currentTarget,u=n.querySelector("#message-reply-error"),h=g.querySelector("button[type='submit']"),y=String(new t(g).get("body")||"").trim();if(!y)return;u&&(u.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");let b=!1;try{let{error:k}=await c(g.dataset.threadId,y);if(k)throw k;e.showNotice("Message sent."),await m(g.dataset.threadId),b=!0,await e.render()}catch(k){u&&(u.textContent=o(k))}finally{!b&&h?.isConnected&&(h.disabled=!1,h.textContent="Send Reply")}}async function i(p){let g=p.currentTarget,u=g?.dataset?.deleteMessage;if(u&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this message from the thread? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message",{target_message_id:u}),"Message delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.showNotice("Message deleted."),await e.render()}catch(h){e.showNotice(o(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete")}}}async function d(p){let g=p.currentTarget,u=g?.dataset?.deleteMessageThread;if(u&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this thread from your messages? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message_thread",{target_thread_id:u}),"Message thread delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.setActiveMessageThreadId(""),e.showNotice("Thread deleted."),await e.render()}catch(h){e.showNotice(o(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete Thread")}}}async function m(p){if(!e.getMessagesReady()||!p)return;let g=new Date().toISOString(),u={company_id:e.getActiveCompanyId(),thread_id:p,user_id:e.getSession().user.id,last_read_at:g};e.setMessageThreadRead(p,u);let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("message_reads").upsert(u,{onConflict:"thread_id,user_id"}),"Message read marker timed out.",8e3).catch(y=>({error:y}));h&&e.warn("Could not mark message thread read",h)}async function c(p,g){let u=await e.withOperationTimeout(e.supabaseClient().from("messages").insert({company_id:e.getActiveCompanyId(),thread_id:p,sender_id:e.getSession().user.id,body:g}),"Message save timed out. Check your connection and try again.",15e3);return u.error?{error:u.error}:{error:(await e.withOperationTimeout(e.supabaseClient().from("message_threads").update({updated_at:new Date().toISOString()}).eq("id",p).eq("company_id",e.getActiveCompanyId()),"Message thread timestamp save timed out.",8e3).catch(y=>({error:y}))).error}}function o(p){let g=e.messageCenterErrorState(p);return g.messagesReady===!1&&e.setMessagesReady(!1),g.message}return{bindMessageWorkflowEvents:s,createMessageThread:f,sendThreadReply:a,deleteOwnMessage:i,deleteMessageThread:d,markMessageThreadRead:m,insertThreadMessage:c,friendlyMessageCenterError:o,messageThreadMembersForType:r}}window.MaintainOpsMessageWorkflow={createMessageWorkflow:l},typeof je<"u"&&(je.exports={createMessageWorkflow:l})})()});var Dt=Q((Gn,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let m=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),c=n.querySelector("#create-pm-form");c&&!m.includes(c)&&m.push(c),m.forEach(o=>o.addEventListener("submit",f))}async function f(m){m.preventDefault();let c=m.currentTarget,o=c.querySelector("button[type='submit']"),p=c.querySelector("[data-pm-error]")||n.querySelector("#pm-error");p&&(p.textContent=""),o&&(o.disabled=!0,o.textContent="Adding...");try{let g=new t(c);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",p))return;let{error:u}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(u)throw u;e.showNotice("PM schedule added."),await e.render()}catch(g){p?p.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{o&&(o.disabled=!1,o.textContent="Add Schedule")}}function a(m){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(c=>c.id===m)&&(e.setPendingDeleteScheduleId(m),e.renderWorkspace())}async function i(m){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(p=>p.id===m))return;let o=n.querySelector(`[data-confirm-delete-schedule="${r.escape(m)}"]`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let{data:p,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",m).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!p?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let u=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",m).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(u.error)throw new Error(`PM schedule delete verification failed: ${u.error.message}`);if(u.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(p){e.showNotice(p.message||"Could not delete PM schedule.","warning"),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}async function d(m){let c=e.getPreventiveSchedules().find(p=>p.id===m);if(!c)return;let o=n.querySelector(`[data-generate-pm="${r.escape(m)}"]`);o&&(o.disabled=!0,o.textContent="Generating...");try{let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(c.asset_id),asset_id:c.asset_id,title:c.title,description:`Generated from preventive schedule: ${c.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:c.next_due_at,...e.procedureColumn(c.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,!1);let{data:g,error:u}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"PM work order generation timed out.");if(u)throw u;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(c.next_due_at,c.frequency)}).eq("id",c.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(p){e.showNotice(`Could not generate PM work: ${p.message||p}`,"warning"),o&&(o.disabled=!1,o.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:f,requestDeletePreventiveSchedule:a,deletePreventiveSchedule:i,generatePreventiveWorkOrder:d}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:l},typeof ze<"u"&&(ze.exports={createPreventiveMaintenanceWorkflow:l})})()});var It=Q((Vn,Ge)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let p=n.querySelector("#create-procedure-form");p&&p.addEventListener("submit",f);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",a),n.querySelectorAll("[data-add-step]").forEach(u=>{u.addEventListener("submit",i)})}async function f(p){p.preventDefault();let g=p.currentTarget,u=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),u&&(u.disabled=!0,u.textContent="Adding...");try{let y=new t(g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(b)throw b;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{u&&(u.disabled=!1,u.textContent="Add Checklist")}}async function a(){let p=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(u=>u.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}p&&(p.disabled=!0,p.textContent="Adding sample...");try{let{data:u,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(k=>({...k,company_id:e.getActiveCompanyId(),procedure_template_id:u.id})),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(b)throw b;e.showNotice("Sample procedure checklist added."),await e.render()}catch(u){e.showNotice(`Could not add sample procedure: ${u.message||u}`,"warning")}finally{p&&(p.disabled=!1,p.textContent="Add sample inspection checklist")}}async function i(p){p.preventDefault();let g=p.currentTarget,u=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),u&&(u.disabled=!0,u.textContent="Adding...");try{let y=new t(g),k=(e.getProcedureTemplates().find($=>$.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:k,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(A)throw A;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{u&&(u.disabled=!1,u.textContent="Add Step")}}async function d(p){let[g,u]=await Promise.all([m("work_orders",p),m("preventive_schedules",p)]);return{workOrders:g,schedules:u}}async function m(p,g){let{count:u,error:h}=await e.withOperationTimeout(e.supabaseClient().from(p).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${p}.`,15e3);if(h)throw new Error(`Could not verify linked ${p.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return u||0}async function c(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(u=>u.id===p))return;let g=n.querySelector(`[data-procedure-delete-error="${r.escape(p)}"]`);g&&(g.textContent="");try{let u=await d(p),h=e.procedureDeleteBlockerMessage(u);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(p),e.renderWorkspace()}catch(u){g?g.textContent=u.message||"Could not verify procedure links before delete.":e.showNotice(u.message||"Could not verify procedure links before delete.","warning")}}async function o(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===p))return;let u=n.querySelector(`[data-confirm-delete-procedure="${r.escape(p)}"]`),h=n.querySelector(`[data-procedure-delete-error="${r.escape(p)}"]`);h&&(h.textContent=""),u&&(u.disabled=!0,u.textContent="Deleting...");try{let y=await d(p),b=e.procedureDeleteBlockerMessage(y);if(b)throw new Error(b);let{data:k,error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(A)throw A;if(!k?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let $=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if($.error)throw new Error(`Procedure checklist delete verification failed: ${$.error.message}`);if($.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let b=y.message||"Could not delete procedure.";e.showNotice(b,"warning"),h&&(h.textContent=b),u&&(u.disabled=!1,u.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:f,seedSampleProcedure:a,createProcedureStep:i,loadProcedureDeleteBlockers:d,countProcedureLinkedRows:m,requestDeleteProcedureTemplate:c,deleteProcedureTemplate:o}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:l},typeof Ge<"u"&&(Ge.exports={createProcedureWorkflow:l})})()});var Ft=Q((Hn,Ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let u=n.querySelector("#add-member-form");u&&u.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach($=>{$.addEventListener("submit",f)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",a);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",m);let b=n.querySelector("#team-invite-form");b&&b.addEventListener("submit",i);let k=n.querySelector("#team-invite-link-form");k&&k.addEventListener("submit",c),n.querySelectorAll("[data-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId($.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>o($.dataset.confirmRevokeInviteLink))});let A=n.querySelector("#request-notification-recipient-form");A&&A.addEventListener("submit",p),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach($=>{$.addEventListener("click",()=>g($.dataset.deleteRequestNotificationRecipient))})}async function s(u){u.preventDefault();let h=u.currentTarget,y=new t(h),b=String(y.get("role")||"technician").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&b!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}k&&(k.disabled=!0,k.textContent="Adding...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:b}),"Team member save timed out.");if(A)throw A;await e.render()}catch(A){e.alertUser(A.message||A)}finally{k?.isConnected&&(k.disabled=!1,k.textContent="Add Member")}}async function f(u){u.preventDefault();let h=u.currentTarget,y=new t(h),b=String(y.get("role")||"").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}k&&(k.disabled=!0,k.textContent="Saving...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:b}),"Role save timed out. Check your connection and try again.",15e3);if(A)throw new Error(A.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":A.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(A){e.showNotice(`Could not save role: ${A.message||A}`,"warning")}finally{k&&(k.disabled=!1,k.textContent="Save Role")}}async function a(u){u.preventDefault();let h=u.currentTarget,y=n.querySelector("#profile-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("full_name")||"").trim(),$=h.querySelector('input[name="mobile_tech"]'),O=$?$.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),b&&(b.disabled=!0,b.textContent="Saving...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:A,mobile_tech:O},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(q)throw e.isMissingColumnError(q,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):q;e.showNotice("Profile saved."),await e.render()}catch(q){y&&(y.textContent=q.message||"Could not save profile.")}finally{b&&(b.disabled=!1,b.textContent="Save Profile")}}async function i(u){u.preventDefault();let h=u.currentTarget,y=n.querySelector("#team-invite-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}b&&(b.disabled=!0,b.textContent="Inviting...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(k.get("email")||"").trim(),invite_role:A,invite_default_location_id:k.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite")||e.isColumnSchemaError($,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):$;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch($){y&&(y.textContent=$.message||"Could not create invite.")}finally{b&&(b.disabled=!1,b.textContent="Create Invite")}}async function d(u){if(!(!u||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:u}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function m(u){u.preventDefault();let h=u.currentTarget,y=n.querySelector("#password-change-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("password")||""),$=String(k.get("confirmPassword")||"");if(y&&(y.textContent=""),A.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(A!==$){y&&(y.textContent="Passwords do not match.");return}b&&(b.disabled=!0,b.textContent="Updating...");try{let{error:O}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:A}),"Password update timed out. Check your connection and try again.",15e3);if(O)throw O;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(O){y&&(y.textContent=O.message||"Could not update password.")}finally{b&&(b.disabled=!1,b.textContent="Update Password")}}async function c(u){u.preventDefault();let h=u.currentTarget,y=n.querySelector("#team-invite-link-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let $="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(A==="admin"){let $="Admin join links are not allowed.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){let $="Managers can only create technician join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}b&&(b.disabled=!0,b.textContent="Creating...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:A,link_location_id:k.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite_link")||e.isColumnSchemaError($,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):$;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch($){let O=$.message||"Could not create join link.";e.setTeamInviteLinkError(O),y&&(y.textContent=O)}finally{b&&(b.disabled=!1,b.textContent="Create Join Link")}}async function o(u){if(!(!u||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:u}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function p(u){u.preventDefault();let h=u.currentTarget,y=n.querySelector("#request-notification-recipient-error"),b=h.querySelector("button[type='submit']"),k=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let A="Only admins can change request email routing.";e.setRequestNotificationRecipientError(A),y&&(y.textContent=A);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}b&&(b.disabled=!0,b.textContent="Adding...");try{let A=String(k.get("email")||"").trim().toLowerCase(),{error:$}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:k.get("location_id")||null,email:A,label:String(k.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if($)throw e.isColumnSchemaError($,["request_notification_recipients"])||$.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):$;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(A){let $=A.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError($),y&&(y.textContent=$)}finally{b&&(b.disabled=!1,b.textContent="Add Recipient")}}async function g(u){if(!(!u||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",u),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:r,addCompanyMember:s,updateCompanyMemberRole:f,updateMyProfile:a,updateMyPassword:m,createTeamInvite:i,cancelTeamInvite:d,createTeamInviteLink:c,revokeTeamInviteLink:o,createRequestNotificationRecipient:p,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Ve<"u"&&(Ve.exports={createTeamWorkflow:l})})()});var Lt=Q((Yn,He)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let d=n.querySelector("#location-form");d&&d.addEventListener("submit",f);let m=n.querySelector("#public-app-url-form");m&&m.addEventListener("submit",a)}async function s(i){i.preventDefault();let d=i.currentTarget,m=d.querySelector("button[type='submit']"),c=new t(d);m&&(m.disabled=!0,m.textContent="Saving...");try{let{error:o}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(c.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(o)throw o;e.showNotice("Company saved."),await e.render()}catch(o){e.showNotice(`Could not save company: ${o.message||o}`,"warning")}finally{m&&(m.disabled=!1,m.textContent="Save Company")}}async function f(i){i.preventDefault();let d=i.currentTarget,m=n.querySelector("#location-error"),c=d.querySelector("button[type='submit']"),o=String(new t(d).get("name")||"").trim();if(o){m&&(m.textContent=""),c&&(c.disabled=!0,c.textContent="Adding...");try{let{data:p,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),o),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(p.id),e.persistActiveLocationId(p.id),e.showNotice("Location added."),await e.render()}catch(p){m&&(m.textContent=p.message||"Could not add location.")}finally{c&&(c.disabled=!1,c.textContent="Add Location")}}}function a(i){i.preventDefault();let d=n.querySelector("#public-request-link-error"),m=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(d&&(d.textContent=""),!m){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let c=e.normalizePublicAppUrl(m);if(!c){d&&(d.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(c),e.storage.setItem("maintainops.publicAppUrl",c),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:r,updateCompanySettings:s,createLocation:f,savePublicAppUrl:a}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof He<"u"&&(He.exports={createCompanySettingsWorkflow:l})})()});var Nt=Q((Kn,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.FormDataCtor||FormData,s=e.confirmUser||(o=>t.confirm(o));function f(){let o=n.querySelector("#app-issue-report-form");o&&o.addEventListener("submit",d),n.querySelectorAll("[data-app-issue-status]").forEach(p=>{p.addEventListener("submit",m)}),n.querySelectorAll("[data-delete-app-issue]").forEach(p=>{p.addEventListener("click",c)})}async function a(){let{data:o,error:p}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!p),e.setAppIssueReports(p?[]:o||[]),p)throw p}function i(o){let p=e.appIssueReportErrorState(o);return p.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),p.message}async function d(o){o.preventDefault();let p=o.currentTarget,g=n.querySelector("#app-issue-report-error"),u=p.querySelector("button[type='submit']"),h=new r(p);g&&(g.textContent=""),u&&(u.disabled=!0,u.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:b}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(b)throw b;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await a(),e.renderWorkspace()}catch(y){g&&(g.textContent=i(y))}finally{u?.isConnected&&(u.disabled=!1,u.textContent="Send Report")}}async function m(o){if(o.preventDefault(),!e.canManageTeam())return;let p=o.currentTarget,g=p.querySelector("button[type='submit']"),u=new r(p);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(u.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),p.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await a(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function c(o){if(o.preventDefault(),!e.canManageTeam())return;let p=o.currentTarget,g=p.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;p.disabled=!0;let u=p.textContent;p.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await a(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{p?.isConnected&&(p.disabled=!1,p.textContent=u||"Delete")}}return{bindAppIssueWorkflowEvents:f,reloadAppIssueReports:a,appIssueReportError:i,createAppIssueReport:d,updateAppIssueReportStatus:m,deleteAppIssueReport:c}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Ye<"u"&&(Ye.exports={createAppIssueWorkflow:l})})()});var Ut=Q((Jn,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.CSSRef||CSS;async function s(m){let c=n.querySelector("#public-request-link-error"),o=n.querySelector(`[data-create-public-request-link="${r.escape(m)}"]`);c&&(c.textContent=""),o&&(o.disabled=!0,o.textContent="Creating...");try{let{error:p}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:m}),"QR link save timed out. Check your connection and try again.",15e3);if(p)throw e.setPublicRequestLinksReady(!1),new Error(p.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":p.message);e.showNotice("Location request QR link ready."),await e.render()}catch(p){c&&(c.textContent=p.message||"Could not create QR request link.")}finally{o&&(o.disabled=!1,o.textContent="Create QR Link")}}async function f(m){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await a(m,!1)}async function a(m,c){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can reactivate or disable posted QR request links.");return}await d(m,{is_active:!!c},c?"Request link reactivated.":"Request link disabled.")}async function i(m){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await d(m,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function d(m,c,o){let p=n.querySelector("#public-request-link-error");if(p&&(p.textContent=""),!e.canAdministerPublicRequestLinks()){p&&(p.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!m||!e.getActiveCompanyId()){p&&(p.textContent="Select a company before updating request links.");return}try{let{data:g,error:u}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...c,updated_at:new Date().toISOString()}).eq("id",m).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(u){p&&(p.textContent=u.message);return}if(!g?.length){p&&(p.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(o),await e.render()}catch(g){p&&(p.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:f,setPublicRequestLinkActive:a,regeneratePublicRequestLink:i,updatePublicRequestLink:d}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof Ke<"u"&&(Ke.exports={createPublicRequestLinkWorkflow:l})})()});var Qt=Q((Zn,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let m=n.querySelector("#create-part-form");m&&m.addEventListener("submit",s),n.querySelectorAll("[data-restock-part]").forEach(c=>{c.addEventListener("submit",f)}),n.querySelectorAll("[data-use-part]").forEach(c=>{c.addEventListener("submit",a)}),n.querySelectorAll("[data-edit-part]").forEach(c=>{c.addEventListener("submit",i)}),n.querySelectorAll("[data-rename-part-source]").forEach(c=>{c.addEventListener("submit",d)})}async function s(m){m.preventDefault();let c=m.currentTarget,o=n.querySelector("#part-create-error"),p=c.querySelector("button[type='submit']"),g=new t(c);o&&(o.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");let u;try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!h.company_id)throw new Error("Choose a company before adding parts.");if(!h.name)throw new Error("Part name is required.");let y=new Promise((A,$)=>{u=setTimeout(()=>$(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:b,error:k}=await Promise.race([e.supabaseClient().from("parts").insert(h).select("id").single(),y]);if(clearTimeout(u),k&&e.isMissingColumnError(k,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(k&&e.isMissingColumnError(k,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(k)throw k;e.setActivePartId(b?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),c.reset(),await e.render()}catch(h){o&&(o.textContent=h.message||"Could not add part.")}finally{u&&clearTimeout(u),p&&p.isConnected&&(p.disabled=!1,p.textContent="Add Part")}}async function f(m){m.preventDefault();let c=m.target,o=c.querySelector("button[type='submit']"),p=e.getParts().find(h=>h.id===c.dataset.restockPart),g=Number(new t(c).get("quantity"))||0;if(!p||g<=0)return;let u=o?.textContent||"Restock";o&&(o.disabled=!0,o.textContent="Saving...");try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(p.quantity_on_hand)||0)+g}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()),"Part restock timed out. Check your connection and try again.",15e3);if(h)throw h;e.showNotice("Part restocked."),await e.render()}catch(h){e.showNotice(`Could not restock part: ${h.message||h}`,"warning")}finally{o&&(o.disabled=!1,o.textContent=u)}}async function a(m){m.preventDefault();let c=m.currentTarget,o=c.querySelector("button[type='submit']"),p=e.getParts().find(h=>h.id===c.dataset.usePart),g=Number(new t(c).get("quantity"))||0;if(!p||g<=0)return;let u=o?.textContent||"Use";o&&(o.disabled=!0,o.textContent="Saving...");try{let h=Number(p.quantity_on_hand)||0,y=Math.max(0,h-g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:y}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()),"Part use save timed out. Check your connection and try again.",15e3);if(b)throw b;e.showNotice("Part used."),await e.render()}catch(h){e.showNotice(`Could not use part: ${h.message||h}`,"warning")}finally{o&&(o.disabled=!1,o.textContent=u)}}async function i(m){m.preventDefault();let c=m.currentTarget,o=c.dataset.editPart,p=n.querySelector(`[data-part-edit-error="${o}"]`),g=c.querySelector("button[type='submit']"),u=new t(c);p&&(p.textContent="");let h=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let y={name:String(u.get("name")||"").trim(),sku:u.get("sku")||null,supplier_name:u.get("supplier_name")||null,machine_note:u.get("machine_note")||null,quantity_on_hand:Number(u.get("quantity_on_hand"))||0,reorder_point:Number(u.get("reorder_point"))||0,unit_cost:Number(u.get("unit_cost"))||0};try{if(!y.name)throw new Error("Part name is required.");let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(y).eq("id",o).eq("company_id",e.getActiveCompanyId()),"Part save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(b&&e.isMissingColumnError(b,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(b&&e.isMissingColumnError(b,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(b)throw b;e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(b){p&&(p.textContent=b.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=h)}}async function d(m){m.preventDefault();let c=m.currentTarget,o=n.querySelector("#part-source-error"),p=c.querySelector("button[type='submit']"),g=new t(c),u=String(g.get("old_source")||"").trim(),h=String(g.get("new_source")||"").trim();if(o&&(o.textContent=""),!!u){if(!e.getPartSuppliersReady()){o&&(o.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(u===h){o&&(o.textContent="Change the source name before saving.");return}p&&(p.disabled=!0,p.textContent="Renaming...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:h||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",u),"Part source rename timed out. Check your connection and try again.",15e3);if(y)throw e.isMissingColumnError(y,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?y.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(y){o&&(o.textContent=y.message||"Could not update part source.")}finally{p&&(p.disabled=!1,p.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:s,restockPart:f,usePartFromInventory:a,updatePart:i,renamePartSource:d}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof Je<"u"&&(Je.exports={createPartInventoryWorkflow:l})})()});var Bt=Q((Xn,_e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(f){f.preventDefault();let a=f.target,i=a.querySelector("button[type='submit']"),d=n.querySelector("#quick-update-error"),m=e.getWorkOrders().find(o=>o.id===e.getActiveWorkOrderId()),c=new t(a);i.disabled=!0,i.textContent="Saving...",d&&(d.textContent="");try{let o=c.get("asset_id")||null,p=String(c.get("new_asset_name")||"").trim();if(o&&p)throw new Error("Choose existing equipment or create new equipment, not both.");if(p){let{data:k,error:A}=await e.createQuickFixAsset(p,"running");if(A){i.disabled=!1,i.textContent="Save Quick Update",d&&(d.textContent=`Could not add equipment: ${A.message}`);return}o=k.id}if(!p&&!e.confirmAssetLocationRouting(o,"saving this work update",d))return;let g={title:e.requiredText(c.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(m?.description||"",c.get("assigned_to")),asset_id:o,location_id:e.locationIdForAsset(o),due_at:e.workOrderDateValue(c.get("due_at")),status:c.get("status"),priority:c.get("priority"),assigned_to:e.assignedUserFromForm(c),...e.procedureColumn(c.get("procedure_template_id")),resolution_summary:c.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let u=c.get("safety_devices_checked")==="on";if(g.status==="completed"&&m?.status!=="completed"){let k=e.productionActionCompletionMessage?.(m)||"";if(k){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),k),i.disabled=!1,i.textContent="Save Quick Update",d&&(d.textContent=k);return}let A=e.blocksProcedureCompletion(m,g.procedure_template_id||null);if(A){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),A),i.disabled=!1,i.textContent="Save Quick Update",d&&(d.textContent=A);return}if(e.applySafetyCheckPayload(g,u),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",d&&(d.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):m?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(u||e.hasCompletedSafetyDeviceCheck(m)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){i.disabled=!1,i.textContent="Save Quick Update",d&&(d.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&c.get("machine_down")==="on"){let k=await e.updateAssetStatus(g.asset_id,"offline");k?y.push(`equipment status did not update: ${k.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let b=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(m,Object.fromEntries(c.entries()))),"Activity log timed out.",8e3).catch(k=>k);p&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${p}.`),"Activity log timed out.",8e3).catch(()=>null),b&&y.push(`history did not update: ${b.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(o){r.error("Quick update save failed",o),i.disabled=!1,i.textContent="Save Quick Update",d&&(d.textContent=`Could not save update: ${o.message||o}`)}}return{updateWorkOrderQuickView:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var jt=Q((er,Se)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function f(q){return String(q.get("location_new")||q.get("location_existing")||q.get("location")||"").trim()||null}function a(){return e.getSession?.()?.user?.id||null}function i(q){return(e.getAssets?.()||[]).find(v=>v.id===q)||null}function d(q,v){if(!q)return[];let S={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(S).filter(_=>String(q[_]??"")!==String(v[_]??"")).map(_=>S[_])}function m(q){return e.isMissingColumnError(q,"manufacturer")||e.isMissingColumnError(q,"model")}async function c(q){q.preventDefault();let v=q.currentTarget,S=n.querySelector("#asset-create-error");S&&(S.textContent="");let _=v.querySelector("button[type='submit']"),D=_?.textContent||"Add Equipment",U=q.submitter?.dataset?.assetContinue==="true";_&&(_.disabled=!0,_.textContent="Saving...");try{let T=new t(v),W={company_id:e.getActiveCompanyId(),location_id:T.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(T.get("name"),"Equipment name"),asset_code:String(T.get("asset_code")||"").trim()||null,manufacturer:String(T.get("manufacturer")||"").trim()||null,model:String(T.get("model")||"").trim()||null,location:f(T),parent_asset_id:T.get("parent_asset_id")||null,asset_type:T.get("asset_type")||"machine",safety_devices_required:T.get("safety_devices_required")==="on",status:"running",created_by:a()},w=e.supabaseClient().from("assets").insert(W).select("id").single(),{data:P,error:R}=await e.withOperationTimeout(w,"Equipment save timed out. Check your connection and try again.",15e3);if(R&&e.isMissingColumnError(R,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(R&&e.isMissingColumnError(R,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(R&&m(R))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(R&&e.isAssetHierarchySchemaError(R))throw new Error(e.equipmentSchemaMessage(R));if(R)throw R;P?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(P.id,"created",`Created ${W.name}.`),U&&P?.id?(e.setActiveAssetId(P.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(T){S?S.textContent=T.message:r(T.message)}finally{_&&(_.disabled=!1,_.textContent=D)}}async function o(q){q.preventDefault();let v=q.currentTarget,S=n.querySelector("#asset-edit-error");S&&(S.textContent="");let _=v.querySelector("button[type='submit']"),D=_?.textContent||"Save Equipment";_&&(_.disabled=!0,_.textContent="Saving...");try{let U=new t(v),T=i(e.getActiveAssetId()),W={name:e.requiredText(U.get("name"),"Equipment name"),asset_code:String(U.get("asset_code")||"").trim()||null,manufacturer:String(U.get("manufacturer")||"").trim()||null,model:String(U.get("model")||"").trim()||null,location_id:U.get("location_id")||e.activeLocationDatabaseId(),location:f(U),parent_asset_id:U.get("parent_asset_id")||null,asset_type:U.get("asset_type")||"machine",safety_devices_required:U.get("safety_devices_required")==="on",status:U.get("status")},{error:w}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(W).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(w&&m(w))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(w&&e.isAssetHierarchySchemaError(w))throw new Error(e.equipmentSchemaMessage(w));if(w)throw w;let P=d(T,W);P.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${P.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(U){S?S.textContent=U.message:r(U.message)}finally{_&&(_.disabled=!1,_.textContent=D)}}async function p(q,v){let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:v}).eq("id",q).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!S&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(q,"status_changed",`Status changed to ${v}.`),S||null}async function g(q){q.preventDefault();let v=q.currentTarget,S=v.dataset.attachAssetPart,_=n.querySelector(`[data-asset-part-error="${s.escape(S)}"]`);_&&(_.textContent="");let D=v.querySelector("button[type='submit']"),U=D?.textContent||"Attach Part";D&&(D.disabled=!0,D.textContent="Attaching...");try{let T=new t(v),W=T.get("part_id");if(!W)throw new Error("Select a part to attach.");let w=Math.max(1,Number(T.get("quantity_recommended"))||1),P=String(T.get("note")||"").trim()||null,{error:R}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:S,part_id:W,quantity_recommended:w,note:P}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(R)throw e.isMissingTableError?.(R,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):R.code==="23505"?new Error("This part is already linked to this equipment."):R;e.showNotice("Part linked to equipment."),await e.render()}catch(T){_?_.textContent=T.message||"Could not link part to equipment.":e.showNotice(T.message||"Could not link part to equipment.","warning")}finally{D&&(D.disabled=!1,D.textContent=U)}}async function u(q){let v=n.querySelector("[data-asset-part-error]");v&&(v.textContent="");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",q).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingTableError?.(S,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):S;e.showNotice("Part link removed."),await e.render()}catch(S){v?v.textContent=S.message||"Could not remove linked part.":e.showNotice(S.message||"Could not remove linked part.","warning")}}function h(q){return{workOrders:e.getWorkOrders().filter(v=>v.asset_id===q).length,children:e.childAssetsFor(q).length,schedules:e.getPreventiveSchedules().filter(v=>v.asset_id===q).length,requests:e.getMaintenanceRequests().filter(v=>v.asset_id===q).length}}function y(q){let v=h(q);return Object.values(v).some(Boolean)}async function b(q){let[v,S,_]=await Promise.all([k("work_orders",q),k("preventive_schedules",q),k("maintenance_requests",q)]);return{workOrders:v,children:e.childAssetsFor(q).length,schedules:S,requests:_}}async function k(q,v){let{count:S,error:_}=await e.withOperationTimeout(e.supabaseClient().from(q).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",v),`Equipment delete check timed out while checking ${q}.`,15e3);if(_)throw new Error(`Could not verify linked ${q.replaceAll("_"," ")} before deleting equipment: ${_.message}`);return S||0}async function A(q){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");try{let S=await b(q),_=e.assetDeleteBlockerMessage(S);if(_){v&&(v.textContent=_);return}e.setPendingDeleteAssetId(q),e.renderWorkspace()}catch(S){v?v.textContent=S.message||"Could not verify equipment links before delete.":e.showNotice(S.message||"Could not verify equipment links before delete.","warning")}}async function $(q){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");let S=n.querySelector(`[data-confirm-delete-asset="${s.escape(q)}"]`);S&&(S.disabled=!0,S.textContent="Deleting...");try{let _=await b(q),D=e.assetDeleteBlockerMessage(_);if(D)throw new Error(D);let U=e.getAssetDocumentStoragePaths?.(q)||[];if(U.length){let W=await e.withOperationTimeout(e.removeAssetDocumentStorage(U),"Equipment file cleanup timed out.",15e3);if(W.error)throw new Error(`Could not remove equipment files: ${W.error.message}`)}let{error:T}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",q).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(T)throw new Error(T.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":T.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(_){v&&(v.textContent=_.message||"Could not delete equipment."),S&&(S.disabled=!1,S.textContent="Permanently Delete")}}async function O(q,v="running"){let S={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:q,asset_type:"machine",safety_devices_required:!0,status:v,created_by:a()},_=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(S).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return _.error&&e.isMissingColumnError(_.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(_,e.databaseSetupRequiredMessage("adding equipment in this location"))):_.error&&e.isMissingColumnError(_.error,"created_by")?e.withSetupError(_,"Run supabase/step-next-asset-events.sql before saving equipment history."):_.error&&e.isAssetHierarchySchemaError(_.error)?e.withSetupError(_,e.equipmentSchemaMessage(_.error).replace("saving","adding")):(!_.error&&_.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(_.data.id,"created",`Created ${q}.`),_)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:k,createAsset:c,createQuickFixAsset:O,deleteAsset:$,loadAssetDeleteBlockers:b,removeAssetPart:u,requestDeleteAsset:A,updateAsset:o,updateAssetStatus:p}}typeof Se<"u"&&Se.exports&&(Se.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var zt=Q((tr,qe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function f(){let p=n.querySelector("#detail-panel");p.innerHTML=e.renderRequestFormContent()}async function a(p){p.preventDefault(),await i(p.target)}async function i(p){let g=n.querySelector("#request-error"),u=p.querySelector("button[type='submit']");g&&(g.textContent=""),u&&(u.disabled=!0,u.textContent="Submitting...");try{let h=new t(p),y=h.get("asset_id")||null,b=String(h.get("equipment_note")||"").trim();if(y&&b)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!b)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let k=b||e.assetNameFor?.(y)||"Saved equipment",A=e.requiredText(h.get("description"),"Request details"),$=e.requiredText(h.get("requester_name"),"Your name"),O={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${k}

${A}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:$};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:q,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(O).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(v)throw v;let S=h.get("photo"),_="";if(S&&S.name){let U=await e.addPhotoToMaintenanceRequest(q.id,S);U&&(_=` Photo did not upload: ${U.message||U}`)}let D=await e.notifyRequestEmailer(q.id);D?.error&&console.warn("Request email notification did not send",D.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${_}`,_?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":r(h.message||h)}finally{u&&(u.disabled=!1,u.textContent="Submit Request")}}async function d(p){let g=e.getMaintenanceRequests().find(h=>h.id===p);if(!g)return;let u=n.querySelector(`[data-convert-request="${s.escape(p)}"]`);u&&(u.disabled=!0,u.textContent="Converting...");try{let h={company_id:e.getActiveCompanyId(),location_id:g.location_id||e.locationIdForAsset(g.asset_id),title:g.title,description:e.descriptionWithRequestPhotoNote(g.description,g),asset_id:g.asset_id||null,priority:g.priority||"medium",type:"corrective",status:"open",created_by:e.getSession().user.id};e.applySafetyRequirementPayload(h),e.applySafetyCheckPayload(h,!1);let{data:y,error:b}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",h,{returnSingle:!0}),"Request conversion timed out. Check your connection and try again.",15e3);if(b)throw b;let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").update({status:"converted",reviewed_by:e.getSession().user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:y.id}).eq("id",p).eq("company_id",e.getActiveCompanyId()),"Request status update timed out. Check your connection and try again.",15e3);if(k)throw k;e.setActiveSection("work"),e.setActiveWorkOrderId(y.id),await e.withOperationTimeout(e.recordWorkOrderEvent(y.id,"request_converted","Request converted to work order."),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),u&&(u.disabled=!1,u.textContent="Convert to Work Order")}}function m(p){let g=e.getMaintenanceRequests().find(u=>u.id===p);g&&(e.setQuickFixRequestId(p),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function c(p){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===p)&&(e.setPendingDeleteRequestId(p),e.renderWorkspace())}async function o(p){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===p);if(!g)return;let u=n.querySelector(`[data-confirm-delete-request="${s.escape(p)}"]`);u&&(u.disabled=!0,u.textContent="Deleting...");try{if(g.photo_storage_path){let k=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(k.error)throw new Error(`Could not remove request photo: ${k.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let b=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(b.error)throw new Error(`Request delete verification failed: ${b.error.message}`);if(b.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),u&&(u.disabled=!1,u.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:d,createRequest:a,createRequestFromForm:i,deleteMaintenanceRequest:o,openQuickFixForRequest:m,renderRequestForm:f,requestDeleteMaintenanceRequest:c}}typeof qe<"u"&&qe.exports&&(qe.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var Gt=Q((nr,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert;async function s(f){f.preventDefault();let a=f.target,i=a.querySelector("button[type='submit']"),d=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",d&&(d.textContent="");try{let m=new t(a),c=m.get("status")||"open",o=m.get("asset_id")||null,p=String(m.get("new_asset_name")||"").trim();if(o&&p)throw new Error("Choose existing equipment or create new equipment, not both.");if(p){let{data:O,error:q}=await e.createQuickFixAsset(p,"running");if(q){d&&(d.textContent=`Could not add equipment: ${q.message}`);return}o=O.id}if(!p&&!e.confirmAssetLocationRouting(o,"creating this work order",d))return;if(c==="completed"&&e.assetRequiresSafety(o)&&m.get("safety_devices_checked")!=="on"){d&&(d.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=c==="completed"?e.blocksProcedureCompletion(null,m.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),d&&(d.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let u={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(o),title:e.requiredText(m.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(m.get("description"),m.get("assigned_to")),asset_id:o,priority:m.get("priority"),type:m.get("type")||"corrective",due_at:e.workOrderDateValue(m.get("due_at")),assigned_to:e.assignedUserFromForm(m),...e.procedureColumn(m.get("procedure_template_id")),status:c,created_by:e.getSession().user.id,actual_minutes:Number(m.get("actual_minutes"))||0,failure_cause:m.get("failure_cause")||null,resolution_summary:m.get("resolution_summary")||null,follow_up_needed:m.get("follow_up_needed")==="on",completion_notes:m.get("completion_notes")||null,completed_at:c==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(u),e.applySafetyCheckPayload(u,c==="completed"&&u.safety_check_required&&m.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",u,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){d&&(d.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),p&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${p}.`);let b=[],k=m.get("part_id");if(k){let O=e.getParts().find(v=>v.id===k),q=await e.addPartUsageToWorkOrder(h.id,O,Number(m.get("quantity_used"))||1);q?b.push(`part usage failed: ${q.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${O?.name||"Part"}.`)}let A=m.get("photo");if(A&&A.name){let O=await e.addPhotoToWorkOrder(h.id,A);O?b.push(`photo upload failed: ${O.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${A.name}.`)}let $=String(m.get("initial_comment")||"").trim();if($){let O=await e.addCommentToWorkOrder(h.id,$);O?b.push(`comment failed: ${O.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(b.length?`Work order created with warning: ${b[0]}`:"Work order created.",b.length?"warning":"success"),await e.render()}catch(m){d?d.textContent=`Could not create work order: ${m.message||m}`:r(m.message||m)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var Vt=Q((rr,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(f){f.preventDefault();let i=f.target.querySelector("button[type='submit']"),d=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",d&&(d.textContent="");try{let m=new t(f.target),c=e.getActiveWorkOrderId(),o=e.getWorkOrders().find($=>$.id===c),p=n.querySelector("#status-select")?.value||o?.status||"open",g=m.get("asset_id")||null;if(typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(g,"saving this work order",d)){i.disabled=!1,i.textContent="Save Work Order";return}let u={title:e.requiredText(m.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(m.get("description"),m.get("assigned_to")),due_at:e.workOrderDateValue(m.get("due_at")),asset_id:g,location_id:e.locationIdForAsset(g),status:p,priority:m.get("priority"),type:m.get("type"),assigned_to:e.assignedUserFromForm(m),...e.procedureColumn(m.get("procedure_template_id")),failure_cause:m.get("failure_cause")||null,resolution_summary:m.get("resolution_summary")||null,follow_up_needed:m.get("follow_up_needed")==="on",actual_minutes:Number(m.get("actual_minutes"))||0};if(u.safety_check_required=e.assetRequiresSafety(g),u.status==="completed"){let $=e.productionActionCompletionMessage?.(o)||"";if($){e.setWorkOrderActionWarning(c,$),i.disabled=!1,i.textContent="Save Work Order",d&&(d.textContent=$);return}}if(u.status==="completed"&&u.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(o)&&m.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",d&&(d.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let h=(o?.procedure_template_id||"")!==(u.procedure_template_id||""),y=u.status==="completed"&&(o?.status!=="completed"||h)?e.blocksProcedureCompletion(o,u.procedure_template_id||null):"";if(y){e.setWorkOrderActionWarning(c,y),i.disabled=!1,i.textContent="Save Work Order",d&&(d.textContent=y);return}u.status==="completed"&&o?.status!=="completed"?(u.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(u,u.safety_check_required&&(m.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)))):u.status!=="completed"?(u.completed_at=null,e.applySafetyCheckPayload(u,!1)):o?.status==="completed"&&u.safety_check_required&&m.has("safety_devices_checked")?e.applySafetyCheckPayload(u,m.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)):o?.status==="completed"&&!u.safety_check_required&&e.applySafetyCheckPayload(u,!1);let{error:b}=await e.withOperationTimeout(e.updateWorkOrderSafely(u,c),"Work order save timed out. Check your connection and try again.",2e4);if(b){i.disabled=!1,i.textContent="Save Work Order",d&&(d.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(b)}`);return}let k={...Object.fromEntries(m.entries()),status:p},A=await e.withOperationTimeout(e.recordWorkOrderEvent(c,"updated",e.describeWorkOrderChanges(o,k)),"Activity log timed out.",8e3).catch($=>$);e.setWorkOrderActionWarning("",""),e.showNotice(A?`Work order saved, but history did not update: ${A.message}`:"Work order saved.",A?"warning":"success"),await e.render()}catch(m){r.error("Work order save failed",m),i.disabled=!1,i.textContent="Save Work Order",d&&(d.textContent=`Could not save work order: ${m.message||m}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var Ht=Q((ar,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function r(f){f.preventDefault();let a=f.currentTarget,i=n.querySelector("#parts-used-error"),d=a.querySelector("button[type='submit']");i&&(i.textContent=""),d&&(d.disabled=!0,d.textContent="Recording...");try{let m=new t(a),c=m.get("part_id"),o=Number(m.get("quantity_used"))||1,p=e.getParts().find(u=>u.id===c);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!p)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),p,o);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(m){i&&(i.textContent=m.message||"Could not record part used.")}finally{d&&(d.disabled=!1,d.textContent="Record Part Used")}}async function s(f,a,i){if(!a)return new Error("Choose a part first.");let{error:d}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:f,p_part_id:a.id,p_quantity:i}),"Part usage save timed out.");return d||null}return{addPartUsageToWorkOrder:s,recordPartUsed:r}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var Yt=Q((or,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.consoleRef||console,f=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),a=25*1024*1024,i=5*1024*1024,d=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),m=new Set;async function c(w){w.preventDefault();let P=w.currentTarget,R=P.dataset.partDocument,E=n.querySelector(`[data-part-document-error="${R}"]`),C=P.querySelector("button[type='submit']"),I=new t(P),N=I.get("document"),L=h(I.get("document_type"));if(E&&(E.textContent=""),!e.getPartDocumentsReady()){E&&(E.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!N||!N.name){E&&(E.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(S(N)){E&&(E.textContent=_()),await $("part document",N,_());return}C&&(C.disabled=!0,C.textContent="Attaching...");let G=await q(N),X=G.fileName||e.safeFileName(N.name||"part-file"),ae=`${e.getActiveCompanyId()}/${R}/${r.randomUUID()}-${X}`;try{let ie=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(ae,G.blob,{contentType:G.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(ie.error)throw ie.error;let Z={company_id:e.getActiveCompanyId(),part_id:R,uploaded_by:e.getSession().user.id,storage_path:ae,file_name:X,content_type:G.contentType,document_type:L,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(N.name||"part-file"),original_size_bytes:N.size||null},{error:re}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(Z),"Part file record save timed out. Check your connection and try again.",15e3);if(re&&e.isColumnSchemaError(re,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete Z.document_type,delete Z.file_size_bytes,delete Z.original_file_name,delete Z.original_size_bytes,re=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(Z),"Part file record retry timed out. Check your connection and try again.",15e3)).error),re)throw await b("part-documents",ae),e.isColumnSchemaError(re,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?re.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(ie){await $("part document",N,ie),E&&(E.textContent=ie.message||"Could not attach file.")}finally{C&&(C.disabled=!1,C.textContent="Attach File")}}async function o(w){w.preventDefault();let P=w.currentTarget,R=P.dataset.assetDocument,E=n.querySelector(`[data-asset-document-error="${R}"]`),C=P.querySelector("button[type='submit']"),I=new t(P),N=I.get("document"),L=u(I.get("document_type"));if(E&&(E.textContent=""),!e.getAssetDocumentsReady?.()){E&&(E.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!N||!N.name){E&&(E.textContent="Choose a machine file first.");return}if(S(N)){E&&(E.textContent=_()),await $("equipment file",N,_());return}C&&(C.disabled=!0,C.textContent="Uploading...");let G=await q(N),X=`${e.getActiveCompanyId()}/${R}/${r.randomUUID()}-${G.fileName}`;try{let ae=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(X,G.blob,{contentType:G.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(ae.error)throw ae.error;let{error:ie}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:R,uploaded_by:e.getSession().user.id,storage_path:X,file_name:G.fileName,content_type:G.contentType,document_type:L,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(N.name||"machine-photo"),original_size_bytes:N.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(ie)throw await b("asset-documents",X),e.isColumnSchemaError(ie,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?ie.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(ae){await $("equipment file",N,ae),E&&(E.textContent=ae.message||"Could not upload machine file.")}finally{C&&(C.disabled=!1,C.textContent="Attach Machine File")}}async function p(w,P){let R=n.querySelector("[data-asset-document-error]");if(R&&(R.textContent=""),!w||!P){let E="Missing machine file record. Refresh and try again.";R?R.textContent=E:e.showNotice(E,"warning");return}try{let E=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([P]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(E.error)throw E.error;let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(C)throw C;e.showNotice("Machine file deleted."),await e.render()}catch(E){R?R.textContent=E.message||"Could not delete machine file.":e.showNotice(E.message||"Could not delete machine file.","warning")}}async function g(w,P){let R=n.querySelector("#photo-error");if(R&&(R.textContent=""),!w||!P){let E="Missing photo record. Refresh and try again.";R?R.textContent=E:e.showNotice(E,"warning");return}try{let E=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([P]),"Photo delete timed out. Check your connection and try again.",15e3);if(E.error)throw E.error;let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(C)throw C;let I=P.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${I}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(E){R?R.textContent=E.message||"Could not delete photo.":e.showNotice(E.message||"Could not delete photo.","warning")}}function u(w){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(w)?w:"other"}function h(w){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(w)?w:"other"}async function y(w){w.preventDefault();let P=w.currentTarget,R=P.querySelector("button[type='submit']"),E=n.querySelector("#photo-error");E&&(E.textContent="");let C=new t(P).get("photo");if(!C||!C.name){E&&(E.textContent="Choose a photo first.");return}let I=U(C);if(I){E&&(E.textContent=I),await $("work order photo",C,I);return}R.disabled=!0,R.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let L=await k(e.getActiveWorkOrderId(),C);if(L)throw L;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${C.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(N){await $("work order photo",C,N),E&&(E.textContent=`Could not upload photo: ${N.message||N}`)}finally{R.disabled=!1,R.textContent="Upload Photo"}}async function b(w,P){try{let{error:R}=await e.withOperationTimeout(e.supabaseClient().storage.from(w).remove([P]),"Uploaded file cleanup timed out.",1e4);R&&s.warn(`Could not remove uploaded ${w} object`,R)}catch(R){s.warn(`Could not remove uploaded ${w} object`,R)}}async function k(w,P){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let E=U(P);if(E)return await $("work order photo",P,E),new Error(E);let C=await q(P,O()),I=T(C);if(I)return await $("work order photo",P,I),new Error(I);let N=`${e.getActiveCompanyId()}/${w}/${r.randomUUID()}-${C.fileName}`,L=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(N,C.blob,{contentType:C.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(L.error)return await $("work order photo",P,L.error),L.error;let G={company_id:e.getActiveCompanyId(),work_order_id:w,uploaded_by:e.getSession().user.id,storage_path:N,file_name:C.fileName,content_type:C.contentType,file_size_bytes:C.blob.size||null,original_file_name:e.safeFileName(P.name||"photo"),original_size_bytes:P.size||null},{error:X}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record save timed out. Check your connection and try again.",15e3);return X&&e.isColumnSchemaError(X,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete G.file_size_bytes,delete G.original_file_name,delete G.original_size_bytes,X=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record retry timed out. Check your connection and try again.",15e3)).error),X&&await b("work-order-photos",N),X&&await $("work order photo",P,X),X||null}async function A(w,P){if(!w)return new Error("Request was not saved before photo upload.");let R=U(P);if(R)return await $("request photo",P,R),new Error(R);let E=await q(P,O()),C=T(E);if(C)return await $("request photo",P,C),new Error(C);let I=`${w}/${r.randomUUID()}-${E.fileName}`,N=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(I,E.blob,{contentType:E.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(N.error)return await $("request photo",P,N.error),N.error;let{error:L}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:w,p_photo_storage_path:I,p_photo_file_name:E.fileName,p_photo_content_type:E.contentType,p_photo_file_size_bytes:E.blob.size||null,p_photo_original_file_name:e.safeFileName(P.name||"photo"),p_photo_original_size_bytes:P.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return L&&(await b("maintenance-request-photos",I),await $("request photo",P,L)),L||null}async function $(w,P,R){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let E=String(R?.message||R||"Upload failed").slice(0,500),C=e.safeFileName(P?.name||"unknown-file"),I=D(P),N=Number(P?.size||0),L=[w,C,I,N,E].join("|");if(!m.has(L)){m.add(L);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||w||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${w}`.slice(0,140),details:[`Upload context: ${w}`,`File: ${C}`,`Type: ${I}`,`Size: ${N}`,`Error: ${E}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(G){s.warn("Could not report upload failure",G)}}}function O(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function q(w,P={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(w,P);let R=["image/jpeg","image/png","image/webp","image/heic","image/heif"],E=D(w);if(!R.includes(E))return{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:E};try{if(!f)throw new Error("Browser image optimization is unavailable.");let C=await f(w),I=Number(P.targetBytes||0)||1*1024*1024,N=P.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],L=null;for(let G of N){let X=await W(C,G.maxDimension,G.quality);if(L=X,X.size<=I)break}if(C.close&&C.close(),!L)throw new Error("Browser could not optimize this image.");return{blob:L,fileName:`${e.fileBaseName(w.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(C){return s.warn("Photo optimization failed; uploading original.",C),{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:E}}}function v(w){return["image/jpeg","image/png","image/webp"].includes(D(w))}function S(w){return!v(w)&&Number(w.size||0)>a}function _(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function D(w){let P=String(w?.type||"").trim().toLowerCase();if(P)return P;let R=String(w?.name||"").toLowerCase();return/\.(jpe?g)$/.test(R)?"image/jpeg":/\.png$/.test(R)?"image/png":/\.webp$/.test(R)?"image/webp":/\.gif$/.test(R)?"image/gif":/\.heic$/.test(R)?"image/heic":/\.heif$/.test(R)?"image/heif":/\.pdf$/.test(R)?"application/pdf":/\.txt$/.test(R)?"text/plain":/\.csv$/.test(R)?"text/csv":/\.doc$/.test(R)?"application/msword":/\.docx$/.test(R)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(R)?"application/vnd.ms-excel":/\.xlsx$/.test(R)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function U(w){let P=D(w);return d.has(P)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function T(w){return d.has(String(w?.contentType||"").toLowerCase())?Number(w?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function W(w,P,R){let E=Math.min(1,P/Math.max(w.width,w.height)),C=Math.max(1,Math.round(w.width*E)),I=Math.max(1,Math.round(w.height*E)),N=n.createElement("canvas");N.width=C,N.height=I,N.getContext("2d",{alpha:!1}).drawImage(w,0,0,C,I);let G=await new Promise(X=>N.toBlob(X,"image/jpeg",R));if(!G)throw new Error("Browser could not optimize this image.");return G}return{addPhotoToMaintenanceRequest:A,addPhotoToWorkOrder:k,optimizePhoto:q,removeUploadedObject:b,reportUploadFailure:$,deleteAssetDocument:p,deleteWorkOrderPhoto:g,uploadAssetDocument:o,uploadPartDocument:c,uploadPhoto:y}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMediaStorageWorkflow:l}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:l}})()});var Kt=Q((ir,Re)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.URLRef||URL,f=e.consoleRef||console,a=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,d=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function m(u){u.preventDefault();let h=u.currentTarget,y=n.querySelector("#company-logo-error"),b=h.querySelector("button[type='submit']"),k=new t(h).get("logo");if(y&&(y.textContent=""),!k||!k.name){y&&(y.textContent="Choose a logo image first.");return}b&&(b.disabled=!0,b.textContent="Uploading...");try{let A=p(k);if(A)throw new Error(A);let $=await c(k),O=g($);if(O)throw new Error(O);let q=`${e.getActiveCompanyId()}/logo-${r.randomUUID()}-${$.fileName}`,v=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(q,$.blob,{contentType:$.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(v.error)throw new Error(v.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":v.error.message);let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:q}),"Company logo record save timed out. Check your connection and try again.",15e3);if(S)throw await e.removeUploadedObject("company-logos",q),new Error(e.isColumnSchemaError(S,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":S.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":S.message);let _=e.getCompanies().find(D=>D.id===e.getActiveCompanyId());_&&(_.logo_path=q,_.logoUrl=s.createObjectURL($.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(A){y&&(y.textContent=A.message||"Could not upload logo.")}finally{b&&(b.disabled=!1,b.textContent="Upload Logo")}}async function c(u){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(u);let h=o(u);try{if(!a)throw new Error("Browser logo optimization is unavailable.");let y=await a(u),k=Math.min(1,1200/Math.max(y.width,y.height)),A=Math.max(1,Math.round(y.width*k)),$=Math.max(1,Math.round(y.height*k)),O=n.createElement("canvas");O.width=A,O.height=$;let q=O.getContext("2d",{alpha:!0});q.clearRect(0,0,A,$),q.drawImage(y,0,0,A,$),y.close&&y.close();let v=await new Promise(S=>O.toBlob(S,"image/png"));if(!v)throw new Error("Browser could not optimize this logo.");return{blob:v,fileName:`${e.fileBaseName(u.name||"logo")}.png`,contentType:"image/png"}}catch(y){return f.warn("Logo optimization failed; uploading original.",y),{blob:u,fileName:e.safeFileName(u.name||"logo"),contentType:h}}}function o(u){let h=String(u?.type||"").trim().toLowerCase();if(h)return h;let y=String(u?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function p(u){let h=o(u);return d.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(u){return d.has(String(u?.contentType||"").toLowerCase())?Number(u?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:c,uploadCompanyLogo:m}}typeof Re<"u"&&Re.exports&&(Re.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var Jt=Q((sr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,r=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function f(i){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}if(!e.getParts().find(o=>o.id===i))return;let m=s(i);if(m){r(m);return}let c=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||c){a(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function a(i){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}let d=e.getParts().find(p=>p.id===i),m=n.querySelector("#part-delete-error");if(m&&(m.textContent=""),!d)return;let c=s(i);if(c){m&&(m.textContent=c);return}let o=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let p=(e.getPartDocumentsByPartId()[i]||[]).map(y=>y.storage_path).filter(Boolean);if(p.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(p),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:u}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(u)throw new Error(u.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":u.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(p){e.showNotice(p.message||"Could not delete part.","warning"),m&&(m.textContent=p.message||"Could not delete part."),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}return{deletePart:a,requestDeletePart:f}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof Ze<"u"&&(Ze.exports={createPartDeleteWorkflow:l})})()});var Zt=Q((cr,Xe)=>{(function(){function l(e={}){async function n(t){let r=t.target,s=r.type==="checkbox"?r.checked?"checked":"":r.value;r.disabled=!0;try{let{error:f}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:r.dataset.workOrderId,procedure_step_id:r.dataset.stepResult,completed_by:s?e.getSession().user.id:null,value:s,completed_at:s?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(f)throw f;await e.withOperationTimeout(e.recordWorkOrderEvent(r.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let a=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(i=>i);if(a){e.showNotice(`Checklist saved, but refresh did not finish: ${a.message||a}`,"warning"),r.disabled=!1;return}if(e.getWorkOrderActionWarningId()===r.dataset.workOrderId){let i=e.getWorkOrders().find(d=>d.id===r.dataset.workOrderId);e.blocksProcedureCompletion(i)||e.setWorkOrderActionWarning("","")}e.renderWorkspace()}catch(f){e.showNotice(`Could not save checklist step: ${f.message||f}`,"warning"),r.disabled=!1}}return{saveStepResult:n}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:l},typeof Xe<"u"&&(Xe.exports={createProcedureChecklistWorkflow:l})})()});var Xt=Q((lr,et)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,r=e.FormDataCtor||FormData;async function s(m,c){let{data:o,error:p}=await e.withOperationTimeout(e.getPublicRequestIntake(m),c);return{data:Array.isArray(o)?o[0]:o,error:p}}async function f(m){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let c=null;try{let{data:p,error:g}=await s(m,"Request QR lookup timed out.");if(c=p,g||!c){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let o=e.publicRequestUrl(m);e.setAppHtml(e.publicRequestQrPage(c,o)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(c,o)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function a(m){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let c=null;try{let{data:o,error:p}=await s(m,"Request form lookup timed out.");if(p){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}c=o}catch(o){i(o.message||"This request link could not be loaded.");return}if(!c){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(c)),n.querySelector("#public-request-form").addEventListener("submit",o=>d(o,m,c))}function i(m){e.setAppHtml(e.publicRequestError(m))}async function d(m,c,o){m.preventDefault();let p=m.currentTarget,g=new r(p),u=n.querySelector("#public-request-error"),h=p.querySelector("button[type='submit']");u&&(u.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:b}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:c,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(b)throw b;let k=g.get("photo"),A="";if(k&&k.name){let O=await e.addPhotoToMaintenanceRequest(y,k);O&&(A=`Request sent, but the photo did not upload: ${O.message||O}`)}let $=await e.notifyRequestEmailer(y);$.error&&e.warn("Request email notification did not send",$.error),e.setAppHtml(e.publicRequestSuccess(o,A)),n.querySelector("#public-request-another").addEventListener("click",()=>a(c))}catch(y){u&&(u.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:a,renderPublicRequestQrPage:f,submitPublicRequest:d}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof et<"u"&&(et.exports={createPublicRequestIntakeWorkflow:l})})()});var en=Q((ur,tt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(f){f.preventDefault();let a=f.target,i=a.querySelector("button[type='submit']"),d=n.querySelector("#company-error"),m=String(new t(a).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",d.textContent="";try{if(!m)throw new Error("Company name is required.");let c=e.getCompanies().find(u=>u.name.trim().toLowerCase()===m.trim().toLowerCase());if(c){e.setActiveCompanyId(c.id),e.persistActiveCompanyId(c.id),await e.render();return}let{data:o,error:p}=await e.withOperationTimeout(e.createCompanyRecord(m),"Company creation timed out.");if(p){d.textContent=p.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":p.message;return}if(e.setActiveCompanyId(o),e.persistActiveCompanyId(o),!await e.ensureProfileForActiveCompany(m))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(c){d.textContent=c.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:r}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof tt<"u"&&(tt.exports={createCompanySetupWorkflow:l})})()});var tn=Q((dr,nt)=>{(function(){function l(e={}){async function n(r){let s=e.getWorkOrders().find(f=>f.id===e.getActiveWorkOrderId());r.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),r.target.value)||(r.target.value=s?.status||"open")}catch(f){r.target.value=s?.status||"open",e.showNotice(`Could not update status: ${f.message||f}`,"warning")}finally{r.target.disabled=!1}}async function t(r,s){let f=e.getWorkOrders().find(c=>c.id===r);if(s==="completed"){let c=e.productionActionCompletionMessage?.(f)||"";if(c)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,c),e.showNotice(c,"warning"),await e.render(),!1;let o=e.blocksProcedureCompletion(f);if(o)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,o),e.showNotice(o,"warning"),await e.render(),!1}let a=e.currentSafetyCheckboxCheckedForWorkOrder(r),i=e.hasCompletedSafetyDeviceCheck(f)||a;if(s==="completed"&&e.requiresSafetyDeviceCheck(f)&&!i){e.setActiveWorkOrderId(r);let c="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(r,c),e.showNotice(c,"warning"),await e.render(),!1}let d={status:s,asset_id:f?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(d),s==="completed"?e.applySafetyCheckPayload(d,d.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(d,!1),delete d.asset_id;let{error:m}=await e.withOperationTimeout(e.updateWorkOrderSafely(d,r),"Status save timed out. Check your connection and try again.",15e3);return m?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(m)}`,"warning"),!1):(e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(r,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof nt<"u"&&(nt.exports={createWorkOrderStatusWorkflow:l})})()});var nn=Q((pr,Ee)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function r(d,m){return d?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${m}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${m}"]`)||null}async function s({workOrderId:d,payload:m,source:c,busyText:o,successMessage:p}){let g=c?.querySelector?.("button[type='submit']")||c,u=g?.textContent||"",h=r(c,d);g&&(g.disabled=!0,g.textContent=o),h&&(h.textContent="");try{let y=await e.withOperationTimeout(e.updateProductionActionRecord(d,m),"Production Action save timed out. Check your connection and try again.",15e3);if(y.error){let b=e.friendlyWorkOrderSaveError(y.error);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}return e.showNotice(p,"success"),await e.afterProductionActionMutation(y.data,d),!0}catch(y){let b=y.message||String(y);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=u)}}async function f(d){d.preventDefault(),d.stopPropagation();let m=d.currentTarget,c=m.dataset.productionActionForm,o=new n(m),p=String(o.get("production_action")||"").trim(),g=String(o.get("production_action_assigned_to")||"").trim(),u=r(m,c);if(!p||!g){u&&(u.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(c);await s({workOrderId:c,payload:{production_action:p,production_action_assigned_to:g},source:m,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function a(d){d.preventDefault(),d.stopPropagation();let m=d.currentTarget,c=m.dataset.workOrderId,o=m.dataset.productionActionStatus;await s({workOrderId:c,payload:{production_action_status:o},source:m,busyText:o==="completed"?"Completing...":"Reopening...",successMessage:o==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(d){d.preventDefault(),d.stopPropagation();let m=d.currentTarget,c=m.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:c,payload:{production_action:null},source:m,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:f,setProductionActionStatus:a,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof Ee<"u"&&Ee.exports&&(Ee.exports={createProductionActionWorkflow:l})})()});var rn=Q((mr,rt)=>{(function(){function l(e){async function n(t,r){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(f=>f.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let f=e.workOrderDateValue(r);if(!f)throw new Error("Choose a due date.");let a=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:f},t),"Due date save timed out. Check your connection and try again.");if(a.error)throw a.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:f}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:f}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${f} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:f}}catch(f){return e.showNotice(`Could not set due date: ${f.message||f}`,"warning"),{saved:!1,reason:"save_failed",error:f}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof rt<"u"&&(rt.exports={createPlanningDueDateWorkflow:l})})()});var an=Q((fr,at)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:r}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:r||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof at<"u"&&(at.exports={notifyRequestEmailer:l})})()});var on=Q((gr,ot)=>{(function(){async function l(n,t,r=[],s={}){let f=s.pathKey||"storage_path",a=s.urlKey||"signedUrl",i=s.expiresIn||600,d=s.onError;await Promise.all(r.map(async m=>{let c=m?.[f];if(!c)return;let{data:o,error:p}=await n.storage.from(t).createSignedUrl(c,i);if(p){m[a]="",typeof d=="function"&&d(m,p);return}m[a]=o?.signedUrl||""}))}function e(n={}){function t(r){if(!r||!n.getReady())return;let f=(n.getRows(r)||[]).filter(i=>i.storage_path&&!i.signedUrl),a=n.getSigningMap();!f.length||a[r]||(a[r]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,f),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete a[r],n.getActiveGroupId()===r&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof ot<"u"&&(ot.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var sn=Q((hr,it)=>{(function(){function l(t,r){if(t[r]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${r}`);return t[r]}function e(t={}){let r=l(t,"supabaseClient"),s=l(t,"workspaceUiState"),f=l(t,"applyRequestQueryFilters"),a=l(t,"applyWorkOrderListFilters"),i=l(t,"applyWorkOrderFilters"),d=l(t,"selectWorkOrders"),m=l(t,"countWorkOrdersQuery"),c=l(t,"fetchExactSearchedWorkOrderPage"),o=l(t,"isColumnSchemaError"),p=t.warn||(()=>{}),g=l(t,"LIST_ITEMS_PER_PAGE"),u=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),y=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),b=l(t,"REQUEST_FALLBACK_SELECT"),k=l(t,"WORK_ORDER_RELATION_SELECT"),A=l(t,"WORK_ORDER_FALLBACK_SELECT");function $(){return typeof r=="function"?r():r}async function O(T=s.getRequestViewFilter(),W={}){let w=Math.max(1,s.getRequestsPage()),P=(w-1)*g,R=P+g-1,E=W.includeRelations===!1?b:W.includeLocationRelation===!1?y:h,C=await f($().from("maintenance_requests").select(E,{count:"exact"}),T).order("created_at",{ascending:!1}).range(P,R);return C.error&&W.includeLocationRelation!==!1&&o(C.error,["location_id","locations"])?O(T,{includeLocationRelation:!1}):C.error&&W.includeRelations!==!1?O(T,{includeRelations:!1}):!C.error&&C.count&&w>1&&P>=C.count?(s.setRequestsPage(Math.max(1,Math.ceil(C.count/g))),O(T,W)):C}async function q(T){let W=await f($().from("maintenance_requests").select("id",{count:"exact",head:!0}),T);return W.error?(p("Request count failed",W.error),0):W.count||0}async function v(){let[T,W,w]=await Promise.all([q("active"),q("converted"),q("all")]);return{active:T,converted:W,all:w}}async function S(T={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return c(T);let W=Math.max(1,s.getWorkOrderPage()),w=(W-1)*u,P=w+u-1,R=T.includeLocationRelation===!1?A:k,E=await a(d($(),R,{count:"exact"})).range(w,P);return!E.error&&E.count&&W>1&&w>=E.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(E.count/u))),S(T)):E}async function _(T={}){let W=await i(m($()),T);return W.error?(p("Work order count failed",W.error),0):W.count||0}async function D(){let[T,W,w,P,R,E,C,I]=await Promise.all([_({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:T,newWork:W,inProgress:w,blocked:P,overdue:R,completedAll:E,completedMonth:C,completedWeek:I}}async function U(){let[T,W,w,P,R,E,C,I]=await Promise.all([_({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:T,newWork:W,inProgress:w,blocked:P,overdue:R,completedAll:E,completedMonth:C,completedWeek:I}}return{fetchRequestPage:O,countRequests:q,loadRequestDashboardCounts:v,fetchWorkOrderPage:S,countWorkOrders:_,loadWorkOrderDashboardCounts:D,loadMyWorkDashboardCounts:U}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof it<"u"&&(it.exports=n)})()});var cn=Q((yr,st)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,r=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function f(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function a(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){d("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let u=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;u=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;u=h?.session||null}if(!u){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;u=h?.session||null}if(!u)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(u),a(),d("Verification complete. Loading workspace..."),await e.render()}catch(u){a(),m(u.message||"This verification link is invalid or expired.")}}function d(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallback(g)}function m(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function c(g=e.passwordRecoveryParamsFromUrl()){let u=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:b}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});u=!!(y?.session&&!b),b&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";p({ready:u,initialError:h})}function o(g="",u=""){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordResetRequest(g,u),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,b=y.querySelector("button[type='submit']"),k=t.querySelector("#auth-error"),A=t.querySelector("#auth-status"),$=String(new FormData(y).get("email")||"").trim();k.textContent="",A.textContent="Sending reset link...",b.disabled=!0,b.textContent="Sending...";try{let{error:O}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail($,{redirectTo:f()}),"Password reset email timed out. Check your connection and try again.",2e4);if(O){A.textContent="",k.textContent=O.message;return}A.textContent="If that email exists in Supabase, a reset link has been sent."}catch(O){A.textContent="",k.textContent=O.message||"Could not send reset link."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Send Reset Link")}})}function p({ready:g=!1,initialError:u=""}={}){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordRecovery({ready:g,initialError:u}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{a(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{a(),o()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,b=y.querySelector("button[type='submit']"),k=new FormData(y),A=String(k.get("password")||""),$=String(k.get("confirmPassword")||""),O=t.querySelector("#auth-error"),q=t.querySelector("#auth-status");if(O.textContent="",A.length<8){O.textContent="Password must be at least 8 characters.";return}if(A!==$){O.textContent="Passwords do not match.";return}q.textContent="Updating password...",b.disabled=!0,b.textContent="Updating...";try{let{error:v}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:A}),"Password update timed out. Try the newest reset link again.",2e4);if(v){q.textContent="",O.textContent=v.message;return}a();let{data:S}=await e.supabaseClient.auth.getSession();if(e.setSession(S.session),q.textContent=S.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",S.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(v){q.textContent="",O.textContent=v.message||"Could not update password."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:f,clearPasswordRecoveryUrl:a,startAuthCallback:i,renderAuthCallback:d,renderAuthCallbackError:m,startPasswordRecovery:c,renderPasswordResetRequest:o,renderPasswordRecovery:p}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof st<"u"&&(st.exports={createAuthSessionFlow:l})})()});var ln=Q((br,Oe)=>{(function(){function l(f,a){let i=a.getProfilesByUserId();if(f.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${a.escapeHtml(i[f.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(f.created_at).toLocaleString()}</span>
        <p>${a.escapeHtml(f.body)}</p>
      </article>
    `;if(f.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${a.photoMetaText(f)} &middot; ${a.escapeHtml(i[f.uploaded_by]?.full_name||"Team member")}</span>
        <p>${a.escapeHtml(f.file_name)}</p>
        ${f.signedUrl?`<a href="${a.escapeHtml(f.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(f.type==="part"){let m=a.partUsageUnitCost(f)*(Number(f.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(f.created_at).toLocaleString()} &middot; ${a.escapeHtml(i[f.created_by]?.full_name||"Team member")}</span>
        <p>${a.escapeHtml(f.parts?.name||"Part")} - ${Number(f.quantity_used)||0} used - ${a.money(m)}</p>
      </article>
    `}return`
    <article>
      <strong>${a.escapeHtml(f.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(f.created_at).toLocaleString()} \xC2\xB7 ${a.escapeHtml(i[f.actor_id]?.full_name||"Team member")}</span>
      <p>${a.escapeHtml(f.summary)}</p>
    </article>
  `}function e(f,a){let i=a.getProcedureTemplates(),d=a.getPartsUsedByWorkOrder(),m=a.getCommentsByWorkOrder(),c=a.getPhotosByWorkOrder(),o=a.getMessageThreads(),p=i.find(A=>A.id===f.procedure_template_id),g=p?a.checklistProgress(f,p):null,u=(d[f.id]||[]).length,h=(m[f.id]||[]).length,y=(c[f.id]||[]).length,b=o.filter(A=>A.work_order_id===f.id).length,k=[];return f.asset_id&&k.push(n("asset","Equipment",f.assets?.name||"Linked",a)),p&&g&&k.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,a)),u&&k.push(n("parts","Parts",String(u),a)),h&&k.push(n("comment","Comments",String(h),a)),b&&k.push(n("message","Messages",String(b),a)),y&&k.push(t(f.id,String(y),a)),k.length?`<div class="relationship-row">${k.join("")}</div>`:""}function n(f,a,i,d){return`
    <span class="relationship-chip ${f}" title="${d.escapeHtml(a)}">
      ${r(f)}
      <span>${d.escapeHtml(i)}</span>
    </span>
  `}function t(f,a,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(f)}" title="Open photos">
      ${r("photo")}
      <span>${i.escapeHtml(a)}</span>
    </button>
  `}function r(f){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[f]||""}function s(f){return Object.freeze({renderActivityItem:a=>l(a,f),renderRelationshipChips:a=>e(a,f),relationshipChip:(a,i,d)=>n(a,i,d,f),photoJumpChip:(a,i)=>t(a,i,f),relationshipIcon:r})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Oe<"u"&&Oe.exports&&(Oe.exports={createRelationshipDisplayHelpers:s})})()});var un=Q((wr,ct)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,r=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,f=e.isConvertedRequest,a=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),d=e.getPendingDeleteRequestId,m=e.getProfilesByUserId;function c(u,h){return u==="converted"?`${h} converted`:u==="all"?`${h} total`:`${h} active`}function o(u,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",u.active],["converted","Converted",u.converted],["all","All",u.all]].map(([k,A,$])=>`
            <button class="segment ${h===k?"active":""}" data-request-filter="${k}" type="button" ${y.locked&&k!=="active"?"disabled":""}>
              ${n(k==="active"?"open":k==="converted"?"completed":"all")}${A} <span>${$}</span>
            </button>
          `).join("")}
        </div>
      `}function p(u){let h=f(u),y=i(),b=d()===u.id,k=m(),A=u.created_at?new Date(u.created_at):null,$=A&&!Number.isNaN(A.getTime())?A.toLocaleString():"date unavailable",O=u.assets?.name||u.locations?.name||"No equipment",q=u.requested_by_name||k[u.requested_by]?.full_name||"Requester",v=u.converted_by||u.reviewed_by||"",S=k[v]?.full_name||"",_=S?`Converted to work order by ${S}`:v?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",D=y&&a()?b?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${t(u.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${t(u.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${h?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${u.priority}">${t(u.priority)}</span>
                <span class="chip ${h?"completed":"open"}">${h?"converted":t(u.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${t(u.title)}</h3>
            <p>${t(u.description||"No description.")}</p>
            ${s(u)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(O)}</span>
              <span><strong>Requester</strong>${t(q)}</span>
              <span><strong>Received</strong>${t($)}</span>
            </div>
          </div>
          ${y&&!h&&u.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${u.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${u.id}" type="button">Convert to Work Order</button>
              ${D}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(_)}</span>
              ${D}
            </div>
          `:""}
        </article>
      `}function g(){return`
        <form class="form-grid" id="request-form">
          <label>Request title<input name="title" required placeholder="Cold room door not sealing"></label>
          <label>Your name<input name="requester_name" required maxlength="120" placeholder="Who is submitting this?"></label>
          <fieldset class="equipment-choice request-equipment-choice" data-equipment-choice>
            <legend>Machine / area</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose saved equipment or an unlisted area">
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode> Saved equipment</label>
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode checked> Equipment not listed / general area</label>
            </div>
            <div data-equipment-choice-panel="existing" hidden>
              <label>Saved equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing data-equipment-choice-required="true" disabled>
                  <option value="">Choose saved equipment</option>
                  ${r()}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new">
              <label>Equipment name or general area<input name="equipment_note" data-equipment-choice-new data-equipment-choice-required="true" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
            </div>
          </fieldset>
          <label>Details<textarea name="description" rows="4" required placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
          <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
          <p class="error-text" data-asset-location-warning></p>
          <label>Priority
            <select name="priority">
              <option>medium</option>
              <option>high</option>
              <option>critical</option>
              <option>low</option>
            </select>
          </label>
          <p class="error-text" id="request-error"></p>
          <button class="primary-button request-action-button" type="submit">Submit Request</button>
        </form>
      `}return{requestPanelSubtitle:c,renderRequestFilterBar:o,renderMaintenanceRequest:p,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof ct<"u"&&(ct.exports={createRequestDisplayHelpers:l})})()});var dn=Q((vr,lt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=P=>String(P||"corrective").replace(/\b\w/g,R=>R.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:r,getWorkOrderFilter:s,getWorkOrderTypeFilter:f=()=>"all",getWorkOrderPriorityFilter:a=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:d=()=>"none",getActiveStatusFilter:m,getMyWorkFilter:c,getActiveSection:o,getDueState:p,getProcedureTemplates:g,getActiveWorkOrderId:u,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:b,TYPE_OPTIONS:k=[],OUTSIDE_VENDOR_VALUE:A,escapeHtml:$,cleanWorkOrderDescription:O,relationshipIcon:q,segmentIcon:v,isVendorAssigned:S,assignmentLabel:_,renderRelationshipChips:D,canAssignWorkOrderToMe:U,canManageTeam:T,renderProductionActionCard:W=()=>"",hasOpenProductionAction:w=()=>!1}){function P(){let M=r(),j=s(),z=m(),te=M?`${t(M)} Work`:j==="unassigned"?"Unassigned Work Orders":j==="vendor"?"Outside Vendor Work":j==="assigned"?"Assigned Work Orders":"Work Orders";return z==="active"||z==="all"?te==="Work Orders"?"Active Work Orders":`Active - ${te}`:`${e(z)} - ${te}`}function R(){let M=m();return M==="active"||M==="all"?"My Work":`${e(M)} - My Work`}function E(){return o()==="mywork"?R():P()}function C(M){let j=o(),z=c();return j==="mywork"?`${M} shown - ${j==="mywork"?z==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${M} shown`}function I(M,j,z){return`<option value="${$(M)}" ${M===z?"selected":""}>${$(j)}</option>`}function N(M){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[M]||"Any assignment"}function L(M){return M?M.charAt(0).toUpperCase()+M.slice(1):""}function G(M=[]){let j=m(),z=j==="all"?"active":j,te=s(),ee=r(),K=f(),Y=a(),ne=i(),J=d(),le=["completed","completed_month","completed_week"].includes(j),fe=z==="active"&&te==="all"&&!ee&&K==="all"&&Y==="all"&&ne==="newest"&&J==="none",oe=M.find(V=>V.userId===ee),F=[`Status: ${e(z)}`,`Assignment: ${N(te)}`,...oe?[`Person: ${oe.name}`]:[],...K!=="all"?[`Type: ${n(K)}`]:[],...Y!=="all"?[`Priority: ${L(Y)}`]:[]],de=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ge=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],ue=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],x=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${F.map(V=>`<li><span>${$(V)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${fe?"disabled":""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${z!=="active"?"is-active":""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${de.map(([V,ce])=>I(V,ce,z)).join("")}
                </select>
              </label>
              <label class="work-control-field ${te!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ge.map(([V,ce])=>I(V,ce,te)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${I("","Any team member",ee)}
                  ${M.map(V=>I(V.userId,V.name,ee)).join("")}
                </select>
              </label>
              <label class="work-control-field ${K!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${I("all","Any type",K)}
                  ${k.map(V=>I(V,n(V),K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${I("all","Any priority",Y)}
                  ${["critical","high","medium","low"].map(V=>I(V,L(V),Y)).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="work-control-section arrange-controls">
            <span class="work-control-section-title">Arrange by</span>
            <div class="work-control-fields">
              <label class="work-control-field">
                <span>Sort</span>
                <select data-work-sort-filter aria-label="Sort work orders" ${le?"disabled":""}>
                  ${le?I("completed","Recently completed","completed"):ue.map(([V,ce])=>I(V,ce,ne)).join("")}
                </select>
              </label>
              <label class="work-control-field ${J!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${x.map(([V,ce])=>I(V,ce,J)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function X(M,j){if(j==="assignee"){if(S(M))return{key:"vendor",label:"Outside vendor",order:900};if(!M.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let ee=_(M);return{key:`assignee:${M.assigned_to}`,label:ee,order:100}}if(j==="status"){let ee=["open","in_progress","blocked","completed"].indexOf(M.status);return{key:`status:${M.status}`,label:e(M.status),order:ee<0?99:ee}}if(j==="priority"){let ee=["critical","high","medium","low"].indexOf(M.priority);return{key:`priority:${M.priority}`,label:L(M.priority||"Unspecified"),order:ee<0?99:ee}}let z=M.type||"corrective",te=k.indexOf(z);return{key:`type:${z}`,label:n(z),order:te<0?99:te}}function ae(M,j={}){if(!M.length)return'<p class="muted">No work orders match these filters.</p>';let z=j.groupBy||"none";if(z==="none")return`<div class="work-list" id="work-order-list">${M.map(ie).join("")}</div>`;let te=new Map;return M.forEach(K=>{let Y=X(K,z);te.has(Y.key)||te.set(Y.key,{...Y,workOrders:[]}),te.get(Y.key).workOrders.push(K)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...te.values()].sort((K,Y)=>K.order-Y.order||K.label.localeCompare(Y.label)).map(K=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${$(K.label)}</h3>
                <span>${K.workOrders.length}</span>
              </div>
              <div class="work-list">${K.workOrders.map(ie).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function ie(M){let j=p(M),z=g().find(J=>J.id===M.procedure_template_id),te=M.created_at?new Date(M.created_at):null,ee=te&&!Number.isNaN(te.getTime())?te.toLocaleDateString():"",K=M.status==="completed",Y=K?"Completed":e(M.status),ne=J=>J==="completed"?"Complete":e(J);return`
        <article class="work-card status-card status-${M.status} ${M.id===u()?"selected":""}" data-id="${M.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${M.priority}">${M.priority}</span>
              <span class="chip">${$(n(M.type))}</span>
              <span class="chip ${M.status}">${Y}</span>
              ${j?`<span class="chip ${j.className}">${j.label}</span>`:""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${$(M.title)}</h3>
            <p>${$(O(M.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${q("asset")}${$(M.assets?.name||"General item / area")}</span>
            <span>${v(S(M)?"vendor":"mine")}${$(_(M))}</span>
            ${z?`<span>${q("procedure")}${$(z.name)}</span>`:""}
            <span>${v("due")}Due ${M.due_at||"unset"}</span>
            ${ee?`<span>${v("created")}Created ${$(ee)}</span>`:""}
            ${M.completed_at?`<span>${v("completed")}Completed ${new Date(M.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${D(M)}
          ${W(M)}
          <div class="quick-actions work-card-actions">
            ${!K&&U(M)?`<button class="assign-action" data-assign-me="${M.id}" type="button">Assign to me</button>`:""}
            ${!K&&T()?Z(M):""}
          ${b.filter(J=>J!==M.status&&!(J==="completed"&&w(M))).slice(0,3).map(J=>`
            <button data-quick-status="${J}" data-id="${M.id}" type="button">${ne(J)}</button>
          `).join("")}
        </div>
      </article>
    `}function Z(M){return`
        <form class="card-assign-form" data-card-assign="${M.id}">
          <select name="assigned_to" aria-label="Assign ${$(M.title)}">
            <option value="">Unassigned</option>
            <option value="${A}" ${S(M)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([j,z])=>`<option value="${j}" ${!S(M)&&j===M.assigned_to?"selected":""}>${$(z.full_name||t(j))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function re(M="",j={}){let z=M||"",te=j.managerOptions??T(),ee=j.allowUnassigned!==!1,K=j.selfLabel||"Assign to me",Y=[];return ee&&Y.push(`<option value="" ${z===""?"selected":""}>Unassigned</option>`),Y.push(`<option value="${y().user.id}" ${z===y().user.id?"selected":""}>${K}</option>`),te&&(Y.push(`<option value="${A}" ${z===A?"selected":""}>Outside vendor</option>`),Y.push(...Object.entries(h()).filter(([ne])=>ne!==y().user.id).map(([ne,J])=>`<option value="${ne}" ${z===ne?"selected":""}>${$(J.full_name||t(ne))}</option>`))),Y.join("")}function H(M){return S(M)?A:M?.assigned_to||""}function me(M,j=""){let z=H(M);return M?.status==="completed"?`
          <label ${j?`id="${j}"`:""}>Completed by / assigned to
            <input value="${$(_(M))}" disabled>
            <input name="assigned_to" type="hidden" value="${$(z)}">
          </label>
        `:T()?`
          <label ${j?`id="${j}"`:""}>Assign to
            <select name="assigned_to">
              ${re(z,{managerOptions:!0})}
            </select>
          </label>
        `:!M.assigned_to&&!S(M)?`
          <label ${j?`id="${j}"`:""}>Assign to
            <select name="assigned_to">
              ${re("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${j?`id="${j}"`:""}>Assigned to
          <input value="${$(_(M))}" disabled>
          <input name="assigned_to" type="hidden" value="${$(z)}">
        </label>
      `}return{workOrdersPanelTitle:P,myWorkPanelTitle:R,workQueuePanelTitle:E,workQueuePanelSubtitle:C,renderWorkOrderFilterToolbar:G,renderWorkOrderCollection:ae,renderWorkOrderCard:ie,renderCardAssignmentControl:Z,renderAssignmentSelect:re,renderWorkOrderAssignmentField:me}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof lt<"u"&&(lt.exports={createWorkQueueDisplayHelpers:l})})()});var pn=Q((kr,We)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(c=>e.normalizeRole(c.role)==="production").map(c=>({userId:c.user_id,name:e.teamMemberName(c.user_id)})).sort((c,o)=>c.name.localeCompare(o.name))}function t(c){return c.production_action_assigned_to?e.teamMemberName(c.production_action_assigned_to):"Production owner not set"}function r(c){let o=e.activeCompanyRole();return["admin","manager"].includes(o)||c.production_action_assigned_to===e.getSession()?.user?.id}function s(c=""){return n().map(p=>`
        <option value="${e.escapeHtml(p.userId)}" ${p.userId===c?"selected":""}>${e.escapeHtml(p.name)}</option>
      `).join("")}function f(c,o={}){let p=n(),g=o.compact?" compact":"";if(!p.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let u=p.some(h=>h.userId===c.production_action_assigned_to)?c.production_action_assigned_to:p[0].userId;return`
        <form class="production-action-form${g}" data-production-action-form="${e.escapeHtml(c.id)}">
          <label>Production action
            <textarea name="production_action" rows="${o.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(c.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${s(u)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(c.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(c)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(c)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(c.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function a(c){return!r(c)||c.status==="completed"?"":c.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(c.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(c.id)}" type="button">Reopen Production Action</button>`}function i(c){let o=c.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${o?"status-completed":"status-open"}">${o?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(c))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(c.production_action)}</p>
        ${o&&c.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(c.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function d(c){let o=e.canEditOperationalRecords()&&c.status!=="completed";return e.hasProductionAction(c)?`
        <section class="production-action-control ${c.production_action_status==="completed"?"is-completed":"is-open"}" data-production-action-control>
          ${i(c)}
          ${o?`
            <div class="button-row production-action-card-actions">
              ${a(c)}
              <details data-production-action-control>
                <summary>Edit Production Action</summary>
                ${f(c,{compact:!0})}
              </details>
            </div>
          `:""}
        </section>
      `:o?`
          <details class="production-action-control production-action-add" data-production-action-control>
            <summary><span class="chip production-action-chip">Production Action</span><span>Assign</span></summary>
            ${f(c,{compact:!0})}
          </details>
        `:""}function m(c){let o=e.canEditOperationalRecords()&&c.status!=="completed";return!e.hasProductionAction(c)&&!o?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(c)?i(c):'<p class="muted">No Production Action is assigned.</p>'}
          ${o?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(c)?a(c):""}
            </div>
            ${f(c)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:d,renderProductionActionDetail:m}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof We<"u"&&We.exports&&(We.exports={createProductionActionDisplayHelpers:l})})()});var mn=Q((_r,xe)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:r,getPhotosByWorkOrder:s,teamMemberName:f}){function a(d){return`
        <article class="mini-work-order" data-mini-work-order="${d.id}">
          <strong>${e(d.title)}</strong>
          <span>${n(d.status)} - ${d.due_at||"no due date"}</span>
        </article>
      `}function i(d){let m=(r()[d.id]||[]).length,c=(s()[d.id]||[]).length,o=d.completed_at?new Date(d.completed_at).toLocaleDateString():"",p=d.completed_by?f(d.completed_by):"",g=!p&&d.assigned_to?f(d.assigned_to):"",u=p?` by ${e(p)}`:g?` - owner ${e(g)}`:"",h=d.resolution_summary||d.completion_notes||"";return`
        <article class="mini-work-order ${d.status==="completed"?"completed-history":""}" data-mini-work-order="${d.id}">
          <div class="chip-row">
            <span class="chip ${d.status}">${n(d.status)}</span>
            ${d.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${m?`<span class="relationship-chip parts">${t("parts")}<span>${m}</span></span>`:""}
            ${c?`<span class="relationship-chip photo">${t("photo")}<span>${c}</span></span>`:""}
          </div>
          <strong>${e(d.title)}</strong>
          <span>${o?`Completed ${o}${u}`:`Due ${d.due_at||"unset"}`}</span>
          ${d.failure_cause?`<p><b>Finding:</b> ${e(d.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:a,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof xe<"u"&&xe.exports&&(xe.exports={createMiniWorkOrderDisplayHelpers:l})})()});var fn=Q((Sr,ut)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:r,getParts:s,getPartDocumentsByPartId:f,getPartDocumentsReady:a,getPendingDeletePartId:i,getShowPartSourceManager:d,getPartCostsReady:m,getPartInventoryFilter:c,getPartSearchQuery:o,partUsageRows:p,canDeleteParts:g,canEditOperationalRecords:u=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:b}){let k=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],A=k.reduce((w,[P,R])=>(w[P]=R.replace(/s$/,""),w),{});function $(w){return w.document_type?w.document_type:String(w.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(w.file_name||"")?"invoice":/receipt/i.test(w.file_name||"")?"receipt":/schematic|diagram/i.test(w.file_name||"")?"schematic":/print|drawing/i.test(w.file_name||"")?"part_print":/manual/i.test(w.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(w.file_name||"")?"spec_sheet":"other"}function O(){return k.map(([w,P])=>`
        <option value="${w}">${e(A[w]||P)}</option>
      `).join("")}function q(w){let P=$(w),R=String(w.content_type||"").startsWith("image/"),E=A[P]||"File",C=w.created_at?new Date(w.created_at).toLocaleString():"Uploaded",I=w.file_size_bytes?`${Math.round(Number(w.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${R?"image-file":""}">
          ${R&&w.signedUrl?`<a class="part-document-thumb" href="${e(w.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(w.signedUrl)}" alt="${e(w.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(E)}</span>
              ${I?`<span class="chip">${e(I)}</span>`:""}
            </div>
            <strong>${e(w.file_name)}</strong>
            <span>${e(C)}</span>
            ${w.original_file_name&&w.original_file_name!==w.file_name?`<small>Original: ${e(w.original_file_name)}</small>`:""}
            ${w.signedUrl?`<a href="${e(w.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function v([w,P],R){let E=R.filter(C=>$(C)===w);return E.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(P)}</h4>
            <span>${E.length}</span>
          </div>
          <div class="part-document-grid">
            ${E.map(q).join("")}
          </div>
        </section>
      `:""}function S(w){let P=w.reduce((E,C)=>{let I=$(C);return E[I]=(E[I]||0)+1,E},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(E=>P[E]).map(E=>`<span class="chip">${P[E]} ${e(A[E]||"file")}${P[E]===1?"":"s"}</span>`).join("")}function _(w){let P=Number(w.quantity_on_hand)||0,R=Number(w.reorder_point)||0,E=Number(w.unit_cost)||0,C=P<=R,I=Math.max(0,R-P);return`
        <article class="part-card part-tile ${C?"low-stock":""}" data-open-part="${w.id}" tabindex="0" role="button" aria-label="Open ${e(w.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${w.sku?`<span class="chip">${e(w.sku)}</span>`:""}
              ${w.supplier_name?`<span class="chip part-source-chip">${e(w.supplier_name)}</span>`:""}
              ${w.machine_note?`<span class="chip">${e(w.machine_note)}</span>`:""}
              ${C?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(w.name)}</h3>
            <div class="part-card-meta">
              <span>${P} on hand</span>
              <span>reorder at ${R}</span>
              <span>${m()?`${n(E)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${C&&R>0?`<small>Need ${I} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function D(){let w=s().filter(r),P=w.filter(t).length,R=c();return[["All Parts",w.length,"all"],["Low Stock",P,"low"]].map(([E,C,I])=>`
        <button class="parts-health ${I==="low"&&C?"attention":""} ${R===I?"active":""}" data-part-inventory-filter="${I}" type="button">
          <span>${E}</span>
          <strong>${C}</strong>
        </button>
      `).join("")}function U(w="default"){return`
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${e(o())}" placeholder="Search part name, SKU, source, count">
          </label>
          <button class="secondary-button" type="submit">Search</button>
        </form>
        <div class="part-sort-bar relationship-detail parts" aria-label="Parts sort">
          <label>Sort parts
            <select data-part-sort>
              <option value="default" ${w==="default"?"selected":""}>Default</option>
              <option value="source" ${w==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function T(w){let P=Number(w.quantity_on_hand)||0,R=Number(w.reorder_point)||0,E=Number(w.unit_cost)||0,C=f()[w.id]||[],I=S(C),N=u();return`
        <section class="part-detail-shell">
          ${N?h():""}
          ${y()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${w.sku?`<span class="chip">${e(w.sku)}</span>`:""}
                ${w.supplier_name?`<span class="chip part-source-chip">${e(w.supplier_name)}</span>`:""}
                ${w.machine_note?`<span class="chip">${e(w.machine_note)}</span>`:""}
                <span class="chip ${P<=R?"overdue":"open"}">${P<=R?"low stock":"stocked"}</span>
              </div>
              <h3>${e(w.name)}</h3>
              <p>${P} on hand - reorder at ${R}</p>
              ${I?`<div class="chip-row part-file-summary">${I}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${N?`<div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${w.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${e(w.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${w.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${e(w.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>`:""}
          </section>

          ${N?`<form class="part-detail-form relationship-detail parts" data-edit-part="${w.id}">
            <label>Name<input name="name" required value="${e(w.name)}"></label>
            <label>SKU<input name="sku" value="${e(w.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e(w.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e(w.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${P}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${R}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${E}"></label>
            <p class="error-text" data-part-edit-error="${w.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${N&&d()?b():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${C.length} file${C.length===1?"":"s"}</span>
            </div>
            ${N?`<form class="part-document-form" data-part-document="${w.id}">
              <label>File type<select name="document_type">${O()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${w.id}">${a()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${a()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${C.length?k.map(L=>v(L,C)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${N?W(w):""}
        </section>
      `}function W(w){let P=p(w.id).length,R=f()[w.id]||[],E=i()===w.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${P?`This part has ${P} usage record${P===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${R.length?` and ${R.length} filed receipt/invoice record${R.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${P?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:E?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${e(w.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${e(w.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-part="${e(w.id)}" type="button">Delete Part</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:_,renderPartsHealth:D,renderPartSearch:U,renderPartDetail:T,renderPartDangerZone:W}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof ut<"u"&&(ut.exports={createPartsDisplayHelpers:l})})()});var gn=Q((qr,dt)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:r,getAppIssueReportsReady:s,getAppIssueReports:f}){function a(){let m=s();return`
        <section class="panel full-width focus-panel app-issue-report-panel">
          <div class="panel-header">
            <h2>Report App Issue</h2>
            <button class="secondary-button back-action-button" data-cancel-app-issue-report type="button">Cancel</button>
          </div>
          <form class="form-grid app-issue-report-form" id="app-issue-report-form">
            <label>Short title<input name="title" required maxlength="140" placeholder="What broke or felt confusing?"></label>
            <label>Details<textarea name="details" rows="4" required placeholder="What were you trying to do, what happened, and what device were you on?"></textarea></label>
            <label>Severity
              <select name="severity">
                <option value="normal">Normal</option>
                <option value="blocking">Blocking</option>
                <option value="minor">Minor</option>
              </select>
            </label>
            <input name="screen" type="hidden" value="${t(r())}">
            <p class="muted">This sends the current company, location, screen, and signed-in user with the report.</p>
            <p class="error-text" id="app-issue-report-error">${m?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${m?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function i(m){let c={open:0,reviewing:1,resolved:2};return[...m].sort((o,p)=>{let g=(c[o.status||"open"]??1)-(c[p.status||"open"]??1);return g||new Date(p.created_at||0)-new Date(o.created_at||0)})}function d(){if(!e())return"";let m=s(),c=f(),o=i(c);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${m?`${c.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${m?`
            <div class="issue-report-list">
              ${o.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:a,renderAppIssueReportsPanel:d,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof dt<"u"&&(dt.exports={createAppIssuePanelDisplayHelpers:l})})()});var hn=Q((Cr,pt)=>{(function(){function l(e){let n=e.escapeHtml,t=e.getDueState,r=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,f=e.canEditOperationalRecords||(()=>!0);function a(){return e.getPreventiveSchedules().filter(c=>e.matchesActiveLocation(c)&&e.matchesSearch([c.title,c.frequency,c.next_due_at,c.assets?.name]))}function i(){return e.getProcedureTemplates().filter(c=>e.matchesSearch([c.name,c.description,...(c.procedure_steps||[]).map(o=>o.prompt)]))}function d(c){let o=t({due_at:c.next_due_at,status:"open"}),p=e.getPendingDeleteScheduleId()===c.id,g=f();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${n(c.frequency)}</span>
              ${o?`<span class="chip ${o.className}">${o.label}</span>`:""}
            </div>
            <h3>${n(c.title)}</h3>
            <p>${n(c.assets?.name||"No equipment")} - Next due ${c.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${c.id}" type="button">Generate Work</button>
            ${s()?p?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${n(c.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${n(c.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function m(c){let o=e.getWorkOrders().filter(y=>y.procedure_template_id===c.id).length,p=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===c.id).length,g=r({workOrders:o,schedules:p}),u=e.getPendingDeleteProcedureId()===c.id,h=f();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${c.procedure_steps?.length||0} steps</span>
              <span class="chip">${o} linked work orders</span>
              ${p?`<span class="chip">${p} PM schedules</span>`:""}
            </div>
            <h3>${n(c.name)}</h3>
            <p>${n(c.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(c.procedure_steps||[]).map(y=>`
              <div class="checklist-step">
                <span>${y.position}. ${n(y.prompt)}</span>
                <small>${n(y.response_type)} ${y.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${h?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${c.id}">
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
            <p class="error-text" data-step-error="${c.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
          </form>`:""}
          ${h&&s()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${g||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${n(c.id)}"></p>
              ${g?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:u?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${n(c.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${n(c.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${n(c.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:a,filteredProcedureTemplates:i,renderPreventiveSchedule:d,renderProcedureTemplate:m}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:l},typeof pt<"u"&&(pt.exports={createMaintenanceListDisplayHelpers:l})})()});var yn=Q(($r,mt)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:r,checklistProgress:s,requiredChecklistProgress:f,escapeHtml:a,cleanWorkOrderDescription:i,renderRelationshipChips:d,renderWorkOrderCommandSummary:m,renderWorkOrderRecommendation:c,statusLabel:o,normalizeWorkOrderType:p=R=>String(R||"corrective"),workOrderTypeLabel:g=R=>String(R||"corrective").replace(/\b\w/g,E=>E.toUpperCase()),hasCompletedSafetyDeviceCheck:u,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:b,renderWorkOrderAssignmentField:k,requiresSafetyDeviceCheck:A,renderWorkOrderMessages:$,renderProcedureOptions:O,money:q,photoMetaText:v,renderActivityItem:S,canDeleteWorkOrders:_,canEditOperationalRecords:D=()=>!0,renderProductionActionDetail:U=()=>"",hasOpenProductionAction:T=()=>!1}=e;function W(R,E){let C=e.getStepResultsByWorkOrder()[R.id]?.[E.id],I=C?.value||"",N=`data-step-result="${E.id}" data-work-order-id="${R.id}"`,L=`<input ${N} value="${a(I)}" placeholder="Result">`;return E.response_type==="checkbox"&&(L=`<label class="check-row"><input ${N} type="checkbox" ${I==="checked"?"checked":""}> Done</label>`),E.response_type==="pass_fail"&&(L=`
          <select ${N}>
            <option value="">Not checked</option>
            <option value="pass" ${I==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${I==="fail"?"selected":""}>Fail</option>
          </select>
        `),E.response_type==="number"&&(L=`<input ${N} type="number" value="${a(I)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${E.position}. ${a(E.prompt)} ${E.required?'<small class="required-mark">Required</small>':""}</span>
          ${L}
          ${C?.completed_at?`<small>Recorded ${new Date(C.completed_at).toLocaleString()}</small>`:""}
        </div>
      `}function w(R){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===R.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${a(R.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${R.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${R.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function P(){let R=e.getActiveWorkOrderId(),C=e.getWorkOrders().find(F=>F.id===R);if(!C)return n();let I=e.getCommentsByWorkOrder(),N=e.getPhotosByWorkOrder(),L=e.getEventsByWorkOrder(),G=e.getPartsUsedByWorkOrder(),X=e.getProcedureTemplates(),ae=e.getWorkOrderActionWarningId(),ie=e.getWorkOrderActionWarning(),Z=e.getParts(),re=e.getProfilesByUserId(),H=e.getCommentsError(),me=e.STATUS_OPTIONS||[],M=e.TYPE_OPTIONS||[],j=I[C.id]||[],z=N[C.id]||[],te=L[C.id]||[],ee=G[C.id]||[],K=ee.reduce((F,de)=>F+(Number(de.quantity_used)||0)*t(de),0),Y=ee.reduce((F,de)=>F+(Number(de.quantity_used)||0),0),ne=r(j,z,te,ee),J=X.find(F=>F.id===C.procedure_template_id),le=J?s(C,J):null,fe=J?f(C,J):null,oe=D();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${C.priority}">${C.priority}</span>
            <span class="chip">${a(g(C.type))}</span>
            <span class="chip ${C.status}">${o(C.status)}</span>
          </div>
          <h2>${a(C.title)}</h2>
          <p>${a(i(C.description)||"No description.")}</p>
          ${d(C)}
          ${C.completed_at?`<p class="completion-note">Completed ${new Date(C.completed_at).toLocaleString()} \xC2\xB7 ${C.actual_minutes||0} min</p>`:""}
          ${C.asset_id&&u(C)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${C.completion_notes?`<p>${a(C.completion_notes)}</p>`:""}
        </div>

        ${m(C)}
        ${c(C)}
        ${U(C)}

        ${C.completed_at&&(C.failure_cause||C.resolution_summary||C.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${C.failure_cause?`<article><span>Cause</span><strong>${a(C.failure_cause)}</strong></article>`:""}
            ${C.resolution_summary?`<article><span>Resolution</span><strong>${a(C.resolution_summary)}</strong></article>`:""}
            ${C.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${oe?`<label>Status
          <select id="status-select">
            ${me.map(F=>`<option value="${F}" ${F===C.status?"selected":""} ${F==="completed"&&T(C)?"disabled":""}>${o(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${oe?`<div class="quick-actions detail-quick-actions">
          ${h(C)?`<button class="assign-action" data-assign-me="${C.id}" type="button">${C.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${me.filter(F=>F!==C.status&&!(F==="completed"&&T(C))).map(F=>`
            <button data-quick-status="${F}" data-id="${C.id}" type="button">${o(F)}</button>
          `).join("")}
        </div>`:""}
        ${ae===C.id&&ie?`<p class="error-text action-warning">${a(ie)}</p>`:""}

        ${oe?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${a(C.title)}"></label>
            <fieldset class="equipment-choice" id="quick-update-equipment-field" data-equipment-choice>
              <legend>Machine / equipment</legend>
              <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
                <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
                <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
              </div>
              <div data-equipment-choice-panel="existing">
                <label>Existing machine / equipment
                  <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                    <option value="">No machine / equipment - general item or area</option>
                    ${y(C.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${a(b(C.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${a(C.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${a(C.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${me.map(F=>`<option value="${F}" ${F===C.status?"selected":""} ${F==="completed"&&T(C)?"disabled":""}>${o(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===C.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${k(C,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${O(C.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${C.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${A(C)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${C.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
            <p class="error-text" id="quick-update-error"></p>
            <button class="primary-button quick-fix-submit" type="submit">Save Quick Update</button>
          </form>
        </details>`:""}

        <div class="downtime-copy relationship-detail asset" id="work-order-email-helper-target">
          <div>
            <h3>Email Helper</h3>
            <p class="muted">Copy a human update for email when this machine/equipment is down or needs attention.</p>
          </div>
          <div class="quick-actions">
            <button class="secondary-button" data-copy-downtime="subject" data-id="${C.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${C.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${$(C)}

        ${oe?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${a(C.title)}"></label>
          <label>Description<textarea name="description" rows="3">${a(i(C.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${a(C.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===C.priority?"selected":""}>${F}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${M.map(F=>`<option value="${F}" ${F===p(C.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${k(C)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${O(C.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${a(C.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${a(C.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${C.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${A(C)?`
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${C.safety_devices_checked?"checked":""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          `:""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${C.actual_minutes||0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>`:""}

        ${J?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${a(J.name)}</h3>
              <span>${le.done} of ${le.total} complete \xC2\xB7 required ${fe.done}/${fe.total}</span>
            </div>
            <div class="checklist-list">
              ${J.procedure_steps.map(F=>oe?W(C,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${a(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${a(e.getStepResultsByWorkOrder()[C.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${oe&&C.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${fe?.total?`<p class="${fe.done===fe.total?"completion-note":"warning-text"}">Required checklist: ${fe.done}/${fe.total}</p>`:""}
            ${T(C)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${C.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${A(C)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${u(C)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${T(C)?"disabled":""}>Complete Work Order</button>
          </form>
          </details>
        `:""}

        <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
          <summary>Parts Used</summary>
        ${oe?`<form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${Z.map(F=>`<option value="${F.id}">${a(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${ee.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${q(K)}</span></article>`:""}
          ${ee.map(F=>`
            <article class="relationship-detail parts">
              <strong>${a(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${q((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${a(re[F.created_by]?.full_name||"Team member")}</small>
            </article>
          `).join("")||'<p class="muted">No parts used yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos</summary>
        ${oe?`<form class="form-grid relationship-detail photo" id="photo-form">
          <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Images only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
          <p class="error-text" id="photo-error"></p>
          <button class="secondary-button" type="submit">Upload Photo</button>
        </form>`:""}

        <div>
          <h3>Photos</h3>
          <div class="photo-list">
            ${z.map(F=>`
              <article class="relationship-detail photo">
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${a(F.signedUrl)}" alt="${a(F.file_name)}">`:""}
                <strong>${a(F.file_name)}</strong>
                <span>${v(F)}</span>
                ${F.signedUrl?`<a href="${a(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${oe?`<button class="text-button danger-link" data-delete-work-order-photo="${a(F.id||"")}" data-work-order-photo-path="${a(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
              </article>
            `).join("")||'<p class="muted">No photos uploaded yet.</p>'}
          </div>
        </div>
        </details>

        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        ${oe?`<form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>`:""}
        <div class="comment-list">
          ${j.map(F=>`
            <article class="relationship-detail comment">
              <strong>${a(re[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${a(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${H?`<p class="error-text">${a(H)}</p>`:""}
          ${ne.map(S).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${oe&&_()?w(C):""}
      </div>
    `}return{renderWorkOrderDetail:P}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof mt<"u"&&(mt.exports={createWorkOrderDetailDisplayHelpers:l})})()});var bn=Q((Pr,ft)=>{(function(){function l(){function e(){return`
        <section class="equipment-structure-guide" aria-label="Equipment structure guide">
          <div class="guide-header">
            <span class="guide-kicker">Structure Guide</span>
            <strong>How to model primary equipment, sub equipment, tooling, components, parts, and shop items</strong>
          </div>
          <div class="equipment-structure-grid">
            <article>
              <span>Primary</span>
              <strong>Main equipment record</strong>
              <p>Use for the progressive roll former, ASC line, folder, press, or main equipment people open work against.</p>
            </article>
            <article>
              <span>Forklift</span>
              <strong>Mobile equipment record</strong>
              <p>Use for lift trucks that need repairs, inspections, battery/propane notes, attachments, PM, or recurring issue history.</p>
            </article>
            <article>
              <span>Sub Equipment</span>
              <strong>Major section under a primary</strong>
              <p>Use for uncoiler, forming section, shear, HPU, controls cabinet, conveyor, or another major section under a primary record.</p>
            </article>
            <article>
              <span>Tooling / Setup</span>
              <strong>Swappable profile or station setup</strong>
              <p>Use for roll tooling sets, die sets, profile setups, or station tooling worth tracking separately.</p>
            </article>
            <article>
              <span>Component</span>
              <strong>Tracked piece of equipment</strong>
              <p>Use when a piece of equipment needs its own repairs, PM, adjustments, serial, or recurring issue history.</p>
            </article>
            <article>
              <span>Part</span>
              <strong>Inventory item</strong>
              <p>Use for stocked, purchased, or consumed items like bearings, belts, sensors, fuses, filters, bolts, seals, and common spares.</p>
            </article>
            <article>
              <span>Shop Item</span>
              <strong>Standalone support asset</strong>
              <p>Use for tools or support equipment worth tracking, like welders, test meters, portable pumps, ladders, and tool carts.</p>
            </article>
          </div>
          <p class="guide-note"><strong>Quick rule:</strong> Primary = main equipment. Sub Equipment = major section. Component = tracked piece. Part = inventory. Shop Item = standalone support asset.</p>
          <p class="guide-note"><strong>Roll former rule:</strong> station = position on the machine. Track it separately only if it needs its own maintenance history.</p>
        </section>
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var wn=Q((Ar,gt)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:r,escapeHtml:s,assetTypeLabel:f,renderParentAssetOptions:a,renderLocationOptions:i,renderAssetAreaOptions:d,assetStatusLabel:m,renderAssetMiniWorkOrder:c,assetDeleteBlockerMessage:o,canDeleteEquipment:p,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:u,renderProcedureOptions:h}=e;function y(){let v=new Date;return new Date(v.getTime()-v.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function b(v,S,_){let D=S.some(w=>w.event_type==="created"),U=v.created_at&&!D?[{id:`${v.id}-created`,event_type:"created",summary:`${f(v.asset_type)} created.`,actor_id:v.created_by||"",created_at:v.created_at}]:[];return{equipmentHistory:[...S,...U].sort((w,P)=>new Date(P.created_at||0)-new Date(w.created_at||0)),historyActorLabel:w=>w.actor_id&&_[w.actor_id]?.full_name?_[w.actor_id].full_name:w.actor_id?`User ${String(w.actor_id).slice(0,8)}`:w.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function k(v,S){return v.map(_=>`
        <article>
          <strong>${s(String(_.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${_.created_at?new Date(_.created_at).toLocaleString():"time unavailable"} &middot; ${s(S(_))}</span>
          <p>${s(_.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function A(){let v=e.getAssets(),S=e.getActiveAssetId(),_=v.find(L=>L.id===S);if(!_)return n();let D=e.getAssetEventsReady?.()!==!1,U=e.getProfilesByUserId?.()||{},T=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((L,G)=>new Date(G.created_at||0)-new Date(L.created_at||0)),{equipmentHistory:W,historyActorLabel:w}=b(_,T,U),P=e.LIST_ITEMS_PER_PAGE||12,R=Math.max(1,Math.ceil(W.length/P)),E=Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,"asset-history")||1),R),C=W.length?(E-1)*P+1:0,I=Math.min(W.length,E*P),N=W.slice((E-1)*P,E*P);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(_.name)} - ${W.length} event${W.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(_.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${D?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${k(N,w)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${W.length>P?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(_.id)}" type="button" ${E<=1?"disabled":""}>Previous</button>
                <span>Showing ${C}-${I} of ${W.length} - Page ${E} of ${R}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(_.id)}" type="button" ${E>=R?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function $(){let v=e.getAssets(),S=e.getActiveAssetId(),_=v.find(x=>x.id===S);if(!_)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(_.id);let D=e.getWorkOrders(),U=e.getPreventiveSchedules(),T=e.getParts(),W=e.getAssetParts(),w=e.getAssetPartsReady(),P=e.getAssetDocumentsByAssetId?.()[_.id]||[],R=e.getAssetDocumentsReady?.()!==!1,E=e.getAssetEventsReady?.()!==!1,C=e.getProfilesByUserId?.()||{},I=e.getPartsUsedByWorkOrder(),N=e.getLocations(),L=e.getActiveLocationId(),G=e.ASSET_TYPE_OPTIONS||[],X=t(_),ae=r(_.id),ie=D.filter(x=>x.asset_id===_.id),Z=ie.filter(x=>x.status!=="completed").sort((x,V)=>new Date(V.created_at||0)-new Date(x.created_at||0)),re=ie.filter(x=>x.status==="completed").sort((x,V)=>new Date(V.completed_at||V.created_at||0)-new Date(x.completed_at||x.created_at||0)),H=U.filter(x=>x.asset_id===_.id),me=Object.values(I).flat().filter(x=>ie.some(V=>V.id===x.work_order_id)),M=W.filter(x=>x.asset_id===_.id),j=new Set(M.map(x=>x.part_id)),z=T.filter(x=>!j.has(x.id)),te=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((x,V)=>new Date(V.created_at||0)-new Date(x.created_at||0)),{equipmentHistory:ee}=b(_,te,C),K=e.LIST_ITEMS_PER_PAGE||12,Y=x=>e.getAssetRelationshipOpen?.(_.id,x)||!1,ne=(x,V)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,x)||1),Math.max(1,Math.ceil(V/K))),J=(x,V)=>{let ce=ne(V,x.length);return x.slice((ce-1)*K,ce*K)},le=(x,V)=>{if(V<=K)return"";let ce=ne(x,V),he=Math.max(1,Math.ceil(V/K)),ye=(ce-1)*K+1,se=Math.min(V,ce*K);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${ce<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${se} of ${V} - Page ${ce} of ${he}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${ce>=he?"disabled":""}>Next</button>
          </div>
        `},fe=x=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(x)}" data-asset-id="${s(_.id)}" ${Y(x)?"open":""}`,oe=N.find(x=>x.id===_.location_id)?.name||_.location||"No location set",F=X?X.name:"Top level equipment",de=_.status==="offline"?"status-blocked":_.status==="degraded"?"status-open":_.status==="watch"?"status-in_progress":"status-completed",ge=_.status==="degraded"&&Z.length===0,ue=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${_.status}">${s(m(_.status))}</span>
              <span class="chip">${s(f(_.asset_type))}</span>
              ${_.asset_code?`<span class="chip">${s(_.asset_code)}</span>`:""}
              ${_.manufacturer?`<span class="chip">${s(_.manufacturer)}</span>`:""}
              ${_.model?`<span class="chip">${s(_.model)}</span>`:""}
              ${_.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(_.name)}</h2>
            <p>${s(_.location||"No location set")}</p>
            ${X?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(X.id)}" type="button">${s(X.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${de}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(m(_.status))}</strong>
              <small>${_.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(oe)}</strong>
              <small>${_.location?s(_.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(F)}</strong>
              <small>${X?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${ae.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${ae.length}</strong>
              <small>${ae.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${M.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${M.length}</strong>
              <small>${M.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${Z.length?"":"empty"}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong>${Z.length}</strong>
              <small>${Z.length?"Active work tied to this equipment":"No open work"}</small>
            </button>
            <button class="command-card command-photo ${P.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${P.length}</strong>
              <small>${P.length?"Machine files on record":"No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${ge&&ue?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${s(_.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${u?u():""}

          ${ue?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${_.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${P.length} file${P.length===1?"":"s"}</span>
            </div>
            ${ue?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(_.id)}">
              <label>File type
                <select name="document_type">
                  <option value="machine_photo">Machine photo</option>
                  <option value="schematic">Schematic / print</option>
                  <option value="settings">Settings / parameters</option>
                  <option value="manual">Manual / cut sheet</option>
                  <option value="nameplate">Nameplate photo</option>
                  <option value="inspection">Inspection reference</option>
                  <option value="receipt">Receipt / invoice</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-asset-document-error="${s(_.id)}">${R?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${R?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${P.map(x=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(x.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${s(x.signedUrl)}" alt="${s(x.original_file_name||x.file_name||_.name)}">`:`<strong>${s(q(x.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(q(x.document_type))}</strong>
                      <span>${s(x.original_file_name||x.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${s(x.signedUrl)}" alt="${s(x.original_file_name||x.file_name||_.name)}">`:`<div class="asset-file-document-preview">${s(q(x.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${s(x.content_type||"file")}</span>
                      <a class="secondary-button" href="${s(x.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${ue?`<button class="text-button danger-link" data-delete-asset-document="${s(x.id)}" data-asset-document-path="${s(x.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${ue?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${s(_.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(_.asset_code||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(_.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(_.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${G.map(x=>`<option value="${x}" ${x===(_.asset_type||"machine")?"selected":""}>${f(x)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${a(_.parent_asset_id||"",_.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${N.length?"":"disabled"}>
                ${i(_.location_id||L)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${d(_.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(x=>`<option value="${x}" ${x===_.status?"selected":""}>${m(x)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${_.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${ae.map(x=>`
                <article class="mini-work-order" data-open-asset="${s(x.id)}">
                  <strong>${s(x.name)}</strong>
                  <span>${s(f(x.asset_type))} - ${s(m(x.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${fe("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${Z.length}</span></summary>
            <div class="mini-list">
              ${Y("open-work")?J(Z,"open-work").map(c).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${Y("open-work")?le("open-work",Z.length):""}
          </details>

          <details ${fe("completed-history")}>
            <summary>Completed History <span>${re.length}</span></summary>
            <div class="mini-list">
              ${Y("completed-history")?J(re,"completed-history").map(c).join("")||'<p class="muted">No completed work yet.</p>':'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${Y("completed-history")?le("completed-history",re.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${ee.length} event${ee.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(_.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${E?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${H.length} schedule${H.length===1?"":"s"}</span>
                ${ue?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${ue?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(_.id)}">
              <input name="title" required placeholder="PM for ${s(_.name)}">
              <input name="asset_id" type="hidden" value="${s(_.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${h?h():'<option value="">No procedure checklist</option>'}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${y()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
            </form>`:""}
            <div class="mini-list">
              ${H.map(x=>`<article><strong>${s(x.title)}</strong><span>${x.frequency} - next due ${x.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(_.id)}" ${Y("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${M.length}</span></summary>
            <div class="panel-header compact">
              ${ue?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${Y("linked-parts")&&w?`
              ${ue?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(_.id)}">
                <label>Part
                  <select name="part_id" ${z.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${z.map(x=>`<option value="${s(x.id)}">${s(x.name)}${x.sku?` - ${s(x.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${z.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${s(_.id)}"></p>
              <div class="mini-list">
                ${J(M,"linked-parts").map(x=>`<article>
                  <strong>${s(x.parts?.name||"Part")}</strong>
                  <span>${s(x.parts?.sku||"No SKU")} - recommended qty ${s(x.quantity_recommended||1)}${x.note?` - ${s(x.note)}`:""}</span>
                  ${ue?`<button class="text-button danger-link" data-remove-asset-part="${s(x.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${le("linked-parts",M.length)}
            `:w?'<p class="muted">Open this section to review or attach linked parts for this equipment.</p>':'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(_.id)}" ${Y("parts-used")?"open":""}>
            <summary>Parts Used History <span>${me.length}</span></summary>
            <div class="mini-list">
              ${Y("parts-used")?J(me,"parts-used").map(x=>`<article><strong>${s(x.parts?.name||"Part")}</strong><span>${x.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${Y("parts-used")?le("parts-used",me.length):""}
          </details>

          ${ue?O(_):""}
        </div>
      `}function O(v){let S=e.getWorkOrders(),_=e.getPreventiveSchedules(),D=e.getAssets(),U=e.getActiveAssetId(),T=S.filter(C=>C.asset_id===v.id).length,W=_.filter(C=>C.asset_id===v.id).length,w=D.filter(C=>C.parent_asset_id===v.id).length,P=e.getMaintenanceRequests().filter(C=>C.asset_id===v.id).length,R=o({workOrders:T,children:w,schedules:W,requests:P}),E=e.getPendingDeleteAssetId()===U;return p()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${R||`This permanently removes "${s(v.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${R?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:E?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${s(v.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${s(v.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${s(v.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function q(v){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[v]||"File"}return{renderAssetDetail:$,renderAssetHistoryScreen:A}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createAssetDetailDisplayHelpers:l})})()});var vn=Q((Rr,ht)=>{(function(){function l(e={}){let{filteredMessageThreads:n,totalUnreadMessages:t,teamMemberName:r,escapeHtml:s,messageComposerScopeNote:f,recentMessageLinkWorkOrders:a,statusLabel:i,renderMessageThreadButton:d,messageThreadScopeLabel:m,renderMessageList:c}=e,o=e.canEditOperationalRecords||(()=>!0);function p(u){let h=String(u||"?").trim().split(/\s+/).filter(Boolean);return(h.length?h.map(y=>y[0]).join(""):"?").slice(0,2).toUpperCase()}function g(){if(!e.getMessagesReady())return'<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>';let h=e.getMessageThreads(),y=e.getActiveMessageThreadId(),b=e.getMessagesByThreadId(),k=e.getWorkOrders(),A=e.getMessageComposerWorkOrderId(),$=e.getMessageComposerOpen(),O=e.getCompanyMembers(),q=e.getSession(),v=e.getMessageWorkOrderLinksReady(),S=e.getMessageSearchQuery(),_=e.getMessageThreadFilter(),D=O.filter(L=>L.user_id!==q.user.id),U=o(),T=h.find(L=>L.id===y)||h[0],W=T?b[T.id]||[]:[],w=n(),P=e.getMessageThreadsPage(),R=Math.max(1,Math.ceil(w.length/e.LIST_ITEMS_PER_PAGE)),E=Math.min(Math.max(P,1),R),C=w.slice((E-1)*e.LIST_ITEMS_PER_PAGE,E*e.LIST_ITEMS_PER_PAGE),I=k.find(L=>L.id===A),N=L=>{let G=r(L.user_id);return`
          <button class="message-person-card" data-message-person="${s(L.user_id)}" title="Message ${s(G)}" type="button">
            <span class="message-person-avatar" aria-hidden="true">${s(p(G))}</span>
            <span class="message-person-name">${s(G)}</span>
          </button>
        `};return`
        <section class="message-center">
          <div class="message-layout">
            <aside class="message-thread-rail">
              <div class="message-rail-header">
                <div>
                  <h3>Messages</h3>
                  <p>${t()} unread</p>
                </div>
              </div>
              <div class="message-people-strip" aria-label="Company message contacts">
                ${D.map(N).join("")||'<span class="muted">No teammates added yet.</span>'}
              </div>
              ${U?`<form class="message-thread-form" id="message-thread-form">
                <details ${$||I?"open":""}>
                  <summary>New message</summary>
                  <div class="message-thread-fields">
                    <label>Send to
                      <select name="thread_type" id="message-thread-type">
                        <option value="location">Current location</option>
                        <option value="direct">Direct message</option>
                      </select>
                    </label>
                    <label class="message-direct-field">Person
                      <select name="direct_user_id">
                        ${O.filter(L=>L.user_id!==q.user.id).map(L=>`<option value="${L.user_id}">${s(r(L.user_id))}</option>`).join("")||'<option value="">No teammates yet</option>'}
                      </select>
                    </label>
                    <div class="message-scope-note" id="message-scope-note">${f("location")}</div>
                    <label>Subject<input name="title" required placeholder="Thread subject" value="${I?`Work order: ${s(I.title)}`:""}"></label>
                    ${I?`
                      <input name="work_order_id" type="hidden" value="${I.id}">
                      <div class="message-linked-draft">
                        <span>Linked work order</span>
                        <strong>${s(I.title)}</strong>
                        <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                      </div>
                    `:`
                      <label>Recent work order
                        <select name="work_order_id" ${v?"":"disabled"}>
                          <option value="">No work order</option>
                          ${a().map(L=>`<option value="${L.id}">${s(L.title)} - ${i(L.status)}</option>`).join("")}
                        </select>
                      </label>
                    `}
                    <label>Message<textarea name="body" rows="3" required placeholder="Type the first message..."></textarea></label>
                    <p class="error-text" id="message-thread-error">${v?"":"Run supabase/step-next-message-work-order-links.sql before linking threads to work orders."}</p>
                    <button class="secondary-button message-action-button" type="submit">Start Thread</button>
                  </div>
                </details>
              </form>`:""}
              <label class="message-search">
                <input id="message-search" type="search" value="${s(S)}" placeholder="Search messages">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[["all","All"],["unread","Unread"],["company","Company"],["location","Location"],["direct","Direct"]].map(([L,G])=>`<button class="${_===L?"active":""}" data-message-filter="${L}" type="button">${G}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${C.map(d).join("")||'<p class="muted">No threads match this filter.</p>'}
              </div>
              ${e.renderListPagination("messages",w.length,E,R)}
            </aside>
            <section class="message-thread-detail">
              ${T?`
                <div class="message-chat-header">
                  <div>
                    <h3>${s(T.title)}</h3>
                    <p class="muted">${m(T)}</p>
                  </div>
                  <div class="message-header-actions">
                    ${T.work_order_id?`<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${T.work_order_id}" type="button">Open Work Order</button>`:""}
                    <span class="chip comment">${W.length} message${W.length===1?"":"s"}</span>
                    ${U?`<button class="text-button danger-link" data-delete-message-thread="${s(T.id)}" type="button">Delete Thread</button>`:""}
                  </div>
                </div>
                <div class="message-list">
                  ${c(W)}
                </div>
                ${U?`<form class="message-reply-form" id="message-reply-form" data-thread-id="${T.id}">
                  <div class="message-quick-replies">
                    ${["On it","Need more info","Waiting on parts","Complete"].map(L=>`<button data-quick-reply="${s(L)}" type="button">${s(L)}</button>`).join("")}
                  </div>
                  <textarea name="body" rows="2" required placeholder="Reply to this thread..."></textarea>
                  <p class="error-text" id="message-reply-error"></p>
                  <button class="secondary-button message-action-button" type="submit">Send Reply</button>
                </form>`:""}
              `:'<p class="muted">Choose or start a thread.</p>'}
            </section>
          </div>
        </section>
      `}return{renderMessageCenter:g}}window.MaintainOpsMessageCenterDisplay={createMessageCenterDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createMessageCenterDisplayHelpers:l})})()});var kn=Q((Er,yt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:r,statusLabel:s,workOrderTypeLabel:f=o=>String(o||"corrective").replace(/\b\w/g,p=>p.toUpperCase()),renderAssignmentSelect:a,renderProcedureOptions:i,escapeHtml:d}=e;function m(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function c(){let o=e.getParts();return`
        <form class="form-grid create-work-order-template relationship-detail asset" id="create-work-order-form">
          <div>
            <h3>Create Work Order</h3>
            <p class="muted">Build a complete work order step by step.</p>
          </div>

          <div class="form-section-title">1. What needs attention?</div>
          <label>Title<input name="title" required placeholder="Inspect packaging line sensor"></label>
          <label>Description<textarea name="description" rows="2" placeholder="What is happening, where, and what should be checked?"></textarea></label>
          <fieldset class="equipment-choice" data-equipment-choice>
            <legend>Machine / equipment</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
            </div>
            <div data-equipment-choice-panel="existing">
              <label>Existing machine / equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                  <option value="">No machine / equipment - general item or area</option>
                  ${r()}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning></p>

          <details class="quick-fix-more" open>
            <summary>2. Priority and timing</summary>
            <div class="form-grid">
              <label>Status
                <select name="status">
                  ${n.map(p=>`<option value="${p}" ${p==="open"?"selected":""}>${s(p)}</option>`).join("")}
                </select>
              </label>
              <label>Priority
                <select name="priority">
                  <option>medium</option>
                  <option>high</option>
                  <option>critical</option>
                  <option>low</option>
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${t.map(p=>`<option value="${p}">${f(p)}</option>`).join("")}
                </select>
              </label>
              <label>Complete by / due date
                <span class="date-picker-row" data-date-picker-field>
                  <input name="due_at" type="date" value="${m()}">
                  <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
                </span>
                <small>Defaults to today. Use the calendar to choose a different deadline.</small>
              </label>
            </div>
          </details>

          <details class="quick-fix-more">
            <summary>3. People and procedure</summary>
            <div class="form-grid">
              <label>Assign to
                <select name="assigned_to">
                  ${a("",{selfLabel:"Assign to me"})}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${i()}
                </select>
              </label>
            </div>
          </details>

          <details class="quick-fix-more">
            <summary>4. Internal notes and completion</summary>
            <div class="form-grid">
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
              <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
              <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>
              <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="0"></label>
              <label>Completion notes<textarea name="completion_notes" rows="2" placeholder="Final notes if this is already complete."></textarea></label>
            </div>
          </details>

          <details class="quick-fix-more">
            <summary>5. Parts, photo, and first comment</summary>
            <div class="form-grid">
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${o.map(p=>`<option value="${p.id}">${d(p.name)} (${p.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
              <label>First comment<textarea name="initial_comment" rows="2" placeholder="Add the first update or note for the record."></textarea></label>
            </div>
          </details>

          <p class="error-text" id="create-work-order-error"></p>
          <button class="primary-button work-action-button quick-fix-submit" type="submit">Create Work Order</button>
        </form>
      `}return{renderCreateWorkOrder:c}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var _n=Q((Or,bt)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:r,escapeHtml:s,renderAssignmentSelect:f,renderProcedureOptions:a,assetStatusLabel:i,workOrderTypeLabel:d=o=>String(o||"corrective").replace(/\b\w/g,p=>p.toUpperCase())}=e;function m(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function c(){let o=e.getQuickFixAssetId(),p=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),u=e.getSession(),h=e.getParts(),y=o||"",b=g.find(k=>k.id===p);return`
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${b?`<p class="completion-note">Resolving request: ${s(b.title)}</p>`:""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${s(b?.title||"")}"></label>
          <label>Description<textarea name="description" rows="3" placeholder="Describe what happened, where it happened, and what should be checked.">${s(b?.description||"")}</textarea></label>
          <label>Complete by / due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${m()}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
            <small>Defaults to today. Use the calendar to choose a different deadline.</small>
          </label>
          <fieldset class="equipment-choice" data-equipment-choice>
            <legend>Machine / equipment</legend>
            <div class="equipment-choice-modes" role="radiogroup" aria-label="Choose existing or new equipment">
              <label class="equipment-choice-mode active"><input name="equipment_choice_mode" type="radio" value="existing" data-equipment-choice-mode checked> Existing equipment</label>
              <label class="equipment-choice-mode"><input name="equipment_choice_mode" type="radio" value="new" data-equipment-choice-mode> Create new equipment</label>
            </div>
            <div data-equipment-choice-panel="existing">
              <label>Existing machine / equipment
                <select name="asset_id" data-location-sensitive-asset data-equipment-choice-existing>
                  <option value="">No machine / equipment - general item or area</option>
                  ${t(y||b?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${s(r(y||b?.asset_id||""))}</p>
          <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
          <label class="check-row"><input name="machine_down" type="checkbox"> Machine is down</label>
          <label class="check-row"><input name="mark_completed" type="checkbox"> Already fixed - mark complete now</label>
          <label class="check-row safety-check-row"><input name="safety_devices_checked" type="checkbox"> Safety devices identified if completing equipment work: E-stops, sensors, guards, and interlocks</label>
          <details class="quick-fix-more">
            <summary>Optional details</summary>
            <div class="form-grid">
              <div class="form-section-title">Work Order Info</div>
              <label>Priority
                <select name="priority">
                  ${["medium","high","critical","low"].map(k=>`<option value="${k}">${k}</option>`).join("")}
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${n.map(k=>`<option value="${k}" ${k==="corrective"?"selected":""}>${d(k)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${f(u.user.id,{selfLabel:"Assign to me"})}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${a()}
                </select>
              </label>
              <div class="form-section-title">Outcome / Notes</div>
              <label>What did you do?<textarea name="resolution_summary" rows="2" placeholder="Tightened mount, tested switch, line returned to normal."></textarea></label>
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="Loose mount, worn part, operator report, unknown..."></textarea></label>
            <label>Equipment status after fix
              <select name="asset_status">
                <option value="">Leave unchanged</option>
                  ${["running","watch","degraded","offline"].map(k=>`<option value="${k}">${i(k)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${h.map(k=>`<option value="${k.id}">${s(k.name)} (${k.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `}return{renderQuickFixForm:c}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createQuickFixDisplayHelpers:l})})()});var Sn=Q((Wr,wt)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(c){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${n(c)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `}function r(c){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${n(c)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `}function s(c,o=""){let p=c==="signup";return`
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${p?"Create Account":"Welcome Back"}</h1>
                <p>${p?"Start with email and password.":"Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${p?'<label>Full name<input name="fullName" required autocomplete="name"></label>':""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${p?"new-password":"current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${n(o)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${p?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${p?"I already have an account":"Create an account"}</button>
            ${p?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function f(c){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${n(c)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `}function a(c){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${n(c)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `}function i(c="",o=""){return`
        <section class="auth-shell">
          <form class="auth-card" id="password-reset-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Reset Password</h1>
                <p>Send a secure reset link to your email.</p>
              </div>
            </div>
            <div class="form-grid">
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
            </div>
            <p class="error-text" id="auth-error">${n(c)}</p>
            <p class="muted auth-status" id="auth-status">${n(o)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function d(c={}){let o=!!c.ready,p=c.initialError||"";return`
        <section class="auth-shell">
          <form class="auth-card" id="password-recovery-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Set New Password</h1>
                <p>Enter a new password for this MaintainOps login.</p>
              </div>
            </div>
            <div class="form-grid">
              <label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password" ${o?"":"disabled"}></label>
              <label>Confirm password<input name="confirmPassword" type="password" minlength="6" required autocomplete="new-password" ${o?"":"disabled"}></label>
            </div>
            <p class="error-text" id="auth-error">${n(p)}</p>
            <p class="muted auth-status" id="auth-status">${o?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${o?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function m(c=""){return`
        <section class="auth-shell">
          <form class="auth-card" id="company-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Create Company</h1>
                <p>Your shared maintenance data will live inside this company.</p>
              </div>
            </div>
            <label>Company name<input name="name" required placeholder="North Plant Operations"></label>
            <p class="error-text" id="company-error">${n(c)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `}return{workspaceLoading:t,workspaceLoadError:r,authForm:s,authCallback:f,authCallbackError:a,passwordResetRequest:i,passwordRecovery:d,companyCreate:m}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createAuthDisplayHelpers:l})})()});var qn=Q((xr,vt)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,r=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),f=e.getPublicRequestLinksReady||(()=>!0),a=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),d=e.canManageTeam||(()=>!1),m=e.canAdministerPublicRequestLinks||(()=>!1),c=e.publicAppBaseUrl,o=e.publicRequestUrl,p=e.publicRequestQrUrl;function g(){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <div class="auth-card public-qr-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Maintenance Request QR</h1>
                <p>Loading QR code...</p>
              </div>
            </div>
          </div>
        </section>
      `}function u(O,q){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(O.location_name)}</h1>
                <p>${n(O.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${t(q,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${n(q)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${n(q)}" target="_blank" rel="noreferrer">Test Form</a>
            </div>
          </article>
        </section>
      `}function h(){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Maintenance Request</h1>
                <p>Loading request form...</p>
              </div>
            </div>
          </div>
        </section>
      `}function y(O){return`
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(O.company_name)}</h1>
                <p>${n(O.location_name)} maintenance request</p>
              </div>
            </div>
            <div class="form-grid">
              <label>What needs attention?<input name="title" required maxlength="140" placeholder="Short issue description"></label>
              <label>Machine / area<input name="equipment_note" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
              <label>Details<textarea name="description" rows="4" required maxlength="1000" placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
              <label>Photo<input name="photo" type="file" accept="image/*"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
              <label>Your name<input name="requester_name" required maxlength="120" placeholder="Who is submitting this?"></label>
              <label>Contact<input name="requester_contact" maxlength="160" placeholder="Optional phone, radio, or email"></label>
              <label>Urgency
                <select name="priority">
                  <option value="medium">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical / down</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
            <p class="error-text" id="public-request-error"></p>
            <button class="primary-button request-action-button" type="submit">Send Request</button>
          </form>
        </section>
      `}function b(O){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${n(O)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function k(O,q=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(O.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${q?`<p class="error-text">${n(q)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function A(){if(!d())return"";let O=c(),q=r(),v=f();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${n(a()||String(i()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${O?`<p class="muted">QR codes will point to ${n(O)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${v?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${q.map($).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function $(O){let q=s().find(T=>T.location_id===O.id),v=!!(q&&q.is_active!==!1),S=m(),_=v?o(q.token):"",D=v?p(q.token):"",U=!!(_&&D);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(O.name)}</strong>
            <span>${v?"External request link active":q?"Request link disabled":"No request link yet"}</span>
            ${q?.last_used_at?`<span>Last used ${new Date(q.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${v?`
            <div class="qr-preview">${U?t(_):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(D||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${U?"":"disabled-link"}" href="${n(D||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(D)}" type="button" ${U?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${U?"":"disabled-link"}" href="${n(_||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${S?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(q.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(q.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:q?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${S?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(q.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(q.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(O.id)}" type="button" ${f()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:u,loadingRequestForm:h,publicRequestForm:y,publicRequestError:b,publicRequestSuccess:k,publicRequestLinkManager:A,publicRequestLocationCard:$}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(d){return String(d||"").replace(/\/+$/,"")}function n(d=l.location,m=l.PUBLIC_APP_URL){if(m)return`${e(m)}/`;let c=d?.origin||"",o=d?.pathname||"/",g=o.indexOf("/auth/callback");if(g>=0)return`${c}${o.slice(0,g+1)}`;let u=o.endsWith("/")?o:o.replace(/[^/]*$/,"");return`${c}${u||"/"}`}function t(d=l.location,m=l.PUBLIC_APP_URL){return`${n(d,m)}auth/callback/`}function r(d={},m=l.location,c=l.PUBLIC_APP_URL){let o=new URL(n(m,c));return Object.entries(d).forEach(([p,g])=>{g!=null&&g!==""&&o.searchParams.set(p,g)}),o.href}function s(d){let m=new URL(d),c=new URLSearchParams(m.hash.replace(/^#/,"")),o=m.searchParams;return{code:o.get("code")||"",type:c.get("type")||o.get("type")||"",accessToken:c.get("access_token")||o.get("access_token")||"",refreshToken:c.get("refresh_token")||o.get("refresh_token")||"",error:c.get("error")||o.get("error")||"",errorCode:c.get("error_code")||o.get("error_code")||"",errorDescription:c.get("error_description")||o.get("error_description")||""}}function f(d){return!!(d?.code||d?.accessToken&&d?.refreshToken||d?.error||d?.errorDescription)}function a(d){return d?.type==="recovery"||!d?.type&&!!(d?.accessToken&&d?.refreshToken)}function i(d=l.location){let m=new URL(d.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(c=>m.searchParams.delete(c)),m.hash="",m.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:r,authParamsFromHref:s,isAuthCallbackParams:f,isPasswordRecoveryParams:a,cleanAuthUrl:i}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l(v){return String(v||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(v){return v.toISOString().slice(0,10)}function n(v){return v.toISOString()}function t(v){let S=new Date;return S.setDate(S.getDate()-v),S}function r(){let v=new Date;return new Date(v.getFullYear(),v.getMonth(),1)}function s(v=new Date){let S=new Date(v);S.setHours(0,0,0,0),S.setDate(S.getDate()-S.getDay());let _=new Date(S);return _.setDate(_.getDate()+7),{start:S,end:_}}function f(v,S){let _=[];for(let D=0;D<v.length;D+=S)_.push(v.slice(D,D+S));return _}function a(v){return i(v).replace(/\.[^/.]+$/,"")||"photo"}function i(v){return String(v||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function d(v){return v==="active"||v==="all"?"Active":v==="overdue"?"Overdue":v==="completed"?"All Completed":v==="completed_month"?"Completed Month":v==="completed_week"?"Done This Week":v==="open"?"New":String(v||"").replaceAll("_"," ").replace(/\b\w/g,S=>S.toUpperCase())}function m(v){let S=String(v||"corrective").trim().toLowerCase();return S==="inspection"?"preventive":S==="reactive"||S==="request"?"corrective":["corrective","preventive","fabrication"].includes(S)?S:"corrective"}function c(v){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[m(v)]}function o(v){let S=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],_=String(v||"technician").trim().toLowerCase();return _==="member"?"technician":S.includes(_)?_:"technician"}function p(v){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[o(v)]||"Technician"}function g(v){let S={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return S[o(v)]||S.technician}function u(v){return new Date(`${v}T00:00:00`).toLocaleDateString()}function h(v){let S=[new Date(v.created_at).toLocaleString()];return v.file_size_bytes&&S.push(b(v.file_size_bytes)),v.original_size_bytes&&v.file_size_bytes&&v.original_size_bytes!==v.file_size_bytes&&S.push(`optimized from ${b(v.original_size_bytes)}`),S.join(" - ")}function y(v){let S=[];return(v.photo_uploaded_at||v.updated_at||v.created_at)&&S.push(new Date(v.photo_uploaded_at||v.updated_at||v.created_at).toLocaleString()),v.photo_file_size_bytes&&S.push(b(v.photo_file_size_bytes)),v.photo_original_size_bytes&&v.photo_file_size_bytes&&v.photo_original_size_bytes!==v.photo_file_size_bytes&&S.push(`optimized from ${b(v.photo_original_size_bytes)}`),S.join(" - ")||"Photo attached"}function b(v){let S=Number(v)||0;return S?S<1024?`${S} B`:S<1048576?`${Math.round(S/1024)} KB`:`${(S/1048576).toFixed(S>=10485760?0:1)} MB`:""}function k(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(v)||0)}function A(v){return Number(v.unit_cost_at_use??v.parts?.unit_cost??0)||0}function $(v){if(!v.due_at||v.status==="completed")return null;let S=new Date;S.setHours(0,0,0,0);let _=new Date(`${v.due_at}T00:00:00`),D=Math.round((_-S)/864e5);return D<0?{label:"overdue",className:"overdue"}:D===0?{label:"due today",className:"due_today"}:null}function O(){let v=new Date;return v.setHours(0,0,0,0),v}function q(v){return`"${String(v??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:r,sundayWeekRange:s,chunkArray:f,fileBaseName:a,safeFileName:i,statusLabel:d,normalizeWorkOrderType:m,workOrderTypeLabel:c,normalizeRole:o,roleLabel:p,roleDescription:g,formatDate:u,photoMetaText:h,requestPhotoMetaText:y,formatBytes:b,money:k,partUsageUnitCost:A,getDueState:$,startOfToday:O,csvCell:q})})();(function(){function l(s,f){let a=s?.message||"";return f.some(i=>a.includes(i))}function e(s,f){let a=s?.message||"";return a.includes(f)&&(a.includes("column")||a.includes("schema cache"))}function n(s){let f=s?.message||"";return f.includes("work_order_comments_company_author_profile_fkey")||f.includes("profiles")}function t(s){let f=s?.message||"";return!!(f.includes("procedure_template_id")||f.includes("procedure_templates")||f.includes("procedure_steps"))}function r(s){return l(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:r}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let r,s=new Promise((f,a)=>{r=setTimeout(()=>a(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(r))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var Ur=B(_t()),Qr=B(St());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function r(c){return f(`?request=${encodeURIComponent(c)}`)}function s(c){return f(`?qr=${encodeURIComponent(c)}`)}function f(c){let o=a();if(!o)return"";let p=new URL(o);return p.search=c,p.hash="",p.toString()}function a(){let o=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return o?i(o):""}function i(c){try{let o=new URL(String(c||"").trim(),n.location.href);return o.protocol!=="https:"||!d(o.hostname)?"":(o.search="",o.hash="",o.pathname&&o.pathname!=="/"&&!o.pathname.endsWith("/")&&!o.pathname.endsWith(".html")&&(o.pathname=`${o.pathname}/`),o.toString())}catch{return""}}function d(c){let o=String(c||"").toLowerCase();return!(!o||o==="localhost"||o.endsWith(".localhost")||o==="127.0.0.1"||o==="::1"||o==="[::1]"||/^10\./.test(o)||/^192\.168\./.test(o)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(o))}function m(c,o=4){if(!n.qrcode||!c)return'<div class="qr-fallback">QR</div>';try{let p=n.qrcode(0,"M");return p.addData(c),p.make(),p.createSvgTag(o,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:r,publicRequestQrUrl:s,publicAppUrlWithSearch:f,publicAppBaseUrl:a,normalizePublicAppUrl:i,isPublicAppHost:d,qrSvgFor:m}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),r=n.querySelector("#print-public-qr");!r||typeof t!="function"||r.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:l}})();var Gr=B(qt()),Vr=B(Ct());(function(){function l(e){function n(d){return e[d]()}function t(d,m){return typeof e[d]=="function"?e[d]():m}function r(d){let m=n("searchQuery"),c=n("activeSection"),o=n("activeStatusFilter"),p=!!m.trim();return i(s(d,{statusFilter:p?"__any__":c==="work"&&o==="requests"?"__none__":o,section:c,includeQueue:!p,includeSearch:!0}))}function s(d,m={}){let c=m.section||n("activeSection"),o=d.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(o=o.eq("location_id",n("activeLocationId"))),m.includeQueue!==!1&&(o=f(o,c)),m.includeAttributeFilters!==!1&&c==="work"){let p=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");p!=="all"&&(o=o.eq("type",p)),g!=="all"&&(o=o.eq("priority",g))}if(o=a(o,m.statusFilter||n("activeStatusFilter")),m.includeSearch!==!1){let p=e.postgrestSearchTerm(n("searchQuery"));if(p){let g=n("workOrderRelatedSearch"),u=[`title.ilike.%${p}%`,`description.ilike.%${p}%`,`production_action.ilike.%${p}%`,`priority.ilike.%${p}%`,`type.ilike.%${p}%`,`status.ilike.%${p}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];o=o.or(u.join(","))}}return o}function f(d,m){if(m==="mywork"){let c=n("session").user.id;return n("myWorkFilter")==="created"?d.eq("created_by",c):d.or(`assigned_to.eq.${c},and(production_action_assigned_to.eq.${c},production_action_status.eq.open)`)}if(m!=="work")return d;if(n("workOrderAssigneeFilter")){let c=n("workOrderAssigneeFilter");return d.or(`assigned_to.eq.${c},and(production_action_assigned_to.eq.${c},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?d.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?d.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?d.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):d}function a(d,m){let c=e.isoDate(e.startOfToday());if(m==="__any__")return d;if(m==="__none__")return d.eq("id","00000000-0000-0000-0000-000000000000");if(m==="overdue")return d.neq("status","completed").lt("due_at",c);if(m==="completed_month")return d.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(m==="completed_week"){let o=e.sundayWeekRange();return d.gte("completed_at",e.isoDateTime(o.start)).lt("completed_at",e.isoDateTime(o.end))}return m==="active"||m==="all"?d.neq("status","completed"):d.eq("status",m)}function i(d){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?d.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?d.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?d.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?d.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?d.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):d.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:r,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:f,applyWorkOrderStatusFilter:a,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(r=>{r.addEventListener("click",()=>{let s=n.querySelector(`#${r.dataset.jumpWorkSection}`);if(!s)return;let f=s.closest("details");f&&(f.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let a=s;a.classList.add("jump-highlight","field-jump-highlight"),t(()=>a.classList.remove("jump-highlight"),1400),t(()=>a.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.renderWorkspace,f=e.setWorkOrderSearchMode;if(!r||!s||!f)return;let a=()=>{r.setSearchQuery(""),f(!1),t.setItem("maintainops.searchQuery","")},i=d=>{r.setActiveSection(d),t.setItem("maintainops.activeSection",d)};n.querySelectorAll("[data-search-work-order]").forEach(d=>{d.addEventListener("click",()=>{r.setActiveWorkOrderId(d.dataset.searchWorkOrder),r.setActiveAssetId(null),r.setActivePartId(null),i("work"),a(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(d=>{d.addEventListener("click",()=>{r.setActiveAssetId(d.dataset.searchAsset),r.setActiveWorkOrderId(null),r.setActivePartId(null),i("assets"),a(),s()})}),n.querySelectorAll("[data-search-part]").forEach(d=>{d.addEventListener("click",()=>{r.setActivePartId(d.dataset.searchPart),r.setActiveAssetId(null),r.setActiveWorkOrderId(null),i("parts"),a(),s()})}),n.querySelectorAll("[data-search-request]").forEach(d=>{d.addEventListener("click",()=>{i("requests"),a(),s()})}),n.querySelectorAll("[data-search-section]").forEach(d=>{d.addEventListener("click",()=>{i(d.dataset.searchSection),a(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(r={}){let s=r.documentRef||document,f=r.storage||localStorage,a=r.state,i=r.windowRef||(typeof window<"u"?window:null),d=r.setTimeoutRef||setTimeout,m=r.clearTimeoutRef||clearTimeout,c=Number.isFinite(r.searchDelayMs)?r.searchDelayMs:300;if(!a)return;let o=()=>{e+=1,l!==null&&(m(l),l=null)},p=u=>{u&&typeof i?.scrollTo=="function"&&i.scrollTo(u.x,u.y)},g=(u,h,y,b)=>{let k=s.getElementById?s.getElementById(u):s.querySelector(`#${u}`);if(!k)return;let A=k.value.length,$=Math.min(h??A,A),O=Math.min(y??$,A);k.focus({preventScroll:!0}),k.setSelectionRange($,O),p(b)};s.querySelectorAll(".workspace-search-input").forEach(u=>{u.addEventListener("input",()=>{let h=u.id,y=u.selectionStart,b=u.selectionEnd;o();let k=e;a.setSearchQuery(u.value),r.invalidateExactWorkOrderSearchCache(),a.getSearchQuery().trim()||r.setWorkOrderSearchMode(!1),a.getSearchQuery().trim()&&(a.setActiveWorkOrderId(null),a.setActiveAssetId(null),a.setActivePartId(null),a.setQuickFixMode(!1),a.setCreateWorkOrderMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)),f.setItem("maintainops.searchQuery",a.getSearchQuery()),r.resetWorkOrderPage(),r.resetPartsPage(),r.resetRequestsPage(),l=d(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(k!==e||(await Promise.all([r.reloadWorkOrderQueue({render:!1}),r.reloadRequestQueue({render:!1})]),k!==e))return;let A=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,$=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),O=!("activeElement"in s)||s.activeElement===$;r.renderWorkspace(),O?g(h,y,b,A):p(A)}),n),c)})}),s.querySelectorAll("[data-view-work-search]").forEach(u=>{u.addEventListener("click",async()=>{o(),a.setActiveSection("work"),a.setActiveWorkOrderId(null),a.setActiveAssetId(null),a.setActivePartId(null),a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),r.setWorkOrderSearchMode(!0),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),f.setItem("maintainops.activeSection",a.getActiveSection()),await r.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(u=>{u.addEventListener("click",async()=>{o(),r.setWorkOrderSearchMode(!1),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),await r.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(a){!r||typeof r.scrollTo!="function"||r.scrollTo({top:a,behavior:"auto"})}async function f(a){let i=Number(r?.scrollY??r?.pageYOffset??0);if(await a(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setActiveStatusFilter(a.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setMyWorkFilter(a.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setWorkOrderFilter(a.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{t.setActiveStatusFilter(a.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{let i=a.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{let i=a.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{t.setWorkOrderTypeFilter(a.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{t.setWorkOrderPriorityFilter(a.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setWorkSort(a.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{t.setWorkSort(a.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{t.setWorkGroup(a.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{t.setWorkOrderAssigneeFilter(a.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(a=>{a.addEventListener("click",async()=>{a.disabled||await f(async()=>{t.setRequestViewFilter(a.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(a.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setPartsPage(t.getPartsPage()+(a.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setAssetsPage(t.getAssetsPage()+(a.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{t.setFinancialPage(t.getFinancialPage()+(a.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(a=>{a.addEventListener("change",async()=>{await f(async()=>{a.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(a.value),a.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(a.value),a.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(a.value),a.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(a.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(a=>{a.addEventListener("click",async()=>{await f(async()=>{let i=a.dataset.pageDirection==="next"?1:-1;if(a.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(a.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),a.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),a.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),a.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),a.dataset.listPage?.startsWith("planning-")){let d=a.dataset.listPage.replace("planning-","");t.setPlanningPage(d,t.getPlanningPage(d)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(a=>{a.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(a.dataset.planningGroup,!!a.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.windowRef||(typeof window<"u"?window:null),f=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!r)return;let a=()=>{r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)};async function i(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function d(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function m(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function c(){e.renderWorkspace()}function o(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function p(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(p);return}p()}let u=n.querySelector("#back-to-my-work");u&&u.addEventListener("click",()=>{r.setActiveWorkOrderId(null),r.setActiveAssetId(null),o(),a(),e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{r.setActiveAssetId(null),o(),r.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{r.setActiveWorkOrderId(y.dataset.id),r.setActiveAssetId(null),o(),a(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),r.setActiveWorkOrderId(y.dataset.workPhotoJump),r.setActiveAssetId(null),o(),r.setActiveSection("work"),a(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",b=>{b.stopPropagation(),r.setActiveAssetId(y.dataset.openAsset),r.setActiveWorkOrderId(null),o(),a(),r.getActiveSection()!=="assets"&&r.setActiveSection("work"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),f()})}),n.querySelectorAll("[data-asset-id]").forEach(y=>{let b=()=>{r.setActiveAssetId(y.dataset.assetId),r.setActiveWorkOrderId(null),r.setActivePartId(null),o(),a(),r.setReportIssueMode(!1),r.setActiveSection("assets"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),f()};y.addEventListener("click",b),y.addEventListener("keydown",k=>{k.key!=="Enter"&&k.key!==" "||(k.preventDefault(),b())})}),n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",()=>{r.setActiveWorkOrderId(y.dataset.miniWorkOrder),r.setActiveAssetId(null),o(),r.setActiveSection("work"),a(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),f()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{y.addEventListener("toggle",async()=>{let b=y.dataset.assetId,k=y.dataset.assetRelationshipSection;!b||!k||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(b,k,y.open),y.open&&m(k)&&await i(b),y.open&&k==="asset-history"&&await d(b),c())})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.assetId,A=y.dataset.assetRelationSection,O=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,A):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,A,O),c()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.openAssetHistory;k&&(r.setActiveAssetId(k),r.setActiveWorkOrderId(null),a(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(k),await d(k),e.renderWorkspace(),f())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.backAssetHistory;k&&r.setActiveAssetId(k),o(),e.renderWorkspace(),f()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.assetId,$=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,"asset-history",$),e.renderWorkspace(),f()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(a){!r||typeof r.scrollTo!="function"||r.scrollTo({top:a,behavior:"auto"})}function f(){let a=Number(r?.scrollY??r?.pageYOffset??0);if(e.renderWorkspace(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(a));return}s(a)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(a=>{a.addEventListener("click",()=>{t.setPartInventoryFilter(a.dataset.partInventoryFilter),e.resetPartsPage(),f()})}),n.querySelectorAll("[data-part-sort]").forEach(a=>{a.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(a.value||"default"),e.resetPartsPage(),f())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(a=>{a.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===a.dataset.assetStatusFilter?"all":a.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),f()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(a=>{a.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===a.dataset.assetTypeFilter?"all":a.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),f()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(a=>{a.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(a.value||"all"),e.resetAssetsPage(),f())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(f){e.showNotice(`Could not update status: ${f.message||f}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",r=>r.stopPropagation()),t.addEventListener("change",r=>{r.stopPropagation(),r.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var ra=B($t());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,r=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let f=e.getWorkOrderById(s.dataset.id);if(!f)return;let a=s.dataset.copyDowntime==="subject",i=a?e.downtimeEmailSubject(f):e.downtimeEmailBody(f),d=await e.copyTextToClipboard(i);s.textContent=d?"Copied":"Copy failed",r(()=>{s.textContent=a?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var ia=B(Pt());(function(){function l(e={}){let n=e.documentRef||document;function t(f){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(f),e.renderWorkspace()}async function r(f){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let a=e.getPhotoPathsByWorkOrder(f);if(a.length){let d=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(a),"Work order photo cleanup timed out.",15e3);d.error&&e.warnRef("Work order photo storage cleanup failed",d.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(f),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(a){e.alertRef(`Could not delete work order: ${a.message||a}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(f=>{f.addEventListener("click",a=>{a.stopPropagation(),t(f.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(f=>{f.addEventListener("click",a=>{a.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(f=>{f.addEventListener("click",async a=>{a.stopPropagation(),await r(f.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:r,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(r=>{r.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(r.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace;!t||typeof r!="function"||(n.querySelectorAll("[data-open-part]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(s.dataset.openPart),r()}),s.addEventListener("keydown",f=>{f.key!=="Enter"&&f.key!==" "||(f.preventDefault(),t.setActivePartId(s.dataset.openPart),r())})}),n.querySelectorAll("[data-close-part-detail]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(null),t.setShowPartSourceManager(!1),r()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(s=>{s.addEventListener("click",()=>{t.setShowPartSourceManager(!t.getShowPartSourceManager()),r()})}))}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.messageComposerScopeNote,f=e.autoGrowTextarea;if(!t||typeof r!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-message-filter]").forEach(c=>{c.addEventListener("click",()=>{let o=c.dataset.messageFilter;t.setMessageThreadFilter(o),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),a.setItem("maintainops.messageThreadFilter",o),a.setItem("maintainops.messageThreadsPage","1"),r()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(c=>{c.addEventListener("click",()=>{t.setActiveWorkOrderId(c.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),a.setItem("maintainops.activeSection","work"),r()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),a.setItem("maintainops.messageComposerWorkOrderId",""),r()});let d=n.querySelector("#message-search");d&&d.addEventListener("input",()=>{let c=d.value;t.setMessageSearchQuery(c),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),a.setItem("maintainops.messageSearchQuery",c),a.setItem("maintainops.messageThreadsPage","1"),r();let o=n.querySelector("#message-search");o&&(o.focus(),o.setSelectionRange(c.length,c.length))});let m=n.querySelector("#message-thread-form");if(m){let c=m.querySelector("#message-thread-type"),o=m.querySelector(".message-direct-field"),p=m.querySelector("#message-scope-note");if(c&&o&&p&&typeof s=="function"){let g=()=>{let u=c.value==="direct";o.classList.toggle("hidden-section",!u);let h=o.querySelector("select");h&&(h.disabled=!u),p.textContent=s(c.value)};c.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(c=>{c.addEventListener("click",()=>{let o=n.querySelector("#message-thread-form");if(!o)return;let p=o.querySelector("details"),g=o.querySelector("#message-thread-type"),u=o.querySelector("select[name='direct_user_id']"),h=o.querySelector(".message-direct-field"),y=o.querySelector("#message-scope-note"),b=o.querySelector("input[name='title']");p&&(p.open=!0),g&&(g.value="direct"),u&&(u.value=c.dataset.messagePerson||"",u.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),b&&b.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(c=>{c.addEventListener("click",()=>{let p=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!p)return;let g=p.value.trim();p.value=g?`${g}
${c.dataset.quickReply}`:c.dataset.quickReply,p.focus(),typeof f=="function"&&f(p)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof r!="function"||typeof s!="function")return;let f=n.querySelector("#part-search-form");if(!f)return;let a=d=>{t.setPartSearchQuery(d||""),s(),r()},i=f.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{a(i.value||"");let d=n.querySelector("#part-search");if(!d)return;d.focus();let m=d.value.length;d.setSelectionRange(m,m)}),f.addEventListener("submit",d=>{d.preventDefault();let m=e.FormDataRef||FormData,c=new m(f).get("part_search")||"";a(c),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(f=>{f.addEventListener("click",async()=>{let a=performance.now(),i=f.dataset.section;e.visibleNavItems().some(([d])=>d===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),r.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,a))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-thread]").forEach(s=>{s.addEventListener("click",async()=>{let f=s.dataset.messageThread;t.setActiveMessageThreadId(f),r.setItem("maintainops.activeMessageThreadId",f),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(f),await e.markMessageThreadRead(f),e.renderWorkspace()})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(s=>{s.addEventListener("click",async()=>{let f=s.dataset.openWorkMessageThread;t.setActiveMessageThreadId(f),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),r.setItem("maintainops.activeMessageThreadId",f),r.setItem("maintainops.activeSection","messages"),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(f),await e.markMessageThreadRead(f),e.renderWorkspace()})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),r.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let f=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(f),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),r.setItem("maintainops.messageComposerWorkOrderId",f),r.setItem("maintainops.activeSection","messages"),r.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(r=>{r.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",()=>{e.exportActiveSectionCsv()})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var ka=B(At());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(r.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(r=>{r.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(r.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(r.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.deleteMaintenanceRequest(r.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(r.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.deletePreventiveSchedule(r.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(r.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.deleteProcedureTemplate(r.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(r=>{l(r),r.addEventListener("input",()=>l(r))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var Pa=B(Rt());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(r.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{e.cancelTeamInvite(r.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(f=>{f.addEventListener("click",async()=>{let a=await t(f.dataset.copyTeamInvite||"");f.textContent=a?"Copied":"Copy failed",r(()=>{f.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(f=>{f.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(f=>{f.addEventListener("click",()=>{t.setQuickFixAssetId(f.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var Wa=B(Et());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(f=>{f.addEventListener("click",async()=>{let a=await t(f.dataset.copyPublicRequestLink);f.textContent=a?"Copied":"Copy failed",r(()=>{f.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ma=B(Ot());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(r=>{r.addEventListener("click",()=>{let f=r.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(r.dataset.createFollowUp,f?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var Fa=B(Wt());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,r=n.querySelector("#comment-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,r=n.querySelector("#quick-update-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,r=n.querySelector("#edit-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(r=>{t(r),r.addEventListener("change",()=>t(r))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var ja=B(xt()),za=B(Mt()),Ga=B(Tt()),Va=B(Dt()),Ha=B(It()),Ya=B(Ft()),Ka=B(Lt()),Ja=B(Nt()),Za=B(Ut()),Xa=B(Qt()),eo=B(Bt()),to=B(jt()),no=B(zt()),ro=B(Gt()),ao=B(Vt()),oo=B(Ht()),io=B(Yt()),so=B(Kt()),co=B(Jt()),lo=B(Zt()),uo=B(Xt()),po=B(en()),mo=B(tn()),fo=B(nn()),go=B(rn());(function(){function l(e){function n(r){return e[r]()}function t(r,s=n("requestViewFilter")){let f=r.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(f=f.eq("location_id",n("activeLocationId"))),s==="converted"?f=f.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(f=f.eq("status","submitted").is("converted_work_order_id",null));let a=e.postgrestSearchTerm(n("searchQuery"));if(a){let i=`%${a}%`,d=n("assets").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.asset_code,m.manufacturer,m.model,m.location,m.status,m.asset_type,e.parentAssetFor()(m)?.name],a)).map(m=>m.id).slice(0,e.SEARCH_ID_PAGE_SIZE);f=f.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...d.length?[`asset_id.in.(${d.join(",")})`]:[]].join(","))}return f}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(p){return e[p]()}async function t(){let p=n("searchQuery").trim();if(!p||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.asset_code,b.manufacturer,b.model,b.location,b.status,b.asset_type,e.parentAssetFor()(b)?.name],p)).map(b=>b.id),u=n("procedureTemplates").filter(b=>e.matchesQuery([b.name,b.description,...(b.procedure_steps||[]).map(k=>k.prompt)],p)).map(b=>b.id),h=n("parts").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.sku,b.supplier_name,b.quantity_on_hand,b.reorder_point,b.unit_cost],p)).map(b=>b.id),y=new Set;await Promise.all([r(y,h),s(y,"work_order_comments",["body"],p),s(y,"work_order_events",["event_type","summary"],p),s(y,"work_order_photos",["file_name"],p),s(y,"work_order_step_results",["value"],p)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:u.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function r(p,g,u={}){if(!g.length)return;let y=u.maxRows??300;for(let b of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",b),k=>{k.forEach(A=>{A.work_order_id&&p.add(A.work_order_id)}),y-=k.length},y)}catch(k){e.warn("Part-linked work order search failed",k);return}}}async function s(p,g,u,h,y={}){let b=e.postgrestSearchTerm(h);if(!b)return;let k=u.map($=>`${$}.ilike.%${b}%`).join(","),A=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(k),$=>{$.forEach(O=>{O.work_order_id&&p.add(O.work_order_id)})},A)}catch($){e.warn(`${g} work order search failed`,$)}}async function f(p={}){let g=await a(),u=g.length,h=Math.max(1,Math.ceil(u/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,b=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(O=>O.id);if(!b.length)return{data:[],error:null,count:u};let k=p.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),A=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:k,ids:b});if(A.error)return A;let $=new Map((A.data||[]).map(O=>[O.id,O]));return{...A,data:b.map(O=>$.get(O)).filter(Boolean),count:u}}async function a(){let p=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===p)return g.rows;let u=n("searchQuery").trim(),h=new Map;await i(h,u);let y=n("assets").filter(e.matchesActiveLocation).filter(O=>e.matchesQuery([O.name,O.asset_code,O.manufacturer,O.model,O.location,O.status,O.asset_type,e.parentAssetFor()(O)?.name],u)).map(O=>O.id),b=n("procedureTemplates").filter(O=>e.matchesQuery([O.name,O.description,...(O.procedure_steps||[]).map(q=>q.prompt)],u)).map(O=>O.id),k=n("parts").filter(e.matchesActiveLocation).filter(O=>e.matchesQuery([O.name,O.sku,O.supplier_name,O.quantity_on_hand,O.reorder_point,O.unit_cost],u)).map(O=>O.id);await Promise.all([d(h,"asset_id",y),d(h,"procedure_template_id",b)]);let A=new Set;await Promise.all([r(A,k,{maxRows:1/0}),s(A,"work_order_comments",["body"],u,{maxRows:1/0}),s(A,"work_order_events",["event_type","summary"],u,{maxRows:1/0}),s(A,"work_order_photos",["file_name"],u,{maxRows:1/0}),s(A,"work_order_step_results",["value"],u,{maxRows:1/0})]),await m(h,[...A]);let $=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:p,rows:$}),$}async function i(p,g){let u=e.postgrestSearchTerm(g);if(!u)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${u}%`).join(",");await e.fetchPagedSearchRows(()=>c().or(h),y=>o(p,y))}async function d(p,g,u){if(u.length)for(let h of e.chunkArray(u,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>c().in(g,h),y=>o(p,y))}async function m(p,g){if(g.length)for(let u of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>c().in("id",u),h=>o(p,h))}function c(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function o(p,g){(g||[]).forEach(u=>{u?.id&&p.set(u.id,{...p.get(u.id)||{},...u})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:f,exactWorkOrderSearchRows:a,addRelatedWorkOrderIdsFromParts:r,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(a){return e[a]()}function t(){let a=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],a)).sort((g,u)=>g.name.localeCompare(u.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),m=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],a)).sort((g,u)=>g.name.localeCompare(u.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),c=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],a)).sort((g,u)=>new Date(u.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),o=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],a)).sort((g,u)=>String(g.next_due_at||"").localeCompare(String(u.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),p=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(u=>u.prompt)],a)).sort((g,u)=>g.name.localeCompare(u.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:d,parts:m,requests:c,pm:o,procedures:p}}function r(a="all"){let i=e.startOfToday(),d=new Date(i);return d.setDate(d.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(m=>m.status!=="completed").filter(m=>e.matchesSearch([m.title,m.description,m.priority,m.status,m.assets?.name,e.assignmentLabel(m)])).filter(m=>a==="no_due"?!m.due_at:!!m.due_at).map(m=>{let c=m.due_at?new Date(`${m.due_at}T00:00:00`):null;return{kind:a==="no_due"?"no_due":"work",id:m.id,title:m.title,priority:m.priority,status:m.status,assetName:m.assets?.name||"No equipment",dueAt:m.due_at,due:c,createdAt:m.created_at||"",assignedTo:e.assignmentLabel(m),workOrder:m}}).filter(m=>a==="no_due"?!0:a==="overdue"?m.due<i:a==="today"?m.due.getTime()===i.getTime():a==="soon"?m.due>i&&m.due<=d:!0).sort((m,c)=>{if(a==="no_due"){let o={critical:4,high:3,medium:2,low:1};return(o[c.priority]||0)-(o[m.priority]||0)||new Date(m.createdAt||0)-new Date(c.createdAt||0)}return m.due-c.due})}function s(){let a=e.startOfToday(),i=new Date(a);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(d=>{let m=new Date(`${d.next_due_at}T00:00:00`);return m>=a&&m<=i}).filter(d=>e.matchesSearch([d.title,d.frequency,d.next_due_at,d.assets?.name])).map(d=>({kind:"pm",id:d.id,title:d.title,assetName:d.assets?.name||"No equipment",dueAt:d.next_due_at,due:new Date(`${d.next_due_at}T00:00:00`)})).sort((d,m)=>d.due-m.due)}function f(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(a=>a.follow_up_needed).filter(a=>e.matchesSearch([a.title,a.description,a.failure_cause,a.resolution_summary,a.assets?.name,a.assigned_profile?.full_name])).map(a=>({kind:"follow_up",id:a.id,title:a.title,assetName:a.assets?.name||"No equipment",completedAt:a.completed_at?new Date(a.completed_at).toLocaleDateString():"not completed",resolution:a.resolution_summary||a.completion_notes||"",workOrder:a})).sort((a,i)=>a.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:r,planningPmItems:s,followUpItems:f}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,r){return n.from("locations").insert({company_id:t,name:r}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(f,a){return f.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",a)}function e(f,a){return f.from("company_members").select("*").eq("company_id",a).order("created_at",{ascending:!0})}function n(f,a){return f.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",a).order("created_at",{ascending:!1})}function t(f,a){return f.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",a).order("created_at",{ascending:!1})}function r(f,a){return f.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",a).order("created_at",{ascending:!1})}function s(f,a){return f.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",a).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:r,listRequestNotificationRecipients:s}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(i,d,m={}){return i.from("work_orders").select(d,m)}function e(i){return i.from("work_orders").select("id",{count:"exact",head:!0})}function n(i,d,m,c){return i.from("work_orders").select(c).eq("company_id",d).eq("id",m).maybeSingle()}function t(i,d,m,c){return i.from("work_orders").select(c).eq("company_id",d).eq("asset_id",m).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function r(i,d){let{companyId:m,locationId:c,locationsReady:o,selectClause:p,ids:g}=d,u=i.from("work_orders").select(p).eq("company_id",m).in("id",g);return o&&c&&(u=u.eq("location_id",c)),u}function s(i,d){let{companyId:m,locationId:c,locationsReady:o}=d,p=i.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",m);return o&&c&&(p=p.eq("location_id",c)),p}function f(i,d){let{companyId:m,locationId:c,locationsReady:o}=d,p=i.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",m).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return o&&c&&(p=p.eq("location_id",c)),p.order("id",{ascending:!0})}async function a(i,d,m=1/0,c=1e3){let o=0,p=0;for(;p<m;){let g=Math.min(c,m-p),{data:u,error:h}=await i().range(o,o+g-1);if(h)throw h;let y=u||[];if(d(y),p+=y.length,y.length<g)break;o+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:r,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:f,fetchPagedSearchRows:a}})();(function(){function l(s){return s.rpc("get_my_companies")}function e(s,f){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",f).order("created_at",{ascending:!0})}function n(s,f){return s.from("company_members").select("company_id, role").eq("user_id",f).order("created_at",{ascending:!0})}function t(s,f){return s.from("companies").select("id, name, logo_path, created_at").in("id",f).order("created_at",{ascending:!0})}function r(s,f){return s.from("companies").select("id, name, created_at").in("id",f).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:r}})();(function(){function l(r,s){return r.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(r,s){return r.from("app_issue_reports").insert(s)}function n(r,s,f,a){return r.from("app_issue_reports").update({status:a,resolved_at:a==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",f)}function t(r,s,f){return r.from("app_issue_reports").delete().eq("company_id",s).eq("id",f)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,r){return t.from("user_preferences").select(l).eq("user_id",r).maybeSingle()}function n(t,r,s){return t.from("user_preferences").upsert({user_id:r,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Po=B(an()),Ao=B(on()),Ro=B(sn()),Eo=B(cn());(function(){function l(t,r,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${r}</strong></article>`}function e(t,r,s,f="neutral"){return`
    <article class="insight dashboard-card tone-${f}">
      <span>${t}</span>
      <strong>${r}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],r=window.MaintainOpsFormatting?.roleLabel||(a=>String(a||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),f=window.MaintainOpsDom?.escapeHtml||(a=>String(a??""));return`
    <section class="team-role-guide">
      ${t.map(a=>`
        <article>
          <strong>${r(a)}</strong>
          <span>${f(s(a))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var Wo=B(ln());(function(){function l(c,o,p="active",g={},u){let h=u.getActiveStatusFilter(),y=g.filter||g.section,b=y?"button":"article",k=g.filter&&h===g.filter?" selected":"",A=p.includes("overdue")&&Number(o)>=3,$=A?" alert-blink":"",O=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),q=O?` ${O}`:"";return`
    <${b} class="gauge-readout ${p}${k}${$}"${q}>
      ${A?'<span class="gauge-alert-badge" aria-hidden="true">!</span>':""}
      <div class="gauge-visual" aria-hidden="true">
        <span class="gauge-arc"></span>
        <span class="gauge-cut one"></span>
        <span class="gauge-cut two"></span>
        <span class="gauge-cut three"></span>
        <span class="gauge-cut four"></span>
        <span class="gauge-needle"></span>
        <span class="gauge-hub"></span>
      </div>
      <strong>${o}</strong>
      <span>${u.escapeHtml(c)}</span>
    </${b}>
  `}function e(c){let o=c.getWorkOrderDashboardCounts()||{},p=o.activeWork||0,g=o.newWork||0,u=o.inProgress||0,h=o.blocked||0,y=o.overdue||0,b=o.completedAll||0,k=o.completedMonth||0,A=o.completedWeek||0,$=c.getRequestsReady()?c.openMaintenanceRequests().filter(c.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",p,"active",{filter:"active"},c)}
      ${l("New",g,"new",{filter:"open"},c)}
      ${l("In Progress",u,"in_progress",{filter:"in_progress"},c)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},c)}
      ${l("Overdue",y,"overdue",{filter:"overdue"},c)}
      ${l("Requests",$,"request",{filter:"requests"},c)}
      ${l("All Completed",b,"completed",{filter:"completed"},c)}
      ${l("Completed Month",k,"completed",{filter:"completed_month"},c)}
      ${l("Done This Week",A,"completed",{filter:"completed_week"},c)}
    </div>
  `}function n(c,o){let p=c||{},g=p.newWork||0,u=p.inProgress||0,h=p.blocked||0,y=p.activeWork??g+u+h,b=p.overdue||0,k=p.completedAll||0,A=p.completedMonth||0,$=p.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",y,"active workload-pill",{filter:"active"},o)}
      ${l("New",g,"new workload-pill",{filter:"open"},o)}
      ${l("In Progress",u,"in_progress workload-pill",{filter:"in_progress"},o)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},o)}
      ${l("Overdue",b,"overdue workload-pill",{filter:"overdue"},o)}
      ${l("All Completed",k,"completed workload-pill",{filter:"completed"},o)}
      ${l("Completed Month",A,"completed workload-pill",{filter:"completed_month"},o)}
      ${l("Done This Week",$,"completed workload-pill",{filter:"completed_week"},o)}
    </div>
  `}function t(c){return c.getWorkOrders().filter(o=>c.getDueState(o)?.className==="overdue")}function r(c){return c.getWorkOrders().filter(o=>s(o,c))}function s(c,o,p=new Date){if(!c.completed_at)return!1;let g=new Date(c.completed_at),u=o.sundayWeekRange(p);return Number.isFinite(g.getTime())&&g>=u.start&&g<u.end}function f(c){return c.getWorkOrders().filter(a)}function a(c){let o=new Date,p=new Date(o.getFullYear(),o.getMonth(),1);return!!(c.completed_at&&new Date(c.completed_at)>=p)}function i(c){let o=c.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!o.length)return 0;let p=o.reduce((g,u)=>g+Number(u.actual_minutes||0),0);return Math.round(p/o.length)}function d(c){let o=new Date;o.setHours(0,0,0,0);let p=new Date(o);return p.setDate(p.getDate()+7),c.getPreventiveSchedules().filter(g=>{let u=new Date(`${g.next_due_at}T00:00:00`);return u>=o&&u<=p})}function m(c){return Object.freeze({renderGaugeReadout:(o,p,g="active",u={})=>l(o,p,g,u,c),renderWorkOrderGaugeDashboard:()=>e(c),renderWorkloadStrip:o=>n(o,c),overdueWorkOrders:()=>t(c),completedThisWeek:()=>r(c),isCompletedThisWeek:(o,p)=>s(o,c,p),completedThisMonth:()=>f(c),isCompletedThisMonth:a,averageCompletionMinutes:(o=c.getWorkOrders())=>i(o),preventiveDueSoon:()=>d(c)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:m})})();(function(){function l(n){let t={active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,r=>r.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:r,getPartInventoryFilter:s,assetTypeLabel:f,assetStatusLabel:a}){function i(c){return e().trim()?"No requests match this search.":c==="converted"?"No converted requests at this location.":c==="all"?"No requests at this location yet.":"No active requests waiting for review."}function d(){let c=n(),o=t?t():"all";return e().trim()?"No equipment matches this search.":c!=="all"?`No ${a(c).toLowerCase()} equipment found.`:o!=="all"?`No ${f(o).toLowerCase()} equipment found.`:"No equipment added yet."}function m(){return r().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:d,partEmptyStateText:m}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var Io=B(un());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:r,getSearchQuery:s}){function f(u){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(u)} previewed in ${e(r())}</span>
          </div>
          <div class="global-search-grid">
            ${a("Work Orders",u.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${a("Equipment",u.assets,d,"asset")}
            ${a("Parts",u.parts,m,"parts")}
            ${a("Requests",u.requests,c,"comment")}
            ${a("PM",u.pm,o,"procedure")}
            ${a("Procedure Checklists",u.procedures,p,"procedure")}
          </div>
        </section>
      `}function a(u,h,y,b,k={}){return`
        <section class="global-result-group relationship-detail ${b}">
          <div class="panel-header compact">
            <h3>${e(u)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${k.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function i(u){return`
        <button class="global-result-item" data-search-work-order="${u.id}" type="button">
          <strong>${e(u.title)}</strong>
          <span>${n(u.status)} - ${e(u.assets?.name||"No equipment")} - ${e(t(u))}</span>
        </button>
      `}function d(u){return`
        <button class="global-result-item" data-search-asset="${u.id}" type="button">
          <strong>${e(u.name)}</strong>
          <span>${e(u.asset_code||"No serial")} - ${e(u.status)} - ${e(u.location||r())}</span>
        </button>
      `}function m(u){let h=Number(u.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${u.id}" type="button">
          <strong>${e(u.name)}</strong>
          <span>${e(u.sku||"No SKU")} - ${h} on hand${u.supplier_name?` - ${e(u.supplier_name)}`:""}</span>
        </button>
      `}function c(u){return`
        <button class="global-result-item" data-search-request="${u.id}" type="button">
          <strong>${e(u.title)}</strong>
          <span>${e(u.status)} - ${e(u.assets?.name||"No equipment")}</span>
        </button>
      `}function o(u){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(u.title)}" type="button">
          <strong>${e(u.title)}</strong>
          <span>${e(u.assets?.name||"No equipment")} - due ${e(u.next_due_at||"unset")}</span>
        </button>
      `}function p(u){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(u.name)}" type="button">
          <strong>${e(u.name)}</strong>
          <span>${(u.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(u){return Object.values(u).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:f,renderGlobalResultGroup:a,renderGlobalWorkResult:i,renderGlobalAssetResult:d,renderGlobalPartResult:m,renderGlobalRequestResult:c,renderGlobalPmResult:o,renderGlobalProcedureResult:p,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var Lo=B(dn()),No=B(pn());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:r=(d,m)=>m,renderListPagination:s,statusLabel:f,renderRelationshipChips:a,canEditOperationalRecords:i=()=>!0}){function d(p,g,u,h,y={}){let b=n||12,k=typeof t=="function"?t(h):1,A=Math.max(1,Math.ceil(g.length/b)),$=Math.min(Math.max(k,1),A),O=g.slice(($-1)*b,$*b),q=r(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${q?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(p)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${u}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${O.map(o).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${h}`,g.length,$,A):""}
          </div>
        </details>
      `}function m(p,g,u,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(p)}</h3>
            <p>${e(g)}</p>
          </header>
          ${u}
        </section>
      `}function c(p){return`
        <div class="planning-grid">
          ${m("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${d("No Due Date",p.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${d("Follow-up Needed",p.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${m("Current schedule","Work requiring attention now.",`
            ${d("Overdue",p.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${d("Due Today",p.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${m("Upcoming","Near-term maintenance and preventive work.",`
            ${d("Next 7 Days",p.soon,"in_progress","soon")}
            ${d("PM Due Soon",p.pm,"open","pm")}
          `)}
        </div>
      `}function o(p){if(p.kind==="follow_up")return`
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${e(p.title)}</strong>
              <p>${e(p.assetName)} - completed ${e(p.completedAt)}</p>
              ${p.resolution?`<p>${e(p.resolution)}</p>`:""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${e(p.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${e(p.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;if(p.kind==="pm")return`
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${e(p.title)}</strong>
              <p>${e(p.assetName)} - due ${e(p.dueAt)}</p>
            </div>
            <button class="secondary-button" data-generate-pm="${p.id}" type="button">Generate Work</button>
          </article>
        `;if(p.kind==="no_due"){let g=p.createdAt?new Date(p.createdAt):null,u=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(p.priority)} ${e(f(p.status))}</span>
              <strong>${e(p.title)}</strong>
              <p>${e(p.assetName)} - ${e(p.assignedTo||"Unassigned")}</p>
              <p>Created ${e(u)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(p.id)}" type="button">Open Work Order</button>
              ${i()?`
                <form class="planning-due-form" data-planning-due-form="${e(p.id)}">
                  <label>Due date<input name="planning_due_at" type="date" required></label>
                  <button class="primary-button" type="submit">Set Due Date</button>
                </form>
              `:'<span class="muted planning-view-only">View only</span>'}
            </div>
          </article>
        `}return`
        <article class="planning-item mini-work-order" data-mini-work-order="${p.id}">
          <div>
            <span class="eyebrow">${e(p.priority)} ${e(f(p.status))}</span>
            <strong>${e(p.title)}</strong>
            <p>${e(p.assetName)} - due ${e(p.dueAt)}</p>
          </div>
          ${a(p.workOrder)}
        </article>
      `}return{renderPlanningGroup:d,renderPlanningBoard:c,renderPlanningItem:o}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var Qo=B(mn());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:r,getWorkOrderPage:s,getPartsPage:f,getAssetsPage:a}){function i(o,p){if(o<=e)return"";let g=s(),u=(g-1)*e+1,h=Math.min(o,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${u}-${h} of ${o} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function d(o,p){if(o<=n)return"";let g=f(),u=(g-1)*n+1,h=Math.min(o,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${u}-${h} of ${o} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function m(o,p){if(o<=t)return"";let g=a(),u=(g-1)*t+1,h=Math.min(o,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${u}-${h} of ${o} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function c(o,p,g,u){if(p<=r)return"";let h=(g-1)*r+1,y=Math.min(p,g*r);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${p} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:d,renderAssetsPagination:m,renderListPagination:c}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var jo=B(fn());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:r,matchesActiveLocation:s,isAssetDescendantOf:f,parentAssetFor:a}){function i(g=t()){return n().map(u=>`<option value="${u.id}" ${u.id===g?"selected":""}>${e(u.name)}</option>`).join("")}function d(g){let u=a(g);return u?`${g.name} - part of ${u.name}`:g.name}function m(g=""){let u=r().filter(s).sort((b,k)=>d(b).localeCompare(d(k))),h=g?r().find(b=>b.id===g):null;return(h&&!u.some(b=>b.id===h.id)?[h,...u]:u).map(b=>`<option value="${b.id}" ${b.id===g?"selected":""}>${e(d(b))}</option>`).join("")}function c(g="",u=""){return r().filter(s).filter(h=>h.id!==u&&!f(h.id,u)).sort((h,y)=>d(h).localeCompare(d(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(d(h))}</option>`).join("")}function o(g=""){let u=[...new Set(r().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,b)=>y.localeCompare(b)),h=String(g||"").trim();return h&&!u.includes(h)?[h,...u]:u}function p(g=""){return o(g).map(u=>`<option value="${e(u)}" ${u===g?"selected":""}>${e(u)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:m,renderParentAssetOptions:c,renderAssetAreaOptions:p,assetOptionLabel:d}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function r(s){if(!s.photo_storage_path)return"";let f=s.photo_file_name||s.photo_original_file_name||"Request photo",a=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(f)}">`:""}
          <div>
            <strong>${e(f)}</strong>
            <span>${e(a)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:r}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let r=e();if(r>0)return`<b class="nav-badge nav-alert-badge">${r}!</b>`;let s=n();return s>0?`<b class="nav-badge">${s}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(r){let s=Number(r);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(r){let s=e(r);return s?s>99?"99+":String(s):""}function t(r,s={}){let f=n(r);if(!f)return"";let a=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${a}">${f}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function r(s){let f=n()[s.reporter_id]?.full_name||"Team member",a=t().find(m=>m.id===s.location_id)?.name||"No location",i=s.status||"open",d=s.severity||"normal";return`
        <article class="issue-report-card issue-${i}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${d==="blocking"?"critical":d==="minor"?"completed":"open"}">${e(d)}</span>
              <span class="chip issue-status-chip issue-status-${i}">${e(i)}</span>
              <span>${e(a)}</span>
              <span>${s.created_at?new Date(s.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(s.title)}</strong>
            <p>${e(s.details||"")}</p>
            <small>${e(f)} - ${e(s.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(s.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(m=>`<option value="${m}" ${m===i?"selected":""}>${m}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(s.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:r}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:r,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:f}){function a(d){let m=s()[d.id]||[],c=m[m.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(d.title)}</strong>
            <span>${e(t(d))}${c?` - ${e(n(c.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${d.id}" type="button">Open Thread</button>
        </article>
      `}function i(d){let m=r().filter(c=>c.work_order_id===d.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${d.id}" type="button">Message Team</button>
            ${f()?`
              <div class="work-linked-thread-list">
                ${m.map(a).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:i,renderLinkedWorkMessageThread:a}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:l}})();(function(){function l({escapeHtml:e,recommendedWorkOrderStep:n}){function t(r){let s=n(r);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(r,s,f,a,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${f}" type="button">
          <span>${e(r)}</span>
          <strong>${s}</strong>
          <small>${e(a)}</small>
        </button>
      `}function t(r){return r.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:r,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:f,getMessageThreads:a,getPartsUsedByWorkOrder:i}){function d(m){let c=a().filter(u=>u.work_order_id===m.id).length,o=(i()[m.id]||[]).reduce((u,h)=>u+(Number(h.quantity_used)||0),0),p=m.asset_id?s(m)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=m.status==="completed"?"Review history or create follow-up if needed":m.status==="blocked"?"Resolve blocker or add current update":m.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
        <section class="work-command-summary">
          <button class="command-card status-${m.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${n(m.status)}</strong>
            <small>${e(g)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${e(m.assets?.name||"General item / area")}</strong>
            <small>${e(m.due_at?`Due ${m.due_at}`:"Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${e(t(m))}</strong>
            <small>${r(m)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${p[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${p[0]}</strong>
            <small>${e(p[1])}</small>
          </button>
          ${f(m)}
        </section>
      `}return{renderWorkOrderCommandSummary:d}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:l}})();(function(){function l(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function r(){return`
        <datalist id="part-source-options">
          ${n().map(a=>`<option value="${e(a)}"></option>`).join("")}
        </datalist>
      `}function s(){let f=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${f.map(a=>`
                <form class="part-source-row" data-rename-part-source>
                  <input name="old_source" type="hidden" value="${e(a)}">
                  <span>${e(a)}</span>
                  <input name="new_source" list="part-source-options" value="${e(a)}" aria-label="New source name for ${e(a)}">
                  <button class="secondary-button" type="submit">Rename</button>
                </form>
              `).join("")||'<p class="muted">No sources have been added yet.</p>'}
            </div>
            <p class="error-text" id="part-source-error"></p>
          `:'<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>'}
        </section>
      `}return{renderPartSourceOptions:r,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:r,parentAssetFor:s,childAssetsFor:f}){function a(i){let d=t().filter(o=>o.asset_id===i.id&&o.status!=="completed").length,m=s(i),c=f(i.id);return`
        <article class="asset-card asset-state-${i.status} ${i.id===r()?"selected":""}" data-asset-id="${i.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${i.status}">${e(i.status)}</span>
              <span class="chip">${e(n(i.asset_type))}</span>
              ${i.asset_code?`<span class="chip">${e(i.asset_code)}</span>`:""}
              ${i.manufacturer?`<span class="chip">${e(i.manufacturer)}</span>`:""}
              ${i.model?`<span class="chip">${e(i.model)}</span>`:""}
              ${i.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h3>${e(i.name)}</h3>
            <p>${e(i.location||"No location set")}</p>
            ${m?`<p>Part of ${e(m.name)}</p>`:""}
            ${c.length?`<p>${c.length} linked item${c.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${d} open work</span>
        </article>
      `}return{renderAssetCard:a}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function r(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(f=>`<option value="${f.id}" ${f.id===s?"selected":""}>${e(f.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:r}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function r(f){let a=n().filter(i=>i.thread_id===f.id).map(i=>t(i.user_id));return a.length?a.join(", "):"Direct message"}function s(f){return f.thread_type==="direct"?r(f):f.thread_type==="location"?e().find(a=>a.id===f.location_id)?.name||"Location thread":"Whole company"}return{directThreadNames:r,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:r,unreadMessageCount:s,getMessagesByThreadId:f,getActiveMessageThreadId:a}){function i(d){let c=(f()[d.id]||[]).filter(h=>!h.deleted_at),o=c[c.length-1],p=s(d.id),g=o?.body?`${e(t(o.sender_id))}: ${e(o.body)}`:"Last activity",u=o?`${g} - ${e(n(o.created_at))}`:"No messages yet";return`
        <button class="message-thread-button ${d.id===a()?"active":""}" data-message-thread="${d.id}" type="button">
          <strong>${e(d.title)}${p?`<span class="message-unread-pill">${p}</span>`:""}</strong>
          <span>${e(r(d))}</span>
          <small>${u}</small>
        </button>
      `}return{renderMessageThreadButton:i}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var si=B(gn());(function(){function l({getLocations:e}){function n(t){let r=e().find(s=>s.id===t.default_location_id);return r?`Default location: ${r.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function r(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:r}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function r(s){let f=n(s),a=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),d=e.cleanWorkOrderDescription(s.description)||s.title,m=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${f} is down or needs maintenance attention. At this time, the expected downtime is ${a}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${d}`,`Work order: ${s.title}`,`Equipment: ${f}`,`Current update: ${m}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:r}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let r=t?.message||"";return r.includes("assets_asset_type_check")||r.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,f){let a=n(s);return f!==e.OUTSIDE_VENDOR_VALUE?a||null:[a,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function r(s,f){let a=String(s||"").trim();if(!f?.photo_storage_path)return a||null;let i="[Request photo attached to original request]";return a?`${a}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:r}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let r=[];return n.title!==t.title&&r.push("title"),(n.description||"")!==(t.description||"")&&r.push("description"),(n.due_at||"")!==(t.due_at||"")&&r.push("due date"),n.priority!==t.priority&&r.push("priority"),(n.type||"corrective")!==t.type&&r.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&r.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&r.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&r.push("actual minutes"),r.length?`Updated ${r.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,r,s=[]){return[...n.map(f=>({...f,type:"comment"})),...t.map(f=>({...f,type:"photo"})),...s.map(f=>({...f,type:"part"})),...r.map(f=>({...f,type:"event"}))].sort((f,a)=>new Date(a.created_at)-new Date(f.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(a){return Number(a.quantity_on_hand)<=Number(a.reorder_point)}function t(){return e.getParts().filter(n)}function r(a){let i=e.getPartSearchQuery().trim().toLowerCase();return i?a.some(d=>String(d??"").toLowerCase().includes(i)):!0}function s(){let a=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:r([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...a].sort((i,d)=>{let m=String(i.supplier_name||"zzzzzz").localeCompare(String(d.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return m||String(i.name||"").localeCompare(String(d.name||""),void 0,{sensitivity:"base"})}):a}function f(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(a=>String(a.supplier_name||"").trim()).filter(Boolean))].sort((a,i)=>a.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:r,partSourceOptions:f}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(r=>r.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function r(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,d=e.getRequestViewFilter()){return d==="converted"?r(i):d==="all"?!0:!r(i)&&i.status==="submitted"}function f(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(d=>t(d)&&s(d,i))}function a(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:r,requestMatchesViewFilter:s,filteredRequests:f,requestFilterCounts:a}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return r.length?`This equipment is kept for traceability because it has ${r.join(", ")}.`:""}function n(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return r.length?`This procedure is kept for traceability because it is linked to ${r.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(f){return e.getAssets().find(a=>a.id===f?.parent_asset_id)||null}function t(f){return e.getAssets().filter(a=>a.parent_asset_id===f).sort((a,i)=>a.name.localeCompare(i.name))}function r(f,a){if(!f||!a)return!1;let i=e.getAssets().find(m=>m.id===f),d=new Set;for(;i?.parent_asset_id&&!d.has(i.id);){if(i.parent_asset_id===a)return!0;d.add(i.id),i=e.getAssets().find(m=>m.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(f=>!e.matchesActiveLocation(f)||e.getAssetStatusFilter()!=="all"&&f.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(f.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(f.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([f.name,f.asset_code,f.manufacturer,f.model,f.location,f.status,f.asset_type,n(f)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:r}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();var Si=B(hn());(function(){function l(e){function n(r){let s=e.getSearchQuery().trim().toLowerCase();return s?r.some(f=>String(f??"").toLowerCase().includes(s)):!0}function t(r,s=e.getSearchQuery()){let f=s.trim().toLowerCase();return f?r.some(a=>String(a??"").toLowerCase().includes(f)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(a){return a.due_at?new Date(`${a.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(a){return{low:1,medium:2,high:3,critical:4}[a]||0}function r(a){return a.completed_at?new Date(a.completed_at).getTime():0}function s(a){return typeof e.assignmentLabel=="function"?e.assignmentLabel(a):a.assigned_profile?.full_name||a.assigned_to||"Unassigned"}function f(a,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?r(i)-r(a)||new Date(i.created_at)-new Date(a.created_at):e.getWorkSort()==="due"?n(a)-n(i)||new Date(i.created_at)-new Date(a.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(a.priority)||n(a)-n(i):e.getWorkSort()==="type"?String(a.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(a.created_at):e.getWorkSort()==="assigned"?s(a).localeCompare(s(i))||new Date(i.created_at)-new Date(a.created_at):new Date(i.created_at)-new Date(a.created_at)}return{compareWorkOrders:f,dueSortValue:n,prioritySortValue:t,completedSortValue:r,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(r){return r?.location_id||r?.assets?.location_id||null}function t(r){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(r)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(d=>(i==="all"||i==="unread"&&s(d.id)>0||d.thread_type===i)&&e.matchesQuery(r(d),e.getMessageSearchQuery()))}function r(i){let d=e.getMessagesByThreadId()[i.id]||[],m=e.getMessageThreadMembers().filter(c=>c.thread_id===i.id).map(c=>e.teamMemberName(c.user_id));return[i.title,e.messageThreadScopeLabel(i),...m,...d.map(c=>c.body||"")]}function s(i){let d=e.getMessageReadsByThreadId()[i]?.last_read_at,m=d?new Date(d).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(c=>c.sender_id===e.getCurrentUser()?.id?!1:new Date(c.created_at).getTime()>m).length}function f(){return e.getMessageThreads().reduce((i,d)=>i+s(d.id),0)}function a(){return e.getMessageThreads().filter(i=>i.thread_type==="direct").reduce((i,d)=>i+s(d.id),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:r,unreadMessageCount:s,totalUnreadMessages:f,directUnreadMessages:a}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let r=e.getActiveStatusFilter();return r==="overdue"?e.getDueState(t)?.className==="overdue":r==="completed_month"?e.isCompletedThisMonth(t):r==="completed_week"?e.isCompletedThisWeek(t):r==="active"||r==="all"?t.status!=="completed":t.status===r}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let r=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],f=e.getEventsByWorkOrder()[t.id]||[],a=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(c=>c.id===t.procedure_template_id),d=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),m=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,m[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(c=>[c.prompt,c.step_type]),...r.flatMap(c=>[c.parts?.name,c.parts?.sku,c.parts?.supplier_name,c.quantity_used,c.unit_cost]),...s.flatMap(c=>[c.body,m[c.author_id]?.full_name]),...f.flatMap(c=>[c.event_type,c.summary,m[c.actor_id]?.full_name]),...a.flatMap(c=>[c.file_name,c.original_file_name,c.content_type]),...d.flatMap(c=>[c.value,c.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(r=>e.matchesActiveLocation(r)?(e.getMyWorkFilter()==="created"?r.created_by===t:e.isWorkOrderAssignedToUser(r,t))&&e.matchesSearch(e.workOrderSearchValues(r)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])||String(t?.message||"").includes("message_threads")?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var xi=B(yn()),Mi=B(bn()),Ti=B(wn()),Di=B(vn()),Ii=B(kn()),Fi=B(_n()),Li=B(Sn()),Ni=B(qn());(function(){function l(t){if(!t)return"";let r=new Date(t),s=new Date,f=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),a=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),i=r.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return a===f?`Today ${i}`:a===f-864e5?`Yesterday ${i}`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let r=new Date(t),s=new Date,f=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),a=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime();return a===f?"Today":a===f-864e5?"Yesterday":r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let r=String(t||"").trim().split(/\s+/).filter(Boolean);return r.length?r.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();(function(){function l(e){function n(r){let s=r.sender_id===e.getCurrentUserId(),f=e.teamMemberName(r.sender_id);return`
    <article class="message-bubble ${s?"mine":""}">
      <span class="message-avatar" aria-hidden="true">${e.escapeHtml(e.initials(f))}</span>
      <div class="message-bubble-meta">
        <strong>${e.escapeHtml(f)}</strong>
        <span>${e.escapeHtml(e.formatMessageTime(r.created_at))}</span>
      </div>
      <p>${e.escapeHtml(r.body)}</p>
      ${s?`<button class="message-delete-button" data-delete-message="${e.escapeHtml(r.id)}" type="button">Delete</button>`:""}
    </article>
  `}function t(r){let s=r.filter(a=>!a.deleted_at);if(!s.length)return'<p class="muted">No messages yet.</p>';let f="";return s.map(a=>{let i=e.formatMessageDay(a.created_at),d=i!==f?`<div class="message-day-divider"><span>${e.escapeHtml(i)}</span></div>`:"";return f=i,`${d}${n(a)}`}).join("")}return Object.freeze({renderMessageBubble:n,renderMessageList:t})}window.MaintainOpsMessageDisplay=Object.freeze({createMessageDisplayHelpers:l})})();})();
//# sourceMappingURL=runtime.a1c791cc03.js.map
