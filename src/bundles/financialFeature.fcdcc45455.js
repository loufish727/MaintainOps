(()=>{var fe=Object.create;var Z=Object.defineProperty;var _e=Object.getOwnPropertyDescriptor;var ve=Object.getOwnPropertyNames;var me=Object.getPrototypeOf,he=Object.prototype.hasOwnProperty;var B=(c,e)=>()=>{try{return e||c((e={exports:{}}).exports,e),e.exports}catch(d){throw e=0,d}};var ge=(c,e,d,p)=>{if(e&&typeof e=="object"||typeof e=="function")for(let m of ve(e))!he.call(c,m)&&m!==d&&Z(c,m,{get:()=>e[m],enumerable:!(p=_e(e,m))||p.enumerable});return c};var U=(c,e,d)=>(d=c!=null?fe(me(c)):{},ge(e||!c||!c.__esModule?Z(d,"default",{value:c,enumerable:!0}):d,c));var H=B(($e,V)=>{(function(){function c({escapeHtml:e,assetTypeLabel:d,parentAssetFor:p,getAssets:m,getAssetDocumentsByAssetId:h,getAssetFinancialsByAssetId:l,getAssetFinancials:b,getAssetFinancialsReady:k,getProfilesByUserId:x,getLocations:N,matchesActiveLocation:f,getFinancialPage:r,getFinancialMissingFilter:$,getFinancialLocationFilter:v,getFinancialTypeFilter:C,getFinancialAreaFilter:y,canEditFinancialRecords:q,ASSETS_PER_PAGE:j}){let s=j||12,O=r||(()=>1),S=q||(()=>!0),E=["acquisition_cost","current_book_value"],D=["asset_tag","acquisition_date","acquisition_cost","depreciation_method","useful_life_years","current_book_value","tax_jurisdiction","ownership_status","in_service_date","gl_account_code","cost_center"],L={machine:10,traveling_machine:15,forklift:20,secondary_machine:30,tooling:40,component:50,shop_item:60};function Q(n){return(h()[n]||[]).filter(t=>String(t.content_type||"").startsWith("image/")||t.document_type==="machine_photo"||t.document_type==="nameplate")}function te(n){return l?.()[n]||{}}function F(n){return n?.financialRecord||te(n?.id)}function I(n){return!!(n?.financialRecord&&!n.financialRecord.asset_id)}function M(n){let t=F(n);return D.some(o=>t[o]==null||String(t[o]).trim()==="")}function T(n){return N?.().find(t=>t.id===n)?.name||""}function Y(n){return n.reviewed_by?x?.()[n.reviewed_by]?.full_name||`User ${String(n.reviewed_by).slice(0,8)}`:""}function J(n){return n.operational_deleted_by?x?.()[n.operational_deleted_by]?.full_name||`User ${String(n.operational_deleted_by).slice(0,8)}`:""}function ae(n){return{id:`financial:${n.id}`,financialRecord:n,name:n.archived_asset_name||"Deleted equipment",asset_type:n.archived_asset_type||"machine",asset_code:n.archived_asset_code||"",asset_tag:n.archived_asset_tag||"",manufacturer:n.archived_manufacturer||"",model:n.archived_model||"",location_id:n.archived_location_id||"",location:n.archived_location||"",status:"offline"}}function W(){let n=m(),t=(b?.()||[]).filter(a=>!a.asset_id).map(ae),o=(b?.()||[]).filter(a=>a.assets&&!n.some(i=>i.id===a.asset_id)).map(a=>({...a.assets,financialRecord:a}));return[...n,...o,...t]}function K(){let n=$?.()||"all",t=v?.()||"all",o=C?.()||"all",a=y?.()||"all";return W().filter(i=>t==="all"||i.location_id===t).filter(i=>o==="all"||(i.asset_type||"machine")===o).filter(i=>a==="all"||String(i.location||"").trim()===a).filter(i=>n==="missing"?M(i):n==="review"?F(i).needs_review===!0:!0).sort((i,_)=>{let g=(L[i.asset_type||"machine"]||999)-(L[_.asset_type||"machine"]||999);return g||String(p(i)?.name||"").localeCompare(String(p(_)?.name||""))||String(T(i.location_id)||i.location||"").localeCompare(String(T(_.location_id)||_.location||""))||String(i.location||"").localeCompare(String(_.location||""))||String(i.name||"").localeCompare(String(_.name||""))})}function A(n){return n?String(n).slice(0,10):""}function ie(n){return n==null||n===""?"":String(n)}function w(n,t){return E.includes(t)?ie(n[t]):n[t]||""}function oe(n){let t=F(n),o=I(n);return`
        <form class="form-grid financial-asset-form" data-financial-asset="${e(n.id)}"${o?` data-financial-record="${e(t.id)}" data-financial-archived="true"`:""}>
          ${o?"":`<input name="asset_id" type="hidden" value="${e(n.id)}">`}
          <label>Asset tag / fixed asset number<input name="asset_tag" value="${e(w(t,"asset_tag"))}"></label>
          <label>Acquisition date<input name="acquisition_date" type="date" value="${e(A(t.acquisition_date))}"></label>
          <label>Acquisition cost<input name="acquisition_cost" type="number" min="0" step="0.01" value="${e(w(t,"acquisition_cost"))}"></label>
          <label>Depreciation method<input name="depreciation_method" value="${e(w(t,"depreciation_method"))}" placeholder="Straight-line"></label>
          <label>Useful life years<input name="useful_life_years" type="number" min="0" step="0.1" value="${e(w(t,"useful_life_years"))}"></label>
          <label>Current book value<input name="current_book_value" type="number" min="0" step="0.01" value="${e(w(t,"current_book_value"))}"></label>
          <label>Tax jurisdiction / property tax location<input name="tax_jurisdiction" value="${e(w(t,"tax_jurisdiction"))}"></label>
          <label>Ownership status
            <select name="ownership_status">
              ${["","owned","leased","rented","disposed"].map(a=>`<option value="${a}" ${a===(t.ownership_status||"")?"selected":""}>${a?a.replace(/\b\w/g,i=>i.toUpperCase()):"Unset"}</option>`).join("")}
            </select>
          </label>
          <label>In service date<input name="in_service_date" type="date" value="${e(A(t.in_service_date))}"></label>
          <label>Disposal date<input name="disposal_date" type="date" value="${e(A(t.disposal_date))}"></label>
          <label>GL / account code<input name="gl_account_code" value="${e(w(t,"gl_account_code"))}"></label>
          <label>Cost center / department<input name="cost_center" value="${e(w(t,"cost_center"))}"></label>
          <label>Disposal notes<textarea name="disposal_notes" rows="2">${e(t.disposal_notes||"")}</textarea></label>
          <label>Finance notes<textarea name="finance_notes" rows="2">${e(t.finance_notes||"")}</textarea></label>
          <label class="check-row"><input name="needs_review" type="checkbox" ${t.needs_review?"checked":""}> Needs review</label>
          <p class="error-text" data-financial-error="${e(n.id)}"></p>
          <button class="secondary-button asset-action-button" type="submit" ${k?.()===!1?"disabled":""}>Save Financial Info</button>
        </form>
      `}function se(n){return n==null||n===""?"Not recorded":String(n)}function re(n){return n?String(n).replace(/\b\w/g,t=>t.toUpperCase()):""}function ce(n){let t=F(n);return`
        <div class="financial-readonly-list relationship-detail asset">
          ${[["Asset tag / fixed asset number",t.asset_tag],["Acquisition date",A(t.acquisition_date)],["Acquisition cost",w(t,"acquisition_cost")],["Depreciation method",t.depreciation_method],["Useful life years",t.useful_life_years],["Current book value",w(t,"current_book_value")],["Tax jurisdiction / property tax location",t.tax_jurisdiction],["Ownership status",re(t.ownership_status)],["In service date",A(t.in_service_date)],["Disposal date",A(t.disposal_date)],["GL / account code",t.gl_account_code],["Cost center / department",t.cost_center],["Disposal notes",t.disposal_notes],["Finance notes",t.finance_notes],["Needs review",t.needs_review?"Yes":"No"],["Last reviewed",t.last_reviewed_at?new Date(t.last_reviewed_at).toLocaleString():""],["Reviewed by",Y(t)]].map(([a,i])=>`
            <div class="meta-row financial-readonly-row">
              <span><strong>${e(a)}</strong>${e(se(i))}</span>
            </div>
          `).join("")}
        </div>
      `}function X(n){let t=p(n),o=Q(n.id),a=F(n),i=M(n),_=I(n);return`
        <article class="asset-card asset-state-${e(n.status||"running")} financial-asset-card ${_?"financial-asset-deleted":""}" data-open-financial-asset="${e(n.id)}" tabindex="0" role="button" aria-label="Open financial details for ${e(n.name||"equipment")}">
          <div class="part-card-main">
            ${n.archived_at?`<div class="financial-deleted-banner">Equipment archived / ${e(n.archive_reason)} / ${e(new Date(n.archived_at).toLocaleDateString())}</div>`:""}
            ${_?`<div class="financial-deleted-banner">Operational equipment deleted${a.operational_deleted_at?` ${e(new Date(a.operational_deleted_at).toLocaleDateString())}`:""}${a.operational_deleted_by?` by ${e(J(a))}`:""}</div>`:""}
            <div class="chip-row">
              <span class="chip">${e(d(n.asset_type))}</span>
              <span class="chip">${e(T(n.location_id)||"Location unset")}</span>
              <span class="chip">${e(n.location||"Department unset")}</span>
              ${n.asset_code?`<span class="chip">${e(n.asset_code)}</span>`:""}
              ${n.asset_tag?`<span class="chip">Equipment asset tag: ${e(n.asset_tag)}</span>`:""}
              ${o.length?`<span class="chip">${o.length} photo${o.length===1?"":"s"}</span>`:'<span class="chip">photo missing</span>'}
              ${i?'<span class="chip status-open">missing finance info</span>':'<span class="chip status-completed">finance complete</span>'}
              ${a.needs_review?'<span class="chip status-blocked">needs review</span>':""}
            </div>
            <h3>${e(n.name||"Equipment")}</h3>
            <p>${e(t?`Part of ${t.name}`:"Top level equipment")}</p>
            <p>${e(n.manufacturer||"Manufacturer blank")} ${n.model?`- ${e(n.model)}`:""}</p>
            <p>${e(a.asset_tag||"Asset tag blank")} ${a.cost_center?`- ${e(a.cost_center)}`:""}</p>
            <p class="muted">Last reviewed ${a.last_reviewed_at?new Date(a.last_reviewed_at).toLocaleDateString():"not recorded"}${a.reviewed_by?` by ${e(Y(a))}`:""}</p>
          </div>
        </article>
      `}function le(n){let t=$?.()||"all",o=v?.()||"all",a=C?.()||"all",i=y?.()||"all",_=N?.()||[],g=W(),R=[...new Set(g.map(u=>String(u.location||"").trim()).filter(Boolean))].sort((u,P)=>u.localeCompare(P)),pe=[...new Set(g.map(u=>u.asset_type||"machine"))].sort((u,P)=>(L[u]||999)-(L[P]||999));return`
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
              <option value="all" ${a==="all"?"selected":""}>All types</option>
              ${pe.map(u=>`<option value="${e(u)}" ${a===u?"selected":""}>${e(d(u))}</option>`).join("")}
            </select>
          </label>
          <label>Area / spot
            <select data-financial-filter="area">
              <option value="all" ${i==="all"?"selected":""}>All areas</option>
              ${R.map(u=>`<option value="${e(u)}" ${i===u?"selected":""}>${e(u)}</option>`).join("")}
            </select>
          </label>
          <span>${n.length} shown</span>
        </div>
      `}function de(n){let t=W().find(R=>R.id===n||R.financialRecord?.asset_id===n);if(!t)return`
          <div class="relationship-detail asset">
            <button class="secondary-button back-action-button" data-back-financial-list type="button">Back to Financial</button>
            <p class="muted">This equipment record is no longer available.</p>
          </div>
        `;let o=p(t),a=Q(t.id),i=F(t),_=M(t),g=I(t);return`
        <div class="queue-context-card asset-command-summary">
          <div>
            <strong>${e(t.name||"Equipment")}</strong>
            <span>${e(d(t.asset_type))} - ${e(T(t.location_id)||"Location unset")} - ${e(t.location||"Department unset")}</span>
          </div>
          <div class="team-actions">
            <button class="secondary-button back-action-button" data-back-financial-list type="button">Back to Financial</button>
            ${g||t.archived_at?"":`<button class="secondary-button asset-action-button" data-open-financial-equipment="${e(t.id)}" type="button">Open Equipment Page</button>`}
          </div>
        </div>
        ${t.archived_at?`<div class="financial-deleted-banner">Equipment archived / ${e(t.archive_reason)}. Financial information is retained.</div>`:""}
        ${g?`
          <section class="relationship-detail asset financial-deleted-detail">
            <div class="financial-deleted-banner">Operational equipment deleted${i.operational_deleted_at?` ${e(new Date(i.operational_deleted_at).toLocaleDateString())}`:""}${i.operational_deleted_by?` by ${e(J(i))}`:""}</div>
            <p class="muted">This financial history was retained after the shop equipment record was deleted.</p>
            ${S()?`<button class="danger-action-button" data-delete-financial-record="${e(i.id)}" type="button">Delete From Financials</button>`:""}
            <p class="error-text" data-financial-delete-error="${e(i.id||"")}"></p>
          </section>
        `:""}
        <section class="relationship-detail asset">
          <div class="chip-row">
            <span class="chip">${e(o?`Part of ${o.name}`:"Top level equipment")}</span>
            ${t.asset_code?`<span class="chip">${e(t.asset_code)}</span>`:""}
            ${t.asset_tag?`<span class="chip">Equipment asset tag: ${e(t.asset_tag)}</span>`:""}
            <span class="chip">${e(t.manufacturer||"Manufacturer blank")}</span>
            <span class="chip">${e(t.model||"Model blank")}</span>
            ${a.length?`<span class="chip">${a.length} photo${a.length===1?"":"s"}</span>`:'<span class="chip">photo missing</span>'}
            ${_?'<span class="chip status-open">missing finance info</span>':'<span class="chip status-completed">finance complete</span>'}
            ${i.needs_review?'<span class="chip status-blocked">needs review</span>':""}
          </div>
          <p class="muted">${g?"Operational equipment fields are a retained snapshot.":"Operational equipment fields mirror the equipment record. Accounting changes on this screen save only financial fields."}</p>
        </section>
        <section class="relationship-detail asset">
          <h3>Financial Details</h3>
          ${S()?oe(t):ce(t)}
        </section>
      `}function ue(){let n=K(),t=Math.max(1,Math.ceil(n.length/s)),o=Math.min(Math.max(Number(O())||1,1),t),a=n.slice((o-1)*s,o*s),i=(o-1)*s+1,_=Math.min(n.length,o*s),g=n.length<=s?"":`
        <div class="pagination-bar">
          <button class="secondary-button page-action-button" data-financial-page="prev" type="button" ${o<=1?"disabled":""}>Previous</button>
          <span>Showing ${i}-${_} of ${n.length} - Page ${o} of ${t}</span>
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
          ${a.map(X).join("")||'<p class="muted">No equipment found for these financial filters.</p>'}
        </div>
        ${g}
      `}return{financialAssets:K,isMissingFinancialInfo:M,renderFinancialPanel:ue,renderFinancialAssetCard:X,renderFinancialDetail:de}}window.MaintainOpsFinancialDisplay={createFinancialDisplayHelpers:c},typeof V<"u"&&(V.exports={createFinancialDisplayHelpers:c})})()});var ee=B((we,G)=>{(function(){function c(e={}){let d=e.documentRef||document,p=e.FormDataCtor||FormData,m=e.CSSRef||CSS;function h(f){let r=String(f??"").trim();return r||null}function l(f){let r=String(f??"").trim();if(!r)return null;let $=Number(r);return Number.isFinite($)?$:null}function b(f){return h(f)}async function k(f){f.preventDefault();let r=f.currentTarget,$=r.dataset.financialAsset||"",v=r.dataset.financialRecord||"",C=r.dataset.financialArchived==="true",y=d.querySelector(`[data-financial-error="${m.escape($)}"]`),q=r.querySelector("button[type='submit']"),j=q?.textContent||"Save Financial Info";if(y&&(y.textContent=""),e.canEditFinancialRecords&&!e.canEditFinancialRecords()){let s="Managers can view financial records, but only admins and accounting can edit financial info.";y?y.textContent=s:e.showNotice?.(s,"warning");return}q&&(q.disabled=!0,q.textContent="Saving...");try{if(!$)throw new Error("Choose equipment before saving financial info.");if(C&&!v)throw new Error("The archived financial record could not be identified.");let s=new p(r),O=s.get("needs_review")==="on",S={asset_tag:h(s.get("asset_tag")),acquisition_date:b(s.get("acquisition_date")),acquisition_cost:l(s.get("acquisition_cost")),depreciation_method:h(s.get("depreciation_method")),useful_life_years:l(s.get("useful_life_years")),current_book_value:l(s.get("current_book_value")),tax_jurisdiction:h(s.get("tax_jurisdiction")),ownership_status:h(s.get("ownership_status")),in_service_date:b(s.get("in_service_date")),disposal_date:b(s.get("disposal_date")),disposal_notes:h(s.get("disposal_notes")),gl_account_code:h(s.get("gl_account_code")),cost_center:h(s.get("cost_center")),finance_notes:h(s.get("finance_notes")),needs_review:O,updated_by:e.getSession?.()?.user?.id||null,updated_at:new Date().toISOString()};O||(S.last_reviewed_at=new Date().toISOString(),S.reviewed_by=e.getSession?.()?.user?.id||null);let E;C?E=e.supabaseClient().from("asset_financials").update(S).eq("id",v).is("asset_id",null).select("id").single():E=e.supabaseClient().from("asset_financials").upsert({...S,company_id:e.getActiveCompanyId(),asset_id:$},{onConflict:"asset_id"}).select("id").single();let{error:D}=await e.withOperationTimeout(E,"Financial info save timed out. Check your connection and try again.",15e3);if(D)throw e.isMissingTableError?.(D,"asset_financials")?(e.setAssetFinancialsReady(!1),new Error("Run supabase/step-next-asset-financials.sql before saving financial fields.")):D;e.showNotice?.("Financial info saved."),await e.loadAssetFinancials?.(),e.renderWorkspace?.()}catch(s){y?y.textContent=s.message||"Could not save financial info.":e.showNotice?.(s.message||"Could not save financial info.","warning")}finally{q&&(q.disabled=!1,q.textContent=j)}}async function x(f){let r=d.querySelector(`[data-financial-delete-error="${m.escape(f||"")}"]`);if(r&&(r.textContent=""),e.canEditFinancialRecords&&!e.canEditFinancialRecords()){let v="Managers can view financial records, but only admins and accounting can edit financial info.";r?r.textContent=v:e.showNotice?.(v,"warning");return}if(!f){r&&(r.textContent="Choose a financial record before deleting.");return}if(!e.confirmRef||e.confirmRef("Delete this archived financial record? This cannot be undone."))try{let{error:v}=await e.withOperationTimeout(e.supabaseClient().from("asset_financials").delete().eq("id",f).is("asset_id",null),"Financial record delete timed out. Check your connection and try again.",15e3);if(v)throw v;e.showNotice?.("Archived financial record deleted."),await e.loadAssetFinancials?.(),e.clearActiveFinancialAssetId?.(),e.renderWorkspace?.()}catch(v){r?r.textContent=v.message||"Could not delete financial record.":e.showNotice?.(v.message||"Could not delete financial record.","warning")}}function N(){d.querySelectorAll("[data-financial-asset]").forEach(f=>{f.addEventListener("submit",k)}),d.querySelectorAll("[data-delete-financial-record]").forEach(f=>{f.addEventListener("click",()=>x(f.dataset.deleteFinancialRecord))})}return{bindFinancialEvents:N,deleteFinancialRecord:x,saveAssetFinancial:k}}window.MaintainOpsAssetFinancialWorkflow={createAssetFinancialWorkflow:c},typeof G<"u"&&(G.exports={createAssetFinancialWorkflow:c})})()});var ne=B((ye,z)=>{(function(){function c(e={}){let d=e.documentRef||document,p=e.state;if(!p)return;function m(l){l&&(p.setActiveFinancialAssetId(l),e.renderWorkspace?.())}function h(l){l&&(p.clearActiveFinancialAssetId(),p.setActiveAssetId?.(l),p.setActiveWorkOrderId?.(null),p.setActivePartId?.(null),p.setActiveSection?.("assets"),e.renderWorkspace?.(),e.scrollToDetailTop?.())}d.querySelectorAll("[data-open-financial-asset]").forEach(l=>{l.addEventListener("click",()=>{m(l.dataset.openFinancialAsset)}),l.addEventListener("keydown",b=>{b.key!=="Enter"&&b.key!==" "||(b.preventDefault?.(),m(l.dataset.openFinancialAsset))})}),d.querySelectorAll("[data-back-financial-list]").forEach(l=>{l.addEventListener("click",()=>{p.clearActiveFinancialAssetId(),e.renderWorkspace?.()})}),d.querySelectorAll("[data-open-financial-equipment]").forEach(l=>{l.addEventListener("click",()=>{h(l.dataset.openFinancialEquipment)})})}window.MaintainOpsWorkspaceFinancialNavigationEvents={bindWorkspaceFinancialNavigationEvents:c},typeof z<"u"&&(z.exports={bindWorkspaceFinancialNavigationEvents:c})})()});var qe=U(H()),Se=U(ee()),Fe=U(ne());})();
//# sourceMappingURL=financialFeature.fcdcc45455.js.map
