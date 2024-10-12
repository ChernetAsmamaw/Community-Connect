const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true,
      maxLength: [100, "Title must be less than 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Please enter a description"],
      trim: true,
      maxLength: [500, "Description must be less than 500 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please enter a price"],
    },

    serviceImage: {
      type: String,
      default:
        "https://res.cloudinary.com/djxkexzvz/image/upload/v1630382389/community-connect/default-profile-picture.jpg",
    },

    availability: {
      type: String,
      default: "Available",
    },

    country: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    serviceCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
