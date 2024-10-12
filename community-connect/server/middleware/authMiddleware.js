const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
require("dotenv").config();

/************ Authenticate user to access protected routes ************/
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

/************ Admin user ************/
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 0) {
    return next(new ErrorResponse("Access denied! Must be an admin", 403));
  }
  next();
};
