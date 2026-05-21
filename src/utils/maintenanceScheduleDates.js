(function () {
  function nextDueDate(value, frequency) {
    const date = new Date(`${value}T00:00:00`);
    if (frequency === "weekly") date.setDate(date.getDate() + 7);
    if (frequency === "monthly") date.setMonth(date.getMonth() + 1);
    if (frequency === "quarterly") date.setMonth(date.getMonth() + 3);
    return date.toISOString().slice(0, 10);
  }

  window.MaintainOpsMaintenanceScheduleDates = {
    nextDueDate,
  };
})();
