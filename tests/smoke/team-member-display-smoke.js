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
  getRequestNotificationRecipients: () => [{ id: "recipient-1", email: "maintenance@example.test", label: "Maintenance Desk", location_id: "loc-1", is_active: true }],
  getRequestNotificationRecipientsReady: () => true,
  getRequestNotificationRecipientError: () => "",
  getSession: () => ({ user: { id: "user-1", email: "louie@example.test" } }),
  getLocations: () => [{ id: "loc-1", name: "QA Facility" }],
  matchesSearch: () => true,
  escapeHtml: (value) => String(value ?? "").replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
  roleDescription: (role) => `${role} role`,
  roleLabel: (role) => role.toUpperCase(),
  normalizeRole: (role) => role,
  teamMemberWorkload: () => ({ newWork: 1, inProgress: 2, blocked: 3, overdue: 4 }),
  canManageTeam: () => true,
  canAdministerTeamRoles: () => true,
  teamRoleOptionsForActor: () => ["technician", "manager", "admin"],
  COMPANY_ROLES: ["technician", "manager", "admin"],
  renderLocationOptions: () => '<option value="loc-1">QA Facility</option>',
  inviteDefaultLocationLabel: () => "Default location: QA Facility",
  teamInviteSignupUrl: () => "https://example.test/MaintainOps/",
};

const helpers = createTeamMemberDisplayHelpers(baseDeps);

assert.equal(helpers.teamMemberName("user-1"), "Louie");
assert.equal(helpers.filteredMembers().length, 2);

const member = helpers.renderMember({ user_id: "user-2", role: "technician" });
assert.match(member, /Taylor Tech/);
assert.match(member, /technician role/);
assert.match(member, /data-view-member-work="user-2"/);
assert.match(member, /data-member-role="user-2"/);
assert.match(member, /4 Overdue/);

const profile = helpers.renderMyProfileForm();
assert.match(profile, /id="profile-form"/);
assert.match(profile, /louie@example\.test/);
assert.match(profile, /name="mobile_tech" type="checkbox" checked/);

const requestRecipients = helpers.renderRequestNotificationRecipients("loc-1");
assert.match(requestRecipients, /Request Email Recipients/);
assert.match(requestRecipients, /maintenance@example\.test/);
assert.match(requestRecipients, /Maintenance Desk/);
assert.match(requestRecipients, /QA Facility/);
assert.match(requestRecipients, /data-delete-request-notification-recipient="recipient-1"/);

const inviteForm = helpers.renderTeamInviteForm("loc-1");
assert.match(inviteForm, /id="team-invite-form"/);
assert.match(inviteForm, /name="default_location_id"/);
assert.match(inviteForm, /QA Facility/);
assert.match(inviteForm, /value="manager"/);
assert.match(inviteForm, /value="admin"/);

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
assert.doesNotMatch(managerInviteForm, /value="admin"/);
const managerMember = managerHelpers.renderMember({ user_id: "user-2", role: "technician" });
assert.doesNotMatch(managerMember, /data-member-role="user-2"/);

console.log("team member display smoke passed");
