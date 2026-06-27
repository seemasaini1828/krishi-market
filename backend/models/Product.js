const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Vegetables",
        "Fruits",
        "Grains",
        "Dairy",
        "Organic",
        "Others"
      ]
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    unit: {
      type: String,
      default: "Kg"
    },

    image: {
      type: String,
      default: ""
    },

    harvestDate: {
      type: Date
    },

    farmingMethod: {
      type: String,
      enum: ["Organic", "Conventional"],
      default: "Conventional"
    },

    available: {
      type: Boolean,
      default: true
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);