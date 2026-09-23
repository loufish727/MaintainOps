(()=>{var Re=Object.create;var Y=Object.defineProperty;var De=Object.getOwnPropertyDescriptor;var Ce=Object.getOwnPropertyNames;var He=Object.getPrototypeOf,Se=Object.prototype.hasOwnProperty;var We=(l,t)=>()=>{try{return t||l((t={exports:{}}).exports,t),t.exports}catch(m){throw t=0,m}};var Ae=(l,t,m,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let g of Ce(t))!Se.call(l,g)&&g!==m&&Y(l,g,{get:()=>t[g],enumerable:!(i=De(t,g))||i.enumerable});return l};var Le=(l,t,m)=>(m=l!=null?Re(He(l)):{},Ae(t||!l||!l.__esModule?Y(m,"default",{value:l,enumerable:!0}):m,l));var Z=We((Ne,F)=>{(function(){function l(t={}){let m=t.documentRef||document,i=t.state,g=typeof t.renderWorkspace=="function"?t.renderWorkspace:()=>{},p=t.windowRef||(typeof window<"u"?window:null),h=t.storage||(typeof localStorage<"u"?localStorage:null);if(!i)return;function f(){let u=m.querySelector("[data-manager-drill-in]");!u||typeof u.scrollIntoView!="function"||u.scrollIntoView({behavior:"smooth",block:"start"})}m.querySelectorAll("[data-manager-drill-user][data-manager-drill-metric]").forEach(u=>{u.addEventListener("click",()=>{if(i.setManagerDashboardUserId(u.dataset.managerDrillUser||""),i.setManagerDashboardMetric(u.dataset.managerDrillMetric||"open"),g(),p&&typeof p.requestAnimationFrame=="function"){p.requestAnimationFrame(f);return}f()})}),m.querySelectorAll("[data-manager-drill-clear]").forEach(u=>{u.addEventListener("click",()=>{i.setManagerDashboardUserId(""),i.setManagerDashboardMetric("open"),g()})}),m.querySelectorAll("[data-manager-request-jump]").forEach(u=>{u.addEventListener("click",()=>{typeof i.setActiveSection=="function"&&(i.setActiveSection("requests"),h?.setItem?.("maintainops.activeSection","requests")),typeof i.setRequestViewFilter=="function"&&i.setRequestViewFilter(u.dataset.managerRequestJump==="converted"?"converted":"active"),g()})})}window.MaintainOpsWorkspaceManagerDashboardEvents={bindWorkspaceManagerDashboardEvents:l},typeof F<"u"&&(F.exports={bindWorkspaceManagerDashboardEvents:l})})()});(function(){function l(t,m={}){let{companyId:i,locationId:g,locationsReady:p,selectClause:h,cutoffIso:f,limit:u=200}=m,$=t.from("work_orders").select(h||"*").eq("company_id",i).eq("status","completed").gte("completed_at",f).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}).limit(u);return p&&g&&($=$.eq("location_id",g)),$}window.MaintainOpsManagerDashboardService={fetchRecentCompletedWorkOrders:l}})();(function(){function l(t){let i="__summary__";function g(){let e=new Date;return e.setHours(0,0,0,0),e}function p(e){return new Date(g().getTime()-e*864e5)}function h(e,n){return!!(e.completed_at&&new Date(e.completed_at)>=n)}function f(e){if(!e.completed_at)return!1;let n=new Date(e.completed_at),a=t.sundayWeekRange();return Number.isFinite(n.getTime())&&n>=a.start&&n<a.end}function u(e){let n=new Date(e.created_at||Date.now()).getTime();return Number.isFinite(n)?Math.max(0,Math.round((Date.now()-n)/864e5)):0}function $(e){return{critical:4,high:3,medium:2,low:1}[String(e||"").toLowerCase()]||0}function q(e){return e.status!=="completed"&&$(e.priority)>=4}function ee(e){return e.status!=="completed"&&$(e.priority)>=3}function k(e){return e.status!=="completed"&&u(e)>=7}function w(e){return e.status!=="completed"&&!!e.follow_up_needed}function d(){return t.getWorkOrders().filter(e=>t.matchesActiveLocation(e)&&e.status!=="completed")}function v(){let e=new Map;return[...t.getWorkOrders(),...typeof t.getManagerCompletedWorkOrders=="function"?t.getManagerCompletedWorkOrders():[]].forEach(a=>{a?.id&&t.matchesActiveLocation(a)&&a.status==="completed"&&e.set(a.id,a)}),[...e.values()]}function _(){return t.getMaintenanceRequests().filter(e=>t.matchesActiveLocation(e)&&!t.isConvertedRequest(e)&&e.status==="submitted")}function R(){return t.getMaintenanceRequests().filter(e=>t.matchesActiveLocation(e)&&t.isConvertedRequest(e))}function te(){return(typeof t.getAssets=="function"?t.getAssets():[]).filter(t.matchesActiveLocation)}function ne(){return(typeof t.getPreventiveSchedules=="function"?t.getPreventiveSchedules():[]).filter(e=>e.active!==!1).filter(t.matchesActiveLocation)}function E(e){return d().filter(n=>t.isWorkOrderAssignedToUser(n,e))}function ae(e){return e.completed_by||e.assigned_to||e.created_by||""}function re(e){let n=ae(e);return n?t.teamMemberName(n):"Completion owner unknown"}function H(e){let n=new Date(e.created_at||Date.now()).getTime();return Number.isFinite(n)?Math.max(0,Math.round((Date.now()-n)/864e5)):0}function D(e){return H(e)>=2}function oe(e){let n=e.converted_by||e.created_by||"";return n?t.teamMemberName(n):"Converter not recorded"}function S(e){let n=window.MaintainOpsMaintenanceScheduleDates.localDateOnly(e.next_due_at||e.due_at);if(!n)return"unscheduled";let a=g(),r=new Date(a);return r.setDate(r.getDate()+7),n<a?"overdue":n<=r?"due_soon":"planned"}function P(){let e={fresh:0,watch:0,stale:0,old:0};return d().forEach(n=>{let a=u(n);a<=2?e.fresh+=1:a<=7?e.watch+=1:a<=14?e.stale+=1:e.old+=1}),e}function B(){return{submitted:_().length,converted:R().length,stale:_().filter(D).length}}function j(){let e=te(),n=e.filter(s=>s.status==="offline"),a=e.filter(s=>s.status==="degraded"),r=e.filter(s=>s.status==="watch"),o=e.filter(s=>s.status==="running");return{total:e.length,running:o,watch:r,degraded:a,down:n}}function x(){let e=ne(),n=e.filter(o=>S(o)==="overdue"),a=e.filter(o=>S(o)==="due_soon"),r=e.filter(o=>S(o)==="unscheduled");return{total:e.length,overdue:n,dueSoon:a,unscheduled:r}}function W(){return typeof t.getManagerDashboardUserId=="function"?t.getManagerDashboardUserId():""}function A(){return typeof t.getManagerDashboardMetric=="function"?t.getManagerDashboardMetric():"open"}function O(e){return{open:"Open Work",in_progress:"In Progress",blocked:"Blocked",overdue:"Overdue",completed_week:"Done This Week",completed_month:"Done 30d",converted_requests:"Converted Requests",summary_open:"Open Work",summary_requests:"New Requests",summary_overdue:"Overdue",summary_unassigned:"Unassigned",summary_critical:"Critical Open",summary_high_priority:"High Priority",summary_stale:"Stale 7d+",summary_follow_up:"Follow-up Needed",summary_completed_week:"Completed Week",summary_completed_month:"Completed Month",summary_converted_requests:"Converted Requests",summary_stale_requests:"Stale Requests",summary_completion_rate:"Weekly Completion Rate"}[e]||"Open Work"}function se(e){return e==="summary_overdue"?d().filter(n=>t.getDueState(n)?.className==="overdue"):e==="summary_unassigned"?d().filter(n=>!n.assigned_to):e==="summary_critical"?d().filter(q):e==="summary_high_priority"?d().filter(ee):e==="summary_stale"?d().filter(k):e==="summary_follow_up"?d().filter(w):e==="summary_completed_week"?v().filter(f):e==="summary_completed_month"?v().filter(n=>h(n,p(30))):d()}function le(e){return e==="summary_converted_requests"?R():e==="summary_stale_requests"?_().filter(D):_()}function V(e,n){let a=E(e),r=v().filter(o=>o.completed_by===e||o.assigned_to===e);return n==="in_progress"?a.filter(o=>o.status==="in_progress"):n==="blocked"?a.filter(o=>o.status==="blocked"):n==="overdue"?a.filter(o=>t.getDueState(o)?.className==="overdue"):n==="critical"?a.filter(q):n==="stale"?a.filter(k):n==="follow_up"?a.filter(w):n==="completed_week"?r.filter(f):n==="completed_month"?r.filter(o=>h(o,p(30))):a}function L(e,n){return n==="converted_requests"?R().filter(a=>a.converted_by===e||!a.converted_by&&a.created_by===e):[]}function I(){let e=v().filter(f).length,a=d().length+e;return a?Math.round(e/a*100):0}function ie(e){return e.critical>0||e.overdue>=3||e.blocked>=2||e.open>=10?"high":e.overdue>0||e.blocked>0||e.open>=6||e.followUp>0?"watch":"normal"}function ce(e){return{high:"Needs manager review",watch:"Watch workload",normal:"Normal load"}[e]||"Normal load"}function ue(e){return t.getWorkOrders().filter(a=>t.matchesActiveLocation(a)&&(t.isWorkOrderAssignedToUser(a,e)||a.completed_by===e||a.created_by===e)).map(a=>a.completed_at||a.updated_at||a.created_at).filter(Boolean).map(a=>new Date(a)).filter(a=>Number.isFinite(a.getTime())).sort((a,r)=>r-a)[0]||null}function de(e){if(!e.length)return 0;let n=Date.now(),a=e.reduce((r,o)=>{let s=new Date(o.created_at||n).getTime();return r+Math.max(0,Math.round((n-s)/864e5))},0);return Math.round(a/e.length)}function me(e){return e?e.toLocaleString([],{month:"numeric",day:"numeric",year:"2-digit",hour:"numeric",minute:"2-digit"}):"No recent activity"}function z(){let e=t.getWorkOrderDashboardCounts()||{},n=t.getRequestDashboardCounts()||{},a=d(),r=d().filter(s=>!s.assigned_to).length,o=_().filter(D).length;return[["Open Work",e.activeWork??d().length,"Current active work in this location.","summary_open"],["New Requests",n.active??_().length,"Submitted requests waiting for review.","summary_requests"],["Overdue",e.overdue??d().filter(s=>t.getDueState(s)?.className==="overdue").length,"Open work past due.","summary_overdue"],["Unassigned",r,"Open work with no internal owner.","summary_unassigned"],["Critical Open",a.filter(q).length,"Critical open work needing manager attention.","summary_critical"],["Stale 7d+",a.filter(k).length,"Open work older than 7 days.","summary_stale"],["Follow-up Needed",a.filter(w).length,"Open work marked for follow-up.","summary_follow_up"],["Completed Week",e.completedWeek??v().filter(f).length,"Work completed since Sunday.","summary_completed_week"],["Completed Month",e.completedMonth??v().filter(s=>h(s,p(30))).length,"Work completed in the last 30 days.","summary_completed_month"],["Converted Requests",n.converted??R().length,"Requests already turned into work orders.","summary_converted_requests"],["Stale Requests",o,"Submitted requests older than 2 days.","summary_stale_requests"],["Weekly Completion Rate",`${I()}%`,"Completed since Sunday compared with current open work.","summary_completion_rate"]]}function N(){let e=p(30);return t.getCompanyMembers().filter(n=>["technician","production","manager","admin"].includes(t.normalizeRole(n.role))).map(n=>{let a=n.user_id,r=E(a),o=v().filter(c=>c.completed_by===a||c.assigned_to===a),s=L(a,"converted_requests"),b=ue(a);return{userId:a,name:t.teamMemberName(a),role:t.roleLabel(n.role),open:r.length,inProgress:r.filter(c=>c.status==="in_progress").length,blocked:r.filter(c=>c.status==="blocked").length,overdue:r.filter(c=>t.getDueState(c)?.className==="overdue").length,critical:r.filter(q).length,followUp:r.filter(w).length,completedWeek:o.filter(f).length,completedMonth:o.filter(c=>h(c,e)).length,convertedRequests:s.length,averageAge:de(r),latestActivity:me(b)}}).map(n=>{let a=ie(n);return{...n,overloadLevel:a,overloadLabel:ce(a)}}).sort((n,a)=>({high:2,watch:1,normal:0})[a.overloadLevel]-{high:2,watch:1,normal:0}[n.overloadLevel]||a.open-n.open||a.overdue-n.overdue||n.name.localeCompare(a.name))}function ge([e,n,a,r]){return`
        <button type="button" class="manager-metric-card${W()===i&&A()===r?" active":""}" data-manager-drill-user="${i}" data-manager-drill-metric="${t.escapeHtml(r)}">
          <span>${t.escapeHtml(e)}</span>
          <strong>${t.escapeHtml(n)}</strong>
          <small>${t.escapeHtml(a)}</small>
        </button>
      `}function pe(e){let n=W(),a=A(),r=o=>e.userId===n&&o===a?" active":"";return`
        <article class="manager-tech-row workload-${t.escapeHtml(e.overloadLevel)}${e.userId===n?" selected":""}">
          <button type="button" class="manager-tech-person manager-drill-button${r("open")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="open">
            <strong>${t.escapeHtml(e.name)}</strong>
            <span>${t.escapeHtml(e.role)} - ${t.escapeHtml(e.overloadLabel)}</span>
          </button>
          <button type="button" class="manager-drill-button${r("open")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="open"><span>Open</span><strong>${e.open}</strong></button>
          <button type="button" class="manager-drill-button${r("in_progress")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="in_progress"><span>In Progress</span><strong>${e.inProgress}</strong></button>
          <button type="button" class="manager-drill-button${r("blocked")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="blocked"><span>Blocked</span><strong>${e.blocked}</strong></button>
          <button type="button" class="manager-drill-button${r("overdue")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="overdue"><span>Overdue</span><strong>${e.overdue}</strong></button>
          <button type="button" class="manager-drill-button${r("critical")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="critical"><span>Critical</span><strong>${e.critical}</strong></button>
          <button type="button" class="manager-drill-button${r("follow_up")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="follow_up"><span>Follow-up</span><strong>${e.followUp}</strong></button>
          <button type="button" class="manager-drill-button${r("completed_week")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="completed_week"><span>Done Week</span><strong>${e.completedWeek}</strong></button>
          <button type="button" class="manager-drill-button${r("completed_month")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="completed_month"><span>Done 30d</span><strong>${e.completedMonth}</strong></button>
          <button type="button" class="manager-drill-button${r("converted_requests")}" data-manager-drill-user="${t.escapeHtml(e.userId)}" data-manager-drill-metric="converted_requests"><span>Converted</span><strong>${e.convertedRequests}</strong></button>
          <div><span>Avg Age</span><strong>${e.averageAge}d</strong></div>
          <small>${t.escapeHtml(e.latestActivity)}</small>
        </article>
      `}function C(e){if(!e)return"Date unset";let n=new Date(e);return Number.isFinite(n.getTime())?n.toLocaleDateString():String(e)}function fe(e){return e.title||e.description||e.name||"Untitled work order"}function J(e){let a=(t.getDueState(e)||{}).label||(e.due_at?`Due ${C(e.due_at)}`:"Due date unset"),r=e.assigned_to?t.teamMemberName(e.assigned_to):"Unassigned",o=e.status==="completed"?"completed":`${u(e)}d open`,s=e.status==="completed"?` - Completed by ${re(e)}${e.completed_at?` on ${C(e.completed_at)}`:""}`:"";return`
        <article class="mini-work-order manager-drill-work-order" data-mini-work-order="${t.escapeHtml(e.id)}">
          <strong>${t.escapeHtml(fe(e))}</strong>
          <span>${t.escapeHtml(t.statusLabel?t.statusLabel(e.status):e.status||"Open")} - ${t.escapeHtml(e.priority||"medium")} - ${t.escapeHtml(r)}</span>
          <small>${t.escapeHtml(a)} - ${t.escapeHtml(o)} - Created ${t.escapeHtml(C(e.created_at))}${e.follow_up_needed?" - follow-up":""}${t.escapeHtml(s)}</small>
        </article>
      `}function he(e){return e.title||e.description||"Untitled request"}function ve(e){return e.requested_by_name||e.requester_name||"Requester unknown"}function ye(e){return e.assets?.name||e.equipment_note||"Machine / area not set"}function G(e){let n=t.isConvertedRequest(e),a=`${H(e)}d old`;return`
        <article class="mini-work-order manager-drill-request" data-manager-request-jump="${t.escapeHtml(n?"converted":"active")}">
          <strong>${t.escapeHtml(he(e))}</strong>
          <span>${t.escapeHtml(e.priority||"Medium")} priority - ${t.escapeHtml(n?"converted":"submitted")}</span>
          <small>${t.escapeHtml(ye(e))} - ${t.escapeHtml(ve(e))} - ${t.escapeHtml(C(e.created_at))} - ${t.escapeHtml(a)}${n?` - ${t.escapeHtml(oe(e))}`:""}</small>
        </article>
      `}function _e(e){let n=W();if(!n)return"";let a=A();if(n===i){let c=a==="summary_requests"||a==="summary_converted_requests"||a==="summary_stale_requests",y=a==="summary_completion_rate",Q=c?[]:se(a),X=c?le(a):[],T=y?1:c?X.length:Q.length;return`
          <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
            <div class="panel-header compact">
              <div>
                <h3>${t.escapeHtml(O(a))}</h3>
                <span>Manager snapshot - ${T} loaded item${T===1?"":"s"}</span>
              </div>
              <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
            </div>
            <div class="manager-drill-list">
              ${y?be():c?X.map(G).join(""):Q.map(J).join("")}
              ${T?"":'<p class="muted">No loaded items match this view.</p>'}
            </div>
          </section>
        `}let r=e.find(c=>c.userId===n),o=V(n,a),s=L(n,a),b=a==="converted_requests";return`
        <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
          <div class="panel-header compact">
            <div>
              <h3>${t.escapeHtml(r?.name||t.teamMemberName(n))}</h3>
              <span>${t.escapeHtml(O(a))} - ${b?s.length:o.length} loaded item${(b?s.length:o.length)===1?"":"s"}</span>
            </div>
            <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
          </div>
          <div class="manager-drill-list">
            ${b?s.map(G).join("")||'<p class="muted">No loaded requests match this view.</p>':o.map(J).join("")||'<p class="muted">No loaded work orders match this view.</p>'}
          </div>
        </section>
      `}function K(){let e=d();return[["Critical Open",e.filter(q),"summary_critical"],["Stale 7d+",e.filter(k),"summary_stale"],["Follow-up Needed",e.filter(w),"summary_follow_up"],["New Requests",_(),"summary_requests"],["Stale Requests",_().filter(D),"summary_stale_requests"],["Unassigned",e.filter(a=>!a.assigned_to),"summary_unassigned"]].map(([a,r,o])=>({label:a,count:r.length,metric:o})).sort((a,r)=>r.count-a.count||a.label.localeCompare(r.label))}function be(){let e=v().filter(f).length,n=d().length;return`
        <article class="manager-report-card">
          <strong>${I()}%</strong>
          <span>${e} completed since Sunday against ${n} currently open.</span>
          <small>Use this as a manager signal, not a productivity score. It depends on work mix, staffing, and request volume.</small>
        </article>
      `}function $e(){let e=v().filter(s=>h(s,p(7))).length,n=v().filter(s=>h(s,p(30))).length,a=_().map(H),r=a.length?Math.round(a.reduce((s,b)=>s+b,0)/a.length):0,o=N().filter(s=>s.overloadLevel!=="normal").length;return`
        <section class="manager-trend-panel relationship-detail asset">
          <div class="panel-header compact">
            <h3>Manager Trends</h3>
            <span>Loaded snapshot</span>
          </div>
          <div class="manager-trend-grid">
            <article><strong>${e}</strong><span>Completed 7d</span></article>
            <article><strong>${n}</strong><span>Completed 30d</span></article>
            <article><strong>${r}d</strong><span>Avg request age</span></article>
            <article><strong>${o}</strong><span>Workloads to review</span></article>
          </div>
        </section>
      `}function M(e,n,a,r="normal"){return`
        <article class="manager-intel-card intel-${t.escapeHtml(r)}">
          <span>${t.escapeHtml(e)}</span>
          <strong>${t.escapeHtml(n)}</strong>
          <small>${t.escapeHtml(a)}</small>
        </article>
      `}function U(e,n,a){return`
        <article class="manager-signal-list">
          <strong>${t.escapeHtml(e)}</strong>
          <div>
            ${n.slice(0,5).map(r=>`<span>${t.escapeHtml(r)}</span>`).join("")||`<span>${t.escapeHtml(a)}</span>`}
          </div>
        </article>
      `}function qe(){let e=j(),n=x(),a=t.getSchedulesReady?.()!==!1,r=B(),o=P(),s=e.down.map(y=>y.name||"Unnamed equipment"),b=e.degraded.map(y=>y.name||"Unnamed equipment"),c=[...n.overdue,...n.dueSoon].map(y=>y.title||y.name||y.assets?.name||"PM schedule");return`
        <section class="manager-intelligence-panel relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Operations Intelligence</h3>
              <span>Exception-first view across equipment, PM, request flow, and work age.</span>
            </div>
          </div>
          <div class="manager-intel-grid">
            ${M("Equipment Risk",e.down.length+e.degraded.length,`${e.down.length} down, ${e.degraded.length} degraded, ${e.watch.length} watch`,e.down.length?"danger":e.degraded.length?"watch":"normal")}
            ${a?M("PM Risk",n.overdue.length+n.dueSoon.length,`${n.overdue.length} overdue, ${n.dueSoon.length} due in 7 days`,n.overdue.length?"danger":n.dueSoon.length?"watch":"normal"):M("PM Risk","Unavailable","PM schedules could not be loaded.","watch")}
            ${M("Request Flow",`${r.converted}/${r.submitted+r.converted}`,`${r.submitted} new, ${r.converted} converted, ${r.stale} stale`,r.stale?"watch":"normal")}
            ${M("Aging Load",o.stale+o.old,`${o.fresh} fresh, ${o.watch} 3-7d, ${o.stale} 8-14d, ${o.old} 15d+`,o.old?"danger":o.stale?"watch":"normal")}
          </div>
          <div class="manager-signal-grid">
            ${U("Down Equipment",s,"No equipment marked offline/down.")}
            ${U("Degraded Equipment",b,"No equipment marked degraded.")}
            ${U("PM To Watch",a?c:[],a?"No PM schedules due soon.":"PM schedules unavailable.")}
          </div>
        </section>
      `}function we(){return`
        <section class="manager-report-panel relationship-detail procedure">
          <div class="panel-header compact">
            <h3>Manager Report</h3>
            <span>Use Export CSV from this screen for the current loaded data.</span>
          </div>
          <div class="manager-report-grid">
            <article><strong>Focus</strong><span>Critical, stale, follow-up, unassigned, and request intake are the first review path.</span></article>
            <article><strong>Action</strong><span>Click work rows to open the work order. Click request rows to jump to the request queue.</span></article>
            <article><strong>Limit</strong><span>Metrics are a live operational snapshot, not payroll or performance discipline.</span></article>
          </div>
        </section>
      `}function Me(){return`
        <section class="manager-attention-panel relationship-detail warning">
          <div class="panel-header compact">
            <h3>Manager Attention</h3>
            <span>Review first</span>
          </div>
          <div class="manager-attention-list">
            ${K().map(n=>`
              <button type="button" class="manager-attention-card ${n.count?"":"empty"}" data-manager-drill-user="${i}" data-manager-drill-metric="${t.escapeHtml(n.metric)}">
                <span>${t.escapeHtml(n.label)}</span>
                <strong>${n.count}</strong>
              </button>
            `).join("")}
          </div>
        </section>
      `}function ke(){let e=N();return`
        <section class="manager-dashboard" aria-label="Manager dashboard">
          <div class="queue-context-card manager-context-card">
            <div>
              <strong>Manager Beta Dashboard</strong>
              <span>Operational snapshot for workload, request intake, and team follow-up.</span>
            </div>
            <small>${t.getManagerCompletedWorkReady&&!t.getManagerCompletedWorkReady()?"Recent completed work is still loading or needs refresh.":"Completed metrics include recent manager history when loaded."}</small>
          </div>
          <div class="manager-metric-grid">
            ${z().map(ge).join("")}
          </div>
          ${qe()}
          ${Me()}
          ${$e()}
          <section class="manager-tech-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Technician Workload</h3>
              <span>${e.length} people</span>
            </div>
            <div class="manager-tech-list">
              ${e.map(pe).join("")||'<p class="muted">No team members loaded yet.</p>'}
            </div>
          </section>
          ${we()}
          ${_e(e)}
        </section>
      `}return{renderManagerDashboard:ke,metricWorkOrders:V,managerAttentionItems:K,managerSummaryCards:z,managerCompletionRate:I,technicianRows:N,metricRequests:L,equipmentHealthSummary:j,preventiveSummary:x,requestFunnel:B,workAgeBuckets:P}}window.MaintainOpsManagerDashboardDisplay={createManagerDashboardDisplayHelpers:l}})();var Fe=Le(Z());})();
//# sourceMappingURL=managerFeature.df8d38c83b.js.map
