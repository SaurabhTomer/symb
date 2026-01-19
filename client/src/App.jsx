import { useEffect, useState } from 'react';
import AddOrder from './components/AddOrder';
import OrdersList from './components/orderslist';
import AssignDelivery from './components/AssignDelivery';
import { fetchOrders } from './api';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMaxDistance, setFilterMaxDistance] = useState('');

  // load orders on mount
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Could not load orders.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // callback to add new order to the list
  const handleOrderAdded = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
       
        <p>Online Food Delivery Order Manager</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="alert">Loading...</div>}

      <main className="layout-grid">
        <AddOrder onOrderAdded={handleOrderAdded} />
        <OrdersList
          orders={orders}
          filterStatus={filterStatus}
          filterMaxDistance={filterMaxDistance}
          setFilterStatus={setFilterStatus}
          setFilterMaxDistance={setFilterMaxDistance}
        />
        <AssignDelivery orders={orders} />
      </main>
    </div>
  );
}

export default App;
