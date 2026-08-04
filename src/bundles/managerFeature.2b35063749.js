(()=>{var De=Object.create;var Y=Object.defineProperty;var Ce=Object.getOwnPropertyDescriptor;var He=Object.getOwnPropertyNames;var Se=Object.getPrototypeOf,We=Object.prototype.hasOwnProperty;var Ae=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(m){throw t=0,m}};var Le=(i,t,m,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let g of He(t))!We.call(i,g)&&g!==m&&Y(i,g,{get:()=>t[g],enumerable:!(c=Ce(t,g))||c.enumerable});return i};var Ie=(i,t,m)=>(m=i!=null?De(Se(i)):{},Le(t||!i||!i.__esModule?Y(m,"default",{value:i,enumerable:!0}):m,i));var Z=Ae((Te,U)=>{(function(){function i(t={}){let m=t.documentRef||document,c=t.state,g=typeof t.renderWorkspace=="function"?t.renderWorkspace:()=>{},p=t.windowRef||(typeof window<"u"?window:null),h=t.storage||(typeof localStorage<"u"?localStorage:null);if(!c)return;function f(){let u=m.querySelector("[data-manager-drill-in]");!u||typeof u.scrollIntoView!="function"||u.scrollIntoView({behavior:"smooth",block:"start"})}m.querySelectorAll("[data-manager-drill-user][data-manager-drill-metric]").forEach(u=>{u.addEventListener("click",()=>{if(c.setManagerDashboardUserId(u.dataset.managerDrillUser||""),c.setManagerDashboardMetric(u.dataset.managerDrillMetric||"open"),g(),p&&typeof p.requestAnimationFrame=="function"){p.requestAnimationFrame(f);return}f()})}),m.querySelectorAll("[data-manager-drill-clear]").forEach(u=>{u.addEventListener("click",()=>{c.setManagerDashboardUserId(""),c.setManagerDashboardMetric("open"),g()})}),m.querySelectorAll("[data-manager-request-jump]").forEach(u=>{u.addEventListener("click",()=>{typeof c.setActiveSection=="function"&&(c.setActiveSection("requests"),h?.setItem?.("maintainops.activeSection","requests")),typeof c.setRequestViewFilter=="function"&&c.setRequestViewFilter(u.dataset.managerRequestJump==="converted"?"converted":"active"),g()})})}window.MaintainOpsWorkspaceManagerDashboardEvents={bindWorkspaceManagerDashboardEvents:i},typeof U<"u"&&(U.exports={bindWorkspaceManagerDashboardEvents:i})})()});(function(){function i(t,m={}){let{companyId:c,locationId:g,locationsReady:p,selectClause:h,cutoffIso:f,limit:u=200}=m,b=t.from("work_orders").select(h||"*").eq("company_id",c).eq("status","completed").gte("completed_at",f).order("completed_at",{ascending:!1,nullsFirst:!1}).order("created_at",{ascending:!1}).limit(u);return p&&g&&(b=b.eq("location_id",g)),b}window.MaintainOpsManagerDashboardService={fetchRecentCompletedWorkOrders:i}})();(function(){function i(t){let c="__summary__";function g(){let e=new Date;return e.setHours(0,0,0,0),e}function p(e){return new Date(g().getTime()-e*864e5)}function h(e,a){return!!(e.completed_at&&new Date(e.completed_at)>=a)}function f(e){if(!e.completed_at)return!1;let a=new Date(e.completed_at),n=t.sundayWeekRange();return Number.isFinite(a.getTime())&&a>=n.start&&a<n.end}function u(e){let a=new Date(e.created_at||Date.now()).getTime();return Number.isFinite(a)?Math.max(0,Math.round((Date.now()-a)/864e5)):0}function b(e){return{critical:4,high:3,medium:2,low:1}[String(e||"").toLowerCase()]||0}function $(e){return e.status!=="completed"&&b(e.priority)>=4}function ee(e){return e.status!=="completed"&&b(e.priority)>=3}function w(e){return e.status!=="completed"&&u(e)>=7}function q(e){return e.status!=="completed"&&!!e.follow_up_needed}function d(){return t.getWorkOrders().filter(e=>t.matchesActiveLocation(e)&&e.status!=="completed")}function v(){let e=new Map;return[...t.getWorkOrders(),...typeof t.getManagerCompletedWorkOrders=="function"?t.getManagerCompletedWorkOrders():[]].forEach(n=>{n?.id&&t.matchesActiveLocation(n)&&n.status==="completed"&&e.set(n.id,n)}),[...e.values()]}function y(){return t.getMaintenanceRequests().filter(e=>t.matchesActiveLocation(e)&&!t.isConvertedRequest(e)&&e.status==="submitted")}function M(){return t.getMaintenanceRequests().filter(e=>t.matchesActiveLocation(e)&&t.isConvertedRequest(e))}function te(){return(typeof t.getAssets=="function"?t.getAssets():[]).filter(t.matchesActiveLocation)}function ne(){return(typeof t.getPreventiveSchedules=="function"?t.getPreventiveSchedules():[]).filter(t.matchesActiveLocation)}function F(e){return d().filter(a=>t.isWorkOrderAssignedToUser(a,e))}function ae(e){return e.completed_by||e.assigned_to||e.created_by||""}function re(e){let a=ae(e);return a?t.teamMemberName(a):"Completion owner unknown"}function C(e){let a=new Date(e.created_at||Date.now()).getTime();return Number.isFinite(a)?Math.max(0,Math.round((Date.now()-a)/864e5)):0}function k(e){return C(e)>=2}function oe(e){let a=e.converted_by||e.created_by||"";return a?t.teamMemberName(a):"Converter not recorded"}function se(e){if(!e)return null;let a=new Date(`${String(e).slice(0,10)}T00:00:00`);return Number.isFinite(a.getTime())?a:null}function H(e){let a=se(e.next_due_at||e.due_at);if(!a)return"unscheduled";let n=Math.round((a.getTime()-g().getTime())/864e5);return n<0?"overdue":n<=7?"due_soon":"planned"}function E(){let e={fresh:0,watch:0,stale:0,old:0};return d().forEach(a=>{let n=u(a);n<=2?e.fresh+=1:n<=7?e.watch+=1:n<=14?e.stale+=1:e.old+=1}),e}function P(){return{submitted:y().length,converted:M().length,stale:y().filter(k).length}}function B(){let e=te(),a=e.filter(s=>s.status==="offline"),n=e.filter(s=>s.status==="degraded"),r=e.filter(s=>s.status==="watch"),o=e.filter(s=>s.status==="running");return{total:e.length,running:o,watch:r,degraded:n,down:a}}function j(){let e=ne(),a=e.filter(o=>H(o)==="overdue"),n=e.filter(o=>H(o)==="due_soon"),r=e.filter(o=>H(o)==="unscheduled");return{total:e.length,overdue:a,dueSoon:n,unscheduled:r}}function S(){return typeof t.getManagerDashboardUserId=="function"?t.getManagerDashboardUserId():""}function W(){return typeof t.getManagerDashboardMetric=="function"?t.getManagerDashboardMetric():"open"}function x(e){return{open:"Open Work",in_progress:"In Progress",blocked:"Blocked",overdue:"Overdue",completed_week:"Done This Week",completed_month:"Done 30d",converted_requests:"Converted Requests",summary_open:"Open Work",summary_requests:"New Requests",summary_overdue:"Overdue",summary_unassigned:"Unassigned",summary_critical:"Critical Open",summary_high_priority:"High Priority",summary_stale:"Stale 7d+",summary_follow_up:"Follow-up Needed",summary_completed_week:"Completed Week",summary_completed_month:"Completed Month",summary_converted_requests:"Converted Requests",summary_stale_requests:"Stale Requests",summary_completion_rate:"Weekly Completion Rate"}[e]||"Open Work"}function le(e){return e==="summary_overdue"?d().filter(a=>t.getDueState(a)?.className==="overdue"):e==="summary_unassigned"?d().filter(a=>!a.assigned_to):e==="summary_critical"?d().filter($):e==="summary_high_priority"?d().filter(ee):e==="summary_stale"?d().filter(w):e==="summary_follow_up"?d().filter(q):e==="summary_completed_week"?v().filter(f):e==="summary_completed_month"?v().filter(a=>h(a,p(30))):d()}function ie(e){return e==="summary_converted_requests"?M():e==="summary_stale_requests"?y().filter(k):y()}function O(e,a){let n=F(e),r=v().filter(o=>o.completed_by===e||o.assigned_to===e);return a==="in_progress"?n.filter(o=>o.status==="in_progress"):a==="blocked"?n.filter(o=>o.status==="blocked"):a==="overdue"?n.filter(o=>t.getDueState(o)?.className==="overdue"):a==="critical"?n.filter($):a==="stale"?n.filter(w):a==="follow_up"?n.filter(q):a==="completed_week"?r.filter(f):a==="completed_month"?r.filter(o=>h(o,p(30))):n}function A(e,a){return a==="converted_requests"?M().filter(n=>n.converted_by===e||!n.converted_by&&n.created_by===e):[]}function L(){let e=v().filter(f).length,n=d().length+e;return n?Math.round(e/n*100):0}function ce(e){return e.critical>0||e.overdue>=3||e.blocked>=2||e.open>=10?"high":e.overdue>0||e.blocked>0||e.open>=6||e.followUp>0?"watch":"normal"}function ue(e){return{high:"Needs manager review",watch:"Watch workload",normal:"Normal load"}[e]||"Normal load"}function de(e){return t.getWorkOrders().filter(n=>t.matchesActiveLocation(n)&&(t.isWorkOrderAssignedToUser(n,e)||n.completed_by===e||n.created_by===e)).map(n=>n.completed_at||n.updated_at||n.created_at).filter(Boolean).map(n=>new Date(n)).filter(n=>Number.isFinite(n.getTime())).sort((n,r)=>r-n)[0]||null}function me(e){if(!e.length)return 0;let a=Date.now(),n=e.reduce((r,o)=>{let s=new Date(o.created_at||a).getTime();return r+Math.max(0,Math.round((a-s)/864e5))},0);return Math.round(n/e.length)}function ge(e){return e?e.toLocaleString([],{month:"numeric",day:"numeric",year:"2-digit",hour:"numeric",minute:"2-digit"}):"No recent activity"}function V(){let e=t.getWorkOrderDashboardCounts()||{},a=t.getRequestDashboardCounts()||{},n=d(),r=d().filter(s=>!s.assigned_to).length,o=y().filter(k).length;return[["Open Work",e.activeWork??d().length,"Current active work in this location.","summary_open"],["New Requests",a.active??y().length,"Submitted requests waiting for review.","summary_requests"],["Overdue",e.overdue??d().filter(s=>t.getDueState(s)?.className==="overdue").length,"Open work past due.","summary_overdue"],["Unassigned",r,"Open work with no internal owner.","summary_unassigned"],["Critical Open",n.filter($).length,"Critical open work needing manager attention.","summary_critical"],["Stale 7d+",n.filter(w).length,"Open work older than 7 days.","summary_stale"],["Follow-up Needed",n.filter(q).length,"Open work marked for follow-up.","summary_follow_up"],["Completed Week",e.completedWeek??v().filter(f).length,"Work completed since Sunday.","summary_completed_week"],["Completed Month",e.completedMonth??v().filter(s=>h(s,p(30))).length,"Work completed in the last 30 days.","summary_completed_month"],["Converted Requests",a.converted??M().length,"Requests already turned into work orders.","summary_converted_requests"],["Stale Requests",o,"Submitted requests older than 2 days.","summary_stale_requests"],["Weekly Completion Rate",`${L()}%`,"Completed since Sunday compared with current open work.","summary_completion_rate"]]}function I(){let e=p(30);return t.getCompanyMembers().filter(a=>["technician","production","manager","admin"].includes(t.normalizeRole(a.role))).map(a=>{let n=a.user_id,r=F(n),o=v().filter(l=>l.completed_by===n||l.assigned_to===n),s=A(n,"converted_requests"),_=de(n);return{userId:n,name:t.teamMemberName(n),role:t.roleLabel(a.role),open:r.length,inProgress:r.filter(l=>l.status==="in_progress").length,blocked:r.filter(l=>l.status==="blocked").length,overdue:r.filter(l=>t.getDueState(l)?.className==="overdue").length,critical:r.filter($).length,followUp:r.filter(q).length,completedWeek:o.filter(f).length,completedMonth:o.filter(l=>h(l,e)).length,convertedRequests:s.length,averageAge:me(r),latestActivity:ge(_)}}).map(a=>{let n=ce(a);return{...a,overloadLevel:n,overloadLabel:ue(n)}}).sort((a,n)=>({high:2,watch:1,normal:0})[n.overloadLevel]-{high:2,watch:1,normal:0}[a.overloadLevel]||n.open-a.open||n.overdue-a.overdue||a.name.localeCompare(n.name))}function pe([e,a,n,r]){return`
        <button type="button" class="manager-metric-card${S()===c&&W()===r?" active":""}" data-manager-drill-user="${c}" data-manager-drill-metric="${t.escapeHtml(r)}">
          <span>${t.escapeHtml(e)}</span>
          <strong>${t.escapeHtml(a)}</strong>
          <small>${t.escapeHtml(n)}</small>
        </button>
      `}function fe(e){let a=S(),n=W(),r=o=>e.userId===a&&o===n?" active":"";return`
        <article class="manager-tech-row workload-${t.escapeHtml(e.overloadLevel)}${e.userId===a?" selected":""}">
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
      `}function R(e){if(!e)return"Date unset";let a=new Date(e);return Number.isFinite(a.getTime())?a.toLocaleDateString():String(e)}function he(e){return e.title||e.description||e.name||"Untitled work order"}function z(e){let n=(t.getDueState(e)||{}).label||(e.due_at?`Due ${R(e.due_at)}`:"Due date unset"),r=e.assigned_to?t.teamMemberName(e.assigned_to):"Unassigned",o=e.status==="completed"?"completed":`${u(e)}d open`,s=e.status==="completed"?` - Completed by ${re(e)}${e.completed_at?` on ${R(e.completed_at)}`:""}`:"";return`
        <article class="mini-work-order manager-drill-work-order" data-mini-work-order="${t.escapeHtml(e.id)}">
          <strong>${t.escapeHtml(he(e))}</strong>
          <span>${t.escapeHtml(t.statusLabel?t.statusLabel(e.status):e.status||"Open")} - ${t.escapeHtml(e.priority||"medium")} - ${t.escapeHtml(r)}</span>
          <small>${t.escapeHtml(n)} - ${t.escapeHtml(o)} - Created ${t.escapeHtml(R(e.created_at))}${e.follow_up_needed?" - follow-up":""}${t.escapeHtml(s)}</small>
        </article>
      `}function ve(e){return e.title||e.description||"Untitled request"}function ye(e){return e.requested_by_name||e.requester_name||"Requester unknown"}function _e(e){return e.assets?.name||e.equipment_note||"Machine / area not set"}function J(e){let a=t.isConvertedRequest(e),n=`${C(e)}d old`;return`
        <article class="mini-work-order manager-drill-request" data-manager-request-jump="${t.escapeHtml(a?"converted":"active")}">
          <strong>${t.escapeHtml(ve(e))}</strong>
          <span>${t.escapeHtml(e.priority||"Medium")} priority - ${t.escapeHtml(a?"converted":"submitted")}</span>
          <small>${t.escapeHtml(_e(e))} - ${t.escapeHtml(ye(e))} - ${t.escapeHtml(R(e.created_at))} - ${t.escapeHtml(n)}${a?` - ${t.escapeHtml(oe(e))}`:""}</small>
        </article>
      `}function be(e){let a=S();if(!a)return"";let n=W();if(a===c){let l=n==="summary_requests"||n==="summary_converted_requests"||n==="summary_stale_requests",K=n==="summary_completion_rate",Q=l?[]:le(n),X=l?ie(n):[],T=K?1:l?X.length:Q.length;return`
          <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
            <div class="panel-header compact">
              <div>
                <h3>${t.escapeHtml(x(n))}</h3>
                <span>Manager snapshot - ${T} loaded item${T===1?"":"s"}</span>
              </div>
              <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
            </div>
            <div class="manager-drill-list">
              ${K?$e():l?X.map(J).join(""):Q.map(z).join("")}
              ${T?"":'<p class="muted">No loaded items match this view.</p>'}
            </div>
          </section>
        `}let r=e.find(l=>l.userId===a),o=O(a,n),s=A(a,n),_=n==="converted_requests";return`
        <section class="manager-drill-panel relationship-detail comment" data-manager-drill-in>
          <div class="panel-header compact">
            <div>
              <h3>${t.escapeHtml(r?.name||t.teamMemberName(a))}</h3>
              <span>${t.escapeHtml(x(n))} - ${_?s.length:o.length} loaded item${(_?s.length:o.length)===1?"":"s"}</span>
            </div>
            <button type="button" class="secondary-button small" data-manager-drill-clear>Clear</button>
          </div>
          <div class="manager-drill-list">
            ${_?s.map(J).join("")||'<p class="muted">No loaded requests match this view.</p>':o.map(z).join("")||'<p class="muted">No loaded work orders match this view.</p>'}
          </div>
        </section>
      `}function G(){let e=d();return[["Critical Open",e.filter($),"summary_critical"],["Stale 7d+",e.filter(w),"summary_stale"],["Follow-up Needed",e.filter(q),"summary_follow_up"],["New Requests",y(),"summary_requests"],["Stale Requests",y().filter(k),"summary_stale_requests"],["Unassigned",e.filter(n=>!n.assigned_to),"summary_unassigned"]].map(([n,r,o])=>({label:n,count:r.length,metric:o})).sort((n,r)=>r.count-n.count||n.label.localeCompare(r.label))}function $e(){let e=v().filter(f).length,a=d().length;return`
        <article class="manager-report-card">
          <strong>${L()}%</strong>
          <span>${e} completed since Sunday against ${a} currently open.</span>
          <small>Use this as a manager signal, not a productivity score. It depends on work mix, staffing, and request volume.</small>
        </article>
      `}function qe(){let e=v().filter(s=>h(s,p(7))).length,a=v().filter(s=>h(s,p(30))).length,n=y().map(C),r=n.length?Math.round(n.reduce((s,_)=>s+_,0)/n.length):0,o=I().filter(s=>s.overloadLevel!=="normal").length;return`
        <section class="manager-trend-panel relationship-detail asset">
          <div class="panel-header compact">
            <h3>Manager Trends</h3>
            <span>Loaded snapshot</span>
          </div>
          <div class="manager-trend-grid">
            <article><strong>${e}</strong><span>Completed 7d</span></article>
            <article><strong>${a}</strong><span>Completed 30d</span></article>
            <article><strong>${r}d</strong><span>Avg request age</span></article>
            <article><strong>${o}</strong><span>Workloads to review</span></article>
          </div>
        </section>
      `}function D(e,a,n,r="normal"){return`
        <article class="manager-intel-card intel-${t.escapeHtml(r)}">
          <span>${t.escapeHtml(e)}</span>
          <strong>${t.escapeHtml(a)}</strong>
          <small>${t.escapeHtml(n)}</small>
        </article>
      `}function N(e,a,n){return`
        <article class="manager-signal-list">
          <strong>${t.escapeHtml(e)}</strong>
          <div>
            ${a.slice(0,5).map(r=>`<span>${t.escapeHtml(r)}</span>`).join("")||`<span>${t.escapeHtml(n)}</span>`}
          </div>
        </article>
      `}function we(){let e=B(),a=j(),n=P(),r=E(),o=e.down.map(l=>l.name||"Unnamed equipment"),s=e.degraded.map(l=>l.name||"Unnamed equipment"),_=[...a.overdue,...a.dueSoon].map(l=>l.title||l.name||l.assets?.name||"PM schedule");return`
        <section class="manager-intelligence-panel relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Operations Intelligence</h3>
              <span>Exception-first view across equipment, PM, request flow, and work age.</span>
            </div>
          </div>
          <div class="manager-intel-grid">
            ${D("Equipment Risk",e.down.length+e.degraded.length,`${e.down.length} down, ${e.degraded.length} degraded, ${e.watch.length} watch`,e.down.length?"danger":e.degraded.length?"watch":"normal")}
            ${D("PM Risk",a.overdue.length+a.dueSoon.length,`${a.overdue.length} overdue, ${a.dueSoon.length} due in 7 days`,a.overdue.length?"danger":a.dueSoon.length?"watch":"normal")}
            ${D("Request Flow",`${n.converted}/${n.submitted+n.converted}`,`${n.submitted} new, ${n.converted} converted, ${n.stale} stale`,n.stale?"watch":"normal")}
            ${D("Aging Load",r.stale+r.old,`${r.fresh} fresh, ${r.watch} 3-7d, ${r.stale} 8-14d, ${r.old} 15d+`,r.old?"danger":r.stale?"watch":"normal")}
          </div>
          <div class="manager-signal-grid">
            ${N("Down Equipment",o,"No equipment marked offline/down.")}
            ${N("Degraded Equipment",s,"No equipment marked degraded.")}
            ${N("PM To Watch",_,"No PM schedules due soon.")}
          </div>
        </section>
      `}function Me(){return`
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
      `}function ke(){return`
        <section class="manager-attention-panel relationship-detail warning">
          <div class="panel-header compact">
            <h3>Manager Attention</h3>
            <span>Review first</span>
          </div>
          <div class="manager-attention-list">
            ${G().map(a=>`
              <button type="button" class="manager-attention-card ${a.count?"":"empty"}" data-manager-drill-user="${c}" data-manager-drill-metric="${t.escapeHtml(a.metric)}">
                <span>${t.escapeHtml(a.label)}</span>
                <strong>${a.count}</strong>
              </button>
            `).join("")}
          </div>
        </section>
      `}function Re(){let e=I();return`
        <section class="manager-dashboard" aria-label="Manager dashboard">
          <div class="queue-context-card manager-context-card">
            <div>
              <strong>Manager Beta Dashboard</strong>
              <span>Operational snapshot for workload, request intake, and team follow-up.</span>
            </div>
            <small>${t.getManagerCompletedWorkReady&&!t.getManagerCompletedWorkReady()?"Recent completed work is still loading or needs refresh.":"Completed metrics include recent manager history when loaded."}</small>
          </div>
          <div class="manager-metric-grid">
            ${V().map(pe).join("")}
          </div>
          ${we()}
          ${ke()}
          ${qe()}
          <section class="manager-tech-panel relationship-detail comment">
            <div class="panel-header compact">
              <h3>Technician Workload</h3>
              <span>${e.length} people</span>
            </div>
            <div class="manager-tech-list">
              ${e.map(fe).join("")||'<p class="muted">No team members loaded yet.</p>'}
            </div>
          </section>
          ${Me()}
          ${be(e)}
        </section>
      `}return{renderManagerDashboard:Re,metricWorkOrders:O,managerAttentionItems:G,managerSummaryCards:V,managerCompletionRate:L,technicianRows:I,metricRequests:A,equipmentHealthSummary:B,preventiveSummary:j,requestFunnel:P,workAgeBuckets:E}}window.MaintainOpsManagerDashboardDisplay={createManagerDashboardDisplayHelpers:i}})();var Ee=Ie(Z());})();
//# sourceMappingURL=managerFeature.2b35063749.js.map
