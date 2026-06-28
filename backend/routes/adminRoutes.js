const express = require("express");
const router = express.Router();

const {
  getUsers,
  getProducts,
  deleteUser,
  deleteProduct,
} = require("../controllers/adminController");

// Get all users
router.get("/users", getUsers);

// Get all products
router.get("/products", getProducts);

// Delete user
router.delete("/users/:id", deleteUser);

// Delete product
router.delete("/products/:id", deleteProduct);

module.exports = router;
