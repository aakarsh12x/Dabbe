import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    users: 0,
    activeSubscriptions: 0,
    services: 0,
  });

  useEffect(() => {
    Promise.all([
      apiRequest("/users", { token }),
      apiRequest("/subscriptions", { token }),
      apiRequest("/services"),
    ]).then(([usersRes, subscriptionsRes, servicesRes]) => {
      setStats({
        users: usersRes.data.length,
        activeSubscriptions: subscriptionsRes.data.filter((item) => item.status === "ACTIVE").length,
        services: servicesRes.data.length,
      });
    });
  }, [token]);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard analytics</h2>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total Users</span>
          <strong>{stats.users}</strong>
        </article>
        <article className="stat-card">
          <span>Active Subscriptions</span>
          <strong>{stats.activeSubscriptions}</strong>
        </article>
        <article className="stat-card">
          <span>Tiffin Services</span>
          <strong>{stats.services}</strong>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;
