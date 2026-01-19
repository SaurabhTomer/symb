// const API_BASE_URL = "http://localhost:4000";

// // Dummy data
// export const dummyOrders = [
//   {
//     orderId: 1,
//     restaurantName: "Pizza Palace",
//     itemCount: 3,
//     isPaid: false,
//     deliveryDistance: 4.2,
//   },
//   {
//     orderId: 2,
//     restaurantName: "Burger Barn",
//     itemCount: 2,
//     isPaid: true,
//     deliveryDistance: 2.8,
//   },
// ];

// // Get orders
// export async function fetchOrders() {
//   try {
//     const res = await fetch(`${API_BASE_URL}/orders`);
//     return await res.json();
//   } catch {
//     return dummyOrders;
//   }
// }

// // Add order
// export async function addOrder(order) {
//   try {
//     const res = await fetch(`${API_BASE_URL}/orders`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(order),
//     });
//     return await res.json();
//   } catch {
//     const newOrder = {
//       orderId: dummyOrders.length + 1,
//       ...order,
//       isPaid: !!order.isPaid,
//     };
//     dummyOrders.push(newOrder);
//     return newOrder;
//   }
// }

const API_BASE_URL = "http://localhost:4000";

// Dummy data if backend fails then it will show dummy data

// beacuse it dummy data if you will refresh it then we will lose the data
export const dummyOrders = [
  // {
  //   order__Id: 1,
  //   restaurantName: "Pizza Palace",
  //   itemCount: 3,
  //   isPaid: false,
  //   deliveryDistance: 4.2,
  // },
  {
    orderId: 1,
    restaurantName: "Pizza Palace",
    itemCount: 3,
    isPaid: false,
    deliveryDistance: 4.2,
  },
  {
    orderId: 2,
    restaurantName: "Burger Barn",
    itemCount: 2,
    isPaid: true,
    deliveryDistance: 2.8,
  },
];

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
