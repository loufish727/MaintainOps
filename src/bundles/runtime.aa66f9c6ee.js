(()=>{var In=Object.create;var At=Object.defineProperty;var Fn=Object.getOwnPropertyDescriptor;var Ln=Object.getOwnPropertyNames;var Nn=Object.getPrototypeOf,Un=Object.prototype.hasOwnProperty;var U=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Qn=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Ln(e))!Un.call(l,a)&&a!==n&&At(l,a,{get:()=>e[a],enumerable:!(t=Fn(e,a))||t.enumerable});return l};var Q=(l,e,n)=>(n=l!=null?In(Nn(l)):{},Qn(e||!l||!l.__esModule?At(n,"default",{value:l,enumerable:!0}):n,l));var Rt=U((zn,Le)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,a=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},m=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),r=m(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:r,workspaceLoadPending:!1,workspaceLoadWasHidden:a?.visibilityState==="hidden",navigationStartedAt:m(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},c=new Map,u=0;function f(x){if(x==null||x==="")return null;let w=Number(x);return Number.isFinite(w)&&w>=0?w:null}function o(){let x=s.connection||s.mozConnection||s.webkitConnection,w=t?.matchMedia?.("(pointer: coarse)")?.matches,A=f(s.deviceMemory),W=f(s.hardwareConcurrency),R=A!==null&&A<=4||W!==null&&W<=4||w?"constrained":"standard",S=f(t?.innerWidth);return{source:"browser",device_tier:R,viewport_class:S!==null&&S<720?"mobile":S!==null&&S<1100?"tablet":"desktop",connection_type:String(x?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!x?.saveData}}function d(x={}){let w={...o(),measurement_version:n,...x};return Object.fromEntries(Object.entries(w).filter(([,A])=>A!=null&&A!==""))}function g(x=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},x))}function p(x,w,A={},W={}){if(!l.has(x))return!1;let R=f(w);if(R===null)return!1;let S=Number(R.toFixed(x==="cls"?4:2));return i.latest[x]={metric:x,value:S,unit:e[x],context:d(A),measuredAt:new Date().toISOString()},W.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:x,value:S,unit:e[x],context:d(A)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(W.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let x=i.companyId,w=i.pending.splice(0,20),A=null;try{A=(await i.client.rpc("record_app_performance_samples",{target_company_id:x,samples:w})).error||null}catch(R){A=R}if(!A)return i.pending.length&&g(1e3),!0;i.companyId===x&&i.pending.unshift(...w);let W=String(A.message||A).toLowerCase();return i.disabledUntil=Date.now()+(W.includes("could not find")||W.includes("does not exist")?3e5:6e4),!1}function y({client:x,companyId:w}){if(i.client=x||null,i.companyId=w||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,p("session_start",1,{source:"workspace"},{immediate:!0});let A=s.connection||s.mozConnection||s.webkitConnection;f(A?.downlink)!==null&&p("connection_downlink_mbps",A.downlink,{source:"browser-estimate"}),f(A?.rtt)!==null&&p("connection_rtt_ms",A.rtt,{source:"browser-estimate"})}g(250)}}function b(){i.workspaceStartedAt=m(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=a?.visibilityState==="hidden"}function v(x){if(!x)return;if(i.workspaceCompanies.has(x)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(x);let w=!i.workspaceLoadWasHidden&&a?.visibilityState!=="hidden";p("workspace_ready_ms",m()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:w}),i.workspaceLoadPending=!1,i.latest.cls||p("cls",u,{source:"performance-observer"},{persist:!1}),w&&t?.setTimeout?.(()=>_(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function _(x=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let w=new Set(x);Object.values(i.latest).filter(A=>w.has(A.metric)).forEach(A=>{let W=A.metric==="inp_ms";(W?i.lastPersistedInpValue===A.value:i.persistedVitals.has(A.metric))||p(A.metric,A.value,{source:"performance-observer"})&&(W?i.lastPersistedInpValue=A.value:i.persistedVitals.add(A.metric))})}function q(x=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,_(["inp_ms"])},x))}function C(){i.navigationStartedAt=m()}function O(x){let w=Number(x);return a?.visibilityState==="hidden"||Number.isFinite(w)&&i.lastHiddenAt>=w}function $(x,w=i.navigationStartedAt){p("section_navigation_ms",m()-w,{source:String(x||"workspace").slice(0,48)},{persist:!O(w)})}function k(x,w,A=null){p("query_latency_ms",m()-w,{source:String(x||"query").slice(0,48)},{persist:!O(w)}),A&&p("client_error",1,{source:`query:${String(x||"unknown").slice(0,36)}`},{immediate:!0})}function E(x={}){let w={source:"performance-room",quality_tier:x.qualityTier||"unknown"};Object.entries({spatial_ready_ms:x.readyMs,spatial_fps:x.fps,spatial_frame_ms:x.frameMs,spatial_slow_frame_pct:x.slowFramePercent,spatial_draw_calls:x.drawCalls,spatial_triangles:x.triangles,spatial_geometries:x.geometries,spatial_textures:x.textures,webgl_context_loss:Number(x.contextLosses)>0?x.contextLosses:void 0}).forEach(([A,W])=>{f(W)!==null&&p(A,W,w)}),g(500)}function P(){return{latest:{...i.latest},connection:o(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function I(x,w,A={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(x)))try{new PerformanceObserver(R=>w(R.getEntries())).observe({type:x,...A})}catch{}}I("paint",x=>{let w=x.find(A=>A.name==="first-contentful-paint");w&&p("fcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),I("largest-contentful-paint",x=>{let w=x.at(-1);w&&p("lcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),I("layout-shift",x=>{x.forEach(w=>{w.hadRecentInput||(u+=w.value)}),p("cls",u,{source:"performance-observer"},{persist:!1})}),I("event",x=>{x.forEach(A=>{A.interactionId&&c.set(A.interactionId,Math.max(c.get(A.interactionId)||0,A.duration))});let w=[...c.values()].sort((A,W)=>W-A);w.length&&(p("inp_ms",w[Math.min(Math.floor(w.length/50),10)],{source:"performance-observer"},{persist:!1}),q())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>p("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>p("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=m(),p("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&p("reconnect_ms",m()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),a?.addEventListener?.("visibilitychange",()=>{a.visibilityState==="hidden"&&(i.lastHiddenAt=m(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),_(),h())});let M={beginWorkspaceLoad:b,configure:y,flush:h,markNavigationStart:C,markWorkspaceReady:v,record:p,recordQueryLatency:k,recordSectionNavigation:$,recordSpatial:E,snapshot:P};typeof window<"u"&&(window.MaintainOpsAppTelemetry=M),typeof Le<"u"&&(Le.exports=M)})()});var Ot=U((Vn,Ne)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,a){let s=String(n||"");return!(!l(t)&&!l(a)||["TOKEN_REFRESHED","SIGNED_IN","INITIAL_SESSION"].includes(s)&&l(t)&&l(t)===l(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Ne<"u"&&(Ne.exports={shouldRenderForAuthEvent:e})})()});var Wt=U((Hn,Ue)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(r,i,c){if(!r||!r.getItem)return c;let u=r.getItem(i);return u??c}function n(r,i){let c=Number(e(r,i,"1"));return Number.isFinite(c)&&c>0?c:1}function t(r,i,c){!r||!r.setItem||r.setItem(i,String(c))}function a(r,i){try{let c=JSON.parse(e(r,i,"{}"));return c&&typeof c=="object"&&!Array.isArray(c)?c:{}}catch{return{}}}function s(r,i){!r||!r.removeItem||r.removeItem(i)}function m(r={}){let i=r.storage||localStorage,c={activeSection:e(i,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,l.activeMessageThreadId,""),searchQuery:e(i,l.searchQuery,""),workOrderSearchMode:e(i,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,l.messageThreadFilter,"all"),messageThreadsPage:n(i,l.messageThreadsPage),messageSearchQuery:e(i,l.messageSearchQuery,""),messageComposerWorkOrderId:e(i,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,l.managerDashboardUserId,""),managerDashboardMetric:e(i,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,l.myWorkFilter,"assigned"),workOrderFilter:e(i,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,l.workOrderPriorityFilter,"all"),workSort:e(i,l.workSort,"newest"),workGroup:e(i,l.workGroup,"none"),requestViewFilter:e(i,l.requestViewFilter,"active"),workOrderPage:n(i,l.workOrderPage),partsPage:n(i,l.partsPage),assetsPage:n(i,l.assetsPage),financialPage:n(i,l.financialPage),financialMissingFilter:e(i,l.financialMissingFilter,"all"),financialLocationFilter:e(i,l.financialLocationFilter,"all"),financialTypeFilter:e(i,l.financialTypeFilter,"all"),financialAreaFilter:e(i,l.financialAreaFilter,"all"),requestsPage:n(i,l.requestsPage),planningOverduePage:n(i,l.planningOverduePage),planningTodayPage:n(i,l.planningTodayPage),planningSoonPage:n(i,l.planningSoonPage),planningNoDuePage:n(i,l.planningNoDuePage),planningFollowUpPage:n(i,l.planningFollowUpPage),planningPmPage:n(i,l.planningPmPage),planningGroupOpen:a(i,l.planningGroupOpen),schedulesPage:n(i,l.schedulesPage),proceduresPage:n(i,l.proceduresPage),membersPage:n(i,l.membersPage),assetStatusFilter:e(i,l.assetStatusFilter,"all"),assetTypeFilter:e(i,l.assetTypeFilter,"all"),assetAreaFilter:e(i,l.assetAreaFilter,"all"),partInventoryFilter:e(i,l.partInventoryFilter,"all"),partSort:e(i,l.partSort,"default"),partSearchQuery:e(i,l.partSearchQuery,"")};e(i,l.sectionSplitDone,"")!=="true"&&c.activeSection==="work"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection),t(i,l.sectionSplitDone,"true")),c.activeSection==="performance"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection));let u=(o,d,g)=>{c[o]=d,g&&t(i,g,d)},f=(o,d)=>{u(o,1,d)};return{getActiveSection:()=>c.activeSection,setActiveSection:o=>u("activeSection",o,l.activeSection),getActiveWorkOrderId:()=>c.activeWorkOrderId,setActiveWorkOrderId:o=>u("activeWorkOrderId",o),getActiveAssetId:()=>c.activeAssetId,setActiveAssetId:o=>u("activeAssetId",o),getActivePartId:()=>c.activePartId,setActivePartId:o=>u("activePartId",o),getActiveMessageThreadId:()=>c.activeMessageThreadId,setActiveMessageThreadId:o=>u("activeMessageThreadId",o,l.activeMessageThreadId),getMessageThreadFilter:()=>c.messageThreadFilter,setMessageThreadFilter:o=>u("messageThreadFilter",o,l.messageThreadFilter),getMessageThreadsPage:()=>c.messageThreadsPage,setMessageThreadsPage:o=>u("messageThreadsPage",o,l.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>c.messageSearchQuery,setMessageSearchQuery:o=>u("messageSearchQuery",o,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>c.messageComposerWorkOrderId,setMessageComposerWorkOrderId:o=>u("messageComposerWorkOrderId",o,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>c.messageComposerOpen,setMessageComposerOpen:o=>u("messageComposerOpen",!!o),getManagerDashboardUserId:()=>c.managerDashboardUserId,setManagerDashboardUserId:o=>u("managerDashboardUserId",o||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>c.managerDashboardMetric,setManagerDashboardMetric:o=>u("managerDashboardMetric",o||"open",l.managerDashboardMetric),getSearchQuery:()=>c.searchQuery,setSearchQuery:o=>u("searchQuery",o,l.searchQuery),getWorkOrderSearchMode:()=>c.workOrderSearchMode,setWorkOrderSearchMode:o=>u("workOrderSearchMode",!!o,l.workOrderSearchMode),getActiveStatusFilter:()=>c.activeStatusFilter,setActiveStatusFilter:o=>u("activeStatusFilter",o),getMyWorkFilter:()=>c.myWorkFilter,setMyWorkFilter:o=>u("myWorkFilter",o,l.myWorkFilter),getWorkOrderFilter:()=>c.workOrderFilter,setWorkOrderFilter:o=>u("workOrderFilter",o,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>c.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:o=>{u("workOrderAssigneeFilter",o),o?t(i,l.workOrderAssigneeFilter,o):s(i,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>c.workOrderTypeFilter,setWorkOrderTypeFilter:o=>u("workOrderTypeFilter",o||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>c.workOrderPriorityFilter,setWorkOrderPriorityFilter:o=>u("workOrderPriorityFilter",o||"all",l.workOrderPriorityFilter),getWorkSort:()=>c.workSort,setWorkSort:o=>u("workSort",o,l.workSort),getWorkGroup:()=>c.workGroup,setWorkGroup:o=>u("workGroup",o||"none",l.workGroup),getRequestViewFilter:()=>c.requestViewFilter,setRequestViewFilter:o=>u("requestViewFilter",o,l.requestViewFilter),getWorkOrderPage:()=>c.workOrderPage,setWorkOrderPage:o=>u("workOrderPage",o,l.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",l.workOrderPage),getPartsPage:()=>c.partsPage,setPartsPage:o=>u("partsPage",o,l.partsPage),resetPartsPage:()=>f("partsPage",l.partsPage),getAssetsPage:()=>c.assetsPage,setAssetsPage:o=>u("assetsPage",o,l.assetsPage),resetAssetsPage:()=>f("assetsPage",l.assetsPage),getFinancialPage:()=>c.financialPage,setFinancialPage:o=>u("financialPage",o,l.financialPage),resetFinancialPage:()=>f("financialPage",l.financialPage),getFinancialMissingFilter:()=>c.financialMissingFilter,setFinancialMissingFilter:o=>u("financialMissingFilter",o||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>c.financialLocationFilter,setFinancialLocationFilter:o=>u("financialLocationFilter",o||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>c.financialTypeFilter,setFinancialTypeFilter:o=>u("financialTypeFilter",o||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>c.financialAreaFilter,setFinancialAreaFilter:o=>u("financialAreaFilter",o||"all",l.financialAreaFilter),getRequestsPage:()=>c.requestsPage,setRequestsPage:o=>u("requestsPage",o,l.requestsPage),resetRequestsPage:()=>f("requestsPage",l.requestsPage),getPlanningPage:o=>o==="overdue"?c.planningOverduePage:o==="today"?c.planningTodayPage:o==="soon"?c.planningSoonPage:o==="no-due"?c.planningNoDuePage:o==="follow-up"?c.planningFollowUpPage:o==="pm"?c.planningPmPage:1,setPlanningPage:(o,d)=>{o==="overdue"&&u("planningOverduePage",d,l.planningOverduePage),o==="today"&&u("planningTodayPage",d,l.planningTodayPage),o==="soon"&&u("planningSoonPage",d,l.planningSoonPage),o==="no-due"&&u("planningNoDuePage",d,l.planningNoDuePage),o==="follow-up"&&u("planningFollowUpPage",d,l.planningFollowUpPage),o==="pm"&&u("planningPmPage",d,l.planningPmPage)},getPlanningGroupOpen:(o,d=!1)=>Object.prototype.hasOwnProperty.call(c.planningGroupOpen,o)?!!c.planningGroupOpen[o]:!!d,setPlanningGroupOpen:(o,d)=>{c.planningGroupOpen={...c.planningGroupOpen,[o]:!!d},t(i,l.planningGroupOpen,JSON.stringify(c.planningGroupOpen))},getSchedulesPage:()=>c.schedulesPage,setSchedulesPage:o=>u("schedulesPage",o,l.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",l.schedulesPage),getProceduresPage:()=>c.proceduresPage,setProceduresPage:o=>u("proceduresPage",o,l.proceduresPage),resetProceduresPage:()=>f("proceduresPage",l.proceduresPage),getMembersPage:()=>c.membersPage,setMembersPage:o=>u("membersPage",o,l.membersPage),resetMembersPage:()=>f("membersPage",l.membersPage),getAssetStatusFilter:()=>c.assetStatusFilter,setAssetStatusFilter:o=>u("assetStatusFilter",o,l.assetStatusFilter),getAssetTypeFilter:()=>c.assetTypeFilter,setAssetTypeFilter:o=>u("assetTypeFilter",o,l.assetTypeFilter),getAssetAreaFilter:()=>c.assetAreaFilter,setAssetAreaFilter:o=>u("assetAreaFilter",o,l.assetAreaFilter),getPartInventoryFilter:()=>c.partInventoryFilter,setPartInventoryFilter:o=>u("partInventoryFilter",o,l.partInventoryFilter),getPartSort:()=>c.partSort,setPartSort:o=>u("partSort",o||"default",l.partSort),getPartSearchQuery:()=>c.partSearchQuery,setPartSearchQuery:o=>u("partSearchQuery",o,l.partSearchQuery),snapshot:()=>({...c})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:m},typeof Ue<"u"&&(Ue.exports={createWorkspaceUiState:m})})()});var xt=U((Gn,_e)=>{(function(){function l(a){return!!String(a?.production_action||"").trim()}function e(a){return l(a)&&a?.production_action_status==="open"}function n(a,s){return!a||!s?!1:a.assigned_to===s||e(a)&&a.production_action_assigned_to===s}function t(a){return e(a)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof _e<"u"&&_e.exports&&(_e.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var Mt=U((Yn,qe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",a=>a.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof qe<"u"&&qe.exports&&(qe.exports={bindWorkspaceProductionActionEvents:l})})()});var Dt=U((Kn,Qe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:l},typeof Qe<"u"&&(Qe.exports={bindWorkspaceWorkOrderNotificationEvents:l})})()});var Tt=U((Jn,Se)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function a(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(c=>c.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(c=>{c.checked=i.target.checked})}async function m(i){i.preventDefault();let c=i.target,u=c.querySelector("button[type='submit']"),f=n.querySelector("#completion-error"),o=e.getActiveWorkOrderId(),d=e.getWorkOrderById(o),g=e.getProcedureById(d?.procedure_template_id),p=g?e.requiredChecklistProgress(d,g):{done:0,total:0},h=e.productionActionCompletionMessage?.(d)||"";if(h){f&&(f.textContent=h),e.setWorkOrderActionWarning(o,h),e.showNotice(h,"warning");return}if(p.done<p.total){f&&(f.textContent=`Complete required checklist steps first (${p.done}/${p.total}).`);return}let y=new t(c),b=y.get("safety_devices_checked")==="on"||a(o)||e.hasCompletedSafetyDeviceCheck(d);if(e.requiresSafetyDeviceCheck(d)&&!b){f&&(f.textContent="Check safety devices before completing equipment work.");return}u.disabled=!0,u.textContent="Completing...",f&&(f.textContent="");try{let v={status:"completed",asset_id:d?.asset_id||null,actual_minutes:Number(y.get("actual_minutes"))||0,failure_cause:y.get("failure_cause")||null,resolution_summary:y.get("resolution_summary")||null,follow_up_needed:y.get("follow_up_needed")==="on",completion_notes:y.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(v),e.applySafetyCheckPayload(v,v.safety_check_required&&b),delete v.asset_id;let{error:_}=await e.withOperationTimeout(e.updateWorkOrderSafely(v,o),"Complete work save timed out. Check your connection and try again.",2e4);if(_){f&&(f.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(_)}`);return}let q=await e.withOperationTimeout(e.recordWorkOrderEvent(o,"completed",y.get("resolution_summary")||y.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(C=>C);e.setWorkOrderActionWarning("",""),e.showNotice(q?`Work order completed, but history did not update: ${q.message}`:"Work order completed.",q?"warning":"success"),await e.render()}catch(v){f?f.textContent=`Could not complete work order: ${v.message||v}`:e.alertRef(v.message||v)}finally{u.disabled=!1,u.textContent="Complete Work Order"}}function r(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",m),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(c=>{c.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:r,completeWorkOrder:m,currentSafetyCheckboxCheckedForWorkOrder:a,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof Se<"u"&&Se.exports&&(Se.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var It=U((Zn,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,a=e.BlobCtor||Blob,s=e.alertRef||alert,m=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,r=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:k=>String(k||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:k=>String(k||"corrective").replaceAll("_"," "),c={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function u(k){return(e.getAssetDocumentsByAssetId?.()[k]||[]).filter(E=>String(E.content_type||"").startsWith("image/")||E.document_type==="machine_photo"||E.document_type==="nameplate")}function f(k){return u(k).map(E=>E.original_file_name||E.file_name||E.storage_path||E.id).filter(Boolean).join("; ")}function o(k,E){return k?.parent_asset_id&&E.get(k.parent_asset_id)?.name||""}function d(k){return e.getLocations?.().find(E=>E.id===k)?.name||""}function g(k){if(!k)return"";let E=e.getProfilesByUserId?.()[k];return E?.full_name||E?.email||k}function p(k){return String(d(k.location_id)||k.location_id||k.location||"")}function h(k){return{id:`financial:${k.id}`,financialRecord:k,name:k.archived_asset_name||"Deleted equipment",asset_type:k.archived_asset_type||"machine",asset_code:k.archived_asset_code||"",asset_tag:k.archived_asset_tag||"",manufacturer:k.archived_manufacturer||"",model:k.archived_model||"",location_id:k.archived_location_id||"",location:k.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(k=>!k.asset_id).map(h)]}function b(k,E,P){let I=p(k).localeCompare(p(E));if(I)return I;let M=(c[k.asset_type||"machine"]||999)-(c[E.asset_type||"machine"]||999);return M||String(o(k,P)).localeCompare(String(o(E,P)))||String(k.location||"").localeCompare(String(E.location||""))||String(k.name||"").localeCompare(String(E.name||""))}function v(){let k=e.getAssets().filter(m),E=new Map(k.map(P=>[P.id,P]));return[...k].sort((P,I)=>b(P,I,E)).map(P=>({equipment_type:r(P.asset_type),name:P.name,parent_equipment:o(P,E),serial_number:P.asset_code||"",asset_tag:P.asset_tag||"",manufacturer:P.manufacturer||"",model:P.model||"",picture_id:f(P.id),picture_count:u(P.id).length,picture_status:u(P.id).length?"attached":"missing",facility:d(P.location_id)||P.location_id||"",area_department:P.location||"",status:P.status}))}function _(){let k=y(),E=new Map(k.map(I=>[I.id,I])),P=e.getAssetFinancialsByAssetId?.()||{};return[...k].sort((I,M)=>b(I,M,E)).map(I=>{let M=I.financialRecord||P[I.id]||{};return{operational_status:I.financialRecord?"deleted":"active",equipment_type:r(I.asset_type),name:I.name,parent_equipment:o(I,E),facility:d(I.location_id)||I.location_id||"",area_department:I.location||"",serial_number:I.asset_code||"",equipment_asset_tag:I.asset_tag||"",manufacturer:I.manufacturer||"",model:I.model||"",picture_status:u(I.id).length?"attached":"missing",asset_tag:M.asset_tag||"",acquisition_date:M.acquisition_date||"",acquisition_cost:M.acquisition_cost||"",depreciation_method:M.depreciation_method||"",useful_life_years:M.useful_life_years||"",current_book_value:M.current_book_value||"",tax_jurisdiction:M.tax_jurisdiction||"",ownership_status:M.ownership_status||"",in_service_date:M.in_service_date||"",disposal_date:M.disposal_date||"",disposal_notes:M.disposal_notes||"",gl_account_code:M.gl_account_code||"",cost_center:M.cost_center||"",finance_notes:M.finance_notes||"",needs_review:!!M.needs_review,last_reviewed_at:M.last_reviewed_at||"",reviewed_by:g(M.reviewed_by)}})}async function q(k){let E=e.getExportScope(),P=e.createExportQuery(k),I=[],M;try{for(;I.length<1e5;){let x=await e.withOperationTimeout(P.range(I.length,I.length+499),"Export timed out. Try again.",2e4);if(x.error)throw x.error;if(e.getExportScope()!==E)throw new Error("Workspace changed. Export again from the intended location.");if(!Number.isInteger(x.count))throw new Error("Export could not verify the total record count.");if(M!==void 0&&M!==x.count)throw new Error("Records changed during export. Try again.");if(M=x.count,I.push(...x.data||[]),new Set(I.map(w=>w.id)).size!==I.length)throw new Error("Records moved during export. Try again.");if(I.length===M)return O(k,I);if(!x.data?.length||I.length>M)throw new Error("Export returned an incomplete list. Try again.")}throw new Error("Export exceeds 100,000 records. Narrow the filters and try again.")}catch(x){s(`Could not export: ${x.message||x}`)}}function C(){let k=e.getActiveSection();return e.createExportQuery&&["work","mywork","requests"].includes(k)?q(k):O(k)}function O(k,E){let P={work:{filename:"work-orders.csv",rows:(E&&k!=="requests"?E:e.getWorkOrders()).map(M=>({title:M.title,status:M.status,priority:M.priority,type:i(M.type),equipment:M.assets?.name||"",assigned_to:e.assignmentLabel(M),due_at:M.due_at||"",completed_at:M.completed_at||"",actual_minutes:M.actual_minutes||0,failure_cause:M.failure_cause||"",resolution_summary:M.resolution_summary||"",follow_up_needed:!!M.follow_up_needed}))},assets:{filename:"equipment.csv",rows:v()},financial:{filename:"equipment-financial.csv",rows:_()},requests:{filename:"maintenance-requests.csv",rows:(E&&k==="requests"?E:e.getMaintenanceRequests()).map(M=>({title:M.title,status:M.status,priority:M.priority,equipment:M.assets?.name||"",requested_by:e.getProfilesByUserId()[M.requested_by]?.full_name||"",created_at:M.created_at||"",converted_work_order_id:M.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(M=>({title:M.title,equipment:M.assets?.name||"",frequency:M.frequency,next_due_at:M.next_due_at,active:M.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(M=>({name:M.name,sku:M.sku||"",supplier_name:M.supplier_name||"",quantity_on_hand:M.quantity_on_hand,reorder_point:M.reorder_point,unit_cost:M.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(M=>({name:M.name,description:M.description||"",steps:M.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(M=>({user_id:M.user_id,name:e.getProfilesByUserId()[M.user_id]?.full_name||"",role:M.role}))}},I=P[k]||P.work;if(!I.rows.length)return s("Nothing to export in this section yet.");$(I.filename,I.rows)}function $(k,E){let P=Object.keys(E[0]),I=[P.join(","),...E.map(A=>P.map(W=>e.csvCell(A[W])).join(","))],M=new a([`\uFEFF${I.join(`
`)}`],{type:"text/csv;charset=utf-8"}),x=t.createObjectURL(M),w=n.createElement("a");w.href=x,w.download=k,n.body.appendChild(w),w.click(),w.remove(),t.revokeObjectURL(x)}return{downloadCsv:$,exportActiveSectionCsv:C}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Ft=U((Xn,Be)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let m=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(m)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Be<"u"&&(Be.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var Lt=U((er,je)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(s){let m=String.fromCharCode(...s),r=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return r?r(m).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=l(),typeof je<"u"&&(je.exports={createPublicRequestTokenHelpers:l})})()});var Nt=U((tr,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,a=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,m=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.createPublicRequestLink))}),typeof a=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>a(r.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>s(r.dataset.enablePublicRequestLink,!0))}),typeof m=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(r=>{r.addEventListener("click",()=>m(r.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof ze<"u"&&(ze.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Ut=U((nr,Ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let m=a.querySelector?.("button[type='submit']");if(!m?.disabled){m&&(m.disabled=!0);try{let r=a.querySelector?.("[name='planning_due_at']");await t(a.dataset.planningDueForm,r?.value)}finally{m?.isConnected&&(m.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof Ve<"u"&&(Ve.exports={bindWorkspacePlanningDueDateEvents:l})})()});var Qt=U((rr,He)=>{(function(){let l=new WeakSet;function e(a,s,m){if(!a)return;let r=a.querySelector("[data-equipment-choice-existing]"),i=a.querySelector("[data-equipment-choice-new]"),c=s==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(u=>{let f=u.value===(c?"new":"existing");u.checked=f,u.closest("label")?.classList.toggle("active",f)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(u=>{u.hidden=u.dataset.equipmentChoicePanel!==(c?"new":"existing")}),r&&(r.disabled=c,r.required=!c&&r.dataset.equipmentChoiceRequired==="true",c&&(r.value=""),typeof m=="function"&&m(r)),i&&(i.disabled=!c,i.required=c&&i.dataset.equipmentChoiceRequired==="true",c||(i.value=""))}function n(a,s){a.querySelectorAll("[data-equipment-choice]").forEach(m=>{let r=m.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(m,r,s)})}function t(a={}){let s=a.documentRef||document,m=a.updateAssetLocationWarning;n(s,m),!l.has(s)&&(l.add(s),s.addEventListener("change",r=>{let i=r.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,m);return}let c=r.target.closest?.("[data-equipment-choice-existing]");c&&typeof m=="function"&&m(c)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof He<"u"&&(He.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var Bt=U((ar,Ge)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:a,createQuickFixAsset:s,getMaintenanceRequests:m,getQuickFixRequestId:r,getActiveCompanyId:i,getSession:c,getParts:u,getRequestsReady:f,getSupabaseClient:o,confirmAssetLocationRouting:d,assetRequiresSafety:g,blocksProcedureCompletion:p,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:b,descriptionWithAssignmentNote:v,assignedUserFromForm:_,procedureColumn:q,workOrderDateValue:C,applySafetyRequirementPayload:O,applySafetyCheckPayload:$,insertWithOptionalProcedure:k,friendlyWorkOrderSaveError:E,addPartUsageToWorkOrder:P,addPhotoToWorkOrder:I,updateAssetStatus:M,recordWorkOrderEvent:x,setActiveWorkOrderIdState:w,setActiveAssetIdState:A,setCreateWorkOrderMode:W,setQuickFixMode:R,setQuickFixAssetId:S,setQuickFixRequestId:N,showNotice:L,render:V,alertUser:H=re=>window.alert(re)}=e;async function Z(re){re.preventDefault();let ce=re.currentTarget,X=n.querySelector("#quick-fix-error"),J=ce.querySelector("button[type='submit']");X&&(X.textContent=""),J&&(J.disabled=!0,J.textContent="Saving...");try{let j=new t(ce),me=String(j.get("title")||"").trim();if(!me)throw new Error("Quick Fix issue is required.");let he=r(),T=i(),B=c(),z=String(j.get("description")||"").trim(),Y=String(j.get("resolution_summary")||"").trim(),K=Y||me,te=z||me,G=j.get("mark_completed")==="on",ae=j.get("machine_down")==="on",ee=j.get("asset_id")||null,de=he?m().find(le=>le.id===he):null,oe=String(j.get("new_asset_name")||"").trim();if(ee&&oe)throw new Error("Choose existing equipment or create new equipment, not both.");if(oe){let{data:le,error:ne}=await a(s(oe,ae?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(ne){X&&(X.textContent=ne.message);return}ee=le.id}if(!oe&&!d(ee,"logging this Quick Fix",X))return;if(G&&g(ee)&&j.get("safety_devices_checked")!=="on"){X&&(X.textContent="Check safety devices before marking equipment work complete.");return}let F=G?p(null,j.get("procedure_template_id")||null):"";if(F){h("",""),X&&(X.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let se={company_id:T,location_id:y(ee),title:me,description:b(v(te,j.get("assigned_to")),de),asset_id:ee,assigned_to:_(j,B.user.id),priority:j.get("priority")||"medium",type:j.get("type")||"corrective",status:G?"completed":"open",due_at:C(j.get("due_at")),created_by:B.user.id,...q(j.get("procedure_template_id")),actual_minutes:0,failure_cause:j.get("failure_cause")||null,resolution_summary:G?K:Y||null,follow_up_needed:j.get("follow_up_needed")==="on",completion_notes:G?K:null,completed_at:G?new Date().toISOString():null};O(se),$(se,G&&se.safety_check_required&&j.get("safety_devices_checked")==="on");let{data:fe,error:ye}=await a(k("work_orders",se,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ye){X&&(X.textContent=`Could not log quick fix: ${E(ye)}`);return}let pe=[],we=j.get("part_id"),ie=Number(j.get("quantity_used"))||1;if(we){let le=u().find(D=>D.id===we),ne=await a(P(fe.id,le,ie),"Part usage save timed out.",12e3).catch(D=>D);ne&&pe.push(`part usage failed: ${ne.message}`)}let ge=j.get("photo");if(ge&&ge.name){let le=await a(I(fe.id,ge),"Photo upload timed out.",25e3).catch(ne=>ne);le&&pe.push(`photo upload failed: ${le.message}`)}let ve=ae?"offline":j.get("asset_status");if(se.asset_id&&!oe&&(ae||G&&ve)){let le=await a(M(se.asset_id,ve),"Equipment status update timed out.",12e3).catch(ne=>ne);le?pe.push(`equipment status did not update: ${le.message}`):await a(x(fe.id,"asset_status_updated",ae?"Equipment marked offline/down.":`Equipment status set to ${ve}.`),"Activity log timed out.",8e3).catch(ne=>pe.push(`history did not update: ${ne.message}`))}if(await a(x(fe.id,"quick_fix",G?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(le=>pe.push(`history did not update: ${le.message}`)),oe&&await a(x(fe.id,"equipment_created",`Equipment created from Quick Fix: ${oe}.`),"Activity log timed out.",8e3).catch(le=>pe.push(`history did not update: ${le.message}`)),he&&f()){let le=await a(o().from("maintenance_requests").update({status:"converted",reviewed_by:B.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:fe.id}).eq("id",he).eq("company_id",T),"Request status update timed out.",12e3).catch(ne=>({error:ne}));le.error?pe.push(`request status did not update: ${le.error.message}`):await a(x(fe.id,"request_quick_fixed",G?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(ne=>pe.push(`history did not update: ${ne.message}`))}w(fe.id),A(null),W(!1),R(!1),S(null),N(null),L(pe.length?`Quick Fix saved with warning: ${pe[0]}`:"Quick Fix saved.",pe.length?"warning":"success"),await V()}catch(j){X?X.textContent=`Could not log quick fix: ${j.message||j}`:H(j.message||j)}finally{J&&J.isConnected&&(J.disabled=!1,J.textContent="Log Quick Fix")}}return{createQuickFix:Z}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof Ge<"u"&&(Ge.exports={createQuickFixWorkflow:l})})()});var jt=U((or,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function s(){let u=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),f=n.querySelector("#create-pm-form");f&&!u.includes(f)&&u.push(f),u.forEach(o=>o.addEventListener("submit",m))}async function m(u){u.preventDefault();let f=u.currentTarget,o=f.querySelector("button[type='submit']"),d=f.querySelector("[data-pm-error]")||n.querySelector("#pm-error");d&&(d.textContent=""),o&&(o.disabled=!0,o.textContent="Adding...");try{let g=new t(f);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",d))return;let{error:p}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(p)throw p;e.showNotice("PM schedule added."),await e.render()}catch(g){d?d.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{o&&(o.disabled=!1,o.textContent="Add Schedule")}}function r(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(f=>f.id===u)&&(e.setPendingDeleteScheduleId(u),e.renderWorkspace())}async function i(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(d=>d.id===u))return;let o=n.querySelector(`[data-confirm-delete-schedule="${a.escape(u)}"]`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let{data:d,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!d?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let p=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(p.error)throw new Error(`PM schedule delete verification failed: ${p.error.message}`);if(p.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(d){e.showNotice(d.message||"Could not delete PM schedule.","warning"),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}async function c(u){let f=e.getPreventiveSchedules().find(d=>d.id===u);if(!f)return;let o=n.querySelector(`[data-generate-pm="${a.escape(u)}"]`);o&&(o.disabled=!0,o.textContent="Generating...");try{let d={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(f.asset_id),asset_id:f.asset_id,title:f.title,description:`Generated from preventive schedule: ${f.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:f.next_due_at,...e.procedureColumn(f.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(d),e.applySafetyCheckPayload(d,!1);let{data:g,error:p}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",d,{returnSingle:!0}),"PM work order generation timed out.");if(p)throw p;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(f.next_due_at,f.frequency)}).eq("id",f.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(d){e.showNotice(`Could not generate PM work: ${d.message||d}`,"warning"),o&&(o.disabled=!1,o.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:m,requestDeletePreventiveSchedule:r,deletePreventiveSchedule:i,generatePreventiveWorkOrder:c}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:l},typeof Ye<"u"&&(Ye.exports={createPreventiveMaintenanceWorkflow:l})})()});var zt=U((ir,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function s(){let d=n.querySelector("#create-procedure-form");d&&d.addEventListener("submit",m);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",r),n.querySelectorAll("[data-add-step]").forEach(p=>{p.addEventListener("submit",i)})}async function m(d){d.preventDefault();let g=d.currentTarget,p=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");try{let y=new t(g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(b)throw b;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{p&&(p.disabled=!1,p.textContent="Add Checklist")}}async function r(){let d=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(p=>p.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}d&&(d.disabled=!0,d.textContent="Adding sample...");try{let{data:p,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(v=>({...v,company_id:e.getActiveCompanyId(),procedure_template_id:p.id})),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(b)throw b;e.showNotice("Sample procedure checklist added."),await e.render()}catch(p){e.showNotice(`Could not add sample procedure: ${p.message||p}`,"warning")}finally{d&&(d.disabled=!1,d.textContent="Add sample inspection checklist")}}async function i(d){d.preventDefault();let g=d.currentTarget,p=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");try{let y=new t(g),v=(e.getProcedureTemplates().find(q=>q.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:_}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:v,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(_)throw _;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{p&&(p.disabled=!1,p.textContent="Add Step")}}async function c(d){let[g,p]=await Promise.all([u("work_orders",d),u("preventive_schedules",d)]);return{workOrders:g,schedules:p}}async function u(d,g){let{count:p,error:h}=await e.withOperationTimeout(e.supabaseClient().from(d).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${d}.`,15e3);if(h)throw new Error(`Could not verify linked ${d.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return p||0}async function f(d){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(p=>p.id===d))return;let g=n.querySelector(`[data-procedure-delete-error="${a.escape(d)}"]`);g&&(g.textContent="");try{let p=await c(d),h=e.procedureDeleteBlockerMessage(p);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(d),e.renderWorkspace()}catch(p){g?g.textContent=p.message||"Could not verify procedure links before delete.":e.showNotice(p.message||"Could not verify procedure links before delete.","warning")}}async function o(d){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===d))return;let p=n.querySelector(`[data-confirm-delete-procedure="${a.escape(d)}"]`),h=n.querySelector(`[data-procedure-delete-error="${a.escape(d)}"]`);h&&(h.textContent=""),p&&(p.disabled=!0,p.textContent="Deleting...");try{let y=await c(d),b=e.procedureDeleteBlockerMessage(y);if(b)throw new Error(b);let{data:v,error:_}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(_)throw _;if(!v?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let q=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",d).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if(q.error)throw new Error(`Procedure checklist delete verification failed: ${q.error.message}`);if(q.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let b=y.message||"Could not delete procedure.";e.showNotice(b,"warning"),h&&(h.textContent=b),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:m,seedSampleProcedure:r,createProcedureStep:i,loadProcedureDeleteBlockers:c,countProcedureLinkedRows:u,requestDeleteProcedureTemplate:f,deleteProcedureTemplate:o}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:l},typeof Ke<"u"&&(Ke.exports={createProcedureWorkflow:l})})()});var Vt=U((sr,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let p=n.querySelector("#add-member-form");p&&p.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach(q=>{q.addEventListener("submit",m)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",r);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",u);let b=n.querySelector("#team-invite-form");b&&b.addEventListener("submit",i);let v=n.querySelector("#team-invite-link-form");v&&v.addEventListener("submit",f),n.querySelectorAll("[data-revoke-invite-link]").forEach(q=>{q.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(q.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(q=>{q.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(q=>{q.addEventListener("click",()=>o(q.dataset.confirmRevokeInviteLink))});let _=n.querySelector("#request-notification-recipient-form");_&&_.addEventListener("submit",d),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(q=>{q.addEventListener("click",()=>g(q.dataset.deleteRequestNotificationRecipient))})}async function s(p){p.preventDefault();let h=p.currentTarget,y=new t(h),b=String(y.get("role")||"technician").trim().toLowerCase(),v=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&b!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}v&&(v.disabled=!0,v.textContent="Adding...");try{let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:b}),"Team member save timed out.");if(_)throw _;await e.render()}catch(_){e.alertUser(_.message||_)}finally{v?.isConnected&&(v.disabled=!1,v.textContent="Add Member")}}async function m(p){p.preventDefault();let h=p.currentTarget,y=new t(h),b=String(y.get("role")||"").trim().toLowerCase(),v=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}v&&(v.disabled=!0,v.textContent="Saving...");try{let{error:_}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:b}),"Role save timed out. Check your connection and try again.",15e3);if(_)throw new Error(_.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":_.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(_){e.showNotice(`Could not save role: ${_.message||_}`,"warning")}finally{v&&(v.disabled=!1,v.textContent="Save Role")}}async function r(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#profile-error"),b=h.querySelector("button[type='submit']"),v=new t(h),_=String(v.get("full_name")||"").trim(),q=h.querySelector('input[name="mobile_tech"]'),C=q?q.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),b&&(b.disabled=!0,b.textContent="Saving...");try{let{error:O}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:_,mobile_tech:C},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(O)throw e.isMissingColumnError(O,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):O;e.showNotice("Profile saved."),await e.render()}catch(O){y&&(y.textContent=O.message||"Could not save profile.")}finally{b&&(b.disabled=!1,b.textContent="Save Profile")}}async function i(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#team-invite-error"),b=h.querySelector("button[type='submit']"),v=new t(h),_=String(v.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&_!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}b&&(b.disabled=!0,b.textContent="Inviting...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(v.get("email")||"").trim(),invite_role:_,invite_default_location_id:v.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(q)throw q.message.includes("create_company_invite")||e.isColumnSchemaError(q,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):q;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(q){y&&(y.textContent=q.message||"Could not create invite.")}finally{b&&(b.disabled=!1,b.textContent="Create Invite")}}async function c(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:p}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function u(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#password-change-error"),b=h.querySelector("button[type='submit']"),v=new t(h),_=String(v.get("password")||""),q=String(v.get("confirmPassword")||"");if(y&&(y.textContent=""),_.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(_!==q){y&&(y.textContent="Passwords do not match.");return}b&&(b.disabled=!0,b.textContent="Updating...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:_}),"Password update timed out. Check your connection and try again.",15e3);if(C)throw C;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(C){y&&(y.textContent=C.message||"Could not update password.")}finally{b&&(b.disabled=!1,b.textContent="Update Password")}}async function f(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#team-invite-link-error"),b=h.querySelector("button[type='submit']"),v=new t(h),_=String(v.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let q="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(q),y&&(y.textContent=q);return}if(_==="admin"){let q="Admin join links are not allowed.";e.setTeamInviteLinkError(q),y&&(y.textContent=q);return}if(!e.canAdministerTeamRoles?.()&&_!=="technician"){let q="Managers can only create technician join links.";e.setTeamInviteLinkError(q),y&&(y.textContent=q);return}b&&(b.disabled=!0,b.textContent="Creating...");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:_,link_location_id:v.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(q)throw q.message.includes("create_company_invite_link")||e.isColumnSchemaError(q,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):q;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(q){let C=q.message||"Could not create join link.";e.setTeamInviteLinkError(C),y&&(y.textContent=C)}finally{b&&(b.disabled=!1,b.textContent="Create Join Link")}}async function o(p){if(!(!p||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:p}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function d(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#request-notification-recipient-error"),b=h.querySelector("button[type='submit']"),v=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let _="Only admins can change request email routing.";e.setRequestNotificationRecipientError(_),y&&(y.textContent=_);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}b&&(b.disabled=!0,b.textContent="Adding...");try{let _=String(v.get("email")||"").trim().toLowerCase(),{error:q}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:v.get("location_id")||null,email:_,label:String(v.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(q)throw e.isColumnSchemaError(q,["request_notification_recipients"])||q.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):q;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(_){let q=_.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(q),y&&(y.textContent=q)}finally{b&&(b.disabled=!1,b.textContent="Add Recipient")}}async function g(p){if(!(!p||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",p),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:s,updateCompanyMemberRole:m,updateMyProfile:r,updateMyPassword:u,createTeamInvite:i,cancelTeamInvite:c,createTeamInviteLink:f,revokeTeamInviteLink:o,createRequestNotificationRecipient:d,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Je<"u"&&(Je.exports={createTeamWorkflow:l})})()});var Ht=U((cr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let c=n.querySelector("#location-form");c&&c.addEventListener("submit",m);let u=n.querySelector("#public-app-url-form");u&&u.addEventListener("submit",r)}async function s(i){i.preventDefault();let c=i.currentTarget,u=c.querySelector("button[type='submit']"),f=new t(c);u&&(u.disabled=!0,u.textContent="Saving...");try{let{error:o}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(o)throw o;e.showNotice("Company saved."),await e.render()}catch(o){e.showNotice(`Could not save company: ${o.message||o}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Save Company")}}async function m(i){i.preventDefault();let c=i.currentTarget,u=n.querySelector("#location-error"),f=c.querySelector("button[type='submit']"),o=String(new t(c).get("name")||"").trim();if(o){u&&(u.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:d,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),o),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(d.id),e.persistActiveLocationId(d.id),e.showNotice("Location added."),await e.render()}catch(d){u&&(u.textContent=d.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function r(i){i.preventDefault();let c=n.querySelector("#public-request-link-error"),u=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(c&&(c.textContent=""),!u){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(u);if(!f){c&&(c.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:s,createLocation:m,savePublicAppUrl:r}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof Ze<"u"&&(Ze.exports={createCompanySettingsWorkflow:l})})()});var Gt=U((lr,Xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.FormDataCtor||FormData,s=e.confirmUser||(o=>t.confirm(o));function m(){let o=n.querySelector("#app-issue-report-form");o&&o.addEventListener("submit",c),n.querySelectorAll("[data-app-issue-status]").forEach(d=>{d.addEventListener("submit",u)}),n.querySelectorAll("[data-delete-app-issue]").forEach(d=>{d.addEventListener("click",f)})}async function r(){let{data:o,error:d}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!d),e.setAppIssueReports(d?[]:o||[]),d)throw d}function i(o){let d=e.appIssueReportErrorState(o);return d.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),d.message}async function c(o){o.preventDefault();let d=o.currentTarget,g=n.querySelector("#app-issue-report-error"),p=d.querySelector("button[type='submit']"),h=new a(d);g&&(g.textContent=""),p&&(p.disabled=!0,p.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:b}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(b)throw b;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await r(),e.renderWorkspace()}catch(y){g&&(g.textContent=i(y))}finally{p?.isConnected&&(p.disabled=!1,p.textContent="Send Report")}}async function u(o){if(o.preventDefault(),!e.canManageTeam())return;let d=o.currentTarget,g=d.querySelector("button[type='submit']"),p=new a(d);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(p.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),d.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function f(o){if(o.preventDefault(),!e.canManageTeam())return;let d=o.currentTarget,g=d.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;d.disabled=!0;let p=d.textContent;d.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{d?.isConnected&&(d.disabled=!1,d.textContent=p||"Delete")}}return{bindAppIssueWorkflowEvents:m,reloadAppIssueReports:r,appIssueReportError:i,createAppIssueReport:c,updateAppIssueReportStatus:u,deleteAppIssueReport:f}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Xe<"u"&&(Xe.exports={createAppIssueWorkflow:l})})()});var Yt=U((ur,et)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,a=e.CSSRef||CSS;async function s(u){let f=n.querySelector("#public-request-link-error"),o=n.querySelector(`[data-create-public-request-link="${a.escape(u)}"]`);f&&(f.textContent=""),o&&(o.disabled=!0,o.textContent="Creating...");try{let{error:d}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:u}),"QR link save timed out. Check your connection and try again.",15e3);if(d)throw e.setPublicRequestLinksReady(!1),new Error(d.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":d.message);e.showNotice("Location request QR link ready."),await e.render()}catch(d){f&&(f.textContent=d.message||"Could not create QR request link.")}finally{o&&(o.disabled=!1,o.textContent="Create QR Link")}}async function m(u){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await r(u,!1)}async function r(u,f){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can reactivate or disable posted QR request links.");return}await c(u,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function i(u){if(!e.canAdministerPublicRequestLinks()){let o=n.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await c(u,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function c(u,f,o){let d=n.querySelector("#public-request-link-error");if(d&&(d.textContent=""),!e.canAdministerPublicRequestLinks()){d&&(d.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!u||!e.getActiveCompanyId()){d&&(d.textContent="Select a company before updating request links.");return}try{let{data:g,error:p}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(p){d&&(d.textContent=p.message);return}if(!g?.length){d&&(d.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(o),await e.render()}catch(g){d&&(d.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:m,setPublicRequestLinkActive:r,regeneratePublicRequestLink:i,updatePublicRequestLink:c}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof et<"u"&&(et.exports={createPublicRequestLinkWorkflow:l})})()});var Kt=U((dr,tt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=new WeakMap;function s(d,g){let p=e.getParts().find(h=>h.id===g);p&&!a.has(d)&&a.set(d,{id:g,companyId:e.getActiveCompanyId(),quantity_on_hand:Number(p.quantity_on_hand)||0})}function m(d){if(!d||d.companyId!==e.getActiveCompanyId())throw new Error("Reopen this part before saving.")}function r(){let d=n.querySelector("#create-part-form");d&&d.addEventListener("submit",i),n.querySelectorAll("[data-restock-part]").forEach(g=>{s(g,g.dataset.restockPart),g.addEventListener("submit",c)}),n.querySelectorAll("[data-use-part]").forEach(g=>{s(g,g.dataset.usePart),g.addEventListener("submit",u)}),n.querySelectorAll("[data-edit-part]").forEach(g=>{s(g,g.dataset.editPart),g.addEventListener("submit",f)}),n.querySelectorAll("[data-rename-part-source]").forEach(g=>{g.addEventListener("submit",o)})}async function i(d){d.preventDefault();let g=d.currentTarget,p=n.querySelector("#part-create-error"),h=g.querySelector("button[type='submit']"),y=new t(g);p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Adding...");let b;try{let v={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(y.get("name")||"").trim(),sku:String(y.get("sku")||"").trim()||null,supplier_name:String(y.get("supplier_name")||"").trim()||null,machine_note:String(y.get("machine_note")||"").trim()||null,quantity_on_hand:Number(y.get("quantity_on_hand"))||0,reorder_point:Number(y.get("reorder_point"))||0,unit_cost:Number(y.get("unit_cost"))||0};if(!v.company_id)throw new Error("Choose a company before adding parts.");if(!v.name)throw new Error("Part name is required.");let _=new Promise((O,$)=>{b=setTimeout(()=>$(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:q,error:C}=await Promise.race([e.supabaseClient().from("parts").insert(v).select("id").single(),_]);if(clearTimeout(b),C&&e.isMissingColumnError(C,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(C&&e.isMissingColumnError(C,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(C&&e.isMissingColumnError(C,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(C&&e.isMissingColumnError(C,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(C)throw C;e.setActivePartId(q?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),g.reset(),await e.render()}catch(v){p&&(p.textContent=v.message||"Could not add part.")}finally{b&&clearTimeout(b),h&&h.isConnected&&(h.disabled=!1,h.textContent="Add Part")}}async function c(d){d.preventDefault();let g=d.target,p=g.querySelector("button[type='submit']"),h=a.get(g),y=Number(new t(g).get("quantity"))||0;if(!h||y<=0)return;let b=p?.textContent||"Restock";p&&(p.disabled=!0,p.textContent="Saving...");try{m(h);let{data:v,error:_}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(h.quantity_on_hand)||0)+y}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(h.quantity_on_hand)||0).select("id"),"Part restock timed out. Check your connection and try again.",15e3);if(_)throw _;if(!v?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part restocked."),await e.render()}catch(v){e.showNotice(`Could not restock part: ${v.message||v}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=b)}}async function u(d){d.preventDefault();let g=d.currentTarget,p=g.querySelector("button[type='submit']"),h=a.get(g),y=Number(new t(g).get("quantity"))||0;if(!h||y<=0)return;let b=p?.textContent||"Use";p&&(p.disabled=!0,p.textContent="Saving...");try{m(h);let v=Number(h.quantity_on_hand)||0;if(y>v)throw new Error("Quantity used exceeds the stock on hand.");let _=v-y,{data:q,error:C}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:_}).eq("id",h.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",v).select("id"),"Part use save timed out. Check your connection and try again.",15e3);if(C)throw C;if(!q?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part used."),await e.render()}catch(v){e.showNotice(`Could not use part: ${v.message||v}`,"warning")}finally{p&&(p.disabled=!1,p.textContent=b)}}async function f(d){d.preventDefault();let g=d.currentTarget,p=g.dataset.editPart,h=n.querySelector(`[data-part-edit-error="${p}"]`),y=g.querySelector("button[type='submit']"),b=new t(g);h&&(h.textContent="");let v=y?.textContent||"Save Part";y&&(y.disabled=!0,y.textContent="Saving...");let _={name:String(b.get("name")||"").trim(),sku:b.get("sku")||null,supplier_name:b.get("supplier_name")||null,machine_note:b.get("machine_note")||null,quantity_on_hand:Number(b.get("quantity_on_hand"))||0,reorder_point:Number(b.get("reorder_point"))||0,unit_cost:Number(b.get("unit_cost"))||0};try{if(!_.name)throw new Error("Part name is required.");let q=a.get(g);if(m(q),q.id!==p)throw new Error("Reopen this part before saving.");let{data:C,error:O}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(_).eq("id",p).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(q.quantity_on_hand)||0).select("id"),"Part save timed out. Check your connection and try again.",15e3);if(O&&e.isMissingColumnError(O,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(O&&e.isMissingColumnError(O,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(O&&e.isMissingColumnError(O,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(O)throw O;if(!C?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(q){h&&(h.textContent=q.message||"Could not save part.")}finally{y&&(y.disabled=!1,y.textContent=v)}}async function o(d){d.preventDefault();let g=d.currentTarget,p=n.querySelector("#part-source-error"),h=g.querySelector("button[type='submit']"),y=new t(g),b=String(y.get("old_source")||"").trim(),v=String(y.get("new_source")||"").trim();if(p&&(p.textContent=""),!!b){if(!e.getPartSuppliersReady()){p&&(p.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(b===v){p&&(p.textContent="Change the source name before saving.");return}h&&(h.disabled=!0,h.textContent="Renaming...");try{let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:v||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",b),"Part source rename timed out. Check your connection and try again.",15e3);if(_)throw e.isMissingColumnError(_,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?_.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(_){p&&(p.textContent=_.message||"Could not update part source.")}finally{h&&(h.disabled=!1,h.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:i,restockPart:c,usePartFromInventory:u,updatePart:f,renamePartSource:o}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof tt<"u"&&(tt.exports={createPartInventoryWorkflow:l})})()});var Jt=U((pr,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(m){m.preventDefault();let r=m.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#quick-update-error"),u=e.getWorkOrders().find(o=>o.id===e.getActiveWorkOrderId()),f=new t(r);i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let o=f.get("asset_id")||null,d=String(f.get("new_asset_name")||"").trim();if(o&&d)throw new Error("Choose existing equipment or create new equipment, not both.");if(d){let{data:v,error:_}=await e.createQuickFixAsset(d,"running");if(_){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not add equipment: ${_.message}`);return}o=v.id}if(!d&&!e.confirmAssetLocationRouting(o,"saving this work update",c))return;let g={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(u?.description||"",f.get("assigned_to")),asset_id:o,location_id:e.locationIdForAsset(o),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let p=f.get("safety_devices_checked")==="on";if(g.status==="completed"&&u?.status!=="completed"){let v=e.productionActionCompletionMessage?.(u)||"";if(v){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),v),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=v);return}let _=e.blocksProcedureCompletion(u,g.procedure_template_id||null);if(_){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),_),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=_);return}if(e.applySafetyCheckPayload(g,p),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):u?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(p||e.hasCompletedSafetyDeviceCheck(u)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&f.get("machine_down")==="on"){let v=await e.updateAssetStatus(g.asset_id,"offline");v?y.push(`equipment status did not update: ${v.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let b=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(u,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch(v=>v);d&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${d}.`),"Activity log timed out.",8e3).catch(()=>null),b&&y.push(`history did not update: ${b.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(o){a.error("Quick update save failed",o),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${o.message||o}`)}}return{updateWorkOrderQuickView:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var Zt=U((mr,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function m(O){return String(O.get("location_new")||O.get("location_existing")||O.get("location")||"").trim()||null}function r(){return e.getSession?.()?.user?.id||null}function i(O){return(e.getAssets?.()||[]).find($=>$.id===O)||null}function c(O,$){if(!O)return[];let k={name:"name",asset_code:"serial number",asset_tag:"asset tag",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(k).filter(E=>String(O[E]??"")!==String($[E]??"")).map(E=>k[E])}function u(O){return e.isMissingColumnError(O,"manufacturer")||e.isMissingColumnError(O,"model")}async function f(O){O.preventDefault();let $=O.currentTarget,k=e.captureCreateDraft?.($),E=n.querySelector("#asset-create-error");E&&(E.textContent="");let P=$.querySelector("button[type='submit']"),I=P?.textContent||"Add Equipment",M=O.submitter?.dataset?.assetContinue==="true";P&&(P.disabled=!0,P.textContent="Saving...");try{let x=new t($),w={company_id:e.getActiveCompanyId(),location_id:x.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(x.get("name"),"Equipment name"),asset_code:String(x.get("asset_code")||"").trim()||null,asset_tag:String(x.get("asset_tag")||"").trim()||null,manufacturer:String(x.get("manufacturer")||"").trim()||null,model:String(x.get("model")||"").trim()||null,location:m(x),parent_asset_id:x.get("parent_asset_id")||null,asset_type:x.get("asset_type")||"machine",safety_devices_required:x.get("safety_devices_required")==="on",status:"running",created_by:r()},A=e.supabaseClient().from("assets").insert(w).select("id").single(),{data:W,error:R}=await e.withOperationTimeout(A,"Equipment save timed out. Check your connection and try again.",15e3);if(R&&e.isMissingColumnError(R,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(R&&e.isMissingColumnError(R,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(R&&u(R))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(R&&e.isMissingColumnError(R,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(R&&e.isAssetHierarchySchemaError(R))throw new Error(e.equipmentSchemaMessage(R));if(R)throw R;e.clearCreateDraft?.(k),W?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(W.id,"created",`Created ${w.name}.`),M&&W?.id?(e.setActiveAssetId(W.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(x){E?E.textContent=x.message:a(x.message)}finally{P&&(P.disabled=!1,P.textContent=I)}}async function o(O){O.preventDefault();let $=O.currentTarget,k=n.querySelector("#asset-edit-error");k&&(k.textContent="");let E=$.querySelector("button[type='submit']"),P=E?.textContent||"Save Equipment";E&&(E.disabled=!0,E.textContent="Saving...");try{let I=new t($),M=i(e.getActiveAssetId()),x={name:e.requiredText(I.get("name"),"Equipment name"),asset_code:String(I.get("asset_code")||"").trim()||null,asset_tag:String(I.get("asset_tag")||"").trim()||null,manufacturer:String(I.get("manufacturer")||"").trim()||null,model:String(I.get("model")||"").trim()||null,location_id:I.get("location_id")||e.activeLocationDatabaseId(),location:m(I),parent_asset_id:I.get("parent_asset_id")||null,asset_type:I.get("asset_type")||"machine",safety_devices_required:I.get("safety_devices_required")==="on",status:I.get("status")},{error:w}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(x).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(w&&u(w))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(w&&e.isMissingColumnError(w,"asset_tag"))throw new Error("Equipment asset tags need a database update. Contact your administrator.");if(w&&e.isAssetHierarchySchemaError(w))throw new Error(e.equipmentSchemaMessage(w));if(w)throw w;let A=c(M,x);A.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${A.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(I){k?k.textContent=I.message:a(I.message)}finally{E&&(E.disabled=!1,E.textContent=P)}}async function d(O,$){let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:$}).eq("id",O).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!k&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(O,"status_changed",`Status changed to ${$}.`),k||null}async function g(O){O.preventDefault();let $=O.currentTarget,k=$.dataset.attachAssetPart,E=n.querySelector(`[data-asset-part-error="${s.escape(k)}"]`);E&&(E.textContent="");let P=$.querySelector("button[type='submit']"),I=P?.textContent||"Attach Part";P&&(P.disabled=!0,P.textContent="Attaching...");try{let M=new t($),x=M.get("part_id");if(!x)throw new Error("Select a part to attach.");let w=Math.max(1,Number(M.get("quantity_recommended"))||1),A=String(M.get("note")||"").trim()||null,{error:W}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:k,part_id:x,quantity_recommended:w,note:A}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(W)throw e.isMissingTableError?.(W,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):W.code==="23505"?new Error("This part is already linked to this equipment."):W;e.showNotice("Part linked to equipment."),await e.render()}catch(M){E?E.textContent=M.message||"Could not link part to equipment.":e.showNotice(M.message||"Could not link part to equipment.","warning")}finally{P&&(P.disabled=!1,P.textContent=I)}}async function p(O){let $=n.querySelector("[data-asset-part-error]");$&&($.textContent="");try{let{error:k}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",O).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(k)throw e.isMissingTableError?.(k,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):k;e.showNotice("Part link removed."),await e.render()}catch(k){$?$.textContent=k.message||"Could not remove linked part.":e.showNotice(k.message||"Could not remove linked part.","warning")}}function h(O){return{workOrders:e.getWorkOrders().filter($=>$.asset_id===O).length,children:e.childAssetsFor(O).length,schedules:e.getPreventiveSchedules().filter($=>$.asset_id===O).length,requests:e.getMaintenanceRequests().filter($=>$.asset_id===O).length}}function y(O){let $=h(O);return Object.values($).some(Boolean)}async function b(O){let[$,k,E]=await Promise.all([v("work_orders",O),v("preventive_schedules",O),v("maintenance_requests",O)]);return{workOrders:$,children:e.childAssetsFor(O).length,schedules:k,requests:E}}async function v(O,$){let{count:k,error:E}=await e.withOperationTimeout(e.supabaseClient().from(O).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",$),`Equipment delete check timed out while checking ${O}.`,15e3);if(E)throw new Error(`Could not verify linked ${O.replaceAll("_"," ")} before deleting equipment: ${E.message}`);return k||0}async function _(O){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let $=n.querySelector("#asset-delete-error");$&&($.textContent="");try{let k=await b(O),E=e.assetDeleteBlockerMessage(k);if(E){$&&($.textContent=E);return}e.setPendingDeleteAssetId(O),e.renderWorkspace()}catch(k){$?$.textContent=k.message||"Could not verify equipment links before delete.":e.showNotice(k.message||"Could not verify equipment links before delete.","warning")}}async function q(O){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let $=n.querySelector("#asset-delete-error");$&&($.textContent="");let k=n.querySelector(`[data-confirm-delete-asset="${s.escape(O)}"]`);k&&(k.disabled=!0,k.textContent="Deleting...");try{let E=await b(O),P=e.assetDeleteBlockerMessage(E);if(P)throw new Error(P);let I=e.getAssetDocumentStoragePaths?.(O)||[];if(I.length){let x=await e.withOperationTimeout(e.removeAssetDocumentStorage(I),"Equipment file cleanup timed out.",15e3);if(x.error)throw new Error(`Could not remove equipment files: ${x.error.message}`)}let{error:M}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",O).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(M)throw new Error(M.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":M.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(E){$&&($.textContent=E.message||"Could not delete equipment."),k&&(k.disabled=!1,k.textContent="Permanently Delete")}}async function C(O,$="running"){let k={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:O,asset_type:"machine",safety_devices_required:!0,status:$,created_by:r()},E=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(k).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return E.error&&e.isMissingColumnError(E.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(E,e.databaseSetupRequiredMessage("adding equipment in this location"))):E.error&&e.isMissingColumnError(E.error,"created_by")?e.withSetupError(E,"Run supabase/step-next-asset-events.sql before saving equipment history."):E.error&&e.isAssetHierarchySchemaError(E.error)?e.withSetupError(E,e.equipmentSchemaMessage(E.error).replace("saving","adding")):(!E.error&&E.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(E.data.id,"created",`Created ${O}.`),E)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:v,createAsset:f,createQuickFixAsset:C,deleteAsset:q,loadAssetDeleteBlockers:b,removeAssetPart:p,requestDeleteAsset:_,updateAsset:o,updateAssetStatus:d}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var Xt=U((fr,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert,s=e.CSSRef||CSS;function m(){let d=n.querySelector("#detail-panel");d.innerHTML=e.renderRequestFormContent()}async function r(d){d.preventDefault(),await i(d.target)}async function i(d){let g=n.querySelector("#request-error"),p=d.querySelector("button[type='submit']");g&&(g.textContent=""),p&&(p.disabled=!0,p.textContent="Submitting...");try{let h=new t(d),y=h.get("asset_id")||null,b=String(h.get("equipment_note")||"").trim();if(y&&b)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!b)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let v=b||e.assetNameFor?.(y)||"Saved equipment",_=e.requiredText(h.get("description"),"Request details"),q=e.requiredText(h.get("requester_name"),"Your name"),C={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${v}

${_}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:q};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:O,error:$}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(C).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if($&&e.isMissingColumnError($,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if($)throw $;let k=h.get("photo"),E="";if(k&&k.name){let I=await e.addPhotoToMaintenanceRequest(O.id,k);I&&(E=` Photo did not upload: ${I.message||I}`)}let P=await e.notifyRequestEmailer(O.id);P?.error&&console.warn("Request email notification did not send",P.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${E}`,E?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{p&&(p.disabled=!1,p.textContent="Submit Request")}}async function c(d){if(!e.getMaintenanceRequests().find(h=>h.id===d))return;let p=n.querySelector(`[data-convert-request="${s.escape(d)}"]`);p&&(p.disabled=!0,p.textContent="Converting...");try{let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().rpc("convert_maintenance_request",{target_company_id:e.getActiveCompanyId(),target_request_id:d}),"Request conversion timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.id)throw new Error("Conversion did not return a work order. Review the request before retrying.");e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),p&&(p.disabled=!1,p.textContent="Convert to Work Order")}}function u(d){let g=e.getMaintenanceRequests().find(p=>p.id===d);g&&(e.setQuickFixRequestId(d),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(d){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===d)&&(e.setPendingDeleteRequestId(d),e.renderWorkspace())}async function o(d){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===d);if(!g)return;let p=n.querySelector(`[data-confirm-delete-request="${s.escape(d)}"]`);p&&(p.disabled=!0,p.textContent="Deleting...");try{if(g.photo_storage_path){let v=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(v.error)throw new Error(`Could not remove request photo: ${v.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",d).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let b=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",d).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(b.error)throw new Error(`Request delete verification failed: ${b.error.message}`);if(b.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),p&&(p.disabled=!1,p.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:c,createRequest:r,createRequestFromForm:i,deleteMaintenanceRequest:o,openQuickFixForRequest:u,renderRequestForm:m,requestDeleteMaintenanceRequest:f}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var en=U((gr,Ee)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.alertRef||alert;async function s(m){m.preventDefault();let r=m.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",c&&(c.textContent="");try{let u=new t(r),f=u.get("status")||"open",o=u.get("asset_id")||null,d=String(u.get("new_asset_name")||"").trim();if(o&&d)throw new Error("Choose existing equipment or create new equipment, not both.");if(d){let{data:C,error:O}=await e.createQuickFixAsset(d,"running");if(O){c&&(c.textContent=`Could not add equipment: ${O.message}`);return}o=C.id}if(!d&&!e.confirmAssetLocationRouting(o,"creating this work order",c))return;if(f==="completed"&&e.assetRequiresSafety(o)&&u.get("safety_devices_checked")!=="on"){c&&(c.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=f==="completed"?e.blocksProcedureCompletion(null,u.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),c&&(c.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(o),title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),asset_id:o,priority:u.get("priority"),type:u.get("type")||"corrective",due_at:e.workOrderDateValue(u.get("due_at")),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(u.get("actual_minutes"))||0,failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",completion_notes:u.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,f==="completed"&&p.safety_check_required&&u.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){c&&(c.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),d&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${d}.`);let b=[],v=u.get("part_id");if(v){let C=e.getParts().find($=>$.id===v),O=await e.addPartUsageToWorkOrder(h.id,C,Number(u.get("quantity_used"))||1);O?b.push(`part usage failed: ${O.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${C?.name||"Part"}.`)}let _=u.get("photo");if(_&&_.name){let C=await e.addPhotoToWorkOrder(h.id,_);C?b.push(`photo upload failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${_.name}.`)}let q=String(u.get("initial_comment")||"").trim();if(q){let C=await e.addCommentToWorkOrder(h.id,q);C?b.push(`comment failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(b.length?`Work order created with warning: ${b[0]}`:"Work order created.",b.length?"warning":"success"),await e.render()}catch(u){c?c.textContent=`Could not create work order: ${u.message||u}`:a(u.message||u)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ee<"u"&&Ee.exports&&(Ee.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var tn=U((hr,Re)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.consoleRef||console;async function s(m){m.preventDefault();let i=m.target.querySelector("button[type='submit']"),c=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let u=new t(m.target),f=e.getActiveWorkOrderId(),o=e.getWorkOrders().find(C=>C.id===f),d=n.querySelector("#status-select")?.value||o?.status||"open",g=u.has("asset_id"),p=g?u.get("asset_id")||null:o?.asset_id||null;if(g&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(p,"saving this work order",c)){i.disabled=!1,i.textContent="Save Work Order";return}let h={title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),due_at:e.workOrderDateValue(u.get("due_at")),status:d,priority:u.get("priority"),type:u.get("type"),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",actual_minutes:Number(u.get("actual_minutes"))||0};if(g&&(h.asset_id=p,h.location_id=e.locationIdForAsset(p)),h.safety_check_required=e.assetRequiresSafety(p),h.status==="completed"){let C=e.productionActionCompletionMessage?.(o)||"";if(C){e.setWorkOrderActionWarning(f,C),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=C);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(o)&&u.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let y=(o?.procedure_template_id||"")!==(h.procedure_template_id||""),b=h.status==="completed"&&(o?.status!=="completed"||y)?e.blocksProcedureCompletion(o,h.procedure_template_id||null):"";if(b){e.setWorkOrderActionWarning(f,b),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=b);return}h.status==="completed"&&o?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):o?.status==="completed"&&h.safety_check_required&&u.has("safety_devices_checked")?e.applySafetyCheckPayload(h,u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)):o?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:v}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,f),"Work order save timed out. Check your connection and try again.",2e4);if(v){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(v)}`);return}let _={...Object.fromEntries(u.entries()),status:d},q=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(o,_)),"Activity log timed out.",8e3).catch(C=>C);e.setWorkOrderActionWarning("",""),e.showNotice(q?`Work order saved, but history did not update: ${q.message}`:"Work order saved.",q?"warning":"success"),await e.render()}catch(u){a.error("Work order save failed",u),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${u.message||u}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof Re<"u"&&Re.exports&&(Re.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var nn=U((yr,Oe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function a(m){m.preventDefault();let r=m.currentTarget,i=n.querySelector("#parts-used-error"),c=r.querySelector("button[type='submit']");i&&(i.textContent=""),c&&(c.disabled=!0,c.textContent="Recording...");try{let u=new t(r),f=u.get("part_id"),o=Number(u.get("quantity_used"))||1,d=e.getParts().find(p=>p.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!d)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),d,o);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(u){i&&(i.textContent=u.message||"Could not record part used.")}finally{c&&(c.disabled=!1,c.textContent="Record Part Used")}}async function s(m,r,i){if(!r)return new Error("Choose a part first.");let{error:c}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:m,p_part_id:r.id,p_quantity:i}),"Part usage save timed out.");return c||null}return{addPartUsageToWorkOrder:s,recordPartUsed:a}}typeof Oe<"u"&&Oe.exports&&(Oe.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var rn=U((br,We)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.consoleRef||console,m=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),r=25*1024*1024,i=5*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),u=new Set;async function f(w){w.preventDefault();let A=w.currentTarget,W=A.dataset.partDocument,R=n.querySelector(`[data-part-document-error="${W}"]`),S=A.querySelector("button[type='submit']"),N=new t(A),L=N.get("document"),V=h(N.get("document_type"));if(R&&(R.textContent=""),!e.getPartDocumentsReady()){R&&(R.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!L||!L.name){R&&(R.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(k(L)){R&&(R.textContent=E()),await q("part document",L,E());return}S&&(S.disabled=!0,S.textContent="Attaching...");let H=await O(L),Z=H.fileName||e.safeFileName(L.name||"part-file"),re=`${e.getActiveCompanyId()}/${W}/${a.randomUUID()}-${Z}`;try{let ce=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,H.blob,{contentType:H.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(ce.error)throw ce.error;let X={company_id:e.getActiveCompanyId(),part_id:W,uploaded_by:e.getSession().user.id,storage_path:re,file_name:Z,content_type:H.contentType,document_type:V,file_size_bytes:H.blob.size||null,original_file_name:e.safeFileName(L.name||"part-file"),original_size_bytes:L.size||null},{error:J}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(X),"Part file record save timed out. Check your connection and try again.",15e3);if(J&&e.isColumnSchemaError(J,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete X.document_type,delete X.file_size_bytes,delete X.original_file_name,delete X.original_size_bytes,J=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(X),"Part file record retry timed out. Check your connection and try again.",15e3)).error),J)throw await b("part-documents",re),e.isColumnSchemaError(J,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?J.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(ce){await q("part document",L,ce),R&&(R.textContent=ce.message||"Could not attach file.")}finally{S&&(S.disabled=!1,S.textContent="Attach File")}}async function o(w){w.preventDefault();let A=w.currentTarget,W=A.dataset.assetDocument,R=n.querySelector(`[data-asset-document-error="${W}"]`),S=A.querySelector("button[type='submit']"),N=new t(A),L=N.get("document"),V=p(N.get("document_type"));if(R&&(R.textContent=""),!e.getAssetDocumentsReady?.()){R&&(R.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!L||!L.name){R&&(R.textContent="Choose a machine file first.");return}if(k(L)){R&&(R.textContent=E()),await q("equipment file",L,E());return}S&&(S.disabled=!0,S.textContent="Uploading...");let H=await O(L),Z=`${e.getActiveCompanyId()}/${W}/${a.randomUUID()}-${H.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(Z,H.blob,{contentType:H.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:ce}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:W,uploaded_by:e.getSession().user.id,storage_path:Z,file_name:H.fileName,content_type:H.contentType,document_type:V,file_size_bytes:H.blob.size||null,original_file_name:e.safeFileName(L.name||"machine-photo"),original_size_bytes:L.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(ce)throw await b("asset-documents",Z),e.isColumnSchemaError(ce,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?ce.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await q("equipment file",L,re),R&&(R.textContent=re.message||"Could not upload machine file.")}finally{S&&(S.disabled=!1,S.textContent="Attach Machine File")}}async function d(w,A){let W=n.querySelector("[data-asset-document-error]");if(W&&(W.textContent=""),!w||!A){let R="Missing machine file record. Refresh and try again.";W?W.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([A]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(S)throw S;e.showNotice("Machine file deleted."),await e.render()}catch(R){W?W.textContent=R.message||"Could not delete machine file.":e.showNotice(R.message||"Could not delete machine file.","warning")}}async function g(w,A){let W=n.querySelector("#photo-error");if(W&&(W.textContent=""),!w||!A){let R="Missing photo record. Refresh and try again.";W?W.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([A]),"Photo delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(S)throw S;let N=A.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${N}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(R){W?W.textContent=R.message||"Could not delete photo.":e.showNotice(R.message||"Could not delete photo.","warning")}}function p(w){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(w)?w:"other"}function h(w){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(w)?w:"other"}async function y(w){w.preventDefault();let A=w.currentTarget,W=A.querySelector("button[type='submit']"),R=n.querySelector("#photo-error");R&&(R.textContent="");let S=new t(A).get("photo");if(!S||!S.name){R&&(R.textContent="Choose a photo first.");return}let N=I(S);if(N){R&&(R.textContent=N),await q("work order photo",S,N);return}W.disabled=!0,W.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let V=await v(e.getActiveWorkOrderId(),S);if(V)throw V;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${S.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(L){await q("work order photo",S,L),R&&(R.textContent=`Could not upload photo: ${L.message||L}`)}finally{W.disabled=!1,W.textContent="Upload Photo"}}async function b(w,A){try{let{error:W}=await e.withOperationTimeout(e.supabaseClient().storage.from(w).remove([A]),"Uploaded file cleanup timed out.",1e4);W&&s.warn(`Could not remove uploaded ${w} object`,W)}catch(W){s.warn(`Could not remove uploaded ${w} object`,W)}}async function v(w,A){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let R=I(A);if(R)return await q("work order photo",A,R),new Error(R);let S=await O(A,C()),N=M(S);if(N)return await q("work order photo",A,N),new Error(N);let L=`${e.getActiveCompanyId()}/${w}/${a.randomUUID()}-${S.fileName}`,V=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(L,S.blob,{contentType:S.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(V.error)return await q("work order photo",A,V.error),V.error;let H={company_id:e.getActiveCompanyId(),work_order_id:w,uploaded_by:e.getSession().user.id,storage_path:L,file_name:S.fileName,content_type:S.contentType,file_size_bytes:S.blob.size||null,original_file_name:e.safeFileName(A.name||"photo"),original_size_bytes:A.size||null},{error:Z}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(H),"Photo record save timed out. Check your connection and try again.",15e3);return Z&&e.isColumnSchemaError(Z,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete H.file_size_bytes,delete H.original_file_name,delete H.original_size_bytes,Z=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(H),"Photo record retry timed out. Check your connection and try again.",15e3)).error),Z&&await b("work-order-photos",L),Z&&await q("work order photo",A,Z),Z||null}async function _(w,A){if(!w)return new Error("Request was not saved before photo upload.");let W=I(A);if(W)return await q("request photo",A,W),new Error(W);let R=await O(A,C()),S=M(R);if(S)return await q("request photo",A,S),new Error(S);let N=`${w}/${a.randomUUID()}-${R.fileName}`,L=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(N,R.blob,{contentType:R.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(L.error)return await q("request photo",A,L.error),L.error;let{error:V}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:w,p_photo_storage_path:N,p_photo_file_name:R.fileName,p_photo_content_type:R.contentType,p_photo_file_size_bytes:R.blob.size||null,p_photo_original_file_name:e.safeFileName(A.name||"photo"),p_photo_original_size_bytes:A.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return V&&(await b("maintenance-request-photos",N),await q("request photo",A,V)),V||null}async function q(w,A,W){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let R=String(W?.message||W||"Upload failed").slice(0,500),S=e.safeFileName(A?.name||"unknown-file"),N=P(A),L=Number(A?.size||0),V=[w,S,N,L,R].join("|");if(!u.has(V)){u.add(V);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||w||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${w}`.slice(0,140),details:[`Upload context: ${w}`,`File: ${S}`,`Type: ${N}`,`Size: ${L}`,`Error: ${R}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(H){s.warn("Could not report upload failure",H)}}}function C(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function O(w,A={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(w,A);let W=["image/jpeg","image/png","image/webp","image/heic","image/heif"],R=P(w);if(!W.includes(R)&&!(A.acceptAnyImage&&R.startsWith("image/")))return{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:R};try{if(!m)throw new Error("Browser image optimization is unavailable.");let S=await m(w),N=Number(A.targetBytes||0)||1*1024*1024,L=A.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],V=null;for(let H of L){let Z=await x(S,H.maxDimension,H.quality);if(V=Z,Z.size<=N)break}if(S.close&&S.close(),!V)throw new Error("Browser could not optimize this image.");return{blob:V,fileName:`${e.fileBaseName(w.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(S){return s.warn("Photo optimization failed; uploading original.",S),{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:R}}}function $(w){return["image/jpeg","image/png","image/webp"].includes(P(w))}function k(w){return!$(w)&&Number(w.size||0)>r}function E(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function P(w){let A=String(w?.type||"").trim().toLowerCase();if(A)return A;let W=String(w?.name||"").toLowerCase();return/\.(jpe?g)$/.test(W)?"image/jpeg":/\.png$/.test(W)?"image/png":/\.webp$/.test(W)?"image/webp":/\.gif$/.test(W)?"image/gif":/\.heic$/.test(W)?"image/heic":/\.heif$/.test(W)?"image/heif":/\.pdf$/.test(W)?"application/pdf":/\.txt$/.test(W)?"text/plain":/\.csv$/.test(W)?"text/csv":/\.doc$/.test(W)?"application/msword":/\.docx$/.test(W)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(W)?"application/vnd.ms-excel":/\.xlsx$/.test(W)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function I(w){let A=P(w);return c.has(A)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function M(w){return c.has(String(w?.contentType||"").toLowerCase())?Number(w?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function x(w,A,W){let R=Math.min(1,A/Math.max(w.width,w.height)),S=Math.max(1,Math.round(w.width*R)),N=Math.max(1,Math.round(w.height*R)),L=n.createElement("canvas");L.width=S,L.height=N,L.getContext("2d",{alpha:!1}).drawImage(w,0,0,S,N);let H=await new Promise(Z=>L.toBlob(Z,"image/jpeg",W));if(!H)throw new Error("Browser could not optimize this image.");return H}return{addPhotoToMaintenanceRequest:_,addPhotoToWorkOrder:v,optimizePhoto:O,removeUploadedObject:b,reportUploadFailure:q,deleteAssetDocument:d,deleteWorkOrderPhoto:g,uploadAssetDocument:o,uploadPartDocument:f,uploadPhoto:y}}typeof We<"u"&&We.exports&&(We.exports={createMediaStorageWorkflow:l}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:l}})()});var an=U((wr,xe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,s=e.URLRef||URL,m=e.consoleRef||console,r=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function u(p){p.preventDefault();let h=p.currentTarget,y=n.querySelector("#company-logo-error"),b=h.querySelector("button[type='submit']"),v=new t(h).get("logo");if(y&&(y.textContent=""),!v||!v.name){y&&(y.textContent="Choose a logo image first.");return}b&&(b.disabled=!0,b.textContent="Uploading...");try{let _=d(v);if(_)throw new Error(_);let q=await f(v),C=g(q);if(C)throw new Error(C);let O=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${q.fileName}`,$=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(O,q.blob,{contentType:q.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if($.error)throw new Error($.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":$.error.message);let{error:k}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:O}),"Company logo record save timed out. Check your connection and try again.",15e3);if(k)throw await e.removeUploadedObject("company-logos",O),new Error(e.isColumnSchemaError(k,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":k.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":k.message);let E=e.getCompanies().find(P=>P.id===e.getActiveCompanyId());E&&(E.logo_path=O,E.logoUrl=s.createObjectURL(q.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(_){y&&(y.textContent=_.message||"Could not upload logo.")}finally{b&&(b.disabled=!1,b.textContent="Upload Logo")}}async function f(p){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(p);let h=o(p);try{if(!r)throw new Error("Browser logo optimization is unavailable.");let y=await r(p),v=Math.min(1,1200/Math.max(y.width,y.height)),_=Math.max(1,Math.round(y.width*v)),q=Math.max(1,Math.round(y.height*v)),C=n.createElement("canvas");C.width=_,C.height=q;let O=C.getContext("2d",{alpha:!0});O.clearRect(0,0,_,q),O.drawImage(y,0,0,_,q),y.close&&y.close();let $=await new Promise(k=>C.toBlob(k,"image/png"));if(!$)throw new Error("Browser could not optimize this logo.");return{blob:$,fileName:`${e.fileBaseName(p.name||"logo")}.png`,contentType:"image/png"}}catch(y){return m.warn("Logo optimization failed; uploading original.",y),{blob:p,fileName:e.safeFileName(p.name||"logo"),contentType:h}}}function o(p){let h=String(p?.type||"").trim().toLowerCase();if(h)return h;let y=String(p?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function d(p){let h=o(p);return c.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(p){return c.has(String(p?.contentType||"").toLowerCase())?Number(p?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:u}}typeof xe<"u"&&xe.exports&&(xe.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var on=U((vr,nt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,a=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function m(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(o=>o.id===i))return;let u=s(i);if(u){a(u);return}let f=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||f){r(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function r(i){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let c=e.getParts().find(d=>d.id===i),u=n.querySelector("#part-delete-error");if(u&&(u.textContent=""),!c)return;let f=s(i);if(f){u&&(u.textContent=f);return}let o=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let d=(e.getPartDocumentsByPartId()[i]||[]).map(y=>y.storage_path).filter(Boolean);if(d.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(d),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:p}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(p)throw new Error(p.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":p.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(d){e.showNotice(d.message||"Could not delete part.","warning"),u&&(u.textContent=d.message||"Could not delete part."),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}return{deletePart:r,requestDeletePart:m}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof nt<"u"&&(nt.exports={createPartDeleteWorkflow:l})})()});var sn=U((kr,rt)=>{(function(){function l(e={}){function n(a){if(!a.isConnected)return;let s=e.getWorkOrders().find(g=>g.id===a.dataset.workOrderId),m=e.getProcedureTemplates().find(g=>g.id===s?.procedure_template_id);if(!m)return;let r=e.checklistProgress(s,m),i=e.requiredChecklistProgress(s,m),c=a.closest(".detail-stack"),u=c?.querySelector("[data-checklist-summary]"),f=c?.querySelector(".relationship-chip.procedure > span");u&&(u.textContent=`${r.done} of ${r.total} complete - required ${i.done}/${i.total}`),f&&(f.textContent=`${r.done}/${r.total}`);let o=a.closest(".checklist-step")?.querySelector("[data-checklist-recorded]"),d=e.getStepResultsByWorkOrder()[s.id]?.[a.dataset.stepResult];o&&(o.textContent=d?.completed_at?`Recorded ${new Date(d.completed_at).toLocaleString()}`:"")}async function t(a){let s=a.target,m=s.type==="checkbox"?s.checked?"checked":"":s.value;s.disabled=!0;try{let{error:r}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:s.dataset.workOrderId,procedure_step_id:s.dataset.stepResult,completed_by:m?e.getSession().user.id:null,value:m,completed_at:m?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(r)throw r;await e.withOperationTimeout(e.recordWorkOrderEvent(s.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let i=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(c=>c);if(i){e.showNotice(`Checklist saved, but refresh did not finish: ${i.message||i}`,"warning"),s.disabled=!1;return}if(e.getWorkOrderActionWarningId()===s.dataset.workOrderId){let c=e.getWorkOrders().find(u=>u.id===s.dataset.workOrderId);e.blocksProcedureCompletion(c)||e.setWorkOrderActionWarning("","")}s.disabled=!1,n(s)}catch(r){e.showNotice(`Could not save checklist step: ${r.message||r}`,"warning"),s.disabled=!1}}return{saveStepResult:t}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:l},typeof rt<"u"&&(rt.exports={createProcedureChecklistWorkflow:l})})()});var cn=U((_r,at)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function s(u,f){let{data:o,error:d}=await e.withOperationTimeout(e.getPublicRequestIntake(u),f);return{data:Array.isArray(o)?o[0]:o,error:d}}async function m(u){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:d,error:g}=await s(u,"Request QR lookup timed out.");if(f=d,g||!f){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let o=e.publicRequestUrl(u);e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function r(u){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:o,error:d}=await s(u,"Request form lookup timed out.");if(d){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=o}catch(o){i(o.message||"This request link could not be loaded.");return}if(!f){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),n.querySelector("#public-request-form").addEventListener("submit",o=>c(o,u,f))}function i(u){e.setAppHtml(e.publicRequestError(u))}async function c(u,f,o){u.preventDefault();let d=u.currentTarget,g=new a(d),p=n.querySelector("#public-request-error"),h=d.querySelector("button[type='submit']");p&&(p.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:b}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(b)throw b;let v=g.get("photo"),_="";if(v&&v.name){let C=await e.addPhotoToMaintenanceRequest(y,v);C&&(_=`Request sent, but the photo did not upload: ${C.message||C}`)}let q=await e.notifyRequestEmailer(y);q.error&&e.warn("Request email notification did not send",q.error),e.setAppHtml(e.publicRequestSuccess(o,_)),n.querySelector("#public-request-another").addEventListener("click",()=>r(f))}catch(y){p&&(p.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:r,renderPublicRequestQrPage:m,submitPublicRequest:c}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof at<"u"&&(at.exports={createPublicRequestIntakeWorkflow:l})})()});var ln=U((qr,ot)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(m){m.preventDefault();let r=m.target,i=r.querySelector("button[type='submit']"),c=n.querySelector("#company-error"),u=String(new t(r).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",c.textContent="";try{if(!u)throw new Error("Company name is required.");let f=e.getCompanies().find(p=>p.name.trim().toLowerCase()===u.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:o,error:d}=await e.withOperationTimeout(e.createCompanyRecord(u),"Company creation timed out.");if(d){c.textContent=d.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":d.message;return}if(e.setActiveCompanyId(o),e.persistActiveCompanyId(o),!await e.ensureProfileForActiveCompany(u))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){c.textContent=f.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof ot<"u"&&(ot.exports={createCompanySetupWorkflow:l})})()});var un=U((Sr,it)=>{(function(){function l(e={}){async function n(a){let s=e.getWorkOrders().find(m=>m.id===e.getActiveWorkOrderId());a.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),a.target.value)||(a.target.value=s?.status||"open")}catch(m){a.target.value=s?.status||"open",e.showNotice(`Could not update status: ${m.message||m}`,"warning")}finally{a.target.disabled=!1}}async function t(a,s){let m=e.getWorkOrders().find(f=>f.id===a);if(s==="completed"){let f=e.productionActionCompletionMessage?.(m)||"";if(f)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,f),e.showNotice(f,"warning"),await e.render(),!1;let o=e.blocksProcedureCompletion(m);if(o)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,o),e.showNotice(o,"warning"),await e.render(),!1}let r=e.currentSafetyCheckboxCheckedForWorkOrder(a),i=e.hasCompletedSafetyDeviceCheck(m)||r;if(s==="completed"&&e.requiresSafetyDeviceCheck(m)&&!i){e.setActiveWorkOrderId(a);let f="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(a,f),e.showNotice(f,"warning"),await e.render(),!1}let c={status:s,asset_id:m?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(c),s==="completed"?e.applySafetyCheckPayload(c,c.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(c,!1),delete c.asset_id;let{error:u}=await e.withOperationTimeout(e.updateWorkOrderSafely(c,a),"Status save timed out. Check your connection and try again.",15e3);return u?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(u)}`,"warning"),!1):(e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(a,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof it<"u"&&(it.exports={createWorkOrderStatusWorkflow:l})})()});var dn=U((Cr,Me)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function a(c,u){return c?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${u}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${u}"]`)||null}async function s({workOrderId:c,payload:u,source:f,busyText:o,successMessage:d}){let g=f?.querySelector?.("button[type='submit']")||f,p=g?.textContent||"",h=a(f,c);g&&(g.disabled=!0,g.textContent=o),h&&(h.textContent="");try{let y=await e.withOperationTimeout(e.updateProductionActionRecord(c,u),"Production Action save timed out. Check your connection and try again.",15e3);if(y.error){let b=e.friendlyWorkOrderSaveError(y.error);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}return e.showNotice(d,"success"),await e.afterProductionActionMutation(y.data,c),!0}catch(y){let b=y.message||String(y);return h?h.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=p)}}async function m(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.productionActionForm,o=new n(u),d=String(o.get("production_action")||"").trim(),g=String(o.get("production_action_assigned_to")||"").trim(),p=a(u,f);if(!d||!g){p&&(p.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(f);await s({workOrderId:f,payload:{production_action:d,production_action_assigned_to:g},source:u,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function r(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.workOrderId,o=u.dataset.productionActionStatus;await s({workOrderId:f,payload:{production_action_status:o},source:u,busyText:o==="completed"?"Completing...":"Reopening...",successMessage:o==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,f=u.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:f,payload:{production_action:null},source:u,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:m,setProductionActionStatus:r,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof Me<"u"&&Me.exports&&(Me.exports={createProductionActionWorkflow:l})})()});var pn=U(($r,st)=>{(function(){function l(e={}){async function n(s,m={}){let r=s.filter(f=>f.id&&!f.read_at);if(!r.length)return!0;let i=new Map(r.map(f=>[f.id,f])),c=new Date().toISOString(),u=r.map(f=>f.id);e.setNotifications(e.getNotifications().map(f=>i.has(f.id)?{...f,read_at:c}:f)),m.render!==!1&&e.renderWorkspace();try{let f=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,u,c),"Work notification update timed out.",1e4);if(f.error)throw f.error;return!0}catch(f){return e.setNotifications(e.getNotifications().map(o=>i.get(o.id)||o)),e.showNotice(`Could not mark the work notification read: ${f.message||f}`,"warning"),m.render!==!1&&e.renderWorkspace(),!1}}function t(s,m={}){let r=e.getNotifications().find(i=>i.id===s);return r?.read_at?Promise.resolve(!0):n([r||{id:s,read_at:null}],m)}function a(s,m={}){return n(e.getNotifications().filter(r=>r.work_order_id===s),m)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:a}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:l},typeof st<"u"&&(st.exports={createWorkOrderNotificationWorkflow:l})})()});var mn=U((Pr,ct)=>{(function(){function l(e){async function n(t,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(m=>m.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let m=e.workOrderDateValue(a);if(!m)throw new Error("Choose a due date.");let r=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:m},t),"Due date save timed out. Check your connection and try again.");if(r.error)throw r.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:m}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:m}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${m} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:m}}catch(m){return e.showNotice(`Could not set due date: ${m.message||m}`,"warning"),{saved:!1,reason:"save_failed",error:m}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof ct<"u"&&(ct.exports={createPlanningDueDateWorkflow:l})})()});var fn=U((Ar,lt)=>{(function(){function l(n,t,a,s=50){let m=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",a).order("created_at",{ascending:!1}).limit(m)}function e(n,t,a,s){let m=[...new Set((a||[]).filter(Boolean))];return m.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",m).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e},typeof lt<"u"&&(lt.exports={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e})})()});var gn=U((Er,ut)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:a||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof ut<"u"&&(ut.exports={notifyRequestEmailer:l})})()});var hn=U((Rr,dt)=>{(function(){async function l(n,t,a=[],s={}){let m=s.pathKey||"storage_path",r=s.urlKey||"signedUrl",i=s.expiresIn||600,c=s.onError;await Promise.all(a.map(async u=>{let f=u?.[m];if(!f)return;let{data:o,error:d}=await n.storage.from(t).createSignedUrl(f,i);if(d){u[r]="",typeof c=="function"&&c(u,d);return}u[r]=o?.signedUrl||""}))}function e(n={}){function t(a){if(!a||!n.getReady())return;let m=(n.getRows(a)||[]).filter(i=>i.storage_path&&!i.signedUrl),r=n.getSigningMap();!m.length||r[a]||(r[a]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,m),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete r[a],n.getActiveGroupId()===a&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof dt<"u"&&(dt.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var yn=U((Or,pt)=>{(function(){function l(t,a){if(t[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return t[a]}function e(t={}){let a=l(t,"supabaseClient"),s=l(t,"workspaceUiState"),m=l(t,"applyRequestQueryFilters"),r=l(t,"applyWorkOrderListFilters"),i=l(t,"applyWorkOrderFilters"),c=l(t,"selectWorkOrders"),u=l(t,"countWorkOrdersQuery"),f=l(t,"fetchExactSearchedWorkOrderPage"),o=l(t,"isColumnSchemaError"),d=t.warn||(()=>{}),g=l(t,"LIST_ITEMS_PER_PAGE"),p=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),y=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),b=l(t,"REQUEST_FALLBACK_SELECT"),v=l(t,"WORK_ORDER_RELATION_SELECT"),_=l(t,"WORK_ORDER_FALLBACK_SELECT");function q(){return typeof a=="function"?a():a}async function C(M=s.getRequestViewFilter(),x={}){let w=Math.max(1,s.getRequestsPage()),A=(w-1)*g,W=A+g-1,R=x.includeRelations===!1?b:x.includeLocationRelation===!1?y:h,S=await m(q().from("maintenance_requests").select(R,{count:"exact"}),M).order("created_at",{ascending:!1}).range(A,W);return S.error&&x.includeLocationRelation!==!1&&o(S.error,["location_id","locations"])?C(M,{includeLocationRelation:!1}):S.error&&x.includeRelations!==!1?C(M,{includeRelations:!1}):!S.error&&S.count&&w>1&&A>=S.count?(s.setRequestsPage(Math.max(1,Math.ceil(S.count/g))),C(M,x)):S}async function O(M){let x=await m(q().from("maintenance_requests").select("id",{count:"exact",head:!0}),M);return x.error?(d("Request count failed",x.error),0):x.count||0}async function $(){let[M,x,w]=await Promise.all([O("active"),O("converted"),O("all")]);return{active:M,converted:x,all:w}}async function k(M={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return f(M);let x=Math.max(1,s.getWorkOrderPage()),w=(x-1)*p,A=w+p-1,W=M.includeLocationRelation===!1?_:v,R=await r(c(q(),W,{count:"exact"})).range(w,A);return!R.error&&R.count&&x>1&&w>=R.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(R.count/p))),k(M)):R}async function E(M={}){let x=await i(u(q()),M);return x.error?(d("Work order count failed",x.error),0):x.count||0}async function P(){let[M,x,w,A,W,R,S,N]=await Promise.all([E({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),E({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:M,newWork:x,inProgress:w,blocked:A,overdue:W,completedAll:R,completedMonth:S,completedWeek:N}}async function I(){let[M,x,w,A,W,R,S,N]=await Promise.all([E({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),E({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:M,newWork:x,inProgress:w,blocked:A,overdue:W,completedAll:R,completedMonth:S,completedWeek:N}}return{fetchRequestPage:C,countRequests:O,loadRequestDashboardCounts:$,fetchWorkOrderPage:k,countWorkOrders:E,loadWorkOrderDashboardCounts:P,loadMyWorkDashboardCounts:I}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof pt<"u"&&(pt.exports=n)})()});var bn=U((Wr,mt)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,a=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function m(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function r(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){c("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let p=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;p=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;p=h?.session||null}if(!p){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;p=h?.session||null}if(!p)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(p),r(),c("Verification complete. Loading workspace..."),await e.render()}catch(p){r(),u(p.message||"This verification link is invalid or expired.")}}function c(g){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(g)}function u(g){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(g=e.passwordRecoveryParamsFromUrl()){let p=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:b}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});p=!!(y?.session&&!b),b&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";d({ready:p,initialError:h})}function o(g="",p=""){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(g,p),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,b=y.querySelector("button[type='submit']"),v=t.querySelector("#auth-error"),_=t.querySelector("#auth-status"),q=String(new FormData(y).get("email")||"").trim();v.textContent="",_.textContent="Sending reset link...",b.disabled=!0,b.textContent="Sending...";try{let{error:C}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(q,{redirectTo:m()}),"Password reset email timed out. Check your connection and try again.",2e4);if(C){_.textContent="",v.textContent=C.message;return}_.textContent="If that email exists in Supabase, a reset link has been sent."}catch(C){_.textContent="",v.textContent=C.message||"Could not send reset link."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Send Reset Link")}})}function d({ready:g=!1,initialError:p=""}={}){t.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:g,initialError:p}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{r(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{r(),o()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,b=y.querySelector("button[type='submit']"),v=new FormData(y),_=String(v.get("password")||""),q=String(v.get("confirmPassword")||""),C=t.querySelector("#auth-error"),O=t.querySelector("#auth-status");if(C.textContent="",_.length<8){C.textContent="Password must be at least 8 characters.";return}if(_!==q){C.textContent="Passwords do not match.";return}O.textContent="Updating password...",b.disabled=!0,b.textContent="Updating...";try{let{error:$}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:_}),"Password update timed out. Try the newest reset link again.",2e4);if($){O.textContent="",C.textContent=$.message;return}r();let{data:k}=await e.supabaseClient.auth.getSession();if(e.setSession(k.session),O.textContent=k.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",k.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch($){O.textContent="",C.textContent=$.message||"Could not update password."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:m,clearPasswordRecoveryUrl:r,startAuthCallback:i,renderAuthCallback:c,renderAuthCallbackError:u,startPasswordRecovery:f,renderPasswordResetRequest:o,renderPasswordRecovery:d}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof mt<"u"&&(mt.exports={createAuthSessionFlow:l})})()});var wn=U((xr,De)=>{(function(){function l(m,r){let i=r.getProfilesByUserId();if(m.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${r.escapeHtml(i[m.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(m.created_at).toLocaleString()}</span>
        <p>${r.escapeHtml(m.body)}</p>
      </article>
    `;if(m.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${r.photoMetaText(m)} &middot; ${r.escapeHtml(i[m.uploaded_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(m.file_name)}</p>
        ${m.signedUrl?`<a href="${r.escapeHtml(m.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(m.type==="part"){let u=r.partUsageUnitCost(m)*(Number(m.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(m.created_at).toLocaleString()} &middot; ${r.escapeHtml(i[m.created_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(m.parts?.name||"Part")} - ${Number(m.quantity_used)||0} used - ${r.money(u)}</p>
      </article>
    `}return`
    <article>
      <strong>${r.escapeHtml(m.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(m.created_at).toLocaleString()} \xC2\xB7 ${r.escapeHtml(i[m.actor_id]?.full_name||"Team member")}</span>
      <p>${r.escapeHtml(m.summary)}</p>
    </article>
  `}function e(m,r){let i=r.getProcedureTemplates(),c=r.getPartsUsedByWorkOrder(),u=r.getCommentsByWorkOrder(),f=r.getPhotosByWorkOrder(),o=r.getMessageThreads(),d=i.find(_=>_.id===m.procedure_template_id),g=d?r.checklistProgress(m,d):null,p=(c[m.id]||[]).length,h=(u[m.id]||[]).length,y=(f[m.id]||[]).length,b=o.filter(_=>_.work_order_id===m.id).length,v=[];return m.asset_id&&v.push(n("asset","Equipment",m.assets?.name||"Linked",r)),d&&g&&v.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,r)),p&&v.push(n("parts","Parts",String(p),r)),h&&v.push(n("comment","Comments",String(h),r)),b&&v.push(n("message","Messages",String(b),r)),y&&v.push(t(m.id,String(y),r)),v.length?`<div class="relationship-row">${v.join("")}</div>`:""}function n(m,r,i,c){return`
    <span class="relationship-chip ${m}" title="${c.escapeHtml(r)}">
      ${a(m)}
      <span>${c.escapeHtml(i)}</span>
    </span>
  `}function t(m,r,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(m)}" title="Open photos">
      ${a("photo")}
      <span>${i.escapeHtml(r)}</span>
    </button>
  `}function a(m){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[m]||""}function s(m){return Object.freeze({renderActivityItem:r=>l(r,m),renderRelationshipChips:r=>e(r,m),relationshipChip:(r,i,c)=>n(r,i,c,m),photoJumpChip:(r,i)=>t(r,i,m),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof De<"u"&&De.exports&&(De.exports={createRelationshipDisplayHelpers:s})})()});var vn=U((Mr,ft)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,a=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,m=e.isConvertedRequest,r=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),c=e.getPendingDeleteRequestId,u=e.getProfilesByUserId;function f(p,h){return p==="converted"?`${h} converted`:p==="all"?`${h} total`:`${h} active`}function o(p,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",p.active],["converted","Converted",p.converted],["all","All",p.all]].map(([v,_,q])=>`
            <button class="segment ${h===v?"active":""}" data-request-filter="${v}" type="button" ${y.locked&&v!=="active"?"disabled":""}>
              ${n(v==="active"?"open":v==="converted"?"completed":"all")}${_} <span>${q}</span>
            </button>
          `).join("")}
        </div>
      `}function d(p){let h=m(p),y=i(),b=c()===p.id,v=u(),_=p.created_at?new Date(p.created_at):null,q=_&&!Number.isNaN(_.getTime())?_.toLocaleString():"date unavailable",C=p.assets?.name||p.locations?.name||"No equipment",O=p.requested_by_name||v[p.requested_by]?.full_name||"Requester",$=p.converted_by||p.reviewed_by||"",k=v[$]?.full_name||"",E=k?`Converted to work order by ${k}`:$?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",P=y&&r()?b?`
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
              <span><strong>Machine / area</strong>${t(C)}</span>
              <span><strong>Requester</strong>${t(O)}</span>
              <span><strong>Received</strong>${t(q)}</span>
            </div>
          </div>
          ${y&&!h&&p.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${p.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${p.id}" type="button">Convert to Work Order</button>
              ${P}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(E)}</span>
              ${P}
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:o,renderMaintenanceRequest:d,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createRequestDisplayHelpers:l})})()});var kn=U((Dr,gt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=W=>String(W||"corrective").replace(/\b\w/g,R=>R.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:s,getWorkOrderTypeFilter:m=()=>"all",getWorkOrderPriorityFilter:r=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:c=()=>"none",getActiveStatusFilter:u,getMyWorkFilter:f,getActiveSection:o,getDueState:d,getProcedureTemplates:g,getActiveWorkOrderId:p,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:b,TYPE_OPTIONS:v=[],OUTSIDE_VENDOR_VALUE:_,escapeHtml:q,cleanWorkOrderDescription:C,relationshipIcon:O,segmentIcon:$,isVendorAssigned:k,assignmentLabel:E,renderRelationshipChips:P,canAssignWorkOrderToMe:I,canManageTeam:M,renderProductionActionCard:x=()=>"",hasOpenProductionAction:w=()=>!1,hasUnreadProductionReady:A=()=>!1}){function W(){let T=a(),B=s(),z=u(),Y=T?`${t(T)} Work`:B==="unassigned"?"Unassigned Work Orders":B==="vendor"?"Outside Vendor Work":B==="assigned"?"Assigned Work Orders":"Work Orders";return z==="active"||z==="all"?Y==="Work Orders"?"Active Work Orders":`Active - ${Y}`:`${e(z)} - ${Y}`}function R(){let T=u();return T==="active"||T==="all"?"My Work":`${e(T)} - My Work`}function S(){return o()==="mywork"?R():W()}function N(T){let B=o(),z=f();return B==="mywork"?`${T} shown - ${B==="mywork"?z==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${T} shown`}function L(T,B,z){return`<option value="${q(T)}" ${T===z?"selected":""}>${q(B)}</option>`}function V(T){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[T]||"Any assignment"}function H(T){return T?T.charAt(0).toUpperCase()+T.slice(1):""}function Z(T=[]){let B=u(),z=B==="all"?"active":B,Y=s(),K=a(),te=m(),G=r(),ae=i(),ee=c(),de=["completed","completed_month","completed_week"].includes(B),oe=z==="active"&&Y==="all"&&!K&&te==="all"&&G==="all"&&ae==="newest"&&ee==="none",F=T.find(ie=>ie.userId===K),se=[`Status: ${e(z)}`,`Assignment: ${V(Y)}`,...F?[`Person: ${F.name}`]:[],...te!=="all"?[`Type: ${n(te)}`]:[],...G!=="all"?[`Priority: ${H(G)}`]:[]],fe=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ye=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],pe=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],we=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${se.map(ie=>`<li><span>${q(ie)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${oe?"disabled":""}>Clear filters</button>
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
                  ${T.map(ie=>L(ie.userId,ie.name,K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${te!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${L("all","Any type",te)}
                  ${v.map(ie=>L(ie,n(ie),te)).join("")}
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
                <select data-work-sort-filter aria-label="Sort work orders" ${de?"disabled":""}>
                  ${de?L("completed","Recently completed","completed"):pe.map(([ie,ge])=>L(ie,ge,ae)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${we.map(([ie,ge])=>L(ie,ge,ee)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function re(T,B){if(B==="assignee"){if(k(T))return{key:"vendor",label:"Outside vendor",order:900};if(!T.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let K=E(T);return{key:`assignee:${T.assigned_to}`,label:K,order:100}}if(B==="status"){let K=["open","in_progress","blocked","completed"].indexOf(T.status);return{key:`status:${T.status}`,label:e(T.status),order:K<0?99:K}}if(B==="priority"){let K=["critical","high","medium","low"].indexOf(T.priority);return{key:`priority:${T.priority}`,label:H(T.priority||"Unspecified"),order:K<0?99:K}}let z=T.type||"corrective",Y=v.indexOf(z);return{key:`type:${z}`,label:n(z),order:Y<0?99:Y}}function ce(T,B={}){if(!T.length)return'<p class="muted">No work orders match these filters.</p>';let z=B.groupBy||"none";if(z==="none")return`<div class="work-list" id="work-order-list">${T.map(X).join("")}</div>`;let Y=new Map;return T.forEach(te=>{let G=re(te,z);Y.has(G.key)||Y.set(G.key,{...G,workOrders:[]}),Y.get(G.key).workOrders.push(te)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...Y.values()].sort((te,G)=>te.order-G.order||te.label.localeCompare(G.label)).map(te=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${q(te.label)}</h3>
                <span>${te.workOrders.length}</span>
              </div>
              <div class="work-list">${te.workOrders.map(X).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function X(T){let B=d(T),z=g().find(ee=>ee.id===T.procedure_template_id),Y=T.created_at?new Date(T.created_at):null,K=Y&&!Number.isNaN(Y.getTime())?Y.toLocaleDateString():"",te=T.status==="completed",G=te?"Completed":e(T.status),ae=ee=>ee==="completed"?"Complete":e(ee);return`
        <article class="work-card status-card status-${T.status} ${T.id===p()?"selected":""}" data-id="${T.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${T.priority}">${T.priority}</span>
              <span class="chip">${q(n(T.type))}</span>
              <span class="chip ${T.status}">${G}</span>
              ${B?`<span class="chip ${B.className}">${B.label}</span>`:""}
              ${A(T.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${q(T.title)}</h3>
            <p>${q(C(T.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${O("asset")}${q(T.assets?.name||"General item / area")}</span>
            <span>${$(k(T)?"vendor":"mine")}${q(E(T))}</span>
            ${z?`<span>${O("procedure")}${q(z.name)}</span>`:""}
            <span>${$("due")}Due ${T.due_at||"unset"}</span>
            ${K?`<span>${$("created")}Created ${q(K)}</span>`:""}
            ${T.completed_at?`<span>${$("completed")}Completed ${new Date(T.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${P(T)}
          ${x(T)}
          <div class="quick-actions work-card-actions">
            ${!te&&I(T)?`<button class="assign-action" data-assign-me="${T.id}" type="button">Assign to me</button>`:""}
            ${!te&&M()?J(T):""}
          ${b.filter(ee=>ee!==T.status&&!(ee==="completed"&&w(T))).slice(0,3).map(ee=>`
            <button data-quick-status="${ee}" data-id="${T.id}" type="button">${ae(ee)}</button>
          `).join("")}
        </div>
      </article>
    `}function J(T){return`
        <form class="card-assign-form" data-card-assign="${T.id}">
          <select name="assigned_to" aria-label="Assign ${q(T.title)}">
            <option value="">Unassigned</option>
            <option value="${_}" ${k(T)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([B,z])=>`<option value="${B}" ${!k(T)&&B===T.assigned_to?"selected":""}>${q(z.full_name||t(B))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function j(T="",B={}){let z=T||"",Y=B.managerOptions??M(),K=B.allowUnassigned!==!1,te=B.selfLabel||"Assign to me",G=[];return K&&G.push(`<option value="" ${z===""?"selected":""}>Unassigned</option>`),G.push(`<option value="${y().user.id}" ${z===y().user.id?"selected":""}>${te}</option>`),Y&&(G.push(`<option value="${_}" ${z===_?"selected":""}>Outside vendor</option>`),G.push(...Object.entries(h()).filter(([ae])=>ae!==y().user.id).map(([ae,ee])=>`<option value="${ae}" ${z===ae?"selected":""}>${q(ee.full_name||t(ae))}</option>`))),G.join("")}function me(T){return k(T)?_:T?.assigned_to||""}function he(T,B=""){let z=me(T);return T?.status==="completed"?`
          <label ${B?`id="${B}"`:""}>Completed by / assigned to
            <input value="${q(E(T))}" disabled>
            <input name="assigned_to" type="hidden" value="${q(z)}">
          </label>
        `:M()?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${j(z,{managerOptions:!0})}
            </select>
          </label>
        `:!T.assigned_to&&!k(T)?`
          <label ${B?`id="${B}"`:""}>Assign to
            <select name="assigned_to">
              ${j("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${B?`id="${B}"`:""}>Assigned to
          <input value="${q(E(T))}" disabled>
          <input name="assigned_to" type="hidden" value="${q(z)}">
        </label>
      `}return{workOrdersPanelTitle:W,myWorkPanelTitle:R,workQueuePanelTitle:S,workQueuePanelSubtitle:N,renderWorkOrderFilterToolbar:Z,renderWorkOrderCollection:ce,renderWorkOrderCard:X,renderCardAssignmentControl:J,renderAssignmentSelect:j,renderWorkOrderAssignmentField:he}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createWorkQueueDisplayHelpers:l})})()});var _n=U((Tr,Te)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(o=>e.normalizeRole(o.role)==="production").map(o=>({userId:o.user_id,name:e.teamMemberName(o.user_id)})).sort((o,d)=>o.name.localeCompare(d.name))}function t(o){return o.production_action_assigned_to?e.teamMemberName(o.production_action_assigned_to):"Production owner not set"}function a(o){let d=e.activeCompanyRole();return["admin","manager"].includes(d)||o.production_action_assigned_to===e.getSession()?.user?.id}function s(o=""){return n().map(g=>`
        <option value="${e.escapeHtml(g.userId)}" ${g.userId===o?"selected":""}>${e.escapeHtml(g.name)}</option>
      `).join("")}function m(o,d={}){let g=n(),p=d.compact?" compact":"";if(!g.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let h=g.some(y=>y.userId===o.production_action_assigned_to)?o.production_action_assigned_to:g[0].userId;return`
        <form class="production-action-form${p}" data-production-action-form="${e.escapeHtml(o.id)}">
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
      `}function c(o,d){let g=e.hasProductionAction(o),p=`production-action-dialog-${o.id}`;return`
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
              ${g?i(o):'<p class="muted">No Production Action is assigned.</p>'}
              ${d?`
                <div class="button-row production-action-detail-actions">
                  ${g?r(o):""}
                </div>
                ${m(o)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function u(o){let d=e.canEditOperationalRecords()&&o.status!=="completed",g=e.hasProductionAction(o);if(!g&&!d)return"";let p=o.production_action_status==="completed",h=`production-action-dialog-${o.id}`,y=g?t(o):"Not assigned",b=g?`${y} - ${o.production_action}`:y,v=g?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${p?"is-completed":g?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${g?`<span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(b)}">${e.escapeHtml(b)}</p>
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
            ${m(o)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:u,renderProductionActionDetail:f}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof Te<"u"&&Te.exports&&(Te.exports={createProductionActionDisplayHelpers:l})})()});var qn=U((Ir,ht)=>{(function(){function l(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(c=>String(c||"")),a=e.formatMessageTime||(c=>String(c||"")),s=Math.max(Number(e.visibleLimit)||12,1);function m(){return n().filter(c=>!c.read_at).length}function r(c){return n().some(u=>!u.read_at&&u.kind==="production_action_completed"&&u.work_order_id===c)}function i(){if(!e.getReady?.())return"";let c=n();if(!c.length)return"";let u=m(),f=c.slice(0,s);return`
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
      `}return{hasUnreadProductionReady:r,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:m}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createWorkOrderNotificationDisplayHelpers:l})})()});var Sn=U((Fr,Ie)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:s,teamMemberName:m}){function r(c){return`
        <article class="mini-work-order" data-mini-work-order="${c.id}">
          <strong>${e(c.title)}</strong>
          <span>${n(c.status)} - ${c.due_at||"no due date"}</span>
        </article>
      `}function i(c){let u=(a()[c.id]||[]).length,f=(s()[c.id]||[]).length,o=c.completed_at?new Date(c.completed_at).toLocaleDateString():"",d=c.completed_by?m(c.completed_by):"",g=!d&&c.assigned_to?m(c.assigned_to):"",p=d?` by ${e(d)}`:g?` - owner ${e(g)}`:"",h=c.resolution_summary||c.completion_notes||"";return`
        <article class="mini-work-order ${c.status==="completed"?"completed-history":""}" data-mini-work-order="${c.id}">
          <div class="chip-row">
            <span class="chip ${c.status}">${n(c.status)}</span>
            ${c.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${u?`<span class="relationship-chip parts">${t("parts")}<span>${u}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${t("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(c.title)}</strong>
          <span>${o?`Completed ${o}${p}`:`Due ${c.due_at||"unset"}`}</span>
          ${c.failure_cause?`<p><b>Finding:</b> ${e(c.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:r,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof Ie<"u"&&Ie.exports&&(Ie.exports={createMiniWorkOrderDisplayHelpers:l})})()});var Cn=U((Lr,yt)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:a,getParts:s,getPartDocumentsByPartId:m,getPartDocumentsReady:r,getPendingDeletePartId:i,getShowPartSourceManager:c,getPartCostsReady:u,getPartInventoryFilter:f,getPartSearchQuery:o,partUsageRows:d,canDeleteParts:g,canEditOperationalRecords:p=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:b}){let v=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],_=v.reduce((w,[A,W])=>(w[A]=W.replace(/s$/,""),w),{});function q(w){return w.document_type?w.document_type:String(w.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(w.file_name||"")?"invoice":/receipt/i.test(w.file_name||"")?"receipt":/schematic|diagram/i.test(w.file_name||"")?"schematic":/print|drawing/i.test(w.file_name||"")?"part_print":/manual/i.test(w.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(w.file_name||"")?"spec_sheet":"other"}function C(){return v.map(([w,A])=>`
        <option value="${w}">${e(_[w]||A)}</option>
      `).join("")}function O(w){let A=q(w),W=String(w.content_type||"").startsWith("image/"),R=_[A]||"File",S=w.created_at?new Date(w.created_at).toLocaleString():"Uploaded",N=w.file_size_bytes?`${Math.round(Number(w.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${W?"image-file":""}">
          ${W&&w.signedUrl?`<a class="part-document-thumb" href="${e(w.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(w.signedUrl)}" alt="${e(w.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(R)}</span>
              ${N?`<span class="chip">${e(N)}</span>`:""}
            </div>
            <strong>${e(w.file_name)}</strong>
            <span>${e(S)}</span>
            ${w.original_file_name&&w.original_file_name!==w.file_name?`<small>Original: ${e(w.original_file_name)}</small>`:""}
            ${w.signedUrl?`<a href="${e(w.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function $([w,A],W){let R=W.filter(S=>q(S)===w);return R.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(A)}</h4>
            <span>${R.length}</span>
          </div>
          <div class="part-document-grid">
            ${R.map(O).join("")}
          </div>
        </section>
      `:""}function k(w){let A=w.reduce((R,S)=>{let N=q(S);return R[N]=(R[N]||0)+1,R},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(R=>A[R]).map(R=>`<span class="chip">${A[R]} ${e(_[R]||"file")}${A[R]===1?"":"s"}</span>`).join("")}function E(w){let A=Number(w.quantity_on_hand)||0,W=Number(w.reorder_point)||0,R=Number(w.unit_cost)||0,S=A<=W,N=Math.max(0,W-A);return`
        <article class="part-card part-tile ${S?"low-stock":""}" data-open-part="${w.id}" tabindex="0" role="button" aria-label="Open ${e(w.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${w.sku?`<span class="chip">${e(w.sku)}</span>`:""}
              ${w.supplier_name?`<span class="chip part-source-chip">${e(w.supplier_name)}</span>`:""}
              ${w.machine_note?`<span class="chip">${e(w.machine_note)}</span>`:""}
              ${S?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(w.name)}</h3>
            <div class="part-card-meta">
              <span>${A} on hand</span>
              <span>reorder at ${W}</span>
              <span>${u()?`${n(R)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${S&&W>0?`<small>Need ${N} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function P(){let w=s().filter(a),A=w.filter(t).length,W=f();return[["All Parts",w.length,"all"],["Low Stock",A,"low"]].map(([R,S,N])=>`
        <button class="parts-health ${N==="low"&&S?"attention":""} ${W===N?"active":""}" data-part-inventory-filter="${N}" type="button">
          <span>${R}</span>
          <strong>${S}</strong>
        </button>
      `).join("")}function I(w="default"){return`
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
      `}function M(w){let A=Number(w.quantity_on_hand)||0,W=Number(w.reorder_point)||0,R=Number(w.unit_cost)||0,S=m()[w.id]||[],N=k(S),L=p();return`
        <section class="part-detail-shell">
          ${L?h():""}
          ${y()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${w.sku?`<span class="chip">${e(w.sku)}</span>`:""}
                ${w.supplier_name?`<span class="chip part-source-chip">${e(w.supplier_name)}</span>`:""}
                ${w.machine_note?`<span class="chip">${e(w.machine_note)}</span>`:""}
                <span class="chip ${A<=W?"overdue":"open"}">${A<=W?"low stock":"stocked"}</span>
              </div>
              <h3>${e(w.name)}</h3>
              <p>${A} on hand - reorder at ${W}</p>
              ${N?`<div class="chip-row part-file-summary">${N}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${L?`<div class="part-card-actions">
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

          ${L?`<form class="part-detail-form relationship-detail parts" data-edit-part="${w.id}">
            <label>Name<input name="name" required value="${e(w.name)}"></label>
            <label>SKU<input name="sku" value="${e(w.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e(w.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e(w.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${A}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${W}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${R}"></label>
            <p class="error-text" data-part-edit-error="${w.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${L&&c()?b():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${S.length} file${S.length===1?"":"s"}</span>
            </div>
            ${L?`<form class="part-document-form" data-part-document="${w.id}">
              <label>File type<select name="document_type">${C()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${w.id}">${r()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${r()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${S.length?v.map(V=>$(V,S)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${L?x(w):""}
        </section>
      `}function x(w){let A=d(w.id).length,W=m()[w.id]||[],R=i()===w.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${A?`This part has ${A} usage record${A===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${W.length?` and ${W.length} filed receipt/invoice record${W.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${A?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:R?`
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:E,renderPartsHealth:P,renderPartSearch:I,renderPartDetail:M,renderPartDangerZone:x}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createPartsDisplayHelpers:l})})()});var $n=U((Nr,bt)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:a,getAppIssueReportsReady:s,getAppIssueReports:m}){function r(){let u=s();return`
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
      `}function i(u){let f={open:0,reviewing:1,resolved:2};return[...u].sort((o,d)=>{let g=(f[o.status||"open"]??1)-(f[d.status||"open"]??1);return g||new Date(d.created_at||0)-new Date(o.created_at||0)})}function c(){if(!e())return"";let u=s(),f=m(),o=i(f);return`
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
      `}return{renderAppIssueReportForm:r,renderAppIssueReportsPanel:c,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createAppIssuePanelDisplayHelpers:l})})()});var Pn=U((Ur,wt)=>{(function(){function l(e){let n=e.escapeHtml,t=e.getDueState,a=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,m=e.canEditOperationalRecords||(()=>!0);function r(){return e.getPreventiveSchedules().filter(f=>e.matchesActiveLocation(f)&&e.matchesSearch([f.title,f.frequency,f.next_due_at,f.assets?.name]))}function i(){return e.getProcedureTemplates().filter(f=>e.matchesSearch([f.name,f.description,...(f.procedure_steps||[]).map(o=>o.prompt)]))}function c(f){let o=t({due_at:f.next_due_at,status:"open"}),d=e.getPendingDeleteScheduleId()===f.id,g=m();return`
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
      `}function u(f){let o=e.getWorkOrders().filter(y=>y.procedure_template_id===f.id).length,d=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===f.id).length,g=a({workOrders:o,schedules:d}),p=e.getPendingDeleteProcedureId()===f.id,h=m();return`
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
              `:p?`
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
      `}return{filteredPreventiveSchedules:r,filteredProcedureTemplates:i,renderPreventiveSchedule:c,renderProcedureTemplate:u}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createMaintenanceListDisplayHelpers:l})})()});var An=U((Qr,vt)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:a,checklistProgress:s,requiredChecklistProgress:m,escapeHtml:r,cleanWorkOrderDescription:i,renderRelationshipChips:c,renderWorkOrderCommandSummary:u,renderWorkOrderRecommendation:f,statusLabel:o,normalizeWorkOrderType:d=W=>String(W||"corrective"),workOrderTypeLabel:g=W=>String(W||"corrective").replace(/\b\w/g,R=>R.toUpperCase()),hasCompletedSafetyDeviceCheck:p,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:b,renderWorkOrderAssignmentField:v,requiresSafetyDeviceCheck:_,renderWorkOrderMessages:q,renderProcedureOptions:C,money:O,photoMetaText:$,renderActivityItem:k,canDeleteWorkOrders:E,canEditOperationalRecords:P=()=>!0,renderProductionActionDetail:I=()=>"",hasOpenProductionAction:M=()=>!1}=e;function x(W,R){let S=e.getStepResultsByWorkOrder()[W.id]?.[R.id],N=S?.value||"",L=`data-step-result="${R.id}" data-work-order-id="${W.id}"`,V=`<input ${L} value="${r(N)}" placeholder="Result">`;return R.response_type==="checkbox"&&(V=`<label class="check-row"><input ${L} type="checkbox" ${N==="checked"?"checked":""}> Done</label>`),R.response_type==="pass_fail"&&(V=`
          <select ${L}>
            <option value="">Not checked</option>
            <option value="pass" ${N==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${N==="fail"?"selected":""}>Fail</option>
          </select>
        `),R.response_type==="number"&&(V=`<input ${L} type="number" value="${r(N)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${R.position}. ${r(R.prompt)} ${R.required?'<small class="required-mark">Required</small>':""}</span>
          ${V}
          <small data-checklist-recorded>${S?.completed_at?`Recorded ${new Date(S.completed_at).toLocaleString()}`:""}</small>
        </div>
      `}function w(W){return`
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
      `}function A(){let W=e.getActiveWorkOrderId(),S=e.getWorkOrders().find(F=>F.id===W);if(!S)return n();let N=e.getCommentsByWorkOrder(),L=e.getPhotosByWorkOrder(),V=e.getEventsByWorkOrder(),H=e.getPartsUsedByWorkOrder(),Z=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),ce=e.getWorkOrderActionWarning(),X=e.getParts(),J=e.getProfilesByUserId(),j=e.getCommentsError(),me=e.STATUS_OPTIONS||[],he=e.TYPE_OPTIONS||[],T=N[S.id]||[],B=L[S.id]||[],z=V[S.id]||[],Y=H[S.id]||[],K=Y.reduce((F,se)=>F+(Number(se.quantity_used)||0)*t(se),0),te=Y.reduce((F,se)=>F+(Number(se.quantity_used)||0),0),G=a(T,B,z,Y),ae=Z.find(F=>F.id===S.procedure_template_id),ee=ae?s(S,ae):null,de=ae?m(S,ae):null,oe=P();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${S.priority}">${S.priority}</span>
            <span class="chip">${r(g(S.type))}</span>
            <span class="chip ${S.status}">${o(S.status)}</span>
          </div>
          <h2>${r(S.title)}</h2>
          <p>${r(i(S.description)||"No description.")}</p>
          ${c(S)}
          ${S.completed_at?`<p class="completion-note">Completed ${new Date(S.completed_at).toLocaleString()} \xC2\xB7 ${S.actual_minutes||0} min</p>`:""}
          ${S.asset_id&&p(S)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${S.completion_notes?`<p>${r(S.completion_notes)}</p>`:""}
        </div>

        ${u(S)}
        ${f(S)}
        ${I(S)}

        ${S.completed_at&&(S.failure_cause||S.resolution_summary||S.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${S.failure_cause?`<article><span>Cause</span><strong>${r(S.failure_cause)}</strong></article>`:""}
            ${S.resolution_summary?`<article><span>Resolution</span><strong>${r(S.resolution_summary)}</strong></article>`:""}
            ${S.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${oe?`<label>Status
          <select id="status-select">
            ${me.map(F=>`<option value="${F}" ${F===S.status?"selected":""} ${F==="completed"&&M(S)?"disabled":""}>${o(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${oe?`<div class="quick-actions detail-quick-actions">
          ${h(S)?`<button class="assign-action" data-assign-me="${S.id}" type="button">${S.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${me.filter(F=>F!==S.status&&!(F==="completed"&&M(S))).map(F=>`
            <button data-quick-status="${F}" data-id="${S.id}" type="button">${o(F)}</button>
          `).join("")}
        </div>`:""}
        ${re===S.id&&ce?`<p class="error-text action-warning">${r(ce)}</p>`:""}

        ${oe?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${r(S.title)}"></label>
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
                    ${y(S.asset_id||"")}
                  </select>
                </label>
              </div>
              <div data-equipment-choice-panel="new" hidden>
                <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Roll Former 3" disabled></label>
              </div>
            </fieldset>
            <p class="error-text" data-asset-location-warning>${r(b(S.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(S.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${r(S.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${me.map(F=>`<option value="${F}" ${F===S.status?"selected":""} ${F==="completed"&&M(S)?"disabled":""}>${o(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===S.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${v(S,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${C(S.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${S.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${_(S)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${S.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
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
            <button class="secondary-button" data-copy-downtime="subject" data-id="${S.id}" type="button">Copy Subject</button>
            <button class="secondary-button" data-copy-downtime="body" data-id="${S.id}" type="button">Copy Email Body</button>
          </div>
        </div>

        ${q(S)}

        ${oe?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${r(S.title)}"></label>
          <label>Description<textarea name="description" rows="3">${r(i(S.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${r(S.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===S.priority?"selected":""}>${F}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${he.map(F=>`<option value="${F}" ${F===d(S.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${v(S)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${C(S.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${r(S.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(S.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${S.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${_(S)?`
            <label class="check-row safety-check-row">
              <input name="safety_devices_checked" type="checkbox" ${S.safety_devices_checked?"checked":""}>
              Safety devices identified before completion: E-stops, sensors, guards, and interlocks
            </label>
          `:""}
          <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${S.actual_minutes||0}"></label>
          <p class="error-text" id="work-order-save-error"></p>
          <button class="secondary-button save-work-button" type="submit">Save Work Order</button>
        </form>
        </details>`:""}

        ${ae?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${r(ae.name)}</h3>
              <span data-checklist-summary>${ee.done} of ${ee.total} complete - required ${de.done}/${de.total}</span>
            </div>
            <div class="checklist-list">
              ${ae.procedure_steps.map(F=>oe?x(S,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${r(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${r(e.getStepResultsByWorkOrder()[S.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${oe&&S.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${de?.total?`<p class="${de.done===de.total?"completion-note":"warning-text"}">Required checklist: ${de.done}/${de.total}</p>`:""}
            ${M(S)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${S.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${_(S)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${p(S)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${M(S)?"disabled":""}>Complete Work Order</button>
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
              ${X.map(F=>`<option value="${F.id}">${r(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${Y.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${O(K)}</span></article>`:""}
          ${Y.map(F=>`
            <article class="relationship-detail parts">
              <strong>${r(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${O((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${r(J[F.created_by]?.full_name||"Team member")}</small>
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
                <span>${$(F)}</span>
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

        ${oe&&E()?w(S):""}
      </div>
    `}return{renderWorkOrderDetail:A}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createWorkOrderDetailDisplayHelpers:l})})()});var En=U((Br,kt)=>{(function(){function l(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof kt<"u"&&(kt.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var Rn=U((jr,_t)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:a,escapeHtml:s,assetTypeLabel:m,renderParentAssetOptions:r,renderLocationOptions:i,renderAssetAreaOptions:c,assetStatusLabel:u,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:o,canDeleteEquipment:d,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:p,renderProcedureOptions:h}=e;function y(){let k=new Date;return new Date(k.getTime()-k.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function b(){return g()?`<form class="inline-form" id="create-asset-form">
        <input name="name" required placeholder="Machine or equipment name">
        <input name="asset_code" placeholder="Serial number">
        <input name="asset_tag" aria-label="Asset tag" placeholder="Asset tag (optional)">
        <input name="manufacturer" placeholder="Manufacturer">
        <input name="model" placeholder="Model">
        <select name="location_existing" aria-label="Area / spot"><option value="">Area / spot unset</option>${c()}</select>
        <input name="location_new" placeholder="New area / spot">
        <select name="asset_type" aria-label="Equipment type">${e.ASSET_TYPE_OPTIONS.map(k=>`<option value="${k}">${m(k)}</option>`).join("")}</select>
        <select name="parent_asset_id" aria-label="Part of equipment"><option value="">Top level equipment</option>${r()}</select>
        <select name="location_id" ${e.getLocations().length?"required":"disabled"}>${i()}</select>
        <label class="check-row compact-check"><input name="safety_devices_required" type="checkbox" checked> Safety device identification</label>
        <button class="secondary-button asset-action-button" type="submit">Add Equipment</button>
        <button class="secondary-button asset-action-button" data-asset-continue="true" type="submit">Save Equipment and Continue</button>
        <button class="secondary-button" type="reset">Clear Form</button>
      </form><p class="error-text" id="asset-create-error"></p>`:'<p class="muted">Accounting can view equipment here. Maintenance and admins manage operational equipment changes.</p>'}function v(k,E,P){let I=E.some(A=>A.event_type==="created"),M=k.created_at&&!I?[{id:`${k.id}-created`,event_type:"created",summary:`${m(k.asset_type)} created.`,actor_id:k.created_by||"",created_at:k.created_at}]:[];return{equipmentHistory:[...E,...M].sort((A,W)=>new Date(W.created_at||0)-new Date(A.created_at||0)),historyActorLabel:A=>A.actor_id&&P[A.actor_id]?.full_name?P[A.actor_id].full_name:A.actor_id?`User ${String(A.actor_id).slice(0,8)}`:A.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function _(k,E){return k.map(P=>`
        <article>
          <strong>${s(String(P.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${P.created_at?new Date(P.created_at).toLocaleString():"time unavailable"} &middot; ${s(E(P))}</span>
          <p>${s(P.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function q(){let k=e.getAssets(),E=e.getActiveAssetId(),P=k.find(H=>H.id===E);if(!P)return n();let I=e.getAssetEventsReady?.()!==!1,M=e.getProfilesByUserId?.()||{},x=(e.getAssetEventsByAssetId?.()[P.id]||[]).sort((H,Z)=>new Date(Z.created_at||0)-new Date(H.created_at||0)),{equipmentHistory:w,historyActorLabel:A}=v(P,x,M),W=e.LIST_ITEMS_PER_PAGE||12,R=Math.max(1,Math.ceil(w.length/W)),S=Math.min(Math.max(1,e.getAssetRelationshipPage?.(P.id,"asset-history")||1),R),N=w.length?(S-1)*W+1:0,L=Math.min(w.length,S*W),V=w.slice((S-1)*W,S*W);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(P.name)} - ${w.length} event${w.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(P.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${I?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${_(V,A)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${w.length>W?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(P.id)}" type="button" ${S<=1?"disabled":""}>Previous</button>
                <span>Showing ${N}-${L} of ${w.length} - Page ${S} of ${R}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(P.id)}" type="button" ${S>=R?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function C(){let k=e.getAssets(),E=e.getActiveAssetId(),P=k.find(D=>D.id===E);if(!P)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(P.id);let I=e.getWorkOrders(),M=e.getPreventiveSchedules(),x=e.getParts(),w=e.getAssetParts(),A=e.getAssetPartsReady(),W=e.getAssetDocumentsByAssetId?.()[P.id]||[],R=e.getAssetDocumentsReady?.()!==!1,S=e.getAssetEventsReady?.()!==!1,N=e.getProfilesByUserId?.()||{},L=e.getPartsUsedByWorkOrder(),V=e.getLocations(),H=e.getActiveLocationId(),Z=e.ASSET_TYPE_OPTIONS||[],re=t(P),ce=a(P.id),X=I.filter(D=>D.asset_id===P.id),J=e.getAssetWorkHistory?.(P.id),j=!J||J.historyStatus==="ready",me=J?J.rows:X,he=J?.historyStatus==="error"?'<p class="error-text" role="alert">Could not load work history.</p>':'<p class="muted" role="status">Loading work history...</p>',T=me.filter(D=>D.status!=="completed").sort((D,ue)=>new Date(ue.created_at||0)-new Date(D.created_at||0)),B=me.filter(D=>D.status==="completed").sort((D,ue)=>new Date(ue.completed_at||ue.created_at||0)-new Date(D.completed_at||D.created_at||0)),z=M.filter(D=>D.asset_id===P.id),Y=Object.values(L).flat().filter(D=>X.some(ue=>ue.id===D.work_order_id)),K=w.filter(D=>D.asset_id===P.id),te=new Set(K.map(D=>D.part_id)),G=x.filter(D=>!te.has(D.id)),ae=(e.getAssetEventsByAssetId?.()[P.id]||[]).sort((D,ue)=>new Date(ue.created_at||0)-new Date(D.created_at||0)),{equipmentHistory:ee}=v(P,ae,N),de=(D,ue)=>J?J.countsStatus==="ready"?J.counts[D]:J.countsStatus==="error"?"Unavailable":"Loading...":ue,oe=D=>`data-asset-work-count="${s(P.id)}" data-work-count-kind="${D}"`,F=e.LIST_ITEMS_PER_PAGE||12,se=D=>e.getAssetRelationshipOpen?.(P.id,D)||!1,fe=(D,ue)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(P.id,D)||1),Math.max(1,Math.ceil(ue/F))),ye=(D,ue)=>{let be=fe(ue,D.length);return D.slice((be-1)*F,be*F)},pe=(D,ue)=>{if(ue<=F)return"";let be=fe(D,ue),Pt=Math.max(1,Math.ceil(ue/F)),Dn=(be-1)*F+1,Tn=Math.min(ue,be*F);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(P.id)}" data-asset-relation-section="${s(D)}" type="button" ${be<=1?"disabled":""}>Previous</button>
            <span>Showing ${Dn}-${Tn} of ${ue} - Page ${be} of ${Pt}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(P.id)}" data-asset-relation-section="${s(D)}" type="button" ${be>=Pt?"disabled":""}>Next</button>
          </div>
        `},we=D=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(D)}" data-asset-id="${s(P.id)}" ${se(D)?"open":""}`,ie=V.find(D=>D.id===P.location_id)?.name||P.location||"No location set",ge=re?re.name:"Top level equipment",ve=P.status==="offline"?"status-blocked":P.status==="degraded"?"status-open":P.status==="watch"?"status-in_progress":"status-completed",le=P.status==="degraded"&&de("open",T.length)===0,ne=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${P.status}">${s(u(P.status))}</span>
              <span class="chip">${s(m(P.asset_type))}</span>
              ${P.asset_code?`<span class="chip">${s(P.asset_code)}</span>`:""}
              ${P.asset_tag?`<span class="chip">Asset tag: ${s(P.asset_tag)}</span>`:""}
              ${P.manufacturer?`<span class="chip">${s(P.manufacturer)}</span>`:""}
              ${P.model?`<span class="chip">${s(P.model)}</span>`:""}
              ${P.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(P.name)}</h2>
            <p>${s(P.location||"No location set")}</p>
            ${re?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(re.id)}" type="button">${s(re.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${ve}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(u(P.status))}</strong>
              <small>${P.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(ie)}</strong>
              <small>${P.location?s(P.location):"Area / spot unset"}</small>
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
            <button class="command-card status-open ${de("open",T.length)===0?"empty":""}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong ${oe("open")}>${de("open",T.length)}</strong>
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

          ${le&&ne?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${s(P.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${p?p():""}

          ${ne?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${P.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${W.length} file${W.length===1?"":"s"}</span>
            </div>
            ${ne?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(P.id)}">
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
              <p class="error-text" data-asset-document-error="${s(P.id)}">${R?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${R?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${W.map(D=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(D.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(D.content_type||"").startsWith("image/")&&D.signedUrl?`<img src="${s(D.signedUrl)}" alt="${s(D.original_file_name||D.file_name||P.name)}">`:`<strong>${s($(D.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s($(D.document_type))}</strong>
                      <span>${s(D.original_file_name||D.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(D.content_type||"").startsWith("image/")&&D.signedUrl?`<img src="${s(D.signedUrl)}" alt="${s(D.original_file_name||D.file_name||P.name)}">`:`<div class="asset-file-document-preview">${s($(D.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${s(D.content_type||"file")}</span>
                      <a class="secondary-button" href="${s(D.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${ne?`<button class="text-button danger-link" data-delete-asset-document="${s(D.id)}" data-asset-document-path="${s(D.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${ne?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${s(P.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(P.asset_code||"")}"></label>
            <label>Asset Tag<input name="asset_tag" value="${s(P.asset_tag||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(P.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(P.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${Z.map(D=>`<option value="${D}" ${D===(P.asset_type||"machine")?"selected":""}>${m(D)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${r(P.parent_asset_id||"",P.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${V.length?"":"disabled"}>
                ${i(P.location_id||H)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${c(P.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(D=>`<option value="${D}" ${D===P.status?"selected":""}>${u(D)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${P.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${ce.map(D=>`
                <article class="mini-work-order" data-open-asset="${s(D.id)}">
                  <strong>${s(D.name)}</strong>
                  <span>${s(m(D.asset_type))} - ${s(u(D.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${we("open-work")} id="asset-open-work-target">
            <summary>Open Work <span ${oe("open")}>${de("open",T.length)}</span></summary>
            <div class="mini-list">
              ${se("open-work")?j?ye(T,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':he:'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${se("open-work")&&j?pe("open-work",T.length):""}
          </details>

          <details ${we("completed-history")}>
            <summary>Completed History <span ${oe("completed")}>${de("completed",B.length)}</span></summary>
            <div class="mini-list">
              ${se("completed-history")?j?ye(B,"completed-history").map(f).join("")||'<p class="muted">No completed work yet.</p>':he:'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${se("completed-history")&&j?pe("completed-history",B.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${ee.length} event${ee.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(P.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${S?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${z.length} schedule${z.length===1?"":"s"}</span>
                ${ne?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${ne?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(P.id)}">
              <input name="title" required placeholder="PM for ${s(P.name)}">
              <input name="asset_id" type="hidden" value="${s(P.id)}">
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
              ${z.map(D=>`<article><strong>${s(D.title)}</strong><span>${D.frequency} - next due ${D.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(P.id)}" ${se("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${K.length}</span></summary>
            <div class="panel-header compact">
              ${ne?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${A?`
              ${ne?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(P.id)}">
                <label>Part
                  <select name="part_id" ${G.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${G.map(D=>`<option value="${s(D.id)}">${s(D.name)}${D.sku?` - ${s(D.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${G.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${s(P.id)}"></p>
              <div class="mini-list">
                ${ye(K,"linked-parts").map(D=>`<article>
                  <strong>${s(D.parts?.name||"Part")}</strong>
                  <span>${s(D.parts?.sku||"No SKU")} - recommended qty ${s(D.quantity_recommended||1)}${D.note?` - ${s(D.note)}`:""}</span>
                  ${ne?`<button class="text-button danger-link" data-remove-asset-part="${s(D.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${pe("linked-parts",K.length)}
            `:'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(P.id)}" ${se("parts-used")?"open":""}>
            <summary>Parts Used History <span>${j?Y.length:"Not loaded"}</span></summary>
            <div class="mini-list">
              ${se("parts-used")?j?ye(Y,"parts-used").map(D=>`<article><strong>${s(D.parts?.name||"Part")}</strong><span>${D.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':he:'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${se("parts-used")&&j?pe("parts-used",Y.length):""}
          </details>

          ${ne?O(P):""}
        </div>
      `}function O(k){let E=e.getWorkOrders(),P=e.getPreventiveSchedules(),I=e.getAssets(),M=e.getActiveAssetId(),x=E.filter(N=>N.asset_id===k.id).length,w=P.filter(N=>N.asset_id===k.id).length,A=I.filter(N=>N.parent_asset_id===k.id).length,W=e.getMaintenanceRequests().filter(N=>N.asset_id===k.id).length,R=o({workOrders:x,children:A,schedules:w,requests:W}),S=e.getPendingDeleteAssetId()===M;return d()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${R||`This permanently removes "${s(k.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${R?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:S?`
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
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function $(k){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[k]||"File"}return{renderAssetDetail:C,renderAssetHistoryScreen:q,renderCreateAssetForm:b}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof _t<"u"&&(_t.exports={createAssetDetailDisplayHelpers:l})})()});var On=U((zr,qt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:a,statusLabel:s,workOrderTypeLabel:m=o=>String(o||"corrective").replace(/\b\w/g,d=>d.toUpperCase()),renderAssignmentSelect:r,renderProcedureOptions:i,escapeHtml:c}=e;function u(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getParts();return`
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
                  ${t.map(d=>`<option value="${d}">${m(d)}</option>`).join("")}
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
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof qt<"u"&&(qt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var Wn=U((Vr,St)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:a,escapeHtml:s,renderAssignmentSelect:m,renderProcedureOptions:r,assetStatusLabel:i,workOrderTypeLabel:c=o=>String(o||"corrective").replace(/\b\w/g,d=>d.toUpperCase())}=e;function u(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getQuickFixAssetId(),d=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),p=e.getSession(),h=e.getParts(),y=o||"",b=g.find(v=>v.id===d);return`
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
                  ${m(p.user.id,{selfLabel:"Assign to me"})}
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
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof St<"u"&&(St.exports={createQuickFixDisplayHelpers:l})})()});var xn=U((Hr,Ct)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(f){return`
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
      `}function m(f){return`
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
      `}return{workspaceLoading:t,workspaceLoadError:a,authForm:s,authCallback:m,authCallbackError:r,passwordResetRequest:i,passwordRecovery:c,companyCreate:u}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof Ct<"u"&&(Ct.exports={createAuthDisplayHelpers:l})})()});var Mn=U((Gr,$t)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,a=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),m=e.getPublicRequestLinksReady||(()=>!0),r=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),c=e.canManageTeam||(()=>!1),u=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,o=e.publicRequestUrl,d=e.publicRequestQrUrl;function g(){return`
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
      `}function p(C,O){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(C.location_name)}</h1>
                <p>${n(C.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${t(O,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${n(O)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${n(O)}" target="_blank" rel="noreferrer">Test Form</a>
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
      `}function y(C){return`
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
      `}function b(C){return`
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
      `}function v(C,O=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(C.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${O?`<p class="error-text">${n(O)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function _(){if(!c())return"";let C=f(),O=a(),$=m();return`
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
          ${C?`<p class="muted">QR codes will point to ${n(C)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${$?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${O.map(q).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function q(C){let O=s().find(M=>M.location_id===C.id),$=!!(O&&O.is_active!==!1),k=u(),E=$?o(O.token):"",P=$?d(O.token):"",I=!!(E&&P);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(C.name)}</strong>
            <span>${$?"External request link active":O?"Request link disabled":"No request link yet"}</span>
            ${O?.last_used_at?`<span>Last used ${new Date(O.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${$?`
            <div class="qr-preview">${I?t(E):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(P||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${I?"":"disabled-link"}" href="${n(P||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(P)}" type="button" ${I?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${I?"":"disabled-link"}" href="${n(E||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${k?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(O.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(O.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:O?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${k?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(O.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(O.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(C.id)}" type="button" ${m()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:p,loadingRequestForm:h,publicRequestForm:y,publicRequestError:b,publicRequestSuccess:v,publicRequestLinkManager:_,publicRequestLocationCard:q}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof $t<"u"&&($t.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(c){return String(c||"").replace(/\/+$/,"")}function n(c=l.location,u=l.PUBLIC_APP_URL){if(u)return`${e(u)}/`;let f=c?.origin||"",o=c?.pathname||"/",g=o.indexOf("/auth/callback");if(g>=0)return`${f}${o.slice(0,g+1)}`;let p=o.endsWith("/")?o:o.replace(/[^/]*$/,"");return`${f}${p||"/"}`}function t(c=l.location,u=l.PUBLIC_APP_URL){return`${n(c,u)}auth/callback/`}function a(c={},u=l.location,f=l.PUBLIC_APP_URL){let o=new URL(n(u,f));return Object.entries(c).forEach(([d,g])=>{g!=null&&g!==""&&o.searchParams.set(d,g)}),o.href}function s(c){let u=new URL(c),f=new URLSearchParams(u.hash.replace(/^#/,"")),o=u.searchParams;return{code:o.get("code")||"",type:f.get("type")||o.get("type")||"",accessToken:f.get("access_token")||o.get("access_token")||"",refreshToken:f.get("refresh_token")||o.get("refresh_token")||"",error:f.get("error")||o.get("error")||"",errorCode:f.get("error_code")||o.get("error_code")||"",errorDescription:f.get("error_description")||o.get("error_description")||""}}function m(c){return!!(c?.code||c?.accessToken&&c?.refreshToken||c?.error||c?.errorDescription)}function r(c){return c?.type==="recovery"||!c?.type&&!!(c?.accessToken&&c?.refreshToken)}function i(c=l.location){let u=new URL(c.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>u.searchParams.delete(f)),u.hash="",u.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:a,authParamsFromHref:s,isAuthCallbackParams:m,isPasswordRecoveryParams:r,cleanAuthUrl:i}})(window);var ke="maintainops.equipmentCreateDraft.v1:",Fe=new Set(["name","asset_code","asset_tag","manufacturer","model","location_existing","location_new","asset_type","parent_asset_id","location_id","safety_devices_required"]);function Et({documentRef:l=document,getScope:e,storage:n=()=>sessionStorage,now:t=Date.now}){let a=new Map,s,m=()=>l.querySelector("#create-asset-form"),r=h=>[...h.querySelectorAll("[name]")].filter(y=>Fe.has(y.name)&&!["file","hidden"].includes(y.type)),i=h=>r(h).map(y=>[y.name,y.type==="checkbox"?y.checked:y.value]);function c(h){a.delete(h);try{n().removeItem(ke+h)}catch{}}function u(h){try{let b=n().getItem(ke+h);!a.has(h)&&b&&b.length<1e5&&a.set(h,JSON.parse(b))}catch{}let y=a.get(h);return!y||!Number.isFinite(y.at)||y.at>t()||t()-y.at>864e5||!Array.isArray(y.fields)||!y.fields.every(b=>Array.isArray(b)&&Fe.has(b[0])&&(b[0]==="safety_devices_required"?typeof b[1]=="boolean":typeof b[1]=="string"))?(c(h),null):y}function f(h){let y=h?.dataset.equipmentScope;if(!y||y!==e())return;let b={at:t(),fields:i(h)};a.set(y,b);try{n().setItem(ke+y,JSON.stringify(b))}catch{}return{scope:y,fields:JSON.stringify(b.fields)}}function o(){let h=m(),y=l.activeElement;h?.dataset.equipmentDirty&&f(h);let b=h?.contains(y)?y.getBoundingClientRect():null;s=b&&h.dataset.equipmentScope===e()&&b.bottom>0&&b.top<l.defaultView.innerHeight?{scope:e(),name:y.name,start:y.selectionStart,end:y.selectionEnd}:null}function d(){let h=m(),y=e();if(!h||!y)return;h.dataset.equipmentScope=y;let b=u(y);if(b){for(let[_,q]of b.fields){let C=r(h).find(O=>O.name===_);C&&(C.type==="checkbox"?C.checked=q:(C.value=q,C.tagName==="SELECT"&&![...C.options].some(O=>O.value===q)&&C.setCustomValidity("Choose an available option.")))}h.dataset.equipmentDirty="true"}let v=s?.scope===y&&r(h).find(_=>_.name===s.name);v&&(s.start!=null&&v.setSelectionRange(s.start,s.end),v.focus({preventScroll:!0})),s=null}function g(h){if(!h||JSON.stringify(u(h.scope)?.fields)!==h.fields)return;let y=m();if(y?.dataset.equipmentScope===h.scope&&JSON.stringify(i(y))!==h.fields){f(y);return}c(h.scope),y?.dataset.equipmentScope===h.scope&&y.reset()}function p(){a.clear(),s=null;try{let h=n();for(let y=h.length-1;y>=0;y--)h.key(y)?.startsWith(ke)&&h.removeItem(h.key(y))}catch{}}for(let h of["input","change"])l.addEventListener(h,y=>{let b=y.target.form;b?.id!=="create-asset-form"||!Fe.has(y.target.name)||(y.target.setCustomValidity(""),b.dataset.equipmentDirty="true",f(b))});return l.addEventListener("reset",h=>{let y=h.target;y.id!=="create-asset-form"||y.dataset.equipmentScope!==e()||(c(y.dataset.equipmentScope),delete y.dataset.equipmentDirty,r(y).forEach(b=>b.setCustomValidity("")))}),l.defaultView.addEventListener("pagehide",o),l.addEventListener("visibilitychange",()=>{l.hidden&&o()}),{capture:o,restore:d,snapshot:f,clear:g,reset:p}}(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l($){return String($||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e($){return $.toISOString().slice(0,10)}function n($){return $.toISOString()}function t($){let k=new Date;return k.setDate(k.getDate()-$),k}function a(){let $=new Date;return new Date($.getFullYear(),$.getMonth(),1)}function s($=new Date){let k=new Date($);k.setHours(0,0,0,0),k.setDate(k.getDate()-k.getDay());let E=new Date(k);return E.setDate(E.getDate()+7),{start:k,end:E}}function m($,k){let E=[];for(let P=0;P<$.length;P+=k)E.push($.slice(P,P+k));return E}function r($){return i($).replace(/\.[^/.]+$/,"")||"photo"}function i($){return String($||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function c($){return $==="active"||$==="all"?"Active":$==="overdue"?"Overdue":$==="completed"?"All Completed":$==="completed_month"?"Completed Month":$==="completed_week"?"Done This Week":$==="open"?"New":String($||"").replaceAll("_"," ").replace(/\b\w/g,k=>k.toUpperCase())}function u($){let k=String($||"corrective").trim().toLowerCase();return k==="inspection"?"preventive":k==="reactive"||k==="request"?"corrective":["corrective","preventive","fabrication"].includes(k)?k:"corrective"}function f($){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[u($)]}function o($){let k=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],E=String($||"technician").trim().toLowerCase();return E==="member"?"technician":k.includes(E)?E:"technician"}function d($){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[o($)]||"Technician"}function g($){let k={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return k[o($)]||k.technician}function p($){return new Date(`${$}T00:00:00`).toLocaleDateString()}function h($){let k=[new Date($.created_at).toLocaleString()];return $.file_size_bytes&&k.push(b($.file_size_bytes)),$.original_size_bytes&&$.file_size_bytes&&$.original_size_bytes!==$.file_size_bytes&&k.push(`optimized from ${b($.original_size_bytes)}`),k.join(" - ")}function y($){let k=[];return($.photo_uploaded_at||$.updated_at||$.created_at)&&k.push(new Date($.photo_uploaded_at||$.updated_at||$.created_at).toLocaleString()),$.photo_file_size_bytes&&k.push(b($.photo_file_size_bytes)),$.photo_original_size_bytes&&$.photo_file_size_bytes&&$.photo_original_size_bytes!==$.photo_file_size_bytes&&k.push(`optimized from ${b($.photo_original_size_bytes)}`),k.join(" - ")||"Photo attached"}function b($){let k=Number($)||0;return k?k<1024?`${k} B`:k<1048576?`${Math.round(k/1024)} KB`:`${(k/1048576).toFixed(k>=10485760?0:1)} MB`:""}function v($){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number($)||0)}function _($){return Number($.unit_cost_at_use??$.parts?.unit_cost??0)||0}function q($){if(!$.due_at||$.status==="completed")return null;let k=new Date;k.setHours(0,0,0,0);let E=new Date(`${$.due_at}T00:00:00`),P=Math.round((E-k)/864e5);return P<0?{label:"overdue",className:"overdue"}:P===0?{label:"due today",className:"due_today"}:null}function C(){let $=new Date;return $.setHours(0,0,0,0),$}function O($){return`"${String($??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:a,sundayWeekRange:s,chunkArray:m,fileBaseName:r,safeFileName:i,statusLabel:c,normalizeWorkOrderType:u,workOrderTypeLabel:f,normalizeRole:o,roleLabel:d,roleDescription:g,formatDate:p,photoMetaText:h,requestPhotoMetaText:y,formatBytes:b,money:v,partUsageUnitCost:_,getDueState:q,startOfToday:C,csvCell:O})})();(function(){function l(s,m){let r=s?.message||"";return m.some(i=>r.includes(i))}function e(s,m){let r=s?.message||"";return r.includes(m)&&(r.includes("column")||r.includes("schema cache"))}function n(s){let m=s?.message||"";return m.includes("work_order_comments_company_author_profile_fkey")||m.includes("profiles")}function t(s){let m=s?.message||"";return!!(m.includes("procedure_template_id")||m.includes("procedure_templates")||m.includes("procedure_steps"))}function a(s){return l(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:a}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let a,s=new Promise((m,r)=>{a=setTimeout(()=>r(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var ra=Q(Rt()),aa=Q(Ot());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function a(f){return m(`?request=${encodeURIComponent(f)}`)}function s(f){return m(`?qr=${encodeURIComponent(f)}`)}function m(f){let o=r();if(!o)return"";let d=new URL(o);return d.search=f,d.hash="",d.toString()}function r(){let o=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return o?i(o):""}function i(f){try{let o=new URL(String(f||"").trim(),n.location.href);return o.protocol!=="https:"||!c(o.hostname)?"":(o.search="",o.hash="",o.pathname&&o.pathname!=="/"&&!o.pathname.endsWith("/")&&!o.pathname.endsWith(".html")&&(o.pathname=`${o.pathname}/`),o.toString())}catch{return""}}function c(f){let o=String(f||"").toLowerCase();return!(!o||o==="localhost"||o.endsWith(".localhost")||o==="127.0.0.1"||o==="::1"||o==="[::1]"||/^10\./.test(o)||/^192\.168\./.test(o)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(o))}function u(f,o=4){if(!n.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let d=n.qrcode(0,"M");return d.addData(f),d.make(),d.createSvgTag(o,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:s,publicAppUrlWithSearch:m,publicAppBaseUrl:r,normalizePublicAppUrl:i,isPublicAppHost:c,qrSvgFor:u}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),a=n.querySelector("#print-public-qr");!a||typeof t!="function"||a.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:l}})();var ca=Q(Wt()),la=Q(xt());(function(){function l(e){function n(c){return e[c]()}function t(c,u){return typeof e[c]=="function"?e[c]():u}function a(c){let u=n("searchQuery"),f=n("activeSection"),o=n("activeStatusFilter"),d=!!u.trim();return i(s(c,{statusFilter:d?"__any__":f==="work"&&o==="requests"?"__none__":o,section:f,includeQueue:!d,includeSearch:!0}))}function s(c,u={}){let f=u.section||n("activeSection"),o=c.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(o=o.eq("location_id",n("activeLocationId"))),u.includeQueue!==!1&&(o=m(o,f)),u.includeAttributeFilters!==!1&&f==="work"){let d=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");d!=="all"&&(o=o.eq("type",d)),g!=="all"&&(o=o.eq("priority",g))}if(o=r(o,u.statusFilter||n("activeStatusFilter")),u.includeSearch!==!1){let d=e.postgrestSearchTerm(n("searchQuery"));if(d){let g=n("workOrderRelatedSearch"),p=[`title.ilike.%${d}%`,`description.ilike.%${d}%`,`production_action.ilike.%${d}%`,`priority.ilike.%${d}%`,`type.ilike.%${d}%`,`status.ilike.%${d}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];o=o.or(p.join(","))}}return o}function m(c,u){if(u==="mywork"){let f=n("session").user.id;return n("myWorkFilter")==="created"?c.eq("created_by",f):c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}if(u!=="work")return c;if(n("workOrderAssigneeFilter")){let f=n("workOrderAssigneeFilter");return c.or(`assigned_to.eq.${f},and(production_action_assigned_to.eq.${f},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?c.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?c.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?c.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):c}function r(c,u){let f=e.isoDate(e.startOfToday());if(u==="__any__")return c;if(u==="__none__")return c.eq("id","00000000-0000-0000-0000-000000000000");if(u==="overdue")return c.neq("status","completed").lt("due_at",f);if(u==="completed_month")return c.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(u==="completed_week"){let o=e.sundayWeekRange();return c.gte("completed_at",e.isoDateTime(o.start)).lt("completed_at",e.isoDateTime(o.end))}return u==="active"||u==="all"?c.neq("status","completed"):c.eq("status",u)}function i(c){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?c.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?c.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?c.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?c.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?c.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):c.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:m,applyWorkOrderStatusFilter:r,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let s=n.querySelector(`#${a.dataset.jumpWorkSection}`);if(!s)return;let m=s.closest("details");m&&(m.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let r=s;r.classList.add("jump-highlight","field-jump-highlight"),t(()=>r.classList.remove("jump-highlight"),1400),t(()=>r.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.renderWorkspace,m=e.setWorkOrderSearchMode;if(!a||!s||!m)return;let r=()=>{a.setSearchQuery(""),m(!1),t.setItem("maintainops.searchQuery","")},i=c=>{a.setActiveSection(c),t.setItem("maintainops.activeSection",c)};n.querySelectorAll("[data-search-work-order]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveWorkOrderId(c.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),i("work"),r(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(c=>{c.addEventListener("click",()=>{a.setActiveAssetId(c.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),i("assets"),r(),s()})}),n.querySelectorAll("[data-search-part]").forEach(c=>{c.addEventListener("click",()=>{a.setActivePartId(c.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),i("parts"),r(),s()})}),n.querySelectorAll("[data-search-request]").forEach(c=>{c.addEventListener("click",()=>{i("requests"),r(),s()})}),n.querySelectorAll("[data-search-section]").forEach(c=>{c.addEventListener("click",()=>{i(c.dataset.searchSection),r(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(a={}){let s=a.documentRef||document,m=a.storage||localStorage,r=a.state,i=a.windowRef||(typeof window<"u"?window:null),c=a.setTimeoutRef||setTimeout,u=a.clearTimeoutRef||clearTimeout,f=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!r)return;let o=()=>{e+=1,l!==null&&(u(l),l=null)},d=p=>{p&&typeof i?.scrollTo=="function"&&i.scrollTo(p.x,p.y)},g=(p,h,y,b)=>{let v=s.getElementById?s.getElementById(p):s.querySelector(`#${p}`);if(!v)return;let _=v.value.length,q=Math.min(h??_,_),C=Math.min(y??q,_);v.focus({preventScroll:!0}),v.setSelectionRange(q,C),d(b)};s.querySelectorAll(".workspace-search-input").forEach(p=>{p.addEventListener("input",()=>{let h=p.id,y=p.selectionStart,b=p.selectionEnd;o();let v=e;r.setSearchQuery(p.value),a.invalidateExactWorkOrderSearchCache(),r.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),r.getSearchQuery().trim()&&(r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setQuickFixMode(!1),r.setCreateWorkOrderMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)),m.setItem("maintainops.searchQuery",r.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),l=c(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(v!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),v!==e))return;let _=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,q=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),C=!("activeElement"in s)||s.activeElement===q;a.renderWorkspace(),C?g(h,y,b,_):d(_)}),n),f)})}),s.querySelectorAll("[data-view-work-search]").forEach(p=>{p.addEventListener("click",async()=>{o(),r.setActiveSection("work"),r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),m.setItem("maintainops.activeSection",r.getActiveSection()),await a.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(p=>{p.addEventListener("click",async()=>{o(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}async function m(r){let i=Number(a?.scrollY??a?.pageYOffset??0);if(await r(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(r.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setMyWorkFilter(r.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderFilter(r.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{t.setActiveStatusFilter(r.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{let i=r.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{let i=r.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderTypeFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderPriorityFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setWorkSort(r.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{t.setWorkSort(r.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{t.setWorkGroup(r.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderAssigneeFilter(r.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(r=>{r.addEventListener("click",async()=>{r.disabled||await m(async()=>{t.setRequestViewFilter(r.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(r.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setPartsPage(t.getPartsPage()+(r.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setAssetsPage(t.getAssetsPage()+(r.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{t.setFinancialPage(t.getFinancialPage()+(r.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{r.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(r.value),r.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(r.value),r.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(r.value),r.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(r.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{let i=r.dataset.pageDirection==="next"?1:-1;if(r.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(r.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),r.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),r.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),r.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),r.dataset.listPage?.startsWith("planning-")){let c=r.dataset.listPage.replace("planning-","");t.setPlanningPage(c,t.getPlanningPage(c)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(r=>{r.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(r.dataset.planningGroup,!!r.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,a=e.state,s=e.windowRef||(typeof window<"u"?window:null),m=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let r=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function i(b){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(b)}async function c(b){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([b])}function u(b){return b==="open-work"||b==="completed-history"||b==="parts-used"}function f(){e.renderWorkspace()}function o(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function d(){let b=n.querySelector("#work-order-photos-target");b&&("open"in b&&(b.open=!0),typeof b.scrollIntoView=="function"&&b.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(d);return}d()}let p=n.querySelector("#back-to-my-work");p&&p.addEventListener("click",async()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),o(),r(),typeof e.returnToWorkOrderQueue=="function"?await e.returnToWorkOrderQueue():e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),o(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(b=>{b.addEventListener("click",()=>{a.setActiveWorkOrderId(b.dataset.id),a.setActiveAssetId(null),o(),r(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),a.setActiveWorkOrderId(b.dataset.workPhotoJump),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(b=>{b.addEventListener("click",v=>{v.stopPropagation(),a.setActiveAssetId(b.dataset.openAsset),a.setActiveWorkOrderId(null),o(),r(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll(".asset-card[data-asset-id]").forEach(b=>{let v=()=>{a.setActiveAssetId(b.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),o(),r(),a.setReportIssueMode(!1),a.setActiveSection("assets"),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()};b.addEventListener("click",v),b.addEventListener("keydown",_=>{_.key!=="Enter"&&_.key!==" "||(_.preventDefault(),v())})});let y=0;n.querySelectorAll("[data-mini-work-order]").forEach(b=>{b.addEventListener("click",async()=>{if(typeof e.openLinkedWorkOrder=="function"){let v=++y,_=()=>v===y&&b.isConnected!==!1;o();try{await e.openLinkedWorkOrder(b.dataset.miniWorkOrder,{isCurrent:_})&&m()}catch(q){_()&&e.showNotice?.(`Could not open work order: ${q.message||q}`,"warning")}return}a.setActiveWorkOrderId(b.dataset.miniWorkOrder),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),t.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(b=>{let v=b.open;b.addEventListener("toggle",async()=>{if(b.open===v)return;v=b.open;let _=b.dataset.assetId,q=b.dataset.assetRelationshipSection;if(!(!_||!q)&&(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(_,q,b.open),!!b.open)){if(u(q)){let C=b.querySelector?.(".mini-list");C&&(C.textContent="Loading work history..."),await i(_)}else if(q==="asset-history")await c(_);else return;b.isConnected===!1||!b.open||f()}}),b.open&&u(b.dataset.assetRelationshipSection)&&e.getAssetWorkHistory?.(b.dataset.assetId)?.historyStatus==="idle"&&i(b.dataset.assetId).then(()=>{b.isConnected!==!1&&b.open&&f()})}),n.querySelectorAll("[data-asset-relation-page]").forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let _=b.dataset.assetId,q=b.dataset.assetRelationSection,O=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(_,q):1)+(b.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(_,q,O),f()})}),n.querySelectorAll("[data-open-asset-history]").forEach(b=>{b.addEventListener("click",async v=>{v.preventDefault(),v.stopPropagation();let _=b.dataset.openAssetHistory;_&&(a.setActiveAssetId(_),a.setActiveWorkOrderId(null),r(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(_),await c(_),e.renderWorkspace(),m())})}),n.querySelectorAll("[data-back-asset-history]").forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let _=b.dataset.backAssetHistory;_&&a.setActiveAssetId(_),o(),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-history-page]").forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation();let _=b.dataset.assetId,C=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(_,"asset-history"):1)+(b.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(_,"asset-history",C),e.renderWorkspace(),m()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}function m(){let r=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>s(r));return}s(r)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(r=>{r.addEventListener("click",()=>{t.setPartInventoryFilter(r.dataset.partInventoryFilter),e.resetPartsPage(),m()})}),n.querySelectorAll("[data-part-sort]").forEach(r=>{r.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(r.value||"default"),e.resetPartsPage(),m())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(r=>{r.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===r.dataset.assetStatusFilter?"all":r.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),m()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(r=>{r.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===r.dataset.assetTypeFilter?"all":r.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),m()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(r=>{r.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(r.value||"all"),e.resetAssetsPage(),m())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(m){e.showNotice(`Could not update status: ${m.message||m}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",a=>a.stopPropagation()),t.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var wa=Q(Mt()),va=Q(Dt());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let m=e.getWorkOrderById(s.dataset.id);if(!m)return;let r=s.dataset.copyDowntime==="subject",i=r?e.downtimeEmailSubject(m):e.downtimeEmailBody(m),c=await e.copyTextToClipboard(i);s.textContent=c?"Copied":"Copy failed",a(()=>{s.textContent=r?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var qa=Q(Tt());(function(){function l(e={}){let n=e.documentRef||document;function t(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(m),e.renderWorkspace()}async function a(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let r=e.getPhotoPathsByWorkOrder(m);if(r.length){let c=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(r),"Work order photo cleanup timed out.",15e3);c.error&&e.warnRef("Work order photo storage cleanup failed",c.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(m),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(r){e.alertRef(`Could not delete work order: ${r.message||r}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(m=>{m.addEventListener("click",r=>{r.stopPropagation(),t(m.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(m=>{m.addEventListener("click",r=>{r.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(m=>{m.addEventListener("click",async r=>{r.stopPropagation(),await a(m.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:a,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace;if(!t||typeof a!="function")return;let s=0;async function m(r){let i=++s,c=()=>i===s&&r.isConnected!==!1;try{if(e.loadPartDetail&&await e.loadPartDetail(r.dataset.openPart,{isCurrent:c})===!1||!c())return;t.setActivePartId(r.dataset.openPart),a()}catch(u){c()&&e.showNotice?.(`Could not open part: ${u.message||u}`,"warning")}}n.querySelectorAll("[data-open-part]").forEach(r=>{r.addEventListener("click",()=>m(r)),r.addEventListener("keydown",i=>{i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),m(r))})}),n.querySelectorAll("[data-close-part-detail]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setActivePartId(null),t.setShowPartSourceManager(!1),a()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(r=>{r.addEventListener("click",()=>{s++,t.setShowPartSourceManager(!t.getShowPartSourceManager()),a()})})}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.messageComposerScopeNote,m=e.autoGrowTextarea;if(!t||typeof a!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(f=>f.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(f=>f.addEventListener("click",()=>e.setMessageView?.(f.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(f=>f.addEventListener("click",()=>e.quoteMessage?.(f.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(f=>f.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async f=>{f.currentTarget.disabled=!0;let o=f.currentTarget;try{await e.loadOlderMessages?.()}finally{o.isConnected&&(o.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let o=f.dataset.messageFilter;t.setMessageThreadFilter(o),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageThreadFilter",o),r.setItem("maintainops.messageThreadsPage","1"),a()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(f.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),r.setItem("maintainops.activeSection","work"),a()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{let f=n.querySelector('#message-thread-form [name="work_order_id"]');f&&(f.value=""),t.setMessageComposerWorkOrderId(""),r.setItem("maintainops.messageComposerWorkOrderId",""),a()});let c=n.querySelector("#message-search");c&&c.addEventListener("input",()=>{let f=c.value;t.setMessageSearchQuery(f),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),r.setItem("maintainops.messageSearchQuery",f),r.setItem("maintainops.messageThreadsPage","1"),a();let o=n.querySelector("#message-search");o&&(o.focus({preventScroll:!0}),o.selectionStart!=null&&o.setSelectionRange(c.selectionStart,c.selectionEnd))});let u=n.querySelector("#message-thread-form");if(u){let f=u.querySelector("#message-thread-type"),o=u.querySelector(".message-direct-field"),d=u.querySelector("#message-scope-note");if(f&&o&&d&&typeof s=="function"){let g=()=>{let p=f.value==="direct";o.classList.toggle("hidden-section",!p);let h=o.querySelector("select");h&&(h.disabled=!p,h.required=p);let y=u.querySelector("[name='title']");y&&(y.required=!p),d.textContent=s(f.value),e.showExistingConversation?.(p?h?.value:"")};f.addEventListener("change",g),o.querySelector("select")?.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let o=n.querySelector("#message-thread-form");if(!o)return;let d=o.querySelector("details"),g=o.querySelector("#message-thread-type"),p=o.querySelector("select[name='direct_user_id']"),h=o.querySelector(".message-direct-field"),y=o.querySelector("#message-scope-note"),b=o.querySelector("input[name='title']");d&&(d.open=!0),g&&(g.value="direct"),p&&(p.value=f.dataset.messagePerson||"",p.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),b&&b.focus(),p?.dispatchEvent(new Event("change",{bubbles:!0}))})}),n.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let d=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!d)return;let g=d.value.trim();d.value=g?`${g}
${f.dataset.quickReply}`:f.dataset.quickReply,d.dispatchEvent(new Event("input",{bubbles:!0})),d.focus(),typeof m=="function"&&m(d)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof a!="function"||typeof s!="function")return;let m=n.querySelector("#part-search-form");if(!m)return;let r=c=>{t.setPartSearchQuery(c||""),s(),a()},i=m.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{r(i.value||"");let c=n.querySelector("#part-search");if(!c)return;c.focus();let u=c.value.length;c.setSelectionRange(u,u)}),m.addEventListener("submit",c=>{c.preventDefault();let u=e.FormDataRef||FormData,f=new u(m).get("part_search")||"";r(f),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(m=>{m.addEventListener("click",async()=>{let r=performance.now(),i=m.dataset.section;e.visibleNavItems().some(([c])=>c===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,r))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;async function s(m){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(m),e.getActiveThreadId&&e.getActiveThreadId()!==m||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(m),(!e.getActiveThreadId||e.getActiveThreadId()===m)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==m)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(m=>{m.addEventListener("click",async()=>{let r=m.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(r),a.setItem("maintainops.activeMessageThreadId",r),await s(r)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(m=>{m.addEventListener("click",async()=>{let r=m.dataset.openWorkMessageThread;t.setActiveMessageThreadId(r),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",r),a.setItem("maintainops.activeSection","messages"),await s(r)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let m=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(m),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",m),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",async()=>{if(t.disabled)return;t.disabled=!0;let a=t.textContent;t.textContent="Exporting...";try{await e.exportActiveSectionCsv()}finally{t.disabled=!1,t.textContent=a}})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var Fa=Q(It());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(a=>{l(a),a.addEventListener("input",()=>l(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var ja=Q(Ft());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(m=>{m.addEventListener("click",async()=>{let r=await t(m.dataset.copyTeamInvite||"");m.textContent=r?"Copied":"Copy failed",a(()=>{m.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(m=>{m.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(m=>{m.addEventListener("click",()=>{t.setQuickFixAssetId(m.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var Ya=Q(Lt());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(m=>{m.addEventListener("click",async()=>{let r=await t(m.dataset.copyPublicRequestLink);m.textContent=r?"Copied":"Copy failed",a(()=>{m.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ja=Q(Nt());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{t(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let m=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(a.dataset.createFollowUp,m?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var to=Q(Ut());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,a=n.querySelector("#comment-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,a=n.querySelector("#quick-update-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,a=n.querySelector("#edit-work-order-form");!a||typeof t!="function"||a.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{t(a),a.addEventListener("change",()=>t(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var so=Q(Qt()),co=Q(Bt()),lo=Q(jt()),uo=Q(zt()),po=Q(Vt()),mo=Q(Ht()),fo=Q(Gt()),go=Q(Yt()),ho=Q(Kt()),yo=Q(Jt()),bo=Q(Zt()),wo=Q(Xt()),vo=Q(en()),ko=Q(tn()),_o=Q(nn()),qo=Q(rn()),So=Q(an()),Co=Q(on()),$o=Q(sn()),Po=Q(cn()),Ao=Q(ln()),Eo=Q(un()),Ro=Q(dn()),Oo=Q(pn()),Wo=Q(mn());(function(){function l(e){function n(a){return e[a]()}function t(a,s=n("requestViewFilter")){let m=a.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(m=m.eq("location_id",n("activeLocationId"))),s==="converted"?m=m.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(m=m.eq("status","submitted").is("converted_work_order_id",null));let r=e.postgrestSearchTerm(n("searchQuery"));if(r){let i=`%${r}%`,c=n("assets").filter(e.matchesActiveLocation).filter(u=>e.matchesQuery([u.name,u.asset_code,u.asset_tag,u.manufacturer,u.model,u.location,u.status,u.asset_type,e.parentAssetFor()(u)?.name],r)).map(u=>u.id).slice(0,e.SEARCH_ID_PAGE_SIZE);m=m.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...c.length?[`asset_id.in.(${c.join(",")})`]:[]].join(","))}return m}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(d){return e[d]()}async function t(){let d=n("searchQuery").trim();if(!d||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.asset_code,b.asset_tag,b.manufacturer,b.model,b.location,b.status,b.asset_type,e.parentAssetFor()(b)?.name],d)).map(b=>b.id),p=n("procedureTemplates").filter(b=>e.matchesQuery([b.name,b.description,...(b.procedure_steps||[]).map(v=>v.prompt)],d)).map(b=>b.id),h=n("parts").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.sku,b.supplier_name,b.quantity_on_hand,b.reorder_point,b.unit_cost],d)).map(b=>b.id),y=new Set;await Promise.all([a(y,h),s(y,"work_order_comments",["body"],d),s(y,"work_order_events",["event_type","summary"],d),s(y,"work_order_photos",["file_name"],d),s(y,"work_order_step_results",["value"],d)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:p.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function a(d,g,p={}){if(!g.length)return;let y=p.maxRows??300;for(let b of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",b),v=>{v.forEach(_=>{_.work_order_id&&d.add(_.work_order_id)}),y-=v.length},y)}catch(v){e.warn("Part-linked work order search failed",v);return}}}async function s(d,g,p,h,y={}){let b=e.postgrestSearchTerm(h);if(!b)return;let v=p.map(q=>`${q}.ilike.%${b}%`).join(","),_=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(v),q=>{q.forEach(C=>{C.work_order_id&&d.add(C.work_order_id)})},_)}catch(q){e.warn(`${g} work order search failed`,q)}}async function m(d={}){let g=await r(),p=g.length,h=Math.max(1,Math.ceil(p/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,b=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(C=>C.id);if(!b.length)return{data:[],error:null,count:p};let v=d.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),_=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:v,ids:b});if(_.error)return _;let q=new Map((_.data||[]).map(C=>[C.id,C]));return{..._,data:b.map(C=>q.get(C)).filter(Boolean),count:p}}async function r(){let d=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===d)return g.rows;let p=n("searchQuery").trim(),h=new Map;await i(h,p);let y=n("assets").filter(e.matchesActiveLocation).filter(C=>e.matchesQuery([C.name,C.asset_code,C.asset_tag,C.manufacturer,C.model,C.location,C.status,C.asset_type,e.parentAssetFor()(C)?.name],p)).map(C=>C.id),b=n("procedureTemplates").filter(C=>e.matchesQuery([C.name,C.description,...(C.procedure_steps||[]).map(O=>O.prompt)],p)).map(C=>C.id),v=n("parts").filter(e.matchesActiveLocation).filter(C=>e.matchesQuery([C.name,C.sku,C.supplier_name,C.quantity_on_hand,C.reorder_point,C.unit_cost],p)).map(C=>C.id);await Promise.all([c(h,"asset_id",y),c(h,"procedure_template_id",b)]);let _=new Set;await Promise.all([a(_,v,{maxRows:1/0}),s(_,"work_order_comments",["body"],p,{maxRows:1/0}),s(_,"work_order_events",["event_type","summary"],p,{maxRows:1/0}),s(_,"work_order_photos",["file_name"],p,{maxRows:1/0}),s(_,"work_order_step_results",["value"],p,{maxRows:1/0})]),await u(h,[..._]);let q=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:d,rows:q}),q}async function i(d,g){let p=e.postgrestSearchTerm(g);if(!p)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${p}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),y=>o(d,y))}async function c(d,g,p){if(p.length)for(let h of e.chunkArray(p,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(g,h),y=>o(d,y))}async function u(d,g){if(g.length)for(let p of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",p),h=>o(d,h))}function f(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function o(d,g){(g||[]).forEach(p=>{p?.id&&d.set(p.id,{...d.get(p.id)||{},...p})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:m,exactWorkOrderSearchRows:r,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(r){return e[r]()}function t(){let r=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),c=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.asset_tag,g.manufacturer,g.model,g.location,g.status],r)).sort((g,p)=>g.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],r)).sort((g,p)=>g.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],r)).sort((g,p)=>new Date(p.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),o=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],r)).sort((g,p)=>String(g.next_due_at||"").localeCompare(String(p.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(p=>p.prompt)],r)).sort((g,p)=>g.name.localeCompare(p.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:c,parts:u,requests:f,pm:o,procedures:d}}function a(r="all"){let i=e.startOfToday(),c=new Date(i);return c.setDate(c.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(u=>u.status!=="completed").filter(u=>e.matchesSearch([u.title,u.description,u.priority,u.status,u.assets?.name,e.assignmentLabel(u)])).filter(u=>r==="no_due"?!u.due_at:!!u.due_at).map(u=>{let f=u.due_at?new Date(`${u.due_at}T00:00:00`):null;return{kind:r==="no_due"?"no_due":"work",id:u.id,title:u.title,priority:u.priority,status:u.status,assetName:u.assets?.name||"No equipment",dueAt:u.due_at,due:f,createdAt:u.created_at||"",assignedTo:e.assignmentLabel(u),workOrder:u}}).filter(u=>r==="no_due"?!0:r==="overdue"?u.due<i:r==="today"?u.due.getTime()===i.getTime():r==="soon"?u.due>i&&u.due<=c:!0).sort((u,f)=>{if(r==="no_due"){let o={critical:4,high:3,medium:2,low:1};return(o[f.priority]||0)-(o[u.priority]||0)||new Date(u.createdAt||0)-new Date(f.createdAt||0)}return u.due-f.due})}function s(){let r=e.startOfToday(),i=new Date(r);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(c=>{let u=new Date(`${c.next_due_at}T00:00:00`);return u>=r&&u<=i}).filter(c=>e.matchesSearch([c.title,c.frequency,c.next_due_at,c.assets?.name])).map(c=>({kind:"pm",id:c.id,title:c.title,assetName:c.assets?.name||"No equipment",dueAt:c.next_due_at,due:new Date(`${c.next_due_at}T00:00:00`)})).sort((c,u)=>c.due-u.due)}function m(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(r=>r.follow_up_needed).filter(r=>e.matchesSearch([r.title,r.description,r.failure_cause,r.resolution_summary,r.assets?.name,r.assigned_profile?.full_name])).map(r=>({kind:"follow_up",id:r.id,title:r.title,assetName:r.assets?.name||"No equipment",completedAt:r.completed_at?new Date(r.completed_at).toLocaleDateString():"not completed",resolution:r.resolution_summary||r.completion_notes||"",workOrder:r})).sort((r,i)=>r.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:a,planningPmItems:s,followUpItems:m}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,a){return n.from("locations").insert({company_id:t,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(m,r){return m.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",r)}function e(m,r){return m.from("company_members").select("*").eq("company_id",r).order("created_at",{ascending:!0})}function n(m,r){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",r).order("created_at",{ascending:!1})}function t(m,r){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",r).order("created_at",{ascending:!1})}function a(m,r){return m.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",r).order("created_at",{ascending:!1})}function s(m,r){return m.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",r).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:a,listRequestNotificationRecipients:s}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(c,u,f={}){return c.from("work_orders").select(u,f)}function e(c){return c.from("work_orders").select("id",{count:"exact",head:!0})}function n(c,u,f,o){return c.from("work_orders").select(o).eq("company_id",u).eq("id",f).maybeSingle()}async function t(c,u,f){let o=()=>e(c).eq("company_id",u).eq("asset_id",f),[d,g]=await Promise.all([o().neq("status","completed"),o().eq("status","completed")]),p=d.error||g.error;return p?{error:p}:[d.count,g.count].every(h=>Number.isInteger(h)&&h>=0)?{data:{open:d.count,completed:g.count},error:null}:{error:new Error("Equipment work counts are unavailable.")}}async function a(c,u,f,o){let d=[];for(;;){let g=await c.from("work_orders").select(o,{count:"exact"}).eq("company_id",u).eq("asset_id",f).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}).order("id",{ascending:!0}).range(d.length,d.length+999);if(g.error)return g;let p=g.data||[];if(d.push(...p),!p.length||(Number.isInteger(g.count)?d.length>=g.count:p.length<1e3))return{data:d,error:null}}}async function s(c,u){let{companyId:f,locationId:o,locationsReady:d,selectClause:g,ids:p}=u,h=c.from("work_orders").select(g).eq("company_id",f).in("id",p);return d&&o&&(h=h.eq("location_id",o)),h}function m(c,u){let{companyId:f,locationId:o,locationsReady:d}=u,g=c.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",f);return d&&o&&(g=g.eq("location_id",o)),g}function r(c,u){let{companyId:f,locationId:o,locationsReady:d}=u,g=c.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",f).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return d&&o&&(g=g.eq("location_id",o)),g.order("id",{ascending:!0})}async function i(c,u,f=1/0,o=1e3){let d=0,g=0;for(;g<f;){let p=Math.min(o,f-g),{data:h,error:y}=await c().range(d,d+p-1);if(y)throw y;let b=h||[];if(u(b),g+=b.length,b.length<p)break;d+=p}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:a,fetchAssetWorkOrderCounts:t,fetchWorkOrdersByIds:s,scopedWorkOrderSearchQuery:m,scopedTeamWorkloadQuery:r,fetchPagedSearchRows:i}})();var Uo=Q(fn());(function(){function l(s){return s.rpc("get_my_companies")}function e(s,m){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",m).order("created_at",{ascending:!0})}function n(s,m){return s.from("company_members").select("company_id, role").eq("user_id",m).order("created_at",{ascending:!0})}function t(s,m){return s.from("companies").select("id, name, logo_path, created_at").in("id",m).order("created_at",{ascending:!0})}function a(s,m){return s.from("companies").select("id, name, created_at").in("id",m).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:a}})();(function(){function l(a,s){return a.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(a,s){return a.from("app_issue_reports").insert(s)}function n(a,s,m,r){return a.from("app_issue_reports").update({status:r,resolved_at:r==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",m)}function t(a,s,m){return a.from("app_issue_reports").delete().eq("company_id",s).eq("id",m)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,a){return t.from("user_preferences").select(l).eq("user_id",a).maybeSingle()}function n(t,a,s){return t.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var zo=Q(gn()),Vo=Q(hn()),Ho=Q(yn()),Go=Q(bn());(function(){function l(t,a,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${a}</strong></article>`}function e(t,a,s,m="neutral"){return`
    <article class="insight dashboard-card tone-${m}">
      <span>${t}</span>
      <strong>${a}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(r=>String(r||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),m=window.MaintainOpsDom?.escapeHtml||(r=>String(r??""));return`
    <section class="team-role-guide">
      ${t.map(r=>`
        <article>
          <strong>${a(r)}</strong>
          <span>${m(s(r))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var Ko=Q(wn());(function(){function l(f,o,d="active",g={},p){let h=p.getActiveStatusFilter(),y=g.filter||g.section,b=y?"button":"article",v=g.filter&&h===g.filter?" selected":"",_=d.includes("overdue")&&Number(o)>=3,q=_?" alert-blink":"",C=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),O=C?` ${C}`:"";return`
    <${b} class="gauge-readout ${d}${v}${q}"${O}>
      ${_?'<span class="gauge-alert-badge" aria-hidden="true">!</span>':""}
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
    </${b}>
  `}function e(f){let o=f.getWorkOrderDashboardCounts()||{},d=o.activeWork||0,g=o.newWork||0,p=o.inProgress||0,h=o.blocked||0,y=o.overdue||0,b=o.completedAll||0,v=o.completedMonth||0,_=o.completedWeek||0,q=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",d,"active",{filter:"active"},f)}
      ${l("New",g,"new",{filter:"open"},f)}
      ${l("In Progress",p,"in_progress",{filter:"in_progress"},f)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${l("Overdue",y,"overdue",{filter:"overdue"},f)}
      ${l("Requests",q,"request",{filter:"requests"},f)}
      ${l("All Completed",b,"completed",{filter:"completed"},f)}
      ${l("Completed Month",v,"completed",{filter:"completed_month"},f)}
      ${l("Done This Week",_,"completed",{filter:"completed_week"},f)}
    </div>
  `}function n(f,o){let d=f||{},g=d.newWork||0,p=d.inProgress||0,h=d.blocked||0,y=d.activeWork??g+p+h,b=d.overdue||0,v=d.completedAll||0,_=d.completedMonth||0,q=d.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",y,"active workload-pill",{filter:"active"},o)}
      ${l("New",g,"new workload-pill",{filter:"open"},o)}
      ${l("In Progress",p,"in_progress workload-pill",{filter:"in_progress"},o)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},o)}
      ${l("Overdue",b,"overdue workload-pill",{filter:"overdue"},o)}
      ${l("All Completed",v,"completed workload-pill",{filter:"completed"},o)}
      ${l("Completed Month",_,"completed workload-pill",{filter:"completed_month"},o)}
      ${l("Done This Week",q,"completed workload-pill",{filter:"completed_week"},o)}
    </div>
  `}function t(f){return f.getWorkOrders().filter(o=>f.getDueState(o)?.className==="overdue")}function a(f){return f.getWorkOrders().filter(o=>s(o,f))}function s(f,o,d=new Date){if(!f.completed_at)return!1;let g=new Date(f.completed_at),p=o.sundayWeekRange(d);return Number.isFinite(g.getTime())&&g>=p.start&&g<p.end}function m(f){return f.getWorkOrders().filter(r)}function r(f){let o=new Date,d=new Date(o.getFullYear(),o.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=d)}function i(f){let o=f.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!o.length)return 0;let d=o.reduce((g,p)=>g+Number(p.actual_minutes||0),0);return Math.round(d/o.length)}function c(f){let o=new Date;o.setHours(0,0,0,0);let d=new Date(o);return d.setDate(d.getDate()+7),f.getPreventiveSchedules().filter(g=>{let p=new Date(`${g.next_due_at}T00:00:00`);return p>=o&&p<=d})}function u(f){return Object.freeze({renderGaugeReadout:(o,d,g="active",p={})=>l(o,d,g,p,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:o=>n(o,f),overdueWorkOrders:()=>t(f),completedThisWeek:()=>a(f),isCompletedThisWeek:(o,d)=>s(o,f,d),completedThisMonth:()=>m(f),isCompletedThisMonth:r,averageCompletionMinutes:(o=f.getWorkOrders())=>i(o),preventiveDueSoon:()=>c(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:u})})();(function(){function l(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",forklift:"Forklift / Mobile Lift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:a,getPartInventoryFilter:s,assetTypeLabel:m,assetStatusLabel:r}){function i(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function c(){let f=n(),o=t?t():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${r(f).toLowerCase()} equipment found.`:o!=="all"?`No ${m(o).toLowerCase()} equipment found.`:"No equipment added yet."}function u(){return a().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:c,partEmptyStateText:u}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var ti=Q(vn());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:a,getSearchQuery:s}){function m(p){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(p)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${r("Work Orders",p.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${r("Equipment",p.assets,c,"asset")}
            ${r("Parts",p.parts,u,"parts")}
            ${r("Requests",p.requests,f,"comment")}
            ${r("PM",p.pm,o,"procedure")}
            ${r("Procedure Checklists",p.procedures,d,"procedure")}
          </div>
        </section>
      `}function r(p,h,y,b,v={}){return`
        <section class="global-result-group relationship-detail ${b}">
          <div class="panel-header compact">
            <h3>${e(p)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${v.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
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
      `}function o(p){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(p.title)}" type="button">
          <strong>${e(p.title)}</strong>
          <span>${e(p.assets?.name||"No equipment")} - due ${e(p.next_due_at||"unset")}</span>
        </button>
      `}function d(p){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(p.name)}" type="button">
          <strong>${e(p.name)}</strong>
          <span>${(p.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(p){return Object.values(p).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:m,renderGlobalResultGroup:r,renderGlobalWorkResult:i,renderGlobalAssetResult:c,renderGlobalPartResult:u,renderGlobalRequestResult:f,renderGlobalPmResult:o,renderGlobalProcedureResult:d,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var ri=Q(kn()),ai=Q(_n()),oi=Q(qn());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:a=(c,u)=>u,renderListPagination:s,statusLabel:m,renderRelationshipChips:r,canEditOperationalRecords:i=()=>!0}){function c(d,g,p,h,y={}){let b=n||12,v=typeof t=="function"?t(h):1,_=Math.max(1,Math.ceil(g.length/b)),q=Math.min(Math.max(v,1),_),C=g.slice((q-1)*b,q*b),O=a(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${O?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(d)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${p}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${C.map(o).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${h}`,g.length,q,_):""}
          </div>
        </details>
      `}function u(d,g,p,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(d)}</h3>
            <p>${e(g)}</p>
          </header>
          ${p}
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
        `;if(d.kind==="no_due"){let g=d.createdAt?new Date(d.createdAt):null,p=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(d.priority)} ${e(m(d.status))}</span>
              <strong>${e(d.title)}</strong>
              <p>${e(d.assetName)} - ${e(d.assignedTo||"Unassigned")}</p>
              <p>Created ${e(p)}</p>
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
            <span class="eyebrow">${e(d.priority)} ${e(m(d.status))}</span>
            <strong>${e(d.title)}</strong>
            <p>${e(d.assetName)} - due ${e(d.dueAt)}</p>
          </div>
          ${r(d.workOrder)}
        </article>
      `}return{renderPlanningGroup:c,renderPlanningBoard:f,renderPlanningItem:o}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var si=Q(Sn());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:s,getPartsPage:m,getAssetsPage:r}){function i(o,d){if(o<=e)return"";let g=s(),p=(g-1)*e+1,h=Math.min(o,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${g} of ${d}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=d?"disabled":""}>Next</button>
        </div>
      `}function c(o,d){if(o<=n)return"";let g=m(),p=(g-1)*n+1,h=Math.min(o,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${g} of ${d}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=d?"disabled":""}>Next</button>
        </div>
      `}function u(o,d){if(o<=t)return"";let g=r(),p=(g-1)*t+1,h=Math.min(o,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${p}-${h} of ${o} - Page ${g} of ${d}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=d?"disabled":""}>Next</button>
        </div>
      `}function f(o,d,g,p){if(d<=a)return"";let h=(g-1)*a+1,y=Math.min(d,g*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${d} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:c,renderAssetsPagination:u,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var li=Q(Cn());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:a,matchesActiveLocation:s,isAssetDescendantOf:m,parentAssetFor:r}){function i(g=t()){return n().map(p=>`<option value="${p.id}" ${p.id===g?"selected":""}>${e(p.name)}</option>`).join("")}function c(g){let p=r(g);return p?`${g.name} - part of ${p.name}`:g.name}function u(g=""){let p=a().filter(s).sort((b,v)=>c(b).localeCompare(c(v))),h=g?a().find(b=>b.id===g):null;return(h&&!p.some(b=>b.id===h.id)?[h,...p]:p).map(b=>`<option value="${b.id}" ${b.id===g?"selected":""}>${e(c(b))}</option>`).join("")}function f(g="",p=""){return a().filter(s).filter(h=>h.id!==p&&!m(h.id,p)).sort((h,y)=>c(h).localeCompare(c(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(c(h))}</option>`).join("")}function o(g=""){let p=[...new Set(a().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,b)=>y.localeCompare(b)),h=String(g||"").trim();return h&&!p.includes(h)?[h,...p]:p}function d(g=""){return o(g).map(p=>`<option value="${e(p)}" ${p===g?"selected":""}>${e(p)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:u,renderParentAssetOptions:f,renderAssetAreaOptions:d,assetOptionLabel:c}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function a(s){if(!s.photo_storage_path)return"";let m=s.photo_file_name||s.photo_original_file_name||"Request photo",r=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(m)}">`:""}
          <div>
            <strong>${e(m)}</strong>
            <span>${e(r)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let a=n();return a>0?`<b class="nav-badge nav-message-badge" aria-label="${a} unread conversations and work alerts">${a}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(a){let s=Number(a);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(a){let s=e(a);return s?s>99?"99+":String(s):""}function t(a,s={}){let m=n(a);if(!m)return"";let r=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${r}">${m}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function a(s){let m=n()[s.reporter_id]?.full_name||"Team member",r=t().find(u=>u.id===s.location_id)?.name||"No location",i=s.status||"open",c=s.severity||"normal";return`
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
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:a,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:m}){function r(c){let u=s()[c.id]||[],f=u[u.length-1];return`
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
            ${m()?`
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
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(a,s,m,r,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${m}" type="button">
          <span>${e(a)}</span>
          <strong>${s}</strong>
          <small>${e(r)}</small>
        </button>
      `}function t(a){return a.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:m,getMessageThreads:r,getPartsUsedByWorkOrder:i}){function c(u){let f=r().filter(p=>p.work_order_id===u.id).length,o=(i()[u.id]||[]).reduce((p,h)=>p+(Number(h.quantity_used)||0),0),d=u.asset_id?s(u)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=u.status==="completed"?"Review history or create follow-up if needed":u.status==="blocked"?"Resolve blocker or add current update":u.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
          ${m(u)}
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
      `}function s(){let m=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${m.map(r=>`
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
      `}return{renderPartSourceOptions:a,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:a,parentAssetFor:s,childAssetsFor:m}){function r(i){let c=t().filter(o=>o.asset_id===i.id&&o.status!=="completed").length,u=s(i),f=m(i.id);return`
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
        ${t().map(m=>`<option value="${m.id}" ${m.id===s?"selected":""}>${e(m.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function a(m){let r=n().filter(i=>i.thread_id===m.id).map(i=>t(i.user_id));return r.length?r.join(", "):"Direct message"}function s(m){return m.thread_type==="direct"?a(m):m.thread_type==="location"?`Company team / ${e().find(r=>r.id===m.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:a,unreadMessageCount:s,getMessagesByThreadId:m,getActiveMessageThreadId:r,threadTitle:i=c=>c.title}){function c(u){let o=(m()[u.id]||[]).filter(C=>!C.deleted_at),d=u.latest_message||o[o.length-1],g=s(u.id),p=i(u),h=String(p||"MO").trim().split(/\s+/).slice(0,2).map(C=>Array.from(C)[0]).join("").toUpperCase(),y=Math.abs([...String(p)].reduce((C,O)=>C*31+O.charCodeAt(0)|0,0))%6,b=d?.body?`${e(t(d.sender_id))}: ${e(d.body)}`:"Attachment",v=new Date(d?.created_at),_=v.toDateString()===new Date().toDateString(),q=d?_?v.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):n(d.created_at):"";return`
        <button class="message-thread-button ${u.id===r()?"active":""} ${g?"unread":""}" data-message-thread="${u.id}" aria-current="${u.id===r()?"true":"false"}" type="button">
          <span class="message-thread-avatar" data-tone="${y}" aria-hidden="true">${u.thread_type==="direct"?e(h):"#"}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${e(p)}</strong><time datetime="${e(d?.created_at||"")}" title="${e(d?n(d.created_at):"")}">${e(q)}</time></span>
          <span class="message-row-preview"><small>${d?b:"No messages yet"}</small>${g?`<span class="message-unread-pill" aria-label="${g} unread messages">${g}</span>`:""}</span>
          <span class="message-row-scope">${u.work_order_id?"Work order / ":""}${e(a(u))}${u.preferences?.muted?" / Muted":""}</span>
          </span>
        </button>
      `}return{renderMessageThreadButton:c}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var $i=Q($n());(function(){function l({getLocations:e}){function n(t){let a=e().find(s=>s.id===t.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function a(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function a(s){let m=n(s),r=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),c=e.cleanWorkOrderDescription(s.description)||s.title,u=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${m} is down or needs maintenance attention. At this time, the expected downtime is ${r}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${c}`,`Work order: ${s.title}`,`Equipment: ${m}`,`Current update: ${u}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let a=t?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,m){let r=n(s);return m!==e.OUTSIDE_VENDOR_VALUE?r||null:[r,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(s,m){let r=String(s||"").trim();if(!m?.photo_storage_path)return r||null;let i="[Request photo attached to original request]";return r?`${r}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let a=[];return n.title!==t.title&&a.push("title"),(n.description||"")!==(t.description||"")&&a.push("description"),(n.due_at||"")!==(t.due_at||"")&&a.push("due date"),n.priority!==t.priority&&a.push("priority"),(n.type||"corrective")!==t.type&&a.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&a.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&a.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,a,s=[]){return[...n.map(m=>({...m,type:"comment"})),...t.map(m=>({...m,type:"photo"})),...s.map(m=>({...m,type:"part"})),...a.map(m=>({...m,type:"event"}))].sort((m,r)=>new Date(r.created_at)-new Date(m.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(r){return Number(r.quantity_on_hand)<=Number(r.reorder_point)}function t(){return e.getParts().filter(n)}function a(r){let i=e.getPartSearchQuery().trim().toLowerCase();return i?r.some(c=>String(c??"").toLowerCase().includes(i)):!0}function s(){let r=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:a([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...r].sort((i,c)=>{let u=String(i.supplier_name||"zzzzzz").localeCompare(String(c.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return u||String(i.name||"").localeCompare(String(c.name||""),void 0,{sensitivity:"base"})}):r}function m(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(r=>String(r.supplier_name||"").trim()).filter(Boolean))].sort((r,i)=>r.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:a,partSourceOptions:m}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function a(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,c=e.getRequestViewFilter()){return c==="converted"?a(i):c==="all"?!0:!a(i)&&i.status==="submitted"}function m(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(c=>t(c)&&s(c,i))}function r(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:a,requestMatchesViewFilter:s,filteredRequests:m,requestFilterCounts:r}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function n(t){let a=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(m){return e.getAssets().find(r=>r.id===m?.parent_asset_id)||null}function t(m){return e.getAssets().filter(r=>r.parent_asset_id===m).sort((r,i)=>r.name.localeCompare(i.name))}function a(m,r){if(!m||!r)return!1;let i=e.getAssets().find(u=>u.id===m),c=new Set;for(;i?.parent_asset_id&&!c.has(i.id);){if(i.parent_asset_id===r)return!0;c.add(i.id),i=e.getAssets().find(u=>u.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(m=>!e.matchesActiveLocation(m)||e.getAssetStatusFilter()!=="all"&&m.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(m.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(m.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([m.name,m.asset_code,m.asset_tag,m.manufacturer,m.model,m.location,m.status,m.asset_type,n(m)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();var Qi=Q(Pn());(function(){function l(e){function n(a){let s=e.getSearchQuery().trim().toLowerCase();return s?a.some(m=>String(m??"").toLowerCase().includes(s)):!0}function t(a,s=e.getSearchQuery()){let m=s.trim().toLowerCase();return m?a.some(r=>String(r??"").toLowerCase().includes(m)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(r){return r.due_at?new Date(`${r.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(r){return{low:1,medium:2,high:3,critical:4}[r]||0}function a(r){return r.completed_at?new Date(r.completed_at).getTime():0}function s(r){return typeof e.assignmentLabel=="function"?e.assignmentLabel(r):r.assigned_profile?.full_name||r.assigned_to||"Unassigned"}function m(r,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(i)-a(r)||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="due"?n(r)-n(i)||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(r.priority)||n(r)-n(i):e.getWorkSort()==="type"?String(r.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(r.created_at):e.getWorkSort()==="assigned"?s(r).localeCompare(s(i))||new Date(i.created_at)-new Date(r.created_at):new Date(i.created_at)-new Date(r.created_at)}return{compareWorkOrders:m,dueSortValue:n,prioritySortValue:t,completedSortValue:a,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(a){return a?.location_id||a?.assets?.location_id||null}function t(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(a)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(c=>{let u=e.isConversationArchived?.(c)||!1;if(i==="archived")return u&&e.matchesQuery(a(c),e.getMessageSearchQuery());if(u)return!1;let f=i==="all"||i==="favorites"&&c.preferences?.favorite||i==="unread"&&s(c.id)>0||c.thread_type===i,o=e.getMessageSection?.()||"";return f&&(!o||c.preferences?.section_name===o)&&e.matchesQuery(a(c),e.getMessageSearchQuery())}).sort((c,u)=>+!!u.preferences?.favorite-+!!c.preferences?.favorite)}function a(i){let c=e.getMessageThreadMembers().filter(u=>u.thread_id===i.id).map(u=>e.teamMemberName(u.user_id));return[i.title,e.messageThreadScopeLabel(i),...c]}function s(i){let c=e.getMessageReadsByThreadId()[i]?.last_read_at,u=c?new Date(c).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(f=>f.deleted_at||f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>u).length}function m(){return e.getMessageThreads().filter(i=>!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}function r(){return e.getMessageThreads().filter(i=>i.thread_type==="direct"&&!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:a,unreadMessageCount:s,totalUnreadMessages:m,directUnreadMessages:r}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(t)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(t):a==="completed_week"?e.isCompletedThisWeek(t):a==="active"||a==="all"?t.status!=="completed":t.status===a}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let a=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],m=e.getEventsByWorkOrder()[t.id]||[],r=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(f=>f.id===t.procedure_template_id),c=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),u=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,u[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...a.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...s.flatMap(f=>[f.body,u[f.author_id]?.full_name]),...m.flatMap(f=>[f.event_type,f.summary,u[f.actor_id]?.full_name]),...r.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...c.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===t:e.isWorkOrderAssignedToUser(a,t))&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var Zi=Q(An()),Xi=Q(En()),es=Q(Rn()),ts=Q(On()),ns=Q(Wn()),rs=Q(xn()),as=Q(Mn());(function(){function l(t){if(!t)return"";let a=new Date(t),s=new Date,m=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),i=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r===m?`Today ${i}`:r===m-864e5?`Yesterday ${i}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let a=new Date(t),s=new Date,m=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return r===m?"Today":r===m-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let a=String(t||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();window.MaintainOpsEquipmentCreateDrafts={createEquipmentCreateDrafts:Et};})();
//# sourceMappingURL=runtime.aa66f9c6ee.js.map
