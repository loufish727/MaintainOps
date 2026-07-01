(function () {
  function createTeamWorkflow(deps = {}) {
    const documentRef = deps.documentRef || document;
    const FormDataCtor = deps.FormDataCtor || FormData;

    function bindTeamWorkflowEvents() {
      const memberForm = documentRef.querySelector("#add-member-form");
      if (memberForm) memberForm.addEventListener("submit", addCompanyMember);

      documentRef.querySelectorAll("[data-member-role]").forEach((form) => {
        form.addEventListener("submit", updateCompanyMemberRole);
      });

      const profileForm = documentRef.querySelector("#profile-form");
      if (profileForm) profileForm.addEventListener("submit", updateMyProfile);

      const passwordChangeForm = documentRef.querySelector("#password-change-form");
      if (passwordChangeForm) passwordChangeForm.addEventListener("submit", updateMyPassword);

      const inviteForm = documentRef.querySelector("#team-invite-form");
      if (inviteForm) inviteForm.addEventListener("submit", createTeamInvite);

      const inviteLinkForm = documentRef.querySelector("#team-invite-link-form");
      if (inviteLinkForm) inviteLinkForm.addEventListener("submit", createTeamInviteLink);

      documentRef.querySelectorAll("[data-revoke-invite-link]").forEach((button) => {
        button.addEventListener("click", () => {
          deps.setPendingRevokeInviteLinkId(button.dataset.revokeInviteLink);
          deps.renderWorkspace();
        });
      });

      documentRef.querySelectorAll("[data-revoke-invite-link-cancel]").forEach((button) => {
        button.addEventListener("click", () => {
          deps.setPendingRevokeInviteLinkId(null);
          deps.renderWorkspace();
        });
      });

      documentRef.querySelectorAll("[data-confirm-revoke-invite-link]").forEach((button) => {
        button.addEventListener("click", () => revokeTeamInviteLink(button.dataset.confirmRevokeInviteLink));
      });

      const requestNotificationForm = documentRef.querySelector("#request-notification-recipient-form");
      if (requestNotificationForm) requestNotificationForm.addEventListener("submit", createRequestNotificationRecipient);

      documentRef.querySelectorAll("[data-delete-request-notification-recipient]").forEach((button) => {
        button.addEventListener("click", () => deleteRequestNotificationRecipient(button.dataset.deleteRequestNotificationRecipient));
      });
    }

    async function addCompanyMember(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const form = new FormDataCtor(formElement);
      const selectedRole = String(form.get("role") || "technician").trim().toLowerCase();
      const submitButton = formElement.querySelector("button[type='submit']");
      if (!deps.canAdministerTeamRoles?.() && selectedRole !== "technician") {
        deps.alertUser("Only admins can grant manager or admin roles.");
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("company_members").insert({
            company_id: deps.getActiveCompanyId(),
            user_id: form.get("user_id"),
            role: selectedRole,
          }),
          "Team member save timed out."
        );
        if (error) throw error;
        await deps.render();
      } catch (error) {
        deps.alertUser(error.message || error);
      } finally {
        if (submitButton?.isConnected) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Member";
        }
      }
    }

    async function updateCompanyMemberRole(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const form = new FormDataCtor(formElement);
      const selectedRole = String(form.get("role") || "").trim().toLowerCase();
      const submitButton = formElement.querySelector("button[type='submit']");
      if (!deps.canAdministerTeamRoles?.()) {
        deps.showNotice("Only admins can change team roles.", "warning");
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("update_company_member_role", {
            target_company_id: deps.getActiveCompanyId(),
            target_user_id: formElement.dataset.memberRole,
            new_role: selectedRole,
          }),
          "Role save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          throw new Error(error.message.includes("update_company_member_role")
            ? "Run supabase/step-next-team-roles.sql before editing roles."
            : error.message);
        }

        await deps.loadMembers();
        deps.showNotice("Role saved.");
        deps.render();
      } catch (error) {
        deps.showNotice(`Could not save role: ${error.message || error}`, "warning");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Role";
        }
      }
    }

    async function updateMyProfile(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#profile-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      const fullName = String(form.get("full_name") || "").trim();
      const mobileTechField = formElement.querySelector('input[name="mobile_tech"]');
      const mobileTech = mobileTechField ? mobileTechField.checked : Boolean(deps.getProfilesByUserId()[deps.getSession().user.id]?.mobile_tech);
      if (errorElement) errorElement.textContent = "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("profiles")
            .upsert({
              company_id: deps.getActiveCompanyId(),
              user_id: deps.getSession().user.id,
              full_name: fullName,
              mobile_tech: mobileTech,
            }, { onConflict: "company_id,user_id" }),
          "Profile save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (deps.isMissingColumnError(error, "mobile_tech")) {
            throw new Error("Run supabase/step-next-mobile-tech-setting.sql before saving Mobile tech settings.");
          }
          throw error;
        }

        deps.showNotice("Profile saved.");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not save profile.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Save Profile";
        }
      }
    }

    async function createTeamInvite(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#team-invite-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      const selectedRole = String(form.get("role") || "technician").trim().toLowerCase();
      if (errorElement) errorElement.textContent = "";
      if (!deps.getTeamInvitesReady()) {
        if (errorElement) errorElement.textContent = "Run supabase/step-next-invite-default-location.sql before inviting by email.";
        return;
      }
      if (!deps.canAdministerTeamRoles?.() && selectedRole !== "technician") {
        if (errorElement) errorElement.textContent = "Only admins can invite managers or admins.";
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Inviting...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("create_company_invite", {
            target_company_id: deps.getActiveCompanyId(),
            invite_email: String(form.get("email") || "").trim(),
            invite_role: selectedRole,
            invite_default_location_id: form.get("default_location_id") || null,
          }),
          "Invite save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (error.message.includes("create_company_invite") || deps.isColumnSchemaError(error, ["company_invites"])) {
            deps.setTeamInvitesReady(false);
            throw new Error("Run supabase/step-next-invite-default-location.sql before inviting by email.");
          }
          throw error;
        }

        deps.showNotice("Invite created.");
        deps.setTeamInviteCancelError("");
        await deps.render();
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not create invite.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Create Invite";
        }
      }
    }

    async function cancelTeamInvite(inviteId) {
      if (!inviteId || !deps.getActiveCompanyId()) return;
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("cancel_company_invite", {
            target_company_id: deps.getActiveCompanyId(),
            target_invite_id: inviteId,
          }),
          "Invite cancel timed out. Check your connection and try again.",
          15000
        );
        if (error) {
          if (error.message.includes("cancel_company_invite")) {
            throw new Error("Run supabase/step-next-cancel-team-invites.sql before canceling invites.");
          }
          throw error;
        }
        deps.setPendingCancelInviteId(null);
        deps.setTeamInviteCancelError("");
        deps.showNotice("Invite canceled.");
        await deps.loadTeamInvites();
        deps.renderWorkspace();
      } catch (error) {
        deps.setPendingCancelInviteId(null);
        deps.setTeamInviteCancelError(error.message || "Could not cancel invite.");
        deps.renderWorkspace();
      }
    }

    async function updateMyPassword(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#password-change-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      const password = String(form.get("password") || "");
      const confirmPassword = String(form.get("confirmPassword") || "");
      if (errorElement) errorElement.textContent = "";

      if (password.length < 8) {
        if (errorElement) errorElement.textContent = "Password must be at least 8 characters.";
        return;
      }

      if (password !== confirmPassword) {
        if (errorElement) errorElement.textContent = "Passwords do not match.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Updating...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().auth.updateUser({ password }),
          "Password update timed out. Check your connection and try again.",
          15000
        );

        if (error) throw error;

        if (typeof formElement.reset === "function") formElement.reset();
        deps.showNotice("Password updated.");
      } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Could not update password.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Update Password";
        }
      }
    }

    async function createTeamInviteLink(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#team-invite-link-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      const selectedRole = String(form.get("role") || "technician").trim().toLowerCase();
      if (errorElement) errorElement.textContent = "";
      deps.setTeamInviteLinkError("");
      if (!deps.getTeamInviteLinksReady()) {
        const message = "Run supabase/step-next-invite-links.sql before creating join links.";
        deps.setTeamInviteLinkError(message);
        if (errorElement) errorElement.textContent = message;
        return;
      }
      if (selectedRole === "admin") {
        const message = "Admin join links are not allowed.";
        deps.setTeamInviteLinkError(message);
        if (errorElement) errorElement.textContent = message;
        return;
      }
      if (!deps.canAdministerTeamRoles?.() && selectedRole !== "technician") {
        const message = "Managers can only create technician join links.";
        deps.setTeamInviteLinkError(message);
        if (errorElement) errorElement.textContent = message;
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Creating...";
      }

      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("create_company_invite_link", {
            target_company_id: deps.getActiveCompanyId(),
            link_role: selectedRole,
            link_location_id: form.get("default_location_id") || null,
          }),
          "Join link save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (error.message.includes("create_company_invite_link") || deps.isColumnSchemaError(error, ["company_invite_links"])) {
            deps.setTeamInviteLinksReady(false);
            throw new Error("Run supabase/step-next-invite-links.sql before creating join links.");
          }
          throw error;
        }

        deps.setTeamInviteLinkError("");
        deps.showNotice("Join link created.");
        await deps.loadTeamInviteLinks();
        deps.renderWorkspace();
      } catch (error) {
        const message = error.message || "Could not create join link.";
        deps.setTeamInviteLinkError(message);
        if (errorElement) errorElement.textContent = message;
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Create Join Link";
        }
      }
    }

    async function revokeTeamInviteLink(linkId) {
      if (!linkId || !deps.getActiveCompanyId()) return;
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().rpc("revoke_company_invite_link", {
            link_id: linkId,
          }),
          "Join link revoke timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (error.message.includes("revoke_company_invite_link") || deps.isColumnSchemaError(error, ["company_invite_links"])) {
            deps.setTeamInviteLinksReady(false);
            throw new Error("Run supabase/step-next-invite-links.sql before revoking join links.");
          }
          throw error;
        }

        deps.setPendingRevokeInviteLinkId(null);
        deps.setTeamInviteLinkError("");
        deps.showNotice("Join link revoked.");
        await deps.loadTeamInviteLinks();
        deps.renderWorkspace();
      } catch (error) {
        deps.setPendingRevokeInviteLinkId(null);
        deps.setTeamInviteLinkError(error.message || "Could not revoke join link.");
        deps.renderWorkspace();
      }
    }

    async function createRequestNotificationRecipient(event) {
      event.preventDefault();
      const formElement = event.currentTarget;
      const errorElement = documentRef.querySelector("#request-notification-recipient-error");
      const submitButton = formElement.querySelector("button[type='submit']");
      const form = new FormDataCtor(formElement);
      if (errorElement) errorElement.textContent = "";
      if (!deps.canAdministerTeamRoles?.()) {
        const message = "Only admins can change request email routing.";
        deps.setRequestNotificationRecipientError(message);
        if (errorElement) errorElement.textContent = message;
        return;
      }
      if (!deps.getRequestNotificationRecipientsReady()) {
        if (errorElement) errorElement.textContent = "Run supabase/step-next-request-notification-recipients.sql before routing request emails.";
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Adding...";
      }

      try {
        const email = String(form.get("email") || "").trim().toLowerCase();
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient().from("request_notification_recipients").insert({
            company_id: deps.getActiveCompanyId(),
            location_id: form.get("location_id") || null,
            email,
            label: String(form.get("label") || "").trim() || null,
            is_active: true,
            created_by: deps.getSession().user.id,
          }),
          "Request email recipient save timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (deps.isColumnSchemaError(error, ["request_notification_recipients"]) || error.message.includes("request_notification_recipients")) {
            deps.setRequestNotificationRecipientsReady(false);
            throw new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.");
          }
          throw error;
        }

        deps.setRequestNotificationRecipientError("");
        deps.showNotice("Request email recipient saved.");
        await deps.loadRequestNotificationRecipients();
        deps.renderWorkspace();
      } catch (error) {
        const message = error.message || "Could not save request email recipient.";
        deps.setRequestNotificationRecipientError(message);
        if (errorElement) errorElement.textContent = message;
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Add Recipient";
        }
      }
    }

    async function deleteRequestNotificationRecipient(recipientId) {
      if (!recipientId || !deps.getActiveCompanyId()) return;
      if (!deps.canAdministerTeamRoles?.()) {
        deps.setRequestNotificationRecipientError("Only admins can change request email routing.");
        deps.renderWorkspace();
        return;
      }
      try {
        const { error } = await deps.withOperationTimeout(
          deps.supabaseClient()
            .from("request_notification_recipients")
            .delete()
            .eq("company_id", deps.getActiveCompanyId())
            .eq("id", recipientId),
          "Request email recipient remove timed out. Check your connection and try again.",
          15000
        );

        if (error) {
          if (deps.isColumnSchemaError(error, ["request_notification_recipients"]) || error.message.includes("request_notification_recipients")) {
            deps.setRequestNotificationRecipientsReady(false);
            throw new Error("Run supabase/step-next-request-notification-recipients.sql before routing request emails.");
          }
          throw error;
        }

        deps.setRequestNotificationRecipientError("");
        deps.showNotice("Request email recipient removed.");
        await deps.loadRequestNotificationRecipients();
        deps.renderWorkspace();
      } catch (error) {
        deps.setRequestNotificationRecipientError(error.message || "Could not remove request email recipient.");
        deps.renderWorkspace();
      }
    }

    return {
      bindTeamWorkflowEvents,
      addCompanyMember,
      updateCompanyMemberRole,
      updateMyProfile,
      updateMyPassword,
      createTeamInvite,
      cancelTeamInvite,
      createTeamInviteLink,
      revokeTeamInviteLink,
      createRequestNotificationRecipient,
      deleteRequestNotificationRecipient,
    };
  }

  window.MaintainOpsTeamWorkflow = {
    createTeamWorkflow,
  };

  if (typeof module !== "undefined") {
    module.exports = { createTeamWorkflow };
  }
})();
