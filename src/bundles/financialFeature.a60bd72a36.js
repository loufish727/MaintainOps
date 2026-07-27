(()=>{var fe=Object.create;var Z=Object.defineProperty;var _e=Object.getOwnPropertyDescriptor;var me=Object.getOwnPropertyNames;var ve=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty;var B=(r,e)=>()=>{try{return e||r((e={exports:{}}).exports,e),e.exports}catch(d){throw e=0,d}};var be=(r,e,d,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let v of me(e))!he.call(r,v)&&v!==d&&Z(r,v,{get:()=>e[v],enumerable:!(p=_e(e,v))||p.enumerable});return r};var U=(r,e,d)=>(d=r!=null?fe(ve(r)):{},be(e||!r||!r.__esModule?Z(d,"default",{value:r,enumerable:!0}):d,r));var H=B(($e,V)=>{(function(){function r({escapeHtml:e,assetTypeLabel:d,parentAssetFor:p,getAssets:v,getAssetDocumentsByAssetId:h,getAssetFinancialsByAssetId:l,getAssetFinancials:y,getAssetFinancialsReady:k,getProfilesByUserId:x,getLocations:N,matchesActiveLocation:f,getFinancialPage:c,getFinancialMissingFilter:g,getFinancialLocationFilter:m,getFinancialTypeFilter:C,getFinancialAreaFilter:w,canEditFinancialRecords:q,ASSETS_PER_PAGE:j}){let s=j||12,O=c||(()=>1),S=q||(()=>!0),D=["acquisition_cost","current_book_value"],E=["asset_tag","acquisition_date","acquisition_cost","depreciation_method","useful_life_years","current_book_value","tax_jurisdiction","ownership_status","in_service_date","gl_account_code","cost_center"],L={machine:10,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function Q(n){return(h()[n]||[]).filter(t=>String(t.content_type||"").startsWith("image/")||t.document_type==="machine_photo"||t.document_type==="nameplate")}function te(n){return l?.()[n]||{}}function F(n){return n?.financialRecord||te(n?.id)}function I(n){return!!(n?.financialRecord&&!n.financialRecord.asset_id)}function M(n){let t=F(n);return E.some(o=>t[o]==null||String(t[o]).trim()==="")}function T(n){return N?.().find(t=>t.id===n)?.name||""}function Y(n){return n.reviewed_by?x?.()[n.reviewed_by]?.full_name||`User ${String(n.reviewed_by).slice(0,8)}`:""}function J(n){return n.operational_deleted_by?x?.()[n.operational_deleted_by]?.full_name||`User ${String(n.operational_deleted_by).slice(0,8)}`:""}function ae(n){return{id:`financial:${n.id}`,financialRecord:n,name:n.archived_asset_name||"Deleted equipment",asset_type:n.archived_asset_type||"machine",asset_code:n.archived_asset_code||"",manufacturer:n.archived_manufacturer||"",model:n.archived_model||"",location_id:n.archived_location_id||"",location:n.archived_location||"",status:"offline"}}function W(){let n=v(),t=(y?.()||[]).filter(o=>!o.asset_id).map(ae);return[...n,...t]}function K(){let n=g?.()||"all",t=m?.()||"all",o=C?.()||"all",i=w?.()||"all";return W().filter(a=>t==="all"||a.location_id===t).filter(a=>o==="all"||(a.asset_type||"machine")===o).filter(a=>i==="all"||String(a.location||"").trim()===i).filter(a=>n==="missing"?M(a):n==="review"?F(a).needs_review===!0:!0).sort((a,_)=>{let b=(L[a.asset_type||"machine"]||999)-(L[_.asset_type||"machine"]||999);return b||String(p(a)?.name||"").localeCompare(String(p(_)?.name||""))||String(T(a.location_id)||a.location||"").localeCompare(String(T(_.location_id)||_.location||""))||String(a.location||"").localeCompare(String(_.location||""))||String(a.name||"").localeCompare(String(_.name||""))})}function A(n){return n?String(n).slice(0,10):""}function ie(n){return n==null||n===""?"":String(n)}function $(n,t){return D.includes(t)?ie(n[t]):n[t]||""}function oe(n){let t=F(n),o=I(n);return`
        <form class="form-grid financial-asset-form" data-financial-asset="${e(n.id)}"${o?` data-financial-record="${e(t.id)}" data-financial-archived="true"`:""}>
          ${o?"":`<input name="asset_id" type="hidden" value="${e(n.id)}">`}
          <label>Asset tag / fixed asset number<input name="asset_tag" value="${e($(t,"asset_tag"))}"></label>
          <label>Acquisition date<input name="acquisition_date" type="date" value="${e(A(t.acquisition_date))}"></label>
          <label>Acquisition cost<input name="acquisition_cost" type="number" min="0" step="0.01" value="${e($(t,"acquisition_cost"))}"></label>
          <label>Depreciation method<input name="depreciation_method" value="${e($(t,"depreciation_method"))}" placeholder="Straight-line"></label>
          <label>Useful life years<input name="useful_life_years" type="number" min="0" step="0.1" value="${e($(t,"useful_life_years"))}"></label>
          <label>Current book value<input name="current_book_value" type="number" min="0" step="0.01" value="${e($(t,"current_book_value"))}"></label>
          <label>Tax jurisdiction / property tax location<input name="tax_jurisdiction" value="${e($(t,"tax_jurisdiction"))}"></label>
          <label>Ownership status
            <select name="ownership_status">
              ${["","owned","leased","rented","disposed"].map(i=>`<option value="${i}" ${i===(t.ownership_status||"")?"selected":""}>${i?i.replace(/\b\w/g,a=>a.toUpperCase()):"Unset"}</option>`).join("")}
            </select>
          </label>
          <label>In service date<input name="in_service_date" type="date" value="${e(A(t.in_service_date))}"></label>
          <label>Disposal date<input name="disposal_date" type="date" value="${e(A(t.disposal_date))}"></label>
          <label>GL / account code<input name="gl_account_code" value="${e($(t,"gl_account_code"))}"></label>
          <label>Cost center / department<input name="cost_center" value="${e($(t,"cost_center"))}"></label>
          <label>Disposal notes<textarea name="disposal_notes" rows="2">${e(t.disposal_notes||"")}</textarea></label>
          <label>Finance notes<textarea name="finance_notes" rows="2">${e(t.finance_notes||"")}</textarea></label>
          <label class="check-row"><input name="needs_review" type="checkbox" ${t.needs_review?"checked":""}> Needs review</label>
          <p class="error-text" data-financial-error="${e(n.id)}"></p>
          <button class="secondary-button asset-action-button" type="submit" ${k?.()===!1?"disabled":""}>Save Financial Info</button>
        </form>
      `}function se(n){return n==null||n===""?"Not recorded":String(n)}function ce(n){return n?String(n).replace(/\b\w/g,t=>t.toUpperCase()):""}function re(n){let t=F(n);return`
        <div class="financial-readonly-list relationship-detail asset">
          ${[["Asset tag / fixed asset number",t.asset_tag],["Acquisition date",A(t.acquisition_date)],["Acquisition cost",$(t,"acquisition_cost")],["Depreciation method",t.depreciation_method],["Useful life years",t.useful_life_years],["Current book value",$(t,"current_book_value")],["Tax jurisdiction / property tax location",t.tax_jurisdiction],["Ownership status",ce(t.ownership_status)],["In service date",A(t.in_service_date)],["Disposal date",A(t.disposal_date)],["GL / account code",t.gl_account_code],["Cost center / department",t.cost_center],["Disposal notes",t.disposal_notes],["Finance notes",t.finance_notes],["Needs review",t.needs_review?"Yes":"No"],["Last reviewed",t.last_reviewed_at?new Date(t.last_reviewed_at).toLocaleString():""],["Reviewed by",Y(t)]].map(([i,a])=>`
            <div class="meta-row financial-readonly-row">
              <span><strong>${e(i)}</strong>${e(se(a))}</span>
            </div>
          `).join("")}
        </div>
      `}function X(n){let t=p(n),o=Q(n.id),i=F(n),a=M(n),_=I(n);return`
        <article class="asset-card asset-state-${e(n.status||"running")} financial-asset-card ${_?"financial-asset-deleted":""}" data-open-financial-asset="${e(n.id)}" tabindex="0" role="button" aria-label="Open financial details for ${e(n.name||"equipment")}">
          <div class="part-card-main">
            ${_?`<div class="financial-deleted-banner">Operational equipment deleted${i.operational_deleted_at?` ${e(new Date(i.operational_deleted_at).toLocaleDateString())}`:""}${i.operational_deleted_by?` by ${e(J(i))}`:""}</div>`:""}
            <div class="chip-row">
              <span class="chip">${e(d(n.asset_type))}</span>
              <span class="chip">${e(T(n.location_id)||"Location unset")}</span>
              <span class="chip">${e(n.location||"Department unset")}</span>
              ${n.asset_code?`<span class="chip">${e(n.asset_code)}</span>`:""}
              ${o.length?`<span class="chip">${o.length} photo${o.length===1?"":"s"}</span>`:'<span class="chip">photo missing</span>'}
              ${a?'<span class="chip status-open">missing finance info</span>':'<span class="chip status-completed">finance complete</span>'}
              ${i.needs_review?'<span class="chip status-blocked">needs review</span>':""}
            </div>
            <h3>${e(n.name||"Equipment")}</h3>
            <p>${e(t?`Part of ${t.name}`:"Top level equipment")}</p>
            <p>${e(n.manufacturer||"Manufacturer blank")} ${n.model?`- ${e(n.model)}`:""}</p>
            <p>${e(i.asset_tag||"Asset tag blank")} ${i.cost_center?`- ${e(i.cost_center)}`:""}</p>
            <p class="muted">Last reviewed ${i.last_reviewed_at?new Date(i.last_reviewed_at).toLocaleDateString():"not recorded"}${i.reviewed_by?` by ${e(Y(i))}`:""}</p>
          </div>
        </article>
      `}function le(n){let t=g?.()||"all",o=m?.()||"all",i=C?.()||"all",a=w?.()||"all",_=N?.()||[],b=W(),R=[...new Set(b.map(u=>String(u.location||"").trim()).filter(Boolean))].sort((u,P)=>u.localeCompare(P)),pe=[...new Set(b.map(u=>u.asset_type||"machine"))].sort((u,P)=>(L[u]||999)-(L[P]||999));return`
        <div class="asset-area-filter relationship-detail asset" aria-label="Financial asset filters">
          <label>Status
            <select data-financial-filter="missing">
              <option value="all" ${t==="all"?"selected":""}>All financial records</option>
              <option value="missing" ${t==="missing"?"selected":""}>Missing financial info</option>
              <option value="review" ${t==="review"?"selected":""}>Needs review</option>
            </select>
          </label>
          <label>Facility
            <select data-financial-filter="location">
              <option value="all" ${o==="all"?"selected":""}>All facilities</option>
              ${_.map(u=>`<option value="${e(u.id)}" ${o===u.id?"selected":""}>${e(u.name||"Location")}</option>`).join("")}
            </select>
          </label>
          <label>Equipment type
            <select data-financial-filter="type">
              <option value="all" ${i==="all"?"selected":""}>All types</option>
              ${pe.map(u=>`<option value="${e(u)}" ${i===u?"selected":""}>${e(d(u))}</option>`).join("")}
            </select>
          </label>
          <label>Area / spot
            <select data-financial-filter="area">
              <option value="all" ${a==="all"?"selected":""}>All areas</option>
              ${R.map(u=>`<option value="${e(u)}" ${a===u?"selected":""}>${e(u)}</option>`).join("")}
            </select>
          </label>
          <span>${n.length} shown</span>
        </div>
      `}function de(n){let t=W().find(R=>R.id===n||R.financialRecord?.asset_id===n);if(!t)return`
          <div class="relationship-detail asset">
            <button class="secondary-button back-action-button" data-back-financial-list type="button">Back to Financial</button>
            <p class="muted">This equipment record is no longer available.</p>
          </div>
        `;let o=p(t),i=Q(t.id),a=F(t),_=M(t),b=I(t);return`
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>${e(t.name||"Equipment")}</strong>
            <span>${e(d(t.asset_type))} - ${e(T(t.location_id)||"Location unset")} - ${e(t.location||"Department unset")}</span>
          </div>
          <div class="team-actions">
            <button class="secondary-button back-action-button" data-back-financial-list type="button">Back to Financial</button>
            ${b?"":`<button class="secondary-button asset-action-button" data-open-financial-equipment="${e(t.id)}" type="button">Open Equipment Page</button>`}
          </div>
        </div>
        ${b?`
          <section class="relationship-detail asset financial-deleted-detail">
            <div class="financial-deleted-banner">Operational equipment deleted${a.operational_deleted_at?` ${e(new Date(a.operational_deleted_at).toLocaleDateString())}`:""}${a.operational_deleted_by?` by ${e(J(a))}`:""}</div>
            <p class="muted">This financial history was retained after the shop equipment record was deleted.</p>
            ${S()?`<button class="danger-action-button" data-delete-financial-record="${e(a.id)}" type="button">Delete From Financials</button>`:""}
            <p class="error-text" data-financial-delete-error="${e(a.id||"")}"></p>
          </section>
        `:""}
        <section class="relationship-detail asset">
          <div class="chip-row">
            <span class="chip">${e(o?`Part of ${o.name}`:"Top level equipment")}</span>
            ${t.asset_code?`<span class="chip">${e(t.asset_code)}</span>`:""}
            <span class="chip">${e(t.manufacturer||"Manufacturer blank")}</span>
            <span class="chip">${e(t.model||"Model blank")}</span>
            ${i.length?`<span class="chip">${i.length} photo${i.length===1?"":"s"}</span>`:'<span class="chip">photo missing</span>'}
            ${_?'<span class="chip status-open">missing finance info</span>':'<span class="chip status-completed">finance complete</span>'}
            ${a.needs_review?'<span class="chip status-blocked">needs review</span>':""}
          </div>
          <p class="muted">${b?"Operational equipment fields are a retained snapshot.":"Operational equipment fields mirror the equipment record. Accounting changes on this screen save only financial fields."}</p>
        </section>
        <section class="relationship-detail asset">
          <h3>Financial Details</h3>
          ${S()?oe(t):re(t)}
        </section>
      `}function ue(){let n=K(),t=Math.max(1,Math.ceil(n.length/s)),o=Math.min(Math.max(Number(O())||1,1),t),i=n.slice((o-1)*s,o*s),a=(o-1)*s+1,_=Math.min(n.length,o*s),b=n.length<=s?"":`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-financial-page="prev" type="button" ${o<=1?"disabled":""}>Previous</button>
          <span>Showing ${a}-${_} of ${n.length} - Page ${o} of ${t}</span>
          <button class="secondary-button page-action-button" data-financial-page="next" type="button" ${o>=t?"disabled":""}>Next</button>
        </div>
      `;return`
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>Equipment Financial Register</strong>
            <span>Finance fields are stored separately from maintenance equipment records.</span>
          </div>
          <small>${k?.()===!1?"Run supabase/step-next-asset-financials.sql":`${n.length} equipment record${n.length===1?"":"s"}`}</small>
        </div>
        ${le(n)}
        <div class="asset-list">
          ${i.map(X).join("")||'<p class="muted">No equipment found for these financial filters.</p>'}
        </div>
        ${b}
      `}return{financialAssets:K,isMissingFinancialInfo:M,renderFinancialPanel:ue,renderFinancialAssetCard:X,renderFinancialDetail:de}}window.MaintainOpsFinancialDisplay={createFinancialDisplayHelpers:r},typeof V<"u"&&(V.exports={createFinancialDisplayHelpers:r})})()});var ee=B((ye,G)=>{(function(){function r(e={}){let d=e.documentRef||document,p=e.FormDataCtor||FormData,v=e.CSSRef||CSS;function h(f){let c=String(f??"").trim();return c||null}function l(f){let c=String(f??"").trim();if(!c)return null;let g=Number(c);return Number.isFinite(g)?g:null}function y(f){return h(f)}async function k(f){f.preventDefault();let c=f.currentTarget,g=c.dataset.financialAsset||"",m=c.dataset.financialRecord||"",C=c.dataset.financialArchived==="true",w=d.querySelector(`[data-financial-error="${v.escape(g)}"]`),q=c.querySelector("button[type='submit']"),j=q?.textContent||"Save Financial Info";if(w&&(w.textContent=""),e.canEditFinancialRecords&&!e.canEditFinancialRecords()){let s="Managers can view financial records, but only admins and accounting can edit financial info.";w?w.textContent=s:e.showNotice?.(s,"warning");return}q&&(q.disabled=!0,q.textContent="Saving...");try{if(!g)throw new Error("Choose equipment before saving financial info.");if(C&&!m)throw new Error("The archived financial record could not be identified.");let s=new p(c),O=s.get("needs_review")==="on",S={asset_tag:h(s.get("asset_tag")),acquisition_date:y(s.get("acquisition_date")),acquisition_cost:l(s.get("acquisition_cost")),depreciation_method:h(s.get("depreciation_method")),useful_life_years:l(s.get("useful_life_years")),current_book_value:l(s.get("current_book_value")),tax_jurisdiction:h(s.get("tax_jurisdiction")),ownership_status:h(s.get("ownership_status")),in_service_date:y(s.get("in_service_date")),disposal_date:y(s.get("disposal_date")),disposal_notes:h(s.get("disposal_notes")),gl_account_code:h(s.get("gl_account_code")),cost_center:h(s.get("cost_center")),finance_notes:h(s.get("finance_notes")),needs_review:O,updated_by:e.getSession?.()?.user?.id||null,updated_at:new Date().toISOString()};O||(S.last_reviewed_at=new Date().toISOString(),S.reviewed_by=e.getSession?.()?.user?.id||null);let D;C?D=e.supabaseClient().from("asset_financials").update(S).eq("id",m).is("asset_id",null).select("id").single():D=e.supabaseClient().from("asset_financials").upsert({...S,company_id:e.getActiveCompanyId(),asset_id:g},{onConflict:"asset_id"}).select("id").single();let{error:E}=await e.withOperationTimeout(D,"Financial info save timed out. Check your connection and try again.",15e3);if(E)throw e.isMissingTableError?.(E,"asset_financials")?(e.setAssetFinancialsReady(!1),new Error("Run supabase/step-next-asset-financials.sql before saving financial fields.")):E;e.showNotice?.("Financial info saved."),await e.loadAssetFinancials?.(),e.renderWorkspace?.()}catch(s){w?w.textContent=s.message||"Could not save financial info.":e.showNotice?.(s.message||"Could not save financial info.","warning")}finally{q&&(q.disabled=!1,q.textContent=j)}}async function x(f){let c=d.querySelector(`[data-financial-delete-error="${v.escape(f||"")}"]`);if(c&&(c.textContent=""),e.canEditFinancialRecords&&!e.canEditFinancialRecords()){let m="Managers can view financial records, but only admins and accounting can edit financial info.";c?c.textContent=m:e.showNotice?.(m,"warning");return}if(!f){c&&(c.textContent="Choose a financial record before deleting.");return}if(!e.confirmRef||e.confirmRef("Delete this archived financial record? This cannot be undone."))try{let{error:m}=await e.withOperationTimeout(e.supabaseClient().from("asset_financials").delete().eq("id",f).is("asset_id",null),"Financial record delete timed out. Check your connection and try again.",15e3);if(m)throw m;e.showNotice?.("Archived financial record deleted."),await e.loadAssetFinancials?.(),e.clearActiveFinancialAssetId?.(),e.renderWorkspace?.()}catch(m){c?c.textContent=m.message||"Could not delete financial record.":e.showNotice?.(m.message||"Could not delete financial record.","warning")}}function N(){d.querySelectorAll("[data-financial-asset]").forEach(f=>{f.addEventListener("submit",k)}),d.querySelectorAll("[data-delete-financial-record]").forEach(f=>{f.addEventListener("click",()=>x(f.dataset.deleteFinancialRecord))})}return{bindFinancialEvents:N,deleteFinancialRecord:x,saveAssetFinancial:k}}window.MaintainOpsAssetFinancialWorkflow={createAssetFinancialWorkflow:r},typeof G<"u"&&(G.exports={createAssetFinancialWorkflow:r})})()});var ne=B((we,z)=>{(function(){function r(e={}){let d=e.documentRef||document,p=e.state;if(!p)return;function v(l){l&&(p.setActiveFinancialAssetId(l),e.renderWorkspace?.())}function h(l){l&&(p.clearActiveFinancialAssetId(),p.setActiveAssetId?.(l),p.setActiveWorkOrderId?.(null),p.setActivePartId?.(null),p.setActiveSection?.("assets"),e.renderWorkspace?.(),e.scrollToDetailTop?.())}d.querySelectorAll("[data-open-financial-asset]").forEach(l=>{l.addEventListener("click",()=>{v(l.dataset.openFinancialAsset)}),l.addEventListener("keydown",y=>{y.key!=="Enter"&&y.key!==" "||(y.preventDefault?.(),v(l.dataset.openFinancialAsset))})}),d.querySelectorAll("[data-back-financial-list]").forEach(l=>{l.addEventListener("click",()=>{p.clearActiveFinancialAssetId(),e.renderWorkspace?.()})}),d.querySelectorAll("[data-open-financial-equipment]").forEach(l=>{l.addEventListener("click",()=>{h(l.dataset.openFinancialEquipment)})})}window.MaintainOpsWorkspaceFinancialNavigationEvents={bindWorkspaceFinancialNavigationEvents:r},typeof z<"u"&&(z.exports={bindWorkspaceFinancialNavigationEvents:r})})()});var qe=U(H()),Se=U(ee()),Fe=U(ne());})();
//# sourceMappingURL=financialFeature.a60bd72a36.js.map
