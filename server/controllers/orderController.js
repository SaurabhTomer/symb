const { getAllOrders, createOrder } = require('../models/orderModel');

//getOrder controller
function getOrders(req, res) {
  const allOrders = getAllOrders();
  res.json(allOrders);
}


// funtion to add order 
function addOrder(req, res) {
  const { restaurantName, itemCount, isPaid, deliveryDistance } = req.body;

  if (!restaurantName || itemCount == null || deliveryDistance == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const parsedItems = Number(itemCount);
  const parsedDistance = Number(deliveryDistance);

  if (Number.isNaN(parsedItems) || parsedItems <= 0) {
    return res.status(400).json({ message: 'Item count must be a positive number' });
  }

  if (Number.isNaN(parsedDistance) || parsedDistance <= 0) {
    return res.status(400).json({ message: 'Delivery distance must be a positive number' });
  }

  const order = createOrder({
    restaurantName: restaurantName.trim(),
    itemCount: parsedItems,
    isPaid,
    deliveryDistance: parsedDistance,
  });

  return res.status(201).json(order);
}

module.exports = {
  getOrders,
  addOrder,
};
