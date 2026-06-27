const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// PLACE ORDER
router.post("/", protect, placeOrder);

// GET MY ORDERS
router.get("/", protect, getMyOrders);

module.exports = router;