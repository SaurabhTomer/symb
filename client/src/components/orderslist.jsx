export default function OrdersList({ orders, filterStatus, filterMaxDistance, setFilterStatus, setFilterMaxDistance }) {
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      if (filterStatus === 'paid' && !order.isPaid) return false;
      if (filterStatus === 'unpaid' && order.isPaid) return false;

      if (filterMaxDistance) {
        const max = Number(filterMaxDistance);
        if (!Number.isNaN(max) && order.deliveryDistance > max) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredOrders = getFilteredOrders();

  return (
    <section className="card">
      <h2>Orders Listing & Filters</h2>
      <div className="filters">
        <div className="form-group">
          <label>Payment Filter</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="form-group">
          <label>Max Distance Filter (km)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={filterMaxDistance}
            onChange={(e) => setFilterMaxDistance(e.target.value)}
            placeholder="Leave empty for no limit"
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No orders to display. Add an order to get started.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.restaurantName}</td>
                  <td>{order.itemCount}</td>
                  <td>{order.isPaid ? 'Paid' : 'Unpaid'}</td>
                  <td>{order.deliveryDistance}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
