const assert = require('node:assert/strict');
global.window = {};
const { createCsvExportHelpers } = require('../../src/utils/csvExport');

(async () => {
  let section = 'work', scope = 'company:location', responseTransform = value => value;
  const alerts = [], downloads = [], ranges = [];
  const rows = Array.from({ length: 1001 }, (_, id) => ({ id, title: `Order ${id}` }));
  const helpers = createCsvExportHelpers({
    getActiveSection: () => section, getExportScope: () => scope,
    createExportQuery: () => ({ range: async (from, to) => {
      ranges.push([from, to]);
      return responseTransform({ data: rows.slice(from, to + 1), count: rows.length });
    } }),
    withOperationTimeout: value => value,
    alertRef: message => alerts.push(message),
    getWorkOrders: () => [], getAssets: () => [], getMaintenanceRequests: () => [],
    getPreventiveSchedules: () => [], getParts: () => [], getProcedureTemplates: () => [],
    getCompanyMembers: () => [], getProfilesByUserId: () => ({}), assignmentLabel: () => '', csvCell: String,
    documentRef: { body: { appendChild() {} }, createElement: () => ({ click() {}, remove() {} }) },
    URLRef: { createObjectURL: blob => { downloads.push(blob); return 'blob:qa'; }, revokeObjectURL() {} },
    BlobCtor: Blob,
  });
  await helpers.exportActiveSectionCsv();
  assert.deepEqual(ranges, [[0, 499], [500, 999], [1000, 1499]]);
  assert.match(await downloads[0].text(), /Order 1000/);
  assert.equal(alerts.length, 0);
  section = 'requests';
  await helpers.exportActiveSectionCsv();
  assert.match(await downloads[1].text(), /Order 1000/);
  responseTransform = value => { scope = 'different location'; return value; };
  await helpers.exportActiveSectionCsv();
  assert.match(alerts.at(-1), /Workspace changed/);
  responseTransform = () => ({ error: { message: 'Offline' } });
  await helpers.exportActiveSectionCsv();
  assert.match(alerts.at(-1), /Offline/);
  responseTransform = value => ({ ...value, count: null });
  await helpers.exportActiveSectionCsv();
  assert.match(alerts.at(-1), /total record count/);
  responseTransform = value => ({ ...value, data: [rows[0], rows[0]] });
  await helpers.exportActiveSectionCsv();
  assert.match(alerts.at(-1), /Records moved/);
  assert.equal(downloads.length, 2, 'Never download a partial, duplicate or wrong-scope export');
  console.log('CSV export pagination and failure isolation smoke passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
