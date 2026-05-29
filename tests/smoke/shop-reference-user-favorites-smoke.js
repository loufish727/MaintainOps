const assert = require("node:assert/strict");

global.window = {};
const { bindShopReferenceEvents } = require("../../src/utils/conversions.js");
require("../../src/services/userPreferencesService.js");

const { getUserPreferences, saveShopReferenceFavorites } = global.window.MaintainOpsUserPreferencesService;

(async () => {
  const serviceCalls = [];
  const supabaseClient = {
    from(table) {
      serviceCalls.push(["from", table]);
      const chain = {
        select(columns) { serviceCalls.push(["select", columns]); return chain; },
        eq(column, value) { serviceCalls.push(["eq", column, value]); return chain; },
        maybeSingle() { serviceCalls.push(["maybeSingle"]); return { data: { shop_reference_favorites: ["Beta Reference"] }, error: null }; },
        upsert(payload, options) { serviceCalls.push(["upsert", payload, options]); return chain; },
        single() { serviceCalls.push(["single"]); return { data: {}, error: null }; },
      };
      return chain;
    },
  };

assert.deepEqual((await getUserPreferences(supabaseClient, "user-1")).data.shop_reference_favorites, ["Beta Reference"]);
await saveShopReferenceFavorites(supabaseClient, "user-1", ["Alpha Reference", ""]);
assert.ok(serviceCalls.some((call) => call[0] === "from" && call[1] === "user_preferences"));
assert.ok(serviceCalls.some((call) => call[0] === "upsert" && call[1].user_id === "user-1" && call[1].shop_reference_favorites.length === 1));

function createButton() {
  return {
    innerHTML: "",
    title: "",
    attributes: {},
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute(name) { return this.attributes[name]; },
    addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
  };
}

function createCard(title) {
  const button = createButton();
  return {
    dataset: { shopReferenceTitle: title, shopReferenceSearch: title.toLowerCase() },
    listeners: {},
    open: false,
    classList: { values: {}, toggle(name, active) { this.values[name] = active; } },
    querySelector(selector) { return selector === "[data-shop-reference-favorite]" ? button : null; },
    addEventListener(eventName, handler) { this.listeners[eventName] = handler; },
    removeAttribute(name) { if (name === "open") this.open = false; },
    button,
  };
}

const alpha = createCard("Alpha Reference");
const beta = createCard("Beta Reference");
const grid = {
  children: [],
  set textContent(value) { if (value === "") this.children = []; },
  get textContent() { return ""; },
  appendChild(card) { this.children.push(card); },
};
const status = { textContent: "" };
const storage = {
  values: {},
  getItem(key) { return this.values[key] || null; },
  setItem(key, value) { this.values[key] = value; },
};
const savedFavorites = [];
const panel = {
  dataset: { shopReferencePageSize: "12" },
  querySelectorAll(selector) {
    if (selector === "[data-shop-reference-card]") return [alpha, beta];
    if (selector === "[data-shop-reference-page]") return [];
    return [];
  },
  querySelector(selector) {
    if (selector === "[data-shop-reference-grid]") return grid;
    if (selector === "[data-shop-reference-page-status]") return status;
    return null;
  },
};

bindShopReferenceEvents({
  documentRef: { querySelectorAll: (selector) => (selector === "[data-shop-reference-panel]" ? [panel] : []) },
  storage,
  favoriteStore: {
    async load() { return ["Beta Reference"]; },
    async save(favorites) { savedFavorites.push([...favorites]); },
  },
});

await new Promise((resolve) => setTimeout(resolve, 0));
assert.equal(grid.children[0], beta);
assert.equal(beta.button.getAttribute("aria-pressed"), "true");
assert.equal(storage.values["maintainops.shopReferenceFavorites"], JSON.stringify(["Beta Reference"]));

alpha.button.listeners.click({ preventDefault() {}, stopPropagation() {} });
await new Promise((resolve) => setTimeout(resolve, 0));
assert.deepEqual(savedFavorites.at(-1), ["Beta Reference", "Alpha Reference"]);
console.log("shop reference user favorites smoke passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
