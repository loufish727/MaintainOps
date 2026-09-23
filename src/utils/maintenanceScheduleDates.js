(function () {
  function parseDateOnly(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000")) return null;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
  }

  function localDateOnly(value) {
    return parseDateOnly(value) ? new Date(`${value}T00:00:00`) : null;
  }

  function nextDueDate(value, frequency) {
    const date = parseDateOnly(value);
    if (!date) throw new RangeError("PM due date must be a valid YYYY-MM-DD date.");
    if (!["weekly", "monthly", "quarterly"].includes(frequency)) {
      throw new RangeError("PM frequency must be weekly, monthly, or quarterly.");
    }

    // Date-only recurrence must not depend on the browser's timezone or DST.
    if (frequency === "weekly") {
      date.setUTCDate(date.getUTCDate() + 7);
    } else {
      const day = date.getUTCDate();
      date.setUTCDate(1);
      date.setUTCMonth(date.getUTCMonth() + (frequency === "monthly" ? 1 : 3));
      const monthEnd = new Date(date);
      monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1, 0);
      date.setUTCDate(Math.min(day, monthEnd.getUTCDate()));
    }
    if (date.getUTCFullYear() > 9999) throw new RangeError("PM next due date is outside the supported date range.");
    return date.toISOString().slice(0, 10);
  }

  window.MaintainOpsMaintenanceScheduleDates = {
    localDateOnly,
    nextDueDate,
  };
})();
