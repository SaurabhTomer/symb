// this is the componenct for to add order in which we are adding the order
import { useState } from "react";

// this is to call api
import { addOrder } from "../api";

// this is the main funcation or component
export default function AddOrder({ onOrderAdded }) {
  const [form, setForm] = useState({
    restaurantName: "",
    itemCount: "",
    deliveryDistance: "",
    isPaid: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "radio" ? value === "paid" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      restaurantName: form.restaurantName,
      itemCount: Number(form.itemCount),
      deliveryDistance: Number(form.deliveryDistance),
      isPaid: form.isPaid,
    };

    const created = await addOrder(order);
    onOrderAdded(created);

    // reset form
    setForm({
      restaurantName: "",
      itemCount: "",
      deliveryDistance: "",
      isPaid: false,
    });

    setLoading(false);
  };

  return (


    <form onSubmit={handleSubmit}>
      {/* // restaurantName input  */}
      <input
        name="restaurantName"
        value={form.restaurantName}
        onChange={handleChange}
        placeholder="Restaurant name"
      />
      
      {/* // itemCount input  */}
      <input
        name="itemCount"
        type="number"
        value={form.itemCount}
        onChange={handleChange}
        placeholder="Item count"
      />
      
      {/* // deliveryDistance input  */}
      <input
        name="deliveryDistance"
        type="number"
        value={form.deliveryDistance}
        onChange={handleChange}
        placeholder="Distance"
      />

      {/* // isPaid radio buttons  */}
      <label>
        <input
          type="radio"
          name="isPaid"
          value="paid"
          onChange={handleChange}
        />
        Paid
      </label>

      <label>
        <input
          type="radio"
          name="isPaid"
          value="unpaid"
          onChange={handleChange}
          defaultChecked
        />
        Unpaid
      </label>

      {/* // submit button  */}
      <button disabled={loading}>{loading ? "Adding..." : "Add Order"}</button>
    </form>
  );
}
