const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    itemCount: {
      type: Number,
      required: true,
      min: 1,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveryDistance: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

async function getAllOrders() {
  return Order.find().sort({ orderId: 1 }).lean();
}

async function getNextOrderId() {
  const last = await Order.findOne().sort({ orderId: -1 }).lean();
  if (!last) return 1;
  return last.orderId + 1;
}

async function createOrder({ restaurantName, itemCount, isPaid, deliveryDistance }) {
  const nextId = await getNextOrderId();

  const order = await Order.create({
    orderId: nextId,
    restaurantName,
    itemCount,
    isPaid: Boolean(isPaid),
    deliveryDistance,
  });

  return order.toObject();
}

module.exports = {
  getAllOrders,
  createOrder,
};