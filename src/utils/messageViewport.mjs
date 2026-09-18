export function trackMessageViewport(win = window, doc = document) {
  const update = () => {
    if (!doc.body.classList.contains("messages-active")) return;
    const root = doc.querySelector(".message-center");
    const top = Math.max(0, root?.getBoundingClientRect().top || 0);
    const bottom = win.innerWidth > 920 ? 24 : 0;
    doc.documentElement.style.setProperty("--message-viewport-height", `${Math.round(Math.max(240, (win.visualViewport?.height || win.innerHeight) - top - bottom))}px`);
  };
  win.visualViewport?.addEventListener("resize", update, { passive: true });
  win.addEventListener("resize", update, { passive: true });
  return update;
}
