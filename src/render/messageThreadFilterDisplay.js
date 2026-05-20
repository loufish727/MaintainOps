(function () {
  function createMessageThreadFilterDisplayHelpers(deps) {
    function recentMessageLinkWorkOrders() {
      return deps.getWorkOrders()
        .filter((workOrder) => deps.matchesActiveLocation(workOrder) && workOrder.status !== "completed")
        .slice(0, 8);
    }

    function filteredMessageThreads() {
      const messageThreadFilter = deps.getMessageThreadFilter();
      return deps.getMessageThreads().filter((thread) => {
        const filterMatch =
          messageThreadFilter === "all" ||
          (messageThreadFilter === "unread" && unreadMessageCount(thread.id) > 0) ||
          thread.thread_type === messageThreadFilter;
        return filterMatch && deps.matchesQuery(messageThreadSearchValues(thread), deps.getMessageSearchQuery());
      });
    }

    function messageThreadSearchValues(thread) {
      const messages = deps.getMessagesByThreadId()[thread.id] || [];
      const participants = deps.getMessageThreadMembers()
        .filter((member) => member.thread_id === thread.id)
        .map((member) => deps.teamMemberName(member.user_id));
      return [
        thread.title,
        deps.messageThreadScopeLabel(thread),
        ...participants,
        ...messages.map((message) => message.body),
      ];
    }

    function unreadMessageCount(threadId) {
      const lastReadAt = deps.getMessageReadsByThreadId()[threadId]?.last_read_at;
      const lastReadTime = lastReadAt ? new Date(lastReadAt).getTime() : 0;
      return (deps.getMessagesByThreadId()[threadId] || []).filter((message) => {
        if (message.sender_id === deps.getCurrentUser()?.id) return false;
        return new Date(message.created_at).getTime() > lastReadTime;
      }).length;
    }

    function totalUnreadMessages() {
      return deps.getMessageThreads().reduce((total, thread) => total + unreadMessageCount(thread.id), 0);
    }

    function directUnreadMessages() {
      return deps.getMessageThreads()
        .filter((thread) => thread.thread_type === "direct")
        .reduce((total, thread) => total + unreadMessageCount(thread.id), 0);
    }

    return {
      recentMessageLinkWorkOrders,
      filteredMessageThreads,
      messageThreadSearchValues,
      unreadMessageCount,
      totalUnreadMessages,
      directUnreadMessages,
    };
  }

  window.MaintainOpsMessageThreadFilterDisplay = {
    createMessageThreadFilterDisplayHelpers,
  };
})();
