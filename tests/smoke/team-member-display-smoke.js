const assert = require("node:assert/strict");

global.window = {};

const { createTeamMemberDisplayHelpers } = require("../../src/render/teamMemberDisplay.js");

const baseDeps = {
  getProfilesByUserId: () => ({
    "user-1": { full_name: "Louie", mobile_tech: true },
    "user-2": { full_name: "Taylor Tech" },
  }),
  getCurrentUser: () => ({ id: "user-1", email: "louie@example.test" }),
  getCompanyMembers: () => [{ user_id: "user-1", role: "admin" }, { user_id: "user-2", role: "technician" }],
  getTeamInvites: () => [{ id: "invite-1", email: "tech@example.test", role: "manager", default_location_id: "loc-1", created_at: "2026-05-27T12:00:00Z" }],
  getTeamInvitesReady: () => true,
  getTeamInviteCancelError: () => "Cancel <failed>",
  getPendingCancelInviteId: () => "invite-1",
  getTeamInviteLinks: () => [{ id: "link-1", token: "join-token", role: "technician", default_location_id: "loc-1", created_at: "2026-05-27T12:00:00Z", expires_at: "2099-05-27T12:00:00Z" }],
  getTeamInviteLinksReady: () => true,
  getTeamInviteLinkError: () => "",
  getPendingRevokeInviteLinkId: () => "link-1",
  getRequestNotificationRecipients: () => [{ id: "recipient-1", email: "maintenance@example.test", label: "Maintenance Desk", location_id: "loc-1", is_active: true }],
  getRequestNotificationRecipientsReady: () => true,
  getRequestNotificationRecipientError: () => "",
  getSession: () => ({ user: { id: "user-1", email: "louie@example.test" } }),
  getLocations: () => [{ id: "loc-1", name: "QA Facility" }],
  getActiveCompanyMembership: () => ({ default_location_id: "loc-1" }),
  matchesSearch: () => true,
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  roleDescription: (role) => `${role} role`,
  roleLabel: (role) => role.toUpperCase(),
  normalizeRole: (role) => role,
  teamMemberWorkload: () => ({ newWork: 1, inProgress: 2, blocked: 3, completed: 5, overdue: 4 }),
  canManageTeam: () => true,
  canAdministerTeamRoles: () => true,
  teamRoleOptionsForActor: () => ["technician", "production", "accounting", "manager", "admin"],
  COMPANY_ROLES: ["technician", "production", "accounting", "manager", "admin"],
  renderLocationOptions: () => '<option value="loc-1">QA Facility</option>',
  inviteDefaultLocationLabel: () => "Default location: QA Facility",
  teamInviteSignupUrl: () => "https://example.test/MaintainOps/",
  teamJoinUrl: (token) => `https://example.test/MaintainOps/?join=${token}`,
};

const helpers = createTeamMemberDisplayHelpers(baseDeps);

assert.equal(helpers.teamMemberName("user-1"), "Louie");
assert.equal(helpers.filteredMembers().length, 2);

const teamSection = helpers.renderTeamSection({
  id: "members",
  label: "Team <Members>",
  meta: "2 shown",
  open: true,
  content: '<article class="member-card">Member content</article>',
});
assert.match(teamSection, /data-team-section="members" open/);
assert.match(teamSection, /Team &lt;Members&gt;/);
assert.match(teamSection, /2 shown/);
assert.match(teamSection, /Member content/);

const member = helpers.renderMember({ user_id: "user-2", role: "technician" });
assert.match(member, /Default location: <strong>Not set<\/strong>/);
assert.match(member, /Taylor Tech/);
assert.match(member, /technician role/);
assert.match(member, /data-view-member-work="user-2"/);
assert.match(member, /data-member-role="user-2"/);
assert.match(member, /5 Completed/);
assert.match(member, /4 Overdue/);

for (const role of baseDeps.COMPANY_ROLES) {
  const located = helpers.renderMember({ user_id: "user-2", role, default_location_id: "loc-1" });
  assert.match(located, /Default location: <strong>QA Facility<\/strong>/);
  assert.doesNotMatch(located, /name="default_location_id"/);
}
assert.match(helpers.renderMember({ user_id: "user-1", role: "admin", default_location_id: "loc-1" }), /Default location: <strong>QA Facility<\/strong>/);
const unavailable = helpers.renderMember({ user_id: "user-2", role: "technician", default_location_id: "missing-location-id" });
assert.match(unavailable, /Default location: <strong>Location unavailable<\/strong>/);
assert.doesNotMatch(unavailable, /missing-location-id/);
const escapedLocation = createTeamMemberDisplayHelpers({
  ...baseDeps, getLocations: () => [{ id: "loc-1", name: "Salem <script>alert(1)</script>" }],
}).renderMember({ user_id: "user-2", role: "technician", default_location_id: "loc-1" });
assert.match(escapedLocation, /Salem &lt;script&gt;/);
assert.doesNotMatch(escapedLocation, /<script>/);
const locationSearch = createTeamMemberDisplayHelpers({
  ...baseDeps,
  getCompanyMembers: () => [
    { user_id: "user-1", role: "admin" },
    { user_id: "user-2", role: "technician", default_location_id: "loc-1" },
  ],
  matchesSearch: values => values.some(value => String(value || "").toLowerCase().includes("qa facility")),
});
assert.deepEqual(locationSearch.filteredMembers().map(item => item.user_id), ["user-2"]);

const profile = helpers.renderMyProfileForm();
assert.match(profile, /id="profile-form"/);
assert.match(profile, /louie@example\.test/);
assert.match(profile, /name="mobile_tech" type="checkbox" checked/);

const passwordChange = helpers.renderPasswordChangeForm();
assert.match(passwordChange, /id="password-change-form"/);
assert.match(passwordChange, /Account Security/);
assert.match(passwordChange, /name="password" type="password" minlength="8"/);
assert.match(passwordChange, /name="confirmPassword" type="password" minlength="8"/);
assert.match(passwordChange, /id="password-change-error"/);
assert.match(passwordChange, /Update Password/);

const requestRecipients = helpers.renderRequestNotificationRecipients("loc-1");
assert.match(requestRecipients, /Request Email Recipients/);
assert.match(requestRecipients, /maintenance@example\.test/);
assert.match(requestRecipients, /Maintenance Desk/);
assert.match(requestRecipients, /QA Facility/);
assert.match(requestRecipients, /data-delete-request-notification-recipient="recipient-1"/);
assert.match(requestRecipients, /id="request-notification-recipient-form"/);

const inviteForm = helpers.renderTeamInviteForm("loc-1");
assert.match(inviteForm, /id="team-invite-form"/);
assert.match(inviteForm, /name="default_location_id"/);
assert.match(inviteForm, /QA Facility/);
assert.match(inviteForm, /value="manager"/);
assert.match(inviteForm, /value="accounting"/);
assert.match(inviteForm, /value="production"/);
assert.match(inviteForm, /value="admin"/);

const inviteLinks = helpers.renderTeamInviteLinks("loc-1");
assert.match(inviteLinks, /Join Links/);
assert.match(inviteLinks, /TECHNICIAN join link/);
assert.match(inviteLinks, /https:\/\/example\.test\/MaintainOps\/\?join=join-token/);
assert.match(inviteLinks, /Email is not sent automatically/);
assert.match(inviteLinks, /data-copy-team-invite/);
assert.match(inviteLinks, /data-revoke-invite-link-cancel/);
assert.match(inviteLinks, /data-confirm-revoke-invite-link="link-1"/);

const invites = helpers.renderTeamInvites();
assert.match(invites, /tech@example\.test/);
assert.match(invites, /Email is not sent automatically/);
assert.match(invites, /data-copy-team-invite/);
assert.match(invites, /https:\/\/example\.test\/MaintainOps\//);
assert.match(invites, /Cancel &lt;failed&gt;/);
assert.match(invites, /data-cancel-invite-cancel/);
assert.match(invites, /data-confirm-cancel-invite="invite-1"/);

const managerHelpers = createTeamMemberDisplayHelpers({
  ...baseDeps,
  canAdministerTeamRoles: () => false,
  teamRoleOptionsForActor: () => ["technician"],
});
const managerInviteForm = managerHelpers.renderTeamInviteForm("loc-1");
assert.doesNotMatch(managerInviteForm, /value="manager"/);
assert.doesNotMatch(managerInviteForm, /value="accounting"/);
assert.doesNotMatch(managerInviteForm, /value="production"/);
assert.doesNotMatch(managerInviteForm, /value="admin"/);
assert.match(managerInviteForm, /Manager invites add technicians to your default location/);
assert.match(managerInviteForm, /name="default_location_id" type="hidden" value="loc-1"/);
assert.doesNotMatch(managerInviteForm, /<select name="default_location_id"/);
const managerMember = managerHelpers.renderMember({ user_id: "user-2", role: "technician" });
assert.doesNotMatch(managerMember, /data-member-role="user-2"/);
assert.match(managerMember, /member-role-description">technician role/);
assert.match(managerMember, /member-role-badge">TECHNICIAN/);
for (const viewerRole of baseDeps.COMPANY_ROLES) {
  const canViewRoles = ["admin", "manager"].includes(viewerRole);
  const roleHelpers = createTeamMemberDisplayHelpers({
    ...baseDeps,
    canManageTeam: () => canViewRoles,
    canAdministerTeamRoles: () => viewerRole === "admin",
  });
  for (const memberRole of baseDeps.COMPANY_ROLES) {
    for (const userId of ["user-1", "user-2"]) {
      const html = roleHelpers.renderMember({ user_id: userId, role: memberRole, default_location_id: "loc-1" });
      assert.match(html, /Default location: <strong>QA Facility<\/strong>/);
      assert.match(html, /5 Completed/);
      assert.match(html, /View Work/);
      assert.equal(html.includes("member-role-description"), canViewRoles, `${viewerRole} viewing ${memberRole}`);
      assert.equal(html.includes("data-member-role="), viewerRole === "admin" && userId !== "user-1");
      assert.equal(html.includes("member-role-badge"), canViewRoles && (viewerRole !== "admin" || userId === "user-1"));
      if (!canViewRoles) {
        assert.doesNotMatch(html, /technician|production|accounting|manager|admin/i);
      }
    }
  }
}

let viewerCanManageTeam = true;
let search = "manager";
const changingViewer = createTeamMemberDisplayHelpers({
  ...baseDeps,
  canManageTeam: () => viewerCanManageTeam,
  canAdministerTeamRoles: () => false,
  getCompanyMembers: () => [{ user_id: "user-2", role: "manager", default_location_id: "loc-1" }],
  matchesSearch: values => values.some(value => String(value || "").toLowerCase().includes(search)),
});
assert.equal(changingViewer.filteredMembers().length, 1, "Managers can search roles");
assert.match(changingViewer.renderMember({ user_id: "user-2", role: "manager" }), /MANAGER/);
viewerCanManageTeam = false;
assert.equal(changingViewer.filteredMembers().length, 0, "Role search must not reveal hidden roles after switching viewer");
assert.doesNotMatch(changingViewer.renderMember({ user_id: "user-2", role: "manager" }), /manager/i);
for (const visibleSearch of ["taylor", "qa facility"]) {
  search = visibleSearch;
  assert.equal(changingViewer.filteredMembers().length, 1, "Names and locations remain searchable");
}
const missingVisibility = createTeamMemberDisplayHelpers({ ...baseDeps, canManageTeam: undefined });
assert.doesNotMatch(missingVisibility.renderMember({ user_id: "user-2", role: "manager" }), /manager|data-member-role/i);
const managerRequestRecipients = managerHelpers.renderRequestNotificationRecipients("loc-1");
assert.match(managerRequestRecipients, /Only admins can change request email routing/);
assert.doesNotMatch(managerRequestRecipients, /id="request-notification-recipient-form"/);
assert.doesNotMatch(managerRequestRecipients, /data-delete-request-notification-recipient/);
const managerInviteLinks = managerHelpers.renderTeamInviteLinks("loc-1");
assert.match(managerInviteLinks, /Create one technician join link/);
assert.doesNotMatch(managerInviteLinks, /value="manager"/);
assert.doesNotMatch(managerInviteLinks, /value="accounting"/);
assert.doesNotMatch(managerInviteLinks, /value="production"/);
assert.doesNotMatch(managerInviteLinks, /value="admin"/);

console.log("team member display smoke passed");
