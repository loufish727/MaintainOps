const assert = require("node:assert/strict");

global.window = {};

const { createPublicRequestDisplayHelpers } = require("../../src/render/publicRequestDisplay.js");

const helpers = createPublicRequestDisplayHelpers({
  escapeHtml: (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  qrSvgFor: (value, cellSize) => `<svg data-value="${value}" data-cell-size="${cellSize}"></svg>`,
  getLocations: () => [
    { id: "loc-1", name: "QA <Facility>" },
    { id: "loc-2", name: "Shop Floor" },
    { id: "loc-3", name: "Inactive Line" },
  ],
  getPublicRequestLinks: () => [
    { id: "link-1", location_id: "loc-1", token: "token-1", is_active: true, last_used_at: "2026-05-27T12:00:00Z" },
    { id: "link-3", location_id: "loc-3", token: "token-3", is_active: false },
  ],
  getPublicRequestLinksReady: () => true,
  getPublicAppUrlOverride: () => "https://example.com/MaintainOps/",
  getWindowPublicAppUrl: () => "https://wrong.example/",
  canManageTeam: () => true,
  canAdministerPublicRequestLinks: () => true,
  publicAppBaseUrl: () => "https://example.com/MaintainOps/",
  publicRequestUrl: (token) => `https://example.com/MaintainOps/?request=${token}`,
  publicRequestQrUrl: (token) => `https://example.com/MaintainOps/?qr=${token}`,
});

const intake = {
  company_name: "Acme & Co",
  location_name: "Line <One>",
};

assert.match(helpers.loadingQrPage(), /Loading QR code/);
assert.match(helpers.loadingRequestForm(), /Loading request form/);

const qrPage = helpers.publicRequestQrPage(intake, "https://example.test/?request=abc");
assert.match(qrPage, /Line &lt;One&gt;/);
assert.match(qrPage, /Acme &amp; Co/);
assert.match(qrPage, /Print \/ Save PDF/);
assert.match(qrPage, /data-cell-size="8"/);

const form = helpers.publicRequestForm(intake);
assert.match(form, /id="public-request-form"/);
assert.match(form, /name="title"/);
assert.match(form, /name="photo"/);
assert.match(form, /name="priority"/);
assert.match(form, /Send Request/);

const error = helpers.publicRequestError("Bad <link>");
assert.match(error, /Request Link Unavailable/);
assert.match(error, /Bad &lt;link&gt;/);

const success = helpers.publicRequestSuccess(intake, "Photo <failed>");
assert.match(success, /Request Sent/);
assert.match(success, /Line &lt;One&gt; maintenance has received it/);
assert.match(success, /Photo &lt;failed&gt;/);
assert.match(success, /id="public-request-another"/);

const manager = helpers.publicRequestLinkManager();
assert.match(manager, /Location Request QR Links/);
assert.match(manager, /QA &lt;Facility&gt;/);
assert.match(manager, /https:\/\/example\.com\/MaintainOps\/\?qr=token-1/);
assert.match(manager, /data-copy-public-request-link/);
assert.match(manager, /data-regenerate-public-request-link="link-1"/);
assert.match(manager, /data-disable-public-request-link="link-1"/);
assert.match(manager, /data-create-public-request-link="loc-2"/);
assert.match(manager, /data-enable-public-request-link="link-3"/);

console.log("public request display smoke passed");
