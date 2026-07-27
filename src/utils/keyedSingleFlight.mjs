export function createKeyedSingleFlight() {
  const activePromises = new Map();

  return function runSingleFlight(key, operation) {
    if (activePromises.has(key)) return activePromises.get(key);

    const promise = Promise.resolve().then(operation);
    activePromises.set(key, promise);

    const clear = () => {
      if (activePromises.get(key) === promise) activePromises.delete(key);
    };
    promise.then(clear, clear);
    return promise;
  };
}
