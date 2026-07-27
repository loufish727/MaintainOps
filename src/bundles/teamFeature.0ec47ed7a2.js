(()=>{var re=Object.create;var C=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var de=Object.getOwnPropertyNames;var ue=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty;var me=(s,a)=>()=>{try{return a||s((a={exports:{}}).exports,a),a.exports}catch(u){throw a=0,u}};var be=(s,a,u,f)=>{if(a&&typeof a=="object"||typeof a=="function")for(let m of de(a))!pe.call(s,m)&&m!==u&&C(s,m,{get:()=>a[m],enumerable:!(f=ce(a,m))||f.enumerable});return s};var fe=(s,a,u)=>(u=s!=null?re(ue(s)):{},be(a||!s||!s.__esModule?C(u,"default",{value:s,enumerable:!0}):u,s));var D=me((ye,k)=>{(function(){function s({getProfilesByUserId:a,getCurrentUser:u,getCompanyMembers:f,getTeamInvites:m,getTeamInvitesReady:b,getTeamInviteCancelError:c,getPendingCancelInviteId:j,getTeamInviteLinks:S,getTeamInviteLinksReady:A,getTeamInviteLinkError:I,getPendingRevokeInviteLinkId:N,getRequestNotificationRecipients:O,getRequestNotificationRecipientsReady:T,getRequestNotificationRecipientError:E,getSession:_,getLocations:v,getActiveCompanyMembership:W,matchesSearch:P,escapeHtml:t,roleDescription:U,roleLabel:$,normalizeRole:L,teamMemberWorkload:F,canManageTeam:ve,canAdministerTeamRoles:R,teamRoleOptionsForActor:z,COMPANY_ROLES:J,renderLocationOptions:x,inviteDefaultLocationLabel:K,teamInviteSignupUrl:Y,teamJoinUrl:G}){let y=R||(()=>!1),M=z||(()=>J),V=R||(()=>!1);function g(e){return v().find(n=>n.id===e)?.name||"Default location"}function q(e){return W?.()?.default_location_id||e||v()[0]?.id||""}function Q(e){let n=a()[e],i=u();return e===i?.id?n?.full_name||i?.email||"Me":n?.full_name||e}function X(){return f().filter(e=>P([e.user_id,e.role,a()[e.user_id]?.full_name]))}function Z({id:e,label:n,content:i,meta:r="",open:d=!1}){return`
        <details class="team-section-details" data-team-section="${t(e)}" ${d?"open":""}>
          <summary>
            <span>${t(n)}</span>
            ${r?`<small>${t(r)}</small>`:""}
          </summary>
          <div class="team-section-body">${i}</div>
        </details>
      `}function B(e){let n=a()[e.user_id],i=_().user,r=e.user_id===i.id,d=M(e.role),o=y()&&!r&&d.length>1,p=F(e.user_id);return`
        <article class="member-card">
          <div>
            <strong>${t(n?.full_name||(r?i.email:e.user_id))}</strong>
            <p>${t(U(e.role))}</p>
            <p>${t(r&&i.email||e.user_id)}</p>
            <div class="member-workload">
              <span class="chip open">${p.newWork} New</span>
              <span class="chip in_progress">${p.inProgress} In Progress</span>
              <span class="chip blocked">${p.blocked} Blocked</span>
              <span class="chip completed">${p.completed} Completed</span>
              ${p.overdue?`<span class="chip overdue">${p.overdue} Overdue</span>`:""}
            </div>
          </div>
          <div class="member-card-actions">
            <button class="secondary-button view-member-work-button" data-view-member-work="${e.user_id}" type="button">View Work</button>
            ${o?`
              <form class="member-role-form" data-member-role="${e.user_id}">
                <select name="role" aria-label="Role for ${t(n?.full_name||e.user_id)}">
                  ${d.map(h=>`<option value="${h}" ${h===L(e.role)?"selected":""}>${$(h)}</option>`).join("")}
                </select>
                <button class="secondary-button" type="submit">Save Role</button>
              </form>
            `:`<span class="chip">${t($(e.role))}</span>`}
          </div>
        </article>
      `}function H(){let e=_().user,n=a()[e.id]||{};return`
        <form class="team-profile-form relationship-detail comment" id="profile-form">
          <div>
            <h3>My Profile</h3>
            <p class="muted">${t(e.email||"Signed in user")}</p>
          </div>
          <label>Display name<input name="full_name" value="${t(n.full_name||"")}" placeholder="Name shown on work orders"></label>
          <label class="check-row mobile-tech-setting"><input name="mobile_tech" type="checkbox" ${n.mobile_tech?"checked":""}> Mobile tech - I intentionally work across locations</label>
          <p class="muted">When Mobile tech is off, your location is locked so work does not accidentally land in the wrong branch.</p>
          <p class="error-text" id="profile-error"></p>
          <button class="secondary-button" type="submit">Save My Settings</button>
        </form>
      `}function ee(){return`
        <form class="team-profile-form relationship-detail comment" id="password-change-form">
          <div>
            <h3>Account Security</h3>
            <p class="muted">Change the password used to sign in to MaintainOps.</p>
          </div>
          <label>New password<input name="password" type="password" minlength="8" required autocomplete="new-password"></label>
          <label>Confirm password<input name="confirmPassword" type="password" minlength="8" required autocomplete="new-password"></label>
          <p class="error-text" id="password-change-error"></p>
          <button class="secondary-button" type="submit">Update Password</button>
        </form>
      `}function te(e){return e.location_id?v().find(i=>i.id===e.location_id)?.name||"Unknown location":"All locations"}function ne(e){let n=T(),i=O(),r=v(),d=V();return`
        <section class="team-notification-panel relationship-detail comment">
          <div>
            <h3>Request Email Recipients</h3>
            <p class="muted">${d?"Choose who should receive new request emails when the backend email sender is enabled. Shared inboxes are allowed.":"Only admins can change request email routing."}</p>
          </div>
          ${d?`
            <form class="inline-form team-form" id="request-notification-recipient-form">
              <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="maintenance@company.com" ${n?"":"disabled"}></label>
              <label>Label<input name="label" maxlength="120" placeholder="Maintenance desk" ${n?"":"disabled"}></label>
              <label>Applies to
                <select name="location_id" ${n?"":"disabled"}>
                  <option value="">All locations</option>
                  ${r.map(o=>`<option value="${t(o.id)}" ${o.id===e?"selected":""}>${t(o.name||"Location")}</option>`).join("")}
                </select>
              </label>
              <button class="secondary-button" type="submit" ${n?"":"disabled"}>Add Recipient</button>
            </form>
          `:""}
          <p class="error-text" id="request-notification-recipient-error">${t(E()||(n?"":"Run supabase/step-next-request-notification-recipients.sql before routing request emails."))}</p>
          <div class="member-list compact-list">
            ${i.map(o=>`
              <article class="member-card invite-card">
                <div>
                  <strong>${t(o.label||o.email)}</strong>
                  <p>${t(o.email)}</p>
                  <p>${t(te(o))}</p>
                </div>
                <div class="button-row">
                  <span class="chip">${o.is_active===!1?"Paused":"Active"}</span>
                  ${d?`<button class="danger-action-button" data-delete-request-notification-recipient="${t(o.id)}" type="button">Remove</button>`:""}
                </div>
              </article>
            `).join("")||'<p class="muted">No request email recipients yet.</p>'}
          </div>
        </section>
      `}function ie(e){let n=b(),i=v(),r=M(),d=y(),o=q(e);return`
        <form class="team-invite-form relationship-detail comment" id="team-invite-form">
          <div>
            <h3>Invite Teammate</h3>
            <p class="muted">Invites are saved here. Copy the invite message and send it to them; when they sign up with the same email, the app adds them to this company automatically.</p>
          </div>
          <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="tech@company.com" ${n?"":"disabled"}></label>
          <label>Role
            <select name="role" ${n?"":"disabled"}>
              ${r.map(p=>`<option value="${p}">${$(p)}</option>`).join("")}
            </select>
          </label>
          ${d?`
            <label>Default location
              <select name="default_location_id" ${n&&i.length?"":"disabled"}>
                ${i.length?"":'<option value="">Run location setup first</option>'}
                ${x(e)}
              </select>
            </label>
          `:`
            <label>Default location
              <input value="${t(g(o))}" disabled>
              <input name="default_location_id" type="hidden" value="${t(o)}">
            </label>
            <p class="muted">Manager invites add technicians to your default location.</p>
          `}
          <p class="error-text" id="team-invite-error">${n?"":"Run supabase/step-next-invite-default-location.sql before inviting by email."}</p>
          <button class="secondary-button" type="submit" ${n?"":"disabled"}>Create Invite</button>
        </form>
      `}function ae(){let e=m().filter(i=>!i.accepted_at),n=Y();return`
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Pending Invites</h3>
            <span>${e.length}</span>
          </div>
          <p class="error-text" id="team-invite-cancel-error">${t(c())}</p>
          <div class="member-list">
            ${e.map(i=>`
              ${(()=>{let r=`You have a MaintainOps invite for this company. Sign up or sign in with ${i.email} here: ${n}`;return`
              <article class="member-card invite-card">
                <div>
                  <strong>${t(i.email)}</strong>
                  <p>Sent ${new Date(i.created_at).toLocaleString()}</p>
                  <p>${t(K(i))}</p>
                  <p class="muted">Email is not sent automatically. Send this person the signup link.</p>
                </div>
                <div class="button-row">
                  <span class="chip">${t(i.role)}</span>
                  <button class="secondary-button" data-copy-team-invite="${t(r)}" type="button">Copy Invite</button>
                  ${j()===i.id?`
                    <button class="secondary-button" data-cancel-invite-cancel type="button">Keep</button>
                    <button class="danger-action-button confirm-delete-button" data-confirm-cancel-invite="${t(i.id)}" type="button">Cancel Invite</button>
                  `:`
                    <button class="danger-action-button" data-cancel-invite="${t(i.id)}" type="button">Cancel Invite</button>
                  `}
                </div>
              </article>
                `})()}
            `).join("")||'<p class="muted">No pending invites.</p>'}
          </div>
        </section>
      `}function oe(e){let n=A(),i=S(),r=v(),d=y(),o=q(e),p=d?["technician","manager"]:["technician"],h=Date.now();return`
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Join Links</h3>
            <span>${i.filter(l=>!l.used_at&&!l.revoked_at&&new Date(l.expires_at).getTime()>h).length} active</span>
          </div>
          <p class="muted">${d?"Create single-use links for technicians or managers. Admin links are never created by link.":"Create one technician join link for your default location."}</p>
          <form class="inline-form team-form" id="team-invite-link-form">
            <label>Role
              <select name="role" ${n?"":"disabled"}>
                ${p.map(l=>`<option value="${l}">${$(l)}</option>`).join("")}
              </select>
            </label>
            ${d?`
              <label>Default location
                <select name="default_location_id" ${n&&r.length?"":"disabled"}>
                  ${r.length?"":'<option value="">Run location setup first</option>'}
                  ${x(e)}
                </select>
              </label>
            `:`
              <label>Default location
                <input value="${t(g(o))}" disabled>
                <input name="default_location_id" type="hidden" value="${t(o)}">
              </label>
            `}
            <button class="secondary-button" type="submit" ${n?"":"disabled"}>Create Join Link</button>
          </form>
          <p class="error-text" id="team-invite-link-error">${t(I()||(n?"":"Run supabase/step-next-invite-links.sql before creating join links."))}</p>
          <div class="member-list">
            ${i.map(l=>{let se=new Date(l.expires_at).getTime()<=h,w=l.revoked_at?"Revoked":l.used_at?"Used":se?"Expired":"Active",le=`You have a MaintainOps join link. Sign up or sign in here: ${G(l.token)}`;return`
                <article class="member-card invite-card">
                  <div>
                    <strong>${t($(l.role))} join link</strong>
                    <p>${t(g(l.default_location_id))}</p>
                    <p>Expires ${new Date(l.expires_at).toLocaleString()}</p>
                    <p class="muted">Single-use link. Email is not sent automatically.</p>
                  </div>
                  <div class="button-row">
                    <span class="chip">${t(w)}</span>
                    ${w==="Active"?`<button class="secondary-button" data-copy-team-invite="${t(le)}" type="button">Copy Link</button>`:""}
                    ${w==="Active"?N()===l.id?`
                      <button class="secondary-button" data-revoke-invite-link-cancel type="button">Keep</button>
                      <button class="danger-action-button confirm-delete-button" data-confirm-revoke-invite-link="${t(l.id)}" type="button">Revoke Link</button>
                    `:`
                      <button class="danger-action-button" data-revoke-invite-link="${t(l.id)}" type="button">Revoke Link</button>
                    `:""}
                  </div>
                </article>
              `}).join("")||'<p class="muted">No join links yet.</p>'}
          </div>
        </section>
      `}return{teamMemberName:Q,filteredMembers:X,renderTeamSection:Z,renderMember:B,renderMyProfileForm:H,renderPasswordChangeForm:ee,renderRequestNotificationRecipients:ne,renderTeamInviteForm:ie,renderTeamInvites:ae,renderTeamInviteLinks:oe}}window.MaintainOpsTeamMemberDisplay={createTeamMemberDisplayHelpers:s},typeof k<"u"&&(k.exports={createTeamMemberDisplayHelpers:s})})()});var ge=fe(D());(function(){function s(a){function u(f){let b=a.getWorkOrders().filter(c=>a.matchesActiveLocation(c)&&c.assigned_to===f);return{newWork:b.filter(c=>c.status==="open").length,inProgress:b.filter(c=>c.status==="in_progress").length,blocked:b.filter(c=>c.status==="blocked").length,completed:b.filter(c=>c.status==="completed").length,overdue:b.filter(c=>a.getDueState(c)?.className==="overdue").length}}return{teamMemberWorkload:u}}window.MaintainOpsTeamWorkloadDisplay={createTeamWorkloadDisplayHelpers:s}})();})();
//# sourceMappingURL=teamFeature.0ec47ed7a2.js.map
