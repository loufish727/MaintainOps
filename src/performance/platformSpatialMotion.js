// One clock for ambient motion. Hidden time never advances the room.
export function createSpatialMotionState() {
  let elapsed = 0;
  let previous = null;
  let dirty = true;
  return {
    invalidate() { dirty = true; },
    tick(timestamp, { hidden = false, enabled = true, fps = 60 } = {}) {
      if (hidden) {
        previous = null;
        dirty = true;
        return null;
      }
      if (!enabled && !dirty) return null;
      const interval = 1000 / fps;
      if (!dirty && previous !== null && timestamp - previous < interval - 1) return null;
      const frameMs = previous === null ? interval : Math.max(0, timestamp - previous);
      previous = timestamp;
      dirty = false;
      const delta = enabled ? Math.min(frameMs / 1000, 0.12) : 0;
      elapsed += delta;
      return { delta, elapsed, frameMs };
    },
    reset() { previous = null; dirty = true; },
  };
}

export function timelineActivity(rows = []) {
  const count = (value) => Math.max(0, Number.isFinite(Number(value)) ? Number(value) : 0);
  const days = rows.slice(-12).map((row, index) => {
    const requests = count(row.requests);
    const orders = count(row.ordersReceived ?? row.workCreated);
    return { key: row.day || row.date || row.label || String(index), label: row.label || `Day ${index + 1}`, requests, orders, total: requests + orders };
  });
  const maximum = Math.max(1, ...days.flatMap((day) => [day.requests, day.orders]));
  return days.map((day) => ({ ...day, requestScale: day.requests / maximum, orderScale: day.orders / maximum }));
}
