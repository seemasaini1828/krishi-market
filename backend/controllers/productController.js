const Product = require("../models/Product");

// ==========================
// Add Product
// ==========================
const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      description,
      price,
      quantity,
      unit,
      image,
      harvestDate,
      farmingMethod
    } = req.body;

    const product = await Product.create({
      productName,
      category,
      description,
      price,
      quantity,
      unit,
      image,
      harvestDate,
      farmingMethod,
      farmer: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================
// Get All Products
// ==========================
const getProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("farmer", "name email");

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// ==========================
// Get Single Product
// ==========================
const getProductById = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id)
      .populate("farmer", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ==========================
// Update Product
// ==========================
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    // Sirf owner farmer update kare
    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized"
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Product Updated",
      product: updatedProduct
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ==========================
// Delete Product
// ==========================
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized"
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// Get My Products
const getMyProducts = async (req, res) => {

  try {

    const products = await Product.find({
      farmer: req.user._id
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts
};