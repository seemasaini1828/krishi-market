const Order = require("../models/Order");
const Cart = require("../models/Cart");

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    let total = 0;

    const products = cartItems.map(item => {
      total += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity
      };
    });

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount: total
    });

    // clear cart after order
    await Cart.deleteMany({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET USER ORDERS
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product");

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders
};