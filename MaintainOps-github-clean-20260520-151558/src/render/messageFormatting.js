(function () {
  function formatMessageTime(value) {
    if (!value) return "";
    const date = new Date(value);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (messageDay === today) return `Today ${time}`;
    if (messageDay === today - 86400000) return `Yesterday ${time}`;
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  function formatMessageDay(value) {
    if (!value) return "";
    const date = new Date(value);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    if (messageDay === today) return "Today";
    if (messageDay === today - 86400000) return "Yesterday";
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  function initials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "MO";
    return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }

  window.MaintainOpsMessageFormatting = Object.freeze({
    formatMessageTime,
    formatMessageDay,
    initials,
  });
})();
