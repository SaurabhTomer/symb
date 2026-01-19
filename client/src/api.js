

const API_BASE_URL = "http://localhost:4000";

// Dummy data if backend fails then it will show dummy data
// beacuse it dummy data if you will refresh it then we will lose the data

export const dummyOrders = [

  {
    orderId: 1,
    restaurantName: "Raj Mahal Palace",
    itemCount: 3,
    isPaid: false,
    deliveryDistance: 10.5,
  },
   {
    orderId: 2,
    restaurantName: "Food River",
    itemCount: 3,
    isPaid: false,
    deliveryDistance: 5,
  },
   {
    orderId: 3,
    restaurantName: "Delhi Dwar",
    itemCount: 3,
    isPaid: false,
    deliveryDistance: 7,
  },
  {
    orderId: 4,
    restaurantName: "Burger King",
    itemCount: 2,
    isPaid: true,
    deliveryDistance: 2.8,
  },
];
 //API calls 
// Get orders 
export async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    return await res.json();
  } catch {
    return dummyOrders;
  }
}

// Add order
export async function addOrder(order) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return await res.json();
  } catch {
    const newOrder = {
      orderId: dummyOrders.length + 1,
      ...order,
      isPaid: !!order.isPaid,
    };
    dummyOrders.push(newOrder);
    return newOrder;
  }
}
