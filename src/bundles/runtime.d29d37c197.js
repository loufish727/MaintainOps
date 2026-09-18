(()=>{var En=Object.create;var qt=Object.defineProperty;var Rn=Object.getOwnPropertyDescriptor;var On=Object.getOwnPropertyNames;var Wn=Object.getPrototypeOf,xn=Object.prototype.hasOwnProperty;var U=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Mn=(l,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of On(e))!xn.call(l,o)&&o!==n&&qt(l,o,{get:()=>e[o],enumerable:!(t=Rn(e,o))||t.enumerable});return l};var Q=(l,e,n)=>(n=l!=null?En(Wn(l)):{},Mn(e||!l||!l.__esModule?qt(n,"default",{value:l,enumerable:!0}):n,l));var St=U((Tn,De)=>{(function(){let l=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,o=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},m=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),a=m(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:a,workspaceLoadPending:!1,workspaceLoadWasHidden:o?.visibilityState==="hidden",navigationStartedAt:m(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},c=new Map,u=0;function d(x){if(x==null||x==="")return null;let b=Number(x);return Number.isFinite(b)&&b>=0?b:null}function r(){let x=s.connection||s.mozConnection||s.webkitConnection,b=t?.matchMedia?.("(pointer: coarse)")?.matches,$=d(s.deviceMemory),A=d(s.hardwareConcurrency),R=$!==null&&$<=4||A!==null&&A<=4||b?"constrained":"standard",S=d(t?.innerWidth);return{source:"browser",device_tier:R,viewport_class:S!==null&&S<720?"mobile":S!==null&&S<1100?"tablet":"desktop",connection_type:String(x?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!x?.saveData}}function p(x={}){let b={...r(),measurement_version:n,...x};return Object.fromEntries(Object.entries(b).filter(([,$])=>$!=null&&$!==""))}function g(x=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,h()},x))}function f(x,b,$={},A={}){if(!l.has(x))return!1;let R=d(b);if(R===null)return!1;let S=Number(R.toFixed(x==="cls"?4:2));return i.latest[x]={metric:x,value:S,unit:e[x],context:p($),measuredAt:new Date().toISOString()},A.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:x,value:S,unit:e[x],context:p($)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(A.immediate?250:12e3)),!0}async function h(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let x=i.companyId,b=i.pending.splice(0,20),$=null;try{$=(await i.client.rpc("record_app_performance_samples",{target_company_id:x,samples:b})).error||null}catch(R){$=R}if(!$)return i.pending.length&&g(1e3),!0;i.companyId===x&&i.pending.unshift(...b);let A=String($.message||$).toLowerCase();return i.disabledUntil=Date.now()+(A.includes("could not find")||A.includes("does not exist")?3e5:6e4),!1}function y({client:x,companyId:b}){if(i.client=x||null,i.companyId=b||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,f("session_start",1,{source:"workspace"},{immediate:!0});let $=s.connection||s.mozConnection||s.webkitConnection;d($?.downlink)!==null&&f("connection_downlink_mbps",$.downlink,{source:"browser-estimate"}),d($?.rtt)!==null&&f("connection_rtt_ms",$.rtt,{source:"browser-estimate"})}g(250)}}function w(){i.workspaceStartedAt=m(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=o?.visibilityState==="hidden"}function k(x){if(!x)return;if(i.workspaceCompanies.has(x)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(x);let b=!i.workspaceLoadWasHidden&&o?.visibilityState!=="hidden";f("workspace_ready_ms",m()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:b}),i.workspaceLoadPending=!1,i.latest.cls||f("cls",u,{source:"performance-observer"},{persist:!1}),b&&t?.setTimeout?.(()=>P(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function P(x=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let b=new Set(x);Object.values(i.latest).filter($=>b.has($.metric)).forEach($=>{let A=$.metric==="inp_ms";(A?i.lastPersistedInpValue===$.value:i.persistedVitals.has($.metric))||f($.metric,$.value,{source:"performance-observer"})&&(A?i.lastPersistedInpValue=$.value:i.persistedVitals.add($.metric))})}function C(x=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,P(["inp_ms"])},x))}function E(){i.navigationStartedAt=m()}function O(x){let b=Number(x);return o?.visibilityState==="hidden"||Number.isFinite(b)&&i.lastHiddenAt>=b}function q(x,b=i.navigationStartedAt){f("section_navigation_ms",m()-b,{source:String(x||"workspace").slice(0,48)},{persist:!O(b)})}function _(x,b,$=null){f("query_latency_ms",m()-b,{source:String(x||"query").slice(0,48)},{persist:!O(b)}),$&&f("client_error",1,{source:`query:${String(x||"unknown").slice(0,36)}`},{immediate:!0})}function v(x={}){let b={source:"performance-room",quality_tier:x.qualityTier||"unknown"};Object.entries({spatial_ready_ms:x.readyMs,spatial_fps:x.fps,spatial_frame_ms:x.frameMs,spatial_slow_frame_pct:x.slowFramePercent,spatial_draw_calls:x.drawCalls,spatial_triangles:x.triangles,spatial_geometries:x.geometries,spatial_textures:x.textures,webgl_context_loss:Number(x.contextLosses)>0?x.contextLosses:void 0}).forEach(([$,A])=>{d(A)!==null&&f($,A,b)}),g(500)}function I(){return{latest:{...i.latest},connection:r(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function D(x,b,$={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(x)))try{new PerformanceObserver(R=>b(R.getEntries())).observe({type:x,...$})}catch{}}D("paint",x=>{let b=x.find($=>$.name==="first-contentful-paint");b&&f("fcp_ms",b.startTime,{source:"performance-observer"},{persist:!1})}),D("largest-contentful-paint",x=>{let b=x.at(-1);b&&f("lcp_ms",b.startTime,{source:"performance-observer"},{persist:!1})}),D("layout-shift",x=>{x.forEach(b=>{b.hadRecentInput||(u+=b.value)}),f("cls",u,{source:"performance-observer"},{persist:!1})}),D("event",x=>{x.forEach($=>{$.interactionId&&c.set($.interactionId,Math.max(c.get($.interactionId)||0,$.duration))});let b=[...c.values()].sort(($,A)=>A-$);b.length&&(f("inp_ms",b[Math.min(Math.floor(b.length/50),10)],{source:"performance-observer"},{persist:!1}),C())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>f("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>f("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=m(),f("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&f("reconnect_ms",m()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),o?.addEventListener?.("visibilitychange",()=>{o.visibilityState==="hidden"&&(i.lastHiddenAt=m(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),P(),h())});let W={beginWorkspaceLoad:w,configure:y,flush:h,markNavigationStart:E,markWorkspaceReady:k,record:f,recordQueryLatency:_,recordSectionNavigation:q,recordSpatial:v,snapshot:I};typeof window<"u"&&(window.MaintainOpsAppTelemetry=W),typeof De<"u"&&(De.exports=W)})()});var Ct=U((In,Te)=>{(function(){function l(n){return n?.user?.id||""}function e(n,t,o){let s=String(n||"");return!(!l(t)&&!l(o)||s==="TOKEN_REFRESHED"&&l(t)&&l(t)===l(o))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Te<"u"&&(Te.exports={shouldRenderForAuthEvent:e})})()});var $t=U((Fn,Ie)=>{(function(){let l={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(a,i,c){if(!a||!a.getItem)return c;let u=a.getItem(i);return u??c}function n(a,i){let c=Number(e(a,i,"1"));return Number.isFinite(c)&&c>0?c:1}function t(a,i,c){!a||!a.setItem||a.setItem(i,String(c))}function o(a,i){try{let c=JSON.parse(e(a,i,"{}"));return c&&typeof c=="object"&&!Array.isArray(c)?c:{}}catch{return{}}}function s(a,i){!a||!a.removeItem||a.removeItem(i)}function m(a={}){let i=a.storage||localStorage,c={activeSection:e(i,l.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,l.activeMessageThreadId,""),searchQuery:e(i,l.searchQuery,""),workOrderSearchMode:e(i,l.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,l.messageThreadFilter,"all"),messageThreadsPage:n(i,l.messageThreadsPage),messageSearchQuery:e(i,l.messageSearchQuery,""),messageComposerWorkOrderId:e(i,l.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,l.managerDashboardUserId,""),managerDashboardMetric:e(i,l.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,l.myWorkFilter,"assigned"),workOrderFilter:e(i,l.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,l.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,l.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,l.workOrderPriorityFilter,"all"),workSort:e(i,l.workSort,"newest"),workGroup:e(i,l.workGroup,"none"),requestViewFilter:e(i,l.requestViewFilter,"active"),workOrderPage:n(i,l.workOrderPage),partsPage:n(i,l.partsPage),assetsPage:n(i,l.assetsPage),financialPage:n(i,l.financialPage),financialMissingFilter:e(i,l.financialMissingFilter,"all"),financialLocationFilter:e(i,l.financialLocationFilter,"all"),financialTypeFilter:e(i,l.financialTypeFilter,"all"),financialAreaFilter:e(i,l.financialAreaFilter,"all"),requestsPage:n(i,l.requestsPage),planningOverduePage:n(i,l.planningOverduePage),planningTodayPage:n(i,l.planningTodayPage),planningSoonPage:n(i,l.planningSoonPage),planningNoDuePage:n(i,l.planningNoDuePage),planningFollowUpPage:n(i,l.planningFollowUpPage),planningPmPage:n(i,l.planningPmPage),planningGroupOpen:o(i,l.planningGroupOpen),schedulesPage:n(i,l.schedulesPage),proceduresPage:n(i,l.proceduresPage),membersPage:n(i,l.membersPage),assetStatusFilter:e(i,l.assetStatusFilter,"all"),assetTypeFilter:e(i,l.assetTypeFilter,"all"),assetAreaFilter:e(i,l.assetAreaFilter,"all"),partInventoryFilter:e(i,l.partInventoryFilter,"all"),partSort:e(i,l.partSort,"default"),partSearchQuery:e(i,l.partSearchQuery,"")};e(i,l.sectionSplitDone,"")!=="true"&&c.activeSection==="work"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection),t(i,l.sectionSplitDone,"true")),c.activeSection==="performance"&&(c.activeSection="mywork",t(i,l.activeSection,c.activeSection));let u=(r,p,g)=>{c[r]=p,g&&t(i,g,p)},d=(r,p)=>{u(r,1,p)};return{getActiveSection:()=>c.activeSection,setActiveSection:r=>u("activeSection",r,l.activeSection),getActiveWorkOrderId:()=>c.activeWorkOrderId,setActiveWorkOrderId:r=>u("activeWorkOrderId",r),getActiveAssetId:()=>c.activeAssetId,setActiveAssetId:r=>u("activeAssetId",r),getActivePartId:()=>c.activePartId,setActivePartId:r=>u("activePartId",r),getActiveMessageThreadId:()=>c.activeMessageThreadId,setActiveMessageThreadId:r=>u("activeMessageThreadId",r,l.activeMessageThreadId),getMessageThreadFilter:()=>c.messageThreadFilter,setMessageThreadFilter:r=>u("messageThreadFilter",r,l.messageThreadFilter),getMessageThreadsPage:()=>c.messageThreadsPage,setMessageThreadsPage:r=>u("messageThreadsPage",r,l.messageThreadsPage),resetMessageThreadsPage:()=>d("messageThreadsPage",l.messageThreadsPage),getMessageSearchQuery:()=>c.messageSearchQuery,setMessageSearchQuery:r=>u("messageSearchQuery",r,l.messageSearchQuery),getMessageComposerWorkOrderId:()=>c.messageComposerWorkOrderId,setMessageComposerWorkOrderId:r=>u("messageComposerWorkOrderId",r,l.messageComposerWorkOrderId),getMessageComposerOpen:()=>c.messageComposerOpen,setMessageComposerOpen:r=>u("messageComposerOpen",!!r),getManagerDashboardUserId:()=>c.managerDashboardUserId,setManagerDashboardUserId:r=>u("managerDashboardUserId",r||"",l.managerDashboardUserId),getManagerDashboardMetric:()=>c.managerDashboardMetric,setManagerDashboardMetric:r=>u("managerDashboardMetric",r||"open",l.managerDashboardMetric),getSearchQuery:()=>c.searchQuery,setSearchQuery:r=>u("searchQuery",r,l.searchQuery),getWorkOrderSearchMode:()=>c.workOrderSearchMode,setWorkOrderSearchMode:r=>u("workOrderSearchMode",!!r,l.workOrderSearchMode),getActiveStatusFilter:()=>c.activeStatusFilter,setActiveStatusFilter:r=>u("activeStatusFilter",r),getMyWorkFilter:()=>c.myWorkFilter,setMyWorkFilter:r=>u("myWorkFilter",r,l.myWorkFilter),getWorkOrderFilter:()=>c.workOrderFilter,setWorkOrderFilter:r=>u("workOrderFilter",r,l.workOrderFilter),getWorkOrderAssigneeFilter:()=>c.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:r=>{u("workOrderAssigneeFilter",r),r?t(i,l.workOrderAssigneeFilter,r):s(i,l.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>c.workOrderTypeFilter,setWorkOrderTypeFilter:r=>u("workOrderTypeFilter",r||"all",l.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>c.workOrderPriorityFilter,setWorkOrderPriorityFilter:r=>u("workOrderPriorityFilter",r||"all",l.workOrderPriorityFilter),getWorkSort:()=>c.workSort,setWorkSort:r=>u("workSort",r,l.workSort),getWorkGroup:()=>c.workGroup,setWorkGroup:r=>u("workGroup",r||"none",l.workGroup),getRequestViewFilter:()=>c.requestViewFilter,setRequestViewFilter:r=>u("requestViewFilter",r,l.requestViewFilter),getWorkOrderPage:()=>c.workOrderPage,setWorkOrderPage:r=>u("workOrderPage",r,l.workOrderPage),resetWorkOrderPage:()=>d("workOrderPage",l.workOrderPage),getPartsPage:()=>c.partsPage,setPartsPage:r=>u("partsPage",r,l.partsPage),resetPartsPage:()=>d("partsPage",l.partsPage),getAssetsPage:()=>c.assetsPage,setAssetsPage:r=>u("assetsPage",r,l.assetsPage),resetAssetsPage:()=>d("assetsPage",l.assetsPage),getFinancialPage:()=>c.financialPage,setFinancialPage:r=>u("financialPage",r,l.financialPage),resetFinancialPage:()=>d("financialPage",l.financialPage),getFinancialMissingFilter:()=>c.financialMissingFilter,setFinancialMissingFilter:r=>u("financialMissingFilter",r||"all",l.financialMissingFilter),getFinancialLocationFilter:()=>c.financialLocationFilter,setFinancialLocationFilter:r=>u("financialLocationFilter",r||"all",l.financialLocationFilter),getFinancialTypeFilter:()=>c.financialTypeFilter,setFinancialTypeFilter:r=>u("financialTypeFilter",r||"all",l.financialTypeFilter),getFinancialAreaFilter:()=>c.financialAreaFilter,setFinancialAreaFilter:r=>u("financialAreaFilter",r||"all",l.financialAreaFilter),getRequestsPage:()=>c.requestsPage,setRequestsPage:r=>u("requestsPage",r,l.requestsPage),resetRequestsPage:()=>d("requestsPage",l.requestsPage),getPlanningPage:r=>r==="overdue"?c.planningOverduePage:r==="today"?c.planningTodayPage:r==="soon"?c.planningSoonPage:r==="no-due"?c.planningNoDuePage:r==="follow-up"?c.planningFollowUpPage:r==="pm"?c.planningPmPage:1,setPlanningPage:(r,p)=>{r==="overdue"&&u("planningOverduePage",p,l.planningOverduePage),r==="today"&&u("planningTodayPage",p,l.planningTodayPage),r==="soon"&&u("planningSoonPage",p,l.planningSoonPage),r==="no-due"&&u("planningNoDuePage",p,l.planningNoDuePage),r==="follow-up"&&u("planningFollowUpPage",p,l.planningFollowUpPage),r==="pm"&&u("planningPmPage",p,l.planningPmPage)},getPlanningGroupOpen:(r,p=!1)=>Object.prototype.hasOwnProperty.call(c.planningGroupOpen,r)?!!c.planningGroupOpen[r]:!!p,setPlanningGroupOpen:(r,p)=>{c.planningGroupOpen={...c.planningGroupOpen,[r]:!!p},t(i,l.planningGroupOpen,JSON.stringify(c.planningGroupOpen))},getSchedulesPage:()=>c.schedulesPage,setSchedulesPage:r=>u("schedulesPage",r,l.schedulesPage),resetSchedulesPage:()=>d("schedulesPage",l.schedulesPage),getProceduresPage:()=>c.proceduresPage,setProceduresPage:r=>u("proceduresPage",r,l.proceduresPage),resetProceduresPage:()=>d("proceduresPage",l.proceduresPage),getMembersPage:()=>c.membersPage,setMembersPage:r=>u("membersPage",r,l.membersPage),resetMembersPage:()=>d("membersPage",l.membersPage),getAssetStatusFilter:()=>c.assetStatusFilter,setAssetStatusFilter:r=>u("assetStatusFilter",r,l.assetStatusFilter),getAssetTypeFilter:()=>c.assetTypeFilter,setAssetTypeFilter:r=>u("assetTypeFilter",r,l.assetTypeFilter),getAssetAreaFilter:()=>c.assetAreaFilter,setAssetAreaFilter:r=>u("assetAreaFilter",r,l.assetAreaFilter),getPartInventoryFilter:()=>c.partInventoryFilter,setPartInventoryFilter:r=>u("partInventoryFilter",r,l.partInventoryFilter),getPartSort:()=>c.partSort,setPartSort:r=>u("partSort",r||"default",l.partSort),getPartSearchQuery:()=>c.partSearchQuery,setPartSearchQuery:r=>u("partSearchQuery",r,l.partSearchQuery),snapshot:()=>({...c})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:m},typeof Ie<"u"&&(Ie.exports={createWorkspaceUiState:m})})()});var Pt=U((Ln,we)=>{(function(){function l(o){return!!String(o?.production_action||"").trim()}function e(o){return l(o)&&o?.production_action_status==="open"}function n(o,s){return!o||!s?!1:o.assigned_to===s||e(o)&&o.production_action_assigned_to===s}function t(o){return e(o)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof we<"u"&&we.exports&&(we.exports={hasProductionAction:l,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var At=U((Nn,be)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",o=>o.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",o=>{o.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:l},typeof be<"u"&&be.exports&&(be.exports={bindWorkspaceProductionActionEvents:l})})()});var Et=U((Un,Fe)=>{(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async o=>{o.preventDefault(),o.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:l},typeof Fe<"u"&&(Fe.exports={bindWorkspaceWorkOrderNotificationEvents:l})})()});var Rt=U((Qn,ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function o(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(c=>c.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(c=>{c.checked=i.target.checked})}async function m(i){i.preventDefault();let c=i.target,u=c.querySelector("button[type='submit']"),d=n.querySelector("#completion-error"),r=e.getActiveWorkOrderId(),p=e.getWorkOrderById(r),g=e.getProcedureById(p?.procedure_template_id),f=g?e.requiredChecklistProgress(p,g):{done:0,total:0},h=e.productionActionCompletionMessage?.(p)||"";if(h){d&&(d.textContent=h),e.setWorkOrderActionWarning(r,h),e.showNotice(h,"warning");return}if(f.done<f.total){d&&(d.textContent=`Complete required checklist steps first (${f.done}/${f.total}).`);return}let y=new t(c),w=y.get("safety_devices_checked")==="on"||o(r)||e.hasCompletedSafetyDeviceCheck(p);if(e.requiresSafetyDeviceCheck(p)&&!w){d&&(d.textContent="Check safety devices before completing equipment work.");return}u.disabled=!0,u.textContent="Completing...",d&&(d.textContent="");try{let k={status:"completed",asset_id:p?.asset_id||null,actual_minutes:Number(y.get("actual_minutes"))||0,failure_cause:y.get("failure_cause")||null,resolution_summary:y.get("resolution_summary")||null,follow_up_needed:y.get("follow_up_needed")==="on",completion_notes:y.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(k),e.applySafetyCheckPayload(k,k.safety_check_required&&w),delete k.asset_id;let{error:P}=await e.withOperationTimeout(e.updateWorkOrderSafely(k,r),"Complete work save timed out. Check your connection and try again.",2e4);if(P){d&&(d.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(P)}`);return}let C=await e.withOperationTimeout(e.recordWorkOrderEvent(r,"completed",y.get("resolution_summary")||y.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(E=>E);e.setWorkOrderActionWarning("",""),e.showNotice(C?`Work order completed, but history did not update: ${C.message}`:"Work order completed.",C?"warning":"success"),await e.render()}catch(k){d?d.textContent=`Could not complete work order: ${k.message||k}`:e.alertRef(k.message||k)}finally{u.disabled=!1,u.textContent="Complete Work Order"}}function a(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",m),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(c=>{c.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:a,completeWorkOrder:m,currentSafetyCheckboxCheckedForWorkOrder:o,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:l},typeof ve<"u"&&ve.exports&&(ve.exports={createWorkspaceWorkOrderCompletionEvents:l})})()});var Ot=U((Bn,ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.URLRef||URL,o=e.BlobCtor||Blob,s=e.alertRef||alert,m=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,a=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:_=>String(_||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:_=>String(_||"corrective").replaceAll("_"," "),c={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function u(_){return(e.getAssetDocumentsByAssetId?.()[_]||[]).filter(v=>String(v.content_type||"").startsWith("image/")||v.document_type==="machine_photo"||v.document_type==="nameplate")}function d(_){return u(_).map(v=>v.original_file_name||v.file_name||v.storage_path||v.id).filter(Boolean).join("; ")}function r(_,v){return _?.parent_asset_id&&v.get(_.parent_asset_id)?.name||""}function p(_){return e.getLocations?.().find(v=>v.id===_)?.name||""}function g(_){if(!_)return"";let v=e.getProfilesByUserId?.()[_];return v?.full_name||v?.email||_}function f(_){return String(p(_.location_id)||_.location_id||_.location||"")}function h(_){return{id:`financial:${_.id}`,financialRecord:_,name:_.archived_asset_name||"Deleted equipment",asset_type:_.archived_asset_type||"machine",asset_code:_.archived_asset_code||"",manufacturer:_.archived_manufacturer||"",model:_.archived_model||"",location_id:_.archived_location_id||"",location:_.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(_=>!_.asset_id).map(h)]}function w(_,v,I){let D=f(_).localeCompare(f(v));if(D)return D;let W=(c[_.asset_type||"machine"]||999)-(c[v.asset_type||"machine"]||999);return W||String(r(_,I)).localeCompare(String(r(v,I)))||String(_.location||"").localeCompare(String(v.location||""))||String(_.name||"").localeCompare(String(v.name||""))}function k(){let _=e.getAssets().filter(m),v=new Map(_.map(I=>[I.id,I]));return[..._].sort((I,D)=>w(I,D,v)).map(I=>({equipment_type:a(I.asset_type),name:I.name,parent_equipment:r(I,v),serial_number:I.asset_code||"",manufacturer:I.manufacturer||"",model:I.model||"",picture_id:d(I.id),picture_count:u(I.id).length,picture_status:u(I.id).length?"attached":"missing",facility:p(I.location_id)||I.location_id||"",area_department:I.location||"",status:I.status}))}function P(){let _=y(),v=new Map(_.map(D=>[D.id,D])),I=e.getAssetFinancialsByAssetId?.()||{};return[..._].sort((D,W)=>w(D,W,v)).map(D=>{let W=D.financialRecord||I[D.id]||{};return{operational_status:D.financialRecord?"deleted":"active",equipment_type:a(D.asset_type),name:D.name,parent_equipment:r(D,v),facility:p(D.location_id)||D.location_id||"",area_department:D.location||"",serial_number:D.asset_code||"",manufacturer:D.manufacturer||"",model:D.model||"",picture_status:u(D.id).length?"attached":"missing",asset_tag:W.asset_tag||"",acquisition_date:W.acquisition_date||"",acquisition_cost:W.acquisition_cost||"",depreciation_method:W.depreciation_method||"",useful_life_years:W.useful_life_years||"",current_book_value:W.current_book_value||"",tax_jurisdiction:W.tax_jurisdiction||"",ownership_status:W.ownership_status||"",in_service_date:W.in_service_date||"",disposal_date:W.disposal_date||"",disposal_notes:W.disposal_notes||"",gl_account_code:W.gl_account_code||"",cost_center:W.cost_center||"",finance_notes:W.finance_notes||"",needs_review:!!W.needs_review,last_reviewed_at:W.last_reviewed_at||"",reviewed_by:g(W.reviewed_by)}})}async function C(_){let v=e.getExportScope(),I=e.createExportQuery(_),D=[],W;try{for(;D.length<1e5;){let x=await e.withOperationTimeout(I.range(D.length,D.length+499),"Export timed out. Try again.",2e4);if(x.error)throw x.error;if(e.getExportScope()!==v)throw new Error("Workspace changed. Export again from the intended location.");if(!Number.isInteger(x.count))throw new Error("Export could not verify the total record count.");if(W!==void 0&&W!==x.count)throw new Error("Records changed during export. Try again.");if(W=x.count,D.push(...x.data||[]),new Set(D.map(b=>b.id)).size!==D.length)throw new Error("Records moved during export. Try again.");if(D.length===W)return O(_,D);if(!x.data?.length||D.length>W)throw new Error("Export returned an incomplete list. Try again.")}throw new Error("Export exceeds 100,000 records. Narrow the filters and try again.")}catch(x){s(`Could not export: ${x.message||x}`)}}function E(){let _=e.getActiveSection();return e.createExportQuery&&["work","mywork","requests"].includes(_)?C(_):O(_)}function O(_,v){let I={work:{filename:"work-orders.csv",rows:(v&&_!=="requests"?v:e.getWorkOrders()).map(W=>({title:W.title,status:W.status,priority:W.priority,type:i(W.type),equipment:W.assets?.name||"",assigned_to:e.assignmentLabel(W),due_at:W.due_at||"",completed_at:W.completed_at||"",actual_minutes:W.actual_minutes||0,failure_cause:W.failure_cause||"",resolution_summary:W.resolution_summary||"",follow_up_needed:!!W.follow_up_needed}))},assets:{filename:"equipment.csv",rows:k()},financial:{filename:"equipment-financial.csv",rows:P()},requests:{filename:"maintenance-requests.csv",rows:(v&&_==="requests"?v:e.getMaintenanceRequests()).map(W=>({title:W.title,status:W.status,priority:W.priority,equipment:W.assets?.name||"",requested_by:e.getProfilesByUserId()[W.requested_by]?.full_name||"",created_at:W.created_at||"",converted_work_order_id:W.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(W=>({title:W.title,equipment:W.assets?.name||"",frequency:W.frequency,next_due_at:W.next_due_at,active:W.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(W=>({name:W.name,sku:W.sku||"",supplier_name:W.supplier_name||"",quantity_on_hand:W.quantity_on_hand,reorder_point:W.reorder_point,unit_cost:W.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(W=>({name:W.name,description:W.description||"",steps:W.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(W=>({user_id:W.user_id,name:e.getProfilesByUserId()[W.user_id]?.full_name||"",role:W.role}))}},D=I[_]||I.work;if(!D.rows.length)return s("Nothing to export in this section yet.");q(D.filename,D.rows)}function q(_,v){let I=Object.keys(v[0]),D=[I.join(","),...v.map($=>I.map(A=>e.csvCell($[A])).join(","))],W=new o([`\uFEFF${D.join(`
`)}`],{type:"text/csv;charset=utf-8"}),x=t.createObjectURL(W),b=n.createElement("a");b.href=x,b.download=_,n.body.appendChild(b),b.click(),b.remove(),t.revokeObjectURL(x)}return{downloadCsv:q,exportActiveSectionCsv:E}}typeof ke<"u"&&ke.exports&&(ke.exports={createCsvExportHelpers:l}),window.MaintainOpsCsvExport={createCsvExportHelpers:l}})()});var Wt=U((jn,Le)=>{(function(){function l(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(o=>{o.addEventListener("click",()=>{let m=o.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');l(m)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:l},typeof Le<"u"&&(Le.exports={bindWorkspaceDatePickerControls:e,openDatePicker:l})})()});var xt=U((zn,Ne)=>{(function(){function l(e={}){let n=e.windowRef||window;function t(s){let m=String.fromCharCode(...s),a=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return a?a(m).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function o(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:o}}window.MaintainOpsPublicRequestTokens=l(),typeof Ne<"u"&&(Ne.exports={createPublicRequestTokenHelpers:l})})()});var Mt=U((Gn,Ue)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,o=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,m=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.createPublicRequestLink))}),typeof o=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(a=>{a.addEventListener("click",()=>o(a.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(a=>{a.addEventListener("click",()=>s(a.dataset.enablePublicRequestLink,!0))}),typeof m=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(a=>{a.addEventListener("click",()=>m(a.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:l},typeof Ue<"u"&&(Ue.exports={bindWorkspacePublicRequestLinkAdminEvents:l})})()});var Dt=U((Vn,Qe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(o=>{o.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let m=o.querySelector?.("button[type='submit']");if(!m?.disabled){m&&(m.disabled=!0);try{let a=o.querySelector?.("[name='planning_due_at']");await t(o.dataset.planningDueForm,a?.value)}finally{m?.isConnected&&(m.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:l},typeof Qe<"u"&&(Qe.exports={bindWorkspacePlanningDueDateEvents:l})})()});var Tt=U((Hn,Be)=>{(function(){let l=new WeakSet;function e(o,s,m){if(!o)return;let a=o.querySelector("[data-equipment-choice-existing]"),i=o.querySelector("[data-equipment-choice-new]"),c=s==="new";o.querySelectorAll("[data-equipment-choice-mode]").forEach(u=>{let d=u.value===(c?"new":"existing");u.checked=d,u.closest("label")?.classList.toggle("active",d)}),o.querySelectorAll("[data-equipment-choice-panel]").forEach(u=>{u.hidden=u.dataset.equipmentChoicePanel!==(c?"new":"existing")}),a&&(a.disabled=c,a.required=!c&&a.dataset.equipmentChoiceRequired==="true",c&&(a.value=""),typeof m=="function"&&m(a)),i&&(i.disabled=!c,i.required=c&&i.dataset.equipmentChoiceRequired==="true",c||(i.value=""))}function n(o,s){o.querySelectorAll("[data-equipment-choice]").forEach(m=>{let a=m.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(m,a,s)})}function t(o={}){let s=o.documentRef||document,m=o.updateAssetLocationWarning;n(s,m),!l.has(s)&&(l.add(s),s.addEventListener("change",a=>{let i=a.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,m);return}let c=a.target.closest?.("[data-equipment-choice-existing]");c&&typeof m=="function"&&m(c)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Be<"u"&&(Be.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var It=U((Yn,je)=>{(function(){function l(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:o,createQuickFixAsset:s,getMaintenanceRequests:m,getQuickFixRequestId:a,getActiveCompanyId:i,getSession:c,getParts:u,getRequestsReady:d,getSupabaseClient:r,confirmAssetLocationRouting:p,assetRequiresSafety:g,blocksProcedureCompletion:f,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:w,descriptionWithAssignmentNote:k,assignedUserFromForm:P,procedureColumn:C,workOrderDateValue:E,applySafetyRequirementPayload:O,applySafetyCheckPayload:q,insertWithOptionalProcedure:_,friendlyWorkOrderSaveError:v,addPartUsageToWorkOrder:I,addPhotoToWorkOrder:D,updateAssetStatus:W,recordWorkOrderEvent:x,setActiveWorkOrderIdState:b,setActiveAssetIdState:$,setCreateWorkOrderMode:A,setQuickFixMode:R,setQuickFixAssetId:S,setQuickFixRequestId:N,showNotice:L,render:j,alertUser:V=re=>window.alert(re)}=e;async function Z(re){re.preventDefault();let se=re.currentTarget,J=n.querySelector("#quick-fix-error"),ae=se.querySelector("button[type='submit']");J&&(J.textContent=""),ae&&(ae.disabled=!0,ae.textContent="Saving...");try{let z=new t(se),fe=String(z.get("title")||"").trim();if(!fe)throw new Error("Quick Fix issue is required.");let le=a(),T=i(),B=c(),G=String(z.get("description")||"").trim(),K=String(z.get("resolution_summary")||"").trim(),X=K||fe,Y=G||fe,H=z.get("mark_completed")==="on",ne=z.get("machine_down")==="on",ee=z.get("asset_id")||null,de=le?m().find(ce=>ce.id===le):null,oe=String(z.get("new_asset_name")||"").trim();if(ee&&oe)throw new Error("Choose existing equipment or create new equipment, not both.");if(oe){let{data:ce,error:me}=await o(s(oe,ne?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(me){J&&(J.textContent=me.message);return}ee=ce.id}if(!oe&&!p(ee,"logging this Quick Fix",J))return;if(H&&g(ee)&&z.get("safety_devices_checked")!=="on"){J&&(J.textContent="Check safety devices before marking equipment work complete.");return}let F=H?f(null,z.get("procedure_template_id")||null):"";if(F){h("",""),J&&(J.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let pe={company_id:T,location_id:y(ee),title:fe,description:w(k(Y,z.get("assigned_to")),de),asset_id:ee,assigned_to:P(z,B.user.id),priority:z.get("priority")||"medium",type:z.get("type")||"corrective",status:H?"completed":"open",due_at:E(z.get("due_at")),created_by:B.user.id,...C(z.get("procedure_template_id")),actual_minutes:0,failure_cause:z.get("failure_cause")||null,resolution_summary:H?X:K||null,follow_up_needed:z.get("follow_up_needed")==="on",completion_notes:H?X:null,completed_at:H?new Date().toISOString():null};O(pe),q(pe,H&&pe.safety_check_required&&z.get("safety_devices_checked")==="on");let{data:he,error:ue}=await o(_("work_orders",pe,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ue){J&&(J.textContent=`Could not log quick fix: ${v(ue)}`);return}let M=[],ie=z.get("part_id"),te=Number(z.get("quantity_used"))||1;if(ie){let ce=u().find(Me=>Me.id===ie),me=await o(I(he.id,ce,te),"Part usage save timed out.",12e3).catch(Me=>Me);me&&M.push(`part usage failed: ${me.message}`)}let ge=z.get("photo");if(ge&&ge.name){let ce=await o(D(he.id,ge),"Photo upload timed out.",25e3).catch(me=>me);ce&&M.push(`photo upload failed: ${ce.message}`)}let ye=ne?"offline":z.get("asset_status");if(pe.asset_id&&!oe&&(ne||H&&ye)){let ce=await o(W(pe.asset_id,ye),"Equipment status update timed out.",12e3).catch(me=>me);ce?M.push(`equipment status did not update: ${ce.message}`):await o(x(he.id,"asset_status_updated",ne?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(me=>M.push(`history did not update: ${me.message}`))}if(await o(x(he.id,"quick_fix",H?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ce=>M.push(`history did not update: ${ce.message}`)),oe&&await o(x(he.id,"equipment_created",`Equipment created from Quick Fix: ${oe}.`),"Activity log timed out.",8e3).catch(ce=>M.push(`history did not update: ${ce.message}`)),le&&d()){let ce=await o(r().from("maintenance_requests").update({status:"converted",reviewed_by:B.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:he.id}).eq("id",le).eq("company_id",T),"Request status update timed out.",12e3).catch(me=>({error:me}));ce.error?M.push(`request status did not update: ${ce.error.message}`):await o(x(he.id,"request_quick_fixed",H?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(me=>M.push(`history did not update: ${me.message}`))}b(he.id),$(null),A(!1),R(!1),S(null),N(null),L(M.length?`Quick Fix saved with warning: ${M[0]}`:"Quick Fix saved.",M.length?"warning":"success"),await j()}catch(z){J?J.textContent=`Could not log quick fix: ${z.message||z}`:V(z.message||z)}finally{ae&&ae.isConnected&&(ae.disabled=!1,ae.textContent="Log Quick Fix")}}return{createQuickFix:Z}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:l},typeof je<"u"&&(je.exports={createQuickFixWorkflow:l})})()});var Ft=U((Kn,ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.CSSRef||CSS;function s(){let u=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),d=n.querySelector("#create-pm-form");d&&!u.includes(d)&&u.push(d),u.forEach(r=>r.addEventListener("submit",m))}async function m(u){u.preventDefault();let d=u.currentTarget,r=d.querySelector("button[type='submit']"),p=d.querySelector("[data-pm-error]")||n.querySelector("#pm-error");p&&(p.textContent=""),r&&(r.disabled=!0,r.textContent="Adding...");try{let g=new t(d);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",p))return;let{error:f}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(f)throw f;e.showNotice("PM schedule added."),await e.render()}catch(g){p?p.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{r&&(r.disabled=!1,r.textContent="Add Schedule")}}function a(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(d=>d.id===u)&&(e.setPendingDeleteScheduleId(u),e.renderWorkspace())}async function i(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(p=>p.id===u))return;let r=n.querySelector(`[data-confirm-delete-schedule="${o.escape(u)}"]`);r&&(r.disabled=!0,r.textContent="Deleting...");try{let{data:p,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!p?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let f=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(f.error)throw new Error(`PM schedule delete verification failed: ${f.error.message}`);if(f.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(p){e.showNotice(p.message||"Could not delete PM schedule.","warning"),r&&(r.disabled=!1,r.textContent="Permanently Delete")}}async function c(u){let d=e.getPreventiveSchedules().find(p=>p.id===u);if(!d)return;let r=n.querySelector(`[data-generate-pm="${o.escape(u)}"]`);r&&(r.disabled=!0,r.textContent="Generating...");try{let p={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(d.asset_id),asset_id:d.asset_id,title:d.title,description:`Generated from preventive schedule: ${d.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:d.next_due_at,...e.procedureColumn(d.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(p),e.applySafetyCheckPayload(p,!1);let{data:g,error:f}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",p,{returnSingle:!0}),"PM work order generation timed out.");if(f)throw f;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(d.next_due_at,d.frequency)}).eq("id",d.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(p){e.showNotice(`Could not generate PM work: ${p.message||p}`,"warning"),r&&(r.disabled=!1,r.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:m,requestDeletePreventiveSchedule:a,deletePreventiveSchedule:i,generatePreventiveWorkOrder:c}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:l},typeof ze<"u"&&(ze.exports={createPreventiveMaintenanceWorkflow:l})})()});var Lt=U((Jn,Ge)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.CSSRef||CSS;function s(){let p=n.querySelector("#create-procedure-form");p&&p.addEventListener("submit",m);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",a),n.querySelectorAll("[data-add-step]").forEach(f=>{f.addEventListener("submit",i)})}async function m(p){p.preventDefault();let g=p.currentTarget,f=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let y=new t(g),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(w)throw w;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{f&&(f.disabled=!1,f.textContent="Add Checklist")}}async function a(){let p=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(f=>f.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}p&&(p.disabled=!0,p.textContent="Adding sample...");try{let{data:f,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(k=>({...k,company_id:e.getActiveCompanyId(),procedure_template_id:f.id})),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(w)throw w;e.showNotice("Sample procedure checklist added."),await e.render()}catch(f){e.showNotice(`Could not add sample procedure: ${f.message||f}`,"warning")}finally{p&&(p.disabled=!1,p.textContent="Add sample inspection checklist")}}async function i(p){p.preventDefault();let g=p.currentTarget,f=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let y=new t(g),k=(e.getProcedureTemplates().find(C=>C.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:P}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:k,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(P)throw P;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{f&&(f.disabled=!1,f.textContent="Add Step")}}async function c(p){let[g,f]=await Promise.all([u("work_orders",p),u("preventive_schedules",p)]);return{workOrders:g,schedules:f}}async function u(p,g){let{count:f,error:h}=await e.withOperationTimeout(e.supabaseClient().from(p).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${p}.`,15e3);if(h)throw new Error(`Could not verify linked ${p.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return f||0}async function d(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(f=>f.id===p))return;let g=n.querySelector(`[data-procedure-delete-error="${o.escape(p)}"]`);g&&(g.textContent="");try{let f=await c(p),h=e.procedureDeleteBlockerMessage(f);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(p),e.renderWorkspace()}catch(f){g?g.textContent=f.message||"Could not verify procedure links before delete.":e.showNotice(f.message||"Could not verify procedure links before delete.","warning")}}async function r(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===p))return;let f=n.querySelector(`[data-confirm-delete-procedure="${o.escape(p)}"]`),h=n.querySelector(`[data-procedure-delete-error="${o.escape(p)}"]`);h&&(h.textContent=""),f&&(f.disabled=!0,f.textContent="Deleting...");try{let y=await c(p),w=e.procedureDeleteBlockerMessage(y);if(w)throw new Error(w);let{data:k,error:P}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(P)throw P;if(!k?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let C=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if(C.error)throw new Error(`Procedure checklist delete verification failed: ${C.error.message}`);if(C.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let w=y.message||"Could not delete procedure.";e.showNotice(w,"warning"),h&&(h.textContent=w),f&&(f.disabled=!1,f.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:m,seedSampleProcedure:a,createProcedureStep:i,loadProcedureDeleteBlockers:c,countProcedureLinkedRows:u,requestDeleteProcedureTemplate:d,deleteProcedureTemplate:r}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:l},typeof Ge<"u"&&(Ge.exports={createProcedureWorkflow:l})})()});var Nt=U((Zn,Ve)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function o(){let f=n.querySelector("#add-member-form");f&&f.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach(C=>{C.addEventListener("submit",m)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",a);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",u);let w=n.querySelector("#team-invite-form");w&&w.addEventListener("submit",i);let k=n.querySelector("#team-invite-link-form");k&&k.addEventListener("submit",d),n.querySelectorAll("[data-revoke-invite-link]").forEach(C=>{C.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(C.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(C=>{C.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(C=>{C.addEventListener("click",()=>r(C.dataset.confirmRevokeInviteLink))});let P=n.querySelector("#request-notification-recipient-form");P&&P.addEventListener("submit",p),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(C=>{C.addEventListener("click",()=>g(C.dataset.deleteRequestNotificationRecipient))})}async function s(f){f.preventDefault();let h=f.currentTarget,y=new t(h),w=String(y.get("role")||"technician").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&w!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}k&&(k.disabled=!0,k.textContent="Adding...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:w}),"Team member save timed out.");if(P)throw P;await e.render()}catch(P){e.alertUser(P.message||P)}finally{k?.isConnected&&(k.disabled=!1,k.textContent="Add Member")}}async function m(f){f.preventDefault();let h=f.currentTarget,y=new t(h),w=String(y.get("role")||"").trim().toLowerCase(),k=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}k&&(k.disabled=!0,k.textContent="Saving...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:w}),"Role save timed out. Check your connection and try again.",15e3);if(P)throw new Error(P.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":P.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(P){e.showNotice(`Could not save role: ${P.message||P}`,"warning")}finally{k&&(k.disabled=!1,k.textContent="Save Role")}}async function a(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#profile-error"),w=h.querySelector("button[type='submit']"),k=new t(h),P=String(k.get("full_name")||"").trim(),C=h.querySelector('input[name="mobile_tech"]'),E=C?C.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),w&&(w.disabled=!0,w.textContent="Saving...");try{let{error:O}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:P,mobile_tech:E},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(O)throw e.isMissingColumnError(O,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):O;e.showNotice("Profile saved."),await e.render()}catch(O){y&&(y.textContent=O.message||"Could not save profile.")}finally{w&&(w.disabled=!1,w.textContent="Save Profile")}}async function i(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#team-invite-error"),w=h.querySelector("button[type='submit']"),k=new t(h),P=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&P!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}w&&(w.disabled=!0,w.textContent="Inviting...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(k.get("email")||"").trim(),invite_role:P,invite_default_location_id:k.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(C)throw C.message.includes("create_company_invite")||e.isColumnSchemaError(C,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):C;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(C){y&&(y.textContent=C.message||"Could not create invite.")}finally{w&&(w.disabled=!1,w.textContent="Create Invite")}}async function c(f){if(!(!f||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:f}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function u(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#password-change-error"),w=h.querySelector("button[type='submit']"),k=new t(h),P=String(k.get("password")||""),C=String(k.get("confirmPassword")||"");if(y&&(y.textContent=""),P.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(P!==C){y&&(y.textContent="Passwords do not match.");return}w&&(w.disabled=!0,w.textContent="Updating...");try{let{error:E}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:P}),"Password update timed out. Check your connection and try again.",15e3);if(E)throw E;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(E){y&&(y.textContent=E.message||"Could not update password.")}finally{w&&(w.disabled=!1,w.textContent="Update Password")}}async function d(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#team-invite-link-error"),w=h.querySelector("button[type='submit']"),k=new t(h),P=String(k.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let C="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(C),y&&(y.textContent=C);return}if(P==="admin"){let C="Admin join links are not allowed.";e.setTeamInviteLinkError(C),y&&(y.textContent=C);return}if(!e.canAdministerTeamRoles?.()&&P!=="technician"){let C="Managers can only create technician join links.";e.setTeamInviteLinkError(C),y&&(y.textContent=C);return}w&&(w.disabled=!0,w.textContent="Creating...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:P,link_location_id:k.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(C)throw C.message.includes("create_company_invite_link")||e.isColumnSchemaError(C,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):C;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(C){let E=C.message||"Could not create join link.";e.setTeamInviteLinkError(E),y&&(y.textContent=E)}finally{w&&(w.disabled=!1,w.textContent="Create Join Link")}}async function r(f){if(!(!f||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:f}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function p(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#request-notification-recipient-error"),w=h.querySelector("button[type='submit']"),k=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let P="Only admins can change request email routing.";e.setRequestNotificationRecipientError(P),y&&(y.textContent=P);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}w&&(w.disabled=!0,w.textContent="Adding...");try{let P=String(k.get("email")||"").trim().toLowerCase(),{error:C}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:k.get("location_id")||null,email:P,label:String(k.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(C)throw e.isColumnSchemaError(C,["request_notification_recipients"])||C.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):C;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(P){let C=P.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(C),y&&(y.textContent=C)}finally{w&&(w.disabled=!1,w.textContent="Add Recipient")}}async function g(f){if(!(!f||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",f),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:o,addCompanyMember:s,updateCompanyMemberRole:m,updateMyProfile:a,updateMyPassword:u,createTeamInvite:i,cancelTeamInvite:c,createTeamInviteLink:d,revokeTeamInviteLink:r,createRequestNotificationRecipient:p,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:l},typeof Ve<"u"&&(Ve.exports={createTeamWorkflow:l})})()});var Ut=U((Xn,He)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function o(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let c=n.querySelector("#location-form");c&&c.addEventListener("submit",m);let u=n.querySelector("#public-app-url-form");u&&u.addEventListener("submit",a)}async function s(i){i.preventDefault();let c=i.currentTarget,u=c.querySelector("button[type='submit']"),d=new t(c);u&&(u.disabled=!0,u.textContent="Saving...");try{let{error:r}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(d.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(r)throw r;e.showNotice("Company saved."),await e.render()}catch(r){e.showNotice(`Could not save company: ${r.message||r}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Save Company")}}async function m(i){i.preventDefault();let c=i.currentTarget,u=n.querySelector("#location-error"),d=c.querySelector("button[type='submit']"),r=String(new t(c).get("name")||"").trim();if(r){u&&(u.textContent=""),d&&(d.disabled=!0,d.textContent="Adding...");try{let{data:p,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),r),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(p.id),e.persistActiveLocationId(p.id),e.showNotice("Location added."),await e.render()}catch(p){u&&(u.textContent=p.message||"Could not add location.")}finally{d&&(d.disabled=!1,d.textContent="Add Location")}}}function a(i){i.preventDefault();let c=n.querySelector("#public-request-link-error"),u=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(c&&(c.textContent=""),!u){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let d=e.normalizePublicAppUrl(u);if(!d){c&&(c.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(d),e.storage.setItem("maintainops.publicAppUrl",d),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:o,updateCompanySettings:s,createLocation:m,savePublicAppUrl:a}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:l},typeof He<"u"&&(He.exports={createCompanySettingsWorkflow:l})})()});var Qt=U((er,Ye)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,o=e.FormDataCtor||FormData,s=e.confirmUser||(r=>t.confirm(r));function m(){let r=n.querySelector("#app-issue-report-form");r&&r.addEventListener("submit",c),n.querySelectorAll("[data-app-issue-status]").forEach(p=>{p.addEventListener("submit",u)}),n.querySelectorAll("[data-delete-app-issue]").forEach(p=>{p.addEventListener("click",d)})}async function a(){let{data:r,error:p}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!p),e.setAppIssueReports(p?[]:r||[]),p)throw p}function i(r){let p=e.appIssueReportErrorState(r);return p.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),p.message}async function c(r){r.preventDefault();let p=r.currentTarget,g=n.querySelector("#app-issue-report-error"),f=p.querySelector("button[type='submit']"),h=new o(p);g&&(g.textContent=""),f&&(f.disabled=!0,f.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:w}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(w)throw w;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await a(),e.renderWorkspace()}catch(y){g&&(g.textContent=i(y))}finally{f?.isConnected&&(f.disabled=!1,f.textContent="Send Report")}}async function u(r){if(r.preventDefault(),!e.canManageTeam())return;let p=r.currentTarget,g=p.querySelector("button[type='submit']"),f=new o(p);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(f.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),p.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await a(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${i(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function d(r){if(r.preventDefault(),!e.canManageTeam())return;let p=r.currentTarget,g=p.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;p.disabled=!0;let f=p.textContent;p.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await a(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${i(h)}`,"warning")}finally{p?.isConnected&&(p.disabled=!1,p.textContent=f||"Delete")}}return{bindAppIssueWorkflowEvents:m,reloadAppIssueReports:a,appIssueReportError:i,createAppIssueReport:c,updateAppIssueReportStatus:u,deleteAppIssueReport:d}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:l},typeof Ye<"u"&&(Ye.exports={createAppIssueWorkflow:l})})()});var Bt=U((tr,Ke)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.windowRef||window,o=e.CSSRef||CSS;async function s(u){let d=n.querySelector("#public-request-link-error"),r=n.querySelector(`[data-create-public-request-link="${o.escape(u)}"]`);d&&(d.textContent=""),r&&(r.disabled=!0,r.textContent="Creating...");try{let{error:p}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:u}),"QR link save timed out. Check your connection and try again.",15e3);if(p)throw e.setPublicRequestLinksReady(!1),new Error(p.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":p.message);e.showNotice("Location request QR link ready."),await e.render()}catch(p){d&&(d.textContent=p.message||"Could not create QR request link.")}finally{r&&(r.disabled=!1,r.textContent="Create QR Link")}}async function m(u){if(!e.canAdministerPublicRequestLinks()){let r=n.querySelector("#public-request-link-error");r&&(r.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await a(u,!1)}async function a(u,d){if(!e.canAdministerPublicRequestLinks()){let r=n.querySelector("#public-request-link-error");r&&(r.textContent="Only admins can reactivate or disable posted QR request links.");return}await c(u,{is_active:!!d},d?"Request link reactivated.":"Request link disabled.")}async function i(u){if(!e.canAdministerPublicRequestLinks()){let r=n.querySelector("#public-request-link-error");r&&(r.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await c(u,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function c(u,d,r){let p=n.querySelector("#public-request-link-error");if(p&&(p.textContent=""),!e.canAdministerPublicRequestLinks()){p&&(p.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!u||!e.getActiveCompanyId()){p&&(p.textContent="Select a company before updating request links.");return}try{let{data:g,error:f}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...d,updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(f){p&&(p.textContent=f.message);return}if(!g?.length){p&&(p.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(r),await e.render()}catch(g){p&&(p.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:m,setPublicRequestLinkActive:a,regeneratePublicRequestLink:i,updatePublicRequestLink:c}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:l},typeof Ke<"u"&&(Ke.exports={createPublicRequestLinkWorkflow:l})})()});var jt=U((nr,Je)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function o(){let u=n.querySelector("#create-part-form");u&&u.addEventListener("submit",s),n.querySelectorAll("[data-restock-part]").forEach(d=>{d.addEventListener("submit",m)}),n.querySelectorAll("[data-use-part]").forEach(d=>{d.addEventListener("submit",a)}),n.querySelectorAll("[data-edit-part]").forEach(d=>{d.addEventListener("submit",i)}),n.querySelectorAll("[data-rename-part-source]").forEach(d=>{d.addEventListener("submit",c)})}async function s(u){u.preventDefault();let d=u.currentTarget,r=n.querySelector("#part-create-error"),p=d.querySelector("button[type='submit']"),g=new t(d);r&&(r.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");let f;try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!h.company_id)throw new Error("Choose a company before adding parts.");if(!h.name)throw new Error("Part name is required.");let y=new Promise((P,C)=>{f=setTimeout(()=>C(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:w,error:k}=await Promise.race([e.supabaseClient().from("parts").insert(h).select("id").single(),y]);if(clearTimeout(f),k&&e.isMissingColumnError(k,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(k&&e.isMissingColumnError(k,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(k&&e.isMissingColumnError(k,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(k)throw k;e.setActivePartId(w?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),d.reset(),await e.render()}catch(h){r&&(r.textContent=h.message||"Could not add part.")}finally{f&&clearTimeout(f),p&&p.isConnected&&(p.disabled=!1,p.textContent="Add Part")}}async function m(u){u.preventDefault();let d=u.target,r=d.querySelector("button[type='submit']"),p=e.getParts().find(h=>h.id===d.dataset.restockPart),g=Number(new t(d).get("quantity"))||0;if(!p||g<=0)return;let f=r?.textContent||"Restock";r&&(r.disabled=!0,r.textContent="Saving...");try{let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(p.quantity_on_hand)||0)+g}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(p.quantity_on_hand)||0).select("id"),"Part restock timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part restocked."),await e.render()}catch(h){e.showNotice(`Could not restock part: ${h.message||h}`,"warning")}finally{r&&(r.disabled=!1,r.textContent=f)}}async function a(u){u.preventDefault();let d=u.currentTarget,r=d.querySelector("button[type='submit']"),p=e.getParts().find(h=>h.id===d.dataset.usePart),g=Number(new t(d).get("quantity"))||0;if(!p||g<=0)return;let f=r?.textContent||"Use";r&&(r.disabled=!0,r.textContent="Saving...");try{let h=Number(p.quantity_on_hand)||0;if(g>h)throw new Error("Quantity used exceeds the stock on hand.");let y=h-g,{data:w,error:k}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:y}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",h).select("id"),"Part use save timed out. Check your connection and try again.",15e3);if(k)throw k;if(!w?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.showNotice("Part used."),await e.render()}catch(h){e.showNotice(`Could not use part: ${h.message||h}`,"warning")}finally{r&&(r.disabled=!1,r.textContent=f)}}async function i(u){u.preventDefault();let d=u.currentTarget,r=d.dataset.editPart,p=n.querySelector(`[data-part-edit-error="${r}"]`),g=d.querySelector("button[type='submit']"),f=new t(d);p&&(p.textContent="");let h=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let y={name:String(f.get("name")||"").trim(),sku:f.get("sku")||null,supplier_name:f.get("supplier_name")||null,machine_note:f.get("machine_note")||null,quantity_on_hand:Number(f.get("quantity_on_hand"))||0,reorder_point:Number(f.get("reorder_point"))||0,unit_cost:Number(f.get("unit_cost"))||0};try{if(!y.name)throw new Error("Part name is required.");let w=e.getParts().find(C=>C.id===r);if(!w)throw new Error("Reopen this part before saving.");let{data:k,error:P}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(y).eq("id",r).eq("company_id",e.getActiveCompanyId()).eq("quantity_on_hand",Number(w.quantity_on_hand)||0).select("id"),"Part save timed out. Check your connection and try again.",15e3);if(P&&e.isMissingColumnError(P,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(P&&e.isMissingColumnError(P,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(P&&e.isMissingColumnError(P,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(P)throw P;if(!k?.length)throw new Error("Inventory changed or is no longer editable. Reopen this part before trying again.");e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(w){p&&(p.textContent=w.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=h)}}async function c(u){u.preventDefault();let d=u.currentTarget,r=n.querySelector("#part-source-error"),p=d.querySelector("button[type='submit']"),g=new t(d),f=String(g.get("old_source")||"").trim(),h=String(g.get("new_source")||"").trim();if(r&&(r.textContent=""),!!f){if(!e.getPartSuppliersReady()){r&&(r.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(f===h){r&&(r.textContent="Change the source name before saving.");return}p&&(p.disabled=!0,p.textContent="Renaming...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:h||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",f),"Part source rename timed out. Check your connection and try again.",15e3);if(y)throw e.isMissingColumnError(y,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?y.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(y){r&&(r.textContent=y.message||"Could not update part source.")}finally{p&&(p.disabled=!1,p.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:o,createPart:s,restockPart:m,usePartFromInventory:a,updatePart:i,renamePartSource:c}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:l},typeof Je<"u"&&(Je.exports={createPartInventoryWorkflow:l})})()});var zt=U((rr,_e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.consoleRef||console;async function s(m){m.preventDefault();let a=m.target,i=a.querySelector("button[type='submit']"),c=n.querySelector("#quick-update-error"),u=e.getWorkOrders().find(r=>r.id===e.getActiveWorkOrderId()),d=new t(a);i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let r=d.get("asset_id")||null,p=String(d.get("new_asset_name")||"").trim();if(r&&p)throw new Error("Choose existing equipment or create new equipment, not both.");if(p){let{data:k,error:P}=await e.createQuickFixAsset(p,"running");if(P){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not add equipment: ${P.message}`);return}r=k.id}if(!p&&!e.confirmAssetLocationRouting(r,"saving this work update",c))return;let g={title:e.requiredText(d.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(u?.description||"",d.get("assigned_to")),asset_id:r,location_id:e.locationIdForAsset(r),due_at:e.workOrderDateValue(d.get("due_at")),status:d.get("status"),priority:d.get("priority"),assigned_to:e.assignedUserFromForm(d),...e.procedureColumn(d.get("procedure_template_id")),resolution_summary:d.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let f=d.get("safety_devices_checked")==="on";if(g.status==="completed"&&u?.status!=="completed"){let k=e.productionActionCompletionMessage?.(u)||"";if(k){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),k),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=k);return}let P=e.blocksProcedureCompletion(u,g.procedure_template_id||null);if(P){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),P),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=P);return}if(e.applySafetyCheckPayload(g,f),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):u?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(f||e.hasCompletedSafetyDeviceCheck(u)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&d.get("machine_down")==="on"){let k=await e.updateAssetStatus(g.asset_id,"offline");k?y.push(`equipment status did not update: ${k.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let w=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(u,Object.fromEntries(d.entries()))),"Activity log timed out.",8e3).catch(k=>k);p&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${p}.`),"Activity log timed out.",8e3).catch(()=>null),w&&y.push(`history did not update: ${w.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(r){o.error("Quick update save failed",r),i.disabled=!1,i.textContent="Save Quick Update",c&&(c.textContent=`Could not save update: ${r.message||r}`)}}return{updateWorkOrderQuickView:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderQuickUpdateWorkflow:l}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:l}})()});var Gt=U((ar,qe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.alertRef||alert,s=e.CSSRef||CSS;function m(O){return String(O.get("location_new")||O.get("location_existing")||O.get("location")||"").trim()||null}function a(){return e.getSession?.()?.user?.id||null}function i(O){return(e.getAssets?.()||[]).find(q=>q.id===O)||null}function c(O,q){if(!O)return[];let _={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(_).filter(v=>String(O[v]??"")!==String(q[v]??"")).map(v=>_[v])}function u(O){return e.isMissingColumnError(O,"manufacturer")||e.isMissingColumnError(O,"model")}async function d(O){O.preventDefault();let q=O.currentTarget,_=n.querySelector("#asset-create-error");_&&(_.textContent="");let v=q.querySelector("button[type='submit']"),I=v?.textContent||"Add Equipment",D=O.submitter?.dataset?.assetContinue==="true";v&&(v.disabled=!0,v.textContent="Saving...");try{let W=new t(q),x={company_id:e.getActiveCompanyId(),location_id:W.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(W.get("name"),"Equipment name"),asset_code:String(W.get("asset_code")||"").trim()||null,manufacturer:String(W.get("manufacturer")||"").trim()||null,model:String(W.get("model")||"").trim()||null,location:m(W),parent_asset_id:W.get("parent_asset_id")||null,asset_type:W.get("asset_type")||"machine",safety_devices_required:W.get("safety_devices_required")==="on",status:"running",created_by:a()},b=e.supabaseClient().from("assets").insert(x).select("id").single(),{data:$,error:A}=await e.withOperationTimeout(b,"Equipment save timed out. Check your connection and try again.",15e3);if(A&&e.isMissingColumnError(A,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(A&&e.isMissingColumnError(A,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(A&&u(A))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(A&&e.isAssetHierarchySchemaError(A))throw new Error(e.equipmentSchemaMessage(A));if(A)throw A;$?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent($.id,"created",`Created ${x.name}.`),D&&$?.id?(e.setActiveAssetId($.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(W){_?_.textContent=W.message:o(W.message)}finally{v&&(v.disabled=!1,v.textContent=I)}}async function r(O){O.preventDefault();let q=O.currentTarget,_=n.querySelector("#asset-edit-error");_&&(_.textContent="");let v=q.querySelector("button[type='submit']"),I=v?.textContent||"Save Equipment";v&&(v.disabled=!0,v.textContent="Saving...");try{let D=new t(q),W=i(e.getActiveAssetId()),x={name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location_id:D.get("location_id")||e.activeLocationDatabaseId(),location:m(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:D.get("status")},{error:b}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(x).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(b&&u(b))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(b&&e.isAssetHierarchySchemaError(b))throw new Error(e.equipmentSchemaMessage(b));if(b)throw b;let $=c(W,x);$.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${$.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(D){_?_.textContent=D.message:o(D.message)}finally{v&&(v.disabled=!1,v.textContent=I)}}async function p(O,q){let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:q}).eq("id",O).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!_&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(O,"status_changed",`Status changed to ${q}.`),_||null}async function g(O){O.preventDefault();let q=O.currentTarget,_=q.dataset.attachAssetPart,v=n.querySelector(`[data-asset-part-error="${s.escape(_)}"]`);v&&(v.textContent="");let I=q.querySelector("button[type='submit']"),D=I?.textContent||"Attach Part";I&&(I.disabled=!0,I.textContent="Attaching...");try{let W=new t(q),x=W.get("part_id");if(!x)throw new Error("Select a part to attach.");let b=Math.max(1,Number(W.get("quantity_recommended"))||1),$=String(W.get("note")||"").trim()||null,{error:A}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:_,part_id:x,quantity_recommended:b,note:$}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(A)throw e.isMissingTableError?.(A,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):A.code==="23505"?new Error("This part is already linked to this equipment."):A;e.showNotice("Part linked to equipment."),await e.render()}catch(W){v?v.textContent=W.message||"Could not link part to equipment.":e.showNotice(W.message||"Could not link part to equipment.","warning")}finally{I&&(I.disabled=!1,I.textContent=D)}}async function f(O){let q=n.querySelector("[data-asset-part-error]");q&&(q.textContent="");try{let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",O).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(_)throw e.isMissingTableError?.(_,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):_;e.showNotice("Part link removed."),await e.render()}catch(_){q?q.textContent=_.message||"Could not remove linked part.":e.showNotice(_.message||"Could not remove linked part.","warning")}}function h(O){return{workOrders:e.getWorkOrders().filter(q=>q.asset_id===O).length,children:e.childAssetsFor(O).length,schedules:e.getPreventiveSchedules().filter(q=>q.asset_id===O).length,requests:e.getMaintenanceRequests().filter(q=>q.asset_id===O).length}}function y(O){let q=h(O);return Object.values(q).some(Boolean)}async function w(O){let[q,_,v]=await Promise.all([k("work_orders",O),k("preventive_schedules",O),k("maintenance_requests",O)]);return{workOrders:q,children:e.childAssetsFor(O).length,schedules:_,requests:v}}async function k(O,q){let{count:_,error:v}=await e.withOperationTimeout(e.supabaseClient().from(O).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",q),`Equipment delete check timed out while checking ${O}.`,15e3);if(v)throw new Error(`Could not verify linked ${O.replaceAll("_"," ")} before deleting equipment: ${v.message}`);return _||0}async function P(O){if(!e.canDeleteEquipment()){o("Only company admins and managers can delete equipment.");return}let q=n.querySelector("#asset-delete-error");q&&(q.textContent="");try{let _=await w(O),v=e.assetDeleteBlockerMessage(_);if(v){q&&(q.textContent=v);return}e.setPendingDeleteAssetId(O),e.renderWorkspace()}catch(_){q?q.textContent=_.message||"Could not verify equipment links before delete.":e.showNotice(_.message||"Could not verify equipment links before delete.","warning")}}async function C(O){if(!e.canDeleteEquipment()){o("Only company admins and managers can delete equipment.");return}let q=n.querySelector("#asset-delete-error");q&&(q.textContent="");let _=n.querySelector(`[data-confirm-delete-asset="${s.escape(O)}"]`);_&&(_.disabled=!0,_.textContent="Deleting...");try{let v=await w(O),I=e.assetDeleteBlockerMessage(v);if(I)throw new Error(I);let D=e.getAssetDocumentStoragePaths?.(O)||[];if(D.length){let x=await e.withOperationTimeout(e.removeAssetDocumentStorage(D),"Equipment file cleanup timed out.",15e3);if(x.error)throw new Error(`Could not remove equipment files: ${x.error.message}`)}let{error:W}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",O).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(W)throw new Error(W.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":W.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(v){q&&(q.textContent=v.message||"Could not delete equipment."),_&&(_.disabled=!1,_.textContent="Permanently Delete")}}async function E(O,q="running"){let _={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:O,asset_type:"machine",safety_devices_required:!0,status:q,created_by:a()},v=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(_).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return v.error&&e.isMissingColumnError(v.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(v,e.databaseSetupRequiredMessage("adding equipment in this location"))):v.error&&e.isMissingColumnError(v.error,"created_by")?e.withSetupError(v,"Run supabase/step-next-asset-events.sql before saving equipment history."):v.error&&e.isAssetHierarchySchemaError(v.error)?e.withSetupError(v,e.equipmentSchemaMessage(v.error).replace("saving","adding")):(!v.error&&v.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(v.data.id,"created",`Created ${O}.`),v)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:k,createAsset:d,createQuickFixAsset:E,deleteAsset:C,loadAssetDeleteBlockers:w,removeAssetPart:f,requestDeleteAsset:P,updateAsset:r,updateAssetStatus:p}}typeof qe<"u"&&qe.exports&&(qe.exports={createAssetWorkflow:l}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:l}})()});var Vt=U((or,Se)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.alertRef||alert,s=e.CSSRef||CSS;function m(){let p=n.querySelector("#detail-panel");p.innerHTML=e.renderRequestFormContent()}async function a(p){p.preventDefault(),await i(p.target)}async function i(p){let g=n.querySelector("#request-error"),f=p.querySelector("button[type='submit']");g&&(g.textContent=""),f&&(f.disabled=!0,f.textContent="Submitting...");try{let h=new t(p),y=h.get("asset_id")||null,w=String(h.get("equipment_note")||"").trim();if(y&&w)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!w)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let k=w||e.assetNameFor?.(y)||"Saved equipment",P=e.requiredText(h.get("description"),"Request details"),C=e.requiredText(h.get("requester_name"),"Your name"),E={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${k}

${P}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:C};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:O,error:q}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(E).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(q&&e.isMissingColumnError(q,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(q)throw q;let _=h.get("photo"),v="";if(_&&_.name){let D=await e.addPhotoToMaintenanceRequest(O.id,_);D&&(v=` Photo did not upload: ${D.message||D}`)}let I=await e.notifyRequestEmailer(O.id);I?.error&&console.warn("Request email notification did not send",I.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${v}`,v?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":o(h.message||h)}finally{f&&(f.disabled=!1,f.textContent="Submit Request")}}async function c(p){if(!e.getMaintenanceRequests().find(h=>h.id===p))return;let f=n.querySelector(`[data-convert-request="${s.escape(p)}"]`);f&&(f.disabled=!0,f.textContent="Converting...");try{let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().rpc("convert_maintenance_request",{target_company_id:e.getActiveCompanyId(),target_request_id:p}),"Request conversion timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.id)throw new Error("Conversion did not return a work order. Review the request before retrying.");e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),f&&(f.disabled=!1,f.textContent="Convert to Work Order")}}function u(p){let g=e.getMaintenanceRequests().find(f=>f.id===p);g&&(e.setQuickFixRequestId(p),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function d(p){if(!e.canDeleteOperationalRecords()){o("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===p)&&(e.setPendingDeleteRequestId(p),e.renderWorkspace())}async function r(p){if(!e.canDeleteOperationalRecords()){o("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===p);if(!g)return;let f=n.querySelector(`[data-confirm-delete-request="${s.escape(p)}"]`);f&&(f.disabled=!0,f.textContent="Deleting...");try{if(g.photo_storage_path){let k=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(k.error)throw new Error(`Could not remove request photo: ${k.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let w=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(w.error)throw new Error(`Request delete verification failed: ${w.error.message}`);if(w.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),f&&(f.disabled=!1,f.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:c,createRequest:a,createRequestFromForm:i,deleteMaintenanceRequest:r,openQuickFixForRequest:u,renderRequestForm:m,requestDeleteMaintenanceRequest:d}}typeof Se<"u"&&Se.exports&&(Se.exports={createRequestLifecycleWorkflow:l}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:l}})()});var Ht=U((ir,Ce)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.alertRef||alert;async function s(m){m.preventDefault();let a=m.target,i=a.querySelector("button[type='submit']"),c=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",c&&(c.textContent="");try{let u=new t(a),d=u.get("status")||"open",r=u.get("asset_id")||null,p=String(u.get("new_asset_name")||"").trim();if(r&&p)throw new Error("Choose existing equipment or create new equipment, not both.");if(p){let{data:E,error:O}=await e.createQuickFixAsset(p,"running");if(O){c&&(c.textContent=`Could not add equipment: ${O.message}`);return}r=E.id}if(!p&&!e.confirmAssetLocationRouting(r,"creating this work order",c))return;if(d==="completed"&&e.assetRequiresSafety(r)&&u.get("safety_devices_checked")!=="on"){c&&(c.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=d==="completed"?e.blocksProcedureCompletion(null,u.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),c&&(c.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let f={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(r),title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),asset_id:r,priority:u.get("priority"),type:u.get("type")||"corrective",due_at:e.workOrderDateValue(u.get("due_at")),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),status:d,created_by:e.getSession().user.id,actual_minutes:Number(u.get("actual_minutes"))||0,failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",completion_notes:u.get("completion_notes")||null,completed_at:d==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(f),e.applySafetyCheckPayload(f,d==="completed"&&f.safety_check_required&&u.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",f,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){c&&(c.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),p&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${p}.`);let w=[],k=u.get("part_id");if(k){let E=e.getParts().find(q=>q.id===k),O=await e.addPartUsageToWorkOrder(h.id,E,Number(u.get("quantity_used"))||1);O?w.push(`part usage failed: ${O.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${E?.name||"Part"}.`)}let P=u.get("photo");if(P&&P.name){let E=await e.addPhotoToWorkOrder(h.id,P);E?w.push(`photo upload failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${P.name}.`)}let C=String(u.get("initial_comment")||"").trim();if(C){let E=await e.addCommentToWorkOrder(h.id,C);E?w.push(`comment failed: ${E.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(w.length?`Work order created with warning: ${w[0]}`:"Work order created.",w.length?"warning":"success"),await e.render()}catch(u){c?c.textContent=`Could not create work order: ${u.message||u}`:o(u.message||u)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderCreationWorkflow:l}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:l}})()});var Yt=U((sr,$e)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.consoleRef||console;async function s(m){m.preventDefault();let i=m.target.querySelector("button[type='submit']"),c=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",c&&(c.textContent="");try{let u=new t(m.target),d=e.getActiveWorkOrderId(),r=e.getWorkOrders().find(E=>E.id===d),p=n.querySelector("#status-select")?.value||r?.status||"open",g=u.has("asset_id"),f=g?u.get("asset_id")||null:r?.asset_id||null;if(g&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(f,"saving this work order",c)){i.disabled=!1,i.textContent="Save Work Order";return}let h={title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),due_at:e.workOrderDateValue(u.get("due_at")),status:p,priority:u.get("priority"),type:u.get("type"),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",actual_minutes:Number(u.get("actual_minutes"))||0};if(g&&(h.asset_id=f,h.location_id=e.locationIdForAsset(f)),h.safety_check_required=e.assetRequiresSafety(f),h.status==="completed"){let E=e.productionActionCompletionMessage?.(r)||"";if(E){e.setWorkOrderActionWarning(d,E),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=E);return}}if(h.status==="completed"&&h.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(r)&&u.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let y=(r?.procedure_template_id||"")!==(h.procedure_template_id||""),w=h.status==="completed"&&(r?.status!=="completed"||y)?e.blocksProcedureCompletion(r,h.procedure_template_id||null):"";if(w){e.setWorkOrderActionWarning(d,w),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=w);return}h.status==="completed"&&r?.status!=="completed"?(h.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(h,h.safety_check_required&&(u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(r)))):h.status!=="completed"?(h.completed_at=null,e.applySafetyCheckPayload(h,!1)):r?.status==="completed"&&h.safety_check_required&&u.has("safety_devices_checked")?e.applySafetyCheckPayload(h,u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(r)):r?.status==="completed"&&!h.safety_check_required&&e.applySafetyCheckPayload(h,!1);let{error:k}=await e.withOperationTimeout(e.updateWorkOrderSafely(h,d),"Work order save timed out. Check your connection and try again.",2e4);if(k){i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(k)}`);return}let P={...Object.fromEntries(u.entries()),status:p},C=await e.withOperationTimeout(e.recordWorkOrderEvent(d,"updated",e.describeWorkOrderChanges(r,P)),"Activity log timed out.",8e3).catch(E=>E);e.setWorkOrderActionWarning("",""),e.showNotice(C?`Work order saved, but history did not update: ${C.message}`:"Work order saved.",C?"warning":"success"),await e.render()}catch(u){o.error("Work order save failed",u),i.disabled=!1,i.textContent="Save Work Order",c&&(c.textContent=`Could not save work order: ${u.message||u}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderDetailEditWorkflow:l}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:l}})()});var Kt=U((cr,Pe)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function o(m){m.preventDefault();let a=m.currentTarget,i=n.querySelector("#parts-used-error"),c=a.querySelector("button[type='submit']");i&&(i.textContent=""),c&&(c.disabled=!0,c.textContent="Recording...");try{let u=new t(a),d=u.get("part_id"),r=Number(u.get("quantity_used"))||1,p=e.getParts().find(f=>f.id===d);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!p)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),p,r);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(u){i&&(i.textContent=u.message||"Could not record part used.")}finally{c&&(c.disabled=!1,c.textContent="Record Part Used")}}async function s(m,a,i){if(!a)return new Error("Choose a part first.");let{error:c}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:m,p_part_id:a.id,p_quantity:i}),"Part usage save timed out.");return c||null}return{addPartUsageToWorkOrder:s,recordPartUsed:o}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createPartUsageWorkflow:l}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:l}})()});var Jt=U((lr,Ae)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.cryptoRef||crypto,s=e.consoleRef||console,m=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),a=25*1024*1024,i=5*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),u=new Set;async function d(b){b.preventDefault();let $=b.currentTarget,A=$.dataset.partDocument,R=n.querySelector(`[data-part-document-error="${A}"]`),S=$.querySelector("button[type='submit']"),N=new t($),L=N.get("document"),j=h(N.get("document_type"));if(R&&(R.textContent=""),!e.getPartDocumentsReady()){R&&(R.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!L||!L.name){R&&(R.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(_(L)){R&&(R.textContent=v()),await C("part document",L,v());return}S&&(S.disabled=!0,S.textContent="Attaching...");let V=await O(L),Z=V.fileName||e.safeFileName(L.name||"part-file"),re=`${e.getActiveCompanyId()}/${A}/${o.randomUUID()}-${Z}`;try{let se=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,V.blob,{contentType:V.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(se.error)throw se.error;let J={company_id:e.getActiveCompanyId(),part_id:A,uploaded_by:e.getSession().user.id,storage_path:re,file_name:Z,content_type:V.contentType,document_type:j,file_size_bytes:V.blob.size||null,original_file_name:e.safeFileName(L.name||"part-file"),original_size_bytes:L.size||null},{error:ae}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(J),"Part file record save timed out. Check your connection and try again.",15e3);if(ae&&e.isColumnSchemaError(ae,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete J.document_type,delete J.file_size_bytes,delete J.original_file_name,delete J.original_size_bytes,ae=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(J),"Part file record retry timed out. Check your connection and try again.",15e3)).error),ae)throw await w("part-documents",re),e.isColumnSchemaError(ae,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?ae.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(se){await C("part document",L,se),R&&(R.textContent=se.message||"Could not attach file.")}finally{S&&(S.disabled=!1,S.textContent="Attach File")}}async function r(b){b.preventDefault();let $=b.currentTarget,A=$.dataset.assetDocument,R=n.querySelector(`[data-asset-document-error="${A}"]`),S=$.querySelector("button[type='submit']"),N=new t($),L=N.get("document"),j=f(N.get("document_type"));if(R&&(R.textContent=""),!e.getAssetDocumentsReady?.()){R&&(R.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!L||!L.name){R&&(R.textContent="Choose a machine file first.");return}if(_(L)){R&&(R.textContent=v()),await C("equipment file",L,v());return}S&&(S.disabled=!0,S.textContent="Uploading...");let V=await O(L),Z=`${e.getActiveCompanyId()}/${A}/${o.randomUUID()}-${V.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(Z,V.blob,{contentType:V.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:se}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:A,uploaded_by:e.getSession().user.id,storage_path:Z,file_name:V.fileName,content_type:V.contentType,document_type:j,file_size_bytes:V.blob.size||null,original_file_name:e.safeFileName(L.name||"machine-photo"),original_size_bytes:L.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(se)throw await w("asset-documents",Z),e.isColumnSchemaError(se,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?se.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await C("equipment file",L,re),R&&(R.textContent=re.message||"Could not upload machine file.")}finally{S&&(S.disabled=!1,S.textContent="Attach Machine File")}}async function p(b,$){let A=n.querySelector("[data-asset-document-error]");if(A&&(A.textContent=""),!b||!$){let R="Missing machine file record. Refresh and try again.";A?A.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([$]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",b).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(S)throw S;e.showNotice("Machine file deleted."),await e.render()}catch(R){A?A.textContent=R.message||"Could not delete machine file.":e.showNotice(R.message||"Could not delete machine file.","warning")}}async function g(b,$){let A=n.querySelector("#photo-error");if(A&&(A.textContent=""),!b||!$){let R="Missing photo record. Refresh and try again.";A?A.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([$]),"Photo delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",b).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(S)throw S;let N=$.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${N}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(R){A?A.textContent=R.message||"Could not delete photo.":e.showNotice(R.message||"Could not delete photo.","warning")}}function f(b){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(b)?b:"other"}function h(b){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(b)?b:"other"}async function y(b){b.preventDefault();let $=b.currentTarget,A=$.querySelector("button[type='submit']"),R=n.querySelector("#photo-error");R&&(R.textContent="");let S=new t($).get("photo");if(!S||!S.name){R&&(R.textContent="Choose a photo first.");return}let N=D(S);if(N){R&&(R.textContent=N),await C("work order photo",S,N);return}A.disabled=!0,A.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let j=await k(e.getActiveWorkOrderId(),S);if(j)throw j;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${S.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(L){await C("work order photo",S,L),R&&(R.textContent=`Could not upload photo: ${L.message||L}`)}finally{A.disabled=!1,A.textContent="Upload Photo"}}async function w(b,$){try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().storage.from(b).remove([$]),"Uploaded file cleanup timed out.",1e4);A&&s.warn(`Could not remove uploaded ${b} object`,A)}catch(A){s.warn(`Could not remove uploaded ${b} object`,A)}}async function k(b,$){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let R=D($);if(R)return await C("work order photo",$,R),new Error(R);let S=await O($,E()),N=W(S);if(N)return await C("work order photo",$,N),new Error(N);let L=`${e.getActiveCompanyId()}/${b}/${o.randomUUID()}-${S.fileName}`,j=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(L,S.blob,{contentType:S.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(j.error)return await C("work order photo",$,j.error),j.error;let V={company_id:e.getActiveCompanyId(),work_order_id:b,uploaded_by:e.getSession().user.id,storage_path:L,file_name:S.fileName,content_type:S.contentType,file_size_bytes:S.blob.size||null,original_file_name:e.safeFileName($.name||"photo"),original_size_bytes:$.size||null},{error:Z}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(V),"Photo record save timed out. Check your connection and try again.",15e3);return Z&&e.isColumnSchemaError(Z,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete V.file_size_bytes,delete V.original_file_name,delete V.original_size_bytes,Z=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(V),"Photo record retry timed out. Check your connection and try again.",15e3)).error),Z&&await w("work-order-photos",L),Z&&await C("work order photo",$,Z),Z||null}async function P(b,$){if(!b)return new Error("Request was not saved before photo upload.");let A=D($);if(A)return await C("request photo",$,A),new Error(A);let R=await O($,E()),S=W(R);if(S)return await C("request photo",$,S),new Error(S);let N=`${b}/${o.randomUUID()}-${R.fileName}`,L=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(N,R.blob,{contentType:R.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(L.error)return await C("request photo",$,L.error),L.error;let{error:j}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:b,p_photo_storage_path:N,p_photo_file_name:R.fileName,p_photo_content_type:R.contentType,p_photo_file_size_bytes:R.blob.size||null,p_photo_original_file_name:e.safeFileName($.name||"photo"),p_photo_original_size_bytes:$.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return j&&(await w("maintenance-request-photos",N),await C("request photo",$,j)),j||null}async function C(b,$,A){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let R=String(A?.message||A||"Upload failed").slice(0,500),S=e.safeFileName($?.name||"unknown-file"),N=I($),L=Number($?.size||0),j=[b,S,N,L,R].join("|");if(!u.has(j)){u.add(j);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||b||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${b}`.slice(0,140),details:[`Upload context: ${b}`,`File: ${S}`,`Type: ${N}`,`Size: ${L}`,`Error: ${R}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(V){s.warn("Could not report upload failure",V)}}}function E(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function O(b,$={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(b,$);let A=["image/jpeg","image/png","image/webp","image/heic","image/heif"],R=I(b);if(!A.includes(R)&&!($.acceptAnyImage&&R.startsWith("image/")))return{blob:b,fileName:e.safeFileName(b.name||"photo"),contentType:R};try{if(!m)throw new Error("Browser image optimization is unavailable.");let S=await m(b),N=Number($.targetBytes||0)||1*1024*1024,L=$.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],j=null;for(let V of L){let Z=await x(S,V.maxDimension,V.quality);if(j=Z,Z.size<=N)break}if(S.close&&S.close(),!j)throw new Error("Browser could not optimize this image.");return{blob:j,fileName:`${e.fileBaseName(b.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(S){return s.warn("Photo optimization failed; uploading original.",S),{blob:b,fileName:e.safeFileName(b.name||"photo"),contentType:R}}}function q(b){return["image/jpeg","image/png","image/webp"].includes(I(b))}function _(b){return!q(b)&&Number(b.size||0)>a}function v(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function I(b){let $=String(b?.type||"").trim().toLowerCase();if($)return $;let A=String(b?.name||"").toLowerCase();return/\.(jpe?g)$/.test(A)?"image/jpeg":/\.png$/.test(A)?"image/png":/\.webp$/.test(A)?"image/webp":/\.gif$/.test(A)?"image/gif":/\.heic$/.test(A)?"image/heic":/\.heif$/.test(A)?"image/heif":/\.pdf$/.test(A)?"application/pdf":/\.txt$/.test(A)?"text/plain":/\.csv$/.test(A)?"text/csv":/\.doc$/.test(A)?"application/msword":/\.docx$/.test(A)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(A)?"application/vnd.ms-excel":/\.xlsx$/.test(A)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function D(b){let $=I(b);return c.has($)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function W(b){return c.has(String(b?.contentType||"").toLowerCase())?Number(b?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function x(b,$,A){let R=Math.min(1,$/Math.max(b.width,b.height)),S=Math.max(1,Math.round(b.width*R)),N=Math.max(1,Math.round(b.height*R)),L=n.createElement("canvas");L.width=S,L.height=N,L.getContext("2d",{alpha:!1}).drawImage(b,0,0,S,N);let V=await new Promise(Z=>L.toBlob(Z,"image/jpeg",A));if(!V)throw new Error("Browser could not optimize this image.");return V}return{addPhotoToMaintenanceRequest:P,addPhotoToWorkOrder:k,optimizePhoto:O,removeUploadedObject:w,reportUploadFailure:C,deleteAssetDocument:p,deleteWorkOrderPhoto:g,uploadAssetDocument:r,uploadPartDocument:d,uploadPhoto:y}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMediaStorageWorkflow:l}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:l}})()});var Zt=U((ur,Ee)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,o=e.cryptoRef||crypto,s=e.URLRef||URL,m=e.consoleRef||console,a=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,c=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function u(f){f.preventDefault();let h=f.currentTarget,y=n.querySelector("#company-logo-error"),w=h.querySelector("button[type='submit']"),k=new t(h).get("logo");if(y&&(y.textContent=""),!k||!k.name){y&&(y.textContent="Choose a logo image first.");return}w&&(w.disabled=!0,w.textContent="Uploading...");try{let P=p(k);if(P)throw new Error(P);let C=await d(k),E=g(C);if(E)throw new Error(E);let O=`${e.getActiveCompanyId()}/logo-${o.randomUUID()}-${C.fileName}`,q=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(O,C.blob,{contentType:C.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(q.error)throw new Error(q.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":q.error.message);let{error:_}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:O}),"Company logo record save timed out. Check your connection and try again.",15e3);if(_)throw await e.removeUploadedObject("company-logos",O),new Error(e.isColumnSchemaError(_,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":_.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":_.message);let v=e.getCompanies().find(I=>I.id===e.getActiveCompanyId());v&&(v.logo_path=O,v.logoUrl=s.createObjectURL(C.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(P){y&&(y.textContent=P.message||"Could not upload logo.")}finally{w&&(w.disabled=!1,w.textContent="Upload Logo")}}async function d(f){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(f);let h=r(f);try{if(!a)throw new Error("Browser logo optimization is unavailable.");let y=await a(f),k=Math.min(1,1200/Math.max(y.width,y.height)),P=Math.max(1,Math.round(y.width*k)),C=Math.max(1,Math.round(y.height*k)),E=n.createElement("canvas");E.width=P,E.height=C;let O=E.getContext("2d",{alpha:!0});O.clearRect(0,0,P,C),O.drawImage(y,0,0,P,C),y.close&&y.close();let q=await new Promise(_=>E.toBlob(_,"image/png"));if(!q)throw new Error("Browser could not optimize this logo.");return{blob:q,fileName:`${e.fileBaseName(f.name||"logo")}.png`,contentType:"image/png"}}catch(y){return m.warn("Logo optimization failed; uploading original.",y),{blob:f,fileName:e.safeFileName(f.name||"logo"),contentType:h}}}function r(f){let h=String(f?.type||"").trim().toLowerCase();if(h)return h;let y=String(f?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function p(f){let h=r(f);return c.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(f){return c.has(String(f?.contentType||"").toLowerCase())?Number(f?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:d,uploadCompanyLogo:u}}typeof Ee<"u"&&Ee.exports&&(Ee.exports={createCompanyLogoWorkflow:l}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:l}})()});var Xt=U((dr,Ze)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,o=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function m(i){if(!e.canDeleteParts()){o("Only company admins and managers can delete parts.");return}if(!e.getParts().find(r=>r.id===i))return;let u=s(i);if(u){o(u);return}let d=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||d){a(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function a(i){if(!e.canDeleteParts()){o("Only company admins and managers can delete parts.");return}let c=e.getParts().find(p=>p.id===i),u=n.querySelector("#part-delete-error");if(u&&(u.textContent=""),!c)return;let d=s(i);if(d){u&&(u.textContent=d);return}let r=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);r&&(r.disabled=!0,r.textContent="Deleting...");try{let p=(e.getPartDocumentsByPartId()[i]||[]).map(y=>y.storage_path).filter(Boolean);if(p.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(p),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:f}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(f)throw new Error(f.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":f.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(p){e.showNotice(p.message||"Could not delete part.","warning"),u&&(u.textContent=p.message||"Could not delete part."),r&&(r.disabled=!1,r.textContent="Permanently Delete")}}return{deletePart:a,requestDeletePart:m}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:l},typeof Ze<"u"&&(Ze.exports={createPartDeleteWorkflow:l})})()});var en=U((pr,Xe)=>{(function(){function l(e={}){function n(o){if(!o.isConnected)return;let s=e.getWorkOrders().find(g=>g.id===o.dataset.workOrderId),m=e.getProcedureTemplates().find(g=>g.id===s?.procedure_template_id);if(!m)return;let a=e.checklistProgress(s,m),i=e.requiredChecklistProgress(s,m),c=o.closest(".detail-stack"),u=c?.querySelector("[data-checklist-summary]"),d=c?.querySelector(".relationship-chip.procedure > span");u&&(u.textContent=`${a.done} of ${a.total} complete - required ${i.done}/${i.total}`),d&&(d.textContent=`${a.done}/${a.total}`);let r=o.closest(".checklist-step")?.querySelector("[data-checklist-recorded]"),p=e.getStepResultsByWorkOrder()[s.id]?.[o.dataset.stepResult];r&&(r.textContent=p?.completed_at?`Recorded ${new Date(p.completed_at).toLocaleString()}`:"")}async function t(o){let s=o.target,m=s.type==="checkbox"?s.checked?"checked":"":s.value;s.disabled=!0;try{let{error:a}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:s.dataset.workOrderId,procedure_step_id:s.dataset.stepResult,completed_by:m?e.getSession().user.id:null,value:m,completed_at:m?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(a)throw a;await e.withOperationTimeout(e.recordWorkOrderEvent(s.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let i=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(c=>c);if(i){e.showNotice(`Checklist saved, but refresh did not finish: ${i.message||i}`,"warning"),s.disabled=!1;return}if(e.getWorkOrderActionWarningId()===s.dataset.workOrderId){let c=e.getWorkOrders().find(u=>u.id===s.dataset.workOrderId);e.blocksProcedureCompletion(c)||e.setWorkOrderActionWarning("","")}s.disabled=!1,n(s)}catch(a){e.showNotice(`Could not save checklist step: ${a.message||a}`,"warning"),s.disabled=!1}}return{saveStepResult:t}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:l},typeof Xe<"u"&&(Xe.exports={createProcedureChecklistWorkflow:l})})()});var tn=U((mr,et)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,o=e.FormDataCtor||FormData;async function s(u,d){let{data:r,error:p}=await e.withOperationTimeout(e.getPublicRequestIntake(u),d);return{data:Array.isArray(r)?r[0]:r,error:p}}async function m(u){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let d=null;try{let{data:p,error:g}=await s(u,"Request QR lookup timed out.");if(d=p,g||!d){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let r=e.publicRequestUrl(u);e.setAppHtml(e.publicRequestQrPage(d,r)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(d,r)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function a(u){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let d=null;try{let{data:r,error:p}=await s(u,"Request form lookup timed out.");if(p){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}d=r}catch(r){i(r.message||"This request link could not be loaded.");return}if(!d){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(d)),n.querySelector("#public-request-form").addEventListener("submit",r=>c(r,u,d))}function i(u){e.setAppHtml(e.publicRequestError(u))}async function c(u,d,r){u.preventDefault();let p=u.currentTarget,g=new o(p),f=n.querySelector("#public-request-error"),h=p.querySelector("button[type='submit']");f&&(f.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:w}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:d,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(w)throw w;let k=g.get("photo"),P="";if(k&&k.name){let E=await e.addPhotoToMaintenanceRequest(y,k);E&&(P=`Request sent, but the photo did not upload: ${E.message||E}`)}let C=await e.notifyRequestEmailer(y);C.error&&e.warn("Request email notification did not send",C.error),e.setAppHtml(e.publicRequestSuccess(r,P)),n.querySelector("#public-request-another").addEventListener("click",()=>a(d))}catch(y){f&&(f.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:a,renderPublicRequestQrPage:m,submitPublicRequest:c}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:l},typeof et<"u"&&(et.exports={createPublicRequestIntakeWorkflow:l})})()});var nn=U((fr,tt)=>{(function(){function l(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function o(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(m){m.preventDefault();let a=m.target,i=a.querySelector("button[type='submit']"),c=n.querySelector("#company-error"),u=String(new t(a).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",c.textContent="";try{if(!u)throw new Error("Company name is required.");let d=e.getCompanies().find(f=>f.name.trim().toLowerCase()===u.trim().toLowerCase());if(d){e.setActiveCompanyId(d.id),e.persistActiveCompanyId(d.id),await e.render();return}let{data:r,error:p}=await e.withOperationTimeout(e.createCompanyRecord(u),"Company creation timed out.");if(p){c.textContent=p.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":p.message;return}if(e.setActiveCompanyId(r),e.persistActiveCompanyId(r),!await e.ensureProfileForActiveCompany(u))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(d){c.textContent=d.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:o}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:l},typeof tt<"u"&&(tt.exports={createCompanySetupWorkflow:l})})()});var rn=U((gr,nt)=>{(function(){function l(e={}){async function n(o){let s=e.getWorkOrders().find(m=>m.id===e.getActiveWorkOrderId());o.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),o.target.value)||(o.target.value=s?.status||"open")}catch(m){o.target.value=s?.status||"open",e.showNotice(`Could not update status: ${m.message||m}`,"warning")}finally{o.target.disabled=!1}}async function t(o,s){let m=e.getWorkOrders().find(d=>d.id===o);if(s==="completed"){let d=e.productionActionCompletionMessage?.(m)||"";if(d)return e.setActiveWorkOrderId(o),e.setWorkOrderActionWarning(o,d),e.showNotice(d,"warning"),await e.render(),!1;let r=e.blocksProcedureCompletion(m);if(r)return e.setActiveWorkOrderId(o),e.setWorkOrderActionWarning(o,r),e.showNotice(r,"warning"),await e.render(),!1}let a=e.currentSafetyCheckboxCheckedForWorkOrder(o),i=e.hasCompletedSafetyDeviceCheck(m)||a;if(s==="completed"&&e.requiresSafetyDeviceCheck(m)&&!i){e.setActiveWorkOrderId(o);let d="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(o,d),e.showNotice(d,"warning"),await e.render(),!1}let c={status:s,asset_id:m?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(c),s==="completed"?e.applySafetyCheckPayload(c,c.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(c,!1),delete c.asset_id;let{error:u}=await e.withOperationTimeout(e.updateWorkOrderSafely(c,o),"Status save timed out. Check your connection and try again.",15e3);return u?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(u)}`,"warning"),!1):(e.setActiveWorkOrderId(o),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(o,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:l},typeof nt<"u"&&(nt.exports={createWorkOrderStatusWorkflow:l})})()});var an=U((hr,Re)=>{(function(){function l(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function o(c,u){return c?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${u}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${u}"]`)||null}async function s({workOrderId:c,payload:u,source:d,busyText:r,successMessage:p}){let g=d?.querySelector?.("button[type='submit']")||d,f=g?.textContent||"",h=o(d,c);g&&(g.disabled=!0,g.textContent=r),h&&(h.textContent="");try{let y=await e.withOperationTimeout(e.updateProductionActionRecord(c,u),"Production Action save timed out. Check your connection and try again.",15e3);if(y.error){let w=e.friendlyWorkOrderSaveError(y.error);return h?h.textContent=`Could not save Production Action: ${w}`:e.showNotice(`Could not save Production Action: ${w}`,"warning"),!1}return e.showNotice(p,"success"),await e.afterProductionActionMutation(y.data,c),!0}catch(y){let w=y.message||String(y);return h?h.textContent=`Could not save Production Action: ${w}`:e.showNotice(`Could not save Production Action: ${w}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=f)}}async function m(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,d=u.dataset.productionActionForm,r=new n(u),p=String(r.get("production_action")||"").trim(),g=String(r.get("production_action_assigned_to")||"").trim(),f=o(u,d);if(!p||!g){f&&(f.textContent="Enter an action and choose a Production owner.");return}let h=e.getWorkOrderById(d);await s({workOrderId:d,payload:{production_action:p,production_action_assigned_to:g},source:u,busyText:"Saving...",successMessage:h?.production_action?"Production Action updated.":"Production Action assigned."})}async function a(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,d=u.dataset.workOrderId,r=u.dataset.productionActionStatus;await s({workOrderId:d,payload:{production_action_status:r},source:u,busyText:r==="completed"?"Completing...":"Reopening...",successMessage:r==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(c){c.preventDefault(),c.stopPropagation();let u=c.currentTarget,d=u.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:d,payload:{production_action:null},source:u,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:m,setProductionActionStatus:a,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:l},typeof Re<"u"&&Re.exports&&(Re.exports={createProductionActionWorkflow:l})})()});var on=U((yr,rt)=>{(function(){function l(e={}){async function n(s,m={}){let a=s.filter(d=>d.id&&!d.read_at);if(!a.length)return!0;let i=new Map(a.map(d=>[d.id,d])),c=new Date().toISOString(),u=a.map(d=>d.id);e.setNotifications(e.getNotifications().map(d=>i.has(d.id)?{...d,read_at:c}:d)),m.render!==!1&&e.renderWorkspace();try{let d=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,u,c),"Work notification update timed out.",1e4);if(d.error)throw d.error;return!0}catch(d){return e.setNotifications(e.getNotifications().map(r=>i.get(r.id)||r)),e.showNotice(`Could not mark the work notification read: ${d.message||d}`,"warning"),m.render!==!1&&e.renderWorkspace(),!1}}function t(s,m={}){let a=e.getNotifications().find(i=>i.id===s);return a?.read_at?Promise.resolve(!0):n([a||{id:s,read_at:null}],m)}function o(s,m={}){return n(e.getNotifications().filter(a=>a.work_order_id===s),m)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:o}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:l},typeof rt<"u"&&(rt.exports={createWorkOrderNotificationWorkflow:l})})()});var sn=U((wr,at)=>{(function(){function l(e){async function n(t,o){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(m=>m.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let m=e.workOrderDateValue(o);if(!m)throw new Error("Choose a due date.");let a=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:m},t),"Due date save timed out. Check your connection and try again.");if(a.error)throw a.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:m}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:m}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${m} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:m}}catch(m){return e.showNotice(`Could not set due date: ${m.message||m}`,"warning"),{saved:!1,reason:"save_failed",error:m}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:l},typeof at<"u"&&(at.exports={createPlanningDueDateWorkflow:l})})()});var cn=U((br,ot)=>{(function(){function l(n,t,o,s=50){let m=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",o).order("created_at",{ascending:!1}).limit(m)}function e(n,t,o,s){let m=[...new Set((o||[]).filter(Boolean))];return m.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",m).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e},typeof ot<"u"&&(ot.exports={listWorkOrderNotifications:l,markWorkOrderNotificationsRead:e})})()});var ln=U((vr,it)=>{(function(){async function l(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:o}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:o||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:l},typeof it<"u"&&(it.exports={notifyRequestEmailer:l})})()});var un=U((kr,st)=>{(function(){async function l(n,t,o=[],s={}){let m=s.pathKey||"storage_path",a=s.urlKey||"signedUrl",i=s.expiresIn||600,c=s.onError;await Promise.all(o.map(async u=>{let d=u?.[m];if(!d)return;let{data:r,error:p}=await n.storage.from(t).createSignedUrl(d,i);if(p){u[a]="",typeof c=="function"&&c(u,p);return}u[a]=r?.signedUrl||""}))}function e(n={}){function t(o){if(!o||!n.getReady())return;let m=(n.getRows(o)||[]).filter(i=>i.storage_path&&!i.signedUrl),a=n.getSigningMap();!m.length||a[o]||(a[o]=!0,n.withOperationTimeout(l(n.supabaseClient(),n.bucketName,m),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete a[o],n.getActiveGroupId()===o&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e},typeof st<"u"&&(st.exports={addSignedUrlsToRows:l,createDeferredSignedUrlLoader:e})})()});var dn=U((_r,ct)=>{(function(){function l(t,o){if(t[o]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${o}`);return t[o]}function e(t={}){let o=l(t,"supabaseClient"),s=l(t,"workspaceUiState"),m=l(t,"applyRequestQueryFilters"),a=l(t,"applyWorkOrderListFilters"),i=l(t,"applyWorkOrderFilters"),c=l(t,"selectWorkOrders"),u=l(t,"countWorkOrdersQuery"),d=l(t,"fetchExactSearchedWorkOrderPage"),r=l(t,"isColumnSchemaError"),p=t.warn||(()=>{}),g=l(t,"LIST_ITEMS_PER_PAGE"),f=l(t,"WORK_ORDERS_PER_PAGE"),h=l(t,"REQUEST_RELATION_SELECT"),y=l(t,"REQUEST_ASSET_FALLBACK_SELECT"),w=l(t,"REQUEST_FALLBACK_SELECT"),k=l(t,"WORK_ORDER_RELATION_SELECT"),P=l(t,"WORK_ORDER_FALLBACK_SELECT");function C(){return typeof o=="function"?o():o}async function E(W=s.getRequestViewFilter(),x={}){let b=Math.max(1,s.getRequestsPage()),$=(b-1)*g,A=$+g-1,R=x.includeRelations===!1?w:x.includeLocationRelation===!1?y:h,S=await m(C().from("maintenance_requests").select(R,{count:"exact"}),W).order("created_at",{ascending:!1}).range($,A);return S.error&&x.includeLocationRelation!==!1&&r(S.error,["location_id","locations"])?E(W,{includeLocationRelation:!1}):S.error&&x.includeRelations!==!1?E(W,{includeRelations:!1}):!S.error&&S.count&&b>1&&$>=S.count?(s.setRequestsPage(Math.max(1,Math.ceil(S.count/g))),E(W,x)):S}async function O(W){let x=await m(C().from("maintenance_requests").select("id",{count:"exact",head:!0}),W);return x.error?(p("Request count failed",x.error),0):x.count||0}async function q(){let[W,x,b]=await Promise.all([O("active"),O("converted"),O("all")]);return{active:W,converted:x,all:b}}async function _(W={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return d(W);let x=Math.max(1,s.getWorkOrderPage()),b=(x-1)*f,$=b+f-1,A=W.includeLocationRelation===!1?P:k,R=await a(c(C(),A,{count:"exact"})).range(b,$);return!R.error&&R.count&&x>1&&b>=R.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(R.count/f))),_(W)):R}async function v(W={}){let x=await i(u(C()),W);return x.error?(p("Work order count failed",x.error),0):x.count||0}async function I(){let[W,x,b,$,A,R,S,N]=await Promise.all([v({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),v({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:W,newWork:x,inProgress:b,blocked:$,overdue:A,completedAll:R,completedMonth:S,completedWeek:N}}async function D(){let[W,x,b,$,A,R,S,N]=await Promise.all([v({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),v({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:W,newWork:x,inProgress:b,blocked:$,overdue:A,completedAll:R,completedMonth:S,completedWeek:N}}return{fetchRequestPage:E,countRequests:O,loadRequestDashboardCounts:q,fetchWorkOrderPage:_,countWorkOrders:v,loadWorkOrderDashboardCounts:I,loadMyWorkDashboardCounts:D}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof ct<"u"&&(ct.exports=n)})()});var pn=U((qr,lt)=>{(function(){function l(e={}){let n=e.windowRef||window,t=e.documentRef||document,o=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function m(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function a(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){c("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let f=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;f=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;f=h?.session||null}if(!f){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;f=h?.session||null}if(!f)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(f),a(),c("Verification complete. Loading workspace..."),await e.render()}catch(f){a(),u(f.message||"This verification link is invalid or expired.")}}function c(g){t.body.classList.remove("public-qr-mode"),o.innerHTML=e.authCallback(g)}function u(g){t.body.classList.remove("public-qr-mode"),o.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function d(g=e.passwordRecoveryParamsFromUrl()){let f=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:w}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});f=!!(y?.session&&!w),w&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";p({ready:f,initialError:h})}function r(g="",f=""){t.body.classList.remove("public-qr-mode"),o.innerHTML=e.passwordResetRequest(g,f),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,w=y.querySelector("button[type='submit']"),k=t.querySelector("#auth-error"),P=t.querySelector("#auth-status"),C=String(new FormData(y).get("email")||"").trim();k.textContent="",P.textContent="Sending reset link...",w.disabled=!0,w.textContent="Sending...";try{let{error:E}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(C,{redirectTo:m()}),"Password reset email timed out. Check your connection and try again.",2e4);if(E){P.textContent="",k.textContent=E.message;return}P.textContent="If that email exists in Supabase, a reset link has been sent."}catch(E){P.textContent="",k.textContent=E.message||"Could not send reset link."}finally{t.body.contains(w)&&(w.disabled=!1,w.textContent="Send Reset Link")}})}function p({ready:g=!1,initialError:f=""}={}){t.body.classList.remove("public-qr-mode"),o.innerHTML=e.passwordRecovery({ready:g,initialError:f}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{a(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{a(),r()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,w=y.querySelector("button[type='submit']"),k=new FormData(y),P=String(k.get("password")||""),C=String(k.get("confirmPassword")||""),E=t.querySelector("#auth-error"),O=t.querySelector("#auth-status");if(E.textContent="",P.length<8){E.textContent="Password must be at least 8 characters.";return}if(P!==C){E.textContent="Passwords do not match.";return}O.textContent="Updating password...",w.disabled=!0,w.textContent="Updating...";try{let{error:q}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:P}),"Password update timed out. Try the newest reset link again.",2e4);if(q){O.textContent="",E.textContent=q.message;return}a();let{data:_}=await e.supabaseClient.auth.getSession();if(e.setSession(_.session),O.textContent=_.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",_.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(q){O.textContent="",E.textContent=q.message||"Could not update password."}finally{t.body.contains(w)&&(w.disabled=!1,w.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:m,clearPasswordRecoveryUrl:a,startAuthCallback:i,renderAuthCallback:c,renderAuthCallbackError:u,startPasswordRecovery:d,renderPasswordResetRequest:r,renderPasswordRecovery:p}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:l},typeof lt<"u"&&(lt.exports={createAuthSessionFlow:l})})()});var mn=U((Sr,Oe)=>{(function(){function l(m,a){let i=a.getProfilesByUserId();if(m.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${a.escapeHtml(i[m.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(m.created_at).toLocaleString()}</span>
        <p>${a.escapeHtml(m.body)}</p>
      </article>
    `;if(m.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${a.photoMetaText(m)} &middot; ${a.escapeHtml(i[m.uploaded_by]?.full_name||"Team member")}</span>
        <p>${a.escapeHtml(m.file_name)}</p>
        ${m.signedUrl?`<a href="${a.escapeHtml(m.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(m.type==="part"){let u=a.partUsageUnitCost(m)*(Number(m.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(m.created_at).toLocaleString()} &middot; ${a.escapeHtml(i[m.created_by]?.full_name||"Team member")}</span>
        <p>${a.escapeHtml(m.parts?.name||"Part")} - ${Number(m.quantity_used)||0} used - ${a.money(u)}</p>
      </article>
    `}return`
    <article>
      <strong>${a.escapeHtml(m.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(m.created_at).toLocaleString()} \xC2\xB7 ${a.escapeHtml(i[m.actor_id]?.full_name||"Team member")}</span>
      <p>${a.escapeHtml(m.summary)}</p>
    </article>
  `}function e(m,a){let i=a.getProcedureTemplates(),c=a.getPartsUsedByWorkOrder(),u=a.getCommentsByWorkOrder(),d=a.getPhotosByWorkOrder(),r=a.getMessageThreads(),p=i.find(P=>P.id===m.procedure_template_id),g=p?a.checklistProgress(m,p):null,f=(c[m.id]||[]).length,h=(u[m.id]||[]).length,y=(d[m.id]||[]).length,w=r.filter(P=>P.work_order_id===m.id).length,k=[];return m.asset_id&&k.push(n("asset","Equipment",m.assets?.name||"Linked",a)),p&&g&&k.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,a)),f&&k.push(n("parts","Parts",String(f),a)),h&&k.push(n("comment","Comments",String(h),a)),w&&k.push(n("message","Messages",String(w),a)),y&&k.push(t(m.id,String(y),a)),k.length?`<div class="relationship-row">${k.join("")}</div>`:""}function n(m,a,i,c){return`
    <span class="relationship-chip ${m}" title="${c.escapeHtml(a)}">
      ${o(m)}
      <span>${c.escapeHtml(i)}</span>
    </span>
  `}function t(m,a,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(m)}" title="Open photos">
      ${o("photo")}
      <span>${i.escapeHtml(a)}</span>
    </button>
  `}function o(m){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[m]||""}function s(m){return Object.freeze({renderActivityItem:a=>l(a,m),renderRelationshipChips:a=>e(a,m),relationshipChip:(a,i,c)=>n(a,i,c,m),photoJumpChip:(a,i)=>t(a,i,m),relationshipIcon:o})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Oe<"u"&&Oe.exports&&(Oe.exports={createRelationshipDisplayHelpers:s})})()});var fn=U((Cr,ut)=>{(function(){function l(e){let n=e.segmentIcon,t=e.escapeHtml,o=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,m=e.isConvertedRequest,a=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),c=e.getPendingDeleteRequestId,u=e.getProfilesByUserId;function d(f,h){return f==="converted"?`${h} converted`:f==="all"?`${h} total`:`${h} active`}function r(f,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",f.active],["converted","Converted",f.converted],["all","All",f.all]].map(([k,P,C])=>`
            <button class="segment ${h===k?"active":""}" data-request-filter="${k}" type="button" ${y.locked&&k!=="active"?"disabled":""}>
              ${n(k==="active"?"open":k==="converted"?"completed":"all")}${P} <span>${C}</span>
            </button>
          `).join("")}
        </div>
      `}function p(f){let h=m(f),y=i(),w=c()===f.id,k=u(),P=f.created_at?new Date(f.created_at):null,C=P&&!Number.isNaN(P.getTime())?P.toLocaleString():"date unavailable",E=f.assets?.name||f.locations?.name||"No equipment",O=f.requested_by_name||k[f.requested_by]?.full_name||"Requester",q=f.converted_by||f.reviewed_by||"",_=k[q]?.full_name||"",v=_?`Converted to work order by ${_}`:q?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",I=y&&a()?w?`
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
              <span><strong>Requester</strong>${t(O)}</span>
              <span><strong>Received</strong>${t(C)}</span>
            </div>
          </div>
          ${y&&!h&&f.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${f.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${f.id}" type="button">Convert to Work Order</button>
              ${I}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(v)}</span>
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
                  ${o()}
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
      `}return{requestPanelSubtitle:d,renderRequestFilterBar:r,renderMaintenanceRequest:p,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:l},typeof ut<"u"&&(ut.exports={createRequestDisplayHelpers:l})})()});var gn=U(($r,dt)=>{(function(){function l({statusLabel:e,workOrderTypeLabel:n=A=>String(A||"corrective").replace(/\b\w/g,R=>R.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:o,getWorkOrderFilter:s,getWorkOrderTypeFilter:m=()=>"all",getWorkOrderPriorityFilter:a=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:c=()=>"none",getActiveStatusFilter:u,getMyWorkFilter:d,getActiveSection:r,getDueState:p,getProcedureTemplates:g,getActiveWorkOrderId:f,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:w,TYPE_OPTIONS:k=[],OUTSIDE_VENDOR_VALUE:P,escapeHtml:C,cleanWorkOrderDescription:E,relationshipIcon:O,segmentIcon:q,isVendorAssigned:_,assignmentLabel:v,renderRelationshipChips:I,canAssignWorkOrderToMe:D,canManageTeam:W,renderProductionActionCard:x=()=>"",hasOpenProductionAction:b=()=>!1,hasUnreadProductionReady:$=()=>!1}){function A(){let T=o(),B=s(),G=u(),K=T?`${t(T)} Work`:B==="unassigned"?"Unassigned Work Orders":B==="vendor"?"Outside Vendor Work":B==="assigned"?"Assigned Work Orders":"Work Orders";return G==="active"||G==="all"?K==="Work Orders"?"Active Work Orders":`Active - ${K}`:`${e(G)} - ${K}`}function R(){let T=u();return T==="active"||T==="all"?"My Work":`${e(T)} - My Work`}function S(){return r()==="mywork"?R():A()}function N(T){let B=r(),G=d();return B==="mywork"?`${T} shown - ${B==="mywork"?G==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${T} shown`}function L(T,B,G){return`<option value="${C(T)}" ${T===G?"selected":""}>${C(B)}</option>`}function j(T){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[T]||"Any assignment"}function V(T){return T?T.charAt(0).toUpperCase()+T.slice(1):""}function Z(T=[]){let B=u(),G=B==="all"?"active":B,K=s(),X=o(),Y=m(),H=a(),ne=i(),ee=c(),de=["completed","completed_month","completed_week"].includes(B),oe=G==="active"&&K==="all"&&!X&&Y==="all"&&H==="all"&&ne==="newest"&&ee==="none",F=T.find(te=>te.userId===X),pe=[`Status: ${e(G)}`,`Assignment: ${j(K)}`,...F?[`Person: ${F.name}`]:[],...Y!=="all"?[`Type: ${n(Y)}`]:[],...H!=="all"?[`Priority: ${V(H)}`]:[]],he=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ue=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],M=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],ie=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
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
              <label class="work-control-field ${K!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ue.map(([te,ge])=>L(te,ge,K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${L("","Any team member",X)}
                  ${T.map(te=>L(te.userId,te.name,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Y!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${L("all","Any type",Y)}
                  ${k.map(te=>L(te,n(te),Y)).join("")}
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
      `}function re(T,B){if(B==="assignee"){if(_(T))return{key:"vendor",label:"Outside vendor",order:900};if(!T.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let X=v(T);return{key:`assignee:${T.assigned_to}`,label:X,order:100}}if(B==="status"){let X=["open","in_progress","blocked","completed"].indexOf(T.status);return{key:`status:${T.status}`,label:e(T.status),order:X<0?99:X}}if(B==="priority"){let X=["critical","high","medium","low"].indexOf(T.priority);return{key:`priority:${T.priority}`,label:V(T.priority||"Unspecified"),order:X<0?99:X}}let G=T.type||"corrective",K=k.indexOf(G);return{key:`type:${G}`,label:n(G),order:K<0?99:K}}function se(T,B={}){if(!T.length)return'<p class="muted">No work orders match these filters.</p>';let G=B.groupBy||"none";if(G==="none")return`<div class="work-list" id="work-order-list">${T.map(J).join("")}</div>`;let K=new Map;return T.forEach(Y=>{let H=re(Y,G);K.has(H.key)||K.set(H.key,{...H,workOrders:[]}),K.get(H.key).workOrders.push(Y)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...K.values()].sort((Y,H)=>Y.order-H.order||Y.label.localeCompare(H.label)).map(Y=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${C(Y.label)}</h3>
                <span>${Y.workOrders.length}</span>
              </div>
              <div class="work-list">${Y.workOrders.map(J).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function J(T){let B=p(T),G=g().find(ee=>ee.id===T.procedure_template_id),K=T.created_at?new Date(T.created_at):null,X=K&&!Number.isNaN(K.getTime())?K.toLocaleDateString():"",Y=T.status==="completed",H=Y?"Completed":e(T.status),ne=ee=>ee==="completed"?"Complete":e(ee);return`
        <article class="work-card status-card status-${T.status} ${T.id===f()?"selected":""}" data-id="${T.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${T.priority}">${T.priority}</span>
              <span class="chip">${C(n(T.type))}</span>
              <span class="chip ${T.status}">${H}</span>
              ${B?`<span class="chip ${B.className}">${B.label}</span>`:""}
              ${$(T.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${C(T.title)}</h3>
            <p>${C(E(T.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${O("asset")}${C(T.assets?.name||"General item / area")}</span>
            <span>${q(_(T)?"vendor":"mine")}${C(v(T))}</span>
            ${G?`<span>${O("procedure")}${C(G.name)}</span>`:""}
            <span>${q("due")}Due ${T.due_at||"unset"}</span>
            ${X?`<span>${q("created")}Created ${C(X)}</span>`:""}
            ${T.completed_at?`<span>${q("completed")}Completed ${new Date(T.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${I(T)}
          ${x(T)}
          <div class="quick-actions work-card-actions">
            ${!Y&&D(T)?`<button class="assign-action" data-assign-me="${T.id}" type="button">Assign to me</button>`:""}
            ${!Y&&W()?ae(T):""}
          ${w.filter(ee=>ee!==T.status&&!(ee==="completed"&&b(T))).slice(0,3).map(ee=>`
            <button data-quick-status="${ee}" data-id="${T.id}" type="button">${ne(ee)}</button>
          `).join("")}
        </div>
      </article>
    `}function ae(T){return`
        <form class="card-assign-form" data-card-assign="${T.id}">
          <select name="assigned_to" aria-label="Assign ${C(T.title)}">
            <option value="">Unassigned</option>
            <option value="${P}" ${_(T)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([B,G])=>`<option value="${B}" ${!_(T)&&B===T.assigned_to?"selected":""}>${C(G.full_name||t(B))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function z(T="",B={}){let G=T||"",K=B.managerOptions??W(),X=B.allowUnassigned!==!1,Y=B.selfLabel||"Assign to me",H=[];return X&&H.push(`<option value="" ${G===""?"selected":""}>Unassigned</option>`),H.push(`<option value="${y().user.id}" ${G===y().user.id?"selected":""}>${Y}</option>`),K&&(H.push(`<option value="${P}" ${G===P?"selected":""}>Outside vendor</option>`),H.push(...Object.entries(h()).filter(([ne])=>ne!==y().user.id).map(([ne,ee])=>`<option value="${ne}" ${G===ne?"selected":""}>${C(ee.full_name||t(ne))}</option>`))),H.join("")}function fe(T){return _(T)?P:T?.assigned_to||""}function le(T,B=""){let G=fe(T);return T?.status==="completed"?`
          <label ${B?`id="${B}"`:""}>Completed by / assigned to
            <input value="${C(v(T))}" disabled>
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
          <input value="${C(v(T))}" disabled>
          <input name="assigned_to" type="hidden" value="${C(G)}">
        </label>
      `}return{workOrdersPanelTitle:A,myWorkPanelTitle:R,workQueuePanelTitle:S,workQueuePanelSubtitle:N,renderWorkOrderFilterToolbar:Z,renderWorkOrderCollection:se,renderWorkOrderCard:J,renderCardAssignmentControl:ae,renderAssignmentSelect:z,renderWorkOrderAssignmentField:le}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:l},typeof dt<"u"&&(dt.exports={createWorkQueueDisplayHelpers:l})})()});var hn=U((Pr,We)=>{(function(){function l(e={}){function n(){return e.getCompanyMembers().filter(r=>e.normalizeRole(r.role)==="production").map(r=>({userId:r.user_id,name:e.teamMemberName(r.user_id)})).sort((r,p)=>r.name.localeCompare(p.name))}function t(r){return r.production_action_assigned_to?e.teamMemberName(r.production_action_assigned_to):"Production owner not set"}function o(r){let p=e.activeCompanyRole();return["admin","manager"].includes(p)||r.production_action_assigned_to===e.getSession()?.user?.id}function s(r=""){return n().map(g=>`
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
      `}function a(r){return!o(r)||r.status==="completed"?"":r.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(r.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(r.id)}" type="button">Reopen Production Action</button>`}function i(r){let p=r.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${p?"status-completed":"status-open"}">${p?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(r))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(r.production_action)}</p>
        ${p&&r.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(r.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function c(r,p){let g=e.hasProductionAction(r),f=`production-action-dialog-${r.id}`;return`
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
                  ${g?a(r):""}
                </div>
                ${m(r)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function u(r){let p=e.canEditOperationalRecords()&&r.status!=="completed",g=e.hasProductionAction(r);if(!g&&!p)return"";let f=r.production_action_status==="completed",h=`production-action-dialog-${r.id}`,y=g?t(r):"Not assigned",w=g?`${y} - ${r.production_action}`:y,k=g?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${f?"is-completed":g?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${g?`<span class="chip ${f?"status-completed":"status-open"}">${f?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(w)}">${e.escapeHtml(w)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(r.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(h)}" aria-label="${k}" title="${k}">
            <span aria-hidden="true">${g?"...":"+"}</span>
          </button>
          ${c(r,p)}
        </section>
      `}function d(r){let p=e.canEditOperationalRecords()&&r.status!=="completed";return!e.hasProductionAction(r)&&!p?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(r)?i(r):'<p class="muted">No Production Action is assigned.</p>'}
          ${p?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(r)?a(r):""}
            </div>
            ${m(r)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:u,renderProductionActionDetail:d}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:l},typeof We<"u"&&We.exports&&(We.exports={createProductionActionDisplayHelpers:l})})()});var yn=U((Ar,pt)=>{(function(){function l(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(c=>String(c||"")),o=e.formatMessageTime||(c=>String(c||"")),s=Math.max(Number(e.visibleLimit)||12,1);function m(){return n().filter(c=>!c.read_at).length}function a(c){return n().some(u=>!u.read_at&&u.kind==="production_action_completed"&&u.work_order_id===c)}function i(){if(!e.getReady?.())return"";let c=n();if(!c.length)return"";let u=m(),d=c.slice(0,s);return`
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
                  <time>${t(o(r.created_at))}</time>
                </span>
                <strong>${t(r.title)}</strong>
                <span>${t(r.body)}</span>
              </button>
            `).join("")}
          </div>
          ${c.length>s?`<p class="work-notification-limit">Showing the ${s} most recent notifications.</p>`:""}
        </details>
      `}return{hasUnreadProductionReady:a,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:m}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:l},typeof pt<"u"&&(pt.exports={createWorkOrderNotificationDisplayHelpers:l})})()});var wn=U((Er,xe)=>{(function(){function l({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:o,getPhotosByWorkOrder:s,teamMemberName:m}){function a(c){return`
        <article class="mini-work-order" data-mini-work-order="${c.id}">
          <strong>${e(c.title)}</strong>
          <span>${n(c.status)} - ${c.due_at||"no due date"}</span>
        </article>
      `}function i(c){let u=(o()[c.id]||[]).length,d=(s()[c.id]||[]).length,r=c.completed_at?new Date(c.completed_at).toLocaleDateString():"",p=c.completed_by?m(c.completed_by):"",g=!p&&c.assigned_to?m(c.assigned_to):"",f=p?` by ${e(p)}`:g?` - owner ${e(g)}`:"",h=c.resolution_summary||c.completion_notes||"";return`
        <article class="mini-work-order ${c.status==="completed"?"completed-history":""}" data-mini-work-order="${c.id}">
          <div class="chip-row">
            <span class="chip ${c.status}">${n(c.status)}</span>
            ${c.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${u?`<span class="relationship-chip parts">${t("parts")}<span>${u}</span></span>`:""}
            ${d?`<span class="relationship-chip photo">${t("photo")}<span>${d}</span></span>`:""}
          </div>
          <strong>${e(c.title)}</strong>
          <span>${r?`Completed ${r}${f}`:`Due ${c.due_at||"unset"}`}</span>
          ${c.failure_cause?`<p><b>Finding:</b> ${e(c.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:a,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:l},typeof xe<"u"&&xe.exports&&(xe.exports={createMiniWorkOrderDisplayHelpers:l})})()});var bn=U((Rr,mt)=>{(function(){function l({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:o,getParts:s,getPartDocumentsByPartId:m,getPartDocumentsReady:a,getPendingDeletePartId:i,getShowPartSourceManager:c,getPartCostsReady:u,getPartInventoryFilter:d,getPartSearchQuery:r,partUsageRows:p,canDeleteParts:g,canEditOperationalRecords:f=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:w}){let k=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],P=k.reduce((b,[$,A])=>(b[$]=A.replace(/s$/,""),b),{});function C(b){return b.document_type?b.document_type:String(b.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(b.file_name||"")?"invoice":/receipt/i.test(b.file_name||"")?"receipt":/schematic|diagram/i.test(b.file_name||"")?"schematic":/print|drawing/i.test(b.file_name||"")?"part_print":/manual/i.test(b.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(b.file_name||"")?"spec_sheet":"other"}function E(){return k.map(([b,$])=>`
        <option value="${b}">${e(P[b]||$)}</option>
      `).join("")}function O(b){let $=C(b),A=String(b.content_type||"").startsWith("image/"),R=P[$]||"File",S=b.created_at?new Date(b.created_at).toLocaleString():"Uploaded",N=b.file_size_bytes?`${Math.round(Number(b.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${A?"image-file":""}">
          ${A&&b.signedUrl?`<a class="part-document-thumb" href="${e(b.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(b.signedUrl)}" alt="${e(b.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(R)}</span>
              ${N?`<span class="chip">${e(N)}</span>`:""}
            </div>
            <strong>${e(b.file_name)}</strong>
            <span>${e(S)}</span>
            ${b.original_file_name&&b.original_file_name!==b.file_name?`<small>Original: ${e(b.original_file_name)}</small>`:""}
            ${b.signedUrl?`<a href="${e(b.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function q([b,$],A){let R=A.filter(S=>C(S)===b);return R.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e($)}</h4>
            <span>${R.length}</span>
          </div>
          <div class="part-document-grid">
            ${R.map(O).join("")}
          </div>
        </section>
      `:""}function _(b){let $=b.reduce((R,S)=>{let N=C(S);return R[N]=(R[N]||0)+1,R},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(R=>$[R]).map(R=>`<span class="chip">${$[R]} ${e(P[R]||"file")}${$[R]===1?"":"s"}</span>`).join("")}function v(b){let $=Number(b.quantity_on_hand)||0,A=Number(b.reorder_point)||0,R=Number(b.unit_cost)||0,S=$<=A,N=Math.max(0,A-$);return`
        <article class="part-card part-tile ${S?"low-stock":""}" data-open-part="${b.id}" tabindex="0" role="button" aria-label="Open ${e(b.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${b.sku?`<span class="chip">${e(b.sku)}</span>`:""}
              ${b.supplier_name?`<span class="chip part-source-chip">${e(b.supplier_name)}</span>`:""}
              ${b.machine_note?`<span class="chip">${e(b.machine_note)}</span>`:""}
              ${S?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(b.name)}</h3>
            <div class="part-card-meta">
              <span>${$} on hand</span>
              <span>reorder at ${A}</span>
              <span>${u()?`${n(R)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${S&&A>0?`<small>Need ${N} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function I(){let b=s().filter(o),$=b.filter(t).length,A=d();return[["All Parts",b.length,"all"],["Low Stock",$,"low"]].map(([R,S,N])=>`
        <button class="parts-health ${N==="low"&&S?"attention":""} ${A===N?"active":""}" data-part-inventory-filter="${N}" type="button">
          <span>${R}</span>
          <strong>${S}</strong>
        </button>
      `).join("")}function D(b="default"){return`
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
              <option value="default" ${b==="default"?"selected":""}>Default</option>
              <option value="source" ${b==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function W(b){let $=Number(b.quantity_on_hand)||0,A=Number(b.reorder_point)||0,R=Number(b.unit_cost)||0,S=m()[b.id]||[],N=_(S),L=f();return`
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
                <span class="chip ${$<=A?"overdue":"open"}">${$<=A?"low stock":"stocked"}</span>
              </div>
              <h3>${e(b.name)}</h3>
              <p>${$} on hand - reorder at ${A}</p>
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
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${$}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${A}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${R}"></label>
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
              <span>${S.length} file${S.length===1?"":"s"}</span>
            </div>
            ${L?`<form class="part-document-form" data-part-document="${b.id}">
              <label>File type<select name="document_type">${E()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${b.id}">${a()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${a()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${S.length?k.map(j=>q(j,S)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${L?x(b):""}
        </section>
      `}function x(b){let $=p(b.id).length,A=m()[b.id]||[],R=i()===b.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${$?`This part has ${$} usage record${$===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${A.length?` and ${A.length} filed receipt/invoice record${A.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${$?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:R?`
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:v,renderPartsHealth:I,renderPartSearch:D,renderPartDetail:W,renderPartDangerZone:x}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:l},typeof mt<"u"&&(mt.exports={createPartsDisplayHelpers:l})})()});var vn=U((Or,ft)=>{(function(){function l({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:o,getAppIssueReportsReady:s,getAppIssueReports:m}){function a(){let u=s();return`
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
            <input name="screen" type="hidden" value="${t(o())}">
            <p class="muted">This sends the current company, location, screen, and signed-in user with the report.</p>
            <p class="error-text" id="app-issue-report-error">${u?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${u?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function i(u){let d={open:0,reviewing:1,resolved:2};return[...u].sort((r,p)=>{let g=(d[r.status||"open"]??1)-(d[p.status||"open"]??1);return g||new Date(p.created_at||0)-new Date(r.created_at||0)})}function c(){if(!e())return"";let u=s(),d=m(),r=i(d);return`
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
      `}return{renderAppIssueReportForm:a,renderAppIssueReportsPanel:c,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:l},typeof ft<"u"&&(ft.exports={createAppIssuePanelDisplayHelpers:l})})()});var kn=U((Wr,gt)=>{(function(){function l(e){let n=e.escapeHtml,t=e.getDueState,o=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,m=e.canEditOperationalRecords||(()=>!0);function a(){return e.getPreventiveSchedules().filter(d=>e.matchesActiveLocation(d)&&e.matchesSearch([d.title,d.frequency,d.next_due_at,d.assets?.name]))}function i(){return e.getProcedureTemplates().filter(d=>e.matchesSearch([d.name,d.description,...(d.procedure_steps||[]).map(r=>r.prompt)]))}function c(d){let r=t({due_at:d.next_due_at,status:"open"}),p=e.getPendingDeleteScheduleId()===d.id,g=m();return`
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
      `}function u(d){let r=e.getWorkOrders().filter(y=>y.procedure_template_id===d.id).length,p=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===d.id).length,g=o({workOrders:r,schedules:p}),f=e.getPendingDeleteProcedureId()===d.id,h=m();return`
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
      `}return{filteredPreventiveSchedules:a,filteredProcedureTemplates:i,renderPreventiveSchedule:c,renderProcedureTemplate:u}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:l},typeof gt<"u"&&(gt.exports={createMaintenanceListDisplayHelpers:l})})()});var _n=U((xr,ht)=>{(function(){function l(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:o,checklistProgress:s,requiredChecklistProgress:m,escapeHtml:a,cleanWorkOrderDescription:i,renderRelationshipChips:c,renderWorkOrderCommandSummary:u,renderWorkOrderRecommendation:d,statusLabel:r,normalizeWorkOrderType:p=A=>String(A||"corrective"),workOrderTypeLabel:g=A=>String(A||"corrective").replace(/\b\w/g,R=>R.toUpperCase()),hasCompletedSafetyDeviceCheck:f,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:w,renderWorkOrderAssignmentField:k,requiresSafetyDeviceCheck:P,renderWorkOrderMessages:C,renderProcedureOptions:E,money:O,photoMetaText:q,renderActivityItem:_,canDeleteWorkOrders:v,canEditOperationalRecords:I=()=>!0,renderProductionActionDetail:D=()=>"",hasOpenProductionAction:W=()=>!1}=e;function x(A,R){let S=e.getStepResultsByWorkOrder()[A.id]?.[R.id],N=S?.value||"",L=`data-step-result="${R.id}" data-work-order-id="${A.id}"`,j=`<input ${L} value="${a(N)}" placeholder="Result">`;return R.response_type==="checkbox"&&(j=`<label class="check-row"><input ${L} type="checkbox" ${N==="checked"?"checked":""}> Done</label>`),R.response_type==="pass_fail"&&(j=`
          <select ${L}>
            <option value="">Not checked</option>
            <option value="pass" ${N==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${N==="fail"?"selected":""}>Fail</option>
          </select>
        `),R.response_type==="number"&&(j=`<input ${L} type="number" value="${a(N)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${R.position}. ${a(R.prompt)} ${R.required?'<small class="required-mark">Required</small>':""}</span>
          ${j}
          <small data-checklist-recorded>${S?.completed_at?`Recorded ${new Date(S.completed_at).toLocaleString()}`:""}</small>
        </div>
      `}function b(A){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===A.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${a(A.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${A.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${A.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function $(){let A=e.getActiveWorkOrderId(),S=e.getWorkOrders().find(F=>F.id===A);if(!S)return n();let N=e.getCommentsByWorkOrder(),L=e.getPhotosByWorkOrder(),j=e.getEventsByWorkOrder(),V=e.getPartsUsedByWorkOrder(),Z=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),se=e.getWorkOrderActionWarning(),J=e.getParts(),ae=e.getProfilesByUserId(),z=e.getCommentsError(),fe=e.STATUS_OPTIONS||[],le=e.TYPE_OPTIONS||[],T=N[S.id]||[],B=L[S.id]||[],G=j[S.id]||[],K=V[S.id]||[],X=K.reduce((F,pe)=>F+(Number(pe.quantity_used)||0)*t(pe),0),Y=K.reduce((F,pe)=>F+(Number(pe.quantity_used)||0),0),H=o(T,B,G,K),ne=Z.find(F=>F.id===S.procedure_template_id),ee=ne?s(S,ne):null,de=ne?m(S,ne):null,oe=I();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${S.priority}">${S.priority}</span>
            <span class="chip">${a(g(S.type))}</span>
            <span class="chip ${S.status}">${r(S.status)}</span>
          </div>
          <h2>${a(S.title)}</h2>
          <p>${a(i(S.description)||"No description.")}</p>
          ${c(S)}
          ${S.completed_at?`<p class="completion-note">Completed ${new Date(S.completed_at).toLocaleString()} \xC2\xB7 ${S.actual_minutes||0} min</p>`:""}
          ${S.asset_id&&f(S)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${S.completion_notes?`<p>${a(S.completion_notes)}</p>`:""}
        </div>

        ${u(S)}
        ${d(S)}
        ${D(S)}

        ${S.completed_at&&(S.failure_cause||S.resolution_summary||S.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${S.failure_cause?`<article><span>Cause</span><strong>${a(S.failure_cause)}</strong></article>`:""}
            ${S.resolution_summary?`<article><span>Resolution</span><strong>${a(S.resolution_summary)}</strong></article>`:""}
            ${S.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${oe?`<label>Status
          <select id="status-select">
            ${fe.map(F=>`<option value="${F}" ${F===S.status?"selected":""} ${F==="completed"&&W(S)?"disabled":""}>${r(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${oe?`<div class="quick-actions detail-quick-actions">
          ${h(S)?`<button class="assign-action" data-assign-me="${S.id}" type="button">${S.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${fe.filter(F=>F!==S.status&&!(F==="completed"&&W(S))).map(F=>`
            <button data-quick-status="${F}" data-id="${S.id}" type="button">${r(F)}</button>
          `).join("")}
        </div>`:""}
        ${re===S.id&&se?`<p class="error-text action-warning">${a(se)}</p>`:""}

        ${oe?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${a(S.title)}"></label>
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
            <p class="error-text" data-asset-location-warning>${a(w(S.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${a(S.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${a(S.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${fe.map(F=>`<option value="${F}" ${F===S.status?"selected":""} ${F==="completed"&&W(S)?"disabled":""}>${r(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===S.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${k(S,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${E(S.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${S.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${P(S)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${S.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
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

        ${C(S)}

        ${oe?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${a(S.title)}"></label>
          <label>Description<textarea name="description" rows="3">${a(i(S.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${a(S.due_at||"")}">
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
              ${le.map(F=>`<option value="${F}" ${F===p(S.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${k(S)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${E(S.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${a(S.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${a(S.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${S.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${P(S)?`
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

        ${ne?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${a(ne.name)}</h3>
              <span data-checklist-summary>${ee.done} of ${ee.total} complete - required ${de.done}/${de.total}</span>
            </div>
            <div class="checklist-list">
              ${ne.procedure_steps.map(F=>oe?x(S,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${a(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${a(e.getStepResultsByWorkOrder()[S.id]?.[F.id]?.value||"Not recorded")}</small>
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
            ${W(S)?'<p class="warning-text">Complete or remove the open Production Action first.</p>':""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${S.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${P(S)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${f(S)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit" ${W(S)?"disabled":""}>Complete Work Order</button>
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
              ${J.map(F=>`<option value="${F.id}">${a(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${K.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${O(X)}</span></article>`:""}
          ${K.map(F=>`
            <article class="relationship-detail parts">
              <strong>${a(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${O((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${a(ae[F.created_by]?.full_name||"Team member")}</small>
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
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${a(F.signedUrl)}" alt="${a(F.file_name)}">`:""}
                <strong>${a(F.file_name)}</strong>
                <span>${q(F)}</span>
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
          ${T.map(F=>`
            <article class="relationship-detail comment">
              <strong>${a(ae[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${a(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${z?`<p class="error-text">${a(z)}</p>`:""}
          ${H.map(_).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${oe&&v()?b(S):""}
      </div>
    `}return{renderWorkOrderDetail:$}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:l},typeof ht<"u"&&(ht.exports={createWorkOrderDetailDisplayHelpers:l})})()});var qn=U((Mr,yt)=>{(function(){function l(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:l},typeof yt<"u"&&(yt.exports={createEquipmentStructureGuideDisplayHelpers:l})})()});var Sn=U((Dr,wt)=>{(function(){function l(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:o,escapeHtml:s,assetTypeLabel:m,renderParentAssetOptions:a,renderLocationOptions:i,renderAssetAreaOptions:c,assetStatusLabel:u,renderAssetMiniWorkOrder:d,assetDeleteBlockerMessage:r,canDeleteEquipment:p,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:f,renderProcedureOptions:h}=e;function y(){let q=new Date;return new Date(q.getTime()-q.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function w(q,_,v){let I=_.some(b=>b.event_type==="created"),D=q.created_at&&!I?[{id:`${q.id}-created`,event_type:"created",summary:`${m(q.asset_type)} created.`,actor_id:q.created_by||"",created_at:q.created_at}]:[];return{equipmentHistory:[..._,...D].sort((b,$)=>new Date($.created_at||0)-new Date(b.created_at||0)),historyActorLabel:b=>b.actor_id&&v[b.actor_id]?.full_name?v[b.actor_id].full_name:b.actor_id?`User ${String(b.actor_id).slice(0,8)}`:b.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function k(q,_){return q.map(v=>`
        <article>
          <strong>${s(String(v.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${v.created_at?new Date(v.created_at).toLocaleString():"time unavailable"} &middot; ${s(_(v))}</span>
          <p>${s(v.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function P(){let q=e.getAssets(),_=e.getActiveAssetId(),v=q.find(j=>j.id===_);if(!v)return n();let I=e.getAssetEventsReady?.()!==!1,D=e.getProfilesByUserId?.()||{},W=(e.getAssetEventsByAssetId?.()[v.id]||[]).sort((j,V)=>new Date(V.created_at||0)-new Date(j.created_at||0)),{equipmentHistory:x,historyActorLabel:b}=w(v,W,D),$=e.LIST_ITEMS_PER_PAGE||12,A=Math.max(1,Math.ceil(x.length/$)),R=Math.min(Math.max(1,e.getAssetRelationshipPage?.(v.id,"asset-history")||1),A),S=x.length?(R-1)*$+1:0,N=Math.min(x.length,R*$),L=x.slice((R-1)*$,R*$);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(v.name)} - ${x.length} event${x.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(v.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${I?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${k(L,b)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${x.length>$?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(v.id)}" type="button" ${R<=1?"disabled":""}>Previous</button>
                <span>Showing ${S}-${N} of ${x.length} - Page ${R} of ${A}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(v.id)}" type="button" ${R>=A?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function C(){let q=e.getAssets(),_=e.getActiveAssetId(),v=q.find(M=>M.id===_);if(!v)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(v.id);let I=e.getWorkOrders(),D=e.getPreventiveSchedules(),W=e.getParts(),x=e.getAssetParts(),b=e.getAssetPartsReady(),$=e.getAssetDocumentsByAssetId?.()[v.id]||[],A=e.getAssetDocumentsReady?.()!==!1,R=e.getAssetEventsReady?.()!==!1,S=e.getProfilesByUserId?.()||{},N=e.getPartsUsedByWorkOrder(),L=e.getLocations(),j=e.getActiveLocationId(),V=e.ASSET_TYPE_OPTIONS||[],Z=t(v),re=o(v.id),se=I.filter(M=>M.asset_id===v.id),J=se.filter(M=>M.status!=="completed").sort((M,ie)=>new Date(ie.created_at||0)-new Date(M.created_at||0)),ae=se.filter(M=>M.status==="completed").sort((M,ie)=>new Date(ie.completed_at||ie.created_at||0)-new Date(M.completed_at||M.created_at||0)),z=D.filter(M=>M.asset_id===v.id),fe=Object.values(N).flat().filter(M=>se.some(ie=>ie.id===M.work_order_id)),le=x.filter(M=>M.asset_id===v.id),T=new Set(le.map(M=>M.part_id)),B=W.filter(M=>!T.has(M.id)),G=(e.getAssetEventsByAssetId?.()[v.id]||[]).sort((M,ie)=>new Date(ie.created_at||0)-new Date(M.created_at||0)),{equipmentHistory:K}=w(v,G,S),X=e.LIST_ITEMS_PER_PAGE||12,Y=M=>e.getAssetRelationshipOpen?.(v.id,M)||!1,H=(M,ie)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(v.id,M)||1),Math.max(1,Math.ceil(ie/X))),ne=(M,ie)=>{let te=H(ie,M.length);return M.slice((te-1)*X,te*X)},ee=(M,ie)=>{if(ie<=X)return"";let te=H(M,ie),ge=Math.max(1,Math.ceil(ie/X)),ye=(te-1)*X+1,ce=Math.min(ie,te*X);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(v.id)}" data-asset-relation-section="${s(M)}" type="button" ${te<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${ce} of ${ie} - Page ${te} of ${ge}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(v.id)}" data-asset-relation-section="${s(M)}" type="button" ${te>=ge?"disabled":""}>Next</button>
          </div>
        `},de=M=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(M)}" data-asset-id="${s(v.id)}" ${Y(M)?"open":""}`,oe=L.find(M=>M.id===v.location_id)?.name||v.location||"No location set",F=Z?Z.name:"Top level equipment",pe=v.status==="offline"?"status-blocked":v.status==="degraded"?"status-open":v.status==="watch"?"status-in_progress":"status-completed",he=v.status==="degraded"&&J.length===0,ue=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${v.status}">${s(u(v.status))}</span>
              <span class="chip">${s(m(v.asset_type))}</span>
              ${v.asset_code?`<span class="chip">${s(v.asset_code)}</span>`:""}
              ${v.manufacturer?`<span class="chip">${s(v.manufacturer)}</span>`:""}
              ${v.model?`<span class="chip">${s(v.model)}</span>`:""}
              ${v.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(v.name)}</h2>
            <p>${s(v.location||"No location set")}</p>
            ${Z?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(Z.id)}" type="button">${s(Z.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${pe}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(u(v.status))}</strong>
              <small>${v.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(oe)}</strong>
              <small>${v.location?s(v.location):"Area / spot unset"}</small>
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

          ${he&&ue?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${s(v.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${f?f():""}

          ${ue?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${v.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${$.length} file${$.length===1?"":"s"}</span>
            </div>
            ${ue?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(v.id)}">
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
              <p class="error-text" data-asset-document-error="${s(v.id)}">${A?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${A?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${$.map(M=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(M.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${s(M.signedUrl)}" alt="${s(M.original_file_name||M.file_name||v.name)}">`:`<strong>${s(O(M.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(O(M.document_type))}</strong>
                      <span>${s(M.original_file_name||M.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${s(M.signedUrl)}" alt="${s(M.original_file_name||M.file_name||v.name)}">`:`<div class="asset-file-document-preview">${s(O(M.document_type))}</div>`}
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
            <label>Equipment name<input name="name" required value="${s(v.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(v.asset_code||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(v.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(v.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${V.map(M=>`<option value="${M}" ${M===(v.asset_type||"machine")?"selected":""}>${m(M)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${a(v.parent_asset_id||"",v.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${L.length?"":"disabled"}>
                ${i(v.location_id||j)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${c(v.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(M=>`<option value="${M}" ${M===v.status?"selected":""}>${u(M)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${v.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${re.map(M=>`
                <article class="mini-work-order" data-open-asset="${s(M.id)}">
                  <strong>${s(M.name)}</strong>
                  <span>${s(m(M.asset_type))} - ${s(u(M.status))}</span>
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
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(v.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${R?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${z.length} schedule${z.length===1?"":"s"}</span>
                ${ue?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${ue?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(v.id)}">
              <input name="title" required placeholder="PM for ${s(v.name)}">
              <input name="asset_id" type="hidden" value="${s(v.id)}">
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

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(v.id)}" ${Y("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${le.length}</span></summary>
            <div class="panel-header compact">
              ${ue?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${Y("linked-parts")&&b?`
              ${ue?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(v.id)}">
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
              <p class="error-text" data-asset-part-error="${s(v.id)}"></p>
              <div class="mini-list">
                ${ne(le,"linked-parts").map(M=>`<article>
                  <strong>${s(M.parts?.name||"Part")}</strong>
                  <span>${s(M.parts?.sku||"No SKU")} - recommended qty ${s(M.quantity_recommended||1)}${M.note?` - ${s(M.note)}`:""}</span>
                  ${ue?`<button class="text-button danger-link" data-remove-asset-part="${s(M.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${ee("linked-parts",le.length)}
            `:b?'<p class="muted">Open this section to review or attach linked parts for this equipment.</p>':'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(v.id)}" ${Y("parts-used")?"open":""}>
            <summary>Parts Used History <span>${fe.length}</span></summary>
            <div class="mini-list">
              ${Y("parts-used")?ne(fe,"parts-used").map(M=>`<article><strong>${s(M.parts?.name||"Part")}</strong><span>${M.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${Y("parts-used")?ee("parts-used",fe.length):""}
          </details>

          ${ue?E(v):""}
        </div>
      `}function E(q){let _=e.getWorkOrders(),v=e.getPreventiveSchedules(),I=e.getAssets(),D=e.getActiveAssetId(),W=_.filter(S=>S.asset_id===q.id).length,x=v.filter(S=>S.asset_id===q.id).length,b=I.filter(S=>S.parent_asset_id===q.id).length,$=e.getMaintenanceRequests().filter(S=>S.asset_id===q.id).length,A=r({workOrders:W,children:b,schedules:x,requests:$}),R=e.getPendingDeleteAssetId()===D;return p()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${A||`This permanently removes "${s(q.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${A?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:R?`
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
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function O(q){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[q]||"File"}return{renderAssetDetail:C,renderAssetHistoryScreen:P}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:l},typeof wt<"u"&&(wt.exports={createAssetDetailDisplayHelpers:l})})()});var Cn=U((Tr,bt)=>{(function(){function l(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:o,statusLabel:s,workOrderTypeLabel:m=r=>String(r||"corrective").replace(/\b\w/g,p=>p.toUpperCase()),renderAssignmentSelect:a,renderProcedureOptions:i,escapeHtml:c}=e;function u(){let r=new Date;return new Date(r.getTime()-r.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function d(){let r=e.getParts();return`
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
                  ${o()}
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
                  ${r.map(p=>`<option value="${p.id}">${c(p.name)} (${p.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:d}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:l},typeof bt<"u"&&(bt.exports={createCreateWorkOrderDisplayHelpers:l})})()});var $n=U((Ir,vt)=>{(function(){function l(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:o,escapeHtml:s,renderAssignmentSelect:m,renderProcedureOptions:a,assetStatusLabel:i,workOrderTypeLabel:c=r=>String(r||"corrective").replace(/\b\w/g,p=>p.toUpperCase())}=e;function u(){let r=new Date;return new Date(r.getTime()-r.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function d(){let r=e.getQuickFixAssetId(),p=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),f=e.getSession(),h=e.getParts(),y=r||"",w=g.find(k=>k.id===p);return`
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
          <p class="error-text" data-asset-location-warning>${s(o(y||w?.asset_id||""))}</p>
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
                  ${n.map(k=>`<option value="${k}" ${k==="corrective"?"selected":""}>${c(k)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${m(f.user.id,{selfLabel:"Assign to me"})}
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
      `}return{renderQuickFixForm:d}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:l},typeof vt<"u"&&(vt.exports={createQuickFixDisplayHelpers:l})})()});var Pn=U((Fr,kt)=>{(function(){function l(e={}){let n=e.escapeHtml;function t(d){return`
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
      `}function o(d){return`
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
      `}function a(d){return`
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
      `}function c(d={}){let r=!!d.ready,p=d.initialError||"";return`
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
      `}return{workspaceLoading:t,workspaceLoadError:o,authForm:s,authCallback:m,authCallbackError:a,passwordResetRequest:i,passwordRecovery:c,companyCreate:u}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:l},typeof kt<"u"&&(kt.exports={createAuthDisplayHelpers:l})})()});var An=U((Lr,_t)=>{(function(){function l(e={}){let n=e.escapeHtml,t=e.qrSvgFor,o=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),m=e.getPublicRequestLinksReady||(()=>!0),a=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),c=e.canManageTeam||(()=>!1),u=e.canAdministerPublicRequestLinks||(()=>!1),d=e.publicAppBaseUrl,r=e.publicRequestUrl,p=e.publicRequestQrUrl;function g(){return`
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
      `}function f(E,O){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(E.location_name)}</h1>
                <p>${n(E.company_name)}</p>
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
      `}function w(E){return`
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
      `}function k(E,O=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(E.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${O?`<p class="error-text">${n(O)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function P(){if(!c())return"";let E=d(),O=o(),q=m();return`
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
          ${E?`<p class="muted">QR codes will point to ${n(E)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${q?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${O.map(C).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function C(E){let O=s().find(W=>W.location_id===E.id),q=!!(O&&O.is_active!==!1),_=u(),v=q?r(O.token):"",I=q?p(O.token):"",D=!!(v&&I);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(E.name)}</strong>
            <span>${q?"External request link active":O?"Request link disabled":"No request link yet"}</span>
            ${O?.last_used_at?`<span>Last used ${new Date(O.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${q?`
            <div class="qr-preview">${D?t(v):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(I||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${D?"":"disabled-link"}" href="${n(I||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(I)}" type="button" ${D?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${D?"":"disabled-link"}" href="${n(v||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${_?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(O.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(O.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:O?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${_?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(O.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(O.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(E.id)}" type="button" ${m()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:f,loadingRequestForm:h,publicRequestForm:y,publicRequestError:w,publicRequestSuccess:k,publicRequestLinkManager:P,publicRequestLocationCard:C}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:l},typeof _t<"u"&&(_t.exports={createPublicRequestDisplayHelpers:l})})()});(function(l){function e(c){return String(c||"").replace(/\/+$/,"")}function n(c=l.location,u=l.PUBLIC_APP_URL){if(u)return`${e(u)}/`;let d=c?.origin||"",r=c?.pathname||"/",g=r.indexOf("/auth/callback");if(g>=0)return`${d}${r.slice(0,g+1)}`;let f=r.endsWith("/")?r:r.replace(/[^/]*$/,"");return`${d}${f||"/"}`}function t(c=l.location,u=l.PUBLIC_APP_URL){return`${n(c,u)}auth/callback/`}function o(c={},u=l.location,d=l.PUBLIC_APP_URL){let r=new URL(n(u,d));return Object.entries(c).forEach(([p,g])=>{g!=null&&g!==""&&r.searchParams.set(p,g)}),r.href}function s(c){let u=new URL(c),d=new URLSearchParams(u.hash.replace(/^#/,"")),r=u.searchParams;return{code:r.get("code")||"",type:d.get("type")||r.get("type")||"",accessToken:d.get("access_token")||r.get("access_token")||"",refreshToken:d.get("refresh_token")||r.get("refresh_token")||"",error:d.get("error")||r.get("error")||"",errorCode:d.get("error_code")||r.get("error_code")||"",errorDescription:d.get("error_description")||r.get("error_description")||""}}function m(c){return!!(c?.code||c?.accessToken&&c?.refreshToken||c?.error||c?.errorDescription)}function a(c){return c?.type==="recovery"||!c?.type&&!!(c?.accessToken&&c?.refreshToken)}function i(c=l.location){let u=new URL(c.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(d=>u.searchParams.delete(d)),u.hash="",u.href}l.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:o,authParamsFromHref:s,isAuthCallbackParams:m,isPasswordRecoveryParams:a,cleanAuthUrl:i}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:l})})();(function(){function l(q){return String(q||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(q){return q.toISOString().slice(0,10)}function n(q){return q.toISOString()}function t(q){let _=new Date;return _.setDate(_.getDate()-q),_}function o(){let q=new Date;return new Date(q.getFullYear(),q.getMonth(),1)}function s(q=new Date){let _=new Date(q);_.setHours(0,0,0,0),_.setDate(_.getDate()-_.getDay());let v=new Date(_);return v.setDate(v.getDate()+7),{start:_,end:v}}function m(q,_){let v=[];for(let I=0;I<q.length;I+=_)v.push(q.slice(I,I+_));return v}function a(q){return i(q).replace(/\.[^/.]+$/,"")||"photo"}function i(q){return String(q||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function c(q){return q==="active"||q==="all"?"Active":q==="overdue"?"Overdue":q==="completed"?"All Completed":q==="completed_month"?"Completed Month":q==="completed_week"?"Done This Week":q==="open"?"New":String(q||"").replaceAll("_"," ").replace(/\b\w/g,_=>_.toUpperCase())}function u(q){let _=String(q||"corrective").trim().toLowerCase();return _==="inspection"?"preventive":_==="reactive"||_==="request"?"corrective":["corrective","preventive","fabrication"].includes(_)?_:"corrective"}function d(q){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[u(q)]}function r(q){let _=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],v=String(q||"technician").trim().toLowerCase();return v==="member"?"technician":_.includes(v)?v:"technician"}function p(q){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[r(q)]||"Technician"}function g(q){let _={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return _[r(q)]||_.technician}function f(q){return new Date(`${q}T00:00:00`).toLocaleDateString()}function h(q){let _=[new Date(q.created_at).toLocaleString()];return q.file_size_bytes&&_.push(w(q.file_size_bytes)),q.original_size_bytes&&q.file_size_bytes&&q.original_size_bytes!==q.file_size_bytes&&_.push(`optimized from ${w(q.original_size_bytes)}`),_.join(" - ")}function y(q){let _=[];return(q.photo_uploaded_at||q.updated_at||q.created_at)&&_.push(new Date(q.photo_uploaded_at||q.updated_at||q.created_at).toLocaleString()),q.photo_file_size_bytes&&_.push(w(q.photo_file_size_bytes)),q.photo_original_size_bytes&&q.photo_file_size_bytes&&q.photo_original_size_bytes!==q.photo_file_size_bytes&&_.push(`optimized from ${w(q.photo_original_size_bytes)}`),_.join(" - ")||"Photo attached"}function w(q){let _=Number(q)||0;return _?_<1024?`${_} B`:_<1048576?`${Math.round(_/1024)} KB`:`${(_/1048576).toFixed(_>=10485760?0:1)} MB`:""}function k(q){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(q)||0)}function P(q){return Number(q.unit_cost_at_use??q.parts?.unit_cost??0)||0}function C(q){if(!q.due_at||q.status==="completed")return null;let _=new Date;_.setHours(0,0,0,0);let v=new Date(`${q.due_at}T00:00:00`),I=Math.round((v-_)/864e5);return I<0?{label:"overdue",className:"overdue"}:I===0?{label:"due today",className:"due_today"}:null}function E(){let q=new Date;return q.setHours(0,0,0,0),q}function O(q){return`"${String(q??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:l,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:o,sundayWeekRange:s,chunkArray:m,fileBaseName:a,safeFileName:i,statusLabel:c,normalizeWorkOrderType:u,workOrderTypeLabel:d,normalizeRole:r,roleLabel:p,roleDescription:g,formatDate:f,photoMetaText:h,requestPhotoMetaText:y,formatBytes:w,money:k,partUsageUnitCost:P,getDueState:C,startOfToday:E,csvCell:O})})();(function(){function l(s,m){let a=s?.message||"";return m.some(i=>a.includes(i))}function e(s,m){let a=s?.message||"";return a.includes(m)&&(a.includes("column")||a.includes("schema cache"))}function n(s){let m=s?.message||"";return m.includes("work_order_comments_company_author_profile_fkey")||m.includes("profiles")}function t(s){let m=s?.message||"";return!!(m.includes("procedure_template_id")||m.includes("procedure_templates")||m.includes("procedure_steps"))}function o(s){return l(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:l,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:o}})();(function(){function l(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:l}})();(function(){function l(e,n,t=2e4){let o,s=new Promise((m,a)=>{o=setTimeout(()=>a(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(o))}window.MaintainOpsOperationTimeout={withOperationTimeout:l}})();var Vr=Q(St()),Hr=Q(Ct());(function(){function l(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function o(d){return m(`?request=${encodeURIComponent(d)}`)}function s(d){return m(`?qr=${encodeURIComponent(d)}`)}function m(d){let r=a();if(!r)return"";let p=new URL(r);return p.search=d,p.hash="",p.toString()}function a(){let r=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return r?i(r):""}function i(d){try{let r=new URL(String(d||"").trim(),n.location.href);return r.protocol!=="https:"||!c(r.hostname)?"":(r.search="",r.hash="",r.pathname&&r.pathname!=="/"&&!r.pathname.endsWith("/")&&!r.pathname.endsWith(".html")&&(r.pathname=`${r.pathname}/`),r.toString())}catch{return""}}function c(d){let r=String(d||"").toLowerCase();return!(!r||r==="localhost"||r.endsWith(".localhost")||r==="127.0.0.1"||r==="::1"||r==="[::1]"||/^10\./.test(r)||/^192\.168\./.test(r)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(r))}function u(d,r=4){if(!n.qrcode||!d)return'<div class="qr-fallback">QR</div>';try{let p=n.qrcode(0,"M");return p.addData(d),p.make(),p.createSvgTag(r,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:o,publicRequestQrUrl:s,publicAppUrlWithSearch:m,publicAppBaseUrl:a,normalizePublicAppUrl:i,isPublicAppHost:c,qrSvgFor:u}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),o=n.querySelector("#print-public-qr");!o||typeof t!="function"||o.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:l}})();(function(){function l(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:l}})();var Zr=Q($t()),Xr=Q(Pt());(function(){function l(e){function n(c){return e[c]()}function t(c,u){return typeof e[c]=="function"?e[c]():u}function o(c){let u=n("searchQuery"),d=n("activeSection"),r=n("activeStatusFilter"),p=!!u.trim();return i(s(c,{statusFilter:p?"__any__":d==="work"&&r==="requests"?"__none__":r,section:d,includeQueue:!p,includeSearch:!0}))}function s(c,u={}){let d=u.section||n("activeSection"),r=c.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(r=r.eq("location_id",n("activeLocationId"))),u.includeQueue!==!1&&(r=m(r,d)),u.includeAttributeFilters!==!1&&d==="work"){let p=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");p!=="all"&&(r=r.eq("type",p)),g!=="all"&&(r=r.eq("priority",g))}if(r=a(r,u.statusFilter||n("activeStatusFilter")),u.includeSearch!==!1){let p=e.postgrestSearchTerm(n("searchQuery"));if(p){let g=n("workOrderRelatedSearch"),f=[`title.ilike.%${p}%`,`description.ilike.%${p}%`,`production_action.ilike.%${p}%`,`priority.ilike.%${p}%`,`type.ilike.%${p}%`,`status.ilike.%${p}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];r=r.or(f.join(","))}}return r}function m(c,u){if(u==="mywork"){let d=n("session").user.id;return n("myWorkFilter")==="created"?c.eq("created_by",d):c.or(`assigned_to.eq.${d},and(production_action_assigned_to.eq.${d},production_action_status.eq.open)`)}if(u!=="work")return c;if(n("workOrderAssigneeFilter")){let d=n("workOrderAssigneeFilter");return c.or(`assigned_to.eq.${d},and(production_action_assigned_to.eq.${d},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?c.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?c.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?c.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):c}function a(c,u){let d=e.isoDate(e.startOfToday());if(u==="__any__")return c;if(u==="__none__")return c.eq("id","00000000-0000-0000-0000-000000000000");if(u==="overdue")return c.neq("status","completed").lt("due_at",d);if(u==="completed_month")return c.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(u==="completed_week"){let r=e.sundayWeekRange();return c.gte("completed_at",e.isoDateTime(r.start)).lt("completed_at",e.isoDateTime(r.end))}return u==="active"||u==="all"?c.neq("status","completed"):c.eq("status",u)}function i(c){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?c.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?c.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?c.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?c.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?c.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):c.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:o,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:m,applyWorkOrderStatusFilter:a,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(o=>{o.addEventListener("click",()=>{let s=n.querySelector(`#${o.dataset.jumpWorkSection}`);if(!s)return;let m=s.closest("details");m&&(m.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let a=s;a.classList.add("jump-highlight","field-jump-highlight"),t(()=>a.classList.remove("jump-highlight"),1400),t(()=>a.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,o=e.state,s=e.renderWorkspace,m=e.setWorkOrderSearchMode;if(!o||!s||!m)return;let a=()=>{o.setSearchQuery(""),m(!1),t.setItem("maintainops.searchQuery","")},i=c=>{o.setActiveSection(c),t.setItem("maintainops.activeSection",c)};n.querySelectorAll("[data-search-work-order]").forEach(c=>{c.addEventListener("click",()=>{o.setActiveWorkOrderId(c.dataset.searchWorkOrder),o.setActiveAssetId(null),o.setActivePartId(null),i("work"),a(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(c=>{c.addEventListener("click",()=>{o.setActiveAssetId(c.dataset.searchAsset),o.setActiveWorkOrderId(null),o.setActivePartId(null),i("assets"),a(),s()})}),n.querySelectorAll("[data-search-part]").forEach(c=>{c.addEventListener("click",()=>{o.setActivePartId(c.dataset.searchPart),o.setActiveAssetId(null),o.setActiveWorkOrderId(null),i("parts"),a(),s()})}),n.querySelectorAll("[data-search-request]").forEach(c=>{c.addEventListener("click",()=>{i("requests"),a(),s()})}),n.querySelectorAll("[data-search-section]").forEach(c=>{c.addEventListener("click",()=>{i(c.dataset.searchSection),a(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:l}})();(function(){let l=null,e=0,n=Promise.resolve();function t(o={}){let s=o.documentRef||document,m=o.storage||localStorage,a=o.state,i=o.windowRef||(typeof window<"u"?window:null),c=o.setTimeoutRef||setTimeout,u=o.clearTimeoutRef||clearTimeout,d=Number.isFinite(o.searchDelayMs)?o.searchDelayMs:300;if(!a)return;let r=()=>{e+=1,l!==null&&(u(l),l=null)},p=f=>{f&&typeof i?.scrollTo=="function"&&i.scrollTo(f.x,f.y)},g=(f,h,y,w)=>{let k=s.getElementById?s.getElementById(f):s.querySelector(`#${f}`);if(!k)return;let P=k.value.length,C=Math.min(h??P,P),E=Math.min(y??C,P);k.focus({preventScroll:!0}),k.setSelectionRange(C,E),p(w)};s.querySelectorAll(".workspace-search-input").forEach(f=>{f.addEventListener("input",()=>{let h=f.id,y=f.selectionStart,w=f.selectionEnd;r();let k=e;a.setSearchQuery(f.value),o.invalidateExactWorkOrderSearchCache(),a.getSearchQuery().trim()||o.setWorkOrderSearchMode(!1),a.getSearchQuery().trim()&&(a.setActiveWorkOrderId(null),a.setActiveAssetId(null),a.setActivePartId(null),a.setQuickFixMode(!1),a.setCreateWorkOrderMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)),m.setItem("maintainops.searchQuery",a.getSearchQuery()),o.resetWorkOrderPage(),o.resetPartsPage(),o.resetRequestsPage(),l=c(()=>(l=null,n=n.catch(()=>null).then(async()=>{if(k!==e||(await Promise.all([o.reloadWorkOrderQueue({render:!1}),o.reloadRequestQueue({render:!1})]),k!==e))return;let P=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,C=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),E=!("activeElement"in s)||s.activeElement===C;o.renderWorkspace(),E?g(h,y,w,P):p(P)}),n),d)})}),s.querySelectorAll("[data-view-work-search]").forEach(f=>{f.addEventListener("click",async()=>{r(),a.setActiveSection("work"),a.setActiveWorkOrderId(null),a.setActiveAssetId(null),a.setActivePartId(null),a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),o.setWorkOrderSearchMode(!0),o.invalidateExactWorkOrderSearchCache(),o.resetWorkOrderPage(),m.setItem("maintainops.activeSection",a.getActiveSection()),await o.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(f=>{f.addEventListener("click",async()=>{r(),o.setWorkOrderSearchMode(!1),o.invalidateExactWorkOrderSearchCache(),o.resetWorkOrderPage(),await o.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(a){!o||typeof o.scrollTo!="function"||o.scrollTo({top:a,behavior:"auto"})}async function m(a){let i=Number(o?.scrollY??o?.pageYOffset??0);if(await a(),!(!o||typeof o.scrollTo!="function")){if(typeof o.requestAnimationFrame=="function"){o.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(a.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setMyWorkFilter(a.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderFilter(a.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{t.setActiveStatusFilter(a.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{let i=a.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{let i=a.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderTypeFilter(a.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderPriorityFilter(a.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setWorkSort(a.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{t.setWorkSort(a.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{t.setWorkGroup(a.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{t.setWorkOrderAssigneeFilter(a.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(a=>{a.addEventListener("click",async()=>{a.disabled||await m(async()=>{t.setRequestViewFilter(a.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(a.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setPartsPage(t.getPartsPage()+(a.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setAssetsPage(t.getAssetsPage()+(a.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{t.setFinancialPage(t.getFinancialPage()+(a.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(a=>{a.addEventListener("change",async()=>{await m(async()=>{a.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(a.value),a.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(a.value),a.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(a.value),a.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(a.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(a=>{a.addEventListener("click",async()=>{await m(async()=>{let i=a.dataset.pageDirection==="next"?1:-1;if(a.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(a.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),a.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),a.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),a.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),a.dataset.listPage?.startsWith("planning-")){let c=a.dataset.listPage.replace("planning-","");t.setPlanningPage(c,t.getPlanningPage(c)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(a=>{a.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(a.dataset.planningGroup,!!a.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.storage||localStorage,o=e.state,s=e.windowRef||(typeof window<"u"?window:null),m=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!o)return;let a=()=>{o.setCreateWorkOrderMode(!1),o.setQuickFixMode(!1),o.setQuickFixAssetId(null),o.setQuickFixRequestId(null)};async function i(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function c(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function u(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function d(){e.renderWorkspace()}function r(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function p(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(p);return}p()}let f=n.querySelector("#back-to-my-work");f&&f.addEventListener("click",()=>{o.setActiveWorkOrderId(null),o.setActiveAssetId(null),r(),a(),e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{o.setActiveAssetId(null),r(),o.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{o.setActiveWorkOrderId(y.dataset.id),o.setActiveAssetId(null),r(),a(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation(),o.setActiveWorkOrderId(y.dataset.workPhotoJump),o.setActiveAssetId(null),r(),o.setActiveSection("work"),a(),t.setItem("maintainops.activeSection",o.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",w=>{w.stopPropagation(),o.setActiveAssetId(y.dataset.openAsset),o.setActiveWorkOrderId(null),r(),a(),o.getActiveSection()!=="assets"&&o.setActiveSection("work"),t.setItem("maintainops.activeSection",o.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll(".asset-card[data-asset-id]").forEach(y=>{let w=()=>{o.setActiveAssetId(y.dataset.assetId),o.setActiveWorkOrderId(null),o.setActivePartId(null),r(),a(),o.setReportIssueMode(!1),o.setActiveSection("assets"),t.setItem("maintainops.activeSection",o.getActiveSection()),e.renderWorkspace(),m()};y.addEventListener("click",w),y.addEventListener("keydown",k=>{k.key!=="Enter"&&k.key!==" "||(k.preventDefault(),w())})}),n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",()=>{o.setActiveWorkOrderId(y.dataset.miniWorkOrder),o.setActiveAssetId(null),r(),o.setActiveSection("work"),a(),t.setItem("maintainops.activeSection",o.getActiveSection()),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{y.addEventListener("toggle",async()=>{let w=y.dataset.assetId,k=y.dataset.assetRelationshipSection;!w||!k||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(w,k,y.open),y.open&&u(k)&&await i(w),y.open&&k==="asset-history"&&await c(w),d())})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let k=y.dataset.assetId,P=y.dataset.assetRelationSection,E=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,P):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,P,E),d()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async w=>{w.preventDefault(),w.stopPropagation();let k=y.dataset.openAssetHistory;k&&(o.setActiveAssetId(k),o.setActiveWorkOrderId(null),a(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(k),await c(k),e.renderWorkspace(),m())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let k=y.dataset.backAssetHistory;k&&o.setActiveAssetId(k),r(),e.renderWorkspace(),m()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let k=y.dataset.assetId,C=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(k,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(k,"asset-history",C),e.renderWorkspace(),m()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(a){!o||typeof o.scrollTo!="function"||o.scrollTo({top:a,behavior:"auto"})}function m(){let a=Number(o?.scrollY??o?.pageYOffset??0);if(e.renderWorkspace(),!(!o||typeof o.scrollTo!="function")){if(typeof o.requestAnimationFrame=="function"){o.requestAnimationFrame(()=>s(a));return}s(a)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(a=>{a.addEventListener("click",()=>{t.setPartInventoryFilter(a.dataset.partInventoryFilter),e.resetPartsPage(),m()})}),n.querySelectorAll("[data-part-sort]").forEach(a=>{a.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(a.value||"default"),e.resetPartsPage(),m())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(a=>{a.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===a.dataset.assetStatusFilter?"all":a.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),m()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(a=>{a.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===a.dataset.assetTypeFilter?"all":a.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),m()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(a=>{a.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(a.value||"all"),e.resetAssetsPage(),m())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:l}})();(function(){function l(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async o=>{o.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(m){e.showNotice(`Could not update status: ${m.message||m}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async o=>{o.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",o=>o.stopPropagation()),t.addEventListener("change",o=>{o.stopPropagation(),o.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:l}})();var la=Q(At()),ua=Q(Et());(function(){function l(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,o=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let m=e.getWorkOrderById(s.dataset.id);if(!m)return;let a=s.dataset.copyDowntime==="subject",i=a?e.downtimeEmailSubject(m):e.downtimeEmailBody(m),c=await e.copyTextToClipboard(i);s.textContent=c?"Copied":"Copy failed",o(()=>{s.textContent=a?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:l}})();(function(){function l(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:l}})();var ma=Q(Rt());(function(){function l(e={}){let n=e.documentRef||document;function t(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(m),e.renderWorkspace()}async function o(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let a=e.getPhotoPathsByWorkOrder(m);if(a.length){let c=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(a),"Work order photo cleanup timed out.",15e3);c.error&&e.warnRef("Work order photo storage cleanup failed",c.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(m),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(a){e.alertRef(`Could not delete work order: ${a.message||a}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(m=>{m.addEventListener("click",a=>{a.stopPropagation(),t(m.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(m=>{m.addEventListener("click",a=>{a.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(m=>{m.addEventListener("click",async a=>{a.stopPropagation(),await o(m.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:o,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(o=>{o.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(o.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=e.renderWorkspace;if(!t||typeof o!="function")return;let s=0;async function m(a){let i=++s;try{if(e.loadPartDetail&&await e.loadPartDetail(a.dataset.openPart)===!1||i!==s||a.isConnected===!1)return;t.setActivePartId(a.dataset.openPart),o()}catch(c){e.showNotice?.(`Could not open part: ${c.message||c}`,"warning")}}n.querySelectorAll("[data-open-part]").forEach(a=>{a.addEventListener("click",()=>m(a)),a.addEventListener("keydown",i=>{i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),m(a))})}),n.querySelectorAll("[data-close-part-detail]").forEach(a=>{a.addEventListener("click",()=>{t.setActivePartId(null),t.setShowPartSourceManager(!1),o()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(a=>{a.addEventListener("click",()=>{t.setShowPartSourceManager(!t.getShowPartSourceManager()),o()})})}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=e.renderWorkspace,s=e.messageComposerScopeNote,m=e.autoGrowTextarea;if(!t||typeof o!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-message-compose]").forEach(d=>d.addEventListener("click",()=>e.openComposer?.())),n.querySelector("[data-message-close-compose]")?.addEventListener("click",()=>e.closeComposer?.()),n.querySelector("[data-message-exit]")?.addEventListener("click",()=>e.exitMessages?.()),n.querySelectorAll("[data-message-view]").forEach(d=>d.addEventListener("click",()=>e.setMessageView?.(d.dataset.messageView))),n.querySelectorAll("[data-quote-message]").forEach(d=>d.addEventListener("click",()=>e.quoteMessage?.(d.dataset.quoteMessage))),n.querySelector("[data-clear-message-quote]")?.addEventListener("click",()=>e.quoteMessage?.(null)),n.querySelector("[data-message-new]")?.addEventListener("click",()=>e.jumpToLatest?.()),n.querySelector(".message-list")?.addEventListener("scroll",()=>e.onHistoryScroll?.(),{passive:!0}),n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelectorAll("[data-retry-messages]").forEach(d=>d.addEventListener("click",()=>e.retryMessages?.())),n.querySelector("[data-message-older]")?.addEventListener("click",async d=>{d.currentTarget.disabled=!0;let r=d.currentTarget;try{await e.loadOlderMessages?.()}finally{r.isConnected&&(r.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(d=>{d.addEventListener("click",()=>{let r=d.dataset.messageFilter;t.setMessageThreadFilter(r),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),a.setItem("maintainops.messageThreadFilter",r),a.setItem("maintainops.messageThreadsPage","1"),o()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(d=>{d.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(d.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(d.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),a.setItem("maintainops.activeSection","work"),o()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),a.setItem("maintainops.messageComposerWorkOrderId",""),o()});let c=n.querySelector("#message-search");c&&c.addEventListener("input",()=>{let d=c.value;t.setMessageSearchQuery(d),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),a.setItem("maintainops.messageSearchQuery",d),a.setItem("maintainops.messageThreadsPage","1"),o();let r=n.querySelector("#message-search");r&&(r.focus({preventScroll:!0}),r.selectionStart!=null&&r.setSelectionRange(c.selectionStart,c.selectionEnd))});let u=n.querySelector("#message-thread-form");if(u){let d=u.querySelector("#message-thread-type"),r=u.querySelector(".message-direct-field"),p=u.querySelector("#message-scope-note");if(d&&r&&p&&typeof s=="function"){let g=()=>{let f=d.value==="direct";r.classList.toggle("hidden-section",!f);let h=r.querySelector("select");h&&(h.disabled=!f,h.required=f);let y=u.querySelector("[name='title']");y&&(y.required=!f),p.textContent=s(d.value),e.showExistingConversation?.(f?h?.value:"")};d.addEventListener("change",g),r.querySelector("select")?.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(d=>{d.addEventListener("click",()=>{let r=n.querySelector("#message-thread-form");if(!r)return;let p=r.querySelector("details"),g=r.querySelector("#message-thread-type"),f=r.querySelector("select[name='direct_user_id']"),h=r.querySelector(".message-direct-field"),y=r.querySelector("#message-scope-note"),w=r.querySelector("input[name='title']");p&&(p.open=!0),g&&(g.value="direct"),f&&(f.value=d.dataset.messagePerson||"",f.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),w&&w.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(d=>{d.addEventListener("click",()=>{let p=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!p)return;let g=p.value.trim();p.value=g?`${g}
${d.dataset.quickReply}`:d.dataset.quickReply,p.focus(),typeof m=="function"&&m(p)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof o!="function"||typeof s!="function")return;let m=n.querySelector("#part-search-form");if(!m)return;let a=c=>{t.setPartSearchQuery(c||""),s(),o()},i=m.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{a(i.value||"");let c=n.querySelector("#part-search");if(!c)return;c.focus();let u=c.value.length;c.setSelectionRange(u,u)}),m.addEventListener("submit",c=>{c.preventDefault();let u=e.FormDataRef||FormData,d=new u(m).get("part_search")||"";a(d),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let o=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(m=>{m.addEventListener("click",async()=>{let a=performance.now(),i=m.dataset.section;e.visibleNavItems().some(([c])=>c===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),o.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,a))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let o=e.storage||localStorage;async function s(m){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(m),e.getActiveThreadId&&e.getActiveThreadId()!==m||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(m),(!e.getActiveThreadId||e.getActiveThreadId()===m)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderLiveMessages?.()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==m)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(m=>{m.addEventListener("click",async()=>{let a=m.dataset.messageThread;t.setMessageComposerOpen?.(!1),t.setActiveMessageThreadId(a),o.setItem("maintainops.activeMessageThreadId",a),await s(a)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(m=>{m.addEventListener("click",async()=>{let a=m.dataset.openWorkMessageThread;t.setActiveMessageThreadId(a),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),o.setItem("maintainops.activeMessageThreadId",a),o.setItem("maintainops.activeSection","messages"),await s(a)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let o=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),o.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(o=>{o.addEventListener("click",()=>{e.requestDeletePart(o.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(o=>{o.addEventListener("click",()=>{e.requestDeletePart(o.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(o=>{o.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let o=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let m=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(m),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),o.setItem("maintainops.messageComposerWorkOrderId",m),o.setItem("maintainops.activeSection","messages"),o.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(o=>{o.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let o=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),o.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let o=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),o.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",async()=>{if(t.disabled)return;t.disabled=!0;let o=t.textContent;t.textContent="Exporting...";try{await e.exportActiveSectionCsv()}finally{t.disabled=!1,t.textContent=o}})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:l}})();var Aa=Q(Ot());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(o=>{o.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(o.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(o=>{o.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(o=>{o.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(o.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(o=>{o.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(o.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(o=>{o.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(o=>{o.addEventListener("click",()=>{e.deleteMaintenanceRequest(o.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(o=>{o.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(o.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(o=>{o.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(o=>{o.addEventListener("click",()=>{e.deletePreventiveSchedule(o.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(o=>{o.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(o.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(o=>{o.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(o=>{o.addEventListener("click",async()=>{await e.deleteProcedureTemplate(o.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:l}})();(function(){function l(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(o=>{l(o),o.addEventListener("input",()=>l(o))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:l,bindWorkspaceTextareaAutoGrow:e}})();var Ma=Q(Wt());(function(){function l(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(o=>{o.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(o.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(o=>{o.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(o=>{o.addEventListener("click",()=>{e.cancelTeamInvite(o.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,o=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(m=>{m.addEventListener("click",async()=>{let a=await t(m.dataset.copyTeamInvite||"");m.textContent=a?"Copied":"Copy failed",o(()=>{m.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(m=>{m.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),o()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.state,o=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(m=>{m.addEventListener("click",()=>{t.setQuickFixAssetId(m.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),o()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:l}})();var La=Q(xt());(function(){function l(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,o=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(m=>{m.addEventListener("click",async()=>{let a=await t(m.dataset.copyPublicRequestLink);m.textContent=a?"Copied":"Copy failed",o(()=>{m.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:l}})();var Ua=Q(Mt());(function(){function l(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(o=>{o.addEventListener("click",()=>{t(o.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(o=>{o.addEventListener("click",()=>{t(o.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(o=>{o.addEventListener("click",()=>{let m=o.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(o.dataset.createFollowUp,m?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:l}})();var za=Q(Dt());(function(){function l(e={}){let n=e.documentRef||document,t=e.createComment,o=n.querySelector("#comment-form");!o||typeof t!="function"||o.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,o=n.querySelector("#quick-update-work-order-form");!o||typeof t!="function"||o.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,o=n.querySelector("#edit-work-order-form");!o||typeof t!="function"||o.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:l}})();(function(){function l(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(o=>{t(o),o.addEventListener("change",()=>t(o))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:l}})();var Ja=Q(Tt()),Za=Q(It()),Xa=Q(Ft()),eo=Q(Lt()),to=Q(Nt()),no=Q(Ut()),ro=Q(Qt()),ao=Q(Bt()),oo=Q(jt()),io=Q(zt()),so=Q(Gt()),co=Q(Vt()),lo=Q(Ht()),uo=Q(Yt()),po=Q(Kt()),mo=Q(Jt()),fo=Q(Zt()),go=Q(Xt()),ho=Q(en()),yo=Q(tn()),wo=Q(nn()),bo=Q(rn()),vo=Q(an()),ko=Q(on()),_o=Q(sn());(function(){function l(e){function n(o){return e[o]()}function t(o,s=n("requestViewFilter")){let m=o.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(m=m.eq("location_id",n("activeLocationId"))),s==="converted"?m=m.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(m=m.eq("status","submitted").is("converted_work_order_id",null));let a=e.postgrestSearchTerm(n("searchQuery"));if(a){let i=`%${a}%`,c=n("assets").filter(e.matchesActiveLocation).filter(u=>e.matchesQuery([u.name,u.asset_code,u.manufacturer,u.model,u.location,u.status,u.asset_type,e.parentAssetFor()(u)?.name],a)).map(u=>u.id).slice(0,e.SEARCH_ID_PAGE_SIZE);m=m.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...c.length?[`asset_id.in.(${c.join(",")})`]:[]].join(","))}return m}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:l}})();(function(){function l(e){function n(p){return e[p]()}async function t(){let p=n("searchQuery").trim();if(!p||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(w=>e.matchesQuery([w.name,w.asset_code,w.manufacturer,w.model,w.location,w.status,w.asset_type,e.parentAssetFor()(w)?.name],p)).map(w=>w.id),f=n("procedureTemplates").filter(w=>e.matchesQuery([w.name,w.description,...(w.procedure_steps||[]).map(k=>k.prompt)],p)).map(w=>w.id),h=n("parts").filter(e.matchesActiveLocation).filter(w=>e.matchesQuery([w.name,w.sku,w.supplier_name,w.quantity_on_hand,w.reorder_point,w.unit_cost],p)).map(w=>w.id),y=new Set;await Promise.all([o(y,h),s(y,"work_order_comments",["body"],p),s(y,"work_order_events",["event_type","summary"],p),s(y,"work_order_photos",["file_name"],p),s(y,"work_order_step_results",["value"],p)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:f.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function o(p,g,f={}){if(!g.length)return;let y=f.maxRows??300;for(let w of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",w),k=>{k.forEach(P=>{P.work_order_id&&p.add(P.work_order_id)}),y-=k.length},y)}catch(k){e.warn("Part-linked work order search failed",k);return}}}async function s(p,g,f,h,y={}){let w=e.postgrestSearchTerm(h);if(!w)return;let k=f.map(C=>`${C}.ilike.%${w}%`).join(","),P=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(k),C=>{C.forEach(E=>{E.work_order_id&&p.add(E.work_order_id)})},P)}catch(C){e.warn(`${g} work order search failed`,C)}}async function m(p={}){let g=await a(),f=g.length,h=Math.max(1,Math.ceil(f/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,w=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(E=>E.id);if(!w.length)return{data:[],error:null,count:f};let k=p.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),P=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:k,ids:w});if(P.error)return P;let C=new Map((P.data||[]).map(E=>[E.id,E]));return{...P,data:w.map(E=>C.get(E)).filter(Boolean),count:f}}async function a(){let p=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===p)return g.rows;let f=n("searchQuery").trim(),h=new Map;await i(h,f);let y=n("assets").filter(e.matchesActiveLocation).filter(E=>e.matchesQuery([E.name,E.asset_code,E.manufacturer,E.model,E.location,E.status,E.asset_type,e.parentAssetFor()(E)?.name],f)).map(E=>E.id),w=n("procedureTemplates").filter(E=>e.matchesQuery([E.name,E.description,...(E.procedure_steps||[]).map(O=>O.prompt)],f)).map(E=>E.id),k=n("parts").filter(e.matchesActiveLocation).filter(E=>e.matchesQuery([E.name,E.sku,E.supplier_name,E.quantity_on_hand,E.reorder_point,E.unit_cost],f)).map(E=>E.id);await Promise.all([c(h,"asset_id",y),c(h,"procedure_template_id",w)]);let P=new Set;await Promise.all([o(P,k,{maxRows:1/0}),s(P,"work_order_comments",["body"],f,{maxRows:1/0}),s(P,"work_order_events",["event_type","summary"],f,{maxRows:1/0}),s(P,"work_order_photos",["file_name"],f,{maxRows:1/0}),s(P,"work_order_step_results",["value"],f,{maxRows:1/0})]),await u(h,[...P]);let C=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:p,rows:C}),C}async function i(p,g){let f=e.postgrestSearchTerm(g);if(!f)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${f}%`).join(",");await e.fetchPagedSearchRows(()=>d().or(h),y=>r(p,y))}async function c(p,g,f){if(f.length)for(let h of e.chunkArray(f,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>d().in(g,h),y=>r(p,y))}async function u(p,g){if(g.length)for(let f of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>d().in("id",f),h=>r(p,h))}function d(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function r(p,g){(g||[]).forEach(f=>{f?.id&&p.set(f.id,{...p.get(f.id)||{},...f})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:m,exactWorkOrderSearchRows:a,addRelatedWorkOrderIdsFromParts:o,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:l}})();(function(){function l(e){function n(a){return e[a]()}function t(){let a=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),c=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],a)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],a)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],a)).sort((g,f)=>new Date(f.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),r=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],a)).sort((g,f)=>String(g.next_due_at||"").localeCompare(String(f.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),p=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(f=>f.prompt)],a)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:c,parts:u,requests:d,pm:r,procedures:p}}function o(a="all"){let i=e.startOfToday(),c=new Date(i);return c.setDate(c.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(u=>u.status!=="completed").filter(u=>e.matchesSearch([u.title,u.description,u.priority,u.status,u.assets?.name,e.assignmentLabel(u)])).filter(u=>a==="no_due"?!u.due_at:!!u.due_at).map(u=>{let d=u.due_at?new Date(`${u.due_at}T00:00:00`):null;return{kind:a==="no_due"?"no_due":"work",id:u.id,title:u.title,priority:u.priority,status:u.status,assetName:u.assets?.name||"No equipment",dueAt:u.due_at,due:d,createdAt:u.created_at||"",assignedTo:e.assignmentLabel(u),workOrder:u}}).filter(u=>a==="no_due"?!0:a==="overdue"?u.due<i:a==="today"?u.due.getTime()===i.getTime():a==="soon"?u.due>i&&u.due<=c:!0).sort((u,d)=>{if(a==="no_due"){let r={critical:4,high:3,medium:2,low:1};return(r[d.priority]||0)-(r[u.priority]||0)||new Date(u.createdAt||0)-new Date(d.createdAt||0)}return u.due-d.due})}function s(){let a=e.startOfToday(),i=new Date(a);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(c=>{let u=new Date(`${c.next_due_at}T00:00:00`);return u>=a&&u<=i}).filter(c=>e.matchesSearch([c.title,c.frequency,c.next_due_at,c.assets?.name])).map(c=>({kind:"pm",id:c.id,title:c.title,assetName:c.assets?.name||"No equipment",dueAt:c.next_due_at,due:new Date(`${c.next_due_at}T00:00:00`)})).sort((c,u)=>c.due-u.due)}function m(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(a=>a.follow_up_needed).filter(a=>e.matchesSearch([a.title,a.description,a.failure_cause,a.resolution_summary,a.assets?.name,a.assigned_profile?.full_name])).map(a=>({kind:"follow_up",id:a.id,title:a.title,assetName:a.assets?.name||"No equipment",completedAt:a.completed_at?new Date(a.completed_at).toLocaleDateString():"not completed",resolution:a.resolution_summary||a.completion_notes||"",workOrder:a})).sort((a,i)=>a.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:o,planningPmItems:s,followUpItems:m}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:l}})();(function(){function l(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,o){return n.from("locations").insert({company_id:t,name:o}).select("id").single()}window.MaintainOpsLocationsService={listLocations:l,createLocation:e}})();(function(){function l(m,a){return m.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",a)}function e(m,a){return m.from("company_members").select("*").eq("company_id",a).order("created_at",{ascending:!0})}function n(m,a){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",a).order("created_at",{ascending:!1})}function t(m,a){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",a).order("created_at",{ascending:!1})}function o(m,a){return m.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",a).order("created_at",{ascending:!1})}function s(m,a){return m.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",a).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:l,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:o,listRequestNotificationRecipients:s}})();(function(){function l(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:l}})();(function(){function l(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:l,listAssetFinancials:e}})();(function(){function l(i,c,u={}){return i.from("work_orders").select(c,u)}function e(i){return i.from("work_orders").select("id",{count:"exact",head:!0})}function n(i,c,u,d){return i.from("work_orders").select(d).eq("company_id",c).eq("id",u).maybeSingle()}function t(i,c,u,d){return i.from("work_orders").select(d).eq("company_id",c).eq("asset_id",u).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function o(i,c){let{companyId:u,locationId:d,locationsReady:r,selectClause:p,ids:g}=c,f=i.from("work_orders").select(p).eq("company_id",u).in("id",g);return r&&d&&(f=f.eq("location_id",d)),f}function s(i,c){let{companyId:u,locationId:d,locationsReady:r}=c,p=i.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",u);return r&&d&&(p=p.eq("location_id",d)),p}function m(i,c){let{companyId:u,locationId:d,locationsReady:r}=c,p=i.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",u).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return r&&d&&(p=p.eq("location_id",d)),p.order("id",{ascending:!0})}async function a(i,c,u=1/0,d=1e3){let r=0,p=0;for(;p<u;){let g=Math.min(d,u-p),{data:f,error:h}=await i().range(r,r+g-1);if(h)throw h;let y=f||[];if(c(y),p+=y.length,y.length<g)break;r+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:l,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:o,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:m,fetchPagedSearchRows:a}})();var Oo=Q(cn());(function(){function l(s){return s.rpc("get_my_companies")}function e(s,m){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",m).order("created_at",{ascending:!0})}function n(s,m){return s.from("company_members").select("company_id, role").eq("user_id",m).order("created_at",{ascending:!0})}function t(s,m){return s.from("companies").select("id, name, logo_path, created_at").in("id",m).order("created_at",{ascending:!0})}function o(s,m){return s.from("companies").select("id, name, created_at").in("id",m).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:l,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:o}})();(function(){function l(o,s){return o.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(o,s){return o.from("app_issue_reports").insert(s)}function n(o,s,m,a){return o.from("app_issue_reports").update({status:a,resolved_at:a==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",m)}function t(o,s,m){return o.from("app_issue_reports").delete().eq("company_id",s).eq("id",m)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:l,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let l="user_id, shop_reference_favorites, updated_at";function e(t,o){return t.from("user_preferences").select(l).eq("user_id",o).maybeSingle()}function n(t,o,s){return t.from("user_preferences").upsert({user_id:o,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(l).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Do=Q(ln()),To=Q(un()),Io=Q(dn()),Fo=Q(pn());(function(){function l(t,o,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${o}</strong></article>`}function e(t,o,s,m="neutral"){return`
    <article class="insight dashboard-card tone-${m}">
      <span>${t}</span>
      <strong>${o}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],o=window.MaintainOpsFormatting?.roleLabel||(a=>String(a||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),m=window.MaintainOpsDom?.escapeHtml||(a=>String(a??""));return`
    <section class="team-role-guide">
      ${t.map(a=>`
        <article>
          <strong>${o(a)}</strong>
          <span>${m(s(a))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:l,renderInsight:e,renderRoleGuide:n})})();var No=Q(mn());(function(){function l(d,r,p="active",g={},f){let h=f.getActiveStatusFilter(),y=g.filter||g.section,w=y?"button":"article",k=g.filter&&h===g.filter?" selected":"",P=p.includes("overdue")&&Number(r)>=3,C=P?" alert-blink":"",E=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),O=E?` ${E}`:"";return`
    <${w} class="gauge-readout ${p}${k}${C}"${O}>
      ${P?'<span class="gauge-alert-badge" aria-hidden="true">!</span>':""}
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
    </${w}>
  `}function e(d){let r=d.getWorkOrderDashboardCounts()||{},p=r.activeWork||0,g=r.newWork||0,f=r.inProgress||0,h=r.blocked||0,y=r.overdue||0,w=r.completedAll||0,k=r.completedMonth||0,P=r.completedWeek||0,C=d.getRequestsReady()?d.openMaintenanceRequests().filter(d.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${l("Active Work",p,"active",{filter:"active"},d)}
      ${l("New",g,"new",{filter:"open"},d)}
      ${l("In Progress",f,"in_progress",{filter:"in_progress"},d)}
      ${l("Blocked",h,"blocked",{filter:"blocked"},d)}
      ${l("Overdue",y,"overdue",{filter:"overdue"},d)}
      ${l("Requests",C,"request",{filter:"requests"},d)}
      ${l("All Completed",w,"completed",{filter:"completed"},d)}
      ${l("Completed Month",k,"completed",{filter:"completed_month"},d)}
      ${l("Done This Week",P,"completed",{filter:"completed_week"},d)}
    </div>
  `}function n(d,r){let p=d||{},g=p.newWork||0,f=p.inProgress||0,h=p.blocked||0,y=p.activeWork??g+f+h,w=p.overdue||0,k=p.completedAll||0,P=p.completedMonth||0,C=p.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${l("Active Work",y,"active workload-pill",{filter:"active"},r)}
      ${l("New",g,"new workload-pill",{filter:"open"},r)}
      ${l("In Progress",f,"in_progress workload-pill",{filter:"in_progress"},r)}
      ${l("Blocked",h,"blocked workload-pill",{filter:"blocked"},r)}
      ${l("Overdue",w,"overdue workload-pill",{filter:"overdue"},r)}
      ${l("All Completed",k,"completed workload-pill",{filter:"completed"},r)}
      ${l("Completed Month",P,"completed workload-pill",{filter:"completed_month"},r)}
      ${l("Done This Week",C,"completed workload-pill",{filter:"completed_week"},r)}
    </div>
  `}function t(d){return d.getWorkOrders().filter(r=>d.getDueState(r)?.className==="overdue")}function o(d){return d.getWorkOrders().filter(r=>s(r,d))}function s(d,r,p=new Date){if(!d.completed_at)return!1;let g=new Date(d.completed_at),f=r.sundayWeekRange(p);return Number.isFinite(g.getTime())&&g>=f.start&&g<f.end}function m(d){return d.getWorkOrders().filter(a)}function a(d){let r=new Date,p=new Date(r.getFullYear(),r.getMonth(),1);return!!(d.completed_at&&new Date(d.completed_at)>=p)}function i(d){let r=d.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!r.length)return 0;let p=r.reduce((g,f)=>g+Number(f.actual_minutes||0),0);return Math.round(p/r.length)}function c(d){let r=new Date;r.setHours(0,0,0,0);let p=new Date(r);return p.setDate(p.getDate()+7),d.getPreventiveSchedules().filter(g=>{let f=new Date(`${g.next_due_at}T00:00:00`);return f>=r&&f<=p})}function u(d){return Object.freeze({renderGaugeReadout:(r,p,g="active",f={})=>l(r,p,g,f,d),renderWorkOrderGaugeDashboard:()=>e(d),renderWorkloadStrip:r=>n(r,d),overdueWorkOrders:()=>t(d),completedThisWeek:()=>o(d),isCompletedThisWeek:(r,p)=>s(r,d,p),completedThisMonth:()=>m(d),isCompletedThisMonth:a,averageCompletionMinutes:(r=d.getWorkOrders())=>i(r),preventiveDueSoon:()=>c(d)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:u})})();(function(){function l(n){let t={search:'<circle cx="10" cy="10" r="7"></circle><path d="m15 15 6 6"></path>',star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>',attach:'<path d="m21 11-8 8a6 6 0 0 1-8-8l9-9a4 4 0 0 1 6 6l-9 9a2 2 0 0 1-3-3l8-8"></path>',mic:'<rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"></path>',stop:'<rect x="6" y="6" width="12" height="12"></rect>',file:'<path d="M14 2H5v20h14V7l-5-5v5h5M8 12h8M8 16h8"></path>',send:'<path d="m22 2-7 20-4-9-9-4 20-7z"></path><path d="M22 2 11 13"></path>',reply:'<path d="m9 10-5 5 5 5"></path><path d="M4 15h10a6 6 0 0 0 0-12h-2"></path>',back:'<path d="m12 5-7 7 7 7"></path><path d="M5 12h15"></path>',close:'<path d="m6 6 12 12M6 18 18 6"></path>',compose:'<path d="M12 20H4V4h8"></path><path d="m14 4 4-2 4 4-12 12H6v-4L18 2"></path>',more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',smile:'<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"></path>',active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:l,navIcon:e})})();(function(){function l(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,o=>o.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:l,assetStatusLabel:e})})();(function(){function l({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:o,getPartInventoryFilter:s,assetTypeLabel:m,assetStatusLabel:a}){function i(d){return e().trim()?"No requests match this search.":d==="converted"?"No converted requests at this location.":d==="all"?"No requests at this location yet.":"No active requests waiting for review."}function c(){let d=n(),r=t?t():"all";return e().trim()?"No equipment matches this search.":d!=="all"?`No ${a(d).toLowerCase()} equipment found.`:r!=="all"?`No ${m(r).toLowerCase()} equipment found.`:"No equipment added yet."}function u(){return o().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:c,partEmptyStateText:u}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:l}})();var zo=Q(fn());(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:o,getSearchQuery:s}){function m(f){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(f)} previewed in ${e(o())}</span>
          </div>
          <div class="global-search-grid">
            ${a("Work Orders",f.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${a("Equipment",f.assets,c,"asset")}
            ${a("Parts",f.parts,u,"parts")}
            ${a("Requests",f.requests,d,"comment")}
            ${a("PM",f.pm,r,"procedure")}
            ${a("Procedure Checklists",f.procedures,p,"procedure")}
          </div>
        </section>
      `}function a(f,h,y,w,k={}){return`
        <section class="global-result-group relationship-detail ${w}">
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
      `}function c(f){return`
        <button class="global-result-item" data-search-asset="${f.id}" type="button">
          <strong>${e(f.name)}</strong>
          <span>${e(f.asset_code||"No serial")} - ${e(f.status)} - ${e(f.location||o())}</span>
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
      `}function g(f){return Object.values(f).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:m,renderGlobalResultGroup:a,renderGlobalWorkResult:i,renderGlobalAssetResult:c,renderGlobalPartResult:u,renderGlobalRequestResult:d,renderGlobalPmResult:r,renderGlobalProcedureResult:p,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:l}})();var Vo=Q(gn()),Ho=Q(hn()),Yo=Q(yn());(function(){function l({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:o=(c,u)=>u,renderListPagination:s,statusLabel:m,renderRelationshipChips:a,canEditOperationalRecords:i=()=>!0}){function c(p,g,f,h,y={}){let w=n||12,k=typeof t=="function"?t(h):1,P=Math.max(1,Math.ceil(g.length/w)),C=Math.min(Math.max(k,1),P),E=g.slice((C-1)*w,C*w),O=o(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${O?"open":""}>
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
            ${typeof s=="function"?s(`planning-${h}`,g.length,C,P):""}
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
            ${c("No Due Date",p.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${c("Follow-up Needed",p.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${u("Current schedule","Work requiring attention now.",`
            ${c("Overdue",p.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${c("Due Today",p.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${u("Upcoming","Near-term maintenance and preventive work.",`
            ${c("Next 7 Days",p.soon,"in_progress","soon")}
            ${c("PM Due Soon",p.pm,"open","pm")}
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
          ${a(p.workOrder)}
        </article>
      `}return{renderPlanningGroup:c,renderPlanningBoard:d,renderPlanningItem:r}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:l}})();var Jo=Q(wn());(function(){function l({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:o,getWorkOrderPage:s,getPartsPage:m,getAssetsPage:a}){function i(r,p){if(r<=e)return"";let g=s(),f=(g-1)*e+1,h=Math.min(r,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${h} of ${r} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function c(r,p){if(r<=n)return"";let g=m(),f=(g-1)*n+1,h=Math.min(r,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${h} of ${r} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function u(r,p){if(r<=t)return"";let g=a(),f=(g-1)*t+1,h=Math.min(r,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${h} of ${r} - Page ${g} of ${p}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=p?"disabled":""}>Next</button>
        </div>
      `}function d(r,p,g,f){if(p<=o)return"";let h=(g-1)*o+1,y=Math.min(p,g*o);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${r}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${p} - Page ${g} of ${f}</span>
          <button class="secondary-button page-action-button" data-list-page="${r}" data-page-direction="next" type="button" ${g>=f?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:c,renderAssetsPagination:u,renderListPagination:d}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:l}})();var Xo=Q(bn());(function(){function l({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:o,matchesActiveLocation:s,isAssetDescendantOf:m,parentAssetFor:a}){function i(g=t()){return n().map(f=>`<option value="${f.id}" ${f.id===g?"selected":""}>${e(f.name)}</option>`).join("")}function c(g){let f=a(g);return f?`${g.name} - part of ${f.name}`:g.name}function u(g=""){let f=o().filter(s).sort((w,k)=>c(w).localeCompare(c(k))),h=g?o().find(w=>w.id===g):null;return(h&&!f.some(w=>w.id===h.id)?[h,...f]:f).map(w=>`<option value="${w.id}" ${w.id===g?"selected":""}>${e(c(w))}</option>`).join("")}function d(g="",f=""){return o().filter(s).filter(h=>h.id!==f&&!m(h.id,f)).sort((h,y)=>c(h).localeCompare(c(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(c(h))}</option>`).join("")}function r(g=""){let f=[...new Set(o().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,w)=>y.localeCompare(w)),h=String(g||"").trim();return h&&!f.includes(h)?[h,...f]:f}function p(g=""){return r(g).map(f=>`<option value="${e(f)}" ${f===g?"selected":""}>${e(f)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:u,renderParentAssetOptions:d,renderAssetAreaOptions:p,assetOptionLabel:c}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:l}})();(function(){function l({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function o(s){if(!s.photo_storage_path)return"";let m=s.photo_file_name||s.photo_original_file_name||"Request photo",a=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(m)}">`:""}
          <div>
            <strong>${e(m)}</strong>
            <span>${e(a)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:o}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:l}})();(function(){function l({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let o=n();return o>0?`<b class="nav-badge nav-message-badge" aria-label="${o} unread conversations and work alerts">${o}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:l}})();(function(){function l(){function e(o){let s=Number(o);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(o){let s=e(o);return s?s>99?"99+":String(s):""}function t(o,s={}){let m=n(o);if(!m)return"";let a=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${a}">${m}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function o(s){let m=n()[s.reporter_id]?.full_name||"Team member",a=t().find(u=>u.id===s.location_id)?.name||"No location",i=s.status||"open",c=s.severity||"normal";return`
        <article class="issue-report-card issue-${i}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${c==="blocking"?"critical":c==="minor"?"completed":"open"}">${e(c)}</span>
              <span class="chip issue-status-chip issue-status-${i}">${e(i)}</span>
              <span>${e(a)}</span>
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
      `}return{renderAppIssueReport:o}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:o,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:m}){function a(c){let u=s()[c.id]||[],d=u[u.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(c.title)}</strong>
            <span>${e(t(c))}${d?` - ${e(n(d.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${c.id}" type="button">Open Thread</button>
        </article>
      `}function i(c){let u=o().filter(d=>d.work_order_id===c.id);return`
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
                ${u.map(a).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:i,renderLinkedWorkMessageThread:a}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:l}})();(function(){function l({escapeHtml:e,recommendedWorkOrderStep:n}){function t(o){let s=n(o);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:l}})();(function(){function l({escapeHtml:e}){function n(o,s,m,a,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${m}" type="button">
          <span>${e(o)}</span>
          <strong>${s}</strong>
          <small>${e(a)}</small>
        </button>
      `}function t(o){return o.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:o,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:m,getMessageThreads:a,getPartsUsedByWorkOrder:i}){function c(u){let d=a().filter(f=>f.work_order_id===u.id).length,r=(i()[u.id]||[]).reduce((f,h)=>f+(Number(h.quantity_used)||0),0),p=u.asset_id?s(u)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=u.status==="completed"?"Review history or create follow-up if needed":u.status==="blocked"?"Resolve blocker or add current update":u.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
            <small>${o(u)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${p[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${p[0]}</strong>
            <small>${e(p[1])}</small>
          </button>
          ${m(u)}
        </section>
      `}return{renderWorkOrderCommandSummary:c}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:l}})();(function(){function l(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function o(){return`
        <datalist id="part-source-options">
          ${n().map(a=>`<option value="${e(a)}"></option>`).join("")}
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
              ${m.map(a=>`
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
      `}return{renderPartSourceOptions:o,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:l}})();(function(){function l({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:o,parentAssetFor:s,childAssetsFor:m}){function a(i){let c=t().filter(r=>r.asset_id===i.id&&r.status!=="completed").length,u=s(i),d=m(i.id);return`
        <article class="asset-card asset-state-${i.status} ${i.id===o()?"selected":""}" data-asset-id="${i.id}" tabindex="0">
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
          <span class="muted">${c} open work</span>
        </article>
      `}return{renderAssetCard:a}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:l}})();(function(){function l({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function o(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(m=>`<option value="${m.id}" ${m.id===s?"selected":""}>${e(m.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:o}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:l}})();(function(){function l({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function o(m){let a=n().filter(i=>i.thread_id===m.id).map(i=>t(i.user_id));return a.length?a.join(", "):"Direct message"}function s(m){return m.thread_type==="direct"?o(m):m.thread_type==="location"?`Company team / ${e().find(a=>a.id===m.location_id)?.name||"Location topic"}`:"Whole company"}return{directThreadNames:o,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:l}})();(function(){function l({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:o,unreadMessageCount:s,getMessagesByThreadId:m,getActiveMessageThreadId:a,threadTitle:i=c=>c.title}){function c(u){let r=(m()[u.id]||[]).filter(E=>!E.deleted_at),p=u.latest_message||r[r.length-1],g=s(u.id),f=i(u),h=String(f||"MO").trim().split(/\s+/).slice(0,2).map(E=>Array.from(E)[0]).join("").toUpperCase(),y=Math.abs([...String(f)].reduce((E,O)=>E*31+O.charCodeAt(0)|0,0))%6,w=p?.body?`${e(t(p.sender_id))}: ${e(p.body)}`:"Attachment",k=new Date(p?.created_at),P=k.toDateString()===new Date().toDateString(),C=p?P?k.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):n(p.created_at):"";return`
        <button class="message-thread-button ${u.id===a()?"active":""} ${g?"unread":""}" data-message-thread="${u.id}" aria-current="${u.id===a()?"true":"false"}" type="button">
          <span class="message-thread-avatar" data-tone="${y}" aria-hidden="true">${u.thread_type==="direct"?e(h):"#"}</span>
          <span class="message-row-content"><span class="message-row-heading"><strong>${e(f)}</strong><time datetime="${e(p?.created_at||"")}" title="${e(p?n(p.created_at):"")}">${e(C)}</time></span>
          <span class="message-row-preview"><small>${p?w:"No messages yet"}</small>${g?`<span class="message-unread-pill" aria-label="${g} unread messages">${g}</span>`:""}</span>
          <span class="message-row-scope">${u.work_order_id?"Work order / ":""}${e(o(u))}${u.preferences?.muted?" / Muted":""}</span>
          </span>
        </button>
      `}return{renderMessageThreadButton:c}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:l}})();(function(){function l({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:l}})();var hi=Q(vn());(function(){function l({getLocations:e}){function n(t){let o=e().find(s=>s.id===t.default_location_id);return o?`Default location: ${o.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:l}})();(function(){function l({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function o(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:o}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:l}})();(function(){function l(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function o(s){let m=n(s),a=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),c=e.cleanWorkOrderDescription(s.description)||s.title,u=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${m} is down or needs maintenance attention. At this time, the expected downtime is ${a}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${c}`,`Work order: ${s.title}`,`Equipment: ${m}`,`Current update: ${u}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:o}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:l}})();(function(){function l(){function e(t){let o=t?.message||"";return o.includes("assets_asset_type_check")||o.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:l}})();(function(){function l(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:l}})();(function(){function l(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,m){let a=n(s);return m!==e.OUTSIDE_VENDOR_VALUE?a||null:[a,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function o(s,m){let a=String(s||"").trim();if(!m?.photo_storage_path)return a||null;let i="[Request photo attached to original request]";return a?`${a}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:o}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:l}})();(function(){function l(){function e(n,t){if(!n)return"Work order updated.";let o=[];return n.title!==t.title&&o.push("title"),(n.description||"")!==(t.description||"")&&o.push("description"),(n.due_at||"")!==(t.due_at||"")&&o.push("due date"),n.priority!==t.priority&&o.push("priority"),(n.type||"corrective")!==t.type&&o.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&o.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&o.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&o.push("actual minutes"),o.length?`Updated ${o.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:l}})();(function(){function l(){function e(n,t,o,s=[]){return[...n.map(m=>({...m,type:"comment"})),...t.map(m=>({...m,type:"photo"})),...s.map(m=>({...m,type:"part"})),...o.map(m=>({...m,type:"event"}))].sort((m,a)=>new Date(a.created_at)-new Date(m.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:l}})();(function(){function l(e){function n(a){return Number(a.quantity_on_hand)<=Number(a.reorder_point)}function t(){return e.getParts().filter(n)}function o(a){let i=e.getPartSearchQuery().trim().toLowerCase();return i?a.some(c=>String(c??"").toLowerCase().includes(i)):!0}function s(){let a=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:o([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...a].sort((i,c)=>{let u=String(i.supplier_name||"zzzzzz").localeCompare(String(c.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return u||String(i.name||"").localeCompare(String(c.name||""),void 0,{sensitivity:"base"})}):a}function m(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(a=>String(a.supplier_name||"").trim()).filter(Boolean))].sort((a,i)=>a.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:o,partSourceOptions:m}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:l}})();(function(){function l(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(o=>o.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function o(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,c=e.getRequestViewFilter()){return c==="converted"?o(i):c==="all"?!0:!o(i)&&i.status==="submitted"}function m(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(c=>t(c)&&s(c,i))}function a(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:o,requestMatchesViewFilter:s,filteredRequests:m,requestFilterCounts:a}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:l}})();(function(){function l(){function e(t){let o=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return o.length?`This equipment is kept for traceability because it has ${o.join(", ")}.`:""}function n(t){let o=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return o.length?`This procedure is kept for traceability because it is linked to ${o.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:l}})();(function(){function l(e){function n(m){return e.getAssets().find(a=>a.id===m?.parent_asset_id)||null}function t(m){return e.getAssets().filter(a=>a.parent_asset_id===m).sort((a,i)=>a.name.localeCompare(i.name))}function o(m,a){if(!m||!a)return!1;let i=e.getAssets().find(u=>u.id===m),c=new Set;for(;i?.parent_asset_id&&!c.has(i.id);){if(i.parent_asset_id===a)return!0;c.add(i.id),i=e.getAssets().find(u=>u.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(m=>!e.matchesActiveLocation(m)||e.getAssetStatusFilter()!=="all"&&m.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(m.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(m.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([m.name,m.asset_code,m.manufacturer,m.model,m.location,m.status,m.asset_type,n(m)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:o}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:l}})();var Wi=Q(kn());(function(){function l(e){function n(o){let s=e.getSearchQuery().trim().toLowerCase();return s?o.some(m=>String(m??"").toLowerCase().includes(s)):!0}function t(o,s=e.getSearchQuery()){let m=s.trim().toLowerCase();return m?o.some(a=>String(a??"").toLowerCase().includes(m)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:l}})();(function(){function l(e){function n(a){return a.due_at?new Date(`${a.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(a){return{low:1,medium:2,high:3,critical:4}[a]||0}function o(a){return a.completed_at?new Date(a.completed_at).getTime():0}function s(a){return typeof e.assignmentLabel=="function"?e.assignmentLabel(a):a.assigned_profile?.full_name||a.assigned_to||"Unassigned"}function m(a,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?o(i)-o(a)||new Date(i.created_at)-new Date(a.created_at):e.getWorkSort()==="due"?n(a)-n(i)||new Date(i.created_at)-new Date(a.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(a.priority)||n(a)-n(i):e.getWorkSort()==="type"?String(a.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(a.created_at):e.getWorkSort()==="assigned"?s(a).localeCompare(s(i))||new Date(i.created_at)-new Date(a.created_at):new Date(i.created_at)-new Date(a.created_at)}return{compareWorkOrders:m,dueSortValue:n,prioritySortValue:t,completedSortValue:o,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:l}})();(function(){function l(e){function n(o){return o?.location_id||o?.assets?.location_id||null}function t(o){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(o)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:l}})();(function(){function l(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(c=>{let u=e.isConversationArchived?.(c)||!1;if(i==="archived")return u&&e.matchesQuery(o(c),e.getMessageSearchQuery());if(u)return!1;let d=i==="all"||i==="favorites"&&c.preferences?.favorite||i==="unread"&&s(c.id)>0||c.thread_type===i,r=e.getMessageSection?.()||"";return d&&(!r||c.preferences?.section_name===r)&&e.matchesQuery(o(c),e.getMessageSearchQuery())}).sort((c,u)=>+!!u.preferences?.favorite-+!!c.preferences?.favorite)}function o(i){let c=e.getMessageThreadMembers().filter(u=>u.thread_id===i.id).map(u=>e.teamMemberName(u.user_id));return[i.title,e.messageThreadScopeLabel(i),...c]}function s(i){let c=e.getMessageReadsByThreadId()[i]?.last_read_at,u=c?new Date(c).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(d=>d.deleted_at||d.sender_id===e.getCurrentUser()?.id?!1:new Date(d.created_at).getTime()>u).length}function m(){return e.getMessageThreads().filter(i=>!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}function a(){return e.getMessageThreads().filter(i=>i.thread_type==="direct"&&!i.preferences?.muted&&!e.isConversationArchived?.(i)).reduce((i,c)=>i+(s(c.id)>0?1:0),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:o,unreadMessageCount:s,totalUnreadMessages:m,directUnreadMessages:a}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let o=e.getActiveStatusFilter();return o==="overdue"?e.getDueState(t)?.className==="overdue":o==="completed_month"?e.isCompletedThisMonth(t):o==="completed_week"?e.isCompletedThisWeek(t):o==="active"||o==="all"?t.status!=="completed":t.status===o}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:l}})();(function(){function l(e){function n(t){let o=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],m=e.getEventsByWorkOrder()[t.id]||[],a=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(d=>d.id===t.procedure_template_id),c=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),u=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,u[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(d=>[d.prompt,d.step_type]),...o.flatMap(d=>[d.parts?.name,d.parts?.sku,d.parts?.supplier_name,d.quantity_used,d.unit_cost]),...s.flatMap(d=>[d.body,u[d.author_id]?.full_name]),...m.flatMap(d=>[d.event_type,d.summary,u[d.actor_id]?.full_name]),...a.flatMap(d=>[d.file_name,d.original_file_name,d.content_type]),...c.flatMap(d=>[d.value,d.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:l}})();(function(){function l(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(o=>e.matchesActiveLocation(o)?(e.getMyWorkFilter()==="created"?o.created_by===t:e.isWorkOrderAssignedToUser(o,t))&&e.matchesSearch(e.workOrderSearchValues(o)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:l}})();(function(){function l(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:l}})();var Qi=Q(_n()),Bi=Q(qn()),ji=Q(Sn()),zi=Q(Cn()),Gi=Q($n()),Vi=Q(Pn()),Hi=Q(An());(function(){function l(t){if(!t)return"";let o=new Date(t),s=new Date,m=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),a=new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime(),i=o.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return a===m?`Today ${i}`:a===m-864e5?`Yesterday ${i}`:o.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let o=new Date(t),s=new Date,m=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),a=new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime();return a===m?"Today":a===m-864e5?"Yesterday":o.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let o=String(t||"").trim().split(/\s+/).filter(Boolean);return o.length?o.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:l,formatMessageDay:e,initials:n})})();})();
//# sourceMappingURL=runtime.d29d37c197.js.map
