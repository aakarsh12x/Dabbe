import { useEffect, useState } from "react";
import ServiceForm from "../../components/ServiceForm";
import { apiRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const ServicesPage = () => {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = () => {
    apiRequest("/services").then((data) => setServices(data.data));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      if (editingService) {
        await apiRequest(`/services/${editingService.id}`, {
          method: "PUT",
          token,
          body: payload,
        });
      } else {
        await apiRequest("/services", {
          method: "POST",
          token,
          body: payload,
        });
      }

      setEditingService(null);
      fetchServices();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    await apiRequest(`/services/${id}`, {
      method: "DELETE",
      token,
    });
    fetchServices();
  };

  return (
    <section className="two-column">
      <div>
        <div className="page-header">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2>{editingService ? "Edit service" : "Add a tiffin service"}</h2>
          </div>
        </div>
        <div className="panel">
          <ServiceForm
            initialValues={editingService}
            onSubmit={handleSubmit}
            onCancel={() => setEditingService(null)}
            submitting={submitting}
          />
        </div>
      </div>

      <div>
        <div className="page-header">
          <div>
            <p className="eyebrow">Live list</p>
            <h2>Existing services</h2>
          </div>
        </div>
        <div className="cards-list">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <div>
                <h3>{service.name}</h3>
                <p className="muted">{service.location}</p>
                <p>{service.description}</p>
              </div>
              <div className="service-meta">
                <span>Rs. {service.priceMonthly}/month</span>
                <span>{service.rating} ★</span>
                <span>{service.vegOrNonVeg}</span>
              </div>
              <div className="card-actions">
                <button className="button" onClick={() => setEditingService(service)}>
                  Edit
                </button>
                <button className="button secondary" onClick={() => handleDelete(service.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
