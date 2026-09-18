const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '../../scripts/lfes-authenticated-check.js'), 'utf8');
const start = source.indexOf('function run(command, args, options = {}) {');
const end = source.indexOf('async function runStage(', start);
assert.ok(start >= 0 && end > start, 'Read the actual LFES process runner');

(async () => {
  for (const platform of ['win32', 'linux']) {
    const calls = [];
    const root = '/qa/workspace with spaces';
    const execPath = '/runtime with spaces/node';
    const npxCommand = platform === 'win32' ? 'npx.cmd' : 'npx';
    const context = vm.createContext({
      path, root, npxCommand,
      process: { platform, execPath, env: {} },
      spawn: (...args) => {
        calls.push(args);
        return { on: (event, callback) => { if (event === 'exit') queueMicrotask(() => callback(0)); } };
      },
    });
    vm.runInContext(source.slice(start, end), context);
    const filter = 'admin navigation and permission surfaces match the role contract';
    await context.run(npxCommand, ['playwright', 'test', 'tests/smoke/role-access-live.spec.js', '--browser=webkit', '--grep', filter, '--workers=1']);
    assert.equal(calls.length, 1);
    const [command, args, options] = calls[0];
    assert.equal(command, execPath);
    assert.deepEqual(Array.from(args), [path.join(root, 'node_modules/@playwright/test/cli.js'), 'test', 'tests/smoke/role-access-live.spec.js', '--browser=webkit', '--grep', filter, '--workers=1']);
    assert.equal(options.shell, false, 'Do not let a shell split the test selector');
    assert.equal(options.cwd, root);
  }
  console.log('LFES authenticated command argument smoke passed on Windows and Linux contracts');
})().catch(error => { console.error(error); process.exitCode = 1; });
