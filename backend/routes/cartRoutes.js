const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

const {
  protect
} = require("../middleware/authMiddleware");

// ADD TO CART
router.post("/", protect, addToCart);

// GET CART
router.get("/", protect, getCart);

// DELETE ITEM
router.delete("/:id", protect, removeFromCart);

module.exports = router;