(()=>{var xn=Object.create;var Ct=Object.defineProperty;var Mn=Object.getOwnPropertyDescriptor;var Tn=Object.getOwnPropertyNames;var Dn=Object.getPrototypeOf,In=Object.prototype.hasOwnProperty;var U=(c,e)=>()=>{try{return e||c((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Fn=(c,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Tn(e))!In.call(c,r)&&r!==n&&Ct(c,r,{get:()=>e[r],enumerable:!(t=Mn(e,r))||t.enumerable});return c};var Q=(c,e,n)=>(n=c!=null?xn(Dn(c)):{},Fn(e||!c||!c.__esModule?Ct(n,"default",{value:c,enumerable:!0}):n,c));var $t=U((Nn,Te)=>{(function(){let c=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,r=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},d=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),o=d(),i={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:o,workspaceLoadPending:!1,workspaceLoadWasHidden:r?.visibilityState==="hidden",navigationStartedAt:d(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},l=new Map,u=0;function p(W){if(W==null||W==="")return null;let v=Number(W);return Number.isFinite(v)&&v>=0?v:null}function a(){let W=s.connection||s.mozConnection||s.webkitConnection,v=t?.matchMedia?.("(pointer: coarse)")?.matches,A=p(s.deviceMemory),E=p(s.hardwareConcurrency),O=A!==null&&A<=4||E!==null&&E<=4||v?"constrained":"standard",q=p(t?.innerWidth);return{source:"browser",device_tier:O,viewport_class:q!==null&&q<720?"mobile":q!==null&&q<1100?"tablet":"desktop",connection_type:String(W?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!W?.saveData}}function m(W={}){let v={...a(),measurement_version:n,...W};return Object.fromEntries(Object.entries(v).filter(([,A])=>A!=null&&A!==""))}function g(W=12e3){!i.client||!i.companyId||i.flushTimer||Date.now()<i.disabledUntil||typeof t?.setTimeout=="function"&&(i.flushTimer=t.setTimeout(()=>{i.flushTimer=null,y()},W))}function f(W,v,A={},E={}){if(!c.has(W))return!1;let O=p(v);if(O===null)return!1;let q=Number(O.toFixed(W==="cls"?4:2));return i.latest[W]={metric:W,value:q,unit:e[W],context:m(A),measuredAt:new Date().toISOString()},E.persist!==!1&&i.persistenceEnabled&&(i.pending.push({metric:W,value:q,unit:e[W],context:m(A)}),i.pending.length>60&&i.pending.splice(0,i.pending.length-60),g(E.immediate?250:12e3)),!0}async function y(){if(!i.client||!i.companyId||!i.pending.length||Date.now()<i.disabledUntil)return!1;let W=i.companyId,v=i.pending.splice(0,20),A=null;try{A=(await i.client.rpc("record_app_performance_samples",{target_company_id:W,samples:v})).error||null}catch(O){A=O}if(!A)return i.pending.length&&g(1e3),!0;i.companyId===W&&i.pending.unshift(...v);let E=String(A.message||A).toLowerCase();return i.disabledUntil=Date.now()+(E.includes("could not find")||E.includes("does not exist")?3e5:6e4),!1}function h({client:W,companyId:v}){if(i.client=W||null,i.companyId=v||"",!(!i.client||!i.companyId)){if(i.configuredCompanyId!==i.companyId){i.configuredCompanyId=i.companyId,f("session_start",1,{source:"workspace"},{immediate:!0});let A=s.connection||s.mozConnection||s.webkitConnection;p(A?.downlink)!==null&&f("connection_downlink_mbps",A.downlink,{source:"browser-estimate"}),p(A?.rtt)!==null&&f("connection_rtt_ms",A.rtt,{source:"browser-estimate"})}g(250)}}function b(){i.workspaceStartedAt=d(),i.workspaceLoadPending=!0,i.workspaceLoadWasHidden=r?.visibilityState==="hidden"}function w(W){if(!W)return;if(i.workspaceCompanies.has(W)){i.workspaceLoadPending=!1;return}i.workspaceCompanies.add(W);let v=!i.workspaceLoadWasHidden&&r?.visibilityState!=="hidden";f("workspace_ready_ms",d()-i.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:v}),i.workspaceLoadPending=!1,i.latest.cls||f("cls",u,{source:"performance-observer"},{persist:!1}),v&&t?.setTimeout?.(()=>P(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function P(W=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!i.companyId||!i.workspaceCompanies.has(i.companyId))return;let v=new Set(W);Object.values(i.latest).filter(A=>v.has(A.metric)).forEach(A=>{let E=A.metric==="inp_ms";(E?i.lastPersistedInpValue===A.value:i.persistedVitals.has(A.metric))||f(A.metric,A.value,{source:"performance-observer"})&&(E?i.lastPersistedInpValue=A.value:i.persistedVitals.add(A.metric))})}function $(W=1500){typeof t?.setTimeout=="function"&&(i.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(i.inpCaptureTimer),i.inpCaptureTimer=t.setTimeout(()=>{i.inpCaptureTimer=null,P(["inp_ms"])},W))}function R(){i.navigationStartedAt=d()}function C(W){let v=Number(W);return r?.visibilityState==="hidden"||Number.isFinite(v)&&i.lastHiddenAt>=v}function k(W,v=i.navigationStartedAt){f("section_navigation_ms",d()-v,{source:String(W||"workspace").slice(0,48)},{persist:!C(v)})}function S(W,v,A=null){f("query_latency_ms",d()-v,{source:String(W||"query").slice(0,48)},{persist:!C(v)}),A&&f("client_error",1,{source:`query:${String(W||"unknown").slice(0,36)}`},{immediate:!0})}function _(W={}){let v={source:"performance-room",quality_tier:W.qualityTier||"unknown"};Object.entries({spatial_ready_ms:W.readyMs,spatial_fps:W.fps,spatial_frame_ms:W.frameMs,spatial_slow_frame_pct:W.slowFramePercent,spatial_draw_calls:W.drawCalls,spatial_triangles:W.triangles,spatial_geometries:W.geometries,spatial_textures:W.textures,webgl_context_loss:Number(W.contextLosses)>0?W.contextLosses:void 0}).forEach(([A,E])=>{p(E)!==null&&f(A,E,v)}),g(500)}function M(){return{latest:{...i.latest},connection:a(),pendingCount:i.pending.length,measurementVersion:n,persistenceEnabled:i.persistenceEnabled}}function N(W,v,A={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(W)))try{new PerformanceObserver(O=>v(O.getEntries())).observe({type:W,...A})}catch{}}N("paint",W=>{let v=W.find(A=>A.name==="first-contentful-paint");v&&f("fcp_ms",v.startTime,{source:"performance-observer"},{persist:!1})}),N("largest-contentful-paint",W=>{let v=W.at(-1);v&&f("lcp_ms",v.startTime,{source:"performance-observer"},{persist:!1})}),N("layout-shift",W=>{W.forEach(v=>{v.hadRecentInput||(u+=v.value)}),f("cls",u,{source:"performance-observer"},{persist:!1})}),N("event",W=>{W.forEach(A=>{A.interactionId&&l.set(A.interactionId,Math.max(l.get(A.interactionId)||0,A.duration))});let v=[...l.values()].sort((A,E)=>E-A);v.length&&(f("inp_ms",v[Math.min(Math.floor(v.length/50),10)],{source:"performance-observer"},{persist:!1}),$())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>f("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>f("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{i.offlineStartedAt=d(),f("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{i.offlineStartedAt&&f("reconnect_ms",d()-i.offlineStartedAt,{source:"network"},{immediate:!0}),i.offlineStartedAt=0}),r?.addEventListener?.("visibilitychange",()=>{r.visibilityState==="hidden"&&(i.lastHiddenAt=d(),i.workspaceLoadPending&&(i.workspaceLoadWasHidden=!0),P(),y())});let D={beginWorkspaceLoad:b,configure:h,flush:y,markNavigationStart:R,markWorkspaceReady:w,record:f,recordQueryLatency:S,recordSectionNavigation:k,recordSpatial:_,snapshot:M};typeof window<"u"&&(window.MaintainOpsAppTelemetry=D),typeof Te<"u"&&(Te.exports=D)})()});var Pt=U((Un,De)=>{(function(){function c(n){return n?.user?.id||""}function e(n,t,r){let s=String(n||"");return!(!c(t)&&!c(r)||s==="TOKEN_REFRESHED"&&c(t)&&c(t)===c(r))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof De<"u"&&(De.exports={shouldRenderForAuthEvent:e})})()});var At=U((Qn,Ie)=>{(function(){let c={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(o,i,l){if(!o||!o.getItem)return l;let u=o.getItem(i);return u??l}function n(o,i){let l=Number(e(o,i,"1"));return Number.isFinite(l)&&l>0?l:1}function t(o,i,l){!o||!o.setItem||o.setItem(i,String(l))}function r(o,i){try{let l=JSON.parse(e(o,i,"{}"));return l&&typeof l=="object"&&!Array.isArray(l)?l:{}}catch{return{}}}function s(o,i){!o||!o.removeItem||o.removeItem(i)}function d(o={}){let i=o.storage||localStorage,l={activeSection:e(i,c.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(i,c.activeMessageThreadId,""),searchQuery:e(i,c.searchQuery,""),workOrderSearchMode:e(i,c.workOrderSearchMode,"false")==="true",messageThreadFilter:e(i,c.messageThreadFilter,"all"),messageThreadsPage:n(i,c.messageThreadsPage),messageSearchQuery:e(i,c.messageSearchQuery,""),messageComposerWorkOrderId:e(i,c.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(i,c.managerDashboardUserId,""),managerDashboardMetric:e(i,c.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(i,c.myWorkFilter,"assigned"),workOrderFilter:e(i,c.workOrderFilter,"all"),workOrderAssigneeFilter:e(i,c.workOrderAssigneeFilter,""),workOrderTypeFilter:e(i,c.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(i,c.workOrderPriorityFilter,"all"),workSort:e(i,c.workSort,"newest"),workGroup:e(i,c.workGroup,"none"),requestViewFilter:e(i,c.requestViewFilter,"active"),workOrderPage:n(i,c.workOrderPage),partsPage:n(i,c.partsPage),assetsPage:n(i,c.assetsPage),financialPage:n(i,c.financialPage),financialMissingFilter:e(i,c.financialMissingFilter,"all"),financialLocationFilter:e(i,c.financialLocationFilter,"all"),financialTypeFilter:e(i,c.financialTypeFilter,"all"),financialAreaFilter:e(i,c.financialAreaFilter,"all"),requestsPage:n(i,c.requestsPage),planningOverduePage:n(i,c.planningOverduePage),planningTodayPage:n(i,c.planningTodayPage),planningSoonPage:n(i,c.planningSoonPage),planningNoDuePage:n(i,c.planningNoDuePage),planningFollowUpPage:n(i,c.planningFollowUpPage),planningPmPage:n(i,c.planningPmPage),planningGroupOpen:r(i,c.planningGroupOpen),schedulesPage:n(i,c.schedulesPage),proceduresPage:n(i,c.proceduresPage),membersPage:n(i,c.membersPage),assetStatusFilter:e(i,c.assetStatusFilter,"all"),assetTypeFilter:e(i,c.assetTypeFilter,"all"),assetAreaFilter:e(i,c.assetAreaFilter,"all"),partInventoryFilter:e(i,c.partInventoryFilter,"all"),partSort:e(i,c.partSort,"default"),partSearchQuery:e(i,c.partSearchQuery,"")};e(i,c.sectionSplitDone,"")!=="true"&&l.activeSection==="work"&&(l.activeSection="mywork",t(i,c.activeSection,l.activeSection),t(i,c.sectionSplitDone,"true")),l.activeSection==="performance"&&(l.activeSection="mywork",t(i,c.activeSection,l.activeSection));let u=(a,m,g)=>{l[a]=m,g&&t(i,g,m)},p=(a,m)=>{u(a,1,m)};return{getActiveSection:()=>l.activeSection,setActiveSection:a=>u("activeSection",a,c.activeSection),getActiveWorkOrderId:()=>l.activeWorkOrderId,setActiveWorkOrderId:a=>u("activeWorkOrderId",a),getActiveAssetId:()=>l.activeAssetId,setActiveAssetId:a=>u("activeAssetId",a),getActivePartId:()=>l.activePartId,setActivePartId:a=>u("activePartId",a),getActiveMessageThreadId:()=>l.activeMessageThreadId,setActiveMessageThreadId:a=>u("activeMessageThreadId",a,c.activeMessageThreadId),getMessageThreadFilter:()=>l.messageThreadFilter,setMessageThreadFilter:a=>u("messageThreadFilter",a,c.messageThreadFilter),getMessageThreadsPage:()=>l.messageThreadsPage,setMessageThreadsPage:a=>u("messageThreadsPage",a,c.messageThreadsPage),resetMessageThreadsPage:()=>p("messageThreadsPage",c.messageThreadsPage),getMessageSearchQuery:()=>l.messageSearchQuery,setMessageSearchQuery:a=>u("messageSearchQuery",a,c.messageSearchQuery),getMessageComposerWorkOrderId:()=>l.messageComposerWorkOrderId,setMessageComposerWorkOrderId:a=>u("messageComposerWorkOrderId",a,c.messageComposerWorkOrderId),getMessageComposerOpen:()=>l.messageComposerOpen,setMessageComposerOpen:a=>u("messageComposerOpen",!!a),getManagerDashboardUserId:()=>l.managerDashboardUserId,setManagerDashboardUserId:a=>u("managerDashboardUserId",a||"",c.managerDashboardUserId),getManagerDashboardMetric:()=>l.managerDashboardMetric,setManagerDashboardMetric:a=>u("managerDashboardMetric",a||"open",c.managerDashboardMetric),getSearchQuery:()=>l.searchQuery,setSearchQuery:a=>u("searchQuery",a,c.searchQuery),getWorkOrderSearchMode:()=>l.workOrderSearchMode,setWorkOrderSearchMode:a=>u("workOrderSearchMode",!!a,c.workOrderSearchMode),getActiveStatusFilter:()=>l.activeStatusFilter,setActiveStatusFilter:a=>u("activeStatusFilter",a),getMyWorkFilter:()=>l.myWorkFilter,setMyWorkFilter:a=>u("myWorkFilter",a,c.myWorkFilter),getWorkOrderFilter:()=>l.workOrderFilter,setWorkOrderFilter:a=>u("workOrderFilter",a,c.workOrderFilter),getWorkOrderAssigneeFilter:()=>l.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:a=>{u("workOrderAssigneeFilter",a),a?t(i,c.workOrderAssigneeFilter,a):s(i,c.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>l.workOrderTypeFilter,setWorkOrderTypeFilter:a=>u("workOrderTypeFilter",a||"all",c.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>l.workOrderPriorityFilter,setWorkOrderPriorityFilter:a=>u("workOrderPriorityFilter",a||"all",c.workOrderPriorityFilter),getWorkSort:()=>l.workSort,setWorkSort:a=>u("workSort",a,c.workSort),getWorkGroup:()=>l.workGroup,setWorkGroup:a=>u("workGroup",a||"none",c.workGroup),getRequestViewFilter:()=>l.requestViewFilter,setRequestViewFilter:a=>u("requestViewFilter",a,c.requestViewFilter),getWorkOrderPage:()=>l.workOrderPage,setWorkOrderPage:a=>u("workOrderPage",a,c.workOrderPage),resetWorkOrderPage:()=>p("workOrderPage",c.workOrderPage),getPartsPage:()=>l.partsPage,setPartsPage:a=>u("partsPage",a,c.partsPage),resetPartsPage:()=>p("partsPage",c.partsPage),getAssetsPage:()=>l.assetsPage,setAssetsPage:a=>u("assetsPage",a,c.assetsPage),resetAssetsPage:()=>p("assetsPage",c.assetsPage),getFinancialPage:()=>l.financialPage,setFinancialPage:a=>u("financialPage",a,c.financialPage),resetFinancialPage:()=>p("financialPage",c.financialPage),getFinancialMissingFilter:()=>l.financialMissingFilter,setFinancialMissingFilter:a=>u("financialMissingFilter",a||"all",c.financialMissingFilter),getFinancialLocationFilter:()=>l.financialLocationFilter,setFinancialLocationFilter:a=>u("financialLocationFilter",a||"all",c.financialLocationFilter),getFinancialTypeFilter:()=>l.financialTypeFilter,setFinancialTypeFilter:a=>u("financialTypeFilter",a||"all",c.financialTypeFilter),getFinancialAreaFilter:()=>l.financialAreaFilter,setFinancialAreaFilter:a=>u("financialAreaFilter",a||"all",c.financialAreaFilter),getRequestsPage:()=>l.requestsPage,setRequestsPage:a=>u("requestsPage",a,c.requestsPage),resetRequestsPage:()=>p("requestsPage",c.requestsPage),getPlanningPage:a=>a==="overdue"?l.planningOverduePage:a==="today"?l.planningTodayPage:a==="soon"?l.planningSoonPage:a==="no-due"?l.planningNoDuePage:a==="follow-up"?l.planningFollowUpPage:a==="pm"?l.planningPmPage:1,setPlanningPage:(a,m)=>{a==="overdue"&&u("planningOverduePage",m,c.planningOverduePage),a==="today"&&u("planningTodayPage",m,c.planningTodayPage),a==="soon"&&u("planningSoonPage",m,c.planningSoonPage),a==="no-due"&&u("planningNoDuePage",m,c.planningNoDuePage),a==="follow-up"&&u("planningFollowUpPage",m,c.planningFollowUpPage),a==="pm"&&u("planningPmPage",m,c.planningPmPage)},getPlanningGroupOpen:(a,m=!1)=>Object.prototype.hasOwnProperty.call(l.planningGroupOpen,a)?!!l.planningGroupOpen[a]:!!m,setPlanningGroupOpen:(a,m)=>{l.planningGroupOpen={...l.planningGroupOpen,[a]:!!m},t(i,c.planningGroupOpen,JSON.stringify(l.planningGroupOpen))},getSchedulesPage:()=>l.schedulesPage,setSchedulesPage:a=>u("schedulesPage",a,c.schedulesPage),resetSchedulesPage:()=>p("schedulesPage",c.schedulesPage),getProceduresPage:()=>l.proceduresPage,setProceduresPage:a=>u("proceduresPage",a,c.proceduresPage),resetProceduresPage:()=>p("proceduresPage",c.proceduresPage),getMembersPage:()=>l.membersPage,setMembersPage:a=>u("membersPage",a,c.membersPage),resetMembersPage:()=>p("membersPage",c.membersPage),getAssetStatusFilter:()=>l.assetStatusFilter,setAssetStatusFilter:a=>u("assetStatusFilter",a,c.assetStatusFilter),getAssetTypeFilter:()=>l.assetTypeFilter,setAssetTypeFilter:a=>u("assetTypeFilter",a,c.assetTypeFilter),getAssetAreaFilter:()=>l.assetAreaFilter,setAssetAreaFilter:a=>u("assetAreaFilter",a,c.assetAreaFilter),getPartInventoryFilter:()=>l.partInventoryFilter,setPartInventoryFilter:a=>u("partInventoryFilter",a,c.partInventoryFilter),getPartSort:()=>l.partSort,setPartSort:a=>u("partSort",a||"default",c.partSort),getPartSearchQuery:()=>l.partSearchQuery,setPartSearchQuery:a=>u("partSearchQuery",a,c.partSearchQuery),snapshot:()=>({...l})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:d},typeof Ie<"u"&&(Ie.exports={createWorkspaceUiState:d})})()});var Rt=U((Bn,be)=>{(function(){function c(r){return!!String(r?.production_action||"").trim()}function e(r){return c(r)&&r?.production_action_status==="open"}function n(r,s){return!r||!s?!1:r.assigned_to===s||e(r)&&r.production_action_assigned_to===s}function t(r){return e(r)?"Complete or remove the open Production Action before completing this work order.":""}window.MaintainOpsProductionAction=Object.freeze({hasProductionAction:c,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t}),typeof be<"u"&&be.exports&&(be.exports={hasProductionAction:c,hasOpenProductionAction:e,isWorkOrderAssignedToUser:n,productionActionCompletionMessage:t})})()});var Et=U((jn,we)=>{(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-production-action-control]").forEach(t=>{t.addEventListener("click",r=>r.stopPropagation())}),n.querySelectorAll("[data-production-action-dialog-open]").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();let s=n.getElementById(t.getAttribute("aria-controls"));!s||s.open||(typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))})}),n.querySelectorAll("[data-production-action-dialog-close]").forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();let s=t.closest("[data-production-action-dialog]");s&&(typeof s.close=="function"?s.close():s.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-dialog]").forEach(t=>{t.addEventListener("click",r=>{r.target===t&&(typeof t.close=="function"?t.close():t.removeAttribute("open"))})}),n.querySelectorAll("[data-production-action-form]").forEach(t=>{t.addEventListener("submit",e.saveProductionAction)}),n.querySelectorAll("[data-production-action-status]").forEach(t=>{t.addEventListener("click",e.setProductionActionStatus)}),n.querySelectorAll("[data-production-action-remove]").forEach(t=>{t.addEventListener("click",e.removeProductionAction)})}window.MaintainOpsWorkspaceProductionActionEvents={bindWorkspaceProductionActionEvents:c},typeof we<"u"&&we.exports&&(we.exports={bindWorkspaceProductionActionEvents:c})})()});var Ot=U((zn,Fe)=>{(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll(".work-card[data-id]").forEach(t=>{t.addEventListener("click",()=>{e.markWorkOrderNotificationsReadForOrder?.(t.dataset.id,{render:!1})})}),n.querySelectorAll("[data-open-work-notification]").forEach(t=>{t.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation(),t.disabled=!0,await e.openWorkOrderNotification?.(t.dataset.openWorkNotification,t.dataset.workOrderId)})})}window.MaintainOpsWorkspaceWorkOrderNotificationEvents={bindWorkspaceWorkOrderNotificationEvents:c},typeof Fe<"u"&&(Fe.exports={bindWorkspaceWorkOrderNotificationEvents:c})})()});var Wt=U((Hn,ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function r(i){return e.getActiveWorkOrderId()!==i?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(l=>l.checked)}function s(i){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(l=>{l.checked=i.target.checked})}async function d(i){i.preventDefault();let l=i.target,u=l.querySelector("button[type='submit']"),p=n.querySelector("#completion-error"),a=e.getActiveWorkOrderId(),m=e.getWorkOrderById(a),g=e.getProcedureById(m?.procedure_template_id),f=g?e.requiredChecklistProgress(m,g):{done:0,total:0},y=e.productionActionCompletionMessage?.(m)||"";if(y){p&&(p.textContent=y),e.setWorkOrderActionWarning(a,y),e.showNotice(y,"warning");return}if(f.done<f.total){p&&(p.textContent=`Complete required checklist steps first (${f.done}/${f.total}).`);return}let h=new t(l),b=h.get("safety_devices_checked")==="on"||r(a)||e.hasCompletedSafetyDeviceCheck(m);if(e.requiresSafetyDeviceCheck(m)&&!b){p&&(p.textContent="Check safety devices before completing equipment work.");return}u.disabled=!0,u.textContent="Completing...",p&&(p.textContent="");try{let w={status:"completed",asset_id:m?.asset_id||null,actual_minutes:Number(h.get("actual_minutes"))||0,failure_cause:h.get("failure_cause")||null,resolution_summary:h.get("resolution_summary")||null,follow_up_needed:h.get("follow_up_needed")==="on",completion_notes:h.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(w),e.applySafetyCheckPayload(w,w.safety_check_required&&b),delete w.asset_id;let{error:P}=await e.withOperationTimeout(e.updateWorkOrderSafely(w,a),"Complete work save timed out. Check your connection and try again.",2e4);if(P){p&&(p.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(P)}`);return}let $=await e.withOperationTimeout(e.recordWorkOrderEvent(a,"completed",h.get("resolution_summary")||h.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(R=>R);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order completed, but history did not update: ${$.message}`:"Work order completed.",$?"warning":"success"),await e.render()}catch(w){p?p.textContent=`Could not complete work order: ${w.message||w}`:e.alertRef(w.message||w)}finally{u.disabled=!1,u.textContent="Complete Work Order"}}function o(){let i=n.querySelector("#complete-work-order-form");i&&i.addEventListener("submit",d),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(l=>{l.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:o,completeWorkOrder:d,currentSafetyCheckboxCheckedForWorkOrder:r,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:c},typeof ve<"u"&&ve.exports&&(ve.exports={createWorkspaceWorkOrderCompletionEvents:c})})()});var xt=U((Gn,ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.URLRef||URL,r=e.BlobCtor||Blob,s=e.alertRef||alert,d=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,o=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:C=>String(C||"machine").replaceAll("_"," "),i=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:C=>String(C||"corrective").replaceAll("_"," "),l={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function u(C){return(e.getAssetDocumentsByAssetId?.()[C]||[]).filter(k=>String(k.content_type||"").startsWith("image/")||k.document_type==="machine_photo"||k.document_type==="nameplate")}function p(C){return u(C).map(k=>k.original_file_name||k.file_name||k.storage_path||k.id).filter(Boolean).join("; ")}function a(C,k){return C?.parent_asset_id&&k.get(C.parent_asset_id)?.name||""}function m(C){return e.getLocations?.().find(k=>k.id===C)?.name||""}function g(C){if(!C)return"";let k=e.getProfilesByUserId?.()[C];return k?.full_name||k?.email||C}function f(C){return String(m(C.location_id)||C.location_id||C.location||"")}function y(C){return{id:`financial:${C.id}`,financialRecord:C,name:C.archived_asset_name||"Deleted equipment",asset_type:C.archived_asset_type||"machine",asset_code:C.archived_asset_code||"",manufacturer:C.archived_manufacturer||"",model:C.archived_model||"",location_id:C.archived_location_id||"",location:C.archived_location||"",status:"deleted"}}function h(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(C=>!C.asset_id).map(y)]}function b(C,k,S){let _=f(C).localeCompare(f(k));if(_)return _;let M=(l[C.asset_type||"machine"]||999)-(l[k.asset_type||"machine"]||999);return M||String(a(C,S)).localeCompare(String(a(k,S)))||String(C.location||"").localeCompare(String(k.location||""))||String(C.name||"").localeCompare(String(k.name||""))}function w(){let C=e.getAssets().filter(d),k=new Map(C.map(S=>[S.id,S]));return[...C].sort((S,_)=>b(S,_,k)).map(S=>({equipment_type:o(S.asset_type),name:S.name,parent_equipment:a(S,k),serial_number:S.asset_code||"",manufacturer:S.manufacturer||"",model:S.model||"",picture_id:p(S.id),picture_count:u(S.id).length,picture_status:u(S.id).length?"attached":"missing",facility:m(S.location_id)||S.location_id||"",area_department:S.location||"",status:S.status}))}function P(){let C=h(),k=new Map(C.map(_=>[_.id,_])),S=e.getAssetFinancialsByAssetId?.()||{};return[...C].sort((_,M)=>b(_,M,k)).map(_=>{let M=_.financialRecord||S[_.id]||{};return{operational_status:_.financialRecord?"deleted":"active",equipment_type:o(_.asset_type),name:_.name,parent_equipment:a(_,k),facility:m(_.location_id)||_.location_id||"",area_department:_.location||"",serial_number:_.asset_code||"",manufacturer:_.manufacturer||"",model:_.model||"",picture_status:u(_.id).length?"attached":"missing",asset_tag:M.asset_tag||"",acquisition_date:M.acquisition_date||"",acquisition_cost:M.acquisition_cost||"",depreciation_method:M.depreciation_method||"",useful_life_years:M.useful_life_years||"",current_book_value:M.current_book_value||"",tax_jurisdiction:M.tax_jurisdiction||"",ownership_status:M.ownership_status||"",in_service_date:M.in_service_date||"",disposal_date:M.disposal_date||"",disposal_notes:M.disposal_notes||"",gl_account_code:M.gl_account_code||"",cost_center:M.cost_center||"",finance_notes:M.finance_notes||"",needs_review:!!M.needs_review,last_reviewed_at:M.last_reviewed_at||"",reviewed_by:g(M.reviewed_by)}})}function $(){let C={work:{filename:"work-orders.csv",rows:e.getWorkOrders().map(S=>({title:S.title,status:S.status,priority:S.priority,type:i(S.type),equipment:S.assets?.name||"",assigned_to:e.assignmentLabel(S),due_at:S.due_at||"",completed_at:S.completed_at||"",actual_minutes:S.actual_minutes||0,failure_cause:S.failure_cause||"",resolution_summary:S.resolution_summary||"",follow_up_needed:!!S.follow_up_needed}))},assets:{filename:"equipment.csv",rows:w()},financial:{filename:"equipment-financial.csv",rows:P()},requests:{filename:"maintenance-requests.csv",rows:e.getMaintenanceRequests().map(S=>({title:S.title,status:S.status,priority:S.priority,equipment:S.assets?.name||"",requested_by:e.getProfilesByUserId()[S.requested_by]?.full_name||"",created_at:S.created_at||"",converted_work_order_id:S.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(S=>({title:S.title,equipment:S.assets?.name||"",frequency:S.frequency,next_due_at:S.next_due_at,active:S.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(S=>({name:S.name,sku:S.sku||"",supplier_name:S.supplier_name||"",quantity_on_hand:S.quantity_on_hand,reorder_point:S.reorder_point,unit_cost:S.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(S=>({name:S.name,description:S.description||"",steps:S.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(S=>({user_id:S.user_id,name:e.getProfilesByUserId()[S.user_id]?.full_name||"",role:S.role}))}},k=C[e.getActiveSection()]||C.work;if(!k.rows.length)return s("Nothing to export in this section yet.");R(k.filename,k.rows)}function R(C,k){let S=Object.keys(k[0]),_=[S.join(","),...k.map(W=>S.map(v=>e.csvCell(W[v])).join(","))],M=new r([`\uFEFF${_.join(`
`)}`],{type:"text/csv;charset=utf-8"}),N=t.createObjectURL(M),D=n.createElement("a");D.href=N,D.download=C,n.body.appendChild(D),D.click(),D.remove(),t.revokeObjectURL(N)}return{downloadCsv:R,exportActiveSectionCsv:$}}typeof ke<"u"&&ke.exports&&(ke.exports={createCsvExportHelpers:c}),window.MaintainOpsCsvExport={createCsvExportHelpers:c}})()});var Mt=U((Vn,Le)=>{(function(){function c(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(r=>{r.addEventListener("click",()=>{let d=r.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');c(d)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:c},typeof Le<"u"&&(Le.exports={bindWorkspaceDatePickerControls:e,openDatePicker:c})})()});var Tt=U((Yn,Ne)=>{(function(){function c(e={}){let n=e.windowRef||window;function t(s){let d=String.fromCharCode(...s),o=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return o?o(d).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function r(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:r}}window.MaintainOpsPublicRequestTokens=c(),typeof Ne<"u"&&(Ne.exports={createPublicRequestTokenHelpers:c})})()});var Dt=U((Kn,Ue)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,r=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,d=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.createPublicRequestLink))}),typeof r=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(o=>{o.addEventListener("click",()=>r(o.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(o=>{o.addEventListener("click",()=>s(o.dataset.enablePublicRequestLink,!0))}),typeof d=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(o=>{o.addEventListener("click",()=>d(o.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:c},typeof Ue<"u"&&(Ue.exports={bindWorkspacePublicRequestLinkAdminEvents:c})})()});var It=U((Jn,Qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(r=>{r.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let d=r.querySelector?.("button[type='submit']");if(!d?.disabled){d&&(d.disabled=!0);try{let o=r.querySelector?.("[name='planning_due_at']");await t(r.dataset.planningDueForm,o?.value)}finally{d?.isConnected&&(d.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:c},typeof Qe<"u"&&(Qe.exports={bindWorkspacePlanningDueDateEvents:c})})()});var Ft=U((Zn,Be)=>{(function(){let c=new WeakSet;function e(r,s,d){if(!r)return;let o=r.querySelector("[data-equipment-choice-existing]"),i=r.querySelector("[data-equipment-choice-new]"),l=s==="new";r.querySelectorAll("[data-equipment-choice-mode]").forEach(u=>{let p=u.value===(l?"new":"existing");u.checked=p,u.closest("label")?.classList.toggle("active",p)}),r.querySelectorAll("[data-equipment-choice-panel]").forEach(u=>{u.hidden=u.dataset.equipmentChoicePanel!==(l?"new":"existing")}),o&&(o.disabled=l,o.required=!l&&o.dataset.equipmentChoiceRequired==="true",l&&(o.value=""),typeof d=="function"&&d(o)),i&&(i.disabled=!l,i.required=l&&i.dataset.equipmentChoiceRequired==="true",l||(i.value=""))}function n(r,s){r.querySelectorAll("[data-equipment-choice]").forEach(d=>{let o=d.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(d,o,s)})}function t(r={}){let s=r.documentRef||document,d=r.updateAssetLocationWarning;n(s,d),!c.has(s)&&(c.add(s),s.addEventListener("change",o=>{let i=o.target.closest?.("[data-equipment-choice-mode]");if(i){e(i.closest("[data-equipment-choice]"),i.value,d);return}let l=o.target.closest?.("[data-equipment-choice-existing]");l&&typeof d=="function"&&d(l)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Be<"u"&&(Be.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var Lt=U((Xn,je)=>{(function(){function c(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:r,createQuickFixAsset:s,getMaintenanceRequests:d,getQuickFixRequestId:o,getActiveCompanyId:i,getSession:l,getParts:u,getRequestsReady:p,getSupabaseClient:a,confirmAssetLocationRouting:m,assetRequiresSafety:g,blocksProcedureCompletion:f,setWorkOrderActionWarning:y,locationIdForAsset:h,descriptionWithRequestPhotoNote:b,descriptionWithAssignmentNote:w,assignedUserFromForm:P,procedureColumn:$,workOrderDateValue:R,applySafetyRequirementPayload:C,applySafetyCheckPayload:k,insertWithOptionalProcedure:S,friendlyWorkOrderSaveError:_,addPartUsageToWorkOrder:M,addPhotoToWorkOrder:N,updateAssetStatus:D,recordWorkOrderEvent:W,setActiveWorkOrderIdState:v,setActiveAssetIdState:A,setCreateWorkOrderMode:E,setQuickFixMode:O,setQuickFixAssetId:q,setQuickFixRequestId:L,showNotice:I,render:j,alertUser:G=re=>window.alert(re)}=e;async function H(re){re.preventDefault();let B=re.currentTarget,V=n.querySelector("#quick-fix-error"),oe=B.querySelector("button[type='submit']");V&&(V.textContent=""),oe&&(oe.disabled=!0,oe.textContent="Saving...");try{let Y=new t(B),fe=String(Y.get("title")||"").trim();if(!fe)throw new Error("Quick Fix issue is required.");let le=o(),T=i(),z=l(),K=String(Y.get("description")||"").trim(),X=String(Y.get("resolution_summary")||"").trim(),ee=X||fe,Z=K||fe,J=Y.get("mark_completed")==="on",ae=Y.get("machine_down")==="on",te=Y.get("asset_id")||null,de=le?d().find(ce=>ce.id===le):null,ie=String(Y.get("new_asset_name")||"").trim();if(te&&ie)throw new Error("Choose existing equipment or create new equipment, not both.");if(ie){let{data:ce,error:me}=await r(s(ie,ae?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(me){V&&(V.textContent=me.message);return}te=ce.id}if(!ie&&!m(te,"logging this Quick Fix",V))return;if(J&&g(te)&&Y.get("safety_devices_checked")!=="on"){V&&(V.textContent="Check safety devices before marking equipment work complete.");return}let F=J?f(null,Y.get("procedure_template_id")||null):"";if(F){y("",""),V&&(V.textContent=`${F} Log it first, then complete the checklist before marking it complete.`);return}let pe={company_id:T,location_id:h(te),title:fe,description:b(w(Z,Y.get("assigned_to")),de),asset_id:te,assigned_to:P(Y,z.user.id),priority:Y.get("priority")||"medium",type:Y.get("type")||"corrective",status:J?"completed":"open",due_at:R(Y.get("due_at")),created_by:z.user.id,...$(Y.get("procedure_template_id")),actual_minutes:0,failure_cause:Y.get("failure_cause")||null,resolution_summary:J?ee:X||null,follow_up_needed:Y.get("follow_up_needed")==="on",completion_notes:J?ee:null,completed_at:J?new Date().toISOString():null};C(pe),k(pe,J&&pe.safety_check_required&&Y.get("safety_devices_checked")==="on");let{data:he,error:ue}=await r(S("work_orders",pe,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(ue){V&&(V.textContent=`Could not log quick fix: ${_(ue)}`);return}let x=[],se=Y.get("part_id"),ne=Number(Y.get("quantity_used"))||1;if(se){let ce=u().find(Me=>Me.id===se),me=await r(M(he.id,ce,ne),"Part usage save timed out.",12e3).catch(Me=>Me);me&&x.push(`part usage failed: ${me.message}`)}let ge=Y.get("photo");if(ge&&ge.name){let ce=await r(N(he.id,ge),"Photo upload timed out.",25e3).catch(me=>me);ce&&x.push(`photo upload failed: ${ce.message}`)}let ye=ae?"offline":Y.get("asset_status");if(pe.asset_id&&!ie&&(ae||J&&ye)){let ce=await r(D(pe.asset_id,ye),"Equipment status update timed out.",12e3).catch(me=>me);ce?x.push(`equipment status did not update: ${ce.message}`):await r(W(he.id,"asset_status_updated",ae?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(me=>x.push(`history did not update: ${me.message}`))}if(await r(W(he.id,"quick_fix",J?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(ce=>x.push(`history did not update: ${ce.message}`)),ie&&await r(W(he.id,"equipment_created",`Equipment created from Quick Fix: ${ie}.`),"Activity log timed out.",8e3).catch(ce=>x.push(`history did not update: ${ce.message}`)),le&&p()){let ce=await r(a().from("maintenance_requests").update({status:"converted",reviewed_by:z.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:he.id}).eq("id",le).eq("company_id",T),"Request status update timed out.",12e3).catch(me=>({error:me}));ce.error?x.push(`request status did not update: ${ce.error.message}`):await r(W(he.id,"request_quick_fixed",J?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(me=>x.push(`history did not update: ${me.message}`))}v(he.id),A(null),E(!1),O(!1),q(null),L(null),I(x.length?`Quick Fix saved with warning: ${x[0]}`:"Quick Fix saved.",x.length?"warning":"success"),await j()}catch(Y){V?V.textContent=`Could not log quick fix: ${Y.message||Y}`:G(Y.message||Y)}finally{oe&&oe.isConnected&&(oe.disabled=!1,oe.textContent="Log Quick Fix")}}return{createQuickFix:H}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:c},typeof je<"u"&&(je.exports={createQuickFixWorkflow:c})})()});var Nt=U((er,ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=new Map,s=new Map,d=new Set;async function o(h,b){let w=await e.withOperationTimeout(e.supabaseClient().from(h).insert(b).select("*").single(),"Message save timed out. Your draft is kept; retry to check the same send.",15e3);return w.error?.code==="23505"&&(w=await e.withOperationTimeout(e.supabaseClient().from(h).select("*").eq("id",b.id).eq("company_id",b.company_id).single(),"Could not verify the previous send.",15e3)),w}function i(h,b){return h==="direct"?[e.getSession().user.id,b].filter(Boolean):e.getCompanyMembers().map(w=>w.user_id)}function l(){let h=n.querySelector("#message-thread-form");h&&h.addEventListener("submit",u);let b=n.querySelector("#message-reply-form");b&&b.addEventListener("submit",p),n.querySelectorAll("[data-delete-message]").forEach(w=>{w.addEventListener("click",a)}),n.querySelectorAll("[data-delete-message-thread]").forEach(w=>{w.addEventListener("click",m)})}async function u(h){h.preventDefault();let b=h.currentTarget;if(d.has("composer"))return;let w=n.querySelector("#message-thread-error"),P=b.querySelector("button[type='submit']"),$=new t(b);if(w&&(w.textContent=""),!e.getMessagesReady()){w&&(w.textContent="Messages are unavailable. Try again after reconnecting.");return}let R=$.get("thread_type"),C=$.get("direct_user_id"),k=i(R,C),S=String($.get("title")||"").trim(),_=String($.get("body")||"").trim();if(R==="company"){w&&(w.textContent="Company-wide broadcast threads are disabled. Choose location or direct.");return}if(R==="direct"&&!C){w&&(w.textContent="Choose a teammate for a direct message.");return}if(!S||!_){w&&(w.textContent="Add a subject and message before starting the thread.");return}k.includes(e.getSession().user.id)||k.push(e.getSession().user.id);let M=e.getActiveCompanyId(),N=e.getSession().user.id,D=$.get("work_order_id")||null,W=R==="location"?e.activeLocationDatabaseId():null,v=JSON.stringify([M,N,R,C,S,_,D,W]),A=r.get(v)||{id:crypto.randomUUID()};r.set(v,A),d.add("composer"),P&&(P.disabled=!0,P.textContent="Starting...");let E=!1;try{let O={id:A.id,company_id:M,location_id:W,thread_type:R,title:S,created_by:N};D&&e.getMessageWorkOrderLinksReady()&&(O.work_order_id=D);let{data:q,error:L}=A.thread?{data:A.thread}:await o("message_threads",O);if(L)throw e.isMissingColumnError(L,"work_order_id")&&e.setMessageWorkOrderLinksReady(!1),L;A.thread=q;let I=[...new Set(k)].map(H=>({company_id:M,thread_id:q.id,user_id:H})),{error:j}=A.membersSaved?{}:await e.withOperationTimeout(e.supabaseClient().from("message_thread_members").insert(I),"Message member save timed out. Check your connection and try again.",15e3);if(j){if(j.code!=="23505")throw j;let H=await e.withOperationTimeout(e.supabaseClient().from("message_thread_members").select("user_id").eq("company_id",M).eq("thread_id",q.id),"Could not verify conversation members.",15e3);if(H.error||!k.every(re=>H.data?.some(B=>B.user_id===re)))throw j}A.membersSaved=!0;let{error:G}=await f(q.id,_,M,N);if(G)throw G;if(r.delete(v),E=!0,M!==e.getActiveCompanyId()||N!==e.getSession()?.user.id)return;e.clearDraft?.("composer"),e.setActiveMessageThreadId(q.id),e.setMessageComposerWorkOrderId(""),e.setMessageComposerOpen(!1),await g(q.id),e.showNotice("Thread started."),await e.render()}catch(O){w&&(w.textContent=y(O))}finally{d.delete("composer"),!E&&P?.isConnected&&(P.disabled=!1,P.textContent="Start Thread")}}async function p(h){h.preventDefault();let b=h.currentTarget,w=b.dataset.threadId;if(d.has(w))return;let P=n.querySelector("#message-reply-error"),$=b.querySelector("button[type='submit']"),R=String(new t(b).get("body")||"").trim();if(!R)return;d.add(w);let C=e.getActiveCompanyId(),k=e.getSession().user.id;P&&(P.textContent=""),$&&($.disabled=!0,$.textContent="Sending...");let S=!1;try{let{error:_}=await f(w,R,C,k);if(_)throw _;if(S=!0,C!==e.getActiveCompanyId()||k!==e.getSession()?.user.id)return;e.clearDraft?.(w),e.showNotice("Message sent."),await g(w),await e.render();let M=n.querySelector(".message-list");M&&n.querySelector(".message-center")?.dataset.threadId===w&&(M.scrollTop=M.scrollHeight)}catch(_){P&&(P.textContent=y(_))}finally{d.delete(w),!S&&$?.isConnected&&($.disabled=!1,$.textContent="Send Reply")}}async function a(h){let b=h.currentTarget,w=b?.dataset?.deleteMessage;if(w&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this message for everyone in the conversation? Admins can still review the saved transcript."))){b.disabled=!0,b.textContent="Deleting...";try{let P=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message",{target_message_id:w}),"Message delete timed out. Check your connection and try again.",1e4);if(P.error)throw P.error;e.showNotice("Message deleted."),await e.render()}catch(P){e.showNotice(y(P),"warning"),b.isConnected&&(b.disabled=!1,b.textContent="Delete")}}}async function m(h){let b=h.currentTarget,w=b?.dataset?.deleteMessageThread;if(w&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Hide this conversation from your inbox, including future replies? Other participants keep their copy."))){b.disabled=!0,b.textContent="Hiding...";try{let P=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message_thread",{target_thread_id:w}),"Message thread delete timed out. Check your connection and try again.",1e4);if(P.error)throw P.error;e.setActiveMessageThreadId(""),e.showNotice("Conversation hidden from your inbox."),await e.render()}catch(P){e.showNotice(y(P),"warning"),b.isConnected&&(b.disabled=!1,b.textContent="Hide conversation")}}}async function g(h){if(!e.getMessagesReady()||!h)return;let b=e.getLatestReadTime?e.getLatestReadTime(h):new Date().toISOString();if(!b)return;let w={company_id:e.getActiveCompanyId(),thread_id:h,user_id:e.getSession().user.id,last_read_at:b},{error:P}=await e.withOperationTimeout(e.supabaseClient().from("message_reads").upsert(w,{onConflict:"thread_id,user_id"}),"Message read marker timed out.",8e3).catch($=>({error:$}));P?e.warn("Could not mark message thread read",P):w.company_id===e.getActiveCompanyId()&&w.user_id===e.getSession()?.user.id&&e.setMessageThreadRead(h,w)}async function f(h,b,w=e.getActiveCompanyId(),P=e.getSession().user.id){let $=JSON.stringify([w,P,h,b]),R=s.get($)||crypto.randomUUID();s.set($,R);let C=await o("messages",{id:R,company_id:w,thread_id:h,sender_id:P,body:b});if(C.error)return{error:C.error};s.delete($);let k=await e.withOperationTimeout(e.supabaseClient().from("message_threads").update({updated_at:new Date().toISOString()}).eq("id",h).eq("company_id",w),"Message thread timestamp save timed out.",8e3).catch(S=>({error:S}));return k.error&&e.warn("Message sent; thread timestamp could not be updated",k.error),{error:null}}function y(h){let b=e.messageCenterErrorState(h);return b.messagesReady===!1&&e.setMessagesReady(!1),b.message}return{bindMessageWorkflowEvents:l,createMessageThread:u,sendThreadReply:p,deleteOwnMessage:a,deleteMessageThread:m,markMessageThreadRead:g,insertThreadMessage:f,friendlyMessageCenterError:y,messageThreadMembersForType:i}}window.MaintainOpsMessageWorkflow={createMessageWorkflow:c},typeof ze<"u"&&(ze.exports={createMessageWorkflow:c})})()});var Ut=U((tr,He)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let u=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),p=n.querySelector("#create-pm-form");p&&!u.includes(p)&&u.push(p),u.forEach(a=>a.addEventListener("submit",d))}async function d(u){u.preventDefault();let p=u.currentTarget,a=p.querySelector("button[type='submit']"),m=p.querySelector("[data-pm-error]")||n.querySelector("#pm-error");m&&(m.textContent=""),a&&(a.disabled=!0,a.textContent="Adding...");try{let g=new t(p);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",m))return;let{error:f}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(f)throw f;e.showNotice("PM schedule added."),await e.render()}catch(g){m?m.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{a&&(a.disabled=!1,a.textContent="Add Schedule")}}function o(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(p=>p.id===u)&&(e.setPendingDeleteScheduleId(u),e.renderWorkspace())}async function i(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(m=>m.id===u))return;let a=n.querySelector(`[data-confirm-delete-schedule="${r.escape(u)}"]`);a&&(a.disabled=!0,a.textContent="Deleting...");try{let{data:m,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!m?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let f=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(f.error)throw new Error(`PM schedule delete verification failed: ${f.error.message}`);if(f.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(m){e.showNotice(m.message||"Could not delete PM schedule.","warning"),a&&(a.disabled=!1,a.textContent="Permanently Delete")}}async function l(u){let p=e.getPreventiveSchedules().find(m=>m.id===u);if(!p)return;let a=n.querySelector(`[data-generate-pm="${r.escape(u)}"]`);a&&(a.disabled=!0,a.textContent="Generating...");try{let m={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(p.asset_id),asset_id:p.asset_id,title:p.title,description:`Generated from preventive schedule: ${p.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:p.next_due_at,...e.procedureColumn(p.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(m),e.applySafetyCheckPayload(m,!1);let{data:g,error:f}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",m,{returnSingle:!0}),"PM work order generation timed out.");if(f)throw f;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let y="";try{let h=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(p.next_due_at,p.frequency)}).eq("id",p.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");h.error&&(y=h.error.message)}catch(h){y=h.message||String(h)}e.showNotice(y?`PM work generated, but next due date did not update: ${y}`:"PM work order generated.",y?"warning":"success"),await e.render()}catch(m){e.showNotice(`Could not generate PM work: ${m.message||m}`,"warning"),a&&(a.disabled=!1,a.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:d,requestDeletePreventiveSchedule:o,deletePreventiveSchedule:i,generatePreventiveWorkOrder:l}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:c},typeof He<"u"&&(He.exports={createPreventiveMaintenanceWorkflow:c})})()});var Qt=U((nr,Ge)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let m=n.querySelector("#create-procedure-form");m&&m.addEventListener("submit",d);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",o),n.querySelectorAll("[data-add-step]").forEach(f=>{f.addEventListener("submit",i)})}async function d(m){m.preventDefault();let g=m.currentTarget,f=g.querySelector("button[type='submit']"),y=n.querySelector("#procedure-error");y&&(y.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let h=new t(g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(h.get("name"),"Procedure checklist name"),description:String(h.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(b)throw b;e.showNotice("Procedure checklist added."),await e.render()}catch(h){y?y.textContent=h.message||"Could not add procedure.":e.alertUser(h.message||h)}finally{f&&(f.disabled=!1,f.textContent="Add Checklist")}}async function o(){let m=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(f=>f.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}m&&(m.disabled=!0,m.textContent="Adding sample...");try{let{data:f,error:y}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(y)throw y;let h=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(w=>({...w,company_id:e.getActiveCompanyId(),procedure_template_id:f.id})),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(h),"Sample procedure steps save timed out.");if(b)throw b;e.showNotice("Sample procedure checklist added."),await e.render()}catch(f){e.showNotice(`Could not add sample procedure: ${f.message||f}`,"warning")}finally{m&&(m.disabled=!1,m.textContent="Add sample inspection checklist")}}async function i(m){m.preventDefault();let g=m.currentTarget,f=g.querySelector("button[type='submit']"),y=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);y&&(y.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let h=new t(g),w=(e.getProcedureTemplates().find($=>$.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:P}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:w,prompt:e.requiredText(h.get("prompt"),"Procedure checklist step"),response_type:h.get("response_type"),required:h.get("required")==="true"}),"Procedure step save timed out.");if(P)throw P;e.showNotice("Procedure checklist step added."),await e.render()}catch(h){y?y.textContent=h.message||"Could not add procedure step.":e.alertUser(h.message||h)}finally{f&&(f.disabled=!1,f.textContent="Add Step")}}async function l(m){let[g,f]=await Promise.all([u("work_orders",m),u("preventive_schedules",m)]);return{workOrders:g,schedules:f}}async function u(m,g){let{count:f,error:y}=await e.withOperationTimeout(e.supabaseClient().from(m).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${m}.`,15e3);if(y)throw new Error(`Could not verify linked ${m.replaceAll("_"," ")} before deleting procedure: ${y.message}`);return f||0}async function p(m){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(f=>f.id===m))return;let g=n.querySelector(`[data-procedure-delete-error="${r.escape(m)}"]`);g&&(g.textContent="");try{let f=await l(m),y=e.procedureDeleteBlockerMessage(f);if(y){g&&(g.textContent=y);return}e.setPendingDeleteProcedureId(m),e.renderWorkspace()}catch(f){g?g.textContent=f.message||"Could not verify procedure links before delete.":e.showNotice(f.message||"Could not verify procedure links before delete.","warning")}}async function a(m){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(h=>h.id===m))return;let f=n.querySelector(`[data-confirm-delete-procedure="${r.escape(m)}"]`),y=n.querySelector(`[data-procedure-delete-error="${r.escape(m)}"]`);y&&(y.textContent=""),f&&(f.disabled=!0,f.textContent="Deleting...");try{let h=await l(m),b=e.procedureDeleteBlockerMessage(h);if(b)throw new Error(b);let{data:w,error:P}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",m).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(P)throw P;if(!w?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let $=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",m).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if($.error)throw new Error(`Procedure checklist delete verification failed: ${$.error.message}`);if($.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(h){let b=h.message||"Could not delete procedure.";e.showNotice(b,"warning"),y&&(y.textContent=b),f&&(f.disabled=!1,f.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:d,seedSampleProcedure:o,createProcedureStep:i,loadProcedureDeleteBlockers:l,countProcedureLinkedRows:u,requestDeleteProcedureTemplate:p,deleteProcedureTemplate:a}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:c},typeof Ge<"u"&&(Ge.exports={createProcedureWorkflow:c})})()});var Bt=U((rr,Ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let f=n.querySelector("#add-member-form");f&&f.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach($=>{$.addEventListener("submit",d)});let y=n.querySelector("#profile-form");y&&y.addEventListener("submit",o);let h=n.querySelector("#password-change-form");h&&h.addEventListener("submit",u);let b=n.querySelector("#team-invite-form");b&&b.addEventListener("submit",i);let w=n.querySelector("#team-invite-link-form");w&&w.addEventListener("submit",p),n.querySelectorAll("[data-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId($.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>a($.dataset.confirmRevokeInviteLink))});let P=n.querySelector("#request-notification-recipient-form");P&&P.addEventListener("submit",m),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach($=>{$.addEventListener("click",()=>g($.dataset.deleteRequestNotificationRecipient))})}async function s(f){f.preventDefault();let y=f.currentTarget,h=new t(y),b=String(h.get("role")||"technician").trim().toLowerCase(),w=y.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&b!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}w&&(w.disabled=!0,w.textContent="Adding...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:h.get("user_id"),role:b}),"Team member save timed out.");if(P)throw P;await e.render()}catch(P){e.alertUser(P.message||P)}finally{w?.isConnected&&(w.disabled=!1,w.textContent="Add Member")}}async function d(f){f.preventDefault();let y=f.currentTarget,h=new t(y),b=String(h.get("role")||"").trim().toLowerCase(),w=y.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}w&&(w.disabled=!0,w.textContent="Saving...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:y.dataset.memberRole,new_role:b}),"Role save timed out. Check your connection and try again.",15e3);if(P)throw new Error(P.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":P.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(P){e.showNotice(`Could not save role: ${P.message||P}`,"warning")}finally{w&&(w.disabled=!1,w.textContent="Save Role")}}async function o(f){f.preventDefault();let y=f.currentTarget,h=n.querySelector("#profile-error"),b=y.querySelector("button[type='submit']"),w=new t(y),P=String(w.get("full_name")||"").trim(),$=y.querySelector('input[name="mobile_tech"]'),R=$?$.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;h&&(h.textContent=""),b&&(b.disabled=!0,b.textContent="Saving...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:P,mobile_tech:R},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(C)throw e.isMissingColumnError(C,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):C;e.showNotice("Profile saved."),await e.render()}catch(C){h&&(h.textContent=C.message||"Could not save profile.")}finally{b&&(b.disabled=!1,b.textContent="Save Profile")}}async function i(f){f.preventDefault();let y=f.currentTarget,h=n.querySelector("#team-invite-error"),b=y.querySelector("button[type='submit']"),w=new t(y),P=String(w.get("role")||"technician").trim().toLowerCase();if(h&&(h.textContent=""),!e.getTeamInvitesReady()){h&&(h.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&P!=="technician"){h&&(h.textContent="Only admins can invite managers or admins.");return}b&&(b.disabled=!0,b.textContent="Inviting...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(w.get("email")||"").trim(),invite_role:P,invite_default_location_id:w.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite")||e.isColumnSchemaError($,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):$;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch($){h&&(h.textContent=$.message||"Could not create invite.")}finally{b&&(b.disabled=!1,b.textContent="Create Invite")}}async function l(f){if(!(!f||!e.getActiveCompanyId()))try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:f}),"Invite cancel timed out. Check your connection and try again.",15e3);if(y)throw y.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):y;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(y){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(y.message||"Could not cancel invite."),e.renderWorkspace()}}async function u(f){f.preventDefault();let y=f.currentTarget,h=n.querySelector("#password-change-error"),b=y.querySelector("button[type='submit']"),w=new t(y),P=String(w.get("password")||""),$=String(w.get("confirmPassword")||"");if(h&&(h.textContent=""),P.length<8){h&&(h.textContent="Password must be at least 8 characters.");return}if(P!==$){h&&(h.textContent="Passwords do not match.");return}b&&(b.disabled=!0,b.textContent="Updating...");try{let{error:R}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:P}),"Password update timed out. Check your connection and try again.",15e3);if(R)throw R;typeof y.reset=="function"&&y.reset(),e.showNotice("Password updated.")}catch(R){h&&(h.textContent=R.message||"Could not update password.")}finally{b&&(b.disabled=!1,b.textContent="Update Password")}}async function p(f){f.preventDefault();let y=f.currentTarget,h=n.querySelector("#team-invite-link-error"),b=y.querySelector("button[type='submit']"),w=new t(y),P=String(w.get("role")||"technician").trim().toLowerCase();if(h&&(h.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let $="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError($),h&&(h.textContent=$);return}if(P==="admin"){let $="Admin join links are not allowed.";e.setTeamInviteLinkError($),h&&(h.textContent=$);return}if(!e.canAdministerTeamRoles?.()&&P!=="technician"){let $="Managers can only create technician join links.";e.setTeamInviteLinkError($),h&&(h.textContent=$);return}b&&(b.disabled=!0,b.textContent="Creating...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:P,link_location_id:w.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite_link")||e.isColumnSchemaError($,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):$;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch($){let R=$.message||"Could not create join link.";e.setTeamInviteLinkError(R),h&&(h.textContent=R)}finally{b&&(b.disabled=!1,b.textContent="Create Join Link")}}async function a(f){if(!(!f||!e.getActiveCompanyId()))try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:f}),"Join link revoke timed out. Check your connection and try again.",15e3);if(y)throw y.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(y,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):y;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(y){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(y.message||"Could not revoke join link."),e.renderWorkspace()}}async function m(f){f.preventDefault();let y=f.currentTarget,h=n.querySelector("#request-notification-recipient-error"),b=y.querySelector("button[type='submit']"),w=new t(y);if(h&&(h.textContent=""),!e.canAdministerTeamRoles?.()){let P="Only admins can change request email routing.";e.setRequestNotificationRecipientError(P),h&&(h.textContent=P);return}if(!e.getRequestNotificationRecipientsReady()){h&&(h.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}b&&(b.disabled=!0,b.textContent="Adding...");try{let P=String(w.get("email")||"").trim().toLowerCase(),{error:$}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:w.get("location_id")||null,email:P,label:String(w.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if($)throw e.isColumnSchemaError($,["request_notification_recipients"])||$.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):$;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(P){let $=P.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError($),h&&(h.textContent=$)}finally{b&&(b.disabled=!1,b.textContent="Add Recipient")}}async function g(f){if(!(!f||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",f),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(y)throw e.isColumnSchemaError(y,["request_notification_recipients"])||y.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):y;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(y){e.setRequestNotificationRecipientError(y.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:r,addCompanyMember:s,updateCompanyMemberRole:d,updateMyProfile:o,updateMyPassword:u,createTeamInvite:i,cancelTeamInvite:l,createTeamInviteLink:p,revokeTeamInviteLink:a,createRequestNotificationRecipient:m,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:c},typeof Ve<"u"&&(Ve.exports={createTeamWorkflow:c})})()});var jt=U((ar,Ye)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let i=n.querySelector("#company-settings-form");i&&i.addEventListener("submit",s);let l=n.querySelector("#location-form");l&&l.addEventListener("submit",d);let u=n.querySelector("#public-app-url-form");u&&u.addEventListener("submit",o)}async function s(i){i.preventDefault();let l=i.currentTarget,u=l.querySelector("button[type='submit']"),p=new t(l);u&&(u.disabled=!0,u.textContent="Saving...");try{let{error:a}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(p.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(a)throw a;e.showNotice("Company saved."),await e.render()}catch(a){e.showNotice(`Could not save company: ${a.message||a}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Save Company")}}async function d(i){i.preventDefault();let l=i.currentTarget,u=n.querySelector("#location-error"),p=l.querySelector("button[type='submit']"),a=String(new t(l).get("name")||"").trim();if(a){u&&(u.textContent=""),p&&(p.disabled=!0,p.textContent="Adding...");try{let{data:m,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),a),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(m.id),e.persistActiveLocationId(m.id),e.showNotice("Location added."),await e.render()}catch(m){u&&(u.textContent=m.message||"Could not add location.")}finally{p&&(p.disabled=!1,p.textContent="Add Location")}}}function o(i){i.preventDefault();let l=n.querySelector("#public-request-link-error"),u=String(new t(i.currentTarget).get("public_app_url")||"").trim();if(l&&(l.textContent=""),!u){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let p=e.normalizePublicAppUrl(u);if(!p){l&&(l.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(p),e.storage.setItem("maintainops.publicAppUrl",p),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:r,updateCompanySettings:s,createLocation:d,savePublicAppUrl:o}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:c},typeof Ye<"u"&&(Ye.exports={createCompanySettingsWorkflow:c})})()});var zt=U((or,Ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.FormDataCtor||FormData,s=e.confirmUser||(a=>t.confirm(a));function d(){let a=n.querySelector("#app-issue-report-form");a&&a.addEventListener("submit",l),n.querySelectorAll("[data-app-issue-status]").forEach(m=>{m.addEventListener("submit",u)}),n.querySelectorAll("[data-delete-app-issue]").forEach(m=>{m.addEventListener("click",p)})}async function o(){let{data:a,error:m}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!m),e.setAppIssueReports(m?[]:a||[]),m)throw m}function i(a){let m=e.appIssueReportErrorState(a);return m.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),m.message}async function l(a){a.preventDefault();let m=a.currentTarget,g=n.querySelector("#app-issue-report-error"),f=m.querySelector("button[type='submit']"),y=new r(m);g&&(g.textContent=""),f&&(f.disabled=!0,f.textContent="Sending...");try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(y.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(y.get("severity")||"normal"),title:e.requiredText(y.get("title"),"Short title").slice(0,140),details:e.requiredText(y.get("details"),"Details"),status:"open"},{error:b}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),h),"App issue report save timed out. Check your connection and try again.",15e3);if(b)throw b;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await o(),e.renderWorkspace()}catch(h){g&&(g.textContent=i(h))}finally{f?.isConnected&&(f.disabled=!1,f.textContent="Send Report")}}async function u(a){if(a.preventDefault(),!e.canManageTeam())return;let m=a.currentTarget,g=m.querySelector("button[type='submit']"),f=new r(m);g&&(g.disabled=!0,g.textContent="Saving...");try{let y=String(f.get("status")||"open"),{error:h}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),m.dataset.appIssueStatus,y),"Issue report status save timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report updated."),await o(),e.renderWorkspace()}catch(y){e.showNotice(`Could not update issue report: ${i(y)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function p(a){if(a.preventDefault(),!e.canManageTeam())return;let m=a.currentTarget,g=m.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;m.disabled=!0;let f=m.textContent;m.textContent="Deleting...";try{let{error:y}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report deleted."),await o(),e.renderWorkspace()}catch(y){e.showNotice(`Could not delete issue report: ${i(y)}`,"warning")}finally{m?.isConnected&&(m.disabled=!1,m.textContent=f||"Delete")}}return{bindAppIssueWorkflowEvents:d,reloadAppIssueReports:o,appIssueReportError:i,createAppIssueReport:l,updateAppIssueReportStatus:u,deleteAppIssueReport:p}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:c},typeof Ke<"u"&&(Ke.exports={createAppIssueWorkflow:c})})()});var Ht=U((ir,Je)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.CSSRef||CSS;async function s(u){let p=n.querySelector("#public-request-link-error"),a=n.querySelector(`[data-create-public-request-link="${r.escape(u)}"]`);p&&(p.textContent=""),a&&(a.disabled=!0,a.textContent="Creating...");try{let{error:m}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:u}),"QR link save timed out. Check your connection and try again.",15e3);if(m)throw e.setPublicRequestLinksReady(!1),new Error(m.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":m.message);e.showNotice("Location request QR link ready."),await e.render()}catch(m){p&&(p.textContent=m.message||"Could not create QR request link.")}finally{a&&(a.disabled=!1,a.textContent="Create QR Link")}}async function d(u){if(!e.canAdministerPublicRequestLinks()){let a=n.querySelector("#public-request-link-error");a&&(a.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await o(u,!1)}async function o(u,p){if(!e.canAdministerPublicRequestLinks()){let a=n.querySelector("#public-request-link-error");a&&(a.textContent="Only admins can reactivate or disable posted QR request links.");return}await l(u,{is_active:!!p},p?"Request link reactivated.":"Request link disabled.")}async function i(u){if(!e.canAdministerPublicRequestLinks()){let a=n.querySelector("#public-request-link-error");a&&(a.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await l(u,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function l(u,p,a){let m=n.querySelector("#public-request-link-error");if(m&&(m.textContent=""),!e.canAdministerPublicRequestLinks()){m&&(m.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!u||!e.getActiveCompanyId()){m&&(m.textContent="Select a company before updating request links.");return}try{let{data:g,error:f}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...p,updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(f){m&&(m.textContent=f.message);return}if(!g?.length){m&&(m.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(a),await e.render()}catch(g){m&&(m.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:d,setPublicRequestLinkActive:o,regeneratePublicRequestLink:i,updatePublicRequestLink:l}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:c},typeof Je<"u"&&(Je.exports={createPublicRequestLinkWorkflow:c})})()});var Gt=U((sr,Ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let u=n.querySelector("#create-part-form");u&&u.addEventListener("submit",s),n.querySelectorAll("[data-restock-part]").forEach(p=>{p.addEventListener("submit",d)}),n.querySelectorAll("[data-use-part]").forEach(p=>{p.addEventListener("submit",o)}),n.querySelectorAll("[data-edit-part]").forEach(p=>{p.addEventListener("submit",i)}),n.querySelectorAll("[data-rename-part-source]").forEach(p=>{p.addEventListener("submit",l)})}async function s(u){u.preventDefault();let p=u.currentTarget,a=n.querySelector("#part-create-error"),m=p.querySelector("button[type='submit']"),g=new t(p);a&&(a.textContent=""),m&&(m.disabled=!0,m.textContent="Adding...");let f;try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!y.company_id)throw new Error("Choose a company before adding parts.");if(!y.name)throw new Error("Part name is required.");let h=new Promise((P,$)=>{f=setTimeout(()=>$(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:b,error:w}=await Promise.race([e.supabaseClient().from("parts").insert(y).select("id").single(),h]);if(clearTimeout(f),w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(w&&e.isMissingColumnError(w,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(w&&e.isMissingColumnError(w,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(w&&e.isMissingColumnError(w,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(w)throw w;e.setActivePartId(b?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),p.reset(),await e.render()}catch(y){a&&(a.textContent=y.message||"Could not add part.")}finally{f&&clearTimeout(f),m&&m.isConnected&&(m.disabled=!1,m.textContent="Add Part")}}async function d(u){u.preventDefault();let p=u.target,a=p.querySelector("button[type='submit']"),m=e.getParts().find(y=>y.id===p.dataset.restockPart),g=Number(new t(p).get("quantity"))||0;if(!m||g<=0)return;let f=a?.textContent||"Restock";a&&(a.disabled=!0,a.textContent="Saving...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(m.quantity_on_hand)||0)+g}).eq("id",m.id).eq("company_id",e.getActiveCompanyId()),"Part restock timed out. Check your connection and try again.",15e3);if(y)throw y;e.showNotice("Part restocked."),await e.render()}catch(y){e.showNotice(`Could not restock part: ${y.message||y}`,"warning")}finally{a&&(a.disabled=!1,a.textContent=f)}}async function o(u){u.preventDefault();let p=u.currentTarget,a=p.querySelector("button[type='submit']"),m=e.getParts().find(y=>y.id===p.dataset.usePart),g=Number(new t(p).get("quantity"))||0;if(!m||g<=0)return;let f=a?.textContent||"Use";a&&(a.disabled=!0,a.textContent="Saving...");try{let y=Number(m.quantity_on_hand)||0,h=Math.max(0,y-g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:h}).eq("id",m.id).eq("company_id",e.getActiveCompanyId()),"Part use save timed out. Check your connection and try again.",15e3);if(b)throw b;e.showNotice("Part used."),await e.render()}catch(y){e.showNotice(`Could not use part: ${y.message||y}`,"warning")}finally{a&&(a.disabled=!1,a.textContent=f)}}async function i(u){u.preventDefault();let p=u.currentTarget,a=p.dataset.editPart,m=n.querySelector(`[data-part-edit-error="${a}"]`),g=p.querySelector("button[type='submit']"),f=new t(p);m&&(m.textContent="");let y=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let h={name:String(f.get("name")||"").trim(),sku:f.get("sku")||null,supplier_name:f.get("supplier_name")||null,machine_note:f.get("machine_note")||null,quantity_on_hand:Number(f.get("quantity_on_hand"))||0,reorder_point:Number(f.get("reorder_point"))||0,unit_cost:Number(f.get("unit_cost"))||0};try{if(!h.name)throw new Error("Part name is required.");let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(h).eq("id",a).eq("company_id",e.getActiveCompanyId()),"Part save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(b&&e.isMissingColumnError(b,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(b&&e.isMissingColumnError(b,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(b)throw b;e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(b){m&&(m.textContent=b.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=y)}}async function l(u){u.preventDefault();let p=u.currentTarget,a=n.querySelector("#part-source-error"),m=p.querySelector("button[type='submit']"),g=new t(p),f=String(g.get("old_source")||"").trim(),y=String(g.get("new_source")||"").trim();if(a&&(a.textContent=""),!!f){if(!e.getPartSuppliersReady()){a&&(a.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(f===y){a&&(a.textContent="Change the source name before saving.");return}m&&(m.disabled=!0,m.textContent="Renaming...");try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:y||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",f),"Part source rename timed out. Check your connection and try again.",15e3);if(h)throw e.isMissingColumnError(h,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?h.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(h){a&&(a.textContent=h.message||"Could not update part source.")}finally{m&&(m.disabled=!1,m.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:s,restockPart:d,usePartFromInventory:o,updatePart:i,renamePartSource:l}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:c},typeof Ze<"u"&&(Ze.exports={createPartInventoryWorkflow:c})})()});var Vt=U((cr,_e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(d){d.preventDefault();let o=d.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#quick-update-error"),u=e.getWorkOrders().find(a=>a.id===e.getActiveWorkOrderId()),p=new t(o);i.disabled=!0,i.textContent="Saving...",l&&(l.textContent="");try{let a=p.get("asset_id")||null,m=String(p.get("new_asset_name")||"").trim();if(a&&m)throw new Error("Choose existing equipment or create new equipment, not both.");if(m){let{data:w,error:P}=await e.createQuickFixAsset(m,"running");if(P){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not add equipment: ${P.message}`);return}a=w.id}if(!m&&!e.confirmAssetLocationRouting(a,"saving this work update",l))return;let g={title:e.requiredText(p.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(u?.description||"",p.get("assigned_to")),asset_id:a,location_id:e.locationIdForAsset(a),due_at:e.workOrderDateValue(p.get("due_at")),status:p.get("status"),priority:p.get("priority"),assigned_to:e.assignedUserFromForm(p),...e.procedureColumn(p.get("procedure_template_id")),resolution_summary:p.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let f=p.get("safety_devices_checked")==="on";if(g.status==="completed"&&u?.status!=="completed"){let w=e.productionActionCompletionMessage?.(u)||"";if(w){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),w),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=w);return}let P=e.blocksProcedureCompletion(u,g.procedure_template_id||null);if(P){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),P),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=P);return}if(e.applySafetyCheckPayload(g,f),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):u?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(f||e.hasCompletedSafetyDeviceCheck(u)));let{error:y}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(y){i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(y)}`);return}let h=[];if(g.asset_id&&p.get("machine_down")==="on"){let w=await e.updateAssetStatus(g.asset_id,"offline");w?h.push(`equipment status did not update: ${w.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let b=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(u,Object.fromEntries(p.entries()))),"Activity log timed out.",8e3).catch(w=>w);m&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${m}.`),"Activity log timed out.",8e3).catch(()=>null),b&&h.push(`history did not update: ${b.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(h.length?`Quick update saved with warning: ${h[0]}`:"Quick update saved.",h.length?"warning":"success"),await e.render()}catch(a){r.error("Quick update save failed",a),i.disabled=!1,i.textContent="Save Quick Update",l&&(l.textContent=`Could not save update: ${a.message||a}`)}}return{updateWorkOrderQuickView:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderQuickUpdateWorkflow:c}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:c}})()});var Yt=U((lr,Se)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function d(C){return String(C.get("location_new")||C.get("location_existing")||C.get("location")||"").trim()||null}function o(){return e.getSession?.()?.user?.id||null}function i(C){return(e.getAssets?.()||[]).find(k=>k.id===C)||null}function l(C,k){if(!C)return[];let S={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(S).filter(_=>String(C[_]??"")!==String(k[_]??"")).map(_=>S[_])}function u(C){return e.isMissingColumnError(C,"manufacturer")||e.isMissingColumnError(C,"model")}async function p(C){C.preventDefault();let k=C.currentTarget,S=n.querySelector("#asset-create-error");S&&(S.textContent="");let _=k.querySelector("button[type='submit']"),M=_?.textContent||"Add Equipment",N=C.submitter?.dataset?.assetContinue==="true";_&&(_.disabled=!0,_.textContent="Saving...");try{let D=new t(k),W={company_id:e.getActiveCompanyId(),location_id:D.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location:d(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:"running",created_by:o()},v=e.supabaseClient().from("assets").insert(W).select("id").single(),{data:A,error:E}=await e.withOperationTimeout(v,"Equipment save timed out. Check your connection and try again.",15e3);if(E&&e.isMissingColumnError(E,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(E&&e.isMissingColumnError(E,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(E&&u(E))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(E&&e.isAssetHierarchySchemaError(E))throw new Error(e.equipmentSchemaMessage(E));if(E)throw E;A?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(A.id,"created",`Created ${W.name}.`),N&&A?.id?(e.setActiveAssetId(A.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(D){S?S.textContent=D.message:r(D.message)}finally{_&&(_.disabled=!1,_.textContent=M)}}async function a(C){C.preventDefault();let k=C.currentTarget,S=n.querySelector("#asset-edit-error");S&&(S.textContent="");let _=k.querySelector("button[type='submit']"),M=_?.textContent||"Save Equipment";_&&(_.disabled=!0,_.textContent="Saving...");try{let N=new t(k),D=i(e.getActiveAssetId()),W={name:e.requiredText(N.get("name"),"Equipment name"),asset_code:String(N.get("asset_code")||"").trim()||null,manufacturer:String(N.get("manufacturer")||"").trim()||null,model:String(N.get("model")||"").trim()||null,location_id:N.get("location_id")||e.activeLocationDatabaseId(),location:d(N),parent_asset_id:N.get("parent_asset_id")||null,asset_type:N.get("asset_type")||"machine",safety_devices_required:N.get("safety_devices_required")==="on",status:N.get("status")},{error:v}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(W).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(v&&u(v))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(v&&e.isAssetHierarchySchemaError(v))throw new Error(e.equipmentSchemaMessage(v));if(v)throw v;let A=l(D,W);A.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${A.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(N){S?S.textContent=N.message:r(N.message)}finally{_&&(_.disabled=!1,_.textContent=M)}}async function m(C,k){let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:k}).eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!S&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(C,"status_changed",`Status changed to ${k}.`),S||null}async function g(C){C.preventDefault();let k=C.currentTarget,S=k.dataset.attachAssetPart,_=n.querySelector(`[data-asset-part-error="${s.escape(S)}"]`);_&&(_.textContent="");let M=k.querySelector("button[type='submit']"),N=M?.textContent||"Attach Part";M&&(M.disabled=!0,M.textContent="Attaching...");try{let D=new t(k),W=D.get("part_id");if(!W)throw new Error("Select a part to attach.");let v=Math.max(1,Number(D.get("quantity_recommended"))||1),A=String(D.get("note")||"").trim()||null,{error:E}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:S,part_id:W,quantity_recommended:v,note:A}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(E)throw e.isMissingTableError?.(E,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):E.code==="23505"?new Error("This part is already linked to this equipment."):E;e.showNotice("Part linked to equipment."),await e.render()}catch(D){_?_.textContent=D.message||"Could not link part to equipment.":e.showNotice(D.message||"Could not link part to equipment.","warning")}finally{M&&(M.disabled=!1,M.textContent=N)}}async function f(C){let k=n.querySelector("[data-asset-part-error]");k&&(k.textContent="");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingTableError?.(S,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):S;e.showNotice("Part link removed."),await e.render()}catch(S){k?k.textContent=S.message||"Could not remove linked part.":e.showNotice(S.message||"Could not remove linked part.","warning")}}function y(C){return{workOrders:e.getWorkOrders().filter(k=>k.asset_id===C).length,children:e.childAssetsFor(C).length,schedules:e.getPreventiveSchedules().filter(k=>k.asset_id===C).length,requests:e.getMaintenanceRequests().filter(k=>k.asset_id===C).length}}function h(C){let k=y(C);return Object.values(k).some(Boolean)}async function b(C){let[k,S,_]=await Promise.all([w("work_orders",C),w("preventive_schedules",C),w("maintenance_requests",C)]);return{workOrders:k,children:e.childAssetsFor(C).length,schedules:S,requests:_}}async function w(C,k){let{count:S,error:_}=await e.withOperationTimeout(e.supabaseClient().from(C).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",k),`Equipment delete check timed out while checking ${C}.`,15e3);if(_)throw new Error(`Could not verify linked ${C.replaceAll("_"," ")} before deleting equipment: ${_.message}`);return S||0}async function P(C){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let k=n.querySelector("#asset-delete-error");k&&(k.textContent="");try{let S=await b(C),_=e.assetDeleteBlockerMessage(S);if(_){k&&(k.textContent=_);return}e.setPendingDeleteAssetId(C),e.renderWorkspace()}catch(S){k?k.textContent=S.message||"Could not verify equipment links before delete.":e.showNotice(S.message||"Could not verify equipment links before delete.","warning")}}async function $(C){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let k=n.querySelector("#asset-delete-error");k&&(k.textContent="");let S=n.querySelector(`[data-confirm-delete-asset="${s.escape(C)}"]`);S&&(S.disabled=!0,S.textContent="Deleting...");try{let _=await b(C),M=e.assetDeleteBlockerMessage(_);if(M)throw new Error(M);let N=e.getAssetDocumentStoragePaths?.(C)||[];if(N.length){let W=await e.withOperationTimeout(e.removeAssetDocumentStorage(N),"Equipment file cleanup timed out.",15e3);if(W.error)throw new Error(`Could not remove equipment files: ${W.error.message}`)}let{error:D}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(D)throw new Error(D.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":D.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(_){k&&(k.textContent=_.message||"Could not delete equipment."),S&&(S.disabled=!1,S.textContent="Permanently Delete")}}async function R(C,k="running"){let S={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:C,asset_type:"machine",safety_devices_required:!0,status:k,created_by:o()},_=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(S).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return _.error&&e.isMissingColumnError(_.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(_,e.databaseSetupRequiredMessage("adding equipment in this location"))):_.error&&e.isMissingColumnError(_.error,"created_by")?e.withSetupError(_,"Run supabase/step-next-asset-events.sql before saving equipment history."):_.error&&e.isAssetHierarchySchemaError(_.error)?e.withSetupError(_,e.equipmentSchemaMessage(_.error).replace("saving","adding")):(!_.error&&_.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(_.data.id,"created",`Created ${C}.`),_)}return{assetDeleteBlockers:y,assetHasDeleteBlockers:h,attachAssetPart:g,countAssetLinkedRows:w,createAsset:p,createQuickFixAsset:R,deleteAsset:$,loadAssetDeleteBlockers:b,removeAssetPart:f,requestDeleteAsset:P,updateAsset:a,updateAssetStatus:m}}typeof Se<"u"&&Se.exports&&(Se.exports={createAssetWorkflow:c}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:c}})()});var Kt=U((ur,qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function d(){let m=n.querySelector("#detail-panel");m.innerHTML=e.renderRequestFormContent()}async function o(m){m.preventDefault(),await i(m.target)}async function i(m){let g=n.querySelector("#request-error"),f=m.querySelector("button[type='submit']");g&&(g.textContent=""),f&&(f.disabled=!0,f.textContent="Submitting...");try{let y=new t(m),h=y.get("asset_id")||null,b=String(y.get("equipment_note")||"").trim();if(h&&b)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!h&&!b)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(h,"submitting this request",g))return;let w=b||e.assetNameFor?.(h)||"Saved equipment",P=e.requiredText(y.get("description"),"Request details"),$=e.requiredText(y.get("requester_name"),"Your name"),R={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(h),title:e.requiredText(y.get("title"),"Request title"),description:`Machine / area: ${w}

${P}`,asset_id:h,priority:y.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:$};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:C,error:k}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(R).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(k&&e.isMissingColumnError(k,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(k)throw k;let S=y.get("photo"),_="";if(S&&S.name){let N=await e.addPhotoToMaintenanceRequest(C.id,S);N&&(_=` Photo did not upload: ${N.message||N}`)}let M=await e.notifyRequestEmailer(C.id);M?.error&&console.warn("Request email notification did not send",M.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${_}`,_?"warning":"success"),await e.render()}catch(y){g?g.textContent=y.message||"Could not submit request.":r(y.message||y)}finally{f&&(f.disabled=!1,f.textContent="Submit Request")}}async function l(m){let g=e.getMaintenanceRequests().find(y=>y.id===m);if(!g)return;let f=n.querySelector(`[data-convert-request="${s.escape(m)}"]`);f&&(f.disabled=!0,f.textContent="Converting...");try{let y={company_id:e.getActiveCompanyId(),location_id:g.location_id||e.locationIdForAsset(g.asset_id),title:g.title,description:e.descriptionWithRequestPhotoNote(g.description,g),asset_id:g.asset_id||null,priority:g.priority||"medium",type:"corrective",status:"open",created_by:e.getSession().user.id};e.applySafetyRequirementPayload(y),e.applySafetyCheckPayload(y,!1);let{data:h,error:b}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",y,{returnSingle:!0}),"Request conversion timed out. Check your connection and try again.",15e3);if(b)throw b;let{error:w}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").update({status:"converted",reviewed_by:e.getSession().user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:h.id}).eq("id",m).eq("company_id",e.getActiveCompanyId()),"Request status update timed out. Check your connection and try again.",15e3);if(w)throw w;e.setActiveSection("work"),e.setActiveWorkOrderId(h.id),await e.withOperationTimeout(e.recordWorkOrderEvent(h.id,"request_converted","Request converted to work order."),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Request converted to work order."),await e.render()}catch(y){e.showNotice(`Could not convert request: ${y.message||y}`,"warning"),f&&(f.disabled=!1,f.textContent="Convert to Work Order")}}function u(m){let g=e.getMaintenanceRequests().find(f=>f.id===m);g&&(e.setQuickFixRequestId(m),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function p(m){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===m)&&(e.setPendingDeleteRequestId(m),e.renderWorkspace())}async function a(m){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(y=>y.id===m);if(!g)return;let f=n.querySelector(`[data-confirm-delete-request="${s.escape(m)}"]`);f&&(f.disabled=!0,f.textContent="Deleting...");try{if(g.photo_storage_path){let w=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(w.error)throw new Error(`Could not remove request photo: ${w.error.message}`)}let{data:y,error:h}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",m).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(h)throw h;if(!y?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let b=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",m).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(b.error)throw new Error(`Request delete verification failed: ${b.error.message}`);if(b.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(y){e.showNotice(y.message||"Could not delete request.","warning"),f&&(f.disabled=!1,f.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:l,createRequest:o,createRequestFromForm:i,deleteMaintenanceRequest:a,openQuickFixForRequest:u,renderRequestForm:d,requestDeleteMaintenanceRequest:p}}typeof qe<"u"&&qe.exports&&(qe.exports={createRequestLifecycleWorkflow:c}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:c}})()});var Jt=U((dr,Ce)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert;async function s(d){d.preventDefault();let o=d.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#create-work-order-error");i.disabled=!0,i.textContent="Creating...",l&&(l.textContent="");try{let u=new t(o),p=u.get("status")||"open",a=u.get("asset_id")||null,m=String(u.get("new_asset_name")||"").trim();if(a&&m)throw new Error("Choose existing equipment or create new equipment, not both.");if(m){let{data:R,error:C}=await e.createQuickFixAsset(m,"running");if(C){l&&(l.textContent=`Could not add equipment: ${C.message}`);return}a=R.id}if(!m&&!e.confirmAssetLocationRouting(a,"creating this work order",l))return;if(p==="completed"&&e.assetRequiresSafety(a)&&u.get("safety_devices_checked")!=="on"){l&&(l.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=p==="completed"?e.blocksProcedureCompletion(null,u.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),l&&(l.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let f={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(a),title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),asset_id:a,priority:u.get("priority"),type:u.get("type")||"corrective",due_at:e.workOrderDateValue(u.get("due_at")),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),status:p,created_by:e.getSession().user.id,actual_minutes:Number(u.get("actual_minutes"))||0,failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",completion_notes:u.get("completion_notes")||null,completed_at:p==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(f),e.applySafetyCheckPayload(f,p==="completed"&&f.safety_check_required&&u.get("safety_devices_checked")==="on");let{data:y,error:h}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",f,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(h){l&&(l.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(h)}`);return}await e.recordWorkOrderEvent(y.id,"created","Work order created."),m&&await e.recordWorkOrderEvent(y.id,"equipment_created",`Equipment created from work order: ${m}.`);let b=[],w=u.get("part_id");if(w){let R=e.getParts().find(k=>k.id===w),C=await e.addPartUsageToWorkOrder(y.id,R,Number(u.get("quantity_used"))||1);C?b.push(`part usage failed: ${C.message}`):await e.recordWorkOrderEvent(y.id,"part_used",`Part recorded: ${R?.name||"Part"}.`)}let P=u.get("photo");if(P&&P.name){let R=await e.addPhotoToWorkOrder(y.id,P);R?b.push(`photo upload failed: ${R.message}`):await e.recordWorkOrderEvent(y.id,"photo_uploaded",`Photo uploaded: ${P.name}.`)}let $=String(u.get("initial_comment")||"").trim();if($){let R=await e.addCommentToWorkOrder(y.id,$);R?b.push(`comment failed: ${R.message}`):await e.recordWorkOrderEvent(y.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(y.id),e.setCreateWorkOrderMode(!1),e.showNotice(b.length?`Work order created with warning: ${b[0]}`:"Work order created.",b.length?"warning":"success"),await e.render()}catch(u){l?l.textContent=`Could not create work order: ${u.message||u}`:r(u.message||u)}finally{i.disabled=!1,i.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createWorkOrderCreationWorkflow:c}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:c}})()});var Zt=U((pr,$e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(d){d.preventDefault();let i=d.target.querySelector("button[type='submit']"),l=n.querySelector("#work-order-save-error");i.disabled=!0,i.textContent="Saving...",l&&(l.textContent="");try{let u=new t(d.target),p=e.getActiveWorkOrderId(),a=e.getWorkOrders().find(R=>R.id===p),m=n.querySelector("#status-select")?.value||a?.status||"open",g=u.has("asset_id"),f=g?u.get("asset_id")||null:a?.asset_id||null;if(g&&typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(f,"saving this work order",l)){i.disabled=!1,i.textContent="Save Work Order";return}let y={title:e.requiredText(u.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(u.get("description"),u.get("assigned_to")),due_at:e.workOrderDateValue(u.get("due_at")),status:m,priority:u.get("priority"),type:u.get("type"),assigned_to:e.assignedUserFromForm(u),...e.procedureColumn(u.get("procedure_template_id")),failure_cause:u.get("failure_cause")||null,resolution_summary:u.get("resolution_summary")||null,follow_up_needed:u.get("follow_up_needed")==="on",actual_minutes:Number(u.get("actual_minutes"))||0};if(g&&(y.asset_id=f,y.location_id=e.locationIdForAsset(f)),y.safety_check_required=e.assetRequiresSafety(f),y.status==="completed"){let R=e.productionActionCompletionMessage?.(a)||"";if(R){e.setWorkOrderActionWarning(p,R),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=R);return}}if(y.status==="completed"&&y.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(a)&&u.get("safety_devices_checked")!=="on"){i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let h=(a?.procedure_template_id||"")!==(y.procedure_template_id||""),b=y.status==="completed"&&(a?.status!=="completed"||h)?e.blocksProcedureCompletion(a,y.procedure_template_id||null):"";if(b){e.setWorkOrderActionWarning(p,b),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=b);return}y.status==="completed"&&a?.status!=="completed"?(y.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(y,y.safety_check_required&&(u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(a)))):y.status!=="completed"?(y.completed_at=null,e.applySafetyCheckPayload(y,!1)):a?.status==="completed"&&y.safety_check_required&&u.has("safety_devices_checked")?e.applySafetyCheckPayload(y,u.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(a)):a?.status==="completed"&&!y.safety_check_required&&e.applySafetyCheckPayload(y,!1);let{error:w}=await e.withOperationTimeout(e.updateWorkOrderSafely(y,p),"Work order save timed out. Check your connection and try again.",2e4);if(w){i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(w)}`);return}let P={...Object.fromEntries(u.entries()),status:m},$=await e.withOperationTimeout(e.recordWorkOrderEvent(p,"updated",e.describeWorkOrderChanges(a,P)),"Activity log timed out.",8e3).catch(R=>R);e.setWorkOrderActionWarning("",""),e.showNotice($?`Work order saved, but history did not update: ${$.message}`:"Work order saved.",$?"warning":"success"),await e.render()}catch(u){r.error("Work order save failed",u),i.disabled=!1,i.textContent="Save Work Order",l&&(l.textContent=`Could not save work order: ${u.message||u}`)}finally{i&&i.isConnected&&(i.disabled=!1,i.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof $e<"u"&&$e.exports&&($e.exports={createWorkOrderDetailEditWorkflow:c}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:c}})()});var Xt=U((mr,Pe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function r(d){d.preventDefault();let o=d.currentTarget,i=n.querySelector("#parts-used-error"),l=o.querySelector("button[type='submit']");i&&(i.textContent=""),l&&(l.disabled=!0,l.textContent="Recording...");try{let u=new t(o),p=u.get("part_id"),a=Number(u.get("quantity_used"))||1,m=e.getParts().find(f=>f.id===p);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!m)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),m,a);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(u){i&&(i.textContent=u.message||"Could not record part used.")}finally{l&&(l.disabled=!1,l.textContent="Record Part Used")}}async function s(d,o,i){if(!o)return new Error("Choose a part first.");let{error:l}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:d,p_part_id:o.id,p_quantity:i}),"Part usage save timed out.");return l||null}return{addPartUsageToWorkOrder:s,recordPartUsed:r}}typeof Pe<"u"&&Pe.exports&&(Pe.exports={createPartUsageWorkflow:c}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:c}})()});var en=U((fr,Ae)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.consoleRef||console,d=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),o=25*1024*1024,i=5*1024*1024,l=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),u=new Set;async function p(v){v.preventDefault();let A=v.currentTarget,E=A.dataset.partDocument,O=n.querySelector(`[data-part-document-error="${E}"]`),q=A.querySelector("button[type='submit']"),L=new t(A),I=L.get("document"),j=y(L.get("document_type"));if(O&&(O.textContent=""),!e.getPartDocumentsReady()){O&&(O.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!I||!I.name){O&&(O.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(S(I)){O&&(O.textContent=_()),await $("part document",I,_());return}q&&(q.disabled=!0,q.textContent="Attaching...");let G=await C(I),H=G.fileName||e.safeFileName(I.name||"part-file"),re=`${e.getActiveCompanyId()}/${E}/${r.randomUUID()}-${H}`;try{let B=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(re,G.blob,{contentType:G.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(B.error)throw B.error;let V={company_id:e.getActiveCompanyId(),part_id:E,uploaded_by:e.getSession().user.id,storage_path:re,file_name:H,content_type:G.contentType,document_type:j,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(I.name||"part-file"),original_size_bytes:I.size||null},{error:oe}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(V),"Part file record save timed out. Check your connection and try again.",15e3);if(oe&&e.isColumnSchemaError(oe,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete V.document_type,delete V.file_size_bytes,delete V.original_file_name,delete V.original_size_bytes,oe=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(V),"Part file record retry timed out. Check your connection and try again.",15e3)).error),oe)throw await b("part-documents",re),e.isColumnSchemaError(oe,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?oe.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(B){await $("part document",I,B),O&&(O.textContent=B.message||"Could not attach file.")}finally{q&&(q.disabled=!1,q.textContent="Attach File")}}async function a(v){v.preventDefault();let A=v.currentTarget,E=A.dataset.assetDocument,O=n.querySelector(`[data-asset-document-error="${E}"]`),q=A.querySelector("button[type='submit']"),L=new t(A),I=L.get("document"),j=f(L.get("document_type"));if(O&&(O.textContent=""),!e.getAssetDocumentsReady?.()){O&&(O.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!I||!I.name){O&&(O.textContent="Choose a machine file first.");return}if(S(I)){O&&(O.textContent=_()),await $("equipment file",I,_());return}q&&(q.disabled=!0,q.textContent="Uploading...");let G=await C(I),H=`${e.getActiveCompanyId()}/${E}/${r.randomUUID()}-${G.fileName}`;try{let re=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(H,G.blob,{contentType:G.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(re.error)throw re.error;let{error:B}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:E,uploaded_by:e.getSession().user.id,storage_path:H,file_name:G.fileName,content_type:G.contentType,document_type:j,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(I.name||"machine-photo"),original_size_bytes:I.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(B)throw await b("asset-documents",H),e.isColumnSchemaError(B,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?B.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(re){await $("equipment file",I,re),O&&(O.textContent=re.message||"Could not upload machine file.")}finally{q&&(q.disabled=!1,q.textContent="Attach Machine File")}}async function m(v,A){let E=n.querySelector("[data-asset-document-error]");if(E&&(E.textContent=""),!v||!A){let O="Missing machine file record. Refresh and try again.";E?E.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([A]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",v).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(q)throw q;e.showNotice("Machine file deleted."),await e.render()}catch(O){E?E.textContent=O.message||"Could not delete machine file.":e.showNotice(O.message||"Could not delete machine file.","warning")}}async function g(v,A){let E=n.querySelector("#photo-error");if(E&&(E.textContent=""),!v||!A){let O="Missing photo record. Refresh and try again.";E?E.textContent=O:e.showNotice(O,"warning");return}try{let O=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([A]),"Photo delete timed out. Check your connection and try again.",15e3);if(O.error)throw O.error;let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",v).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(q)throw q;let L=A.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${L}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(O){E?E.textContent=O.message||"Could not delete photo.":e.showNotice(O.message||"Could not delete photo.","warning")}}function f(v){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(v)?v:"other"}function y(v){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(v)?v:"other"}async function h(v){v.preventDefault();let A=v.currentTarget,E=A.querySelector("button[type='submit']"),O=n.querySelector("#photo-error");O&&(O.textContent="");let q=new t(A).get("photo");if(!q||!q.name){O&&(O.textContent="Choose a photo first.");return}let L=N(q);if(L){O&&(O.textContent=L),await $("work order photo",q,L);return}E.disabled=!0,E.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let j=await w(e.getActiveWorkOrderId(),q);if(j)throw j;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${q.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(I){await $("work order photo",q,I),O&&(O.textContent=`Could not upload photo: ${I.message||I}`)}finally{E.disabled=!1,E.textContent="Upload Photo"}}async function b(v,A){try{let{error:E}=await e.withOperationTimeout(e.supabaseClient().storage.from(v).remove([A]),"Uploaded file cleanup timed out.",1e4);E&&s.warn(`Could not remove uploaded ${v} object`,E)}catch(E){s.warn(`Could not remove uploaded ${v} object`,E)}}async function w(v,A){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let O=N(A);if(O)return await $("work order photo",A,O),new Error(O);let q=await C(A,R()),L=D(q);if(L)return await $("work order photo",A,L),new Error(L);let I=`${e.getActiveCompanyId()}/${v}/${r.randomUUID()}-${q.fileName}`,j=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(I,q.blob,{contentType:q.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(j.error)return await $("work order photo",A,j.error),j.error;let G={company_id:e.getActiveCompanyId(),work_order_id:v,uploaded_by:e.getSession().user.id,storage_path:I,file_name:q.fileName,content_type:q.contentType,file_size_bytes:q.blob.size||null,original_file_name:e.safeFileName(A.name||"photo"),original_size_bytes:A.size||null},{error:H}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record save timed out. Check your connection and try again.",15e3);return H&&e.isColumnSchemaError(H,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete G.file_size_bytes,delete G.original_file_name,delete G.original_size_bytes,H=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record retry timed out. Check your connection and try again.",15e3)).error),H&&await b("work-order-photos",I),H&&await $("work order photo",A,H),H||null}async function P(v,A){if(!v)return new Error("Request was not saved before photo upload.");let E=N(A);if(E)return await $("request photo",A,E),new Error(E);let O=await C(A,R()),q=D(O);if(q)return await $("request photo",A,q),new Error(q);let L=`${v}/${r.randomUUID()}-${O.fileName}`,I=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(L,O.blob,{contentType:O.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(I.error)return await $("request photo",A,I.error),I.error;let{error:j}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:v,p_photo_storage_path:L,p_photo_file_name:O.fileName,p_photo_content_type:O.contentType,p_photo_file_size_bytes:O.blob.size||null,p_photo_original_file_name:e.safeFileName(A.name||"photo"),p_photo_original_size_bytes:A.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return j&&(await b("maintenance-request-photos",L),await $("request photo",A,j)),j||null}async function $(v,A,E){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let O=String(E?.message||E||"Upload failed").slice(0,500),q=e.safeFileName(A?.name||"unknown-file"),L=M(A),I=Number(A?.size||0),j=[v,q,L,I,O].join("|");if(!u.has(j)){u.add(j);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||v||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${v}`.slice(0,140),details:[`Upload context: ${v}`,`File: ${q}`,`Type: ${L}`,`Size: ${I}`,`Error: ${O}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(G){s.warn("Could not report upload failure",G)}}}function R(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function C(v,A={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(v,A);let E=["image/jpeg","image/png","image/webp","image/heic","image/heif"],O=M(v);if(!E.includes(O))return{blob:v,fileName:e.safeFileName(v.name||"photo"),contentType:O};try{if(!d)throw new Error("Browser image optimization is unavailable.");let q=await d(v),L=Number(A.targetBytes||0)||1*1024*1024,I=A.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],j=null;for(let G of I){let H=await W(q,G.maxDimension,G.quality);if(j=H,H.size<=L)break}if(q.close&&q.close(),!j)throw new Error("Browser could not optimize this image.");return{blob:j,fileName:`${e.fileBaseName(v.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(q){return s.warn("Photo optimization failed; uploading original.",q),{blob:v,fileName:e.safeFileName(v.name||"photo"),contentType:O}}}function k(v){return["image/jpeg","image/png","image/webp"].includes(M(v))}function S(v){return!k(v)&&Number(v.size||0)>o}function _(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function M(v){let A=String(v?.type||"").trim().toLowerCase();if(A)return A;let E=String(v?.name||"").toLowerCase();return/\.(jpe?g)$/.test(E)?"image/jpeg":/\.png$/.test(E)?"image/png":/\.webp$/.test(E)?"image/webp":/\.gif$/.test(E)?"image/gif":/\.heic$/.test(E)?"image/heic":/\.heif$/.test(E)?"image/heif":/\.pdf$/.test(E)?"application/pdf":/\.txt$/.test(E)?"text/plain":/\.csv$/.test(E)?"text/csv":/\.doc$/.test(E)?"application/msword":/\.docx$/.test(E)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(E)?"application/vnd.ms-excel":/\.xlsx$/.test(E)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function N(v){let A=M(v);return l.has(A)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function D(v){return l.has(String(v?.contentType||"").toLowerCase())?Number(v?.blob?.size||0)>i?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function W(v,A,E){let O=Math.min(1,A/Math.max(v.width,v.height)),q=Math.max(1,Math.round(v.width*O)),L=Math.max(1,Math.round(v.height*O)),I=n.createElement("canvas");I.width=q,I.height=L,I.getContext("2d",{alpha:!1}).drawImage(v,0,0,q,L);let G=await new Promise(H=>I.toBlob(H,"image/jpeg",E));if(!G)throw new Error("Browser could not optimize this image.");return G}return{addPhotoToMaintenanceRequest:P,addPhotoToWorkOrder:w,optimizePhoto:C,removeUploadedObject:b,reportUploadFailure:$,deleteAssetDocument:m,deleteWorkOrderPhoto:g,uploadAssetDocument:a,uploadPartDocument:p,uploadPhoto:h}}typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMediaStorageWorkflow:c}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:c}})()});var tn=U((gr,Re)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.URLRef||URL,d=e.consoleRef||console,o=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),i=25*1024*1024,l=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function u(f){f.preventDefault();let y=f.currentTarget,h=n.querySelector("#company-logo-error"),b=y.querySelector("button[type='submit']"),w=new t(y).get("logo");if(h&&(h.textContent=""),!w||!w.name){h&&(h.textContent="Choose a logo image first.");return}b&&(b.disabled=!0,b.textContent="Uploading...");try{let P=m(w);if(P)throw new Error(P);let $=await p(w),R=g($);if(R)throw new Error(R);let C=`${e.getActiveCompanyId()}/logo-${r.randomUUID()}-${$.fileName}`,k=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(C,$.blob,{contentType:$.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(k.error)throw new Error(k.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":k.error.message);let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:C}),"Company logo record save timed out. Check your connection and try again.",15e3);if(S)throw await e.removeUploadedObject("company-logos",C),new Error(e.isColumnSchemaError(S,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":S.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":S.message);let _=e.getCompanies().find(M=>M.id===e.getActiveCompanyId());_&&(_.logo_path=C,_.logoUrl=s.createObjectURL($.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(P){h&&(h.textContent=P.message||"Could not upload logo.")}finally{b&&(b.disabled=!1,b.textContent="Upload Logo")}}async function p(f){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(f);let y=a(f);try{if(!o)throw new Error("Browser logo optimization is unavailable.");let h=await o(f),w=Math.min(1,1200/Math.max(h.width,h.height)),P=Math.max(1,Math.round(h.width*w)),$=Math.max(1,Math.round(h.height*w)),R=n.createElement("canvas");R.width=P,R.height=$;let C=R.getContext("2d",{alpha:!0});C.clearRect(0,0,P,$),C.drawImage(h,0,0,P,$),h.close&&h.close();let k=await new Promise(S=>R.toBlob(S,"image/png"));if(!k)throw new Error("Browser could not optimize this logo.");return{blob:k,fileName:`${e.fileBaseName(f.name||"logo")}.png`,contentType:"image/png"}}catch(h){return d.warn("Logo optimization failed; uploading original.",h),{blob:f,fileName:e.safeFileName(f.name||"logo"),contentType:y}}}function a(f){let y=String(f?.type||"").trim().toLowerCase();if(y)return y;let h=String(f?.name||"").toLowerCase();return/\.(jpe?g)$/.test(h)?"image/jpeg":/\.png$/.test(h)?"image/png":/\.webp$/.test(h)?"image/webp":/\.gif$/.test(h)?"image/gif":/\.heic$/.test(h)?"image/heic":/\.heif$/.test(h)?"image/heif":/\.avif$/.test(h)?"image/avif":/\.bmp$/.test(h)?"image/bmp":/\.tiff?$/.test(h)?"image/tiff":"application/octet-stream"}function m(f){let y=a(f);return l.has(y)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(f){return l.has(String(f?.contentType||"").toLowerCase())?Number(f?.blob?.size||0)>i?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:p,uploadCompanyLogo:u}}typeof Re<"u"&&Re.exports&&(Re.exports={createCompanyLogoWorkflow:c}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:c}})()});var nn=U((hr,Xe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,r=e.alertUser||alert;function s(i){return e.partUsageRows(i).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(i).length?"This part is linked to equipment and is kept for traceability.":""}function d(i){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}if(!e.getParts().find(a=>a.id===i))return;let u=s(i);if(u){r(u);return}let p=!!n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===i||p){o(i);return}e.setPendingDeletePartId(i),e.renderWorkspace()}async function o(i){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}let l=e.getParts().find(m=>m.id===i),u=n.querySelector("#part-delete-error");if(u&&(u.textContent=""),!l)return;let p=s(i);if(p){u&&(u.textContent=p);return}let a=n.querySelector(`[data-delete-part="${t.escape(i)}"].permanent-delete-button`);a&&(a.disabled=!0,a.textContent="Deleting...");try{let m=(e.getPartDocumentsByPartId()[i]||[]).map(h=>h.storage_path).filter(Boolean);if(m.length){let h=await e.withOperationTimeout(e.removePartDocumentStorage(m),"Part document cleanup timed out. Try deleting again.",15e3);if(h.error)throw new Error(`Could not remove filed receipts/invoices: ${h.error.message}`)}let{data:g,error:f}=await e.withOperationTimeout(e.deletePartRecord(i),"Part delete timed out. Check your connection and try again.",15e3);if(f)throw new Error(f.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":f.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let y=await e.withOperationTimeout(e.verifyPartDeleted(i),"Part delete verification timed out. Refresh and check the part list.",15e3);if(y.error)throw new Error(`Part delete verification failed: ${y.error.message}`);if(y.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(m){e.showNotice(m.message||"Could not delete part.","warning"),u&&(u.textContent=m.message||"Could not delete part."),a&&(a.disabled=!1,a.textContent="Permanently Delete")}}return{deletePart:o,requestDeletePart:d}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:c},typeof Xe<"u"&&(Xe.exports={createPartDeleteWorkflow:c})})()});var rn=U((yr,et)=>{(function(){function c(e={}){async function n(t){let r=t.target,s=r.type==="checkbox"?r.checked?"checked":"":r.value;r.disabled=!0;try{let{error:d}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:r.dataset.workOrderId,procedure_step_id:r.dataset.stepResult,completed_by:s?e.getSession().user.id:null,value:s,completed_at:s?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(d)throw d;await e.withOperationTimeout(e.recordWorkOrderEvent(r.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let o=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(i=>i);if(o){e.showNotice(`Checklist saved, but refresh did not finish: ${o.message||o}`,"warning"),r.disabled=!1;return}if(e.getWorkOrderActionWarningId()===r.dataset.workOrderId){let i=e.getWorkOrders().find(l=>l.id===r.dataset.workOrderId);e.blocksProcedureCompletion(i)||e.setWorkOrderActionWarning("","")}e.renderWorkspace()}catch(d){e.showNotice(`Could not save checklist step: ${d.message||d}`,"warning"),r.disabled=!1}}return{saveStepResult:n}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:c},typeof et<"u"&&(et.exports={createProcedureChecklistWorkflow:c})})()});var an=U((br,tt)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,r=e.FormDataCtor||FormData;async function s(u,p){let{data:a,error:m}=await e.withOperationTimeout(e.getPublicRequestIntake(u),p);return{data:Array.isArray(a)?a[0]:a,error:m}}async function d(u){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let p=null;try{let{data:m,error:g}=await s(u,"Request QR lookup timed out.");if(p=m,g||!p){i("This QR code link is inactive or invalid.");return}}catch{i("This QR code link is inactive or invalid.");return}let a=e.publicRequestUrl(u);e.setAppHtml(e.publicRequestQrPage(p,a)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(p,a)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function o(u){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let p=null;try{let{data:a,error:m}=await s(u,"Request form lookup timed out.");if(m){i("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}p=a}catch(a){i(a.message||"This request link could not be loaded.");return}if(!p){i("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(p)),n.querySelector("#public-request-form").addEventListener("submit",a=>l(a,u,p))}function i(u){e.setAppHtml(e.publicRequestError(u))}async function l(u,p,a){u.preventDefault();let m=u.currentTarget,g=new r(m),f=n.querySelector("#public-request-error"),y=m.querySelector("button[type='submit']");f&&(f.textContent=""),y&&(y.disabled=!0,y.textContent="Sending...");try{let{data:h,error:b}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:p,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(b)throw b;let w=g.get("photo"),P="";if(w&&w.name){let R=await e.addPhotoToMaintenanceRequest(h,w);R&&(P=`Request sent, but the photo did not upload: ${R.message||R}`)}let $=await e.notifyRequestEmailer(h);$.error&&e.warn("Request email notification did not send",$.error),e.setAppHtml(e.publicRequestSuccess(a,P)),n.querySelector("#public-request-another").addEventListener("click",()=>o(p))}catch(h){f&&(f.textContent=h.message||"Could not send the request.")}finally{y?.isConnected&&(y.disabled=!1,y.textContent="Send Request")}}return{renderPublicRequestError:i,renderPublicRequestIntake:o,renderPublicRequestQrPage:d,submitPublicRequest:l}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:c},typeof tt<"u"&&(tt.exports={createPublicRequestIntakeWorkflow:c})})()});var on=U((wr,nt)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(d){d.preventDefault();let o=d.target,i=o.querySelector("button[type='submit']"),l=n.querySelector("#company-error"),u=String(new t(o).get("name")||"").trim();i.disabled=!0,i.textContent="Creating...",l.textContent="";try{if(!u)throw new Error("Company name is required.");let p=e.getCompanies().find(f=>f.name.trim().toLowerCase()===u.trim().toLowerCase());if(p){e.setActiveCompanyId(p.id),e.persistActiveCompanyId(p.id),await e.render();return}let{data:a,error:m}=await e.withOperationTimeout(e.createCompanyRecord(u),"Company creation timed out.");if(m){l.textContent=m.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":m.message;return}if(e.setActiveCompanyId(a),e.persistActiveCompanyId(a),!await e.ensureProfileForActiveCompany(u))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(p){l.textContent=p.message||"Could not create company."}finally{i?.isConnected&&(i.disabled=!1,i.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:r}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:c},typeof nt<"u"&&(nt.exports={createCompanySetupWorkflow:c})})()});var sn=U((vr,rt)=>{(function(){function c(e={}){async function n(r){let s=e.getWorkOrders().find(d=>d.id===e.getActiveWorkOrderId());r.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),r.target.value)||(r.target.value=s?.status||"open")}catch(d){r.target.value=s?.status||"open",e.showNotice(`Could not update status: ${d.message||d}`,"warning")}finally{r.target.disabled=!1}}async function t(r,s){let d=e.getWorkOrders().find(p=>p.id===r);if(s==="completed"){let p=e.productionActionCompletionMessage?.(d)||"";if(p)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,p),e.showNotice(p,"warning"),await e.render(),!1;let a=e.blocksProcedureCompletion(d);if(a)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,a),e.showNotice(a,"warning"),await e.render(),!1}let o=e.currentSafetyCheckboxCheckedForWorkOrder(r),i=e.hasCompletedSafetyDeviceCheck(d)||o;if(s==="completed"&&e.requiresSafetyDeviceCheck(d)&&!i){e.setActiveWorkOrderId(r);let p="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(r,p),e.showNotice(p,"warning"),await e.render(),!1}let l={status:s,asset_id:d?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(l),s==="completed"?e.applySafetyCheckPayload(l,l.safety_check_required&&i):s!=="completed"&&e.applySafetyCheckPayload(l,!1),delete l.asset_id;let{error:u}=await e.withOperationTimeout(e.updateWorkOrderSafely(l,r),"Status save timed out. Check your connection and try again.",15e3);return u?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(u)}`,"warning"),!1):(e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(r,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:c},typeof rt<"u"&&(rt.exports={createWorkOrderStatusWorkflow:c})})()});var cn=U((kr,Ee)=>{(function(){function c(e={}){let n=e.FormDataCtor||FormData,t=e.confirmRef||confirm;function r(l,u){return l?.closest?.("[data-production-action-control]")?.querySelector?.(`[data-production-action-error="${u}"]`)||e.documentRef?.querySelector?.(`[data-production-action-error="${u}"]`)||null}async function s({workOrderId:l,payload:u,source:p,busyText:a,successMessage:m}){let g=p?.querySelector?.("button[type='submit']")||p,f=g?.textContent||"",y=r(p,l);g&&(g.disabled=!0,g.textContent=a),y&&(y.textContent="");try{let h=await e.withOperationTimeout(e.updateProductionActionRecord(l,u),"Production Action save timed out. Check your connection and try again.",15e3);if(h.error){let b=e.friendlyWorkOrderSaveError(h.error);return y?y.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}return e.showNotice(m,"success"),await e.afterProductionActionMutation(h.data,l),!0}catch(h){let b=h.message||String(h);return y?y.textContent=`Could not save Production Action: ${b}`:e.showNotice(`Could not save Production Action: ${b}`,"warning"),!1}finally{g?.isConnected&&(g.disabled=!1,g.textContent=f)}}async function d(l){l.preventDefault(),l.stopPropagation();let u=l.currentTarget,p=u.dataset.productionActionForm,a=new n(u),m=String(a.get("production_action")||"").trim(),g=String(a.get("production_action_assigned_to")||"").trim(),f=r(u,p);if(!m||!g){f&&(f.textContent="Enter an action and choose a Production owner.");return}let y=e.getWorkOrderById(p);await s({workOrderId:p,payload:{production_action:m,production_action_assigned_to:g},source:u,busyText:"Saving...",successMessage:y?.production_action?"Production Action updated.":"Production Action assigned."})}async function o(l){l.preventDefault(),l.stopPropagation();let u=l.currentTarget,p=u.dataset.workOrderId,a=u.dataset.productionActionStatus;await s({workOrderId:p,payload:{production_action_status:a},source:u,busyText:a==="completed"?"Completing...":"Reopening...",successMessage:a==="completed"?"Production Action completed.":"Production Action reopened."})}async function i(l){l.preventDefault(),l.stopPropagation();let u=l.currentTarget,p=u.dataset.productionActionRemove;t("Remove this Production Action? Work Order History will keep a record of the removal.")&&await s({workOrderId:p,payload:{production_action:null},source:u,busyText:"Removing...",successMessage:"Production Action removed."})}return{saveProductionAction:d,setProductionActionStatus:o,removeProductionAction:i}}window.MaintainOpsProductionActionWorkflow={createProductionActionWorkflow:c},typeof Ee<"u"&&Ee.exports&&(Ee.exports={createProductionActionWorkflow:c})})()});var ln=U((_r,at)=>{(function(){function c(e={}){async function n(s,d={}){let o=s.filter(p=>p.id&&!p.read_at);if(!o.length)return!0;let i=new Map(o.map(p=>[p.id,p])),l=new Date().toISOString(),u=o.map(p=>p.id);e.setNotifications(e.getNotifications().map(p=>i.has(p.id)?{...p,read_at:l}:p)),d.render!==!1&&e.renderWorkspace();try{let p=await e.withOperationTimeout(e.markWorkOrderNotificationsRead(e.getSupabaseClient(),e.getSession().user.id,u,l),"Work notification update timed out.",1e4);if(p.error)throw p.error;return!0}catch(p){return e.setNotifications(e.getNotifications().map(a=>i.get(a.id)||a)),e.showNotice(`Could not mark the work notification read: ${p.message||p}`,"warning"),d.render!==!1&&e.renderWorkspace(),!1}}function t(s,d={}){let o=e.getNotifications().find(i=>i.id===s);return o?.read_at?Promise.resolve(!0):n([o||{id:s,read_at:null}],d)}function r(s,d={}){return n(e.getNotifications().filter(o=>o.work_order_id===s),d)}return{markWorkOrderNotificationRead:t,markWorkOrderNotificationsReadForOrder:r}}window.MaintainOpsWorkOrderNotificationWorkflow={createWorkOrderNotificationWorkflow:c},typeof at<"u"&&(at.exports={createWorkOrderNotificationWorkflow:c})})()});var un=U((Sr,ot)=>{(function(){function c(e){async function n(t,r){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(d=>d.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let d=e.workOrderDateValue(r);if(!d)throw new Error("Choose a due date.");let o=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:d},t),"Due date save timed out. Check your connection and try again.");if(o.error)throw o.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(i=>i.id===t?{...i,due_at:d}:i)),e.setWorkOrders(e.getWorkOrders().map(i=>i.id===t?{...i,due_at:d}:i)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${d} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:d}}catch(d){return e.showNotice(`Could not set due date: ${d.message||d}`,"warning"),{saved:!1,reason:"save_failed",error:d}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:c},typeof ot<"u"&&(ot.exports={createPlanningDueDateWorkflow:c})})()});var dn=U((qr,it)=>{(function(){function c(n,t,r,s=50){let d=Math.min(Math.max(Number(s)||50,1),100);return n.from("work_order_notifications").select("id, company_id, work_order_id, recipient_id, actor_id, source_event_id, kind, title, body, read_at, created_at").eq("company_id",t).eq("recipient_id",r).order("created_at",{ascending:!1}).limit(d)}function e(n,t,r,s){let d=[...new Set((r||[]).filter(Boolean))];return d.length?n.from("work_order_notifications").update({read_at:s}).eq("recipient_id",t).in("id",d).select("id, read_at"):Promise.resolve({data:[],error:null})}window.MaintainOpsWorkOrderNotificationsService={listWorkOrderNotifications:c,markWorkOrderNotificationsRead:e},typeof it<"u"&&(it.exports={listWorkOrderNotifications:c,markWorkOrderNotificationsRead:e})})()});var pn=U((Cr,st)=>{(function(){async function c(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:r}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:r||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:c},typeof st<"u"&&(st.exports={notifyRequestEmailer:c})})()});var mn=U(($r,ct)=>{(function(){async function c(n,t,r=[],s={}){let d=s.pathKey||"storage_path",o=s.urlKey||"signedUrl",i=s.expiresIn||600,l=s.onError;await Promise.all(r.map(async u=>{let p=u?.[d];if(!p)return;let{data:a,error:m}=await n.storage.from(t).createSignedUrl(p,i);if(m){u[o]="",typeof l=="function"&&l(u,m);return}u[o]=a?.signedUrl||""}))}function e(n={}){function t(r){if(!r||!n.getReady())return;let d=(n.getRows(r)||[]).filter(i=>i.storage_path&&!i.signedUrl),o=n.getSigningMap();!d.length||o[r]||(o[r]=!0,n.withOperationTimeout(c(n.supabaseClient(),n.bucketName,d),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(i=>{n.warn("Could not load signed file links",i)}).finally(()=>{delete o[r],n.getActiveGroupId()===r&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e},typeof ct<"u"&&(ct.exports={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e})})()});var fn=U((Pr,lt)=>{(function(){function c(t,r){if(t[r]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${r}`);return t[r]}function e(t={}){let r=c(t,"supabaseClient"),s=c(t,"workspaceUiState"),d=c(t,"applyRequestQueryFilters"),o=c(t,"applyWorkOrderListFilters"),i=c(t,"applyWorkOrderFilters"),l=c(t,"selectWorkOrders"),u=c(t,"countWorkOrdersQuery"),p=c(t,"fetchExactSearchedWorkOrderPage"),a=c(t,"isColumnSchemaError"),m=t.warn||(()=>{}),g=c(t,"LIST_ITEMS_PER_PAGE"),f=c(t,"WORK_ORDERS_PER_PAGE"),y=c(t,"REQUEST_RELATION_SELECT"),h=c(t,"REQUEST_ASSET_FALLBACK_SELECT"),b=c(t,"REQUEST_FALLBACK_SELECT"),w=c(t,"WORK_ORDER_RELATION_SELECT"),P=c(t,"WORK_ORDER_FALLBACK_SELECT");function $(){return typeof r=="function"?r():r}async function R(D=s.getRequestViewFilter(),W={}){let v=Math.max(1,s.getRequestsPage()),A=(v-1)*g,E=A+g-1,O=W.includeRelations===!1?b:W.includeLocationRelation===!1?h:y,q=await d($().from("maintenance_requests").select(O,{count:"exact"}),D).order("created_at",{ascending:!1}).range(A,E);return q.error&&W.includeLocationRelation!==!1&&a(q.error,["location_id","locations"])?R(D,{includeLocationRelation:!1}):q.error&&W.includeRelations!==!1?R(D,{includeRelations:!1}):!q.error&&q.count&&v>1&&A>=q.count?(s.setRequestsPage(Math.max(1,Math.ceil(q.count/g))),R(D,W)):q}async function C(D){let W=await d($().from("maintenance_requests").select("id",{count:"exact",head:!0}),D);return W.error?(m("Request count failed",W.error),0):W.count||0}async function k(){let[D,W,v]=await Promise.all([C("active"),C("converted"),C("all")]);return{active:D,converted:W,all:v}}async function S(D={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return p(D);let W=Math.max(1,s.getWorkOrderPage()),v=(W-1)*f,A=v+f-1,E=D.includeLocationRelation===!1?P:w,O=await o(l($(),E,{count:"exact"})).range(v,A);return!O.error&&O.count&&W>1&&v>=O.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(O.count/f))),S(D)):O}async function _(D={}){let W=await i(u($()),D);return W.error?(m("Work order count failed",W.error),0):W.count||0}async function M(){let[D,W,v,A,E,O,q,L]=await Promise.all([_({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),_({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:D,newWork:W,inProgress:v,blocked:A,overdue:E,completedAll:O,completedMonth:q,completedWeek:L}}async function N(){let[D,W,v,A,E,O,q,L]=await Promise.all([_({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),_({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:D,newWork:W,inProgress:v,blocked:A,overdue:E,completedAll:O,completedMonth:q,completedWeek:L}}return{fetchRequestPage:R,countRequests:C,loadRequestDashboardCounts:k,fetchWorkOrderPage:S,countWorkOrders:_,loadWorkOrderDashboardCounts:M,loadMyWorkDashboardCounts:N}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof lt<"u"&&(lt.exports=n)})()});var gn=U((Ar,ut)=>{(function(){function c(e={}){let n=e.windowRef||window,t=e.documentRef||document,r=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function d(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function o(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function i(g){l("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let f=null;if(g.code){let{data:y,error:h}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(h)throw h;f=y?.session||null}else if(g.accessToken&&g.refreshToken){let{data:y,error:h}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(h)throw h;f=y?.session||null}if(!f){let{data:y,error:h}=await e.supabaseClient.auth.getSession();if(h)throw h;f=y?.session||null}if(!f)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(f),o(),l("Verification complete. Loading workspace..."),await e.render()}catch(f){o(),u(f.message||"This verification link is invalid or expired.")}}function l(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallback(g)}function u(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function p(g=e.passwordRecoveryParamsFromUrl()){let f=!1,y="";if(g.accessToken&&g.refreshToken){let{data:h,error:b}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});f=!!(h?.session&&!b),b&&(y="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else y="This reset link is missing the secure session. Send a new password reset email and use the newest link.";m({ready:f,initialError:y})}function a(g="",f=""){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordResetRequest(g,f),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async y=>{y.preventDefault();let h=y.target,b=h.querySelector("button[type='submit']"),w=t.querySelector("#auth-error"),P=t.querySelector("#auth-status"),$=String(new FormData(h).get("email")||"").trim();w.textContent="",P.textContent="Sending reset link...",b.disabled=!0,b.textContent="Sending...";try{let{error:R}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail($,{redirectTo:d()}),"Password reset email timed out. Check your connection and try again.",2e4);if(R){P.textContent="",w.textContent=R.message;return}P.textContent="If that email exists in Supabase, a reset link has been sent."}catch(R){P.textContent="",w.textContent=R.message||"Could not send reset link."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Send Reset Link")}})}function m({ready:g=!1,initialError:f=""}={}){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordRecovery({ready:g,initialError:f}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{o(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{o(),a()}),t.querySelector("#password-recovery-form").addEventListener("submit",async y=>{if(y.preventDefault(),!g)return;let h=y.target,b=h.querySelector("button[type='submit']"),w=new FormData(h),P=String(w.get("password")||""),$=String(w.get("confirmPassword")||""),R=t.querySelector("#auth-error"),C=t.querySelector("#auth-status");if(R.textContent="",P.length<8){R.textContent="Password must be at least 8 characters.";return}if(P!==$){R.textContent="Passwords do not match.";return}C.textContent="Updating password...",b.disabled=!0,b.textContent="Updating...";try{let{error:k}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:P}),"Password update timed out. Try the newest reset link again.",2e4);if(k){C.textContent="",R.textContent=k.message;return}o();let{data:S}=await e.supabaseClient.auth.getSession();if(e.setSession(S.session),C.textContent=S.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",S.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(k){C.textContent="",R.textContent=k.message||"Could not update password."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:d,clearPasswordRecoveryUrl:o,startAuthCallback:i,renderAuthCallback:l,renderAuthCallbackError:u,startPasswordRecovery:p,renderPasswordResetRequest:a,renderPasswordRecovery:m}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:c},typeof ut<"u"&&(ut.exports={createAuthSessionFlow:c})})()});var hn=U((Rr,Oe)=>{(function(){function c(d,o){let i=o.getProfilesByUserId();if(d.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${o.escapeHtml(i[d.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(d.created_at).toLocaleString()}</span>
        <p>${o.escapeHtml(d.body)}</p>
      </article>
    `;if(d.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${o.photoMetaText(d)} &middot; ${o.escapeHtml(i[d.uploaded_by]?.full_name||"Team member")}</span>
        <p>${o.escapeHtml(d.file_name)}</p>
        ${d.signedUrl?`<a href="${o.escapeHtml(d.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(d.type==="part"){let u=o.partUsageUnitCost(d)*(Number(d.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(d.created_at).toLocaleString()} &middot; ${o.escapeHtml(i[d.created_by]?.full_name||"Team member")}</span>
        <p>${o.escapeHtml(d.parts?.name||"Part")} - ${Number(d.quantity_used)||0} used - ${o.money(u)}</p>
      </article>
    `}return`
    <article>
      <strong>${o.escapeHtml(d.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(d.created_at).toLocaleString()} \xC2\xB7 ${o.escapeHtml(i[d.actor_id]?.full_name||"Team member")}</span>
      <p>${o.escapeHtml(d.summary)}</p>
    </article>
  `}function e(d,o){let i=o.getProcedureTemplates(),l=o.getPartsUsedByWorkOrder(),u=o.getCommentsByWorkOrder(),p=o.getPhotosByWorkOrder(),a=o.getMessageThreads(),m=i.find(P=>P.id===d.procedure_template_id),g=m?o.checklistProgress(d,m):null,f=(l[d.id]||[]).length,y=(u[d.id]||[]).length,h=(p[d.id]||[]).length,b=a.filter(P=>P.work_order_id===d.id).length,w=[];return d.asset_id&&w.push(n("asset","Equipment",d.assets?.name||"Linked",o)),m&&g&&w.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,o)),f&&w.push(n("parts","Parts",String(f),o)),y&&w.push(n("comment","Comments",String(y),o)),b&&w.push(n("message","Messages",String(b),o)),h&&w.push(t(d.id,String(h),o)),w.length?`<div class="relationship-row">${w.join("")}</div>`:""}function n(d,o,i,l){return`
    <span class="relationship-chip ${d}" title="${l.escapeHtml(o)}">
      ${r(d)}
      <span>${l.escapeHtml(i)}</span>
    </span>
  `}function t(d,o,i){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${i.escapeHtml(d)}" title="Open photos">
      ${r("photo")}
      <span>${i.escapeHtml(o)}</span>
    </button>
  `}function r(d){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[d]||""}function s(d){return Object.freeze({renderActivityItem:o=>c(o,d),renderRelationshipChips:o=>e(o,d),relationshipChip:(o,i,l)=>n(o,i,l,d),photoJumpChip:(o,i)=>t(o,i,d),relationshipIcon:r})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Oe<"u"&&Oe.exports&&(Oe.exports={createRelationshipDisplayHelpers:s})})()});var yn=U((Er,dt)=>{(function(){function c(e){let n=e.segmentIcon,t=e.escapeHtml,r=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,d=e.isConvertedRequest,o=e.canDeleteOperationalRecords,i=e.canEditOperationalRecords||(()=>!0),l=e.getPendingDeleteRequestId,u=e.getProfilesByUserId;function p(f,y){return f==="converted"?`${y} converted`:f==="all"?`${y} total`:`${y} active`}function a(f,y,h={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",f.active],["converted","Converted",f.converted],["all","All",f.all]].map(([w,P,$])=>`
            <button class="segment ${y===w?"active":""}" data-request-filter="${w}" type="button" ${h.locked&&w!=="active"?"disabled":""}>
              ${n(w==="active"?"open":w==="converted"?"completed":"all")}${P} <span>${$}</span>
            </button>
          `).join("")}
        </div>
      `}function m(f){let y=d(f),h=i(),b=l()===f.id,w=u(),P=f.created_at?new Date(f.created_at):null,$=P&&!Number.isNaN(P.getTime())?P.toLocaleString():"date unavailable",R=f.assets?.name||f.locations?.name||"No equipment",C=f.requested_by_name||w[f.requested_by]?.full_name||"Requester",k=f.converted_by||f.reviewed_by||"",S=w[k]?.full_name||"",_=S?`Converted to work order by ${S}`:k?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",M=h&&o()?b?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${t(f.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${t(f.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${y?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${f.priority}">${t(f.priority)}</span>
                <span class="chip ${y?"completed":"open"}">${y?"converted":t(f.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${t(f.title)}</h3>
            <p>${t(f.description||"No description.")}</p>
            ${s(f)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(R)}</span>
              <span><strong>Requester</strong>${t(C)}</span>
              <span><strong>Received</strong>${t($)}</span>
            </div>
          </div>
          ${h&&!y&&f.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${f.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${f.id}" type="button">Convert to Work Order</button>
              ${M}
            </div>
          `:y?`
            <div class="request-actions request-converted-note">
              <span>${t(_)}</span>
              ${M}
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
      `}return{requestPanelSubtitle:p,renderRequestFilterBar:a,renderMaintenanceRequest:m,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:c},typeof dt<"u"&&(dt.exports={createRequestDisplayHelpers:c})})()});var bn=U((Or,pt)=>{(function(){function c({statusLabel:e,workOrderTypeLabel:n=E=>String(E||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:r,getWorkOrderFilter:s,getWorkOrderTypeFilter:d=()=>"all",getWorkOrderPriorityFilter:o=()=>"all",getWorkSort:i=()=>"newest",getWorkGroup:l=()=>"none",getActiveStatusFilter:u,getMyWorkFilter:p,getActiveSection:a,getDueState:m,getProcedureTemplates:g,getActiveWorkOrderId:f,getProfilesByUserId:y,getSession:h,STATUS_OPTIONS:b,TYPE_OPTIONS:w=[],OUTSIDE_VENDOR_VALUE:P,escapeHtml:$,cleanWorkOrderDescription:R,relationshipIcon:C,segmentIcon:k,isVendorAssigned:S,assignmentLabel:_,renderRelationshipChips:M,canAssignWorkOrderToMe:N,canManageTeam:D,renderProductionActionCard:W=()=>"",hasOpenProductionAction:v=()=>!1,hasUnreadProductionReady:A=()=>!1}){function E(){let T=r(),z=s(),K=u(),X=T?`${t(T)} Work`:z==="unassigned"?"Unassigned Work Orders":z==="vendor"?"Outside Vendor Work":z==="assigned"?"Assigned Work Orders":"Work Orders";return K==="active"||K==="all"?X==="Work Orders"?"Active Work Orders":`Active - ${X}`:`${e(K)} - ${X}`}function O(){let T=u();return T==="active"||T==="all"?"My Work":`${e(T)} - My Work`}function q(){return a()==="mywork"?O():E()}function L(T){let z=a(),K=p();return z==="mywork"?`${T} shown - ${z==="mywork"?K==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${T} shown`}function I(T,z,K){return`<option value="${$(T)}" ${T===K?"selected":""}>${$(z)}</option>`}function j(T){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[T]||"Any assignment"}function G(T){return T?T.charAt(0).toUpperCase()+T.slice(1):""}function H(T=[]){let z=u(),K=z==="all"?"active":z,X=s(),ee=r(),Z=d(),J=o(),ae=i(),te=l(),de=["completed","completed_month","completed_week"].includes(z),ie=K==="active"&&X==="all"&&!ee&&Z==="all"&&J==="all"&&ae==="newest"&&te==="none",F=T.find(ne=>ne.userId===ee),pe=[`Status: ${e(K)}`,`Assignment: ${j(X)}`,...F?[`Person: ${F.name}`]:[],...Z!=="all"?[`Type: ${n(Z)}`]:[],...J!=="all"?[`Priority: ${G(J)}`]:[]],he=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ue=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],x=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],se=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${pe.map(ne=>`<li><span>${$(ne)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${ie?"disabled":""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${K!=="active"?"is-active":""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${he.map(([ne,ge])=>I(ne,ge,K)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ue.map(([ne,ge])=>I(ne,ge,X)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${I("","Any team member",ee)}
                  ${T.map(ne=>I(ne.userId,ne.name,ee)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Z!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${I("all","Any type",Z)}
                  ${w.map(ne=>I(ne,n(ne),Z)).join("")}
                </select>
              </label>
              <label class="work-control-field ${J!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${I("all","Any priority",J)}
                  ${["critical","high","medium","low"].map(ne=>I(ne,G(ne),J)).join("")}
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
                  ${de?I("completed","Recently completed","completed"):x.map(([ne,ge])=>I(ne,ge,ae)).join("")}
                </select>
              </label>
              <label class="work-control-field ${te!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${se.map(([ne,ge])=>I(ne,ge,te)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function re(T,z){if(z==="assignee"){if(S(T))return{key:"vendor",label:"Outside vendor",order:900};if(!T.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let ee=_(T);return{key:`assignee:${T.assigned_to}`,label:ee,order:100}}if(z==="status"){let ee=["open","in_progress","blocked","completed"].indexOf(T.status);return{key:`status:${T.status}`,label:e(T.status),order:ee<0?99:ee}}if(z==="priority"){let ee=["critical","high","medium","low"].indexOf(T.priority);return{key:`priority:${T.priority}`,label:G(T.priority||"Unspecified"),order:ee<0?99:ee}}let K=T.type||"corrective",X=w.indexOf(K);return{key:`type:${K}`,label:n(K),order:X<0?99:X}}function B(T,z={}){if(!T.length)return'<p class="muted">No work orders match these filters.</p>';let K=z.groupBy||"none";if(K==="none")return`<div class="work-list" id="work-order-list">${T.map(V).join("")}</div>`;let X=new Map;return T.forEach(Z=>{let J=re(Z,K);X.has(J.key)||X.set(J.key,{...J,workOrders:[]}),X.get(J.key).workOrders.push(Z)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...X.values()].sort((Z,J)=>Z.order-J.order||Z.label.localeCompare(J.label)).map(Z=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${$(Z.label)}</h3>
                <span>${Z.workOrders.length}</span>
              </div>
              <div class="work-list">${Z.workOrders.map(V).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function V(T){let z=m(T),K=g().find(te=>te.id===T.procedure_template_id),X=T.created_at?new Date(T.created_at):null,ee=X&&!Number.isNaN(X.getTime())?X.toLocaleDateString():"",Z=T.status==="completed",J=Z?"Completed":e(T.status),ae=te=>te==="completed"?"Complete":e(te);return`
        <article class="work-card status-card status-${T.status} ${T.id===f()?"selected":""}" data-id="${T.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${T.priority}">${T.priority}</span>
              <span class="chip">${$(n(T.type))}</span>
              <span class="chip ${T.status}">${J}</span>
              ${z?`<span class="chip ${z.className}">${z.label}</span>`:""}
              ${A(T.id)?'<span class="chip production-ready">Production Ready</span>':""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${$(T.title)}</h3>
            <p>${$(R(T.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${C("asset")}${$(T.assets?.name||"General item / area")}</span>
            <span>${k(S(T)?"vendor":"mine")}${$(_(T))}</span>
            ${K?`<span>${C("procedure")}${$(K.name)}</span>`:""}
            <span>${k("due")}Due ${T.due_at||"unset"}</span>
            ${ee?`<span>${k("created")}Created ${$(ee)}</span>`:""}
            ${T.completed_at?`<span>${k("completed")}Completed ${new Date(T.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${M(T)}
          ${W(T)}
          <div class="quick-actions work-card-actions">
            ${!Z&&N(T)?`<button class="assign-action" data-assign-me="${T.id}" type="button">Assign to me</button>`:""}
            ${!Z&&D()?oe(T):""}
          ${b.filter(te=>te!==T.status&&!(te==="completed"&&v(T))).slice(0,3).map(te=>`
            <button data-quick-status="${te}" data-id="${T.id}" type="button">${ae(te)}</button>
          `).join("")}
        </div>
      </article>
    `}function oe(T){return`
        <form class="card-assign-form" data-card-assign="${T.id}">
          <select name="assigned_to" aria-label="Assign ${$(T.title)}">
            <option value="">Unassigned</option>
            <option value="${P}" ${S(T)?"selected":""}>Outside vendor</option>
            ${Object.entries(y()).map(([z,K])=>`<option value="${z}" ${!S(T)&&z===T.assigned_to?"selected":""}>${$(K.full_name||t(z))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function Y(T="",z={}){let K=T||"",X=z.managerOptions??D(),ee=z.allowUnassigned!==!1,Z=z.selfLabel||"Assign to me",J=[];return ee&&J.push(`<option value="" ${K===""?"selected":""}>Unassigned</option>`),J.push(`<option value="${h().user.id}" ${K===h().user.id?"selected":""}>${Z}</option>`),X&&(J.push(`<option value="${P}" ${K===P?"selected":""}>Outside vendor</option>`),J.push(...Object.entries(y()).filter(([ae])=>ae!==h().user.id).map(([ae,te])=>`<option value="${ae}" ${K===ae?"selected":""}>${$(te.full_name||t(ae))}</option>`))),J.join("")}function fe(T){return S(T)?P:T?.assigned_to||""}function le(T,z=""){let K=fe(T);return T?.status==="completed"?`
          <label ${z?`id="${z}"`:""}>Completed by / assigned to
            <input value="${$(_(T))}" disabled>
            <input name="assigned_to" type="hidden" value="${$(K)}">
          </label>
        `:D()?`
          <label ${z?`id="${z}"`:""}>Assign to
            <select name="assigned_to">
              ${Y(K,{managerOptions:!0})}
            </select>
          </label>
        `:!T.assigned_to&&!S(T)?`
          <label ${z?`id="${z}"`:""}>Assign to
            <select name="assigned_to">
              ${Y("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${z?`id="${z}"`:""}>Assigned to
          <input value="${$(_(T))}" disabled>
          <input name="assigned_to" type="hidden" value="${$(K)}">
        </label>
      `}return{workOrdersPanelTitle:E,myWorkPanelTitle:O,workQueuePanelTitle:q,workQueuePanelSubtitle:L,renderWorkOrderFilterToolbar:H,renderWorkOrderCollection:B,renderWorkOrderCard:V,renderCardAssignmentControl:oe,renderAssignmentSelect:Y,renderWorkOrderAssignmentField:le}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:c},typeof pt<"u"&&(pt.exports={createWorkQueueDisplayHelpers:c})})()});var wn=U((Wr,We)=>{(function(){function c(e={}){function n(){return e.getCompanyMembers().filter(a=>e.normalizeRole(a.role)==="production").map(a=>({userId:a.user_id,name:e.teamMemberName(a.user_id)})).sort((a,m)=>a.name.localeCompare(m.name))}function t(a){return a.production_action_assigned_to?e.teamMemberName(a.production_action_assigned_to):"Production owner not set"}function r(a){let m=e.activeCompanyRole();return["admin","manager"].includes(m)||a.production_action_assigned_to===e.getSession()?.user?.id}function s(a=""){return n().map(g=>`
        <option value="${e.escapeHtml(g.userId)}" ${g.userId===a?"selected":""}>${e.escapeHtml(g.name)}</option>
      `).join("")}function d(a,m={}){let g=n(),f=m.compact?" compact":"";if(!g.length)return'<p class="warning-text production-action-empty">Add a Production user in Team before assigning a Production Action.</p>';let y=g.some(h=>h.userId===a.production_action_assigned_to)?a.production_action_assigned_to:g[0].userId;return`
        <form class="production-action-form${f}" data-production-action-form="${e.escapeHtml(a.id)}">
          <label>Production action
            <textarea name="production_action" rows="${m.compact?2:3}" required placeholder="What does Production need to do?">${e.escapeHtml(a.production_action||"")}</textarea>
          </label>
          <label>Production owner
            <select name="production_action_assigned_to" required>
              ${s(y)}
            </select>
          </label>
          <p class="error-text" data-production-action-error="${e.escapeHtml(a.id)}"></p>
          <div class="button-row production-action-form-actions">
            <button class="secondary-button production-action-button" type="submit">${e.hasProductionAction(a)?"Save Production Action":"Assign Production Action"}</button>
            ${e.hasProductionAction(a)?`<button class="text-button danger-link" data-production-action-remove="${e.escapeHtml(a.id)}" type="button">Remove</button>`:""}
          </div>
        </form>
      `}function o(a){return!r(a)||a.status==="completed"?"":a.production_action_status==="open"?`<button class="secondary-button production-action-button" data-production-action-status="completed" data-work-order-id="${e.escapeHtml(a.id)}" type="button">Complete Production Action</button>`:`<button class="secondary-button production-action-button" data-production-action-status="open" data-work-order-id="${e.escapeHtml(a.id)}" type="button">Reopen Production Action</button>`}function i(a){let m=a.production_action_status==="completed";return`
        <div class="production-action-heading">
          <div class="chip-row">
            <span class="chip production-action-chip">Production Action</span>
            <span class="chip ${m?"status-completed":"status-open"}">${m?"Completed":"Open"}</span>
          </div>
          <strong>${e.escapeHtml(t(a))}</strong>
        </div>
        <p class="production-action-text">${e.escapeHtml(a.production_action)}</p>
        ${m&&a.production_action_completed_at?`<small>Completed ${e.escapeHtml(new Date(a.production_action_completed_at).toLocaleString())}</small>`:""}
      `}function l(a,m){let g=e.hasProductionAction(a),f=`production-action-dialog-${a.id}`;return`
        <dialog class="production-action-dialog" id="${e.escapeHtml(f)}" data-production-action-dialog="${e.escapeHtml(a.id)}" aria-labelledby="${e.escapeHtml(f)}-title">
          <div class="production-action-dialog-shell">
            <header class="production-action-dialog-header">
              <div>
                <small>Work order action</small>
                <h3 id="${e.escapeHtml(f)}-title">Production Action</h3>
              </div>
              <button class="text-button production-action-dialog-close" data-production-action-dialog-close type="button">Close</button>
            </header>
            <div class="production-action-dialog-body">
              ${g?i(a):'<p class="muted">No Production Action is assigned.</p>'}
              ${m?`
                <div class="button-row production-action-detail-actions">
                  ${g?o(a):""}
                </div>
                ${d(a)}
              `:""}
            </div>
          </div>
        </dialog>
      `}function u(a){let m=e.canEditOperationalRecords()&&a.status!=="completed",g=e.hasProductionAction(a);if(!g&&!m)return"";let f=a.production_action_status==="completed",y=`production-action-dialog-${a.id}`,h=g?t(a):"Not assigned",b=g?`${h} - ${a.production_action}`:h,w=g?"Manage Production Action":"Assign Production Action";return`
        <section class="production-action-control production-action-card-compact ${f?"is-completed":g?"is-open":"is-empty"}" data-production-action-control>
          <div class="production-action-card-copy">
            <div class="chip-row production-action-card-heading">
              <span class="chip production-action-chip">Production Action</span>
              ${g?`<span class="chip ${f?"status-completed":"status-open"}">${f?"Completed":"Open"}</span>`:'<span class="chip">None</span>'}
            </div>
            <p class="production-action-card-preview" title="${e.escapeHtml(b)}">${e.escapeHtml(b)}</p>
          </div>
          <button class="secondary-button production-action-card-open" data-production-action-dialog-open="${e.escapeHtml(a.id)}" type="button" aria-haspopup="dialog" aria-controls="${e.escapeHtml(y)}" aria-label="${w}" title="${w}">
            <span aria-hidden="true">${g?"...":"+"}</span>
          </button>
          ${l(a,m)}
        </section>
      `}function p(a){let m=e.canEditOperationalRecords()&&a.status!=="completed";return!e.hasProductionAction(a)&&!m?"":`
        <details class="work-detail-section production-action-detail" data-production-action-control open>
          <summary>Production Action</summary>
          ${e.hasProductionAction(a)?i(a):'<p class="muted">No Production Action is assigned.</p>'}
          ${m?`
            <div class="button-row production-action-detail-actions">
              ${e.hasProductionAction(a)?o(a):""}
            </div>
            ${d(a)}
          `:""}
        </details>
      `}return{productionMembers:n,productionAssigneeName:t,renderProductionActionCard:u,renderProductionActionDetail:p}}window.MaintainOpsProductionActionDisplay={createProductionActionDisplayHelpers:c},typeof We<"u"&&We.exports&&(We.exports={createProductionActionDisplayHelpers:c})})()});var vn=U((xr,mt)=>{(function(){function c(e={}){let n=e.getNotifications||(()=>[]),t=e.escapeHtml||(l=>String(l||"")),r=e.formatMessageTime||(l=>String(l||"")),s=Math.max(Number(e.visibleLimit)||12,1);function d(){return n().filter(l=>!l.read_at).length}function o(l){return n().some(u=>!u.read_at&&u.kind==="production_action_completed"&&u.work_order_id===l)}function i(){if(!e.getReady?.())return"";let l=n();if(!l.length)return"";let u=d(),p=l.slice(0,s);return`
        <details class="work-notification-panel" ${u?"open":""}>
          <summary>
            <span>Work notifications</span>
            <span>${u?`${u} new`:"Recent"}</span>
          </summary>
          <div class="work-notification-list">
            ${p.map(a=>`
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
      `}return{hasUnreadProductionReady:o,renderWorkOrderNotifications:i,unreadWorkOrderNotificationCount:d}}window.MaintainOpsWorkOrderNotificationDisplay={createWorkOrderNotificationDisplayHelpers:c},typeof mt<"u"&&(mt.exports={createWorkOrderNotificationDisplayHelpers:c})})()});var kn=U((Mr,xe)=>{(function(){function c({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:r,getPhotosByWorkOrder:s,teamMemberName:d}){function o(l){return`
        <article class="mini-work-order" data-mini-work-order="${l.id}">
          <strong>${e(l.title)}</strong>
          <span>${n(l.status)} - ${l.due_at||"no due date"}</span>
        </article>
      `}function i(l){let u=(r()[l.id]||[]).length,p=(s()[l.id]||[]).length,a=l.completed_at?new Date(l.completed_at).toLocaleDateString():"",m=l.completed_by?d(l.completed_by):"",g=!m&&l.assigned_to?d(l.assigned_to):"",f=m?` by ${e(m)}`:g?` - owner ${e(g)}`:"",y=l.resolution_summary||l.completion_notes||"";return`
        <article class="mini-work-order ${l.status==="completed"?"completed-history":""}" data-mini-work-order="${l.id}">
          <div class="chip-row">
            <span class="chip ${l.status}">${n(l.status)}</span>
            ${l.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${u?`<span class="relationship-chip parts">${t("parts")}<span>${u}</span></span>`:""}
            ${p?`<span class="relationship-chip photo">${t("photo")}<span>${p}</span></span>`:""}
          </div>
          <strong>${e(l.title)}</strong>
          <span>${a?`Completed ${a}${f}`:`Due ${l.due_at||"unset"}`}</span>
          ${l.failure_cause?`<p><b>Finding:</b> ${e(l.failure_cause)}</p>`:""}
          ${y?`<p><b>Resolution:</b> ${e(y)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:o,renderAssetMiniWorkOrder:i}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:c},typeof xe<"u"&&xe.exports&&(xe.exports={createMiniWorkOrderDisplayHelpers:c})})()});var _n=U((Tr,ft)=>{(function(){function c({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:r,getParts:s,getPartDocumentsByPartId:d,getPartDocumentsReady:o,getPendingDeletePartId:i,getShowPartSourceManager:l,getPartCostsReady:u,getPartInventoryFilter:p,getPartSearchQuery:a,partUsageRows:m,canDeleteParts:g,canEditOperationalRecords:f=()=>!0,renderPartSourceOptions:y,renderPartMachineOptions:h,renderPartSourceManager:b}){let w=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],P=w.reduce((v,[A,E])=>(v[A]=E.replace(/s$/,""),v),{});function $(v){return v.document_type?v.document_type:String(v.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(v.file_name||"")?"invoice":/receipt/i.test(v.file_name||"")?"receipt":/schematic|diagram/i.test(v.file_name||"")?"schematic":/print|drawing/i.test(v.file_name||"")?"part_print":/manual/i.test(v.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(v.file_name||"")?"spec_sheet":"other"}function R(){return w.map(([v,A])=>`
        <option value="${v}">${e(P[v]||A)}</option>
      `).join("")}function C(v){let A=$(v),E=String(v.content_type||"").startsWith("image/"),O=P[A]||"File",q=v.created_at?new Date(v.created_at).toLocaleString():"Uploaded",L=v.file_size_bytes?`${Math.round(Number(v.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${E?"image-file":""}">
          ${E&&v.signedUrl?`<a class="part-document-thumb" href="${e(v.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(v.signedUrl)}" alt="${e(v.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(O)}</span>
              ${L?`<span class="chip">${e(L)}</span>`:""}
            </div>
            <strong>${e(v.file_name)}</strong>
            <span>${e(q)}</span>
            ${v.original_file_name&&v.original_file_name!==v.file_name?`<small>Original: ${e(v.original_file_name)}</small>`:""}
            ${v.signedUrl?`<a href="${e(v.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function k([v,A],E){let O=E.filter(q=>$(q)===v);return O.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(A)}</h4>
            <span>${O.length}</span>
          </div>
          <div class="part-document-grid">
            ${O.map(C).join("")}
          </div>
        </section>
      `:""}function S(v){let A=v.reduce((O,q)=>{let L=$(q);return O[L]=(O[L]||0)+1,O},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(O=>A[O]).map(O=>`<span class="chip">${A[O]} ${e(P[O]||"file")}${A[O]===1?"":"s"}</span>`).join("")}function _(v){let A=Number(v.quantity_on_hand)||0,E=Number(v.reorder_point)||0,O=Number(v.unit_cost)||0,q=A<=E,L=Math.max(0,E-A);return`
        <article class="part-card part-tile ${q?"low-stock":""}" data-open-part="${v.id}" tabindex="0" role="button" aria-label="Open ${e(v.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${v.sku?`<span class="chip">${e(v.sku)}</span>`:""}
              ${v.supplier_name?`<span class="chip part-source-chip">${e(v.supplier_name)}</span>`:""}
              ${v.machine_note?`<span class="chip">${e(v.machine_note)}</span>`:""}
              ${q?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(v.name)}</h3>
            <div class="part-card-meta">
              <span>${A} on hand</span>
              <span>reorder at ${E}</span>
              <span>${u()?`${n(O)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${q&&E>0?`<small>Need ${L} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function M(){let v=s().filter(r),A=v.filter(t).length,E=p();return[["All Parts",v.length,"all"],["Low Stock",A,"low"]].map(([O,q,L])=>`
        <button class="parts-health ${L==="low"&&q?"attention":""} ${E===L?"active":""}" data-part-inventory-filter="${L}" type="button">
          <span>${O}</span>
          <strong>${q}</strong>
        </button>
      `).join("")}function N(v="default"){return`
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
              <option value="default" ${v==="default"?"selected":""}>Default</option>
              <option value="source" ${v==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function D(v){let A=Number(v.quantity_on_hand)||0,E=Number(v.reorder_point)||0,O=Number(v.unit_cost)||0,q=d()[v.id]||[],L=S(q),I=f();return`
        <section class="part-detail-shell">
          ${I?y():""}
          ${h()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${v.sku?`<span class="chip">${e(v.sku)}</span>`:""}
                ${v.supplier_name?`<span class="chip part-source-chip">${e(v.supplier_name)}</span>`:""}
                ${v.machine_note?`<span class="chip">${e(v.machine_note)}</span>`:""}
                <span class="chip ${A<=E?"overdue":"open"}">${A<=E?"low stock":"stocked"}</span>
              </div>
              <h3>${e(v.name)}</h3>
              <p>${A} on hand - reorder at ${E}</p>
              ${L?`<div class="chip-row part-file-summary">${L}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${I?`<div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${v.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${e(v.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${v.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${e(v.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>`:""}
          </section>

          ${I?`<form class="part-detail-form relationship-detail parts" data-edit-part="${v.id}">
            <label>Name<input name="name" required value="${e(v.name)}"></label>
            <label>SKU<input name="sku" value="${e(v.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e(v.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e(v.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${A}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${E}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${O}"></label>
            <p class="error-text" data-part-edit-error="${v.id}"></p>
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
            ${I?`<form class="part-document-form" data-part-document="${v.id}">
              <label>File type<select name="document_type">${R()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${v.id}">${o()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${o()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${q.length?w.map(j=>k(j,q)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${I?W(v):""}
        </section>
      `}function W(v){let A=m(v.id).length,E=d()[v.id]||[],O=i()===v.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${A?`This part has ${A} usage record${A===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${E.length?` and ${E.length} filed receipt/invoice record${E.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${A?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:O?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${e(v.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${e(v.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-part="${e(v.id)}" type="button">Delete Part</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:_,renderPartsHealth:M,renderPartSearch:N,renderPartDetail:D,renderPartDangerZone:W}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:c},typeof ft<"u"&&(ft.exports={createPartsDisplayHelpers:c})})()});var Sn=U((Dr,gt)=>{(function(){function c({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:r,getAppIssueReportsReady:s,getAppIssueReports:d}){function o(){let u=s();return`
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
            <p class="error-text" id="app-issue-report-error">${u?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${u?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function i(u){let p={open:0,reviewing:1,resolved:2};return[...u].sort((a,m)=>{let g=(p[a.status||"open"]??1)-(p[m.status||"open"]??1);return g||new Date(m.created_at||0)-new Date(a.created_at||0)})}function l(){if(!e())return"";let u=s(),p=d(),a=i(p);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${u?`${p.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${u?`
            <div class="issue-report-list">
              ${a.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:o,renderAppIssueReportsPanel:l,sortedAppIssueReports:i}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:c},typeof gt<"u"&&(gt.exports={createAppIssuePanelDisplayHelpers:c})})()});var qn=U((Ir,ht)=>{(function(){function c(e){let n=e.escapeHtml,t=e.getDueState,r=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,d=e.canEditOperationalRecords||(()=>!0);function o(){return e.getPreventiveSchedules().filter(p=>e.matchesActiveLocation(p)&&e.matchesSearch([p.title,p.frequency,p.next_due_at,p.assets?.name]))}function i(){return e.getProcedureTemplates().filter(p=>e.matchesSearch([p.name,p.description,...(p.procedure_steps||[]).map(a=>a.prompt)]))}function l(p){let a=t({due_at:p.next_due_at,status:"open"}),m=e.getPendingDeleteScheduleId()===p.id,g=d();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${n(p.frequency)}</span>
              ${a?`<span class="chip ${a.className}">${a.label}</span>`:""}
            </div>
            <h3>${n(p.title)}</h3>
            <p>${n(p.assets?.name||"No equipment")} - Next due ${p.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${p.id}" type="button">Generate Work</button>
            ${s()?m?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${n(p.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${n(p.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function u(p){let a=e.getWorkOrders().filter(h=>h.procedure_template_id===p.id).length,m=e.getPreventiveSchedules().filter(h=>h.procedure_template_id===p.id).length,g=r({workOrders:a,schedules:m}),f=e.getPendingDeleteProcedureId()===p.id,y=d();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${p.procedure_steps?.length||0} steps</span>
              <span class="chip">${a} linked work orders</span>
              ${m?`<span class="chip">${m} PM schedules</span>`:""}
            </div>
            <h3>${n(p.name)}</h3>
            <p>${n(p.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(p.procedure_steps||[]).map(h=>`
              <div class="checklist-step">
                <span>${h.position}. ${n(h.prompt)}</span>
                <small>${n(h.response_type)} ${h.required?"- required":"- optional"}</small>
              </div>
            `).join("")||'<p class="muted">No steps yet.</p>'}
          </div>
          ${y?`<form class="inline-form add-step-form relationship-detail procedure" data-add-step="${p.id}">
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
            <p class="error-text" data-step-error="${p.id}"></p>
            <button class="secondary-button" type="submit">Add Step</button>
          </form>`:""}
          ${y&&s()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${g||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${n(p.id)}"></p>
              ${g?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:f?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${n(p.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${n(p.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${n(p.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:o,filteredProcedureTemplates:i,renderPreventiveSchedule:l,renderProcedureTemplate:u}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:c},typeof ht<"u"&&(ht.exports={createMaintenanceListDisplayHelpers:c})})()});var Cn=U((Fr,yt)=>{(function(){function c(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:r,checklistProgress:s,requiredChecklistProgress:d,escapeHtml:o,cleanWorkOrderDescription:i,renderRelationshipChips:l,renderWorkOrderCommandSummary:u,renderWorkOrderRecommendation:p,statusLabel:a,normalizeWorkOrderType:m=E=>String(E||"corrective"),workOrderTypeLabel:g=E=>String(E||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),hasCompletedSafetyDeviceCheck:f,canAssignWorkOrderToMe:y,renderAssetOptions:h,assetLocationRoutingMessage:b,renderWorkOrderAssignmentField:w,requiresSafetyDeviceCheck:P,renderWorkOrderMessages:$,renderProcedureOptions:R,money:C,photoMetaText:k,renderActivityItem:S,canDeleteWorkOrders:_,canEditOperationalRecords:M=()=>!0,renderProductionActionDetail:N=()=>"",hasOpenProductionAction:D=()=>!1}=e;function W(E,O){let q=e.getStepResultsByWorkOrder()[E.id]?.[O.id],L=q?.value||"",I=`data-step-result="${O.id}" data-work-order-id="${E.id}"`,j=`<input ${I} value="${o(L)}" placeholder="Result">`;return O.response_type==="checkbox"&&(j=`<label class="check-row"><input ${I} type="checkbox" ${L==="checked"?"checked":""}> Done</label>`),O.response_type==="pass_fail"&&(j=`
          <select ${I}>
            <option value="">Not checked</option>
            <option value="pass" ${L==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${L==="fail"?"selected":""}>Fail</option>
          </select>
        `),O.response_type==="number"&&(j=`<input ${I} type="number" value="${o(L)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${O.position}. ${o(O.prompt)} ${O.required?'<small class="required-mark">Required</small>':""}</span>
          ${j}
          ${q?.completed_at?`<small>Recorded ${new Date(q.completed_at).toLocaleString()}</small>`:""}
        </div>
      `}function v(E){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===E.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${o(E.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${E.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${E.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function A(){let E=e.getActiveWorkOrderId(),q=e.getWorkOrders().find(F=>F.id===E);if(!q)return n();let L=e.getCommentsByWorkOrder(),I=e.getPhotosByWorkOrder(),j=e.getEventsByWorkOrder(),G=e.getPartsUsedByWorkOrder(),H=e.getProcedureTemplates(),re=e.getWorkOrderActionWarningId(),B=e.getWorkOrderActionWarning(),V=e.getParts(),oe=e.getProfilesByUserId(),Y=e.getCommentsError(),fe=e.STATUS_OPTIONS||[],le=e.TYPE_OPTIONS||[],T=L[q.id]||[],z=I[q.id]||[],K=j[q.id]||[],X=G[q.id]||[],ee=X.reduce((F,pe)=>F+(Number(pe.quantity_used)||0)*t(pe),0),Z=X.reduce((F,pe)=>F+(Number(pe.quantity_used)||0),0),J=r(T,z,K,X),ae=H.find(F=>F.id===q.procedure_template_id),te=ae?s(q,ae):null,de=ae?d(q,ae):null,ie=M();return`
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
          ${q.asset_id&&f(q)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${q.completion_notes?`<p>${o(q.completion_notes)}</p>`:""}
        </div>

        ${u(q)}
        ${p(q)}
        ${N(q)}

        ${q.completed_at&&(q.failure_cause||q.resolution_summary||q.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${q.failure_cause?`<article><span>Cause</span><strong>${o(q.failure_cause)}</strong></article>`:""}
            ${q.resolution_summary?`<article><span>Resolution</span><strong>${o(q.resolution_summary)}</strong></article>`:""}
            ${q.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${ie?`<label>Status
          <select id="status-select">
            ${fe.map(F=>`<option value="${F}" ${F===q.status?"selected":""} ${F==="completed"&&D(q)?"disabled":""}>${a(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${ie?`<div class="quick-actions detail-quick-actions">
          ${y(q)?`<button class="assign-action" data-assign-me="${q.id}" type="button">${q.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${fe.filter(F=>F!==q.status&&!(F==="completed"&&D(q))).map(F=>`
            <button data-quick-status="${F}" data-id="${q.id}" type="button">${a(F)}</button>
          `).join("")}
        </div>`:""}
        ${re===q.id&&B?`<p class="error-text action-warning">${o(B)}</p>`:""}

        ${ie?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
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
                    ${h(q.asset_id||"")}
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
            ${w(q,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${R(q.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${q.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${P(q)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${q.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
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

        ${ie?`<details class="work-detail-section relationship-detail asset">
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
              ${le.map(F=>`<option value="${F}" ${F===m(q.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${w(q)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${R(q.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${o(q.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${o(q.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${q.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${P(q)?`
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

        ${ae?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${o(ae.name)}</h3>
              <span>${te.done} of ${te.total} complete \xC2\xB7 required ${de.done}/${de.total}</span>
            </div>
            <div class="checklist-list">
              ${ae.procedure_steps.map(F=>ie?W(q,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${o(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${o(e.getStepResultsByWorkOrder()[q.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${ie&&q.status!=="completed"?`
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
            ${P(q)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${f(q)?"checked":""}>
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
        ${ie?`<form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${V.map(F=>`<option value="${F.id}">${o(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${X.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${C(ee)}</span></article>`:""}
          ${X.map(F=>`
            <article class="relationship-detail parts">
              <strong>${o(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${C((Number(F.quantity_used)||0)*t(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${o(oe[F.created_by]?.full_name||"Team member")}</small>
            </article>
          `).join("")||'<p class="muted">No parts used yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos</summary>
        ${ie?`<form class="form-grid relationship-detail photo" id="photo-form">
          <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Images only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
          <p class="error-text" id="photo-error"></p>
          <button class="secondary-button" type="submit">Upload Photo</button>
        </form>`:""}

        <div>
          <h3>Photos</h3>
          <div class="photo-list">
            ${z.map(F=>`
              <article class="relationship-detail photo">
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${o(F.signedUrl)}" alt="${o(F.file_name)}">`:""}
                <strong>${o(F.file_name)}</strong>
                <span>${k(F)}</span>
                ${F.signedUrl?`<a href="${o(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${ie?`<button class="text-button danger-link" data-delete-work-order-photo="${o(F.id||"")}" data-work-order-photo-path="${o(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
              </article>
            `).join("")||'<p class="muted">No photos uploaded yet.</p>'}
          </div>
        </div>
        </details>

        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        ${ie?`<form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>`:""}
        <div class="comment-list">
          ${T.map(F=>`
            <article class="relationship-detail comment">
              <strong>${o(oe[F.author_id]?.full_name||"Team member")}</strong>
              <span>${F.created_at?new Date(F.created_at).toLocaleString():""}</span>
              <p>${o(F.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${Y?`<p class="error-text">${o(Y)}</p>`:""}
          ${J.map(S).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${ie&&_()?v(q):""}
      </div>
    `}return{renderWorkOrderDetail:A}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:c},typeof yt<"u"&&(yt.exports={createWorkOrderDetailDisplayHelpers:c})})()});var $n=U((Lr,bt)=>{(function(){function c(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:c},typeof bt<"u"&&(bt.exports={createEquipmentStructureGuideDisplayHelpers:c})})()});var Pn=U((Nr,wt)=>{(function(){function c(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:r,escapeHtml:s,assetTypeLabel:d,renderParentAssetOptions:o,renderLocationOptions:i,renderAssetAreaOptions:l,assetStatusLabel:u,renderAssetMiniWorkOrder:p,assetDeleteBlockerMessage:a,canDeleteEquipment:m,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:f,renderProcedureOptions:y}=e;function h(){let k=new Date;return new Date(k.getTime()-k.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function b(k,S,_){let M=S.some(v=>v.event_type==="created"),N=k.created_at&&!M?[{id:`${k.id}-created`,event_type:"created",summary:`${d(k.asset_type)} created.`,actor_id:k.created_by||"",created_at:k.created_at}]:[];return{equipmentHistory:[...S,...N].sort((v,A)=>new Date(A.created_at||0)-new Date(v.created_at||0)),historyActorLabel:v=>v.actor_id&&_[v.actor_id]?.full_name?_[v.actor_id].full_name:v.actor_id?`User ${String(v.actor_id).slice(0,8)}`:v.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function w(k,S){return k.map(_=>`
        <article>
          <strong>${s(String(_.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${_.created_at?new Date(_.created_at).toLocaleString():"time unavailable"} &middot; ${s(S(_))}</span>
          <p>${s(_.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function P(){let k=e.getAssets(),S=e.getActiveAssetId(),_=k.find(j=>j.id===S);if(!_)return n();let M=e.getAssetEventsReady?.()!==!1,N=e.getProfilesByUserId?.()||{},D=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((j,G)=>new Date(G.created_at||0)-new Date(j.created_at||0)),{equipmentHistory:W,historyActorLabel:v}=b(_,D,N),A=e.LIST_ITEMS_PER_PAGE||12,E=Math.max(1,Math.ceil(W.length/A)),O=Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,"asset-history")||1),E),q=W.length?(O-1)*A+1:0,L=Math.min(W.length,O*A),I=W.slice((O-1)*A,O*A);return`
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
              ${M?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${w(I,v)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${W.length>A?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(_.id)}" type="button" ${O<=1?"disabled":""}>Previous</button>
                <span>Showing ${q}-${L} of ${W.length} - Page ${O} of ${E}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(_.id)}" type="button" ${O>=E?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function $(){let k=e.getAssets(),S=e.getActiveAssetId(),_=k.find(x=>x.id===S);if(!_)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(_.id);let M=e.getWorkOrders(),N=e.getPreventiveSchedules(),D=e.getParts(),W=e.getAssetParts(),v=e.getAssetPartsReady(),A=e.getAssetDocumentsByAssetId?.()[_.id]||[],E=e.getAssetDocumentsReady?.()!==!1,O=e.getAssetEventsReady?.()!==!1,q=e.getProfilesByUserId?.()||{},L=e.getPartsUsedByWorkOrder(),I=e.getLocations(),j=e.getActiveLocationId(),G=e.ASSET_TYPE_OPTIONS||[],H=t(_),re=r(_.id),B=M.filter(x=>x.asset_id===_.id),V=B.filter(x=>x.status!=="completed").sort((x,se)=>new Date(se.created_at||0)-new Date(x.created_at||0)),oe=B.filter(x=>x.status==="completed").sort((x,se)=>new Date(se.completed_at||se.created_at||0)-new Date(x.completed_at||x.created_at||0)),Y=N.filter(x=>x.asset_id===_.id),fe=Object.values(L).flat().filter(x=>B.some(se=>se.id===x.work_order_id)),le=W.filter(x=>x.asset_id===_.id),T=new Set(le.map(x=>x.part_id)),z=D.filter(x=>!T.has(x.id)),K=(e.getAssetEventsByAssetId?.()[_.id]||[]).sort((x,se)=>new Date(se.created_at||0)-new Date(x.created_at||0)),{equipmentHistory:X}=b(_,K,q),ee=e.LIST_ITEMS_PER_PAGE||12,Z=x=>e.getAssetRelationshipOpen?.(_.id,x)||!1,J=(x,se)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(_.id,x)||1),Math.max(1,Math.ceil(se/ee))),ae=(x,se)=>{let ne=J(se,x.length);return x.slice((ne-1)*ee,ne*ee)},te=(x,se)=>{if(se<=ee)return"";let ne=J(x,se),ge=Math.max(1,Math.ceil(se/ee)),ye=(ne-1)*ee+1,ce=Math.min(se,ne*ee);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${ne<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${ce} of ${se} - Page ${ne} of ${ge}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(_.id)}" data-asset-relation-section="${s(x)}" type="button" ${ne>=ge?"disabled":""}>Next</button>
          </div>
        `},de=x=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(x)}" data-asset-id="${s(_.id)}" ${Z(x)?"open":""}`,ie=I.find(x=>x.id===_.location_id)?.name||_.location||"No location set",F=H?H.name:"Top level equipment",pe=_.status==="offline"?"status-blocked":_.status==="degraded"?"status-open":_.status==="watch"?"status-in_progress":"status-completed",he=_.status==="degraded"&&V.length===0,ue=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${_.status}">${s(u(_.status))}</span>
              <span class="chip">${s(d(_.asset_type))}</span>
              ${_.asset_code?`<span class="chip">${s(_.asset_code)}</span>`:""}
              ${_.manufacturer?`<span class="chip">${s(_.manufacturer)}</span>`:""}
              ${_.model?`<span class="chip">${s(_.model)}</span>`:""}
              ${_.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(_.name)}</h2>
            <p>${s(_.location||"No location set")}</p>
            ${H?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(H.id)}" type="button">${s(H.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${pe}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(u(_.status))}</strong>
              <small>${_.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(ie)}</strong>
              <small>${_.location?s(_.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(F)}</strong>
              <small>${H?"Linked under parent equipment":"Primary / standalone item"}</small>
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
            <button class="command-card status-open ${V.length?"":"empty"}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong>${V.length}</strong>
              <small>${V.length?"Active work tied to this equipment":"No open work"}</small>
            </button>
            <button class="command-card command-photo ${A.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${A.length}</strong>
              <small>${A.length?"Machine files on record":"No machine files yet"}</small>
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
              <span>${A.length} file${A.length===1?"":"s"}</span>
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
              <p class="error-text" data-asset-document-error="${s(_.id)}">${E?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${E?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${A.map(x=>`
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
                ${G.map(x=>`<option value="${x}" ${x===(_.asset_type||"machine")?"selected":""}>${d(x)}</option>`).join("")}
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
                  <span>${s(d(x.asset_type))} - ${s(u(x.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${de("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${V.length}</span></summary>
            <div class="mini-list">
              ${Z("open-work")?ae(V,"open-work").map(p).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${Z("open-work")?te("open-work",V.length):""}
          </details>

          <details ${de("completed-history")}>
            <summary>Completed History <span>${oe.length}</span></summary>
            <div class="mini-list">
              ${Z("completed-history")?ae(oe,"completed-history").map(p).join("")||'<p class="muted">No completed work yet.</p>':'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${Z("completed-history")?te("completed-history",oe.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${X.length} event${X.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(_.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${O?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${Y.length} schedule${Y.length===1?"":"s"}</span>
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
                ${y?y():'<option value="">No procedure checklist</option>'}
              </select>
              <span class="date-picker-row inline-date-picker" data-date-picker-field>
                <input name="next_due_at" type="date" value="${h()}" required>
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
              <p class="error-text" data-pm-error></p>
              <button class="secondary-button asset-action-button" type="submit">Add Schedule</button>
            </form>`:""}
            <div class="mini-list">
              ${Y.map(x=>`<article><strong>${s(x.title)}</strong><span>${x.frequency} - next due ${x.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(_.id)}" ${Z("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${le.length}</span></summary>
            <div class="panel-header compact">
              ${ue?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${Z("linked-parts")&&v?`
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
                ${ae(le,"linked-parts").map(x=>`<article>
                  <strong>${s(x.parts?.name||"Part")}</strong>
                  <span>${s(x.parts?.sku||"No SKU")} - recommended qty ${s(x.quantity_recommended||1)}${x.note?` - ${s(x.note)}`:""}</span>
                  ${ue?`<button class="text-button danger-link" data-remove-asset-part="${s(x.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${te("linked-parts",le.length)}
            `:v?'<p class="muted">Open this section to review or attach linked parts for this equipment.</p>':'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(_.id)}" ${Z("parts-used")?"open":""}>
            <summary>Parts Used History <span>${fe.length}</span></summary>
            <div class="mini-list">
              ${Z("parts-used")?ae(fe,"parts-used").map(x=>`<article><strong>${s(x.parts?.name||"Part")}</strong><span>${x.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${Z("parts-used")?te("parts-used",fe.length):""}
          </details>

          ${ue?R(_):""}
        </div>
      `}function R(k){let S=e.getWorkOrders(),_=e.getPreventiveSchedules(),M=e.getAssets(),N=e.getActiveAssetId(),D=S.filter(q=>q.asset_id===k.id).length,W=_.filter(q=>q.asset_id===k.id).length,v=M.filter(q=>q.parent_asset_id===k.id).length,A=e.getMaintenanceRequests().filter(q=>q.asset_id===k.id).length,E=a({workOrders:D,children:v,schedules:W,requests:A}),O=e.getPendingDeleteAssetId()===N;return m()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${E||`This permanently removes "${s(k.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${E?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:O?`
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
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function C(k){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[k]||"File"}return{renderAssetDetail:$,renderAssetHistoryScreen:P}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:c},typeof wt<"u"&&(wt.exports={createAssetDetailDisplayHelpers:c})})()});var An=U((Ur,vt)=>{(function(){function c(e={}){let{filteredMessageThreads:n,totalUnreadMessages:t,teamMemberName:r,escapeHtml:s,messageComposerScopeNote:d,recentMessageLinkWorkOrders:o,statusLabel:i,renderMessageThreadButton:l,messageThreadScopeLabel:u,renderMessageList:p,renderWorkOrderNotifications:a=()=>""}=e,m=e.canEditOperationalRecords||(()=>!0);function g(y){let h=String(y||"?").trim().split(/\s+/).filter(Boolean);return(h.length?h.map(b=>b[0]).join(""):"?").slice(0,2).toUpperCase()}function f(){if(!e.getMessagesReady())return'<p class="error-text" role="alert">Messages are unavailable.</p><button data-retry-messages type="button">Try again</button>';let h=e.getMessageThreads(),b=e.getActiveMessageThreadId(),w=e.getMessagesByThreadId(),P=e.getWorkOrders(),$=e.getMessageComposerWorkOrderId(),R=e.getMessageComposerOpen(),C=e.getCompanyMembers(),k=e.getSession(),S=e.getMessageWorkOrderLinksReady(),_=e.getMessageSearchQuery(),M=e.getMessageThreadFilter(),N=C.filter(B=>B.user_id!==k.user.id).sort((B,V)=>r(B.user_id).localeCompare(r(V.user_id))),D=m(),W=h.find(B=>B.id===b),v=e.getMessageHistory?.()[W?.id],A=!!(W&&e.getMessageHistory&&!v),E=W?(v?.rows||w[W.id]||[]).filter(B=>!B.deleted_at):[],O=W?(w[W.id]||[]).filter(B=>!B.deleted_at).length:0,q=n(),L=e.getMessageThreadsPage(),I=Math.max(1,Math.ceil(q.length/e.LIST_ITEMS_PER_PAGE)),j=Math.min(Math.max(L,1),I),G=q.slice((j-1)*e.LIST_ITEMS_PER_PAGE,j*e.LIST_ITEMS_PER_PAGE),H=P.find(B=>B.id===$),re=B=>{let V=r(B.user_id);return`
          <button class="message-person-card" data-message-person="${s(B.user_id)}" title="Message ${s(V)}" type="button">
            <span class="message-person-avatar" aria-hidden="true">${s(g(V))}</span>
            <span class="message-person-name">${s(V)}</span>
          </button>
        `};return`
        <section class="message-center ${W?"has-active-thread":""}" data-thread-id="${s(W?.id||"")}">
          ${e.getMessageLoadError?.()?`<p class="error-text" role="alert">${s(e.getMessageLoadError())} <button data-retry-messages type="button">Try again</button></p>`:""}
          <div class="message-layout">
            <aside class="message-thread-rail">
              <div class="message-rail-header">
                <div>
                  <h3>Messages</h3>
                  <p>${t()} unread</p>
                </div>
              </div>
              ${a()}
              ${D?`<div class="message-people-strip" aria-label="Company message contacts">
                ${N.map(re).join("")||'<span class="muted">No teammates added yet.</span>'}
              </div>`:""}
              ${D?`<form class="message-thread-form" id="message-thread-form">
                <details ${R||H?"open":""}>
                  <summary>New message</summary>
                  <div class="message-thread-fields">
                    <label>Send to
                      <select name="thread_type" id="message-thread-type">
                        <option value="location">Location topic (company team)</option>
                        <option value="direct">Direct message</option>
                      </select>
                    </label>
                    <label class="message-direct-field">Person
                      <select name="direct_user_id">
                        ${N.map(B=>`<option value="${B.user_id}">${s(r(B.user_id))}</option>`).join("")||'<option value="">No teammates yet</option>'}
                      </select>
                    </label>
                    <div class="message-scope-note" id="message-scope-note">${s(d("location"))}</div>
                    <label>Subject<input name="title" required placeholder="Thread subject" value="${H?`Work order: ${s(H.title)}`:""}"></label>
                    ${H?`
                      <input name="work_order_id" type="hidden" value="${H.id}">
                      <div class="message-linked-draft">
                        <span>Linked work order</span>
                        <strong>${s(H.title)}</strong>
                        <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                      </div>
                    `:`
                      <label>Recent work order
                        <select name="work_order_id" ${S?"":"disabled"}>
                          <option value="">No work order</option>
                          ${o().map(B=>`<option value="${B.id}">${s(B.title)} - ${i(B.status)}</option>`).join("")}
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
                <input id="message-search" type="search" aria-label="Search subjects or people" value="${s(_)}" placeholder="Search subjects or people">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[["all","All"],["unread","Unread"],...h.some(B=>B.thread_type==="company")?[["company","Company"]]:[],["location","Location"],["direct","Direct"]].map(([B,V])=>`<button class="${M===B?"active":""}" aria-pressed="${M===B}" data-message-filter="${B}" type="button">${V}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${G.map(l).join("")||'<p class="muted">No threads match this filter.</p>'}
              </div>
              ${e.renderListPagination("messages",q.length,j,I)}
            </aside>
            <section class="message-thread-detail">
              ${W?`
                <div class="message-chat-header">
                  <div>
                    <button class="text-button" data-message-back type="button">Back to conversations</button>
                    <h3>${s(W.title)}</h3>
                    <p class="muted">${s(u(W))}</p>
                  </div>
                  <div class="message-header-actions">
                    ${W.work_order_id?`<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${W.work_order_id}" type="button">Open Work Order</button>`:""}
                    <span class="chip comment">${O} message${O===1?"":"s"}</span>
                    ${D?`<button class="text-button danger-link" data-delete-message-thread="${s(W.id)}" type="button" ${A?"disabled":""}>Hide conversation</button>`:""}
                  </div>
                </div>
                <div class="message-list" role="region" aria-label="Conversation history" aria-busy="${A}" tabindex="0">
                  ${v?.hasOlder?'<button class="secondary-button" data-message-older type="button">Earlier messages</button>':""}
                  ${A?'<p class="muted" role="status">Loading conversation...</p>':p(E)}
                </div>
                ${D&&!A?`<form class="message-reply-form" id="message-reply-form" data-thread-id="${W.id}">
                  <div class="message-quick-replies">
                    ${["On it","Need more info","Waiting on parts","Complete"].map(B=>`<button data-quick-reply="${s(B)}" type="button">${s(B)}</button>`).join("")}
                  </div>
                  <textarea name="body" rows="2" required aria-label="Reply" placeholder="Reply to this thread..."></textarea>
                  <p class="error-text" id="message-reply-error" role="alert"></p>
                  <button class="secondary-button message-action-button" type="submit">Send Reply</button>
                </form>`:""}
              `:'<p class="muted">Choose or start a thread.</p>'}
            </section>
          </div>
        </section>
      `}return{renderMessageCenter:f}}window.MaintainOpsMessageCenterDisplay={createMessageCenterDisplayHelpers:c},typeof vt<"u"&&(vt.exports={createMessageCenterDisplayHelpers:c})})()});var Rn=U((Qr,kt)=>{(function(){function c(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:r,statusLabel:s,workOrderTypeLabel:d=a=>String(a||"corrective").replace(/\b\w/g,m=>m.toUpperCase()),renderAssignmentSelect:o,renderProcedureOptions:i,escapeHtml:l}=e;function u(){let a=new Date;return new Date(a.getTime()-a.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function p(){let a=e.getParts();return`
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
                  ${n.map(m=>`<option value="${m}" ${m==="open"?"selected":""}>${s(m)}</option>`).join("")}
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
                  ${t.map(m=>`<option value="${m}">${d(m)}</option>`).join("")}
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
                  ${a.map(m=>`<option value="${m.id}">${l(m.name)} (${m.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:p}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:c},typeof kt<"u"&&(kt.exports={createCreateWorkOrderDisplayHelpers:c})})()});var En=U((Br,_t)=>{(function(){function c(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:r,escapeHtml:s,renderAssignmentSelect:d,renderProcedureOptions:o,assetStatusLabel:i,workOrderTypeLabel:l=a=>String(a||"corrective").replace(/\b\w/g,m=>m.toUpperCase())}=e;function u(){let a=new Date;return new Date(a.getTime()-a.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function p(){let a=e.getQuickFixAssetId(),m=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),f=e.getSession(),y=e.getParts(),h=a||"",b=g.find(w=>w.id===m);return`
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
                  ${t(h||b?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${s(r(h||b?.asset_id||""))}</p>
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
                  ${["medium","high","critical","low"].map(w=>`<option value="${w}">${w}</option>`).join("")}
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${n.map(w=>`<option value="${w}" ${w==="corrective"?"selected":""}>${l(w)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${d(f.user.id,{selfLabel:"Assign to me"})}
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
                  ${["running","watch","degraded","offline"].map(w=>`<option value="${w}">${i(w)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${y.map(w=>`<option value="${w.id}">${s(w.name)} (${w.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `}return{renderQuickFixForm:p}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:c},typeof _t<"u"&&(_t.exports={createQuickFixDisplayHelpers:c})})()});var On=U((jr,St)=>{(function(){function c(e={}){let n=e.escapeHtml;function t(p){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${n(p)}</p>
              </div>
            </div>
            <p class="muted auth-status">Your login was accepted. We are loading company data now.</p>
          </div>
        </section>
      `}function r(p){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Workspace Load Stopped</h1>
                <p>Login worked, but the workspace did not finish loading.</p>
              </div>
            </div>
            <p class="error-text">${n(p)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `}function s(p,a=""){let m=p==="signup";return`
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${m?"Create Account":"Welcome Back"}</h1>
                <p>${m?"Start with email and password.":"Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${m?'<label>Full name<input name="fullName" required autocomplete="name"></label>':""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${m?"new-password":"current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${n(a)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${m?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${m?"I already have an account":"Create an account"}</button>
            ${m?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function d(p){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verifying Your Account</h1>
                <p>${n(p)}</p>
              </div>
            </div>
            <p class="muted auth-status">You will be redirected into MaintainOps automatically.</p>
          </div>
        </section>
      `}function o(p){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Verification Link Problem</h1>
                <p>We could not finish verification from this link.</p>
              </div>
            </div>
            <p class="error-text">${n(p)}</p>
            <button class="primary-button" id="auth-back-to-login" type="button">Back to Sign In</button>
          </div>
        </section>
      `}function i(p="",a=""){return`
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
            <p class="error-text" id="auth-error">${n(p)}</p>
            <p class="muted auth-status" id="auth-status">${n(a)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function l(p={}){let a=!!p.ready,m=p.initialError||"";return`
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
            <p class="error-text" id="auth-error">${n(m)}</p>
            <p class="muted auth-status" id="auth-status">${a?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${a?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function u(p=""){return`
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
            <p class="error-text" id="company-error">${n(p)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `}return{workspaceLoading:t,workspaceLoadError:r,authForm:s,authCallback:d,authCallbackError:o,passwordResetRequest:i,passwordRecovery:l,companyCreate:u}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:c},typeof St<"u"&&(St.exports={createAuthDisplayHelpers:c})})()});var Wn=U((zr,qt)=>{(function(){function c(e={}){let n=e.escapeHtml,t=e.qrSvgFor,r=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),d=e.getPublicRequestLinksReady||(()=>!0),o=e.getPublicAppUrlOverride||(()=>""),i=e.getWindowPublicAppUrl||(()=>""),l=e.canManageTeam||(()=>!1),u=e.canAdministerPublicRequestLinks||(()=>!1),p=e.publicAppBaseUrl,a=e.publicRequestUrl,m=e.publicRequestQrUrl;function g(){return`
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
      `}function f(R,C){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(R.location_name)}</h1>
                <p>${n(R.company_name)}</p>
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
      `}function y(){return`
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
      `}function h(R){return`
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(R.company_name)}</h1>
                <p>${n(R.location_name)} maintenance request</p>
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
      `}function b(R){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${n(R)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function w(R,C=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(R.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${C?`<p class="error-text">${n(C)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function P(){if(!l())return"";let R=p(),C=r(),k=d();return`
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
          ${R?`<p class="muted">QR codes will point to ${n(R)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${k?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${C.map($).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function $(R){let C=s().find(D=>D.location_id===R.id),k=!!(C&&C.is_active!==!1),S=u(),_=k?a(C.token):"",M=k?m(C.token):"",N=!!(_&&M);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(R.name)}</strong>
            <span>${k?"External request link active":C?"Request link disabled":"No request link yet"}</span>
            ${C?.last_used_at?`<span>Last used ${new Date(C.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${k?`
            <div class="qr-preview">${N?t(_):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(M||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${N?"":"disabled-link"}" href="${n(M||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(M)}" type="button" ${N?"":"disabled"}>Copy QR Link</button>
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
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(R.id)}" type="button" ${d()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:f,loadingRequestForm:y,publicRequestForm:h,publicRequestError:b,publicRequestSuccess:w,publicRequestLinkManager:P,publicRequestLocationCard:$}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:c},typeof qt<"u"&&(qt.exports={createPublicRequestDisplayHelpers:c})})()});(function(c){function e(l){return String(l||"").replace(/\/+$/,"")}function n(l=c.location,u=c.PUBLIC_APP_URL){if(u)return`${e(u)}/`;let p=l?.origin||"",a=l?.pathname||"/",g=a.indexOf("/auth/callback");if(g>=0)return`${p}${a.slice(0,g+1)}`;let f=a.endsWith("/")?a:a.replace(/[^/]*$/,"");return`${p}${f||"/"}`}function t(l=c.location,u=c.PUBLIC_APP_URL){return`${n(l,u)}auth/callback/`}function r(l={},u=c.location,p=c.PUBLIC_APP_URL){let a=new URL(n(u,p));return Object.entries(l).forEach(([m,g])=>{g!=null&&g!==""&&a.searchParams.set(m,g)}),a.href}function s(l){let u=new URL(l),p=new URLSearchParams(u.hash.replace(/^#/,"")),a=u.searchParams;return{code:a.get("code")||"",type:p.get("type")||a.get("type")||"",accessToken:p.get("access_token")||a.get("access_token")||"",refreshToken:p.get("refresh_token")||a.get("refresh_token")||"",error:p.get("error")||a.get("error")||"",errorCode:p.get("error_code")||a.get("error_code")||"",errorDescription:p.get("error_description")||a.get("error_description")||""}}function d(l){return!!(l?.code||l?.accessToken&&l?.refreshToken||l?.error||l?.errorDescription)}function o(l){return l?.type==="recovery"||!l?.type&&!!(l?.accessToken&&l?.refreshToken)}function i(l=c.location){let u=new URL(l.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(p=>u.searchParams.delete(p)),u.hash="",u.href}c.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:r,authParamsFromHref:s,isAuthCallbackParams:d,isPasswordRecoveryParams:o,cleanAuthUrl:i}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","production","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:c})})();(function(){function c(k){return String(k||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(k){return k.toISOString().slice(0,10)}function n(k){return k.toISOString()}function t(k){let S=new Date;return S.setDate(S.getDate()-k),S}function r(){let k=new Date;return new Date(k.getFullYear(),k.getMonth(),1)}function s(k=new Date){let S=new Date(k);S.setHours(0,0,0,0),S.setDate(S.getDate()-S.getDay());let _=new Date(S);return _.setDate(_.getDate()+7),{start:S,end:_}}function d(k,S){let _=[];for(let M=0;M<k.length;M+=S)_.push(k.slice(M,M+S));return _}function o(k){return i(k).replace(/\.[^/.]+$/,"")||"photo"}function i(k){return String(k||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function l(k){return k==="active"||k==="all"?"Active":k==="overdue"?"Overdue":k==="completed"?"All Completed":k==="completed_month"?"Completed Month":k==="completed_week"?"Done This Week":k==="open"?"New":String(k||"").replaceAll("_"," ").replace(/\b\w/g,S=>S.toUpperCase())}function u(k){let S=String(k||"corrective").trim().toLowerCase();return S==="inspection"?"preventive":S==="reactive"||S==="request"?"corrective":["corrective","preventive","fabrication"].includes(S)?S:"corrective"}function p(k){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[u(k)]}function a(k){let S=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],_=String(k||"technician").trim().toLowerCase();return _==="member"?"technician":S.includes(_)?_:"technician"}function m(k){return{admin:"Admin",manager:"Manager",accounting:"Accounting",production:"Production",technician:"Technician"}[a(k)]||"Technician"}function g(k){let S={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",production:"Technician access plus production action items assigned from work orders.",technician:"Can create work, convert requests, and claim unassigned work."};return S[a(k)]||S.technician}function f(k){return new Date(`${k}T00:00:00`).toLocaleDateString()}function y(k){let S=[new Date(k.created_at).toLocaleString()];return k.file_size_bytes&&S.push(b(k.file_size_bytes)),k.original_size_bytes&&k.file_size_bytes&&k.original_size_bytes!==k.file_size_bytes&&S.push(`optimized from ${b(k.original_size_bytes)}`),S.join(" - ")}function h(k){let S=[];return(k.photo_uploaded_at||k.updated_at||k.created_at)&&S.push(new Date(k.photo_uploaded_at||k.updated_at||k.created_at).toLocaleString()),k.photo_file_size_bytes&&S.push(b(k.photo_file_size_bytes)),k.photo_original_size_bytes&&k.photo_file_size_bytes&&k.photo_original_size_bytes!==k.photo_file_size_bytes&&S.push(`optimized from ${b(k.photo_original_size_bytes)}`),S.join(" - ")||"Photo attached"}function b(k){let S=Number(k)||0;return S?S<1024?`${S} B`:S<1048576?`${Math.round(S/1024)} KB`:`${(S/1048576).toFixed(S>=10485760?0:1)} MB`:""}function w(k){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(k)||0)}function P(k){return Number(k.unit_cost_at_use??k.parts?.unit_cost??0)||0}function $(k){if(!k.due_at||k.status==="completed")return null;let S=new Date;S.setHours(0,0,0,0);let _=new Date(`${k.due_at}T00:00:00`),M=Math.round((_-S)/864e5);return M<0?{label:"overdue",className:"overdue"}:M===0?{label:"due today",className:"due_today"}:null}function R(){let k=new Date;return k.setHours(0,0,0,0),k}function C(k){return`"${String(k??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:c,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:r,sundayWeekRange:s,chunkArray:d,fileBaseName:o,safeFileName:i,statusLabel:l,normalizeWorkOrderType:u,workOrderTypeLabel:p,normalizeRole:a,roleLabel:m,roleDescription:g,formatDate:f,photoMetaText:y,requestPhotoMetaText:h,formatBytes:b,money:w,partUsageUnitCost:P,getDueState:$,startOfToday:R,csvCell:C})})();(function(){function c(s,d){let o=s?.message||"";return d.some(i=>o.includes(i))}function e(s,d){let o=s?.message||"";return o.includes(d)&&(o.includes("column")||o.includes("schema cache"))}function n(s){let d=s?.message||"";return d.includes("work_order_comments_company_author_profile_fkey")||d.includes("profiles")}function t(s){let d=s?.message||"";return!!(d.includes("procedure_template_id")||d.includes("procedure_templates")||d.includes("procedure_steps"))}function r(s){return c(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:c,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:r}})();(function(){function c(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:c}})();(function(){function c(e,n,t=2e4){let r,s=new Promise((d,o)=>{r=setTimeout(()=>o(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(r))}window.MaintainOpsOperationTimeout={withOperationTimeout:c}})();var Xr=Q($t()),ea=Q(Pt());(function(){function c(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function r(p){return d(`?request=${encodeURIComponent(p)}`)}function s(p){return d(`?qr=${encodeURIComponent(p)}`)}function d(p){let a=o();if(!a)return"";let m=new URL(a);return m.search=p,m.hash="",m.toString()}function o(){let a=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return a?i(a):""}function i(p){try{let a=new URL(String(p||"").trim(),n.location.href);return a.protocol!=="https:"||!l(a.hostname)?"":(a.search="",a.hash="",a.pathname&&a.pathname!=="/"&&!a.pathname.endsWith("/")&&!a.pathname.endsWith(".html")&&(a.pathname=`${a.pathname}/`),a.toString())}catch{return""}}function l(p){let a=String(p||"").toLowerCase();return!(!a||a==="localhost"||a.endsWith(".localhost")||a==="127.0.0.1"||a==="::1"||a==="[::1]"||/^10\./.test(a)||/^192\.168\./.test(a)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(a))}function u(p,a=4){if(!n.qrcode||!p)return'<div class="qr-fallback">QR</div>';try{let m=n.qrcode(0,"M");return m.addData(p),m.make(),m.createSvgTag(a,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:r,publicRequestQrUrl:s,publicAppUrlWithSearch:d,publicAppBaseUrl:o,normalizePublicAppUrl:i,isPublicAppHost:l,qrSvgFor:u}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),r=n.querySelector("#print-public-qr");!r||typeof t!="function"||r.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:c}})();(function(){function c(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:c}})();var aa=Q(At()),oa=Q(Rt());(function(){function c(e){function n(l){return e[l]()}function t(l,u){return typeof e[l]=="function"?e[l]():u}function r(l){let u=n("searchQuery"),p=n("activeSection"),a=n("activeStatusFilter"),m=!!u.trim();return i(s(l,{statusFilter:m?"__any__":p==="work"&&a==="requests"?"__none__":a,section:p,includeQueue:!m,includeSearch:!0}))}function s(l,u={}){let p=u.section||n("activeSection"),a=l.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(a=a.eq("location_id",n("activeLocationId"))),u.includeQueue!==!1&&(a=d(a,p)),u.includeAttributeFilters!==!1&&p==="work"){let m=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");m!=="all"&&(a=a.eq("type",m)),g!=="all"&&(a=a.eq("priority",g))}if(a=o(a,u.statusFilter||n("activeStatusFilter")),u.includeSearch!==!1){let m=e.postgrestSearchTerm(n("searchQuery"));if(m){let g=n("workOrderRelatedSearch"),f=[`title.ilike.%${m}%`,`description.ilike.%${m}%`,`production_action.ilike.%${m}%`,`priority.ilike.%${m}%`,`type.ilike.%${m}%`,`status.ilike.%${m}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];a=a.or(f.join(","))}}return a}function d(l,u){if(u==="mywork"){let p=n("session").user.id;return n("myWorkFilter")==="created"?l.eq("created_by",p):l.or(`assigned_to.eq.${p},and(production_action_assigned_to.eq.${p},production_action_status.eq.open)`)}if(u!=="work")return l;if(n("workOrderAssigneeFilter")){let p=n("workOrderAssigneeFilter");return l.or(`assigned_to.eq.${p},and(production_action_assigned_to.eq.${p},production_action_status.eq.open)`)}return n("workOrderFilter")==="assigned"?l.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?l.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?l.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):l}function o(l,u){let p=e.isoDate(e.startOfToday());if(u==="__any__")return l;if(u==="__none__")return l.eq("id","00000000-0000-0000-0000-000000000000");if(u==="overdue")return l.neq("status","completed").lt("due_at",p);if(u==="completed_month")return l.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(u==="completed_week"){let a=e.sundayWeekRange();return l.gte("completed_at",e.isoDateTime(a.start)).lt("completed_at",e.isoDateTime(a.end))}return u==="active"||u==="all"?l.neq("status","completed"):l.eq("status",u)}function i(l){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?l.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?l.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?l.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?l.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?l.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):l.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:r,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:d,applyWorkOrderStatusFilter:o,applyWorkOrderSort:i}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(r=>{r.addEventListener("click",()=>{let s=n.querySelector(`#${r.dataset.jumpWorkSection}`);if(!s)return;let d=s.closest("details");d&&(d.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let o=s;o.classList.add("jump-highlight","field-jump-highlight"),t(()=>o.classList.remove("jump-highlight"),1400),t(()=>o.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.renderWorkspace,d=e.setWorkOrderSearchMode;if(!r||!s||!d)return;let o=()=>{r.setSearchQuery(""),d(!1),t.setItem("maintainops.searchQuery","")},i=l=>{r.setActiveSection(l),t.setItem("maintainops.activeSection",l)};n.querySelectorAll("[data-search-work-order]").forEach(l=>{l.addEventListener("click",()=>{r.setActiveWorkOrderId(l.dataset.searchWorkOrder),r.setActiveAssetId(null),r.setActivePartId(null),i("work"),o(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(l=>{l.addEventListener("click",()=>{r.setActiveAssetId(l.dataset.searchAsset),r.setActiveWorkOrderId(null),r.setActivePartId(null),i("assets"),o(),s()})}),n.querySelectorAll("[data-search-part]").forEach(l=>{l.addEventListener("click",()=>{r.setActivePartId(l.dataset.searchPart),r.setActiveAssetId(null),r.setActiveWorkOrderId(null),i("parts"),o(),s()})}),n.querySelectorAll("[data-search-request]").forEach(l=>{l.addEventListener("click",()=>{i("requests"),o(),s()})}),n.querySelectorAll("[data-search-section]").forEach(l=>{l.addEventListener("click",()=>{i(l.dataset.searchSection),o(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:c}})();(function(){let c=null,e=0,n=Promise.resolve();function t(r={}){let s=r.documentRef||document,d=r.storage||localStorage,o=r.state,i=r.windowRef||(typeof window<"u"?window:null),l=r.setTimeoutRef||setTimeout,u=r.clearTimeoutRef||clearTimeout,p=Number.isFinite(r.searchDelayMs)?r.searchDelayMs:300;if(!o)return;let a=()=>{e+=1,c!==null&&(u(c),c=null)},m=f=>{f&&typeof i?.scrollTo=="function"&&i.scrollTo(f.x,f.y)},g=(f,y,h,b)=>{let w=s.getElementById?s.getElementById(f):s.querySelector(`#${f}`);if(!w)return;let P=w.value.length,$=Math.min(y??P,P),R=Math.min(h??$,P);w.focus({preventScroll:!0}),w.setSelectionRange($,R),m(b)};s.querySelectorAll(".workspace-search-input").forEach(f=>{f.addEventListener("input",()=>{let y=f.id,h=f.selectionStart,b=f.selectionEnd;a();let w=e;o.setSearchQuery(f.value),r.invalidateExactWorkOrderSearchCache(),o.getSearchQuery().trim()||r.setWorkOrderSearchMode(!1),o.getSearchQuery().trim()&&(o.setActiveWorkOrderId(null),o.setActiveAssetId(null),o.setActivePartId(null),o.setQuickFixMode(!1),o.setCreateWorkOrderMode(!1),o.setQuickFixAssetId(null),o.setQuickFixRequestId(null)),d.setItem("maintainops.searchQuery",o.getSearchQuery()),r.resetWorkOrderPage(),r.resetPartsPage(),r.resetRequestsPage(),c=l(()=>(c=null,n=n.catch(()=>null).then(async()=>{if(w!==e||(await Promise.all([r.reloadWorkOrderQueue({render:!1}),r.reloadRequestQueue({render:!1})]),w!==e))return;let P=i?{x:Number(i.scrollX||i.pageXOffset||0),y:Number(i.scrollY||i.pageYOffset||0)}:null,$=s.getElementById?s.getElementById(y):s.querySelector(`#${y}`),R=!("activeElement"in s)||s.activeElement===$;r.renderWorkspace(),R?g(y,h,b,P):m(P)}),n),p)})}),s.querySelectorAll("[data-view-work-search]").forEach(f=>{f.addEventListener("click",async()=>{a(),o.setActiveSection("work"),o.setActiveWorkOrderId(null),o.setActiveAssetId(null),o.setActivePartId(null),o.setCreateWorkOrderMode(!1),o.setQuickFixMode(!1),r.setWorkOrderSearchMode(!0),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),d.setItem("maintainops.activeSection",o.getActiveSection()),await r.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(f=>{f.addEventListener("click",async()=>{a(),r.setWorkOrderSearchMode(!1),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),await r.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(o){!r||typeof r.scrollTo!="function"||r.scrollTo({top:o,behavior:"auto"})}async function d(o){let i=Number(r?.scrollY??r?.pageYOffset??0);if(await o(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(i));return}s(i)}}n.querySelectorAll("[data-status-filter]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.getActiveSection?.()==="work"&&(t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all")),t.setActiveStatusFilter(o.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setMyWorkFilter(o.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setWorkOrderFilter(o.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{t.setActiveStatusFilter(o.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{let i=o.value||"all";t.setWorkOrderFilter(i),i!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{let i=o.value||"";t.setWorkOrderAssigneeFilter(i),i&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{t.setWorkOrderTypeFilter(o.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{t.setWorkOrderPriorityFilter(o.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setWorkSort(o.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{t.setWorkSort(o.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{t.setWorkGroup(o.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{t.setWorkOrderAssigneeFilter(o.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(o=>{o.addEventListener("click",async()=>{o.disabled||await d(async()=>{t.setRequestViewFilter(o.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(o.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setPartsPage(t.getPartsPage()+(o.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setAssetsPage(t.getAssetsPage()+(o.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{t.setFinancialPage(t.getFinancialPage()+(o.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(o=>{o.addEventListener("change",async()=>{await d(async()=>{o.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(o.value),o.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(o.value),o.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(o.value),o.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(o.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(o=>{o.addEventListener("click",async()=>{await d(async()=>{let i=o.dataset.pageDirection==="next"?1:-1;if(o.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+i),await e.reloadRequestQueue();return}if(o.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+i),o.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+i),o.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+i),o.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+i),o.dataset.listPage?.startsWith("planning-")){let l=o.dataset.listPage.replace("planning-","");t.setPlanningPage(l,t.getPlanningPage(l)+i)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(o=>{o.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(o.dataset.planningGroup,!!o.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.windowRef||(typeof window<"u"?window:null),d=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!r)return;let o=()=>{r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)};async function i(h){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(h)}async function l(h){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([h])}function u(h){return h==="open-work"||h==="completed-history"||h==="parts-used"}function p(){e.renderWorkspace()}function a(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function m(){let h=n.querySelector("#work-order-photos-target");h&&("open"in h&&(h.open=!0),typeof h.scrollIntoView=="function"&&h.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(m);return}m()}let f=n.querySelector("#back-to-my-work");f&&f.addEventListener("click",()=>{r.setActiveWorkOrderId(null),r.setActiveAssetId(null),a(),o(),e.renderWorkspace()});let y=n.querySelector("#back-to-equipment");y&&y.addEventListener("click",()=>{r.setActiveAssetId(null),a(),r.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(h=>{h.addEventListener("click",()=>{r.setActiveWorkOrderId(h.dataset.id),r.setActiveAssetId(null),a(),o(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(h=>{h.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),r.setActiveWorkOrderId(h.dataset.workPhotoJump),r.setActiveAssetId(null),a(),r.setActiveSection("work"),o(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(h=>{h.addEventListener("click",b=>{b.stopPropagation(),r.setActiveAssetId(h.dataset.openAsset),r.setActiveWorkOrderId(null),a(),o(),r.getActiveSection()!=="assets"&&r.setActiveSection("work"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),d()})}),n.querySelectorAll("[data-asset-id]").forEach(h=>{let b=()=>{r.setActiveAssetId(h.dataset.assetId),r.setActiveWorkOrderId(null),r.setActivePartId(null),a(),o(),r.setReportIssueMode(!1),r.setActiveSection("assets"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),d()};h.addEventListener("click",b),h.addEventListener("keydown",w=>{w.key!=="Enter"&&w.key!==" "||(w.preventDefault(),b())})}),n.querySelectorAll("[data-mini-work-order]").forEach(h=>{h.addEventListener("click",()=>{r.setActiveWorkOrderId(h.dataset.miniWorkOrder),r.setActiveAssetId(null),a(),r.setActiveSection("work"),o(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),d()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(h=>{h.addEventListener("toggle",async()=>{let b=h.dataset.assetId,w=h.dataset.assetRelationshipSection;!b||!w||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(b,w,h.open),h.open&&u(w)&&await i(b),h.open&&w==="asset-history"&&await l(b),p())})}),n.querySelectorAll("[data-asset-relation-page]").forEach(h=>{h.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let w=h.dataset.assetId,P=h.dataset.assetRelationSection,R=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(w,P):1)+(h.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(w,P,R),p()})}),n.querySelectorAll("[data-open-asset-history]").forEach(h=>{h.addEventListener("click",async b=>{b.preventDefault(),b.stopPropagation();let w=h.dataset.openAssetHistory;w&&(r.setActiveAssetId(w),r.setActiveWorkOrderId(null),o(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(w),await l(w),e.renderWorkspace(),d())})}),n.querySelectorAll("[data-back-asset-history]").forEach(h=>{h.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let w=h.dataset.backAssetHistory;w&&r.setActiveAssetId(w),a(),e.renderWorkspace(),d()})}),n.querySelectorAll("[data-asset-history-page]").forEach(h=>{h.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let w=h.dataset.assetId,$=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(w,"asset-history"):1)+(h.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(w,"asset-history",$),e.renderWorkspace(),d()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(o){!r||typeof r.scrollTo!="function"||r.scrollTo({top:o,behavior:"auto"})}function d(){let o=Number(r?.scrollY??r?.pageYOffset??0);if(e.renderWorkspace(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(o));return}s(o)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(o=>{o.addEventListener("click",()=>{t.setPartInventoryFilter(o.dataset.partInventoryFilter),e.resetPartsPage(),d()})}),n.querySelectorAll("[data-part-sort]").forEach(o=>{o.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(o.value||"default"),e.resetPartsPage(),d())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(o=>{o.addEventListener("click",()=>{let i=t.getAssetStatusFilter()===o.dataset.assetStatusFilter?"all":o.dataset.assetStatusFilter;t.setAssetStatusFilter(i),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),d()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(o=>{o.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let i=t.getAssetTypeFilter()===o.dataset.assetTypeFilter?"all":o.dataset.assetTypeFilter;t.setAssetTypeFilter(i),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),d()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(o=>{o.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(o.value||"all"),e.resetAssetsPage(),d())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:c}})();(function(){function c(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(d){e.showNotice(`Could not update status: ${d.message||d}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",r=>r.stopPropagation()),t.addEventListener("change",r=>{r.stopPropagation(),r.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:c}})();var ga=Q(Et()),ha=Q(Ot());(function(){function c(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,r=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let d=e.getWorkOrderById(s.dataset.id);if(!d)return;let o=s.dataset.copyDowntime==="subject",i=o?e.downtimeEmailSubject(d):e.downtimeEmailBody(d),l=await e.copyTextToClipboard(i);s.textContent=l?"Copied":"Copy failed",r(()=>{s.textContent=o?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:c}})();(function(){function c(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:c}})();var wa=Q(Wt());(function(){function c(e={}){let n=e.documentRef||document;function t(d){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(d),e.renderWorkspace()}async function r(d){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let o=e.getPhotoPathsByWorkOrder(d);if(o.length){let l=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(o),"Work order photo cleanup timed out.",15e3);l.error&&e.warnRef("Work order photo storage cleanup failed",l.error)}let{error:i}=await e.withOperationTimeout(e.deleteWorkOrderRecord(d),"Work order delete timed out. Check your connection and try again.",15e3);if(i){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(i)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(o){e.alertRef(`Could not delete work order: ${o.message||o}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(d=>{d.addEventListener("click",o=>{o.stopPropagation(),t(d.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(d=>{d.addEventListener("click",o=>{o.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(d=>{d.addEventListener("click",async o=>{o.stopPropagation(),await r(d.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:r,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(r=>{r.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(r.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace;!t||typeof r!="function"||(n.querySelectorAll("[data-open-part]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(s.dataset.openPart),r()}),s.addEventListener("keydown",d=>{d.key!=="Enter"&&d.key!==" "||(d.preventDefault(),t.setActivePartId(s.dataset.openPart),r())})}),n.querySelectorAll("[data-close-part-detail]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(null),t.setShowPartSourceManager(!1),r()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(s=>{s.addEventListener("click",()=>{t.setShowPartSourceManager(!t.getShowPartSourceManager()),r()})}))}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.messageComposerScopeNote,d=e.autoGrowTextarea;if(!t||typeof r!="function")return;let o=e.storage||localStorage;n.querySelector("[data-message-back]")?.addEventListener("click",()=>e.backToMessages?.()),n.querySelector("[data-retry-messages]")?.addEventListener("click",()=>e.retryMessages?.()),n.querySelector("[data-message-older]")?.addEventListener("click",async p=>{p.currentTarget.disabled=!0;let a=p.currentTarget;try{await e.loadOlderMessages?.()}finally{a.isConnected&&(a.disabled=!1)}}),n.querySelectorAll("[data-message-filter]").forEach(p=>{p.addEventListener("click",()=>{let a=p.dataset.messageFilter;t.setMessageThreadFilter(a),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),o.setItem("maintainops.messageThreadFilter",a),o.setItem("maintainops.messageThreadsPage","1"),r()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(p=>{p.addEventListener("click",()=>{if(e.openLinkedWorkOrder){e.openLinkedWorkOrder(p.dataset.openLinkedWorkOrder);return}t.setActiveWorkOrderId(p.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),o.setItem("maintainops.activeSection","work"),r()})});let i=n.querySelector("[data-clear-message-work-link]");i&&i.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),o.setItem("maintainops.messageComposerWorkOrderId",""),r()});let l=n.querySelector("#message-search");l&&l.addEventListener("input",()=>{let p=l.value;t.setMessageSearchQuery(p),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),o.setItem("maintainops.messageSearchQuery",p),o.setItem("maintainops.messageThreadsPage","1"),r();let a=n.querySelector("#message-search");a&&(a.focus({preventScroll:!0}),a.selectionStart!=null&&a.setSelectionRange(l.selectionStart,l.selectionEnd))});let u=n.querySelector("#message-thread-form");if(u){let p=u.querySelector("#message-thread-type"),a=u.querySelector(".message-direct-field"),m=u.querySelector("#message-scope-note");if(p&&a&&m&&typeof s=="function"){let g=()=>{let f=p.value==="direct";a.classList.toggle("hidden-section",!f);let y=a.querySelector("select");y&&(y.disabled=!f),m.textContent=s(p.value)};p.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(p=>{p.addEventListener("click",()=>{let a=n.querySelector("#message-thread-form");if(!a)return;let m=a.querySelector("details"),g=a.querySelector("#message-thread-type"),f=a.querySelector("select[name='direct_user_id']"),y=a.querySelector(".message-direct-field"),h=a.querySelector("#message-scope-note"),b=a.querySelector("input[name='title']");m&&(m.open=!0),g&&(g.value="direct"),f&&(f.value=p.dataset.messagePerson||"",f.disabled=!1),y&&y.classList.remove("hidden-section"),h&&typeof s=="function"&&(h.textContent=s("direct")),b&&b.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(p=>{p.addEventListener("click",()=>{let m=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!m)return;let g=m.value.trim();m.value=g?`${g}
${p.dataset.quickReply}`:p.dataset.quickReply,m.focus(),typeof d=="function"&&d(m)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof r!="function"||typeof s!="function")return;let d=n.querySelector("#part-search-form");if(!d)return;let o=l=>{t.setPartSearchQuery(l||""),s(),r()},i=d.querySelector("input[name='part_search']");i&&i.addEventListener("input",()=>{o(i.value||"");let l=n.querySelector("#part-search");if(!l)return;l.focus();let u=l.value.length;l.setSelectionRange(u,u)}),d.addEventListener("submit",l=>{l.preventDefault();let u=e.FormDataRef||FormData,p=new u(d).get("part_search")||"";o(p),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(d=>{d.addEventListener("click",async()=>{let o=performance.now(),i=d.dataset.section;e.visibleNavItems().some(([l])=>l===i)&&(t.setActiveSection(i),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),i!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),r.setItem("maintainops.activeSection",i),e.renderWorkspace(),s(),i==="messages"?(await Promise.all([typeof e.loadWorkOrderNotifications=="function"?e.loadWorkOrderNotifications():null,typeof e.loadMessageCenter=="function"?e.loadMessageCenter():null]),e.renderWorkspace()):["work","mywork"].includes(i)&&typeof e.loadWorkOrderNotifications=="function"&&await e.loadWorkOrderNotifications(),(i==="work"||i==="mywork")&&await e.reloadWorkOrderQueue(),i==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),i==="requests"&&await e.reloadRequestQueue(),i==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),i==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),i==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),i==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(i,o))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let r=e.storage||localStorage;async function s(d){e.renderWorkspace();try{if(typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(d),e.getActiveThreadId&&e.getActiveThreadId()!==d||e.getActiveSection&&e.getActiveSection()!=="messages")return;e.renderWorkspace(),await e.markMessageThreadRead(d),(!e.getActiveThreadId||e.getActiveThreadId()===d)&&(!e.getActiveSection||e.getActiveSection()==="messages")&&e.renderWorkspace()}catch{if(e.getActiveThreadId&&e.getActiveThreadId()!==d)return;t.setActiveMessageThreadId(""),e.showNotice?.("Could not open this conversation. Try again.","warning"),e.renderWorkspace()}}n.querySelectorAll("[data-message-thread]").forEach(d=>{d.addEventListener("click",async()=>{let o=d.dataset.messageThread;t.setActiveMessageThreadId(o),r.setItem("maintainops.activeMessageThreadId",o),await s(o)})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(d=>{d.addEventListener("click",async()=>{let o=d.dataset.openWorkMessageThread;t.setActiveMessageThreadId(o),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),r.setItem("maintainops.activeMessageThreadId",o),r.setItem("maintainops.activeSection","messages"),await s(o)})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),r.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let d=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(d),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),r.setItem("maintainops.messageComposerWorkOrderId",d),r.setItem("maintainops.activeSection","messages"),r.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(r=>{r.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",()=>{e.exportActiveSectionCsv()})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:c}})();var Ma=Q(xt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(r.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(r=>{r.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(r.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(r.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.deleteMaintenanceRequest(r.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(r.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.deletePreventiveSchedule(r.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(r.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.deleteProcedureTemplate(r.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:c}})();(function(){function c(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(r=>{c(r),r.addEventListener("input",()=>c(r))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:c,bindWorkspaceTextareaAutoGrow:e}})();var Na=Q(Mt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(r.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{e.cancelTeamInvite(r.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(d=>{d.addEventListener("click",async()=>{let o=await t(d.dataset.copyTeamInvite||"");d.textContent=o?"Copied":"Copy failed",r(()=>{d.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(d=>{d.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(d=>{d.addEventListener("click",()=>{t.setQuickFixAssetId(d.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:c}})();var za=Q(Tt());(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(d=>{d.addEventListener("click",async()=>{let o=await t(d.dataset.copyPublicRequestLink);d.textContent=o?"Copied":"Copy failed",r(()=>{d.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:c}})();var Ga=Q(Dt());(function(){function c(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(r=>{r.addEventListener("click",()=>{let d=r.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(r.dataset.createFollowUp,d?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:c}})();var Ja=Q(It());(function(){function c(e={}){let n=e.documentRef||document,t=e.createComment,r=n.querySelector("#comment-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,r=n.querySelector("#quick-update-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,r=n.querySelector("#edit-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(r=>{t(r),r.addEventListener("change",()=>t(r))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:c}})();var ro=Q(Ft()),ao=Q(Lt()),oo=Q(Nt()),io=Q(Ut()),so=Q(Qt()),co=Q(Bt()),lo=Q(jt()),uo=Q(zt()),po=Q(Ht()),mo=Q(Gt()),fo=Q(Vt()),go=Q(Yt()),ho=Q(Kt()),yo=Q(Jt()),bo=Q(Zt()),wo=Q(Xt()),vo=Q(en()),ko=Q(tn()),_o=Q(nn()),So=Q(rn()),qo=Q(an()),Co=Q(on()),$o=Q(sn()),Po=Q(cn()),Ao=Q(ln()),Ro=Q(un());(function(){function c(e){function n(r){return e[r]()}function t(r,s=n("requestViewFilter")){let d=r.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(d=d.eq("location_id",n("activeLocationId"))),s==="converted"?d=d.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(d=d.eq("status","submitted").is("converted_work_order_id",null));let o=e.postgrestSearchTerm(n("searchQuery"));if(o){let i=`%${o}%`,l=n("assets").filter(e.matchesActiveLocation).filter(u=>e.matchesQuery([u.name,u.asset_code,u.manufacturer,u.model,u.location,u.status,u.asset_type,e.parentAssetFor()(u)?.name],o)).map(u=>u.id).slice(0,e.SEARCH_ID_PAGE_SIZE);d=d.or([`title.ilike.${i}`,`description.ilike.${i}`,`status.ilike.${i}`,`priority.ilike.${i}`,`requested_by_name.ilike.${i}`,`requested_by_contact.ilike.${i}`,...l.length?[`asset_id.in.(${l.join(",")})`]:[]].join(","))}return d}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:c}})();(function(){function c(e){function n(m){return e[m]()}async function t(){let m=n("searchQuery").trim();if(!m||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.asset_code,b.manufacturer,b.model,b.location,b.status,b.asset_type,e.parentAssetFor()(b)?.name],m)).map(b=>b.id),f=n("procedureTemplates").filter(b=>e.matchesQuery([b.name,b.description,...(b.procedure_steps||[]).map(w=>w.prompt)],m)).map(b=>b.id),y=n("parts").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.sku,b.supplier_name,b.quantity_on_hand,b.reorder_point,b.unit_cost],m)).map(b=>b.id),h=new Set;await Promise.all([r(h,y),s(h,"work_order_comments",["body"],m),s(h,"work_order_events",["event_type","summary"],m),s(h,"work_order_photos",["file_name"],m),s(h,"work_order_step_results",["value"],m)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:f.slice(0,200),workOrderIds:[...h].slice(0,300)})}async function r(m,g,f={}){if(!g.length)return;let h=f.maxRows??300;for(let b of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(h<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",b),w=>{w.forEach(P=>{P.work_order_id&&m.add(P.work_order_id)}),h-=w.length},h)}catch(w){e.warn("Part-linked work order search failed",w);return}}}async function s(m,g,f,y,h={}){let b=e.postgrestSearchTerm(y);if(!b)return;let w=f.map($=>`${$}.ilike.%${b}%`).join(","),P=h.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(w),$=>{$.forEach(R=>{R.work_order_id&&m.add(R.work_order_id)})},P)}catch($){e.warn(`${g} work order search failed`,$)}}async function d(m={}){let g=await o(),f=g.length,y=Math.max(1,Math.ceil(f/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>y&&e.setWorkOrderPage(y),n("workOrderPage")<1&&e.setWorkOrderPage(1);let h=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,b=g.slice(h,h+e.WORK_ORDERS_PER_PAGE).map(R=>R.id);if(!b.length)return{data:[],error:null,count:f};let w=m.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),P=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:w,ids:b});if(P.error)return P;let $=new Map((P.data||[]).map(R=>[R.id,R]));return{...P,data:b.map(R=>$.get(R)).filter(Boolean),count:f}}async function o(){let m=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===m)return g.rows;let f=n("searchQuery").trim(),y=new Map;await i(y,f);let h=n("assets").filter(e.matchesActiveLocation).filter(R=>e.matchesQuery([R.name,R.asset_code,R.manufacturer,R.model,R.location,R.status,R.asset_type,e.parentAssetFor()(R)?.name],f)).map(R=>R.id),b=n("procedureTemplates").filter(R=>e.matchesQuery([R.name,R.description,...(R.procedure_steps||[]).map(C=>C.prompt)],f)).map(R=>R.id),w=n("parts").filter(e.matchesActiveLocation).filter(R=>e.matchesQuery([R.name,R.sku,R.supplier_name,R.quantity_on_hand,R.reorder_point,R.unit_cost],f)).map(R=>R.id);await Promise.all([l(y,"asset_id",h),l(y,"procedure_template_id",b)]);let P=new Set;await Promise.all([r(P,w,{maxRows:1/0}),s(P,"work_order_comments",["body"],f,{maxRows:1/0}),s(P,"work_order_events",["event_type","summary"],f,{maxRows:1/0}),s(P,"work_order_photos",["file_name"],f,{maxRows:1/0}),s(P,"work_order_step_results",["value"],f,{maxRows:1/0})]),await u(y,[...P]);let $=[...y.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:m,rows:$}),$}async function i(m,g){let f=e.postgrestSearchTerm(g);if(!f)return;let y=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(h=>`${h}.ilike.%${f}%`).join(",");await e.fetchPagedSearchRows(()=>p().or(y),h=>a(m,h))}async function l(m,g,f){if(f.length)for(let y of e.chunkArray(f,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>p().in(g,y),h=>a(m,h))}async function u(m,g){if(g.length)for(let f of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>p().in("id",f),y=>a(m,y))}function p(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function a(m,g){(g||[]).forEach(f=>{f?.id&&m.set(f.id,{...m.get(f.id)||{},...f})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:d,exactWorkOrderSearchRows:o,addRelatedWorkOrderIdsFromParts:r,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:c}})();(function(){function c(e){function n(o){return e[o]()}function t(){let o=n("searchQuery").trim(),i=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),l=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],o)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],o)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),p=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],o)).sort((g,f)=>new Date(f.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),a=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],o)).sort((g,f)=>String(g.next_due_at||"").localeCompare(String(f.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),m=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(f=>f.prompt)],o)).sort((g,f)=>g.name.localeCompare(f.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:i,assets:l,parts:u,requests:p,pm:a,procedures:m}}function r(o="all"){let i=e.startOfToday(),l=new Date(i);return l.setDate(l.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(u=>u.status!=="completed").filter(u=>e.matchesSearch([u.title,u.description,u.priority,u.status,u.assets?.name,e.assignmentLabel(u)])).filter(u=>o==="no_due"?!u.due_at:!!u.due_at).map(u=>{let p=u.due_at?new Date(`${u.due_at}T00:00:00`):null;return{kind:o==="no_due"?"no_due":"work",id:u.id,title:u.title,priority:u.priority,status:u.status,assetName:u.assets?.name||"No equipment",dueAt:u.due_at,due:p,createdAt:u.created_at||"",assignedTo:e.assignmentLabel(u),workOrder:u}}).filter(u=>o==="no_due"?!0:o==="overdue"?u.due<i:o==="today"?u.due.getTime()===i.getTime():o==="soon"?u.due>i&&u.due<=l:!0).sort((u,p)=>{if(o==="no_due"){let a={critical:4,high:3,medium:2,low:1};return(a[p.priority]||0)-(a[u.priority]||0)||new Date(u.createdAt||0)-new Date(p.createdAt||0)}return u.due-p.due})}function s(){let o=e.startOfToday(),i=new Date(o);return i.setDate(i.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(l=>{let u=new Date(`${l.next_due_at}T00:00:00`);return u>=o&&u<=i}).filter(l=>e.matchesSearch([l.title,l.frequency,l.next_due_at,l.assets?.name])).map(l=>({kind:"pm",id:l.id,title:l.title,assetName:l.assets?.name||"No equipment",dueAt:l.next_due_at,due:new Date(`${l.next_due_at}T00:00:00`)})).sort((l,u)=>l.due-u.due)}function d(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(o=>o.follow_up_needed).filter(o=>e.matchesSearch([o.title,o.description,o.failure_cause,o.resolution_summary,o.assets?.name,o.assigned_profile?.full_name])).map(o=>({kind:"follow_up",id:o.id,title:o.title,assetName:o.assets?.name||"No equipment",completedAt:o.completed_at?new Date(o.completed_at).toLocaleDateString():"not completed",resolution:o.resolution_summary||o.completion_notes||"",workOrder:o})).sort((o,i)=>o.title.localeCompare(i.title))}return{globalSearchResults:t,planningItems:r,planningPmItems:s,followUpItems:d}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:c}})();(function(){function c(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,r){return n.from("locations").insert({company_id:t,name:r}).select("id").single()}window.MaintainOpsLocationsService={listLocations:c,createLocation:e}})();(function(){function c(d,o){return d.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",o)}function e(d,o){return d.from("company_members").select("*").eq("company_id",o).order("created_at",{ascending:!0})}function n(d,o){return d.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",o).order("created_at",{ascending:!1})}function t(d,o){return d.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",o).order("created_at",{ascending:!1})}function r(d,o){return d.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",o).order("created_at",{ascending:!1})}function s(d,o){return d.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",o).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:c,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:r,listRequestNotificationRecipients:s}})();(function(){function c(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:c}})();(function(){function c(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:c,listAssetFinancials:e}})();(function(){function c(i,l,u={}){return i.from("work_orders").select(l,u)}function e(i){return i.from("work_orders").select("id",{count:"exact",head:!0})}function n(i,l,u,p){return i.from("work_orders").select(p).eq("company_id",l).eq("id",u).maybeSingle()}function t(i,l,u,p){return i.from("work_orders").select(p).eq("company_id",l).eq("asset_id",u).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function r(i,l){let{companyId:u,locationId:p,locationsReady:a,selectClause:m,ids:g}=l,f=i.from("work_orders").select(m).eq("company_id",u).in("id",g);return a&&p&&(f=f.eq("location_id",p)),f}function s(i,l){let{companyId:u,locationId:p,locationsReady:a}=l,m=i.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",u);return a&&p&&(m=m.eq("location_id",p)),m}function d(i,l){let{companyId:u,locationId:p,locationsReady:a}=l,m=i.from("work_orders").select("id, assigned_to, production_action_assigned_to, production_action_status, status, due_at, location_id").eq("company_id",u).in("status",["open","in_progress","blocked","completed"]).or("assigned_to.not.is.null,and(production_action_assigned_to.not.is.null,production_action_status.eq.open)");return a&&p&&(m=m.eq("location_id",p)),m.order("id",{ascending:!0})}async function o(i,l,u=1/0,p=1e3){let a=0,m=0;for(;m<u;){let g=Math.min(p,u-m),{data:f,error:y}=await i().range(a,a+g-1);if(y)throw y;let h=f||[];if(l(h),m+=h.length,h.length<g)break;a+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:c,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:r,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:d,fetchPagedSearchRows:o}})();var Fo=Q(dn());(function(){function c(s){return s.rpc("get_my_companies")}function e(s,d){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",d).order("created_at",{ascending:!0})}function n(s,d){return s.from("company_members").select("company_id, role").eq("user_id",d).order("created_at",{ascending:!0})}function t(s,d){return s.from("companies").select("id, name, logo_path, created_at").in("id",d).order("created_at",{ascending:!0})}function r(s,d){return s.from("companies").select("id, name, created_at").in("id",d).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:c,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:r}})();(function(){function c(r,s){return r.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(r,s){return r.from("app_issue_reports").insert(s)}function n(r,s,d,o){return r.from("app_issue_reports").update({status:o,resolved_at:o==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",d)}function t(r,s,d){return r.from("app_issue_reports").delete().eq("company_id",s).eq("id",d)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:c,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let c="user_id, shop_reference_favorites, updated_at";function e(t,r){return t.from("user_preferences").select(c).eq("user_id",r).maybeSingle()}function n(t,r,s){return t.from("user_preferences").upsert({user_id:r,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(c).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var Qo=Q(pn()),Bo=Q(mn()),jo=Q(fn()),zo=Q(gn());(function(){function c(t,r,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${r}</strong></article>`}function e(t,r,s,d="neutral"){return`
    <article class="insight dashboard-card tone-${d}">
      <span>${t}</span>
      <strong>${r}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","production","accounting","manager","admin"],r=window.MaintainOpsFormatting?.roleLabel||(o=>String(o||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),d=window.MaintainOpsDom?.escapeHtml||(o=>String(o??""));return`
    <section class="team-role-guide">
      ${t.map(o=>`
        <article>
          <strong>${r(o)}</strong>
          <span>${d(s(o))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:c,renderInsight:e,renderRoleGuide:n})})();var Go=Q(hn());(function(){function c(p,a,m="active",g={},f){let y=f.getActiveStatusFilter(),h=g.filter||g.section,b=h?"button":"article",w=g.filter&&y===g.filter?" selected":"",P=m.includes("overdue")&&Number(a)>=3,$=P?" alert-blink":"",R=[h?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${y===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),C=R?` ${R}`:"";return`
    <${b} class="gauge-readout ${m}${w}${$}"${C}>
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
      <strong>${a}</strong>
      <span>${f.escapeHtml(p)}</span>
    </${b}>
  `}function e(p){let a=p.getWorkOrderDashboardCounts()||{},m=a.activeWork||0,g=a.newWork||0,f=a.inProgress||0,y=a.blocked||0,h=a.overdue||0,b=a.completedAll||0,w=a.completedMonth||0,P=a.completedWeek||0,$=p.getRequestsReady()?p.openMaintenanceRequests().filter(p.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${c("Active Work",m,"active",{filter:"active"},p)}
      ${c("New",g,"new",{filter:"open"},p)}
      ${c("In Progress",f,"in_progress",{filter:"in_progress"},p)}
      ${c("Blocked",y,"blocked",{filter:"blocked"},p)}
      ${c("Overdue",h,"overdue",{filter:"overdue"},p)}
      ${c("Requests",$,"request",{filter:"requests"},p)}
      ${c("All Completed",b,"completed",{filter:"completed"},p)}
      ${c("Completed Month",w,"completed",{filter:"completed_month"},p)}
      ${c("Done This Week",P,"completed",{filter:"completed_week"},p)}
    </div>
  `}function n(p,a){let m=p||{},g=m.newWork||0,f=m.inProgress||0,y=m.blocked||0,h=m.activeWork??g+f+y,b=m.overdue||0,w=m.completedAll||0,P=m.completedMonth||0,$=m.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${c("Active Work",h,"active workload-pill",{filter:"active"},a)}
      ${c("New",g,"new workload-pill",{filter:"open"},a)}
      ${c("In Progress",f,"in_progress workload-pill",{filter:"in_progress"},a)}
      ${c("Blocked",y,"blocked workload-pill",{filter:"blocked"},a)}
      ${c("Overdue",b,"overdue workload-pill",{filter:"overdue"},a)}
      ${c("All Completed",w,"completed workload-pill",{filter:"completed"},a)}
      ${c("Completed Month",P,"completed workload-pill",{filter:"completed_month"},a)}
      ${c("Done This Week",$,"completed workload-pill",{filter:"completed_week"},a)}
    </div>
  `}function t(p){return p.getWorkOrders().filter(a=>p.getDueState(a)?.className==="overdue")}function r(p){return p.getWorkOrders().filter(a=>s(a,p))}function s(p,a,m=new Date){if(!p.completed_at)return!1;let g=new Date(p.completed_at),f=a.sundayWeekRange(m);return Number.isFinite(g.getTime())&&g>=f.start&&g<f.end}function d(p){return p.getWorkOrders().filter(o)}function o(p){let a=new Date,m=new Date(a.getFullYear(),a.getMonth(),1);return!!(p.completed_at&&new Date(p.completed_at)>=m)}function i(p){let a=p.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!a.length)return 0;let m=a.reduce((g,f)=>g+Number(f.actual_minutes||0),0);return Math.round(m/a.length)}function l(p){let a=new Date;a.setHours(0,0,0,0);let m=new Date(a);return m.setDate(m.getDate()+7),p.getPreventiveSchedules().filter(g=>{let f=new Date(`${g.next_due_at}T00:00:00`);return f>=a&&f<=m})}function u(p){return Object.freeze({renderGaugeReadout:(a,m,g="active",f={})=>c(a,m,g,f,p),renderWorkOrderGaugeDashboard:()=>e(p),renderWorkloadStrip:a=>n(a,p),overdueWorkOrders:()=>t(p),completedThisWeek:()=>r(p),isCompletedThisWeek:(a,m)=>s(a,p,m),completedThisMonth:()=>d(p),isCompletedThisMonth:o,averageCompletionMinutes:(a=p.getWorkOrders())=>i(a),preventiveDueSoon:()=>l(p)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:u})})();(function(){function c(n){let t={active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:c,navIcon:e})})();(function(){function c(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,r=>r.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:c,assetStatusLabel:e})})();(function(){function c({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:r,getPartInventoryFilter:s,assetTypeLabel:d,assetStatusLabel:o}){function i(p){return e().trim()?"No requests match this search.":p==="converted"?"No converted requests at this location.":p==="all"?"No requests at this location yet.":"No active requests waiting for review."}function l(){let p=n(),a=t?t():"all";return e().trim()?"No equipment matches this search.":p!=="all"?`No ${o(p).toLowerCase()} equipment found.`:a!=="all"?`No ${d(a).toLowerCase()} equipment found.`:"No equipment added yet."}function u(){return r().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:i,assetEmptyStateText:l,partEmptyStateText:u}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:c}})();var Zo=Q(yn());(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:r,getSearchQuery:s}){function d(f){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(f)} previewed in ${e(r())}</span>
          </div>
          <div class="global-search-grid">
            ${o("Work Orders",f.work,i,"work",{showWorkSearchAction:!!s().trim()})}
            ${o("Equipment",f.assets,l,"asset")}
            ${o("Parts",f.parts,u,"parts")}
            ${o("Requests",f.requests,p,"comment")}
            ${o("PM",f.pm,a,"procedure")}
            ${o("Procedure Checklists",f.procedures,m,"procedure")}
          </div>
        </section>
      `}function o(f,y,h,b,w={}){return`
        <section class="global-result-group relationship-detail ${b}">
          <div class="panel-header compact">
            <h3>${e(f)}</h3>
            <span class="chip">${y.length}</span>
          </div>
          <div class="global-result-list">
            ${y.map(h).join("")||'<p class="muted">No matches.</p>'}
            ${w.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
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
          <span>${e(f.asset_code||"No serial")} - ${e(f.status)} - ${e(f.location||r())}</span>
        </button>
      `}function u(f){let y=Number(f.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${f.id}" type="button">
          <strong>${e(f.name)}</strong>
          <span>${e(f.sku||"No SKU")} - ${y} on hand${f.supplier_name?` - ${e(f.supplier_name)}`:""}</span>
        </button>
      `}function p(f){return`
        <button class="global-result-item" data-search-request="${f.id}" type="button">
          <strong>${e(f.title)}</strong>
          <span>${e(f.status)} - ${e(f.assets?.name||"No equipment")}</span>
        </button>
      `}function a(f){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(f.title)}" type="button">
          <strong>${e(f.title)}</strong>
          <span>${e(f.assets?.name||"No equipment")} - due ${e(f.next_due_at||"unset")}</span>
        </button>
      `}function m(f){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(f.name)}" type="button">
          <strong>${e(f.name)}</strong>
          <span>${(f.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(f){return Object.values(f).reduce((y,h)=>y+h.length,0)}return{renderGlobalSearchResults:d,renderGlobalResultGroup:o,renderGlobalWorkResult:i,renderGlobalAssetResult:l,renderGlobalPartResult:u,renderGlobalRequestResult:p,renderGlobalPmResult:a,renderGlobalProcedureResult:m,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:c}})();var ei=Q(bn()),ti=Q(wn()),ni=Q(vn());(function(){function c({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:r=(l,u)=>u,renderListPagination:s,statusLabel:d,renderRelationshipChips:o,canEditOperationalRecords:i=()=>!0}){function l(m,g,f,y,h={}){let b=n||12,w=typeof t=="function"?t(y):1,P=Math.max(1,Math.ceil(g.length/b)),$=Math.min(Math.max(w,1),P),R=g.slice(($-1)*b,$*b),C=r(y,!!(h.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(y)}" ${C?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(m)}</strong>
              ${h.description?`<small>${e(h.description)}</small>`:""}
            </span>
            <span class="chip ${f}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${R.map(a).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${y}`,g.length,$,P):""}
          </div>
        </details>
      `}function u(m,g,f,y=""){return`
        <section class="planning-lane ${y}">
          <header class="planning-lane-header">
            <h3>${e(m)}</h3>
            <p>${e(g)}</p>
          </header>
          ${f}
        </section>
      `}function p(m){return`
        <div class="planning-grid">
          ${u("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${l("No Due Date",m.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${l("Follow-up Needed",m.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${u("Current schedule","Work requiring attention now.",`
            ${l("Overdue",m.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${l("Due Today",m.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${u("Upcoming","Near-term maintenance and preventive work.",`
            ${l("Next 7 Days",m.soon,"in_progress","soon")}
            ${l("PM Due Soon",m.pm,"open","pm")}
          `)}
        </div>
      `}function a(m){if(m.kind==="follow_up")return`
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
            <button class="secondary-button" data-generate-pm="${m.id}" type="button">Generate Work</button>
          </article>
        `;if(m.kind==="no_due"){let g=m.createdAt?new Date(m.createdAt):null,f=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(m.priority)} ${e(d(m.status))}</span>
              <strong>${e(m.title)}</strong>
              <p>${e(m.assetName)} - ${e(m.assignedTo||"Unassigned")}</p>
              <p>Created ${e(f)}</p>
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
            <span class="eyebrow">${e(m.priority)} ${e(d(m.status))}</span>
            <strong>${e(m.title)}</strong>
            <p>${e(m.assetName)} - due ${e(m.dueAt)}</p>
          </div>
          ${o(m.workOrder)}
        </article>
      `}return{renderPlanningGroup:l,renderPlanningBoard:p,renderPlanningItem:a}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:c}})();var ai=Q(kn());(function(){function c({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:r,getWorkOrderPage:s,getPartsPage:d,getAssetsPage:o}){function i(a,m){if(a<=e)return"";let g=s(),f=(g-1)*e+1,y=Math.min(a,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${y} of ${a} - Page ${g} of ${m}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=m?"disabled":""}>Next</button>
        </div>
      `}function l(a,m){if(a<=n)return"";let g=d(),f=(g-1)*n+1,y=Math.min(a,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${y} of ${a} - Page ${g} of ${m}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=m?"disabled":""}>Next</button>
        </div>
      `}function u(a,m){if(a<=t)return"";let g=o(),f=(g-1)*t+1,y=Math.min(a,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${f}-${y} of ${a} - Page ${g} of ${m}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=m?"disabled":""}>Next</button>
        </div>
      `}function p(a,m,g,f){if(m<=r)return"";let y=(g-1)*r+1,h=Math.min(m,g*r);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${a}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${y}-${h} of ${m} - Page ${g} of ${f}</span>
          <button class="secondary-button page-action-button" data-list-page="${a}" data-page-direction="next" type="button" ${g>=f?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:i,renderPartsPagination:l,renderAssetsPagination:u,renderListPagination:p}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:c}})();var ii=Q(_n());(function(){function c({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:r,matchesActiveLocation:s,isAssetDescendantOf:d,parentAssetFor:o}){function i(g=t()){return n().map(f=>`<option value="${f.id}" ${f.id===g?"selected":""}>${e(f.name)}</option>`).join("")}function l(g){let f=o(g);return f?`${g.name} - part of ${f.name}`:g.name}function u(g=""){let f=r().filter(s).sort((b,w)=>l(b).localeCompare(l(w))),y=g?r().find(b=>b.id===g):null;return(y&&!f.some(b=>b.id===y.id)?[y,...f]:f).map(b=>`<option value="${b.id}" ${b.id===g?"selected":""}>${e(l(b))}</option>`).join("")}function p(g="",f=""){return r().filter(s).filter(y=>y.id!==f&&!d(y.id,f)).sort((y,h)=>l(y).localeCompare(l(h))).map(y=>`<option value="${y.id}" ${y.id===g?"selected":""}>${e(l(y))}</option>`).join("")}function a(g=""){let f=[...new Set(r().filter(s).map(h=>String(h.location||"").trim()).filter(Boolean))].sort((h,b)=>h.localeCompare(b)),y=String(g||"").trim();return y&&!f.includes(y)?[y,...f]:f}function m(g=""){return a(g).map(f=>`<option value="${e(f)}" ${f===g?"selected":""}>${e(f)}</option>`).join("")}return{renderLocationOptions:i,renderAssetOptions:u,renderParentAssetOptions:p,renderAssetAreaOptions:m,assetOptionLabel:l}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:c}})();(function(){function c({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function r(s){if(!s.photo_storage_path)return"";let d=s.photo_file_name||s.photo_original_file_name||"Request photo",o=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(d)}">`:""}
          <div>
            <strong>${e(d)}</strong>
            <span>${e(o)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:r}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:c}})();(function(){function c({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let r=e();if(r>0)return`<b class="nav-badge nav-alert-badge">${r}!</b>`;let s=n();return s>0?`<b class="nav-badge">${s}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:c}})();(function(){function c(){function e(r){let s=Number(r);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(r){let s=e(r);return s?s>99?"99+":String(s):""}function t(r,s={}){let d=n(r);if(!d)return"";let o=s.alert?" nav-alert-badge":"",i=s.alertSuffix?"!":"";return`<b class="nav-badge${o}">${d}${i}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function r(s){let d=n()[s.reporter_id]?.full_name||"Team member",o=t().find(u=>u.id===s.location_id)?.name||"No location",i=s.status||"open",l=s.severity||"normal";return`
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
            <small>${e(d)} - ${e(s.screen||"workspace")}</small>
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
      `}return{renderAppIssueReport:r}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:r,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:d}){function o(l){let u=s()[l.id]||[],p=u[u.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(l.title)}</strong>
            <span>${e(t(l))}${p?` - ${e(n(p.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${l.id}" type="button">Open Thread</button>
        </article>
      `}function i(l){let u=r().filter(p=>p.work_order_id===l.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${l.id}" type="button">Message Team</button>
            ${d()?`
              <div class="work-linked-thread-list">
                ${u.map(o).join("")||'<p class="muted">No message threads linked yet.</p>'}
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
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:c}})();(function(){function c({escapeHtml:e}){function n(r,s,d,o,i){return`
        <button class="command-card command-${i} ${s?"":"empty"}" data-jump-work-section="${d}" type="button">
          <span>${e(r)}</span>
          <strong>${s}</strong>
          <small>${e(o)}</small>
        </button>
      `}function t(r){return r.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:r,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:d,getMessageThreads:o,getPartsUsedByWorkOrder:i}){function l(u){let p=o().filter(f=>f.work_order_id===u.id).length,a=(i()[u.id]||[]).reduce((f,y)=>f+(Number(y.quantity_used)||0),0),m=u.asset_id?s(u)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=u.status==="completed"?"Review history or create follow-up if needed":u.status==="blocked"?"Resolve blocker or add current update":u.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
            <small>${r(u)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${m[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${m[0]}</strong>
            <small>${e(m[1])}</small>
          </button>
          ${d(u)}
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
      `}function s(){let d=n();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${t()?`
            <p class="muted">Rename a source to correct spelling or merge duplicates across every part using that exact name.</p>
            <div class="part-source-list">
              ${d.map(o=>`
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
      `}return{renderPartSourceOptions:r,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:c}})();(function(){function c({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:r,parentAssetFor:s,childAssetsFor:d}){function o(i){let l=t().filter(a=>a.asset_id===i.id&&a.status!=="completed").length,u=s(i),p=d(i.id);return`
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
            ${u?`<p>Part of ${e(u.name)}</p>`:""}
            ${p.length?`<p>${p.length} linked item${p.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${l} open work</span>
        </article>
      `}return{renderAssetCard:o}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function r(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(d=>`<option value="${d.id}" ${d.id===s?"selected":""}>${e(d.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:r}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:c}})();(function(){function c({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function r(d){let o=n().filter(i=>i.thread_id===d.id).map(i=>t(i.user_id));return o.length?o.join(", "):"Direct message"}function s(d){return d.thread_type==="direct"?r(d):d.thread_type==="location"?e().find(o=>o.id===d.location_id)?.name||"Location thread":"Whole company"}return{directThreadNames:r,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:r,unreadMessageCount:s,getMessagesByThreadId:d,getActiveMessageThreadId:o}){function i(l){let p=(d()[l.id]||[]).filter(y=>!y.deleted_at),a=l.latest_message||p[p.length-1],m=s(l.id),g=a?.body?`${e(t(a.sender_id))}: ${e(a.body)}`:"Last activity",f=a?`${g} - ${e(n(a.created_at))}`:"No messages yet";return`
        <button class="message-thread-button ${l.id===o()?"active":""}" data-message-thread="${l.id}" type="button">
          <strong>${e(l.title)}${m?`<span class="message-unread-pill">${m}</span>`:""}</strong>
          <span>${e(r(l))}</span>
          <small>${f}</small>
        </button>
      `}return{renderMessageThreadButton:i}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:c}})();(function(){function c({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:c}})();var Si=Q(Sn());(function(){function c({getLocations:e}){function n(t){let r=e().find(s=>s.id===t.default_location_id);return r?`Default location: ${r.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:c}})();(function(){function c({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function r(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:r}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:c}})();(function(){function c(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function r(s){let d=n(s),o=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",i=e.assignmentLabel(s),l=e.cleanWorkOrderDescription(s.description)||s.title,u=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${d} is down or needs maintenance attention. At this time, the expected downtime is ${o}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${l}`,`Work order: ${s.title}`,`Equipment: ${d}`,`Current update: ${u}`,`Assigned to: ${i}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:r}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:c}})();(function(){function c(){function e(t){let r=t?.message||"";return r.includes("assets_asset_type_check")||r.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:c}})();(function(){function c(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:c}})();(function(){function c(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,d){let o=n(s);return d!==e.OUTSIDE_VENDOR_VALUE?o||null:[o,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function r(s,d){let o=String(s||"").trim();if(!d?.photo_storage_path)return o||null;let i="[Request photo attached to original request]";return o?`${o}

${i}`:i}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:r}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:c}})();(function(){function c(){function e(n,t){if(!n)return"Work order updated.";let r=[];return n.title!==t.title&&r.push("title"),(n.description||"")!==(t.description||"")&&r.push("description"),(n.due_at||"")!==(t.due_at||"")&&r.push("due date"),n.priority!==t.priority&&r.push("priority"),(n.type||"corrective")!==t.type&&r.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&r.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&r.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&r.push("actual minutes"),r.length?`Updated ${r.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:c}})();(function(){function c(){function e(n,t,r,s=[]){return[...n.map(d=>({...d,type:"comment"})),...t.map(d=>({...d,type:"photo"})),...s.map(d=>({...d,type:"part"})),...r.map(d=>({...d,type:"event"}))].sort((d,o)=>new Date(o.created_at)-new Date(d.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:c}})();(function(){function c(e){function n(o){return Number(o.quantity_on_hand)<=Number(o.reorder_point)}function t(){return e.getParts().filter(n)}function r(o){let i=e.getPartSearchQuery().trim().toLowerCase();return i?o.some(l=>String(l??"").toLowerCase().includes(i)):!0}function s(){let o=e.getParts().filter(i=>!e.matchesActiveLocation(i)||e.getPartInventoryFilter()==="low"&&!n(i)?!1:r([i.name,i.sku,i.supplier_name,i.machine_note,i.quantity_on_hand,i.reorder_point,i.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...o].sort((i,l)=>{let u=String(i.supplier_name||"zzzzzz").localeCompare(String(l.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return u||String(i.name||"").localeCompare(String(l.name||""),void 0,{sensitivity:"base"})}):o}function d(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(o=>String(o.supplier_name||"").trim()).filter(Boolean))].sort((o,i)=>o.localeCompare(i))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:r,partSourceOptions:d}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:c}})();(function(){function c(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(r=>r.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getMaintenanceRequests().filter(i=>i.status==="submitted")}function t(i){return e.matchesActiveLocation(i)&&e.matchesSearch([i.title,i.description,i.status,i.priority,i.assets?.name,e.getProfilesByUserId()[i.requested_by]?.full_name])}function r(i){return i.status==="converted"||!!i.converted_work_order_id}function s(i,l=e.getRequestViewFilter()){return l==="converted"?r(i):l==="all"?!0:!r(i)&&i.status==="submitted"}function d(i=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(l=>t(l)&&s(l,i))}function o(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:r,requestMatchesViewFilter:s,filteredRequests:d,requestFilterCounts:o}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:c}})();(function(){function c(){function e(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return r.length?`This equipment is kept for traceability because it has ${r.join(", ")}.`:""}function n(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return r.length?`This procedure is kept for traceability because it is linked to ${r.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:c}})();(function(){function c(e){function n(d){return e.getAssets().find(o=>o.id===d?.parent_asset_id)||null}function t(d){return e.getAssets().filter(o=>o.parent_asset_id===d).sort((o,i)=>o.name.localeCompare(i.name))}function r(d,o){if(!d||!o)return!1;let i=e.getAssets().find(u=>u.id===d),l=new Set;for(;i?.parent_asset_id&&!l.has(i.id);){if(i.parent_asset_id===o)return!0;l.add(i.id),i=e.getAssets().find(u=>u.id===i.parent_asset_id)}return!1}function s(){return e.getAssets().filter(d=>!e.matchesActiveLocation(d)||e.getAssetStatusFilter()!=="all"&&d.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(d.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(d.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([d.name,d.asset_code,d.manufacturer,d.model,d.location,d.status,d.asset_type,n(d)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:r}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:c}})();var Li=Q(qn());(function(){function c(e){function n(r){let s=e.getSearchQuery().trim().toLowerCase();return s?r.some(d=>String(d??"").toLowerCase().includes(s)):!0}function t(r,s=e.getSearchQuery()){let d=s.trim().toLowerCase();return d?r.some(o=>String(o??"").toLowerCase().includes(d)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:c}})();(function(){function c(e){function n(o){return o.due_at?new Date(`${o.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(o){return{low:1,medium:2,high:3,critical:4}[o]||0}function r(o){return o.completed_at?new Date(o.completed_at).getTime():0}function s(o){return typeof e.assignmentLabel=="function"?e.assignmentLabel(o):o.assigned_profile?.full_name||o.assigned_to||"Unassigned"}function d(o,i){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?r(i)-r(o)||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="due"?n(o)-n(i)||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="priority"?t(i.priority)-t(o.priority)||n(o)-n(i):e.getWorkSort()==="type"?String(o.type||"").localeCompare(String(i.type||""))||new Date(i.created_at)-new Date(o.created_at):e.getWorkSort()==="assigned"?s(o).localeCompare(s(i))||new Date(i.created_at)-new Date(o.created_at):new Date(i.created_at)-new Date(o.created_at)}return{compareWorkOrders:d,dueSortValue:n,prioritySortValue:t,completedSortValue:r,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:c}})();(function(){function c(e){function n(r){return r?.location_id||r?.assets?.location_id||null}function t(r){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(r)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getWorkOrders().filter(i=>e.matchesActiveLocation(i)&&i.status!=="completed").slice(0,8)}function t(){let i=e.getMessageThreadFilter();return e.getMessageThreads().filter(l=>(i==="all"||i==="unread"&&s(l.id)>0||l.thread_type===i)&&e.matchesQuery(r(l),e.getMessageSearchQuery()))}function r(i){let l=e.getMessageThreadMembers().filter(u=>u.thread_id===i.id).map(u=>e.teamMemberName(u.user_id));return[i.title,e.messageThreadScopeLabel(i),...l]}function s(i){let l=e.getMessageReadsByThreadId()[i]?.last_read_at,u=l?new Date(l).getTime():0;return(e.getMessagesByThreadId()[i]||[]).filter(p=>p.deleted_at||p.sender_id===e.getCurrentUser()?.id?!1:new Date(p.created_at).getTime()>u).length}function d(){return e.getMessageThreads().reduce((i,l)=>i+s(l.id),0)}function o(){return e.getMessageThreads().filter(i=>i.thread_type==="direct").reduce((i,l)=>i+s(l.id),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:r,unreadMessageCount:s,totalUnreadMessages:d,directUnreadMessages:o}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let r=e.getActiveStatusFilter();return r==="overdue"?e.getDueState(t)?.className==="overdue":r==="completed_month"?e.isCompletedThisMonth(t):r==="completed_week"?e.isCompletedThisWeek(t):r==="active"||r==="all"?t.status!=="completed":t.status===r}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let r=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],d=e.getEventsByWorkOrder()[t.id]||[],o=e.getPhotosByWorkOrder()[t.id]||[],i=e.getProcedureTemplates().find(p=>p.id===t.procedure_template_id),l=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),u=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.production_action,u[t.production_action_assigned_to]?.full_name,t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,i?.name,i?.description,...(i?.procedure_steps||[]).flatMap(p=>[p.prompt,p.step_type]),...r.flatMap(p=>[p.parts?.name,p.parts?.sku,p.parts?.supplier_name,p.quantity_used,p.unit_cost]),...s.flatMap(p=>[p.body,u[p.author_id]?.full_name]),...d.flatMap(p=>[p.event_type,p.summary,u[p.actor_id]?.full_name]),...o.flatMap(p=>[p.file_name,p.original_file_name,p.content_type]),...l.flatMap(p=>[p.value,p.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:c}})();(function(){function c(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(r=>e.matchesActiveLocation(r)?(e.getMyWorkFilter()==="created"?r.created_by===t:e.isWorkOrderAssignedToUser(r,t))&&e.matchesSearch(e.workOrderSearchValues(r)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:c}})();var Yi=Q(Cn()),Ki=Q($n()),Ji=Q(Pn()),Zi=Q(An()),Xi=Q(Rn()),es=Q(En()),ts=Q(On()),ns=Q(Wn());(function(){function c(t){if(!t)return"";let r=new Date(t),s=new Date,d=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),o=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),i=r.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return o===d?`Today ${i}`:o===d-864e5?`Yesterday ${i}`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let r=new Date(t),s=new Date,d=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),o=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime();return o===d?"Today":o===d-864e5?"Yesterday":r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let r=String(t||"").trim().split(/\s+/).filter(Boolean);return r.length?r.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:c,formatMessageDay:e,initials:n})})();(function(){function c(e){function n(r){let s=r.sender_id===e.getCurrentUserId(),d=e.teamMemberName(r.sender_id);return`
    <article class="message-bubble ${s?"mine":""}">
      <span class="message-avatar" aria-hidden="true">${e.escapeHtml(e.initials(d))}</span>
      <div class="message-bubble-meta">
        <strong>${e.escapeHtml(d)}</strong>
        <span>${e.escapeHtml(e.formatMessageTime(r.created_at))}</span>
      </div>
      <p>${e.escapeHtml(r.body)}</p>
      ${s&&(e.canEditOperationalRecords?.()??!0)?`<button class="message-delete-button" data-delete-message="${e.escapeHtml(r.id)}" type="button">Delete</button>`:""}
    </article>
  `}function t(r){let s=r.filter(o=>!o.deleted_at);if(!s.length)return'<p class="muted">No messages yet.</p>';let d="";return s.map(o=>{let i=e.formatMessageDay(o.created_at),l=i!==d?`<div class="message-day-divider"><span>${e.escapeHtml(i)}</span></div>`:"";return d=i,`${l}${n(o)}`}).join("")}return Object.freeze({renderMessageBubble:n,renderMessageList:t})}window.MaintainOpsMessageDisplay=Object.freeze({createMessageDisplayHelpers:c})})();})();
//# sourceMappingURL=runtime.9ffa260d2e.js.map
