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
  assert.doesNotMatch(html, /data-nav-group="\w+" open/);
  assert.match(html, /class="nav-work contains-current"/);
}
const menu = create();
const initial = options(common);
for (const [section, group] of [['mywork', 'work'], ['work', 'work'], ['planning', 'work'], ['assets', 'assets'], ['pm', 'assets'], ['messages', 'team'], ['performance', 'settings']]) {
  const html = menu.render({ ...initial, activeSection: section });
  assert.doesNotMatch(html, /data-nav-group="\w+" open/);
  assert.match(html, new RegExp(`class="nav-${group} contains-current"`));
}
const direct = menu.render({ ...initial, activeSection: 'requests' });
assert.doesNotMatch(direct, /data-nav-group="\w+" open|contains-current/);
assert.match(direct, /class="nav-requests active"/);
assert.doesNotMatch(menu.render({ ...initial, scope: 'another-user:company' }), /data-nav-group="\w+" open/);
assert.doesNotMatch(create().render(options([])), /details|button/);
const future = create().render({ ...options(['future']), items: [['future', '<img src=x onerror=alert(1)>']] });
assert.match(future, /data-section="future"/);
assert.doesNotMatch(future, /<img/);
assert.match(future, /&#60;img/);
console.log('workspace navigation display smoke passed: five roles, exact destinations, context, active state, escaping and fallback');
