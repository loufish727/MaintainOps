// Lazy, view-only behavior. Private media never becomes a public or signed URL.
export function createMessagePresentation({ documentRef: doc, getFile, download }) {
  const cache = new Map(), waiting = new Set(), visible = new Set(), observed = new Set(), pending = new Set();
  let generation = 0, running = 0;
  const frameFile = node => getFile(node.dataset.messagePhoto, node.closest('[data-message-id]')?.dataset.messageId);
  const show = (node, url) => {
    const image = node.querySelector('img'), placeholder = node.querySelector('span');
    image.onload = () => { if (node.isConnected) { image.hidden = false; placeholder.hidden = true; } };
    image.onerror = () => { image.hidden = true; placeholder.hidden = false; };
    image.src = url;
  };
  const bytes = () => [...cache.values()].reduce((sum, item) => sum + item.size, 0);
  function trim(incoming = 0) {
    for (const [key, value] of cache) {
      if (cache.size < (incoming ? 12 : 13) && bytes() + incoming <= 12 * 1024 * 1024) break;
      if ([...visible].some(node => node.dataset.messagePhoto === key)) continue;
      URL.revokeObjectURL(value.url);
      cache.delete(key);
      for (const node of observed) if (node.dataset.messagePhoto === key) {
        node.querySelector('img').removeAttribute('src');
        node.querySelector('img').hidden = true; node.querySelector('span').hidden = false;
      }
    }
  }
  async function pump() {
    for (const node of waiting) {
      if (running >= 2) return;
      waiting.delete(node);
      if (!node.isConnected || !visible.has(node)) continue;
      const file = frameFile(node), id = node.dataset.messagePhoto;
      if (!file?.content_type?.startsWith('image/') || file.byte_size > 5 * 1024 * 1024) continue;
      if (cache.has(id)) { show(node, cache.get(id).url); continue; }
      if (pending.has(id)) continue;
      const version = generation;
      running++; pending.add(id);
      try {
        const result = await download(file.object_path);
        if (version !== generation) continue;
        const targets = [...visible].filter(target => target.isConnected && frameFile(target)?.id === id && frameFile(target)?.object_path === file.object_path);
        if (!targets.length) continue;
        if (result.error || !result.data || result.data.size > 5 * 1024 * 1024) continue;
        trim(result.data.size);
        if (!cache.has(id)) {
          if (cache.size >= 12 || bytes() + result.data.size > 12 * 1024 * 1024) continue;
          cache.set(id, { url: URL.createObjectURL(result.data), size: result.data.size });
        }
        for (const target of targets) show(target, cache.get(id).url);
        trim();
      } catch { /* The attachment remains available through its explicit open action. */ }
      finally { running--; if (version === generation) pending.delete(id); if (waiting.size) void pump(); }
    }
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { visible.add(entry.target); waiting.add(entry.target); }
      else { visible.delete(entry.target); waiting.delete(entry.target); }
    }
    trim(); void pump();
  });
  function hydrate() {
    for (const node of observed) if (!node.isConnected) { observer.unobserve(node); observed.delete(node); visible.delete(node); waiting.delete(node); }
    doc.querySelectorAll('[data-message-photo]').forEach(node => {
      if (!observed.has(node)) { observed.add(node); observer.observe(node); }
    });
  }
  function reset() {
    generation++; observer.disconnect(); observed.clear(); visible.clear(); waiting.clear();
    cache.forEach(item => URL.revokeObjectURL(item.url)); cache.clear(); pending.clear();
  }
  function position(menu) {
    const panel = menu.querySelector(':scope > .message-menu-items,:scope > .message-quick-replies');
    if (!menu.open || !panel) return;
    const win = doc.defaultView, anchor = menu.querySelector('summary').getBoundingClientRect();
    Object.assign(panel.style, { position: 'fixed', top: '0', bottom: 'auto', left: '0', right: 'auto', maxHeight: `${win.innerHeight - 16}px`, overflowY: 'auto' });
    const box = panel.getBoundingClientRect();
    panel.style.left = `${Math.max(8, Math.min(anchor.right - box.width, win.innerWidth - box.width - 8))}px`;
    panel.style.top = `${Math.max(8, Math.min(anchor.bottom + 4, win.innerHeight - box.height - 8))}px`;
  }
  const menus = () => [...doc.querySelectorAll(':is(.message-center,.message-tool-dialog) :is(.message-action-menu,.message-quick-menu)[open]')].filter(node => node.querySelector(':scope > .message-menu-items,:scope > .message-quick-replies'));
  doc.addEventListener('toggle', event => {
    const menu = event.target;
    if (!menu.matches?.(':is(.message-center,.message-tool-dialog) :is(.message-action-menu,.message-quick-menu)')) return;
    if (menu.open && menu.querySelector(':scope > .message-menu-items,:scope > .message-quick-replies')) menus().filter(other => other !== menu).forEach(other => { other.open = false; });
    menus().forEach(position);
  }, true);
  doc.addEventListener('click', event => menus().forEach(menu => { if (!menu.contains(event.target)) menu.open = false; }));
  doc.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !menus().length) return;
    event.preventDefault(); event.stopPropagation();
    const active = menus().at(-1); active.open = false; active.querySelector('summary').focus({ preventScroll: true });
  }, true);
  doc.addEventListener('scroll', event => {
    if (!event.target.closest?.('.message-menu-items')) menus().forEach(menu => { menu.open = false; });
  }, true);
  doc.defaultView.addEventListener('resize', () => menus().forEach(position));
  return { hydrate, reset };
}
