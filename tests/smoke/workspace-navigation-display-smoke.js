const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../../src/render/workspaceNavigationDisplay.js'), 'utf8'), context);
const create = context.window.MaintainOpsWorkspaceNavigationDisplay.createWorkspaceNavigation;
const common = ['mywork', 'work', 'planning', 'requests', 'assets', 'pm', 'procedures', 'parts', 'conversions', 'messages', 'team', 'performance'];
const escapeHtml = text => String(text).replace(/[&<>"']/g, character => `&#${character.charCodeAt(0)};`);
const options = ids => ({ items: ids.map(id => [id, id]), activeSection: 'mywork', scope: 'user:company', escapeHtml,
  navIcon: () => '', renderBadge: id => id === 'messages' ? '<b>2 unread</b>' : '' });
for (const role of ['technician', 'production', 'accounting', 'manager', 'admin']) {
  const ids = [...common];
  if (['accounting', 'manager', 'admin'].includes(role)) ids.push('financial');
  if (['manager', 'admin'].includes(role)) ids.push('settings', 'setup');
  if (role === 'admin') ids.push('manager');
  const html = create().render(options(ids));
  assert.deepEqual([...html.matchAll(/data-section="([^"]+)"/g)].map(match => match[1]).sort(), ids.sort(), role);
  assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
  assert.equal((html.match(/class="nav-emblem" aria-hidden="true"/g) || []).length, 6);
  assert.match(html, /data-nav-group="settings"/);
  assert.match(html, /data-nav-messages/);
  assert.equal((html.match(/2 unread/g) || []).length, 2);
}
const menu = create();
const initial = options(common);
assert.match(menu.render(initial), /data-nav-group="work" open/);
assert.match(menu.render({ ...initial, activeSection: 'assets' }), /data-nav-group="assets" open/);
assert.doesNotMatch(menu.render({ ...initial, activeSection: 'requests' }), /data-nav-group="\w+" open/);
assert.match(menu.render({ ...initial, scope: 'another-user:company' }), /data-nav-group="work" open/);
assert.doesNotMatch(create().render(options([])), /details|button/);
const future = create().render({ ...options(['future']), items: [['future', '<img src=x onerror=alert(1)>']] });
assert.match(future, /data-section="future"/);
assert.doesNotMatch(future, /<img/);
assert.match(future, /&#60;img/);
console.log('workspace navigation display smoke passed: five roles, exact destinations, context, active state, escaping and fallback');
