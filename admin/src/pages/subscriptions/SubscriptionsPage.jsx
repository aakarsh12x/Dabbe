import { useEffect, useState } from "react";
import { apiRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const statuses = ["ACTIVE", "PAUSED", "CANCELLED", "EXPIRED"];

const SubscriptionsPage = () => {
  const { token } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = () => {
    apiRequest("/subscriptions", { token }).then((data) => setSubscriptions(data.data));
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [token]);

  const updateStatus = async (id, status) => {
    await apiRequest(`/subscriptions/${id}/status`, {
      method: "PATCH",
      token,
      body: { status },
    });

    fetchSubscriptions();
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Plans</p>
          <h2>Subscription management</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Period</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  {subscription.user.name}
                  <div className="muted">{subscription.user.email}</div>
                </td>
                <td>{subscription.service.name}</td>
                <td>
                  {new Date(subscription.startDate).toLocaleDateString()} - {new Date(subscription.endDate).toLocaleDateString()}
                </td>
                <td>
                  <select value={subscription.status} onChange={(e) => updateStatus(subscription.id, e.target.value)}>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SubscriptionsPage;
