(function () {
  function createPublicRequestDisplayHelpers(deps = {}) {
    const escapeHtml = deps.escapeHtml;
    const qrSvgFor = deps.qrSvgFor;
    const getLocations = deps.getLocations || (() => []);
    const getPublicRequestLinks = deps.getPublicRequestLinks || (() => []);
    const getPublicRequestLinksReady = deps.getPublicRequestLinksReady || (() => true);
    const getPublicAppUrlOverride = deps.getPublicAppUrlOverride || (() => "");
    const getWindowPublicAppUrl = deps.getWindowPublicAppUrl || (() => "");
    const canManageTeam = deps.canManageTeam || (() => false);
    const canAdministerPublicRequestLinks = deps.canAdministerPublicRequestLinks || (() => false);
    const publicAppBaseUrl = deps.publicAppBaseUrl;
    const publicRequestUrl = deps.publicRequestUrl;
    const publicRequestQrUrl = deps.publicRequestQrUrl;

    function loadingQrPage() {
      return `
        <section class="auth-shell public-request-shell qr-page-shell">
          <div class="auth-card public-qr-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Maintenance Request QR</h1>
                <p>Loading QR code...</p>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    function publicRequestQrPage(intake, requestUrl) {
      return `
        <section class="auth-shell public-request-shell qr-page-shell">
          <article class="auth-card public-qr-card">
            <div class="public-qr-heading">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${escapeHtml(intake.location_name)}</h1>
                <p>${escapeHtml(intake.company_name)}</p>
              </div>
            </div>
            <div class="public-qr-code">${qrSvgFor(requestUrl, 8)}</div>
            <div class="public-qr-instructions">
              <h2>Scan To Request Maintenance</h2>
              <p>Point your phone camera at this code and describe what needs attention.</p>
            </div>
            <p class="public-qr-url">${escapeHtml(requestUrl)}</p>
            <div class="button-row no-print">
              <button class="primary-button request-action-button" id="print-public-qr" type="button">Print / Save PDF</button>
              <a class="secondary-button" href="${escapeHtml(requestUrl)}" target="_blank" rel="noreferrer">Test Form</a>
            </div>
          </article>
        </section>
      `;
    }

    function loadingRequestForm() {
      return `
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Maintenance Request</h1>
                <p>Loading request form...</p>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    function publicRequestForm(intake) {
      return `
        <section class="auth-shell public-request-shell">
          <form class="auth-card public-request-card" id="public-request-form">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>${escapeHtml(intake.company_name)}</h1>
                <p>${escapeHtml(intake.location_name)} maintenance request</p>
              </div>
            </div>
            <div class="form-grid">
              <label>What needs attention?<input name="title" required maxlength="140" placeholder="Short issue description"></label>
              <label>Machine / area<input name="equipment_note" maxlength="140" placeholder="Roll former 1, saw area, aisle 3"></label>
              <label>Details<textarea name="description" rows="4" maxlength="1000" placeholder="What is happening? Any noise, leak, jam, alarm, or safety concern?"></textarea></label>
              <label>Photo<input name="photo" type="file" accept="image/*" capture="environment"><small>Optional. Photos are optimized up to 2400px before upload.</small></label>
              <label>Your name<input name="requester_name" maxlength="120" placeholder="Optional"></label>
              <label>Contact<input name="requester_contact" maxlength="160" placeholder="Optional phone, radio, or email"></label>
              <label>Urgency
                <select name="priority">
                  <option value="medium">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical / down</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
            <p class="error-text" id="public-request-error"></p>
            <button class="primary-button request-action-button" type="submit">Send Request</button>
          </form>
        </section>
      `;
    }

    function publicRequestError(message) {
      return `
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Link Unavailable</h1>
                <p>${escapeHtml(message)}</p>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    function publicRequestSuccess(intake, photoWarning = "") {
      return `
        <section class="auth-shell public-request-shell">
          <div class="auth-card public-request-card">
            <div class="brand-row">
              <span class="brand-mark">MO</span>
              <div>
                <h1>Request Sent</h1>
                <p>${escapeHtml(intake.location_name)} maintenance has received it.</p>
              </div>
            </div>
            ${photoWarning ? `<p class="error-text">${escapeHtml(photoWarning)}</p>` : ""}
            <button class="secondary-button request-action-button" id="public-request-another" type="button">Send Another Request</button>
          </div>
        </section>
      `;
    }

    function publicRequestLinkManager() {
      if (!canManageTeam()) return "";
      const publicBaseUrl = publicAppBaseUrl();
      const locations = getLocations();
      const publicRequestLinksReady = getPublicRequestLinksReady();
      return `
        <section class="settings-summary public-request-links">
          <div class="settings-section-heading">
            <h3>Location Request QR Links</h3>
            <p class="muted">Post these QR codes so operators can submit a location-specific request without app access.</p>
          </div>
          <form class="form-grid settings-form public-app-url-form" id="public-app-url-form">
            <label>Public MaintainOps URL
              <input name="public_app_url" value="${escapeHtml(getPublicAppUrlOverride() || String(getWindowPublicAppUrl() || ""))}" placeholder="https://loufish727.github.io/your-maintainops-repo/">
            </label>
            <button class="secondary-button request-action-button" type="submit">Save URL</button>
          </form>
          <p class="muted">Use the exact GitHub Pages URL where MaintainOps opens. Do not use the root URL if that opens another app.</p>
          ${publicBaseUrl ? `<p class="muted">QR codes will point to ${escapeHtml(publicBaseUrl)}</p>` : `<p class="warning-text">Set the public MaintainOps URL before copying or printing QR codes from this local app.</p>`}
          <p class="error-text" id="public-request-link-error">${publicRequestLinksReady ? "" : "Run supabase/step-next-public-request-links.sql before creating QR request links."}</p>
          <div class="public-request-link-grid">
            ${locations.map(publicRequestLocationCard).join("") || `<article><strong>No locations yet</strong><span>Add a location before creating request QR codes.</span></article>`}
          </div>
        </section>
      `;
    }

    function publicRequestLocationCard(location) {
      const link = getPublicRequestLinks().find((item) => item.location_id === location.id);
      const linkActive = Boolean(link && link.is_active !== false);
      const canAdministerLinks = canAdministerPublicRequestLinks();
      const requestUrl = linkActive ? publicRequestUrl(link.token) : "";
      const qrUrl = linkActive ? publicRequestQrUrl(link.token) : "";
      const hasUsableUrl = Boolean(requestUrl && qrUrl);
      return `
        <article class="public-request-link-card">
          <div>
            <strong>${escapeHtml(location.name)}</strong>
            <span>${linkActive ? "External request link active" : link ? "Request link disabled" : "No request link yet"}</span>
            ${link?.last_used_at ? `<span>Last used ${new Date(link.last_used_at).toLocaleString()}</span>` : ""}
          </div>
          ${linkActive ? `
            <div class="qr-preview">${hasUsableUrl ? qrSvgFor(requestUrl) : `<div class="qr-fallback">Set URL</div>`}</div>
            <input class="copy-field" value="${escapeHtml(qrUrl || "Set the public MaintainOps URL first")}" readonly>
            <div class="button-row">
              <a class="primary-button request-action-button ${hasUsableUrl ? "" : "disabled-link"}" href="${escapeHtml(qrUrl || "#")}" target="_blank" rel="noreferrer">Open QR Code</a>
              <button class="secondary-button request-action-button" data-copy-public-request-link="${escapeHtml(qrUrl)}" type="button" ${hasUsableUrl ? "" : "disabled"}>Copy QR Link</button>
              <a class="secondary-button ${hasUsableUrl ? "" : "disabled-link"}" href="${escapeHtml(requestUrl || "#")}" target="_blank" rel="noreferrer">Test Form</a>
              ${canAdministerLinks ? `
                <button class="secondary-button request-action-button" data-regenerate-public-request-link="${escapeHtml(link.id)}" type="button">Regenerate QR</button>
                <button class="secondary-button danger-link" data-disable-public-request-link="${escapeHtml(link.id)}" type="button">Disable Link</button>
              ` : `<span class="muted">Only admins can replace or disable posted QR codes.</span>`}
            </div>
          ` : link ? `
            <div class="qr-preview inactive-qr-preview"><div class="qr-fallback">Off</div></div>
            <div class="button-row">
              ${canAdministerLinks ? `
                <button class="secondary-button request-action-button" data-enable-public-request-link="${escapeHtml(link.id)}" type="button">Reactivate Same QR</button>
                <button class="primary-button request-action-button" data-regenerate-public-request-link="${escapeHtml(link.id)}" type="button">Regenerate QR</button>
              ` : `<span class="muted">Only admins can reactivate or replace this QR code.</span>`}
            </div>
          ` : `
            <button class="secondary-button request-action-button" data-create-public-request-link="${escapeHtml(location.id)}" type="button" ${getPublicRequestLinksReady() ? "" : "disabled"}>Create QR Link</button>
          `}
        </article>
      `;
    }

    return {
      loadingQrPage,
      publicRequestQrPage,
      loadingRequestForm,
      publicRequestForm,
      publicRequestError,
      publicRequestSuccess,
      publicRequestLinkManager,
      publicRequestLocationCard,
    };
  }

  window.MaintainOpsPublicRequestDisplay = {
    createPublicRequestDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPublicRequestDisplayHelpers };
  }
})();
