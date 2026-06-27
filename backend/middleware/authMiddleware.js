const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify Login User
const protect = async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token"
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No Token, Authorization Denied"
    });
  }
};

// Admin Only
const adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      success: false,
      message: "Admin Access Only"
    });

  }

  next();

};

// Farmer Only
const farmerOnly = (req, res, next) => {

  if (req.user.role !== "farmer") {

    return res.status(403).json({
      success: false,
      message: "Farmer Access Only"
    });

  }

  next();

};

module.exports = {
  protect,
  adminOnly,
  farmerOnly
};