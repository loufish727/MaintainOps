(()=>{var K=Object.create;var j=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,X=Object.prototype.hasOwnProperty;var Y=(l,e)=>()=>{try{return e||l((e={exports:{}}).exports,e),e.exports}catch(i){throw e=0,i}};var H=(l,e,i,c)=>{if(e&&typeof e=="object"||typeof e=="function")for(let p of Z(e))!X.call(l,p)&&p!==i&&j(l,p,{get:()=>e[p],enumerable:!(c=V(e,p))||c.enumerable});return l};var ee=(l,e,i)=>(i=l!=null?K(J(l)):{},H(e||!l||!l.__esModule?j(i,"default",{value:l,enumerable:!0}):i,l));var Q=Y((ae,T)=>{(function(){function l({escapeHtml:e,formatBytes:i}){let c={"asset-documents":"Equipment files","company-logos":"Company logos","maintenance-request-photos":"Request photos","part-documents":"Part files","work-order-photos":"Work order photos","work-order-documents":"Work order documents","message-files":"Message attachments"},p={company:"Company",equipment:"Equipment",part:"Part",request:"Request",work_order:"Work Order",work_order_document:"Work Order",message:"Conversation"};function u(t){let a=Number(t)||0;if(!a)return"0 B";if(a>=1099511627776){let n=a/1099511627776;return`${n.toFixed(Number.isInteger(n)?0:1)} TB`}if(a>=1073741824){let n=a/1073741824;return`${n.toFixed(Number.isInteger(n)?0:1)} GB`}return i(a)||"0 B"}function b(t){let a=Number(t)||0;return a<=0?"0%":a<.01?"<0.01%":`${a.toFixed(a>=10?1:2)}%`}function M(t){let a=t.map(o=>Number(o)||0).sort((o,s)=>o-s);if(!a.length)return 0;let n=Math.floor(a.length/2);return a.length%2?a[n]:(a[n-1]+a[n])/2}function x(t){let a=Number(t)||0;if(a<=0)return"not enough usage history";let n=Math.floor(a/12),o=Math.floor(a%12),s=Math.max(Math.round((a-Math.floor(a))*30.4375),0),r=[];return n&&r.push(`${n} ${n===1?"year":"years"}`),o&&r.push(`${o} ${o===1?"month":"months"}`),(s||!r.length)&&r.push(`${s} ${s===1?"day":"days"}`),r.join(", ")}function S(t){return c[t]||String(t||"Storage")}function I(t){return p[t]||String(t||"Record")}function R(t,a,n){return`
        <article class="storage-metric">
          <span>${e(t)}</span>
          <strong>${e(a)}</strong>
          <small>${e(n||"")}</small>
        </article>
      `}function D(){return`
        <section class="storage-rules">
          <div class="settings-section-heading">
            <div>
              <strong>Storage Rules</strong>
              <span>Upload caps and optimization targets</span>
            </div>
          </div>
          <div class="storage-rule-list">
            ${[{label:"Work Order Photos",cap:"Photos are automatically resized before upload",optimize:"Stored at 768px, target near 256 KB"},{label:"Request Photos",cap:"Photos are automatically resized before upload",optimize:"Stored at 768px, target near 256 KB"},{label:"Equipment Images",cap:"Images are resized before upload",optimize:"Target near 1 MB; non-image equipment files over 25 MB are blocked"},{label:"Part Images",cap:"Images are resized before upload",optimize:"Target near 1 MB; non-image part files over 25 MB are blocked"},{label:"Documents",cap:"Non-image files over 25 MB are blocked",optimize:"PDF, Word, Excel, CSV, and text files are stored as uploaded"},{label:"ZIP Attachments",cap:"Up to 25 MB per ZIP; 50 files and 100 MB expanded per batch",optimize:"Unpacked for review; photos are resized and supported documents kept unchanged"},{label:"Company Logos",cap:"JPG, PNG, WebP, GIF, HEIC, and HEIF images are accepted",optimize:"Automatically resized to 1200px when possible"}].map(a=>`
              <article class="storage-rule-row">
                <strong>${e(a.label)}</strong>
                <span>${e(a.cap)}</span>
                <small>${e(a.optimize)}</small>
              </article>
            `).join("")}
          </div>
        </section>
      `}function d(t,a){let n=Number(t.size_bytes)||0,o=a?n/a*100:0;return`
        <article class="storage-bucket-row">
          <div>
            <strong>${e(S(t.bucket_id))}</strong>
            <span>${Number(t.file_count)||0} files</span>
          </div>
          <div class="storage-bar" aria-label="${e(S(t.bucket_id))} usage">
            <span style="width: ${Math.max(o,n?1:0).toFixed(2)}%"></span>
          </div>
          <strong>${e(u(n))}</strong>
        </article>
      `}function w(t){let a=t.link_section||"",n=t.linked_record_id||"",o=!!(a&&n);return`
        <article class="storage-file-row">
          <div class="storage-file-main">
            <strong title="${e(t.object_path||"")}">${e(t.file_name||t.object_path||"Stored file")}</strong>
            <span>${e(S(t.bucket_id))} - ${e(I(t.record_type))}</span>
          </div>
          <div class="storage-file-record">
            <span>${e(t.linked_record_label||"Linked record")}</span>
            ${o&&a==="messages"?`<button class="secondary-button small" data-open-work-message-thread="${e(n)}" type="button">Open conversation</button>`:o?`<button class="secondary-button small" data-storage-record-link data-storage-link-section="${e(a)}" data-storage-link-id="${e(n)}" data-storage-link-label="${e(t.linked_record_label||"")}" type="button">Open</button>`:""}
          </div>
          <strong class="storage-file-size">${e(u(t.size_bytes))}</strong>
        </article>
      `}function N(t){let n=t.slice(-12).map(f=>Number(f.size_bytes)||0);for(;n.length<12;)n.unshift(0);let s=t.slice(-12).reduce((f,k)=>{let h=Number(k.size_bytes)||0,F=Number(f?.size_bytes)||0;return h>F?k:f},null),r=Number(s?.size_bytes)||0,m=Number(s?.photo_count)||0,_=Math.max((Number(s?.file_count)||0)-m,0),y=M(n),$=Math.max(Number(t[t.length-1]?.remaining_bytes)||0,0),q=r>0?$/r:0,P=r>0?`At the largest monthly usage rate of ${u(r)} per month, the storage cap is estimated in ${x(q)}.`:"At the current usage rate, there is not enough usage history to estimate the storage cap.";return`
        <div class="storage-month-summary" aria-label="Last 12 months storage trend">
          <article>
            <span>Largest Month</span>
            <strong>${e(u(r))}/mo</strong>
            <small>${m} photos, ${_} files</small>
          </article>
          <article>
            <span>12 Month Median</span>
            <strong>${e(u(y))}/mo</strong>
          </article>
          <article class="storage-month-projection">
            <span>Cap Estimate</span>
            <strong>${e(x(q))}</strong>
            <small>${e(P)}</small>
          </article>
        </div>
      `}function E(t){let a=Array.isArray(t)?t:[],n=a.reduce((s,r)=>Math.max(s,Number(r.size_bytes)||0),0),o=a.reduce((s,r)=>Math.max(s,Number(r.cumulative_bytes)||0),0);return`
        <section class="storage-monthly-usage">
          <div class="settings-section-heading">
            <div>
              <strong>Month Over Month Usage</strong>
              <span>Last ${a.length||12} months</span>
            </div>
          </div>
          ${N(a)}
          <div class="storage-month-chart" role="img" aria-label="Month over month storage usage">
            ${a.map(s=>{let r=Number(s.size_bytes)||0,m=Number(s.cumulative_bytes)||0,_=Number(s.remaining_bytes)||0,y=n?Math.max(r/n*100,r?6:0):0,$=o?Math.max(m/o*100,m?6:0):0;return`
                <article class="storage-month-column" title="${e(s.month_label||s.month||"")}: ${e(u(r))} added, ${e(u(m))} total, ${e(u(_))} remaining">
                  <div class="storage-month-bars">
                    <span class="storage-month-cumulative" style="height: ${$.toFixed(2)}%"></span>
                    <span class="storage-month-added" style="height: ${y.toFixed(2)}%"></span>
                  </div>
                  <strong>${e(u(r))}</strong>
                  <small>${e(u(_))} left</small>
                  <span>${e(String(s.month_label||s.month||"").replace(" ",`
`))}</span>
                </article>
              `}).join("")||'<p class="muted">No monthly storage history available yet.</p>'}
          </div>
          <div class="storage-month-legend">
            <span><i class="storage-legend-added"></i>Added that month</span>
            <span><i class="storage-legend-cumulative"></i>Cumulative total</span>
            <span><i class="storage-legend-remaining"></i>Remaining storage</span>
          </div>
        </section>
      `}function O({canView:t,dashboard:a,ready:n,error:o}){if(!t)return"";let s=a||{},r=Number(s.total_bytes)||0,m=Number(s.allowance_bytes)||107374182400,_=Math.max(Number(s.remaining_bytes)||m-r,0),y=Number(s.photo_count)||0,$=Number(s.file_count)||0,q=Math.max($-y,0),P=Array.isArray(s.bucket_totals)?s.bucket_totals:[],f=Array.isArray(s.monthly_usage)?s.monthly_usage:[],k=Array.isArray(s.top_files)?s.top_files:[];return`
        <section class="storage-dashboard relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Storage Usage</h3>
              <span>${n?`${$} linked files tracked`:"loading storage usage"}</span>
            </div>
            <button class="secondary-button small" data-refresh-storage-dashboard type="button">Refresh</button>
          </div>
          ${o?`<p class="warning-text">${e(o)}</p>`:""}
          <div class="storage-metric-grid">
            ${R("Used",u(r),`${b(s.usage_percent)} of plan storage`)}
            ${R("Remaining",u(_),`${b(_/m*100)} open`)}
            ${R("Photos",`${y}`,"Image records linked to work, requests, equipment, and parts")}
            ${R("Files",`${q}`,"Non-photo files only")}
            ${R("Available",u(m),"Supabase Pro file storage")}
            ${R("Largest Files",`${k.length}/10`,"Top linked storage objects")}
          </div>
          ${D()}
          ${E(f)}
          <div class="storage-dashboard-grid">
            <section class="storage-breakdown">
              <div class="settings-section-heading">
                <div>
                  <strong>What Is Taking Space</strong>
                  <span>${P.length} buckets</span>
                </div>
              </div>
              <div class="storage-bucket-list">
                ${P.map(h=>d(h,r)).join("")||'<p class="muted">No linked files found for this company yet.</p>'}
              </div>
            </section>
            <section class="storage-largest-files">
              <div class="settings-section-heading">
                <div>
                  <strong>Top 10 Largest Files</strong>
                  <span>${k.length} shown</span>
                </div>
              </div>
              <div class="storage-file-list">
                ${k.map(w).join("")||'<p class="muted">No files to list yet.</p>'}
              </div>
            </section>
          </div>
        </section>
      `}return{renderStorageDashboardPanel:O}}window.MaintainOpsStorageDashboardDisplay={createStorageDashboardDisplayHelpers:l},typeof T<"u"&&(T.exports={createStorageDashboardDisplayHelpers:l})})()});(function(){function l({escapeHtml:e}){function i(c){return`
        <article class="setup-item ${c.ready?"ready":"needs-work"}">
          <div>
            <strong>${e(c.name)}</strong>
            <span>${e(c.detail)}</span>
            ${c.action?`<button class="secondary-button setup-action-button" data-setup-action="${e(c.action)}" type="button">${e(c.actionLabel)}</button>`:""}
          </div>
          <span class="chip ${c.ready?"completed":"blocked"}">${c.ready?"ready":"setup"}</span>
        </article>
      `}return{renderSetupItem:i}}window.MaintainOpsSetupDisplay={createSetupDisplayHelpers:l}})();(function(){function l(e){function i(){return[{name:"Supabase config",ready:!!(e.getSupabaseUrl()&&e.getSupabaseAnonKey()),detail:e.getSupabaseUrl()||"Missing supabase-config.js"},{name:"Company data",ready:!!e.getActiveCompanyId(),detail:e.getActiveCompanyId()?"Active tenant selected":"Create or select a company"},{name:"Requests",ready:e.getRequestsReady(),detail:e.getRequestsReady()?"Stored in maintenance_requests":"Run step-next-maintenance-requests.sql"},{name:"Public request QR links",ready:e.getPublicRequestLinksReady(),detail:e.getPublicRequestLinksReady()?"External location intake is available":"Run step-next-public-request-links.sql"},{name:"Preventive schedules",ready:e.getSchedulesReady(),detail:e.getSchedulesReady()?"PM schedules available":"Run step-next-preventive-schedules.sql"},{name:"Procedure Checklists",ready:e.getProceduresReady(),detail:e.getProceduresReady()?"Procedure checklists available":"Run step-next-procedures.sql"},{name:"Part costs",ready:e.getPartCostsReady(),detail:e.getPartCostsReady()?"Unit costs available":"Run step-next-part-costs.sql"},{name:"Part sources",ready:e.getPartSuppliersReady(),detail:e.getPartSuppliersReady()?"Vendor/source names available":"Run step-next-part-suppliers.sql"},{name:"Part files",ready:e.getPartDocumentsReady(),detail:e.getPartDocumentsReady()?"Receipts and invoices can be filed with parts":"Run step-next-part-documents.sql"},{name:"App issue reports",ready:e.getAppIssueReportsReady(),detail:e.getAppIssueReportsReady()?"Live tester feedback can be captured":"Run step-next-app-issue-reports.sql"},{name:"Message center",ready:e.getMessagesReady(),detail:e.getMessagesReady()?"Company, location, and direct message threads available":"Run step-next-message-center.sql"},{name:"Message work links",ready:e.getMessageWorkOrderLinksReady(),detail:e.getMessageWorkOrderLinksReady()?"Message threads can link back to work orders":"Run step-next-message-work-order-links.sql"},{name:"Work outcomes",ready:e.getOutcomesReady(),detail:e.getOutcomesReady()?"Cause/resolution/follow-up available":"Run step-next-work-order-outcomes.sql"},{name:"Safety checks",ready:e.getSafetyChecksReady(),detail:e.getSafetyChecksReady()?"Asset safety check completion available":"Run step-next-safety-checks.sql"},{name:"Admin delete protection",ready:e.getAdminDeleteSqlConfirmed(),detail:e.getAdminDeleteSqlConfirmed()?"Admin-only delete SQL marked applied":"Run step-next-admin-delete-work-orders.sql, then mark it applied",action:e.getAdminDeleteSqlConfirmed()?"":"confirm-admin-delete-sql",actionLabel:"Mark SQL Applied"},{name:"Photos",ready:e.getPhotosReady(),detail:e.getPhotosReady()?"Photo records available":"Check storage bucket and photo table policies"}]}return{setupItems:i}}window.MaintainOpsSetupStatusDisplay={createSetupStatusDisplayHelpers:l}})();var oe=ee(Q());(function(){function l(e,i){if(!e||e.dataset.qrHistoryBound||!i.canRead())return;e.dataset.qrHistoryBound="true";let c=e.ownerDocument,p=i.getCompanyId(),u=i.getScope(),b=()=>e.isConnected&&i.canRead()&&p===i.getCompanyId()&&u===i.getScope(),M=[...e.querySelectorAll("[data-qr-last-replaced]")],x=new Set,S="No replacements recorded. Earlier changes are not tracked.",I=t=>t&&typeof t.actor_name=="string"&&t.actor_name.length>0&&Number.isFinite(Date.parse(t.replaced_at)),R=t=>new Date(t).toLocaleString(),D=(t,a)=>{let n=M.find(o=>o.dataset.qrLastReplaced===t);n&&(n.textContent=a?`Last replaced by ${a.actor_name} on ${R(a.replaced_at)}`:S)},d=(t,a,n)=>{let o=c.createElement(t);return a&&(o.textContent=a),n&&(o.className=n),o},w=(t,a)=>{let n=d("button",t,"secondary-button request-action-button");return n.type="button",n.addEventListener("click",a),n},N=null;async function E(){try{let{data:t,error:a}=await i.withTimeout(i.client().rpc("get_qr_replacement_summaries",{target_company_id:p}),"QR history timed out.",15e3);if(!b())return;if(a||!Array.isArray(t)||t.some(n=>!I(n)))throw new Error("History unavailable");for(let n of M)x.has(n.dataset.qrLastReplaced)||D(n.dataset.qrLastReplaced,t.find(o=>o.link_id===n.dataset.qrLastReplaced))}catch{if(b())for(let t of M)x.has(t.dataset.qrLastReplaced)||(t.textContent="Replacement history unavailable. Open history to retry.")}}function O(t){if(!b()||N)return;let a=t.dataset.qrHistory,n=d("dialog","","production-action-dialog qr-history-dialog");n.setAttribute("aria-labelledby","qr-history-title");let o=d("div","","production-action-dialog-shell"),s=d("div","","production-action-dialog-header"),r=d("h3","QR Replacement History");r.id="qr-history-title";let m=d("div","","production-action-dialog-body"),_=d("p",t.dataset.locationName),y=d("p");y.setAttribute("role","status");let $=d("div"),q=d("div","","button-row"),P=d("p","Records begin when tracking was enabled. Older replacements cannot be attributed.","muted"),f=!1,k=0,h=()=>{f||(f=!0,F.disconnect(),n.open&&n.close(),n.remove(),N=null,b()&&t.isConnected&&t.focus({preventScroll:!0}))},F=new MutationObserver(()=>{b()||h()}),W=w("Close",h);s.append(r,W),m.append(_,y,$,q,P),o.append(s,m),n.append(o),n.addEventListener("cancel",g=>{g.preventDefault(),h()}),n.addEventListener("close",h);async function A(g=0){if(!b()){h();return}let U=++k;y.textContent="Loading replacement history...",$.replaceChildren(),q.replaceChildren();try{let{data:L,count:C,error:G}=await i.withTimeout(i.client().from("qr_replacement_history").select("id,link_id,company_id,actor_name,facility_name,replaced_at",{count:"exact"}).eq("company_id",p).eq("link_id",a).order("replaced_at",{ascending:!1}).order("id",{ascending:!1}).range(g*12,g*12+11),"QR history timed out.",15e3);if(!b()){h();return}if(f||U!==k)return;if(G||!Array.isArray(L)||!Number.isSafeInteger(C)||C<0||L.some(v=>!I(v)||v.company_id!==p||v.link_id!==a||typeof v.facility_name!="string"))throw new Error("History unavailable");let B=Math.max(0,Math.ceil(C/12)-1);if(g>B)return A(B);if(L.length!==Math.min(12,Math.max(0,C-g*12)))throw new Error("History incomplete");y.textContent=C?`Page ${g+1} of ${B+1} - ${C} replacements`:S,g===0&&(x.add(a),D(a,L[0]));for(let v of L){let z=d("div","","qr-history-row");z.append(d("strong",v.actor_name),d("p",`Replaced QR code - ${v.facility_name}`),d("p",R(v.replaced_at))),$.append(z)}if(B>0){let v=w("Previous",()=>A(g-1)),z=w("Next",()=>A(g+1));v.disabled=g===0,z.disabled=g===B,q.append(v,z)}}catch{if(!b()){h();return}if(f||U!==k)return;y.textContent="Replacement history unavailable. Please retry.",q.replaceChildren(w("Retry",()=>A(g)))}}try{c.body.append(n),n.showModal(),W.focus({preventScroll:!0}),N=n,F.observe(c.body,{childList:!0,subtree:!0}),A()}catch{h(),i.showNotice("Could not open replacement history. Please retry.","warning")}}e.querySelectorAll("[data-qr-history]").forEach(t=>t.addEventListener("click",()=>O(t))),M.length&&E()}window.MaintainOpsQrHistory={bindQrHistory:l}})();})();
//# sourceMappingURL=setupFeature.f1febd766f.js.map
