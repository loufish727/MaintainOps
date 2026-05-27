(function () {
  function createPublicRequestDisplayHelpers(deps = {}) {
    const escapeHtml = deps.escapeHtml;
    const qrSvgFor = deps.qrSvgFor;

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

    return {
      loadingQrPage,
      publicRequestQrPage,
      loadingRequestForm,
      publicRequestForm,
      publicRequestError,
      publicRequestSuccess,
    };
  }

  window.MaintainOpsPublicRequestDisplay = {
    createPublicRequestDisplayHelpers,
  };

  if (typeof module !== "undefined") {
    module.exports = { createPublicRequestDisplayHelpers };
  }
})();
