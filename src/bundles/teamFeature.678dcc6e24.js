(()=>{var ue=Object.create;var j=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var me=Object.getOwnPropertyNames;var be=Object.getPrototypeOf,fe=Object.prototype.hasOwnProperty;var ve=(l,i)=>()=>{try{return i||l((i={exports:{}}).exports,i),i.exports}catch(u){throw i=0,u}};var he=(l,i,u,v)=>{if(i&&typeof i=="object"||typeof i=="function")for(let m of me(i))!fe.call(l,m)&&m!==u&&j(l,m,{get:()=>i[m],enumerable:!(v=pe(i,m))||v.enumerable});return l};var $e=(l,i,u)=>(u=l!=null?ue(be(l)):{},he(i||!l||!l.__esModule?j(u,"default",{value:l,enumerable:!0}):u,l));var S=ve((we,k)=>{(function(){function l({getProfilesByUserId:i,getCurrentUser:u,getCompanyMembers:v,getTeamInvites:m,getTeamInvitesReady:b,getTeamInviteCancelError:d,getPendingCancelInviteId:A,getTeamInviteLinks:N,getTeamInviteLinksReady:O,getTeamInviteLinkError:I,getPendingRevokeInviteLinkId:T,getRequestNotificationRecipients:E,getRequestNotificationRecipientsReady:W,getRequestNotificationRecipientError:L,getSession:_,getLocations:f,getActiveCompanyMembership:U,matchesSearch:P,escapeHtml:n,roleDescription:F,roleLabel:$,normalizeRole:z,teamMemberWorkload:J,canManageTeam:K,canAdministerTeamRoles:R,teamRoleOptionsForActor:V,COMPANY_ROLES:Y,renderLocationOptions:x,inviteDefaultLocationLabel:G,teamInviteSignupUrl:Q,teamJoinUrl:X}){let M=K||(()=>!1),y=R||(()=>!1),q=V||(()=>Y),Z=R||(()=>!1);function g(e){return f().find(t=>t.id===e)?.name||"Default location"}function D(e){return U?.()?.default_location_id||e||f()[0]?.id||""}function B(e){let t=i()[e],o=u();return e===o?.id?t?.full_name||o?.email||"Me":t?.full_name||e}function C(e){return e.default_location_id?f().find(o=>o.id===e.default_location_id)?.name||"Location unavailable":"Not set"}function H(){let e=M();return v().filter(t=>P([t.user_id,e?t.role:"",i()[t.user_id]?.full_name,C(t)]))}function ee({id:e,label:t,content:o,meta:r="",open:c=!1}){return`
        <details class="team-section-details" data-team-section="${n(e)}" ${c?"open":""}>
          <summary>
            <span>${n(t)}</span>
            ${r?`<small>${n(r)}</small>`:""}
          </summary>
          <div class="team-section-body">${o}</div>
        </details>
      `}function te(e){let t=i()[e.user_id],o=_().user,r=e.user_id===o.id,c=M(),s=q(e.role),h=c&&y()&&!r&&s.length>1,p=J(e.user_id);return`
        <article class="member-card">
          <div>
            <strong>${n(t?.full_name||(r?o.email:e.user_id))}</strong>
            <p class="member-default-location">Default location: <strong>${n(C(e))}</strong></p>
            ${c?`<p class="member-role-description">${n(F(e.role))}</p>`:""}
            <p>${n(r&&o.email||e.user_id)}</p>
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
            ${h?`
              <form class="member-role-form" data-member-role="${e.user_id}">
                <select name="role" aria-label="Role for ${n(t?.full_name||e.user_id)}">
                  ${s.map(a=>`<option value="${a}" ${a===z(e.role)?"selected":""}>${$(a)}</option>`).join("")}
                </select>
                <button class="secondary-button" type="submit">Save Role</button>
              </form>
            `:c?`<span class="chip member-role-badge">${n($(e.role))}</span>`:""}
          </div>
        </article>
      `}function ne(){let e=_().user,t=i()[e.id]||{};return`
        <form class="team-profile-form relationship-detail comment" id="profile-form">
          <div>
            <h3>My Profile</h3>
            <p class="muted">${n(e.email||"Signed in user")}</p>
          </div>
          <label>Display name<input name="full_name" value="${n(t.full_name||"")}" placeholder="Name shown on work orders"></label>
          <label class="check-row mobile-tech-setting"><input name="mobile_tech" type="checkbox" ${t.mobile_tech?"checked":""}> Mobile tech - I intentionally work across locations</label>
          <p class="muted">When Mobile tech is off, your location is locked so work does not accidentally land in the wrong branch.</p>
          <p class="error-text" id="profile-error"></p>
          <button class="secondary-button" type="submit">Save My Settings</button>
        </form>
      `}function oe(){return`
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
      `}function ie(e){return e.location_id?f().find(o=>o.id===e.location_id)?.name||"Unknown location":"All locations"}function ae(e){let t=W(),o=E(),r=f(),c=Z();return`
        <section class="team-notification-panel relationship-detail comment">
          <div>
            <h3>Request Email Recipients</h3>
            <p class="muted">${c?"Choose who should receive new request emails when the backend email sender is enabled. Shared inboxes are allowed.":"Only admins can change request email routing."}</p>
          </div>
          ${c?`
            <form class="inline-form team-form" id="request-notification-recipient-form">
              <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="maintenance@company.com" ${t?"":"disabled"}></label>
              <label>Label<input name="label" maxlength="120" placeholder="Maintenance desk" ${t?"":"disabled"}></label>
              <label>Applies to
                <select name="location_id" ${t?"":"disabled"}>
                  <option value="">All locations</option>
                  ${r.map(s=>`<option value="${n(s.id)}" ${s.id===e?"selected":""}>${n(s.name||"Location")}</option>`).join("")}
                </select>
              </label>
              <button class="secondary-button" type="submit" ${t?"":"disabled"}>Add Recipient</button>
            </form>
          `:""}
          <p class="error-text" id="request-notification-recipient-error">${n(L()||(t?"":"Run supabase/step-next-request-notification-recipients.sql before routing request emails."))}</p>
          <div class="member-list compact-list">
            ${o.map(s=>`
              <article class="member-card invite-card">
                <div>
                  <strong>${n(s.label||s.email)}</strong>
                  <p>${n(s.email)}</p>
                  <p>${n(ie(s))}</p>
                </div>
                <div class="button-row">
                  <span class="chip">${s.is_active===!1?"Paused":"Active"}</span>
                  ${c?`<button class="danger-action-button" data-delete-request-notification-recipient="${n(s.id)}" type="button">Remove</button>`:""}
                </div>
              </article>
            `).join("")||'<p class="muted">No request email recipients yet.</p>'}
          </div>
        </section>
      `}function se(e){let t=b(),o=f(),r=q(),c=y(),s=D(e);return`
        <form class="team-invite-form relationship-detail comment" id="team-invite-form">
          <div>
            <h3>Invite Teammate</h3>
            <p class="muted">Invites are saved here. Copy the invite message and send it to them; when they sign up with the same email, the app adds them to this company automatically.</p>
          </div>
          <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="tech@company.com" ${t?"":"disabled"}></label>
          <label>Role
            <select name="role" ${t?"":"disabled"}>
              ${r.map(h=>`<option value="${h}">${$(h)}</option>`).join("")}
            </select>
          </label>
          ${c?`
            <label>Default location
              <select name="default_location_id" ${t&&o.length?"":"disabled"}>
                ${o.length?"":'<option value="">Run location setup first</option>'}
                ${x(e)}
              </select>
            </label>
          `:`
            <label>Default location
              <input value="${n(g(s))}" disabled>
              <input name="default_location_id" type="hidden" value="${n(s)}">
            </label>
            <p class="muted">Manager invites add technicians to your default location.</p>
          `}
          <p class="error-text" id="team-invite-error">${t?"":"Run supabase/step-next-invite-default-location.sql before inviting by email."}</p>
          <button class="secondary-button" type="submit" ${t?"":"disabled"}>Create Invite</button>
        </form>
      `}function le(){let e=m().filter(o=>!o.accepted_at),t=Q();return`
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Pending Invites</h3>
            <span>${e.length}</span>
          </div>
          <p class="error-text" id="team-invite-cancel-error">${n(d())}</p>
          <div class="member-list">
            ${e.map(o=>`
              ${(()=>{let r=`You have a MaintainOps invite for this company. Sign up or sign in with ${o.email} here: ${t}`;return`
              <article class="member-card invite-card">
                <div>
                  <strong>${n(o.email)}</strong>
                  <p>Sent ${new Date(o.created_at).toLocaleString()}</p>
                  <p>${n(G(o))}</p>
                  <p class="muted">Email is not sent automatically. Send this person the signup link.</p>
                </div>
                <div class="button-row">
                  <span class="chip">${n(o.role)}</span>
                  <button class="secondary-button" data-copy-team-invite="${n(r)}" type="button">Copy Invite</button>
                  ${A()===o.id?`
                    <button class="secondary-button" data-cancel-invite-cancel type="button">Keep</button>
                    <button class="danger-action-button confirm-delete-button" data-confirm-cancel-invite="${n(o.id)}" type="button">Cancel Invite</button>
                  `:`
                    <button class="danger-action-button" data-cancel-invite="${n(o.id)}" type="button">Cancel Invite</button>
                  `}
                </div>
              </article>
                `})()}
            `).join("")||'<p class="muted">No pending invites.</p>'}
          </div>
        </section>
      `}function re(e){let t=O(),o=N(),r=f(),c=y(),s=D(e),h=c?["technician","manager"]:["technician"],p=Date.now();return`
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Join Links</h3>
            <span>${o.filter(a=>!a.used_at&&!a.revoked_at&&new Date(a.expires_at).getTime()>p).length} active</span>
          </div>
          <p class="muted">${c?"Create single-use links for technicians or managers. Admin links are never created by link.":"Create one technician join link for your default location."}</p>
          <form class="inline-form team-form" id="team-invite-link-form">
            <label>Role
              <select name="role" ${t?"":"disabled"}>
                ${h.map(a=>`<option value="${a}">${$(a)}</option>`).join("")}
              </select>
            </label>
            ${c?`
              <label>Default location
                <select name="default_location_id" ${t&&r.length?"":"disabled"}>
                  ${r.length?"":'<option value="">Run location setup first</option>'}
                  ${x(e)}
                </select>
              </label>
            `:`
              <label>Default location
                <input value="${n(g(s))}" disabled>
                <input name="default_location_id" type="hidden" value="${n(s)}">
              </label>
            `}
            <button class="secondary-button" type="submit" ${t?"":"disabled"}>Create Join Link</button>
          </form>
          <p class="error-text" id="team-invite-link-error">${n(I()||(t?"":"Run supabase/step-next-invite-links.sql before creating join links."))}</p>
          <div class="member-list">
            ${o.map(a=>{let ce=new Date(a.expires_at).getTime()<=p,w=a.revoked_at?"Revoked":a.used_at?"Used":ce?"Expired":"Active",de=`You have a MaintainOps join link. Sign up or sign in here: ${X(a.token)}`;return`
                <article class="member-card invite-card">
                  <div>
                    <strong>${n($(a.role))} join link</strong>
                    <p>${n(g(a.default_location_id))}</p>
                    <p>Expires ${new Date(a.expires_at).toLocaleString()}</p>
                    <p class="muted">Single-use link. Email is not sent automatically.</p>
                  </div>
                  <div class="button-row">
                    <span class="chip">${n(w)}</span>
                    ${w==="Active"?`<button class="secondary-button" data-copy-team-invite="${n(de)}" type="button">Copy Link</button>`:""}
                    ${w==="Active"?T()===a.id?`
                      <button class="secondary-button" data-revoke-invite-link-cancel type="button">Keep</button>
                      <button class="danger-action-button confirm-delete-button" data-confirm-revoke-invite-link="${n(a.id)}" type="button">Revoke Link</button>
                    `:`
                      <button class="danger-action-button" data-revoke-invite-link="${n(a.id)}" type="button">Revoke Link</button>
                    `:""}
                  </div>
                </article>
              `}).join("")||'<p class="muted">No join links yet.</p>'}
          </div>
        </section>
      `}return{teamMemberName:B,filteredMembers:H,renderTeamSection:ee,renderMember:te,renderMyProfileForm:ne,renderPasswordChangeForm:oe,renderRequestNotificationRecipients:ae,renderTeamInviteForm:se,renderTeamInvites:le,renderTeamInviteLinks:re}}window.MaintainOpsTeamMemberDisplay={createTeamMemberDisplayHelpers:l},typeof k<"u"&&(k.exports={createTeamMemberDisplayHelpers:l})})()});var ke=$e(S());(function(){function l(i){function u(v){let b=i.getWorkOrders().filter(d=>i.matchesActiveLocation(d)&&i.isWorkOrderAssignedToUser(d,v));return{newWork:b.filter(d=>d.status==="open").length,inProgress:b.filter(d=>d.status==="in_progress").length,blocked:b.filter(d=>d.status==="blocked").length,completed:b.filter(d=>d.status==="completed").length,overdue:b.filter(d=>i.getDueState(d)?.className==="overdue").length}}return{teamMemberWorkload:u}}window.MaintainOpsTeamWorkloadDisplay={createTeamWorkloadDisplayHelpers:l}})();})();
//# sourceMappingURL=teamFeature.678dcc6e24.js.map
