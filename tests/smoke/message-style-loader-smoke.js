const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const source = fs.readFileSync(require("node:path").join(__dirname, "../../src/appShell/lazyResources.js"), "utf8");
  const { loadStyleResource } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const links = [];
  const doc = { querySelector: (selector) => links.find((link) => selector.includes(link.href)),
    head: { appendChild: (link) => links.push(link) }, createElement: () => ({ dataset: {}, handlers: {},
      addEventListener(event, fn) { (this.handlers[event] ||= []).push(fn); },
      remove() { links.splice(links.indexOf(this), 1); },
    }) };
  const first = loadStyleResource(doc, "messages.css");
  const second = loadStyleResource(doc, "messages.css");
  assert.equal(links.length, 1);
  links[0].handlers.load.forEach((fn) => fn());
  await first; await second; await loadStyleResource(doc, "messages.css");
  assert.equal(links.length, 1);
  const broken = loadStyleResource(doc, "broken.css");
  links[1].handlers.error.forEach((fn) => fn());
  await assert.rejects(broken, /Could not load/);
  assert.equal(links.length, 1);
  console.log("lazy message stylesheet shares loads, caches success and permits failure retry");
})();
