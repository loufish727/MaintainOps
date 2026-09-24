(()=>{var Mn=Object.create;var $t=Object.defineProperty;var Dn=Object.getOwnPropertyDescriptor;var Tn=Object.getOwnPropertyNames;var In=Object.getPrototypeOf,Fn=Object.prototype.hasOwnProperty;var L=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Ln=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Tn(e))!Fn.call(l,a)&&a!==n&&$t(l,a,{get:()=>e[a],enumerable:!(t=Dn(e,a))||t.enumerable});return l};var N=(l,e,n)=>(n=l!=null?Mn(In(l)):{},Ln(e||!l||!l.__esModule?$t(n,"default",{value:l,enumerable:!0}):n,l));var Wt=L((jn,Le)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,a=typeof document<"u"?document:null,i=typeof navigator<"u"?navigator:{},u=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),r=u(),c={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:r,workspaceLoadPending:!1,workspaceLoadWasHidden:a?.visibilityState==="hidden",navigationStartedAt:u(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!i.webdriver},s=new Map,d=0;function f(W){if(W==null||W==="")return null;let $=Number(W);return Number.isFinite($)&&$>=0?$:null}function o(){let W=i.connection||i.mozConnection||i.webkitConnection,$=t?.matchMedia?.("(pointer: coarse)")?.matches,O=f(i.deviceMemory),x=f(i.hardwareConcurrency),I=O!==null&&O<=4||x!==null&&x<=4||$?"constrained":"standard",A=f(t?.innerWidth);return{source:"browser",device_tier:I,viewport_class:A!==null&&A<720?"mobile":A!==null&&A<1100?"tablet":"desktop",connection_type:String(W?.effectiveType||"unknown").slice(0,24),online:i.onLine!==!1,save_data:!!W?.saveData}}function g(W={}){let $={...o(),measurement_version:n,...W};return Object.fromEntries(Object.entries($).filter(([,O])=>O!=null&&O!==""))}function m(W=12e3){!c.client||!c.companyId||c.flushTimer||Date.now()<c.disabledUntil||typeof t?.setTimeout=="function"&&(c.flushTimer=t.setTimeout(()=>{c.flushTimer=null,h()},W))}function p(W,$,O={},x={}){if(!l.has(W))return!1;let I=f($);if(I===null)return!1;let A=Number(I.toFixed(W==="cls"?4:2));return c.latest[W]={metric:W,value:A,unit:e[W],context:g(O),measuredAt:new Date().toISOString()},x.persist!==!1&&c.persistenceEnabled&&(c.pending.push({metric:W,value:A,unit:e[W],context:g(O)}),c.pending.length>60&&c.pending.splice(0,c.pending.length-60),m(x.immediate?250:12e3)),!0}async function h(){if(!c.client||!c.companyId||!c.pending.length||Date.now()<c.disabledUntil)return!1;let W=c.companyId,$=c.pending.splice(0,20),O=null;try{O=(await c.client.rpc("record_app_performance_samples",{target_company_id:W,samples:$})).error||null}catch(I){O=I}if(!O)return c.pending.length&&m(1e3),!0;c.companyId===W&&c.pending.unshift(...$);let x=String(O.message||O).toLowerCase();return c.disabledUntil=Date.now()+(x.includes("could not find")||x.includes("does not exist")?3e5:6e4),!1}function v({client:W,companyId:$}){if(c.client=W||null,c.companyId=$||"",!(!c.client||!c.companyId)){if(c.configuredCompanyId!==c.companyId){c.configuredCompanyId=c.companyId,p("session_start",1,{source:"workspace"},{immediate:!0});let O=i.connection||i.mozConnection||i.webkitConnection;f(O?.downlink)!==null&&p("connection_downlink_mbps",O.downlink,{source:"browser-estimate"}),f(O?.rtt)!==null&&p("connection_rtt_ms",O.rtt,{source:"browser-estimate"})}m(250)}}function y(){c.workspaceStartedAt=u(),c.workspaceLoadPending=!0,c.workspaceLoadWasHidden=a?.visibilityState==="hidden"}function k(W){if(!W)return;if(c.workspaceCompanies.has(W)){c.workspaceLoadPending=!1;return}c.workspaceCompanies.add(W);let $=!c.workspaceLoadWasHidden&&a?.visibilityState!=="hidden";p("workspace_ready_ms",u()-c.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:$}),c.workspaceLoadPending=!1,c.latest.cls||p("cls",d,{source:"performance-observer"},{persist:!1}),$&&t?.setTimeout?.(()=>q(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function q(W=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!c.companyId||!c.workspaceCompanies.has(c.companyId))return;let $=new Set(W);Object.values(c.latest).filter(O=>$.has(O.metric)).forEach(O=>{let x=O.metric==="inp_ms";(x?c.lastPersistedInpValue===O.value:c.persistedVitals.has(O.metric))||p(O.metric,O.value,{source:"performance-observer"})&&(x?c.lastPersistedInpValue=O.value:c.persistedVitals.add(O.metric))})}function S(W=1500){typeof t?.setTimeout=="function"&&(c.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(c.inpCaptureTimer),c.inpCaptureTimer=t.setTimeout(()=>{c.inpCaptureTimer=null,q(["inp_ms"])},W))}function C(){c.navigationStartedAt=u()}function E(W){let $=Number(W);return a?.visibilityState==="hidden"||Number.isFinite($)&&c.lastHiddenAt>=$}function w(W,$=c.navigationStartedAt){p("section_navigation_ms",u()-$,{source:String(W||"workspace").slice(0,48)},{persist:!E($)})}function b(W,$,O=null){p("query_latency_ms",u()-$,{source:String(W||"query").slice(0,48)},{persist:!E($)}),O&&p("client_error",1,{source:`query:${String(W||"unknown").slice(0,36)}`},{immediate:!0})}function P(W={}){let $={source:"performance-room",quality_tier:W.qualityTier||"unknown"};Object.entries({spatial_ready_ms:W.readyMs,spatial_fps:W.fps,spatial_frame_ms:W.frameMs,spatial_slow_frame_pct:W.slowFramePercent,spatial_draw_calls:W.drawCalls,spatial_triangles:W.triangles,spatial_geometries:W.geometries,spatial_textures:W.textures,webgl_context_loss:Number(W.contextLosses)>0?W.contextLosses:void 0}).forEach(([O,x])=>{f(x)!==null&&p(O,x,$)}),m(500)}function _(){return{latest:{...c.latest},connection:o(),pendingCount:c.pending.length,measurementVersion:n,persistenceEnabled:c.persistenceEnabled}}function D(W,$,O={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(W)))try{new PerformanceObserver(I=>$(I.getEntries())).observe({type:W,...O})}catch{}}D("paint",W=>{let $=W.find(O=>O.name==="first-contentful-paint");$&&p("fcp_ms",$.startTime,{source:"performance-observer"},{persist:!1})}),D("largest-contentful-paint",W=>{let $=W.at(-1);$&&p("lcp_ms",$.startTime,{source:"performance-observer"},{persist:!1})}),D("layout-shift",W=>{W.forEach($=>{$.hadRecentInput||(d+=$.value)}),p("cls",d,{source:"performance-observer"},{persist:!1})}),D("event",W=>{W.forEach(O=>{O.interactionId&&s.set(O.interactionId,Math.max(s.get(O.interactionId)||0,O.duration))});let $=[...s.values()].sort((O,x)=>x-O);$.length&&(p("inp_ms",$[Math.min(Math.floor($.length/50),10)],{source:"performance-observer"},{persist:!1}),S())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>p("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>p("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{c.offlineStartedAt=u(),p("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{c.offlineStartedAt&&p("reconnect_ms",u()-c.offlineStartedAt,{source:"network"},{immediate:!0}),c.offlineStartedAt=0}),a?.addEventListener?.("visibilitychange",()=>{a.visibilityState==="hidden"&&(c.lastHiddenAt=u(),c.workspaceLoadPending&&(c.workspaceLoadWasHidden=!0),q(),h())});let R={beginWorkspaceLoad:y,configure:v,flush:h,markNavigationStart:C,markWorkspaceReady:k,record:p,recordQueryLatency:b,recordSectionNavigation:w,recordSpatial:P,snapshot:_};typeof window<"u"&&(window.MaintainOpsAppTelemetry=R),typeof Le<"u"&&(Le.exports=R)})()});var Ot=L((zn,Ne)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,a){let i=String(n||"");return!(!l(t)&&!l(a)||["TOKEN_REFRESHED","SIGNED_IN","INITIAL_SESSION"].includes(i)&&l(t)&&l(t)===l(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Ne<"u"&&(Ne.exports={shouldRenderForAuthEvent:e})})()});var xt=L((Vn,Ue)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(r,c,s){if(!r||!r.getItem)return s;let d=r.getItem(c);return d??s}function n(r,c){let s=Number(e(r,c,"1"));return Number.isFinite(s)&&s>0?s:1}function t(r,c,s){!r||!r.setItem||r.setItem(c,String(s))}function a(r,c){try{let s=JSON.parse(e(r,c,"{}"));return s&&typeof s=="object"&&!Array.isArray(s)?s:{}}catch{return{}}}function i(r,c){!r||!r.removeItem||r.removeItem(c)}function u(r={}){let c=r.storage||localStorage,s={activeSection:e(c,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(c,l.activeMessageThreadId,""),searchQuery:e(c,l.searchQuery,""),workOrderSearchMode:e(c,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(c,l.messageThreadFilter,"all"),messageThreadsPage:n(c,l.messageThreadsPage),messageSearchQuery:e(c,l.messageSearchQuery,""),messageComposerWorkOrderId:e(c,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(c,l.managerDashboardUserId,""),managerDashboardMetric:e(c,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(c,l.myWorkFilter,"assigned"),workOrderFilter:e(c,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(c,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(c,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(c,l.workOrderPriorityFilter,"all"),workSort:e(c,l.workSort,"newest"),workGroup:e(c,l.workGroup,"none"),requestViewFilter:e(c,l.requestViewFilter,"active"),workOrderPage:n(c,l.workOrderPage),partsPage:n(c,l.partsPage),assetsPage:n(c,l.assetsPage),financialPage:n(c,l.financialPage),financialMissingFilter:e(c,l.financialMissingFilter,"all"),financialLocationFilter:e(c,l.financialLocationFilter,"all"),financialTypeFilter:e(c,l.financialTypeFilter,"all"),financialAreaFilter:e(c,l.financialAreaFilter,"all"),requestsPage:n(c,l.requestsPage),planningOverduePage:n(c,l.planningOverduePage),planningTodayPage:n(c,l.planningTodayPage),planningSoonPage:n(c,l.planningSoonPage),planningNoDuePage:n(c,l.planningNoDuePage),planningFollowUpPage:n(c,l.planningFollowUpPage),planningPmPage:n(c,l.planningPmPage),planningGroupOpen:a(c,l.planningGroupOpen),schedulesPage:n(c,l.schedulesPage),proceduresPage:n(c,l.proceduresPage),membersPage:n(c,l.membersPage),assetStatusFilter:e(c,l.assetStatusFilter,"all"),assetTypeFilter:e(c,l.assetTypeFilter,"all"),assetAreaFilter:e(c,l.assetAreaFilter,"all"),partInventoryFilter:e(c,l.partInventoryFilter,"all"),partSort:e(c,l.partSort,"default"),partSearchQuery:e(c,l.partSearchQuery,"")};e(c,l.sectionSplitDone,"")!=="true"&&s.activeSection==="work"&&(s.activeSection="mywork",t(c,l.activeSection,s.activeSection),t(c,l.sectionSplitDone,"true")),s.activeSection==="performance"&&(s.activeSection="mywork",t(c,l.activeSection,s.activeSection));let d=(o,g,m)=>{s[o]=g,m&&t(c,m,g)},f=(o,g)=>{d(o,1,g)};return{getActiveSection:()=>s.activeSection,setActiveSection:o=>d("activeSection",o,l.activeSection),getActiveWorkOrderId:()=>s.activeWorkOrderId,setActiveWorkOrderId:o=>d("activeWorkOrderId",o),getActiveAssetId:()=>s.activeAssetId,setActiveAssetId:o=>d("activeAssetId",o),getActivePartId:()=>s.activePartId,setActivePartId:o=>d("activePartId",o),getActiveMessageThreadId:()=>s.activeMessageThreadId,setActiveMessageThreadId:o=>d("activeMessageThreadId",o,l.activeMessageThreadId),getMessageThreadFilter:()=>s.messageThreadFilter,setMessageThreadFilter:o=>d("messageThreadFilter",o,l.messageThreadFilter),getMessageThreadsPage:()=>s.messageThreadsPage,setMessageThreadsPage:o=>d("messageThreadsPage",o,l.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>s.messageSearchQuery,setMessageSearchQuery:o=>d("messageSearchQuery",o,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>s.messageComposerWorkOrderId,setMessageComposerWorkOrderId:o=>d("messageComposerWorkOrderId",o,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>s.messageComposerOpen,setMessageComposerOpen:o=>d("messageComposerOpen",!!o),getManagerDashboardUserId:()=>s.managerDashboardUserId,setManagerDashboardUserId:o=>d("managerDashboardUserId",o||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>s.managerDashboardMetric,setManagerDashboardMetric:o=>d("managerDashboardMetric",o||"open",l.managerDashboardMetric),getSearchQuery:()=>s.searchQuery,setSearchQuery:o=>d("searchQuery",o,l.searchQuery),getWorkOrderSearchMode:()=>s.workOrderSearchMode,setWorkOrderSearchMode:o=>d("workOrderSearchMode",!!o,l.workOrderSearchMode),getActiveStatusFilter:()=>s.activeStatusFilter,setActiveStatusFilter:o=>d("activeStatusFilter",o),getMyWorkFilter:()=>s.myWorkFilter,setMyWorkFilter:o=>d("myWorkFilter",o,l.myWorkFilter),getWorkOrderFilter:()=>s.workOrderFilter,setWorkOrderFilter:o=>d("workOrderFilter",o,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>s.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:o=>{d("workOrderAssigneeFilter",o),o?t(c,l.workOrderAssigneeFilter,o):i(c,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>s.workOrderTypeFilter,setWorkOrderTypeFilter:o=>d("workOrderTypeFilter",o||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>s.workOrderPriorityFilter,setWorkOrderPriorityFilter:o=>d("workOrderPriorityFilter",o||"all",l.workOrderPriorityFilter),getWorkSort:()=>s.workSort,setWorkSort:o=>d("workSort",o,l.workSort),getWorkGroup:()=>s.workGroup,setWorkGroup:o=>d("workGroup",o||"none",l.workGroup),getRequestViewFilter:()=>s.requestViewFilter,setRequestViewFilter:o=>d("requestViewFilter",o,l.requestViewFilter),getWorkOrderPage:()=>s.workOrderPage,setWorkOrderPage:o=>d("workOrderPage",o,l.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",l.workOrderPage),getPartsPage:()=>s.partsPage,setPartsPage:o=>d("partsPage",o,l.partsPage),resetPartsPage:()=>f("partsPage",l.partsPage),getAssetsPage:()=>s.assetsPage,setAssetsPage:o=>d("assetsPage",o,l.assetsPage),resetAssetsPage:()=>f("assetsPage",l.assetsPage),getFinancialPage:()=>s.financialPage,setFinancialPage:o=>d("financialPage",o,l.financialPage),resetFinancialPage:()=>f("financialPage",l.financialPage),getFinancialMissingFilter:()=>s.financialMissingFilter,setFinancialMissingFilter:o=>d("financialMissingFilter",o||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>s.financialLocationFilter,setFinancialLocationFilter:o=>d("financialLocationFilter",o||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>s.financialTypeFilter,setFinancialTypeFilter:o=>d("financialTypeFilter",o||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>s.financialAreaFilter,setFinancialAreaFilter:o=>d("financialAreaFilter",o||"all",l.financialAreaFilter),getRequestsPage:()=>s.requestsPage,setRequestsPage:o=>d("requestsPage",o,l.requestsPage),resetRequestsPage:()=>f("requestsPage",l.requestsPage),getPlanningPage:o=>o==="overdue"?s.planningOverduePage:o==="today"?s.planningTodayPage:o==="soon"?s.planningSoonPage:o==="no-due"?s.planningNoDuePage:o==="follow-up"?s.planningFollowUpPage:o==="pm"?s.planningPmPage:1,setPlanningPage:(o,g)=>{o==="overdue"&&d("planningOverduePage",g,l.planningOverduePage),o==="today"&&d("planningTodayPage",g,l.planningTodayPage),o==="soon"&&d("planningSoonPage",g,l.planningSoonPage),o==="no-due"&&d("planningNoDuePage",g,l.planningNoDuePage),o==="follow-up"&&d("planningFollowUpPage",g,l.planningFollowUpPage),o==="pm"&&d("planningPmPage",g,l.planningPmPage)},getPlanningGroupOpen:(o,g=!1)=>Object.prototype.hasOwnProperty.call(s.planningGroupOpen,o)?!!s.planningGroupOpen[o]:!!g,setPlanningGroupOpen:(o,g)=>{s.planningGroupOpen={...s.planningGroupOpen,[o]:!!g},t(c,l.planningGroupOpen,JSON.stringify(s.planningGroupOpen))},getSchedulesPage:()=>s.schedulesPage,setSchedulesPage:o=>d("schedulesPage",o,l.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",l.schedulesPage),getProceduresPage:()=>s.proceduresPage,setProceduresPage:o=>d("proceduresPage",o,l.proceduresPage),resetProceduresPage:()=>f("proceduresPage",l.proceduresPage),getMembersPage:()=>s.membersPage,setMembersPage:o=>d("membersPage",o,l.membersPage),resetMembersPage:()=>f("membersPage",l.membersPage),getAssetStatusFilter:()=>s.assetStatusFilter,setAssetStatusFilter:o=>d("assetStatusFilter",o,l.assetStatusFilter),getAssetTypeFilter:()=>s.assetTypeFilter,setAssetTypeFilter:o=>d("assetTypeFilter",o,l.assetTypeFilter),getAssetAreaFilter:()=>s.assetAreaFilter,setAssetAreaFilter:o=>d("assetAreaFilter",o,l.assetAreaFilter),getPartInventoryFilter:()=>s.partInventoryFilter,setPartInventoryFilter:o=>d("partInventoryFilter",o,l.partInventoryFilter),getPartSort:()=>s.partSort,setPartSort:o=>d("partSort",o||"default",l.partSort),getPartSearchQuery:()=>s.partSearchQuery,setPartSearchQuery:o=>d("partSearchQuery",o,l.partSearchQuery),snapshot:()=>({...s})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:u},typeof Ue<"u"&&(Ue.exports={createWorkspaceUiState:u})})()});var Mt=L((Gn,qe)=>{(function(){function l(a){return!!String(a?.production_action||"").trim()}function e(a){return l(a)&&a?.production_action_status==="open"}function n(a,i){return!a||!i?!1:a.assigned_to===i||e(a)&&a.production_action_assigned_to===i}function t(a){return e(a)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof qe<"u"&&qe.exports&&(qe.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var Dt=L((Hn,Se)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",a=>a.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let i=n.getElementById(t.getAttribute("aria-controls"));!i||i.open||(typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let i=t.closest("[data-production-action-dialog]");i&&(typeof i.close=="function"?i.close():i.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof Se<"u"&&Se.exports&&(Se.exports={bindWorkspaceProductionActionEvents:l})})()});var Tt=L((Yn,Qe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:l},typeof Qe<"u"&&(Qe.exports={bindWorkspaceWorkOrderNotificationEvents:l})})()});var It=L((Kn,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData,a=new Set;function i(s){return e.getActiveWorkOrderId()!==s?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(d=>d.checked)}function u(s){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.checked=s.target.checked})}async function r(s){s.preventDefault();let d=s.target,f=d.querySelector("button[type='submit']"),o=n.querySelector("#completion-error"),g=e.getActiveWorkOrderId(),m=e.getWorkOrderById(g),p=e.getScope?.(),h=()=>e.getScope?.()===p;if(!m||a.has(g))return;let v=e.blocksProcedureCompletion?.(m);if(v){o&&(o.textContent=v);return}let y=e.getProcedureById(m?.procedure_template_id),k=y?e.requiredChecklistProgress(m,y):{done:0,total:0},q=e.productionActionCompletionMessage?.(m)||"";if(q){o&&(o.textContent=q),e.setWorkOrderActionWarning(g,q),e.showNotice(q,"warning");return}if(k.done<k.total){o&&(o.textContent=`Complete required checklist steps first (${k.done}/${k.total}).`);return}let S=new t(d),C=S.get("safety_devices_checked")==="on"||i(g)||e.hasCompletedSafetyDeviceCheck(m);if(e.requiresSafetyDeviceCheck(m)&&!C){o&&(o.textContent="Check safety devices before completing equipment work.");return}f.disabled=!0,a.add(g),f.textContent="Completing...",o&&(o.textContent="");let E=!1;try{let w={status:"completed",asset_id:m?.asset_id||null,actual_minutes:Number(S.get("actual_minutes"))||0,failure_cause:S.get("failure_cause")||null,resolution_summary:S.get("resolution_summary")||null,follow_up_needed:S.get("follow_up_needed")==="on",completion_notes:S.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(w),e.applySafetyCheckPayload(w,w.safety_check_required&&C),delete w.asset_id;let{error:b}=await e.withOperationTimeout(e.updateWorkOrderSafely(w,g),"Complete work save timed out. Check your connection and try again.",2e4);if(!h())return;if(b){o&&(o.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(b)}`);return}E=!0;let P;try{let _=await e.withOperationTimeout(e.recordWorkOrderEvent(g,"completed",S.get("resolution_summary")||S.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3);P=_?.error||(_ instanceof Error?_:null)}catch(_){P=_}if(!h())return;e.setWorkOrderActionWarning("",""),e.showNotice(P?`Work order completed, but history did not update: ${P.message||P}`:"Work order completed.",P?"warning":"success"),await e.render()}catch(w){h()&&(E?e.showNotice(`Work order completed, but the screen could not update: ${w.message||w}`,"warning"):o?o.textContent=`Could not complete work order: ${w.message||w}`:e.alertRef(w.message||w))}finally{a.delete(g),f.disabled=!1,f.textContent="Complete Work Order"}}function c(){let s=n.querySelector("#complete-work-order-form");s&&s.addEventListener("submit",r),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.addEventListener("change",u)})}return{bindWorkspaceWorkOrderCompletionEvents:c,completeWorkOrder:r,currentSafetyCheckboxCheckedForWorkOrder:i,syncSafetyDeviceChecks:u}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof $e<"u"&&$e.exports&&($e.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var Ft=L((Jn,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,a=e.BlobCtor||Blob,i=e.alertRef||alert,u=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,r=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:b=>String(b||"machine").replaceAll("_"," "),c=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:b=>String(b||"corrective").replaceAll("_"," "),s={machine:10,traveling_machine:15,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function d(b){return(e.getAssetDocumentsByAssetId?.()[b]||[]).filter(P=>String(P.content_type||"").startsWith("image/")||P.document_type==="machine_photo"||P.document_type==="nameplate")}function f(b){return d(b).map(P=>P.original_file_name||P.file_name||P.storage_path||P.id).filter(Boolean).join("; ")}function o(b,P){return b?.parent_asset_id&&P.get(b.parent_asset_id)?.name||""}function g(b){return e.getLocations?.().find(P=>P.id===b)?.name||""}function m(b){if(!b)return"";let P=e.getProfilesByUserId?.()[b];return P?.full_name||P?.email||b}function p(b){return String(g(b.location_id)||b.location_id||b.location||"")}function h(b){return{id:`financial:${b.id}`,financialRecord:b,name:b.archived_asset_name||"Deleted equipment",asset_type:b.archived_asset_type||"machine",asset_code:b.archived_asset_code||"",asset_tag:b.archived_asset_tag||"",manufacturer:b.archived_manufacturer||"",model:b.archived_model||"",location_id:b.archived_location_id||"",location:b.archived_location||"",status:"deleted"}}function v(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(b=>!b.asset_id).map(h)]}function y(b,P,_){let D=p(b).localeCompare(p(P));if(D)return D;let R=(s[b.asset_type||"machine"]||999)-(s[P.asset_type||"machine"]||999);return R||String(o(b,_)).localeCompare(String(o(P,_)))||String(b.location||"").localeCompare(String(P.location||""))||String(b.name||"").localeCompare(String(P.name||""))}function k(){let b=e.getAssets().filter(u),P=new Map(b.map(_=>[_.id,_]));return[...b].sort((_,D)=>y(_,D,P)).map(_=>({equipment_type:r(_.asset_type),name:_.name,parent_equipment:o(_,P),serial_number:_.asset_code||"",asset_tag:_.asset_tag||"",manufacturer:_.manufacturer||"",model:_.model||"",picture_id:f(_.id),picture_count:d(_.id).length,picture_status:d(_.id).length?"attached":"missing",facility:g(_.location_id)||_.location_id||"",area_department:_.location||"",status:_.status}))}function q(){let b=v(),P=new Map(b.map(D=>[D.id,D])),_=e.getAssetFinancialsByAssetId?.()||{};return[...b].sort((D,R)=>y(D,R,P)).map(D=>{let R=D.financialRecord||_[D.id]||{};return{operational_status:D.financialRecord?"deleted":"active",equipment_type:r(D.asset_type),name:D.name,parent_equipment:o(D,P),facility:g(D.location_id)||D.location_id||"",area_department:D.location||"",serial_number:D.asset_code||"",equipment_asset_tag:D.asset_tag||"",manufacturer:D.manufacturer||"",model:D.model||"",picture_status:d(D.id).length?"attached":"missing",asset_tag:R.asset_tag||"",acquisition_date:R.acquisition_date||"",acquisition_cost:R.acquisition_cost||"",depreciation_method:R.depreciation_method||"",useful_life_years:R.useful_life_years||"",current_book_value:R.current_book_value||"",tax_jurisdiction:R.tax_jurisdiction||"",ownership_status:R.ownership_status||"",in_service_date:R.in_service_date||"",disposal_date:R.disposal_date||"",disposal_notes:R.disposal_notes||"",gl_account_code:R.gl_account_code||"",cost_center:R.cost_center||"",finance_notes:R.finance_notes||"",needs_review:!!R.needs_review,last_reviewed_at:R.last_reviewed_at||"",reviewed_by:m(R.reviewed_by)}})}async function S(b){let P=e.getExportScope(),_=e.createExportQuery(b),D=[],R;try{for(;D.length<1e5;){let W=await e.withOperationTimeout(_.range(D.length,D.length+499),"Export timed out. Try again.",2e4);if(W.error)throw W.error;if(e.getExportScope()!==P)throw new Error("Workspace changed. Export again from the intended location.");if(!Number.isInteger(W.count))throw new Error("Export could not verify the total record count.");if(R!==void 0&&R!==W.count)throw new Error("Records changed during export. Try again.");if(R=W.count,D.push(...W.data||[]),new Set(D.map($=>$.id)).size!==D.length)throw new Error("Records moved during export. Try again.");if(D.length===R)return E(b,D);if(!W.data?.length||D.length>R)throw new Error("Export returned an incomplete list. Try again.")}throw new Error("Export exceeds 100,000 records. Narrow the filters and try again.")}catch(W){i(`Could not export: ${W.message||W}`)}}function C(){let b=e.getActiveSection();return e.createExportQuery&&["work","mywork","requests"].includes(b)?S(b):E(b)}function E(b,P){let _={work:{filename:"work-orders.csv",rows:(P&&b!=="requests"?P:e.getWorkOrders()).map(R=>({title:R.title,status:R.status,priority:R.priority,type:c(R.type),equipment:R.assets?.name||"",assigned_to:e.assignmentLabel(R),due_at:R.due_at||"",completed_at:R.completed_at||"",actual_minutes:R.actual_minutes||0,failure_cause:R.failure_cause||"",resolution_summary:R.resolution_summary||"",follow_up_needed:!!R.follow_up_needed}))},assets:{filename:"equipment.csv",rows:k()},financial:{filename:"equipment-financial.csv",rows:q()},requests:{filename:"maintenance-requests.csv",rows:(P&&b==="requests"?P:e.getMaintenanceRequests()).map(R=>({title:R.title,status:R.status,priority:R.priority,equipment:R.assets?.name||"",requested_by:e.getProfilesByUserId()[R.requested_by]?.full_name||"",created_at:R.created_at||"",converted_work_order_id:R.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(R=>({title:R.title,equipment:R.assets?.name||"",frequency:R.frequency,next_due_at:R.next_due_at,active:R.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(R=>({name:R.name,sku:R.sku||"",supplier_name:R.supplier_name||"",quantity_on_hand:R.quantity_on_hand,reorder_point:R.reorder_point,unit_cost:R.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(R=>({name:R.name,description:R.description||"",steps:R.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(R=>({user_id:R.user_id,name:e.getProfilesByUserId()[R.user_id]?.full_name||"",role:R.role}))}},D=_[b]||_.work;if(!D.rows.length)return i("Nothing to export in this section yet.");w(D.filename,D.rows)}function w(b,P){let _=Object.keys(P[0]),D=[_.join(","),...P.map(O=>_.map(x=>e.csvCell(O[x])).join(","))],R=new a([`\uFEFF${D.join(`
`)}`],{type:"text/csv;charset=utf-8"}),W=t.createObjectURL(R),$=n.createElement("a");$.href=W,$.download=b,n.body.appendChild($),$.click(),$.remove(),t.revokeObjectURL(W)}return{downloadCsv:w,exportActiveSectionCsv:C}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Lt=L((Zn,Be)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let u=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(u)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Be<"u"&&(Be.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var Nt=L((Xn,je)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(i){let u=String.fromCharCode(...i),r=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return r?r(u).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(n.crypto?.getRandomValues){let i=new Uint8Array(18);return n.crypto.getRandomValues(i),t(i)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=l(),typeof je<"u"&&(je.exports={createPublicRequestTokenHelpers:l})})()});var Ut=L((er,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,a=e.disablePublicRequestLink,i=e.setPublicRequestLinkActive,u=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.createPublicRequestLink))}),typeof a=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>a(r.dataset.disablePublicRequestLink))}),typeof i=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>i(r.dataset.enablePublicRequestLink,!0))}),typeof u=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(r=>{r.addEventListener("click",()=>u(r.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof ze<"u"&&(ze.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Qt=L((tr,Ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async i=>{i.preventDefault(),i.stopPropagation?.();let u=a.querySelector?.("button[type='submit']");if(!u?.disabled){u&&(u.disabled=!0);try{let r=a.querySelector?.("[name='planning_due_at']");await t(a.dataset.planningDueForm,r?.value)}finally{u?.isConnected&&(u.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof Ve<"u"&&(Ve.exports={bindWorkspacePlanningDueDateEvents:l})})()});var Bt=L((nr,Ge)=>{(function(){let l=new WeakSet;function e(a,i,u){if(!a)return;let r=a.querySelector("[data-equipment-choice-existing]"),c=a.querySelector("[data-equipment-choice-new]"),s=i==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(d=>{let f=d.value===(s?"new":"existing");d.checked=f,d.closest("label")?.classList.toggle("active",f)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(d=>{d.hidden=d.dataset.equipmentChoicePanel!==(s?"new":"existing")}),r&&(r.disabled=s,r.required=!s&&r.dataset.equipmentChoiceRequired==="true",s&&(r.value=""),typeof u=="function"&&u(r)),c&&(c.disabled=!s,c.required=s&&c.dataset.equipmentChoiceRequired==="true",s||(c.value=""))}function n(a,i){a.querySelectorAll("[data-equipment-choice]").forEach(u=>{let r=u.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(u,r,i)})}function t(a={}){let i=a.documentRef||document,u=a.updateAssetLocationWarning;n(i,u),!l.has(i)&&(l.add(i),i.addEventListener("change",r=>{let c=r.target.closest?.("[data-equipment-choice-mode]");if(c){e(c.closest("[data-equipment-choice]"),c.value,u);return}let s=r.target.closest?.("[data-equipment-choice-existing]");s&&typeof u=="function"&&u(s)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Ge<"u"&&(Ge.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var jt=L((rr,He)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:a,createQuickFixAsset:i,getMaintenanceRequests:u,getQuickFixRequestId:r,getActiveCompanyId:c,getSession:s,getParts:d,getRequestsReady:f,getSupabaseClient:o,confirmAssetLocationRouting:g,assetRequiresSafety:m,blocksProcedureCompletion:p,setWorkOrderActionWarning:h,locationIdForAsset:v,descriptionWithRequestPhotoNote:y,descriptionWithAssignmentNote:k,assignedUserFromForm:q,procedureColumn:S,workOrderDateValue:C,applySafetyRequirementPayload:E,applySafetyCheckPayload:w,insertWithOptionalProcedure:b,friendlyWorkOrderSaveError:P,addPartUsageToWorkOrder:_,addPhotoToWorkOrder:D,updateAssetStatus:R,recordWorkOrderEvent:W,setActiveWorkOrderIdState:$,setActiveAssetIdState:O,setCreateWorkOrderMode:x,setQuickFixMode:I,setQuickFixAssetId:A,setQuickFixRequestId:Q,showNotice:H,render:se,alertUser:pe=le=>window.alert(le)}=e;async function ye(le){le.preventDefault();let fe=le.currentTarget,re=n.querySelector("#quick-fix-error"),te=fe.querySelector("button[type='submit']");re&&(re.textContent=""),te&&(te.disabled=!0,te.textContent="Saving...");try{let B=new t(fe),me=String(B.get("title")||"").trim();if(!me)throw new Error("Quick Fix issue is required.");let ge=r(),T=c(),U=s(),j=String(B.get("description")||"").trim(),V=String(B.get("resolution_summary")||"").trim(),G=V||me,J=j||me,z=B.get("mark_completed")==="on",X=B.get("machine_down")==="on",Y=B.get("asset_id")||null,ce=ge?u().find(ae=>ae.id===ge):null,Z=String(B.get("new_asset_name")||"").trim();if(Y&&Z)throw new Error("Choose existing equipment or create new equipment, not both.");if(Z){let{data:ae,error:K}=await a(i(Z,X?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(K){re&&(re.textContent=K.message);return}Y=ae.id}if(!Z&&!g(Y,"logging this Quick Fix",re))return;if(z&&m(Y)&&B.get("safety_devices_checked")!=="on"){re&&(re.textContent="Check safety devices before marking equipment work complete.");return}let F=z?p(null,B.get("procedure_template_id")||null):"";if(F){h("",""),re&&(re.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let ne={company_id:T,location_id:v(Y),title:me,description:y(k(J,B.get("assigned_to")),ce),asset_id:Y,assigned_to:q(B,U.user.id),priority:B.get("priority")||"medium",type:B.get("type")||"corrective",status:z?"completed":"open",due_at:C(B.get("due_at")),created_by:U.user.id,...S(B.get("procedure_template_id")),actual_minutes:0,failure_cause:B.get("failure_cause")||null,resolution_summary:z?G:V||null,follow_up_needed:B.get("follow_up_needed")==="on",completion_notes:z?G:null,completed_at:z?new Date().toISOString():null};E(ne),w(ne,z&&ne.safety_check_required&&B.get("safety_devices_checked")==="on");let{data:ue,error:he}=await a(b("work_orders",ne,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(he){re&&(re.textContent=`Could not log quick fix: ${P(he)}`);return}let ie=[],we=B.get("part_id"),ee=Number(B.get("quantity_used"))||1;if(we){let ae=d().find(ve=>ve.id===we),K=await a(_(ue.id,ae,ee),"Part usage save timed out.",12e3).catch(ve=>ve);K&&ie.push(`part usage failed: ${K.message}`)}let de=B.get("photo");if(de&&de.name&&!e.reviewCreatedAttachments){let ae=await a(D(ue.id,de),"Photo upload timed out.",25e3).catch(K=>K);ae&&ie.push(`photo upload failed: ${ae.message}`)}let ke=X?"offline":B.get("asset_status");if(ne.asset_id&&!Z&&(X||z&&ke)){let ae=await a(R(ne.asset_id,ke),"Equipment status update timed out.",12e3).catch(K=>K);ae?ie.push(`equipment status did not update: ${ae.message}`):await a(W(ue.id,"asset_status_updated",X?"Equipment marked offline/down.":`Equipment status set to ${ke}.`),"Activity log timed out.",8e3).catch(K=>ie.push(`history did not update: ${K.message}`))}if(await a(W(ue.id,"quick_fix",z?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ae=>ie.push(`history did not update: ${ae.message}`)),Z&&await a(W(ue.id,"equipment_created",`Equipment created from Quick Fix: ${Z}.`),"Activity log timed out.",8e3).catch(ae=>ie.push(`history did not update: ${ae.message}`)),ge&&f()){let ae=await a(o().from("maintenance_requests").update({status:"converted",reviewed_by:U.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:ue.id}).eq("id",ge).eq("company_id",T),"Request status update timed out.",12e3).catch(K=>({error:K}));ae.error?ie.push(`request status did not update: ${ae.error.message}`):await a(W(ue.id,"request_quick_fixed",z?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(K=>ie.push(`history did not update: ${K.message}`))}$(ue.id),O(null),x(!1),I(!1),A(null),Q(null),H(ie.length?`Quick Fix saved with warning: ${ie[0]}`:"Quick Fix saved.",ie.length?"warning":"success"),await se(),e.reviewCreatedAttachments&&await e.reviewCreatedAttachments(ue.id,(B.getAll?B.getAll("photo"):[de]).filter(ae=>ae?.name),T,U.user.id)}catch(B){re?re.textContent=`Could not log quick fix: ${B.message||B}`:pe(B.message||B)}finally{te&&te.isConnected&&(te.disabled=!1,te.textContent="Log Quick Fix")}}return{createQuickFix:ye}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof He<"u"&&(He.exports={createQuickFixWorkflow:l})})()});var zt=L((ar,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let p=n.querySelector("#add-member-form");p&&p.addEventListener("submit",i),n.querySelectorAll("[data-member-role]").forEach(S=>{S.addEventListener("submit",u)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",r);let v=n.querySelector("#password-change-form");v&&v.addEventListener("submit",d);let y=n.querySelector("#team-invite-form");y&&y.addEventListener("submit",c);let k=n.querySelector("#team-invite-link-form");k&&k.addEventListener("submit",f),n.querySelectorAll("[data-revoke-invite-link]").forEach(S=>{S.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(S.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(S=>{S.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(S=>{S.addEventListener("click",()=>o(S.dataset.confirmRevokeInviteLink))});let q=n.querySelector("#request-notification-recipient-form");q&&q.addEventListener("submit",g),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(S=>{S.addEventListener("click",()=>m(S.dataset.deleteRequestNotificationRecipient))})}async function i(p){p.preventDefault();let h=p.currentTarget,v=new t(h),y=String(v.get("role")||"technician").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&y!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}k&&(k.disabled=!0,k.textContent="Adding...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:v.get("user_id"),role:y}),"Team member save timed out.");if(q)throw q;await e.render()}catch(q){e.alertUser(q.message||q)}finally{k?.isConnected&&(k.disabled=!1,k.textContent="Add Member")}}async function u(p){p.preventDefault();let h=p.currentTarget,v=new t(h),y=String(v.get("role")||"").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}k&&(k.disabled=!0,k.textContent="Saving...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:y}),"Role save timed out. Check your connection and try again.",15e3);if(q)throw new Error(q.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":q.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(q){e.showNotice(`Could not save role: ${q.message||q}`,"warning")}finally{k&&(k.disabled=!1,k.textContent="Save Role")}}async function r(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#profile-error"),y=h.querySelector("button[type='submit']"),k=new t(h),q=String(k.get("full_name")||"").trim(),S=h.querySelector('input[name="mobile_tech"]'),C=S?S.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;v&&(v.textContent=""),y&&(y.disabled=!0,y.textContent="Saving...");try{let{error:E}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:q,mobile_tech:C},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(E)throw e.isMissingColumnError(E,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):E;e.showNotice("Profile saved."),await e.render()}catch(E){v&&(v.textContent=E.message||"Could not save profile.")}finally{y&&(y.disabled=!1,y.textContent="Save Profile")}}async function c(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#team-invite-error"),y=h.querySelector("button[type='submit']"),k=new t(h),q=String(k.get("role")||"technician").trim().toLowerCase();if(v&&(v.textContent=""),!e.getTeamInvitesReady()){v&&(v.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&q!=="technician"){v&&(v.textContent="Only admins can invite managers or admins.");return}y&&(y.disabled=!0,y.textContent="Inviting...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(k.get("email")||"").trim(),invite_role:q,invite_default_location_id:k.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(S)throw S.message.includes("create_company_invite")||e.isColumnSchemaError(S,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):S;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(S){v&&(v.textContent=S.message||"Could not create invite.")}finally{y&&(y.disabled=!1,y.textContent="Create Invite")}}async function s(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:p}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function d(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#password-change-error"),y=h.querySelector("button[type='submit']"),k=new t(h),q=String(k.get("password")||""),S=String(k.get("confirmPassword")||"");if(v&&(v.textContent=""),q.length<8){v&&(v.textContent="Password must be at least 8 characters.");return}if(q!==S){v&&(v.textContent="Passwords do not match.");return}y&&(y.disabled=!0,y.textContent="Updating...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:q}),"Password update timed out. Check your connection and try again.",15e3);if(C)throw C;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(C){v&&(v.textContent=C.message||"Could not update password.")}finally{y&&(y.disabled=!1,y.textContent="Update Password")}}async function f(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#team-invite-link-error"),y=h.querySelector("button[type='submit']"),k=new t(h),q=String(k.get("role")||"technician").trim().toLowerCase();if(v&&(v.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let S="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(S),v&&(v.textContent=S);return}if(q==="admin"){let S="Admin join links are not allowed.";e.setTeamInviteLinkError(S),v&&(v.textContent=S);return}if(!e.canAdministerTeamRoles?.()&&q!=="technician"){let S="Managers can only create technician join links.";e.setTeamInviteLinkError(S),v&&(v.textContent=S);return}y&&(y.disabled=!0,y.textContent="Creating...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:q,link_location_id:k.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(S)throw S.message.includes("create_company_invite_link")||e.isColumnSchemaError(S,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):S;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(S){let C=S.message||"Could not create join link.";e.setTeamInviteLinkError(C),v&&(v.textContent=C)}finally{y&&(y.disabled=!1,y.textContent="Create Join Link")}}async function o(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:p}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function g(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#request-notification-recipient-error"),y=h.querySelector("button[type='submit']"),k=new t(h);if(v&&(v.textContent=""),!e.canAdministerTeamRoles?.()){let q="Only admins can change request email routing.";e.setRequestNotificationRecipientError(q),v&&(v.textContent=q);return}if(!e.getRequestNotificationRecipientsReady()){v&&(v.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}y&&(y.disabled=!0,y.textContent="Adding...");try{let q=String(k.get("email")||"").trim().toLowerCase(),{error:S}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:k.get("location_id")||null,email:q,label:String(k.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(S)throw e.isColumnSchemaError(S,["request_notification_recipients"])||S.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):S;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(q){let S=q.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(S),v&&(v.textContent=S)}finally{y&&(y.disabled=!1,y.textContent="Add Recipient")}}async function m(p){if(!(!p||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",p),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:i,updateCompanyMemberRole:u,updateMyProfile:r,updateMyPassword:d,createTeamInvite:c,cancelTeamInvite:s,createTeamInviteLink:f,revokeTeamInviteLink:o,createRequestNotificationRecipient:g,deleteRequestNotificationRecipient:m}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Ye<"u"&&(Ye.exports={createTeamWorkflow:l})})()});var Vt=L((or,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let c=n.querySelector("#company-settings-form");c&&c.addEventListener("submit",i);let s=n.querySelector("#location-form");s&&s.addEventListener("submit",u);let d=n.querySelector("#public-app-url-form");d&&d.addEventListener("submit",r)}async function i(c){c.preventDefault();let s=c.currentTarget,d=s.querySelector("button[type='submit']"),f=new t(s);d&&(d.disabled=!0,d.textContent="Saving...");try{let{error:o}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(o)throw o;e.showNotice("Company saved."),await e.render()}catch(o){e.showNotice(`Could not save company: ${o.message||o}`,"warning")}finally{d&&(d.disabled=!1,d.textContent="Save Company")}}async function u(c){c.preventDefault();let s=c.currentTarget,d=n.querySelector("#location-error"),f=s.querySelector("button[type='submit']"),o=String(new t(s).get("name")||"").trim();if(o){d&&(d.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:g,error:m}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),o),"Location save timed out. Check your connection and try again.",15e3);if(m)throw e.isColumnSchemaError(m,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?m.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(g.id),e.persistActiveLocationId(g.id),e.showNotice("Location added."),await e.render()}catch(g){d&&(d.textContent=g.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function r(c){c.preventDefault();let s=n.querySelector("#public-request-link-error"),d=String(new t(c.currentTarget).get("public_app_url")||"").trim();if(s&&(s.textContent=""),!d){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(d);if(!f){s&&(s.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:i,createLocation:u,savePublicAppUrl:r}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof Ke<"u"&&(Ke.exports={createCompanySettingsWorkflow:l})})()});var Gt=L((ir,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.FormDataCtor||FormData,i=e.confirmUser||(m=>t.confirm(m)),u=new Map,r=new Set;function c(){let m=n.querySelector("#app-issue-report-form");m&&m.addEventListener("submit",f),n.querySelectorAll("[data-app-issue-status]").forEach(p=>{p.addEventListener("submit",o)}),n.querySelectorAll("[data-delete-app-issue]").forEach(p=>{p.addEventListener("click",g)})}async function s(){let m=e.getActiveCompanyId(),p=e.getSession()?.user?.id,{data:h,error:v}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),m),"App issue report load timed out. Check your connection and try again.",12e3);if(!(m!==e.getActiveCompanyId()||p!==e.getSession()?.user?.id)&&(e.setAppIssueReportsReady(!v),e.setAppIssueReports(v?[]:h||[]),v))throw v}function d(m){let p=e.appIssueReportErrorState(m);return p.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),p.message}async function f(m){m.preventDefault();let p=m.currentTarget,h=n.querySelector("#app-issue-report-error"),v=p.querySelector("button[type='submit']"),y=new a(p),k=e.getActiveCompanyId(),q=e.getSession()?.user?.id,S=`${q}:${k}`;if(r.has(S))return;let C=()=>k===e.getActiveCompanyId()&&q===e.getSession()?.user?.id,E,w=!1;r.add(S),h&&(h.textContent=""),v&&(v.disabled=!0,v.textContent="Sending...");try{let b={company_id:k,location_id:e.activeLocationDatabaseId(),reporter_id:q,screen:String(y.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(y.get("severity")||"normal"),title:e.requiredText(y.get("title"),"Short title").slice(0,140),details:e.requiredText(y.get("details"),"Details"),status:"open"};E=JSON.stringify(b),u.has(E)||u.set(E,crypto.randomUUID()),b.id=u.get(E);let{error:P}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),b),"App issue report save timed out. Check your connection and try again.",15e3);if(P)throw P;if(w=!0,!C())return;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await s(),C()&&e.renderWorkspace()}catch(b){if(!C())return;w?(e.showNotice("Issue report sent, but the report list could not reload.","warning"),e.renderWorkspace()):h&&(h.textContent=d(b))}finally{r.delete(S),w&&u.delete(E),v?.isConnected&&(v.disabled=!1,v.textContent="Send Report")}}async function o(m){if(m.preventDefault(),!e.canManageTeam())return;let p=m.currentTarget,h=p.querySelector("button[type='submit']"),v=new a(p);h&&(h.disabled=!0,h.textContent="Saving...");try{let y=String(v.get("status")||"open"),{error:k}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),p.dataset.appIssueStatus,y),"Issue report status save timed out. Check your connection and try again.",12e3);if(k)throw k;e.showNotice("Issue report updated."),await s(),e.renderWorkspace()}catch(y){e.showNotice(`Could not update issue report: ${d(y)}`,"warning")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Save")}}async function g(m){if(m.preventDefault(),!e.canManageTeam())return;let p=m.currentTarget,h=p.dataset.deleteAppIssue;if(!h||!i("Delete this app issue report? This cannot be undone."))return;p.disabled=!0;let v=p.textContent;p.textContent="Deleting...";try{let{error:y}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),h),"Issue report delete timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report deleted."),await s(),e.renderWorkspace()}catch(y){e.showNotice(`Could not delete issue report: ${d(y)}`,"warning")}finally{p?.isConnected&&(p.disabled=!1,p.textContent=v||"Delete")}}return{bindAppIssueWorkflowEvents:c,reloadAppIssueReports:s,appIssueReportError:d,createAppIssueReport:f,updateAppIssueReportStatus:o,deleteAppIssueReport:g}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Je<"u"&&(Je.exports={createAppIssueWorkflow:l})})()});var Ht=L((sr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.CSSRef||CSS;async function i(d){let f=n.querySelector("#public-request-link-error"),o=n.querySelector(`[data-create-public-request-link="${a.escape(d)}"]`);f&&(f.textContent=""),o&&(o.disabled=!0,o.textContent="Creating...");try{let{error:g}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:d}),"QR link save timed out. Check your connection and try again.",15e3);if(g)throw e.setPublicRequestLinksReady(!1),new Error(g.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":g.message);e.showNotice("Location request QR link ready."),await e.render()}catch(g){f&&(f.textContent=g.message||"Could not create QR request link.")}finally{o&&(o.disabled=!1,o.textContent="Create QR Link")}}async function u(d){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await r(d,!1)}async function r(d,f){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can reactivate or disable posted QR request links.");return}await s(d,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function c(d){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await s(d,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function s(d,f,o){let g=n.querySelector("#public-request-link-error");if(g&&(g.textContent=""),!e.canAdministerPublicRequestLinks()){g&&(g.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!d||!e.getActiveCompanyId()){g&&(g.textContent="Select a company before updating request links.");return}try{let{data:m,error:p}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(p){g&&(g.textContent=p.message);return}if(!m?.length){g&&(g.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(o),await e.render()}catch(m){g&&(g.textContent=m.message||"Could not update the request link.")}}return{createPublicRequestLink:i,disablePublicRequestLink:u,setPublicRequestLinkActive:r,regeneratePublicRequestLink:c,updatePublicRequestLink:s}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof Ze<"u"&&(Ze.exports={createPublicRequestLinkWorkflow:l})})()});var Yt=L((cr,Xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=new WeakMap;function i(g,m){let p=e.getParts().find(h=>h.id===m);p&&!a.has(g)&&a.set(g,{id:m,companyId:e.getActiveCompanyId(),quantity_on_hand:Number(p.quantity_on_hand)||0})}function u(g){if(!g||g.companyId!==e.getActiveCompanyId())throw new Error("Reopen this part before saving.")}function r(){let g=n.querySelector("#create-part-form");g&&g.addEventListener("submit",c),n.querySelectorAll("[data-restock-part]").forEach(m=>{i(m,m.dataset.restockPart),m.addEventListener("submit",s)}),n.querySelectorAll("[data-use-part]").forEach(m=>{i(m,m.dataset.usePart),m.addEventListener("submit",d)}),n.querySelectorAll("[data-edit-part]").forEach(m=>{i(m,m.dataset.editPart),m.addEventListener("submit",f)}),n.querySelectorAll("[data-rename-part-source]").forEach(m=>{m.addEventListener("submit",o)})}async function c(g){g.preventDefault();let m=g.currentTarget,p=n.querySelector("#part-create-error"),h=m.querySelector("button[type='submit']"),v=new t(m);p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Adding...");let y;try{let k={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(v.get("name")||"").trim(),sku:String(v.get("sku")||"").trim()||null,supplier_name:String(v.get("supplier_name")||"").trim()||null,machine_note:String(v.get("machine_note")||"").trim()||null,quantity_on_hand:Number(v.get("quantity_on_hand"))||0,reorder_point:Number(v.get("reorder_point"))||0,unit_cost:Number(v.get("unit_cost"))||0};if(!k.company_id)throw new Error("Choose a company before adding parts.");if(!k.name)throw new Error("Part name is required.");let q=new Promise((E,w)=>{y=setTimeout(()=>w(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:S,error:C}=await Promise.race([e.supabaseClient().from("parts").insert(k).select("id").single(),q]);if(clearTimeout(y),C&&e.isMissingColumnError(C,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(C&&e.isMissingColumnError(C,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(C&&e.isMissingColumnError(C,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(C&&e.isMissingColumnError(C,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(C)throw C;e.setActivePartId(S?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),m.reset(),await e.render()}catch(k){p&&(p.textContent=k.message||"Could not add part.")}finally{y&&clearTimeout(y),h&&h.isConnected&&(h.disabled=!1,h.textContent="Add Part")}}async function s(g){g.preventDefault();let m=g.target,p=m.querySelector("button[type='submit']"),h=a.get(m),v=Number(new t(m).get("quantity"))||0;if(!h||v<=0)return;let y=p?.textContent||"Restock";p&&(p.disabled=!0,p.textContent="Saving...");try{u(h);let{data:k,error:q}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(h.quantity_on_hand)||0)+v}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(h.quantity_on_hand)||0).select("id"),"Part restock timed out. Check your connection and try again.",15e3);if(q)throw q;if(!k?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part restocked."),await e.render()}catch(k){e.showNotice(`Could not restock part: ${k.message||k}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=y)}}async function d(g){g.preventDefault();let m=g.currentTarget,p=m.querySelector("button[type='submit']"),h=a.get(m),v=Number(new t(m).get("quantity"))||0;if(!h||v<=0)return;let y=p?.textContent||"Use";p&&(p.disabled=!0,p.textContent="Saving...");try{u(h);let k=Number(h.quantity_on_hand)||0;if(v>k)throw new Error("Quantity used exceeds the stock on hand.");let q=k-v,{data:S,error:C}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:q}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",k).select("id"),"Part use save timed out. Check your connection and try again.",15e3);if(C)throw C;if(!S?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part used."),await e.render()}catch(k){e.showNotice(`Could not use part: ${k.message||k}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=y)}}async function f(g){g.preventDefault();let m=g.currentTarget,p=m.dataset.editPart,h=n.querySelector(`[data-part-edit-error="${p}"]`),v=m.querySelector("button[type='submit']"),y=new t(m);h&&(h.textContent="");let k=v?.textContent||"Save Part";v&&(v.disabled=!0,v.textContent="Saving...");let q={name:String(y.get("name")||"").trim(),sku:y.get("sku")||null,supplier_name:y.get("supplier_name")||null,machine_note:y.get("machine_note")||null,quantity_on_hand:Number(y.get("quantity_on_hand"))||0,reorder_point:Number(y.get("reorder_point"))||0,unit_cost:Number(y.get("unit_cost"))||0};try{if(!q.name)throw new Error("Part name is required.");let S=a.get(m);if(u(S),S.id!==p)throw new Error("Reopen this part before saving.");let{data:C,error:E}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(q).eq("id",p).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(S.quantity_on_hand)||0).select("id"),"Part save timed out. Check your connection and try again.",15e3);if(E&&e.isMissingColumnError(E,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(E&&e.isMissingColumnError(E,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(E&&e.isMissingColumnError(E,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(E)throw E;if(!C?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(S){h&&(h.textContent=S.message||"Could not save part.")}finally{v&&(v.disabled=!1,v.textContent=k)}}async function o(g){g.preventDefault();let m=g.currentTarget,p=n.querySelector("#part-source-error"),h=m.querySelector("button[type='submit']"),v=new t(m),y=String(v.get("old_source")||"").trim(),k=String(v.get("new_source")||"").trim();if(p&&(p.textContent=""),!!y){if(!e.getPartSuppliersReady()){p&&(p.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(y===k){p&&(p.textContent="Change the source name before saving.");return}h&&(h.disabled=!0,h.textContent="Renaming...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:k||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",y),"Part source rename timed out. Check your connection and try again.",15e3);if(q)throw e.isMissingColumnError(q,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?q.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(q){p&&(p.textContent=q.message||"Could not update part source.")}finally{h&&(h.disabled=!1,h.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:c,restockPart:s,usePartFromInventory:d,updatePart:f,renamePartSource:o}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof Xe<"u"&&(Xe.exports={createPartInventoryWorkflow:l})})()});var Kt=L((lr,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function i(u){u.preventDefault();let r=u.target,c=r.querySelector("button[type='submit']"),s=n.querySelector("#quick-update-error"),d=e.getWorkOrders().find(o=>o.id===e.getActiveWorkOrderId()),f=new t(r);c.disabled=!0,c.textContent="Saving...",s&&(s.textContent="");try{let o=f.get("asset_id")||null,g=String(f.get("new_asset_name")||"").trim();if(o&&g)throw new Error("Choose existing equipment or create new equipment, not both.");if(g){let{data:q,error:S}=await e.createQuickFixAsset(g,"running");if(S){c.disabled=!1,c.textContent="Save Quick Update",s&&(s.textContent=`Could not add equipment: ${S.message}`);return}o=q.id}if(!g&&!e.confirmAssetLocationRouting(o,"saving this work update",s))return;let m={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(d?.description||"",f.get("assigned_to")),asset_id:o,location_id:e.locationIdForAsset(o),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(m);let p=f.get("safety_devices_checked")==="on",h=(d?.procedure_template_id||"")!==(m.procedure_template_id||"");if(m.status==="completed"&&(d?.status!=="completed"||h)){let q=e.productionActionCompletionMessage?.(d)||"";if(q){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),q),c.disabled=!1,c.textContent="Save Quick Update",s&&(s.textContent=q);return}let S=e.blocksProcedureCompletion(d,m.procedure_template_id||null);if(S){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),S),c.disabled=!1,c.textContent="Save Quick Update",s&&(s.textContent=S);return}if(e.applySafetyCheckPayload(m,p),e.requiresSafetyDeviceCheck(m)&&!m.safety_devices_checked){c.disabled=!1,c.textContent="Save Quick Update",s&&(s.textContent="Check safety devices before completing work tied to equipment.");return}d?.status!=="completed"&&(m.completed_at=new Date().toISOString())}m.status!=="completed"?(m.completed_at=null,e.applySafetyCheckPayload(m,!1)):d?.status==="completed"&&e.applySafetyCheckPayload(m,m.safety_check_required&&(p||e.hasCompletedSafetyDeviceCheck(d)));let{error:v}=await e.withOperationTimeout(e.updateWorkOrderSafely(m,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(v){c.disabled=!1,c.textContent="Save Quick Update",s&&(s.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(v)}`);return}let y=[];if(m.asset_id&&f.get("machine_down")==="on"){let q=await e.updateAssetStatus(m.asset_id,"offline");q?y.push(`equipment status did not update: ${q.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let k=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(d,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch(q=>q);g&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${g}.`),"Activity log timed out.",8e3).catch(()=>null),k&&y.push(`history did not update: ${k.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(o){a.error("Quick update save failed",o),c.disabled=!1,c.textContent="Save Quick Update",s&&(s.textContent=`Could not save update: ${o.message||o}`)}}return{updateWorkOrderQuickView:i}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var Jt=L((ur,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,i=e.CSSRef||CSS;function u(w){return String(w.get("location_new")||w.get("location_existing")||w.get("location")||"").trim()||null}function r(){return e.getSession?.()?.user?.id||null}function c(w){return(e.getAssets?.()||[]).find(b=>b.id===w)||null}function s(w,b){if(!w)return[];let P={name:"name",asset_code:"serial number",asset_tag:"asset tag",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(P).filter(_=>String(w[_]??"")!==String(b[_]??"")).map(_=>P[_])}function d(w){return e.isMissingColumnError(w,"manufacturer")||e.isMissingColumnError(w,"model")}async function f(w){w.preventDefault();let b=w.currentTarget,P=e.captureCreateDraft?.(b),_=n.querySelector("#asset-create-error");_&&(_.textContent="");let D=b.querySelector("button[type='submit']"),R=D?.textContent||"Add Equipment",W=w.submitter?.dataset?.assetContinue==="true";D&&(D.disabled=!0,D.textContent="Saving...");try{let $=new t(b),O={company_id:e.getActiveCompanyId(),location_id:$.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText($.get("name"),"Equipment name"),asset_code:String($.get("asset_code")||"").trim()||null,asset_tag:String($.get("asset_tag")||"").trim()||null,manufacturer:String($.get("manufacturer")||"").trim()||null,model:String($.get("model")||"").trim()||null,location:u($),parent_asset_id:$.get("parent_asset_id")||null,asset_type:$.get("asset_type")||"machine",safety_devices_required:$.get("safety_devices_required")==="on",status:"running",created_by:r()},x=e.supabaseClient().from("assets").insert(O).select("id").single(),{data:I,error:A}=await e.withOperationTimeout(x,"Equipment save timed out. Check your connection and try again.",15e3);if(A&&e.isMissingColumnError(A,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(A&&e.isMissingColumnError(A,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(A&&d(A))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(A&&e.isMissingColumnError(A,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(A&&e.isAssetHierarchySchemaError(A))throw new Error(e.equipmentSchemaMessage(A));if(A)throw A;e.clearCreateDraft?.(P),I?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(I.id,"created",`Created ${O.name}.`),W&&I?.id?(e.setActiveAssetId(I.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch($){_?_.textContent=$.message:a($.message)}finally{D&&(D.disabled=!1,D.textContent=R)}}async function o(w){w.preventDefault();let b=w.currentTarget,P=n.querySelector("#asset-edit-error");P&&(P.textContent="");let _=b.querySelector("button[type='submit']"),D=_?.textContent||"Save Equipment";_&&(_.disabled=!0,_.textContent="Saving...");try{let R=new t(b),W=c(e.getActiveAssetId()),$={name:e.requiredText(R.get("name"),"Equipment name"),asset_code:String(R.get("asset_code")||"").trim()||null,asset_tag:String(R.get("asset_tag")||"").trim()||null,manufacturer:String(R.get("manufacturer")||"").trim()||null,model:String(R.get("model")||"").trim()||null,location_id:R.get("location_id")||e.activeLocationDatabaseId(),location:u(R),parent_asset_id:R.get("parent_asset_id")||null,asset_type:R.get("asset_type")||"machine",safety_devices_required:R.get("safety_devices_required")==="on",status:R.get("status")},O=W?.asset_type==="traveling_machine";O&&delete $.location_id;let x=e.supabaseClient().from("assets").update($).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId());O&&(x=x.eq("location_id",W.location_id).eq("traveling_revision",Number(b.dataset?.travelRevision??W.traveling_revision??0)).select("id"));let{data:I,error:A}=await e.withOperationTimeout(x,"Equipment save timed out. Check your connection and try again.",15e3);if(A&&e.isMissingColumnError(A,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(A&&d(A))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(A&&e.isMissingColumnError(A,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(A&&e.isAssetHierarchySchemaError(A))throw new Error(e.equipmentSchemaMessage(A));if(A)throw A;if(O&&!I?.length)throw new Error("This equipment moved, changed condition, or is no longer editable. Reopen its details before saving.");let Q=s(W,{...W,...$});Q.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${Q.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(R){P?P.textContent=R.message:a(R.message)}finally{_&&(_.disabled=!1,_.textContent=D)}}async function g(w){w.preventDefault();let b=w.currentTarget,P=b.querySelector("button[type='submit']");if(P?.disabled)return;let _=b.querySelector("[data-transfer-error]"),D=b.dataset.companyId,R=b.dataset.assetId,W=r(),O=new t(b).get("destination_id"),x=()=>D===e.getActiveCompanyId()&&W===r()&&R===e.getActiveAssetId();if(!x()||!O)return;let I=b.querySelector("[name='destination_id'] option:checked")?.textContent||"the selected facility";if((e.confirmRef||confirm)(`Move ${c(R)?.name||"this machine"} to ${I}?

All work history stays linked to this machine. Existing work orders keep their original facility and assigned person. Warehouse stock stays at its current facility.

Save any equipment edits before moving; unsaved edits will be lost.`)){_&&(_.textContent=""),P&&(P.disabled=!0);try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().rpc("update_traveling_equipment_location",{p_company_id:D,p_asset_id:R,p_location_id:O,p_expected_location_id:b.dataset.fromLocation||null,p_expected_revision:Number(b.dataset.travelRevision||0)}),"Location change timed out. Reopen the equipment to check its current facility before retrying.",15e3);if(A)throw A;x()&&(e.showNotice("Equipment location changed. Its records remain attached."),await e.render())}catch(A){x()&&_&&(_.textContent=A.message)}finally{P&&(P.disabled=!1)}}}async function m(w,b){let P=c(w);if(P?.asset_type==="traveling_machine"){let{error:D}=await e.withOperationTimeout(e.supabaseClient().rpc("update_traveling_equipment_condition",{p_company_id:e.getActiveCompanyId(),p_asset_id:w,p_status:b,p_expected_status:P.status,p_expected_location_id:P.location_id,p_expected_revision:P.traveling_revision||0}),"Equipment condition save timed out. Reopen its details before retrying.",12e3);return D||null}let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:b}).eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!_&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(w,"status_changed",`Status changed to ${b}.`),_||null}async function p(w){w.preventDefault();let b=w.currentTarget,P=b.dataset.attachAssetPart,_=n.querySelector(`[data-asset-part-error="${i.escape(P)}"]`);_&&(_.textContent="");let D=b.querySelector("button[type='submit']"),R=D?.textContent||"Attach Part";D&&(D.disabled=!0,D.textContent="Attaching...");try{let W=new t(b),$=W.get("part_id");if(!$)throw new Error("Select a part to attach.");let O=Math.max(1,Number(W.get("quantity_recommended"))||1),x=String(W.get("note")||"").trim()||null,{error:I}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:P,part_id:$,quantity_recommended:O,note:x}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(I)throw e.isMissingTableError?.(I,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):I.code==="23505"?new Error("This part is already linked to this equipment."):I;e.showNotice("Part linked to equipment."),await e.render()}catch(W){_?_.textContent=W.message||"Could not link part to equipment.":e.showNotice(W.message||"Could not link part to equipment.","warning")}finally{D&&(D.disabled=!1,D.textContent=R)}}async function h(w){let b=n.querySelector("[data-asset-part-error]");b&&(b.textContent="");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(P)throw e.isMissingTableError?.(P,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):P;e.showNotice("Part link removed."),await e.render()}catch(P){b?b.textContent=P.message||"Could not remove linked part.":e.showNotice(P.message||"Could not remove linked part.","warning")}}function v(w){return{workOrders:e.getWorkOrders().filter(b=>b.asset_id===w).length,children:e.childAssetsFor(w).length,schedules:e.getPreventiveSchedules().filter(b=>b.asset_id===w).length,requests:e.getMaintenanceRequests().filter(b=>b.asset_id===w).length}}function y(w){let b=v(w);return Object.values(b).some(Boolean)}async function k(w){let[b,P,_]=await Promise.all([q("work_orders",w),q("preventive_schedules",w),q("maintenance_requests",w)]);return{workOrders:b,children:e.childAssetsFor(w).length,schedules:P,requests:_}}async function q(w,b){let{count:P,error:_}=await e.withOperationTimeout(e.supabaseClient().from(w).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",b),`Equipment delete check timed out while checking ${w}.`,15e3);if(_)throw new Error(`Could not verify linked ${w.replaceAll("_"," ")} before deleting equipment: ${_.message}`);if(!Number.isSafeInteger(P)||P<0)throw new Error(`Could not verify linked ${w.replaceAll("_"," ")} before deleting equipment. Try again.`);return P}async function S(w){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let b=n.querySelector("#asset-delete-error");b&&(b.textContent="");try{let P=await k(w),_=e.assetDeleteBlockerMessage(P);if(_){b&&(b.textContent=_);return}e.setPendingDeleteAssetId(w),e.renderWorkspace()}catch(P){b?b.textContent=P.message||"Could not verify equipment links before delete.":e.showNotice(P.message||"Could not verify equipment links before delete.","warning")}}async function C(w){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let b=n.querySelector("#asset-delete-error");b&&(b.textContent="");let P=n.querySelector(`[data-confirm-delete-asset="${i.escape(w)}"]`);P&&(P.disabled=!0,P.textContent="Deleting...");try{let _=await k(w),D=e.assetDeleteBlockerMessage(_);if(D)throw new Error(D);let R=e.getAssetDocumentStoragePaths?.(w)||[];if(R.length){let $=await e.withOperationTimeout(e.removeAssetDocumentStorage(R),"Equipment file cleanup timed out.",15e3);if($.error)throw new Error(`Could not remove equipment files: ${$.error.message}`)}let{error:W}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(W)throw new Error(W.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":W.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(_){b&&(b.textContent=_.message||"Could not delete equipment."),P&&(P.disabled=!1,P.textContent="Permanently Delete")}}async function E(w,b="running"){let P={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:w,asset_type:"machine",safety_devices_required:!0,status:b,created_by:r()},_=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(P).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return _.error&&e.isMissingColumnError(_.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(_,e.databaseSetupRequiredMessage("adding equipment in this location"))):_.error&&e.isMissingColumnError(_.error,"created_by")?e.withSetupError(_,"Run supabase/step-next-asset-events.sql before saving equipment history."):_.error&&e.isAssetHierarchySchemaError(_.error)?e.withSetupError(_,e.equipmentSchemaMessage(_.error).replace("saving","adding")):(!_.error&&_.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(_.data.id,"created",`Created ${w}.`),_)}return{assetDeleteBlockers:v,assetHasDeleteBlockers:y,attachAssetPart:p,countAssetLinkedRows:q,createAsset:f,createQuickFixAsset:E,deleteAsset:C,loadAssetDeleteBlockers:k,removeAssetPart:h,requestDeleteAsset:S,updateAsset:o,moveTravelingAsset:g,updateAssetStatus:m}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var Zt=L((dr,Ee)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,i=e.CSSRef||CSS;function u(){let g=n.querySelector("#detail-panel");g.innerHTML=e.renderRequestFormContent()}async function r(g){g.preventDefault(),await c(g.target)}async function c(g){let m=n.querySelector("#request-error"),p=g.querySelector("button[type='submit']");m&&(m.textContent=""),p&&(p.disabled=!0,p.textContent="Submitting...");try{let h=new t(g),v=h.get("asset_id")||null,y=String(h.get("equipment_note")||"").trim();if(v&&y)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!v&&!y)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(v,"submitting this request",m))return;let k=y||e.assetNameFor?.(v)||"Saved equipment",q=e.requiredText(h.get("description"),"Request details"),S=e.requiredText(h.get("requester_name"),"Your name"),C={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(v),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${k}

${q}`,asset_id:v,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:S};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:E,error:w}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(C).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(w)throw w;let b=h.get("photo"),P="";if(b&&b.name){let D=await e.addPhotoToMaintenanceRequest(E.id,b);D&&(P=` Photo did not upload: ${D.message||D}`)}let _=await e.notifyRequestEmailer(E.id);_?.error&&console.warn("Request email notification did not send",_.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${P}`,P?"warning":"success"),await e.render()}catch(h){m?m.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{p&&(p.disabled=!1,p.textContent="Submit Request")}}async function s(g){if(!e.getMaintenanceRequests().find(h=>h.id===g))return;let p=n.querySelector(`[data-convert-request="${i.escape(g)}"]`);p&&(p.disabled=!0,p.textContent="Converting...");try{let{data:h,error:v}=await e.withOperationTimeout(e.supabaseClient().rpc("convert_maintenance_request",{target_company_id:e.getActiveCompanyId(),target_request_id:g}),"Request conversion timed out. Check your connection and try again.",15e3);if(v)throw v;if(!h?.id)throw new Error("Conversion did not return a work order. Review the request before retrying.");e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),p&&(p.disabled=!1,p.textContent="Convert to Work Order")}}function d(g){let m=e.getMaintenanceRequests().find(p=>p.id===g);m&&(e.setQuickFixRequestId(g),e.setQuickFixAssetId(m.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(g){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(m=>m.id===g)&&(e.setPendingDeleteRequestId(g),e.renderWorkspace())}async function o(g){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let m=e.getMaintenanceRequests().find(h=>h.id===g);if(!m)return;let p=n.querySelector(`[data-confirm-delete-request="${i.escape(g)}"]`);p&&(p.disabled=!0,p.textContent="Deleting...");try{if(m.photo_storage_path){let k=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([m.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(k.error)throw new Error(`Could not remove request photo: ${k.error.message}`)}let{data:h,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",g).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(v)throw v;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let y=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",g).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(y.error)throw new Error(`Request delete verification failed: ${y.error.message}`);if(y.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:s,createRequest:r,createRequestFromForm:c,deleteMaintenanceRequest:o,openQuickFixForRequest:d,renderRequestForm:u,requestDeleteMaintenanceRequest:f}}typeof Ee<"u"&&Ee.exports&&(Ee.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var Xt=L((pr,Re)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert;async function i(u){u.preventDefault();let r=u.target,c=r.querySelector("button[type='submit']"),s=n.querySelector("#create-work-order-error");c.disabled=!0,c.textContent="Creating...",s&&(s.textContent="");try{let d=new t(r),f=d.get("status")||"open",o=d.get("asset_id")||null,g=String(d.get("new_asset_name")||"").trim();if(o&&g)throw new Error("Choose existing equipment or create new equipment, not both.");if(g){let{data:C,error:E}=await e.createQuickFixAsset(g,"running");if(E){s&&(s.textContent=`Could not add equipment: ${E.message}`);return}o=C.id}if(!g&&!e.confirmAssetLocationRouting(o,"creating this work order",s))return;if(f==="completed"&&e.assetRequiresSafety(o)&&d.get("safety_devices_checked")!=="on"){s&&(s.textContent="Check safety devices before creating completed work tied to equipment.");return}let m=f==="completed"?e.blocksProcedureCompletion(null,d.get("procedure_template_id")||null):"";if(m){e.setWorkOrderActionWarning("",""),s&&(s.textContent=`${m} Create the work order first, then complete the checklist before marking it complete.`);return}let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(o),title:e.requiredText(d.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(d.get("description"),d.get("assigned_to")),asset_id:o,priority:d.get("priority"),type:d.get("type")||"corrective",due_at:e.workOrderDateValue(d.get("due_at")),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(d.get("actual_minutes"))||0,failure_cause:d.get("failure_cause")||null,resolution_summary:d.get("resolution_summary")||null,follow_up_needed:d.get("follow_up_needed")==="on",completion_notes:d.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,f==="completed"&&p.safety_check_required&&d.get("safety_devices_checked")==="on");let{data:h,error:v}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(v){s&&(s.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(v)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),g&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${g}.`);let y=[],k=d.get("part_id");if(k){let C=e.getParts().find(w=>w.id===k),E=await e.addPartUsageToWorkOrder(h.id,C,Number(d.get("quantity_used"))||1);E?y.push(`part usage failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${C?.name||"Part"}.`)}let q=d.get("photo");if(q&&q.name&&!e.reviewCreatedAttachments){let C=await e.addPhotoToWorkOrder(h.id,q);C?y.push(`photo upload failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${q.name}.`)}let S=String(d.get("initial_comment")||"").trim();if(S){let C=await e.addCommentToWorkOrder(h.id,S);C?y.push(`comment failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(y.length?`Work order created with warning: ${y[0]}`:"Work order created.",y.length?"warning":"success"),await e.render(),e.reviewCreatedAttachments&&await e.reviewCreatedAttachments(h.id,(d.getAll?d.getAll("photo"):[q]).filter(C=>C?.name),p.company_id,p.created_by)}catch(d){s?s.textContent=`Could not create work order: ${d.message||d}`:a(d.message||d)}finally{c.disabled=!1,c.textContent="Create Work Order"}}return{createWorkOrder:i}}typeof Re<"u"&&Re.exports&&(Re.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var en=L((mr,We)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function i(u){u.preventDefault();let c=u.target.querySelector("button[type='submit']"),s=n.querySelector("#work-order-save-error");c.disabled=!0,c.textContent="Saving...",s&&(s.textContent="");try{let d=new t(u.target),f=e.getActiveWorkOrderId(),o=e.getWorkOrders().find(C=>C.id===f),g=n.querySelector("#status-select")?.value||o?.status||"open",m=d.has("asset_id"),p=m?d.get("asset_id")||null:o?.asset_id||null;if(m&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(p,"saving this work order",s)){c.disabled=!1,c.textContent="Save Work Order";return}let h={title:e.requiredText(d.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(d.get("description"),d.get("assigned_to")),due_at:e.workOrderDateValue(d.get("due_at")),status:g,priority:d.get("priority"),type:d.get("type"),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),failure_cause:d.get("failure_cause")||null,resolution_summary:d.get("resolution_summary")||null,follow_up_needed:d.get("follow_up_needed")==="on",actual_minutes:Number(d.get("actual_minutes"))||0};if(m&&(h.asset_id=p,h.location_id=e.locationIdForAsset(p)),h.safety_check_required=e.assetRequiresSafety(p),h.status==="completed"){let C=e.productionActionCompletionMessage?.(o)||"";if(C){e.setWorkOrderActionWarning(f,C),c.disabled=!1,c.textContent="Save Work Order",s&&(s.textContent=C);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(o)&&d.get("safety_devices_checked")!=="on"){c.disabled=!1,c.textContent="Save Work Order",s&&(s.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let v=(o?.procedure_template_id||"")!==(h.procedure_template_id||""),y=h.status==="completed"&&(o?.status!=="completed"||v)?e.blocksProcedureCompletion(o,h.procedure_template_id||null):"";if(y){e.setWorkOrderActionWarning(f,y),c.disabled=!1,c.textContent="Save Work Order",s&&(s.textContent=y);return}h.status==="completed"&&o?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(d.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):o?.status==="completed"&&h.safety_check_required&&d.has("safety_devices_checked")?e.applySafetyCheckPayload(h,d.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)):o?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:k}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,f),"Work order save timed out. Check your connection and try again.",2e4);if(k){c.disabled=!1,c.textContent="Save Work Order",s&&(s.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(k)}`);return}let q={...Object.fromEntries(d.entries()),status:g},S=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(o,q)),"Activity log timed out.",8e3).catch(C=>C);e.setWorkOrderActionWarning("",""),e.showNotice(S?`Work order saved, but history did not update: ${S.message}`:"Work order saved.",S?"warning":"success"),await e.render()}catch(d){a.error("Work order save failed",d),c.disabled=!1,c.textContent="Save Work Order",s&&(s.textContent=`Could not save work order: ${d.message||d}`)}finally{c&&c.isConnected&&(c.disabled=!1,c.textContent="Save Work Order")}}return{updateWorkOrderDetails:i}}typeof We<"u"&&We.exports&&(We.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var tn=L((fr,Oe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function a(u){u.preventDefault();let r=u.currentTarget,c=n.querySelector("#parts-used-error"),s=r.querySelector("button[type='submit']");c&&(c.textContent=""),s&&(s.disabled=!0,s.textContent="Recording...");try{let d=new t(r),f=d.get("part_id"),o=Number(d.get("quantity_used"))||1,g=e.getParts().find(p=>p.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!g)throw new Error("Choose a part first.");let m=await i(e.getActiveWorkOrderId(),g,o);if(m)throw m;e.showNotice("Part recorded on work order."),await e.render()}catch(d){c&&(c.textContent=d.message||"Could not record part used.")}finally{s&&(s.disabled=!1,s.textContent="Record Part Used")}}async function i(u,r,c){if(!r)return new Error("Choose a part first.");let{error:s}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:u,p_part_id:r.id,p_quantity:c}),"Part usage save timed out.");return s||null}return{addPartUsageToWorkOrder:i,recordPartUsed:a}}typeof Oe<"u"&&Oe.exports&&(Oe.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var nn=L((gr,xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,i=e.URLRef||URL,u=e.consoleRef||console,r=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),c=25*1024*1024,s=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function d(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#company-logo-error"),y=h.querySelector("button[type='submit']"),k=new t(h).get("logo");if(v&&(v.textContent=""),!k||!k.name){v&&(v.textContent="Choose a logo image first.");return}y&&(y.disabled=!0,y.textContent="Uploading...");try{let q=g(k);if(q)throw new Error(q);let S=await f(k),C=m(S);if(C)throw new Error(C);let E=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${S.fileName}`,w=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(E,S.blob,{contentType:S.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(w.error)throw new Error(w.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":w.error.message);let{error:b}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:E}),"Company logo record save timed out. Check your connection and try again.",15e3);if(b)throw await e.removeUploadedObject("company-logos",E),new Error(e.isColumnSchemaError(b,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":b.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":b.message);let P=e.getCompanies().find(_=>_.id===e.getActiveCompanyId());P&&(P.logo_path=E,P.logoUrl=i.createObjectURL(S.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(q){v&&(v.textContent=q.message||"Could not upload logo.")}finally{y&&(y.disabled=!1,y.textContent="Upload Logo")}}async function f(p){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(p);let h=o(p);try{if(!r)throw new Error("Browser logo optimization is unavailable.");let v=await r(p),k=Math.min(1,1200/Math.max(v.width,v.height)),q=Math.max(1,Math.round(v.width*k)),S=Math.max(1,Math.round(v.height*k)),C=n.createElement("canvas");C.width=q,C.height=S;let E=C.getContext("2d",{alpha:!0});E.clearRect(0,0,q,S),E.drawImage(v,0,0,q,S),v.close&&v.close();let w=await new Promise(b=>C.toBlob(b,"image/png"));if(!w)throw new Error("Browser could not optimize this logo.");return{blob:w,fileName:`${e.fileBaseName(p.name||"logo")}.png`,contentType:"image/png"}}catch(v){return u.warn("Logo optimization failed; uploading original.",v),{blob:p,fileName:e.safeFileName(p.name||"logo"),contentType:h}}}function o(p){let h=String(p?.type||"").trim().toLowerCase();if(h)return h;let v=String(p?.name||"").toLowerCase();return/\.(jpe?g)$/.test(v)?"image/jpeg":/\.png$/.test(v)?"image/png":/\.webp$/.test(v)?"image/webp":/\.gif$/.test(v)?"image/gif":/\.heic$/.test(v)?"image/heic":/\.heif$/.test(v)?"image/heif":/\.avif$/.test(v)?"image/avif":/\.bmp$/.test(v)?"image/bmp":/\.tiff?$/.test(v)?"image/tiff":"application/octet-stream"}function g(p){let h=o(p);return s.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function m(p){return s.has(String(p?.contentType||"").toLowerCase())?Number(p?.blob?.size||0)>c?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:d}}typeof xe<"u"&&xe.exports&&(xe.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var rn=L((hr,et)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,a=e.alertUser||alert;function i(c){return e.partUsageRows(c).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(c).length?"This part is linked to equipment and is kept for traceability.":""}function u(c){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(o=>o.id===c))return;let d=i(c);if(d){a(d);return}let f=!!n.querySelector(`[data-delete-part="${t.escape(c)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===c||f){r(c);return}e.setPendingDeletePartId(c),e.renderWorkspace()}async function r(c){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let s=e.getParts().find(g=>g.id===c),d=n.querySelector("#part-delete-error");if(d&&(d.textContent=""),!s)return;let f=i(c);if(f){d&&(d.textContent=f);return}let o=n.querySelector(`[data-delete-part="${t.escape(c)}"].permanent-delete-button`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let g=(e.getPartDocumentsByPartId()[c]||[]).map(v=>v.storage_path).filter(Boolean);if(g.length){let v=await e.withOperationTimeout(e.removePartDocumentStorage(g),"Part document cleanup timed out. Try deleting again.",15e3);if(v.error)throw new Error(`Could not remove filed receipts/invoices: ${v.error.message}`)}let{data:m,error:p}=await e.withOperationTimeout(e.deletePartRecord(c),"Part delete timed out. Check your connection and try again.",15e3);if(p)throw new Error(p.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":p.message);if(!m?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(c),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(g){e.showNotice(g.message||"Could not delete part.","warning"),d&&(d.textContent=g.message||"Could not delete part."),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}return{deletePart:r,requestDeletePart:u}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof et<"u"&&(et.exports={createPartDeleteWorkflow:l})})()});var an=L((yr,tt)=>{(function(){function l(t,a){return t?.response_type==="checkbox"?a===!0||a==="checked"?"checked":"":String(a??"").trim()}function e(t,a){let i=l(t,a);return i?t?.response_type==="checkbox"?i==="checked":t?.response_type==="pass_fail"?i==="pass"||i==="fail":t?.response_type==="number"?Number.isFinite(Number(i)):!0:!1}let n={normalizeChecklistResponseValue:l,isChecklistStepAnswered:e};typeof window<"u"&&(window.MaintainOpsChecklistResponseValues=n),typeof tt<"u"&&(tt.exports=n)})()});var on=L((vr,nt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function i(d,f){let{data:o,error:g}=await e.withOperationTimeout(e.getPublicRequestIntake(d),f);return{data:Array.isArray(o)?o[0]:o,error:g}}async function u(d){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:g,error:m}=await i(d,"Request QR lookup timed out.");if(f=g,m||!f){c("This QR code link is inactive or invalid.");return}}catch{c("This QR code link is inactive or invalid.");return}let o=e.publicRequestUrl(d);e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function r(d){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:o,error:g}=await i(d,"Request form lookup timed out.");if(g){c("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=o}catch(o){c(o.message||"This request link could not be loaded.");return}if(!f){c("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),n.querySelector("#public-request-form").addEventListener("submit",o=>s(o,d,f))}function c(d){e.setAppHtml(e.publicRequestError(d))}async function s(d,f,o){d.preventDefault();let g=d.currentTarget,m=new a(g),p=n.querySelector("#public-request-error"),h=g.querySelector("button[type='submit']");p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:v,error:y}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(m.get("title"),"Request title"),equipment_note:e.requiredText(m.get("equipment_note"),"Machine / area"),request_description:e.requiredText(m.get("description"),"Request details"),requester_name:e.requiredText(m.get("requester_name"),"Your name"),requester_contact:String(m.get("requester_contact")||"").trim()||null,request_priority:m.get("priority")||"medium"}),"Request send timed out.");if(y)throw y;let k=m.get("photo"),q="";if(k&&k.name){let C=await e.addPhotoToMaintenanceRequest(v,k);C&&(q=`Request sent, but the photo did not upload: ${C.message||C}`)}let S=await e.notifyRequestEmailer(v);S.error&&e.warn("Request email notification did not send",S.error),e.setAppHtml(e.publicRequestSuccess(o,q)),n.querySelector("#public-request-another").addEventListener("click",()=>r(f))}catch(v){p&&(p.textContent=v.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:c,renderPublicRequestIntake:r,renderPublicRequestQrPage:u,submitPublicRequest:s}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof nt<"u"&&(nt.exports={createPublicRequestIntakeWorkflow:l})})()});var sn=L((br,rt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",i),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function i(u){u.preventDefault();let r=u.target,c=r.querySelector("button[type='submit']"),s=n.querySelector("#company-error"),d=String(new t(r).get("name")||"").trim();c.disabled=!0,c.textContent="Creating...",s.textContent="";try{if(!d)throw new Error("Company name is required.");let f=e.getCompanies().find(p=>p.name.trim().toLowerCase()===d.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:o,error:g}=await e.withOperationTimeout(e.createCompanyRecord(d),"Company creation timed out.");if(g){s.textContent=g.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":g.message;return}if(e.setActiveCompanyId(o),e.persistActiveCompanyId(o),!await e.ensureProfileForActiveCompany(d))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){s.textContent=f.message||"Could not create company."}finally{c?.isConnected&&(c.disabled=!1,c.textContent="Create Company")}}return{createCompany:i,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof rt<"u"&&(rt.exports={createCompanySetupWorkflow:l})})()});var cn=L((wr,at)=>{(function(){function l(e={}){let n=new Set;function t(){let u=e.getScope?.();return()=>e.getScope?.()===u}async function a(u){let r=u.target,c=e.getActiveWorkOrderId();if(r.disabled||n.has(c))return;let s=t(),d=e.getWorkOrders().find(f=>f.id===c);r.disabled=!0;try{!await i(c,r.value)&&s()&&(r.value=d?.status||"open")}catch(f){s()&&(r.value=d?.status||"open",e.showNotice(`Could not update status: ${f.message||f}`,"warning"))}finally{r.disabled=!1}}async function i(u,r){if(n.has(u))return!1;let c=t(),s=u&&e.getWorkOrders().find(f=>f.id===u);if(!s)return e.showNotice("This work order is no longer available. Refresh and try again.","warning"),!1;n.add(u);let d=!1;try{if(r==="completed"){let h=e.productionActionCompletionMessage?.(s)||"";if(h)return e.setActiveWorkOrderId(u),e.setWorkOrderActionWarning(u,h),e.showNotice(h,"warning"),await e.render(),!1;let v=e.blocksProcedureCompletion(s);if(v)return e.setActiveWorkOrderId(u),e.setWorkOrderActionWarning(u,v),e.showNotice(v,"warning"),await e.render(),!1}let f=e.currentSafetyCheckboxCheckedForWorkOrder(u),o=e.hasCompletedSafetyDeviceCheck(s)||f;if(r==="completed"&&e.requiresSafetyDeviceCheck(s)&&!o){e.setActiveWorkOrderId(u);let h="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(u,h),e.showNotice(h,"warning"),await e.render(),!1}let g={status:r,asset_id:s.asset_id||null,completed_at:r==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(g),r==="completed"?e.applySafetyCheckPayload(g,g.safety_check_required&&o):r!=="completed"&&e.applySafetyCheckPayload(g,!1),delete g.asset_id;let{error:m}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,u),"Status save timed out. Check your connection and try again.",15e3);if(m)return c()&&e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(m)}`,"warning"),!1;if(d=!0,!c())return!0;let p;try{p=(await e.recordWorkOrderEvent(u,"status_changed",`Status changed to ${e.statusLabel(r)}.`))?.error}catch(h){p=h||new Error("History save failed.")}return c()&&(e.setActiveWorkOrderId(u),e.setWorkOrderActionWarning("",""),p?e.showNotice(`Status changed to ${e.statusLabel(r)}, but history could not be saved: ${p.message||p}`,"warning"):e.showNotice(`Status changed to ${e.statusLabel(r)}.`),await e.render()),!0}catch(f){if(c()){let o=d?`Status changed to ${e.statusLabel(r)}, but the view could not be refreshed: ${f.message||f}`:`Could not update status: ${f.message||f}`;e.showNotice(o,"warning")}return d}finally{n.delete(u)}}return{setWorkOrderStatus:i,updateWorkOrderStatus:a}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof at<"u"&&(at.exports={createWorkOrderStatusWorkflow:l})})()});var ln=L((kr,Me)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function a(s,d){return s?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${d}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${d}"]`)||null}async function i({workOrderId:s,payload:d,source:f,busyText:o,successMessage:g}){let m=f?.querySelector?.("button[type='submit']")||f,p=m?.textContent||"",h=a(f,s);m&&(m.disabled=!0,m.textContent=o),h&&(h.textContent="");try{let v=await e.withOperationTimeout(e.updateProductionActionRecord(s,d),"Production Action save timed out. Check your connection and try again.",15e3);if(v.error){let y=e.friendlyWorkOrderSaveError(v.error);return h?h.textContent=`Could not save Production Action: ${y}`:e.showNotice(`Could not save Production Action: ${y}`,"warning"),!1}return e.showNotice(g,"success"),await e.afterProductionActionMutation(v.data,s),!0}catch(v){let y=v.message||String(v);return h?h.textContent=`Could not save Production Action: ${y}`:e.showNotice(`Could not save Production Action: ${y}`,"warning"),!1}finally{m?.isConnected&&(m.disabled=!1,m.textContent=p)}}async function u(s){s.preventDefault(),s.stopPropagation();let d=s.currentTarget,f=d.dataset.productionActionForm,o=new n(d),g=String(o.get("production_action")||"").trim(),m=String(o.get("production_action_assigned_to")||"").trim(),p=a(d,f);if(!g||!m){p&&(p.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(f);await i({workOrderId:f,payload:{production_action:g,production_action_assigned_to:m},source:d,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function r(s){s.preventDefault(),s.stopPropagation();let d=s.currentTarget,f=d.dataset.workOrderId,o=d.dataset.productionActionStatus;await i({workOrderId:f,payload:{production_action_status:o},source:d,busyText:o==="completed"?"Completing...":"Reopening...",successMessage:o==="completed"?"Production Action completed.":"Production Action reopened."})}async function c(s){s.preventDefault(),s.stopPropagation();let d=s.currentTarget,f=d.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await i({workOrderId:f,payload:{production_action:null},source:d,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:u,setProductionActionStatus:r,removeProductionAction:c}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof Me<"u"&&Me.exports&&(Me.exports={createProductionActionWorkflow:l})})()});var un=L((_r,ot)=>{(function(){function l(e={}){async function n(i,u={}){let r=i.filter(f=>f.id&&!f.read_at);if(!r.length)return!0;let c=new Map(r.map(f=>[f.id,f])),s=new Date().toISOString(),d=r.map(f=>f.id);e.setNotifications(e.getNotifications().map(f=>c.has(f.id)?{...f,read_at:s}:f)),u.render!==!1&&e.renderWorkspace();try{let f=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,d,s),"Work notification update timed out.",1e4);if(f.error)throw f.error;return!0}catch(f){return e.setNotifications(e.getNotifications().map(o=>c.get(o.id)||o)),e.showNotice(`Could not mark the work notification read: ${f.message||f}`,"warning"),u.render!==!1&&e.renderWorkspace(),!1}}function t(i,u={}){let r=e.getNotifications().find(c=>c.id===i);return r?.read_at?Promise.resolve(!0):n([r||{id:i,read_at:null}],u)}function a(i,u={}){return n(e.getNotifications().filter(r=>r.work_order_id===i),u)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:a}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:l},typeof ot<"u"&&(ot.exports={createWorkOrderNotificationWorkflow:l})})()});var dn=L((qr,it)=>{(function(){function l(e){async function n(t,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let i=e.getPlanningWorkOrders().find(u=>u.id===t);if(!i||i.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let u=e.workOrderDateValue(a);if(!u)throw new Error("Choose a due date.");let r=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:u},t),"Due date save timed out. Check your connection and try again.");if(r.error)throw r.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(c=>c.id===t?{...c,due_at:u}:c)),e.setWorkOrders(e.getWorkOrders().map(c=>c.id===t?{...c,due_at:u}:c)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${u} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:u}}catch(u){return e.showNotice(`Could not set due date: ${u.message||u}`,"warning"),{saved:!1,reason:"save_failed",error:u}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof it<"u"&&(it.exports={createPlanningDueDateWorkflow:l})})()});var pn=L((Sr,st)=>{(function(){function l(n,t,a,i=50){let u=Math.min(Math.max(Number(i)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",a).order("created_at",{ascending:!1}).limit(u)}function e(n,t,a,i){let u=[...new Set((a||[]).filter(Boolean))];return u.length?n.from("work_order_notifications").update({read_at:i}).eq("recipient_id",t).in("id",u).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e},typeof st<"u"&&(st.exports={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e})})()});var mn=L(($r,ct)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:a||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof ct<"u"&&(ct.exports={notifyRequestEmailer:l})})()});var fn=L((Cr,lt)=>{(function(){async function l(n,t,a=[],i={}){let u=i.pathKey||"storage_path",r=i.urlKey||"signedUrl",c=i.expiresIn||600,s=i.onError;await Promise.all(a.map(async d=>{let f=d?.[u];if(!f)return;let{data:o,error:g}=await n.storage.from(t).createSignedUrl(f,c);if(g){d[r]="",typeof s=="function"&&s(d,g);return}d[r]=o?.signedUrl||""}))}function e(n={}){function t(a){if(!a||!n.getReady())return;let u=(n.getRows(a)||[]).filter(c=>c.storage_path&&!c.signedUrl),r=n.getSigningMap();!u.length||r[a]||(r[a]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,u),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(c=>{n.warn("Could not load signed file links",c)}).finally(()=>{delete r[a],n.getActiveGroupId()===a&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof lt<"u"&&(lt.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var gn=L((Ar,ut)=>{(function(){function l(t,a){if(t[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return t[a]}function e(t={}){let a=l(t,"supabaseClient"),i=l(t,"workspaceUiState"),u=l(t,"applyRequestQueryFilters"),r=l(t,"applyWorkOrderListFilters"),c=l(t,"applyWorkOrderFilters"),s=l(t,"selectWorkOrders"),d=l(t,"countWorkOrdersQuery"),f=l(t,"fetchExactSearchedWorkOrderPage"),o=l(t,"isColumnSchemaError"),g=t.warn||(()=>{}),m=l(t,"LIST_ITEMS_PER_PAGE"),p=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),v=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),y=l(t,"REQUEST_FALLBACK_SELECT"),k=l(t,"WORK_ORDER_RELATION_SELECT"),q=l(t,"WORK_ORDER_FALLBACK_SELECT");function S(){return typeof a=="function"?a():a}async function C(R=i.getRequestViewFilter(),W={}){let $=Math.max(1,i.getRequestsPage()),O=($-1)*m,x=O+m-1,I=W.includeRelations===!1?y:W.includeLocationRelation===!1?v:h,A=await u(S().from("maintenance_requests").select(I,{count:"exact"}),R).order("created_at",{ascending:!1}).range(O,x);return A.error&&W.includeLocationRelation!==!1&&o(A.error,["location_id","locations"])?C(R,{includeLocationRelation:!1}):A.error&&W.includeRelations!==!1?C(R,{includeRelations:!1}):!A.error&&A.count&&$>1&&O>=A.count?(i.setRequestsPage(Math.max(1,Math.ceil(A.count/m))),C(R,W)):A}async function E(R){let W=await u(S().from("maintenance_requests").select("id",{count:"exact",head:!0}),R);return W.error?(g("Request count failed",W.error),0):W.count||0}async function w(){let[R,W,$]=await Promise.all([E("active"),E("converted"),E("all")]);return{active:R,converted:W,all:$}}async function b(R={}){if(i.getWorkOrderSearchMode()&&i.getSearchQuery().trim())return f(R);let W=Math.max(1,i.getWorkOrderPage()),$=(W-1)*p,O=$+p-1,x=R.includeLocationRelation===!1?q:k,I=await r(s(S(),x,{count:"exact"})).range($,O);return!I.error&&I.count&&W>1&&$>=I.count?(i.setWorkOrderPage(Math.max(1,Math.ceil(I.count/p))),b(R)):I}async function P(R={}){let W=await c(d(S()),R);return W.error?(g("Work order count failed",W.error),0):W.count||0}async function _(){let[R,W,$,O,x,I,A,Q]=await Promise.all([P({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:R,newWork:W,inProgress:$,blocked:O,overdue:x,completedAll:I,completedMonth:A,completedWeek:Q}}async function D(){let[R,W,$,O,x,I,A,Q]=await Promise.all([P({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:R,newWork:W,inProgress:$,blocked:O,overdue:x,completedAll:I,completedMonth:A,completedWeek:Q}}return{fetchRequestPage:C,countRequests:E,loadRequestDashboardCounts:w,fetchWorkOrderPage:b,countWorkOrders:P,loadWorkOrderDashboardCounts:_,loadMyWorkDashboardCounts:D}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof ut<"u"&&(ut.exports=n)})()});var hn=L((Pr,dt)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,a=e.app;function i(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function u(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function r(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function c(m){s("Verifying your account...");try{if(m.error||m.errorDescription)throw new Error(m.errorDescription||m.error||"This verification link is invalid or expired.");let p=null;if(m.code){let{data:h,error:v}=await e.supabaseClient.auth.exchangeCodeForSession(m.code);if(v)throw v;p=h?.session||null}else if(m.accessToken&&m.refreshToken){let{data:h,error:v}=await e.supabaseClient.auth.setSession({access_token:m.accessToken,refresh_token:m.refreshToken});if(v)throw v;p=h?.session||null}if(!p){let{data:h,error:v}=await e.supabaseClient.auth.getSession();if(v)throw v;p=h?.session||null}if(!p)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(p),r(),s("Verification complete. Loading workspace..."),await e.render()}catch(p){r(),d(p.message||"This verification link is invalid or expired.")}}function s(m){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(m)}function d(m){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(m),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(m=e.passwordRecoveryParamsFromUrl()){let p=!1,h="";if(m.accessToken&&m.refreshToken){let{data:v,error:y}=await e.supabaseClient.auth.setSession({access_token:m.accessToken,refresh_token:m.refreshToken});p=!!(v?.session&&!y),y&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";g({ready:p,initialError:h})}function o(m="",p=""){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(m,p),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let v=h.target,y=v.querySelector("button[type='submit']"),k=t.querySelector("#auth-error"),q=t.querySelector("#auth-status"),S=String(new FormData(v).get("email")||"").trim();k.textContent="",q.textContent="Sending reset link...",y.disabled=!0,y.textContent="Sending...";try{let{error:C}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(S,{redirectTo:u()}),"Password reset email timed out. Check your connection and try again.",2e4);if(C){q.textContent="",k.textContent=C.message;return}q.textContent="If that email exists in Supabase, a reset link has been sent."}catch(C){q.textContent="",k.textContent=C.message||"Could not send reset link."}finally{t.body.contains(y)&&(y.disabled=!1,y.textContent="Send Reset Link")}})}function g({ready:m=!1,initialError:p=""}={}){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:m,initialError:p}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{r(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{r(),o()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!m)return;let v=h.target,y=v.querySelector("button[type='submit']"),k=new FormData(v),q=String(k.get("password")||""),S=String(k.get("confirmPassword")||""),C=t.querySelector("#auth-error"),E=t.querySelector("#auth-status");if(C.textContent="",q.length<8){C.textContent="Password must be at least 8 characters.";return}if(q!==S){C.textContent="Passwords do not match.";return}E.textContent="Updating password...",y.disabled=!0,y.textContent="Updating...";try{let{error:w}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:q}),"Password update timed out. Try the newest reset link again.",2e4);if(w){E.textContent="",C.textContent=w.message;return}r();let{data:b}=await e.supabaseClient.auth.getSession();if(e.setSession(b.session),E.textContent=b.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",b.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(w){E.textContent="",C.textContent=w.message||"Could not update password."}finally{t.body.contains(y)&&(y.disabled=!1,y.textContent="Update Password")}})}return{authCallbackRedirectUrl:i,passwordResetRedirectUrl:u,clearPasswordRecoveryUrl:r,startAuthCallback:c,renderAuthCallback:s,renderAuthCallbackError:d,startPasswordRecovery:f,renderPasswordResetRequest:o,renderPasswordRecovery:g}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof dt<"u"&&(dt.exports={createAuthSessionFlow:l})})()});var yn=L((Er,De)=>{(function(){function l(u,r){let c=r.getProfilesByUserId();if(u.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${r.escapeHtml(c[u.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(u.created_at).toLocaleString()}</span>
        <p>${r.escapeHtml(u.body)}</p>
      </article>
    `;if(u.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${r.photoMetaText(u)} &middot; ${r.escapeHtml(c[u.uploaded_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(u.file_name)}</p>
        ${u.signedUrl?`<a href="${r.escapeHtml(u.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(u.type==="part"){let d=r.partUsageUnitCost(u)*(Number(u.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(u.created_at).toLocaleString()} &middot; ${r.escapeHtml(c[u.created_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(u.parts?.name||"Part")} - ${Number(u.quantity_used)||0} used - ${r.money(d)}</p>
      </article>
    `}return`
    <article>
      <strong>${r.escapeHtml(u.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(u.created_at).toLocaleString()} \xC2\xB7 ${r.escapeHtml(c[u.actor_id]?.full_name||"Team member")}</span>
      <p>${r.escapeHtml(u.summary)}</p>
    </article>
  `}function e(u,r){let c=r.getProcedureTemplates(),s=r.getPartsUsedByWorkOrder(),d=r.getCommentsByWorkOrder(),f=r.getPhotosByWorkOrder(),o=r.getMessageThreads(),g=c.find(q=>q.id===u.procedure_template_id),m=g?r.checklistProgress(u,g):null,p=(s[u.id]||[]).length,h=(d[u.id]||[]).length,v=(f[u.id]||[]).length,y=o.filter(q=>q.work_order_id===u.id).length,k=[];return u.asset_id&&k.push(n("asset","Equipment",u.assets?.name||"Linked",r)),g&&m&&k.push(n("procedure","Procedure checklist",`${m.done}/${m.total}`,r)),p&&k.push(n("parts","Parts",String(p),r)),h&&k.push(n("comment","Comments",String(h),r)),y&&k.push(n("message","Messages",String(y),r)),v&&k.push(t(u.id,String(v),r)),k.length?`<div class="relationship-row">${k.join("")}</div>`:""}function n(u,r,c,s){return`
    <span class="relationship-chip ${u}" title="${s.escapeHtml(r)}">
      ${a(u)}
      <span>${s.escapeHtml(c)}</span>
    </span>
  `}function t(u,r,c){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${c.escapeHtml(u)}" title="Open photos">
      ${a("photo")}
      <span>${c.escapeHtml(r)}</span>
    </button>
  `}function a(u){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[u]||""}function i(u){return Object.freeze({renderActivityItem:r=>l(r,u),renderRelationshipChips:r=>e(r,u),relationshipChip:(r,c,s)=>n(r,c,s,u),photoJumpChip:(r,c)=>t(r,c,u),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:i}),typeof De<"u"&&De.exports&&(De.exports={createRelationshipDisplayHelpers:i})})()});var vn=L((Rr,pt)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,a=e.renderAssetOptions,i=e.renderMaintenanceRequestPhoto,u=e.isConvertedRequest,r=e.canDeleteOperationalRecords,c=e.canEditOperationalRecords||(()=>!0),s=e.getPendingDeleteRequestId,d=e.getProfilesByUserId;function f(p,h){return p==="converted"?`${h} converted`:p==="all"?`${h} total`:`${h} active`}function o(p,h,v={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",p.active],["converted","Converted",p.converted],["all","All",p.all]].map(([k,q,S])=>`
            <button class="segment ${h===k?"active":""}" data-request-filter="${k}" type="button" ${v.locked&&k!=="active"?"disabled":""}>
              ${n(k==="active"?"open":k==="converted"?"completed":"all")}${q} <span>${S}</span>
            </button>
          `).join("")}
        </div>
      `}function g(p){let h=u(p),v=c(),y=s()===p.id,k=d(),q=p.created_at?new Date(p.created_at):null,S=q&&!Number.isNaN(q.getTime())?q.toLocaleString():"date unavailable",C=p.assets?.name||p.locations?.name||"No equipment",E=p.requested_by_name||k[p.requested_by]?.full_name||"Requester",w=p.converted_by||p.reviewed_by||"",b=k[w]?.full_name||"",P=b?`Converted to work order by ${b}`:w?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",_=v&&r()?y?`
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
            ${i(p)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(C)}</span>
              <span><strong>Requester</strong>${t(E)}</span>
              <span><strong>Received</strong>${t(S)}</span>
            </div>
          </div>
          ${v&&!h&&p.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${p.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${p.id}" type="button">Convert to Work Order</button>
              ${_}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(P)}</span>
              ${_}
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:o,renderMaintenanceRequest:g,renderRequestFormContent:m}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof pt<"u"&&(pt.exports={createRequestDisplayHelpers:l})})()});var bn=L((Wr,mt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=x=>String(x||"corrective").replace(/\b\w/g,I=>I.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:i,getWorkOrderTypeFilter:u=()=>"all",getWorkOrderPriorityFilter:r=()=>"all",getWorkSort:c=()=>"newest",getWorkGroup:s=()=>"none",getActiveStatusFilter:d,getMyWorkFilter:f,getActiveSection:o,getDueState:g,getProcedureTemplates:m,getActiveWorkOrderId:p,getProfilesByUserId:h,getSession:v,STATUS_OPTIONS:y,TYPE_OPTIONS:k=[],OUTSIDE_VENDOR_VALUE:q,escapeHtml:S,cleanWorkOrderDescription:C,relationshipIcon:E,segmentIcon:w,isVendorAssigned:b,assignmentLabel:P,renderRelationshipChips:_,canAssignWorkOrderToMe:D,canManageTeam:R,renderProductionActionCard:W=()=>"",hasOpenProductionAction:$=()=>!1,hasUnreadProductionReady:O=()=>!1}){function x(){let T=a(),U=i(),j=d(),V=T?`${t(T)} Work`:U==="unassigned"?"Unassigned Work Orders":U==="vendor"?"Outside Vendor Work":U==="assigned"?"Assigned Work Orders":"Work Orders";return j==="active"||j==="all"?V==="Work Orders"?"Active Work Orders":`Active - ${V}`:`${e(j)} - ${V}`}function I(){let T=d();return T==="active"||T==="all"?"My Work":`${e(T)} - My Work`}function A(){return o()==="mywork"?I():x()}function Q(T){let U=o(),j=f();return U==="mywork"?`${T} shown - ${U==="mywork"?j==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${T} shown`}function H(T,U,j){return`<option value="${S(T)}" ${T===j?"selected":""}>${S(U)}</option>`}function se(T){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[T]||"Any assignment"}function pe(T){return T?T.charAt(0).toUpperCase()+T.slice(1):""}function ye(T=[]){let U=d(),j=U==="all"?"active":U,V=i(),G=a(),J=u(),z=r(),X=c(),Y=s(),ce=["completed","completed_month","completed_week"].includes(U),Z=j==="active"&&V==="all"&&!G&&J==="all"&&z==="all"&&X==="newest"&&Y==="none",F=T.find(ee=>ee.userId===G),ne=[`Status: ${e(j)}`,`Assignment: ${se(V)}`,...F?[`Person: ${F.name}`]:[],...J!=="all"?[`Type: ${n(J)}`]:[],...z!=="all"?[`Priority: ${pe(z)}`]:[]],ue=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],he=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],ie=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],we=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${ne.map(ee=>`<li><span>${S(ee)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${Z?"disabled":""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${j!=="active"?"is-active":""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${ue.map(([ee,de])=>H(ee,de,j)).join("")}
                </select>
              </label>
              <label class="work-control-field ${V!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${he.map(([ee,de])=>H(ee,de,V)).join("")}
                </select>
              </label>
              <label class="work-control-field ${G?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${H("","Any team member",G)}
                  ${T.map(ee=>H(ee.userId,ee.name,G)).join("")}
                </select>
              </label>
              <label class="work-control-field ${J!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${H("all","Any type",J)}
                  ${k.map(ee=>H(ee,n(ee),J)).join("")}
                </select>
              </label>
              <label class="work-control-field ${z!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${H("all","Any priority",z)}
                  ${["critical","high","medium","low"].map(ee=>H(ee,pe(ee),z)).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="work-control-section arrange-controls">
            <span class="work-control-section-title">Arrange by</span>
            <div class="work-control-fields">
              <label class="work-control-field">
                <span>Sort</span>
                <select data-work-sort-filter aria-label="Sort work orders" ${ce?"disabled":""}>
                  ${ce?H("completed","Recently completed","completed"):ie.map(([ee,de])=>H(ee,de,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${we.map(([ee,de])=>H(ee,de,Y)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function le(T,U){if(U==="assignee"){if(b(T))return{key:"vendor",label:"Outside vendor",order:900};if(!T.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let G=P(T);return{key:`assignee:${T.assigned_to}`,label:G,order:100}}if(U==="status"){let G=["open","in_progress","blocked","completed"].indexOf(T.status);return{key:`status:${T.status}`,label:e(T.status),order:G<0?99:G}}if(U==="priority"){let G=["critical","high","medium","low"].indexOf(T.priority);return{key:`priority:${T.priority}`,label:pe(T.priority||"Unspecified"),order:G<0?99:G}}let j=T.type||"corrective",V=k.indexOf(j);return{key:`type:${j}`,label:n(j),order:V<0?99:V}}function fe(T,U={}){if(!T.length)return'<p class="muted">No work orders match these filters.</p>';let j=U.groupBy||"none";if(j==="none")return`<div class="work-list" id="work-order-list">${T.map(re).join("")}</div>`;let V=new Map;return T.forEach(J=>{let z=le(J,j);V.has(z.key)||V.set(z.key,{...z,workOrders:[]}),V.get(z.key).workOrders.push(J)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...V.values()].sort((J,z)=>J.order-z.order||J.label.localeCompare(z.label)).map(J=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${S(J.label)}</h3>
                <span>${J.workOrders.length}</span>
              </div>
              <div class="work-list">${J.workOrders.map(re).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function re(T){let U=g(T),j=m().find(Y=>Y.id===T.procedure_template_id),V=T.created_at?new Date(T.created_at):null,G=V&&!Number.isNaN(V.getTime())?V.toLocaleDateString():"",J=T.status==="completed",z=J?"Completed":e(T.status),X=Y=>Y==="completed"?"Complete":e(Y);return`
        <article class="work-card status-card status-${T.status} ${T.id===p()?"selected":""}" data-id="${T.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${T.priority}">${T.priority}</span>
              <span class="chip">${S(n(T.type))}</span>
              <span class="chip ${T.status}">${z}</span>
              ${U?`<span class="chip ${U.className}">${U.label}</span>`:""}
              ${O(T.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${S(T.title)}</h3>
            <p>${S(C(T.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${E("asset")}${S(T.assets?.name||"General item / area")}</span>
            <span>${w(b(T)?"vendor":"mine")}${S(P(T))}</span>
            ${j?`<span>${E("procedure")}${S(j.name)}</span>`:""}
            <span>${w("due")}Due ${T.due_at||"unset"}</span>
            ${G?`<span>${w("created")}Created ${S(G)}</span>`:""}
            ${T.completed_at?`<span>${w("completed")}Completed ${new Date(T.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${_(T)}
          ${W(T)}
          <div class="quick-actions work-card-actions">
            ${!J&&D(T)?`<button class="assign-action" data-assign-me="${T.id}" type="button">Assign to me</button>`:""}
            ${!J&&R()?te(T):""}
          ${y.filter(Y=>Y!==T.status&&!(Y==="completed"&&$(T))).slice(0,3).map(Y=>`
            <button data-quick-status="${Y}" data-id="${T.id}" type="button">${X(Y)}</button>
          `).join("")}
        </div>
      </article>
    `}function te(T){return`
        <form class="card-assign-form" data-card-assign="${T.id}">
          <select name="assigned_to" aria-label="Assign ${S(T.title)}">
            <option value="">Unassigned</option>
            <option value="${q}" ${b(T)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([U,j])=>`<option value="${U}" ${!b(T)&&U===T.assigned_to?"selected":""}>${S(j.full_name||t(U))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function B(T="",U={}){let j=T||"",V=U.managerOptions??R(),G=U.allowUnassigned!==!1,J=U.selfLabel||"Assign to me",z=[];return G&&z.push(`<option value="" ${j===""?"selected":""}>Unassigned</option>`),z.push(`<option value="${v().user.id}" ${j===v().user.id?"selected":""}>${J}</option>`),V&&(z.push(`<option value="${q}" ${j===q?"selected":""}>Outside vendor</option>`),z.push(...Object.entries(h()).filter(([X])=>X!==v().user.id).map(([X,Y])=>`<option value="${X}" ${j===X?"selected":""}>${S(Y.full_name||t(X))}</option>`))),z.join("")}function me(T){return b(T)?q:T?.assigned_to||""}function ge(T,U=""){let j=me(T);return T?.status==="completed"?`
          <label ${U?`id="${U}"`:""}>Completed by / assigned to
            <input value="${S(P(T))}" disabled>
            <input name="assigned_to" type="hidden" value="${S(j)}">
          </label>
        `:R()?`
          <label ${U?`id="${U}"`:""}>Assign to
            <select name="assigned_to">
              ${B(j,{managerOptions:!0})}
            </select>
          </label>
        `:!T.assigned_to&&!b(T)?`
          <label ${U?`id="${U}"`:""}>Assign to
            <select name="assigned_to">
              ${B("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${U?`id="${U}"`:""}>Assigned to
          <input value="${S(P(T))}" disabled>
          <input name="assigned_to" type="hidden" value="${S(j)}">
        </label>
      `}return{workOrdersPanelTitle:x,myWorkPanelTitle:I,workQueuePanelTitle:A,workQueuePanelSubtitle:Q,renderWorkOrderFilterToolbar:ye,renderWorkOrderCollection:fe,renderWorkOrderCard:re,renderCardAssignmentControl:te,renderAssignmentSelect:B,renderWorkOrderAssignmentField:ge}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof mt<"u"&&(mt.exports={createWorkQueueDisplayHelpers:l})})()});var wn=L((Or,Te)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(o=>e.normalizeRole(o.role)==="production").map(o=>({userId:o.user_id,name:e.teamMemberName(o.user_id)})).sort((o,g)=>o.name.localeCompare(g.name))}function t(o){return o.production_action_assigned_to?e.teamMemberName(o.production_action_assigned_to):"Production owner not set"}function a(o){let g=e.activeCompanyRole();return["admin","manager"].includes(g)||o.production_action_assigned_to===e.getSession()?.user?.id}function i(o=""){return n().map(m=>`
        <option value="${e.escapeHtml(m.userId)}" ${m.userId===o?"selected":""}>${e.escapeHtml(m.name)}</option>
      `).join("")}function u(o,g={}){let m=n(),p=g.compact?" compact":"";if(!m.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=m.some(v=>v.userId===o.production_action_assigned_to)?o.production_action_assigned_to:m[0].userId;return`
        <form class="production-action-form${p}" data-production-action-form="${e.escapeHtml(o.id)}">
          <label>Production action
            <textarea name="production_action" rows="${g.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(o.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${i(h)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(o.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(o)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(o)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(o.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function r(o){return!a(o)||o.status==="completed"?"":o.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(o.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(o.id)}" type="button">Reopen Production Action</button>`}function c(o){let g=o.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${g?"status-completed":"status-open"}">${g?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(o))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(o.production_action)}</p>
        ${g&&o.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(o.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function s(o,g){let m=e.hasProductionAction(o),p=`production-action-dialog-${o.id}`;return`
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
              ${m?c(o):'<p class="muted">No Production Action is assigned.</p>'}
              ${g?`
                <div class="button-row production-action-detail-actions">
                  ${m?r(o):""}
                </div>
                ${u(o)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function d(o){let g=e.canEditOperationalRecords()&&o.status!=="completed",m=e.hasProductionAction(o);if(!m&&!g)return"";let p=o.production_action_status==="completed",h=`production-action-dialog-${o.id}`,v=m?t(o):"Not assigned",y=m?`${v} - ${o.production_action}`:v,k=m?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${p?"is-completed":m?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${m?`<span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(y)}">${e.escapeHtml(y)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(o.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${k}" title="${k}">
            <span aria-hidden="true">${m?"...":"+"}</span>
          </button>
          ${s(o,g)}
        </section>
      `}function f(o){let g=e.canEditOperationalRecords()&&o.status!=="completed";return!e.hasProductionAction(o)&&!g?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(o)?c(o):'<p class="muted">No Production Action is assigned.</p>'}
          ${g?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(o)?r(o):""}
            </div>
            ${u(o)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:d,renderProductionActionDetail:f}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof Te<"u"&&Te.exports&&(Te.exports={createProductionActionDisplayHelpers:l})})()});var kn=L((xr,ft)=>{(function(){function l(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(s=>String(s||"")),a=e.formatMessageTime||(s=>String(s||"")),i=Math.max(Number(e.visibleLimit)||12,1);function u(){return n().filter(s=>!s.read_at).length}function r(s){return n().some(d=>!d.read_at&&d.kind==="production_action_completed"&&d.work_order_id===s)}function c(){if(!e.getReady?.())return"";let s=n();if(!s.length)return"";let d=u(),f=s.slice(0,i);return`
        <section class="work-notification-panel" aria-label="Work notifications">
          <header class="work-notification-header">
            <h3>Work notifications</h3>
            <span>${d?`${d} new`:"Recent"}</span>
          </header>
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
                <span class="work-notification-body">${t(o.body)}</span>
                <span class="work-notification-action">Open work order</span>
              </button>
            `).join("")}
          </div>
          ${s.length>i?`<p class="work-notification-limit">Showing the ${i} most recent notifications.</p>`:""}
        </section>
      `}return{hasUnreadProductionReady:r,renderWorkOrderNotifications:c,unreadWorkOrderNotificationCount:u}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createWorkOrderNotificationDisplayHelpers:l})})()});var _n=L((Mr,Ie)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:i,teamMemberName:u}){function r(s){return`
        <article class="mini-work-order" data-mini-work-order="${s.id}">
          <strong>${e(s.title)}</strong>
          <span>${n(s.status)} - ${s.due_at||"no due date"}</span>
        </article>
      `}function c(s){let d=(a()[s.id]||[]).length,f=(i()[s.id]||[]).length,o=s.completed_at?new Date(s.completed_at).toLocaleDateString():"",g=s.completed_by?u(s.completed_by):"",m=!g&&s.assigned_to?u(s.assigned_to):"",p=g?` by ${e(g)}`:m?` - owner ${e(m)}`:"",h=s.resolution_summary||s.completion_notes||"";return`
        <article class="mini-work-order ${s.status==="completed"?"completed-history":""}" data-mini-work-order="${s.id}">
          <div class="chip-row">
            <span class="chip ${s.status}">${n(s.status)}</span>
            ${s.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${d?`<span class="relationship-chip parts">${t("parts")}<span>${d}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${t("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(s.title)}</strong>
          <span>${o?`Completed ${o}${p}`:`Due ${s.due_at||"unset"}`}</span>
          ${s.failure_cause?`<p><b>Finding:</b> ${e(s.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:r,renderAssetMiniWorkOrder:c}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof Ie<"u"&&Ie.exports&&(Ie.exports={createMiniWorkOrderDisplayHelpers:l})})()});var qn=L((Dr,gt)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:a,getParts:i,getPartDocumentsByPartId:u,getPartDocumentsReady:r,getPendingDeletePartId:c,getShowPartSourceManager:s,getPartCostsReady:d,getPartInventoryFilter:f,getPartSearchQuery:o,partUsageRows:g,canDeleteParts:m,canEditOperationalRecords:p=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:v,renderPartSourceManager:y}){let k=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],q=k.reduce(($,[O,x])=>($[O]=x.replace(/s$/,""),$),{});function S($){return $.document_type?$.document_type:String($.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test($.file_name||"")?"invoice":/receipt/i.test($.file_name||"")?"receipt":/schematic|diagram/i.test($.file_name||"")?"schematic":/print|drawing/i.test($.file_name||"")?"part_print":/manual/i.test($.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test($.file_name||"")?"spec_sheet":"other"}function C(){return k.map(([$,O])=>`
        <option value="${$}">${e(q[$]||O)}</option>
      `).join("")}function E($){let O=S($),x=String($.content_type||"").startsWith("image/"),I=q[O]||"File",A=$.created_at?new Date($.created_at).toLocaleString():"Uploaded",Q=$.file_size_bytes?`${Math.round(Number($.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${x?"image-file":""}">
          ${x&&$.signedUrl?`<a class="part-document-thumb" href="${e($.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e($.signedUrl)}" alt="${e($.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(I)}</span>
              ${Q?`<span class="chip">${e(Q)}</span>`:""}
            </div>
            <strong>${e($.file_name)}</strong>
            <span>${e(A)}</span>
            ${$.original_file_name&&$.original_file_name!==$.file_name?`<small>Original: ${e($.original_file_name)}</small>`:""}
            ${$.signedUrl?`<a href="${e($.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function w([$,O],x){let I=x.filter(A=>S(A)===$);return I.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(O)}</h4>
            <span>${I.length}</span>
          </div>
          <div class="part-document-grid">
            ${I.map(E).join("")}
          </div>
        </section>
      `:""}function b($){let O=$.reduce((I,A)=>{let Q=S(A);return I[Q]=(I[Q]||0)+1,I},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(I=>O[I]).map(I=>`<span class="chip">${O[I]} ${e(q[I]||"file")}${O[I]===1?"":"s"}</span>`).join("")}function P($){let O=Number($.quantity_on_hand)||0,x=Number($.reorder_point)||0,I=Number($.unit_cost)||0,A=O<=x,Q=Math.max(0,x-O);return`
        <article class="part-card part-tile ${A?"low-stock":""}" data-open-part="${$.id}" tabindex="0" role="button" aria-label="Open ${e($.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${$.sku?`<span class="chip">${e($.sku)}</span>`:""}
              ${$.supplier_name?`<span class="chip part-source-chip">${e($.supplier_name)}</span>`:""}
              ${$.machine_note?`<span class="chip">${e($.machine_note)}</span>`:""}
              ${A?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e($.name)}</h3>
            <div class="part-card-meta">
              <span>${O} on hand</span>
              <span>reorder at ${x}</span>
              <span>${d()?`${n(I)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${A&&x>0?`<small>Need ${Q} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function _(){let $=i().filter(a),O=$.filter(t).length,x=f();return[["All Parts",$.length,"all"],["Low Stock",O,"low"]].map(([I,A,Q])=>`
        <button class="parts-health ${Q==="low"&&A?"attention":""} ${x===Q?"active":""}" data-part-inventory-filter="${Q}" type="button">
          <span>${I}</span>
          <strong>${A}</strong>
        </button>
      `).join("")}function D($="default"){return`
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
              <option value="default" ${$==="default"?"selected":""}>Default</option>
              <option value="source" ${$==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function R($){let O=Number($.quantity_on_hand)||0,x=Number($.reorder_point)||0,I=Number($.unit_cost)||0,A=u()[$.id]||[],Q=b(A),H=p();return`
        <section class="part-detail-shell">
          ${H?h():""}
          ${v()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${$.sku?`<span class="chip">${e($.sku)}</span>`:""}
                ${$.supplier_name?`<span class="chip part-source-chip">${e($.supplier_name)}</span>`:""}
                ${$.machine_note?`<span class="chip">${e($.machine_note)}</span>`:""}
                <span class="chip ${O<=x?"overdue":"open"}">${O<=x?"low stock":"stocked"}</span>
              </div>
              <h3>${e($.name)}</h3>
              <p>${O} on hand - reorder at ${x}</p>
              ${Q?`<div class="chip-row part-file-summary">${Q}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${H?`<div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${$.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${e($.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${$.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${e($.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>`:""}
          </section>

          ${H?`<form class="part-detail-form relationship-detail parts" data-edit-part="${$.id}">
            <label>Name<input name="name" required value="${e($.name)}"></label>
            <label>SKU<input name="sku" value="${e($.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e($.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e($.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${O}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${x}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${I}"></label>
            <p class="error-text" data-part-edit-error="${$.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${H&&s()?y():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${A.length} file${A.length===1?"":"s"}</span>
            </div>
            ${H?`<form class="part-document-form" data-part-document="${$.id}">
              <label>Attach photos or files<input name="document" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <p class="error-text" data-part-document-error="${$.id}">${r()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${r()?"":"disabled"}>Review Attachments</button>
            </form>`:""}
            <div class="part-document-list">
              ${A.length?k.map(se=>w(se,A)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${H?W($):""}
        </section>
      `}function W($){let O=g($.id).length,x=u()[$.id]||[],I=c()===$.id;return m()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${O?`This part has ${O} usage record${O===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${x.length?` and ${x.length} filed receipt/invoice record${x.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${O?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:I?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${e($.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${e($.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-part="${e($.id)}" type="button">Delete Part</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:P,renderPartsHealth:_,renderPartSearch:D,renderPartDetail:R,renderPartDangerZone:W}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createPartsDisplayHelpers:l})})()});var Sn=L((Tr,ht)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:a,getAppIssueReportsReady:i,getAppIssueReports:u}){function r(){let d=i();return`
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
      `}function c(d){let f={open:0,reviewing:1,resolved:2};return[...d].sort((o,g)=>{let m=(f[o.status||"open"]??1)-(f[g.status||"open"]??1);return m||new Date(g.created_at||0)-new Date(o.created_at||0)})}function s(){if(!e())return"";let d=i(),f=u(),o=c(f);return`
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
      `}return{renderAppIssueReportForm:r,renderAppIssueReportsPanel:s,sortedAppIssueReports:c}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createAppIssuePanelDisplayHelpers:l})})()});var $n=L((Ir,yt)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:a,checklistProgress:i,requiredChecklistProgress:u,escapeHtml:r,cleanWorkOrderDescription:c,renderRelationshipChips:s,renderWorkOrderCommandSummary:d,renderWorkOrderRecommendation:f,statusLabel:o,normalizeWorkOrderType:g=x=>String(x||"corrective"),workOrderTypeLabel:m=x=>String(x||"corrective").replace(/\b\w/g,I=>I.toUpperCase()),hasCompletedSafetyDeviceCheck:p,canAssignWorkOrderToMe:h,renderAssetOptions:v,assetLocationRoutingMessage:y,renderWorkOrderAssignmentField:k,requiresSafetyDeviceCheck:q,renderWorkOrderMessages:S,renderProcedureOptions:C,money:E,photoMetaText:w,renderActivityItem:b,canDeleteWorkOrders:P,canEditOperationalRecords:_=()=>!0,renderProductionActionDetail:D=()=>"",hasOpenProductionAction:R=()=>!1}=e;function W(x,I){let A=e.getStepResultsByWorkOrder()[x.id]?.[I.id],Q=A?.value||"",H=`data-step-result="${I.id}" data-work-order-id="${x.id}"`,se=`<input ${H} value="${r(Q)}" placeholder="Result">`;return I.response_type==="checkbox"&&(se=`<label class="check-row"><input ${H} type="checkbox" ${Q==="checked"?"checked":""}> Done</label>`),I.response_type==="pass_fail"&&(se=`
          <select ${H}>
            <option value="">Not checked</option>
            <option value="pass" ${Q==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${Q==="fail"?"selected":""}>Fail</option>
          </select>
        `),I.response_type==="number"&&(se=`<input ${H} type="number" value="${r(Q)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${I.position}. ${r(I.prompt)} ${I.required?'<small class="required-mark">Required</small>':""}</span>
          ${se}
          <small data-checklist-recorded>${A?.completed_at?`Recorded ${new Date(A.completed_at).toLocaleString()}`:""}</small>
        </div>
      `}function $(x){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, photos, and files.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===x.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${r(x.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${x.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${x.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function O(){let x=e.getActiveWorkOrderId(),A=e.getWorkOrders().find(F=>F.id===x);if(!A)return n();let Q=e.getCommentsByWorkOrder(),H=e.getPhotosByWorkOrder(),se=e.getEventsByWorkOrder(),pe=e.getPartsUsedByWorkOrder(),ye=e.getProcedureTemplates(),le=e.getWorkOrderActionWarningId(),fe=e.getWorkOrderActionWarning(),re=e.getParts(),te=e.getProfilesByUserId(),B=e.getCommentsError(),me=e.STATUS_OPTIONS||[],ge=e.TYPE_OPTIONS||[],T=Q[A.id]||[],U=H[A.id]||[],j=se[A.id]||[],V=pe[A.id]||[],G=V.reduce((F,ne)=>F+(Number(ne.quantity_used)||0)*t(ne),0),J=V.reduce((F,ne)=>F+(Number(ne.quantity_used)||0),0),z=a(T,U,j,V),X=ye.find(F=>F.id===A.procedure_template_id),Y=X?i(A,X):null,ce=X?u(A,X):null,Z=_();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${A.priority}">${A.priority}</span>
            <span class="chip">${r(m(A.type))}</span>
            <span class="chip ${A.status}">${o(A.status)}</span>
          </div>
          <h2>${r(A.title)}</h2>
          ${A.preventive_source_id?`<p class="completion-note" data-pm-source>PM: ${r(A.preventive_source_title||"Preventive schedule")} - Scheduled ${r(A.preventive_due_at||"unset")}${A.preventive_schedule_id?' <button class="text-button" data-search-section="pm" type="button">PM Schedules</button>':" - Schedule deleted"}</p>`:""}
          <p>${r(c(A.description)||"No description.")}</p>
          ${s(A)}
          ${A.completed_at?`<p class="completion-note">Completed ${new Date(A.completed_at).toLocaleString()} \xC2\xB7 ${A.actual_minutes||0} min</p>`:""}
          ${A.asset_id&&p(A)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${A.completion_notes?`<p>${r(A.completion_notes)}</p>`:""}
        </div>

        ${d(A)}
        ${f(A)}
        ${D(A)}

        ${A.completed_at&&(A.failure_cause||A.resolution_summary||A.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${A.failure_cause?`<article><span>Cause</span><strong>${r(A.failure_cause)}</strong></article>`:""}
            ${A.resolution_summary?`<article><span>Resolution</span><strong>${r(A.resolution_summary)}</strong></article>`:""}
            ${A.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${Z?`<label>Status
          <select id="status-select">
            ${me.map(F=>`<option value="${F}" ${F===A.status?"selected":""} ${F==="completed"&&R(A)?"disabled":""}>${o(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${Z?`<div class="quick-actions detail-quick-actions">
          ${h(A)?`<button class="assign-action" data-assign-me="${A.id}" type="button">${A.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${me.filter(F=>F!==A.status&&!(F==="completed"&&R(A))).map(F=>`
            <button data-quick-status="${F}" data-id="${A.id}" type="button">${o(F)}</button>
          `).join("")}
        </div>`:""}
        ${le===A.id&&fe?`<p class="error-text action-warning">${r(fe)}</p>`:""}

        ${Z?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${r(A.title)}"></label>
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
                    ${v(A.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${r(y(A.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(A.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${r(A.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${me.map(F=>`<option value="${F}" ${F===A.status?"selected":""} ${F==="completed"&&R(A)?"disabled":""}>${o(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===A.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${k(A,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${C(A.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${A.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${q(A)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${A.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:`<div class="safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>${A.asset_id?"This equipment does not require the equipment safety check.":"No machine / equipment selected, so no equipment safety check is required."}</span></div>`}
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
            <button class="secondary-button" data-copy-downtime="subject" data-id="${A.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${A.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${S(A)}

        ${Z?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${r(A.title)}"></label>
          <label>Description<textarea name="description" rows="3">${r(c(A.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${r(A.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===A.priority?"selected":""}>${F}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${ge.map(F=>`<option value="${F}" ${F===g(A.type)?"selected":""}>${m(F)}</option>`).join("")}
            </select>
          </label>
          ${k(A)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${C(A.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${r(A.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(A.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${A.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${q(A)?`
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${A.safety_devices_checked?"checked":""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          `:""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${A.actual_minutes||0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>`:""}

        ${X?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${r(X.name)}</h3>
              <span data-checklist-summary>${Y.done} of ${Y.total} complete - required ${ce.done}/${ce.total}</span>
            </div>
            <div class="checklist-list">
              ${Z&&e.checklistToolsReady?.()===!1?e.renderChecklistLoading():X.procedure_steps.map(F=>Z?W(A,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${r(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${r(e.getStepResultsByWorkOrder()[A.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${Z&&A.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${ce?.total?`<p class="${ce.done===ce.total?"completion-note":"warning-text"}">Required checklist: ${ce.done}/${ce.total}</p>`:""}
            ${R(A)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${A.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${q(A)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${p(A)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${R(A)?"disabled":""}>Complete Work Order</button>
          </form>
          </details>
        `:""}

        <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
          <summary>Parts Used</summary>
        ${Z?`<form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${re.map(F=>`<option value="${F.id}">${r(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${V.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${E(G)}</span></article>`:""}
          ${V.map(F=>`
            <article class="relationship-detail parts">
              <strong>${r(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${E((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${r(te[F.created_by]?.full_name||"Team member")}</small>
            </article>
          `).join("")||'<p class="muted">No parts used yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos and Files</summary>
        ${Z?`<form class="form-grid relationship-detail photo" id="photo-form">
          <label>Attach photos or files<input name="photo" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
          <p class="error-text" id="photo-error"></p>
          <button class="secondary-button" type="submit">Review Attachments</button>
        </form>`:""}

        <div>
          <h3>Photos</h3>
          <div class="photo-list">
            ${U.map(F=>`
              <article class="relationship-detail photo">
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${r(F.signedUrl)}" alt="${r(F.file_name)}">`:""}
                <strong>${r(F.file_name)}</strong>
                <span>${w(F)}</span>
                ${F.signedUrl?`<a href="${r(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${Z?`<button class="text-button danger-link" data-delete-work-order-photo="${r(F.id||"")}" data-work-order-photo-path="${r(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
              </article>
            `).join("")||'<p class="muted">No photos uploaded yet.</p>'}
          </div>
        </div>
          <div data-work-order-documents></div>
        </details>

        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        ${Z?`<form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>`:""}
        <div class="comment-list">
          ${T.map(F=>`
            <article class="relationship-detail comment">
              <strong>${r(te[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${r(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${B?`<p class="error-text">${r(B)}</p>`:""}
          ${z.map(b).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${Z&&P()?$(A):""}
      </div>
    `}return{renderWorkOrderDetail:O}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createWorkOrderDetailDisplayHelpers:l})})()});var Cn=L((Fr,vt)=>{(function(){function l(){function e(){return`
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
              <span>Traveling Primary</span>
              <strong>Shared machine that moves between facilities</strong>
              <p>For standalone curving units and similar machines. One permanent record retains its work, parts and history wherever it goes. No parent or sub equipment; no automatic stock transfers.</p>
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var An=L((Lr,bt)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:a,escapeHtml:i,assetTypeLabel:u,renderParentAssetOptions:r,renderLocationOptions:c,renderAssetAreaOptions:s,assetStatusLabel:d,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:o,canDeleteEquipment:g,canEditEquipmentRecords:m=()=>!0,renderEquipmentStructureGuide:p,renderProcedureOptions:h}=e;function v(){let b=new Date;return new Date(b.getTime()-b.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function y(){return m()?`<form class="inline-form" id="create-asset-form">
        <input name="name" required placeholder="Machine or equipment name">
        <input name="asset_code" placeholder="Serial number">
        <input name="asset_tag" aria-label="Asset tag" placeholder="Asset tag (optional)">
        <input name="manufacturer" placeholder="Manufacturer">
        <input name="model" placeholder="Model">
        <select name="location_existing" aria-label="Area / spot"><option value="">No area / spot set</option>${s()}</select>
        <input name="location_new" placeholder="New area / spot">
        <select name="asset_type" aria-label="Equipment type">${e.ASSET_TYPE_OPTIONS.map(b=>`<option value="${b}">${u(b)}</option>`).join("")}</select>
        <select name="parent_asset_id" aria-label="Part of equipment"><option value="">Top level equipment</option>${r()}</select>
        <select name="location_id" ${e.getLocations().length?"required":"disabled"}>${c()}</select>
        <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety device identification</label>
        <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
        <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form><p class="error-text" id="asset-create-error"></p>`:'<p class="muted">Accounting can view equipment here. Maintenance and admins manage operational equipment changes.</p>'}function k(b,P,_){let D=P.some(O=>O.event_type==="created"),R=b.created_at&&!D?[{id:`${b.id}-created`,event_type:"created",summary:`${u(b.asset_type)} created.`,actor_id:b.created_by||"",created_at:b.created_at}]:[];return{equipmentHistory:[...P,...R].sort((O,x)=>new Date(x.created_at||0)-new Date(O.created_at||0)),historyActorLabel:O=>O.actor_id&&_[O.actor_id]?.full_name?_[O.actor_id].full_name:O.actor_id?`User ${String(O.actor_id).slice(0,8)}`:O.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function q(b,P){return b.map(_=>`
        <article>
          <strong>${i(String(_.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${_.created_at?new Date(_.created_at).toLocaleString():"time unavailable"} &middot; ${i(P(_))}</span>
          <p>${i(_.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function S(){let b=e.getAssets(),P=e.getActiveAssetId(),_=b.find(pe=>pe.id===P);if(!_)return n();let D=e.getAssetEventsReady?.()!==!1,R=e.getProfilesByUserId?.()||{},W=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((pe,ye)=>new Date(ye.created_at||0)-new Date(pe.created_at||0)),{equipmentHistory:$,historyActorLabel:O}=k(_,W,R),x=e.LIST_ITEMS_PER_PAGE||12,I=Math.max(1,Math.ceil($.length/x)),A=Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,"asset-history")||1),I),Q=$.length?(A-1)*x+1:0,H=Math.min($.length,A*x),se=$.slice((A-1)*x,A*x);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${i(_.name)} - ${$.length} event${$.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${i(_.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${D?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${q(se,O)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${$.length>x?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${i(_.id)}" type="button" ${A<=1?"disabled":""}>Previous</button>
                <span>Showing ${Q}-${H} of ${$.length} - Page ${A} of ${I}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${i(_.id)}" type="button" ${A>=I?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function C(){let b=e.getAssets(),P=e.getActiveAssetId(),_=b.find(M=>M.id===P);if(!_)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(_.id);let D=e.getWorkOrders(),R=e.getPreventiveSchedules(),W=e.getParts(),$=e.getAssetParts(),O=e.getAssetPartsReady(),x=e.getAssetDocumentsByAssetId?.()[_.id]||[],I=e.getAssetDocumentsReady?.()!==!1,A=e.getAssetEventsReady?.()!==!1,Q=e.getProfilesByUserId?.()||{},H=e.getPartsUsedByWorkOrder(),se=e.getLocations(),pe=e.getActiveLocationId(),ye=e.ASSET_TYPE_OPTIONS||[],le=t(_),fe=a(_.id),re=D.filter(M=>M.asset_id===_.id),te=e.getAssetWorkHistory?.(_.id),B=!te||te.historyStatus==="ready",me=te?te.rows:re,ge=te?.historyStatus==="error"?'<p class="error-text" role="alert">Could not load work history.</p>':'<p class="muted" role="status">Loading work history...</p>',T=me.filter(M=>M.status!=="completed").sort((M,oe)=>new Date(oe.created_at||0)-new Date(M.created_at||0)),U=me.filter(M=>M.status==="completed").sort((M,oe)=>new Date(oe.completed_at||oe.created_at||0)-new Date(M.completed_at||M.created_at||0)),j=R.filter(M=>M.asset_id===_.id),V=Object.values(H).flat().filter(M=>re.some(oe=>oe.id===M.work_order_id)),G=$.filter(M=>M.asset_id===_.id),J=new Set(G.map(M=>M.part_id)),z=W.filter(M=>!J.has(M.id)),X=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((M,oe)=>new Date(oe.created_at||0)-new Date(M.created_at||0)),{equipmentHistory:Y}=k(_,X,Q),ce=(M,oe)=>te?te.countsStatus==="ready"?te.counts[M]:te.countsStatus==="error"?"Unavailable":"Loading...":oe,Z=M=>`data-asset-work-count="${i(_.id)}" data-work-count-kind="${M}"`,F=e.LIST_ITEMS_PER_PAGE||12,ne=M=>e.getAssetRelationshipOpen?.(_.id,M)||!1,ue=(M,oe)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,M)||1),Math.max(1,Math.ceil(oe/F))),he=(M,oe)=>{let be=ue(oe,M.length);return M.slice((be-1)*F,be*F)},ie=(M,oe)=>{if(oe<=F)return"";let be=ue(M,oe),St=Math.max(1,Math.ceil(oe/F)),On=(be-1)*F+1,xn=Math.min(oe,be*F);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${i(_.id)}" data-asset-relation-section="${i(M)}" type="button" ${be<=1?"disabled":""}>Previous</button>
            <span>Showing ${On}-${xn} of ${oe} - Page ${be} of ${St}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${i(_.id)}" data-asset-relation-section="${i(M)}" type="button" ${be>=St?"disabled":""}>Next</button>
          </div>
        `},we=M=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${i(M)}" data-asset-id="${i(_.id)}" ${ne(M)?"open":""}`,ee=se.find(M=>M.id===_.location_id)?.name||_.location||"No location set",de=le?le.name:"Top level equipment",ke=_.status==="offline"?"status-blocked":_.status==="degraded"?"status-open":_.status==="watch"?"status-in_progress":"status-completed",ae=_.status==="degraded"&&ce("open",T.length)===0,K=m(),ve=_.asset_type==="traveling_machine";return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${_.status}">${i(d(_.status))}</span>
              <span class="chip">${i(u(_.asset_type))}</span>
              ${_.asset_code?`<span class="chip">${i(_.asset_code)}</span>`:""}
              ${_.asset_tag?`<span class="chip">Asset tag: ${i(_.asset_tag)}</span>`:""}
              ${_.manufacturer?`<span class="chip">${i(_.manufacturer)}</span>`:""}
              ${_.model?`<span class="chip">${i(_.model)}</span>`:""}
              ${_.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${i(_.name)}</h2>
            <p>${i(_.location||"No area / spot set")}</p>
            ${le?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${i(le.id)}" type="button">${i(le.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${ke}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${i(d(_.status))}</strong>
              <small>${_.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${i(ee)}</strong>
              <small>${_.location?i(_.location):"No area / spot set"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${i(de)}</strong>
              <small>${le?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${fe.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${fe.length}</strong>
              <small>${fe.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${G.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${G.length}</strong>
              <small>${G.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${ce("open",T.length)===0?"empty":""}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong ${Z("open")}>${ce("open",T.length)}</strong>
              <small>Active work tied to this equipment</small>
            </button>
            <button class="command-card command-photo ${x.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${x.length}</strong>
              <small>${x.length?"Machine files on record":"No machine files yet"}</small>
            </button>
          </section>

          <section class="equipment-status-guide" aria-label="Equipment status guide">
            <div><strong>Watch</strong><span>Monitor for a possible issue.</span></div>
            <div><strong>Degraded</strong><span>Known issue, still usable.</span></div>
            <div><strong>Offline / Down</strong><span>Do not count on this equipment.</span></div>
          </section>

          ${ae&&K?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${i(_.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${p?p():""}

          ${K?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${_.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${x.length} file${x.length===1?"":"s"}</span>
            </div>
            ${K?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${i(_.id)}">
              <label>Attach photos or files<input name="document" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <p class="error-text" data-asset-document-error="${i(_.id)}">${I?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${I?"":"disabled"}>Review Attachments</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${x.map(M=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(M.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${i(M.signedUrl)}" alt="${i(M.original_file_name||M.file_name||_.name)}">`:`<strong>${i(w(M.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${i(w(M.document_type))}</strong>
                      <span>${i(M.original_file_name||M.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${i(M.signedUrl)}" alt="${i(M.original_file_name||M.file_name||_.name)}">`:`<div class="asset-file-document-preview">${i(w(M.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${i(M.content_type||"file")}</span>
                      <a class="secondary-button" href="${i(M.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${K?`<button class="text-button danger-link" data-delete-asset-document="${i(M.id)}" data-asset-document-path="${i(M.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${ve&&K?`<form class="form-grid relationship-detail asset asset-move" id="move-traveling-asset-form"
            data-asset-id="${i(_.id)}" data-company-id="${i(_.company_id)}" data-from-location="${i(_.location_id||"")}" data-travel-revision="${Number(_.traveling_revision||0)}">
            <h3>Change current facility</h3>
            <p>Currently at ${i(ee)}. All work history, part links, files and financials stay with this machine. Existing orders keep their original facility and assigned person. Warehouse stock stays at its current facility.</p>
            <label>New facility<select name="destination_id" required>
              <option value="">Choose facility</option>
              ${se.filter(M=>M.id!==_.location_id).map(M=>`<option value="${i(M.id)}">${i(M.name)}</option>`).join("")}
            </select></label>
            <button class="secondary-button" type="submit">Change location</button>
            <p class="error-text" role="alert" data-transfer-error></p>
          </form>`:""}
          ${K?`<form class="form-grid" id="edit-asset-form" data-travel-revision="${Number(_.traveling_revision||0)}">
            <label>Equipment name<input name="name" required value="${i(_.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${i(_.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${i(_.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${i(_.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${i(_.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${ye.map(M=>`<option value="${M}" ${M===(_.asset_type||"machine")?"selected":""}>${u(M)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id" ${ve?"disabled":""}>
                <option value="">Top level equipment</option>
                ${r(_.parent_asset_id||"",_.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${se.length&&!ve?"":"disabled"}>
                ${c(_.location_id||pe)}
              </select>
              ${ve?'<span class="muted">Use Change current facility above.</span>':""}
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">No area / spot set</option>
                ${s(_.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(M=>`<option value="${M}" ${M===_.status?"selected":""}>${d(M)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${_.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${fe.map(M=>`
                <article class="mini-work-order" data-open-asset="${i(M.id)}">
                  <strong>${i(M.name)}</strong>
                  <span>${i(u(M.asset_type))} - ${i(d(M.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${we("open-work")} id="asset-open-work-target">
            <summary>Open Work <span ${Z("open")}>${ce("open",T.length)}</span></summary>
            <div class="mini-list">
              ${ne("open-work")?B?he(T,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':ge:'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${ne("open-work")&&B?ie("open-work",T.length):""}
          </details>

          <details ${we("completed-history")}>
            <summary>Completed History <span ${Z("completed")}>${ce("completed",U.length)}</span></summary>
            <div class="mini-list">
              ${ne("completed-history")?B?he(U,"completed-history").map(f).join("")||'<p class="muted">No completed work yet.</p>':ge:'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${ne("completed-history")&&B?ie("completed-history",U.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${Y.length} event${Y.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${i(_.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${A?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure" data-asset-pm-schedules="${i(_.id)}">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${e.getSchedulesReady?.()===!1?"Unavailable":`${j.length} schedule${j.length===1?"":"s"}`}</span>
                ${K?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${K&&e.canCreatePreventiveSchedule?.()===!1?e.renderMaintenanceLoading():""}
            ${K&&e.canCreatePreventiveSchedule?.()!==!1?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${i(_.id)}">
              <input name="title" required placeholder="PM for ${i(_.name)}">
              <input name="asset_id" type="hidden" value="${i(_.id)}">
              <select name="frequency">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select name="procedure_template_id">
                ${h?h():'<option value="">No procedure checklist</option>'}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${v()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
              <button class="secondary-button" type="reset">Clear Form</button>
            </form>`:""}
            <div class="mini-list">
              ${e.getSchedulesReady?.()===!1?'<p class="error-text" role="alert">PM schedules could not be loaded.</p>':he(j,"pm-schedules").map(M=>`<article><strong>${i(M.title)}</strong><span>${i(M.frequency||"")} - next due ${i(M.next_due_at||"")}</span>${M.active===!1?'<span class="chip">Inactive</span>':""}</article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
            ${ie("pm-schedules",j.length)}
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${i(_.id)}" ${ne("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${G.length}</span></summary>
            <div class="panel-header compact">
              ${K?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${O?`
              ${K?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${i(_.id)}">
                <label>Part
                  <select name="part_id" ${z.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${z.map(M=>`<option value="${i(M.id)}">${i(M.name)}${M.sku?` - ${i(M.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${z.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${i(_.id)}"></p>
              <div class="mini-list">
                ${he(G,"linked-parts").map(M=>`<article>
                  <strong>${i(M.parts?.name||"Part")}</strong>
                  <span>${i(M.parts?.sku||"No SKU")} - recommended qty ${i(M.quantity_recommended||1)}${M.note?` - ${i(M.note)}`:""}</span>
                  ${K?`<button class="text-button danger-link" data-remove-asset-part="${i(M.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${ie("linked-parts",G.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${i(_.id)}" ${ne("parts-used")?"open":""}>
            <summary>Parts Used History <span>${B?V.length:"Not loaded"}</span></summary>
            <div class="mini-list">
              ${ne("parts-used")?B?he(V,"parts-used").map(M=>`<article><strong>${i(M.parts?.name||"Part")}</strong><span>${M.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':ge:'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${ne("parts-used")&&B?ie("parts-used",V.length):""}
          </details>

          ${K?E(_):""}
        </div>
      `}function E(b){let P=e.getWorkOrders(),_=e.getPreventiveSchedules(),D=e.getAssets(),R=e.getActiveAssetId(),W=P.filter(Q=>Q.asset_id===b.id).length,$=_.filter(Q=>Q.asset_id===b.id).length,O=D.filter(Q=>Q.parent_asset_id===b.id).length,x=e.getMaintenanceRequests().filter(Q=>Q.asset_id===b.id).length,I=o({workOrders:W,children:O,schedules:$,requests:x}),A=e.getPendingDeleteAssetId()===R;return g()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${I||`This permanently removes "${i(b.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${I?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:A?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${i(b.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${i(b.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${i(b.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function w(b){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[b]||"File"}return{renderAssetDetail:C,renderAssetHistoryScreen:S,renderCreateAssetForm:y}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createAssetDetailDisplayHelpers:l})})()});var Pn=L((Nr,wt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:a,statusLabel:i,workOrderTypeLabel:u=o=>String(o||"corrective").replace(/\b\w/g,g=>g.toUpperCase()),renderAssignmentSelect:r,renderProcedureOptions:c,escapeHtml:s}=e;function d(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getParts();return`
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
                  ${n.map(g=>`<option value="${g}" ${g==="open"?"selected":""}>${i(g)}</option>`).join("")}
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
                  ${c()}
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
                  ${o.map(g=>`<option value="${g.id}">${s(g.name)} (${g.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label>Photos or files<input name="photo" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <label>First comment<textarea name="initial_comment" rows="2" placeholder="Add the first update or note for the record."></textarea></label>
            </div>
          </details>

          <p class="error-text" id="create-work-order-error"></p>
          <button class="primary-button work-action-button quick-fix-submit" type="submit">Create Work Order</button>
        </form>
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var En=L((Ur,kt)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:a,escapeHtml:i,renderAssignmentSelect:u,renderProcedureOptions:r,assetStatusLabel:c,workOrderTypeLabel:s=o=>String(o||"corrective").replace(/\b\w/g,g=>g.toUpperCase())}=e;function d(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getQuickFixAssetId(),g=e.getQuickFixRequestId(),m=e.getMaintenanceRequests(),p=e.getSession(),h=e.getParts(),v=o||"",y=m.find(k=>k.id===g);return`
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${y?`<p class="completion-note">Resolving request: ${i(y.title)}</p>`:""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${i(y?.title||"")}"></label>
          <label>Description<textarea name="description" rows="3" placeholder="Describe what happened, where it happened, and what should be checked.">${i(y?.description||"")}</textarea></label>
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
                  ${t(v||y?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${i(a(v||y?.asset_id||""))}</p>
          <label>Photos or files<input name="photo" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
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
                  ${n.map(k=>`<option value="${k}" ${k==="corrective"?"selected":""}>${s(k)}</option>`).join("")}
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
                  ${["running","watch","degraded","offline"].map(k=>`<option value="${k}">${c(k)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${h.map(k=>`<option value="${k.id}">${i(k.name)} (${k.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof kt<"u"&&(kt.exports={createQuickFixDisplayHelpers:l})})()});var Rn=L((Qr,_t)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(f){return`
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
      `}function i(f,o=""){let g=f==="signup";return`
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
      `}function c(f="",o=""){return`
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
      `}function s(f={}){let o=!!f.ready,g=f.initialError||"";return`
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
      `}return{workspaceLoading:t,workspaceLoadError:a,authForm:i,authCallback:u,authCallbackError:r,passwordResetRequest:c,passwordRecovery:s,companyCreate:d}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof _t<"u"&&(_t.exports={createAuthDisplayHelpers:l})})()});var Wn=L((Br,qt)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,a=e.getLocations||(()=>[]),i=e.getPublicRequestLinks||(()=>[]),u=e.getPublicRequestLinksReady||(()=>!0),r=e.getPublicAppUrlOverride||(()=>""),c=e.getWindowPublicAppUrl||(()=>""),s=e.canManageTeam||(()=>!1),d=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,o=e.publicRequestUrl,g=e.publicRequestQrUrl;function m(){return`
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
      `}function p(C,E){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(C.location_name)}</h1>
                <p>${n(C.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${t(E,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${n(E)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${n(E)}" target="_blank" rel="noreferrer">Test Form</a>
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
      `}function v(C){return`
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(C.company_name)}</h1>
                <p>${n(C.location_name)} maintenance request</p>
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
      `}function y(C){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${n(C)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function k(C,E=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(C.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${E?`<p class="error-text">${n(E)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function q(){if(!s())return"";let C=f(),E=a(),w=u();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${n(r()||String(c()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${C?`<p class="muted">QR codes will point to ${n(C)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${w?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${E.map(S).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function S(C){let E=i().find(R=>R.location_id===C.id),w=!!(E&&E.is_active!==!1),b=d(),P=w?o(E.token):"",_=w?g(E.token):"",D=!!(P&&_);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(C.name)}</strong>
            <span>${w?"External request link active":E?"Request link disabled":"No request link yet"}</span>
            ${E?.last_used_at?`<span>Last used ${new Date(E.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${w?`
            <div class="qr-preview">${D?t(P):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(_||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${D?"":"disabled-link"}" href="${n(_||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(_)}" type="button" ${D?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${D?"":"disabled-link"}" href="${n(P||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${b?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(E.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(E.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:E?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${b?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(E.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(E.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(C.id)}" type="button" ${u()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:m,publicRequestQrPage:p,loadingRequestForm:h,publicRequestForm:v,publicRequestError:y,publicRequestSuccess:k,publicRequestLinkManager:q,publicRequestLocationCard:S}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof qt<"u"&&(qt.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(s){return String(s||"").replace(/\/+$/,"")}function n(s=l.location,d=l.PUBLIC_APP_URL){if(d)return`${e(d)}/`;let f=s?.origin||"",o=s?.pathname||"/",m=o.indexOf("/auth/callback");if(m>=0)return`${f}${o.slice(0,m+1)}`;let p=o.endsWith("/")?o:o.replace(/[^/]*$/,"");return`${f}${p||"/"}`}function t(s=l.location,d=l.PUBLIC_APP_URL){return`${n(s,d)}auth/callback/`}function a(s={},d=l.location,f=l.PUBLIC_APP_URL){let o=new URL(n(d,f));return Object.entries(s).forEach(([g,m])=>{m!=null&&m!==""&&o.searchParams.set(g,m)}),o.href}function i(s){let d=new URL(s),f=new URLSearchParams(d.hash.replace(/^#/,"")),o=d.searchParams;return{code:o.get("code")||"",type:f.get("type")||o.get("type")||"",accessToken:f.get("access_token")||o.get("access_token")||"",refreshToken:f.get("refresh_token")||o.get("refresh_token")||"",error:f.get("error")||o.get("error")||"",errorCode:f.get("error_code")||o.get("error_code")||"",errorDescription:f.get("error_description")||o.get("error_description")||""}}function u(s){return!!(s?.code||s?.accessToken&&s?.refreshToken||s?.error||s?.errorDescription)}function r(s){return s?.type==="recovery"||!s?.type&&!!(s?.accessToken&&s?.refreshToken)}function c(s=l.location){let d=new URL(s.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>d.searchParams.delete(f)),d.hash="",d.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:a,authParamsFromHref:i,isAuthCallbackParams:u,isPasswordRecoveryParams:r,cleanAuthUrl:c}})(window);var _e="maintainops.equipmentCreateDraft.v1:",Ct=new Set(["name","asset_code","asset_tag","manufacturer","model","location_existing","location_new","asset_type","parent_asset_id","location_id","safety_devices_required"]);function At(l){return Fe({...l,selector:"#create-asset-form, [data-create-pm-form], #create-procedure-form, [data-add-step]",getFormKey:e=>e.id==="create-asset-form"?"":e.dataset.addStep?`:step:${e.dataset.addStep}`:e.hasAttribute("data-create-pm-form")?`:pm:${e.dataset.equipmentPmForm||"new"}`:":procedure",fieldNames:[...Ct,"title","asset_id","frequency","next_due_at","procedure_template_id","description","prompt","response_type","required"]})}function Fe({documentRef:l=document,getScope:e,storage:n=()=>sessionStorage,now:t=Date.now,selector:a="#create-asset-form",getFormKey:i=()=>"",fieldNames:u=Ct}){let r=new Map,c=new Set(u),s,d=()=>[...l.querySelectorAll(a)],f=E=>e()?e()+i(E):"",o=E=>d().find(w=>w.dataset.equipmentScope===E),g=E=>[...E.querySelectorAll("[name]")].filter(w=>c.has(w.name)&&!["file","hidden"].includes(w.type)),m=E=>g(E).map(w=>[w.name,w.type==="checkbox"?w.checked:w.value]);function p(E){r.delete(E);try{n().removeItem(_e+E)}catch{}}function h(E){try{let b=n().getItem(_e+E);!r.has(E)&&b&&b.length<1e5&&r.set(E,JSON.parse(b))}catch{}let w=r.get(E);return!w||!Number.isFinite(w.at)||w.at>t()||t()-w.at>864e5||!Array.isArray(w.fields)||!w.fields.every(b=>Array.isArray(b)&&c.has(b[0])&&(b[0]==="safety_devices_required"?typeof b[1]=="boolean":typeof b[1]=="string"))?(p(E),null):w}function v(E){let w=E?.dataset.equipmentScope;if(!w||w!==f(E))return;let b={at:t(),fields:m(E)};r.set(w,b);try{n().setItem(_e+w,JSON.stringify(b))}catch{}return{scope:w,fields:JSON.stringify(b.fields)}}function y(){let E=l.activeElement,w=d();for(let _ of w)_.dataset.equipmentDirty&&v(_);let b=w.find(_=>_.contains(E)),P=b?E.getBoundingClientRect():null;s=P&&b.dataset.equipmentScope===f(b)&&P.bottom>0&&P.top<l.defaultView.innerHeight?{scope:f(b),name:E.name,start:E.selectionStart,end:E.selectionEnd}:null}function k(){for(let E of d())q(E);s=null}function q(E){let w=f(E);if(!w)return;E.dataset.equipmentScope=w;let b=h(w);if(b){for(let[_,D]of b.fields){let R=g(E).find(W=>W.name===_);R&&(R.type==="checkbox"?R.checked=D:(R.value=D,R.tagName==="SELECT"&&![...R.options].some(W=>W.value===D)&&R.setCustomValidity("Choose an available option.")))}E.dataset.equipmentDirty="true"}let P=s?.scope===w&&g(E).find(_=>_.name===s.name);P&&(s.start!=null&&P.setSelectionRange(s.start,s.end),P.focus({preventScroll:!0}))}function S(E){if(!E||JSON.stringify(h(E.scope)?.fields)!==E.fields)return;let w=o(E.scope);if(w?.dataset.equipmentScope===E.scope&&JSON.stringify(m(w))!==E.fields){v(w);return}p(E.scope),w?.dataset.equipmentScope===E.scope&&w.reset()}function C(){r.clear(),s=null;try{let E=n();for(let w=E.length-1;w>=0;w--)(E.key(w)?.startsWith(_e)||E.key(w)?.startsWith("maintainops.checklistResponseDraft.v1:"))&&E.removeItem(E.key(w))}catch{}}for(let E of["input","change"])l.addEventListener(E,w=>{let b=w.target.form;!b?.matches(a)||!c.has(w.target.name)||(w.target.setCustomValidity(""),b.dataset.equipmentDirty="true",v(b))});return l.addEventListener("reset",E=>{let w=E.target;!w.matches(a)||w.dataset.equipmentScope!==f(w)||(p(w.dataset.equipmentScope),delete w.dataset.equipmentDirty,g(w).forEach(b=>b.setCustomValidity("")))}),l.defaultView.addEventListener("pagehide",y),l.addEventListener("visibilitychange",()=>{l.hidden&&y()}),{capture:y,restore:k,snapshot:v,clear:S,reset:C}}function Pt({getScope:l,getCompanyId:e,client:n,applyResults:t}){let a,i=new Set,u=new Map;function r(){let s=l();return a!==s&&(a=s,i.clear(),u.clear()),s}async function c(s){if(!s.length)return;let d=r(),f=e(),o=[],g={},m=new Set,p;s.forEach(v=>u.set(v,g));let h=()=>s.filter(v=>u.get(v)===g);try{for(;;){let{data:y,count:k,error:q}=await n().from("work_order_step_results").select("*",{count:"exact"}).eq("company_id",f).in("work_order_id",s).order("id").range(o.length,o.length+999);if(d!==r())return;if(q)throw q;if(!Number.isInteger(k)||k<0)throw Error("Checklist result count unavailable.");if(p!==void 0&&p!==k)throw Error("Checklist results changed while loading.");if(p=k,!Array.isArray(y)||o.length+y.length>k)throw Error("Checklist result page invalid.");for(let S of y){if(!S.id||m.has(S.id)||!s.includes(S.work_order_id))throw Error("Checklist result page invalid.");m.add(S.id)}if(o.push(...y||[]),o.length>=k)break;if(!y?.length)throw Error("Checklist results were incomplete.")}let v=h();v.forEach(y=>i.delete(y)),v.length&&t(v,o.filter(y=>v.includes(y.work_order_id)))}catch(v){throw d===r()&&h().forEach(y=>i.add(y)),v}}return{load:c,hasError(s){return r(),i.has(s)}}}async function Et(l,e,n=()=>""){let t=[],a=new Set,i,u=r=>({data:[],error:{code:"INCOMPLETE_WORKSPACE_DATA",message:`${l} could not be fully loaded: ${r} Refresh and try again.`}});try{for(;;){let r=await e().range(t.length,t.length+999);if(r.error)return{...r,data:[]};if(!Number.isSafeInteger(r.count)||r.count<0)return u("the exact row count is unavailable.");if(!Array.isArray(r.data))return u("the server returned an invalid page.");if(i===void 0&&(i=r.count),r.count!==i)return u("records changed while loading.");if(t.length+r.data.length>i||r.data.length>1e3)return u("the page does not match its row count.");if(!r.data.length&&t.length<i)return u(`only ${t.length} of ${i} records arrived.`);for(let c of r.data){if(!c?.id||a.has(c.id))return u("a page contained missing or repeated record IDs.");let s=n(c);if(s)return u(s);a.add(c.id)}if(t.push(...r.data),t.length===i)return{...r,data:t}}}catch(r){return{data:[],error:r}}}function Rt(l){let e=l.procedure_step_count?.[0]?.count,n=l.procedure_steps;return!Number.isSafeInteger(e)||e<0||!Array.isArray(n)?`the step count for procedure ${l.id} is unavailable.`:n.length!==e||new Set(n.map(t=>t?.id)).size!==e||n.some(t=>!t?.id)?`procedure ${l.id} returned ${n.length} of ${e} steps; the embedded checklist may be capped.`:""}(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","traveling_machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l(w){return String(w||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(w){return w.toISOString().slice(0,10)}function n(w){return w.toISOString()}function t(w){let b=new Date;return b.setDate(b.getDate()-w),b}function a(){let w=new Date;return new Date(w.getFullYear(),w.getMonth(),1)}function i(w=new Date){let b=new Date(w);b.setHours(0,0,0,0),b.setDate(b.getDate()-b.getDay());let P=new Date(b);return P.setDate(P.getDate()+7),{start:b,end:P}}function u(w,b){let P=[];for(let _=0;_<w.length;_+=b)P.push(w.slice(_,_+b));return P}function r(w){return c(w).replace(/\.[^/.]+$/,"")||"photo"}function c(w){return String(w||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function s(w){return w==="active"||w==="all"?"Active":w==="overdue"?"Overdue":w==="completed"?"All Completed":w==="completed_month"?"Completed Month":w==="completed_week"?"Done This Week":w==="open"?"New":String(w||"").replaceAll("_"," ").replace(/\b\w/g,b=>b.toUpperCase())}function d(w){let b=String(w||"corrective").trim().toLowerCase();return b==="inspection"?"preventive":b==="reactive"||b==="request"?"corrective":["corrective","preventive","fabrication"].includes(b)?b:"corrective"}function f(w){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[d(w)]}function o(w){let b=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],P=String(w||"technician").trim().toLowerCase();return P==="member"?"technician":b.includes(P)?P:"technician"}function g(w){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[o(w)]||"Technician"}function m(w){let b={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return b[o(w)]||b.technician}function p(w){return new Date(`${w}T00:00:00`).toLocaleDateString()}function h(w){let b=[new Date(w.created_at).toLocaleString()];return w.file_size_bytes&&b.push(y(w.file_size_bytes)),w.original_size_bytes&&w.file_size_bytes&&w.original_size_bytes!==w.file_size_bytes&&b.push(`optimized from ${y(w.original_size_bytes)}`),b.join(" - ")}function v(w){let b=[];return(w.photo_uploaded_at||w.updated_at||w.created_at)&&b.push(new Date(w.photo_uploaded_at||w.updated_at||w.created_at).toLocaleString()),w.photo_file_size_bytes&&b.push(y(w.photo_file_size_bytes)),w.photo_original_size_bytes&&w.photo_file_size_bytes&&w.photo_original_size_bytes!==w.photo_file_size_bytes&&b.push(`optimized from ${y(w.photo_original_size_bytes)}`),b.join(" - ")||"Photo attached"}function y(w){let b=Number(w)||0;return b?b<1024?`${b} B`:b<1048576?`${Math.round(b/1024)} KB`:`${(b/1048576).toFixed(b>=10485760?0:1)} MB`:""}function k(w){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(w)||0)}function q(w){return Number(w.unit_cost_at_use??w.parts?.unit_cost??0)||0}function S(w){if(!w.due_at||w.status==="completed")return null;let b=new Date;b.setHours(0,0,0,0);let P=new Date(`${w.due_at}T00:00:00`),_=Math.round((P-b)/864e5);return _<0?{label:"overdue",className:"overdue"}:_===0?{label:"due today",className:"due_today"}:null}function C(){let w=new Date;return w.setHours(0,0,0,0),w}function E(w){return`"${String(w??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:a,sundayWeekRange:i,chunkArray:u,fileBaseName:r,safeFileName:c,statusLabel:s,normalizeWorkOrderType:d,workOrderTypeLabel:f,normalizeRole:o,roleLabel:g,roleDescription:m,formatDate:p,photoMetaText:h,requestPhotoMetaText:v,formatBytes:y,money:k,partUsageUnitCost:q,getDueState:S,startOfToday:C,csvCell:E})})();(function(){function l(i,u){let r=i?.message||"";return u.some(c=>r.includes(c))}function e(i,u){let r=i?.message||"";return r.includes(u)&&(r.includes("column")||r.includes("schema cache"))}function n(i){let u=i?.message||"";return u.includes("work_order_comments_company_author_profile_fkey")||u.includes("profiles")}function t(i){let u=i?.message||"";return!!(u.includes("procedure_template_id")||u.includes("procedure_templates")||u.includes("procedure_steps"))}function a(i){return l(i,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:a}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let a,i=new Promise((u,r)=>{a=setTimeout(()=>r(new Error(n)),t)});return Promise.race([e,i]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var ea=N(Wt()),ta=N(Ot());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function a(f){return u(`?request=${encodeURIComponent(f)}`)}function i(f){return u(`?qr=${encodeURIComponent(f)}`)}function u(f){let o=r();if(!o)return"";let g=new URL(o);return g.search=f,g.hash="",g.toString()}function r(){let o=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return o?c(o):""}function c(f){try{let o=new URL(String(f||"").trim(),n.location.href);return o.protocol!=="https:"||!s(o.hostname)?"":(o.search="",o.hash="",o.pathname&&o.pathname!=="/"&&!o.pathname.endsWith("/")&&!o.pathname.endsWith(".html")&&(o.pathname=`${o.pathname}/`),o.toString())}catch{return""}}function s(f){let o=String(f||"").toLowerCase();return!(!o||o==="localhost"||o.endsWith(".localhost")||o==="127.0.0.1"||o==="::1"||o==="[::1]"||/^10\./.test(o)||/^192\.168\./.test(o)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(o))}function d(f,o=4){if(!n.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let g=n.qrcode(0,"M");return g.addData(f),g.make(),g.createSvgTag(o,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:i,publicAppUrlWithSearch:u,publicAppBaseUrl:r,normalizePublicAppUrl:c,isPublicAppHost:s,qrSvgFor:d}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),a=n.querySelector("#print-public-qr");!a||typeof t!="function"||a.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(t){if(typeof t!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(t)||t.startsWith("0000"))return null;let a=new Date(`${t}T00:00:00Z`);return Number.isFinite(a.getTime())&&a.toISOString().slice(0,10)===t?a:null}function e(t){return l(t)?new Date(`${t}T00:00:00`):null}function n(t,a){let i=l(t);if(!i)throw new RangeError("PM due date must be a valid YYYY-MM-DD date.");if(!["weekly","monthly","quarterly"].includes(a))throw new RangeError("PM frequency must be weekly, monthly, or quarterly.");if(a==="weekly")i.setUTCDate(i.getUTCDate()+7);else{let u=i.getUTCDate();i.setUTCDate(1),i.setUTCMonth(i.getUTCMonth()+(a==="monthly"?1:3));let r=new Date(i);r.setUTCMonth(r.getUTCMonth()+1,0),i.setUTCDate(Math.min(u,r.getUTCDate()))}if(i.getUTCFullYear()>9999)throw new RangeError("PM next due date is outside the supported date range.");return i.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={localDateOnly:e,nextDueDate:n}})();var oa=N(xt()),ia=N(Mt());(function(){function l(e){function n(s){return e[s]()}function t(s,d){return typeof e[s]=="function"?e[s]():d}function a(s){let d=n("searchQuery"),f=n("activeSection"),o=n("activeStatusFilter"),g=!!d.trim();return c(i(s,{statusFilter:g?"__any__":f==="work"&&o==="requests"?"__none__":o,section:f,includeQueue:!g,includeSearch:!0}))}function i(s,d={}){let f=d.section||n("activeSection"),o=s.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(o=o.eq("location_id",n("activeLocationId"))),d.includeQueue!==!1&&(o=u(o,f)),d.includeAttributeFilters!==!1&&f==="work"){let g=t("workOrderTypeFilter","all"),m=t("workOrderPriorityFilter","all");g!=="all"&&(o=o.eq("type",g)),m!=="all"&&(o=o.eq("priority",m))}if(o=r(o,d.statusFilter||n("activeStatusFilter")),d.includeSearch!==!1){let g=e.postgrestSearchTerm(n("searchQuery"));if(g){let m=n("workOrderRelatedSearch"),p=[`title.ilike.%${g}%`,`description.ilike.%${g}%`,`production_action.ilike.%${g}%`,`priority.ilike.%${g}%`,`type.ilike.%${g}%`,`status.ilike.%${g}%`,...m.assetIds.length?[`asset_id.in.(${m.assetIds.join(",")})`]:[],...m.procedureIds.length?[`procedure_template_id.in.(${m.procedureIds.join(",")})`]:[],...m.workOrderIds.length?[`id.in.(${m.workOrderIds.join(",")})`]:[]];o=o.or(p.join(","))}}return o}function u(s,d){if(d==="mywork"){let f=n("session").user.id;return n("myWorkFilter")==="created"?s.eq("created_by",f):s.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}if(d!=="work")return s;if(n("workOrderAssigneeFilter")){let f=n("workOrderAssigneeFilter");return s.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?s.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?s.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?s.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):s}function r(s,d){let f=e.isoDate(e.startOfToday());if(d==="__any__")return s;if(d==="__none__")return s.eq("id","00000000-0000-0000-0000-000000000000");if(d==="overdue")return s.neq("status","completed").lt("due_at",f);if(d==="completed_month")return s.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(d==="completed_week"){let o=e.sundayWeekRange();return s.gte("completed_at",e.isoDateTime(o.start)).lt("completed_at",e.isoDateTime(o.end))}return d==="active"||d==="all"?s.neq("status","completed"):s.eq("status",d)}function c(s){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?s.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?s.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?s.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?s.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?s.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):s.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:i,applyWorkOrderQueueFilters:u,applyWorkOrderStatusFilter:r,applyWorkOrderSort:c}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let i=n.querySelector(`#${a.dataset.jumpWorkSection}`);if(!i)return;let u=i.closest("details");u&&(u.open=!0),i.scrollIntoView({behavior:"smooth",block:"center"});let r=i;r.classList.add("jump-highlight","field-jump-highlight"),t(()=>r.classList.remove("jump-highlight"),1400),t(()=>r.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,i=e.renderWorkspace,u=e.setWorkOrderSearchMode;if(!a||!i||!u)return;let r=()=>{a.setSearchQuery(""),u(!1),t.setItem("maintainops.searchQuery","")},c=s=>{a.setActiveSection(s),t.setItem("maintainops.activeSection",s)};n.querySelectorAll("[data-search-work-order]").forEach(s=>{s.addEventListener("click",()=>{a.setActiveWorkOrderId(s.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),c("work"),r(),i()})}),n.querySelectorAll("[data-search-asset]").forEach(s=>{s.addEventListener("click",()=>{a.setActiveAssetId(s.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),c("assets"),r(),i()})}),n.querySelectorAll("[data-search-part]").forEach(s=>{s.addEventListener("click",()=>{a.setActivePartId(s.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),c("parts"),r(),i()})}),n.querySelectorAll("[data-search-request]").forEach(s=>{s.addEventListener("click",()=>{c("requests"),r(),i()})}),n.querySelectorAll("[data-search-section]").forEach(s=>{s.addEventListener("click",()=>{c(s.dataset.searchSection),r(),i()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(a={}){let i=a.documentRef||document,u=a.storage||localStorage,r=a.state,c=a.windowRef||(typeof window<"u"?window:null),s=a.setTimeoutRef||setTimeout,d=a.clearTimeoutRef||clearTimeout,f=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!r)return;let o=()=>{e+=1,l!==null&&(d(l),l=null)},g=p=>{p&&typeof c?.scrollTo=="function"&&c.scrollTo(p.x,p.y)},m=(p,h,v,y)=>{let k=i.getElementById?i.getElementById(p):i.querySelector(`#${p}`);if(!k)return;let q=k.value.length,S=Math.min(h??q,q),C=Math.min(v??S,q);k.focus({preventScroll:!0}),k.setSelectionRange(S,C),g(y)};i.querySelectorAll(".workspace-search-input").forEach(p=>{p.addEventListener("input",()=>{let h=p.id,v=p.selectionStart,y=p.selectionEnd;o();let k=e;r.setSearchQuery(p.value),a.invalidateExactWorkOrderSearchCache(),r.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),r.getSearchQuery().trim()&&(r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setQuickFixMode(!1),r.setCreateWorkOrderMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)),u.setItem("maintainops.searchQuery",r.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),l=s(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(k!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),k!==e))return;let q=c?{x:Number(c.scrollX||c.pageXOffset||0),y:Number(c.scrollY||c.pageYOffset||0)}:null,S=i.getElementById?i.getElementById(h):i.querySelector(`#${h}`),C=!("activeElement"in i)||i.activeElement===S;a.renderWorkspace(),C?m(h,v,y,q):g(q)}),n),f)})}),i.querySelectorAll("[data-view-work-search]").forEach(p=>{p.addEventListener("click",async()=>{o(),r.setActiveSection("work"),r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),u.setItem("maintainops.activeSection",r.getActiveSection()),await a.reloadWorkOrderQueue()})}),i.querySelectorAll("[data-close-work-search]").forEach(p=>{p.addEventListener("click",async()=>{o(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function i(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}async function u(r){let c=Number(a?.scrollY??a?.pageYOffset??0);if(await r(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>i(c));return}i(c)}}n.querySelectorAll("[data-status-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(r.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setMyWorkFilter(r.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkOrderFilter(r.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setActiveStatusFilter(r.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{let c=r.value||"all";t.setWorkOrderFilter(c),c!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{let c=r.value||"";t.setWorkOrderAssigneeFilter(c),c&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkOrderTypeFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkOrderPriorityFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkSort(r.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkSort(r.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkGroup(r.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{t.setWorkOrderAssigneeFilter(r.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(r=>{r.addEventListener("click",async()=>{r.disabled||await u(async()=>{t.setRequestViewFilter(r.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(r.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setPartsPage(t.getPartsPage()+(r.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setAssetsPage(t.getAssetsPage()+(r.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{t.setFinancialPage(t.getFinancialPage()+(r.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(r=>{r.addEventListener("change",async()=>{await u(async()=>{r.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(r.value),r.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(r.value),r.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(r.value),r.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(r.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(r=>{r.addEventListener("click",async()=>{await u(async()=>{let c=r.dataset.pageDirection==="next"?1:-1;if(r.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+c),await e.reloadRequestQueue();return}if(r.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+c),r.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+c),r.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+c),r.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+c),r.dataset.listPage?.startsWith("planning-")){let s=r.dataset.listPage.replace("planning-","");t.setPlanningPage(s,t.getPlanningPage(s)+c)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(r=>{r.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(r.dataset.planningGroup,!!r.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,i=e.windowRef||(typeof window<"u"?window:null),u=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let r=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function c(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function s(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function d(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function f(){e.renderWorkspace()}function o(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function g(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function m(){if(i&&typeof i.requestAnimationFrame=="function"){i.requestAnimationFrame(g);return}g()}let p=n.querySelector("#back-to-my-work");p&&p.addEventListener("click",async()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),o(),r(),typeof e.returnToWorkOrderQueue=="function"?await e.returnToWorkOrderQueue():e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),o(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.id),a.setActiveAssetId(null),o(),r(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation(),a.setActiveWorkOrderId(y.dataset.workPhotoJump),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",k=>{k.stopPropagation(),a.setActiveAssetId(y.dataset.openAsset),a.setActiveWorkOrderId(null),o(),r(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),u()})}),n.querySelectorAll(".asset-card[data-asset-id]").forEach(y=>{let k=()=>{a.setActiveAssetId(y.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),o(),r(),a.setReportIssueMode(!1),a.setActiveSection("assets"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),u()};y.addEventListener("click",k),y.addEventListener("keydown",q=>{q.key!=="Enter"&&q.key!==" "||(q.preventDefault(),k())})});let v=0;n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",async()=>{if(typeof e.openLinkedWorkOrder=="function"){let k=++v,q=()=>k===v;o();try{await e.openLinkedWorkOrder(y.dataset.miniWorkOrder,{isCurrent:q})&&u()}catch(S){q()&&e.showNotice?.(`Could not open work order: ${S.message||S}`,"warning")}return}a.setActiveWorkOrderId(y.dataset.miniWorkOrder),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),u()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{let k=y.open;y.addEventListener("toggle",async()=>{if(y.open===k)return;k=y.open;let q=y.dataset.assetId,S=y.dataset.assetRelationshipSection;if(!(!q||!S)&&(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(q,S,y.open),!!y.open)){if(d(S)){let C=y.querySelector?.(".mini-list");C&&(C.textContent="Loading work history..."),await c(q)}else if(S==="asset-history")await s(q);else return;y.isConnected===!1||!y.open||f()}}),y.open&&d(y.dataset.assetRelationshipSection)&&e.getAssetWorkHistory?.(y.dataset.assetId)?.historyStatus==="idle"&&c(y.dataset.assetId).then(()=>{y.isConnected!==!1&&y.open&&f()})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let q=y.dataset.assetId,S=y.dataset.assetRelationSection,E=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(q,S):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(q,S,E),f()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async k=>{k.preventDefault(),k.stopPropagation();let q=y.dataset.openAssetHistory;q&&(a.setActiveAssetId(q),a.setActiveWorkOrderId(null),r(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(q),await s(q),e.renderWorkspace(),u())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let q=y.dataset.backAssetHistory;q&&a.setActiveAssetId(q),o(),e.renderWorkspace(),u()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let q=y.dataset.assetId,C=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(q,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(q,"asset-history",C),e.renderWorkspace(),u()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function i(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}function u(){let r=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>i(r));return}i(r)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(r=>{r.addEventListener("click",()=>{t.setPartInventoryFilter(r.dataset.partInventoryFilter),e.resetPartsPage(),u()})}),n.querySelectorAll("[data-part-sort]").forEach(r=>{r.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(r.value||"default"),e.resetPartsPage(),u())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(r=>{r.addEventListener("click",()=>{let c=t.getAssetStatusFilter()===r.dataset.assetStatusFilter?"all":r.dataset.assetStatusFilter;t.setAssetStatusFilter(c),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),u()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(r=>{r.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let c=t.getAssetTypeFilter()===r.dataset.assetTypeFilter?"all":r.dataset.assetTypeFilter;t.setAssetTypeFilter(c),t.setAssetAreaFilter&&t.setAssetAreaFilter("all"),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),u()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(r=>{r.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(r.value||"all"),e.resetAssetsPage(),u())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation();let i=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=i)}catch(u){e.showNotice(`Could not update status: ${u.message||u}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=i)}t.isConnected&&(t.disabled=!1,t.textContent=i)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",a=>a.stopPropagation()),t.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var ha=N(Dt()),ya=N(Tt());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(i=>{i.addEventListener("click",async()=>{let u=e.getWorkOrderById(i.dataset.id);if(!u)return;let r=i.dataset.copyDowntime==="subject",c=r?e.downtimeEmailSubject(u):e.downtimeEmailBody(u),s=await e.copyTextToClipboard(c);i.textContent=s?"Copied":"Copy failed",a(()=>{i.textContent=r?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var wa=N(It());(function(){function l(e={}){let n=e.documentRef||document,t=new Set;function a(r){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(r),e.renderWorkspace()}async function i(r){if(!t.has(r)){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}t.add(r);try{let c=e.removeWorkOrderDocuments?await e.removeWorkOrderDocuments(r):null,s=e.getPhotoPathsByWorkOrder(r),{error:d,data:f}=await e.withOperationTimeout(e.deleteWorkOrderRecord(r),"Work order delete timed out. Check your connection and try again.",15e3);if(d){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(d)}`);return}if(!Array.isArray(f)||!f.some(g=>g.id===r)){e.alertRef("Work order deletion was not confirmed. No attached files were removed.");return}let o=!1;try{if(c&&await c(),s.length){let g=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(s),"Work order photo cleanup timed out.",15e3);if(g.error)throw g.error}}catch(g){o=!0,e.warnRef("Deleted work order storage cleanup failed",g)}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice(o?"Work order deleted, but some stored files could not be removed. Report this for storage cleanup.":"Work order deleted.",o?"warning":"success"),await e.render()}catch(c){e.alertRef(`Could not delete work order: ${c.message||c}`)}finally{t.delete(r)}}}function u(){n.querySelectorAll("[data-delete-work-order]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation(),a(r.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(r=>{r.addEventListener("click",async c=>{c.stopPropagation(),await i(r.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:u,deleteWorkOrder:i,requestDeleteWorkOrder:a}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace;if(!t||typeof a!="function")return;let i=0;async function u(r){let c=++i,s=()=>c===i&&r.isConnected!==!1;try{if(e.loadPartDetail&&await e.loadPartDetail(r.dataset.openPart,{isCurrent:s})===!1||!s())return;t.setActivePartId(r.dataset.openPart),a()}catch(d){s()&&e.showNotice?.(`Could not open part: ${d.message||d}`,"warning")}}n.querySelectorAll("[data-open-part]").forEach(r=>{r.addEventListener("click",()=>u(r)),r.addEventListener("keydown",c=>{c.key!=="Enter"&&c.key!==" "||(c.preventDefault(),u(r))})}),n.querySelectorAll("[data-close-part-detail]").forEach(r=>{r.addEventListener("click",()=>{i++,t.setActivePartId(null),t.setShowPartSourceManager(!1),a()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(r=>{r.addEventListener("click",()=>{i++,t.setShowPartSourceManager(!t.getShowPartSourceManager()),a()})})}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,i=e.messageComposerScopeNote,u=e.autoGrowTextarea;if(!t||typeof a!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(f=>f.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(f=>f.addEventListener("click",()=>e.setMessageView?.(f.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(f=>f.addEventListener("click",()=>e.quoteMessage?.(f.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(f=>f.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async f=>{f.currentTarget.disabled=!0;let o=f.currentTarget;try{await e.loadOlderMessages?.()}finally{o.isConnected&&(o.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let o=f.dataset.messageFilter;t.setMessageThreadFilter(o),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageThreadFilter",o),r.setItem("maintainops.messageThreadsPage","1"),a()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(f.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),r.setItem("maintainops.activeSection","work"),a()})});let c=n.querySelector("[data-clear-message-work-link]");c&&c.addEventListener("click",()=>{let f=n.querySelector('#message-thread-form [name="work_order_id"]');f&&(f.value=""),t.setMessageComposerWorkOrderId(""),r.setItem("maintainops.messageComposerWorkOrderId",""),a()});let s=n.querySelector("#message-search");s&&s.addEventListener("input",()=>{let f=s.value;t.setMessageSearchQuery(f),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageSearchQuery",f),r.setItem("maintainops.messageThreadsPage","1"),a();let o=n.querySelector("#message-search");o&&(o.focus({preventScroll:!0}),o.selectionStart!=null&&o.setSelectionRange(s.selectionStart,s.selectionEnd))});let d=n.querySelector("#message-thread-form");if(d){let f=d.querySelector("#message-thread-type"),o=d.querySelector(".message-direct-field"),g=d.querySelector("#message-scope-note");if(f&&o&&g&&typeof i=="function"){let m=()=>{let p=f.value==="direct";o.classList.toggle("hidden-section",!p);let h=o.querySelector("select");h&&(h.disabled=!p,h.required=p);let v=d.querySelector("[name='title']");v&&(v.required=!p),g.textContent=i(f.value),e.showExistingConversation?.(p?h?.value:"")};f.addEventListener("change",m),o.querySelector("select")?.addEventListener("change",m),m()}}n.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let o=n.querySelector("#message-thread-form");if(!o)return;let g=o.querySelector("details"),m=o.querySelector("#message-thread-type"),p=o.querySelector("select[name='direct_user_id']"),h=o.querySelector(".message-direct-field"),v=o.querySelector("#message-scope-note"),y=o.querySelector("input[name='title']");g&&(g.open=!0),m&&(m.value="direct"),p&&(p.value=f.dataset.messagePerson||"",p.disabled=!1),h&&h.classList.remove("hidden-section"),v&&typeof i=="function"&&(v.textContent=i("direct")),y&&y.focus(),p?.dispatchEvent(new Event("change",{bubbles:!0}))})}),n.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let g=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!g)return;let m=g.value.trim();g.value=m?`${m}
${f.dataset.quickReply}`:f.dataset.quickReply,g.dispatchEvent(new Event("input",{bubbles:!0})),g.focus(),typeof u=="function"&&u(g)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,i=e.resetPartsPage;if(!t||typeof a!="function"||typeof i!="function")return;let u=n.querySelector("#part-search-form");if(!u)return;let r=s=>{t.setPartSearchQuery(s||""),i(),a()},c=u.querySelector("input[name='part_search']");c&&c.addEventListener("input",()=>{r(c.value||"");let s=n.querySelector("#part-search");if(!s)return;s.focus();let d=s.value.length;s.setSelectionRange(d,d)}),u.addEventListener("submit",s=>{s.preventDefault();let d=e.FormDataRef||FormData,f=new d(u).get("part_search")||"";r(f),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,i=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(u=>{u.addEventListener("click",async()=>{let r=performance.now(),c=u.dataset.section;e.visibleNavItems().some(([s])=>s===c)&&(t.setActiveSection(c),c==="messages"&&e.openMessageHome?.(),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),c!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",c),e.renderWorkspace(),i(),c==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(c)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(c==="work"||c==="mywork")&&await e.reloadWorkOrderQueue(),c==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),c==="requests"&&await e.reloadRequestQueue(),c==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),c==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),c==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),c==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(c,r))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;async function i(u){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(u),e.getActiveThreadId&&e.getActiveThreadId()!==u||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(u),(!e.getActiveThreadId||e.getActiveThreadId()===u)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==u)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(u=>{u.addEventListener("click",async()=>{let r=u.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(r),a.setItem("maintainops.activeMessageThreadId",r),await i(r)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(u=>{u.addEventListener("click",async()=>{let r=u.dataset.openWorkMessageThread;t.setActiveMessageThreadId(r),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",r),a.setItem("maintainops.activeSection","messages"),await i(r)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(i=>{i.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(i=>{i.addEventListener("click",()=>{i.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(i=>{i.addEventListener("click",()=>{let u=i.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(u),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",u),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(i=>{i.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(i=>{i.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",async()=>{if(t.disabled)return;t.disabled=!0;let a=t.textContent;t.textContent="Exporting...";try{await e.exportActiveSectionCsv()}finally{t.disabled=!1,t.textContent=a}})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var Da=N(Ft());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async i=>{i&&typeof i.stopPropagation=="function"&&i.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",i=>{i&&typeof i.stopPropagation=="function"&&i.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async i=>{i&&typeof i.stopPropagation=="function"&&i.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(a=>{l(a),a.addEventListener("input",()=>l(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var Ua=N(Lt());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,i=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(u=>{u.addEventListener("click",async()=>{let r=await t(u.dataset.copyTeamInvite||"");u.textContent=r?"Copied":"Copy failed",a(()=>{u.textContent="Copy Invite"},i)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let i=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(u=>{u.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),i.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let i=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(u=>{u.addEventListener("click",()=>{t.setQuickFixAssetId(u.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),i.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var Va=N(Nt());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,i=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(u=>{u.addEventListener("click",async()=>{let r=await t(u.dataset.copyPublicRequestLink);u.textContent=r?"Copied":"Copy failed",a(()=>{u.textContent="Copy QR Link"},i)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ha=N(Ut());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let u=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(a.dataset.createFollowUp,u?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var Za=N(Qt());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,a=n.querySelector("#comment-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,a=n.querySelector("#quick-update-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,a=n.querySelector("#edit-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{t(a),a.addEventListener("change",()=>t(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var ao=N(Bt()),oo=N(jt()),io=N(zt()),so=N(Vt()),co=N(Gt()),lo=N(Ht()),uo=N(Yt()),po=N(Kt()),mo=N(Jt()),fo=N(Zt()),go=N(Xt()),ho=N(en()),yo=N(tn()),vo=N(nn()),bo=N(rn()),wo=N(an()),ko=N(on()),_o=N(sn()),qo=N(cn()),So=N(ln()),$o=N(un()),Co=N(dn());(function(){function l(e){function n(a){return e[a]()}function t(a,i=n("requestViewFilter")){let u=a.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(u=u.eq("location_id",n("activeLocationId"))),i==="converted"?u=u.or("status.eq.converted,converted_work_order_id.not.is.null"):i!=="all"&&(u=u.eq("status","submitted").is("converted_work_order_id",null));let r=e.postgrestSearchTerm(n("searchQuery"));if(r){let c=`%${r}%`,s=n("assets").filter(e.matchesActiveLocation).filter(d=>e.matchesQuery([d.name,d.asset_code,d.asset_tag,d.manufacturer,d.model,d.location,d.status,d.asset_type,e.parentAssetFor()(d)?.name],r)).map(d=>d.id).slice(0,e.SEARCH_ID_PAGE_SIZE);u=u.or([`title.ilike.${c}`,`description.ilike.${c}`,`status.ilike.${c}`,`priority.ilike.${c}`,`requested_by_name.ilike.${c}`,`requested_by_contact.ilike.${c}`,...s.length?[`asset_id.in.(${s.join(",")})`]:[]].join(","))}return u}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(g){return e[g]()}async function t(){let g=n("searchQuery").trim();if(!g||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let m=n("assets").filter(e.matchesActiveLocation).filter(y=>e.matchesQuery([y.name,y.asset_code,y.asset_tag,y.manufacturer,y.model,y.location,y.status,y.asset_type,e.parentAssetFor()(y)?.name],g)).map(y=>y.id),p=n("procedureTemplates").filter(y=>e.matchesQuery([y.name,y.description,...(y.procedure_steps||[]).map(k=>k.prompt)],g)).map(y=>y.id),h=n("parts").filter(e.matchesActiveLocation).filter(y=>e.matchesQuery([y.name,y.sku,y.supplier_name,y.quantity_on_hand,y.reorder_point,y.unit_cost],g)).map(y=>y.id),v=new Set;await Promise.all([a(v,h),i(v,"work_order_comments",["body"],g),i(v,"work_order_events",["event_type","summary"],g),i(v,"work_order_photos",["file_name"],g),i(v,"work_order_step_results",["value"],g)]),e.setWorkOrderRelatedSearch({assetIds:m.slice(0,200),procedureIds:p.slice(0,200),workOrderIds:[...v].slice(0,300)})}async function a(g,m,p={}){if(!m.length)return;let v=p.maxRows??300;for(let y of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE)){if(v<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",y),k=>{k.forEach(q=>{q.work_order_id&&g.add(q.work_order_id)}),v-=k.length},v)}catch(k){e.warn("Part-linked work order search failed",k);return}}}async function i(g,m,p,h,v={}){let y=e.postgrestSearchTerm(h);if(!y)return;let k=p.map(S=>`${S}.ilike.%${y}%`).join(","),q=v.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(m).select("work_order_id").eq("company_id",n("activeCompanyId")).or(k),S=>{S.forEach(C=>{C.work_order_id&&g.add(C.work_order_id)})},q)}catch(S){e.warn(`${m} work order search failed`,S)}}async function u(g={}){let m=await r(),p=m.length,h=Math.max(1,Math.ceil(p/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let v=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,y=m.slice(v,v+e.WORK_ORDERS_PER_PAGE).map(C=>C.id);if(!y.length)return{data:[],error:null,count:p};let k=g.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),q=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:k,ids:y});if(q.error)return q;let S=new Map((q.data||[]).map(C=>[C.id,C]));return{...q,data:y.map(C=>S.get(C)).filter(Boolean),count:p}}async function r(){let g=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),m=n("exactWorkOrderSearchCache");if(m.key===g)return m.rows;let p=n("searchQuery").trim(),h=new Map;await c(h,p);let v=n("assets").filter(e.matchesActiveLocation).filter(C=>e.matchesQuery([C.name,C.asset_code,C.asset_tag,C.manufacturer,C.model,C.location,C.status,C.asset_type,e.parentAssetFor()(C)?.name],p)).map(C=>C.id),y=n("procedureTemplates").filter(C=>e.matchesQuery([C.name,C.description,...(C.procedure_steps||[]).map(E=>E.prompt)],p)).map(C=>C.id),k=n("parts").filter(e.matchesActiveLocation).filter(C=>e.matchesQuery([C.name,C.sku,C.supplier_name,C.quantity_on_hand,C.reorder_point,C.unit_cost],p)).map(C=>C.id);await Promise.all([s(h,"asset_id",v),s(h,"procedure_template_id",y)]);let q=new Set;await Promise.all([a(q,k,{maxRows:1/0}),i(q,"work_order_comments",["body"],p,{maxRows:1/0}),i(q,"work_order_events",["event_type","summary"],p,{maxRows:1/0}),i(q,"work_order_photos",["file_name"],p,{maxRows:1/0}),i(q,"work_order_step_results",["value"],p,{maxRows:1/0})]),await d(h,[...q]);let S=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:g,rows:S}),S}async function c(g,m){let p=e.postgrestSearchTerm(m);if(!p)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(v=>`${v}.ilike.%${p}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),v=>o(g,v))}async function s(g,m,p){if(p.length)for(let h of e.chunkArray(p,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(m,h),v=>o(g,v))}async function d(g,m){if(m.length)for(let p of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",p),h=>o(g,h))}function f(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function o(g,m){(m||[]).forEach(p=>{p?.id&&g.set(p.id,{...g.get(p.id)||{},...p})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:u,exactWorkOrderSearchRows:r,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:i}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(r){return e[r]()}function t(){let r=n("searchQuery").trim(),c=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),s=n("assets").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.asset_code,m.asset_tag,m.manufacturer,m.model,m.location,m.status],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("parts").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.sku,m.supplier_name,m.quantity_on_hand,m.reorder_point],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.title,m.description,m.status,m.priority,m.assets?.name,n("profilesByUserId")[m.requested_by]?.full_name],r)).sort((m,p)=>new Date(p.created_at)-new Date(m.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),o=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.title,m.frequency,m.next_due_at,m.assets?.name],r)).sort((m,p)=>String(m.next_due_at||"").localeCompare(String(p.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),g=n("procedureTemplates").filter(m=>e.matchesQuery([m.name,m.description,...(m.procedure_steps||[]).map(p=>p.prompt)],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:c,assets:s,parts:d,requests:f,pm:o,procedures:g}}function a(r="all"){let c=e.startOfToday(),s=new Date(c);return s.setDate(s.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(d=>d.status!=="completed").filter(d=>e.matchesSearch([d.title,d.description,d.priority,d.status,d.assets?.name,e.assignmentLabel(d)])).filter(d=>r==="no_due"?!d.due_at:!!d.due_at).map(d=>{let f=d.due_at?new Date(`${d.due_at}T00:00:00`):null;return{kind:r==="no_due"?"no_due":"work",id:d.id,title:d.title,priority:d.priority,status:d.status,assetName:d.assets?.name||"No equipment",dueAt:d.due_at,due:f,createdAt:d.created_at||"",assignedTo:e.assignmentLabel(d),workOrder:d}}).filter(d=>r==="no_due"?!0:r==="overdue"?d.due<c:r==="today"?d.due.getTime()===c.getTime():r==="soon"?d.due>c&&d.due<=s:!0).sort((d,f)=>{if(r==="no_due"){let o={critical:4,high:3,medium:2,low:1};return(o[f.priority]||0)-(o[d.priority]||0)||new Date(d.createdAt||0)-new Date(f.createdAt||0)}return d.due-f.due})}function i(){let r=e.startOfToday(),c=new Date(r);return c.setDate(c.getDate()+7),n("preventiveSchedules").filter(s=>s.active!==!1).filter(e.matchesActiveLocation).filter(s=>{let d=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(s.next_due_at);return d&&d>=r&&d<=c}).filter(s=>e.matchesSearch([s.title,s.frequency,s.next_due_at,s.assets?.name])).map(s=>({kind:"pm",id:s.id,title:s.title,assetName:s.assets?.name||"No equipment",dueAt:s.next_due_at,due:window.MaintainOpsMaintenanceScheduleDates.localDateOnly(s.next_due_at)})).sort((s,d)=>s.due-d.due)}function u(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(r=>r.follow_up_needed).filter(r=>e.matchesSearch([r.title,r.description,r.failure_cause,r.resolution_summary,r.assets?.name,r.assigned_profile?.full_name])).map(r=>({kind:"follow_up",id:r.id,title:r.title,assetName:r.assets?.name||"No equipment",completedAt:r.completed_at?new Date(r.completed_at).toLocaleDateString():"not completed",resolution:r.resolution_summary||r.completion_notes||"",workOrder:r})).sort((r,c)=>r.title.localeCompare(c.title))}return{globalSearchResults:t,planningItems:a,planningPmItems:i,followUpItems:u}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,a){return n.from("locations").insert({company_id:t,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(u,r){return u.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",r)}function e(u,r){return u.from("company_members").select("*").eq("company_id",r).order("created_at",{ascending:!0})}function n(u,r){return u.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",r).order("created_at",{ascending:!1})}function t(u,r){return u.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",r).order("created_at",{ascending:!1})}function a(u,r){return u.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",r).order("created_at",{ascending:!1})}function i(u,r){return u.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",r).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:a,listRequestNotificationRecipients:i}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(s,d,f={}){return s.from("work_orders").select(d,f)}function e(s){return s.from("work_orders").select("id",{count:"exact",head:!0})}function n(s,d,f,o){return s.from("work_orders").select(o).eq("company_id",d).eq("id",f).maybeSingle()}async function t(s,d,f){let o=()=>e(s).eq("company_id",d).eq("asset_id",f),[g,m]=await Promise.all([o().neq("status","completed"),o().eq("status","completed")]),p=g.error||m.error;return p?{error:p}:[g.count,m.count].every(h=>Number.isInteger(h)&&h>=0)?{data:{open:g.count,completed:m.count},error:null}:{error:new Error("Equipment work counts are unavailable.")}}async function a(s,d,f,o){let g=[];for(;;){let m=await s.from("work_orders").select(o,{count:"exact"}).eq("company_id",d).eq("asset_id",f).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}).order("id",{ascending:!0}).range(g.length,g.length+999);if(m.error)return m;let p=m.data||[];if(g.push(...p),!p.length||(Number.isInteger(m.count)?g.length>=m.count:p.length<1e3))return{data:g,error:null}}}async function i(s,d){let{companyId:f,locationId:o,locationsReady:g,selectClause:m,ids:p}=d,h=s.from("work_orders").select(m).eq("company_id",f).in("id",p);return g&&o&&(h=h.eq("location_id",o)),h}function u(s,d){let{companyId:f,locationId:o,locationsReady:g}=d,m=s.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",f);return g&&o&&(m=m.eq("location_id",o)),m}function r(s,d){let{companyId:f,locationId:o,locationsReady:g}=d,m=s.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",f).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return g&&o&&(m=m.eq("location_id",o)),m.order("id",{ascending:!0})}async function c(s,d,f=1/0,o=1e3){let g=0,m=0;for(;m<f;){let p=Math.min(o,f-m),{data:h,error:v}=await s().range(g,g+p-1);if(v)throw v;let y=h||[];if(d(y),m+=y.length,y.length<p)break;g+=p}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:a,fetchAssetWorkOrderCounts:t,fetchWorkOrdersByIds:i,scopedWorkOrderSearchQuery:u,scopedTeamWorkloadQuery:r,fetchPagedSearchRows:c}})();var Do=N(pn());(function(){function l(i){return i.rpc("get_my_companies")}function e(i,u){return i.from("company_members").select("company_id, role, default_location_id").eq("user_id",u).order("created_at",{ascending:!0})}function n(i,u){return i.from("company_members").select("company_id, role").eq("user_id",u).order("created_at",{ascending:!0})}function t(i,u){return i.from("companies").select("id, name, logo_path, created_at").in("id",u).order("created_at",{ascending:!0})}function a(i,u){return i.from("companies").select("id, name, created_at").in("id",u).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:a}})();(function(){function l(a,i){return a.from("app_issue_reports").select("*").eq("company_id",i).order("created_at",{ascending:!1})}async function e(a,i){let u=await a.from("app_issue_reports").insert(i);if(u.error?.code!=="23505"||!i.id)return u;let r=await a.from("app_issue_reports").select("*").eq("id",i.id).eq("company_id",i.company_id).eq("reporter_id",i.reporter_id).maybeSingle(),c=["company_id","reporter_id","location_id","screen","page_url","severity","title","details"];return!r.error&&r.data&&c.every(s=>(r.data[s]??null)===(i[s]??null))?{data:r.data,error:null}:u}function n(a,i,u,r){return a.from("app_issue_reports").update({status:r,resolved_at:r==="resolved"?new Date().toISOString():null}).eq("company_id",i).eq("id",u)}function t(a,i,u){return a.from("app_issue_reports").delete().eq("company_id",i).eq("id",u)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,a){return t.from("user_preferences").select(l).eq("user_id",a).maybeSingle()}function n(t,a,i){return t.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(i)?i.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Lo=N(mn()),No=N(fn()),Uo=N(gn()),Qo=N(hn());(function(){function l(t,a,i="neutral"){return`<article class="metric dashboard-card tone-${i}"><span>${t}</span><strong>${a}</strong></article>`}function e(t,a,i,u="neutral"){return`
    <article class="insight dashboard-card tone-${u}">
      <span>${t}</span>
      <strong>${a}</strong>
      <p>${i}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(r=>String(r||"")),i=window.MaintainOpsFormatting?.roleDescription||(()=>""),u=window.MaintainOpsDom?.escapeHtml||(r=>String(r??""));return`
    <section class="team-role-guide">
      ${t.map(r=>`
        <article>
          <strong>${a(r)}</strong>
          <span>${u(i(r))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var jo=N(yn());(function(){function l(f,o,g="active",m={},p){let h=p.getActiveStatusFilter(),v=m.filter||m.section,y=v?"button":"article",k=m.filter&&h===m.filter?" selected":"",q=g.includes("overdue")&&Number(o)>=3,S=q?" alert-blink":"",C=[v?'type="button"':"",m.filter?`data-status-filter="${m.filter}" aria-pressed="${h===m.filter}"`:"",m.section?`data-section="${m.section}"`:""].filter(Boolean).join(" "),E=C?` ${C}`:"";return`
    <${y} class="gauge-readout ${g}${k}${S}"${E}>
      ${q?'<span class="gauge-alert-badge" aria-hidden="true">!</span>':""}
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
  `}function e(f){let o=f.getWorkOrderDashboardCounts()||{},g=o.activeWork||0,m=o.newWork||0,p=o.inProgress||0,h=o.blocked||0,v=o.overdue||0,y=o.completedAll||0,k=o.completedMonth||0,q=o.completedWeek||0,S=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",g,"active",{filter:"active"},f)}
      ${l("New",m,"new",{filter:"open"},f)}
      ${l("In Progress",p,"in_progress",{filter:"in_progress"},f)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${l("Overdue",v,"overdue",{filter:"overdue"},f)}
      ${l("Requests",S,"request",{filter:"requests"},f)}
      ${l("All Completed",y,"completed",{filter:"completed"},f)}
      ${l("Completed Month",k,"completed",{filter:"completed_month"},f)}
      ${l("Done This Week",q,"completed",{filter:"completed_week"},f)}
    </div>
  `}function n(f,o){let g=f||{},m=g.newWork||0,p=g.inProgress||0,h=g.blocked||0,v=g.activeWork??m+p+h,y=g.overdue||0,k=g.completedAll||0,q=g.completedMonth||0,S=g.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",v,"active workload-pill",{filter:"active"},o)}
      ${l("New",m,"new workload-pill",{filter:"open"},o)}
      ${l("In Progress",p,"in_progress workload-pill",{filter:"in_progress"},o)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},o)}
      ${l("Overdue",y,"overdue workload-pill",{filter:"overdue"},o)}
      ${l("All Completed",k,"completed workload-pill",{filter:"completed"},o)}
      ${l("Completed Month",q,"completed workload-pill",{filter:"completed_month"},o)}
      ${l("Done This Week",S,"completed workload-pill",{filter:"completed_week"},o)}
    </div>
  `}function t(f){return f.getWorkOrders().filter(o=>f.getDueState(o)?.className==="overdue")}function a(f){return f.getWorkOrders().filter(o=>i(o,f))}function i(f,o,g=new Date){if(!f.completed_at)return!1;let m=new Date(f.completed_at),p=o.sundayWeekRange(g);return Number.isFinite(m.getTime())&&m>=p.start&&m<p.end}function u(f){return f.getWorkOrders().filter(r)}function r(f){let o=new Date,g=new Date(o.getFullYear(),o.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=g)}function c(f){let o=f.filter(m=>m.status==="completed"&&Number(m.actual_minutes)>0);if(!o.length)return 0;let g=o.reduce((m,p)=>m+Number(p.actual_minutes||0),0);return Math.round(g/o.length)}function s(f){let o=new Date;o.setHours(0,0,0,0);let g=new Date(o);return g.setDate(g.getDate()+7),f.getPreventiveSchedules().filter(m=>{if(m.active===!1)return!1;let p=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(m.next_due_at);return p&&p>=o&&p<=g})}function d(f){return Object.freeze({renderGaugeReadout:(o,g,m="active",p={})=>l(o,g,m,p,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:o=>n(o,f),overdueWorkOrders:()=>t(f),completedThisWeek:()=>a(f),isCompletedThisWeek:(o,g)=>i(o,f,g),completedThisMonth:()=>u(f),isCompletedThisMonth:r,averageCompletionMinutes:(o=f.getWorkOrders())=>c(o),preventiveDueSoon:()=>s(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:d})})();(function(){function l(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",traveling_machine:"Traveling Primary",forklift:"Forklift / Mobile Lift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:a,getPartInventoryFilter:i,assetTypeLabel:u,assetStatusLabel:r}){function c(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function s(){let f=n(),o=t?t():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${r(f).toLowerCase()} equipment found.`:o!=="all"?`No ${u(o).toLowerCase()} equipment found.`:"No equipment added yet."}function d(){return a().trim()?"No parts match this search.":i()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:c,assetEmptyStateText:s,partEmptyStateText:d}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var Yo=N(vn());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:a,getSearchQuery:i}){function u(p){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${m(p)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${r("Work Orders",p.work,c,"work",{showWorkSearchAction:!!i().trim()})}
            ${r("Equipment",p.assets,s,"asset")}
            ${r("Parts",p.parts,d,"parts")}
            ${r("Requests",p.requests,f,"comment")}
            ${r("PM",p.pm,o,"procedure")}
            ${r("Procedure Checklists",p.procedures,g,"procedure")}
          </div>
        </section>
      `}function r(p,h,v,y,k={}){return`
        <section class="global-result-group relationship-detail ${y}">
          <div class="panel-header compact">
            <h3>${e(p)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(v).join("")||'<p class="muted">No matches.</p>'}
            ${k.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function c(p){return`
        <button class="global-result-item" data-search-work-order="${p.id}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${n(p.status)} - ${e(p.assets?.name||"No equipment")} - ${e(t(p))}</span>
        </button>
      `}function s(p){return`
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
      `}function m(p){return Object.values(p).reduce((h,v)=>h+v.length,0)}return{renderGlobalSearchResults:u,renderGlobalResultGroup:r,renderGlobalWorkResult:c,renderGlobalAssetResult:s,renderGlobalPartResult:d,renderGlobalRequestResult:f,renderGlobalPmResult:o,renderGlobalProcedureResult:g,globalResultCount:m}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var Jo=N(bn()),Zo=N(wn()),Xo=N(kn());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:a=(d,f)=>f,renderListPagination:i,statusLabel:u,renderRelationshipChips:r,canEditOperationalRecords:c=()=>!0,getSchedulesReady:s=()=>!0}){function d(m,p,h,v,y={}){let k=n||12,q=typeof t=="function"?t(v):1,S=Math.max(1,Math.ceil(p.length/k)),C=Math.min(Math.max(q,1),S),E=p.slice((C-1)*k,C*k),w=a(v,!!(y.defaultOpen&&p.length));return`
        <details class="planning-group" data-planning-group="${e(v)}" ${w?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(m)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${h}">${p.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${E.map(g).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof i=="function"?i(`planning-${v}`,p.length,C,S):""}
          </div>
        </details>
      `}function f(m,p,h,v=""){return`
        <section class="planning-lane ${v}">
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
            ${s()?d("PM Due Soon",m.pm,"open","pm"):'<p class="error-text" role="alert">PM schedules unavailable.</p>'}
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
            ${c()?`<button class="secondary-button" data-generate-pm="${e(m.id)}" type="button">Generate Work</button>`:""}
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
              ${c()?`
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
      `}return{renderPlanningGroup:d,renderPlanningBoard:o,renderPlanningItem:g}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var ti=N(_n());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:i,getPartsPage:u,getAssetsPage:r}){function c(o,g){if(o<=e)return"";let m=i(),p=(m-1)*e+1,h=Math.min(o,m*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function s(o,g){if(o<=n)return"";let m=u(),p=(m-1)*n+1,h=Math.min(o,m*n);return`
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
      `}function f(o,g,m,p){if(g<=a)return"";let h=(m-1)*a+1,v=Math.min(g,m*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${v} of ${g} - Page ${m} of ${p}</span>
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="next" type="button" ${m>=p?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:c,renderPartsPagination:s,renderAssetsPagination:d,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var ri=N(qn());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:a,matchesActiveLocation:i,isAssetDescendantOf:u,parentAssetFor:r}){function c(m=t()){return n().map(p=>`<option value="${p.id}" ${p.id===m?"selected":""}>${e(p.name)}</option>`).join("")}function s(m){let p=r(m);return p?`${m.name} - part of ${p.name}`:m.name}function d(m=""){let p=a().filter(i).sort((y,k)=>s(y).localeCompare(s(k))),h=m?a().find(y=>y.id===m):null;return(h&&!p.some(y=>y.id===h.id)?[h,...p]:p).map(y=>`<option value="${y.id}" ${y.id===m?"selected":""}>${e(s(y))}</option>`).join("")}function f(m="",p=""){return a().filter(h=>h.asset_type!=="traveling_machine").filter(i).filter(h=>h.id!==p&&!u(h.id,p)).sort((h,v)=>s(h).localeCompare(s(v))).map(h=>`<option value="${h.id}" ${h.id===m?"selected":""}>${e(s(h))}</option>`).join("")}function o(m=""){let p=[...new Set(a().filter(i).map(v=>String(v.location||"").trim()).filter(Boolean))].sort((v,y)=>v.localeCompare(y)),h=String(m||"").trim();return h&&!p.includes(h)?[h,...p]:p}function g(m=""){return o(m).map(p=>`<option value="${e(p)}" ${p===m?"selected":""}>${e(p)}</option>`).join("")}return{renderLocationOptions:c,renderAssetOptions:d,renderParentAssetOptions:f,renderAssetAreaOptions:g,assetOptionLabel:s}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function a(i){if(!i.photo_storage_path)return"";let u=i.photo_file_name||i.photo_original_file_name||"Request photo",r=n(i);return`
        <div class="request-photo-preview">
          ${i.photoSignedUrl&&i.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(i.photoSignedUrl)}" alt="${e(u)}">`:""}
          <div>
            <strong>${e(u)}</strong>
            <span>${e(r)}</span>
            ${i.photoSignedUrl?`<a href="${e(i.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let a=n();return a>0?`<b class="nav-badge nav-message-badge" aria-label="${a} unread conversations and work alerts">${a}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(a){let i=Number(a);return!Number.isFinite(i)||i<=0?0:Math.floor(i)}function n(a){let i=e(a);return i?i>99?"99+":String(i):""}function t(a,i={}){let u=n(a);if(!u)return"";let r=i.alert?" nav-alert-badge":"",c=i.alertSuffix?"!":"";return`<b class="nav-badge${r}">${u}${c}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function a(i){let u=n()[i.reporter_id]?.full_name||"Team member",r=t().find(d=>d.id===i.location_id)?.name||"No location",c=i.status||"open",s=i.severity||"normal";return`
        <article class="issue-report-card issue-${c}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${s==="blocking"?"critical":s==="minor"?"completed":"open"}">${e(s)}</span>
              <span class="chip issue-status-chip issue-status-${c}">${e(c)}</span>
              <span>${e(r)}</span>
              <span>${i.created_at?new Date(i.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(i.title)}</strong>
            <p>${e(i.details||"")}</p>
            <small>${e(u)} - ${e(i.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(i.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(d=>`<option value="${d}" ${d===c?"selected":""}>${d}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(i.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:a,getMessagesByThreadId:i,getMessageWorkOrderLinksReady:u}){function r(s){let d=i()[s.id]||[],f=d[d.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(s.title)}</strong>
            <span>${e(t(s))}${f?` - ${e(n(f.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${s.id}" type="button">Open Thread</button>
        </article>
      `}function c(s){let d=a().filter(f=>f.work_order_id===s.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${s.id}" type="button">Message Team</button>
            ${u()?`
              <div class="work-linked-thread-list">
                ${d.map(r).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:c,renderLinkedWorkMessageThread:r}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:l}})();(function(){function l({escapeHtml:e,recommendedWorkOrderStep:n}){function t(a){let i=n(a);return i?`
        <section class="work-recommendation ${i.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(i.title)}</strong>
            <p>${e(i.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${i.target}" type="button">${e(i.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(a,i,u,r,c){return`
        <button class="command-card command-${c} ${i?"":"empty"}" data-jump-work-section="${u}" type="button">
          <span>${e(a)}</span>
          <strong>${i}</strong>
          <small>${e(r)}</small>
        </button>
      `}function t(a){return a.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:i,requiresSafetyDeviceCheck:u=d=>!!d.asset_id,renderEmailHelperCommandCard:r,getMessageThreads:c,getPartsUsedByWorkOrder:s}){function d(f){let o=c().filter(h=>h.work_order_id===f.id).length,g=(s()[f.id]||[]).reduce((h,v)=>h+(Number(v.quantity_used)||0),0),m=u(f)?i(f)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:[f.asset_id?"Not Required":"General","No equipment safety check required","neutral"],p=f.status==="completed"?"Review history or create follow-up if needed":f.status==="blocked"?"Resolve blocker or add current update":f.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
      `}function i(){let u=n();return`
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
      `}return{renderPartSourceOptions:a,renderPartSourceManager:i}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:a,getLocations:i=()=>[],parentAssetFor:u,childAssetsFor:r}){function c(s){let d=t().filter(g=>g.asset_id===s.id&&g.status!=="completed").length,f=u(s),o=r(s.id);return`
        <article class="asset-card asset-state-${s.status} ${s.id===a()?"selected":""}" data-asset-id="${s.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${s.status}">${e(s.status)}</span>
              <span class="chip">${e(n(s.asset_type))}</span>
              ${s.asset_code?`<span class="chip">${e(s.asset_code)}</span>`:""}
              ${s.asset_tag?`<span class="chip">Asset tag: ${e(s.asset_tag)}</span>`:""}
              ${s.manufacturer?`<span class="chip">${e(s.manufacturer)}</span>`:""}
              ${s.model?`<span class="chip">${e(s.model)}</span>`:""}
              ${s.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h3>${e(s.name)}</h3>
            ${s.asset_type==="traveling_machine"?`<p><strong class="asset-facility">Current facility: ${e(i().find(g=>g.id===s.location_id)?.name||"Location unavailable")}</strong></p>`:""}
            <p>${e(s.location||"No area / spot set")}</p>
            ${f?`<p>Part of ${e(f.name)}</p>`:""}
            ${o.length?`<p>${o.length} linked item${o.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${d} open work</span>
        </article>
      `}return{renderAssetCard:c}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function a(i=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(u=>`<option value="${u.id}" ${u.id===i?"selected":""}>${e(u.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function a(u){let r=n().filter(c=>c.thread_id===u.id).map(c=>t(c.user_id));return r.length?r.join(", "):"Direct message"}function i(u){return u.thread_type==="direct"?a(u):u.thread_type==="location"?`Company team / ${e().find(r=>r.id===u.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:i}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:a,unreadMessageCount:i,getMessagesByThreadId:u,getActiveMessageThreadId:r,threadTitle:c=s=>s.title}){function s(d){let o=(u()[d.id]||[]).filter(C=>!C.deleted_at),g=d.latest_message||o[o.length-1],m=i(d.id),p=c(d),h=String(p||"MO").trim().split(/\s+/).slice(0,2).map(C=>Array.from(C)[0]).join("").toUpperCase(),v=Math.abs([...String(p)].reduce((C,E)=>C*31+E.charCodeAt(0)|0,0))%6,y=g?.body?`${e(t(g.sender_id))}: ${e(g.body)}`:"Attachment",k=new Date(g?.created_at),q=k.toDateString()===new Date().toDateString(),S=g?q?k.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):n(g.created_at):"";return`
        <button class="message-thread-button ${d.id===r()?"active":""} ${m?"unread":""}" data-message-thread="${d.id}" aria-current="${d.id===r()?"true":"false"}" type="button">
          <span class="message-thread-avatar" data-tone="${v}" aria-hidden="true">${d.thread_type==="direct"?e(h):"#"}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${e(p)}</strong><time datetime="${e(g?.created_at||"")}" title="${e(g?n(g.created_at):"")}">${e(S)}</time></span>
          <span class="message-row-preview"><small>${g?y:"No messages yet"}</small>${m?`<span class="message-unread-pill" aria-label="${m} unread messages">${m}</span>`:""}</span>
          <span class="message-row-scope">${d.work_order_id?"Work order / ":""}${e(a(d))}${d.preferences?.muted?" / Muted":""}</span>
          </span>
        </button>
      `}return{renderMessageThreadButton:s}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var wi=N(Sn());(function(){function l({getLocations:e}){function n(t){let a=e().find(i=>i.id===t.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function a(){let i=[];return e()||i.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||i.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&i.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),i.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(i){return i.assets?.name||"Equipment"}function t(i){return`Machine Down Update - ${n(i)} - ${new Date().toLocaleString()}`}function a(i){let u=n(i),r=i.due_at?`known, target ${e.formatDate(i.due_at)}`:"unknown at this time",c=e.assignmentLabel(i),s=e.cleanWorkOrderDescription(i.description)||i.title,d=i.resolution_summary||i.failure_cause||i.completion_notes||"No additional update has been entered yet.";return[`${u} is down or needs maintenance attention. At this time, the expected downtime is ${r}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${s}`,`Work order: ${i.title}`,`Equipment: ${u}`,`Current update: ${d}`,`Assigned to: ${c}`,`Priority: ${i.priority||"medium"}`,`ETA / due date: ${i.due_at?e.formatDate(i.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let a=t?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(i){return String(i||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(i,u){let r=n(i);return u!==e.OUTSIDE_VENDOR_VALUE?r||null:[r,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(i,u){let r=String(i||"").trim();if(!u?.photo_storage_path)return r||null;let c="[Request photo attached to original request]";return r?`${r}

${c}`:c}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let a=[];return n.title!==t.title&&a.push("title"),(n.description||"")!==(t.description||"")&&a.push("description"),(n.due_at||"")!==(t.due_at||"")&&a.push("due date"),n.priority!==t.priority&&a.push("priority"),(n.type||"corrective")!==t.type&&a.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&a.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&a.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,a,i=[]){return[...n.map(u=>({...u,type:"comment"})),...t.map(u=>({...u,type:"photo"})),...i.map(u=>({...u,type:"part"})),...a.map(u=>({...u,type:"event"}))].sort((u,r)=>new Date(r.created_at)-new Date(u.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(r){return Number(r.quantity_on_hand)<=Number(r.reorder_point)}function t(){return e.getParts().filter(n)}function a(r){let c=e.getPartSearchQuery().trim().toLowerCase();return c?r.some(s=>String(s??"").toLowerCase().includes(c)):!0}function i(){let r=e.getParts().filter(c=>!e.matchesActiveLocation(c)||e.getPartInventoryFilter()==="low"&&!n(c)?!1:a([c.name,c.sku,c.supplier_name,c.machine_note,c.quantity_on_hand,c.reorder_point,c.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...r].sort((c,s)=>{let d=String(c.supplier_name||"zzzzzz").localeCompare(String(s.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return d||String(c.name||"").localeCompare(String(s.name||""),void 0,{sensitivity:"base"})}):r}function u(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(r=>String(r.supplier_name||"").trim()).filter(Boolean))].sort((r,c)=>r.localeCompare(c))}return{isLowStockPart:n,lowStockParts:t,filteredParts:i,matchesPartSearch:a,partSourceOptions:u}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(c=>c.status==="submitted")}function t(c){return e.matchesActiveLocation(c)&&e.matchesSearch([c.title,c.description,c.status,c.priority,c.assets?.name,e.getProfilesByUserId()[c.requested_by]?.full_name])}function a(c){return c.status==="converted"||!!c.converted_work_order_id}function i(c,s=e.getRequestViewFilter()){return s==="converted"?a(c):s==="all"?!0:!a(c)&&c.status==="submitted"}function u(c=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(s=>t(s)&&i(s,c))}function r(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:a,requestMatchesViewFilter:i,filteredRequests:u,requestFilterCounts:r}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function n(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(u){return e.getAssets().find(r=>r.id===u?.parent_asset_id)||null}function t(u){return e.getAssets().filter(r=>r.parent_asset_id===u).sort((r,c)=>r.name.localeCompare(c.name))}function a(u,r){if(!u||!r)return!1;let c=e.getAssets().find(d=>d.id===u),s=new Set;for(;c?.parent_asset_id&&!s.has(c.id);){if(c.parent_asset_id===r)return!0;s.add(c.id),c=e.getAssets().find(d=>d.id===c.parent_asset_id)}return!1}function i(){return e.getAssets().filter(u=>e.getAssetTypeFilter?.()!=="traveling_machine"&&!e.matchesActiveLocation(u)||e.getAssetStatusFilter()!=="all"&&u.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(u.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(u.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([u.name,u.asset_code,u.asset_tag,u.manufacturer,u.model,u.location,u.status,u.asset_type,n(u)?.name]))}return{filteredAssets:i,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();(function(){function l({assets:e,matchesActiveLocation:n,workspaceUiState:t,ASSET_TYPE_OPTIONS:a,escapeHtml:i}){let u=e.filter(n),r=[...new Set((t.getAssetTypeFilter()==="traveling_machine"?e.filter(y=>y.asset_type==="traveling_machine"):u).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,k)=>y.localeCompare(k));t.getAssetAreaFilter()!=="all"&&!r.includes(t.getAssetAreaFilter())&&t.setAssetAreaFilter("all");let c=t.getAssetAreaFilter(),s=a.reduce((y,k)=>(y[k]=u.filter(q=>(q.asset_type||"machine")===k).length,y),{}),d=u.filter(y=>y.status==="running").length,f=u.filter(y=>y.status==="degraded").length,o=u.filter(y=>y.status==="offline").length,g=t.getAssetStatusFilter(),m=t.getAssetTypeFilter(),p=()=>`
      <div class="asset-area-filter relationship-detail asset" aria-label="Equipment area filter">
        <label>Area / spot
          <select data-asset-area-filter>
            <option value="all" ${c==="all"?"selected":""}>Display all areas</option>
            ${r.map(y=>`<option value="${i(y)}" ${c===y?"selected":""}>${i(y)}</option>`).join("")}
          </select>
        </label>
        <span>${c==="all"?"Showing all equipment areas.":`Showing ${i(c)}.`}</span>
      </div>
    `;return`${`
      <section class="work-command-summary asset-command-summary asset-master-summary" aria-label="Equipment master summary">
        ${[{label:"Traveling Equipment",count:e.filter(y=>y.asset_type==="traveling_machine").length,tone:"command-owner",typeFilter:"traveling_machine",detail:"All company facilities.",empty:"No traveling equipment yet."},{label:"Running",count:d,tone:"status-completed",statusFilter:"running",detail:"Equipment currently marked running.",empty:"No equipment marked running."},{label:"Degraded",count:f,tone:"status-open",statusFilter:"degraded",detail:"Known issue, still usable.",empty:"No degraded equipment."},{label:"Offline / Down",count:o,tone:"status-blocked",statusFilter:"offline",detail:"Equipment currently marked offline/down.",empty:"No equipment marked offline/down."},{type:"machine",label:"Primary",count:s.machine||0,tone:"command-owner",typeFilter:"machine",detail:"Main machines, lines, and standalone equipment.",empty:"No primary equipment yet."},{type:"forklift",label:"Forklifts / Mobile Lifts",count:s.forklift||0,tone:"command-equipment",typeFilter:"forklift",detail:"Lift trucks and mobile equipment with repair or inspection history.",empty:"No forklifts or mobile lifts yet."},{type:"secondary_machine",label:"Sub Equipment",count:s.secondary_machine||0,tone:"command-equipment",typeFilter:"secondary_machine",detail:"Major sections under a main machine or line.",empty:"No sub equipment yet."},{type:"tooling",label:"Tooling / Setup",count:s.tooling||0,tone:"command-equipment",typeFilter:"tooling",detail:"Roll tooling, die sets, profiles, and setup records.",empty:"No tooling/setup records yet."},{type:"component",label:"Components",count:s.component||0,tone:"command-equipment",typeFilter:"component",detail:"Tracked equipment components; inventory parts stay in detail.",empty:"No component records yet."},{type:"shop_item",label:"Shop Items",count:s.shop_item||0,tone:"command-equipment",typeFilter:"shop_item",detail:"Support equipment or shop assets worth tracking.",empty:"No shop item records yet."}].map(y=>{let k=y.count||0,q=y.statusFilter&&g===y.statusFilter||y.typeFilter&&m===y.typeFilter,S=y.statusFilter?`data-asset-status-filter="${i(y.statusFilter)}"`:`data-asset-type-filter="${i(y.typeFilter)}"`;return`
            <button class="command-card ${y.tone} ${k?"":"empty"} ${q?"active":""}" ${S} aria-pressed="${q}" type="button">
              <span>${i(y.label)}</span>
              <strong>${k}</strong>
              <small>${i(k?y.detail:y.empty)}</small>
            </button>
          `}).join("")}
      </section>
    `}${t.getAssetTypeFilter()==="traveling_machine"?"<h3>Traveling Equipment <small>All facilities</small></h3>":""}${p()}`}window.MaintainOpsAssetInventoryDisplay={renderAssetInventoryControls:l}})();(function(){function l(e){function n(a){let i=e.getSearchQuery().trim().toLowerCase();return i?a.some(u=>String(u??"").toLowerCase().includes(i)):!0}function t(a,i=e.getSearchQuery()){let u=i.trim().toLowerCase();return u?a.some(r=>String(r??"").toLowerCase().includes(u)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(r){return r.due_at?new Date(`${r.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(r){return{low:1,medium:2,high:3,critical:4}[r]||0}function a(r){return r.completed_at?new Date(r.completed_at).getTime():0}function i(r){return typeof e.assignmentLabel=="function"?e.assignmentLabel(r):r.assigned_profile?.full_name||r.assigned_to||"Unassigned"}function u(r,c){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(c)-a(r)||new Date(c.created_at)-new Date(r.created_at):e.getWorkSort()==="due"?n(r)-n(c)||new Date(c.created_at)-new Date(r.created_at):e.getWorkSort()==="priority"?t(c.priority)-t(r.priority)||n(r)-n(c):e.getWorkSort()==="type"?String(r.type||"").localeCompare(String(c.type||""))||new Date(c.created_at)-new Date(r.created_at):e.getWorkSort()==="assigned"?i(r).localeCompare(i(c))||new Date(c.created_at)-new Date(r.created_at):new Date(c.created_at)-new Date(r.created_at)}return{compareWorkOrders:u,dueSortValue:n,prioritySortValue:t,completedSortValue:a,assigneeSortLabel:i}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(a){return a?.location_id||a?.assets?.location_id||null}function t(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(a)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(c=>e.matchesActiveLocation(c)&&c.status!=="completed").slice(0,8)}function t(){let c=e.getMessageThreadFilter();return e.getMessageThreads().filter(s=>{let d=e.isConversationArchived?.(s)||!1;if(c==="archived")return d&&e.matchesQuery(a(s),e.getMessageSearchQuery());if(d)return!1;let f=c==="all"||c==="favorites"&&s.preferences?.favorite||c==="unread"&&i(s.id)>0||s.thread_type===c,o=e.getMessageSection?.()||"";return f&&(!o||s.preferences?.section_name===o)&&e.matchesQuery(a(s),e.getMessageSearchQuery())}).sort((s,d)=>+!!d.preferences?.favorite-+!!s.preferences?.favorite)}function a(c){let s=e.getMessageThreadMembers().filter(d=>d.thread_id===c.id).map(d=>e.teamMemberName(d.user_id));return[c.title,e.messageThreadScopeLabel(c),...s]}function i(c){let s=e.getMessageReadsByThreadId()[c]?.last_read_at,d=s?new Date(s).getTime():0;return(e.getMessagesByThreadId()[c]||[]).filter(f=>f.deleted_at||f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>d).length}function u(){return e.getMessageThreads().filter(c=>!c.preferences?.muted&&!e.isConversationArchived?.(c)).reduce((c,s)=>c+(i(s.id)>0?1:0),0)}function r(){return e.getMessageThreads().filter(c=>c.thread_type==="direct"&&!c.preferences?.muted&&!e.isConversationArchived?.(c)).reduce((c,s)=>c+(i(s.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:a,unreadMessageCount:i,totalUnreadMessages:u,directUnreadMessages:r}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(t)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(t):a==="completed_week"?e.isCompletedThisWeek(t):a==="active"||a==="all"?t.status!=="completed":t.status===a}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getPartsUsedByWorkOrder()[t.id]||[],i=e.getCommentsByWorkOrder()[t.id]||[],u=e.getEventsByWorkOrder()[t.id]||[],r=e.getPhotosByWorkOrder()[t.id]||[],c=e.getProcedureTemplates().find(f=>f.id===t.procedure_template_id),s=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),d=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,d[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,c?.name,c?.description,...(c?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...a.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...i.flatMap(f=>[f.body,d[f.author_id]?.full_name]),...u.flatMap(f=>[f.event_type,f.summary,d[f.actor_id]?.full_name]),...r.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...s.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===t:e.isWorkOrderAssignedToUser(a,t))&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var Vi=N($n()),Gi=N(Cn()),Hi=N(An()),Yi=N(Pn()),Ki=N(En()),Ji=N(Rn()),Zi=N(Wn());(function(){function l(t){if(!t)return"";let a=new Date(t),i=new Date,u=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),c=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r===u?`Today ${c}`:r===u-864e5?`Yesterday ${c}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let a=new Date(t),i=new Date,u=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return r===u?"Today":r===u-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let a=String(t||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(i=>i[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();window.MaintainOpsEquipmentCreateDrafts={createEquipmentCreateDrafts:Fe,createMaintenanceCreateDrafts:At};window.MaintainOpsChecklistResults={createChecklistResultsState:Pt};window.MaintainOpsMaintenanceWorkspaceRows={loadCompleteWorkspaceRows:Et,validateProcedureSteps:Rt};})();
//# sourceMappingURL=runtime.8f0fa4888d.js.map
