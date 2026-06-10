const assert = require("node:assert/strict");

global.window = {};

const { bindWorkspaceDatePickerControls, openDatePicker } = require("../../src/utils/workspaceDatePickerControls.js");

let focused = false;
let picked = false;
let clicked = false;

const showPickerInput = {
  focus() {
    focused = true;
  },
  showPicker() {
    picked = true;
  },
  click() {
    clicked = true;
  },
};

assert.equal(openDatePicker(showPickerInput), true);
assert.equal(focused, true);
assert.equal(picked, true);
assert.equal(clicked, false);

let fallbackClicked = false;
const clickFallbackInput = {
  focus() {},
  click() {
    fallbackClicked = true;
  },
};

assert.equal(openDatePicker(clickFallbackInput), true);
assert.equal(fallbackClicked, true);

let boundInputOpened = false;
const boundInput = {
  focus() {},
  showPicker() {
    boundInputOpened = true;
  },
};
const button = {
  addEventListener(_eventName, callback) {
    this.callback = callback;
  },
  closest(selector) {
    assert.equal(selector, "[data-date-picker-field]");
    return {
      querySelector(inputSelector) {
        assert.equal(inputSelector, 'input[type="date"]');
        return boundInput;
      },
    };
  },
};

bindWorkspaceDatePickerControls({
  documentRef: {
    querySelectorAll(selector) {
      assert.equal(selector, "[data-open-date-picker]");
      return [button];
    },
  },
});

button.callback();
assert.equal(boundInputOpened, true);

console.log("workspace date picker controls smoke passed");
