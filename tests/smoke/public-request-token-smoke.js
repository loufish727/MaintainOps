const assert = require("node:assert/strict");

global.window = {
  btoa: (value) => Buffer.from(value, "binary").toString("base64"),
};

const { createPublicRequestTokenHelpers } = require("../../src/utils/publicRequestTokens.js");

const deterministicWindow = {
  btoa: (value) => Buffer.from(value, "binary").toString("base64"),
  crypto: {
    getRandomValues(bytes) {
      for (let index = 0; index < bytes.length; index += 1) {
        bytes[index] = index + 1;
      }
      return bytes;
    },
  },
};

const { generatePublicRequestToken } = createPublicRequestTokenHelpers({
  windowRef: deterministicWindow,
});
const token = generatePublicRequestToken();
assert.equal(token.length, 24);
assert.doesNotMatch(token, /[+/=]/);
assert.equal(token, "AQIDBAUGBwgJCgsMDQ4PEBES");

const realRandomWindow = {
  btoa: deterministicWindow.btoa,
  crypto: {
    getRandomValues(bytes) {
      globalThis.crypto.getRandomValues(bytes);
      return bytes;
    },
  },
};
const randomHelpers = createPublicRequestTokenHelpers({ windowRef: realRandomWindow });
const randomTokenA = randomHelpers.generatePublicRequestToken();
const randomTokenB = randomHelpers.generatePublicRequestToken();
assert.equal(randomTokenA.length, 24);
assert.equal(randomTokenB.length, 24);
assert.notEqual(randomTokenA, randomTokenB);
assert.doesNotMatch(randomTokenA, /[+/=]/);
assert.doesNotMatch(randomTokenB, /[+/=]/);

const fallbackWindow = {};
const fallbackHelpers = createPublicRequestTokenHelpers({ windowRef: fallbackWindow });
const fallbackToken = fallbackHelpers.generatePublicRequestToken();
assert.match(fallbackToken, /^[a-z0-9]+$/);
assert.ok(fallbackToken.length > 12);

console.log("public request token smoke passed");
