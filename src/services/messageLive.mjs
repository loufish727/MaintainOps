// One company-scoped subscription. No polling and no operational workspace reloads.
export function createMessageLive({ onChanges, onStatus, delay = 180, readyTimeout = 2000 }) {
  let channel, client, scope = "", generation = 0, timer, queued = [], running = false;
  let ready, finishReady;
  function stop() {
    finishReady?.(false);
    ready = finishReady = null;
    generation++;
    clearTimeout(timer);
    queued = [];
    running = false;
    if (channel) void client.removeChannel(channel);
    channel = null;
    scope = "";
  }
  async function start(nextClient, companyId, userId, accessToken) {
    const nextScope = `${userId}:${companyId}`;
    if (!nextClient?.channel || !companyId || !userId) return;
    if (scope === nextScope) return ready;
    stop();
    client = nextClient;
    scope = nextScope;
    const version = generation;
    const current = () => version === generation;
    let waiting = true, readyTimer;
    const initialReady = ready = new Promise((resolve) => {
      finishReady = (connected) => {
        if (!waiting) return;
        waiting = false;
        clearTimeout(readyTimer);
        resolve(connected);
      };
    });
    const finish = finishReady;
    readyTimer = setTimeout(() => finish(false), readyTimeout);
    if (accessToken) await client.realtime?.setAuth(accessToken);
    if (!current()) return;
    let connected = false;
    async function flush() {
      if (!current() || running || !queued.length) return;
      running = true;
      const batch = queued;
      queued = [];
      try { await onChanges(batch, { companyId, userId, current }); if (current() && connected) onStatus("live"); }
      catch { if (current()) onStatus("stale"); }
      finally {
        if (current()) {
          running = false;
          if (queued.length) timer = setTimeout(flush, delay);
        }
      }
    }
    function receive(payload) {
      if (!current()) return;
      queued.push(payload);
      clearTimeout(timer);
      timer = setTimeout(flush, delay);
    }
    onStatus("connecting");
    channel = client.channel(`messages:${companyId}:${userId}`);
    for (const table of ["messages", "message_thread_members", "message_reactions"]) {
      for (const event of ["INSERT", "UPDATE"]) {
        channel.on("postgres_changes", { event, schema: "public", table, filter: `company_id=eq.${companyId}` }, receive);
      }
    }
    let subscribed = false;
    channel.on("system", {}, (payload) => {
      if (!current() || payload.extension !== "postgres_changes") return;
      const wasConnected = connected;
      connected = payload.status === "ok";
      onStatus(connected ? "live" : "unavailable");
      if (connected && !wasConnected) {
        // The first snapshot follows stream readiness. Late joins and reconnects must catch up.
        if (!waiting) receive({ table: "reconcile", reconnect: subscribed });
        finish(true);
        subscribed = true;
      } else if (!connected) finish(false);
    });
    channel.subscribe((status) => {
      if (!current()) return;
      if (status !== "SUBSCRIBED") {
        connected = false;
        finish(false);
        onStatus("reconnecting");
      }
    });
    return initialReady;
  }
  return { start, stop };
}
