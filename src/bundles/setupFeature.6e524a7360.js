(()=>{var F=Object.create;var S=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var O=Object.getPrototypeOf,T=Object.prototype.hasOwnProperty;var U=(r,e)=>()=>{try{return e||r((e={exports:{}}).exports,e),e.exports}catch(l){throw e=0,l}};var j=(r,e,l,d)=>{if(e&&typeof e=="object"||typeof e=="function")for(let g of W(e))!T.call(r,g)&&g!==l&&S(r,g,{get:()=>e[g],enumerable:!(d=D(e,g))||d.enumerable});return r};var E=(r,e,l)=>(l=r!=null?F(O(r)):{},j(e||!r||!r.__esModule?S(l,"default",{value:r,enumerable:!0}):l,r));var P=U((K,M)=>{(function(){function r({escapeHtml:e,formatBytes:l}){let d={"asset-documents":"Equipment files","company-logos":"Company logos","maintenance-request-photos":"Request photos","part-documents":"Part files","work-order-photos":"Work order photos","work-order-documents":"Work order documents","message-files":"Message attachments"},g={company:"Company",equipment:"Equipment",part:"Part",request:"Request",work_order:"Work Order",work_order_document:"Work Order",message:"Conversation"};function c(a){let t=Number(a)||0;if(!t)return"0 B";if(t>=1099511627776){let n=t/1099511627776;return`${n.toFixed(Number.isInteger(n)?0:1)} TB`}if(t>=1073741824){let n=t/1073741824;return`${n.toFixed(Number.isInteger(n)?0:1)} GB`}return l(t)||"0 B"}function _(a){let t=Number(a)||0;return t<=0?"0%":t<.01?"<0.01%":`${t.toFixed(t>=10?1:2)}%`}function q(a){let t=a.map(i=>Number(i)||0).sort((i,s)=>i-s);if(!t.length)return 0;let n=Math.floor(t.length/2);return t.length%2?t[n]:(t[n-1]+t[n])/2}function x(a){let t=Number(a)||0;if(t<=0)return"not enough usage history";let n=Math.floor(t/12),i=Math.floor(t%12),s=Math.max(Math.round((t-Math.floor(t))*30.4375),0),o=[];return n&&o.push(`${n} ${n===1?"year":"years"}`),i&&o.push(`${i} ${i===1?"month":"months"}`),(s||!o.length)&&o.push(`${s} ${s===1?"day":"days"}`),o.join(", ")}function k(a){return d[a]||String(a||"Storage")}function w(a){return g[a]||String(a||"Record")}function p(a,t,n){return`
        <article class="storage-metric">
          <span>${e(a)}</span>
          <strong>${e(t)}</strong>
          <small>${e(n||"")}</small>
        </article>
      `}function N(){return`
        <section class="storage-rules">
          <div class="settings-section-heading">
            <div>
              <strong>Storage Rules</strong>
              <span>Upload caps and optimization targets</span>
            </div>
          </div>
          <div class="storage-rule-list">
            ${[{label:"Work Order Photos",cap:"Photos are automatically resized before upload",optimize:"Stored at 768px, target near 256 KB"},{label:"Request Photos",cap:"Photos are automatically resized before upload",optimize:"Stored at 768px, target near 256 KB"},{label:"Equipment Images",cap:"Images are resized before upload",optimize:"Target near 1 MB; non-image equipment files over 25 MB are blocked"},{label:"Part Images",cap:"Images are resized before upload",optimize:"Target near 1 MB; non-image part files over 25 MB are blocked"},{label:"Documents",cap:"Non-image files over 25 MB are blocked",optimize:"PDF, Word, Excel, CSV, and text files are stored as uploaded"},{label:"ZIP Attachments",cap:"Up to 25 MB per ZIP; 50 files and 100 MB expanded per batch",optimize:"Unpacked for review; photos are resized and supported documents kept unchanged"},{label:"Company Logos",cap:"JPG, PNG, WebP, GIF, HEIC, and HEIF images are accepted",optimize:"Automatically resized to 1200px when possible"}].map(t=>`
              <article class="storage-rule-row">
                <strong>${e(t.label)}</strong>
                <span>${e(t.cap)}</span>
                <small>${e(t.optimize)}</small>
              </article>
            `).join("")}
          </div>
        </section>
      `}function B(a,t){let n=Number(a.size_bytes)||0,i=t?n/t*100:0;return`
        <article class="storage-bucket-row">
          <div>
            <strong>${e(k(a.bucket_id))}</strong>
            <span>${Number(a.file_count)||0} files</span>
          </div>
          <div class="storage-bar" aria-label="${e(k(a.bucket_id))} usage">
            <span style="width: ${Math.max(i,n?1:0).toFixed(2)}%"></span>
          </div>
          <strong>${e(c(n))}</strong>
        </article>
      `}function C(a){let t=a.link_section||"",n=a.linked_record_id||"",i=!!(t&&n);return`
        <article class="storage-file-row">
          <div class="storage-file-main">
            <strong title="${e(a.object_path||"")}">${e(a.file_name||a.object_path||"Stored file")}</strong>
            <span>${e(k(a.bucket_id))} - ${e(w(a.record_type))}</span>
          </div>
          <div class="storage-file-record">
            <span>${e(a.linked_record_label||"Linked record")}</span>
            ${i&&t==="messages"?`<button class="secondary-button small" data-open-work-message-thread="${e(n)}" type="button">Open conversation</button>`:i?`<button class="secondary-button small" data-storage-record-link data-storage-link-section="${e(t)}" data-storage-link-id="${e(n)}" data-storage-link-label="${e(a.linked_record_label||"")}" type="button">Open</button>`:""}
          </div>
          <strong class="storage-file-size">${e(c(a.size_bytes))}</strong>
        </article>
      `}function A(a){let n=a.slice(-12).map(b=>Number(b.size_bytes)||0);for(;n.length<12;)n.unshift(0);let s=a.slice(-12).reduce((b,f)=>{let R=Number(f.size_bytes)||0,I=Number(b?.size_bytes)||0;return R>I?f:b},null),o=Number(s?.size_bytes)||0,u=Number(s?.photo_count)||0,m=Math.max((Number(s?.file_count)||0)-u,0),h=q(n),y=Math.max(Number(a[a.length-1]?.remaining_bytes)||0,0),v=o>0?y/o:0,$=o>0?`At the largest monthly usage rate of ${c(o)} per month, the storage cap is estimated in ${x(v)}.`:"At the current usage rate, there is not enough usage history to estimate the storage cap.";return`
        <div class="storage-month-summary" aria-label="Last 12 months storage trend">
          <article>
            <span>Largest Month</span>
            <strong>${e(c(o))}/mo</strong>
            <small>${u} photos, ${m} files</small>
          </article>
          <article>
            <span>12 Month Median</span>
            <strong>${e(c(h))}/mo</strong>
          </article>
          <article class="storage-month-projection">
            <span>Cap Estimate</span>
            <strong>${e(x(v))}</strong>
            <small>${e($)}</small>
          </article>
        </div>
      `}function z(a){let t=Array.isArray(a)?a:[],n=t.reduce((s,o)=>Math.max(s,Number(o.size_bytes)||0),0),i=t.reduce((s,o)=>Math.max(s,Number(o.cumulative_bytes)||0),0);return`
        <section class="storage-monthly-usage">
          <div class="settings-section-heading">
            <div>
              <strong>Month Over Month Usage</strong>
              <span>Last ${t.length||12} months</span>
            </div>
          </div>
          ${A(t)}
          <div class="storage-month-chart" role="img" aria-label="Month over month storage usage">
            ${t.map(s=>{let o=Number(s.size_bytes)||0,u=Number(s.cumulative_bytes)||0,m=Number(s.remaining_bytes)||0,h=n?Math.max(o/n*100,o?6:0):0,y=i?Math.max(u/i*100,u?6:0):0;return`
                <article class="storage-month-column" title="${e(s.month_label||s.month||"")}: ${e(c(o))} added, ${e(c(u))} total, ${e(c(m))} remaining">
                  <div class="storage-month-bars">
                    <span class="storage-month-cumulative" style="height: ${y.toFixed(2)}%"></span>
                    <span class="storage-month-added" style="height: ${h.toFixed(2)}%"></span>
                  </div>
                  <strong>${e(c(o))}</strong>
                  <small>${e(c(m))} left</small>
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
      `}function L({canView:a,dashboard:t,ready:n,error:i}){if(!a)return"";let s=t||{},o=Number(s.total_bytes)||0,u=Number(s.allowance_bytes)||107374182400,m=Math.max(Number(s.remaining_bytes)||u-o,0),h=Number(s.photo_count)||0,y=Number(s.file_count)||0,v=Math.max(y-h,0),$=Array.isArray(s.bucket_totals)?s.bucket_totals:[],b=Array.isArray(s.monthly_usage)?s.monthly_usage:[],f=Array.isArray(s.top_files)?s.top_files:[];return`
        <section class="storage-dashboard relationship-detail asset">
          <div class="panel-header compact">
            <div>
              <h3>Storage Usage</h3>
              <span>${n?`${y} linked files tracked`:"loading storage usage"}</span>
            </div>
            <button class="secondary-button small" data-refresh-storage-dashboard type="button">Refresh</button>
          </div>
          ${i?`<p class="warning-text">${e(i)}</p>`:""}
          <div class="storage-metric-grid">
            ${p("Used",c(o),`${_(s.usage_percent)} of plan storage`)}
            ${p("Remaining",c(m),`${_(m/u*100)} open`)}
            ${p("Photos",`${h}`,"Image records linked to work, requests, equipment, and parts")}
            ${p("Files",`${v}`,"Non-photo files only")}
            ${p("Available",c(u),"Supabase Pro file storage")}
            ${p("Largest Files",`${f.length}/10`,"Top linked storage objects")}
          </div>
          ${N()}
          ${z(b)}
          <div class="storage-dashboard-grid">
            <section class="storage-breakdown">
              <div class="settings-section-heading">
                <div>
                  <strong>What Is Taking Space</strong>
                  <span>${$.length} buckets</span>
                </div>
              </div>
              <div class="storage-bucket-list">
                ${$.map(R=>B(R,o)).join("")||'<p class="muted">No linked files found for this company yet.</p>'}
              </div>
            </section>
            <section class="storage-largest-files">
              <div class="settings-section-heading">
                <div>
                  <strong>Top 10 Largest Files</strong>
                  <span>${f.length} shown</span>
                </div>
              </div>
              <div class="storage-file-list">
                ${f.map(C).join("")||'<p class="muted">No files to list yet.</p>'}
              </div>
            </section>
          </div>
        </section>
      `}return{renderStorageDashboardPanel:L}}window.MaintainOpsStorageDashboardDisplay={createStorageDashboardDisplayHelpers:r},typeof M<"u"&&(M.exports={createStorageDashboardDisplayHelpers:r})})()});(function(){function r({escapeHtml:e}){function l(d){return`
        <article class="setup-item ${d.ready?"ready":"needs-work"}">
          <div>
            <strong>${e(d.name)}</strong>
            <span>${e(d.detail)}</span>
            ${d.action?`<button class="secondary-button setup-action-button" data-setup-action="${e(d.action)}" type="button">${e(d.actionLabel)}</button>`:""}
          </div>
          <span class="chip ${d.ready?"completed":"blocked"}">${d.ready?"ready":"setup"}</span>
        </article>
      `}return{renderSetupItem:l}}window.MaintainOpsSetupDisplay={createSetupDisplayHelpers:r}})();(function(){function r(e){function l(){return[{name:"Supabase config",ready:!!(e.getSupabaseUrl()&&e.getSupabaseAnonKey()),detail:e.getSupabaseUrl()||"Missing supabase-config.js"},{name:"Company data",ready:!!e.getActiveCompanyId(),detail:e.getActiveCompanyId()?"Active tenant selected":"Create or select a company"},{name:"Requests",ready:e.getRequestsReady(),detail:e.getRequestsReady()?"Stored in maintenance_requests":"Run step-next-maintenance-requests.sql"},{name:"Public request QR links",ready:e.getPublicRequestLinksReady(),detail:e.getPublicRequestLinksReady()?"External location intake is available":"Run step-next-public-request-links.sql"},{name:"Preventive schedules",ready:e.getSchedulesReady(),detail:e.getSchedulesReady()?"PM schedules available":"Run step-next-preventive-schedules.sql"},{name:"Procedure Checklists",ready:e.getProceduresReady(),detail:e.getProceduresReady()?"Procedure checklists available":"Run step-next-procedures.sql"},{name:"Part costs",ready:e.getPartCostsReady(),detail:e.getPartCostsReady()?"Unit costs available":"Run step-next-part-costs.sql"},{name:"Part sources",ready:e.getPartSuppliersReady(),detail:e.getPartSuppliersReady()?"Vendor/source names available":"Run step-next-part-suppliers.sql"},{name:"Part files",ready:e.getPartDocumentsReady(),detail:e.getPartDocumentsReady()?"Receipts and invoices can be filed with parts":"Run step-next-part-documents.sql"},{name:"App issue reports",ready:e.getAppIssueReportsReady(),detail:e.getAppIssueReportsReady()?"Live tester feedback can be captured":"Run step-next-app-issue-reports.sql"},{name:"Message center",ready:e.getMessagesReady(),detail:e.getMessagesReady()?"Company, location, and direct message threads available":"Run step-next-message-center.sql"},{name:"Message work links",ready:e.getMessageWorkOrderLinksReady(),detail:e.getMessageWorkOrderLinksReady()?"Message threads can link back to work orders":"Run step-next-message-work-order-links.sql"},{name:"Work outcomes",ready:e.getOutcomesReady(),detail:e.getOutcomesReady()?"Cause/resolution/follow-up available":"Run step-next-work-order-outcomes.sql"},{name:"Safety checks",ready:e.getSafetyChecksReady(),detail:e.getSafetyChecksReady()?"Asset safety check completion available":"Run step-next-safety-checks.sql"},{name:"Admin delete protection",ready:e.getAdminDeleteSqlConfirmed(),detail:e.getAdminDeleteSqlConfirmed()?"Admin-only delete SQL marked applied":"Run step-next-admin-delete-work-orders.sql, then mark it applied",action:e.getAdminDeleteSqlConfirmed()?"":"confirm-admin-delete-sql",actionLabel:"Mark SQL Applied"},{name:"Photos",ready:e.getPhotosReady(),detail:e.getPhotosReady()?"Photo records available":"Check storage bucket and photo table policies"}]}return{setupItems:l}}window.MaintainOpsSetupStatusDisplay={createSetupStatusDisplayHelpers:r}})();var Z=E(P());})();
//# sourceMappingURL=setupFeature.6e524a7360.js.map
