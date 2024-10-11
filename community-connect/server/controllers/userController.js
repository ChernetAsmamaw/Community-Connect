const User = require("../models/User");

const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const singleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

module.exports = {
  allUsers,
  singleUser,
};
