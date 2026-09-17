// All callers wait for the newest queued snapshot, including writes that landed mid-read.
export function createMessageReloadQueue(load) {
  let pending = null, requested = false, preserve = true;
  return function reload(preserveHistory = false) {
    requested = true;
    preserve = preserve && preserveHistory;
    if (!pending) {
      pending = Promise.resolve().then(async () => {
        while (requested) {
          const keepHistory = preserve;
          requested = false;
          preserve = true;
          await load(keepHistory);
        }
      }).finally(() => { pending = null; });
    }
    return pending;
  };
}
