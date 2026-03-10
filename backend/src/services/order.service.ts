import Order from "../models/order.model";
import Product from "../models/product.model";
import * as orderTypes from "../types/orders.type";

export const getUserOrders = async (userId: string) => {
  return Order.find({ user: userId })
    .populate("items.productId")
    .sort({ createdAt: -1 });
};

export const getOrCreateProgressOrder = async (userId: string) => {
  let order = await Order.findOne({
    user: userId,
    status: "progress",
  });

  if (!order) {
    order = await Order.create({
      user: userId,
      items: [],
      totalAmount: 0,
      status: "progress",
    });
  }

  return order;
};

export const addProductToOrder = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough stock");
  }

  const order = await getOrCreateProgressOrder(userId);

  const item = order.items.find((i) => {
    i.productId.equals(product._id);
  });

  if (item) {
    const newQuantity = item.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new Error("Not enough stock");
    }

    item.quantity = newQuantity;
  } else {
    order.items.push({
      productId: product._id,
      quantity,
      price: product.price,
    });
  }

  order.totalAmount = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  await order.save();

  return order;
};

export const removeProductFromOrder = async (
  userId: string,
  productId: string,
) => {
  const order = await Order.findOne({
    user: userId,
    status: "progress",
  });

  if (!order) {
    throw new Error("Order not found");
  }

  order.items = order.items.filter((i) => !i.productId.equals(productId));

  order.totalAmount = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  await order.save();

  return order;
};

export const updateProductQuantity = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const order = await Order.findOne({
    user: userId,
    status: "progress",
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity > product.stock) {
    throw new Error("Not enough stock");
  }

  const item = order.items.find((i) => i.productId.equals(productId));

  if (!item) {
    throw new Error("Product not fount in order");
  }

  item.quantity = quantity;
  order.totalAmount = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  await order.save();

  return order;
};

export const confirmOrder = async (userId: string) => {
  const order = await Order.findOne({ user: userId, status: "progress" });

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "pending";

  await order.save();
  return order;
};
