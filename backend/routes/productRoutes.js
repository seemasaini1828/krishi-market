const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require("../controllers/productController");

const {
  protect,
  farmerOnly
} = require("../middleware/authMiddleware");

// Add Product (Farmer Only)
router.post("/", protect, farmerOnly, addProduct);

// Get All Products
router.get("/", getProducts);

// Farmer My Products
router.get("/myproducts", protect, farmerOnly, getMyProducts);

// Get Single Product
router.get("/:id", getProductById);

// Update Product
router.put("/:id", protect, farmerOnly, updateProduct);

// Delete Product
router.delete("/:id", protect, farmerOnly, deleteProduct);

module.exports = router;