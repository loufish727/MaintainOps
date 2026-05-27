(function () {
  function createTeamMemberDisplayHelpers({
    getProfilesByUserId,
    getCurrentUser,
    getCompanyMembers,
    getTeamInvites,
    getTeamInvitesReady,
    getTeamInviteCancelError,
    getPendingCancelInviteId,
    getSession,
    getLocations,
    matchesSearch,
    escapeHtml,
    roleDescription,
    roleLabel,
    normalizeRole,
    teamMemberWorkload,
    canManageTeam,
    COMPANY_ROLES,
    renderLocationOptions,
    inviteDefaultLocationLabel,
  }) {
    function teamMemberName(userId) {
      const profile = getProfilesByUserId()[userId];
      const currentUser = getCurrentUser();
      if (userId === currentUser?.id) return profile?.full_name || currentUser?.email || "Me";
      return profile?.full_name || userId;
    }

    function filteredMembers() {
      return getCompanyMembers().filter((member) => matchesSearch([
        member.user_id,
        member.role,
        getProfilesByUserId()[member.user_id]?.full_name,
      ]));
    }

    function renderMember(member) {
      const profile = getProfilesByUserId()[member.user_id];
      const currentUser = getSession().user;
      const isCurrentUser = member.user_id === currentUser.id;
      const canEditRole = canManageTeam() && !isCurrentUser;
      const workload = teamMemberWorkload(member.user_id);
      return `
        <article class="member-card">
          <div>
            <strong>${escapeHtml(profile?.full_name || (isCurrentUser ? currentUser.email : member.user_id))}</strong>
            <p>${escapeHtml(roleDescription(member.role))}</p>
            <p>${isCurrentUser ? escapeHtml(currentUser.email || member.user_id) : escapeHtml(member.user_id)}</p>
            <div class="member-workload">
              <span class="chip open">${workload.newWork} New</span>
              <span class="chip in_progress">${workload.inProgress} In Progress</span>
              <span class="chip blocked">${workload.blocked} Blocked</span>
              ${workload.overdue ? `<span class="chip overdue">${workload.overdue} Overdue</span>` : ""}
            </div>
          </div>
          <div class="member-card-actions">
            <button class="secondary-button view-member-work-button" data-view-member-work="${member.user_id}" type="button">View Work</button>
            ${canEditRole ? `
              <form class="member-role-form" data-member-role="${member.user_id}">
                <select name="role" aria-label="Role for ${escapeHtml(profile?.full_name || member.user_id)}">
                  ${COMPANY_ROLES.map((role) => `<option value="${role}" ${role === normalizeRole(member.role) ? "selected" : ""}>${roleLabel(role)}</option>`).join("")}
                </select>
                <button class="secondary-button" type="submit">Save Role</button>
              </form>
            ` : `<span class="chip">${escapeHtml(roleLabel(member.role))}</span>`}
          </div>
        </article>
      `;
    }

    function renderMyProfileForm() {
      const currentUser = getSession().user;
      const profile = getProfilesByUserId()[currentUser.id] || {};
      return `
        <form class="team-profile-form relationship-detail comment" id="profile-form">
          <div>
            <h3>My Profile</h3>
            <p class="muted">${escapeHtml(currentUser.email || "Signed in user")}</p>
          </div>
          <label>Display name<input name="full_name" value="${escapeHtml(profile.full_name || "")}" placeholder="Name shown on work orders"></label>
          <label class="check-row mobile-tech-setting"><input name="mobile_tech" type="checkbox" ${profile.mobile_tech ? "checked" : ""}> Mobile tech - I intentionally work across locations</label>
          <p class="muted">When Mobile tech is off, your location is locked so work does not accidentally land in the wrong branch.</p>
          <p class="error-text" id="profile-error"></p>
          <button class="secondary-button" type="submit">Save My Settings</button>
        </form>
      `;
    }

    function renderTeamInviteForm(activeLocationId) {
      const teamInvitesReady = getTeamInvitesReady();
      const locations = getLocations();
      return `
        <form class="team-invite-form relationship-detail comment" id="team-invite-form">
          <div>
            <h3>Invite Teammate</h3>
            <p class="muted">They sign up with this email, then the app adds them to this company automatically.</p>
          </div>
          <label>Email<input name="email" type="text" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" placeholder="tech@company.com" ${teamInvitesReady ? "" : "disabled"}></label>
          <label>Role
            <select name="role" ${teamInvitesReady ? "" : "disabled"}>
              <option value="technician">Technician</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>Default location
            <select name="default_location_id" ${teamInvitesReady && locations.length ? "" : "disabled"}>
              ${locations.length ? "" : `<option value="">Run location setup first</option>`}
              ${renderLocationOptions(activeLocationId)}
            </select>
          </label>
          <p class="error-text" id="team-invite-error">${teamInvitesReady ? "" : "Run supabase/step-next-invite-default-location.sql before inviting by email."}</p>
          <button class="secondary-button" type="submit" ${teamInvitesReady ? "" : "disabled"}>Create Invite</button>
        </form>
      `;
    }

    function renderTeamInvites() {
      const pending = getTeamInvites().filter((invite) => !invite.accepted_at);
      return `
        <section class="team-invites">
          <div class="panel-header compact">
            <h3>Pending Invites</h3>
            <span>${pending.length}</span>
          </div>
          <p class="error-text" id="team-invite-cancel-error">${escapeHtml(getTeamInviteCancelError())}</p>
          <div class="member-list">
            ${pending.map((invite) => `
              <article class="member-card invite-card">
                <div>
                  <strong>${escapeHtml(invite.email)}</strong>
                  <p>Sent ${new Date(invite.created_at).toLocaleString()}</p>
                  <p>${escapeHtml(inviteDefaultLocationLabel(invite))}</p>
                </div>
                <div class="button-row">
                  <span class="chip">${escapeHtml(invite.role)}</span>
                  ${getPendingCancelInviteId() === invite.id ? `
                    <button class="secondary-button" data-cancel-invite-cancel type="button">Keep</button>
                    <button class="danger-action-button confirm-delete-button" data-confirm-cancel-invite="${escapeHtml(invite.id)}" type="button">Cancel Invite</button>
                  ` : `
                    <button class="danger-action-button" data-cancel-invite="${escapeHtml(invite.id)}" type="button">Cancel Invite</button>
                  `}
                </div>
              </article>
            `).join("") || `<p class="muted">No pending invites.</p>`}
          </div>
        </section>
      `;
    }

    return {
      teamMemberName,
      filteredMembers,
      renderMember,
      renderMyProfileForm,
      renderTeamInviteForm,
      renderTeamInvites,
    };
  }

  window.MaintainOpsTeamMemberDisplay = {
    createTeamMemberDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createTeamMemberDisplayHelpers };
  }
})();
