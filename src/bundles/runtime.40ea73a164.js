(()=>{var gn=Object.create;var ht=Object.defineProperty;var hn=Object.getOwnPropertyDescriptor;var yn=Object.getOwnPropertyNames;var bn=Object.getPrototypeOf,wn=Object.prototype.hasOwnProperty;var B=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var vn=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of yn(e))!wn.call(s,a)&&a!==t&&ht(s,a,{get:()=>e[a],enumerable:!(n=hn(e,a))||n.enumerable});return s};var j=(s,e,t)=>(t=s!=null?gn(bn(s)):{},vn(e||!s||!s.__esModule?ht(t,"default",{value:s,enumerable:!0}):t,s));var yt=B((_n,Oe)=>{(function(){let s=new Set(["session_start","fcp_ms","lcp_ms","inp_ms","cls","workspace_ready_ms","section_navigation_ms","query_latency_ms","client_error","offline_event","reconnect_ms","connection_downlink_mbps","connection_rtt_ms","spatial_ready_ms","spatial_fps","spatial_frame_ms","spatial_slow_frame_pct","spatial_draw_calls","spatial_triangles","spatial_geometries","spatial_textures","webgl_context_loss"]),e={session_start:"count",fcp_ms:"ms",lcp_ms:"ms",inp_ms:"ms",cls:"score",workspace_ready_ms:"ms",section_navigation_ms:"ms",query_latency_ms:"ms",client_error:"count",offline_event:"count",reconnect_ms:"ms",connection_downlink_mbps:"mbps",connection_rtt_ms:"ms",spatial_ready_ms:"ms",spatial_fps:"fps",spatial_frame_ms:"ms",spatial_slow_frame_pct:"percent",spatial_draw_calls:"count",spatial_triangles:"count",spatial_geometries:"count",spatial_textures:"count",webgl_context_loss:"count"},t=typeof window<"u"?window:null,n=typeof document<"u"?document:null,a=typeof navigator<"u"?navigator:{},i=()=>typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now(),m=i(),r={client:null,companyId:"",pending:[],latest:{},flushTimer:null,disabledUntil:0,configuredCompanyId:"",workspaceCompanies:new Set,persistedVitals:new Set,workspaceStartedAt:m,navigationStartedAt:i(),offlineStartedAt:0},c=new Map,d=0;function p(b){if(b==null||b==="")return null;let E=Number(b);return Number.isFinite(E)&&E>=0?E:null}function f(){let b=a.connection||a.mozConnection||a.webkitConnection,E=t?.matchMedia?.("(pointer: coarse)")?.matches,T=p(a.deviceMemory),D=p(a.hardwareConcurrency),I=T!==null&&T<=4||D!==null&&D<=4||E?"constrained":"standard",k=p(t?.innerWidth);return{source:"browser",device_tier:I,viewport_class:k!==null&&k<720?"mobile":k!==null&&k<1100?"tablet":"desktop",connection_type:String(b?.effectiveType||"unknown").slice(0,24),online:a.onLine!==!1,save_data:!!b?.saveData}}function o(b={}){let E={...f(),...b};return Object.fromEntries(Object.entries(E).filter(([,T])=>T!=null&&T!==""))}function l(b=12e3){!r.client||!r.companyId||r.flushTimer||Date.now()<r.disabledUntil||typeof t?.setTimeout=="function"&&(r.flushTimer=t.setTimeout(()=>{r.flushTimer=null,u()},b))}function g(b,E,T={},D={}){if(!s.has(b))return!1;let I=p(E);if(I===null)return!1;let k=Number(I.toFixed(b==="cls"?4:2));return r.latest[b]={metric:b,value:k,unit:e[b],context:o(T),measuredAt:new Date().toISOString()},D.persist!==!1&&(r.pending.push({metric:b,value:k,unit:e[b],context:o(T)}),r.pending.length>60&&r.pending.splice(0,r.pending.length-60),l(D.immediate?250:12e3)),!0}async function u(){if(!r.client||!r.companyId||!r.pending.length||Date.now()<r.disabledUntil)return!1;let b=r.companyId,E=r.pending.splice(0,20),T=null;try{T=(await r.client.rpc("record_app_performance_samples",{target_company_id:b,samples:E})).error||null}catch(I){T=I}if(!T)return r.pending.length&&l(1e3),!0;r.companyId===b&&r.pending.unshift(...E);let D=String(T.message||T).toLowerCase();return r.disabledUntil=Date.now()+(D.includes("could not find")||D.includes("does not exist")?3e5:6e4),!1}function h({client:b,companyId:E}){if(r.client=b||null,r.companyId=E||"",!(!r.client||!r.companyId)){if(r.configuredCompanyId!==r.companyId){r.configuredCompanyId&&(r.workspaceStartedAt=i()),r.configuredCompanyId=r.companyId,g("session_start",1,{source:"workspace"},{immediate:!0});let T=a.connection||a.mozConnection||a.webkitConnection;p(T?.downlink)!==null&&g("connection_downlink_mbps",T.downlink,{source:"browser-estimate"}),p(T?.rtt)!==null&&g("connection_rtt_ms",T.rtt,{source:"browser-estimate"})}l(250)}}function y(b){!b||r.workspaceCompanies.has(b)||(r.workspaceCompanies.add(b),g("workspace_ready_ms",i()-r.workspaceStartedAt,{source:"app-shell"},{immediate:!0}),t?.setTimeout?.(w,1e3))}function w(){Object.values(r.latest).filter(b=>["fcp_ms","lcp_ms","inp_ms","cls"].includes(b.metric)).forEach(b=>{r.persistedVitals.has(b.metric)||g(b.metric,b.value,{source:"performance-observer"})&&r.persistedVitals.add(b.metric)})}function _(){r.navigationStartedAt=i()}function P(b,E=r.navigationStartedAt){g("section_navigation_ms",i()-E,{source:String(b||"workspace").slice(0,48)})}function $(b,E,T=null){g("query_latency_ms",i()-E,{source:String(b||"query").slice(0,48)}),T&&g("client_error",1,{source:`query:${String(b||"unknown").slice(0,36)}`},{immediate:!0})}function A(b={}){let E={source:"performance-room",quality_tier:b.qualityTier||"unknown"};Object.entries({spatial_ready_ms:b.readyMs,spatial_fps:b.fps,spatial_frame_ms:b.frameMs,spatial_slow_frame_pct:b.slowFramePercent,spatial_draw_calls:b.drawCalls,spatial_triangles:b.triangles,spatial_geometries:b.geometries,spatial_textures:b.textures,webgl_context_loss:Number(b.contextLosses)>0?b.contextLosses:void 0}).forEach(([T,D])=>{p(D)!==null&&g(T,D,E)}),l(500)}function C(){return{latest:{...r.latest},connection:f(),pendingCount:r.pending.length}}function v(b,E,T={buffered:!0}){if(!(!t||!("PerformanceObserver"in t)||!PerformanceObserver.supportedEntryTypes?.includes(b)))try{new PerformanceObserver(I=>E(I.getEntries())).observe({type:b,...T})}catch{}}v("paint",b=>{let E=b.find(T=>T.name==="first-contentful-paint");E&&g("fcp_ms",E.startTime,{source:"performance-observer"},{persist:!1})}),v("largest-contentful-paint",b=>{let E=b.at(-1);E&&g("lcp_ms",E.startTime,{source:"performance-observer"},{persist:!1})}),v("layout-shift",b=>{b.forEach(E=>{E.hadRecentInput||(d+=E.value)}),g("cls",d,{source:"performance-observer"},{persist:!1})}),v("event",b=>{b.forEach(T=>{T.interactionId&&c.set(T.interactionId,Math.max(c.get(T.interactionId)||0,T.duration))});let E=[...c.values()].sort((T,D)=>D-T);E.length&&g("inp_ms",E[Math.min(Math.floor(E.length/50),10)],{source:"performance-observer"},{persist:!1})},{buffered:!0,durationThreshold:40}),t?.addEventListener?.("error",()=>g("client_error",1,{source:"window-error"},{immediate:!0})),t?.addEventListener?.("unhandledrejection",()=>g("client_error",1,{source:"unhandled-rejection"},{immediate:!0})),t?.addEventListener?.("offline",()=>{r.offlineStartedAt=i(),g("offline_event",1,{source:"network"},{immediate:!0})}),t?.addEventListener?.("online",()=>{r.offlineStartedAt&&g("reconnect_ms",i()-r.offlineStartedAt,{source:"network"},{immediate:!0}),r.offlineStartedAt=0}),n?.addEventListener?.("visibilitychange",()=>{n.visibilityState==="hidden"&&(w(),u())});let S={configure:h,flush:u,markNavigationStart:_,markWorkspaceReady:y,record:g,recordQueryLatency:$,recordSectionNavigation:P,recordSpatial:A,snapshot:C};typeof window<"u"&&(window.MaintainOpsAppTelemetry=S),typeof Oe<"u"&&(Oe.exports=S)})()});var bt=B((Sn,Ee)=>{(function(){function s(t){return t?.user?.id||""}function e(t,n,a){let i=String(t||"");return!(!s(n)&&!s(a)||i==="TOKEN_REFRESHED"&&s(n)&&s(n)===s(a))}window.MaintainOpsAuthRenderPolicy={shouldRenderForAuthEvent:e},typeof Ee<"u"&&(Ee.exports={shouldRenderForAuthEvent:e})})()});var wt=B((qn,We)=>{(function(){let s={activeSection:"maintainops.activeSection",assetStatusFilter:"maintainops.assetStatusFilter",assetTypeFilter:"maintainops.assetTypeFilter",assetAreaFilter:"maintainops.assetAreaFilter",partInventoryFilter:"maintainops.partInventoryFilter",partSort:"maintainops.partSort",partSearchQuery:"maintainops.partSearchQuery",myWorkFilter:"maintainops.myWorkFilter",workOrderFilter:"maintainops.workOrderFilter",workOrderAssigneeFilter:"maintainops.workOrderAssigneeFilter",workOrderTypeFilter:"maintainops.workOrderTypeFilter",workOrderPriorityFilter:"maintainops.workOrderPriorityFilter",workSort:"maintainops.workSort",workGroup:"maintainops.workGroup",workOrderPage:"maintainops.workOrderPage",partsPage:"maintainops.partsPage",assetsPage:"maintainops.assetsPage",financialPage:"maintainops.financialPage",financialMissingFilter:"maintainops.financialMissingFilter",financialLocationFilter:"maintainops.financialLocationFilter",financialTypeFilter:"maintainops.financialTypeFilter",financialAreaFilter:"maintainops.financialAreaFilter",requestsPage:"maintainops.requestsPage",requestViewFilter:"maintainops.requestViewFilter",planningOverduePage:"maintainops.planningOverduePage",planningTodayPage:"maintainops.planningTodayPage",planningSoonPage:"maintainops.planningSoonPage",planningNoDuePage:"maintainops.planningNoDuePage",planningFollowUpPage:"maintainops.planningFollowUpPage",planningPmPage:"maintainops.planningPmPage",planningGroupOpen:"maintainops.planningGroupOpen",schedulesPage:"maintainops.schedulesPage",proceduresPage:"maintainops.proceduresPage",membersPage:"maintainops.membersPage",searchQuery:"maintainops.searchQuery",workOrderSearchMode:"maintainops.workOrderSearchMode",activeMessageThreadId:"maintainops.activeMessageThreadId",messageThreadFilter:"maintainops.messageThreadFilter",messageThreadsPage:"maintainops.messageThreadsPage",messageSearchQuery:"maintainops.messageSearchQuery",messageComposerWorkOrderId:"maintainops.messageComposerWorkOrderId",managerDashboardUserId:"maintainops.managerDashboardUserId",managerDashboardMetric:"maintainops.managerDashboardMetric",sectionSplitDone:"maintainops.sectionSplitDone"};function e(r,c,d){if(!r||!r.getItem)return d;let p=r.getItem(c);return p??d}function t(r,c){let d=Number(e(r,c,"1"));return Number.isFinite(d)&&d>0?d:1}function n(r,c,d){!r||!r.setItem||r.setItem(c,String(d))}function a(r,c){try{let d=JSON.parse(e(r,c,"{}"));return d&&typeof d=="object"&&!Array.isArray(d)?d:{}}catch{return{}}}function i(r,c){!r||!r.removeItem||r.removeItem(c)}function m(r={}){let c=r.storage||localStorage,d={activeSection:e(c,s.activeSection,"mywork"),activeWorkOrderId:null,activeAssetId:null,activePartId:null,activeMessageThreadId:e(c,s.activeMessageThreadId,""),searchQuery:e(c,s.searchQuery,""),workOrderSearchMode:e(c,s.workOrderSearchMode,"false")==="true",messageThreadFilter:e(c,s.messageThreadFilter,"all"),messageThreadsPage:t(c,s.messageThreadsPage),messageSearchQuery:e(c,s.messageSearchQuery,""),messageComposerWorkOrderId:e(c,s.messageComposerWorkOrderId,""),messageComposerOpen:!1,managerDashboardUserId:e(c,s.managerDashboardUserId,""),managerDashboardMetric:e(c,s.managerDashboardMetric,"open"),activeStatusFilter:"active",myWorkFilter:e(c,s.myWorkFilter,"assigned"),workOrderFilter:e(c,s.workOrderFilter,"all"),workOrderAssigneeFilter:e(c,s.workOrderAssigneeFilter,""),workOrderTypeFilter:e(c,s.workOrderTypeFilter,"all"),workOrderPriorityFilter:e(c,s.workOrderPriorityFilter,"all"),workSort:e(c,s.workSort,"newest"),workGroup:e(c,s.workGroup,"none"),requestViewFilter:e(c,s.requestViewFilter,"active"),workOrderPage:t(c,s.workOrderPage),partsPage:t(c,s.partsPage),assetsPage:t(c,s.assetsPage),financialPage:t(c,s.financialPage),financialMissingFilter:e(c,s.financialMissingFilter,"all"),financialLocationFilter:e(c,s.financialLocationFilter,"all"),financialTypeFilter:e(c,s.financialTypeFilter,"all"),financialAreaFilter:e(c,s.financialAreaFilter,"all"),requestsPage:t(c,s.requestsPage),planningOverduePage:t(c,s.planningOverduePage),planningTodayPage:t(c,s.planningTodayPage),planningSoonPage:t(c,s.planningSoonPage),planningNoDuePage:t(c,s.planningNoDuePage),planningFollowUpPage:t(c,s.planningFollowUpPage),planningPmPage:t(c,s.planningPmPage),planningGroupOpen:a(c,s.planningGroupOpen),schedulesPage:t(c,s.schedulesPage),proceduresPage:t(c,s.proceduresPage),membersPage:t(c,s.membersPage),assetStatusFilter:e(c,s.assetStatusFilter,"all"),assetTypeFilter:e(c,s.assetTypeFilter,"all"),assetAreaFilter:e(c,s.assetAreaFilter,"all"),partInventoryFilter:e(c,s.partInventoryFilter,"all"),partSort:e(c,s.partSort,"default"),partSearchQuery:e(c,s.partSearchQuery,"")};e(c,s.sectionSplitDone,"")!=="true"&&d.activeSection==="work"&&(d.activeSection="mywork",n(c,s.activeSection,d.activeSection),n(c,s.sectionSplitDone,"true")),d.activeSection==="performance"&&(d.activeSection="mywork",n(c,s.activeSection,d.activeSection));let p=(o,l,g)=>{d[o]=l,g&&n(c,g,l)},f=(o,l)=>{p(o,1,l)};return{getActiveSection:()=>d.activeSection,setActiveSection:o=>p("activeSection",o,s.activeSection),getActiveWorkOrderId:()=>d.activeWorkOrderId,setActiveWorkOrderId:o=>p("activeWorkOrderId",o),getActiveAssetId:()=>d.activeAssetId,setActiveAssetId:o=>p("activeAssetId",o),getActivePartId:()=>d.activePartId,setActivePartId:o=>p("activePartId",o),getActiveMessageThreadId:()=>d.activeMessageThreadId,setActiveMessageThreadId:o=>p("activeMessageThreadId",o,s.activeMessageThreadId),getMessageThreadFilter:()=>d.messageThreadFilter,setMessageThreadFilter:o=>p("messageThreadFilter",o,s.messageThreadFilter),getMessageThreadsPage:()=>d.messageThreadsPage,setMessageThreadsPage:o=>p("messageThreadsPage",o,s.messageThreadsPage),resetMessageThreadsPage:()=>f("messageThreadsPage",s.messageThreadsPage),getMessageSearchQuery:()=>d.messageSearchQuery,setMessageSearchQuery:o=>p("messageSearchQuery",o,s.messageSearchQuery),getMessageComposerWorkOrderId:()=>d.messageComposerWorkOrderId,setMessageComposerWorkOrderId:o=>p("messageComposerWorkOrderId",o,s.messageComposerWorkOrderId),getMessageComposerOpen:()=>d.messageComposerOpen,setMessageComposerOpen:o=>p("messageComposerOpen",!!o),getManagerDashboardUserId:()=>d.managerDashboardUserId,setManagerDashboardUserId:o=>p("managerDashboardUserId",o||"",s.managerDashboardUserId),getManagerDashboardMetric:()=>d.managerDashboardMetric,setManagerDashboardMetric:o=>p("managerDashboardMetric",o||"open",s.managerDashboardMetric),getSearchQuery:()=>d.searchQuery,setSearchQuery:o=>p("searchQuery",o,s.searchQuery),getWorkOrderSearchMode:()=>d.workOrderSearchMode,setWorkOrderSearchMode:o=>p("workOrderSearchMode",!!o,s.workOrderSearchMode),getActiveStatusFilter:()=>d.activeStatusFilter,setActiveStatusFilter:o=>p("activeStatusFilter",o),getMyWorkFilter:()=>d.myWorkFilter,setMyWorkFilter:o=>p("myWorkFilter",o,s.myWorkFilter),getWorkOrderFilter:()=>d.workOrderFilter,setWorkOrderFilter:o=>p("workOrderFilter",o,s.workOrderFilter),getWorkOrderAssigneeFilter:()=>d.workOrderAssigneeFilter,setWorkOrderAssigneeFilter:o=>{p("workOrderAssigneeFilter",o),o?n(c,s.workOrderAssigneeFilter,o):i(c,s.workOrderAssigneeFilter)},getWorkOrderTypeFilter:()=>d.workOrderTypeFilter,setWorkOrderTypeFilter:o=>p("workOrderTypeFilter",o||"all",s.workOrderTypeFilter),getWorkOrderPriorityFilter:()=>d.workOrderPriorityFilter,setWorkOrderPriorityFilter:o=>p("workOrderPriorityFilter",o||"all",s.workOrderPriorityFilter),getWorkSort:()=>d.workSort,setWorkSort:o=>p("workSort",o,s.workSort),getWorkGroup:()=>d.workGroup,setWorkGroup:o=>p("workGroup",o||"none",s.workGroup),getRequestViewFilter:()=>d.requestViewFilter,setRequestViewFilter:o=>p("requestViewFilter",o,s.requestViewFilter),getWorkOrderPage:()=>d.workOrderPage,setWorkOrderPage:o=>p("workOrderPage",o,s.workOrderPage),resetWorkOrderPage:()=>f("workOrderPage",s.workOrderPage),getPartsPage:()=>d.partsPage,setPartsPage:o=>p("partsPage",o,s.partsPage),resetPartsPage:()=>f("partsPage",s.partsPage),getAssetsPage:()=>d.assetsPage,setAssetsPage:o=>p("assetsPage",o,s.assetsPage),resetAssetsPage:()=>f("assetsPage",s.assetsPage),getFinancialPage:()=>d.financialPage,setFinancialPage:o=>p("financialPage",o,s.financialPage),resetFinancialPage:()=>f("financialPage",s.financialPage),getFinancialMissingFilter:()=>d.financialMissingFilter,setFinancialMissingFilter:o=>p("financialMissingFilter",o||"all",s.financialMissingFilter),getFinancialLocationFilter:()=>d.financialLocationFilter,setFinancialLocationFilter:o=>p("financialLocationFilter",o||"all",s.financialLocationFilter),getFinancialTypeFilter:()=>d.financialTypeFilter,setFinancialTypeFilter:o=>p("financialTypeFilter",o||"all",s.financialTypeFilter),getFinancialAreaFilter:()=>d.financialAreaFilter,setFinancialAreaFilter:o=>p("financialAreaFilter",o||"all",s.financialAreaFilter),getRequestsPage:()=>d.requestsPage,setRequestsPage:o=>p("requestsPage",o,s.requestsPage),resetRequestsPage:()=>f("requestsPage",s.requestsPage),getPlanningPage:o=>o==="overdue"?d.planningOverduePage:o==="today"?d.planningTodayPage:o==="soon"?d.planningSoonPage:o==="no-due"?d.planningNoDuePage:o==="follow-up"?d.planningFollowUpPage:o==="pm"?d.planningPmPage:1,setPlanningPage:(o,l)=>{o==="overdue"&&p("planningOverduePage",l,s.planningOverduePage),o==="today"&&p("planningTodayPage",l,s.planningTodayPage),o==="soon"&&p("planningSoonPage",l,s.planningSoonPage),o==="no-due"&&p("planningNoDuePage",l,s.planningNoDuePage),o==="follow-up"&&p("planningFollowUpPage",l,s.planningFollowUpPage),o==="pm"&&p("planningPmPage",l,s.planningPmPage)},getPlanningGroupOpen:(o,l=!1)=>Object.prototype.hasOwnProperty.call(d.planningGroupOpen,o)?!!d.planningGroupOpen[o]:!!l,setPlanningGroupOpen:(o,l)=>{d.planningGroupOpen={...d.planningGroupOpen,[o]:!!l},n(c,s.planningGroupOpen,JSON.stringify(d.planningGroupOpen))},getSchedulesPage:()=>d.schedulesPage,setSchedulesPage:o=>p("schedulesPage",o,s.schedulesPage),resetSchedulesPage:()=>f("schedulesPage",s.schedulesPage),getProceduresPage:()=>d.proceduresPage,setProceduresPage:o=>p("proceduresPage",o,s.proceduresPage),resetProceduresPage:()=>f("proceduresPage",s.proceduresPage),getMembersPage:()=>d.membersPage,setMembersPage:o=>p("membersPage",o,s.membersPage),resetMembersPage:()=>f("membersPage",s.membersPage),getAssetStatusFilter:()=>d.assetStatusFilter,setAssetStatusFilter:o=>p("assetStatusFilter",o,s.assetStatusFilter),getAssetTypeFilter:()=>d.assetTypeFilter,setAssetTypeFilter:o=>p("assetTypeFilter",o,s.assetTypeFilter),getAssetAreaFilter:()=>d.assetAreaFilter,setAssetAreaFilter:o=>p("assetAreaFilter",o,s.assetAreaFilter),getPartInventoryFilter:()=>d.partInventoryFilter,setPartInventoryFilter:o=>p("partInventoryFilter",o,s.partInventoryFilter),getPartSort:()=>d.partSort,setPartSort:o=>p("partSort",o||"default",s.partSort),getPartSearchQuery:()=>d.partSearchQuery,setPartSearchQuery:o=>p("partSearchQuery",o,s.partSearchQuery),snapshot:()=>({...d})}}window.MaintainOpsWorkspaceUiState={createWorkspaceUiState:m},typeof We<"u"&&(We.exports={createWorkspaceUiState:m})})()});var vt=B((Cn,be)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.URLRef||URL,a=e.BlobCtor||Blob,i=e.alertRef||alert,m=typeof e.matchesActiveLocation=="function"?e.matchesActiveLocation:()=>!0,r=typeof e.assetTypeLabel=="function"?e.assetTypeLabel:C=>String(C||"machine").replaceAll("_"," "),c=typeof e.workOrderTypeLabel=="function"?e.workOrderTypeLabel:C=>String(C||"corrective").replaceAll("_"," "),d={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function p(C){return(e.getAssetDocumentsByAssetId?.()[C]||[]).filter(v=>String(v.content_type||"").startsWith("image/")||v.document_type==="machine_photo"||v.document_type==="nameplate")}function f(C){return p(C).map(v=>v.original_file_name||v.file_name||v.storage_path||v.id).filter(Boolean).join("; ")}function o(C,v){return C?.parent_asset_id&&v.get(C.parent_asset_id)?.name||""}function l(C){return e.getLocations?.().find(v=>v.id===C)?.name||""}function g(C){if(!C)return"";let v=e.getProfilesByUserId?.()[C];return v?.full_name||v?.email||C}function u(C){return String(l(C.location_id)||C.location_id||C.location||"")}function h(C){return{id:`financial:${C.id}`,financialRecord:C,name:C.archived_asset_name||"Deleted equipment",asset_type:C.archived_asset_type||"machine",asset_code:C.archived_asset_code||"",manufacturer:C.archived_manufacturer||"",model:C.archived_model||"",location_id:C.archived_location_id||"",location:C.archived_location||"",status:"deleted"}}function y(){return[...e.getAssets(),...(e.getAssetFinancials?.()||[]).filter(C=>!C.asset_id).map(h)]}function w(C,v,S){let b=u(C).localeCompare(u(v));if(b)return b;let E=(d[C.asset_type||"machine"]||999)-(d[v.asset_type||"machine"]||999);return E||String(o(C,S)).localeCompare(String(o(v,S)))||String(C.location||"").localeCompare(String(v.location||""))||String(C.name||"").localeCompare(String(v.name||""))}function _(){let C=e.getAssets().filter(m),v=new Map(C.map(S=>[S.id,S]));return[...C].sort((S,b)=>w(S,b,v)).map(S=>({equipment_type:r(S.asset_type),name:S.name,parent_equipment:o(S,v),serial_number:S.asset_code||"",manufacturer:S.manufacturer||"",model:S.model||"",picture_id:f(S.id),picture_count:p(S.id).length,picture_status:p(S.id).length?"attached":"missing",facility:l(S.location_id)||S.location_id||"",area_department:S.location||"",status:S.status}))}function P(){let C=y(),v=new Map(C.map(b=>[b.id,b])),S=e.getAssetFinancialsByAssetId?.()||{};return[...C].sort((b,E)=>w(b,E,v)).map(b=>{let E=b.financialRecord||S[b.id]||{};return{operational_status:b.financialRecord?"deleted":"active",equipment_type:r(b.asset_type),name:b.name,parent_equipment:o(b,v),facility:l(b.location_id)||b.location_id||"",area_department:b.location||"",serial_number:b.asset_code||"",manufacturer:b.manufacturer||"",model:b.model||"",picture_status:p(b.id).length?"attached":"missing",asset_tag:E.asset_tag||"",acquisition_date:E.acquisition_date||"",acquisition_cost:E.acquisition_cost||"",depreciation_method:E.depreciation_method||"",useful_life_years:E.useful_life_years||"",current_book_value:E.current_book_value||"",tax_jurisdiction:E.tax_jurisdiction||"",ownership_status:E.ownership_status||"",in_service_date:E.in_service_date||"",disposal_date:E.disposal_date||"",disposal_notes:E.disposal_notes||"",gl_account_code:E.gl_account_code||"",cost_center:E.cost_center||"",finance_notes:E.finance_notes||"",needs_review:!!E.needs_review,last_reviewed_at:E.last_reviewed_at||"",reviewed_by:g(E.reviewed_by)}})}function $(){let C={work:{filename:"work-orders.csv",rows:e.getWorkOrders().map(S=>({title:S.title,status:S.status,priority:S.priority,type:c(S.type),equipment:S.assets?.name||"",assigned_to:e.assignmentLabel(S),due_at:S.due_at||"",completed_at:S.completed_at||"",actual_minutes:S.actual_minutes||0,failure_cause:S.failure_cause||"",resolution_summary:S.resolution_summary||"",follow_up_needed:!!S.follow_up_needed}))},assets:{filename:"equipment.csv",rows:_()},financial:{filename:"equipment-financial.csv",rows:P()},requests:{filename:"maintenance-requests.csv",rows:e.getMaintenanceRequests().map(S=>({title:S.title,status:S.status,priority:S.priority,equipment:S.assets?.name||"",requested_by:e.getProfilesByUserId()[S.requested_by]?.full_name||"",created_at:S.created_at||"",converted_work_order_id:S.converted_work_order_id||""}))},pm:{filename:"preventive-schedules.csv",rows:e.getPreventiveSchedules().map(S=>({title:S.title,equipment:S.assets?.name||"",frequency:S.frequency,next_due_at:S.next_due_at,active:S.active}))},parts:{filename:"parts.csv",rows:e.getParts().map(S=>({name:S.name,sku:S.sku||"",supplier_name:S.supplier_name||"",quantity_on_hand:S.quantity_on_hand,reorder_point:S.reorder_point,unit_cost:S.unit_cost||0}))},procedures:{filename:"procedures.csv",rows:e.getProcedureTemplates().map(S=>({name:S.name,description:S.description||"",steps:S.procedure_steps?.length||0}))},team:{filename:"team.csv",rows:e.getCompanyMembers().map(S=>({user_id:S.user_id,name:e.getProfilesByUserId()[S.user_id]?.full_name||"",role:S.role}))}},v=C[e.getActiveSection()]||C.work;if(!v.rows.length)return i("Nothing to export in this section yet.");A(v.filename,v.rows)}function A(C,v){let S=Object.keys(v[0]),b=[S.join(","),...v.map(I=>S.map(k=>e.csvCell(I[k])).join(","))],E=new a([`\uFEFF${b.join(`
`)}`],{type:"text/csv;charset=utf-8"}),T=n.createObjectURL(E),D=t.createElement("a");D.href=T,D.download=C,t.body.appendChild(D),D.click(),D.remove(),n.revokeObjectURL(T)}return{downloadCsv:A,exportActiveSectionCsv:$}}typeof be<"u"&&be.exports&&(be.exports={createCsvExportHelpers:s}),window.MaintainOpsCsvExport={createCsvExportHelpers:s}})()});var kt=B(($n,xe)=>{(function(){function s(t){if(!t)return!1;if(typeof t.focus=="function"&&t.focus(),typeof t.showPicker=="function")try{return t.showPicker(),!0}catch{}return typeof t.click=="function"?(t.click(),!0):!1}function e(t={}){(t.documentRef||document).querySelectorAll("[data-open-date-picker]").forEach(a=>{a.addEventListener("click",()=>{let m=a.closest("[data-date-picker-field]")?.querySelector('input[type="date"]');s(m)})})}window.MaintainOpsWorkspaceDatePickerControls={bindWorkspaceDatePickerControls:e,openDatePicker:s},typeof xe<"u"&&(xe.exports={bindWorkspaceDatePickerControls:e,openDatePicker:s})})()});var _t=B((Pn,Me)=>{(function(){function s(e={}){let t=e.windowRef||window;function n(i){let m=String.fromCharCode(...i),r=typeof t.btoa=="function"?t.btoa.bind(t):typeof btoa=="function"?btoa:null;return r?r(m).replaceAll("+","-").replaceAll("/","_").replaceAll("=",""):""}function a(){if(t.crypto?.getRandomValues){let i=new Uint8Array(18);return t.crypto.getRandomValues(i),n(i)}return`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`}return{generatePublicRequestToken:a}}window.MaintainOpsPublicRequestTokens=s(),typeof Me<"u"&&(Me.exports={createPublicRequestTokenHelpers:s})})()});var St=B((An,De)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.createPublicRequestLink,a=e.disablePublicRequestLink,i=e.setPublicRequestLinkActive,m=e.regeneratePublicRequestLink;typeof n=="function"&&t.querySelectorAll("[data-create-public-request-link]").forEach(r=>{r.addEventListener("click",()=>n(r.dataset.createPublicRequestLink))}),typeof a=="function"&&t.querySelectorAll("[data-disable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>a(r.dataset.disablePublicRequestLink))}),typeof i=="function"&&t.querySelectorAll("[data-enable-public-request-link]").forEach(r=>{r.addEventListener("click",()=>i(r.dataset.enablePublicRequestLink,!0))}),typeof m=="function"&&t.querySelectorAll("[data-regenerate-public-request-link]").forEach(r=>{r.addEventListener("click",()=>m(r.dataset.regeneratePublicRequestLink))})}window.MaintainOpsWorkspacePublicRequestLinkAdminEvents={bindWorkspacePublicRequestLinkAdminEvents:s},typeof De<"u"&&(De.exports={bindWorkspacePublicRequestLinkAdminEvents:s})})()});var qt=B((Rn,Te)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.savePlanningDueDate;typeof n=="function"&&t.querySelectorAll("[data-planning-due-form]").forEach(a=>{a.addEventListener("submit",async i=>{i.preventDefault(),i.stopPropagation?.();let m=a.querySelector?.("button[type='submit']");if(!m?.disabled){m&&(m.disabled=!0);try{let r=a.querySelector?.("[name='planning_due_at']");await n(a.dataset.planningDueForm,r?.value)}finally{m?.isConnected&&(m.disabled=!1)}}})})}window.MaintainOpsWorkspacePlanningDueDateEvents={bindWorkspacePlanningDueDateEvents:s},typeof Te<"u"&&(Te.exports={bindWorkspacePlanningDueDateEvents:s})})()});var Ct=B((On,Ie)=>{(function(){let s=new WeakSet;function e(a,i,m){if(!a)return;let r=a.querySelector("[data-equipment-choice-existing]"),c=a.querySelector("[data-equipment-choice-new]"),d=i==="new";a.querySelectorAll("[data-equipment-choice-mode]").forEach(p=>{let f=p.value===(d?"new":"existing");p.checked=f,p.closest("label")?.classList.toggle("active",f)}),a.querySelectorAll("[data-equipment-choice-panel]").forEach(p=>{p.hidden=p.dataset.equipmentChoicePanel!==(d?"new":"existing")}),r&&(r.disabled=d,r.required=!d&&r.dataset.equipmentChoiceRequired==="true",d&&(r.value=""),typeof m=="function"&&m(r)),c&&(c.disabled=!d,c.required=d&&c.dataset.equipmentChoiceRequired==="true",d||(c.value=""))}function t(a,i){a.querySelectorAll("[data-equipment-choice]").forEach(m=>{let r=m.querySelector("[data-equipment-choice-mode]:checked")?.value||"existing";e(m,r,i)})}function n(a={}){let i=a.documentRef||document,m=a.updateAssetLocationWarning;t(i,m),!s.has(i)&&(s.add(i),i.addEventListener("change",r=>{let c=r.target.closest?.("[data-equipment-choice-mode]");if(c){e(c.closest("[data-equipment-choice]"),c.value,m);return}let d=r.target.closest?.("[data-equipment-choice-existing]");d&&typeof m=="function"&&m(d)}))}window.MaintainOpsWorkspaceEquipmentChoiceEvents={bindWorkspaceEquipmentChoiceEvents:n,initializeEquipmentChoices:t,setEquipmentChoiceMode:e},typeof Ie<"u"&&(Ie.exports={bindWorkspaceEquipmentChoiceEvents:n,initializeEquipmentChoices:t,setEquipmentChoiceMode:e})})()});var $t=B((En,Fe)=>{(function(){function s(e={}){let{documentRef:t=document,FormDataCtor:n=FormData,withOperationTimeout:a,createQuickFixAsset:i,getMaintenanceRequests:m,getQuickFixRequestId:r,getActiveCompanyId:c,getSession:d,getParts:p,getRequestsReady:f,getSupabaseClient:o,confirmAssetLocationRouting:l,assetRequiresSafety:g,blocksProcedureCompletion:u,setWorkOrderActionWarning:h,locationIdForAsset:y,descriptionWithRequestPhotoNote:w,descriptionWithAssignmentNote:_,assignedUserFromForm:P,procedureColumn:$,workOrderDateValue:A,applySafetyRequirementPayload:C,applySafetyCheckPayload:v,insertWithOptionalProcedure:S,friendlyWorkOrderSaveError:b,addPartUsageToWorkOrder:E,addPhotoToWorkOrder:T,updateAssetStatus:D,recordWorkOrderEvent:I,setActiveWorkOrderIdState:k,setActiveAssetIdState:O,setCreateWorkOrderMode:q,setQuickFixMode:R,setQuickFixAssetId:M,setQuickFixRequestId:L,showNotice:N,render:U,alertUser:G=ne=>window.alert(ne)}=e;async function H(ne){ne.preventDefault();let ae=ne.currentTarget,K=t.querySelector("#quick-fix-error"),re=ae.querySelector("button[type='submit']");K&&(K.textContent=""),re&&(re.disabled=!0,re.textContent="Saving...");try{let W=new n(ae),Q=String(W.get("title")||"").trim();if(!Q)throw new Error("Quick Fix issue is required.");let z=r(),Z=c(),J=d(),ee=String(W.get("description")||"").trim(),X=String(W.get("resolution_summary")||"").trim(),oe=X||Q,V=ee||Q,ce=W.get("mark_completed")==="on",le=W.get("machine_down")==="on",te=W.get("asset_id")||null,F=z?m().find(se=>se.id===z):null,ue=String(W.get("new_asset_name")||"").trim();if(te&&ue)throw new Error("Choose existing equipment or create new equipment, not both.");if(ue){let{data:se,error:de}=await a(i(ue,le?"offline":"running"),"Equipment save timed out. Check your connection and try again.");if(de){K&&(K.textContent=de.message);return}te=se.id}if(!ue&&!l(te,"logging this Quick Fix",K))return;if(ce&&g(te)&&W.get("safety_devices_checked")!=="on"){K&&(K.textContent="Check safety devices before marking equipment work complete.");return}let ge=ce?u(null,W.get("procedure_template_id")||null):"";if(ge){h("",""),K&&(K.textContent=`${ge} Log it first, then complete the checklist before marking it complete.`);return}let me={company_id:Z,location_id:y(te),title:Q,description:w(_(V,W.get("assigned_to")),F),asset_id:te,assigned_to:P(W,J.user.id),priority:W.get("priority")||"medium",type:W.get("type")||"corrective",status:ce?"completed":"open",due_at:A(W.get("due_at")),created_by:J.user.id,...$(W.get("procedure_template_id")),actual_minutes:0,failure_cause:W.get("failure_cause")||null,resolution_summary:ce?oe:X||null,follow_up_needed:W.get("follow_up_needed")==="on",completion_notes:ce?oe:null,completed_at:ce?new Date().toISOString():null};C(me),v(me,ce&&me.safety_check_required&&W.get("safety_devices_checked")==="on");let{data:pe,error:Y}=await a(S("work_orders",me,{returnSingle:!0}),"Quick Fix save timed out. Check your connection and try again.");if(Y){K&&(K.textContent=`Could not log quick fix: ${b(Y)}`);return}let x=[],ie=W.get("part_id"),fe=Number(W.get("quantity_used"))||1;if(ie){let se=p().find(Re=>Re.id===ie),de=await a(E(pe.id,se,fe),"Part usage save timed out.",12e3).catch(Re=>Re);de&&x.push(`part usage failed: ${de.message}`)}let he=W.get("photo");if(he&&he.name){let se=await a(T(pe.id,he),"Photo upload timed out.",25e3).catch(de=>de);se&&x.push(`photo upload failed: ${se.message}`)}let ye=le?"offline":W.get("asset_status");if(me.asset_id&&!ue&&(le||ce&&ye)){let se=await a(D(me.asset_id,ye),"Equipment status update timed out.",12e3).catch(de=>de);se?x.push(`equipment status did not update: ${se.message}`):await a(I(pe.id,"asset_status_updated",le?"Equipment marked offline/down.":`Equipment status set to ${ye}.`),"Activity log timed out.",8e3).catch(de=>x.push(`history did not update: ${de.message}`))}if(await a(I(pe.id,"quick_fix",ce?"Quick fix recorded as completed.":"Quick fix logged and assigned to creator."),"Activity log timed out.",8e3).catch(se=>x.push(`history did not update: ${se.message}`)),ue&&await a(I(pe.id,"equipment_created",`Equipment created from Quick Fix: ${ue}.`),"Activity log timed out.",8e3).catch(se=>x.push(`history did not update: ${se.message}`)),z&&f()){let se=await a(o().from("maintenance_requests").update({status:"converted",reviewed_by:J.user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:pe.id}).eq("id",z).eq("company_id",Z),"Request status update timed out.",12e3).catch(de=>({error:de}));se.error?x.push(`request status did not update: ${se.error.message}`):await a(I(pe.id,"request_quick_fixed",ce?"Request resolved through Quick Fix.":"Request converted to a Quick Fix work order."),"Activity log timed out.",8e3).catch(de=>x.push(`history did not update: ${de.message}`))}k(pe.id),O(null),q(!1),R(!1),M(null),L(null),N(x.length?`Quick Fix saved with warning: ${x[0]}`:"Quick Fix saved.",x.length?"warning":"success"),await U()}catch(W){K?K.textContent=`Could not log quick fix: ${W.message||W}`:G(W.message||W)}finally{re&&re.isConnected&&(re.disabled=!1,re.textContent="Log Quick Fix")}}return{createQuickFix:H}}window.MaintainOpsQuickFixWorkflow={createQuickFixWorkflow:s},typeof Fe<"u"&&(Fe.exports={createQuickFixWorkflow:s})})()});var Pt=B((Wn,Le)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData;function a(l,g){return l==="direct"?[e.getSession().user.id,g].filter(Boolean):e.getCompanyMembers().map(u=>u.user_id)}function i(){let l=t.querySelector("#message-thread-form");l&&l.addEventListener("submit",m);let g=t.querySelector("#message-reply-form");g&&g.addEventListener("submit",r),t.querySelectorAll("[data-delete-message]").forEach(u=>{u.addEventListener("click",c)}),t.querySelectorAll("[data-delete-message-thread]").forEach(u=>{u.addEventListener("click",d)})}async function m(l){l.preventDefault();let g=l.currentTarget,u=t.querySelector("#message-thread-error"),h=g.querySelector("button[type='submit']"),y=new n(g);if(u&&(u.textContent=""),!e.getMessagesReady()){u&&(u.textContent="Run supabase/step-next-message-center.sql before creating threads.");return}let w=y.get("thread_type"),_=y.get("direct_user_id"),P=a(w,_),$=String(y.get("title")||"").trim(),A=String(y.get("body")||"").trim();if(w==="company"){u&&(u.textContent="Company-wide broadcast threads are disabled. Choose location or direct.");return}if(w==="direct"&&!_){u&&(u.textContent="Choose a teammate for a direct message.");return}if(!$||!A){u&&(u.textContent="Add a subject and message before starting the thread.");return}P.includes(e.getSession().user.id)||P.push(e.getSession().user.id),h&&(h.disabled=!0,h.textContent="Starting...");let C=!1;try{let v=y.get("work_order_id")||null,S={company_id:e.getActiveCompanyId(),location_id:w==="location"?e.activeLocationDatabaseId():null,thread_type:w,title:$,created_by:e.getSession().user.id};v&&e.getMessageWorkOrderLinksReady()&&(S.work_order_id=v);let{data:b,error:E}=await e.withOperationTimeout(e.supabaseClient().from("message_threads").insert(S).select("*").single(),"Message thread save timed out. Check your connection and try again.",15e3);if(E)throw e.isMissingColumnError(E,"work_order_id")&&e.setMessageWorkOrderLinksReady(!1),E;let T=[...new Set(P)].map(k=>({company_id:e.getActiveCompanyId(),thread_id:b.id,user_id:k})),{error:D}=await e.withOperationTimeout(e.supabaseClient().from("message_thread_members").insert(T),"Message member save timed out. Check your connection and try again.",15e3);if(D)throw D;let{error:I}=await f(b.id,A);if(I)throw I;e.setActiveMessageThreadId(b.id),e.setMessageComposerWorkOrderId(""),e.setMessageComposerOpen(!1),await p(b.id),e.showNotice("Thread started."),C=!0,await e.render()}catch(v){u&&(u.textContent=o(v))}finally{!C&&h?.isConnected&&(h.disabled=!1,h.textContent="Start Thread")}}async function r(l){l.preventDefault();let g=l.currentTarget,u=t.querySelector("#message-reply-error"),h=g.querySelector("button[type='submit']"),y=String(new n(g).get("body")||"").trim();if(!y)return;u&&(u.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");let w=!1;try{let{error:_}=await f(g.dataset.threadId,y);if(_)throw _;e.showNotice("Message sent."),await p(g.dataset.threadId),w=!0,await e.render()}catch(_){u&&(u.textContent=o(_))}finally{!w&&h?.isConnected&&(h.disabled=!1,h.textContent="Send Reply")}}async function c(l){let g=l.currentTarget,u=g?.dataset?.deleteMessage;if(u&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this message from the thread? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message",{target_message_id:u}),"Message delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.showNotice("Message deleted."),await e.render()}catch(h){e.showNotice(o(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete")}}}async function d(l){let g=l.currentTarget,u=g?.dataset?.deleteMessageThread;if(u&&!(typeof e.confirmUser=="function"&&!e.confirmUser("Delete this thread from your messages? Admins can still review the Supabase transcript if needed."))){g.disabled=!0,g.textContent="Deleting...";try{let h=await e.withOperationTimeout(e.supabaseClient().rpc("soft_delete_own_message_thread",{target_thread_id:u}),"Message thread delete timed out. Check your connection and try again.",1e4);if(h.error)throw h.error;e.setActiveMessageThreadId(""),e.showNotice("Thread deleted."),await e.render()}catch(h){e.showNotice(o(h),"warning"),g.isConnected&&(g.disabled=!1,g.textContent="Delete Thread")}}}async function p(l){if(!e.getMessagesReady()||!l)return;let g=new Date().toISOString(),u={company_id:e.getActiveCompanyId(),thread_id:l,user_id:e.getSession().user.id,last_read_at:g};e.setMessageThreadRead(l,u);let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("message_reads").upsert(u,{onConflict:"thread_id,user_id"}),"Message read marker timed out.",8e3).catch(y=>({error:y}));h&&e.warn("Could not mark message thread read",h)}async function f(l,g){let u=await e.withOperationTimeout(e.supabaseClient().from("messages").insert({company_id:e.getActiveCompanyId(),thread_id:l,sender_id:e.getSession().user.id,body:g}),"Message save timed out. Check your connection and try again.",15e3);return u.error?{error:u.error}:{error:(await e.withOperationTimeout(e.supabaseClient().from("message_threads").update({updated_at:new Date().toISOString()}).eq("id",l).eq("company_id",e.getActiveCompanyId()),"Message thread timestamp save timed out.",8e3).catch(y=>({error:y}))).error}}function o(l){let g=e.messageCenterErrorState(l);return g.messagesReady===!1&&e.setMessagesReady(!1),g.message}return{bindMessageWorkflowEvents:i,createMessageThread:m,sendThreadReply:r,deleteOwnMessage:c,deleteMessageThread:d,markMessageThreadRead:p,insertThreadMessage:f,friendlyMessageCenterError:o,messageThreadMembersForType:a}}window.MaintainOpsMessageWorkflow={createMessageWorkflow:s},typeof Le<"u"&&(Le.exports={createMessageWorkflow:s})})()});var At=B((xn,Ne)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function i(){let p=Array.from(t.querySelectorAll?.("[data-create-pm-form]")||[]),f=t.querySelector("#create-pm-form");f&&!p.includes(f)&&p.push(f),p.forEach(o=>o.addEventListener("submit",m))}async function m(p){p.preventDefault();let f=p.currentTarget,o=f.querySelector("button[type='submit']"),l=f.querySelector("[data-pm-error]")||t.querySelector("#pm-error");l&&(l.textContent=""),o&&(o.disabled=!0,o.textContent="Adding...");try{let g=new n(f);if(!e.confirmAssetLocationRouting(g.get("asset_id")||null,"this PM schedule",l))return;let{error:u}=await e.withOperationTimeout(e.insertWithOptionalProcedure("preventive_schedules",{company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(g.get("asset_id")),asset_id:g.get("asset_id"),title:e.requiredText(g.get("title"),"PM title"),frequency:g.get("frequency"),next_due_at:g.get("next_due_at"),...e.procedureColumn(g.get("procedure_template_id")),active:!0,created_by:e.getSession().user.id}),"PM schedule save timed out. Check your connection and try again.",15e3);if(u)throw u;e.showNotice("PM schedule added."),await e.render()}catch(g){l?l.textContent=g.message||"Could not add PM schedule.":e.alertUser(g.message||g)}finally{o&&(o.disabled=!1,o.textContent="Add Schedule")}}function r(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}e.getPreventiveSchedules().some(f=>f.id===p)&&(e.setPendingDeleteScheduleId(p),e.renderWorkspace())}async function c(p){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete PM schedules.");return}if(!e.getPreventiveSchedules().find(l=>l.id===p))return;let o=t.querySelector(`[data-confirm-delete-schedule="${a.escape(p)}"]`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let{data:l,error:g}=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").delete().eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"PM schedule delete timed out. Check your connection and try again.",15e3);if(g)throw g;if(!l?.length)throw new Error("PM schedule was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let u=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").select("id").eq("id",p).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"PM schedule delete verification timed out. Refresh and check the PM list.",15e3);if(u.error)throw new Error(`PM schedule delete verification failed: ${u.error.message}`);if(u.data)throw new Error("PM schedule delete did not persist in Supabase.");e.setPendingDeleteScheduleId(null),e.showNotice("PM schedule deleted."),await e.render()}catch(l){e.showNotice(l.message||"Could not delete PM schedule.","warning"),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}async function d(p){let f=e.getPreventiveSchedules().find(l=>l.id===p);if(!f)return;let o=t.querySelector(`[data-generate-pm="${a.escape(p)}"]`);o&&(o.disabled=!0,o.textContent="Generating...");try{let l={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(f.asset_id),asset_id:f.asset_id,title:f.title,description:`Generated from preventive schedule: ${f.frequency}.`,priority:"medium",type:"preventive",status:"open",due_at:f.next_due_at,...e.procedureColumn(f.procedure_template_id),created_by:e.getSession().user.id};e.applySafetyRequirementPayload(l),e.applySafetyCheckPayload(l,!1);let{data:g,error:u}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",l,{returnSingle:!0}),"PM work order generation timed out.");if(u)throw u;e.setActiveWorkOrderId(g.id),e.setActiveSection("work");let h="";try{let y=await e.withOperationTimeout(e.supabaseClient().from("preventive_schedules").update({next_due_at:e.nextDueDate(f.next_due_at,f.frequency)}).eq("id",f.id).eq("company_id",e.getActiveCompanyId()),"PM next due date update timed out.");y.error&&(h=y.error.message)}catch(y){h=y.message||String(y)}e.showNotice(h?`PM work generated, but next due date did not update: ${h}`:"PM work order generated.",h?"warning":"success"),await e.render()}catch(l){e.showNotice(`Could not generate PM work: ${l.message||l}`,"warning"),o&&(o.disabled=!1,o.textContent="Generate Work")}}return{bindPreventiveMaintenanceWorkflowEvents:i,createPreventiveSchedule:m,requestDeletePreventiveSchedule:r,deletePreventiveSchedule:c,generatePreventiveWorkOrder:d}}window.MaintainOpsPreventiveMaintenanceWorkflow={createPreventiveMaintenanceWorkflow:s},typeof Ne<"u"&&(Ne.exports={createPreventiveMaintenanceWorkflow:s})})()});var Rt=B((Mn,Ue)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.CSSRef||CSS;function i(){let l=t.querySelector("#create-procedure-form");l&&l.addEventListener("submit",m);let g=t.querySelector("#seed-sample-procedure");g&&g.addEventListener("click",r),t.querySelectorAll("[data-add-step]").forEach(u=>{u.addEventListener("submit",c)})}async function m(l){l.preventDefault();let g=l.currentTarget,u=g.querySelector("button[type='submit']"),h=t.querySelector("#procedure-error");h&&(h.textContent=""),u&&(u.disabled=!0,u.textContent="Adding...");try{let y=new n(g),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:e.requiredText(y.get("name"),"Procedure checklist name"),description:String(y.get("description")||"").trim()||null,created_by:e.getSession().user.id}),"Procedure save timed out.");if(w)throw w;e.showNotice("Procedure checklist added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure.":e.alertUser(y.message||y)}finally{u&&(u.disabled=!1,u.textContent="Add Checklist")}}async function r(){let l=t.querySelector("#seed-sample-procedure");if(e.getProcedureTemplates().find(u=>u.name.toLowerCase()==="basic equipment inspection")){e.showNotice("Sample inspection procedure already exists.","warning");return}l&&(l.disabled=!0,l.textContent="Adding sample...");try{let{data:u,error:h}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").insert({company_id:e.getActiveCompanyId(),name:"Basic Equipment Inspection",description:"A simple starter checklist for visual checks, readings, and final pass/fail.",created_by:e.getSession().user.id}).select().single(),"Sample procedure save timed out.");if(h)throw h;let y=[{position:1,prompt:"Confirm lockout or safe operating condition",response_type:"checkbox",required:!0},{position:2,prompt:"Inspect for leaks, loose guards, or visible damage",response_type:"pass_fail",required:!0},{position:3,prompt:"Record operating reading",response_type:"number",required:!1},{position:4,prompt:"Add technician notes",response_type:"text",required:!1}].map(_=>({..._,company_id:e.getActiveCompanyId(),procedure_template_id:u.id})),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert(y),"Sample procedure steps save timed out.");if(w)throw w;e.showNotice("Sample procedure checklist added."),await e.render()}catch(u){e.showNotice(`Could not add sample procedure: ${u.message||u}`,"warning")}finally{l&&(l.disabled=!1,l.textContent="Add sample inspection checklist")}}async function c(l){l.preventDefault();let g=l.currentTarget,u=g.querySelector("button[type='submit']"),h=t.querySelector(`[data-step-error="${g.dataset.addStep}"]`);h&&(h.textContent=""),u&&(u.disabled=!0,u.textContent="Adding...");try{let y=new n(g),_=(e.getProcedureTemplates().find($=>$.id===g.dataset.addStep)?.procedure_steps?.length||0)+1,{error:P}=await e.withOperationTimeout(e.supabaseClient().from("procedure_steps").insert({company_id:e.getActiveCompanyId(),procedure_template_id:g.dataset.addStep,position:_,prompt:e.requiredText(y.get("prompt"),"Procedure checklist step"),response_type:y.get("response_type"),required:y.get("required")==="true"}),"Procedure step save timed out.");if(P)throw P;e.showNotice("Procedure checklist step added."),await e.render()}catch(y){h?h.textContent=y.message||"Could not add procedure step.":e.alertUser(y.message||y)}finally{u&&(u.disabled=!1,u.textContent="Add Step")}}async function d(l){let[g,u]=await Promise.all([p("work_orders",l),p("preventive_schedules",l)]);return{workOrders:g,schedules:u}}async function p(l,g){let{count:u,error:h}=await e.withOperationTimeout(e.supabaseClient().from(l).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("procedure_template_id",g),`Procedure delete check timed out while checking ${l}.`,15e3);if(h)throw new Error(`Could not verify linked ${l.replaceAll("_"," ")} before deleting procedure: ${h.message}`);return u||0}async function f(l){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().some(u=>u.id===l))return;let g=t.querySelector(`[data-procedure-delete-error="${a.escape(l)}"]`);g&&(g.textContent="");try{let u=await d(l),h=e.procedureDeleteBlockerMessage(u);if(h){g&&(g.textContent=h);return}e.setPendingDeleteProcedureId(l),e.renderWorkspace()}catch(u){g?g.textContent=u.message||"Could not verify procedure links before delete.":e.showNotice(u.message||"Could not verify procedure links before delete.","warning")}}async function o(l){if(!e.canDeleteOperationalRecords()){e.alertUser("Only company admins and managers can delete procedures.");return}if(!e.getProcedureTemplates().find(y=>y.id===l))return;let u=t.querySelector(`[data-confirm-delete-procedure="${a.escape(l)}"]`),h=t.querySelector(`[data-procedure-delete-error="${a.escape(l)}"]`);h&&(h.textContent=""),u&&(u.disabled=!0,u.textContent="Deleting...");try{let y=await d(l),w=e.procedureDeleteBlockerMessage(y);if(w)throw new Error(w);let{data:_,error:P}=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").delete().eq("id",l).eq("company_id",e.getActiveCompanyId()).select("id"),"Procedure checklist delete timed out. Check your connection and try again.",15e3);if(P)throw P;if(!_?.length)throw new Error("Procedure checklist was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let $=await e.withOperationTimeout(e.supabaseClient().from("procedure_templates").select("id").eq("id",l).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Procedure checklist delete verification timed out. Refresh and check the checklist list.",15e3);if($.error)throw new Error(`Procedure checklist delete verification failed: ${$.error.message}`);if($.data)throw new Error("Procedure checklist delete did not persist in Supabase.");e.setPendingDeleteProcedureId(null),e.showNotice("Procedure checklist deleted."),await e.render()}catch(y){let w=y.message||"Could not delete procedure.";e.showNotice(w,"warning"),h&&(h.textContent=w),u&&(u.disabled=!1,u.textContent="Permanently Delete")}}return{bindProcedureWorkflowEvents:i,createProcedureTemplate:m,seedSampleProcedure:r,createProcedureStep:c,loadProcedureDeleteBlockers:d,countProcedureLinkedRows:p,requestDeleteProcedureTemplate:f,deleteProcedureTemplate:o}}window.MaintainOpsProcedureWorkflow={createProcedureWorkflow:s},typeof Ue<"u"&&(Ue.exports={createProcedureWorkflow:s})})()});var Ot=B((Dn,Qe)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData;function a(){let u=t.querySelector("#add-member-form");u&&u.addEventListener("submit",i),t.querySelectorAll("[data-member-role]").forEach($=>{$.addEventListener("submit",m)});let h=t.querySelector("#profile-form");h&&h.addEventListener("submit",r);let y=t.querySelector("#password-change-form");y&&y.addEventListener("submit",p);let w=t.querySelector("#team-invite-form");w&&w.addEventListener("submit",c);let _=t.querySelector("#team-invite-link-form");_&&_.addEventListener("submit",f),t.querySelectorAll("[data-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId($.dataset.revokeInviteLink),e.renderWorkspace()})}),t.querySelectorAll("[data-revoke-invite-link-cancel]").forEach($=>{$.addEventListener("click",()=>{e.setPendingRevokeInviteLinkId(null),e.renderWorkspace()})}),t.querySelectorAll("[data-confirm-revoke-invite-link]").forEach($=>{$.addEventListener("click",()=>o($.dataset.confirmRevokeInviteLink))});let P=t.querySelector("#request-notification-recipient-form");P&&P.addEventListener("submit",l),t.querySelectorAll("[data-delete-request-notification-recipient]").forEach($=>{$.addEventListener("click",()=>g($.dataset.deleteRequestNotificationRecipient))})}async function i(u){u.preventDefault();let h=u.currentTarget,y=new n(h),w=String(y.get("role")||"technician").trim().toLowerCase(),_=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()&&w!=="technician"){e.alertUser("Only admins can grant manager or admin roles.");return}_&&(_.disabled=!0,_.textContent="Adding...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().from("company_members").insert({company_id:e.getActiveCompanyId(),user_id:y.get("user_id"),role:w}),"Team member save timed out.");if(P)throw P;await e.render()}catch(P){e.alertUser(P.message||P)}finally{_?.isConnected&&(_.disabled=!1,_.textContent="Add Member")}}async function m(u){u.preventDefault();let h=u.currentTarget,y=new n(h),w=String(y.get("role")||"").trim().toLowerCase(),_=h.querySelector("button[type='submit']");if(!e.canAdministerTeamRoles?.()){e.showNotice("Only admins can change team roles.","warning");return}_&&(_.disabled=!0,_.textContent="Saving...");try{let{error:P}=await e.withOperationTimeout(e.supabaseClient().rpc("update_company_member_role",{target_company_id:e.getActiveCompanyId(),target_user_id:h.dataset.memberRole,new_role:w}),"Role save timed out. Check your connection and try again.",15e3);if(P)throw new Error(P.message.includes("update_company_member_role")?"Run supabase/step-next-team-roles.sql before editing roles.":P.message);await e.loadMembers(),e.showNotice("Role saved."),e.render()}catch(P){e.showNotice(`Could not save role: ${P.message||P}`,"warning")}finally{_&&(_.disabled=!1,_.textContent="Save Role")}}async function r(u){u.preventDefault();let h=u.currentTarget,y=t.querySelector("#profile-error"),w=h.querySelector("button[type='submit']"),_=new n(h),P=String(_.get("full_name")||"").trim(),$=h.querySelector('input[name="mobile_tech"]'),A=$?$.checked:!!e.getProfilesByUserId()[e.getSession().user.id]?.mobile_tech;y&&(y.textContent=""),w&&(w.disabled=!0,w.textContent="Saving...");try{let{error:C}=await e.withOperationTimeout(e.supabaseClient().from("profiles").upsert({company_id:e.getActiveCompanyId(),user_id:e.getSession().user.id,full_name:P,mobile_tech:A},{onConflict:"company_id,user_id"}),"Profile save timed out. Check your connection and try again.",15e3);if(C)throw e.isMissingColumnError(C,"mobile_tech")?new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings."):C;e.showNotice("Profile saved."),await e.render()}catch(C){y&&(y.textContent=C.message||"Could not save profile.")}finally{w&&(w.disabled=!1,w.textContent="Save Profile")}}async function c(u){u.preventDefault();let h=u.currentTarget,y=t.querySelector("#team-invite-error"),w=h.querySelector("button[type='submit']"),_=new n(h),P=String(_.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),!e.getTeamInvitesReady()){y&&(y.textContent="Run supabase/step-next-invite-default-location.sql before inviting by email.");return}if(!e.canAdministerTeamRoles?.()&&P!=="technician"){y&&(y.textContent="Only admins can invite managers or admins.");return}w&&(w.disabled=!0,w.textContent="Inviting...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite",{target_company_id:e.getActiveCompanyId(),invite_email:String(_.get("email")||"").trim(),invite_role:P,invite_default_location_id:_.get("default_location_id")||null}),"Invite save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite")||e.isColumnSchemaError($,["company_invites"])?(e.setTeamInvitesReady(!1),new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.")):$;e.showNotice("Invite created."),e.setTeamInviteCancelError(""),await e.render()}catch($){y&&(y.textContent=$.message||"Could not create invite.")}finally{w&&(w.disabled=!1,w.textContent="Create Invite")}}async function d(u){if(!(!u||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("cancel_company_invite",{target_company_id:e.getActiveCompanyId(),target_invite_id:u}),"Invite cancel timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("cancel_company_invite")?new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites."):h;e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(""),e.showNotice("Invite canceled."),await e.loadTeamInvites(),e.renderWorkspace()}catch(h){e.setPendingCancelInviteId(null),e.setTeamInviteCancelError(h.message||"Could not cancel invite."),e.renderWorkspace()}}async function p(u){u.preventDefault();let h=u.currentTarget,y=t.querySelector("#password-change-error"),w=h.querySelector("button[type='submit']"),_=new n(h),P=String(_.get("password")||""),$=String(_.get("confirmPassword")||"");if(y&&(y.textContent=""),P.length<8){y&&(y.textContent="Password must be at least 8 characters.");return}if(P!==$){y&&(y.textContent="Passwords do not match.");return}w&&(w.disabled=!0,w.textContent="Updating...");try{let{error:A}=await e.withOperationTimeout(e.supabaseClient().auth.updateUser({password:P}),"Password update timed out. Check your connection and try again.",15e3);if(A)throw A;typeof h.reset=="function"&&h.reset(),e.showNotice("Password updated.")}catch(A){y&&(y.textContent=A.message||"Could not update password.")}finally{w&&(w.disabled=!1,w.textContent="Update Password")}}async function f(u){u.preventDefault();let h=u.currentTarget,y=t.querySelector("#team-invite-link-error"),w=h.querySelector("button[type='submit']"),_=new n(h),P=String(_.get("role")||"technician").trim().toLowerCase();if(y&&(y.textContent=""),e.setTeamInviteLinkError(""),!e.getTeamInviteLinksReady()){let $="Run supabase/step-next-invite-links.sql before creating join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(P==="admin"){let $="Admin join links are not allowed.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}if(!e.canAdministerTeamRoles?.()&&P!=="technician"){let $="Managers can only create technician join links.";e.setTeamInviteLinkError($),y&&(y.textContent=$);return}w&&(w.disabled=!0,w.textContent="Creating...");try{let{error:$}=await e.withOperationTimeout(e.supabaseClient().rpc("create_company_invite_link",{target_company_id:e.getActiveCompanyId(),link_role:P,link_location_id:_.get("default_location_id")||null}),"Join link save timed out. Check your connection and try again.",15e3);if($)throw $.message.includes("create_company_invite_link")||e.isColumnSchemaError($,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before creating join links.")):$;e.setTeamInviteLinkError(""),e.showNotice("Join link created."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch($){let A=$.message||"Could not create join link.";e.setTeamInviteLinkError(A),y&&(y.textContent=A)}finally{w&&(w.disabled=!1,w.textContent="Create Join Link")}}async function o(u){if(!(!u||!e.getActiveCompanyId()))try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().rpc("revoke_company_invite_link",{link_id:u}),"Join link revoke timed out. Check your connection and try again.",15e3);if(h)throw h.message.includes("revoke_company_invite_link")||e.isColumnSchemaError(h,["company_invite_links"])?(e.setTeamInviteLinksReady(!1),new Error("Run supabase/step-next-invite-links.sql before revoking join links.")):h;e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(""),e.showNotice("Join link revoked."),await e.loadTeamInviteLinks(),e.renderWorkspace()}catch(h){e.setPendingRevokeInviteLinkId(null),e.setTeamInviteLinkError(h.message||"Could not revoke join link."),e.renderWorkspace()}}async function l(u){u.preventDefault();let h=u.currentTarget,y=t.querySelector("#request-notification-recipient-error"),w=h.querySelector("button[type='submit']"),_=new n(h);if(y&&(y.textContent=""),!e.canAdministerTeamRoles?.()){let P="Only admins can change request email routing.";e.setRequestNotificationRecipientError(P),y&&(y.textContent=P);return}if(!e.getRequestNotificationRecipientsReady()){y&&(y.textContent="Run supabase/step-next-request-notification-recipients.sql before routing request emails.");return}w&&(w.disabled=!0,w.textContent="Adding...");try{let P=String(_.get("email")||"").trim().toLowerCase(),{error:$}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").insert({company_id:e.getActiveCompanyId(),location_id:_.get("location_id")||null,email:P,label:String(_.get("label")||"").trim()||null,is_active:!0,created_by:e.getSession().user.id}),"Request email recipient save timed out. Check your connection and try again.",15e3);if($)throw e.isColumnSchemaError($,["request_notification_recipients"])||$.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):$;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient saved."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(P){let $=P.message||"Could not save request email recipient.";e.setRequestNotificationRecipientError($),y&&(y.textContent=$)}finally{w&&(w.disabled=!1,w.textContent="Add Recipient")}}async function g(u){if(!(!u||!e.getActiveCompanyId())){if(!e.canAdministerTeamRoles?.()){e.setRequestNotificationRecipientError("Only admins can change request email routing."),e.renderWorkspace();return}try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("request_notification_recipients").delete().eq("company_id",e.getActiveCompanyId()).eq("id",u),"Request email recipient remove timed out. Check your connection and try again.",15e3);if(h)throw e.isColumnSchemaError(h,["request_notification_recipients"])||h.message.includes("request_notification_recipients")?(e.setRequestNotificationRecipientsReady(!1),new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.")):h;e.setRequestNotificationRecipientError(""),e.showNotice("Request email recipient removed."),await e.loadRequestNotificationRecipients(),e.renderWorkspace()}catch(h){e.setRequestNotificationRecipientError(h.message||"Could not remove request email recipient."),e.renderWorkspace()}}}return{bindTeamWorkflowEvents:a,addCompanyMember:i,updateCompanyMemberRole:m,updateMyProfile:r,updateMyPassword:p,createTeamInvite:c,cancelTeamInvite:d,createTeamInviteLink:f,revokeTeamInviteLink:o,createRequestNotificationRecipient:l,deleteRequestNotificationRecipient:g}}window.MaintainOpsTeamWorkflow={createTeamWorkflow:s},typeof Qe<"u"&&(Qe.exports={createTeamWorkflow:s})})()});var Et=B((Tn,Be)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData;function a(){let c=t.querySelector("#company-settings-form");c&&c.addEventListener("submit",i);let d=t.querySelector("#location-form");d&&d.addEventListener("submit",m);let p=t.querySelector("#public-app-url-form");p&&p.addEventListener("submit",r)}async function i(c){c.preventDefault();let d=c.currentTarget,p=d.querySelector("button[type='submit']"),f=new n(d);p&&(p.disabled=!0,p.textContent="Saving...");try{let{error:o}=await e.withOperationTimeout(e.supabaseClient().from("companies").update({name:e.requiredText(f.get("name"),"Company name")}).eq("id",e.getActiveCompanyId()),"Company save timed out. Check your connection and try again.",15e3);if(o)throw o;e.showNotice("Company saved."),await e.render()}catch(o){e.showNotice(`Could not save company: ${o.message||o}`,"warning")}finally{p&&(p.disabled=!1,p.textContent="Save Company")}}async function m(c){c.preventDefault();let d=c.currentTarget,p=t.querySelector("#location-error"),f=d.querySelector("button[type='submit']"),o=String(new n(d).get("name")||"").trim();if(o){p&&(p.textContent=""),f&&(f.disabled=!0,f.textContent="Adding...");try{let{data:l,error:g}=await e.withOperationTimeout(e.createLocationRecord(e.supabaseClient(),e.getActiveCompanyId(),o),"Location save timed out. Check your connection and try again.",15e3);if(g)throw e.isColumnSchemaError(g,["locations"])&&e.setLocationsReady(!1),new Error(e.getLocationsReady()?g.message:"Run supabase/step-next-locations.sql before adding locations.");e.setActiveLocationId(l.id),e.persistActiveLocationId(l.id),e.showNotice("Location added."),await e.render()}catch(l){p&&(p.textContent=l.message||"Could not add location.")}finally{f&&(f.disabled=!1,f.textContent="Add Location")}}}function r(c){c.preventDefault();let d=t.querySelector("#public-request-link-error"),p=String(new n(c.currentTarget).get("public_app_url")||"").trim();if(d&&(d.textContent=""),!p){e.setPublicAppUrlOverride(""),e.storage.removeItem("maintainops.publicAppUrl"),e.showNotice("Public app URL cleared."),e.renderWorkspace();return}let f=e.normalizePublicAppUrl(p);if(!f){d&&(d.textContent="Enter the public https:// URL where MaintainOps opens. Localhost, file paths, and private network addresses cannot be used for posted QR codes.");return}e.setPublicAppUrlOverride(f),e.storage.setItem("maintainops.publicAppUrl",f),e.showNotice("Public app URL saved."),e.renderWorkspace()}return{bindCompanySettingsWorkflowEvents:a,updateCompanySettings:i,createLocation:m,savePublicAppUrl:r}}window.MaintainOpsCompanySettingsWorkflow={createCompanySettingsWorkflow:s},typeof Be<"u"&&(Be.exports={createCompanySettingsWorkflow:s})})()});var Wt=B((In,je)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.windowRef||window,a=e.FormDataCtor||FormData,i=e.confirmUser||(o=>n.confirm(o));function m(){let o=t.querySelector("#app-issue-report-form");o&&o.addEventListener("submit",d),t.querySelectorAll("[data-app-issue-status]").forEach(l=>{l.addEventListener("submit",p)}),t.querySelectorAll("[data-delete-app-issue]").forEach(l=>{l.addEventListener("click",f)})}async function r(){let{data:o,error:l}=await e.withOperationTimeout(e.listAppIssueReports(e.supabaseClient(),e.getActiveCompanyId()),"App issue report load timed out. Check your connection and try again.",12e3);if(e.setAppIssueReportsReady(!l),e.setAppIssueReports(l?[]:o||[]),l)throw l}function c(o){let l=e.appIssueReportErrorState(o);return l.appIssueReportsReady===!1&&e.setAppIssueReportsReady(!1),l.message}async function d(o){o.preventDefault();let l=o.currentTarget,g=t.querySelector("#app-issue-report-error"),u=l.querySelector("button[type='submit']"),h=new a(l);g&&(g.textContent=""),u&&(u.disabled=!0,u.textContent="Sending...");try{let y={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),reporter_id:e.getSession().user.id,screen:String(h.get("screen")||e.getActiveSection()||"workspace").slice(0,80),page_url:n.location.href,severity:String(h.get("severity")||"normal"),title:e.requiredText(h.get("title"),"Short title").slice(0,140),details:e.requiredText(h.get("details"),"Details"),status:"open"},{error:w}=await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),y),"App issue report save timed out. Check your connection and try again.",15e3);if(w)throw w;e.setReportIssueMode(!1),e.showNotice("Issue report sent."),await r(),e.renderWorkspace()}catch(y){g&&(g.textContent=c(y))}finally{u?.isConnected&&(u.disabled=!1,u.textContent="Send Report")}}async function p(o){if(o.preventDefault(),!e.canManageTeam())return;let l=o.currentTarget,g=l.querySelector("button[type='submit']"),u=new a(l);g&&(g.disabled=!0,g.textContent="Saving...");try{let h=String(u.get("status")||"open"),{error:y}=await e.withOperationTimeout(e.updateAppIssueReportStatusRecord(e.supabaseClient(),e.getActiveCompanyId(),l.dataset.appIssueStatus,h),"Issue report status save timed out. Check your connection and try again.",12e3);if(y)throw y;e.showNotice("Issue report updated."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not update issue report: ${c(h)}`,"warning")}finally{g?.isConnected&&(g.disabled=!1,g.textContent="Save")}}async function f(o){if(o.preventDefault(),!e.canManageTeam())return;let l=o.currentTarget,g=l.dataset.deleteAppIssue;if(!g||!i("Delete this app issue report? This cannot be undone."))return;l.disabled=!0;let u=l.textContent;l.textContent="Deleting...";try{let{error:h}=await e.withOperationTimeout(e.deleteAppIssueReportRecord(e.supabaseClient(),e.getActiveCompanyId(),g),"Issue report delete timed out. Check your connection and try again.",12e3);if(h)throw h;e.showNotice("Issue report deleted."),await r(),e.renderWorkspace()}catch(h){e.showNotice(`Could not delete issue report: ${c(h)}`,"warning")}finally{l?.isConnected&&(l.disabled=!1,l.textContent=u||"Delete")}}return{bindAppIssueWorkflowEvents:m,reloadAppIssueReports:r,appIssueReportError:c,createAppIssueReport:d,updateAppIssueReportStatus:p,deleteAppIssueReport:f}}window.MaintainOpsAppIssueWorkflow={createAppIssueWorkflow:s},typeof je<"u"&&(je.exports={createAppIssueWorkflow:s})})()});var xt=B((Fn,ze)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.windowRef||window,a=e.CSSRef||CSS;async function i(p){let f=t.querySelector("#public-request-link-error"),o=t.querySelector(`[data-create-public-request-link="${a.escape(p)}"]`);f&&(f.textContent=""),o&&(o.disabled=!0,o.textContent="Creating...");try{let{error:l}=await e.withOperationTimeout(e.supabaseClient().rpc("ensure_location_request_link",{target_location_id:p}),"QR link save timed out. Check your connection and try again.",15e3);if(l)throw e.setPublicRequestLinksReady(!1),new Error(l.message.includes("ensure_location_request_link")?"Run supabase/step-next-public-request-links.sql before creating QR request links.":l.message);e.showNotice("Location request QR link ready."),await e.render()}catch(l){f&&(f.textContent=l.message||"Could not create QR request link.")}finally{o&&(o.disabled=!1,o.textContent="Create QR Link")}}async function m(p){if(!e.canAdministerPublicRequestLinks()){let o=t.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can disable posted QR request links.");return}n.confirm("Disable this public request QR link? Posted codes for this location will stop accepting requests until you reactivate it.")&&await r(p,!1)}async function r(p,f){if(!e.canAdministerPublicRequestLinks()){let o=t.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can reactivate or disable posted QR request links.");return}await d(p,{is_active:!!f},f?"Request link reactivated.":"Request link disabled.")}async function c(p){if(!e.canAdministerPublicRequestLinks()){let o=t.querySelector("#public-request-link-error");o&&(o.textContent="Only admins can replace posted QR request links.");return}n.confirm("Regenerate this QR code? Any QR codes already printed or shared for this location will stop working.")&&await d(p,{token:e.generatePublicRequestToken(),is_active:!0},"Request QR regenerated.")}async function d(p,f,o){let l=t.querySelector("#public-request-link-error");if(l&&(l.textContent=""),!e.canAdministerPublicRequestLinks()){l&&(l.textContent="Only admins can replace, disable, or reactivate posted QR request links.");return}if(!p||!e.getActiveCompanyId()){l&&(l.textContent="Select a company before updating request links.");return}try{let{data:g,error:u}=await e.withOperationTimeout(e.supabaseClient().from("public_request_links").update({...f,updated_at:new Date().toISOString()}).eq("id",p).eq("company_id",e.getActiveCompanyId()).select("id"),"Request link update timed out. Check your connection and try again.",15e3);if(u){l&&(l.textContent=u.message);return}if(!g?.length){l&&(l.textContent="Could not update the request link. Check that your company role is admin or manager.");return}e.showNotice(o),await e.render()}catch(g){l&&(l.textContent=g.message||"Could not update the request link.")}}return{createPublicRequestLink:i,disablePublicRequestLink:m,setPublicRequestLinkActive:r,regeneratePublicRequestLink:c,updatePublicRequestLink:d}}window.MaintainOpsPublicRequestLinkWorkflow={createPublicRequestLinkWorkflow:s},typeof ze<"u"&&(ze.exports={createPublicRequestLinkWorkflow:s})})()});var Mt=B((Ln,Ge)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData;function a(){let p=t.querySelector("#create-part-form");p&&p.addEventListener("submit",i),t.querySelectorAll("[data-restock-part]").forEach(f=>{f.addEventListener("submit",m)}),t.querySelectorAll("[data-use-part]").forEach(f=>{f.addEventListener("submit",r)}),t.querySelectorAll("[data-edit-part]").forEach(f=>{f.addEventListener("submit",c)}),t.querySelectorAll("[data-rename-part-source]").forEach(f=>{f.addEventListener("submit",d)})}async function i(p){p.preventDefault();let f=p.currentTarget,o=t.querySelector("#part-create-error"),l=f.querySelector("button[type='submit']"),g=new n(f);o&&(o.textContent=""),l&&(l.disabled=!0,l.textContent="Adding...");let u;try{let h={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:String(g.get("name")||"").trim(),sku:String(g.get("sku")||"").trim()||null,supplier_name:String(g.get("supplier_name")||"").trim()||null,machine_note:String(g.get("machine_note")||"").trim()||null,quantity_on_hand:Number(g.get("quantity_on_hand"))||0,reorder_point:Number(g.get("reorder_point"))||0,unit_cost:Number(g.get("unit_cost"))||0};if(!h.company_id)throw new Error("Choose a company before adding parts.");if(!h.name)throw new Error("Part name is required.");let y=new Promise((P,$)=>{u=setTimeout(()=>$(new Error("Part save timed out. Check your connection and try again.")),2e4)}),{data:w,error:_}=await Promise.race([e.supabaseClient().from("parts").insert(h).select("id").single(),y]);if(clearTimeout(u),_&&e.isMissingColumnError(_,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving parts by location"));if(_&&e.isMissingColumnError(_,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then add the part again.");if(_&&e.isMissingColumnError(_,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then add the part again.");if(_&&e.isMissingColumnError(_,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then add the part again.");if(_)throw _;e.setActivePartId(w?.id||null),e.clearPartSearchState(),e.showNotice("Part added."),f.reset(),await e.render()}catch(h){o&&(o.textContent=h.message||"Could not add part.")}finally{u&&clearTimeout(u),l&&l.isConnected&&(l.disabled=!1,l.textContent="Add Part")}}async function m(p){p.preventDefault();let f=p.target,o=f.querySelector("button[type='submit']"),l=e.getParts().find(h=>h.id===f.dataset.restockPart),g=Number(new n(f).get("quantity"))||0;if(!l||g<=0)return;let u=o?.textContent||"Restock";o&&(o.disabled=!0,o.textContent="Saving...");try{let{error:h}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:(Number(l.quantity_on_hand)||0)+g}).eq("id",l.id).eq("company_id",e.getActiveCompanyId()),"Part restock timed out. Check your connection and try again.",15e3);if(h)throw h;e.showNotice("Part restocked."),await e.render()}catch(h){e.showNotice(`Could not restock part: ${h.message||h}`,"warning")}finally{o&&(o.disabled=!1,o.textContent=u)}}async function r(p){p.preventDefault();let f=p.currentTarget,o=f.querySelector("button[type='submit']"),l=e.getParts().find(h=>h.id===f.dataset.usePart),g=Number(new n(f).get("quantity"))||0;if(!l||g<=0)return;let u=o?.textContent||"Use";o&&(o.disabled=!0,o.textContent="Saving...");try{let h=Number(l.quantity_on_hand)||0,y=Math.max(0,h-g),{error:w}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({quantity_on_hand:y}).eq("id",l.id).eq("company_id",e.getActiveCompanyId()),"Part use save timed out. Check your connection and try again.",15e3);if(w)throw w;e.showNotice("Part used."),await e.render()}catch(h){e.showNotice(`Could not use part: ${h.message||h}`,"warning")}finally{o&&(o.disabled=!1,o.textContent=u)}}async function c(p){p.preventDefault();let f=p.currentTarget,o=f.dataset.editPart,l=t.querySelector(`[data-part-edit-error="${o}"]`),g=f.querySelector("button[type='submit']"),u=new n(f);l&&(l.textContent="");let h=g?.textContent||"Save Part";g&&(g.disabled=!0,g.textContent="Saving...");let y={name:String(u.get("name")||"").trim(),sku:u.get("sku")||null,supplier_name:u.get("supplier_name")||null,machine_note:u.get("machine_note")||null,quantity_on_hand:Number(u.get("quantity_on_hand"))||0,reorder_point:Number(u.get("reorder_point"))||0,unit_cost:Number(u.get("unit_cost"))||0};try{if(!y.name)throw new Error("Part name is required.");let{error:w}=await e.withOperationTimeout(e.supabaseClient().from("parts").update(y).eq("id",o).eq("company_id",e.getActiveCompanyId()),"Part save timed out. Check your connection and try again.",15e3);if(w&&e.isMissingColumnError(w,"supplier_name"))throw e.setPartSuppliersReady(!1),new Error("Source/vendor is not active in Supabase yet. Run supabase/step-next-part-suppliers.sql, then save again.");if(w&&e.isMissingColumnError(w,"unit_cost"))throw e.setPartCostsReady(!1),new Error("Unit cost is not active in Supabase yet. Run supabase/step-next-part-costs.sql, then save again.");if(w&&e.isMissingColumnError(w,"machine_note"))throw e.setPartMachineNotesReady(!1),new Error("Machine note is not active in Supabase yet. Run supabase/step-next-part-machine-note.sql, then save again.");if(w)throw w;e.setActivePartId(null),e.clearPartSearchState(),e.showNotice("Part saved."),await e.render()}catch(w){l&&(l.textContent=w.message||"Could not save part.")}finally{g&&(g.disabled=!1,g.textContent=h)}}async function d(p){p.preventDefault();let f=p.currentTarget,o=t.querySelector("#part-source-error"),l=f.querySelector("button[type='submit']"),g=new n(f),u=String(g.get("old_source")||"").trim(),h=String(g.get("new_source")||"").trim();if(o&&(o.textContent=""),!!u){if(!e.getPartSuppliersReady()){o&&(o.textContent="Run supabase/step-next-part-suppliers.sql before editing sources.");return}if(u===h){o&&(o.textContent="Change the source name before saving.");return}l&&(l.disabled=!0,l.textContent="Renaming...");try{let{error:y}=await e.withOperationTimeout(e.supabaseClient().from("parts").update({supplier_name:h||null}).eq("company_id",e.getActiveCompanyId()).eq("supplier_name",u),"Part source rename timed out. Check your connection and try again.",15e3);if(y)throw e.isMissingColumnError(y,"supplier_name")&&e.setPartSuppliersReady(!1),new Error(e.getPartSuppliersReady()?y.message:"Run supabase/step-next-part-suppliers.sql before editing sources.");e.showNotice("Part source updated."),await e.render()}catch(y){o&&(o.textContent=y.message||"Could not update part source.")}finally{l&&(l.disabled=!1,l.textContent="Rename")}}}return{bindPartInventoryWorkflowEvents:a,createPart:i,restockPart:m,usePartFromInventory:r,updatePart:c,renamePartSource:d}}window.MaintainOpsPartInventoryWorkflow={createPartInventoryWorkflow:s},typeof Ge<"u"&&(Ge.exports={createPartInventoryWorkflow:s})})()});var Dt=B((Nn,we)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.consoleRef||console;async function i(m){m.preventDefault();let r=m.target,c=r.querySelector("button[type='submit']"),d=t.querySelector("#quick-update-error"),p=e.getWorkOrders().find(o=>o.id===e.getActiveWorkOrderId()),f=new n(r);c.disabled=!0,c.textContent="Saving...",d&&(d.textContent="");try{let o=f.get("asset_id")||null,l=String(f.get("new_asset_name")||"").trim();if(o&&l)throw new Error("Choose existing equipment or create new equipment, not both.");if(l){let{data:_,error:P}=await e.createQuickFixAsset(l,"running");if(P){c.disabled=!1,c.textContent="Save Quick Update",d&&(d.textContent=`Could not add equipment: ${P.message}`);return}o=_.id}if(!l&&!e.confirmAssetLocationRouting(o,"saving this work update",d))return;let g={title:e.requiredText(f.get("title"),"Issue"),description:e.descriptionWithAssignmentNote(p?.description||"",f.get("assigned_to")),asset_id:o,location_id:e.locationIdForAsset(o),due_at:e.workOrderDateValue(f.get("due_at")),status:f.get("status"),priority:f.get("priority"),assigned_to:e.assignedUserFromForm(f),...e.procedureColumn(f.get("procedure_template_id")),resolution_summary:f.get("resolution_summary")||null};e.applySafetyRequirementPayload(g);let u=f.get("safety_devices_checked")==="on";if(g.status==="completed"&&p?.status!=="completed"){let _=e.blocksProcedureCompletion(p,g.procedure_template_id||null);if(_){e.setWorkOrderActionWarning(e.getActiveWorkOrderId(),_),c.disabled=!1,c.textContent="Save Quick Update",d&&(d.textContent=_);return}if(e.applySafetyCheckPayload(g,u),e.requiresSafetyDeviceCheck(g)&&!g.safety_devices_checked){c.disabled=!1,c.textContent="Save Quick Update",d&&(d.textContent="Check safety devices before completing work tied to equipment.");return}g.completed_at=new Date().toISOString()}g.status!=="completed"?(g.completed_at=null,e.applySafetyCheckPayload(g,!1)):p?.status==="completed"&&e.applySafetyCheckPayload(g,g.safety_check_required&&(u||e.hasCompletedSafetyDeviceCheck(p)));let{error:h}=await e.withOperationTimeout(e.updateWorkOrderSafely(g,e.getActiveWorkOrderId()),"Quick update save timed out. Check your connection and try again.",2e4);if(h){c.disabled=!1,c.textContent="Save Quick Update",d&&(d.textContent=`Could not save update: ${e.friendlyWorkOrderSaveError(h)}`);return}let y=[];if(g.asset_id&&f.get("machine_down")==="on"){let _=await e.updateAssetStatus(g.asset_id,"offline");_?y.push(`equipment status did not update: ${_.message}`):await e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"asset_status_updated","Equipment marked offline/down.")}let w=await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"quick_update",e.describeWorkOrderChanges(p,Object.fromEntries(f.entries()))),"Activity log timed out.",8e3).catch(_=>_);l&&await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"equipment_created",`Equipment created from work order: ${l}.`),"Activity log timed out.",8e3).catch(()=>null),w&&y.push(`history did not update: ${w.message}`),e.setWorkOrderActionWarning("",""),e.showNotice(y.length?`Quick update saved with warning: ${y[0]}`:"Quick update saved.",y.length?"warning":"success"),await e.render()}catch(o){a.error("Quick update save failed",o),c.disabled=!1,c.textContent="Save Quick Update",d&&(d.textContent=`Could not save update: ${o.message||o}`)}}return{updateWorkOrderQuickView:i}}typeof we<"u"&&we.exports&&(we.exports={createWorkOrderQuickUpdateWorkflow:s}),window.MaintainOpsWorkOrderQuickUpdateWorkflow={createWorkOrderQuickUpdateWorkflow:s}})()});var Tt=B((Un,ve)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.alertRef||alert,i=e.CSSRef||CSS;function m(C){return String(C.get("location_new")||C.get("location_existing")||C.get("location")||"").trim()||null}function r(){return e.getSession?.()?.user?.id||null}function c(C){return(e.getAssets?.()||[]).find(v=>v.id===C)||null}function d(C,v){if(!C)return[];let S={name:"name",asset_code:"serial number",manufacturer:"manufacturer",model:"model",location_id:"location",location:"area / spot",parent_asset_id:"primary equipment",asset_type:"type",safety_devices_required:"safety requirement",status:"status"};return Object.keys(S).filter(b=>String(C[b]??"")!==String(v[b]??"")).map(b=>S[b])}function p(C){return e.isMissingColumnError(C,"manufacturer")||e.isMissingColumnError(C,"model")}async function f(C){C.preventDefault();let v=C.currentTarget,S=t.querySelector("#asset-create-error");S&&(S.textContent="");let b=v.querySelector("button[type='submit']"),E=b?.textContent||"Add Equipment",T=C.submitter?.dataset?.assetContinue==="true";b&&(b.disabled=!0,b.textContent="Saving...");try{let D=new n(v),I={company_id:e.getActiveCompanyId(),location_id:D.get("location_id")||e.activeLocationDatabaseId(),name:e.requiredText(D.get("name"),"Equipment name"),asset_code:String(D.get("asset_code")||"").trim()||null,manufacturer:String(D.get("manufacturer")||"").trim()||null,model:String(D.get("model")||"").trim()||null,location:m(D),parent_asset_id:D.get("parent_asset_id")||null,asset_type:D.get("asset_type")||"machine",safety_devices_required:D.get("safety_devices_required")==="on",status:"running",created_by:r()},k=e.supabaseClient().from("assets").insert(I).select("id").single(),{data:O,error:q}=await e.withOperationTimeout(k,"Equipment save timed out. Check your connection and try again.",15e3);if(q&&e.isMissingColumnError(q,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(q&&e.isMissingColumnError(q,"created_by"))throw new Error("Run supabase/step-next-asset-events.sql before saving equipment history.");if(q&&p(q))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(q&&e.isAssetHierarchySchemaError(q))throw new Error(e.equipmentSchemaMessage(q));if(q)throw q;O?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(O.id,"created",`Created ${I.name}.`),T&&O?.id?(e.setActiveAssetId(O.id),e.showNotice("Equipment saved. Add PM, parts, files, or sub-equipment from this page.")):e.showNotice("Equipment added."),await e.render()}catch(D){S?S.textContent=D.message:a(D.message)}finally{b&&(b.disabled=!1,b.textContent=E)}}async function o(C){C.preventDefault();let v=C.currentTarget,S=t.querySelector("#asset-edit-error");S&&(S.textContent="");let b=v.querySelector("button[type='submit']"),E=b?.textContent||"Save Equipment";b&&(b.disabled=!0,b.textContent="Saving...");try{let T=new n(v),D=c(e.getActiveAssetId()),I={name:e.requiredText(T.get("name"),"Equipment name"),asset_code:String(T.get("asset_code")||"").trim()||null,manufacturer:String(T.get("manufacturer")||"").trim()||null,model:String(T.get("model")||"").trim()||null,location_id:T.get("location_id")||e.activeLocationDatabaseId(),location:m(T),parent_asset_id:T.get("parent_asset_id")||null,asset_type:T.get("asset_type")||"machine",safety_devices_required:T.get("safety_devices_required")==="on",status:T.get("status")},{error:k}=await e.withOperationTimeout(e.supabaseClient().from("assets").update(I).eq("id",e.getActiveAssetId()).eq("company_id",e.getActiveCompanyId()),"Equipment save timed out. Check your connection and try again.",15e3);if(k&&e.isMissingColumnError(k,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving equipment locations"));if(k&&p(k))throw new Error("Run supabase/step-next-asset-audit-fields.sql before saving manufacturer/model.");if(k&&e.isAssetHierarchySchemaError(k))throw new Error(e.equipmentSchemaMessage(k));if(k)throw k;let O=d(D,I);O.length&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(e.getActiveAssetId(),"updated",`Updated ${O.join(", ")}.`),e.showNotice("Equipment saved."),await e.render()}catch(T){S?S.textContent=T.message:a(T.message)}finally{b&&(b.disabled=!1,b.textContent=E)}}async function l(C,v){let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("assets").update({status:v}).eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment status save timed out. Check your connection and try again.",12e3);return!S&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(C,"status_changed",`Status changed to ${v}.`),S||null}async function g(C){C.preventDefault();let v=C.currentTarget,S=v.dataset.attachAssetPart,b=t.querySelector(`[data-asset-part-error="${i.escape(S)}"]`);b&&(b.textContent="");let E=v.querySelector("button[type='submit']"),T=E?.textContent||"Attach Part";E&&(E.disabled=!0,E.textContent="Attaching...");try{let D=new n(v),I=D.get("part_id");if(!I)throw new Error("Select a part to attach.");let k=Math.max(1,Number(D.get("quantity_recommended"))||1),O=String(D.get("note")||"").trim()||null,{error:q}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").insert({company_id:e.getActiveCompanyId(),asset_id:S,part_id:I,quantity_recommended:k,note:O}),"Equipment part link save timed out. Check your connection and try again.",15e3);if(q)throw e.isMissingTableError?.(q,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):q.code==="23505"?new Error("This part is already linked to this equipment."):q;e.showNotice("Part linked to equipment."),await e.render()}catch(D){b?b.textContent=D.message||"Could not link part to equipment.":e.showNotice(D.message||"Could not link part to equipment.","warning")}finally{E&&(E.disabled=!1,E.textContent=T)}}async function u(C){let v=t.querySelector("[data-asset-part-error]");v&&(v.textContent="");try{let{error:S}=await e.withOperationTimeout(e.supabaseClient().from("asset_parts").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment part unlink timed out. Check your connection and try again.",15e3);if(S)throw e.isMissingTableError?.(S,"asset_parts")?(e.setAssetPartsReady(!1),new Error("Run supabase/step-next-asset-parts.sql before linking parts to equipment.")):S;e.showNotice("Part link removed."),await e.render()}catch(S){v?v.textContent=S.message||"Could not remove linked part.":e.showNotice(S.message||"Could not remove linked part.","warning")}}function h(C){return{workOrders:e.getWorkOrders().filter(v=>v.asset_id===C).length,children:e.childAssetsFor(C).length,schedules:e.getPreventiveSchedules().filter(v=>v.asset_id===C).length,requests:e.getMaintenanceRequests().filter(v=>v.asset_id===C).length}}function y(C){let v=h(C);return Object.values(v).some(Boolean)}async function w(C){let[v,S,b]=await Promise.all([_("work_orders",C),_("preventive_schedules",C),_("maintenance_requests",C)]);return{workOrders:v,children:e.childAssetsFor(C).length,schedules:S,requests:b}}async function _(C,v){let{count:S,error:b}=await e.withOperationTimeout(e.supabaseClient().from(C).select("id",{count:"exact",head:!0}).eq("company_id",e.getActiveCompanyId()).eq("asset_id",v),`Equipment delete check timed out while checking ${C}.`,15e3);if(b)throw new Error(`Could not verify linked ${C.replaceAll("_"," ")} before deleting equipment: ${b.message}`);return S||0}async function P(C){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let v=t.querySelector("#asset-delete-error");v&&(v.textContent="");try{let S=await w(C),b=e.assetDeleteBlockerMessage(S);if(b){v&&(v.textContent=b);return}e.setPendingDeleteAssetId(C),e.renderWorkspace()}catch(S){v?v.textContent=S.message||"Could not verify equipment links before delete.":e.showNotice(S.message||"Could not verify equipment links before delete.","warning")}}async function $(C){if(!e.canDeleteEquipment()){a("Only company admins and managers can delete equipment.");return}let v=t.querySelector("#asset-delete-error");v&&(v.textContent="");let S=t.querySelector(`[data-confirm-delete-asset="${i.escape(C)}"]`);S&&(S.disabled=!0,S.textContent="Deleting...");try{let b=await w(C),E=e.assetDeleteBlockerMessage(b);if(E)throw new Error(E);let T=e.getAssetDocumentStoragePaths?.(C)||[];if(T.length){let I=await e.withOperationTimeout(e.removeAssetDocumentStorage(T),"Equipment file cleanup timed out.",15e3);if(I.error)throw new Error(`Could not remove equipment files: ${I.error.message}`)}let{error:D}=await e.withOperationTimeout(e.supabaseClient().from("assets").delete().eq("id",C).eq("company_id",e.getActiveCompanyId()),"Equipment delete timed out. Check your connection and try again.",15e3);if(D)throw new Error(D.message.includes("violates foreign key constraint")?"This equipment is linked to records and cannot be deleted.":D.message);e.setActiveAssetId(null),e.setPendingDeleteAssetId(null),e.setActiveSection("assets"),e.showNotice("Equipment deleted."),await e.render()}catch(b){v&&(v.textContent=b.message||"Could not delete equipment."),S&&(S.disabled=!1,S.textContent="Permanently Delete")}}async function A(C,v="running"){let S={company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId(),name:C,asset_type:"machine",safety_devices_required:!0,status:v,created_by:r()},b=await e.withOperationTimeout(e.supabaseClient().from("assets").insert(S).select().single(),"Equipment save timed out. Check your connection and try again.",15e3);return b.error&&e.isMissingColumnError(b.error,"location_id")?(e.setLocationsReady(!1),e.withSetupError(b,e.databaseSetupRequiredMessage("adding equipment in this location"))):b.error&&e.isMissingColumnError(b.error,"created_by")?e.withSetupError(b,"Run supabase/step-next-asset-events.sql before saving equipment history."):b.error&&e.isAssetHierarchySchemaError(b.error)?e.withSetupError(b,e.equipmentSchemaMessage(b.error).replace("saving","adding")):(!b.error&&b.data?.id&&typeof e.recordAssetEvent=="function"&&await e.recordAssetEvent(b.data.id,"created",`Created ${C}.`),b)}return{assetDeleteBlockers:h,assetHasDeleteBlockers:y,attachAssetPart:g,countAssetLinkedRows:_,createAsset:f,createQuickFixAsset:A,deleteAsset:$,loadAssetDeleteBlockers:w,removeAssetPart:u,requestDeleteAsset:P,updateAsset:o,updateAssetStatus:l}}typeof ve<"u"&&ve.exports&&(ve.exports={createAssetWorkflow:s}),window.MaintainOpsAssetWorkflow={createAssetWorkflow:s}})()});var It=B((Qn,ke)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.alertRef||alert,i=e.CSSRef||CSS;function m(){let l=t.querySelector("#detail-panel");l.innerHTML=e.renderRequestFormContent()}async function r(l){l.preventDefault(),await c(l.target)}async function c(l){let g=t.querySelector("#request-error"),u=l.querySelector("button[type='submit']");g&&(g.textContent=""),u&&(u.disabled=!0,u.textContent="Submitting...");try{let h=new n(l),y=h.get("asset_id")||null,w=String(h.get("equipment_note")||"").trim();if(y&&w)throw new Error("Choose saved equipment or enter equipment not listed / a general area, not both.");if(!y&&!w)throw new Error("Choose saved equipment or enter equipment not listed / a general area.");if(!e.confirmAssetLocationRouting(y,"submitting this request",g))return;let _=w||e.assetNameFor?.(y)||"Saved equipment",P=e.requiredText(h.get("description"),"Request details"),$=e.requiredText(h.get("requester_name"),"Your name"),A={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(y),title:e.requiredText(h.get("title"),"Request title"),description:`Machine / area: ${_}

${P}`,asset_id:y,priority:h.get("priority"),status:"submitted",requested_by:e.getSession().user.id,requested_by_name:$};if(!e.getRequestsReady())throw new Error("Run supabase/step-next-maintenance-requests.sql before submitting requests.");let{data:C,error:v}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").insert(A).select("*").single(),"Request save timed out. Check your connection and try again.",15e3);if(v&&e.isMissingColumnError(v,"location_id"))throw e.setLocationsReady(!1),new Error(e.databaseSetupRequiredMessage("saving requests by location"));if(v)throw v;let S=h.get("photo"),b="";if(S&&S.name){let T=await e.addPhotoToMaintenanceRequest(C.id,S);T&&(b=` Photo did not upload: ${T.message||T}`)}let E=await e.notifyRequestEmailer(C.id);E?.error&&console.warn("Request email notification did not send",E.error),e.setActiveSection("requests"),e.setRequestViewFilter("active"),e.resetRequestsPage(),e.showNotice(`Request submitted.${b}`,b?"warning":"success"),await e.render()}catch(h){g?g.textContent=h.message||"Could not submit request.":a(h.message||h)}finally{u&&(u.disabled=!1,u.textContent="Submit Request")}}async function d(l){let g=e.getMaintenanceRequests().find(h=>h.id===l);if(!g)return;let u=t.querySelector(`[data-convert-request="${i.escape(l)}"]`);u&&(u.disabled=!0,u.textContent="Converting...");try{let h={company_id:e.getActiveCompanyId(),location_id:g.location_id||e.locationIdForAsset(g.asset_id),title:g.title,description:e.descriptionWithRequestPhotoNote(g.description,g),asset_id:g.asset_id||null,priority:g.priority||"medium",type:"corrective",status:"open",created_by:e.getSession().user.id};e.applySafetyRequirementPayload(h),e.applySafetyCheckPayload(h,!1);let{data:y,error:w}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",h,{returnSingle:!0}),"Request conversion timed out. Check your connection and try again.",15e3);if(w)throw w;let{error:_}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").update({status:"converted",reviewed_by:e.getSession().user.id,reviewed_at:new Date().toISOString(),converted_work_order_id:y.id}).eq("id",l).eq("company_id",e.getActiveCompanyId()),"Request status update timed out. Check your connection and try again.",15e3);if(_)throw _;e.setActiveSection("work"),e.setActiveWorkOrderId(y.id),await e.withOperationTimeout(e.recordWorkOrderEvent(y.id,"request_converted","Request converted to work order."),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Request converted to work order."),await e.render()}catch(h){e.showNotice(`Could not convert request: ${h.message||h}`,"warning"),u&&(u.disabled=!1,u.textContent="Convert to Work Order")}}function p(l){let g=e.getMaintenanceRequests().find(u=>u.id===l);g&&(e.setQuickFixRequestId(l),e.setQuickFixAssetId(g.asset_id||null),e.setQuickFixMode(!0),e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setCreateWorkOrderMode(!1),e.setActiveSection("mywork"),e.renderWorkspace())}function f(l){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}e.getMaintenanceRequests().some(g=>g.id===l)&&(e.setPendingDeleteRequestId(l),e.renderWorkspace())}async function o(l){if(!e.canDeleteOperationalRecords()){a("Only company admins and managers can delete requests.");return}let g=e.getMaintenanceRequests().find(h=>h.id===l);if(!g)return;let u=t.querySelector(`[data-confirm-delete-request="${i.escape(l)}"]`);u&&(u.disabled=!0,u.textContent="Deleting...");try{if(g.photo_storage_path){let _=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").remove([g.photo_storage_path]),"Request photo cleanup timed out.",15e3);if(_.error)throw new Error(`Could not remove request photo: ${_.error.message}`)}let{data:h,error:y}=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").delete().eq("id",l).eq("company_id",e.getActiveCompanyId()).select("id"),"Request delete timed out. Check your connection and try again.",15e3);if(y)throw y;if(!h?.length)throw new Error("Request was not deleted. Run supabase/step-next-cleanup-delete-paths.sql, then try again.");let w=await e.withOperationTimeout(e.supabaseClient().from("maintenance_requests").select("id").eq("id",l).eq("company_id",e.getActiveCompanyId()).maybeSingle(),"Request delete verification timed out. Refresh and check the request list.",15e3);if(w.error)throw new Error(`Request delete verification failed: ${w.error.message}`);if(w.data)throw new Error("Request delete did not persist in Supabase.");e.setPendingDeleteRequestId(null),e.showNotice("Request deleted."),await e.render()}catch(h){e.showNotice(h.message||"Could not delete request.","warning"),u&&(u.disabled=!1,u.textContent="Permanently Delete")}}return{convertRequestToWorkOrder:d,createRequest:r,createRequestFromForm:c,deleteMaintenanceRequest:o,openQuickFixForRequest:p,renderRequestForm:m,requestDeleteMaintenanceRequest:f}}typeof ke<"u"&&ke.exports&&(ke.exports={createRequestLifecycleWorkflow:s}),window.MaintainOpsRequestLifecycleWorkflow={createRequestLifecycleWorkflow:s}})()});var Ft=B((Bn,_e)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.alertRef||alert;async function i(m){m.preventDefault();let r=m.target,c=r.querySelector("button[type='submit']"),d=t.querySelector("#create-work-order-error");c.disabled=!0,c.textContent="Creating...",d&&(d.textContent="");try{let p=new n(r),f=p.get("status")||"open",o=p.get("asset_id")||null,l=String(p.get("new_asset_name")||"").trim();if(o&&l)throw new Error("Choose existing equipment or create new equipment, not both.");if(l){let{data:A,error:C}=await e.createQuickFixAsset(l,"running");if(C){d&&(d.textContent=`Could not add equipment: ${C.message}`);return}o=A.id}if(!l&&!e.confirmAssetLocationRouting(o,"creating this work order",d))return;if(f==="completed"&&e.assetRequiresSafety(o)&&p.get("safety_devices_checked")!=="on"){d&&(d.textContent="Check safety devices before creating completed work tied to equipment.");return}let g=f==="completed"?e.blocksProcedureCompletion(null,p.get("procedure_template_id")||null):"";if(g){e.setWorkOrderActionWarning("",""),d&&(d.textContent=`${g} Create the work order first, then complete the checklist before marking it complete.`);return}let u={company_id:e.getActiveCompanyId(),location_id:e.locationIdForAsset(o),title:e.requiredText(p.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(p.get("description"),p.get("assigned_to")),asset_id:o,priority:p.get("priority"),type:p.get("type")||"corrective",due_at:e.workOrderDateValue(p.get("due_at")),assigned_to:e.assignedUserFromForm(p),...e.procedureColumn(p.get("procedure_template_id")),status:f,created_by:e.getSession().user.id,actual_minutes:Number(p.get("actual_minutes"))||0,failure_cause:p.get("failure_cause")||null,resolution_summary:p.get("resolution_summary")||null,follow_up_needed:p.get("follow_up_needed")==="on",completion_notes:p.get("completion_notes")||null,completed_at:f==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(u),e.applySafetyCheckPayload(u,f==="completed"&&u.safety_check_required&&p.get("safety_devices_checked")==="on");let{data:h,error:y}=await e.withOperationTimeout(e.insertWithOptionalProcedure("work_orders",u,{returnSingle:!0}),"Work order creation timed out. Check your connection and try again.");if(y){d&&(d.textContent=`Could not create work order: ${e.friendlyWorkOrderSaveError(y)}`);return}await e.recordWorkOrderEvent(h.id,"created","Work order created."),l&&await e.recordWorkOrderEvent(h.id,"equipment_created",`Equipment created from work order: ${l}.`);let w=[],_=p.get("part_id");if(_){let A=e.getParts().find(v=>v.id===_),C=await e.addPartUsageToWorkOrder(h.id,A,Number(p.get("quantity_used"))||1);C?w.push(`part usage failed: ${C.message}`):await e.recordWorkOrderEvent(h.id,"part_used",`Part recorded: ${A?.name||"Part"}.`)}let P=p.get("photo");if(P&&P.name){let A=await e.addPhotoToWorkOrder(h.id,P);A?w.push(`photo upload failed: ${A.message}`):await e.recordWorkOrderEvent(h.id,"photo_uploaded",`Photo uploaded: ${P.name}.`)}let $=String(p.get("initial_comment")||"").trim();if($){let A=await e.addCommentToWorkOrder(h.id,$);A?w.push(`comment failed: ${A.message}`):await e.recordWorkOrderEvent(h.id,"comment_added","Initial comment added.")}e.setActiveWorkOrderId(h.id),e.setCreateWorkOrderMode(!1),e.showNotice(w.length?`Work order created with warning: ${w[0]}`:"Work order created.",w.length?"warning":"success"),await e.render()}catch(p){d?d.textContent=`Could not create work order: ${p.message||p}`:a(p.message||p)}finally{c.disabled=!1,c.textContent="Create Work Order"}}return{createWorkOrder:i}}typeof _e<"u"&&_e.exports&&(_e.exports={createWorkOrderCreationWorkflow:s}),window.MaintainOpsWorkOrderCreationWorkflow={createWorkOrderCreationWorkflow:s}})()});var Lt=B((jn,Se)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.consoleRef||console;async function i(m){m.preventDefault();let c=m.target.querySelector("button[type='submit']"),d=t.querySelector("#work-order-save-error");c.disabled=!0,c.textContent="Saving...",d&&(d.textContent="");try{let p=new n(m.target),f=e.getActiveWorkOrderId(),o=e.getWorkOrders().find($=>$.id===f),l=t.querySelector("#status-select")?.value||o?.status||"open",g=p.get("asset_id")||null;if(typeof e.confirmAssetLocationRouting=="function"&&!e.confirmAssetLocationRouting(g,"saving this work order",d)){c.disabled=!1,c.textContent="Save Work Order";return}let u={title:e.requiredText(p.get("title"),"Work order title"),description:e.descriptionWithAssignmentNote(p.get("description"),p.get("assigned_to")),due_at:e.workOrderDateValue(p.get("due_at")),asset_id:g,location_id:e.locationIdForAsset(g),status:l,priority:p.get("priority"),type:p.get("type"),assigned_to:e.assignedUserFromForm(p),...e.procedureColumn(p.get("procedure_template_id")),failure_cause:p.get("failure_cause")||null,resolution_summary:p.get("resolution_summary")||null,follow_up_needed:p.get("follow_up_needed")==="on",actual_minutes:Number(p.get("actual_minutes"))||0};if(u.safety_check_required=e.assetRequiresSafety(g),u.status==="completed"&&u.safety_check_required&&!e.hasCompletedSafetyDeviceCheck(o)&&p.get("safety_devices_checked")!=="on"){c.disabled=!1,c.textContent="Save Work Order",d&&(d.textContent="Use Complete Work and check safety devices before completing equipment work.");return}let h=(o?.procedure_template_id||"")!==(u.procedure_template_id||""),y=u.status==="completed"&&(o?.status!=="completed"||h)?e.blocksProcedureCompletion(o,u.procedure_template_id||null):"";if(y){e.setWorkOrderActionWarning(f,y),c.disabled=!1,c.textContent="Save Work Order",d&&(d.textContent=y);return}u.status==="completed"&&o?.status!=="completed"?(u.completed_at=new Date().toISOString(),e.applySafetyCheckPayload(u,u.safety_check_required&&(p.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)))):u.status!=="completed"?(u.completed_at=null,e.applySafetyCheckPayload(u,!1)):o?.status==="completed"&&u.safety_check_required&&p.has("safety_devices_checked")?e.applySafetyCheckPayload(u,p.get("safety_devices_checked")==="on"||e.hasCompletedSafetyDeviceCheck(o)):o?.status==="completed"&&!u.safety_check_required&&e.applySafetyCheckPayload(u,!1);let{error:w}=await e.withOperationTimeout(e.updateWorkOrderSafely(u,f),"Work order save timed out. Check your connection and try again.",2e4);if(w){c.disabled=!1,c.textContent="Save Work Order",d&&(d.textContent=`Could not save work order: ${e.friendlyWorkOrderSaveError(w)}`);return}let _={...Object.fromEntries(p.entries()),status:l},P=await e.withOperationTimeout(e.recordWorkOrderEvent(f,"updated",e.describeWorkOrderChanges(o,_)),"Activity log timed out.",8e3).catch($=>$);e.setWorkOrderActionWarning("",""),e.showNotice(P?`Work order saved, but history did not update: ${P.message}`:"Work order saved.",P?"warning":"success"),await e.render()}catch(p){a.error("Work order save failed",p),c.disabled=!1,c.textContent="Save Work Order",d&&(d.textContent=`Could not save work order: ${p.message||p}`)}finally{c&&c.isConnected&&(c.disabled=!1,c.textContent="Save Work Order")}}return{updateWorkOrderDetails:i}}typeof Se<"u"&&Se.exports&&(Se.exports={createWorkOrderDetailEditWorkflow:s}),window.MaintainOpsWorkOrderDetailEditWorkflow={createWorkOrderDetailEditWorkflow:s}})()});var Nt=B((zn,qe)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData;async function a(m){m.preventDefault();let r=m.currentTarget,c=t.querySelector("#parts-used-error"),d=r.querySelector("button[type='submit']");c&&(c.textContent=""),d&&(d.disabled=!0,d.textContent="Recording...");try{let p=new n(r),f=p.get("part_id"),o=Number(p.get("quantity_used"))||1,l=e.getParts().find(u=>u.id===f);if(!e.getActiveWorkOrderId())throw new Error("Open a work order before recording parts.");if(!l)throw new Error("Choose a part first.");let g=await i(e.getActiveWorkOrderId(),l,o);if(g)throw g;e.showNotice("Part recorded on work order."),await e.render()}catch(p){c&&(c.textContent=p.message||"Could not record part used.")}finally{d&&(d.disabled=!1,d.textContent="Record Part Used")}}async function i(m,r,c){if(!r)return new Error("Choose a part first.");let{error:d}=await e.withOperationTimeout(e.supabaseClient().rpc("record_work_order_part_usage",{p_company_id:e.getActiveCompanyId(),p_work_order_id:m,p_part_id:r.id,p_quantity:c}),"Part usage save timed out.");return d||null}return{addPartUsageToWorkOrder:i,recordPartUsed:a}}typeof qe<"u"&&qe.exports&&(qe.exports={createPartUsageWorkflow:s}),window.MaintainOpsPartUsageWorkflow={createPartUsageWorkflow:s}})()});var Ut=B((Gn,Ce)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,i=e.consoleRef||console,m=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),r=25*1024*1024,c=5*1024*1024,d=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]),p=new Set;async function f(k){k.preventDefault();let O=k.currentTarget,q=O.dataset.partDocument,R=t.querySelector(`[data-part-document-error="${q}"]`),M=O.querySelector("button[type='submit']"),L=new n(O),N=L.get("document"),U=h(L.get("document_type"));if(R&&(R.textContent=""),!e.getPartDocumentsReady()){R&&(R.textContent="Run supabase/step-next-part-documents.sql before attaching files.");return}if(!N||!N.name){R&&(R.textContent="Choose a receipt, invoice, photo, or PDF first.");return}if(S(N)){R&&(R.textContent=b()),await $("part document",N,b());return}M&&(M.disabled=!0,M.textContent="Attaching...");let G=await C(N),H=G.fileName||e.safeFileName(N.name||"part-file"),ne=`${e.getActiveCompanyId()}/${q}/${a.randomUUID()}-${H}`;try{let ae=await e.withOperationTimeout(e.supabaseClient().storage.from("part-documents").upload(ne,G.blob,{contentType:G.contentType,upsert:!1}),"Part file upload timed out. Check your connection and try again.",25e3);if(ae.error)throw ae.error;let K={company_id:e.getActiveCompanyId(),part_id:q,uploaded_by:e.getSession().user.id,storage_path:ne,file_name:H,content_type:G.contentType,document_type:U,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(N.name||"part-file"),original_size_bytes:N.size||null},{error:re}=await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(K),"Part file record save timed out. Check your connection and try again.",15e3);if(re&&e.isColumnSchemaError(re,["document_type","file_size_bytes","original_file_name","original_size_bytes"])&&(delete K.document_type,delete K.file_size_bytes,delete K.original_file_name,delete K.original_size_bytes,re=(await e.withOperationTimeout(e.supabaseClient().from("part_documents").insert(K),"Part file record retry timed out. Check your connection and try again.",15e3)).error),re)throw await w("part-documents",ne),e.isColumnSchemaError(re,["part_documents"])&&e.setPartDocumentsReady(!1),new Error(e.getPartDocumentsReady()?re.message:"Run supabase/step-next-part-documents.sql before attaching files.");e.showNotice("Part file attached."),await e.render()}catch(ae){await $("part document",N,ae),R&&(R.textContent=ae.message||"Could not attach file.")}finally{M&&(M.disabled=!1,M.textContent="Attach File")}}async function o(k){k.preventDefault();let O=k.currentTarget,q=O.dataset.assetDocument,R=t.querySelector(`[data-asset-document-error="${q}"]`),M=O.querySelector("button[type='submit']"),L=new n(O),N=L.get("document"),U=u(L.get("document_type"));if(R&&(R.textContent=""),!e.getAssetDocumentsReady?.()){R&&(R.textContent="Run supabase/step-next-asset-documents.sql before uploading equipment files.");return}if(!N||!N.name){R&&(R.textContent="Choose a machine file first.");return}if(S(N)){R&&(R.textContent=b()),await $("equipment file",N,b());return}M&&(M.disabled=!0,M.textContent="Uploading...");let G=await C(N),H=`${e.getActiveCompanyId()}/${q}/${a.randomUUID()}-${G.fileName}`;try{let ne=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").upload(H,G.blob,{contentType:G.contentType,upsert:!1}),"Equipment file upload timed out. Check your connection and try again.",25e3);if(ne.error)throw ne.error;let{error:ae}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").insert({company_id:e.getActiveCompanyId(),asset_id:q,uploaded_by:e.getSession().user.id,storage_path:H,file_name:G.fileName,content_type:G.contentType,document_type:U,file_size_bytes:G.blob.size||null,original_file_name:e.safeFileName(N.name||"machine-photo"),original_size_bytes:N.size||null}),"Equipment file record save timed out. Check your connection and try again.",15e3);if(ae)throw await w("asset-documents",H),e.isColumnSchemaError(ae,["asset_documents"])&&e.setAssetDocumentsReady?.(!1),new Error(e.getAssetDocumentsReady?.()?ae.message:"Run supabase/step-next-asset-documents.sql before uploading equipment files.");e.showNotice("Machine file attached."),await e.render()}catch(ne){await $("equipment file",N,ne),R&&(R.textContent=ne.message||"Could not upload machine file.")}finally{M&&(M.disabled=!1,M.textContent="Attach Machine File")}}async function l(k,O){let q=t.querySelector("[data-asset-document-error]");if(q&&(q.textContent=""),!k||!O){let R="Missing machine file record. Refresh and try again.";q?q.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("asset-documents").remove([O]),"Equipment file delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:M}=await e.withOperationTimeout(e.supabaseClient().from("asset_documents").delete().eq("id",k).eq("company_id",e.getActiveCompanyId()),"Equipment file record delete timed out. Check your connection and try again.",15e3);if(M)throw M;e.showNotice("Machine file deleted."),await e.render()}catch(R){q?q.textContent=R.message||"Could not delete machine file.":e.showNotice(R.message||"Could not delete machine file.","warning")}}async function g(k,O){let q=t.querySelector("#photo-error");if(q&&(q.textContent=""),!k||!O){let R="Missing photo record. Refresh and try again.";q?q.textContent=R:e.showNotice(R,"warning");return}try{let R=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").remove([O]),"Photo delete timed out. Check your connection and try again.",15e3);if(R.error)throw R.error;let{error:M}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").delete().eq("id",k).eq("company_id",e.getActiveCompanyId()),"Photo record delete timed out. Check your connection and try again.",15e3);if(M)throw M;let L=O.split("/").pop()||"photo";await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_deleted",`Photo deleted: ${L}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo deleted."),await e.render()}catch(R){q?q.textContent=R.message||"Could not delete photo.":e.showNotice(R.message||"Could not delete photo.","warning")}}function u(k){return new Set(["machine_photo","schematic","settings","manual","nameplate","inspection","receipt","other"]).has(k)?k:"other"}function h(k){return new Set(["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet","warranty","other"]).has(k)?k:"other"}async function y(k){k.preventDefault();let O=k.currentTarget,q=O.querySelector("button[type='submit']"),R=t.querySelector("#photo-error");R&&(R.textContent="");let M=new n(O).get("photo");if(!M||!M.name){R&&(R.textContent="Choose a photo first.");return}let L=T(M);if(L){R&&(R.textContent=L),await $("work order photo",M,L);return}q.disabled=!0,q.textContent="Uploading...";try{if(!await e.ensureProfileForActiveCompany())throw new Error(e.getAppError());let U=await _(e.getActiveWorkOrderId(),M);if(U)throw U;await e.withOperationTimeout(e.recordWorkOrderEvent(e.getActiveWorkOrderId(),"photo_uploaded",`Photo uploaded: ${M.name}.`),"Activity log timed out.",8e3).catch(()=>null),e.showNotice("Photo uploaded."),await e.render()}catch(N){await $("work order photo",M,N),R&&(R.textContent=`Could not upload photo: ${N.message||N}`)}finally{q.disabled=!1,q.textContent="Upload Photo"}}async function w(k,O){try{let{error:q}=await e.withOperationTimeout(e.supabaseClient().storage.from(k).remove([O]),"Uploaded file cleanup timed out.",1e4);q&&i.warn(`Could not remove uploaded ${k} object`,q)}catch(q){i.warn(`Could not remove uploaded ${k} object`,q)}}async function _(k,O){if(!await e.ensureProfileForActiveCompany())return new Error(e.getAppError());let R=T(O);if(R)return await $("work order photo",O,R),new Error(R);let M=await C(O,A()),L=D(M);if(L)return await $("work order photo",O,L),new Error(L);let N=`${e.getActiveCompanyId()}/${k}/${a.randomUUID()}-${M.fileName}`,U=await e.withOperationTimeout(e.supabaseClient().storage.from("work-order-photos").upload(N,M.blob,{contentType:M.contentType,upsert:!1}),"Photo upload timed out. Check your connection and try again.",25e3);if(U.error)return await $("work order photo",O,U.error),U.error;let G={company_id:e.getActiveCompanyId(),work_order_id:k,uploaded_by:e.getSession().user.id,storage_path:N,file_name:M.fileName,content_type:M.contentType,file_size_bytes:M.blob.size||null,original_file_name:e.safeFileName(O.name||"photo"),original_size_bytes:O.size||null},{error:H}=await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record save timed out. Check your connection and try again.",15e3);return H&&e.isColumnSchemaError(H,["file_size_bytes","original_file_name","original_size_bytes"])&&(delete G.file_size_bytes,delete G.original_file_name,delete G.original_size_bytes,H=(await e.withOperationTimeout(e.supabaseClient().from("work_order_photos").insert(G),"Photo record retry timed out. Check your connection and try again.",15e3)).error),H&&await w("work-order-photos",N),H&&await $("work order photo",O,H),H||null}async function P(k,O){if(!k)return new Error("Request was not saved before photo upload.");let q=T(O);if(q)return await $("request photo",O,q),new Error(q);let R=await C(O,A()),M=D(R);if(M)return await $("request photo",O,M),new Error(M);let L=`${k}/${a.randomUUID()}-${R.fileName}`,N=await e.withOperationTimeout(e.supabaseClient().storage.from("maintenance-request-photos").upload(L,R.blob,{contentType:R.contentType,upsert:!1}),"Request photo upload timed out. Check your connection and try again.",25e3);if(N.error)return await $("request photo",O,N.error),N.error;let{error:U}=await e.withOperationTimeout(e.supabaseClient().rpc("attach_maintenance_request_photo",{target_request_id:k,p_photo_storage_path:L,p_photo_file_name:R.fileName,p_photo_content_type:R.contentType,p_photo_file_size_bytes:R.blob.size||null,p_photo_original_file_name:e.safeFileName(O.name||"photo"),p_photo_original_size_bytes:O.size||null}),"Request photo record save timed out. Check your connection and try again.",15e3);return U&&(await w("maintenance-request-photos",L),await $("request photo",O,U)),U||null}async function $(k,O,q){if(typeof e.createAppIssueReportRecord!="function"||!e.getActiveCompanyId?.()||!e.getSession?.()?.user?.id||e.getAppIssueReportsReady&&!e.getAppIssueReportsReady())return;let R=String(q?.message||q||"Upload failed").slice(0,500),M=e.safeFileName(O?.name||"unknown-file"),L=E(O),N=Number(O?.size||0),U=[k,M,L,N,R].join("|");if(!p.has(U)){p.add(U);try{await e.withOperationTimeout(e.createAppIssueReportRecord(e.supabaseClient(),{company_id:e.getActiveCompanyId(),location_id:e.activeLocationDatabaseId?e.activeLocationDatabaseId():null,reporter_id:e.getSession().user.id,screen:String(e.getActiveSection?.()||k||"upload").slice(0,80),page_url:e.getPageUrl?e.getPageUrl():"",severity:"normal",title:`Upload failed: ${k}`.slice(0,140),details:[`Upload context: ${k}`,`File: ${M}`,`Type: ${L}`,`Size: ${N}`,`Error: ${R}`].join(`
`),status:"open"}),"Upload failure report timed out.",8e3)}catch(G){i.warn("Could not report upload failure",G)}}}function A(){return{targetBytes:256*1024,passes:[{maxDimension:768,quality:.78},{maxDimension:768,quality:.74},{maxDimension:768,quality:.7}]}}async function C(k,O={}){if(typeof e.optimizePhotoOverride=="function")return e.optimizePhotoOverride(k,O);let q=["image/jpeg","image/png","image/webp","image/heic","image/heif"],R=E(k);if(!q.includes(R))return{blob:k,fileName:e.safeFileName(k.name||"photo"),contentType:R};try{if(!m)throw new Error("Browser image optimization is unavailable.");let M=await m(k),L=Number(O.targetBytes||0)||1*1024*1024,N=O.passes||[{maxDimension:2e3,quality:.82},{maxDimension:1800,quality:.78},{maxDimension:1600,quality:.74}],U=null;for(let G of N){let H=await I(M,G.maxDimension,G.quality);if(U=H,H.size<=L)break}if(M.close&&M.close(),!U)throw new Error("Browser could not optimize this image.");return{blob:U,fileName:`${e.fileBaseName(k.name||"photo")}.jpg`,contentType:"image/jpeg"}}catch(M){return i.warn("Photo optimization failed; uploading original.",M),{blob:k,fileName:e.safeFileName(k.name||"photo"),contentType:R}}}function v(k){return["image/jpeg","image/png","image/webp"].includes(E(k))}function S(k){return!v(k)&&Number(k.size||0)>r}function b(){return"This non-image file is over 25 MB. Compress it or split it before uploading."}function E(k){let O=String(k?.type||"").trim().toLowerCase();if(O)return O;let q=String(k?.name||"").toLowerCase();return/\.(jpe?g)$/.test(q)?"image/jpeg":/\.png$/.test(q)?"image/png":/\.webp$/.test(q)?"image/webp":/\.gif$/.test(q)?"image/gif":/\.heic$/.test(q)?"image/heic":/\.heif$/.test(q)?"image/heif":/\.pdf$/.test(q)?"application/pdf":/\.txt$/.test(q)?"text/plain":/\.csv$/.test(q)?"text/csv":/\.doc$/.test(q)?"application/msword":/\.docx$/.test(q)?"application/vnd.openxmlformats-officedocument.wordprocessingml.document":/\.xls$/.test(q)?"application/vnd.ms-excel":/\.xlsx$/.test(q)?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream"}function T(k){let O=E(k);return d.has(O)?"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}function D(k){return d.has(String(k?.contentType||"").toLowerCase())?Number(k?.blob?.size||0)>c?"This photo is still over 5 MB after optimization. Try a smaller photo or screenshot it first.":"":"This upload box accepts photos only. PDF quotes and documents need to be attached in an equipment or part file area."}async function I(k,O,q){let R=Math.min(1,O/Math.max(k.width,k.height)),M=Math.max(1,Math.round(k.width*R)),L=Math.max(1,Math.round(k.height*R)),N=t.createElement("canvas");N.width=M,N.height=L,N.getContext("2d",{alpha:!1}).drawImage(k,0,0,M,L);let G=await new Promise(H=>N.toBlob(H,"image/jpeg",q));if(!G)throw new Error("Browser could not optimize this image.");return G}return{addPhotoToMaintenanceRequest:P,addPhotoToWorkOrder:_,optimizePhoto:C,removeUploadedObject:w,reportUploadFailure:$,deleteAssetDocument:l,deleteWorkOrderPhoto:g,uploadAssetDocument:o,uploadPartDocument:f,uploadPhoto:y}}typeof Ce<"u"&&Ce.exports&&(Ce.exports={createMediaStorageWorkflow:s}),window.MaintainOpsMediaStorageWorkflow={createMediaStorageWorkflow:s}})()});var Qt=B((Vn,$e)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData,a=e.cryptoRef||crypto,i=e.URLRef||URL,m=e.consoleRef||console,r=e.createImageBitmapRef||(typeof createImageBitmap<"u"?createImageBitmap:null),c=25*1024*1024,d=new Set(["image/jpeg","image/png","image/webp","image/gif","image/heic","image/heif"]);async function p(u){u.preventDefault();let h=u.currentTarget,y=t.querySelector("#company-logo-error"),w=h.querySelector("button[type='submit']"),_=new n(h).get("logo");if(y&&(y.textContent=""),!_||!_.name){y&&(y.textContent="Choose a logo image first.");return}w&&(w.disabled=!0,w.textContent="Uploading...");try{let P=l(_);if(P)throw new Error(P);let $=await f(_),A=g($);if(A)throw new Error(A);let C=`${e.getActiveCompanyId()}/logo-${a.randomUUID()}-${$.fileName}`,v=await e.withOperationTimeout(e.supabaseClient().storage.from("company-logos").upload(C,$.blob,{contentType:$.contentType,upsert:!1}),"Company logo upload timed out. Check your connection and try again.",25e3);if(v.error)throw new Error(v.error.message.includes("Bucket not found")?"Run supabase/step-next-company-logo.sql before uploading a logo.":v.error.message);let{error:S}=await e.withOperationTimeout(e.supabaseClient().rpc("set_company_logo",{target_company_id:e.getActiveCompanyId(),new_logo_path:C}),"Company logo record save timed out. Check your connection and try again.",15e3);if(S)throw await e.removeUploadedObject("company-logos",C),new Error(e.isColumnSchemaError(S,["logo_path"])?"Run supabase/step-next-company-logo.sql before saving a company logo.":S.message.includes("set_company_logo")?"Run supabase/step-next-company-logo.sql, then try uploading the logo again.":S.message);let b=e.getCompanies().find(E=>E.id===e.getActiveCompanyId());b&&(b.logo_path=C,b.logoUrl=i.createObjectURL($.blob)),e.showNotice("Company logo uploaded."),await e.render()}catch(P){y&&(y.textContent=P.message||"Could not upload logo.")}finally{w&&(w.disabled=!1,w.textContent="Upload Logo")}}async function f(u){if(typeof e.optimizeLogoOverride=="function")return e.optimizeLogoOverride(u);let h=o(u);try{if(!r)throw new Error("Browser logo optimization is unavailable.");let y=await r(u),_=Math.min(1,1200/Math.max(y.width,y.height)),P=Math.max(1,Math.round(y.width*_)),$=Math.max(1,Math.round(y.height*_)),A=t.createElement("canvas");A.width=P,A.height=$;let C=A.getContext("2d",{alpha:!0});C.clearRect(0,0,P,$),C.drawImage(y,0,0,P,$),y.close&&y.close();let v=await new Promise(S=>A.toBlob(S,"image/png"));if(!v)throw new Error("Browser could not optimize this logo.");return{blob:v,fileName:`${e.fileBaseName(u.name||"logo")}.png`,contentType:"image/png"}}catch(y){return m.warn("Logo optimization failed; uploading original.",y),{blob:u,fileName:e.safeFileName(u.name||"logo"),contentType:h}}}function o(u){let h=String(u?.type||"").trim().toLowerCase();if(h)return h;let y=String(u?.name||"").toLowerCase();return/\.(jpe?g)$/.test(y)?"image/jpeg":/\.png$/.test(y)?"image/png":/\.webp$/.test(y)?"image/webp":/\.gif$/.test(y)?"image/gif":/\.heic$/.test(y)?"image/heic":/\.heif$/.test(y)?"image/heif":/\.avif$/.test(y)?"image/avif":/\.bmp$/.test(y)?"image/bmp":/\.tiff?$/.test(y)?"image/tiff":"application/octet-stream"}function l(u){let h=o(u);return d.has(h)?"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}function g(u){return d.has(String(u?.contentType||"").toLowerCase())?Number(u?.blob?.size||0)>c?"This logo is still over 25 MB after processing. Try a smaller logo image.":"":"Company logos must be JPG, PNG, WebP, GIF, HEIC, or HEIF images."}return{optimizeLogo:f,uploadCompanyLogo:p}}typeof $e<"u"&&$e.exports&&($e.exports={createCompanyLogoWorkflow:s}),window.MaintainOpsCompanyLogoWorkflow={createCompanyLogoWorkflow:s}})()});var Bt=B((Hn,Ve)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.CSSRef||CSS,a=e.alertUser||alert;function i(c){return e.partUsageRows(c).length?"This part has work order usage history and is kept for traceability.":e.assetPartRows(c).length?"This part is linked to equipment and is kept for traceability.":""}function m(c){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}if(!e.getParts().find(o=>o.id===c))return;let p=i(c);if(p){a(p);return}let f=!!t.querySelector(`[data-delete-part="${n.escape(c)}"].permanent-delete-button`);if(e.getPendingDeletePartId()===c||f){r(c);return}e.setPendingDeletePartId(c),e.renderWorkspace()}async function r(c){if(!e.canDeleteParts()){a("Only company admins and managers can delete parts.");return}let d=e.getParts().find(l=>l.id===c),p=t.querySelector("#part-delete-error");if(p&&(p.textContent=""),!d)return;let f=i(c);if(f){p&&(p.textContent=f);return}let o=t.querySelector(`[data-delete-part="${n.escape(c)}"].permanent-delete-button`);o&&(o.disabled=!0,o.textContent="Deleting...");try{let l=(e.getPartDocumentsByPartId()[c]||[]).map(y=>y.storage_path).filter(Boolean);if(l.length){let y=await e.withOperationTimeout(e.removePartDocumentStorage(l),"Part document cleanup timed out. Try deleting again.",15e3);if(y.error)throw new Error(`Could not remove filed receipts/invoices: ${y.error.message}`)}let{data:g,error:u}=await e.withOperationTimeout(e.deletePartRecord(c),"Part delete timed out. Check your connection and try again.",15e3);if(u)throw new Error(u.message.includes("violates foreign key constraint")?"This part is linked to work or equipment and cannot be deleted.":u.message);if(!g?.length)throw new Error("Part was not deleted. Check that your company role is admin or manager and that supabase/step-next-part-delete.sql has been run.");let h=await e.withOperationTimeout(e.verifyPartDeleted(c),"Part delete verification timed out. Refresh and check the part list.",15e3);if(h.error)throw new Error(`Part delete verification failed: ${h.error.message}`);if(h.data)throw new Error("Part delete did not persist in Supabase. Run supabase/step-next-part-delete.sql, then try again.");e.setActivePartId(null),e.setPendingDeletePartId(null),e.showNotice("Part deleted."),await e.render()}catch(l){e.showNotice(l.message||"Could not delete part.","warning"),p&&(p.textContent=l.message||"Could not delete part."),o&&(o.disabled=!1,o.textContent="Permanently Delete")}}return{deletePart:r,requestDeletePart:m}}window.MaintainOpsPartDeleteWorkflow={createPartDeleteWorkflow:s},typeof Ve<"u"&&(Ve.exports={createPartDeleteWorkflow:s})})()});var jt=B((Yn,He)=>{(function(){function s(e={}){async function t(n){let a=n.target,i=a.type==="checkbox"?a.checked?"checked":"":a.value;a.disabled=!0;try{let{error:m}=await e.withOperationTimeout(e.upsertStepResult({company_id:e.getActiveCompanyId(),work_order_id:a.dataset.workOrderId,procedure_step_id:a.dataset.stepResult,completed_by:i?e.getSession().user.id:null,value:i,completed_at:i?new Date().toISOString():null}),"Checklist save timed out. Check your connection and try again.",15e3);if(m)throw m;await e.withOperationTimeout(e.recordWorkOrderEvent(a.dataset.workOrderId,"checklist_updated","Procedure checklist updated."),"Activity log timed out.",8e3).catch(()=>null);let r=await e.withOperationTimeout(e.loadStepResults(),"Checklist refresh timed out. Refresh the workspace to confirm the latest checklist state.",1e4).catch(c=>c);if(r){e.showNotice(`Checklist saved, but refresh did not finish: ${r.message||r}`,"warning"),a.disabled=!1;return}if(e.getWorkOrderActionWarningId()===a.dataset.workOrderId){let c=e.getWorkOrders().find(d=>d.id===a.dataset.workOrderId);e.blocksProcedureCompletion(c)||e.setWorkOrderActionWarning("","")}e.renderWorkspace()}catch(m){e.showNotice(`Could not save checklist step: ${m.message||m}`,"warning"),a.disabled=!1}}return{saveStepResult:t}}window.MaintainOpsProcedureChecklistWorkflow={createProcedureChecklistWorkflow:s},typeof He<"u"&&(He.exports={createProcedureChecklistWorkflow:s})})()});var zt=B((Kn,Ye)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.bodyRef||document.body,a=e.FormDataCtor||FormData;async function i(p,f){let{data:o,error:l}=await e.withOperationTimeout(e.getPublicRequestIntake(p),f);return{data:Array.isArray(o)?o[0]:o,error:l}}async function m(p){n.classList.add("public-qr-mode"),e.setAppHtml(e.loadingQrPage());let f=null;try{let{data:l,error:g}=await i(p,"Request QR lookup timed out.");if(f=l,g||!f){c("This QR code link is inactive or invalid.");return}}catch{c("This QR code link is inactive or invalid.");return}let o=e.publicRequestUrl(p);e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents(),typeof e.ensureQrLibrary=="function"&&e.ensureQrLibrary().then(()=>{e.setAppHtml(e.publicRequestQrPage(f,o)),e.bindPublicQrPrintEvents()}).catch(()=>{})}async function r(p){n.classList.remove("public-qr-mode"),e.setAppHtml(e.loadingRequestForm());let f=null;try{let{data:o,error:l}=await i(p,"Request form lookup timed out.");if(l){c("This request link is not ready yet. The company needs to run the public request link setup in Supabase.");return}f=o}catch(o){c(o.message||"This request link could not be loaded.");return}if(!f){c("This request link is inactive or invalid.");return}e.setAppHtml(e.publicRequestForm(f)),t.querySelector("#public-request-form").addEventListener("submit",o=>d(o,p,f))}function c(p){e.setAppHtml(e.publicRequestError(p))}async function d(p,f,o){p.preventDefault();let l=p.currentTarget,g=new a(l),u=t.querySelector("#public-request-error"),h=l.querySelector("button[type='submit']");u&&(u.textContent=""),h&&(h.disabled=!0,h.textContent="Sending...");try{let{data:y,error:w}=await e.withOperationTimeout(e.submitPublicLocationRequest({request_token:f,request_title:e.requiredText(g.get("title"),"Request title"),equipment_note:e.requiredText(g.get("equipment_note"),"Machine / area"),request_description:e.requiredText(g.get("description"),"Request details"),requester_name:e.requiredText(g.get("requester_name"),"Your name"),requester_contact:String(g.get("requester_contact")||"").trim()||null,request_priority:g.get("priority")||"medium"}),"Request send timed out.");if(w)throw w;let _=g.get("photo"),P="";if(_&&_.name){let A=await e.addPhotoToMaintenanceRequest(y,_);A&&(P=`Request sent, but the photo did not upload: ${A.message||A}`)}let $=await e.notifyRequestEmailer(y);$.error&&e.warn("Request email notification did not send",$.error),e.setAppHtml(e.publicRequestSuccess(o,P)),t.querySelector("#public-request-another").addEventListener("click",()=>r(f))}catch(y){u&&(u.textContent=y.message||"Could not send the request.")}finally{h?.isConnected&&(h.disabled=!1,h.textContent="Send Request")}}return{renderPublicRequestError:c,renderPublicRequestIntake:r,renderPublicRequestQrPage:m,submitPublicRequest:d}}window.MaintainOpsPublicRequestIntakeWorkflow={createPublicRequestIntakeWorkflow:s},typeof Ye<"u"&&(Ye.exports={createPublicRequestIntakeWorkflow:s})})()});var Gt=B((Jn,Ke)=>{(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataCtor||FormData;function a(){e.setAppHtml(e.companyCreateForm(e.getAppError())),t.querySelector("#company-form").addEventListener("submit",i),t.querySelector("#sign-out").addEventListener("click",()=>e.signOut())}async function i(m){m.preventDefault();let r=m.target,c=r.querySelector("button[type='submit']"),d=t.querySelector("#company-error"),p=String(new n(r).get("name")||"").trim();c.disabled=!0,c.textContent="Creating...",d.textContent="";try{if(!p)throw new Error("Company name is required.");let f=e.getCompanies().find(u=>u.name.trim().toLowerCase()===p.trim().toLowerCase());if(f){e.setActiveCompanyId(f.id),e.persistActiveCompanyId(f.id),await e.render();return}let{data:o,error:l}=await e.withOperationTimeout(e.createCompanyRecord(p),"Company creation timed out.");if(l){d.textContent=l.message.includes("create_company")?"Database setup is not finished. Run supabase/schema.sql in the Supabase SQL editor, then wait a few seconds and try again.":l.message;return}if(e.setActiveCompanyId(o),e.persistActiveCompanyId(o),!await e.ensureProfileForActiveCompany(p))throw new Error(e.getAppError()||"Could not create your company profile.");await e.seedStarterAssets(),await e.render()}catch(f){d.textContent=f.message||"Could not create company."}finally{c?.isConnected&&(c.disabled=!1,c.textContent="Create Company")}}return{createCompany:i,renderCompanyCreate:a}}window.MaintainOpsCompanySetupWorkflow={createCompanySetupWorkflow:s},typeof Ke<"u"&&(Ke.exports={createCompanySetupWorkflow:s})})()});var Vt=B((Zn,Je)=>{(function(){function s(e={}){async function t(a){let i=e.getWorkOrders().find(m=>m.id===e.getActiveWorkOrderId());a.target.disabled=!0;try{await n(e.getActiveWorkOrderId(),a.target.value)||(a.target.value=i?.status||"open")}catch(m){a.target.value=i?.status||"open",e.showNotice(`Could not update status: ${m.message||m}`,"warning")}finally{a.target.disabled=!1}}async function n(a,i){let m=e.getWorkOrders().find(f=>f.id===a);if(i==="completed"){let f=e.blocksProcedureCompletion(m);if(f)return e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning(a,f),e.showNotice(f,"warning"),await e.render(),!1}let r=e.currentSafetyCheckboxCheckedForWorkOrder(a),c=e.hasCompletedSafetyDeviceCheck(m)||r;if(i==="completed"&&e.requiresSafetyDeviceCheck(m)&&!c){e.setActiveWorkOrderId(a);let f="Safety devices must be checked before completing equipment work. Open the work order and use Complete Work.";return e.setWorkOrderActionWarning(a,f),e.showNotice(f,"warning"),await e.render(),!1}let d={status:i,asset_id:m?.asset_id||null,completed_at:i==="completed"?new Date().toISOString():null};e.applySafetyRequirementPayload(d),i==="completed"?e.applySafetyCheckPayload(d,d.safety_check_required&&c):i!=="completed"&&e.applySafetyCheckPayload(d,!1),delete d.asset_id;let{error:p}=await e.withOperationTimeout(e.updateWorkOrderSafely(d,a),"Status save timed out. Check your connection and try again.",15e3);return p?(e.showNotice(`Could not update status: ${e.friendlyWorkOrderSaveError(p)}`,"warning"),!1):(e.setActiveWorkOrderId(a),e.setWorkOrderActionWarning("",""),await e.recordWorkOrderEvent(a,"status_changed",`Status changed to ${e.statusLabel(i)}.`),e.showNotice(`Status changed to ${e.statusLabel(i)}.`),await e.render(),!0)}return{setWorkOrderStatus:n,updateWorkOrderStatus:t}}window.MaintainOpsWorkOrderStatusWorkflow={createWorkOrderStatusWorkflow:s},typeof Je<"u"&&(Je.exports={createWorkOrderStatusWorkflow:s})})()});var Ht=B((Xn,Ze)=>{(function(){function s(e){async function t(n,a){if(!e.canEditOperationalRecords())return e.showNotice("This account can view Planning but cannot change work orders.","warning"),{saved:!1,reason:"read_only"};let i=e.getPlanningWorkOrders().find(m=>m.id===n);if(!i||i.status==="completed")return e.showNotice("That work order is no longer available in the no-due-date queue.","warning"),{saved:!1,reason:"not_available"};try{let m=e.workOrderDateValue(a);if(!m)throw new Error("Choose a due date.");let r=await e.withOperationTimeout(e.updateWorkOrderSafely({due_at:m},n),"Due date save timed out. Check your connection and try again.");if(r.error)throw r.error;return e.setPlanningWorkOrders(e.getPlanningWorkOrders().map(c=>c.id===n?{...c,due_at:m}:c)),e.setWorkOrders(e.getWorkOrders().map(c=>c.id===n?{...c,due_at:m}:c)),e.resetNoDuePage(),await e.recordWorkOrderEvent(n,"updated",`Due date set to ${m} from Planning.`),e.showNotice("Due date set. The order moved out of No Due Date."),e.renderWorkspace(),{saved:!0,dueAt:m}}catch(m){return e.showNotice(`Could not set due date: ${m.message||m}`,"warning"),{saved:!1,reason:"save_failed",error:m}}}return{savePlanningDueDate:t}}window.MaintainOpsPlanningDueDateWorkflow={createPlanningDueDateWorkflow:s},typeof Ze<"u"&&(Ze.exports={createPlanningDueDateWorkflow:s})})()});var Yt=B((er,Xe)=>{(function(){async function s(e,t){if(!e?.functions?.invoke||!t)return{data:null,error:null,skipped:!0};try{let{data:n,error:a}=await e.functions.invoke("request-emailer",{body:{request_id:t}});return{data:n,error:a||null,skipped:!1}}catch(n){return{data:null,error:n,skipped:!1}}}window.MaintainOpsRequestEmailNotificationService={notifyRequestEmailer:s},typeof Xe<"u"&&(Xe.exports={notifyRequestEmailer:s})})()});var Kt=B((tr,et)=>{(function(){async function s(t,n,a=[],i={}){let m=i.pathKey||"storage_path",r=i.urlKey||"signedUrl",c=i.expiresIn||600,d=i.onError;await Promise.all(a.map(async p=>{let f=p?.[m];if(!f)return;let{data:o,error:l}=await t.storage.from(n).createSignedUrl(f,c);if(l){p[r]="",typeof d=="function"&&d(p,l);return}p[r]=o?.signedUrl||""}))}function e(t={}){function n(a){if(!a||!t.getReady())return;let m=(t.getRows(a)||[]).filter(c=>c.storage_path&&!c.signedUrl),r=t.getSigningMap();!m.length||r[a]||(r[a]=!0,t.withOperationTimeout(s(t.supabaseClient(),t.bucketName,m),t.timeoutMessage||"Signed file link load timed out.",t.timeoutMs||1e4).catch(c=>{t.warn("Could not load signed file links",c)}).finally(()=>{delete r[a],t.getActiveGroupId()===a&&t.renderWorkspace()}))}return{ensureGroupSignedUrls:n}}window.MaintainOpsSignedUrlService={addSignedUrlsToRows:s,createDeferredSignedUrlLoader:e},typeof et<"u"&&(et.exports={addSignedUrlsToRows:s,createDeferredSignedUrlLoader:e})})()});var Jt=B((nr,tt)=>{(function(){function s(n,a){if(n[a]===void 0)throw new Error(`workspaceQueueLoadersService missing dependency: ${a}`);return n[a]}function e(n={}){let a=s(n,"supabaseClient"),i=s(n,"workspaceUiState"),m=s(n,"applyRequestQueryFilters"),r=s(n,"applyWorkOrderListFilters"),c=s(n,"applyWorkOrderFilters"),d=s(n,"selectWorkOrders"),p=s(n,"countWorkOrdersQuery"),f=s(n,"fetchExactSearchedWorkOrderPage"),o=s(n,"isColumnSchemaError"),l=n.warn||(()=>{}),g=s(n,"LIST_ITEMS_PER_PAGE"),u=s(n,"WORK_ORDERS_PER_PAGE"),h=s(n,"REQUEST_RELATION_SELECT"),y=s(n,"REQUEST_ASSET_FALLBACK_SELECT"),w=s(n,"REQUEST_FALLBACK_SELECT"),_=s(n,"WORK_ORDER_RELATION_SELECT"),P=s(n,"WORK_ORDER_FALLBACK_SELECT");function $(){return typeof a=="function"?a():a}async function A(D=i.getRequestViewFilter(),I={}){let k=Math.max(1,i.getRequestsPage()),O=(k-1)*g,q=O+g-1,R=I.includeRelations===!1?w:I.includeLocationRelation===!1?y:h,M=await m($().from("maintenance_requests").select(R,{count:"exact"}),D).order("created_at",{ascending:!1}).range(O,q);return M.error&&I.includeLocationRelation!==!1&&o(M.error,["location_id","locations"])?A(D,{includeLocationRelation:!1}):M.error&&I.includeRelations!==!1?A(D,{includeRelations:!1}):!M.error&&M.count&&k>1&&O>=M.count?(i.setRequestsPage(Math.max(1,Math.ceil(M.count/g))),A(D,I)):M}async function C(D){let I=await m($().from("maintenance_requests").select("id",{count:"exact",head:!0}),D);return I.error?(l("Request count failed",I.error),0):I.count||0}async function v(){let[D,I,k]=await Promise.all([C("active"),C("converted"),C("all")]);return{active:D,converted:I,all:k}}async function S(D={}){if(i.getWorkOrderSearchMode()&&i.getSearchQuery().trim())return f(D);let I=Math.max(1,i.getWorkOrderPage()),k=(I-1)*u,O=k+u-1,q=D.includeLocationRelation===!1?P:_,R=await r(d($(),q,{count:"exact"})).range(k,O);return!R.error&&R.count&&I>1&&k>=R.count?(i.setWorkOrderPage(Math.max(1,Math.ceil(R.count/u))),S(D)):R}async function b(D={}){let I=await c(p($()),D);return I.error?(l("Work order count failed",I.error),0):I.count||0}async function E(){let[D,I,k,O,q,R,M,L]=await Promise.all([b({statusFilter:"active",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"open",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"in_progress",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"blocked",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"overdue",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"completed",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"completed_month",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1}),b({statusFilter:"completed_week",includeQueue:!1,includeSearch:!1,includeAttributeFilters:!1})]);return{activeWork:D,newWork:I,inProgress:k,blocked:O,overdue:q,completedAll:R,completedMonth:M,completedWeek:L}}async function T(){let[D,I,k,O,q,R,M,L]=await Promise.all([b({statusFilter:"active",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"open",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"in_progress",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"blocked",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"overdue",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"completed",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"completed_month",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1}),b({statusFilter:"completed_week",section:"mywork",includeQueue:!0,includeSearch:!0,includeAttributeFilters:!1})]);return{activeWork:D,newWork:I,inProgress:k,blocked:O,overdue:q,completedAll:R,completedMonth:M,completedWeek:L}}return{fetchRequestPage:A,countRequests:C,loadRequestDashboardCounts:v,fetchWorkOrderPage:S,countWorkOrders:b,loadWorkOrderDashboardCounts:E,loadMyWorkDashboardCounts:T}}let t={createWorkspaceQueueLoaders:e};typeof window<"u"&&(window.MaintainOpsWorkspaceQueueLoadersService=t),typeof tt<"u"&&(tt.exports=t)})()});var Zt=B((rr,nt)=>{(function(){function s(e={}){let t=e.windowRef||window,n=e.documentRef||document,a=e.app;function i(){return t.MaintainOpsAuthRedirects.authCallbackUrl(t.location,t.PUBLIC_APP_URL)}function m(){return t.MaintainOpsAuthRedirects.cleanAuthUrl(t.location)}function r(){t.history.replaceState({},n.title,t.MaintainOpsAuthRedirects.cleanAuthUrl(t.location))}async function c(g){d("Verifying your account...");try{if(g.error||g.errorDescription)throw new Error(g.errorDescription||g.error||"This verification link is invalid or expired.");let u=null;if(g.code){let{data:h,error:y}=await e.supabaseClient.auth.exchangeCodeForSession(g.code);if(y)throw y;u=h?.session||null}else if(g.accessToken&&g.refreshToken){let{data:h,error:y}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});if(y)throw y;u=h?.session||null}if(!u){let{data:h,error:y}=await e.supabaseClient.auth.getSession();if(y)throw y;u=h?.session||null}if(!u)throw new Error("The verification link did not create a session. Request a new verification email and try again.");e.setSession(u),r(),d("Verification complete. Loading workspace..."),await e.render()}catch(u){r(),p(u.message||"This verification link is invalid or expired.")}}function d(g){n.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallback(g)}function p(g){n.body.classList.remove("public-qr-mode"),a.innerHTML=e.authCallbackError(g),n.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login"))}async function f(g=e.passwordRecoveryParamsFromUrl()){let u=!1,h="";if(g.accessToken&&g.refreshToken){let{data:y,error:w}=await e.supabaseClient.auth.setSession({access_token:g.accessToken,refresh_token:g.refreshToken});u=!!(y?.session&&!w),w&&(h="This reset link is expired or invalid. Send a new password reset email and use the newest link.")}else h="This reset link is missing the secure session. Send a new password reset email and use the newest link.";l({ready:u,initialError:h})}function o(g="",u=""){n.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordResetRequest(g,u),n.querySelector("#auth-back-to-login").addEventListener("click",()=>e.renderAuth("login")),n.querySelector("#auth-reset").addEventListener("click",e.resetLoginState),n.querySelector("#password-reset-request-form").addEventListener("submit",async h=>{h.preventDefault();let y=h.target,w=y.querySelector("button[type='submit']"),_=n.querySelector("#auth-error"),P=n.querySelector("#auth-status"),$=String(new FormData(y).get("email")||"").trim();_.textContent="",P.textContent="Sending reset link...",w.disabled=!0,w.textContent="Sending...";try{let{error:A}=await e.withOperationTimeout(e.supabaseClient.auth.resetPasswordForEmail($,{redirectTo:m()}),"Password reset email timed out. Check your connection and try again.",2e4);if(A){P.textContent="",_.textContent=A.message;return}P.textContent="If that email exists in Supabase, a reset link has been sent."}catch(A){P.textContent="",_.textContent=A.message||"Could not send reset link."}finally{n.body.contains(w)&&(w.disabled=!1,w.textContent="Send Reset Link")}})}function l({ready:g=!1,initialError:u=""}={}){n.body.classList.remove("public-qr-mode"),a.innerHTML=e.passwordRecovery({ready:g,initialError:u}),n.querySelector("#auth-back-to-login").addEventListener("click",()=>{r(),e.renderAuth("login")}),n.querySelector("#auth-send-new-reset").addEventListener("click",()=>{r(),o()}),n.querySelector("#password-recovery-form").addEventListener("submit",async h=>{if(h.preventDefault(),!g)return;let y=h.target,w=y.querySelector("button[type='submit']"),_=new FormData(y),P=String(_.get("password")||""),$=String(_.get("confirmPassword")||""),A=n.querySelector("#auth-error"),C=n.querySelector("#auth-status");if(A.textContent="",P.length<8){A.textContent="Password must be at least 8 characters.";return}if(P!==$){A.textContent="Passwords do not match.";return}C.textContent="Updating password...",w.disabled=!0,w.textContent="Updating...";try{let{error:v}=await e.withOperationTimeout(e.supabaseClient.auth.updateUser({password:P}),"Password update timed out. Try the newest reset link again.",2e4);if(v){C.textContent="",A.textContent=v.message;return}r();let{data:S}=await e.supabaseClient.auth.getSession();if(e.setSession(S.session),C.textContent=S.session?"Password updated. Loading workspace...":"Password updated. Sign in with your new password.",S.session){await e.render();return}e.renderAuth("login","Password updated. Sign in with your new password.")}catch(v){C.textContent="",A.textContent=v.message||"Could not update password."}finally{n.body.contains(w)&&(w.disabled=!1,w.textContent="Update Password")}})}return{authCallbackRedirectUrl:i,passwordResetRedirectUrl:m,clearPasswordRecoveryUrl:r,startAuthCallback:c,renderAuthCallback:d,renderAuthCallbackError:p,startPasswordRecovery:f,renderPasswordResetRequest:o,renderPasswordRecovery:l}}window.MaintainOpsAuthSessionFlow={createAuthSessionFlow:s},typeof nt<"u"&&(nt.exports={createAuthSessionFlow:s})})()});var Xt=B((ar,Pe)=>{(function(){function s(m,r){let c=r.getProfilesByUserId();if(m.type==="comment")return`
      <article class="relationship-detail comment">
        <strong>${r.escapeHtml(c[m.author_id]?.full_name||"Team member")}</strong>
        <span>${new Date(m.created_at).toLocaleString()}</span>
        <p>${r.escapeHtml(m.body)}</p>
      </article>
    `;if(m.type==="photo")return`
      <article class="relationship-detail photo">
        <strong>Photo uploaded</strong>
        <span>${r.photoMetaText(m)} &middot; ${r.escapeHtml(c[m.uploaded_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(m.file_name)}</p>
        ${m.signedUrl?`<a href="${r.escapeHtml(m.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
      </article>
    `;if(m.type==="part"){let p=r.partUsageUnitCost(m)*(Number(m.quantity_used)||0);return`
      <article class="relationship-detail parts">
        <strong>Part used</strong>
        <span>${new Date(m.created_at).toLocaleString()} &middot; ${r.escapeHtml(c[m.created_by]?.full_name||"Team member")}</span>
        <p>${r.escapeHtml(m.parts?.name||"Part")} - ${Number(m.quantity_used)||0} used - ${r.money(p)}</p>
      </article>
    `}return`
    <article>
      <strong>${r.escapeHtml(m.event_type.replaceAll("_"," "))}</strong>
      <span>${new Date(m.created_at).toLocaleString()} \xC2\xB7 ${r.escapeHtml(c[m.actor_id]?.full_name||"Team member")}</span>
      <p>${r.escapeHtml(m.summary)}</p>
    </article>
  `}function e(m,r){let c=r.getProcedureTemplates(),d=r.getPartsUsedByWorkOrder(),p=r.getCommentsByWorkOrder(),f=r.getPhotosByWorkOrder(),o=r.getMessageThreads(),l=c.find(P=>P.id===m.procedure_template_id),g=l?r.checklistProgress(m,l):null,u=(d[m.id]||[]).length,h=(p[m.id]||[]).length,y=(f[m.id]||[]).length,w=o.filter(P=>P.work_order_id===m.id).length,_=[];return m.asset_id&&_.push(t("asset","Equipment",m.assets?.name||"Linked",r)),l&&g&&_.push(t("procedure","Procedure checklist",`${g.done}/${g.total}`,r)),u&&_.push(t("parts","Parts",String(u),r)),h&&_.push(t("comment","Comments",String(h),r)),w&&_.push(t("message","Messages",String(w),r)),y&&_.push(n(m.id,String(y),r)),_.length?`<div class="relationship-row">${_.join("")}</div>`:""}function t(m,r,c,d){return`
    <span class="relationship-chip ${m}" title="${d.escapeHtml(r)}">
      ${a(m)}
      <span>${d.escapeHtml(c)}</span>
    </span>
  `}function n(m,r,c){return`
    <button class="relationship-chip photo photo-jump-chip" type="button" data-work-photo-jump="${c.escapeHtml(m)}" title="Open photos">
      ${a("photo")}
      <span>${c.escapeHtml(r)}</span>
    </button>
  `}function a(m){return{asset:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path></svg>',procedure:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path></svg>',parts:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path></svg>',comment:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H8l-3 3V5z"></path></svg>',message:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></svg>',photo:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4V6z"></path><path d="M8 14l3-3 2 2 2-3 3 4"></path><path d="M8 9h.01"></path></svg>'}[m]||""}function i(m){return Object.freeze({renderActivityItem:r=>s(r,m),renderRelationshipChips:r=>e(r,m),relationshipChip:(r,c,d)=>t(r,c,d,m),photoJumpChip:(r,c)=>n(r,c,m),relationshipIcon:a})}window.MaintainOpsRelationshipDisplay=Object.freeze({createRelationshipDisplayHelpers:i}),typeof Pe<"u"&&Pe.exports&&(Pe.exports={createRelationshipDisplayHelpers:i})})()});var en=B((or,rt)=>{(function(){function s(e){let t=e.segmentIcon,n=e.escapeHtml,a=e.renderAssetOptions,i=e.renderMaintenanceRequestPhoto,m=e.isConvertedRequest,r=e.canDeleteOperationalRecords,c=e.canEditOperationalRecords||(()=>!0),d=e.getPendingDeleteRequestId,p=e.getProfilesByUserId;function f(u,h){return u==="converted"?`${h} converted`:u==="all"?`${h} total`:`${h} active`}function o(u,h,y={}){return`
        <div class="segmented-control request-filter-bar" aria-label="Request filter">
          ${[["active","Active",u.active],["converted","Converted",u.converted],["all","All",u.all]].map(([_,P,$])=>`
            <button class="segment ${h===_?"active":""}" data-request-filter="${_}" type="button" ${y.locked&&_!=="active"?"disabled":""}>
              ${t(_==="active"?"open":_==="converted"?"completed":"all")}${P} <span>${$}</span>
            </button>
          `).join("")}
        </div>
      `}function l(u){let h=m(u),y=c(),w=d()===u.id,_=p(),P=u.created_at?new Date(u.created_at):null,$=P&&!Number.isNaN(P.getTime())?P.toLocaleString():"date unavailable",A=u.assets?.name||u.locations?.name||"No equipment",C=u.requested_by_name||_[u.requested_by]?.full_name||"Requester",v=u.converted_by||u.reviewed_by||"",S=_[v]?.full_name||"",b=S?`Converted to work order by ${S}`:v?"Converted to work order; converter name unavailable":"Converted to work order; converter not recorded",E=y&&r()?w?`
        <button class="secondary-button" data-cancel-delete-request type="button">Cancel</button>
        <button class="danger-action-button confirm-delete-button" data-confirm-delete-request="${n(u.id)}" type="button">Permanently Delete</button>
      `:`
        <button class="danger-action-button" data-delete-request="${n(u.id)}" type="button">Delete</button>
      `:"";return`
        <article class="request-card ${h?"converted-request":"active-request"}">
          <div class="request-card-main">
            <div class="request-card-header">
              <div class="chip-row">
                <span class="chip ${u.priority}">${n(u.priority)}</span>
                <span class="chip ${h?"completed":"open"}">${h?"converted":n(u.status)}</span>
              </div>
              <span class="request-source-pill">Public intake</span>
            </div>
            <h3>${n(u.title)}</h3>
            <p>${n(u.description||"No description.")}</p>
            ${i(u)}
            <div class="meta-row">
              <span><strong>Machine / area</strong>${n(A)}</span>
              <span><strong>Requester</strong>${n(C)}</span>
              <span><strong>Received</strong>${n($)}</span>
            </div>
          </div>
          ${y&&!h&&u.status==="submitted"?`
            <div class="request-actions">
              <button class="secondary-button request-action-button" data-quick-fix-request="${u.id}" type="button">Quick Fix</button>
              <button class="secondary-button work-action-button" data-convert-request="${u.id}" type="button">Convert to Work Order</button>
              ${E}
            </div>
          `:h?`
            <div class="request-actions request-converted-note">
              <span>${n(b)}</span>
              ${E}
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
          <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
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
      `}return{requestPanelSubtitle:f,renderRequestFilterBar:o,renderMaintenanceRequest:l,renderRequestFormContent:g}}window.MaintainOpsRequestDisplay={createRequestDisplayHelpers:s},typeof rt<"u"&&(rt.exports={createRequestDisplayHelpers:s})})()});var tn=B((ir,at)=>{(function(){function s({statusLabel:e,workOrderTypeLabel:t=I=>String(I||"corrective").replace(/\b\w/g,k=>k.toUpperCase()),teamMemberName:n,getWorkOrderAssigneeFilter:a,getWorkOrderFilter:i,getWorkOrderTypeFilter:m=()=>"all",getWorkOrderPriorityFilter:r=()=>"all",getWorkSort:c=()=>"newest",getWorkGroup:d=()=>"none",getActiveStatusFilter:p,getMyWorkFilter:f,getActiveSection:o,getDueState:l,getProcedureTemplates:g,getActiveWorkOrderId:u,getProfilesByUserId:h,getSession:y,STATUS_OPTIONS:w,TYPE_OPTIONS:_=[],OUTSIDE_VENDOR_VALUE:P,escapeHtml:$,cleanWorkOrderDescription:A,relationshipIcon:C,segmentIcon:v,isVendorAssigned:S,assignmentLabel:b,renderRelationshipChips:E,canAssignWorkOrderToMe:T,canManageTeam:D}){function I(){let W=a(),Q=i(),z=p(),Z=W?`${n(W)} Work`:Q==="unassigned"?"Unassigned Work Orders":Q==="vendor"?"Outside Vendor Work":Q==="assigned"?"Assigned Work Orders":"Work Orders";return z==="active"||z==="all"?Z==="Work Orders"?"Active Work Orders":`Active - ${Z}`:`${e(z)} - ${Z}`}function k(){let W=p();return W==="active"||W==="all"?"My Work":`${e(W)} - My Work`}function O(){return o()==="mywork"?k():I()}function q(W){let Q=o(),z=f();return Q==="mywork"?`${W} shown - ${Q==="mywork"?z==="created"?"Created By Me":"Assigned To Me":"shown"}`:`${W} shown`}function R(W,Q,z){return`<option value="${$(W)}" ${W===z?"selected":""}>${$(Q)}</option>`}function M(W){return{all:"Any assignment",assigned:"Team member",vendor:"Outside vendor",unassigned:"Unassigned"}[W]||"Any assignment"}function L(W){return W?W.charAt(0).toUpperCase()+W.slice(1):""}function N(W=[]){let Q=p(),z=Q==="all"?"active":Q,Z=i(),J=a(),ee=m(),X=r(),oe=c(),V=d(),ce=["completed","completed_month","completed_week"].includes(Q),le=z==="active"&&Z==="all"&&!J&&ee==="all"&&X==="all"&&oe==="newest"&&V==="none",te=W.find(Y=>Y.userId===J),F=[`Status: ${e(z)}`,`Assignment: ${M(Z)}`,...te?[`Person: ${te.name}`]:[],...ee!=="all"?[`Type: ${t(ee)}`]:[],...X!=="all"?[`Priority: ${L(X)}`]:[]],ue=[["active","Active work"],["open","New"],["in_progress","In progress"],["blocked","Blocked"],["overdue","Overdue"],["completed","All completed"],["completed_month","Completed this month"],["completed_week","Completed this week"]],ge=[["all","Any assignment"],["assigned","Team member"],["vendor","Outside vendor"],["unassigned","Unassigned"]],me=[["newest","Recently created"],["due","Due date soonest"],["priority","Highest priority"],["type","Work type A-Z"],["assigned","Assigned person A-Z"]],pe=[["none","No grouping"],["assignee","Assigned person"],["status","Status"],["priority","Priority"],["type","Work type"]];return`
        <div class="work-order-controls" aria-label="Work order list controls">
          <div class="work-filter-trail-row">
            <div class="work-filter-trail">
              <span class="work-control-kicker">Current view</span>
              <ol aria-label="Current work order filters">
                <li><span>Work Orders</span></li>
                ${F.map(Y=>`<li><span>${$(Y)}</span></li>`).join("")}
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
                  ${ue.map(([Y,x])=>R(Y,x,z)).join("")}
                </select>
              </label>
              <label class="work-control-field ${Z!=="all"?"is-active":""}">
                <span>Assignment</span>
                <select data-work-assignment-filter aria-label="Filter work orders by assignment">
                  ${ge.map(([Y,x])=>R(Y,x,Z)).join("")}
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
                  ${_.map(Y=>R(Y,t(Y),ee)).join("")}
                </select>
              </label>
              <label class="work-control-field ${X!=="all"?"is-active":""}">
                <span>Priority</span>
                <select data-work-priority-filter aria-label="Filter work orders by priority">
                  ${R("all","Any priority",X)}
                  ${["critical","high","medium","low"].map(Y=>R(Y,L(Y),X)).join("")}
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
                  ${ce?R("completed","Recently completed","completed"):me.map(([Y,x])=>R(Y,x,oe)).join("")}
                </select>
              </label>
              <label class="work-control-field ${V!=="none"?"is-active":""}">
                <span>Group</span>
                <select data-work-group-filter aria-label="Group work orders">
                  ${pe.map(([Y,x])=>R(Y,x,V)).join("")}
                </select>
              </label>
            </div>
          </div>
        </div>
      `}function U(W,Q){if(Q==="assignee"){if(S(W))return{key:"vendor",label:"Outside vendor",order:900};if(!W.assigned_to)return{key:"unassigned",label:"Unassigned",order:901};let J=b(W);return{key:`assignee:${W.assigned_to}`,label:J,order:100}}if(Q==="status"){let J=["open","in_progress","blocked","completed"].indexOf(W.status);return{key:`status:${W.status}`,label:e(W.status),order:J<0?99:J}}if(Q==="priority"){let J=["critical","high","medium","low"].indexOf(W.priority);return{key:`priority:${W.priority}`,label:L(W.priority||"Unspecified"),order:J<0?99:J}}let z=W.type||"corrective",Z=_.indexOf(z);return{key:`type:${z}`,label:t(z),order:Z<0?99:Z}}function G(W,Q={}){if(!W.length)return'<p class="muted">No work orders match these filters.</p>';let z=Q.groupBy||"none";if(z==="none")return`<div class="work-list" id="work-order-list">${W.map(H).join("")}</div>`;let Z=new Map;return W.forEach(ee=>{let X=U(ee,z);Z.has(X.key)||Z.set(X.key,{...X,workOrders:[]}),Z.get(X.key).workOrders.push(ee)}),`
        <div class="work-order-groups" id="work-order-list">
          ${[...Z.values()].sort((ee,X)=>ee.order-X.order||ee.label.localeCompare(X.label)).map(ee=>`
            <section class="work-order-group">
              <div class="work-order-group-heading">
                <h3>${$(ee.label)}</h3>
                <span>${ee.workOrders.length}</span>
              </div>
              <div class="work-list">${ee.workOrders.map(H).join("")}</div>
            </section>
          `).join("")}
        </div>
      `}function H(W){let Q=l(W),z=g().find(V=>V.id===W.procedure_template_id),Z=W.created_at?new Date(W.created_at):null,J=Z&&!Number.isNaN(Z.getTime())?Z.toLocaleDateString():"",ee=W.status==="completed",X=ee?"Completed":e(W.status),oe=V=>V==="completed"?"Complete":e(V);return`
        <article class="work-card status-card status-${W.status} ${W.id===u()?"selected":""}" data-id="${W.id}" tabindex="0">
          <div class="work-card-header">
            <div class="chip-row">
              <span class="chip ${W.priority}">${W.priority}</span>
              <span class="chip">${$(t(W.type))}</span>
              <span class="chip ${W.status}">${X}</span>
              ${Q?`<span class="chip ${Q.className}">${Q.label}</span>`:""}
            </div>
          </div>
          <div class="work-card-body">
            <h3>${$(W.title)}</h3>
            <p>${$(A(W.description)||"No description.")}</p>
          </div>
          <div class="work-card-meta meta-row">
            <span>${C("asset")}${$(W.assets?.name||"General item / area")}</span>
            <span>${v(S(W)?"vendor":"mine")}${$(b(W))}</span>
            ${z?`<span>${C("procedure")}${$(z.name)}</span>`:""}
            <span>${v("due")}Due ${W.due_at||"unset"}</span>
            ${J?`<span>${v("created")}Created ${$(J)}</span>`:""}
            ${W.completed_at?`<span>${v("completed")}Completed ${new Date(W.completed_at).toLocaleDateString()}</span>`:""}
          </div>
          ${E(W)}
          <div class="quick-actions work-card-actions">
            ${!ee&&T(W)?`<button class="assign-action" data-assign-me="${W.id}" type="button">Assign to me</button>`:""}
            ${!ee&&D()?ne(W):""}
          ${w.filter(V=>V!==W.status).slice(0,3).map(V=>`
            <button data-quick-status="${V}" data-id="${W.id}" type="button">${oe(V)}</button>
          `).join("")}
        </div>
      </article>
    `}function ne(W){return`
        <form class="card-assign-form" data-card-assign="${W.id}">
          <select name="assigned_to" aria-label="Assign ${$(W.title)}">
            <option value="">Unassigned</option>
            <option value="${P}" ${S(W)?"selected":""}>Outside vendor</option>
            ${Object.entries(h()).map(([Q,z])=>`<option value="${Q}" ${!S(W)&&Q===W.assigned_to?"selected":""}>${$(z.full_name||n(Q))}</option>`).join("")}
          </select>
          <button class="card-assign-button" type="submit">Assign</button>
        </form>
      `}function ae(W="",Q={}){let z=W||"",Z=Q.managerOptions??D(),J=Q.allowUnassigned!==!1,ee=Q.selfLabel||"Assign to me",X=[];return J&&X.push(`<option value="" ${z===""?"selected":""}>Unassigned</option>`),X.push(`<option value="${y().user.id}" ${z===y().user.id?"selected":""}>${ee}</option>`),Z&&(X.push(`<option value="${P}" ${z===P?"selected":""}>Outside vendor</option>`),X.push(...Object.entries(h()).filter(([oe])=>oe!==y().user.id).map(([oe,V])=>`<option value="${oe}" ${z===oe?"selected":""}>${$(V.full_name||n(oe))}</option>`))),X.join("")}function K(W){return S(W)?P:W?.assigned_to||""}function re(W,Q=""){let z=K(W);return W?.status==="completed"?`
          <label ${Q?`id="${Q}"`:""}>Completed by / assigned to
            <input value="${$(b(W))}" disabled>
            <input name="assigned_to" type="hidden" value="${$(z)}">
          </label>
        `:D()?`
          <label ${Q?`id="${Q}"`:""}>Assign to
            <select name="assigned_to">
              ${ae(z,{managerOptions:!0})}
            </select>
          </label>
        `:!W.assigned_to&&!S(W)?`
          <label ${Q?`id="${Q}"`:""}>Assign to
            <select name="assigned_to">
              ${ae("",{managerOptions:!1,selfLabel:"Assign to me"})}
            </select>
          </label>
        `:`
        <label ${Q?`id="${Q}"`:""}>Assigned to
          <input value="${$(b(W))}" disabled>
          <input name="assigned_to" type="hidden" value="${$(z)}">
        </label>
      `}return{workOrdersPanelTitle:I,myWorkPanelTitle:k,workQueuePanelTitle:O,workQueuePanelSubtitle:q,renderWorkOrderFilterToolbar:N,renderWorkOrderCollection:G,renderWorkOrderCard:H,renderCardAssignmentControl:ne,renderAssignmentSelect:ae,renderWorkOrderAssignmentField:re}}window.MaintainOpsWorkQueueDisplay={createWorkQueueDisplayHelpers:s},typeof at<"u"&&(at.exports={createWorkQueueDisplayHelpers:s})})()});var nn=B((sr,Ae)=>{(function(){function s({escapeHtml:e,statusLabel:t,relationshipIcon:n,getPartsUsedByWorkOrder:a,getPhotosByWorkOrder:i,teamMemberName:m}){function r(d){return`
        <article class="mini-work-order" data-mini-work-order="${d.id}">
          <strong>${e(d.title)}</strong>
          <span>${t(d.status)} - ${d.due_at||"no due date"}</span>
        </article>
      `}function c(d){let p=(a()[d.id]||[]).length,f=(i()[d.id]||[]).length,o=d.completed_at?new Date(d.completed_at).toLocaleDateString():"",l=d.completed_by?m(d.completed_by):"",g=!l&&d.assigned_to?m(d.assigned_to):"",u=l?` by ${e(l)}`:g?` - owner ${e(g)}`:"",h=d.resolution_summary||d.completion_notes||"";return`
        <article class="mini-work-order ${d.status==="completed"?"completed-history":""}" data-mini-work-order="${d.id}">
          <div class="chip-row">
            <span class="chip ${d.status}">${t(d.status)}</span>
            ${d.follow_up_needed?'<span class="chip blocked">follow-up</span>':""}
            ${p?`<span class="relationship-chip parts">${n("parts")}<span>${p}</span></span>`:""}
            ${f?`<span class="relationship-chip photo">${n("photo")}<span>${f}</span></span>`:""}
          </div>
          <strong>${e(d.title)}</strong>
          <span>${o?`Completed ${o}${u}`:`Due ${d.due_at||"unset"}`}</span>
          ${d.failure_cause?`<p><b>Finding:</b> ${e(d.failure_cause)}</p>`:""}
          ${h?`<p><b>Resolution:</b> ${e(h)}</p>`:""}
        </article>
      `}return{renderMiniWorkOrder:r,renderAssetMiniWorkOrder:c}}window.MaintainOpsMiniWorkOrderDisplay={createMiniWorkOrderDisplayHelpers:s},typeof Ae<"u"&&Ae.exports&&(Ae.exports={createMiniWorkOrderDisplayHelpers:s})})()});var rn=B((cr,ot)=>{(function(){function s({escapeHtml:e,money:t,isLowStockPart:n,matchesActiveLocation:a,getParts:i,getPartDocumentsByPartId:m,getPartDocumentsReady:r,getPendingDeletePartId:c,getShowPartSourceManager:d,getPartCostsReady:p,getPartInventoryFilter:f,getPartSearchQuery:o,partUsageRows:l,canDeleteParts:g,canEditOperationalRecords:u=()=>!0,renderPartSourceOptions:h,renderPartMachineOptions:y,renderPartSourceManager:w}){let _=[["part_photo","Part photos"],["receipt","Receipts"],["invoice","Invoices"],["part_print","Part prints"],["schematic","Schematics"],["manual","Manuals"],["spec_sheet","Spec sheets"],["warranty","Warranty"],["other","Other files"]],P=_.reduce((k,[O,q])=>(k[O]=q.replace(/s$/,""),k),{});function $(k){return k.document_type?k.document_type:String(k.content_type||"").startsWith("image/")?"part_photo":/invoice/i.test(k.file_name||"")?"invoice":/receipt/i.test(k.file_name||"")?"receipt":/schematic|diagram/i.test(k.file_name||"")?"schematic":/print|drawing/i.test(k.file_name||"")?"part_print":/manual/i.test(k.file_name||"")?"manual":/spec|cut.?sheet|datasheet/i.test(k.file_name||"")?"spec_sheet":"other"}function A(){return _.map(([k,O])=>`
        <option value="${k}">${e(P[k]||O)}</option>
      `).join("")}function C(k){let O=$(k),q=String(k.content_type||"").startsWith("image/"),R=P[O]||"File",M=k.created_at?new Date(k.created_at).toLocaleString():"Uploaded",L=k.file_size_bytes?`${Math.round(Number(k.file_size_bytes)/1024)} KB`:"";return`
        <article class="part-document-card ${q?"image-file":""}">
          ${q&&k.signedUrl?`<a class="part-document-thumb" href="${e(k.signedUrl)}" target="_blank" rel="noreferrer"><img src="${e(k.signedUrl)}" alt="${e(k.file_name)}"></a>`:""}
          <div>
            <div class="chip-row">
              <span class="chip">${e(R)}</span>
              ${L?`<span class="chip">${e(L)}</span>`:""}
            </div>
            <strong>${e(k.file_name)}</strong>
            <span>${e(M)}</span>
            ${k.original_file_name&&k.original_file_name!==k.file_name?`<small>Original: ${e(k.original_file_name)}</small>`:""}
            ${k.signedUrl?`<a href="${e(k.signedUrl)}" target="_blank" rel="noreferrer">Open file</a>`:""}
          </div>
        </article>
      `}function v([k,O],q){let R=q.filter(M=>$(M)===k);return R.length?`
        <section class="part-document-group">
          <div class="part-document-group-heading">
            <h4>${e(O)}</h4>
            <span>${R.length}</span>
          </div>
          <div class="part-document-grid">
            ${R.map(C).join("")}
          </div>
        </section>
      `:""}function S(k){let O=k.reduce((R,M)=>{let L=$(M);return R[L]=(R[L]||0)+1,R},{});return["part_photo","receipt","invoice","part_print","schematic","manual","spec_sheet"].filter(R=>O[R]).map(R=>`<span class="chip">${O[R]} ${e(P[R]||"file")}${O[R]===1?"":"s"}</span>`).join("")}function b(k){let O=Number(k.quantity_on_hand)||0,q=Number(k.reorder_point)||0,R=Number(k.unit_cost)||0,M=O<=q,L=Math.max(0,q-O);return`
        <article class="part-card part-tile ${M?"low-stock":""}" data-open-part="${k.id}" tabindex="0" role="button" aria-label="Open ${e(k.name)}">
          <div class="part-card-main">
            <div class="chip-row">
              ${k.sku?`<span class="chip">${e(k.sku)}</span>`:""}
              ${k.supplier_name?`<span class="chip part-source-chip">${e(k.supplier_name)}</span>`:""}
              ${k.machine_note?`<span class="chip">${e(k.machine_note)}</span>`:""}
              ${M?'<span class="chip overdue">low stock</span>':'<span class="chip open">stocked</span>'}
            </div>
            <h3>${e(k.name)}</h3>
            <div class="part-card-meta">
              <span>${O} on hand</span>
              <span>reorder at ${q}</span>
              <span>${p()?`${t(R)} listed cost`:"Cost reference not active yet"}</span>
            </div>
            ${M&&q>0?`<small>Need ${L} to reach reorder point.</small>`:""}
          </div>
          <span class="part-tile-open">Open</span>
        </article>
      `}function E(){let k=i().filter(a),O=k.filter(n).length,q=f();return[["All Parts",k.length,"all"],["Low Stock",O,"low"]].map(([R,M,L])=>`
        <button class="parts-health ${L==="low"&&M?"attention":""} ${q===L?"active":""}" data-part-inventory-filter="${L}" type="button">
          <span>${R}</span>
          <strong>${M}</strong>
        </button>
      `).join("")}function T(k="default"){return`
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
              <option value="default" ${k==="default"?"selected":""}>Default</option>
              <option value="source" ${k==="source"?"selected":""}>Source / vendor</option>
            </select>
          </label>
        </div>
      `}function D(k){let O=Number(k.quantity_on_hand)||0,q=Number(k.reorder_point)||0,R=Number(k.unit_cost)||0,M=m()[k.id]||[],L=S(M),N=u();return`
        <section class="part-detail-shell">
          ${N?h():""}
          ${y()}
          <div class="part-detail-summary relationship-detail parts">
            <button class="secondary-button part-back-button" data-close-part-detail type="button">Back to parts</button>
            <div>
              <div class="chip-row">
                ${k.sku?`<span class="chip">${e(k.sku)}</span>`:""}
                ${k.supplier_name?`<span class="chip part-source-chip">${e(k.supplier_name)}</span>`:""}
                ${k.machine_note?`<span class="chip">${e(k.machine_note)}</span>`:""}
                <span class="chip ${O<=q?"overdue":"open"}">${O<=q?"low stock":"stocked"}</span>
              </div>
              <h3>${e(k.name)}</h3>
              <p>${O} on hand - reorder at ${q}</p>
              ${L?`<div class="chip-row part-file-summary">${L}</div>`:""}
            </div>
          </div>

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Quick Inventory</h3>
              <span>stock movement</span>
            </div>
            ${N?`<div class="part-card-actions">
              <form class="part-quantity-form use-part-form" data-use-part="${k.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Use quantity for ${e(k.name)}">
                <button class="secondary-button use-part-button" type="submit">Use</button>
              </form>
              <form class="part-quantity-form restock-form" data-restock-part="${k.id}">
                <input name="quantity" type="number" min="1" step="1" value="1" aria-label="Restock quantity for ${e(k.name)}">
                <button class="secondary-button" type="submit">Restock</button>
              </form>
            </div>`:""}
          </section>

          ${N?`<form class="part-detail-form relationship-detail parts" data-edit-part="${k.id}">
            <label>Name<input name="name" required value="${e(k.name)}"></label>
            <label>SKU<input name="sku" value="${e(k.sku||"")}"></label>
            <label>Source / vendor<input name="supplier_name" list="part-source-options" value="${e(k.supplier_name||"")}" placeholder="Where this part usually comes from"><button class="text-button danger-link inline-label-action" data-toggle-part-sources type="button">Edit sources</button></label>
            <label>Common machine / area<input name="machine_note" list="part-machine-options" value="${e(k.machine_note||"")}" placeholder="Optional display/search note"></label>
            <label>On hand<input name="quantity_on_hand" type="number" min="0" step="1" value="${O}"></label>
            <label>Reorder at<input name="reorder_point" type="number" min="0" step="1" value="${q}"></label>
            <label>Listed unit cost<input name="unit_cost" type="number" min="0" step="0.01" value="${R}"></label>
            <p class="error-text" data-part-edit-error="${k.id}"></p>
            <div class="button-row">
              <button class="secondary-button" type="submit">Save Part</button>
              <button class="text-button" data-close-part-detail type="button">Cancel</button>
            </div>
          </form>`:""}

          ${N&&d()?w():""}

          <section class="part-detail-files relationship-detail parts">
            <div class="panel-header compact">
              <h3>Part Files</h3>
              <span>${M.length} file${M.length===1?"":"s"}</span>
            </div>
            ${N?`<form class="part-document-form" data-part-document="${k.id}">
              <label>File type<select name="document_type">${A()}</select></label>
              <label>Attach file<input name="document" type="file" accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx"><small>Images are optimized near 1 MB. Non-image files over 25 MB are blocked.</small></label>
              <p class="error-text" data-part-document-error="${k.id}">${r()?"":"Run supabase/step-next-part-documents.sql before attaching files."}</p>
              <button class="secondary-button" type="submit" ${r()?"":"disabled"}>Attach File</button>
            </form>`:""}
            <div class="part-document-list">
              ${M.length?_.map(U=>v(U,M)).join(""):'<p class="muted">No photos, receipts, invoices, prints, schematics, or manuals filed with this part.</p>'}
            </div>
          </section>

          ${N?I(k):""}
        </section>
      `}function I(k){let O=l(k.id).length,q=m()[k.id]||[],R=c()===k.id;return g()?`
        <section class="delete-zone part-delete-zone">
          <div>
            <h3>Delete Part</h3>
            <p>${O?`This part has ${O} usage record${O===1?"":"s"} tied to work order history, so it cannot be deleted.`:`This permanently removes the part${q.length?` and ${q.length} filed receipt/invoice record${q.length===1?"":"s"}`:""}.`}</p>
          </div>
          <p class="error-text" id="part-delete-error"></p>
          ${O?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:R?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${e(k.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-part type="button">Cancel</button>
                <button class="danger-action-button large-delete-button permanent-delete-button" data-delete-part="${e(k.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-part="${e(k.id)}" type="button">Delete Part</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused parts.</p>'}return{renderPart:b,renderPartsHealth:E,renderPartSearch:T,renderPartDetail:D,renderPartDangerZone:I}}window.MaintainOpsPartsDisplay={createPartsDisplayHelpers:s},typeof ot<"u"&&(ot.exports={createPartsDisplayHelpers:s})})()});var an=B((lr,it)=>{(function(){function s({canManageTeam:e,renderAppIssueReport:t,escapeHtml:n,getActiveSection:a,getAppIssueReportsReady:i,getAppIssueReports:m}){function r(){let p=i();return`
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
            <input name="screen" type="hidden" value="${n(a())}">
            <p class="muted">This sends the current company, location, screen, and signed-in user with the report.</p>
            <p class="error-text" id="app-issue-report-error">${p?"":"Run supabase/step-next-app-issue-reports.sql before saving app issue reports."}</p>
            <button class="primary-button" type="submit" ${p?"":"disabled"}>Send Report</button>
          </form>
        </section>
      `}function c(p){let f={open:0,reviewing:1,resolved:2};return[...p].sort((o,l)=>{let g=(f[o.status||"open"]??1)-(f[l.status||"open"]??1);return g||new Date(l.created_at||0)-new Date(o.created_at||0)})}function d(){if(!e())return"";let p=i(),f=m(),o=c(f);return`
        <section class="settings-summary app-issue-report-list">
          <div class="settings-section-heading">
            <div>
              <strong>Reported App Issues</strong>
              <span>${p?`${f.length} captured`:"setup needed"}</span>
            </div>
          </div>
          ${p?`
            <div class="issue-report-list">
              ${o.map(t).join("")||'<p class="muted">No app issues reported yet.</p>'}
            </div>
          `:'<p class="warning-text">Run supabase/step-next-app-issue-reports.sql to capture tester feedback inside the app.</p>'}
        </section>
      `}return{renderAppIssueReportForm:r,renderAppIssueReportsPanel:d,sortedAppIssueReports:c}}window.MaintainOpsAppIssuePanelDisplay={createAppIssuePanelDisplayHelpers:s},typeof it<"u"&&(it.exports={createAppIssuePanelDisplayHelpers:s})})()});var on=B((ur,st)=>{(function(){function s(e){let t=e.escapeHtml,n=e.getDueState,a=e.procedureDeleteBlockerMessage,i=e.canDeleteOperationalRecords,m=e.canEditOperationalRecords||(()=>!0);function r(){return e.getPreventiveSchedules().filter(f=>e.matchesActiveLocation(f)&&e.matchesSearch([f.title,f.frequency,f.next_due_at,f.assets?.name]))}function c(){return e.getProcedureTemplates().filter(f=>e.matchesSearch([f.name,f.description,...(f.procedure_steps||[]).map(o=>o.prompt)]))}function d(f){let o=n({due_at:f.next_due_at,status:"open"}),l=e.getPendingDeleteScheduleId()===f.id,g=m();return`
        <article class="pm-card">
          <div>
            <div class="chip-row">
              <span class="chip">${t(f.frequency)}</span>
              ${o?`<span class="chip ${o.className}">${o.label}</span>`:""}
            </div>
            <h3>${t(f.title)}</h3>
            <p>${t(f.assets?.name||"No equipment")} - Next due ${f.next_due_at}</p>
          </div>
          ${g?`<div class="request-actions">
            <button class="secondary-button" data-generate-pm="${f.id}" type="button">Generate Work</button>
            ${i()?l?`
              <button class="secondary-button" data-cancel-delete-schedule type="button">Cancel</button>
              <button class="danger-action-button confirm-delete-button" data-confirm-delete-schedule="${t(f.id)}" type="button">Permanently Delete</button>
            `:`
              <button class="danger-action-button" data-delete-schedule="${t(f.id)}" type="button">Delete</button>
            `:""}
          </div>`:""}
        </article>
      `}function p(f){let o=e.getWorkOrders().filter(y=>y.procedure_template_id===f.id).length,l=e.getPreventiveSchedules().filter(y=>y.procedure_template_id===f.id).length,g=a({workOrders:o,schedules:l}),u=e.getPendingDeleteProcedureId()===f.id,h=m();return`
        <article class="procedure-card">
          <div>
            <div class="chip-row">
              <span class="chip">${f.procedure_steps?.length||0} steps</span>
              <span class="chip">${o} linked work orders</span>
              ${l?`<span class="chip">${l} PM schedules</span>`:""}
            </div>
            <h3>${t(f.name)}</h3>
            <p>${t(f.description||"No description.")}</p>
          </div>
          <div class="checklist-list">
            ${(f.procedure_steps||[]).map(y=>`
              <div class="checklist-step">
                <span>${y.position}. ${t(y.prompt)}</span>
                <small>${t(y.response_type)} ${y.required?"- required":"- optional"}</small>
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
          ${h&&i()?`
            <section class="delete-zone procedure-delete-zone">
              <div>
                <h3>Delete Procedure Checklist</h3>
                <p>${g||"This removes the checklist template and checklist steps."}</p>
              </div>
              <p class="error-text" data-procedure-delete-error="${t(f.id)}"></p>
              ${g?`
                <button class="danger-action-button" type="button" disabled>Kept For Traceability</button>
              `:u?`
                <div class="delete-warning-panel">
                  <strong>Permanent Delete Warning</strong>
                  <p>You are about to permanently delete "${t(f.name)}". This cannot be undone.</p>
                  <div class="button-row">
                    <button class="secondary-button" data-cancel-delete-procedure type="button">Cancel</button>
                    <button class="danger-action-button permanent-delete-button" data-confirm-delete-procedure="${t(f.id)}" type="button">Permanently Delete</button>
                  </div>
                </div>
              `:`
                <button class="danger-action-button" data-delete-procedure="${t(f.id)}" type="button">Delete Checklist</button>
              `}
            </section>
          `:""}
        </article>
      `}return{filteredPreventiveSchedules:r,filteredProcedureTemplates:c,renderPreventiveSchedule:d,renderProcedureTemplate:p}}window.MaintainOpsMaintenanceListDisplay={createMaintenanceListDisplayHelpers:s},typeof st<"u"&&(st.exports={createMaintenanceListDisplayHelpers:s})})()});var sn=B((dr,ct)=>{(function(){function s(e={}){let{renderMissingWorkOrderDetail:t,partUsageUnitCost:n,buildActivityFeed:a,checklistProgress:i,requiredChecklistProgress:m,escapeHtml:r,cleanWorkOrderDescription:c,renderRelationshipChips:d,renderWorkOrderCommandSummary:p,renderWorkOrderRecommendation:f,statusLabel:o,normalizeWorkOrderType:l=k=>String(k||"corrective"),workOrderTypeLabel:g=k=>String(k||"corrective").replace(/\b\w/g,O=>O.toUpperCase()),hasCompletedSafetyDeviceCheck:u,canAssignWorkOrderToMe:h,renderAssetOptions:y,assetLocationRoutingMessage:w,renderWorkOrderAssignmentField:_,requiresSafetyDeviceCheck:P,renderWorkOrderMessages:$,renderProcedureOptions:A,money:C,photoMetaText:v,renderActivityItem:S,canDeleteWorkOrders:b,canEditOperationalRecords:E=()=>!0}=e;function T(k,O){let q=e.getStepResultsByWorkOrder()[k.id]?.[O.id],R=q?.value||"",M=`data-step-result="${O.id}" data-work-order-id="${k.id}"`,L=`<input ${M} value="${r(R)}" placeholder="Result">`;return O.response_type==="checkbox"&&(L=`<label class="check-row"><input ${M} type="checkbox" ${R==="checked"?"checked":""}> Done</label>`),O.response_type==="pass_fail"&&(L=`
          <select ${M}>
            <option value="">Not checked</option>
            <option value="pass" ${R==="pass"?"selected":""}>Pass</option>
            <option value="fail" ${R==="fail"?"selected":""}>Fail</option>
          </select>
        `),O.response_type==="number"&&(L=`<input ${M} type="number" value="${r(R)}" placeholder="Reading">`),`
        <div class="checklist-step relationship-detail procedure">
          <span>${O.position}. ${r(O.prompt)} ${O.required?'<small class="required-mark">Required</small>':""}</span>
          ${L}
          ${q?.completed_at?`<small>Recorded ${new Date(q.completed_at).toLocaleString()}</small>`:""}
        </div>
      `}function D(k){return`
        <section class="delete-zone">
          <div>
            <h3>Delete Work Order</h3>
            <p>This removes the work order and its linked comments, history, parts used, and photo records.</p>
          </div>
          ${e.getPendingDeleteWorkOrderId()===k.id?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${r(k.title)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-work-order type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-work-order="${k.id}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-work-order="${k.id}" type="button">Delete Work Order</button>
          `}
        </section>
      `}function I(){let k=e.getActiveWorkOrderId(),q=e.getWorkOrders().find(F=>F.id===k);if(!q)return t();let R=e.getCommentsByWorkOrder(),M=e.getPhotosByWorkOrder(),L=e.getEventsByWorkOrder(),N=e.getPartsUsedByWorkOrder(),U=e.getProcedureTemplates(),G=e.getWorkOrderActionWarningId(),H=e.getWorkOrderActionWarning(),ne=e.getParts(),ae=e.getProfilesByUserId(),K=e.getCommentsError(),re=e.STATUS_OPTIONS||[],W=e.TYPE_OPTIONS||[],Q=R[q.id]||[],z=M[q.id]||[],Z=L[q.id]||[],J=N[q.id]||[],ee=J.reduce((F,ue)=>F+(Number(ue.quantity_used)||0)*n(ue),0),X=J.reduce((F,ue)=>F+(Number(ue.quantity_used)||0),0),oe=a(Q,z,Z,J),V=U.find(F=>F.id===q.procedure_template_id),ce=V?i(q,V):null,le=V?m(q,V):null,te=E();return`
      <div class="detail-stack">
        <div>
          <div class="chip-row">
            <span class="chip ${q.priority}">${q.priority}</span>
            <span class="chip">${r(g(q.type))}</span>
            <span class="chip ${q.status}">${o(q.status)}</span>
          </div>
          <h2>${r(q.title)}</h2>
          <p>${r(c(q.description)||"No description.")}</p>
          ${d(q)}
          ${q.completed_at?`<p class="completion-note">Completed ${new Date(q.completed_at).toLocaleString()} \xC2\xB7 ${q.actual_minutes||0} min</p>`:""}
          ${q.asset_id&&u(q)?'<p class="completion-note">Safety devices identified before completion.</p>':""}
          ${q.completion_notes?`<p>${r(q.completion_notes)}</p>`:""}
        </div>

        ${p(q)}
        ${f(q)}

        ${q.completed_at&&(q.failure_cause||q.resolution_summary||q.follow_up_needed)?`
          <div class="outcome-summary">
            <h3>Work Outcome</h3>
            ${q.failure_cause?`<article><span>Cause</span><strong>${r(q.failure_cause)}</strong></article>`:""}
            ${q.resolution_summary?`<article><span>Resolution</span><strong>${r(q.resolution_summary)}</strong></article>`:""}
            ${q.follow_up_needed?'<article class="follow-up"><span>Follow-up</span><strong>Needed</strong></article>':""}
          </div>
        `:""}

        ${te?`<label>Status
          <select id="status-select">
            ${re.map(F=>`<option value="${F}" ${F===q.status?"selected":""}>${o(F)}</option>`).join("")}
          </select>
        </label>`:""}

        ${te?`<div class="quick-actions detail-quick-actions">
          ${h(q)?`<button class="assign-action" data-assign-me="${q.id}" type="button">${q.assigned_to?"Reassign to me":"Assign to me"}</button>`:""}
          ${re.filter(F=>F!==q.status).map(F=>`
            <button data-quick-status="${F}" data-id="${q.id}" type="button">${o(F)}</button>
          `).join("")}
        </div>`:""}
        ${G===q.id&&H?`<p class="error-text action-warning">${r(H)}</p>`:""}

        ${te?`<details class="quick-update-panel relationship-detail comment work-detail-section" open>
          <summary>Quick Update</summary>
          <form class="form-grid" id="quick-update-work-order-form">
            <label id="quick-update-issue-field">Issue<input name="title" required value="${r(q.title)}"></label>
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
            <p class="error-text" data-asset-location-warning>${r(w(q.asset_id||""))}</p>
            <label id="quick-update-resolution-field">Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(q.resolution_summary||"")}</textarea></label>
            <label id="quick-update-due-field">Expected back up / due date
              <span class="date-picker-row" data-date-picker-field>
                <input name="due_at" type="date" value="${r(q.due_at||"")}">
                <button class="secondary-button date-picker-button" data-open-date-picker type="button">Calendar</button>
              </span>
            </label>
            <label id="quick-update-status-field">Status
              <select name="status">
                ${re.map(F=>`<option value="${F}" ${F===q.status?"selected":""}>${o(F)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select name="priority">
                ${["low","medium","high","critical"].map(F=>`<option value="${F}" ${F===q.priority?"selected":""}>${F}</option>`).join("")}
              </select>
            </label>
            ${_(q,"quick-update-owner-field")}
            <label id="quick-update-procedure-field">Procedure checklist
              <select name="procedure_template_id">
                ${A(q.procedure_template_id||"")}
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

        ${te?`<details class="work-detail-section relationship-detail asset">
          <summary>Full Work Order Details</summary>
        <form class="form-grid" id="edit-work-order-form">
          <label>Title<input name="title" required value="${r(q.title)}"></label>
          <label>Description<textarea name="description" rows="3">${r(c(q.description)||"")}</textarea></label>
          <label>Due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${r(q.due_at||"")}">
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
              ${W.map(F=>`<option value="${F}" ${F===l(q.type)?"selected":""}>${g(F)}</option>`).join("")}
            </select>
          </label>
          ${_(q)}
          <label>Procedure checklist
            <select name="procedure_template_id">
              ${A(q.procedure_template_id||"")}
            </select>
          </label>
          <div class="form-section-title">Internal Record</div>
          <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?">${r(q.failure_cause||"")}</textarea></label>
          <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?">${r(q.resolution_summary||"")}</textarea></label>
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

        ${V?`
          <details class="work-detail-section relationship-detail procedure" open>
            <summary>Procedure Checklist</summary>
            <div class="panel-header compact-header">
              <h3>${r(V.name)}</h3>
              <span>${ce.done} of ${ce.total} complete \xC2\xB7 required ${le.done}/${le.total}</span>
            </div>
            <div class="checklist-list">
              ${V.procedure_steps.map(F=>te?T(q,F):`
                <div class="checklist-step relationship-detail procedure">
                  <span>${F.position}. ${r(F.prompt)} ${F.required?'<small class="required-mark">Required</small>':""}</span>
                  <small>${r(e.getStepResultsByWorkOrder()[q.id]?.[F.id]?.value||"Not recorded")}</small>
                </div>
              `).join("")||'<p class="muted">This procedure has no steps yet.</p>'}
            </div>
          </details>
        `:""}

        ${te&&q.status!=="completed"?`
          <details class="work-detail-section completion-section" id="work-order-complete-target">
            <summary>Complete Work</summary>
          <form class="completion-box" id="complete-work-order-form">
            <h3>Complete Work</h3>
            ${le?.total?`<p class="${le.done===le.total?"completion-note":"warning-text"}">Required checklist: ${le.done}/${le.total}</p>`:""}
            <label>Cause / finding<textarea name="failure_cause" rows="2" placeholder="What caused the issue, or what did you find?"></textarea></label>
            <label>Resolution<textarea name="resolution_summary" rows="2" placeholder="What action fixed it?"></textarea></label>
            <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            <label>Actual minutes<input name="actual_minutes" type="number" min="0" step="5" value="${q.actual_minutes||0}"></label>
            <label>Completion notes<textarea name="completion_notes" rows="3" placeholder="What was fixed? Any follow-up needed?"></textarea></label>
            ${P(q)?`
              <label class="check-row safety-check-row">
                <input name="safety_devices_checked" type="checkbox" required ${u(q)?"checked":""}>
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
              ${ne.map(F=>`<option value="${F.id}">${r(F.name)} (${F.quantity_on_hand} on hand)</option>`).join("")}
            </select>
          </label>
          <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
          <p class="error-text" id="parts-used-error"></p>
          <button class="secondary-button" type="submit">Record Part Used</button>
        </form>`:""}

        <div class="parts-used-list">
          ${J.length?`<article class="parts-used-summary"><strong>Parts estimate</strong><span>${C(ee)}</span></article>`:""}
          ${J.map(F=>`
            <article class="relationship-detail parts">
              <strong>${r(F.parts?.name||"Part")}</strong>
              <span>${F.quantity_used} used - ${C((Number(F.quantity_used)||0)*n(F))}</span>
              <small>${F.created_at?new Date(F.created_at).toLocaleString():"time unavailable"} &middot; ${r(ae[F.created_by]?.full_name||"Team member")}</small>
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
            ${z.map(F=>`
              <article class="relationship-detail photo">
                ${F.signedUrl&&F.content_type?.startsWith("image/")?`<img class="photo-thumb" src="${r(F.signedUrl)}" alt="${r(F.file_name)}">`:""}
                <strong>${r(F.file_name)}</strong>
                <span>${v(F)}</span>
                ${F.signedUrl?`<a href="${r(F.signedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:""}
                ${te?`<button class="text-button danger-link" data-delete-work-order-photo="${r(F.id||"")}" data-work-order-photo-path="${r(F.storage_path||"")}" type="button">Delete Photo</button>`:""}
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
          ${Q.map(F=>`
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
          ${K?`<p class="error-text">${r(K)}</p>`:""}
          ${oe.map(S).join("")||'<p class="muted">No activity yet.</p>'}
        </div>
        </details>

        ${te&&b()?D(q):""}
      </div>
    `}return{renderWorkOrderDetail:I}}window.MaintainOpsWorkOrderDetailDisplay={createWorkOrderDetailDisplayHelpers:s},typeof ct<"u"&&(ct.exports={createWorkOrderDetailDisplayHelpers:s})})()});var cn=B((pr,lt)=>{(function(){function s(){function e(){return`
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
      `}return{renderEquipmentStructureGuide:e}}window.MaintainOpsEquipmentStructureGuideDisplay={createEquipmentStructureGuideDisplayHelpers:s},typeof lt<"u"&&(lt.exports={createEquipmentStructureGuideDisplayHelpers:s})})()});var ln=B((mr,ut)=>{(function(){function s(e={}){let{renderCreateWorkOrder:t,parentAssetFor:n,childAssetsFor:a,escapeHtml:i,assetTypeLabel:m,renderParentAssetOptions:r,renderLocationOptions:c,renderAssetAreaOptions:d,assetStatusLabel:p,renderAssetMiniWorkOrder:f,assetDeleteBlockerMessage:o,canDeleteEquipment:l,canEditEquipmentRecords:g=()=>!0,renderEquipmentStructureGuide:u,renderProcedureOptions:h}=e;function y(){let v=new Date;return new Date(v.getTime()-v.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function w(v,S,b){let E=S.some(k=>k.event_type==="created"),T=v.created_at&&!E?[{id:`${v.id}-created`,event_type:"created",summary:`${m(v.asset_type)} created.`,actor_id:v.created_by||"",created_at:v.created_at}]:[];return{equipmentHistory:[...S,...T].sort((k,O)=>new Date(O.created_at||0)-new Date(k.created_at||0)),historyActorLabel:k=>k.actor_id&&b[k.actor_id]?.full_name?b[k.actor_id].full_name:k.actor_id?`User ${String(k.actor_id).slice(0,8)}`:k.event_type==="created"?"Creator not recorded":"Team member not recorded"}}function _(v,S){return v.map(b=>`
        <article>
          <strong>${i(String(b.event_type||"noted").replaceAll("_"," "))}</strong>
          <span>${b.created_at?new Date(b.created_at).toLocaleString():"time unavailable"} &middot; ${i(S(b))}</span>
          <p>${i(b.summary||"Equipment history noted.")}</p>
        </article>
      `).join("")}function P(){let v=e.getAssets(),S=e.getActiveAssetId(),b=v.find(U=>U.id===S);if(!b)return t();let E=e.getAssetEventsReady?.()!==!1,T=e.getProfilesByUserId?.()||{},D=(e.getAssetEventsByAssetId?.()[b.id]||[]).sort((U,G)=>new Date(G.created_at||0)-new Date(U.created_at||0)),{equipmentHistory:I,historyActorLabel:k}=w(b,D,T),O=e.LIST_ITEMS_PER_PAGE||12,q=Math.max(1,Math.ceil(I.length/O)),R=Math.min(Math.max(1,e.getAssetRelationshipPage?.(b.id,"asset-history")||1),q),M=I.length?(R-1)*O+1:0,L=Math.min(I.length,R*O),N=I.slice((R-1)*O,R*O);return`
        <div class="detail-stack">
          <section class="asset-relationship-panel relationship-detail comment">
            <div class="panel-header compact">
              <div>
                <h3>Equipment History</h3>
                <span>${i(b.name)} - ${I.length} event${I.length===1?"":"s"}</span>
              </div>
              <button class="secondary-button back-action-button" data-back-asset-history="${i(b.id)}" type="button">Back to Equipment</button>
            </div>
            <div class="timeline">
              ${E?"":'<p class="error-text">Run supabase/step-next-asset-events.sql to show equipment history notes.</p>'}
              ${_(N,k)||'<p class="muted">No equipment history notes yet.</p>'}
            </div>
            ${I.length>O?`
              <div class="pagination-bar">
                <button class="secondary-button page-action-button" data-asset-history-page="prev" data-asset-id="${i(b.id)}" type="button" ${R<=1?"disabled":""}>Previous</button>
                <span>Showing ${M}-${L} of ${I.length} - Page ${R} of ${q}</span>
                <button class="secondary-button page-action-button" data-asset-history-page="next" data-asset-id="${i(b.id)}" type="button" ${R>=q?"disabled":""}>Next</button>
              </div>
            `:""}
          </section>
        </div>
      `}function $(){let v=e.getAssets(),S=e.getActiveAssetId(),b=v.find(x=>x.id===S);if(!b)return t();typeof e.ensureAssetDocumentSignedUrls=="function"&&e.ensureAssetDocumentSignedUrls(b.id);let E=e.getWorkOrders(),T=e.getPreventiveSchedules(),D=e.getParts(),I=e.getAssetParts(),k=e.getAssetPartsReady(),O=e.getAssetDocumentsByAssetId?.()[b.id]||[],q=e.getAssetDocumentsReady?.()!==!1,R=e.getAssetEventsReady?.()!==!1,M=e.getProfilesByUserId?.()||{},L=e.getPartsUsedByWorkOrder(),N=e.getLocations(),U=e.getActiveLocationId(),G=e.ASSET_TYPE_OPTIONS||[],H=n(b),ne=a(b.id),ae=E.filter(x=>x.asset_id===b.id),K=ae.filter(x=>x.status!=="completed").sort((x,ie)=>new Date(ie.created_at||0)-new Date(x.created_at||0)),re=ae.filter(x=>x.status==="completed").sort((x,ie)=>new Date(ie.completed_at||ie.created_at||0)-new Date(x.completed_at||x.created_at||0)),W=T.filter(x=>x.asset_id===b.id),Q=Object.values(L).flat().filter(x=>ae.some(ie=>ie.id===x.work_order_id)),z=I.filter(x=>x.asset_id===b.id),Z=new Set(z.map(x=>x.part_id)),J=D.filter(x=>!Z.has(x.id)),ee=(e.getAssetEventsByAssetId?.()[b.id]||[]).sort((x,ie)=>new Date(ie.created_at||0)-new Date(x.created_at||0)),{equipmentHistory:X}=w(b,ee,M),oe=e.LIST_ITEMS_PER_PAGE||12,V=x=>e.getAssetRelationshipOpen?.(b.id,x)||!1,ce=(x,ie)=>Math.min(Math.max(1,e.getAssetRelationshipPage?.(b.id,x)||1),Math.max(1,Math.ceil(ie/oe))),le=(x,ie)=>{let fe=ce(ie,x.length);return x.slice((fe-1)*oe,fe*oe)},te=(x,ie)=>{if(ie<=oe)return"";let fe=ce(x,ie),he=Math.max(1,Math.ceil(ie/oe)),ye=(fe-1)*oe+1,se=Math.min(ie,fe*oe);return`
          <div class="pagination-bar">
            <button class="secondary-button page-action-button" data-asset-relation-page="prev" data-asset-id="${i(b.id)}" data-asset-relation-section="${i(x)}" type="button" ${fe<=1?"disabled":""}>Previous</button>
            <span>Showing ${ye}-${se} of ${ie} - Page ${fe} of ${he}</span>
            <button class="secondary-button page-action-button" data-asset-relation-page="next" data-asset-id="${i(b.id)}" data-asset-relation-section="${i(x)}" type="button" ${fe>=he?"disabled":""}>Next</button>
          </div>
        `},F=x=>`class="asset-relationship-panel relationship-detail comment" data-asset-relationship-section="${i(x)}" data-asset-id="${i(b.id)}" ${V(x)?"open":""}`,ue=N.find(x=>x.id===b.location_id)?.name||b.location||"No location set",ge=H?H.name:"Top level equipment",me=b.status==="offline"?"status-blocked":b.status==="degraded"?"status-open":b.status==="watch"?"status-in_progress":"status-completed",pe=b.status==="degraded"&&K.length===0,Y=g();return`
        <div class="detail-stack">
          <div>
            <div class="chip-row">
              <span class="chip asset-${b.status}">${i(p(b.status))}</span>
              <span class="chip">${i(m(b.asset_type))}</span>
              ${b.asset_code?`<span class="chip">${i(b.asset_code)}</span>`:""}
              ${b.manufacturer?`<span class="chip">${i(b.manufacturer)}</span>`:""}
              ${b.model?`<span class="chip">${i(b.model)}</span>`:""}
              ${b.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h2>${i(b.name)}</h2>
            <p>${i(b.location||"No location set")}</p>
            ${H?`<p>Part of <button class="text-button inline-link-button" data-open-asset="${i(H.id)}" type="button">${i(H.name)}</button></p>`:""}
          </div>

          <section class="work-command-summary asset-command-summary" id="equipment-action-cards" aria-label="Equipment summary">
            <button class="command-card ${me}" data-jump-work-section="edit-asset-status-field" type="button">
              <span>Status</span>
              <strong>${i(p(b.status))}</strong>
              <small>${b.safety_devices_required===!1?"No safety completion gate":"Safety device identification required before completing work"}</small>
            </button>
            <button class="command-card command-equipment" data-jump-work-section="edit-asset-location-field" type="button">
              <span>Location</span>
              <strong>${i(ue)}</strong>
              <small>${b.location?i(b.location):"Area / spot unset"}</small>
            </button>
            <button class="command-card command-owner" data-jump-work-section="edit-asset-parent-field" type="button">
              <span>Primary</span>
              <strong>${i(ge)}</strong>
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
            <button class="command-card command-photo ${O.length?"":"empty"}" data-jump-work-section="asset-documents-target" type="button">
              <span>Files</span>
              <strong>${O.length}</strong>
              <small>${O.length?"Machine files on record":"No machine files yet"}</small>
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
              <button class="secondary-button" data-quick-fix-asset="${i(b.id)}" type="button">Create Work for Degraded Condition</button>
            </section>
          `:""}

          ${u?u():""}

          ${Y?`<div class="quick-actions detail-quick-actions">
            <button class="assign-action" data-quick-fix-asset="${b.id}" type="button">Quick Fix for this equipment</button>
          </div>`:""}

          <section class="relationship-detail photo asset-photo-panel" id="asset-documents-target">
            <div class="panel-header compact">
              <h3>Machine Files</h3>
              <span>${O.length} file${O.length===1?"":"s"}</span>
            </div>
            ${Y?`<form class="form-grid asset-photo-form relationship-detail photo" data-asset-document="${i(b.id)}">
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
              <p class="error-text" data-asset-document-error="${i(b.id)}">${q?"":"Run supabase/step-next-asset-documents.sql before uploading equipment files."}</p>
              <button class="secondary-button asset-action-button" type="submit" ${q?"":"disabled"}>Attach Machine File</button>
            </form>`:'<p class="muted">Accounting can view machine files. Maintenance/admins attach or remove files.</p>'}
            <div class="asset-file-list">
              ${O.map(x=>`
                <details class="asset-file-item">
                  <summary>
                    <span class="asset-file-thumb ${String(x.content_type||"").startsWith("image/")?"":"document-file"}">
                      ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${i(x.signedUrl)}" alt="${i(x.original_file_name||x.file_name||b.name)}">`:`<strong>${i(C(x.document_type))}</strong>`}
                    </span>
                    <span class="asset-file-title">
                      <strong>${i(C(x.document_type))}</strong>
                      <span>${i(x.original_file_name||x.file_name||"Machine file")}</span>
                    </span>
                    <span class="asset-file-action">Open</span>
                  </summary>
                  <div class="asset-file-preview">
                    ${String(x.content_type||"").startsWith("image/")&&x.signedUrl?`<img src="${i(x.signedUrl)}" alt="${i(x.original_file_name||x.file_name||b.name)}">`:`<div class="asset-file-document-preview">${i(C(x.document_type))}</div>`}
                    <div class="asset-file-meta">
                      <span>${i(x.content_type||"file")}</span>
                      <a class="secondary-button" href="${i(x.signedUrl||"#")}" target="_blank" rel="noreferrer">Open File</a>
                      ${Y?`<button class="text-button danger-link" data-delete-asset-document="${i(x.id)}" data-asset-document-path="${i(x.storage_path||"")}" type="button">Delete File</button>`:""}
                    </div>
                  </div>
                </details>
              `).join("")||'<p class="muted">No photos, schematics, settings, manuals, nameplates, or receipts uploaded yet.</p>'}
            </div>
          </section>

          ${Y?`<form class="form-grid" id="edit-asset-form">
            <label>Equipment name<input name="name" required value="${i(b.name)}"></label>
            <label>Serial Number<input name="asset_code" value="${i(b.asset_code||"")}"></label>
            <label>Manufacturer<input name="manufacturer" value="${i(b.manufacturer||"")}"></label>
            <label>Model<input name="model" value="${i(b.model||"")}"></label>
            <label>Type
              <select name="asset_type">
                ${G.map(x=>`<option value="${x}" ${x===(b.asset_type||"machine")?"selected":""}>${m(x)}</option>`).join("")}
              </select>
            </label>
            <label id="edit-asset-parent-field">Part of
              <select name="parent_asset_id">
                <option value="">Top level equipment</option>
                ${r(b.parent_asset_id||"",b.id)}
              </select>
            </label>
            <label id="edit-asset-location-field">Location
              <select name="location_id" ${N.length?"":"disabled"}>
                ${c(b.location_id||U)}
              </select>
            </label>
            <label>Area / spot
              <select name="location_existing">
                <option value="">Area / spot unset</option>
                ${d(b.location||"")}
              </select>
            </label>
            <label>New area / spot<input name="location_new" placeholder="Use only when this is a new area"></label>
            <label id="edit-asset-status-field">Status
              <select name="status">
                ${["running","watch","degraded","offline"].map(x=>`<option value="${x}" ${x===b.status?"selected":""}>${p(x)}</option>`).join("")}
              </select>
            </label>
            <label class="check-row safety-check-toggle"><input name="safety_devices_required" type="checkbox" ${b.safety_devices_required===!1?"":"checked"}> Safety device identification required before completion</label>
            <p class="error-text" id="asset-edit-error"></p>
            <button class="secondary-button asset-action-button" type="submit">Save Equipment</button>
          </form>`:'<section class="relationship-detail asset"><h3>Operational Equipment</h3><p class="muted">Accounting has read-only equipment access. Use the Financial tab to update finance-only fields or flag maintenance/admin review.</p></section>'}

          <section class="asset-relationship-panel relationship-detail asset" id="asset-linked-equipment-target">
            <h3>Linked Equipment</h3>
            <div class="mini-list asset-link-list">
              ${ne.map(x=>`
                <article class="mini-work-order" data-open-asset="${i(x.id)}">
                  <strong>${i(x.name)}</strong>
                  <span>${i(m(x.asset_type))} - ${i(p(x.status))}</span>
                </article>
              `).join("")||'<p class="muted">No equipment is linked under this item yet.</p>'}
            </div>
          </section>

          <details ${F("open-work")} id="asset-open-work-target">
            <summary>Open Work <span>${K.length}</span></summary>
            <div class="mini-list">
              ${V("open-work")?le(K,"open-work").map(f).join("")||'<p class="muted">No open work for this equipment.</p>':'<p class="muted">Open this section to load and review active work for this equipment.</p>'}
            </div>
            ${V("open-work")?te("open-work",K.length):""}
          </details>

          <details ${F("completed-history")}>
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
                <button class="secondary-button asset-action-button" data-open-asset-history="${i(b.id)}" type="button">View Equipment History</button>
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
            ${Y?`<form class="inline-form pm-form relationship-detail maintenance" data-create-pm-form data-equipment-pm-form="${i(b.id)}">
              <input name="title" required placeholder="PM for ${i(b.name)}">
              <input name="asset_id" type="hidden" value="${i(b.id)}">
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
              ${W.map(x=>`<article><strong>${i(x.title)}</strong><span>${x.frequency} - next due ${x.next_due_at}</span></article>`).join("")||'<p class="muted">No PM schedules for this equipment.</p>'}
            </div>
          </section>

          <details class="asset-relationship-panel relationship-detail parts" id="asset-linked-parts-target" data-asset-relationship-section="linked-parts" data-asset-id="${i(b.id)}" ${V("linked-parts")?"open":""}>
            <summary>Linked Parts <span>${z.length}</span></summary>
            <div class="panel-header compact">
              ${Y?'<button class="secondary-button asset-action-button" data-section="parts" type="button">Go to Parts</button>':""}
            </div>
            ${V("linked-parts")&&k?`
              ${Y?`<form class="inline-form equipment-part-form relationship-detail parts" data-attach-asset-part="${i(b.id)}">
                <label>Part
                  <select name="part_id" ${J.length?"":"disabled"}>
                    <option value="">Select part</option>
                    ${J.map(x=>`<option value="${i(x.id)}">${i(x.name)}${x.sku?` - ${i(x.sku)}`:""}</option>`).join("")}
                  </select>
                </label>
                <label>Recommended qty<input name="quantity_recommended" type="number" min="1" step="1" value="1"></label>
                <label>Note<input name="note" maxlength="180" placeholder="Filter, belt, seal, common spare..."></label>
                <button class="secondary-button asset-action-button" type="submit" ${J.length?"":"disabled"}>Attach Part</button>
              </form>`:""}
              <p class="error-text" data-asset-part-error="${i(b.id)}"></p>
              <div class="mini-list">
                ${le(z,"linked-parts").map(x=>`<article>
                  <strong>${i(x.parts?.name||"Part")}</strong>
                  <span>${i(x.parts?.sku||"No SKU")} - recommended qty ${i(x.quantity_recommended||1)}${x.note?` - ${i(x.note)}`:""}</span>
                  ${Y?`<button class="text-button danger-link" data-remove-asset-part="${i(x.id)}" type="button">Remove Link</button>`:""}
                </article>`).join("")||'<p class="muted">No parts are linked to this equipment yet.</p>'}
              </div>
              ${te("linked-parts",z.length)}
            `:k?'<p class="muted">Open this section to review or attach linked parts for this equipment.</p>':'<p class="muted">Run supabase/step-next-asset-parts.sql to link parts directly to equipment.</p>'}
          </details>

          <details class="asset-relationship-panel relationship-detail parts" data-asset-relationship-section="parts-used" data-asset-id="${i(b.id)}" ${V("parts-used")?"open":""}>
            <summary>Parts Used History <span>${Q.length}</span></summary>
            <div class="mini-list">
              ${V("parts-used")?le(Q,"parts-used").map(x=>`<article><strong>${i(x.parts?.name||"Part")}</strong><span>${x.quantity_used} used</span></article>`).join("")||'<p class="muted">No parts history yet.</p>':'<p class="muted">Open this section to load parts used history for this equipment.</p>'}
            </div>
            ${V("parts-used")?te("parts-used",Q.length):""}
          </details>

          ${Y?A(b):""}
        </div>
      `}function A(v){let S=e.getWorkOrders(),b=e.getPreventiveSchedules(),E=e.getAssets(),T=e.getActiveAssetId(),D=S.filter(M=>M.asset_id===v.id).length,I=b.filter(M=>M.asset_id===v.id).length,k=E.filter(M=>M.parent_asset_id===v.id).length,O=e.getMaintenanceRequests().filter(M=>M.asset_id===v.id).length,q=o({workOrders:D,children:k,schedules:I,requests:O}),R=e.getPendingDeleteAssetId()===T;return l()?`
        <section class="delete-zone asset-delete-zone">
          <div>
            <h3>Delete Equipment</h3>
            <p>${q||`This permanently removes "${i(v.name)}" from the equipment list.`}</p>
          </div>
          <p class="error-text" id="asset-delete-error"></p>
          ${q?`
            <button class="danger-action-button large-delete-button" type="button" disabled>Kept For Traceability</button>
          `:R?`
            <div class="delete-warning-panel">
              <strong>Permanent Delete Warning</strong>
              <p>You are about to permanently delete "${i(v.name)}". This cannot be undone.</p>
              <div class="button-row">
                <button class="secondary-button" data-cancel-delete-asset type="button">Cancel</button>
                <button class="danger-action-button confirm-delete-button" data-confirm-delete-asset="${i(v.id)}" type="button">Permanently Delete</button>
              </div>
            </div>
          `:`
            <button class="danger-action-button large-delete-button" data-delete-asset="${i(v.id)}" type="button">Delete Equipment</button>
          `}
        </section>
      `:'<p class="muted">Admins and managers can delete unused equipment.</p>'}function C(v){return{machine_photo:"Photo",schematic:"Schematic",settings:"Settings",manual:"Manual",nameplate:"Nameplate",inspection:"Inspection",receipt:"Receipt",other:"File"}[v]||"File"}return{renderAssetDetail:$,renderAssetHistoryScreen:P}}window.MaintainOpsAssetDetailDisplay={createAssetDetailDisplayHelpers:s},typeof ut<"u"&&(ut.exports={createAssetDetailDisplayHelpers:s})})()});var un=B((fr,dt)=>{(function(){function s(e={}){let{filteredMessageThreads:t,totalUnreadMessages:n,teamMemberName:a,escapeHtml:i,messageComposerScopeNote:m,recentMessageLinkWorkOrders:r,statusLabel:c,renderMessageThreadButton:d,messageThreadScopeLabel:p,renderMessageList:f}=e,o=e.canEditOperationalRecords||(()=>!0);function l(u){let h=String(u||"?").trim().split(/\s+/).filter(Boolean);return(h.length?h.map(y=>y[0]).join(""):"?").slice(0,2).toUpperCase()}function g(){if(!e.getMessagesReady())return'<p class="muted">Run supabase/step-next-message-center.sql to enable company, location, and direct message threads.</p>';let h=e.getMessageThreads(),y=e.getActiveMessageThreadId(),w=e.getMessagesByThreadId(),_=e.getWorkOrders(),P=e.getMessageComposerWorkOrderId(),$=e.getMessageComposerOpen(),A=e.getCompanyMembers(),C=e.getSession(),v=e.getMessageWorkOrderLinksReady(),S=e.getMessageSearchQuery(),b=e.getMessageThreadFilter(),E=A.filter(U=>U.user_id!==C.user.id),T=o(),D=h.find(U=>U.id===y)||h[0],I=D?w[D.id]||[]:[],k=t(),O=e.getMessageThreadsPage(),q=Math.max(1,Math.ceil(k.length/e.LIST_ITEMS_PER_PAGE)),R=Math.min(Math.max(O,1),q),M=k.slice((R-1)*e.LIST_ITEMS_PER_PAGE,R*e.LIST_ITEMS_PER_PAGE),L=_.find(U=>U.id===P),N=U=>{let G=a(U.user_id);return`
          <button class="message-person-card" data-message-person="${i(U.user_id)}" title="Message ${i(G)}" type="button">
            <span class="message-person-avatar" aria-hidden="true">${i(l(G))}</span>
            <span class="message-person-name">${i(G)}</span>
          </button>
        `};return`
        <section class="message-center">
          <div class="message-layout">
            <aside class="message-thread-rail">
              <div class="message-rail-header">
                <div>
                  <h3>Messages</h3>
                  <p>${n()} unread</p>
                </div>
              </div>
              <div class="message-people-strip" aria-label="Company message contacts">
                ${E.map(N).join("")||'<span class="muted">No teammates added yet.</span>'}
              </div>
              ${T?`<form class="message-thread-form" id="message-thread-form">
                <details ${$||L?"open":""}>
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
                        ${A.filter(U=>U.user_id!==C.user.id).map(U=>`<option value="${U.user_id}">${i(a(U.user_id))}</option>`).join("")||'<option value="">No teammates yet</option>'}
                      </select>
                    </label>
                    <div class="message-scope-note" id="message-scope-note">${m("location")}</div>
                    <label>Subject<input name="title" required placeholder="Thread subject" value="${L?`Work order: ${i(L.title)}`:""}"></label>
                    ${L?`
                      <input name="work_order_id" type="hidden" value="${L.id}">
                      <div class="message-linked-draft">
                        <span>Linked work order</span>
                        <strong>${i(L.title)}</strong>
                        <button class="text-button" data-clear-message-work-link type="button">Clear</button>
                      </div>
                    `:`
                      <label>Recent work order
                        <select name="work_order_id" ${v?"":"disabled"}>
                          <option value="">No work order</option>
                          ${r().map(U=>`<option value="${U.id}">${i(U.title)} - ${c(U.status)}</option>`).join("")}
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
                <input id="message-search" type="search" value="${i(S)}" placeholder="Search messages">
              </label>
              <div class="message-filter-bar" aria-label="Message thread filter">
                ${[["all","All"],["unread","Unread"],["company","Company"],["location","Location"],["direct","Direct"]].map(([U,G])=>`<button class="${b===U?"active":""}" data-message-filter="${U}" type="button">${G}</button>`).join("")}
              </div>
              <div class="message-thread-list">
                ${M.map(d).join("")||'<p class="muted">No threads match this filter.</p>'}
              </div>
              ${e.renderListPagination("messages",k.length,R,q)}
            </aside>
            <section class="message-thread-detail">
              ${D?`
                <div class="message-chat-header">
                  <div>
                    <h3>${i(D.title)}</h3>
                    <p class="muted">${p(D)}</p>
                  </div>
                  <div class="message-header-actions">
                    ${D.work_order_id?`<button class="secondary-button message-linked-work-button" data-open-linked-work-order="${D.work_order_id}" type="button">Open Work Order</button>`:""}
                    <span class="chip comment">${I.length} message${I.length===1?"":"s"}</span>
                    ${T?`<button class="text-button danger-link" data-delete-message-thread="${i(D.id)}" type="button">Delete Thread</button>`:""}
                  </div>
                </div>
                <div class="message-list">
                  ${f(I)}
                </div>
                ${T?`<form class="message-reply-form" id="message-reply-form" data-thread-id="${D.id}">
                  <div class="message-quick-replies">
                    ${["On it","Need more info","Waiting on parts","Complete"].map(U=>`<button data-quick-reply="${i(U)}" type="button">${i(U)}</button>`).join("")}
                  </div>
                  <textarea name="body" rows="2" required placeholder="Reply to this thread..."></textarea>
                  <p class="error-text" id="message-reply-error"></p>
                  <button class="secondary-button message-action-button" type="submit">Send Reply</button>
                </form>`:""}
              `:'<p class="muted">Choose or start a thread.</p>'}
            </section>
          </div>
        </section>
      `}return{renderMessageCenter:g}}window.MaintainOpsMessageCenterDisplay={createMessageCenterDisplayHelpers:s},typeof dt<"u"&&(dt.exports={createMessageCenterDisplayHelpers:s})})()});var dn=B((gr,pt)=>{(function(){function s(e={}){let{STATUS_OPTIONS:t=[],TYPE_OPTIONS:n=[],renderAssetOptions:a,statusLabel:i,workOrderTypeLabel:m=o=>String(o||"corrective").replace(/\b\w/g,l=>l.toUpperCase()),renderAssignmentSelect:r,renderProcedureOptions:c,escapeHtml:d}=e;function p(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getParts();return`
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
                  ${t.map(l=>`<option value="${l}" ${l==="open"?"selected":""}>${i(l)}</option>`).join("")}
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
                  ${n.map(l=>`<option value="${l}">${m(l)}</option>`).join("")}
                </select>
              </label>
              <label>Complete by / due date
                <span class="date-picker-row" data-date-picker-field>
                  <input name="due_at" type="date" value="${p()}">
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
                  ${o.map(l=>`<option value="${l.id}">${d(l.name)} (${l.quantity_on_hand} on hand)</option>`).join("")}
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
      `}return{renderCreateWorkOrder:f}}window.MaintainOpsCreateWorkOrderDisplay={createCreateWorkOrderDisplayHelpers:s},typeof pt<"u"&&(pt.exports={createCreateWorkOrderDisplayHelpers:s})})()});var pn=B((hr,mt)=>{(function(){function s(e={}){let{TYPE_OPTIONS:t=[],renderAssetOptions:n,assetLocationRoutingMessage:a,escapeHtml:i,renderAssignmentSelect:m,renderProcedureOptions:r,assetStatusLabel:c,workOrderTypeLabel:d=o=>String(o||"corrective").replace(/\b\w/g,l=>l.toUpperCase())}=e;function p(){let o=new Date;return new Date(o.getTime()-o.getTimezoneOffset()*6e4).toISOString().slice(0,10)}function f(){let o=e.getQuickFixAssetId(),l=e.getQuickFixRequestId(),g=e.getMaintenanceRequests(),u=e.getSession(),h=e.getParts(),y=o||"",w=g.find(_=>_.id===l);return`
        <form class="form-grid quick-fix-form relationship-detail comment" id="quick-fix-form">
          <div>
            <h3>Quick Fix</h3>
            <p class="muted">Log the issue now. Details can be added later.</p>
          </div>
          ${w?`<p class="completion-note">Resolving request: ${i(w.title)}</p>`:""}
          <label>Issue<input name="title" required autofocus placeholder="Loose guard switch fixed" value="${i(w?.title||"")}"></label>
          <label>Description<textarea name="description" rows="3" placeholder="Describe what happened, where it happened, and what should be checked.">${i(w?.description||"")}</textarea></label>
          <label>Complete by / due date
            <span class="date-picker-row" data-date-picker-field>
              <input name="due_at" type="date" value="${p()}">
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
                  ${n(y||w?.asset_id||"")}
                </select>
              </label>
            </div>
            <div data-equipment-choice-panel="new" hidden>
              <label>New machine / equipment name<input name="new_asset_name" data-equipment-choice-new data-equipment-choice-required="true" placeholder="Packaging Line 2" disabled></label>
            </div>
          </fieldset>
          <p class="error-text" data-asset-location-warning>${i(a(y||w?.asset_id||""))}</p>
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
                  ${t.map(_=>`<option value="${_}" ${_==="corrective"?"selected":""}>${d(_)}</option>`).join("")}
                </select>
              </label>
              <label>Assign to
                <select name="assigned_to">
                  ${m(u.user.id,{selfLabel:"Assign to me"})}
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
                  ${["running","watch","degraded","offline"].map(_=>`<option value="${_}">${c(_)}</option>`).join("")}
              </select>
            </label>
              <label>Part used
                <select name="part_id">
                  <option value="">No part used</option>
                  ${h.map(_=>`<option value="${_.id}">${i(_.name)} (${_.quantity_on_hand} on hand)</option>`).join("")}
                </select>
              </label>
              <label>Quantity used<input name="quantity_used" type="number" min="1" step="1" value="1"></label>
              <label class="check-row"><input name="follow_up_needed" type="checkbox"> Follow-up needed</label>
            </div>
          </details>
          <p class="error-text" id="quick-fix-error"></p>
          <button class="primary-button quick-fix-submit" type="submit">Log Quick Fix</button>
        </form>
      `}return{renderQuickFixForm:f}}window.MaintainOpsQuickFixDisplay={createQuickFixDisplayHelpers:s},typeof mt<"u"&&(mt.exports={createQuickFixDisplayHelpers:s})})()});var mn=B((yr,ft)=>{(function(){function s(e={}){let t=e.escapeHtml;function n(f){return`
        <section class="auth-shell">
          <div class="auth-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Loading Workspace</h1>
                <p>${t(f)}</p>
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
            <p class="error-text">${t(f)}</p>
            <button class="primary-button" id="retry-workspace-load" type="button">Try Again</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </div>
        </section>
      `}function i(f,o=""){let l=f==="signup";return`
        <section class="auth-shell">
          <form class="auth-card" id="auth-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${l?"Create Account":"Welcome Back"}</h1>
                <p>${l?"Start with email and password.":"Sign in to your maintenance workspace."}</p>
              </div>
            </div>
            <div class="form-grid">
              ${l?'<label>Full name<input name="fullName" required autocomplete="name"></label>':""}
              <label>Email<input name="email" type="email" required autocomplete="email"></label>
              <label>Password<input name="password" type="password" minlength="8" required autocomplete="${l?"new-password":"current-password"}"></label>
            </div>
            <p class="error-text" id="auth-error">${t(o)}</p>
            <p class="muted auth-status" id="auth-status"></p>
            <button class="primary-button" type="submit">${l?"Sign Up":"Log In"}</button>
            <button class="text-button" id="auth-mode" type="button">${l?"I already have an account":"Create an account"}</button>
            ${l?"":'<button class="text-button" id="auth-forgot-password" type="button">Forgot password?</button>'}
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
                <p>${t(f)}</p>
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
            <p class="error-text">${t(f)}</p>
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
            <p class="error-text" id="auth-error">${t(f)}</p>
            <p class="muted auth-status" id="auth-status">${t(o)}</p>
            <button class="primary-button" type="submit">Send Reset Link</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-reset" type="button">Reset login on this browser</button>
          </form>
        </section>
      `}function d(f={}){let o=!!f.ready,l=f.initialError||"";return`
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
            <p class="error-text" id="auth-error">${t(l)}</p>
            <p class="muted auth-status" id="auth-status">${o?"Reset link accepted. Choose your new password.":""}</p>
            <button class="primary-button" type="submit" ${o?"":"disabled"}>Update Password</button>
            <button class="text-button" id="auth-back-to-login" type="button">Back to sign in</button>
            <button class="text-button" id="auth-send-new-reset" type="button">Send a new reset link</button>
          </form>
        </section>
      `}function p(f=""){return`
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
            <p class="error-text" id="company-error">${t(f)}</p>
            <button class="primary-button" type="submit">Create Company</button>
            <button class="text-button" type="button" id="sign-out">Sign out</button>
          </form>
        </section>
      `}return{workspaceLoading:n,workspaceLoadError:a,authForm:i,authCallback:m,authCallbackError:r,passwordResetRequest:c,passwordRecovery:d,companyCreate:p}}window.MaintainOpsAuthDisplay={createAuthDisplayHelpers:s},typeof ft<"u"&&(ft.exports={createAuthDisplayHelpers:s})})()});var fn=B((br,gt)=>{(function(){function s(e={}){let t=e.escapeHtml,n=e.qrSvgFor,a=e.getLocations||(()=>[]),i=e.getPublicRequestLinks||(()=>[]),m=e.getPublicRequestLinksReady||(()=>!0),r=e.getPublicAppUrlOverride||(()=>""),c=e.getWindowPublicAppUrl||(()=>""),d=e.canManageTeam||(()=>!1),p=e.canAdministerPublicRequestLinks||(()=>!1),f=e.publicAppBaseUrl,o=e.publicRequestUrl,l=e.publicRequestQrUrl;function g(){return`
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
      `}function u(A,C){return`
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${t(A.location_name)}</h1>
                <p>${t(A.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${n(C,8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${t(C)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${t(C)}" target="_blank" rel="noreferrer">Test Form</a>
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
                <h1>${t(A.company_name)}</h1>
                <p>${t(A.location_name)} maintenance request</p>
              </div>
            </div>
            <div class="form-grid">
              <label>What needs attention?<input name="title" required maxlength="140" placeholder="Short issue description"></label>
              <label>Machine / area<input name="equipment_note" required maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
              <label>Details<textarea name="description" rows="4" required maxlength="1000" placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
              <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional image only. PDF quotes/documents are not accepted in this photo box. Photos are resized to 768px.</small></label>
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
                <p>${t(A)}</p>
              </div>
            </div>
          </div>
        </section>
      `}function _(A,C=""){return`
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${t(A.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${C?`<p class="error-text">${t(C)}</p>`:""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `}function P(){if(!d())return"";let A=f(),C=a(),v=m();return`
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${t(r()||String(c()||""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${A?`<p class="muted">QR codes will point to ${t(A)}</p>`:'<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>'}
          <p class="error-text" id="public-request-link-error">${v?"":"Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${C.map($).join("")||"<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>"}
          </div>
        </section>
      `}function $(A){let C=i().find(D=>D.location_id===A.id),v=!!(C&&C.is_active!==!1),S=p(),b=v?o(C.token):"",E=v?l(C.token):"",T=!!(b&&E);return`
        <article class="public-request-link-card">
          <div>
            <strong>${t(A.name)}</strong>
            <span>${v?"External request link active":C?"Request link disabled":"No request link yet"}</span>
            ${C?.last_used_at?`<span>Last used ${new Date(C.last_used_at).toLocaleString()}</span>`:""}
          </div>
          ${v?`
            <div class="qr-preview">${T?n(b):'<div class="qr-fallback">Set URL</div>'}</div>
            <input class="copy-field" value="${t(E||"Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${T?"":"disabled-link"}" href="${t(E||"#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${t(E)}" type="button" ${T?"":"disabled"}>Copy QR Link</button>
              <a class="secondary-button ${T?"":"disabled-link"}" href="${t(b||"#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${S?`
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${t(C.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${t(C.id)}" type="button">Disable Link</button>
              `:'<span class="muted">Only admins can replace or disable posted QR codes.</span>'}
            </div>
          `:C?`
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${S?`
                <button class="secondary-button request-action-button" data-enable-public-request-link="${t(C.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${t(C.id)}" type="button">Regenerate QR</button>
              `:'<span class="muted">Only admins can reactivate or replace this QR code.</span>'}
            </div>
          `:`
            <button class="secondary-button request-action-button" data-create-public-request-link="${t(A.id)}" type="button" ${m()?"":"disabled"}>Create QR Link</button>
          `}
        </article>
      `}return{loadingQrPage:g,publicRequestQrPage:u,loadingRequestForm:h,publicRequestForm:y,publicRequestError:w,publicRequestSuccess:_,publicRequestLinkManager:P,publicRequestLocationCard:$}}window.MaintainOpsPublicRequestDisplay={createPublicRequestDisplayHelpers:s},typeof gt<"u"&&(gt.exports={createPublicRequestDisplayHelpers:s})})()});(function(s){function e(d){return String(d||"").replace(/\/+$/,"")}function t(d=s.location,p=s.PUBLIC_APP_URL){if(p)return`${e(p)}/`;let f=d?.origin||"",o=d?.pathname||"/",g=o.indexOf("/auth/callback");if(g>=0)return`${f}${o.slice(0,g+1)}`;let u=o.endsWith("/")?o:o.replace(/[^/]*$/,"");return`${f}${u||"/"}`}function n(d=s.location,p=s.PUBLIC_APP_URL){return`${t(d,p)}auth/callback/`}function a(d={},p=s.location,f=s.PUBLIC_APP_URL){let o=new URL(t(p,f));return Object.entries(d).forEach(([l,g])=>{g!=null&&g!==""&&o.searchParams.set(l,g)}),o.href}function i(d){let p=new URL(d),f=new URLSearchParams(p.hash.replace(/^#/,"")),o=p.searchParams;return{code:o.get("code")||"",type:f.get("type")||o.get("type")||"",accessToken:f.get("access_token")||o.get("access_token")||"",refreshToken:f.get("refresh_token")||o.get("refresh_token")||"",error:f.get("error")||o.get("error")||"",errorCode:f.get("error_code")||o.get("error_code")||"",errorDescription:f.get("error_description")||o.get("error_description")||""}}function m(d){return!!(d?.code||d?.accessToken&&d?.refreshToken||d?.error||d?.errorDescription)}function r(d){return d?.type==="recovery"||!d?.type&&!!(d?.accessToken&&d?.refreshToken)}function c(d=s.location){let p=new URL(d.href);return["access_token","code","error","error_code","error_description","expires_at","expires_in","refresh_token","token_type","type","sb"].forEach(f=>p.searchParams.delete(f)),p.hash="",p.href}s.MaintainOpsAuthRedirects={appBaseUrl:t,authCallbackUrl:n,workspaceUrl:a,authParamsFromHref:i,isAuthCallbackParams:m,isPasswordRecoveryParams:r,cleanAuthUrl:c}})(window);(function(){window.MaintainOpsConstants=Object.freeze({STATUS_OPTIONS:Object.freeze(["open","in_progress","blocked","completed"]),TYPE_OPTIONS:Object.freeze(["corrective","preventive","fabrication"]),ASSET_TYPE_OPTIONS:Object.freeze(["machine","forklift","secondary_machine","tooling","component","shop_item"]),WORK_ORDERS_PER_PAGE:12,PARTS_PER_PAGE:12,ASSETS_PER_PAGE:12,LIST_ITEMS_PER_PAGE:12,SEARCH_ID_PAGE_SIZE:1e3,SEARCH_ID_CHUNK_SIZE:100,SEARCH_PREVIEW_LIMIT:6,OUTSIDE_VENDOR_VALUE:"__outside_vendor__",OUTSIDE_VENDOR_NOTE:"[Assignment: Outside vendor]",COMPANY_ROLES:Object.freeze(["technician","accounting","manager","admin"]),ACTIVE_LOCATION_STORAGE_KEY:"maintainops.activeLocationId"})})();(function(){function s(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}window.MaintainOpsDom=Object.freeze({escapeHtml:s})})();(function(){function s(v){return String(v||"").trim().replace(/[,%()]/g," ").replace(/\s+/g," ").slice(0,80)}function e(v){return v.toISOString().slice(0,10)}function t(v){return v.toISOString()}function n(v){let S=new Date;return S.setDate(S.getDate()-v),S}function a(){let v=new Date;return new Date(v.getFullYear(),v.getMonth(),1)}function i(v=new Date){let S=new Date(v);S.setHours(0,0,0,0),S.setDate(S.getDate()-S.getDay());let b=new Date(S);return b.setDate(b.getDate()+7),{start:S,end:b}}function m(v,S){let b=[];for(let E=0;E<v.length;E+=S)b.push(v.slice(E,E+S));return b}function r(v){return c(v).replace(/\.[^/.]+$/,"")||"photo"}function c(v){return String(v||"photo").replace(/[^a-z0-9._-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,80)||"photo"}function d(v){return v==="active"||v==="all"?"Active":v==="overdue"?"Overdue":v==="completed"?"All Completed":v==="completed_month"?"Completed Month":v==="completed_week"?"Done This Week":v==="open"?"New":String(v||"").replaceAll("_"," ").replace(/\b\w/g,S=>S.toUpperCase())}function p(v){let S=String(v||"corrective").trim().toLowerCase();return S==="inspection"?"preventive":S==="reactive"||S==="request"?"corrective":["corrective","preventive","fabrication"].includes(S)?S:"corrective"}function f(v){return{corrective:"Corrective",preventive:"Preventive",fabrication:"Fabrication"}[p(v)]}function o(v){let S=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","accounting","manager","admin"],b=String(v||"technician").trim().toLowerCase();return b==="member"?"technician":S.includes(b)?b:"technician"}function l(v){return{admin:"Admin",manager:"Manager",accounting:"Accounting",technician:"Technician"}[o(v)]||"Technician"}function g(v){let S={admin:"Full company setup, team, and work access.",manager:"Can manage work, settings, and teammates.",accounting:"Can review equipment financial records without changing operations.",technician:"Can create work, convert requests, and claim unassigned work."};return S[o(v)]||S.technician}function u(v){return new Date(`${v}T00:00:00`).toLocaleDateString()}function h(v){let S=[new Date(v.created_at).toLocaleString()];return v.file_size_bytes&&S.push(w(v.file_size_bytes)),v.original_size_bytes&&v.file_size_bytes&&v.original_size_bytes!==v.file_size_bytes&&S.push(`optimized from ${w(v.original_size_bytes)}`),S.join(" - ")}function y(v){let S=[];return(v.photo_uploaded_at||v.updated_at||v.created_at)&&S.push(new Date(v.photo_uploaded_at||v.updated_at||v.created_at).toLocaleString()),v.photo_file_size_bytes&&S.push(w(v.photo_file_size_bytes)),v.photo_original_size_bytes&&v.photo_file_size_bytes&&v.photo_original_size_bytes!==v.photo_file_size_bytes&&S.push(`optimized from ${w(v.photo_original_size_bytes)}`),S.join(" - ")||"Photo attached"}function w(v){let S=Number(v)||0;return S?S<1024?`${S} B`:S<1048576?`${Math.round(S/1024)} KB`:`${(S/1048576).toFixed(S>=10485760?0:1)} MB`:""}function _(v){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(Number(v)||0)}function P(v){return Number(v.unit_cost_at_use??v.parts?.unit_cost??0)||0}function $(v){if(!v.due_at||v.status==="completed")return null;let S=new Date;S.setHours(0,0,0,0);let b=new Date(`${v.due_at}T00:00:00`),E=Math.round((b-S)/864e5);return E<0?{label:"overdue",className:"overdue"}:E===0?{label:"due today",className:"due_today"}:null}function A(){let v=new Date;return v.setHours(0,0,0,0),v}function C(v){return`"${String(v??"").replaceAll('"','""')}"`}window.MaintainOpsFormatting=Object.freeze({postgrestSearchTerm:s,isoDate:e,isoDateTime:t,daysAgoDate:n,monthStartDate:a,sundayWeekRange:i,chunkArray:m,fileBaseName:r,safeFileName:c,statusLabel:d,normalizeWorkOrderType:p,workOrderTypeLabel:f,normalizeRole:o,roleLabel:l,roleDescription:g,formatDate:u,photoMetaText:h,requestPhotoMetaText:y,formatBytes:w,money:_,partUsageUnitCost:P,getDueState:$,startOfToday:A,csvCell:C})})();(function(){function s(i,m){let r=i?.message||"";return m.some(c=>r.includes(c))}function e(i,m){let r=i?.message||"";return r.includes(m)&&(r.includes("column")||r.includes("schema cache"))}function t(i){let m=i?.message||"";return m.includes("work_order_comments_company_author_profile_fkey")||m.includes("profiles")}function n(i){let m=i?.message||"";return!!(m.includes("procedure_template_id")||m.includes("procedure_templates")||m.includes("procedure_steps"))}function a(i){return s(i,["parent_asset_id","asset_type","safety_devices_required","safety_check_required"])}window.MaintainOpsSchemaErrors={isColumnSchemaError:s,isMissingColumnError:e,isProfileMissingError:t,isProcedureSchemaError:n,isAssetHierarchySchemaError:a}})();(function(){function s(e,t){return{...e,error:{...e.error||{},message:t,originalMessage:e.error?.message||""}}}window.MaintainOpsOperationResults={withSetupError:s}})();(function(){function s(e,t,n=2e4){let a,i=new Promise((m,r)=>{a=setTimeout(()=>r(new Error(t)),n)});return Promise.race([e,i]).finally(()=>clearTimeout(a))}window.MaintainOpsOperationTimeout={withOperationTimeout:s}})();var $r=j(yt()),Pr=j(bt());(function(){function s(e={}){let t=e.windowRef||window,n=e.getPublicAppUrlOverride||(()=>"");function a(f){return m(`?request=${encodeURIComponent(f)}`)}function i(f){return m(`?qr=${encodeURIComponent(f)}`)}function m(f){let o=r();if(!o)return"";let l=new URL(o);return l.search=f,l.hash="",l.toString()}function r(){let o=n()||String(t.PUBLIC_APP_URL||"").trim()||(t.location.protocol==="https:"?t.location.href:"");return o?c(o):""}function c(f){try{let o=new URL(String(f||"").trim(),t.location.href);return o.protocol!=="https:"||!d(o.hostname)?"":(o.search="",o.hash="",o.pathname&&o.pathname!=="/"&&!o.pathname.endsWith("/")&&!o.pathname.endsWith(".html")&&(o.pathname=`${o.pathname}/`),o.toString())}catch{return""}}function d(f){let o=String(f||"").toLowerCase();return!(!o||o==="localhost"||o.endsWith(".localhost")||o==="127.0.0.1"||o==="::1"||o==="[::1]"||/^10\./.test(o)||/^192\.168\./.test(o)||/^172\.(1[6-9]|2\d|3[0-1])\./.test(o))}function p(f,o=4){if(!t.qrcode||!f)return'<div class="qr-fallback">QR</div>';try{let l=t.qrcode(0,"M");return l.addData(f),l.make(),l.createSvgTag(o,0).replace("<svg",'<svg class="qr-code"')}catch{return'<div class="qr-fallback">QR</div>'}}return{publicRequestUrl:a,publicRequestQrUrl:i,publicAppUrlWithSearch:m,publicAppBaseUrl:r,normalizePublicAppUrl:c,isPublicAppHost:d,qrSvgFor:p}}window.MaintainOpsPublicUrlQr={createPublicUrlQrHelpers:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.printRef||(()=>window.print()),a=t.querySelector("#print-public-qr");!a||typeof n!="function"||a.addEventListener("click",()=>n())}window.MaintainOpsPublicQrPrintEvents={bindPublicQrPrintEvents:s}})();(function(){function s(e,t){let n=new Date(`${e}T00:00:00`);return t==="weekly"&&n.setDate(n.getDate()+7),t==="monthly"&&n.setMonth(n.getMonth()+1),t==="quarterly"&&n.setMonth(n.getMonth()+3),n.toISOString().slice(0,10)}window.MaintainOpsMaintenanceScheduleDates={nextDueDate:s}})();var Er=j(wt());(function(){function s(e){function t(d){return e[d]()}function n(d,p){return typeof e[d]=="function"?e[d]():p}function a(d){let p=t("searchQuery"),f=t("activeSection"),o=t("activeStatusFilter"),l=!!p.trim();return c(i(d,{statusFilter:l?"__any__":f==="work"&&o==="requests"?"__none__":o,section:f,includeQueue:!l,includeSearch:!0}))}function i(d,p={}){let f=p.section||t("activeSection"),o=d.eq("company_id",t("activeCompanyId"));if(t("locationsReady")&&t("activeLocationId")&&(o=o.eq("location_id",t("activeLocationId"))),p.includeQueue!==!1&&(o=m(o,f)),p.includeAttributeFilters!==!1&&f==="work"){let l=n("workOrderTypeFilter","all"),g=n("workOrderPriorityFilter","all");l!=="all"&&(o=o.eq("type",l)),g!=="all"&&(o=o.eq("priority",g))}if(o=r(o,p.statusFilter||t("activeStatusFilter")),p.includeSearch!==!1){let l=e.postgrestSearchTerm(t("searchQuery"));if(l){let g=t("workOrderRelatedSearch"),u=[`title.ilike.%${l}%`,`description.ilike.%${l}%`,`priority.ilike.%${l}%`,`type.ilike.%${l}%`,`status.ilike.%${l}%`,...g.assetIds.length?[`asset_id.in.(${g.assetIds.join(",")})`]:[],...g.procedureIds.length?[`procedure_template_id.in.(${g.procedureIds.join(",")})`]:[],...g.workOrderIds.length?[`id.in.(${g.workOrderIds.join(",")})`]:[]];o=o.or(u.join(","))}}return o}function m(d,p){return p==="mywork"?t("myWorkFilter")==="created"?d.eq("created_by",t("session").user.id):d.eq("assigned_to",t("session").user.id):p!=="work"?d:t("workOrderAssigneeFilter")?d.eq("assigned_to",t("workOrderAssigneeFilter")):t("workOrderFilter")==="assigned"?d.not("assigned_to","is",null):t("workOrderFilter")==="vendor"?d.ilike("description",`%${e.OUTSIDE_VENDOR_NOTE}%`):t("workOrderFilter")==="unassigned"?d.is("assigned_to",null).not("description","ilike",`%${e.OUTSIDE_VENDOR_NOTE}%`):d}function r(d,p){let f=e.isoDate(e.startOfToday());if(p==="__any__")return d;if(p==="__none__")return d.eq("id","00000000-0000-0000-0000-000000000000");if(p==="overdue")return d.neq("status","completed").lt("due_at",f);if(p==="completed_month")return d.gte("completed_at",e.isoDateTime(e.monthStartDate()));if(p==="completed_week"){let o=e.sundayWeekRange();return d.gte("completed_at",e.isoDateTime(o.start)).lt("completed_at",e.isoDateTime(o.end))}return p==="active"||p==="all"?d.neq("status","completed"):d.eq("status",p)}function c(d){return["completed","completed_month","completed_week"].includes(t("activeStatusFilter"))?d.order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}):t("workSort")==="due"?d.order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):t("workSort")==="priority"?d.order("priority_rank",{ascending:!1}).order("due_at",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):t("workSort")==="type"?d.order("type",{ascending:!0}).order("created_at",{ascending:!1}):t("workSort")==="assigned"?d.order("assigned_to",{ascending:!0,nullsFirst:!1}).order("created_at",{ascending:!1}):d.order("created_at",{ascending:!1})}return{applyWorkOrderListFilters:a,applyWorkOrderFilters:i,applyWorkOrderQueueFilters:m,applyWorkOrderStatusFilter:r,applyWorkOrderSort:c}}window.MaintainOpsWorkOrderQueryFilters={createWorkOrderQueryFilterHelpers:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.setTimeoutFn||setTimeout;t.querySelectorAll("[data-jump-work-section]").forEach(a=>{a.addEventListener("click",()=>{let i=t.querySelector(`#${a.dataset.jumpWorkSection}`);if(!i)return;let m=i.closest("details");m&&(m.open=!0),i.scrollIntoView({behavior:"smooth",block:"center"});let r=i;r.classList.add("jump-highlight","field-jump-highlight"),n(()=>r.classList.remove("jump-highlight"),1400),n(()=>r.classList.remove("field-jump-highlight"),1400)})})}window.MaintainOpsWorkSectionJumpEvents={bindWorkSectionJumpEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.storage||localStorage,a=e.state,i=e.renderWorkspace,m=e.setWorkOrderSearchMode;if(!a||!i||!m)return;let r=()=>{a.setSearchQuery(""),m(!1),n.setItem("maintainops.searchQuery","")},c=d=>{a.setActiveSection(d),n.setItem("maintainops.activeSection",d)};t.querySelectorAll("[data-search-work-order]").forEach(d=>{d.addEventListener("click",()=>{a.setActiveWorkOrderId(d.dataset.searchWorkOrder),a.setActiveAssetId(null),a.setActivePartId(null),c("work"),r(),i()})}),t.querySelectorAll("[data-search-asset]").forEach(d=>{d.addEventListener("click",()=>{a.setActiveAssetId(d.dataset.searchAsset),a.setActiveWorkOrderId(null),a.setActivePartId(null),c("assets"),r(),i()})}),t.querySelectorAll("[data-search-part]").forEach(d=>{d.addEventListener("click",()=>{a.setActivePartId(d.dataset.searchPart),a.setActiveAssetId(null),a.setActiveWorkOrderId(null),c("parts"),r(),i()})}),t.querySelectorAll("[data-search-request]").forEach(d=>{d.addEventListener("click",()=>{c("requests"),r(),i()})}),t.querySelectorAll("[data-search-section]").forEach(d=>{d.addEventListener("click",()=>{c(d.dataset.searchSection),r(),i()})})}window.MaintainOpsGlobalSearchNavigationEvents={bindGlobalSearchNavigationEvents:s}})();(function(){let s=null,e=0,t=Promise.resolve();function n(a={}){let i=a.documentRef||document,m=a.storage||localStorage,r=a.state,c=a.windowRef||(typeof window<"u"?window:null),d=a.setTimeoutRef||setTimeout,p=a.clearTimeoutRef||clearTimeout,f=Number.isFinite(a.searchDelayMs)?a.searchDelayMs:300;if(!r)return;let o=()=>{e+=1,s!==null&&(p(s),s=null)},l=u=>{u&&typeof c?.scrollTo=="function"&&c.scrollTo(u.x,u.y)},g=(u,h,y,w)=>{let _=i.getElementById?i.getElementById(u):i.querySelector(`#${u}`);if(!_)return;let P=_.value.length,$=Math.min(h??P,P),A=Math.min(y??$,P);_.focus({preventScroll:!0}),_.setSelectionRange($,A),l(w)};i.querySelectorAll(".workspace-search-input").forEach(u=>{u.addEventListener("input",()=>{let h=u.id,y=u.selectionStart,w=u.selectionEnd;o();let _=e;r.setSearchQuery(u.value),a.invalidateExactWorkOrderSearchCache(),r.getSearchQuery().trim()||a.setWorkOrderSearchMode(!1),r.getSearchQuery().trim()&&(r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setQuickFixMode(!1),r.setCreateWorkOrderMode(!1),r.setQuickFixAssetId(null),r.setQuickFixRequestId(null)),m.setItem("maintainops.searchQuery",r.getSearchQuery()),a.resetWorkOrderPage(),a.resetPartsPage(),a.resetRequestsPage(),s=d(()=>(s=null,t=t.catch(()=>null).then(async()=>{if(_!==e||(await Promise.all([a.reloadWorkOrderQueue({render:!1}),a.reloadRequestQueue({render:!1})]),_!==e))return;let P=c?{x:Number(c.scrollX||c.pageXOffset||0),y:Number(c.scrollY||c.pageYOffset||0)}:null,$=i.getElementById?i.getElementById(h):i.querySelector(`#${h}`),A=!("activeElement"in i)||i.activeElement===$;a.renderWorkspace(),A?g(h,y,w,P):l(P)}),t),f)})}),i.querySelectorAll("[data-view-work-search]").forEach(u=>{u.addEventListener("click",async()=>{o(),r.setActiveSection("work"),r.setActiveWorkOrderId(null),r.setActiveAssetId(null),r.setActivePartId(null),r.setCreateWorkOrderMode(!1),r.setQuickFixMode(!1),a.setWorkOrderSearchMode(!0),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),m.setItem("maintainops.activeSection",r.getActiveSection()),await a.reloadWorkOrderQueue()})}),i.querySelectorAll("[data-close-work-search]").forEach(u=>{u.addEventListener("click",async()=>{o(),a.setWorkOrderSearchMode(!1),a.invalidateExactWorkOrderSearchCache(),a.resetWorkOrderPage(),await a.reloadWorkOrderQueue()})})}window.MaintainOpsWorkspaceSearchEvents={bindWorkspaceSearchEvents:n}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!n)return;function i(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}async function m(r){let c=Number(a?.scrollY??a?.pageYOffset??0);if(await r(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>i(c));return}i(c)}}t.querySelectorAll("[data-status-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setActiveStatusFilter(r.dataset.statusFilter),e.resetWorkOrderPage(),n.getActiveStatusFilter()==="requests"&&e.resetRequestsPage(),await e.reloadWorkOrderQueue(),n.getActiveStatusFilter()==="requests"&&await e.reloadRequestQueue()})})}),t.querySelectorAll("[data-my-work-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setMyWorkFilter(r.dataset.myWorkFilter),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-order-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setWorkOrderFilter(r.dataset.workOrderFilter),n.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-status-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{n.setActiveStatusFilter(r.value||"active"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-assignment-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{let c=r.value||"all";n.setWorkOrderFilter(c),c!=="assigned"&&n.setWorkOrderAssigneeFilter(""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-assignee-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{let c=r.value||"";n.setWorkOrderAssigneeFilter(c),c&&n.setWorkOrderFilter("assigned"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-type-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{n.setWorkOrderTypeFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-priority-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{n.setWorkOrderPriorityFilter(r.value||"all"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-clear-assignee-filter]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setWorkOrderAssigneeFilter(""),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-sort]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setWorkSort(r.dataset.workSort),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{n.setWorkSort(r.value||"newest"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-group-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{n.setWorkGroup(r.value||"none"),e.renderWorkspace()})})}),t.querySelectorAll("[data-clear-work-filters]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setActiveStatusFilter("active"),n.setWorkOrderFilter("all"),n.setWorkOrderAssigneeFilter(""),n.setWorkOrderTypeFilter("all"),n.setWorkOrderPriorityFilter("all"),n.setWorkSort("newest"),n.setWorkGroup("none"),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-work-assignee-sort-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{n.setWorkOrderAssigneeFilter(r.value||""),e.invalidateExactWorkOrderSearchCache(),e.resetWorkOrderPage(),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-request-filter]").forEach(r=>{r.addEventListener("click",async()=>{r.disabled||await m(async()=>{n.setRequestViewFilter(r.dataset.requestFilter||"active"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}),t.querySelectorAll("[data-work-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setWorkOrderPage(n.getWorkOrderPage()+(r.dataset.workPage==="next"?1:-1)),await e.reloadWorkOrderQueue()})})}),t.querySelectorAll("[data-parts-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setPartsPage(n.getPartsPage()+(r.dataset.partsPage==="next"?1:-1)),e.renderWorkspace()})})}),t.querySelectorAll("[data-assets-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setAssetsPage(n.getAssetsPage()+(r.dataset.assetsPage==="next"?1:-1)),e.renderWorkspace()})})}),t.querySelectorAll("[data-financial-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{n.setFinancialPage(n.getFinancialPage()+(r.dataset.financialPage==="next"?1:-1)),e.renderWorkspace()})})}),t.querySelectorAll("[data-financial-filter]").forEach(r=>{r.addEventListener("change",async()=>{await m(async()=>{r.dataset.financialFilter==="missing"&&n.setFinancialMissingFilter(r.value),r.dataset.financialFilter==="location"&&n.setFinancialLocationFilter(r.value),r.dataset.financialFilter==="type"&&n.setFinancialTypeFilter(r.value),r.dataset.financialFilter==="area"&&n.setFinancialAreaFilter(r.value),n.resetFinancialPage(),e.renderWorkspace()})})}),t.querySelectorAll("[data-list-page]").forEach(r=>{r.addEventListener("click",async()=>{await m(async()=>{let c=r.dataset.pageDirection==="next"?1:-1;if(r.dataset.listPage==="requests"){n.setRequestsPage(n.getRequestsPage()+c),await e.reloadRequestQueue();return}if(r.dataset.listPage==="schedules"&&n.setSchedulesPage(n.getSchedulesPage()+c),r.dataset.listPage==="procedures"&&n.setProceduresPage(n.getProceduresPage()+c),r.dataset.listPage==="members"&&n.setMembersPage(n.getMembersPage()+c),r.dataset.listPage==="messages"&&n.setMessageThreadsPage(n.getMessageThreadsPage()+c),r.dataset.listPage?.startsWith("planning-")){let d=r.dataset.listPage.replace("planning-","");n.setPlanningPage(d,n.getPlanningPage(d)+c)}e.renderWorkspace()})})}),t.querySelectorAll("[data-planning-group]").forEach(r=>{r.addEventListener("toggle",()=>{typeof n.setPlanningGroupOpen=="function"&&n.setPlanningGroupOpen(r.dataset.planningGroup,!!r.open)})})}window.MaintainOpsWorkspaceFilterPaginationEvents={bindWorkspaceFilterPaginationEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.storage||localStorage,a=e.state,i=e.windowRef||(typeof window<"u"?window:null),m=typeof e.scrollToDetailTop=="function"?e.scrollToDetailTop:()=>{};if(!a)return;let r=()=>{a.setCreateWorkOrderMode(!1),a.setQuickFixMode(!1),a.setQuickFixAssetId(null),a.setQuickFixRequestId(null)};async function c(y){typeof e.loadAssetWorkOrderHistory=="function"&&await e.loadAssetWorkOrderHistory(y)}async function d(y){typeof e.loadAssetEventsForAssetIds=="function"&&await e.loadAssetEventsForAssetIds([y])}function p(y){return y==="open-work"||y==="completed-history"||y==="parts-used"}function f(){e.renderWorkspace()}function o(){typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(null)}function l(){let y=t.querySelector("#work-order-photos-target");y&&("open"in y&&(y.open=!0),typeof y.scrollIntoView=="function"&&y.scrollIntoView({behavior:"smooth",block:"start"}))}function g(){if(i&&typeof i.requestAnimationFrame=="function"){i.requestAnimationFrame(l);return}l()}let u=t.querySelector("#back-to-my-work");u&&u.addEventListener("click",()=>{a.setActiveWorkOrderId(null),a.setActiveAssetId(null),o(),r(),e.renderWorkspace()});let h=t.querySelector("#back-to-equipment");h&&h.addEventListener("click",()=>{a.setActiveAssetId(null),o(),a.setPendingDeleteAssetId(null),e.renderWorkspace()}),t.querySelectorAll(".work-card").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.id),a.setActiveAssetId(null),o(),r(),e.renderWorkspace()})}),t.querySelectorAll("[data-work-photo-jump]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation(),a.setActiveWorkOrderId(y.dataset.workPhotoJump),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),n.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),g()})}),t.querySelectorAll("[data-open-asset]").forEach(y=>{y.addEventListener("click",w=>{w.stopPropagation(),a.setActiveAssetId(y.dataset.openAsset),a.setActiveWorkOrderId(null),o(),r(),a.getActiveSection()!=="assets"&&a.setActiveSection("work"),n.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),t.querySelectorAll("[data-asset-id]").forEach(y=>{let w=()=>{a.setActiveAssetId(y.dataset.assetId),a.setActiveWorkOrderId(null),a.setActivePartId(null),o(),r(),a.setReportIssueMode(!1),a.setActiveSection("assets"),n.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()};y.addEventListener("click",w),y.addEventListener("keydown",_=>{_.key!=="Enter"&&_.key!==" "||(_.preventDefault(),w())})}),t.querySelectorAll("[data-mini-work-order]").forEach(y=>{y.addEventListener("click",()=>{a.setActiveWorkOrderId(y.dataset.miniWorkOrder),a.setActiveAssetId(null),o(),a.setActiveSection("work"),r(),n.setItem("maintainops.activeSection",a.getActiveSection()),e.renderWorkspace(),m()})}),t.querySelectorAll("[data-asset-relationship-section]").forEach(y=>{y.addEventListener("toggle",async()=>{let w=y.dataset.assetId,_=y.dataset.assetRelationshipSection;!w||!_||(typeof e.setAssetRelationshipOpen=="function"&&e.setAssetRelationshipOpen(w,_,y.open),y.open&&p(_)&&await c(w),y.open&&_==="asset-history"&&await d(w),f())})}),t.querySelectorAll("[data-asset-relation-page]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let _=y.dataset.assetId,P=y.dataset.assetRelationSection,A=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(_,P):1)+(y.dataset.assetRelationPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(_,P,A),f()})}),t.querySelectorAll("[data-open-asset-history]").forEach(y=>{y.addEventListener("click",async w=>{w.preventDefault(),w.stopPropagation();let _=y.dataset.openAssetHistory;_&&(a.setActiveAssetId(_),a.setActiveWorkOrderId(null),r(),typeof e.setActiveAssetHistoryId=="function"&&e.setActiveAssetHistoryId(_),await d(_),e.renderWorkspace(),m())})}),t.querySelectorAll("[data-back-asset-history]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let _=y.dataset.backAssetHistory;_&&a.setActiveAssetId(_),o(),e.renderWorkspace(),m()})}),t.querySelectorAll("[data-asset-history-page]").forEach(y=>{y.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();let _=y.dataset.assetId,$=(typeof e.getAssetRelationshipPage=="function"?e.getAssetRelationshipPage(_,"asset-history"):1)+(y.dataset.assetHistoryPage==="next"?1:-1);typeof e.setAssetRelationshipPage=="function"&&e.setAssetRelationshipPage(_,"asset-history",$),e.renderWorkspace(),m()})})}window.MaintainOpsWorkspaceDetailNavigationEvents={bindWorkspaceDetailNavigationEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=e.windowRef||(typeof window<"u"?window:null);if(!n)return;function i(r){!a||typeof a.scrollTo!="function"||a.scrollTo({top:r,behavior:"auto"})}function m(){let r=Number(a?.scrollY??a?.pageYOffset??0);if(e.renderWorkspace(),!(!a||typeof a.scrollTo!="function")){if(typeof a.requestAnimationFrame=="function"){a.requestAnimationFrame(()=>i(r));return}i(r)}}t.querySelectorAll("[data-part-inventory-filter]").forEach(r=>{r.addEventListener("click",()=>{n.setPartInventoryFilter(r.dataset.partInventoryFilter),e.resetPartsPage(),m()})}),t.querySelectorAll("[data-part-sort]").forEach(r=>{r.addEventListener("change",()=>{n.setPartSort&&(n.setPartSort(r.value||"default"),e.resetPartsPage(),m())})}),t.querySelectorAll("[data-asset-status-filter]").forEach(r=>{r.addEventListener("click",()=>{let c=n.getAssetStatusFilter()===r.dataset.assetStatusFilter?"all":r.dataset.assetStatusFilter;n.setAssetStatusFilter(c),n.setAssetTypeFilter&&n.setAssetTypeFilter("all"),e.resetAssetsPage(),m()})}),t.querySelectorAll("[data-asset-type-filter]").forEach(r=>{r.addEventListener("click",()=>{if(!n.getAssetTypeFilter||!n.setAssetTypeFilter)return;let c=n.getAssetTypeFilter()===r.dataset.assetTypeFilter?"all":r.dataset.assetTypeFilter;n.setAssetTypeFilter(c),n.setAssetStatusFilter&&n.setAssetStatusFilter("all"),e.resetAssetsPage(),m()})}),t.querySelectorAll("[data-asset-area-filter]").forEach(r=>{r.addEventListener("change",()=>{n.setAssetAreaFilter&&(n.setAssetAreaFilter(r.value||"all"),e.resetAssetsPage(),m())})})}window.MaintainOpsWorkspaceInventoryFilterEvents={bindWorkspaceInventoryFilterEvents:s}})();(function(){function s(e={}){(e.documentRef||document).querySelectorAll("[data-quick-status]").forEach(n=>{n.addEventListener("click",async a=>{a.stopPropagation();let i=n.textContent;n.disabled=!0,n.textContent="Saving...";try{!await e.setWorkOrderStatus(n.dataset.id,n.dataset.quickStatus)&&n.isConnected&&(n.disabled=!1,n.textContent=i)}catch(m){e.showNotice(`Could not update status: ${m.message||m}`,"warning"),n.isConnected&&(n.disabled=!1,n.textContent=i)}n.isConnected&&(n.disabled=!1,n.textContent=i)})})}window.MaintainOpsWorkspaceWorkOrderStatusEvents={bindWorkspaceWorkOrderStatusEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document;t.querySelectorAll("[data-assign-me]").forEach(n=>{n.addEventListener("click",async a=>{a.stopPropagation(),await e.assignWorkOrderToMe(n.dataset.assignMe)})}),t.querySelectorAll("[data-card-assign]").forEach(n=>{n.addEventListener("submit",e.assignWorkOrderFromCard),n.addEventListener("click",a=>a.stopPropagation()),n.addEventListener("change",a=>{a.stopPropagation(),a.target?.name==="assigned_to"&&n.requestSubmit()})})}window.MaintainOpsWorkspaceWorkOrderAssignmentEvents={bindWorkspaceWorkOrderAssignmentEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.resetDelayMs||1600,a=e.setTimeoutRef||setTimeout;t.querySelectorAll("[data-copy-downtime]").forEach(i=>{i.addEventListener("click",async()=>{let m=e.getWorkOrderById(i.dataset.id);if(!m)return;let r=i.dataset.copyDowntime==="subject",c=r?e.downtimeEmailSubject(m):e.downtimeEmailBody(m),d=await e.copyTextToClipboard(c);i.textContent=d?"Copied":"Copy failed",a(()=>{i.textContent=r?"Copy Subject":"Copy Email Body"},n)})})}window.MaintainOpsWorkspaceWorkOrderDowntimeEvents={bindWorkspaceWorkOrderDowntimeEvents:s}})();(function(){function s(e={}){let n=(e.documentRef||document).querySelector("#status-select");n&&n.addEventListener("change",e.updateWorkOrderStatus)}window.MaintainOpsWorkspaceWorkOrderDetailStatusEvents={bindWorkspaceWorkOrderDetailStatusEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.FormDataRef||FormData;function a(c){return e.getActiveWorkOrderId()!==c?!1:Array.from(t.querySelectorAll('#complete-work-order-form input[name="safety_devices_checked"], #quick-update-work-order-form input[name="safety_devices_checked"]')).some(d=>d.checked)}function i(c){t.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.checked=c.target.checked})}async function m(c){c.preventDefault();let d=c.target,p=d.querySelector("button[type='submit']"),f=t.querySelector("#completion-error"),o=e.getActiveWorkOrderId(),l=e.getWorkOrderById(o),g=e.getProcedureById(l?.procedure_template_id),u=g?e.requiredChecklistProgress(l,g):{done:0,total:0};if(u.done<u.total){f&&(f.textContent=`Complete required checklist steps first (${u.done}/${u.total}).`);return}let h=new n(d),y=h.get("safety_devices_checked")==="on"||a(o)||e.hasCompletedSafetyDeviceCheck(l);if(e.requiresSafetyDeviceCheck(l)&&!y){f&&(f.textContent="Check safety devices before completing equipment work.");return}p.disabled=!0,p.textContent="Completing...",f&&(f.textContent="");try{let w={status:"completed",asset_id:l?.asset_id||null,actual_minutes:Number(h.get("actual_minutes"))||0,failure_cause:h.get("failure_cause")||null,resolution_summary:h.get("resolution_summary")||null,follow_up_needed:h.get("follow_up_needed")==="on",completion_notes:h.get("completion_notes")||null,completed_at:new Date().toISOString()};e.applySafetyRequirementPayload(w),e.applySafetyCheckPayload(w,w.safety_check_required&&y),delete w.asset_id;let{error:_}=await e.withOperationTimeout(e.updateWorkOrderSafely(w,o),"Complete work save timed out. Check your connection and try again.",2e4);if(_){f&&(f.textContent=`Could not complete work order: ${e.friendlyWorkOrderSaveError(_)}`);return}let P=await e.withOperationTimeout(e.recordWorkOrderEvent(o,"completed",h.get("resolution_summary")||h.get("completion_notes")||"Work order completed."),"Activity log timed out.",8e3).catch($=>$);e.setWorkOrderActionWarning("",""),e.showNotice(P?`Work order completed, but history did not update: ${P.message}`:"Work order completed.",P?"warning":"success"),await e.render()}catch(w){f?f.textContent=`Could not complete work order: ${w.message||w}`:e.alertRef(w.message||w)}finally{p.disabled=!1,p.textContent="Complete Work Order"}}function r(){let c=t.querySelector("#complete-work-order-form");c&&c.addEventListener("submit",m),t.querySelectorAll('input[name="safety_devices_checked"]').forEach(d=>{d.addEventListener("change",i)})}return{bindWorkspaceWorkOrderCompletionEvents:r,completeWorkOrder:m,currentSafetyCheckboxCheckedForWorkOrder:a,syncSafetyDeviceChecks:i}}window.MaintainOpsWorkspaceWorkOrderCompletionEvents={createWorkspaceWorkOrderCompletionEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document;function n(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}e.setPendingDeleteWorkOrderId(m),e.renderWorkspace()}async function a(m){if(!e.canDeleteWorkOrders()){e.alertRef("Only company admins can delete work orders.");return}try{let r=e.getPhotoPathsByWorkOrder(m);if(r.length){let d=await e.withOperationTimeout(e.removeWorkOrderPhotoStorage(r),"Work order photo cleanup timed out.",15e3);d.error&&e.warnRef("Work order photo storage cleanup failed",d.error)}let{error:c}=await e.withOperationTimeout(e.deleteWorkOrderRecord(m),"Work order delete timed out. Check your connection and try again.",15e3);if(c){e.alertRef(`Could not delete work order: ${e.friendlyWorkOrderSaveError(c)}`);return}e.setActiveWorkOrderId(null),e.setActiveAssetId(null),e.setPendingDeleteWorkOrderId(null),e.showNotice("Work order deleted."),await e.render()}catch(r){e.alertRef(`Could not delete work order: ${r.message||r}`)}}function i(){t.querySelectorAll("[data-delete-work-order]").forEach(m=>{m.addEventListener("click",r=>{r.stopPropagation(),n(m.dataset.deleteWorkOrder)})}),t.querySelectorAll("[data-cancel-delete-work-order]").forEach(m=>{m.addEventListener("click",r=>{r.stopPropagation(),e.setPendingDeleteWorkOrderId(null),e.renderWorkspace()})}),t.querySelectorAll("[data-confirm-delete-work-order]").forEach(m=>{m.addEventListener("click",async r=>{r.stopPropagation(),await a(m.dataset.confirmDeleteWorkOrder)})})}return{bindWorkspaceWorkOrderDeleteEvents:i,deleteWorkOrder:a,requestDeleteWorkOrder:n}}window.MaintainOpsWorkspaceWorkOrderDeleteEvents={createWorkspaceWorkOrderDeleteEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;n&&t.querySelectorAll("[data-view-member-work]").forEach(a=>{a.addEventListener("click",()=>{n.setWorkOrderAssigneeFilter(a.dataset.viewMemberWork),n.setActiveSection("work"),n.setActiveStatusFilter("active"),n.setActiveWorkOrderId(null),n.setActiveAssetId(null),n.setCreateWorkOrderMode(!1),n.setQuickFixMode(!1),e.resetWorkOrderPage(),e.renderWorkspace()})})}window.MaintainOpsWorkspaceTeamWorkViewEvents={bindWorkspaceTeamWorkViewEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=e.renderWorkspace;!n||typeof a!="function"||(t.querySelectorAll("[data-open-part]").forEach(i=>{i.addEventListener("click",()=>{n.setActivePartId(i.dataset.openPart),a()}),i.addEventListener("keydown",m=>{m.key!=="Enter"&&m.key!==" "||(m.preventDefault(),n.setActivePartId(i.dataset.openPart),a())})}),t.querySelectorAll("[data-close-part-detail]").forEach(i=>{i.addEventListener("click",()=>{n.setActivePartId(null),n.setShowPartSourceManager(!1),a()})}),t.querySelectorAll("[data-toggle-part-sources]").forEach(i=>{i.addEventListener("click",()=>{n.setShowPartSourceManager(!n.getShowPartSourceManager()),a()})}))}window.MaintainOpsWorkspacePartDetailEvents={bindWorkspacePartDetailEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=e.renderWorkspace,i=e.messageComposerScopeNote,m=e.autoGrowTextarea;if(!n||typeof a!="function")return;let r=e.storage||localStorage;t.querySelectorAll("[data-message-filter]").forEach(f=>{f.addEventListener("click",()=>{let o=f.dataset.messageFilter;n.setMessageThreadFilter(o),typeof n.resetMessageThreadsPage=="function"&&n.resetMessageThreadsPage(),r.setItem("maintainops.messageThreadFilter",o),r.setItem("maintainops.messageThreadsPage","1"),a()})}),t.querySelectorAll("[data-open-linked-work-order]").forEach(f=>{f.addEventListener("click",()=>{n.setActiveWorkOrderId(f.dataset.openLinkedWorkOrder),n.setActiveAssetId(null),n.setActivePartId(null),n.setQuickFixMode(!1),n.setCreateWorkOrderMode(!1),n.setActiveSection("work"),r.setItem("maintainops.activeSection","work"),a()})});let c=t.querySelector("[data-clear-message-work-link]");c&&c.addEventListener("click",()=>{n.setMessageComposerWorkOrderId(""),r.setItem("maintainops.messageComposerWorkOrderId",""),a()});let d=t.querySelector("#message-search");d&&d.addEventListener("input",()=>{let f=d.value;n.setMessageSearchQuery(f),typeof n.resetMessageThreadsPage=="function"&&n.resetMessageThreadsPage(),r.setItem("maintainops.messageSearchQuery",f),r.setItem("maintainops.messageThreadsPage","1"),a();let o=t.querySelector("#message-search");o&&(o.focus(),o.setSelectionRange(f.length,f.length))});let p=t.querySelector("#message-thread-form");if(p){let f=p.querySelector("#message-thread-type"),o=p.querySelector(".message-direct-field"),l=p.querySelector("#message-scope-note");if(f&&o&&l&&typeof i=="function"){let g=()=>{let u=f.value==="direct";o.classList.toggle("hidden-section",!u);let h=o.querySelector("select");h&&(h.disabled=!u),l.textContent=i(f.value)};f.addEventListener("change",g),g()}}t.querySelectorAll("[data-message-person]").forEach(f=>{f.addEventListener("click",()=>{let o=t.querySelector("#message-thread-form");if(!o)return;let l=o.querySelector("details"),g=o.querySelector("#message-thread-type"),u=o.querySelector("select[name='direct_user_id']"),h=o.querySelector(".message-direct-field"),y=o.querySelector("#message-scope-note"),w=o.querySelector("input[name='title']");l&&(l.open=!0),g&&(g.value="direct"),u&&(u.value=f.dataset.messagePerson||"",u.disabled=!1),h&&h.classList.remove("hidden-section"),y&&typeof i=="function"&&(y.textContent=i("direct")),w&&w.focus()})}),t.querySelectorAll("[data-quick-reply]").forEach(f=>{f.addEventListener("click",()=>{let l=t.querySelector("#message-reply-form")?.querySelector("textarea[name='body']");if(!l)return;let g=l.value.trim();l.value=g?`${g}
${f.dataset.quickReply}`:f.dataset.quickReply,l.focus(),typeof m=="function"&&m(l)})})}window.MaintainOpsWorkspaceMessageUiEvents={bindWorkspaceMessageUiEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=e.renderWorkspace,i=e.resetPartsPage;if(!n||typeof a!="function"||typeof i!="function")return;let m=t.querySelector("#part-search-form");if(!m)return;let r=d=>{n.setPartSearchQuery(d||""),i(),a()},c=m.querySelector("input[name='part_search']");c&&c.addEventListener("input",()=>{r(c.value||"");let d=t.querySelector("#part-search");if(!d)return;d.focus();let p=d.value.length;d.setSelectionRange(p,p)}),m.addEventListener("submit",d=>{d.preventDefault();let p=e.FormDataRef||FormData,f=new p(m).get("part_search")||"";r(f),t.querySelector("#parts-list")?.scrollIntoView({behavior:"smooth",block:"start"})})}window.MaintainOpsWorkspacePartSearchEvents={bindWorkspacePartSearchEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;if(!n||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage,i=typeof e.scrollToSectionTop=="function"?e.scrollToSectionTop:()=>{};t.querySelectorAll("[data-section]").forEach(m=>{m.addEventListener("click",async()=>{let r=performance.now(),c=m.dataset.section;e.visibleNavItems().some(([d])=>d===c)&&(n.setActiveSection(c),n.setActiveWorkOrderId(null),n.setActiveAssetId(null),n.setActivePartId(null),n.setShowPartSourceManager(!1),n.setCreateWorkOrderMode(!1),n.setQuickFixMode(!1),n.setReportIssueMode(!1),n.setQuickFixAssetId(null),n.setQuickFixRequestId(null),c!=="work"&&e.setWorkOrderSearchMode(!1),e.resetWorkOrderPage(),a.setItem("maintainops.activeSection",c),e.renderWorkspace(),i(),(c==="work"||c==="mywork")&&await e.reloadWorkOrderQueue(),c==="planning"&&typeof e.reloadPlanningWorkOrderQueue=="function"&&await e.reloadPlanningWorkOrderQueue(),c==="requests"&&await e.reloadRequestQueue(),c==="team"&&typeof e.reloadTeamWorkloads=="function"&&await e.reloadTeamWorkloads(),c==="setup"&&typeof e.loadSetupStorageDashboard=="function"&&(await e.loadSetupStorageDashboard(),e.renderWorkspace()),c==="manager"&&typeof e.loadManagerDashboardCompletedWork=="function"&&(await e.loadManagerDashboardCompletedWork(),e.renderWorkspace()),c==="performance"&&typeof e.loadPlatformPerformance=="function"&&await e.loadPlatformPerformance(),typeof e.onSectionNavigation=="function"&&e.onSectionNavigation(c,r))})})}window.MaintainOpsWorkspaceSectionNavigationEvents={bindWorkspaceSectionNavigationEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;if(!n||typeof e.renderWorkspace!="function"||typeof e.markMessageThreadRead!="function")return;let a=e.storage||localStorage;t.querySelectorAll("[data-message-thread]").forEach(i=>{i.addEventListener("click",async()=>{let m=i.dataset.messageThread;n.setActiveMessageThreadId(m),a.setItem("maintainops.activeMessageThreadId",m),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(m),await e.markMessageThreadRead(m),e.renderWorkspace()})}),t.querySelectorAll("[data-open-work-message-thread]").forEach(i=>{i.addEventListener("click",async()=>{let m=i.dataset.openWorkMessageThread;n.setActiveMessageThreadId(m),n.setMessageComposerOpen(!1),n.setActiveSection("messages"),a.setItem("maintainops.activeMessageThreadId",m),a.setItem("maintainops.activeSection","messages"),typeof e.loadActiveMessageThreadMessages=="function"&&await e.loadActiveMessageThreadMessages(m),await e.markMessageThreadRead(m),e.renderWorkspace()})})}window.MaintainOpsWorkspaceMessageThreadEvents={bindWorkspaceMessageThreadEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;if(!n||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;t.querySelectorAll("[data-cancel-app-issue-report]").forEach(i=>{i.addEventListener("click",()=>{n.setReportIssueMode(!1),e.renderWorkspace()})}),t.querySelectorAll("[data-setup-action]").forEach(i=>{i.addEventListener("click",()=>{i.dataset.setupAction==="confirm-admin-delete-sql"&&(n.setAdminDeleteSqlConfirmed(!0),a.setItem("maintainops.adminDeleteSqlConfirmed","true"),typeof e.showNotice=="function"&&e.showNotice("Admin delete SQL marked as applied."),e.renderWorkspace())})})}window.MaintainOpsWorkspaceIssueAdminUiEvents={bindWorkspaceIssueAdminUiEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;typeof e.requestDeletePart=="function"&&(t.querySelectorAll("[data-delete-part]:not(.permanent-delete-button)").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})}),t.querySelectorAll("[data-delete-part].permanent-delete-button").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePart(a.dataset.deletePart)})})),!(!n||typeof e.renderWorkspace!="function")&&t.querySelectorAll("[data-cancel-delete-part]").forEach(a=>{a.addEventListener("click",()=>{n.setPendingDeletePartId(null),e.renderWorkspace()})})}window.MaintainOpsWorkspacePartDeleteCancelEvents={bindWorkspacePartDeleteCancelEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;if(!n||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;t.querySelectorAll("[data-start-work-message]").forEach(i=>{i.addEventListener("click",()=>{let m=i.dataset.startWorkMessage;n.setMessageComposerWorkOrderId(m),n.setMessageComposerOpen(!0),n.setActiveMessageThreadId(""),n.setActiveSection("messages"),a.setItem("maintainops.messageComposerWorkOrderId",m),a.setItem("maintainops.activeSection","messages"),a.setItem("maintainops.activeMessageThreadId",""),e.renderWorkspace()})})}window.MaintainOpsWorkspaceWorkMessageStartEvents={bindWorkspaceWorkMessageStartEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;!n||typeof e.renderWorkspace!="function"||t.querySelectorAll('[data-command-action="report-issue"]').forEach(a=>{a.addEventListener("click",()=>{n.setActiveWorkOrderId(null),n.setActiveAssetId(null),n.setActivePartId(null),n.setCreateWorkOrderMode(!1),n.setQuickFixMode(!1),n.setReportIssueMode(!0),e.renderWorkspace()})})}window.MaintainOpsWorkspaceReportIssueCommandEvents={bindWorkspaceReportIssueCommandEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;if(!n||typeof e.reloadRequestQueue!="function"||typeof e.resetRequestsPage!="function")return;let a=e.storage||localStorage;t.querySelectorAll('[data-command-action="request"]').forEach(i=>{i.addEventListener("click",async()=>{n.setActiveWorkOrderId(null),n.setActiveAssetId(null),n.setCreateWorkOrderMode(!1),n.setQuickFixMode(!1),n.setReportIssueMode(!1),n.setQuickFixAssetId(null),n.setQuickFixRequestId(null),n.setActiveSection("requests"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","requests"),e.resetRequestsPage(),await e.reloadRequestQueue()})})}window.MaintainOpsWorkspaceSubmitRequestCommandEvents={bindWorkspaceSubmitRequestCommandEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;if(!n||typeof e.renderWorkspace!="function")return;let a=e.storage||localStorage;t.querySelectorAll('[data-command-action="create-work-order"]').forEach(i=>{i.addEventListener("click",()=>{n.setActiveWorkOrderId(null),n.setActiveAssetId(null),n.setCreateWorkOrderMode(!0),n.setQuickFixMode(!1),n.setReportIssueMode(!1),n.setQuickFixAssetId(null),n.setQuickFixRequestId(null),n.setActiveSection("work"),e.setWorkOrderSearchMode(!1),a.setItem("maintainops.activeSection","work"),e.renderWorkspace()})})}window.MaintainOpsWorkspaceNewWorkOrderCommandEvents={bindWorkspaceNewWorkOrderCommandEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document;typeof e.exportActiveSectionCsv=="function"&&t.querySelectorAll('[data-command-action="export-csv"]').forEach(n=>{n.addEventListener("click",()=>{e.exportActiveSectionCsv()})})}window.MaintainOpsWorkspaceExportCsvCommandEvents={bindWorkspaceExportCsvCommandEvents:s}})();var aa=j(vt());(function(){function s(e={}){let t=e.documentRef||document,n=e.state;typeof e.requestDeleteAsset=="function"&&t.querySelectorAll("[data-delete-asset]").forEach(a=>{a.addEventListener("click",async i=>{i&&typeof i.stopPropagation=="function"&&i.stopPropagation(),await e.requestDeleteAsset(a.dataset.deleteAsset)})}),!(!n||typeof e.renderWorkspace!="function")&&(t.querySelectorAll("[data-cancel-delete-asset]").forEach(a=>{a.addEventListener("click",i=>{i&&typeof i.stopPropagation=="function"&&i.stopPropagation(),n.setPendingDeleteAssetId(null),e.renderWorkspace()})}),typeof e.deleteAsset=="function"&&t.querySelectorAll("[data-confirm-delete-asset]").forEach(a=>{a.addEventListener("click",async i=>{i&&typeof i.stopPropagation=="function"&&i.stopPropagation(),await e.deleteAsset(a.dataset.confirmDeleteAsset)})}))}window.MaintainOpsWorkspaceAssetDeleteCancelEvents={bindWorkspaceAssetDeleteCancelEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;typeof e.requestDeleteMaintenanceRequest=="function"&&t.querySelectorAll("[data-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeleteMaintenanceRequest(a.dataset.deleteRequest)})}),!(!n||typeof e.renderWorkspace!="function")&&(t.querySelectorAll("[data-cancel-delete-request]").forEach(a=>{a.addEventListener("click",()=>{n.setPendingDeleteRequestId(null),e.renderWorkspace()})}),typeof e.deleteMaintenanceRequest=="function"&&t.querySelectorAll("[data-confirm-delete-request]").forEach(a=>{a.addEventListener("click",()=>{e.deleteMaintenanceRequest(a.dataset.confirmDeleteRequest)})}))}window.MaintainOpsWorkspaceRequestDeleteCancelEvents={bindWorkspaceRequestDeleteCancelEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;typeof e.requestDeletePreventiveSchedule=="function"&&t.querySelectorAll("[data-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.requestDeletePreventiveSchedule(a.dataset.deleteSchedule)})}),!(!n||typeof e.renderWorkspace!="function")&&(t.querySelectorAll("[data-cancel-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{n.setPendingDeleteScheduleId(null),e.renderWorkspace()})}),typeof e.deletePreventiveSchedule=="function"&&t.querySelectorAll("[data-confirm-delete-schedule]").forEach(a=>{a.addEventListener("click",()=>{e.deletePreventiveSchedule(a.dataset.confirmDeleteSchedule)})}))}window.MaintainOpsWorkspaceScheduleDeleteCancelEvents={bindWorkspaceScheduleDeleteCancelEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state;typeof e.requestDeleteProcedureTemplate=="function"&&t.querySelectorAll("[data-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.requestDeleteProcedureTemplate(a.dataset.deleteProcedure)})}),!(!n||typeof e.renderWorkspace!="function")&&(t.querySelectorAll("[data-cancel-delete-procedure]").forEach(a=>{a.addEventListener("click",()=>{n.setPendingDeleteProcedureId(null),e.renderWorkspace()})}),typeof e.deleteProcedureTemplate=="function"&&t.querySelectorAll("[data-confirm-delete-procedure]").forEach(a=>{a.addEventListener("click",async()=>{await e.deleteProcedureTemplate(a.dataset.confirmDeleteProcedure)})}))}window.MaintainOpsWorkspaceProcedureDeleteCancelEvents={bindWorkspaceProcedureDeleteCancelEvents:s}})();(function(){function s(t){!t||!t.style||(t.style.height="auto",t.style.height=`${t.scrollHeight}px`)}function e(t={}){(t.documentRef||document).querySelectorAll("textarea").forEach(a=>{s(a),a.addEventListener("input",()=>s(a))})}window.MaintainOpsWorkspaceTextareaAutoGrow={autoGrowTextarea:s,bindWorkspaceTextareaAutoGrow:e}})();var ua=j(kt());(function(){function s(e={}){let t=e.documentRef||document,n=e.state;!n||typeof e.renderWorkspace!="function"||(t.querySelectorAll("[data-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{n.setTeamInviteCancelError(""),n.setPendingCancelInviteId(a.dataset.cancelInvite),e.renderWorkspace()})}),t.querySelectorAll("[data-cancel-invite-cancel]").forEach(a=>{a.addEventListener("click",()=>{n.setTeamInviteCancelError(""),n.setPendingCancelInviteId(null),e.renderWorkspace()})}),typeof e.cancelTeamInvite=="function"&&t.querySelectorAll("[data-confirm-cancel-invite]").forEach(a=>{a.addEventListener("click",()=>{e.cancelTeamInvite(a.dataset.confirmCancelInvite)})}))}window.MaintainOpsWorkspaceTeamInviteCancelEvents={bindWorkspaceTeamInviteCancelEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,i=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof n=="function"&&t.querySelectorAll("[data-copy-team-invite]").forEach(m=>{m.addEventListener("click",async()=>{let r=await n(m.dataset.copyTeamInvite||"");m.textContent=r?"Copied":"Copy failed",a(()=>{m.textContent="Copy Invite"},i)})})}window.MaintainOpsWorkspaceTeamInviteCopyEvents={bindWorkspaceTeamInviteCopyEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!n||typeof e.renderWorkspace!="function")return;let i=e.storage||localStorage;t.querySelectorAll('[data-command-action="quick-fix"]').forEach(m=>{m.addEventListener("click",()=>{n.setActiveWorkOrderId(null),n.setActiveAssetId(null),n.setCreateWorkOrderMode(!1),n.setQuickFixMode(!0),n.setReportIssueMode(!1),n.setQuickFixAssetId(null),n.setQuickFixRequestId(null),n.setActiveSection("mywork"),e.setWorkOrderSearchMode(!1),i.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceQuickFixCommandEvents={bindWorkspaceQuickFixCommandEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.state,a=typeof e.scrollToQuickFixForm=="function"?e.scrollToQuickFixForm:()=>{};if(!n||typeof e.renderWorkspace!="function")return;let i=e.storage||localStorage;t.querySelectorAll("[data-quick-fix-asset]").forEach(m=>{m.addEventListener("click",()=>{n.setQuickFixAssetId(m.dataset.quickFixAsset),n.setQuickFixRequestId(null),n.setActiveAssetId(null),n.setActiveWorkOrderId(null),n.setCreateWorkOrderMode(!1),n.setQuickFixMode(!0),n.setActiveSection("mywork"),i.setItem("maintainops.activeSection","mywork"),e.renderWorkspace(),a()})})}window.MaintainOpsWorkspaceAssetQuickFixEvents={bindWorkspaceAssetQuickFixEvents:s}})();var ga=j(_t());(function(){function s(e={}){let t=e.documentRef||document,n=e.copyTextToClipboard,a=e.setTimeoutRef||setTimeout,i=Number.isFinite(e.resetDelayMs)?e.resetDelayMs:1600;typeof n=="function"&&t.querySelectorAll("[data-copy-public-request-link]").forEach(m=>{m.addEventListener("click",async()=>{let r=await n(m.dataset.copyPublicRequestLink);m.textContent=r?"Copied":"Copy failed",a(()=>{m.textContent="Copy QR Link"},i)})})}window.MaintainOpsWorkspacePublicRequestLinkCopyEvents={bindWorkspacePublicRequestLinkCopyEvents:s}})();var ya=j(St());(function(){function s(e={}){let t=e.documentRef||document,n=e.convertRequestToWorkOrder;typeof n=="function"&&t.querySelectorAll("[data-convert-request]").forEach(a=>{a.addEventListener("click",()=>{n(a.dataset.convertRequest)})})}window.MaintainOpsWorkspaceRequestConversionEvents={bindWorkspaceRequestConversionEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.generatePreventiveWorkOrder;typeof n=="function"&&t.querySelectorAll("[data-generate-pm]").forEach(a=>{a.addEventListener("click",()=>{n(a.dataset.generatePm)})})}window.MaintainOpsWorkspacePmGenerationEvents={bindWorkspacePmGenerationEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.createFollowUpWorkOrder;typeof n=="function"&&t.querySelectorAll("[data-create-follow-up]").forEach(a=>{a.addEventListener("click",()=>{let m=a.closest?.("[data-follow-up-create]")?.querySelector?.("[name='follow_up_days']");n(a.dataset.createFollowUp,m?.value)})})}window.MaintainOpsWorkspaceFollowUpWorkEvents={bindWorkspaceFollowUpWorkEvents:s}})();var ka=j(qt());(function(){function s(e={}){let t=e.documentRef||document,n=e.createComment,a=t.querySelector("#comment-form");!a||typeof n!="function"||a.addEventListener("submit",n)}window.MaintainOpsWorkspaceCommentEvents={bindWorkspaceCommentEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.updateWorkOrderQuickView,a=t.querySelector("#quick-update-work-order-form");!a||typeof n!="function"||a.addEventListener("submit",n)}window.MaintainOpsWorkspaceQuickUpdateEvents={bindWorkspaceQuickUpdateEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.updateWorkOrderDetails,a=t.querySelector("#edit-work-order-form");!a||typeof n!="function"||a.addEventListener("submit",n)}window.MaintainOpsWorkspaceWorkOrderEditEvents={bindWorkspaceWorkOrderEditEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.openQuickFixForRequest;typeof n=="function"&&t.querySelectorAll("[data-quick-fix-request]").forEach(a=>{a.addEventListener("click",()=>n(a.dataset.quickFixRequest))})}window.MaintainOpsWorkspaceRequestQuickFixEvents={bindWorkspaceRequestQuickFixEvents:s}})();(function(){function s(e={}){let t=e.documentRef||document,n=e.updateAssetLocationWarning;typeof n=="function"&&t.querySelectorAll("[data-location-sensitive-asset]").forEach(a=>{n(a),a.addEventListener("change",()=>n(a))})}window.MaintainOpsWorkspaceAssetLocationWarningEvents={bindWorkspaceAssetLocationWarningEvents:s}})();var Pa=j(Ct()),Aa=j($t()),Ra=j(Pt()),Oa=j(At()),Ea=j(Rt()),Wa=j(Ot()),xa=j(Et()),Ma=j(Wt()),Da=j(xt()),Ta=j(Mt()),Ia=j(Dt()),Fa=j(Tt()),La=j(It()),Na=j(Ft()),Ua=j(Lt()),Qa=j(Nt()),Ba=j(Ut()),ja=j(Qt()),za=j(Bt()),Ga=j(jt()),Va=j(zt()),Ha=j(Gt()),Ya=j(Vt()),Ka=j(Ht());(function(){function s(e){function t(a){return e[a]()}function n(a,i=t("requestViewFilter")){let m=a.eq("company_id",t("activeCompanyId"));t("locationsReady")&&t("activeLocationId")&&(m=m.eq("location_id",t("activeLocationId"))),i==="converted"?m=m.or("status.eq.converted,converted_work_order_id.not.is.null"):i!=="all"&&(m=m.eq("status","submitted").is("converted_work_order_id",null));let r=e.postgrestSearchTerm(t("searchQuery"));if(r){let c=`%${r}%`,d=t("assets").filter(e.matchesActiveLocation).filter(p=>e.matchesQuery([p.name,p.asset_code,p.manufacturer,p.model,p.location,p.status,p.asset_type,e.parentAssetFor()(p)?.name],r)).map(p=>p.id).slice(0,e.SEARCH_ID_PAGE_SIZE);m=m.or([`title.ilike.${c}`,`description.ilike.${c}`,`status.ilike.${c}`,`priority.ilike.${c}`,`requested_by_name.ilike.${c}`,`requested_by_contact.ilike.${c}`,...d.length?[`asset_id.in.(${d.join(",")})`]:[]].join(","))}return m}return{applyRequestQueryFilters:n}}window.MaintainOpsRequestQueryFilters={createRequestQueryFilterHelpers:s}})();(function(){function s(e){function t(l){return e[l]()}async function n(){let l=t("searchQuery").trim();if(!l||t("workOrderSearchMode")){e.setWorkOrderRelatedSearch({assetIds:[],workOrderIds:[],procedureIds:[]});return}let g=t("assets").filter(e.matchesActiveLocation).filter(w=>e.matchesQuery([w.name,w.asset_code,w.manufacturer,w.model,w.location,w.status,w.asset_type,e.parentAssetFor()(w)?.name],l)).map(w=>w.id),u=t("procedureTemplates").filter(w=>e.matchesQuery([w.name,w.description,...(w.procedure_steps||[]).map(_=>_.prompt)],l)).map(w=>w.id),h=t("parts").filter(e.matchesActiveLocation).filter(w=>e.matchesQuery([w.name,w.sku,w.supplier_name,w.quantity_on_hand,w.reorder_point,w.unit_cost],l)).map(w=>w.id),y=new Set;await Promise.all([a(y,h),i(y,"work_order_comments",["body"],l),i(y,"work_order_events",["event_type","summary"],l),i(y,"work_order_photos",["file_name"],l),i(y,"work_order_step_results",["value"],l)]),e.setWorkOrderRelatedSearch({assetIds:g.slice(0,200),procedureIds:u.slice(0,200),workOrderIds:[...y].slice(0,300)})}async function a(l,g,u={}){if(!g.length)return;let y=u.maxRows??300;for(let w of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE)){if(y<=0)break;try{await e.fetchPagedSearchRows(()=>t("supabaseClient").from("work_order_parts").select("work_order_id").eq("company_id",t("activeCompanyId")).in("part_id",w),_=>{_.forEach(P=>{P.work_order_id&&l.add(P.work_order_id)}),y-=_.length},y)}catch(_){e.warn("Part-linked work order search failed",_);return}}}async function i(l,g,u,h,y={}){let w=e.postgrestSearchTerm(h);if(!w)return;let _=u.map($=>`${$}.ilike.%${w}%`).join(","),P=y.maxRows??300;try{await e.fetchPagedSearchRows(()=>t("supabaseClient").from(g).select("work_order_id").eq("company_id",t("activeCompanyId")).or(_),$=>{$.forEach(A=>{A.work_order_id&&l.add(A.work_order_id)})},P)}catch($){e.warn(`${g} work order search failed`,$)}}async function m(l={}){let g=await r(),u=g.length,h=Math.max(1,Math.ceil(u/e.WORK_ORDERS_PER_PAGE));t("workOrderPage")>h&&e.setWorkOrderPage(h),t("workOrderPage")<1&&e.setWorkOrderPage(1);let y=(t("workOrderPage")-1)*e.WORK_ORDERS_PER_PAGE,w=g.slice(y,y+e.WORK_ORDERS_PER_PAGE).map(A=>A.id);if(!w.length)return{data:[],error:null,count:u};let _=l.includeLocationRelation===!1?e.WORK_ORDER_FALLBACK_SELECT():e.WORK_ORDER_RELATION_SELECT(),P=await e.fetchWorkOrdersByIds(t("supabaseClient"),{companyId:t("activeCompanyId"),locationId:t("activeLocationId"),locationsReady:t("locationsReady"),selectClause:_,ids:w});if(P.error)return P;let $=new Map((P.data||[]).map(A=>[A.id,A]));return{...P,data:w.map(A=>$.get(A)).filter(Boolean),count:u}}async function r(){let l=[t("activeCompanyId")||"",t("locationsReady")?t("activeLocationId")||"":"all-locations",t("workSort"),t("searchQuery").trim().toLowerCase()].join("|"),g=t("exactWorkOrderSearchCache");if(g.key===l)return g.rows;let u=t("searchQuery").trim(),h=new Map;await c(h,u);let y=t("assets").filter(e.matchesActiveLocation).filter(A=>e.matchesQuery([A.name,A.asset_code,A.manufacturer,A.model,A.location,A.status,A.asset_type,e.parentAssetFor()(A)?.name],u)).map(A=>A.id),w=t("procedureTemplates").filter(A=>e.matchesQuery([A.name,A.description,...(A.procedure_steps||[]).map(C=>C.prompt)],u)).map(A=>A.id),_=t("parts").filter(e.matchesActiveLocation).filter(A=>e.matchesQuery([A.name,A.sku,A.supplier_name,A.quantity_on_hand,A.reorder_point,A.unit_cost],u)).map(A=>A.id);await Promise.all([d(h,"asset_id",y),d(h,"procedure_template_id",w)]);let P=new Set;await Promise.all([a(P,_,{maxRows:1/0}),i(P,"work_order_comments",["body"],u,{maxRows:1/0}),i(P,"work_order_events",["event_type","summary"],u,{maxRows:1/0}),i(P,"work_order_photos",["file_name"],u,{maxRows:1/0}),i(P,"work_order_step_results",["value"],u,{maxRows:1/0})]),await p(h,[...P]);let $=[...h.values()].sort(e.compareWorkOrders);return e.setExactWorkOrderSearchCache({key:l,rows:$}),$}async function c(l,g){let u=e.postgrestSearchTerm(g);if(!u)return;let h=["title","description","priority","type","status","failure_cause","resolution_summary","completion_notes"].map(y=>`${y}.ilike.%${u}%`).join(",");await e.fetchPagedSearchRows(()=>f().or(h),y=>o(l,y))}async function d(l,g,u){if(u.length)for(let h of e.chunkArray(u,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in(g,h),y=>o(l,y))}async function p(l,g){if(g.length)for(let u of e.chunkArray(g,e.SEARCH_ID_CHUNK_SIZE))await e.fetchPagedSearchRows(()=>f().in("id",u),h=>o(l,h))}function f(){return e.buildScopedWorkOrderSearchQuery(t("supabaseClient"),{companyId:t("activeCompanyId"),locationId:t("activeLocationId"),locationsReady:t("locationsReady")})}function o(l,g){(g||[]).forEach(u=>{u?.id&&l.set(u.id,{...l.get(u.id)||{},...u})})}return{refreshWorkOrderRelatedSearch:n,fetchExactSearchedWorkOrderPage:m,exactWorkOrderSearchRows:r,addRelatedWorkOrderIdsFromParts:a,addRelatedWorkOrderIdsFromTable:i}}window.MaintainOpsWorkOrderSearch={createWorkOrderSearchHelpers:s}})();(function(){function s(e){function t(r){return e[r]()}function n(){let r=t("searchQuery").trim(),c=t("workOrders").filter(e.matchesActiveLocation).sort(e.compareWorkOrders).slice(0,e.SEARCH_PREVIEW_LIMIT),d=t("assets").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.asset_code,g.manufacturer,g.model,g.location,g.status],r)).sort((g,u)=>g.name.localeCompare(u.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),p=t("parts").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.name,g.sku,g.supplier_name,g.quantity_on_hand,g.reorder_point],r)).sort((g,u)=>g.name.localeCompare(u.name)).slice(0,e.SEARCH_PREVIEW_LIMIT),f=t("maintenanceRequests").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.description,g.status,g.priority,g.assets?.name,t("profilesByUserId")[g.requested_by]?.full_name],r)).sort((g,u)=>new Date(u.created_at)-new Date(g.created_at)).slice(0,e.SEARCH_PREVIEW_LIMIT),o=t("preventiveSchedules").filter(e.matchesActiveLocation).filter(g=>e.matchesQuery([g.title,g.frequency,g.next_due_at,g.assets?.name],r)).sort((g,u)=>String(g.next_due_at||"").localeCompare(String(u.next_due_at||""))).slice(0,e.SEARCH_PREVIEW_LIMIT),l=t("procedureTemplates").filter(g=>e.matchesQuery([g.name,g.description,...(g.procedure_steps||[]).map(u=>u.prompt)],r)).sort((g,u)=>g.name.localeCompare(u.name)).slice(0,e.SEARCH_PREVIEW_LIMIT);return{work:c,assets:d,parts:p,requests:f,pm:o,procedures:l}}function a(r="all"){let c=e.startOfToday(),d=new Date(c);return d.setDate(d.getDate()+7),t("planningWorkOrders").filter(e.matchesActiveLocation).filter(p=>p.status!=="completed").filter(p=>e.matchesSearch([p.title,p.description,p.priority,p.status,p.assets?.name,e.assignmentLabel(p)])).filter(p=>r==="no_due"?!p.due_at:!!p.due_at).map(p=>{let f=p.due_at?new Date(`${p.due_at}T00:00:00`):null;return{kind:r==="no_due"?"no_due":"work",id:p.id,title:p.title,priority:p.priority,status:p.status,assetName:p.assets?.name||"No equipment",dueAt:p.due_at,due:f,createdAt:p.created_at||"",assignedTo:e.assignmentLabel(p),workOrder:p}}).filter(p=>r==="no_due"?!0:r==="overdue"?p.due<c:r==="today"?p.due.getTime()===c.getTime():r==="soon"?p.due>c&&p.due<=d:!0).sort((p,f)=>{if(r==="no_due"){let o={critical:4,high:3,medium:2,low:1};return(o[f.priority]||0)-(o[p.priority]||0)||new Date(p.createdAt||0)-new Date(f.createdAt||0)}return p.due-f.due})}function i(){let r=e.startOfToday(),c=new Date(r);return c.setDate(c.getDate()+7),t("preventiveSchedules").filter(e.matchesActiveLocation).filter(d=>{let p=new Date(`${d.next_due_at}T00:00:00`);return p>=r&&p<=c}).filter(d=>e.matchesSearch([d.title,d.frequency,d.next_due_at,d.assets?.name])).map(d=>({kind:"pm",id:d.id,title:d.title,assetName:d.assets?.name||"No equipment",dueAt:d.next_due_at,due:new Date(`${d.next_due_at}T00:00:00`)})).sort((d,p)=>d.due-p.due)}function m(){return t("planningWorkOrders").filter(e.matchesActiveLocation).filter(r=>r.follow_up_needed).filter(r=>e.matchesSearch([r.title,r.description,r.failure_cause,r.resolution_summary,r.assets?.name,r.assigned_profile?.full_name])).map(r=>({kind:"follow_up",id:r.id,title:r.title,assetName:r.assets?.name||"No equipment",completedAt:r.completed_at?new Date(r.completed_at).toLocaleDateString():"not completed",resolution:r.resolution_summary||r.completion_notes||"",workOrder:r})).sort((r,c)=>r.title.localeCompare(c.title))}return{globalSearchResults:n,planningItems:a,planningPmItems:i,followUpItems:m}}window.MaintainOpsWorkspaceListBuilders={createWorkspaceListBuilders:s}})();(function(){function s(t,n){return t.from("locations").select("*").eq("company_id",n).order("name")}function e(t,n,a){return t.from("locations").insert({company_id:n,name:a}).select("id").single()}window.MaintainOpsLocationsService={listLocations:s,createLocation:e}})();(function(){function s(m,r){return m.from("profiles").select("user_id, full_name, mobile_tech").eq("company_id",r)}function e(m,r){return m.from("company_members").select("*").eq("company_id",r).order("created_at",{ascending:!0})}function t(m,r){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at, default_location_id").eq("company_id",r).order("created_at",{ascending:!1})}function n(m,r){return m.from("company_invites").select("id, email, role, invited_by, accepted_at, created_at").eq("company_id",r).order("created_at",{ascending:!1})}function a(m,r){return m.from("company_invite_links").select("id, token, role, default_location_id, created_by, created_at, expires_at, used_at, used_by, revoked_at").eq("company_id",r).order("created_at",{ascending:!1})}function i(m,r){return m.from("request_notification_recipients").select("id, company_id, location_id, email, label, is_active, created_at").eq("company_id",r).order("created_at",{ascending:!1})}window.MaintainOpsProfilesService={listProfiles:s,listCompanyMembers:e,listTeamInvites:t,listTeamInvitesLegacy:n,listTeamInviteLinks:a,listRequestNotificationRecipients:i}})();(function(){function s(e,t){return e.from("parts").select("*").eq("company_id",t).order("name")}window.MaintainOpsPartsService={listParts:s}})();(function(){function s(t,n){return t.from("assets").select("*").eq("company_id",n).order("name")}function e(t,n){return t.from("asset_financials").select("*").eq("company_id",n).order("updated_at",{ascending:!1})}window.MaintainOpsAssetsService={listAssets:s,listAssetFinancials:e}})();(function(){function s(c,d,p={}){return c.from("work_orders").select(d,p)}function e(c){return c.from("work_orders").select("id",{count:"exact",head:!0})}function t(c,d,p,f){return c.from("work_orders").select(f).eq("company_id",d).eq("id",p).maybeSingle()}function n(c,d,p,f){return c.from("work_orders").select(f).eq("company_id",d).eq("asset_id",p).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1})}async function a(c,d){let{companyId:p,locationId:f,locationsReady:o,selectClause:l,ids:g}=d,u=c.from("work_orders").select(l).eq("company_id",p).in("id",g);return o&&f&&(u=u.eq("location_id",f)),u}function i(c,d){let{companyId:p,locationId:f,locationsReady:o}=d,l=c.from("work_orders").select("id, created_at, due_at, completed_at, priority, status").eq("company_id",p);return o&&f&&(l=l.eq("location_id",f)),l}function m(c,d){let{companyId:p,locationId:f,locationsReady:o}=d,l=c.from("work_orders").select("id, assigned_to, status, due_at, location_id").eq("company_id",p).in("status",["open","in_progress","blocked","completed"]).not("assigned_to","is",null);return o&&f&&(l=l.eq("location_id",f)),l.order("id",{ascending:!0})}async function r(c,d,p=1/0,f=1e3){let o=0,l=0;for(;l<p;){let g=Math.min(f,p-l),{data:u,error:h}=await c().range(o,o+g-1);if(h)throw h;let y=u||[];if(d(y),l+=y.length,y.length<g)break;o+=g}}window.MaintainOpsWorkOrdersService={selectWorkOrders:s,countWorkOrdersQuery:e,fetchWorkOrderById:t,fetchWorkOrdersByAsset:n,fetchWorkOrdersByIds:a,scopedWorkOrderSearchQuery:i,scopedTeamWorkloadQuery:m,fetchPagedSearchRows:r}})();(function(){function s(i){return i.rpc("get_my_companies")}function e(i,m){return i.from("company_members").select("company_id, role, default_location_id").eq("user_id",m).order("created_at",{ascending:!0})}function t(i,m){return i.from("company_members").select("company_id, role").eq("user_id",m).order("created_at",{ascending:!0})}function n(i,m){return i.from("companies").select("id, name, logo_path, created_at").in("id",m).order("created_at",{ascending:!0})}function a(i,m){return i.from("companies").select("id, name, created_at").in("id",m).order("created_at",{ascending:!0})}window.MaintainOpsCompanyService={getMyCompanies:s,listUserCompanyMemberships:e,listUserCompanyMembershipsLegacy:t,listCompaniesByIds:n,listCompaniesByIdsLegacy:a}})();(function(){function s(a,i){return a.from("app_issue_reports").select("*").eq("company_id",i).order("created_at",{ascending:!1})}function e(a,i){return a.from("app_issue_reports").insert(i)}function t(a,i,m,r){return a.from("app_issue_reports").update({status:r,resolved_at:r==="resolved"?new Date().toISOString():null}).eq("company_id",i).eq("id",m)}function n(a,i,m){return a.from("app_issue_reports").delete().eq("company_id",i).eq("id",m)}window.MaintainOpsAppIssueReportsService={listAppIssueReports:s,createAppIssueReportRecord:e,updateAppIssueReportStatusRecord:t,deleteAppIssueReportRecord:n}})();(function(){let s="user_id, shop_reference_favorites, updated_at";function e(n,a){return n.from("user_preferences").select(s).eq("user_id",a).maybeSingle()}function t(n,a,i){return n.from("user_preferences").upsert({user_id:a,shop_reference_favorites:Array.isArray(i)?i.filter(Boolean):[],updated_at:new Date().toISOString()},{onConflict:"user_id"}).select(s).single()}window.MaintainOpsUserPreferencesService={getUserPreferences:e,saveShopReferenceFavorites:t}})();var co=j(Yt()),lo=j(Kt()),uo=j(Jt()),po=j(Zt());(function(){function s(n,a,i="neutral"){return`<article class="metric dashboard-card tone-${i}"><span>${n}</span><strong>${a}</strong></article>`}function e(n,a,i,m="neutral"){return`
    <article class="insight dashboard-card tone-${m}">
      <span>${n}</span>
      <strong>${a}</strong>
      <p>${i}</p>
    </article>
  `}function t(){let n=window.MaintainOpsConstants?.COMPANY_ROLES||["technician","accounting","manager","admin"],a=window.MaintainOpsFormatting?.roleLabel||(r=>String(r||"")),i=window.MaintainOpsFormatting?.roleDescription||(()=>""),m=window.MaintainOpsDom?.escapeHtml||(r=>String(r??""));return`
    <section class="team-role-guide">
      ${n.map(r=>`
        <article>
          <strong>${a(r)}</strong>
          <span>${m(i(r))}</span>
        </article>
      `).join("")}
    </section>
  `}window.MaintainOpsRenderDisplayHelpers=Object.freeze({renderMetric:s,renderInsight:e,renderRoleGuide:t})})();var fo=j(Xt());(function(){function s(f,o,l="active",g={},u){let h=u.getActiveStatusFilter(),y=g.filter||g.section,w=y?"button":"article",_=g.filter&&h===g.filter?" selected":"",P=l.includes("overdue")&&Number(o)>=3,$=P?" alert-blink":"",A=[y?'type="button"':"",g.filter?`data-status-filter="${g.filter}" aria-pressed="${h===g.filter}"`:"",g.section?`data-section="${g.section}"`:""].filter(Boolean).join(" "),C=A?` ${A}`:"";return`
    <${w} class="gauge-readout ${l}${_}${$}"${C}>
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
      <strong>${o}</strong>
      <span>${u.escapeHtml(f)}</span>
    </${w}>
  `}function e(f){let o=f.getWorkOrderDashboardCounts()||{},l=o.activeWork||0,g=o.newWork||0,u=o.inProgress||0,h=o.blocked||0,y=o.overdue||0,w=o.completedAll||0,_=o.completedMonth||0,P=o.completedWeek||0,$=f.getRequestsReady()?f.openMaintenanceRequests().filter(f.matchesActiveLocation).length:0;return`
    <div class="summary-gauge-grid">
      ${s("Active Work",l,"active",{filter:"active"},f)}
      ${s("New",g,"new",{filter:"open"},f)}
      ${s("In Progress",u,"in_progress",{filter:"in_progress"},f)}
      ${s("Blocked",h,"blocked",{filter:"blocked"},f)}
      ${s("Overdue",y,"overdue",{filter:"overdue"},f)}
      ${s("Requests",$,"request",{filter:"requests"},f)}
      ${s("All Completed",w,"completed",{filter:"completed"},f)}
      ${s("Completed Month",_,"completed",{filter:"completed_month"},f)}
      ${s("Done This Week",P,"completed",{filter:"completed_week"},f)}
    </div>
  `}function t(f,o){let l=f||{},g=l.newWork||0,u=l.inProgress||0,h=l.blocked||0,y=l.activeWork??g+u+h,w=l.overdue||0,_=l.completedAll||0,P=l.completedMonth||0,$=l.completedWeek||0;return`
    <div class="workload-strip" aria-label="Active work summary">
      ${s("Active Work",y,"active workload-pill",{filter:"active"},o)}
      ${s("New",g,"new workload-pill",{filter:"open"},o)}
      ${s("In Progress",u,"in_progress workload-pill",{filter:"in_progress"},o)}
      ${s("Blocked",h,"blocked workload-pill",{filter:"blocked"},o)}
      ${s("Overdue",w,"overdue workload-pill",{filter:"overdue"},o)}
      ${s("All Completed",_,"completed workload-pill",{filter:"completed"},o)}
      ${s("Completed Month",P,"completed workload-pill",{filter:"completed_month"},o)}
      ${s("Done This Week",$,"completed workload-pill",{filter:"completed_week"},o)}
    </div>
  `}function n(f){return f.getWorkOrders().filter(o=>f.getDueState(o)?.className==="overdue")}function a(f){return f.getWorkOrders().filter(o=>i(o,f))}function i(f,o,l=new Date){if(!f.completed_at)return!1;let g=new Date(f.completed_at),u=o.sundayWeekRange(l);return Number.isFinite(g.getTime())&&g>=u.start&&g<u.end}function m(f){return f.getWorkOrders().filter(r)}function r(f){let o=new Date,l=new Date(o.getFullYear(),o.getMonth(),1);return!!(f.completed_at&&new Date(f.completed_at)>=l)}function c(f){let o=f.filter(g=>g.status==="completed"&&Number(g.actual_minutes)>0);if(!o.length)return 0;let l=o.reduce((g,u)=>g+Number(u.actual_minutes||0),0);return Math.round(l/o.length)}function d(f){let o=new Date;o.setHours(0,0,0,0);let l=new Date(o);return l.setDate(l.getDate()+7),f.getPreventiveSchedules().filter(g=>{let u=new Date(`${g.next_due_at}T00:00:00`);return u>=o&&u<=l})}function p(f){return Object.freeze({renderGaugeReadout:(o,l,g="active",u={})=>s(o,l,g,u,f),renderWorkOrderGaugeDashboard:()=>e(f),renderWorkloadStrip:o=>t(o,f),overdueWorkOrders:()=>n(f),completedThisWeek:()=>a(f),isCompletedThisWeek:(o,l)=>i(o,f,l),completedThisMonth:()=>m(f),isCompletedThisMonth:r,averageCompletionMinutes:(o=f.getWorkOrders())=>c(o),preventiveDueSoon:()=>d(f)})}window.MaintainOpsDashboardDisplay=Object.freeze({createDashboardDisplayHelpers:p})})();(function(){function s(t){let n={active:'<path d="M4 12h5l2-6 4 12 2-6h3"></path>',all:'<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',mine:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',created:'<path d="M5 4h10l4 4v12H5z"></path><path d="M15 4v5h5"></path><path d="M8 14h8"></path><path d="M8 17h5"></path>',vendor:'<path d="M3 16h2l3-7h8l3 7h2"></path><path d="M7 16h10"></path><path d="M8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',unassigned:'<path d="M12 5v14"></path><path d="M5 12h14"></path>',open:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',in_progress:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',blocked:'<path d="M5 5l14 14"></path><circle cx="12" cy="12" r="8"></circle>',completed:'<path d="M4 12l5 5L20 6"></path>',overdue:'<path d="M12 8v5"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="9"></circle>',newest:'<path d="M12 5v7l4 2"></path><circle cx="12" cy="12" r="8"></circle>',due:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',priority:'<path d="M12 3l8 18H4z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>'};return`<svg class="segment-icon" viewBox="0 0 24 24" aria-hidden="true">${n[t]||n.all}</svg>`}function e(t){let n={mywork:'<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M4 21a8 8 0 0 1 16 0"></path>',work:'<path d="M5 7h14v12H5z"></path><path d="M8 7V5h8v2"></path>',planning:'<path d="M7 3v4"></path><path d="M17 3v4"></path><path d="M4 8h16"></path><path d="M5 5h14v15H5z"></path>',requests:'<path d="M5 5h14v10H8l-3 3V5z"></path>',assets:'<path d="M4 7l8-4 8 4-8 4-8-4z"></path><path d="M4 7v10l8 4 8-4V7"></path><path d="M12 11v10"></path>',financial:'<path d="M4 19h16"></path><path d="M6 19V8"></path><path d="M12 19V5"></path><path d="M18 19v-9"></path><path d="M8 11h8"></path><path d="M10 8h4"></path>',pm:'<path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M4.2 7.5l3.5 2"></path><path d="M16.3 14.5l3.5 2"></path><path d="M19.8 7.5l-3.5 2"></path><path d="M7.7 14.5l-3.5 2"></path>',procedures:'<path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M4 6l1 1 2-2"></path><path d="M4 12l1 1 2-2"></path><path d="M4 18l1 1 2-2"></path>',parts:'<path d="M14 7l3 3"></path><path d="M5 19l8-8"></path><path d="M15 5l4 4-4 4-4-4 4-4z"></path>',conversions:'<path d="M7 7h10"></path><path d="M14 4l3 3-3 3"></path><path d="M17 17H7"></path><path d="M10 14l-3 3 3 3"></path><path d="M5 12h14"></path>',performance:'<path d="M4 18h16"></path><path d="M6 15l4-4 3 2 5-6"></path><path d="M18 7h-4"></path><path d="M18 7v4"></path>',messages:'<path d="M4 5h16v11H7l-3 3V5z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>',team:'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3 21a5 5 0 0 1 10 0"></path><path d="M11 21a5 5 0 0 1 10 0"></path>',manager:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15v-4"></path><path d="M12 15V8"></path><path d="M16 15v-6"></path><path d="M19 6l-4 4-3-2-4 4"></path>',setup:'<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a8 8 0 0 0 .1-2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L4.5 13a8 8 0 0 0 .1 2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5z"></path>',settings:'<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M8 7v10"></path><path d="M16 7v10"></path>'};return`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true">${n[t]||n.work}</svg>`}window.MaintainOpsIconDisplay=Object.freeze({segmentIcon:s,navIcon:e})})();(function(){function s(t){let n={machine:"Primary",forklift:"Forklift",secondary_machine:"Sub Equipment",tooling:"Tooling / Setup",component:"Component",shop_item:"Shop Item"};return n[t]?n[t]:String(t||"machine").replaceAll("_"," ").replace(/\b\w/g,a=>a.toUpperCase())}function e(t){return t==="offline"?"Offline / Down":String(t||"running").replaceAll("_"," ").replace(/\b\w/g,n=>n.toUpperCase())}window.MaintainOpsEquipmentLabels=Object.freeze({assetTypeLabel:s,assetStatusLabel:e})})();(function(){function s({getSearchQuery:e,getAssetStatusFilter:t,getAssetTypeFilter:n,getPartSearchQuery:a,getPartInventoryFilter:i,assetTypeLabel:m,assetStatusLabel:r}){function c(f){return e().trim()?"No requests match this search.":f==="converted"?"No converted requests at this location.":f==="all"?"No requests at this location yet.":"No active requests waiting for review."}function d(){let f=t(),o=n?n():"all";return e().trim()?"No equipment matches this search.":f!=="all"?`No ${r(f).toLowerCase()} equipment found.`:o!=="all"?`No ${m(o).toLowerCase()} equipment found.`:"No equipment added yet."}function p(){return a().trim()?"No parts match this search.":i()==="low"?"No low stock parts right now.":"No parts added yet."}return{requestEmptyStateText:c,assetEmptyStateText:d,partEmptyStateText:p}}window.MaintainOpsEmptyStateText={createEmptyStateTextHelpers:s}})();var wo=j(en());(function(){function s({escapeHtml:e,statusLabel:t,assignmentLabel:n,activeLocationName:a,getSearchQuery:i}){function m(u){return`
        <section class="panel full-width global-search-panel">
          <div class="panel-header">
            <h2>Search Results</h2>
            <span>${g(u)} previewed in ${e(a())}</span>
          </div>
          <div class="global-search-grid">
            ${r("Work Orders",u.work,c,"work",{showWorkSearchAction:!!i().trim()})}
            ${r("Equipment",u.assets,d,"asset")}
            ${r("Parts",u.parts,p,"parts")}
            ${r("Requests",u.requests,f,"comment")}
            ${r("PM",u.pm,o,"procedure")}
            ${r("Procedure Checklists",u.procedures,l,"procedure")}
          </div>
        </section>
      `}function r(u,h,y,w,_={}){return`
        <section class="global-result-group relationship-detail ${w}">
          <div class="panel-header compact">
            <h3>${e(u)}</h3>
            <span class="chip">${h.length}</span>
          </div>
          <div class="global-result-list">
            ${h.map(y).join("")||'<p class="muted">No matches.</p>'}
            ${_.showWorkSearchAction?'<button class="secondary-button global-result-action" data-view-work-search type="button">Page through all matching work orders</button>':""}
          </div>
        </section>
      `}function c(u){return`
        <button class="global-result-item" data-search-work-order="${u.id}" type="button">
          <strong>${e(u.title)}</strong>
          <span>${t(u.status)} - ${e(u.assets?.name||"No equipment")} - ${e(n(u))}</span>
        </button>
      `}function d(u){return`
        <button class="global-result-item" data-search-asset="${u.id}" type="button">
          <strong>${e(u.name)}</strong>
          <span>${e(u.asset_code||"No serial")} - ${e(u.status)} - ${e(u.location||a())}</span>
        </button>
      `}function p(u){let h=Number(u.quantity_on_hand)||0;return`
        <button class="global-result-item" data-search-part="${u.id}" type="button">
          <strong>${e(u.name)}</strong>
          <span>${e(u.sku||"No SKU")} - ${h} on hand${u.supplier_name?` - ${e(u.supplier_name)}`:""}</span>
        </button>
      `}function f(u){return`
        <button class="global-result-item" data-search-request="${u.id}" type="button">
          <strong>${e(u.title)}</strong>
          <span>${e(u.status)} - ${e(u.assets?.name||"No equipment")}</span>
        </button>
      `}function o(u){return`
        <button class="global-result-item" data-search-section="pm" data-search-label="${e(u.title)}" type="button">
          <strong>${e(u.title)}</strong>
          <span>${e(u.assets?.name||"No equipment")} - due ${e(u.next_due_at||"unset")}</span>
        </button>
      `}function l(u){return`
        <button class="global-result-item" data-search-section="procedures" data-search-label="${e(u.name)}" type="button">
          <strong>${e(u.name)}</strong>
          <span>${(u.procedure_steps||[]).length} steps</span>
        </button>
      `}function g(u){return Object.values(u).reduce((h,y)=>h+y.length,0)}return{renderGlobalSearchResults:m,renderGlobalResultGroup:r,renderGlobalWorkResult:c,renderGlobalAssetResult:d,renderGlobalPartResult:p,renderGlobalRequestResult:f,renderGlobalPmResult:o,renderGlobalProcedureResult:l,globalResultCount:g}}window.MaintainOpsGlobalSearchDisplay={createGlobalSearchDisplayHelpers:s}})();var ko=j(tn());(function(){function s({escapeHtml:e,LIST_ITEMS_PER_PAGE:t,getPlanningPage:n,getPlanningGroupOpen:a=(d,p)=>p,renderListPagination:i,statusLabel:m,renderRelationshipChips:r,canEditOperationalRecords:c=()=>!0}){function d(l,g,u,h,y={}){let w=t||12,_=typeof n=="function"?n(h):1,P=Math.max(1,Math.ceil(g.length/w)),$=Math.min(Math.max(_,1),P),A=g.slice(($-1)*w,$*w),C=a(h,!!(y.defaultOpen&&g.length));return`
        <details class="planning-group" data-planning-group="${e(h)}" ${C?"open":""}>
          <summary class="planning-group-summary">
            <span>
              <strong>${e(l)}</strong>
              ${y.description?`<small>${e(y.description)}</small>`:""}
            </span>
            <span class="chip ${u}">${g.length}</span>
          </summary>
          <div class="planning-group-body">
            <div class="planning-list">
              ${A.map(o).join("")||'<p class="muted">Nothing here.</p>'}
            </div>
            ${typeof i=="function"?i(`planning-${h}`,g.length,$,P):""}
          </div>
        </details>
      `}function p(l,g,u,h=""){return`
        <section class="planning-lane ${h}">
          <header class="planning-lane-header">
            <h3>${e(l)}</h3>
            <p>${e(g)}</p>
          </header>
          ${u}
        </section>
      `}function f(l){return`
        <div class="planning-grid">
          ${p("Needs action","Unscheduled work and completed items that still need follow-up.",`
            ${d("No Due Date",l.noDue,"blocked","no-due",{defaultOpen:!0,description:"Set a date here to move work into the schedule."})}
            ${d("Follow-up Needed",l.followUp,"blocked","follow-up",{description:"Close the loop or create the next order."})}
          `,"planning-lane-action")}
          ${p("Current schedule","Work requiring attention now.",`
            ${d("Overdue",l.overdue,"overdue","overdue",{defaultOpen:!0})}
            ${d("Due Today",l.today,"due_today","today",{defaultOpen:!0})}
          `)}
          ${p("Upcoming","Near-term maintenance and preventive work.",`
            ${d("Next 7 Days",l.soon,"in_progress","soon")}
            ${d("PM Due Soon",l.pm,"open","pm")}
          `)}
        </div>
      `}function o(l){if(l.kind==="follow_up")return`
          <article class="planning-item follow-up-item">
            <div>
              <span class="eyebrow">Follow-up</span>
              <strong>${e(l.title)}</strong>
              <p>${e(l.assetName)} - completed ${e(l.completedAt)}</p>
              ${l.resolution?`<p>${e(l.resolution)}</p>`:""}
            </div>
            <div class="follow-up-create" data-follow-up-create>
              <button class="secondary-button" data-mini-work-order="${e(l.id)}" type="button">Open Original</button>
              <label>Due in days<input name="follow_up_days" type="number" min="0" max="365" step="1" value="7"></label>
              <button class="secondary-button" data-create-follow-up="${e(l.id)}" type="button">Create Work</button>
            </div>
          </article>
        `;if(l.kind==="pm")return`
          <article class="planning-item">
            <div>
              <span class="eyebrow">Preventive</span>
              <strong>${e(l.title)}</strong>
              <p>${e(l.assetName)} - due ${e(l.dueAt)}</p>
            </div>
            <button class="secondary-button" data-generate-pm="${l.id}" type="button">Generate Work</button>
          </article>
        `;if(l.kind==="no_due"){let g=l.createdAt?new Date(l.createdAt):null,u=g&&!Number.isNaN(g.getTime())?g.toLocaleDateString():"Unknown";return`
          <article class="planning-item planning-no-due-item">
            <div>
              <span class="eyebrow">${e(l.priority)} ${e(m(l.status))}</span>
              <strong>${e(l.title)}</strong>
              <p>${e(l.assetName)} - ${e(l.assignedTo||"Unassigned")}</p>
              <p>Created ${e(u)}</p>
            </div>
            <div class="planning-item-actions">
              <button class="secondary-button" data-mini-work-order="${e(l.id)}" type="button">Open Work Order</button>
              ${c()?`
                <form class="planning-due-form" data-planning-due-form="${e(l.id)}">
                  <label>Due date<input name="planning_due_at" type="date" required></label>
                  <button class="primary-button" type="submit">Set Due Date</button>
                </form>
              `:'<span class="muted planning-view-only">View only</span>'}
            </div>
          </article>
        `}return`
        <article class="planning-item mini-work-order" data-mini-work-order="${l.id}">
          <div>
            <span class="eyebrow">${e(l.priority)} ${e(m(l.status))}</span>
            <strong>${e(l.title)}</strong>
            <p>${e(l.assetName)} - due ${e(l.dueAt)}</p>
          </div>
          ${r(l.workOrder)}
        </article>
      `}return{renderPlanningGroup:d,renderPlanningBoard:f,renderPlanningItem:o}}window.MaintainOpsPlanningDisplay={createPlanningDisplayHelpers:s}})();var So=j(nn());(function(){function s({WORK_ORDERS_PER_PAGE:e,PARTS_PER_PAGE:t,ASSETS_PER_PAGE:n,LIST_ITEMS_PER_PAGE:a,getWorkOrderPage:i,getPartsPage:m,getAssetsPage:r}){function c(o,l){if(o<=e)return"";let g=i(),u=(g-1)*e+1,h=Math.min(o,g*e);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-work-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${u}-${h} of ${o} - Page ${g} of ${l}</span>
          <button class="secondary-button page-action-button" data-work-page="next" type="button" ${g>=l?"disabled":""}>Next</button>
        </div>
      `}function d(o,l){if(o<=t)return"";let g=m(),u=(g-1)*t+1,h=Math.min(o,g*t);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-parts-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${u}-${h} of ${o} - Page ${g} of ${l}</span>
          <button class="secondary-button page-action-button" data-parts-page="next" type="button" ${g>=l?"disabled":""}>Next</button>
        </div>
      `}function p(o,l){if(o<=n)return"";let g=r(),u=(g-1)*n+1,h=Math.min(o,g*n);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-assets-page="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${u}-${h} of ${o} - Page ${g} of ${l}</span>
          <button class="secondary-button page-action-button" data-assets-page="next" type="button" ${g>=l?"disabled":""}>Next</button>
        </div>
      `}function f(o,l,g,u){if(l<=a)return"";let h=(g-1)*a+1,y=Math.min(l,g*a);return`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="prev" type="button" ${g<=1?"disabled":""}>Previous</button>
          <span>Showing ${h}-${y} of ${l} - Page ${g} of ${u}</span>
          <button class="secondary-button page-action-button" data-list-page="${o}" data-page-direction="next" type="button" ${g>=u?"disabled":""}>Next</button>
        </div>
      `}return{renderWorkPagination:c,renderPartsPagination:d,renderAssetsPagination:p,renderListPagination:f}}window.MaintainOpsPaginationDisplay={createPaginationDisplayHelpers:s}})();var Co=j(rn());(function(){function s({escapeHtml:e,getLocations:t,getActiveLocationId:n,getAssets:a,matchesActiveLocation:i,isAssetDescendantOf:m,parentAssetFor:r}){function c(g=n()){return t().map(u=>`<option value="${u.id}" ${u.id===g?"selected":""}>${e(u.name)}</option>`).join("")}function d(g){let u=r(g);return u?`${g.name} - part of ${u.name}`:g.name}function p(g=""){let u=a().filter(i).sort((w,_)=>d(w).localeCompare(d(_))),h=g?a().find(w=>w.id===g):null;return(h&&!u.some(w=>w.id===h.id)?[h,...u]:u).map(w=>`<option value="${w.id}" ${w.id===g?"selected":""}>${e(d(w))}</option>`).join("")}function f(g="",u=""){return a().filter(i).filter(h=>h.id!==u&&!m(h.id,u)).sort((h,y)=>d(h).localeCompare(d(y))).map(h=>`<option value="${h.id}" ${h.id===g?"selected":""}>${e(d(h))}</option>`).join("")}function o(g=""){let u=[...new Set(a().filter(i).map(y=>String(y.location||"").trim()).filter(Boolean))].sort((y,w)=>y.localeCompare(w)),h=String(g||"").trim();return h&&!u.includes(h)?[h,...u]:u}function l(g=""){return o(g).map(u=>`<option value="${e(u)}" ${u===g?"selected":""}>${e(u)}</option>`).join("")}return{renderLocationOptions:c,renderAssetOptions:p,renderParentAssetOptions:f,renderAssetAreaOptions:l,assetOptionLabel:d}}window.MaintainOpsOptionDisplay={createOptionDisplayHelpers:s}})();(function(){function s({escapeHtml:e,requestPhotoMetaText:t,getRequestPhotosReady:n}){function a(i){if(!i.photo_storage_path)return"";let m=i.photo_file_name||i.photo_original_file_name||"Request photo",r=t(i);return`
        <div class="request-photo-preview">
          ${i.photoSignedUrl&&i.photo_content_type?.startsWith("image/")?`<img class="photo-thumb" src="${e(i.photoSignedUrl)}" alt="${e(m)}">`:""}
          <div>
            <strong>${e(m)}</strong>
            <span>${e(r)}</span>
            ${i.photoSignedUrl?`<a href="${e(i.photoSignedUrl)}" target="_blank" rel="noreferrer">Open photo</a>`:`<span>${n()?"Photo attached":"Photo attached - run request photo SQL if links do not open"}</span>`}
          </div>
        </div>
      `}return{renderMaintenanceRequestPhoto:a}}window.MaintainOpsRequestPhotoDisplay={createRequestPhotoDisplayHelpers:s}})();(function(){function s({directUnreadMessages:e,totalUnreadMessages:t}){function n(){let a=e();if(a>0)return`<b class="nav-badge nav-alert-badge">${a}!</b>`;let i=t();return i>0?`<b class="nav-badge">${i}</b>`:""}return{renderMessageNavBadge:n}}window.MaintainOpsMessageBadgeDisplay={createMessageBadgeDisplayHelpers:s}})();(function(){function s(){function e(a){let i=Number(a);return!Number.isFinite(i)||i<=0?0:Math.floor(i)}function t(a){let i=e(a);return i?i>99?"99+":String(i):""}function n(a,i={}){let m=t(a);if(!m)return"";let r=i.alert?" nav-alert-badge":"",c=i.alertSuffix?"!":"";return`<b class="nav-badge${r}">${m}${c}</b>`}return{navBadgeText:t,renderNavCountBadge:n}}window.MaintainOpsNavBadgeDisplay={createNavBadgeDisplayHelpers:s}})();(function(){function s({escapeHtml:e,getProfilesByUserId:t,getLocations:n}){function a(i){let m=t()[i.reporter_id]?.full_name||"Team member",r=n().find(p=>p.id===i.location_id)?.name||"No location",c=i.status||"open",d=i.severity||"normal";return`
        <article class="issue-report-card issue-${c}">
          <div>
            <div class="issue-report-meta">
              <span class="chip ${d==="blocking"?"critical":d==="minor"?"completed":"open"}">${e(d)}</span>
              <span class="chip issue-status-chip issue-status-${c}">${e(c)}</span>
              <span>${e(r)}</span>
              <span>${i.created_at?new Date(i.created_at).toLocaleString():""}</span>
            </div>
            <strong>${e(i.title)}</strong>
            <p>${e(i.details||"")}</p>
            <small>${e(m)} - ${e(i.screen||"workspace")}</small>
          </div>
          <div class="issue-admin-actions">
            <form class="inline-form issue-status-form" data-app-issue-status="${e(i.id)}">
              <select name="status" aria-label="Issue status">
                ${["open","reviewing","resolved"].map(p=>`<option value="${p}" ${p===c?"selected":""}>${p}</option>`).join("")}
              </select>
              <button class="secondary-button" type="submit">Save</button>
            </form>
            <button class="text-button danger-link" data-delete-app-issue="${e(i.id)}" type="button">Delete</button>
          </div>
        </article>
      `}return{renderAppIssueReport:a}}window.MaintainOpsAppIssueDisplay={createAppIssueDisplayHelpers:s}})();(function(){function s({escapeHtml:e,formatMessageTime:t,messageThreadScopeLabel:n,getMessageThreads:a,getMessagesByThreadId:i,getMessageWorkOrderLinksReady:m}){function r(d){let p=i()[d.id]||[],f=p[p.length-1];return`
        <article class="work-linked-thread">
          <div>
            <strong>${e(d.title)}</strong>
            <span>${e(n(d))}${f?` - ${e(t(f.created_at))}`:""}</span>
          </div>
          <button class="secondary-button" data-open-work-message-thread="${d.id}" type="button">Open Thread</button>
        </article>
      `}function c(d){let p=a().filter(f=>f.work_order_id===d.id);return`
        <details class="work-detail-section relationship-detail comment work-message-section" id="work-order-messages-target">
          <summary>Messages</summary>
          <div class="work-message-panel">
            <div>
              <h3>Work Order Conversation</h3>
              <p class="muted">Start or open team conversations tied to this work order.</p>
            </div>
            <button class="secondary-button message-action-button" data-start-work-message="${d.id}" type="button">Message Team</button>
            ${m()?`
              <div class="work-linked-thread-list">
                ${p.map(r).join("")||'<p class="muted">No message threads linked yet.</p>'}
              </div>
            `:'<p class="error-text">Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.</p>'}
          </div>
        </details>
      `}return{renderWorkOrderMessages:c,renderLinkedWorkMessageThread:r}}window.MaintainOpsWorkMessageDisplay={createWorkMessageDisplayHelpers:s}})();(function(){function s({escapeHtml:e,recommendedWorkOrderStep:t}){function n(a){let i=t(a);return i?`
        <section class="work-recommendation ${i.tone||""}" aria-label="Recommended next step">
          <div>
            <span>Recommended Next Step</span>
            <strong>${e(i.title)}</strong>
            <p>${e(i.helper)}</p>
          </div>
          <button class="recommendation-button" data-jump-work-section="${i.target}" type="button">${e(i.action)}</button>
        </section>
      `:""}return{renderWorkOrderRecommendation:n}}window.MaintainOpsWorkRecommendationDisplay={createWorkRecommendationDisplayHelpers:s}})();(function(){function s({escapeHtml:e}){function t(a,i,m,r,c){return`
        <button class="command-card command-${c} ${i?"":"empty"}" data-jump-work-section="${m}" type="button">
          <span>${e(a)}</span>
          <strong>${i}</strong>
          <small>${e(r)}</small>
        </button>
      `}function n(a){return a.asset_id?t("Email Helper","Copy","work-order-email-helper-target","Copy to paste an email update","email"):""}return{renderEmailHelperCommandCard:n,commandShortcut:t}}window.MaintainOpsCommandCardDisplay={createCommandCardDisplayHelpers:s}})();(function(){function s({escapeHtml:e,statusLabel:t,assignmentLabel:n,isVendorAssigned:a,hasCompletedSafetyDeviceCheck:i,renderEmailHelperCommandCard:m,getMessageThreads:r,getPartsUsedByWorkOrder:c}){function d(p){let f=r().filter(u=>u.work_order_id===p.id).length,o=(c()[p.id]||[]).reduce((u,h)=>u+(Number(h.quantity_used)||0),0),l=p.asset_id?i(p)?["Checked","Safety devices confirmed","safe"]:["Required","Check E-stops, sensors, guards, and interlocks before completion","danger"]:["General","No equipment safety check required","neutral"],g=p.status==="completed"?"Review history or create follow-up if needed":p.status==="blocked"?"Resolve blocker or add current update":p.status==="in_progress"?"Add update, parts, photos, or complete work":"Assign owner or start work";return`
        <section class="work-command-summary">
          <button class="command-card status-${p.status}" data-jump-work-section="quick-update-status-field" type="button">
            <span>Status</span>
            <strong>${t(p.status)}</strong>
            <small>${e(g)}</small>
          </button>
          <button class="command-card command-equipment" data-jump-work-section="quick-update-equipment-field" type="button">
            <span>Equipment</span>
            <strong>${e(p.assets?.name||"General item / area")}</strong>
            <small>${e(p.due_at?`Due ${p.due_at}`:"Due date unset")}</small>
          </button>
          <button class="command-card command-owner" data-jump-work-section="quick-update-owner-field" type="button">
            <span>Owner</span>
            <strong>${e(n(p))}</strong>
            <small>${a(p)?"Outside vendor":"Internal assignment"}</small>
          </button>
          <button class="command-card safety-${l[2]}" data-jump-work-section="quick-update-safety-field" type="button">
            <span>Safety</span>
            <strong>${l[0]}</strong>
            <small>${e(l[1])}</small>
          </button>
          ${m(p)}
        </section>
      `}return{renderWorkOrderCommandSummary:d}}window.MaintainOpsWorkCommandDisplay={createWorkCommandDisplayHelpers:s}})();(function(){function s(){function e(){return`
        <div class="empty-state warning-state">
          <h3>Work order not loaded</h3>
          <p>This order may be outside the current filter, location, or page. Go back to the work order list and search for it again.</p>
          <button class="secondary-button back-action-button" id="back-to-my-work" type="button">Back to Work Orders</button>
        </div>
      `}return{renderMissingWorkOrderDetail:e}}window.MaintainOpsMissingWorkDetailDisplay={createMissingWorkDetailDisplayHelpers:s}})();(function(){function s({escapeHtml:e,getPartSources:t,getPartSuppliersReady:n}){function a(){return`
        <datalist id="part-source-options">
          ${t().map(r=>`<option value="${e(r)}"></option>`).join("")}
        </datalist>
      `}function i(){let m=t();return`
        <section class="part-source-manager relationship-detail parts">
          <div class="panel-header compact">
            <h3>Edit Sources</h3>
            <button class="text-button" data-toggle-part-sources type="button">Close</button>
          </div>
          ${n()?`
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
      `}return{renderPartSourceOptions:a,renderPartSourceManager:i}}window.MaintainOpsPartSourceDisplay={createPartSourceDisplayHelpers:s}})();(function(){function s({escapeHtml:e,assetTypeLabel:t,getWorkOrders:n,getActiveAssetId:a,parentAssetFor:i,childAssetsFor:m}){function r(c){let d=n().filter(o=>o.asset_id===c.id&&o.status!=="completed").length,p=i(c),f=m(c.id);return`
        <article class="asset-card asset-state-${c.status} ${c.id===a()?"selected":""}" data-asset-id="${c.id}" tabindex="0">
          <div class="part-card-main">
            <div class="chip-row">
              <span class="chip asset-${c.status}">${e(c.status)}</span>
              <span class="chip">${e(t(c.asset_type))}</span>
              ${c.asset_code?`<span class="chip">${e(c.asset_code)}</span>`:""}
              ${c.manufacturer?`<span class="chip">${e(c.manufacturer)}</span>`:""}
              ${c.model?`<span class="chip">${e(c.model)}</span>`:""}
              ${c.safety_devices_required===!1?'<span class="safety-check-note disabled">no safety devices identified</span>':'<span class="safety-check-note">safety devices identified</span>'}
            </div>
            <h3>${e(c.name)}</h3>
            <p>${e(c.location||"No location set")}</p>
            ${p?`<p>Part of ${e(p.name)}</p>`:""}
            ${f.length?`<p>${f.length} linked item${f.length===1?"":"s"}</p>`:""}
          </div>
          <span class="muted">${d} open work</span>
        </article>
      `}return{renderAssetCard:r}}window.MaintainOpsAssetCardDisplay={createAssetCardDisplayHelpers:s}})();(function(){function s({escapeHtml:e,getProceduresReady:t,getProcedureTemplates:n}){function a(i=""){return t()?`
        <option value="">No procedure checklist</option>
        ${n().map(m=>`<option value="${m.id}" ${m.id===i?"selected":""}>${e(m.name)}</option>`).join("")}
      `:'<option value="">No procedure checklist</option>'}return{renderProcedureOptions:a}}window.MaintainOpsProcedureOptionsDisplay={createProcedureOptionsDisplayHelpers:s}})();(function(){function s({getLocations:e,getMessageThreadMembers:t,teamMemberName:n}){function a(m){let r=t().filter(c=>c.thread_id===m.id).map(c=>n(c.user_id));return r.length?r.join(", "):"Direct message"}function i(m){return m.thread_type==="direct"?a(m):m.thread_type==="location"?e().find(r=>r.id===m.location_id)?.name||"Location thread":"Whole company"}return{directThreadNames:a,messageThreadScopeLabel:i}}window.MaintainOpsMessageThreadLabelDisplay={createMessageThreadLabelDisplayHelpers:s}})();(function(){function s({escapeHtml:e,formatMessageTime:t,teamMemberName:n,messageThreadScopeLabel:a,unreadMessageCount:i,getMessagesByThreadId:m,getActiveMessageThreadId:r}){function c(d){let f=(m()[d.id]||[]).filter(h=>!h.deleted_at),o=f[f.length-1],l=i(d.id),g=o?.body?`${e(n(o.sender_id))}: ${e(o.body)}`:"Last activity",u=o?`${g} - ${e(t(o.created_at))}`:"No messages yet";return`
        <button class="message-thread-button ${d.id===r()?"active":""}" data-message-thread="${d.id}" type="button">
          <strong>${e(d.title)}${l?`<span class="message-unread-pill">${l}</span>`:""}</strong>
          <span>${e(a(d))}</span>
          <small>${u}</small>
        </button>
      `}return{renderMessageThreadButton:c}}window.MaintainOpsMessageThreadButtonDisplay={createMessageThreadButtonDisplayHelpers:s}})();(function(){function s({activeLocationName:e}){function t(n){return n==="direct"?"Only you and the selected teammate will see this thread.":n==="location"?`Visible to company members. Tagged to ${e()}.`:"Visible to everyone in this company."}return{messageComposerScopeNote:t}}window.MaintainOpsMessageComposerDisplay={createMessageComposerDisplayHelpers:s}})();var Qo=j(an());(function(){function s({getLocations:e}){function t(n){let a=e().find(i=>i.id===n.default_location_id);return a?`Default location: ${a.name}`:"Default location: first available"}return{inviteDefaultLocationLabel:t}}window.MaintainOpsInviteLocationDisplay={createInviteLocationDisplayHelpers:s}})();(function(){function s({getPartCostsReady:e,getPartSuppliersReady:t,getPartMachineNotesReady:n}){function a(){let i=[];return e()||i.push("Run supabase/step-next-part-costs.sql before saving unit costs."),t()||i.push("Run supabase/step-next-part-suppliers.sql before saving source/vendor names."),n&&!n()&&i.push("Run supabase/step-next-part-machine-note.sql before saving machine notes."),i.join(" ")}return{partSetupMessage:a}}window.MaintainOpsPartSetupDisplay={createPartSetupDisplayHelpers:s}})();(function(){function s(e){function t(){return e.getLocations().find(n=>n.id===e.getActiveLocationId())?.name||"Location"}return{activeLocationName:t}}window.MaintainOpsLocationDisplay={createLocationDisplayHelpers:s}})();(function(){function s(e){function t(i){return i.assets?.name||"Equipment"}function n(i){return`Machine Down Update - ${t(i)} - ${new Date().toLocaleString()}`}function a(i){let m=t(i),r=i.due_at?`known, target ${e.formatDate(i.due_at)}`:"unknown at this time",c=e.assignmentLabel(i),d=e.cleanWorkOrderDescription(i.description)||i.title,p=i.resolution_summary||i.failure_cause||i.completion_notes||"No additional update has been entered yet.";return[`${m} is down or needs maintenance attention. At this time, the expected downtime is ${r}. We will update the team as more information becomes available.`,"","Technical details:",`Issue: ${d}`,`Work order: ${i.title}`,`Equipment: ${m}`,`Current update: ${p}`,`Assigned to: ${c}`,`Priority: ${i.priority||"medium"}`,`ETA / due date: ${i.due_at?e.formatDate(i.due_at):"Unknown"}`].join(`
`)}return{downtimeEmailSubject:n,downtimeEmailBody:a}}window.MaintainOpsDowntimeEmailDisplay={createDowntimeEmailDisplayHelpers:s}})();(function(){function s(){function e(n){let a=n?.message||"";return a.includes("assets_asset_type_check")||a.includes("asset_type")?"Run supabase/step-next-asset-type-shop-item.sql before saving Shop Item equipment.":"Run supabase/step-next-asset-hierarchy.sql before saving equipment hierarchy."}function t(n="this save"){return`Database update required before ${n}. Run the current Supabase SQL steps from docs/supabase-architecture.md, then refresh and try again.`}return{equipmentSchemaMessage:e,databaseSetupRequiredMessage:t}}window.MaintainOpsSetupErrorDisplay={createSetupErrorDisplayHelpers:s}})();(function(){function s(){function e(t){let n=t?.message||"Unknown error";return n.includes("work_orders_company_assigned_profile_fkey")?"The assigned user needs a company profile before they can be assigned. Try saving as Unassigned, or open Team/Company once for that user.":n.includes("row-level security")?"Supabase permissions rejected this update. Make sure you are still a member of this company.":n}return{friendlyWorkOrderSaveError:e}}window.MaintainOpsWorkOrderErrorDisplay={createWorkOrderErrorDisplayHelpers:s}})();(function(){function s(e){function t(n){return e.isVendorAssigned(n)?"Outside vendor":n.assigned_profile?.full_name||"Unassigned"}return{assignmentLabel:t}}window.MaintainOpsAssignmentDisplay={createAssignmentDisplayHelpers:s}})();(function(){function s(e){function t(i){return String(i||"").replace(e.OUTSIDE_VENDOR_NOTE,"").replace(/\n{3,}/g,`

`).trim()}function n(i,m){let r=t(i);return m!==e.OUTSIDE_VENDOR_VALUE?r||null:[r,e.OUTSIDE_VENDOR_NOTE].filter(Boolean).join(`

`)}function a(i,m){let r=String(i||"").trim();if(!m?.photo_storage_path)return r||null;let c="[Request photo attached to original request]";return r?`${r}

${c}`:c}return{cleanWorkOrderDescription:t,descriptionWithAssignmentNote:n,descriptionWithRequestPhotoNote:a}}window.MaintainOpsWorkOrderDescriptionDisplay={createWorkOrderDescriptionDisplayHelpers:s}})();(function(){function s(){function e(t,n){if(!t)return"Work order updated.";let a=[];return t.title!==n.title&&a.push("title"),(t.description||"")!==(n.description||"")&&a.push("description"),(t.due_at||"")!==(n.due_at||"")&&a.push("due date"),t.priority!==n.priority&&a.push("priority"),(t.type||"corrective")!==n.type&&a.push("type"),(t.assigned_to||"")!==(n.assigned_to||"")&&a.push("assignment"),(t.procedure_template_id||"")!==(n.procedure_template_id||"")&&a.push("procedure"),String(t.actual_minutes||0)!==String(n.actual_minutes||0)&&a.push("actual minutes"),a.length?`Updated ${a.join(", ")}.`:"Work order saved."}return{describeWorkOrderChanges:e}}window.MaintainOpsWorkOrderChangeDisplay={createWorkOrderChangeDisplayHelpers:s}})();(function(){function s(){function e(t,n,a,i=[]){return[...t.map(m=>({...m,type:"comment"})),...n.map(m=>({...m,type:"photo"})),...i.map(m=>({...m,type:"part"})),...a.map(m=>({...m,type:"event"}))].sort((m,r)=>new Date(r.created_at)-new Date(m.created_at))}return{buildActivityFeed:e}}window.MaintainOpsActivityFeedDisplay={createActivityFeedDisplayHelpers:s}})();(function(){function s(e){function t(r){return Number(r.quantity_on_hand)<=Number(r.reorder_point)}function n(){return e.getParts().filter(t)}function a(r){let c=e.getPartSearchQuery().trim().toLowerCase();return c?r.some(d=>String(d??"").toLowerCase().includes(c)):!0}function i(){let r=e.getParts().filter(c=>!e.matchesActiveLocation(c)||e.getPartInventoryFilter()==="low"&&!t(c)?!1:a([c.name,c.sku,c.supplier_name,c.machine_note,c.quantity_on_hand,c.reorder_point,c.unit_cost]));return e.getPartSort&&e.getPartSort()==="source"?[...r].sort((c,d)=>{let p=String(c.supplier_name||"zzzzzz").localeCompare(String(d.supplier_name||"zzzzzz"),void 0,{sensitivity:"base"});return p||String(c.name||"").localeCompare(String(d.name||""),void 0,{sensitivity:"base"})}):r}function m(){return[...new Set(e.getParts().filter(e.matchesActiveLocation).map(r=>String(r.supplier_name||"").trim()).filter(Boolean))].sort((r,c)=>r.localeCompare(c))}return{isLowStockPart:t,lowStockParts:n,filteredParts:i,matchesPartSearch:a,partSourceOptions:m}}window.MaintainOpsPartInventoryDisplay={createPartInventoryDisplayHelpers:s}})();(function(){function s(e){function t(n){return Object.values(e.getPartsUsedByWorkOrder()).flat().filter(a=>a.part_id===n)}return{partUsageRows:t}}window.MaintainOpsPartUsageDisplay={createPartUsageDisplayHelpers:s}})();(function(){function s(e){function t(){return e.getMaintenanceRequests().filter(c=>c.status==="submitted")}function n(c){return e.matchesActiveLocation(c)&&e.matchesSearch([c.title,c.description,c.status,c.priority,c.assets?.name,e.getProfilesByUserId()[c.requested_by]?.full_name])}function a(c){return c.status==="converted"||!!c.converted_work_order_id}function i(c,d=e.getRequestViewFilter()){return d==="converted"?a(c):d==="all"?!0:!a(c)&&c.status==="submitted"}function m(c=e.getRequestViewFilter()){return e.getMaintenanceRequests().filter(d=>n(d)&&i(d,c))}function r(){return e.getRequestDashboardCounts()||{active:0,converted:0,all:0}}return{openMaintenanceRequests:t,requestMatchesBaseFilters:n,isConvertedRequest:a,requestMatchesViewFilter:i,filteredRequests:m,requestFilterCounts:r}}window.MaintainOpsRequestQueueDisplay={createRequestQueueDisplayHelpers:s}})();(function(){function s(){function e(n){let a=[n.workOrders?`${n.workOrders} work order${n.workOrders===1?"":"s"}`:"",n.children?`${n.children} linked equipment item${n.children===1?"":"s"}`:"",n.schedules?`${n.schedules} PM schedule${n.schedules===1?"":"s"}`:"",n.requests?`${n.requests} request${n.requests===1?"":"s"}`:""].filter(Boolean);return a.length?`This equipment is kept for traceability because it has ${a.join(", ")}.`:""}function t(n){let a=[n.workOrders?`${n.workOrders} work order${n.workOrders===1?"":"s"}`:"",n.schedules?`${n.schedules} PM schedule${n.schedules===1?"":"s"}`:""].filter(Boolean);return a.length?`This procedure is kept for traceability because it is linked to ${a.join(", ")}.`:""}return{assetDeleteBlockerMessage:e,procedureDeleteBlockerMessage:t}}window.MaintainOpsDeleteBlockerDisplay={createDeleteBlockerDisplayHelpers:s}})();(function(){function s(e){function t(m){return e.getAssets().find(r=>r.id===m?.parent_asset_id)||null}function n(m){return e.getAssets().filter(r=>r.parent_asset_id===m).sort((r,c)=>r.name.localeCompare(c.name))}function a(m,r){if(!m||!r)return!1;let c=e.getAssets().find(p=>p.id===m),d=new Set;for(;c?.parent_asset_id&&!d.has(c.id);){if(c.parent_asset_id===r)return!0;d.add(c.id),c=e.getAssets().find(p=>p.id===c.parent_asset_id)}return!1}function i(){return e.getAssets().filter(m=>!e.matchesActiveLocation(m)||e.getAssetStatusFilter()!=="all"&&m.status!==e.getAssetStatusFilter()||e.getAssetTypeFilter&&e.getAssetTypeFilter()!=="all"&&(m.asset_type||"machine")!==e.getAssetTypeFilter()||e.getAssetAreaFilter&&e.getAssetAreaFilter()!=="all"&&(m.location||"")!==e.getAssetAreaFilter()?!1:e.matchesSearch([m.name,m.asset_code,m.manufacturer,m.model,m.location,m.status,m.asset_type,t(m)?.name]))}return{filteredAssets:i,parentAssetFor:t,childAssetsFor:n,isAssetDescendantOf:a}}window.MaintainOpsAssetHierarchyDisplay={createAssetHierarchyDisplayHelpers:s}})();var ai=j(on());(function(){function s(e){function t(a){let i=e.getSearchQuery().trim().toLowerCase();return i?a.some(m=>String(m??"").toLowerCase().includes(i)):!0}function n(a,i=e.getSearchQuery()){let m=i.trim().toLowerCase();return m?a.some(r=>String(r??"").toLowerCase().includes(m)):!0}return{matchesSearch:t,matchesQuery:n}}window.MaintainOpsSearchFilterDisplay={createSearchFilterDisplayHelpers:s}})();(function(){function s(e){function t(r){return r.due_at?new Date(`${r.due_at}T00:00:00`).getTime():Number.MAX_SAFE_INTEGER}function n(r){return{low:1,medium:2,high:3,critical:4}[r]||0}function a(r){return r.completed_at?new Date(r.completed_at).getTime():0}function i(r){return typeof e.assignmentLabel=="function"?e.assignmentLabel(r):r.assigned_profile?.full_name||r.assigned_to||"Unassigned"}function m(r,c){return["completed","completed_month","completed_week"].includes(e.getActiveStatusFilter())?a(c)-a(r)||new Date(c.created_at)-new Date(r.created_at):e.getWorkSort()==="due"?t(r)-t(c)||new Date(c.created_at)-new Date(r.created_at):e.getWorkSort()==="priority"?n(c.priority)-n(r.priority)||t(r)-t(c):e.getWorkSort()==="type"?String(r.type||"").localeCompare(String(c.type||""))||new Date(c.created_at)-new Date(r.created_at):e.getWorkSort()==="assigned"?i(r).localeCompare(i(c))||new Date(c.created_at)-new Date(r.created_at):new Date(c.created_at)-new Date(r.created_at)}return{compareWorkOrders:m,dueSortValue:t,prioritySortValue:n,completedSortValue:a,assigneeSortLabel:i}}window.MaintainOpsWorkOrderSortDisplay={createWorkOrderSortDisplayHelpers:s}})();(function(){function s(e){function t(a){return a?.location_id||a?.assets?.location_id||null}function n(a){return!e.getLocationsReady()||!e.getActiveLocationId()?!0:t(a)===e.getActiveLocationId()}return{recordLocationId:t,matchesActiveLocation:n}}window.MaintainOpsLocationFilterDisplay={createLocationFilterDisplayHelpers:s}})();(function(){function s(e){function t(){return e.getWorkOrders().filter(c=>e.matchesActiveLocation(c)&&c.status!=="completed").slice(0,8)}function n(){let c=e.getMessageThreadFilter();return e.getMessageThreads().filter(d=>(c==="all"||c==="unread"&&i(d.id)>0||d.thread_type===c)&&e.matchesQuery(a(d),e.getMessageSearchQuery()))}function a(c){let d=e.getMessagesByThreadId()[c.id]||[],p=e.getMessageThreadMembers().filter(f=>f.thread_id===c.id).map(f=>e.teamMemberName(f.user_id));return[c.title,e.messageThreadScopeLabel(c),...p,...d.map(f=>f.body||"")]}function i(c){let d=e.getMessageReadsByThreadId()[c]?.last_read_at,p=d?new Date(d).getTime():0;return(e.getMessagesByThreadId()[c]||[]).filter(f=>f.sender_id===e.getCurrentUser()?.id?!1:new Date(f.created_at).getTime()>p).length}function m(){return e.getMessageThreads().reduce((c,d)=>c+i(d.id),0)}function r(){return e.getMessageThreads().filter(c=>c.thread_type==="direct").reduce((c,d)=>c+i(d.id),0)}return{recentMessageLinkWorkOrders:t,filteredMessageThreads:n,messageThreadSearchValues:a,unreadMessageCount:i,totalUnreadMessages:m,directUnreadMessages:r}}window.MaintainOpsMessageThreadFilterDisplay={createMessageThreadFilterDisplayHelpers:s}})();(function(){function s(e){function t(n){let a=e.getActiveStatusFilter();return a==="overdue"?e.getDueState(n)?.className==="overdue":a==="completed_month"?e.isCompletedThisMonth(n):a==="completed_week"?e.isCompletedThisWeek(n):a==="active"||a==="all"?n.status!=="completed":n.status===a}return{workOrderMatchesStatusFilter:t}}window.MaintainOpsWorkOrderStatusFilterDisplay={createWorkOrderStatusFilterDisplayHelpers:s}})();(function(){function s(e){function t(n){let a=e.getPartsUsedByWorkOrder()[n.id]||[],i=e.getCommentsByWorkOrder()[n.id]||[],m=e.getEventsByWorkOrder()[n.id]||[],r=e.getPhotosByWorkOrder()[n.id]||[],c=e.getProcedureTemplates().find(f=>f.id===n.procedure_template_id),d=Object.values(e.getStepResultsByWorkOrder()[n.id]||{}),p=e.getProfilesByUserId();return[n.title,n.description,n.status,e.statusLabel(n.status),n.priority,n.type,n.assets?.name,e.assignmentLabel(n),n.failure_cause,n.resolution_summary,n.completion_notes,n.current_update,c?.name,c?.description,...(c?.procedure_steps||[]).flatMap(f=>[f.prompt,f.step_type]),...a.flatMap(f=>[f.parts?.name,f.parts?.sku,f.parts?.supplier_name,f.quantity_used,f.unit_cost]),...i.flatMap(f=>[f.body,p[f.author_id]?.full_name]),...m.flatMap(f=>[f.event_type,f.summary,p[f.actor_id]?.full_name]),...r.flatMap(f=>[f.file_name,f.original_file_name,f.content_type]),...d.flatMap(f=>[f.value,f.notes])]}return{workOrderSearchValues:t}}window.MaintainOpsWorkOrderSearchDisplay={createWorkOrderSearchDisplayHelpers:s}})();(function(){function s(e){function t(){let n=e.getCurrentUser()?.id;return e.getWorkOrders().filter(a=>e.matchesActiveLocation(a)?(e.getMyWorkFilter()==="created"?a.created_by===n:a.assigned_to===n)&&e.matchesSearch(e.workOrderSearchValues(a)):!1)}return{myWorkQueueOrders:t}}window.MaintainOpsMyWorkQueueDisplay={createMyWorkQueueDisplayHelpers:s}})();(function(){function s(e){function t(n){return e.isMissingColumnError(n,"work_order_id")?{message:"Run supabase/step-next-message-work-order-links.sql before linking message threads to work orders.",messagesReady:null}:e.isColumnSchemaError(n,["message_threads","message_thread_members","messages"])||String(n?.message||"").includes("message_threads")?{message:"Run supabase/step-next-message-center.sql before using Messages.",messagesReady:!1}:{message:n?.message||String(n),messagesReady:null}}return{messageCenterErrorState:t}}window.MaintainOpsMessageCenterErrorDisplay={createMessageCenterErrorDisplayHelpers:s}})();(function(){function s(e){function t(n){return e.isColumnSchemaError(n,["app_issue_reports"])||String(n?.message||"").includes("app_issue_reports")?{message:"Run supabase/step-next-app-issue-reports.sql before saving app issue reports.",appIssueReportsReady:!1}:{message:n?.message||String(n),appIssueReportsReady:null}}return{appIssueReportErrorState:t}}window.MaintainOpsAppIssueErrorDisplay={createAppIssueErrorDisplayHelpers:s}})();var fi=j(sn()),gi=j(cn()),hi=j(ln()),yi=j(un()),bi=j(dn()),wi=j(pn()),vi=j(mn()),ki=j(fn());(function(){function s(n){if(!n)return"";let a=new Date(n),i=new Date,m=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),c=a.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r===m?`Today ${c}`:r===m-864e5?`Yesterday ${c}`:a.toLocaleDateString([],{month:"short",day:"numeric"})}function e(n){if(!n)return"";let a=new Date(n),i=new Date,m=new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime(),r=new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime();return r===m?"Today":r===m-864e5?"Yesterday":a.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function t(n){let a=String(n||"").trim().split(/\s+/).filter(Boolean);return a.length?a.slice(0,2).map(i=>i[0]).join("").toUpperCase():"MO"}window.MaintainOpsMessageFormatting=Object.freeze({formatMessageTime:s,formatMessageDay:e,initials:t})})();(function(){function s(e){function t(a){let i=a.sender_id===e.getCurrentUserId(),m=e.teamMemberName(a.sender_id);return`
    <article class="message-bubble ${i?"mine":""}">
      <span class="message-avatar" aria-hidden="true">${e.escapeHtml(e.initials(m))}</span>
      <div class="message-bubble-meta">
        <strong>${e.escapeHtml(m)}</strong>
        <span>${e.escapeHtml(e.formatMessageTime(a.created_at))}</span>
      </div>
      <p>${e.escapeHtml(a.body)}</p>
      ${i?`<button class="message-delete-button" data-delete-message="${e.escapeHtml(a.id)}" type="button">Delete</button>`:""}
    </article>
  `}function n(a){let i=a.filter(r=>!r.deleted_at);if(!i.length)return'<p class="muted">No messages yet.</p>';let m="";return i.map(r=>{let c=e.formatMessageDay(r.created_at),d=c!==m?`<div class="message-day-divider"><span>${e.escapeHtml(c)}</span></div>`:"";return m=c,`${d}${t(r)}`}).join("")}return Object.freeze({renderMessageBubble:t,renderMessageList:n})}window.MaintainOpsMessageDisplay=Object.freeze({createMessageDisplayHelpers:s})})();})();
//# sourceMappingURL=runtime.40ea73a164.js.map
