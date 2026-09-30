const assert = require('node:assert/strict');
global.window = {};
require('../../src/render/requestPhotoDisplay.js');
const render = window.MaintainOpsRequestPhotoDisplay.createRequestPhotoDisplayHelpers({
  escapeHtml: value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;'),
  requestPhotoMetaText: () => '79 KB',
}).renderMaintenanceRequestPhoto;
const row = { id: 'request-1', photo_storage_path: 'request/photo.jpg', photo_file_name: 'Photo.jpg', photo_content_type: 'image/jpeg', photoSignedUrl: 'https://example.test/expired?token=old' };
assert.equal(render({ id: 'empty' }), '');
for (const photoSignedUrl of [row.photoSignedUrl, '']) {
  const html = render({ ...row, photoSignedUrl });
  assert.match(html, /data-open-request-photo="request-1">Open photo<\/button>/);
  assert.match(html, /data-request-photo-status role="status" hidden/);
  assert.doesNotMatch(html, /href=|run request photo SQL/);
  assert.match(html, /Photo.jpg/);
  assert.match(html, /79 KB/);
}
assert.match(render(row), /data-request-photo-image="request-1"/);
assert.doesNotMatch(render({ ...row, id: '"><script>', photo_file_name: '<script>' }), /<script>/);
console.log('request photo display smoke passed');
