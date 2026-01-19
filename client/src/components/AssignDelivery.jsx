import { useState } from "react";

export default function AssignDelivery({ orders }) {
  const [maxDistance, setMaxDistance] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // assign the nearest unpaid order within max distance
  const handleAssign = () => {
    setError("");
    setResult("");

    if (!maxDistance) {
      setError("Please enter a maximum distance for assignment.");
      return;
    }

    const parsed = Number(maxDistance);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setError("Maximum distance must be a positive number.");
      return;
    }

    // filter unpaid orders within the distance
    const eligibleOrders = orders.filter(
      (order) => !order.isPaid && order.deliveryDistance <= parsed,
    );

    if (eligibleOrders.length === 0) {
      setResult("No order available");
      return;
    }

    // sort by distance and pick the nearest
    eligibleOrders.sort((a, b) => a.deliveryDistance - b.deliveryDistance);
    const assigned = eligibleOrders[0];
    setResult(
      `Assigned Order ID: ${assigned.orderId} (Restaurant: ${assigned.restaurantName}, Distance: ${assigned.deliveryDistance} km)`,
    );
  };

  return (
    <section className="card">
      <h2>Filter & Assign Delivery</h2>
      <div className="form-group">
        <label>Maximum Distance (km)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={maxDistance}
          onChange={(e) => setMaxDistance(e.target.value)}
          placeholder="e.g. 8"
        />
      </div>

      <button className="btn" onClick={handleAssign}>
        Assign Nearest Unpaid Order
      </button>

      <div className="assign-output">
        <h3>Output Panel</h3>
        <p>{result || "No assignment yet."}</p>
      </div>

      {error && (
        <div className="alert alert-error error-margin">
          {error}
        </div>
      )}
    </section>
  );
}
