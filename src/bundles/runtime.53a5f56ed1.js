(()=>{var En=Object.create;var qt=Object.defineProperty;var Rn=Object.getOwnPropertyDescriptor;var On=Object.getOwnPropertyNames;var Wn=Object.getPrototypeOf,xn=Object.prototype.hasOwnProperty;var U=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Mn=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of On(e))!xn.call(l,a)&&a!==n&&qt(l,a,{get:()=>e[a],enumerable:!(t=Rn(e,a))||t.enumerable});return l};var Q=(l,e,n)=>(n=l!=null?En(Wn(l)):{},Mn(e||!l||!l.__esModule?qt(n,"default",{value:l,enumerable:!0}):n,l));var St=U((Tn,De)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,a=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},p=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),r=p(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:r,workspaceLoadPending:!1,workspaceLoadWasHidden:a?.visibilityState==="hidden",navigationStartedAt:p(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},c=new Map,u=0;function f(x){if(x==null||x==="")return null;let b=Number(x);return Number.isFinite(b)&&b>=0?b:null}function o(){let x=s.connection||s.mozConnection||s.webkitConnection,b=t?.matchMedia?.("(pointer: coarse)")?.matches,P=f(s.deviceMemory),E=f(s.hardwareConcurrency),O=P!==null&&P<=4||E!==null&&E<=4||b?"constrained":"standard",$=f(t?.innerWidth);return{source:"browser",device_tier:O,viewport_class:$!==null&&$<720?"mobile":$!==null&&$<1100?"tablet":"desktop",connection_type:String(x?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!x?.saveData}}function d(x={}){let b={...o(),measurement_version:n,...x};return Object.fromEntries(Object.entries(b).filter(([,P])=>P!=null&&P!==""))}function g(x=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},x))}function m(x,b,P={},E={}){if(!l.has(x))return!1;let O=f(b);if(O===null)return!1;let $=Number(O.toFixed(x==="cls"?4:2));return i.latest[x]={metric:x,value:$,unit:e[x],context:d(P),measuredAt:new Date().toISOString()},E.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:x,value:$,unit:e[x],context:d(P)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(E.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let x=i.companyId,b=i.pending.splice(0,20),P=null;try{P=(await i.client.rpc("record_app_performance_samples",{target_company_id:x,samples:b})).error||null}catch(O){P=O}if(!P)return i.pending.length&&g(1e3),!0;i.companyId===x&&i.pending.unshift(...b);let E=String(P.message||P).toLowerCase();return i.disabledUntil=Date.now()+(E.includes("could not find")||E.includes("does not exist")?3e5:6e4),!1}function y({client:x,companyId:b}){if(i.client=x||null,i.companyId=b||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,m("session_start",1,{source:"workspace"},{immediate:!0});let P=s.connection||s.mozConnection||s.webkitConnection;f(P?.downlink)!==null&&m("connection_downlink_mbps",P.downlink,{source:"browser-estimate"}),f(P?.rtt)!==null&&m("connection_rtt_ms",P.rtt,{source:"browser-estimate"})}g(250)}}function w(){i.workspaceStartedAt=p(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=a?.visibilityState==="hidden"}function v(x){if(!x)return;if(i.workspaceCompanies.has(x)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(x);let b=!i.workspaceLoadWasHidden&&a?.visibilityState!=="hidden";m("workspace_ready_ms",p()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:b}),i.workspaceLoadPending=!1,i.latest.cls||m("cls",u,{source:"performance-observer"},{persist:!1}),b&&t?.setTimeout?.(()=>S(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function S(x=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let b=new Set(x);Object.values(i.latest).filter(P=>b.has(P.metric)).forEach(P=>{let E=P.metric==="inp_ms";(E?i.lastPersistedInpValue===P.value:i.persistedVitals.has(P.metric))||m(P.metric,P.value,{source:"performance-observer"})&&(E?i.lastPersistedInpValue=P.value:i.persistedVitals.add(P.metric))})}function C(x=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,S(["inp_ms"])},x))}function A(){i.navigationStartedAt=p()}function R(x){let b=Number(x);return a?.visibilityState==="hidden"||Number.isFinite(b)&&i.lastHiddenAt>=b}function q(x,b=i.navigationStartedAt){m("section_navigation_ms",p()-b,{source:String(x||"workspace").slice(0,48)},{persist:!R(b)})}function _(x,b,P=null){m("query_latency_ms",p()-b,{source:String(x||"query").slice(0,48)},{persist:!R(b)}),P&&m("client_error",1,{source:`query:${String(x||"unknown").slice(0,36)}`},{immediate:!0})}function k(x={}){let b={source:"performance-room",quality_tier:x.qualityTier||"unknown"};Object.entries({spatial_ready_ms:x.readyMs,spatial_fps:x.fps,spatial_frame_ms:x.frameMs,spatial_slow_frame_pct:x.slowFramePercent,spatial_draw_calls:x.drawCalls,spatial_triangles:x.triangles,spatial_geometries:x.geometries,spatial_textures:x.textures,webgl_context_loss:Number(x.contextLosses)>0?x.contextLosses:void 0}).forEach(([P,E])=>{f(E)!==null&&m(P,E,b)}),g(500)}function I(){return{latest:{...i.latest},connection:o(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function D(x,b,P={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(x)))try{new PerformanceObserver(O=>b(O.getEntries())).observe({type:x,...P})}catch{}}D("paint",x=>{let b=x.find(P=>P.name==="first-contentful-paint");b&&m("fcp_ms",b.startTime,{source:"performance-observer"},{persist:!1})}),D("largest-contentful-paint",x=>{let b=x.at(-1);b&&m("lcp_ms",b.startTime,{source:"performance-observer"},{persist:!1})}),D("layout-shift",x=>{x.forEach(b=>{b.hadRecentInput||(u+=b.value)}),m("cls",u,{source:"performance-observer"},{persist:!1})}),D("event",x=>{x.forEach(P=>{P.interactionId&&c.set(P.interactionId,Math.max(c.get(P.interactionId)||0,P.duration))});let b=[...c.values()].sort((P,E)=>E-P);b.length&&(m("inp_ms",b[Math.min(Math.floor(b.length/50),10)],{source:"performance-observer"},{persist:!1}),C())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>m("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>m("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=p(),m("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&m("reconnect_ms",p()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),a?.addEventListener?.("visibilitychange",()=>{a.visibilityState==="hidden"&&(i.lastHiddenAt=p(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),S(),h())});let W={beginWorkspaceLoad:w,configure:y,flush:h,markNavigationStart:A,markWorkspaceReady:v,record:m,recordQueryLatency:_,recordSectionNavigation:q,recordSpatial:k,snapshot:I};typeof window<"u"&&(window.MaintainOpsAppTelemetry=W),typeof De<"u"&&(De.exports=W)})()});var Ct=U((In,Te)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,a){let s=String(n||"");return!(!l(t)&&!l(a)||s==="TOKEN_REFRESHED"&&l(t)&&l(t)===l(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Te<"u"&&(Te.exports={shouldRenderForAuthEvent:e})})()});var $t=U((Fn,Ie)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(r,i,c){if(!r||!r.getItem)return c;let u=r.getItem(i);return u??c}function n(r,i){let c=Number(e(r,i,"1"));return Number.isFinite(c)&&c>0?c:1}function t(r,i,c){!r||!r.setItem||r.setItem(i,String(c))}function a(r,i){try{let c=JSON.parse(e(r,i,"{}"));return c&&typeof c=="object"&&!Array.isArray(c)?c:{}}catch{return{}}}function s(r,i){!r||!r.removeItem||r.removeItem(i)}function p(r={}){let i=r.storage||localStorage,c={activeSection:e(i,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,l.activeMessageThreadId,""),searchQuery:e(i,l.searchQuery,""),workOrderSearchMode:e(i,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,l.messageThreadFilter,"all"),messageThreadsPage:n(i,l.messageThreadsPage),messageSearchQuery:e(i,l.messageSearchQuery,""),messageComposerWorkOrderId:e(i,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,l.managerDashboardUserId,""),managerDashboardMetric:e(i,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,l.myWorkFilter,"assigned"),workOrderFilter:e(i,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,l.workOrderPriorityFilter,"all"),workSort:e(i,l.workSort,"newest"),workGroup:e(i,l.workGroup,"none"),requestViewFilter:e(i,l.requestViewFilter,"active"),workOrderPage:n(i,l.workOrderPage),partsPage:n(i,l.partsPage),assetsPage:n(i,l.assetsPage),financialPage:n(i,l.financialPage),financialMissingFilter:e(i,l.financialMissingFilter,"all"),financialLocationFilter:e(i,l.financialLocationFilter,"all"),financialTypeFilter:e(i,l.financialTypeFilter,"all"),financialAreaFilter:e(i,l.financialAreaFilter,"all"),requestsPage:n(i,l.requestsPage),planningOverduePage:n(i,l.planningOverduePage),planningTodayPage:n(i,l.planningTodayPage),planningSoonPage:n(i,l.planningSoonPage),planningNoDuePage:n(i,l.planningNoDuePage),planningFollowUpPage:n(i,l.planningFollowUpPage),planningPmPage:n(i,l.planningPmPage),planningGroupOpen:a(i,l.planningGroupOpen),schedulesPage:n(i,l.schedulesPage),proceduresPage:n(i,l.proceduresPage),membersPage:n(i,l.membersPage),assetStatusFilter:e(i,l.assetStatusFilter,"all"),assetTypeFilter:e(i,l.assetTypeFilter,"all"),assetAreaFilter:e(i,l.assetAreaFilter,"all"),partInventoryFilter:e(i,l.partInventoryFilter,"all"),partSort:e(i,l.partSort,"default"),partSearchQuery:e(i,l.partSearchQuery,"")};e(i,l.sectionSplitDone,"")!=="true"&&c.activeSection==="work"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection),t(i,l.sectionSplitDone,"true")),c.activeSection==="performance"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection));let u=(o,d,g)=>{c[o]=d,g&&t(i,g,d)},f=(o,d)=>{u(o,1,d)};return{getActiveSection:()=>c.activeSection,setActiveSection:o=>u("activeSection",o,l.activeSection),getActiveWorkOrderId:()=>c.activeWorkOrderId,setActiveWorkOrderId:o=>u("activeWorkOrderId",o),getActiveAssetId:()=>c.activeAssetId,setActiveAssetId:o=>u("activeAssetId",o),getActivePartId:()=>c.activePartId,setActivePartId:o=>u("activePartId",o),getActiveMessageThreadId:()=>c.activeMessageThreadId,setActiveMessageThreadId:o=>u("activeMessageThreadId",o,l.activeMessageThreadId),getMessageThreadFilter:()=>c.messageThreadFilter,setMessageThreadFilter:o=>u("messageThreadFilter",o,l.messageThreadFilter),getMessageThreadsPage:()=>c.messageThreadsPage,setMessageThreadsPage:o=>u("messageThreadsPage",o,l.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>c.messageSearchQuery,setMessageSearchQuery:o=>u("messageSearchQuery",o,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>c.messageComposerWorkOrderId,setMessageComposerWorkOrderId:o=>u("messageComposerWorkOrderId",o,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>c.messageComposerOpen,setMessageComposerOpen:o=>u("messageComposerOpen",!!o),getManagerDashboardUserId:()=>c.managerDashboardUserId,setManagerDashboardUserId:o=>u("managerDashboardUserId",o||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>c.managerDashboardMetric,setManagerDashboardMetric:o=>u("managerDashboardMetric",o||"open",l.managerDashboardMetric),getSearchQuery:()=>c.searchQuery,setSearchQuery:o=>u("searchQuery",o,l.searchQuery),getWorkOrderSearchMode:()=>c.workOrderSearchMode,setWorkOrderSearchMode:o=>u("workOrderSearchMode",!!o,l.workOrderSearchMode),getActiveStatusFilter:()=>c.activeStatusFilter,setActiveStatusFilter:o=>u("activeStatusFilter",o),getMyWorkFilter:()=>c.myWorkFilter,setMyWorkFilter:o=>u("myWorkFilter",o,l.myWorkFilter),getWorkOrderFilter:()=>c.workOrderFilter,setWorkOrderFilter:o=>u("workOrderFilter",o,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>c.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:o=>{u("workOrderAssigneeFilter",o),o?t(i,l.workOrderAssigneeFilter,o):s(i,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>c.workOrderTypeFilter,setWorkOrderTypeFilter:o=>u("workOrderTypeFilter",o||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>c.workOrderPriorityFilter,setWorkOrderPriorityFilter:o=>u("workOrderPriorityFilter",o||"all",l.workOrderPriorityFilter),getWorkSort:()=>c.workSort,setWorkSort:o=>u("workSort",o,l.workSort),getWorkGroup:()=>c.workGroup,setWorkGroup:o=>u("workGroup",o||"none",l.workGroup),getRequestViewFilter:()=>c.requestViewFilter,setRequestViewFilter:o=>u("requestViewFilter",o,l.requestViewFilter),getWorkOrderPage:()=>c.workOrderPage,setWorkOrderPage:o=>u("workOrderPage",o,l.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",l.workOrderPage),getPartsPage:()=>c.partsPage,setPartsPage:o=>u("partsPage",o,l.partsPage),resetPartsPage:()=>f("partsPage",l.partsPage),getAssetsPage:()=>c.assetsPage,setAssetsPage:o=>u("assetsPage",o,l.assetsPage),resetAssetsPage:()=>f("assetsPage",l.assetsPage),getFinancialPage:()=>c.financialPage,setFinancialPage:o=>u("financialPage",o,l.financialPage),resetFinancialPage:()=>f("financialPage",l.financialPage),getFinancialMissingFilter:()=>c.financialMissingFilter,setFinancialMissingFilter:o=>u("financialMissingFilter",o||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>c.financialLocationFilter,setFinancialLocationFilter:o=>u("financialLocationFilter",o||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>c.financialTypeFilter,setFinancialTypeFilter:o=>u("financialTypeFilter",o||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>c.financialAreaFilter,setFinancialAreaFilter:o=>u("financialAreaFilter",o||"all",l.financialAreaFilter),getRequestsPage:()=>c.requestsPage,setRequestsPage:o=>u("requestsPage",o,l.requestsPage),resetRequestsPage:()=>f("requestsPage",l.requestsPage),getPlanningPage:o=>o==="overdue"?c.planningOverduePage:o==="today"?c.planningTodayPage:o==="soon"?c.planningSoonPage:o==="no-due"?c.planningNoDuePage:o==="follow-up"?c.planningFollowUpPage:o==="pm"?c.planningPmPage:1,setPlanningPage:(o,d)=>{o==="overdue"&&u("planningOverduePage",d,l.planningOverduePage),o==="today"&&u("planningTodayPage",d,l.planningTodayPage),o==="soon"&&u("planningSoonPage",d,l.planningSoonPage),o==="no-due"&&u("planningNoDuePage",d,l.planningNoDuePage),o==="follow-up"&&u("planningFollowUpPage",d,l.planningFollowUpPage),o==="pm"&&u("planningPmPage",d,l.planningPmPage)},getPlanningGroupOpen:(o,d=!1)=>Object.prototype.hasOwnProperty.call(c.planningGroupOpen,o)?!!c.planningGroupOpen[o]:!!d,setPlanningGroupOpen:(o,d)=>{c.planningGroupOpen={...c.planningGroupOpen,[o]:!!d},t(i,l.planningGroupOpen,JSON.stringify(c.planningGroupOpen))},getSchedulesPage:()=>c.schedulesPage,setSchedulesPage:o=>u("schedulesPage",o,l.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",l.schedulesPage),getProceduresPage:()=>c.proceduresPage,setProceduresPage:o=>u("proceduresPage",o,l.proceduresPage),resetProceduresPage:()=>f("proceduresPage",l.proceduresPage),getMembersPage:()=>c.membersPage,setMembersPage:o=>u("membersPage",o,l.membersPage),resetMembersPage:()=>f("membersPage",l.membersPage),getAssetStatusFilter:()=>c.assetStatusFilter,setAssetStatusFilter:o=>u("assetStatusFilter",o,l.assetStatusFilter),getAssetTypeFilter:()=>c.assetTypeFilter,setAssetTypeFilter:o=>u("assetTypeFilter",o,l.assetTypeFilter),getAssetAreaFilter:()=>c.assetAreaFilter,setAssetAreaFilter:o=>u("assetAreaFilter",o,l.assetAreaFilter),getPartInventoryFilter:()=>c.partInventoryFilter,setPartInventoryFilter:o=>u("partInventoryFilter",o,l.partInventoryFilter),getPartSort:()=>c.partSort,setPartSort:o=>u("partSort",o||"default",l.partSort),getPartSearchQuery:()=>c.partSearchQuery,setPartSearchQuery:o=>u("partSearchQuery",o,l.partSearchQuery),snapshot:()=>({...c})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:p},typeof Ie<"u"&&(Ie.exports={createWorkspaceUiState:p})})()});var Pt=U((Ln,we)=>{(function(){function l(a){return!!String(a?.production_action||"").trim()}function e(a){return l(a)&&a?.production_action_status==="open"}function n(a,s){return!a||!s?!1:a.assigned_to===s||e(a)&&a.production_action_assigned_to===s}function t(a){return e(a)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof we<"u"&&we.exports&&(we.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var At=U((Nn,be)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",a=>a.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof be<"u"&&be.exports&&(be.exports={bindWorkspaceProductionActionEvents:l})})()});var Et=U((Un,Fe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:l},typeof Fe<"u"&&(Fe.exports={bindWorkspaceWorkOrderNotificationEvents:l})})()});var Rt=U((Qn,ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function a(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(c=>c.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(c=>{c.checked=i.target.checked})}async function p(i){i.preventDefault();let c=i.target,u=c.querySelector("button[type='submit']"),f=n.querySelector("#completion-error"),o=e.getActiveWorkOrderId(),d=e.getWorkOrderById(o),g=e.getProcedureById(d?.procedure_template_id),m=g?e.requiredChecklistProgress(d,g):{done:0,total:0},h=e.productionActionCompletionMessage?.(d)||"";if(h){f&&(f.textContent=h),e.setWorkOrderActionWarning(o,h),e.showNotice(h,"warning");return}if(m.done<m.total){f&&(f.textContent=`Complete required checklist steps first (${m.done}/${m.total}).`);return}let y=new t(c),w=y.get("safety_devices_checked")==="on"||a(o)||e.hasCompletedSafetyDeviceCheck(d);if(e.requiresSafetyDeviceCheck(d)&&!w){f&&(f.textContent="Check safety devices before completing equipment work.");return}u.disabled=!0,u.textContent="Completing...",f&&(f.textContent="");try{let v={status:"completed",asset_id:d?.asset_id||null,actual_minutes:Number(y.get("actual_minutes"))||0,failure_cause:y.get("failure_cause")||null,resolution_summary:y.get("resolution_summary")||null,follow_up_needed:y.get("follow_up_needed")==="on",completion_notes:y.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(v),e.applySafetyCheckPayload(v,v.safety_check_required&&w),delete v.asset_id;let{error:S}=await e.withOperationTimeout(e.updateWorkOrderSafely(v,o),"Complete work save timed out. Check your connection and try again.",2e4);if(S){f&&(f.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(S)}`);return}let C=await e.withOperationTimeout(e.recordWorkOrderEvent(o,"completed",y.get("resolution_summary")||y.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(A=>A);e.setWorkOrderActionWarning("",""),e.showNotice(C?`Work order completed, but history did not update: ${C.message}`:"Work order completed.",C?"warning":"success"),await e.render()}catch(v){f?f.textContent=`Could not complete work order: ${v.message||v}`:e.alertRef(v.message||v)}finally{u.disabled=!1,u.textContent="Complete Work Order"}}function r(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",p),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(c=>{c.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:r,completeWorkOrder:p,currentSafetyCheckboxCheckedForWorkOrder:a,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof ve<"u"&&ve.exports&&(ve.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var Ot=U((Bn,ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,a=e.BlobCtor||Blob,s=e.alertRef||alert,p=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,r=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:_=>String(_||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:_=>String(_||"corrective").replaceAll("_"," "),c={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function u(_){return(e.getAssetDocumentsByAssetId?.()[_]||[]).filter(k=>String(k.content_type||"").startsWith("image/")||k.document_type==="machine_photo"||k.document_type==="nameplate")}function f(_){return u(_).map(k=>k.original_file_name||k.file_name||k.storage_path||k.id).filter(Boolean).join("; ")}function o(_,k){return _?.parent_asset_id&&k.get(_.parent_asset_id)?.name||""}function d(_){return e.getLocations?.().find(k=>k.id===_)?.name||""}function g(_){if(!_)return"";let k=e.getProfilesByUserId?.()[_];return k?.full_name||k?.email||_}function m(_){return String(d(_.location_id)||_.location_id||_.location||"")}function h(_){return{id:`financial:${_.id}`,financialRecord:_,name:_.archived_asset_name||"Deleted equipment",asset_type:_.archived_asset_type||"machine",asset_code:_.archived_asset_code||"",asset_tag:_.archived_asset_tag||"",manufacturer:_.archived_manufacturer||"",model:_.archived_model||"",location_id:_.archived_location_id||"",location:_.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(_=>!_.asset_id).map(h)]}function w(_,k,I){let D=m(_).localeCompare(m(k));if(D)return D;let W=(c[_.asset_type||"machine"]||999)-(c[k.asset_type||"machine"]||999);return W||String(o(_,I)).localeCompare(String(o(k,I)))||String(_.location||"").localeCompare(String(k.location||""))||String(_.name||"").localeCompare(String(k.name||""))}function v(){let _=e.getAssets().filter(p),k=new Map(_.map(I=>[I.id,I]));return[..._].sort((I,D)=>w(I,D,k)).map(I=>({equipment_type:r(I.asset_type),name:I.name,parent_equipment:o(I,k),serial_number:I.asset_code||"",asset_tag:I.asset_tag||"",manufacturer:I.manufacturer||"",model:I.model||"",picture_id:f(I.id),picture_count:u(I.id).length,picture_status:u(I.id).length?"attached":"missing",facility:d(I.location_id)||I.location_id||"",area_department:I.location||"",status:I.status}))}function S(){let _=y(),k=new Map(_.map(D=>[D.id,D])),I=e.getAssetFinancialsByAssetId?.()||{};return[..._].sort((D,W)=>w(D,W,k)).map(D=>{let W=D.financialRecord||I[D.id]||{};return{operational_status:D.financialRecord?"deleted":"active",equipment_type:r(D.asset_type),name:D.name,parent_equipment:o(D,k),facility:d(D.location_id)||D.location_id||"",area_department:D.location||"",serial_number:D.asset_code||"",equipment_asset_tag:D.asset_tag||"",manufacturer:D.manufacturer||"",model:D.model||"",picture_status:u(D.id).length?"attached":"missing",asset_tag:W.asset_tag||"",acquisition_date:W.acquisition_date||"",acquisition_cost:W.acquisition_cost||"",depreciation_method:W.depreciation_method||"",useful_life_years:W.useful_life_years||"",current_book_value:W.current_book_value||"",tax_jurisdiction:W.tax_jurisdiction||"",ownership_status:W.ownership_status||"",in_service_date:W.in_service_date||"",disposal_date:W.disposal_date||"",disposal_notes:W.disposal_notes||"",gl_account_code:W.gl_account_code||"",cost_center:W.cost_center||"",finance_notes:W.finance_notes||"",needs_review:!!W.needs_review,last_reviewed_at:W.last_reviewed_at||"",reviewed_by:g(W.reviewed_by)}})}async function C(_){let k=e.getExportScope(),I=e.createExportQuery(_),D=[],W;try{for(;D.length<1e5;){let x=await e.withOperationTimeout(I.range(D.length,D.length+499),"Export timed out. Try again.",2e4);if(x.error)throw x.error;if(e.getExportScope()!==k)throw new Error("Workspace changed. Export again from the intended location.");if(!Number.isInteger(x.count))throw new Error("Export could not verify the total record count.");if(W!==void 0&&W!==x.count)throw new Error("Records changed during export. Try again.");if(W=x.count,D.push(...x.data||[]),new Set(D.map(b=>b.id)).size!==D.length)throw new Error("Records moved during export. Try again.");if(D.length===W)return R(_,D);if(!x.data?.length||D.length>W)throw new Error("Export returned an incomplete list. Try again.")}throw new Error("Export exceeds 100,000 records. Narrow the filters and try again.")}catch(x){s(`Could not export: ${x.message||x}`)}}function A(){let _=e.getActiveSection();return e.createExportQuery&&["work","mywork","requests"].includes(_)?C(_):R(_)}function R(_,k){let I={work:{filename:"work-orders.csv",rows:(k&&_!=="requests"?k:e.getWorkOrders()).map(W=>({title:W.title,status:W.status,priority:W.priority,type:i(W.type),equipment:W.assets?.name||"",assigned_to:e.assignmentLabel(W),due_at:W.due_at||"",completed_at:W.completed_at||"",actual_minutes:W.actual_minutes||0,failure_cause:W.failure_cause||"",resolution_summary:W.resolution_summary||"",follow_up_needed:!!W.follow_up_needed}))},assets:{filename:"equipment.csv",rows:v()},financial:{filename:"equipment-financial.csv",rows:S()},requests:{filename:"maintenance-requests.csv",rows:(k&&_==="requests"?k:e.getMaintenanceRequests()).map(W=>({title:W.title,status:W.status,priority:W.priority,equipment:W.assets?.name||"",requested_by:e.getProfilesByUserId()[W.requested_by]?.full_name||"",created_at:W.created_at||"",converted_work_order_id:W.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(W=>({title:W.title,equipment:W.assets?.name||"",frequency:W.frequency,next_due_at:W.next_due_at,active:W.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(W=>({name:W.name,sku:W.sku||"",supplier_name:W.supplier_name||"",quantity_on_hand:W.quantity_on_hand,reorder_point:W.reorder_point,unit_cost:W.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(W=>({name:W.name,description:W.description||"",steps:W.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(W=>({user_id:W.user_id,name:e.getProfilesByUserId()[W.user_id]?.full_name||"",role:W.role}))}},D=I[_]||I.work;if(!D.rows.length)return s("Nothing to export in this section yet.");q(D.filename,D.rows)}function q(_,k){let I=Object.keys(k[0]),D=[I.join(","),...k.map(P=>I.map(E=>e.csvCell(P[E])).join(","))],W=new a([`\uFEFF${D.join(`
`)}`],{type:"text/csv;charset=utf-8"}),x=t.createObjectURL(W),b=n.createElement("a");b.href=x,b.download=_,n.body.appendChild(b),b.click(),b.remove(),t.revokeObjectURL(x)}return{downloadCsv:q,exportActiveSectionCsv:A}}typeof ke<"u"&&ke.exports&&(ke.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Wt=U((jn,Le)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let p=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(p)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Le<"u"&&(Le.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var xt=U((zn,Ne)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(s){let p=String.fromCharCode(...s),r=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return r?r(p).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=l(),typeof Ne<"u"&&(Ne.exports={createPublicRequestTokenHelpers:l})})()});var Mt=U((Gn,Ue)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,a=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,p=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.createPublicRequestLink))}),typeof a=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>a(r.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>s(r.dataset.enablePublicRequestLink,!0))}),typeof p=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(r=>{r.addEventListener("click",()=>p(r.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof Ue<"u"&&(Ue.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Dt=U((Vn,Qe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let p=a.querySelector?.("button[type='submit']");if(!p?.disabled){p&&(p.disabled=!0);try{let r=a.querySelector?.("[name='planning_due_at']");await t(a.dataset.planningDueForm,r?.value)}finally{p?.isConnected&&(p.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof Qe<"u"&&(Qe.exports={bindWorkspacePlanningDueDateEvents:l})})()});var Tt=U((Hn,Be)=>{(function(){let l=new WeakSet;function e(a,s,p){if(!a)return;let r=a.querySelector("[data-equipment-choice-existing]"),i=a.querySelector("[data-equipment-choice-new]"),c=s==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(u=>{let f=u.value===(c?"new":"existing");u.checked=f,u.closest("label")?.classList.toggle("active",f)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(u=>{u.hidden=u.dataset.equipmentChoicePanel!==(c?"new":"existing")}),r&&(r.disabled=c,r.required=!c&&r.dataset.equipmentChoiceRequired==="true",c&&(r.value=""),typeof p=="function"&&p(r)),i&&(i.disabled=!c,i.required=c&&i.dataset.equipmentChoiceRequired==="true",c||(i.value=""))}function n(a,s){a.querySelectorAll("[data-equipment-choice]").forEach(p=>{let r=p.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(p,r,s)})}function t(a={}){let s=a.documentRef||document,p=a.updateAssetLocationWarning;n(s,p),!l.has(s)&&(l.add(s),s.addEventListener("change",r=>{let i=r.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,p);return}let c=r.target.closest?.("[data-equipment-choice-existing]");c&&typeof p=="function"&&p(c)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Be<"u"&&(Be.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var It=U((Yn,je)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:a,createQuickFixAsset:s,getMaintenanceRequests:p,getQuickFixRequestId:r,getActiveCompanyId:i,getSession:c,getParts:u,getRequestsReady:f,getSupabaseClient:o,confirmAssetLocationRouting:d,assetRequiresSafety:g,blocksProcedureCompletion:m,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:w,descriptionWithAssignmentNote:v,assignedUserFromForm:S,procedureColumn:C,workOrderDateValue:A,applySafetyRequirementPayload:R,applySafetyCheckPayload:q,insertWithOptionalProcedure:_,friendlyWorkOrderSaveError:k,addPartUsageToWorkOrder:I,addPhotoToWorkOrder:D,updateAssetStatus:W,recordWorkOrderEvent:x,setActiveWorkOrderIdState:b,setActiveAssetIdState:P,setCreateWorkOrderMode:E,setQuickFixMode:O,setQuickFixAssetId:$,setQuickFixRequestId:N,showNotice:L,render:j,alertUser:V=re=>window.alert(re)}=e;async function Z(re){re.preventDefault();let se=re.currentTarget,J=n.querySelector("#quick-fix-error"),ae=se.querySelector("button[type='submit']");J&&(J.textContent=""),ae&&(ae.disabled=!0,ae.textContent="Saving...");try{let z=new t(se),fe=String(z.get("title")||"").trim();if(!fe)throw new Error("Quick Fix issue is required.");let le=r(),T=i(),B=c(),G=String(z.get("description")||"").trim(),Y=String(z.get("resolution_summary")||"").trim(),X=Y||fe,K=G||fe,H=z.get("mark_completed")==="on",ne=z.get("machine_down")==="on",ee=z.get("asset_id")||null,de=le?p().find(ce=>ce.id===le):null,oe=String(z.get("new_asset_name")||"").trim();if(ee&&oe)throw new Error("Choose existing equipment or create new equipment, not both.");if(oe){let{data:ce,error:me}=await a(s(oe,ne?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(me){J&&(J.textContent=me.message);return}ee=ce.id}if(!oe&&!d(ee,"logging this Quick Fix",J))return;if(H&&g(ee)&&z.get("safety_devices_checked")!=="on"){J&&(J.textContent="Check safety devices before marking equipment work complete.");return}let F=H?m(null,z.get("procedure_template_id")||null):"";if(F){h("",""),J&&(J.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let pe={company_id:T,location_id:y(ee),title:fe,description:w(v(K,z.get("assigned_to")),de),asset_id:ee,assigned_to:S(z,B.user.id),priority:z.get("priority")||"medium",type:z.get("type")||"corrective",status:H?"completed":"open",due_at:A(z.get("due_at")),created_by:B.user.id,...C(z.get("procedure_template_id")),actual_minutes:0,failure_cause:z.get("failure_cause")||null,resolution_summary:H?X:Y||null,follow_up_needed:z.get("follow_up_needed")==="on",completion_notes:H?X:null,completed_at:H?new Date().toISOString():null};R(pe),q(pe,H&&pe.safety_check_required&&z.get("safety_devices_checked")==="on");let{data:he,error:ue}=await a(_("work_orders",pe,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ue){J&&(J.textContent=`Could not log quick fix: ${k(ue)}`);return}let M=[],ie=z.get("part_id"),te=Number(z.get("quantity_used"))||1;if(ie){let ce=u().find(Me=>Me.id===ie),me=await a(I(he.id,ce,te),"Part usage save timed out.",12e3).catch(Me=>Me);me&&M.push(`part usage failed: ${me.message}`)}let ge=z.get("photo");if(ge&&ge.name){let ce=await a(D(he.id,ge),"Photo upload timed out.",25e3).catch(me=>me);ce&&M.push(`photo upload failed: ${ce.message}`)}let ye=ne?"offline":z.get("asset_status");if(pe.asset_id&&!oe&&(ne||H&&ye)){let ce=await a(W(pe.asset_id,ye),"Equipment status update timed out.",12e3).catch(me=>me);ce?M.push(`equipment status did not update: ${ce.message}`):await a(x(he.id,"asset_status_updated",ne?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(me=>M.push(`history did not update: ${me.message}`))}if(await a(x(he.id,"quick_fix",H?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ce=>M.push(`history did not update: ${ce.message}`)),oe&&await a(x(he.id,"equipment_created",`Equipment created from Quick Fix: ${oe}.`),"Activity log timed out.",8e3).catch(ce=>M.push(`history did not update: ${ce.message}`)),le&&f()){let ce=await a(o().from("maintenance_requests").update({status:"converted",reviewed_by:B.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:he.id}).eq("id",le).eq("company_id",T),"Request status update timed out.",12e3).catch(me=>({error:me}));ce.error?M.push(`request status did not update: ${ce.error.message}`):await a(x(he.id,"request_quick_fixed",H?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(me=>M.push(`history did not update: ${me.message}`))}b(he.id),P(null),E(!1),O(!1),$(null),N(null),L(M.length?`Quick Fix saved with warning: ${M[0]}`:"Quick Fix saved.",M.length?"warning":"success"),await j()}catch(z){J?J.textContent=`Could not log quick fix: ${z.message||z}`:V(z.message||z)}finally{ae&&ae.isConnected&&(ae.disabled=!1,ae.textContent="Log Quick Fix")}}return{createQuickFix:Z}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof je<"u"&&(je.exports={createQuickFixWorkflow:l})})()});var Ft=U((Kn,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function s(){let u=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),f=n.querySelector("#create-pm-form");f&&!u.includes(f)&&u.push(f),u.forEach(o=>o.addEventListener("submit",p))}async function p(u){u.preventDefault();let f=u.currentTarget,o=f.querySelector("button[type='submit']"),d=f.querySelector("[data-pm-error]")||n.querySelector("#pm-error");d&&(d.textContent=""),o&&(o.disabled=!0,o.textContent="Adding...");try{let g=new t(f);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",d))return;let{error:m}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(m)throw m;e.showNotice("PM schedule added."),await e.render()}catch(g){d?d.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{o&&(o.disabled=!1,o.textContent="Add Schedule")}}function r(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(f=>f.id===u)&&(e.setPendingDeleteScheduleId(u),e.renderWorkspace())}async function i(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(d=>d.id===u))return;let o=n.querySelector(`[data-confirm-delete-schedule="${a.escape(u)}"]`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let{data:d,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!d?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let m=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(m.error)throw new Error(`PM schedule delete verification failed: ${m.error.message}`);if(m.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(d){e.showNotice(d.message||"Could not delete PM schedule.","warning"),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}async function c(u){let f=e.getPreventiveSchedules().find(d=>d.id===u);if(!f)return;let o=n.querySelector(`[data-generate-pm="${a.escape(u)}"]`);o&&(o.disabled=!0,o.textContent="Generating...");try{let d={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(f.asset_id),asset_id:f.asset_id,title:f.title,description:`Generated from preventive schedule: ${f.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:f.next_due_at,...e.procedureColumn(f.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(d),e.applySafetyCheckPayload(d,!1);let{data:g,error:m}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",d,{returnSingle:!0}),"PM work order generation timed out.");if(m)throw m;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(f.next_due_at,f.frequency)}).eq("id",f.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(d){e.showNotice(`Could not generate PM work: ${d.message||d}`,"warning"),o&&(o.disabled=!1,o.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:p,requestDeletePreventiveSchedule:r,deletePreventiveSchedule:i,generatePreventiveWorkOrder:c}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:l},typeof ze<"u"&&(ze.exports={createPreventiveMaintenanceWorkflow:l})})()});var Lt=U((Jn,Ge)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function s(){let d=n.querySelector("#create-procedure-form");d&&d.addEventListener("submit",p);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",r),n.querySelectorAll("[data-add-step]").forEach(m=>{m.addEventListener("submit",i)})}async function p(d){d.preventDefault();let g=d.currentTarget,m=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),m&&(m.disabled=!0,m.textContent="Adding...");try{let y=new t(g),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(w)throw w;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{m&&(m.disabled=!1,m.textContent="Add Checklist")}}async function r(){let d=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(m=>m.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}d&&(d.disabled=!0,d.textContent="Adding sample...");try{let{data:m,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(v=>({...v,company_id:e.getActiveCompanyId(),procedure_template_id:m.id})),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(w)throw w;e.showNotice("Sample procedure checklist added."),await e.render()}catch(m){e.showNotice(`Could not add sample procedure: ${m.message||m}`,"warning")}finally{d&&(d.disabled=!1,d.textContent="Add sample inspection checklist")}}async function i(d){d.preventDefault();let g=d.currentTarget,m=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),m&&(m.disabled=!0,m.textContent="Adding...");try{let y=new t(g),v=(e.getProcedureTemplates().find(C=>C.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:S}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:v,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(S)throw S;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{m&&(m.disabled=!1,m.textContent="Add Step")}}async function c(d){let[g,m]=await Promise.all([u("work_orders",d),u("preventive_schedules",d)]);return{workOrders:g,schedules:m}}async function u(d,g){let{count:m,error:h}=await e.withOperationTimeout(e.supabaseClient().from(d).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${d}.`,15e3);if(h)throw new Error(`Could not verify linked ${d.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return m||0}async function f(d){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(m=>m.id===d))return;let g=n.querySelector(`[data-procedure-delete-error="${a.escape(d)}"]`);g&&(g.textContent="");try{let m=await c(d),h=e.procedureDeleteBlockerMessage(m);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(d),e.renderWorkspace()}catch(m){g?g.textContent=m.message||"Could not verify procedure links before delete.":e.showNotice(m.message||"Could not verify procedure links before delete.","warning")}}async function o(d){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===d))return;let m=n.querySelector(`[data-confirm-delete-procedure="${a.escape(d)}"]`),h=n.querySelector(`[data-procedure-delete-error="${a.escape(d)}"]`);h&&(h.textContent=""),m&&(m.disabled=!0,m.textContent="Deleting...");try{let y=await c(d),w=e.procedureDeleteBlockerMessage(y);if(w)throw new Error(w);let{data:v,error:S}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(S)throw S;if(!v?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let C=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",d).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if(C.error)throw new Error(`Procedure checklist delete verification failed: ${C.error.message}`);if(C.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let w=y.message||"Could not delete procedure.";e.showNotice(w,"warning"),h&&(h.textContent=w),m&&(m.disabled=!1,m.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:p,seedSampleProcedure:r,createProcedureStep:i,loadProcedureDeleteBlockers:c,countProcedureLinkedRows:u,requestDeleteProcedureTemplate:f,deleteProcedureTemplate:o}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:l},typeof Ge<"u"&&(Ge.exports={createProcedureWorkflow:l})})()});var Nt=U((Zn,Ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let m=n.querySelector("#add-member-form");m&&m.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach(C=>{C.addEventListener("submit",p)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",r);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",u);let w=n.querySelector("#team-invite-form");w&&w.addEventListener("submit",i);let v=n.querySelector("#team-invite-link-form");v&&v.addEventListener("submit",f),n.querySelectorAll("[data-revoke-invite-link]").forEach(C=>{C.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(C.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(C=>{C.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(C=>{C.addEventListener("click",()=>o(C.dataset.confirmRevokeInviteLink))});let S=n.querySelector("#request-notification-recipient-form");S&&S.addEventListener("submit",d),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(C=>{C.addEventListener("click",()=>g(C.dataset.deleteRequestNotificationRecipient))})}async function s(m){m.preventDefault();let h=m.currentTarget,y=new t(h),w=String(y.get("role")||"technician").trim().toLowerCase(),v=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&w!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}v&&(v.disabled=!0,v.textContent="Adding...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:w}),"Team member save timed out.");if(S)throw S;await e.render()}catch(S){e.alertUser(S.message||S)}finally{v?.isConnected&&(v.disabled=!1,v.textContent="Add Member")}}async function p(m){m.preventDefault();let h=m.currentTarget,y=new t(h),w=String(y.get("role")||"").trim().toLowerCase(),v=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}v&&(v.disabled=!0,v.textContent="Saving...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:w}),"Role save timed out. Check your connection and try again.",15e3);if(S)throw new Error(S.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":S.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(S){e.showNotice(`Could not save role: ${S.message||S}`,"warning")}finally{v&&(v.disabled=!1,v.textContent="Save Role")}}async function r(m){m.preventDefault();let h=m.currentTarget,y=n.querySelector("#profile-error"),w=h.querySelector("button[type='submit']"),v=new t(h),S=String(v.get("full_name")||"").trim(),C=h.querySelector('input[name="mobile_tech"]'),A=C?C.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),w&&(w.disabled=!0,w.textContent="Saving...");try{let{error:R}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:S,mobile_tech:A},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(R)throw e.isMissingColumnError(R,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):R;e.showNotice("Profile saved."),await e.render()}catch(R){y&&(y.textContent=R.message||"Could not save profile.")}finally{w&&(w.disabled=!1,w.textContent="Save Profile")}}async function i(m){m.preventDefault();let h=m.currentTarget,y=n.querySelector("#team-invite-error"),w=h.querySelector("button[type='submit']"),v=new t(h),S=String(v.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&S!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}w&&(w.disabled=!0,w.textContent="Inviting...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(v.get("email")||"").trim(),invite_role:S,invite_default_location_id:v.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(C)throw C.message.includes("create_company_invite")||e.isColumnSchemaError(C,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):C;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(C){y&&(y.textContent=C.message||"Could not create invite.")}finally{w&&(w.disabled=!1,w.textContent="Create Invite")}}async function c(m){if(!(!m||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:m}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function u(m){m.preventDefault();let h=m.currentTarget,y=n.querySelector("#password-change-error"),w=h.querySelector("button[type='submit']"),v=new t(h),S=String(v.get("password")||""),C=String(v.get("confirmPassword")||"");if(y&&(y.textContent=""),S.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(S!==C){y&&(y.textContent="Passwords do not match.");return}w&&(w.disabled=!0,w.textContent="Updating...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:S}),"Password update timed out. Check your connection and try again.",15e3);if(A)throw A;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(A){y&&(y.textContent=A.message||"Could not update password.")}finally{w&&(w.disabled=!1,w.textContent="Update Password")}}async function f(m){m.preventDefault();let h=m.currentTarget,y=n.querySelector("#team-invite-link-error"),w=h.querySelector("button[type='submit']"),v=new t(h),S=String(v.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let C="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(C),y&&(y.textContent=C);return}if(S==="admin"){let C="Admin join links are not allowed.";e.setTeamInviteLinkError(C),y&&(y.textContent=C);return}if(!e.canAdministerTeamRoles?.()&&S!=="technician"){let C="Managers can only create technician join links.";e.setTeamInviteLinkError(C),y&&(y.textContent=C);return}w&&(w.disabled=!0,w.textContent="Creating...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:S,link_location_id:v.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(C)throw C.message.includes("create_company_invite_link")||e.isColumnSchemaError(C,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):C;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(C){let A=C.message||"Could not create join link.";e.setTeamInviteLinkError(A),y&&(y.textContent=A)}finally{w&&(w.disabled=!1,w.textContent="Create Join Link")}}async function o(m){if(!(!m||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:m}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function d(m){m.preventDefault();let h=m.currentTarget,y=n.querySelector("#request-notification-recipient-error"),w=h.querySelector("button[type='submit']"),v=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let S="Only admins can change request email routing.";e.setRequestNotificationRecipientError(S),y&&(y.textContent=S);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}w&&(w.disabled=!0,w.textContent="Adding...");try{let S=String(v.get("email")||"").trim().toLowerCase(),{error:C}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:v.get("location_id")||null,email:S,label:String(v.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(C)throw e.isColumnSchemaError(C,["request_notification_recipients"])||C.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):C;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(S){let C=S.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(C),y&&(y.textContent=C)}finally{w&&(w.disabled=!1,w.textContent="Add Recipient")}}async function g(m){if(!(!m||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",m),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:s,updateCompanyMemberRole:p,updateMyProfile:r,updateMyPassword:u,createTeamInvite:i,cancelTeamInvite:c,createTeamInviteLink:f,revokeTeamInviteLink:o,createRequestNotificationRecipient:d,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Ve<"u"&&(Ve.exports={createTeamWorkflow:l})})()});var Ut=U((Xn,He)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let c=n.querySelector("#location-form");c&&c.addEventListener("submit",p);let u=n.querySelector("#public-app-url-form");u&&u.addEventListener("submit",r)}async function s(i){i.preventDefault();let c=i.currentTarget,u=c.querySelector("button[type='submit']"),f=new t(c);u&&(u.disabled=!0,u.textContent="Saving...");try{let{error:o}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(o)throw o;e.showNotice("Company saved."),await e.render()}catch(o){e.showNotice(`Could not save company: ${o.message||o}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Save Company")}}async function p(i){i.preventDefault();let c=i.currentTarget,u=n.querySelector("#location-error"),f=c.querySelector("button[type='submit']"),o=String(new t(c).get("name")||"").trim();if(o){u&&(u.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:d,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),o),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(d.id),e.persistActiveLocationId(d.id),e.showNotice("Location added."),await e.render()}catch(d){u&&(u.textContent=d.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function r(i){i.preventDefault();let c=n.querySelector("#public-request-link-error"),u=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(c&&(c.textContent=""),!u){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(u);if(!f){c&&(c.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:s,createLocation:p,savePublicAppUrl:r}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof He<"u"&&(He.exports={createCompanySettingsWorkflow:l})})()});var Qt=U((er,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.FormDataCtor||FormData,s=e.confirmUser||(o=>t.confirm(o));function p(){let o=n.querySelector("#app-issue-report-form");o&&o.addEventListener("submit",c),n.querySelectorAll("[data-app-issue-status]").forEach(d=>{d.addEventListener("submit",u)}),n.querySelectorAll("[data-delete-app-issue]").forEach(d=>{d.addEventListener("click",f)})}async function r(){let{data:o,error:d}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!d),e.setAppIssueReports(d?[]:o||[]),d)throw d}function i(o){let d=e.appIssueReportErrorState(o);return d.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),d.message}async function c(o){o.preventDefault();let d=o.currentTarget,g=n.querySelector("#app-issue-report-error"),m=d.querySelector("button[type='submit']"),h=new a(d);g&&(g.textContent=""),m&&(m.disabled=!0,m.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:w}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(w)throw w;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await r(),e.renderWorkspace()}catch(y){g&&(g.textContent=i(y))}finally{m?.isConnected&&(m.disabled=!1,m.textContent="Send Report")}}async function u(o){if(o.preventDefault(),!e.canManageTeam())return;let d=o.currentTarget,g=d.querySelector("button[type='submit']"),m=new a(d);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(m.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),d.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function f(o){if(o.preventDefault(),!e.canManageTeam())return;let d=o.currentTarget,g=d.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;d.disabled=!0;let m=d.textContent;d.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{d?.isConnected&&(d.disabled=!1,d.textContent=m||"Delete")}}return{bindAppIssueWorkflowEvents:p,reloadAppIssueReports:r,appIssueReportError:i,createAppIssueReport:c,updateAppIssueReportStatus:u,deleteAppIssueReport:f}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Ye<"u"&&(Ye.exports={createAppIssueWorkflow:l})})()});var Bt=U((tr,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.CSSRef||CSS;async function s(u){let f=n.querySelector("#public-request-link-error"),o=n.querySelector(`[data-create-public-request-link="${a.escape(u)}"]`);f&&(f.textContent=""),o&&(o.disabled=!0,o.textContent="Creating...");try{let{error:d}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:u}),"QR link save timed out. Check your connection and try again.",15e3);if(d)throw e.setPublicRequestLinksReady(!1),new Error(d.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":d.message);e.showNotice("Location request QR link ready."),await e.render()}catch(d){f&&(f.textContent=d.message||"Could not create QR request link.")}finally{o&&(o.disabled=!1,o.textContent="Create QR Link")}}async function p(u){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await r(u,!1)}async function r(u,f){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can reactivate or disable posted QR request links.");return}await c(u,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function i(u){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await c(u,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function c(u,f,o){let d=n.querySelector("#public-request-link-error");if(d&&(d.textContent=""),!e.canAdministerPublicRequestLinks()){d&&(d.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!u||!e.getActiveCompanyId()){d&&(d.textContent="Select a company before updating request links.");return}try{let{data:g,error:m}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(m){d&&(d.textContent=m.message);return}if(!g?.length){d&&(d.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(o),await e.render()}catch(g){d&&(d.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:p,setPublicRequestLinkActive:r,regeneratePublicRequestLink:i,updatePublicRequestLink:c}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof Ke<"u"&&(Ke.exports={createPublicRequestLinkWorkflow:l})})()});var jt=U((nr,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=new WeakMap;function s(d,g){let m=e.getParts().find(h=>h.id===g);m&&!a.has(d)&&a.set(d,{id:g,companyId:e.getActiveCompanyId(),quantity_on_hand:Number(m.quantity_on_hand)||0})}function p(d){if(!d||d.companyId!==e.getActiveCompanyId())throw new Error("Reopen this part before saving.")}function r(){let d=n.querySelector("#create-part-form");d&&d.addEventListener("submit",i),n.querySelectorAll("[data-restock-part]").forEach(g=>{s(g,g.dataset.restockPart),g.addEventListener("submit",c)}),n.querySelectorAll("[data-use-part]").forEach(g=>{s(g,g.dataset.usePart),g.addEventListener("submit",u)}),n.querySelectorAll("[data-edit-part]").forEach(g=>{s(g,g.dataset.editPart),g.addEventListener("submit",f)}),n.querySelectorAll("[data-rename-part-source]").forEach(g=>{g.addEventListener("submit",o)})}async function i(d){d.preventDefault();let g=d.currentTarget,m=n.querySelector("#part-create-error"),h=g.querySelector("button[type='submit']"),y=new t(g);m&&(m.textContent=""),h&&(h.disabled=!0,h.textContent="Adding...");let w;try{let v={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(y.get("name")||"").trim(),sku:String(y.get("sku")||"").trim()||null,supplier_name:String(y.get("supplier_name")||"").trim()||null,machine_note:String(y.get("machine_note")||"").trim()||null,quantity_on_hand:Number(y.get("quantity_on_hand"))||0,reorder_point:Number(y.get("reorder_point"))||0,unit_cost:Number(y.get("unit_cost"))||0};if(!v.company_id)throw new Error("Choose a company before adding parts.");if(!v.name)throw new Error("Part name is required.");let S=new Promise((R,q)=>{w=setTimeout(()=>q(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:C,error:A}=await Promise.race([e.supabaseClient().from("parts").insert(v).select("id").single(),S]);if(clearTimeout(w),A&&e.isMissingColumnError(A,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(A&&e.isMissingColumnError(A,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(A&&e.isMissingColumnError(A,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(A&&e.isMissingColumnError(A,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(A)throw A;e.setActivePartId(C?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),g.reset(),await e.render()}catch(v){m&&(m.textContent=v.message||"Could not add part.")}finally{w&&clearTimeout(w),h&&h.isConnected&&(h.disabled=!1,h.textContent="Add Part")}}async function c(d){d.preventDefault();let g=d.target,m=g.querySelector("button[type='submit']"),h=a.get(g),y=Number(new t(g).get("quantity"))||0;if(!h||y<=0)return;let w=m?.textContent||"Restock";m&&(m.disabled=!0,m.textContent="Saving...");try{p(h);let{data:v,error:S}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(h.quantity_on_hand)||0)+y}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(h.quantity_on_hand)||0).select("id"),"Part restock timed out. Check your connection and try again.",15e3);if(S)throw S;if(!v?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part restocked."),await e.render()}catch(v){e.showNotice(`Could not restock part: ${v.message||v}`,"warning")}finally{m&&(m.disabled=!1,m.textContent=w)}}async function u(d){d.preventDefault();let g=d.currentTarget,m=g.querySelector("button[type='submit']"),h=a.get(g),y=Number(new t(g).get("quantity"))||0;if(!h||y<=0)return;let w=m?.textContent||"Use";m&&(m.disabled=!0,m.textContent="Saving...");try{p(h);let v=Number(h.quantity_on_hand)||0;if(y>v)throw new Error("Quantity used exceeds the stock on hand.");let S=v-y,{data:C,error:A}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:S}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",v).select("id"),"Part use save timed out. Check your connection and try again.",15e3);if(A)throw A;if(!C?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part used."),await e.render()}catch(v){e.showNotice(`Could not use part: ${v.message||v}`,"warning")}finally{m&&(m.disabled=!1,m.textContent=w)}}async function f(d){d.preventDefault();let g=d.currentTarget,m=g.dataset.editPart,h=n.querySelector(`[data-part-edit-error="${m}"]`),y=g.querySelector("button[type='submit']"),w=new t(g);h&&(h.textContent="");let v=y?.textContent||"Save Part";y&&(y.disabled=!0,y.textContent="Saving...");let S={name:String(w.get("name")||"").trim(),sku:w.get("sku")||null,supplier_name:w.get("supplier_name")||null,machine_note:w.get("machine_note")||null,quantity_on_hand:Number(w.get("quantity_on_hand"))||0,reorder_point:Number(w.get("reorder_point"))||0,unit_cost:Number(w.get("unit_cost"))||0};try{if(!S.name)throw new Error("Part name is required.");let C=a.get(g);if(p(C),C.id!==m)throw new Error("Reopen this part before saving.");let{data:A,error:R}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(S).eq("id",m).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(C.quantity_on_hand)||0).select("id"),"Part save timed out. Check your connection and try again.",15e3);if(R&&e.isMissingColumnError(R,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(R&&e.isMissingColumnError(R,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(R&&e.isMissingColumnError(R,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(R)throw R;if(!A?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(C){h&&(h.textContent=C.message||"Could not save part.")}finally{y&&(y.disabled=!1,y.textContent=v)}}async function o(d){d.preventDefault();let g=d.currentTarget,m=n.querySelector("#part-source-error"),h=g.querySelector("button[type='submit']"),y=new t(g),w=String(y.get("old_source")||"").trim(),v=String(y.get("new_source")||"").trim();if(m&&(m.textContent=""),!!w){if(!e.getPartSuppliersReady()){m&&(m.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(w===v){m&&(m.textContent="Change the source name before saving.");return}h&&(h.disabled=!0,h.textContent="Renaming...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:v||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",w),"Part source rename timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingColumnError(S,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?S.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(S){m&&(m.textContent=S.message||"Could not update part source.")}finally{h&&(h.disabled=!1,h.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:i,restockPart:c,usePartFromInventory:u,updatePart:f,renamePartSource:o}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof Je<"u"&&(Je.exports={createPartInventoryWorkflow:l})})()});var zt=U((rr,_e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(p){p.preventDefault();let r=p.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#quick-update-error"),u=e.getWorkOrders().find(o=>o.id===e.getActiveWorkOrderId()),f=new t(r);i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let o=f.get("asset_id")||null,d=String(f.get("new_asset_name")||"").trim();if(o&&d)throw new Error("Choose existing equipment or create new equipment, not both.");if(d){let{data:v,error:S}=await e.createQuickFixAsset(d,"running");if(S){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not add equipment: ${S.message}`);return}o=v.id}if(!d&&!e.confirmAssetLocationRouting(o,"saving this work update",c))return;let g={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(u?.description||"",f.get("assigned_to")),asset_id:o,location_id:e.locationIdForAsset(o),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let m=f.get("safety_devices_checked")==="on";if(g.status==="completed"&&u?.status!=="completed"){let v=e.productionActionCompletionMessage?.(u)||"";if(v){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),v),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=v);return}let S=e.blocksProcedureCompletion(u,g.procedure_template_id||null);if(S){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),S),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=S);return}if(e.applySafetyCheckPayload(g,m),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):u?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(m||e.hasCompletedSafetyDeviceCheck(u)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&f.get("machine_down")==="on"){let v=await e.updateAssetStatus(g.asset_id,"offline");v?y.push(`equipment status did not update: ${v.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let w=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(u,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch(v=>v);d&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${d}.`),"Activity log timed out.",8e3).catch(()=>null),w&&y.push(`history did not update: ${w.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(o){a.error("Quick update save failed",o),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${o.message||o}`)}}return{updateWorkOrderQuickView:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var Gt=U((ar,qe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function p(R){return String(R.get("location_new")||R.get("location_existing")||R.get("location")||"").trim()||null}function r(){return e.getSession?.()?.user?.id||null}function i(R){return(e.getAssets?.()||[]).find(q=>q.id===R)||null}function c(R,q){if(!R)return[];let _={name:"name",asset_code:"serial number",asset_tag:"asset tag",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(_).filter(k=>String(R[k]??"")!==String(q[k]??"")).map(k=>_[k])}function u(R){return e.isMissingColumnError(R,"manufacturer")||e.isMissingColumnError(R,"model")}async function f(R){R.preventDefault();let q=R.currentTarget,_=n.querySelector("#asset-create-error");_&&(_.textContent="");let k=q.querySelector("button[type='submit']"),I=k?.textContent||"Add Equipment",D=R.submitter?.dataset?.assetContinue==="true";k&&(k.disabled=!0,k.textContent="Saving...");try{let W=new t(q),x={company_id:e.getActiveCompanyId(),location_id:W.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(W.get("name"),"Equipment name"),asset_code:String(W.get("asset_code")||"").trim()||null,asset_tag:String(W.get("asset_tag")||"").trim()||null,manufacturer:String(W.get("manufacturer")||"").trim()||null,model:String(W.get("model")||"").trim()||null,location:p(W),parent_asset_id:W.get("parent_asset_id")||null,asset_type:W.get("asset_type")||"machine",safety_devices_required:W.get("safety_devices_required")==="on",status:"running",created_by:r()},b=e.supabaseClient().from("assets").insert(x).select("id").single(),{data:P,error:E}=await e.withOperationTimeout(b,"Equipment save timed out. Check your connection and try again.",15e3);if(E&&e.isMissingColumnError(E,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(E&&e.isMissingColumnError(E,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(E&&u(E))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(E&&e.isMissingColumnError(E,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(E&&e.isAssetHierarchySchemaError(E))throw new Error(e.equipmentSchemaMessage(E));if(E)throw E;P?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(P.id,"created",`Created ${x.name}.`),D&&P?.id?(e.setActiveAssetId(P.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(W){_?_.textContent=W.message:a(W.message)}finally{k&&(k.disabled=!1,k.textContent=I)}}async function o(R){R.preventDefault();let q=R.currentTarget,_=n.querySelector("#asset-edit-error");_&&(_.textContent="");let k=q.querySelector("button[type='submit']"),I=k?.textContent||"Save Equipment";k&&(k.disabled=!0,k.textContent="Saving...");try{let D=new t(q),W=i(e.getActiveAssetId()),x={name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,asset_tag:String(D.get("asset_tag")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location_id:D.get("location_id")||e.activeLocationDatabaseId(),location:p(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:D.get("status")},{error:b}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(x).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(b&&u(b))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(b&&e.isMissingColumnError(b,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(b&&e.isAssetHierarchySchemaError(b))throw new Error(e.equipmentSchemaMessage(b));if(b)throw b;let P=c(W,x);P.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${P.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(D){_?_.textContent=D.message:a(D.message)}finally{k&&(k.disabled=!1,k.textContent=I)}}async function d(R,q){let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:q}).eq("id",R).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!_&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(R,"status_changed",`Status changed to ${q}.`),_||null}async function g(R){R.preventDefault();let q=R.currentTarget,_=q.dataset.attachAssetPart,k=n.querySelector(`[data-asset-part-error="${s.escape(_)}"]`);k&&(k.textContent="");let I=q.querySelector("button[type='submit']"),D=I?.textContent||"Attach Part";I&&(I.disabled=!0,I.textContent="Attaching...");try{let W=new t(q),x=W.get("part_id");if(!x)throw new Error("Select a part to attach.");let b=Math.max(1,Number(W.get("quantity_recommended"))||1),P=String(W.get("note")||"").trim()||null,{error:E}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:_,part_id:x,quantity_recommended:b,note:P}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(E)throw e.isMissingTableError?.(E,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):E.code==="23505"?new Error("This part is already linked to this equipment."):E;e.showNotice("Part linked to equipment."),await e.render()}catch(W){k?k.textContent=W.message||"Could not link part to equipment.":e.showNotice(W.message||"Could not link part to equipment.","warning")}finally{I&&(I.disabled=!1,I.textContent=D)}}async function m(R){let q=n.querySelector("[data-asset-part-error]");q&&(q.textContent="");try{let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",R).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(_)throw e.isMissingTableError?.(_,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):_;e.showNotice("Part link removed."),await e.render()}catch(_){q?q.textContent=_.message||"Could not remove linked part.":e.showNotice(_.message||"Could not remove linked part.","warning")}}function h(R){return{workOrders:e.getWorkOrders().filter(q=>q.asset_id===R).length,children:e.childAssetsFor(R).length,schedules:e.getPreventiveSchedules().filter(q=>q.asset_id===R).length,requests:e.getMaintenanceRequests().filter(q=>q.asset_id===R).length}}function y(R){let q=h(R);return Object.values(q).some(Boolean)}async function w(R){let[q,_,k]=await Promise.all([v("work_orders",R),v("preventive_schedules",R),v("maintenance_requests",R)]);return{workOrders:q,children:e.childAssetsFor(R).length,schedules:_,requests:k}}async function v(R,q){let{count:_,error:k}=await e.withOperationTimeout(e.supabaseClient().from(R).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",q),`Equipment delete check timed out while checking ${R}.`,15e3);if(k)throw new Error(`Could not verify linked ${R.replaceAll("_"," ")} before deleting equipment: ${k.message}`);return _||0}async function S(R){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let q=n.querySelector("#asset-delete-error");q&&(q.textContent="");try{let _=await w(R),k=e.assetDeleteBlockerMessage(_);if(k){q&&(q.textContent=k);return}e.setPendingDeleteAssetId(R),e.renderWorkspace()}catch(_){q?q.textContent=_.message||"Could not verify equipment links before delete.":e.showNotice(_.message||"Could not verify equipment links before delete.","warning")}}async function C(R){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let q=n.querySelector("#asset-delete-error");q&&(q.textContent="");let _=n.querySelector(`[data-confirm-delete-asset="${s.escape(R)}"]`);_&&(_.disabled=!0,_.textContent="Deleting...");try{let k=await w(R),I=e.assetDeleteBlockerMessage(k);if(I)throw new Error(I);let D=e.getAssetDocumentStoragePaths?.(R)||[];if(D.length){let x=await e.withOperationTimeout(e.removeAssetDocumentStorage(D),"Equipment file cleanup timed out.",15e3);if(x.error)throw new Error(`Could not remove equipment files: ${x.error.message}`)}let{error:W}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",R).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(W)throw new Error(W.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":W.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(k){q&&(q.textContent=k.message||"Could not delete equipment."),_&&(_.disabled=!1,_.textContent="Permanently Delete")}}async function A(R,q="running"){let _={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:R,asset_type:"machine",safety_devices_required:!0,status:q,created_by:r()},k=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(_).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return k.error&&e.isMissingColumnError(k.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(k,e.databaseSetupRequiredMessage("adding equipment in this location"))):k.error&&e.isMissingColumnError(k.error,"created_by")?e.withSetupError(k,"Run supabase/step-next-asset-events.sql before saving equipment history."):k.error&&e.isAssetHierarchySchemaError(k.error)?e.withSetupError(k,e.equipmentSchemaMessage(k.error).replace("saving","adding")):(!k.error&&k.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(k.data.id,"created",`Created ${R}.`),k)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:v,createAsset:f,createQuickFixAsset:A,deleteAsset:C,loadAssetDeleteBlockers:w,removeAssetPart:m,requestDeleteAsset:S,updateAsset:o,updateAssetStatus:d}}typeof qe<"u"&&qe.exports&&(qe.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var Vt=U((or,Se)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function p(){let d=n.querySelector("#detail-panel");d.innerHTML=e.renderRequestFormContent()}async function r(d){d.preventDefault(),await i(d.target)}async function i(d){let g=n.querySelector("#request-error"),m=d.querySelector("button[type='submit']");g&&(g.textContent=""),m&&(m.disabled=!0,m.textContent="Submitting...");try{let h=new t(d),y=h.get("asset_id")||null,w=String(h.get("equipment_note")||"").trim();if(y&&w)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!w)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let v=w||e.assetNameFor?.(y)||"Saved equipment",S=e.requiredText(h.get("description"),"Request details"),C=e.requiredText(h.get("requester_name"),"Your name"),A={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${v}

${S}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:C};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:R,error:q}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(A).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(q&&e.isMissingColumnError(q,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(q)throw q;let _=h.get("photo"),k="";if(_&&_.name){let D=await e.addPhotoToMaintenanceRequest(R.id,_);D&&(k=` Photo did not upload: ${D.message||D}`)}let I=await e.notifyRequestEmailer(R.id);I?.error&&console.warn("Request email notification did not send",I.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${k}`,k?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{m&&(m.disabled=!1,m.textContent="Submit Request")}}async function c(d){if(!e.getMaintenanceRequests().find(h=>h.id===d))return;let m=n.querySelector(`[data-convert-request="${s.escape(d)}"]`);m&&(m.disabled=!0,m.textContent="Converting...");try{let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().rpc("convert_maintenance_request",{target_company_id:e.getActiveCompanyId(),target_request_id:d}),"Request conversion timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.id)throw new Error("Conversion did not return a work order. Review the request before retrying.");e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),m&&(m.disabled=!1,m.textContent="Convert to Work Order")}}function u(d){let g=e.getMaintenanceRequests().find(m=>m.id===d);g&&(e.setQuickFixRequestId(d),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(d){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===d)&&(e.setPendingDeleteRequestId(d),e.renderWorkspace())}async function o(d){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===d);if(!g)return;let m=n.querySelector(`[data-confirm-delete-request="${s.escape(d)}"]`);m&&(m.disabled=!0,m.textContent="Deleting...");try{if(g.photo_storage_path){let v=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(v.error)throw new Error(`Could not remove request photo: ${v.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let w=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",d).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(w.error)throw new Error(`Request delete verification failed: ${w.error.message}`);if(w.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),m&&(m.disabled=!1,m.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:c,createRequest:r,createRequestFromForm:i,deleteMaintenanceRequest:o,openQuickFixForRequest:u,renderRequestForm:p,requestDeleteMaintenanceRequest:f}}typeof Se<"u"&&Se.exports&&(Se.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var Ht=U((ir,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert;async function s(p){p.preventDefault();let r=p.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",c&&(c.textContent="");try{let u=new t(r),f=u.get("status")||"open",o=u.get("asset_id")||null,d=String(u.get("new_asset_name")||"").trim();if(o&&d)throw new Error("Choose existing equipment or create new equipment, not both.");if(d){let{data:A,error:R}=await e.createQuickFixAsset(d,"running");if(R){c&&(c.textContent=`Could not add equipment: ${R.message}`);return}o=A.id}if(!d&&!e.confirmAssetLocationRouting(o,"creating this work order",c))return;if(f==="completed"&&e.assetRequiresSafety(o)&&u.get("safety_devices_checked")!=="on"){c&&(c.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=f==="completed"?e.blocksProcedureCompletion(null,u.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),c&&(c.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let m={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(o),title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),asset_id:o,priority:u.get("priority"),type:u.get("type")||"corrective",due_at:e.workOrderDateValue(u.get("due_at")),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(u.get("actual_minutes"))||0,failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",completion_notes:u.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(m),e.applySafetyCheckPayload(m,f==="completed"&&m.safety_check_required&&u.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",m,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){c&&(c.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),d&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${d}.`);let w=[],v=u.get("part_id");if(v){let A=e.getParts().find(q=>q.id===v),R=await e.addPartUsageToWorkOrder(h.id,A,Number(u.get("quantity_used"))||1);R?w.push(`part usage failed: ${R.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${A?.name||"Part"}.`)}let S=u.get("photo");if(S&&S.name){let A=await e.addPhotoToWorkOrder(h.id,S);A?w.push(`photo upload failed: ${A.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${S.name}.`)}let C=String(u.get("initial_comment")||"").trim();if(C){let A=await e.addCommentToWorkOrder(h.id,C);A?w.push(`comment failed: ${A.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(w.length?`Work order created with warning: ${w[0]}`:"Work order created.",w.length?"warning":"success"),await e.render()}catch(u){c?c.textContent=`Could not create work order: ${u.message||u}`:a(u.message||u)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var Yt=U((sr,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(p){p.preventDefault();let i=p.target.querySelector("button[type='submit']"),c=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let u=new t(p.target),f=e.getActiveWorkOrderId(),o=e.getWorkOrders().find(A=>A.id===f),d=n.querySelector("#status-select")?.value||o?.status||"open",g=u.has("asset_id"),m=g?u.get("asset_id")||null:o?.asset_id||null;if(g&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(m,"saving this work order",c)){i.disabled=!1,i.textContent="Save Work Order";return}let h={title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),due_at:e.workOrderDateValue(u.get("due_at")),status:d,priority:u.get("priority"),type:u.get("type"),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",actual_minutes:Number(u.get("actual_minutes"))||0};if(g&&(h.asset_id=m,h.location_id=e.locationIdForAsset(m)),h.safety_check_required=e.assetRequiresSafety(m),h.status==="completed"){let A=e.productionActionCompletionMessage?.(o)||"";if(A){e.setWorkOrderActionWarning(f,A),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=A);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(o)&&u.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let y=(o?.procedure_template_id||"")!==(h.procedure_template_id||""),w=h.status==="completed"&&(o?.status!=="completed"||y)?e.blocksProcedureCompletion(o,h.procedure_template_id||null):"";if(w){e.setWorkOrderActionWarning(f,w),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=w);return}h.status==="completed"&&o?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):o?.status==="completed"&&h.safety_check_required&&u.has("safety_devices_checked")?e.applySafetyCheckPayload(h,u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)):o?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:v}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,f),"Work order save timed out. Check your connection and try again.",2e4);if(v){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(v)}`);return}let S={...Object.fromEntries(u.entries()),status:d},C=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(o,S)),"Activity log timed out.",8e3).catch(A=>A);e.setWorkOrderActionWarning("",""),e.showNotice(C?`Work order saved, but history did not update: ${C.message}`:"Work order saved.",C?"warning":"success"),await e.render()}catch(u){a.error("Work order save failed",u),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${u.message||u}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var Kt=U((cr,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function a(p){p.preventDefault();let r=p.currentTarget,i=n.querySelector("#parts-used-error"),c=r.querySelector("button[type='submit']");i&&(i.textContent=""),c&&(c.disabled=!0,c.textContent="Recording...");try{let u=new t(r),f=u.get("part_id"),o=Number(u.get("quantity_used"))||1,d=e.getParts().find(m=>m.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!d)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),d,o);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(u){i&&(i.textContent=u.message||"Could not record part used.")}finally{c&&(c.disabled=!1,c.textContent="Record Part Used")}}async function s(p,r,i){if(!r)return new Error("Choose a part first.");let{error:c}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:p,p_part_id:r.id,p_quantity:i}),"Part usage save timed out.");return c||null}return{addPartUsageToWorkOrder:s,recordPartUsed:a}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var Jt=U((lr,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.consoleRef||console,p=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),r=25*1024*1024,i=5*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),u=new Set;async function f(b){b.preventDefault();let P=b.currentTarget,E=P.dataset.partDocument,O=n.querySelector(`[data-part-document-error="${E}"]`),$=P.querySelector("button[type='submit']"),N=new t(P),L=N.get("document"),j=h(N.get("document_type"));if(O&&(O.textContent=""),!e.getPartDocumentsReady()){O&&(O.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!L||!L.name){O&&(O.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(_(L)){O&&(O.textContent=k()),await C("part document",L,k());return}$&&($.disabled=!0,$.textContent="Attaching...");let V=await R(L),Z=V.fileName||e.safeFileName(L.name||"part-file"),re=`${e.getActiveCompanyId()}/${E}/${a.randomUUID()}-${Z}`;try{let se=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,V.blob,{contentType:V.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(se.error)throw se.error;let J={company_id:e.getActiveCompanyId(),part_id:E,uploaded_by:e.getSession().user.id,storage_path:re,file_name:Z,content_type:V.contentType,document_type:j,file_size_bytes:V.blob.size||null,original_file_name:e.safeFileName(L.name||"part-file"),original_size_bytes:L.size||null},{error:ae}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(J),"Part file record save timed out. Check your connection and try again.",15e3);if(ae&&e.isColumnSchemaError(ae,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete J.document_type,delete J.file_size_bytes,delete J.original_file_name,delete J.original_size_bytes,ae=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(J),"Part file record retry timed out. Check your connection and try again.",15e3)).error),ae)throw await w("part-documents",re),e.isColumnSchemaError(ae,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?ae.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(se){await C("part document",L,se),O&&(O.textContent=se.message||"Could not attach file.")}finally{$&&($.disabled=!1,$.textContent="Attach File")}}async function o(b){b.preventDefault();let P=b.currentTarget,E=P.dataset.assetDocument,O=n.querySelector(`[data-asset-document-error="${E}"]`),$=P.querySelector("button[type='submit']"),N=new t(P),L=N.get("document"),j=m(N.get("document_type"));if(O&&(O.textContent=""),!e.getAssetDocumentsReady?.()){O&&(O.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!L||!L.name){O&&(O.textContent="Choose a machine file first.");return}if(_(L)){O&&(O.textContent=k()),await C("equipment file",L,k());return}$&&($.disabled=!0,$.textContent="Uploading...");let V=await R(L),Z=`${e.getActiveCompanyId()}/${E}/${a.randomUUID()}-${V.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(Z,V.blob,{contentType:V.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:se}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:E,uploaded_by:e.getSession().user.id,storage_path:Z,file_name:V.fileName,content_type:V.contentType,document_type:j,file_size_bytes:V.blob.size||null,original_file_name:e.safeFileName(L.name||"machine-photo"),original_size_bytes:L.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(se)throw await w("asset-documents",Z),e.isColumnSchemaError(se,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?se.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await C("equipment file",L,re),O&&(O.textContent=re.message||"Could not upload machine file.")}finally{$&&($.disabled=!1,$.textContent="Attach Machine File")}}async function d(b,P){let E=n.querySelector("[data-asset-document-error]");if(E&&(E.textContent=""),!b||!P){let O="Missing machine file record. Refresh and try again.";E?E.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([P]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:$}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",b).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if($)throw $;e.showNotice("Machine file deleted."),await e.render()}catch(O){E?E.textContent=O.message||"Could not delete machine file.":e.showNotice(O.message||"Could not delete machine file.","warning")}}async function g(b,P){let E=n.querySelector("#photo-error");if(E&&(E.textContent=""),!b||!P){let O="Missing photo record. Refresh and try again.";E?E.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([P]),"Photo delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:$}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",b).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if($)throw $;let N=P.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${N}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(O){E?E.textContent=O.message||"Could not delete photo.":e.showNotice(O.message||"Could not delete photo.","warning")}}function m(b){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(b)?b:"other"}function h(b){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(b)?b:"other"}async function y(b){b.preventDefault();let P=b.currentTarget,E=P.querySelector("button[type='submit']"),O=n.querySelector("#photo-error");O&&(O.textContent="");let $=new t(P).get("photo");if(!$||!$.name){O&&(O.textContent="Choose a photo first.");return}let N=D($);if(N){O&&(O.textContent=N),await C("work order photo",$,N);return}E.disabled=!0,E.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let j=await v(e.getActiveWorkOrderId(),$);if(j)throw j;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${$.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(L){await C("work order photo",$,L),O&&(O.textContent=`Could not upload photo: ${L.message||L}`)}finally{E.disabled=!1,E.textContent="Upload Photo"}}async function w(b,P){try{let{error:E}=await e.withOperationTimeout(e.supabaseClient().storage.from(b).remove([P]),"Uploaded file cleanup timed out.",1e4);E&&s.warn(`Could not remove uploaded ${b} object`,E)}catch(E){s.warn(`Could not remove uploaded ${b} object`,E)}}async function v(b,P){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let O=D(P);if(O)return await C("work order photo",P,O),new Error(O);let $=await R(P,A()),N=W($);if(N)return await C("work order photo",P,N),new Error(N);let L=`${e.getActiveCompanyId()}/${b}/${a.randomUUID()}-${$.fileName}`,j=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(L,$.blob,{contentType:$.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(j.error)return await C("work order photo",P,j.error),j.error;let V={company_id:e.getActiveCompanyId(),work_order_id:b,uploaded_by:e.getSession().user.id,storage_path:L,file_name:$.fileName,content_type:$.contentType,file_size_bytes:$.blob.size||null,original_file_name:e.safeFileName(P.name||"photo"),original_size_bytes:P.size||null},{error:Z}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(V),"Photo record save timed out. Check your connection and try again.",15e3);return Z&&e.isColumnSchemaError(Z,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete V.file_size_bytes,delete V.original_file_name,delete V.original_size_bytes,Z=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(V),"Photo record retry timed out. Check your connection and try again.",15e3)).error),Z&&await w("work-order-photos",L),Z&&await C("work order photo",P,Z),Z||null}async function S(b,P){if(!b)return new Error("Request was not saved before photo upload.");let E=D(P);if(E)return await C("request photo",P,E),new Error(E);let O=await R(P,A()),$=W(O);if($)return await C("request photo",P,$),new Error($);let N=`${b}/${a.randomUUID()}-${O.fileName}`,L=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(N,O.blob,{contentType:O.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(L.error)return await C("request photo",P,L.error),L.error;let{error:j}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:b,p_photo_storage_path:N,p_photo_file_name:O.fileName,p_photo_content_type:O.contentType,p_photo_file_size_bytes:O.blob.size||null,p_photo_original_file_name:e.safeFileName(P.name||"photo"),p_photo_original_size_bytes:P.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return j&&(await w("maintenance-request-photos",N),await C("request photo",P,j)),j||null}async function C(b,P,E){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let O=String(E?.message||E||"Upload failed").slice(0,500),$=e.safeFileName(P?.name||"unknown-file"),N=I(P),L=Number(P?.size||0),j=[b,$,N,L,O].join("|");if(!u.has(j)){u.add(j);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||b||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${b}`.slice(0,140),details:[`Upload context: ${b}`,`File: ${$}`,`Type: ${N}`,`Size: ${L}`,`Error: ${O}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(V){s.warn("Could not report upload failure",V)}}}function A(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function R(b,P={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(b,P);let E=["image/jpeg","image/png","image/webp","image/heic","image/heif"],O=I(b);if(!E.includes(O)&&!(P.acceptAnyImage&&O.startsWith("image/")))return{blob:b,fileName:e.safeFileName(b.name||"photo"),contentType:O};try{if(!p)throw new Error("Browser image optimization is unavailable.");let $=await p(b),N=Number(P.targetBytes||0)||1*1024*1024,L=P.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],j=null;for(let V of L){let Z=await x($,V.maxDimension,V.quality);if(j=Z,Z.size<=N)break}if($.close&&$.close(),!j)throw new Error("Browser could not optimize this image.");return{blob:j,fileName:`${e.fileBaseName(b.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch($){return s.warn("Photo optimization failed; uploading original.",$),{blob:b,fileName:e.safeFileName(b.name||"photo"),contentType:O}}}function q(b){return["image/jpeg","image/png","image/webp"].includes(I(b))}function _(b){return!q(b)&&Number(b.size||0)>r}function k(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function I(b){let P=String(b?.type||"").trim().toLowerCase();if(P)return P;let E=String(b?.name||"").toLowerCase();return/\.(jpe?g)$/.test(E)?"image/jpeg":/\.png$/.test(E)?"image/png":/\.webp$/.test(E)?"image/webp":/\.gif$/.test(E)?"image/gif":/\.heic$/.test(E)?"image/heic":/\.heif$/.test(E)?"image/heif":/\.pdf$/.test(E)?"application/pdf":/\.txt$/.test(E)?"text/plain":/\.csv$/.test(E)?"text/csv":/\.doc$/.test(E)?"application/msword":/\.docx$/.test(E)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(E)?"application/vnd.ms-excel":/\.xlsx$/.test(E)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function D(b){let P=I(b);return c.has(P)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function W(b){return c.has(String(b?.contentType||"").toLowerCase())?Number(b?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function x(b,P,E){let O=Math.min(1,P/Math.max(b.width,b.height)),$=Math.max(1,Math.round(b.width*O)),N=Math.max(1,Math.round(b.height*O)),L=n.createElement("canvas");L.width=$,L.height=N,L.getContext("2d",{alpha:!1}).drawImage(b,0,0,$,N);let V=await new Promise(Z=>L.toBlob(Z,"image/jpeg",E));if(!V)throw new Error("Browser could not optimize this image.");return V}return{addPhotoToMaintenanceRequest:S,addPhotoToWorkOrder:v,optimizePhoto:R,removeUploadedObject:w,reportUploadFailure:C,deleteAssetDocument:d,deleteWorkOrderPhoto:g,uploadAssetDocument:o,uploadPartDocument:f,uploadPhoto:y}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMediaStorageWorkflow:l}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:l}})()});var Zt=U((ur,Ee)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.URLRef||URL,p=e.consoleRef||console,r=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function u(m){m.preventDefault();let h=m.currentTarget,y=n.querySelector("#company-logo-error"),w=h.querySelector("button[type='submit']"),v=new t(h).get("logo");if(y&&(y.textContent=""),!v||!v.name){y&&(y.textContent="Choose a logo image first.");return}w&&(w.disabled=!0,w.textContent="Uploading...");try{let S=d(v);if(S)throw new Error(S);let C=await f(v),A=g(C);if(A)throw new Error(A);let R=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${C.fileName}`,q=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(R,C.blob,{contentType:C.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(q.error)throw new Error(q.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":q.error.message);let{error:_}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:R}),"Company logo record save timed out. Check your connection and try again.",15e3);if(_)throw await e.removeUploadedObject("company-logos",R),new Error(e.isColumnSchemaError(_,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":_.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":_.message);let k=e.getCompanies().find(I=>I.id===e.getActiveCompanyId());k&&(k.logo_path=R,k.logoUrl=s.createObjectURL(C.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(S){y&&(y.textContent=S.message||"Could not upload logo.")}finally{w&&(w.disabled=!1,w.textContent="Upload Logo")}}async function f(m){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(m);let h=o(m);try{if(!r)throw new Error("Browser logo optimization is unavailable.");let y=await r(m),v=Math.min(1,1200/Math.max(y.width,y.height)),S=Math.max(1,Math.round(y.width*v)),C=Math.max(1,Math.round(y.height*v)),A=n.createElement("canvas");A.width=S,A.height=C;let R=A.getContext("2d",{alpha:!0});R.clearRect(0,0,S,C),R.drawImage(y,0,0,S,C),y.close&&y.close();let q=await new Promise(_=>A.toBlob(_,"image/png"));if(!q)throw new Error("Browser could not optimize this logo.");return{blob:q,fileName:`${e.fileBaseName(m.name||"logo")}.png`,contentType:"image/png"}}catch(y){return p.warn("Logo optimization failed; uploading original.",y),{blob:m,fileName:e.safeFileName(m.name||"logo"),contentType:h}}}function o(m){let h=String(m?.type||"").trim().toLowerCase();if(h)return h;let y=String(m?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function d(m){let h=o(m);return c.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(m){return c.has(String(m?.contentType||"").toLowerCase())?Number(m?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:u}}typeof Ee<"u"&&Ee.exports&&(Ee.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var Xt=U((dr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,a=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function p(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(o=>o.id===i))return;let u=s(i);if(u){a(u);return}let f=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||f){r(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function r(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let c=e.getParts().find(d=>d.id===i),u=n.querySelector("#part-delete-error");if(u&&(u.textContent=""),!c)return;let f=s(i);if(f){u&&(u.textContent=f);return}let o=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let d=(e.getPartDocumentsByPartId()[i]||[]).map(y=>y.storage_path).filter(Boolean);if(d.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(d),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:m}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(m)throw new Error(m.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":m.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(d){e.showNotice(d.message||"Could not delete part.","warning"),u&&(u.textContent=d.message||"Could not delete part."),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}return{deletePart:r,requestDeletePart:p}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof Ze<"u"&&(Ze.exports={createPartDeleteWorkflow:l})})()});var en=U((pr,Xe)=>{(function(){function l(e={}){function n(a){if(!a.isConnected)return;let s=e.getWorkOrders().find(g=>g.id===a.dataset.workOrderId),p=e.getProcedureTemplates().find(g=>g.id===s?.procedure_template_id);if(!p)return;let r=e.checklistProgress(s,p),i=e.requiredChecklistProgress(s,p),c=a.closest(".detail-stack"),u=c?.querySelector("[data-checklist-summary]"),f=c?.querySelector(".relationship-chip.procedure > span");u&&(u.textContent=`${r.done} of ${r.total} complete - required ${i.done}/${i.total}`),f&&(f.textContent=`${r.done}/${r.total}`);let o=a.closest(".checklist-step")?.querySelector("[data-checklist-recorded]"),d=e.getStepResultsByWorkOrder()[s.id]?.[a.dataset.stepResult];o&&(o.textContent=d?.completed_at?`Recorded ${new Date(d.completed_at).toLocaleString()}`:"")}async function t(a){let s=a.target,p=s.type==="checkbox"?s.checked?"checked":"":s.value;s.disabled=!0;try{let{error:r}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:s.dataset.workOrderId,procedure_step_id:s.dataset.stepResult,completed_by:p?e.getSession().user.id:null,value:p,completed_at:p?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(r)throw r;await e.withOperationTimeout(e.recordWorkOrderEvent(s.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let i=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(c=>c);if(i){e.showNotice(`Checklist saved, but refresh did not finish: ${i.message||i}`,"warning"),s.disabled=!1;return}if(e.getWorkOrderActionWarningId()===s.dataset.workOrderId){let c=e.getWorkOrders().find(u=>u.id===s.dataset.workOrderId);e.blocksProcedureCompletion(c)||e.setWorkOrderActionWarning("","")}s.disabled=!1,n(s)}catch(r){e.showNotice(`Could not save checklist step: ${r.message||r}`,"warning"),s.disabled=!1}}return{saveStepResult:t}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:l},typeof Xe<"u"&&(Xe.exports={createProcedureChecklistWorkflow:l})})()});var tn=U((mr,et)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function s(u,f){let{data:o,error:d}=await e.withOperationTimeout(e.getPublicRequestIntake(u),f);return{data:Array.isArray(o)?o[0]:o,error:d}}async function p(u){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:d,error:g}=await s(u,"Request QR lookup timed out.");if(f=d,g||!f){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let o=e.publicRequestUrl(u);e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function r(u){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:o,error:d}=await s(u,"Request form lookup timed out.");if(d){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=o}catch(o){i(o.message||"This request link could not be loaded.");return}if(!f){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),n.querySelector("#public-request-form").addEventListener("submit",o=>c(o,u,f))}function i(u){e.setAppHtml(e.publicRequestError(u))}async function c(u,f,o){u.preventDefault();let d=u.currentTarget,g=new a(d),m=n.querySelector("#public-request-error"),h=d.querySelector("button[type='submit']");m&&(m.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:w}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(w)throw w;let v=g.get("photo"),S="";if(v&&v.name){let A=await e.addPhotoToMaintenanceRequest(y,v);A&&(S=`Request sent, but the photo did not upload: ${A.message||A}`)}let C=await e.notifyRequestEmailer(y);C.error&&e.warn("Request email notification did not send",C.error),e.setAppHtml(e.publicRequestSuccess(o,S)),n.querySelector("#public-request-another").addEventListener("click",()=>r(f))}catch(y){m&&(m.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:r,renderPublicRequestQrPage:p,submitPublicRequest:c}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof et<"u"&&(et.exports={createPublicRequestIntakeWorkflow:l})})()});var nn=U((fr,tt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(p){p.preventDefault();let r=p.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#company-error"),u=String(new t(r).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",c.textContent="";try{if(!u)throw new Error("Company name is required.");let f=e.getCompanies().find(m=>m.name.trim().toLowerCase()===u.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:o,error:d}=await e.withOperationTimeout(e.createCompanyRecord(u),"Company creation timed out.");if(d){c.textContent=d.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":d.message;return}if(e.setActiveCompanyId(o),e.persistActiveCompanyId(o),!await e.ensureProfileForActiveCompany(u))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){c.textContent=f.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof tt<"u"&&(tt.exports={createCompanySetupWorkflow:l})})()});var rn=U((gr,nt)=>{(function(){function l(e={}){async function n(a){let s=e.getWorkOrders().find(p=>p.id===e.getActiveWorkOrderId());a.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),a.target.value)||(a.target.value=s?.status||"open")}catch(p){a.target.value=s?.status||"open",e.showNotice(`Could not update status: ${p.message||p}`,"warning")}finally{a.target.disabled=!1}}async function t(a,s){let p=e.getWorkOrders().find(f=>f.id===a);if(s==="completed"){let f=e.productionActionCompletionMessage?.(p)||"";if(f)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,f),e.showNotice(f,"warning"),await e.render(),!1;let o=e.blocksProcedureCompletion(p);if(o)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,o),e.showNotice(o,"warning"),await e.render(),!1}let r=e.currentSafetyCheckboxCheckedForWorkOrder(a),i=e.hasCompletedSafetyDeviceCheck(p)||r;if(s==="completed"&&e.requiresSafetyDeviceCheck(p)&&!i){e.setActiveWorkOrderId(a);let f="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(a,f),e.showNotice(f,"warning"),await e.render(),!1}let c={status:s,asset_id:p?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(c),s==="completed"?e.applySafetyCheckPayload(c,c.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(c,!1),delete c.asset_id;let{error:u}=await e.withOperationTimeout(e.updateWorkOrderSafely(c,a),"Status save timed out. Check your connection and try again.",15e3);return u?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(u)}`,"warning"),!1):(e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(a,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof nt<"u"&&(nt.exports={createWorkOrderStatusWorkflow:l})})()});var an=U((hr,Re)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function a(c,u){return c?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${u}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${u}"]`)||null}async function s({workOrderId:c,payload:u,source:f,busyText:o,successMessage:d}){let g=f?.querySelector?.("button[type='submit']")||f,m=g?.textContent||"",h=a(f,c);g&&(g.disabled=!0,g.textContent=o),h&&(h.textContent="");try{let y=await e.withOperationTimeout(e.updateProductionActionRecord(c,u),"Production Action save timed out. Check your connection and try again.",15e3);if(y.error){let w=e.friendlyWorkOrderSaveError(y.error);return h?h.textContent=`Could not save Production Action: ${w}`:e.showNotice(`Could not save Production Action: ${w}`,"warning"),!1}return e.showNotice(d,"success"),await e.afterProductionActionMutation(y.data,c),!0}catch(y){let w=y.message||String(y);return h?h.textContent=`Could not save Production Action: ${w}`:e.showNotice(`Could not save Production Action: ${w}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=m)}}async function p(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.productionActionForm,o=new n(u),d=String(o.get("production_action")||"").trim(),g=String(o.get("production_action_assigned_to")||"").trim(),m=a(u,f);if(!d||!g){m&&(m.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(f);await s({workOrderId:f,payload:{production_action:d,production_action_assigned_to:g},source:u,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function r(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.workOrderId,o=u.dataset.productionActionStatus;await s({workOrderId:f,payload:{production_action_status:o},source:u,busyText:o==="completed"?"Completing...":"Reopening...",successMessage:o==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:f,payload:{production_action:null},source:u,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:p,setProductionActionStatus:r,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof Re<"u"&&Re.exports&&(Re.exports={createProductionActionWorkflow:l})})()});var on=U((yr,rt)=>{(function(){function l(e={}){async function n(s,p={}){let r=s.filter(f=>f.id&&!f.read_at);if(!r.length)return!0;let i=new Map(r.map(f=>[f.id,f])),c=new Date().toISOString(),u=r.map(f=>f.id);e.setNotifications(e.getNotifications().map(f=>i.has(f.id)?{...f,read_at:c}:f)),p.render!==!1&&e.renderWorkspace();try{let f=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,u,c),"Work notification update timed out.",1e4);if(f.error)throw f.error;return!0}catch(f){return e.setNotifications(e.getNotifications().map(o=>i.get(o.id)||o)),e.showNotice(`Could not mark the work notification read: ${f.message||f}`,"warning"),p.render!==!1&&e.renderWorkspace(),!1}}function t(s,p={}){let r=e.getNotifications().find(i=>i.id===s);return r?.read_at?Promise.resolve(!0):n([r||{id:s,read_at:null}],p)}function a(s,p={}){return n(e.getNotifications().filter(r=>r.work_order_id===s),p)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:a}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:l},typeof rt<"u"&&(rt.exports={createWorkOrderNotificationWorkflow:l})})()});var sn=U((wr,at)=>{(function(){function l(e){async function n(t,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(p=>p.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let p=e.workOrderDateValue(a);if(!p)throw new Error("Choose a due date.");let r=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:p},t),"Due date save timed out. Check your connection and try again.");if(r.error)throw r.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:p}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:p}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${p} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:p}}catch(p){return e.showNotice(`Could not set due date: ${p.message||p}`,"warning"),{saved:!1,reason:"save_failed",error:p}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof at<"u"&&(at.exports={createPlanningDueDateWorkflow:l})})()});var cn=U((br,ot)=>{(function(){function l(n,t,a,s=50){let p=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",a).order("created_at",{ascending:!1}).limit(p)}function e(n,t,a,s){let p=[...new Set((a||[]).filter(Boolean))];return p.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",p).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e},typeof ot<"u"&&(ot.exports={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e})})()});var ln=U((vr,it)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:a||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof it<"u"&&(it.exports={notifyRequestEmailer:l})})()});var un=U((kr,st)=>{(function(){async function l(n,t,a=[],s={}){let p=s.pathKey||"storage_path",r=s.urlKey||"signedUrl",i=s.expiresIn||600,c=s.onError;await Promise.all(a.map(async u=>{let f=u?.[p];if(!f)return;let{data:o,error:d}=await n.storage.from(t).createSignedUrl(f,i);if(d){u[r]="",typeof c=="function"&&c(u,d);return}u[r]=o?.signedUrl||""}))}function e(n={}){function t(a){if(!a||!n.getReady())return;let p=(n.getRows(a)||[]).filter(i=>i.storage_path&&!i.signedUrl),r=n.getSigningMap();!p.length||r[a]||(r[a]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,p),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete r[a],n.getActiveGroupId()===a&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof st<"u"&&(st.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var dn=U((_r,ct)=>{(function(){function l(t,a){if(t[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return t[a]}function e(t={}){let a=l(t,"supabaseClient"),s=l(t,"workspaceUiState"),p=l(t,"applyRequestQueryFilters"),r=l(t,"applyWorkOrderListFilters"),i=l(t,"applyWorkOrderFilters"),c=l(t,"selectWorkOrders"),u=l(t,"countWorkOrdersQuery"),f=l(t,"fetchExactSearchedWorkOrderPage"),o=l(t,"isColumnSchemaError"),d=t.warn||(()=>{}),g=l(t,"LIST_ITEMS_PER_PAGE"),m=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),y=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),w=l(t,"REQUEST_FALLBACK_SELECT"),v=l(t,"WORK_ORDER_RELATION_SELECT"),S=l(t,"WORK_ORDER_FALLBACK_SELECT");function C(){return typeof a=="function"?a():a}async function A(W=s.getRequestViewFilter(),x={}){let b=Math.max(1,s.getRequestsPage()),P=(b-1)*g,E=P+g-1,O=x.includeRelations===!1?w:x.includeLocationRelation===!1?y:h,$=await p(C().from("maintenance_requests").select(O,{count:"exact"}),W).order("created_at",{ascending:!1}).range(P,E);return $.error&&x.includeLocationRelation!==!1&&o($.error,["location_id","locations"])?A(W,{includeLocationRelation:!1}):$.error&&x.includeRelations!==!1?A(W,{includeRelations:!1}):!$.error&&$.count&&b>1&&P>=$.count?(s.setRequestsPage(Math.max(1,Math.ceil($.count/g))),A(W,x)):$}async function R(W){let x=await p(C().from("maintenance_requests").select("id",{count:"exact",head:!0}),W);return x.error?(d("Request count failed",x.error),0):x.count||0}async function q(){let[W,x,b]=await Promise.all([R("active"),R("converted"),R("all")]);return{active:W,converted:x,all:b}}async function _(W={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return f(W);let x=Math.max(1,s.getWorkOrderPage()),b=(x-1)*m,P=b+m-1,E=W.includeLocationRelation===!1?S:v,O=await r(c(C(),E,{count:"exact"})).range(b,P);return!O.error&&O.count&&x>1&&b>=O.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(O.count/m))),_(W)):O}async function k(W={}){let x=await i(u(C()),W);return x.error?(d("Work order count failed",x.error),0):x.count||0}async function I(){let[W,x,b,P,E,O,$,N]=await Promise.all([k({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:W,newWork:x,inProgress:b,blocked:P,overdue:E,completedAll:O,completedMonth:$,completedWeek:N}}async function D(){let[W,x,b,P,E,O,$,N]=await Promise.all([k({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:W,newWork:x,inProgress:b,blocked:P,overdue:E,completedAll:O,completedMonth:$,completedWeek:N}}return{fetchRequestPage:A,countRequests:R,loadRequestDashboardCounts:q,fetchWorkOrderPage:_,countWorkOrders:k,loadWorkOrderDashboardCounts:I,loadMyWorkDashboardCounts:D}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof ct<"u"&&(ct.exports=n)})()});var pn=U((qr,lt)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,a=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function p(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function r(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){c("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let m=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;m=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;m=h?.session||null}if(!m){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;m=h?.session||null}if(!m)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(m),r(),c("Verification complete. Loading workspace..."),await e.render()}catch(m){r(),u(m.message||"This verification link is invalid or expired.")}}function c(g){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(g)}function u(g){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(g=e.passwordRecoveryParamsFromUrl()){let m=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:w}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});m=!!(y?.session&&!w),w&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";d({ready:m,initialError:h})}function o(g="",m=""){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(g,m),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,w=y.querySelector("button[type='submit']"),v=t.querySelector("#auth-error"),S=t.querySelector("#auth-status"),C=String(new FormData(y).get("email")||"").trim();v.textContent="",S.textContent="Sending reset link...",w.disabled=!0,w.textContent="Sending...";try{let{error:A}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(C,{redirectTo:p()}),"Password reset email timed out. Check your connection and try again.",2e4);if(A){S.textContent="",v.textContent=A.message;return}S.textContent="If that email exists in Supabase, a reset link has been sent."}catch(A){S.textContent="",v.textContent=A.message||"Could not send reset link."}finally{t.body.contains(w)&&(w.disabled=!1,w.textContent="Send Reset Link")}})}function d({ready:g=!1,initialError:m=""}={}){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:g,initialError:m}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{r(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{r(),o()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,w=y.querySelector("button[type='submit']"),v=new FormData(y),S=String(v.get("password")||""),C=String(v.get("confirmPassword")||""),A=t.querySelector("#auth-error"),R=t.querySelector("#auth-status");if(A.textContent="",S.length<8){A.textContent="Password must be at least 8 characters.";return}if(S!==C){A.textContent="Passwords do not match.";return}R.textContent="Updating password...",w.disabled=!0,w.textContent="Updating...";try{let{error:q}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:S}),"Password update timed out. Try the newest reset link again.",2e4);if(q){R.textContent="",A.textContent=q.message;return}r();let{data:_}=await e.supabaseClient.auth.getSession();if(e.setSession(_.session),R.textContent=_.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",_.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(q){R.textContent="",A.textContent=q.message||"Could not update password."}finally{t.body.contains(w)&&(w.disabled=!1,w.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:p,clearPasswordRecoveryUrl:r,startAuthCallback:i,renderAuthCallback:c,renderAuthCallbackError:u,startPasswordRecovery:f,renderPasswordResetRequest:o,renderPasswordRecovery:d}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof lt<"u"&&(lt.exports={createAuthSessionFlow:l})})()});var mn=U((Sr,Oe)=>{(function(){function l(p,r){let i=r.getProfilesByUserId();if(p.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${r.escapeHtml(i[p.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(p.created_at).toLocaleString()}</span>
        <p>${r.escapeHtml(p.body)}</p>
      </article>
    `;if(p.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${r.photoMetaText(p)} &middot; ${r.escapeHtml(i[p.uploaded_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(p.file_name)}</p>
        ${p.signedUrl?`<a href="${r.escapeHtml(p.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(p.type==="part"){let u=r.partUsageUnitCost(p)*(Number(p.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(p.created_at).toLocaleString()} &middot; ${r.escapeHtml(i[p.created_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(p.parts?.name||"Part")} - ${Number(p.quantity_used)||0} used - ${r.money(u)}</p>
      </article>
    `}return`
    <article>
      <strong>${r.escapeHtml(p.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(p.created_at).toLocaleString()} \xC2\xB7 ${r.escapeHtml(i[p.actor_id]?.full_name||"Team member")}</span>
      <p>${r.escapeHtml(p.summary)}</p>
    </article>
  `}function e(p,r){let i=r.getProcedureTemplates(),c=r.getPartsUsedByWorkOrder(),u=r.getCommentsByWorkOrder(),f=r.getPhotosByWorkOrder(),o=r.getMessageThreads(),d=i.find(S=>S.id===p.procedure_template_id),g=d?r.checklistProgress(p,d):null,m=(c[p.id]||[]).length,h=(u[p.id]||[]).length,y=(f[p.id]||[]).length,w=o.filter(S=>S.work_order_id===p.id).length,v=[];return p.asset_id&&v.push(n("asset","Equipment",p.assets?.name||"Linked",r)),d&&g&&v.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,r)),m&&v.push(n("parts","Parts",String(m),r)),h&&v.push(n("comment","Comments",String(h),r)),w&&v.push(n("message","Messages",String(w),r)),y&&v.push(t(p.id,String(y),r)),v.length?`<div class="relationship-row">${v.join("")}</div>`:""}function n(p,r,i,c){return`
    <span class="relationship-chip ${p}" title="${c.escapeHtml(r)}">
      ${a(p)}
      <span>${c.escapeHtml(i)}</span>
    </span>
  `}function t(p,r,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(p)}" title="Open photos">
      ${a("photo")}
      <span>${i.escapeHtml(r)}</span>
    </button>
  `}function a(p){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[p]||""}function s(p){return Object.freeze({renderActivityItem:r=>l(r,p),renderRelationshipChips:r=>e(r,p),relationshipChip:(r,i,c)=>n(r,i,c,p),photoJumpChip:(r,i)=>t(r,i,p),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Oe<"u"&&Oe.exports&&(Oe.exports={createRelationshipDisplayHelpers:s})})()});var fn=U((Cr,ut)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,a=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,p=e.isConvertedRequest,r=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),c=e.getPendingDeleteRequestId,u=e.getProfilesByUserId;function f(m,h){return m==="converted"?`${h} converted`:m==="all"?`${h} total`:`${h} active`}function o(m,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",m.active],["converted","Converted",m.converted],["all","All",m.all]].map(([v,S,C])=>`
            <button class="segment ${h===v?"active":""}" data-request-filter="${v}" type="button" ${y.locked&&v!=="active"?"disabled":""}>
              ${n(v==="active"?"open":v==="converted"?"completed":"all")}${S} <span>${C}</span>
            </button>
          `).join("")}
        </div>
      `}function d(m){let h=p(m),y=i(),w=c()===m.id,v=u(),S=m.created_at?new Date(m.created_at):null,C=S&&!Number.isNaN(S.getTime())?S.toLocaleString():"date unavailable",A=m.assets?.name||m.locations?.name||"No equipment",R=m.requested_by_name||v[m.requested_by]?.full_name||"Requester",q=m.converted_by||m.reviewed_by||"",_=v[q]?.full_name||"",k=_?`Converted to work order by ${_}`:q?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",I=y&&r()?w?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${t(m.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${t(m.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${h?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${m.priority}">${t(m.priority)}</span>
                <span class="chip ${h?"completed":"open"}">${h?"converted":t(m.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${t(m.title)}</h3>
            <p>${t(m.description||"No description.")}</p>
            ${s(m)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(A)}</span>
              <span><strong>Requester</strong>${t(R)}</span>
              <span><strong>Received</strong>${t(C)}</span>
            </div>
          </div>
          ${y&&!h&&m.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${m.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${m.id}" type="button">Convert to Work Order</button>
              ${I}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(k)}</span>
              ${I}
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:o,renderMaintenanceRequest:d,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof ut<"u"&&(ut.exports={createRequestDisplayHelpers:l})})()});var gn=U(($r,dt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=E=>String(E||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:s,getWorkOrderTypeFilter:p=()=>"all",getWorkOrderPriorityFilter:r=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:c=()=>"none",getActiveStatusFilter:u,getMyWorkFilter:f,getActiveSection:o,getDueState:d,getProcedureTemplates:g,getActiveWorkOrderId:m,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:w,TYPE_OPTIONS:v=[],OUTSIDE_VENDOR_VALUE:S,escapeHtml:C,cleanWorkOrderDescription:A,relationshipIcon:R,segmentIcon:q,isVendorAssigned:_,assignmentLabel:k,renderRelationshipChips:I,canAssignWorkOrderToMe:D,canManageTeam:W,renderProductionActionCard:x=()=>"",hasOpenProductionAction:b=()=>!1,hasUnreadProductionReady:P=()=>!1}){function E(){let T=a(),B=s(),G=u(),Y=T?`${t(T)} Work`:B==="unassigned"?"Unassigned Work Orders":B==="vendor"?"Outside Vendor Work":B==="assigned"?"Assigned Work Orders":"Work Orders";return G==="active"||G==="all"?Y==="Work Orders"?"Active Work Orders":`Active - ${Y}`:`${e(G)} - ${Y}`}function O(){let T=u();return T==="active"||T==="all"?"My Work":`${e(T)} - My Work`}function $(){return o()==="mywork"?O():E()}function N(T){let B=o(),G=f();return B==="mywork"?`${T} shown - ${B==="mywork"?G==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${T} shown`}function L(T,B,G){return`<option value="${C(T)}" ${T===G?"selected":""}>${C(B)}</option>`}function j(T){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[T]||"Any assignment"}function V(T){return T?T.charAt(0).toUpperCase()+T.slice(1):""}function Z(T=[]){let B=u(),G=B==="all"?"active":B,Y=s(),X=a(),K=p(),H=r(),ne=i(),ee=c(),de=["completed","completed_month","completed_week"].includes(B),oe=G==="active"&&Y==="all"&&!X&&K==="all"&&H==="all"&&ne==="newest"&&ee==="none",F=T.find(te=>te.userId===X),pe=[`Status: ${e(G)}`,`Assignment: ${j(Y)}`,...F?[`Person: ${F.name}`]:[],...K!=="all"?[`Type: ${n(K)}`]:[],...H!=="all"?[`Priority: ${V(H)}`]:[]],he=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ue=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],M=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],ie=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${pe.map(te=>`<li><span>${C(te)}</span></li>`).join("")}
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
                  ${he.map(([te,ge])=>L(te,ge,G)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ue.map(([te,ge])=>L(te,ge,Y)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${L("","Any team member",X)}
                  ${T.map(te=>L(te.userId,te.name,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${K!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${L("all","Any type",K)}
                  ${v.map(te=>L(te,n(te),K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${H!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${L("all","Any priority",H)}
                  ${["critical","high","medium","low"].map(te=>L(te,V(te),H)).join("")}
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
                  ${de?L("completed","Recently completed","completed"):M.map(([te,ge])=>L(te,ge,ne)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${ie.map(([te,ge])=>L(te,ge,ee)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function re(T,B){if(B==="assignee"){if(_(T))return{key:"vendor",label:"Outside vendor",order:900};if(!T.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let X=k(T);return{key:`assignee:${T.assigned_to}`,label:X,order:100}}if(B==="status"){let X=["open","in_progress","blocked","completed"].indexOf(T.status);return{key:`status:${T.status}`,label:e(T.status),order:X<0?99:X}}if(B==="priority"){let X=["critical","high","medium","low"].indexOf(T.priority);return{key:`priority:${T.priority}`,label:V(T.priority||"Unspecified"),order:X<0?99:X}}let G=T.type||"corrective",Y=v.indexOf(G);return{key:`type:${G}`,label:n(G),order:Y<0?99:Y}}function se(T,B={}){if(!T.length)return'<p class="muted">No work orders match these filters.</p>';let G=B.groupBy||"none";if(G==="none")return`<div class="work-list" id="work-order-list">${T.map(J).join("")}</div>`;let Y=new Map;return T.forEach(K=>{let H=re(K,G);Y.has(H.key)||Y.set(H.key,{...H,workOrders:[]}),Y.get(H.key).workOrders.push(K)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...Y.values()].sort((K,H)=>K.order-H.order||K.label.localeCompare(H.label)).map(K=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${C(K.label)}</h3>
                <span>${K.workOrders.length}</span>
              </div>
              <div class="work-list">${K.workOrders.map(J).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function J(T){let B=d(T),G=g().find(ee=>ee.id===T.procedure_template_id),Y=T.created_at?new Date(T.created_at):null,X=Y&&!Number.isNaN(Y.getTime())?Y.toLocaleDateString():"",K=T.status==="completed",H=K?"Completed":e(T.status),ne=ee=>ee==="completed"?"Complete":e(ee);return`
        <article class="work-card status-card status-${T.status} ${T.id===m()?"selected":""}" data-id="${T.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${T.priority}">${T.priority}</span>
              <span class="chip">${C(n(T.type))}</span>
              <span class="chip ${T.status}">${H}</span>
              ${B?`<span class="chip ${B.className}">${B.label}</span>`:""}
              ${P(T.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${C(T.title)}</h3>
            <p>${C(A(T.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${R("asset")}${C(T.assets?.name||"General item / area")}</span>
            <span>${q(_(T)?"vendor":"mine")}${C(k(T))}</span>
            ${G?`<span>${R("procedure")}${C(G.name)}</span>`:""}
            <span>${q("due")}Due ${T.due_at||"unset"}</span>
            ${X?`<span>${q("created")}Created ${C(X)}</span>`:""}
            ${T.completed_at?`<span>${q("completed")}Completed ${new Date(T.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${I(T)}
          ${x(T)}
          <div class="quick-actions work-card-actions">
            ${!K&&D(T)?`<button class="assign-action" data-assign-me="${T.id}" type="button">Assign to me</button>`:""}
            ${!K&&W()?ae(T):""}
          ${w.filter(ee=>ee!==T.status&&!(ee==="completed"&&b(T))).slice(0,3).map(ee=>`
            <button data-quick-status="${ee}" data-id="${T.id}" type="button">${ne(ee)}</button>
          `).join("")}
        </div>
      </article>
    `}function ae(T){return`
        <form class="card-assign-form" data-card-assign="${T.id}">
          <select name="assigned_to" aria-label="Assign ${C(T.title)}">
            <option value="">Unassigned</option>
            <option value="${S}" ${_(T)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([B,G])=>`<option value="${B}" ${!_(T)&&B===T.assigned_to?"selected":""}>${C(G.full_name||t(B))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function z(T="",B={}){let G=T||"",Y=B.managerOptions??W(),X=B.allowUnassigned!==!1,K=B.selfLabel||"Assign to me",H=[];return X&&H.push(`<option value="" ${G===""?"selected":""}>Unassigned</option>`),H.push(`<option value="${y().user.id}" ${G===y().user.id?"selected":""}>${K}</option>`),Y&&(H.push(`<option value="${S}" ${G===S?"selected":""}>Outside vendor</option>`),H.push(...Object.entries(h()).filter(([ne])=>ne!==y().user.id).map(([ne,ee])=>`<option value="${ne}" ${G===ne?"selected":""}>${C(ee.full_name||t(ne))}</option>`))),H.join("")}function fe(T){return _(T)?S:T?.assigned_to||""}function le(T,B=""){let G=fe(T);return T?.status==="completed"?`
          <label ${B?`id="${B}"`:""}>Completed by / assigned to
            <input value="${C(k(T))}" disabled>
            <input name="assigned_to" type="hidden" value="${C(G)}">
          </label>
        `:W()?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${z(G,{managerOptions:!0})}
            </select>
          </label>
        `:!T.assigned_to&&!_(T)?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${z("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${B?`id="${B}"`:""}>Assigned to
          <input value="${C(k(T))}" disabled>
          <input name="assigned_to" type="hidden" value="${C(G)}">
        </label>
      `}return{workOrdersPanelTitle:E,myWorkPanelTitle:O,workQueuePanelTitle:$,workQueuePanelSubtitle:N,renderWorkOrderFilterToolbar:Z,renderWorkOrderCollection:se,renderWorkOrderCard:J,renderCardAssignmentControl:ae,renderAssignmentSelect:z,renderWorkOrderAssignmentField:le}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof dt<"u"&&(dt.exports={createWorkQueueDisplayHelpers:l})})()});var hn=U((Pr,We)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(o=>e.normalizeRole(o.role)==="production").map(o=>({userId:o.user_id,name:e.teamMemberName(o.user_id)})).sort((o,d)=>o.name.localeCompare(d.name))}function t(o){return o.production_action_assigned_to?e.teamMemberName(o.production_action_assigned_to):"Production owner not set"}function a(o){let d=e.activeCompanyRole();return["admin","manager"].includes(d)||o.production_action_assigned_to===e.getSession()?.user?.id}function s(o=""){return n().map(g=>`
        <option value="${e.escapeHtml(g.userId)}" ${g.userId===o?"selected":""}>${e.escapeHtml(g.name)}</option>
      `).join("")}function p(o,d={}){let g=n(),m=d.compact?" compact":"";if(!g.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=g.some(y=>y.userId===o.production_action_assigned_to)?o.production_action_assigned_to:g[0].userId;return`
        <form class="production-action-form${m}" data-production-action-form="${e.escapeHtml(o.id)}">
          <label>Production action
            <textarea name="production_action" rows="${d.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(o.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${s(h)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(o.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(o)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(o)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(o.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function r(o){return!a(o)||o.status==="completed"?"":o.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(o.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(o.id)}" type="button">Reopen Production Action</button>`}function i(o){let d=o.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${d?"status-completed":"status-open"}">${d?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(o))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(o.production_action)}</p>
        ${d&&o.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(o.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function c(o,d){let g=e.hasProductionAction(o),m=`production-action-dialog-${o.id}`;return`
        <dialog class="production-action-dialog" id="${e.escapeHtml(m)}" data-production-action-dialog="${e.escapeHtml(o.id)}" aria-labelledby="${e.escapeHtml(m)}-title">
          <div class="production-action-dialog-shell">
            <header class="production-action-dialog-header">
              <div>
                <small>Work order action</small>
                <h3 id="${e.escapeHtml(m)}-title">Production Action</h3>
              </div>
              <button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button>
            </header>
            <div class="production-action-dialog-body">
              ${g?i(o):'<p class="muted">No Production Action is assigned.</p>'}
              ${d?`
                <div class="button-row production-action-detail-actions">
                  ${g?r(o):""}
                </div>
                ${p(o)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function u(o){let d=e.canEditOperationalRecords()&&o.status!=="completed",g=e.hasProductionAction(o);if(!g&&!d)return"";let m=o.production_action_status==="completed",h=`production-action-dialog-${o.id}`,y=g?t(o):"Not assigned",w=g?`${y} - ${o.production_action}`:y,v=g?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${m?"is-completed":g?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${g?`<span class="chip ${m?"status-completed":"status-open"}">${m?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(w)}">${e.escapeHtml(w)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(o.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${v}" title="${v}">
            <span aria-hidden="true">${g?"...":"+"}</span>
          </button>
          ${c(o,d)}
        </section>
      `}function f(o){let d=e.canEditOperationalRecords()&&o.status!=="completed";return!e.hasProductionAction(o)&&!d?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(o)?i(o):'<p class="muted">No Production Action is assigned.</p>'}
          ${d?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(o)?r(o):""}
            </div>
            ${p(o)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:u,renderProductionActionDetail:f}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof We<"u"&&We.exports&&(We.exports={createProductionActionDisplayHelpers:l})})()});var yn=U((Ar,pt)=>{(function(){function l(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(c=>String(c||"")),a=e.formatMessageTime||(c=>String(c||"")),s=Math.max(Number(e.visibleLimit)||12,1);function p(){return n().filter(c=>!c.read_at).length}function r(c){return n().some(u=>!u.read_at&&u.kind==="production_action_completed"&&u.work_order_id===c)}function i(){if(!e.getReady?.())return"";let c=n();if(!c.length)return"";let u=p(),f=c.slice(0,s);return`
        <details class="work-notification-panel" ${u?"open":""}>
          <summary>
            <span>Work notifications</span>
            <span>${u?`${u} new`:"Recent"}</span>
          </summary>
          <div class="work-notification-list">
            ${f.map(o=>`
              <button
                class="work-notification-item ${o.read_at?"read":"unread"}"
                data-open-work-notification="${t(o.id)}"
                data-work-order-id="${t(o.work_order_id)}"
                type="button"
              >
                <span class="work-notification-heading">
                  <span class="chip production-ready">Production Ready</span>
                  <time>${t(a(o.created_at))}</time>
                </span>
                <strong>${t(o.title)}</strong>
                <span>${t(o.body)}</span>
              </button>
            `).join("")}
          </div>
          ${c.length>s?`<p class="work-notification-limit">Showing the ${s} most recent notifications.</p>`:""}
        </details>
      `}return{hasUnreadProductionReady:r,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:p}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:l},typeof pt<"u"&&(pt.exports={createWorkOrderNotificationDisplayHelpers:l})})()});var wn=U((Er,xe)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:s,teamMemberName:p}){function r(c){return`
        <article class="mini-work-order" data-mini-work-order="${c.id}">
          <strong>${e(c.title)}</strong>
          <span>${n(c.status)} - ${c.due_at||"no due date"}</span>
        </article>
      `}function i(c){let u=(a()[c.id]||[]).length,f=(s()[c.id]||[]).length,o=c.completed_at?new Date(c.completed_at).toLocaleDateString():"",d=c.completed_by?p(c.completed_by):"",g=!d&&c.assigned_to?p(c.assigned_to):"",m=d?` by ${e(d)}`:g?` - owner ${e(g)}`:"",h=c.resolution_summary||c.completion_notes||"";return`
        <article class="mini-work-order ${c.status==="completed"?"completed-history":""}" data-mini-work-order="${c.id}">
          <div class="chip-row">
            <span class="chip ${c.status}">${n(c.status)}</span>
            ${c.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${u?`<span class="relationship-chip parts">${t("parts")}<span>${u}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${t("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(c.title)}</strong>
          <span>${o?`Completed ${o}${m}`:`Due ${c.due_at||"unset"}`}</span>
          ${c.failure_cause?`<p><b>Finding:</b> ${e(c.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:r,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof xe<"u"&&xe.exports&&(xe.exports={createMiniWorkOrderDisplayHelpers:l})})()});var bn=U((Rr,mt)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:a,getParts:s,getPartDocumentsByPartId:p,getPartDocumentsReady:r,getPendingDeletePartId:i,getShowPartSourceManager:c,getPartCostsReady:u,getPartInventoryFilter:f,getPartSearchQuery:o,partUsageRows:d,canDeleteParts:g,canEditOperationalRecords:m=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:w}){let v=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],S=v.reduce((b,[P,E])=>(b[P]=E.replace(/s$/,""),b),{});function C(b){return b.document_type?b.document_type:String(b.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(b.file_name||"")?"invoice":/receipt/i.test(b.file_name||"")?"receipt":/schematic|diagram/i.test(b.file_name||"")?"schematic":/print|drawing/i.test(b.file_name||"")?"part_print":/manual/i.test(b.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(b.file_name||"")?"spec_sheet":"other"}function A(){return v.map(([b,P])=>`
        <option value="${b}">${e(S[b]||P)}</option>
      `).join("")}function R(b){let P=C(b),E=String(b.content_type||"").startsWith("image/"),O=S[P]||"File",$=b.created_at?new Date(b.created_at).toLocaleString():"Uploaded",N=b.file_size_bytes?`${Math.round(Number(b.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${E?"image-file":""}">
          ${E&&b.signedUrl?`<a class="part-document-thumb" href="${e(b.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(b.signedUrl)}" alt="${e(b.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(O)}</span>
              ${N?`<span class="chip">${e(N)}</span>`:""}
            </div>
            <strong>${e(b.file_name)}</strong>
            <span>${e($)}</span>
            ${b.original_file_name&&b.original_file_name!==b.file_name?`<small>Original: ${e(b.original_file_name)}</small>`:""}
            ${b.signedUrl?`<a href="${e(b.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function q([b,P],E){let O=E.filter($=>C($)===b);return O.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(P)}</h4>
            <span>${O.length}</span>
          </div>
          <div class="part-document-grid">
            ${O.map(R).join("")}
          </div>
        </section>
      `:""}function _(b){let P=b.reduce((O,$)=>{let N=C($);return O[N]=(O[N]||0)+1,O},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(O=>P[O]).map(O=>`<span class="chip">${P[O]} ${e(S[O]||"file")}${P[O]===1?"":"s"}</span>`).join("")}function k(b){let P=Number(b.quantity_on_hand)||0,E=Number(b.reorder_point)||0,O=Number(b.unit_cost)||0,$=P<=E,N=Math.max(0,E-P);return`
        <article class="part-card part-tile ${$?"low-stock":""}" data-open-part="${b.id}" tabindex="0" role="button" aria-label="Open ${e(b.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${b.sku?`<span class="chip">${e(b.sku)}</span>`:""}
              ${b.supplier_name?`<span class="chip part-source-chip">${e(b.supplier_name)}</span>`:""}
              ${b.machine_note?`<span class="chip">${e(b.machine_note)}</span>`:""}
              ${$?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(b.name)}</h3>
            <div class="part-card-meta">
              <span>${P} on hand</span>
              <span>reorder at ${E}</span>
              <span>${u()?`${n(O)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${$&&E>0?`<small>Need ${N} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function I(){let b=s().filter(a),P=b.filter(t).length,E=f();return[["All Parts",b.length,"all"],["Low Stock",P,"low"]].map(([O,$,N])=>`
        <button class="parts-health ${N==="low"&&$?"attention":""} ${E===N?"active":""}" data-part-inventory-filter="${N}" type="button">
          <span>${O}</span>
          <strong>${$}</strong>
        </button>
      `).join("")}function D(b="default"){return`
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
              <option value="default" ${b==="default"?"selected":""}>Default</option>
              <option value="source" ${b==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function W(b){let P=Number(b.quantity_on_hand)||0,E=Number(b.reorder_point)||0,O=Number(b.unit_cost)||0,$=p()[b.id]||[],N=_($),L=m();return`
        <section class="part-detail-shell">
          ${L?h():""}
          ${y()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${b.sku?`<span class="chip">${e(b.sku)}</span>`:""}
                ${b.supplier_name?`<span class="chip part-source-chip">${e(b.supplier_name)}</span>`:""}
                ${b.machine_note?`<span class="chip">${e(b.machine_note)}</span>`:""}
                <span class="chip ${P<=E?"overdue":"open"}">${P<=E?"low stock":"stocked"}</span>
              </div>
              <h3>${e(b.name)}</h3>
              <p>${P} on hand - reorder at ${E}</p>
              ${N?`<div class="chip-row part-file-summary">${N}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${L?`<div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${b.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${e(b.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${b.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${e(b.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>`:""}
          </section>

          ${L?`<form class="part-detail-form relationship-detail parts" data-edit-part="${b.id}">
            <label>Name<input name="name" required value="${e(b.name)}"></label>
            <label>SKU<input name="sku" value="${e(b.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e(b.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e(b.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${P}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${E}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${O}"></label>
            <p class="error-text" data-part-edit-error="${b.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${L&&c()?w():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${$.length} file${$.length===1?"":"s"}</span>
            </div>
            ${L?`<form class="part-document-form" data-part-document="${b.id}">
              <label>File type<select name="document_type">${A()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${b.id}">${r()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${r()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${$.length?v.map(j=>q(j,$)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${L?x(b):""}
        </section>
      `}function x(b){let P=d(b.id).length,E=p()[b.id]||[],O=i()===b.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${P?`This part has ${P} usage record${P===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${E.length?` and ${E.length} filed receipt/invoice record${E.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${P?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:O?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${e(b.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${e(b.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-part="${e(b.id)}" type="button">Delete Part</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:k,renderPartsHealth:I,renderPartSearch:D,renderPartDetail:W,renderPartDangerZone:x}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof mt<"u"&&(mt.exports={createPartsDisplayHelpers:l})})()});var vn=U((Or,ft)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:a,getAppIssueReportsReady:s,getAppIssueReports:p}){function r(){let u=s();return`
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
      `}function i(u){let f={open:0,reviewing:1,resolved:2};return[...u].sort((o,d)=>{let g=(f[o.status||"open"]??1)-(f[d.status||"open"]??1);return g||new Date(d.created_at||0)-new Date(o.created_at||0)})}function c(){if(!e())return"";let u=s(),f=p(),o=i(f);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${u?`${f.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${u?`
            <div class="issue-report-list">
              ${o.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:r,renderAppIssueReportsPanel:c,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createAppIssuePanelDisplayHelpers:l})})()});var kn=U((Wr,gt)=>{(function(){function l(e){let n=e.escapeHtml,t=e.getDueState,a=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,p=e.canEditOperationalRecords||(()=>!0);function r(){return e.getPreventiveSchedules().filter(f=>e.matchesActiveLocation(f)&&e.matchesSearch([f.title,f.frequency,f.next_due_at,f.assets?.name]))}function i(){return e.getProcedureTemplates().filter(f=>e.matchesSearch([f.name,f.description,...(f.procedure_steps||[]).map(o=>o.prompt)]))}function c(f){let o=t({due_at:f.next_due_at,status:"open"}),d=e.getPendingDeleteScheduleId()===f.id,g=p();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${n(f.frequency)}</span>
              ${o?`<span class="chip ${o.className}">${o.label}</span>`:""}
            </div>
            <h3>${n(f.title)}</h3>
            <p>${n(f.assets?.name||"No equipment")} - Next due ${f.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${f.id}" type="button">Generate Work</button>
            ${s()?d?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${n(f.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${n(f.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function u(f){let o=e.getWorkOrders().filter(y=>y.procedure_template_id===f.id).length,d=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===f.id).length,g=a({workOrders:o,schedules:d}),m=e.getPendingDeleteProcedureId()===f.id,h=p();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${f.procedure_steps?.length||0} steps</span>
              <span class="chip">${o} linked work orders</span>
              ${d?`<span class="chip">${d} PM schedules</span>`:""}
            </div>
            <h3>${n(f.name)}</h3>
            <p>${n(f.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(f.procedure_steps||[]).map(y=>`
              <div class="checklist-step">
                <span>${y.position}. ${n(y.prompt)}</span>
                <small>${n(y.response_type)} ${y.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${h?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${f.id}">
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
            <p class="error-text" data-step-error="${f.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
          </form>`:""}
          ${h&&s()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${g||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${n(f.id)}"></p>
              ${g?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:m?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${n(f.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${n(f.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${n(f.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:r,filteredProcedureTemplates:i,renderPreventiveSchedule:c,renderProcedureTemplate:u}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createMaintenanceListDisplayHelpers:l})})()});var _n=U((xr,ht)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:a,checklistProgress:s,requiredChecklistProgress:p,escapeHtml:r,cleanWorkOrderDescription:i,renderRelationshipChips:c,renderWorkOrderCommandSummary:u,renderWorkOrderRecommendation:f,statusLabel:o,normalizeWorkOrderType:d=E=>String(E||"corrective"),workOrderTypeLabel:g=E=>String(E||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),hasCompletedSafetyDeviceCheck:m,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:w,renderWorkOrderAssignmentField:v,requiresSafetyDeviceCheck:S,renderWorkOrderMessages:C,renderProcedureOptions:A,money:R,photoMetaText:q,renderActivityItem:_,canDeleteWorkOrders:k,canEditOperationalRecords:I=()=>!0,renderProductionActionDetail:D=()=>"",hasOpenProductionAction:W=()=>!1}=e;function x(E,O){let $=e.getStepResultsByWorkOrder()[E.id]?.[O.id],N=$?.value||"",L=`data-step-result="${O.id}" data-work-order-id="${E.id}"`,j=`<input ${L} value="${r(N)}" placeholder="Result">`;return O.response_type==="checkbox"&&(j=`<label class="check-row"><input ${L} type="checkbox" ${N==="checked"?"checked":""}> Done</label>`),O.response_type==="pass_fail"&&(j=`
          <select ${L}>
            <option value="">Not checked</option>
            <option value="pass" ${N==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${N==="fail"?"selected":""}>Fail</option>
          </select>
        `),O.response_type==="number"&&(j=`<input ${L} type="number" value="${r(N)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${O.position}. ${r(O.prompt)} ${O.required?'<small class="required-mark">Required</small>':""}</span>
          ${j}
          <small data-checklist-recorded>${$?.completed_at?`Recorded ${new Date($.completed_at).toLocaleString()}`:""}</small>
        </div>
      `}function b(E){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===E.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${r(E.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${E.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${E.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function P(){let E=e.getActiveWorkOrderId(),$=e.getWorkOrders().find(F=>F.id===E);if(!$)return n();let N=e.getCommentsByWorkOrder(),L=e.getPhotosByWorkOrder(),j=e.getEventsByWorkOrder(),V=e.getPartsUsedByWorkOrder(),Z=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),se=e.getWorkOrderActionWarning(),J=e.getParts(),ae=e.getProfilesByUserId(),z=e.getCommentsError(),fe=e.STATUS_OPTIONS||[],le=e.TYPE_OPTIONS||[],T=N[$.id]||[],B=L[$.id]||[],G=j[$.id]||[],Y=V[$.id]||[],X=Y.reduce((F,pe)=>F+(Number(pe.quantity_used)||0)*t(pe),0),K=Y.reduce((F,pe)=>F+(Number(pe.quantity_used)||0),0),H=a(T,B,G,Y),ne=Z.find(F=>F.id===$.procedure_template_id),ee=ne?s($,ne):null,de=ne?p($,ne):null,oe=I();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${$.priority}">${$.priority}</span>
            <span class="chip">${r(g($.type))}</span>
            <span class="chip ${$.status}">${o($.status)}</span>
          </div>
          <h2>${r($.title)}</h2>
          <p>${r(i($.description)||"No description.")}</p>
          ${c($)}
          ${$.completed_at?`<p class="completion-note">Completed ${new Date($.completed_at).toLocaleString()} \xC2\xB7 ${$.actual_minutes||0} min</p>`:""}
          ${$.asset_id&&m($)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${$.completion_notes?`<p>${r($.completion_notes)}</p>`:""}
        </div>

        ${u($)}
        ${f($)}
        ${D($)}

        ${$.completed_at&&($.failure_cause||$.resolution_summary||$.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${$.failure_cause?`<article><span>Cause</span><strong>${r($.failure_cause)}</strong></article>`:""}
            ${$.resolution_summary?`<article><span>Resolution</span><strong>${r($.resolution_summary)}</strong></article>`:""}
            ${$.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${oe?`<label>Status
          <select id="status-select">
            ${fe.map(F=>`<option value="${F}" ${F===$.status?"selected":""} ${F==="completed"&&W($)?"disabled":""}>${o(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${oe?`<div class="quick-actions detail-quick-actions">
          ${h($)?`<button class="assign-action" data-assign-me="${$.id}" type="button">${$.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${fe.filter(F=>F!==$.status&&!(F==="completed"&&W($))).map(F=>`
            <button data-quick-status="${F}" data-id="${$.id}" type="button">${o(F)}</button>
          `).join("")}
        </div>`:""}
        ${re===$.id&&se?`<p class="error-text action-warning">${r(se)}</p>`:""}

        ${oe?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${r($.title)}"></label>
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
                    ${y($.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${r(w($.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r($.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${r($.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${fe.map(F=>`<option value="${F}" ${F===$.status?"selected":""} ${F==="completed"&&W($)?"disabled":""}>${o(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===$.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${v($,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${A($.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${$.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${S($)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${$.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
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
            <button class="secondary-button" data-copy-downtime="subject" data-id="${$.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${$.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${C($)}

        ${oe?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${r($.title)}"></label>
          <label>Description<textarea name="description" rows="3">${r(i($.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${r($.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===$.priority?"selected":""}>${F}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${le.map(F=>`<option value="${F}" ${F===d($.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${v($)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${A($.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${r($.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r($.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${$.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${S($)?`
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${$.safety_devices_checked?"checked":""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          `:""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${$.actual_minutes||0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>`:""}

        ${ne?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${r(ne.name)}</h3>
              <span data-checklist-summary>${ee.done} of ${ee.total} complete - required ${de.done}/${de.total}</span>
            </div>
            <div class="checklist-list">
              ${ne.procedure_steps.map(F=>oe?x($,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${r(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${r(e.getStepResultsByWorkOrder()[$.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${oe&&$.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${de?.total?`<p class="${de.done===de.total?"completion-note":"warning-text"}">Required checklist: ${de.done}/${de.total}</p>`:""}
            ${W($)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${$.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${S($)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${m($)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${W($)?"disabled":""}>Complete Work Order</button>
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
              ${J.map(F=>`<option value="${F.id}">${r(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${Y.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${R(X)}</span></article>`:""}
          ${Y.map(F=>`
            <article class="relationship-detail parts">
              <strong>${r(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${R((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${r(ae[F.created_by]?.full_name||"Team member")}</small>
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
            ${B.map(F=>`
              <article class="relationship-detail photo">
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${r(F.signedUrl)}" alt="${r(F.file_name)}">`:""}
                <strong>${r(F.file_name)}</strong>
                <span>${q(F)}</span>
                ${F.signedUrl?`<a href="${r(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${oe?`<button class="text-button danger-link" data-delete-work-order-photo="${r(F.id||"")}" data-work-order-photo-path="${r(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
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
          ${T.map(F=>`
            <article class="relationship-detail comment">
              <strong>${r(ae[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${r(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${z?`<p class="error-text">${r(z)}</p>`:""}
          ${H.map(_).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${oe&&k()?b($):""}
      </div>
    `}return{renderWorkOrderDetail:P}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createWorkOrderDetailDisplayHelpers:l})})()});var qn=U((Mr,yt)=>{(function(){function l(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var Sn=U((Dr,wt)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:a,escapeHtml:s,assetTypeLabel:p,renderParentAssetOptions:r,renderLocationOptions:i,renderAssetAreaOptions:c,assetStatusLabel:u,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:o,canDeleteEquipment:d,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:m,renderProcedureOptions:h}=e;function y(){let q=new Date;return new Date(q.getTime()-q.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function w(q,_,k){let I=_.some(b=>b.event_type==="created"),D=q.created_at&&!I?[{id:`${q.id}-created`,event_type:"created",summary:`${p(q.asset_type)} created.`,actor_id:q.created_by||"",created_at:q.created_at}]:[];return{equipmentHistory:[..._,...D].sort((b,P)=>new Date(P.created_at||0)-new Date(b.created_at||0)),historyActorLabel:b=>b.actor_id&&k[b.actor_id]?.full_name?k[b.actor_id].full_name:b.actor_id?`User ${String(b.actor_id).slice(0,8)}`:b.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function v(q,_){return q.map(k=>`
        <article>
          <strong>${s(String(k.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${k.created_at?new Date(k.created_at).toLocaleString():"time unavailable"} &middot; ${s(_(k))}</span>
          <p>${s(k.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function S(){let q=e.getAssets(),_=e.getActiveAssetId(),k=q.find(j=>j.id===_);if(!k)return n();let I=e.getAssetEventsReady?.()!==!1,D=e.getProfilesByUserId?.()||{},W=(e.getAssetEventsByAssetId?.()[k.id]||[]).sort((j,V)=>new Date(V.created_at||0)-new Date(j.created_at||0)),{equipmentHistory:x,historyActorLabel:b}=w(k,W,D),P=e.LIST_ITEMS_PER_PAGE||12,E=Math.max(1,Math.ceil(x.length/P)),O=Math.min(Math.max(1,e.getAssetRelationshipPage?.(k.id,"asset-history")||1),E),$=x.length?(O-1)*P+1:0,N=Math.min(x.length,O*P),L=x.slice((O-1)*P,O*P);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(k.name)} - ${x.length} event${x.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(k.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${I?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${v(L,b)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${x.length>P?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(k.id)}" type="button" ${O<=1?"disabled":""}>Previous</button>
                <span>Showing ${$}-${N} of ${x.length} - Page ${O} of ${E}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(k.id)}" type="button" ${O>=E?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function C(){let q=e.getAssets(),_=e.getActiveAssetId(),k=q.find(M=>M.id===_);if(!k)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(k.id);let I=e.getWorkOrders(),D=e.getPreventiveSchedules(),W=e.getParts(),x=e.getAssetParts(),b=e.getAssetPartsReady(),P=e.getAssetDocumentsByAssetId?.()[k.id]||[],E=e.getAssetDocumentsReady?.()!==!1,O=e.getAssetEventsReady?.()!==!1,$=e.getProfilesByUserId?.()||{},N=e.getPartsUsedByWorkOrder(),L=e.getLocations(),j=e.getActiveLocationId(),V=e.ASSET_TYPE_OPTIONS||[],Z=t(k),re=a(k.id),se=I.filter(M=>M.asset_id===k.id),J=se.filter(M=>M.status!=="completed").sort((M,ie)=>new Date(ie.created_at||0)-new Date(M.created_at||0)),ae=se.filter(M=>M.status==="completed").sort((M,ie)=>new Date(ie.completed_at||ie.created_at||0)-new Date(M.completed_at||M.created_at||0)),z=D.filter(M=>M.asset_id===k.id),fe=Object.values(N).flat().filter(M=>se.some(ie=>ie.id===M.work_order_id)),le=x.filter(M=>M.asset_id===k.id),T=new Set(le.map(M=>M.part_id)),B=W.filter(M=>!T.has(M.id)),G=(e.getAssetEventsByAssetId?.()[k.id]||[]).sort((M,ie)=>new Date(ie.created_at||0)-new Date(M.created_at||0)),{equipmentHistory:Y}=w(k,G,$),X=e.LIST_ITEMS_PER_PAGE||12,K=M=>e.getAssetRelationshipOpen?.(k.id,M)||!1,H=(M,ie)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(k.id,M)||1),Math.max(1,Math.ceil(ie/X))),ne=(M,ie)=>{let te=H(ie,M.length);return M.slice((te-1)*X,te*X)},ee=(M,ie)=>{if(ie<=X)return"";let te=H(M,ie),ge=Math.max(1,Math.ceil(ie/X)),ye=(te-1)*X+1,ce=Math.min(ie,te*X);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(k.id)}" data-asset-relation-section="${s(M)}" type="button" ${te<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${ce} of ${ie} - Page ${te} of ${ge}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(k.id)}" data-asset-relation-section="${s(M)}" type="button" ${te>=ge?"disabled":""}>Next</button>
          </div>
        `},de=M=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(M)}" data-asset-id="${s(k.id)}" ${K(M)?"open":""}`,oe=L.find(M=>M.id===k.location_id)?.name||k.location||"No location set",F=Z?Z.name:"Top level equipment",pe=k.status==="offline"?"status-blocked":k.status==="degraded"?"status-open":k.status==="watch"?"status-in_progress":"status-completed",he=k.status==="degraded"&&J.length===0,ue=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${k.status}">${s(u(k.status))}</span>
              <span class="chip">${s(p(k.asset_type))}</span>
              ${k.asset_code?`<span class="chip">${s(k.asset_code)}</span>`:""}
              ${k.asset_tag?`<span class="chip">Asset tag: ${s(k.asset_tag)}</span>`:""}
              ${k.manufacturer?`<span class="chip">${s(k.manufacturer)}</span>`:""}
              ${k.model?`<span class="chip">${s(k.model)}</span>`:""}
              ${k.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(k.name)}</h2>
            <p>${s(k.location||"No location set")}</p>
            ${Z?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(Z.id)}" type="button">${s(Z.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${pe}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(u(k.status))}</strong>
              <small>${k.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(oe)}</strong>
              <small>${k.location?s(k.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(F)}</strong>
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
              <button class="secondary-button" data-quick-fix-asset="${s(k.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${m?m():""}

          ${ue?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${k.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${P.length} file${P.length===1?"":"s"}</span>
            </div>
            ${ue?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(k.id)}">
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
              <p class="error-text" data-asset-document-error="${s(k.id)}">${E?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${E?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${P.map(M=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(M.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${s(M.signedUrl)}" alt="${s(M.original_file_name||M.file_name||k.name)}">`:`<strong>${s(R(M.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(R(M.document_type))}</strong>
                      <span>${s(M.original_file_name||M.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${s(M.signedUrl)}" alt="${s(M.original_file_name||M.file_name||k.name)}">`:`<div class="asset-file-document-preview">${s(R(M.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${s(M.content_type||"file")}</span>
                      <a class="secondary-button" href="${s(M.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${ue?`<button class="text-button danger-link" data-delete-asset-document="${s(M.id)}" data-asset-document-path="${s(M.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${ue?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${s(k.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(k.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${s(k.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(k.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(k.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${V.map(M=>`<option value="${M}" ${M===(k.asset_type||"machine")?"selected":""}>${p(M)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${r(k.parent_asset_id||"",k.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${L.length?"":"disabled"}>
                ${i(k.location_id||j)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${c(k.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(M=>`<option value="${M}" ${M===k.status?"selected":""}>${u(M)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${k.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${re.map(M=>`
                <article class="mini-work-order" data-open-asset="${s(M.id)}">
                  <strong>${s(M.name)}</strong>
                  <span>${s(p(M.asset_type))} - ${s(u(M.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${de("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${J.length}</span></summary>
            <div class="mini-list">
              ${K("open-work")?ne(J,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${K("open-work")?ee("open-work",J.length):""}
          </details>

          <details ${de("completed-history")}>
            <summary>Completed History <span>${ae.length}</span></summary>
            <div class="mini-list">
              ${K("completed-history")?ne(ae,"completed-history").map(f).join("")||'<p class="muted">No completed work yet.</p>':'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${K("completed-history")?ee("completed-history",ae.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${Y.length} event${Y.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(k.id)}" type="button">View Equipment History</button>
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
            ${ue?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(k.id)}">
              <input name="title" required placeholder="PM for ${s(k.name)}">
              <input name="asset_id" type="hidden" value="${s(k.id)}">
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
              ${z.map(M=>`<article><strong>${s(M.title)}</strong><span>${M.frequency} - next due ${M.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(k.id)}" ${K("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${le.length}</span></summary>
            <div class="panel-header compact">
              ${ue?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${b?`
              ${ue?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(k.id)}">
                <label>Part
                  <select name="part_id" ${B.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${B.map(M=>`<option value="${s(M.id)}">${s(M.name)}${M.sku?` - ${s(M.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${B.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${s(k.id)}"></p>
              <div class="mini-list">
                ${ne(le,"linked-parts").map(M=>`<article>
                  <strong>${s(M.parts?.name||"Part")}</strong>
                  <span>${s(M.parts?.sku||"No SKU")} - recommended qty ${s(M.quantity_recommended||1)}${M.note?` - ${s(M.note)}`:""}</span>
                  ${ue?`<button class="text-button danger-link" data-remove-asset-part="${s(M.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${ee("linked-parts",le.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(k.id)}" ${K("parts-used")?"open":""}>
            <summary>Parts Used History <span>${fe.length}</span></summary>
            <div class="mini-list">
              ${K("parts-used")?ne(fe,"parts-used").map(M=>`<article><strong>${s(M.parts?.name||"Part")}</strong><span>${M.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${K("parts-used")?ee("parts-used",fe.length):""}
          </details>

          ${ue?A(k):""}
        </div>
      `}function A(q){let _=e.getWorkOrders(),k=e.getPreventiveSchedules(),I=e.getAssets(),D=e.getActiveAssetId(),W=_.filter($=>$.asset_id===q.id).length,x=k.filter($=>$.asset_id===q.id).length,b=I.filter($=>$.parent_asset_id===q.id).length,P=e.getMaintenanceRequests().filter($=>$.asset_id===q.id).length,E=o({workOrders:W,children:b,schedules:x,requests:P}),O=e.getPendingDeleteAssetId()===D;return d()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${E||`This permanently removes "${s(q.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${E?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:O?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${s(q.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${s(q.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${s(q.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function R(q){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[q]||"File"}return{renderAssetDetail:C,renderAssetHistoryScreen:S}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createAssetDetailDisplayHelpers:l})})()});var Cn=U((Tr,bt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:a,statusLabel:s,workOrderTypeLabel:p=o=>String(o||"corrective").replace(/\b\w/g,d=>d.toUpperCase()),renderAssignmentSelect:r,renderProcedureOptions:i,escapeHtml:c}=e;function u(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getParts();return`
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
                  ${n.map(d=>`<option value="${d}" ${d==="open"?"selected":""}>${s(d)}</option>`).join("")}
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
                  ${t.map(d=>`<option value="${d}">${p(d)}</option>`).join("")}
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
                  ${r("",{selfLabel:"Assign to me"})}
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
                  ${o.map(d=>`<option value="${d.id}">${c(d.name)} (${d.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var $n=U((Ir,vt)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:a,escapeHtml:s,renderAssignmentSelect:p,renderProcedureOptions:r,assetStatusLabel:i,workOrderTypeLabel:c=o=>String(o||"corrective").replace(/\b\w/g,d=>d.toUpperCase())}=e;function u(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getQuickFixAssetId(),d=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),m=e.getSession(),h=e.getParts(),y=o||"",w=g.find(v=>v.id===d);return`
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${w?`<p class="completion-note">Resolving request: ${s(w.title)}</p>`:""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${s(w?.title||"")}"></label>
          <label>Description<textarea name="description" rows="3" placeholder="Describe what happened, where it happened, and what should be checked.">${s(w?.description||"")}</textarea></label>
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
                  ${t(y||w?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${s(a(y||w?.asset_id||""))}</p>
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
                  ${["medium","high","critical","low"].map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${n.map(v=>`<option value="${v}" ${v==="corrective"?"selected":""}>${c(v)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${p(m.user.id,{selfLabel:"Assign to me"})}
                </select>
              </label>
              <label>Procedure checklist
                <select name="procedure_template_id">
                  ${r()}
                </select>
              </label>
              <div class="form-section-title">Outcome / Notes</div>
              <label>What did you do?<textarea name="resolution_summary" rows="2" placeholder="Tightened mount, tested switch, line returned to normal."></textarea></label>
              <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="Loose mount, worn part, operator report, unknown..."></textarea></label>
            <label>Equipment status after fix
              <select name="asset_status">
                <option value="">Leave unchanged</option>
                  ${["running","watch","degraded","offline"].map(v=>`<option value="${v}">${i(v)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${h.map(v=>`<option value="${v.id}">${s(v.name)} (${v.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createQuickFixDisplayHelpers:l})})()});var Pn=U((Fr,kt)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(f){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${n(f)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `}function a(f){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${n(f)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `}function s(f,o=""){let d=f==="signup";return`
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${d?"Create Account":"Welcome Back"}</h1>
                <p>${d?"Start with email and password.":"Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${d?'<label>Full name<input name="fullName" required autocomplete="name"></label>':""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${d?"new-password":"current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${n(o)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${d?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${d?"I already have an account":"Create an account"}</button>
            ${d?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function p(f){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${n(f)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `}function r(f){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${n(f)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `}function i(f="",o=""){return`
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
            <p class="error-text" id="auth-error">${n(f)}</p>
            <p class="muted auth-status" id="auth-status">${n(o)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function c(f={}){let o=!!f.ready,d=f.initialError||"";return`
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
            <p class="error-text" id="auth-error">${n(d)}</p>
            <p class="muted auth-status" id="auth-status">${o?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${o?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function u(f=""){return`
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
            <p class="error-text" id="company-error">${n(f)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `}return{workspaceLoading:t,workspaceLoadError:a,authForm:s,authCallback:p,authCallbackError:r,passwordResetRequest:i,passwordRecovery:c,companyCreate:u}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof kt<"u"&&(kt.exports={createAuthDisplayHelpers:l})})()});var An=U((Lr,_t)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,a=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),p=e.getPublicRequestLinksReady||(()=>!0),r=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),c=e.canManageTeam||(()=>!1),u=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,o=e.publicRequestUrl,d=e.publicRequestQrUrl;function g(){return`
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
      `}function m(A,R){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(A.location_name)}</h1>
                <p>${n(A.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${t(R,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${n(R)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${n(R)}" target="_blank" rel="noreferrer">Test Form</a>
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
      `}function y(A){return`
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(A.company_name)}</h1>
                <p>${n(A.location_name)} maintenance request</p>
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
      `}function w(A){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${n(A)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function v(A,R=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(A.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${R?`<p class="error-text">${n(R)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function S(){if(!c())return"";let A=f(),R=a(),q=p();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${n(r()||String(i()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${A?`<p class="muted">QR codes will point to ${n(A)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${q?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${R.map(C).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function C(A){let R=s().find(W=>W.location_id===A.id),q=!!(R&&R.is_active!==!1),_=u(),k=q?o(R.token):"",I=q?d(R.token):"",D=!!(k&&I);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(A.name)}</strong>
            <span>${q?"External request link active":R?"Request link disabled":"No request link yet"}</span>
            ${R?.last_used_at?`<span>Last used ${new Date(R.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${q?`
            <div class="qr-preview">${D?t(k):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(I||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${D?"":"disabled-link"}" href="${n(I||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(I)}" type="button" ${D?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${D?"":"disabled-link"}" href="${n(k||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${_?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(R.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(R.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:R?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${_?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(R.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(R.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(A.id)}" type="button" ${p()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:m,loadingRequestForm:h,publicRequestForm:y,publicRequestError:w,publicRequestSuccess:v,publicRequestLinkManager:S,publicRequestLocationCard:C}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof _t<"u"&&(_t.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(c){return String(c||"").replace(/\/+$/,"")}function n(c=l.location,u=l.PUBLIC_APP_URL){if(u)return`${e(u)}/`;let f=c?.origin||"",o=c?.pathname||"/",g=o.indexOf("/auth/callback");if(g>=0)return`${f}${o.slice(0,g+1)}`;let m=o.endsWith("/")?o:o.replace(/[^/]*$/,"");return`${f}${m||"/"}`}function t(c=l.location,u=l.PUBLIC_APP_URL){return`${n(c,u)}auth/callback/`}function a(c={},u=l.location,f=l.PUBLIC_APP_URL){let o=new URL(n(u,f));return Object.entries(c).forEach(([d,g])=>{g!=null&&g!==""&&o.searchParams.set(d,g)}),o.href}function s(c){let u=new URL(c),f=new URLSearchParams(u.hash.replace(/^#/,"")),o=u.searchParams;return{code:o.get("code")||"",type:f.get("type")||o.get("type")||"",accessToken:f.get("access_token")||o.get("access_token")||"",refreshToken:f.get("refresh_token")||o.get("refresh_token")||"",error:f.get("error")||o.get("error")||"",errorCode:f.get("error_code")||o.get("error_code")||"",errorDescription:f.get("error_description")||o.get("error_description")||""}}function p(c){return!!(c?.code||c?.accessToken&&c?.refreshToken||c?.error||c?.errorDescription)}function r(c){return c?.type==="recovery"||!c?.type&&!!(c?.accessToken&&c?.refreshToken)}function i(c=l.location){let u=new URL(c.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>u.searchParams.delete(f)),u.hash="",u.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:a,authParamsFromHref:s,isAuthCallbackParams:p,isPasswordRecoveryParams:r,cleanAuthUrl:i}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l(q){return String(q||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(q){return q.toISOString().slice(0,10)}function n(q){return q.toISOString()}function t(q){let _=new Date;return _.setDate(_.getDate()-q),_}function a(){let q=new Date;return new Date(q.getFullYear(),q.getMonth(),1)}function s(q=new Date){let _=new Date(q);_.setHours(0,0,0,0),_.setDate(_.getDate()-_.getDay());let k=new Date(_);return k.setDate(k.getDate()+7),{start:_,end:k}}function p(q,_){let k=[];for(let I=0;I<q.length;I+=_)k.push(q.slice(I,I+_));return k}function r(q){return i(q).replace(/\.[^/.]+$/,"")||"photo"}function i(q){return String(q||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function c(q){return q==="active"||q==="all"?"Active":q==="overdue"?"Overdue":q==="completed"?"All Completed":q==="completed_month"?"Completed Month":q==="completed_week"?"Done This Week":q==="open"?"New":String(q||"").replaceAll("_"," ").replace(/\b\w/g,_=>_.toUpperCase())}function u(q){let _=String(q||"corrective").trim().toLowerCase();return _==="inspection"?"preventive":_==="reactive"||_==="request"?"corrective":["corrective","preventive","fabrication"].includes(_)?_:"corrective"}function f(q){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[u(q)]}function o(q){let _=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],k=String(q||"technician").trim().toLowerCase();return k==="member"?"technician":_.includes(k)?k:"technician"}function d(q){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[o(q)]||"Technician"}function g(q){let _={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return _[o(q)]||_.technician}function m(q){return new Date(`${q}T00:00:00`).toLocaleDateString()}function h(q){let _=[new Date(q.created_at).toLocaleString()];return q.file_size_bytes&&_.push(w(q.file_size_bytes)),q.original_size_bytes&&q.file_size_bytes&&q.original_size_bytes!==q.file_size_bytes&&_.push(`optimized from ${w(q.original_size_bytes)}`),_.join(" - ")}function y(q){let _=[];return(q.photo_uploaded_at||q.updated_at||q.created_at)&&_.push(new Date(q.photo_uploaded_at||q.updated_at||q.created_at).toLocaleString()),q.photo_file_size_bytes&&_.push(w(q.photo_file_size_bytes)),q.photo_original_size_bytes&&q.photo_file_size_bytes&&q.photo_original_size_bytes!==q.photo_file_size_bytes&&_.push(`optimized from ${w(q.photo_original_size_bytes)}`),_.join(" - ")||"Photo attached"}function w(q){let _=Number(q)||0;return _?_<1024?`${_} B`:_<1048576?`${Math.round(_/1024)} KB`:`${(_/1048576).toFixed(_>=10485760?0:1)} MB`:""}function v(q){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(q)||0)}function S(q){return Number(q.unit_cost_at_use??q.parts?.unit_cost??0)||0}function C(q){if(!q.due_at||q.status==="completed")return null;let _=new Date;_.setHours(0,0,0,0);let k=new Date(`${q.due_at}T00:00:00`),I=Math.round((k-_)/864e5);return I<0?{label:"overdue",className:"overdue"}:I===0?{label:"due today",className:"due_today"}:null}function A(){let q=new Date;return q.setHours(0,0,0,0),q}function R(q){return`"${String(q??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:a,sundayWeekRange:s,chunkArray:p,fileBaseName:r,safeFileName:i,statusLabel:c,normalizeWorkOrderType:u,workOrderTypeLabel:f,normalizeRole:o,roleLabel:d,roleDescription:g,formatDate:m,photoMetaText:h,requestPhotoMetaText:y,formatBytes:w,money:v,partUsageUnitCost:S,getDueState:C,startOfToday:A,csvCell:R})})();(function(){function l(s,p){let r=s?.message||"";return p.some(i=>r.includes(i))}function e(s,p){let r=s?.message||"";return r.includes(p)&&(r.includes("column")||r.includes("schema cache"))}function n(s){let p=s?.message||"";return p.includes("work_order_comments_company_author_profile_fkey")||p.includes("profiles")}function t(s){let p=s?.message||"";return!!(p.includes("procedure_template_id")||p.includes("procedure_templates")||p.includes("procedure_steps"))}function a(s){return l(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:a}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let a,s=new Promise((p,r)=>{a=setTimeout(()=>r(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var Vr=Q(St()),Hr=Q(Ct());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function a(f){return p(`?request=${encodeURIComponent(f)}`)}function s(f){return p(`?qr=${encodeURIComponent(f)}`)}function p(f){let o=r();if(!o)return"";let d=new URL(o);return d.search=f,d.hash="",d.toString()}function r(){let o=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return o?i(o):""}function i(f){try{let o=new URL(String(f||"").trim(),n.location.href);return o.protocol!=="https:"||!c(o.hostname)?"":(o.search="",o.hash="",o.pathname&&o.pathname!=="/"&&!o.pathname.endsWith("/")&&!o.pathname.endsWith(".html")&&(o.pathname=`${o.pathname}/`),o.toString())}catch{return""}}function c(f){let o=String(f||"").toLowerCase();return!(!o||o==="localhost"||o.endsWith(".localhost")||o==="127.0.0.1"||o==="::1"||o==="[::1]"||/^10\./.test(o)||/^192\.168\./.test(o)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(o))}function u(f,o=4){if(!n.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let d=n.qrcode(0,"M");return d.addData(f),d.make(),d.createSvgTag(o,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:s,publicAppUrlWithSearch:p,publicAppBaseUrl:r,normalizePublicAppUrl:i,isPublicAppHost:c,qrSvgFor:u}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),a=n.querySelector("#print-public-qr");!a||typeof t!="function"||a.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:l}})();var Zr=Q($t()),Xr=Q(Pt());(function(){function l(e){function n(c){return e[c]()}function t(c,u){return typeof e[c]=="function"?e[c]():u}function a(c){let u=n("searchQuery"),f=n("activeSection"),o=n("activeStatusFilter"),d=!!u.trim();return i(s(c,{statusFilter:d?"__any__":f==="work"&&o==="requests"?"__none__":o,section:f,includeQueue:!d,includeSearch:!0}))}function s(c,u={}){let f=u.section||n("activeSection"),o=c.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(o=o.eq("location_id",n("activeLocationId"))),u.includeQueue!==!1&&(o=p(o,f)),u.includeAttributeFilters!==!1&&f==="work"){let d=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");d!=="all"&&(o=o.eq("type",d)),g!=="all"&&(o=o.eq("priority",g))}if(o=r(o,u.statusFilter||n("activeStatusFilter")),u.includeSearch!==!1){let d=e.postgrestSearchTerm(n("searchQuery"));if(d){let g=n("workOrderRelatedSearch"),m=[`title.ilike.%${d}%`,`description.ilike.%${d}%`,`production_action.ilike.%${d}%`,`priority.ilike.%${d}%`,`type.ilike.%${d}%`,`status.ilike.%${d}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];o=o.or(m.join(","))}}return o}function p(c,u){if(u==="mywork"){let f=n("session").user.id;return n("myWorkFilter")==="created"?c.eq("created_by",f):c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}if(u!=="work")return c;if(n("workOrderAssigneeFilter")){let f=n("workOrderAssigneeFilter");return c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?c.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?c.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?c.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):c}function r(c,u){let f=e.isoDate(e.startOfToday());if(u==="__any__")return c;if(u==="__none__")return c.eq("id","00000000-0000-0000-0000-000000000000");if(u==="overdue")return c.neq("status","completed").lt("due_at",f);if(u==="completed_month")return c.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(u==="completed_week"){let o=e.sundayWeekRange();return c.gte("completed_at",e.isoDateTime(o.start)).lt("completed_at",e.isoDateTime(o.end))}return u==="active"||u==="all"?c.neq("status","completed"):c.eq("status",u)}function i(c){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?c.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?c.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?c.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?c.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?c.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):c.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:p,applyWorkOrderStatusFilter:r,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let s=n.querySelector(`#${a.dataset.jumpWorkSection}`);if(!s)return;let p=s.closest("details");p&&(p.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let r=s;r.classList.add("jump-highlight","field-jump-highlight"),t(()=>r.classList.remove("jump-highlight"),1400),t(()=>r.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.renderWorkspace,p=e.setWorkOrderSearchMode;if(!a||!s||!p)return;let r=()=>{a.setSearchQuery(""),p(!1),t.setItem("maintainops.searchQuery","")},i=c=>{a.setActiveSection(c),t.setItem("maintainops.activeSection",c)};n.querySelectorAll("[data-search-work-order]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveWorkOrderId(c.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),i("work"),r(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveAssetId(c.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),i("assets"),r(),s()})}),n.querySelectorAll("[data-search-part]").forEach(c=>{c.addEventListener("click",()=>{a.setActivePartId(c.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),i("parts"),r(),s()})}),n.querySelectorAll("[data-search-request]").forEach(c=>{c.addEventListener("click",()=>{i("requests"),r(),s()})}),n.querySelectorAll("[data-search-section]").forEach(c=>{c.addEventListener("click",()=>{i(c.dataset.searchSection),r(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(a={}){let s=a.documentRef||document,p=a.storage||localStorage,r=a.state,i=a.windowRef||(typeof window<"u"?window:null),c=a.setTimeoutRef||setTimeout,u=a.clearTimeoutRef||clearTimeout,f=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!r)return;let o=()=>{e+=1,l!==null&&(u(l),l=null)},d=m=>{m&&typeof i?.scrollTo=="function"&&i.scrollTo(m.x,m.y)},g=(m,h,y,w)=>{let v=s.getElementById?s.getElementById(m):s.querySelector(`#${m}`);if(!v)return;let S=v.value.length,C=Math.min(h??S,S),A=Math.min(y??C,S);v.focus({preventScroll:!0}),v.setSelectionRange(C,A),d(w)};s.querySelectorAll(".workspace-search-input").forEach(m=>{m.addEventListener("input",()=>{let h=m.id,y=m.selectionStart,w=m.selectionEnd;o();let v=e;r.setSearchQuery(m.value),a.invalidateExactWorkOrderSearchCache(),r.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),r.getSearchQuery().trim()&&(r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setQuickFixMode(!1),r.setCreateWorkOrderMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)),p.setItem("maintainops.searchQuery",r.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),l=c(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(v!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),v!==e))return;let S=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,C=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),A=!("activeElement"in s)||s.activeElement===C;a.renderWorkspace(),A?g(h,y,w,S):d(S)}),n),f)})}),s.querySelectorAll("[data-view-work-search]").forEach(m=>{m.addEventListener("click",async()=>{o(),r.setActiveSection("work"),r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),p.setItem("maintainops.activeSection",r.getActiveSection()),await a.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(m=>{m.addEventListener("click",async()=>{o(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}async function p(r){let i=Number(a?.scrollY??a?.pageYOffset??0);if(await r(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(r.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setMyWorkFilter(r.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setWorkOrderFilter(r.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{t.setActiveStatusFilter(r.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{let i=r.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{let i=r.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{t.setWorkOrderTypeFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{t.setWorkOrderPriorityFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setWorkSort(r.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{t.setWorkSort(r.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{t.setWorkGroup(r.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{t.setWorkOrderAssigneeFilter(r.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(r=>{r.addEventListener("click",async()=>{r.disabled||await p(async()=>{t.setRequestViewFilter(r.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(r.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setPartsPage(t.getPartsPage()+(r.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setAssetsPage(t.getAssetsPage()+(r.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{t.setFinancialPage(t.getFinancialPage()+(r.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(r=>{r.addEventListener("change",async()=>{await p(async()=>{r.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(r.value),r.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(r.value),r.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(r.value),r.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(r.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(r=>{r.addEventListener("click",async()=>{await p(async()=>{let i=r.dataset.pageDirection==="next"?1:-1;if(r.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(r.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),r.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),r.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),r.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),r.dataset.listPage?.startsWith("planning-")){let c=r.dataset.listPage.replace("planning-","");t.setPlanningPage(c,t.getPlanningPage(c)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(r=>{r.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(r.dataset.planningGroup,!!r.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.windowRef||(typeof window<"u"?window:null),p=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let r=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function i(w){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(w)}async function c(w){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([w])}function u(w){return w==="open-work"||w==="completed-history"||w==="parts-used"}function f(){e.renderWorkspace()}function o(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function d(){let w=n.querySelector("#work-order-photos-target");w&&("open"in w&&(w.open=!0),typeof w.scrollIntoView=="function"&&w.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(d);return}d()}let m=n.querySelector("#back-to-my-work");m&&m.addEventListener("click",async()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),o(),r(),typeof e.returnToWorkOrderQueue=="function"?await e.returnToWorkOrderQueue():e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),o(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(w=>{w.addEventListener("click",()=>{a.setActiveWorkOrderId(w.dataset.id),a.setActiveAssetId(null),o(),r(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(w=>{w.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),a.setActiveWorkOrderId(w.dataset.workPhotoJump),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(w=>{w.addEventListener("click",v=>{v.stopPropagation(),a.setActiveAssetId(w.dataset.openAsset),a.setActiveWorkOrderId(null),o(),r(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),p()})}),n.querySelectorAll(".asset-card[data-asset-id]").forEach(w=>{let v=()=>{a.setActiveAssetId(w.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),o(),r(),a.setReportIssueMode(!1),a.setActiveSection("assets"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),p()};w.addEventListener("click",v),w.addEventListener("keydown",S=>{S.key!=="Enter"&&S.key!==" "||(S.preventDefault(),v())})});let y=0;n.querySelectorAll("[data-mini-work-order]").forEach(w=>{w.addEventListener("click",async()=>{if(typeof e.openLinkedWorkOrder=="function"){let v=++y,S=()=>v===y&&w.isConnected!==!1;o();try{await e.openLinkedWorkOrder(w.dataset.miniWorkOrder,{isCurrent:S})&&p()}catch(C){S()&&e.showNotice?.(`Could not open work order: ${C.message||C}`,"warning")}return}a.setActiveWorkOrderId(w.dataset.miniWorkOrder),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),p()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(w=>{let v=w.open;w.addEventListener("toggle",async()=>{if(w.open===v)return;v=w.open;let S=w.dataset.assetId,C=w.dataset.assetRelationshipSection;if(!(!S||!C)&&(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(S,C,w.open),!!w.open)){if(u(C))await i(S);else if(C==="asset-history")await c(S);else return;w.isConnected===!1||!w.open||f()}})}),n.querySelectorAll("[data-asset-relation-page]").forEach(w=>{w.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let S=w.dataset.assetId,C=w.dataset.assetRelationSection,R=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(S,C):1)+(w.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(S,C,R),f()})}),n.querySelectorAll("[data-open-asset-history]").forEach(w=>{w.addEventListener("click",async v=>{v.preventDefault(),v.stopPropagation();let S=w.dataset.openAssetHistory;S&&(a.setActiveAssetId(S),a.setActiveWorkOrderId(null),r(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(S),await c(S),e.renderWorkspace(),p())})}),n.querySelectorAll("[data-back-asset-history]").forEach(w=>{w.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let S=w.dataset.backAssetHistory;S&&a.setActiveAssetId(S),o(),e.renderWorkspace(),p()})}),n.querySelectorAll("[data-asset-history-page]").forEach(w=>{w.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let S=w.dataset.assetId,A=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(S,"asset-history"):1)+(w.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(S,"asset-history",A),e.renderWorkspace(),p()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}function p(){let r=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(r));return}s(r)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(r=>{r.addEventListener("click",()=>{t.setPartInventoryFilter(r.dataset.partInventoryFilter),e.resetPartsPage(),p()})}),n.querySelectorAll("[data-part-sort]").forEach(r=>{r.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(r.value||"default"),e.resetPartsPage(),p())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(r=>{r.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===r.dataset.assetStatusFilter?"all":r.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),p()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(r=>{r.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===r.dataset.assetTypeFilter?"all":r.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),p()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(r=>{r.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(r.value||"all"),e.resetAssetsPage(),p())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(p){e.showNotice(`Could not update status: ${p.message||p}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",a=>a.stopPropagation()),t.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var la=Q(At()),ua=Q(Et());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let p=e.getWorkOrderById(s.dataset.id);if(!p)return;let r=s.dataset.copyDowntime==="subject",i=r?e.downtimeEmailSubject(p):e.downtimeEmailBody(p),c=await e.copyTextToClipboard(i);s.textContent=c?"Copied":"Copy failed",a(()=>{s.textContent=r?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var ma=Q(Rt());(function(){function l(e={}){let n=e.documentRef||document;function t(p){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(p),e.renderWorkspace()}async function a(p){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let r=e.getPhotoPathsByWorkOrder(p);if(r.length){let c=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(r),"Work order photo cleanup timed out.",15e3);c.error&&e.warnRef("Work order photo storage cleanup failed",c.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(p),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(r){e.alertRef(`Could not delete work order: ${r.message||r}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(p=>{p.addEventListener("click",r=>{r.stopPropagation(),t(p.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(p=>{p.addEventListener("click",r=>{r.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(p=>{p.addEventListener("click",async r=>{r.stopPropagation(),await a(p.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:a,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace;if(!t||typeof a!="function")return;let s=0;async function p(r){let i=++s,c=()=>i===s&&r.isConnected!==!1;try{if(e.loadPartDetail&&await e.loadPartDetail(r.dataset.openPart,{isCurrent:c})===!1||!c())return;t.setActivePartId(r.dataset.openPart),a()}catch(u){c()&&e.showNotice?.(`Could not open part: ${u.message||u}`,"warning")}}n.querySelectorAll("[data-open-part]").forEach(r=>{r.addEventListener("click",()=>p(r)),r.addEventListener("keydown",i=>{i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),p(r))})}),n.querySelectorAll("[data-close-part-detail]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setActivePartId(null),t.setShowPartSourceManager(!1),a()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setShowPartSourceManager(!t.getShowPartSourceManager()),a()})})}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.messageComposerScopeNote,p=e.autoGrowTextarea;if(!t||typeof a!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(f=>f.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(f=>f.addEventListener("click",()=>e.setMessageView?.(f.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(f=>f.addEventListener("click",()=>e.quoteMessage?.(f.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(f=>f.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async f=>{f.currentTarget.disabled=!0;let o=f.currentTarget;try{await e.loadOlderMessages?.()}finally{o.isConnected&&(o.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let o=f.dataset.messageFilter;t.setMessageThreadFilter(o),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageThreadFilter",o),r.setItem("maintainops.messageThreadsPage","1"),a()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(f.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),r.setItem("maintainops.activeSection","work"),a()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),r.setItem("maintainops.messageComposerWorkOrderId",""),a()});let c=n.querySelector("#message-search");c&&c.addEventListener("input",()=>{let f=c.value;t.setMessageSearchQuery(f),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageSearchQuery",f),r.setItem("maintainops.messageThreadsPage","1"),a();let o=n.querySelector("#message-search");o&&(o.focus({preventScroll:!0}),o.selectionStart!=null&&o.setSelectionRange(c.selectionStart,c.selectionEnd))});let u=n.querySelector("#message-thread-form");if(u){let f=u.querySelector("#message-thread-type"),o=u.querySelector(".message-direct-field"),d=u.querySelector("#message-scope-note");if(f&&o&&d&&typeof s=="function"){let g=()=>{let m=f.value==="direct";o.classList.toggle("hidden-section",!m);let h=o.querySelector("select");h&&(h.disabled=!m,h.required=m);let y=u.querySelector("[name='title']");y&&(y.required=!m),d.textContent=s(f.value),e.showExistingConversation?.(m?h?.value:"")};f.addEventListener("change",g),o.querySelector("select")?.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let o=n.querySelector("#message-thread-form");if(!o)return;let d=o.querySelector("details"),g=o.querySelector("#message-thread-type"),m=o.querySelector("select[name='direct_user_id']"),h=o.querySelector(".message-direct-field"),y=o.querySelector("#message-scope-note"),w=o.querySelector("input[name='title']");d&&(d.open=!0),g&&(g.value="direct"),m&&(m.value=f.dataset.messagePerson||"",m.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),w&&w.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let d=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!d)return;let g=d.value.trim();d.value=g?`${g}
${f.dataset.quickReply}`:f.dataset.quickReply,d.focus(),typeof p=="function"&&p(d)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof a!="function"||typeof s!="function")return;let p=n.querySelector("#part-search-form");if(!p)return;let r=c=>{t.setPartSearchQuery(c||""),s(),a()},i=p.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{r(i.value||"");let c=n.querySelector("#part-search");if(!c)return;c.focus();let u=c.value.length;c.setSelectionRange(u,u)}),p.addEventListener("submit",c=>{c.preventDefault();let u=e.FormDataRef||FormData,f=new u(p).get("part_search")||"";r(f),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(p=>{p.addEventListener("click",async()=>{let r=performance.now(),i=p.dataset.section;e.visibleNavItems().some(([c])=>c===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,r))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;async function s(p){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(p),e.getActiveThreadId&&e.getActiveThreadId()!==p||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(p),(!e.getActiveThreadId||e.getActiveThreadId()===p)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==p)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(p=>{p.addEventListener("click",async()=>{let r=p.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(r),a.setItem("maintainops.activeMessageThreadId",r),await s(r)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(p=>{p.addEventListener("click",async()=>{let r=p.dataset.openWorkMessageThread;t.setActiveMessageThreadId(r),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",r),a.setItem("maintainops.activeSection","messages"),await s(r)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let p=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(p),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",p),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",async()=>{if(t.disabled)return;t.disabled=!0;let a=t.textContent;t.textContent="Exporting...";try{await e.exportActiveSectionCsv()}finally{t.disabled=!1,t.textContent=a}})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var Aa=Q(Ot());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(a=>{l(a),a.addEventListener("input",()=>l(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var Ma=Q(Wt());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(p=>{p.addEventListener("click",async()=>{let r=await t(p.dataset.copyTeamInvite||"");p.textContent=r?"Copied":"Copy failed",a(()=>{p.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(p=>{p.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(p=>{p.addEventListener("click",()=>{t.setQuickFixAssetId(p.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var La=Q(xt());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(p=>{p.addEventListener("click",async()=>{let r=await t(p.dataset.copyPublicRequestLink);p.textContent=r?"Copied":"Copy failed",a(()=>{p.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ua=Q(Mt());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let p=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(a.dataset.createFollowUp,p?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var za=Q(Dt());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,a=n.querySelector("#comment-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,a=n.querySelector("#quick-update-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,a=n.querySelector("#edit-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{t(a),a.addEventListener("change",()=>t(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var Ja=Q(Tt()),Za=Q(It()),Xa=Q(Ft()),eo=Q(Lt()),to=Q(Nt()),no=Q(Ut()),ro=Q(Qt()),ao=Q(Bt()),oo=Q(jt()),io=Q(zt()),so=Q(Gt()),co=Q(Vt()),lo=Q(Ht()),uo=Q(Yt()),po=Q(Kt()),mo=Q(Jt()),fo=Q(Zt()),go=Q(Xt()),ho=Q(en()),yo=Q(tn()),wo=Q(nn()),bo=Q(rn()),vo=Q(an()),ko=Q(on()),_o=Q(sn());(function(){function l(e){function n(a){return e[a]()}function t(a,s=n("requestViewFilter")){let p=a.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(p=p.eq("location_id",n("activeLocationId"))),s==="converted"?p=p.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(p=p.eq("status","submitted").is("converted_work_order_id",null));let r=e.postgrestSearchTerm(n("searchQuery"));if(r){let i=`%${r}%`,c=n("assets").filter(e.matchesActiveLocation).filter(u=>e.matchesQuery([u.name,u.asset_code,u.asset_tag,u.manufacturer,u.model,u.location,u.status,u.asset_type,e.parentAssetFor()(u)?.name],r)).map(u=>u.id).slice(0,e.SEARCH_ID_PAGE_SIZE);p=p.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...c.length?[`asset_id.in.(${c.join(",")})`]:[]].join(","))}return p}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(d){return e[d]()}async function t(){let d=n("searchQuery").trim();if(!d||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(w=>e.matchesQuery([w.name,w.asset_code,w.asset_tag,w.manufacturer,w.model,w.location,w.status,w.asset_type,e.parentAssetFor()(w)?.name],d)).map(w=>w.id),m=n("procedureTemplates").filter(w=>e.matchesQuery([w.name,w.description,...(w.procedure_steps||[]).map(v=>v.prompt)],d)).map(w=>w.id),h=n("parts").filter(e.matchesActiveLocation).filter(w=>e.matchesQuery([w.name,w.sku,w.supplier_name,w.quantity_on_hand,w.reorder_point,w.unit_cost],d)).map(w=>w.id),y=new Set;await Promise.all([a(y,h),s(y,"work_order_comments",["body"],d),s(y,"work_order_events",["event_type","summary"],d),s(y,"work_order_photos",["file_name"],d),s(y,"work_order_step_results",["value"],d)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:m.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function a(d,g,m={}){if(!g.length)return;let y=m.maxRows??300;for(let w of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",w),v=>{v.forEach(S=>{S.work_order_id&&d.add(S.work_order_id)}),y-=v.length},y)}catch(v){e.warn("Part-linked work order search failed",v);return}}}async function s(d,g,m,h,y={}){let w=e.postgrestSearchTerm(h);if(!w)return;let v=m.map(C=>`${C}.ilike.%${w}%`).join(","),S=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(v),C=>{C.forEach(A=>{A.work_order_id&&d.add(A.work_order_id)})},S)}catch(C){e.warn(`${g} work order search failed`,C)}}async function p(d={}){let g=await r(),m=g.length,h=Math.max(1,Math.ceil(m/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,w=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(A=>A.id);if(!w.length)return{data:[],error:null,count:m};let v=d.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),S=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:v,ids:w});if(S.error)return S;let C=new Map((S.data||[]).map(A=>[A.id,A]));return{...S,data:w.map(A=>C.get(A)).filter(Boolean),count:m}}async function r(){let d=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===d)return g.rows;let m=n("searchQuery").trim(),h=new Map;await i(h,m);let y=n("assets").filter(e.matchesActiveLocation).filter(A=>e.matchesQuery([A.name,A.asset_code,A.asset_tag,A.manufacturer,A.model,A.location,A.status,A.asset_type,e.parentAssetFor()(A)?.name],m)).map(A=>A.id),w=n("procedureTemplates").filter(A=>e.matchesQuery([A.name,A.description,...(A.procedure_steps||[]).map(R=>R.prompt)],m)).map(A=>A.id),v=n("parts").filter(e.matchesActiveLocation).filter(A=>e.matchesQuery([A.name,A.sku,A.supplier_name,A.quantity_on_hand,A.reorder_point,A.unit_cost],m)).map(A=>A.id);await Promise.all([c(h,"asset_id",y),c(h,"procedure_template_id",w)]);let S=new Set;await Promise.all([a(S,v,{maxRows:1/0}),s(S,"work_order_comments",["body"],m,{maxRows:1/0}),s(S,"work_order_events",["event_type","summary"],m,{maxRows:1/0}),s(S,"work_order_photos",["file_name"],m,{maxRows:1/0}),s(S,"work_order_step_results",["value"],m,{maxRows:1/0})]),await u(h,[...S]);let C=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:d,rows:C}),C}async function i(d,g){let m=e.postgrestSearchTerm(g);if(!m)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${m}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),y=>o(d,y))}async function c(d,g,m){if(m.length)for(let h of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(g,h),y=>o(d,y))}async function u(d,g){if(g.length)for(let m of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",m),h=>o(d,h))}function f(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function o(d,g){(g||[]).forEach(m=>{m?.id&&d.set(m.id,{...d.get(m.id)||{},...m})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:p,exactWorkOrderSearchRows:r,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(r){return e[r]()}function t(){let r=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),c=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.asset_tag,g.manufacturer,g.model,g.location,g.status],r)).sort((g,m)=>g.name.localeCompare(m.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],r)).sort((g,m)=>g.name.localeCompare(m.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],r)).sort((g,m)=>new Date(m.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),o=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],r)).sort((g,m)=>String(g.next_due_at||"").localeCompare(String(m.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(m=>m.prompt)],r)).sort((g,m)=>g.name.localeCompare(m.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:c,parts:u,requests:f,pm:o,procedures:d}}function a(r="all"){let i=e.startOfToday(),c=new Date(i);return c.setDate(c.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(u=>u.status!=="completed").filter(u=>e.matchesSearch([u.title,u.description,u.priority,u.status,u.assets?.name,e.assignmentLabel(u)])).filter(u=>r==="no_due"?!u.due_at:!!u.due_at).map(u=>{let f=u.due_at?new Date(`${u.due_at}T00:00:00`):null;return{kind:r==="no_due"?"no_due":"work",id:u.id,title:u.title,priority:u.priority,status:u.status,assetName:u.assets?.name||"No equipment",dueAt:u.due_at,due:f,createdAt:u.created_at||"",assignedTo:e.assignmentLabel(u),workOrder:u}}).filter(u=>r==="no_due"?!0:r==="overdue"?u.due<i:r==="today"?u.due.getTime()===i.getTime():r==="soon"?u.due>i&&u.due<=c:!0).sort((u,f)=>{if(r==="no_due"){let o={critical:4,high:3,medium:2,low:1};return(o[f.priority]||0)-(o[u.priority]||0)||new Date(u.createdAt||0)-new Date(f.createdAt||0)}return u.due-f.due})}function s(){let r=e.startOfToday(),i=new Date(r);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(c=>{let u=new Date(`${c.next_due_at}T00:00:00`);return u>=r&&u<=i}).filter(c=>e.matchesSearch([c.title,c.frequency,c.next_due_at,c.assets?.name])).map(c=>({kind:"pm",id:c.id,title:c.title,assetName:c.assets?.name||"No equipment",dueAt:c.next_due_at,due:new Date(`${c.next_due_at}T00:00:00`)})).sort((c,u)=>c.due-u.due)}function p(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(r=>r.follow_up_needed).filter(r=>e.matchesSearch([r.title,r.description,r.failure_cause,r.resolution_summary,r.assets?.name,r.assigned_profile?.full_name])).map(r=>({kind:"follow_up",id:r.id,title:r.title,assetName:r.assets?.name||"No equipment",completedAt:r.completed_at?new Date(r.completed_at).toLocaleDateString():"not completed",resolution:r.resolution_summary||r.completion_notes||"",workOrder:r})).sort((r,i)=>r.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:a,planningPmItems:s,followUpItems:p}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,a){return n.from("locations").insert({company_id:t,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(p,r){return p.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",r)}function e(p,r){return p.from("company_members").select("*").eq("company_id",r).order("created_at",{ascending:!0})}function n(p,r){return p.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",r).order("created_at",{ascending:!1})}function t(p,r){return p.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",r).order("created_at",{ascending:!1})}function a(p,r){return p.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",r).order("created_at",{ascending:!1})}function s(p,r){return p.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",r).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:a,listRequestNotificationRecipients:s}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(i,c,u={}){return i.from("work_orders").select(c,u)}function e(i){return i.from("work_orders").select("id",{count:"exact",head:!0})}function n(i,c,u,f){return i.from("work_orders").select(f).eq("company_id",c).eq("id",u).maybeSingle()}function t(i,c,u,f){return i.from("work_orders").select(f).eq("company_id",c).eq("asset_id",u).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function a(i,c){let{companyId:u,locationId:f,locationsReady:o,selectClause:d,ids:g}=c,m=i.from("work_orders").select(d).eq("company_id",u).in("id",g);return o&&f&&(m=m.eq("location_id",f)),m}function s(i,c){let{companyId:u,locationId:f,locationsReady:o}=c,d=i.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",u);return o&&f&&(d=d.eq("location_id",f)),d}function p(i,c){let{companyId:u,locationId:f,locationsReady:o}=c,d=i.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",u).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return o&&f&&(d=d.eq("location_id",f)),d.order("id",{ascending:!0})}async function r(i,c,u=1/0,f=1e3){let o=0,d=0;for(;d<u;){let g=Math.min(f,u-d),{data:m,error:h}=await i().range(o,o+g-1);if(h)throw h;let y=m||[];if(c(y),d+=y.length,y.length<g)break;o+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:a,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:p,fetchPagedSearchRows:r}})();var Oo=Q(cn());(function(){function l(s){return s.rpc("get_my_companies")}function e(s,p){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",p).order("created_at",{ascending:!0})}function n(s,p){return s.from("company_members").select("company_id, role").eq("user_id",p).order("created_at",{ascending:!0})}function t(s,p){return s.from("companies").select("id, name, logo_path, created_at").in("id",p).order("created_at",{ascending:!0})}function a(s,p){return s.from("companies").select("id, name, created_at").in("id",p).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:a}})();(function(){function l(a,s){return a.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(a,s){return a.from("app_issue_reports").insert(s)}function n(a,s,p,r){return a.from("app_issue_reports").update({status:r,resolved_at:r==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",p)}function t(a,s,p){return a.from("app_issue_reports").delete().eq("company_id",s).eq("id",p)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,a){return t.from("user_preferences").select(l).eq("user_id",a).maybeSingle()}function n(t,a,s){return t.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Do=Q(ln()),To=Q(un()),Io=Q(dn()),Fo=Q(pn());(function(){function l(t,a,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${a}</strong></article>`}function e(t,a,s,p="neutral"){return`
    <article class="insight dashboard-card tone-${p}">
      <span>${t}</span>
      <strong>${a}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(r=>String(r||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),p=window.MaintainOpsDom?.escapeHtml||(r=>String(r??""));return`
    <section class="team-role-guide">
      ${t.map(r=>`
        <article>
          <strong>${a(r)}</strong>
          <span>${p(s(r))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var No=Q(mn());(function(){function l(f,o,d="active",g={},m){let h=m.getActiveStatusFilter(),y=g.filter||g.section,w=y?"button":"article",v=g.filter&&h===g.filter?" selected":"",S=d.includes("overdue")&&Number(o)>=3,C=S?" alert-blink":"",A=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),R=A?` ${A}`:"";return`
    <${w} class="gauge-readout ${d}${v}${C}"${R}>
      ${S?'<span class="gauge-alert-badge" aria-hidden="true">!</span>':""}
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
      <span>${m.escapeHtml(f)}</span>
    </${w}>
  `}function e(f){let o=f.getWorkOrderDashboardCounts()||{},d=o.activeWork||0,g=o.newWork||0,m=o.inProgress||0,h=o.blocked||0,y=o.overdue||0,w=o.completedAll||0,v=o.completedMonth||0,S=o.completedWeek||0,C=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",d,"active",{filter:"active"},f)}
      ${l("New",g,"new",{filter:"open"},f)}
      ${l("In Progress",m,"in_progress",{filter:"in_progress"},f)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${l("Overdue",y,"overdue",{filter:"overdue"},f)}
      ${l("Requests",C,"request",{filter:"requests"},f)}
      ${l("All Completed",w,"completed",{filter:"completed"},f)}
      ${l("Completed Month",v,"completed",{filter:"completed_month"},f)}
      ${l("Done This Week",S,"completed",{filter:"completed_week"},f)}
    </div>
  `}function n(f,o){let d=f||{},g=d.newWork||0,m=d.inProgress||0,h=d.blocked||0,y=d.activeWork??g+m+h,w=d.overdue||0,v=d.completedAll||0,S=d.completedMonth||0,C=d.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",y,"active workload-pill",{filter:"active"},o)}
      ${l("New",g,"new workload-pill",{filter:"open"},o)}
      ${l("In Progress",m,"in_progress workload-pill",{filter:"in_progress"},o)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},o)}
      ${l("Overdue",w,"overdue workload-pill",{filter:"overdue"},o)}
      ${l("All Completed",v,"completed workload-pill",{filter:"completed"},o)}
      ${l("Completed Month",S,"completed workload-pill",{filter:"completed_month"},o)}
      ${l("Done This Week",C,"completed workload-pill",{filter:"completed_week"},o)}
    </div>
  `}function t(f){return f.getWorkOrders().filter(o=>f.getDueState(o)?.className==="overdue")}function a(f){return f.getWorkOrders().filter(o=>s(o,f))}function s(f,o,d=new Date){if(!f.completed_at)return!1;let g=new Date(f.completed_at),m=o.sundayWeekRange(d);return Number.isFinite(g.getTime())&&g>=m.start&&g<m.end}function p(f){return f.getWorkOrders().filter(r)}function r(f){let o=new Date,d=new Date(o.getFullYear(),o.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=d)}function i(f){let o=f.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!o.length)return 0;let d=o.reduce((g,m)=>g+Number(m.actual_minutes||0),0);return Math.round(d/o.length)}function c(f){let o=new Date;o.setHours(0,0,0,0);let d=new Date(o);return d.setDate(d.getDate()+7),f.getPreventiveSchedules().filter(g=>{let m=new Date(`${g.next_due_at}T00:00:00`);return m>=o&&m<=d})}function u(f){return Object.freeze({renderGaugeReadout:(o,d,g="active",m={})=>l(o,d,g,m,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:o=>n(o,f),overdueWorkOrders:()=>t(f),completedThisWeek:()=>a(f),isCompletedThisWeek:(o,d)=>s(o,f,d),completedThisMonth:()=>p(f),isCompletedThisMonth:r,averageCompletionMinutes:(o=f.getWorkOrders())=>i(o),preventiveDueSoon:()=>c(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:u})})();(function(){function l(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:a,getPartInventoryFilter:s,assetTypeLabel:p,assetStatusLabel:r}){function i(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function c(){let f=n(),o=t?t():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${r(f).toLowerCase()} equipment found.`:o!=="all"?`No ${p(o).toLowerCase()} equipment found.`:"No equipment added yet."}function u(){return a().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:c,partEmptyStateText:u}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var zo=Q(fn());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:a,getSearchQuery:s}){function p(m){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(m)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${r("Work Orders",m.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${r("Equipment",m.assets,c,"asset")}
            ${r("Parts",m.parts,u,"parts")}
            ${r("Requests",m.requests,f,"comment")}
            ${r("PM",m.pm,o,"procedure")}
            ${r("Procedure Checklists",m.procedures,d,"procedure")}
          </div>
        </section>
      `}function r(m,h,y,w,v={}){return`
        <section class="global-result-group relationship-detail ${w}">
          <div class="panel-header compact">
            <h3>${e(m)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${v.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function i(m){return`
        <button class="global-result-item" data-search-work-order="${m.id}" type="button">
          <strong>${e(m.title)}</strong>
          <span>${n(m.status)} - ${e(m.assets?.name||"No equipment")} - ${e(t(m))}</span>
        </button>
      `}function c(m){return`
        <button class="global-result-item" data-search-asset="${m.id}" type="button">
          <strong>${e(m.name)}</strong>
          <span>${e(m.asset_code||"No serial")} - ${e(m.status)} - ${e(m.location||a())}</span>
          ${m.asset_tag?`<span>Asset tag: ${e(m.asset_tag)}</span>`:""}
        </button>
      `}function u(m){let h=Number(m.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${m.id}" type="button">
          <strong>${e(m.name)}</strong>
          <span>${e(m.sku||"No SKU")} - ${h} on hand${m.supplier_name?` - ${e(m.supplier_name)}`:""}</span>
        </button>
      `}function f(m){return`
        <button class="global-result-item" data-search-request="${m.id}" type="button">
          <strong>${e(m.title)}</strong>
          <span>${e(m.status)} - ${e(m.assets?.name||"No equipment")}</span>
        </button>
      `}function o(m){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(m.title)}" type="button">
          <strong>${e(m.title)}</strong>
          <span>${e(m.assets?.name||"No equipment")} - due ${e(m.next_due_at||"unset")}</span>
        </button>
      `}function d(m){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(m.name)}" type="button">
          <strong>${e(m.name)}</strong>
          <span>${(m.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(m){return Object.values(m).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:p,renderGlobalResultGroup:r,renderGlobalWorkResult:i,renderGlobalAssetResult:c,renderGlobalPartResult:u,renderGlobalRequestResult:f,renderGlobalPmResult:o,renderGlobalProcedureResult:d,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var Vo=Q(gn()),Ho=Q(hn()),Yo=Q(yn());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:a=(c,u)=>u,renderListPagination:s,statusLabel:p,renderRelationshipChips:r,canEditOperationalRecords:i=()=>!0}){function c(d,g,m,h,y={}){let w=n||12,v=typeof t=="function"?t(h):1,S=Math.max(1,Math.ceil(g.length/w)),C=Math.min(Math.max(v,1),S),A=g.slice((C-1)*w,C*w),R=a(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${R?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(d)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${m}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${A.map(o).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${h}`,g.length,C,S):""}
          </div>
        </details>
      `}function u(d,g,m,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(d)}</h3>
            <p>${e(g)}</p>
          </header>
          ${m}
        </section>
      `}function f(d){return`
        <div class="planning-grid">
          ${u("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${c("No Due Date",d.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${c("Follow-up Needed",d.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${u("Current schedule","Work requiring attention now.",`
            ${c("Overdue",d.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${c("Due Today",d.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${u("Upcoming","Near-term maintenance and preventive work.",`
            ${c("Next 7 Days",d.soon,"in_progress","soon")}
            ${c("PM Due Soon",d.pm,"open","pm")}
          `)}
        </div>
      `}function o(d){if(d.kind==="follow_up")return`
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${e(d.title)}</strong>
              <p>${e(d.assetName)} - completed ${e(d.completedAt)}</p>
              ${d.resolution?`<p>${e(d.resolution)}</p>`:""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${e(d.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${e(d.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;if(d.kind==="pm")return`
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${e(d.title)}</strong>
              <p>${e(d.assetName)} - due ${e(d.dueAt)}</p>
            </div>
            <button class="secondary-button" data-generate-pm="${d.id}" type="button">Generate Work</button>
          </article>
        `;if(d.kind==="no_due"){let g=d.createdAt?new Date(d.createdAt):null,m=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(d.priority)} ${e(p(d.status))}</span>
              <strong>${e(d.title)}</strong>
              <p>${e(d.assetName)} - ${e(d.assignedTo||"Unassigned")}</p>
              <p>Created ${e(m)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(d.id)}" type="button">Open Work Order</button>
              ${i()?`
                <form class="planning-due-form" data-planning-due-form="${e(d.id)}">
                  <label>Due date<input name="planning_due_at" type="date" required></label>
                  <button class="primary-button" type="submit">Set Due Date</button>
                </form>
              `:'<span class="muted planning-view-only">View only</span>'}
            </div>
          </article>
        `}return`
        <article class="planning-item mini-work-order" data-mini-work-order="${d.id}">
          <div>
            <span class="eyebrow">${e(d.priority)} ${e(p(d.status))}</span>
            <strong>${e(d.title)}</strong>
            <p>${e(d.assetName)} - due ${e(d.dueAt)}</p>
          </div>
          ${r(d.workOrder)}
        </article>
      `}return{renderPlanningGroup:c,renderPlanningBoard:f,renderPlanningItem:o}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var Jo=Q(wn());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:s,getPartsPage:p,getAssetsPage:r}){function i(o,d){if(o<=e)return"";let g=s(),m=(g-1)*e+1,h=Math.min(o,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${m}-${h} of ${o} - Page ${g} of ${d}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=d?"disabled":""}>Next</button>
        </div>
      `}function c(o,d){if(o<=n)return"";let g=p(),m=(g-1)*n+1,h=Math.min(o,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${m}-${h} of ${o} - Page ${g} of ${d}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=d?"disabled":""}>Next</button>
        </div>
      `}function u(o,d){if(o<=t)return"";let g=r(),m=(g-1)*t+1,h=Math.min(o,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${m}-${h} of ${o} - Page ${g} of ${d}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=d?"disabled":""}>Next</button>
        </div>
      `}function f(o,d,g,m){if(d<=a)return"";let h=(g-1)*a+1,y=Math.min(d,g*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${d} - Page ${g} of ${m}</span>
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="next" type="button" ${g>=m?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:c,renderAssetsPagination:u,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var Xo=Q(bn());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:a,matchesActiveLocation:s,isAssetDescendantOf:p,parentAssetFor:r}){function i(g=t()){return n().map(m=>`<option value="${m.id}" ${m.id===g?"selected":""}>${e(m.name)}</option>`).join("")}function c(g){let m=r(g);return m?`${g.name} - part of ${m.name}`:g.name}function u(g=""){let m=a().filter(s).sort((w,v)=>c(w).localeCompare(c(v))),h=g?a().find(w=>w.id===g):null;return(h&&!m.some(w=>w.id===h.id)?[h,...m]:m).map(w=>`<option value="${w.id}" ${w.id===g?"selected":""}>${e(c(w))}</option>`).join("")}function f(g="",m=""){return a().filter(s).filter(h=>h.id!==m&&!p(h.id,m)).sort((h,y)=>c(h).localeCompare(c(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(c(h))}</option>`).join("")}function o(g=""){let m=[...new Set(a().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,w)=>y.localeCompare(w)),h=String(g||"").trim();return h&&!m.includes(h)?[h,...m]:m}function d(g=""){return o(g).map(m=>`<option value="${e(m)}" ${m===g?"selected":""}>${e(m)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:u,renderParentAssetOptions:f,renderAssetAreaOptions:d,assetOptionLabel:c}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function a(s){if(!s.photo_storage_path)return"";let p=s.photo_file_name||s.photo_original_file_name||"Request photo",r=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(p)}">`:""}
          <div>
            <strong>${e(p)}</strong>
            <span>${e(r)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let a=n();return a>0?`<b class="nav-badge nav-message-badge" aria-label="${a} unread conversations and work alerts">${a}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(a){let s=Number(a);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(a){let s=e(a);return s?s>99?"99+":String(s):""}function t(a,s={}){let p=n(a);if(!p)return"";let r=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${r}">${p}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function a(s){let p=n()[s.reporter_id]?.full_name||"Team member",r=t().find(u=>u.id===s.location_id)?.name||"No location",i=s.status||"open",c=s.severity||"normal";return`
        <article class="issue-report-card issue-${i}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${c==="blocking"?"critical":c==="minor"?"completed":"open"}">${e(c)}</span>
              <span class="chip issue-status-chip issue-status-${i}">${e(i)}</span>
              <span>${e(r)}</span>
              <span>${s.created_at?new Date(s.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(s.title)}</strong>
            <p>${e(s.details||"")}</p>
            <small>${e(p)} - ${e(s.screen||"workspace")}</small>
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
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:a,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:p}){function r(c){let u=s()[c.id]||[],f=u[u.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(c.title)}</strong>
            <span>${e(t(c))}${f?` - ${e(n(f.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${c.id}" type="button">Open Thread</button>
        </article>
      `}function i(c){let u=a().filter(f=>f.work_order_id===c.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${c.id}" type="button">Message Team</button>
            ${p()?`
              <div class="work-linked-thread-list">
                ${u.map(r).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:i,renderLinkedWorkMessageThread:r}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:l}})();(function(){function l({escapeHtml:e,recommendedWorkOrderStep:n}){function t(a){let s=n(a);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(a,s,p,r,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${p}" type="button">
          <span>${e(a)}</span>
          <strong>${s}</strong>
          <small>${e(r)}</small>
        </button>
      `}function t(a){return a.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:p,getMessageThreads:r,getPartsUsedByWorkOrder:i}){function c(u){let f=r().filter(m=>m.work_order_id===u.id).length,o=(i()[u.id]||[]).reduce((m,h)=>m+(Number(h.quantity_used)||0),0),d=u.asset_id?s(u)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=u.status==="completed"?"Review history or create follow-up if needed":u.status==="blocked"?"Resolve blocker or add current update":u.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
          <button class="command-card safety-${d[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${d[0]}</strong>
            <small>${e(d[1])}</small>
          </button>
          ${p(u)}
        </section>
      `}return{renderWorkOrderCommandSummary:c}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:l}})();(function(){function l(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function a(){return`
        <datalist id="part-source-options">
          ${n().map(r=>`<option value="${e(r)}"></option>`).join("")}
        </datalist>
      `}function s(){let p=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${p.map(r=>`
                <form class="part-source-row" data-rename-part-source>
                  <input name="old_source" type="hidden" value="${e(r)}">
                  <span>${e(r)}</span>
                  <input name="new_source" list="part-source-options" value="${e(r)}" aria-label="New source name for ${e(r)}">
                  <button class="secondary-button" type="submit">Rename</button>
                </form>
              `).join("")||'<p class="muted">No sources have been added yet.</p>'}
            </div>
            <p class="error-text" id="part-source-error"></p>
          `:'<p class="error-text">Run supabase/step-next-part-suppliers.sql before editing sources.</p>'}
        </section>
      `}return{renderPartSourceOptions:a,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:a,parentAssetFor:s,childAssetsFor:p}){function r(i){let c=t().filter(o=>o.asset_id===i.id&&o.status!=="completed").length,u=s(i),f=p(i.id);return`
        <article class="asset-card asset-state-${i.status} ${i.id===a()?"selected":""}" data-asset-id="${i.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${i.status}">${e(i.status)}</span>
              <span class="chip">${e(n(i.asset_type))}</span>
              ${i.asset_code?`<span class="chip">${e(i.asset_code)}</span>`:""}
              ${i.asset_tag?`<span class="chip">Asset tag: ${e(i.asset_tag)}</span>`:""}
              ${i.manufacturer?`<span class="chip">${e(i.manufacturer)}</span>`:""}
              ${i.model?`<span class="chip">${e(i.model)}</span>`:""}
              ${i.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h3>${e(i.name)}</h3>
            <p>${e(i.location||"No location set")}</p>
            ${u?`<p>Part of ${e(u.name)}</p>`:""}
            ${f.length?`<p>${f.length} linked item${f.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${c} open work</span>
        </article>
      `}return{renderAssetCard:r}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function a(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(p=>`<option value="${p.id}" ${p.id===s?"selected":""}>${e(p.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function a(p){let r=n().filter(i=>i.thread_id===p.id).map(i=>t(i.user_id));return r.length?r.join(", "):"Direct message"}function s(p){return p.thread_type==="direct"?a(p):p.thread_type==="location"?`Company team / ${e().find(r=>r.id===p.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:a,unreadMessageCount:s,getMessagesByThreadId:p,getActiveMessageThreadId:r,threadTitle:i=c=>c.title}){function c(u){let o=(p()[u.id]||[]).filter(A=>!A.deleted_at),d=u.latest_message||o[o.length-1],g=s(u.id),m=i(u),h=String(m||"MO").trim().split(/\s+/).slice(0,2).map(A=>Array.from(A)[0]).join("").toUpperCase(),y=Math.abs([...String(m)].reduce((A,R)=>A*31+R.charCodeAt(0)|0,0))%6,w=d?.body?`${e(t(d.sender_id))}: ${e(d.body)}`:"Attachment",v=new Date(d?.created_at),S=v.toDateString()===new Date().toDateString(),C=d?S?v.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):n(d.created_at):"";return`
        <button class="message-thread-button ${u.id===r()?"active":""} ${g?"unread":""}" data-message-thread="${u.id}" aria-current="${u.id===r()?"true":"false"}" type="button">
          <span class="message-thread-avatar" data-tone="${y}" aria-hidden="true">${u.thread_type==="direct"?e(h):"#"}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${e(m)}</strong><time datetime="${e(d?.created_at||"")}" title="${e(d?n(d.created_at):"")}">${e(C)}</time></span>
          <span class="message-row-preview"><small>${d?w:"No messages yet"}</small>${g?`<span class="message-unread-pill" aria-label="${g} unread messages">${g}</span>`:""}</span>
          <span class="message-row-scope">${u.work_order_id?"Work order / ":""}${e(a(u))}${u.preferences?.muted?" / Muted":""}</span>
          </span>
        </button>
      `}return{renderMessageThreadButton:c}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var hi=Q(vn());(function(){function l({getLocations:e}){function n(t){let a=e().find(s=>s.id===t.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function a(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function a(s){let p=n(s),r=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),c=e.cleanWorkOrderDescription(s.description)||s.title,u=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${p} is down or needs maintenance attention. At this time, the expected downtime is ${r}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${c}`,`Work order: ${s.title}`,`Equipment: ${p}`,`Current update: ${u}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let a=t?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,p){let r=n(s);return p!==e.OUTSIDE_VENDOR_VALUE?r||null:[r,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(s,p){let r=String(s||"").trim();if(!p?.photo_storage_path)return r||null;let i="[Request photo attached to original request]";return r?`${r}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let a=[];return n.title!==t.title&&a.push("title"),(n.description||"")!==(t.description||"")&&a.push("description"),(n.due_at||"")!==(t.due_at||"")&&a.push("due date"),n.priority!==t.priority&&a.push("priority"),(n.type||"corrective")!==t.type&&a.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&a.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&a.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,a,s=[]){return[...n.map(p=>({...p,type:"comment"})),...t.map(p=>({...p,type:"photo"})),...s.map(p=>({...p,type:"part"})),...a.map(p=>({...p,type:"event"}))].sort((p,r)=>new Date(r.created_at)-new Date(p.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(r){return Number(r.quantity_on_hand)<=Number(r.reorder_point)}function t(){return e.getParts().filter(n)}function a(r){let i=e.getPartSearchQuery().trim().toLowerCase();return i?r.some(c=>String(c??"").toLowerCase().includes(i)):!0}function s(){let r=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:a([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...r].sort((i,c)=>{let u=String(i.supplier_name||"zzzzzz").localeCompare(String(c.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return u||String(i.name||"").localeCompare(String(c.name||""),void 0,{sensitivity:"base"})}):r}function p(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(r=>String(r.supplier_name||"").trim()).filter(Boolean))].sort((r,i)=>r.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:a,partSourceOptions:p}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function a(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,c=e.getRequestViewFilter()){return c==="converted"?a(i):c==="all"?!0:!a(i)&&i.status==="submitted"}function p(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(c=>t(c)&&s(c,i))}function r(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:a,requestMatchesViewFilter:s,filteredRequests:p,requestFilterCounts:r}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function n(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(p){return e.getAssets().find(r=>r.id===p?.parent_asset_id)||null}function t(p){return e.getAssets().filter(r=>r.parent_asset_id===p).sort((r,i)=>r.name.localeCompare(i.name))}function a(p,r){if(!p||!r)return!1;let i=e.getAssets().find(u=>u.id===p),c=new Set;for(;i?.parent_asset_id&&!c.has(i.id);){if(i.parent_asset_id===r)return!0;c.add(i.id),i=e.getAssets().find(u=>u.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(p=>!e.matchesActiveLocation(p)||e.getAssetStatusFilter()!=="all"&&p.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(p.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(p.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([p.name,p.asset_code,p.asset_tag,p.manufacturer,p.model,p.location,p.status,p.asset_type,n(p)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();var Wi=Q(kn());(function(){function l(e){function n(a){let s=e.getSearchQuery().trim().toLowerCase();return s?a.some(p=>String(p??"").toLowerCase().includes(s)):!0}function t(a,s=e.getSearchQuery()){let p=s.trim().toLowerCase();return p?a.some(r=>String(r??"").toLowerCase().includes(p)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(r){return r.due_at?new Date(`${r.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(r){return{low:1,medium:2,high:3,critical:4}[r]||0}function a(r){return r.completed_at?new Date(r.completed_at).getTime():0}function s(r){return typeof e.assignmentLabel=="function"?e.assignmentLabel(r):r.assigned_profile?.full_name||r.assigned_to||"Unassigned"}function p(r,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(i)-a(r)||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="due"?n(r)-n(i)||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(r.priority)||n(r)-n(i):e.getWorkSort()==="type"?String(r.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="assigned"?s(r).localeCompare(s(i))||new Date(i.created_at)-new Date(r.created_at):new Date(i.created_at)-new Date(r.created_at)}return{compareWorkOrders:p,dueSortValue:n,prioritySortValue:t,completedSortValue:a,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(a){return a?.location_id||a?.assets?.location_id||null}function t(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(a)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(c=>{let u=e.isConversationArchived?.(c)||!1;if(i==="archived")return u&&e.matchesQuery(a(c),e.getMessageSearchQuery());if(u)return!1;let f=i==="all"||i==="favorites"&&c.preferences?.favorite||i==="unread"&&s(c.id)>0||c.thread_type===i,o=e.getMessageSection?.()||"";return f&&(!o||c.preferences?.section_name===o)&&e.matchesQuery(a(c),e.getMessageSearchQuery())}).sort((c,u)=>+!!u.preferences?.favorite-+!!c.preferences?.favorite)}function a(i){let c=e.getMessageThreadMembers().filter(u=>u.thread_id===i.id).map(u=>e.teamMemberName(u.user_id));return[i.title,e.messageThreadScopeLabel(i),...c]}function s(i){let c=e.getMessageReadsByThreadId()[i]?.last_read_at,u=c?new Date(c).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(f=>f.deleted_at||f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>u).length}function p(){return e.getMessageThreads().filter(i=>!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}function r(){return e.getMessageThreads().filter(i=>i.thread_type==="direct"&&!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:a,unreadMessageCount:s,totalUnreadMessages:p,directUnreadMessages:r}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(t)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(t):a==="completed_week"?e.isCompletedThisWeek(t):a==="active"||a==="all"?t.status!=="completed":t.status===a}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],p=e.getEventsByWorkOrder()[t.id]||[],r=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(f=>f.id===t.procedure_template_id),c=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),u=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,u[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...a.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...s.flatMap(f=>[f.body,u[f.author_id]?.full_name]),...p.flatMap(f=>[f.event_type,f.summary,u[f.actor_id]?.full_name]),...r.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...c.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===t:e.isWorkOrderAssignedToUser(a,t))&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var Qi=Q(_n()),Bi=Q(qn()),ji=Q(Sn()),zi=Q(Cn()),Gi=Q($n()),Vi=Q(Pn()),Hi=Q(An());(function(){function l(t){if(!t)return"";let a=new Date(t),s=new Date,p=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),i=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r===p?`Today ${i}`:r===p-864e5?`Yesterday ${i}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let a=new Date(t),s=new Date,p=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return r===p?"Today":r===p-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let a=String(t||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();})();
//# sourceMappingURL=runtime.53a5f56ed1.js.map
