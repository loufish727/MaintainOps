(function () {
  /*
   * Module contract: owns public request link admin button binding only.
   * Requires injected app-owned callbacks for create, disable, enable, and regenerate.
   * Must not own public request link data, token generation, Supabase/RLS, or public intake submit.
   */
  function bindWorkspacePublicRequestLinkAdminEvents(options = {}) {
    const doc = options.documentRef || document;
    const createPublicRequestLink = options.createPublicRequestLink;
    const disablePublicRequestLink = options.disablePublicRequestLink;
    const setPublicRequestLinkActive = options.setPublicRequestLinkActive;
    const regeneratePublicRequestLink = options.regeneratePublicRequestLink;

    if (typeof createPublicRequestLink === "function") {
      doc.querySelectorAll("[data-create-public-request-link]").forEach((button) => {
        button.addEventListener("click", () => createPublicRequestLink(button.dataset.createPublicRequestLink));
      });
    }

    if (typeof disablePublicRequestLink === "function") {
      doc.querySelectorAll("[data-disable-public-request-link]").forEach((button) => {
        button.addEventListener("click", () => disablePublicRequestLink(button.dataset.disablePublicRequestLink));
      });
    }

    if (typeof setPublicRequestLinkActive === "function") {
      doc.querySelectorAll("[data-enable-public-request-link]").forEach((button) => {
        button.addEventListener("click", () => setPublicRequestLinkActive(button.dataset.enablePublicRequestLink, true));
      });
    }

    if (typeof regeneratePublicRequestLink === "function") {
      doc.querySelectorAll("[data-regenerate-public-request-link]").forEach((button) => {
        button.addEventListener("click", () => regeneratePublicRequestLink(button.dataset.regeneratePublicRequestLink));
      });
    }
  }

  window.MaintainOpsWorkspacePublicRequestLinkAdminEvents = {
    bindWorkspacePublicRequestLinkAdminEvents,
  };

  if (typeof module !== "undefined") {
    module.exports = { bindWorkspacePublicRequestLinkAdminEvents };
  }
})();
