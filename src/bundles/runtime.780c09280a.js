(()=>{var xn=Object.create;var Ct=Object.defineProperty;var Mn=Object.getOwnPropertyDescriptor;var Tn=Object.getOwnPropertyNames;var Dn=Object.getPrototypeOf,In=Object.prototype.hasOwnProperty;var Q=(c,e)=>()=>{try{return e||c((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Fn=(c,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Tn(e))!In.call(c,r)&&r!==n&&Ct(c,r,{get:()=>e[r],enumerable:!(t=Mn(e,r))||t.enumerable});return c};var B=(c,e,n)=>(n=c!=null?xn(Dn(c)):{},Fn(e||!c||!c.__esModule?Ct(n,"default",{value:c,enumerable:!0}):n,c));var $t=Q((Nn,Te)=>{(function(){let c=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,r=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},f=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),o=f(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:o,workspaceLoadPending:!1,workspaceLoadWasHidden:r?.visibilityState==="hidden",navigationStartedAt:f(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},l=new Map,d=0;function m(W){if(W==null||W==="")return null;let w=Number(W);return Number.isFinite(w)&&w>=0?w:null}function a(){let W=s.connection||s.mozConnection||s.webkitConnection,w=t?.matchMedia?.("(pointer: coarse)")?.matches,P=m(s.deviceMemory),R=m(s.hardwareConcurrency),O=P!==null&&P<=4||R!==null&&R<=4||w?"constrained":"standard",q=m(t?.innerWidth);return{source:"browser",device_tier:O,viewport_class:q!==null&&q<720?"mobile":q!==null&&q<1100?"tablet":"desktop",connection_type:String(W?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!W?.saveData}}function u(W={}){let w={...a(),measurement_version:n,...W};return Object.fromEntries(Object.entries(w).filter(([,P])=>P!=null&&P!==""))}function g(W=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},W))}function p(W,w,P={},R={}){if(!c.has(W))return!1;let O=m(w);if(O===null)return!1;let q=Number(O.toFixed(W==="cls"?4:2));return i.latest[W]={metric:W,value:q,unit:e[W],context:u(P),measuredAt:new Date().toISOString()},R.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:W,value:q,unit:e[W],context:u(P)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(R.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let W=i.companyId,w=i.pending.splice(0,20),P=null;try{P=(await i.client.rpc("record_app_performance_samples",{target_company_id:W,samples:w})).error||null}catch(O){P=O}if(!P)return i.pending.length&&g(1e3),!0;i.companyId===W&&i.pending.unshift(...w);let R=String(P.message||P).toLowerCase();return i.disabledUntil=Date.now()+(R.includes("could not find")||R.includes("does not exist")?3e5:6e4),!1}function y({client:W,companyId:w}){if(i.client=W||null,i.companyId=w||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,p("session_start",1,{source:"workspace"},{immediate:!0});let P=s.connection||s.mozConnection||s.webkitConnection;m(P?.downlink)!==null&&p("connection_downlink_mbps",P.downlink,{source:"browser-estimate"}),m(P?.rtt)!==null&&p("connection_rtt_ms",P.rtt,{source:"browser-estimate"})}g(250)}}function b(){i.workspaceStartedAt=f(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=r?.visibilityState==="hidden"}function k(W){if(!W)return;if(i.workspaceCompanies.has(W)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(W);let w=!i.workspaceLoadWasHidden&&r?.visibilityState!=="hidden";p("workspace_ready_ms",f()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:w}),i.workspaceLoadPending=!1,i.latest.cls||p("cls",d,{source:"performance-observer"},{persist:!1}),w&&t?.setTimeout?.(()=>A(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function A(W=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let w=new Set(W);Object.values(i.latest).filter(P=>w.has(P.metric)).forEach(P=>{let R=P.metric==="inp_ms";(R?i.lastPersistedInpValue===P.value:i.persistedVitals.has(P.metric))||p(P.metric,P.value,{source:"performance-observer"})&&(R?i.lastPersistedInpValue=P.value:i.persistedVitals.add(P.metric))})}function $(W=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,A(["inp_ms"])},W))}function E(){i.navigationStartedAt=f()}function C(W){let w=Number(W);return r?.visibilityState==="hidden"||Number.isFinite(w)&&i.lastHiddenAt>=w}function v(W,w=i.navigationStartedAt){p("section_navigation_ms",f()-w,{source:String(W||"workspace").slice(0,48)},{persist:!C(w)})}function S(W,w,P=null){p("query_latency_ms",f()-w,{source:String(W||"query").slice(0,48)},{persist:!C(w)}),P&&p("client_error",1,{source:`query:${String(W||"unknown").slice(0,36)}`},{immediate:!0})}function _(W={}){let w={source:"performance-room",quality_tier:W.qualityTier||"unknown"};Object.entries({spatial_ready_ms:W.readyMs,spatial_fps:W.fps,spatial_frame_ms:W.frameMs,spatial_slow_frame_pct:W.slowFramePercent,spatial_draw_calls:W.drawCalls,spatial_triangles:W.triangles,spatial_geometries:W.geometries,spatial_textures:W.textures,webgl_context_loss:Number(W.contextLosses)>0?W.contextLosses:void 0}).forEach(([P,R])=>{m(R)!==null&&p(P,R,w)}),g(500)}function T(){return{latest:{...i.latest},connection:a(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function N(W,w,P={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(W)))try{new PerformanceObserver(O=>w(O.getEntries())).observe({type:W,...P})}catch{}}N("paint",W=>{let w=W.find(P=>P.name==="first-contentful-paint");w&&p("fcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),N("largest-contentful-paint",W=>{let w=W.at(-1);w&&p("lcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),N("layout-shift",W=>{W.forEach(w=>{w.hadRecentInput||(d+=w.value)}),p("cls",d,{source:"performance-observer"},{persist:!1})}),N("event",W=>{W.forEach(P=>{P.interactionId&&l.set(P.interactionId,Math.max(l.get(P.interactionId)||0,P.duration))});let w=[...l.values()].sort((P,R)=>R-P);w.length&&(p("inp_ms",w[Math.min(Math.floor(w.length/50),10)],{source:"performance-observer"},{persist:!1}),$())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>p("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>p("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=f(),p("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&p("reconnect_ms",f()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),r?.addEventListener?.("visibilitychange",()=>{r.visibilityState==="hidden"&&(i.lastHiddenAt=f(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),A(),h())});let D={beginWorkspaceLoad:b,configure:y,flush:h,markNavigationStart:E,markWorkspaceReady:k,record:p,recordQueryLatency:S,recordSectionNavigation:v,recordSpatial:_,snapshot:T};typeof window<"u"&&(window.MaintainOpsAppTelemetry=D),typeof Te<"u"&&(Te.exports=D)})()});var Pt=Q((Un,De)=>{(function(){function c(n){return n?.user?.id||""}function e(n,t,r){let s=String(n||"");return!(!c(t)&&!c(r)||s==="TOKEN_REFRESHED"&&c(t)&&c(t)===c(r))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof De<"u"&&(De.exports={shouldRenderForAuthEvent:e})})()});var At=Q((Qn,Ie)=>{(function(){let c={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(o,i,l){if(!o||!o.getItem)return l;let d=o.getItem(i);return d??l}function n(o,i){let l=Number(e(o,i,"1"));return Number.isFinite(l)&&l>0?l:1}function t(o,i,l){!o||!o.setItem||o.setItem(i,String(l))}function r(o,i){try{let l=JSON.parse(e(o,i,"{}"));return l&&typeof l=="object"&&!Array.isArray(l)?l:{}}catch{return{}}}function s(o,i){!o||!o.removeItem||o.removeItem(i)}function f(o={}){let i=o.storage||localStorage,l={activeSection:e(i,c.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,c.activeMessageThreadId,""),searchQuery:e(i,c.searchQuery,""),workOrderSearchMode:e(i,c.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,c.messageThreadFilter,"all"),messageThreadsPage:n(i,c.messageThreadsPage),messageSearchQuery:e(i,c.messageSearchQuery,""),messageComposerWorkOrderId:e(i,c.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,c.managerDashboardUserId,""),managerDashboardMetric:e(i,c.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,c.myWorkFilter,"assigned"),workOrderFilter:e(i,c.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,c.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,c.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,c.workOrderPriorityFilter,"all"),workSort:e(i,c.workSort,"newest"),workGroup:e(i,c.workGroup,"none"),requestViewFilter:e(i,c.requestViewFilter,"active"),workOrderPage:n(i,c.workOrderPage),partsPage:n(i,c.partsPage),assetsPage:n(i,c.assetsPage),financialPage:n(i,c.financialPage),financialMissingFilter:e(i,c.financialMissingFilter,"all"),financialLocationFilter:e(i,c.financialLocationFilter,"all"),financialTypeFilter:e(i,c.financialTypeFilter,"all"),financialAreaFilter:e(i,c.financialAreaFilter,"all"),requestsPage:n(i,c.requestsPage),planningOverduePage:n(i,c.planningOverduePage),planningTodayPage:n(i,c.planningTodayPage),planningSoonPage:n(i,c.planningSoonPage),planningNoDuePage:n(i,c.planningNoDuePage),planningFollowUpPage:n(i,c.planningFollowUpPage),planningPmPage:n(i,c.planningPmPage),planningGroupOpen:r(i,c.planningGroupOpen),schedulesPage:n(i,c.schedulesPage),proceduresPage:n(i,c.proceduresPage),membersPage:n(i,c.membersPage),assetStatusFilter:e(i,c.assetStatusFilter,"all"),assetTypeFilter:e(i,c.assetTypeFilter,"all"),assetAreaFilter:e(i,c.assetAreaFilter,"all"),partInventoryFilter:e(i,c.partInventoryFilter,"all"),partSort:e(i,c.partSort,"default"),partSearchQuery:e(i,c.partSearchQuery,"")};e(i,c.sectionSplitDone,"")!=="true"&&l.activeSection==="work"&&(l.activeSection="mywork",t(i,c.activeSection,l.activeSection),t(i,c.sectionSplitDone,"true")),l.activeSection==="performance"&&(l.activeSection="mywork",t(i,c.activeSection,l.activeSection));let d=(a,u,g)=>{l[a]=u,g&&t(i,g,u)},m=(a,u)=>{d(a,1,u)};return{getActiveSection:()=>l.activeSection,setActiveSection:a=>d("activeSection",a,c.activeSection),getActiveWorkOrderId:()=>l.activeWorkOrderId,setActiveWorkOrderId:a=>d("activeWorkOrderId",a),getActiveAssetId:()=>l.activeAssetId,setActiveAssetId:a=>d("activeAssetId",a),getActivePartId:()=>l.activePartId,setActivePartId:a=>d("activePartId",a),getActiveMessageThreadId:()=>l.activeMessageThreadId,setActiveMessageThreadId:a=>d("activeMessageThreadId",a,c.activeMessageThreadId),getMessageThreadFilter:()=>l.messageThreadFilter,setMessageThreadFilter:a=>d("messageThreadFilter",a,c.messageThreadFilter),getMessageThreadsPage:()=>l.messageThreadsPage,setMessageThreadsPage:a=>d("messageThreadsPage",a,c.messageThreadsPage),resetMessageThreadsPage:()=>m("messageThreadsPage",c.messageThreadsPage),getMessageSearchQuery:()=>l.messageSearchQuery,setMessageSearchQuery:a=>d("messageSearchQuery",a,c.messageSearchQuery),getMessageComposerWorkOrderId:()=>l.messageComposerWorkOrderId,setMessageComposerWorkOrderId:a=>d("messageComposerWorkOrderId",a,c.messageComposerWorkOrderId),getMessageComposerOpen:()=>l.messageComposerOpen,setMessageComposerOpen:a=>d("messageComposerOpen",!!a),getManagerDashboardUserId:()=>l.managerDashboardUserId,setManagerDashboardUserId:a=>d("managerDashboardUserId",a||"",c.managerDashboardUserId),getManagerDashboardMetric:()=>l.managerDashboardMetric,setManagerDashboardMetric:a=>d("managerDashboardMetric",a||"open",c.managerDashboardMetric),getSearchQuery:()=>l.searchQuery,setSearchQuery:a=>d("searchQuery",a,c.searchQuery),getWorkOrderSearchMode:()=>l.workOrderSearchMode,setWorkOrderSearchMode:a=>d("workOrderSearchMode",!!a,c.workOrderSearchMode),getActiveStatusFilter:()=>l.activeStatusFilter,setActiveStatusFilter:a=>d("activeStatusFilter",a),getMyWorkFilter:()=>l.myWorkFilter,setMyWorkFilter:a=>d("myWorkFilter",a,c.myWorkFilter),getWorkOrderFilter:()=>l.workOrderFilter,setWorkOrderFilter:a=>d("workOrderFilter",a,c.workOrderFilter),getWorkOrderAssigneeFilter:()=>l.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:a=>{d("workOrderAssigneeFilter",a),a?t(i,c.workOrderAssigneeFilter,a):s(i,c.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>l.workOrderTypeFilter,setWorkOrderTypeFilter:a=>d("workOrderTypeFilter",a||"all",c.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>l.workOrderPriorityFilter,setWorkOrderPriorityFilter:a=>d("workOrderPriorityFilter",a||"all",c.workOrderPriorityFilter),getWorkSort:()=>l.workSort,setWorkSort:a=>d("workSort",a,c.workSort),getWorkGroup:()=>l.workGroup,setWorkGroup:a=>d("workGroup",a||"none",c.workGroup),getRequestViewFilter:()=>l.requestViewFilter,setRequestViewFilter:a=>d("requestViewFilter",a,c.requestViewFilter),getWorkOrderPage:()=>l.workOrderPage,setWorkOrderPage:a=>d("workOrderPage",a,c.workOrderPage),resetWorkOrderPage:()=>m("workOrderPage",c.workOrderPage),getPartsPage:()=>l.partsPage,setPartsPage:a=>d("partsPage",a,c.partsPage),resetPartsPage:()=>m("partsPage",c.partsPage),getAssetsPage:()=>l.assetsPage,setAssetsPage:a=>d("assetsPage",a,c.assetsPage),resetAssetsPage:()=>m("assetsPage",c.assetsPage),getFinancialPage:()=>l.financialPage,setFinancialPage:a=>d("financialPage",a,c.financialPage),resetFinancialPage:()=>m("financialPage",c.financialPage),getFinancialMissingFilter:()=>l.financialMissingFilter,setFinancialMissingFilter:a=>d("financialMissingFilter",a||"all",c.financialMissingFilter),getFinancialLocationFilter:()=>l.financialLocationFilter,setFinancialLocationFilter:a=>d("financialLocationFilter",a||"all",c.financialLocationFilter),getFinancialTypeFilter:()=>l.financialTypeFilter,setFinancialTypeFilter:a=>d("financialTypeFilter",a||"all",c.financialTypeFilter),getFinancialAreaFilter:()=>l.financialAreaFilter,setFinancialAreaFilter:a=>d("financialAreaFilter",a||"all",c.financialAreaFilter),getRequestsPage:()=>l.requestsPage,setRequestsPage:a=>d("requestsPage",a,c.requestsPage),resetRequestsPage:()=>m("requestsPage",c.requestsPage),getPlanningPage:a=>a==="overdue"?l.planningOverduePage:a==="today"?l.planningTodayPage:a==="soon"?l.planningSoonPage:a==="no-due"?l.planningNoDuePage:a==="follow-up"?l.planningFollowUpPage:a==="pm"?l.planningPmPage:1,setPlanningPage:(a,u)=>{a==="overdue"&&d("planningOverduePage",u,c.planningOverduePage),a==="today"&&d("planningTodayPage",u,c.planningTodayPage),a==="soon"&&d("planningSoonPage",u,c.planningSoonPage),a==="no-due"&&d("planningNoDuePage",u,c.planningNoDuePage),a==="follow-up"&&d("planningFollowUpPage",u,c.planningFollowUpPage),a==="pm"&&d("planningPmPage",u,c.planningPmPage)},getPlanningGroupOpen:(a,u=!1)=>Object.prototype.hasOwnProperty.call(l.planningGroupOpen,a)?!!l.planningGroupOpen[a]:!!u,setPlanningGroupOpen:(a,u)=>{l.planningGroupOpen={...l.planningGroupOpen,[a]:!!u},t(i,c.planningGroupOpen,JSON.stringify(l.planningGroupOpen))},getSchedulesPage:()=>l.schedulesPage,setSchedulesPage:a=>d("schedulesPage",a,c.schedulesPage),resetSchedulesPage:()=>m("schedulesPage",c.schedulesPage),getProceduresPage:()=>l.proceduresPage,setProceduresPage:a=>d("proceduresPage",a,c.proceduresPage),resetProceduresPage:()=>m("proceduresPage",c.proceduresPage),getMembersPage:()=>l.membersPage,setMembersPage:a=>d("membersPage",a,c.membersPage),resetMembersPage:()=>m("membersPage",c.membersPage),getAssetStatusFilter:()=>l.assetStatusFilter,setAssetStatusFilter:a=>d("assetStatusFilter",a,c.assetStatusFilter),getAssetTypeFilter:()=>l.assetTypeFilter,setAssetTypeFilter:a=>d("assetTypeFilter",a,c.assetTypeFilter),getAssetAreaFilter:()=>l.assetAreaFilter,setAssetAreaFilter:a=>d("assetAreaFilter",a,c.assetAreaFilter),getPartInventoryFilter:()=>l.partInventoryFilter,setPartInventoryFilter:a=>d("partInventoryFilter",a,c.partInventoryFilter),getPartSort:()=>l.partSort,setPartSort:a=>d("partSort",a||"default",c.partSort),getPartSearchQuery:()=>l.partSearchQuery,setPartSearchQuery:a=>d("partSearchQuery",a,c.partSearchQuery),snapshot:()=>({...l})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:f},typeof Ie<"u"&&(Ie.exports={createWorkspaceUiState:f})})()});var Rt=Q((Bn,be)=>{(function(){function c(r){return!!String(r?.production_action||"").trim()}function e(r){return c(r)&&r?.production_action_status==="open"}function n(r,s){return!r||!s?!1:r.assigned_to===s||e(r)&&r.production_action_assigned_to===s}function t(r){return e(r)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:c,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof be<"u"&&be.exports&&(be.exports={hasProductionAction:c,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var Et=Q((jn,we)=>{(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",r=>r.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",r=>{r.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:c},typeof we<"u"&&we.exports&&(we.exports={bindWorkspaceProductionActionEvents:c})})()});var Ot=Q((zn,Fe)=>{(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:c},typeof Fe<"u"&&(Fe.exports={bindWorkspaceWorkOrderNotificationEvents:c})})()});var Wt=Q((Hn,ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function r(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(l=>l.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(l=>{l.checked=i.target.checked})}async function f(i){i.preventDefault();let l=i.target,d=l.querySelector("button[type='submit']"),m=n.querySelector("#completion-error"),a=e.getActiveWorkOrderId(),u=e.getWorkOrderById(a),g=e.getProcedureById(u?.procedure_template_id),p=g?e.requiredChecklistProgress(u,g):{done:0,total:0},h=e.productionActionCompletionMessage?.(u)||"";if(h){m&&(m.textContent=h),e.setWorkOrderActionWarning(a,h),e.showNotice(h,"warning");return}if(p.done<p.total){m&&(m.textContent=`Complete required checklist steps first (${p.done}/${p.total}).`);return}let y=new t(l),b=y.get("safety_devices_checked")==="on"||r(a)||e.hasCompletedSafetyDeviceCheck(u);if(e.requiresSafetyDeviceCheck(u)&&!b){m&&(m.textContent="Check safety devices before completing equipment work.");return}d.disabled=!0,d.textContent="Completing...",m&&(m.textContent="");try{let k={status:"completed",asset_id:u?.asset_id||null,actual_minutes:Number(y.get("actual_minutes"))||0,failure_cause:y.get("failure_cause")||null,resolution_summary:y.get("resolution_summary")||null,follow_up_needed:y.get("follow_up_needed")==="on",completion_notes:y.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(k),e.applySafetyCheckPayload(k,k.safety_check_required&&b),delete k.asset_id;let{error:A}=await e.withOperationTimeout(e.updateWorkOrderSafely(k,a),"Complete work save timed out. Check your connection and try again.",2e4);if(A){m&&(m.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(A)}`);return}let $=await e.withOperationTimeout(e.recordWorkOrderEvent(a,"completed",y.get("resolution_summary")||y.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(E=>E);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order completed, but history did not update: ${$.message}`:"Work order completed.",$?"warning":"success"),await e.render()}catch(k){m?m.textContent=`Could not complete work order: ${k.message||k}`:e.alertRef(k.message||k)}finally{d.disabled=!1,d.textContent="Complete Work Order"}}function o(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",f),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(l=>{l.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:o,completeWorkOrder:f,currentSafetyCheckboxCheckedForWorkOrder:r,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:c},typeof ve<"u"&&ve.exports&&(ve.exports={createWorkspaceWorkOrderCompletionEvents:c})})()});var xt=Q((Gn,ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.URLRef||URL,r=e.BlobCtor||Blob,s=e.alertRef||alert,f=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,o=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:C=>String(C||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:C=>String(C||"corrective").replaceAll("_"," "),l={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function d(C){return(e.getAssetDocumentsByAssetId?.()[C]||[]).filter(v=>String(v.content_type||"").startsWith("image/")||v.document_type==="machine_photo"||v.document_type==="nameplate")}function m(C){return d(C).map(v=>v.original_file_name||v.file_name||v.storage_path||v.id).filter(Boolean).join("; ")}function a(C,v){return C?.parent_asset_id&&v.get(C.parent_asset_id)?.name||""}function u(C){return e.getLocations?.().find(v=>v.id===C)?.name||""}function g(C){if(!C)return"";let v=e.getProfilesByUserId?.()[C];return v?.full_name||v?.email||C}function p(C){return String(u(C.location_id)||C.location_id||C.location||"")}function h(C){return{id:`financial:${C.id}`,financialRecord:C,name:C.archived_asset_name||"Deleted equipment",asset_type:C.archived_asset_type||"machine",asset_code:C.archived_asset_code||"",manufacturer:C.archived_manufacturer||"",model:C.archived_model||"",location_id:C.archived_location_id||"",location:C.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(C=>!C.asset_id).map(h)]}function b(C,v,S){let _=p(C).localeCompare(p(v));if(_)return _;let T=(l[C.asset_type||"machine"]||999)-(l[v.asset_type||"machine"]||999);return T||String(a(C,S)).localeCompare(String(a(v,S)))||String(C.location||"").localeCompare(String(v.location||""))||String(C.name||"").localeCompare(String(v.name||""))}function k(){let C=e.getAssets().filter(f),v=new Map(C.map(S=>[S.id,S]));return[...C].sort((S,_)=>b(S,_,v)).map(S=>({equipment_type:o(S.asset_type),name:S.name,parent_equipment:a(S,v),serial_number:S.asset_code||"",manufacturer:S.manufacturer||"",model:S.model||"",picture_id:m(S.id),picture_count:d(S.id).length,picture_status:d(S.id).length?"attached":"missing",facility:u(S.location_id)||S.location_id||"",area_department:S.location||"",status:S.status}))}function A(){let C=y(),v=new Map(C.map(_=>[_.id,_])),S=e.getAssetFinancialsByAssetId?.()||{};return[...C].sort((_,T)=>b(_,T,v)).map(_=>{let T=_.financialRecord||S[_.id]||{};return{operational_status:_.financialRecord?"deleted":"active",equipment_type:o(_.asset_type),name:_.name,parent_equipment:a(_,v),facility:u(_.location_id)||_.location_id||"",area_department:_.location||"",serial_number:_.asset_code||"",manufacturer:_.manufacturer||"",model:_.model||"",picture_status:d(_.id).length?"attached":"missing",asset_tag:T.asset_tag||"",acquisition_date:T.acquisition_date||"",acquisition_cost:T.acquisition_cost||"",depreciation_method:T.depreciation_method||"",useful_life_years:T.useful_life_years||"",current_book_value:T.current_book_value||"",tax_jurisdiction:T.tax_jurisdiction||"",ownership_status:T.ownership_status||"",in_service_date:T.in_service_date||"",disposal_date:T.disposal_date||"",disposal_notes:T.disposal_notes||"",gl_account_code:T.gl_account_code||"",cost_center:T.cost_center||"",finance_notes:T.finance_notes||"",needs_review:!!T.needs_review,last_reviewed_at:T.last_reviewed_at||"",reviewed_by:g(T.reviewed_by)}})}function $(){let C={work:{filename:"work-orders.csv",rows:e.getWorkOrders().map(S=>({title:S.title,status:S.status,priority:S.priority,type:i(S.type),equipment:S.assets?.name||"",assigned_to:e.assignmentLabel(S),due_at:S.due_at||"",completed_at:S.completed_at||"",actual_minutes:S.actual_minutes||0,failure_cause:S.failure_cause||"",resolution_summary:S.resolution_summary||"",follow_up_needed:!!S.follow_up_needed}))},assets:{filename:"equipment.csv",rows:k()},financial:{filename:"equipment-financial.csv",rows:A()},requests:{filename:"maintenance-requests.csv",rows:e.getMaintenanceRequests().map(S=>({title:S.title,status:S.status,priority:S.priority,equipment:S.assets?.name||"",requested_by:e.getProfilesByUserId()[S.requested_by]?.full_name||"",created_at:S.created_at||"",converted_work_order_id:S.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(S=>({title:S.title,equipment:S.assets?.name||"",frequency:S.frequency,next_due_at:S.next_due_at,active:S.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(S=>({name:S.name,sku:S.sku||"",supplier_name:S.supplier_name||"",quantity_on_hand:S.quantity_on_hand,reorder_point:S.reorder_point,unit_cost:S.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(S=>({name:S.name,description:S.description||"",steps:S.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(S=>({user_id:S.user_id,name:e.getProfilesByUserId()[S.user_id]?.full_name||"",role:S.role}))}},v=C[e.getActiveSection()]||C.work;if(!v.rows.length)return s("Nothing to export in this section yet.");E(v.filename,v.rows)}function E(C,v){let S=Object.keys(v[0]),_=[S.join(","),...v.map(W=>S.map(w=>e.csvCell(W[w])).join(","))],T=new r([`\uFEFF${_.join(`
`)}`],{type:"text/csv;charset=utf-8"}),N=t.createObjectURL(T),D=n.createElement("a");D.href=N,D.download=C,n.body.appendChild(D),D.click(),D.remove(),t.revokeObjectURL(N)}return{downloadCsv:E,exportActiveSectionCsv:$}}typeof ke<"u"&&ke.exports&&(ke.exports={createCsvExportHelpers:c}),window.MaintainOpsCsvExport={createCsvExportHelpers:c}})()});var Mt=Q((Vn,Le)=>{(function(){function c(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(r=>{r.addEventListener("click",()=>{let f=r.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');c(f)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:c},typeof Le<"u"&&(Le.exports={bindWorkspaceDatePickerControls:e,openDatePicker:c})})()});var Tt=Q((Yn,Ne)=>{(function(){function c(e={}){let n=e.windowRef||window;function t(s){let f=String.fromCharCode(...s),o=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return o?o(f).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function r(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:r}}window.MaintainOpsPublicRequestTokens=c(),typeof Ne<"u"&&(Ne.exports={createPublicRequestTokenHelpers:c})})()});var Dt=Q((Kn,Ue)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,r=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,f=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.createPublicRequestLink))}),typeof r=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(o=>{o.addEventListener("click",()=>r(o.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(o=>{o.addEventListener("click",()=>s(o.dataset.enablePublicRequestLink,!0))}),typeof f=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(o=>{o.addEventListener("click",()=>f(o.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:c},typeof Ue<"u"&&(Ue.exports={bindWorkspacePublicRequestLinkAdminEvents:c})})()});var It=Q((Jn,Qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(r=>{r.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let f=r.querySelector?.("button[type='submit']");if(!f?.disabled){f&&(f.disabled=!0);try{let o=r.querySelector?.("[name='planning_due_at']");await t(r.dataset.planningDueForm,o?.value)}finally{f?.isConnected&&(f.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:c},typeof Qe<"u"&&(Qe.exports={bindWorkspacePlanningDueDateEvents:c})})()});var Ft=Q((Zn,Be)=>{(function(){let c=new WeakSet;function e(r,s,f){if(!r)return;let o=r.querySelector("[data-equipment-choice-existing]"),i=r.querySelector("[data-equipment-choice-new]"),l=s==="new";r.querySelectorAll("[data-equipment-choice-mode]").forEach(d=>{let m=d.value===(l?"new":"existing");d.checked=m,d.closest("label")?.classList.toggle("active",m)}),r.querySelectorAll("[data-equipment-choice-panel]").forEach(d=>{d.hidden=d.dataset.equipmentChoicePanel!==(l?"new":"existing")}),o&&(o.disabled=l,o.required=!l&&o.dataset.equipmentChoiceRequired==="true",l&&(o.value=""),typeof f=="function"&&f(o)),i&&(i.disabled=!l,i.required=l&&i.dataset.equipmentChoiceRequired==="true",l||(i.value=""))}function n(r,s){r.querySelectorAll("[data-equipment-choice]").forEach(f=>{let o=f.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(f,o,s)})}function t(r={}){let s=r.documentRef||document,f=r.updateAssetLocationWarning;n(s,f),!c.has(s)&&(c.add(s),s.addEventListener("change",o=>{let i=o.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,f);return}let l=o.target.closest?.("[data-equipment-choice-existing]");l&&typeof f=="function"&&f(l)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Be<"u"&&(Be.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var Lt=Q((Xn,je)=>{(function(){function c(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:r,createQuickFixAsset:s,getMaintenanceRequests:f,getQuickFixRequestId:o,getActiveCompanyId:i,getSession:l,getParts:d,getRequestsReady:m,getSupabaseClient:a,confirmAssetLocationRouting:u,assetRequiresSafety:g,blocksProcedureCompletion:p,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:b,descriptionWithAssignmentNote:k,assignedUserFromForm:A,procedureColumn:$,workOrderDateValue:E,applySafetyRequirementPayload:C,applySafetyCheckPayload:v,insertWithOptionalProcedure:S,friendlyWorkOrderSaveError:_,addPartUsageToWorkOrder:T,addPhotoToWorkOrder:N,updateAssetStatus:D,recordWorkOrderEvent:W,setActiveWorkOrderIdState:w,setActiveAssetIdState:P,setCreateWorkOrderMode:R,setQuickFixMode:O,setQuickFixAssetId:q,setQuickFixRequestId:L,showNotice:I,render:z,alertUser:U=re=>window.alert(re)}=e;async function V(re){re.preventDefault();let se=re.currentTarget,Z=n.querySelector("#quick-fix-error"),ae=se.querySelector("button[type='submit']");Z&&(Z.textContent=""),ae&&(ae.disabled=!0,ae.textContent="Saving...");try{let H=new t(se),fe=String(H.get("title")||"").trim();if(!fe)throw new Error("Quick Fix issue is required.");let le=o(),M=i(),j=l(),G=String(H.get("description")||"").trim(),J=String(H.get("resolution_summary")||"").trim(),X=J||fe,K=G||fe,Y=H.get("mark_completed")==="on",ne=H.get("machine_down")==="on",ee=H.get("asset_id")||null,de=le?f().find(ce=>ce.id===le):null,oe=String(H.get("new_asset_name")||"").trim();if(ee&&oe)throw new Error("Choose existing equipment or create new equipment, not both.");if(oe){let{data:ce,error:me}=await r(s(oe,ne?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(me){Z&&(Z.textContent=me.message);return}ee=ce.id}if(!oe&&!u(ee,"logging this Quick Fix",Z))return;if(Y&&g(ee)&&H.get("safety_devices_checked")!=="on"){Z&&(Z.textContent="Check safety devices before marking equipment work complete.");return}let F=Y?p(null,H.get("procedure_template_id")||null):"";if(F){h("",""),Z&&(Z.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let pe={company_id:M,location_id:y(ee),title:fe,description:b(k(K,H.get("assigned_to")),de),asset_id:ee,assigned_to:A(H,j.user.id),priority:H.get("priority")||"medium",type:H.get("type")||"corrective",status:Y?"completed":"open",due_at:E(H.get("due_at")),created_by:j.user.id,...$(H.get("procedure_template_id")),actual_minutes:0,failure_cause:H.get("failure_cause")||null,resolution_summary:Y?X:J||null,follow_up_needed:H.get("follow_up_needed")==="on",completion_notes:Y?X:null,completed_at:Y?new Date().toISOString():null};C(pe),v(pe,Y&&pe.safety_check_required&&H.get("safety_devices_checked")==="on");let{data:he,error:ue}=await r(S("work_orders",pe,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ue){Z&&(Z.textContent=`Could not log quick fix: ${_(ue)}`);return}let x=[],ie=H.get("part_id"),te=Number(H.get("quantity_used"))||1;if(ie){let ce=d().find(Me=>Me.id===ie),me=await r(T(he.id,ce,te),"Part usage save timed out.",12e3).catch(Me=>Me);me&&x.push(`part usage failed: ${me.message}`)}let ge=H.get("photo");if(ge&&ge.name){let ce=await r(N(he.id,ge),"Photo upload timed out.",25e3).catch(me=>me);ce&&x.push(`photo upload failed: ${ce.message}`)}let ye=ne?"offline":H.get("asset_status");if(pe.asset_id&&!oe&&(ne||Y&&ye)){let ce=await r(D(pe.asset_id,ye),"Equipment status update timed out.",12e3).catch(me=>me);ce?x.push(`equipment status did not update: ${ce.message}`):await r(W(he.id,"asset_status_updated",ne?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(me=>x.push(`history did not update: ${me.message}`))}if(await r(W(he.id,"quick_fix",Y?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ce=>x.push(`history did not update: ${ce.message}`)),oe&&await r(W(he.id,"equipment_created",`Equipment created from Quick Fix: ${oe}.`),"Activity log timed out.",8e3).catch(ce=>x.push(`history did not update: ${ce.message}`)),le&&m()){let ce=await r(a().from("maintenance_requests").update({status:"converted",reviewed_by:j.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:he.id}).eq("id",le).eq("company_id",M),"Request status update timed out.",12e3).catch(me=>({error:me}));ce.error?x.push(`request status did not update: ${ce.error.message}`):await r(W(he.id,"request_quick_fixed",Y?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(me=>x.push(`history did not update: ${me.message}`))}w(he.id),P(null),R(!1),O(!1),q(null),L(null),I(x.length?`Quick Fix saved with warning: ${x[0]}`:"Quick Fix saved.",x.length?"warning":"success"),await z()}catch(H){Z?Z.textContent=`Could not log quick fix: ${H.message||H}`:U(H.message||H)}finally{ae&&ae.isConnected&&(ae.disabled=!1,ae.textContent="Log Quick Fix")}}return{createQuickFix:V}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:c},typeof je<"u"&&(je.exports={createQuickFixWorkflow:c})})()});var Nt=Q((er,ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(u,g){return u==="direct"?[e.getSession().user.id,g].filter(Boolean):e.getCompanyMembers().map(p=>p.user_id)}function s(){let u=n.querySelector("#message-thread-form");u&&u.addEventListener("submit",f);let g=n.querySelector("#message-reply-form");g&&g.addEventListener("submit",o),n.querySelectorAll("[data-delete-message]").forEach(p=>{p.addEventListener("click",i)}),n.querySelectorAll("[data-delete-message-thread]").forEach(p=>{p.addEventListener("click",l)})}async function f(u){u.preventDefault();let g=u.currentTarget,p=n.querySelector("#message-thread-error"),h=g.querySelector("button[type='submit']"),y=new t(g);if(p&&(p.textContent=""),!e.getMessagesReady()){p&&(p.textContent="Run supabase/step-next-message-center.sql before creating threads.");return}let b=y.get("thread_type"),k=y.get("direct_user_id"),A=r(b,k),$=String(y.get("title")||"").trim(),E=String(y.get("body")||"").trim();if(b==="company"){p&&(p.textContent="Company-wide broadcast threads are disabled. Choose location or direct.");return}if(b==="direct"&&!k){p&&(p.textContent="Choose a teammate for a direct message.");return}if(!$||!E){p&&(p.textContent="Add a subject and message before starting the thread.");return}A.includes(e.getSession().user.id)||A.push(e.getSession().user.id),h&&(h.disabled=!0,h.textContent="Starting...");let C=!1;try{let v=y.get("work_order_id")||null,S={company_id:e.getActiveCompanyId(),location_id:b==="location"?e.activeLocationDatabaseId():null,thread_type:b,title:$,created_by:e.getSession().user.id};v&&e.getMessageWorkOrderLinksReady()&&(S.work_order_id=v);let{data:_,error:T}=await e.withOperationTimeout(e.supabaseClient().from("message_threads").insert(S).select("*").single(),"Message thread save timed out. Check your connection and try again.",15e3);if(T)throw e.isMissingColumnError(T,"work_order_id")&&e.setMessageWorkOrderLinksReady(!1),T;let N=[...new Set(A)].map(w=>({company_id:e.getActiveCompanyId(),thread_id:_.id,user_id:w})),{error:D}=await e.withOperationTimeout(e.supabaseClient().from("message_thread_members").insert(N),"Message member save timed out. Check your connection and try again.",15e3);if(D)throw D;let{error:W}=await m(_.id,E);if(W)throw W;e.setActiveMessageThreadId(_.id),e.setMessageComposerWorkOrderId(""),e.setMessageComposerOpen(!1),await d(_.id),e.showNotice("Thread started."),C=!0,await e.render()}catch(v){p&&(p.textContent=a(v))}finally{!C&&h?.isConnected&&(h.disabled=!1,h.textContent="Start Thread")}}async function o(u){u.preventDefault();let g=u.currentTarget,p=n.querySelector("#message-reply-error"),h=g.querySelector("button[type='submit']"),y=String(new t(g).get("body")||"").trim();if(!y)return;p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");let b=!1;try{let{error:k}=await m(g.dataset.threadId,y);if(k)throw k;e.showNotice("Message sent."),await d(g.dataset.threadId),b=!0,await e.render()}catch(k){p&&(p.textContent=a(k))}finally{!b&&h?.isConnected&&(h.disabled=!1,h.textContent="Send Reply")}}async function i(u){let g=u.currentTarget,p=g?.dataset?.deleteMessage;if(p&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this message from the thread? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message",{target_message_id:p}),"Message delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.showNotice("Message deleted."),await e.render()}catch(h){e.showNotice(a(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete")}}}async function l(u){let g=u.currentTarget,p=g?.dataset?.deleteMessageThread;if(p&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this thread from your messages? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message_thread",{target_thread_id:p}),"Message thread delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.setActiveMessageThreadId(""),e.showNotice("Thread deleted."),await e.render()}catch(h){e.showNotice(a(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete Thread")}}}async function d(u){if(!e.getMessagesReady()||!u)return;let g=new Date().toISOString(),p={company_id:e.getActiveCompanyId(),thread_id:u,user_id:e.getSession().user.id,last_read_at:g};e.setMessageThreadRead(u,p);let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("message_reads").upsert(p,{onConflict:"thread_id,user_id"}),"Message read marker timed out.",8e3).catch(y=>({error:y}));h&&e.warn("Could not mark message thread read",h)}async function m(u,g){let p=await e.withOperationTimeout(e.supabaseClient().from("messages").insert({company_id:e.getActiveCompanyId(),thread_id:u,sender_id:e.getSession().user.id,body:g}),"Message save timed out. Check your connection and try again.",15e3);return p.error?{error:p.error}:{error:(await e.withOperationTimeout(e.supabaseClient().from("message_threads").update({updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()),"Message thread timestamp save timed out.",8e3).catch(y=>({error:y}))).error}}function a(u){let g=e.messageCenterErrorState(u);return g.messagesReady===!1&&e.setMessagesReady(!1),g.message}return{bindMessageWorkflowEvents:s,createMessageThread:f,sendThreadReply:o,deleteOwnMessage:i,deleteMessageThread:l,markMessageThreadRead:d,insertThreadMessage:m,friendlyMessageCenterError:a,messageThreadMembersForType:r}}window.MaintainOpsMessageWorkflow={createMessageWorkflow:c},typeof ze<"u"&&(ze.exports={createMessageWorkflow:c})})()});var Ut=Q((tr,He)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let d=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),m=n.querySelector("#create-pm-form");m&&!d.includes(m)&&d.push(m),d.forEach(a=>a.addEventListener("submit",f))}async function f(d){d.preventDefault();let m=d.currentTarget,a=m.querySelector("button[type='submit']"),u=m.querySelector("[data-pm-error]")||n.querySelector("#pm-error");u&&(u.textContent=""),a&&(a.disabled=!0,a.textContent="Adding...");try{let g=new t(m);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",u))return;let{error:p}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(p)throw p;e.showNotice("PM schedule added."),await e.render()}catch(g){u?u.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{a&&(a.disabled=!1,a.textContent="Add Schedule")}}function o(d){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(m=>m.id===d)&&(e.setPendingDeleteScheduleId(d),e.renderWorkspace())}async function i(d){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(u=>u.id===d))return;let a=n.querySelector(`[data-confirm-delete-schedule="${r.escape(d)}"]`);a&&(a.disabled=!0,a.textContent="Deleting...");try{let{data:u,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!u?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let p=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",d).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(p.error)throw new Error(`PM schedule delete verification failed: ${p.error.message}`);if(p.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(u){e.showNotice(u.message||"Could not delete PM schedule.","warning"),a&&(a.disabled=!1,a.textContent="Permanently Delete")}}async function l(d){let m=e.getPreventiveSchedules().find(u=>u.id===d);if(!m)return;let a=n.querySelector(`[data-generate-pm="${r.escape(d)}"]`);a&&(a.disabled=!0,a.textContent="Generating...");try{let u={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(m.asset_id),asset_id:m.asset_id,title:m.title,description:`Generated from preventive schedule: ${m.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:m.next_due_at,...e.procedureColumn(m.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(u),e.applySafetyCheckPayload(u,!1);let{data:g,error:p}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",u,{returnSingle:!0}),"PM work order generation timed out.");if(p)throw p;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(m.next_due_at,m.frequency)}).eq("id",m.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(u){e.showNotice(`Could not generate PM work: ${u.message||u}`,"warning"),a&&(a.disabled=!1,a.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:f,requestDeletePreventiveSchedule:o,deletePreventiveSchedule:i,generatePreventiveWorkOrder:l}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:c},typeof He<"u"&&(He.exports={createPreventiveMaintenanceWorkflow:c})})()});var Qt=Q((nr,Ge)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let u=n.querySelector("#create-procedure-form");u&&u.addEventListener("submit",f);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",o),n.querySelectorAll("[data-add-step]").forEach(p=>{p.addEventListener("submit",i)})}async function f(u){u.preventDefault();let g=u.currentTarget,p=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");try{let y=new t(g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(b)throw b;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{p&&(p.disabled=!1,p.textContent="Add Checklist")}}async function o(){let u=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(p=>p.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}u&&(u.disabled=!0,u.textContent="Adding sample...");try{let{data:p,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(k=>({...k,company_id:e.getActiveCompanyId(),procedure_template_id:p.id})),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(b)throw b;e.showNotice("Sample procedure checklist added."),await e.render()}catch(p){e.showNotice(`Could not add sample procedure: ${p.message||p}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Add sample inspection checklist")}}async function i(u){u.preventDefault();let g=u.currentTarget,p=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");try{let y=new t(g),k=(e.getProcedureTemplates().find($=>$.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:k,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(A)throw A;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{p&&(p.disabled=!1,p.textContent="Add Step")}}async function l(u){let[g,p]=await Promise.all([d("work_orders",u),d("preventive_schedules",u)]);return{workOrders:g,schedules:p}}async function d(u,g){let{count:p,error:h}=await e.withOperationTimeout(e.supabaseClient().from(u).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${u}.`,15e3);if(h)throw new Error(`Could not verify linked ${u.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return p||0}async function m(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(p=>p.id===u))return;let g=n.querySelector(`[data-procedure-delete-error="${r.escape(u)}"]`);g&&(g.textContent="");try{let p=await l(u),h=e.procedureDeleteBlockerMessage(p);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(u),e.renderWorkspace()}catch(p){g?g.textContent=p.message||"Could not verify procedure links before delete.":e.showNotice(p.message||"Could not verify procedure links before delete.","warning")}}async function a(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===u))return;let p=n.querySelector(`[data-confirm-delete-procedure="${r.escape(u)}"]`),h=n.querySelector(`[data-procedure-delete-error="${r.escape(u)}"]`);h&&(h.textContent=""),p&&(p.disabled=!0,p.textContent="Deleting...");try{let y=await l(u),b=e.procedureDeleteBlockerMessage(y);if(b)throw new Error(b);let{data:k,error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(A)throw A;if(!k?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let $=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if($.error)throw new Error(`Procedure checklist delete verification failed: ${$.error.message}`);if($.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let b=y.message||"Could not delete procedure.";e.showNotice(b,"warning"),h&&(h.textContent=b),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:f,seedSampleProcedure:o,createProcedureStep:i,loadProcedureDeleteBlockers:l,countProcedureLinkedRows:d,requestDeleteProcedureTemplate:m,deleteProcedureTemplate:a}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:c},typeof Ge<"u"&&(Ge.exports={createProcedureWorkflow:c})})()});var Bt=Q((rr,Ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let p=n.querySelector("#add-member-form");p&&p.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach($=>{$.addEventListener("submit",f)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",o);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",d);let b=n.querySelector("#team-invite-form");b&&b.addEventListener("submit",i);let k=n.querySelector("#team-invite-link-form");k&&k.addEventListener("submit",m),n.querySelectorAll("[data-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId($.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>a($.dataset.confirmRevokeInviteLink))});let A=n.querySelector("#request-notification-recipient-form");A&&A.addEventListener("submit",u),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach($=>{$.addEventListener("click",()=>g($.dataset.deleteRequestNotificationRecipient))})}async function s(p){p.preventDefault();let h=p.currentTarget,y=new t(h),b=String(y.get("role")||"technician").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&b!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}k&&(k.disabled=!0,k.textContent="Adding...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:b}),"Team member save timed out.");if(A)throw A;await e.render()}catch(A){e.alertUser(A.message||A)}finally{k?.isConnected&&(k.disabled=!1,k.textContent="Add Member")}}async function f(p){p.preventDefault();let h=p.currentTarget,y=new t(h),b=String(y.get("role")||"").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}k&&(k.disabled=!0,k.textContent="Saving...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:b}),"Role save timed out. Check your connection and try again.",15e3);if(A)throw new Error(A.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":A.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(A){e.showNotice(`Could not save role: ${A.message||A}`,"warning")}finally{k&&(k.disabled=!1,k.textContent="Save Role")}}async function o(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#profile-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("full_name")||"").trim(),$=h.querySelector('input[name="mobile_tech"]'),E=$?$.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),b&&(b.disabled=!0,b.textContent="Saving...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:A,mobile_tech:E},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(C)throw e.isMissingColumnError(C,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):C;e.showNotice("Profile saved."),await e.render()}catch(C){y&&(y.textContent=C.message||"Could not save profile.")}finally{b&&(b.disabled=!1,b.textContent="Save Profile")}}async function i(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#team-invite-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}b&&(b.disabled=!0,b.textContent="Inviting...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(k.get("email")||"").trim(),invite_role:A,invite_default_location_id:k.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite")||e.isColumnSchemaError($,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):$;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch($){y&&(y.textContent=$.message||"Could not create invite.")}finally{b&&(b.disabled=!1,b.textContent="Create Invite")}}async function l(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:p}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function d(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#password-change-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("password")||""),$=String(k.get("confirmPassword")||"");if(y&&(y.textContent=""),A.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(A!==$){y&&(y.textContent="Passwords do not match.");return}b&&(b.disabled=!0,b.textContent="Updating...");try{let{error:E}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:A}),"Password update timed out. Check your connection and try again.",15e3);if(E)throw E;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(E){y&&(y.textContent=E.message||"Could not update password.")}finally{b&&(b.disabled=!1,b.textContent="Update Password")}}async function m(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#team-invite-link-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let $="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(A==="admin"){let $="Admin join links are not allowed.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){let $="Managers can only create technician join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}b&&(b.disabled=!0,b.textContent="Creating...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:A,link_location_id:k.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite_link")||e.isColumnSchemaError($,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):$;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch($){let E=$.message||"Could not create join link.";e.setTeamInviteLinkError(E),y&&(y.textContent=E)}finally{b&&(b.disabled=!1,b.textContent="Create Join Link")}}async function a(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:p}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function u(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#request-notification-recipient-error"),b=h.querySelector("button[type='submit']"),k=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let A="Only admins can change request email routing.";e.setRequestNotificationRecipientError(A),y&&(y.textContent=A);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}b&&(b.disabled=!0,b.textContent="Adding...");try{let A=String(k.get("email")||"").trim().toLowerCase(),{error:$}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:k.get("location_id")||null,email:A,label:String(k.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if($)throw e.isColumnSchemaError($,["request_notification_recipients"])||$.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):$;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(A){let $=A.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError($),y&&(y.textContent=$)}finally{b&&(b.disabled=!1,b.textContent="Add Recipient")}}async function g(p){if(!(!p||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",p),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:r,addCompanyMember:s,updateCompanyMemberRole:f,updateMyProfile:o,updateMyPassword:d,createTeamInvite:i,cancelTeamInvite:l,createTeamInviteLink:m,revokeTeamInviteLink:a,createRequestNotificationRecipient:u,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:c},typeof Ve<"u"&&(Ve.exports={createTeamWorkflow:c})})()});var jt=Q((ar,Ye)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let l=n.querySelector("#location-form");l&&l.addEventListener("submit",f);let d=n.querySelector("#public-app-url-form");d&&d.addEventListener("submit",o)}async function s(i){i.preventDefault();let l=i.currentTarget,d=l.querySelector("button[type='submit']"),m=new t(l);d&&(d.disabled=!0,d.textContent="Saving...");try{let{error:a}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(m.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(a)throw a;e.showNotice("Company saved."),await e.render()}catch(a){e.showNotice(`Could not save company: ${a.message||a}`,"warning")}finally{d&&(d.disabled=!1,d.textContent="Save Company")}}async function f(i){i.preventDefault();let l=i.currentTarget,d=n.querySelector("#location-error"),m=l.querySelector("button[type='submit']"),a=String(new t(l).get("name")||"").trim();if(a){d&&(d.textContent=""),m&&(m.disabled=!0,m.textContent="Adding...");try{let{data:u,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),a),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(u.id),e.persistActiveLocationId(u.id),e.showNotice("Location added."),await e.render()}catch(u){d&&(d.textContent=u.message||"Could not add location.")}finally{m&&(m.disabled=!1,m.textContent="Add Location")}}}function o(i){i.preventDefault();let l=n.querySelector("#public-request-link-error"),d=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(l&&(l.textContent=""),!d){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let m=e.normalizePublicAppUrl(d);if(!m){l&&(l.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(m),e.storage.setItem("maintainops.publicAppUrl",m),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:r,updateCompanySettings:s,createLocation:f,savePublicAppUrl:o}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:c},typeof Ye<"u"&&(Ye.exports={createCompanySettingsWorkflow:c})})()});var zt=Q((or,Ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.FormDataCtor||FormData,s=e.confirmUser||(a=>t.confirm(a));function f(){let a=n.querySelector("#app-issue-report-form");a&&a.addEventListener("submit",l),n.querySelectorAll("[data-app-issue-status]").forEach(u=>{u.addEventListener("submit",d)}),n.querySelectorAll("[data-delete-app-issue]").forEach(u=>{u.addEventListener("click",m)})}async function o(){let{data:a,error:u}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!u),e.setAppIssueReports(u?[]:a||[]),u)throw u}function i(a){let u=e.appIssueReportErrorState(a);return u.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),u.message}async function l(a){a.preventDefault();let u=a.currentTarget,g=n.querySelector("#app-issue-report-error"),p=u.querySelector("button[type='submit']"),h=new r(u);g&&(g.textContent=""),p&&(p.disabled=!0,p.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:b}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(b)throw b;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await o(),e.renderWorkspace()}catch(y){g&&(g.textContent=i(y))}finally{p?.isConnected&&(p.disabled=!1,p.textContent="Send Report")}}async function d(a){if(a.preventDefault(),!e.canManageTeam())return;let u=a.currentTarget,g=u.querySelector("button[type='submit']"),p=new r(u);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(p.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),u.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await o(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function m(a){if(a.preventDefault(),!e.canManageTeam())return;let u=a.currentTarget,g=u.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;u.disabled=!0;let p=u.textContent;u.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await o(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{u?.isConnected&&(u.disabled=!1,u.textContent=p||"Delete")}}return{bindAppIssueWorkflowEvents:f,reloadAppIssueReports:o,appIssueReportError:i,createAppIssueReport:l,updateAppIssueReportStatus:d,deleteAppIssueReport:m}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:c},typeof Ke<"u"&&(Ke.exports={createAppIssueWorkflow:c})})()});var Ht=Q((ir,Je)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.CSSRef||CSS;async function s(d){let m=n.querySelector("#public-request-link-error"),a=n.querySelector(`[data-create-public-request-link="${r.escape(d)}"]`);m&&(m.textContent=""),a&&(a.disabled=!0,a.textContent="Creating...");try{let{error:u}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:d}),"QR link save timed out. Check your connection and try again.",15e3);if(u)throw e.setPublicRequestLinksReady(!1),new Error(u.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":u.message);e.showNotice("Location request QR link ready."),await e.render()}catch(u){m&&(m.textContent=u.message||"Could not create QR request link.")}finally{a&&(a.disabled=!1,a.textContent="Create QR Link")}}async function f(d){if(!e.canAdministerPublicRequestLinks()){let a=n.querySelector("#public-request-link-error");a&&(a.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await o(d,!1)}async function o(d,m){if(!e.canAdministerPublicRequestLinks()){let a=n.querySelector("#public-request-link-error");a&&(a.textContent="Only admins can reactivate or disable posted QR request links.");return}await l(d,{is_active:!!m},m?"Request link reactivated.":"Request link disabled.")}async function i(d){if(!e.canAdministerPublicRequestLinks()){let a=n.querySelector("#public-request-link-error");a&&(a.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await l(d,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function l(d,m,a){let u=n.querySelector("#public-request-link-error");if(u&&(u.textContent=""),!e.canAdministerPublicRequestLinks()){u&&(u.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!d||!e.getActiveCompanyId()){u&&(u.textContent="Select a company before updating request links.");return}try{let{data:g,error:p}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...m,updated_at:new Date().toISOString()}).eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(p){u&&(u.textContent=p.message);return}if(!g?.length){u&&(u.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(a),await e.render()}catch(g){u&&(u.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:f,setPublicRequestLinkActive:o,regeneratePublicRequestLink:i,updatePublicRequestLink:l}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:c},typeof Je<"u"&&(Je.exports={createPublicRequestLinkWorkflow:c})})()});var Gt=Q((sr,Ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let d=n.querySelector("#create-part-form");d&&d.addEventListener("submit",s),n.querySelectorAll("[data-restock-part]").forEach(m=>{m.addEventListener("submit",f)}),n.querySelectorAll("[data-use-part]").forEach(m=>{m.addEventListener("submit",o)}),n.querySelectorAll("[data-edit-part]").forEach(m=>{m.addEventListener("submit",i)}),n.querySelectorAll("[data-rename-part-source]").forEach(m=>{m.addEventListener("submit",l)})}async function s(d){d.preventDefault();let m=d.currentTarget,a=n.querySelector("#part-create-error"),u=m.querySelector("button[type='submit']"),g=new t(m);a&&(a.textContent=""),u&&(u.disabled=!0,u.textContent="Adding...");let p;try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!h.company_id)throw new Error("Choose a company before adding parts.");if(!h.name)throw new Error("Part name is required.");let y=new Promise((A,$)=>{p=setTimeout(()=>$(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:b,error:k}=await Promise.race([e.supabaseClient().from("parts").insert(h).select("id").single(),y]);if(clearTimeout(p),k&&e.isMissingColumnError(k,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(k&&e.isMissingColumnError(k,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(k)throw k;e.setActivePartId(b?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),m.reset(),await e.render()}catch(h){a&&(a.textContent=h.message||"Could not add part.")}finally{p&&clearTimeout(p),u&&u.isConnected&&(u.disabled=!1,u.textContent="Add Part")}}async function f(d){d.preventDefault();let m=d.target,a=m.querySelector("button[type='submit']"),u=e.getParts().find(h=>h.id===m.dataset.restockPart),g=Number(new t(m).get("quantity"))||0;if(!u||g<=0)return;let p=a?.textContent||"Restock";a&&(a.disabled=!0,a.textContent="Saving...");try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(u.quantity_on_hand)||0)+g}).eq("id",u.id).eq("company_id",e.getActiveCompanyId()),"Part restock timed out. Check your connection and try again.",15e3);if(h)throw h;e.showNotice("Part restocked."),await e.render()}catch(h){e.showNotice(`Could not restock part: ${h.message||h}`,"warning")}finally{a&&(a.disabled=!1,a.textContent=p)}}async function o(d){d.preventDefault();let m=d.currentTarget,a=m.querySelector("button[type='submit']"),u=e.getParts().find(h=>h.id===m.dataset.usePart),g=Number(new t(m).get("quantity"))||0;if(!u||g<=0)return;let p=a?.textContent||"Use";a&&(a.disabled=!0,a.textContent="Saving...");try{let h=Number(u.quantity_on_hand)||0,y=Math.max(0,h-g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:y}).eq("id",u.id).eq("company_id",e.getActiveCompanyId()),"Part use save timed out. Check your connection and try again.",15e3);if(b)throw b;e.showNotice("Part used."),await e.render()}catch(h){e.showNotice(`Could not use part: ${h.message||h}`,"warning")}finally{a&&(a.disabled=!1,a.textContent=p)}}async function i(d){d.preventDefault();let m=d.currentTarget,a=m.dataset.editPart,u=n.querySelector(`[data-part-edit-error="${a}"]`),g=m.querySelector("button[type='submit']"),p=new t(m);u&&(u.textContent="");let h=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let y={name:String(p.get("name")||"").trim(),sku:p.get("sku")||null,supplier_name:p.get("supplier_name")||null,machine_note:p.get("machine_note")||null,quantity_on_hand:Number(p.get("quantity_on_hand"))||0,reorder_point:Number(p.get("reorder_point"))||0,unit_cost:Number(p.get("unit_cost"))||0};try{if(!y.name)throw new Error("Part name is required.");let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(y).eq("id",a).eq("company_id",e.getActiveCompanyId()),"Part save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(b&&e.isMissingColumnError(b,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(b&&e.isMissingColumnError(b,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(b)throw b;e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(b){u&&(u.textContent=b.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=h)}}async function l(d){d.preventDefault();let m=d.currentTarget,a=n.querySelector("#part-source-error"),u=m.querySelector("button[type='submit']"),g=new t(m),p=String(g.get("old_source")||"").trim(),h=String(g.get("new_source")||"").trim();if(a&&(a.textContent=""),!!p){if(!e.getPartSuppliersReady()){a&&(a.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(p===h){a&&(a.textContent="Change the source name before saving.");return}u&&(u.disabled=!0,u.textContent="Renaming...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:h||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",p),"Part source rename timed out. Check your connection and try again.",15e3);if(y)throw e.isMissingColumnError(y,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?y.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(y){a&&(a.textContent=y.message||"Could not update part source.")}finally{u&&(u.disabled=!1,u.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:s,restockPart:f,usePartFromInventory:o,updatePart:i,renamePartSource:l}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:c},typeof Ze<"u"&&(Ze.exports={createPartInventoryWorkflow:c})})()});var Vt=Q((cr,_e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(f){f.preventDefault();let o=f.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#quick-update-error"),d=e.getWorkOrders().find(a=>a.id===e.getActiveWorkOrderId()),m=new t(o);i.disabled=!0,i.textContent="Saving...",l&&(l.textContent="");try{let a=m.get("asset_id")||null,u=String(m.get("new_asset_name")||"").trim();if(a&&u)throw new Error("Choose existing equipment or create new equipment, not both.");if(u){let{data:k,error:A}=await e.createQuickFixAsset(u,"running");if(A){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not add equipment: ${A.message}`);return}a=k.id}if(!u&&!e.confirmAssetLocationRouting(a,"saving this work update",l))return;let g={title:e.requiredText(m.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(d?.description||"",m.get("assigned_to")),asset_id:a,location_id:e.locationIdForAsset(a),due_at:e.workOrderDateValue(m.get("due_at")),status:m.get("status"),priority:m.get("priority"),assigned_to:e.assignedUserFromForm(m),...e.procedureColumn(m.get("procedure_template_id")),resolution_summary:m.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let p=m.get("safety_devices_checked")==="on";if(g.status==="completed"&&d?.status!=="completed"){let k=e.productionActionCompletionMessage?.(d)||"";if(k){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),k),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=k);return}let A=e.blocksProcedureCompletion(d,g.procedure_template_id||null);if(A){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),A),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=A);return}if(e.applySafetyCheckPayload(g,p),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):d?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(p||e.hasCompletedSafetyDeviceCheck(d)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&m.get("machine_down")==="on"){let k=await e.updateAssetStatus(g.asset_id,"offline");k?y.push(`equipment status did not update: ${k.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let b=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(d,Object.fromEntries(m.entries()))),"Activity log timed out.",8e3).catch(k=>k);u&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${u}.`),"Activity log timed out.",8e3).catch(()=>null),b&&y.push(`history did not update: ${b.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(a){r.error("Quick update save failed",a),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not save update: ${a.message||a}`)}}return{updateWorkOrderQuickView:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderQuickUpdateWorkflow:c}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:c}})()});var Yt=Q((lr,Se)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function f(C){return String(C.get("location_new")||C.get("location_existing")||C.get("location")||"").trim()||null}function o(){return e.getSession?.()?.user?.id||null}function i(C){return(e.getAssets?.()||[]).find(v=>v.id===C)||null}function l(C,v){if(!C)return[];let S={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(S).filter(_=>String(C[_]??"")!==String(v[_]??"")).map(_=>S[_])}function d(C){return e.isMissingColumnError(C,"manufacturer")||e.isMissingColumnError(C,"model")}async function m(C){C.preventDefault();let v=C.currentTarget,S=n.querySelector("#asset-create-error");S&&(S.textContent="");let _=v.querySelector("button[type='submit']"),T=_?.textContent||"Add Equipment",N=C.submitter?.dataset?.assetContinue==="true";_&&(_.disabled=!0,_.textContent="Saving...");try{let D=new t(v),W={company_id:e.getActiveCompanyId(),location_id:D.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location:f(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:"running",created_by:o()},w=e.supabaseClient().from("assets").insert(W).select("id").single(),{data:P,error:R}=await e.withOperationTimeout(w,"Equipment save timed out. Check your connection and try again.",15e3);if(R&&e.isMissingColumnError(R,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(R&&e.isMissingColumnError(R,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(R&&d(R))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(R&&e.isAssetHierarchySchemaError(R))throw new Error(e.equipmentSchemaMessage(R));if(R)throw R;P?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(P.id,"created",`Created ${W.name}.`),N&&P?.id?(e.setActiveAssetId(P.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(D){S?S.textContent=D.message:r(D.message)}finally{_&&(_.disabled=!1,_.textContent=T)}}async function a(C){C.preventDefault();let v=C.currentTarget,S=n.querySelector("#asset-edit-error");S&&(S.textContent="");let _=v.querySelector("button[type='submit']"),T=_?.textContent||"Save Equipment";_&&(_.disabled=!0,_.textContent="Saving...");try{let N=new t(v),D=i(e.getActiveAssetId()),W={name:e.requiredText(N.get("name"),"Equipment name"),asset_code:String(N.get("asset_code")||"").trim()||null,manufacturer:String(N.get("manufacturer")||"").trim()||null,model:String(N.get("model")||"").trim()||null,location_id:N.get("location_id")||e.activeLocationDatabaseId(),location:f(N),parent_asset_id:N.get("parent_asset_id")||null,asset_type:N.get("asset_type")||"machine",safety_devices_required:N.get("safety_devices_required")==="on",status:N.get("status")},{error:w}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(W).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(w&&d(w))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(w&&e.isAssetHierarchySchemaError(w))throw new Error(e.equipmentSchemaMessage(w));if(w)throw w;let P=l(D,W);P.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${P.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(N){S?S.textContent=N.message:r(N.message)}finally{_&&(_.disabled=!1,_.textContent=T)}}async function u(C,v){let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:v}).eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!S&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(C,"status_changed",`Status changed to ${v}.`),S||null}async function g(C){C.preventDefault();let v=C.currentTarget,S=v.dataset.attachAssetPart,_=n.querySelector(`[data-asset-part-error="${s.escape(S)}"]`);_&&(_.textContent="");let T=v.querySelector("button[type='submit']"),N=T?.textContent||"Attach Part";T&&(T.disabled=!0,T.textContent="Attaching...");try{let D=new t(v),W=D.get("part_id");if(!W)throw new Error("Select a part to attach.");let w=Math.max(1,Number(D.get("quantity_recommended"))||1),P=String(D.get("note")||"").trim()||null,{error:R}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:S,part_id:W,quantity_recommended:w,note:P}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(R)throw e.isMissingTableError?.(R,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):R.code==="23505"?new Error("This part is already linked to this equipment."):R;e.showNotice("Part linked to equipment."),await e.render()}catch(D){_?_.textContent=D.message||"Could not link part to equipment.":e.showNotice(D.message||"Could not link part to equipment.","warning")}finally{T&&(T.disabled=!1,T.textContent=N)}}async function p(C){let v=n.querySelector("[data-asset-part-error]");v&&(v.textContent="");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingTableError?.(S,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):S;e.showNotice("Part link removed."),await e.render()}catch(S){v?v.textContent=S.message||"Could not remove linked part.":e.showNotice(S.message||"Could not remove linked part.","warning")}}function h(C){return{workOrders:e.getWorkOrders().filter(v=>v.asset_id===C).length,children:e.childAssetsFor(C).length,schedules:e.getPreventiveSchedules().filter(v=>v.asset_id===C).length,requests:e.getMaintenanceRequests().filter(v=>v.asset_id===C).length}}function y(C){let v=h(C);return Object.values(v).some(Boolean)}async function b(C){let[v,S,_]=await Promise.all([k("work_orders",C),k("preventive_schedules",C),k("maintenance_requests",C)]);return{workOrders:v,children:e.childAssetsFor(C).length,schedules:S,requests:_}}async function k(C,v){let{count:S,error:_}=await e.withOperationTimeout(e.supabaseClient().from(C).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",v),`Equipment delete check timed out while checking ${C}.`,15e3);if(_)throw new Error(`Could not verify linked ${C.replaceAll("_"," ")} before deleting equipment: ${_.message}`);return S||0}async function A(C){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");try{let S=await b(C),_=e.assetDeleteBlockerMessage(S);if(_){v&&(v.textContent=_);return}e.setPendingDeleteAssetId(C),e.renderWorkspace()}catch(S){v?v.textContent=S.message||"Could not verify equipment links before delete.":e.showNotice(S.message||"Could not verify equipment links before delete.","warning")}}async function $(C){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");let S=n.querySelector(`[data-confirm-delete-asset="${s.escape(C)}"]`);S&&(S.disabled=!0,S.textContent="Deleting...");try{let _=await b(C),T=e.assetDeleteBlockerMessage(_);if(T)throw new Error(T);let N=e.getAssetDocumentStoragePaths?.(C)||[];if(N.length){let W=await e.withOperationTimeout(e.removeAssetDocumentStorage(N),"Equipment file cleanup timed out.",15e3);if(W.error)throw new Error(`Could not remove equipment files: ${W.error.message}`)}let{error:D}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(D)throw new Error(D.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":D.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(_){v&&(v.textContent=_.message||"Could not delete equipment."),S&&(S.disabled=!1,S.textContent="Permanently Delete")}}async function E(C,v="running"){let S={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:C,asset_type:"machine",safety_devices_required:!0,status:v,created_by:o()},_=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(S).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return _.error&&e.isMissingColumnError(_.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(_,e.databaseSetupRequiredMessage("adding equipment in this location"))):_.error&&e.isMissingColumnError(_.error,"created_by")?e.withSetupError(_,"Run supabase/step-next-asset-events.sql before saving equipment history."):_.error&&e.isAssetHierarchySchemaError(_.error)?e.withSetupError(_,e.equipmentSchemaMessage(_.error).replace("saving","adding")):(!_.error&&_.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(_.data.id,"created",`Created ${C}.`),_)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:k,createAsset:m,createQuickFixAsset:E,deleteAsset:$,loadAssetDeleteBlockers:b,removeAssetPart:p,requestDeleteAsset:A,updateAsset:a,updateAssetStatus:u}}typeof Se<"u"&&Se.exports&&(Se.exports={createAssetWorkflow:c}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:c}})()});var Kt=Q((ur,qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function f(){let u=n.querySelector("#detail-panel");u.innerHTML=e.renderRequestFormContent()}async function o(u){u.preventDefault(),await i(u.target)}async function i(u){let g=n.querySelector("#request-error"),p=u.querySelector("button[type='submit']");g&&(g.textContent=""),p&&(p.disabled=!0,p.textContent="Submitting...");try{let h=new t(u),y=h.get("asset_id")||null,b=String(h.get("equipment_note")||"").trim();if(y&&b)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!b)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let k=b||e.assetNameFor?.(y)||"Saved equipment",A=e.requiredText(h.get("description"),"Request details"),$=e.requiredText(h.get("requester_name"),"Your name"),E={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${k}

${A}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:$};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:C,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(E).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(v)throw v;let S=h.get("photo"),_="";if(S&&S.name){let N=await e.addPhotoToMaintenanceRequest(C.id,S);N&&(_=` Photo did not upload: ${N.message||N}`)}let T=await e.notifyRequestEmailer(C.id);T?.error&&console.warn("Request email notification did not send",T.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${_}`,_?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":r(h.message||h)}finally{p&&(p.disabled=!1,p.textContent="Submit Request")}}async function l(u){let g=e.getMaintenanceRequests().find(h=>h.id===u);if(!g)return;let p=n.querySelector(`[data-convert-request="${s.escape(u)}"]`);p&&(p.disabled=!0,p.textContent="Converting...");try{let h={company_id:e.getActiveCompanyId(),location_id:g.location_id||e.locationIdForAsset(g.asset_id),title:g.title,description:e.descriptionWithRequestPhotoNote(g.description,g),asset_id:g.asset_id||null,priority:g.priority||"medium",type:"corrective",status:"open",created_by:e.getSession().user.id};e.applySafetyRequirementPayload(h),e.applySafetyCheckPayload(h,!1);let{data:y,error:b}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",h,{returnSingle:!0}),"Request conversion timed out. Check your connection and try again.",15e3);if(b)throw b;let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").update({status:"converted",reviewed_by:e.getSession().user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:y.id}).eq("id",u).eq("company_id",e.getActiveCompanyId()),"Request status update timed out. Check your connection and try again.",15e3);if(k)throw k;e.setActiveSection("work"),e.setActiveWorkOrderId(y.id),await e.withOperationTimeout(e.recordWorkOrderEvent(y.id,"request_converted","Request converted to work order."),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),p&&(p.disabled=!1,p.textContent="Convert to Work Order")}}function d(u){let g=e.getMaintenanceRequests().find(p=>p.id===u);g&&(e.setQuickFixRequestId(u),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function m(u){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===u)&&(e.setPendingDeleteRequestId(u),e.renderWorkspace())}async function a(u){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===u);if(!g)return;let p=n.querySelector(`[data-confirm-delete-request="${s.escape(u)}"]`);p&&(p.disabled=!0,p.textContent="Deleting...");try{if(g.photo_storage_path){let k=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(k.error)throw new Error(`Could not remove request photo: ${k.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let b=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(b.error)throw new Error(`Request delete verification failed: ${b.error.message}`);if(b.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:l,createRequest:o,createRequestFromForm:i,deleteMaintenanceRequest:a,openQuickFixForRequest:d,renderRequestForm:f,requestDeleteMaintenanceRequest:m}}typeof qe<"u"&&qe.exports&&(qe.exports={createRequestLifecycleWorkflow:c}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:c}})()});var Jt=Q((dr,Ce)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert;async function s(f){f.preventDefault();let o=f.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",l&&(l.textContent="");try{let d=new t(o),m=d.get("status")||"open",a=d.get("asset_id")||null,u=String(d.get("new_asset_name")||"").trim();if(a&&u)throw new Error("Choose existing equipment or create new equipment, not both.");if(u){let{data:E,error:C}=await e.createQuickFixAsset(u,"running");if(C){l&&(l.textContent=`Could not add equipment: ${C.message}`);return}a=E.id}if(!u&&!e.confirmAssetLocationRouting(a,"creating this work order",l))return;if(m==="completed"&&e.assetRequiresSafety(a)&&d.get("safety_devices_checked")!=="on"){l&&(l.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=m==="completed"?e.blocksProcedureCompletion(null,d.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),l&&(l.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(a),title:e.requiredText(d.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(d.get("description"),d.get("assigned_to")),asset_id:a,priority:d.get("priority"),type:d.get("type")||"corrective",due_at:e.workOrderDateValue(d.get("due_at")),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),status:m,created_by:e.getSession().user.id,actual_minutes:Number(d.get("actual_minutes"))||0,failure_cause:d.get("failure_cause")||null,resolution_summary:d.get("resolution_summary")||null,follow_up_needed:d.get("follow_up_needed")==="on",completion_notes:d.get("completion_notes")||null,completed_at:m==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,m==="completed"&&p.safety_check_required&&d.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){l&&(l.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),u&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${u}.`);let b=[],k=d.get("part_id");if(k){let E=e.getParts().find(v=>v.id===k),C=await e.addPartUsageToWorkOrder(h.id,E,Number(d.get("quantity_used"))||1);C?b.push(`part usage failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${E?.name||"Part"}.`)}let A=d.get("photo");if(A&&A.name){let E=await e.addPhotoToWorkOrder(h.id,A);E?b.push(`photo upload failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${A.name}.`)}let $=String(d.get("initial_comment")||"").trim();if($){let E=await e.addCommentToWorkOrder(h.id,$);E?b.push(`comment failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(b.length?`Work order created with warning: ${b[0]}`:"Work order created.",b.length?"warning":"success"),await e.render()}catch(d){l?l.textContent=`Could not create work order: ${d.message||d}`:r(d.message||d)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderCreationWorkflow:c}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:c}})()});var Zt=Q((pr,$e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(f){f.preventDefault();let i=f.target.querySelector("button[type='submit']"),l=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",l&&(l.textContent="");try{let d=new t(f.target),m=e.getActiveWorkOrderId(),a=e.getWorkOrders().find(E=>E.id===m),u=n.querySelector("#status-select")?.value||a?.status||"open",g=d.has("asset_id"),p=g?d.get("asset_id")||null:a?.asset_id||null;if(g&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(p,"saving this work order",l)){i.disabled=!1,i.textContent="Save Work Order";return}let h={title:e.requiredText(d.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(d.get("description"),d.get("assigned_to")),due_at:e.workOrderDateValue(d.get("due_at")),status:u,priority:d.get("priority"),type:d.get("type"),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),failure_cause:d.get("failure_cause")||null,resolution_summary:d.get("resolution_summary")||null,follow_up_needed:d.get("follow_up_needed")==="on",actual_minutes:Number(d.get("actual_minutes"))||0};if(g&&(h.asset_id=p,h.location_id=e.locationIdForAsset(p)),h.safety_check_required=e.assetRequiresSafety(p),h.status==="completed"){let E=e.productionActionCompletionMessage?.(a)||"";if(E){e.setWorkOrderActionWarning(m,E),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=E);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(a)&&d.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let y=(a?.procedure_template_id||"")!==(h.procedure_template_id||""),b=h.status==="completed"&&(a?.status!=="completed"||y)?e.blocksProcedureCompletion(a,h.procedure_template_id||null):"";if(b){e.setWorkOrderActionWarning(m,b),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=b);return}h.status==="completed"&&a?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(d.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(a)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):a?.status==="completed"&&h.safety_check_required&&d.has("safety_devices_checked")?e.applySafetyCheckPayload(h,d.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(a)):a?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:k}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,m),"Work order save timed out. Check your connection and try again.",2e4);if(k){i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(k)}`);return}let A={...Object.fromEntries(d.entries()),status:u},$=await e.withOperationTimeout(e.recordWorkOrderEvent(m,"updated",e.describeWorkOrderChanges(a,A)),"Activity log timed out.",8e3).catch(E=>E);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order saved, but history did not update: ${$.message}`:"Work order saved.",$?"warning":"success"),await e.render()}catch(d){r.error("Work order save failed",d),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=`Could not save work order: ${d.message||d}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderDetailEditWorkflow:c}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:c}})()});var Xt=Q((mr,Pe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function r(f){f.preventDefault();let o=f.currentTarget,i=n.querySelector("#parts-used-error"),l=o.querySelector("button[type='submit']");i&&(i.textContent=""),l&&(l.disabled=!0,l.textContent="Recording...");try{let d=new t(o),m=d.get("part_id"),a=Number(d.get("quantity_used"))||1,u=e.getParts().find(p=>p.id===m);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!u)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),u,a);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(d){i&&(i.textContent=d.message||"Could not record part used.")}finally{l&&(l.disabled=!1,l.textContent="Record Part Used")}}async function s(f,o,i){if(!o)return new Error("Choose a part first.");let{error:l}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:f,p_part_id:o.id,p_quantity:i}),"Part usage save timed out.");return l||null}return{addPartUsageToWorkOrder:s,recordPartUsed:r}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createPartUsageWorkflow:c}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:c}})()});var en=Q((fr,Ae)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.consoleRef||console,f=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),o=25*1024*1024,i=5*1024*1024,l=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),d=new Set;async function m(w){w.preventDefault();let P=w.currentTarget,R=P.dataset.partDocument,O=n.querySelector(`[data-part-document-error="${R}"]`),q=P.querySelector("button[type='submit']"),L=new t(P),I=L.get("document"),z=h(L.get("document_type"));if(O&&(O.textContent=""),!e.getPartDocumentsReady()){O&&(O.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!I||!I.name){O&&(O.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(S(I)){O&&(O.textContent=_()),await $("part document",I,_());return}q&&(q.disabled=!0,q.textContent="Attaching...");let U=await C(I),V=U.fileName||e.safeFileName(I.name||"part-file"),re=`${e.getActiveCompanyId()}/${R}/${r.randomUUID()}-${V}`;try{let se=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,U.blob,{contentType:U.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(se.error)throw se.error;let Z={company_id:e.getActiveCompanyId(),part_id:R,uploaded_by:e.getSession().user.id,storage_path:re,file_name:V,content_type:U.contentType,document_type:z,file_size_bytes:U.blob.size||null,original_file_name:e.safeFileName(I.name||"part-file"),original_size_bytes:I.size||null},{error:ae}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(Z),"Part file record save timed out. Check your connection and try again.",15e3);if(ae&&e.isColumnSchemaError(ae,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete Z.document_type,delete Z.file_size_bytes,delete Z.original_file_name,delete Z.original_size_bytes,ae=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(Z),"Part file record retry timed out. Check your connection and try again.",15e3)).error),ae)throw await b("part-documents",re),e.isColumnSchemaError(ae,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?ae.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(se){await $("part document",I,se),O&&(O.textContent=se.message||"Could not attach file.")}finally{q&&(q.disabled=!1,q.textContent="Attach File")}}async function a(w){w.preventDefault();let P=w.currentTarget,R=P.dataset.assetDocument,O=n.querySelector(`[data-asset-document-error="${R}"]`),q=P.querySelector("button[type='submit']"),L=new t(P),I=L.get("document"),z=p(L.get("document_type"));if(O&&(O.textContent=""),!e.getAssetDocumentsReady?.()){O&&(O.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!I||!I.name){O&&(O.textContent="Choose a machine file first.");return}if(S(I)){O&&(O.textContent=_()),await $("equipment file",I,_());return}q&&(q.disabled=!0,q.textContent="Uploading...");let U=await C(I),V=`${e.getActiveCompanyId()}/${R}/${r.randomUUID()}-${U.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(V,U.blob,{contentType:U.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:se}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:R,uploaded_by:e.getSession().user.id,storage_path:V,file_name:U.fileName,content_type:U.contentType,document_type:z,file_size_bytes:U.blob.size||null,original_file_name:e.safeFileName(I.name||"machine-photo"),original_size_bytes:I.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(se)throw await b("asset-documents",V),e.isColumnSchemaError(se,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?se.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await $("equipment file",I,re),O&&(O.textContent=re.message||"Could not upload machine file.")}finally{q&&(q.disabled=!1,q.textContent="Attach Machine File")}}async function u(w,P){let R=n.querySelector("[data-asset-document-error]");if(R&&(R.textContent=""),!w||!P){let O="Missing machine file record. Refresh and try again.";R?R.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([P]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(q)throw q;e.showNotice("Machine file deleted."),await e.render()}catch(O){R?R.textContent=O.message||"Could not delete machine file.":e.showNotice(O.message||"Could not delete machine file.","warning")}}async function g(w,P){let R=n.querySelector("#photo-error");if(R&&(R.textContent=""),!w||!P){let O="Missing photo record. Refresh and try again.";R?R.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([P]),"Photo delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(q)throw q;let L=P.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${L}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(O){R?R.textContent=O.message||"Could not delete photo.":e.showNotice(O.message||"Could not delete photo.","warning")}}function p(w){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(w)?w:"other"}function h(w){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(w)?w:"other"}async function y(w){w.preventDefault();let P=w.currentTarget,R=P.querySelector("button[type='submit']"),O=n.querySelector("#photo-error");O&&(O.textContent="");let q=new t(P).get("photo");if(!q||!q.name){O&&(O.textContent="Choose a photo first.");return}let L=N(q);if(L){O&&(O.textContent=L),await $("work order photo",q,L);return}R.disabled=!0,R.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let z=await k(e.getActiveWorkOrderId(),q);if(z)throw z;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${q.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(I){await $("work order photo",q,I),O&&(O.textContent=`Could not upload photo: ${I.message||I}`)}finally{R.disabled=!1,R.textContent="Upload Photo"}}async function b(w,P){try{let{error:R}=await e.withOperationTimeout(e.supabaseClient().storage.from(w).remove([P]),"Uploaded file cleanup timed out.",1e4);R&&s.warn(`Could not remove uploaded ${w} object`,R)}catch(R){s.warn(`Could not remove uploaded ${w} object`,R)}}async function k(w,P){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let O=N(P);if(O)return await $("work order photo",P,O),new Error(O);let q=await C(P,E()),L=D(q);if(L)return await $("work order photo",P,L),new Error(L);let I=`${e.getActiveCompanyId()}/${w}/${r.randomUUID()}-${q.fileName}`,z=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(I,q.blob,{contentType:q.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(z.error)return await $("work order photo",P,z.error),z.error;let U={company_id:e.getActiveCompanyId(),work_order_id:w,uploaded_by:e.getSession().user.id,storage_path:I,file_name:q.fileName,content_type:q.contentType,file_size_bytes:q.blob.size||null,original_file_name:e.safeFileName(P.name||"photo"),original_size_bytes:P.size||null},{error:V}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(U),"Photo record save timed out. Check your connection and try again.",15e3);return V&&e.isColumnSchemaError(V,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete U.file_size_bytes,delete U.original_file_name,delete U.original_size_bytes,V=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(U),"Photo record retry timed out. Check your connection and try again.",15e3)).error),V&&await b("work-order-photos",I),V&&await $("work order photo",P,V),V||null}async function A(w,P){if(!w)return new Error("Request was not saved before photo upload.");let R=N(P);if(R)return await $("request photo",P,R),new Error(R);let O=await C(P,E()),q=D(O);if(q)return await $("request photo",P,q),new Error(q);let L=`${w}/${r.randomUUID()}-${O.fileName}`,I=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(L,O.blob,{contentType:O.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(I.error)return await $("request photo",P,I.error),I.error;let{error:z}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:w,p_photo_storage_path:L,p_photo_file_name:O.fileName,p_photo_content_type:O.contentType,p_photo_file_size_bytes:O.blob.size||null,p_photo_original_file_name:e.safeFileName(P.name||"photo"),p_photo_original_size_bytes:P.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return z&&(await b("maintenance-request-photos",L),await $("request photo",P,z)),z||null}async function $(w,P,R){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let O=String(R?.message||R||"Upload failed").slice(0,500),q=e.safeFileName(P?.name||"unknown-file"),L=T(P),I=Number(P?.size||0),z=[w,q,L,I,O].join("|");if(!d.has(z)){d.add(z);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||w||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${w}`.slice(0,140),details:[`Upload context: ${w}`,`File: ${q}`,`Type: ${L}`,`Size: ${I}`,`Error: ${O}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(U){s.warn("Could not report upload failure",U)}}}function E(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function C(w,P={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(w,P);let R=["image/jpeg","image/png","image/webp","image/heic","image/heif"],O=T(w);if(!R.includes(O))return{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:O};try{if(!f)throw new Error("Browser image optimization is unavailable.");let q=await f(w),L=Number(P.targetBytes||0)||1*1024*1024,I=P.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],z=null;for(let U of I){let V=await W(q,U.maxDimension,U.quality);if(z=V,V.size<=L)break}if(q.close&&q.close(),!z)throw new Error("Browser could not optimize this image.");return{blob:z,fileName:`${e.fileBaseName(w.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(q){return s.warn("Photo optimization failed; uploading original.",q),{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:O}}}function v(w){return["image/jpeg","image/png","image/webp"].includes(T(w))}function S(w){return!v(w)&&Number(w.size||0)>o}function _(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function T(w){let P=String(w?.type||"").trim().toLowerCase();if(P)return P;let R=String(w?.name||"").toLowerCase();return/\.(jpe?g)$/.test(R)?"image/jpeg":/\.png$/.test(R)?"image/png":/\.webp$/.test(R)?"image/webp":/\.gif$/.test(R)?"image/gif":/\.heic$/.test(R)?"image/heic":/\.heif$/.test(R)?"image/heif":/\.pdf$/.test(R)?"application/pdf":/\.txt$/.test(R)?"text/plain":/\.csv$/.test(R)?"text/csv":/\.doc$/.test(R)?"application/msword":/\.docx$/.test(R)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(R)?"application/vnd.ms-excel":/\.xlsx$/.test(R)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function N(w){let P=T(w);return l.has(P)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function D(w){return l.has(String(w?.contentType||"").toLowerCase())?Number(w?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function W(w,P,R){let O=Math.min(1,P/Math.max(w.width,w.height)),q=Math.max(1,Math.round(w.width*O)),L=Math.max(1,Math.round(w.height*O)),I=n.createElement("canvas");I.width=q,I.height=L,I.getContext("2d",{alpha:!1}).drawImage(w,0,0,q,L);let U=await new Promise(V=>I.toBlob(V,"image/jpeg",R));if(!U)throw new Error("Browser could not optimize this image.");return U}return{addPhotoToMaintenanceRequest:A,addPhotoToWorkOrder:k,optimizePhoto:C,removeUploadedObject:b,reportUploadFailure:$,deleteAssetDocument:u,deleteWorkOrderPhoto:g,uploadAssetDocument:a,uploadPartDocument:m,uploadPhoto:y}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMediaStorageWorkflow:c}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:c}})()});var tn=Q((gr,Re)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.URLRef||URL,f=e.consoleRef||console,o=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,l=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function d(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#company-logo-error"),b=h.querySelector("button[type='submit']"),k=new t(h).get("logo");if(y&&(y.textContent=""),!k||!k.name){y&&(y.textContent="Choose a logo image first.");return}b&&(b.disabled=!0,b.textContent="Uploading...");try{let A=u(k);if(A)throw new Error(A);let $=await m(k),E=g($);if(E)throw new Error(E);let C=`${e.getActiveCompanyId()}/logo-${r.randomUUID()}-${$.fileName}`,v=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(C,$.blob,{contentType:$.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(v.error)throw new Error(v.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":v.error.message);let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:C}),"Company logo record save timed out. Check your connection and try again.",15e3);if(S)throw await e.removeUploadedObject("company-logos",C),new Error(e.isColumnSchemaError(S,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":S.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":S.message);let _=e.getCompanies().find(T=>T.id===e.getActiveCompanyId());_&&(_.logo_path=C,_.logoUrl=s.createObjectURL($.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(A){y&&(y.textContent=A.message||"Could not upload logo.")}finally{b&&(b.disabled=!1,b.textContent="Upload Logo")}}async function m(p){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(p);let h=a(p);try{if(!o)throw new Error("Browser logo optimization is unavailable.");let y=await o(p),k=Math.min(1,1200/Math.max(y.width,y.height)),A=Math.max(1,Math.round(y.width*k)),$=Math.max(1,Math.round(y.height*k)),E=n.createElement("canvas");E.width=A,E.height=$;let C=E.getContext("2d",{alpha:!0});C.clearRect(0,0,A,$),C.drawImage(y,0,0,A,$),y.close&&y.close();let v=await new Promise(S=>E.toBlob(S,"image/png"));if(!v)throw new Error("Browser could not optimize this logo.");return{blob:v,fileName:`${e.fileBaseName(p.name||"logo")}.png`,contentType:"image/png"}}catch(y){return f.warn("Logo optimization failed; uploading original.",y),{blob:p,fileName:e.safeFileName(p.name||"logo"),contentType:h}}}function a(p){let h=String(p?.type||"").trim().toLowerCase();if(h)return h;let y=String(p?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function u(p){let h=a(p);return l.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(p){return l.has(String(p?.contentType||"").toLowerCase())?Number(p?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:m,uploadCompanyLogo:d}}typeof Re<"u"&&Re.exports&&(Re.exports={createCompanyLogoWorkflow:c}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:c}})()});var nn=Q((hr,Xe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,r=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function f(i){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}if(!e.getParts().find(a=>a.id===i))return;let d=s(i);if(d){r(d);return}let m=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||m){o(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function o(i){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}let l=e.getParts().find(u=>u.id===i),d=n.querySelector("#part-delete-error");if(d&&(d.textContent=""),!l)return;let m=s(i);if(m){d&&(d.textContent=m);return}let a=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);a&&(a.disabled=!0,a.textContent="Deleting...");try{let u=(e.getPartDocumentsByPartId()[i]||[]).map(y=>y.storage_path).filter(Boolean);if(u.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(u),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:p}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(p)throw new Error(p.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":p.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(u){e.showNotice(u.message||"Could not delete part.","warning"),d&&(d.textContent=u.message||"Could not delete part."),a&&(a.disabled=!1,a.textContent="Permanently Delete")}}return{deletePart:o,requestDeletePart:f}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:c},typeof Xe<"u"&&(Xe.exports={createPartDeleteWorkflow:c})})()});var rn=Q((yr,et)=>{(function(){function c(e={}){async function n(t){let r=t.target,s=r.type==="checkbox"?r.checked?"checked":"":r.value;r.disabled=!0;try{let{error:f}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:r.dataset.workOrderId,procedure_step_id:r.dataset.stepResult,completed_by:s?e.getSession().user.id:null,value:s,completed_at:s?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(f)throw f;await e.withOperationTimeout(e.recordWorkOrderEvent(r.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let o=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(i=>i);if(o){e.showNotice(`Checklist saved, but refresh did not finish: ${o.message||o}`,"warning"),r.disabled=!1;return}if(e.getWorkOrderActionWarningId()===r.dataset.workOrderId){let i=e.getWorkOrders().find(l=>l.id===r.dataset.workOrderId);e.blocksProcedureCompletion(i)||e.setWorkOrderActionWarning("","")}e.renderWorkspace()}catch(f){e.showNotice(`Could not save checklist step: ${f.message||f}`,"warning"),r.disabled=!1}}return{saveStepResult:n}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:c},typeof et<"u"&&(et.exports={createProcedureChecklistWorkflow:c})})()});var an=Q((br,tt)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,r=e.FormDataCtor||FormData;async function s(d,m){let{data:a,error:u}=await e.withOperationTimeout(e.getPublicRequestIntake(d),m);return{data:Array.isArray(a)?a[0]:a,error:u}}async function f(d){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let m=null;try{let{data:u,error:g}=await s(d,"Request QR lookup timed out.");if(m=u,g||!m){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let a=e.publicRequestUrl(d);e.setAppHtml(e.publicRequestQrPage(m,a)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(m,a)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function o(d){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let m=null;try{let{data:a,error:u}=await s(d,"Request form lookup timed out.");if(u){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}m=a}catch(a){i(a.message||"This request link could not be loaded.");return}if(!m){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(m)),n.querySelector("#public-request-form").addEventListener("submit",a=>l(a,d,m))}function i(d){e.setAppHtml(e.publicRequestError(d))}async function l(d,m,a){d.preventDefault();let u=d.currentTarget,g=new r(u),p=n.querySelector("#public-request-error"),h=u.querySelector("button[type='submit']");p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:b}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:m,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(b)throw b;let k=g.get("photo"),A="";if(k&&k.name){let E=await e.addPhotoToMaintenanceRequest(y,k);E&&(A=`Request sent, but the photo did not upload: ${E.message||E}`)}let $=await e.notifyRequestEmailer(y);$.error&&e.warn("Request email notification did not send",$.error),e.setAppHtml(e.publicRequestSuccess(a,A)),n.querySelector("#public-request-another").addEventListener("click",()=>o(m))}catch(y){p&&(p.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:o,renderPublicRequestQrPage:f,submitPublicRequest:l}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:c},typeof tt<"u"&&(tt.exports={createPublicRequestIntakeWorkflow:c})})()});var on=Q((wr,nt)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(f){f.preventDefault();let o=f.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#company-error"),d=String(new t(o).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",l.textContent="";try{if(!d)throw new Error("Company name is required.");let m=e.getCompanies().find(p=>p.name.trim().toLowerCase()===d.trim().toLowerCase());if(m){e.setActiveCompanyId(m.id),e.persistActiveCompanyId(m.id),await e.render();return}let{data:a,error:u}=await e.withOperationTimeout(e.createCompanyRecord(d),"Company creation timed out.");if(u){l.textContent=u.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":u.message;return}if(e.setActiveCompanyId(a),e.persistActiveCompanyId(a),!await e.ensureProfileForActiveCompany(d))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(m){l.textContent=m.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:r}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:c},typeof nt<"u"&&(nt.exports={createCompanySetupWorkflow:c})})()});var sn=Q((vr,rt)=>{(function(){function c(e={}){async function n(r){let s=e.getWorkOrders().find(f=>f.id===e.getActiveWorkOrderId());r.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),r.target.value)||(r.target.value=s?.status||"open")}catch(f){r.target.value=s?.status||"open",e.showNotice(`Could not update status: ${f.message||f}`,"warning")}finally{r.target.disabled=!1}}async function t(r,s){let f=e.getWorkOrders().find(m=>m.id===r);if(s==="completed"){let m=e.productionActionCompletionMessage?.(f)||"";if(m)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,m),e.showNotice(m,"warning"),await e.render(),!1;let a=e.blocksProcedureCompletion(f);if(a)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,a),e.showNotice(a,"warning"),await e.render(),!1}let o=e.currentSafetyCheckboxCheckedForWorkOrder(r),i=e.hasCompletedSafetyDeviceCheck(f)||o;if(s==="completed"&&e.requiresSafetyDeviceCheck(f)&&!i){e.setActiveWorkOrderId(r);let m="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(r,m),e.showNotice(m,"warning"),await e.render(),!1}let l={status:s,asset_id:f?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(l),s==="completed"?e.applySafetyCheckPayload(l,l.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(l,!1),delete l.asset_id;let{error:d}=await e.withOperationTimeout(e.updateWorkOrderSafely(l,r),"Status save timed out. Check your connection and try again.",15e3);return d?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(d)}`,"warning"),!1):(e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(r,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:c},typeof rt<"u"&&(rt.exports={createWorkOrderStatusWorkflow:c})})()});var cn=Q((kr,Ee)=>{(function(){function c(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function r(l,d){return l?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${d}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${d}"]`)||null}async function s({workOrderId:l,payload:d,source:m,busyText:a,successMessage:u}){let g=m?.querySelector?.("button[type='submit']")||m,p=g?.textContent||"",h=r(m,l);g&&(g.disabled=!0,g.textContent=a),h&&(h.textContent="");try{let y=await e.withOperationTimeout(e.updateProductionActionRecord(l,d),"Production Action save timed out. Check your connection and try again.",15e3);if(y.error){let b=e.friendlyWorkOrderSaveError(y.error);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}return e.showNotice(u,"success"),await e.afterProductionActionMutation(y.data,l),!0}catch(y){let b=y.message||String(y);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=p)}}async function f(l){l.preventDefault(),l.stopPropagation();let d=l.currentTarget,m=d.dataset.productionActionForm,a=new n(d),u=String(a.get("production_action")||"").trim(),g=String(a.get("production_action_assigned_to")||"").trim(),p=r(d,m);if(!u||!g){p&&(p.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(m);await s({workOrderId:m,payload:{production_action:u,production_action_assigned_to:g},source:d,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function o(l){l.preventDefault(),l.stopPropagation();let d=l.currentTarget,m=d.dataset.workOrderId,a=d.dataset.productionActionStatus;await s({workOrderId:m,payload:{production_action_status:a},source:d,busyText:a==="completed"?"Completing...":"Reopening...",successMessage:a==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(l){l.preventDefault(),l.stopPropagation();let d=l.currentTarget,m=d.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:m,payload:{production_action:null},source:d,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:f,setProductionActionStatus:o,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:c},typeof Ee<"u"&&Ee.exports&&(Ee.exports={createProductionActionWorkflow:c})})()});var ln=Q((_r,at)=>{(function(){function c(e={}){async function n(s,f={}){let o=s.filter(m=>m.id&&!m.read_at);if(!o.length)return!0;let i=new Map(o.map(m=>[m.id,m])),l=new Date().toISOString(),d=o.map(m=>m.id);e.setNotifications(e.getNotifications().map(m=>i.has(m.id)?{...m,read_at:l}:m)),f.render!==!1&&e.renderWorkspace();try{let m=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,d,l),"Work notification update timed out.",1e4);if(m.error)throw m.error;return!0}catch(m){return e.setNotifications(e.getNotifications().map(a=>i.get(a.id)||a)),e.showNotice(`Could not mark the work notification read: ${m.message||m}`,"warning"),f.render!==!1&&e.renderWorkspace(),!1}}function t(s,f={}){let o=e.getNotifications().find(i=>i.id===s);return o?.read_at?Promise.resolve(!0):n([o||{id:s,read_at:null}],f)}function r(s,f={}){return n(e.getNotifications().filter(o=>o.work_order_id===s),f)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:r}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:c},typeof at<"u"&&(at.exports={createWorkOrderNotificationWorkflow:c})})()});var un=Q((Sr,ot)=>{(function(){function c(e){async function n(t,r){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(f=>f.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let f=e.workOrderDateValue(r);if(!f)throw new Error("Choose a due date.");let o=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:f},t),"Due date save timed out. Check your connection and try again.");if(o.error)throw o.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:f}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:f}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${f} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:f}}catch(f){return e.showNotice(`Could not set due date: ${f.message||f}`,"warning"),{saved:!1,reason:"save_failed",error:f}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:c},typeof ot<"u"&&(ot.exports={createPlanningDueDateWorkflow:c})})()});var dn=Q((qr,it)=>{(function(){function c(n,t,r,s=50){let f=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",r).order("created_at",{ascending:!1}).limit(f)}function e(n,t,r,s){let f=[...new Set((r||[]).filter(Boolean))];return f.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",f).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:c,markWorkOrderNotificationsRead:e},typeof it<"u"&&(it.exports={listWorkOrderNotifications:c,markWorkOrderNotificationsRead:e})})()});var pn=Q((Cr,st)=>{(function(){async function c(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:r}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:r||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:c},typeof st<"u"&&(st.exports={notifyRequestEmailer:c})})()});var mn=Q(($r,ct)=>{(function(){async function c(n,t,r=[],s={}){let f=s.pathKey||"storage_path",o=s.urlKey||"signedUrl",i=s.expiresIn||600,l=s.onError;await Promise.all(r.map(async d=>{let m=d?.[f];if(!m)return;let{data:a,error:u}=await n.storage.from(t).createSignedUrl(m,i);if(u){d[o]="",typeof l=="function"&&l(d,u);return}d[o]=a?.signedUrl||""}))}function e(n={}){function t(r){if(!r||!n.getReady())return;let f=(n.getRows(r)||[]).filter(i=>i.storage_path&&!i.signedUrl),o=n.getSigningMap();!f.length||o[r]||(o[r]=!0,n.withOperationTimeout(c(n.supabaseClient(),n.bucketName,f),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete o[r],n.getActiveGroupId()===r&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e},typeof ct<"u"&&(ct.exports={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e})})()});var fn=Q((Pr,lt)=>{(function(){function c(t,r){if(t[r]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${r}`);return t[r]}function e(t={}){let r=c(t,"supabaseClient"),s=c(t,"workspaceUiState"),f=c(t,"applyRequestQueryFilters"),o=c(t,"applyWorkOrderListFilters"),i=c(t,"applyWorkOrderFilters"),l=c(t,"selectWorkOrders"),d=c(t,"countWorkOrdersQuery"),m=c(t,"fetchExactSearchedWorkOrderPage"),a=c(t,"isColumnSchemaError"),u=t.warn||(()=>{}),g=c(t,"LIST_ITEMS_PER_PAGE"),p=c(t,"WORK_ORDERS_PER_PAGE"),h=c(t,"REQUEST_RELATION_SELECT"),y=c(t,"REQUEST_ASSET_FALLBACK_SELECT"),b=c(t,"REQUEST_FALLBACK_SELECT"),k=c(t,"WORK_ORDER_RELATION_SELECT"),A=c(t,"WORK_ORDER_FALLBACK_SELECT");function $(){return typeof r=="function"?r():r}async function E(D=s.getRequestViewFilter(),W={}){let w=Math.max(1,s.getRequestsPage()),P=(w-1)*g,R=P+g-1,O=W.includeRelations===!1?b:W.includeLocationRelation===!1?y:h,q=await f($().from("maintenance_requests").select(O,{count:"exact"}),D).order("created_at",{ascending:!1}).range(P,R);return q.error&&W.includeLocationRelation!==!1&&a(q.error,["location_id","locations"])?E(D,{includeLocationRelation:!1}):q.error&&W.includeRelations!==!1?E(D,{includeRelations:!1}):!q.error&&q.count&&w>1&&P>=q.count?(s.setRequestsPage(Math.max(1,Math.ceil(q.count/g))),E(D,W)):q}async function C(D){let W=await f($().from("maintenance_requests").select("id",{count:"exact",head:!0}),D);return W.error?(u("Request count failed",W.error),0):W.count||0}async function v(){let[D,W,w]=await Promise.all([C("active"),C("converted"),C("all")]);return{active:D,converted:W,all:w}}async function S(D={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return m(D);let W=Math.max(1,s.getWorkOrderPage()),w=(W-1)*p,P=w+p-1,R=D.includeLocationRelation===!1?A:k,O=await o(l($(),R,{count:"exact"})).range(w,P);return!O.error&&O.count&&W>1&&w>=O.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(O.count/p))),S(D)):O}async function _(D={}){let W=await i(d($()),D);return W.error?(u("Work order count failed",W.error),0):W.count||0}async function T(){let[D,W,w,P,R,O,q,L]=await Promise.all([_({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:D,newWork:W,inProgress:w,blocked:P,overdue:R,completedAll:O,completedMonth:q,completedWeek:L}}async function N(){let[D,W,w,P,R,O,q,L]=await Promise.all([_({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:D,newWork:W,inProgress:w,blocked:P,overdue:R,completedAll:O,completedMonth:q,completedWeek:L}}return{fetchRequestPage:E,countRequests:C,loadRequestDashboardCounts:v,fetchWorkOrderPage:S,countWorkOrders:_,loadWorkOrderDashboardCounts:T,loadMyWorkDashboardCounts:N}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof lt<"u"&&(lt.exports=n)})()});var gn=Q((Ar,ut)=>{(function(){function c(e={}){let n=e.windowRef||window,t=e.documentRef||document,r=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function f(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function o(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){l("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let p=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;p=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;p=h?.session||null}if(!p){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;p=h?.session||null}if(!p)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(p),o(),l("Verification complete. Loading workspace..."),await e.render()}catch(p){o(),d(p.message||"This verification link is invalid or expired.")}}function l(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallback(g)}function d(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function m(g=e.passwordRecoveryParamsFromUrl()){let p=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:b}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});p=!!(y?.session&&!b),b&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";u({ready:p,initialError:h})}function a(g="",p=""){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordResetRequest(g,p),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,b=y.querySelector("button[type='submit']"),k=t.querySelector("#auth-error"),A=t.querySelector("#auth-status"),$=String(new FormData(y).get("email")||"").trim();k.textContent="",A.textContent="Sending reset link...",b.disabled=!0,b.textContent="Sending...";try{let{error:E}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail($,{redirectTo:f()}),"Password reset email timed out. Check your connection and try again.",2e4);if(E){A.textContent="",k.textContent=E.message;return}A.textContent="If that email exists in Supabase, a reset link has been sent."}catch(E){A.textContent="",k.textContent=E.message||"Could not send reset link."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Send Reset Link")}})}function u({ready:g=!1,initialError:p=""}={}){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordRecovery({ready:g,initialError:p}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{o(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{o(),a()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,b=y.querySelector("button[type='submit']"),k=new FormData(y),A=String(k.get("password")||""),$=String(k.get("confirmPassword")||""),E=t.querySelector("#auth-error"),C=t.querySelector("#auth-status");if(E.textContent="",A.length<8){E.textContent="Password must be at least 8 characters.";return}if(A!==$){E.textContent="Passwords do not match.";return}C.textContent="Updating password...",b.disabled=!0,b.textContent="Updating...";try{let{error:v}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:A}),"Password update timed out. Try the newest reset link again.",2e4);if(v){C.textContent="",E.textContent=v.message;return}o();let{data:S}=await e.supabaseClient.auth.getSession();if(e.setSession(S.session),C.textContent=S.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",S.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(v){C.textContent="",E.textContent=v.message||"Could not update password."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:f,clearPasswordRecoveryUrl:o,startAuthCallback:i,renderAuthCallback:l,renderAuthCallbackError:d,startPasswordRecovery:m,renderPasswordResetRequest:a,renderPasswordRecovery:u}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:c},typeof ut<"u"&&(ut.exports={createAuthSessionFlow:c})})()});var hn=Q((Rr,Oe)=>{(function(){function c(f,o){let i=o.getProfilesByUserId();if(f.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${o.escapeHtml(i[f.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(f.created_at).toLocaleString()}</span>
        <p>${o.escapeHtml(f.body)}</p>
      </article>
    `;if(f.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${o.photoMetaText(f)} &middot; ${o.escapeHtml(i[f.uploaded_by]?.full_name||"Team member")}</span>
        <p>${o.escapeHtml(f.file_name)}</p>
        ${f.signedUrl?`<a href="${o.escapeHtml(f.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(f.type==="part"){let d=o.partUsageUnitCost(f)*(Number(f.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(f.created_at).toLocaleString()} &middot; ${o.escapeHtml(i[f.created_by]?.full_name||"Team member")}</span>
        <p>${o.escapeHtml(f.parts?.name||"Part")} - ${Number(f.quantity_used)||0} used - ${o.money(d)}</p>
      </article>
    `}return`
    <article>
      <strong>${o.escapeHtml(f.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(f.created_at).toLocaleString()} \xC2\xB7 ${o.escapeHtml(i[f.actor_id]?.full_name||"Team member")}</span>
      <p>${o.escapeHtml(f.summary)}</p>
    </article>
  `}function e(f,o){let i=o.getProcedureTemplates(),l=o.getPartsUsedByWorkOrder(),d=o.getCommentsByWorkOrder(),m=o.getPhotosByWorkOrder(),a=o.getMessageThreads(),u=i.find(A=>A.id===f.procedure_template_id),g=u?o.checklistProgress(f,u):null,p=(l[f.id]||[]).length,h=(d[f.id]||[]).length,y=(m[f.id]||[]).length,b=a.filter(A=>A.work_order_id===f.id).length,k=[];return f.asset_id&&k.push(n("asset","Equipment",f.assets?.name||"Linked",o)),u&&g&&k.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,o)),p&&k.push(n("parts","Parts",String(p),o)),h&&k.push(n("comment","Comments",String(h),o)),b&&k.push(n("message","Messages",String(b),o)),y&&k.push(t(f.id,String(y),o)),k.length?`<div class="relationship-row">${k.join("")}</div>`:""}function n(f,o,i,l){return`
    <span class="relationship-chip ${f}" title="${l.escapeHtml(o)}">
      ${r(f)}
      <span>${l.escapeHtml(i)}</span>
    </span>
  `}function t(f,o,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(f)}" title="Open photos">
      ${r("photo")}
      <span>${i.escapeHtml(o)}</span>
    </button>
  `}function r(f){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[f]||""}function s(f){return Object.freeze({renderActivityItem:o=>c(o,f),renderRelationshipChips:o=>e(o,f),relationshipChip:(o,i,l)=>n(o,i,l,f),photoJumpChip:(o,i)=>t(o,i,f),relationshipIcon:r})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Oe<"u"&&Oe.exports&&(Oe.exports={createRelationshipDisplayHelpers:s})})()});var yn=Q((Er,dt)=>{(function(){function c(e){let n=e.segmentIcon,t=e.escapeHtml,r=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,f=e.isConvertedRequest,o=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),l=e.getPendingDeleteRequestId,d=e.getProfilesByUserId;function m(p,h){return p==="converted"?`${h} converted`:p==="all"?`${h} total`:`${h} active`}function a(p,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",p.active],["converted","Converted",p.converted],["all","All",p.all]].map(([k,A,$])=>`
            <button class="segment ${h===k?"active":""}" data-request-filter="${k}" type="button" ${y.locked&&k!=="active"?"disabled":""}>
              ${n(k==="active"?"open":k==="converted"?"completed":"all")}${A} <span>${$}</span>
            </button>
          `).join("")}
        </div>
      `}function u(p){let h=f(p),y=i(),b=l()===p.id,k=d(),A=p.created_at?new Date(p.created_at):null,$=A&&!Number.isNaN(A.getTime())?A.toLocaleString():"date unavailable",E=p.assets?.name||p.locations?.name||"No equipment",C=p.requested_by_name||k[p.requested_by]?.full_name||"Requester",v=p.converted_by||p.reviewed_by||"",S=k[v]?.full_name||"",_=S?`Converted to work order by ${S}`:v?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",T=y&&o()?b?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${t(p.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${t(p.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${h?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${p.priority}">${t(p.priority)}</span>
                <span class="chip ${h?"completed":"open"}">${h?"converted":t(p.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${t(p.title)}</h3>
            <p>${t(p.description||"No description.")}</p>
            ${s(p)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(E)}</span>
              <span><strong>Requester</strong>${t(C)}</span>
              <span><strong>Received</strong>${t($)}</span>
            </div>
          </div>
          ${y&&!h&&p.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${p.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${p.id}" type="button">Convert to Work Order</button>
              ${T}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(_)}</span>
              ${T}
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
      `}return{requestPanelSubtitle:m,renderRequestFilterBar:a,renderMaintenanceRequest:u,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:c},typeof dt<"u"&&(dt.exports={createRequestDisplayHelpers:c})})()});var bn=Q((Or,pt)=>{(function(){function c({statusLabel:e,workOrderTypeLabel:n=R=>String(R||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:r,getWorkOrderFilter:s,getWorkOrderTypeFilter:f=()=>"all",getWorkOrderPriorityFilter:o=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:l=()=>"none",getActiveStatusFilter:d,getMyWorkFilter:m,getActiveSection:a,getDueState:u,getProcedureTemplates:g,getActiveWorkOrderId:p,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:b,TYPE_OPTIONS:k=[],OUTSIDE_VENDOR_VALUE:A,escapeHtml:$,cleanWorkOrderDescription:E,relationshipIcon:C,segmentIcon:v,isVendorAssigned:S,assignmentLabel:_,renderRelationshipChips:T,canAssignWorkOrderToMe:N,canManageTeam:D,renderProductionActionCard:W=()=>"",hasOpenProductionAction:w=()=>!1,hasUnreadProductionReady:P=()=>!1}){function R(){let M=r(),j=s(),G=d(),J=M?`${t(M)} Work`:j==="unassigned"?"Unassigned Work Orders":j==="vendor"?"Outside Vendor Work":j==="assigned"?"Assigned Work Orders":"Work Orders";return G==="active"||G==="all"?J==="Work Orders"?"Active Work Orders":`Active - ${J}`:`${e(G)} - ${J}`}function O(){let M=d();return M==="active"||M==="all"?"My Work":`${e(M)} - My Work`}function q(){return a()==="mywork"?O():R()}function L(M){let j=a(),G=m();return j==="mywork"?`${M} shown - ${j==="mywork"?G==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${M} shown`}function I(M,j,G){return`<option value="${$(M)}" ${M===G?"selected":""}>${$(j)}</option>`}function z(M){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[M]||"Any assignment"}function U(M){return M?M.charAt(0).toUpperCase()+M.slice(1):""}function V(M=[]){let j=d(),G=j==="all"?"active":j,J=s(),X=r(),K=f(),Y=o(),ne=i(),ee=l(),de=["completed","completed_month","completed_week"].includes(j),oe=G==="active"&&J==="all"&&!X&&K==="all"&&Y==="all"&&ne==="newest"&&ee==="none",F=M.find(te=>te.userId===X),pe=[`Status: ${e(G)}`,`Assignment: ${z(J)}`,...F?[`Person: ${F.name}`]:[],...K!=="all"?[`Type: ${n(K)}`]:[],...Y!=="all"?[`Priority: ${U(Y)}`]:[]],he=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ue=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],x=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],ie=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${pe.map(te=>`<li><span>${$(te)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${oe?"disabled":""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${G!=="active"?"is-active":""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${he.map(([te,ge])=>I(te,ge,G)).join("")}
                </select>
              </label>
              <label class="work-control-field ${J!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ue.map(([te,ge])=>I(te,ge,J)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${I("","Any team member",X)}
                  ${M.map(te=>I(te.userId,te.name,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${K!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${I("all","Any type",K)}
                  ${k.map(te=>I(te,n(te),K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${I("all","Any priority",Y)}
                  ${["critical","high","medium","low"].map(te=>I(te,U(te),Y)).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="work-control-section arrange-controls">
            <span class="work-control-section-title">Arrange by</span>
            <div class="work-control-fields">
              <label class="work-control-field">
                <span>Sort</span>
                <select data-work-sort-filter aria-label="Sort work orders" ${de?"disabled":""}>
                  ${de?I("completed","Recently completed","completed"):x.map(([te,ge])=>I(te,ge,ne)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${ie.map(([te,ge])=>I(te,ge,ee)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function re(M,j){if(j==="assignee"){if(S(M))return{key:"vendor",label:"Outside vendor",order:900};if(!M.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let X=_(M);return{key:`assignee:${M.assigned_to}`,label:X,order:100}}if(j==="status"){let X=["open","in_progress","blocked","completed"].indexOf(M.status);return{key:`status:${M.status}`,label:e(M.status),order:X<0?99:X}}if(j==="priority"){let X=["critical","high","medium","low"].indexOf(M.priority);return{key:`priority:${M.priority}`,label:U(M.priority||"Unspecified"),order:X<0?99:X}}let G=M.type||"corrective",J=k.indexOf(G);return{key:`type:${G}`,label:n(G),order:J<0?99:J}}function se(M,j={}){if(!M.length)return'<p class="muted">No work orders match these filters.</p>';let G=j.groupBy||"none";if(G==="none")return`<div class="work-list" id="work-order-list">${M.map(Z).join("")}</div>`;let J=new Map;return M.forEach(K=>{let Y=re(K,G);J.has(Y.key)||J.set(Y.key,{...Y,workOrders:[]}),J.get(Y.key).workOrders.push(K)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...J.values()].sort((K,Y)=>K.order-Y.order||K.label.localeCompare(Y.label)).map(K=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${$(K.label)}</h3>
                <span>${K.workOrders.length}</span>
              </div>
              <div class="work-list">${K.workOrders.map(Z).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function Z(M){let j=u(M),G=g().find(ee=>ee.id===M.procedure_template_id),J=M.created_at?new Date(M.created_at):null,X=J&&!Number.isNaN(J.getTime())?J.toLocaleDateString():"",K=M.status==="completed",Y=K?"Completed":e(M.status),ne=ee=>ee==="completed"?"Complete":e(ee);return`
        <article class="work-card status-card status-${M.status} ${M.id===p()?"selected":""}" data-id="${M.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${M.priority}">${M.priority}</span>
              <span class="chip">${$(n(M.type))}</span>
              <span class="chip ${M.status}">${Y}</span>
              ${j?`<span class="chip ${j.className}">${j.label}</span>`:""}
              ${P(M.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${$(M.title)}</h3>
            <p>${$(E(M.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${C("asset")}${$(M.assets?.name||"General item / area")}</span>
            <span>${v(S(M)?"vendor":"mine")}${$(_(M))}</span>
            ${G?`<span>${C("procedure")}${$(G.name)}</span>`:""}
            <span>${v("due")}Due ${M.due_at||"unset"}</span>
            ${X?`<span>${v("created")}Created ${$(X)}</span>`:""}
            ${M.completed_at?`<span>${v("completed")}Completed ${new Date(M.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${T(M)}
          ${W(M)}
          <div class="quick-actions work-card-actions">
            ${!K&&N(M)?`<button class="assign-action" data-assign-me="${M.id}" type="button">Assign to me</button>`:""}
            ${!K&&D()?ae(M):""}
          ${b.filter(ee=>ee!==M.status&&!(ee==="completed"&&w(M))).slice(0,3).map(ee=>`
            <button data-quick-status="${ee}" data-id="${M.id}" type="button">${ne(ee)}</button>
          `).join("")}
        </div>
      </article>
    `}function ae(M){return`
        <form class="card-assign-form" data-card-assign="${M.id}">
          <select name="assigned_to" aria-label="Assign ${$(M.title)}">
            <option value="">Unassigned</option>
            <option value="${A}" ${S(M)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([j,G])=>`<option value="${j}" ${!S(M)&&j===M.assigned_to?"selected":""}>${$(G.full_name||t(j))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function H(M="",j={}){let G=M||"",J=j.managerOptions??D(),X=j.allowUnassigned!==!1,K=j.selfLabel||"Assign to me",Y=[];return X&&Y.push(`<option value="" ${G===""?"selected":""}>Unassigned</option>`),Y.push(`<option value="${y().user.id}" ${G===y().user.id?"selected":""}>${K}</option>`),J&&(Y.push(`<option value="${A}" ${G===A?"selected":""}>Outside vendor</option>`),Y.push(...Object.entries(h()).filter(([ne])=>ne!==y().user.id).map(([ne,ee])=>`<option value="${ne}" ${G===ne?"selected":""}>${$(ee.full_name||t(ne))}</option>`))),Y.join("")}function fe(M){return S(M)?A:M?.assigned_to||""}function le(M,j=""){let G=fe(M);return M?.status==="completed"?`
          <label ${j?`id="${j}"`:""}>Completed by / assigned to
            <input value="${$(_(M))}" disabled>
            <input name="assigned_to" type="hidden" value="${$(G)}">
          </label>
        `:D()?`
          <label ${j?`id="${j}"`:""}>Assign to
            <select name="assigned_to">
              ${H(G,{managerOptions:!0})}
            </select>
          </label>
        `:!M.assigned_to&&!S(M)?`
          <label ${j?`id="${j}"`:""}>Assign to
            <select name="assigned_to">
              ${H("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${j?`id="${j}"`:""}>Assigned to
          <input value="${$(_(M))}" disabled>
          <input name="assigned_to" type="hidden" value="${$(G)}">
        </label>
      `}return{workOrdersPanelTitle:R,myWorkPanelTitle:O,workQueuePanelTitle:q,workQueuePanelSubtitle:L,renderWorkOrderFilterToolbar:V,renderWorkOrderCollection:se,renderWorkOrderCard:Z,renderCardAssignmentControl:ae,renderAssignmentSelect:H,renderWorkOrderAssignmentField:le}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:c},typeof pt<"u"&&(pt.exports={createWorkQueueDisplayHelpers:c})})()});var wn=Q((Wr,We)=>{(function(){function c(e={}){function n(){return e.getCompanyMembers().filter(a=>e.normalizeRole(a.role)==="production").map(a=>({userId:a.user_id,name:e.teamMemberName(a.user_id)})).sort((a,u)=>a.name.localeCompare(u.name))}function t(a){return a.production_action_assigned_to?e.teamMemberName(a.production_action_assigned_to):"Production owner not set"}function r(a){let u=e.activeCompanyRole();return["admin","manager"].includes(u)||a.production_action_assigned_to===e.getSession()?.user?.id}function s(a=""){return n().map(g=>`
        <option value="${e.escapeHtml(g.userId)}" ${g.userId===a?"selected":""}>${e.escapeHtml(g.name)}</option>
      `).join("")}function f(a,u={}){let g=n(),p=u.compact?" compact":"";if(!g.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=g.some(y=>y.userId===a.production_action_assigned_to)?a.production_action_assigned_to:g[0].userId;return`
        <form class="production-action-form${p}" data-production-action-form="${e.escapeHtml(a.id)}">
          <label>Production action
            <textarea name="production_action" rows="${u.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(a.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${s(h)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(a.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(a)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(a)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(a.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function o(a){return!r(a)||a.status==="completed"?"":a.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(a.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(a.id)}" type="button">Reopen Production Action</button>`}function i(a){let u=a.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${u?"status-completed":"status-open"}">${u?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(a))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(a.production_action)}</p>
        ${u&&a.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(a.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function l(a,u){let g=e.hasProductionAction(a),p=`production-action-dialog-${a.id}`;return`
        <dialog class="production-action-dialog" id="${e.escapeHtml(p)}" data-production-action-dialog="${e.escapeHtml(a.id)}" aria-labelledby="${e.escapeHtml(p)}-title">
          <div class="production-action-dialog-shell">
            <header class="production-action-dialog-header">
              <div>
                <small>Work order action</small>
                <h3 id="${e.escapeHtml(p)}-title">Production Action</h3>
              </div>
              <button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button>
            </header>
            <div class="production-action-dialog-body">
              ${g?i(a):'<p class="muted">No Production Action is assigned.</p>'}
              ${u?`
                <div class="button-row production-action-detail-actions">
                  ${g?o(a):""}
                </div>
                ${f(a)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function d(a){let u=e.canEditOperationalRecords()&&a.status!=="completed",g=e.hasProductionAction(a);if(!g&&!u)return"";let p=a.production_action_status==="completed",h=`production-action-dialog-${a.id}`,y=g?t(a):"Not assigned",b=g?`${y} - ${a.production_action}`:y,k=g?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${p?"is-completed":g?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${g?`<span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(b)}">${e.escapeHtml(b)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(a.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${k}" title="${k}">
            <span aria-hidden="true">${g?"...":"+"}</span>
          </button>
          ${l(a,u)}
        </section>
      `}function m(a){let u=e.canEditOperationalRecords()&&a.status!=="completed";return!e.hasProductionAction(a)&&!u?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(a)?i(a):'<p class="muted">No Production Action is assigned.</p>'}
          ${u?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(a)?o(a):""}
            </div>
            ${f(a)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:d,renderProductionActionDetail:m}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:c},typeof We<"u"&&We.exports&&(We.exports={createProductionActionDisplayHelpers:c})})()});var vn=Q((xr,mt)=>{(function(){function c(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(l=>String(l||"")),r=e.formatMessageTime||(l=>String(l||"")),s=Math.max(Number(e.visibleLimit)||12,1);function f(){return n().filter(l=>!l.read_at).length}function o(l){return n().some(d=>!d.read_at&&d.kind==="production_action_completed"&&d.work_order_id===l)}function i(){if(!e.getReady?.())return"";let l=n();if(!l.length)return"";let d=f(),m=l.slice(0,s);return`
        <details class="work-notification-panel" ${d?"open":""}>
          <summary>
            <span>Work notifications</span>
            <span>${d?`${d} new`:"Recent"}</span>
          </summary>
          <div class="work-notification-list">
            ${m.map(a=>`
              <button
                class="work-notification-item ${a.read_at?"read":"unread"}"
                data-open-work-notification="${t(a.id)}"
                data-work-order-id="${t(a.work_order_id)}"
                type="button"
              >
                <span class="work-notification-heading">
                  <span class="chip production-ready">Production Ready</span>
                  <time>${t(r(a.created_at))}</time>
                </span>
                <strong>${t(a.title)}</strong>
                <span>${t(a.body)}</span>
              </button>
            `).join("")}
          </div>
          ${l.length>s?`<p class="work-notification-limit">Showing the ${s} most recent notifications.</p>`:""}
        </details>
      `}return{hasUnreadProductionReady:o,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:f}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:c},typeof mt<"u"&&(mt.exports={createWorkOrderNotificationDisplayHelpers:c})})()});var kn=Q((Mr,xe)=>{(function(){function c({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:r,getPhotosByWorkOrder:s,teamMemberName:f}){function o(l){return`
        <article class="mini-work-order" data-mini-work-order="${l.id}">
          <strong>${e(l.title)}</strong>
          <span>${n(l.status)} - ${l.due_at||"no due date"}</span>
        </article>
      `}function i(l){let d=(r()[l.id]||[]).length,m=(s()[l.id]||[]).length,a=l.completed_at?new Date(l.completed_at).toLocaleDateString():"",u=l.completed_by?f(l.completed_by):"",g=!u&&l.assigned_to?f(l.assigned_to):"",p=u?` by ${e(u)}`:g?` - owner ${e(g)}`:"",h=l.resolution_summary||l.completion_notes||"";return`
        <article class="mini-work-order ${l.status==="completed"?"completed-history":""}" data-mini-work-order="${l.id}">
          <div class="chip-row">
            <span class="chip ${l.status}">${n(l.status)}</span>
            ${l.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${d?`<span class="relationship-chip parts">${t("parts")}<span>${d}</span></span>`:""}
            ${m?`<span class="relationship-chip photo">${t("photo")}<span>${m}</span></span>`:""}
          </div>
          <strong>${e(l.title)}</strong>
          <span>${a?`Completed ${a}${p}`:`Due ${l.due_at||"unset"}`}</span>
          ${l.failure_cause?`<p><b>Finding:</b> ${e(l.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:o,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:c},typeof xe<"u"&&xe.exports&&(xe.exports={createMiniWorkOrderDisplayHelpers:c})})()});var _n=Q((Tr,ft)=>{(function(){function c({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:r,getParts:s,getPartDocumentsByPartId:f,getPartDocumentsReady:o,getPendingDeletePartId:i,getShowPartSourceManager:l,getPartCostsReady:d,getPartInventoryFilter:m,getPartSearchQuery:a,partUsageRows:u,canDeleteParts:g,canEditOperationalRecords:p=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:b}){let k=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],A=k.reduce((w,[P,R])=>(w[P]=R.replace(/s$/,""),w),{});function $(w){return w.document_type?w.document_type:String(w.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(w.file_name||"")?"invoice":/receipt/i.test(w.file_name||"")?"receipt":/schematic|diagram/i.test(w.file_name||"")?"schematic":/print|drawing/i.test(w.file_name||"")?"part_print":/manual/i.test(w.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(w.file_name||"")?"spec_sheet":"other"}function E(){return k.map(([w,P])=>`
        <option value="${w}">${e(A[w]||P)}</option>
      `).join("")}function C(w){let P=$(w),R=String(w.content_type||"").startsWith("image/"),O=A[P]||"File",q=w.created_at?new Date(w.created_at).toLocaleString():"Uploaded",L=w.file_size_bytes?`${Math.round(Number(w.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${R?"image-file":""}">
          ${R&&w.signedUrl?`<a class="part-document-thumb" href="${e(w.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(w.signedUrl)}" alt="${e(w.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(O)}</span>
              ${L?`<span class="chip">${e(L)}</span>`:""}
            </div>
            <strong>${e(w.file_name)}</strong>
            <span>${e(q)}</span>
            ${w.original_file_name&&w.original_file_name!==w.file_name?`<small>Original: ${e(w.original_file_name)}</small>`:""}
            ${w.signedUrl?`<a href="${e(w.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function v([w,P],R){let O=R.filter(q=>$(q)===w);return O.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(P)}</h4>
            <span>${O.length}</span>
          </div>
          <div class="part-document-grid">
            ${O.map(C).join("")}
          </div>
        </section>
      `:""}function S(w){let P=w.reduce((O,q)=>{let L=$(q);return O[L]=(O[L]||0)+1,O},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(O=>P[O]).map(O=>`<span class="chip">${P[O]} ${e(A[O]||"file")}${P[O]===1?"":"s"}</span>`).join("")}function _(w){let P=Number(w.quantity_on_hand)||0,R=Number(w.reorder_point)||0,O=Number(w.unit_cost)||0,q=P<=R,L=Math.max(0,R-P);return`
        <article class="part-card part-tile ${q?"low-stock":""}" data-open-part="${w.id}" tabindex="0" role="button" aria-label="Open ${e(w.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${w.sku?`<span class="chip">${e(w.sku)}</span>`:""}
              ${w.supplier_name?`<span class="chip part-source-chip">${e(w.supplier_name)}</span>`:""}
              ${w.machine_note?`<span class="chip">${e(w.machine_note)}</span>`:""}
              ${q?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(w.name)}</h3>
            <div class="part-card-meta">
              <span>${P} on hand</span>
              <span>reorder at ${R}</span>
              <span>${d()?`${n(O)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${q&&R>0?`<small>Need ${L} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function T(){let w=s().filter(r),P=w.filter(t).length,R=m();return[["All Parts",w.length,"all"],["Low Stock",P,"low"]].map(([O,q,L])=>`
        <button class="parts-health ${L==="low"&&q?"attention":""} ${R===L?"active":""}" data-part-inventory-filter="${L}" type="button">
          <span>${O}</span>
          <strong>${q}</strong>
        </button>
      `).join("")}function N(w="default"){return`
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${e(a())}" placeholder="Search part name, SKU, source, count">
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
      `}function D(w){let P=Number(w.quantity_on_hand)||0,R=Number(w.reorder_point)||0,O=Number(w.unit_cost)||0,q=f()[w.id]||[],L=S(q),I=p();return`
        <section class="part-detail-shell">
          ${I?h():""}
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
              ${L?`<div class="chip-row part-file-summary">${L}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${I?`<div class="part-card-actions">
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

          ${I?`<form class="part-detail-form relationship-detail parts" data-edit-part="${w.id}">
            <label>Name<input name="name" required value="${e(w.name)}"></label>
            <label>SKU<input name="sku" value="${e(w.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e(w.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e(w.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${P}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${R}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${O}"></label>
            <p class="error-text" data-part-edit-error="${w.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${I&&l()?b():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${q.length} file${q.length===1?"":"s"}</span>
            </div>
            ${I?`<form class="part-document-form" data-part-document="${w.id}">
              <label>File type<select name="document_type">${E()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${w.id}">${o()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${o()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${q.length?k.map(z=>v(z,q)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${I?W(w):""}
        </section>
      `}function W(w){let P=u(w.id).length,R=f()[w.id]||[],O=i()===w.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${P?`This part has ${P} usage record${P===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${R.length?` and ${R.length} filed receipt/invoice record${R.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${P?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:O?`
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:_,renderPartsHealth:T,renderPartSearch:N,renderPartDetail:D,renderPartDangerZone:W}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:c},typeof ft<"u"&&(ft.exports={createPartsDisplayHelpers:c})})()});var Sn=Q((Dr,gt)=>{(function(){function c({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:r,getAppIssueReportsReady:s,getAppIssueReports:f}){function o(){let d=s();return`
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
            <p class="error-text" id="app-issue-report-error">${d?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${d?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function i(d){let m={open:0,reviewing:1,resolved:2};return[...d].sort((a,u)=>{let g=(m[a.status||"open"]??1)-(m[u.status||"open"]??1);return g||new Date(u.created_at||0)-new Date(a.created_at||0)})}function l(){if(!e())return"";let d=s(),m=f(),a=i(m);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${d?`${m.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${d?`
            <div class="issue-report-list">
              ${a.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:o,renderAppIssueReportsPanel:l,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:c},typeof gt<"u"&&(gt.exports={createAppIssuePanelDisplayHelpers:c})})()});var qn=Q((Ir,ht)=>{(function(){function c(e){let n=e.escapeHtml,t=e.getDueState,r=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,f=e.canEditOperationalRecords||(()=>!0);function o(){return e.getPreventiveSchedules().filter(m=>e.matchesActiveLocation(m)&&e.matchesSearch([m.title,m.frequency,m.next_due_at,m.assets?.name]))}function i(){return e.getProcedureTemplates().filter(m=>e.matchesSearch([m.name,m.description,...(m.procedure_steps||[]).map(a=>a.prompt)]))}function l(m){let a=t({due_at:m.next_due_at,status:"open"}),u=e.getPendingDeleteScheduleId()===m.id,g=f();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${n(m.frequency)}</span>
              ${a?`<span class="chip ${a.className}">${a.label}</span>`:""}
            </div>
            <h3>${n(m.title)}</h3>
            <p>${n(m.assets?.name||"No equipment")} - Next due ${m.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${m.id}" type="button">Generate Work</button>
            ${s()?u?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${n(m.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${n(m.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function d(m){let a=e.getWorkOrders().filter(y=>y.procedure_template_id===m.id).length,u=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===m.id).length,g=r({workOrders:a,schedules:u}),p=e.getPendingDeleteProcedureId()===m.id,h=f();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${m.procedure_steps?.length||0} steps</span>
              <span class="chip">${a} linked work orders</span>
              ${u?`<span class="chip">${u} PM schedules</span>`:""}
            </div>
            <h3>${n(m.name)}</h3>
            <p>${n(m.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(m.procedure_steps||[]).map(y=>`
              <div class="checklist-step">
                <span>${y.position}. ${n(y.prompt)}</span>
                <small>${n(y.response_type)} ${y.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${h?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${m.id}">
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
          </form>`:""}
          ${h&&s()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${g||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${n(m.id)}"></p>
              ${g?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:p?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${n(m.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${n(m.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${n(m.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:o,filteredProcedureTemplates:i,renderPreventiveSchedule:l,renderProcedureTemplate:d}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:c},typeof ht<"u"&&(ht.exports={createMaintenanceListDisplayHelpers:c})})()});var Cn=Q((Fr,yt)=>{(function(){function c(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:r,checklistProgress:s,requiredChecklistProgress:f,escapeHtml:o,cleanWorkOrderDescription:i,renderRelationshipChips:l,renderWorkOrderCommandSummary:d,renderWorkOrderRecommendation:m,statusLabel:a,normalizeWorkOrderType:u=R=>String(R||"corrective"),workOrderTypeLabel:g=R=>String(R||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),hasCompletedSafetyDeviceCheck:p,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:b,renderWorkOrderAssignmentField:k,requiresSafetyDeviceCheck:A,renderWorkOrderMessages:$,renderProcedureOptions:E,money:C,photoMetaText:v,renderActivityItem:S,canDeleteWorkOrders:_,canEditOperationalRecords:T=()=>!0,renderProductionActionDetail:N=()=>"",hasOpenProductionAction:D=()=>!1}=e;function W(R,O){let q=e.getStepResultsByWorkOrder()[R.id]?.[O.id],L=q?.value||"",I=`data-step-result="${O.id}" data-work-order-id="${R.id}"`,z=`<input ${I} value="${o(L)}" placeholder="Result">`;return O.response_type==="checkbox"&&(z=`<label class="check-row"><input ${I} type="checkbox" ${L==="checked"?"checked":""}> Done</label>`),O.response_type==="pass_fail"&&(z=`
          <select ${I}>
            <option value="">Not checked</option>
            <option value="pass" ${L==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${L==="fail"?"selected":""}>Fail</option>
          </select>
        `),O.response_type==="number"&&(z=`<input ${I} type="number" value="${o(L)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${O.position}. ${o(O.prompt)} ${O.required?'<small class="required-mark">Required</small>':""}</span>
          ${z}
          ${q?.completed_at?`<small>Recorded ${new Date(q.completed_at).toLocaleString()}</small>`:""}
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
              <p>You are about to permanently delete "${o(R.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${R.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${R.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function P(){let R=e.getActiveWorkOrderId(),q=e.getWorkOrders().find(F=>F.id===R);if(!q)return n();let L=e.getCommentsByWorkOrder(),I=e.getPhotosByWorkOrder(),z=e.getEventsByWorkOrder(),U=e.getPartsUsedByWorkOrder(),V=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),se=e.getWorkOrderActionWarning(),Z=e.getParts(),ae=e.getProfilesByUserId(),H=e.getCommentsError(),fe=e.STATUS_OPTIONS||[],le=e.TYPE_OPTIONS||[],M=L[q.id]||[],j=I[q.id]||[],G=z[q.id]||[],J=U[q.id]||[],X=J.reduce((F,pe)=>F+(Number(pe.quantity_used)||0)*t(pe),0),K=J.reduce((F,pe)=>F+(Number(pe.quantity_used)||0),0),Y=r(M,j,G,J),ne=V.find(F=>F.id===q.procedure_template_id),ee=ne?s(q,ne):null,de=ne?f(q,ne):null,oe=T();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${q.priority}">${q.priority}</span>
            <span class="chip">${o(g(q.type))}</span>
            <span class="chip ${q.status}">${a(q.status)}</span>
          </div>
          <h2>${o(q.title)}</h2>
          <p>${o(i(q.description)||"No description.")}</p>
          ${l(q)}
          ${q.completed_at?`<p class="completion-note">Completed ${new Date(q.completed_at).toLocaleString()} \xC2\xB7 ${q.actual_minutes||0} min</p>`:""}
          ${q.asset_id&&p(q)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${q.completion_notes?`<p>${o(q.completion_notes)}</p>`:""}
        </div>

        ${d(q)}
        ${m(q)}
        ${N(q)}

        ${q.completed_at&&(q.failure_cause||q.resolution_summary||q.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${q.failure_cause?`<article><span>Cause</span><strong>${o(q.failure_cause)}</strong></article>`:""}
            ${q.resolution_summary?`<article><span>Resolution</span><strong>${o(q.resolution_summary)}</strong></article>`:""}
            ${q.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${oe?`<label>Status
          <select id="status-select">
            ${fe.map(F=>`<option value="${F}" ${F===q.status?"selected":""} ${F==="completed"&&D(q)?"disabled":""}>${a(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${oe?`<div class="quick-actions detail-quick-actions">
          ${h(q)?`<button class="assign-action" data-assign-me="${q.id}" type="button">${q.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${fe.filter(F=>F!==q.status&&!(F==="completed"&&D(q))).map(F=>`
            <button data-quick-status="${F}" data-id="${q.id}" type="button">${a(F)}</button>
          `).join("")}
        </div>`:""}
        ${re===q.id&&se?`<p class="error-text action-warning">${o(se)}</p>`:""}

        ${oe?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${o(q.title)}"></label>
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
                    ${y(q.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${o(b(q.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${o(q.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${o(q.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${fe.map(F=>`<option value="${F}" ${F===q.status?"selected":""} ${F==="completed"&&D(q)?"disabled":""}>${a(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===q.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${k(q,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${E(q.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${q.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${A(q)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${q.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
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
            <button class="secondary-button" data-copy-downtime="subject" data-id="${q.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${q.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${$(q)}

        ${oe?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${o(q.title)}"></label>
          <label>Description<textarea name="description" rows="3">${o(i(q.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${o(q.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===q.priority?"selected":""}>${F}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${le.map(F=>`<option value="${F}" ${F===u(q.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${k(q)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${E(q.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${o(q.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${o(q.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${q.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${A(q)?`
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${q.safety_devices_checked?"checked":""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          `:""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${q.actual_minutes||0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>`:""}

        ${ne?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${o(ne.name)}</h3>
              <span>${ee.done} of ${ee.total} complete \xC2\xB7 required ${de.done}/${de.total}</span>
            </div>
            <div class="checklist-list">
              ${ne.procedure_steps.map(F=>oe?W(q,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${o(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${o(e.getStepResultsByWorkOrder()[q.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${oe&&q.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${de?.total?`<p class="${de.done===de.total?"completion-note":"warning-text"}">Required checklist: ${de.done}/${de.total}</p>`:""}
            ${D(q)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${q.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${A(q)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${p(q)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${D(q)?"disabled":""}>Complete Work Order</button>
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
              ${Z.map(F=>`<option value="${F.id}">${o(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${J.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${C(X)}</span></article>`:""}
          ${J.map(F=>`
            <article class="relationship-detail parts">
              <strong>${o(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${C((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${o(ae[F.created_by]?.full_name||"Team member")}</small>
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
            ${j.map(F=>`
              <article class="relationship-detail photo">
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${o(F.signedUrl)}" alt="${o(F.file_name)}">`:""}
                <strong>${o(F.file_name)}</strong>
                <span>${v(F)}</span>
                ${F.signedUrl?`<a href="${o(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${oe?`<button class="text-button danger-link" data-delete-work-order-photo="${o(F.id||"")}" data-work-order-photo-path="${o(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
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
          ${M.map(F=>`
            <article class="relationship-detail comment">
              <strong>${o(ae[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${o(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${H?`<p class="error-text">${o(H)}</p>`:""}
          ${Y.map(S).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${oe&&_()?w(q):""}
      </div>
    `}return{renderWorkOrderDetail:P}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:c},typeof yt<"u"&&(yt.exports={createWorkOrderDetailDisplayHelpers:c})})()});var $n=Q((Lr,bt)=>{(function(){function c(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:c},typeof bt<"u"&&(bt.exports={createEquipmentStructureGuideDisplayHelpers:c})})()});var Pn=Q((Nr,wt)=>{(function(){function c(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:r,escapeHtml:s,assetTypeLabel:f,renderParentAssetOptions:o,renderLocationOptions:i,renderAssetAreaOptions:l,assetStatusLabel:d,renderAssetMiniWorkOrder:m,assetDeleteBlockerMessage:a,canDeleteEquipment:u,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:p,renderProcedureOptions:h}=e;function y(){let v=new Date;return new Date(v.getTime()-v.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function b(v,S,_){let T=S.some(w=>w.event_type==="created"),N=v.created_at&&!T?[{id:`${v.id}-created`,event_type:"created",summary:`${f(v.asset_type)} created.`,actor_id:v.created_by||"",created_at:v.created_at}]:[];return{equipmentHistory:[...S,...N].sort((w,P)=>new Date(P.created_at||0)-new Date(w.created_at||0)),historyActorLabel:w=>w.actor_id&&_[w.actor_id]?.full_name?_[w.actor_id].full_name:w.actor_id?`User ${String(w.actor_id).slice(0,8)}`:w.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function k(v,S){return v.map(_=>`
        <article>
          <strong>${s(String(_.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${_.created_at?new Date(_.created_at).toLocaleString():"time unavailable"} &middot; ${s(S(_))}</span>
          <p>${s(_.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function A(){let v=e.getAssets(),S=e.getActiveAssetId(),_=v.find(z=>z.id===S);if(!_)return n();let T=e.getAssetEventsReady?.()!==!1,N=e.getProfilesByUserId?.()||{},D=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((z,U)=>new Date(U.created_at||0)-new Date(z.created_at||0)),{equipmentHistory:W,historyActorLabel:w}=b(_,D,N),P=e.LIST_ITEMS_PER_PAGE||12,R=Math.max(1,Math.ceil(W.length/P)),O=Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,"asset-history")||1),R),q=W.length?(O-1)*P+1:0,L=Math.min(W.length,O*P),I=W.slice((O-1)*P,O*P);return`
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
              ${T?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${k(I,w)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${W.length>P?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(_.id)}" type="button" ${O<=1?"disabled":""}>Previous</button>
                <span>Showing ${q}-${L} of ${W.length} - Page ${O} of ${R}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(_.id)}" type="button" ${O>=R?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function $(){let v=e.getAssets(),S=e.getActiveAssetId(),_=v.find(x=>x.id===S);if(!_)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(_.id);let T=e.getWorkOrders(),N=e.getPreventiveSchedules(),D=e.getParts(),W=e.getAssetParts(),w=e.getAssetPartsReady(),P=e.getAssetDocumentsByAssetId?.()[_.id]||[],R=e.getAssetDocumentsReady?.()!==!1,O=e.getAssetEventsReady?.()!==!1,q=e.getProfilesByUserId?.()||{},L=e.getPartsUsedByWorkOrder(),I=e.getLocations(),z=e.getActiveLocationId(),U=e.ASSET_TYPE_OPTIONS||[],V=t(_),re=r(_.id),se=T.filter(x=>x.asset_id===_.id),Z=se.filter(x=>x.status!=="completed").sort((x,ie)=>new Date(ie.created_at||0)-new Date(x.created_at||0)),ae=se.filter(x=>x.status==="completed").sort((x,ie)=>new Date(ie.completed_at||ie.created_at||0)-new Date(x.completed_at||x.created_at||0)),H=N.filter(x=>x.asset_id===_.id),fe=Object.values(L).flat().filter(x=>se.some(ie=>ie.id===x.work_order_id)),le=W.filter(x=>x.asset_id===_.id),M=new Set(le.map(x=>x.part_id)),j=D.filter(x=>!M.has(x.id)),G=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((x,ie)=>new Date(ie.created_at||0)-new Date(x.created_at||0)),{equipmentHistory:J}=b(_,G,q),X=e.LIST_ITEMS_PER_PAGE||12,K=x=>e.getAssetRelationshipOpen?.(_.id,x)||!1,Y=(x,ie)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,x)||1),Math.max(1,Math.ceil(ie/X))),ne=(x,ie)=>{let te=Y(ie,x.length);return x.slice((te-1)*X,te*X)},ee=(x,ie)=>{if(ie<=X)return"";let te=Y(x,ie),ge=Math.max(1,Math.ceil(ie/X)),ye=(te-1)*X+1,ce=Math.min(ie,te*X);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${te<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${ce} of ${ie} - Page ${te} of ${ge}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${te>=ge?"disabled":""}>Next</button>
          </div>
        `},de=x=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(x)}" data-asset-id="${s(_.id)}" ${K(x)?"open":""}`,oe=I.find(x=>x.id===_.location_id)?.name||_.location||"No location set",F=V?V.name:"Top level equipment",pe=_.status==="offline"?"status-blocked":_.status==="degraded"?"status-open":_.status==="watch"?"status-in_progress":"status-completed",he=_.status==="degraded"&&Z.length===0,ue=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${_.status}">${s(d(_.status))}</span>
              <span class="chip">${s(f(_.asset_type))}</span>
              ${_.asset_code?`<span class="chip">${s(_.asset_code)}</span>`:""}
              ${_.manufacturer?`<span class="chip">${s(_.manufacturer)}</span>`:""}
              ${_.model?`<span class="chip">${s(_.model)}</span>`:""}
              ${_.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(_.name)}</h2>
            <p>${s(_.location||"No location set")}</p>
            ${V?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(V.id)}" type="button">${s(V.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${pe}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(d(_.status))}</strong>
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
              <small>${V?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${re.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${re.length}</strong>
              <small>${re.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${le.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${le.length}</strong>
              <small>${le.length?"Recommended/common parts linked":"No linked parts yet"}</small>
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

          ${he&&ue?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${s(_.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${p?p():""}

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
                      ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${s(x.signedUrl)}" alt="${s(x.original_file_name||x.file_name||_.name)}">`:`<strong>${s(C(x.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(C(x.document_type))}</strong>
                      <span>${s(x.original_file_name||x.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${s(x.signedUrl)}" alt="${s(x.original_file_name||x.file_name||_.name)}">`:`<div class="asset-file-document-preview">${s(C(x.document_type))}</div>`}
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
                ${U.map(x=>`<option value="${x}" ${x===(_.asset_type||"machine")?"selected":""}>${f(x)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${o(_.parent_asset_id||"",_.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${I.length?"":"disabled"}>
                ${i(_.location_id||z)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${l(_.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(x=>`<option value="${x}" ${x===_.status?"selected":""}>${d(x)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${_.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${re.map(x=>`
                <article class="mini-work-order" data-open-asset="${s(x.id)}">
                  <strong>${s(x.name)}</strong>
                  <span>${s(f(x.asset_type))} - ${s(d(x.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${de("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${Z.length}</span></summary>
            <div class="mini-list">
              ${K("open-work")?ne(Z,"open-work").map(m).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${K("open-work")?ee("open-work",Z.length):""}
          </details>

          <details ${de("completed-history")}>
            <summary>Completed History <span>${ae.length}</span></summary>
            <div class="mini-list">
              ${K("completed-history")?ne(ae,"completed-history").map(m).join("")||'<p class="muted">No completed work yet.</p>':'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${K("completed-history")?ee("completed-history",ae.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${J.length} event${J.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(_.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${O?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
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

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(_.id)}" ${K("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${le.length}</span></summary>
            <div class="panel-header compact">
              ${ue?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${K("linked-parts")&&w?`
              ${ue?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(_.id)}">
                <label>Part
                  <select name="part_id" ${j.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${j.map(x=>`<option value="${s(x.id)}">${s(x.name)}${x.sku?` - ${s(x.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${j.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${s(_.id)}"></p>
              <div class="mini-list">
                ${ne(le,"linked-parts").map(x=>`<article>
                  <strong>${s(x.parts?.name||"Part")}</strong>
                  <span>${s(x.parts?.sku||"No SKU")} - recommended qty ${s(x.quantity_recommended||1)}${x.note?` - ${s(x.note)}`:""}</span>
                  ${ue?`<button class="text-button danger-link" data-remove-asset-part="${s(x.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${ee("linked-parts",le.length)}
            `:w?'<p class="muted">Open this section to review or attach linked parts for this equipment.</p>':'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(_.id)}" ${K("parts-used")?"open":""}>
            <summary>Parts Used History <span>${fe.length}</span></summary>
            <div class="mini-list">
              ${K("parts-used")?ne(fe,"parts-used").map(x=>`<article><strong>${s(x.parts?.name||"Part")}</strong><span>${x.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${K("parts-used")?ee("parts-used",fe.length):""}
          </details>

          ${ue?E(_):""}
        </div>
      `}function E(v){let S=e.getWorkOrders(),_=e.getPreventiveSchedules(),T=e.getAssets(),N=e.getActiveAssetId(),D=S.filter(q=>q.asset_id===v.id).length,W=_.filter(q=>q.asset_id===v.id).length,w=T.filter(q=>q.parent_asset_id===v.id).length,P=e.getMaintenanceRequests().filter(q=>q.asset_id===v.id).length,R=a({workOrders:D,children:w,schedules:W,requests:P}),O=e.getPendingDeleteAssetId()===N;return u()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${R||`This permanently removes "${s(v.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${R?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:O?`
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
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function C(v){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[v]||"File"}return{renderAssetDetail:$,renderAssetHistoryScreen:A}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:c},typeof wt<"u"&&(wt.exports={createAssetDetailDisplayHelpers:c})})()});var An=Q((Ur,vt)=>{(function(){function c(e={}){let{filteredMessageThreads:n,totalUnreadMessages:t,teamMemberName:r,escapeHtml:s,messageComposerScopeNote:f,recentMessageLinkWorkOrders:o,statusLabel:i,renderMessageThreadButton:l,messageThreadScopeLabel:d,renderMessageList:m,renderWorkOrderNotifications:a=()=>""}=e,u=e.canEditOperationalRecords||(()=>!0);function g(h){let y=String(h||"?").trim().split(/\s+/).filter(Boolean);return(y.length?y.map(b=>b[0]).join(""):"?").slice(0,2).toUpperCase()}function p(){if(!e.getMessagesReady())return'<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>';let y=e.getMessageThreads(),b=e.getActiveMessageThreadId(),k=e.getMessagesByThreadId(),A=e.getWorkOrders(),$=e.getMessageComposerWorkOrderId(),E=e.getMessageComposerOpen(),C=e.getCompanyMembers(),v=e.getSession(),S=e.getMessageWorkOrderLinksReady(),_=e.getMessageSearchQuery(),T=e.getMessageThreadFilter(),N=C.filter(U=>U.user_id!==v.user.id),D=u(),W=y.find(U=>U.id===b)||y[0],w=W?k[W.id]||[]:[],P=n(),R=e.getMessageThreadsPage(),O=Math.max(1,Math.ceil(P.length/e.LIST_ITEMS_PER_PAGE)),q=Math.min(Math.max(R,1),O),L=P.slice((q-1)*e.LIST_ITEMS_PER_PAGE,q*e.LIST_ITEMS_PER_PAGE),I=A.find(U=>U.id===$),z=U=>{let V=r(U.user_id);return`
          <button class="message-person-card" data-message-person="${s(U.user_id)}" title="Message ${s(V)}" type="button">
            <span class="message-person-avatar" aria-hidden="true">${s(g(V))}</span>
            <span class="message-person-name">${s(V)}</span>
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
              ${a()}
              <div class="message-people-strip" aria-label="Company message contacts">
                ${N.map(z).join("")||'<span class="muted">No teammates added yet.</span>'}
              </div>
              ${D?`<form class="message-thread-form" id="message-thread-form">
                <details ${E||I?"open":""}>
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
                        ${C.filter(U=>U.user_id!==v.user.id).map(U=>`<option value="${U.user_id}">${s(r(U.user_id))}</option>`).join("")||'<option value="">No teammates yet</option>'}
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
                        <select name="work_order_id" ${S?"":"disabled"}>
                          <option value="">No work order</option>
                          ${o().map(U=>`<option value="${U.id}">${s(U.title)} - ${i(U.status)}</option>`).join("")}
                        </select>
                      </label>
                    `}
                    <label>Message<textarea name="body" rows="3" required placeholder="Type the first message..."></textarea></label>
                    <p class="error-text" id="message-thread-error">${S?"":"Run supabase/step-next-message-work-order-links.sql before linking threads to work orders."}</p>
                    <button class="secondary-button message-action-button" type="submit">Start Thread</button>
                  </div>
                </details>
              </form>`:""}
              <label class="message-search">
                <input id="message-search" type="search" value="${s(_)}" placeholder="Search messages">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[["all","All"],["unread","Unread"],["company","Company"],["location","Location"],["direct","Direct"]].map(([U,V])=>`<button class="${T===U?"active":""}" data-message-filter="${U}" type="button">${V}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${L.map(l).join("")||'<p class="muted">No threads match this filter.</p>'}
              </div>
              ${e.renderListPagination("messages",P.length,q,O)}
            </aside>
            <section class="message-thread-detail">
              ${W?`
                <div class="message-chat-header">
                  <div>
                    <h3>${s(W.title)}</h3>
                    <p class="muted">${d(W)}</p>
                  </div>
                  <div class="message-header-actions">
                    ${W.work_order_id?`<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${W.work_order_id}" type="button">Open Work Order</button>`:""}
                    <span class="chip comment">${w.length} message${w.length===1?"":"s"}</span>
                    ${D?`<button class="text-button danger-link" data-delete-message-thread="${s(W.id)}" type="button">Delete Thread</button>`:""}
                  </div>
                </div>
                <div class="message-list">
                  ${m(w)}
                </div>
                ${D?`<form class="message-reply-form" id="message-reply-form" data-thread-id="${W.id}">
                  <div class="message-quick-replies">
                    ${["On it","Need more info","Waiting on parts","Complete"].map(U=>`<button data-quick-reply="${s(U)}" type="button">${s(U)}</button>`).join("")}
                  </div>
                  <textarea name="body" rows="2" required placeholder="Reply to this thread..."></textarea>
                  <p class="error-text" id="message-reply-error"></p>
                  <button class="secondary-button message-action-button" type="submit">Send Reply</button>
                </form>`:""}
              `:'<p class="muted">Choose or start a thread.</p>'}
            </section>
          </div>
        </section>
      `}return{renderMessageCenter:p}}window.MaintainOpsMessageCenterDisplay={createMessageCenterDisplayHelpers:c},typeof vt<"u"&&(vt.exports={createMessageCenterDisplayHelpers:c})})()});var Rn=Q((Qr,kt)=>{(function(){function c(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:r,statusLabel:s,workOrderTypeLabel:f=a=>String(a||"corrective").replace(/\b\w/g,u=>u.toUpperCase()),renderAssignmentSelect:o,renderProcedureOptions:i,escapeHtml:l}=e;function d(){let a=new Date;return new Date(a.getTime()-a.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function m(){let a=e.getParts();return`
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
                  ${n.map(u=>`<option value="${u}" ${u==="open"?"selected":""}>${s(u)}</option>`).join("")}
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
                  ${t.map(u=>`<option value="${u}">${f(u)}</option>`).join("")}
                </select>
              </label>
              <label>Complete by / due date
                <span class="date-picker-row" data-date-picker-field>
                  <input name="due_at" type="date" value="${d()}">
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
                  ${o("",{selfLabel:"Assign to me"})}
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
                  ${a.map(u=>`<option value="${u.id}">${l(u.name)} (${u.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:m}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:c},typeof kt<"u"&&(kt.exports={createCreateWorkOrderDisplayHelpers:c})})()});var En=Q((Br,_t)=>{(function(){function c(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:r,escapeHtml:s,renderAssignmentSelect:f,renderProcedureOptions:o,assetStatusLabel:i,workOrderTypeLabel:l=a=>String(a||"corrective").replace(/\b\w/g,u=>u.toUpperCase())}=e;function d(){let a=new Date;return new Date(a.getTime()-a.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function m(){let a=e.getQuickFixAssetId(),u=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),p=e.getSession(),h=e.getParts(),y=a||"",b=g.find(k=>k.id===u);return`
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
              <input name="due_at" type="date" value="${d()}">
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
                  ${n.map(k=>`<option value="${k}" ${k==="corrective"?"selected":""}>${l(k)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${f(p.user.id,{selfLabel:"Assign to me"})}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${o()}
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
      `}return{renderQuickFixForm:m}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:c},typeof _t<"u"&&(_t.exports={createQuickFixDisplayHelpers:c})})()});var On=Q((jr,St)=>{(function(){function c(e={}){let n=e.escapeHtml;function t(m){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${n(m)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `}function r(m){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${n(m)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `}function s(m,a=""){let u=m==="signup";return`
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${u?"Create Account":"Welcome Back"}</h1>
                <p>${u?"Start with email and password.":"Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${u?'<label>Full name<input name="fullName" required autocomplete="name"></label>':""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${u?"new-password":"current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${n(a)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${u?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${u?"I already have an account":"Create an account"}</button>
            ${u?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function f(m){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${n(m)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `}function o(m){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${n(m)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `}function i(m="",a=""){return`
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
            <p class="error-text" id="auth-error">${n(m)}</p>
            <p class="muted auth-status" id="auth-status">${n(a)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function l(m={}){let a=!!m.ready,u=m.initialError||"";return`
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
              <label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password" ${a?"":"disabled"}></label>
              <label>Confirm password<input name="confirmPassword" type="password" minlength="6" required autocomplete="new-password" ${a?"":"disabled"}></label>
            </div>
            <p class="error-text" id="auth-error">${n(u)}</p>
            <p class="muted auth-status" id="auth-status">${a?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${a?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function d(m=""){return`
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
            <p class="error-text" id="company-error">${n(m)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `}return{workspaceLoading:t,workspaceLoadError:r,authForm:s,authCallback:f,authCallbackError:o,passwordResetRequest:i,passwordRecovery:l,companyCreate:d}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:c},typeof St<"u"&&(St.exports={createAuthDisplayHelpers:c})})()});var Wn=Q((zr,qt)=>{(function(){function c(e={}){let n=e.escapeHtml,t=e.qrSvgFor,r=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),f=e.getPublicRequestLinksReady||(()=>!0),o=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),l=e.canManageTeam||(()=>!1),d=e.canAdministerPublicRequestLinks||(()=>!1),m=e.publicAppBaseUrl,a=e.publicRequestUrl,u=e.publicRequestQrUrl;function g(){return`
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
      `}function p(E,C){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(E.location_name)}</h1>
                <p>${n(E.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${t(C,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${n(C)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${n(C)}" target="_blank" rel="noreferrer">Test Form</a>
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
      `}function y(E){return`
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(E.company_name)}</h1>
                <p>${n(E.location_name)} maintenance request</p>
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
      `}function b(E){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${n(E)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function k(E,C=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(E.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${C?`<p class="error-text">${n(C)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function A(){if(!l())return"";let E=m(),C=r(),v=f();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${n(o()||String(i()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${E?`<p class="muted">QR codes will point to ${n(E)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${v?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${C.map($).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function $(E){let C=s().find(D=>D.location_id===E.id),v=!!(C&&C.is_active!==!1),S=d(),_=v?a(C.token):"",T=v?u(C.token):"",N=!!(_&&T);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(E.name)}</strong>
            <span>${v?"External request link active":C?"Request link disabled":"No request link yet"}</span>
            ${C?.last_used_at?`<span>Last used ${new Date(C.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${v?`
            <div class="qr-preview">${N?t(_):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(T||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${N?"":"disabled-link"}" href="${n(T||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(T)}" type="button" ${N?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${N?"":"disabled-link"}" href="${n(_||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${S?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(C.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(C.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:C?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${S?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(C.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(C.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(E.id)}" type="button" ${f()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:p,loadingRequestForm:h,publicRequestForm:y,publicRequestError:b,publicRequestSuccess:k,publicRequestLinkManager:A,publicRequestLocationCard:$}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:c},typeof qt<"u"&&(qt.exports={createPublicRequestDisplayHelpers:c})})()});(function(c){function e(l){return String(l||"").replace(/\/+$/,"")}function n(l=c.location,d=c.PUBLIC_APP_URL){if(d)return`${e(d)}/`;let m=l?.origin||"",a=l?.pathname||"/",g=a.indexOf("/auth/callback");if(g>=0)return`${m}${a.slice(0,g+1)}`;let p=a.endsWith("/")?a:a.replace(/[^/]*$/,"");return`${m}${p||"/"}`}function t(l=c.location,d=c.PUBLIC_APP_URL){return`${n(l,d)}auth/callback/`}function r(l={},d=c.location,m=c.PUBLIC_APP_URL){let a=new URL(n(d,m));return Object.entries(l).forEach(([u,g])=>{g!=null&&g!==""&&a.searchParams.set(u,g)}),a.href}function s(l){let d=new URL(l),m=new URLSearchParams(d.hash.replace(/^#/,"")),a=d.searchParams;return{code:a.get("code")||"",type:m.get("type")||a.get("type")||"",accessToken:m.get("access_token")||a.get("access_token")||"",refreshToken:m.get("refresh_token")||a.get("refresh_token")||"",error:m.get("error")||a.get("error")||"",errorCode:m.get("error_code")||a.get("error_code")||"",errorDescription:m.get("error_description")||a.get("error_description")||""}}function f(l){return!!(l?.code||l?.accessToken&&l?.refreshToken||l?.error||l?.errorDescription)}function o(l){return l?.type==="recovery"||!l?.type&&!!(l?.accessToken&&l?.refreshToken)}function i(l=c.location){let d=new URL(l.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(m=>d.searchParams.delete(m)),d.hash="",d.href}c.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:r,authParamsFromHref:s,isAuthCallbackParams:f,isPasswordRecoveryParams:o,cleanAuthUrl:i}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:c})})();(function(){function c(v){return String(v||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(v){return v.toISOString().slice(0,10)}function n(v){return v.toISOString()}function t(v){let S=new Date;return S.setDate(S.getDate()-v),S}function r(){let v=new Date;return new Date(v.getFullYear(),v.getMonth(),1)}function s(v=new Date){let S=new Date(v);S.setHours(0,0,0,0),S.setDate(S.getDate()-S.getDay());let _=new Date(S);return _.setDate(_.getDate()+7),{start:S,end:_}}function f(v,S){let _=[];for(let T=0;T<v.length;T+=S)_.push(v.slice(T,T+S));return _}function o(v){return i(v).replace(/\.[^/.]+$/,"")||"photo"}function i(v){return String(v||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function l(v){return v==="active"||v==="all"?"Active":v==="overdue"?"Overdue":v==="completed"?"All Completed":v==="completed_month"?"Completed Month":v==="completed_week"?"Done This Week":v==="open"?"New":String(v||"").replaceAll("_"," ").replace(/\b\w/g,S=>S.toUpperCase())}function d(v){let S=String(v||"corrective").trim().toLowerCase();return S==="inspection"?"preventive":S==="reactive"||S==="request"?"corrective":["corrective","preventive","fabrication"].includes(S)?S:"corrective"}function m(v){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[d(v)]}function a(v){let S=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],_=String(v||"technician").trim().toLowerCase();return _==="member"?"technician":S.includes(_)?_:"technician"}function u(v){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[a(v)]||"Technician"}function g(v){let S={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return S[a(v)]||S.technician}function p(v){return new Date(`${v}T00:00:00`).toLocaleDateString()}function h(v){let S=[new Date(v.created_at).toLocaleString()];return v.file_size_bytes&&S.push(b(v.file_size_bytes)),v.original_size_bytes&&v.file_size_bytes&&v.original_size_bytes!==v.file_size_bytes&&S.push(`optimized from ${b(v.original_size_bytes)}`),S.join(" - ")}function y(v){let S=[];return(v.photo_uploaded_at||v.updated_at||v.created_at)&&S.push(new Date(v.photo_uploaded_at||v.updated_at||v.created_at).toLocaleString()),v.photo_file_size_bytes&&S.push(b(v.photo_file_size_bytes)),v.photo_original_size_bytes&&v.photo_file_size_bytes&&v.photo_original_size_bytes!==v.photo_file_size_bytes&&S.push(`optimized from ${b(v.photo_original_size_bytes)}`),S.join(" - ")||"Photo attached"}function b(v){let S=Number(v)||0;return S?S<1024?`${S} B`:S<1048576?`${Math.round(S/1024)} KB`:`${(S/1048576).toFixed(S>=10485760?0:1)} MB`:""}function k(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(v)||0)}function A(v){return Number(v.unit_cost_at_use??v.parts?.unit_cost??0)||0}function $(v){if(!v.due_at||v.status==="completed")return null;let S=new Date;S.setHours(0,0,0,0);let _=new Date(`${v.due_at}T00:00:00`),T=Math.round((_-S)/864e5);return T<0?{label:"overdue",className:"overdue"}:T===0?{label:"due today",className:"due_today"}:null}function E(){let v=new Date;return v.setHours(0,0,0,0),v}function C(v){return`"${String(v??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:c,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:r,sundayWeekRange:s,chunkArray:f,fileBaseName:o,safeFileName:i,statusLabel:l,normalizeWorkOrderType:d,workOrderTypeLabel:m,normalizeRole:a,roleLabel:u,roleDescription:g,formatDate:p,photoMetaText:h,requestPhotoMetaText:y,formatBytes:b,money:k,partUsageUnitCost:A,getDueState:$,startOfToday:E,csvCell:C})})();(function(){function c(s,f){let o=s?.message||"";return f.some(i=>o.includes(i))}function e(s,f){let o=s?.message||"";return o.includes(f)&&(o.includes("column")||o.includes("schema cache"))}function n(s){let f=s?.message||"";return f.includes("work_order_comments_company_author_profile_fkey")||f.includes("profiles")}function t(s){let f=s?.message||"";return!!(f.includes("procedure_template_id")||f.includes("procedure_templates")||f.includes("procedure_steps"))}function r(s){return c(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:c,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:r}})();(function(){function c(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:c}})();(function(){function c(e,n,t=2e4){let r,s=new Promise((f,o)=>{r=setTimeout(()=>o(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(r))}window.MaintainOpsOperationTimeout={withOperationTimeout:c}})();var Xr=B($t()),ea=B(Pt());(function(){function c(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function r(m){return f(`?request=${encodeURIComponent(m)}`)}function s(m){return f(`?qr=${encodeURIComponent(m)}`)}function f(m){let a=o();if(!a)return"";let u=new URL(a);return u.search=m,u.hash="",u.toString()}function o(){let a=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return a?i(a):""}function i(m){try{let a=new URL(String(m||"").trim(),n.location.href);return a.protocol!=="https:"||!l(a.hostname)?"":(a.search="",a.hash="",a.pathname&&a.pathname!=="/"&&!a.pathname.endsWith("/")&&!a.pathname.endsWith(".html")&&(a.pathname=`${a.pathname}/`),a.toString())}catch{return""}}function l(m){let a=String(m||"").toLowerCase();return!(!a||a==="localhost"||a.endsWith(".localhost")||a==="127.0.0.1"||a==="::1"||a==="[::1]"||/^10\./.test(a)||/^192\.168\./.test(a)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(a))}function d(m,a=4){if(!n.qrcode||!m)return'<div class="qr-fallback">QR</div>';try{let u=n.qrcode(0,"M");return u.addData(m),u.make(),u.createSvgTag(a,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:r,publicRequestQrUrl:s,publicAppUrlWithSearch:f,publicAppBaseUrl:o,normalizePublicAppUrl:i,isPublicAppHost:l,qrSvgFor:d}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),r=n.querySelector("#print-public-qr");!r||typeof t!="function"||r.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:c}})();(function(){function c(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:c}})();var aa=B(At()),oa=B(Rt());(function(){function c(e){function n(l){return e[l]()}function t(l,d){return typeof e[l]=="function"?e[l]():d}function r(l){let d=n("searchQuery"),m=n("activeSection"),a=n("activeStatusFilter"),u=!!d.trim();return i(s(l,{statusFilter:u?"__any__":m==="work"&&a==="requests"?"__none__":a,section:m,includeQueue:!u,includeSearch:!0}))}function s(l,d={}){let m=d.section||n("activeSection"),a=l.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(a=a.eq("location_id",n("activeLocationId"))),d.includeQueue!==!1&&(a=f(a,m)),d.includeAttributeFilters!==!1&&m==="work"){let u=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");u!=="all"&&(a=a.eq("type",u)),g!=="all"&&(a=a.eq("priority",g))}if(a=o(a,d.statusFilter||n("activeStatusFilter")),d.includeSearch!==!1){let u=e.postgrestSearchTerm(n("searchQuery"));if(u){let g=n("workOrderRelatedSearch"),p=[`title.ilike.%${u}%`,`description.ilike.%${u}%`,`production_action.ilike.%${u}%`,`priority.ilike.%${u}%`,`type.ilike.%${u}%`,`status.ilike.%${u}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];a=a.or(p.join(","))}}return a}function f(l,d){if(d==="mywork"){let m=n("session").user.id;return n("myWorkFilter")==="created"?l.eq("created_by",m):l.or(`assigned_to.eq.${m},and(production_action_assigned_to.eq.${m},production_action_status.eq.open)`)}if(d!=="work")return l;if(n("workOrderAssigneeFilter")){let m=n("workOrderAssigneeFilter");return l.or(`assigned_to.eq.${m},and(production_action_assigned_to.eq.${m},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?l.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?l.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?l.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):l}function o(l,d){let m=e.isoDate(e.startOfToday());if(d==="__any__")return l;if(d==="__none__")return l.eq("id","00000000-0000-0000-0000-000000000000");if(d==="overdue")return l.neq("status","completed").lt("due_at",m);if(d==="completed_month")return l.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(d==="completed_week"){let a=e.sundayWeekRange();return l.gte("completed_at",e.isoDateTime(a.start)).lt("completed_at",e.isoDateTime(a.end))}return d==="active"||d==="all"?l.neq("status","completed"):l.eq("status",d)}function i(l){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?l.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?l.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?l.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?l.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?l.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):l.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:r,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:f,applyWorkOrderStatusFilter:o,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(r=>{r.addEventListener("click",()=>{let s=n.querySelector(`#${r.dataset.jumpWorkSection}`);if(!s)return;let f=s.closest("details");f&&(f.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let o=s;o.classList.add("jump-highlight","field-jump-highlight"),t(()=>o.classList.remove("jump-highlight"),1400),t(()=>o.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.renderWorkspace,f=e.setWorkOrderSearchMode;if(!r||!s||!f)return;let o=()=>{r.setSearchQuery(""),f(!1),t.setItem("maintainops.searchQuery","")},i=l=>{r.setActiveSection(l),t.setItem("maintainops.activeSection",l)};n.querySelectorAll("[data-search-work-order]").forEach(l=>{l.addEventListener("click",()=>{r.setActiveWorkOrderId(l.dataset.searchWorkOrder),r.setActiveAssetId(null),r.setActivePartId(null),i("work"),o(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(l=>{l.addEventListener("click",()=>{r.setActiveAssetId(l.dataset.searchAsset),r.setActiveWorkOrderId(null),r.setActivePartId(null),i("assets"),o(),s()})}),n.querySelectorAll("[data-search-part]").forEach(l=>{l.addEventListener("click",()=>{r.setActivePartId(l.dataset.searchPart),r.setActiveAssetId(null),r.setActiveWorkOrderId(null),i("parts"),o(),s()})}),n.querySelectorAll("[data-search-request]").forEach(l=>{l.addEventListener("click",()=>{i("requests"),o(),s()})}),n.querySelectorAll("[data-search-section]").forEach(l=>{l.addEventListener("click",()=>{i(l.dataset.searchSection),o(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:c}})();(function(){let c=null,e=0,n=Promise.resolve();function t(r={}){let s=r.documentRef||document,f=r.storage||localStorage,o=r.state,i=r.windowRef||(typeof window<"u"?window:null),l=r.setTimeoutRef||setTimeout,d=r.clearTimeoutRef||clearTimeout,m=Number.isFinite(r.searchDelayMs)?r.searchDelayMs:300;if(!o)return;let a=()=>{e+=1,c!==null&&(d(c),c=null)},u=p=>{p&&typeof i?.scrollTo=="function"&&i.scrollTo(p.x,p.y)},g=(p,h,y,b)=>{let k=s.getElementById?s.getElementById(p):s.querySelector(`#${p}`);if(!k)return;let A=k.value.length,$=Math.min(h??A,A),E=Math.min(y??$,A);k.focus({preventScroll:!0}),k.setSelectionRange($,E),u(b)};s.querySelectorAll(".workspace-search-input").forEach(p=>{p.addEventListener("input",()=>{let h=p.id,y=p.selectionStart,b=p.selectionEnd;a();let k=e;o.setSearchQuery(p.value),r.invalidateExactWorkOrderSearchCache(),o.getSearchQuery().trim()||r.setWorkOrderSearchMode(!1),o.getSearchQuery().trim()&&(o.setActiveWorkOrderId(null),o.setActiveAssetId(null),o.setActivePartId(null),o.setQuickFixMode(!1),o.setCreateWorkOrderMode(!1),o.setQuickFixAssetId(null),o.setQuickFixRequestId(null)),f.setItem("maintainops.searchQuery",o.getSearchQuery()),r.resetWorkOrderPage(),r.resetPartsPage(),r.resetRequestsPage(),c=l(()=>(c=null,n=n.catch(()=>null).then(async()=>{if(k!==e||(await Promise.all([r.reloadWorkOrderQueue({render:!1}),r.reloadRequestQueue({render:!1})]),k!==e))return;let A=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,$=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),E=!("activeElement"in s)||s.activeElement===$;r.renderWorkspace(),E?g(h,y,b,A):u(A)}),n),m)})}),s.querySelectorAll("[data-view-work-search]").forEach(p=>{p.addEventListener("click",async()=>{a(),o.setActiveSection("work"),o.setActiveWorkOrderId(null),o.setActiveAssetId(null),o.setActivePartId(null),o.setCreateWorkOrderMode(!1),o.setQuickFixMode(!1),r.setWorkOrderSearchMode(!0),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),f.setItem("maintainops.activeSection",o.getActiveSection()),await r.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(p=>{p.addEventListener("click",async()=>{a(),r.setWorkOrderSearchMode(!1),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),await r.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(o){!r||typeof r.scrollTo!="function"||r.scrollTo({top:o,behavior:"auto"})}async function f(o){let i=Number(r?.scrollY??r?.pageYOffset??0);if(await o(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(o.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setMyWorkFilter(o.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setWorkOrderFilter(o.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{t.setActiveStatusFilter(o.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{let i=o.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{let i=o.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{t.setWorkOrderTypeFilter(o.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{t.setWorkOrderPriorityFilter(o.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setWorkSort(o.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{t.setWorkSort(o.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{t.setWorkGroup(o.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{t.setWorkOrderAssigneeFilter(o.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(o=>{o.addEventListener("click",async()=>{o.disabled||await f(async()=>{t.setRequestViewFilter(o.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(o.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setPartsPage(t.getPartsPage()+(o.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setAssetsPage(t.getAssetsPage()+(o.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{t.setFinancialPage(t.getFinancialPage()+(o.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(o=>{o.addEventListener("change",async()=>{await f(async()=>{o.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(o.value),o.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(o.value),o.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(o.value),o.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(o.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(o=>{o.addEventListener("click",async()=>{await f(async()=>{let i=o.dataset.pageDirection==="next"?1:-1;if(o.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(o.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),o.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),o.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),o.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),o.dataset.listPage?.startsWith("planning-")){let l=o.dataset.listPage.replace("planning-","");t.setPlanningPage(l,t.getPlanningPage(l)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(o=>{o.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(o.dataset.planningGroup,!!o.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.windowRef||(typeof window<"u"?window:null),f=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!r)return;let o=()=>{r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)};async function i(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function l(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function d(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function m(){e.renderWorkspace()}function a(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function u(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(u);return}u()}let p=n.querySelector("#back-to-my-work");p&&p.addEventListener("click",()=>{r.setActiveWorkOrderId(null),r.setActiveAssetId(null),a(),o(),e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{r.setActiveAssetId(null),a(),r.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{r.setActiveWorkOrderId(y.dataset.id),r.setActiveAssetId(null),a(),o(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),r.setActiveWorkOrderId(y.dataset.workPhotoJump),r.setActiveAssetId(null),a(),r.setActiveSection("work"),o(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",b=>{b.stopPropagation(),r.setActiveAssetId(y.dataset.openAsset),r.setActiveWorkOrderId(null),a(),o(),r.getActiveSection()!=="assets"&&r.setActiveSection("work"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),f()})}),n.querySelectorAll("[data-asset-id]").forEach(y=>{let b=()=>{r.setActiveAssetId(y.dataset.assetId),r.setActiveWorkOrderId(null),r.setActivePartId(null),a(),o(),r.setReportIssueMode(!1),r.setActiveSection("assets"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),f()};y.addEventListener("click",b),y.addEventListener("keydown",k=>{k.key!=="Enter"&&k.key!==" "||(k.preventDefault(),b())})}),n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",()=>{r.setActiveWorkOrderId(y.dataset.miniWorkOrder),r.setActiveAssetId(null),a(),r.setActiveSection("work"),o(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),f()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{y.addEventListener("toggle",async()=>{let b=y.dataset.assetId,k=y.dataset.assetRelationshipSection;!b||!k||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(b,k,y.open),y.open&&d(k)&&await i(b),y.open&&k==="asset-history"&&await l(b),m())})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.assetId,A=y.dataset.assetRelationSection,E=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,A):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,A,E),m()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.openAssetHistory;k&&(r.setActiveAssetId(k),r.setActiveWorkOrderId(null),o(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(k),await l(k),e.renderWorkspace(),f())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.backAssetHistory;k&&r.setActiveAssetId(k),a(),e.renderWorkspace(),f()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.assetId,$=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,"asset-history",$),e.renderWorkspace(),f()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(o){!r||typeof r.scrollTo!="function"||r.scrollTo({top:o,behavior:"auto"})}function f(){let o=Number(r?.scrollY??r?.pageYOffset??0);if(e.renderWorkspace(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(o));return}s(o)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(o=>{o.addEventListener("click",()=>{t.setPartInventoryFilter(o.dataset.partInventoryFilter),e.resetPartsPage(),f()})}),n.querySelectorAll("[data-part-sort]").forEach(o=>{o.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(o.value||"default"),e.resetPartsPage(),f())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(o=>{o.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===o.dataset.assetStatusFilter?"all":o.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),f()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(o=>{o.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===o.dataset.assetTypeFilter?"all":o.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),f()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(o=>{o.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(o.value||"all"),e.resetAssetsPage(),f())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:c}})();(function(){function c(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(f){e.showNotice(`Could not update status: ${f.message||f}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",r=>r.stopPropagation()),t.addEventListener("change",r=>{r.stopPropagation(),r.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:c}})();var ga=B(Et()),ha=B(Ot());(function(){function c(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,r=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let f=e.getWorkOrderById(s.dataset.id);if(!f)return;let o=s.dataset.copyDowntime==="subject",i=o?e.downtimeEmailSubject(f):e.downtimeEmailBody(f),l=await e.copyTextToClipboard(i);s.textContent=l?"Copied":"Copy failed",r(()=>{s.textContent=o?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:c}})();(function(){function c(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:c}})();var wa=B(Wt());(function(){function c(e={}){let n=e.documentRef||document;function t(f){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(f),e.renderWorkspace()}async function r(f){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let o=e.getPhotoPathsByWorkOrder(f);if(o.length){let l=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(o),"Work order photo cleanup timed out.",15e3);l.error&&e.warnRef("Work order photo storage cleanup failed",l.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(f),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(o){e.alertRef(`Could not delete work order: ${o.message||o}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(f=>{f.addEventListener("click",o=>{o.stopPropagation(),t(f.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(f=>{f.addEventListener("click",o=>{o.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(f=>{f.addEventListener("click",async o=>{o.stopPropagation(),await r(f.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:r,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(r=>{r.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(r.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace;!t||typeof r!="function"||(n.querySelectorAll("[data-open-part]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(s.dataset.openPart),r()}),s.addEventListener("keydown",f=>{f.key!=="Enter"&&f.key!==" "||(f.preventDefault(),t.setActivePartId(s.dataset.openPart),r())})}),n.querySelectorAll("[data-close-part-detail]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(null),t.setShowPartSourceManager(!1),r()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(s=>{s.addEventListener("click",()=>{t.setShowPartSourceManager(!t.getShowPartSourceManager()),r()})}))}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.messageComposerScopeNote,f=e.autoGrowTextarea;if(!t||typeof r!="function")return;let o=e.storage||localStorage;n.querySelectorAll("[data-message-filter]").forEach(m=>{m.addEventListener("click",()=>{let a=m.dataset.messageFilter;t.setMessageThreadFilter(a),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),o.setItem("maintainops.messageThreadFilter",a),o.setItem("maintainops.messageThreadsPage","1"),r()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(m=>{m.addEventListener("click",()=>{t.setActiveWorkOrderId(m.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),o.setItem("maintainops.activeSection","work"),r()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),o.setItem("maintainops.messageComposerWorkOrderId",""),r()});let l=n.querySelector("#message-search");l&&l.addEventListener("input",()=>{let m=l.value;t.setMessageSearchQuery(m),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),o.setItem("maintainops.messageSearchQuery",m),o.setItem("maintainops.messageThreadsPage","1"),r();let a=n.querySelector("#message-search");a&&(a.focus(),a.setSelectionRange(m.length,m.length))});let d=n.querySelector("#message-thread-form");if(d){let m=d.querySelector("#message-thread-type"),a=d.querySelector(".message-direct-field"),u=d.querySelector("#message-scope-note");if(m&&a&&u&&typeof s=="function"){let g=()=>{let p=m.value==="direct";a.classList.toggle("hidden-section",!p);let h=a.querySelector("select");h&&(h.disabled=!p),u.textContent=s(m.value)};m.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(m=>{m.addEventListener("click",()=>{let a=n.querySelector("#message-thread-form");if(!a)return;let u=a.querySelector("details"),g=a.querySelector("#message-thread-type"),p=a.querySelector("select[name='direct_user_id']"),h=a.querySelector(".message-direct-field"),y=a.querySelector("#message-scope-note"),b=a.querySelector("input[name='title']");u&&(u.open=!0),g&&(g.value="direct"),p&&(p.value=m.dataset.messagePerson||"",p.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),b&&b.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(m=>{m.addEventListener("click",()=>{let u=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!u)return;let g=u.value.trim();u.value=g?`${g}
${m.dataset.quickReply}`:m.dataset.quickReply,u.focus(),typeof f=="function"&&f(u)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof r!="function"||typeof s!="function")return;let f=n.querySelector("#part-search-form");if(!f)return;let o=l=>{t.setPartSearchQuery(l||""),s(),r()},i=f.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{o(i.value||"");let l=n.querySelector("#part-search");if(!l)return;l.focus();let d=l.value.length;l.setSelectionRange(d,d)}),f.addEventListener("submit",l=>{l.preventDefault();let d=e.FormDataRef||FormData,m=new d(f).get("part_search")||"";o(m),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(f=>{f.addEventListener("click",async()=>{let o=performance.now(),i=f.dataset.section;e.visibleNavItems().some(([l])=>l===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),r.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,o))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-thread]").forEach(s=>{s.addEventListener("click",async()=>{let f=s.dataset.messageThread;t.setActiveMessageThreadId(f),r.setItem("maintainops.activeMessageThreadId",f),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(f),await e.markMessageThreadRead(f),e.renderWorkspace()})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(s=>{s.addEventListener("click",async()=>{let f=s.dataset.openWorkMessageThread;t.setActiveMessageThreadId(f),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),r.setItem("maintainops.activeMessageThreadId",f),r.setItem("maintainops.activeSection","messages"),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(f),await e.markMessageThreadRead(f),e.renderWorkspace()})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),r.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let f=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(f),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),r.setItem("maintainops.messageComposerWorkOrderId",f),r.setItem("maintainops.activeSection","messages"),r.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(r=>{r.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",()=>{e.exportActiveSectionCsv()})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:c}})();var Ma=B(xt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(r.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(r=>{r.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(r.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(r.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.deleteMaintenanceRequest(r.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(r.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.deletePreventiveSchedule(r.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(r.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.deleteProcedureTemplate(r.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:c}})();(function(){function c(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(r=>{c(r),r.addEventListener("input",()=>c(r))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:c,bindWorkspaceTextareaAutoGrow:e}})();var Na=B(Mt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(r.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{e.cancelTeamInvite(r.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(f=>{f.addEventListener("click",async()=>{let o=await t(f.dataset.copyTeamInvite||"");f.textContent=o?"Copied":"Copy failed",r(()=>{f.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(f=>{f.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(f=>{f.addEventListener("click",()=>{t.setQuickFixAssetId(f.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:c}})();var za=B(Tt());(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(f=>{f.addEventListener("click",async()=>{let o=await t(f.dataset.copyPublicRequestLink);f.textContent=o?"Copied":"Copy failed",r(()=>{f.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:c}})();var Ga=B(Dt());(function(){function c(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(r=>{r.addEventListener("click",()=>{let f=r.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(r.dataset.createFollowUp,f?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:c}})();var Ja=B(It());(function(){function c(e={}){let n=e.documentRef||document,t=e.createComment,r=n.querySelector("#comment-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,r=n.querySelector("#quick-update-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,r=n.querySelector("#edit-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(r=>{t(r),r.addEventListener("change",()=>t(r))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:c}})();var ro=B(Ft()),ao=B(Lt()),oo=B(Nt()),io=B(Ut()),so=B(Qt()),co=B(Bt()),lo=B(jt()),uo=B(zt()),po=B(Ht()),mo=B(Gt()),fo=B(Vt()),go=B(Yt()),ho=B(Kt()),yo=B(Jt()),bo=B(Zt()),wo=B(Xt()),vo=B(en()),ko=B(tn()),_o=B(nn()),So=B(rn()),qo=B(an()),Co=B(on()),$o=B(sn()),Po=B(cn()),Ao=B(ln()),Ro=B(un());(function(){function c(e){function n(r){return e[r]()}function t(r,s=n("requestViewFilter")){let f=r.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(f=f.eq("location_id",n("activeLocationId"))),s==="converted"?f=f.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(f=f.eq("status","submitted").is("converted_work_order_id",null));let o=e.postgrestSearchTerm(n("searchQuery"));if(o){let i=`%${o}%`,l=n("assets").filter(e.matchesActiveLocation).filter(d=>e.matchesQuery([d.name,d.asset_code,d.manufacturer,d.model,d.location,d.status,d.asset_type,e.parentAssetFor()(d)?.name],o)).map(d=>d.id).slice(0,e.SEARCH_ID_PAGE_SIZE);f=f.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...l.length?[`asset_id.in.(${l.join(",")})`]:[]].join(","))}return f}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:c}})();(function(){function c(e){function n(u){return e[u]()}async function t(){let u=n("searchQuery").trim();if(!u||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.asset_code,b.manufacturer,b.model,b.location,b.status,b.asset_type,e.parentAssetFor()(b)?.name],u)).map(b=>b.id),p=n("procedureTemplates").filter(b=>e.matchesQuery([b.name,b.description,...(b.procedure_steps||[]).map(k=>k.prompt)],u)).map(b=>b.id),h=n("parts").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.sku,b.supplier_name,b.quantity_on_hand,b.reorder_point,b.unit_cost],u)).map(b=>b.id),y=new Set;await Promise.all([r(y,h),s(y,"work_order_comments",["body"],u),s(y,"work_order_events",["event_type","summary"],u),s(y,"work_order_photos",["file_name"],u),s(y,"work_order_step_results",["value"],u)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:p.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function r(u,g,p={}){if(!g.length)return;let y=p.maxRows??300;for(let b of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",b),k=>{k.forEach(A=>{A.work_order_id&&u.add(A.work_order_id)}),y-=k.length},y)}catch(k){e.warn("Part-linked work order search failed",k);return}}}async function s(u,g,p,h,y={}){let b=e.postgrestSearchTerm(h);if(!b)return;let k=p.map($=>`${$}.ilike.%${b}%`).join(","),A=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(k),$=>{$.forEach(E=>{E.work_order_id&&u.add(E.work_order_id)})},A)}catch($){e.warn(`${g} work order search failed`,$)}}async function f(u={}){let g=await o(),p=g.length,h=Math.max(1,Math.ceil(p/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,b=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(E=>E.id);if(!b.length)return{data:[],error:null,count:p};let k=u.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),A=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:k,ids:b});if(A.error)return A;let $=new Map((A.data||[]).map(E=>[E.id,E]));return{...A,data:b.map(E=>$.get(E)).filter(Boolean),count:p}}async function o(){let u=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===u)return g.rows;let p=n("searchQuery").trim(),h=new Map;await i(h,p);let y=n("assets").filter(e.matchesActiveLocation).filter(E=>e.matchesQuery([E.name,E.asset_code,E.manufacturer,E.model,E.location,E.status,E.asset_type,e.parentAssetFor()(E)?.name],p)).map(E=>E.id),b=n("procedureTemplates").filter(E=>e.matchesQuery([E.name,E.description,...(E.procedure_steps||[]).map(C=>C.prompt)],p)).map(E=>E.id),k=n("parts").filter(e.matchesActiveLocation).filter(E=>e.matchesQuery([E.name,E.sku,E.supplier_name,E.quantity_on_hand,E.reorder_point,E.unit_cost],p)).map(E=>E.id);await Promise.all([l(h,"asset_id",y),l(h,"procedure_template_id",b)]);let A=new Set;await Promise.all([r(A,k,{maxRows:1/0}),s(A,"work_order_comments",["body"],p,{maxRows:1/0}),s(A,"work_order_events",["event_type","summary"],p,{maxRows:1/0}),s(A,"work_order_photos",["file_name"],p,{maxRows:1/0}),s(A,"work_order_step_results",["value"],p,{maxRows:1/0})]),await d(h,[...A]);let $=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:u,rows:$}),$}async function i(u,g){let p=e.postgrestSearchTerm(g);if(!p)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${p}%`).join(",");await e.fetchPagedSearchRows(()=>m().or(h),y=>a(u,y))}async function l(u,g,p){if(p.length)for(let h of e.chunkArray(p,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>m().in(g,h),y=>a(u,y))}async function d(u,g){if(g.length)for(let p of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>m().in("id",p),h=>a(u,h))}function m(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function a(u,g){(g||[]).forEach(p=>{p?.id&&u.set(p.id,{...u.get(p.id)||{},...p})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:f,exactWorkOrderSearchRows:o,addRelatedWorkOrderIdsFromParts:r,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:c}})();(function(){function c(e){function n(o){return e[o]()}function t(){let o=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),l=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],o)).sort((g,p)=>g.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],o)).sort((g,p)=>g.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),m=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],o)).sort((g,p)=>new Date(p.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),a=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],o)).sort((g,p)=>String(g.next_due_at||"").localeCompare(String(p.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(p=>p.prompt)],o)).sort((g,p)=>g.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:l,parts:d,requests:m,pm:a,procedures:u}}function r(o="all"){let i=e.startOfToday(),l=new Date(i);return l.setDate(l.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(d=>d.status!=="completed").filter(d=>e.matchesSearch([d.title,d.description,d.priority,d.status,d.assets?.name,e.assignmentLabel(d)])).filter(d=>o==="no_due"?!d.due_at:!!d.due_at).map(d=>{let m=d.due_at?new Date(`${d.due_at}T00:00:00`):null;return{kind:o==="no_due"?"no_due":"work",id:d.id,title:d.title,priority:d.priority,status:d.status,assetName:d.assets?.name||"No equipment",dueAt:d.due_at,due:m,createdAt:d.created_at||"",assignedTo:e.assignmentLabel(d),workOrder:d}}).filter(d=>o==="no_due"?!0:o==="overdue"?d.due<i:o==="today"?d.due.getTime()===i.getTime():o==="soon"?d.due>i&&d.due<=l:!0).sort((d,m)=>{if(o==="no_due"){let a={critical:4,high:3,medium:2,low:1};return(a[m.priority]||0)-(a[d.priority]||0)||new Date(d.createdAt||0)-new Date(m.createdAt||0)}return d.due-m.due})}function s(){let o=e.startOfToday(),i=new Date(o);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(l=>{let d=new Date(`${l.next_due_at}T00:00:00`);return d>=o&&d<=i}).filter(l=>e.matchesSearch([l.title,l.frequency,l.next_due_at,l.assets?.name])).map(l=>({kind:"pm",id:l.id,title:l.title,assetName:l.assets?.name||"No equipment",dueAt:l.next_due_at,due:new Date(`${l.next_due_at}T00:00:00`)})).sort((l,d)=>l.due-d.due)}function f(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(o=>o.follow_up_needed).filter(o=>e.matchesSearch([o.title,o.description,o.failure_cause,o.resolution_summary,o.assets?.name,o.assigned_profile?.full_name])).map(o=>({kind:"follow_up",id:o.id,title:o.title,assetName:o.assets?.name||"No equipment",completedAt:o.completed_at?new Date(o.completed_at).toLocaleDateString():"not completed",resolution:o.resolution_summary||o.completion_notes||"",workOrder:o})).sort((o,i)=>o.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:r,planningPmItems:s,followUpItems:f}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:c}})();(function(){function c(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,r){return n.from("locations").insert({company_id:t,name:r}).select("id").single()}window.MaintainOpsLocationsService={listLocations:c,createLocation:e}})();(function(){function c(f,o){return f.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",o)}function e(f,o){return f.from("company_members").select("*").eq("company_id",o).order("created_at",{ascending:!0})}function n(f,o){return f.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",o).order("created_at",{ascending:!1})}function t(f,o){return f.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",o).order("created_at",{ascending:!1})}function r(f,o){return f.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",o).order("created_at",{ascending:!1})}function s(f,o){return f.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",o).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:c,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:r,listRequestNotificationRecipients:s}})();(function(){function c(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:c}})();(function(){function c(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:c,listAssetFinancials:e}})();(function(){function c(i,l,d={}){return i.from("work_orders").select(l,d)}function e(i){return i.from("work_orders").select("id",{count:"exact",head:!0})}function n(i,l,d,m){return i.from("work_orders").select(m).eq("company_id",l).eq("id",d).maybeSingle()}function t(i,l,d,m){return i.from("work_orders").select(m).eq("company_id",l).eq("asset_id",d).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function r(i,l){let{companyId:d,locationId:m,locationsReady:a,selectClause:u,ids:g}=l,p=i.from("work_orders").select(u).eq("company_id",d).in("id",g);return a&&m&&(p=p.eq("location_id",m)),p}function s(i,l){let{companyId:d,locationId:m,locationsReady:a}=l,u=i.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",d);return a&&m&&(u=u.eq("location_id",m)),u}function f(i,l){let{companyId:d,locationId:m,locationsReady:a}=l,u=i.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",d).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return a&&m&&(u=u.eq("location_id",m)),u.order("id",{ascending:!0})}async function o(i,l,d=1/0,m=1e3){let a=0,u=0;for(;u<d;){let g=Math.min(m,d-u),{data:p,error:h}=await i().range(a,a+g-1);if(h)throw h;let y=p||[];if(l(y),u+=y.length,y.length<g)break;a+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:c,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:r,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:f,fetchPagedSearchRows:o}})();var Fo=B(dn());(function(){function c(s){return s.rpc("get_my_companies")}function e(s,f){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",f).order("created_at",{ascending:!0})}function n(s,f){return s.from("company_members").select("company_id, role").eq("user_id",f).order("created_at",{ascending:!0})}function t(s,f){return s.from("companies").select("id, name, logo_path, created_at").in("id",f).order("created_at",{ascending:!0})}function r(s,f){return s.from("companies").select("id, name, created_at").in("id",f).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:c,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:r}})();(function(){function c(r,s){return r.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(r,s){return r.from("app_issue_reports").insert(s)}function n(r,s,f,o){return r.from("app_issue_reports").update({status:o,resolved_at:o==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",f)}function t(r,s,f){return r.from("app_issue_reports").delete().eq("company_id",s).eq("id",f)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:c,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let c="user_id, shop_reference_favorites, updated_at";function e(t,r){return t.from("user_preferences").select(c).eq("user_id",r).maybeSingle()}function n(t,r,s){return t.from("user_preferences").upsert({user_id:r,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(c).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Qo=B(pn()),Bo=B(mn()),jo=B(fn()),zo=B(gn());(function(){function c(t,r,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${r}</strong></article>`}function e(t,r,s,f="neutral"){return`
    <article class="insight dashboard-card tone-${f}">
      <span>${t}</span>
      <strong>${r}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],r=window.MaintainOpsFormatting?.roleLabel||(o=>String(o||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),f=window.MaintainOpsDom?.escapeHtml||(o=>String(o??""));return`
    <section class="team-role-guide">
      ${t.map(o=>`
        <article>
          <strong>${r(o)}</strong>
          <span>${f(s(o))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:c,renderInsight:e,renderRoleGuide:n})})();var Go=B(hn());(function(){function c(m,a,u="active",g={},p){let h=p.getActiveStatusFilter(),y=g.filter||g.section,b=y?"button":"article",k=g.filter&&h===g.filter?" selected":"",A=u.includes("overdue")&&Number(a)>=3,$=A?" alert-blink":"",E=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),C=E?` ${E}`:"";return`
    <${b} class="gauge-readout ${u}${k}${$}"${C}>
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
      <strong>${a}</strong>
      <span>${p.escapeHtml(m)}</span>
    </${b}>
  `}function e(m){let a=m.getWorkOrderDashboardCounts()||{},u=a.activeWork||0,g=a.newWork||0,p=a.inProgress||0,h=a.blocked||0,y=a.overdue||0,b=a.completedAll||0,k=a.completedMonth||0,A=a.completedWeek||0,$=m.getRequestsReady()?m.openMaintenanceRequests().filter(m.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${c("Active Work",u,"active",{filter:"active"},m)}
      ${c("New",g,"new",{filter:"open"},m)}
      ${c("In Progress",p,"in_progress",{filter:"in_progress"},m)}
      ${c("Blocked",h,"blocked",{filter:"blocked"},m)}
      ${c("Overdue",y,"overdue",{filter:"overdue"},m)}
      ${c("Requests",$,"request",{filter:"requests"},m)}
      ${c("All Completed",b,"completed",{filter:"completed"},m)}
      ${c("Completed Month",k,"completed",{filter:"completed_month"},m)}
      ${c("Done This Week",A,"completed",{filter:"completed_week"},m)}
    </div>
  `}function n(m,a){let u=m||{},g=u.newWork||0,p=u.inProgress||0,h=u.blocked||0,y=u.activeWork??g+p+h,b=u.overdue||0,k=u.completedAll||0,A=u.completedMonth||0,$=u.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${c("Active Work",y,"active workload-pill",{filter:"active"},a)}
      ${c("New",g,"new workload-pill",{filter:"open"},a)}
      ${c("In Progress",p,"in_progress workload-pill",{filter:"in_progress"},a)}
      ${c("Blocked",h,"blocked workload-pill",{filter:"blocked"},a)}
      ${c("Overdue",b,"overdue workload-pill",{filter:"overdue"},a)}
      ${c("All Completed",k,"completed workload-pill",{filter:"completed"},a)}
      ${c("Completed Month",A,"completed workload-pill",{filter:"completed_month"},a)}
      ${c("Done This Week",$,"completed workload-pill",{filter:"completed_week"},a)}
    </div>
  `}function t(m){return m.getWorkOrders().filter(a=>m.getDueState(a)?.className==="overdue")}function r(m){return m.getWorkOrders().filter(a=>s(a,m))}function s(m,a,u=new Date){if(!m.completed_at)return!1;let g=new Date(m.completed_at),p=a.sundayWeekRange(u);return Number.isFinite(g.getTime())&&g>=p.start&&g<p.end}function f(m){return m.getWorkOrders().filter(o)}function o(m){let a=new Date,u=new Date(a.getFullYear(),a.getMonth(),1);return!!(m.completed_at&&new Date(m.completed_at)>=u)}function i(m){let a=m.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!a.length)return 0;let u=a.reduce((g,p)=>g+Number(p.actual_minutes||0),0);return Math.round(u/a.length)}function l(m){let a=new Date;a.setHours(0,0,0,0);let u=new Date(a);return u.setDate(u.getDate()+7),m.getPreventiveSchedules().filter(g=>{let p=new Date(`${g.next_due_at}T00:00:00`);return p>=a&&p<=u})}function d(m){return Object.freeze({renderGaugeReadout:(a,u,g="active",p={})=>c(a,u,g,p,m),renderWorkOrderGaugeDashboard:()=>e(m),renderWorkloadStrip:a=>n(a,m),overdueWorkOrders:()=>t(m),completedThisWeek:()=>r(m),isCompletedThisWeek:(a,u)=>s(a,m,u),completedThisMonth:()=>f(m),isCompletedThisMonth:o,averageCompletionMinutes:(a=m.getWorkOrders())=>i(a),preventiveDueSoon:()=>l(m)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:d})})();(function(){function c(n){let t={active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:c,navIcon:e})})();(function(){function c(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,r=>r.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:c,assetStatusLabel:e})})();(function(){function c({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:r,getPartInventoryFilter:s,assetTypeLabel:f,assetStatusLabel:o}){function i(m){return e().trim()?"No requests match this search.":m==="converted"?"No converted requests at this location.":m==="all"?"No requests at this location yet.":"No active requests waiting for review."}function l(){let m=n(),a=t?t():"all";return e().trim()?"No equipment matches this search.":m!=="all"?`No ${o(m).toLowerCase()} equipment found.`:a!=="all"?`No ${f(a).toLowerCase()} equipment found.`:"No equipment added yet."}function d(){return r().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:l,partEmptyStateText:d}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:c}})();var Zo=B(yn());(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:r,getSearchQuery:s}){function f(p){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(p)} previewed in ${e(r())}</span>
          </div>
          <div class="global-search-grid">
            ${o("Work Orders",p.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${o("Equipment",p.assets,l,"asset")}
            ${o("Parts",p.parts,d,"parts")}
            ${o("Requests",p.requests,m,"comment")}
            ${o("PM",p.pm,a,"procedure")}
            ${o("Procedure Checklists",p.procedures,u,"procedure")}
          </div>
        </section>
      `}function o(p,h,y,b,k={}){return`
        <section class="global-result-group relationship-detail ${b}">
          <div class="panel-header compact">
            <h3>${e(p)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${k.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function i(p){return`
        <button class="global-result-item" data-search-work-order="${p.id}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${n(p.status)} - ${e(p.assets?.name||"No equipment")} - ${e(t(p))}</span>
        </button>
      `}function l(p){return`
        <button class="global-result-item" data-search-asset="${p.id}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${e(p.asset_code||"No serial")} - ${e(p.status)} - ${e(p.location||r())}</span>
        </button>
      `}function d(p){let h=Number(p.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${p.id}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${e(p.sku||"No SKU")} - ${h} on hand${p.supplier_name?` - ${e(p.supplier_name)}`:""}</span>
        </button>
      `}function m(p){return`
        <button class="global-result-item" data-search-request="${p.id}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.status)} - ${e(p.assets?.name||"No equipment")}</span>
        </button>
      `}function a(p){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(p.title)}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.assets?.name||"No equipment")} - due ${e(p.next_due_at||"unset")}</span>
        </button>
      `}function u(p){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(p.name)}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${(p.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(p){return Object.values(p).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:f,renderGlobalResultGroup:o,renderGlobalWorkResult:i,renderGlobalAssetResult:l,renderGlobalPartResult:d,renderGlobalRequestResult:m,renderGlobalPmResult:a,renderGlobalProcedureResult:u,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:c}})();var ei=B(bn()),ti=B(wn()),ni=B(vn());(function(){function c({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:r=(l,d)=>d,renderListPagination:s,statusLabel:f,renderRelationshipChips:o,canEditOperationalRecords:i=()=>!0}){function l(u,g,p,h,y={}){let b=n||12,k=typeof t=="function"?t(h):1,A=Math.max(1,Math.ceil(g.length/b)),$=Math.min(Math.max(k,1),A),E=g.slice(($-1)*b,$*b),C=r(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${C?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(u)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${p}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${E.map(a).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${h}`,g.length,$,A):""}
          </div>
        </details>
      `}function d(u,g,p,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(u)}</h3>
            <p>${e(g)}</p>
          </header>
          ${p}
        </section>
      `}function m(u){return`
        <div class="planning-grid">
          ${d("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${l("No Due Date",u.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${l("Follow-up Needed",u.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${d("Current schedule","Work requiring attention now.",`
            ${l("Overdue",u.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${l("Due Today",u.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${d("Upcoming","Near-term maintenance and preventive work.",`
            ${l("Next 7 Days",u.soon,"in_progress","soon")}
            ${l("PM Due Soon",u.pm,"open","pm")}
          `)}
        </div>
      `}function a(u){if(u.kind==="follow_up")return`
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${e(u.title)}</strong>
              <p>${e(u.assetName)} - completed ${e(u.completedAt)}</p>
              ${u.resolution?`<p>${e(u.resolution)}</p>`:""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${e(u.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${e(u.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;if(u.kind==="pm")return`
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${e(u.title)}</strong>
              <p>${e(u.assetName)} - due ${e(u.dueAt)}</p>
            </div>
            <button class="secondary-button" data-generate-pm="${u.id}" type="button">Generate Work</button>
          </article>
        `;if(u.kind==="no_due"){let g=u.createdAt?new Date(u.createdAt):null,p=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(u.priority)} ${e(f(u.status))}</span>
              <strong>${e(u.title)}</strong>
              <p>${e(u.assetName)} - ${e(u.assignedTo||"Unassigned")}</p>
              <p>Created ${e(p)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(u.id)}" type="button">Open Work Order</button>
              ${i()?`
                <form class="planning-due-form" data-planning-due-form="${e(u.id)}">
                  <label>Due date<input name="planning_due_at" type="date" required></label>
                  <button class="primary-button" type="submit">Set Due Date</button>
                </form>
              `:'<span class="muted planning-view-only">View only</span>'}
            </div>
          </article>
        `}return`
        <article class="planning-item mini-work-order" data-mini-work-order="${u.id}">
          <div>
            <span class="eyebrow">${e(u.priority)} ${e(f(u.status))}</span>
            <strong>${e(u.title)}</strong>
            <p>${e(u.assetName)} - due ${e(u.dueAt)}</p>
          </div>
          ${o(u.workOrder)}
        </article>
      `}return{renderPlanningGroup:l,renderPlanningBoard:m,renderPlanningItem:a}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:c}})();var ai=B(kn());(function(){function c({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:r,getWorkOrderPage:s,getPartsPage:f,getAssetsPage:o}){function i(a,u){if(a<=e)return"";let g=s(),p=(g-1)*e+1,h=Math.min(a,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${a} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}function l(a,u){if(a<=n)return"";let g=f(),p=(g-1)*n+1,h=Math.min(a,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${a} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}function d(a,u){if(a<=t)return"";let g=o(),p=(g-1)*t+1,h=Math.min(a,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${a} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}function m(a,u,g,p){if(u<=r)return"";let h=(g-1)*r+1,y=Math.min(u,g*r);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${a}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${u} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-list-page="${a}" data-page-direction="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:l,renderAssetsPagination:d,renderListPagination:m}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:c}})();var ii=B(_n());(function(){function c({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:r,matchesActiveLocation:s,isAssetDescendantOf:f,parentAssetFor:o}){function i(g=t()){return n().map(p=>`<option value="${p.id}" ${p.id===g?"selected":""}>${e(p.name)}</option>`).join("")}function l(g){let p=o(g);return p?`${g.name} - part of ${p.name}`:g.name}function d(g=""){let p=r().filter(s).sort((b,k)=>l(b).localeCompare(l(k))),h=g?r().find(b=>b.id===g):null;return(h&&!p.some(b=>b.id===h.id)?[h,...p]:p).map(b=>`<option value="${b.id}" ${b.id===g?"selected":""}>${e(l(b))}</option>`).join("")}function m(g="",p=""){return r().filter(s).filter(h=>h.id!==p&&!f(h.id,p)).sort((h,y)=>l(h).localeCompare(l(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(l(h))}</option>`).join("")}function a(g=""){let p=[...new Set(r().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,b)=>y.localeCompare(b)),h=String(g||"").trim();return h&&!p.includes(h)?[h,...p]:p}function u(g=""){return a(g).map(p=>`<option value="${e(p)}" ${p===g?"selected":""}>${e(p)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:d,renderParentAssetOptions:m,renderAssetAreaOptions:u,assetOptionLabel:l}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:c}})();(function(){function c({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function r(s){if(!s.photo_storage_path)return"";let f=s.photo_file_name||s.photo_original_file_name||"Request photo",o=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(f)}">`:""}
          <div>
            <strong>${e(f)}</strong>
            <span>${e(o)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:r}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:c}})();(function(){function c({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let r=e();if(r>0)return`<b class="nav-badge nav-alert-badge">${r}!</b>`;let s=n();return s>0?`<b class="nav-badge">${s}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:c}})();(function(){function c(){function e(r){let s=Number(r);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(r){let s=e(r);return s?s>99?"99+":String(s):""}function t(r,s={}){let f=n(r);if(!f)return"";let o=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${o}">${f}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function r(s){let f=n()[s.reporter_id]?.full_name||"Team member",o=t().find(d=>d.id===s.location_id)?.name||"No location",i=s.status||"open",l=s.severity||"normal";return`
        <article class="issue-report-card issue-${i}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${l==="blocking"?"critical":l==="minor"?"completed":"open"}">${e(l)}</span>
              <span class="chip issue-status-chip issue-status-${i}">${e(i)}</span>
              <span>${e(o)}</span>
              <span>${s.created_at?new Date(s.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(s.title)}</strong>
            <p>${e(s.details||"")}</p>
            <small>${e(f)} - ${e(s.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(s.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(d=>`<option value="${d}" ${d===i?"selected":""}>${d}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(s.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:r}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:r,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:f}){function o(l){let d=s()[l.id]||[],m=d[d.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(l.title)}</strong>
            <span>${e(t(l))}${m?` - ${e(n(m.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${l.id}" type="button">Open Thread</button>
        </article>
      `}function i(l){let d=r().filter(m=>m.work_order_id===l.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${l.id}" type="button">Message Team</button>
            ${f()?`
              <div class="work-linked-thread-list">
                ${d.map(o).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:i,renderLinkedWorkMessageThread:o}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:c}})();(function(){function c({escapeHtml:e,recommendedWorkOrderStep:n}){function t(r){let s=n(r);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:c}})();(function(){function c({escapeHtml:e}){function n(r,s,f,o,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${f}" type="button">
          <span>${e(r)}</span>
          <strong>${s}</strong>
          <small>${e(o)}</small>
        </button>
      `}function t(r){return r.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:r,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:f,getMessageThreads:o,getPartsUsedByWorkOrder:i}){function l(d){let m=o().filter(p=>p.work_order_id===d.id).length,a=(i()[d.id]||[]).reduce((p,h)=>p+(Number(h.quantity_used)||0),0),u=d.asset_id?s(d)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=d.status==="completed"?"Review history or create follow-up if needed":d.status==="blocked"?"Resolve blocker or add current update":d.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
        <section class="work-command-summary">
          <button class="command-card status-${d.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${n(d.status)}</strong>
            <small>${e(g)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${e(d.assets?.name||"General item / area")}</strong>
            <small>${e(d.due_at?`Due ${d.due_at}`:"Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${e(t(d))}</strong>
            <small>${r(d)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${u[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${u[0]}</strong>
            <small>${e(u[1])}</small>
          </button>
          ${f(d)}
        </section>
      `}return{renderWorkOrderCommandSummary:l}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:c}})();(function(){function c(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function r(){return`
        <datalist id="part-source-options">
          ${n().map(o=>`<option value="${e(o)}"></option>`).join("")}
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
              ${f.map(o=>`
                <form class="part-source-row" data-rename-part-source>
                  <input name="old_source" type="hidden" value="${e(o)}">
                  <span>${e(o)}</span>
                  <input name="new_source" list="part-source-options" value="${e(o)}" aria-label="New source name for ${e(o)}">
                  <button class="secondary-button" type="submit">Rename</button>
                </form>
              `).join("")||'<p class="muted">No sources have been added yet.</p>'}
            </div>
            <p class="error-text" id="part-source-error"></p>
          `:'<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>'}
        </section>
      `}return{renderPartSourceOptions:r,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:c}})();(function(){function c({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:r,parentAssetFor:s,childAssetsFor:f}){function o(i){let l=t().filter(a=>a.asset_id===i.id&&a.status!=="completed").length,d=s(i),m=f(i.id);return`
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
            ${d?`<p>Part of ${e(d.name)}</p>`:""}
            ${m.length?`<p>${m.length} linked item${m.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${l} open work</span>
        </article>
      `}return{renderAssetCard:o}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function r(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(f=>`<option value="${f.id}" ${f.id===s?"selected":""}>${e(f.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:r}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:c}})();(function(){function c({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function r(f){let o=n().filter(i=>i.thread_id===f.id).map(i=>t(i.user_id));return o.length?o.join(", "):"Direct message"}function s(f){return f.thread_type==="direct"?r(f):f.thread_type==="location"?e().find(o=>o.id===f.location_id)?.name||"Location thread":"Whole company"}return{directThreadNames:r,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:r,unreadMessageCount:s,getMessagesByThreadId:f,getActiveMessageThreadId:o}){function i(l){let m=(f()[l.id]||[]).filter(h=>!h.deleted_at),a=m[m.length-1],u=s(l.id),g=a?.body?`${e(t(a.sender_id))}: ${e(a.body)}`:"Last activity",p=a?`${g} - ${e(n(a.created_at))}`:"No messages yet";return`
        <button class="message-thread-button ${l.id===o()?"active":""}" data-message-thread="${l.id}" type="button">
          <strong>${e(l.title)}${u?`<span class="message-unread-pill">${u}</span>`:""}</strong>
          <span>${e(r(l))}</span>
          <small>${p}</small>
        </button>
      `}return{renderMessageThreadButton:i}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:c}})();(function(){function c({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:c}})();var Si=B(Sn());(function(){function c({getLocations:e}){function n(t){let r=e().find(s=>s.id===t.default_location_id);return r?`Default location: ${r.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:c}})();(function(){function c({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function r(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:r}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:c}})();(function(){function c(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function r(s){let f=n(s),o=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),l=e.cleanWorkOrderDescription(s.description)||s.title,d=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${f} is down or needs maintenance attention. At this time, the expected downtime is ${o}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${l}`,`Work order: ${s.title}`,`Equipment: ${f}`,`Current update: ${d}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:r}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:c}})();(function(){function c(){function e(t){let r=t?.message||"";return r.includes("assets_asset_type_check")||r.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:c}})();(function(){function c(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:c}})();(function(){function c(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,f){let o=n(s);return f!==e.OUTSIDE_VENDOR_VALUE?o||null:[o,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function r(s,f){let o=String(s||"").trim();if(!f?.photo_storage_path)return o||null;let i="[Request photo attached to original request]";return o?`${o}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:r}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:c}})();(function(){function c(){function e(n,t){if(!n)return"Work order updated.";let r=[];return n.title!==t.title&&r.push("title"),(n.description||"")!==(t.description||"")&&r.push("description"),(n.due_at||"")!==(t.due_at||"")&&r.push("due date"),n.priority!==t.priority&&r.push("priority"),(n.type||"corrective")!==t.type&&r.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&r.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&r.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&r.push("actual minutes"),r.length?`Updated ${r.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:c}})();(function(){function c(){function e(n,t,r,s=[]){return[...n.map(f=>({...f,type:"comment"})),...t.map(f=>({...f,type:"photo"})),...s.map(f=>({...f,type:"part"})),...r.map(f=>({...f,type:"event"}))].sort((f,o)=>new Date(o.created_at)-new Date(f.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:c}})();(function(){function c(e){function n(o){return Number(o.quantity_on_hand)<=Number(o.reorder_point)}function t(){return e.getParts().filter(n)}function r(o){let i=e.getPartSearchQuery().trim().toLowerCase();return i?o.some(l=>String(l??"").toLowerCase().includes(i)):!0}function s(){let o=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:r([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...o].sort((i,l)=>{let d=String(i.supplier_name||"zzzzzz").localeCompare(String(l.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return d||String(i.name||"").localeCompare(String(l.name||""),void 0,{sensitivity:"base"})}):o}function f(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(o=>String(o.supplier_name||"").trim()).filter(Boolean))].sort((o,i)=>o.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:r,partSourceOptions:f}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:c}})();(function(){function c(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(r=>r.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function r(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,l=e.getRequestViewFilter()){return l==="converted"?r(i):l==="all"?!0:!r(i)&&i.status==="submitted"}function f(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(l=>t(l)&&s(l,i))}function o(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:r,requestMatchesViewFilter:s,filteredRequests:f,requestFilterCounts:o}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:c}})();(function(){function c(){function e(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return r.length?`This equipment is kept for traceability because it has ${r.join(", ")}.`:""}function n(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return r.length?`This procedure is kept for traceability because it is linked to ${r.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:c}})();(function(){function c(e){function n(f){return e.getAssets().find(o=>o.id===f?.parent_asset_id)||null}function t(f){return e.getAssets().filter(o=>o.parent_asset_id===f).sort((o,i)=>o.name.localeCompare(i.name))}function r(f,o){if(!f||!o)return!1;let i=e.getAssets().find(d=>d.id===f),l=new Set;for(;i?.parent_asset_id&&!l.has(i.id);){if(i.parent_asset_id===o)return!0;l.add(i.id),i=e.getAssets().find(d=>d.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(f=>!e.matchesActiveLocation(f)||e.getAssetStatusFilter()!=="all"&&f.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(f.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(f.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([f.name,f.asset_code,f.manufacturer,f.model,f.location,f.status,f.asset_type,n(f)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:r}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:c}})();var Li=B(qn());(function(){function c(e){function n(r){let s=e.getSearchQuery().trim().toLowerCase();return s?r.some(f=>String(f??"").toLowerCase().includes(s)):!0}function t(r,s=e.getSearchQuery()){let f=s.trim().toLowerCase();return f?r.some(o=>String(o??"").toLowerCase().includes(f)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:c}})();(function(){function c(e){function n(o){return o.due_at?new Date(`${o.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(o){return{low:1,medium:2,high:3,critical:4}[o]||0}function r(o){return o.completed_at?new Date(o.completed_at).getTime():0}function s(o){return typeof e.assignmentLabel=="function"?e.assignmentLabel(o):o.assigned_profile?.full_name||o.assigned_to||"Unassigned"}function f(o,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?r(i)-r(o)||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="due"?n(o)-n(i)||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(o.priority)||n(o)-n(i):e.getWorkSort()==="type"?String(o.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="assigned"?s(o).localeCompare(s(i))||new Date(i.created_at)-new Date(o.created_at):new Date(i.created_at)-new Date(o.created_at)}return{compareWorkOrders:f,dueSortValue:n,prioritySortValue:t,completedSortValue:r,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:c}})();(function(){function c(e){function n(r){return r?.location_id||r?.assets?.location_id||null}function t(r){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(r)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(l=>(i==="all"||i==="unread"&&s(l.id)>0||l.thread_type===i)&&e.matchesQuery(r(l),e.getMessageSearchQuery()))}function r(i){let l=e.getMessagesByThreadId()[i.id]||[],d=e.getMessageThreadMembers().filter(m=>m.thread_id===i.id).map(m=>e.teamMemberName(m.user_id));return[i.title,e.messageThreadScopeLabel(i),...d,...l.map(m=>m.body||"")]}function s(i){let l=e.getMessageReadsByThreadId()[i]?.last_read_at,d=l?new Date(l).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(m=>m.sender_id===e.getCurrentUser()?.id?!1:new Date(m.created_at).getTime()>d).length}function f(){return e.getMessageThreads().reduce((i,l)=>i+s(l.id),0)}function o(){return e.getMessageThreads().filter(i=>i.thread_type==="direct").reduce((i,l)=>i+s(l.id),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:r,unreadMessageCount:s,totalUnreadMessages:f,directUnreadMessages:o}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let r=e.getActiveStatusFilter();return r==="overdue"?e.getDueState(t)?.className==="overdue":r==="completed_month"?e.isCompletedThisMonth(t):r==="completed_week"?e.isCompletedThisWeek(t):r==="active"||r==="all"?t.status!=="completed":t.status===r}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let r=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],f=e.getEventsByWorkOrder()[t.id]||[],o=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(m=>m.id===t.procedure_template_id),l=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),d=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,d[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(m=>[m.prompt,m.step_type]),...r.flatMap(m=>[m.parts?.name,m.parts?.sku,m.parts?.supplier_name,m.quantity_used,m.unit_cost]),...s.flatMap(m=>[m.body,d[m.author_id]?.full_name]),...f.flatMap(m=>[m.event_type,m.summary,d[m.actor_id]?.full_name]),...o.flatMap(m=>[m.file_name,m.original_file_name,m.content_type]),...l.flatMap(m=>[m.value,m.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:c}})();(function(){function c(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(r=>e.matchesActiveLocation(r)?(e.getMyWorkFilter()==="created"?r.created_by===t:e.isWorkOrderAssignedToUser(r,t))&&e.matchesSearch(e.workOrderSearchValues(r)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])||String(t?.message||"").includes("message_threads")?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:c}})();var Yi=B(Cn()),Ki=B($n()),Ji=B(Pn()),Zi=B(An()),Xi=B(Rn()),es=B(En()),ts=B(On()),ns=B(Wn());(function(){function c(t){if(!t)return"";let r=new Date(t),s=new Date,f=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),o=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),i=r.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return o===f?`Today ${i}`:o===f-864e5?`Yesterday ${i}`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let r=new Date(t),s=new Date,f=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),o=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime();return o===f?"Today":o===f-864e5?"Yesterday":r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let r=String(t||"").trim().split(/\s+/).filter(Boolean);return r.length?r.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:c,formatMessageDay:e,initials:n})})();(function(){function c(e){function n(r){let s=r.sender_id===e.getCurrentUserId(),f=e.teamMemberName(r.sender_id);return`
    <article class="message-bubble ${s?"mine":""}">
      <span class="message-avatar" aria-hidden="true">${e.escapeHtml(e.initials(f))}</span>
      <div class="message-bubble-meta">
        <strong>${e.escapeHtml(f)}</strong>
        <span>${e.escapeHtml(e.formatMessageTime(r.created_at))}</span>
      </div>
      <p>${e.escapeHtml(r.body)}</p>
      ${s?`<button class="message-delete-button" data-delete-message="${e.escapeHtml(r.id)}" type="button">Delete</button>`:""}
    </article>
  `}function t(r){let s=r.filter(o=>!o.deleted_at);if(!s.length)return'<p class="muted">No messages yet.</p>';let f="";return s.map(o=>{let i=e.formatMessageDay(o.created_at),l=i!==f?`<div class="message-day-divider"><span>${e.escapeHtml(i)}</span></div>`:"";return f=i,`${l}${n(o)}`}).join("")}return Object.freeze({renderMessageBubble:n,renderMessageList:t})}window.MaintainOpsMessageDisplay=Object.freeze({createMessageDisplayHelpers:c})})();})();
//# sourceMappingURL=runtime.780c09280a.js.map
