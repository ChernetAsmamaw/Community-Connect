const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const serviceCategorySchema = new mongoose.Schema(
  {
    serviceCategoryName: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      maxLength: [100, "Name must be less than 100 characters"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
