(()=>{var xn=Object.create;var qt=Object.defineProperty;var Mn=Object.getOwnPropertyDescriptor;var Dn=Object.getOwnPropertyNames;var Tn=Object.getPrototypeOf,In=Object.prototype.hasOwnProperty;var L=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Fn=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Dn(e))!In.call(l,a)&&a!==n&&qt(l,a,{get:()=>e[a],enumerable:!(t=Mn(e,a))||t.enumerable});return l};var N=(l,e,n)=>(n=l!=null?xn(Tn(l)):{},Fn(e||!l||!l.__esModule?qt(n,"default",{value:l,enumerable:!0}):n,l));var Rt=L((Bn,Fe)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,a=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},d=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),r=d(),o={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:r,workspaceLoadPending:!1,workspaceLoadWasHidden:a?.visibilityState==="hidden",navigationStartedAt:d(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},c=new Map,u=0;function f(R){if(R==null||R==="")return null;let $=Number(R);return Number.isFinite($)&&$>=0?$:null}function i(){let R=s.connection||s.mozConnection||s.webkitConnection,$=t?.matchMedia?.("(pointer: coarse)")?.matches,O=f(s.deviceMemory),M=f(s.hardwareConcurrency),I=O!==null&&O<=4||M!==null&&M<=4||$?"constrained":"standard",E=f(t?.innerWidth);return{source:"browser",device_tier:I,viewport_class:E!==null&&E<720?"mobile":E!==null&&E<1100?"tablet":"desktop",connection_type:String(R?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!R?.saveData}}function g(R={}){let $={...i(),measurement_version:n,...R};return Object.fromEntries(Object.entries($).filter(([,O])=>O!=null&&O!==""))}function m(R=12e3){!o.client||!o.companyId||o.flushTimer||Date.now()<o.disabledUntil||typeof t?.setTimeout=="function"&&(o.flushTimer=t.setTimeout(()=>{o.flushTimer=null,h()},R))}function p(R,$,O={},M={}){if(!l.has(R))return!1;let I=f($);if(I===null)return!1;let E=Number(I.toFixed(R==="cls"?4:2));return o.latest[R]={metric:R,value:E,unit:e[R],context:g(O),measuredAt:new Date().toISOString()},M.persist!==!1&&o.persistenceEnabled&&(o.pending.push({metric:R,value:E,unit:e[R],context:g(O)}),o.pending.length>60&&o.pending.splice(0,o.pending.length-60),m(M.immediate?250:12e3)),!0}async function h(){if(!o.client||!o.companyId||!o.pending.length||Date.now()<o.disabledUntil)return!1;let R=o.companyId,$=o.pending.splice(0,20),O=null;try{O=(await o.client.rpc("record_app_performance_samples",{target_company_id:R,samples:$})).error||null}catch(I){O=I}if(!O)return o.pending.length&&m(1e3),!0;o.companyId===R&&o.pending.unshift(...$);let M=String(O.message||O).toLowerCase();return o.disabledUntil=Date.now()+(M.includes("could not find")||M.includes("does not exist")?3e5:6e4),!1}function v({client:R,companyId:$}){if(o.client=R||null,o.companyId=$||"",!(!o.client||!o.companyId)){if(o.configuredCompanyId!==o.companyId){o.configuredCompanyId=o.companyId,p("session_start",1,{source:"workspace"},{immediate:!0});let O=s.connection||s.mozConnection||s.webkitConnection;f(O?.downlink)!==null&&p("connection_downlink_mbps",O.downlink,{source:"browser-estimate"}),f(O?.rtt)!==null&&p("connection_rtt_ms",O.rtt,{source:"browser-estimate"})}m(250)}}function y(){o.workspaceStartedAt=d(),o.workspaceLoadPending=!0,o.workspaceLoadWasHidden=a?.visibilityState==="hidden"}function k(R){if(!R)return;if(o.workspaceCompanies.has(R)){o.workspaceLoadPending=!1;return}o.workspaceCompanies.add(R);let $=!o.workspaceLoadWasHidden&&a?.visibilityState!=="hidden";p("workspace_ready_ms",d()-o.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:$}),o.workspaceLoadPending=!1,o.latest.cls||p("cls",u,{source:"performance-observer"},{persist:!1}),$&&t?.setTimeout?.(()=>S(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function S(R=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!o.companyId||!o.workspaceCompanies.has(o.companyId))return;let $=new Set(R);Object.values(o.latest).filter(O=>$.has(O.metric)).forEach(O=>{let M=O.metric==="inp_ms";(M?o.lastPersistedInpValue===O.value:o.persistedVitals.has(O.metric))||p(O.metric,O.value,{source:"performance-observer"})&&(M?o.lastPersistedInpValue=O.value:o.persistedVitals.add(O.metric))})}function q(R=1500){typeof t?.setTimeout=="function"&&(o.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(o.inpCaptureTimer),o.inpCaptureTimer=t.setTimeout(()=>{o.inpCaptureTimer=null,S(["inp_ms"])},R))}function A(){o.navigationStartedAt=d()}function _(R){let $=Number(R);return a?.visibilityState==="hidden"||Number.isFinite($)&&o.lastHiddenAt>=$}function w(R,$=o.navigationStartedAt){p("section_navigation_ms",d()-$,{source:String(R||"workspace").slice(0,48)},{persist:!_($)})}function b(R,$,O=null){p("query_latency_ms",d()-$,{source:String(R||"query").slice(0,48)},{persist:!_($)}),O&&p("client_error",1,{source:`query:${String(R||"unknown").slice(0,36)}`},{immediate:!0})}function P(R={}){let $={source:"performance-room",quality_tier:R.qualityTier||"unknown"};Object.entries({spatial_ready_ms:R.readyMs,spatial_fps:R.fps,spatial_frame_ms:R.frameMs,spatial_slow_frame_pct:R.slowFramePercent,spatial_draw_calls:R.drawCalls,spatial_triangles:R.triangles,spatial_geometries:R.geometries,spatial_textures:R.textures,webgl_context_loss:Number(R.contextLosses)>0?R.contextLosses:void 0}).forEach(([O,M])=>{f(M)!==null&&p(O,M,$)}),m(500)}function C(){return{latest:{...o.latest},connection:i(),pendingCount:o.pending.length,measurementVersion:n,persistenceEnabled:o.persistenceEnabled}}function T(R,$,O={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(R)))try{new PerformanceObserver(I=>$(I.getEntries())).observe({type:R,...O})}catch{}}T("paint",R=>{let $=R.find(O=>O.name==="first-contentful-paint");$&&p("fcp_ms",$.startTime,{source:"performance-observer"},{persist:!1})}),T("largest-contentful-paint",R=>{let $=R.at(-1);$&&p("lcp_ms",$.startTime,{source:"performance-observer"},{persist:!1})}),T("layout-shift",R=>{R.forEach($=>{$.hadRecentInput||(u+=$.value)}),p("cls",u,{source:"performance-observer"},{persist:!1})}),T("event",R=>{R.forEach(O=>{O.interactionId&&c.set(O.interactionId,Math.max(c.get(O.interactionId)||0,O.duration))});let $=[...c.values()].sort((O,M)=>M-O);$.length&&(p("inp_ms",$[Math.min(Math.floor($.length/50),10)],{source:"performance-observer"},{persist:!1}),q())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>p("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>p("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{o.offlineStartedAt=d(),p("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{o.offlineStartedAt&&p("reconnect_ms",d()-o.offlineStartedAt,{source:"network"},{immediate:!0}),o.offlineStartedAt=0}),a?.addEventListener?.("visibilitychange",()=>{a.visibilityState==="hidden"&&(o.lastHiddenAt=d(),o.workspaceLoadPending&&(o.workspaceLoadWasHidden=!0),S(),h())});let W={beginWorkspaceLoad:y,configure:v,flush:h,markNavigationStart:A,markWorkspaceReady:k,record:p,recordQueryLatency:b,recordSectionNavigation:w,recordSpatial:P,snapshot:C};typeof window<"u"&&(window.MaintainOpsAppTelemetry=W),typeof Fe<"u"&&(Fe.exports=W)})()});var Wt=L((jn,Le)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,a){let s=String(n||"");return!(!l(t)&&!l(a)||["TOKEN_REFRESHED","SIGNED_IN","INITIAL_SESSION"].includes(s)&&l(t)&&l(t)===l(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Le<"u"&&(Le.exports={shouldRenderForAuthEvent:e})})()});var Ot=L((zn,Ne)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(r,o,c){if(!r||!r.getItem)return c;let u=r.getItem(o);return u??c}function n(r,o){let c=Number(e(r,o,"1"));return Number.isFinite(c)&&c>0?c:1}function t(r,o,c){!r||!r.setItem||r.setItem(o,String(c))}function a(r,o){try{let c=JSON.parse(e(r,o,"{}"));return c&&typeof c=="object"&&!Array.isArray(c)?c:{}}catch{return{}}}function s(r,o){!r||!r.removeItem||r.removeItem(o)}function d(r={}){let o=r.storage||localStorage,c={activeSection:e(o,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(o,l.activeMessageThreadId,""),searchQuery:e(o,l.searchQuery,""),workOrderSearchMode:e(o,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(o,l.messageThreadFilter,"all"),messageThreadsPage:n(o,l.messageThreadsPage),messageSearchQuery:e(o,l.messageSearchQuery,""),messageComposerWorkOrderId:e(o,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(o,l.managerDashboardUserId,""),managerDashboardMetric:e(o,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(o,l.myWorkFilter,"assigned"),workOrderFilter:e(o,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(o,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(o,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(o,l.workOrderPriorityFilter,"all"),workSort:e(o,l.workSort,"newest"),workGroup:e(o,l.workGroup,"none"),requestViewFilter:e(o,l.requestViewFilter,"active"),workOrderPage:n(o,l.workOrderPage),partsPage:n(o,l.partsPage),assetsPage:n(o,l.assetsPage),financialPage:n(o,l.financialPage),financialMissingFilter:e(o,l.financialMissingFilter,"all"),financialLocationFilter:e(o,l.financialLocationFilter,"all"),financialTypeFilter:e(o,l.financialTypeFilter,"all"),financialAreaFilter:e(o,l.financialAreaFilter,"all"),requestsPage:n(o,l.requestsPage),planningOverduePage:n(o,l.planningOverduePage),planningTodayPage:n(o,l.planningTodayPage),planningSoonPage:n(o,l.planningSoonPage),planningNoDuePage:n(o,l.planningNoDuePage),planningFollowUpPage:n(o,l.planningFollowUpPage),planningPmPage:n(o,l.planningPmPage),planningGroupOpen:a(o,l.planningGroupOpen),schedulesPage:n(o,l.schedulesPage),proceduresPage:n(o,l.proceduresPage),membersPage:n(o,l.membersPage),assetStatusFilter:e(o,l.assetStatusFilter,"all"),assetTypeFilter:e(o,l.assetTypeFilter,"all"),assetAreaFilter:e(o,l.assetAreaFilter,"all"),partInventoryFilter:e(o,l.partInventoryFilter,"all"),partSort:e(o,l.partSort,"default"),partSearchQuery:e(o,l.partSearchQuery,"")};e(o,l.sectionSplitDone,"")!=="true"&&c.activeSection==="work"&&(c.activeSection="mywork",t(o,l.activeSection,c.activeSection),t(o,l.sectionSplitDone,"true")),c.activeSection==="performance"&&(c.activeSection="mywork",t(o,l.activeSection,c.activeSection));let u=(i,g,m)=>{c[i]=g,m&&t(o,m,g)},f=(i,g)=>{u(i,1,g)};return{getActiveSection:()=>c.activeSection,setActiveSection:i=>u("activeSection",i,l.activeSection),getActiveWorkOrderId:()=>c.activeWorkOrderId,setActiveWorkOrderId:i=>u("activeWorkOrderId",i),getActiveAssetId:()=>c.activeAssetId,setActiveAssetId:i=>u("activeAssetId",i),getActivePartId:()=>c.activePartId,setActivePartId:i=>u("activePartId",i),getActiveMessageThreadId:()=>c.activeMessageThreadId,setActiveMessageThreadId:i=>u("activeMessageThreadId",i,l.activeMessageThreadId),getMessageThreadFilter:()=>c.messageThreadFilter,setMessageThreadFilter:i=>u("messageThreadFilter",i,l.messageThreadFilter),getMessageThreadsPage:()=>c.messageThreadsPage,setMessageThreadsPage:i=>u("messageThreadsPage",i,l.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>c.messageSearchQuery,setMessageSearchQuery:i=>u("messageSearchQuery",i,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>c.messageComposerWorkOrderId,setMessageComposerWorkOrderId:i=>u("messageComposerWorkOrderId",i,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>c.messageComposerOpen,setMessageComposerOpen:i=>u("messageComposerOpen",!!i),getManagerDashboardUserId:()=>c.managerDashboardUserId,setManagerDashboardUserId:i=>u("managerDashboardUserId",i||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>c.managerDashboardMetric,setManagerDashboardMetric:i=>u("managerDashboardMetric",i||"open",l.managerDashboardMetric),getSearchQuery:()=>c.searchQuery,setSearchQuery:i=>u("searchQuery",i,l.searchQuery),getWorkOrderSearchMode:()=>c.workOrderSearchMode,setWorkOrderSearchMode:i=>u("workOrderSearchMode",!!i,l.workOrderSearchMode),getActiveStatusFilter:()=>c.activeStatusFilter,setActiveStatusFilter:i=>u("activeStatusFilter",i),getMyWorkFilter:()=>c.myWorkFilter,setMyWorkFilter:i=>u("myWorkFilter",i,l.myWorkFilter),getWorkOrderFilter:()=>c.workOrderFilter,setWorkOrderFilter:i=>u("workOrderFilter",i,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>c.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:i=>{u("workOrderAssigneeFilter",i),i?t(o,l.workOrderAssigneeFilter,i):s(o,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>c.workOrderTypeFilter,setWorkOrderTypeFilter:i=>u("workOrderTypeFilter",i||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>c.workOrderPriorityFilter,setWorkOrderPriorityFilter:i=>u("workOrderPriorityFilter",i||"all",l.workOrderPriorityFilter),getWorkSort:()=>c.workSort,setWorkSort:i=>u("workSort",i,l.workSort),getWorkGroup:()=>c.workGroup,setWorkGroup:i=>u("workGroup",i||"none",l.workGroup),getRequestViewFilter:()=>c.requestViewFilter,setRequestViewFilter:i=>u("requestViewFilter",i,l.requestViewFilter),getWorkOrderPage:()=>c.workOrderPage,setWorkOrderPage:i=>u("workOrderPage",i,l.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",l.workOrderPage),getPartsPage:()=>c.partsPage,setPartsPage:i=>u("partsPage",i,l.partsPage),resetPartsPage:()=>f("partsPage",l.partsPage),getAssetsPage:()=>c.assetsPage,setAssetsPage:i=>u("assetsPage",i,l.assetsPage),resetAssetsPage:()=>f("assetsPage",l.assetsPage),getFinancialPage:()=>c.financialPage,setFinancialPage:i=>u("financialPage",i,l.financialPage),resetFinancialPage:()=>f("financialPage",l.financialPage),getFinancialMissingFilter:()=>c.financialMissingFilter,setFinancialMissingFilter:i=>u("financialMissingFilter",i||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>c.financialLocationFilter,setFinancialLocationFilter:i=>u("financialLocationFilter",i||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>c.financialTypeFilter,setFinancialTypeFilter:i=>u("financialTypeFilter",i||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>c.financialAreaFilter,setFinancialAreaFilter:i=>u("financialAreaFilter",i||"all",l.financialAreaFilter),getRequestsPage:()=>c.requestsPage,setRequestsPage:i=>u("requestsPage",i,l.requestsPage),resetRequestsPage:()=>f("requestsPage",l.requestsPage),getPlanningPage:i=>i==="overdue"?c.planningOverduePage:i==="today"?c.planningTodayPage:i==="soon"?c.planningSoonPage:i==="no-due"?c.planningNoDuePage:i==="follow-up"?c.planningFollowUpPage:i==="pm"?c.planningPmPage:1,setPlanningPage:(i,g)=>{i==="overdue"&&u("planningOverduePage",g,l.planningOverduePage),i==="today"&&u("planningTodayPage",g,l.planningTodayPage),i==="soon"&&u("planningSoonPage",g,l.planningSoonPage),i==="no-due"&&u("planningNoDuePage",g,l.planningNoDuePage),i==="follow-up"&&u("planningFollowUpPage",g,l.planningFollowUpPage),i==="pm"&&u("planningPmPage",g,l.planningPmPage)},getPlanningGroupOpen:(i,g=!1)=>Object.prototype.hasOwnProperty.call(c.planningGroupOpen,i)?!!c.planningGroupOpen[i]:!!g,setPlanningGroupOpen:(i,g)=>{c.planningGroupOpen={...c.planningGroupOpen,[i]:!!g},t(o,l.planningGroupOpen,JSON.stringify(c.planningGroupOpen))},getSchedulesPage:()=>c.schedulesPage,setSchedulesPage:i=>u("schedulesPage",i,l.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",l.schedulesPage),getProceduresPage:()=>c.proceduresPage,setProceduresPage:i=>u("proceduresPage",i,l.proceduresPage),resetProceduresPage:()=>f("proceduresPage",l.proceduresPage),getMembersPage:()=>c.membersPage,setMembersPage:i=>u("membersPage",i,l.membersPage),resetMembersPage:()=>f("membersPage",l.membersPage),getAssetStatusFilter:()=>c.assetStatusFilter,setAssetStatusFilter:i=>u("assetStatusFilter",i,l.assetStatusFilter),getAssetTypeFilter:()=>c.assetTypeFilter,setAssetTypeFilter:i=>u("assetTypeFilter",i,l.assetTypeFilter),getAssetAreaFilter:()=>c.assetAreaFilter,setAssetAreaFilter:i=>u("assetAreaFilter",i,l.assetAreaFilter),getPartInventoryFilter:()=>c.partInventoryFilter,setPartInventoryFilter:i=>u("partInventoryFilter",i,l.partInventoryFilter),getPartSort:()=>c.partSort,setPartSort:i=>u("partSort",i||"default",l.partSort),getPartSearchQuery:()=>c.partSearchQuery,setPartSearchQuery:i=>u("partSearchQuery",i,l.partSearchQuery),snapshot:()=>({...c})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:d},typeof Ne<"u"&&(Ne.exports={createWorkspaceUiState:d})})()});var xt=L((Vn,_e)=>{(function(){function l(a){return!!String(a?.production_action||"").trim()}function e(a){return l(a)&&a?.production_action_status==="open"}function n(a,s){return!a||!s?!1:a.assigned_to===s||e(a)&&a.production_action_assigned_to===s}function t(a){return e(a)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof _e<"u"&&_e.exports&&(_e.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var Mt=L((Hn,Se)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",a=>a.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof Se<"u"&&Se.exports&&(Se.exports={bindWorkspaceProductionActionEvents:l})})()});var Dt=L((Gn,Ue)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:l},typeof Ue<"u"&&(Ue.exports={bindWorkspaceWorkOrderNotificationEvents:l})})()});var Tt=L((Yn,qe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData,a=new Set;function s(c){return e.getActiveWorkOrderId()!==c?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(u=>u.checked)}function d(c){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(u=>{u.checked=c.target.checked})}async function r(c){c.preventDefault();let u=c.target,f=u.querySelector("button[type='submit']"),i=n.querySelector("#completion-error"),g=e.getActiveWorkOrderId(),m=e.getWorkOrderById(g),p=e.getScope?.(),h=()=>e.getScope?.()===p;if(!m||a.has(g))return;let v=e.blocksProcedureCompletion?.(m);if(v){i&&(i.textContent=v);return}let y=e.getProcedureById(m?.procedure_template_id),k=y?e.requiredChecklistProgress(m,y):{done:0,total:0},S=e.productionActionCompletionMessage?.(m)||"";if(S){i&&(i.textContent=S),e.setWorkOrderActionWarning(g,S),e.showNotice(S,"warning");return}if(k.done<k.total){i&&(i.textContent=`Complete required checklist steps first (${k.done}/${k.total}).`);return}let q=new t(u),A=q.get("safety_devices_checked")==="on"||s(g)||e.hasCompletedSafetyDeviceCheck(m);if(e.requiresSafetyDeviceCheck(m)&&!A){i&&(i.textContent="Check safety devices before completing equipment work.");return}f.disabled=!0,a.add(g),f.textContent="Completing...",i&&(i.textContent="");let _=!1;try{let w={status:"completed",asset_id:m?.asset_id||null,actual_minutes:Number(q.get("actual_minutes"))||0,failure_cause:q.get("failure_cause")||null,resolution_summary:q.get("resolution_summary")||null,follow_up_needed:q.get("follow_up_needed")==="on",completion_notes:q.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(w),e.applySafetyCheckPayload(w,w.safety_check_required&&A),delete w.asset_id;let{error:b}=await e.withOperationTimeout(e.updateWorkOrderSafely(w,g),"Complete work save timed out. Check your connection and try again.",2e4);if(!h())return;if(b){i&&(i.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(b)}`);return}_=!0;let P;try{let C=await e.withOperationTimeout(e.recordWorkOrderEvent(g,"completed",q.get("resolution_summary")||q.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3);P=C?.error||(C instanceof Error?C:null)}catch(C){P=C}if(!h())return;e.setWorkOrderActionWarning("",""),e.showNotice(P?`Work order completed, but history did not update: ${P.message||P}`:"Work order completed.",P?"warning":"success"),await e.render()}catch(w){h()&&(_?e.showNotice(`Work order completed, but the screen could not update: ${w.message||w}`,"warning"):i?i.textContent=`Could not complete work order: ${w.message||w}`:e.alertRef(w.message||w))}finally{a.delete(g),f.disabled=!1,f.textContent="Complete Work Order"}}function o(){let c=n.querySelector("#complete-work-order-form");c&&c.addEventListener("submit",r),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(u=>{u.addEventListener("change",d)})}return{bindWorkspaceWorkOrderCompletionEvents:o,completeWorkOrder:r,currentSafetyCheckboxCheckedForWorkOrder:s,syncSafetyDeviceChecks:d}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof qe<"u"&&qe.exports&&(qe.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var It=L((Kn,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,a=e.BlobCtor||Blob,s=e.alertRef||alert,d=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,r=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:b=>String(b||"machine").replaceAll("_"," "),o=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:b=>String(b||"corrective").replaceAll("_"," "),c={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function u(b){return(e.getAssetDocumentsByAssetId?.()[b]||[]).filter(P=>String(P.content_type||"").startsWith("image/")||P.document_type==="machine_photo"||P.document_type==="nameplate")}function f(b){return u(b).map(P=>P.original_file_name||P.file_name||P.storage_path||P.id).filter(Boolean).join("; ")}function i(b,P){return b?.parent_asset_id&&P.get(b.parent_asset_id)?.name||""}function g(b){return e.getLocations?.().find(P=>P.id===b)?.name||""}function m(b){if(!b)return"";let P=e.getProfilesByUserId?.()[b];return P?.full_name||P?.email||b}function p(b){return String(g(b.location_id)||b.location_id||b.location||"")}function h(b){return{id:`financial:${b.id}`,financialRecord:b,name:b.archived_asset_name||"Deleted equipment",asset_type:b.archived_asset_type||"machine",asset_code:b.archived_asset_code||"",asset_tag:b.archived_asset_tag||"",manufacturer:b.archived_manufacturer||"",model:b.archived_model||"",location_id:b.archived_location_id||"",location:b.archived_location||"",status:"deleted"}}function v(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(b=>!b.asset_id).map(h)]}function y(b,P,C){let T=p(b).localeCompare(p(P));if(T)return T;let W=(c[b.asset_type||"machine"]||999)-(c[P.asset_type||"machine"]||999);return W||String(i(b,C)).localeCompare(String(i(P,C)))||String(b.location||"").localeCompare(String(P.location||""))||String(b.name||"").localeCompare(String(P.name||""))}function k(){let b=e.getAssets().filter(d),P=new Map(b.map(C=>[C.id,C]));return[...b].sort((C,T)=>y(C,T,P)).map(C=>({equipment_type:r(C.asset_type),name:C.name,parent_equipment:i(C,P),serial_number:C.asset_code||"",asset_tag:C.asset_tag||"",manufacturer:C.manufacturer||"",model:C.model||"",picture_id:f(C.id),picture_count:u(C.id).length,picture_status:u(C.id).length?"attached":"missing",facility:g(C.location_id)||C.location_id||"",area_department:C.location||"",status:C.status}))}function S(){let b=v(),P=new Map(b.map(T=>[T.id,T])),C=e.getAssetFinancialsByAssetId?.()||{};return[...b].sort((T,W)=>y(T,W,P)).map(T=>{let W=T.financialRecord||C[T.id]||{};return{operational_status:T.financialRecord?"deleted":"active",equipment_type:r(T.asset_type),name:T.name,parent_equipment:i(T,P),facility:g(T.location_id)||T.location_id||"",area_department:T.location||"",serial_number:T.asset_code||"",equipment_asset_tag:T.asset_tag||"",manufacturer:T.manufacturer||"",model:T.model||"",picture_status:u(T.id).length?"attached":"missing",asset_tag:W.asset_tag||"",acquisition_date:W.acquisition_date||"",acquisition_cost:W.acquisition_cost||"",depreciation_method:W.depreciation_method||"",useful_life_years:W.useful_life_years||"",current_book_value:W.current_book_value||"",tax_jurisdiction:W.tax_jurisdiction||"",ownership_status:W.ownership_status||"",in_service_date:W.in_service_date||"",disposal_date:W.disposal_date||"",disposal_notes:W.disposal_notes||"",gl_account_code:W.gl_account_code||"",cost_center:W.cost_center||"",finance_notes:W.finance_notes||"",needs_review:!!W.needs_review,last_reviewed_at:W.last_reviewed_at||"",reviewed_by:m(W.reviewed_by)}})}async function q(b){let P=e.getExportScope(),C=e.createExportQuery(b),T=[],W;try{for(;T.length<1e5;){let R=await e.withOperationTimeout(C.range(T.length,T.length+499),"Export timed out. Try again.",2e4);if(R.error)throw R.error;if(e.getExportScope()!==P)throw new Error("Workspace changed. Export again from the intended location.");if(!Number.isInteger(R.count))throw new Error("Export could not verify the total record count.");if(W!==void 0&&W!==R.count)throw new Error("Records changed during export. Try again.");if(W=R.count,T.push(...R.data||[]),new Set(T.map($=>$.id)).size!==T.length)throw new Error("Records moved during export. Try again.");if(T.length===W)return _(b,T);if(!R.data?.length||T.length>W)throw new Error("Export returned an incomplete list. Try again.")}throw new Error("Export exceeds 100,000 records. Narrow the filters and try again.")}catch(R){s(`Could not export: ${R.message||R}`)}}function A(){let b=e.getActiveSection();return e.createExportQuery&&["work","mywork","requests"].includes(b)?q(b):_(b)}function _(b,P){let C={work:{filename:"work-orders.csv",rows:(P&&b!=="requests"?P:e.getWorkOrders()).map(W=>({title:W.title,status:W.status,priority:W.priority,type:o(W.type),equipment:W.assets?.name||"",assigned_to:e.assignmentLabel(W),due_at:W.due_at||"",completed_at:W.completed_at||"",actual_minutes:W.actual_minutes||0,failure_cause:W.failure_cause||"",resolution_summary:W.resolution_summary||"",follow_up_needed:!!W.follow_up_needed}))},assets:{filename:"equipment.csv",rows:k()},financial:{filename:"equipment-financial.csv",rows:S()},requests:{filename:"maintenance-requests.csv",rows:(P&&b==="requests"?P:e.getMaintenanceRequests()).map(W=>({title:W.title,status:W.status,priority:W.priority,equipment:W.assets?.name||"",requested_by:e.getProfilesByUserId()[W.requested_by]?.full_name||"",created_at:W.created_at||"",converted_work_order_id:W.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(W=>({title:W.title,equipment:W.assets?.name||"",frequency:W.frequency,next_due_at:W.next_due_at,active:W.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(W=>({name:W.name,sku:W.sku||"",supplier_name:W.supplier_name||"",quantity_on_hand:W.quantity_on_hand,reorder_point:W.reorder_point,unit_cost:W.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(W=>({name:W.name,description:W.description||"",steps:W.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(W=>({user_id:W.user_id,name:e.getProfilesByUserId()[W.user_id]?.full_name||"",role:W.role}))}},T=C[b]||C.work;if(!T.rows.length)return s("Nothing to export in this section yet.");w(T.filename,T.rows)}function w(b,P){let C=Object.keys(P[0]),T=[C.join(","),...P.map(O=>C.map(M=>e.csvCell(O[M])).join(","))],W=new a([`\uFEFF${T.join(`
`)}`],{type:"text/csv;charset=utf-8"}),R=t.createObjectURL(W),$=n.createElement("a");$.href=R,$.download=b,n.body.appendChild($),$.click(),$.remove(),t.revokeObjectURL(R)}return{downloadCsv:w,exportActiveSectionCsv:A}}typeof $e<"u"&&$e.exports&&($e.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Ft=L((Jn,Qe)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let d=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(d)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Qe<"u"&&(Qe.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var Lt=L((Zn,Be)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(s){let d=String.fromCharCode(...s),r=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return r?r(d).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=l(),typeof Be<"u"&&(Be.exports={createPublicRequestTokenHelpers:l})})()});var Nt=L((Xn,je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,a=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,d=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.createPublicRequestLink))}),typeof a=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>a(r.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>s(r.dataset.enablePublicRequestLink,!0))}),typeof d=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(r=>{r.addEventListener("click",()=>d(r.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof je<"u"&&(je.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Ut=L((er,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let d=a.querySelector?.("button[type='submit']");if(!d?.disabled){d&&(d.disabled=!0);try{let r=a.querySelector?.("[name='planning_due_at']");await t(a.dataset.planningDueForm,r?.value)}finally{d?.isConnected&&(d.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof ze<"u"&&(ze.exports={bindWorkspacePlanningDueDateEvents:l})})()});var Qt=L((tr,Ve)=>{(function(){let l=new WeakSet;function e(a,s,d){if(!a)return;let r=a.querySelector("[data-equipment-choice-existing]"),o=a.querySelector("[data-equipment-choice-new]"),c=s==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(u=>{let f=u.value===(c?"new":"existing");u.checked=f,u.closest("label")?.classList.toggle("active",f)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(u=>{u.hidden=u.dataset.equipmentChoicePanel!==(c?"new":"existing")}),r&&(r.disabled=c,r.required=!c&&r.dataset.equipmentChoiceRequired==="true",c&&(r.value=""),typeof d=="function"&&d(r)),o&&(o.disabled=!c,o.required=c&&o.dataset.equipmentChoiceRequired==="true",c||(o.value=""))}function n(a,s){a.querySelectorAll("[data-equipment-choice]").forEach(d=>{let r=d.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(d,r,s)})}function t(a={}){let s=a.documentRef||document,d=a.updateAssetLocationWarning;n(s,d),!l.has(s)&&(l.add(s),s.addEventListener("change",r=>{let o=r.target.closest?.("[data-equipment-choice-mode]");if(o){e(o.closest("[data-equipment-choice]"),o.value,d);return}let c=r.target.closest?.("[data-equipment-choice-existing]");c&&typeof d=="function"&&d(c)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Ve<"u"&&(Ve.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var Bt=L((nr,He)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:a,createQuickFixAsset:s,getMaintenanceRequests:d,getQuickFixRequestId:r,getActiveCompanyId:o,getSession:c,getParts:u,getRequestsReady:f,getSupabaseClient:i,confirmAssetLocationRouting:g,assetRequiresSafety:m,blocksProcedureCompletion:p,setWorkOrderActionWarning:h,locationIdForAsset:v,descriptionWithRequestPhotoNote:y,descriptionWithAssignmentNote:k,assignedUserFromForm:S,procedureColumn:q,workOrderDateValue:A,applySafetyRequirementPayload:_,applySafetyCheckPayload:w,insertWithOptionalProcedure:b,friendlyWorkOrderSaveError:P,addPartUsageToWorkOrder:C,addPhotoToWorkOrder:T,updateAssetStatus:W,recordWorkOrderEvent:R,setActiveWorkOrderIdState:$,setActiveAssetIdState:O,setCreateWorkOrderMode:M,setQuickFixMode:I,setQuickFixAssetId:E,setQuickFixRequestId:B,showNotice:G,render:ce,alertUser:pe=le=>window.alert(le)}=e;async function ye(le){le.preventDefault();let fe=le.currentTarget,re=n.querySelector("#quick-fix-error"),te=fe.querySelector("button[type='submit']");re&&(re.textContent=""),te&&(te.disabled=!0,te.textContent="Saving...");try{let Q=new t(fe),me=String(Q.get("title")||"").trim();if(!me)throw new Error("Quick Fix issue is required.");let ge=r(),D=o(),U=c(),j=String(Q.get("description")||"").trim(),V=String(Q.get("resolution_summary")||"").trim(),H=V||me,J=j||me,z=Q.get("mark_completed")==="on",X=Q.get("machine_down")==="on",Y=Q.get("asset_id")||null,se=ge?d().find(ae=>ae.id===ge):null,Z=String(Q.get("new_asset_name")||"").trim();if(Y&&Z)throw new Error("Choose existing equipment or create new equipment, not both.");if(Z){let{data:ae,error:K}=await a(s(Z,X?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(K){re&&(re.textContent=K.message);return}Y=ae.id}if(!Z&&!g(Y,"logging this Quick Fix",re))return;if(z&&m(Y)&&Q.get("safety_devices_checked")!=="on"){re&&(re.textContent="Check safety devices before marking equipment work complete.");return}let F=z?p(null,Q.get("procedure_template_id")||null):"";if(F){h("",""),re&&(re.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let ne={company_id:D,location_id:v(Y),title:me,description:y(k(J,Q.get("assigned_to")),se),asset_id:Y,assigned_to:S(Q,U.user.id),priority:Q.get("priority")||"medium",type:Q.get("type")||"corrective",status:z?"completed":"open",due_at:A(Q.get("due_at")),created_by:U.user.id,...q(Q.get("procedure_template_id")),actual_minutes:0,failure_cause:Q.get("failure_cause")||null,resolution_summary:z?H:V||null,follow_up_needed:Q.get("follow_up_needed")==="on",completion_notes:z?H:null,completed_at:z?new Date().toISOString():null};_(ne),w(ne,z&&ne.safety_check_required&&Q.get("safety_devices_checked")==="on");let{data:ue,error:he}=await a(b("work_orders",ne,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(he){re&&(re.textContent=`Could not log quick fix: ${P(he)}`);return}let ie=[],be=Q.get("part_id"),ee=Number(Q.get("quantity_used"))||1;if(be){let ae=u().find(x=>x.id===be),K=await a(C(ue.id,ae,ee),"Part usage save timed out.",12e3).catch(x=>x);K&&ie.push(`part usage failed: ${K.message}`)}let de=Q.get("photo");if(de&&de.name&&!e.reviewCreatedAttachments){let ae=await a(T(ue.id,de),"Photo upload timed out.",25e3).catch(K=>K);ae&&ie.push(`photo upload failed: ${ae.message}`)}let we=X?"offline":Q.get("asset_status");if(ne.asset_id&&!Z&&(X||z&&we)){let ae=await a(W(ne.asset_id,we),"Equipment status update timed out.",12e3).catch(K=>K);ae?ie.push(`equipment status did not update: ${ae.message}`):await a(R(ue.id,"asset_status_updated",X?"Equipment marked offline/down.":`Equipment status set to ${we}.`),"Activity log timed out.",8e3).catch(K=>ie.push(`history did not update: ${K.message}`))}if(await a(R(ue.id,"quick_fix",z?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ae=>ie.push(`history did not update: ${ae.message}`)),Z&&await a(R(ue.id,"equipment_created",`Equipment created from Quick Fix: ${Z}.`),"Activity log timed out.",8e3).catch(ae=>ie.push(`history did not update: ${ae.message}`)),ge&&f()){let ae=await a(i().from("maintenance_requests").update({status:"converted",reviewed_by:U.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:ue.id}).eq("id",ge).eq("company_id",D),"Request status update timed out.",12e3).catch(K=>({error:K}));ae.error?ie.push(`request status did not update: ${ae.error.message}`):await a(R(ue.id,"request_quick_fixed",z?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(K=>ie.push(`history did not update: ${K.message}`))}$(ue.id),O(null),M(!1),I(!1),E(null),B(null),G(ie.length?`Quick Fix saved with warning: ${ie[0]}`:"Quick Fix saved.",ie.length?"warning":"success"),await ce(),e.reviewCreatedAttachments&&await e.reviewCreatedAttachments(ue.id,(Q.getAll?Q.getAll("photo"):[de]).filter(ae=>ae?.name),D,U.user.id)}catch(Q){re?re.textContent=`Could not log quick fix: ${Q.message||Q}`:pe(Q.message||Q)}finally{te&&te.isConnected&&(te.disabled=!1,te.textContent="Log Quick Fix")}}return{createQuickFix:ye}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof He<"u"&&(He.exports={createQuickFixWorkflow:l})})()});var jt=L((rr,Ge)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let p=n.querySelector("#add-member-form");p&&p.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach(q=>{q.addEventListener("submit",d)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",r);let v=n.querySelector("#password-change-form");v&&v.addEventListener("submit",u);let y=n.querySelector("#team-invite-form");y&&y.addEventListener("submit",o);let k=n.querySelector("#team-invite-link-form");k&&k.addEventListener("submit",f),n.querySelectorAll("[data-revoke-invite-link]").forEach(q=>{q.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(q.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(q=>{q.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(q=>{q.addEventListener("click",()=>i(q.dataset.confirmRevokeInviteLink))});let S=n.querySelector("#request-notification-recipient-form");S&&S.addEventListener("submit",g),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(q=>{q.addEventListener("click",()=>m(q.dataset.deleteRequestNotificationRecipient))})}async function s(p){p.preventDefault();let h=p.currentTarget,v=new t(h),y=String(v.get("role")||"technician").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&y!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}k&&(k.disabled=!0,k.textContent="Adding...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:v.get("user_id"),role:y}),"Team member save timed out.");if(S)throw S;await e.render()}catch(S){e.alertUser(S.message||S)}finally{k?.isConnected&&(k.disabled=!1,k.textContent="Add Member")}}async function d(p){p.preventDefault();let h=p.currentTarget,v=new t(h),y=String(v.get("role")||"").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}k&&(k.disabled=!0,k.textContent="Saving...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:y}),"Role save timed out. Check your connection and try again.",15e3);if(S)throw new Error(S.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":S.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(S){e.showNotice(`Could not save role: ${S.message||S}`,"warning")}finally{k&&(k.disabled=!1,k.textContent="Save Role")}}async function r(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#profile-error"),y=h.querySelector("button[type='submit']"),k=new t(h),S=String(k.get("full_name")||"").trim(),q=h.querySelector('input[name="mobile_tech"]'),A=q?q.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;v&&(v.textContent=""),y&&(y.disabled=!0,y.textContent="Saving...");try{let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:S,mobile_tech:A},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(_)throw e.isMissingColumnError(_,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):_;e.showNotice("Profile saved."),await e.render()}catch(_){v&&(v.textContent=_.message||"Could not save profile.")}finally{y&&(y.disabled=!1,y.textContent="Save Profile")}}async function o(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#team-invite-error"),y=h.querySelector("button[type='submit']"),k=new t(h),S=String(k.get("role")||"technician").trim().toLowerCase();if(v&&(v.textContent=""),!e.getTeamInvitesReady()){v&&(v.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&S!=="technician"){v&&(v.textContent="Only admins can invite managers or admins.");return}y&&(y.disabled=!0,y.textContent="Inviting...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(k.get("email")||"").trim(),invite_role:S,invite_default_location_id:k.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(q)throw q.message.includes("create_company_invite")||e.isColumnSchemaError(q,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):q;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(q){v&&(v.textContent=q.message||"Could not create invite.")}finally{y&&(y.disabled=!1,y.textContent="Create Invite")}}async function c(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:p}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function u(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#password-change-error"),y=h.querySelector("button[type='submit']"),k=new t(h),S=String(k.get("password")||""),q=String(k.get("confirmPassword")||"");if(v&&(v.textContent=""),S.length<8){v&&(v.textContent="Password must be at least 8 characters.");return}if(S!==q){v&&(v.textContent="Passwords do not match.");return}y&&(y.disabled=!0,y.textContent="Updating...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:S}),"Password update timed out. Check your connection and try again.",15e3);if(A)throw A;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(A){v&&(v.textContent=A.message||"Could not update password.")}finally{y&&(y.disabled=!1,y.textContent="Update Password")}}async function f(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#team-invite-link-error"),y=h.querySelector("button[type='submit']"),k=new t(h),S=String(k.get("role")||"technician").trim().toLowerCase();if(v&&(v.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let q="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(q),v&&(v.textContent=q);return}if(S==="admin"){let q="Admin join links are not allowed.";e.setTeamInviteLinkError(q),v&&(v.textContent=q);return}if(!e.canAdministerTeamRoles?.()&&S!=="technician"){let q="Managers can only create technician join links.";e.setTeamInviteLinkError(q),v&&(v.textContent=q);return}y&&(y.disabled=!0,y.textContent="Creating...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:S,link_location_id:k.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(q)throw q.message.includes("create_company_invite_link")||e.isColumnSchemaError(q,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):q;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(q){let A=q.message||"Could not create join link.";e.setTeamInviteLinkError(A),v&&(v.textContent=A)}finally{y&&(y.disabled=!1,y.textContent="Create Join Link")}}async function i(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:p}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function g(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#request-notification-recipient-error"),y=h.querySelector("button[type='submit']"),k=new t(h);if(v&&(v.textContent=""),!e.canAdministerTeamRoles?.()){let S="Only admins can change request email routing.";e.setRequestNotificationRecipientError(S),v&&(v.textContent=S);return}if(!e.getRequestNotificationRecipientsReady()){v&&(v.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}y&&(y.disabled=!0,y.textContent="Adding...");try{let S=String(k.get("email")||"").trim().toLowerCase(),{error:q}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:k.get("location_id")||null,email:S,label:String(k.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(q)throw e.isColumnSchemaError(q,["request_notification_recipients"])||q.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):q;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(S){let q=S.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(q),v&&(v.textContent=q)}finally{y&&(y.disabled=!1,y.textContent="Add Recipient")}}async function m(p){if(!(!p||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",p),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:s,updateCompanyMemberRole:d,updateMyProfile:r,updateMyPassword:u,createTeamInvite:o,cancelTeamInvite:c,createTeamInviteLink:f,revokeTeamInviteLink:i,createRequestNotificationRecipient:g,deleteRequestNotificationRecipient:m}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Ge<"u"&&(Ge.exports={createTeamWorkflow:l})})()});var zt=L((ar,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let o=n.querySelector("#company-settings-form");o&&o.addEventListener("submit",s);let c=n.querySelector("#location-form");c&&c.addEventListener("submit",d);let u=n.querySelector("#public-app-url-form");u&&u.addEventListener("submit",r)}async function s(o){o.preventDefault();let c=o.currentTarget,u=c.querySelector("button[type='submit']"),f=new t(c);u&&(u.disabled=!0,u.textContent="Saving...");try{let{error:i}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(i)throw i;e.showNotice("Company saved."),await e.render()}catch(i){e.showNotice(`Could not save company: ${i.message||i}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Save Company")}}async function d(o){o.preventDefault();let c=o.currentTarget,u=n.querySelector("#location-error"),f=c.querySelector("button[type='submit']"),i=String(new t(c).get("name")||"").trim();if(i){u&&(u.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:g,error:m}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),i),"Location save timed out. Check your connection and try again.",15e3);if(m)throw e.isColumnSchemaError(m,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?m.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(g.id),e.persistActiveLocationId(g.id),e.showNotice("Location added."),await e.render()}catch(g){u&&(u.textContent=g.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function r(o){o.preventDefault();let c=n.querySelector("#public-request-link-error"),u=String(new t(o.currentTarget).get("public_app_url")||"").trim();if(c&&(c.textContent=""),!u){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(u);if(!f){c&&(c.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:s,createLocation:d,savePublicAppUrl:r}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof Ye<"u"&&(Ye.exports={createCompanySettingsWorkflow:l})})()});var Vt=L((or,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.FormDataCtor||FormData,s=e.confirmUser||(m=>t.confirm(m)),d=new Map,r=new Set;function o(){let m=n.querySelector("#app-issue-report-form");m&&m.addEventListener("submit",f),n.querySelectorAll("[data-app-issue-status]").forEach(p=>{p.addEventListener("submit",i)}),n.querySelectorAll("[data-delete-app-issue]").forEach(p=>{p.addEventListener("click",g)})}async function c(){let m=e.getActiveCompanyId(),p=e.getSession()?.user?.id,{data:h,error:v}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),m),"App issue report load timed out. Check your connection and try again.",12e3);if(!(m!==e.getActiveCompanyId()||p!==e.getSession()?.user?.id)&&(e.setAppIssueReportsReady(!v),e.setAppIssueReports(v?[]:h||[]),v))throw v}function u(m){let p=e.appIssueReportErrorState(m);return p.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),p.message}async function f(m){m.preventDefault();let p=m.currentTarget,h=n.querySelector("#app-issue-report-error"),v=p.querySelector("button[type='submit']"),y=new a(p),k=e.getActiveCompanyId(),S=e.getSession()?.user?.id,q=`${S}:${k}`;if(r.has(q))return;let A=()=>k===e.getActiveCompanyId()&&S===e.getSession()?.user?.id,_,w=!1;r.add(q),h&&(h.textContent=""),v&&(v.disabled=!0,v.textContent="Sending...");try{let b={company_id:k,location_id:e.activeLocationDatabaseId(),reporter_id:S,screen:String(y.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(y.get("severity")||"normal"),title:e.requiredText(y.get("title"),"Short title").slice(0,140),details:e.requiredText(y.get("details"),"Details"),status:"open"};_=JSON.stringify(b),d.has(_)||d.set(_,crypto.randomUUID()),b.id=d.get(_);let{error:P}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),b),"App issue report save timed out. Check your connection and try again.",15e3);if(P)throw P;if(w=!0,!A())return;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await c(),A()&&e.renderWorkspace()}catch(b){if(!A())return;w?(e.showNotice("Issue report sent, but the report list could not reload.","warning"),e.renderWorkspace()):h&&(h.textContent=u(b))}finally{r.delete(q),w&&d.delete(_),v?.isConnected&&(v.disabled=!1,v.textContent="Send Report")}}async function i(m){if(m.preventDefault(),!e.canManageTeam())return;let p=m.currentTarget,h=p.querySelector("button[type='submit']"),v=new a(p);h&&(h.disabled=!0,h.textContent="Saving...");try{let y=String(v.get("status")||"open"),{error:k}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),p.dataset.appIssueStatus,y),"Issue report status save timed out. Check your connection and try again.",12e3);if(k)throw k;e.showNotice("Issue report updated."),await c(),e.renderWorkspace()}catch(y){e.showNotice(`Could not update issue report: ${u(y)}`,"warning")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Save")}}async function g(m){if(m.preventDefault(),!e.canManageTeam())return;let p=m.currentTarget,h=p.dataset.deleteAppIssue;if(!h||!s("Delete this app issue report? This cannot be undone."))return;p.disabled=!0;let v=p.textContent;p.textContent="Deleting...";try{let{error:y}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),h),"Issue report delete timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report deleted."),await c(),e.renderWorkspace()}catch(y){e.showNotice(`Could not delete issue report: ${u(y)}`,"warning")}finally{p?.isConnected&&(p.disabled=!1,p.textContent=v||"Delete")}}return{bindAppIssueWorkflowEvents:o,reloadAppIssueReports:c,appIssueReportError:u,createAppIssueReport:f,updateAppIssueReportStatus:i,deleteAppIssueReport:g}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Ke<"u"&&(Ke.exports={createAppIssueWorkflow:l})})()});var Ht=L((ir,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.CSSRef||CSS;async function s(u){let f=n.querySelector("#public-request-link-error"),i=n.querySelector(`[data-create-public-request-link="${a.escape(u)}"]`);f&&(f.textContent=""),i&&(i.disabled=!0,i.textContent="Creating...");try{let{error:g}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:u}),"QR link save timed out. Check your connection and try again.",15e3);if(g)throw e.setPublicRequestLinksReady(!1),new Error(g.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":g.message);e.showNotice("Location request QR link ready."),await e.render()}catch(g){f&&(f.textContent=g.message||"Could not create QR request link.")}finally{i&&(i.disabled=!1,i.textContent="Create QR Link")}}async function d(u){if(!e.canAdministerPublicRequestLinks()){let i=n.querySelector("#public-request-link-error");i&&(i.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await r(u,!1)}async function r(u,f){if(!e.canAdministerPublicRequestLinks()){let i=n.querySelector("#public-request-link-error");i&&(i.textContent="Only admins can reactivate or disable posted QR request links.");return}await c(u,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function o(u){if(!e.canAdministerPublicRequestLinks()){let i=n.querySelector("#public-request-link-error");i&&(i.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await c(u,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function c(u,f,i){let g=n.querySelector("#public-request-link-error");if(g&&(g.textContent=""),!e.canAdministerPublicRequestLinks()){g&&(g.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!u||!e.getActiveCompanyId()){g&&(g.textContent="Select a company before updating request links.");return}try{let{data:m,error:p}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(p){g&&(g.textContent=p.message);return}if(!m?.length){g&&(g.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(i),await e.render()}catch(m){g&&(g.textContent=m.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:d,setPublicRequestLinkActive:r,regeneratePublicRequestLink:o,updatePublicRequestLink:c}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof Je<"u"&&(Je.exports={createPublicRequestLinkWorkflow:l})})()});var Gt=L((sr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=new WeakMap;function s(g,m){let p=e.getParts().find(h=>h.id===m);p&&!a.has(g)&&a.set(g,{id:m,companyId:e.getActiveCompanyId(),quantity_on_hand:Number(p.quantity_on_hand)||0})}function d(g){if(!g||g.companyId!==e.getActiveCompanyId())throw new Error("Reopen this part before saving.")}function r(){let g=n.querySelector("#create-part-form");g&&g.addEventListener("submit",o),n.querySelectorAll("[data-restock-part]").forEach(m=>{s(m,m.dataset.restockPart),m.addEventListener("submit",c)}),n.querySelectorAll("[data-use-part]").forEach(m=>{s(m,m.dataset.usePart),m.addEventListener("submit",u)}),n.querySelectorAll("[data-edit-part]").forEach(m=>{s(m,m.dataset.editPart),m.addEventListener("submit",f)}),n.querySelectorAll("[data-rename-part-source]").forEach(m=>{m.addEventListener("submit",i)})}async function o(g){g.preventDefault();let m=g.currentTarget,p=n.querySelector("#part-create-error"),h=m.querySelector("button[type='submit']"),v=new t(m);p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Adding...");let y;try{let k={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(v.get("name")||"").trim(),sku:String(v.get("sku")||"").trim()||null,supplier_name:String(v.get("supplier_name")||"").trim()||null,machine_note:String(v.get("machine_note")||"").trim()||null,quantity_on_hand:Number(v.get("quantity_on_hand"))||0,reorder_point:Number(v.get("reorder_point"))||0,unit_cost:Number(v.get("unit_cost"))||0};if(!k.company_id)throw new Error("Choose a company before adding parts.");if(!k.name)throw new Error("Part name is required.");let S=new Promise((_,w)=>{y=setTimeout(()=>w(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:q,error:A}=await Promise.race([e.supabaseClient().from("parts").insert(k).select("id").single(),S]);if(clearTimeout(y),A&&e.isMissingColumnError(A,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(A&&e.isMissingColumnError(A,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(A&&e.isMissingColumnError(A,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(A&&e.isMissingColumnError(A,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(A)throw A;e.setActivePartId(q?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),m.reset(),await e.render()}catch(k){p&&(p.textContent=k.message||"Could not add part.")}finally{y&&clearTimeout(y),h&&h.isConnected&&(h.disabled=!1,h.textContent="Add Part")}}async function c(g){g.preventDefault();let m=g.target,p=m.querySelector("button[type='submit']"),h=a.get(m),v=Number(new t(m).get("quantity"))||0;if(!h||v<=0)return;let y=p?.textContent||"Restock";p&&(p.disabled=!0,p.textContent="Saving...");try{d(h);let{data:k,error:S}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(h.quantity_on_hand)||0)+v}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(h.quantity_on_hand)||0).select("id"),"Part restock timed out. Check your connection and try again.",15e3);if(S)throw S;if(!k?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part restocked."),await e.render()}catch(k){e.showNotice(`Could not restock part: ${k.message||k}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=y)}}async function u(g){g.preventDefault();let m=g.currentTarget,p=m.querySelector("button[type='submit']"),h=a.get(m),v=Number(new t(m).get("quantity"))||0;if(!h||v<=0)return;let y=p?.textContent||"Use";p&&(p.disabled=!0,p.textContent="Saving...");try{d(h);let k=Number(h.quantity_on_hand)||0;if(v>k)throw new Error("Quantity used exceeds the stock on hand.");let S=k-v,{data:q,error:A}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:S}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",k).select("id"),"Part use save timed out. Check your connection and try again.",15e3);if(A)throw A;if(!q?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part used."),await e.render()}catch(k){e.showNotice(`Could not use part: ${k.message||k}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=y)}}async function f(g){g.preventDefault();let m=g.currentTarget,p=m.dataset.editPart,h=n.querySelector(`[data-part-edit-error="${p}"]`),v=m.querySelector("button[type='submit']"),y=new t(m);h&&(h.textContent="");let k=v?.textContent||"Save Part";v&&(v.disabled=!0,v.textContent="Saving...");let S={name:String(y.get("name")||"").trim(),sku:y.get("sku")||null,supplier_name:y.get("supplier_name")||null,machine_note:y.get("machine_note")||null,quantity_on_hand:Number(y.get("quantity_on_hand"))||0,reorder_point:Number(y.get("reorder_point"))||0,unit_cost:Number(y.get("unit_cost"))||0};try{if(!S.name)throw new Error("Part name is required.");let q=a.get(m);if(d(q),q.id!==p)throw new Error("Reopen this part before saving.");let{data:A,error:_}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(S).eq("id",p).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(q.quantity_on_hand)||0).select("id"),"Part save timed out. Check your connection and try again.",15e3);if(_&&e.isMissingColumnError(_,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(_&&e.isMissingColumnError(_,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(_&&e.isMissingColumnError(_,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(_)throw _;if(!A?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(q){h&&(h.textContent=q.message||"Could not save part.")}finally{v&&(v.disabled=!1,v.textContent=k)}}async function i(g){g.preventDefault();let m=g.currentTarget,p=n.querySelector("#part-source-error"),h=m.querySelector("button[type='submit']"),v=new t(m),y=String(v.get("old_source")||"").trim(),k=String(v.get("new_source")||"").trim();if(p&&(p.textContent=""),!!y){if(!e.getPartSuppliersReady()){p&&(p.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(y===k){p&&(p.textContent="Change the source name before saving.");return}h&&(h.disabled=!0,h.textContent="Renaming...");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:k||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",y),"Part source rename timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingColumnError(S,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?S.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(S){p&&(p.textContent=S.message||"Could not update part source.")}finally{h&&(h.disabled=!1,h.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:o,restockPart:c,usePartFromInventory:u,updatePart:f,renamePartSource:i}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof Ze<"u"&&(Ze.exports={createPartInventoryWorkflow:l})})()});var Yt=L((cr,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(d){d.preventDefault();let r=d.target,o=r.querySelector("button[type='submit']"),c=n.querySelector("#quick-update-error"),u=e.getWorkOrders().find(i=>i.id===e.getActiveWorkOrderId()),f=new t(r);o.disabled=!0,o.textContent="Saving...",c&&(c.textContent="");try{let i=f.get("asset_id")||null,g=String(f.get("new_asset_name")||"").trim();if(i&&g)throw new Error("Choose existing equipment or create new equipment, not both.");if(g){let{data:S,error:q}=await e.createQuickFixAsset(g,"running");if(q){o.disabled=!1,o.textContent="Save Quick Update",c&&(c.textContent=`Could not add equipment: ${q.message}`);return}i=S.id}if(!g&&!e.confirmAssetLocationRouting(i,"saving this work update",c))return;let m={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(u?.description||"",f.get("assigned_to")),asset_id:i,location_id:e.locationIdForAsset(i),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(m);let p=f.get("safety_devices_checked")==="on",h=(u?.procedure_template_id||"")!==(m.procedure_template_id||"");if(m.status==="completed"&&(u?.status!=="completed"||h)){let S=e.productionActionCompletionMessage?.(u)||"";if(S){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),S),o.disabled=!1,o.textContent="Save Quick Update",c&&(c.textContent=S);return}let q=e.blocksProcedureCompletion(u,m.procedure_template_id||null);if(q){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),q),o.disabled=!1,o.textContent="Save Quick Update",c&&(c.textContent=q);return}if(e.applySafetyCheckPayload(m,p),e.requiresSafetyDeviceCheck(m)&&!m.safety_devices_checked){o.disabled=!1,o.textContent="Save Quick Update",c&&(c.textContent="Check safety devices before completing work tied to equipment.");return}u?.status!=="completed"&&(m.completed_at=new Date().toISOString())}m.status!=="completed"?(m.completed_at=null,e.applySafetyCheckPayload(m,!1)):u?.status==="completed"&&e.applySafetyCheckPayload(m,m.safety_check_required&&(p||e.hasCompletedSafetyDeviceCheck(u)));let{error:v}=await e.withOperationTimeout(e.updateWorkOrderSafely(m,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(v){o.disabled=!1,o.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(v)}`);return}let y=[];if(m.asset_id&&f.get("machine_down")==="on"){let S=await e.updateAssetStatus(m.asset_id,"offline");S?y.push(`equipment status did not update: ${S.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let k=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(u,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch(S=>S);g&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${g}.`),"Activity log timed out.",8e3).catch(()=>null),k&&y.push(`history did not update: ${k.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(i){a.error("Quick update save failed",i),o.disabled=!1,o.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${i.message||i}`)}}return{updateWorkOrderQuickView:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var Kt=L((lr,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function d(_){return String(_.get("location_new")||_.get("location_existing")||_.get("location")||"").trim()||null}function r(){return e.getSession?.()?.user?.id||null}function o(_){return(e.getAssets?.()||[]).find(w=>w.id===_)||null}function c(_,w){if(!_)return[];let b={name:"name",asset_code:"serial number",asset_tag:"asset tag",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(b).filter(P=>String(_[P]??"")!==String(w[P]??"")).map(P=>b[P])}function u(_){return e.isMissingColumnError(_,"manufacturer")||e.isMissingColumnError(_,"model")}async function f(_){_.preventDefault();let w=_.currentTarget,b=e.captureCreateDraft?.(w),P=n.querySelector("#asset-create-error");P&&(P.textContent="");let C=w.querySelector("button[type='submit']"),T=C?.textContent||"Add Equipment",W=_.submitter?.dataset?.assetContinue==="true";C&&(C.disabled=!0,C.textContent="Saving...");try{let R=new t(w),$={company_id:e.getActiveCompanyId(),location_id:R.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(R.get("name"),"Equipment name"),asset_code:String(R.get("asset_code")||"").trim()||null,asset_tag:String(R.get("asset_tag")||"").trim()||null,manufacturer:String(R.get("manufacturer")||"").trim()||null,model:String(R.get("model")||"").trim()||null,location:d(R),parent_asset_id:R.get("parent_asset_id")||null,asset_type:R.get("asset_type")||"machine",safety_devices_required:R.get("safety_devices_required")==="on",status:"running",created_by:r()},O=e.supabaseClient().from("assets").insert($).select("id").single(),{data:M,error:I}=await e.withOperationTimeout(O,"Equipment save timed out. Check your connection and try again.",15e3);if(I&&e.isMissingColumnError(I,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(I&&e.isMissingColumnError(I,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(I&&u(I))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(I&&e.isMissingColumnError(I,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(I&&e.isAssetHierarchySchemaError(I))throw new Error(e.equipmentSchemaMessage(I));if(I)throw I;e.clearCreateDraft?.(b),M?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(M.id,"created",`Created ${$.name}.`),W&&M?.id?(e.setActiveAssetId(M.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(R){P?P.textContent=R.message:a(R.message)}finally{C&&(C.disabled=!1,C.textContent=T)}}async function i(_){_.preventDefault();let w=_.currentTarget,b=n.querySelector("#asset-edit-error");b&&(b.textContent="");let P=w.querySelector("button[type='submit']"),C=P?.textContent||"Save Equipment";P&&(P.disabled=!0,P.textContent="Saving...");try{let T=new t(w),W=o(e.getActiveAssetId()),R={name:e.requiredText(T.get("name"),"Equipment name"),asset_code:String(T.get("asset_code")||"").trim()||null,asset_tag:String(T.get("asset_tag")||"").trim()||null,manufacturer:String(T.get("manufacturer")||"").trim()||null,model:String(T.get("model")||"").trim()||null,location_id:T.get("location_id")||e.activeLocationDatabaseId(),location:d(T),parent_asset_id:T.get("parent_asset_id")||null,asset_type:T.get("asset_type")||"machine",safety_devices_required:T.get("safety_devices_required")==="on",status:T.get("status")},{error:$}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(R).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if($&&e.isMissingColumnError($,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if($&&u($))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if($&&e.isMissingColumnError($,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if($&&e.isAssetHierarchySchemaError($))throw new Error(e.equipmentSchemaMessage($));if($)throw $;let O=c(W,R);O.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${O.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(T){b?b.textContent=T.message:a(T.message)}finally{P&&(P.disabled=!1,P.textContent=C)}}async function g(_,w){let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:w}).eq("id",_).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!b&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(_,"status_changed",`Status changed to ${w}.`),b||null}async function m(_){_.preventDefault();let w=_.currentTarget,b=w.dataset.attachAssetPart,P=n.querySelector(`[data-asset-part-error="${s.escape(b)}"]`);P&&(P.textContent="");let C=w.querySelector("button[type='submit']"),T=C?.textContent||"Attach Part";C&&(C.disabled=!0,C.textContent="Attaching...");try{let W=new t(w),R=W.get("part_id");if(!R)throw new Error("Select a part to attach.");let $=Math.max(1,Number(W.get("quantity_recommended"))||1),O=String(W.get("note")||"").trim()||null,{error:M}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:b,part_id:R,quantity_recommended:$,note:O}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(M)throw e.isMissingTableError?.(M,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):M.code==="23505"?new Error("This part is already linked to this equipment."):M;e.showNotice("Part linked to equipment."),await e.render()}catch(W){P?P.textContent=W.message||"Could not link part to equipment.":e.showNotice(W.message||"Could not link part to equipment.","warning")}finally{C&&(C.disabled=!1,C.textContent=T)}}async function p(_){let w=n.querySelector("[data-asset-part-error]");w&&(w.textContent="");try{let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",_).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(b)throw e.isMissingTableError?.(b,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):b;e.showNotice("Part link removed."),await e.render()}catch(b){w?w.textContent=b.message||"Could not remove linked part.":e.showNotice(b.message||"Could not remove linked part.","warning")}}function h(_){return{workOrders:e.getWorkOrders().filter(w=>w.asset_id===_).length,children:e.childAssetsFor(_).length,schedules:e.getPreventiveSchedules().filter(w=>w.asset_id===_).length,requests:e.getMaintenanceRequests().filter(w=>w.asset_id===_).length}}function v(_){let w=h(_);return Object.values(w).some(Boolean)}async function y(_){let[w,b,P]=await Promise.all([k("work_orders",_),k("preventive_schedules",_),k("maintenance_requests",_)]);return{workOrders:w,children:e.childAssetsFor(_).length,schedules:b,requests:P}}async function k(_,w){let{count:b,error:P}=await e.withOperationTimeout(e.supabaseClient().from(_).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",w),`Equipment delete check timed out while checking ${_}.`,15e3);if(P)throw new Error(`Could not verify linked ${_.replaceAll("_"," ")} before deleting equipment: ${P.message}`);if(!Number.isSafeInteger(b)||b<0)throw new Error(`Could not verify linked ${_.replaceAll("_"," ")} before deleting equipment. Try again.`);return b}async function S(_){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let w=n.querySelector("#asset-delete-error");w&&(w.textContent="");try{let b=await y(_),P=e.assetDeleteBlockerMessage(b);if(P){w&&(w.textContent=P);return}e.setPendingDeleteAssetId(_),e.renderWorkspace()}catch(b){w?w.textContent=b.message||"Could not verify equipment links before delete.":e.showNotice(b.message||"Could not verify equipment links before delete.","warning")}}async function q(_){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let w=n.querySelector("#asset-delete-error");w&&(w.textContent="");let b=n.querySelector(`[data-confirm-delete-asset="${s.escape(_)}"]`);b&&(b.disabled=!0,b.textContent="Deleting...");try{let P=await y(_),C=e.assetDeleteBlockerMessage(P);if(C)throw new Error(C);let T=e.getAssetDocumentStoragePaths?.(_)||[];if(T.length){let R=await e.withOperationTimeout(e.removeAssetDocumentStorage(T),"Equipment file cleanup timed out.",15e3);if(R.error)throw new Error(`Could not remove equipment files: ${R.error.message}`)}let{error:W}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",_).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(W)throw new Error(W.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":W.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(P){w&&(w.textContent=P.message||"Could not delete equipment."),b&&(b.disabled=!1,b.textContent="Permanently Delete")}}async function A(_,w="running"){let b={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:_,asset_type:"machine",safety_devices_required:!0,status:w,created_by:r()},P=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(b).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return P.error&&e.isMissingColumnError(P.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(P,e.databaseSetupRequiredMessage("adding equipment in this location"))):P.error&&e.isMissingColumnError(P.error,"created_by")?e.withSetupError(P,"Run supabase/step-next-asset-events.sql before saving equipment history."):P.error&&e.isAssetHierarchySchemaError(P.error)?e.withSetupError(P,e.equipmentSchemaMessage(P.error).replace("saving","adding")):(!P.error&&P.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(P.data.id,"created",`Created ${_}.`),P)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:v,attachAssetPart:m,countAssetLinkedRows:k,createAsset:f,createQuickFixAsset:A,deleteAsset:q,loadAssetDeleteBlockers:y,removeAssetPart:p,requestDeleteAsset:S,updateAsset:i,updateAssetStatus:g}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var Jt=L((ur,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function d(){let g=n.querySelector("#detail-panel");g.innerHTML=e.renderRequestFormContent()}async function r(g){g.preventDefault(),await o(g.target)}async function o(g){let m=n.querySelector("#request-error"),p=g.querySelector("button[type='submit']");m&&(m.textContent=""),p&&(p.disabled=!0,p.textContent="Submitting...");try{let h=new t(g),v=h.get("asset_id")||null,y=String(h.get("equipment_note")||"").trim();if(v&&y)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!v&&!y)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(v,"submitting this request",m))return;let k=y||e.assetNameFor?.(v)||"Saved equipment",S=e.requiredText(h.get("description"),"Request details"),q=e.requiredText(h.get("requester_name"),"Your name"),A={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(v),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${k}

${S}`,asset_id:v,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:q};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:_,error:w}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(A).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(w)throw w;let b=h.get("photo"),P="";if(b&&b.name){let T=await e.addPhotoToMaintenanceRequest(_.id,b);T&&(P=` Photo did not upload: ${T.message||T}`)}let C=await e.notifyRequestEmailer(_.id);C?.error&&console.warn("Request email notification did not send",C.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${P}`,P?"warning":"success"),await e.render()}catch(h){m?m.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{p&&(p.disabled=!1,p.textContent="Submit Request")}}async function c(g){if(!e.getMaintenanceRequests().find(h=>h.id===g))return;let p=n.querySelector(`[data-convert-request="${s.escape(g)}"]`);p&&(p.disabled=!0,p.textContent="Converting...");try{let{data:h,error:v}=await e.withOperationTimeout(e.supabaseClient().rpc("convert_maintenance_request",{target_company_id:e.getActiveCompanyId(),target_request_id:g}),"Request conversion timed out. Check your connection and try again.",15e3);if(v)throw v;if(!h?.id)throw new Error("Conversion did not return a work order. Review the request before retrying.");e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),p&&(p.disabled=!1,p.textContent="Convert to Work Order")}}function u(g){let m=e.getMaintenanceRequests().find(p=>p.id===g);m&&(e.setQuickFixRequestId(g),e.setQuickFixAssetId(m.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(g){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(m=>m.id===g)&&(e.setPendingDeleteRequestId(g),e.renderWorkspace())}async function i(g){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let m=e.getMaintenanceRequests().find(h=>h.id===g);if(!m)return;let p=n.querySelector(`[data-confirm-delete-request="${s.escape(g)}"]`);p&&(p.disabled=!0,p.textContent="Deleting...");try{if(m.photo_storage_path){let k=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([m.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(k.error)throw new Error(`Could not remove request photo: ${k.error.message}`)}let{data:h,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",g).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(v)throw v;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let y=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",g).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(y.error)throw new Error(`Request delete verification failed: ${y.error.message}`);if(y.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:c,createRequest:r,createRequestFromForm:o,deleteMaintenanceRequest:i,openQuickFixForRequest:u,renderRequestForm:d,requestDeleteMaintenanceRequest:f}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var Zt=L((dr,Ee)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert;async function s(d){d.preventDefault();let r=d.target,o=r.querySelector("button[type='submit']"),c=n.querySelector("#create-work-order-error");o.disabled=!0,o.textContent="Creating...",c&&(c.textContent="");try{let u=new t(r),f=u.get("status")||"open",i=u.get("asset_id")||null,g=String(u.get("new_asset_name")||"").trim();if(i&&g)throw new Error("Choose existing equipment or create new equipment, not both.");if(g){let{data:A,error:_}=await e.createQuickFixAsset(g,"running");if(_){c&&(c.textContent=`Could not add equipment: ${_.message}`);return}i=A.id}if(!g&&!e.confirmAssetLocationRouting(i,"creating this work order",c))return;if(f==="completed"&&e.assetRequiresSafety(i)&&u.get("safety_devices_checked")!=="on"){c&&(c.textContent="Check safety devices before creating completed work tied to equipment.");return}let m=f==="completed"?e.blocksProcedureCompletion(null,u.get("procedure_template_id")||null):"";if(m){e.setWorkOrderActionWarning("",""),c&&(c.textContent=`${m} Create the work order first, then complete the checklist before marking it complete.`);return}let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(i),title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),asset_id:i,priority:u.get("priority"),type:u.get("type")||"corrective",due_at:e.workOrderDateValue(u.get("due_at")),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(u.get("actual_minutes"))||0,failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",completion_notes:u.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,f==="completed"&&p.safety_check_required&&u.get("safety_devices_checked")==="on");let{data:h,error:v}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(v){c&&(c.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(v)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),g&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${g}.`);let y=[],k=u.get("part_id");if(k){let A=e.getParts().find(w=>w.id===k),_=await e.addPartUsageToWorkOrder(h.id,A,Number(u.get("quantity_used"))||1);_?y.push(`part usage failed: ${_.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${A?.name||"Part"}.`)}let S=u.get("photo");if(S&&S.name&&!e.reviewCreatedAttachments){let A=await e.addPhotoToWorkOrder(h.id,S);A?y.push(`photo upload failed: ${A.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${S.name}.`)}let q=String(u.get("initial_comment")||"").trim();if(q){let A=await e.addCommentToWorkOrder(h.id,q);A?y.push(`comment failed: ${A.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(y.length?`Work order created with warning: ${y[0]}`:"Work order created.",y.length?"warning":"success"),await e.render(),e.reviewCreatedAttachments&&await e.reviewCreatedAttachments(h.id,(u.getAll?u.getAll("photo"):[S]).filter(A=>A?.name),p.company_id,p.created_by)}catch(u){c?c.textContent=`Could not create work order: ${u.message||u}`:a(u.message||u)}finally{o.disabled=!1,o.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ee<"u"&&Ee.exports&&(Ee.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var Xt=L((pr,Re)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(d){d.preventDefault();let o=d.target.querySelector("button[type='submit']"),c=n.querySelector("#work-order-save-error");o.disabled=!0,o.textContent="Saving...",c&&(c.textContent="");try{let u=new t(d.target),f=e.getActiveWorkOrderId(),i=e.getWorkOrders().find(A=>A.id===f),g=n.querySelector("#status-select")?.value||i?.status||"open",m=u.has("asset_id"),p=m?u.get("asset_id")||null:i?.asset_id||null;if(m&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(p,"saving this work order",c)){o.disabled=!1,o.textContent="Save Work Order";return}let h={title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),due_at:e.workOrderDateValue(u.get("due_at")),status:g,priority:u.get("priority"),type:u.get("type"),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",actual_minutes:Number(u.get("actual_minutes"))||0};if(m&&(h.asset_id=p,h.location_id=e.locationIdForAsset(p)),h.safety_check_required=e.assetRequiresSafety(p),h.status==="completed"){let A=e.productionActionCompletionMessage?.(i)||"";if(A){e.setWorkOrderActionWarning(f,A),o.disabled=!1,o.textContent="Save Work Order",c&&(c.textContent=A);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(i)&&u.get("safety_devices_checked")!=="on"){o.disabled=!1,o.textContent="Save Work Order",c&&(c.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let v=(i?.procedure_template_id||"")!==(h.procedure_template_id||""),y=h.status==="completed"&&(i?.status!=="completed"||v)?e.blocksProcedureCompletion(i,h.procedure_template_id||null):"";if(y){e.setWorkOrderActionWarning(f,y),o.disabled=!1,o.textContent="Save Work Order",c&&(c.textContent=y);return}h.status==="completed"&&i?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(i)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):i?.status==="completed"&&h.safety_check_required&&u.has("safety_devices_checked")?e.applySafetyCheckPayload(h,u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(i)):i?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:k}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,f),"Work order save timed out. Check your connection and try again.",2e4);if(k){o.disabled=!1,o.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(k)}`);return}let S={...Object.fromEntries(u.entries()),status:g},q=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(i,S)),"Activity log timed out.",8e3).catch(A=>A);e.setWorkOrderActionWarning("",""),e.showNotice(q?`Work order saved, but history did not update: ${q.message}`:"Work order saved.",q?"warning":"success"),await e.render()}catch(u){a.error("Work order save failed",u),o.disabled=!1,o.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${u.message||u}`)}finally{o&&o.isConnected&&(o.disabled=!1,o.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof Re<"u"&&Re.exports&&(Re.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var en=L((mr,We)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function a(d){d.preventDefault();let r=d.currentTarget,o=n.querySelector("#parts-used-error"),c=r.querySelector("button[type='submit']");o&&(o.textContent=""),c&&(c.disabled=!0,c.textContent="Recording...");try{let u=new t(r),f=u.get("part_id"),i=Number(u.get("quantity_used"))||1,g=e.getParts().find(p=>p.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!g)throw new Error("Choose a part first.");let m=await s(e.getActiveWorkOrderId(),g,i);if(m)throw m;e.showNotice("Part recorded on work order."),await e.render()}catch(u){o&&(o.textContent=u.message||"Could not record part used.")}finally{c&&(c.disabled=!1,c.textContent="Record Part Used")}}async function s(d,r,o){if(!r)return new Error("Choose a part first.");let{error:c}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:d,p_part_id:r.id,p_quantity:o}),"Part usage save timed out.");return c||null}return{addPartUsageToWorkOrder:s,recordPartUsed:a}}typeof We<"u"&&We.exports&&(We.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var tn=L((fr,Oe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.URLRef||URL,d=e.consoleRef||console,r=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),o=25*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function u(p){p.preventDefault();let h=p.currentTarget,v=n.querySelector("#company-logo-error"),y=h.querySelector("button[type='submit']"),k=new t(h).get("logo");if(v&&(v.textContent=""),!k||!k.name){v&&(v.textContent="Choose a logo image first.");return}y&&(y.disabled=!0,y.textContent="Uploading...");try{let S=g(k);if(S)throw new Error(S);let q=await f(k),A=m(q);if(A)throw new Error(A);let _=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${q.fileName}`,w=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(_,q.blob,{contentType:q.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(w.error)throw new Error(w.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":w.error.message);let{error:b}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:_}),"Company logo record save timed out. Check your connection and try again.",15e3);if(b)throw await e.removeUploadedObject("company-logos",_),new Error(e.isColumnSchemaError(b,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":b.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":b.message);let P=e.getCompanies().find(C=>C.id===e.getActiveCompanyId());P&&(P.logo_path=_,P.logoUrl=s.createObjectURL(q.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(S){v&&(v.textContent=S.message||"Could not upload logo.")}finally{y&&(y.disabled=!1,y.textContent="Upload Logo")}}async function f(p){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(p);let h=i(p);try{if(!r)throw new Error("Browser logo optimization is unavailable.");let v=await r(p),k=Math.min(1,1200/Math.max(v.width,v.height)),S=Math.max(1,Math.round(v.width*k)),q=Math.max(1,Math.round(v.height*k)),A=n.createElement("canvas");A.width=S,A.height=q;let _=A.getContext("2d",{alpha:!0});_.clearRect(0,0,S,q),_.drawImage(v,0,0,S,q),v.close&&v.close();let w=await new Promise(b=>A.toBlob(b,"image/png"));if(!w)throw new Error("Browser could not optimize this logo.");return{blob:w,fileName:`${e.fileBaseName(p.name||"logo")}.png`,contentType:"image/png"}}catch(v){return d.warn("Logo optimization failed; uploading original.",v),{blob:p,fileName:e.safeFileName(p.name||"logo"),contentType:h}}}function i(p){let h=String(p?.type||"").trim().toLowerCase();if(h)return h;let v=String(p?.name||"").toLowerCase();return/\.(jpe?g)$/.test(v)?"image/jpeg":/\.png$/.test(v)?"image/png":/\.webp$/.test(v)?"image/webp":/\.gif$/.test(v)?"image/gif":/\.heic$/.test(v)?"image/heic":/\.heif$/.test(v)?"image/heif":/\.avif$/.test(v)?"image/avif":/\.bmp$/.test(v)?"image/bmp":/\.tiff?$/.test(v)?"image/tiff":"application/octet-stream"}function g(p){let h=i(p);return c.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function m(p){return c.has(String(p?.contentType||"").toLowerCase())?Number(p?.blob?.size||0)>o?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:u}}typeof Oe<"u"&&Oe.exports&&(Oe.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var nn=L((gr,Xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,a=e.alertUser||alert;function s(o){return e.partUsageRows(o).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(o).length?"This part is linked to equipment and is kept for traceability.":""}function d(o){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(i=>i.id===o))return;let u=s(o);if(u){a(u);return}let f=!!n.querySelector(`[data-delete-part="${t.escape(o)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===o||f){r(o);return}e.setPendingDeletePartId(o),e.renderWorkspace()}async function r(o){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let c=e.getParts().find(g=>g.id===o),u=n.querySelector("#part-delete-error");if(u&&(u.textContent=""),!c)return;let f=s(o);if(f){u&&(u.textContent=f);return}let i=n.querySelector(`[data-delete-part="${t.escape(o)}"].permanent-delete-button`);i&&(i.disabled=!0,i.textContent="Deleting...");try{let g=(e.getPartDocumentsByPartId()[o]||[]).map(v=>v.storage_path).filter(Boolean);if(g.length){let v=await e.withOperationTimeout(e.removePartDocumentStorage(g),"Part document cleanup timed out. Try deleting again.",15e3);if(v.error)throw new Error(`Could not remove filed receipts/invoices: ${v.error.message}`)}let{data:m,error:p}=await e.withOperationTimeout(e.deletePartRecord(o),"Part delete timed out. Check your connection and try again.",15e3);if(p)throw new Error(p.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":p.message);if(!m?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(o),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(g){e.showNotice(g.message||"Could not delete part.","warning"),u&&(u.textContent=g.message||"Could not delete part."),i&&(i.disabled=!1,i.textContent="Permanently Delete")}}return{deletePart:r,requestDeletePart:d}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof Xe<"u"&&(Xe.exports={createPartDeleteWorkflow:l})})()});var rn=L((hr,et)=>{(function(){function l(t,a){return t?.response_type==="checkbox"?a===!0||a==="checked"?"checked":"":String(a??"").trim()}function e(t,a){let s=l(t,a);return s?t?.response_type==="checkbox"?s==="checked":t?.response_type==="pass_fail"?s==="pass"||s==="fail":t?.response_type==="number"?Number.isFinite(Number(s)):!0:!1}let n={normalizeChecklistResponseValue:l,isChecklistStepAnswered:e};typeof window<"u"&&(window.MaintainOpsChecklistResponseValues=n),typeof et<"u"&&(et.exports=n)})()});var an=L((yr,tt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function s(u,f){let{data:i,error:g}=await e.withOperationTimeout(e.getPublicRequestIntake(u),f);return{data:Array.isArray(i)?i[0]:i,error:g}}async function d(u){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:g,error:m}=await s(u,"Request QR lookup timed out.");if(f=g,m||!f){o("This QR code link is inactive or invalid.");return}}catch{o("This QR code link is inactive or invalid.");return}let i=e.publicRequestUrl(u);e.setAppHtml(e.publicRequestQrPage(f,i)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,i)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function r(u){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:i,error:g}=await s(u,"Request form lookup timed out.");if(g){o("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=i}catch(i){o(i.message||"This request link could not be loaded.");return}if(!f){o("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),n.querySelector("#public-request-form").addEventListener("submit",i=>c(i,u,f))}function o(u){e.setAppHtml(e.publicRequestError(u))}async function c(u,f,i){u.preventDefault();let g=u.currentTarget,m=new a(g),p=n.querySelector("#public-request-error"),h=g.querySelector("button[type='submit']");p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:v,error:y}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(m.get("title"),"Request title"),equipment_note:e.requiredText(m.get("equipment_note"),"Machine / area"),request_description:e.requiredText(m.get("description"),"Request details"),requester_name:e.requiredText(m.get("requester_name"),"Your name"),requester_contact:String(m.get("requester_contact")||"").trim()||null,request_priority:m.get("priority")||"medium"}),"Request send timed out.");if(y)throw y;let k=m.get("photo"),S="";if(k&&k.name){let A=await e.addPhotoToMaintenanceRequest(v,k);A&&(S=`Request sent, but the photo did not upload: ${A.message||A}`)}let q=await e.notifyRequestEmailer(v);q.error&&e.warn("Request email notification did not send",q.error),e.setAppHtml(e.publicRequestSuccess(i,S)),n.querySelector("#public-request-another").addEventListener("click",()=>r(f))}catch(v){p&&(p.textContent=v.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:o,renderPublicRequestIntake:r,renderPublicRequestQrPage:d,submitPublicRequest:c}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof tt<"u"&&(tt.exports={createPublicRequestIntakeWorkflow:l})})()});var on=L((vr,nt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(d){d.preventDefault();let r=d.target,o=r.querySelector("button[type='submit']"),c=n.querySelector("#company-error"),u=String(new t(r).get("name")||"").trim();o.disabled=!0,o.textContent="Creating...",c.textContent="";try{if(!u)throw new Error("Company name is required.");let f=e.getCompanies().find(p=>p.name.trim().toLowerCase()===u.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:i,error:g}=await e.withOperationTimeout(e.createCompanyRecord(u),"Company creation timed out.");if(g){c.textContent=g.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":g.message;return}if(e.setActiveCompanyId(i),e.persistActiveCompanyId(i),!await e.ensureProfileForActiveCompany(u))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){c.textContent=f.message||"Could not create company."}finally{o?.isConnected&&(o.disabled=!1,o.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof nt<"u"&&(nt.exports={createCompanySetupWorkflow:l})})()});var sn=L((br,rt)=>{(function(){function l(e={}){let n=new Set;function t(){let d=e.getScope?.();return()=>e.getScope?.()===d}async function a(d){let r=d.target,o=e.getActiveWorkOrderId();if(r.disabled||n.has(o))return;let c=t(),u=e.getWorkOrders().find(f=>f.id===o);r.disabled=!0;try{!await s(o,r.value)&&c()&&(r.value=u?.status||"open")}catch(f){c()&&(r.value=u?.status||"open",e.showNotice(`Could not update status: ${f.message||f}`,"warning"))}finally{r.disabled=!1}}async function s(d,r){if(n.has(d))return!1;let o=t(),c=d&&e.getWorkOrders().find(f=>f.id===d);if(!c)return e.showNotice("This work order is no longer available. Refresh and try again.","warning"),!1;n.add(d);let u=!1;try{if(r==="completed"){let h=e.productionActionCompletionMessage?.(c)||"";if(h)return e.setActiveWorkOrderId(d),e.setWorkOrderActionWarning(d,h),e.showNotice(h,"warning"),await e.render(),!1;let v=e.blocksProcedureCompletion(c);if(v)return e.setActiveWorkOrderId(d),e.setWorkOrderActionWarning(d,v),e.showNotice(v,"warning"),await e.render(),!1}let f=e.currentSafetyCheckboxCheckedForWorkOrder(d),i=e.hasCompletedSafetyDeviceCheck(c)||f;if(r==="completed"&&e.requiresSafetyDeviceCheck(c)&&!i){e.setActiveWorkOrderId(d);let h="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(d,h),e.showNotice(h,"warning"),await e.render(),!1}let g={status:r,asset_id:c.asset_id||null,completed_at:r==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(g),r==="completed"?e.applySafetyCheckPayload(g,g.safety_check_required&&i):r!=="completed"&&e.applySafetyCheckPayload(g,!1),delete g.asset_id;let{error:m}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,d),"Status save timed out. Check your connection and try again.",15e3);if(m)return o()&&e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(m)}`,"warning"),!1;if(u=!0,!o())return!0;let p;try{p=(await e.recordWorkOrderEvent(d,"status_changed",`Status changed to ${e.statusLabel(r)}.`))?.error}catch(h){p=h||new Error("History save failed.")}return o()&&(e.setActiveWorkOrderId(d),e.setWorkOrderActionWarning("",""),p?e.showNotice(`Status changed to ${e.statusLabel(r)}, but history could not be saved: ${p.message||p}`,"warning"):e.showNotice(`Status changed to ${e.statusLabel(r)}.`),await e.render()),!0}catch(f){if(o()){let i=u?`Status changed to ${e.statusLabel(r)}, but the view could not be refreshed: ${f.message||f}`:`Could not update status: ${f.message||f}`;e.showNotice(i,"warning")}return u}finally{n.delete(d)}}return{setWorkOrderStatus:s,updateWorkOrderStatus:a}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof rt<"u"&&(rt.exports={createWorkOrderStatusWorkflow:l})})()});var cn=L((wr,xe)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function a(c,u){return c?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${u}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${u}"]`)||null}async function s({workOrderId:c,payload:u,source:f,busyText:i,successMessage:g}){let m=f?.querySelector?.("button[type='submit']")||f,p=m?.textContent||"",h=a(f,c);m&&(m.disabled=!0,m.textContent=i),h&&(h.textContent="");try{let v=await e.withOperationTimeout(e.updateProductionActionRecord(c,u),"Production Action save timed out. Check your connection and try again.",15e3);if(v.error){let y=e.friendlyWorkOrderSaveError(v.error);return h?h.textContent=`Could not save Production Action: ${y}`:e.showNotice(`Could not save Production Action: ${y}`,"warning"),!1}return e.showNotice(g,"success"),await e.afterProductionActionMutation(v.data,c),!0}catch(v){let y=v.message||String(v);return h?h.textContent=`Could not save Production Action: ${y}`:e.showNotice(`Could not save Production Action: ${y}`,"warning"),!1}finally{m?.isConnected&&(m.disabled=!1,m.textContent=p)}}async function d(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.productionActionForm,i=new n(u),g=String(i.get("production_action")||"").trim(),m=String(i.get("production_action_assigned_to")||"").trim(),p=a(u,f);if(!g||!m){p&&(p.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(f);await s({workOrderId:f,payload:{production_action:g,production_action_assigned_to:m},source:u,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function r(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.workOrderId,i=u.dataset.productionActionStatus;await s({workOrderId:f,payload:{production_action_status:i},source:u,busyText:i==="completed"?"Completing...":"Reopening...",successMessage:i==="completed"?"Production Action completed.":"Production Action reopened."})}async function o(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:f,payload:{production_action:null},source:u,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:d,setProductionActionStatus:r,removeProductionAction:o}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof xe<"u"&&xe.exports&&(xe.exports={createProductionActionWorkflow:l})})()});var ln=L((kr,at)=>{(function(){function l(e={}){async function n(s,d={}){let r=s.filter(f=>f.id&&!f.read_at);if(!r.length)return!0;let o=new Map(r.map(f=>[f.id,f])),c=new Date().toISOString(),u=r.map(f=>f.id);e.setNotifications(e.getNotifications().map(f=>o.has(f.id)?{...f,read_at:c}:f)),d.render!==!1&&e.renderWorkspace();try{let f=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,u,c),"Work notification update timed out.",1e4);if(f.error)throw f.error;return!0}catch(f){return e.setNotifications(e.getNotifications().map(i=>o.get(i.id)||i)),e.showNotice(`Could not mark the work notification read: ${f.message||f}`,"warning"),d.render!==!1&&e.renderWorkspace(),!1}}function t(s,d={}){let r=e.getNotifications().find(o=>o.id===s);return r?.read_at?Promise.resolve(!0):n([r||{id:s,read_at:null}],d)}function a(s,d={}){return n(e.getNotifications().filter(r=>r.work_order_id===s),d)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:a}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:l},typeof at<"u"&&(at.exports={createWorkOrderNotificationWorkflow:l})})()});var un=L((_r,ot)=>{(function(){function l(e){async function n(t,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(d=>d.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let d=e.workOrderDateValue(a);if(!d)throw new Error("Choose a due date.");let r=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:d},t),"Due date save timed out. Check your connection and try again.");if(r.error)throw r.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(o=>o.id===t?{...o,due_at:d}:o)),e.setWorkOrders(e.getWorkOrders().map(o=>o.id===t?{...o,due_at:d}:o)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${d} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:d}}catch(d){return e.showNotice(`Could not set due date: ${d.message||d}`,"warning"),{saved:!1,reason:"save_failed",error:d}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof ot<"u"&&(ot.exports={createPlanningDueDateWorkflow:l})})()});var dn=L((Sr,it)=>{(function(){function l(n,t,a,s=50){let d=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",a).order("created_at",{ascending:!1}).limit(d)}function e(n,t,a,s){let d=[...new Set((a||[]).filter(Boolean))];return d.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",d).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e},typeof it<"u"&&(it.exports={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e})})()});var pn=L((qr,st)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:a||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof st<"u"&&(st.exports={notifyRequestEmailer:l})})()});var mn=L(($r,ct)=>{(function(){async function l(n,t,a=[],s={}){let d=s.pathKey||"storage_path",r=s.urlKey||"signedUrl",o=s.expiresIn||600,c=s.onError;await Promise.all(a.map(async u=>{let f=u?.[d];if(!f)return;let{data:i,error:g}=await n.storage.from(t).createSignedUrl(f,o);if(g){u[r]="",typeof c=="function"&&c(u,g);return}u[r]=i?.signedUrl||""}))}function e(n={}){function t(a){if(!a||!n.getReady())return;let d=(n.getRows(a)||[]).filter(o=>o.storage_path&&!o.signedUrl),r=n.getSigningMap();!d.length||r[a]||(r[a]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,d),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(o=>{n.warn("Could not load signed file links",o)}).finally(()=>{delete r[a],n.getActiveGroupId()===a&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof ct<"u"&&(ct.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var fn=L((Cr,lt)=>{(function(){function l(t,a){if(t[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return t[a]}function e(t={}){let a=l(t,"supabaseClient"),s=l(t,"workspaceUiState"),d=l(t,"applyRequestQueryFilters"),r=l(t,"applyWorkOrderListFilters"),o=l(t,"applyWorkOrderFilters"),c=l(t,"selectWorkOrders"),u=l(t,"countWorkOrdersQuery"),f=l(t,"fetchExactSearchedWorkOrderPage"),i=l(t,"isColumnSchemaError"),g=t.warn||(()=>{}),m=l(t,"LIST_ITEMS_PER_PAGE"),p=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),v=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),y=l(t,"REQUEST_FALLBACK_SELECT"),k=l(t,"WORK_ORDER_RELATION_SELECT"),S=l(t,"WORK_ORDER_FALLBACK_SELECT");function q(){return typeof a=="function"?a():a}async function A(W=s.getRequestViewFilter(),R={}){let $=Math.max(1,s.getRequestsPage()),O=($-1)*m,M=O+m-1,I=R.includeRelations===!1?y:R.includeLocationRelation===!1?v:h,E=await d(q().from("maintenance_requests").select(I,{count:"exact"}),W).order("created_at",{ascending:!1}).range(O,M);return E.error&&R.includeLocationRelation!==!1&&i(E.error,["location_id","locations"])?A(W,{includeLocationRelation:!1}):E.error&&R.includeRelations!==!1?A(W,{includeRelations:!1}):!E.error&&E.count&&$>1&&O>=E.count?(s.setRequestsPage(Math.max(1,Math.ceil(E.count/m))),A(W,R)):E}async function _(W){let R=await d(q().from("maintenance_requests").select("id",{count:"exact",head:!0}),W);return R.error?(g("Request count failed",R.error),0):R.count||0}async function w(){let[W,R,$]=await Promise.all([_("active"),_("converted"),_("all")]);return{active:W,converted:R,all:$}}async function b(W={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return f(W);let R=Math.max(1,s.getWorkOrderPage()),$=(R-1)*p,O=$+p-1,M=W.includeLocationRelation===!1?S:k,I=await r(c(q(),M,{count:"exact"})).range($,O);return!I.error&&I.count&&R>1&&$>=I.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(I.count/p))),b(W)):I}async function P(W={}){let R=await o(u(q()),W);return R.error?(g("Work order count failed",R.error),0):R.count||0}async function C(){let[W,R,$,O,M,I,E,B]=await Promise.all([P({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),P({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:W,newWork:R,inProgress:$,blocked:O,overdue:M,completedAll:I,completedMonth:E,completedWeek:B}}async function T(){let[W,R,$,O,M,I,E,B]=await Promise.all([P({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),P({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:W,newWork:R,inProgress:$,blocked:O,overdue:M,completedAll:I,completedMonth:E,completedWeek:B}}return{fetchRequestPage:A,countRequests:_,loadRequestDashboardCounts:w,fetchWorkOrderPage:b,countWorkOrders:P,loadWorkOrderDashboardCounts:C,loadMyWorkDashboardCounts:T}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof lt<"u"&&(lt.exports=n)})()});var gn=L((Ar,ut)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,a=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function d(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function r(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function o(m){c("Verifying your account...");try{if(m.error||m.errorDescription)throw new Error(m.errorDescription||m.error||"This verification link is invalid or expired.");let p=null;if(m.code){let{data:h,error:v}=await e.supabaseClient.auth.exchangeCodeForSession(m.code);if(v)throw v;p=h?.session||null}else if(m.accessToken&&m.refreshToken){let{data:h,error:v}=await e.supabaseClient.auth.setSession({access_token:m.accessToken,refresh_token:m.refreshToken});if(v)throw v;p=h?.session||null}if(!p){let{data:h,error:v}=await e.supabaseClient.auth.getSession();if(v)throw v;p=h?.session||null}if(!p)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(p),r(),c("Verification complete. Loading workspace..."),await e.render()}catch(p){r(),u(p.message||"This verification link is invalid or expired.")}}function c(m){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(m)}function u(m){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(m),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(m=e.passwordRecoveryParamsFromUrl()){let p=!1,h="";if(m.accessToken&&m.refreshToken){let{data:v,error:y}=await e.supabaseClient.auth.setSession({access_token:m.accessToken,refresh_token:m.refreshToken});p=!!(v?.session&&!y),y&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";g({ready:p,initialError:h})}function i(m="",p=""){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(m,p),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let v=h.target,y=v.querySelector("button[type='submit']"),k=t.querySelector("#auth-error"),S=t.querySelector("#auth-status"),q=String(new FormData(v).get("email")||"").trim();k.textContent="",S.textContent="Sending reset link...",y.disabled=!0,y.textContent="Sending...";try{let{error:A}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(q,{redirectTo:d()}),"Password reset email timed out. Check your connection and try again.",2e4);if(A){S.textContent="",k.textContent=A.message;return}S.textContent="If that email exists in Supabase, a reset link has been sent."}catch(A){S.textContent="",k.textContent=A.message||"Could not send reset link."}finally{t.body.contains(y)&&(y.disabled=!1,y.textContent="Send Reset Link")}})}function g({ready:m=!1,initialError:p=""}={}){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:m,initialError:p}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{r(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{r(),i()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!m)return;let v=h.target,y=v.querySelector("button[type='submit']"),k=new FormData(v),S=String(k.get("password")||""),q=String(k.get("confirmPassword")||""),A=t.querySelector("#auth-error"),_=t.querySelector("#auth-status");if(A.textContent="",S.length<8){A.textContent="Password must be at least 8 characters.";return}if(S!==q){A.textContent="Passwords do not match.";return}_.textContent="Updating password...",y.disabled=!0,y.textContent="Updating...";try{let{error:w}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:S}),"Password update timed out. Try the newest reset link again.",2e4);if(w){_.textContent="",A.textContent=w.message;return}r();let{data:b}=await e.supabaseClient.auth.getSession();if(e.setSession(b.session),_.textContent=b.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",b.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(w){_.textContent="",A.textContent=w.message||"Could not update password."}finally{t.body.contains(y)&&(y.disabled=!1,y.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:d,clearPasswordRecoveryUrl:r,startAuthCallback:o,renderAuthCallback:c,renderAuthCallbackError:u,startPasswordRecovery:f,renderPasswordResetRequest:i,renderPasswordRecovery:g}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof ut<"u"&&(ut.exports={createAuthSessionFlow:l})})()});var hn=L((Pr,Me)=>{(function(){function l(d,r){let o=r.getProfilesByUserId();if(d.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${r.escapeHtml(o[d.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(d.created_at).toLocaleString()}</span>
        <p>${r.escapeHtml(d.body)}</p>
      </article>
    `;if(d.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${r.photoMetaText(d)} &middot; ${r.escapeHtml(o[d.uploaded_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(d.file_name)}</p>
        ${d.signedUrl?`<a href="${r.escapeHtml(d.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(d.type==="part"){let u=r.partUsageUnitCost(d)*(Number(d.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(d.created_at).toLocaleString()} &middot; ${r.escapeHtml(o[d.created_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(d.parts?.name||"Part")} - ${Number(d.quantity_used)||0} used - ${r.money(u)}</p>
      </article>
    `}return`
    <article>
      <strong>${r.escapeHtml(d.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(d.created_at).toLocaleString()} \xC2\xB7 ${r.escapeHtml(o[d.actor_id]?.full_name||"Team member")}</span>
      <p>${r.escapeHtml(d.summary)}</p>
    </article>
  `}function e(d,r){let o=r.getProcedureTemplates(),c=r.getPartsUsedByWorkOrder(),u=r.getCommentsByWorkOrder(),f=r.getPhotosByWorkOrder(),i=r.getMessageThreads(),g=o.find(S=>S.id===d.procedure_template_id),m=g?r.checklistProgress(d,g):null,p=(c[d.id]||[]).length,h=(u[d.id]||[]).length,v=(f[d.id]||[]).length,y=i.filter(S=>S.work_order_id===d.id).length,k=[];return d.asset_id&&k.push(n("asset","Equipment",d.assets?.name||"Linked",r)),g&&m&&k.push(n("procedure","Procedure checklist",`${m.done}/${m.total}`,r)),p&&k.push(n("parts","Parts",String(p),r)),h&&k.push(n("comment","Comments",String(h),r)),y&&k.push(n("message","Messages",String(y),r)),v&&k.push(t(d.id,String(v),r)),k.length?`<div class="relationship-row">${k.join("")}</div>`:""}function n(d,r,o,c){return`
    <span class="relationship-chip ${d}" title="${c.escapeHtml(r)}">
      ${a(d)}
      <span>${c.escapeHtml(o)}</span>
    </span>
  `}function t(d,r,o){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${o.escapeHtml(d)}" title="Open photos">
      ${a("photo")}
      <span>${o.escapeHtml(r)}</span>
    </button>
  `}function a(d){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[d]||""}function s(d){return Object.freeze({renderActivityItem:r=>l(r,d),renderRelationshipChips:r=>e(r,d),relationshipChip:(r,o,c)=>n(r,o,c,d),photoJumpChip:(r,o)=>t(r,o,d),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Me<"u"&&Me.exports&&(Me.exports={createRelationshipDisplayHelpers:s})})()});var yn=L((Er,dt)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,a=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,d=e.isConvertedRequest,r=e.canDeleteOperationalRecords,o=e.canEditOperationalRecords||(()=>!0),c=e.getPendingDeleteRequestId,u=e.getProfilesByUserId;function f(p,h){return p==="converted"?`${h} converted`:p==="all"?`${h} total`:`${h} active`}function i(p,h,v={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",p.active],["converted","Converted",p.converted],["all","All",p.all]].map(([k,S,q])=>`
            <button class="segment ${h===k?"active":""}" data-request-filter="${k}" type="button" ${v.locked&&k!=="active"?"disabled":""}>
              ${n(k==="active"?"open":k==="converted"?"completed":"all")}${S} <span>${q}</span>
            </button>
          `).join("")}
        </div>
      `}function g(p){let h=d(p),v=o(),y=c()===p.id,k=u(),S=p.created_at?new Date(p.created_at):null,q=S&&!Number.isNaN(S.getTime())?S.toLocaleString():"date unavailable",A=p.assets?.name||p.locations?.name||"No equipment",_=p.requested_by_name||k[p.requested_by]?.full_name||"Requester",w=p.converted_by||p.reviewed_by||"",b=k[w]?.full_name||"",P=b?`Converted to work order by ${b}`:w?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",C=v&&r()?y?`
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
              <span><strong>Machine / area</strong>${t(A)}</span>
              <span><strong>Requester</strong>${t(_)}</span>
              <span><strong>Received</strong>${t(q)}</span>
            </div>
          </div>
          ${v&&!h&&p.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${p.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${p.id}" type="button">Convert to Work Order</button>
              ${C}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(P)}</span>
              ${C}
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:i,renderMaintenanceRequest:g,renderRequestFormContent:m}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof dt<"u"&&(dt.exports={createRequestDisplayHelpers:l})})()});var vn=L((Rr,pt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=M=>String(M||"corrective").replace(/\b\w/g,I=>I.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:s,getWorkOrderTypeFilter:d=()=>"all",getWorkOrderPriorityFilter:r=()=>"all",getWorkSort:o=()=>"newest",getWorkGroup:c=()=>"none",getActiveStatusFilter:u,getMyWorkFilter:f,getActiveSection:i,getDueState:g,getProcedureTemplates:m,getActiveWorkOrderId:p,getProfilesByUserId:h,getSession:v,STATUS_OPTIONS:y,TYPE_OPTIONS:k=[],OUTSIDE_VENDOR_VALUE:S,escapeHtml:q,cleanWorkOrderDescription:A,relationshipIcon:_,segmentIcon:w,isVendorAssigned:b,assignmentLabel:P,renderRelationshipChips:C,canAssignWorkOrderToMe:T,canManageTeam:W,renderProductionActionCard:R=()=>"",hasOpenProductionAction:$=()=>!1,hasUnreadProductionReady:O=()=>!1}){function M(){let D=a(),U=s(),j=u(),V=D?`${t(D)} Work`:U==="unassigned"?"Unassigned Work Orders":U==="vendor"?"Outside Vendor Work":U==="assigned"?"Assigned Work Orders":"Work Orders";return j==="active"||j==="all"?V==="Work Orders"?"Active Work Orders":`Active - ${V}`:`${e(j)} - ${V}`}function I(){let D=u();return D==="active"||D==="all"?"My Work":`${e(D)} - My Work`}function E(){return i()==="mywork"?I():M()}function B(D){let U=i(),j=f();return U==="mywork"?`${D} shown - ${U==="mywork"?j==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${D} shown`}function G(D,U,j){return`<option value="${q(D)}" ${D===j?"selected":""}>${q(U)}</option>`}function ce(D){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[D]||"Any assignment"}function pe(D){return D?D.charAt(0).toUpperCase()+D.slice(1):""}function ye(D=[]){let U=u(),j=U==="all"?"active":U,V=s(),H=a(),J=d(),z=r(),X=o(),Y=c(),se=["completed","completed_month","completed_week"].includes(U),Z=j==="active"&&V==="all"&&!H&&J==="all"&&z==="all"&&X==="newest"&&Y==="none",F=D.find(ee=>ee.userId===H),ne=[`Status: ${e(j)}`,`Assignment: ${ce(V)}`,...F?[`Person: ${F.name}`]:[],...J!=="all"?[`Type: ${n(J)}`]:[],...z!=="all"?[`Priority: ${pe(z)}`]:[]],ue=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],he=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],ie=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],be=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${ne.map(ee=>`<li><span>${q(ee)}</span></li>`).join("")}
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
                  ${ue.map(([ee,de])=>G(ee,de,j)).join("")}
                </select>
              </label>
              <label class="work-control-field ${V!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${he.map(([ee,de])=>G(ee,de,V)).join("")}
                </select>
              </label>
              <label class="work-control-field ${H?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${G("","Any team member",H)}
                  ${D.map(ee=>G(ee.userId,ee.name,H)).join("")}
                </select>
              </label>
              <label class="work-control-field ${J!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${G("all","Any type",J)}
                  ${k.map(ee=>G(ee,n(ee),J)).join("")}
                </select>
              </label>
              <label class="work-control-field ${z!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${G("all","Any priority",z)}
                  ${["critical","high","medium","low"].map(ee=>G(ee,pe(ee),z)).join("")}
                </select>
              </label>
            </div>
          </div>
          <div class="work-control-section arrange-controls">
            <span class="work-control-section-title">Arrange by</span>
            <div class="work-control-fields">
              <label class="work-control-field">
                <span>Sort</span>
                <select data-work-sort-filter aria-label="Sort work orders" ${se?"disabled":""}>
                  ${se?G("completed","Recently completed","completed"):ie.map(([ee,de])=>G(ee,de,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${be.map(([ee,de])=>G(ee,de,Y)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function le(D,U){if(U==="assignee"){if(b(D))return{key:"vendor",label:"Outside vendor",order:900};if(!D.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let H=P(D);return{key:`assignee:${D.assigned_to}`,label:H,order:100}}if(U==="status"){let H=["open","in_progress","blocked","completed"].indexOf(D.status);return{key:`status:${D.status}`,label:e(D.status),order:H<0?99:H}}if(U==="priority"){let H=["critical","high","medium","low"].indexOf(D.priority);return{key:`priority:${D.priority}`,label:pe(D.priority||"Unspecified"),order:H<0?99:H}}let j=D.type||"corrective",V=k.indexOf(j);return{key:`type:${j}`,label:n(j),order:V<0?99:V}}function fe(D,U={}){if(!D.length)return'<p class="muted">No work orders match these filters.</p>';let j=U.groupBy||"none";if(j==="none")return`<div class="work-list" id="work-order-list">${D.map(re).join("")}</div>`;let V=new Map;return D.forEach(J=>{let z=le(J,j);V.has(z.key)||V.set(z.key,{...z,workOrders:[]}),V.get(z.key).workOrders.push(J)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...V.values()].sort((J,z)=>J.order-z.order||J.label.localeCompare(z.label)).map(J=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${q(J.label)}</h3>
                <span>${J.workOrders.length}</span>
              </div>
              <div class="work-list">${J.workOrders.map(re).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function re(D){let U=g(D),j=m().find(Y=>Y.id===D.procedure_template_id),V=D.created_at?new Date(D.created_at):null,H=V&&!Number.isNaN(V.getTime())?V.toLocaleDateString():"",J=D.status==="completed",z=J?"Completed":e(D.status),X=Y=>Y==="completed"?"Complete":e(Y);return`
        <article class="work-card status-card status-${D.status} ${D.id===p()?"selected":""}" data-id="${D.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${D.priority}">${D.priority}</span>
              <span class="chip">${q(n(D.type))}</span>
              <span class="chip ${D.status}">${z}</span>
              ${U?`<span class="chip ${U.className}">${U.label}</span>`:""}
              ${O(D.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${q(D.title)}</h3>
            <p>${q(A(D.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${_("asset")}${q(D.assets?.name||"General item / area")}</span>
            <span>${w(b(D)?"vendor":"mine")}${q(P(D))}</span>
            ${j?`<span>${_("procedure")}${q(j.name)}</span>`:""}
            <span>${w("due")}Due ${D.due_at||"unset"}</span>
            ${H?`<span>${w("created")}Created ${q(H)}</span>`:""}
            ${D.completed_at?`<span>${w("completed")}Completed ${new Date(D.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${C(D)}
          ${R(D)}
          <div class="quick-actions work-card-actions">
            ${!J&&T(D)?`<button class="assign-action" data-assign-me="${D.id}" type="button">Assign to me</button>`:""}
            ${!J&&W()?te(D):""}
          ${y.filter(Y=>Y!==D.status&&!(Y==="completed"&&$(D))).slice(0,3).map(Y=>`
            <button data-quick-status="${Y}" data-id="${D.id}" type="button">${X(Y)}</button>
          `).join("")}
        </div>
      </article>
    `}function te(D){return`
        <form class="card-assign-form" data-card-assign="${D.id}">
          <select name="assigned_to" aria-label="Assign ${q(D.title)}">
            <option value="">Unassigned</option>
            <option value="${S}" ${b(D)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([U,j])=>`<option value="${U}" ${!b(D)&&U===D.assigned_to?"selected":""}>${q(j.full_name||t(U))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function Q(D="",U={}){let j=D||"",V=U.managerOptions??W(),H=U.allowUnassigned!==!1,J=U.selfLabel||"Assign to me",z=[];return H&&z.push(`<option value="" ${j===""?"selected":""}>Unassigned</option>`),z.push(`<option value="${v().user.id}" ${j===v().user.id?"selected":""}>${J}</option>`),V&&(z.push(`<option value="${S}" ${j===S?"selected":""}>Outside vendor</option>`),z.push(...Object.entries(h()).filter(([X])=>X!==v().user.id).map(([X,Y])=>`<option value="${X}" ${j===X?"selected":""}>${q(Y.full_name||t(X))}</option>`))),z.join("")}function me(D){return b(D)?S:D?.assigned_to||""}function ge(D,U=""){let j=me(D);return D?.status==="completed"?`
          <label ${U?`id="${U}"`:""}>Completed by / assigned to
            <input value="${q(P(D))}" disabled>
            <input name="assigned_to" type="hidden" value="${q(j)}">
          </label>
        `:W()?`
          <label ${U?`id="${U}"`:""}>Assign to
            <select name="assigned_to">
              ${Q(j,{managerOptions:!0})}
            </select>
          </label>
        `:!D.assigned_to&&!b(D)?`
          <label ${U?`id="${U}"`:""}>Assign to
            <select name="assigned_to">
              ${Q("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${U?`id="${U}"`:""}>Assigned to
          <input value="${q(P(D))}" disabled>
          <input name="assigned_to" type="hidden" value="${q(j)}">
        </label>
      `}return{workOrdersPanelTitle:M,myWorkPanelTitle:I,workQueuePanelTitle:E,workQueuePanelSubtitle:B,renderWorkOrderFilterToolbar:ye,renderWorkOrderCollection:fe,renderWorkOrderCard:re,renderCardAssignmentControl:te,renderAssignmentSelect:Q,renderWorkOrderAssignmentField:ge}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof pt<"u"&&(pt.exports={createWorkQueueDisplayHelpers:l})})()});var bn=L((Wr,De)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(i=>e.normalizeRole(i.role)==="production").map(i=>({userId:i.user_id,name:e.teamMemberName(i.user_id)})).sort((i,g)=>i.name.localeCompare(g.name))}function t(i){return i.production_action_assigned_to?e.teamMemberName(i.production_action_assigned_to):"Production owner not set"}function a(i){let g=e.activeCompanyRole();return["admin","manager"].includes(g)||i.production_action_assigned_to===e.getSession()?.user?.id}function s(i=""){return n().map(m=>`
        <option value="${e.escapeHtml(m.userId)}" ${m.userId===i?"selected":""}>${e.escapeHtml(m.name)}</option>
      `).join("")}function d(i,g={}){let m=n(),p=g.compact?" compact":"";if(!m.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=m.some(v=>v.userId===i.production_action_assigned_to)?i.production_action_assigned_to:m[0].userId;return`
        <form class="production-action-form${p}" data-production-action-form="${e.escapeHtml(i.id)}">
          <label>Production action
            <textarea name="production_action" rows="${g.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(i.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${s(h)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(i.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(i)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(i)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(i.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function r(i){return!a(i)||i.status==="completed"?"":i.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(i.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(i.id)}" type="button">Reopen Production Action</button>`}function o(i){let g=i.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${g?"status-completed":"status-open"}">${g?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(i))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(i.production_action)}</p>
        ${g&&i.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(i.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function c(i,g){let m=e.hasProductionAction(i),p=`production-action-dialog-${i.id}`;return`
        <dialog class="production-action-dialog" id="${e.escapeHtml(p)}" data-production-action-dialog="${e.escapeHtml(i.id)}" aria-labelledby="${e.escapeHtml(p)}-title">
          <div class="production-action-dialog-shell">
            <header class="production-action-dialog-header">
              <div>
                <small>Work order action</small>
                <h3 id="${e.escapeHtml(p)}-title">Production Action</h3>
              </div>
              <button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button>
            </header>
            <div class="production-action-dialog-body">
              ${m?o(i):'<p class="muted">No Production Action is assigned.</p>'}
              ${g?`
                <div class="button-row production-action-detail-actions">
                  ${m?r(i):""}
                </div>
                ${d(i)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function u(i){let g=e.canEditOperationalRecords()&&i.status!=="completed",m=e.hasProductionAction(i);if(!m&&!g)return"";let p=i.production_action_status==="completed",h=`production-action-dialog-${i.id}`,v=m?t(i):"Not assigned",y=m?`${v} - ${i.production_action}`:v,k=m?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${p?"is-completed":m?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${m?`<span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(y)}">${e.escapeHtml(y)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(i.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${k}" title="${k}">
            <span aria-hidden="true">${m?"...":"+"}</span>
          </button>
          ${c(i,g)}
        </section>
      `}function f(i){let g=e.canEditOperationalRecords()&&i.status!=="completed";return!e.hasProductionAction(i)&&!g?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(i)?o(i):'<p class="muted">No Production Action is assigned.</p>'}
          ${g?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(i)?r(i):""}
            </div>
            ${d(i)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:u,renderProductionActionDetail:f}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof De<"u"&&De.exports&&(De.exports={createProductionActionDisplayHelpers:l})})()});var wn=L((Or,mt)=>{(function(){function l(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(c=>String(c||"")),a=e.formatMessageTime||(c=>String(c||"")),s=Math.max(Number(e.visibleLimit)||12,1);function d(){return n().filter(c=>!c.read_at).length}function r(c){return n().some(u=>!u.read_at&&u.kind==="production_action_completed"&&u.work_order_id===c)}function o(){if(!e.getReady?.())return"";let c=n();if(!c.length)return"";let u=d(),f=c.slice(0,s);return`
        <section class="work-notification-panel" aria-label="Work notifications">
          <header class="work-notification-header">
            <h3>Work notifications</h3>
            <span>${u?`${u} new`:"Recent"}</span>
          </header>
          <div class="work-notification-list">
            ${f.map(i=>`
              <button
                class="work-notification-item ${i.read_at?"read":"unread"}"
                data-open-work-notification="${t(i.id)}"
                data-work-order-id="${t(i.work_order_id)}"
                type="button"
              >
                <span class="work-notification-heading">
                  <span class="chip production-ready">Production Ready</span>
                  <time>${t(a(i.created_at))}</time>
                </span>
                <strong>${t(i.title)}</strong>
                <span class="work-notification-body">${t(i.body)}</span>
                <span class="work-notification-action">Open work order</span>
              </button>
            `).join("")}
          </div>
          ${c.length>s?`<p class="work-notification-limit">Showing the ${s} most recent notifications.</p>`:""}
        </section>
      `}return{hasUnreadProductionReady:r,renderWorkOrderNotifications:o,unreadWorkOrderNotificationCount:d}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:l},typeof mt<"u"&&(mt.exports={createWorkOrderNotificationDisplayHelpers:l})})()});var kn=L((xr,Te)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:s,teamMemberName:d}){function r(c){return`
        <article class="mini-work-order" data-mini-work-order="${c.id}">
          <strong>${e(c.title)}</strong>
          <span>${n(c.status)} - ${c.due_at||"no due date"}</span>
        </article>
      `}function o(c){let u=(a()[c.id]||[]).length,f=(s()[c.id]||[]).length,i=c.completed_at?new Date(c.completed_at).toLocaleDateString():"",g=c.completed_by?d(c.completed_by):"",m=!g&&c.assigned_to?d(c.assigned_to):"",p=g?` by ${e(g)}`:m?` - owner ${e(m)}`:"",h=c.resolution_summary||c.completion_notes||"";return`
        <article class="mini-work-order ${c.status==="completed"?"completed-history":""}" data-mini-work-order="${c.id}">
          <div class="chip-row">
            <span class="chip ${c.status}">${n(c.status)}</span>
            ${c.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${u?`<span class="relationship-chip parts">${t("parts")}<span>${u}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${t("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(c.title)}</strong>
          <span>${i?`Completed ${i}${p}`:`Due ${c.due_at||"unset"}`}</span>
          ${c.failure_cause?`<p><b>Finding:</b> ${e(c.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:r,renderAssetMiniWorkOrder:o}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof Te<"u"&&Te.exports&&(Te.exports={createMiniWorkOrderDisplayHelpers:l})})()});var _n=L((Mr,ft)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:a,getParts:s,getPartDocumentsByPartId:d,getPartDocumentsReady:r,getPendingDeletePartId:o,getShowPartSourceManager:c,getPartCostsReady:u,getPartInventoryFilter:f,getPartSearchQuery:i,partUsageRows:g,canDeleteParts:m,canEditOperationalRecords:p=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:v,renderPartSourceManager:y}){let k=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],S=k.reduce(($,[O,M])=>($[O]=M.replace(/s$/,""),$),{});function q($){return $.document_type?$.document_type:String($.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test($.file_name||"")?"invoice":/receipt/i.test($.file_name||"")?"receipt":/schematic|diagram/i.test($.file_name||"")?"schematic":/print|drawing/i.test($.file_name||"")?"part_print":/manual/i.test($.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test($.file_name||"")?"spec_sheet":"other"}function A(){return k.map(([$,O])=>`
        <option value="${$}">${e(S[$]||O)}</option>
      `).join("")}function _($){let O=q($),M=String($.content_type||"").startsWith("image/"),I=S[O]||"File",E=$.created_at?new Date($.created_at).toLocaleString():"Uploaded",B=$.file_size_bytes?`${Math.round(Number($.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${M?"image-file":""}">
          ${M&&$.signedUrl?`<a class="part-document-thumb" href="${e($.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e($.signedUrl)}" alt="${e($.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(I)}</span>
              ${B?`<span class="chip">${e(B)}</span>`:""}
            </div>
            <strong>${e($.file_name)}</strong>
            <span>${e(E)}</span>
            ${$.original_file_name&&$.original_file_name!==$.file_name?`<small>Original: ${e($.original_file_name)}</small>`:""}
            ${$.signedUrl?`<a href="${e($.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function w([$,O],M){let I=M.filter(E=>q(E)===$);return I.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(O)}</h4>
            <span>${I.length}</span>
          </div>
          <div class="part-document-grid">
            ${I.map(_).join("")}
          </div>
        </section>
      `:""}function b($){let O=$.reduce((I,E)=>{let B=q(E);return I[B]=(I[B]||0)+1,I},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(I=>O[I]).map(I=>`<span class="chip">${O[I]} ${e(S[I]||"file")}${O[I]===1?"":"s"}</span>`).join("")}function P($){let O=Number($.quantity_on_hand)||0,M=Number($.reorder_point)||0,I=Number($.unit_cost)||0,E=O<=M,B=Math.max(0,M-O);return`
        <article class="part-card part-tile ${E?"low-stock":""}" data-open-part="${$.id}" tabindex="0" role="button" aria-label="Open ${e($.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${$.sku?`<span class="chip">${e($.sku)}</span>`:""}
              ${$.supplier_name?`<span class="chip part-source-chip">${e($.supplier_name)}</span>`:""}
              ${$.machine_note?`<span class="chip">${e($.machine_note)}</span>`:""}
              ${E?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e($.name)}</h3>
            <div class="part-card-meta">
              <span>${O} on hand</span>
              <span>reorder at ${M}</span>
              <span>${u()?`${n(I)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${E&&M>0?`<small>Need ${B} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function C(){let $=s().filter(a),O=$.filter(t).length,M=f();return[["All Parts",$.length,"all"],["Low Stock",O,"low"]].map(([I,E,B])=>`
        <button class="parts-health ${B==="low"&&E?"attention":""} ${M===B?"active":""}" data-part-inventory-filter="${B}" type="button">
          <span>${I}</span>
          <strong>${E}</strong>
        </button>
      `).join("")}function T($="default"){return`
        <form class="part-search-bar" id="part-search-form">
          <label>
            Search parts
            <input id="part-search" name="part_search" type="search" value="${e(i())}" placeholder="Search part name, SKU, source, count">
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
      `}function W($){let O=Number($.quantity_on_hand)||0,M=Number($.reorder_point)||0,I=Number($.unit_cost)||0,E=d()[$.id]||[],B=b(E),G=p();return`
        <section class="part-detail-shell">
          ${G?h():""}
          ${v()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${$.sku?`<span class="chip">${e($.sku)}</span>`:""}
                ${$.supplier_name?`<span class="chip part-source-chip">${e($.supplier_name)}</span>`:""}
                ${$.machine_note?`<span class="chip">${e($.machine_note)}</span>`:""}
                <span class="chip ${O<=M?"overdue":"open"}">${O<=M?"low stock":"stocked"}</span>
              </div>
              <h3>${e($.name)}</h3>
              <p>${O} on hand - reorder at ${M}</p>
              ${B?`<div class="chip-row part-file-summary">${B}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${G?`<div class="part-card-actions">
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

          ${G?`<form class="part-detail-form relationship-detail parts" data-edit-part="${$.id}">
            <label>Name<input name="name" required value="${e($.name)}"></label>
            <label>SKU<input name="sku" value="${e($.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e($.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e($.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${O}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${M}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${I}"></label>
            <p class="error-text" data-part-edit-error="${$.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${G&&c()?y():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${E.length} file${E.length===1?"":"s"}</span>
            </div>
            ${G?`<form class="part-document-form" data-part-document="${$.id}">
              <label>Attach photos or files<input name="document" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <p class="error-text" data-part-document-error="${$.id}">${r()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${r()?"":"disabled"}>Review Attachments</button>
            </form>`:""}
            <div class="part-document-list">
              ${E.length?k.map(ce=>w(ce,E)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${G?R($):""}
        </section>
      `}function R($){let O=g($.id).length,M=d()[$.id]||[],I=o()===$.id;return m()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${O?`This part has ${O} usage record${O===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${M.length?` and ${M.length} filed receipt/invoice record${M.length===1?"":"s"}`:""}.`}</p>
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:P,renderPartsHealth:C,renderPartSearch:T,renderPartDetail:W,renderPartDangerZone:R}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createPartsDisplayHelpers:l})})()});var Sn=L((Dr,gt)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:a,getAppIssueReportsReady:s,getAppIssueReports:d}){function r(){let u=s();return`
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
      `}function o(u){let f={open:0,reviewing:1,resolved:2};return[...u].sort((i,g)=>{let m=(f[i.status||"open"]??1)-(f[g.status||"open"]??1);return m||new Date(g.created_at||0)-new Date(i.created_at||0)})}function c(){if(!e())return"";let u=s(),f=d(),i=o(f);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${u?`${f.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${u?`
            <div class="issue-report-list">
              ${i.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:r,renderAppIssueReportsPanel:c,sortedAppIssueReports:o}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createAppIssuePanelDisplayHelpers:l})})()});var qn=L((Tr,ht)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:a,checklistProgress:s,requiredChecklistProgress:d,escapeHtml:r,cleanWorkOrderDescription:o,renderRelationshipChips:c,renderWorkOrderCommandSummary:u,renderWorkOrderRecommendation:f,statusLabel:i,normalizeWorkOrderType:g=M=>String(M||"corrective"),workOrderTypeLabel:m=M=>String(M||"corrective").replace(/\b\w/g,I=>I.toUpperCase()),hasCompletedSafetyDeviceCheck:p,canAssignWorkOrderToMe:h,renderAssetOptions:v,assetLocationRoutingMessage:y,renderWorkOrderAssignmentField:k,requiresSafetyDeviceCheck:S,renderWorkOrderMessages:q,renderProcedureOptions:A,money:_,photoMetaText:w,renderActivityItem:b,canDeleteWorkOrders:P,canEditOperationalRecords:C=()=>!0,renderProductionActionDetail:T=()=>"",hasOpenProductionAction:W=()=>!1}=e;function R(M,I){let E=e.getStepResultsByWorkOrder()[M.id]?.[I.id],B=E?.value||"",G=`data-step-result="${I.id}" data-work-order-id="${M.id}"`,ce=`<input ${G} value="${r(B)}" placeholder="Result">`;return I.response_type==="checkbox"&&(ce=`<label class="check-row"><input ${G} type="checkbox" ${B==="checked"?"checked":""}> Done</label>`),I.response_type==="pass_fail"&&(ce=`
          <select ${G}>
            <option value="">Not checked</option>
            <option value="pass" ${B==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${B==="fail"?"selected":""}>Fail</option>
          </select>
        `),I.response_type==="number"&&(ce=`<input ${G} type="number" value="${r(B)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${I.position}. ${r(I.prompt)} ${I.required?'<small class="required-mark">Required</small>':""}</span>
          ${ce}
          <small data-checklist-recorded>${E?.completed_at?`Recorded ${new Date(E.completed_at).toLocaleString()}`:""}</small>
        </div>
      `}function $(M){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, photos, and files.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===M.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${r(M.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${M.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${M.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function O(){let M=e.getActiveWorkOrderId(),E=e.getWorkOrders().find(F=>F.id===M);if(!E)return n();let B=e.getCommentsByWorkOrder(),G=e.getPhotosByWorkOrder(),ce=e.getEventsByWorkOrder(),pe=e.getPartsUsedByWorkOrder(),ye=e.getProcedureTemplates(),le=e.getWorkOrderActionWarningId(),fe=e.getWorkOrderActionWarning(),re=e.getParts(),te=e.getProfilesByUserId(),Q=e.getCommentsError(),me=e.STATUS_OPTIONS||[],ge=e.TYPE_OPTIONS||[],D=B[E.id]||[],U=G[E.id]||[],j=ce[E.id]||[],V=pe[E.id]||[],H=V.reduce((F,ne)=>F+(Number(ne.quantity_used)||0)*t(ne),0),J=V.reduce((F,ne)=>F+(Number(ne.quantity_used)||0),0),z=a(D,U,j,V),X=ye.find(F=>F.id===E.procedure_template_id),Y=X?s(E,X):null,se=X?d(E,X):null,Z=C();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${E.priority}">${E.priority}</span>
            <span class="chip">${r(m(E.type))}</span>
            <span class="chip ${E.status}">${i(E.status)}</span>
          </div>
          <h2>${r(E.title)}</h2>
          ${E.preventive_source_id?`<p class="completion-note" data-pm-source>PM: ${r(E.preventive_source_title||"Preventive schedule")} - Scheduled ${r(E.preventive_due_at||"unset")}${E.preventive_schedule_id?' <button class="text-button" data-search-section="pm" type="button">PM Schedules</button>':" - Schedule deleted"}</p>`:""}
          <p>${r(o(E.description)||"No description.")}</p>
          ${c(E)}
          ${E.completed_at?`<p class="completion-note">Completed ${new Date(E.completed_at).toLocaleString()} \xC2\xB7 ${E.actual_minutes||0} min</p>`:""}
          ${E.asset_id&&p(E)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${E.completion_notes?`<p>${r(E.completion_notes)}</p>`:""}
        </div>

        ${u(E)}
        ${f(E)}
        ${T(E)}

        ${E.completed_at&&(E.failure_cause||E.resolution_summary||E.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${E.failure_cause?`<article><span>Cause</span><strong>${r(E.failure_cause)}</strong></article>`:""}
            ${E.resolution_summary?`<article><span>Resolution</span><strong>${r(E.resolution_summary)}</strong></article>`:""}
            ${E.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${Z?`<label>Status
          <select id="status-select">
            ${me.map(F=>`<option value="${F}" ${F===E.status?"selected":""} ${F==="completed"&&W(E)?"disabled":""}>${i(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${Z?`<div class="quick-actions detail-quick-actions">
          ${h(E)?`<button class="assign-action" data-assign-me="${E.id}" type="button">${E.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${me.filter(F=>F!==E.status&&!(F==="completed"&&W(E))).map(F=>`
            <button data-quick-status="${F}" data-id="${E.id}" type="button">${i(F)}</button>
          `).join("")}
        </div>`:""}
        ${le===E.id&&fe?`<p class="error-text action-warning">${r(fe)}</p>`:""}

        ${Z?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${r(E.title)}"></label>
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
                    ${v(E.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${r(y(E.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(E.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${r(E.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${me.map(F=>`<option value="${F}" ${F===E.status?"selected":""} ${F==="completed"&&W(E)?"disabled":""}>${i(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===E.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${k(E,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${A(E.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${E.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${S(E)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${E.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:`<div class="safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>${E.asset_id?"This equipment does not require the equipment safety check.":"No machine / equipment selected, so no equipment safety check is required."}</span></div>`}
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
            <button class="secondary-button" data-copy-downtime="subject" data-id="${E.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${E.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${q(E)}

        ${Z?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${r(E.title)}"></label>
          <label>Description<textarea name="description" rows="3">${r(o(E.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${r(E.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===E.priority?"selected":""}>${F}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${ge.map(F=>`<option value="${F}" ${F===g(E.type)?"selected":""}>${m(F)}</option>`).join("")}
            </select>
          </label>
          ${k(E)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${A(E.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${r(E.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(E.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${E.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${S(E)?`
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${E.safety_devices_checked?"checked":""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          `:""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${E.actual_minutes||0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>`:""}

        ${X?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${r(X.name)}</h3>
              <span data-checklist-summary>${Y.done} of ${Y.total} complete - required ${se.done}/${se.total}</span>
            </div>
            <div class="checklist-list">
              ${Z&&e.checklistToolsReady?.()===!1?e.renderChecklistLoading():X.procedure_steps.map(F=>Z?R(E,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${r(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${r(e.getStepResultsByWorkOrder()[E.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${Z&&E.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${se?.total?`<p class="${se.done===se.total?"completion-note":"warning-text"}">Required checklist: ${se.done}/${se.total}</p>`:""}
            ${W(E)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${E.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${S(E)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${p(E)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${W(E)?"disabled":""}>Complete Work Order</button>
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
          ${V.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${_(H)}</span></article>`:""}
          ${V.map(F=>`
            <article class="relationship-detail parts">
              <strong>${r(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${_((Number(F.quantity_used)||0)*t(F))}</span>
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
          ${D.map(F=>`
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
          ${Q?`<p class="error-text">${r(Q)}</p>`:""}
          ${z.map(b).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${Z&&P()?$(E):""}
      </div>
    `}return{renderWorkOrderDetail:O}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createWorkOrderDetailDisplayHelpers:l})})()});var $n=L((Ir,yt)=>{(function(){function l(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var Cn=L((Fr,vt)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:a,escapeHtml:s,assetTypeLabel:d,renderParentAssetOptions:r,renderLocationOptions:o,renderAssetAreaOptions:c,assetStatusLabel:u,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:i,canDeleteEquipment:g,canEditEquipmentRecords:m=()=>!0,renderEquipmentStructureGuide:p,renderProcedureOptions:h}=e;function v(){let b=new Date;return new Date(b.getTime()-b.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function y(){return m()?`<form class="inline-form" id="create-asset-form">
        <input name="name" required placeholder="Machine or equipment name">
        <input name="asset_code" placeholder="Serial number">
        <input name="asset_tag" aria-label="Asset tag" placeholder="Asset tag (optional)">
        <input name="manufacturer" placeholder="Manufacturer">
        <input name="model" placeholder="Model">
        <select name="location_existing" aria-label="Area / spot"><option value="">No area / spot set</option>${c()}</select>
        <input name="location_new" placeholder="New area / spot">
        <select name="asset_type" aria-label="Equipment type">${e.ASSET_TYPE_OPTIONS.map(b=>`<option value="${b}">${d(b)}</option>`).join("")}</select>
        <select name="parent_asset_id" aria-label="Part of equipment"><option value="">Top level equipment</option>${r()}</select>
        <select name="location_id" ${e.getLocations().length?"required":"disabled"}>${o()}</select>
        <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety device identification</label>
        <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
        <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form><p class="error-text" id="asset-create-error"></p>`:'<p class="muted">Accounting can view equipment here. Maintenance and admins manage operational equipment changes.</p>'}function k(b,P,C){let T=P.some(O=>O.event_type==="created"),W=b.created_at&&!T?[{id:`${b.id}-created`,event_type:"created",summary:`${d(b.asset_type)} created.`,actor_id:b.created_by||"",created_at:b.created_at}]:[];return{equipmentHistory:[...P,...W].sort((O,M)=>new Date(M.created_at||0)-new Date(O.created_at||0)),historyActorLabel:O=>O.actor_id&&C[O.actor_id]?.full_name?C[O.actor_id].full_name:O.actor_id?`User ${String(O.actor_id).slice(0,8)}`:O.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function S(b,P){return b.map(C=>`
        <article>
          <strong>${s(String(C.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${C.created_at?new Date(C.created_at).toLocaleString():"time unavailable"} &middot; ${s(P(C))}</span>
          <p>${s(C.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function q(){let b=e.getAssets(),P=e.getActiveAssetId(),C=b.find(pe=>pe.id===P);if(!C)return n();let T=e.getAssetEventsReady?.()!==!1,W=e.getProfilesByUserId?.()||{},R=(e.getAssetEventsByAssetId?.()[C.id]||[]).sort((pe,ye)=>new Date(ye.created_at||0)-new Date(pe.created_at||0)),{equipmentHistory:$,historyActorLabel:O}=k(C,R,W),M=e.LIST_ITEMS_PER_PAGE||12,I=Math.max(1,Math.ceil($.length/M)),E=Math.min(Math.max(1,e.getAssetRelationshipPage?.(C.id,"asset-history")||1),I),B=$.length?(E-1)*M+1:0,G=Math.min($.length,E*M),ce=$.slice((E-1)*M,E*M);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(C.name)} - ${$.length} event${$.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(C.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${T?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${S(ce,O)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${$.length>M?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(C.id)}" type="button" ${E<=1?"disabled":""}>Previous</button>
                <span>Showing ${B}-${G} of ${$.length} - Page ${E} of ${I}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(C.id)}" type="button" ${E>=I?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function A(){let b=e.getAssets(),P=e.getActiveAssetId(),C=b.find(x=>x.id===P);if(!C)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(C.id);let T=e.getWorkOrders(),W=e.getPreventiveSchedules(),R=e.getParts(),$=e.getAssetParts(),O=e.getAssetPartsReady(),M=e.getAssetDocumentsByAssetId?.()[C.id]||[],I=e.getAssetDocumentsReady?.()!==!1,E=e.getAssetEventsReady?.()!==!1,B=e.getProfilesByUserId?.()||{},G=e.getPartsUsedByWorkOrder(),ce=e.getLocations(),pe=e.getActiveLocationId(),ye=e.ASSET_TYPE_OPTIONS||[],le=t(C),fe=a(C.id),re=T.filter(x=>x.asset_id===C.id),te=e.getAssetWorkHistory?.(C.id),Q=!te||te.historyStatus==="ready",me=te?te.rows:re,ge=te?.historyStatus==="error"?'<p class="error-text" role="alert">Could not load work history.</p>':'<p class="muted" role="status">Loading work history...</p>',D=me.filter(x=>x.status!=="completed").sort((x,oe)=>new Date(oe.created_at||0)-new Date(x.created_at||0)),U=me.filter(x=>x.status==="completed").sort((x,oe)=>new Date(oe.completed_at||oe.created_at||0)-new Date(x.completed_at||x.created_at||0)),j=W.filter(x=>x.asset_id===C.id),V=Object.values(G).flat().filter(x=>re.some(oe=>oe.id===x.work_order_id)),H=$.filter(x=>x.asset_id===C.id),J=new Set(H.map(x=>x.part_id)),z=R.filter(x=>!J.has(x.id)),X=(e.getAssetEventsByAssetId?.()[C.id]||[]).sort((x,oe)=>new Date(oe.created_at||0)-new Date(x.created_at||0)),{equipmentHistory:Y}=k(C,X,B),se=(x,oe)=>te?te.countsStatus==="ready"?te.counts[x]:te.countsStatus==="error"?"Unavailable":"Loading...":oe,Z=x=>`data-asset-work-count="${s(C.id)}" data-work-count-kind="${x}"`,F=e.LIST_ITEMS_PER_PAGE||12,ne=x=>e.getAssetRelationshipOpen?.(C.id,x)||!1,ue=(x,oe)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(C.id,x)||1),Math.max(1,Math.ceil(oe/F))),he=(x,oe)=>{let ve=ue(oe,x.length);return x.slice((ve-1)*F,ve*F)},ie=(x,oe)=>{if(oe<=F)return"";let ve=ue(x,oe),St=Math.max(1,Math.ceil(oe/F)),Wn=(ve-1)*F+1,On=Math.min(oe,ve*F);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(C.id)}" data-asset-relation-section="${s(x)}" type="button" ${ve<=1?"disabled":""}>Previous</button>
            <span>Showing ${Wn}-${On} of ${oe} - Page ${ve} of ${St}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(C.id)}" data-asset-relation-section="${s(x)}" type="button" ${ve>=St?"disabled":""}>Next</button>
          </div>
        `},be=x=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(x)}" data-asset-id="${s(C.id)}" ${ne(x)?"open":""}`,ee=ce.find(x=>x.id===C.location_id)?.name||C.location||"No location set",de=le?le.name:"Top level equipment",we=C.status==="offline"?"status-blocked":C.status==="degraded"?"status-open":C.status==="watch"?"status-in_progress":"status-completed",ae=C.status==="degraded"&&se("open",D.length)===0,K=m();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${C.status}">${s(u(C.status))}</span>
              <span class="chip">${s(d(C.asset_type))}</span>
              ${C.asset_code?`<span class="chip">${s(C.asset_code)}</span>`:""}
              ${C.asset_tag?`<span class="chip">Asset tag: ${s(C.asset_tag)}</span>`:""}
              ${C.manufacturer?`<span class="chip">${s(C.manufacturer)}</span>`:""}
              ${C.model?`<span class="chip">${s(C.model)}</span>`:""}
              ${C.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(C.name)}</h2>
            <p>${s(C.location||"No area / spot set")}</p>
            ${le?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(le.id)}" type="button">${s(le.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${we}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(u(C.status))}</strong>
              <small>${C.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(ee)}</strong>
              <small>${C.location?s(C.location):"No area / spot set"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(de)}</strong>
              <small>${le?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${fe.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${fe.length}</strong>
              <small>${fe.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${H.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${H.length}</strong>
              <small>${H.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${se("open",D.length)===0?"empty":""}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong ${Z("open")}>${se("open",D.length)}</strong>
              <small>Active work tied to this equipment</small>
            </button>
            <button class="command-card command-photo ${M.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${M.length}</strong>
              <small>${M.length?"Machine files on record":"No machine files yet"}</small>
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
              <button class="secondary-button" data-quick-fix-asset="${s(C.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${p?p():""}

          ${K?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${C.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${M.length} file${M.length===1?"":"s"}</span>
            </div>
            ${K?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(C.id)}">
              <label>Attach photos or files<input name="document" type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.zip"></label>
              <p class="error-text" data-asset-document-error="${s(C.id)}">${I?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${I?"":"disabled"}>Review Attachments</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${M.map(x=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(x.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${s(x.signedUrl)}" alt="${s(x.original_file_name||x.file_name||C.name)}">`:`<strong>${s(w(x.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(w(x.document_type))}</strong>
                      <span>${s(x.original_file_name||x.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${s(x.signedUrl)}" alt="${s(x.original_file_name||x.file_name||C.name)}">`:`<div class="asset-file-document-preview">${s(w(x.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${s(x.content_type||"file")}</span>
                      <a class="secondary-button" href="${s(x.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${K?`<button class="text-button danger-link" data-delete-asset-document="${s(x.id)}" data-asset-document-path="${s(x.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${K?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${s(C.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(C.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${s(C.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(C.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(C.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${ye.map(x=>`<option value="${x}" ${x===(C.asset_type||"machine")?"selected":""}>${d(x)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${r(C.parent_asset_id||"",C.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${ce.length?"":"disabled"}>
                ${o(C.location_id||pe)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">No area / spot set</option>
                ${c(C.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(x=>`<option value="${x}" ${x===C.status?"selected":""}>${u(x)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${C.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${fe.map(x=>`
                <article class="mini-work-order" data-open-asset="${s(x.id)}">
                  <strong>${s(x.name)}</strong>
                  <span>${s(d(x.asset_type))} - ${s(u(x.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${be("open-work")} id="asset-open-work-target">
            <summary>Open Work <span ${Z("open")}>${se("open",D.length)}</span></summary>
            <div class="mini-list">
              ${ne("open-work")?Q?he(D,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':ge:'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${ne("open-work")&&Q?ie("open-work",D.length):""}
          </details>

          <details ${be("completed-history")}>
            <summary>Completed History <span ${Z("completed")}>${se("completed",U.length)}</span></summary>
            <div class="mini-list">
              ${ne("completed-history")?Q?he(U,"completed-history").map(f).join("")||'<p class="muted">No completed work yet.</p>':ge:'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${ne("completed-history")&&Q?ie("completed-history",U.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${Y.length} event${Y.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(C.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${E?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure" data-asset-pm-schedules="${s(C.id)}">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${e.getSchedulesReady?.()===!1?"Unavailable":`${j.length} schedule${j.length===1?"":"s"}`}</span>
                ${K?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${K&&e.canCreatePreventiveSchedule?.()===!1?e.renderMaintenanceLoading():""}
            ${K&&e.canCreatePreventiveSchedule?.()!==!1?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(C.id)}">
              <input name="title" required placeholder="PM for ${s(C.name)}">
              <input name="asset_id" type="hidden" value="${s(C.id)}">
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
              ${e.getSchedulesReady?.()===!1?'<p class="error-text" role="alert">PM schedules could not be loaded.</p>':he(j,"pm-schedules").map(x=>`<article><strong>${s(x.title)}</strong><span>${s(x.frequency||"")} - next due ${s(x.next_due_at||"")}</span>${x.active===!1?'<span class="chip">Inactive</span>':""}</article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
            ${ie("pm-schedules",j.length)}
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(C.id)}" ${ne("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${H.length}</span></summary>
            <div class="panel-header compact">
              ${K?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${O?`
              ${K?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(C.id)}">
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
              <p class="error-text" data-asset-part-error="${s(C.id)}"></p>
              <div class="mini-list">
                ${he(H,"linked-parts").map(x=>`<article>
                  <strong>${s(x.parts?.name||"Part")}</strong>
                  <span>${s(x.parts?.sku||"No SKU")} - recommended qty ${s(x.quantity_recommended||1)}${x.note?` - ${s(x.note)}`:""}</span>
                  ${K?`<button class="text-button danger-link" data-remove-asset-part="${s(x.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${ie("linked-parts",H.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(C.id)}" ${ne("parts-used")?"open":""}>
            <summary>Parts Used History <span>${Q?V.length:"Not loaded"}</span></summary>
            <div class="mini-list">
              ${ne("parts-used")?Q?he(V,"parts-used").map(x=>`<article><strong>${s(x.parts?.name||"Part")}</strong><span>${x.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':ge:'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${ne("parts-used")&&Q?ie("parts-used",V.length):""}
          </details>

          ${K?_(C):""}
        </div>
      `}function _(b){let P=e.getWorkOrders(),C=e.getPreventiveSchedules(),T=e.getAssets(),W=e.getActiveAssetId(),R=P.filter(B=>B.asset_id===b.id).length,$=C.filter(B=>B.asset_id===b.id).length,O=T.filter(B=>B.parent_asset_id===b.id).length,M=e.getMaintenanceRequests().filter(B=>B.asset_id===b.id).length,I=i({workOrders:R,children:O,schedules:$,requests:M}),E=e.getPendingDeleteAssetId()===W;return g()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${I||`This permanently removes "${s(b.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${I?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:E?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${s(b.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${s(b.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${s(b.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function w(b){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[b]||"File"}return{renderAssetDetail:A,renderAssetHistoryScreen:q,renderCreateAssetForm:y}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createAssetDetailDisplayHelpers:l})})()});var An=L((Lr,bt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:a,statusLabel:s,workOrderTypeLabel:d=i=>String(i||"corrective").replace(/\b\w/g,g=>g.toUpperCase()),renderAssignmentSelect:r,renderProcedureOptions:o,escapeHtml:c}=e;function u(){let i=new Date;return new Date(i.getTime()-i.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let i=e.getParts();return`
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
                  ${t.map(g=>`<option value="${g}">${d(g)}</option>`).join("")}
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
                  ${o()}
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
                  ${i.map(g=>`<option value="${g.id}">${c(g.name)} (${g.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var Pn=L((Nr,wt)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:a,escapeHtml:s,renderAssignmentSelect:d,renderProcedureOptions:r,assetStatusLabel:o,workOrderTypeLabel:c=i=>String(i||"corrective").replace(/\b\w/g,g=>g.toUpperCase())}=e;function u(){let i=new Date;return new Date(i.getTime()-i.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let i=e.getQuickFixAssetId(),g=e.getQuickFixRequestId(),m=e.getMaintenanceRequests(),p=e.getSession(),h=e.getParts(),v=i||"",y=m.find(k=>k.id===g);return`
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
                  ${t(v||y?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${s(a(v||y?.asset_id||""))}</p>
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
                  ${n.map(k=>`<option value="${k}" ${k==="corrective"?"selected":""}>${c(k)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${d(p.user.id,{selfLabel:"Assign to me"})}
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
                  ${["running","watch","degraded","offline"].map(k=>`<option value="${k}">${o(k)}</option>`).join("")}
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
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createQuickFixDisplayHelpers:l})})()});var En=L((Ur,kt)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(f){return`
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
      `}function s(f,i=""){let g=f==="signup";return`
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
            <p class="error-text" id="auth-error">${n(i)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${g?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${g?"I already have an account":"Create an account"}</button>
            ${g?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function d(f){return`
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
      `}function o(f="",i=""){return`
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
            <p class="muted auth-status" id="auth-status">${n(i)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function c(f={}){let i=!!f.ready,g=f.initialError||"";return`
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
              <label>New password<input name="password" type="password" minlength="6" required autocomplete="new-password" ${i?"":"disabled"}></label>
              <label>Confirm password<input name="confirmPassword" type="password" minlength="6" required autocomplete="new-password" ${i?"":"disabled"}></label>
            </div>
            <p class="error-text" id="auth-error">${n(g)}</p>
            <p class="muted auth-status" id="auth-status">${i?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${i?"":"disabled"}>Update Password</button>
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
      `}return{workspaceLoading:t,workspaceLoadError:a,authForm:s,authCallback:d,authCallbackError:r,passwordResetRequest:o,passwordRecovery:c,companyCreate:u}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof kt<"u"&&(kt.exports={createAuthDisplayHelpers:l})})()});var Rn=L((Qr,_t)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,a=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),d=e.getPublicRequestLinksReady||(()=>!0),r=e.getPublicAppUrlOverride||(()=>""),o=e.getWindowPublicAppUrl||(()=>""),c=e.canManageTeam||(()=>!1),u=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,i=e.publicRequestUrl,g=e.publicRequestQrUrl;function m(){return`
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
      `}function p(A,_){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(A.location_name)}</h1>
                <p>${n(A.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${t(_,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${n(_)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${n(_)}" target="_blank" rel="noreferrer">Test Form</a>
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
      `}function v(A){return`
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
      `}function y(A){return`
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
      `}function k(A,_=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(A.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${_?`<p class="error-text">${n(_)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function S(){if(!c())return"";let A=f(),_=a(),w=d();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${n(r()||String(o()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${A?`<p class="muted">QR codes will point to ${n(A)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${w?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${_.map(q).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function q(A){let _=s().find(W=>W.location_id===A.id),w=!!(_&&_.is_active!==!1),b=u(),P=w?i(_.token):"",C=w?g(_.token):"",T=!!(P&&C);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(A.name)}</strong>
            <span>${w?"External request link active":_?"Request link disabled":"No request link yet"}</span>
            ${_?.last_used_at?`<span>Last used ${new Date(_.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${w?`
            <div class="qr-preview">${T?t(P):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(C||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${T?"":"disabled-link"}" href="${n(C||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(C)}" type="button" ${T?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${T?"":"disabled-link"}" href="${n(P||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${b?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(_.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(_.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:_?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${b?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(_.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(_.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(A.id)}" type="button" ${d()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:m,publicRequestQrPage:p,loadingRequestForm:h,publicRequestForm:v,publicRequestError:y,publicRequestSuccess:k,publicRequestLinkManager:S,publicRequestLocationCard:q}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof _t<"u"&&(_t.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(c){return String(c||"").replace(/\/+$/,"")}function n(c=l.location,u=l.PUBLIC_APP_URL){if(u)return`${e(u)}/`;let f=c?.origin||"",i=c?.pathname||"/",m=i.indexOf("/auth/callback");if(m>=0)return`${f}${i.slice(0,m+1)}`;let p=i.endsWith("/")?i:i.replace(/[^/]*$/,"");return`${f}${p||"/"}`}function t(c=l.location,u=l.PUBLIC_APP_URL){return`${n(c,u)}auth/callback/`}function a(c={},u=l.location,f=l.PUBLIC_APP_URL){let i=new URL(n(u,f));return Object.entries(c).forEach(([g,m])=>{m!=null&&m!==""&&i.searchParams.set(g,m)}),i.href}function s(c){let u=new URL(c),f=new URLSearchParams(u.hash.replace(/^#/,"")),i=u.searchParams;return{code:i.get("code")||"",type:f.get("type")||i.get("type")||"",accessToken:f.get("access_token")||i.get("access_token")||"",refreshToken:f.get("refresh_token")||i.get("refresh_token")||"",error:f.get("error")||i.get("error")||"",errorCode:f.get("error_code")||i.get("error_code")||"",errorDescription:f.get("error_description")||i.get("error_description")||""}}function d(c){return!!(c?.code||c?.accessToken&&c?.refreshToken||c?.error||c?.errorDescription)}function r(c){return c?.type==="recovery"||!c?.type&&!!(c?.accessToken&&c?.refreshToken)}function o(c=l.location){let u=new URL(c.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>u.searchParams.delete(f)),u.hash="",u.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:a,authParamsFromHref:s,isAuthCallbackParams:d,isPasswordRecoveryParams:r,cleanAuthUrl:o}})(window);var ke="maintainops.equipmentCreateDraft.v1:",$t=new Set(["name","asset_code","asset_tag","manufacturer","model","location_existing","location_new","asset_type","parent_asset_id","location_id","safety_devices_required"]);function Ct(l){return Ie({...l,selector:"#create-asset-form, [data-create-pm-form], #create-procedure-form, [data-add-step]",getFormKey:e=>e.id==="create-asset-form"?"":e.dataset.addStep?`:step:${e.dataset.addStep}`:e.hasAttribute("data-create-pm-form")?`:pm:${e.dataset.equipmentPmForm||"new"}`:":procedure",fieldNames:[...$t,"title","asset_id","frequency","next_due_at","procedure_template_id","description","prompt","response_type","required"]})}function Ie({documentRef:l=document,getScope:e,storage:n=()=>sessionStorage,now:t=Date.now,selector:a="#create-asset-form",getFormKey:s=()=>"",fieldNames:d=$t}){let r=new Map,o=new Set(d),c,u=()=>[...l.querySelectorAll(a)],f=_=>e()?e()+s(_):"",i=_=>u().find(w=>w.dataset.equipmentScope===_),g=_=>[..._.querySelectorAll("[name]")].filter(w=>o.has(w.name)&&!["file","hidden"].includes(w.type)),m=_=>g(_).map(w=>[w.name,w.type==="checkbox"?w.checked:w.value]);function p(_){r.delete(_);try{n().removeItem(ke+_)}catch{}}function h(_){try{let b=n().getItem(ke+_);!r.has(_)&&b&&b.length<1e5&&r.set(_,JSON.parse(b))}catch{}let w=r.get(_);return!w||!Number.isFinite(w.at)||w.at>t()||t()-w.at>864e5||!Array.isArray(w.fields)||!w.fields.every(b=>Array.isArray(b)&&o.has(b[0])&&(b[0]==="safety_devices_required"?typeof b[1]=="boolean":typeof b[1]=="string"))?(p(_),null):w}function v(_){let w=_?.dataset.equipmentScope;if(!w||w!==f(_))return;let b={at:t(),fields:m(_)};r.set(w,b);try{n().setItem(ke+w,JSON.stringify(b))}catch{}return{scope:w,fields:JSON.stringify(b.fields)}}function y(){let _=l.activeElement,w=u();for(let C of w)C.dataset.equipmentDirty&&v(C);let b=w.find(C=>C.contains(_)),P=b?_.getBoundingClientRect():null;c=P&&b.dataset.equipmentScope===f(b)&&P.bottom>0&&P.top<l.defaultView.innerHeight?{scope:f(b),name:_.name,start:_.selectionStart,end:_.selectionEnd}:null}function k(){for(let _ of u())S(_);c=null}function S(_){let w=f(_);if(!w)return;_.dataset.equipmentScope=w;let b=h(w);if(b){for(let[C,T]of b.fields){let W=g(_).find(R=>R.name===C);W&&(W.type==="checkbox"?W.checked=T:(W.value=T,W.tagName==="SELECT"&&![...W.options].some(R=>R.value===T)&&W.setCustomValidity("Choose an available option.")))}_.dataset.equipmentDirty="true"}let P=c?.scope===w&&g(_).find(C=>C.name===c.name);P&&(c.start!=null&&P.setSelectionRange(c.start,c.end),P.focus({preventScroll:!0}))}function q(_){if(!_||JSON.stringify(h(_.scope)?.fields)!==_.fields)return;let w=i(_.scope);if(w?.dataset.equipmentScope===_.scope&&JSON.stringify(m(w))!==_.fields){v(w);return}p(_.scope),w?.dataset.equipmentScope===_.scope&&w.reset()}function A(){r.clear(),c=null;try{let _=n();for(let w=_.length-1;w>=0;w--)(_.key(w)?.startsWith(ke)||_.key(w)?.startsWith("maintainops.checklistResponseDraft.v1:"))&&_.removeItem(_.key(w))}catch{}}for(let _ of["input","change"])l.addEventListener(_,w=>{let b=w.target.form;!b?.matches(a)||!o.has(w.target.name)||(w.target.setCustomValidity(""),b.dataset.equipmentDirty="true",v(b))});return l.addEventListener("reset",_=>{let w=_.target;!w.matches(a)||w.dataset.equipmentScope!==f(w)||(p(w.dataset.equipmentScope),delete w.dataset.equipmentDirty,g(w).forEach(b=>b.setCustomValidity("")))}),l.defaultView.addEventListener("pagehide",y),l.addEventListener("visibilitychange",()=>{l.hidden&&y()}),{capture:y,restore:k,snapshot:v,clear:q,reset:A}}function At({getScope:l,getCompanyId:e,client:n,applyResults:t}){let a,s=new Set,d=new Map;function r(){let c=l();return a!==c&&(a=c,s.clear(),d.clear()),c}async function o(c){if(!c.length)return;let u=r(),f=e(),i=[],g={},m=new Set,p;c.forEach(v=>d.set(v,g));let h=()=>c.filter(v=>d.get(v)===g);try{for(;;){let{data:y,count:k,error:S}=await n().from("work_order_step_results").select("*",{count:"exact"}).eq("company_id",f).in("work_order_id",c).order("id").range(i.length,i.length+999);if(u!==r())return;if(S)throw S;if(!Number.isInteger(k)||k<0)throw Error("Checklist result count unavailable.");if(p!==void 0&&p!==k)throw Error("Checklist results changed while loading.");if(p=k,!Array.isArray(y)||i.length+y.length>k)throw Error("Checklist result page invalid.");for(let q of y){if(!q.id||m.has(q.id)||!c.includes(q.work_order_id))throw Error("Checklist result page invalid.");m.add(q.id)}if(i.push(...y||[]),i.length>=k)break;if(!y?.length)throw Error("Checklist results were incomplete.")}let v=h();v.forEach(y=>s.delete(y)),v.length&&t(v,i.filter(y=>v.includes(y.work_order_id)))}catch(v){throw u===r()&&h().forEach(y=>s.add(y)),v}}return{load:o,hasError(c){return r(),s.has(c)}}}async function Pt(l,e,n=()=>""){let t=[],a=new Set,s,d=r=>({data:[],error:{code:"INCOMPLETE_WORKSPACE_DATA",message:`${l} could not be fully loaded: ${r} Refresh and try again.`}});try{for(;;){let r=await e().range(t.length,t.length+999);if(r.error)return{...r,data:[]};if(!Number.isSafeInteger(r.count)||r.count<0)return d("the exact row count is unavailable.");if(!Array.isArray(r.data))return d("the server returned an invalid page.");if(s===void 0&&(s=r.count),r.count!==s)return d("records changed while loading.");if(t.length+r.data.length>s||r.data.length>1e3)return d("the page does not match its row count.");if(!r.data.length&&t.length<s)return d(`only ${t.length} of ${s} records arrived.`);for(let o of r.data){if(!o?.id||a.has(o.id))return d("a page contained missing or repeated record IDs.");let c=n(o);if(c)return d(c);a.add(o.id)}if(t.push(...r.data),t.length===s)return{...r,data:t}}}catch(r){return{data:[],error:r}}}function Et(l){let e=l.procedure_step_count?.[0]?.count,n=l.procedure_steps;return!Number.isSafeInteger(e)||e<0||!Array.isArray(n)?`the step count for procedure ${l.id} is unavailable.`:n.length!==e||new Set(n.map(t=>t?.id)).size!==e||n.some(t=>!t?.id)?`procedure ${l.id} returned ${n.length} of ${e} steps; the embedded checklist may be capped.`:""}(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l(w){return String(w||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(w){return w.toISOString().slice(0,10)}function n(w){return w.toISOString()}function t(w){let b=new Date;return b.setDate(b.getDate()-w),b}function a(){let w=new Date;return new Date(w.getFullYear(),w.getMonth(),1)}function s(w=new Date){let b=new Date(w);b.setHours(0,0,0,0),b.setDate(b.getDate()-b.getDay());let P=new Date(b);return P.setDate(P.getDate()+7),{start:b,end:P}}function d(w,b){let P=[];for(let C=0;C<w.length;C+=b)P.push(w.slice(C,C+b));return P}function r(w){return o(w).replace(/\.[^/.]+$/,"")||"photo"}function o(w){return String(w||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function c(w){return w==="active"||w==="all"?"Active":w==="overdue"?"Overdue":w==="completed"?"All Completed":w==="completed_month"?"Completed Month":w==="completed_week"?"Done This Week":w==="open"?"New":String(w||"").replaceAll("_"," ").replace(/\b\w/g,b=>b.toUpperCase())}function u(w){let b=String(w||"corrective").trim().toLowerCase();return b==="inspection"?"preventive":b==="reactive"||b==="request"?"corrective":["corrective","preventive","fabrication"].includes(b)?b:"corrective"}function f(w){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[u(w)]}function i(w){let b=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],P=String(w||"technician").trim().toLowerCase();return P==="member"?"technician":b.includes(P)?P:"technician"}function g(w){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[i(w)]||"Technician"}function m(w){let b={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return b[i(w)]||b.technician}function p(w){return new Date(`${w}T00:00:00`).toLocaleDateString()}function h(w){let b=[new Date(w.created_at).toLocaleString()];return w.file_size_bytes&&b.push(y(w.file_size_bytes)),w.original_size_bytes&&w.file_size_bytes&&w.original_size_bytes!==w.file_size_bytes&&b.push(`optimized from ${y(w.original_size_bytes)}`),b.join(" - ")}function v(w){let b=[];return(w.photo_uploaded_at||w.updated_at||w.created_at)&&b.push(new Date(w.photo_uploaded_at||w.updated_at||w.created_at).toLocaleString()),w.photo_file_size_bytes&&b.push(y(w.photo_file_size_bytes)),w.photo_original_size_bytes&&w.photo_file_size_bytes&&w.photo_original_size_bytes!==w.photo_file_size_bytes&&b.push(`optimized from ${y(w.photo_original_size_bytes)}`),b.join(" - ")||"Photo attached"}function y(w){let b=Number(w)||0;return b?b<1024?`${b} B`:b<1048576?`${Math.round(b/1024)} KB`:`${(b/1048576).toFixed(b>=10485760?0:1)} MB`:""}function k(w){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(w)||0)}function S(w){return Number(w.unit_cost_at_use??w.parts?.unit_cost??0)||0}function q(w){if(!w.due_at||w.status==="completed")return null;let b=new Date;b.setHours(0,0,0,0);let P=new Date(`${w.due_at}T00:00:00`),C=Math.round((P-b)/864e5);return C<0?{label:"overdue",className:"overdue"}:C===0?{label:"due today",className:"due_today"}:null}function A(){let w=new Date;return w.setHours(0,0,0,0),w}function _(w){return`"${String(w??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:a,sundayWeekRange:s,chunkArray:d,fileBaseName:r,safeFileName:o,statusLabel:c,normalizeWorkOrderType:u,workOrderTypeLabel:f,normalizeRole:i,roleLabel:g,roleDescription:m,formatDate:p,photoMetaText:h,requestPhotoMetaText:v,formatBytes:y,money:k,partUsageUnitCost:S,getDueState:q,startOfToday:A,csvCell:_})})();(function(){function l(s,d){let r=s?.message||"";return d.some(o=>r.includes(o))}function e(s,d){let r=s?.message||"";return r.includes(d)&&(r.includes("column")||r.includes("schema cache"))}function n(s){let d=s?.message||"";return d.includes("work_order_comments_company_author_profile_fkey")||d.includes("profiles")}function t(s){let d=s?.message||"";return!!(d.includes("procedure_template_id")||d.includes("procedure_templates")||d.includes("procedure_steps"))}function a(s){return l(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:a}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let a,s=new Promise((d,r)=>{a=setTimeout(()=>r(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var Xr=N(Rt()),ea=N(Wt());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function a(f){return d(`?request=${encodeURIComponent(f)}`)}function s(f){return d(`?qr=${encodeURIComponent(f)}`)}function d(f){let i=r();if(!i)return"";let g=new URL(i);return g.search=f,g.hash="",g.toString()}function r(){let i=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return i?o(i):""}function o(f){try{let i=new URL(String(f||"").trim(),n.location.href);return i.protocol!=="https:"||!c(i.hostname)?"":(i.search="",i.hash="",i.pathname&&i.pathname!=="/"&&!i.pathname.endsWith("/")&&!i.pathname.endsWith(".html")&&(i.pathname=`${i.pathname}/`),i.toString())}catch{return""}}function c(f){let i=String(f||"").toLowerCase();return!(!i||i==="localhost"||i.endsWith(".localhost")||i==="127.0.0.1"||i==="::1"||i==="[::1]"||/^10\./.test(i)||/^192\.168\./.test(i)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(i))}function u(f,i=4){if(!n.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let g=n.qrcode(0,"M");return g.addData(f),g.make(),g.createSvgTag(i,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:s,publicAppUrlWithSearch:d,publicAppBaseUrl:r,normalizePublicAppUrl:o,isPublicAppHost:c,qrSvgFor:u}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),a=n.querySelector("#print-public-qr");!a||typeof t!="function"||a.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(t){if(typeof t!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(t)||t.startsWith("0000"))return null;let a=new Date(`${t}T00:00:00Z`);return Number.isFinite(a.getTime())&&a.toISOString().slice(0,10)===t?a:null}function e(t){return l(t)?new Date(`${t}T00:00:00`):null}function n(t,a){let s=l(t);if(!s)throw new RangeError("PM due date must be a valid YYYY-MM-DD date.");if(!["weekly","monthly","quarterly"].includes(a))throw new RangeError("PM frequency must be weekly, monthly, or quarterly.");if(a==="weekly")s.setUTCDate(s.getUTCDate()+7);else{let d=s.getUTCDate();s.setUTCDate(1),s.setUTCMonth(s.getUTCMonth()+(a==="monthly"?1:3));let r=new Date(s);r.setUTCMonth(r.getUTCMonth()+1,0),s.setUTCDate(Math.min(d,r.getUTCDate()))}if(s.getUTCFullYear()>9999)throw new RangeError("PM next due date is outside the supported date range.");return s.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={localDateOnly:e,nextDueDate:n}})();var aa=N(Ot()),oa=N(xt());(function(){function l(e){function n(c){return e[c]()}function t(c,u){return typeof e[c]=="function"?e[c]():u}function a(c){let u=n("searchQuery"),f=n("activeSection"),i=n("activeStatusFilter"),g=!!u.trim();return o(s(c,{statusFilter:g?"__any__":f==="work"&&i==="requests"?"__none__":i,section:f,includeQueue:!g,includeSearch:!0}))}function s(c,u={}){let f=u.section||n("activeSection"),i=c.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(i=i.eq("location_id",n("activeLocationId"))),u.includeQueue!==!1&&(i=d(i,f)),u.includeAttributeFilters!==!1&&f==="work"){let g=t("workOrderTypeFilter","all"),m=t("workOrderPriorityFilter","all");g!=="all"&&(i=i.eq("type",g)),m!=="all"&&(i=i.eq("priority",m))}if(i=r(i,u.statusFilter||n("activeStatusFilter")),u.includeSearch!==!1){let g=e.postgrestSearchTerm(n("searchQuery"));if(g){let m=n("workOrderRelatedSearch"),p=[`title.ilike.%${g}%`,`description.ilike.%${g}%`,`production_action.ilike.%${g}%`,`priority.ilike.%${g}%`,`type.ilike.%${g}%`,`status.ilike.%${g}%`,...m.assetIds.length?[`asset_id.in.(${m.assetIds.join(",")})`]:[],...m.procedureIds.length?[`procedure_template_id.in.(${m.procedureIds.join(",")})`]:[],...m.workOrderIds.length?[`id.in.(${m.workOrderIds.join(",")})`]:[]];i=i.or(p.join(","))}}return i}function d(c,u){if(u==="mywork"){let f=n("session").user.id;return n("myWorkFilter")==="created"?c.eq("created_by",f):c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}if(u!=="work")return c;if(n("workOrderAssigneeFilter")){let f=n("workOrderAssigneeFilter");return c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?c.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?c.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?c.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):c}function r(c,u){let f=e.isoDate(e.startOfToday());if(u==="__any__")return c;if(u==="__none__")return c.eq("id","00000000-0000-0000-0000-000000000000");if(u==="overdue")return c.neq("status","completed").lt("due_at",f);if(u==="completed_month")return c.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(u==="completed_week"){let i=e.sundayWeekRange();return c.gte("completed_at",e.isoDateTime(i.start)).lt("completed_at",e.isoDateTime(i.end))}return u==="active"||u==="all"?c.neq("status","completed"):c.eq("status",u)}function o(c){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?c.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?c.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?c.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?c.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?c.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):c.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:d,applyWorkOrderStatusFilter:r,applyWorkOrderSort:o}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let s=n.querySelector(`#${a.dataset.jumpWorkSection}`);if(!s)return;let d=s.closest("details");d&&(d.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let r=s;r.classList.add("jump-highlight","field-jump-highlight"),t(()=>r.classList.remove("jump-highlight"),1400),t(()=>r.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.renderWorkspace,d=e.setWorkOrderSearchMode;if(!a||!s||!d)return;let r=()=>{a.setSearchQuery(""),d(!1),t.setItem("maintainops.searchQuery","")},o=c=>{a.setActiveSection(c),t.setItem("maintainops.activeSection",c)};n.querySelectorAll("[data-search-work-order]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveWorkOrderId(c.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),o("work"),r(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveAssetId(c.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),o("assets"),r(),s()})}),n.querySelectorAll("[data-search-part]").forEach(c=>{c.addEventListener("click",()=>{a.setActivePartId(c.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),o("parts"),r(),s()})}),n.querySelectorAll("[data-search-request]").forEach(c=>{c.addEventListener("click",()=>{o("requests"),r(),s()})}),n.querySelectorAll("[data-search-section]").forEach(c=>{c.addEventListener("click",()=>{o(c.dataset.searchSection),r(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(a={}){let s=a.documentRef||document,d=a.storage||localStorage,r=a.state,o=a.windowRef||(typeof window<"u"?window:null),c=a.setTimeoutRef||setTimeout,u=a.clearTimeoutRef||clearTimeout,f=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!r)return;let i=()=>{e+=1,l!==null&&(u(l),l=null)},g=p=>{p&&typeof o?.scrollTo=="function"&&o.scrollTo(p.x,p.y)},m=(p,h,v,y)=>{let k=s.getElementById?s.getElementById(p):s.querySelector(`#${p}`);if(!k)return;let S=k.value.length,q=Math.min(h??S,S),A=Math.min(v??q,S);k.focus({preventScroll:!0}),k.setSelectionRange(q,A),g(y)};s.querySelectorAll(".workspace-search-input").forEach(p=>{p.addEventListener("input",()=>{let h=p.id,v=p.selectionStart,y=p.selectionEnd;i();let k=e;r.setSearchQuery(p.value),a.invalidateExactWorkOrderSearchCache(),r.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),r.getSearchQuery().trim()&&(r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setQuickFixMode(!1),r.setCreateWorkOrderMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)),d.setItem("maintainops.searchQuery",r.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),l=c(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(k!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),k!==e))return;let S=o?{x:Number(o.scrollX||o.pageXOffset||0),y:Number(o.scrollY||o.pageYOffset||0)}:null,q=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),A=!("activeElement"in s)||s.activeElement===q;a.renderWorkspace(),A?m(h,v,y,S):g(S)}),n),f)})}),s.querySelectorAll("[data-view-work-search]").forEach(p=>{p.addEventListener("click",async()=>{i(),r.setActiveSection("work"),r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),d.setItem("maintainops.activeSection",r.getActiveSection()),await a.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(p=>{p.addEventListener("click",async()=>{i(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}async function d(r){let o=Number(a?.scrollY??a?.pageYOffset??0);if(await r(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(o));return}s(o)}}n.querySelectorAll("[data-status-filter]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(r.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setMyWorkFilter(r.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setWorkOrderFilter(r.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{t.setActiveStatusFilter(r.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{let o=r.value||"all";t.setWorkOrderFilter(o),o!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{let o=r.value||"";t.setWorkOrderAssigneeFilter(o),o&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{t.setWorkOrderTypeFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{t.setWorkOrderPriorityFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setWorkSort(r.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{t.setWorkSort(r.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{t.setWorkGroup(r.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{t.setWorkOrderAssigneeFilter(r.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(r=>{r.addEventListener("click",async()=>{r.disabled||await d(async()=>{t.setRequestViewFilter(r.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(r.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setPartsPage(t.getPartsPage()+(r.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setAssetsPage(t.getAssetsPage()+(r.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{t.setFinancialPage(t.getFinancialPage()+(r.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(r=>{r.addEventListener("change",async()=>{await d(async()=>{r.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(r.value),r.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(r.value),r.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(r.value),r.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(r.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(r=>{r.addEventListener("click",async()=>{await d(async()=>{let o=r.dataset.pageDirection==="next"?1:-1;if(r.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+o),await e.reloadRequestQueue();return}if(r.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+o),r.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+o),r.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+o),r.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+o),r.dataset.listPage?.startsWith("planning-")){let c=r.dataset.listPage.replace("planning-","");t.setPlanningPage(c,t.getPlanningPage(c)+o)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(r=>{r.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(r.dataset.planningGroup,!!r.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.windowRef||(typeof window<"u"?window:null),d=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let r=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function o(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function c(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function u(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function f(){e.renderWorkspace()}function i(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function g(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function m(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(g);return}g()}let p=n.querySelector("#back-to-my-work");p&&p.addEventListener("click",async()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),i(),r(),typeof e.returnToWorkOrderQueue=="function"?await e.returnToWorkOrderQueue():e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),i(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.id),a.setActiveAssetId(null),i(),r(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation(),a.setActiveWorkOrderId(y.dataset.workPhotoJump),a.setActiveAssetId(null),i(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",k=>{k.stopPropagation(),a.setActiveAssetId(y.dataset.openAsset),a.setActiveWorkOrderId(null),i(),r(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),d()})}),n.querySelectorAll(".asset-card[data-asset-id]").forEach(y=>{let k=()=>{a.setActiveAssetId(y.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),i(),r(),a.setReportIssueMode(!1),a.setActiveSection("assets"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),d()};y.addEventListener("click",k),y.addEventListener("keydown",S=>{S.key!=="Enter"&&S.key!==" "||(S.preventDefault(),k())})});let v=0;n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",async()=>{if(typeof e.openLinkedWorkOrder=="function"){let k=++v,S=()=>k===v;i();try{await e.openLinkedWorkOrder(y.dataset.miniWorkOrder,{isCurrent:S})&&d()}catch(q){S()&&e.showNotice?.(`Could not open work order: ${q.message||q}`,"warning")}return}a.setActiveWorkOrderId(y.dataset.miniWorkOrder),a.setActiveAssetId(null),i(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),d()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{let k=y.open;y.addEventListener("toggle",async()=>{if(y.open===k)return;k=y.open;let S=y.dataset.assetId,q=y.dataset.assetRelationshipSection;if(!(!S||!q)&&(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(S,q,y.open),!!y.open)){if(u(q)){let A=y.querySelector?.(".mini-list");A&&(A.textContent="Loading work history..."),await o(S)}else if(q==="asset-history")await c(S);else return;y.isConnected===!1||!y.open||f()}}),y.open&&u(y.dataset.assetRelationshipSection)&&e.getAssetWorkHistory?.(y.dataset.assetId)?.historyStatus==="idle"&&o(y.dataset.assetId).then(()=>{y.isConnected!==!1&&y.open&&f()})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let S=y.dataset.assetId,q=y.dataset.assetRelationSection,_=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(S,q):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(S,q,_),f()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async k=>{k.preventDefault(),k.stopPropagation();let S=y.dataset.openAssetHistory;S&&(a.setActiveAssetId(S),a.setActiveWorkOrderId(null),r(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(S),await c(S),e.renderWorkspace(),d())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let S=y.dataset.backAssetHistory;S&&a.setActiveAssetId(S),i(),e.renderWorkspace(),d()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();let S=y.dataset.assetId,A=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(S,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(S,"asset-history",A),e.renderWorkspace(),d()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}function d(){let r=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(r));return}s(r)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(r=>{r.addEventListener("click",()=>{t.setPartInventoryFilter(r.dataset.partInventoryFilter),e.resetPartsPage(),d()})}),n.querySelectorAll("[data-part-sort]").forEach(r=>{r.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(r.value||"default"),e.resetPartsPage(),d())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(r=>{r.addEventListener("click",()=>{let o=t.getAssetStatusFilter()===r.dataset.assetStatusFilter?"all":r.dataset.assetStatusFilter;t.setAssetStatusFilter(o),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),d()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(r=>{r.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let o=t.getAssetTypeFilter()===r.dataset.assetTypeFilter?"all":r.dataset.assetTypeFilter;t.setAssetTypeFilter(o),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),d()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(r=>{r.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(r.value||"all"),e.resetAssetsPage(),d())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(d){e.showNotice(`Could not update status: ${d.message||d}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",a=>a.stopPropagation()),t.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var ga=N(Mt()),ha=N(Dt());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let d=e.getWorkOrderById(s.dataset.id);if(!d)return;let r=s.dataset.copyDowntime==="subject",o=r?e.downtimeEmailSubject(d):e.downtimeEmailBody(d),c=await e.copyTextToClipboard(o);s.textContent=c?"Copied":"Copy failed",a(()=>{s.textContent=r?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var ba=N(Tt());(function(){function l(e={}){let n=e.documentRef||document,t=new Set;function a(r){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(r),e.renderWorkspace()}async function s(r){if(!t.has(r)){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}t.add(r);try{let o=e.removeWorkOrderDocuments?await e.removeWorkOrderDocuments(r):null,c=e.getPhotoPathsByWorkOrder(r),{error:u,data:f}=await e.withOperationTimeout(e.deleteWorkOrderRecord(r),"Work order delete timed out. Check your connection and try again.",15e3);if(u){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(u)}`);return}if(!Array.isArray(f)||!f.some(g=>g.id===r)){e.alertRef("Work order deletion was not confirmed. No attached files were removed.");return}let i=!1;try{if(o&&await o(),c.length){let g=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(c),"Work order photo cleanup timed out.",15e3);if(g.error)throw g.error}}catch(g){i=!0,e.warnRef("Deleted work order storage cleanup failed",g)}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice(i?"Work order deleted, but some stored files could not be removed. Report this for storage cleanup.":"Work order deleted.",i?"warning":"success"),await e.render()}catch(o){e.alertRef(`Could not delete work order: ${o.message||o}`)}finally{t.delete(r)}}}function d(){n.querySelectorAll("[data-delete-work-order]").forEach(r=>{r.addEventListener("click",o=>{o.stopPropagation(),a(r.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(r=>{r.addEventListener("click",o=>{o.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(r=>{r.addEventListener("click",async o=>{o.stopPropagation(),await s(r.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:d,deleteWorkOrder:s,requestDeleteWorkOrder:a}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace;if(!t||typeof a!="function")return;let s=0;async function d(r){let o=++s,c=()=>o===s&&r.isConnected!==!1;try{if(e.loadPartDetail&&await e.loadPartDetail(r.dataset.openPart,{isCurrent:c})===!1||!c())return;t.setActivePartId(r.dataset.openPart),a()}catch(u){c()&&e.showNotice?.(`Could not open part: ${u.message||u}`,"warning")}}n.querySelectorAll("[data-open-part]").forEach(r=>{r.addEventListener("click",()=>d(r)),r.addEventListener("keydown",o=>{o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),d(r))})}),n.querySelectorAll("[data-close-part-detail]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setActivePartId(null),t.setShowPartSourceManager(!1),a()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setShowPartSourceManager(!t.getShowPartSourceManager()),a()})})}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.messageComposerScopeNote,d=e.autoGrowTextarea;if(!t||typeof a!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(f=>f.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(f=>f.addEventListener("click",()=>e.setMessageView?.(f.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(f=>f.addEventListener("click",()=>e.quoteMessage?.(f.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(f=>f.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async f=>{f.currentTarget.disabled=!0;let i=f.currentTarget;try{await e.loadOlderMessages?.()}finally{i.isConnected&&(i.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let i=f.dataset.messageFilter;t.setMessageThreadFilter(i),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageThreadFilter",i),r.setItem("maintainops.messageThreadsPage","1"),a()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(f.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),r.setItem("maintainops.activeSection","work"),a()})});let o=n.querySelector("[data-clear-message-work-link]");o&&o.addEventListener("click",()=>{let f=n.querySelector('#message-thread-form [name="work_order_id"]');f&&(f.value=""),t.setMessageComposerWorkOrderId(""),r.setItem("maintainops.messageComposerWorkOrderId",""),a()});let c=n.querySelector("#message-search");c&&c.addEventListener("input",()=>{let f=c.value;t.setMessageSearchQuery(f),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageSearchQuery",f),r.setItem("maintainops.messageThreadsPage","1"),a();let i=n.querySelector("#message-search");i&&(i.focus({preventScroll:!0}),i.selectionStart!=null&&i.setSelectionRange(c.selectionStart,c.selectionEnd))});let u=n.querySelector("#message-thread-form");if(u){let f=u.querySelector("#message-thread-type"),i=u.querySelector(".message-direct-field"),g=u.querySelector("#message-scope-note");if(f&&i&&g&&typeof s=="function"){let m=()=>{let p=f.value==="direct";i.classList.toggle("hidden-section",!p);let h=i.querySelector("select");h&&(h.disabled=!p,h.required=p);let v=u.querySelector("[name='title']");v&&(v.required=!p),g.textContent=s(f.value),e.showExistingConversation?.(p?h?.value:"")};f.addEventListener("change",m),i.querySelector("select")?.addEventListener("change",m),m()}}n.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let i=n.querySelector("#message-thread-form");if(!i)return;let g=i.querySelector("details"),m=i.querySelector("#message-thread-type"),p=i.querySelector("select[name='direct_user_id']"),h=i.querySelector(".message-direct-field"),v=i.querySelector("#message-scope-note"),y=i.querySelector("input[name='title']");g&&(g.open=!0),m&&(m.value="direct"),p&&(p.value=f.dataset.messagePerson||"",p.disabled=!1),h&&h.classList.remove("hidden-section"),v&&typeof s=="function"&&(v.textContent=s("direct")),y&&y.focus(),p?.dispatchEvent(new Event("change",{bubbles:!0}))})}),n.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let g=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!g)return;let m=g.value.trim();g.value=m?`${m}
${f.dataset.quickReply}`:f.dataset.quickReply,g.dispatchEvent(new Event("input",{bubbles:!0})),g.focus(),typeof d=="function"&&d(g)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof a!="function"||typeof s!="function")return;let d=n.querySelector("#part-search-form");if(!d)return;let r=c=>{t.setPartSearchQuery(c||""),s(),a()},o=d.querySelector("input[name='part_search']");o&&o.addEventListener("input",()=>{r(o.value||"");let c=n.querySelector("#part-search");if(!c)return;c.focus();let u=c.value.length;c.setSelectionRange(u,u)}),d.addEventListener("submit",c=>{c.preventDefault();let u=e.FormDataRef||FormData,f=new u(d).get("part_search")||"";r(f),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(d=>{d.addEventListener("click",async()=>{let r=performance.now(),o=d.dataset.section;e.visibleNavItems().some(([c])=>c===o)&&(t.setActiveSection(o),o==="messages"&&e.openMessageHome?.(),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),o!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",o),e.renderWorkspace(),s(),o==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(o)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(o==="work"||o==="mywork")&&await e.reloadWorkOrderQueue(),o==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),o==="requests"&&await e.reloadRequestQueue(),o==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),o==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),o==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),o==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(o,r))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;async function s(d){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(d),e.getActiveThreadId&&e.getActiveThreadId()!==d||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(d),(!e.getActiveThreadId||e.getActiveThreadId()===d)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==d)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(d=>{d.addEventListener("click",async()=>{let r=d.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(r),a.setItem("maintainops.activeMessageThreadId",r),await s(r)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(d=>{d.addEventListener("click",async()=>{let r=d.dataset.openWorkMessageThread;t.setActiveMessageThreadId(r),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",r),a.setItem("maintainops.activeSection","messages"),await s(r)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let d=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(d),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",d),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",async()=>{if(t.disabled)return;t.disabled=!0;let a=t.textContent;t.textContent="Exporting...";try{await e.exportActiveSectionCsv()}finally{t.disabled=!1,t.textContent=a}})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var Ma=N(It());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(a=>{l(a),a.addEventListener("input",()=>l(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var Na=N(Ft());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(d=>{d.addEventListener("click",async()=>{let r=await t(d.dataset.copyTeamInvite||"");d.textContent=r?"Copied":"Copy failed",a(()=>{d.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(d=>{d.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(d=>{d.addEventListener("click",()=>{t.setQuickFixAssetId(d.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var za=N(Lt());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(d=>{d.addEventListener("click",async()=>{let r=await t(d.dataset.copyPublicRequestLink);d.textContent=r?"Copied":"Copy failed",a(()=>{d.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ha=N(Nt());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let d=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(a.dataset.createFollowUp,d?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var Ja=N(Ut());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,a=n.querySelector("#comment-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,a=n.querySelector("#quick-update-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,a=n.querySelector("#edit-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{t(a),a.addEventListener("change",()=>t(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var ro=N(Qt()),ao=N(Bt()),oo=N(jt()),io=N(zt()),so=N(Vt()),co=N(Ht()),lo=N(Gt()),uo=N(Yt()),po=N(Kt()),mo=N(Jt()),fo=N(Zt()),go=N(Xt()),ho=N(en()),yo=N(tn()),vo=N(nn()),bo=N(rn()),wo=N(an()),ko=N(on()),_o=N(sn()),So=N(cn()),qo=N(ln()),$o=N(un());(function(){function l(e){function n(a){return e[a]()}function t(a,s=n("requestViewFilter")){let d=a.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(d=d.eq("location_id",n("activeLocationId"))),s==="converted"?d=d.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(d=d.eq("status","submitted").is("converted_work_order_id",null));let r=e.postgrestSearchTerm(n("searchQuery"));if(r){let o=`%${r}%`,c=n("assets").filter(e.matchesActiveLocation).filter(u=>e.matchesQuery([u.name,u.asset_code,u.asset_tag,u.manufacturer,u.model,u.location,u.status,u.asset_type,e.parentAssetFor()(u)?.name],r)).map(u=>u.id).slice(0,e.SEARCH_ID_PAGE_SIZE);d=d.or([`title.ilike.${o}`,`description.ilike.${o}`,`status.ilike.${o}`,`priority.ilike.${o}`,`requested_by_name.ilike.${o}`,`requested_by_contact.ilike.${o}`,...c.length?[`asset_id.in.(${c.join(",")})`]:[]].join(","))}return d}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(g){return e[g]()}async function t(){let g=n("searchQuery").trim();if(!g||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let m=n("assets").filter(e.matchesActiveLocation).filter(y=>e.matchesQuery([y.name,y.asset_code,y.asset_tag,y.manufacturer,y.model,y.location,y.status,y.asset_type,e.parentAssetFor()(y)?.name],g)).map(y=>y.id),p=n("procedureTemplates").filter(y=>e.matchesQuery([y.name,y.description,...(y.procedure_steps||[]).map(k=>k.prompt)],g)).map(y=>y.id),h=n("parts").filter(e.matchesActiveLocation).filter(y=>e.matchesQuery([y.name,y.sku,y.supplier_name,y.quantity_on_hand,y.reorder_point,y.unit_cost],g)).map(y=>y.id),v=new Set;await Promise.all([a(v,h),s(v,"work_order_comments",["body"],g),s(v,"work_order_events",["event_type","summary"],g),s(v,"work_order_photos",["file_name"],g),s(v,"work_order_step_results",["value"],g)]),e.setWorkOrderRelatedSearch({assetIds:m.slice(0,200),procedureIds:p.slice(0,200),workOrderIds:[...v].slice(0,300)})}async function a(g,m,p={}){if(!m.length)return;let v=p.maxRows??300;for(let y of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE)){if(v<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",y),k=>{k.forEach(S=>{S.work_order_id&&g.add(S.work_order_id)}),v-=k.length},v)}catch(k){e.warn("Part-linked work order search failed",k);return}}}async function s(g,m,p,h,v={}){let y=e.postgrestSearchTerm(h);if(!y)return;let k=p.map(q=>`${q}.ilike.%${y}%`).join(","),S=v.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(m).select("work_order_id").eq("company_id",n("activeCompanyId")).or(k),q=>{q.forEach(A=>{A.work_order_id&&g.add(A.work_order_id)})},S)}catch(q){e.warn(`${m} work order search failed`,q)}}async function d(g={}){let m=await r(),p=m.length,h=Math.max(1,Math.ceil(p/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let v=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,y=m.slice(v,v+e.WORK_ORDERS_PER_PAGE).map(A=>A.id);if(!y.length)return{data:[],error:null,count:p};let k=g.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),S=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:k,ids:y});if(S.error)return S;let q=new Map((S.data||[]).map(A=>[A.id,A]));return{...S,data:y.map(A=>q.get(A)).filter(Boolean),count:p}}async function r(){let g=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),m=n("exactWorkOrderSearchCache");if(m.key===g)return m.rows;let p=n("searchQuery").trim(),h=new Map;await o(h,p);let v=n("assets").filter(e.matchesActiveLocation).filter(A=>e.matchesQuery([A.name,A.asset_code,A.asset_tag,A.manufacturer,A.model,A.location,A.status,A.asset_type,e.parentAssetFor()(A)?.name],p)).map(A=>A.id),y=n("procedureTemplates").filter(A=>e.matchesQuery([A.name,A.description,...(A.procedure_steps||[]).map(_=>_.prompt)],p)).map(A=>A.id),k=n("parts").filter(e.matchesActiveLocation).filter(A=>e.matchesQuery([A.name,A.sku,A.supplier_name,A.quantity_on_hand,A.reorder_point,A.unit_cost],p)).map(A=>A.id);await Promise.all([c(h,"asset_id",v),c(h,"procedure_template_id",y)]);let S=new Set;await Promise.all([a(S,k,{maxRows:1/0}),s(S,"work_order_comments",["body"],p,{maxRows:1/0}),s(S,"work_order_events",["event_type","summary"],p,{maxRows:1/0}),s(S,"work_order_photos",["file_name"],p,{maxRows:1/0}),s(S,"work_order_step_results",["value"],p,{maxRows:1/0})]),await u(h,[...S]);let q=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:g,rows:q}),q}async function o(g,m){let p=e.postgrestSearchTerm(m);if(!p)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(v=>`${v}.ilike.%${p}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),v=>i(g,v))}async function c(g,m,p){if(p.length)for(let h of e.chunkArray(p,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(m,h),v=>i(g,v))}async function u(g,m){if(m.length)for(let p of e.chunkArray(m,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",p),h=>i(g,h))}function f(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function i(g,m){(m||[]).forEach(p=>{p?.id&&g.set(p.id,{...g.get(p.id)||{},...p})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:d,exactWorkOrderSearchRows:r,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(r){return e[r]()}function t(){let r=n("searchQuery").trim(),o=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),c=n("assets").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.asset_code,m.asset_tag,m.manufacturer,m.model,m.location,m.status],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("parts").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.sku,m.supplier_name,m.quantity_on_hand,m.reorder_point],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.title,m.description,m.status,m.priority,m.assets?.name,n("profilesByUserId")[m.requested_by]?.full_name],r)).sort((m,p)=>new Date(p.created_at)-new Date(m.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),i=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.title,m.frequency,m.next_due_at,m.assets?.name],r)).sort((m,p)=>String(m.next_due_at||"").localeCompare(String(p.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),g=n("procedureTemplates").filter(m=>e.matchesQuery([m.name,m.description,...(m.procedure_steps||[]).map(p=>p.prompt)],r)).sort((m,p)=>m.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:o,assets:c,parts:u,requests:f,pm:i,procedures:g}}function a(r="all"){let o=e.startOfToday(),c=new Date(o);return c.setDate(c.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(u=>u.status!=="completed").filter(u=>e.matchesSearch([u.title,u.description,u.priority,u.status,u.assets?.name,e.assignmentLabel(u)])).filter(u=>r==="no_due"?!u.due_at:!!u.due_at).map(u=>{let f=u.due_at?new Date(`${u.due_at}T00:00:00`):null;return{kind:r==="no_due"?"no_due":"work",id:u.id,title:u.title,priority:u.priority,status:u.status,assetName:u.assets?.name||"No equipment",dueAt:u.due_at,due:f,createdAt:u.created_at||"",assignedTo:e.assignmentLabel(u),workOrder:u}}).filter(u=>r==="no_due"?!0:r==="overdue"?u.due<o:r==="today"?u.due.getTime()===o.getTime():r==="soon"?u.due>o&&u.due<=c:!0).sort((u,f)=>{if(r==="no_due"){let i={critical:4,high:3,medium:2,low:1};return(i[f.priority]||0)-(i[u.priority]||0)||new Date(u.createdAt||0)-new Date(f.createdAt||0)}return u.due-f.due})}function s(){let r=e.startOfToday(),o=new Date(r);return o.setDate(o.getDate()+7),n("preventiveSchedules").filter(c=>c.active!==!1).filter(e.matchesActiveLocation).filter(c=>{let u=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(c.next_due_at);return u&&u>=r&&u<=o}).filter(c=>e.matchesSearch([c.title,c.frequency,c.next_due_at,c.assets?.name])).map(c=>({kind:"pm",id:c.id,title:c.title,assetName:c.assets?.name||"No equipment",dueAt:c.next_due_at,due:window.MaintainOpsMaintenanceScheduleDates.localDateOnly(c.next_due_at)})).sort((c,u)=>c.due-u.due)}function d(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(r=>r.follow_up_needed).filter(r=>e.matchesSearch([r.title,r.description,r.failure_cause,r.resolution_summary,r.assets?.name,r.assigned_profile?.full_name])).map(r=>({kind:"follow_up",id:r.id,title:r.title,assetName:r.assets?.name||"No equipment",completedAt:r.completed_at?new Date(r.completed_at).toLocaleDateString():"not completed",resolution:r.resolution_summary||r.completion_notes||"",workOrder:r})).sort((r,o)=>r.title.localeCompare(o.title))}return{globalSearchResults:t,planningItems:a,planningPmItems:s,followUpItems:d}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,a){return n.from("locations").insert({company_id:t,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(d,r){return d.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",r)}function e(d,r){return d.from("company_members").select("*").eq("company_id",r).order("created_at",{ascending:!0})}function n(d,r){return d.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",r).order("created_at",{ascending:!1})}function t(d,r){return d.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",r).order("created_at",{ascending:!1})}function a(d,r){return d.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",r).order("created_at",{ascending:!1})}function s(d,r){return d.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",r).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:a,listRequestNotificationRecipients:s}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(c,u,f={}){return c.from("work_orders").select(u,f)}function e(c){return c.from("work_orders").select("id",{count:"exact",head:!0})}function n(c,u,f,i){return c.from("work_orders").select(i).eq("company_id",u).eq("id",f).maybeSingle()}async function t(c,u,f){let i=()=>e(c).eq("company_id",u).eq("asset_id",f),[g,m]=await Promise.all([i().neq("status","completed"),i().eq("status","completed")]),p=g.error||m.error;return p?{error:p}:[g.count,m.count].every(h=>Number.isInteger(h)&&h>=0)?{data:{open:g.count,completed:m.count},error:null}:{error:new Error("Equipment work counts are unavailable.")}}async function a(c,u,f,i){let g=[];for(;;){let m=await c.from("work_orders").select(i,{count:"exact"}).eq("company_id",u).eq("asset_id",f).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}).order("id",{ascending:!0}).range(g.length,g.length+999);if(m.error)return m;let p=m.data||[];if(g.push(...p),!p.length||(Number.isInteger(m.count)?g.length>=m.count:p.length<1e3))return{data:g,error:null}}}async function s(c,u){let{companyId:f,locationId:i,locationsReady:g,selectClause:m,ids:p}=u,h=c.from("work_orders").select(m).eq("company_id",f).in("id",p);return g&&i&&(h=h.eq("location_id",i)),h}function d(c,u){let{companyId:f,locationId:i,locationsReady:g}=u,m=c.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",f);return g&&i&&(m=m.eq("location_id",i)),m}function r(c,u){let{companyId:f,locationId:i,locationsReady:g}=u,m=c.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",f).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return g&&i&&(m=m.eq("location_id",i)),m.order("id",{ascending:!0})}async function o(c,u,f=1/0,i=1e3){let g=0,m=0;for(;m<f;){let p=Math.min(i,f-m),{data:h,error:v}=await c().range(g,g+p-1);if(v)throw v;let y=h||[];if(u(y),m+=y.length,y.length<p)break;g+=p}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:a,fetchAssetWorkOrderCounts:t,fetchWorkOrdersByIds:s,scopedWorkOrderSearchQuery:d,scopedTeamWorkloadQuery:r,fetchPagedSearchRows:o}})();var Mo=N(dn());(function(){function l(s){return s.rpc("get_my_companies")}function e(s,d){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",d).order("created_at",{ascending:!0})}function n(s,d){return s.from("company_members").select("company_id, role").eq("user_id",d).order("created_at",{ascending:!0})}function t(s,d){return s.from("companies").select("id, name, logo_path, created_at").in("id",d).order("created_at",{ascending:!0})}function a(s,d){return s.from("companies").select("id, name, created_at").in("id",d).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:a}})();(function(){function l(a,s){return a.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}async function e(a,s){let d=await a.from("app_issue_reports").insert(s);if(d.error?.code!=="23505"||!s.id)return d;let r=await a.from("app_issue_reports").select("*").eq("id",s.id).eq("company_id",s.company_id).eq("reporter_id",s.reporter_id).maybeSingle(),o=["company_id","reporter_id","location_id","screen","page_url","severity","title","details"];return!r.error&&r.data&&o.every(c=>(r.data[c]??null)===(s[c]??null))?{data:r.data,error:null}:d}function n(a,s,d,r){return a.from("app_issue_reports").update({status:r,resolved_at:r==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",d)}function t(a,s,d){return a.from("app_issue_reports").delete().eq("company_id",s).eq("id",d)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,a){return t.from("user_preferences").select(l).eq("user_id",a).maybeSingle()}function n(t,a,s){return t.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Fo=N(pn()),Lo=N(mn()),No=N(fn()),Uo=N(gn());(function(){function l(t,a,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${a}</strong></article>`}function e(t,a,s,d="neutral"){return`
    <article class="insight dashboard-card tone-${d}">
      <span>${t}</span>
      <strong>${a}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(r=>String(r||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),d=window.MaintainOpsDom?.escapeHtml||(r=>String(r??""));return`
    <section class="team-role-guide">
      ${t.map(r=>`
        <article>
          <strong>${a(r)}</strong>
          <span>${d(s(r))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var Bo=N(hn());(function(){function l(f,i,g="active",m={},p){let h=p.getActiveStatusFilter(),v=m.filter||m.section,y=v?"button":"article",k=m.filter&&h===m.filter?" selected":"",S=g.includes("overdue")&&Number(i)>=3,q=S?" alert-blink":"",A=[v?'type="button"':"",m.filter?`data-status-filter="${m.filter}" aria-pressed="${h===m.filter}"`:"",m.section?`data-section="${m.section}"`:""].filter(Boolean).join(" "),_=A?` ${A}`:"";return`
    <${y} class="gauge-readout ${g}${k}${q}"${_}>
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
      <strong>${i}</strong>
      <span>${p.escapeHtml(f)}</span>
    </${y}>
  `}function e(f){let i=f.getWorkOrderDashboardCounts()||{},g=i.activeWork||0,m=i.newWork||0,p=i.inProgress||0,h=i.blocked||0,v=i.overdue||0,y=i.completedAll||0,k=i.completedMonth||0,S=i.completedWeek||0,q=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",g,"active",{filter:"active"},f)}
      ${l("New",m,"new",{filter:"open"},f)}
      ${l("In Progress",p,"in_progress",{filter:"in_progress"},f)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${l("Overdue",v,"overdue",{filter:"overdue"},f)}
      ${l("Requests",q,"request",{filter:"requests"},f)}
      ${l("All Completed",y,"completed",{filter:"completed"},f)}
      ${l("Completed Month",k,"completed",{filter:"completed_month"},f)}
      ${l("Done This Week",S,"completed",{filter:"completed_week"},f)}
    </div>
  `}function n(f,i){let g=f||{},m=g.newWork||0,p=g.inProgress||0,h=g.blocked||0,v=g.activeWork??m+p+h,y=g.overdue||0,k=g.completedAll||0,S=g.completedMonth||0,q=g.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",v,"active workload-pill",{filter:"active"},i)}
      ${l("New",m,"new workload-pill",{filter:"open"},i)}
      ${l("In Progress",p,"in_progress workload-pill",{filter:"in_progress"},i)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},i)}
      ${l("Overdue",y,"overdue workload-pill",{filter:"overdue"},i)}
      ${l("All Completed",k,"completed workload-pill",{filter:"completed"},i)}
      ${l("Completed Month",S,"completed workload-pill",{filter:"completed_month"},i)}
      ${l("Done This Week",q,"completed workload-pill",{filter:"completed_week"},i)}
    </div>
  `}function t(f){return f.getWorkOrders().filter(i=>f.getDueState(i)?.className==="overdue")}function a(f){return f.getWorkOrders().filter(i=>s(i,f))}function s(f,i,g=new Date){if(!f.completed_at)return!1;let m=new Date(f.completed_at),p=i.sundayWeekRange(g);return Number.isFinite(m.getTime())&&m>=p.start&&m<p.end}function d(f){return f.getWorkOrders().filter(r)}function r(f){let i=new Date,g=new Date(i.getFullYear(),i.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=g)}function o(f){let i=f.filter(m=>m.status==="completed"&&Number(m.actual_minutes)>0);if(!i.length)return 0;let g=i.reduce((m,p)=>m+Number(p.actual_minutes||0),0);return Math.round(g/i.length)}function c(f){let i=new Date;i.setHours(0,0,0,0);let g=new Date(i);return g.setDate(g.getDate()+7),f.getPreventiveSchedules().filter(m=>{if(m.active===!1)return!1;let p=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(m.next_due_at);return p&&p>=i&&p<=g})}function u(f){return Object.freeze({renderGaugeReadout:(i,g,m="active",p={})=>l(i,g,m,p,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:i=>n(i,f),overdueWorkOrders:()=>t(f),completedThisWeek:()=>a(f),isCompletedThisWeek:(i,g)=>s(i,f,g),completedThisMonth:()=>d(f),isCompletedThisMonth:r,averageCompletionMinutes:(i=f.getWorkOrders())=>o(i),preventiveDueSoon:()=>c(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:u})})();(function(){function l(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",forklift:"Forklift / Mobile Lift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:a,getPartInventoryFilter:s,assetTypeLabel:d,assetStatusLabel:r}){function o(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function c(){let f=n(),i=t?t():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${r(f).toLowerCase()} equipment found.`:i!=="all"?`No ${d(i).toLowerCase()} equipment found.`:"No equipment added yet."}function u(){return a().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:o,assetEmptyStateText:c,partEmptyStateText:u}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var Go=N(yn());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:a,getSearchQuery:s}){function d(p){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${m(p)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${r("Work Orders",p.work,o,"work",{showWorkSearchAction:!!s().trim()})}
            ${r("Equipment",p.assets,c,"asset")}
            ${r("Parts",p.parts,u,"parts")}
            ${r("Requests",p.requests,f,"comment")}
            ${r("PM",p.pm,i,"procedure")}
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
      `}function o(p){return`
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
      `}function u(p){let h=Number(p.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${p.id}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${e(p.sku||"No SKU")} - ${h} on hand${p.supplier_name?` - ${e(p.supplier_name)}`:""}</span>
        </button>
      `}function f(p){return`
        <button class="global-result-item" data-search-request="${p.id}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.status)} - ${e(p.assets?.name||"No equipment")}</span>
        </button>
      `}function i(p){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(p.title)}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.assets?.name||"No equipment")} - due ${e(p.next_due_at||"unset")}</span>
        </button>
      `}function g(p){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(p.name)}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${(p.procedure_steps||[]).length} steps</span>
        </button>
      `}function m(p){return Object.values(p).reduce((h,v)=>h+v.length,0)}return{renderGlobalSearchResults:d,renderGlobalResultGroup:r,renderGlobalWorkResult:o,renderGlobalAssetResult:c,renderGlobalPartResult:u,renderGlobalRequestResult:f,renderGlobalPmResult:i,renderGlobalProcedureResult:g,globalResultCount:m}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var Ko=N(vn()),Jo=N(bn()),Zo=N(wn());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:a=(u,f)=>f,renderListPagination:s,statusLabel:d,renderRelationshipChips:r,canEditOperationalRecords:o=()=>!0,getSchedulesReady:c=()=>!0}){function u(m,p,h,v,y={}){let k=n||12,S=typeof t=="function"?t(v):1,q=Math.max(1,Math.ceil(p.length/k)),A=Math.min(Math.max(S,1),q),_=p.slice((A-1)*k,A*k),w=a(v,!!(y.defaultOpen&&p.length));return`
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
              ${_.map(g).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${v}`,p.length,A,q):""}
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
      `}function i(m){return`
        <div class="planning-grid">
          ${f("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${u("No Due Date",m.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${u("Follow-up Needed",m.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${f("Current schedule","Work requiring attention now.",`
            ${u("Overdue",m.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${u("Due Today",m.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${f("Upcoming","Near-term maintenance and preventive work.",`
            ${u("Next 7 Days",m.soon,"in_progress","soon")}
            ${c()?u("PM Due Soon",m.pm,"open","pm"):'<p class="error-text" role="alert">PM schedules unavailable.</p>'}
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
            ${o()?`<button class="secondary-button" data-generate-pm="${e(m.id)}" type="button">Generate Work</button>`:""}
          </article>
        `;if(m.kind==="no_due"){let p=m.createdAt?new Date(m.createdAt):null,h=p&&!Number.isNaN(p.getTime())?p.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(m.priority)} ${e(d(m.status))}</span>
              <strong>${e(m.title)}</strong>
              <p>${e(m.assetName)} - ${e(m.assignedTo||"Unassigned")}</p>
              <p>Created ${e(h)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(m.id)}" type="button">Open Work Order</button>
              ${o()?`
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
            <span class="eyebrow">${e(m.priority)} ${e(d(m.status))}</span>
            <strong>${e(m.title)}</strong>
            <p>${e(m.assetName)} - due ${e(m.dueAt)}</p>
          </div>
          ${r(m.workOrder)}
        </article>
      `}return{renderPlanningGroup:u,renderPlanningBoard:i,renderPlanningItem:g}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var ei=N(kn());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:s,getPartsPage:d,getAssetsPage:r}){function o(i,g){if(i<=e)return"";let m=s(),p=(m-1)*e+1,h=Math.min(i,m*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${i} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function c(i,g){if(i<=n)return"";let m=d(),p=(m-1)*n+1,h=Math.min(i,m*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${i} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function u(i,g){if(i<=t)return"";let m=r(),p=(m-1)*t+1,h=Math.min(i,m*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${i} - Page ${m} of ${g}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${m>=g?"disabled":""}>Next</button>
        </div>
      `}function f(i,g,m,p){if(g<=a)return"";let h=(m-1)*a+1,v=Math.min(g,m*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${i}" data-page-direction="prev" type="button" ${m<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${v} of ${g} - Page ${m} of ${p}</span>
          <button class="secondary-button page-action-button" data-list-page="${i}" data-page-direction="next" type="button" ${m>=p?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:o,renderPartsPagination:c,renderAssetsPagination:u,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var ni=N(_n());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:a,matchesActiveLocation:s,isAssetDescendantOf:d,parentAssetFor:r}){function o(m=t()){return n().map(p=>`<option value="${p.id}" ${p.id===m?"selected":""}>${e(p.name)}</option>`).join("")}function c(m){let p=r(m);return p?`${m.name} - part of ${p.name}`:m.name}function u(m=""){let p=a().filter(s).sort((y,k)=>c(y).localeCompare(c(k))),h=m?a().find(y=>y.id===m):null;return(h&&!p.some(y=>y.id===h.id)?[h,...p]:p).map(y=>`<option value="${y.id}" ${y.id===m?"selected":""}>${e(c(y))}</option>`).join("")}function f(m="",p=""){return a().filter(s).filter(h=>h.id!==p&&!d(h.id,p)).sort((h,v)=>c(h).localeCompare(c(v))).map(h=>`<option value="${h.id}" ${h.id===m?"selected":""}>${e(c(h))}</option>`).join("")}function i(m=""){let p=[...new Set(a().filter(s).map(v=>String(v.location||"").trim()).filter(Boolean))].sort((v,y)=>v.localeCompare(y)),h=String(m||"").trim();return h&&!p.includes(h)?[h,...p]:p}function g(m=""){return i(m).map(p=>`<option value="${e(p)}" ${p===m?"selected":""}>${e(p)}</option>`).join("")}return{renderLocationOptions:o,renderAssetOptions:u,renderParentAssetOptions:f,renderAssetAreaOptions:g,assetOptionLabel:c}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function a(s){if(!s.photo_storage_path)return"";let d=s.photo_file_name||s.photo_original_file_name||"Request photo",r=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(d)}">`:""}
          <div>
            <strong>${e(d)}</strong>
            <span>${e(r)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let a=n();return a>0?`<b class="nav-badge nav-message-badge" aria-label="${a} unread conversations and work alerts">${a}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(a){let s=Number(a);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(a){let s=e(a);return s?s>99?"99+":String(s):""}function t(a,s={}){let d=n(a);if(!d)return"";let r=s.alert?" nav-alert-badge":"",o=s.alertSuffix?"!":"";return`<b class="nav-badge${r}">${d}${o}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function a(s){let d=n()[s.reporter_id]?.full_name||"Team member",r=t().find(u=>u.id===s.location_id)?.name||"No location",o=s.status||"open",c=s.severity||"normal";return`
        <article class="issue-report-card issue-${o}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${c==="blocking"?"critical":c==="minor"?"completed":"open"}">${e(c)}</span>
              <span class="chip issue-status-chip issue-status-${o}">${e(o)}</span>
              <span>${e(r)}</span>
              <span>${s.created_at?new Date(s.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(s.title)}</strong>
            <p>${e(s.details||"")}</p>
            <small>${e(d)} - ${e(s.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(s.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(u=>`<option value="${u}" ${u===o?"selected":""}>${u}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(s.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:a,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:d}){function r(c){let u=s()[c.id]||[],f=u[u.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(c.title)}</strong>
            <span>${e(t(c))}${f?` - ${e(n(f.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${c.id}" type="button">Open Thread</button>
        </article>
      `}function o(c){let u=a().filter(f=>f.work_order_id===c.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${c.id}" type="button">Message Team</button>
            ${d()?`
              <div class="work-linked-thread-list">
                ${u.map(r).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:o,renderLinkedWorkMessageThread:r}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:l}})();(function(){function l({escapeHtml:e,recommendedWorkOrderStep:n}){function t(a){let s=n(a);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(a,s,d,r,o){return`
        <button class="command-card command-${o} ${s?"":"empty"}" data-jump-work-section="${d}" type="button">
          <span>${e(a)}</span>
          <strong>${s}</strong>
          <small>${e(r)}</small>
        </button>
      `}function t(a){return a.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:s,requiresSafetyDeviceCheck:d=u=>!!u.asset_id,renderEmailHelperCommandCard:r,getMessageThreads:o,getPartsUsedByWorkOrder:c}){function u(f){let i=o().filter(h=>h.work_order_id===f.id).length,g=(c()[f.id]||[]).reduce((h,v)=>h+(Number(v.quantity_used)||0),0),m=d(f)?s(f)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:[f.asset_id?"Not Required":"General","No equipment safety check required","neutral"],p=f.status==="completed"?"Review history or create follow-up if needed":f.status==="blocked"?"Resolve blocker or add current update":f.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
      `}return{renderWorkOrderCommandSummary:u}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:l}})();(function(){function l(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function a(){return`
        <datalist id="part-source-options">
          ${n().map(r=>`<option value="${e(r)}"></option>`).join("")}
        </datalist>
      `}function s(){let d=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${d.map(r=>`
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
      `}return{renderPartSourceOptions:a,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:a,parentAssetFor:s,childAssetsFor:d}){function r(o){let c=t().filter(i=>i.asset_id===o.id&&i.status!=="completed").length,u=s(o),f=d(o.id);return`
        <article class="asset-card asset-state-${o.status} ${o.id===a()?"selected":""}" data-asset-id="${o.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${o.status}">${e(o.status)}</span>
              <span class="chip">${e(n(o.asset_type))}</span>
              ${o.asset_code?`<span class="chip">${e(o.asset_code)}</span>`:""}
              ${o.asset_tag?`<span class="chip">Asset tag: ${e(o.asset_tag)}</span>`:""}
              ${o.manufacturer?`<span class="chip">${e(o.manufacturer)}</span>`:""}
              ${o.model?`<span class="chip">${e(o.model)}</span>`:""}
              ${o.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h3>${e(o.name)}</h3>
            <p>${e(o.location||"No area / spot set")}</p>
            ${u?`<p>Part of ${e(u.name)}</p>`:""}
            ${f.length?`<p>${f.length} linked item${f.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${c} open work</span>
        </article>
      `}return{renderAssetCard:r}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function a(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(d=>`<option value="${d.id}" ${d.id===s?"selected":""}>${e(d.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function a(d){let r=n().filter(o=>o.thread_id===d.id).map(o=>t(o.user_id));return r.length?r.join(", "):"Direct message"}function s(d){return d.thread_type==="direct"?a(d):d.thread_type==="location"?`Company team / ${e().find(r=>r.id===d.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:a,unreadMessageCount:s,getMessagesByThreadId:d,getActiveMessageThreadId:r,threadTitle:o=c=>c.title}){function c(u){let i=(d()[u.id]||[]).filter(A=>!A.deleted_at),g=u.latest_message||i[i.length-1],m=s(u.id),p=o(u),h=String(p||"MO").trim().split(/\s+/).slice(0,2).map(A=>Array.from(A)[0]).join("").toUpperCase(),v=Math.abs([...String(p)].reduce((A,_)=>A*31+_.charCodeAt(0)|0,0))%6,y=g?.body?`${e(t(g.sender_id))}: ${e(g.body)}`:"Attachment",k=new Date(g?.created_at),S=k.toDateString()===new Date().toDateString(),q=g?S?k.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):n(g.created_at):"";return`
        <button class="message-thread-button ${u.id===r()?"active":""} ${m?"unread":""}" data-message-thread="${u.id}" aria-current="${u.id===r()?"true":"false"}" type="button">
          <span class="message-thread-avatar" data-tone="${v}" aria-hidden="true">${u.thread_type==="direct"?e(h):"#"}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${e(p)}</strong><time datetime="${e(g?.created_at||"")}" title="${e(g?n(g.created_at):"")}">${e(q)}</time></span>
          <span class="message-row-preview"><small>${g?y:"No messages yet"}</small>${m?`<span class="message-unread-pill" aria-label="${m} unread messages">${m}</span>`:""}</span>
          <span class="message-row-scope">${u.work_order_id?"Work order / ":""}${e(a(u))}${u.preferences?.muted?" / Muted":""}</span>
          </span>
        </button>
      `}return{renderMessageThreadButton:c}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var bi=N(Sn());(function(){function l({getLocations:e}){function n(t){let a=e().find(s=>s.id===t.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function a(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function a(s){let d=n(s),r=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",o=e.assignmentLabel(s),c=e.cleanWorkOrderDescription(s.description)||s.title,u=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${d} is down or needs maintenance attention. At this time, the expected downtime is ${r}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${c}`,`Work order: ${s.title}`,`Equipment: ${d}`,`Current update: ${u}`,`Assigned to: ${o}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let a=t?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,d){let r=n(s);return d!==e.OUTSIDE_VENDOR_VALUE?r||null:[r,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(s,d){let r=String(s||"").trim();if(!d?.photo_storage_path)return r||null;let o="[Request photo attached to original request]";return r?`${r}

${o}`:o}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let a=[];return n.title!==t.title&&a.push("title"),(n.description||"")!==(t.description||"")&&a.push("description"),(n.due_at||"")!==(t.due_at||"")&&a.push("due date"),n.priority!==t.priority&&a.push("priority"),(n.type||"corrective")!==t.type&&a.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&a.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&a.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,a,s=[]){return[...n.map(d=>({...d,type:"comment"})),...t.map(d=>({...d,type:"photo"})),...s.map(d=>({...d,type:"part"})),...a.map(d=>({...d,type:"event"}))].sort((d,r)=>new Date(r.created_at)-new Date(d.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(r){return Number(r.quantity_on_hand)<=Number(r.reorder_point)}function t(){return e.getParts().filter(n)}function a(r){let o=e.getPartSearchQuery().trim().toLowerCase();return o?r.some(c=>String(c??"").toLowerCase().includes(o)):!0}function s(){let r=e.getParts().filter(o=>!e.matchesActiveLocation(o)||e.getPartInventoryFilter()==="low"&&!n(o)?!1:a([o.name,o.sku,o.supplier_name,o.machine_note,o.quantity_on_hand,o.reorder_point,o.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...r].sort((o,c)=>{let u=String(o.supplier_name||"zzzzzz").localeCompare(String(c.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return u||String(o.name||"").localeCompare(String(c.name||""),void 0,{sensitivity:"base"})}):r}function d(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(r=>String(r.supplier_name||"").trim()).filter(Boolean))].sort((r,o)=>r.localeCompare(o))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:a,partSourceOptions:d}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(o=>o.status==="submitted")}function t(o){return e.matchesActiveLocation(o)&&e.matchesSearch([o.title,o.description,o.status,o.priority,o.assets?.name,e.getProfilesByUserId()[o.requested_by]?.full_name])}function a(o){return o.status==="converted"||!!o.converted_work_order_id}function s(o,c=e.getRequestViewFilter()){return c==="converted"?a(o):c==="all"?!0:!a(o)&&o.status==="submitted"}function d(o=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(c=>t(c)&&s(c,o))}function r(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:a,requestMatchesViewFilter:s,filteredRequests:d,requestFilterCounts:r}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function n(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(d){return e.getAssets().find(r=>r.id===d?.parent_asset_id)||null}function t(d){return e.getAssets().filter(r=>r.parent_asset_id===d).sort((r,o)=>r.name.localeCompare(o.name))}function a(d,r){if(!d||!r)return!1;let o=e.getAssets().find(u=>u.id===d),c=new Set;for(;o?.parent_asset_id&&!c.has(o.id);){if(o.parent_asset_id===r)return!0;c.add(o.id),o=e.getAssets().find(u=>u.id===o.parent_asset_id)}return!1}function s(){return e.getAssets().filter(d=>!e.matchesActiveLocation(d)||e.getAssetStatusFilter()!=="all"&&d.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(d.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(d.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([d.name,d.asset_code,d.asset_tag,d.manufacturer,d.model,d.location,d.status,d.asset_type,n(d)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();(function(){function l(e){function n(a){let s=e.getSearchQuery().trim().toLowerCase();return s?a.some(d=>String(d??"").toLowerCase().includes(s)):!0}function t(a,s=e.getSearchQuery()){let d=s.trim().toLowerCase();return d?a.some(r=>String(r??"").toLowerCase().includes(d)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(r){return r.due_at?new Date(`${r.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(r){return{low:1,medium:2,high:3,critical:4}[r]||0}function a(r){return r.completed_at?new Date(r.completed_at).getTime():0}function s(r){return typeof e.assignmentLabel=="function"?e.assignmentLabel(r):r.assigned_profile?.full_name||r.assigned_to||"Unassigned"}function d(r,o){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(o)-a(r)||new Date(o.created_at)-new Date(r.created_at):e.getWorkSort()==="due"?n(r)-n(o)||new Date(o.created_at)-new Date(r.created_at):e.getWorkSort()==="priority"?t(o.priority)-t(r.priority)||n(r)-n(o):e.getWorkSort()==="type"?String(r.type||"").localeCompare(String(o.type||""))||new Date(o.created_at)-new Date(r.created_at):e.getWorkSort()==="assigned"?s(r).localeCompare(s(o))||new Date(o.created_at)-new Date(r.created_at):new Date(o.created_at)-new Date(r.created_at)}return{compareWorkOrders:d,dueSortValue:n,prioritySortValue:t,completedSortValue:a,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(a){return a?.location_id||a?.assets?.location_id||null}function t(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(a)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(o=>e.matchesActiveLocation(o)&&o.status!=="completed").slice(0,8)}function t(){let o=e.getMessageThreadFilter();return e.getMessageThreads().filter(c=>{let u=e.isConversationArchived?.(c)||!1;if(o==="archived")return u&&e.matchesQuery(a(c),e.getMessageSearchQuery());if(u)return!1;let f=o==="all"||o==="favorites"&&c.preferences?.favorite||o==="unread"&&s(c.id)>0||c.thread_type===o,i=e.getMessageSection?.()||"";return f&&(!i||c.preferences?.section_name===i)&&e.matchesQuery(a(c),e.getMessageSearchQuery())}).sort((c,u)=>+!!u.preferences?.favorite-+!!c.preferences?.favorite)}function a(o){let c=e.getMessageThreadMembers().filter(u=>u.thread_id===o.id).map(u=>e.teamMemberName(u.user_id));return[o.title,e.messageThreadScopeLabel(o),...c]}function s(o){let c=e.getMessageReadsByThreadId()[o]?.last_read_at,u=c?new Date(c).getTime():0;return(e.getMessagesByThreadId()[o]||[]).filter(f=>f.deleted_at||f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>u).length}function d(){return e.getMessageThreads().filter(o=>!o.preferences?.muted&&!e.isConversationArchived?.(o)).reduce((o,c)=>o+(s(c.id)>0?1:0),0)}function r(){return e.getMessageThreads().filter(o=>o.thread_type==="direct"&&!o.preferences?.muted&&!e.isConversationArchived?.(o)).reduce((o,c)=>o+(s(c.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:a,unreadMessageCount:s,totalUnreadMessages:d,directUnreadMessages:r}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(t)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(t):a==="completed_week"?e.isCompletedThisWeek(t):a==="active"||a==="all"?t.status!=="completed":t.status===a}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],d=e.getEventsByWorkOrder()[t.id]||[],r=e.getPhotosByWorkOrder()[t.id]||[],o=e.getProcedureTemplates().find(f=>f.id===t.procedure_template_id),c=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),u=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,u[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,o?.name,o?.description,...(o?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...a.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...s.flatMap(f=>[f.body,u[f.author_id]?.full_name]),...d.flatMap(f=>[f.event_type,f.summary,u[f.actor_id]?.full_name]),...r.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...c.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===t:e.isWorkOrderAssignedToUser(a,t))&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var ji=N(qn()),zi=N($n()),Vi=N(Cn()),Hi=N(An()),Gi=N(Pn()),Yi=N(En()),Ki=N(Rn());(function(){function l(t){if(!t)return"";let a=new Date(t),s=new Date,d=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),o=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r===d?`Today ${o}`:r===d-864e5?`Yesterday ${o}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let a=new Date(t),s=new Date,d=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return r===d?"Today":r===d-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let a=String(t||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();window.MaintainOpsEquipmentCreateDrafts={createEquipmentCreateDrafts:Ie,createMaintenanceCreateDrafts:Ct};window.MaintainOpsChecklistResults={createChecklistResultsState:At};window.MaintainOpsMaintenanceWorkspaceRows={loadCompleteWorkspaceRows:Pt,validateProcedureSteps:Et};})();
//# sourceMappingURL=runtime.2bb1700fd1.js.map
