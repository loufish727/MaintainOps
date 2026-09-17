(()=>{var Rn=Object.create;var St=Object.defineProperty;var En=Object.getOwnPropertyDescriptor;var On=Object.getOwnPropertyNames;var Wn=Object.getPrototypeOf,xn=Object.prototype.hasOwnProperty;var U=(c,e)=>()=>{try{return e||c((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Mn=(c,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of On(e))!xn.call(c,a)&&a!==n&&St(c,a,{get:()=>e[a],enumerable:!(t=En(e,a))||t.enumerable});return c};var Q=(c,e,n)=>(n=c!=null?Rn(Wn(c)):{},Mn(e||!c||!c.__esModule?St(n,"default",{value:c,enumerable:!0}):n,c));var qt=U((Tn,De)=>{(function(){let c=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,a=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},m=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),o=m(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:o,workspaceLoadPending:!1,workspaceLoadWasHidden:a?.visibilityState==="hidden",navigationStartedAt:m(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},l=new Map,u=0;function d(W){if(W==null||W==="")return null;let w=Number(W);return Number.isFinite(w)&&w>=0?w:null}function r(){let W=s.connection||s.mozConnection||s.webkitConnection,w=t?.matchMedia?.("(pointer: coarse)")?.matches,P=d(s.deviceMemory),R=d(s.hardwareConcurrency),O=P!==null&&P<=4||R!==null&&R<=4||w?"constrained":"standard",q=d(t?.innerWidth);return{source:"browser",device_tier:O,viewport_class:q!==null&&q<720?"mobile":q!==null&&q<1100?"tablet":"desktop",connection_type:String(W?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!W?.saveData}}function p(W={}){let w={...r(),measurement_version:n,...W};return Object.fromEntries(Object.entries(w).filter(([,P])=>P!=null&&P!==""))}function g(W=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},W))}function f(W,w,P={},R={}){if(!c.has(W))return!1;let O=d(w);if(O===null)return!1;let q=Number(O.toFixed(W==="cls"?4:2));return i.latest[W]={metric:W,value:q,unit:e[W],context:p(P),measuredAt:new Date().toISOString()},R.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:W,value:q,unit:e[W],context:p(P)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(R.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let W=i.companyId,w=i.pending.splice(0,20),P=null;try{P=(await i.client.rpc("record_app_performance_samples",{target_company_id:W,samples:w})).error||null}catch(O){P=O}if(!P)return i.pending.length&&g(1e3),!0;i.companyId===W&&i.pending.unshift(...w);let R=String(P.message||P).toLowerCase();return i.disabledUntil=Date.now()+(R.includes("could not find")||R.includes("does not exist")?3e5:6e4),!1}function y({client:W,companyId:w}){if(i.client=W||null,i.companyId=w||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,f("session_start",1,{source:"workspace"},{immediate:!0});let P=s.connection||s.mozConnection||s.webkitConnection;d(P?.downlink)!==null&&f("connection_downlink_mbps",P.downlink,{source:"browser-estimate"}),d(P?.rtt)!==null&&f("connection_rtt_ms",P.rtt,{source:"browser-estimate"})}g(250)}}function b(){i.workspaceStartedAt=m(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=a?.visibilityState==="hidden"}function k(W){if(!W)return;if(i.workspaceCompanies.has(W)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(W);let w=!i.workspaceLoadWasHidden&&a?.visibilityState!=="hidden";f("workspace_ready_ms",m()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:w}),i.workspaceLoadPending=!1,i.latest.cls||f("cls",u,{source:"performance-observer"},{persist:!1}),w&&t?.setTimeout?.(()=>A(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function A(W=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let w=new Set(W);Object.values(i.latest).filter(P=>w.has(P.metric)).forEach(P=>{let R=P.metric==="inp_ms";(R?i.lastPersistedInpValue===P.value:i.persistedVitals.has(P.metric))||f(P.metric,P.value,{source:"performance-observer"})&&(R?i.lastPersistedInpValue=P.value:i.persistedVitals.add(P.metric))})}function $(W=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,A(["inp_ms"])},W))}function E(){i.navigationStartedAt=m()}function C(W){let w=Number(W);return a?.visibilityState==="hidden"||Number.isFinite(w)&&i.lastHiddenAt>=w}function v(W,w=i.navigationStartedAt){f("section_navigation_ms",m()-w,{source:String(W||"workspace").slice(0,48)},{persist:!C(w)})}function S(W,w,P=null){f("query_latency_ms",m()-w,{source:String(W||"query").slice(0,48)},{persist:!C(w)}),P&&f("client_error",1,{source:`query:${String(W||"unknown").slice(0,36)}`},{immediate:!0})}function _(W={}){let w={source:"performance-room",quality_tier:W.qualityTier||"unknown"};Object.entries({spatial_ready_ms:W.readyMs,spatial_fps:W.fps,spatial_frame_ms:W.frameMs,spatial_slow_frame_pct:W.slowFramePercent,spatial_draw_calls:W.drawCalls,spatial_triangles:W.triangles,spatial_geometries:W.geometries,spatial_textures:W.textures,webgl_context_loss:Number(W.contextLosses)>0?W.contextLosses:void 0}).forEach(([P,R])=>{d(R)!==null&&f(P,R,w)}),g(500)}function D(){return{latest:{...i.latest},connection:r(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function N(W,w,P={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(W)))try{new PerformanceObserver(O=>w(O.getEntries())).observe({type:W,...P})}catch{}}N("paint",W=>{let w=W.find(P=>P.name==="first-contentful-paint");w&&f("fcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),N("largest-contentful-paint",W=>{let w=W.at(-1);w&&f("lcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),N("layout-shift",W=>{W.forEach(w=>{w.hadRecentInput||(u+=w.value)}),f("cls",u,{source:"performance-observer"},{persist:!1})}),N("event",W=>{W.forEach(P=>{P.interactionId&&l.set(P.interactionId,Math.max(l.get(P.interactionId)||0,P.duration))});let w=[...l.values()].sort((P,R)=>R-P);w.length&&(f("inp_ms",w[Math.min(Math.floor(w.length/50),10)],{source:"performance-observer"},{persist:!1}),$())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>f("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>f("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=m(),f("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&f("reconnect_ms",m()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),a?.addEventListener?.("visibilitychange",()=>{a.visibilityState==="hidden"&&(i.lastHiddenAt=m(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),A(),h())});let T={beginWorkspaceLoad:b,configure:y,flush:h,markNavigationStart:E,markWorkspaceReady:k,record:f,recordQueryLatency:S,recordSectionNavigation:v,recordSpatial:_,snapshot:D};typeof window<"u"&&(window.MaintainOpsAppTelemetry=T),typeof De<"u"&&(De.exports=T)})()});var Ct=U((In,Te)=>{(function(){function c(n){return n?.user?.id||""}function e(n,t,a){let s=String(n||"");return!(!c(t)&&!c(a)||s==="TOKEN_REFRESHED"&&c(t)&&c(t)===c(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Te<"u"&&(Te.exports={shouldRenderForAuthEvent:e})})()});var $t=U((Fn,Ie)=>{(function(){let c={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(o,i,l){if(!o||!o.getItem)return l;let u=o.getItem(i);return u??l}function n(o,i){let l=Number(e(o,i,"1"));return Number.isFinite(l)&&l>0?l:1}function t(o,i,l){!o||!o.setItem||o.setItem(i,String(l))}function a(o,i){try{let l=JSON.parse(e(o,i,"{}"));return l&&typeof l=="object"&&!Array.isArray(l)?l:{}}catch{return{}}}function s(o,i){!o||!o.removeItem||o.removeItem(i)}function m(o={}){let i=o.storage||localStorage,l={activeSection:e(i,c.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,c.activeMessageThreadId,""),searchQuery:e(i,c.searchQuery,""),workOrderSearchMode:e(i,c.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,c.messageThreadFilter,"all"),messageThreadsPage:n(i,c.messageThreadsPage),messageSearchQuery:e(i,c.messageSearchQuery,""),messageComposerWorkOrderId:e(i,c.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,c.managerDashboardUserId,""),managerDashboardMetric:e(i,c.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,c.myWorkFilter,"assigned"),workOrderFilter:e(i,c.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,c.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,c.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,c.workOrderPriorityFilter,"all"),workSort:e(i,c.workSort,"newest"),workGroup:e(i,c.workGroup,"none"),requestViewFilter:e(i,c.requestViewFilter,"active"),workOrderPage:n(i,c.workOrderPage),partsPage:n(i,c.partsPage),assetsPage:n(i,c.assetsPage),financialPage:n(i,c.financialPage),financialMissingFilter:e(i,c.financialMissingFilter,"all"),financialLocationFilter:e(i,c.financialLocationFilter,"all"),financialTypeFilter:e(i,c.financialTypeFilter,"all"),financialAreaFilter:e(i,c.financialAreaFilter,"all"),requestsPage:n(i,c.requestsPage),planningOverduePage:n(i,c.planningOverduePage),planningTodayPage:n(i,c.planningTodayPage),planningSoonPage:n(i,c.planningSoonPage),planningNoDuePage:n(i,c.planningNoDuePage),planningFollowUpPage:n(i,c.planningFollowUpPage),planningPmPage:n(i,c.planningPmPage),planningGroupOpen:a(i,c.planningGroupOpen),schedulesPage:n(i,c.schedulesPage),proceduresPage:n(i,c.proceduresPage),membersPage:n(i,c.membersPage),assetStatusFilter:e(i,c.assetStatusFilter,"all"),assetTypeFilter:e(i,c.assetTypeFilter,"all"),assetAreaFilter:e(i,c.assetAreaFilter,"all"),partInventoryFilter:e(i,c.partInventoryFilter,"all"),partSort:e(i,c.partSort,"default"),partSearchQuery:e(i,c.partSearchQuery,"")};e(i,c.sectionSplitDone,"")!=="true"&&l.activeSection==="work"&&(l.activeSection="mywork",t(i,c.activeSection,l.activeSection),t(i,c.sectionSplitDone,"true")),l.activeSection==="performance"&&(l.activeSection="mywork",t(i,c.activeSection,l.activeSection));let u=(r,p,g)=>{l[r]=p,g&&t(i,g,p)},d=(r,p)=>{u(r,1,p)};return{getActiveSection:()=>l.activeSection,setActiveSection:r=>u("activeSection",r,c.activeSection),getActiveWorkOrderId:()=>l.activeWorkOrderId,setActiveWorkOrderId:r=>u("activeWorkOrderId",r),getActiveAssetId:()=>l.activeAssetId,setActiveAssetId:r=>u("activeAssetId",r),getActivePartId:()=>l.activePartId,setActivePartId:r=>u("activePartId",r),getActiveMessageThreadId:()=>l.activeMessageThreadId,setActiveMessageThreadId:r=>u("activeMessageThreadId",r,c.activeMessageThreadId),getMessageThreadFilter:()=>l.messageThreadFilter,setMessageThreadFilter:r=>u("messageThreadFilter",r,c.messageThreadFilter),getMessageThreadsPage:()=>l.messageThreadsPage,setMessageThreadsPage:r=>u("messageThreadsPage",r,c.messageThreadsPage),resetMessageThreadsPage:()=>d("messageThreadsPage",c.messageThreadsPage),getMessageSearchQuery:()=>l.messageSearchQuery,setMessageSearchQuery:r=>u("messageSearchQuery",r,c.messageSearchQuery),getMessageComposerWorkOrderId:()=>l.messageComposerWorkOrderId,setMessageComposerWorkOrderId:r=>u("messageComposerWorkOrderId",r,c.messageComposerWorkOrderId),getMessageComposerOpen:()=>l.messageComposerOpen,setMessageComposerOpen:r=>u("messageComposerOpen",!!r),getManagerDashboardUserId:()=>l.managerDashboardUserId,setManagerDashboardUserId:r=>u("managerDashboardUserId",r||"",c.managerDashboardUserId),getManagerDashboardMetric:()=>l.managerDashboardMetric,setManagerDashboardMetric:r=>u("managerDashboardMetric",r||"open",c.managerDashboardMetric),getSearchQuery:()=>l.searchQuery,setSearchQuery:r=>u("searchQuery",r,c.searchQuery),getWorkOrderSearchMode:()=>l.workOrderSearchMode,setWorkOrderSearchMode:r=>u("workOrderSearchMode",!!r,c.workOrderSearchMode),getActiveStatusFilter:()=>l.activeStatusFilter,setActiveStatusFilter:r=>u("activeStatusFilter",r),getMyWorkFilter:()=>l.myWorkFilter,setMyWorkFilter:r=>u("myWorkFilter",r,c.myWorkFilter),getWorkOrderFilter:()=>l.workOrderFilter,setWorkOrderFilter:r=>u("workOrderFilter",r,c.workOrderFilter),getWorkOrderAssigneeFilter:()=>l.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:r=>{u("workOrderAssigneeFilter",r),r?t(i,c.workOrderAssigneeFilter,r):s(i,c.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>l.workOrderTypeFilter,setWorkOrderTypeFilter:r=>u("workOrderTypeFilter",r||"all",c.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>l.workOrderPriorityFilter,setWorkOrderPriorityFilter:r=>u("workOrderPriorityFilter",r||"all",c.workOrderPriorityFilter),getWorkSort:()=>l.workSort,setWorkSort:r=>u("workSort",r,c.workSort),getWorkGroup:()=>l.workGroup,setWorkGroup:r=>u("workGroup",r||"none",c.workGroup),getRequestViewFilter:()=>l.requestViewFilter,setRequestViewFilter:r=>u("requestViewFilter",r,c.requestViewFilter),getWorkOrderPage:()=>l.workOrderPage,setWorkOrderPage:r=>u("workOrderPage",r,c.workOrderPage),resetWorkOrderPage:()=>d("workOrderPage",c.workOrderPage),getPartsPage:()=>l.partsPage,setPartsPage:r=>u("partsPage",r,c.partsPage),resetPartsPage:()=>d("partsPage",c.partsPage),getAssetsPage:()=>l.assetsPage,setAssetsPage:r=>u("assetsPage",r,c.assetsPage),resetAssetsPage:()=>d("assetsPage",c.assetsPage),getFinancialPage:()=>l.financialPage,setFinancialPage:r=>u("financialPage",r,c.financialPage),resetFinancialPage:()=>d("financialPage",c.financialPage),getFinancialMissingFilter:()=>l.financialMissingFilter,setFinancialMissingFilter:r=>u("financialMissingFilter",r||"all",c.financialMissingFilter),getFinancialLocationFilter:()=>l.financialLocationFilter,setFinancialLocationFilter:r=>u("financialLocationFilter",r||"all",c.financialLocationFilter),getFinancialTypeFilter:()=>l.financialTypeFilter,setFinancialTypeFilter:r=>u("financialTypeFilter",r||"all",c.financialTypeFilter),getFinancialAreaFilter:()=>l.financialAreaFilter,setFinancialAreaFilter:r=>u("financialAreaFilter",r||"all",c.financialAreaFilter),getRequestsPage:()=>l.requestsPage,setRequestsPage:r=>u("requestsPage",r,c.requestsPage),resetRequestsPage:()=>d("requestsPage",c.requestsPage),getPlanningPage:r=>r==="overdue"?l.planningOverduePage:r==="today"?l.planningTodayPage:r==="soon"?l.planningSoonPage:r==="no-due"?l.planningNoDuePage:r==="follow-up"?l.planningFollowUpPage:r==="pm"?l.planningPmPage:1,setPlanningPage:(r,p)=>{r==="overdue"&&u("planningOverduePage",p,c.planningOverduePage),r==="today"&&u("planningTodayPage",p,c.planningTodayPage),r==="soon"&&u("planningSoonPage",p,c.planningSoonPage),r==="no-due"&&u("planningNoDuePage",p,c.planningNoDuePage),r==="follow-up"&&u("planningFollowUpPage",p,c.planningFollowUpPage),r==="pm"&&u("planningPmPage",p,c.planningPmPage)},getPlanningGroupOpen:(r,p=!1)=>Object.prototype.hasOwnProperty.call(l.planningGroupOpen,r)?!!l.planningGroupOpen[r]:!!p,setPlanningGroupOpen:(r,p)=>{l.planningGroupOpen={...l.planningGroupOpen,[r]:!!p},t(i,c.planningGroupOpen,JSON.stringify(l.planningGroupOpen))},getSchedulesPage:()=>l.schedulesPage,setSchedulesPage:r=>u("schedulesPage",r,c.schedulesPage),resetSchedulesPage:()=>d("schedulesPage",c.schedulesPage),getProceduresPage:()=>l.proceduresPage,setProceduresPage:r=>u("proceduresPage",r,c.proceduresPage),resetProceduresPage:()=>d("proceduresPage",c.proceduresPage),getMembersPage:()=>l.membersPage,setMembersPage:r=>u("membersPage",r,c.membersPage),resetMembersPage:()=>d("membersPage",c.membersPage),getAssetStatusFilter:()=>l.assetStatusFilter,setAssetStatusFilter:r=>u("assetStatusFilter",r,c.assetStatusFilter),getAssetTypeFilter:()=>l.assetTypeFilter,setAssetTypeFilter:r=>u("assetTypeFilter",r,c.assetTypeFilter),getAssetAreaFilter:()=>l.assetAreaFilter,setAssetAreaFilter:r=>u("assetAreaFilter",r,c.assetAreaFilter),getPartInventoryFilter:()=>l.partInventoryFilter,setPartInventoryFilter:r=>u("partInventoryFilter",r,c.partInventoryFilter),getPartSort:()=>l.partSort,setPartSort:r=>u("partSort",r||"default",c.partSort),getPartSearchQuery:()=>l.partSearchQuery,setPartSearchQuery:r=>u("partSearchQuery",r,c.partSearchQuery),snapshot:()=>({...l})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:m},typeof Ie<"u"&&(Ie.exports={createWorkspaceUiState:m})})()});var Pt=U((Ln,be)=>{(function(){function c(a){return!!String(a?.production_action||"").trim()}function e(a){return c(a)&&a?.production_action_status==="open"}function n(a,s){return!a||!s?!1:a.assigned_to===s||e(a)&&a.production_action_assigned_to===s}function t(a){return e(a)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:c,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof be<"u"&&be.exports&&(be.exports={hasProductionAction:c,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var At=U((Nn,we)=>{(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",a=>a.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:c},typeof we<"u"&&we.exports&&(we.exports={bindWorkspaceProductionActionEvents:c})})()});var Rt=U((Un,Fe)=>{(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:c},typeof Fe<"u"&&(Fe.exports={bindWorkspaceWorkOrderNotificationEvents:c})})()});var Et=U((Qn,ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function a(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(l=>l.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(l=>{l.checked=i.target.checked})}async function m(i){i.preventDefault();let l=i.target,u=l.querySelector("button[type='submit']"),d=n.querySelector("#completion-error"),r=e.getActiveWorkOrderId(),p=e.getWorkOrderById(r),g=e.getProcedureById(p?.procedure_template_id),f=g?e.requiredChecklistProgress(p,g):{done:0,total:0},h=e.productionActionCompletionMessage?.(p)||"";if(h){d&&(d.textContent=h),e.setWorkOrderActionWarning(r,h),e.showNotice(h,"warning");return}if(f.done<f.total){d&&(d.textContent=`Complete required checklist steps first (${f.done}/${f.total}).`);return}let y=new t(l),b=y.get("safety_devices_checked")==="on"||a(r)||e.hasCompletedSafetyDeviceCheck(p);if(e.requiresSafetyDeviceCheck(p)&&!b){d&&(d.textContent="Check safety devices before completing equipment work.");return}u.disabled=!0,u.textContent="Completing...",d&&(d.textContent="");try{let k={status:"completed",asset_id:p?.asset_id||null,actual_minutes:Number(y.get("actual_minutes"))||0,failure_cause:y.get("failure_cause")||null,resolution_summary:y.get("resolution_summary")||null,follow_up_needed:y.get("follow_up_needed")==="on",completion_notes:y.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(k),e.applySafetyCheckPayload(k,k.safety_check_required&&b),delete k.asset_id;let{error:A}=await e.withOperationTimeout(e.updateWorkOrderSafely(k,r),"Complete work save timed out. Check your connection and try again.",2e4);if(A){d&&(d.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(A)}`);return}let $=await e.withOperationTimeout(e.recordWorkOrderEvent(r,"completed",y.get("resolution_summary")||y.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(E=>E);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order completed, but history did not update: ${$.message}`:"Work order completed.",$?"warning":"success"),await e.render()}catch(k){d?d.textContent=`Could not complete work order: ${k.message||k}`:e.alertRef(k.message||k)}finally{u.disabled=!1,u.textContent="Complete Work Order"}}function o(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",m),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(l=>{l.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:o,completeWorkOrder:m,currentSafetyCheckboxCheckedForWorkOrder:a,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:c},typeof ve<"u"&&ve.exports&&(ve.exports={createWorkspaceWorkOrderCompletionEvents:c})})()});var Ot=U((Bn,ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.URLRef||URL,a=e.BlobCtor||Blob,s=e.alertRef||alert,m=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,o=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:C=>String(C||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:C=>String(C||"corrective").replaceAll("_"," "),l={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function u(C){return(e.getAssetDocumentsByAssetId?.()[C]||[]).filter(v=>String(v.content_type||"").startsWith("image/")||v.document_type==="machine_photo"||v.document_type==="nameplate")}function d(C){return u(C).map(v=>v.original_file_name||v.file_name||v.storage_path||v.id).filter(Boolean).join("; ")}function r(C,v){return C?.parent_asset_id&&v.get(C.parent_asset_id)?.name||""}function p(C){return e.getLocations?.().find(v=>v.id===C)?.name||""}function g(C){if(!C)return"";let v=e.getProfilesByUserId?.()[C];return v?.full_name||v?.email||C}function f(C){return String(p(C.location_id)||C.location_id||C.location||"")}function h(C){return{id:`financial:${C.id}`,financialRecord:C,name:C.archived_asset_name||"Deleted equipment",asset_type:C.archived_asset_type||"machine",asset_code:C.archived_asset_code||"",manufacturer:C.archived_manufacturer||"",model:C.archived_model||"",location_id:C.archived_location_id||"",location:C.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(C=>!C.asset_id).map(h)]}function b(C,v,S){let _=f(C).localeCompare(f(v));if(_)return _;let D=(l[C.asset_type||"machine"]||999)-(l[v.asset_type||"machine"]||999);return D||String(r(C,S)).localeCompare(String(r(v,S)))||String(C.location||"").localeCompare(String(v.location||""))||String(C.name||"").localeCompare(String(v.name||""))}function k(){let C=e.getAssets().filter(m),v=new Map(C.map(S=>[S.id,S]));return[...C].sort((S,_)=>b(S,_,v)).map(S=>({equipment_type:o(S.asset_type),name:S.name,parent_equipment:r(S,v),serial_number:S.asset_code||"",manufacturer:S.manufacturer||"",model:S.model||"",picture_id:d(S.id),picture_count:u(S.id).length,picture_status:u(S.id).length?"attached":"missing",facility:p(S.location_id)||S.location_id||"",area_department:S.location||"",status:S.status}))}function A(){let C=y(),v=new Map(C.map(_=>[_.id,_])),S=e.getAssetFinancialsByAssetId?.()||{};return[...C].sort((_,D)=>b(_,D,v)).map(_=>{let D=_.financialRecord||S[_.id]||{};return{operational_status:_.financialRecord?"deleted":"active",equipment_type:o(_.asset_type),name:_.name,parent_equipment:r(_,v),facility:p(_.location_id)||_.location_id||"",area_department:_.location||"",serial_number:_.asset_code||"",manufacturer:_.manufacturer||"",model:_.model||"",picture_status:u(_.id).length?"attached":"missing",asset_tag:D.asset_tag||"",acquisition_date:D.acquisition_date||"",acquisition_cost:D.acquisition_cost||"",depreciation_method:D.depreciation_method||"",useful_life_years:D.useful_life_years||"",current_book_value:D.current_book_value||"",tax_jurisdiction:D.tax_jurisdiction||"",ownership_status:D.ownership_status||"",in_service_date:D.in_service_date||"",disposal_date:D.disposal_date||"",disposal_notes:D.disposal_notes||"",gl_account_code:D.gl_account_code||"",cost_center:D.cost_center||"",finance_notes:D.finance_notes||"",needs_review:!!D.needs_review,last_reviewed_at:D.last_reviewed_at||"",reviewed_by:g(D.reviewed_by)}})}function $(){let C={work:{filename:"work-orders.csv",rows:e.getWorkOrders().map(S=>({title:S.title,status:S.status,priority:S.priority,type:i(S.type),equipment:S.assets?.name||"",assigned_to:e.assignmentLabel(S),due_at:S.due_at||"",completed_at:S.completed_at||"",actual_minutes:S.actual_minutes||0,failure_cause:S.failure_cause||"",resolution_summary:S.resolution_summary||"",follow_up_needed:!!S.follow_up_needed}))},assets:{filename:"equipment.csv",rows:k()},financial:{filename:"equipment-financial.csv",rows:A()},requests:{filename:"maintenance-requests.csv",rows:e.getMaintenanceRequests().map(S=>({title:S.title,status:S.status,priority:S.priority,equipment:S.assets?.name||"",requested_by:e.getProfilesByUserId()[S.requested_by]?.full_name||"",created_at:S.created_at||"",converted_work_order_id:S.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(S=>({title:S.title,equipment:S.assets?.name||"",frequency:S.frequency,next_due_at:S.next_due_at,active:S.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(S=>({name:S.name,sku:S.sku||"",supplier_name:S.supplier_name||"",quantity_on_hand:S.quantity_on_hand,reorder_point:S.reorder_point,unit_cost:S.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(S=>({name:S.name,description:S.description||"",steps:S.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(S=>({user_id:S.user_id,name:e.getProfilesByUserId()[S.user_id]?.full_name||"",role:S.role}))}},v=C[e.getActiveSection()]||C.work;if(!v.rows.length)return s("Nothing to export in this section yet.");E(v.filename,v.rows)}function E(C,v){let S=Object.keys(v[0]),_=[S.join(","),...v.map(W=>S.map(w=>e.csvCell(W[w])).join(","))],D=new a([`\uFEFF${_.join(`
`)}`],{type:"text/csv;charset=utf-8"}),N=t.createObjectURL(D),T=n.createElement("a");T.href=N,T.download=C,n.body.appendChild(T),T.click(),T.remove(),t.revokeObjectURL(N)}return{downloadCsv:E,exportActiveSectionCsv:$}}typeof ke<"u"&&ke.exports&&(ke.exports={createCsvExportHelpers:c}),window.MaintainOpsCsvExport={createCsvExportHelpers:c}})()});var Wt=U((jn,Le)=>{(function(){function c(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let m=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');c(m)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:c},typeof Le<"u"&&(Le.exports={bindWorkspaceDatePickerControls:e,openDatePicker:c})})()});var xt=U((zn,Ne)=>{(function(){function c(e={}){let n=e.windowRef||window;function t(s){let m=String.fromCharCode(...s),o=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return o?o(m).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=c(),typeof Ne<"u"&&(Ne.exports={createPublicRequestTokenHelpers:c})})()});var Mt=U((Gn,Ue)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,a=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,m=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.createPublicRequestLink))}),typeof a=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(o=>{o.addEventListener("click",()=>a(o.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(o=>{o.addEventListener("click",()=>s(o.dataset.enablePublicRequestLink,!0))}),typeof m=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(o=>{o.addEventListener("click",()=>m(o.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:c},typeof Ue<"u"&&(Ue.exports={bindWorkspacePublicRequestLinkAdminEvents:c})})()});var Dt=U((Hn,Qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let m=a.querySelector?.("button[type='submit']");if(!m?.disabled){m&&(m.disabled=!0);try{let o=a.querySelector?.("[name='planning_due_at']");await t(a.dataset.planningDueForm,o?.value)}finally{m?.isConnected&&(m.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:c},typeof Qe<"u"&&(Qe.exports={bindWorkspacePlanningDueDateEvents:c})})()});var Tt=U((Vn,Be)=>{(function(){let c=new WeakSet;function e(a,s,m){if(!a)return;let o=a.querySelector("[data-equipment-choice-existing]"),i=a.querySelector("[data-equipment-choice-new]"),l=s==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(u=>{let d=u.value===(l?"new":"existing");u.checked=d,u.closest("label")?.classList.toggle("active",d)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(u=>{u.hidden=u.dataset.equipmentChoicePanel!==(l?"new":"existing")}),o&&(o.disabled=l,o.required=!l&&o.dataset.equipmentChoiceRequired==="true",l&&(o.value=""),typeof m=="function"&&m(o)),i&&(i.disabled=!l,i.required=l&&i.dataset.equipmentChoiceRequired==="true",l||(i.value=""))}function n(a,s){a.querySelectorAll("[data-equipment-choice]").forEach(m=>{let o=m.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(m,o,s)})}function t(a={}){let s=a.documentRef||document,m=a.updateAssetLocationWarning;n(s,m),!c.has(s)&&(c.add(s),s.addEventListener("change",o=>{let i=o.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,m);return}let l=o.target.closest?.("[data-equipment-choice-existing]");l&&typeof m=="function"&&m(l)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Be<"u"&&(Be.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var It=U((Yn,je)=>{(function(){function c(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:a,createQuickFixAsset:s,getMaintenanceRequests:m,getQuickFixRequestId:o,getActiveCompanyId:i,getSession:l,getParts:u,getRequestsReady:d,getSupabaseClient:r,confirmAssetLocationRouting:p,assetRequiresSafety:g,blocksProcedureCompletion:f,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:b,descriptionWithAssignmentNote:k,assignedUserFromForm:A,procedureColumn:$,workOrderDateValue:E,applySafetyRequirementPayload:C,applySafetyCheckPayload:v,insertWithOptionalProcedure:S,friendlyWorkOrderSaveError:_,addPartUsageToWorkOrder:D,addPhotoToWorkOrder:N,updateAssetStatus:T,recordWorkOrderEvent:W,setActiveWorkOrderIdState:w,setActiveAssetIdState:P,setCreateWorkOrderMode:R,setQuickFixMode:O,setQuickFixAssetId:q,setQuickFixRequestId:L,showNotice:F,render:j,alertUser:H=re=>window.alert(re)}=e;async function Z(re){re.preventDefault();let se=re.currentTarget,J=n.querySelector("#quick-fix-error"),ae=se.querySelector("button[type='submit']");J&&(J.textContent=""),ae&&(ae.disabled=!0,ae.textContent="Saving...");try{let z=new t(se),fe=String(z.get("title")||"").trim();if(!fe)throw new Error("Quick Fix issue is required.");let le=o(),M=i(),B=l(),G=String(z.get("description")||"").trim(),K=String(z.get("resolution_summary")||"").trim(),X=K||fe,Y=G||fe,V=z.get("mark_completed")==="on",ne=z.get("machine_down")==="on",ee=z.get("asset_id")||null,de=le?m().find(ce=>ce.id===le):null,oe=String(z.get("new_asset_name")||"").trim();if(ee&&oe)throw new Error("Choose existing equipment or create new equipment, not both.");if(oe){let{data:ce,error:me}=await a(s(oe,ne?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(me){J&&(J.textContent=me.message);return}ee=ce.id}if(!oe&&!p(ee,"logging this Quick Fix",J))return;if(V&&g(ee)&&z.get("safety_devices_checked")!=="on"){J&&(J.textContent="Check safety devices before marking equipment work complete.");return}let I=V?f(null,z.get("procedure_template_id")||null):"";if(I){h("",""),J&&(J.textContent=`${I} Log it first, then complete the checklist before marking it complete.`);return}let pe={company_id:M,location_id:y(ee),title:fe,description:b(k(Y,z.get("assigned_to")),de),asset_id:ee,assigned_to:A(z,B.user.id),priority:z.get("priority")||"medium",type:z.get("type")||"corrective",status:V?"completed":"open",due_at:E(z.get("due_at")),created_by:B.user.id,...$(z.get("procedure_template_id")),actual_minutes:0,failure_cause:z.get("failure_cause")||null,resolution_summary:V?X:K||null,follow_up_needed:z.get("follow_up_needed")==="on",completion_notes:V?X:null,completed_at:V?new Date().toISOString():null};C(pe),v(pe,V&&pe.safety_check_required&&z.get("safety_devices_checked")==="on");let{data:he,error:ue}=await a(S("work_orders",pe,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ue){J&&(J.textContent=`Could not log quick fix: ${_(ue)}`);return}let x=[],ie=z.get("part_id"),te=Number(z.get("quantity_used"))||1;if(ie){let ce=u().find(Me=>Me.id===ie),me=await a(D(he.id,ce,te),"Part usage save timed out.",12e3).catch(Me=>Me);me&&x.push(`part usage failed: ${me.message}`)}let ge=z.get("photo");if(ge&&ge.name){let ce=await a(N(he.id,ge),"Photo upload timed out.",25e3).catch(me=>me);ce&&x.push(`photo upload failed: ${ce.message}`)}let ye=ne?"offline":z.get("asset_status");if(pe.asset_id&&!oe&&(ne||V&&ye)){let ce=await a(T(pe.asset_id,ye),"Equipment status update timed out.",12e3).catch(me=>me);ce?x.push(`equipment status did not update: ${ce.message}`):await a(W(he.id,"asset_status_updated",ne?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(me=>x.push(`history did not update: ${me.message}`))}if(await a(W(he.id,"quick_fix",V?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ce=>x.push(`history did not update: ${ce.message}`)),oe&&await a(W(he.id,"equipment_created",`Equipment created from Quick Fix: ${oe}.`),"Activity log timed out.",8e3).catch(ce=>x.push(`history did not update: ${ce.message}`)),le&&d()){let ce=await a(r().from("maintenance_requests").update({status:"converted",reviewed_by:B.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:he.id}).eq("id",le).eq("company_id",M),"Request status update timed out.",12e3).catch(me=>({error:me}));ce.error?x.push(`request status did not update: ${ce.error.message}`):await a(W(he.id,"request_quick_fixed",V?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(me=>x.push(`history did not update: ${me.message}`))}w(he.id),P(null),R(!1),O(!1),q(null),L(null),F(x.length?`Quick Fix saved with warning: ${x[0]}`:"Quick Fix saved.",x.length?"warning":"success"),await j()}catch(z){J?J.textContent=`Could not log quick fix: ${z.message||z}`:H(z.message||z)}finally{ae&&ae.isConnected&&(ae.disabled=!1,ae.textContent="Log Quick Fix")}}return{createQuickFix:Z}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:c},typeof je<"u"&&(je.exports={createQuickFixWorkflow:c})})()});var Ft=U((Kn,ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function s(){let u=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),d=n.querySelector("#create-pm-form");d&&!u.includes(d)&&u.push(d),u.forEach(r=>r.addEventListener("submit",m))}async function m(u){u.preventDefault();let d=u.currentTarget,r=d.querySelector("button[type='submit']"),p=d.querySelector("[data-pm-error]")||n.querySelector("#pm-error");p&&(p.textContent=""),r&&(r.disabled=!0,r.textContent="Adding...");try{let g=new t(d);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",p))return;let{error:f}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(f)throw f;e.showNotice("PM schedule added."),await e.render()}catch(g){p?p.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{r&&(r.disabled=!1,r.textContent="Add Schedule")}}function o(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(d=>d.id===u)&&(e.setPendingDeleteScheduleId(u),e.renderWorkspace())}async function i(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(p=>p.id===u))return;let r=n.querySelector(`[data-confirm-delete-schedule="${a.escape(u)}"]`);r&&(r.disabled=!0,r.textContent="Deleting...");try{let{data:p,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!p?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let f=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(f.error)throw new Error(`PM schedule delete verification failed: ${f.error.message}`);if(f.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(p){e.showNotice(p.message||"Could not delete PM schedule.","warning"),r&&(r.disabled=!1,r.textContent="Permanently Delete")}}async function l(u){let d=e.getPreventiveSchedules().find(p=>p.id===u);if(!d)return;let r=n.querySelector(`[data-generate-pm="${a.escape(u)}"]`);r&&(r.disabled=!0,r.textContent="Generating...");try{let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(d.asset_id),asset_id:d.asset_id,title:d.title,description:`Generated from preventive schedule: ${d.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:d.next_due_at,...e.procedureColumn(d.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,!1);let{data:g,error:f}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"PM work order generation timed out.");if(f)throw f;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(d.next_due_at,d.frequency)}).eq("id",d.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(p){e.showNotice(`Could not generate PM work: ${p.message||p}`,"warning"),r&&(r.disabled=!1,r.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:m,requestDeletePreventiveSchedule:o,deletePreventiveSchedule:i,generatePreventiveWorkOrder:l}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:c},typeof ze<"u"&&(ze.exports={createPreventiveMaintenanceWorkflow:c})})()});var Lt=U((Jn,Ge)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function s(){let p=n.querySelector("#create-procedure-form");p&&p.addEventListener("submit",m);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",o),n.querySelectorAll("[data-add-step]").forEach(f=>{f.addEventListener("submit",i)})}async function m(p){p.preventDefault();let g=p.currentTarget,f=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let y=new t(g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(b)throw b;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{f&&(f.disabled=!1,f.textContent="Add Checklist")}}async function o(){let p=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(f=>f.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}p&&(p.disabled=!0,p.textContent="Adding sample...");try{let{data:f,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(k=>({...k,company_id:e.getActiveCompanyId(),procedure_template_id:f.id})),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(b)throw b;e.showNotice("Sample procedure checklist added."),await e.render()}catch(f){e.showNotice(`Could not add sample procedure: ${f.message||f}`,"warning")}finally{p&&(p.disabled=!1,p.textContent="Add sample inspection checklist")}}async function i(p){p.preventDefault();let g=p.currentTarget,f=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let y=new t(g),k=(e.getProcedureTemplates().find($=>$.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:k,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(A)throw A;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{f&&(f.disabled=!1,f.textContent="Add Step")}}async function l(p){let[g,f]=await Promise.all([u("work_orders",p),u("preventive_schedules",p)]);return{workOrders:g,schedules:f}}async function u(p,g){let{count:f,error:h}=await e.withOperationTimeout(e.supabaseClient().from(p).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${p}.`,15e3);if(h)throw new Error(`Could not verify linked ${p.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return f||0}async function d(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(f=>f.id===p))return;let g=n.querySelector(`[data-procedure-delete-error="${a.escape(p)}"]`);g&&(g.textContent="");try{let f=await l(p),h=e.procedureDeleteBlockerMessage(f);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(p),e.renderWorkspace()}catch(f){g?g.textContent=f.message||"Could not verify procedure links before delete.":e.showNotice(f.message||"Could not verify procedure links before delete.","warning")}}async function r(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===p))return;let f=n.querySelector(`[data-confirm-delete-procedure="${a.escape(p)}"]`),h=n.querySelector(`[data-procedure-delete-error="${a.escape(p)}"]`);h&&(h.textContent=""),f&&(f.disabled=!0,f.textContent="Deleting...");try{let y=await l(p),b=e.procedureDeleteBlockerMessage(y);if(b)throw new Error(b);let{data:k,error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(A)throw A;if(!k?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let $=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if($.error)throw new Error(`Procedure checklist delete verification failed: ${$.error.message}`);if($.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let b=y.message||"Could not delete procedure.";e.showNotice(b,"warning"),h&&(h.textContent=b),f&&(f.disabled=!1,f.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:m,seedSampleProcedure:o,createProcedureStep:i,loadProcedureDeleteBlockers:l,countProcedureLinkedRows:u,requestDeleteProcedureTemplate:d,deleteProcedureTemplate:r}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:c},typeof Ge<"u"&&(Ge.exports={createProcedureWorkflow:c})})()});var Nt=U((Zn,He)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let f=n.querySelector("#add-member-form");f&&f.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach($=>{$.addEventListener("submit",m)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",o);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",u);let b=n.querySelector("#team-invite-form");b&&b.addEventListener("submit",i);let k=n.querySelector("#team-invite-link-form");k&&k.addEventListener("submit",d),n.querySelectorAll("[data-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId($.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>r($.dataset.confirmRevokeInviteLink))});let A=n.querySelector("#request-notification-recipient-form");A&&A.addEventListener("submit",p),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach($=>{$.addEventListener("click",()=>g($.dataset.deleteRequestNotificationRecipient))})}async function s(f){f.preventDefault();let h=f.currentTarget,y=new t(h),b=String(y.get("role")||"technician").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&b!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}k&&(k.disabled=!0,k.textContent="Adding...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:b}),"Team member save timed out.");if(A)throw A;await e.render()}catch(A){e.alertUser(A.message||A)}finally{k?.isConnected&&(k.disabled=!1,k.textContent="Add Member")}}async function m(f){f.preventDefault();let h=f.currentTarget,y=new t(h),b=String(y.get("role")||"").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}k&&(k.disabled=!0,k.textContent="Saving...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:b}),"Role save timed out. Check your connection and try again.",15e3);if(A)throw new Error(A.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":A.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(A){e.showNotice(`Could not save role: ${A.message||A}`,"warning")}finally{k&&(k.disabled=!1,k.textContent="Save Role")}}async function o(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#profile-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("full_name")||"").trim(),$=h.querySelector('input[name="mobile_tech"]'),E=$?$.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),b&&(b.disabled=!0,b.textContent="Saving...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:A,mobile_tech:E},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(C)throw e.isMissingColumnError(C,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):C;e.showNotice("Profile saved."),await e.render()}catch(C){y&&(y.textContent=C.message||"Could not save profile.")}finally{b&&(b.disabled=!1,b.textContent="Save Profile")}}async function i(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#team-invite-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}b&&(b.disabled=!0,b.textContent="Inviting...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(k.get("email")||"").trim(),invite_role:A,invite_default_location_id:k.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite")||e.isColumnSchemaError($,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):$;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch($){y&&(y.textContent=$.message||"Could not create invite.")}finally{b&&(b.disabled=!1,b.textContent="Create Invite")}}async function l(f){if(!(!f||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:f}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function u(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#password-change-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("password")||""),$=String(k.get("confirmPassword")||"");if(y&&(y.textContent=""),A.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(A!==$){y&&(y.textContent="Passwords do not match.");return}b&&(b.disabled=!0,b.textContent="Updating...");try{let{error:E}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:A}),"Password update timed out. Check your connection and try again.",15e3);if(E)throw E;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(E){y&&(y.textContent=E.message||"Could not update password.")}finally{b&&(b.disabled=!1,b.textContent="Update Password")}}async function d(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#team-invite-link-error"),b=h.querySelector("button[type='submit']"),k=new t(h),A=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let $="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(A==="admin"){let $="Admin join links are not allowed.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){let $="Managers can only create technician join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}b&&(b.disabled=!0,b.textContent="Creating...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:A,link_location_id:k.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite_link")||e.isColumnSchemaError($,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):$;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch($){let E=$.message||"Could not create join link.";e.setTeamInviteLinkError(E),y&&(y.textContent=E)}finally{b&&(b.disabled=!1,b.textContent="Create Join Link")}}async function r(f){if(!(!f||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:f}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function p(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#request-notification-recipient-error"),b=h.querySelector("button[type='submit']"),k=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let A="Only admins can change request email routing.";e.setRequestNotificationRecipientError(A),y&&(y.textContent=A);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}b&&(b.disabled=!0,b.textContent="Adding...");try{let A=String(k.get("email")||"").trim().toLowerCase(),{error:$}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:k.get("location_id")||null,email:A,label:String(k.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if($)throw e.isColumnSchemaError($,["request_notification_recipients"])||$.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):$;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(A){let $=A.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError($),y&&(y.textContent=$)}finally{b&&(b.disabled=!1,b.textContent="Add Recipient")}}async function g(f){if(!(!f||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",f),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:s,updateCompanyMemberRole:m,updateMyProfile:o,updateMyPassword:u,createTeamInvite:i,cancelTeamInvite:l,createTeamInviteLink:d,revokeTeamInviteLink:r,createRequestNotificationRecipient:p,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:c},typeof He<"u"&&(He.exports={createTeamWorkflow:c})})()});var Ut=U((Xn,Ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let l=n.querySelector("#location-form");l&&l.addEventListener("submit",m);let u=n.querySelector("#public-app-url-form");u&&u.addEventListener("submit",o)}async function s(i){i.preventDefault();let l=i.currentTarget,u=l.querySelector("button[type='submit']"),d=new t(l);u&&(u.disabled=!0,u.textContent="Saving...");try{let{error:r}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(d.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(r)throw r;e.showNotice("Company saved."),await e.render()}catch(r){e.showNotice(`Could not save company: ${r.message||r}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Save Company")}}async function m(i){i.preventDefault();let l=i.currentTarget,u=n.querySelector("#location-error"),d=l.querySelector("button[type='submit']"),r=String(new t(l).get("name")||"").trim();if(r){u&&(u.textContent=""),d&&(d.disabled=!0,d.textContent="Adding...");try{let{data:p,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),r),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(p.id),e.persistActiveLocationId(p.id),e.showNotice("Location added."),await e.render()}catch(p){u&&(u.textContent=p.message||"Could not add location.")}finally{d&&(d.disabled=!1,d.textContent="Add Location")}}}function o(i){i.preventDefault();let l=n.querySelector("#public-request-link-error"),u=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(l&&(l.textContent=""),!u){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let d=e.normalizePublicAppUrl(u);if(!d){l&&(l.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(d),e.storage.setItem("maintainops.publicAppUrl",d),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:s,createLocation:m,savePublicAppUrl:o}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:c},typeof Ve<"u"&&(Ve.exports={createCompanySettingsWorkflow:c})})()});var Qt=U((er,Ye)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.FormDataCtor||FormData,s=e.confirmUser||(r=>t.confirm(r));function m(){let r=n.querySelector("#app-issue-report-form");r&&r.addEventListener("submit",l),n.querySelectorAll("[data-app-issue-status]").forEach(p=>{p.addEventListener("submit",u)}),n.querySelectorAll("[data-delete-app-issue]").forEach(p=>{p.addEventListener("click",d)})}async function o(){let{data:r,error:p}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!p),e.setAppIssueReports(p?[]:r||[]),p)throw p}function i(r){let p=e.appIssueReportErrorState(r);return p.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),p.message}async function l(r){r.preventDefault();let p=r.currentTarget,g=n.querySelector("#app-issue-report-error"),f=p.querySelector("button[type='submit']"),h=new a(p);g&&(g.textContent=""),f&&(f.disabled=!0,f.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:b}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(b)throw b;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await o(),e.renderWorkspace()}catch(y){g&&(g.textContent=i(y))}finally{f?.isConnected&&(f.disabled=!1,f.textContent="Send Report")}}async function u(r){if(r.preventDefault(),!e.canManageTeam())return;let p=r.currentTarget,g=p.querySelector("button[type='submit']"),f=new a(p);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(f.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),p.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await o(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function d(r){if(r.preventDefault(),!e.canManageTeam())return;let p=r.currentTarget,g=p.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;p.disabled=!0;let f=p.textContent;p.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await o(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{p?.isConnected&&(p.disabled=!1,p.textContent=f||"Delete")}}return{bindAppIssueWorkflowEvents:m,reloadAppIssueReports:o,appIssueReportError:i,createAppIssueReport:l,updateAppIssueReportStatus:u,deleteAppIssueReport:d}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:c},typeof Ye<"u"&&(Ye.exports={createAppIssueWorkflow:c})})()});var Bt=U((tr,Ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.CSSRef||CSS;async function s(u){let d=n.querySelector("#public-request-link-error"),r=n.querySelector(`[data-create-public-request-link="${a.escape(u)}"]`);d&&(d.textContent=""),r&&(r.disabled=!0,r.textContent="Creating...");try{let{error:p}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:u}),"QR link save timed out. Check your connection and try again.",15e3);if(p)throw e.setPublicRequestLinksReady(!1),new Error(p.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":p.message);e.showNotice("Location request QR link ready."),await e.render()}catch(p){d&&(d.textContent=p.message||"Could not create QR request link.")}finally{r&&(r.disabled=!1,r.textContent="Create QR Link")}}async function m(u){if(!e.canAdministerPublicRequestLinks()){let r=n.querySelector("#public-request-link-error");r&&(r.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await o(u,!1)}async function o(u,d){if(!e.canAdministerPublicRequestLinks()){let r=n.querySelector("#public-request-link-error");r&&(r.textContent="Only admins can reactivate or disable posted QR request links.");return}await l(u,{is_active:!!d},d?"Request link reactivated.":"Request link disabled.")}async function i(u){if(!e.canAdministerPublicRequestLinks()){let r=n.querySelector("#public-request-link-error");r&&(r.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await l(u,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function l(u,d,r){let p=n.querySelector("#public-request-link-error");if(p&&(p.textContent=""),!e.canAdministerPublicRequestLinks()){p&&(p.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!u||!e.getActiveCompanyId()){p&&(p.textContent="Select a company before updating request links.");return}try{let{data:g,error:f}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...d,updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(f){p&&(p.textContent=f.message);return}if(!g?.length){p&&(p.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(r),await e.render()}catch(g){p&&(p.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:m,setPublicRequestLinkActive:o,regeneratePublicRequestLink:i,updatePublicRequestLink:l}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:c},typeof Ke<"u"&&(Ke.exports={createPublicRequestLinkWorkflow:c})})()});var jt=U((nr,Je)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let u=n.querySelector("#create-part-form");u&&u.addEventListener("submit",s),n.querySelectorAll("[data-restock-part]").forEach(d=>{d.addEventListener("submit",m)}),n.querySelectorAll("[data-use-part]").forEach(d=>{d.addEventListener("submit",o)}),n.querySelectorAll("[data-edit-part]").forEach(d=>{d.addEventListener("submit",i)}),n.querySelectorAll("[data-rename-part-source]").forEach(d=>{d.addEventListener("submit",l)})}async function s(u){u.preventDefault();let d=u.currentTarget,r=n.querySelector("#part-create-error"),p=d.querySelector("button[type='submit']"),g=new t(d);r&&(r.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");let f;try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!h.company_id)throw new Error("Choose a company before adding parts.");if(!h.name)throw new Error("Part name is required.");let y=new Promise((A,$)=>{f=setTimeout(()=>$(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:b,error:k}=await Promise.race([e.supabaseClient().from("parts").insert(h).select("id").single(),y]);if(clearTimeout(f),k&&e.isMissingColumnError(k,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(k&&e.isMissingColumnError(k,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(k)throw k;e.setActivePartId(b?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),d.reset(),await e.render()}catch(h){r&&(r.textContent=h.message||"Could not add part.")}finally{f&&clearTimeout(f),p&&p.isConnected&&(p.disabled=!1,p.textContent="Add Part")}}async function m(u){u.preventDefault();let d=u.target,r=d.querySelector("button[type='submit']"),p=e.getParts().find(h=>h.id===d.dataset.restockPart),g=Number(new t(d).get("quantity"))||0;if(!p||g<=0)return;let f=r?.textContent||"Restock";r&&(r.disabled=!0,r.textContent="Saving...");try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(p.quantity_on_hand)||0)+g}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()),"Part restock timed out. Check your connection and try again.",15e3);if(h)throw h;e.showNotice("Part restocked."),await e.render()}catch(h){e.showNotice(`Could not restock part: ${h.message||h}`,"warning")}finally{r&&(r.disabled=!1,r.textContent=f)}}async function o(u){u.preventDefault();let d=u.currentTarget,r=d.querySelector("button[type='submit']"),p=e.getParts().find(h=>h.id===d.dataset.usePart),g=Number(new t(d).get("quantity"))||0;if(!p||g<=0)return;let f=r?.textContent||"Use";r&&(r.disabled=!0,r.textContent="Saving...");try{let h=Number(p.quantity_on_hand)||0,y=Math.max(0,h-g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:y}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()),"Part use save timed out. Check your connection and try again.",15e3);if(b)throw b;e.showNotice("Part used."),await e.render()}catch(h){e.showNotice(`Could not use part: ${h.message||h}`,"warning")}finally{r&&(r.disabled=!1,r.textContent=f)}}async function i(u){u.preventDefault();let d=u.currentTarget,r=d.dataset.editPart,p=n.querySelector(`[data-part-edit-error="${r}"]`),g=d.querySelector("button[type='submit']"),f=new t(d);p&&(p.textContent="");let h=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let y={name:String(f.get("name")||"").trim(),sku:f.get("sku")||null,supplier_name:f.get("supplier_name")||null,machine_note:f.get("machine_note")||null,quantity_on_hand:Number(f.get("quantity_on_hand"))||0,reorder_point:Number(f.get("reorder_point"))||0,unit_cost:Number(f.get("unit_cost"))||0};try{if(!y.name)throw new Error("Part name is required.");let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(y).eq("id",r).eq("company_id",e.getActiveCompanyId()),"Part save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(b&&e.isMissingColumnError(b,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(b&&e.isMissingColumnError(b,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(b)throw b;e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(b){p&&(p.textContent=b.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=h)}}async function l(u){u.preventDefault();let d=u.currentTarget,r=n.querySelector("#part-source-error"),p=d.querySelector("button[type='submit']"),g=new t(d),f=String(g.get("old_source")||"").trim(),h=String(g.get("new_source")||"").trim();if(r&&(r.textContent=""),!!f){if(!e.getPartSuppliersReady()){r&&(r.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(f===h){r&&(r.textContent="Change the source name before saving.");return}p&&(p.disabled=!0,p.textContent="Renaming...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:h||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",f),"Part source rename timed out. Check your connection and try again.",15e3);if(y)throw e.isMissingColumnError(y,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?y.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(y){r&&(r.textContent=y.message||"Could not update part source.")}finally{p&&(p.disabled=!1,p.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:a,createPart:s,restockPart:m,usePartFromInventory:o,updatePart:i,renamePartSource:l}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:c},typeof Je<"u"&&(Je.exports={createPartInventoryWorkflow:c})})()});var zt=U((rr,_e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(m){m.preventDefault();let o=m.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#quick-update-error"),u=e.getWorkOrders().find(r=>r.id===e.getActiveWorkOrderId()),d=new t(o);i.disabled=!0,i.textContent="Saving...",l&&(l.textContent="");try{let r=d.get("asset_id")||null,p=String(d.get("new_asset_name")||"").trim();if(r&&p)throw new Error("Choose existing equipment or create new equipment, not both.");if(p){let{data:k,error:A}=await e.createQuickFixAsset(p,"running");if(A){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not add equipment: ${A.message}`);return}r=k.id}if(!p&&!e.confirmAssetLocationRouting(r,"saving this work update",l))return;let g={title:e.requiredText(d.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(u?.description||"",d.get("assigned_to")),asset_id:r,location_id:e.locationIdForAsset(r),due_at:e.workOrderDateValue(d.get("due_at")),status:d.get("status"),priority:d.get("priority"),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),resolution_summary:d.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let f=d.get("safety_devices_checked")==="on";if(g.status==="completed"&&u?.status!=="completed"){let k=e.productionActionCompletionMessage?.(u)||"";if(k){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),k),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=k);return}let A=e.blocksProcedureCompletion(u,g.procedure_template_id||null);if(A){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),A),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=A);return}if(e.applySafetyCheckPayload(g,f),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):u?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(f||e.hasCompletedSafetyDeviceCheck(u)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&d.get("machine_down")==="on"){let k=await e.updateAssetStatus(g.asset_id,"offline");k?y.push(`equipment status did not update: ${k.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let b=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(u,Object.fromEntries(d.entries()))),"Activity log timed out.",8e3).catch(k=>k);p&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${p}.`),"Activity log timed out.",8e3).catch(()=>null),b&&y.push(`history did not update: ${b.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(r){a.error("Quick update save failed",r),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not save update: ${r.message||r}`)}}return{updateWorkOrderQuickView:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderQuickUpdateWorkflow:c}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:c}})()});var Gt=U((ar,Se)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function m(C){return String(C.get("location_new")||C.get("location_existing")||C.get("location")||"").trim()||null}function o(){return e.getSession?.()?.user?.id||null}function i(C){return(e.getAssets?.()||[]).find(v=>v.id===C)||null}function l(C,v){if(!C)return[];let S={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(S).filter(_=>String(C[_]??"")!==String(v[_]??"")).map(_=>S[_])}function u(C){return e.isMissingColumnError(C,"manufacturer")||e.isMissingColumnError(C,"model")}async function d(C){C.preventDefault();let v=C.currentTarget,S=n.querySelector("#asset-create-error");S&&(S.textContent="");let _=v.querySelector("button[type='submit']"),D=_?.textContent||"Add Equipment",N=C.submitter?.dataset?.assetContinue==="true";_&&(_.disabled=!0,_.textContent="Saving...");try{let T=new t(v),W={company_id:e.getActiveCompanyId(),location_id:T.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(T.get("name"),"Equipment name"),asset_code:String(T.get("asset_code")||"").trim()||null,manufacturer:String(T.get("manufacturer")||"").trim()||null,model:String(T.get("model")||"").trim()||null,location:m(T),parent_asset_id:T.get("parent_asset_id")||null,asset_type:T.get("asset_type")||"machine",safety_devices_required:T.get("safety_devices_required")==="on",status:"running",created_by:o()},w=e.supabaseClient().from("assets").insert(W).select("id").single(),{data:P,error:R}=await e.withOperationTimeout(w,"Equipment save timed out. Check your connection and try again.",15e3);if(R&&e.isMissingColumnError(R,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(R&&e.isMissingColumnError(R,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(R&&u(R))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(R&&e.isAssetHierarchySchemaError(R))throw new Error(e.equipmentSchemaMessage(R));if(R)throw R;P?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(P.id,"created",`Created ${W.name}.`),N&&P?.id?(e.setActiveAssetId(P.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(T){S?S.textContent=T.message:a(T.message)}finally{_&&(_.disabled=!1,_.textContent=D)}}async function r(C){C.preventDefault();let v=C.currentTarget,S=n.querySelector("#asset-edit-error");S&&(S.textContent="");let _=v.querySelector("button[type='submit']"),D=_?.textContent||"Save Equipment";_&&(_.disabled=!0,_.textContent="Saving...");try{let N=new t(v),T=i(e.getActiveAssetId()),W={name:e.requiredText(N.get("name"),"Equipment name"),asset_code:String(N.get("asset_code")||"").trim()||null,manufacturer:String(N.get("manufacturer")||"").trim()||null,model:String(N.get("model")||"").trim()||null,location_id:N.get("location_id")||e.activeLocationDatabaseId(),location:m(N),parent_asset_id:N.get("parent_asset_id")||null,asset_type:N.get("asset_type")||"machine",safety_devices_required:N.get("safety_devices_required")==="on",status:N.get("status")},{error:w}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(W).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(w&&u(w))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(w&&e.isAssetHierarchySchemaError(w))throw new Error(e.equipmentSchemaMessage(w));if(w)throw w;let P=l(T,W);P.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${P.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(N){S?S.textContent=N.message:a(N.message)}finally{_&&(_.disabled=!1,_.textContent=D)}}async function p(C,v){let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:v}).eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!S&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(C,"status_changed",`Status changed to ${v}.`),S||null}async function g(C){C.preventDefault();let v=C.currentTarget,S=v.dataset.attachAssetPart,_=n.querySelector(`[data-asset-part-error="${s.escape(S)}"]`);_&&(_.textContent="");let D=v.querySelector("button[type='submit']"),N=D?.textContent||"Attach Part";D&&(D.disabled=!0,D.textContent="Attaching...");try{let T=new t(v),W=T.get("part_id");if(!W)throw new Error("Select a part to attach.");let w=Math.max(1,Number(T.get("quantity_recommended"))||1),P=String(T.get("note")||"").trim()||null,{error:R}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:S,part_id:W,quantity_recommended:w,note:P}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(R)throw e.isMissingTableError?.(R,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):R.code==="23505"?new Error("This part is already linked to this equipment."):R;e.showNotice("Part linked to equipment."),await e.render()}catch(T){_?_.textContent=T.message||"Could not link part to equipment.":e.showNotice(T.message||"Could not link part to equipment.","warning")}finally{D&&(D.disabled=!1,D.textContent=N)}}async function f(C){let v=n.querySelector("[data-asset-part-error]");v&&(v.textContent="");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingTableError?.(S,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):S;e.showNotice("Part link removed."),await e.render()}catch(S){v?v.textContent=S.message||"Could not remove linked part.":e.showNotice(S.message||"Could not remove linked part.","warning")}}function h(C){return{workOrders:e.getWorkOrders().filter(v=>v.asset_id===C).length,children:e.childAssetsFor(C).length,schedules:e.getPreventiveSchedules().filter(v=>v.asset_id===C).length,requests:e.getMaintenanceRequests().filter(v=>v.asset_id===C).length}}function y(C){let v=h(C);return Object.values(v).some(Boolean)}async function b(C){let[v,S,_]=await Promise.all([k("work_orders",C),k("preventive_schedules",C),k("maintenance_requests",C)]);return{workOrders:v,children:e.childAssetsFor(C).length,schedules:S,requests:_}}async function k(C,v){let{count:S,error:_}=await e.withOperationTimeout(e.supabaseClient().from(C).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",v),`Equipment delete check timed out while checking ${C}.`,15e3);if(_)throw new Error(`Could not verify linked ${C.replaceAll("_"," ")} before deleting equipment: ${_.message}`);return S||0}async function A(C){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");try{let S=await b(C),_=e.assetDeleteBlockerMessage(S);if(_){v&&(v.textContent=_);return}e.setPendingDeleteAssetId(C),e.renderWorkspace()}catch(S){v?v.textContent=S.message||"Could not verify equipment links before delete.":e.showNotice(S.message||"Could not verify equipment links before delete.","warning")}}async function $(C){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");let S=n.querySelector(`[data-confirm-delete-asset="${s.escape(C)}"]`);S&&(S.disabled=!0,S.textContent="Deleting...");try{let _=await b(C),D=e.assetDeleteBlockerMessage(_);if(D)throw new Error(D);let N=e.getAssetDocumentStoragePaths?.(C)||[];if(N.length){let W=await e.withOperationTimeout(e.removeAssetDocumentStorage(N),"Equipment file cleanup timed out.",15e3);if(W.error)throw new Error(`Could not remove equipment files: ${W.error.message}`)}let{error:T}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(T)throw new Error(T.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":T.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(_){v&&(v.textContent=_.message||"Could not delete equipment."),S&&(S.disabled=!1,S.textContent="Permanently Delete")}}async function E(C,v="running"){let S={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:C,asset_type:"machine",safety_devices_required:!0,status:v,created_by:o()},_=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(S).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return _.error&&e.isMissingColumnError(_.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(_,e.databaseSetupRequiredMessage("adding equipment in this location"))):_.error&&e.isMissingColumnError(_.error,"created_by")?e.withSetupError(_,"Run supabase/step-next-asset-events.sql before saving equipment history."):_.error&&e.isAssetHierarchySchemaError(_.error)?e.withSetupError(_,e.equipmentSchemaMessage(_.error).replace("saving","adding")):(!_.error&&_.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(_.data.id,"created",`Created ${C}.`),_)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:k,createAsset:d,createQuickFixAsset:E,deleteAsset:$,loadAssetDeleteBlockers:b,removeAssetPart:f,requestDeleteAsset:A,updateAsset:r,updateAssetStatus:p}}typeof Se<"u"&&Se.exports&&(Se.exports={createAssetWorkflow:c}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:c}})()});var Ht=U((or,qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function m(){let p=n.querySelector("#detail-panel");p.innerHTML=e.renderRequestFormContent()}async function o(p){p.preventDefault(),await i(p.target)}async function i(p){let g=n.querySelector("#request-error"),f=p.querySelector("button[type='submit']");g&&(g.textContent=""),f&&(f.disabled=!0,f.textContent="Submitting...");try{let h=new t(p),y=h.get("asset_id")||null,b=String(h.get("equipment_note")||"").trim();if(y&&b)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!b)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let k=b||e.assetNameFor?.(y)||"Saved equipment",A=e.requiredText(h.get("description"),"Request details"),$=e.requiredText(h.get("requester_name"),"Your name"),E={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${k}

${A}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:$};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:C,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(E).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(v)throw v;let S=h.get("photo"),_="";if(S&&S.name){let N=await e.addPhotoToMaintenanceRequest(C.id,S);N&&(_=` Photo did not upload: ${N.message||N}`)}let D=await e.notifyRequestEmailer(C.id);D?.error&&console.warn("Request email notification did not send",D.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${_}`,_?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{f&&(f.disabled=!1,f.textContent="Submit Request")}}async function l(p){let g=e.getMaintenanceRequests().find(h=>h.id===p);if(!g)return;let f=n.querySelector(`[data-convert-request="${s.escape(p)}"]`);f&&(f.disabled=!0,f.textContent="Converting...");try{let h={company_id:e.getActiveCompanyId(),location_id:g.location_id||e.locationIdForAsset(g.asset_id),title:g.title,description:e.descriptionWithRequestPhotoNote(g.description,g),asset_id:g.asset_id||null,priority:g.priority||"medium",type:"corrective",status:"open",created_by:e.getSession().user.id};e.applySafetyRequirementPayload(h),e.applySafetyCheckPayload(h,!1);let{data:y,error:b}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",h,{returnSingle:!0}),"Request conversion timed out. Check your connection and try again.",15e3);if(b)throw b;let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").update({status:"converted",reviewed_by:e.getSession().user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:y.id}).eq("id",p).eq("company_id",e.getActiveCompanyId()),"Request status update timed out. Check your connection and try again.",15e3);if(k)throw k;e.setActiveSection("work"),e.setActiveWorkOrderId(y.id),await e.withOperationTimeout(e.recordWorkOrderEvent(y.id,"request_converted","Request converted to work order."),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),f&&(f.disabled=!1,f.textContent="Convert to Work Order")}}function u(p){let g=e.getMaintenanceRequests().find(f=>f.id===p);g&&(e.setQuickFixRequestId(p),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function d(p){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===p)&&(e.setPendingDeleteRequestId(p),e.renderWorkspace())}async function r(p){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===p);if(!g)return;let f=n.querySelector(`[data-confirm-delete-request="${s.escape(p)}"]`);f&&(f.disabled=!0,f.textContent="Deleting...");try{if(g.photo_storage_path){let k=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(k.error)throw new Error(`Could not remove request photo: ${k.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let b=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(b.error)throw new Error(`Request delete verification failed: ${b.error.message}`);if(b.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),f&&(f.disabled=!1,f.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:l,createRequest:o,createRequestFromForm:i,deleteMaintenanceRequest:r,openQuickFixForRequest:u,renderRequestForm:m,requestDeleteMaintenanceRequest:d}}typeof qe<"u"&&qe.exports&&(qe.exports={createRequestLifecycleWorkflow:c}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:c}})()});var Vt=U((ir,Ce)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert;async function s(m){m.preventDefault();let o=m.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",l&&(l.textContent="");try{let u=new t(o),d=u.get("status")||"open",r=u.get("asset_id")||null,p=String(u.get("new_asset_name")||"").trim();if(r&&p)throw new Error("Choose existing equipment or create new equipment, not both.");if(p){let{data:E,error:C}=await e.createQuickFixAsset(p,"running");if(C){l&&(l.textContent=`Could not add equipment: ${C.message}`);return}r=E.id}if(!p&&!e.confirmAssetLocationRouting(r,"creating this work order",l))return;if(d==="completed"&&e.assetRequiresSafety(r)&&u.get("safety_devices_checked")!=="on"){l&&(l.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=d==="completed"?e.blocksProcedureCompletion(null,u.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),l&&(l.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let f={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(r),title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),asset_id:r,priority:u.get("priority"),type:u.get("type")||"corrective",due_at:e.workOrderDateValue(u.get("due_at")),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),status:d,created_by:e.getSession().user.id,actual_minutes:Number(u.get("actual_minutes"))||0,failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",completion_notes:u.get("completion_notes")||null,completed_at:d==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(f),e.applySafetyCheckPayload(f,d==="completed"&&f.safety_check_required&&u.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",f,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){l&&(l.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),p&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${p}.`);let b=[],k=u.get("part_id");if(k){let E=e.getParts().find(v=>v.id===k),C=await e.addPartUsageToWorkOrder(h.id,E,Number(u.get("quantity_used"))||1);C?b.push(`part usage failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${E?.name||"Part"}.`)}let A=u.get("photo");if(A&&A.name){let E=await e.addPhotoToWorkOrder(h.id,A);E?b.push(`photo upload failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${A.name}.`)}let $=String(u.get("initial_comment")||"").trim();if($){let E=await e.addCommentToWorkOrder(h.id,$);E?b.push(`comment failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(b.length?`Work order created with warning: ${b[0]}`:"Work order created.",b.length?"warning":"success"),await e.render()}catch(u){l?l.textContent=`Could not create work order: ${u.message||u}`:a(u.message||u)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderCreationWorkflow:c}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:c}})()});var Yt=U((sr,$e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(m){m.preventDefault();let i=m.target.querySelector("button[type='submit']"),l=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",l&&(l.textContent="");try{let u=new t(m.target),d=e.getActiveWorkOrderId(),r=e.getWorkOrders().find(E=>E.id===d),p=n.querySelector("#status-select")?.value||r?.status||"open",g=u.has("asset_id"),f=g?u.get("asset_id")||null:r?.asset_id||null;if(g&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(f,"saving this work order",l)){i.disabled=!1,i.textContent="Save Work Order";return}let h={title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),due_at:e.workOrderDateValue(u.get("due_at")),status:p,priority:u.get("priority"),type:u.get("type"),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",actual_minutes:Number(u.get("actual_minutes"))||0};if(g&&(h.asset_id=f,h.location_id=e.locationIdForAsset(f)),h.safety_check_required=e.assetRequiresSafety(f),h.status==="completed"){let E=e.productionActionCompletionMessage?.(r)||"";if(E){e.setWorkOrderActionWarning(d,E),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=E);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(r)&&u.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let y=(r?.procedure_template_id||"")!==(h.procedure_template_id||""),b=h.status==="completed"&&(r?.status!=="completed"||y)?e.blocksProcedureCompletion(r,h.procedure_template_id||null):"";if(b){e.setWorkOrderActionWarning(d,b),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=b);return}h.status==="completed"&&r?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(r)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):r?.status==="completed"&&h.safety_check_required&&u.has("safety_devices_checked")?e.applySafetyCheckPayload(h,u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(r)):r?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:k}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,d),"Work order save timed out. Check your connection and try again.",2e4);if(k){i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(k)}`);return}let A={...Object.fromEntries(u.entries()),status:p},$=await e.withOperationTimeout(e.recordWorkOrderEvent(d,"updated",e.describeWorkOrderChanges(r,A)),"Activity log timed out.",8e3).catch(E=>E);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order saved, but history did not update: ${$.message}`:"Work order saved.",$?"warning":"success"),await e.render()}catch(u){a.error("Work order save failed",u),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=`Could not save work order: ${u.message||u}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderDetailEditWorkflow:c}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:c}})()});var Kt=U((cr,Pe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function a(m){m.preventDefault();let o=m.currentTarget,i=n.querySelector("#parts-used-error"),l=o.querySelector("button[type='submit']");i&&(i.textContent=""),l&&(l.disabled=!0,l.textContent="Recording...");try{let u=new t(o),d=u.get("part_id"),r=Number(u.get("quantity_used"))||1,p=e.getParts().find(f=>f.id===d);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!p)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),p,r);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(u){i&&(i.textContent=u.message||"Could not record part used.")}finally{l&&(l.disabled=!1,l.textContent="Record Part Used")}}async function s(m,o,i){if(!o)return new Error("Choose a part first.");let{error:l}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:m,p_part_id:o.id,p_quantity:i}),"Part usage save timed out.");return l||null}return{addPartUsageToWorkOrder:s,recordPartUsed:a}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createPartUsageWorkflow:c}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:c}})()});var Jt=U((lr,Ae)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.consoleRef||console,m=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),o=25*1024*1024,i=5*1024*1024,l=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),u=new Set;async function d(w){w.preventDefault();let P=w.currentTarget,R=P.dataset.partDocument,O=n.querySelector(`[data-part-document-error="${R}"]`),q=P.querySelector("button[type='submit']"),L=new t(P),F=L.get("document"),j=h(L.get("document_type"));if(O&&(O.textContent=""),!e.getPartDocumentsReady()){O&&(O.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!F||!F.name){O&&(O.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(S(F)){O&&(O.textContent=_()),await $("part document",F,_());return}q&&(q.disabled=!0,q.textContent="Attaching...");let H=await C(F),Z=H.fileName||e.safeFileName(F.name||"part-file"),re=`${e.getActiveCompanyId()}/${R}/${a.randomUUID()}-${Z}`;try{let se=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,H.blob,{contentType:H.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(se.error)throw se.error;let J={company_id:e.getActiveCompanyId(),part_id:R,uploaded_by:e.getSession().user.id,storage_path:re,file_name:Z,content_type:H.contentType,document_type:j,file_size_bytes:H.blob.size||null,original_file_name:e.safeFileName(F.name||"part-file"),original_size_bytes:F.size||null},{error:ae}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(J),"Part file record save timed out. Check your connection and try again.",15e3);if(ae&&e.isColumnSchemaError(ae,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete J.document_type,delete J.file_size_bytes,delete J.original_file_name,delete J.original_size_bytes,ae=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(J),"Part file record retry timed out. Check your connection and try again.",15e3)).error),ae)throw await b("part-documents",re),e.isColumnSchemaError(ae,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?ae.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(se){await $("part document",F,se),O&&(O.textContent=se.message||"Could not attach file.")}finally{q&&(q.disabled=!1,q.textContent="Attach File")}}async function r(w){w.preventDefault();let P=w.currentTarget,R=P.dataset.assetDocument,O=n.querySelector(`[data-asset-document-error="${R}"]`),q=P.querySelector("button[type='submit']"),L=new t(P),F=L.get("document"),j=f(L.get("document_type"));if(O&&(O.textContent=""),!e.getAssetDocumentsReady?.()){O&&(O.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!F||!F.name){O&&(O.textContent="Choose a machine file first.");return}if(S(F)){O&&(O.textContent=_()),await $("equipment file",F,_());return}q&&(q.disabled=!0,q.textContent="Uploading...");let H=await C(F),Z=`${e.getActiveCompanyId()}/${R}/${a.randomUUID()}-${H.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(Z,H.blob,{contentType:H.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:se}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:R,uploaded_by:e.getSession().user.id,storage_path:Z,file_name:H.fileName,content_type:H.contentType,document_type:j,file_size_bytes:H.blob.size||null,original_file_name:e.safeFileName(F.name||"machine-photo"),original_size_bytes:F.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(se)throw await b("asset-documents",Z),e.isColumnSchemaError(se,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?se.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await $("equipment file",F,re),O&&(O.textContent=re.message||"Could not upload machine file.")}finally{q&&(q.disabled=!1,q.textContent="Attach Machine File")}}async function p(w,P){let R=n.querySelector("[data-asset-document-error]");if(R&&(R.textContent=""),!w||!P){let O="Missing machine file record. Refresh and try again.";R?R.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([P]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(q)throw q;e.showNotice("Machine file deleted."),await e.render()}catch(O){R?R.textContent=O.message||"Could not delete machine file.":e.showNotice(O.message||"Could not delete machine file.","warning")}}async function g(w,P){let R=n.querySelector("#photo-error");if(R&&(R.textContent=""),!w||!P){let O="Missing photo record. Refresh and try again.";R?R.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([P]),"Photo delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(q)throw q;let L=P.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${L}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(O){R?R.textContent=O.message||"Could not delete photo.":e.showNotice(O.message||"Could not delete photo.","warning")}}function f(w){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(w)?w:"other"}function h(w){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(w)?w:"other"}async function y(w){w.preventDefault();let P=w.currentTarget,R=P.querySelector("button[type='submit']"),O=n.querySelector("#photo-error");O&&(O.textContent="");let q=new t(P).get("photo");if(!q||!q.name){O&&(O.textContent="Choose a photo first.");return}let L=N(q);if(L){O&&(O.textContent=L),await $("work order photo",q,L);return}R.disabled=!0,R.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let j=await k(e.getActiveWorkOrderId(),q);if(j)throw j;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${q.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(F){await $("work order photo",q,F),O&&(O.textContent=`Could not upload photo: ${F.message||F}`)}finally{R.disabled=!1,R.textContent="Upload Photo"}}async function b(w,P){try{let{error:R}=await e.withOperationTimeout(e.supabaseClient().storage.from(w).remove([P]),"Uploaded file cleanup timed out.",1e4);R&&s.warn(`Could not remove uploaded ${w} object`,R)}catch(R){s.warn(`Could not remove uploaded ${w} object`,R)}}async function k(w,P){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let O=N(P);if(O)return await $("work order photo",P,O),new Error(O);let q=await C(P,E()),L=T(q);if(L)return await $("work order photo",P,L),new Error(L);let F=`${e.getActiveCompanyId()}/${w}/${a.randomUUID()}-${q.fileName}`,j=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(F,q.blob,{contentType:q.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(j.error)return await $("work order photo",P,j.error),j.error;let H={company_id:e.getActiveCompanyId(),work_order_id:w,uploaded_by:e.getSession().user.id,storage_path:F,file_name:q.fileName,content_type:q.contentType,file_size_bytes:q.blob.size||null,original_file_name:e.safeFileName(P.name||"photo"),original_size_bytes:P.size||null},{error:Z}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(H),"Photo record save timed out. Check your connection and try again.",15e3);return Z&&e.isColumnSchemaError(Z,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete H.file_size_bytes,delete H.original_file_name,delete H.original_size_bytes,Z=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(H),"Photo record retry timed out. Check your connection and try again.",15e3)).error),Z&&await b("work-order-photos",F),Z&&await $("work order photo",P,Z),Z||null}async function A(w,P){if(!w)return new Error("Request was not saved before photo upload.");let R=N(P);if(R)return await $("request photo",P,R),new Error(R);let O=await C(P,E()),q=T(O);if(q)return await $("request photo",P,q),new Error(q);let L=`${w}/${a.randomUUID()}-${O.fileName}`,F=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(L,O.blob,{contentType:O.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(F.error)return await $("request photo",P,F.error),F.error;let{error:j}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:w,p_photo_storage_path:L,p_photo_file_name:O.fileName,p_photo_content_type:O.contentType,p_photo_file_size_bytes:O.blob.size||null,p_photo_original_file_name:e.safeFileName(P.name||"photo"),p_photo_original_size_bytes:P.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return j&&(await b("maintenance-request-photos",L),await $("request photo",P,j)),j||null}async function $(w,P,R){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let O=String(R?.message||R||"Upload failed").slice(0,500),q=e.safeFileName(P?.name||"unknown-file"),L=D(P),F=Number(P?.size||0),j=[w,q,L,F,O].join("|");if(!u.has(j)){u.add(j);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||w||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${w}`.slice(0,140),details:[`Upload context: ${w}`,`File: ${q}`,`Type: ${L}`,`Size: ${F}`,`Error: ${O}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(H){s.warn("Could not report upload failure",H)}}}function E(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function C(w,P={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(w,P);let R=["image/jpeg","image/png","image/webp","image/heic","image/heif"],O=D(w);if(!R.includes(O)&&!(P.acceptAnyImage&&O.startsWith("image/")))return{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:O};try{if(!m)throw new Error("Browser image optimization is unavailable.");let q=await m(w),L=Number(P.targetBytes||0)||1*1024*1024,F=P.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],j=null;for(let H of F){let Z=await W(q,H.maxDimension,H.quality);if(j=Z,Z.size<=L)break}if(q.close&&q.close(),!j)throw new Error("Browser could not optimize this image.");return{blob:j,fileName:`${e.fileBaseName(w.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(q){return s.warn("Photo optimization failed; uploading original.",q),{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:O}}}function v(w){return["image/jpeg","image/png","image/webp"].includes(D(w))}function S(w){return!v(w)&&Number(w.size||0)>o}function _(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function D(w){let P=String(w?.type||"").trim().toLowerCase();if(P)return P;let R=String(w?.name||"").toLowerCase();return/\.(jpe?g)$/.test(R)?"image/jpeg":/\.png$/.test(R)?"image/png":/\.webp$/.test(R)?"image/webp":/\.gif$/.test(R)?"image/gif":/\.heic$/.test(R)?"image/heic":/\.heif$/.test(R)?"image/heif":/\.pdf$/.test(R)?"application/pdf":/\.txt$/.test(R)?"text/plain":/\.csv$/.test(R)?"text/csv":/\.doc$/.test(R)?"application/msword":/\.docx$/.test(R)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(R)?"application/vnd.ms-excel":/\.xlsx$/.test(R)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function N(w){let P=D(w);return l.has(P)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function T(w){return l.has(String(w?.contentType||"").toLowerCase())?Number(w?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function W(w,P,R){let O=Math.min(1,P/Math.max(w.width,w.height)),q=Math.max(1,Math.round(w.width*O)),L=Math.max(1,Math.round(w.height*O)),F=n.createElement("canvas");F.width=q,F.height=L,F.getContext("2d",{alpha:!1}).drawImage(w,0,0,q,L);let H=await new Promise(Z=>F.toBlob(Z,"image/jpeg",R));if(!H)throw new Error("Browser could not optimize this image.");return H}return{addPhotoToMaintenanceRequest:A,addPhotoToWorkOrder:k,optimizePhoto:C,removeUploadedObject:b,reportUploadFailure:$,deleteAssetDocument:p,deleteWorkOrderPhoto:g,uploadAssetDocument:r,uploadPartDocument:d,uploadPhoto:y}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMediaStorageWorkflow:c}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:c}})()});var Zt=U((ur,Re)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.URLRef||URL,m=e.consoleRef||console,o=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,l=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function u(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#company-logo-error"),b=h.querySelector("button[type='submit']"),k=new t(h).get("logo");if(y&&(y.textContent=""),!k||!k.name){y&&(y.textContent="Choose a logo image first.");return}b&&(b.disabled=!0,b.textContent="Uploading...");try{let A=p(k);if(A)throw new Error(A);let $=await d(k),E=g($);if(E)throw new Error(E);let C=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${$.fileName}`,v=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(C,$.blob,{contentType:$.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(v.error)throw new Error(v.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":v.error.message);let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:C}),"Company logo record save timed out. Check your connection and try again.",15e3);if(S)throw await e.removeUploadedObject("company-logos",C),new Error(e.isColumnSchemaError(S,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":S.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":S.message);let _=e.getCompanies().find(D=>D.id===e.getActiveCompanyId());_&&(_.logo_path=C,_.logoUrl=s.createObjectURL($.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(A){y&&(y.textContent=A.message||"Could not upload logo.")}finally{b&&(b.disabled=!1,b.textContent="Upload Logo")}}async function d(f){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(f);let h=r(f);try{if(!o)throw new Error("Browser logo optimization is unavailable.");let y=await o(f),k=Math.min(1,1200/Math.max(y.width,y.height)),A=Math.max(1,Math.round(y.width*k)),$=Math.max(1,Math.round(y.height*k)),E=n.createElement("canvas");E.width=A,E.height=$;let C=E.getContext("2d",{alpha:!0});C.clearRect(0,0,A,$),C.drawImage(y,0,0,A,$),y.close&&y.close();let v=await new Promise(S=>E.toBlob(S,"image/png"));if(!v)throw new Error("Browser could not optimize this logo.");return{blob:v,fileName:`${e.fileBaseName(f.name||"logo")}.png`,contentType:"image/png"}}catch(y){return m.warn("Logo optimization failed; uploading original.",y),{blob:f,fileName:e.safeFileName(f.name||"logo"),contentType:h}}}function r(f){let h=String(f?.type||"").trim().toLowerCase();if(h)return h;let y=String(f?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function p(f){let h=r(f);return l.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(f){return l.has(String(f?.contentType||"").toLowerCase())?Number(f?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:d,uploadCompanyLogo:u}}typeof Re<"u"&&Re.exports&&(Re.exports={createCompanyLogoWorkflow:c}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:c}})()});var Xt=U((dr,Ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,a=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function m(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(r=>r.id===i))return;let u=s(i);if(u){a(u);return}let d=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||d){o(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function o(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let l=e.getParts().find(p=>p.id===i),u=n.querySelector("#part-delete-error");if(u&&(u.textContent=""),!l)return;let d=s(i);if(d){u&&(u.textContent=d);return}let r=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);r&&(r.disabled=!0,r.textContent="Deleting...");try{let p=(e.getPartDocumentsByPartId()[i]||[]).map(y=>y.storage_path).filter(Boolean);if(p.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(p),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:f}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(f)throw new Error(f.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":f.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(p){e.showNotice(p.message||"Could not delete part.","warning"),u&&(u.textContent=p.message||"Could not delete part."),r&&(r.disabled=!1,r.textContent="Permanently Delete")}}return{deletePart:o,requestDeletePart:m}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:c},typeof Ze<"u"&&(Ze.exports={createPartDeleteWorkflow:c})})()});var en=U((pr,Xe)=>{(function(){function c(e={}){async function n(t){let a=t.target,s=a.type==="checkbox"?a.checked?"checked":"":a.value;a.disabled=!0;try{let{error:m}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:a.dataset.workOrderId,procedure_step_id:a.dataset.stepResult,completed_by:s?e.getSession().user.id:null,value:s,completed_at:s?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(m)throw m;await e.withOperationTimeout(e.recordWorkOrderEvent(a.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let o=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(i=>i);if(o){e.showNotice(`Checklist saved, but refresh did not finish: ${o.message||o}`,"warning"),a.disabled=!1;return}if(e.getWorkOrderActionWarningId()===a.dataset.workOrderId){let i=e.getWorkOrders().find(l=>l.id===a.dataset.workOrderId);e.blocksProcedureCompletion(i)||e.setWorkOrderActionWarning("","")}e.renderWorkspace()}catch(m){e.showNotice(`Could not save checklist step: ${m.message||m}`,"warning"),a.disabled=!1}}return{saveStepResult:n}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:c},typeof Xe<"u"&&(Xe.exports={createProcedureChecklistWorkflow:c})})()});var tn=U((mr,et)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function s(u,d){let{data:r,error:p}=await e.withOperationTimeout(e.getPublicRequestIntake(u),d);return{data:Array.isArray(r)?r[0]:r,error:p}}async function m(u){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let d=null;try{let{data:p,error:g}=await s(u,"Request QR lookup timed out.");if(d=p,g||!d){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let r=e.publicRequestUrl(u);e.setAppHtml(e.publicRequestQrPage(d,r)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(d,r)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function o(u){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let d=null;try{let{data:r,error:p}=await s(u,"Request form lookup timed out.");if(p){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}d=r}catch(r){i(r.message||"This request link could not be loaded.");return}if(!d){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(d)),n.querySelector("#public-request-form").addEventListener("submit",r=>l(r,u,d))}function i(u){e.setAppHtml(e.publicRequestError(u))}async function l(u,d,r){u.preventDefault();let p=u.currentTarget,g=new a(p),f=n.querySelector("#public-request-error"),h=p.querySelector("button[type='submit']");f&&(f.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:b}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:d,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(b)throw b;let k=g.get("photo"),A="";if(k&&k.name){let E=await e.addPhotoToMaintenanceRequest(y,k);E&&(A=`Request sent, but the photo did not upload: ${E.message||E}`)}let $=await e.notifyRequestEmailer(y);$.error&&e.warn("Request email notification did not send",$.error),e.setAppHtml(e.publicRequestSuccess(r,A)),n.querySelector("#public-request-another").addEventListener("click",()=>o(d))}catch(y){f&&(f.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:o,renderPublicRequestQrPage:m,submitPublicRequest:l}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:c},typeof et<"u"&&(et.exports={createPublicRequestIntakeWorkflow:c})})()});var nn=U((fr,tt)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(m){m.preventDefault();let o=m.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#company-error"),u=String(new t(o).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",l.textContent="";try{if(!u)throw new Error("Company name is required.");let d=e.getCompanies().find(f=>f.name.trim().toLowerCase()===u.trim().toLowerCase());if(d){e.setActiveCompanyId(d.id),e.persistActiveCompanyId(d.id),await e.render();return}let{data:r,error:p}=await e.withOperationTimeout(e.createCompanyRecord(u),"Company creation timed out.");if(p){l.textContent=p.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":p.message;return}if(e.setActiveCompanyId(r),e.persistActiveCompanyId(r),!await e.ensureProfileForActiveCompany(u))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(d){l.textContent=d.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:c},typeof tt<"u"&&(tt.exports={createCompanySetupWorkflow:c})})()});var rn=U((gr,nt)=>{(function(){function c(e={}){async function n(a){let s=e.getWorkOrders().find(m=>m.id===e.getActiveWorkOrderId());a.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),a.target.value)||(a.target.value=s?.status||"open")}catch(m){a.target.value=s?.status||"open",e.showNotice(`Could not update status: ${m.message||m}`,"warning")}finally{a.target.disabled=!1}}async function t(a,s){let m=e.getWorkOrders().find(d=>d.id===a);if(s==="completed"){let d=e.productionActionCompletionMessage?.(m)||"";if(d)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,d),e.showNotice(d,"warning"),await e.render(),!1;let r=e.blocksProcedureCompletion(m);if(r)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,r),e.showNotice(r,"warning"),await e.render(),!1}let o=e.currentSafetyCheckboxCheckedForWorkOrder(a),i=e.hasCompletedSafetyDeviceCheck(m)||o;if(s==="completed"&&e.requiresSafetyDeviceCheck(m)&&!i){e.setActiveWorkOrderId(a);let d="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(a,d),e.showNotice(d,"warning"),await e.render(),!1}let l={status:s,asset_id:m?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(l),s==="completed"?e.applySafetyCheckPayload(l,l.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(l,!1),delete l.asset_id;let{error:u}=await e.withOperationTimeout(e.updateWorkOrderSafely(l,a),"Status save timed out. Check your connection and try again.",15e3);return u?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(u)}`,"warning"),!1):(e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(a,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:c},typeof nt<"u"&&(nt.exports={createWorkOrderStatusWorkflow:c})})()});var an=U((hr,Ee)=>{(function(){function c(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function a(l,u){return l?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${u}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${u}"]`)||null}async function s({workOrderId:l,payload:u,source:d,busyText:r,successMessage:p}){let g=d?.querySelector?.("button[type='submit']")||d,f=g?.textContent||"",h=a(d,l);g&&(g.disabled=!0,g.textContent=r),h&&(h.textContent="");try{let y=await e.withOperationTimeout(e.updateProductionActionRecord(l,u),"Production Action save timed out. Check your connection and try again.",15e3);if(y.error){let b=e.friendlyWorkOrderSaveError(y.error);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}return e.showNotice(p,"success"),await e.afterProductionActionMutation(y.data,l),!0}catch(y){let b=y.message||String(y);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=f)}}async function m(l){l.preventDefault(),l.stopPropagation();let u=l.currentTarget,d=u.dataset.productionActionForm,r=new n(u),p=String(r.get("production_action")||"").trim(),g=String(r.get("production_action_assigned_to")||"").trim(),f=a(u,d);if(!p||!g){f&&(f.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(d);await s({workOrderId:d,payload:{production_action:p,production_action_assigned_to:g},source:u,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function o(l){l.preventDefault(),l.stopPropagation();let u=l.currentTarget,d=u.dataset.workOrderId,r=u.dataset.productionActionStatus;await s({workOrderId:d,payload:{production_action_status:r},source:u,busyText:r==="completed"?"Completing...":"Reopening...",successMessage:r==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(l){l.preventDefault(),l.stopPropagation();let u=l.currentTarget,d=u.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:d,payload:{production_action:null},source:u,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:m,setProductionActionStatus:o,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:c},typeof Ee<"u"&&Ee.exports&&(Ee.exports={createProductionActionWorkflow:c})})()});var on=U((yr,rt)=>{(function(){function c(e={}){async function n(s,m={}){let o=s.filter(d=>d.id&&!d.read_at);if(!o.length)return!0;let i=new Map(o.map(d=>[d.id,d])),l=new Date().toISOString(),u=o.map(d=>d.id);e.setNotifications(e.getNotifications().map(d=>i.has(d.id)?{...d,read_at:l}:d)),m.render!==!1&&e.renderWorkspace();try{let d=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,u,l),"Work notification update timed out.",1e4);if(d.error)throw d.error;return!0}catch(d){return e.setNotifications(e.getNotifications().map(r=>i.get(r.id)||r)),e.showNotice(`Could not mark the work notification read: ${d.message||d}`,"warning"),m.render!==!1&&e.renderWorkspace(),!1}}function t(s,m={}){let o=e.getNotifications().find(i=>i.id===s);return o?.read_at?Promise.resolve(!0):n([o||{id:s,read_at:null}],m)}function a(s,m={}){return n(e.getNotifications().filter(o=>o.work_order_id===s),m)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:a}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:c},typeof rt<"u"&&(rt.exports={createWorkOrderNotificationWorkflow:c})})()});var sn=U((br,at)=>{(function(){function c(e){async function n(t,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(m=>m.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let m=e.workOrderDateValue(a);if(!m)throw new Error("Choose a due date.");let o=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:m},t),"Due date save timed out. Check your connection and try again.");if(o.error)throw o.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:m}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:m}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${m} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:m}}catch(m){return e.showNotice(`Could not set due date: ${m.message||m}`,"warning"),{saved:!1,reason:"save_failed",error:m}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:c},typeof at<"u"&&(at.exports={createPlanningDueDateWorkflow:c})})()});var cn=U((wr,ot)=>{(function(){function c(n,t,a,s=50){let m=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",a).order("created_at",{ascending:!1}).limit(m)}function e(n,t,a,s){let m=[...new Set((a||[]).filter(Boolean))];return m.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",m).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:c,markWorkOrderNotificationsRead:e},typeof ot<"u"&&(ot.exports={listWorkOrderNotifications:c,markWorkOrderNotificationsRead:e})})()});var ln=U((vr,it)=>{(function(){async function c(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:a||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:c},typeof it<"u"&&(it.exports={notifyRequestEmailer:c})})()});var un=U((kr,st)=>{(function(){async function c(n,t,a=[],s={}){let m=s.pathKey||"storage_path",o=s.urlKey||"signedUrl",i=s.expiresIn||600,l=s.onError;await Promise.all(a.map(async u=>{let d=u?.[m];if(!d)return;let{data:r,error:p}=await n.storage.from(t).createSignedUrl(d,i);if(p){u[o]="",typeof l=="function"&&l(u,p);return}u[o]=r?.signedUrl||""}))}function e(n={}){function t(a){if(!a||!n.getReady())return;let m=(n.getRows(a)||[]).filter(i=>i.storage_path&&!i.signedUrl),o=n.getSigningMap();!m.length||o[a]||(o[a]=!0,n.withOperationTimeout(c(n.supabaseClient(),n.bucketName,m),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete o[a],n.getActiveGroupId()===a&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e},typeof st<"u"&&(st.exports={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e})})()});var dn=U((_r,ct)=>{(function(){function c(t,a){if(t[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return t[a]}function e(t={}){let a=c(t,"supabaseClient"),s=c(t,"workspaceUiState"),m=c(t,"applyRequestQueryFilters"),o=c(t,"applyWorkOrderListFilters"),i=c(t,"applyWorkOrderFilters"),l=c(t,"selectWorkOrders"),u=c(t,"countWorkOrdersQuery"),d=c(t,"fetchExactSearchedWorkOrderPage"),r=c(t,"isColumnSchemaError"),p=t.warn||(()=>{}),g=c(t,"LIST_ITEMS_PER_PAGE"),f=c(t,"WORK_ORDERS_PER_PAGE"),h=c(t,"REQUEST_RELATION_SELECT"),y=c(t,"REQUEST_ASSET_FALLBACK_SELECT"),b=c(t,"REQUEST_FALLBACK_SELECT"),k=c(t,"WORK_ORDER_RELATION_SELECT"),A=c(t,"WORK_ORDER_FALLBACK_SELECT");function $(){return typeof a=="function"?a():a}async function E(T=s.getRequestViewFilter(),W={}){let w=Math.max(1,s.getRequestsPage()),P=(w-1)*g,R=P+g-1,O=W.includeRelations===!1?b:W.includeLocationRelation===!1?y:h,q=await m($().from("maintenance_requests").select(O,{count:"exact"}),T).order("created_at",{ascending:!1}).range(P,R);return q.error&&W.includeLocationRelation!==!1&&r(q.error,["location_id","locations"])?E(T,{includeLocationRelation:!1}):q.error&&W.includeRelations!==!1?E(T,{includeRelations:!1}):!q.error&&q.count&&w>1&&P>=q.count?(s.setRequestsPage(Math.max(1,Math.ceil(q.count/g))),E(T,W)):q}async function C(T){let W=await m($().from("maintenance_requests").select("id",{count:"exact",head:!0}),T);return W.error?(p("Request count failed",W.error),0):W.count||0}async function v(){let[T,W,w]=await Promise.all([C("active"),C("converted"),C("all")]);return{active:T,converted:W,all:w}}async function S(T={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return d(T);let W=Math.max(1,s.getWorkOrderPage()),w=(W-1)*f,P=w+f-1,R=T.includeLocationRelation===!1?A:k,O=await o(l($(),R,{count:"exact"})).range(w,P);return!O.error&&O.count&&W>1&&w>=O.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(O.count/f))),S(T)):O}async function _(T={}){let W=await i(u($()),T);return W.error?(p("Work order count failed",W.error),0):W.count||0}async function D(){let[T,W,w,P,R,O,q,L]=await Promise.all([_({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:T,newWork:W,inProgress:w,blocked:P,overdue:R,completedAll:O,completedMonth:q,completedWeek:L}}async function N(){let[T,W,w,P,R,O,q,L]=await Promise.all([_({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:T,newWork:W,inProgress:w,blocked:P,overdue:R,completedAll:O,completedMonth:q,completedWeek:L}}return{fetchRequestPage:E,countRequests:C,loadRequestDashboardCounts:v,fetchWorkOrderPage:S,countWorkOrders:_,loadWorkOrderDashboardCounts:D,loadMyWorkDashboardCounts:N}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof ct<"u"&&(ct.exports=n)})()});var pn=U((Sr,lt)=>{(function(){function c(e={}){let n=e.windowRef||window,t=e.documentRef||document,a=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function m(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function o(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){l("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let f=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;f=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;f=h?.session||null}if(!f){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;f=h?.session||null}if(!f)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(f),o(),l("Verification complete. Loading workspace..."),await e.render()}catch(f){o(),u(f.message||"This verification link is invalid or expired.")}}function l(g){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(g)}function u(g){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function d(g=e.passwordRecoveryParamsFromUrl()){let f=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:b}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});f=!!(y?.session&&!b),b&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";p({ready:f,initialError:h})}function r(g="",f=""){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(g,f),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,b=y.querySelector("button[type='submit']"),k=t.querySelector("#auth-error"),A=t.querySelector("#auth-status"),$=String(new FormData(y).get("email")||"").trim();k.textContent="",A.textContent="Sending reset link...",b.disabled=!0,b.textContent="Sending...";try{let{error:E}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail($,{redirectTo:m()}),"Password reset email timed out. Check your connection and try again.",2e4);if(E){A.textContent="",k.textContent=E.message;return}A.textContent="If that email exists in Supabase, a reset link has been sent."}catch(E){A.textContent="",k.textContent=E.message||"Could not send reset link."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Send Reset Link")}})}function p({ready:g=!1,initialError:f=""}={}){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:g,initialError:f}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{o(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{o(),r()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,b=y.querySelector("button[type='submit']"),k=new FormData(y),A=String(k.get("password")||""),$=String(k.get("confirmPassword")||""),E=t.querySelector("#auth-error"),C=t.querySelector("#auth-status");if(E.textContent="",A.length<8){E.textContent="Password must be at least 8 characters.";return}if(A!==$){E.textContent="Passwords do not match.";return}C.textContent="Updating password...",b.disabled=!0,b.textContent="Updating...";try{let{error:v}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:A}),"Password update timed out. Try the newest reset link again.",2e4);if(v){C.textContent="",E.textContent=v.message;return}o();let{data:S}=await e.supabaseClient.auth.getSession();if(e.setSession(S.session),C.textContent=S.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",S.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(v){C.textContent="",E.textContent=v.message||"Could not update password."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:m,clearPasswordRecoveryUrl:o,startAuthCallback:i,renderAuthCallback:l,renderAuthCallbackError:u,startPasswordRecovery:d,renderPasswordResetRequest:r,renderPasswordRecovery:p}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:c},typeof lt<"u"&&(lt.exports={createAuthSessionFlow:c})})()});var mn=U((qr,Oe)=>{(function(){function c(m,o){let i=o.getProfilesByUserId();if(m.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${o.escapeHtml(i[m.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(m.created_at).toLocaleString()}</span>
        <p>${o.escapeHtml(m.body)}</p>
      </article>
    `;if(m.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${o.photoMetaText(m)} &middot; ${o.escapeHtml(i[m.uploaded_by]?.full_name||"Team member")}</span>
        <p>${o.escapeHtml(m.file_name)}</p>
        ${m.signedUrl?`<a href="${o.escapeHtml(m.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(m.type==="part"){let u=o.partUsageUnitCost(m)*(Number(m.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(m.created_at).toLocaleString()} &middot; ${o.escapeHtml(i[m.created_by]?.full_name||"Team member")}</span>
        <p>${o.escapeHtml(m.parts?.name||"Part")} - ${Number(m.quantity_used)||0} used - ${o.money(u)}</p>
      </article>
    `}return`
    <article>
      <strong>${o.escapeHtml(m.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(m.created_at).toLocaleString()} \xC2\xB7 ${o.escapeHtml(i[m.actor_id]?.full_name||"Team member")}</span>
      <p>${o.escapeHtml(m.summary)}</p>
    </article>
  `}function e(m,o){let i=o.getProcedureTemplates(),l=o.getPartsUsedByWorkOrder(),u=o.getCommentsByWorkOrder(),d=o.getPhotosByWorkOrder(),r=o.getMessageThreads(),p=i.find(A=>A.id===m.procedure_template_id),g=p?o.checklistProgress(m,p):null,f=(l[m.id]||[]).length,h=(u[m.id]||[]).length,y=(d[m.id]||[]).length,b=r.filter(A=>A.work_order_id===m.id).length,k=[];return m.asset_id&&k.push(n("asset","Equipment",m.assets?.name||"Linked",o)),p&&g&&k.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,o)),f&&k.push(n("parts","Parts",String(f),o)),h&&k.push(n("comment","Comments",String(h),o)),b&&k.push(n("message","Messages",String(b),o)),y&&k.push(t(m.id,String(y),o)),k.length?`<div class="relationship-row">${k.join("")}</div>`:""}function n(m,o,i,l){return`
    <span class="relationship-chip ${m}" title="${l.escapeHtml(o)}">
      ${a(m)}
      <span>${l.escapeHtml(i)}</span>
    </span>
  `}function t(m,o,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(m)}" title="Open photos">
      ${a("photo")}
      <span>${i.escapeHtml(o)}</span>
    </button>
  `}function a(m){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[m]||""}function s(m){return Object.freeze({renderActivityItem:o=>c(o,m),renderRelationshipChips:o=>e(o,m),relationshipChip:(o,i,l)=>n(o,i,l,m),photoJumpChip:(o,i)=>t(o,i,m),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Oe<"u"&&Oe.exports&&(Oe.exports={createRelationshipDisplayHelpers:s})})()});var fn=U((Cr,ut)=>{(function(){function c(e){let n=e.segmentIcon,t=e.escapeHtml,a=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,m=e.isConvertedRequest,o=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),l=e.getPendingDeleteRequestId,u=e.getProfilesByUserId;function d(f,h){return f==="converted"?`${h} converted`:f==="all"?`${h} total`:`${h} active`}function r(f,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",f.active],["converted","Converted",f.converted],["all","All",f.all]].map(([k,A,$])=>`
            <button class="segment ${h===k?"active":""}" data-request-filter="${k}" type="button" ${y.locked&&k!=="active"?"disabled":""}>
              ${n(k==="active"?"open":k==="converted"?"completed":"all")}${A} <span>${$}</span>
            </button>
          `).join("")}
        </div>
      `}function p(f){let h=m(f),y=i(),b=l()===f.id,k=u(),A=f.created_at?new Date(f.created_at):null,$=A&&!Number.isNaN(A.getTime())?A.toLocaleString():"date unavailable",E=f.assets?.name||f.locations?.name||"No equipment",C=f.requested_by_name||k[f.requested_by]?.full_name||"Requester",v=f.converted_by||f.reviewed_by||"",S=k[v]?.full_name||"",_=S?`Converted to work order by ${S}`:v?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",D=y&&o()?b?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${t(f.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${t(f.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${h?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${f.priority}">${t(f.priority)}</span>
                <span class="chip ${h?"completed":"open"}">${h?"converted":t(f.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${t(f.title)}</h3>
            <p>${t(f.description||"No description.")}</p>
            ${s(f)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(E)}</span>
              <span><strong>Requester</strong>${t(C)}</span>
              <span><strong>Received</strong>${t($)}</span>
            </div>
          </div>
          ${y&&!h&&f.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${f.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${f.id}" type="button">Convert to Work Order</button>
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
                  ${a()}
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
      `}return{requestPanelSubtitle:d,renderRequestFilterBar:r,renderMaintenanceRequest:p,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:c},typeof ut<"u"&&(ut.exports={createRequestDisplayHelpers:c})})()});var gn=U(($r,dt)=>{(function(){function c({statusLabel:e,workOrderTypeLabel:n=R=>String(R||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:s,getWorkOrderTypeFilter:m=()=>"all",getWorkOrderPriorityFilter:o=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:l=()=>"none",getActiveStatusFilter:u,getMyWorkFilter:d,getActiveSection:r,getDueState:p,getProcedureTemplates:g,getActiveWorkOrderId:f,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:b,TYPE_OPTIONS:k=[],OUTSIDE_VENDOR_VALUE:A,escapeHtml:$,cleanWorkOrderDescription:E,relationshipIcon:C,segmentIcon:v,isVendorAssigned:S,assignmentLabel:_,renderRelationshipChips:D,canAssignWorkOrderToMe:N,canManageTeam:T,renderProductionActionCard:W=()=>"",hasOpenProductionAction:w=()=>!1,hasUnreadProductionReady:P=()=>!1}){function R(){let M=a(),B=s(),G=u(),K=M?`${t(M)} Work`:B==="unassigned"?"Unassigned Work Orders":B==="vendor"?"Outside Vendor Work":B==="assigned"?"Assigned Work Orders":"Work Orders";return G==="active"||G==="all"?K==="Work Orders"?"Active Work Orders":`Active - ${K}`:`${e(G)} - ${K}`}function O(){let M=u();return M==="active"||M==="all"?"My Work":`${e(M)} - My Work`}function q(){return r()==="mywork"?O():R()}function L(M){let B=r(),G=d();return B==="mywork"?`${M} shown - ${B==="mywork"?G==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${M} shown`}function F(M,B,G){return`<option value="${$(M)}" ${M===G?"selected":""}>${$(B)}</option>`}function j(M){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[M]||"Any assignment"}function H(M){return M?M.charAt(0).toUpperCase()+M.slice(1):""}function Z(M=[]){let B=u(),G=B==="all"?"active":B,K=s(),X=a(),Y=m(),V=o(),ne=i(),ee=l(),de=["completed","completed_month","completed_week"].includes(B),oe=G==="active"&&K==="all"&&!X&&Y==="all"&&V==="all"&&ne==="newest"&&ee==="none",I=M.find(te=>te.userId===X),pe=[`Status: ${e(G)}`,`Assignment: ${j(K)}`,...I?[`Person: ${I.name}`]:[],...Y!=="all"?[`Type: ${n(Y)}`]:[],...V!=="all"?[`Priority: ${H(V)}`]:[]],he=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ue=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],x=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],ie=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
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
                  ${he.map(([te,ge])=>F(te,ge,G)).join("")}
                </select>
              </label>
              <label class="work-control-field ${K!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ue.map(([te,ge])=>F(te,ge,K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${F("","Any team member",X)}
                  ${M.map(te=>F(te.userId,te.name,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${F("all","Any type",Y)}
                  ${k.map(te=>F(te,n(te),Y)).join("")}
                </select>
              </label>
              <label class="work-control-field ${V!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${F("all","Any priority",V)}
                  ${["critical","high","medium","low"].map(te=>F(te,H(te),V)).join("")}
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
                  ${de?F("completed","Recently completed","completed"):x.map(([te,ge])=>F(te,ge,ne)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${ie.map(([te,ge])=>F(te,ge,ee)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function re(M,B){if(B==="assignee"){if(S(M))return{key:"vendor",label:"Outside vendor",order:900};if(!M.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let X=_(M);return{key:`assignee:${M.assigned_to}`,label:X,order:100}}if(B==="status"){let X=["open","in_progress","blocked","completed"].indexOf(M.status);return{key:`status:${M.status}`,label:e(M.status),order:X<0?99:X}}if(B==="priority"){let X=["critical","high","medium","low"].indexOf(M.priority);return{key:`priority:${M.priority}`,label:H(M.priority||"Unspecified"),order:X<0?99:X}}let G=M.type||"corrective",K=k.indexOf(G);return{key:`type:${G}`,label:n(G),order:K<0?99:K}}function se(M,B={}){if(!M.length)return'<p class="muted">No work orders match these filters.</p>';let G=B.groupBy||"none";if(G==="none")return`<div class="work-list" id="work-order-list">${M.map(J).join("")}</div>`;let K=new Map;return M.forEach(Y=>{let V=re(Y,G);K.has(V.key)||K.set(V.key,{...V,workOrders:[]}),K.get(V.key).workOrders.push(Y)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...K.values()].sort((Y,V)=>Y.order-V.order||Y.label.localeCompare(V.label)).map(Y=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${$(Y.label)}</h3>
                <span>${Y.workOrders.length}</span>
              </div>
              <div class="work-list">${Y.workOrders.map(J).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function J(M){let B=p(M),G=g().find(ee=>ee.id===M.procedure_template_id),K=M.created_at?new Date(M.created_at):null,X=K&&!Number.isNaN(K.getTime())?K.toLocaleDateString():"",Y=M.status==="completed",V=Y?"Completed":e(M.status),ne=ee=>ee==="completed"?"Complete":e(ee);return`
        <article class="work-card status-card status-${M.status} ${M.id===f()?"selected":""}" data-id="${M.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${M.priority}">${M.priority}</span>
              <span class="chip">${$(n(M.type))}</span>
              <span class="chip ${M.status}">${V}</span>
              ${B?`<span class="chip ${B.className}">${B.label}</span>`:""}
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
          ${D(M)}
          ${W(M)}
          <div class="quick-actions work-card-actions">
            ${!Y&&N(M)?`<button class="assign-action" data-assign-me="${M.id}" type="button">Assign to me</button>`:""}
            ${!Y&&T()?ae(M):""}
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
            ${Object.entries(h()).map(([B,G])=>`<option value="${B}" ${!S(M)&&B===M.assigned_to?"selected":""}>${$(G.full_name||t(B))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function z(M="",B={}){let G=M||"",K=B.managerOptions??T(),X=B.allowUnassigned!==!1,Y=B.selfLabel||"Assign to me",V=[];return X&&V.push(`<option value="" ${G===""?"selected":""}>Unassigned</option>`),V.push(`<option value="${y().user.id}" ${G===y().user.id?"selected":""}>${Y}</option>`),K&&(V.push(`<option value="${A}" ${G===A?"selected":""}>Outside vendor</option>`),V.push(...Object.entries(h()).filter(([ne])=>ne!==y().user.id).map(([ne,ee])=>`<option value="${ne}" ${G===ne?"selected":""}>${$(ee.full_name||t(ne))}</option>`))),V.join("")}function fe(M){return S(M)?A:M?.assigned_to||""}function le(M,B=""){let G=fe(M);return M?.status==="completed"?`
          <label ${B?`id="${B}"`:""}>Completed by / assigned to
            <input value="${$(_(M))}" disabled>
            <input name="assigned_to" type="hidden" value="${$(G)}">
          </label>
        `:T()?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${z(G,{managerOptions:!0})}
            </select>
          </label>
        `:!M.assigned_to&&!S(M)?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${z("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${B?`id="${B}"`:""}>Assigned to
          <input value="${$(_(M))}" disabled>
          <input name="assigned_to" type="hidden" value="${$(G)}">
        </label>
      `}return{workOrdersPanelTitle:R,myWorkPanelTitle:O,workQueuePanelTitle:q,workQueuePanelSubtitle:L,renderWorkOrderFilterToolbar:Z,renderWorkOrderCollection:se,renderWorkOrderCard:J,renderCardAssignmentControl:ae,renderAssignmentSelect:z,renderWorkOrderAssignmentField:le}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:c},typeof dt<"u"&&(dt.exports={createWorkQueueDisplayHelpers:c})})()});var hn=U((Pr,We)=>{(function(){function c(e={}){function n(){return e.getCompanyMembers().filter(r=>e.normalizeRole(r.role)==="production").map(r=>({userId:r.user_id,name:e.teamMemberName(r.user_id)})).sort((r,p)=>r.name.localeCompare(p.name))}function t(r){return r.production_action_assigned_to?e.teamMemberName(r.production_action_assigned_to):"Production owner not set"}function a(r){let p=e.activeCompanyRole();return["admin","manager"].includes(p)||r.production_action_assigned_to===e.getSession()?.user?.id}function s(r=""){return n().map(g=>`
        <option value="${e.escapeHtml(g.userId)}" ${g.userId===r?"selected":""}>${e.escapeHtml(g.name)}</option>
      `).join("")}function m(r,p={}){let g=n(),f=p.compact?" compact":"";if(!g.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=g.some(y=>y.userId===r.production_action_assigned_to)?r.production_action_assigned_to:g[0].userId;return`
        <form class="production-action-form${f}" data-production-action-form="${e.escapeHtml(r.id)}">
          <label>Production action
            <textarea name="production_action" rows="${p.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(r.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${s(h)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(r.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(r)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(r)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(r.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function o(r){return!a(r)||r.status==="completed"?"":r.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(r.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(r.id)}" type="button">Reopen Production Action</button>`}function i(r){let p=r.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(r))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(r.production_action)}</p>
        ${p&&r.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(r.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function l(r,p){let g=e.hasProductionAction(r),f=`production-action-dialog-${r.id}`;return`
        <dialog class="production-action-dialog" id="${e.escapeHtml(f)}" data-production-action-dialog="${e.escapeHtml(r.id)}" aria-labelledby="${e.escapeHtml(f)}-title">
          <div class="production-action-dialog-shell">
            <header class="production-action-dialog-header">
              <div>
                <small>Work order action</small>
                <h3 id="${e.escapeHtml(f)}-title">Production Action</h3>
              </div>
              <button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button>
            </header>
            <div class="production-action-dialog-body">
              ${g?i(r):'<p class="muted">No Production Action is assigned.</p>'}
              ${p?`
                <div class="button-row production-action-detail-actions">
                  ${g?o(r):""}
                </div>
                ${m(r)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function u(r){let p=e.canEditOperationalRecords()&&r.status!=="completed",g=e.hasProductionAction(r);if(!g&&!p)return"";let f=r.production_action_status==="completed",h=`production-action-dialog-${r.id}`,y=g?t(r):"Not assigned",b=g?`${y} - ${r.production_action}`:y,k=g?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${f?"is-completed":g?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${g?`<span class="chip ${f?"status-completed":"status-open"}">${f?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(b)}">${e.escapeHtml(b)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(r.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${k}" title="${k}">
            <span aria-hidden="true">${g?"...":"+"}</span>
          </button>
          ${l(r,p)}
        </section>
      `}function d(r){let p=e.canEditOperationalRecords()&&r.status!=="completed";return!e.hasProductionAction(r)&&!p?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(r)?i(r):'<p class="muted">No Production Action is assigned.</p>'}
          ${p?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(r)?o(r):""}
            </div>
            ${m(r)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:u,renderProductionActionDetail:d}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:c},typeof We<"u"&&We.exports&&(We.exports={createProductionActionDisplayHelpers:c})})()});var yn=U((Ar,pt)=>{(function(){function c(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(l=>String(l||"")),a=e.formatMessageTime||(l=>String(l||"")),s=Math.max(Number(e.visibleLimit)||12,1);function m(){return n().filter(l=>!l.read_at).length}function o(l){return n().some(u=>!u.read_at&&u.kind==="production_action_completed"&&u.work_order_id===l)}function i(){if(!e.getReady?.())return"";let l=n();if(!l.length)return"";let u=m(),d=l.slice(0,s);return`
        <details class="work-notification-panel" ${u?"open":""}>
          <summary>
            <span>Work notifications</span>
            <span>${u?`${u} new`:"Recent"}</span>
          </summary>
          <div class="work-notification-list">
            ${d.map(r=>`
              <button
                class="work-notification-item ${r.read_at?"read":"unread"}"
                data-open-work-notification="${t(r.id)}"
                data-work-order-id="${t(r.work_order_id)}"
                type="button"
              >
                <span class="work-notification-heading">
                  <span class="chip production-ready">Production Ready</span>
                  <time>${t(a(r.created_at))}</time>
                </span>
                <strong>${t(r.title)}</strong>
                <span>${t(r.body)}</span>
              </button>
            `).join("")}
          </div>
          ${l.length>s?`<p class="work-notification-limit">Showing the ${s} most recent notifications.</p>`:""}
        </details>
      `}return{hasUnreadProductionReady:o,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:m}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:c},typeof pt<"u"&&(pt.exports={createWorkOrderNotificationDisplayHelpers:c})})()});var bn=U((Rr,xe)=>{(function(){function c({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:s,teamMemberName:m}){function o(l){return`
        <article class="mini-work-order" data-mini-work-order="${l.id}">
          <strong>${e(l.title)}</strong>
          <span>${n(l.status)} - ${l.due_at||"no due date"}</span>
        </article>
      `}function i(l){let u=(a()[l.id]||[]).length,d=(s()[l.id]||[]).length,r=l.completed_at?new Date(l.completed_at).toLocaleDateString():"",p=l.completed_by?m(l.completed_by):"",g=!p&&l.assigned_to?m(l.assigned_to):"",f=p?` by ${e(p)}`:g?` - owner ${e(g)}`:"",h=l.resolution_summary||l.completion_notes||"";return`
        <article class="mini-work-order ${l.status==="completed"?"completed-history":""}" data-mini-work-order="${l.id}">
          <div class="chip-row">
            <span class="chip ${l.status}">${n(l.status)}</span>
            ${l.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${u?`<span class="relationship-chip parts">${t("parts")}<span>${u}</span></span>`:""}
            ${d?`<span class="relationship-chip photo">${t("photo")}<span>${d}</span></span>`:""}
          </div>
          <strong>${e(l.title)}</strong>
          <span>${r?`Completed ${r}${f}`:`Due ${l.due_at||"unset"}`}</span>
          ${l.failure_cause?`<p><b>Finding:</b> ${e(l.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:o,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:c},typeof xe<"u"&&xe.exports&&(xe.exports={createMiniWorkOrderDisplayHelpers:c})})()});var wn=U((Er,mt)=>{(function(){function c({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:a,getParts:s,getPartDocumentsByPartId:m,getPartDocumentsReady:o,getPendingDeletePartId:i,getShowPartSourceManager:l,getPartCostsReady:u,getPartInventoryFilter:d,getPartSearchQuery:r,partUsageRows:p,canDeleteParts:g,canEditOperationalRecords:f=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:b}){let k=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],A=k.reduce((w,[P,R])=>(w[P]=R.replace(/s$/,""),w),{});function $(w){return w.document_type?w.document_type:String(w.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(w.file_name||"")?"invoice":/receipt/i.test(w.file_name||"")?"receipt":/schematic|diagram/i.test(w.file_name||"")?"schematic":/print|drawing/i.test(w.file_name||"")?"part_print":/manual/i.test(w.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(w.file_name||"")?"spec_sheet":"other"}function E(){return k.map(([w,P])=>`
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
              <span>${u()?`${n(O)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${q&&R>0?`<small>Need ${L} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function D(){let w=s().filter(a),P=w.filter(t).length,R=d();return[["All Parts",w.length,"all"],["Low Stock",P,"low"]].map(([O,q,L])=>`
        <button class="parts-health ${L==="low"&&q?"attention":""} ${R===L?"active":""}" data-part-inventory-filter="${L}" type="button">
          <span>${O}</span>
          <strong>${q}</strong>
        </button>
      `).join("")}function N(w="default"){return`
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${e(r())}" placeholder="Search part name, SKU, source, count">
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
      `}function T(w){let P=Number(w.quantity_on_hand)||0,R=Number(w.reorder_point)||0,O=Number(w.unit_cost)||0,q=m()[w.id]||[],L=S(q),F=f();return`
        <section class="part-detail-shell">
          ${F?h():""}
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
            ${F?`<div class="part-card-actions">
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

          ${F?`<form class="part-detail-form relationship-detail parts" data-edit-part="${w.id}">
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

          ${F&&l()?b():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${q.length} file${q.length===1?"":"s"}</span>
            </div>
            ${F?`<form class="part-document-form" data-part-document="${w.id}">
              <label>File type<select name="document_type">${E()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${w.id}">${o()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${o()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${q.length?k.map(j=>v(j,q)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${F?W(w):""}
        </section>
      `}function W(w){let P=p(w.id).length,R=m()[w.id]||[],O=i()===w.id;return g()?`
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:_,renderPartsHealth:D,renderPartSearch:N,renderPartDetail:T,renderPartDangerZone:W}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:c},typeof mt<"u"&&(mt.exports={createPartsDisplayHelpers:c})})()});var vn=U((Or,ft)=>{(function(){function c({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:a,getAppIssueReportsReady:s,getAppIssueReports:m}){function o(){let u=s();return`
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
            <input name="screen" type="hidden" value="${t(a())}">
            <p class="muted">This sends the current company, location, screen, and signed-in user with the report.</p>
            <p class="error-text" id="app-issue-report-error">${u?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${u?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function i(u){let d={open:0,reviewing:1,resolved:2};return[...u].sort((r,p)=>{let g=(d[r.status||"open"]??1)-(d[p.status||"open"]??1);return g||new Date(p.created_at||0)-new Date(r.created_at||0)})}function l(){if(!e())return"";let u=s(),d=m(),r=i(d);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${u?`${d.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${u?`
            <div class="issue-report-list">
              ${r.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:o,renderAppIssueReportsPanel:l,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:c},typeof ft<"u"&&(ft.exports={createAppIssuePanelDisplayHelpers:c})})()});var kn=U((Wr,gt)=>{(function(){function c(e){let n=e.escapeHtml,t=e.getDueState,a=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,m=e.canEditOperationalRecords||(()=>!0);function o(){return e.getPreventiveSchedules().filter(d=>e.matchesActiveLocation(d)&&e.matchesSearch([d.title,d.frequency,d.next_due_at,d.assets?.name]))}function i(){return e.getProcedureTemplates().filter(d=>e.matchesSearch([d.name,d.description,...(d.procedure_steps||[]).map(r=>r.prompt)]))}function l(d){let r=t({due_at:d.next_due_at,status:"open"}),p=e.getPendingDeleteScheduleId()===d.id,g=m();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${n(d.frequency)}</span>
              ${r?`<span class="chip ${r.className}">${r.label}</span>`:""}
            </div>
            <h3>${n(d.title)}</h3>
            <p>${n(d.assets?.name||"No equipment")} - Next due ${d.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${d.id}" type="button">Generate Work</button>
            ${s()?p?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${n(d.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${n(d.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function u(d){let r=e.getWorkOrders().filter(y=>y.procedure_template_id===d.id).length,p=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===d.id).length,g=a({workOrders:r,schedules:p}),f=e.getPendingDeleteProcedureId()===d.id,h=m();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${d.procedure_steps?.length||0} steps</span>
              <span class="chip">${r} linked work orders</span>
              ${p?`<span class="chip">${p} PM schedules</span>`:""}
            </div>
            <h3>${n(d.name)}</h3>
            <p>${n(d.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(d.procedure_steps||[]).map(y=>`
              <div class="checklist-step">
                <span>${y.position}. ${n(y.prompt)}</span>
                <small>${n(y.response_type)} ${y.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${h?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${d.id}">
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
            <p class="error-text" data-step-error="${d.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
          </form>`:""}
          ${h&&s()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${g||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${n(d.id)}"></p>
              ${g?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:f?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${n(d.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${n(d.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${n(d.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:o,filteredProcedureTemplates:i,renderPreventiveSchedule:l,renderProcedureTemplate:u}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:c},typeof gt<"u"&&(gt.exports={createMaintenanceListDisplayHelpers:c})})()});var _n=U((xr,ht)=>{(function(){function c(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:a,checklistProgress:s,requiredChecklistProgress:m,escapeHtml:o,cleanWorkOrderDescription:i,renderRelationshipChips:l,renderWorkOrderCommandSummary:u,renderWorkOrderRecommendation:d,statusLabel:r,normalizeWorkOrderType:p=R=>String(R||"corrective"),workOrderTypeLabel:g=R=>String(R||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),hasCompletedSafetyDeviceCheck:f,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:b,renderWorkOrderAssignmentField:k,requiresSafetyDeviceCheck:A,renderWorkOrderMessages:$,renderProcedureOptions:E,money:C,photoMetaText:v,renderActivityItem:S,canDeleteWorkOrders:_,canEditOperationalRecords:D=()=>!0,renderProductionActionDetail:N=()=>"",hasOpenProductionAction:T=()=>!1}=e;function W(R,O){let q=e.getStepResultsByWorkOrder()[R.id]?.[O.id],L=q?.value||"",F=`data-step-result="${O.id}" data-work-order-id="${R.id}"`,j=`<input ${F} value="${o(L)}" placeholder="Result">`;return O.response_type==="checkbox"&&(j=`<label class="check-row"><input ${F} type="checkbox" ${L==="checked"?"checked":""}> Done</label>`),O.response_type==="pass_fail"&&(j=`
          <select ${F}>
            <option value="">Not checked</option>
            <option value="pass" ${L==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${L==="fail"?"selected":""}>Fail</option>
          </select>
        `),O.response_type==="number"&&(j=`<input ${F} type="number" value="${o(L)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${O.position}. ${o(O.prompt)} ${O.required?'<small class="required-mark">Required</small>':""}</span>
          ${j}
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
      `}function P(){let R=e.getActiveWorkOrderId(),q=e.getWorkOrders().find(I=>I.id===R);if(!q)return n();let L=e.getCommentsByWorkOrder(),F=e.getPhotosByWorkOrder(),j=e.getEventsByWorkOrder(),H=e.getPartsUsedByWorkOrder(),Z=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),se=e.getWorkOrderActionWarning(),J=e.getParts(),ae=e.getProfilesByUserId(),z=e.getCommentsError(),fe=e.STATUS_OPTIONS||[],le=e.TYPE_OPTIONS||[],M=L[q.id]||[],B=F[q.id]||[],G=j[q.id]||[],K=H[q.id]||[],X=K.reduce((I,pe)=>I+(Number(pe.quantity_used)||0)*t(pe),0),Y=K.reduce((I,pe)=>I+(Number(pe.quantity_used)||0),0),V=a(M,B,G,K),ne=Z.find(I=>I.id===q.procedure_template_id),ee=ne?s(q,ne):null,de=ne?m(q,ne):null,oe=D();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${q.priority}">${q.priority}</span>
            <span class="chip">${o(g(q.type))}</span>
            <span class="chip ${q.status}">${r(q.status)}</span>
          </div>
          <h2>${o(q.title)}</h2>
          <p>${o(i(q.description)||"No description.")}</p>
          ${l(q)}
          ${q.completed_at?`<p class="completion-note">Completed ${new Date(q.completed_at).toLocaleString()} \xC2\xB7 ${q.actual_minutes||0} min</p>`:""}
          ${q.asset_id&&f(q)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${q.completion_notes?`<p>${o(q.completion_notes)}</p>`:""}
        </div>

        ${u(q)}
        ${d(q)}
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
            ${fe.map(I=>`<option value="${I}" ${I===q.status?"selected":""} ${I==="completed"&&T(q)?"disabled":""}>${r(I)}</option>`).join("")}
          </select>
        </label>`:""}

        ${oe?`<div class="quick-actions detail-quick-actions">
          ${h(q)?`<button class="assign-action" data-assign-me="${q.id}" type="button">${q.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${fe.filter(I=>I!==q.status&&!(I==="completed"&&T(q))).map(I=>`
            <button data-quick-status="${I}" data-id="${q.id}" type="button">${r(I)}</button>
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
                ${fe.map(I=>`<option value="${I}" ${I===q.status?"selected":""} ${I==="completed"&&T(q)?"disabled":""}>${r(I)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(I=>`<option value="${I}" ${I===q.priority?"selected":""}>${I}</option>`).join("")}
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
              ${["low","medium","high","critical"].map(I=>`<option value="${I}" ${I===q.priority?"selected":""}>${I}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${le.map(I=>`<option value="${I}" ${I===p(q.type)?"selected":""}>${g(I)}</option>`).join("")}
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
              ${ne.procedure_steps.map(I=>oe?W(q,I):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${I.position}. ${o(I.prompt)} ${I.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${o(e.getStepResultsByWorkOrder()[q.id]?.[I.id]?.value||"Not recorded")}</small>
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
            ${T(q)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${q.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${A(q)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${f(q)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${T(q)?"disabled":""}>Complete Work Order</button>
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
              ${J.map(I=>`<option value="${I.id}">${o(I.name)} (${I.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${K.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${C(X)}</span></article>`:""}
          ${K.map(I=>`
            <article class="relationship-detail parts">
              <strong>${o(I.parts?.name||"Part")}</strong>
              <span>${I.quantity_used} used - ${C((Number(I.quantity_used)||0)*t(I))}</span>
              <small>${I.created_at?new Date(I.created_at).toLocaleString():"time unavailable"} &middot; ${o(ae[I.created_by]?.full_name||"Team member")}</small>
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
            ${B.map(I=>`
              <article class="relationship-detail photo">
                ${I.signedUrl&&I.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${o(I.signedUrl)}" alt="${o(I.file_name)}">`:""}
                <strong>${o(I.file_name)}</strong>
                <span>${v(I)}</span>
                ${I.signedUrl?`<a href="${o(I.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${oe?`<button class="text-button danger-link" data-delete-work-order-photo="${o(I.id||"")}" data-work-order-photo-path="${o(I.storage_path||"")}" type="button">Delete Photo</button>`:""}
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
          ${M.map(I=>`
            <article class="relationship-detail comment">
              <strong>${o(ae[I.author_id]?.full_name||"Team member")}</strong>
              <span>${I.created_at?new Date(I.created_at).toLocaleString():""}</span>
              <p>${o(I.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${z?`<p class="error-text">${o(z)}</p>`:""}
          ${V.map(S).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${oe&&_()?w(q):""}
      </div>
    `}return{renderWorkOrderDetail:P}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:c},typeof ht<"u"&&(ht.exports={createWorkOrderDetailDisplayHelpers:c})})()});var Sn=U((Mr,yt)=>{(function(){function c(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:c},typeof yt<"u"&&(yt.exports={createEquipmentStructureGuideDisplayHelpers:c})})()});var qn=U((Dr,bt)=>{(function(){function c(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:a,escapeHtml:s,assetTypeLabel:m,renderParentAssetOptions:o,renderLocationOptions:i,renderAssetAreaOptions:l,assetStatusLabel:u,renderAssetMiniWorkOrder:d,assetDeleteBlockerMessage:r,canDeleteEquipment:p,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:f,renderProcedureOptions:h}=e;function y(){let v=new Date;return new Date(v.getTime()-v.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function b(v,S,_){let D=S.some(w=>w.event_type==="created"),N=v.created_at&&!D?[{id:`${v.id}-created`,event_type:"created",summary:`${m(v.asset_type)} created.`,actor_id:v.created_by||"",created_at:v.created_at}]:[];return{equipmentHistory:[...S,...N].sort((w,P)=>new Date(P.created_at||0)-new Date(w.created_at||0)),historyActorLabel:w=>w.actor_id&&_[w.actor_id]?.full_name?_[w.actor_id].full_name:w.actor_id?`User ${String(w.actor_id).slice(0,8)}`:w.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function k(v,S){return v.map(_=>`
        <article>
          <strong>${s(String(_.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${_.created_at?new Date(_.created_at).toLocaleString():"time unavailable"} &middot; ${s(S(_))}</span>
          <p>${s(_.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function A(){let v=e.getAssets(),S=e.getActiveAssetId(),_=v.find(j=>j.id===S);if(!_)return n();let D=e.getAssetEventsReady?.()!==!1,N=e.getProfilesByUserId?.()||{},T=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((j,H)=>new Date(H.created_at||0)-new Date(j.created_at||0)),{equipmentHistory:W,historyActorLabel:w}=b(_,T,N),P=e.LIST_ITEMS_PER_PAGE||12,R=Math.max(1,Math.ceil(W.length/P)),O=Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,"asset-history")||1),R),q=W.length?(O-1)*P+1:0,L=Math.min(W.length,O*P),F=W.slice((O-1)*P,O*P);return`
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
              ${k(F,w)||'<p class="muted">No equipment history notes yet.</p>'}
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
      `}function $(){let v=e.getAssets(),S=e.getActiveAssetId(),_=v.find(x=>x.id===S);if(!_)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(_.id);let D=e.getWorkOrders(),N=e.getPreventiveSchedules(),T=e.getParts(),W=e.getAssetParts(),w=e.getAssetPartsReady(),P=e.getAssetDocumentsByAssetId?.()[_.id]||[],R=e.getAssetDocumentsReady?.()!==!1,O=e.getAssetEventsReady?.()!==!1,q=e.getProfilesByUserId?.()||{},L=e.getPartsUsedByWorkOrder(),F=e.getLocations(),j=e.getActiveLocationId(),H=e.ASSET_TYPE_OPTIONS||[],Z=t(_),re=a(_.id),se=D.filter(x=>x.asset_id===_.id),J=se.filter(x=>x.status!=="completed").sort((x,ie)=>new Date(ie.created_at||0)-new Date(x.created_at||0)),ae=se.filter(x=>x.status==="completed").sort((x,ie)=>new Date(ie.completed_at||ie.created_at||0)-new Date(x.completed_at||x.created_at||0)),z=N.filter(x=>x.asset_id===_.id),fe=Object.values(L).flat().filter(x=>se.some(ie=>ie.id===x.work_order_id)),le=W.filter(x=>x.asset_id===_.id),M=new Set(le.map(x=>x.part_id)),B=T.filter(x=>!M.has(x.id)),G=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((x,ie)=>new Date(ie.created_at||0)-new Date(x.created_at||0)),{equipmentHistory:K}=b(_,G,q),X=e.LIST_ITEMS_PER_PAGE||12,Y=x=>e.getAssetRelationshipOpen?.(_.id,x)||!1,V=(x,ie)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,x)||1),Math.max(1,Math.ceil(ie/X))),ne=(x,ie)=>{let te=V(ie,x.length);return x.slice((te-1)*X,te*X)},ee=(x,ie)=>{if(ie<=X)return"";let te=V(x,ie),ge=Math.max(1,Math.ceil(ie/X)),ye=(te-1)*X+1,ce=Math.min(ie,te*X);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${te<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${ce} of ${ie} - Page ${te} of ${ge}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${te>=ge?"disabled":""}>Next</button>
          </div>
        `},de=x=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(x)}" data-asset-id="${s(_.id)}" ${Y(x)?"open":""}`,oe=F.find(x=>x.id===_.location_id)?.name||_.location||"No location set",I=Z?Z.name:"Top level equipment",pe=_.status==="offline"?"status-blocked":_.status==="degraded"?"status-open":_.status==="watch"?"status-in_progress":"status-completed",he=_.status==="degraded"&&J.length===0,ue=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${_.status}">${s(u(_.status))}</span>
              <span class="chip">${s(m(_.asset_type))}</span>
              ${_.asset_code?`<span class="chip">${s(_.asset_code)}</span>`:""}
              ${_.manufacturer?`<span class="chip">${s(_.manufacturer)}</span>`:""}
              ${_.model?`<span class="chip">${s(_.model)}</span>`:""}
              ${_.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(_.name)}</h2>
            <p>${s(_.location||"No location set")}</p>
            ${Z?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(Z.id)}" type="button">${s(Z.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${pe}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(u(_.status))}</strong>
              <small>${_.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(oe)}</strong>
              <small>${_.location?s(_.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(I)}</strong>
              <small>${Z?"Linked under parent equipment":"Primary / standalone item"}</small>
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
            <button class="command-card status-open ${J.length?"":"empty"}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong>${J.length}</strong>
              <small>${J.length?"Active work tied to this equipment":"No open work"}</small>
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

          ${f?f():""}

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
                ${H.map(x=>`<option value="${x}" ${x===(_.asset_type||"machine")?"selected":""}>${m(x)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${o(_.parent_asset_id||"",_.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${F.length?"":"disabled"}>
                ${i(_.location_id||j)}
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
                ${["running","watch","degraded","offline"].map(x=>`<option value="${x}" ${x===_.status?"selected":""}>${u(x)}</option>`).join("")}
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
                  <span>${s(m(x.asset_type))} - ${s(u(x.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${de("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${J.length}</span></summary>
            <div class="mini-list">
              ${Y("open-work")?ne(J,"open-work").map(d).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${Y("open-work")?ee("open-work",J.length):""}
          </details>

          <details ${de("completed-history")}>
            <summary>Completed History <span>${ae.length}</span></summary>
            <div class="mini-list">
              ${Y("completed-history")?ne(ae,"completed-history").map(d).join("")||'<p class="muted">No completed work yet.</p>':'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${Y("completed-history")?ee("completed-history",ae.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${K.length} event${K.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(_.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${O?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${z.length} schedule${z.length===1?"":"s"}</span>
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
              ${z.map(x=>`<article><strong>${s(x.title)}</strong><span>${x.frequency} - next due ${x.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(_.id)}" ${Y("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${le.length}</span></summary>
            <div class="panel-header compact">
              ${ue?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${Y("linked-parts")&&w?`
              ${ue?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(_.id)}">
                <label>Part
                  <select name="part_id" ${B.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${B.map(x=>`<option value="${s(x.id)}">${s(x.name)}${x.sku?` - ${s(x.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${B.length?"":"disabled"}>Attach Part</button>
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

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(_.id)}" ${Y("parts-used")?"open":""}>
            <summary>Parts Used History <span>${fe.length}</span></summary>
            <div class="mini-list">
              ${Y("parts-used")?ne(fe,"parts-used").map(x=>`<article><strong>${s(x.parts?.name||"Part")}</strong><span>${x.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${Y("parts-used")?ee("parts-used",fe.length):""}
          </details>

          ${ue?E(_):""}
        </div>
      `}function E(v){let S=e.getWorkOrders(),_=e.getPreventiveSchedules(),D=e.getAssets(),N=e.getActiveAssetId(),T=S.filter(q=>q.asset_id===v.id).length,W=_.filter(q=>q.asset_id===v.id).length,w=D.filter(q=>q.parent_asset_id===v.id).length,P=e.getMaintenanceRequests().filter(q=>q.asset_id===v.id).length,R=r({workOrders:T,children:w,schedules:W,requests:P}),O=e.getPendingDeleteAssetId()===N;return p()?`
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
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function C(v){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[v]||"File"}return{renderAssetDetail:$,renderAssetHistoryScreen:A}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:c},typeof bt<"u"&&(bt.exports={createAssetDetailDisplayHelpers:c})})()});var Cn=U((Tr,wt)=>{(function(){function c(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:a,statusLabel:s,workOrderTypeLabel:m=r=>String(r||"corrective").replace(/\b\w/g,p=>p.toUpperCase()),renderAssignmentSelect:o,renderProcedureOptions:i,escapeHtml:l}=e;function u(){let r=new Date;return new Date(r.getTime()-r.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function d(){let r=e.getParts();return`
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
                  ${a()}
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
                  ${t.map(p=>`<option value="${p}">${m(p)}</option>`).join("")}
                </select>
              </label>
              <label>Complete by / due date
                <span class="date-picker-row" data-date-picker-field>
                  <input name="due_at" type="date" value="${u()}">
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
                  ${r.map(p=>`<option value="${p.id}">${l(p.name)} (${p.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:d}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:c},typeof wt<"u"&&(wt.exports={createCreateWorkOrderDisplayHelpers:c})})()});var $n=U((Ir,vt)=>{(function(){function c(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:a,escapeHtml:s,renderAssignmentSelect:m,renderProcedureOptions:o,assetStatusLabel:i,workOrderTypeLabel:l=r=>String(r||"corrective").replace(/\b\w/g,p=>p.toUpperCase())}=e;function u(){let r=new Date;return new Date(r.getTime()-r.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function d(){let r=e.getQuickFixAssetId(),p=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),f=e.getSession(),h=e.getParts(),y=r||"",b=g.find(k=>k.id===p);return`
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
              <input name="due_at" type="date" value="${u()}">
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
          <p class="error-text" data-asset-location-warning>${s(a(y||b?.asset_id||""))}</p>
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
                  ${m(f.user.id,{selfLabel:"Assign to me"})}
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
      `}return{renderQuickFixForm:d}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:c},typeof vt<"u"&&(vt.exports={createQuickFixDisplayHelpers:c})})()});var Pn=U((Fr,kt)=>{(function(){function c(e={}){let n=e.escapeHtml;function t(d){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${n(d)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `}function a(d){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${n(d)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `}function s(d,r=""){let p=d==="signup";return`
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
            <p class="error-text" id="auth-error">${n(r)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${p?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${p?"I already have an account":"Create an account"}</button>
            ${p?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function m(d){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${n(d)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `}function o(d){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${n(d)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `}function i(d="",r=""){return`
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
            <p class="error-text" id="auth-error">${n(d)}</p>
            <p class="muted auth-status" id="auth-status">${n(r)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function l(d={}){let r=!!d.ready,p=d.initialError||"";return`
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
              <label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password" ${r?"":"disabled"}></label>
              <label>Confirm password<input name="confirmPassword" type="password" minlength="6" required autocomplete="new-password" ${r?"":"disabled"}></label>
            </div>
            <p class="error-text" id="auth-error">${n(p)}</p>
            <p class="muted auth-status" id="auth-status">${r?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${r?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function u(d=""){return`
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
            <p class="error-text" id="company-error">${n(d)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `}return{workspaceLoading:t,workspaceLoadError:a,authForm:s,authCallback:m,authCallbackError:o,passwordResetRequest:i,passwordRecovery:l,companyCreate:u}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:c},typeof kt<"u"&&(kt.exports={createAuthDisplayHelpers:c})})()});var An=U((Lr,_t)=>{(function(){function c(e={}){let n=e.escapeHtml,t=e.qrSvgFor,a=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),m=e.getPublicRequestLinksReady||(()=>!0),o=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),l=e.canManageTeam||(()=>!1),u=e.canAdministerPublicRequestLinks||(()=>!1),d=e.publicAppBaseUrl,r=e.publicRequestUrl,p=e.publicRequestQrUrl;function g(){return`
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
      `}function f(E,C){return`
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
      `}function A(){if(!l())return"";let E=d(),C=a(),v=m();return`
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
      `}function $(E){let C=s().find(T=>T.location_id===E.id),v=!!(C&&C.is_active!==!1),S=u(),_=v?r(C.token):"",D=v?p(C.token):"",N=!!(_&&D);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(E.name)}</strong>
            <span>${v?"External request link active":C?"Request link disabled":"No request link yet"}</span>
            ${C?.last_used_at?`<span>Last used ${new Date(C.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${v?`
            <div class="qr-preview">${N?t(_):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(D||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${N?"":"disabled-link"}" href="${n(D||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(D)}" type="button" ${N?"":"disabled"}>Copy QR Link</button>
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
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(E.id)}" type="button" ${m()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:f,loadingRequestForm:h,publicRequestForm:y,publicRequestError:b,publicRequestSuccess:k,publicRequestLinkManager:A,publicRequestLocationCard:$}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:c},typeof _t<"u"&&(_t.exports={createPublicRequestDisplayHelpers:c})})()});(function(c){function e(l){return String(l||"").replace(/\/+$/,"")}function n(l=c.location,u=c.PUBLIC_APP_URL){if(u)return`${e(u)}/`;let d=l?.origin||"",r=l?.pathname||"/",g=r.indexOf("/auth/callback");if(g>=0)return`${d}${r.slice(0,g+1)}`;let f=r.endsWith("/")?r:r.replace(/[^/]*$/,"");return`${d}${f||"/"}`}function t(l=c.location,u=c.PUBLIC_APP_URL){return`${n(l,u)}auth/callback/`}function a(l={},u=c.location,d=c.PUBLIC_APP_URL){let r=new URL(n(u,d));return Object.entries(l).forEach(([p,g])=>{g!=null&&g!==""&&r.searchParams.set(p,g)}),r.href}function s(l){let u=new URL(l),d=new URLSearchParams(u.hash.replace(/^#/,"")),r=u.searchParams;return{code:r.get("code")||"",type:d.get("type")||r.get("type")||"",accessToken:d.get("access_token")||r.get("access_token")||"",refreshToken:d.get("refresh_token")||r.get("refresh_token")||"",error:d.get("error")||r.get("error")||"",errorCode:d.get("error_code")||r.get("error_code")||"",errorDescription:d.get("error_description")||r.get("error_description")||""}}function m(l){return!!(l?.code||l?.accessToken&&l?.refreshToken||l?.error||l?.errorDescription)}function o(l){return l?.type==="recovery"||!l?.type&&!!(l?.accessToken&&l?.refreshToken)}function i(l=c.location){let u=new URL(l.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(d=>u.searchParams.delete(d)),u.hash="",u.href}c.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:a,authParamsFromHref:s,isAuthCallbackParams:m,isPasswordRecoveryParams:o,cleanAuthUrl:i}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:c})})();(function(){function c(v){return String(v||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(v){return v.toISOString().slice(0,10)}function n(v){return v.toISOString()}function t(v){let S=new Date;return S.setDate(S.getDate()-v),S}function a(){let v=new Date;return new Date(v.getFullYear(),v.getMonth(),1)}function s(v=new Date){let S=new Date(v);S.setHours(0,0,0,0),S.setDate(S.getDate()-S.getDay());let _=new Date(S);return _.setDate(_.getDate()+7),{start:S,end:_}}function m(v,S){let _=[];for(let D=0;D<v.length;D+=S)_.push(v.slice(D,D+S));return _}function o(v){return i(v).replace(/\.[^/.]+$/,"")||"photo"}function i(v){return String(v||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function l(v){return v==="active"||v==="all"?"Active":v==="overdue"?"Overdue":v==="completed"?"All Completed":v==="completed_month"?"Completed Month":v==="completed_week"?"Done This Week":v==="open"?"New":String(v||"").replaceAll("_"," ").replace(/\b\w/g,S=>S.toUpperCase())}function u(v){let S=String(v||"corrective").trim().toLowerCase();return S==="inspection"?"preventive":S==="reactive"||S==="request"?"corrective":["corrective","preventive","fabrication"].includes(S)?S:"corrective"}function d(v){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[u(v)]}function r(v){let S=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],_=String(v||"technician").trim().toLowerCase();return _==="member"?"technician":S.includes(_)?_:"technician"}function p(v){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[r(v)]||"Technician"}function g(v){let S={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return S[r(v)]||S.technician}function f(v){return new Date(`${v}T00:00:00`).toLocaleDateString()}function h(v){let S=[new Date(v.created_at).toLocaleString()];return v.file_size_bytes&&S.push(b(v.file_size_bytes)),v.original_size_bytes&&v.file_size_bytes&&v.original_size_bytes!==v.file_size_bytes&&S.push(`optimized from ${b(v.original_size_bytes)}`),S.join(" - ")}function y(v){let S=[];return(v.photo_uploaded_at||v.updated_at||v.created_at)&&S.push(new Date(v.photo_uploaded_at||v.updated_at||v.created_at).toLocaleString()),v.photo_file_size_bytes&&S.push(b(v.photo_file_size_bytes)),v.photo_original_size_bytes&&v.photo_file_size_bytes&&v.photo_original_size_bytes!==v.photo_file_size_bytes&&S.push(`optimized from ${b(v.photo_original_size_bytes)}`),S.join(" - ")||"Photo attached"}function b(v){let S=Number(v)||0;return S?S<1024?`${S} B`:S<1048576?`${Math.round(S/1024)} KB`:`${(S/1048576).toFixed(S>=10485760?0:1)} MB`:""}function k(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(v)||0)}function A(v){return Number(v.unit_cost_at_use??v.parts?.unit_cost??0)||0}function $(v){if(!v.due_at||v.status==="completed")return null;let S=new Date;S.setHours(0,0,0,0);let _=new Date(`${v.due_at}T00:00:00`),D=Math.round((_-S)/864e5);return D<0?{label:"overdue",className:"overdue"}:D===0?{label:"due today",className:"due_today"}:null}function E(){let v=new Date;return v.setHours(0,0,0,0),v}function C(v){return`"${String(v??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:c,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:a,sundayWeekRange:s,chunkArray:m,fileBaseName:o,safeFileName:i,statusLabel:l,normalizeWorkOrderType:u,workOrderTypeLabel:d,normalizeRole:r,roleLabel:p,roleDescription:g,formatDate:f,photoMetaText:h,requestPhotoMetaText:y,formatBytes:b,money:k,partUsageUnitCost:A,getDueState:$,startOfToday:E,csvCell:C})})();(function(){function c(s,m){let o=s?.message||"";return m.some(i=>o.includes(i))}function e(s,m){let o=s?.message||"";return o.includes(m)&&(o.includes("column")||o.includes("schema cache"))}function n(s){let m=s?.message||"";return m.includes("work_order_comments_company_author_profile_fkey")||m.includes("profiles")}function t(s){let m=s?.message||"";return!!(m.includes("procedure_template_id")||m.includes("procedure_templates")||m.includes("procedure_steps"))}function a(s){return c(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:c,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:a}})();(function(){function c(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:c}})();(function(){function c(e,n,t=2e4){let a,s=new Promise((m,o)=>{a=setTimeout(()=>o(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:c}})();var Hr=Q(qt()),Vr=Q(Ct());(function(){function c(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function a(d){return m(`?request=${encodeURIComponent(d)}`)}function s(d){return m(`?qr=${encodeURIComponent(d)}`)}function m(d){let r=o();if(!r)return"";let p=new URL(r);return p.search=d,p.hash="",p.toString()}function o(){let r=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return r?i(r):""}function i(d){try{let r=new URL(String(d||"").trim(),n.location.href);return r.protocol!=="https:"||!l(r.hostname)?"":(r.search="",r.hash="",r.pathname&&r.pathname!=="/"&&!r.pathname.endsWith("/")&&!r.pathname.endsWith(".html")&&(r.pathname=`${r.pathname}/`),r.toString())}catch{return""}}function l(d){let r=String(d||"").toLowerCase();return!(!r||r==="localhost"||r.endsWith(".localhost")||r==="127.0.0.1"||r==="::1"||r==="[::1]"||/^10\./.test(r)||/^192\.168\./.test(r)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(r))}function u(d,r=4){if(!n.qrcode||!d)return'<div class="qr-fallback">QR</div>';try{let p=n.qrcode(0,"M");return p.addData(d),p.make(),p.createSvgTag(r,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:s,publicAppUrlWithSearch:m,publicAppBaseUrl:o,normalizePublicAppUrl:i,isPublicAppHost:l,qrSvgFor:u}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),a=n.querySelector("#print-public-qr");!a||typeof t!="function"||a.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:c}})();(function(){function c(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:c}})();var Zr=Q($t()),Xr=Q(Pt());(function(){function c(e){function n(l){return e[l]()}function t(l,u){return typeof e[l]=="function"?e[l]():u}function a(l){let u=n("searchQuery"),d=n("activeSection"),r=n("activeStatusFilter"),p=!!u.trim();return i(s(l,{statusFilter:p?"__any__":d==="work"&&r==="requests"?"__none__":r,section:d,includeQueue:!p,includeSearch:!0}))}function s(l,u={}){let d=u.section||n("activeSection"),r=l.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(r=r.eq("location_id",n("activeLocationId"))),u.includeQueue!==!1&&(r=m(r,d)),u.includeAttributeFilters!==!1&&d==="work"){let p=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");p!=="all"&&(r=r.eq("type",p)),g!=="all"&&(r=r.eq("priority",g))}if(r=o(r,u.statusFilter||n("activeStatusFilter")),u.includeSearch!==!1){let p=e.postgrestSearchTerm(n("searchQuery"));if(p){let g=n("workOrderRelatedSearch"),f=[`title.ilike.%${p}%`,`description.ilike.%${p}%`,`production_action.ilike.%${p}%`,`priority.ilike.%${p}%`,`type.ilike.%${p}%`,`status.ilike.%${p}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];r=r.or(f.join(","))}}return r}function m(l,u){if(u==="mywork"){let d=n("session").user.id;return n("myWorkFilter")==="created"?l.eq("created_by",d):l.or(`assigned_to.eq.${d},and(production_action_assigned_to.eq.${d},production_action_status.eq.open)`)}if(u!=="work")return l;if(n("workOrderAssigneeFilter")){let d=n("workOrderAssigneeFilter");return l.or(`assigned_to.eq.${d},and(production_action_assigned_to.eq.${d},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?l.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?l.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?l.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):l}function o(l,u){let d=e.isoDate(e.startOfToday());if(u==="__any__")return l;if(u==="__none__")return l.eq("id","00000000-0000-0000-0000-000000000000");if(u==="overdue")return l.neq("status","completed").lt("due_at",d);if(u==="completed_month")return l.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(u==="completed_week"){let r=e.sundayWeekRange();return l.gte("completed_at",e.isoDateTime(r.start)).lt("completed_at",e.isoDateTime(r.end))}return u==="active"||u==="all"?l.neq("status","completed"):l.eq("status",u)}function i(l){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?l.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?l.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?l.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?l.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?l.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):l.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:m,applyWorkOrderStatusFilter:o,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let s=n.querySelector(`#${a.dataset.jumpWorkSection}`);if(!s)return;let m=s.closest("details");m&&(m.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let o=s;o.classList.add("jump-highlight","field-jump-highlight"),t(()=>o.classList.remove("jump-highlight"),1400),t(()=>o.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.renderWorkspace,m=e.setWorkOrderSearchMode;if(!a||!s||!m)return;let o=()=>{a.setSearchQuery(""),m(!1),t.setItem("maintainops.searchQuery","")},i=l=>{a.setActiveSection(l),t.setItem("maintainops.activeSection",l)};n.querySelectorAll("[data-search-work-order]").forEach(l=>{l.addEventListener("click",()=>{a.setActiveWorkOrderId(l.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),i("work"),o(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(l=>{l.addEventListener("click",()=>{a.setActiveAssetId(l.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),i("assets"),o(),s()})}),n.querySelectorAll("[data-search-part]").forEach(l=>{l.addEventListener("click",()=>{a.setActivePartId(l.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),i("parts"),o(),s()})}),n.querySelectorAll("[data-search-request]").forEach(l=>{l.addEventListener("click",()=>{i("requests"),o(),s()})}),n.querySelectorAll("[data-search-section]").forEach(l=>{l.addEventListener("click",()=>{i(l.dataset.searchSection),o(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:c}})();(function(){let c=null,e=0,n=Promise.resolve();function t(a={}){let s=a.documentRef||document,m=a.storage||localStorage,o=a.state,i=a.windowRef||(typeof window<"u"?window:null),l=a.setTimeoutRef||setTimeout,u=a.clearTimeoutRef||clearTimeout,d=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!o)return;let r=()=>{e+=1,c!==null&&(u(c),c=null)},p=f=>{f&&typeof i?.scrollTo=="function"&&i.scrollTo(f.x,f.y)},g=(f,h,y,b)=>{let k=s.getElementById?s.getElementById(f):s.querySelector(`#${f}`);if(!k)return;let A=k.value.length,$=Math.min(h??A,A),E=Math.min(y??$,A);k.focus({preventScroll:!0}),k.setSelectionRange($,E),p(b)};s.querySelectorAll(".workspace-search-input").forEach(f=>{f.addEventListener("input",()=>{let h=f.id,y=f.selectionStart,b=f.selectionEnd;r();let k=e;o.setSearchQuery(f.value),a.invalidateExactWorkOrderSearchCache(),o.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),o.getSearchQuery().trim()&&(o.setActiveWorkOrderId(null),o.setActiveAssetId(null),o.setActivePartId(null),o.setQuickFixMode(!1),o.setCreateWorkOrderMode(!1),o.setQuickFixAssetId(null),o.setQuickFixRequestId(null)),m.setItem("maintainops.searchQuery",o.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),c=l(()=>(c=null,n=n.catch(()=>null).then(async()=>{if(k!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),k!==e))return;let A=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,$=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),E=!("activeElement"in s)||s.activeElement===$;a.renderWorkspace(),E?g(h,y,b,A):p(A)}),n),d)})}),s.querySelectorAll("[data-view-work-search]").forEach(f=>{f.addEventListener("click",async()=>{r(),o.setActiveSection("work"),o.setActiveWorkOrderId(null),o.setActiveAssetId(null),o.setActivePartId(null),o.setCreateWorkOrderMode(!1),o.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),m.setItem("maintainops.activeSection",o.getActiveSection()),await a.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(f=>{f.addEventListener("click",async()=>{r(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(o){!a||typeof a.scrollTo!="function"||a.scrollTo({top:o,behavior:"auto"})}async function m(o){let i=Number(a?.scrollY??a?.pageYOffset??0);if(await o(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(o.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setMyWorkFilter(o.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderFilter(o.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{t.setActiveStatusFilter(o.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{let i=o.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{let i=o.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderTypeFilter(o.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderPriorityFilter(o.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setWorkSort(o.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{t.setWorkSort(o.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{t.setWorkGroup(o.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderAssigneeFilter(o.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(o=>{o.addEventListener("click",async()=>{o.disabled||await m(async()=>{t.setRequestViewFilter(o.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(o.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setPartsPage(t.getPartsPage()+(o.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setAssetsPage(t.getAssetsPage()+(o.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{t.setFinancialPage(t.getFinancialPage()+(o.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(o=>{o.addEventListener("change",async()=>{await m(async()=>{o.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(o.value),o.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(o.value),o.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(o.value),o.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(o.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(o=>{o.addEventListener("click",async()=>{await m(async()=>{let i=o.dataset.pageDirection==="next"?1:-1;if(o.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(o.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),o.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),o.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),o.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),o.dataset.listPage?.startsWith("planning-")){let l=o.dataset.listPage.replace("planning-","");t.setPlanningPage(l,t.getPlanningPage(l)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(o=>{o.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(o.dataset.planningGroup,!!o.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.windowRef||(typeof window<"u"?window:null),m=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let o=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function i(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function l(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function u(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function d(){e.renderWorkspace()}function r(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function p(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(p);return}p()}let f=n.querySelector("#back-to-my-work");f&&f.addEventListener("click",()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),r(),o(),e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),r(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.id),a.setActiveAssetId(null),r(),o(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),a.setActiveWorkOrderId(y.dataset.workPhotoJump),a.setActiveAssetId(null),r(),a.setActiveSection("work"),o(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",b=>{b.stopPropagation(),a.setActiveAssetId(y.dataset.openAsset),a.setActiveWorkOrderId(null),r(),o(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-id]").forEach(y=>{let b=()=>{a.setActiveAssetId(y.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),r(),o(),a.setReportIssueMode(!1),a.setActiveSection("assets"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()};y.addEventListener("click",b),y.addEventListener("keydown",k=>{k.key!=="Enter"&&k.key!==" "||(k.preventDefault(),b())})}),n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.miniWorkOrder),a.setActiveAssetId(null),r(),a.setActiveSection("work"),o(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{y.addEventListener("toggle",async()=>{let b=y.dataset.assetId,k=y.dataset.assetRelationshipSection;!b||!k||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(b,k,y.open),y.open&&u(k)&&await i(b),y.open&&k==="asset-history"&&await l(b),d())})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.assetId,A=y.dataset.assetRelationSection,E=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,A):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,A,E),d()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.openAssetHistory;k&&(a.setActiveAssetId(k),a.setActiveWorkOrderId(null),o(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(k),await l(k),e.renderWorkspace(),m())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.backAssetHistory;k&&a.setActiveAssetId(k),r(),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let k=y.dataset.assetId,$=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,"asset-history",$),e.renderWorkspace(),m()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(o){!a||typeof a.scrollTo!="function"||a.scrollTo({top:o,behavior:"auto"})}function m(){let o=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(o));return}s(o)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(o=>{o.addEventListener("click",()=>{t.setPartInventoryFilter(o.dataset.partInventoryFilter),e.resetPartsPage(),m()})}),n.querySelectorAll("[data-part-sort]").forEach(o=>{o.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(o.value||"default"),e.resetPartsPage(),m())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(o=>{o.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===o.dataset.assetStatusFilter?"all":o.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),m()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(o=>{o.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===o.dataset.assetTypeFilter?"all":o.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),m()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(o=>{o.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(o.value||"all"),e.resetAssetsPage(),m())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:c}})();(function(){function c(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(m){e.showNotice(`Could not update status: ${m.message||m}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",a=>a.stopPropagation()),t.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:c}})();var la=Q(At()),ua=Q(Rt());(function(){function c(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let m=e.getWorkOrderById(s.dataset.id);if(!m)return;let o=s.dataset.copyDowntime==="subject",i=o?e.downtimeEmailSubject(m):e.downtimeEmailBody(m),l=await e.copyTextToClipboard(i);s.textContent=l?"Copied":"Copy failed",a(()=>{s.textContent=o?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:c}})();(function(){function c(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:c}})();var ma=Q(Et());(function(){function c(e={}){let n=e.documentRef||document;function t(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(m),e.renderWorkspace()}async function a(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let o=e.getPhotoPathsByWorkOrder(m);if(o.length){let l=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(o),"Work order photo cleanup timed out.",15e3);l.error&&e.warnRef("Work order photo storage cleanup failed",l.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(m),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(o){e.alertRef(`Could not delete work order: ${o.message||o}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(m=>{m.addEventListener("click",o=>{o.stopPropagation(),t(m.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(m=>{m.addEventListener("click",o=>{o.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(m=>{m.addEventListener("click",async o=>{o.stopPropagation(),await a(m.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:a,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace;!t||typeof a!="function"||(n.querySelectorAll("[data-open-part]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(s.dataset.openPart),a()}),s.addEventListener("keydown",m=>{m.key!=="Enter"&&m.key!==" "||(m.preventDefault(),t.setActivePartId(s.dataset.openPart),a())})}),n.querySelectorAll("[data-close-part-detail]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(null),t.setShowPartSourceManager(!1),a()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(s=>{s.addEventListener("click",()=>{t.setShowPartSourceManager(!t.getShowPartSourceManager()),a()})}))}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.messageComposerScopeNote,m=e.autoGrowTextarea;if(!t||typeof a!="function")return;let o=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(d=>d.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(d=>d.addEventListener("click",()=>e.setMessageView?.(d.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(d=>d.addEventListener("click",()=>e.quoteMessage?.(d.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(d=>d.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async d=>{d.currentTarget.disabled=!0;let r=d.currentTarget;try{await e.loadOlderMessages?.()}finally{r.isConnected&&(r.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(d=>{d.addEventListener("click",()=>{let r=d.dataset.messageFilter;t.setMessageThreadFilter(r),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),o.setItem("maintainops.messageThreadFilter",r),o.setItem("maintainops.messageThreadsPage","1"),a()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(d=>{d.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(d.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(d.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),o.setItem("maintainops.activeSection","work"),a()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),o.setItem("maintainops.messageComposerWorkOrderId",""),a()});let l=n.querySelector("#message-search");l&&l.addEventListener("input",()=>{let d=l.value;t.setMessageSearchQuery(d),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),o.setItem("maintainops.messageSearchQuery",d),o.setItem("maintainops.messageThreadsPage","1"),a();let r=n.querySelector("#message-search");r&&(r.focus({preventScroll:!0}),r.selectionStart!=null&&r.setSelectionRange(l.selectionStart,l.selectionEnd))});let u=n.querySelector("#message-thread-form");if(u){let d=u.querySelector("#message-thread-type"),r=u.querySelector(".message-direct-field"),p=u.querySelector("#message-scope-note");if(d&&r&&p&&typeof s=="function"){let g=()=>{let f=d.value==="direct";r.classList.toggle("hidden-section",!f);let h=r.querySelector("select");h&&(h.disabled=!f,h.required=f);let y=u.querySelector("[name='title']");y&&(y.required=!f),p.textContent=s(d.value),e.showExistingConversation?.(f?h?.value:"")};d.addEventListener("change",g),r.querySelector("select")?.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(d=>{d.addEventListener("click",()=>{let r=n.querySelector("#message-thread-form");if(!r)return;let p=r.querySelector("details"),g=r.querySelector("#message-thread-type"),f=r.querySelector("select[name='direct_user_id']"),h=r.querySelector(".message-direct-field"),y=r.querySelector("#message-scope-note"),b=r.querySelector("input[name='title']");p&&(p.open=!0),g&&(g.value="direct"),f&&(f.value=d.dataset.messagePerson||"",f.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),b&&b.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(d=>{d.addEventListener("click",()=>{let p=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!p)return;let g=p.value.trim();p.value=g?`${g}
${d.dataset.quickReply}`:d.dataset.quickReply,p.focus(),typeof m=="function"&&m(p)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof a!="function"||typeof s!="function")return;let m=n.querySelector("#part-search-form");if(!m)return;let o=l=>{t.setPartSearchQuery(l||""),s(),a()},i=m.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{o(i.value||"");let l=n.querySelector("#part-search");if(!l)return;l.focus();let u=l.value.length;l.setSelectionRange(u,u)}),m.addEventListener("submit",l=>{l.preventDefault();let u=e.FormDataRef||FormData,d=new u(m).get("part_search")||"";o(d),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(m=>{m.addEventListener("click",async()=>{let o=performance.now(),i=m.dataset.section;e.visibleNavItems().some(([l])=>l===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,o))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;async function s(m){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(m),e.getActiveThreadId&&e.getActiveThreadId()!==m||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(m),(!e.getActiveThreadId||e.getActiveThreadId()===m)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==m)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(m=>{m.addEventListener("click",async()=>{let o=m.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(o),a.setItem("maintainops.activeMessageThreadId",o),await s(o)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(m=>{m.addEventListener("click",async()=>{let o=m.dataset.openWorkMessageThread;t.setActiveMessageThreadId(o),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",o),a.setItem("maintainops.activeSection","messages"),await s(o)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let m=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(m),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",m),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",()=>{e.exportActiveSectionCsv()})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:c}})();var Aa=Q(Ot());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:c}})();(function(){function c(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(a=>{c(a),a.addEventListener("input",()=>c(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:c,bindWorkspaceTextareaAutoGrow:e}})();var Ma=Q(Wt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(m=>{m.addEventListener("click",async()=>{let o=await t(m.dataset.copyTeamInvite||"");m.textContent=o?"Copied":"Copy failed",a(()=>{m.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(m=>{m.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(m=>{m.addEventListener("click",()=>{t.setQuickFixAssetId(m.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:c}})();var La=Q(xt());(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(m=>{m.addEventListener("click",async()=>{let o=await t(m.dataset.copyPublicRequestLink);m.textContent=o?"Copied":"Copy failed",a(()=>{m.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:c}})();var Ua=Q(Mt());(function(){function c(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let m=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(a.dataset.createFollowUp,m?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:c}})();var za=Q(Dt());(function(){function c(e={}){let n=e.documentRef||document,t=e.createComment,a=n.querySelector("#comment-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,a=n.querySelector("#quick-update-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,a=n.querySelector("#edit-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{t(a),a.addEventListener("change",()=>t(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:c}})();var Ja=Q(Tt()),Za=Q(It()),Xa=Q(Ft()),eo=Q(Lt()),to=Q(Nt()),no=Q(Ut()),ro=Q(Qt()),ao=Q(Bt()),oo=Q(jt()),io=Q(zt()),so=Q(Gt()),co=Q(Ht()),lo=Q(Vt()),uo=Q(Yt()),po=Q(Kt()),mo=Q(Jt()),fo=Q(Zt()),go=Q(Xt()),ho=Q(en()),yo=Q(tn()),bo=Q(nn()),wo=Q(rn()),vo=Q(an()),ko=Q(on()),_o=Q(sn());(function(){function c(e){function n(a){return e[a]()}function t(a,s=n("requestViewFilter")){let m=a.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(m=m.eq("location_id",n("activeLocationId"))),s==="converted"?m=m.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(m=m.eq("status","submitted").is("converted_work_order_id",null));let o=e.postgrestSearchTerm(n("searchQuery"));if(o){let i=`%${o}%`,l=n("assets").filter(e.matchesActiveLocation).filter(u=>e.matchesQuery([u.name,u.asset_code,u.manufacturer,u.model,u.location,u.status,u.asset_type,e.parentAssetFor()(u)?.name],o)).map(u=>u.id).slice(0,e.SEARCH_ID_PAGE_SIZE);m=m.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...l.length?[`asset_id.in.(${l.join(",")})`]:[]].join(","))}return m}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:c}})();(function(){function c(e){function n(p){return e[p]()}async function t(){let p=n("searchQuery").trim();if(!p||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.asset_code,b.manufacturer,b.model,b.location,b.status,b.asset_type,e.parentAssetFor()(b)?.name],p)).map(b=>b.id),f=n("procedureTemplates").filter(b=>e.matchesQuery([b.name,b.description,...(b.procedure_steps||[]).map(k=>k.prompt)],p)).map(b=>b.id),h=n("parts").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.sku,b.supplier_name,b.quantity_on_hand,b.reorder_point,b.unit_cost],p)).map(b=>b.id),y=new Set;await Promise.all([a(y,h),s(y,"work_order_comments",["body"],p),s(y,"work_order_events",["event_type","summary"],p),s(y,"work_order_photos",["file_name"],p),s(y,"work_order_step_results",["value"],p)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:f.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function a(p,g,f={}){if(!g.length)return;let y=f.maxRows??300;for(let b of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",b),k=>{k.forEach(A=>{A.work_order_id&&p.add(A.work_order_id)}),y-=k.length},y)}catch(k){e.warn("Part-linked work order search failed",k);return}}}async function s(p,g,f,h,y={}){let b=e.postgrestSearchTerm(h);if(!b)return;let k=f.map($=>`${$}.ilike.%${b}%`).join(","),A=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(k),$=>{$.forEach(E=>{E.work_order_id&&p.add(E.work_order_id)})},A)}catch($){e.warn(`${g} work order search failed`,$)}}async function m(p={}){let g=await o(),f=g.length,h=Math.max(1,Math.ceil(f/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,b=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(E=>E.id);if(!b.length)return{data:[],error:null,count:f};let k=p.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),A=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:k,ids:b});if(A.error)return A;let $=new Map((A.data||[]).map(E=>[E.id,E]));return{...A,data:b.map(E=>$.get(E)).filter(Boolean),count:f}}async function o(){let p=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===p)return g.rows;let f=n("searchQuery").trim(),h=new Map;await i(h,f);let y=n("assets").filter(e.matchesActiveLocation).filter(E=>e.matchesQuery([E.name,E.asset_code,E.manufacturer,E.model,E.location,E.status,E.asset_type,e.parentAssetFor()(E)?.name],f)).map(E=>E.id),b=n("procedureTemplates").filter(E=>e.matchesQuery([E.name,E.description,...(E.procedure_steps||[]).map(C=>C.prompt)],f)).map(E=>E.id),k=n("parts").filter(e.matchesActiveLocation).filter(E=>e.matchesQuery([E.name,E.sku,E.supplier_name,E.quantity_on_hand,E.reorder_point,E.unit_cost],f)).map(E=>E.id);await Promise.all([l(h,"asset_id",y),l(h,"procedure_template_id",b)]);let A=new Set;await Promise.all([a(A,k,{maxRows:1/0}),s(A,"work_order_comments",["body"],f,{maxRows:1/0}),s(A,"work_order_events",["event_type","summary"],f,{maxRows:1/0}),s(A,"work_order_photos",["file_name"],f,{maxRows:1/0}),s(A,"work_order_step_results",["value"],f,{maxRows:1/0})]),await u(h,[...A]);let $=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:p,rows:$}),$}async function i(p,g){let f=e.postgrestSearchTerm(g);if(!f)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${f}%`).join(",");await e.fetchPagedSearchRows(()=>d().or(h),y=>r(p,y))}async function l(p,g,f){if(f.length)for(let h of e.chunkArray(f,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>d().in(g,h),y=>r(p,y))}async function u(p,g){if(g.length)for(let f of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>d().in("id",f),h=>r(p,h))}function d(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function r(p,g){(g||[]).forEach(f=>{f?.id&&p.set(f.id,{...p.get(f.id)||{},...f})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:m,exactWorkOrderSearchRows:o,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:c}})();(function(){function c(e){function n(o){return e[o]()}function t(){let o=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),l=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],o)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],o)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],o)).sort((g,f)=>new Date(f.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),r=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],o)).sort((g,f)=>String(g.next_due_at||"").localeCompare(String(f.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),p=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(f=>f.prompt)],o)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:l,parts:u,requests:d,pm:r,procedures:p}}function a(o="all"){let i=e.startOfToday(),l=new Date(i);return l.setDate(l.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(u=>u.status!=="completed").filter(u=>e.matchesSearch([u.title,u.description,u.priority,u.status,u.assets?.name,e.assignmentLabel(u)])).filter(u=>o==="no_due"?!u.due_at:!!u.due_at).map(u=>{let d=u.due_at?new Date(`${u.due_at}T00:00:00`):null;return{kind:o==="no_due"?"no_due":"work",id:u.id,title:u.title,priority:u.priority,status:u.status,assetName:u.assets?.name||"No equipment",dueAt:u.due_at,due:d,createdAt:u.created_at||"",assignedTo:e.assignmentLabel(u),workOrder:u}}).filter(u=>o==="no_due"?!0:o==="overdue"?u.due<i:o==="today"?u.due.getTime()===i.getTime():o==="soon"?u.due>i&&u.due<=l:!0).sort((u,d)=>{if(o==="no_due"){let r={critical:4,high:3,medium:2,low:1};return(r[d.priority]||0)-(r[u.priority]||0)||new Date(u.createdAt||0)-new Date(d.createdAt||0)}return u.due-d.due})}function s(){let o=e.startOfToday(),i=new Date(o);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(l=>{let u=new Date(`${l.next_due_at}T00:00:00`);return u>=o&&u<=i}).filter(l=>e.matchesSearch([l.title,l.frequency,l.next_due_at,l.assets?.name])).map(l=>({kind:"pm",id:l.id,title:l.title,assetName:l.assets?.name||"No equipment",dueAt:l.next_due_at,due:new Date(`${l.next_due_at}T00:00:00`)})).sort((l,u)=>l.due-u.due)}function m(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(o=>o.follow_up_needed).filter(o=>e.matchesSearch([o.title,o.description,o.failure_cause,o.resolution_summary,o.assets?.name,o.assigned_profile?.full_name])).map(o=>({kind:"follow_up",id:o.id,title:o.title,assetName:o.assets?.name||"No equipment",completedAt:o.completed_at?new Date(o.completed_at).toLocaleDateString():"not completed",resolution:o.resolution_summary||o.completion_notes||"",workOrder:o})).sort((o,i)=>o.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:a,planningPmItems:s,followUpItems:m}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:c}})();(function(){function c(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,a){return n.from("locations").insert({company_id:t,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:c,createLocation:e}})();(function(){function c(m,o){return m.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",o)}function e(m,o){return m.from("company_members").select("*").eq("company_id",o).order("created_at",{ascending:!0})}function n(m,o){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",o).order("created_at",{ascending:!1})}function t(m,o){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",o).order("created_at",{ascending:!1})}function a(m,o){return m.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",o).order("created_at",{ascending:!1})}function s(m,o){return m.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",o).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:c,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:a,listRequestNotificationRecipients:s}})();(function(){function c(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:c}})();(function(){function c(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:c,listAssetFinancials:e}})();(function(){function c(i,l,u={}){return i.from("work_orders").select(l,u)}function e(i){return i.from("work_orders").select("id",{count:"exact",head:!0})}function n(i,l,u,d){return i.from("work_orders").select(d).eq("company_id",l).eq("id",u).maybeSingle()}function t(i,l,u,d){return i.from("work_orders").select(d).eq("company_id",l).eq("asset_id",u).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function a(i,l){let{companyId:u,locationId:d,locationsReady:r,selectClause:p,ids:g}=l,f=i.from("work_orders").select(p).eq("company_id",u).in("id",g);return r&&d&&(f=f.eq("location_id",d)),f}function s(i,l){let{companyId:u,locationId:d,locationsReady:r}=l,p=i.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",u);return r&&d&&(p=p.eq("location_id",d)),p}function m(i,l){let{companyId:u,locationId:d,locationsReady:r}=l,p=i.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",u).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return r&&d&&(p=p.eq("location_id",d)),p.order("id",{ascending:!0})}async function o(i,l,u=1/0,d=1e3){let r=0,p=0;for(;p<u;){let g=Math.min(d,u-p),{data:f,error:h}=await i().range(r,r+g-1);if(h)throw h;let y=f||[];if(l(y),p+=y.length,y.length<g)break;r+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:c,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:a,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:m,fetchPagedSearchRows:o}})();var Oo=Q(cn());(function(){function c(s){return s.rpc("get_my_companies")}function e(s,m){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",m).order("created_at",{ascending:!0})}function n(s,m){return s.from("company_members").select("company_id, role").eq("user_id",m).order("created_at",{ascending:!0})}function t(s,m){return s.from("companies").select("id, name, logo_path, created_at").in("id",m).order("created_at",{ascending:!0})}function a(s,m){return s.from("companies").select("id, name, created_at").in("id",m).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:c,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:a}})();(function(){function c(a,s){return a.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(a,s){return a.from("app_issue_reports").insert(s)}function n(a,s,m,o){return a.from("app_issue_reports").update({status:o,resolved_at:o==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",m)}function t(a,s,m){return a.from("app_issue_reports").delete().eq("company_id",s).eq("id",m)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:c,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let c="user_id, shop_reference_favorites, updated_at";function e(t,a){return t.from("user_preferences").select(c).eq("user_id",a).maybeSingle()}function n(t,a,s){return t.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(c).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Do=Q(ln()),To=Q(un()),Io=Q(dn()),Fo=Q(pn());(function(){function c(t,a,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${a}</strong></article>`}function e(t,a,s,m="neutral"){return`
    <article class="insight dashboard-card tone-${m}">
      <span>${t}</span>
      <strong>${a}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(o=>String(o||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),m=window.MaintainOpsDom?.escapeHtml||(o=>String(o??""));return`
    <section class="team-role-guide">
      ${t.map(o=>`
        <article>
          <strong>${a(o)}</strong>
          <span>${m(s(o))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:c,renderInsight:e,renderRoleGuide:n})})();var No=Q(mn());(function(){function c(d,r,p="active",g={},f){let h=f.getActiveStatusFilter(),y=g.filter||g.section,b=y?"button":"article",k=g.filter&&h===g.filter?" selected":"",A=p.includes("overdue")&&Number(r)>=3,$=A?" alert-blink":"",E=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),C=E?` ${E}`:"";return`
    <${b} class="gauge-readout ${p}${k}${$}"${C}>
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
      <strong>${r}</strong>
      <span>${f.escapeHtml(d)}</span>
    </${b}>
  `}function e(d){let r=d.getWorkOrderDashboardCounts()||{},p=r.activeWork||0,g=r.newWork||0,f=r.inProgress||0,h=r.blocked||0,y=r.overdue||0,b=r.completedAll||0,k=r.completedMonth||0,A=r.completedWeek||0,$=d.getRequestsReady()?d.openMaintenanceRequests().filter(d.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${c("Active Work",p,"active",{filter:"active"},d)}
      ${c("New",g,"new",{filter:"open"},d)}
      ${c("In Progress",f,"in_progress",{filter:"in_progress"},d)}
      ${c("Blocked",h,"blocked",{filter:"blocked"},d)}
      ${c("Overdue",y,"overdue",{filter:"overdue"},d)}
      ${c("Requests",$,"request",{filter:"requests"},d)}
      ${c("All Completed",b,"completed",{filter:"completed"},d)}
      ${c("Completed Month",k,"completed",{filter:"completed_month"},d)}
      ${c("Done This Week",A,"completed",{filter:"completed_week"},d)}
    </div>
  `}function n(d,r){let p=d||{},g=p.newWork||0,f=p.inProgress||0,h=p.blocked||0,y=p.activeWork??g+f+h,b=p.overdue||0,k=p.completedAll||0,A=p.completedMonth||0,$=p.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${c("Active Work",y,"active workload-pill",{filter:"active"},r)}
      ${c("New",g,"new workload-pill",{filter:"open"},r)}
      ${c("In Progress",f,"in_progress workload-pill",{filter:"in_progress"},r)}
      ${c("Blocked",h,"blocked workload-pill",{filter:"blocked"},r)}
      ${c("Overdue",b,"overdue workload-pill",{filter:"overdue"},r)}
      ${c("All Completed",k,"completed workload-pill",{filter:"completed"},r)}
      ${c("Completed Month",A,"completed workload-pill",{filter:"completed_month"},r)}
      ${c("Done This Week",$,"completed workload-pill",{filter:"completed_week"},r)}
    </div>
  `}function t(d){return d.getWorkOrders().filter(r=>d.getDueState(r)?.className==="overdue")}function a(d){return d.getWorkOrders().filter(r=>s(r,d))}function s(d,r,p=new Date){if(!d.completed_at)return!1;let g=new Date(d.completed_at),f=r.sundayWeekRange(p);return Number.isFinite(g.getTime())&&g>=f.start&&g<f.end}function m(d){return d.getWorkOrders().filter(o)}function o(d){let r=new Date,p=new Date(r.getFullYear(),r.getMonth(),1);return!!(d.completed_at&&new Date(d.completed_at)>=p)}function i(d){let r=d.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!r.length)return 0;let p=r.reduce((g,f)=>g+Number(f.actual_minutes||0),0);return Math.round(p/r.length)}function l(d){let r=new Date;r.setHours(0,0,0,0);let p=new Date(r);return p.setDate(p.getDate()+7),d.getPreventiveSchedules().filter(g=>{let f=new Date(`${g.next_due_at}T00:00:00`);return f>=r&&f<=p})}function u(d){return Object.freeze({renderGaugeReadout:(r,p,g="active",f={})=>c(r,p,g,f,d),renderWorkOrderGaugeDashboard:()=>e(d),renderWorkloadStrip:r=>n(r,d),overdueWorkOrders:()=>t(d),completedThisWeek:()=>a(d),isCompletedThisWeek:(r,p)=>s(r,d,p),completedThisMonth:()=>m(d),isCompletedThisMonth:o,averageCompletionMinutes:(r=d.getWorkOrders())=>i(r),preventiveDueSoon:()=>l(d)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:u})})();(function(){function c(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:c,navIcon:e})})();(function(){function c(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:c,assetStatusLabel:e})})();(function(){function c({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:a,getPartInventoryFilter:s,assetTypeLabel:m,assetStatusLabel:o}){function i(d){return e().trim()?"No requests match this search.":d==="converted"?"No converted requests at this location.":d==="all"?"No requests at this location yet.":"No active requests waiting for review."}function l(){let d=n(),r=t?t():"all";return e().trim()?"No equipment matches this search.":d!=="all"?`No ${o(d).toLowerCase()} equipment found.`:r!=="all"?`No ${m(r).toLowerCase()} equipment found.`:"No equipment added yet."}function u(){return a().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:l,partEmptyStateText:u}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:c}})();var zo=Q(fn());(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:a,getSearchQuery:s}){function m(f){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(f)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${o("Work Orders",f.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${o("Equipment",f.assets,l,"asset")}
            ${o("Parts",f.parts,u,"parts")}
            ${o("Requests",f.requests,d,"comment")}
            ${o("PM",f.pm,r,"procedure")}
            ${o("Procedure Checklists",f.procedures,p,"procedure")}
          </div>
        </section>
      `}function o(f,h,y,b,k={}){return`
        <section class="global-result-group relationship-detail ${b}">
          <div class="panel-header compact">
            <h3>${e(f)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${k.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function i(f){return`
        <button class="global-result-item" data-search-work-order="${f.id}" type="button">
          <strong>${e(f.title)}</strong>
          <span>${n(f.status)} - ${e(f.assets?.name||"No equipment")} - ${e(t(f))}</span>
        </button>
      `}function l(f){return`
        <button class="global-result-item" data-search-asset="${f.id}" type="button">
          <strong>${e(f.name)}</strong>
          <span>${e(f.asset_code||"No serial")} - ${e(f.status)} - ${e(f.location||a())}</span>
        </button>
      `}function u(f){let h=Number(f.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${f.id}" type="button">
          <strong>${e(f.name)}</strong>
          <span>${e(f.sku||"No SKU")} - ${h} on hand${f.supplier_name?` - ${e(f.supplier_name)}`:""}</span>
        </button>
      `}function d(f){return`
        <button class="global-result-item" data-search-request="${f.id}" type="button">
          <strong>${e(f.title)}</strong>
          <span>${e(f.status)} - ${e(f.assets?.name||"No equipment")}</span>
        </button>
      `}function r(f){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(f.title)}" type="button">
          <strong>${e(f.title)}</strong>
          <span>${e(f.assets?.name||"No equipment")} - due ${e(f.next_due_at||"unset")}</span>
        </button>
      `}function p(f){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(f.name)}" type="button">
          <strong>${e(f.name)}</strong>
          <span>${(f.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(f){return Object.values(f).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:m,renderGlobalResultGroup:o,renderGlobalWorkResult:i,renderGlobalAssetResult:l,renderGlobalPartResult:u,renderGlobalRequestResult:d,renderGlobalPmResult:r,renderGlobalProcedureResult:p,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:c}})();var Ho=Q(gn()),Vo=Q(hn()),Yo=Q(yn());(function(){function c({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:a=(l,u)=>u,renderListPagination:s,statusLabel:m,renderRelationshipChips:o,canEditOperationalRecords:i=()=>!0}){function l(p,g,f,h,y={}){let b=n||12,k=typeof t=="function"?t(h):1,A=Math.max(1,Math.ceil(g.length/b)),$=Math.min(Math.max(k,1),A),E=g.slice(($-1)*b,$*b),C=a(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${C?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(p)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${f}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${E.map(r).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${h}`,g.length,$,A):""}
          </div>
        </details>
      `}function u(p,g,f,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(p)}</h3>
            <p>${e(g)}</p>
          </header>
          ${f}
        </section>
      `}function d(p){return`
        <div class="planning-grid">
          ${u("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${l("No Due Date",p.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${l("Follow-up Needed",p.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${u("Current schedule","Work requiring attention now.",`
            ${l("Overdue",p.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${l("Due Today",p.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${u("Upcoming","Near-term maintenance and preventive work.",`
            ${l("Next 7 Days",p.soon,"in_progress","soon")}
            ${l("PM Due Soon",p.pm,"open","pm")}
          `)}
        </div>
      `}function r(p){if(p.kind==="follow_up")return`
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
        `;if(p.kind==="no_due"){let g=p.createdAt?new Date(p.createdAt):null,f=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(p.priority)} ${e(m(p.status))}</span>
              <strong>${e(p.title)}</strong>
              <p>${e(p.assetName)} - ${e(p.assignedTo||"Unassigned")}</p>
              <p>Created ${e(f)}</p>
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
            <span class="eyebrow">${e(p.priority)} ${e(m(p.status))}</span>
            <strong>${e(p.title)}</strong>
            <p>${e(p.assetName)} - due ${e(p.dueAt)}</p>
          </div>
          ${o(p.workOrder)}
        </article>
      `}return{renderPlanningGroup:l,renderPlanningBoard:d,renderPlanningItem:r}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:c}})();var Jo=Q(bn());(function(){function c({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:s,getPartsPage:m,getAssetsPage:o}){function i(r,p){if(r<=e)return"";let g=s(),f=(g-1)*e+1,h=Math.min(r,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${h} of ${r} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function l(r,p){if(r<=n)return"";let g=m(),f=(g-1)*n+1,h=Math.min(r,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${h} of ${r} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function u(r,p){if(r<=t)return"";let g=o(),f=(g-1)*t+1,h=Math.min(r,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${h} of ${r} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function d(r,p,g,f){if(p<=a)return"";let h=(g-1)*a+1,y=Math.min(p,g*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${r}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${p} - Page ${g} of ${f}</span>
          <button class="secondary-button page-action-button" data-list-page="${r}" data-page-direction="next" type="button" ${g>=f?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:l,renderAssetsPagination:u,renderListPagination:d}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:c}})();var Xo=Q(wn());(function(){function c({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:a,matchesActiveLocation:s,isAssetDescendantOf:m,parentAssetFor:o}){function i(g=t()){return n().map(f=>`<option value="${f.id}" ${f.id===g?"selected":""}>${e(f.name)}</option>`).join("")}function l(g){let f=o(g);return f?`${g.name} - part of ${f.name}`:g.name}function u(g=""){let f=a().filter(s).sort((b,k)=>l(b).localeCompare(l(k))),h=g?a().find(b=>b.id===g):null;return(h&&!f.some(b=>b.id===h.id)?[h,...f]:f).map(b=>`<option value="${b.id}" ${b.id===g?"selected":""}>${e(l(b))}</option>`).join("")}function d(g="",f=""){return a().filter(s).filter(h=>h.id!==f&&!m(h.id,f)).sort((h,y)=>l(h).localeCompare(l(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(l(h))}</option>`).join("")}function r(g=""){let f=[...new Set(a().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,b)=>y.localeCompare(b)),h=String(g||"").trim();return h&&!f.includes(h)?[h,...f]:f}function p(g=""){return r(g).map(f=>`<option value="${e(f)}" ${f===g?"selected":""}>${e(f)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:u,renderParentAssetOptions:d,renderAssetAreaOptions:p,assetOptionLabel:l}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:c}})();(function(){function c({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function a(s){if(!s.photo_storage_path)return"";let m=s.photo_file_name||s.photo_original_file_name||"Request photo",o=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(m)}">`:""}
          <div>
            <strong>${e(m)}</strong>
            <span>${e(o)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:c}})();(function(){function c({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let a=n();return a>0?`<b class="nav-badge nav-message-badge" aria-label="${a} unread conversations and work alerts">${a}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:c}})();(function(){function c(){function e(a){let s=Number(a);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(a){let s=e(a);return s?s>99?"99+":String(s):""}function t(a,s={}){let m=n(a);if(!m)return"";let o=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${o}">${m}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function a(s){let m=n()[s.reporter_id]?.full_name||"Team member",o=t().find(u=>u.id===s.location_id)?.name||"No location",i=s.status||"open",l=s.severity||"normal";return`
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
            <small>${e(m)} - ${e(s.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(s.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(u=>`<option value="${u}" ${u===i?"selected":""}>${u}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(s.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:a,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:m}){function o(l){let u=s()[l.id]||[],d=u[u.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(l.title)}</strong>
            <span>${e(t(l))}${d?` - ${e(n(d.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${l.id}" type="button">Open Thread</button>
        </article>
      `}function i(l){let u=a().filter(d=>d.work_order_id===l.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${l.id}" type="button">Message Team</button>
            ${m()?`
              <div class="work-linked-thread-list">
                ${u.map(o).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:i,renderLinkedWorkMessageThread:o}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:c}})();(function(){function c({escapeHtml:e,recommendedWorkOrderStep:n}){function t(a){let s=n(a);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:c}})();(function(){function c({escapeHtml:e}){function n(a,s,m,o,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${m}" type="button">
          <span>${e(a)}</span>
          <strong>${s}</strong>
          <small>${e(o)}</small>
        </button>
      `}function t(a){return a.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:m,getMessageThreads:o,getPartsUsedByWorkOrder:i}){function l(u){let d=o().filter(f=>f.work_order_id===u.id).length,r=(i()[u.id]||[]).reduce((f,h)=>f+(Number(h.quantity_used)||0),0),p=u.asset_id?s(u)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=u.status==="completed"?"Review history or create follow-up if needed":u.status==="blocked"?"Resolve blocker or add current update":u.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
        <section class="work-command-summary">
          <button class="command-card status-${u.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${n(u.status)}</strong>
            <small>${e(g)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${e(u.assets?.name||"General item / area")}</strong>
            <small>${e(u.due_at?`Due ${u.due_at}`:"Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${e(t(u))}</strong>
            <small>${a(u)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${p[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${p[0]}</strong>
            <small>${e(p[1])}</small>
          </button>
          ${m(u)}
        </section>
      `}return{renderWorkOrderCommandSummary:l}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:c}})();(function(){function c(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function a(){return`
        <datalist id="part-source-options">
          ${n().map(o=>`<option value="${e(o)}"></option>`).join("")}
        </datalist>
      `}function s(){let m=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${m.map(o=>`
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
      `}return{renderPartSourceOptions:a,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:c}})();(function(){function c({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:a,parentAssetFor:s,childAssetsFor:m}){function o(i){let l=t().filter(r=>r.asset_id===i.id&&r.status!=="completed").length,u=s(i),d=m(i.id);return`
        <article class="asset-card asset-state-${i.status} ${i.id===a()?"selected":""}" data-asset-id="${i.id}" tabindex="0">
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
            ${u?`<p>Part of ${e(u.name)}</p>`:""}
            ${d.length?`<p>${d.length} linked item${d.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${l} open work</span>
        </article>
      `}return{renderAssetCard:o}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function a(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(m=>`<option value="${m.id}" ${m.id===s?"selected":""}>${e(m.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:c}})();(function(){function c({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function a(m){let o=n().filter(i=>i.thread_id===m.id).map(i=>t(i.user_id));return o.length?o.join(", "):"Direct message"}function s(m){return m.thread_type==="direct"?a(m):m.thread_type==="location"?`Company team / ${e().find(o=>o.id===m.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:a,unreadMessageCount:s,getMessagesByThreadId:m,getActiveMessageThreadId:o,threadTitle:i=l=>l.title}){function l(u){let r=(m()[u.id]||[]).filter(h=>!h.deleted_at),p=u.latest_message||r[r.length-1],g=s(u.id),f=p?.body?`${e(t(p.sender_id))}: ${e(p.body)}`:"Last activity";return`
        <button class="message-thread-button ${u.id===o()?"active":""} ${g?"unread":""}" data-message-thread="${u.id}" aria-current="${u.id===o()?"true":"false"}" type="button">
          <span class="message-row-heading"><strong>${e(i(u))}</strong><time>${p?e(n(p.created_at)):""}</time></span>
          <span class="message-row-preview"><small>${p?f:"No messages yet"}</small>${g?`<span class="message-unread-pill" aria-label="${g} unread messages">${g}</span>`:""}</span>
          <span class="message-row-scope">${u.work_order_id?"Work order / ":""}${e(a(u))}${u.preferences?.muted?" / Muted":""}</span>
        </button>
      `}return{renderMessageThreadButton:l}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:c}})();(function(){function c({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:c}})();var hi=Q(vn());(function(){function c({getLocations:e}){function n(t){let a=e().find(s=>s.id===t.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:c}})();(function(){function c({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function a(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:c}})();(function(){function c(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function a(s){let m=n(s),o=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),l=e.cleanWorkOrderDescription(s.description)||s.title,u=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${m} is down or needs maintenance attention. At this time, the expected downtime is ${o}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${l}`,`Work order: ${s.title}`,`Equipment: ${m}`,`Current update: ${u}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:c}})();(function(){function c(){function e(t){let a=t?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:c}})();(function(){function c(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:c}})();(function(){function c(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,m){let o=n(s);return m!==e.OUTSIDE_VENDOR_VALUE?o||null:[o,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(s,m){let o=String(s||"").trim();if(!m?.photo_storage_path)return o||null;let i="[Request photo attached to original request]";return o?`${o}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:c}})();(function(){function c(){function e(n,t){if(!n)return"Work order updated.";let a=[];return n.title!==t.title&&a.push("title"),(n.description||"")!==(t.description||"")&&a.push("description"),(n.due_at||"")!==(t.due_at||"")&&a.push("due date"),n.priority!==t.priority&&a.push("priority"),(n.type||"corrective")!==t.type&&a.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&a.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&a.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:c}})();(function(){function c(){function e(n,t,a,s=[]){return[...n.map(m=>({...m,type:"comment"})),...t.map(m=>({...m,type:"photo"})),...s.map(m=>({...m,type:"part"})),...a.map(m=>({...m,type:"event"}))].sort((m,o)=>new Date(o.created_at)-new Date(m.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:c}})();(function(){function c(e){function n(o){return Number(o.quantity_on_hand)<=Number(o.reorder_point)}function t(){return e.getParts().filter(n)}function a(o){let i=e.getPartSearchQuery().trim().toLowerCase();return i?o.some(l=>String(l??"").toLowerCase().includes(i)):!0}function s(){let o=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:a([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...o].sort((i,l)=>{let u=String(i.supplier_name||"zzzzzz").localeCompare(String(l.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return u||String(i.name||"").localeCompare(String(l.name||""),void 0,{sensitivity:"base"})}):o}function m(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(o=>String(o.supplier_name||"").trim()).filter(Boolean))].sort((o,i)=>o.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:a,partSourceOptions:m}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:c}})();(function(){function c(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function a(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,l=e.getRequestViewFilter()){return l==="converted"?a(i):l==="all"?!0:!a(i)&&i.status==="submitted"}function m(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(l=>t(l)&&s(l,i))}function o(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:a,requestMatchesViewFilter:s,filteredRequests:m,requestFilterCounts:o}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:c}})();(function(){function c(){function e(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function n(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:c}})();(function(){function c(e){function n(m){return e.getAssets().find(o=>o.id===m?.parent_asset_id)||null}function t(m){return e.getAssets().filter(o=>o.parent_asset_id===m).sort((o,i)=>o.name.localeCompare(i.name))}function a(m,o){if(!m||!o)return!1;let i=e.getAssets().find(u=>u.id===m),l=new Set;for(;i?.parent_asset_id&&!l.has(i.id);){if(i.parent_asset_id===o)return!0;l.add(i.id),i=e.getAssets().find(u=>u.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(m=>!e.matchesActiveLocation(m)||e.getAssetStatusFilter()!=="all"&&m.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(m.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(m.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([m.name,m.asset_code,m.manufacturer,m.model,m.location,m.status,m.asset_type,n(m)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:c}})();var Wi=Q(kn());(function(){function c(e){function n(a){let s=e.getSearchQuery().trim().toLowerCase();return s?a.some(m=>String(m??"").toLowerCase().includes(s)):!0}function t(a,s=e.getSearchQuery()){let m=s.trim().toLowerCase();return m?a.some(o=>String(o??"").toLowerCase().includes(m)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:c}})();(function(){function c(e){function n(o){return o.due_at?new Date(`${o.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(o){return{low:1,medium:2,high:3,critical:4}[o]||0}function a(o){return o.completed_at?new Date(o.completed_at).getTime():0}function s(o){return typeof e.assignmentLabel=="function"?e.assignmentLabel(o):o.assigned_profile?.full_name||o.assigned_to||"Unassigned"}function m(o,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(i)-a(o)||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="due"?n(o)-n(i)||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(o.priority)||n(o)-n(i):e.getWorkSort()==="type"?String(o.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="assigned"?s(o).localeCompare(s(i))||new Date(i.created_at)-new Date(o.created_at):new Date(i.created_at)-new Date(o.created_at)}return{compareWorkOrders:m,dueSortValue:n,prioritySortValue:t,completedSortValue:a,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:c}})();(function(){function c(e){function n(a){return a?.location_id||a?.assets?.location_id||null}function t(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(a)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(l=>{let u=e.isConversationArchived?.(l)||!1;if(i==="archived")return u&&e.matchesQuery(a(l),e.getMessageSearchQuery());if(u)return!1;let d=i==="all"||i==="favorites"&&l.preferences?.favorite||i==="unread"&&s(l.id)>0||l.thread_type===i,r=e.getMessageSection?.()||"";return d&&(!r||l.preferences?.section_name===r)&&e.matchesQuery(a(l),e.getMessageSearchQuery())}).sort((l,u)=>+!!u.preferences?.favorite-+!!l.preferences?.favorite)}function a(i){let l=e.getMessageThreadMembers().filter(u=>u.thread_id===i.id).map(u=>e.teamMemberName(u.user_id));return[i.title,e.messageThreadScopeLabel(i),...l]}function s(i){let l=e.getMessageReadsByThreadId()[i]?.last_read_at,u=l?new Date(l).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(d=>d.deleted_at||d.sender_id===e.getCurrentUser()?.id?!1:new Date(d.created_at).getTime()>u).length}function m(){return e.getMessageThreads().filter(i=>!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,l)=>i+(s(l.id)>0?1:0),0)}function o(){return e.getMessageThreads().filter(i=>i.thread_type==="direct"&&!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,l)=>i+(s(l.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:a,unreadMessageCount:s,totalUnreadMessages:m,directUnreadMessages:o}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(t)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(t):a==="completed_week"?e.isCompletedThisWeek(t):a==="active"||a==="all"?t.status!=="completed":t.status===a}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let a=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],m=e.getEventsByWorkOrder()[t.id]||[],o=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(d=>d.id===t.procedure_template_id),l=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),u=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,u[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(d=>[d.prompt,d.step_type]),...a.flatMap(d=>[d.parts?.name,d.parts?.sku,d.parts?.supplier_name,d.quantity_used,d.unit_cost]),...s.flatMap(d=>[d.body,u[d.author_id]?.full_name]),...m.flatMap(d=>[d.event_type,d.summary,u[d.actor_id]?.full_name]),...o.flatMap(d=>[d.file_name,d.original_file_name,d.content_type]),...l.flatMap(d=>[d.value,d.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:c}})();(function(){function c(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===t:e.isWorkOrderAssignedToUser(a,t))&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:c}})();var Qi=Q(_n()),Bi=Q(Sn()),ji=Q(qn()),zi=Q(Cn()),Gi=Q($n()),Hi=Q(Pn()),Vi=Q(An());(function(){function c(t){if(!t)return"";let a=new Date(t),s=new Date,m=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),o=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),i=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return o===m?`Today ${i}`:o===m-864e5?`Yesterday ${i}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let a=new Date(t),s=new Date,m=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),o=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return o===m?"Today":o===m-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let a=String(t||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:c,formatMessageDay:e,initials:n})})();})();
//# sourceMappingURL=runtime.b1b0afb212.js.map
