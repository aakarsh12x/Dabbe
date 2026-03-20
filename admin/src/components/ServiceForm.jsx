import { useEffect, useState } from "react";

const blankForm = {
  name: "",
  description: "",
  priceMonthly: "",
  rating: "4.5",
  vegOrNonVeg: "VEG",
  location: "",
  imageUrl: "",
  menusText: "Monday: Dal, Rice, Sabzi, 4 Chapatis",
};

const ServiceForm = ({ initialValues, onSubmit, onCancel, submitting }) => {
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...initialValues,
        menusText: initialValues.menus?.map((menu) => `${menu.day}: ${menu.mealDescription}`).join("\n") || "",
      });
    } else {
      setForm(blankForm);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const menus = form.menusText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [day, ...rest] = line.split(":");
        return {
          day: day.trim(),
          mealDescription: rest.join(":").trim(),
        };
      });

    onSubmit({
      name: form.name,
      description: form.description,
      priceMonthly: Number(form.priceMonthly),
      rating: Number(form.rating),
      vegOrNonVeg: form.vegOrNonVeg,
      location: form.location,
      imageUrl: form.imageUrl,
      menus,
    });
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <input name="name" placeholder="Service name" value={form.name} onChange={handleChange} required />
      <select name="vegOrNonVeg" value={form.vegOrNonVeg} onChange={handleChange}>
        <option value="VEG">Veg</option>
        <option value="NON_VEG">Non-Veg</option>
      </select>
      <input name="priceMonthly" placeholder="Price per month" value={form.priceMonthly} onChange={handleChange} required />
      <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        required
      />
      <textarea
        name="menusText"
        placeholder="One menu per line, e.g. Monday: Dal, Rice, Sabzi"
        value={form.menusText}
        onChange={handleChange}
        rows={5}
      />
      <div className="form-actions">
        <button type="submit" className="button" disabled={submitting}>
          {submitting ? "Saving..." : "Save service"}
        </button>
        {onCancel ? (
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default ServiceForm;
