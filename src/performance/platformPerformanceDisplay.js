(function () {
  /*
   * This module mounts the original spatial command room unchanged. The iframe
   * receives a read-only company performance snapshot from the parent app.
   */
  function createPlatformPerformanceDisplayHelpers({ escapeHtml }) {
    function renderPlatformPerformancePanel({ snapshot, ready, error, timedOut = false }) {
      if (timedOut) {
        return `
          <section class="platform-performance platform-performance-timeout" aria-live="assertive">
            <div class="platform-performance-timeout-card">
              <span>Performance view timed out</span>
              <strong>The 3D command room did not finish loading in 10 seconds.</strong>
              <p>Your Maintain Ops workspace is still available. Return to work or try the room again.</p>
              <div>
                <button class="secondary-button" data-exit-performance type="button">Back to My Work</button>
                <button class="text-button inverse" data-retry-spatial-performance type="button">Try Performance Again</button>
              </div>
            </div>
          </section>
        `;
      }

      if (!ready && !snapshot) {
        return `
          <section class="platform-performance platform-performance-loading" aria-live="polite">
            <div class="performance-loader-orbit" aria-hidden="true"></div>
            <div><span>App Performance</span><strong>Sampling live operational data...</strong></div>
          </section>
        `;
      }

      if (!snapshot) {
        return `
          <section class="platform-performance platform-performance-error" aria-live="polite">
            <div><span>Performance unavailable</span><strong>${escapeHtml(error || "The platform snapshot could not be loaded.")}</strong></div>
            <button class="secondary-button" data-retry-platform-performance type="button">Retry telemetry</button>
          </section>
        `;
      }

      return `
        <section class="platform-performance platform-performance-spatial" aria-label="App Performance">
          <button class="platform-spatial-exit" data-exit-performance type="button">Back to My Work</button>
          <iframe
            class="platform-spatial-frame"
            data-platform-spatial-frame
            src="performance-spatial.html"
            title="Maintain Ops app performance command room"
            loading="eager"
          ></iframe>
        </section>
      `;
    }

    return { renderPlatformPerformancePanel };
  }

  const api = { createPlatformPerformanceDisplayHelpers };
  if (typeof window !== "undefined") window.MaintainOpsPlatformPerformanceDisplay = api;
  if (typeof module !== "undefined") module.exports = api;
})();
