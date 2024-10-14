const User = require("../models/User");
const { use } = require("../routes/userRoutes");
const ErrorResponse = require("../utils/errorResponse");

/************ Load all users ************/
module.exports.allUsers = async (req, res, next) => {
  // Enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select("-password")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    next(error);
  }
};

/************ Load a single user ************/
module.exports.singleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

/************ Update user profile ************/
module.exports.updateProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(error);
  }
};

/************ Delete a user ************/
module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, user, message: "User deleted" });
  } catch (error) {
    return next(error);
  }
};

/************ Create User Booking History ************/
module.exports.createBookingHistory = async (req, res, next) => {
  const { title, description, price, country, city, rating } = req.body;

  try {
    const userCurrent = await User.findById({ _id: req.user._id });
    if (!userCurrent) {
      return next(new ErrorResponse("You need to be logged in", 401));
    } else {
      // Create a new booking history
      const addBookingHistory = {
        title,
        description,
        price,
        country,
        city,
        rating,
        user: req.user._id, // Use req.user._id directly
      };

      // Add the booking history to the user's history array
      userCurrent.bookingHistory.push(addBookingHistory);
      await userCurrent.save();
    }
    res.status(201).json({
      success: true,
      userCurrent,
      message: "Booking history added",
    });
    next();
  } catch (error) {
    next(error);
  }
};
