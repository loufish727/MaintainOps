const assert = require("node:assert/strict");

global.window = {};

const { createPublicRequestDisplayHelpers } = require("../../src/render/publicRequestDisplay.js");

const helpers = createPublicRequestDisplayHelpers({
  escapeHtml: (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  qrSvgFor: (value, cellSize) => `<svg data-value="${value}" data-cell-size="${cellSize}"></svg>`,
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

console.log("public request display smoke passed");
