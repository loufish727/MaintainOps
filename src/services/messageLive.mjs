// One company-scoped subscription. No polling and no operational workspace reloads.
export function createMessageLive({ onChanges, onStatus, delay = 180 }) {
  let channel, client, scope = "", generation = 0, timer, queued = [], running = false;
  function stop() {
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
    if (!nextClient?.channel || !companyId || !userId || scope === nextScope) return;
    stop();
    client = nextClient;
    scope = nextScope;
    const version = generation;
    const current = () => version === generation;
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
      connected = payload.status === "ok";
      onStatus(connected ? "live" : "unavailable");
      if (connected) {
        receive({ table: "reconcile", reconnect: subscribed });
        subscribed = true;
      }
    });
    channel.subscribe((status) => {
      if (!current()) return;
      if (status !== "SUBSCRIBED") {
        connected = false;
        onStatus("reconnecting");
      }
    });
  }
  return { start, stop };
}
