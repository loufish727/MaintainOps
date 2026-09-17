// Progressive enhancement: native playback stays available if local decoding fails.
export function enhanceMessageAudio({ audio, blob, documentRef: doc }) {
  const win = doc.defaultView, abort = new win.AbortController();
  let disposed = false, started = false, panel;
  const listen = (node, event, fn) => node.addEventListener(event, fn, { signal: abort.signal });
  const time = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
  const element = (tag, className, text) => {
    const node = doc.createElement(tag); node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  async function prepare() {
    if (started || disposed || !Number.isFinite(audio.duration)) return;
    started = true;
    const Context = win.OfflineAudioContext || win.webkitOfflineAudioContext;
    if (!Context || blob.size > 5 * 1024 * 1024 || audio.duration <= 0 || audio.duration > 300) return;
    try {
      // A low sample rate bounds PCM memory; long/large audio retains native controls.
      const buffer = await new Context(1, 1, 8000).decodeAudioData(await blob.arrayBuffer());
      if (disposed || !audio.isConnected || buffer.duration > 300) return;
      const peaks = Array.from({ length: 96 }, (_, index) => {
        const start = Math.floor(index * buffer.length / 96), end = Math.floor((index + 1) * buffer.length / 96);
        let peak = 0;
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
          const samples = buffer.getChannelData(channel);
          for (let i = start; i < end; i++) peak = Math.max(peak, Math.abs(samples[i]));
        }
        return peak;
      });
      panel = element('div', 'message-audio-player');
      const canvas = element('canvas', 'message-waveform'); canvas.width = 768; canvas.height = 96;
      canvas.setAttribute('aria-hidden', 'true');
      const seek = element('input', 'message-audio-seek'); seek.type = 'range'; seek.min = '0'; seek.max = String(audio.duration); seek.step = '0.1'; seek.value = '0'; seek.setAttribute('aria-label', 'Audio position');
      const transport = element('div', 'message-audio-transport');
      const play = element('button', 'message-audio-play', 'Play'); play.type = 'button'; play.setAttribute('aria-label', 'Play recording');
      const stamp = element('span', 'message-audio-time');
      const speed = element('select', 'message-audio-speed'); speed.setAttribute('aria-label', 'Playback speed');
      for (const rate of [0.75, 1, 1.25, 1.5, 2]) { const option = doc.createElement('option'); option.value = String(rate); option.textContent = `${rate}x`; option.selected = rate === 1; speed.append(option); }
      const error = element('p', 'message-audio-error'); error.setAttribute('role', 'status'); error.hidden = true;
      transport.append(play, stamp, speed); panel.append(canvas, seek, transport, error); audio.after(panel);
      const draw = () => {
        const value = Math.max(0, audio.currentTime || 0), progress = value / audio.duration;
        seek.value = String(value); seek.setAttribute('aria-valuetext', `${time(value)} of ${time(audio.duration)}`);
        stamp.textContent = `${time(value)} / ${time(audio.duration)}`;
        play.textContent = audio.paused ? 'Play' : 'Pause'; play.setAttribute('aria-label', audio.paused ? 'Play recording' : 'Pause recording');
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height);
        peaks.forEach((peak, index) => {
          const height = Math.max(2, peak * 88);
          ctx.fillStyle = index / peaks.length < progress ? '#a1e4d1' : '#748d86';
          ctx.fillRect(index * 8 + 1, (96 - height) / 2, 4, height);
        });
      };
      listen(play, 'click', async () => {
        if (!audio.paused) { audio.pause(); return; }
        try { await audio.play(); error.hidden = true; }
        catch { if (!disposed) { error.textContent = 'Playback unavailable. Use the audio controls or download.'; error.hidden = false; audio.hidden = false; } }
      });
      listen(seek, 'input', () => { audio.currentTime = Number(seek.value); draw(); });
      listen(speed, 'change', () => { audio.playbackRate = Number(speed.value); });
      for (const event of ['timeupdate', 'play', 'pause', 'ended', 'seeked']) listen(audio, event, draw);
      listen(audio, 'error', () => { audio.hidden = false; panel.hidden = true; });
      audio.hidden = true; draw();
    } catch { /* Unsupported codecs keep the native player and download fallback. */ }
  }
  listen(audio, 'loadedmetadata', prepare); listen(audio, 'durationchange', prepare);
  listen(audio, 'play', () => {
    doc.querySelectorAll('.message-tool-dialog audio').forEach(other => { if (other !== audio) other.pause(); });
  });
  void prepare();
  return () => {
    disposed = true; abort.abort(); panel?.remove();
    audio.pause(); audio.removeAttribute('src'); audio.load(); audio.hidden = false;
  };
}
