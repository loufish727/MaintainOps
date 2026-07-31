(()=>{var gn=Object.create;var ht=Object.defineProperty;var hn=Object.getOwnPropertyDescriptor;var yn=Object.getOwnPropertyNames;var bn=Object.getPrototypeOf,wn=Object.prototype.hasOwnProperty;var B=(c,e)=>()=>{try{return e||c((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var vn=(c,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of yn(e))!wn.call(c,r)&&r!==n&&ht(c,r,{get:()=>e[r],enumerable:!(t=hn(e,r))||t.enumerable});return c};var j=(c,e,n)=>(n=c!=null?gn(bn(c)):{},vn(e||!c||!c.__esModule?ht(n,"default",{value:c,enumerable:!0}):n,c));var yt=B((_n,Oe)=>{(function(){let c=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},n=2,t=typeof window<"u"?window:null,r=typeof document<"u"?document:null,s=typeof navigator<"u"?navigator:{},p=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),a=p(),o={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,lastPersistedInpValue:null,inpCaptureTimer:null,workspaceStartedAt:a,workspaceLoadPending:!1,workspaceLoadWasHidden:r?.visibilityState==="hidden",navigationStartedAt:p(),offlineStartedAt:0,lastHiddenAt:-1,persistenceEnabled:!s.webdriver},d=new Map,m=0;function f(E){if(E==null||E==="")return null;let w=Number(E);return Number.isFinite(w)&&w>=0?w:null}function i(){let E=s.connection||s.mozConnection||s.webkitConnection,w=t?.matchMedia?.("(pointer: coarse)")?.matches,$=f(s.deviceMemory),S=f(s.hardwareConcurrency),R=$!==null&&$<=4||S!==null&&S<=4||w?"constrained":"standard",x=f(t?.innerWidth);return{source:"browser",device_tier:R,viewport_class:x!==null&&x<720?"mobile":x!==null&&x<1100?"tablet":"desktop",connection_type:String(E?.effectiveType||"unknown").slice(0,24),online:s.onLine!==!1,save_data:!!E?.saveData}}function u(E={}){let w={...i(),measurement_version:n,...E};return Object.fromEntries(Object.entries(w).filter(([,$])=>$!=null&&$!==""))}function g(E=12e3){!o.client||!o.companyId||o.flushTimer||Date.now()<o.disabledUntil||typeof t?.setTimeout=="function"&&(o.flushTimer=t.setTimeout(()=>{o.flushTimer=null,h()},E))}function l(E,w,$={},S={}){if(!c.has(E))return!1;let R=f(w);if(R===null)return!1;let x=Number(R.toFixed(E==="cls"?4:2));return o.latest[E]={metric:E,value:x,unit:e[E],context:u($),measuredAt:new Date().toISOString()},S.persist!==!1&&o.persistenceEnabled&&(o.pending.push({metric:E,value:x,unit:e[E],context:u($)}),o.pending.length>60&&o.pending.splice(0,o.pending.length-60),g(S.immediate?250:12e3)),!0}async function h(){if(!o.client||!o.companyId||!o.pending.length||Date.now()<o.disabledUntil)return!1;let E=o.companyId,w=o.pending.splice(0,20),$=null;try{$=(await o.client.rpc("record_app_performance_samples",{target_company_id:E,samples:w})).error||null}catch(R){$=R}if(!$)return o.pending.length&&g(1e3),!0;o.companyId===E&&o.pending.unshift(...w);let S=String($.message||$).toLowerCase();return o.disabledUntil=Date.now()+(S.includes("could not find")||S.includes("does not exist")?3e5:6e4),!1}function y({client:E,companyId:w}){if(o.client=E||null,o.companyId=w||"",!(!o.client||!o.companyId)){if(o.configuredCompanyId!==o.companyId){o.configuredCompanyId=o.companyId,l("session_start",1,{source:"workspace"},{immediate:!0});let $=s.connection||s.mozConnection||s.webkitConnection;f($?.downlink)!==null&&l("connection_downlink_mbps",$.downlink,{source:"browser-estimate"}),f($?.rtt)!==null&&l("connection_rtt_ms",$.rtt,{source:"browser-estimate"})}g(250)}}function b(){o.workspaceStartedAt=p(),o.workspaceLoadPending=!0,o.workspaceLoadWasHidden=r?.visibilityState==="hidden"}function _(E){if(!E)return;if(o.workspaceCompanies.has(E)){o.workspaceLoadPending=!1;return}o.workspaceCompanies.add(E);let w=!o.workspaceLoadWasHidden&&r?.visibilityState!=="hidden";l("workspace_ready_ms",p()-o.workspaceStartedAt,{source:"app-shell"},{immediate:!0,persist:w}),o.workspaceLoadPending=!1,o.latest.cls||l("cls",m,{source:"performance-observer"},{persist:!1}),w&&t?.setTimeout?.(()=>A(["fcp_ms","lcp_ms","inp_ms"]),1e3)}function A(E=["fcp_ms","lcp_ms","inp_ms","cls"]){if(!o.companyId||!o.workspaceCompanies.has(o.companyId))return;let w=new Set(E);Object.values(o.latest).filter($=>w.has($.metric)).forEach($=>{let S=$.metric==="inp_ms";(S?o.lastPersistedInpValue===$.value:o.persistedVitals.has($.metric))||l($.metric,$.value,{source:"performance-observer"})&&(S?o.lastPersistedInpValue=$.value:o.persistedVitals.add($.metric))})}function P(E=1500){typeof t?.setTimeout=="function"&&(o.inpCaptureTimer&&typeof t.clearTimeout=="function"&&t.clearTimeout(o.inpCaptureTimer),o.inpCaptureTimer=t.setTimeout(()=>{o.inpCaptureTimer=null,A(["inp_ms"])},E))}function O(){o.navigationStartedAt=p()}function C(E){let w=Number(E);return r?.visibilityState==="hidden"||Number.isFinite(w)&&o.lastHiddenAt>=w}function v(E,w=o.navigationStartedAt){l("section_navigation_ms",p()-w,{source:String(E||"workspace").slice(0,48)},{persist:!C(w)})}function q(E,w,$=null){l("query_latency_ms",p()-w,{source:String(E||"query").slice(0,48)},{persist:!C(w)}),$&&l("client_error",1,{source:`query:${String(E||"unknown").slice(0,36)}`},{immediate:!0})}function k(E={}){let w={source:"performance-room",quality_tier:E.qualityTier||"unknown"};Object.entries({spatial_ready_ms:E.readyMs,spatial_fps:E.fps,spatial_frame_ms:E.frameMs,spatial_slow_frame_pct:E.slowFramePercent,spatial_draw_calls:E.drawCalls,spatial_triangles:E.triangles,spatial_geometries:E.geometries,spatial_textures:E.textures,webgl_context_loss:Number(E.contextLosses)>0?E.contextLosses:void 0}).forEach(([$,S])=>{f(S)!==null&&l($,S,w)}),g(500)}function T(){return{latest:{...o.latest},connection:i(),pendingCount:o.pending.length,measurementVersion:n,persistenceEnabled:o.persistenceEnabled}}function L(E,w,$={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(E)))try{new PerformanceObserver(R=>w(R.getEntries())).observe({type:E,...$})}catch{}}L("paint",E=>{let w=E.find($=>$.name==="first-contentful-paint");w&&l("fcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),L("largest-contentful-paint",E=>{let w=E.at(-1);w&&l("lcp_ms",w.startTime,{source:"performance-observer"},{persist:!1})}),L("layout-shift",E=>{E.forEach(w=>{w.hadRecentInput||(m+=w.value)}),l("cls",m,{source:"performance-observer"},{persist:!1})}),L("event",E=>{E.forEach($=>{$.interactionId&&d.set($.interactionId,Math.max(d.get($.interactionId)||0,$.duration))});let w=[...d.values()].sort(($,S)=>S-$);w.length&&(l("inp_ms",w[Math.min(Math.floor(w.length/50),10)],{source:"performance-observer"},{persist:!1}),P())},{buffered:!0,durationThreshold:16}),t?.addEventListener?.("error",()=>l("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>l("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{o.offlineStartedAt=p(),l("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{o.offlineStartedAt&&l("reconnect_ms",p()-o.offlineStartedAt,{source:"network"},{immediate:!0}),o.offlineStartedAt=0}),r?.addEventListener?.("visibilitychange",()=>{r.visibilityState==="hidden"&&(o.lastHiddenAt=p(),o.workspaceLoadPending&&(o.workspaceLoadWasHidden=!0),A(),h())});let D={beginWorkspaceLoad:b,configure:y,flush:h,markNavigationStart:O,markWorkspaceReady:_,record:l,recordQueryLatency:q,recordSectionNavigation:v,recordSpatial:k,snapshot:T};typeof window<"u"&&(window.MaintainOpsAppTelemetry=D),typeof Oe<"u"&&(Oe.exports=D)})()});var bt=B((Sn,Ee)=>{(function(){function c(n){return n?.user?.id||""}function e(n,t,r){let s=String(n||"");return!(!c(t)&&!c(r)||s==="TOKEN_REFRESHED"&&c(t)&&c(t)===c(r))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Ee<"u"&&(Ee.exports={shouldRenderForAuthEvent:e})})()});var wt=B((qn,We)=>{(function(){let c={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(a,o,d){if(!a||!a.getItem)return d;let m=a.getItem(o);return m??d}function n(a,o){let d=Number(e(a,o,"1"));return Number.isFinite(d)&&d>0?d:1}function t(a,o,d){!a||!a.setItem||a.setItem(o,String(d))}function r(a,o){try{let d=JSON.parse(e(a,o,"{}"));return d&&typeof d=="object"&&!Array.isArray(d)?d:{}}catch{return{}}}function s(a,o){!a||!a.removeItem||a.removeItem(o)}function p(a={}){let o=a.storage||localStorage,d={activeSection:e(o,c.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(o,c.activeMessageThreadId,""),searchQuery:e(o,c.searchQuery,""),workOrderSearchMode:e(o,c.workOrderSearchMode,"false")==="true",messageThreadFilter:e(o,c.messageThreadFilter,"all"),messageThreadsPage:n(o,c.messageThreadsPage),messageSearchQuery:e(o,c.messageSearchQuery,""),messageComposerWorkOrderId:e(o,c.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(o,c.managerDashboardUserId,""),managerDashboardMetric:e(o,c.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(o,c.myWorkFilter,"assigned"),workOrderFilter:e(o,c.workOrderFilter,"all"),workOrderAssigneeFilter:e(o,c.workOrderAssigneeFilter,""),workOrderTypeFilter:e(o,c.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(o,c.workOrderPriorityFilter,"all"),workSort:e(o,c.workSort,"newest"),workGroup:e(o,c.workGroup,"none"),requestViewFilter:e(o,c.requestViewFilter,"active"),workOrderPage:n(o,c.workOrderPage),partsPage:n(o,c.partsPage),assetsPage:n(o,c.assetsPage),financialPage:n(o,c.financialPage),financialMissingFilter:e(o,c.financialMissingFilter,"all"),financialLocationFilter:e(o,c.financialLocationFilter,"all"),financialTypeFilter:e(o,c.financialTypeFilter,"all"),financialAreaFilter:e(o,c.financialAreaFilter,"all"),requestsPage:n(o,c.requestsPage),planningOverduePage:n(o,c.planningOverduePage),planningTodayPage:n(o,c.planningTodayPage),planningSoonPage:n(o,c.planningSoonPage),planningNoDuePage:n(o,c.planningNoDuePage),planningFollowUpPage:n(o,c.planningFollowUpPage),planningPmPage:n(o,c.planningPmPage),planningGroupOpen:r(o,c.planningGroupOpen),schedulesPage:n(o,c.schedulesPage),proceduresPage:n(o,c.proceduresPage),membersPage:n(o,c.membersPage),assetStatusFilter:e(o,c.assetStatusFilter,"all"),assetTypeFilter:e(o,c.assetTypeFilter,"all"),assetAreaFilter:e(o,c.assetAreaFilter,"all"),partInventoryFilter:e(o,c.partInventoryFilter,"all"),partSort:e(o,c.partSort,"default"),partSearchQuery:e(o,c.partSearchQuery,"")};e(o,c.sectionSplitDone,"")!=="true"&&d.activeSection==="work"&&(d.activeSection="mywork",t(o,c.activeSection,d.activeSection),t(o,c.sectionSplitDone,"true")),d.activeSection==="performance"&&(d.activeSection="mywork",t(o,c.activeSection,d.activeSection));let m=(i,u,g)=>{d[i]=u,g&&t(o,g,u)},f=(i,u)=>{m(i,1,u)};return{getActiveSection:()=>d.activeSection,setActiveSection:i=>m("activeSection",i,c.activeSection),getActiveWorkOrderId:()=>d.activeWorkOrderId,setActiveWorkOrderId:i=>m("activeWorkOrderId",i),getActiveAssetId:()=>d.activeAssetId,setActiveAssetId:i=>m("activeAssetId",i),getActivePartId:()=>d.activePartId,setActivePartId:i=>m("activePartId",i),getActiveMessageThreadId:()=>d.activeMessageThreadId,setActiveMessageThreadId:i=>m("activeMessageThreadId",i,c.activeMessageThreadId),getMessageThreadFilter:()=>d.messageThreadFilter,setMessageThreadFilter:i=>m("messageThreadFilter",i,c.messageThreadFilter),getMessageThreadsPage:()=>d.messageThreadsPage,setMessageThreadsPage:i=>m("messageThreadsPage",i,c.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",c.messageThreadsPage),getMessageSearchQuery:()=>d.messageSearchQuery,setMessageSearchQuery:i=>m("messageSearchQuery",i,c.messageSearchQuery),getMessageComposerWorkOrderId:()=>d.messageComposerWorkOrderId,setMessageComposerWorkOrderId:i=>m("messageComposerWorkOrderId",i,c.messageComposerWorkOrderId),getMessageComposerOpen:()=>d.messageComposerOpen,setMessageComposerOpen:i=>m("messageComposerOpen",!!i),getManagerDashboardUserId:()=>d.managerDashboardUserId,setManagerDashboardUserId:i=>m("managerDashboardUserId",i||"",c.managerDashboardUserId),getManagerDashboardMetric:()=>d.managerDashboardMetric,setManagerDashboardMetric:i=>m("managerDashboardMetric",i||"open",c.managerDashboardMetric),getSearchQuery:()=>d.searchQuery,setSearchQuery:i=>m("searchQuery",i,c.searchQuery),getWorkOrderSearchMode:()=>d.workOrderSearchMode,setWorkOrderSearchMode:i=>m("workOrderSearchMode",!!i,c.workOrderSearchMode),getActiveStatusFilter:()=>d.activeStatusFilter,setActiveStatusFilter:i=>m("activeStatusFilter",i),getMyWorkFilter:()=>d.myWorkFilter,setMyWorkFilter:i=>m("myWorkFilter",i,c.myWorkFilter),getWorkOrderFilter:()=>d.workOrderFilter,setWorkOrderFilter:i=>m("workOrderFilter",i,c.workOrderFilter),getWorkOrderAssigneeFilter:()=>d.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:i=>{m("workOrderAssigneeFilter",i),i?t(o,c.workOrderAssigneeFilter,i):s(o,c.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>d.workOrderTypeFilter,setWorkOrderTypeFilter:i=>m("workOrderTypeFilter",i||"all",c.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>d.workOrderPriorityFilter,setWorkOrderPriorityFilter:i=>m("workOrderPriorityFilter",i||"all",c.workOrderPriorityFilter),getWorkSort:()=>d.workSort,setWorkSort:i=>m("workSort",i,c.workSort),getWorkGroup:()=>d.workGroup,setWorkGroup:i=>m("workGroup",i||"none",c.workGroup),getRequestViewFilter:()=>d.requestViewFilter,setRequestViewFilter:i=>m("requestViewFilter",i,c.requestViewFilter),getWorkOrderPage:()=>d.workOrderPage,setWorkOrderPage:i=>m("workOrderPage",i,c.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",c.workOrderPage),getPartsPage:()=>d.partsPage,setPartsPage:i=>m("partsPage",i,c.partsPage),resetPartsPage:()=>f("partsPage",c.partsPage),getAssetsPage:()=>d.assetsPage,setAssetsPage:i=>m("assetsPage",i,c.assetsPage),resetAssetsPage:()=>f("assetsPage",c.assetsPage),getFinancialPage:()=>d.financialPage,setFinancialPage:i=>m("financialPage",i,c.financialPage),resetFinancialPage:()=>f("financialPage",c.financialPage),getFinancialMissingFilter:()=>d.financialMissingFilter,setFinancialMissingFilter:i=>m("financialMissingFilter",i||"all",c.financialMissingFilter),getFinancialLocationFilter:()=>d.financialLocationFilter,setFinancialLocationFilter:i=>m("financialLocationFilter",i||"all",c.financialLocationFilter),getFinancialTypeFilter:()=>d.financialTypeFilter,setFinancialTypeFilter:i=>m("financialTypeFilter",i||"all",c.financialTypeFilter),getFinancialAreaFilter:()=>d.financialAreaFilter,setFinancialAreaFilter:i=>m("financialAreaFilter",i||"all",c.financialAreaFilter),getRequestsPage:()=>d.requestsPage,setRequestsPage:i=>m("requestsPage",i,c.requestsPage),resetRequestsPage:()=>f("requestsPage",c.requestsPage),getPlanningPage:i=>i==="overdue"?d.planningOverduePage:i==="today"?d.planningTodayPage:i==="soon"?d.planningSoonPage:i==="no-due"?d.planningNoDuePage:i==="follow-up"?d.planningFollowUpPage:i==="pm"?d.planningPmPage:1,setPlanningPage:(i,u)=>{i==="overdue"&&m("planningOverduePage",u,c.planningOverduePage),i==="today"&&m("planningTodayPage",u,c.planningTodayPage),i==="soon"&&m("planningSoonPage",u,c.planningSoonPage),i==="no-due"&&m("planningNoDuePage",u,c.planningNoDuePage),i==="follow-up"&&m("planningFollowUpPage",u,c.planningFollowUpPage),i==="pm"&&m("planningPmPage",u,c.planningPmPage)},getPlanningGroupOpen:(i,u=!1)=>Object.prototype.hasOwnProperty.call(d.planningGroupOpen,i)?!!d.planningGroupOpen[i]:!!u,setPlanningGroupOpen:(i,u)=>{d.planningGroupOpen={...d.planningGroupOpen,[i]:!!u},t(o,c.planningGroupOpen,JSON.stringify(d.planningGroupOpen))},getSchedulesPage:()=>d.schedulesPage,setSchedulesPage:i=>m("schedulesPage",i,c.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",c.schedulesPage),getProceduresPage:()=>d.proceduresPage,setProceduresPage:i=>m("proceduresPage",i,c.proceduresPage),resetProceduresPage:()=>f("proceduresPage",c.proceduresPage),getMembersPage:()=>d.membersPage,setMembersPage:i=>m("membersPage",i,c.membersPage),resetMembersPage:()=>f("membersPage",c.membersPage),getAssetStatusFilter:()=>d.assetStatusFilter,setAssetStatusFilter:i=>m("assetStatusFilter",i,c.assetStatusFilter),getAssetTypeFilter:()=>d.assetTypeFilter,setAssetTypeFilter:i=>m("assetTypeFilter",i,c.assetTypeFilter),getAssetAreaFilter:()=>d.assetAreaFilter,setAssetAreaFilter:i=>m("assetAreaFilter",i,c.assetAreaFilter),getPartInventoryFilter:()=>d.partInventoryFilter,setPartInventoryFilter:i=>m("partInventoryFilter",i,c.partInventoryFilter),getPartSort:()=>d.partSort,setPartSort:i=>m("partSort",i||"default",c.partSort),getPartSearchQuery:()=>d.partSearchQuery,setPartSearchQuery:i=>m("partSearchQuery",i,c.partSearchQuery),snapshot:()=>({...d})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:p},typeof We<"u"&&(We.exports={createWorkspaceUiState:p})})()});var vt=B((Cn,be)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.URLRef||URL,r=e.BlobCtor||Blob,s=e.alertRef||alert,p=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,a=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:C=>String(C||"machine").replaceAll("_"," "),o=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:C=>String(C||"corrective").replaceAll("_"," "),d={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function m(C){return(e.getAssetDocumentsByAssetId?.()[C]||[]).filter(v=>String(v.content_type||"").startsWith("image/")||v.document_type==="machine_photo"||v.document_type==="nameplate")}function f(C){return m(C).map(v=>v.original_file_name||v.file_name||v.storage_path||v.id).filter(Boolean).join("; ")}function i(C,v){return C?.parent_asset_id&&v.get(C.parent_asset_id)?.name||""}function u(C){return e.getLocations?.().find(v=>v.id===C)?.name||""}function g(C){if(!C)return"";let v=e.getProfilesByUserId?.()[C];return v?.full_name||v?.email||C}function l(C){return String(u(C.location_id)||C.location_id||C.location||"")}function h(C){return{id:`financial:${C.id}`,financialRecord:C,name:C.archived_asset_name||"Deleted equipment",asset_type:C.archived_asset_type||"machine",asset_code:C.archived_asset_code||"",manufacturer:C.archived_manufacturer||"",model:C.archived_model||"",location_id:C.archived_location_id||"",location:C.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(C=>!C.asset_id).map(h)]}function b(C,v,q){let k=l(C).localeCompare(l(v));if(k)return k;let T=(d[C.asset_type||"machine"]||999)-(d[v.asset_type||"machine"]||999);return T||String(i(C,q)).localeCompare(String(i(v,q)))||String(C.location||"").localeCompare(String(v.location||""))||String(C.name||"").localeCompare(String(v.name||""))}function _(){let C=e.getAssets().filter(p),v=new Map(C.map(q=>[q.id,q]));return[...C].sort((q,k)=>b(q,k,v)).map(q=>({equipment_type:a(q.asset_type),name:q.name,parent_equipment:i(q,v),serial_number:q.asset_code||"",manufacturer:q.manufacturer||"",model:q.model||"",picture_id:f(q.id),picture_count:m(q.id).length,picture_status:m(q.id).length?"attached":"missing",facility:u(q.location_id)||q.location_id||"",area_department:q.location||"",status:q.status}))}function A(){let C=y(),v=new Map(C.map(k=>[k.id,k])),q=e.getAssetFinancialsByAssetId?.()||{};return[...C].sort((k,T)=>b(k,T,v)).map(k=>{let T=k.financialRecord||q[k.id]||{};return{operational_status:k.financialRecord?"deleted":"active",equipment_type:a(k.asset_type),name:k.name,parent_equipment:i(k,v),facility:u(k.location_id)||k.location_id||"",area_department:k.location||"",serial_number:k.asset_code||"",manufacturer:k.manufacturer||"",model:k.model||"",picture_status:m(k.id).length?"attached":"missing",asset_tag:T.asset_tag||"",acquisition_date:T.acquisition_date||"",acquisition_cost:T.acquisition_cost||"",depreciation_method:T.depreciation_method||"",useful_life_years:T.useful_life_years||"",current_book_value:T.current_book_value||"",tax_jurisdiction:T.tax_jurisdiction||"",ownership_status:T.ownership_status||"",in_service_date:T.in_service_date||"",disposal_date:T.disposal_date||"",disposal_notes:T.disposal_notes||"",gl_account_code:T.gl_account_code||"",cost_center:T.cost_center||"",finance_notes:T.finance_notes||"",needs_review:!!T.needs_review,last_reviewed_at:T.last_reviewed_at||"",reviewed_by:g(T.reviewed_by)}})}function P(){let C={work:{filename:"work-orders.csv",rows:e.getWorkOrders().map(q=>({title:q.title,status:q.status,priority:q.priority,type:o(q.type),equipment:q.assets?.name||"",assigned_to:e.assignmentLabel(q),due_at:q.due_at||"",completed_at:q.completed_at||"",actual_minutes:q.actual_minutes||0,failure_cause:q.failure_cause||"",resolution_summary:q.resolution_summary||"",follow_up_needed:!!q.follow_up_needed}))},assets:{filename:"equipment.csv",rows:_()},financial:{filename:"equipment-financial.csv",rows:A()},requests:{filename:"maintenance-requests.csv",rows:e.getMaintenanceRequests().map(q=>({title:q.title,status:q.status,priority:q.priority,equipment:q.assets?.name||"",requested_by:e.getProfilesByUserId()[q.requested_by]?.full_name||"",created_at:q.created_at||"",converted_work_order_id:q.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(q=>({title:q.title,equipment:q.assets?.name||"",frequency:q.frequency,next_due_at:q.next_due_at,active:q.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(q=>({name:q.name,sku:q.sku||"",supplier_name:q.supplier_name||"",quantity_on_hand:q.quantity_on_hand,reorder_point:q.reorder_point,unit_cost:q.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(q=>({name:q.name,description:q.description||"",steps:q.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(q=>({user_id:q.user_id,name:e.getProfilesByUserId()[q.user_id]?.full_name||"",role:q.role}))}},v=C[e.getActiveSection()]||C.work;if(!v.rows.length)return s("Nothing to export in this section yet.");O(v.filename,v.rows)}function O(C,v){let q=Object.keys(v[0]),k=[q.join(","),...v.map(E=>q.map(w=>e.csvCell(E[w])).join(","))],T=new r([`\uFEFF${k.join(`
`)}`],{type:"text/csv;charset=utf-8"}),L=t.createObjectURL(T),D=n.createElement("a");D.href=L,D.download=C,n.body.appendChild(D),D.click(),D.remove(),t.revokeObjectURL(L)}return{downloadCsv:O,exportActiveSectionCsv:P}}typeof be<"u"&&be.exports&&(be.exports={createCsvExportHelpers:c}),window.MaintainOpsCsvExport={createCsvExportHelpers:c}})()});var kt=B(($n,xe)=>{(function(){function c(n){if(!n)return!1;if(typeof n.focus=="function"&&n.focus(),typeof n.showPicker=="function")try{return n.showPicker(),!0}catch{}return typeof n.click=="function"?(n.click(),!0):!1}function e(n={}){(n.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(r=>{r.addEventListener("click",()=>{let p=r.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');c(p)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:c},typeof xe<"u"&&(xe.exports={bindWorkspaceDatePickerControls:e,openDatePicker:c})})()});var _t=B((Pn,Me)=>{(function(){function c(e={}){let n=e.windowRef||window;function t(s){let p=String.fromCharCode(...s),a=typeof n.btoa=="function"?n.btoa.bind(n):typeof btoa=="function"?btoa:null;return a?a(p).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function r(){if(n.crypto?.getRandomValues){let s=new Uint8Array(18);return n.crypto.getRandomValues(s),t(s)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:r}}window.MaintainOpsPublicRequestTokens=c(),typeof Me<"u"&&(Me.exports={createPublicRequestTokenHelpers:c})})()});var St=B((An,Te)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.createPublicRequestLink,r=e.disablePublicRequestLink,s=e.setPublicRequestLinkActive,p=e.regeneratePublicRequestLink;typeof t=="function"&&n.querySelectorAll("[data-create-public-request-link]").forEach(a=>{a.addEventListener("click",()=>t(a.dataset.createPublicRequestLink))}),typeof r=="function"&&n.querySelectorAll("[data-disable-public-request-link]").forEach(a=>{a.addEventListener("click",()=>r(a.dataset.disablePublicRequestLink))}),typeof s=="function"&&n.querySelectorAll("[data-enable-public-request-link]").forEach(a=>{a.addEventListener("click",()=>s(a.dataset.enablePublicRequestLink,!0))}),typeof p=="function"&&n.querySelectorAll("[data-regenerate-public-request-link]").forEach(a=>{a.addEventListener("click",()=>p(a.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:c},typeof Te<"u"&&(Te.exports={bindWorkspacePublicRequestLinkAdminEvents:c})})()});var qt=B((Rn,De)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.savePlanningDueDate;typeof t=="function"&&n.querySelectorAll("[data-planning-due-form]").forEach(r=>{r.addEventListener("submit",async s=>{s.preventDefault(),s.stopPropagation?.();let p=r.querySelector?.("button[type='submit']");if(!p?.disabled){p&&(p.disabled=!0);try{let a=r.querySelector?.("[name='planning_due_at']");await t(r.dataset.planningDueForm,a?.value)}finally{p?.isConnected&&(p.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:c},typeof De<"u"&&(De.exports={bindWorkspacePlanningDueDateEvents:c})})()});var Ct=B((On,Ie)=>{(function(){let c=new WeakSet;function e(r,s,p){if(!r)return;let a=r.querySelector("[data-equipment-choice-existing]"),o=r.querySelector("[data-equipment-choice-new]"),d=s==="new";r.querySelectorAll("[data-equipment-choice-mode]").forEach(m=>{let f=m.value===(d?"new":"existing");m.checked=f,m.closest("label")?.classList.toggle("active",f)}),r.querySelectorAll("[data-equipment-choice-panel]").forEach(m=>{m.hidden=m.dataset.equipmentChoicePanel!==(d?"new":"existing")}),a&&(a.disabled=d,a.required=!d&&a.dataset.equipmentChoiceRequired==="true",d&&(a.value=""),typeof p=="function"&&p(a)),o&&(o.disabled=!d,o.required=d&&o.dataset.equipmentChoiceRequired==="true",d||(o.value=""))}function n(r,s){r.querySelectorAll("[data-equipment-choice]").forEach(p=>{let a=p.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(p,a,s)})}function t(r={}){let s=r.documentRef||document,p=r.updateAssetLocationWarning;n(s,p),!c.has(s)&&(c.add(s),s.addEventListener("change",a=>{let o=a.target.closest?.("[data-equipment-choice-mode]");if(o){e(o.closest("[data-equipment-choice]"),o.value,p);return}let d=a.target.closest?.("[data-equipment-choice-existing]");d&&typeof p=="function"&&p(d)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e},typeof Ie<"u"&&(Ie.exports={bindWorkspaceEquipmentChoiceEvents:t,initializeEquipmentChoices:n,setEquipmentChoiceMode:e})})()});var $t=B((En,Fe)=>{(function(){function c(e={}){let{documentRef:n=document,FormDataCtor:t=FormData,withOperationTimeout:r,createQuickFixAsset:s,getMaintenanceRequests:p,getQuickFixRequestId:a,getActiveCompanyId:o,getSession:d,getParts:m,getRequestsReady:f,getSupabaseClient:i,confirmAssetLocationRouting:u,assetRequiresSafety:g,blocksProcedureCompletion:l,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:b,descriptionWithAssignmentNote:_,assignedUserFromForm:A,procedureColumn:P,workOrderDateValue:O,applySafetyRequirementPayload:C,applySafetyCheckPayload:v,insertWithOptionalProcedure:q,friendlyWorkOrderSaveError:k,addPartUsageToWorkOrder:T,addPhotoToWorkOrder:L,updateAssetStatus:D,recordWorkOrderEvent:E,setActiveWorkOrderIdState:w,setActiveAssetIdState:$,setCreateWorkOrderMode:S,setQuickFixMode:R,setQuickFixAssetId:x,setQuickFixRequestId:F,showNotice:N,render:U,alertUser:G=ne=>window.alert(ne)}=e;async function H(ne){ne.preventDefault();let ae=ne.currentTarget,K=n.querySelector("#quick-fix-error"),re=ae.querySelector("button[type='submit']");K&&(K.textContent=""),re&&(re.disabled=!0,re.textContent="Saving...");try{let W=new t(ae),Q=String(W.get("title")||"").trim();if(!Q)throw new Error("Quick Fix issue is required.");let z=a(),Z=o(),J=d(),ee=String(W.get("description")||"").trim(),X=String(W.get("resolution_summary")||"").trim(),oe=X||Q,V=ee||Q,ce=W.get("mark_completed")==="on",le=W.get("machine_down")==="on",te=W.get("asset_id")||null,I=z?p().find(se=>se.id===z):null,ue=String(W.get("new_asset_name")||"").trim();if(te&&ue)throw new Error("Choose existing equipment or create new equipment, not both.");if(ue){let{data:se,error:de}=await r(s(ue,le?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(de){K&&(K.textContent=de.message);return}te=se.id}if(!ue&&!u(te,"logging this Quick Fix",K))return;if(ce&&g(te)&&W.get("safety_devices_checked")!=="on"){K&&(K.textContent="Check safety devices before marking equipment work complete.");return}let ge=ce?l(null,W.get("procedure_template_id")||null):"";if(ge){h("",""),K&&(K.textContent=`${ge} Log it first, then complete the checklist before marking it complete.`);return}let me={company_id:Z,location_id:y(te),title:Q,description:b(_(V,W.get("assigned_to")),I),asset_id:te,assigned_to:A(W,J.user.id),priority:W.get("priority")||"medium",type:W.get("type")||"corrective",status:ce?"completed":"open",due_at:O(W.get("due_at")),created_by:J.user.id,...P(W.get("procedure_template_id")),actual_minutes:0,failure_cause:W.get("failure_cause")||null,resolution_summary:ce?oe:X||null,follow_up_needed:W.get("follow_up_needed")==="on",completion_notes:ce?oe:null,completed_at:ce?new Date().toISOString():null};C(me),v(me,ce&&me.safety_check_required&&W.get("safety_devices_checked")==="on");let{data:pe,error:Y}=await r(q("work_orders",me,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(Y){K&&(K.textContent=`Could not log quick fix: ${k(Y)}`);return}let M=[],ie=W.get("part_id"),fe=Number(W.get("quantity_used"))||1;if(ie){let se=m().find(Re=>Re.id===ie),de=await r(T(pe.id,se,fe),"Part usage save timed out.",12e3).catch(Re=>Re);de&&M.push(`part usage failed: ${de.message}`)}let he=W.get("photo");if(he&&he.name){let se=await r(L(pe.id,he),"Photo upload timed out.",25e3).catch(de=>de);se&&M.push(`photo upload failed: ${se.message}`)}let ye=le?"offline":W.get("asset_status");if(me.asset_id&&!ue&&(le||ce&&ye)){let se=await r(D(me.asset_id,ye),"Equipment status update timed out.",12e3).catch(de=>de);se?M.push(`equipment status did not update: ${se.message}`):await r(E(pe.id,"asset_status_updated",le?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(de=>M.push(`history did not update: ${de.message}`))}if(await r(E(pe.id,"quick_fix",ce?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(se=>M.push(`history did not update: ${se.message}`)),ue&&await r(E(pe.id,"equipment_created",`Equipment created from Quick Fix: ${ue}.`),"Activity log timed out.",8e3).catch(se=>M.push(`history did not update: ${se.message}`)),z&&f()){let se=await r(i().from("maintenance_requests").update({status:"converted",reviewed_by:J.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:pe.id}).eq("id",z).eq("company_id",Z),"Request status update timed out.",12e3).catch(de=>({error:de}));se.error?M.push(`request status did not update: ${se.error.message}`):await r(E(pe.id,"request_quick_fixed",ce?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(de=>M.push(`history did not update: ${de.message}`))}w(pe.id),$(null),S(!1),R(!1),x(null),F(null),N(M.length?`Quick Fix saved with warning: ${M[0]}`:"Quick Fix saved.",M.length?"warning":"success"),await U()}catch(W){K?K.textContent=`Could not log quick fix: ${W.message||W}`:G(W.message||W)}finally{re&&re.isConnected&&(re.disabled=!1,re.textContent="Log Quick Fix")}}return{createQuickFix:H}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:c},typeof Fe<"u"&&(Fe.exports={createQuickFixWorkflow:c})})()});var Pt=B((Wn,Le)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(u,g){return u==="direct"?[e.getSession().user.id,g].filter(Boolean):e.getCompanyMembers().map(l=>l.user_id)}function s(){let u=n.querySelector("#message-thread-form");u&&u.addEventListener("submit",p);let g=n.querySelector("#message-reply-form");g&&g.addEventListener("submit",a),n.querySelectorAll("[data-delete-message]").forEach(l=>{l.addEventListener("click",o)}),n.querySelectorAll("[data-delete-message-thread]").forEach(l=>{l.addEventListener("click",d)})}async function p(u){u.preventDefault();let g=u.currentTarget,l=n.querySelector("#message-thread-error"),h=g.querySelector("button[type='submit']"),y=new t(g);if(l&&(l.textContent=""),!e.getMessagesReady()){l&&(l.textContent="Run supabase/step-next-message-center.sql before creating threads.");return}let b=y.get("thread_type"),_=y.get("direct_user_id"),A=r(b,_),P=String(y.get("title")||"").trim(),O=String(y.get("body")||"").trim();if(b==="company"){l&&(l.textContent="Company-wide broadcast threads are disabled. Choose location or direct.");return}if(b==="direct"&&!_){l&&(l.textContent="Choose a teammate for a direct message.");return}if(!P||!O){l&&(l.textContent="Add a subject and message before starting the thread.");return}A.includes(e.getSession().user.id)||A.push(e.getSession().user.id),h&&(h.disabled=!0,h.textContent="Starting...");let C=!1;try{let v=y.get("work_order_id")||null,q={company_id:e.getActiveCompanyId(),location_id:b==="location"?e.activeLocationDatabaseId():null,thread_type:b,title:P,created_by:e.getSession().user.id};v&&e.getMessageWorkOrderLinksReady()&&(q.work_order_id=v);let{data:k,error:T}=await e.withOperationTimeout(e.supabaseClient().from("message_threads").insert(q).select("*").single(),"Message thread save timed out. Check your connection and try again.",15e3);if(T)throw e.isMissingColumnError(T,"work_order_id")&&e.setMessageWorkOrderLinksReady(!1),T;let L=[...new Set(A)].map(w=>({company_id:e.getActiveCompanyId(),thread_id:k.id,user_id:w})),{error:D}=await e.withOperationTimeout(e.supabaseClient().from("message_thread_members").insert(L),"Message member save timed out. Check your connection and try again.",15e3);if(D)throw D;let{error:E}=await f(k.id,O);if(E)throw E;e.setActiveMessageThreadId(k.id),e.setMessageComposerWorkOrderId(""),e.setMessageComposerOpen(!1),await m(k.id),e.showNotice("Thread started."),C=!0,await e.render()}catch(v){l&&(l.textContent=i(v))}finally{!C&&h?.isConnected&&(h.disabled=!1,h.textContent="Start Thread")}}async function a(u){u.preventDefault();let g=u.currentTarget,l=n.querySelector("#message-reply-error"),h=g.querySelector("button[type='submit']"),y=String(new t(g).get("body")||"").trim();if(!y)return;l&&(l.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");let b=!1;try{let{error:_}=await f(g.dataset.threadId,y);if(_)throw _;e.showNotice("Message sent."),await m(g.dataset.threadId),b=!0,await e.render()}catch(_){l&&(l.textContent=i(_))}finally{!b&&h?.isConnected&&(h.disabled=!1,h.textContent="Send Reply")}}async function o(u){let g=u.currentTarget,l=g?.dataset?.deleteMessage;if(l&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this message from the thread? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message",{target_message_id:l}),"Message delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.showNotice("Message deleted."),await e.render()}catch(h){e.showNotice(i(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete")}}}async function d(u){let g=u.currentTarget,l=g?.dataset?.deleteMessageThread;if(l&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this thread from your messages? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message_thread",{target_thread_id:l}),"Message thread delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.setActiveMessageThreadId(""),e.showNotice("Thread deleted."),await e.render()}catch(h){e.showNotice(i(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete Thread")}}}async function m(u){if(!e.getMessagesReady()||!u)return;let g=new Date().toISOString(),l={company_id:e.getActiveCompanyId(),thread_id:u,user_id:e.getSession().user.id,last_read_at:g};e.setMessageThreadRead(u,l);let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("message_reads").upsert(l,{onConflict:"thread_id,user_id"}),"Message read marker timed out.",8e3).catch(y=>({error:y}));h&&e.warn("Could not mark message thread read",h)}async function f(u,g){let l=await e.withOperationTimeout(e.supabaseClient().from("messages").insert({company_id:e.getActiveCompanyId(),thread_id:u,sender_id:e.getSession().user.id,body:g}),"Message save timed out. Check your connection and try again.",15e3);return l.error?{error:l.error}:{error:(await e.withOperationTimeout(e.supabaseClient().from("message_threads").update({updated_at:new Date().toISOString()}).eq("id",u).eq("company_id",e.getActiveCompanyId()),"Message thread timestamp save timed out.",8e3).catch(y=>({error:y}))).error}}function i(u){let g=e.messageCenterErrorState(u);return g.messagesReady===!1&&e.setMessagesReady(!1),g.message}return{bindMessageWorkflowEvents:s,createMessageThread:p,sendThreadReply:a,deleteOwnMessage:o,deleteMessageThread:d,markMessageThreadRead:m,insertThreadMessage:f,friendlyMessageCenterError:i,messageThreadMembersForType:r}}window.MaintainOpsMessageWorkflow={createMessageWorkflow:c},typeof Le<"u"&&(Le.exports={createMessageWorkflow:c})})()});var At=B((xn,Ne)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let m=Array.from(n.querySelectorAll?.("[data-create-pm-form]")||[]),f=n.querySelector("#create-pm-form");f&&!m.includes(f)&&m.push(f),m.forEach(i=>i.addEventListener("submit",p))}async function p(m){m.preventDefault();let f=m.currentTarget,i=f.querySelector("button[type='submit']"),u=f.querySelector("[data-pm-error]")||n.querySelector("#pm-error");u&&(u.textContent=""),i&&(i.disabled=!0,i.textContent="Adding...");try{let g=new t(f);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",u))return;let{error:l}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(l)throw l;e.showNotice("PM schedule added."),await e.render()}catch(g){u?u.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{i&&(i.disabled=!1,i.textContent="Add Schedule")}}function a(m){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(f=>f.id===m)&&(e.setPendingDeleteScheduleId(m),e.renderWorkspace())}async function o(m){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(u=>u.id===m))return;let i=n.querySelector(`[data-confirm-delete-schedule="${r.escape(m)}"]`);i&&(i.disabled=!0,i.textContent="Deleting...");try{let{data:u,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",m).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!u?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let l=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",m).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(l.error)throw new Error(`PM schedule delete verification failed: ${l.error.message}`);if(l.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(u){e.showNotice(u.message||"Could not delete PM schedule.","warning"),i&&(i.disabled=!1,i.textContent="Permanently Delete")}}async function d(m){let f=e.getPreventiveSchedules().find(u=>u.id===m);if(!f)return;let i=n.querySelector(`[data-generate-pm="${r.escape(m)}"]`);i&&(i.disabled=!0,i.textContent="Generating...");try{let u={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(f.asset_id),asset_id:f.asset_id,title:f.title,description:`Generated from preventive schedule: ${f.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:f.next_due_at,...e.procedureColumn(f.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(u),e.applySafetyCheckPayload(u,!1);let{data:g,error:l}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",u,{returnSingle:!0}),"PM work order generation timed out.");if(l)throw l;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(f.next_due_at,f.frequency)}).eq("id",f.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(u){e.showNotice(`Could not generate PM work: ${u.message||u}`,"warning"),i&&(i.disabled=!1,i.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:s,createPreventiveSchedule:p,requestDeletePreventiveSchedule:a,deletePreventiveSchedule:o,generatePreventiveWorkOrder:d}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:c},typeof Ne<"u"&&(Ne.exports={createPreventiveMaintenanceWorkflow:c})})()});var Rt=B((Mn,Ue)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.CSSRef||CSS;function s(){let u=n.querySelector("#create-procedure-form");u&&u.addEventListener("submit",p);let g=n.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",a),n.querySelectorAll("[data-add-step]").forEach(l=>{l.addEventListener("submit",o)})}async function p(u){u.preventDefault();let g=u.currentTarget,l=g.querySelector("button[type='submit']"),h=n.querySelector("#procedure-error");h&&(h.textContent=""),l&&(l.disabled=!0,l.textContent="Adding...");try{let y=new t(g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(b)throw b;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{l&&(l.disabled=!1,l.textContent="Add Checklist")}}async function a(){let u=n.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(l=>l.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}u&&(u.disabled=!0,u.textContent="Adding sample...");try{let{data:l,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(_=>({..._,company_id:e.getActiveCompanyId(),procedure_template_id:l.id})),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(b)throw b;e.showNotice("Sample procedure checklist added."),await e.render()}catch(l){e.showNotice(`Could not add sample procedure: ${l.message||l}`,"warning")}finally{u&&(u.disabled=!1,u.textContent="Add sample inspection checklist")}}async function o(u){u.preventDefault();let g=u.currentTarget,l=g.querySelector("button[type='submit']"),h=n.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),l&&(l.disabled=!0,l.textContent="Adding...");try{let y=new t(g),_=(e.getProcedureTemplates().find(P=>P.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:_,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(A)throw A;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{l&&(l.disabled=!1,l.textContent="Add Step")}}async function d(u){let[g,l]=await Promise.all([m("work_orders",u),m("preventive_schedules",u)]);return{workOrders:g,schedules:l}}async function m(u,g){let{count:l,error:h}=await e.withOperationTimeout(e.supabaseClient().from(u).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${u}.`,15e3);if(h)throw new Error(`Could not verify linked ${u.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return l||0}async function f(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(l=>l.id===u))return;let g=n.querySelector(`[data-procedure-delete-error="${r.escape(u)}"]`);g&&(g.textContent="");try{let l=await d(u),h=e.procedureDeleteBlockerMessage(l);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(u),e.renderWorkspace()}catch(l){g?g.textContent=l.message||"Could not verify procedure links before delete.":e.showNotice(l.message||"Could not verify procedure links before delete.","warning")}}async function i(u){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===u))return;let l=n.querySelector(`[data-confirm-delete-procedure="${r.escape(u)}"]`),h=n.querySelector(`[data-procedure-delete-error="${r.escape(u)}"]`);h&&(h.textContent=""),l&&(l.disabled=!0,l.textContent="Deleting...");try{let y=await d(u),b=e.procedureDeleteBlockerMessage(y);if(b)throw new Error(b);let{data:_,error:A}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(A)throw A;if(!_?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let P=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if(P.error)throw new Error(`Procedure checklist delete verification failed: ${P.error.message}`);if(P.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let b=y.message||"Could not delete procedure.";e.showNotice(b,"warning"),h&&(h.textContent=b),l&&(l.disabled=!1,l.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:s,createProcedureTemplate:p,seedSampleProcedure:a,createProcedureStep:o,loadProcedureDeleteBlockers:d,countProcedureLinkedRows:m,requestDeleteProcedureTemplate:f,deleteProcedureTemplate:i}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:c},typeof Ue<"u"&&(Ue.exports={createProcedureWorkflow:c})})()});var Ot=B((Tn,Qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let l=n.querySelector("#add-member-form");l&&l.addEventListener("submit",s),n.querySelectorAll("[data-member-role]").forEach(P=>{P.addEventListener("submit",p)});let h=n.querySelector("#profile-form");h&&h.addEventListener("submit",a);let y=n.querySelector("#password-change-form");y&&y.addEventListener("submit",m);let b=n.querySelector("#team-invite-form");b&&b.addEventListener("submit",o);let _=n.querySelector("#team-invite-link-form");_&&_.addEventListener("submit",f),n.querySelectorAll("[data-revoke-invite-link]").forEach(P=>{P.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(P.dataset.revokeInviteLink),e.renderWorkspace()})}),n.querySelectorAll("[data-revoke-invite-link-cancel]").forEach(P=>{P.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-revoke-invite-link]").forEach(P=>{P.addEventListener("click",()=>i(P.dataset.confirmRevokeInviteLink))});let A=n.querySelector("#request-notification-recipient-form");A&&A.addEventListener("submit",u),n.querySelectorAll("[data-delete-request-notification-recipient]").forEach(P=>{P.addEventListener("click",()=>g(P.dataset.deleteRequestNotificationRecipient))})}async function s(l){l.preventDefault();let h=l.currentTarget,y=new t(h),b=String(y.get("role")||"technician").trim().toLowerCase(),_=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&b!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}_&&(_.disabled=!0,_.textContent="Adding...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:b}),"Team member save timed out.");if(A)throw A;await e.render()}catch(A){e.alertUser(A.message||A)}finally{_?.isConnected&&(_.disabled=!1,_.textContent="Add Member")}}async function p(l){l.preventDefault();let h=l.currentTarget,y=new t(h),b=String(y.get("role")||"").trim().toLowerCase(),_=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}_&&(_.disabled=!0,_.textContent="Saving...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:b}),"Role save timed out. Check your connection and try again.",15e3);if(A)throw new Error(A.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":A.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(A){e.showNotice(`Could not save role: ${A.message||A}`,"warning")}finally{_&&(_.disabled=!1,_.textContent="Save Role")}}async function a(l){l.preventDefault();let h=l.currentTarget,y=n.querySelector("#profile-error"),b=h.querySelector("button[type='submit']"),_=new t(h),A=String(_.get("full_name")||"").trim(),P=h.querySelector('input[name="mobile_tech"]'),O=P?P.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),b&&(b.disabled=!0,b.textContent="Saving...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:A,mobile_tech:O},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(C)throw e.isMissingColumnError(C,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):C;e.showNotice("Profile saved."),await e.render()}catch(C){y&&(y.textContent=C.message||"Could not save profile.")}finally{b&&(b.disabled=!1,b.textContent="Save Profile")}}async function o(l){l.preventDefault();let h=l.currentTarget,y=n.querySelector("#team-invite-error"),b=h.querySelector("button[type='submit']"),_=new t(h),A=String(_.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}b&&(b.disabled=!0,b.textContent="Inviting...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(_.get("email")||"").trim(),invite_role:A,invite_default_location_id:_.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if(P)throw P.message.includes("create_company_invite")||e.isColumnSchemaError(P,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):P;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch(P){y&&(y.textContent=P.message||"Could not create invite.")}finally{b&&(b.disabled=!1,b.textContent="Create Invite")}}async function d(l){if(!(!l||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:l}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function m(l){l.preventDefault();let h=l.currentTarget,y=n.querySelector("#password-change-error"),b=h.querySelector("button[type='submit']"),_=new t(h),A=String(_.get("password")||""),P=String(_.get("confirmPassword")||"");if(y&&(y.textContent=""),A.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(A!==P){y&&(y.textContent="Passwords do not match.");return}b&&(b.disabled=!0,b.textContent="Updating...");try{let{error:O}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:A}),"Password update timed out. Check your connection and try again.",15e3);if(O)throw O;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(O){y&&(y.textContent=O.message||"Could not update password.")}finally{b&&(b.disabled=!1,b.textContent="Update Password")}}async function f(l){l.preventDefault();let h=l.currentTarget,y=n.querySelector("#team-invite-link-error"),b=h.querySelector("button[type='submit']"),_=new t(h),A=String(_.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let P="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError(P),y&&(y.textContent=P);return}if(A==="admin"){let P="Admin join links are not allowed.";e.setTeamInviteLinkError(P),y&&(y.textContent=P);return}if(!e.canAdministerTeamRoles?.()&&A!=="technician"){let P="Managers can only create technician join links.";e.setTeamInviteLinkError(P),y&&(y.textContent=P);return}b&&(b.disabled=!0,b.textContent="Creating...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:A,link_location_id:_.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if(P)throw P.message.includes("create_company_invite_link")||e.isColumnSchemaError(P,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):P;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(P){let O=P.message||"Could not create join link.";e.setTeamInviteLinkError(O),y&&(y.textContent=O)}finally{b&&(b.disabled=!1,b.textContent="Create Join Link")}}async function i(l){if(!(!l||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:l}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function u(l){l.preventDefault();let h=l.currentTarget,y=n.querySelector("#request-notification-recipient-error"),b=h.querySelector("button[type='submit']"),_=new t(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let A="Only admins can change request email routing.";e.setRequestNotificationRecipientError(A),y&&(y.textContent=A);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}b&&(b.disabled=!0,b.textContent="Adding...");try{let A=String(_.get("email")||"").trim().toLowerCase(),{error:P}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:_.get("location_id")||null,email:A,label:String(_.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if(P)throw e.isColumnSchemaError(P,["request_notification_recipients"])||P.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):P;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(A){let P=A.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError(P),y&&(y.textContent=P)}finally{b&&(b.disabled=!1,b.textContent="Add Recipient")}}async function g(l){if(!(!l||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",l),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:r,addCompanyMember:s,updateCompanyMemberRole:p,updateMyProfile:a,updateMyPassword:m,createTeamInvite:o,cancelTeamInvite:d,createTeamInviteLink:f,revokeTeamInviteLink:i,createRequestNotificationRecipient:u,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:c},typeof Qe<"u"&&(Qe.exports={createTeamWorkflow:c})})()});var Et=B((Dn,Be)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let o=n.querySelector("#company-settings-form");o&&o.addEventListener("submit",s);let d=n.querySelector("#location-form");d&&d.addEventListener("submit",p);let m=n.querySelector("#public-app-url-form");m&&m.addEventListener("submit",a)}async function s(o){o.preventDefault();let d=o.currentTarget,m=d.querySelector("button[type='submit']"),f=new t(d);m&&(m.disabled=!0,m.textContent="Saving...");try{let{error:i}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(i)throw i;e.showNotice("Company saved."),await e.render()}catch(i){e.showNotice(`Could not save company: ${i.message||i}`,"warning")}finally{m&&(m.disabled=!1,m.textContent="Save Company")}}async function p(o){o.preventDefault();let d=o.currentTarget,m=n.querySelector("#location-error"),f=d.querySelector("button[type='submit']"),i=String(new t(d).get("name")||"").trim();if(i){m&&(m.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:u,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),i),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(u.id),e.persistActiveLocationId(u.id),e.showNotice("Location added."),await e.render()}catch(u){m&&(m.textContent=u.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function a(o){o.preventDefault();let d=n.querySelector("#public-request-link-error"),m=String(new t(o.currentTarget).get("public_app_url")||"").trim();if(d&&(d.textContent=""),!m){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(m);if(!f){d&&(d.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:r,updateCompanySettings:s,createLocation:p,savePublicAppUrl:a}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:c},typeof Be<"u"&&(Be.exports={createCompanySettingsWorkflow:c})})()});var Wt=B((In,je)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.FormDataCtor||FormData,s=e.confirmUser||(i=>t.confirm(i));function p(){let i=n.querySelector("#app-issue-report-form");i&&i.addEventListener("submit",d),n.querySelectorAll("[data-app-issue-status]").forEach(u=>{u.addEventListener("submit",m)}),n.querySelectorAll("[data-delete-app-issue]").forEach(u=>{u.addEventListener("click",f)})}async function a(){let{data:i,error:u}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!u),e.setAppIssueReports(u?[]:i||[]),u)throw u}function o(i){let u=e.appIssueReportErrorState(i);return u.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),u.message}async function d(i){i.preventDefault();let u=i.currentTarget,g=n.querySelector("#app-issue-report-error"),l=u.querySelector("button[type='submit']"),h=new r(u);g&&(g.textContent=""),l&&(l.disabled=!0,l.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:t.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:b}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(b)throw b;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await a(),e.renderWorkspace()}catch(y){g&&(g.textContent=o(y))}finally{l?.isConnected&&(l.disabled=!1,l.textContent="Send Report")}}async function m(i){if(i.preventDefault(),!e.canManageTeam())return;let u=i.currentTarget,g=u.querySelector("button[type='submit']"),l=new r(u);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(l.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),u.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await a(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${o(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function f(i){if(i.preventDefault(),!e.canManageTeam())return;let u=i.currentTarget,g=u.dataset.deleteAppIssue;if(!g||!s("Delete this app issue report? This cannot be undone."))return;u.disabled=!0;let l=u.textContent;u.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await a(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${o(h)}`,"warning")}finally{u?.isConnected&&(u.disabled=!1,u.textContent=l||"Delete")}}return{bindAppIssueWorkflowEvents:p,reloadAppIssueReports:a,appIssueReportError:o,createAppIssueReport:d,updateAppIssueReportStatus:m,deleteAppIssueReport:f}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:c},typeof je<"u"&&(je.exports={createAppIssueWorkflow:c})})()});var xt=B((Fn,ze)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.windowRef||window,r=e.CSSRef||CSS;async function s(m){let f=n.querySelector("#public-request-link-error"),i=n.querySelector(`[data-create-public-request-link="${r.escape(m)}"]`);f&&(f.textContent=""),i&&(i.disabled=!0,i.textContent="Creating...");try{let{error:u}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:m}),"QR link save timed out. Check your connection and try again.",15e3);if(u)throw e.setPublicRequestLinksReady(!1),new Error(u.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":u.message);e.showNotice("Location request QR link ready."),await e.render()}catch(u){f&&(f.textContent=u.message||"Could not create QR request link.")}finally{i&&(i.disabled=!1,i.textContent="Create QR Link")}}async function p(m){if(!e.canAdministerPublicRequestLinks()){let i=n.querySelector("#public-request-link-error");i&&(i.textContent="Only admins can disable posted QR request links.");return}t.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await a(m,!1)}async function a(m,f){if(!e.canAdministerPublicRequestLinks()){let i=n.querySelector("#public-request-link-error");i&&(i.textContent="Only admins can reactivate or disable posted QR request links.");return}await d(m,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function o(m){if(!e.canAdministerPublicRequestLinks()){let i=n.querySelector("#public-request-link-error");i&&(i.textContent="Only admins can replace posted QR request links.");return}t.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await d(m,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function d(m,f,i){let u=n.querySelector("#public-request-link-error");if(u&&(u.textContent=""),!e.canAdministerPublicRequestLinks()){u&&(u.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!m||!e.getActiveCompanyId()){u&&(u.textContent="Select a company before updating request links.");return}try{let{data:g,error:l}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",m).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(l){u&&(u.textContent=l.message);return}if(!g?.length){u&&(u.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(i),await e.render()}catch(g){u&&(u.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:s,disablePublicRequestLink:p,setPublicRequestLinkActive:a,regeneratePublicRequestLink:o,updatePublicRequestLink:d}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:c},typeof ze<"u"&&(ze.exports={createPublicRequestLinkWorkflow:c})})()});var Mt=B((Ln,Ge)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){let m=n.querySelector("#create-part-form");m&&m.addEventListener("submit",s),n.querySelectorAll("[data-restock-part]").forEach(f=>{f.addEventListener("submit",p)}),n.querySelectorAll("[data-use-part]").forEach(f=>{f.addEventListener("submit",a)}),n.querySelectorAll("[data-edit-part]").forEach(f=>{f.addEventListener("submit",o)}),n.querySelectorAll("[data-rename-part-source]").forEach(f=>{f.addEventListener("submit",d)})}async function s(m){m.preventDefault();let f=m.currentTarget,i=n.querySelector("#part-create-error"),u=f.querySelector("button[type='submit']"),g=new t(f);i&&(i.textContent=""),u&&(u.disabled=!0,u.textContent="Adding...");let l;try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!h.company_id)throw new Error("Choose a company before adding parts.");if(!h.name)throw new Error("Part name is required.");let y=new Promise((A,P)=>{l=setTimeout(()=>P(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:b,error:_}=await Promise.race([e.supabaseClient().from("parts").insert(h).select("id").single(),y]);if(clearTimeout(l),_&&e.isMissingColumnError(_,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(_&&e.isMissingColumnError(_,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(_&&e.isMissingColumnError(_,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(_&&e.isMissingColumnError(_,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(_)throw _;e.setActivePartId(b?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),f.reset(),await e.render()}catch(h){i&&(i.textContent=h.message||"Could not add part.")}finally{l&&clearTimeout(l),u&&u.isConnected&&(u.disabled=!1,u.textContent="Add Part")}}async function p(m){m.preventDefault();let f=m.target,i=f.querySelector("button[type='submit']"),u=e.getParts().find(h=>h.id===f.dataset.restockPart),g=Number(new t(f).get("quantity"))||0;if(!u||g<=0)return;let l=i?.textContent||"Restock";i&&(i.disabled=!0,i.textContent="Saving...");try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(u.quantity_on_hand)||0)+g}).eq("id",u.id).eq("company_id",e.getActiveCompanyId()),"Part restock timed out. Check your connection and try again.",15e3);if(h)throw h;e.showNotice("Part restocked."),await e.render()}catch(h){e.showNotice(`Could not restock part: ${h.message||h}`,"warning")}finally{i&&(i.disabled=!1,i.textContent=l)}}async function a(m){m.preventDefault();let f=m.currentTarget,i=f.querySelector("button[type='submit']"),u=e.getParts().find(h=>h.id===f.dataset.usePart),g=Number(new t(f).get("quantity"))||0;if(!u||g<=0)return;let l=i?.textContent||"Use";i&&(i.disabled=!0,i.textContent="Saving...");try{let h=Number(u.quantity_on_hand)||0,y=Math.max(0,h-g),{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:y}).eq("id",u.id).eq("company_id",e.getActiveCompanyId()),"Part use save timed out. Check your connection and try again.",15e3);if(b)throw b;e.showNotice("Part used."),await e.render()}catch(h){e.showNotice(`Could not use part: ${h.message||h}`,"warning")}finally{i&&(i.disabled=!1,i.textContent=l)}}async function o(m){m.preventDefault();let f=m.currentTarget,i=f.dataset.editPart,u=n.querySelector(`[data-part-edit-error="${i}"]`),g=f.querySelector("button[type='submit']"),l=new t(f);u&&(u.textContent="");let h=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let y={name:String(l.get("name")||"").trim(),sku:l.get("sku")||null,supplier_name:l.get("supplier_name")||null,machine_note:l.get("machine_note")||null,quantity_on_hand:Number(l.get("quantity_on_hand"))||0,reorder_point:Number(l.get("reorder_point"))||0,unit_cost:Number(l.get("unit_cost"))||0};try{if(!y.name)throw new Error("Part name is required.");let{error:b}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(y).eq("id",i).eq("company_id",e.getActiveCompanyId()),"Part save timed out. Check your connection and try again.",15e3);if(b&&e.isMissingColumnError(b,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(b&&e.isMissingColumnError(b,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(b&&e.isMissingColumnError(b,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(b)throw b;e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(b){u&&(u.textContent=b.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=h)}}async function d(m){m.preventDefault();let f=m.currentTarget,i=n.querySelector("#part-source-error"),u=f.querySelector("button[type='submit']"),g=new t(f),l=String(g.get("old_source")||"").trim(),h=String(g.get("new_source")||"").trim();if(i&&(i.textContent=""),!!l){if(!e.getPartSuppliersReady()){i&&(i.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(l===h){i&&(i.textContent="Change the source name before saving.");return}u&&(u.disabled=!0,u.textContent="Renaming...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:h||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",l),"Part source rename timed out. Check your connection and try again.",15e3);if(y)throw e.isMissingColumnError(y,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?y.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(y){i&&(i.textContent=y.message||"Could not update part source.")}finally{u&&(u.disabled=!1,u.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:r,createPart:s,restockPart:p,usePartFromInventory:a,updatePart:o,renamePartSource:d}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:c},typeof Ge<"u"&&(Ge.exports={createPartInventoryWorkflow:c})})()});var Tt=B((Nn,we)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(p){p.preventDefault();let a=p.target,o=a.querySelector("button[type='submit']"),d=n.querySelector("#quick-update-error"),m=e.getWorkOrders().find(i=>i.id===e.getActiveWorkOrderId()),f=new t(a);o.disabled=!0,o.textContent="Saving...",d&&(d.textContent="");try{let i=f.get("asset_id")||null,u=String(f.get("new_asset_name")||"").trim();if(i&&u)throw new Error("Choose existing equipment or create new equipment, not both.");if(u){let{data:_,error:A}=await e.createQuickFixAsset(u,"running");if(A){o.disabled=!1,o.textContent="Save Quick Update",d&&(d.textContent=`Could not add equipment: ${A.message}`);return}i=_.id}if(!u&&!e.confirmAssetLocationRouting(i,"saving this work update",d))return;let g={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(m?.description||"",f.get("assigned_to")),asset_id:i,location_id:e.locationIdForAsset(i),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let l=f.get("safety_devices_checked")==="on";if(g.status==="completed"&&m?.status!=="completed"){let _=e.blocksProcedureCompletion(m,g.procedure_template_id||null);if(_){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),_),o.disabled=!1,o.textContent="Save Quick Update",d&&(d.textContent=_);return}if(e.applySafetyCheckPayload(g,l),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){o.disabled=!1,o.textContent="Save Quick Update",d&&(d.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):m?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(l||e.hasCompletedSafetyDeviceCheck(m)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){o.disabled=!1,o.textContent="Save Quick Update",d&&(d.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&f.get("machine_down")==="on"){let _=await e.updateAssetStatus(g.asset_id,"offline");_?y.push(`equipment status did not update: ${_.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let b=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(m,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch(_=>_);u&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${u}.`),"Activity log timed out.",8e3).catch(()=>null),b&&y.push(`history did not update: ${b.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(i){r.error("Quick update save failed",i),o.disabled=!1,o.textContent="Save Quick Update",d&&(d.textContent=`Could not save update: ${i.message||i}`)}}return{updateWorkOrderQuickView:s}}typeof we<"u"&&we.exports&&(we.exports={createWorkOrderQuickUpdateWorkflow:c}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:c}})()});var Dt=B((Un,ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function p(C){return String(C.get("location_new")||C.get("location_existing")||C.get("location")||"").trim()||null}function a(){return e.getSession?.()?.user?.id||null}function o(C){return(e.getAssets?.()||[]).find(v=>v.id===C)||null}function d(C,v){if(!C)return[];let q={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(q).filter(k=>String(C[k]??"")!==String(v[k]??"")).map(k=>q[k])}function m(C){return e.isMissingColumnError(C,"manufacturer")||e.isMissingColumnError(C,"model")}async function f(C){C.preventDefault();let v=C.currentTarget,q=n.querySelector("#asset-create-error");q&&(q.textContent="");let k=v.querySelector("button[type='submit']"),T=k?.textContent||"Add Equipment",L=C.submitter?.dataset?.assetContinue==="true";k&&(k.disabled=!0,k.textContent="Saving...");try{let D=new t(v),E={company_id:e.getActiveCompanyId(),location_id:D.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location:p(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:"running",created_by:a()},w=e.supabaseClient().from("assets").insert(E).select("id").single(),{data:$,error:S}=await e.withOperationTimeout(w,"Equipment save timed out. Check your connection and try again.",15e3);if(S&&e.isMissingColumnError(S,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(S&&e.isMissingColumnError(S,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(S&&m(S))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(S&&e.isAssetHierarchySchemaError(S))throw new Error(e.equipmentSchemaMessage(S));if(S)throw S;$?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent($.id,"created",`Created ${E.name}.`),L&&$?.id?(e.setActiveAssetId($.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(D){q?q.textContent=D.message:r(D.message)}finally{k&&(k.disabled=!1,k.textContent=T)}}async function i(C){C.preventDefault();let v=C.currentTarget,q=n.querySelector("#asset-edit-error");q&&(q.textContent="");let k=v.querySelector("button[type='submit']"),T=k?.textContent||"Save Equipment";k&&(k.disabled=!0,k.textContent="Saving...");try{let L=new t(v),D=o(e.getActiveAssetId()),E={name:e.requiredText(L.get("name"),"Equipment name"),asset_code:String(L.get("asset_code")||"").trim()||null,manufacturer:String(L.get("manufacturer")||"").trim()||null,model:String(L.get("model")||"").trim()||null,location_id:L.get("location_id")||e.activeLocationDatabaseId(),location:p(L),parent_asset_id:L.get("parent_asset_id")||null,asset_type:L.get("asset_type")||"machine",safety_devices_required:L.get("safety_devices_required")==="on",status:L.get("status")},{error:w}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(E).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(w&&m(w))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(w&&e.isAssetHierarchySchemaError(w))throw new Error(e.equipmentSchemaMessage(w));if(w)throw w;let $=d(D,E);$.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${$.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(L){q?q.textContent=L.message:r(L.message)}finally{k&&(k.disabled=!1,k.textContent=T)}}async function u(C,v){let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:v}).eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!q&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(C,"status_changed",`Status changed to ${v}.`),q||null}async function g(C){C.preventDefault();let v=C.currentTarget,q=v.dataset.attachAssetPart,k=n.querySelector(`[data-asset-part-error="${s.escape(q)}"]`);k&&(k.textContent="");let T=v.querySelector("button[type='submit']"),L=T?.textContent||"Attach Part";T&&(T.disabled=!0,T.textContent="Attaching...");try{let D=new t(v),E=D.get("part_id");if(!E)throw new Error("Select a part to attach.");let w=Math.max(1,Number(D.get("quantity_recommended"))||1),$=String(D.get("note")||"").trim()||null,{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:q,part_id:E,quantity_recommended:w,note:$}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingTableError?.(S,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):S.code==="23505"?new Error("This part is already linked to this equipment."):S;e.showNotice("Part linked to equipment."),await e.render()}catch(D){k?k.textContent=D.message||"Could not link part to equipment.":e.showNotice(D.message||"Could not link part to equipment.","warning")}finally{T&&(T.disabled=!1,T.textContent=L)}}async function l(C){let v=n.querySelector("[data-asset-part-error]");v&&(v.textContent="");try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(q)throw e.isMissingTableError?.(q,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):q;e.showNotice("Part link removed."),await e.render()}catch(q){v?v.textContent=q.message||"Could not remove linked part.":e.showNotice(q.message||"Could not remove linked part.","warning")}}function h(C){return{workOrders:e.getWorkOrders().filter(v=>v.asset_id===C).length,children:e.childAssetsFor(C).length,schedules:e.getPreventiveSchedules().filter(v=>v.asset_id===C).length,requests:e.getMaintenanceRequests().filter(v=>v.asset_id===C).length}}function y(C){let v=h(C);return Object.values(v).some(Boolean)}async function b(C){let[v,q,k]=await Promise.all([_("work_orders",C),_("preventive_schedules",C),_("maintenance_requests",C)]);return{workOrders:v,children:e.childAssetsFor(C).length,schedules:q,requests:k}}async function _(C,v){let{count:q,error:k}=await e.withOperationTimeout(e.supabaseClient().from(C).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",v),`Equipment delete check timed out while checking ${C}.`,15e3);if(k)throw new Error(`Could not verify linked ${C.replaceAll("_"," ")} before deleting equipment: ${k.message}`);return q||0}async function A(C){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");try{let q=await b(C),k=e.assetDeleteBlockerMessage(q);if(k){v&&(v.textContent=k);return}e.setPendingDeleteAssetId(C),e.renderWorkspace()}catch(q){v?v.textContent=q.message||"Could not verify equipment links before delete.":e.showNotice(q.message||"Could not verify equipment links before delete.","warning")}}async function P(C){if(!e.canDeleteEquipment()){r("Only company admins and managers can delete equipment.");return}let v=n.querySelector("#asset-delete-error");v&&(v.textContent="");let q=n.querySelector(`[data-confirm-delete-asset="${s.escape(C)}"]`);q&&(q.disabled=!0,q.textContent="Deleting...");try{let k=await b(C),T=e.assetDeleteBlockerMessage(k);if(T)throw new Error(T);let L=e.getAssetDocumentStoragePaths?.(C)||[];if(L.length){let E=await e.withOperationTimeout(e.removeAssetDocumentStorage(L),"Equipment file cleanup timed out.",15e3);if(E.error)throw new Error(`Could not remove equipment files: ${E.error.message}`)}let{error:D}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(D)throw new Error(D.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":D.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(k){v&&(v.textContent=k.message||"Could not delete equipment."),q&&(q.disabled=!1,q.textContent="Permanently Delete")}}async function O(C,v="running"){let q={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:C,asset_type:"machine",safety_devices_required:!0,status:v,created_by:a()},k=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(q).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return k.error&&e.isMissingColumnError(k.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(k,e.databaseSetupRequiredMessage("adding equipment in this location"))):k.error&&e.isMissingColumnError(k.error,"created_by")?e.withSetupError(k,"Run supabase/step-next-asset-events.sql before saving equipment history."):k.error&&e.isAssetHierarchySchemaError(k.error)?e.withSetupError(k,e.equipmentSchemaMessage(k.error).replace("saving","adding")):(!k.error&&k.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(k.data.id,"created",`Created ${C}.`),k)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:_,createAsset:f,createQuickFixAsset:O,deleteAsset:P,loadAssetDeleteBlockers:b,removeAssetPart:l,requestDeleteAsset:A,updateAsset:i,updateAssetStatus:u}}typeof ve<"u"&&ve.exports&&(ve.exports={createAssetWorkflow:c}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:c}})()});var It=B((Qn,ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert,s=e.CSSRef||CSS;function p(){let u=n.querySelector("#detail-panel");u.innerHTML=e.renderRequestFormContent()}async function a(u){u.preventDefault(),await o(u.target)}async function o(u){let g=n.querySelector("#request-error"),l=u.querySelector("button[type='submit']");g&&(g.textContent=""),l&&(l.disabled=!0,l.textContent="Submitting...");try{let h=new t(u),y=h.get("asset_id")||null,b=String(h.get("equipment_note")||"").trim();if(y&&b)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!b)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let _=b||e.assetNameFor?.(y)||"Saved equipment",A=e.requiredText(h.get("description"),"Request details"),P=e.requiredText(h.get("requester_name"),"Your name"),O={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${_}

${A}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:P};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:C,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(O).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(v)throw v;let q=h.get("photo"),k="";if(q&&q.name){let L=await e.addPhotoToMaintenanceRequest(C.id,q);L&&(k=` Photo did not upload: ${L.message||L}`)}let T=await e.notifyRequestEmailer(C.id);T?.error&&console.warn("Request email notification did not send",T.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${k}`,k?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":r(h.message||h)}finally{l&&(l.disabled=!1,l.textContent="Submit Request")}}async function d(u){let g=e.getMaintenanceRequests().find(h=>h.id===u);if(!g)return;let l=n.querySelector(`[data-convert-request="${s.escape(u)}"]`);l&&(l.disabled=!0,l.textContent="Converting...");try{let h={company_id:e.getActiveCompanyId(),location_id:g.location_id||e.locationIdForAsset(g.asset_id),title:g.title,description:e.descriptionWithRequestPhotoNote(g.description,g),asset_id:g.asset_id||null,priority:g.priority||"medium",type:"corrective",status:"open",created_by:e.getSession().user.id};e.applySafetyRequirementPayload(h),e.applySafetyCheckPayload(h,!1);let{data:y,error:b}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",h,{returnSingle:!0}),"Request conversion timed out. Check your connection and try again.",15e3);if(b)throw b;let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").update({status:"converted",reviewed_by:e.getSession().user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:y.id}).eq("id",u).eq("company_id",e.getActiveCompanyId()),"Request status update timed out. Check your connection and try again.",15e3);if(_)throw _;e.setActiveSection("work"),e.setActiveWorkOrderId(y.id),await e.withOperationTimeout(e.recordWorkOrderEvent(y.id,"request_converted","Request converted to work order."),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),l&&(l.disabled=!1,l.textContent="Convert to Work Order")}}function m(u){let g=e.getMaintenanceRequests().find(l=>l.id===u);g&&(e.setQuickFixRequestId(u),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(u){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===u)&&(e.setPendingDeleteRequestId(u),e.renderWorkspace())}async function i(u){if(!e.canDeleteOperationalRecords()){r("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===u);if(!g)return;let l=n.querySelector(`[data-confirm-delete-request="${s.escape(u)}"]`);l&&(l.disabled=!0,l.textContent="Deleting...");try{if(g.photo_storage_path){let _=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(_.error)throw new Error(`Could not remove request photo: ${_.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",u).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let b=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",u).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(b.error)throw new Error(`Request delete verification failed: ${b.error.message}`);if(b.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),l&&(l.disabled=!1,l.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:d,createRequest:a,createRequestFromForm:o,deleteMaintenanceRequest:i,openQuickFixForRequest:m,renderRequestForm:p,requestDeleteMaintenanceRequest:f}}typeof ke<"u"&&ke.exports&&(ke.exports={createRequestLifecycleWorkflow:c}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:c}})()});var Ft=B((Bn,_e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.alertRef||alert;async function s(p){p.preventDefault();let a=p.target,o=a.querySelector("button[type='submit']"),d=n.querySelector("#create-work-order-error");o.disabled=!0,o.textContent="Creating...",d&&(d.textContent="");try{let m=new t(a),f=m.get("status")||"open",i=m.get("asset_id")||null,u=String(m.get("new_asset_name")||"").trim();if(i&&u)throw new Error("Choose existing equipment or create new equipment, not both.");if(u){let{data:O,error:C}=await e.createQuickFixAsset(u,"running");if(C){d&&(d.textContent=`Could not add equipment: ${C.message}`);return}i=O.id}if(!u&&!e.confirmAssetLocationRouting(i,"creating this work order",d))return;if(f==="completed"&&e.assetRequiresSafety(i)&&m.get("safety_devices_checked")!=="on"){d&&(d.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=f==="completed"?e.blocksProcedureCompletion(null,m.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),d&&(d.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let l={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(i),title:e.requiredText(m.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(m.get("description"),m.get("assigned_to")),asset_id:i,priority:m.get("priority"),type:m.get("type")||"corrective",due_at:e.workOrderDateValue(m.get("due_at")),assigned_to:e.assignedUserFromForm(m),...e.procedureColumn(m.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(m.get("actual_minutes"))||0,failure_cause:m.get("failure_cause")||null,resolution_summary:m.get("resolution_summary")||null,follow_up_needed:m.get("follow_up_needed")==="on",completion_notes:m.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(l),e.applySafetyCheckPayload(l,f==="completed"&&l.safety_check_required&&m.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",l,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){d&&(d.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),u&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${u}.`);let b=[],_=m.get("part_id");if(_){let O=e.getParts().find(v=>v.id===_),C=await e.addPartUsageToWorkOrder(h.id,O,Number(m.get("quantity_used"))||1);C?b.push(`part usage failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${O?.name||"Part"}.`)}let A=m.get("photo");if(A&&A.name){let O=await e.addPhotoToWorkOrder(h.id,A);O?b.push(`photo upload failed: ${O.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${A.name}.`)}let P=String(m.get("initial_comment")||"").trim();if(P){let O=await e.addCommentToWorkOrder(h.id,P);O?b.push(`comment failed: ${O.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(b.length?`Work order created with warning: ${b[0]}`:"Work order created.",b.length?"warning":"success"),await e.render()}catch(m){d?d.textContent=`Could not create work order: ${m.message||m}`:r(m.message||m)}finally{o.disabled=!1,o.textContent="Create Work Order"}}return{createWorkOrder:s}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderCreationWorkflow:c}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:c}})()});var Lt=B((jn,Se)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.consoleRef||console;async function s(p){p.preventDefault();let o=p.target.querySelector("button[type='submit']"),d=n.querySelector("#work-order-save-error");o.disabled=!0,o.textContent="Saving...",d&&(d.textContent="");try{let m=new t(p.target),f=e.getActiveWorkOrderId(),i=e.getWorkOrders().find(P=>P.id===f),u=n.querySelector("#status-select")?.value||i?.status||"open",g=m.get("asset_id")||null;if(typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(g,"saving this work order",d)){o.disabled=!1,o.textContent="Save Work Order";return}let l={title:e.requiredText(m.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(m.get("description"),m.get("assigned_to")),due_at:e.workOrderDateValue(m.get("due_at")),asset_id:g,location_id:e.locationIdForAsset(g),status:u,priority:m.get("priority"),type:m.get("type"),assigned_to:e.assignedUserFromForm(m),...e.procedureColumn(m.get("procedure_template_id")),failure_cause:m.get("failure_cause")||null,resolution_summary:m.get("resolution_summary")||null,follow_up_needed:m.get("follow_up_needed")==="on",actual_minutes:Number(m.get("actual_minutes"))||0};if(l.safety_check_required=e.assetRequiresSafety(g),l.status==="completed"&&l.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(i)&&m.get("safety_devices_checked")!=="on"){o.disabled=!1,o.textContent="Save Work Order",d&&(d.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let h=(i?.procedure_template_id||"")!==(l.procedure_template_id||""),y=l.status==="completed"&&(i?.status!=="completed"||h)?e.blocksProcedureCompletion(i,l.procedure_template_id||null):"";if(y){e.setWorkOrderActionWarning(f,y),o.disabled=!1,o.textContent="Save Work Order",d&&(d.textContent=y);return}l.status==="completed"&&i?.status!=="completed"?(l.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(l,l.safety_check_required&&(m.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(i)))):l.status!=="completed"?(l.completed_at=null,e.applySafetyCheckPayload(l,!1)):i?.status==="completed"&&l.safety_check_required&&m.has("safety_devices_checked")?e.applySafetyCheckPayload(l,m.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(i)):i?.status==="completed"&&!l.safety_check_required&&e.applySafetyCheckPayload(l,!1);let{error:b}=await e.withOperationTimeout(e.updateWorkOrderSafely(l,f),"Work order save timed out. Check your connection and try again.",2e4);if(b){o.disabled=!1,o.textContent="Save Work Order",d&&(d.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(b)}`);return}let _={...Object.fromEntries(m.entries()),status:u},A=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(i,_)),"Activity log timed out.",8e3).catch(P=>P);e.setWorkOrderActionWarning("",""),e.showNotice(A?`Work order saved, but history did not update: ${A.message}`:"Work order saved.",A?"warning":"success"),await e.render()}catch(m){r.error("Work order save failed",m),o.disabled=!1,o.textContent="Save Work Order",d&&(d.textContent=`Could not save work order: ${m.message||m}`)}finally{o&&o.isConnected&&(o.disabled=!1,o.textContent="Save Work Order")}}return{updateWorkOrderDetails:s}}typeof Se<"u"&&Se.exports&&(Se.exports={createWorkOrderDetailEditWorkflow:c}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:c}})()});var Nt=B((zn,qe)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;async function r(p){p.preventDefault();let a=p.currentTarget,o=n.querySelector("#parts-used-error"),d=a.querySelector("button[type='submit']");o&&(o.textContent=""),d&&(d.disabled=!0,d.textContent="Recording...");try{let m=new t(a),f=m.get("part_id"),i=Number(m.get("quantity_used"))||1,u=e.getParts().find(l=>l.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!u)throw new Error("Choose a part first.");let g=await s(e.getActiveWorkOrderId(),u,i);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(m){o&&(o.textContent=m.message||"Could not record part used.")}finally{d&&(d.disabled=!1,d.textContent="Record Part Used")}}async function s(p,a,o){if(!a)return new Error("Choose a part first.");let{error:d}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:p,p_part_id:a.id,p_quantity:o}),"Part usage save timed out.");return d||null}return{addPartUsageToWorkOrder:s,recordPartUsed:r}}typeof qe<"u"&&qe.exports&&(qe.exports={createPartUsageWorkflow:c}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:c}})()});var Ut=B((Gn,Ce)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.consoleRef||console,p=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),a=25*1024*1024,o=5*1024*1024,d=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),m=new Set;async function f(w){w.preventDefault();let $=w.currentTarget,S=$.dataset.partDocument,R=n.querySelector(`[data-part-document-error="${S}"]`),x=$.querySelector("button[type='submit']"),F=new t($),N=F.get("document"),U=h(F.get("document_type"));if(R&&(R.textContent=""),!e.getPartDocumentsReady()){R&&(R.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!N||!N.name){R&&(R.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(q(N)){R&&(R.textContent=k()),await P("part document",N,k());return}x&&(x.disabled=!0,x.textContent="Attaching...");let G=await C(N),H=G.fileName||e.safeFileName(N.name||"part-file"),ne=`${e.getActiveCompanyId()}/${S}/${r.randomUUID()}-${H}`;try{let ae=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(ne,G.blob,{contentType:G.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(ae.error)throw ae.error;let K={company_id:e.getActiveCompanyId(),part_id:S,uploaded_by:e.getSession().user.id,storage_path:ne,file_name:H,content_type:G.contentType,document_type:U,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(N.name||"part-file"),original_size_bytes:N.size||null},{error:re}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(K),"Part file record save timed out. Check your connection and try again.",15e3);if(re&&e.isColumnSchemaError(re,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete K.document_type,delete K.file_size_bytes,delete K.original_file_name,delete K.original_size_bytes,re=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(K),"Part file record retry timed out. Check your connection and try again.",15e3)).error),re)throw await b("part-documents",ne),e.isColumnSchemaError(re,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?re.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(ae){await P("part document",N,ae),R&&(R.textContent=ae.message||"Could not attach file.")}finally{x&&(x.disabled=!1,x.textContent="Attach File")}}async function i(w){w.preventDefault();let $=w.currentTarget,S=$.dataset.assetDocument,R=n.querySelector(`[data-asset-document-error="${S}"]`),x=$.querySelector("button[type='submit']"),F=new t($),N=F.get("document"),U=l(F.get("document_type"));if(R&&(R.textContent=""),!e.getAssetDocumentsReady?.()){R&&(R.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!N||!N.name){R&&(R.textContent="Choose a machine file first.");return}if(q(N)){R&&(R.textContent=k()),await P("equipment file",N,k());return}x&&(x.disabled=!0,x.textContent="Uploading...");let G=await C(N),H=`${e.getActiveCompanyId()}/${S}/${r.randomUUID()}-${G.fileName}`;try{let ne=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(H,G.blob,{contentType:G.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(ne.error)throw ne.error;let{error:ae}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:S,uploaded_by:e.getSession().user.id,storage_path:H,file_name:G.fileName,content_type:G.contentType,document_type:U,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(N.name||"machine-photo"),original_size_bytes:N.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(ae)throw await b("asset-documents",H),e.isColumnSchemaError(ae,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?ae.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(ne){await P("equipment file",N,ne),R&&(R.textContent=ne.message||"Could not upload machine file.")}finally{x&&(x.disabled=!1,x.textContent="Attach Machine File")}}async function u(w,$){let S=n.querySelector("[data-asset-document-error]");if(S&&(S.textContent=""),!w||!$){let R="Missing machine file record. Refresh and try again.";S?S.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([$]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:x}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(x)throw x;e.showNotice("Machine file deleted."),await e.render()}catch(R){S?S.textContent=R.message||"Could not delete machine file.":e.showNotice(R.message||"Could not delete machine file.","warning")}}async function g(w,$){let S=n.querySelector("#photo-error");if(S&&(S.textContent=""),!w||!$){let R="Missing photo record. Refresh and try again.";S?S.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([$]),"Photo delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:x}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",w).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(x)throw x;let F=$.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${F}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(R){S?S.textContent=R.message||"Could not delete photo.":e.showNotice(R.message||"Could not delete photo.","warning")}}function l(w){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(w)?w:"other"}function h(w){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(w)?w:"other"}async function y(w){w.preventDefault();let $=w.currentTarget,S=$.querySelector("button[type='submit']"),R=n.querySelector("#photo-error");R&&(R.textContent="");let x=new t($).get("photo");if(!x||!x.name){R&&(R.textContent="Choose a photo first.");return}let F=L(x);if(F){R&&(R.textContent=F),await P("work order photo",x,F);return}S.disabled=!0,S.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let U=await _(e.getActiveWorkOrderId(),x);if(U)throw U;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${x.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(N){await P("work order photo",x,N),R&&(R.textContent=`Could not upload photo: ${N.message||N}`)}finally{S.disabled=!1,S.textContent="Upload Photo"}}async function b(w,$){try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().storage.from(w).remove([$]),"Uploaded file cleanup timed out.",1e4);S&&s.warn(`Could not remove uploaded ${w} object`,S)}catch(S){s.warn(`Could not remove uploaded ${w} object`,S)}}async function _(w,$){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let R=L($);if(R)return await P("work order photo",$,R),new Error(R);let x=await C($,O()),F=D(x);if(F)return await P("work order photo",$,F),new Error(F);let N=`${e.getActiveCompanyId()}/${w}/${r.randomUUID()}-${x.fileName}`,U=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(N,x.blob,{contentType:x.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(U.error)return await P("work order photo",$,U.error),U.error;let G={company_id:e.getActiveCompanyId(),work_order_id:w,uploaded_by:e.getSession().user.id,storage_path:N,file_name:x.fileName,content_type:x.contentType,file_size_bytes:x.blob.size||null,original_file_name:e.safeFileName($.name||"photo"),original_size_bytes:$.size||null},{error:H}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record save timed out. Check your connection and try again.",15e3);return H&&e.isColumnSchemaError(H,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete G.file_size_bytes,delete G.original_file_name,delete G.original_size_bytes,H=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record retry timed out. Check your connection and try again.",15e3)).error),H&&await b("work-order-photos",N),H&&await P("work order photo",$,H),H||null}async function A(w,$){if(!w)return new Error("Request was not saved before photo upload.");let S=L($);if(S)return await P("request photo",$,S),new Error(S);let R=await C($,O()),x=D(R);if(x)return await P("request photo",$,x),new Error(x);let F=`${w}/${r.randomUUID()}-${R.fileName}`,N=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(F,R.blob,{contentType:R.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(N.error)return await P("request photo",$,N.error),N.error;let{error:U}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:w,p_photo_storage_path:F,p_photo_file_name:R.fileName,p_photo_content_type:R.contentType,p_photo_file_size_bytes:R.blob.size||null,p_photo_original_file_name:e.safeFileName($.name||"photo"),p_photo_original_size_bytes:$.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return U&&(await b("maintenance-request-photos",F),await P("request photo",$,U)),U||null}async function P(w,$,S){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let R=String(S?.message||S||"Upload failed").slice(0,500),x=e.safeFileName($?.name||"unknown-file"),F=T($),N=Number($?.size||0),U=[w,x,F,N,R].join("|");if(!m.has(U)){m.add(U);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||w||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${w}`.slice(0,140),details:[`Upload context: ${w}`,`File: ${x}`,`Type: ${F}`,`Size: ${N}`,`Error: ${R}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(G){s.warn("Could not report upload failure",G)}}}function O(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function C(w,$={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(w,$);let S=["image/jpeg","image/png","image/webp","image/heic","image/heif"],R=T(w);if(!S.includes(R))return{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:R};try{if(!p)throw new Error("Browser image optimization is unavailable.");let x=await p(w),F=Number($.targetBytes||0)||1*1024*1024,N=$.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],U=null;for(let G of N){let H=await E(x,G.maxDimension,G.quality);if(U=H,H.size<=F)break}if(x.close&&x.close(),!U)throw new Error("Browser could not optimize this image.");return{blob:U,fileName:`${e.fileBaseName(w.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(x){return s.warn("Photo optimization failed; uploading original.",x),{blob:w,fileName:e.safeFileName(w.name||"photo"),contentType:R}}}function v(w){return["image/jpeg","image/png","image/webp"].includes(T(w))}function q(w){return!v(w)&&Number(w.size||0)>a}function k(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function T(w){let $=String(w?.type||"").trim().toLowerCase();if($)return $;let S=String(w?.name||"").toLowerCase();return/\.(jpe?g)$/.test(S)?"image/jpeg":/\.png$/.test(S)?"image/png":/\.webp$/.test(S)?"image/webp":/\.gif$/.test(S)?"image/gif":/\.heic$/.test(S)?"image/heic":/\.heif$/.test(S)?"image/heif":/\.pdf$/.test(S)?"application/pdf":/\.txt$/.test(S)?"text/plain":/\.csv$/.test(S)?"text/csv":/\.doc$/.test(S)?"application/msword":/\.docx$/.test(S)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(S)?"application/vnd.ms-excel":/\.xlsx$/.test(S)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function L(w){let $=T(w);return d.has($)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function D(w){return d.has(String(w?.contentType||"").toLowerCase())?Number(w?.blob?.size||0)>o?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function E(w,$,S){let R=Math.min(1,$/Math.max(w.width,w.height)),x=Math.max(1,Math.round(w.width*R)),F=Math.max(1,Math.round(w.height*R)),N=n.createElement("canvas");N.width=x,N.height=F,N.getContext("2d",{alpha:!1}).drawImage(w,0,0,x,F);let G=await new Promise(H=>N.toBlob(H,"image/jpeg",S));if(!G)throw new Error("Browser could not optimize this image.");return G}return{addPhotoToMaintenanceRequest:A,addPhotoToWorkOrder:_,optimizePhoto:C,removeUploadedObject:b,reportUploadFailure:P,deleteAssetDocument:u,deleteWorkOrderPhoto:g,uploadAssetDocument:i,uploadPartDocument:f,uploadPhoto:y}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createMediaStorageWorkflow:c}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:c}})()});var Qt=B((Vn,$e)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData,r=e.cryptoRef||crypto,s=e.URLRef||URL,p=e.consoleRef||console,a=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),o=25*1024*1024,d=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function m(l){l.preventDefault();let h=l.currentTarget,y=n.querySelector("#company-logo-error"),b=h.querySelector("button[type='submit']"),_=new t(h).get("logo");if(y&&(y.textContent=""),!_||!_.name){y&&(y.textContent="Choose a logo image first.");return}b&&(b.disabled=!0,b.textContent="Uploading...");try{let A=u(_);if(A)throw new Error(A);let P=await f(_),O=g(P);if(O)throw new Error(O);let C=`${e.getActiveCompanyId()}/logo-${r.randomUUID()}-${P.fileName}`,v=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(C,P.blob,{contentType:P.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(v.error)throw new Error(v.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":v.error.message);let{error:q}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:C}),"Company logo record save timed out. Check your connection and try again.",15e3);if(q)throw await e.removeUploadedObject("company-logos",C),new Error(e.isColumnSchemaError(q,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":q.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":q.message);let k=e.getCompanies().find(T=>T.id===e.getActiveCompanyId());k&&(k.logo_path=C,k.logoUrl=s.createObjectURL(P.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(A){y&&(y.textContent=A.message||"Could not upload logo.")}finally{b&&(b.disabled=!1,b.textContent="Upload Logo")}}async function f(l){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(l);let h=i(l);try{if(!a)throw new Error("Browser logo optimization is unavailable.");let y=await a(l),_=Math.min(1,1200/Math.max(y.width,y.height)),A=Math.max(1,Math.round(y.width*_)),P=Math.max(1,Math.round(y.height*_)),O=n.createElement("canvas");O.width=A,O.height=P;let C=O.getContext("2d",{alpha:!0});C.clearRect(0,0,A,P),C.drawImage(y,0,0,A,P),y.close&&y.close();let v=await new Promise(q=>O.toBlob(q,"image/png"));if(!v)throw new Error("Browser could not optimize this logo.");return{blob:v,fileName:`${e.fileBaseName(l.name||"logo")}.png`,contentType:"image/png"}}catch(y){return p.warn("Logo optimization failed; uploading original.",y),{blob:l,fileName:e.safeFileName(l.name||"logo"),contentType:h}}}function i(l){let h=String(l?.type||"").trim().toLowerCase();if(h)return h;let y=String(l?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function u(l){let h=i(l);return d.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(l){return d.has(String(l?.contentType||"").toLowerCase())?Number(l?.blob?.size||0)>o?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:m}}typeof $e<"u"&&$e.exports&&($e.exports={createCompanyLogoWorkflow:c}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:c}})()});var Bt=B((Hn,Ve)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.CSSRef||CSS,r=e.alertUser||alert;function s(o){return e.partUsageRows(o).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(o).length?"This part is linked to equipment and is kept for traceability.":""}function p(o){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}if(!e.getParts().find(i=>i.id===o))return;let m=s(o);if(m){r(m);return}let f=!!n.querySelector(`[data-delete-part="${t.escape(o)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===o||f){a(o);return}e.setPendingDeletePartId(o),e.renderWorkspace()}async function a(o){if(!e.canDeleteParts()){r("Only company admins and managers can delete parts.");return}let d=e.getParts().find(u=>u.id===o),m=n.querySelector("#part-delete-error");if(m&&(m.textContent=""),!d)return;let f=s(o);if(f){m&&(m.textContent=f);return}let i=n.querySelector(`[data-delete-part="${t.escape(o)}"].permanent-delete-button`);i&&(i.disabled=!0,i.textContent="Deleting...");try{let u=(e.getPartDocumentsByPartId()[o]||[]).map(y=>y.storage_path).filter(Boolean);if(u.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(u),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:l}=await e.withOperationTimeout(e.deletePartRecord(o),"Part delete timed out. Check your connection and try again.",15e3);if(l)throw new Error(l.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":l.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(o),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(u){e.showNotice(u.message||"Could not delete part.","warning"),m&&(m.textContent=u.message||"Could not delete part."),i&&(i.disabled=!1,i.textContent="Permanently Delete")}}return{deletePart:a,requestDeletePart:p}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:c},typeof Ve<"u"&&(Ve.exports={createPartDeleteWorkflow:c})})()});var jt=B((Yn,He)=>{(function(){function c(e={}){async function n(t){let r=t.target,s=r.type==="checkbox"?r.checked?"checked":"":r.value;r.disabled=!0;try{let{error:p}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:r.dataset.workOrderId,procedure_step_id:r.dataset.stepResult,completed_by:s?e.getSession().user.id:null,value:s,completed_at:s?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(p)throw p;await e.withOperationTimeout(e.recordWorkOrderEvent(r.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let a=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(o=>o);if(a){e.showNotice(`Checklist saved, but refresh did not finish: ${a.message||a}`,"warning"),r.disabled=!1;return}if(e.getWorkOrderActionWarningId()===r.dataset.workOrderId){let o=e.getWorkOrders().find(d=>d.id===r.dataset.workOrderId);e.blocksProcedureCompletion(o)||e.setWorkOrderActionWarning("","")}e.renderWorkspace()}catch(p){e.showNotice(`Could not save checklist step: ${p.message||p}`,"warning"),r.disabled=!1}}return{saveStepResult:n}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:c},typeof He<"u"&&(He.exports={createProcedureChecklistWorkflow:c})})()});var zt=B((Kn,Ye)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.bodyRef||document.body,r=e.FormDataCtor||FormData;async function s(m,f){let{data:i,error:u}=await e.withOperationTimeout(e.getPublicRequestIntake(m),f);return{data:Array.isArray(i)?i[0]:i,error:u}}async function p(m){t.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:u,error:g}=await s(m,"Request QR lookup timed out.");if(f=u,g||!f){o("This QR code link is inactive or invalid.");return}}catch{o("This QR code link is inactive or invalid.");return}let i=e.publicRequestUrl(m);e.setAppHtml(e.publicRequestQrPage(f,i)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,i)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function a(m){t.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:i,error:u}=await s(m,"Request form lookup timed out.");if(u){o("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=i}catch(i){o(i.message||"This request link could not be loaded.");return}if(!f){o("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),n.querySelector("#public-request-form").addEventListener("submit",i=>d(i,m,f))}function o(m){e.setAppHtml(e.publicRequestError(m))}async function d(m,f,i){m.preventDefault();let u=m.currentTarget,g=new r(u),l=n.querySelector("#public-request-error"),h=u.querySelector("button[type='submit']");l&&(l.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:b}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(b)throw b;let _=g.get("photo"),A="";if(_&&_.name){let O=await e.addPhotoToMaintenanceRequest(y,_);O&&(A=`Request sent, but the photo did not upload: ${O.message||O}`)}let P=await e.notifyRequestEmailer(y);P.error&&e.warn("Request email notification did not send",P.error),e.setAppHtml(e.publicRequestSuccess(i,A)),n.querySelector("#public-request-another").addEventListener("click",()=>a(f))}catch(y){l&&(l.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:o,renderPublicRequestIntake:a,renderPublicRequestQrPage:p,submitPublicRequest:d}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:c},typeof Ye<"u"&&(Ye.exports={createPublicRequestIntakeWorkflow:c})})()});var Gt=B((Jn,Ke)=>{(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataCtor||FormData;function r(){e.setAppHtml(e.companyCreateForm(e.getAppError())),n.querySelector("#company-form").addEventListener("submit",s),n.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function s(p){p.preventDefault();let a=p.target,o=a.querySelector("button[type='submit']"),d=n.querySelector("#company-error"),m=String(new t(a).get("name")||"").trim();o.disabled=!0,o.textContent="Creating...",d.textContent="";try{if(!m)throw new Error("Company name is required.");let f=e.getCompanies().find(l=>l.name.trim().toLowerCase()===m.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:i,error:u}=await e.withOperationTimeout(e.createCompanyRecord(m),"Company creation timed out.");if(u){d.textContent=u.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":u.message;return}if(e.setActiveCompanyId(i),e.persistActiveCompanyId(i),!await e.ensureProfileForActiveCompany(m))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){d.textContent=f.message||"Could not create company."}finally{o?.isConnected&&(o.disabled=!1,o.textContent="Create Company")}}return{createCompany:s,renderCompanyCreate:r}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:c},typeof Ke<"u"&&(Ke.exports={createCompanySetupWorkflow:c})})()});var Vt=B((Zn,Je)=>{(function(){function c(e={}){async function n(r){let s=e.getWorkOrders().find(p=>p.id===e.getActiveWorkOrderId());r.target.disabled=!0;try{await t(e.getActiveWorkOrderId(),r.target.value)||(r.target.value=s?.status||"open")}catch(p){r.target.value=s?.status||"open",e.showNotice(`Could not update status: ${p.message||p}`,"warning")}finally{r.target.disabled=!1}}async function t(r,s){let p=e.getWorkOrders().find(f=>f.id===r);if(s==="completed"){let f=e.blocksProcedureCompletion(p);if(f)return e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning(r,f),e.showNotice(f,"warning"),await e.render(),!1}let a=e.currentSafetyCheckboxCheckedForWorkOrder(r),o=e.hasCompletedSafetyDeviceCheck(p)||a;if(s==="completed"&&e.requiresSafetyDeviceCheck(p)&&!o){e.setActiveWorkOrderId(r);let f="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(r,f),e.showNotice(f,"warning"),await e.render(),!1}let d={status:s,asset_id:p?.asset_id||null,completed_at:s==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(d),s==="completed"?e.applySafetyCheckPayload(d,d.safety_check_required&&o):s!=="completed"&&e.applySafetyCheckPayload(d,!1),delete d.asset_id;let{error:m}=await e.withOperationTimeout(e.updateWorkOrderSafely(d,r),"Status save timed out. Check your connection and try again.",15e3);return m?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(m)}`,"warning"),!1):(e.setActiveWorkOrderId(r),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(r,"status_changed",`Status changed to ${e.statusLabel(s)}.`),e.showNotice(`Status changed to ${e.statusLabel(s)}.`),await e.render(),!0)}return{setWorkOrderStatus:t,updateWorkOrderStatus:n}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:c},typeof Je<"u"&&(Je.exports={createWorkOrderStatusWorkflow:c})})()});var Ht=B((Xn,Ze)=>{(function(){function c(e){async function n(t,r){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let s=e.getPlanningWorkOrders().find(p=>p.id===t);if(!s||s.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let p=e.workOrderDateValue(r);if(!p)throw new Error("Choose a due date.");let a=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:p},t),"Due date save timed out. Check your connection and try again.");if(a.error)throw a.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(o=>o.id===t?{...o,due_at:p}:o)),e.setWorkOrders(e.getWorkOrders().map(o=>o.id===t?{...o,due_at:p}:o)),e.resetNoDuePage(),await e.recordWorkOrderEvent(t,"updated",`Due date set to ${p} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:p}}catch(p){return e.showNotice(`Could not set due date: ${p.message||p}`,"warning"),{saved:!1,reason:"save_failed",error:p}}}return{savePlanningDueDate:n}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:c},typeof Ze<"u"&&(Ze.exports={createPlanningDueDateWorkflow:c})})()});var Yt=B((er,Xe)=>{(function(){async function c(e,n){if(!e?.functions?.invoke||!n)return{data:null,error:null,skipped:!0};try{let{data:t,error:r}=await e.functions.invoke("request-emailer",{body:{request_id:n}});return{data:t,error:r||null,skipped:!1}}catch(t){return{data:null,error:t,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:c},typeof Xe<"u"&&(Xe.exports={notifyRequestEmailer:c})})()});var Kt=B((tr,et)=>{(function(){async function c(n,t,r=[],s={}){let p=s.pathKey||"storage_path",a=s.urlKey||"signedUrl",o=s.expiresIn||600,d=s.onError;await Promise.all(r.map(async m=>{let f=m?.[p];if(!f)return;let{data:i,error:u}=await n.storage.from(t).createSignedUrl(f,o);if(u){m[a]="",typeof d=="function"&&d(m,u);return}m[a]=i?.signedUrl||""}))}function e(n={}){function t(r){if(!r||!n.getReady())return;let p=(n.getRows(r)||[]).filter(o=>o.storage_path&&!o.signedUrl),a=n.getSigningMap();!p.length||a[r]||(a[r]=!0,n.withOperationTimeout(c(n.supabaseClient(),n.bucketName,p),n.timeoutMessage||"Signed file link load timed out.",n.timeoutMs||1e4).catch(o=>{n.warn("Could not load signed file links",o)}).finally(()=>{delete a[r],n.getActiveGroupId()===r&&n.renderWorkspace()}))}return{ensureGroupSignedUrls:t}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e},typeof et<"u"&&(et.exports={addSignedUrlsToRows:c,createDeferredSignedUrlLoader:e})})()});var Jt=B((nr,tt)=>{(function(){function c(t,r){if(t[r]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${r}`);return t[r]}function e(t={}){let r=c(t,"supabaseClient"),s=c(t,"workspaceUiState"),p=c(t,"applyRequestQueryFilters"),a=c(t,"applyWorkOrderListFilters"),o=c(t,"applyWorkOrderFilters"),d=c(t,"selectWorkOrders"),m=c(t,"countWorkOrdersQuery"),f=c(t,"fetchExactSearchedWorkOrderPage"),i=c(t,"isColumnSchemaError"),u=t.warn||(()=>{}),g=c(t,"LIST_ITEMS_PER_PAGE"),l=c(t,"WORK_ORDERS_PER_PAGE"),h=c(t,"REQUEST_RELATION_SELECT"),y=c(t,"REQUEST_ASSET_FALLBACK_SELECT"),b=c(t,"REQUEST_FALLBACK_SELECT"),_=c(t,"WORK_ORDER_RELATION_SELECT"),A=c(t,"WORK_ORDER_FALLBACK_SELECT");function P(){return typeof r=="function"?r():r}async function O(D=s.getRequestViewFilter(),E={}){let w=Math.max(1,s.getRequestsPage()),$=(w-1)*g,S=$+g-1,R=E.includeRelations===!1?b:E.includeLocationRelation===!1?y:h,x=await p(P().from("maintenance_requests").select(R,{count:"exact"}),D).order("created_at",{ascending:!1}).range($,S);return x.error&&E.includeLocationRelation!==!1&&i(x.error,["location_id","locations"])?O(D,{includeLocationRelation:!1}):x.error&&E.includeRelations!==!1?O(D,{includeRelations:!1}):!x.error&&x.count&&w>1&&$>=x.count?(s.setRequestsPage(Math.max(1,Math.ceil(x.count/g))),O(D,E)):x}async function C(D){let E=await p(P().from("maintenance_requests").select("id",{count:"exact",head:!0}),D);return E.error?(u("Request count failed",E.error),0):E.count||0}async function v(){let[D,E,w]=await Promise.all([C("active"),C("converted"),C("all")]);return{active:D,converted:E,all:w}}async function q(D={}){if(s.getWorkOrderSearchMode()&&s.getSearchQuery().trim())return f(D);let E=Math.max(1,s.getWorkOrderPage()),w=(E-1)*l,$=w+l-1,S=D.includeLocationRelation===!1?A:_,R=await a(d(P(),S,{count:"exact"})).range(w,$);return!R.error&&R.count&&E>1&&w>=R.count?(s.setWorkOrderPage(Math.max(1,Math.ceil(R.count/l))),q(D)):R}async function k(D={}){let E=await o(m(P()),D);return E.error?(u("Work order count failed",E.error),0):E.count||0}async function T(){let[D,E,w,$,S,R,x,F]=await Promise.all([k({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),k({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:D,newWork:E,inProgress:w,blocked:$,overdue:S,completedAll:R,completedMonth:x,completedWeek:F}}async function L(){let[D,E,w,$,S,R,x,F]=await Promise.all([k({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),k({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:D,newWork:E,inProgress:w,blocked:$,overdue:S,completedAll:R,completedMonth:x,completedWeek:F}}return{fetchRequestPage:O,countRequests:C,loadRequestDashboardCounts:v,fetchWorkOrderPage:q,countWorkOrders:k,loadWorkOrderDashboardCounts:T,loadMyWorkDashboardCounts:L}}let n={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=n),typeof tt<"u"&&(tt.exports=n)})()});var Zt=B((rr,nt)=>{(function(){function c(e={}){let n=e.windowRef||window,t=e.documentRef||document,r=e.app;function s(){return n.MaintainOpsAuthRedirects.authCallbackUrl(n.location,n.PUBLIC_APP_URL)}function p(){return n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location)}function a(){n.history.replaceState({},t.title,n.MaintainOpsAuthRedirects.cleanAuthUrl(n.location))}async function o(g){d("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let l=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;l=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;l=h?.session||null}if(!l){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;l=h?.session||null}if(!l)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(l),a(),d("Verification complete. Loading workspace..."),await e.render()}catch(l){a(),m(l.message||"This verification link is invalid or expired.")}}function d(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallback(g)}function m(g){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.authCallbackError(g),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(g=e.passwordRecoveryParamsFromUrl()){let l=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:b}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});l=!!(y?.session&&!b),b&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";u({ready:l,initialError:h})}function i(g="",l=""){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordResetRequest(g,l),t.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),t.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),t.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,b=y.querySelector("button[type='submit']"),_=t.querySelector("#auth-error"),A=t.querySelector("#auth-status"),P=String(new FormData(y).get("email")||"").trim();_.textContent="",A.textContent="Sending reset link...",b.disabled=!0,b.textContent="Sending...";try{let{error:O}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail(P,{redirectTo:p()}),"Password reset email timed out. Check your connection and try again.",2e4);if(O){A.textContent="",_.textContent=O.message;return}A.textContent="If that email exists in Supabase, a reset link has been sent."}catch(O){A.textContent="",_.textContent=O.message||"Could not send reset link."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Send Reset Link")}})}function u({ready:g=!1,initialError:l=""}={}){t.body.classList.remove("public-qr-mode"),r.innerHTML=e.passwordRecovery({ready:g,initialError:l}),t.querySelector("#auth-back-to-login").addEventListener("click",()=>{a(),e.renderAuth("login")}),t.querySelector("#auth-send-new-reset").addEventListener("click",()=>{a(),i()}),t.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,b=y.querySelector("button[type='submit']"),_=new FormData(y),A=String(_.get("password")||""),P=String(_.get("confirmPassword")||""),O=t.querySelector("#auth-error"),C=t.querySelector("#auth-status");if(O.textContent="",A.length<8){O.textContent="Password must be at least 8 characters.";return}if(A!==P){O.textContent="Passwords do not match.";return}C.textContent="Updating password...",b.disabled=!0,b.textContent="Updating...";try{let{error:v}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:A}),"Password update timed out. Try the newest reset link again.",2e4);if(v){C.textContent="",O.textContent=v.message;return}a();let{data:q}=await e.supabaseClient.auth.getSession();if(e.setSession(q.session),C.textContent=q.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",q.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(v){C.textContent="",O.textContent=v.message||"Could not update password."}finally{t.body.contains(b)&&(b.disabled=!1,b.textContent="Update Password")}})}return{authCallbackRedirectUrl:s,passwordResetRedirectUrl:p,clearPasswordRecoveryUrl:a,startAuthCallback:o,renderAuthCallback:d,renderAuthCallbackError:m,startPasswordRecovery:f,renderPasswordResetRequest:i,renderPasswordRecovery:u}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:c},typeof nt<"u"&&(nt.exports={createAuthSessionFlow:c})})()});var Xt=B((ar,Pe)=>{(function(){function c(p,a){let o=a.getProfilesByUserId();if(p.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${a.escapeHtml(o[p.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(p.created_at).toLocaleString()}</span>
        <p>${a.escapeHtml(p.body)}</p>
      </article>
    `;if(p.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${a.photoMetaText(p)} &middot; ${a.escapeHtml(o[p.uploaded_by]?.full_name||"Team member")}</span>
        <p>${a.escapeHtml(p.file_name)}</p>
        ${p.signedUrl?`<a href="${a.escapeHtml(p.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(p.type==="part"){let m=a.partUsageUnitCost(p)*(Number(p.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(p.created_at).toLocaleString()} &middot; ${a.escapeHtml(o[p.created_by]?.full_name||"Team member")}</span>
        <p>${a.escapeHtml(p.parts?.name||"Part")} - ${Number(p.quantity_used)||0} used - ${a.money(m)}</p>
      </article>
    `}return`
    <article>
      <strong>${a.escapeHtml(p.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(p.created_at).toLocaleString()} \xC2\xB7 ${a.escapeHtml(o[p.actor_id]?.full_name||"Team member")}</span>
      <p>${a.escapeHtml(p.summary)}</p>
    </article>
  `}function e(p,a){let o=a.getProcedureTemplates(),d=a.getPartsUsedByWorkOrder(),m=a.getCommentsByWorkOrder(),f=a.getPhotosByWorkOrder(),i=a.getMessageThreads(),u=o.find(A=>A.id===p.procedure_template_id),g=u?a.checklistProgress(p,u):null,l=(d[p.id]||[]).length,h=(m[p.id]||[]).length,y=(f[p.id]||[]).length,b=i.filter(A=>A.work_order_id===p.id).length,_=[];return p.asset_id&&_.push(n("asset","Equipment",p.assets?.name||"Linked",a)),u&&g&&_.push(n("procedure","Procedure checklist",`${g.done}/${g.total}`,a)),l&&_.push(n("parts","Parts",String(l),a)),h&&_.push(n("comment","Comments",String(h),a)),b&&_.push(n("message","Messages",String(b),a)),y&&_.push(t(p.id,String(y),a)),_.length?`<div class="relationship-row">${_.join("")}</div>`:""}function n(p,a,o,d){return`
    <span class="relationship-chip ${p}" title="${d.escapeHtml(a)}">
      ${r(p)}
      <span>${d.escapeHtml(o)}</span>
    </span>
  `}function t(p,a,o){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${o.escapeHtml(p)}" title="Open photos">
      ${r("photo")}
      <span>${o.escapeHtml(a)}</span>
    </button>
  `}function r(p){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[p]||""}function s(p){return Object.freeze({renderActivityItem:a=>c(a,p),renderRelationshipChips:a=>e(a,p),relationshipChip:(a,o,d)=>n(a,o,d,p),photoJumpChip:(a,o)=>t(a,o,p),relationshipIcon:r})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:s}),typeof Pe<"u"&&Pe.exports&&(Pe.exports={createRelationshipDisplayHelpers:s})})()});var en=B((or,rt)=>{(function(){function c(e){let n=e.segmentIcon,t=e.escapeHtml,r=e.renderAssetOptions,s=e.renderMaintenanceRequestPhoto,p=e.isConvertedRequest,a=e.canDeleteOperationalRecords,o=e.canEditOperationalRecords||(()=>!0),d=e.getPendingDeleteRequestId,m=e.getProfilesByUserId;function f(l,h){return l==="converted"?`${h} converted`:l==="all"?`${h} total`:`${h} active`}function i(l,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",l.active],["converted","Converted",l.converted],["all","All",l.all]].map(([_,A,P])=>`
            <button class="segment ${h===_?"active":""}" data-request-filter="${_}" type="button" ${y.locked&&_!=="active"?"disabled":""}>
              ${n(_==="active"?"open":_==="converted"?"completed":"all")}${A} <span>${P}</span>
            </button>
          `).join("")}
        </div>
      `}function u(l){let h=p(l),y=o(),b=d()===l.id,_=m(),A=l.created_at?new Date(l.created_at):null,P=A&&!Number.isNaN(A.getTime())?A.toLocaleString():"date unavailable",O=l.assets?.name||l.locations?.name||"No equipment",C=l.requested_by_name||_[l.requested_by]?.full_name||"Requester",v=l.converted_by||l.reviewed_by||"",q=_[v]?.full_name||"",k=q?`Converted to work order by ${q}`:v?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",T=y&&a()?b?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${t(l.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${t(l.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${h?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${l.priority}">${t(l.priority)}</span>
                <span class="chip ${h?"completed":"open"}">${h?"converted":t(l.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${t(l.title)}</h3>
            <p>${t(l.description||"No description.")}</p>
            ${s(l)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${t(O)}</span>
              <span><strong>Requester</strong>${t(C)}</span>
              <span><strong>Received</strong>${t(P)}</span>
            </div>
          </div>
          ${y&&!h&&l.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${l.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${l.id}" type="button">Convert to Work Order</button>
              ${T}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${t(k)}</span>
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:i,renderMaintenanceRequest:u,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:c},typeof rt<"u"&&(rt.exports={createRequestDisplayHelpers:c})})()});var tn=B((ir,at)=>{(function(){function c({statusLabel:e,workOrderTypeLabel:n=E=>String(E||"corrective").replace(/\b\w/g,w=>w.toUpperCase()),teamMemberName:t,getWorkOrderAssigneeFilter:r,getWorkOrderFilter:s,getWorkOrderTypeFilter:p=()=>"all",getWorkOrderPriorityFilter:a=()=>"all",getWorkSort:o=()=>"newest",getWorkGroup:d=()=>"none",getActiveStatusFilter:m,getMyWorkFilter:f,getActiveSection:i,getDueState:u,getProcedureTemplates:g,getActiveWorkOrderId:l,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:b,TYPE_OPTIONS:_=[],OUTSIDE_VENDOR_VALUE:A,escapeHtml:P,cleanWorkOrderDescription:O,relationshipIcon:C,segmentIcon:v,isVendorAssigned:q,assignmentLabel:k,renderRelationshipChips:T,canAssignWorkOrderToMe:L,canManageTeam:D}){function E(){let W=r(),Q=s(),z=m(),Z=W?`${t(W)} Work`:Q==="unassigned"?"Unassigned Work Orders":Q==="vendor"?"Outside Vendor Work":Q==="assigned"?"Assigned Work Orders":"Work Orders";return z==="active"||z==="all"?Z==="Work Orders"?"Active Work Orders":`Active - ${Z}`:`${e(z)} - ${Z}`}function w(){let W=m();return W==="active"||W==="all"?"My Work":`${e(W)} - My Work`}function $(){return i()==="mywork"?w():E()}function S(W){let Q=i(),z=f();return Q==="mywork"?`${W} shown - ${Q==="mywork"?z==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${W} shown`}function R(W,Q,z){return`<option value="${P(W)}" ${W===z?"selected":""}>${P(Q)}</option>`}function x(W){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[W]||"Any assignment"}function F(W){return W?W.charAt(0).toUpperCase()+W.slice(1):""}function N(W=[]){let Q=m(),z=Q==="all"?"active":Q,Z=s(),J=r(),ee=p(),X=a(),oe=o(),V=d(),ce=["completed","completed_month","completed_week"].includes(Q),le=z==="active"&&Z==="all"&&!J&&ee==="all"&&X==="all"&&oe==="newest"&&V==="none",te=W.find(Y=>Y.userId===J),I=[`Status: ${e(z)}`,`Assignment: ${x(Z)}`,...te?[`Person: ${te.name}`]:[],...ee!=="all"?[`Type: ${n(ee)}`]:[],...X!=="all"?[`Priority: ${F(X)}`]:[]],ue=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ge=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],me=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],pe=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${I.map(Y=>`<li><span>${P(Y)}</span></li>`).join("")}
              </ol>
            </div>
            <button class="text-button work-filter-clear" data-clear-work-filters type="button" ${le?"disabled":""}>Clear filters</button>
          </div>
          <div class="work-control-section">
            <span class="work-control-section-title">Filter by</span>
            <div class="work-control-fields work-filter-fields">
              <label class="work-control-field ${z!=="active"?"is-active":""}">
                <span>Status</span>
                <select data-work-status-filter aria-label="Filter work orders by status">
                  ${ue.map(([Y,M])=>R(Y,M,z)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Z!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ge.map(([Y,M])=>R(Y,M,Z)).join("")}
                </select>
              </label>
              <label class="work-control-field ${J?"is-active":""}">
                <span>Assigned person</span>
                <select data-work-assignee-filter aria-label="Filter work orders by assigned person">
                  ${R("","Any team member",J)}
                  ${W.map(Y=>R(Y.userId,Y.name,J)).join("")}
                </select>
              </label>
              <label class="work-control-field ${ee!=="all"?"is-active":""}">
                <span>Work type</span>
                <select data-work-type-filter aria-label="Filter work orders by work type">
                  ${R("all","Any type",ee)}
                  ${_.map(Y=>R(Y,n(Y),ee)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${R("all","Any priority",X)}
                  ${["critical","high","medium","low"].map(Y=>R(Y,F(Y),X)).join("")}
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
                  ${ce?R("completed","Recently completed","completed"):me.map(([Y,M])=>R(Y,M,oe)).join("")}
                </select>
              </label>
              <label class="work-control-field ${V!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${pe.map(([Y,M])=>R(Y,M,V)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function U(W,Q){if(Q==="assignee"){if(q(W))return{key:"vendor",label:"Outside vendor",order:900};if(!W.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let J=k(W);return{key:`assignee:${W.assigned_to}`,label:J,order:100}}if(Q==="status"){let J=["open","in_progress","blocked","completed"].indexOf(W.status);return{key:`status:${W.status}`,label:e(W.status),order:J<0?99:J}}if(Q==="priority"){let J=["critical","high","medium","low"].indexOf(W.priority);return{key:`priority:${W.priority}`,label:F(W.priority||"Unspecified"),order:J<0?99:J}}let z=W.type||"corrective",Z=_.indexOf(z);return{key:`type:${z}`,label:n(z),order:Z<0?99:Z}}function G(W,Q={}){if(!W.length)return'<p class="muted">No work orders match these filters.</p>';let z=Q.groupBy||"none";if(z==="none")return`<div class="work-list" id="work-order-list">${W.map(H).join("")}</div>`;let Z=new Map;return W.forEach(ee=>{let X=U(ee,z);Z.has(X.key)||Z.set(X.key,{...X,workOrders:[]}),Z.get(X.key).workOrders.push(ee)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...Z.values()].sort((ee,X)=>ee.order-X.order||ee.label.localeCompare(X.label)).map(ee=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${P(ee.label)}</h3>
                <span>${ee.workOrders.length}</span>
              </div>
              <div class="work-list">${ee.workOrders.map(H).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function H(W){let Q=u(W),z=g().find(V=>V.id===W.procedure_template_id),Z=W.created_at?new Date(W.created_at):null,J=Z&&!Number.isNaN(Z.getTime())?Z.toLocaleDateString():"",ee=W.status==="completed",X=ee?"Completed":e(W.status),oe=V=>V==="completed"?"Complete":e(V);return`
        <article class="work-card status-card status-${W.status} ${W.id===l()?"selected":""}" data-id="${W.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${W.priority}">${W.priority}</span>
              <span class="chip">${P(n(W.type))}</span>
              <span class="chip ${W.status}">${X}</span>
              ${Q?`<span class="chip ${Q.className}">${Q.label}</span>`:""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${P(W.title)}</h3>
            <p>${P(O(W.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${C("asset")}${P(W.assets?.name||"General item / area")}</span>
            <span>${v(q(W)?"vendor":"mine")}${P(k(W))}</span>
            ${z?`<span>${C("procedure")}${P(z.name)}</span>`:""}
            <span>${v("due")}Due ${W.due_at||"unset"}</span>
            ${J?`<span>${v("created")}Created ${P(J)}</span>`:""}
            ${W.completed_at?`<span>${v("completed")}Completed ${new Date(W.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${T(W)}
          <div class="quick-actions work-card-actions">
            ${!ee&&L(W)?`<button class="assign-action" data-assign-me="${W.id}" type="button">Assign to me</button>`:""}
            ${!ee&&D()?ne(W):""}
          ${b.filter(V=>V!==W.status).slice(0,3).map(V=>`
            <button data-quick-status="${V}" data-id="${W.id}" type="button">${oe(V)}</button>
          `).join("")}
        </div>
      </article>
    `}function ne(W){return`
        <form class="card-assign-form" data-card-assign="${W.id}">
          <select name="assigned_to" aria-label="Assign ${P(W.title)}">
            <option value="">Unassigned</option>
            <option value="${A}" ${q(W)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([Q,z])=>`<option value="${Q}" ${!q(W)&&Q===W.assigned_to?"selected":""}>${P(z.full_name||t(Q))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function ae(W="",Q={}){let z=W||"",Z=Q.managerOptions??D(),J=Q.allowUnassigned!==!1,ee=Q.selfLabel||"Assign to me",X=[];return J&&X.push(`<option value="" ${z===""?"selected":""}>Unassigned</option>`),X.push(`<option value="${y().user.id}" ${z===y().user.id?"selected":""}>${ee}</option>`),Z&&(X.push(`<option value="${A}" ${z===A?"selected":""}>Outside vendor</option>`),X.push(...Object.entries(h()).filter(([oe])=>oe!==y().user.id).map(([oe,V])=>`<option value="${oe}" ${z===oe?"selected":""}>${P(V.full_name||t(oe))}</option>`))),X.join("")}function K(W){return q(W)?A:W?.assigned_to||""}function re(W,Q=""){let z=K(W);return W?.status==="completed"?`
          <label ${Q?`id="${Q}"`:""}>Completed by / assigned to
            <input value="${P(k(W))}" disabled>
            <input name="assigned_to" type="hidden" value="${P(z)}">
          </label>
        `:D()?`
          <label ${Q?`id="${Q}"`:""}>Assign to
            <select name="assigned_to">
              ${ae(z,{managerOptions:!0})}
            </select>
          </label>
        `:!W.assigned_to&&!q(W)?`
          <label ${Q?`id="${Q}"`:""}>Assign to
            <select name="assigned_to">
              ${ae("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${Q?`id="${Q}"`:""}>Assigned to
          <input value="${P(k(W))}" disabled>
          <input name="assigned_to" type="hidden" value="${P(z)}">
        </label>
      `}return{workOrdersPanelTitle:E,myWorkPanelTitle:w,workQueuePanelTitle:$,workQueuePanelSubtitle:S,renderWorkOrderFilterToolbar:N,renderWorkOrderCollection:G,renderWorkOrderCard:H,renderCardAssignmentControl:ne,renderAssignmentSelect:ae,renderWorkOrderAssignmentField:re}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:c},typeof at<"u"&&(at.exports={createWorkQueueDisplayHelpers:c})})()});var nn=B((sr,Ae)=>{(function(){function c({escapeHtml:e,statusLabel:n,relationshipIcon:t,getPartsUsedByWorkOrder:r,getPhotosByWorkOrder:s,teamMemberName:p}){function a(d){return`
        <article class="mini-work-order" data-mini-work-order="${d.id}">
          <strong>${e(d.title)}</strong>
          <span>${n(d.status)} - ${d.due_at||"no due date"}</span>
        </article>
      `}function o(d){let m=(r()[d.id]||[]).length,f=(s()[d.id]||[]).length,i=d.completed_at?new Date(d.completed_at).toLocaleDateString():"",u=d.completed_by?p(d.completed_by):"",g=!u&&d.assigned_to?p(d.assigned_to):"",l=u?` by ${e(u)}`:g?` - owner ${e(g)}`:"",h=d.resolution_summary||d.completion_notes||"";return`
        <article class="mini-work-order ${d.status==="completed"?"completed-history":""}" data-mini-work-order="${d.id}">
          <div class="chip-row">
            <span class="chip ${d.status}">${n(d.status)}</span>
            ${d.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${m?`<span class="relationship-chip parts">${t("parts")}<span>${m}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${t("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(d.title)}</strong>
          <span>${i?`Completed ${i}${l}`:`Due ${d.due_at||"unset"}`}</span>
          ${d.failure_cause?`<p><b>Finding:</b> ${e(d.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:a,renderAssetMiniWorkOrder:o}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:c},typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMiniWorkOrderDisplayHelpers:c})})()});var rn=B((cr,ot)=>{(function(){function c({escapeHtml:e,money:n,isLowStockPart:t,matchesActiveLocation:r,getParts:s,getPartDocumentsByPartId:p,getPartDocumentsReady:a,getPendingDeletePartId:o,getShowPartSourceManager:d,getPartCostsReady:m,getPartInventoryFilter:f,getPartSearchQuery:i,partUsageRows:u,canDeleteParts:g,canEditOperationalRecords:l=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:b}){let _=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],A=_.reduce((w,[$,S])=>(w[$]=S.replace(/s$/,""),w),{});function P(w){return w.document_type?w.document_type:String(w.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(w.file_name||"")?"invoice":/receipt/i.test(w.file_name||"")?"receipt":/schematic|diagram/i.test(w.file_name||"")?"schematic":/print|drawing/i.test(w.file_name||"")?"part_print":/manual/i.test(w.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(w.file_name||"")?"spec_sheet":"other"}function O(){return _.map(([w,$])=>`
        <option value="${w}">${e(A[w]||$)}</option>
      `).join("")}function C(w){let $=P(w),S=String(w.content_type||"").startsWith("image/"),R=A[$]||"File",x=w.created_at?new Date(w.created_at).toLocaleString():"Uploaded",F=w.file_size_bytes?`${Math.round(Number(w.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${S?"image-file":""}">
          ${S&&w.signedUrl?`<a class="part-document-thumb" href="${e(w.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(w.signedUrl)}" alt="${e(w.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(R)}</span>
              ${F?`<span class="chip">${e(F)}</span>`:""}
            </div>
            <strong>${e(w.file_name)}</strong>
            <span>${e(x)}</span>
            ${w.original_file_name&&w.original_file_name!==w.file_name?`<small>Original: ${e(w.original_file_name)}</small>`:""}
            ${w.signedUrl?`<a href="${e(w.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function v([w,$],S){let R=S.filter(x=>P(x)===w);return R.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e($)}</h4>
            <span>${R.length}</span>
          </div>
          <div class="part-document-grid">
            ${R.map(C).join("")}
          </div>
        </section>
      `:""}function q(w){let $=w.reduce((R,x)=>{let F=P(x);return R[F]=(R[F]||0)+1,R},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(R=>$[R]).map(R=>`<span class="chip">${$[R]} ${e(A[R]||"file")}${$[R]===1?"":"s"}</span>`).join("")}function k(w){let $=Number(w.quantity_on_hand)||0,S=Number(w.reorder_point)||0,R=Number(w.unit_cost)||0,x=$<=S,F=Math.max(0,S-$);return`
        <article class="part-card part-tile ${x?"low-stock":""}" data-open-part="${w.id}" tabindex="0" role="button" aria-label="Open ${e(w.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${w.sku?`<span class="chip">${e(w.sku)}</span>`:""}
              ${w.supplier_name?`<span class="chip part-source-chip">${e(w.supplier_name)}</span>`:""}
              ${w.machine_note?`<span class="chip">${e(w.machine_note)}</span>`:""}
              ${x?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(w.name)}</h3>
            <div class="part-card-meta">
              <span>${$} on hand</span>
              <span>reorder at ${S}</span>
              <span>${m()?`${n(R)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${x&&S>0?`<small>Need ${F} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function T(){let w=s().filter(r),$=w.filter(t).length,S=f();return[["All Parts",w.length,"all"],["Low Stock",$,"low"]].map(([R,x,F])=>`
        <button class="parts-health ${F==="low"&&x?"attention":""} ${S===F?"active":""}" data-part-inventory-filter="${F}" type="button">
          <span>${R}</span>
          <strong>${x}</strong>
        </button>
      `).join("")}function L(w="default"){return`
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
              <option value="default" ${w==="default"?"selected":""}>Default</option>
              <option value="source" ${w==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function D(w){let $=Number(w.quantity_on_hand)||0,S=Number(w.reorder_point)||0,R=Number(w.unit_cost)||0,x=p()[w.id]||[],F=q(x),N=l();return`
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
                <span class="chip ${$<=S?"overdue":"open"}">${$<=S?"low stock":"stocked"}</span>
              </div>
              <h3>${e(w.name)}</h3>
              <p>${$} on hand - reorder at ${S}</p>
              ${F?`<div class="chip-row part-file-summary">${F}</div>`:""}
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
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${$}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${S}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${R}"></label>
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
              <span>${x.length} file${x.length===1?"":"s"}</span>
            </div>
            ${N?`<form class="part-document-form" data-part-document="${w.id}">
              <label>File type<select name="document_type">${O()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${w.id}">${a()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${a()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${x.length?_.map(U=>v(U,x)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${N?E(w):""}
        </section>
      `}function E(w){let $=u(w.id).length,S=p()[w.id]||[],R=o()===w.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${$?`This part has ${$} usage record${$===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${S.length?` and ${S.length} filed receipt/invoice record${S.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${$?`
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
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:k,renderPartsHealth:T,renderPartSearch:L,renderPartDetail:D,renderPartDangerZone:E}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:c},typeof ot<"u"&&(ot.exports={createPartsDisplayHelpers:c})})()});var an=B((lr,it)=>{(function(){function c({canManageTeam:e,renderAppIssueReport:n,escapeHtml:t,getActiveSection:r,getAppIssueReportsReady:s,getAppIssueReports:p}){function a(){let m=s();return`
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
      `}function o(m){let f={open:0,reviewing:1,resolved:2};return[...m].sort((i,u)=>{let g=(f[i.status||"open"]??1)-(f[u.status||"open"]??1);return g||new Date(u.created_at||0)-new Date(i.created_at||0)})}function d(){if(!e())return"";let m=s(),f=p(),i=o(f);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${m?`${f.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${m?`
            <div class="issue-report-list">
              ${i.map(n).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:a,renderAppIssueReportsPanel:d,sortedAppIssueReports:o}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:c},typeof it<"u"&&(it.exports={createAppIssuePanelDisplayHelpers:c})})()});var on=B((ur,st)=>{(function(){function c(e){let n=e.escapeHtml,t=e.getDueState,r=e.procedureDeleteBlockerMessage,s=e.canDeleteOperationalRecords,p=e.canEditOperationalRecords||(()=>!0);function a(){return e.getPreventiveSchedules().filter(f=>e.matchesActiveLocation(f)&&e.matchesSearch([f.title,f.frequency,f.next_due_at,f.assets?.name]))}function o(){return e.getProcedureTemplates().filter(f=>e.matchesSearch([f.name,f.description,...(f.procedure_steps||[]).map(i=>i.prompt)]))}function d(f){let i=t({due_at:f.next_due_at,status:"open"}),u=e.getPendingDeleteScheduleId()===f.id,g=p();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${n(f.frequency)}</span>
              ${i?`<span class="chip ${i.className}">${i.label}</span>`:""}
            </div>
            <h3>${n(f.title)}</h3>
            <p>${n(f.assets?.name||"No equipment")} - Next due ${f.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${f.id}" type="button">Generate Work</button>
            ${s()?u?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${n(f.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${n(f.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function m(f){let i=e.getWorkOrders().filter(y=>y.procedure_template_id===f.id).length,u=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===f.id).length,g=r({workOrders:i,schedules:u}),l=e.getPendingDeleteProcedureId()===f.id,h=p();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${f.procedure_steps?.length||0} steps</span>
              <span class="chip">${i} linked work orders</span>
              ${u?`<span class="chip">${u} PM schedules</span>`:""}
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
              `:l?`
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
      `}return{filteredPreventiveSchedules:a,filteredProcedureTemplates:o,renderPreventiveSchedule:d,renderProcedureTemplate:m}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:c},typeof st<"u"&&(st.exports={createMaintenanceListDisplayHelpers:c})})()});var sn=B((dr,ct)=>{(function(){function c(e={}){let{renderMissingWorkOrderDetail:n,partUsageUnitCost:t,buildActivityFeed:r,checklistProgress:s,requiredChecklistProgress:p,escapeHtml:a,cleanWorkOrderDescription:o,renderRelationshipChips:d,renderWorkOrderCommandSummary:m,renderWorkOrderRecommendation:f,statusLabel:i,normalizeWorkOrderType:u=w=>String(w||"corrective"),workOrderTypeLabel:g=w=>String(w||"corrective").replace(/\b\w/g,$=>$.toUpperCase()),hasCompletedSafetyDeviceCheck:l,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:b,renderWorkOrderAssignmentField:_,requiresSafetyDeviceCheck:A,renderWorkOrderMessages:P,renderProcedureOptions:O,money:C,photoMetaText:v,renderActivityItem:q,canDeleteWorkOrders:k,canEditOperationalRecords:T=()=>!0}=e;function L(w,$){let S=e.getStepResultsByWorkOrder()[w.id]?.[$.id],R=S?.value||"",x=`data-step-result="${$.id}" data-work-order-id="${w.id}"`,F=`<input ${x} value="${a(R)}" placeholder="Result">`;return $.response_type==="checkbox"&&(F=`<label class="check-row"><input ${x} type="checkbox" ${R==="checked"?"checked":""}> Done</label>`),$.response_type==="pass_fail"&&(F=`
          <select ${x}>
            <option value="">Not checked</option>
            <option value="pass" ${R==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${R==="fail"?"selected":""}>Fail</option>
          </select>
        `),$.response_type==="number"&&(F=`<input ${x} type="number" value="${a(R)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${$.position}. ${a($.prompt)} ${$.required?'<small class="required-mark">Required</small>':""}</span>
          ${F}
          ${S?.completed_at?`<small>Recorded ${new Date(S.completed_at).toLocaleString()}</small>`:""}
        </div>
      `}function D(w){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===w.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${a(w.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${w.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${w.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function E(){let w=e.getActiveWorkOrderId(),S=e.getWorkOrders().find(I=>I.id===w);if(!S)return n();let R=e.getCommentsByWorkOrder(),x=e.getPhotosByWorkOrder(),F=e.getEventsByWorkOrder(),N=e.getPartsUsedByWorkOrder(),U=e.getProcedureTemplates(),G=e.getWorkOrderActionWarningId(),H=e.getWorkOrderActionWarning(),ne=e.getParts(),ae=e.getProfilesByUserId(),K=e.getCommentsError(),re=e.STATUS_OPTIONS||[],W=e.TYPE_OPTIONS||[],Q=R[S.id]||[],z=x[S.id]||[],Z=F[S.id]||[],J=N[S.id]||[],ee=J.reduce((I,ue)=>I+(Number(ue.quantity_used)||0)*t(ue),0),X=J.reduce((I,ue)=>I+(Number(ue.quantity_used)||0),0),oe=r(Q,z,Z,J),V=U.find(I=>I.id===S.procedure_template_id),ce=V?s(S,V):null,le=V?p(S,V):null,te=T();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${S.priority}">${S.priority}</span>
            <span class="chip">${a(g(S.type))}</span>
            <span class="chip ${S.status}">${i(S.status)}</span>
          </div>
          <h2>${a(S.title)}</h2>
          <p>${a(o(S.description)||"No description.")}</p>
          ${d(S)}
          ${S.completed_at?`<p class="completion-note">Completed ${new Date(S.completed_at).toLocaleString()} \xC2\xB7 ${S.actual_minutes||0} min</p>`:""}
          ${S.asset_id&&l(S)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${S.completion_notes?`<p>${a(S.completion_notes)}</p>`:""}
        </div>

        ${m(S)}
        ${f(S)}

        ${S.completed_at&&(S.failure_cause||S.resolution_summary||S.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${S.failure_cause?`<article><span>Cause</span><strong>${a(S.failure_cause)}</strong></article>`:""}
            ${S.resolution_summary?`<article><span>Resolution</span><strong>${a(S.resolution_summary)}</strong></article>`:""}
            ${S.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${te?`<label>Status
          <select id="status-select">
            ${re.map(I=>`<option value="${I}" ${I===S.status?"selected":""}>${i(I)}</option>`).join("")}
          </select>
        </label>`:""}

        ${te?`<div class="quick-actions detail-quick-actions">
          ${h(S)?`<button class="assign-action" data-assign-me="${S.id}" type="button">${S.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${re.filter(I=>I!==S.status).map(I=>`
            <button data-quick-status="${I}" data-id="${S.id}" type="button">${i(I)}</button>
          `).join("")}
        </div>`:""}
        ${G===S.id&&H?`<p class="error-text action-warning">${a(H)}</p>`:""}

        ${te?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
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
            <p class="error-text" data-asset-location-warning>${a(b(S.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${a(S.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${a(S.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${re.map(I=>`<option value="${I}" ${I===S.status?"selected":""}>${i(I)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(I=>`<option value="${I}" ${I===S.priority?"selected":""}>${I}</option>`).join("")}
              </select>
            </label>
            ${_(S,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${O(S.procedure_template_id||"")}
              </select>
            </label>
            <label class="check-row"><input name="machine_down" type="checkbox" ${S.assets?.status==="offline"?"checked":""}> Machine is down</label>
            ${A(S)?`<label class="check-row safety-check-row" id="quick-update-safety-field"><input name="safety_devices_checked" type="checkbox" ${S.safety_devices_checked?"checked":""}> Safety devices identified before completion: E-stops, sensors, guards, and interlocks</label>`:'<div class="safety-check-row safety-pending-note" id="quick-update-safety-field"><strong>Safety devices</strong><span>No machine / equipment selected, so no equipment safety check is required.</span></div>'}
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

        ${P(S)}

        ${te?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${a(S.title)}"></label>
          <label>Description<textarea name="description" rows="3">${a(o(S.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${a(S.due_at||"")}">
              <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
            </span>
          </label>
          <label>Priority
            <select name="priority">
              ${["low","medium","high","critical"].map(I=>`<option value="${I}" ${I===S.priority?"selected":""}>${I}</option>`).join("")}
            </select>
          </label>
          <label>Work type
            <select name="type">
              ${W.map(I=>`<option value="${I}" ${I===u(S.type)?"selected":""}>${g(I)}</option>`).join("")}
            </select>
          </label>
          ${_(S)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${O(S.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${a(S.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${a(S.resolution_summary||"")}</textarea></label>
          <label class="check-row"><input name="follow_up_needed" type="checkbox" ${S.follow_up_needed?"checked":""}> Follow-up needed</label>
          ${A(S)?`
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

        ${V?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${a(V.name)}</h3>
              <span>${ce.done} of ${ce.total} complete \xC2\xB7 required ${le.done}/${le.total}</span>
            </div>
            <div class="checklist-list">
              ${V.procedure_steps.map(I=>te?L(S,I):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${I.position}. ${a(I.prompt)} ${I.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${a(e.getStepResultsByWorkOrder()[S.id]?.[I.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${te&&S.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${le?.total?`<p class="${le.done===le.total?"completion-note":"warning-text"}">Required checklist: ${le.done}/${le.total}</p>`:""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${S.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${A(S)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${l(S)?"checked":""}>
                Safety devices identified: E-stops, sensors, guards, and interlocks
              </label>
            `:""}
            <p class="error-text" id="completion-error"></p>
            <button class="primary-button" type="submit">Complete Work Order</button>
          </form>
          </details>
        `:""}

        <details class="work-detail-section relationship-detail parts" id="work-order-parts-target">
          <summary>Parts Used</summary>
        ${te?`<form class="form-grid relationship-detail parts" id="parts-used-form">
          <h3>Parts Used</h3>
          <label>Part
            <select name="part_id" required>
              <option value="">Select part</option>
              ${ne.map(I=>`<option value="${I.id}">${a(I.name)} (${I.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${J.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${C(ee)}</span></article>`:""}
          ${J.map(I=>`
            <article class="relationship-detail parts">
              <strong>${a(I.parts?.name||"Part")}</strong>
              <span>${I.quantity_used} used - ${C((Number(I.quantity_used)||0)*t(I))}</span>
              <small>${I.created_at?new Date(I.created_at).toLocaleString():"time unavailable"} &middot; ${a(ae[I.created_by]?.full_name||"Team member")}</small>
            </article>
          `).join("")||'<p class="muted">No parts used yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section relationship-detail photo" id="work-order-photos-target">
          <summary>Photos</summary>
        ${te?`<form class="form-grid relationship-detail photo" id="photo-form">
          <label>Upload photo<input name="photo" type="file" accept="image/*"><small>Images only. PDF quotes/documents are attached from equipment or parts. Photos are resized to 768px.</small></label>
          <p class="error-text" id="photo-error"></p>
          <button class="secondary-button" type="submit">Upload Photo</button>
        </form>`:""}

        <div>
          <h3>Photos</h3>
          <div class="photo-list">
            ${z.map(I=>`
              <article class="relationship-detail photo">
                ${I.signedUrl&&I.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${a(I.signedUrl)}" alt="${a(I.file_name)}">`:""}
                <strong>${a(I.file_name)}</strong>
                <span>${v(I)}</span>
                ${I.signedUrl?`<a href="${a(I.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${te?`<button class="text-button danger-link" data-delete-work-order-photo="${a(I.id||"")}" data-work-order-photo-path="${a(I.storage_path||"")}" type="button">Delete Photo</button>`:""}
              </article>
            `).join("")||'<p class="muted">No photos uploaded yet.</p>'}
          </div>
        </div>
        </details>

        <details class="work-detail-section relationship-detail comment" id="work-order-comments-target">
          <summary>Comments</summary>
        ${te?`<form class="form-grid relationship-detail comment" id="comment-form">
          <label>Comment<textarea name="body" rows="3" required></textarea></label>
          <p class="error-text" id="comment-error"></p>
          <button class="primary-button" type="submit">Add Comment</button>
        </form>`:""}
        <div class="comment-list">
          ${Q.map(I=>`
            <article class="relationship-detail comment">
              <strong>${a(ae[I.author_id]?.full_name||"Team member")}</strong>
              <span>${I.created_at?new Date(I.created_at).toLocaleString():""}</span>
              <p>${a(I.body)}</p>
            </article>
          `).join("")||'<p class="muted">No comments yet.</p>'}
        </div>
        </details>

        <details class="work-detail-section" id="work-order-history-target">
          <summary>History</summary>
        <div class="timeline">
          ${K?`<p class="error-text">${a(K)}</p>`:""}
          ${oe.map(q).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${te&&k()?D(S):""}
      </div>
    `}return{renderWorkOrderDetail:E}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:c},typeof ct<"u"&&(ct.exports={createWorkOrderDetailDisplayHelpers:c})})()});var cn=B((pr,lt)=>{(function(){function c(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:c},typeof lt<"u"&&(lt.exports={createEquipmentStructureGuideDisplayHelpers:c})})()});var ln=B((mr,ut)=>{(function(){function c(e={}){let{renderCreateWorkOrder:n,parentAssetFor:t,childAssetsFor:r,escapeHtml:s,assetTypeLabel:p,renderParentAssetOptions:a,renderLocationOptions:o,renderAssetAreaOptions:d,assetStatusLabel:m,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:i,canDeleteEquipment:u,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:l,renderProcedureOptions:h}=e;function y(){let v=new Date;return new Date(v.getTime()-v.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function b(v,q,k){let T=q.some(w=>w.event_type==="created"),L=v.created_at&&!T?[{id:`${v.id}-created`,event_type:"created",summary:`${p(v.asset_type)} created.`,actor_id:v.created_by||"",created_at:v.created_at}]:[];return{equipmentHistory:[...q,...L].sort((w,$)=>new Date($.created_at||0)-new Date(w.created_at||0)),historyActorLabel:w=>w.actor_id&&k[w.actor_id]?.full_name?k[w.actor_id].full_name:w.actor_id?`User ${String(w.actor_id).slice(0,8)}`:w.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function _(v,q){return v.map(k=>`
        <article>
          <strong>${s(String(k.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${k.created_at?new Date(k.created_at).toLocaleString():"time unavailable"} &middot; ${s(q(k))}</span>
          <p>${s(k.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function A(){let v=e.getAssets(),q=e.getActiveAssetId(),k=v.find(U=>U.id===q);if(!k)return n();let T=e.getAssetEventsReady?.()!==!1,L=e.getProfilesByUserId?.()||{},D=(e.getAssetEventsByAssetId?.()[k.id]||[]).sort((U,G)=>new Date(G.created_at||0)-new Date(U.created_at||0)),{equipmentHistory:E,historyActorLabel:w}=b(k,D,L),$=e.LIST_ITEMS_PER_PAGE||12,S=Math.max(1,Math.ceil(E.length/$)),R=Math.min(Math.max(1,e.getAssetRelationshipPage?.(k.id,"asset-history")||1),S),x=E.length?(R-1)*$+1:0,F=Math.min(E.length,R*$),N=E.slice((R-1)*$,R*$);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${s(k.name)} - ${E.length} event${E.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${s(k.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${T?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${_(N,w)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${E.length>$?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${s(k.id)}" type="button" ${R<=1?"disabled":""}>Previous</button>
                <span>Showing ${x}-${F} of ${E.length} - Page ${R} of ${S}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${s(k.id)}" type="button" ${R>=S?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function P(){let v=e.getAssets(),q=e.getActiveAssetId(),k=v.find(M=>M.id===q);if(!k)return n();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(k.id);let T=e.getWorkOrders(),L=e.getPreventiveSchedules(),D=e.getParts(),E=e.getAssetParts(),w=e.getAssetPartsReady(),$=e.getAssetDocumentsByAssetId?.()[k.id]||[],S=e.getAssetDocumentsReady?.()!==!1,R=e.getAssetEventsReady?.()!==!1,x=e.getProfilesByUserId?.()||{},F=e.getPartsUsedByWorkOrder(),N=e.getLocations(),U=e.getActiveLocationId(),G=e.ASSET_TYPE_OPTIONS||[],H=t(k),ne=r(k.id),ae=T.filter(M=>M.asset_id===k.id),K=ae.filter(M=>M.status!=="completed").sort((M,ie)=>new Date(ie.created_at||0)-new Date(M.created_at||0)),re=ae.filter(M=>M.status==="completed").sort((M,ie)=>new Date(ie.completed_at||ie.created_at||0)-new Date(M.completed_at||M.created_at||0)),W=L.filter(M=>M.asset_id===k.id),Q=Object.values(F).flat().filter(M=>ae.some(ie=>ie.id===M.work_order_id)),z=E.filter(M=>M.asset_id===k.id),Z=new Set(z.map(M=>M.part_id)),J=D.filter(M=>!Z.has(M.id)),ee=(e.getAssetEventsByAssetId?.()[k.id]||[]).sort((M,ie)=>new Date(ie.created_at||0)-new Date(M.created_at||0)),{equipmentHistory:X}=b(k,ee,x),oe=e.LIST_ITEMS_PER_PAGE||12,V=M=>e.getAssetRelationshipOpen?.(k.id,M)||!1,ce=(M,ie)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(k.id,M)||1),Math.max(1,Math.ceil(ie/oe))),le=(M,ie)=>{let fe=ce(ie,M.length);return M.slice((fe-1)*oe,fe*oe)},te=(M,ie)=>{if(ie<=oe)return"";let fe=ce(M,ie),he=Math.max(1,Math.ceil(ie/oe)),ye=(fe-1)*oe+1,se=Math.min(ie,fe*oe);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${s(k.id)}" data-asset-relation-section="${s(M)}" type="button" ${fe<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${se} of ${ie} - Page ${fe} of ${he}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${s(k.id)}" data-asset-relation-section="${s(M)}" type="button" ${fe>=he?"disabled":""}>Next</button>
          </div>
        `},I=M=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${s(M)}" data-asset-id="${s(k.id)}" ${V(M)?"open":""}`,ue=N.find(M=>M.id===k.location_id)?.name||k.location||"No location set",ge=H?H.name:"Top level equipment",me=k.status==="offline"?"status-blocked":k.status==="degraded"?"status-open":k.status==="watch"?"status-in_progress":"status-completed",pe=k.status==="degraded"&&K.length===0,Y=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${k.status}">${s(m(k.status))}</span>
              <span class="chip">${s(p(k.asset_type))}</span>
              ${k.asset_code?`<span class="chip">${s(k.asset_code)}</span>`:""}
              ${k.manufacturer?`<span class="chip">${s(k.manufacturer)}</span>`:""}
              ${k.model?`<span class="chip">${s(k.model)}</span>`:""}
              ${k.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${s(k.name)}</h2>
            <p>${s(k.location||"No location set")}</p>
            ${H?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${s(H.id)}" type="button">${s(H.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${me}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${s(m(k.status))}</strong>
              <small>${k.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${s(ue)}</strong>
              <small>${k.location?s(k.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${s(ge)}</strong>
              <small>${H?"Linked under parent equipment":"Primary / standalone item"}</small>
            </button>
            <button class="command-card command-equipment ${ne.length?"":"empty"}" data-jump-work-section="asset-linked-equipment-target" type="button">
              <span>Sub Equipment</span>
              <strong>${ne.length}</strong>
              <small>${ne.length?"Linked child items":"No linked child equipment"}</small>
            </button>
            <button class="command-card command-parts ${z.length?"":"empty"}" data-jump-work-section="asset-linked-parts-target" type="button">
              <span>Parts</span>
              <strong>${z.length}</strong>
              <small>${z.length?"Recommended/common parts linked":"No linked parts yet"}</small>
            </button>
            <button class="command-card status-open ${K.length?"":"empty"}" data-jump-work-section="asset-open-work-target" type="button">
              <span>Open Work</span>
              <strong>${K.length}</strong>
              <small>${K.length?"Active work tied to this equipment":"No open work"}</small>
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

          ${pe&&Y?`
            <section class="equipment-status-nudge degraded" aria-label="Degraded equipment follow-up">
              <strong>Degraded needs a reason</strong>
              <p>This equipment is marked degraded but has no open work tied to it. Create or attach a work order so the condition is traceable.</p>
              <button class="secondary-button" data-quick-fix-asset="${s(k.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${l?l():""}

          ${Y?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${k.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${$.length} file${$.length===1?"":"s"}</span>
            </div>
            ${Y?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${s(k.id)}">
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
              <p class="error-text" data-asset-document-error="${s(k.id)}">${S?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${S?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${$.map(M=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(M.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${s(M.signedUrl)}" alt="${s(M.original_file_name||M.file_name||k.name)}">`:`<strong>${s(C(M.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${s(C(M.document_type))}</strong>
                      <span>${s(M.original_file_name||M.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(M.content_type||"").startsWith("image/")&&M.signedUrl?`<img src="${s(M.signedUrl)}" alt="${s(M.original_file_name||M.file_name||k.name)}">`:`<div class="asset-file-document-preview">${s(C(M.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${s(M.content_type||"file")}</span>
                      <a class="secondary-button" href="${s(M.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${Y?`<button class="text-button danger-link" data-delete-asset-document="${s(M.id)}" data-asset-document-path="${s(M.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${Y?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${s(k.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${s(k.asset_code||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${s(k.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${s(k.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${G.map(M=>`<option value="${M}" ${M===(k.asset_type||"machine")?"selected":""}>${p(M)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${a(k.parent_asset_id||"",k.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${N.length?"":"disabled"}>
                ${o(k.location_id||U)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${d(k.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(M=>`<option value="${M}" ${M===k.status?"selected":""}>${m(M)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${k.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${ne.map(M=>`
                <article class="mini-work-order" data-open-asset="${s(M.id)}">
                  <strong>${s(M.name)}</strong>
                  <span>${s(p(M.asset_type))} - ${s(m(M.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${I("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${K.length}</span></summary>
            <div class="mini-list">
              ${V("open-work")?le(K,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${V("open-work")?te("open-work",K.length):""}
          </details>

          <details ${I("completed-history")}>
            <summary>Completed History <span>${re.length}</span></summary>
            <div class="mini-list">
              ${V("completed-history")?le(re,"completed-history").map(f).join("")||'<p class="muted">No completed work yet.</p>':'<p class="muted">Open this section to load completed work history for this equipment.</p>'}
            </div>
            ${V("completed-history")?te("completed-history",re.length):""}
          </details>

          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Equipment History</h3>
              <div class="panel-header-actions">
                <span>${X.length} event${X.length===1?"":"s"}</span>
                <button class="secondary-button asset-action-button" data-open-asset-history="${s(k.id)}" type="button">View Equipment History</button>
              </div>
            </div>
            ${R?'<p class="muted">Review who created or changed this equipment on its own history screen.</p>':'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
          </section>

          <section class="asset-relationship-panel relationship-detail procedure">
            <div class="panel-header compact">
              <h3>PM Schedules</h3>
              <div class="panel-header-actions">
                <span>${W.length} schedule${W.length===1?"":"s"}</span>
                ${Y?'<button class="secondary-button asset-action-button" data-section="pm" type="button">Go to PM</button>':""}
              </div>
            </div>
            ${Y?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${s(k.id)}">
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
              ${W.map(M=>`<article><strong>${s(M.title)}</strong><span>${M.frequency} - next due ${M.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${s(k.id)}" ${V("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${z.length}</span></summary>
            <div class="panel-header compact">
              ${Y?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${V("linked-parts")&&w?`
              ${Y?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${s(k.id)}">
                <label>Part
                  <select name="part_id" ${J.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${J.map(M=>`<option value="${s(M.id)}">${s(M.name)}${M.sku?` - ${s(M.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${J.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${s(k.id)}"></p>
              <div class="mini-list">
                ${le(z,"linked-parts").map(M=>`<article>
                  <strong>${s(M.parts?.name||"Part")}</strong>
                  <span>${s(M.parts?.sku||"No SKU")} - recommended qty ${s(M.quantity_recommended||1)}${M.note?` - ${s(M.note)}`:""}</span>
                  ${Y?`<button class="text-button danger-link" data-remove-asset-part="${s(M.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${te("linked-parts",z.length)}
            `:w?'<p class="muted">Open this section to review or attach linked parts for this equipment.</p>':'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${s(k.id)}" ${V("parts-used")?"open":""}>
            <summary>Parts Used History <span>${Q.length}</span></summary>
            <div class="mini-list">
              ${V("parts-used")?le(Q,"parts-used").map(M=>`<article><strong>${s(M.parts?.name||"Part")}</strong><span>${M.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${V("parts-used")?te("parts-used",Q.length):""}
          </details>

          ${Y?O(k):""}
        </div>
      `}function O(v){let q=e.getWorkOrders(),k=e.getPreventiveSchedules(),T=e.getAssets(),L=e.getActiveAssetId(),D=q.filter(x=>x.asset_id===v.id).length,E=k.filter(x=>x.asset_id===v.id).length,w=T.filter(x=>x.parent_asset_id===v.id).length,$=e.getMaintenanceRequests().filter(x=>x.asset_id===v.id).length,S=i({workOrders:D,children:w,schedules:E,requests:$}),R=e.getPendingDeleteAssetId()===L;return u()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${S||`This permanently removes "${s(v.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${S?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:R?`
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
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function C(v){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[v]||"File"}return{renderAssetDetail:P,renderAssetHistoryScreen:A}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:c},typeof ut<"u"&&(ut.exports={createAssetDetailDisplayHelpers:c})})()});var un=B((fr,dt)=>{(function(){function c(e={}){let{filteredMessageThreads:n,totalUnreadMessages:t,teamMemberName:r,escapeHtml:s,messageComposerScopeNote:p,recentMessageLinkWorkOrders:a,statusLabel:o,renderMessageThreadButton:d,messageThreadScopeLabel:m,renderMessageList:f}=e,i=e.canEditOperationalRecords||(()=>!0);function u(l){let h=String(l||"?").trim().split(/\s+/).filter(Boolean);return(h.length?h.map(y=>y[0]).join(""):"?").slice(0,2).toUpperCase()}function g(){if(!e.getMessagesReady())return'<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>';let h=e.getMessageThreads(),y=e.getActiveMessageThreadId(),b=e.getMessagesByThreadId(),_=e.getWorkOrders(),A=e.getMessageComposerWorkOrderId(),P=e.getMessageComposerOpen(),O=e.getCompanyMembers(),C=e.getSession(),v=e.getMessageWorkOrderLinksReady(),q=e.getMessageSearchQuery(),k=e.getMessageThreadFilter(),T=O.filter(U=>U.user_id!==C.user.id),L=i(),D=h.find(U=>U.id===y)||h[0],E=D?b[D.id]||[]:[],w=n(),$=e.getMessageThreadsPage(),S=Math.max(1,Math.ceil(w.length/e.LIST_ITEMS_PER_PAGE)),R=Math.min(Math.max($,1),S),x=w.slice((R-1)*e.LIST_ITEMS_PER_PAGE,R*e.LIST_ITEMS_PER_PAGE),F=_.find(U=>U.id===A),N=U=>{let G=r(U.user_id);return`
          <button class="message-person-card" data-message-person="${s(U.user_id)}" title="Message ${s(G)}" type="button">
            <span class="message-person-avatar" aria-hidden="true">${s(u(G))}</span>
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
                ${T.map(N).join("")||'<span class="muted">No teammates added yet.</span>'}
              </div>
              ${L?`<form class="message-thread-form" id="message-thread-form">
                <details ${P||F?"open":""}>
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
                        ${O.filter(U=>U.user_id!==C.user.id).map(U=>`<option value="${U.user_id}">${s(r(U.user_id))}</option>`).join("")||'<option value="">No teammates yet</option>'}
                      </select>
                    </label>
                    <div class="message-scope-note" id="message-scope-note">${p("location")}</div>
                    <label>Subject<input name="title" required placeholder="Thread subject" value="${F?`Work order: ${s(F.title)}`:""}"></label>
                    ${F?`
                      <input name="work_order_id" type="hidden" value="${F.id}">
                      <div class="message-linked-draft">
                        <span>Linked work order</span>
                        <strong>${s(F.title)}</strong>
                        <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                      </div>
                    `:`
                      <label>Recent work order
                        <select name="work_order_id" ${v?"":"disabled"}>
                          <option value="">No work order</option>
                          ${a().map(U=>`<option value="${U.id}">${s(U.title)} - ${o(U.status)}</option>`).join("")}
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
                <input id="message-search" type="search" value="${s(q)}" placeholder="Search messages">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[["all","All"],["unread","Unread"],["company","Company"],["location","Location"],["direct","Direct"]].map(([U,G])=>`<button class="${k===U?"active":""}" data-message-filter="${U}" type="button">${G}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${x.map(d).join("")||'<p class="muted">No threads match this filter.</p>'}
              </div>
              ${e.renderListPagination("messages",w.length,R,S)}
            </aside>
            <section class="message-thread-detail">
              ${D?`
                <div class="message-chat-header">
                  <div>
                    <h3>${s(D.title)}</h3>
                    <p class="muted">${m(D)}</p>
                  </div>
                  <div class="message-header-actions">
                    ${D.work_order_id?`<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${D.work_order_id}" type="button">Open Work Order</button>`:""}
                    <span class="chip comment">${E.length} message${E.length===1?"":"s"}</span>
                    ${L?`<button class="text-button danger-link" data-delete-message-thread="${s(D.id)}" type="button">Delete Thread</button>`:""}
                  </div>
                </div>
                <div class="message-list">
                  ${f(E)}
                </div>
                ${L?`<form class="message-reply-form" id="message-reply-form" data-thread-id="${D.id}">
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
      `}return{renderMessageCenter:g}}window.MaintainOpsMessageCenterDisplay={createMessageCenterDisplayHelpers:c},typeof dt<"u"&&(dt.exports={createMessageCenterDisplayHelpers:c})})()});var dn=B((gr,pt)=>{(function(){function c(e={}){let{STATUS_OPTIONS:n=[],TYPE_OPTIONS:t=[],renderAssetOptions:r,statusLabel:s,workOrderTypeLabel:p=i=>String(i||"corrective").replace(/\b\w/g,u=>u.toUpperCase()),renderAssignmentSelect:a,renderProcedureOptions:o,escapeHtml:d}=e;function m(){let i=new Date;return new Date(i.getTime()-i.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let i=e.getParts();return`
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
                  ${t.map(u=>`<option value="${u}">${p(u)}</option>`).join("")}
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
                  ${i.map(u=>`<option value="${u.id}">${d(u.name)} (${u.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:c},typeof pt<"u"&&(pt.exports={createCreateWorkOrderDisplayHelpers:c})})()});var pn=B((hr,mt)=>{(function(){function c(e={}){let{TYPE_OPTIONS:n=[],renderAssetOptions:t,assetLocationRoutingMessage:r,escapeHtml:s,renderAssignmentSelect:p,renderProcedureOptions:a,assetStatusLabel:o,workOrderTypeLabel:d=i=>String(i||"corrective").replace(/\b\w/g,u=>u.toUpperCase())}=e;function m(){let i=new Date;return new Date(i.getTime()-i.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let i=e.getQuickFixAssetId(),u=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),l=e.getSession(),h=e.getParts(),y=i||"",b=g.find(_=>_.id===u);return`
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
                  ${["medium","high","critical","low"].map(_=>`<option value="${_}">${_}</option>`).join("")}
                </select>
              </label>
              <label>Work type
                <select name="type">
                  ${n.map(_=>`<option value="${_}" ${_==="corrective"?"selected":""}>${d(_)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${p(l.user.id,{selfLabel:"Assign to me"})}
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
                  ${["running","watch","degraded","offline"].map(_=>`<option value="${_}">${o(_)}</option>`).join("")}
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
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:c},typeof mt<"u"&&(mt.exports={createQuickFixDisplayHelpers:c})})()});var mn=B((yr,ft)=>{(function(){function c(e={}){let n=e.escapeHtml;function t(f){return`
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
      `}function r(f){return`
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
      `}function s(f,i=""){let u=f==="signup";return`
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
            <p class="error-text" id="auth-error">${n(i)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${u?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${u?"I already have an account":"Create an account"}</button>
            ${u?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
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
      `}function a(f){return`
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
      `}function d(f={}){let i=!!f.ready,u=f.initialError||"";return`
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
            <p class="error-text" id="auth-error">${n(u)}</p>
            <p class="muted auth-status" id="auth-status">${i?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${i?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function m(f=""){return`
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
      `}return{workspaceLoading:t,workspaceLoadError:r,authForm:s,authCallback:p,authCallbackError:a,passwordResetRequest:o,passwordRecovery:d,companyCreate:m}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:c},typeof ft<"u"&&(ft.exports={createAuthDisplayHelpers:c})})()});var fn=B((br,gt)=>{(function(){function c(e={}){let n=e.escapeHtml,t=e.qrSvgFor,r=e.getLocations||(()=>[]),s=e.getPublicRequestLinks||(()=>[]),p=e.getPublicRequestLinksReady||(()=>!0),a=e.getPublicAppUrlOverride||(()=>""),o=e.getWindowPublicAppUrl||(()=>""),d=e.canManageTeam||(()=>!1),m=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,i=e.publicRequestUrl,u=e.publicRequestQrUrl;function g(){return`
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
      `}function l(O,C){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${n(O.location_name)}</h1>
                <p>${n(O.company_name)}</p>
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
      `}function _(O,C=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${n(O.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${C?`<p class="error-text">${n(C)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function A(){if(!d())return"";let O=f(),C=r(),v=p();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${n(a()||String(o()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${O?`<p class="muted">QR codes will point to ${n(O)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${v?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${C.map(P).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function P(O){let C=s().find(D=>D.location_id===O.id),v=!!(C&&C.is_active!==!1),q=m(),k=v?i(C.token):"",T=v?u(C.token):"",L=!!(k&&T);return`
        <article class="public-request-link-card">
          <div>
            <strong>${n(O.name)}</strong>
            <span>${v?"External request link active":C?"Request link disabled":"No request link yet"}</span>
            ${C?.last_used_at?`<span>Last used ${new Date(C.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${v?`
            <div class="qr-preview">${L?t(k):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${n(T||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${L?"":"disabled-link"}" href="${n(T||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${n(T)}" type="button" ${L?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${L?"":"disabled-link"}" href="${n(k||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${q?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${n(C.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${n(C.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:C?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${q?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${n(C.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${n(C.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${n(O.id)}" type="button" ${p()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:l,loadingRequestForm:h,publicRequestForm:y,publicRequestError:b,publicRequestSuccess:_,publicRequestLinkManager:A,publicRequestLocationCard:P}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:c},typeof gt<"u"&&(gt.exports={createPublicRequestDisplayHelpers:c})})()});(function(c){function e(d){return String(d||"").replace(/\/+$/,"")}function n(d=c.location,m=c.PUBLIC_APP_URL){if(m)return`${e(m)}/`;let f=d?.origin||"",i=d?.pathname||"/",g=i.indexOf("/auth/callback");if(g>=0)return`${f}${i.slice(0,g+1)}`;let l=i.endsWith("/")?i:i.replace(/[^/]*$/,"");return`${f}${l||"/"}`}function t(d=c.location,m=c.PUBLIC_APP_URL){return`${n(d,m)}auth/callback/`}function r(d={},m=c.location,f=c.PUBLIC_APP_URL){let i=new URL(n(m,f));return Object.entries(d).forEach(([u,g])=>{g!=null&&g!==""&&i.searchParams.set(u,g)}),i.href}function s(d){let m=new URL(d),f=new URLSearchParams(m.hash.replace(/^#/,"")),i=m.searchParams;return{code:i.get("code")||"",type:f.get("type")||i.get("type")||"",accessToken:f.get("access_token")||i.get("access_token")||"",refreshToken:f.get("refresh_token")||i.get("refresh_token")||"",error:f.get("error")||i.get("error")||"",errorCode:f.get("error_code")||i.get("error_code")||"",errorDescription:f.get("error_description")||i.get("error_description")||""}}function p(d){return!!(d?.code||d?.accessToken&&d?.refreshToken||d?.error||d?.errorDescription)}function a(d){return d?.type==="recovery"||!d?.type&&!!(d?.accessToken&&d?.refreshToken)}function o(d=c.location){let m=new URL(d.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>m.searchParams.delete(f)),m.hash="",m.href}c.MaintainOpsAuthRedirects={appBaseUrl:n,authCallbackUrl:t,workspaceUrl:r,authParamsFromHref:s,isAuthCallbackParams:p,isPasswordRecoveryParams:a,cleanAuthUrl:o}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:c})})();(function(){function c(v){return String(v||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(v){return v.toISOString().slice(0,10)}function n(v){return v.toISOString()}function t(v){let q=new Date;return q.setDate(q.getDate()-v),q}function r(){let v=new Date;return new Date(v.getFullYear(),v.getMonth(),1)}function s(v=new Date){let q=new Date(v);q.setHours(0,0,0,0),q.setDate(q.getDate()-q.getDay());let k=new Date(q);return k.setDate(k.getDate()+7),{start:q,end:k}}function p(v,q){let k=[];for(let T=0;T<v.length;T+=q)k.push(v.slice(T,T+q));return k}function a(v){return o(v).replace(/\.[^/.]+$/,"")||"photo"}function o(v){return String(v||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function d(v){return v==="active"||v==="all"?"Active":v==="overdue"?"Overdue":v==="completed"?"All Completed":v==="completed_month"?"Completed Month":v==="completed_week"?"Done This Week":v==="open"?"New":String(v||"").replaceAll("_"," ").replace(/\b\w/g,q=>q.toUpperCase())}function m(v){let q=String(v||"corrective").trim().toLowerCase();return q==="inspection"?"preventive":q==="reactive"||q==="request"?"corrective":["corrective","preventive","fabrication"].includes(q)?q:"corrective"}function f(v){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[m(v)]}function i(v){let q=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","accounting","manager","admin"],k=String(v||"technician").trim().toLowerCase();return k==="member"?"technician":q.includes(k)?k:"technician"}function u(v){return{admin:"Admin",manager:"Manager",accounting:"Accounting",technician:"Technician"}[i(v)]||"Technician"}function g(v){let q={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",technician:"Can create work, convert requests, and claim unassigned work."};return q[i(v)]||q.technician}function l(v){return new Date(`${v}T00:00:00`).toLocaleDateString()}function h(v){let q=[new Date(v.created_at).toLocaleString()];return v.file_size_bytes&&q.push(b(v.file_size_bytes)),v.original_size_bytes&&v.file_size_bytes&&v.original_size_bytes!==v.file_size_bytes&&q.push(`optimized from ${b(v.original_size_bytes)}`),q.join(" - ")}function y(v){let q=[];return(v.photo_uploaded_at||v.updated_at||v.created_at)&&q.push(new Date(v.photo_uploaded_at||v.updated_at||v.created_at).toLocaleString()),v.photo_file_size_bytes&&q.push(b(v.photo_file_size_bytes)),v.photo_original_size_bytes&&v.photo_file_size_bytes&&v.photo_original_size_bytes!==v.photo_file_size_bytes&&q.push(`optimized from ${b(v.photo_original_size_bytes)}`),q.join(" - ")||"Photo attached"}function b(v){let q=Number(v)||0;return q?q<1024?`${q} B`:q<1048576?`${Math.round(q/1024)} KB`:`${(q/1048576).toFixed(q>=10485760?0:1)} MB`:""}function _(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(v)||0)}function A(v){return Number(v.unit_cost_at_use??v.parts?.unit_cost??0)||0}function P(v){if(!v.due_at||v.status==="completed")return null;let q=new Date;q.setHours(0,0,0,0);let k=new Date(`${v.due_at}T00:00:00`),T=Math.round((k-q)/864e5);return T<0?{label:"overdue",className:"overdue"}:T===0?{label:"due today",className:"due_today"}:null}function O(){let v=new Date;return v.setHours(0,0,0,0),v}function C(v){return`"${String(v??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:c,isoDate:e,isoDateTime:n,daysAgoDate:t,monthStartDate:r,sundayWeekRange:s,chunkArray:p,fileBaseName:a,safeFileName:o,statusLabel:d,normalizeWorkOrderType:m,workOrderTypeLabel:f,normalizeRole:i,roleLabel:u,roleDescription:g,formatDate:l,photoMetaText:h,requestPhotoMetaText:y,formatBytes:b,money:_,partUsageUnitCost:A,getDueState:P,startOfToday:O,csvCell:C})})();(function(){function c(s,p){let a=s?.message||"";return p.some(o=>a.includes(o))}function e(s,p){let a=s?.message||"";return a.includes(p)&&(a.includes("column")||a.includes("schema cache"))}function n(s){let p=s?.message||"";return p.includes("work_order_comments_company_author_profile_fkey")||p.includes("profiles")}function t(s){let p=s?.message||"";return!!(p.includes("procedure_template_id")||p.includes("procedure_templates")||p.includes("procedure_steps"))}function r(s){return c(s,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:c,isMissingColumnError:e,isProfileMissingError:n,isProcedureSchemaError:t,isAssetHierarchySchemaError:r}})();(function(){function c(e,n){return{...e,error:{...e.error||{},message:n,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:c}})();(function(){function c(e,n,t=2e4){let r,s=new Promise((p,a)=>{r=setTimeout(()=>a(new Error(n)),t)});return Promise.race([e,s]).finally(()=>clearTimeout(r))}window.MaintainOpsOperationTimeout={withOperationTimeout:c}})();var $r=j(yt()),Pr=j(bt());(function(){function c(e={}){let n=e.windowRef||window,t=e.getPublicAppUrlOverride||(()=>"");function r(f){return p(`?request=${encodeURIComponent(f)}`)}function s(f){return p(`?qr=${encodeURIComponent(f)}`)}function p(f){let i=a();if(!i)return"";let u=new URL(i);return u.search=f,u.hash="",u.toString()}function a(){let i=t()||String(n.PUBLIC_APP_URL||"").trim()||(n.location.protocol==="https:"?n.location.href:"");return i?o(i):""}function o(f){try{let i=new URL(String(f||"").trim(),n.location.href);return i.protocol!=="https:"||!d(i.hostname)?"":(i.search="",i.hash="",i.pathname&&i.pathname!=="/"&&!i.pathname.endsWith("/")&&!i.pathname.endsWith(".html")&&(i.pathname=`${i.pathname}/`),i.toString())}catch{return""}}function d(f){let i=String(f||"").toLowerCase();return!(!i||i==="localhost"||i.endsWith(".localhost")||i==="127.0.0.1"||i==="::1"||i==="[::1]"||/^10\./.test(i)||/^192\.168\./.test(i)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(i))}function m(f,i=4){if(!n.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let u=n.qrcode(0,"M");return u.addData(f),u.make(),u.createSvgTag(i,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:r,publicRequestQrUrl:s,publicAppUrlWithSearch:p,publicAppBaseUrl:a,normalizePublicAppUrl:o,isPublicAppHost:d,qrSvgFor:m}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.printRef||(()=>window.print()),r=n.querySelector("#print-public-qr");!r||typeof t!="function"||r.addEventListener("click",()=>t())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:c}})();(function(){function c(e,n){let t=new Date(`${e}T00:00:00`);return n==="weekly"&&t.setDate(t.getDate()+7),n==="monthly"&&t.setMonth(t.getMonth()+1),n==="quarterly"&&t.setMonth(t.getMonth()+3),t.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:c}})();var Er=j(wt());(function(){function c(e){function n(d){return e[d]()}function t(d,m){return typeof e[d]=="function"?e[d]():m}function r(d){let m=n("searchQuery"),f=n("activeSection"),i=n("activeStatusFilter"),u=!!m.trim();return o(s(d,{statusFilter:u?"__any__":f==="work"&&i==="requests"?"__none__":i,section:f,includeQueue:!u,includeSearch:!0}))}function s(d,m={}){let f=m.section||n("activeSection"),i=d.eq("company_id",n("activeCompanyId"));if(n("locationsReady")&&n("activeLocationId")&&(i=i.eq("location_id",n("activeLocationId"))),m.includeQueue!==!1&&(i=p(i,f)),m.includeAttributeFilters!==!1&&f==="work"){let u=t("workOrderTypeFilter","all"),g=t("workOrderPriorityFilter","all");u!=="all"&&(i=i.eq("type",u)),g!=="all"&&(i=i.eq("priority",g))}if(i=a(i,m.statusFilter||n("activeStatusFilter")),m.includeSearch!==!1){let u=e.postgrestSearchTerm(n("searchQuery"));if(u){let g=n("workOrderRelatedSearch"),l=[`title.ilike.%${u}%`,`description.ilike.%${u}%`,`priority.ilike.%${u}%`,`type.ilike.%${u}%`,`status.ilike.%${u}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];i=i.or(l.join(","))}}return i}function p(d,m){return m==="mywork"?n("myWorkFilter")==="created"?d.eq("created_by",n("session").user.id):d.eq("assigned_to",n("session").user.id):m!=="work"?d:n("workOrderAssigneeFilter")?d.eq("assigned_to",n("workOrderAssigneeFilter")):n("workOrderFilter")==="assigned"?d.not("assigned_to","is",null):n("workOrderFilter")==="vendor"?d.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):n("workOrderFilter")==="unassigned"?d.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):d}function a(d,m){let f=e.isoDate(e.startOfToday());if(m==="__any__")return d;if(m==="__none__")return d.eq("id","00000000-0000-0000-0000-000000000000");if(m==="overdue")return d.neq("status","completed").lt("due_at",f);if(m==="completed_month")return d.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(m==="completed_week"){let i=e.sundayWeekRange();return d.gte("completed_at",e.isoDateTime(i.start)).lt("completed_at",e.isoDateTime(i.end))}return m==="active"||m==="all"?d.neq("status","completed"):d.eq("status",m)}function o(d){return["completed","completed_month","completed_week"].includes(n("activeStatusFilter"))?d.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="due"?d.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="priority"?d.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):n("workSort")==="type"?d.order("type",{ascending:!0}).order("created_at",{ascending:!1}):n("workSort")==="assigned"?d.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):d.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:r,applyWorkOrderFilters:s,applyWorkOrderQueueFilters:p,applyWorkOrderStatusFilter:a,applyWorkOrderSort:o}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.setTimeoutFn||setTimeout;n.querySelectorAll("[data-jump-work-section]").forEach(r=>{r.addEventListener("click",()=>{let s=n.querySelector(`#${r.dataset.jumpWorkSection}`);if(!s)return;let p=s.closest("details");p&&(p.open=!0),s.scrollIntoView({behavior:"smooth",block:"center"});let a=s;a.classList.add("jump-highlight","field-jump-highlight"),t(()=>a.classList.remove("jump-highlight"),1400),t(()=>a.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.renderWorkspace,p=e.setWorkOrderSearchMode;if(!r||!s||!p)return;let a=()=>{r.setSearchQuery(""),p(!1),t.setItem("maintainops.searchQuery","")},o=d=>{r.setActiveSection(d),t.setItem("maintainops.activeSection",d)};n.querySelectorAll("[data-search-work-order]").forEach(d=>{d.addEventListener("click",()=>{r.setActiveWorkOrderId(d.dataset.searchWorkOrder),r.setActiveAssetId(null),r.setActivePartId(null),o("work"),a(),s()})}),n.querySelectorAll("[data-search-asset]").forEach(d=>{d.addEventListener("click",()=>{r.setActiveAssetId(d.dataset.searchAsset),r.setActiveWorkOrderId(null),r.setActivePartId(null),o("assets"),a(),s()})}),n.querySelectorAll("[data-search-part]").forEach(d=>{d.addEventListener("click",()=>{r.setActivePartId(d.dataset.searchPart),r.setActiveAssetId(null),r.setActiveWorkOrderId(null),o("parts"),a(),s()})}),n.querySelectorAll("[data-search-request]").forEach(d=>{d.addEventListener("click",()=>{o("requests"),a(),s()})}),n.querySelectorAll("[data-search-section]").forEach(d=>{d.addEventListener("click",()=>{o(d.dataset.searchSection),a(),s()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:c}})();(function(){let c=null,e=0,n=Promise.resolve();function t(r={}){let s=r.documentRef||document,p=r.storage||localStorage,a=r.state,o=r.windowRef||(typeof window<"u"?window:null),d=r.setTimeoutRef||setTimeout,m=r.clearTimeoutRef||clearTimeout,f=Number.isFinite(r.searchDelayMs)?r.searchDelayMs:300;if(!a)return;let i=()=>{e+=1,c!==null&&(m(c),c=null)},u=l=>{l&&typeof o?.scrollTo=="function"&&o.scrollTo(l.x,l.y)},g=(l,h,y,b)=>{let _=s.getElementById?s.getElementById(l):s.querySelector(`#${l}`);if(!_)return;let A=_.value.length,P=Math.min(h??A,A),O=Math.min(y??P,A);_.focus({preventScroll:!0}),_.setSelectionRange(P,O),u(b)};s.querySelectorAll(".workspace-search-input").forEach(l=>{l.addEventListener("input",()=>{let h=l.id,y=l.selectionStart,b=l.selectionEnd;i();let _=e;a.setSearchQuery(l.value),r.invalidateExactWorkOrderSearchCache(),a.getSearchQuery().trim()||r.setWorkOrderSearchMode(!1),a.getSearchQuery().trim()&&(a.setActiveWorkOrderId(null),a.setActiveAssetId(null),a.setActivePartId(null),a.setQuickFixMode(!1),a.setCreateWorkOrderMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)),p.setItem("maintainops.searchQuery",a.getSearchQuery()),r.resetWorkOrderPage(),r.resetPartsPage(),r.resetRequestsPage(),c=d(()=>(c=null,n=n.catch(()=>null).then(async()=>{if(_!==e||(await Promise.all([r.reloadWorkOrderQueue({render:!1}),r.reloadRequestQueue({render:!1})]),_!==e))return;let A=o?{x:Number(o.scrollX||o.pageXOffset||0),y:Number(o.scrollY||o.pageYOffset||0)}:null,P=s.getElementById?s.getElementById(h):s.querySelector(`#${h}`),O=!("activeElement"in s)||s.activeElement===P;r.renderWorkspace(),O?g(h,y,b,A):u(A)}),n),f)})}),s.querySelectorAll("[data-view-work-search]").forEach(l=>{l.addEventListener("click",async()=>{i(),a.setActiveSection("work"),a.setActiveWorkOrderId(null),a.setActiveAssetId(null),a.setActivePartId(null),a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),r.setWorkOrderSearchMode(!0),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),p.setItem("maintainops.activeSection",a.getActiveSection()),await r.reloadWorkOrderQueue()})}),s.querySelectorAll("[data-close-work-search]").forEach(l=>{l.addEventListener("click",async()=>{i(),r.setWorkOrderSearchMode(!1),r.invalidateExactWorkOrderSearchCache(),r.resetWorkOrderPage(),await r.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:t}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(a){!r||typeof r.scrollTo!="function"||r.scrollTo({top:a,behavior:"auto"})}async function p(a){let o=Number(r?.scrollY??r?.pageYOffset??0);if(await a(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(o));return}s(o)}}n.querySelectorAll("[data-status-filter]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setActiveStatusFilter(a.dataset.statusFilter),e.resetWorkOrderPage(),t.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),t.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-my-work-filter]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setMyWorkFilter(a.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-order-filter]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setWorkOrderFilter(a.dataset.workOrderFilter),t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-status-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{t.setActiveStatusFilter(a.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignment-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{let o=a.value||"all";t.setWorkOrderFilter(o),o!=="assigned"&&t.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{let o=a.value||"";t.setWorkOrderAssigneeFilter(o),o&&t.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-type-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{t.setWorkOrderTypeFilter(a.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-priority-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{t.setWorkOrderPriorityFilter(a.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-clear-assignee-filter]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setWorkSort(a.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-sort-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{t.setWorkSort(a.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-group-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{t.setWorkGroup(a.value||"none"),e.renderWorkspace()})})}),n.querySelectorAll("[data-clear-work-filters]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setActiveStatusFilter("active"),t.setWorkOrderFilter("all"),t.setWorkOrderAssigneeFilter(""),t.setWorkOrderTypeFilter("all"),t.setWorkOrderPriorityFilter("all"),t.setWorkSort("newest"),t.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-work-assignee-sort-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{t.setWorkOrderAssigneeFilter(a.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-request-filter]").forEach(a=>{a.addEventListener("click",async()=>{a.disabled||await p(async()=>{t.setRequestViewFilter(a.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),n.querySelectorAll("[data-work-page]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setWorkOrderPage(t.getWorkOrderPage()+(a.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),n.querySelectorAll("[data-parts-page]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setPartsPage(t.getPartsPage()+(a.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-assets-page]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setAssetsPage(t.getAssetsPage()+(a.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-page]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{t.setFinancialPage(t.getFinancialPage()+(a.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),n.querySelectorAll("[data-financial-filter]").forEach(a=>{a.addEventListener("change",async()=>{await p(async()=>{a.dataset.financialFilter==="missing"&&t.setFinancialMissingFilter(a.value),a.dataset.financialFilter==="location"&&t.setFinancialLocationFilter(a.value),a.dataset.financialFilter==="type"&&t.setFinancialTypeFilter(a.value),a.dataset.financialFilter==="area"&&t.setFinancialAreaFilter(a.value),t.resetFinancialPage(),e.renderWorkspace()})})}),n.querySelectorAll("[data-list-page]").forEach(a=>{a.addEventListener("click",async()=>{await p(async()=>{let o=a.dataset.pageDirection==="next"?1:-1;if(a.dataset.listPage==="requests"){t.setRequestsPage(t.getRequestsPage()+o),await e.reloadRequestQueue();return}if(a.dataset.listPage==="schedules"&&t.setSchedulesPage(t.getSchedulesPage()+o),a.dataset.listPage==="procedures"&&t.setProceduresPage(t.getProceduresPage()+o),a.dataset.listPage==="members"&&t.setMembersPage(t.getMembersPage()+o),a.dataset.listPage==="messages"&&t.setMessageThreadsPage(t.getMessageThreadsPage()+o),a.dataset.listPage?.startsWith("planning-")){let d=a.dataset.listPage.replace("planning-","");t.setPlanningPage(d,t.getPlanningPage(d)+o)}e.renderWorkspace()})})}),n.querySelectorAll("[data-planning-group]").forEach(a=>{a.addEventListener("toggle",()=>{typeof t.setPlanningGroupOpen=="function"&&t.setPlanningGroupOpen(a.dataset.planningGroup,!!a.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.storage||localStorage,r=e.state,s=e.windowRef||(typeof window<"u"?window:null),p=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!r)return;let a=()=>{r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)};async function o(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function d(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function m(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function f(){e.renderWorkspace()}function i(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function u(){let y=n.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(s&&typeof s.requestAnimationFrame=="function"){s.requestAnimationFrame(u);return}u()}let l=n.querySelector("#back-to-my-work");l&&l.addEventListener("click",()=>{r.setActiveWorkOrderId(null),r.setActiveAssetId(null),i(),a(),e.renderWorkspace()});let h=n.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{r.setActiveAssetId(null),i(),r.setPendingDeleteAssetId(null),e.renderWorkspace()}),n.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{r.setActiveWorkOrderId(y.dataset.id),r.setActiveAssetId(null),i(),a(),e.renderWorkspace()})}),n.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),r.setActiveWorkOrderId(y.dataset.workPhotoJump),r.setActiveAssetId(null),i(),r.setActiveSection("work"),a(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),g()})}),n.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",b=>{b.stopPropagation(),r.setActiveAssetId(y.dataset.openAsset),r.setActiveWorkOrderId(null),i(),a(),r.getActiveSection()!=="assets"&&r.setActiveSection("work"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),p()})}),n.querySelectorAll("[data-asset-id]").forEach(y=>{let b=()=>{r.setActiveAssetId(y.dataset.assetId),r.setActiveWorkOrderId(null),r.setActivePartId(null),i(),a(),r.setReportIssueMode(!1),r.setActiveSection("assets"),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),p()};y.addEventListener("click",b),y.addEventListener("keydown",_=>{_.key!=="Enter"&&_.key!==" "||(_.preventDefault(),b())})}),n.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",()=>{r.setActiveWorkOrderId(y.dataset.miniWorkOrder),r.setActiveAssetId(null),i(),r.setActiveSection("work"),a(),t.setItem("maintainops.activeSection",r.getActiveSection()),e.renderWorkspace(),p()})}),n.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{y.addEventListener("toggle",async()=>{let b=y.dataset.assetId,_=y.dataset.assetRelationshipSection;!b||!_||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(b,_,y.open),y.open&&m(_)&&await o(b),y.open&&_==="asset-history"&&await d(b),f())})}),n.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let _=y.dataset.assetId,A=y.dataset.assetRelationSection,O=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(_,A):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(_,A,O),f()})}),n.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async b=>{b.preventDefault(),b.stopPropagation();let _=y.dataset.openAssetHistory;_&&(r.setActiveAssetId(_),r.setActiveWorkOrderId(null),a(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(_),await d(_),e.renderWorkspace(),p())})}),n.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let _=y.dataset.backAssetHistory;_&&r.setActiveAssetId(_),i(),e.renderWorkspace(),p()})}),n.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();let _=y.dataset.assetId,P=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(_,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(_,"asset-history",P),e.renderWorkspace(),p()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.windowRef||(typeof window<"u"?window:null);if(!t)return;function s(a){!r||typeof r.scrollTo!="function"||r.scrollTo({top:a,behavior:"auto"})}function p(){let a=Number(r?.scrollY??r?.pageYOffset??0);if(e.renderWorkspace(),!(!r||typeof r.scrollTo!="function")){if(typeof r.requestAnimationFrame=="function"){r.requestAnimationFrame(()=>s(a));return}s(a)}}n.querySelectorAll("[data-part-inventory-filter]").forEach(a=>{a.addEventListener("click",()=>{t.setPartInventoryFilter(a.dataset.partInventoryFilter),e.resetPartsPage(),p()})}),n.querySelectorAll("[data-part-sort]").forEach(a=>{a.addEventListener("change",()=>{t.setPartSort&&(t.setPartSort(a.value||"default"),e.resetPartsPage(),p())})}),n.querySelectorAll("[data-asset-status-filter]").forEach(a=>{a.addEventListener("click",()=>{let o=t.getAssetStatusFilter()===a.dataset.assetStatusFilter?"all":a.dataset.assetStatusFilter;t.setAssetStatusFilter(o),t.setAssetTypeFilter&&t.setAssetTypeFilter("all"),e.resetAssetsPage(),p()})}),n.querySelectorAll("[data-asset-type-filter]").forEach(a=>{a.addEventListener("click",()=>{if(!t.getAssetTypeFilter||!t.setAssetTypeFilter)return;let o=t.getAssetTypeFilter()===a.dataset.assetTypeFilter?"all":a.dataset.assetTypeFilter;t.setAssetTypeFilter(o),t.setAssetStatusFilter&&t.setAssetStatusFilter("all"),e.resetAssetsPage(),p()})}),n.querySelectorAll("[data-asset-area-filter]").forEach(a=>{a.addEventListener("change",()=>{t.setAssetAreaFilter&&(t.setAssetAreaFilter(a.value||"all"),e.resetAssetsPage(),p())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:c}})();(function(){function c(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation();let s=t.textContent;t.disabled=!0,t.textContent="Saving...";try{!await e.setWorkOrderStatus(t.dataset.id,t.dataset.quickStatus)&&t.isConnected&&(t.disabled=!1,t.textContent=s)}catch(p){e.showNotice(`Could not update status: ${p.message||p}`,"warning"),t.isConnected&&(t.disabled=!1,t.textContent=s)}t.isConnected&&(t.disabled=!1,t.textContent=s)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;n.querySelectorAll("[data-assign-me]").forEach(t=>{t.addEventListener("click",async r=>{r.stopPropagation(),await e.assignWorkOrderToMe(t.dataset.assignMe)})}),n.querySelectorAll("[data-card-assign]").forEach(t=>{t.addEventListener("submit",e.assignWorkOrderFromCard),t.addEventListener("click",r=>r.stopPropagation()),t.addEventListener("change",r=>{r.stopPropagation(),r.target?.name==="assigned_to"&&t.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.resetDelayMs||1600,r=e.setTimeoutRef||setTimeout;n.querySelectorAll("[data-copy-downtime]").forEach(s=>{s.addEventListener("click",async()=>{let p=e.getWorkOrderById(s.dataset.id);if(!p)return;let a=s.dataset.copyDowntime==="subject",o=a?e.downtimeEmailSubject(p):e.downtimeEmailBody(p),d=await e.copyTextToClipboard(o);s.textContent=d?"Copied":"Copy failed",r(()=>{s.textContent=a?"Copy Subject":"Copy Email Body"},t)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:c}})();(function(){function c(e={}){let t=(e.documentRef||document).querySelector("#status-select");t&&t.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.FormDataRef||FormData;function r(o){return e.getActiveWorkOrderId()!==o?!1:Array.from(n.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(d=>d.checked)}function s(o){n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.checked=o.target.checked})}async function p(o){o.preventDefault();let d=o.target,m=d.querySelector("button[type='submit']"),f=n.querySelector("#completion-error"),i=e.getActiveWorkOrderId(),u=e.getWorkOrderById(i),g=e.getProcedureById(u?.procedure_template_id),l=g?e.requiredChecklistProgress(u,g):{done:0,total:0};if(l.done<l.total){f&&(f.textContent=`Complete required checklist steps first (${l.done}/${l.total}).`);return}let h=new t(d),y=h.get("safety_devices_checked")==="on"||r(i)||e.hasCompletedSafetyDeviceCheck(u);if(e.requiresSafetyDeviceCheck(u)&&!y){f&&(f.textContent="Check safety devices before completing equipment work.");return}m.disabled=!0,m.textContent="Completing...",f&&(f.textContent="");try{let b={status:"completed",asset_id:u?.asset_id||null,actual_minutes:Number(h.get("actual_minutes"))||0,failure_cause:h.get("failure_cause")||null,resolution_summary:h.get("resolution_summary")||null,follow_up_needed:h.get("follow_up_needed")==="on",completion_notes:h.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(b),e.applySafetyCheckPayload(b,b.safety_check_required&&y),delete b.asset_id;let{error:_}=await e.withOperationTimeout(e.updateWorkOrderSafely(b,i),"Complete work save timed out. Check your connection and try again.",2e4);if(_){f&&(f.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(_)}`);return}let A=await e.withOperationTimeout(e.recordWorkOrderEvent(i,"completed",h.get("resolution_summary")||h.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch(P=>P);e.setWorkOrderActionWarning("",""),e.showNotice(A?`Work order completed, but history did not update: ${A.message}`:"Work order completed.",A?"warning":"success"),await e.render()}catch(b){f?f.textContent=`Could not complete work order: ${b.message||b}`:e.alertRef(b.message||b)}finally{m.disabled=!1,m.textContent="Complete Work Order"}}function a(){let o=n.querySelector("#complete-work-order-form");o&&o.addEventListener("submit",p),n.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.addEventListener("change",s)})}return{bindWorkspaceWorkOrderCompletionEvents:a,completeWorkOrder:p,currentSafetyCheckboxCheckedForWorkOrder:r,syncSafetyDeviceChecks:s}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;function t(p){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(p),e.renderWorkspace()}async function r(p){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let a=e.getPhotoPathsByWorkOrder(p);if(a.length){let d=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(a),"Work order photo cleanup timed out.",15e3);d.error&&e.warnRef("Work order photo storage cleanup failed",d.error)}let{error:o}=await e.withOperationTimeout(e.deleteWorkOrderRecord(p),"Work order delete timed out. Check your connection and try again.",15e3);if(o){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(o)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(a){e.alertRef(`Could not delete work order: ${a.message||a}`)}}function s(){n.querySelectorAll("[data-delete-work-order]").forEach(p=>{p.addEventListener("click",a=>{a.stopPropagation(),t(p.dataset.deleteWorkOrder)})}),n.querySelectorAll("[data-cancel-delete-work-order]").forEach(p=>{p.addEventListener("click",a=>{a.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),n.querySelectorAll("[data-confirm-delete-work-order]").forEach(p=>{p.addEventListener("click",async a=>{a.stopPropagation(),await r(p.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:s,deleteWorkOrder:r,requestDeleteWorkOrder:t}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;t&&n.querySelectorAll("[data-view-member-work]").forEach(r=>{r.addEventListener("click",()=>{t.setWorkOrderAssigneeFilter(r.dataset.viewMemberWork),t.setActiveSection("work"),t.setActiveStatusFilter("active"),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace;!t||typeof r!="function"||(n.querySelectorAll("[data-open-part]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(s.dataset.openPart),r()}),s.addEventListener("keydown",p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),t.setActivePartId(s.dataset.openPart),r())})}),n.querySelectorAll("[data-close-part-detail]").forEach(s=>{s.addEventListener("click",()=>{t.setActivePartId(null),t.setShowPartSourceManager(!1),r()})}),n.querySelectorAll("[data-toggle-part-sources]").forEach(s=>{s.addEventListener("click",()=>{t.setShowPartSourceManager(!t.getShowPartSourceManager()),r()})}))}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.messageComposerScopeNote,p=e.autoGrowTextarea;if(!t||typeof r!="function")return;let a=e.storage||localStorage;n.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let i=f.dataset.messageFilter;t.setMessageThreadFilter(i),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),a.setItem("maintainops.messageThreadFilter",i),a.setItem("maintainops.messageThreadsPage","1"),r()})}),n.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{t.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),t.setActiveAssetId(null),t.setActivePartId(null),t.setQuickFixMode(!1),t.setCreateWorkOrderMode(!1),t.setActiveSection("work"),a.setItem("maintainops.activeSection","work"),r()})});let o=n.querySelector("[data-clear-message-work-link]");o&&o.addEventListener("click",()=>{t.setMessageComposerWorkOrderId(""),a.setItem("maintainops.messageComposerWorkOrderId",""),r()});let d=n.querySelector("#message-search");d&&d.addEventListener("input",()=>{let f=d.value;t.setMessageSearchQuery(f),typeof t.resetMessageThreadsPage=="function"&&t.resetMessageThreadsPage(),a.setItem("maintainops.messageSearchQuery",f),a.setItem("maintainops.messageThreadsPage","1"),r();let i=n.querySelector("#message-search");i&&(i.focus(),i.setSelectionRange(f.length,f.length))});let m=n.querySelector("#message-thread-form");if(m){let f=m.querySelector("#message-thread-type"),i=m.querySelector(".message-direct-field"),u=m.querySelector("#message-scope-note");if(f&&i&&u&&typeof s=="function"){let g=()=>{let l=f.value==="direct";i.classList.toggle("hidden-section",!l);let h=i.querySelector("select");h&&(h.disabled=!l),u.textContent=s(f.value)};f.addEventListener("change",g),g()}}n.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let i=n.querySelector("#message-thread-form");if(!i)return;let u=i.querySelector("details"),g=i.querySelector("#message-thread-type"),l=i.querySelector("select[name='direct_user_id']"),h=i.querySelector(".message-direct-field"),y=i.querySelector("#message-scope-note"),b=i.querySelector("input[name='title']");u&&(u.open=!0),g&&(g.value="direct"),l&&(l.value=f.dataset.messagePerson||"",l.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof s=="function"&&(y.textContent=s("direct")),b&&b.focus()})}),n.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let u=n.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!u)return;let g=u.value.trim();u.value=g?`${g}
${f.dataset.quickReply}`:f.dataset.quickReply,u.focus(),typeof p=="function"&&p(u)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=e.renderWorkspace,s=e.resetPartsPage;if(!t||typeof r!="function"||typeof s!="function")return;let p=n.querySelector("#part-search-form");if(!p)return;let a=d=>{t.setPartSearchQuery(d||""),s(),r()},o=p.querySelector("input[name='part_search']");o&&o.addEventListener("input",()=>{a(o.value||"");let d=n.querySelector("#part-search");if(!d)return;d.focus();let m=d.value.length;d.setSelectionRange(m,m)}),p.addEventListener("submit",d=>{d.preventDefault();let m=e.FormDataRef||FormData,f=new m(p).get("part_search")||"";a(f),n.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage,s=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};n.querySelectorAll("[data-section]").forEach(p=>{p.addEventListener("click",async()=>{let a=performance.now(),o=p.dataset.section;e.visibleNavItems().some(([d])=>d===o)&&(t.setActiveSection(o),t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setShowPartSourceManager(!1),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),o!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),r.setItem("maintainops.activeSection",o),e.renderWorkspace(),s(),(o==="work"||o==="mywork")&&await e.reloadWorkOrderQueue(),o==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),o==="requests"&&await e.reloadRequestQueue(),o==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),o==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),o==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),o==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(o,a))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-message-thread]").forEach(s=>{s.addEventListener("click",async()=>{let p=s.dataset.messageThread;t.setActiveMessageThreadId(p),r.setItem("maintainops.activeMessageThreadId",p),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(p),await e.markMessageThreadRead(p),e.renderWorkspace()})}),n.querySelectorAll("[data-open-work-message-thread]").forEach(s=>{s.addEventListener("click",async()=>{let p=s.dataset.openWorkMessageThread;t.setActiveMessageThreadId(p),t.setMessageComposerOpen(!1),t.setActiveSection("messages"),r.setItem("maintainops.activeMessageThreadId",p),r.setItem("maintainops.activeSection","messages"),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(p),await e.markMessageThreadRead(p),e.renderWorkspace()})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-cancel-app-issue-report]").forEach(s=>{s.addEventListener("click",()=>{t.setReportIssueMode(!1),e.renderWorkspace()})}),n.querySelectorAll("[data-setup-action]").forEach(s=>{s.addEventListener("click",()=>{s.dataset.setupAction==="confirm-admin-delete-sql"&&(t.setAdminDeleteSqlConfirmed(!0),r.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePart=="function"&&(n.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})}),n.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePart(r.dataset.deletePart)})})),!(!t||typeof e.renderWorkspace!="function")&&n.querySelectorAll("[data-cancel-delete-part]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll("[data-start-work-message]").forEach(s=>{s.addEventListener("click",()=>{let p=s.dataset.startWorkMessage;t.setMessageComposerWorkOrderId(p),t.setMessageComposerOpen(!0),t.setActiveMessageThreadId(""),t.setActiveSection("messages"),r.setItem("maintainops.messageComposerWorkOrderId",p),r.setItem("maintainops.activeSection","messages"),r.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||n.querySelectorAll('[data-command-action="report-issue"]').forEach(r=>{r.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setActivePartId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="request"]').forEach(s=>{s.addEventListener("click",async()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;if(!t||typeof e.renderWorkspace!="function")return;let r=e.storage||localStorage;n.querySelectorAll('[data-command-action="create-work-order"]').forEach(s=>{s.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!0),t.setQuickFixMode(!1),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("work"),e.setWorkOrderSearchMode(!1),r.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&n.querySelectorAll('[data-command-action="export-csv"]').forEach(t=>{t.addEventListener("click",()=>{e.exportActiveSectionCsv()})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:c}})();var aa=j(vt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteAsset=="function"&&n.querySelectorAll("[data-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.requestDeleteAsset(r.dataset.deleteAsset)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-asset]").forEach(r=>{r.addEventListener("click",s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),t.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&n.querySelectorAll("[data-confirm-delete-asset]").forEach(r=>{r.addEventListener("click",async s=>{s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),await e.deleteAsset(r.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(r.dataset.deleteRequest)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-request]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&n.querySelectorAll("[data-confirm-delete-request]").forEach(r=>{r.addEventListener("click",()=>{e.deleteMaintenanceRequest(r.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&n.querySelectorAll("[data-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(r.dataset.deleteSchedule)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&n.querySelectorAll("[data-confirm-delete-schedule]").forEach(r=>{r.addEventListener("click",()=>{e.deletePreventiveSchedule(r.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&n.querySelectorAll("[data-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(r.dataset.deleteProcedure)})}),!(!t||typeof e.renderWorkspace!="function")&&(n.querySelectorAll("[data-cancel-delete-procedure]").forEach(r=>{r.addEventListener("click",()=>{t.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&n.querySelectorAll("[data-confirm-delete-procedure]").forEach(r=>{r.addEventListener("click",async()=>{await e.deleteProcedureTemplate(r.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:c}})();(function(){function c(n){!n||!n.style||(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)}function e(n={}){(n.documentRef||document).querySelectorAll("textarea").forEach(r=>{c(r),r.addEventListener("input",()=>c(r))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:c,bindWorkspaceTextareaAutoGrow:e}})();var ua=j(kt());(function(){function c(e={}){let n=e.documentRef||document,t=e.state;!t||typeof e.renderWorkspace!="function"||(n.querySelectorAll("[data-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(r.dataset.cancelInvite),e.renderWorkspace()})}),n.querySelectorAll("[data-cancel-invite-cancel]").forEach(r=>{r.addEventListener("click",()=>{t.setTeamInviteCancelError(""),t.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&n.querySelectorAll("[data-confirm-cancel-invite]").forEach(r=>{r.addEventListener("click",()=>{e.cancelTeamInvite(r.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-team-invite]").forEach(p=>{p.addEventListener("click",async()=>{let a=await t(p.dataset.copyTeamInvite||"");p.textContent=a?"Copied":"Copy failed",r(()=>{p.textContent="Copy Invite"},s)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll('[data-command-action="quick-fix"]').forEach(p=>{p.addEventListener("click",()=>{t.setActiveWorkOrderId(null),t.setActiveAssetId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setReportIssueMode(!1),t.setQuickFixAssetId(null),t.setQuickFixRequestId(null),t.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.state,r=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!t||typeof e.renderWorkspace!="function")return;let s=e.storage||localStorage;n.querySelectorAll("[data-quick-fix-asset]").forEach(p=>{p.addEventListener("click",()=>{t.setQuickFixAssetId(p.dataset.quickFixAsset),t.setQuickFixRequestId(null),t.setActiveAssetId(null),t.setActiveWorkOrderId(null),t.setCreateWorkOrderMode(!1),t.setQuickFixMode(!0),t.setActiveSection("mywork"),s.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),r()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:c}})();var ga=j(_t());(function(){function c(e={}){let n=e.documentRef||document,t=e.copyTextToClipboard,r=e.setTimeoutRef||setTimeout,s=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof t=="function"&&n.querySelectorAll("[data-copy-public-request-link]").forEach(p=>{p.addEventListener("click",async()=>{let a=await t(p.dataset.copyPublicRequestLink);p.textContent=a?"Copied":"Copy failed",r(()=>{p.textContent="Copy QR Link"},s)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:c}})();var ya=j(St());(function(){function c(e={}){let n=e.documentRef||document,t=e.convertRequestToWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-convert-request]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.generatePreventiveWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-generate-pm]").forEach(r=>{r.addEventListener("click",()=>{t(r.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.createFollowUpWorkOrder;typeof t=="function"&&n.querySelectorAll("[data-create-follow-up]").forEach(r=>{r.addEventListener("click",()=>{let p=r.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");t(r.dataset.createFollowUp,p?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:c}})();var ka=j(qt());(function(){function c(e={}){let n=e.documentRef||document,t=e.createComment,r=n.querySelector("#comment-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderQuickView,r=n.querySelector("#quick-update-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateWorkOrderDetails,r=n.querySelector("#edit-work-order-form");!r||typeof t!="function"||r.addEventListener("submit",t)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.openQuickFixForRequest;typeof t=="function"&&n.querySelectorAll("[data-quick-fix-request]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:c}})();(function(){function c(e={}){let n=e.documentRef||document,t=e.updateAssetLocationWarning;typeof t=="function"&&n.querySelectorAll("[data-location-sensitive-asset]").forEach(r=>{t(r),r.addEventListener("change",()=>t(r))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:c}})();var Pa=j(Ct()),Aa=j($t()),Ra=j(Pt()),Oa=j(At()),Ea=j(Rt()),Wa=j(Ot()),xa=j(Et()),Ma=j(Wt()),Ta=j(xt()),Da=j(Mt()),Ia=j(Tt()),Fa=j(Dt()),La=j(It()),Na=j(Ft()),Ua=j(Lt()),Qa=j(Nt()),Ba=j(Ut()),ja=j(Qt()),za=j(Bt()),Ga=j(jt()),Va=j(zt()),Ha=j(Gt()),Ya=j(Vt()),Ka=j(Ht());(function(){function c(e){function n(r){return e[r]()}function t(r,s=n("requestViewFilter")){let p=r.eq("company_id",n("activeCompanyId"));n("locationsReady")&&n("activeLocationId")&&(p=p.eq("location_id",n("activeLocationId"))),s==="converted"?p=p.or("status.eq.converted,converted_work_order_id.not.is.null"):s!=="all"&&(p=p.eq("status","submitted").is("converted_work_order_id",null));let a=e.postgrestSearchTerm(n("searchQuery"));if(a){let o=`%${a}%`,d=n("assets").filter(e.matchesActiveLocation).filter(m=>e.matchesQuery([m.name,m.asset_code,m.manufacturer,m.model,m.location,m.status,m.asset_type,e.parentAssetFor()(m)?.name],a)).map(m=>m.id).slice(0,e.SEARCH_ID_PAGE_SIZE);p=p.or([`title.ilike.${o}`,`description.ilike.${o}`,`status.ilike.${o}`,`priority.ilike.${o}`,`requested_by_name.ilike.${o}`,`requested_by_contact.ilike.${o}`,...d.length?[`asset_id.in.(${d.join(",")})`]:[]].join(","))}return p}return{applyRequestQueryFilters:t}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:c}})();(function(){function c(e){function n(u){return e[u]()}async function t(){let u=n("searchQuery").trim();if(!u||n("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=n("assets").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.asset_code,b.manufacturer,b.model,b.location,b.status,b.asset_type,e.parentAssetFor()(b)?.name],u)).map(b=>b.id),l=n("procedureTemplates").filter(b=>e.matchesQuery([b.name,b.description,...(b.procedure_steps||[]).map(_=>_.prompt)],u)).map(b=>b.id),h=n("parts").filter(e.matchesActiveLocation).filter(b=>e.matchesQuery([b.name,b.sku,b.supplier_name,b.quantity_on_hand,b.reorder_point,b.unit_cost],u)).map(b=>b.id),y=new Set;await Promise.all([r(y,h),s(y,"work_order_comments",["body"],u),s(y,"work_order_events",["event_type","summary"],u),s(y,"work_order_photos",["file_name"],u),s(y,"work_order_step_results",["value"],u)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:l.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function r(u,g,l={}){if(!g.length)return;let y=l.maxRows??300;for(let b of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",n("activeCompanyId")).in("part_id",b),_=>{_.forEach(A=>{A.work_order_id&&u.add(A.work_order_id)}),y-=_.length},y)}catch(_){e.warn("Part-linked work order search failed",_);return}}}async function s(u,g,l,h,y={}){let b=e.postgrestSearchTerm(h);if(!b)return;let _=l.map(P=>`${P}.ilike.%${b}%`).join(","),A=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>n("supabaseClient").from(g).select("work_order_id").eq("company_id",n("activeCompanyId")).or(_),P=>{P.forEach(O=>{O.work_order_id&&u.add(O.work_order_id)})},A)}catch(P){e.warn(`${g} work order search failed`,P)}}async function p(u={}){let g=await a(),l=g.length,h=Math.max(1,Math.ceil(l/e.WORK_ORDERS_PER_PAGE));n("workOrderPage")>h&&e.setWorkOrderPage(h),n("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(n("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,b=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(O=>O.id);if(!b.length)return{data:[],error:null,count:l};let _=u.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),A=await e.fetchWorkOrdersByIds(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady"),selectClause:_,ids:b});if(A.error)return A;let P=new Map((A.data||[]).map(O=>[O.id,O]));return{...A,data:b.map(O=>P.get(O)).filter(Boolean),count:l}}async function a(){let u=[n("activeCompanyId")||"",n("locationsReady")?n("activeLocationId")||"":"all-locations",n("workSort"),n("searchQuery").trim().toLowerCase()].join("|"),g=n("exactWorkOrderSearchCache");if(g.key===u)return g.rows;let l=n("searchQuery").trim(),h=new Map;await o(h,l);let y=n("assets").filter(e.matchesActiveLocation).filter(O=>e.matchesQuery([O.name,O.asset_code,O.manufacturer,O.model,O.location,O.status,O.asset_type,e.parentAssetFor()(O)?.name],l)).map(O=>O.id),b=n("procedureTemplates").filter(O=>e.matchesQuery([O.name,O.description,...(O.procedure_steps||[]).map(C=>C.prompt)],l)).map(O=>O.id),_=n("parts").filter(e.matchesActiveLocation).filter(O=>e.matchesQuery([O.name,O.sku,O.supplier_name,O.quantity_on_hand,O.reorder_point,O.unit_cost],l)).map(O=>O.id);await Promise.all([d(h,"asset_id",y),d(h,"procedure_template_id",b)]);let A=new Set;await Promise.all([r(A,_,{maxRows:1/0}),s(A,"work_order_comments",["body"],l,{maxRows:1/0}),s(A,"work_order_events",["event_type","summary"],l,{maxRows:1/0}),s(A,"work_order_photos",["file_name"],l,{maxRows:1/0}),s(A,"work_order_step_results",["value"],l,{maxRows:1/0})]),await m(h,[...A]);let P=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:u,rows:P}),P}async function o(u,g){let l=e.postgrestSearchTerm(g);if(!l)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${l}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),y=>i(u,y))}async function d(u,g,l){if(l.length)for(let h of e.chunkArray(l,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(g,h),y=>i(u,y))}async function m(u,g){if(g.length)for(let l of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",l),h=>i(u,h))}function f(){return e.buildScopedWorkOrderSearchQuery(n("supabaseClient"),{companyId:n("activeCompanyId"),locationId:n("activeLocationId"),locationsReady:n("locationsReady")})}function i(u,g){(g||[]).forEach(l=>{l?.id&&u.set(l.id,{...u.get(l.id)||{},...l})})}return{refreshWorkOrderRelatedSearch:t,fetchExactSearchedWorkOrderPage:p,exactWorkOrderSearchRows:a,addRelatedWorkOrderIdsFromParts:r,addRelatedWorkOrderIdsFromTable:s}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:c}})();(function(){function c(e){function n(a){return e[a]()}function t(){let a=n("searchQuery").trim(),o=n("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),d=n("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],a)).sort((g,l)=>g.name.localeCompare(l.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),m=n("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],a)).sort((g,l)=>g.name.localeCompare(l.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=n("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,n("profilesByUserId")[g.requested_by]?.full_name],a)).sort((g,l)=>new Date(l.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),i=n("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],a)).sort((g,l)=>String(g.next_due_at||"").localeCompare(String(l.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),u=n("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(l=>l.prompt)],a)).sort((g,l)=>g.name.localeCompare(l.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:o,assets:d,parts:m,requests:f,pm:i,procedures:u}}function r(a="all"){let o=e.startOfToday(),d=new Date(o);return d.setDate(d.getDate()+7),n("planningWorkOrders").filter(e.matchesActiveLocation).filter(m=>m.status!=="completed").filter(m=>e.matchesSearch([m.title,m.description,m.priority,m.status,m.assets?.name,e.assignmentLabel(m)])).filter(m=>a==="no_due"?!m.due_at:!!m.due_at).map(m=>{let f=m.due_at?new Date(`${m.due_at}T00:00:00`):null;return{kind:a==="no_due"?"no_due":"work",id:m.id,title:m.title,priority:m.priority,status:m.status,assetName:m.assets?.name||"No equipment",dueAt:m.due_at,due:f,createdAt:m.created_at||"",assignedTo:e.assignmentLabel(m),workOrder:m}}).filter(m=>a==="no_due"?!0:a==="overdue"?m.due<o:a==="today"?m.due.getTime()===o.getTime():a==="soon"?m.due>o&&m.due<=d:!0).sort((m,f)=>{if(a==="no_due"){let i={critical:4,high:3,medium:2,low:1};return(i[f.priority]||0)-(i[m.priority]||0)||new Date(m.createdAt||0)-new Date(f.createdAt||0)}return m.due-f.due})}function s(){let a=e.startOfToday(),o=new Date(a);return o.setDate(o.getDate()+7),n("preventiveSchedules").filter(e.matchesActiveLocation).filter(d=>{let m=new Date(`${d.next_due_at}T00:00:00`);return m>=a&&m<=o}).filter(d=>e.matchesSearch([d.title,d.frequency,d.next_due_at,d.assets?.name])).map(d=>({kind:"pm",id:d.id,title:d.title,assetName:d.assets?.name||"No equipment",dueAt:d.next_due_at,due:new Date(`${d.next_due_at}T00:00:00`)})).sort((d,m)=>d.due-m.due)}function p(){return n("planningWorkOrders").filter(e.matchesActiveLocation).filter(a=>a.follow_up_needed).filter(a=>e.matchesSearch([a.title,a.description,a.failure_cause,a.resolution_summary,a.assets?.name,a.assigned_profile?.full_name])).map(a=>({kind:"follow_up",id:a.id,title:a.title,assetName:a.assets?.name||"No equipment",completedAt:a.completed_at?new Date(a.completed_at).toLocaleDateString():"not completed",resolution:a.resolution_summary||a.completion_notes||"",workOrder:a})).sort((a,o)=>a.title.localeCompare(o.title))}return{globalSearchResults:t,planningItems:r,planningPmItems:s,followUpItems:p}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:c}})();(function(){function c(n,t){return n.from("locations").select("*").eq("company_id",t).order("name")}function e(n,t,r){return n.from("locations").insert({company_id:t,name:r}).select("id").single()}window.MaintainOpsLocationsService={listLocations:c,createLocation:e}})();(function(){function c(p,a){return p.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",a)}function e(p,a){return p.from("company_members").select("*").eq("company_id",a).order("created_at",{ascending:!0})}function n(p,a){return p.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",a).order("created_at",{ascending:!1})}function t(p,a){return p.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",a).order("created_at",{ascending:!1})}function r(p,a){return p.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",a).order("created_at",{ascending:!1})}function s(p,a){return p.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",a).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:c,listCompanyMembers:e,listTeamInvites:n,listTeamInvitesLegacy:t,listTeamInviteLinks:r,listRequestNotificationRecipients:s}})();(function(){function c(e,n){return e.from("parts").select("*").eq("company_id",n).order("name")}window.MaintainOpsPartsService={listParts:c}})();(function(){function c(n,t){return n.from("assets").select("*").eq("company_id",t).order("name")}function e(n,t){return n.from("asset_financials").select("*").eq("company_id",t).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:c,listAssetFinancials:e}})();(function(){function c(o,d,m={}){return o.from("work_orders").select(d,m)}function e(o){return o.from("work_orders").select("id",{count:"exact",head:!0})}function n(o,d,m,f){return o.from("work_orders").select(f).eq("company_id",d).eq("id",m).maybeSingle()}function t(o,d,m,f){return o.from("work_orders").select(f).eq("company_id",d).eq("asset_id",m).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function r(o,d){let{companyId:m,locationId:f,locationsReady:i,selectClause:u,ids:g}=d,l=o.from("work_orders").select(u).eq("company_id",m).in("id",g);return i&&f&&(l=l.eq("location_id",f)),l}function s(o,d){let{companyId:m,locationId:f,locationsReady:i}=d,u=o.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",m);return i&&f&&(u=u.eq("location_id",f)),u}function p(o,d){let{companyId:m,locationId:f,locationsReady:i}=d,u=o.from("work_orders").select("id, assigned_to, status, due_at, location_id").eq("company_id",m).in("status",["open","in_progress","blocked","completed"]).not("assigned_to","is",null);return i&&f&&(u=u.eq("location_id",f)),u.order("id",{ascending:!0})}async function a(o,d,m=1/0,f=1e3){let i=0,u=0;for(;u<m;){let g=Math.min(f,m-u),{data:l,error:h}=await o().range(i,i+g-1);if(h)throw h;let y=l||[];if(d(y),u+=y.length,y.length<g)break;i+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:c,countWorkOrdersQuery:e,fetchWorkOrderById:n,fetchWorkOrdersByAsset:t,fetchWorkOrdersByIds:r,scopedWorkOrderSearchQuery:s,scopedTeamWorkloadQuery:p,fetchPagedSearchRows:a}})();(function(){function c(s){return s.rpc("get_my_companies")}function e(s,p){return s.from("company_members").select("company_id, role, default_location_id").eq("user_id",p).order("created_at",{ascending:!0})}function n(s,p){return s.from("company_members").select("company_id, role").eq("user_id",p).order("created_at",{ascending:!0})}function t(s,p){return s.from("companies").select("id, name, logo_path, created_at").in("id",p).order("created_at",{ascending:!0})}function r(s,p){return s.from("companies").select("id, name, created_at").in("id",p).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:c,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:n,listCompaniesByIds:t,listCompaniesByIdsLegacy:r}})();(function(){function c(r,s){return r.from("app_issue_reports").select("*").eq("company_id",s).order("created_at",{ascending:!1})}function e(r,s){return r.from("app_issue_reports").insert(s)}function n(r,s,p,a){return r.from("app_issue_reports").update({status:a,resolved_at:a==="resolved"?new Date().toISOString():null}).eq("company_id",s).eq("id",p)}function t(r,s,p){return r.from("app_issue_reports").delete().eq("company_id",s).eq("id",p)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:c,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:n,deleteAppIssueReportRecord:t}})();(function(){let c="user_id, shop_reference_favorites, updated_at";function e(t,r){return t.from("user_preferences").select(c).eq("user_id",r).maybeSingle()}function n(t,r,s){return t.from("user_preferences").upsert({user_id:r,shop_reference_favorites:Array.isArray(s)?s.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(c).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:n}})();var co=j(Yt()),lo=j(Kt()),uo=j(Jt()),po=j(Zt());(function(){function c(t,r,s="neutral"){return`<article class="metric dashboard-card tone-${s}"><span>${t}</span><strong>${r}</strong></article>`}function e(t,r,s,p="neutral"){return`
    <article class="insight dashboard-card tone-${p}">
      <span>${t}</span>
      <strong>${r}</strong>
      <p>${s}</p>
    </article>
  `}function n(){let t=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","accounting","manager","admin"],r=window.MaintainOpsFormatting?.roleLabel||(a=>String(a||"")),s=window.MaintainOpsFormatting?.roleDescription||(()=>""),p=window.MaintainOpsDom?.escapeHtml||(a=>String(a??""));return`
    <section class="team-role-guide">
      ${t.map(a=>`
        <article>
          <strong>${r(a)}</strong>
          <span>${p(s(a))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:c,renderInsight:e,renderRoleGuide:n})})();var fo=j(Xt());(function(){function c(f,i,u="active",g={},l){let h=l.getActiveStatusFilter(),y=g.filter||g.section,b=y?"button":"article",_=g.filter&&h===g.filter?" selected":"",A=u.includes("overdue")&&Number(i)>=3,P=A?" alert-blink":"",O=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),C=O?` ${O}`:"";return`
    <${b} class="gauge-readout ${u}${_}${P}"${C}>
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
      <strong>${i}</strong>
      <span>${l.escapeHtml(f)}</span>
    </${b}>
  `}function e(f){let i=f.getWorkOrderDashboardCounts()||{},u=i.activeWork||0,g=i.newWork||0,l=i.inProgress||0,h=i.blocked||0,y=i.overdue||0,b=i.completedAll||0,_=i.completedMonth||0,A=i.completedWeek||0,P=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${c("Active Work",u,"active",{filter:"active"},f)}
      ${c("New",g,"new",{filter:"open"},f)}
      ${c("In Progress",l,"in_progress",{filter:"in_progress"},f)}
      ${c("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${c("Overdue",y,"overdue",{filter:"overdue"},f)}
      ${c("Requests",P,"request",{filter:"requests"},f)}
      ${c("All Completed",b,"completed",{filter:"completed"},f)}
      ${c("Completed Month",_,"completed",{filter:"completed_month"},f)}
      ${c("Done This Week",A,"completed",{filter:"completed_week"},f)}
    </div>
  `}function n(f,i){let u=f||{},g=u.newWork||0,l=u.inProgress||0,h=u.blocked||0,y=u.activeWork??g+l+h,b=u.overdue||0,_=u.completedAll||0,A=u.completedMonth||0,P=u.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${c("Active Work",y,"active workload-pill",{filter:"active"},i)}
      ${c("New",g,"new workload-pill",{filter:"open"},i)}
      ${c("In Progress",l,"in_progress workload-pill",{filter:"in_progress"},i)}
      ${c("Blocked",h,"blocked workload-pill",{filter:"blocked"},i)}
      ${c("Overdue",b,"overdue workload-pill",{filter:"overdue"},i)}
      ${c("All Completed",_,"completed workload-pill",{filter:"completed"},i)}
      ${c("Completed Month",A,"completed workload-pill",{filter:"completed_month"},i)}
      ${c("Done This Week",P,"completed workload-pill",{filter:"completed_week"},i)}
    </div>
  `}function t(f){return f.getWorkOrders().filter(i=>f.getDueState(i)?.className==="overdue")}function r(f){return f.getWorkOrders().filter(i=>s(i,f))}function s(f,i,u=new Date){if(!f.completed_at)return!1;let g=new Date(f.completed_at),l=i.sundayWeekRange(u);return Number.isFinite(g.getTime())&&g>=l.start&&g<l.end}function p(f){return f.getWorkOrders().filter(a)}function a(f){let i=new Date,u=new Date(i.getFullYear(),i.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=u)}function o(f){let i=f.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!i.length)return 0;let u=i.reduce((g,l)=>g+Number(l.actual_minutes||0),0);return Math.round(u/i.length)}function d(f){let i=new Date;i.setHours(0,0,0,0);let u=new Date(i);return u.setDate(u.getDate()+7),f.getPreventiveSchedules().filter(g=>{let l=new Date(`${g.next_due_at}T00:00:00`);return l>=i&&l<=u})}function m(f){return Object.freeze({renderGaugeReadout:(i,u,g="active",l={})=>c(i,u,g,l,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:i=>n(i,f),overdueWorkOrders:()=>t(f),completedThisWeek:()=>r(f),isCompletedThisWeek:(i,u)=>s(i,f,u),completedThisMonth:()=>p(f),isCompletedThisMonth:a,averageCompletionMinutes:(i=f.getWorkOrders())=>o(i),preventiveDueSoon:()=>d(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:m})})();(function(){function c(n){let t={active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.all}</svg>`}function e(n){let t={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${t[n]||t.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:c,navIcon:e})})();(function(){function c(n){let t={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return t[n]?t[n]:String(n||"machine").replaceAll("_"," ").replace(/\b\w/g,r=>r.toUpperCase())}function e(n){return n==="offline"?"Offline / Down":String(n||"running").replaceAll("_"," ").replace(/\b\w/g,t=>t.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:c,assetStatusLabel:e})})();(function(){function c({getSearchQuery:e,getAssetStatusFilter:n,getAssetTypeFilter:t,getPartSearchQuery:r,getPartInventoryFilter:s,assetTypeLabel:p,assetStatusLabel:a}){function o(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function d(){let f=n(),i=t?t():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${a(f).toLowerCase()} equipment found.`:i!=="all"?`No ${p(i).toLowerCase()} equipment found.`:"No equipment added yet."}function m(){return r().trim()?"No parts match this search.":s()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:o,assetEmptyStateText:d,partEmptyStateText:m}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:c}})();var wo=j(en());(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,activeLocationName:r,getSearchQuery:s}){function p(l){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(l)} previewed in ${e(r())}</span>
          </div>
          <div class="global-search-grid">
            ${a("Work Orders",l.work,o,"work",{showWorkSearchAction:!!s().trim()})}
            ${a("Equipment",l.assets,d,"asset")}
            ${a("Parts",l.parts,m,"parts")}
            ${a("Requests",l.requests,f,"comment")}
            ${a("PM",l.pm,i,"procedure")}
            ${a("Procedure Checklists",l.procedures,u,"procedure")}
          </div>
        </section>
      `}function a(l,h,y,b,_={}){return`
        <section class="global-result-group relationship-detail ${b}">
          <div class="panel-header compact">
            <h3>${e(l)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${_.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function o(l){return`
        <button class="global-result-item" data-search-work-order="${l.id}" type="button">
          <strong>${e(l.title)}</strong>
          <span>${n(l.status)} - ${e(l.assets?.name||"No equipment")} - ${e(t(l))}</span>
        </button>
      `}function d(l){return`
        <button class="global-result-item" data-search-asset="${l.id}" type="button">
          <strong>${e(l.name)}</strong>
          <span>${e(l.asset_code||"No serial")} - ${e(l.status)} - ${e(l.location||r())}</span>
        </button>
      `}function m(l){let h=Number(l.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${l.id}" type="button">
          <strong>${e(l.name)}</strong>
          <span>${e(l.sku||"No SKU")} - ${h} on hand${l.supplier_name?` - ${e(l.supplier_name)}`:""}</span>
        </button>
      `}function f(l){return`
        <button class="global-result-item" data-search-request="${l.id}" type="button">
          <strong>${e(l.title)}</strong>
          <span>${e(l.status)} - ${e(l.assets?.name||"No equipment")}</span>
        </button>
      `}function i(l){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(l.title)}" type="button">
          <strong>${e(l.title)}</strong>
          <span>${e(l.assets?.name||"No equipment")} - due ${e(l.next_due_at||"unset")}</span>
        </button>
      `}function u(l){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(l.name)}" type="button">
          <strong>${e(l.name)}</strong>
          <span>${(l.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(l){return Object.values(l).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:p,renderGlobalResultGroup:a,renderGlobalWorkResult:o,renderGlobalAssetResult:d,renderGlobalPartResult:m,renderGlobalRequestResult:f,renderGlobalPmResult:i,renderGlobalProcedureResult:u,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:c}})();var ko=j(tn());(function(){function c({escapeHtml:e,LIST_ITEMS_PER_PAGE:n,getPlanningPage:t,getPlanningGroupOpen:r=(d,m)=>m,renderListPagination:s,statusLabel:p,renderRelationshipChips:a,canEditOperationalRecords:o=()=>!0}){function d(u,g,l,h,y={}){let b=n||12,_=typeof t=="function"?t(h):1,A=Math.max(1,Math.ceil(g.length/b)),P=Math.min(Math.max(_,1),A),O=g.slice((P-1)*b,P*b),C=r(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${C?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(u)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${l}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${O.map(i).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof s=="function"?s(`planning-${h}`,g.length,P,A):""}
          </div>
        </details>
      `}function m(u,g,l,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(u)}</h3>
            <p>${e(g)}</p>
          </header>
          ${l}
        </section>
      `}function f(u){return`
        <div class="planning-grid">
          ${m("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${d("No Due Date",u.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${d("Follow-up Needed",u.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${m("Current schedule","Work requiring attention now.",`
            ${d("Overdue",u.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${d("Due Today",u.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${m("Upcoming","Near-term maintenance and preventive work.",`
            ${d("Next 7 Days",u.soon,"in_progress","soon")}
            ${d("PM Due Soon",u.pm,"open","pm")}
          `)}
        </div>
      `}function i(u){if(u.kind==="follow_up")return`
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
        `;if(u.kind==="no_due"){let g=u.createdAt?new Date(u.createdAt):null,l=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(u.priority)} ${e(p(u.status))}</span>
              <strong>${e(u.title)}</strong>
              <p>${e(u.assetName)} - ${e(u.assignedTo||"Unassigned")}</p>
              <p>Created ${e(l)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(u.id)}" type="button">Open Work Order</button>
              ${o()?`
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
            <span class="eyebrow">${e(u.priority)} ${e(p(u.status))}</span>
            <strong>${e(u.title)}</strong>
            <p>${e(u.assetName)} - due ${e(u.dueAt)}</p>
          </div>
          ${a(u.workOrder)}
        </article>
      `}return{renderPlanningGroup:d,renderPlanningBoard:f,renderPlanningItem:i}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:c}})();var So=j(nn());(function(){function c({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:n,ASSETS_PER_PAGE:t,LIST_ITEMS_PER_PAGE:r,getWorkOrderPage:s,getPartsPage:p,getAssetsPage:a}){function o(i,u){if(i<=e)return"";let g=s(),l=(g-1)*e+1,h=Math.min(i,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${l}-${h} of ${i} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}function d(i,u){if(i<=n)return"";let g=p(),l=(g-1)*n+1,h=Math.min(i,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${l}-${h} of ${i} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}function m(i,u){if(i<=t)return"";let g=a(),l=(g-1)*t+1,h=Math.min(i,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${l}-${h} of ${i} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}function f(i,u,g,l){if(u<=r)return"";let h=(g-1)*r+1,y=Math.min(u,g*r);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${i}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${u} - Page ${g} of ${l}</span>
          <button class="secondary-button page-action-button" data-list-page="${i}" data-page-direction="next" type="button" ${g>=l?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:o,renderPartsPagination:d,renderAssetsPagination:m,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:c}})();var Co=j(rn());(function(){function c({escapeHtml:e,getLocations:n,getActiveLocationId:t,getAssets:r,matchesActiveLocation:s,isAssetDescendantOf:p,parentAssetFor:a}){function o(g=t()){return n().map(l=>`<option value="${l.id}" ${l.id===g?"selected":""}>${e(l.name)}</option>`).join("")}function d(g){let l=a(g);return l?`${g.name} - part of ${l.name}`:g.name}function m(g=""){let l=r().filter(s).sort((b,_)=>d(b).localeCompare(d(_))),h=g?r().find(b=>b.id===g):null;return(h&&!l.some(b=>b.id===h.id)?[h,...l]:l).map(b=>`<option value="${b.id}" ${b.id===g?"selected":""}>${e(d(b))}</option>`).join("")}function f(g="",l=""){return r().filter(s).filter(h=>h.id!==l&&!p(h.id,l)).sort((h,y)=>d(h).localeCompare(d(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(d(h))}</option>`).join("")}function i(g=""){let l=[...new Set(r().filter(s).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,b)=>y.localeCompare(b)),h=String(g||"").trim();return h&&!l.includes(h)?[h,...l]:l}function u(g=""){return i(g).map(l=>`<option value="${e(l)}" ${l===g?"selected":""}>${e(l)}</option>`).join("")}return{renderLocationOptions:o,renderAssetOptions:m,renderParentAssetOptions:f,renderAssetAreaOptions:u,assetOptionLabel:d}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:c}})();(function(){function c({escapeHtml:e,requestPhotoMetaText:n,getRequestPhotosReady:t}){function r(s){if(!s.photo_storage_path)return"";let p=s.photo_file_name||s.photo_original_file_name||"Request photo",a=n(s);return`
        <div class="request-photo-preview">
          ${s.photoSignedUrl&&s.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(s.photoSignedUrl)}" alt="${e(p)}">`:""}
          <div>
            <strong>${e(p)}</strong>
            <span>${e(a)}</span>
            ${s.photoSignedUrl?`<a href="${e(s.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${t()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:r}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:c}})();(function(){function c({directUnreadMessages:e,totalUnreadMessages:n}){function t(){let r=e();if(r>0)return`<b class="nav-badge nav-alert-badge">${r}!</b>`;let s=n();return s>0?`<b class="nav-badge">${s}</b>`:""}return{renderMessageNavBadge:t}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:c}})();(function(){function c(){function e(r){let s=Number(r);return!Number.isFinite(s)||s<=0?0:Math.floor(s)}function n(r){let s=e(r);return s?s>99?"99+":String(s):""}function t(r,s={}){let p=n(r);if(!p)return"";let a=s.alert?" nav-alert-badge":"",o=s.alertSuffix?"!":"";return`<b class="nav-badge${a}">${p}${o}</b>`}return{navBadgeText:n,renderNavCountBadge:t}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProfilesByUserId:n,getLocations:t}){function r(s){let p=n()[s.reporter_id]?.full_name||"Team member",a=t().find(m=>m.id===s.location_id)?.name||"No location",o=s.status||"open",d=s.severity||"normal";return`
        <article class="issue-report-card issue-${o}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${d==="blocking"?"critical":d==="minor"?"completed":"open"}">${e(d)}</span>
              <span class="chip issue-status-chip issue-status-${o}">${e(o)}</span>
              <span>${e(a)}</span>
              <span>${s.created_at?new Date(s.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(s.title)}</strong>
            <p>${e(s.details||"")}</p>
            <small>${e(p)} - ${e(s.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(s.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(m=>`<option value="${m}" ${m===o?"selected":""}>${m}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(s.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:r}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,messageThreadScopeLabel:t,getMessageThreads:r,getMessagesByThreadId:s,getMessageWorkOrderLinksReady:p}){function a(d){let m=s()[d.id]||[],f=m[m.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(d.title)}</strong>
            <span>${e(t(d))}${f?` - ${e(n(f.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${d.id}" type="button">Open Thread</button>
        </article>
      `}function o(d){let m=r().filter(f=>f.work_order_id===d.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${d.id}" type="button">Message Team</button>
            ${p()?`
              <div class="work-linked-thread-list">
                ${m.map(a).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:o,renderLinkedWorkMessageThread:a}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:c}})();(function(){function c({escapeHtml:e,recommendedWorkOrderStep:n}){function t(r){let s=n(r);return s?`
        <section class="work-recommendation ${s.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(s.title)}</strong>
            <p>${e(s.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${s.target}" type="button">${e(s.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:t}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:c}})();(function(){function c({escapeHtml:e}){function n(r,s,p,a,o){return`
        <button class="command-card command-${o} ${s?"":"empty"}" data-jump-work-section="${p}" type="button">
          <span>${e(r)}</span>
          <strong>${s}</strong>
          <small>${e(a)}</small>
        </button>
      `}function t(r){return r.asset_id?n("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:t,commandShortcut:n}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,statusLabel:n,assignmentLabel:t,isVendorAssigned:r,hasCompletedSafetyDeviceCheck:s,renderEmailHelperCommandCard:p,getMessageThreads:a,getPartsUsedByWorkOrder:o}){function d(m){let f=a().filter(l=>l.work_order_id===m.id).length,i=(o()[m.id]||[]).reduce((l,h)=>l+(Number(h.quantity_used)||0),0),u=m.asset_id?s(m)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=m.status==="completed"?"Review history or create follow-up if needed":m.status==="blocked"?"Resolve blocker or add current update":m.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
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
          <button class="command-card safety-${u[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${u[0]}</strong>
            <small>${e(u[1])}</small>
          </button>
          ${p(m)}
        </section>
      `}return{renderWorkOrderCommandSummary:d}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:c}})();(function(){function c(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getPartSources:n,getPartSuppliersReady:t}){function r(){return`
        <datalist id="part-source-options">
          ${n().map(a=>`<option value="${e(a)}"></option>`).join("")}
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
              ${p.map(a=>`
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
      `}return{renderPartSourceOptions:r,renderPartSourceManager:s}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:c}})();(function(){function c({escapeHtml:e,assetTypeLabel:n,getWorkOrders:t,getActiveAssetId:r,parentAssetFor:s,childAssetsFor:p}){function a(o){let d=t().filter(i=>i.asset_id===o.id&&i.status!=="completed").length,m=s(o),f=p(o.id);return`
        <article class="asset-card asset-state-${o.status} ${o.id===r()?"selected":""}" data-asset-id="${o.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${o.status}">${e(o.status)}</span>
              <span class="chip">${e(n(o.asset_type))}</span>
              ${o.asset_code?`<span class="chip">${e(o.asset_code)}</span>`:""}
              ${o.manufacturer?`<span class="chip">${e(o.manufacturer)}</span>`:""}
              ${o.model?`<span class="chip">${e(o.model)}</span>`:""}
              ${o.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h3>${e(o.name)}</h3>
            <p>${e(o.location||"No location set")}</p>
            ${m?`<p>Part of ${e(m.name)}</p>`:""}
            ${f.length?`<p>${f.length} linked item${f.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${d} open work</span>
        </article>
      `}return{renderAssetCard:a}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:c}})();(function(){function c({escapeHtml:e,getProceduresReady:n,getProcedureTemplates:t}){function r(s=""){return n()?`
        <option value="">No procedure checklist</option>
        ${t().map(p=>`<option value="${p.id}" ${p.id===s?"selected":""}>${e(p.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:r}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:c}})();(function(){function c({getLocations:e,getMessageThreadMembers:n,teamMemberName:t}){function r(p){let a=n().filter(o=>o.thread_id===p.id).map(o=>t(o.user_id));return a.length?a.join(", "):"Direct message"}function s(p){return p.thread_type==="direct"?r(p):p.thread_type==="location"?e().find(a=>a.id===p.location_id)?.name||"Location thread":"Whole company"}return{directThreadNames:r,messageThreadScopeLabel:s}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:c}})();(function(){function c({escapeHtml:e,formatMessageTime:n,teamMemberName:t,messageThreadScopeLabel:r,unreadMessageCount:s,getMessagesByThreadId:p,getActiveMessageThreadId:a}){function o(d){let f=(p()[d.id]||[]).filter(h=>!h.deleted_at),i=f[f.length-1],u=s(d.id),g=i?.body?`${e(t(i.sender_id))}: ${e(i.body)}`:"Last activity",l=i?`${g} - ${e(n(i.created_at))}`:"No messages yet";return`
        <button class="message-thread-button ${d.id===a()?"active":""}" data-message-thread="${d.id}" type="button">
          <strong>${e(d.title)}${u?`<span class="message-unread-pill">${u}</span>`:""}</strong>
          <span>${e(r(d))}</span>
          <small>${l}</small>
        </button>
      `}return{renderMessageThreadButton:o}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:c}})();(function(){function c({activeLocationName:e}){function n(t){return t==="direct"?"Only you and the selected teammate will see this thread.":t==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:n}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:c}})();var Qo=j(an());(function(){function c({getLocations:e}){function n(t){let r=e().find(s=>s.id===t.default_location_id);return r?`Default location: ${r.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:n}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:c}})();(function(){function c({getPartCostsReady:e,getPartSuppliersReady:n,getPartMachineNotesReady:t}){function r(){let s=[];return e()||s.push("Run supabase/step-next-part-costs.sql before saving unit costs."),n()||s.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),t&&!t()&&s.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),s.join(" ")}return{partSetupMessage:r}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getLocations().find(t=>t.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:n}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:c}})();(function(){function c(e){function n(s){return s.assets?.name||"Equipment"}function t(s){return`Machine Down Update - ${n(s)} - ${new Date().toLocaleString()}`}function r(s){let p=n(s),a=s.due_at?`known, target ${e.formatDate(s.due_at)}`:"unknown at this time",o=e.assignmentLabel(s),d=e.cleanWorkOrderDescription(s.description)||s.title,m=s.resolution_summary||s.failure_cause||s.completion_notes||"No additional update has been entered yet.";return[`${p} is down or needs maintenance attention. At this time, the expected downtime is ${a}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${d}`,`Work order: ${s.title}`,`Equipment: ${p}`,`Current update: ${m}`,`Assigned to: ${o}`,`Priority: ${s.priority||"medium"}`,`ETA / due date: ${s.due_at?e.formatDate(s.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:t,downtimeEmailBody:r}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:c}})();(function(){function c(){function e(t){let r=t?.message||"";return r.includes("assets_asset_type_check")||r.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function n(t="this save"){return`Database update required before ${t}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:n}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:c}})();(function(){function c(){function e(n){let t=n?.message||"Unknown error";return t.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":t.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":t}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isVendorAssigned(t)?"Outside vendor":t.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:n}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:c}})();(function(){function c(e){function n(s){return String(s||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function t(s,p){let a=n(s);return p!==e.OUTSIDE_VENDOR_VALUE?a||null:[a,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function r(s,p){let a=String(s||"").trim();if(!p?.photo_storage_path)return a||null;let o="[Request photo attached to original request]";return a?`${a}

${o}`:o}return{cleanWorkOrderDescription:n,descriptionWithAssignmentNote:t,descriptionWithRequestPhotoNote:r}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:c}})();(function(){function c(){function e(n,t){if(!n)return"Work order updated.";let r=[];return n.title!==t.title&&r.push("title"),(n.description||"")!==(t.description||"")&&r.push("description"),(n.due_at||"")!==(t.due_at||"")&&r.push("due date"),n.priority!==t.priority&&r.push("priority"),(n.type||"corrective")!==t.type&&r.push("type"),(n.assigned_to||"")!==(t.assigned_to||"")&&r.push("assignment"),(n.procedure_template_id||"")!==(t.procedure_template_id||"")&&r.push("procedure"),String(n.actual_minutes||0)!==String(t.actual_minutes||0)&&r.push("actual minutes"),r.length?`Updated ${r.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:c}})();(function(){function c(){function e(n,t,r,s=[]){return[...n.map(p=>({...p,type:"comment"})),...t.map(p=>({...p,type:"photo"})),...s.map(p=>({...p,type:"part"})),...r.map(p=>({...p,type:"event"}))].sort((p,a)=>new Date(a.created_at)-new Date(p.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:c}})();(function(){function c(e){function n(a){return Number(a.quantity_on_hand)<=Number(a.reorder_point)}function t(){return e.getParts().filter(n)}function r(a){let o=e.getPartSearchQuery().trim().toLowerCase();return o?a.some(d=>String(d??"").toLowerCase().includes(o)):!0}function s(){let a=e.getParts().filter(o=>!e.matchesActiveLocation(o)||e.getPartInventoryFilter()==="low"&&!n(o)?!1:r([o.name,o.sku,o.supplier_name,o.machine_note,o.quantity_on_hand,o.reorder_point,o.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...a].sort((o,d)=>{let m=String(o.supplier_name||"zzzzzz").localeCompare(String(d.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return m||String(o.name||"").localeCompare(String(d.name||""),void 0,{sensitivity:"base"})}):a}function p(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(a=>String(a.supplier_name||"").trim()).filter(Boolean))].sort((a,o)=>a.localeCompare(o))}return{isLowStockPart:n,lowStockParts:t,filteredParts:s,matchesPartSearch:r,partSourceOptions:p}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:c}})();(function(){function c(e){function n(t){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(r=>r.part_id===t)}return{partUsageRows:n}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getMaintenanceRequests().filter(o=>o.status==="submitted")}function t(o){return e.matchesActiveLocation(o)&&e.matchesSearch([o.title,o.description,o.status,o.priority,o.assets?.name,e.getProfilesByUserId()[o.requested_by]?.full_name])}function r(o){return o.status==="converted"||!!o.converted_work_order_id}function s(o,d=e.getRequestViewFilter()){return d==="converted"?r(o):d==="all"?!0:!r(o)&&o.status==="submitted"}function p(o=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(d=>t(d)&&s(d,o))}function a(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:n,requestMatchesBaseFilters:t,isConvertedRequest:r,requestMatchesViewFilter:s,filteredRequests:p,requestFilterCounts:a}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:c}})();(function(){function c(){function e(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.children?`${t.children} linked equipment item${t.children===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:"",t.requests?`${t.requests} request${t.requests===1?"":"s"}`:""].filter(Boolean);return r.length?`This equipment is kept for traceability because it has ${r.join(", ")}.`:""}function n(t){let r=[t.workOrders?`${t.workOrders} work order${t.workOrders===1?"":"s"}`:"",t.schedules?`${t.schedules} PM schedule${t.schedules===1?"":"s"}`:""].filter(Boolean);return r.length?`This procedure is kept for traceability because it is linked to ${r.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:n}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:c}})();(function(){function c(e){function n(p){return e.getAssets().find(a=>a.id===p?.parent_asset_id)||null}function t(p){return e.getAssets().filter(a=>a.parent_asset_id===p).sort((a,o)=>a.name.localeCompare(o.name))}function r(p,a){if(!p||!a)return!1;let o=e.getAssets().find(m=>m.id===p),d=new Set;for(;o?.parent_asset_id&&!d.has(o.id);){if(o.parent_asset_id===a)return!0;d.add(o.id),o=e.getAssets().find(m=>m.id===o.parent_asset_id)}return!1}function s(){return e.getAssets().filter(p=>!e.matchesActiveLocation(p)||e.getAssetStatusFilter()!=="all"&&p.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(p.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(p.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([p.name,p.asset_code,p.manufacturer,p.model,p.location,p.status,p.asset_type,n(p)?.name]))}return{filteredAssets:s,parentAssetFor:n,childAssetsFor:t,isAssetDescendantOf:r}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:c}})();var ai=j(on());(function(){function c(e){function n(r){let s=e.getSearchQuery().trim().toLowerCase();return s?r.some(p=>String(p??"").toLowerCase().includes(s)):!0}function t(r,s=e.getSearchQuery()){let p=s.trim().toLowerCase();return p?r.some(a=>String(a??"").toLowerCase().includes(p)):!0}return{matchesSearch:n,matchesQuery:t}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:c}})();(function(){function c(e){function n(a){return a.due_at?new Date(`${a.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function t(a){return{low:1,medium:2,high:3,critical:4}[a]||0}function r(a){return a.completed_at?new Date(a.completed_at).getTime():0}function s(a){return typeof e.assignmentLabel=="function"?e.assignmentLabel(a):a.assigned_profile?.full_name||a.assigned_to||"Unassigned"}function p(a,o){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?r(o)-r(a)||new Date(o.created_at)-new Date(a.created_at):e.getWorkSort()==="due"?n(a)-n(o)||new Date(o.created_at)-new Date(a.created_at):e.getWorkSort()==="priority"?t(o.priority)-t(a.priority)||n(a)-n(o):e.getWorkSort()==="type"?String(a.type||"").localeCompare(String(o.type||""))||new Date(o.created_at)-new Date(a.created_at):e.getWorkSort()==="assigned"?s(a).localeCompare(s(o))||new Date(o.created_at)-new Date(a.created_at):new Date(o.created_at)-new Date(a.created_at)}return{compareWorkOrders:p,dueSortValue:n,prioritySortValue:t,completedSortValue:r,assigneeSortLabel:s}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:c}})();(function(){function c(e){function n(r){return r?.location_id||r?.assets?.location_id||null}function t(r){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:n(r)===e.getActiveLocationId()}return{recordLocationId:n,matchesActiveLocation:t}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:c}})();(function(){function c(e){function n(){return e.getWorkOrders().filter(o=>e.matchesActiveLocation(o)&&o.status!=="completed").slice(0,8)}function t(){let o=e.getMessageThreadFilter();return e.getMessageThreads().filter(d=>(o==="all"||o==="unread"&&s(d.id)>0||d.thread_type===o)&&e.matchesQuery(r(d),e.getMessageSearchQuery()))}function r(o){let d=e.getMessagesByThreadId()[o.id]||[],m=e.getMessageThreadMembers().filter(f=>f.thread_id===o.id).map(f=>e.teamMemberName(f.user_id));return[o.title,e.messageThreadScopeLabel(o),...m,...d.map(f=>f.body||"")]}function s(o){let d=e.getMessageReadsByThreadId()[o]?.last_read_at,m=d?new Date(d).getTime():0;return(e.getMessagesByThreadId()[o]||[]).filter(f=>f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>m).length}function p(){return e.getMessageThreads().reduce((o,d)=>o+s(d.id),0)}function a(){return e.getMessageThreads().filter(o=>o.thread_type==="direct").reduce((o,d)=>o+s(d.id),0)}return{recentMessageLinkWorkOrders:n,filteredMessageThreads:t,messageThreadSearchValues:r,unreadMessageCount:s,totalUnreadMessages:p,directUnreadMessages:a}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let r=e.getActiveStatusFilter();return r==="overdue"?e.getDueState(t)?.className==="overdue":r==="completed_month"?e.isCompletedThisMonth(t):r==="completed_week"?e.isCompletedThisWeek(t):r==="active"||r==="all"?t.status!=="completed":t.status===r}return{workOrderMatchesStatusFilter:n}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:c}})();(function(){function c(e){function n(t){let r=e.getPartsUsedByWorkOrder()[t.id]||[],s=e.getCommentsByWorkOrder()[t.id]||[],p=e.getEventsByWorkOrder()[t.id]||[],a=e.getPhotosByWorkOrder()[t.id]||[],o=e.getProcedureTemplates().find(f=>f.id===t.procedure_template_id),d=Object.values(e.getStepResultsByWorkOrder()[t.id]||{}),m=e.getProfilesByUserId();return[t.title,t.description,t.status,e.statusLabel(t.status),t.priority,t.type,t.assets?.name,e.assignmentLabel(t),t.failure_cause,t.resolution_summary,t.completion_notes,t.current_update,o?.name,o?.description,...(o?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...r.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...s.flatMap(f=>[f.body,m[f.author_id]?.full_name]),...p.flatMap(f=>[f.event_type,f.summary,m[f.actor_id]?.full_name]),...a.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...d.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:n}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:c}})();(function(){function c(e){function n(){let t=e.getCurrentUser()?.id;return e.getWorkOrders().filter(r=>e.matchesActiveLocation(r)?(e.getMyWorkFilter()==="created"?r.created_by===t:r.assigned_to===t)&&e.matchesSearch(e.workOrderSearchValues(r)):!1)}return{myWorkQueueOrders:n}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isMissingColumnError(t,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(t,["message_threads","message_thread_members","messages"])||String(t?.message||"").includes("message_threads")?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:t?.message||String(t),messagesReady:null}}return{messageCenterErrorState:n}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:c}})();(function(){function c(e){function n(t){return e.isColumnSchemaError(t,["app_issue_reports"])||String(t?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:t?.message||String(t),appIssueReportsReady:null}}return{appIssueReportErrorState:n}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:c}})();var fi=j(sn()),gi=j(cn()),hi=j(ln()),yi=j(un()),bi=j(dn()),wi=j(pn()),vi=j(mn()),ki=j(fn());(function(){function c(t){if(!t)return"";let r=new Date(t),s=new Date,p=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),a=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),o=r.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return a===p?`Today ${o}`:a===p-864e5?`Yesterday ${o}`:r.toLocaleDateString([],{month:"short",day:"numeric"})}function e(t){if(!t)return"";let r=new Date(t),s=new Date,p=new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime(),a=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime();return a===p?"Today":a===p-864e5?"Yesterday":r.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function n(t){let r=String(t||"").trim().split(/\s+/).filter(Boolean);return r.length?r.slice(0,2).map(s=>s[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:c,formatMessageDay:e,initials:n})})();(function(){function c(e){function n(r){let s=r.sender_id===e.getCurrentUserId(),p=e.teamMemberName(r.sender_id);return`
    <article class="message-bubble ${s?"mine":""}">
      <span class="message-avatar" aria-hidden="true">${e.escapeHtml(e.initials(p))}</span>
      <div class="message-bubble-meta">
        <strong>${e.escapeHtml(p)}</strong>
        <span>${e.escapeHtml(e.formatMessageTime(r.created_at))}</span>
      </div>
      <p>${e.escapeHtml(r.body)}</p>
      ${s?`<button class="message-delete-button" data-delete-message="${e.escapeHtml(r.id)}" type="button">Delete</button>`:""}
    </article>
  `}function t(r){let s=r.filter(a=>!a.deleted_at);if(!s.length)return'<p class="muted">No messages yet.</p>';let p="";return s.map(a=>{let o=e.formatMessageDay(a.created_at),d=o!==p?`<div class="message-day-divider"><span>${e.escapeHtml(o)}</span></div>`:"";return p=o,`${d}${n(a)}`}).join("")}return Object.freeze({renderMessageBubble:n,renderMessageList:t})}window.MaintainOpsMessageDisplay=Object.freeze({createMessageDisplayHelpers:c})})();})();
//# sourceMappingURL=runtime.3f52616733.js.map
