(()=>{var ce=Object.create;var C=Object.defineProperty;var de=Object.getOwnPropertyDescriptor;var ue=Object.getOwnPropertyNames;var pe=Object.getPrototypeOf,me=Object.prototype.hasOwnProperty;var be=(s,o)=>()=>{try{return o||s((o={exports:{}}).exports,o),o.exports}catch(u){throw o=0,u}};var fe=(s,o,u,v)=>{if(o&&typeof o=="object"||typeof o=="function")for(let m of ue(o))!me.call(s,m)&&m!==u&&C(s,m,{get:()=>o[m],enumerable:!(v=de(o,m))||v.enumerable});return s};var ve=(s,o,u)=>(u=s!=null?ce(pe(s)):{},fe(o||!s||!s.__esModule?C(u,"default",{value:s,enumerable:!0}):u,s));var j=be((ge,k)=>{(function(){function s({getProfilesByUserId:o,getCurrentUser:u,getCompanyMembers:v,getTeamInvites:m,getTeamInvitesReady:b,getTeamInviteCancelError:c,getPendingCancelInviteId:S,getTeamInviteLinks:A,getTeamInviteLinksReady:N,getTeamInviteLinkError:O,getPendingRevokeInviteLinkId:I,getRequestNotificationRecipients:T,getRequestNotificationRecipientsReady:E,getRequestNotificationRecipientError:W,getSession:_,getLocations:f,getActiveCompanyMembership:L,matchesSearch:U,escapeHtml:t,roleDescription:P,roleLabel:$,normalizeRole:F,teamMemberWorkload:z,canManageTeam:he,canAdministerTeamRoles:R,teamRoleOptionsForActor:J,COMPANY_ROLES:K,renderLocationOptions:x,inviteDefaultLocationLabel:Y,teamInviteSignupUrl:G,teamJoinUrl:V}){let y=R||(()=>!1),M=J||(()=>K),Q=R||(()=>!1);function g(e){return f().find(n=>n.id===e)?.name||"Default location"}function q(e){return L?.()?.default_location_id||e||f()[0]?.id||""}function X(e){let n=o()[e],i=u();return e===i?.id?n?.full_name||i?.email||"Me":n?.full_name||e}function D(e){return e.default_location_id?f().find(i=>i.id===e.default_location_id)?.name||"Location unavailable":"Not set"}function Z(){return v().filter(e=>U([e.user_id,e.role,o()[e.user_id]?.full_name,D(e)]))}function B({id:e,label:n,content:i,meta:r="",open:d=!1}){return`
        <details class="team-section-details" data-team-section="${t(e)}" ${d?"open":""}>
          <summary>
            <span>${t(n)}</span>
            ${r?`<small>${t(r)}</small>`:""}
          </summary>
          <div class="team-section-body">${i}</div>
        </details>
      `}function H(e){let n=o()[e.user_id],i=_().user,r=e.user_id===i.id,d=M(e.role),a=y()&&!r&&d.length>1,p=z(e.user_id);return`
        <article class="member-card">
          <div>
            <strong>${t(n?.full_name||(r?i.email:e.user_id))}</strong>
            <p class="member-default-location">Default location: <strong>${t(D(e))}</strong></p>
            <p>${t(P(e.role))}</p>
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
            ${a?`
              <form class="member-role-form" data-member-role="${e.user_id}">
                <select name="role" aria-label="Role for ${t(n?.full_name||e.user_id)}">
                  ${d.map(h=>`<option value="${h}" ${h===F(e.role)?"selected":""}>${$(h)}</option>`).join("")}
                </select>
                <button class="secondary-button" type="submit">Save Role</button>
              </form>
            `:`<span class="chip">${t($(e.role))}</span>`}
          </div>
        </article>
      `}function ee(){let e=_().user,n=o()[e.id]||{};return`
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
      `}function te(){return`
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
      `}function ne(e){return e.location_id?f().find(i=>i.id===e.location_id)?.name||"Unknown location":"All locations"}function ie(e){let n=E(),i=T(),r=f(),d=Q();return`
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
                  ${r.map(a=>`<option value="${t(a.id)}" ${a.id===e?"selected":""}>${t(a.name||"Location")}</option>`).join("")}
                </select>
              </label>
              <button class="secondary-button" type="submit" ${n?"":"disabled"}>Add Recipient</button>
            </form>
          `:""}
          <p class="error-text" id="request-notification-recipient-error">${t(W()||(n?"":"Run supabase/step-next-request-notification-recipients.sql before routing request emails."))}</p>
          <div class="member-list compact-list">
            ${i.map(a=>`
              <article class="member-card invite-card">
                <div>
                  <strong>${t(a.label||a.email)}</strong>
                  <p>${t(a.email)}</p>
                  <p>${t(ne(a))}</p>
                </div>
                <div class="button-row">
                  <span class="chip">${a.is_active===!1?"Paused":"Active"}</span>
                  ${d?`<button class="danger-action-button" data-delete-request-notification-recipient="${t(a.id)}" type="button">Remove</button>`:""}
                </div>
              </article>
            `).join("")||'<p class="muted">No request email recipients yet.</p>'}
          </div>
        </section>
      `}function oe(e){let n=b(),i=f(),r=M(),d=y(),a=q(e);return`
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
              <input value="${t(g(a))}" disabled>
              <input name="default_location_id" type="hidden" value="${t(a)}">
            </label>
            <p class="muted">Manager invites add technicians to your default location.</p>
          `}
          <p class="error-text" id="team-invite-error">${n?"":"Run supabase/step-next-invite-default-location.sql before inviting by email."}</p>
          <button class="secondary-button" type="submit" ${n?"":"disabled"}>Create Invite</button>
        </form>
      `}function ae(){let e=m().filter(i=>!i.accepted_at),n=G();return`
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
                  <p>${t(Y(i))}</p>
                  <p class="muted">Email is not sent automatically. Send this person the signup link.</p>
                </div>
                <div class="button-row">
                  <span class="chip">${t(i.role)}</span>
                  <button class="secondary-button" data-copy-team-invite="${t(r)}" type="button">Copy Invite</button>
                  ${S()===i.id?`
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
      `}function se(e){let n=N(),i=A(),r=f(),d=y(),a=q(e),p=d?["technician","manager"]:["technician"],h=Date.now();return`
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
                <input value="${t(g(a))}" disabled>
                <input name="default_location_id" type="hidden" value="${t(a)}">
              </label>
            `}
            <button class="secondary-button" type="submit" ${n?"":"disabled"}>Create Join Link</button>
          </form>
          <p class="error-text" id="team-invite-link-error">${t(O()||(n?"":"Run supabase/step-next-invite-links.sql before creating join links."))}</p>
          <div class="member-list">
            ${i.map(l=>{let le=new Date(l.expires_at).getTime()<=h,w=l.revoked_at?"Revoked":l.used_at?"Used":le?"Expired":"Active",re=`You have a MaintainOps join link. Sign up or sign in here: ${V(l.token)}`;return`
                <article class="member-card invite-card">
                  <div>
                    <strong>${t($(l.role))} join link</strong>
                    <p>${t(g(l.default_location_id))}</p>
                    <p>Expires ${new Date(l.expires_at).toLocaleString()}</p>
                    <p class="muted">Single-use link. Email is not sent automatically.</p>
                  </div>
                  <div class="button-row">
                    <span class="chip">${t(w)}</span>
                    ${w==="Active"?`<button class="secondary-button" data-copy-team-invite="${t(re)}" type="button">Copy Link</button>`:""}
                    ${w==="Active"?I()===l.id?`
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
      `}return{teamMemberName:X,filteredMembers:Z,renderTeamSection:B,renderMember:H,renderMyProfileForm:ee,renderPasswordChangeForm:te,renderRequestNotificationRecipients:ie,renderTeamInviteForm:oe,renderTeamInvites:ae,renderTeamInviteLinks:se}}window.MaintainOpsTeamMemberDisplay={createTeamMemberDisplayHelpers:s},typeof k<"u"&&(k.exports={createTeamMemberDisplayHelpers:s})})()});var we=ve(j());(function(){function s(o){function u(v){let b=o.getWorkOrders().filter(c=>o.matchesActiveLocation(c)&&o.isWorkOrderAssignedToUser(c,v));return{newWork:b.filter(c=>c.status==="open").length,inProgress:b.filter(c=>c.status==="in_progress").length,blocked:b.filter(c=>c.status==="blocked").length,completed:b.filter(c=>c.status==="completed").length,overdue:b.filter(c=>o.getDueState(c)?.className==="overdue").length}}return{teamMemberWorkload:u}}window.MaintainOpsTeamWorkloadDisplay={createTeamWorkloadDisplayHelpers:s}})();})();
//# sourceMappingURL=teamFeature.538c85f244.js.map
