const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const timezones = [
  "UTC",
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Pacific/Kiritimati",
  "Pacific/Pago_Pago",
];

if (!process.argv.includes("--timezone-child")) {
  for (const timezone of timezones) {
    const result = spawnSync(process.execPath, [__filename, "--timezone-child"], {
      env: { ...process.env, TZ: timezone },
      encoding: "utf8",
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, `${timezone}:\n${result.stdout}\n${result.stderr}`);
    process.stdout.write(result.stdout);
  }
  console.log(`PM dates and surfaces smoke passed (${timezones.length} timezones)`);
} else {
  runTimezoneChecks();
}

function runTimezoneChecks() {
  const NativeDate = Date;
  let now = new NativeDate("2024-03-08T12:00:00").getTime();
  class TestDate extends NativeDate {
    constructor(...args) {
      super(...(args.length ? args : [now]));
    }

    static now() {
      return now;
    }
  }

  const context = vm.createContext({ window: {}, Date: TestDate });
  for (const file of [
    "src/utils/maintenanceScheduleDates.js",
    "src/utils/workspaceListBuilders.js",
    "src/render/dashboardDisplay.js",
    "src/render/managerDashboardDisplay.js",
  ]) {
    vm.runInContext(fs.readFileSync(path.resolve(__dirname, "../..", file), "utf8"), context, { filename: file });
  }

  const { localDateOnly, nextDueDate } = context.window.MaintainOpsMaintenanceScheduleDates;
  const appSource = fs.readFileSync(path.resolve(__dirname, "../../app.js"), "utf8").replace(/\r\n/g, "\n");
  const inputStart = appSource.indexOf("function workOrderDateValue(");
  const inputEnd = appSource.indexOf("\n}", inputStart);
  assert.ok(inputStart >= 0 && inputEnd > inputStart, "The app date-input function must be tested directly");
  vm.runInContext(appSource.slice(inputStart, inputEnd + 2), context, { filename: "app.js workOrderDateValue" });
  const { workOrderDateValue } = context;
  for (const date of ["0001-01-01", "0099-12-31", "1900-02-28", "2000-02-29", "2024-02-29", "2024-03-10", "2024-11-03", "2031-01-15", "9999-12-31"]) {
    assert.equal(workOrderDateValue(date), date, `${process.env.TZ}: ISO input must not shift through UTC`);
    assert.equal(workOrderDateValue(` ${date} `), date, "Date inputs trim surrounding whitespace");
  }
  for (const invalid of ["2024-02-30", "2023-02-29", "1900-02-29", "2100-02-29", "2024-04-31", "2024-13-01", "0000-01-01"]) {
    assert.throws(() => workOrderDateValue(invalid), { name: "Error", message: /real.*YYYY-MM-DD/ }, invalid);
  }
  for (const blank of [undefined, null, "", "   "]) assert.equal(workOrderDateValue(blank), null);
  assert.throws(() => workOrderDateValue("not-a-date"), { name: "Error", message: /YYYY-MM-DD/ });
  assert.equal(workOrderDateValue("2024-02-29T23:30:00-08:00"), "2024-03-01", "Legacy timestamp conversion remains explicit UTC");
  const recurrences = [
    ["2023-01-31", "monthly", "2023-02-28"],
    ["2024-01-31", "monthly", "2024-02-29"],
    ["2024-01-30", "monthly", "2024-02-29"],
    ["2024-03-31", "monthly", "2024-04-30"],
    ["2024-04-30", "monthly", "2024-05-30"],
    ["2024-02-29", "monthly", "2024-03-29"],
    ["2024-12-31", "monthly", "2025-01-31"],
    ["2023-11-30", "quarterly", "2024-02-29"],
    ["2024-11-30", "quarterly", "2025-02-28"],
    ["2024-01-31", "quarterly", "2024-04-30"],
    ["2024-08-31", "quarterly", "2024-11-30"],
    ["2024-12-31", "quarterly", "2025-03-31"],
    ["2023-02-28", "weekly", "2023-03-07"],
    ["2024-02-28", "weekly", "2024-03-06"],
    ["2024-02-29", "weekly", "2024-03-07"],
    ["2024-03-08", "weekly", "2024-03-15"],
    ["2024-10-31", "weekly", "2024-11-07"],
    ["2024-03-29", "weekly", "2024-04-05"],
    ["2024-04-05", "weekly", "2024-04-12"],
    ["2024-10-04", "weekly", "2024-10-11"],
    ["2024-12-28", "weekly", "2025-01-04"],
    ["1900-01-31", "monthly", "1900-02-28"],
    ["2000-01-31", "monthly", "2000-02-29"],
    ["2100-01-31", "monthly", "2100-02-28"],
    ["2400-01-31", "monthly", "2400-02-29"],
    ["0001-01-01", "weekly", "0001-01-08"],
    ["0099-12-31", "monthly", "0100-01-31"],
    ["9999-11-30", "monthly", "9999-12-30"],
  ];
  for (const [date, frequency, expected] of recurrences) {
    assert.equal(nextDueDate(date, frequency), expected, `${date} ${frequency}`);
  }
  assert.equal(nextDueDate(nextDueDate("2023-01-31", "monthly"), "monthly"), "2023-03-28");

  const invalidDates = [
    undefined, null, "", " ", 0, 20240101, {}, new NativeDate("2024-01-01"),
    "not-a-date", "2024-1-01", "2024-01-1", "2024-01-01 ", " 2024-01-01",
    "2024-00-10", "2024-13-01", "2024-01-00", "2024-01-32", "2024-04-31",
    "2024-02-30", "2023-02-29", "1900-02-29", "2100-02-29", "0000-01-01",
    "10000-01-01", "2024-01-01T00:00:00Z", "2024-01-01T23:00:00-08:00",
  ];
  for (const value of invalidDates) {
    assert.equal(localDateOnly(value), null, String(value));
    assert.throws(() => nextDueDate(value, "monthly"), { name: "RangeError", message: /valid YYYY-MM-DD/ });
  }
  for (const frequency of [undefined, null, "", "daily", "yearly", "Monthly", "weekly ", "__proto__", "toString", 7, {}]) {
    assert.throws(() => nextDueDate("2024-01-31", frequency), { name: "RangeError", message: /PM frequency/ });
  }
  for (const frequency of ["weekly", "monthly", "quarterly"]) {
    assert.throws(() => nextDueDate("9999-12-31", frequency), { name: "RangeError", message: /supported date range/ });
  }
  assert.equal(localDateOnly("2024-02-29").getDate(), 29);
  assert.equal(localDateOnly("2024-02-29").getHours(), 0);
  assert.equal(localDateOnly("0099-12-31").getFullYear(), 99);

  const dates = ["2024-02-27", "2025-02-26", "2024-03-08", "2024-03-29", "2024-04-05", "2024-10-04", "2024-10-25", "2024-10-31", "2024-12-29"];
  for (const today of dates) {
    for (const time of ["00:05:00", "23:55:00"]) {
      now = new NativeDate(`${today}T${time}`).getTime();
      checkSurfaces(today);
    }
  }
  console.log(`PM dates and surfaces passed: ${process.env.TZ} (${dates.length * 2} local-clock scenarios)`);

  function checkSurfaces(today) {
    function offsetDate(days) {
      const date = new NativeDate(`${today}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() + days);
      return date.toISOString().slice(0, 10);
    }
    function schedule(id, days, extra = {}) {
      return Object.freeze({ id, title: id, active: true, frequency: "monthly", next_due_at: offsetDate(days), location_id: "loc-1", ...extra });
    }

    const schedules = Object.freeze([
      schedule("seventh-day", 7),
      schedule("overdue", -1),
      schedule("today", 0),
      schedule("tomorrow", 1),
      schedule("eighth-day", 8),
      schedule("legacy", 2, { active: undefined }),
      schedule("inactive-today", 0, { active: false }),
      schedule("inactive-soon", 7, { active: false }),
      schedule("inactive-overdue", -1, { active: false }),
      schedule("inactive-future", 8, { active: false }),
      schedule("inactive-unscheduled", 0, { active: false, next_due_at: null }),
      schedule("other-location", 0, { location_id: "loc-2" }),
      schedule("search-hidden", 1),
      schedule("invalid-rollover", 0, { next_due_at: today.startsWith("2025") ? "2025-02-29" : "2024-02-30" }),
      schedule("invalid-month", 0, { next_due_at: "2024-13-01" }),
      schedule("invalid-timestamp", 0, { next_due_at: `${today}T00:00:00Z` }),
      schedule("missing-date", 0, { next_due_at: null }),
    ]);
    const before = JSON.stringify(schedules);
    const matchesActiveLocation = (row) => row.location_id === "loc-1";
    const startOfToday = () => new TestDate(`${today}T00:00:00`);
    const getPreventiveSchedules = () => schedules;
    const ids = (rows) => Array.from(rows, (row) => row.id).sort();
    const expectedDue = ["legacy", "seventh-day", "today", "tomorrow"];
    const planning = context.window.MaintainOpsWorkspaceListBuilders.createWorkspaceListBuilders({
      preventiveSchedules: getPreventiveSchedules,
      matchesActiveLocation,
      matchesSearch: (values) => !values.includes("search-hidden"),
      startOfToday,
    });
    const planned = planning.planningPmItems();
    assert.deepEqual(ids(planned), expectedDue);
    assert.deepEqual(Array.from(planned, (row) => row.id), ["today", "tomorrow", "legacy", "seventh-day"]);
    for (const item of planned) {
      assert.equal(item.kind, "pm");
      assert.equal(item.due.getHours(), 0);
      assert.equal(item.due.getDate(), Number(item.dueAt.slice(8, 10)));
    }

    const dashboard = context.window.MaintainOpsDashboardDisplay.createDashboardDisplayHelpers({ getPreventiveSchedules });
    // The dashboard helper is unscoped; its caller still applies the location filter.
    assert.deepEqual(ids(dashboard.preventiveDueSoon()), [...expectedDue, "other-location", "search-hidden"].sort());
    assert.deepEqual(ids(dashboard.preventiveDueSoon().filter(matchesActiveLocation)), [...expectedDue, "search-hidden"].sort());

    const manager = context.window.MaintainOpsManagerDashboardDisplay.createManagerDashboardDisplayHelpers({
      getPreventiveSchedules,
      matchesActiveLocation,
      escapeHtml: (value) => String(value ?? ""),
      getAssets: () => [],
      getWorkOrders: () => [],
      getMaintenanceRequests: () => [],
      getCompanyMembers: () => [],
      getWorkOrderDashboardCounts: () => ({}),
      getRequestDashboardCounts: () => ({}),
    });
    const summary = manager.preventiveSummary();
    assert.equal(summary.total, 11);
    assert.deepEqual(ids(summary.overdue), ["overdue"]);
    assert.deepEqual(ids(summary.dueSoon), [...expectedDue, "search-hidden"].sort());
    assert.deepEqual(ids(summary.unscheduled), ["invalid-month", "invalid-rollover", "invalid-timestamp", "missing-date"]);
    const html = manager.renderManagerDashboard();
    assert.match(html, /<span>PM Risk<\/span>\s*<strong>6<\/strong>/);
    assert.match(html, /1 overdue, 5 due in 7 days/);
    assert.doesNotMatch(html, /inactive-|other-location|invalid-/);
    assert.equal(JSON.stringify(schedules), before, "Read-only surfaces must not advance PM due dates");

    const fallback = context.window.MaintainOpsManagerDashboardDisplay.createManagerDashboardDisplayHelpers({
      matchesActiveLocation,
      getPreventiveSchedules: () => [schedule("legacy-due-at", 0, { next_due_at: null, due_at: today, active: undefined })],
    });
    assert.deepEqual(ids(fallback.preventiveSummary().dueSoon), ["legacy-due-at"]);
  }
}
