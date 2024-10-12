const User = require("../models/User");
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
