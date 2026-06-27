const Cart = require("../models/Cart");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user._id,
      product,
      quantity
    });

    res.status(201).json({
      success: true,
      message: "Added to cart",
      cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET USER CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id })
      .populate("product");

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE CART ITEM
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item removed"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};