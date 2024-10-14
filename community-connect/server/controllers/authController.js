const { isAuthenticated } = require("../middleware/authMiddleware");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/************ Register a new user ************/
module.exports.signup = async (req, res, next) => {
  const { email } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse("This email is already registered", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

/************ Login a user ************/
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Create a token
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({ success: true, role: user.role, isAuthenticated: true });
};

/************ Logout a user ************/
module.exports.logout = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res
        .status(400)
        .json({ success: false, message: "No user is logged in" });
    }
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

/************ User Profile ************/
module.exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
