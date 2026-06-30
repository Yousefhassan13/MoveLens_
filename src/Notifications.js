import React, { useState, useMemo } from "react";
import "./Notifications.css";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiChevronLeft, FiBell, FiTag, FiShoppingBag, FiX, FiCheckCircle, FiTrash2 } from "react-icons/fi";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    group: "Today",
    date: "15/1/2026",
    title: "Welcome",
    message: "Museum Discount Today",
    time: "Now",
    unread: false,
    icon: <FiBell />
  },
  {
    id: 2,
    group: "Today",
    date: "15/1/2026",
    title: "Special Offer",
    message: "Your Points Are Ready",
    time: "2m ago",
    unread: true,
    icon: <FiTag />
  },
  {
    id: 3,
    group: "Today",
    date: "15/1/2026",
    title: "Restaurant",
    message: "New Restaurant Nearby",
    time: "2m ago",
    unread: false,
    icon: <FiShoppingBag />
  },
  {
    id: 4,
    group: "Yesterday", 
    date: "14/1/2026",   
    title: "Welcome",
    message: "Museum Discount Today",
    time: "Yesterday",
    unread: false,
    icon: <FiBell />
  },
  {
    id: 5,
    group: "Yesterday",
    date: "14/1/2026",
    title: "Special Offer",
    message: "Your Points Are Ready",
    time: "Yesterday",
    unread: true,
    icon: <FiTag />
  },
  {
    id: 6,
    group: "Yesterday",
    date: "14/1/2026",
    title: "Restaurant",
    message: "New Restaurant Nearby",
    time: "Yesterday",
    unread: false,
    icon: <FiShoppingBag />
  }
];

const TABS = ["All", "Unread"];

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS); 

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };


  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };


  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesTab = activeTab === "All" || (activeTab === "Unread" && item.unread);
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                           item.message.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [notifications, activeTab, query]);

  const groupedNotifications = useMemo(() => {
    const groups = {};
    filteredNotifications.forEach((item) => {
      if (!groups[item.group]) {
        groups[item.group] = { date: item.date, items: [] };
      }
      groups[item.group].items.push(item);
    });
    return groups;
  }, [filteredNotifications]);

  return (
    <div className="notif-container">
      <header className="notif-header">
        <button
          className="notif-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FiChevronLeft />
        </button>

        
        {unreadCount > 0 && (
          <button className="notif-mark-all-btn" onClick={markAllAsRead}>
            <FiCheckCircle />
            Mark all as read
          </button>
        )}
      </header>

      <div className="notif-search-box" role="search">
        <FiSearch className="notif-search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search For Moments"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notifications"
        />
        {query && (
          <button
            className="notif-clear-btn"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="notif-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`notif-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          
            {tab === "Unread" && unreadCount > 0 && (
              <span className="notif-tab-count">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="notif-no-results">
          {query ? (
            <p>No notifications found for "<strong>{query}</strong>"</p>
          ) : (
            <p>You're all caught up! No notifications here.</p>
          )}
        </div>
      ) : (
        Object.keys(groupedNotifications).map((groupName) => (
          <div key={groupName} className="notif-group">
            <div className="notif-group-header">
              <h2 className="notif-group-title">{groupName}</h2>
              <span className="notif-group-date">{groupedNotifications[groupName].date}</span>
            </div>

            <div className="notif-list">
              {groupedNotifications[groupName].items.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-card ${notif.unread ? "unread" : ""}`}
                  onClick={() => markAsRead(notif.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="notif-icon-box">
                    {notif.icon}
                  </div>
                  <div className="notif-details">
                    <div className="notif-top-row">
                      <h3 className="notif-title">{notif.title}</h3>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                    <p className="notif-message">{notif.message}</p>
                  </div>
                  
                  {notif.unread && <span className="notif-unread-dot" aria-label="Unread" />}
                  
                  <button
                    className="notif-delete-btn"
                    onClick={(e) => deleteNotification(notif.id, e)}
                    aria-label={`Delete notification: ${notif.title}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}