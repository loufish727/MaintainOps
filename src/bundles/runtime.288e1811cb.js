(()=>{var Dn=Object.create;var $t=Object.defineProperty;var Tn=Object.getOwnPropertyDescriptor;var In=Object.getOwnPropertyNames;var Fn=Object.getPrototypeOf,Ln=Object.prototype.hasOwnProperty;var U=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Nn=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of In(e))!Ln.call(l,a)&&a!==n&&$t(l,a,{get:()=>e[a],enumerable:!(t=Tn(e,a))||t.enumerable});return l};var Q=(l,e,n)=>(n=l!=null?Dn(Fn(l)):{},Nn(e||!l||!l.__esModule?$t(n,"default",{value:l,enumerable:!0}):n,l));var Ot=U((zn,Le)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,a=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},u=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),r=u(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:r,workspaceLoadPending:!1,workspaceLoadWasHidden:a?.visibilityState==="hidden",navigationStartedAt:u(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},c=new Map,d=0;function f(x){if(x==null||x==="")return null;let b=Number(x);return Number.isFinite(b)&&b>=0?b:null}function o(){let x=s.connection||s.mozConnection||s.webkitConnection,b=t?.matchMedia?.("(pointer: coarse)")?.matches,R=f(s.deviceMemory),W=f(s.hardwareConcurrency),O=R!==null&&R<=4||W!==null&&W<=4||b?"constrained":"standard",C=f(t?.innerWidth);return{source:"browser",device_tier:O,viewport_class:C!==null&&C<720?"mobile":C!==null&&C<1100?"tablet":"desktop",connection_type:String(x?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!x?.saveData}}function g(x={}){let b={...o(),measurement_version:n,...x};return Object.fromEntries(Object.entries(b).filter(([,R])=>R!=null&&R!==""))}function m(x=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},x))}function p(x,b,R={},W={}){if(!l.has(x))return!1;let O=f(b);if(O===null)return!1;let C=Number(O.toFixed(x==="cls"?4:2));return i.latest[x]={metric:x,value:C,unit:e[x],context:g(R),measuredAt:new Date().toISOString()},W.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:x,value:C,unit:e[x],context:g(R)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),m(W.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let x=i.companyId,b=i.pending.splice(0,20),R=null;try{R=(await i.client.rpc("record_app_performance_samples",{target_company_id:x,samples:b})).error||null}catch(O){R=O}if(!R)return i.pending.length&&m(1e3),!0;i.companyId===x&&i.pending.unshift(...b);let W=String(R.message||R).toLowerCase();return i.disabledUntil=Date.now()+(W.includes("could not find")||W.includes("does not exist")?3e5:6e4),!1}function w({client:x,companyId:b}){if(i.client=x||null,i.companyId=b||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,p("session_start",1,{source:"workspace"},{immediate:!0});let R=s.connection||s.mozConnection||s.webkitConnection;f(R?.downlink)!==null&&p("connection_downlink_mbps",R.downlink,{source:"browser-estimate"}),f(R?.rtt)!==null&&p("connection_rtt_ms",R.rtt,{source:"browser-estimate"})}m(250)}}function y(){i.workspaceStartedAt=u(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=a?.visibilityState==="hidden"}function _(x){if(!x)return;if(i.workspaceCompanies.has(x)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(x);let b=!i.workspaceLoadWasHidden&&a?.visibilityState!=="hidden";p("workspace_ready_ms",u()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:b}),i.workspaceLoadPending=!1,i.latest.cls||p("cls",d,{source:"performance-observer"},{persist:!1}),b&&t?.setTimeout?.(()=>$(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function $(x=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let b=new Set(x);Object.values(i.latest).filter(R=>b.has(R.metric)).forEach(R=>{let W=R.metric==="inp_ms";(W?i.lastPersistedInpValue===R.value:i.persistedVitals.has(R.metric))||p(R.metric,R.value,{source:"performance-observer"})&&(W?i.lastPersistedInpValue=R.value:i.persistedVitals.add(R.metric))})}function S(x=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,$(["inp_ms"])},x))}function P(){i.navigationStartedAt=u()}function q(x){let b=Number(x);return a?.visibilityState==="hidden"||Number.isFinite(b)&&i.lastHiddenAt>=b}function v(x,b=i.navigationStartedAt){p("section_navigation_ms",u()-b,{source:String(x||"workspace").slice(0,48)},{persist:!q(b)})}function k(x,b,R=null){p("query_latency_ms",u()-b,{source:String(x||"query").slice(0,48)},{persist:!q(b)}),R&&p("client_error",1,{source:`query:${String(x||"unknown").slice(0,36)}`},{immediate:!0})}function E(x={}){let b={source:"performance-room",quality_tier:x.qualityTier||"unknown"};Object.entries({spatial_ready_ms:x.readyMs,spatial_fps:x.fps,spatial_frame_ms:x.frameMs,spatial_slow_frame_pct:x.slowFramePercent,spatial_draw_calls:x.drawCalls,spatial_triangles:x.triangles,spatial_geometries:x.geometries,spatial_textures:x.textures,webgl_context_loss:Number(x.contextLosses)>0?x.contextLosses:void 0}).forEach(([R,W])=>{f(W)!==null&&p(R,W,b)}),m(500)}function A(){return{latest:{...i.latest},connection:o(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function D(x,b,R={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(x)))try{new PerformanceObserver(O=>b(O.getEntries())).observe({type:x,...R})}catch{}}D("paint",x=>{let b=x.find(R=>R.name==="first-contentful-paint");b&&p("fcp_ms",b.startTime,{source:"performance-observer"},{persist:!1})}),D("largest-contentful-paint",x=>{let b=x.at(-1);b&&p("lcp_ms",b.startTime,{source:"performance-observer"},{persist:!1})}),D("layout-shift",x=>{x.forEach(b=>{b.hadRecentInput||(d+=b.value)}),p("cls",d,{source:"performance-observer"},{persist:!1})}),D("event",x=>{x.forEach(R=>{R.interactionId&&c.set(R.interactionId,Math.max(c.get(R.interactionId)||0,R.duration))});let b=[...c.values()].sort((R,W)=>W-R);b.length&&(p("inp_ms",b[Math.min(Math.floor(b.length/50),10)],{source:"performance-observer"},{persist:!1}),S())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>p("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>p("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=u(),p("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&p("reconnect_ms",u()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),a?.addEventListener?.("visibilitychange",()=>{a.visibilityState==="hidden"&&(i.lastHiddenAt=u(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),$(),h())});let M={beginWorkspaceLoad:y,configure:w,flush:h,markNavigationStart:P,markWorkspaceReady:_,record:p,recordQueryLatency:k,recordSectionNavigation:v,recordSpatial:E,snapshot:A};typeof window<"u"&&(window.MaintainOpsAppTelemetry=M),typeof Le<"u"&&(Le.exports=M)})()});var Wt=U((Vn,Ne)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,a){let s=String(n||"");return!(!l(t)&&!l(a)||["TOKEN_REFRESHED","SIGNED_IN","INITIAL_SESSION"].includes(s)&&l(t)&&l(t)===l(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Ne<"u"&&(Ne.exports={shouldRenderForAuthEvent:e})})()});var xt=U((Hn,Ue)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(r,i,c){if(!r||!r.getItem)return c;let d=r.getItem(i);return d??c}function n(r,i){let c=Number(e(r,i,"1"));return Number.isFinite(c)&&c>0?c:1}function t(r,i,c){!r||!r.setItem||r.setItem(i,String(c))}function a(r,i){try{let c=JSON.parse(e(r,i,"{}"));return c&&typeof c=="object"&&!Array.isArray(c)?c:{}}catch{return{}}}function s(r,i){!r||!r.removeItem||r.removeItem(i)}function u(r={}){let i=r.storage||localStorage,c={activeSection:e(i,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,l.activeMessageThreadId,""),searchQuery:e(i,l.searchQuery,""),workOrderSearchMode:e(i,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,l.messageThreadFilter,"all"),messageThreadsPage:n(i,l.messageThreadsPage),messageSearchQuery:e(i,l.messageSearchQuery,""),messageComposerWorkOrderId:e(i,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,l.managerDashboardUserId,""),managerDashboardMetric:e(i,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,l.myWorkFilter,"assigned"),workOrderFilter:e(i,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,l.workOrderPriorityFilter,"all"),workSort:e(i,l.workSort,"newest"),workGroup:e(i,l.workGroup,"none"),requestViewFilter:e(i,l.requestViewFilter,"active"),workOrderPage:n(i,l.workOrderPage),partsPage:n(i,l.partsPage),assetsPage:n(i,l.assetsPage),financialPage:n(i,l.financialPage),financialMissingFilter:e(i,l.financialMissingFilter,"all"),financialLocationFilter:e(i,l.financialLocationFilter,"all"),financialTypeFilter:e(i,l.financialTypeFilter,"all"),financialAreaFilter:e(i,l.financialAreaFilter,"all"),requestsPage:n(i,l.requestsPage),planningOverduePage:n(i,l.planningOverduePage),planningTodayPage:n(i,l.planningTodayPage),planningSoonPage:n(i,l.planningSoonPage),planningNoDuePage:n(i,l.planningNoDuePage),planningFollowUpPage:n(i,l.planningFollowUpPage),planningPmPage:n(i,l.planningPmPage),planningGroupOpen:a(i,l.planningGroupOpen),schedulesPage:n(i,l.schedulesPage),proceduresPage:n(i,l.proceduresPage),membersPage:n(i,l.membersPage),assetStatusFilter:e(i,l.assetStatusFilter,"all"),assetTypeFilter:e(i,l.assetTypeFilter,"all"),assetAreaFilter:e(i,l.assetAreaFilter,"all"),partInventoryFilter:e(i,l.partInventoryFilter,"all"),partSort:e(i,l.partSort,"default"),partSearchQuery:e(i,l.partSearchQuery,"")};e(i,l.sectionSplitDone,"")!=="true"&&c.activeSection==="work"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection),t(i,l.sectionSplitDone,"true")),c.activeSection==="performance"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection));let d=(o,g,m)=>{c[o]=g,m&&t(i,m,g)},f=(o,g)=>{d(o,1,g)};return{getActiveSection:()=>c.activeSection,setActiveSection:o=>d("activeSection",o,l.activeSection),getActiveWorkOrderId:()=>c.activeWorkOrderId,setActiveWorkOrderId:o=>d("activeWorkOrderId",o),getActiveAssetId:()=>c.activeAssetId,setActiveAssetId:o=>d("activeAssetId",o),getActivePartId:()=>c.activePartId,setActivePartId:o=>d("activePartId",o),getActiveMessageThreadId:()=>c.activeMessageThreadId,setActiveMessageThreadId:o=>d("activeMessageThreadId",o,l.activeMessageThreadId),getMessageThreadFilter:()=>c.messageThreadFilter,setMessageThreadFilter:o=>d("messageThreadFilter",o,l.messageThreadFilter),getMessageThreadsPage:()=>c.messageThreadsPage,setMessageThreadsPage:o=>d("messageThreadsPage",o,l.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>c.messageSearchQuery,setMessageSearchQuery:o=>d("messageSearchQuery",o,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>c.messageComposerWorkOrderId,setMessageComposerWorkOrderId:o=>d("messageComposerWorkOrderId",o,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>c.messageComposerOpen,setMessageComposerOpen:o=>d("messageComposerOpen",!!o),getManagerDashboardUserId:()=>c.managerDashboardUserId,setManagerDashboardUserId:o=>d("managerDashboardUserId",o||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>c.managerDashboardMetric,setManagerDashboardMetric:o=>d("managerDashboardMetric",o||"open",l.managerDashboardMetric),getSearchQuery:()=>c.searchQuery,setSearchQuery:o=>d("searchQuery",o,l.searchQuery),getWorkOrderSearchMode:()=>c.workOrderSearchMode,setWorkOrderSearchMode:o=>d("workOrderSearchMode",!!o,l.workOrderSearchMode),getActiveStatusFilter:()=>c.activeStatusFilter,setActiveStatusFilter:o=>d("activeStatusFilter",o),getMyWorkFilter:()=>c.myWorkFilter,setMyWorkFilter:o=>d("myWorkFilter",o,l.myWorkFilter),getWorkOrderFilter:()=>c.workOrderFilter,setWorkOrderFilter:o=>d("workOrderFilter",o,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>c.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:o=>{d("workOrderAssigneeFilter",o),o?t(i,l.workOrderAssigneeFilter,o):s(i,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>c.workOrderTypeFilter,setWorkOrderTypeFilter:o=>d("workOrderTypeFilter",o||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>c.workOrderPriorityFilter,setWorkOrderPriorityFilter:o=>d("workOrderPriorityFilter",o||"all",l.workOrderPriorityFilter),getWorkSort:()=>c.workSort,setWorkSort:o=>d("workSort",o,l.workSort),getWorkGroup:()=>c.workGroup,setWorkGroup:o=>d("workGroup",o||"none",l.workGroup),getRequestViewFilter:()=>c.requestViewFilter,setRequestViewFilter:o=>d("requestViewFilter",o,l.requestViewFilter),getWorkOrderPage:()=>c.workOrderPage,setWorkOrderPage:o=>d("workOrderPage",o,l.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",l.workOrderPage),getPartsPage:()=>c.partsPage,setPartsPage:o=>d("partsPage",o,l.partsPage),resetPartsPage:()=>f("partsPage",l.partsPage),getAssetsPage:()=>c.assetsPage,setAssetsPage:o=>d("assetsPage",o,l.assetsPage),resetAssetsPage:()=>f("assetsPage",l.assetsPage),getFinancialPage:()=>c.financialPage,setFinancialPage:o=>d("financialPage",o,l.financialPage),resetFinancialPage:()=>f("financialPage",l.financialPage),getFinancialMissingFilter:()=>c.financialMissingFilter,setFinancialMissingFilter:o=>d("financialMissingFilter",o||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>c.financialLocationFilter,setFinancialLocationFilter:o=>d("financialLocationFilter",o||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>c.financialTypeFilter,setFinancialTypeFilter:o=>d("financialTypeFilter",o||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>c.financialAreaFilter,setFinancialAreaFilter:o=>d("financialAreaFilter",o||"all",l.financialAreaFilter),getRequestsPage:()=>c.requestsPage,setRequestsPage:o=>d("requestsPage",o,l.requestsPage),resetRequestsPage:()=>f("requestsPage",l.requestsPage),getPlanningPage:o=>o==="overdue"?c.planningOverduePage:o==="today"?c.planningTodayPage:o==="soon"?c.planningSoonPage:o==="no-due"?c.planningNoDuePage:o==="follow-up"?c.planningFollowUpPage:o==="pm"?c.planningPmPage:1,setPlanningPage:(o,g)=>{o==="overdue"&&d("planningOverduePage",g,l.planningOverduePage),o==="today"&&d("planningTodayPage",g,l.planningTodayPage),o==="soon"&&d("planningSoonPage",g,l.planningSoonPage),o==="no-due"&&d("planningNoDuePage",g,l.planningNoDuePage),o==="follow-up"&&d("planningFollowUpPage",g,l.planningFollowUpPage),o==="pm"&&d("planningPmPage",g,l.planningPmPage)},getPlanningGroupOpen:(o,g=!1)=>Object.prototype.hasOwnProperty.call(c.planningGroupOpen,o)?!!c.planningGroupOpen[o]:!!g,setPlanningGroupOpen:(o,g)=>{c.planningGroupOpen={...c.planningGroupOpen,[o]:!!g},t(i,l.planningGroupOpen,JSON.stringify(c.planningGroupOpen))},getSchedulesPage:()=>c.schedulesPage,setSchedulesPage:o=>d("schedulesPage",o,l.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",l.schedulesPage),getProceduresPage:()=>c.proceduresPage,setProceduresPage:o=>d("proceduresPage",o,l.proceduresPage),resetProceduresPage:()=>f("proceduresPage",l.proceduresPage),getMembersPage:()=>c.membersPage,setMembersPage:o=>d("membersPage",o,l.membersPage),resetMembersPage:()=>f("membersPage",l.membersPage),getAssetStatusFilter:()=>c.assetStatusFilter,setAssetStatusFilter:o=>d("assetStatusFilter",o,l.assetStatusFilter),getAssetTypeFilter:()=>c.assetTypeFilter,setAssetTypeFilter:o=>d("assetTypeFilter",o,l.assetTypeFilter),getAssetAreaFilter:()=>c.assetAreaFilter,setAssetAreaFilter:o=>d("assetAreaFilter",o,l.assetAreaFilter),getPartInventoryFilter:()=>c.partInventoryFilter,setPartInventoryFilter:o=>d("partInventoryFilter",o,l.partInventoryFilter),getPartSort:()=>c.partSort,setPartSort:o=>d("partSort",o||"default",l.partSort),getPartSearchQuery:()=>c.partSearchQuery,setPartSearchQuery:o=>d("partSearchQuery",o,l.partSearchQuery),snapshot:()=>({...c})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:u},typeof Ue<"u"&&(Ue.exports={createWorkspaceUiState:u})})()});var Mt=U((Gn,_e)=>{(function(){function l(a){return!!String(a?.production_action||"").trim()}function e(a){return l(a)&&a?.production_action_status==="open"}function n(a,s){return!a||!s?!1:a.assigned_to===s||e(a)&&a.production_action_assigned_to===s}function t(a){return e(a)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof _e<"u"&&_e.exports&&(_e.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var Dt=U((Yn,qe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",a=>a.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof qe<"u"&&qe.exports&&(qe.exports={bindWorkspaceProductionActionEvents:l})})()});var Tt=U((Kn,Qe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:l},typeof Qe<"u"&&(Qe.exports={bindWorkspaceWorkOrderNotificationEvents:l})})()});var It=U((Jn,Se)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData,a=new Set;function s(c){return e.getActiveWorkOrderId()!==c?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(d=>d.checked)}function u(c){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.checked=c.target.checked})}async function r(c){c.preventDefault();let d=c.target,f=d.querySelector("button[type='submit']"),o=n.querySelector("#completion-error"),g=e.getActiveWorkOrderId(),m=e.getWorkOrderById(g),p=e.getScope?.(),h=()=>e.getScope?.()===p;if(!m||a.has(g))return;let w=e.blocksProcedureCompletion?.(m);if(w){o&&(o.textContent=w);return}let y=e.getProcedureById(m?.procedure_template_id),_=y?e.requiredChecklistProgress(m,y):{done:0,total:0},$=e.productionActionCompletionMessage?.(m)||"";if($){o&&(o.textContent=$),e.setWorkOrderActionWarning(g,$),e.showNotice($,"warning");return}if(_.done<_.total){o&&(o.textContent=`Complete required checklist steps first (${_.done}/${_.total}).`);return}let S=new t(d),P=S.get("safety_devices_checked")==="on"||s(g)||e.hasCompletedSafetyDeviceCheck(m);if(e.requiresSafetyDeviceCheck(m)&&!P){o&&(o.textContent="Check safety devices before completing equipment work.");return}f.disabled=!0,a.add(g),f.textContent="Completing...",o&&(o.textContent="");let q=!1;try{let v={status:"completed",asset_id:m?.asset_id||null,actual_minutes:Number(S.get("actual_minutes"))||0,failure_cause:S.get("failure_cause")||null,resolution_summary:S.get("resolution_summary")||null,follow_up_needed:S.get("follow_up_needed")==="on",completion_notes:S.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(v),e.applySafetyCheckPayload(v,v.safety_check_required&&P),delete v.asset_id;let{error:k}=await e.withOperationTimeout(e.updateWorkOrderSafely(v,g),"Complete work save timed out. Check your connection and try again.",2e4);if(!h())return;if(k){o&&(o.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(k)}`);return}q=!0;let E;try{let A=await e.withOperationTimeout(e.recordWorkOrderEvent(g,"completed",S.get("resolution_summary")||S.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3);E=A?.error||(A instanceof Error?A:null)}catch(A){E=A}if(!h())return;e.setWorkOrderActionWarning("",""),e.showNotice(E?`Work order completed, but history did not update: ${E.message||E}`:"Work order completed.",E?"warning":"success"),await e.render()}catch(v){h()&&(q?e.showNotice(`Work order completed, but the screen could not update: ${v.message||v}`,"warning"):o?o.textContent=`Could not complete work order: ${v.message||v}`:e.alertRef(v.message||v))}finally{a.delete(g),f.disabled=!1,f.textContent="Complete Work Order"}}function i(){let c=n.querySelector("#complete-work-order-form");c&&c.addEventListener("submit",r),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.addEventListener("change",u)})}return{bindWorkspaceWorkOrderCompletionEvents:i,completeWorkOrder:r,currentSafetyCheckboxCheckedForWorkOrder:s,syncSafetyDeviceChecks:u}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof Se<"u"&&Se.exports&&(Se.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var Ft=U((Zn,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,a=e.BlobCtor||Blob,s=e.alertRef||alert,u=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,r=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:k=>String(k||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:k=>String(k||"corrective").replaceAll("_"," "),c={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function d(k){return(e.getAssetDocumentsByAssetId?.()[k]||[]).filter(E=>String(E.content_type||"").startsWith("image/")||E.document_type==="machine_photo"||E.document_type==="nameplate")}function f(k){return d(k).map(E=>E.original_file_name||E.file_name||E.storage_path||E.id).filter(Boolean).join("; ")}function o(k,E){return k?.parent_asset_id&&E.get(k.parent_asset_id)?.name||""}function g(k){return e.getLocations?.().find(E=>E.id===k)?.name||""}function m(k){if(!k)return"";let E=e.getProfilesByUserId?.()[k];return E?.full_name||E?.email||k}function p(k){return String(g(k.location_id)||k.location_id||k.location||"")}function h(k){return{id:`financial:${k.id}`,financialRecord:k,name:k.archived_asset_name||"Deleted equipment",asset_type:k.archived_asset_type||"machine",asset_code:k.archived_asset_code||"",asset_tag:k.archived_asset_tag||"",manufacturer:k.archived_manufacturer||"",model:k.archived_model||"",location_id:k.archived_location_id||"",location:k.archived_location||"",status:"deleted"}}function w(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(k=>!k.asset_id).map(h)]}function y(k,E,A){let D=p(k).localeCompare(p(E));if(D)return D;let M=(c[k.asset_type||"machine"]||999)-(c[E.asset_type||"machine"]||999);return M||String(o(k,A)).localeCompare(String(o(E,A)))||String(k.location||"").localeCompare(String(E.location||""))||String(k.name||"").localeCompare(String(E.name||""))}function _(){let k=e.getAssets().filter(u),E=new Map(k.map(A=>[A.id,A]));return[...k].sort((A,D)=>y(A,D,E)).map(A=>({equipment_type:r(A.asset_type),name:A.name,parent_equipment:o(A,E),serial_number:A.asset_code||"",asset_tag:A.asset_tag||"",manufacturer:A.manufacturer||"",model:A.model||"",picture_id:f(A.id),picture_count:d(A.id).length,picture_status:d(A.id).length?"attached":"missing",facility:g(A.location_id)||A.location_id||"",area_department:A.location||"",status:A.status}))}function $(){let k=w(),E=new Map(k.map(D=>[D.id,D])),A=e.getAssetFinancialsByAssetId?.()||{};return[...k].sort((D,M)=>y(D,M,E)).map(D=>{let M=D.financialRecord||A[D.id]||{};return{operational_status:D.financialRecord?"deleted":"active",equipment_type:r(D.asset_type),name:D.name,parent_equipment:o(D,E),facility:g(D.location_id)||D.location_id||"",area_department:D.location||"",serial_number:D.asset_code||"",equipment_asset_tag:D.asset_tag||"",manufacturer:D.manufacturer||"",model:D.model||"",picture_status:d(D.id).length?"attached":"missing",asset_tag:M.asset_tag||"",acquisition_date:M.acquisition_date||"",acquisition_cost:M.acquisition_cost||"",depreciation_method:M.depreciation_method||"",useful_life_years:M.useful_life_years||"",current_book_value:M.current_book_value||"",tax_jurisdiction:M.tax_jurisdiction||"",ownership_status:M.ownership_status||"",in_service_date:M.in_service_date||"",disposal_date:M.disposal_date||"",disposal_notes:M.disposal_notes||"",gl_account_code:M.gl_account_code||"",cost_center:M.cost_center||"",finance_notes:M.finance_notes||"",needs_review:!!M.needs_review,last_reviewed_at:M.last_reviewed_at||"",reviewed_by:m(M.reviewed_by)}})}async function S(k){let E=e.getExportScope(),A=e.createExportQuery(k),D=[],M;try{for(;D.length<1e5;){let x=await e.withOperationTimeout(A.range(D.length,D.length+499),"Export timed out. Try again.",2e4);if(x.error)throw x.error;if(e.getExportScope()!==E)throw new Error("Workspace changed. Export again from the intended location.");if(!Number.isInteger(x.count))throw new Error("Export could not verify the total record count.");if(M!==void 0&&M!==x.count)throw new Error("Records changed during export. Try again.");if(M=x.count,D.push(...x.data||[]),new Set(D.map(b=>b.id)).size!==D.length)throw new Error("Records moved during export. Try again.");if(D.length===M)return q(k,D);if(!x.data?.length||D.length>M)throw new Error("Export returned an incomplete list. Try again.")}throw new Error("Export exceeds 100,000 records. Narrow the filters and try again.")}catch(x){s(`Could not export: ${x.message||x}`)}}function P(){let k=e.getActiveSection();return e.createExportQuery&&["work","mywork","requests"].includes(k)?S(k):q(k)}function q(k,E){let A={work:{filename:"work-orders.csv",rows:(E&&k!=="requests"?E:e.getWorkOrders()).map(M=>({title:M.title,status:M.status,priority:M.priority,type:i(M.type),equipment:M.assets?.name||"",assigned_to:e.assignmentLabel(M),due_at:M.due_at||"",completed_at:M.completed_at||"",actual_minutes:M.actual_minutes||0,failure_cause:M.failure_cause||"",resolution_summary:M.resolution_summary||"",follow_up_needed:!!M.follow_up_needed}))},assets:{filename:"equipment.csv",rows:_()},financial:{filename:"equipment-financial.csv",rows:$()},requests:{filename:"maintenance-requests.csv",rows:(E&&k==="requests"?E:e.getMaintenanceRequests()).map(M=>({title:M.title,status:M.status,priority:M.priority,equipment:M.assets?.name||"",requested_by:e.getProfilesByUserId()[M.requested_by]?.full_name||"",created_at:M.created_at||"",converted_work_order_id:M.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(M=>({title:M.title,equipment:M.assets?.name||"",frequency:M.frequency,next_due_at:M.next_due_at,active:M.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(M=>({name:M.name,sku:M.sku||"",supplier_name:M.supplier_name||"",quantity_on_hand:M.quantity_on_hand,reorder_point:M.reorder_point,unit_cost:M.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(M=>({name:M.name,description:M.description||"",steps:M.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(M=>({user_id:M.user_id,name:e.getProfilesByUserId()[M.user_id]?.full_name||"",role:M.role}))}},D=A[k]||A.work;if(!D.rows.length)return s("Nothing to export in this section yet.");v(D.filename,D.rows)}function v(k,E){let A=Object.keys(E[0]),D=[A.join(","),...E.map(R=>A.map(W=>e.csvCell(R[W])).join(","))],M=new a([`\uFEFF${D.join(`
`)}`],{type:"text/csv;charset=utf-8"}),x=t.createObjectURL(M),b=n.createElement("a");b.href=x,b.download=k,n.body.appendChild(b),b.click(),b.remove(),t.revokeObjectURL(x)}return{downloadCsv:v,exportActiveSectionCsv:P}}typeof $e<"u"&&$e.exports&&($e.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Lt=U((Xn,Be)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let u=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(u)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Be<"u"&&(Be.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var Nt=U((er,je)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(s){let u=String.fromCharCode(...s),r=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return r?r(u).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=l(),typeof je<"u"&&(je.exports={createPublicRequestTokenHelpers:l})})()});var Ut=U((tr,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,a=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,u=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.createPublicRequestLink))}),typeof a=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>a(r.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>s(r.dataset.enablePublicRequestLink,!0))}),typeof u=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(r=>{r.addEventListener("click",()=>u(r.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof ze<"u"&&(ze.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Qt=U((nr,Ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let u=a.querySelector?.("button[type='submit']");if(!u?.disabled){u&&(u.disabled=!0);try{let r=a.querySelector?.("[name='planning_due_at']");await t(a.dataset.planningDueForm,r?.value)}finally{u?.isConnected&&(u.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof Ve<"u"&&(Ve.exports={bindWorkspacePlanningDueDateEvents:l})})()});var Bt=U((rr,He)=>{(function(){let l=new WeakSet;function e(a,s,u){if(!a)return;let r=a.querySelector("[data-equipment-choice-existing]"),i=a.querySelector("[data-equipment-choice-new]"),c=s==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(d=>{let f=d.value===(c?"new":"existing");d.checked=f,d.closest("label")?.classList.toggle("active",f)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(d=>{d.hidden=d.dataset.equipmentChoicePanel!==(c?"new":"existing")}),r&&(r.disabled=c,r.required=!c&&r.dataset.equipmentChoiceRequired==="true",c&&(r.value=""),typeof u=="function"&&u(r)),i&&(i.disabled=!c,i.required=c&&i.dataset.equipmentChoiceRequired==="true",c||(i.value=""))}function n(a,s){a.querySelectorAll("[data-equipment-choice]").forEach(u=>{let r=u.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(u,r,s)})}function t(a={}){let s=a.documentRef||document,u=a.updateAssetLocationWarning;n(s,u),!l.has(s)&&(l.add(s),s.addEventListener("change",r=>{let i=r.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,u);return}let c=r.target.closest?.("[data-equipment-choice-existing]");c&&typeof u=="function"&&u(c)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof He<"u"&&(He.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var jt=U((ar,Ge)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:a,createQuickFixAsset:s,getMaintenanceRequests:u,getQuickFixRequestId:r,getActiveCompanyId:i,getSession:c,getParts:d,getRequestsReady:f,getSupabaseClient:o,confirmAssetLocationRouting:g,assetRequiresSafety:m,blocksProcedureCompletion:p,setWorkOrderActionWarning:h,locationIdForAsset:w,descriptionWithRequestPhotoNote:y,descriptionWithAssignmentNote:_,assignedUserFromForm:$,procedureColumn:S,workOrderDateValue:P,applySafetyRequirementPayload:q,applySafetyCheckPayload:v,insertWithOptionalProcedure:k,friendlyWorkOrderSaveError:E,addPartUsageToWorkOrder:A,addPhotoToWorkOrder:D,updateAssetStatus:M,recordWorkOrderEvent:x,setActiveWorkOrderIdState:b,setActiveAssetIdState:R,setCreateWorkOrderMode:W,setQuickFixMode:O,setQuickFixAssetId:C,setQuickFixRequestId:N,showNotice:L,render:V,alertUser:H=re=>window.alert(re)}=e;async function Z(re){re.preventDefault();let ce=re.currentTarget,X=n.querySelector("#quick-fix-error"),J=ce.querySelector("button[type='submit']");X&&(X.textContent=""),J&&(J.disabled=!0,J.textContent="Saving...");try{let j=new t(ce),me=String(j.get("title")||"").trim();if(!me)throw new Error("Quick Fix issue is required.");let he=r(),I=i(),B=c(),z=String(j.get("description")||"").trim(),Y=String(j.get("resolution_summary")||"").trim(),K=Y||me,ne=z||me,G=j.get("mark_completed")==="on",oe=j.get("machine_down")==="on",ee=j.get("asset_id")||null,pe=he?u().find(le=>le.id===he):null,ae=String(j.get("new_asset_name")||"").trim();if(ee&&ae)throw new Error("Choose existing equipment or create new equipment, not both.");if(ae){let{data:le,error:te}=await a(s(ae,oe?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(te){X&&(X.textContent=te.message);return}ee=le.id}if(!ae&&!g(ee,"logging this Quick Fix",X))return;if(G&&m(ee)&&j.get("safety_devices_checked")!=="on"){X&&(X.textContent="Check safety devices before marking equipment work complete.");return}let F=G?p(null,j.get("procedure_template_id")||null):"";if(F){h("",""),X&&(X.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let se={company_id:I,location_id:w(ee),title:me,description:y(_(ne,j.get("assigned_to")),pe),asset_id:ee,assigned_to:$(j,B.user.id),priority:j.get("priority")||"medium",type:j.get("type")||"corrective",status:G?"completed":"open",due_at:P(j.get("due_at")),created_by:B.user.id,...S(j.get("procedure_template_id")),actual_minutes:0,failure_cause:j.get("failure_cause")||null,resolution_summary:G?K:Y||null,follow_up_needed:j.get("follow_up_needed")==="on",completion_notes:G?K:null,completed_at:G?new Date().toISOString():null};q(se),v(se,G&&se.safety_check_required&&j.get("safety_devices_checked")==="on");let{data:fe,error:ye}=await a(k("work_orders",se,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ye){X&&(X.textContent=`Could not log quick fix: ${E(ye)}`);return}let de=[],be=j.get("part_id"),ie=Number(j.get("quantity_used"))||1;if(be){let le=d().find(T=>T.id===be),te=await a(A(fe.id,le,ie),"Part usage save timed out.",12e3).catch(T=>T);te&&de.push(`part usage failed: ${te.message}`)}let ge=j.get("photo");if(ge&&ge.name){let le=await a(D(fe.id,ge),"Photo upload timed out.",25e3).catch(te=>te);le&&de.push(`photo upload failed: ${le.message}`)}let ve=oe?"offline":j.get("asset_status");if(se.asset_id&&!ae&&(oe||G&&ve)){let le=await a(M(se.asset_id,ve),"Equipment status update timed out.",12e3).catch(te=>te);le?de.push(`equipment status did not update: ${le.message}`):await a(x(fe.id,"asset_status_updated",oe?"Equipment marked offline/down.":`Equipment status set to ${ve}.`),"Activity log timed out.",8e3).catch(te=>de.push(`history did not update: ${te.message}`))}if(await a(x(fe.id,"quick_fix",G?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(le=>de.push(`history did not update: ${le.message}`)),ae&&await a(x(fe.id,"equipment_created",`Equipment created from Quick Fix: ${ae}.`),"Activity log timed out.",8e3).catch(le=>de.push(`history did not update: ${le.message}`)),he&&f()){let le=await a(o().from("maintenance_requests").update({status:"converted",reviewed_by:B.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:fe.id}).eq("id",he).eq("company_id",I),"Request status update timed out.",12e3).catch(te=>({error:te}));le.error?de.push(`request status did not update: ${le.error.message}`):await a(x(fe.id,"request_quick_fixed",G?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(te=>de.push(`history did not update: ${te.message}`))}b(fe.id),R(null),W(!1),O(!1),C(null),N(null),L(de.length?`Quick Fix saved with warning: ${de[0]}`:"Quick Fix saved.",de.length?"warning":"success"),await V()}catch(j){X?X.textContent=`Could not log quick fix: ${j.message||j}`:H(j.message||j)}finally{J&&J.isConnected&&(J.disabled=!1,J.textContent="Log Quick Fix")}}return{createQuickFix:Z}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof Ge<"u"&&(Ge.exports={createQuickFixWorkflow:l})})()});var zt=U((or,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let p=n.querySelector("#add-member-form");p&&p.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach(S=>{S.addEventListener("submit",u)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",r);let w=n.querySelector("#password-change-form");w&&w.addEventListener("submit",d);let y=n.querySelector("#team-invite-form");y&&y.addEventListener("submit",i);let _=n.querySelector("#team-invite-link-form");_&&_.addEventListener("submit",f),n.querySelectorAll("[data-revoke-invite-link]").forEach(S=>{S.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(S.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(S=>{S.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(S=>{S.addEventListener("click",()=>o(S.dataset.confirmRevokeInviteLink))});let $=n.querySelector("#request-notification-recipient-form");$&&$.addEventListener("submit",g),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(S=>{S.addEventListener("click",()=>m(S.dataset.deleteRequestNotificationRecipient))})}async function s(p){p.preventDefault();let h=p.currentTarget,w=new t(h),y=String(w.get("role")||"technician").trim().toLowerCase(),_=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&y!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}_&&(_.disabled=!0,_.textContent="Adding...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:w.get("user_id"),role:y}),"Team member save timed out.");if($)throw $;await e.render()}catch($){e.alertUser($.message||$)}finally{_?.isConnected&&(_.disabled=!1,_.textContent="Add Member")}}async function u(p){p.preventDefault();let h=p.currentTarget,w=new t(h),y=String(w.get("role")||"").trim().toLowerCase(),_=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}_&&(_.disabled=!0,_.textContent="Saving...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:y}),"Role save timed out. Check your connection and try again.",15e3);if($)throw new Error($.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":$.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch($){e.showNotice(`Could not save role: ${$.message||$}`,"warning")}finally{_&&(_.disabled=!1,_.textContent="Save Role")}}async function r(p){p.preventDefault();let h=p.currentTarget,w=n.querySelector("#profile-error"),y=h.querySelector("button[type='submit']"),_=new t(h),$=String(_.get("full_name")||"").trim(),S=h.querySelector('input[name="mobile_tech"]'),P=S?S.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;w&&(w.textContent=""),y&&(y.disabled=!0,y.textContent="Saving...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:$,mobile_tech:P},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(q)throw e.isMissingColumnError(q,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):q;e.showNotice("Profile saved."),await e.render()}catch(q){w&&(w.textContent=q.message||"Could not save profile.")}finally{y&&(y.disabled=!1,y.textContent="Save Profile")}}async function i(p){p.preventDefault();let h=p.currentTarget,w=n.querySelector("#team-invite-error"),y=h.querySelector("button[type='submit']"),_=new t(h),$=String(_.get("role")||"technician").trim().toLowerCase();if(w&&(w.textContent=""),!e.getTeamInvitesReady()){w&&(w.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&$!=="technician"){w&&(w.textContent="Only admins can invite managers or admins.");return}y&&(y.disabled=!0,y.textContent="Inviting...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(_.get("email")||"").trim(),invite_role:$,invite_default_location_id:_.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(S)throw S.message.includes("create_company_invite")||e.isColumnSchemaError(S,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):S;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(S){w&&(w.textContent=S.message||"Could not create invite.")}finally{y&&(y.disabled=!1,y.textContent="Create Invite")}}async function c(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:p}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function d(p){p.preventDefault();let h=p.currentTarget,w=n.querySelector("#password-change-error"),y=h.querySelector("button[type='submit']"),_=new t(h),$=String(_.get("password")||""),S=String(_.get("confirmPassword")||"");if(w&&(w.textContent=""),$.length<8){w&&(w.textContent="Password must be at least 8 characters.");return}if($!==S){w&&(w.textContent="Passwords do not match.");return}y&&(y.disabled=!0,y.textContent="Updating...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:$}),"Password update timed out. Check your connection and try again.",15e3);if(P)throw P;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(P){w&&(w.textContent=P.message||"Could not update password.")}finally{y&&(y.disabled=!1,y.textContent="Update Password")}}async function f(p){p.preventDefault();let h=p.currentTarget,w=n.querySelector("#team-invite-link-error"),y=h.querySelector("button[type='submit']"),_=new t(h),$=String(_.get("role")||"technician").trim().toLowerCase();if(w&&(w.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let S="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(S),w&&(w.textContent=S);return}if($==="admin"){let S="Admin join links are not allowed.";e.setTeamInviteLinkError(S),w&&(w.textContent=S);return}if(!e.canAdministerTeamRoles?.()&&$!=="technician"){let S="Managers can only create technician join links.";e.setTeamInviteLinkError(S),w&&(w.textContent=S);return}y&&(y.disabled=!0,y.textContent="Creating...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:$,link_location_id:_.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(S)throw S.message.includes("create_company_invite_link")||e.isColumnSchemaError(S,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):S;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(S){let P=S.message||"Could not create join link.";e.setTeamInviteLinkError(P),w&&(w.textContent=P)}finally{y&&(y.disabled=!1,y.textContent="Create Join Link")}}async function o(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:p}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function g(p){p.preventDefault();let h=p.currentTarget,w=n.querySelector("#request-notification-recipient-error"),y=h.querySelector("button[type='submit']"),_=new t(h);if(w&&(w.textContent=""),!e.canAdministerTeamRoles?.()){let $="Only admins can change request email routing.";e.setRequestNotificationRecipientError($),w&&(w.textContent=$);return}if(!e.getRequestNotificationRecipientsReady()){w&&(w.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}y&&(y.disabled=!0,y.textContent="Adding...");try{let $=String(_.get("email")||"").trim().toLowerCase(),{error:S}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:_.get("location_id")||null,email:$,label:String(_.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(S)throw e.isColumnSchemaError(S,["request_notification_recipients"])||S.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):S;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch($){let S=$.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(S),w&&(w.textContent=S)}finally{y&&(y.disabled=!1,y.textContent="Add Recipient")}}async function m(p){if(!(!p||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",p),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:s,updateCompanyMemberRole:u,updateMyProfile:r,updateMyPassword:d,createTeamInvite:i,cancelTeamInvite:c,createTeamInviteLink:f,revokeTeamInviteLink:o,createRequestNotificationRecipient:g,deleteRequestNotificationRecipient:m}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Ye<"u"&&(Ye.exports={createTeamWorkflow:l})})()});var Vt=U((ir,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let c=n.querySelector("#location-form");c&&c.addEventListener("submit",u);let d=n.querySelector("#public-app-url-form");d&&d.addEventListener("submit",r)}async function s(i){i.preventDefault();let c=i.currentTarget,d=c.querySelector("button[type='submit']"),f=new t(c);d&&(d.disabled=!0,d.textContent="Saving...");try{let{error:o}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(o)throw o;e.showNotice("Company saved."),await e.render()}catch(o){e.showNotice(`Could not save company: ${o.message||o}`,"warning")}finally{d&&(d.disabled=!1,d.textContent="Save Company")}}async function u(i){i.preventDefault();let c=i.currentTarget,d=n.querySelector("#location-error"),f=c.querySelector("button[type='submit']"),o=String(new t(c).get("name")||"").trim();if(o){d&&(d.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:g,error:m}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),o),"Location save timed out. Check your connection and try again.",15e3);if(m)throw e.isColumnSchemaError(m,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?m.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(g.id),e.persistActiveLocationId(g.id),e.showNotice("Location added."),await e.render()}catch(g){d&&(d.textContent=g.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function r(i){i.preventDefault();let c=n.querySelector("#public-request-link-error"),d=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(c&&(c.textContent=""),!d){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(d);if(!f){c&&(c.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:s,createLocation:u,savePublicAppUrl:r}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof Ke<"u"&&(Ke.exports={createCompanySettingsWorkflow:l})})()});var Ht=U((sr,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.FormDataCtor||FormData,s=e.confirmUser||(o=>t.confirm(o));function u(){let o=n.querySelector("#app-issue-report-form");o&&o.addEventListener("submit",c),n.querySelectorAll("[data-app-issue-status]").forEach(g=>{g.addEventListener("submit",d)}),n.querySelectorAll("[data-delete-app-issue]").forEach(g=>{g.addEventListener("click",f)})}async function r(){let{data:o,error:g}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!g),e.setAppIssueReports(g?[]:o||[]),g)throw g}function i(o){let g=e.appIssueReportErrorState(o);return g.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),g.message}async function c(o){o.preventDefault();let g=o.currentTarget,m=n.querySelector("#app-issue-report-error"),p=g.querySelector("button[type='submit']"),h=new a(g);m&&(m.textContent=""),p&&(p.disabled=!0,p.textContent="Sending...");try{let w={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:y}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),w),"App issue report save timed out. Check your connection and try again.",15e3);if(y)throw y;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await r(),e.renderWorkspace()}catch(w){m&&(m.textContent=i(w))}finally{p?.isConnected&&(p.disabled=!1,p.textContent="Send Report")}}async function d(o){if(o.preventDefault(),!e.canManageTeam())return;let g=o.currentTarget,m=g.querySelector("button[type='submit']"),p=new a(g);m&&(m.disabled=!0,m.textContent="Saving...");try{let h=String(p.get("status")||"open"),{error:w}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),g.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(w)throw w;e.showNotice("Issue report updated."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{m?.isConnected&&(m.disabled=!1,m.textContent="Save")}}async function f(o){if(o.preventDefault(),!e.canManageTeam())return;let g=o.currentTarget,m=g.dataset.deleteAppIssue;if(!m||!s("Delete this app issue report? This cannot be undone."))return;g.disabled=!0;let p=g.textContent;g.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),m),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent=p||"Delete")}}return{bindAppIssueWorkflowEvents:u,reloadAppIssueReports:r,appIssueReportError:i,createAppIssueReport:c,updateAppIssueReportStatus:d,deleteAppIssueReport:f}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Je<"u"&&(Je.exports={createAppIssueWorkflow:l})})()});var Gt=U((cr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.CSSRef||CSS;async function s(d){let f=n.querySelector("#public-request-link-error"),o=n.querySelector(`[data-create-public-request-link="${a.escape(d)}"]`);f&&(f.textContent=""),o&&(o.disabled=!0,o.textContent="Creating...");try{let{error:g}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:d}),"QR link save timed out. Check your connection and try again.",15e3);if(g)throw e.setPublicRequestLinksReady(!1),new Error(g.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":g.message);e.showNotice("Location request QR link ready."),await e.render()}catch(g){f&&(f.textContent=g.message||"Could not create QR request link.")}finally{o&&(o.disabled=!1,o.textContent="Create QR Link")}}async function u(d){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await r(d,!1)}async function r(d,f){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can reactivate or disable posted QR request links.");return}await c(d,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function i(d){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await c(d,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function c(d,f,o){let g=n.querySelector("#public-request-link-error");if(g&&(g.textContent=""),!e.canAdministerPublicRequestLinks()){g&&(g.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!d||!e.getActiveCompanyId()){g&&(g.textContent="Select a company before updating request links.");return}try{let{data:m,error:p}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(p){g&&(g.textContent=p.message);return}if(!m?.length){g&&(g.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(o),await e.render()}catch(m){g&&(g.textContent=m.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:u,setPublicRequestLinkActive:r,regeneratePublicRequestLink:i,updatePublicRequestLink:c}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof Ze<"u"&&(Ze.exports={createPublicRequestLinkWorkflow:l})})()});var Yt=U((lr,Xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=new WeakMap;function s(g,m){let p=e.getParts().find(h=>h.id===m);p&&!a.has(g)&&a.set(g,{id:m,companyId:e.getActiveCompanyId(),quantity_on_hand:Number(p.quantity_on_hand)||0})}function u(g){if(!g||g.companyId!==e.getActiveCompanyId())throw new Error("Reopen this part before saving.")}function r(){let g=n.querySelector("#create-part-form");g&&g.addEventListener("submit",i),n.querySelectorAll("[data-restock-part]").forEach(m=>{s(m,m.dataset.restockPart),m.addEventListener("submit",c)}),n.querySelectorAll("[data-use-part]").forEach(m=>{s(m,m.dataset.usePart),m.addEventListener("submit",d)}),n.querySelectorAll("[data-edit-part]").forEach(m=>{s(m,m.dataset.editPart),m.addEventListener("submit",f)}),n.querySelectorAll("[data-rename-part-source]").forEach(m=>{m.addEventListener("submit",o)})}async function i(g){g.preventDefault();let m=g.currentTarget,p=n.querySelector("#part-create-error"),h=m.querySelector("button[type='submit']"),w=new t(m);p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Adding...");let y;try{let _={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(w.get("name")||"").trim(),sku:String(w.get("sku")||"").trim()||null,supplier_name:String(w.get("supplier_name")||"").trim()||null,machine_note:String(w.get("machine_note")||"").trim()||null,quantity_on_hand:Number(w.get("quantity_on_hand"))||0,reorder_point:Number(w.get("reorder_point"))||0,unit_cost:Number(w.get("unit_cost"))||0};if(!_.company_id)throw new Error("Choose a company before adding parts.");if(!_.name)throw new Error("Part name is required.");let $=new Promise((q,v)=>{y=setTimeout(()=>v(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:S,error:P}=await Promise.race([e.supabaseClient().from("parts").insert(_).select("id").single(),$]);if(clearTimeout(y),P&&e.isMissingColumnError(P,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(P&&e.isMissingColumnError(P,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(P&&e.isMissingColumnError(P,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(P&&e.isMissingColumnError(P,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(P)throw P;e.setActivePartId(S?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),m.reset(),await e.render()}catch(_){p&&(p.textContent=_.message||"Could not add part.")}finally{y&&clearTimeout(y),h&&h.isConnected&&(h.disabled=!1,h.textContent="Add Part")}}async function c(g){g.preventDefault();let m=g.target,p=m.querySelector("button[type='submit']"),h=a.get(m),w=Number(new t(m).get("quantity"))||0;if(!h||w<=0)return;let y=p?.textContent||"Restock";p&&(p.disabled=!0,p.textContent="Saving...");try{u(h);let{data:_,error:$}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(h.quantity_on_hand)||0)+w}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(h.quantity_on_hand)||0).select("id"),"Part restock timed out. Check your connection and try again.",15e3);if($)throw $;if(!_?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part restocked."),await e.render()}catch(_){e.showNotice(`Could not restock part: ${_.message||_}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=y)}}async function d(g){g.preventDefault();let m=g.currentTarget,p=m.querySelector("button[type='submit']"),h=a.get(m),w=Number(new t(m).get("quantity"))||0;if(!h||w<=0)return;let y=p?.textContent||"Use";p&&(p.disabled=!0,p.textContent="Saving...");try{u(h);let _=Number(h.quantity_on_hand)||0;if(w>_)throw new Error("Quantity used exceeds the stock on hand.");let $=_-w,{data:S,error:P}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:$}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",_).select("id"),"Part use save timed out. Check your connection and try again.",15e3);if(P)throw P;if(!S?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part used."),await e.render()}catch(_){e.showNotice(`Could not use part: ${_.message||_}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=y)}}async function f(g){g.preventDefault();let m=g.currentTarget,p=m.dataset.editPart,h=n.querySelector(`[data-part-edit-error="${p}"]`),w=m.querySelector("button[type='submit']"),y=new t(m);h&&(h.textContent="");let _=w?.textContent||"Save Part";w&&(w.disabled=!0,w.textContent="Saving...");let $={name:String(y.get("name")||"").trim(),sku:y.get("sku")||null,supplier_name:y.get("supplier_name")||null,machine_note:y.get("machine_note")||null,quantity_on_hand:Number(y.get("quantity_on_hand"))||0,reorder_point:Number(y.get("reorder_point"))||0,unit_cost:Number(y.get("unit_cost"))||0};try{if(!$.name)throw new Error("Part name is required.");let S=a.get(m);if(u(S),S.id!==p)throw new Error("Reopen this part before saving.");let{data:P,error:q}=await e.withOperationTimeout(e.supabaseClient().from("parts").update($).eq("id",p).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(S.quantity_on_hand)||0).select("id"),"Part save timed out. Check your connection and try again.",15e3);if(q&&e.isMissingColumnError(q,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(q&&e.isMissingColumnError(q,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(q&&e.isMissingColumnError(q,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(q)throw q;if(!P?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(S){h&&(h.textContent=S.message||"Could not save part.")}finally{w&&(w.disabled=!1,w.textContent=_)}}async function o(g){g.preventDefault();let m=g.currentTarget,p=n.querySelector("#part-source-error"),h=m.querySelector("button[type='submit']"),w=new t(m),y=String(w.get("old_source")||"").trim(),_=String(w.get("new_source")||"").trim();if(p&&(p.textContent=""),!!y){if(!e.getPartSuppliersReady()){p&&(p.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(y===_){p&&(p.textContent="Change the source name before saving.");return}h&&(h.disabled=!0,h.textContent="Renaming...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:_||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",y),"Part source rename timed out. Check your connection and try again.",15e3);if($)throw e.isMissingColumnError($,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?$.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch($){p&&(p.textContent=$.message||"Could not update part source.")}finally{h&&(h.disabled=!1,h.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:i,restockPart:c,usePartFromInventory:d,updatePart:f,renamePartSource:o}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof Xe<"u"&&(Xe.exports={createPartInventoryWorkflow:l})})()});var Kt=U((ur,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(u){u.preventDefault();let r=u.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#quick-update-error"),d=e.getWorkOrders().find(o=>o.id===e.getActiveWorkOrderId()),f=new t(r);i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let o=f.get("asset_id")||null,g=String(f.get("new_asset_name")||"").trim();if(o&&g)throw new Error("Choose existing equipment or create new equipment, not both.");if(g){let{data:$,error:S}=await e.createQuickFixAsset(g,"running");if(S){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not add equipment: ${S.message}`);return}o=$.id}if(!g&&!e.confirmAssetLocationRouting(o,"saving this work update",c))return;let m={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(d?.description||"",f.get("assigned_to")),asset_id:o,location_id:e.locationIdForAsset(o),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(m);let p=f.get("safety_devices_checked")==="on",h=(d?.procedure_template_id||"")!==(m.procedure_template_id||"");if(m.status==="completed"&&(d?.status!=="completed"||h)){let $=e.productionActionCompletionMessage?.(d)||"";if($){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),$),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=$);return}let S=e.blocksProcedureCompletion(d,m.procedure_template_id||null);if(S){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),S),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=S);return}if(e.applySafetyCheckPayload(m,p),e.requiresSafetyDeviceCheck(m)&&!m.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent="Check safety devices before completing work tied to equipment.");return}d?.status!=="completed"&&(m.completed_at=new Date().toISOString())}m.status!=="completed"?(m.completed_at=null,e.applySafetyCheckPayload(m,!1)):d?.status==="completed"&&e.applySafetyCheckPayload(m,m.safety_check_required&&(p||e.hasCompletedSafetyDeviceCheck(d)));let{error:w}=await e.withOperationTimeout(e.updateWorkOrderSafely(m,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(w){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(w)}`);return}let y=[];if(m.asset_id&&f.get("machine_down")==="on"){let $=await e.updateAssetStatus(m.asset_id,"offline");$?y.push(`equipment status did not update: ${$.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let _=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(d,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch($=>$);g&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${g}.`),"Activity log timed out.",8e3).catch(()=>null),_&&y.push(`history did not update: ${_.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(o){a.error("Quick update save failed",o),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${o.message||o}`)}}return{updateWorkOrderQuickView:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var Jt=U((dr,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function u(q){return String(q.get("location_new")||q.get("location_existing")||q.get("location")||"").trim()||null}function r(){return e.getSession?.()?.user?.id||null}function i(q){return(e.getAssets?.()||[]).find(v=>v.id===q)||null}function c(q,v){if(!q)return[];let k={name:"name",asset_code:"serial number",asset_tag:"asset tag",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(k).filter(E=>String(q[E]??"")!==String(v[E]??"")).map(E=>k[E])}function d(q){return e.isMissingColumnError(q,"manufacturer")||e.isMissingColumnError(q,"model")}async function f(q){q.preventDefault();let v=q.currentTarget,k=e.captureCreateDraft?.(v),E=n.querySelector("#asset-create-error");E&&(E.textContent="");let A=v.querySelector("button[type='submit']"),D=A?.textContent||"Add Equipment",M=q.submitter?.dataset?.assetContinue==="true";A&&(A.disabled=!0,A.textContent="Saving...");try{let x=new t(v),b={company_id:e.getActiveCompanyId(),location_id:x.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(x.get("name"),"Equipment name"),asset_code:String(x.get("asset_code")||"").trim()||null,asset_tag:String(x.get("asset_tag")||"").trim()||null,manufacturer:String(x.get("manufacturer")||"").trim()||null,model:String(x.get("model")||"").trim()||null,location:u(x),parent_asset_id:x.get("parent_asset_id")||null,asset_type:x.get("asset_type")||"machine",safety_devices_required:x.get("safety_devices_required")==="on",status:"running",created_by:r()},R=e.supabaseClient().from("assets").insert(b).select("id").single(),{data:W,error:O}=await e.withOperationTimeout(R,"Equipment save timed out. Check your connection and try again.",15e3);if(O&&e.isMissingColumnError(O,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(O&&e.isMissingColumnError(O,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(O&&d(O))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(O&&e.isMissingColumnError(O,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(O&&e.isAssetHierarchySchemaError(O))throw new Error(e.equipmentSchemaMessage(O));if(O)throw O;e.clearCreateDraft?.(k),W?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(W.id,"created",`Created ${b.name}.`),M&&W?.id?(e.setActiveAssetId(W.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(x){E?E.textContent=x.message:a(x.message)}finally{A&&(A.disabled=!1,A.textContent=D)}}async function o(q){q.preventDefault();let v=q.currentTarget,k=n.querySelector("#asset-edit-error");k&&(k.textContent="");let E=v.querySelector("button[type='submit']"),A=E?.textContent||"Save Equipment";E&&(E.disabled=!0,E.textContent="Saving...");try{let D=new t(v),M=i(e.getActiveAssetId()),x={name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,asset_tag:String(D.get("asset_tag")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location_id:D.get("location_id")||e.activeLocationDatabaseId(),location:u(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:D.get("status")},{error:b}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(x).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(b&&d(b))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(b&&e.isMissingColumnError(b,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(b&&e.isAssetHierarchySchemaError(b))throw new Error(e.equipmentSchemaMessage(b));if(b)throw b;let R=c(M,x);R.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${R.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(D){k?k.textContent=D.message:a(D.message)}finally{E&&(E.disabled=!1,E.textContent=A)}}async function g(q,v){let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:v}).eq("id",q).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!k&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(q,"status_changed",`Status changed to ${v}.`),k||null}async function m(q){q.preventDefault();let v=q.currentTarget,k=v.dataset.attachAssetPart,E=n.querySelector(`[data-asset-part-error="${s.escape(k)}"]`);E&&(E.textContent="");let A=v.querySelector("button[type='submit']"),D=A?.textContent||"Attach Part";A&&(A.disabled=!0,A.textContent="Attaching...");try{let M=new t(v),x=M.get("part_id");if(!x)throw new Error("Select a part to attach.");let b=Math.max(1,Number(M.get("quantity_recommended"))||1),R=String(M.get("note")||"").trim()||null,{error:W}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:k,part_id:x,quantity_recommended:b,note:R}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(W)throw e.isMissingTableError?.(W,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):W.code==="23505"?new Error("This part is already linked to this equipment."):W;e.showNotice("Part linked to equipment."),await e.render()}catch(M){E?E.textContent=M.message||"Could not link part to equipment.":e.showNotice(M.message||"Could not link part to equipment.","warning")}finally{A&&(A.disabled=!1,A.textContent=D)}}async function p(q){let v=n.querySelector("[data-asset-part-error]");v&&(v.textContent="");try{let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",q).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(k)throw e.isMissingTableError?.(k,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):k;e.showNotice("Part link removed."),await e.render()}catch(k){v?v.textContent=k.message||"Could not remove linked part.":e.showNotice(k.message||"Could not remove linked part.","warning")}}function h(q){return{workOrders:e.getWorkOrders().filter(v=>v.asset_id===q).length,children:e.childAssetsFor(q).length,schedules:e.getPreventiveSchedules().filter(v=>v.asset_id===q).length,requests:e.getMaintenanceRequests().filter(v=>v.asset_id===q).length}}function w(q){let v=h(q);return Object.values(v).some(Boolean)}async function y(q){let[v,k,E]=await Promise.all([_("work_orders",q),_("preventive_schedules",q),_("maintenance_requests",q)]);return{workOrders:v,children:e.childAssetsFor(q).length,schedules:k,requests:E}}async function _(q,v){let{count:k,error:E}=await e.withOperationTimeout(e.supabaseClient().from(q).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",v),`Equipment delete check timed out while checking ${q}.`,15e3);if(E)throw new Error(`Could not verify linked ${q.replaceAll("_"," ")} before deleting equipment: ${E.message}`);if(!Number.isSafeInteger(k)||k<0)throw new Error(`Could not verify linked ${q.replaceAll("_"," ")} before deleting equipment. Try again.`);return k}async function $(q){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");try{let k=await y(q),E=e.assetDeleteBlockerMessage(k);if(E){v&&(v.textContent=E);return}e.setPendingDeleteAssetId(q),e.renderWorkspace()}catch(k){v?v.textContent=k.message||"Could not verify equipment links before delete.":e.showNotice(k.message||"Could not verify equipment links before delete.","warning")}}async function S(q){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");let k=n.querySelector(`[data-confirm-delete-asset="${s.escape(q)}"]`);k&&(k.disabled=!0,k.textContent="Deleting...");try{let E=await y(q),A=e.assetDeleteBlockerMessage(E);if(A)throw new Error(A);let D=e.getAssetDocumentStoragePaths?.(q)||[];if(D.length){let x=await e.withOperationTimeout(e.removeAssetDocumentStorage(D),"Equipment file cleanup timed out.",15e3);if(x.error)throw new Error(`Could not remove equipment files: ${x.error.message}`)}let{error:M}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",q).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(M)throw new Error(M.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":M.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(E){v&&(v.textContent=E.message||"Could not delete equipment."),k&&(k.disabled=!1,k.textContent="Permanently Delete")}}async function P(q,v="running"){let k={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:q,asset_type:"machine",safety_devices_required:!0,status:v,created_by:r()},E=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(k).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return E.error&&e.isMissingColumnError(E.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(E,e.databaseSetupRequiredMessage("adding equipment in this location"))):E.error&&e.isMissingColumnError(E.error,"created_by")?e.withSetupError(E,"Run supabase/step-next-asset-events.sql before saving equipment history."):E.error&&e.isAssetHierarchySchemaError(E.error)?e.withSetupError(E,e.equipmentSchemaMessage(E.error).replace("saving","adding")):(!E.error&&E.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(E.data.id,"created",`Created ${q}.`),E)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:w,attachAssetPart:m,countAssetLinkedRows:_,createAsset:f,createQuickFixAsset:P,deleteAsset:S,loadAssetDeleteBlockers:y,removeAssetPart:p,requestDeleteAsset:$,updateAsset:o,updateAssetStatus:g}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var Zt=U((pr,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function u(){let g=n.querySelector("#detail-panel");g.innerHTML=e.renderRequestFormContent()}async function r(g){g.preventDefault(),await i(g.target)}async function i(g){let m=n.querySelector("#request-error"),p=g.querySelector("button[type='submit']");m&&(m.textContent=""),p&&(p.disabled=!0,p.textContent="Submitting...");try{let h=new t(g),w=h.get("asset_id")||null,y=String(h.get("equipment_note")||"").trim();if(w&&y)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!w&&!y)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(w,"submitting this request",m))return;let _=y||e.assetNameFor?.(w)||"Saved equipment",$=e.requiredText(h.get("description"),"Request details"),S=e.requiredText(h.get("requester_name"),"Your name"),P={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(w),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${_}

${$}`,asset_id:w,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:S};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:q,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(P).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(v)throw v;let k=h.get("photo"),E="";if(k&&k.name){let D=await e.addPhotoToMaintenanceRequest(q.id,k);D&&(E=` Photo did not upload: ${D.message||D}`)}let A=await e.notifyRequestEmailer(q.id);A?.error&&console.warn("Request email notification did not send",A.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${E}`,E?"warning":"success"),await e.render()}catch(h){m?m.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{p&&(p.disabled=!1,p.textContent="Submit Request")}}async function c(g){if(!e.getMaintenanceRequests().find(h=>h.id===g))return;let p=n.querySelector(`[data-convert-request="${s.escape(g)}"]`);p&&(p.disabled=!0,p.textContent="Converting...");try{let{data:h,error:w}=await e.withOperationTimeout(e.supabaseClient().rpc("convert_maintenance_request",{target_company_id:e.getActiveCompanyId(),target_request_id:g}),"Request conversion timed out. Check your connection and try again.",15e3);if(w)throw w;if(!h?.id)throw new Error("Conversion did not return a work order. Review the request before retrying.");e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),p&&(p.disabled=!1,p.textContent="Convert to Work Order")}}function d(g){let m=e.getMaintenanceRequests().find(p=>p.id===g);m&&(e.setQuickFixRequestId(g),e.setQuickFixAssetId(m.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(g){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(m=>m.id===g)&&(e.setPendingDeleteRequestId(g),e.renderWorkspace())}async function o(g){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let m=e.getMaintenanceRequests().find(h=>h.id===g);if(!m)return;let p=n.querySelector(`[data-confirm-delete-request="${s.escape(g)}"]`);p&&(p.disabled=!0,p.textContent="Deleting...");try{if(m.photo_storage_path){let _=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([m.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(_.error)throw new Error(`Could not remove request photo: ${_.error.message}`)}let{data:h,error:w}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",g).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(w)throw w;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let y=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",g).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(y.error)throw new Error(`Request delete verification failed: ${y.error.message}`);if(y.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:c,createRequest:r,createRequestFromForm:i,deleteMaintenanceRequest:o,openQuickFixForRequest:d,renderRequestForm:u,requestDeleteMaintenanceRequest:f}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var Xt=U((mr,Ee)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert;async function s(u){u.preventDefault();let r=u.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",c&&(c.textContent="");try{let d=new t(r),f=d.get("status")||"open",o=d.get("asset_id")||null,g=String(d.get("new_asset_name")||"").trim();if(o&&g)throw new Error("Choose existing equipment or create new equipment, not both.");if(g){let{data:P,error:q}=await e.createQuickFixAsset(g,"running");if(q){c&&(c.textContent=`Could not add equipment: ${q.message}`);return}o=P.id}if(!g&&!e.confirmAssetLocationRouting(o,"creating this work order",c))return;if(f==="completed"&&e.assetRequiresSafety(o)&&d.get("safety_devices_checked")!=="on"){c&&(c.textContent="Check safety devices before creating completed work tied to equipment.");return}let m=f==="completed"?e.blocksProcedureCompletion(null,d.get("procedure_template_id")||null):"";if(m){e.setWorkOrderActionWarning("",""),c&&(c.textContent=`${m} Create the work order first, then complete the checklist before marking it complete.`);return}let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(o),title:e.requiredText(d.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(d.get("description"),d.get("assigned_to")),asset_id:o,priority:d.get("priority"),type:d.get("type")||"corrective",due_at:e.workOrderDateValue(d.get("due_at")),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(d.get("actual_minutes"))||0,failure_cause:d.get("failure_cause")||null,resolution_summary:d.get("resolution_summary")||null,follow_up_needed:d.get("follow_up_needed")==="on",completion_notes:d.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,f==="completed"&&p.safety_check_required&&d.get("safety_devices_checked")==="on");let{data:h,error:w}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(w){c&&(c.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(w)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),g&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${g}.`);let y=[],_=d.get("part_id");if(_){let P=e.getParts().find(v=>v.id===_),q=await e.addPartUsageToWorkOrder(h.id,P,Number(d.get("quantity_used"))||1);q?y.push(`part usage failed: ${q.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${P?.name||"Part"}.`)}let $=d.get("photo");if($&&$.name){let P=await e.addPhotoToWorkOrder(h.id,$);P?y.push(`photo upload failed: ${P.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${$.name}.`)}let S=String(d.get("initial_comment")||"").trim();if(S){let P=await e.addCommentToWorkOrder(h.id,S);P?y.push(`comment failed: ${P.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(y.length?`Work order created with warning: ${y[0]}`:"Work order created.",y.length?"warning":"success"),await e.render()}catch(d){c?c.textContent=`Could not create work order: ${d.message||d}`:a(d.message||d)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ee<"u"&&Ee.exports&&(Ee.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var en=U((fr,Re)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(u){u.preventDefault();let i=u.target.querySelector("button[type='submit']"),c=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let d=new t(u.target),f=e.getActiveWorkOrderId(),o=e.getWorkOrders().find(P=>P.id===f),g=n.querySelector("#status-select")?.value||o?.status||"open",m=d.has("asset_id"),p=m?d.get("asset_id")||null:o?.asset_id||null;if(m&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(p,"saving this work order",c)){i.disabled=!1,i.textContent="Save Work Order";return}let h={title:e.requiredText(d.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(d.get("description"),d.get("assigned_to")),due_at:e.workOrderDateValue(d.get("due_at")),status:g,priority:d.get("priority"),type:d.get("type"),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),failure_cause:d.get("failure_cause")||null,resolution_summary:d.get("resolution_summary")||null,follow_up_needed:d.get("follow_up_needed")==="on",actual_minutes:Number(d.get("actual_minutes"))||0};if(m&&(h.asset_id=p,h.location_id=e.locationIdForAsset(p)),h.safety_check_required=e.assetRequiresSafety(p),h.status==="completed"){let P=e.productionActionCompletionMessage?.(o)||"";if(P){e.setWorkOrderActionWarning(f,P),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=P);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(o)&&d.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let w=(o?.procedure_template_id||"")!==(h.procedure_template_id||""),y=h.status==="completed"&&(o?.status!=="completed"||w)?e.blocksProcedureCompletion(o,h.procedure_template_id||null):"";if(y){e.setWorkOrderActionWarning(f,y),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=y);return}h.status==="completed"&&o?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(d.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):o?.status==="completed"&&h.safety_check_required&&d.has("safety_devices_checked")?e.applySafetyCheckPayload(h,d.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)):o?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:_}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,f),"Work order save timed out. Check your connection and try again.",2e4);if(_){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(_)}`);return}let $={...Object.fromEntries(d.entries()),status:g},S=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(o,$)),"Activity log timed out.",8e3).catch(P=>P);e.setWorkOrderActionWarning("",""),e.showNotice(S?`Work order saved, but history did not update: ${S.message}`:"Work order saved.",S?"warning":"success"),await e.render()}catch(d){a.error("Work order save failed",d),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${d.message||d}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof Re<"u"&&Re.exports&&(Re.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var tn=U((gr,Oe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function a(u){u.preventDefault();let r=u.currentTarget,i=n.querySelector("#parts-used-error"),c=r.querySelector("button[type='submit']");i&&(i.textContent=""),c&&(c.disabled=!0,c.textContent="Recording...");try{let d=new t(r),f=d.get("part_id"),o=Number(d.get("quantity_used"))||1,g=e.getParts().find(p=>p.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!g)throw new Error("Choose a part first.");let m=await s(e.getActiveWorkOrderId(),g,o);if(m)throw m;e.showNotice("Part recorded on work order."),await e.render()}catch(d){i&&(i.textContent=d.message||"Could not record part used.")}finally{c&&(c.disabled=!1,c.textContent="Record Part Used")}}async function s(u,r,i){if(!r)return new Error("Choose a part first.");let{error:c}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:u,p_part_id:r.id,p_quantity:i}),"Part usage save timed out.");return c||null}return{addPartUsageToWorkOrder:s,recordPartUsed:a}}typeof Oe<"u"&&Oe.exports&&(Oe.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var nn=U((hr,We)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.consoleRef||console,u=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),r=25*1024*1024,i=5*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),d=new Set;async function f(b){b.preventDefault();let R=b.currentTarget,W=R.dataset.partDocument,O=n.querySelector(`[data-part-document-error="${W}"]`),C=R.querySelector("button[type='submit']"),N=new t(R),L=N.get("document"),V=h(N.get("document_type"));if(O&&(O.textContent=""),!e.getPartDocumentsReady()){O&&(O.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!L||!L.name){O&&(O.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(k(L)){O&&(O.textContent=E()),await S("part document",L,E());return}C&&(C.disabled=!0,C.textContent="Attaching...");let H=await q(L),Z=H.fileName||e.safeFileName(L.name||"part-file"),re=`${e.getActiveCompanyId()}/${W}/${a.randomUUID()}-${Z}`;try{let ce=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,H.blob,{contentType:H.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(ce.error)throw ce.error;let X={company_id:e.getActiveCompanyId(),part_id:W,uploaded_by:e.getSession().user.id,storage_path:re,file_name:Z,content_type:H.contentType,document_type:V,file_size_bytes:H.blob.size||null,original_file_name:e.safeFileName(L.name||"part-file"),original_size_bytes:L.size||null},{error:J}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(X),"Part file record save timed out. Check your connection and try again.",15e3);if(J&&e.isColumnSchemaError(J,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete X.document_type,delete X.file_size_bytes,delete X.original_file_name,delete X.original_size_bytes,J=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(X),"Part file record retry timed out. Check your connection and try again.",15e3)).error),J)throw await y("part-documents",re),e.isColumnSchemaError(J,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?J.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(ce){await S("part document",L,ce),O&&(O.textContent=ce.message||"Could not attach file.")}finally{C&&(C.disabled=!1,C.textContent="Attach File")}}async function o(b){b.preventDefault();let R=b.currentTarget,W=R.dataset.assetDocument,O=n.querySelector(`[data-asset-document-error="${W}"]`),C=R.querySelector("button[type='submit']"),N=new t(R),L=N.get("document"),V=p(N.get("document_type"));if(O&&(O.textContent=""),!e.getAssetDocumentsReady?.()){O&&(O.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!L||!L.name){O&&(O.textContent="Choose a machine file first.");return}if(k(L)){O&&(O.textContent=E()),await S("equipment file",L,E());return}C&&(C.disabled=!0,C.textContent="Uploading...");let H=await q(L),Z=`${e.getActiveCompanyId()}/${W}/${a.randomUUID()}-${H.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(Z,H.blob,{contentType:H.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:ce}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:W,uploaded_by:e.getSession().user.id,storage_path:Z,file_name:H.fileName,content_type:H.contentType,document_type:V,file_size_bytes:H.blob.size||null,original_file_name:e.safeFileName(L.name||"machine-photo"),original_size_bytes:L.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(ce)throw await y("asset-documents",Z),e.isColumnSchemaError(ce,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?ce.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await S("equipment file",L,re),O&&(O.textContent=re.message||"Could not upload machine file.")}finally{C&&(C.disabled=!1,C.textContent="Attach Machine File")}}async function g(b,R){let W=n.querySelector("[data-asset-document-error]");if(W&&(W.textContent=""),!b||!R){let O="Missing machine file record. Refresh and try again.";W?W.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([R]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",b).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(C)throw C;e.showNotice("Machine file deleted."),await e.render()}catch(O){W?W.textContent=O.message||"Could not delete machine file.":e.showNotice(O.message||"Could not delete machine file.","warning")}}async function m(b,R){let W=n.querySelector("#photo-error");if(W&&(W.textContent=""),!b||!R){let O="Missing photo record. Refresh and try again.";W?W.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([R]),"Photo delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",b).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(C)throw C;let N=R.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${N}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(O){W?W.textContent=O.message||"Could not delete photo.":e.showNotice(O.message||"Could not delete photo.","warning")}}function p(b){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(b)?b:"other"}function h(b){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(b)?b:"other"}async function w(b){b.preventDefault();let R=b.currentTarget,W=R.querySelector("button[type='submit']"),O=n.querySelector("#photo-error");O&&(O.textContent="");let C=new t(R).get("photo");if(!C||!C.name){O&&(O.textContent="Choose a photo first.");return}let N=D(C);if(N){O&&(O.textContent=N),await S("work order photo",C,N);return}W.disabled=!0,W.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let V=await _(e.getActiveWorkOrderId(),C);if(V)throw V;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${C.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(L){await S("work order photo",C,L),O&&(O.textContent=`Could not upload photo: ${L.message||L}`)}finally{W.disabled=!1,W.textContent="Upload Photo"}}async function y(b,R){try{let{error:W}=await e.withOperationTimeout(e.supabaseClient().storage.from(b).remove([R]),"Uploaded file cleanup timed out.",1e4);W&&s.warn(`Could not remove uploaded ${b} object`,W)}catch(W){s.warn(`Could not remove uploaded ${b} object`,W)}}async function _(b,R){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let O=D(R);if(O)return await S("work order photo",R,O),new Error(O);let C=await q(R,P()),N=M(C);if(N)return await S("work order photo",R,N),new Error(N);let L=`${e.getActiveCompanyId()}/${b}/${a.randomUUID()}-${C.fileName}`,V=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(L,C.blob,{contentType:C.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(V.error)return await S("work order photo",R,V.error),V.error;let H={company_id:e.getActiveCompanyId(),work_order_id:b,uploaded_by:e.getSession().user.id,storage_path:L,file_name:C.fileName,content_type:C.contentType,file_size_bytes:C.blob.size||null,original_file_name:e.safeFileName(R.name||"photo"),original_size_bytes:R.size||null},{error:Z}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(H),"Photo record save timed out. Check your connection and try again.",15e3);return Z&&e.isColumnSchemaError(Z,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete H.file_size_bytes,delete H.original_file_name,delete H.original_size_bytes,Z=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(H),"Photo record retry timed out. Check your connection and try again.",15e3)).error),Z&&await y("work-order-photos",L),Z&&await S("work order photo",R,Z),Z||null}async function $(b,R){if(!b)return new Error("Request was not saved before photo upload.");let W=D(R);if(W)return await S("request photo",R,W),new Error(W);let O=await q(R,P()),C=M(O);if(C)return await S("request photo",R,C),new Error(C);let N=`${b}/${a.randomUUID()}-${O.fileName}`,L=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(N,O.blob,{contentType:O.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(L.error)return await S("request photo",R,L.error),L.error;let{error:V}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:b,p_photo_storage_path:N,p_photo_file_name:O.fileName,p_photo_content_type:O.contentType,p_photo_file_size_bytes:O.blob.size||null,p_photo_original_file_name:e.safeFileName(R.name||"photo"),p_photo_original_size_bytes:R.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return V&&(await y("maintenance-request-photos",N),await S("request photo",R,V)),V||null}async function S(b,R,W){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let O=String(W?.message||W||"Upload failed").slice(0,500),C=e.safeFileName(R?.name||"unknown-file"),N=A(R),L=Number(R?.size||0),V=[b,C,N,L,O].join("|");if(!d.has(V)){d.add(V);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||b||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${b}`.slice(0,140),details:[`Upload context: ${b}`,`File: ${C}`,`Type: ${N}`,`Size: ${L}`,`Error: ${O}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(H){s.warn("Could not report upload failure",H)}}}function P(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function q(b,R={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(b,R);let W=["image/jpeg","image/png","image/webp","image/heic","image/heif"],O=A(b);if(!W.includes(O)&&!(R.acceptAnyImage&&O.startsWith("image/")))return{blob:b,fileName:e.safeFileName(b.name||"photo"),contentType:O};try{if(!u)throw new Error("Browser image optimization is unavailable.");let C=await u(b),N=Number(R.targetBytes||0)||1*1024*1024,L=R.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],V=null;for(let H of L){let Z=await x(C,H.maxDimension,H.quality);if(V=Z,Z.size<=N)break}if(C.close&&C.close(),!V)throw new Error("Browser could not optimize this image.");return{blob:V,fileName:`${e.fileBaseName(b.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(C){return s.warn("Photo optimization failed; uploading original.",C),{blob:b,fileName:e.safeFileName(b.name||"photo"),contentType:O}}}function v(b){return["image/jpeg","image/png","image/webp"].includes(A(b))}function k(b){return!v(b)&&Number(b.size||0)>r}function E(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function A(b){let R=String(b?.type||"").trim().toLowerCase();if(R)return R;let W=String(b?.name||"").toLowerCase();return/\.(jpe?g)$/.test(W)?"image/jpeg":/\.png$/.test(W)?"image/png":/\.webp$/.test(W)?"image/webp":/\.gif$/.test(W)?"image/gif":/\.heic$/.test(W)?"image/heic":/\.heif$/.test(W)?"image/heif":/\.pdf$/.test(W)?"application/pdf":/\.txt$/.test(W)?"text/plain":/\.csv$/.test(W)?"text/csv":/\.doc$/.test(W)?"application/msword":/\.docx$/.test(W)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(W)?"application/vnd.ms-excel":/\.xlsx$/.test(W)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function D(b){let R=A(b);return c.has(R)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function M(b){return c.has(String(b?.contentType||"").toLowerCase())?Number(b?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function x(b,R,W){let O=Math.min(1,R/Math.max(b.width,b.height)),C=Math.max(1,Math.round(b.width*O)),N=Math.max(1,Math.round(b.height*O)),L=n.createElement("canvas");L.width=C,L.height=N,L.getContext("2d",{alpha:!1}).drawImage(b,0,0,C,N);let H=await new Promise(Z=>L.toBlob(Z,"image/jpeg",W));if(!H)throw new Error("Browser could not optimize this image.");return H}return{addPhotoToMaintenanceRequest:$,addPhotoToWorkOrder:_,optimizePhoto:q,removeUploadedObject:y,reportUploadFailure:S,deleteAssetDocument:g,deleteWorkOrderPhoto:m,uploadAssetDocument:o,uploadPartDocument:f,uploadPhoto:w}}typeof We<"u"&&We.exports&&(We.exports={createMediaStorageWorkflow:l}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:l}})()});var rn=U((yr,xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.URLRef||URL,u=e.consoleRef||console,r=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function d(p){p.preventDefault();let h=p.currentTarget,w=n.querySelector("#company-logo-error"),y=h.querySelector("button[type='submit']"),_=new t(h).get("logo");if(w&&(w.textContent=""),!_||!_.name){w&&(w.textContent="Choose a logo image first.");return}y&&(y.disabled=!0,y.textContent="Uploading...");try{let $=g(_);if($)throw new Error($);let S=await f(_),P=m(S);if(P)throw new Error(P);let q=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${S.fileName}`,v=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(q,S.blob,{contentType:S.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(v.error)throw new Error(v.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":v.error.message);let{error:k}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:q}),"Company logo record save timed out. Check your connection and try again.",15e3);if(k)throw await e.removeUploadedObject("company-logos",q),new Error(e.isColumnSchemaError(k,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":k.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":k.message);let E=e.getCompanies().find(A=>A.id===e.getActiveCompanyId());E&&(E.logo_path=q,E.logoUrl=s.createObjectURL(S.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch($){w&&(w.textContent=$.message||"Could not upload logo.")}finally{y&&(y.disabled=!1,y.textContent="Upload Logo")}}async function f(p){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(p);let h=o(p);try{if(!r)throw new Error("Browser logo optimization is unavailable.");let w=await r(p),_=Math.min(1,1200/Math.max(w.width,w.height)),$=Math.max(1,Math.round(w.width*_)),S=Math.max(1,Math.round(w.height*_)),P=n.createElement("canvas");P.width=$,P.height=S;let q=P.getContext("2d",{alpha:!0});q.clearRect(0,0,$,S),q.drawImage(w,0,0,$,S),w.close&&w.close();let v=await new Promise(k=>P.toBlob(k,"image/png"));if(!v)throw new Error("Browser could not optimize this logo.");return{blob:v,fileName:`${e.fileBaseName(p.name||"logo")}.png`,contentType:"image/png"}}catch(w){return u.warn("Logo optimization failed; uploading original.",w),{blob:p,fileName:e.safeFileName(p.name||"logo"),contentType:h}}}function o(p){let h=String(p?.type||"").trim().toLowerCase();if(h)return h;let w=String(p?.name||"").toLowerCase();return/\.(jpe?g)$/.test(w)?"image/jpeg":/\.png$/.test(w)?"image/png":/\.webp$/.test(w)?"image/webp":/\.gif$/.test(w)?"image/gif":/\.heic$/.test(w)?"image/heic":/\.heif$/.test(w)?"image/heif":/\.avif$/.test(w)?"image/avif":/\.bmp$/.test(w)?"image/bmp":/\.tiff?$/.test(w)?"image/tiff":"application/octet-stream"}function g(p){let h=o(p);return c.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function m(p){return c.has(String(p?.contentType||"").toLowerCase())?Number(p?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:d}}typeof xe<"u"&&xe.exports&&(xe.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var an=U((wr,et)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,a=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function u(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(o=>o.id===i))return;let d=s(i);if(d){a(d);return}let f=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||f){r(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function r(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let c=e.getParts().find(g=>g.id===i),d=n.querySelector("#part-delete-error");if(d&&(d.textContent=""),!c)return;let f=s(i);if(f){d&&(d.textContent=f);return}let o=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let g=(e.getPartDocumentsByPartId()[i]||[]).map(w=>w.storage_path).filter(Boolean);if(g.length){let w=await e.withOperationTimeout(e.removePartDocumentStorage(g),"Part document cleanup timed out. Try deleting again.",15e3);if(w.error)throw new Error(`Could not remove filed receipts/invoices: ${w.error.message}`)}let{data:m,error:p}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(p)throw new Error(p.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":p.message);if(!m?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(g){e.showNotice(g.message||"Could not delete part.","warning"),d&&(d.textContent=g.message||"Could not delete part."),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}return{deletePart:r,requestDeletePart:u}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof et<"u"&&(et.exports={createPartDeleteWorkflow:l})})()});var on=U((br,tt)=>{(function(){function l(t,a){return t?.response_type==="checkbox"?a===!0||a==="checked"?"checked":"":String(a??"").trim()}function e(t,a){let s=l(t,a);return s?t?.response_type==="checkbox"?s==="checked":t?.response_type==="pass_fail"?s==="pass"||s==="fail":t?.response_type==="number"?Number.isFinite(Number(s)):!0:!1}let n={normalizeChecklistResponseValue:l,isChecklistStepAnswered:e};typeof window<"u"&&(window.MaintainOpsChecklistResponseValues=n),typeof tt<"u"&&(tt.exports=n)})()});var sn=U((vr,nt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function s(d,f){let{data:o,error:g}=await e.withOperationTimeout(e.getPublicRequestIntake(d),f);return{data:Array.isArray(o)?o[0]:o,error:g}}async function u(d){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:g,error:m}=await s(d,"Request QR lookup timed out.");if(f=g,m||!f){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let o=e.publicRequestUrl(d);e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function r(d){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:o,error:g}=await s(d,"Request form lookup timed out.");if(g){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=o}catch(o){i(o.message||"This request link could not be loaded.");return}if(!f){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),n.querySelector("#public-request-form").addEventListener("submit",o=>c(o,d,f))}function i(d){e.setAppHtml(e.publicRequestError(d))}async function c(d,f,o){d.preventDefault();let g=d.currentTarget,m=new a(g),p=n.querySelector("#public-request-error"),h=g.querySelector("button[type='submit']");p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:w,error:y}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(m.get("title"),"Request title"),equipment_note:e.requiredText(m.get("equipment_note"),"Machine / area"),request_description:e.requiredText(m.get("description"),"Request details"),requester_name:e.requiredText(m.get("requester_name"),"Your name"),requester_contact:String(m.get("requester_contact")||"").trim()||null,request_priority:m.get("priority")||"medium"}),"Request send timed out.");if(y)throw y;let _=m.get("photo"),$="";if(_&&_.name){let P=await e.addPhotoToMaintenanceRequest(w,_);P&&($=`Request sent, but the photo did not upload: ${P.message||P}`)}let S=await e.notifyRequestEmailer(w);S.error&&e.warn("Request email notification did not send",S.error),e.setAppHtml(e.publicRequestSuccess(o,$)),n.querySelector("#public-request-another").addEventListener("click",()=>r(f))}catch(w){p&&(p.textContent=w.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:r,renderPublicRequestQrPage:u,submitPublicRequest:c}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof nt<"u"&&(nt.exports={createPublicRequestIntakeWorkflow:l})})()});var cn=U((kr,rt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(u){u.preventDefault();let r=u.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#company-error"),d=String(new t(r).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",c.textContent="";try{if(!d)throw new Error("Company name is required.");let f=e.getCompanies().find(p=>p.name.trim().toLowerCase()===d.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:o,error:g}=await e.withOperationTimeout(e.createCompanyRecord(d),"Company creation timed out.");if(g){c.textContent=g.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":g.message;return}if(e.setActiveCompanyId(o),e.persistActiveCompanyId(o),!await e.ensureProfileForActiveCompany(d))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){c.textContent=f.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof rt<"u"&&(rt.exports={createCompanySetupWorkflow:l})})()});var ln=U((_r,at)=>{(function(){function l(e={}){let n=new Set;function t(){let u=e.getScope?.();return()=>e.getScope?.()===u}async function a(u){let r=u.target,i=e.getActiveWorkOrderId();if(r.disabled||n.has(i))return;let c=t(),d=e.getWorkOrders().find(f=>f.id===i);r.disabled=!0;try{!await s(i,r.value)&&c()&&(r.value=d?.status||"open")}catch(f){c()&&(r.value=d?.status||"open",e.showNotice(`Could not update status: ${f.message||f}`,"warning"))}finally{r.disabled=!1}}async function s(u,r){if(n.has(u))return!1;let i=t(),c=u&&e.getWorkOrders().find(f=>f.id===u);if(!c)return e.showNotice("This work order is no longer available. Refresh and try again.","warning"),!1;n.add(u);let d=!1;try{if(r==="completed"){let h=e.productionActionCompletionMessage?.(c)||"";if(h)return e.setActiveWorkOrderId(u),e.setWorkOrderActionWarning(u,h),e.showNotice(h,"warning"),await e.render(),!1;let w=e.blocksProcedureCompletion(c);if(w)return e.setActiveWorkOrderId(u),e.setWorkOrderActionWarning(u,w),e.showNotice(w,"warning"),await e.render(),!1}let f=e.currentSafetyCheckboxCheckedForWorkOrder(u),o=e.hasCompletedSafetyDeviceCheck(c)||f;if(r==="completed"&&e.requiresSafetyDeviceCheck(c)&&!o){e.setActiveWorkOrderId(u);let h="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(u,h),e.showNotice(h,"warning"),await e.render(),!1}let g={status:r,asset_id:c.asset_id||null,completed_at:r==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(g),r==="completed"?e.applySafetyCheckPayload(g,g.safety_check_required&&o):r!=="completed"&&e.applySafetyCheckPayload(g,!1),delete g.asset_id;let{error:m}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,u),"Status save timed out. Check your connection and try again.",15e3);if(m)return i()&&e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(m)}`,"warning"),!1;if(d=!0,!i())return!0;let p;try{p=(await e.recordWorkOrderEvent(u,"status_changed",`Status changed to ${e.statusLabel(r)}.`))?.error}catch(h){p=h||new Error("History save failed.")}return i()&&(e.setActiveWorkOrderId(u),e.setWorkOrderActionWarning("",""),p?e.showNotice(`Status changed to ${e.statusLabel(r)}, but history could not be saved: ${p.message||p}`,"warning"):e.showNotice(`Status changed to ${e.statusLabel(r)}.`),await e.render()),!0}catch(f){if(i()){let o=d?`Status changed to ${e.statusLabel(r)}, but the view could not be refreshed: ${f.message||f}`:`Could not update status: ${f.message||f}`;e.showNotice(o,"warning")}return d}finally{n.delete(u)}}return{setWorkOrderStatus:s,updateWorkOrderStatus:a}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof at<"u"&&(at.exports={createWorkOrderStatusWorkflow:l})})()});var un=U((qr,Me)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function a(c,d){return c?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${d}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${d}"]`)||null}async function s({workOrderId:c,payload:d,source:f,busyText:o,successMessage:g}){let m=f?.querySelector?.("button[type='submit']")||f,p=m?.textContent||"",h=a(f,c);m&&(m.disabled=!0,m.textContent=o),h&&(h.textContent="");try{let w=await e.withOperationTimeout(e.updateProductionActionRecord(c,d),"Production Action save timed out. Check your connection and try again.",15e3);if(w.error){let y=e.friendlyWorkOrderSaveError(w.error);return h?h.textContent=`Could not save Production Action: ${y}`:e.showNotice(`Could not save Production Action: ${y}`,"warning"),!1}return e.showNotice(g,"success"),await e.afterProductionActionMutation(w.data,c),!0}catch(w){let y=w.message||String(w);return h?h.textContent=`Could not save Production Action: ${y}`:e.showNotice(`Could not save Production Action: ${y}`,"warning"),!1}finally{m?.isConnected&&(m.disabled=!1,m.textContent=p)}}async function u(c){c.preventDefault(),c.stopPropagation();let d=c.currentTarget,f=d.dataset.productionActionForm,o=new n(d),g=String(o.get("production_action")||"").trim(),m=String(o.get("production_action_assigned_to")||"").trim(),p=a(d,f);if(!g||!m){p&&(p.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(f);await s({workOrderId:f,payload:{production_action:g,production_action_assigned_to:m},source:d,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function r(c){c.preventDefault(),c.stopPropagation();let d=c.currentTarget,f=d.dataset.workOrderId,o=d.dataset.productionActionStatus;await s({workOrderId:f,payload:{production_action_status:o},source:d,busyText:o==="completed"?"Completing...":"Reopening...",successMessage:o==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(c){c.preventDefault(),c.stopPropagation();let d=c.currentTarget,f=d.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:f,payload:{production_action:null},source:d,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:u,setProductionActionStatus:r,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof Me<"u"&&Me.exports&&(Me.exports={createProductionActionWorkflow:l})})()});var dn=U((Sr,ot)=>{(function(){function l(e={}){async function n(s,u={}){let r=s.filter(f=>f.id&&!f.read_at);if(!r.length)return!0;let i=new Map(r.map(f=>[f.id,f])),c=new Date().toISOString(),d=r.map(f=>f.id);e.setNotifications(e.getNotifications().map(f=>i.has(f.id)?{...f,read_at:c}:f)),u.render!==!1&&e.renderWorkspace();try{let f=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,d,c),"Work notification update timed out.",1e4);if(f.error)throw f.error;return!0}catch(f){return e.setNotifications(e.getNotifications().map(o=>i.get(o.id)||o)),e.showNotice(`Could not mark the work notification read: ${f.message||f}`,"warning"),u.render!==!1&&e.renderWorkspace(),!1}}function t(s,u={}){let r=e.getNotifications().find(i=>i.id===s);return r?.read_at?Promise.resolve(!0):n([r||{id:s,read_at:null}],u)}function a(s,u={}){return n(e.getNotifications().filter(r=>r.work_order_id===s),u)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:a}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:l},typeof ot<"u"&&(ot.exports={createWorkOrderNotificationWorkflow:l})})()});var pn=U(($r,it)=>{(function(){function l(e){async function n(t,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(u=>u.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let u=e.workOrderDateValue(a);if(!u)throw new Error("Choose a due date.");let r=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:u},t),"Due date save timed out. Check your connection and try again.");if(r.error)throw r.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:u}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:u}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${u} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:u}}catch(u){return e.showNotice(`Could not set due date: ${u.message||u}`,"warning"),{saved:!1,reason:"save_failed",error:u}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof it<"u"&&(it.exports={createPlanningDueDateWorkflow:l})})()});var mn=U((Cr,st)=>{(function(){function l(n,t,a,s=50){let u=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",a).order("created_at",{ascending:!1}).limit(u)}function e(n,t,a,s){let u=[...new Set((a||[]).filter(Boolean))];return u.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",u).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e},typeof st<"u"&&(st.exports={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e})})()});var fn=U((Ar,ct)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:a||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof ct<"u"&&(ct.exports={notifyRequestEmailer:l})})()});var gn=U((Pr,lt)=>{(function(){async function l(n,t,a=[],s={}){let u=s.pathKey||"storage_path",r=s.urlKey||"signedUrl",i=s.expiresIn||600,c=s.onError;await Promise.all(a.map(async d=>{let f=d?.[u];if(!f)return;let{data:o,error:g}=await n.storage.from(t).createSignedUrl(f,i);if(g){d[r]="",typeof c=="function"&&c(d,g);return}d[r]=o?.signedUrl||""}))}function e(n={}){function t(a){if(!a||!n.getReady())return;let u=(n.getRows(a)||[]).filter(i=>i.storage_path&&!i.signedUrl),r=n.getSigningMap();!u.length||r[a]||(r[a]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,u),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete r[a],n.getActiveGroupId()===a&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof lt<"u"&&(lt.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var hn=U((Er,ut)=>{(function(){function l(t,a){if(t[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return t[a]}function e(t={}){let a=l(t,"supabaseClient"),s=l(t,"workspaceUiState"),u=l(t,"applyRequestQueryFilters"),r=l(t,"applyWorkOrderListFilters"),i=l(t,"applyWorkOrderFilters"),c=l(t,"selectWorkOrders"),d=l(t,"countWorkOrdersQuery"),f=l(t,"fetchExactSearchedWorkOrderPage"),o=l(t,"isColumnSchemaError"),g=t.warn||(()=>{}),m=l(t,"LIST_ITEMS_PER_PAGE"),p=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),w=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),y=l(t,"REQUEST_FALLBACK_SELECT"),_=l(t,"WORK_ORDER_RELATION_SELECT"),$=l(t,"WORK_ORDER_FALLBACK_SELECT");function S(){return typeof a=="function"?a():a}async function P(M=s.getRequestViewFilter(),x={}){let b=Math.max(1,s.getRequestsPage()),R=(b-1)*m,W=R+m-1,O=x.includeRelations===!1?y:x.includeLocationRelation===!1?w:h,C=await u(S().from("maintenance_requests").select(O,{count:"exact"}),M).order("created_at",{ascending:!1}).range(R,W);return C.error&&x.includeLocationRelation!==!1&&o(C.error,["location_id","locations"])?P(M,{includeLocationRelation:!1}):C.error&&x.includeRelations!==!1?P(M,{includeRelations:!1}):!C.error&&C.count&&b>1&&R>=C.count?(s.setRequestsPage(Math.max(1,Math.ceil(C.count/m))),P(M,x)):C}async function q(M){let x=await u(S().from("maintenance_requests").select("id",{count:"exact",head:!0}),M);return x.error?(g("Request count failed",x.error),0):x.count||0}async function v(){let[M,x,b]=await Promise.all([q("active"),q("converted"),q("all")]);return{active:M,converted:x,all:b}}async function k(M={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return f(M);let x=Math.max(1,s.getWorkOrderPage()),b=(x-1)*p,R=b+p-1,W=M.includeLocationRelation===!1?$:_,O=await r(c(S(),W,{count:"exact"})).range(b,R);return!O.error&&O.count&&x>1&&b>=O.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(O.count/p))),k(M)):O}async function E(M={}){let x=await i(d(S()),M);return x.error?(g("Work order count failed",x.error),0):x.count||0}async function A(){let[M,x,b,R,W,O,C,N]=await Promise.all([E({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:M,newWork:x,inProgress:b,blocked:R,overdue:W,completedAll:O,completedMonth:C,completedWeek:N}}async function D(){let[M,x,b,R,W,O,C,N]=await Promise.all([E({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:M,newWork:x,inProgress:b,blocked:R,overdue:W,completedAll:O,completedMonth:C,completedWeek:N}}return{fetchRequestPage:P,countRequests:q,loadRequestDashboardCounts:v,fetchWorkOrderPage:k,countWorkOrders:E,loadWorkOrderDashboardCounts:A,loadMyWorkDashboardCounts:D}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof ut<"u"&&(ut.exports=n)})()});var yn=U((Rr,dt)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,a=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function u(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function r(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(m){c("Verifying your account...");try{if(m.error||m.errorDescription)throw new Error(m.errorDescription||m.error||"This verification link is invalid or expired.");let p=null;if(m.code){let{data:h,error:w}=await e.supabaseClient.auth.exchangeCodeForSession(m.code);if(w)throw w;p=h?.session||null}else if(m.accessToken&&m.refreshToken){let{data:h,error:w}=await e.supabaseClient.auth.setSession({access_token:m.accessToken,refresh_token:m.refreshToken});if(w)throw w;p=h?.session||null}if(!p){let{data:h,error:w}=await e.supabaseClient.auth.getSession();if(w)throw w;p=h?.session||null}if(!p)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(p),r(),c("Verification complete. Loading workspace..."),await e.render()}catch(p){r(),d(p.message||"This verification link is invalid or expired.")}}function c(m){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(m)}function d(m){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(m),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(m=e.passwordRecoveryParamsFromUrl()){let p=!1,h="";if(m.accessToken&&m.refreshToken){let{data:w,error:y}=await e.supabaseClient.auth.setSession({access_token:m.accessToken,refresh_token:m.refreshToken});p=!!(w?.session&&!y),y&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";g({ready:p,initialError:h})}function o(m="",p=""){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(m,p),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let w=h.target,y=w.querySelector("button[type='submit']"),_=t.querySelector("#auth-error"),$=t.querySelector("#auth-status"),S=String(new FormData(w).get("email")||"").trim();_.textContent="",$.textContent="Sending reset link...",y.disabled=!0,y.textContent="Sending...";try{let{error:P}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(S,{redirectTo:u()}),"Password reset email timed out. Check your connection and try again.",2e4);if(P){$.textContent="",_.textContent=P.message;return}$.textContent="If that email exists in Supabase, a reset link has been sent."}catch(P){$.textContent="",_.textContent=P.message||"Could not send reset link."}finally{t.body.contains(y)&&(y.disabled=!1,y.textContent="Send Reset Link")}})}function g({ready:m=!1,initialError:p=""}={}){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:m,initialError:p}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{r(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{r(),o()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!m)return;let w=h.target,y=w.querySelector("button[type='submit']"),_=new FormData(w),$=String(_.get("password")||""),S=String(_.get("confirmPassword")||""),P=t.querySelector("#auth-error"),q=t.querySelector("#auth-status");if(P.textContent="",$.length<8){P.textContent="Password must be at least 8 characters.";return}if($!==S){P.textContent="Passwords do not match.";return}q.textContent="Updating password...",y.disabled=!0,y.textContent="Updating...";try{let{error:v}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:$}),"Password update timed out. Try the newest reset link again.",2e4);if(v){q.textContent="",P.textContent=v.message;return}r();let{data:k}=await e.supabaseClient.auth.getSession();if(e.setSession(k.session),q.textContent=k.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",k.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(v){q.textContent="",P.textContent=v.message||"Could not update password."}finally{t.body.contains(y)&&(y.disabled=!1,y.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:u,clearPasswordRecoveryUrl:r,startAuthCallback:i,renderAuthCallback:c,renderAuthCallbackError:d,startPasswordRecovery:f,renderPasswordResetRequest:o,renderPasswordRecovery:g}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof dt<"u"&&(dt.exports={createAuthSessionFlow:l})})()});var wn=U((Or,De)=>{(function(){function l(u,r){let i=r.getProfilesByUserId();if(u.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${r.escapeHtml(i[u.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(u.created_at).toLocaleString()}</span>
        <p>${r.escapeHtml(u.body)}</p>
      </article>
    `;if(u.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${r.photoMetaText(u)} &middot; ${r.escapeHtml(i[u.uploaded_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(u.file_name)}</p>
        ${u.signedUrl?`<a href="${r.escapeHtml(u.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(u.type==="part"){let d=r.partUsageUnitCost(u)*(Number(u.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(u.created_at).toLocaleString()} &middot; ${r.escapeHtml(i[u.created_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(u.parts?.name||"Part")} - ${Number(u.quantity_used)||0} used - ${r.money(d)}</p>
      </article>
    `}return`
    <article>
      <strong>${r.escapeHtml(u.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(u.created_at).toLocaleString()} \xC2\xB7 ${r.escapeHtml(i[u.actor_id]?.full_name||"Team member")}</span>
      <p>${r.escapeHtml(u.summary)}</p>
    </article>
  `}function e(u,r){let i=r.getProcedureTemplates(),c=r.getPartsUsedByWorkOrder(),d=r.getCommentsByWorkOrder(),f=r.getPhotosByWorkOrder(),o=r.getMessageThreads(),g=i.find($=>$.id===u.procedure_template_id),m=g?r.checklistProgress(u,g):null,p=(c[u.id]||[]).length,h=(d[u.id]||[]).length,w=(f[u.id]||[]).length,y=o.filter($=>$.work_order_id===u.id).length,_=[];return u.asset_id&&_.push(n("asset","Equipment",u.assets?.name||"Linked",r)),g&&m&&_.push(n("procedure","Procedure checklist",`${m.done}/${m.total}`,r)),p&&_.push(n("parts","Parts",String(p),r)),h&&_.push(n("comment","Comments",String(h),r)),y&&_.push(n("message","Messages",String(y),r)),w&&_.push(t(u.id,String(w),r)),_.length?`<div class="relationship-row">${_.join("")}</div>`:""}function n(u,r,i,c){return`
    <span class="relationship-chip ${u}" title="${c.escapeHtml(r)}">
      ${a(u)}
      <span>${c.escapeHtml(i)}</span>
    </span>
  `}function t(u,r,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(u)}" title="Open photos">
      ${a("photo")}
      <span>${i.escapeHtml(r)}</span>
    </button>
  `}function a(u){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[u]||""}function s(u){return Object.freeze({renderActivityItem:r=>l(r,u),renderRelationshipChips:r=>e(r,u),relationshipChip:(r,i,c)=>n(r,i,c,u),photoJumpChip:(r,i)=>t(r,i,u),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof De<"u"&&De.exports&&(De.exports={createRelationshipDisplayHelpers:s})})()});var bn=U((Wr,pt)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,a=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,u=e.isConvertedRequest,r=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),c=e.getPendingDeleteRequestId,d=e.getProfilesByUserId;function f(p,h){return p==="converted"?`${h} converted`:p==="all"?`${h} total`:`${h} active`}function o(p,h,w={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",p.active],["converted","Converted",p.converted],["all","All",p.all]].map(([_,$,S])=>`
            <button class="segment ${h===_?"active":""}" data-request-filter="${_}" type="button" ${w.locked&&_!=="active"?"disabled":""}>
              ${n(_==="active"?"open":_==="converted"?"completed":"all")}${$} <span>${S}</span>
            </button>
          `).join("")}
        </div>
      `}function g(p){let h=u(p),w=i(),y=c()===p.id,_=d(),$=p.created_at?new Date(p.created_at):null,S=$&&!Number.isNaN($.getTime())?$.toLocaleString():"date unavailable",P=p.assets?.name||p.locations?.name||"No equipment",q=p.requested_by_name||_[p.requested_by]?.full_name||"Requester",v=p.converted_by||p.reviewed_by||"",k=_[v]?.full_name||"",E=k?`Converted to work order by ${k}`:v?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",A=w&&r()?y?`
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
              <span><strong>Machine / area</strong>${t(P)}</span>
              <span><strong>Requester</strong>${t(q)}</span>
              <span><strong>Received</strong>${t(S)}</span>
            </div>
          </div>
          ${w&&!h&&p.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${p.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${p.id}" type="button">Convert to Work Order</button>
              ${A}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(E)}</span>
              ${A}
            </div>
          `:""}
        </article>
      `}function m(){return`
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:o,renderMaintenanceRequest:g,renderRequestFormContent:m}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof pt<"u"&&(pt.exports={createRequestDisplayHelpers:l})})()});var vn=U((xr,mt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=W=>String(W||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:s,getWorkOrderTypeFilter:u=()=>"all",getWorkOrderPriorityFilter:r=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:c=()=>"none",getActiveStatusFilter:d,getMyWorkFilter:f,getActiveSection:o,getDueState:g,getProcedureTemplates:m,getActiveWorkOrderId:p,getProfilesByUserId:h,getSession:w,STATUS_OPTIONS:y,TYPE_OPTIONS:_=[],OUTSIDE_VENDOR_VALUE:$,escapeHtml:S,cleanWorkOrderDescription:P,relationshipIcon:q,segmentIcon:v,isVendorAssigned:k,assignmentLabel:E,renderRelationshipChips:A,canAssignWorkOrderToMe:D,canManageTeam:M,renderProductionActionCard:x=()=>"",hasOpenProductionAction:b=()=>!1,hasUnreadProductionReady:R=()=>!1}){function W(){let I=a(),B=s(),z=d(),Y=I?`${t(I)} Work`:B==="unassigned"?"Unassigned Work Orders":B==="vendor"?"Outside Vendor Work":B==="assigned"?"Assigned Work Orders":"Work Orders";return z==="active"||z==="all"?Y==="Work Orders"?"Active Work Orders":`Active - ${Y}`:`${e(z)} - ${Y}`}function O(){let I=d();return I==="active"||I==="all"?"My Work":`${e(I)} - My Work`}function C(){return o()==="mywork"?O():W()}function N(I){let B=o(),z=f();return B==="mywork"?`${I} shown - ${B==="mywork"?z==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${I} shown`}function L(I,B,z){return`<option value="${S(I)}" ${I===z?"selected":""}>${S(B)}</option>`}function V(I){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[I]||"Any assignment"}function H(I){return I?I.charAt(0).toUpperCase()+I.slice(1):""}function Z(I=[]){let B=d(),z=B==="all"?"active":B,Y=s(),K=a(),ne=u(),G=r(),oe=i(),ee=c(),pe=["completed","completed_month","completed_week"].includes(B),ae=z==="active"&&Y==="all"&&!K&&ne==="all"&&G==="all"&&oe==="newest"&&ee==="none",F=I.find(ie=>ie.userId===K),se=[`Status: ${e(z)}`,`Assignment: ${V(Y)}`,...F?[`Person: ${F.name}`]:[],...ne!=="all"?[`Type: ${n(ne)}`]:[],...G!=="all"?[`Priority: ${H(G)}`]:[]],fe=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ye=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],de=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],be=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${se.map(ie=>`<li><span>${S(ie)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${ae?"disabled":""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${z!=="active"?"is-active":""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${fe.map(([ie,ge])=>L(ie,ge,z)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ye.map(([ie,ge])=>L(ie,ge,Y)).join("")}
                </select>
              </label>
              <label class="work-control-field ${K?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${L("","Any team member",K)}
                  ${I.map(ie=>L(ie.userId,ie.name,K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ne!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${L("all","Any type",ne)}
                  ${_.map(ie=>L(ie,n(ie),ne)).join("")}
                </select>
              </label>
              <label class="work-control-field ${G!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${L("all","Any priority",G)}
                  ${["critical","high","medium","low"].map(ie=>L(ie,H(ie),G)).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="work-control-section arrange-controls">
            <span class="work-control-section-title">Arrange by</span>
            <div class="work-control-fields">
              <label class="work-control-field">
                <span>Sort</span>
                <select data-work-sort-filter aria-label="Sort work orders" ${pe?"disabled":""}>
                  ${pe?L("completed","Recently completed","completed"):de.map(([ie,ge])=>L(ie,ge,oe)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${be.map(([ie,ge])=>L(ie,ge,ee)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function re(I,B){if(B==="assignee"){if(k(I))return{key:"vendor",label:"Outside vendor",order:900};if(!I.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let K=E(I);return{key:`assignee:${I.assigned_to}`,label:K,order:100}}if(B==="status"){let K=["open","in_progress","blocked","completed"].indexOf(I.status);return{key:`status:${I.status}`,label:e(I.status),order:K<0?99:K}}if(B==="priority"){let K=["critical","high","medium","low"].indexOf(I.priority);return{key:`priority:${I.priority}`,label:H(I.priority||"Unspecified"),order:K<0?99:K}}let z=I.type||"corrective",Y=_.indexOf(z);return{key:`type:${z}`,label:n(z),order:Y<0?99:Y}}function ce(I,B={}){if(!I.length)return'<p class="muted">No work orders match these filters.</p>';let z=B.groupBy||"none";if(z==="none")return`<div class="work-list" id="work-order-list">${I.map(X).join("")}</div>`;let Y=new Map;return I.forEach(ne=>{let G=re(ne,z);Y.has(G.key)||Y.set(G.key,{...G,workOrders:[]}),Y.get(G.key).workOrders.push(ne)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...Y.values()].sort((ne,G)=>ne.order-G.order||ne.label.localeCompare(G.label)).map(ne=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${S(ne.label)}</h3>
                <span>${ne.workOrders.length}</span>
              </div>
              <div class="work-list">${ne.workOrders.map(X).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function X(I){let B=g(I),z=m().find(ee=>ee.id===I.procedure_template_id),Y=I.created_at?new Date(I.created_at):null,K=Y&&!Number.isNaN(Y.getTime())?Y.toLocaleDateString():"",ne=I.status==="completed",G=ne?"Completed":e(I.status),oe=ee=>ee==="completed"?"Complete":e(ee);return`
        <article class="work-card status-card status-${I.status} ${I.id===p()?"selected":""}" data-id="${I.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${I.priority}">${I.priority}</span>
              <span class="chip">${S(n(I.type))}</span>
              <span class="chip ${I.status}">${G}</span>
              ${B?`<span class="chip ${B.className}">${B.label}</span>`:""}
              ${R(I.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${S(I.title)}</h3>
            <p>${S(P(I.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${q("asset")}${S(I.assets?.name||"General item / area")}</span>
            <span>${v(k(I)?"vendor":"mine")}${S(E(I))}</span>
            ${z?`<span>${q("procedure")}${S(z.name)}</span>`:""}
            <span>${v("due")}Due ${I.due_at||"unset"}</span>
            ${K?`<span>${v("created")}Created ${S(K)}</span>`:""}
            ${I.completed_at?`<span>${v("completed")}Completed ${new Date(I.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${A(I)}
          ${x(I)}
          <div class="quick-actions work-card-actions">
            ${!ne&&D(I)?`<button class="assign-action" data-assign-me="${I.id}" type="button">Assign to me</button>`:""}
            ${!ne&&M()?J(I):""}
          ${y.filter(ee=>ee!==I.status&&!(ee==="completed"&&b(I))).slice(0,3).map(ee=>`
            <button data-quick-status="${ee}" data-id="${I.id}" type="button">${oe(ee)}</button>
          `).join("")}
        </div>
      </article>
    `}function J(I){return`
        <form class="card-assign-form" data-card-assign="${I.id}">
          <select name="assigned_to" aria-label="Assign ${S(I.title)}">
            <option value="">Unassigned</option>
            <option value="${$}" ${k(I)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([B,z])=>`<option value="${B}" ${!k(I)&&B===I.assigned_to?"selected":""}>${S(z.full_name||t(B))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function j(I="",B={}){let z=I||"",Y=B.managerOptions??M(),K=B.allowUnassigned!==!1,ne=B.selfLabel||"Assign to me",G=[];return K&&G.push(`<option value="" ${z===""?"selected":""}>Unassigned</option>`),G.push(`<option value="${w().user.id}" ${z===w().user.id?"selected":""}>${ne}</option>`),Y&&(G.push(`<option value="${$}" ${z===$?"selected":""}>Outside vendor</option>`),G.push(...Object.entries(h()).filter(([oe])=>oe!==w().user.id).map(([oe,ee])=>`<option value="${oe}" ${z===oe?"selected":""}>${S(ee.full_name||t(oe))}</option>`))),G.join("")}function me(I){return k(I)?$:I?.assigned_to||""}function he(I,B=""){let z=me(I);return I?.status==="completed"?`
          <label ${B?`id="${B}"`:""}>Completed by / assigned to
            <input value="${S(E(I))}" disabled>
            <input name="assigned_to" type="hidden" value="${S(z)}">
          </label>
        `:M()?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${j(z,{managerOptions:!0})}
            </select>
          </label>
        `:!I.assigned_to&&!k(I)?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${j("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${B?`id="${B}"`:""}>Assigned to
          <input value="${S(E(I))}" disabled>
          <input name="assigned_to" type="hidden" value="${S(z)}">
        </label>
      `}return{workOrdersPanelTitle:W,myWorkPanelTitle:O,workQueuePanelTitle:C,workQueuePanelSubtitle:N,renderWorkOrderFilterToolbar:Z,renderWorkOrderCollection:ce,renderWorkOrderCard:X,renderCardAssignmentControl:J,renderAssignmentSelect:j,renderWorkOrderAssignmentField:he}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof mt<"u"&&(mt.exports={createWorkQueueDisplayHelpers:l})})()});var kn=U((Mr,Te)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(o=>e.normalizeRole(o.role)==="production").map(o=>({userId:o.user_id,name:e.teamMemberName(o.user_id)})).sort((o,g)=>o.name.localeCompare(g.name))}function t(o){return o.production_action_assigned_to?e.teamMemberName(o.production_action_assigned_to):"Production owner not set"}function a(o){let g=e.activeCompanyRole();return["admin","manager"].includes(g)||o.production_action_assigned_to===e.getSession()?.user?.id}function s(o=""){return n().map(m=>`
        <option value="${e.escapeHtml(m.userId)}" ${m.userId===o?"selected":""}>${e.escapeHtml(m.name)}</option>
      `).join("")}function u(o,g={}){let m=n(),p=g.compact?" compact":"";if(!m.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=m.some(w=>w.userId===o.production_action_assigned_to)?o.production_action_assigned_to:m[0].userId;return`
        <form class="production-action-form${p}" data-production-action-form="${e.escapeHtml(o.id)}">
          <label>Production action
            <textarea name="production_action" rows="${g.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(o.production_action||"")}</textarea>
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
      `}function r(o){return!a(o)||o.status==="completed"?"":o.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(o.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(o.id)}" type="button">Reopen Production Action</button>`}function i(o){let g=o.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${g?"status-completed":"status-open"}">${g?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(o))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(o.production_action)}</p>
        ${g&&o.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(o.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function c(o,g){let m=e.hasProductionAction(o),p=`production-action-dialog-${o.id}`;return`
        <dialog class="production-action-dialog" id="${e.escapeHtml(p)}" data-production-action-dialog="${e.escapeHtml(o.id)}" aria-labelledby="${e.escapeHtml(p)}-title">
          <div class="production-action-dialog-shell">
            <header class="production-action-dialog-header">
              <div>
                <small>Work order action</small>
                <h3 id="${e.escapeHtml(p)}-title">Production Action</h3>
              </div>
              <button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button>
            </header>
            <div class="production-action-dialog-body">
              ${m?i(o):'<p class="muted">No Production Action is assigned.</p>'}
              ${g?`
                <div class="button-row production-action-detail-actions">
                  ${m?r(o):""}
                </div>
                ${u(o)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function d(o){let g=e.canEditOperationalRecords()&&o.status!=="completed",m=e.hasProductionAction(o);if(!m&&!g)return"";let p=o.production_action_status==="completed",h=`production-action-dialog-${o.id}`,w=m?t(o):"Not assigned",y=m?`${w} - ${o.production_action}`:w,_=m?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${p?"is-completed":m?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${m?`<span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(y)}">${e.escapeHtml(y)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(o.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${_}" title="${_}">
            <span aria-hidden="true">${m?"...":"+"}</span>
          </button>
          ${c(o,g)}
        </section>
      `}function f(o){let g=e.canEditOperationalRecords()&&o.status!=="completed";return!e.hasProductionAction(o)&&!g?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(o)?i(o):'<p class="muted">No Production Action is assigned.</p>'}
          ${g?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(o)?r(o):""}
            </div>
            ${u(o)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:d,renderProductionActionDetail:f}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof Te<"u"&&Te.exports&&(Te.exports={createProductionActionDisplayHelpers:l})})()});var _n=U((Dr,ft)=>{(function(){function l(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(c=>String(c||"")),a=e.formatMessageTime||(c=>String(c||"")),s=Math.max(Number(e.visibleLimit)||12,1);function u(){return n().filter(c=>!c.read_at).length}function r(c){return n().some(d=>!d.read_at&&d.kind==="production_action_completed"&&d.work_order_id===c)}function i(){if(!e.getReady?.())return"";let c=n();if(!c.length)return"";let d=u(),f=c.slice(0,s);return`
        <details class="work-notification-panel" ${d?"open":""}>
          <summary>
            <span>Work notifications</span>
            <span>${d?`${d} new`:"Recent"}</span>
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
      `}return{hasUnreadProductionReady:r,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:u}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createWorkOrderNotificationDisplayHelpers:l})})()});var qn=U((Tr,Ie)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:s,teamMemberName:u}){function r(c){return`
        <article class="mini-work-order" data-mini-work-order="${c.id}">
          <strong>${e(c.title)}</strong>
          <span>${n(c.status)} - ${c.due_at||"no due date"}</span>
        </article>
      `}function i(c){let d=(a()[c.id]||[]).length,f=(s()[c.id]||[]).length,o=c.completed_at?new Date(c.completed_at).toLocaleDateString():"",g=c.completed_by?u(c.completed_by):"",m=!g&&c.assigned_to?u(c.assigned_to):"",p=g?` by ${e(g)}`:m?` - owner ${e(m)}`:"",h=c.resolution_summary||c.completion_notes||"";return`
        <article class="mini-work-order ${c.status==="completed"?"completed-history":""}" data-mini-work-order="${c.id}">
          <div class="chip-row">
            <span class="chip ${c.status}">${n(c.status)}</span>
            ${c.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${d?`<span class="relationship-chip parts">${t("parts")}<span>${d}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${t("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(c.title)}</strong>
          <span>${o?`Completed ${o}${p}`:`Due ${c.due_at||"unset"}`}</span>
          ${c.failure_cause?`<p><b>Finding:</b> ${e(c.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:r,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof Ie<"u"&&Ie.exports&&(Ie.exports={createMiniWorkOrderDisplayHelpers:l})})()});var Sn=U((Ir,gt)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:a,getParts:s,getPartDocumentsByPartId:u,getPartDocumentsReady:r,getPendingDeletePartId:i,getShowPartSourceManager:c,getPartCostsReady:d,getPartInventoryFilter:f,getPartSearchQuery:o,partUsageRows:g,canDeleteParts:m,canEditOperationalRecords:p=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:w,renderPartSourceManager:y}){let _=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],$=_.reduce((b,[R,W])=>(b[R]=W.replace(/s$/,""),b),{});function S(b){return b.document_type?b.document_type:String(b.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(b.file_name||"")?"invoice":/receipt/i.test(b.file_name||"")?"receipt":/schematic|diagram/i.test(b.file_name||"")?"schematic":/print|drawing/i.test(b.file_name||"")?"part_print":/manual/i.test(b.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(b.file_name||"")?"spec_sheet":"other"}function P(){return _.map(([b,R])=>`
        <option value="${b}">${e($[b]||R)}</option>
      `).join("")}function q(b){let R=S(b),W=String(b.content_type||"").startsWith("image/"),O=$[R]||"File",C=b.created_at?new Date(b.created_at).toLocaleString():"Uploaded",N=b.file_size_bytes?`${Math.round(Number(b.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${W?"image-file":""}">
          ${W&&b.signedUrl?`<a class="part-document-thumb" href="${e(b.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(b.signedUrl)}" alt="${e(b.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(O)}</span>
              ${N?`<span class="chip">${e(N)}</span>`:""}
            </div>
            <strong>${e(b.file_name)}</strong>
            <span>${e(C)}</span>
            ${b.original_file_name&&b.original_file_name!==b.file_name?`<small>Original: ${e(b.original_file_name)}</small>`:""}
            ${b.signedUrl?`<a href="${e(b.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function v([b,R],W){let O=W.filter(C=>S(C)===b);return O.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(R)}</h4>
            <span>${O.length}</span>
          </div>
          <div class="part-document-grid">
            ${O.map(q).join("")}
          </div>
        </section>
      `:""}function k(b){let R=b.reduce((O,C)=>{let N=S(C);return O[N]=(O[N]||0)+1,O},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(O=>R[O]).map(O=>`<span class="chip">${R[O]} ${e($[O]||"file")}${R[O]===1?"":"s"}</span>`).join("")}function E(b){let R=Number(b.quantity_on_hand)||0,W=Number(b.reorder_point)||0,O=Number(b.unit_cost)||0,C=R<=W,N=Math.max(0,W-R);return`
        <article class="part-card part-tile ${C?"low-stock":""}" data-open-part="${b.id}" tabindex="0" role="button" aria-label="Open ${e(b.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${b.sku?`<span class="chip">${e(b.sku)}</span>`:""}
              ${b.supplier_name?`<span class="chip part-source-chip">${e(b.supplier_name)}</span>`:""}
              ${b.machine_note?`<span class="chip">${e(b.machine_note)}</span>`:""}
              ${C?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(b.name)}</h3>
            <div class="part-card-meta">
              <span>${R} on hand</span>
              <span>reorder at ${W}</span>
              <span>${d()?`${n(O)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${C&&W>0?`<small>Need ${N} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function A(){let b=s().filter(a),R=b.filter(t).length,W=f();return[["All Parts",b.length,"all"],["Low Stock",R,"low"]].map(([O,C,N])=>`
        <button class="parts-health ${N==="low"&&C?"attention":""} ${W===N?"active":""}" data-part-inventory-filter="${N}" type="button">
          <span>${O}</span>
          <strong>${C}</strong>
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
      `}function M(b){let R=Number(b.quantity_on_hand)||0,W=Number(b.reorder_point)||0,O=Number(b.unit_cost)||0,C=u()[b.id]||[],N=k(C),L=p();return`
        <section class="part-detail-shell">
          ${L?h():""}
          ${w()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${b.sku?`<span class="chip">${e(b.sku)}</span>`:""}
                ${b.supplier_name?`<span class="chip part-source-chip">${e(b.supplier_name)}</span>`:""}
                ${b.machine_note?`<span class="chip">${e(b.machine_note)}</span>`:""}
                <span class="chip ${R<=W?"overdue":"open"}">${R<=W?"low stock":"stocked"}</span>
              </div>
              <h3>${e(b.name)}</h3>
              <p>${R} on hand - reorder at ${W}</p>
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
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${R}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${W}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${O}"></label>
            <p class="error-text" data-part-edit-error="${b.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${L&&c()?y():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${C.length} file${C.length===1?"":"s"}</span>
            </div>
            ${L?`<form class="part-document-form" data-part-document="${b.id}">
              <label>File type<select name="document_type">${P()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${b.id}">${r()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${r()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${C.length?_.map(V=>v(V,C)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${L?x(b):""}
        </section>
      `}function x(b){let R=g(b.id).length,W=u()[b.id]||[],O=i()===b.id;return m()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${R?`This part has ${R} usage record${R===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${W.length?` and ${W.length} filed receipt/invoice record${W.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${R?`
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:E,renderPartsHealth:A,renderPartSearch:D,renderPartDetail:M,renderPartDangerZone:x}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createPartsDisplayHelpers:l})})()});var $n=U((Fr,ht)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:a,getAppIssueReportsReady:s,getAppIssueReports:u}){function r(){let d=s();return`
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
            <p class="error-text" id="app-issue-report-error">${d?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${d?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function i(d){let f={open:0,reviewing:1,resolved:2};return[...d].sort((o,g)=>{let m=(f[o.status||"open"]??1)-(f[g.status||"open"]??1);return m||new Date(g.created_at||0)-new Date(o.created_at||0)})}function c(){if(!e())return"";let d=s(),f=u(),o=i(f);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${d?`${f.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${d?`
            <div class="issue-report-list">
              ${o.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:r,renderAppIssueReportsPanel:c,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createAppIssuePanelDisplayHelpers:l})})()});var Cn=U((Lr,yt)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:a,checklistProgress:s,requiredChecklistProgress:u,escapeHtml:r,cleanWorkOrderDescription:i,renderRelationshipChips:c,renderWorkOrderCommandSummary:d,renderWorkOrderRecommendation:f,statusLabel:o,normalizeWorkOrderType:g=W=>String(W||"corrective"),workOrderTypeLabel:m=W=>String(W||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),hasCompletedSafetyDeviceCheck:p,canAssignWorkOrderToMe:h,renderAssetOptions:w,assetLocationRoutingMessage:y,renderWorkOrderAssignmentField:_,requiresSafetyDeviceCheck:$,renderWorkOrderMessages:S,renderProcedureOptions:P,money:q,photoMetaText:v,renderActivityItem:k,canDeleteWorkOrders:E,canEditOperationalRecords:A=()=>!0,renderProductionActionDetail:D=()=>"",hasOpenProductionAction:M=()=>!1}=e;function x(W,O){let C=e.getStepResultsByWorkOrder()[W.id]?.[O.id],N=C?.value||"",L=`data-step-result="${O.id}" data-work-order-id="${W.id}"`,V=`<input ${L} value="${r(N)}" placeholder="Result">`;return O.response_type==="checkbox"&&(V=`<label class="check-row"><input ${L} type="checkbox" ${N==="checked"?"checked":""}> Done</label>`),O.response_type==="pass_fail"&&(V=`
          <select ${L}>
            <option value="">Not checked</option>
            <option value="pass" ${N==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${N==="fail"?"selected":""}>Fail</option>
          </select>
        `),O.response_type==="number"&&(V=`<input ${L} type="number" value="${r(N)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${O.position}. ${r(O.prompt)} ${O.required?'<small class="required-mark">Required</small>':""}</span>
          ${V}
          <small data-checklist-recorded>${C?.completed_at?`Recorded ${new Date(C.completed_at).toLocaleString()}`:""}</small>
        </div>
      `}function b(W){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===W.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${r(W.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${W.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${W.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function R(){let W=e.getActiveWorkOrderId(),C=e.getWorkOrders().find(F=>F.id===W);if(!C)return n();let N=e.getCommentsByWorkOrder(),L=e.getPhotosByWorkOrder(),V=e.getEventsByWorkOrder(),H=e.getPartsUsedByWorkOrder(),Z=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),ce=e.getWorkOrderActionWarning(),X=e.getParts(),J=e.getProfilesByUserId(),j=e.getCommentsError(),me=e.STATUS_OPTIONS||[],he=e.TYPE_OPTIONS||[],I=N[C.id]||[],B=L[C.id]||[],z=V[C.id]||[],Y=H[C.id]||[],K=Y.reduce((F,se)=>F+(Number(se.quantity_used)||0)*t(se),0),ne=Y.reduce((F,se)=>F+(Number(se.quantity_used)||0),0),G=a(I,B,z,Y),oe=Z.find(F=>F.id===C.procedure_template_id),ee=oe?s(C,oe):null,pe=oe?u(C,oe):null,ae=A();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${C.priority}">${C.priority}</span>
            <span class="chip">${r(m(C.type))}</span>
            <span class="chip ${C.status}">${o(C.status)}</span>
          </div>
          <h2>${r(C.title)}</h2>
          ${C.preventive_source_id?`<p class="completion-note" data-pm-source>PM: ${r(C.preventive_source_title||"Preventive schedule")} - Scheduled ${r(C.preventive_due_at||"unset")}${C.preventive_schedule_id?' <button class="text-button" data-search-section="pm" type="button">PM Schedules</button>':" - Schedule deleted"}</p>`:""}
          <p>${r(i(C.description)||"No description.")}</p>
          ${c(C)}
          ${C.completed_at?`<p class="completion-note">Completed ${new Date(C.completed_at).toLocaleString()} \xC2\xB7 ${C.actual_minutes||0} min</p>`:""}
          ${C.asset_id&&p(C)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${C.completion_notes?`<p>${r(C.completion_notes)}</p>`:""}
        </div>

        ${d(C)}
        ${f(C)}
        ${D(C)}

        ${C.completed_at&&(C.failure_cause||C.resolution_summary||C.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${C.failure_cause?`<article><span>Cause</span><strong>${r(C.failure_cause)}</strong></article>`:""}
            ${C.resolution_summary?`<article><span>Resolution</span><strong>${r(C.resolution_summary)}</strong></article>`:""}
            ${C.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${ae?`<label>Status
          <select id="status-select">
            ${me.map(F=>`<option value="${F}" ${F===C.status?"selected":""} ${F==="completed"&&M(C)?"disabled":""}>${o(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${ae?`<div class="quick-actions detail-quick-actions">
          ${h(C)?`<button class="assign-action" data-assign-me="${C.id}" type="button">${C.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${me.filter(F=>F!==C.status&&!(F==="completed"&&M(C))).map(F=>`
            <button data-quick-status="${F}" data-id="${C.id}" type="button">${o(F)}</button>
          `).join("")}
        </div>`:""}
        ${re===C.id&&ce?`<p class="error-text action-warning">${r(ce)}</p>`:""}

        ${ae?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${r(C.title)}"></label>
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
                    ${w(C.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${r(y(C.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(C.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${r(C.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${me.map(F=>`<option value="${F}" ${F===C.status?"selected":""} ${F==="completed"&&M(C)?"disabled":""}>${o(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===C.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${_(C,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${P(C.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${C.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${$(C)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${C.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:`<div class="safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>${C.asset_id?"This equipment does not require the equipment safety check.":"No machine / equipment selected, so no equipment safety check is required."}</span></div>`}
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

        ${S(C)}

        ${ae?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${r(C.title)}"></label>
          <label>Description<textarea name="description" rows="3">${r(i(C.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${r(C.due_at||"")}">
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
              ${he.map(F=>`<option value="${F}" ${F===g(C.type)?"selected":""}>${m(F)}</option>`).join("")}
            </select>
          </label>
          ${_(C)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${P(C.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${r(C.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(C.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${C.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${$(C)?`
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

        ${oe?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${r(oe.name)}</h3>
              <span data-checklist-summary>${ee.done} of ${ee.total} complete - required ${pe.done}/${pe.total}</span>
            </div>
            <div class="checklist-list">
              ${ae&&e.checklistToolsReady?.()===!1?e.renderChecklistLoading():oe.procedure_steps.map(F=>ae?x(C,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${r(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${r(e.getStepResultsByWorkOrder()[C.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${ae&&C.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${pe?.total?`<p class="${pe.done===pe.total?"completion-note":"warning-text"}">Required checklist: ${pe.done}/${pe.total}</p>`:""}
            ${M(C)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${C.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${$(C)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${p(C)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${M(C)?"disabled":""}>Complete Work Order</button>
          </form>
          </details>
        `:""}

        <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
          <summary>Parts Used</summary>
        ${ae?`<form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${X.map(F=>`<option value="${F.id}">${r(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${Y.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${q(K)}</span></article>`:""}
          ${Y.map(F=>`
            <article class="relationship-detail parts">
              <strong>${r(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${q((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${r(J[F.created_by]?.full_name||"Team member")}</small>
            </article>
          `).join("")||'<p class="muted">No parts used yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos</summary>
        ${ae?`<form class="form-grid relationship-detail photo" id="photo-form">
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
                <span>${v(F)}</span>
                ${F.signedUrl?`<a href="${r(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${ae?`<button class="text-button danger-link" data-delete-work-order-photo="${r(F.id||"")}" data-work-order-photo-path="${r(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
              </article>
            `).join("")||'<p class="muted">No photos uploaded yet.</p>'}
          </div>
        </div>
        </details>

        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        ${ae?`<form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>`:""}
        <div class="comment-list">
          ${I.map(F=>`
            <article class="relationship-detail comment">
              <strong>${r(J[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${r(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${j?`<p class="error-text">${r(j)}</p>`:""}
          ${G.map(k).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${ae&&E()?b(C):""}
      </div>
    `}return{renderWorkOrderDetail:R}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createWorkOrderDetailDisplayHelpers:l})})()});var An=U((Nr,wt)=>{(function(){function l(){function e(){return`
        <section class="equipment-structure-guide" aria-label="Equipment structure guide">
          <div class="guide-header">
            <span class="guide-kicker">Structure Guide</span>
            <strong>How to model primary equipment, mobile lifts, sub equipment, tooling, components, parts, and shop items</strong>
          </div>
          <div class="equipment-structure-grid">
            <article>
              <span>Primary</span>
              <strong>Main machine or production line</strong>
              <p>Use for the main equipment that maintenance work is tied to, such as a roll former, ASC line, folder, or press.</p>
            </article>
            <article>
              <span>Forklift / Mobile Lift</span>
              <strong>Mobile lifting equipment</strong>
              <p>Use for forklifts, piggybacks, scissor lifts, Combi, and other mobile lift equipment that need maintenance or service history.</p>
            </article>
            <article>
              <span>Sub Equipment</span>
              <strong>Major machine section or system</strong>
              <p>Use for major sections such as an uncoiler, shear, conveyor, hydraulic system or HPU, controls cabinet, or machine controller.</p>
              <p><strong>Sub equipment can belong to a primary machine OR to another sub-equipment record. It is not limited to one level.</strong></p>
            </article>
            <article>
              <span>Tooling / Setup</span>
              <strong>Changeable machine setup</strong>
              <p>Use for roll form tooling, die sets, profiles, shear guides, or other setups that are changed between jobs.</p>
            </article>
            <article>
              <span>Component</span>
              <strong>Maintainable device or assembly within equipment</strong>
              <p>Use for motors, pumps, cylinders, gearboxes, valve blocks, PLCs, or VFDs that need their own maintenance history.</p>
            </article>
            <article>
              <span>Part</span>
              <strong>Replaceable or stocked item</strong>
              <p>Use for hoses, bearings, belts, sensors, fuses, filters, seals, bolts, and other replacement parts. Track these in Parts and link them to equipment; they are not another equipment level.</p>
            </article>
            <article>
              <span>Shop Item</span>
              <strong>Standalone tool or support equipment</strong>
              <p>Use for saws, nail guns, drills, welding units, banders, banding carts, and other standalone shop equipment worth tracking.</p>
            </article>
          </div>
          <p class="guide-note"><strong>Example hierarchy:</strong> Roll Former (Primary) &rarr; Decoiler (Sub Equipment) &rarr; Hydraulic System (Sub Equipment) &rarr; Hydraulic Pump (Component). Related part: Hydraulic Hose, linked to the pump in Parts.</p>
          <p class="guide-note"><strong>Quick rule:</strong> Primary = main machine. Forklift / Mobile Lift = mobile lifting equipment. Sub Equipment = major machine section or system. Tooling / Setup = changeable setup. Component = maintainable device or assembly. Part = replaceable or stocked item. Shop Item = standalone shop tool or support equipment.</p>
          <p class="guide-note"><strong>Roll former rule:</strong> station = position on the machine. Track it separately only if it needs its own maintenance history.</p>
        </section>
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var Pn=U((Ur,bt)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:a,escapeHtml:s,assetTypeLabel:u,renderParentAssetOptions:r,renderLocationOptions:i,renderAssetAreaOptions:c,assetStatusLabel:d,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:o,canDeleteEquipment:g,canEditEquipmentRecords:m=()=>!0,renderEquipmentStructureGuide:p,renderProcedureOptions:h}=e;function w(){let k=new Date;return new Date(k.getTime()-k.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function y(){return m()?`<form class="inline-form" id="create-asset-form">
        <input name="name" required placeholder="Machine or equipment name">
        <input name="asset_code" placeholder="Serial number">
        <input name="asset_tag" aria-label="Asset tag" placeholder="Asset tag (optional)">
        <input name="manufacturer" placeholder="Manufacturer">
        <input name="model" placeholder="Model">
        <select name="location_existing" aria-label="Area / spot"><option value="">Area / spot unset</option>${c()}</select>
        <input name="location_new" placeholder="New area / spot">
        <select name="asset_type" aria-label="Equipment type">${e.ASSET_TYPE_OPTIONS.map(k=>`<option value="${k}">${u(k)}</option>`).join("")}</select>
        <select name="parent_asset_id" aria-label="Part of equipment"><option value="">Top level equipment</option>${r()}</select>
        <select name="location_id" ${e.getLocations().length?"required":"disabled"}>${i()}</select>
        <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety device identification</label>
        <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
        <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form><p class="error-text" id="asset-create-error"></p>`:'<p class="muted">Accounting can view equipment here. Maintenance and admins manage operational equipment changes.</p>'}function _(k,E,A){let D=E.some(R=>R.event_type==="created"),M=k.created_at&&!D?[{id:`${k.id}-created`,event_type:"created",summary:`${u(k.asset_type)} created.`,actor_id:k.created_by||"",created_at:k.created_at}]:[];return{equipmentHistory:[...E,...M].sort((R,W)=>new Date(W.created_at||0)-new Date(R.created_at||0)),historyActorLabel:R=>R.actor_id&&A[R.actor_id]?.full_name?A[R.actor_id].full_name:R.actor_id?`User ${String(R.actor_id).slice(0,8)}`:R.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function $(k,E){return k.map(A=>`
        <article>
          <strong>${s(String(A.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${A.created_at?new Date(A.created_at).toLocaleString():"time unavailable"} &middot; ${s(E(A))}</span>
          <p>${s(A.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function S(){let k=e.getAssets(),E=e.getActiveAssetId(),A=k.find(H=>H.id===E);if(!A)return n();let D=e.getAssetEventsReady?.()!==!1,M=e.getProfilesByUserId?.()||{},x=(e.getAssetEventsByAssetId?.()[A.id]||[]).sort((H,Z)=>new Date(Z.created_at||0)-new Date(H.created_at||0)),{equipmentHistory:b,historyActorLabel:R}=_(A,x,M),W=e.LIST_ITEMS_PER_PAGE||12,O=Math.max(1,Math.ceil(b.length/W)),C=Math.min(Math.max(1,e.getAssetRelationshipPage?.(A.id,"asset-history")||1),O),N=b.length?(C-1)*W+1:0,L=Math.min(b.length,C*W),V=b.slice((C-1)*W,C*W);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(A.name)} - ${b.length} event${b.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(A.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${D?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${$(V,R)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${b.length>W?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(A.id)}" type="button" ${C<=1?"disabled":""}>Previous</button>
                <span>Showing ${N}-${L} of ${b.length} - Page ${C} of ${O}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(A.id)}" type="button" ${C>=O?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function P(){let k=e.getAssets(),E=e.getActiveAssetId(),A=k.find(T=>T.id===E);if(!A)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(A.id);let D=e.getWorkOrders(),M=e.getPreventiveSchedules(),x=e.getParts(),b=e.getAssetParts(),R=e.getAssetPartsReady(),W=e.getAssetDocumentsByAssetId?.()[A.id]||[],O=e.getAssetDocumentsReady?.()!==!1,C=e.getAssetEventsReady?.()!==!1,N=e.getProfilesByUserId?.()||{},L=e.getPartsUsedByWorkOrder(),V=e.getLocations(),H=e.getActiveLocationId(),Z=e.ASSET_TYPE_OPTIONS||[],re=t(A),ce=a(A.id),X=D.filter(T=>T.asset_id===A.id),J=e.getAssetWorkHistory?.(A.id),j=!J||J.historyStatus==="ready",me=J?J.rows:X,he=J?.historyStatus==="error"?'<p class="error-text" role="alert">Could not load work history.</p>':'<p class="muted" role="status">Loading work history...</p>',I=me.filter(T=>T.status!=="completed").sort((T,ue)=>new Date(ue.created_at||0)-new Date(T.created_at||0)),B=me.filter(T=>T.status==="completed").sort((T,ue)=>new Date(ue.completed_at||ue.created_at||0)-new Date(T.completed_at||T.created_at||0)),z=M.filter(T=>T.asset_id===A.id),Y=Object.values(L).flat().filter(T=>X.some(ue=>ue.id===T.work_order_id)),K=b.filter(T=>T.asset_id===A.id),ne=new Set(K.map(T=>T.part_id)),G=x.filter(T=>!ne.has(T.id)),oe=(e.getAssetEventsByAssetId?.()[A.id]||[]).sort((T,ue)=>new Date(ue.created_at||0)-new Date(T.created_at||0)),{equipmentHistory:ee}=_(A,oe,N),pe=(T,ue)=>J?J.countsStatus==="ready"?J.counts[T]:J.countsStatus==="error"?"Unavailable":"Loading...":ue,ae=T=>`data-asset-work-count="${s(A.id)}" data-work-count-kind="${T}"`,F=e.LIST_ITEMS_PER_PAGE||12,se=T=>e.getAssetRelationshipOpen?.(A.id,T)||!1,fe=(T,ue)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(A.id,T)||1),Math.max(1,Math.ceil(ue/F))),ye=(T,ue)=>{let we=fe(ue,T.length);return T.slice((we-1)*F,we*F)},de=(T,ue)=>{if(ue<=F)return"";let we=fe(T,ue),St=Math.max(1,Math.ceil(ue/F)),xn=(we-1)*F+1,Mn=Math.min(ue,we*F);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(A.id)}" data-asset-relation-section="${s(T)}" type="button" ${we<=1?"disabled":""}>Previous</button>
            <span>Showing ${xn}-${Mn} of ${ue} - Page ${we} of ${St}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(A.id)}" data-asset-relation-section="${s(T)}" type="button" ${we>=St?"disabled":""}>Next</button>
          </div>
        `},be=T=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(T)}" data-asset-id="${s(A.id)}" ${se(T)?"open":""}`,ie=V.find(T=>T.id===A.location_id)?.name||A.location||"No location set",ge=re?re.name:"Top level equipment",ve=A.status==="offline"?"status-blocked":A.status==="degraded"?"status-open":A.status==="watch"?"status-in_progress":"status-completed",le=A.status==="degraded"&&pe("open",I.length)===0,te=m();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${A.status}">${s(d(A.status))}</span>
              <span class="chip">${s(u(A.asset_type))}</span>
              ${A.asset_code?`<span class="chip">${s(A.asset_code)}</span>`:""}
              ${A.asset_tag?`<span class="chip">Asset tag: ${s(A.asset_tag)}</span>`:""}
              ${A.manufacturer?`<span class="chip">${s(A.manufacturer)}</span>`:""}
              ${A.model?`<span class="chip">${s(A.model)}</span>`:""}
              ${A.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(A.name)}</h2>
            <p>${s(A.location||"No location set")}</p>
            ${re?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(re.id)}" type="button">${s(re.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${ve}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(d(A.status))}</strong>
              <small>${A.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(ie)}</strong>
              <small>${A.location?s(A.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(ge)}</strong>
              <small>${re?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${ce.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${ce.length}</strong>
              <small>${ce.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${K.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${K.length}</strong>
              <small>${K.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${pe("open",I.length)===0?"empty":""}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong ${ae("open")}>${pe("open",I.length)}</strong>
              <small>Active work tied to this equipment</small>
            </button>
            <button class="command-card command-photo ${W.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${W.length}</strong>
              <small>${W.length?"Machine files on record":"No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${le&&te?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${s(A.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${p?p():""}

          ${te?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${A.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${W.length} file${W.length===1?"":"s"}</span>
            </div>
            ${te?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(A.id)}">
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
              <p class="error-text" data-asset-document-error="${s(A.id)}">${O?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${O?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${W.map(T=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(T.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(T.content_type||"").startsWith("image/")&&T.signedUrl?`<img src="${s(T.signedUrl)}" alt="${s(T.original_file_name||T.file_name||A.name)}">`:`<strong>${s(v(T.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(v(T.document_type))}</strong>
                      <span>${s(T.original_file_name||T.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(T.content_type||"").startsWith("image/")&&T.signedUrl?`<img src="${s(T.signedUrl)}" alt="${s(T.original_file_name||T.file_name||A.name)}">`:`<div class="asset-file-document-preview">${s(v(T.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${s(T.content_type||"file")}</span>
                      <a class="secondary-button" href="${s(T.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${te?`<button class="text-button danger-link" data-delete-asset-document="${s(T.id)}" data-asset-document-path="${s(T.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${te?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${s(A.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(A.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${s(A.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(A.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(A.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${Z.map(T=>`<option value="${T}" ${T===(A.asset_type||"machine")?"selected":""}>${u(T)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${r(A.parent_asset_id||"",A.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${V.length?"":"disabled"}>
                ${i(A.location_id||H)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${c(A.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(T=>`<option value="${T}" ${T===A.status?"selected":""}>${d(T)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${A.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${ce.map(T=>`
                <article class="mini-work-order" data-open-asset="${s(T.id)}">
                  <strong>${s(T.name)}</strong>
                  <span>${s(u(T.asset_type))} - ${s(d(T.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${be("open-work")} id="asset-open-work-target">
            <summary>Open Work <span ${ae("open")}>${pe("open",I.length)}</span></summary>
            <div class="mini-list">
              ${se("open-work")?j?ye(I,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':he:'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${se("open-work")&&j?de("open-work",I.length):""}
          </details>

          <details ${be("completed-history")}>
            <summary>Completed History <span ${ae("completed")}>${pe("completed",B.length)}</span></summary>
            <div class="mini-list">
              ${se("completed-history")?j?ye(B,"completed-history").map(f).join("")||'<p class="muted">No completed work yet.</p>':he:'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${se("completed-history")&&j?de("completed-history",B.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${ee.length} event${ee.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(A.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${C?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure" data-asset-pm-schedules="${s(A.id)}">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${e.getSchedulesReady?.()===!1?"Unavailable":`${z.length} schedule${z.length===1?"":"s"}`}</span>
                ${te?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${te&&e.canCreatePreventiveSchedule?.()===!1?e.renderMaintenanceLoading():""}
            ${te&&e.canCreatePreventiveSchedule?.()!==!1?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(A.id)}">
              <input name="title" required placeholder="PM for ${s(A.name)}">
              <input name="asset_id" type="hidden" value="${s(A.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${h?h():'<option value="">No procedure checklist</option>'}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${w()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
              <button class="secondary-button" type="reset">Clear Form</button>
            </form>`:""}
            <div class="mini-list">
              ${e.getSchedulesReady?.()===!1?'<p class="error-text" role="alert">PM schedules could not be loaded.</p>':ye(z,"pm-schedules").map(T=>`<article><strong>${s(T.title)}</strong><span>${s(T.frequency||"")} - next due ${s(T.next_due_at||"")}</span>${T.active===!1?'<span class="chip">Inactive</span>':""}</article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
            ${de("pm-schedules",z.length)}
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(A.id)}" ${se("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${K.length}</span></summary>
            <div class="panel-header compact">
              ${te?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${R?`
              ${te?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(A.id)}">
                <label>Part
                  <select name="part_id" ${G.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${G.map(T=>`<option value="${s(T.id)}">${s(T.name)}${T.sku?` - ${s(T.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${G.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${s(A.id)}"></p>
              <div class="mini-list">
                ${ye(K,"linked-parts").map(T=>`<article>
                  <strong>${s(T.parts?.name||"Part")}</strong>
                  <span>${s(T.parts?.sku||"No SKU")} - recommended qty ${s(T.quantity_recommended||1)}${T.note?` - ${s(T.note)}`:""}</span>
                  ${te?`<button class="text-button danger-link" data-remove-asset-part="${s(T.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${de("linked-parts",K.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(A.id)}" ${se("parts-used")?"open":""}>
            <summary>Parts Used History <span>${j?Y.length:"Not loaded"}</span></summary>
            <div class="mini-list">
              ${se("parts-used")?j?ye(Y,"parts-used").map(T=>`<article><strong>${s(T.parts?.name||"Part")}</strong><span>${T.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':he:'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${se("parts-used")&&j?de("parts-used",Y.length):""}
          </details>

          ${te?q(A):""}
        </div>
      `}function q(k){let E=e.getWorkOrders(),A=e.getPreventiveSchedules(),D=e.getAssets(),M=e.getActiveAssetId(),x=E.filter(N=>N.asset_id===k.id).length,b=A.filter(N=>N.asset_id===k.id).length,R=D.filter(N=>N.parent_asset_id===k.id).length,W=e.getMaintenanceRequests().filter(N=>N.asset_id===k.id).length,O=o({workOrders:x,children:R,schedules:b,requests:W}),C=e.getPendingDeleteAssetId()===M;return g()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${O||`This permanently removes "${s(k.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${O?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:C?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${s(k.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${s(k.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${s(k.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function v(k){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[k]||"File"}return{renderAssetDetail:P,renderAssetHistoryScreen:S,renderCreateAssetForm:y}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createAssetDetailDisplayHelpers:l})})()});var En=U((Qr,vt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:a,statusLabel:s,workOrderTypeLabel:u=o=>String(o||"corrective").replace(/\b\w/g,g=>g.toUpperCase()),renderAssignmentSelect:r,renderProcedureOptions:i,escapeHtml:c}=e;function d(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getParts();return`
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
                  ${n.map(g=>`<option value="${g}" ${g==="open"?"selected":""}>${s(g)}</option>`).join("")}
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
                  ${t.map(g=>`<option value="${g}">${u(g)}</option>`).join("")}
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
                  ${o.map(g=>`<option value="${g.id}">${c(g.name)} (${g.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var Rn=U((Br,kt)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:a,escapeHtml:s,renderAssignmentSelect:u,renderProcedureOptions:r,assetStatusLabel:i,workOrderTypeLabel:c=o=>String(o||"corrective").replace(/\b\w/g,g=>g.toUpperCase())}=e;function d(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getQuickFixAssetId(),g=e.getQuickFixRequestId(),m=e.getMaintenanceRequests(),p=e.getSession(),h=e.getParts(),w=o||"",y=m.find(_=>_.id===g);return`
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${y?`<p class="completion-note">Resolving request: ${s(y.title)}</p>`:""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${s(y?.title||"")}"></label>
          <label>Description<textarea name="description" rows="3" placeholder="Describe what happened, where it happened, and what should be checked.">${s(y?.description||"")}</textarea></label>
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
                  ${t(w||y?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${s(a(w||y?.asset_id||""))}</p>
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
                  ${["medium","high","critical","low"].map(_=>`<option value="${_}">${_}</option>`).join("")}
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${n.map(_=>`<option value="${_}" ${_==="corrective"?"selected":""}>${c(_)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${u(p.user.id,{selfLabel:"Assign to me"})}
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
                  ${["running","watch","degraded","offline"].map(_=>`<option value="${_}">${i(_)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${h.map(_=>`<option value="${_.id}">${s(_.name)} (${_.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof kt<"u"&&(kt.exports={createQuickFixDisplayHelpers:l})})()});var On=U((jr,_t)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(f){return`
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
      `}function s(f,o=""){let g=f==="signup";return`
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${g?"Create Account":"Welcome Back"}</h1>
                <p>${g?"Start with email and password.":"Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${g?'<label>Full name<input name="fullName" required autocomplete="name"></label>':""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${g?"new-password":"current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${n(o)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${g?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${g?"I already have an account":"Create an account"}</button>
            ${g?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function u(f){return`
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
      `}function c(f={}){let o=!!f.ready,g=f.initialError||"";return`
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
            <p class="error-text" id="auth-error">${n(g)}</p>
            <p class="muted auth-status" id="auth-status">${o?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${o?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function d(f=""){return`
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
      `}return{workspaceLoading:t,workspaceLoadError:a,authForm:s,authCallback:u,authCallbackError:r,passwordResetRequest:i,passwordRecovery:c,companyCreate:d}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof _t<"u"&&(_t.exports={createAuthDisplayHelpers:l})})()});var Wn=U((zr,qt)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,a=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),u=e.getPublicRequestLinksReady||(()=>!0),r=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),c=e.canManageTeam||(()=>!1),d=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,o=e.publicRequestUrl,g=e.publicRequestQrUrl;function m(){return`
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
      `}function p(P,q){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(P.location_name)}</h1>
                <p>${n(P.company_name)}</p>
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
      `}function w(P){return`
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(P.company_name)}</h1>
                <p>${n(P.location_name)} maintenance request</p>
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
      `}function y(P){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${n(P)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function _(P,q=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(P.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${q?`<p class="error-text">${n(q)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function $(){if(!c())return"";let P=f(),q=a(),v=u();return`
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
          ${P?`<p class="muted">QR codes will point to ${n(P)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${v?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${q.map(S).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function S(P){let q=s().find(M=>M.location_id===P.id),v=!!(q&&q.is_active!==!1),k=d(),E=v?o(q.token):"",A=v?g(q.token):"",D=!!(E&&A);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(P.name)}</strong>
            <span>${v?"External request link active":q?"Request link disabled":"No request link yet"}</span>
            ${q?.last_used_at?`<span>Last used ${new Date(q.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${v?`
            <div class="qr-preview">${D?t(E):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(A||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${D?"":"disabled-link"}" href="${n(A||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(A)}" type="button" ${D?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${D?"":"disabled-link"}" href="${n(E||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${k?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(q.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(q.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:q?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${k?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(q.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(q.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(P.id)}" type="button" ${u()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:m,publicRequestQrPage:p,loadingRequestForm:h,publicRequestForm:w,publicRequestError:y,publicRequestSuccess:_,publicRequestLinkManager:$,publicRequestLocationCard:S}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof qt<"u"&&(qt.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(c){return String(c||"").replace(/\/+$/,"")}function n(c=l.location,d=l.PUBLIC_APP_URL){if(d)return`${e(d)}/`;let f=c?.origin||"",o=c?.pathname||"/",m=o.indexOf("/auth/callback");if(m>=0)return`${f}${o.slice(0,m+1)}`;let p=o.endsWith("/")?o:o.replace(/[^/]*$/,"");return`${f}${p||"/"}`}function t(c=l.location,d=l.PUBLIC_APP_URL){return`${n(c,d)}auth/callback/`}function a(c={},d=l.location,f=l.PUBLIC_APP_URL){let o=new URL(n(d,f));return Object.entries(c).forEach(([g,m])=>{m!=null&&m!==""&&o.searchParams.set(g,m)}),o.href}function s(c){let d=new URL(c),f=new URLSearchParams(d.hash.replace(/^#/,"")),o=d.searchParams;return{code:o.get("code")||"",type:f.get("type")||o.get("type")||"",accessToken:f.get("access_token")||o.get("access_token")||"",refreshToken:f.get("refresh_token")||o.get("refresh_token")||"",error:f.get("error")||o.get("error")||"",errorCode:f.get("error_code")||o.get("error_code")||"",errorDescription:f.get("error_description")||o.get("error_description")||""}}function u(c){return!!(c?.code||c?.accessToken&&c?.refreshToken||c?.error||c?.errorDescription)}function r(c){return c?.type==="recovery"||!c?.type&&!!(c?.accessToken&&c?.refreshToken)}function i(c=l.location){let d=new URL(c.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>d.searchParams.delete(f)),d.hash="",d.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:a,authParamsFromHref:s,isAuthCallbackParams:u,isPasswordRecoveryParams:r,cleanAuthUrl:i}})(window);var ke="maintainops.equipmentCreateDraft.v1:",Ct=new Set(["name","asset_code","asset_tag","manufacturer","model","location_existing","location_new","asset_type","parent_asset_id","location_id","safety_devices_required"]);function At(l){return Fe({...l,selector:"#create-asset-form, [data-create-pm-form], #create-procedure-form, [data-add-step]",getFormKey:e=>e.id==="create-asset-form"?"":e.dataset.addStep?`:step:${e.dataset.addStep}`:e.hasAttribute("data-create-pm-form")?`:pm:${e.dataset.equipmentPmForm||"new"}`:":procedure",fieldNames:[...Ct,"title","asset_id","frequency","next_due_at","procedure_template_id","description","prompt","response_type","required"]})}function Fe({documentRef:l=document,getScope:e,storage:n=()=>sessionStorage,now:t=Date.now,selector:a="#create-asset-form",getFormKey:s=()=>"",fieldNames:u=Ct}){let r=new Map,i=new Set(u),c,d=()=>[...l.querySelectorAll(a)],f=q=>e()?e()+s(q):"",o=q=>d().find(v=>v.dataset.equipmentScope===q),g=q=>[...q.querySelectorAll("[name]")].filter(v=>i.has(v.name)&&!["file","hidden"].includes(v.type)),m=q=>g(q).map(v=>[v.name,v.type==="checkbox"?v.checked:v.value]);function p(q){r.delete(q);try{n().removeItem(ke+q)}catch{}}function h(q){try{let k=n().getItem(ke+q);!r.has(q)&&k&&k.length<1e5&&r.set(q,JSON.parse(k))}catch{}let v=r.get(q);return!v||!Number.isFinite(v.at)||v.at>t()||t()-v.at>864e5||!Array.isArray(v.fields)||!v.fields.every(k=>Array.isArray(k)&&i.has(k[0])&&(k[0]==="safety_devices_required"?typeof k[1]=="boolean":typeof k[1]=="string"))?(p(q),null):v}function w(q){let v=q?.dataset.equipmentScope;if(!v||v!==f(q))return;let k={at:t(),fields:m(q)};r.set(v,k);try{n().setItem(ke+v,JSON.stringify(k))}catch{}return{scope:v,fields:JSON.stringify(k.fields)}}function y(){let q=l.activeElement,v=d();for(let A of v)A.dataset.equipmentDirty&&w(A);let k=v.find(A=>A.contains(q)),E=k?q.getBoundingClientRect():null;c=E&&k.dataset.equipmentScope===f(k)&&E.bottom>0&&E.top<l.defaultView.innerHeight?{scope:f(k),name:q.name,start:q.selectionStart,end:q.selectionEnd}:null}function _(){for(let q of d())$(q);c=null}function $(q){let v=f(q);if(!v)return;q.dataset.equipmentScope=v;let k=h(v);if(k){for(let[A,D]of k.fields){let M=g(q).find(x=>x.name===A);M&&(M.type==="checkbox"?M.checked=D:(M.value=D,M.tagName==="SELECT"&&![...M.options].some(x=>x.value===D)&&M.setCustomValidity("Choose an available option.")))}q.dataset.equipmentDirty="true"}let E=c?.scope===v&&g(q).find(A=>A.name===c.name);E&&(c.start!=null&&E.setSelectionRange(c.start,c.end),E.focus({preventScroll:!0}))}function S(q){if(!q||JSON.stringify(h(q.scope)?.fields)!==q.fields)return;let v=o(q.scope);if(v?.dataset.equipmentScope===q.scope&&JSON.stringify(m(v))!==q.fields){w(v);return}p(q.scope),v?.dataset.equipmentScope===q.scope&&v.reset()}function P(){r.clear(),c=null;try{let q=n();for(let v=q.length-1;v>=0;v--)(q.key(v)?.startsWith(ke)||q.key(v)?.startsWith("maintainops.checklistResponseDraft.v1:"))&&q.removeItem(q.key(v))}catch{}}for(let q of["input","change"])l.addEventListener(q,v=>{let k=v.target.form;!k?.matches(a)||!i.has(v.target.name)||(v.target.setCustomValidity(""),k.dataset.equipmentDirty="true",w(k))});return l.addEventListener("reset",q=>{let v=q.target;!v.matches(a)||v.dataset.equipmentScope!==f(v)||(p(v.dataset.equipmentScope),delete v.dataset.equipmentDirty,g(v).forEach(k=>k.setCustomValidity("")))}),l.defaultView.addEventListener("pagehide",y),l.addEventListener("visibilitychange",()=>{l.hidden&&y()}),{capture:y,restore:_,snapshot:w,clear:S,reset:P}}function Pt({getScope:l,getCompanyId:e,client:n,applyResults:t}){let a,s=new Set,u=new Map;function r(){let c=l();return a!==c&&(a=c,s.clear(),u.clear()),c}async function i(c){if(!c.length)return;let d=r(),f=e(),o=[],g={},m=new Set,p;c.forEach(w=>u.set(w,g));let h=()=>c.filter(w=>u.get(w)===g);try{for(;;){let{data:y,count:_,error:$}=await n().from("work_order_step_results").select("*",{count:"exact"}).eq("company_id",f).in("work_order_id",c).order("id").range(o.length,o.length+999);if(d!==r())return;if($)throw $;if(!Number.isInteger(_)||_<0)throw Error("Checklist result count unavailable.");if(p!==void 0&&p!==_)throw Error("Checklist results changed while loading.");if(p=_,!Array.isArray(y)||o.length+y.length>_)throw Error("Checklist result page invalid.");for(let S of y){if(!S.id||m.has(S.id)||!c.includes(S.work_order_id))throw Error("Checklist result page invalid.");m.add(S.id)}if(o.push(...y||[]),o.length>=_)break;if(!y?.length)throw Error("Checklist results were incomplete.")}let w=h();w.forEach(y=>s.delete(y)),w.length&&t(w,o.filter(y=>w.includes(y.work_order_id)))}catch(w){throw d===r()&&h().forEach(y=>s.add(y)),w}}return{load:i,hasError(c){return r(),s.has(c)}}}async function Et(l,e,n=()=>""){let t=[],a=new Set,s,u=r=>({data:[],error:{code:"INCOMPLETE_WORKSPACE_DATA",message:`${l} could not be fully loaded: ${r} Refresh and try again.`}});try{for(;;){let r=await e().range(t.length,t.length+999);if(r.error)return{...r,data:[]};if(!Number.isSafeInteger(r.count)||r.count<0)return u("the exact row count is unavailable.");if(!Array.isArray(r.data))return u("the server returned an invalid page.");if(s===void 0&&(s=r.count),r.count!==s)return u("records changed while loading.");if(t.length+r.data.length>s||r.data.length>1e3)return u("the page does not match its row count.");if(!r.data.length&&t.length<s)return u(`only ${t.length} of ${s} records arrived.`);for(let i of r.data){if(!i?.id||a.has(i.id))return u("a page contained missing or repeated record IDs.");let c=n(i);if(c)return u(c);a.add(i.id)}if(t.push(...r.data),t.length===s)return{...r,data:t}}}catch(r){return{data:[],error:r}}}function Rt(l){let e=l.procedure_step_count?.[0]?.count,n=l.procedure_steps;return!Number.isSafeInteger(e)||e<0||!Array.isArray(n)?`the step count for procedure ${l.id} is unavailable.`:n.length!==e||new Set(n.map(t=>t?.id)).size!==e||n.some(t=>!t?.id)?`procedure ${l.id} returned ${n.length} of ${e} steps; the embedded checklist may be capped.`:""}(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l(v){return String(v||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(v){return v.toISOString().slice(0,10)}function n(v){return v.toISOString()}function t(v){let k=new Date;return k.setDate(k.getDate()-v),k}function a(){let v=new Date;return new Date(v.getFullYear(),v.getMonth(),1)}function s(v=new Date){let k=new Date(v);k.setHours(0,0,0,0),k.setDate(k.getDate()-k.getDay());let E=new Date(k);return E.setDate(E.getDate()+7),{start:k,end:E}}function u(v,k){let E=[];for(let A=0;A<v.length;A+=k)E.push(v.slice(A,A+k));return E}function r(v){return i(v).replace(/\.[^/.]+$/,"")||"photo"}function i(v){return String(v||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function c(v){return v==="active"||v==="all"?"Active":v==="overdue"?"Overdue":v==="completed"?"All Completed":v==="completed_month"?"Completed Month":v==="completed_week"?"Done This Week":v==="open"?"New":String(v||"").replaceAll("_"," ").replace(/\b\w/g,k=>k.toUpperCase())}function d(v){let k=String(v||"corrective").trim().toLowerCase();return k==="inspection"?"preventive":k==="reactive"||k==="request"?"corrective":["corrective","preventive","fabrication"].includes(k)?k:"corrective"}function f(v){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[d(v)]}function o(v){let k=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],E=String(v||"technician").trim().toLowerCase();return E==="member"?"technician":k.includes(E)?E:"technician"}function g(v){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[o(v)]||"Technician"}function m(v){let k={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return k[o(v)]||k.technician}function p(v){return new Date(`${v}T00:00:00`).toLocaleDateString()}function h(v){let k=[new Date(v.created_at).toLocaleString()];return v.file_size_bytes&&k.push(y(v.file_size_bytes)),v.original_size_bytes&&v.file_size_bytes&&v.original_size_bytes!==v.file_size_bytes&&k.push(`optimized from ${y(v.original_size_bytes)}`),k.join(" - ")}function w(v){let k=[];return(v.photo_uploaded_at||v.updated_at||v.created_at)&&k.push(new Date(v.photo_uploaded_at||v.updated_at||v.created_at).toLocaleString()),v.photo_file_size_bytes&&k.push(y(v.photo_file_size_bytes)),v.photo_original_size_bytes&&v.photo_file_size_bytes&&v.photo_original_size_bytes!==v.photo_file_size_bytes&&k.push(`optimized from ${y(v.photo_original_size_bytes)}`),k.join(" - ")||"Photo attached"}function y(v){let k=Number(v)||0;return k?k<1024?`${k} B`:k<1048576?`${Math.round(k/1024)} KB`:`${(k/1048576).toFixed(k>=10485760?0:1)} MB`:""}function _(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(v)||0)}function $(v){return Number(v.unit_cost_at_use??v.parts?.unit_cost??0)||0}function S(v){if(!v.due_at||v.status==="completed")return null;let k=new Date;k.setHours(0,0,0,0);let E=new Date(`${v.due_at}T00:00:00`),A=Math.round((E-k)/864e5);return A<0?{label:"overdue",className:"overdue"}:A===0?{label:"due today",className:"due_today"}:null}function P(){let v=new Date;return v.setHours(0,0,0,0),v}function q(v){return`"${String(v??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:a,sundayWeekRange:s,chunkArray:u,fileBaseName:r,safeFileName:i,statusLabel:c,normalizeWorkOrderType:d,workOrderTypeLabel:f,normalizeRole:o,roleLabel:g,roleDescription:m,formatDate:p,photoMetaText:h,requestPhotoMetaText:w,formatBytes:y,money:_,partUsageUnitCost:$,getDueState:S,startOfToday:P,csvCell:q})})();(function(){function l(s,u){let r=s?.message||"";return u.some(i=>r.includes(i))}function e(s,u){let r=s?.message||"";return r.includes(u)&&(r.includes("column")||r.includes("schema cache"))}function n(s){let u=s?.message||"";return u.includes("work_order_comments_company_author_profile_fkey")||u.includes("profiles")}function t(s){let u=s?.message||"";return!!(u.includes("procedure_template_id")||u.includes("procedure_templates")||u.includes("procedure_steps"))}function a(s){return l(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:a}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let a,s=new Promise((u,r)=>{a=setTimeout(()=>r(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var na=Q(Ot()),ra=Q(Wt());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function a(f){return u(`?request=${encodeURIComponent(f)}`)}function s(f){return u(`?qr=${encodeURIComponent(f)}`)}function u(f){let o=r();if(!o)return"";let g=new URL(o);return g.search=f,g.hash="",g.toString()}function r(){let o=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return o?i(o):""}function i(f){try{let o=new URL(String(f||"").trim(),n.location.href);return o.protocol!=="https:"||!c(o.hostname)?"":(o.search="",o.hash="",o.pathname&&o.pathname!=="/"&&!o.pathname.endsWith("/")&&!o.pathname.endsWith(".html")&&(o.pathname=`${o.pathname}/`),o.toString())}catch{return""}}function c(f){let o=String(f||"").toLowerCase();return!(!o||o==="localhost"||o.endsWith(".localhost")||o==="127.0.0.1"||o==="::1"||o==="[::1]"||/^10\./.test(o)||/^192\.168\./.test(o)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(o))}function d(f,o=4){if(!n.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let g=n.qrcode(0,"M");return g.addData(f),g.make(),g.createSvgTag(o,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:s,publicAppUrlWithSearch:u,publicAppBaseUrl:r,normalizePublicAppUrl:i,isPublicAppHost:c,qrSvgFor:d}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),a=n.querySelector("#print-public-qr");!a||typeof t!="function"||a.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(t){if(typeof t!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(t)||t.startsWith("0000"))return null;let a=new Date(`${t}T00:00:00Z`);return Number.isFinite(a.getTime())&&a.toISOString().slice(0,10)===t?a:null}function e(t){return l(t)?new Date(`${t}T00:00:00`):null}function n(t,a){let s=l(t);if(!s)throw new RangeError("PM due date must be a valid YYYY-MM-DD date.");if(!["weekly","monthly","quarterly"].includes(a))throw new RangeError("PM frequency must be weekly, monthly, or quarterly.");if(a==="weekly")s.setUTCDate(s.getUTCDate()+7);else{let u=s.getUTCDate();s.setUTCDate(1),s.setUTCMonth(s.getUTCMonth()+(a==="monthly"?1:3));let r=new Date(s);r.setUTCMonth(r.getUTCMonth()+1,0),s.setUTCDate(Math.min(u,r.getUTCDate()))}if(s.getUTCFullYear()>9999)throw new RangeError("PM next due date is outside the supported date range.");return s.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={localDateOnly:e,nextDueDate:n}})();var sa=Q(xt()),ca=Q(Mt());(function(){function l(e){function n(c){return e[c]()}function t(c,d){return typeof e[c]=="function"?e[c]():d}function a(c){let d=n("searchQuery"),f=n("activeSection"),o=n("activeStatusFilter"),g=!!d.trim();return i(s(c,{statusFilter:g?"__any__":f==="work"&&o==="requests"?"__none__":o,section:f,includeQueue:!g,includeSearch:!0}))}function s(c,d={}){let f=d.section||n("activeSection"),o=c.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(o=o.eq("location_id",n("activeLocationId"))),d.includeQueue!==!1&&(o=u(o,f)),d.includeAttributeFilters!==!1&&f==="work"){let g=t("workOrderTypeFilter","all"),m=t("workOrderPriorityFilter","all");g!=="all"&&(o=o.eq("type",g)),m!=="all"&&(o=o.eq("priority",m))}if(o=r(o,d.statusFilter||n("activeStatusFilter")),d.includeSearch!==!1){let g=e.postgrestSearchTerm(n("searchQuery"));if(g){let m=n("workOrderRelatedSearch"),p=[`title.ilike.%${g}%`,`description.ilike.%${g}%`,`production_action.ilike.%${g}%`,`priority.ilike.%${g}%`,`type.ilike.%${g}%`,`status.ilike.%${g}%`,...m.assetIds.length?[`asset_id.in.(${m.assetIds.join(",")})`]:[],...m.procedureIds.length?[`procedure_template_id.in.(${m.procedureIds.join(",")})`]:[],...m.workOrderIds.length?[`id.in.(${m.workOrderIds.join(",")})`]:[]];o=o.or(p.join(","))}}return o}function u(c,d){if(d==="mywork"){let f=n("session").user.id;return n("myWorkFilter")==="created"?c.eq("created_by",f):c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}if(d!=="work")return c;if(n("workOrderAssigneeFilter")){let f=n("workOrderAssigneeFilter");return c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?c.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?c.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?c.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):c}function r(c,d){let f=e.isoDate(e.startOfToday());if(d==="__any__")return c;if(d==="__none__")return c.eq("id","00000000-0000-0000-0000-000000000000");if(d==="overdue")return c.neq("status","completed").lt("due_at",f);if(d==="completed_month")return c.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(d==="completed_week"){let o=e.sundayWeekRange();return c.gte("completed_at",e.isoDateTime(o.start)).lt("completed_at",e.isoDateTime(o.end))}return d==="active"||d==="all"?c.neq("status","completed"):c.eq("status",d)}function i(c){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?c.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?c.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?c.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?c.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?c.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):c.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:u,applyWorkOrderStatusFilter:r,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let s=n.querySelector(`#${a.dataset.jumpWorkSection}`);if(!s)return;let u=s.closest("details");u&&(u.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let r=s;r.classList.add("jump-highlight","field-jump-highlight"),t(()=>r.classList.remove("jump-highlight"),1400),t(()=>r.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.renderWorkspace,u=e.setWorkOrderSearchMode;if(!a||!s||!u)return;let r=()=>{a.setSearchQuery(""),u(!1),t.setItem("maintainops.searchQuery","")},i=c=>{a.setActiveSection(c),t.setItem("maintainops.activeSection",c)};n.querySelectorAll("[data-search-work-order]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveWorkOrderId(c.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),i("work"),r(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveAssetId(c.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),i("assets"),r(),s()})}),n.querySelectorAll("[data-search-part]").forEach(c=>{c.addEventListener("click",()=>{a.setActivePartId(c.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),i("parts"),r(),s()})}),n.querySelectorAll("[data-search-request]").forEach(c=>{c.addEventListener("click",()=>{i("requests"),r(),s()})}),n.querySelectorAll("[data-search-section]").forEach(c=>{c.addEventListener("click",()=>{i(c.dataset.searchSection),r(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(a={}){let s=a.documentRef||document,u=a.storage||localStorage,r=a.state,i=a.windowRef||(typeof window<"u"?window:null),c=a.setTimeoutRef||setTimeout,d=a.clearTimeoutRef||clearTimeout,f=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!r)return;let o=()=>{e+=1,l!==null&&(d(l),l=null)},g=p=>{p&&typeof i?.scrollTo=="function"&&i.scrollTo(p.x,p.y)},m=(p,h,w,y)=>{let _=s.getElementById?s.getElementById(p):s.querySelector(`#${p}`);if(!_)return;let $=_.value.length,S=Math.min(h??$,$),P=Math.min(w??S,$);_.focus({preventScroll:!0}),_.setSelectionRange(S,P),g(y)};s.querySelectorAll(".workspace-search-input").forEach(p=>{p.addEventListener("input",()=>{let h=p.id,w=p.selectionStart,y=p.selectionEnd;o();let _=e;r.setSearchQuery(p.value),a.invalidateExactWorkOrderSearchCache(),r.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),r.getSearchQuery().trim()&&(r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setQuickFixMode(!1),r.setCreateWorkOrderMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)),u.setItem("maintainops.searchQuery",r.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),l=c(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(_!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),_!==e))return;let $=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,S=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),P=!("activeElement"in s)||s.activeElement===S;a.renderWorkspace(),P?m(h,w,y,$):g($)}),n),f)})}),s.querySelectorAll("[data-view-work-search]").forEach(p=>{p.addEventListener("click",async()=>{o(),r.setActiveSection("work"),r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),u.setItem("maintainops.activeSection",r.getActiveSection()),await a.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(p=>{p.addEventListener("click",async()=>{o(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}async function u(r){let i=Number(a?.scrollY??a?.pageYOffset??0);if(await r(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(r.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setMyWorkFilter(r.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkOrderFilter(r.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setActiveStatusFilter(r.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{let i=r.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{let i=r.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkOrderTypeFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkOrderPriorityFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkSort(r.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkSort(r.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkGroup(r.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkOrderAssigneeFilter(r.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(r=>{r.addEventListener("click",async()=>{r.disabled||await u(async()=>{t.setRequestViewFilter(r.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(r.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setPartsPage(t.getPartsPage()+(r.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setAssetsPage(t.getAssetsPage()+(r.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setFinancialPage(t.getFinancialPage()+(r.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{r.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(r.value),r.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(r.value),r.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(r.value),r.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(r.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{let i=r.dataset.pageDirection==="next"?1:-1;if(r.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(r.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),r.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),r.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),r.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),r.dataset.listPage?.startsWith("planning-")){let c=r.dataset.listPage.replace("planning-","");t.setPlanningPage(c,t.getPlanningPage(c)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(r=>{r.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(r.dataset.planningGroup,!!r.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.windowRef||(typeof window<"u"?window:null),u=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let r=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function i(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function c(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function d(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function f(){e.renderWorkspace()}function o(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function g(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function m(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(g);return}g()}let p=n.querySelector("#back-to-my-work");p&&p.addEventListener("click",async()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),o(),r(),typeof e.returnToWorkOrderQueue=="function"?await e.returnToWorkOrderQueue():e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),o(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.id),a.setActiveAssetId(null),o(),r(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),a.setActiveWorkOrderId(y.dataset.workPhotoJump),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",_=>{_.stopPropagation(),a.setActiveAssetId(y.dataset.openAsset),a.setActiveWorkOrderId(null),o(),r(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),u()})}),n.querySelectorAll(".asset-card[data-asset-id]").forEach(y=>{let _=()=>{a.setActiveAssetId(y.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),o(),r(),a.setReportIssueMode(!1),a.setActiveSection("assets"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),u()};y.addEventListener("click",_),y.addEventListener("keydown",$=>{$.key!=="Enter"&&$.key!==" "||($.preventDefault(),_())})});let w=0;n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",async()=>{if(typeof e.openLinkedWorkOrder=="function"){let _=++w,$=()=>_===w;o();try{await e.openLinkedWorkOrder(y.dataset.miniWorkOrder,{isCurrent:$})&&u()}catch(S){$()&&e.showNotice?.(`Could not open work order: ${S.message||S}`,"warning")}return}a.setActiveWorkOrderId(y.dataset.miniWorkOrder),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),u()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{let _=y.open;y.addEventListener("toggle",async()=>{if(y.open===_)return;_=y.open;let $=y.dataset.assetId,S=y.dataset.assetRelationshipSection;if(!(!$||!S)&&(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen($,S,y.open),!!y.open)){if(d(S)){let P=y.querySelector?.(".mini-list");P&&(P.textContent="Loading work history..."),await i($)}else if(S==="asset-history")await c($);else return;y.isConnected===!1||!y.open||f()}}),y.open&&d(y.dataset.assetRelationshipSection)&&e.getAssetWorkHistory?.(y.dataset.assetId)?.historyStatus==="idle"&&i(y.dataset.assetId).then(()=>{y.isConnected!==!1&&y.open&&f()})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation();let $=y.dataset.assetId,S=y.dataset.assetRelationSection,q=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage($,S):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage($,S,q),f()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async _=>{_.preventDefault(),_.stopPropagation();let $=y.dataset.openAssetHistory;$&&(a.setActiveAssetId($),a.setActiveWorkOrderId(null),r(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId($),await c($),e.renderWorkspace(),u())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation();let $=y.dataset.backAssetHistory;$&&a.setActiveAssetId($),o(),e.renderWorkspace(),u()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation();let $=y.dataset.assetId,P=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage($,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage($,"asset-history",P),e.renderWorkspace(),u()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}function u(){let r=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(r));return}s(r)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(r=>{r.addEventListener("click",()=>{t.setPartInventoryFilter(r.dataset.partInventoryFilter),e.resetPartsPage(),u()})}),n.querySelectorAll("[data-part-sort]").forEach(r=>{r.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(r.value||"default"),e.resetPartsPage(),u())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(r=>{r.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===r.dataset.assetStatusFilter?"all":r.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),u()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(r=>{r.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===r.dataset.assetTypeFilter?"all":r.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),u()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(r=>{r.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(r.value||"all"),e.resetAssetsPage(),u())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(u){e.showNotice(`Could not update status: ${u.message||u}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",a=>a.stopPropagation()),t.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var wa=Q(Dt()),ba=Q(Tt());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let u=e.getWorkOrderById(s.dataset.id);if(!u)return;let r=s.dataset.copyDowntime==="subject",i=r?e.downtimeEmailSubject(u):e.downtimeEmailBody(u),c=await e.copyTextToClipboard(i);s.textContent=c?"Copied":"Copy failed",a(()=>{s.textContent=r?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var _a=Q(It());(function(){function l(e={}){let n=e.documentRef||document;function t(u){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(u),e.renderWorkspace()}async function a(u){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let r=e.getPhotoPathsByWorkOrder(u);if(r.length){let c=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(r),"Work order photo cleanup timed out.",15e3);c.error&&e.warnRef("Work order photo storage cleanup failed",c.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(u),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(r){e.alertRef(`Could not delete work order: ${r.message||r}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(u=>{u.addEventListener("click",r=>{r.stopPropagation(),t(u.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(u=>{u.addEventListener("click",r=>{r.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(u=>{u.addEventListener("click",async r=>{r.stopPropagation(),await a(u.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:a,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace;if(!t||typeof a!="function")return;let s=0;async function u(r){let i=++s,c=()=>i===s&&r.isConnected!==!1;try{if(e.loadPartDetail&&await e.loadPartDetail(r.dataset.openPart,{isCurrent:c})===!1||!c())return;t.setActivePartId(r.dataset.openPart),a()}catch(d){c()&&e.showNotice?.(`Could not open part: ${d.message||d}`,"warning")}}n.querySelectorAll("[data-open-part]").forEach(r=>{r.addEventListener("click",()=>u(r)),r.addEventListener("keydown",i=>{i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),u(r))})}),n.querySelectorAll("[data-close-part-detail]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setActivePartId(null),t.setShowPartSourceManager(!1),a()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setShowPartSourceManager(!t.getShowPartSourceManager()),a()})})}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.messageComposerScopeNote,u=e.autoGrowTextarea;if(!t||typeof a!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(f=>f.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(f=>f.addEventListener("click",()=>e.setMessageView?.(f.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(f=>f.addEventListener("click",()=>e.quoteMessage?.(f.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(f=>f.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async f=>{f.currentTarget.disabled=!0;let o=f.currentTarget;try{await e.loadOlderMessages?.()}finally{o.isConnected&&(o.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let o=f.dataset.messageFilter;t.setMessageThreadFilter(o),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageThreadFilter",o),r.setItem("maintainops.messageThreadsPage","1"),a()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(f.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),r.setItem("maintainops.activeSection","work"),a()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{let f=n.querySelector('#message-thread-form [name="work_order_id"]');f&&(f.value=""),t.setMessageComposerWorkOrderId(""),r.setItem("maintainops.messageComposerWorkOrderId",""),a()});let c=n.querySelector("#message-search");c&&c.addEventListener("input",()=>{let f=c.value;t.setMessageSearchQuery(f),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageSearchQuery",f),r.setItem("maintainops.messageThreadsPage","1"),a();let o=n.querySelector("#message-search");o&&(o.focus({preventScroll:!0}),o.selectionStart!=null&&o.setSelectionRange(c.selectionStart,c.selectionEnd))});let d=n.querySelector("#message-thread-form");if(d){let f=d.querySelector("#message-thread-type"),o=d.querySelector(".message-direct-field"),g=d.querySelector("#message-scope-note");if(f&&o&&g&&typeof s=="function"){let m=()=>{let p=f.value==="direct";o.classList.toggle("hidden-section",!p);let h=o.querySelector("select");h&&(h.disabled=!p,h.required=p);let w=d.querySelector("[name='title']");w&&(w.required=!p),g.textContent=s(f.value),e.showExistingConversation?.(p?h?.value:"")};f.addEventListener("change",m),o.querySelector("select")?.addEventListener("change",m),m()}}n.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let o=n.querySelector("#message-thread-form");if(!o)return;let g=o.querySelector("details"),m=o.querySelector("#message-thread-type"),p=o.querySelector("select[name='direct_user_id']"),h=o.querySelector(".message-direct-field"),w=o.querySelector("#message-scope-note"),y=o.querySelector("input[name='title']");g&&(g.open=!0),m&&(m.value="direct"),p&&(p.value=f.dataset.messagePerson||"",p.disabled=!1),h&&h.classList.remove("hidden-section"),w&&typeof s=="function"&&(w.textContent=s("direct")),y&&y.focus(),p?.dispatchEvent(new Event("change",{bubbles:!0}))})}),n.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let g=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!g)return;let m=g.value.trim();g.value=m?`${m}
${f.dataset.quickReply}`:f.dataset.quickReply,g.dispatchEvent(new Event("input",{bubbles:!0})),g.focus(),typeof u=="function"&&u(g)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof a!="function"||typeof s!="function")return;let u=n.querySelector("#part-search-form");if(!u)return;let r=c=>{t.setPartSearchQuery(c||""),s(),a()},i=u.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{r(i.value||"");let c=n.querySelector("#part-search");if(!c)return;c.focus();let d=c.value.length;c.setSelectionRange(d,d)}),u.addEventListener("submit",c=>{c.preventDefault();let d=e.FormDataRef||FormData,f=new d(u).get("part_search")||"";r(f),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(u=>{u.addEventListener("click",async()=>{let r=performance.now(),i=u.dataset.section;e.visibleNavItems().some(([c])=>c===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,r))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;async function s(u){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(u),e.getActiveThreadId&&e.getActiveThreadId()!==u||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(u),(!e.getActiveThreadId||e.getActiveThreadId()===u)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==u)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(u=>{u.addEventListener("click",async()=>{let r=u.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(r),a.setItem("maintainops.activeMessageThreadId",r),await s(r)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(u=>{u.addEventListener("click",async()=>{let r=u.dataset.openWorkMessageThread;t.setActiveMessageThreadId(r),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",r),a.setItem("maintainops.activeSection","messages"),await s(r)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let u=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(u),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",u),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",async()=>{if(t.disabled)return;t.disabled=!0;let a=t.textContent;t.textContent="Exporting...";try{await e.exportActiveSectionCsv()}finally{t.disabled=!1,t.textContent=a}})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var Ia=Q(Ft());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(a=>{l(a),a.addEventListener("input",()=>l(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var Ba=Q(Lt());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(u=>{u.addEventListener("click",async()=>{let r=await t(u.dataset.copyTeamInvite||"");u.textContent=r?"Copied":"Copy failed",a(()=>{u.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(u=>{u.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(u=>{u.addEventListener("click",()=>{t.setQuickFixAssetId(u.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var Ga=Q(Nt());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(u=>{u.addEventListener("click",async()=>{let r=await t(u.dataset.copyPublicRequestLink);u.textContent=r?"Copied":"Copy failed",a(()=>{u.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ka=Q(Ut());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let u=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(a.dataset.createFollowUp,u?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var eo=Q(Qt());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,a=n.querySelector("#comment-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,a=n.querySelector("#quick-update-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,a=n.querySelector("#edit-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{t(a),a.addEventListener("change",()=>t(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var io=Q(Bt()),so=Q(jt()),co=Q(zt()),lo=Q(Vt()),uo=Q(Ht()),po=Q(Gt()),mo=Q(Yt()),fo=Q(Kt()),go=Q(Jt()),ho=Q(Zt()),yo=Q(Xt()),wo=Q(en()),bo=Q(tn()),vo=Q(nn()),ko=Q(rn()),_o=Q(an()),qo=Q(on()),So=Q(sn()),$o=Q(cn()),Co=Q(ln()),Ao=Q(un()),Po=Q(dn()),Eo=Q(pn());(function(){function l(e){function n(a){return e[a]()}function t(a,s=n("requestViewFilter")){let u=a.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(u=u.eq("location_id",n("activeLocationId"))),s==="converted"?u=u.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(u=u.eq("status","submitted").is("converted_work_order_id",null));let r=e.postgrestSearchTerm(n("searchQuery"));if(r){let i=`%${r}%`,c=n("assets").filter(e.matchesActiveLocation).filter(d=>e.matchesQuery([d.name,d.asset_code,d.asset_tag,d.manufacturer,d.model,d.location,d.status,d.asset_type,e.parentAssetFor()(d)?.name],r)).map(d=>d.id).slice(0,e.SEARCH_ID_PAGE_SIZE);u=u.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...c.length?[`asset_id.in.(${c.join(",")})`]:[]].join(","))}return u}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(g){return e[g]()}async function t(){let g=n("searchQuery").trim();if(!g||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let m=n("assets").filter(e.matchesActiveLocation).filter(y=>e.matchesQuery([y.name,y.asset_code,y.asset_tag,y.manufacturer,y.model,y.location,y.status,y.asset_type,e.parentAssetFor()(y)?.name],g)).map(y=>y.id),p=n("procedureTemplates").filter(y=>e.matchesQuery([y.name,y.description,...(y.procedure_steps||[]).map(_=>_.prompt)],g)).map(y=>y.id),h=n("parts").filter(e.matchesActiveLocation).filter(y=>e.matchesQuery([y.name,y.sku,y.supplier_name,y.quantity_on_hand,y.reorder_point,y.unit_cost],g)).map(y=>y.id),w=new Set;await Promise.all([a(w,h),s(w,"work_order_comments",["body"],g),s(w,"work_order_events",["event_type","summary"],g),s(w,"work_order_photos",["file_name"],g),s(w,"work_order_step_results",["value"],g)]),e.setWorkOrderRelatedSearch({assetIds:m.slice(0,200),procedureIds:p.slice(0,200),workOrderIds:[...w].slice(0,300)})}async function a(g,m,p={}){if(!m.length)return;let w=p.maxRows??300;for(let y of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE)){if(w<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",y),_=>{_.forEach($=>{$.work_order_id&&g.add($.work_order_id)}),w-=_.length},w)}catch(_){e.warn("Part-linked work order search failed",_);return}}}async function s(g,m,p,h,w={}){let y=e.postgrestSearchTerm(h);if(!y)return;let _=p.map(S=>`${S}.ilike.%${y}%`).join(","),$=w.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(m).select("work_order_id").eq("company_id",n("activeCompanyId")).or(_),S=>{S.forEach(P=>{P.work_order_id&&g.add(P.work_order_id)})},$)}catch(S){e.warn(`${m} work order search failed`,S)}}async function u(g={}){let m=await r(),p=m.length,h=Math.max(1,Math.ceil(p/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let w=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,y=m.slice(w,w+e.WORK_ORDERS_PER_PAGE).map(P=>P.id);if(!y.length)return{data:[],error:null,count:p};let _=g.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),$=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:_,ids:y});if($.error)return $;let S=new Map(($.data||[]).map(P=>[P.id,P]));return{...$,data:y.map(P=>S.get(P)).filter(Boolean),count:p}}async function r(){let g=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),m=n("exactWorkOrderSearchCache");if(m.key===g)return m.rows;let p=n("searchQuery").trim(),h=new Map;await i(h,p);let w=n("assets").filter(e.matchesActiveLocation).filter(P=>e.matchesQuery([P.name,P.asset_code,P.asset_tag,P.manufacturer,P.model,P.location,P.status,P.asset_type,e.parentAssetFor()(P)?.name],p)).map(P=>P.id),y=n("procedureTemplates").filter(P=>e.matchesQuery([P.name,P.description,...(P.procedure_steps||[]).map(q=>q.prompt)],p)).map(P=>P.id),_=n("parts").filter(e.matchesActiveLocation).filter(P=>e.matchesQuery([P.name,P.sku,P.supplier_name,P.quantity_on_hand,P.reorder_point,P.unit_cost],p)).map(P=>P.id);await Promise.all([c(h,"asset_id",w),c(h,"procedure_template_id",y)]);let $=new Set;await Promise.all([a($,_,{maxRows:1/0}),s($,"work_order_comments",["body"],p,{maxRows:1/0}),s($,"work_order_events",["event_type","summary"],p,{maxRows:1/0}),s($,"work_order_photos",["file_name"],p,{maxRows:1/0}),s($,"work_order_step_results",["value"],p,{maxRows:1/0})]),await d(h,[...$]);let S=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:g,rows:S}),S}async function i(g,m){let p=e.postgrestSearchTerm(m);if(!p)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(w=>`${w}.ilike.%${p}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),w=>o(g,w))}async function c(g,m,p){if(p.length)for(let h of e.chunkArray(p,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(m,h),w=>o(g,w))}async function d(g,m){if(m.length)for(let p of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",p),h=>o(g,h))}function f(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function o(g,m){(m||[]).forEach(p=>{p?.id&&g.set(p.id,{...g.get(p.id)||{},...p})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:u,exactWorkOrderSearchRows:r,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(r){return e[r]()}function t(){let r=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),c=n("assets").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.asset_code,m.asset_tag,m.manufacturer,m.model,m.location,m.status],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("parts").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.sku,m.supplier_name,m.quantity_on_hand,m.reorder_point],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.title,m.description,m.status,m.priority,m.assets?.name,n("profilesByUserId")[m.requested_by]?.full_name],r)).sort((m,p)=>new Date(p.created_at)-new Date(m.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),o=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.title,m.frequency,m.next_due_at,m.assets?.name],r)).sort((m,p)=>String(m.next_due_at||"").localeCompare(String(p.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),g=n("procedureTemplates").filter(m=>e.matchesQuery([m.name,m.description,...(m.procedure_steps||[]).map(p=>p.prompt)],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:c,parts:d,requests:f,pm:o,procedures:g}}function a(r="all"){let i=e.startOfToday(),c=new Date(i);return c.setDate(c.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(d=>d.status!=="completed").filter(d=>e.matchesSearch([d.title,d.description,d.priority,d.status,d.assets?.name,e.assignmentLabel(d)])).filter(d=>r==="no_due"?!d.due_at:!!d.due_at).map(d=>{let f=d.due_at?new Date(`${d.due_at}T00:00:00`):null;return{kind:r==="no_due"?"no_due":"work",id:d.id,title:d.title,priority:d.priority,status:d.status,assetName:d.assets?.name||"No equipment",dueAt:d.due_at,due:f,createdAt:d.created_at||"",assignedTo:e.assignmentLabel(d),workOrder:d}}).filter(d=>r==="no_due"?!0:r==="overdue"?d.due<i:r==="today"?d.due.getTime()===i.getTime():r==="soon"?d.due>i&&d.due<=c:!0).sort((d,f)=>{if(r==="no_due"){let o={critical:4,high:3,medium:2,low:1};return(o[f.priority]||0)-(o[d.priority]||0)||new Date(d.createdAt||0)-new Date(f.createdAt||0)}return d.due-f.due})}function s(){let r=e.startOfToday(),i=new Date(r);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(c=>c.active!==!1).filter(e.matchesActiveLocation).filter(c=>{let d=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(c.next_due_at);return d&&d>=r&&d<=i}).filter(c=>e.matchesSearch([c.title,c.frequency,c.next_due_at,c.assets?.name])).map(c=>({kind:"pm",id:c.id,title:c.title,assetName:c.assets?.name||"No equipment",dueAt:c.next_due_at,due:window.MaintainOpsMaintenanceScheduleDates.localDateOnly(c.next_due_at)})).sort((c,d)=>c.due-d.due)}function u(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(r=>r.follow_up_needed).filter(r=>e.matchesSearch([r.title,r.description,r.failure_cause,r.resolution_summary,r.assets?.name,r.assigned_profile?.full_name])).map(r=>({kind:"follow_up",id:r.id,title:r.title,assetName:r.assets?.name||"No equipment",completedAt:r.completed_at?new Date(r.completed_at).toLocaleDateString():"not completed",resolution:r.resolution_summary||r.completion_notes||"",workOrder:r})).sort((r,i)=>r.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:a,planningPmItems:s,followUpItems:u}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,a){return n.from("locations").insert({company_id:t,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(u,r){return u.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",r)}function e(u,r){return u.from("company_members").select("*").eq("company_id",r).order("created_at",{ascending:!0})}function n(u,r){return u.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",r).order("created_at",{ascending:!1})}function t(u,r){return u.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",r).order("created_at",{ascending:!1})}function a(u,r){return u.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",r).order("created_at",{ascending:!1})}function s(u,r){return u.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",r).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:a,listRequestNotificationRecipients:s}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(c,d,f={}){return c.from("work_orders").select(d,f)}function e(c){return c.from("work_orders").select("id",{count:"exact",head:!0})}function n(c,d,f,o){return c.from("work_orders").select(o).eq("company_id",d).eq("id",f).maybeSingle()}async function t(c,d,f){let o=()=>e(c).eq("company_id",d).eq("asset_id",f),[g,m]=await Promise.all([o().neq("status","completed"),o().eq("status","completed")]),p=g.error||m.error;return p?{error:p}:[g.count,m.count].every(h=>Number.isInteger(h)&&h>=0)?{data:{open:g.count,completed:m.count},error:null}:{error:new Error("Equipment work counts are unavailable.")}}async function a(c,d,f,o){let g=[];for(;;){let m=await c.from("work_orders").select(o,{count:"exact"}).eq("company_id",d).eq("asset_id",f).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}).order("id",{ascending:!0}).range(g.length,g.length+999);if(m.error)return m;let p=m.data||[];if(g.push(...p),!p.length||(Number.isInteger(m.count)?g.length>=m.count:p.length<1e3))return{data:g,error:null}}}async function s(c,d){let{companyId:f,locationId:o,locationsReady:g,selectClause:m,ids:p}=d,h=c.from("work_orders").select(m).eq("company_id",f).in("id",p);return g&&o&&(h=h.eq("location_id",o)),h}function u(c,d){let{companyId:f,locationId:o,locationsReady:g}=d,m=c.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",f);return g&&o&&(m=m.eq("location_id",o)),m}function r(c,d){let{companyId:f,locationId:o,locationsReady:g}=d,m=c.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",f).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return g&&o&&(m=m.eq("location_id",o)),m.order("id",{ascending:!0})}async function i(c,d,f=1/0,o=1e3){let g=0,m=0;for(;m<f;){let p=Math.min(o,f-m),{data:h,error:w}=await c().range(g,g+p-1);if(w)throw w;let y=h||[];if(d(y),m+=y.length,y.length<p)break;g+=p}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:a,fetchAssetWorkOrderCounts:t,fetchWorkOrdersByIds:s,scopedWorkOrderSearchQuery:u,scopedTeamWorkloadQuery:r,fetchPagedSearchRows:i}})();var Fo=Q(mn());(function(){function l(s){return s.rpc("get_my_companies")}function e(s,u){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",u).order("created_at",{ascending:!0})}function n(s,u){return s.from("company_members").select("company_id, role").eq("user_id",u).order("created_at",{ascending:!0})}function t(s,u){return s.from("companies").select("id, name, logo_path, created_at").in("id",u).order("created_at",{ascending:!0})}function a(s,u){return s.from("companies").select("id, name, created_at").in("id",u).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:a}})();(function(){function l(a,s){return a.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(a,s){return a.from("app_issue_reports").insert(s)}function n(a,s,u,r){return a.from("app_issue_reports").update({status:r,resolved_at:r==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",u)}function t(a,s,u){return a.from("app_issue_reports").delete().eq("company_id",s).eq("id",u)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,a){return t.from("user_preferences").select(l).eq("user_id",a).maybeSingle()}function n(t,a,s){return t.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Qo=Q(fn()),Bo=Q(gn()),jo=Q(hn()),zo=Q(yn());(function(){function l(t,a,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${a}</strong></article>`}function e(t,a,s,u="neutral"){return`
    <article class="insight dashboard-card tone-${u}">
      <span>${t}</span>
      <strong>${a}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(r=>String(r||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),u=window.MaintainOpsDom?.escapeHtml||(r=>String(r??""));return`
    <section class="team-role-guide">
      ${t.map(r=>`
        <article>
          <strong>${a(r)}</strong>
          <span>${u(s(r))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var Ho=Q(wn());(function(){function l(f,o,g="active",m={},p){let h=p.getActiveStatusFilter(),w=m.filter||m.section,y=w?"button":"article",_=m.filter&&h===m.filter?" selected":"",$=g.includes("overdue")&&Number(o)>=3,S=$?" alert-blink":"",P=[w?'type="button"':"",m.filter?`data-status-filter="${m.filter}" aria-pressed="${h===m.filter}"`:"",m.section?`data-section="${m.section}"`:""].filter(Boolean).join(" "),q=P?` ${P}`:"";return`
    <${y} class="gauge-readout ${g}${_}${S}"${q}>
      ${$?'<span class="gauge-alert-badge" aria-hidden="true">!</span>':""}
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
      <span>${p.escapeHtml(f)}</span>
    </${y}>
  `}function e(f){let o=f.getWorkOrderDashboardCounts()||{},g=o.activeWork||0,m=o.newWork||0,p=o.inProgress||0,h=o.blocked||0,w=o.overdue||0,y=o.completedAll||0,_=o.completedMonth||0,$=o.completedWeek||0,S=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",g,"active",{filter:"active"},f)}
      ${l("New",m,"new",{filter:"open"},f)}
      ${l("In Progress",p,"in_progress",{filter:"in_progress"},f)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${l("Overdue",w,"overdue",{filter:"overdue"},f)}
      ${l("Requests",S,"request",{filter:"requests"},f)}
      ${l("All Completed",y,"completed",{filter:"completed"},f)}
      ${l("Completed Month",_,"completed",{filter:"completed_month"},f)}
      ${l("Done This Week",$,"completed",{filter:"completed_week"},f)}
    </div>
  `}function n(f,o){let g=f||{},m=g.newWork||0,p=g.inProgress||0,h=g.blocked||0,w=g.activeWork??m+p+h,y=g.overdue||0,_=g.completedAll||0,$=g.completedMonth||0,S=g.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",w,"active workload-pill",{filter:"active"},o)}
      ${l("New",m,"new workload-pill",{filter:"open"},o)}
      ${l("In Progress",p,"in_progress workload-pill",{filter:"in_progress"},o)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},o)}
      ${l("Overdue",y,"overdue workload-pill",{filter:"overdue"},o)}
      ${l("All Completed",_,"completed workload-pill",{filter:"completed"},o)}
      ${l("Completed Month",$,"completed workload-pill",{filter:"completed_month"},o)}
      ${l("Done This Week",S,"completed workload-pill",{filter:"completed_week"},o)}
    </div>
  `}function t(f){return f.getWorkOrders().filter(o=>f.getDueState(o)?.className==="overdue")}function a(f){return f.getWorkOrders().filter(o=>s(o,f))}function s(f,o,g=new Date){if(!f.completed_at)return!1;let m=new Date(f.completed_at),p=o.sundayWeekRange(g);return Number.isFinite(m.getTime())&&m>=p.start&&m<p.end}function u(f){return f.getWorkOrders().filter(r)}function r(f){let o=new Date,g=new Date(o.getFullYear(),o.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=g)}function i(f){let o=f.filter(m=>m.status==="completed"&&Number(m.actual_minutes)>0);if(!o.length)return 0;let g=o.reduce((m,p)=>m+Number(p.actual_minutes||0),0);return Math.round(g/o.length)}function c(f){let o=new Date;o.setHours(0,0,0,0);let g=new Date(o);return g.setDate(g.getDate()+7),f.getPreventiveSchedules().filter(m=>{if(m.active===!1)return!1;let p=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(m.next_due_at);return p&&p>=o&&p<=g})}function d(f){return Object.freeze({renderGaugeReadout:(o,g,m="active",p={})=>l(o,g,m,p,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:o=>n(o,f),overdueWorkOrders:()=>t(f),completedThisWeek:()=>a(f),isCompletedThisWeek:(o,g)=>s(o,f,g),completedThisMonth:()=>u(f),isCompletedThisMonth:r,averageCompletionMinutes:(o=f.getWorkOrders())=>i(o),preventiveDueSoon:()=>c(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:d})})();(function(){function l(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",forklift:"Forklift / Mobile Lift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:a,getPartInventoryFilter:s,assetTypeLabel:u,assetStatusLabel:r}){function i(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function c(){let f=n(),o=t?t():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${r(f).toLowerCase()} equipment found.`:o!=="all"?`No ${u(o).toLowerCase()} equipment found.`:"No equipment added yet."}function d(){return a().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:c,partEmptyStateText:d}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var Zo=Q(bn());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:a,getSearchQuery:s}){function u(p){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${m(p)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${r("Work Orders",p.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${r("Equipment",p.assets,c,"asset")}
            ${r("Parts",p.parts,d,"parts")}
            ${r("Requests",p.requests,f,"comment")}
            ${r("PM",p.pm,o,"procedure")}
            ${r("Procedure Checklists",p.procedures,g,"procedure")}
          </div>
        </section>
      `}function r(p,h,w,y,_={}){return`
        <section class="global-result-group relationship-detail ${y}">
          <div class="panel-header compact">
            <h3>${e(p)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(w).join("")||'<p class="muted">No matches.</p>'}
            ${_.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function i(p){return`
        <button class="global-result-item" data-search-work-order="${p.id}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${n(p.status)} - ${e(p.assets?.name||"No equipment")} - ${e(t(p))}</span>
        </button>
      `}function c(p){return`
        <button class="global-result-item" data-search-asset="${p.id}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${e(p.asset_code||"No serial")} - ${e(p.status)} - ${e(p.location||a())}</span>
          ${p.asset_tag?`<span>Asset tag: ${e(p.asset_tag)}</span>`:""}
        </button>
      `}function d(p){let h=Number(p.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${p.id}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${e(p.sku||"No SKU")} - ${h} on hand${p.supplier_name?` - ${e(p.supplier_name)}`:""}</span>
        </button>
      `}function f(p){return`
        <button class="global-result-item" data-search-request="${p.id}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.status)} - ${e(p.assets?.name||"No equipment")}</span>
        </button>
      `}function o(p){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(p.title)}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.assets?.name||"No equipment")} - due ${e(p.next_due_at||"unset")}</span>
        </button>
      `}function g(p){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(p.name)}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${(p.procedure_steps||[]).length} steps</span>
        </button>
      `}function m(p){return Object.values(p).reduce((h,w)=>h+w.length,0)}return{renderGlobalSearchResults:u,renderGlobalResultGroup:r,renderGlobalWorkResult:i,renderGlobalAssetResult:c,renderGlobalPartResult:d,renderGlobalRequestResult:f,renderGlobalPmResult:o,renderGlobalProcedureResult:g,globalResultCount:m}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var ei=Q(vn()),ti=Q(kn()),ni=Q(_n());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:a=(d,f)=>f,renderListPagination:s,statusLabel:u,renderRelationshipChips:r,canEditOperationalRecords:i=()=>!0,getSchedulesReady:c=()=>!0}){function d(m,p,h,w,y={}){let _=n||12,$=typeof t=="function"?t(w):1,S=Math.max(1,Math.ceil(p.length/_)),P=Math.min(Math.max($,1),S),q=p.slice((P-1)*_,P*_),v=a(w,!!(y.defaultOpen&&p.length));return`
        <details class="planning-group" data-planning-group="${e(w)}" ${v?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(m)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${h}">${p.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${q.map(g).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${w}`,p.length,P,S):""}
          </div>
        </details>
      `}function f(m,p,h,w=""){return`
        <section class="planning-lane ${w}">
          <header class="planning-lane-header">
            <h3>${e(m)}</h3>
            <p>${e(p)}</p>
          </header>
          ${h}
        </section>
      `}function o(m){return`
        <div class="planning-grid">
          ${f("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${d("No Due Date",m.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${d("Follow-up Needed",m.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${f("Current schedule","Work requiring attention now.",`
            ${d("Overdue",m.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${d("Due Today",m.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${f("Upcoming","Near-term maintenance and preventive work.",`
            ${d("Next 7 Days",m.soon,"in_progress","soon")}
            ${c()?d("PM Due Soon",m.pm,"open","pm"):'<p class="error-text" role="alert">PM schedules unavailable.</p>'}
          `)}
        </div>
      `}function g(m){if(m.kind==="follow_up")return`
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${e(m.title)}</strong>
              <p>${e(m.assetName)} - completed ${e(m.completedAt)}</p>
              ${m.resolution?`<p>${e(m.resolution)}</p>`:""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${e(m.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${e(m.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;if(m.kind==="pm")return`
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${e(m.title)}</strong>
              <p>${e(m.assetName)} - due ${e(m.dueAt)}</p>
            </div>
            ${i()?`<button class="secondary-button" data-generate-pm="${e(m.id)}" type="button">Generate Work</button>`:""}
          </article>
        `;if(m.kind==="no_due"){let p=m.createdAt?new Date(m.createdAt):null,h=p&&!Number.isNaN(p.getTime())?p.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(m.priority)} ${e(u(m.status))}</span>
              <strong>${e(m.title)}</strong>
              <p>${e(m.assetName)} - ${e(m.assignedTo||"Unassigned")}</p>
              <p>Created ${e(h)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(m.id)}" type="button">Open Work Order</button>
              ${i()?`
                <form class="planning-due-form" data-planning-due-form="${e(m.id)}">
                  <label>Due date<input name="planning_due_at" type="date" required></label>
                  <button class="primary-button" type="submit">Set Due Date</button>
                </form>
              `:'<span class="muted planning-view-only">View only</span>'}
            </div>
          </article>
        `}return`
        <article class="planning-item mini-work-order" data-mini-work-order="${m.id}">
          <div>
            <span class="eyebrow">${e(m.priority)} ${e(u(m.status))}</span>
            <strong>${e(m.title)}</strong>
            <p>${e(m.assetName)} - due ${e(m.dueAt)}</p>
          </div>
          ${r(m.workOrder)}
        </article>
      `}return{renderPlanningGroup:d,renderPlanningBoard:o,renderPlanningItem:g}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var ai=Q(qn());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:s,getPartsPage:u,getAssetsPage:r}){function i(o,g){if(o<=e)return"";let m=s(),p=(m-1)*e+1,h=Math.min(o,m*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function c(o,g){if(o<=n)return"";let m=u(),p=(m-1)*n+1,h=Math.min(o,m*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function d(o,g){if(o<=t)return"";let m=r(),p=(m-1)*t+1,h=Math.min(o,m*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function f(o,g,m,p){if(g<=a)return"";let h=(m-1)*a+1,w=Math.min(g,m*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${w} of ${g} - Page ${m} of ${p}</span>
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="next" type="button" ${m>=p?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:c,renderAssetsPagination:d,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var ii=Q(Sn());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:a,matchesActiveLocation:s,isAssetDescendantOf:u,parentAssetFor:r}){function i(m=t()){return n().map(p=>`<option value="${p.id}" ${p.id===m?"selected":""}>${e(p.name)}</option>`).join("")}function c(m){let p=r(m);return p?`${m.name} - part of ${p.name}`:m.name}function d(m=""){let p=a().filter(s).sort((y,_)=>c(y).localeCompare(c(_))),h=m?a().find(y=>y.id===m):null;return(h&&!p.some(y=>y.id===h.id)?[h,...p]:p).map(y=>`<option value="${y.id}" ${y.id===m?"selected":""}>${e(c(y))}</option>`).join("")}function f(m="",p=""){return a().filter(s).filter(h=>h.id!==p&&!u(h.id,p)).sort((h,w)=>c(h).localeCompare(c(w))).map(h=>`<option value="${h.id}" ${h.id===m?"selected":""}>${e(c(h))}</option>`).join("")}function o(m=""){let p=[...new Set(a().filter(s).map(w=>String(w.location||"").trim()).filter(Boolean))].sort((w,y)=>w.localeCompare(y)),h=String(m||"").trim();return h&&!p.includes(h)?[h,...p]:p}function g(m=""){return o(m).map(p=>`<option value="${e(p)}" ${p===m?"selected":""}>${e(p)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:d,renderParentAssetOptions:f,renderAssetAreaOptions:g,assetOptionLabel:c}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function a(s){if(!s.photo_storage_path)return"";let u=s.photo_file_name||s.photo_original_file_name||"Request photo",r=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(u)}">`:""}
          <div>
            <strong>${e(u)}</strong>
            <span>${e(r)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let a=n();return a>0?`<b class="nav-badge nav-message-badge" aria-label="${a} unread conversations and work alerts">${a}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(a){let s=Number(a);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(a){let s=e(a);return s?s>99?"99+":String(s):""}function t(a,s={}){let u=n(a);if(!u)return"";let r=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${r}">${u}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function a(s){let u=n()[s.reporter_id]?.full_name||"Team member",r=t().find(d=>d.id===s.location_id)?.name||"No location",i=s.status||"open",c=s.severity||"normal";return`
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
            <small>${e(u)} - ${e(s.screen||"workspace")}</small>
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
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:a,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:u}){function r(c){let d=s()[c.id]||[],f=d[d.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(c.title)}</strong>
            <span>${e(t(c))}${f?` - ${e(n(f.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${c.id}" type="button">Open Thread</button>
        </article>
      `}function i(c){let d=a().filter(f=>f.work_order_id===c.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${c.id}" type="button">Message Team</button>
            ${u()?`
              <div class="work-linked-thread-list">
                ${d.map(r).join("")||'<p class="muted">No message threads linked yet.</p>'}
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
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(a,s,u,r,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${u}" type="button">
          <span>${e(a)}</span>
          <strong>${s}</strong>
          <small>${e(r)}</small>
        </button>
      `}function t(a){return a.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:s,requiresSafetyDeviceCheck:u=d=>!!d.asset_id,renderEmailHelperCommandCard:r,getMessageThreads:i,getPartsUsedByWorkOrder:c}){function d(f){let o=i().filter(h=>h.work_order_id===f.id).length,g=(c()[f.id]||[]).reduce((h,w)=>h+(Number(w.quantity_used)||0),0),m=u(f)?s(f)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:[f.asset_id?"Not Required":"General","No equipment safety check required","neutral"],p=f.status==="completed"?"Review history or create follow-up if needed":f.status==="blocked"?"Resolve blocker or add current update":f.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
        <section class="work-command-summary">
          <button class="command-card status-${f.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${n(f.status)}</strong>
            <small>${e(p)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${e(f.assets?.name||"General item / area")}</strong>
            <small>${e(f.due_at?`Due ${f.due_at}`:"Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${e(t(f))}</strong>
            <small>${a(f)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${m[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${m[0]}</strong>
            <small>${e(m[1])}</small>
          </button>
          ${r(f)}
        </section>
      `}return{renderWorkOrderCommandSummary:d}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:l}})();(function(){function l(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function a(){return`
        <datalist id="part-source-options">
          ${n().map(r=>`<option value="${e(r)}"></option>`).join("")}
        </datalist>
      `}function s(){let u=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${u.map(r=>`
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
      `}return{renderPartSourceOptions:a,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:a,parentAssetFor:s,childAssetsFor:u}){function r(i){let c=t().filter(o=>o.asset_id===i.id&&o.status!=="completed").length,d=s(i),f=u(i.id);return`
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
            ${d?`<p>Part of ${e(d.name)}</p>`:""}
            ${f.length?`<p>${f.length} linked item${f.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${c} open work</span>
        </article>
      `}return{renderAssetCard:r}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function a(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(u=>`<option value="${u.id}" ${u.id===s?"selected":""}>${e(u.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function a(u){let r=n().filter(i=>i.thread_id===u.id).map(i=>t(i.user_id));return r.length?r.join(", "):"Direct message"}function s(u){return u.thread_type==="direct"?a(u):u.thread_type==="location"?`Company team / ${e().find(r=>r.id===u.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:a,unreadMessageCount:s,getMessagesByThreadId:u,getActiveMessageThreadId:r,threadTitle:i=c=>c.title}){function c(d){let o=(u()[d.id]||[]).filter(P=>!P.deleted_at),g=d.latest_message||o[o.length-1],m=s(d.id),p=i(d),h=String(p||"MO").trim().split(/\s+/).slice(0,2).map(P=>Array.from(P)[0]).join("").toUpperCase(),w=Math.abs([...String(p)].reduce((P,q)=>P*31+q.charCodeAt(0)|0,0))%6,y=g?.body?`${e(t(g.sender_id))}: ${e(g.body)}`:"Attachment",_=new Date(g?.created_at),$=_.toDateString()===new Date().toDateString(),S=g?$?_.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):n(g.created_at):"";return`
        <button class="message-thread-button ${d.id===r()?"active":""} ${m?"unread":""}" data-message-thread="${d.id}" aria-current="${d.id===r()?"true":"false"}" type="button">
          <span class="message-thread-avatar" data-tone="${w}" aria-hidden="true">${d.thread_type==="direct"?e(h):"#"}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${e(p)}</strong><time datetime="${e(g?.created_at||"")}" title="${e(g?n(g.created_at):"")}">${e(S)}</time></span>
          <span class="message-row-preview"><small>${g?y:"No messages yet"}</small>${m?`<span class="message-unread-pill" aria-label="${m} unread messages">${m}</span>`:""}</span>
          <span class="message-row-scope">${d.work_order_id?"Work order / ":""}${e(a(d))}${d.preferences?.muted?" / Muted":""}</span>
          </span>
        </button>
      `}return{renderMessageThreadButton:c}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var qi=Q($n());(function(){function l({getLocations:e}){function n(t){let a=e().find(s=>s.id===t.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function a(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function a(s){let u=n(s),r=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),c=e.cleanWorkOrderDescription(s.description)||s.title,d=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${u} is down or needs maintenance attention. At this time, the expected downtime is ${r}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${c}`,`Work order: ${s.title}`,`Equipment: ${u}`,`Current update: ${d}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let a=t?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,u){let r=n(s);return u!==e.OUTSIDE_VENDOR_VALUE?r||null:[r,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(s,u){let r=String(s||"").trim();if(!u?.photo_storage_path)return r||null;let i="[Request photo attached to original request]";return r?`${r}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let a=[];return n.title!==t.title&&a.push("title"),(n.description||"")!==(t.description||"")&&a.push("description"),(n.due_at||"")!==(t.due_at||"")&&a.push("due date"),n.priority!==t.priority&&a.push("priority"),(n.type||"corrective")!==t.type&&a.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&a.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&a.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,a,s=[]){return[...n.map(u=>({...u,type:"comment"})),...t.map(u=>({...u,type:"photo"})),...s.map(u=>({...u,type:"part"})),...a.map(u=>({...u,type:"event"}))].sort((u,r)=>new Date(r.created_at)-new Date(u.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(r){return Number(r.quantity_on_hand)<=Number(r.reorder_point)}function t(){return e.getParts().filter(n)}function a(r){let i=e.getPartSearchQuery().trim().toLowerCase();return i?r.some(c=>String(c??"").toLowerCase().includes(i)):!0}function s(){let r=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:a([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...r].sort((i,c)=>{let d=String(i.supplier_name||"zzzzzz").localeCompare(String(c.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return d||String(i.name||"").localeCompare(String(c.name||""),void 0,{sensitivity:"base"})}):r}function u(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(r=>String(r.supplier_name||"").trim()).filter(Boolean))].sort((r,i)=>r.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:a,partSourceOptions:u}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function a(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,c=e.getRequestViewFilter()){return c==="converted"?a(i):c==="all"?!0:!a(i)&&i.status==="submitted"}function u(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(c=>t(c)&&s(c,i))}function r(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:a,requestMatchesViewFilter:s,filteredRequests:u,requestFilterCounts:r}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function n(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(u){return e.getAssets().find(r=>r.id===u?.parent_asset_id)||null}function t(u){return e.getAssets().filter(r=>r.parent_asset_id===u).sort((r,i)=>r.name.localeCompare(i.name))}function a(u,r){if(!u||!r)return!1;let i=e.getAssets().find(d=>d.id===u),c=new Set;for(;i?.parent_asset_id&&!c.has(i.id);){if(i.parent_asset_id===r)return!0;c.add(i.id),i=e.getAssets().find(d=>d.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(u=>!e.matchesActiveLocation(u)||e.getAssetStatusFilter()!=="all"&&u.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(u.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(u.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([u.name,u.asset_code,u.asset_tag,u.manufacturer,u.model,u.location,u.status,u.asset_type,n(u)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();(function(){function l(e){function n(a){let s=e.getSearchQuery().trim().toLowerCase();return s?a.some(u=>String(u??"").toLowerCase().includes(s)):!0}function t(a,s=e.getSearchQuery()){let u=s.trim().toLowerCase();return u?a.some(r=>String(r??"").toLowerCase().includes(u)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(r){return r.due_at?new Date(`${r.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(r){return{low:1,medium:2,high:3,critical:4}[r]||0}function a(r){return r.completed_at?new Date(r.completed_at).getTime():0}function s(r){return typeof e.assignmentLabel=="function"?e.assignmentLabel(r):r.assigned_profile?.full_name||r.assigned_to||"Unassigned"}function u(r,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(i)-a(r)||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="due"?n(r)-n(i)||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(r.priority)||n(r)-n(i):e.getWorkSort()==="type"?String(r.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="assigned"?s(r).localeCompare(s(i))||new Date(i.created_at)-new Date(r.created_at):new Date(i.created_at)-new Date(r.created_at)}return{compareWorkOrders:u,dueSortValue:n,prioritySortValue:t,completedSortValue:a,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(a){return a?.location_id||a?.assets?.location_id||null}function t(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(a)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(c=>{let d=e.isConversationArchived?.(c)||!1;if(i==="archived")return d&&e.matchesQuery(a(c),e.getMessageSearchQuery());if(d)return!1;let f=i==="all"||i==="favorites"&&c.preferences?.favorite||i==="unread"&&s(c.id)>0||c.thread_type===i,o=e.getMessageSection?.()||"";return f&&(!o||c.preferences?.section_name===o)&&e.matchesQuery(a(c),e.getMessageSearchQuery())}).sort((c,d)=>+!!d.preferences?.favorite-+!!c.preferences?.favorite)}function a(i){let c=e.getMessageThreadMembers().filter(d=>d.thread_id===i.id).map(d=>e.teamMemberName(d.user_id));return[i.title,e.messageThreadScopeLabel(i),...c]}function s(i){let c=e.getMessageReadsByThreadId()[i]?.last_read_at,d=c?new Date(c).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(f=>f.deleted_at||f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>d).length}function u(){return e.getMessageThreads().filter(i=>!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}function r(){return e.getMessageThreads().filter(i=>i.thread_type==="direct"&&!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:a,unreadMessageCount:s,totalUnreadMessages:u,directUnreadMessages:r}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(t)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(t):a==="completed_week"?e.isCompletedThisWeek(t):a==="active"||a==="all"?t.status!=="completed":t.status===a}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],u=e.getEventsByWorkOrder()[t.id]||[],r=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(f=>f.id===t.procedure_template_id),c=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),d=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,d[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...a.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...s.flatMap(f=>[f.body,d[f.author_id]?.full_name]),...u.flatMap(f=>[f.event_type,f.summary,d[f.actor_id]?.full_name]),...r.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...c.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===t:e.isWorkOrderAssignedToUser(a,t))&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var Gi=Q(Cn()),Yi=Q(An()),Ki=Q(Pn()),Ji=Q(En()),Zi=Q(Rn()),Xi=Q(On()),es=Q(Wn());(function(){function l(t){if(!t)return"";let a=new Date(t),s=new Date,u=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),i=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r===u?`Today ${i}`:r===u-864e5?`Yesterday ${i}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let a=new Date(t),s=new Date,u=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return r===u?"Today":r===u-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let a=String(t||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();window.MaintainOpsEquipmentCreateDrafts={createEquipmentCreateDrafts:Fe,createMaintenanceCreateDrafts:At};window.MaintainOpsChecklistResults={createChecklistResultsState:Pt};window.MaintainOpsMaintenanceWorkspaceRows={loadCompleteWorkspaceRows:Et,validateProcedureSteps:Rt};})();
//# sourceMappingURL=runtime.288e1811cb.js.map
