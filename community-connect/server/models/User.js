const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/******************* BookingHistory Schema *******************/
const bookingHistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: [100, "Title must be less than 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description must be less than 500 characters"],
    },

    price: {
      type: Number,
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

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      // required: true,
    },

    bookingDate: {
      type: Date,
      // required: true,
    },

    bookingTime: {
      type: String, // "14:00"
      // required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/******************* User Schema *******************/
const userSchema = new mongoose.Schema(
  {
    // firstName: {
    //   type: String,
    //   required: [true, "Please enter a first name"],
    //   trim: true,
    //   maxLength: [28, "First name must be less than 20 characters"],
    // },

    // lastName: {
    //   type: String,
    //   required: [true, "Please enter a last name"],
    //   trim: true,
    //   maxLength: [32, "Last name must be less than 20 characters"],
    // },

    username: {
      type: String,
      required: [true, "Please enter a username"],
      trim: true,
      unique: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },

    bookingHistory: [bookingHistorySchema],

    role: {
      type: Number,
      default: 0,
    },

    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/djxkexzvz/image/upload/v1630382389/community-connect/default-profile-picture.jpg",
    },

    bio: {
      type: String,
      default: "Hey, I'm using Community Connect!",
    },

    services: {
      type: Array,
      default: [],
    },

    skills: {
      type: Array,
      default: [],
    },

    country: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    // averageRating: {
    //   type: Number,
    //   default: null,
    // },

    socials: {
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      youtube: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

/******* Mongooose hooks ********/

// Hash password before saving to db using pre mangoose hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to create a signed jwt token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = mongoose.model("User", userSchema);
