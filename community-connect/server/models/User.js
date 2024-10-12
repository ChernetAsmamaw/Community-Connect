const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a first name"],
      trim: true,
      maxLength: [28, "First name must be less than 20 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter a last name"],
      trim: true,
      maxLength: [32, "Last name must be less than 20 characters"],
    },

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

// // Fire a function after doc saved to db: POST refers to after in this case
// userSchema.post("save", function (doc, next) {
//   // doc refers to the user that was saved to the db and next is a function that moves to the next middleware
//   console.log("new user was created & saved", doc);
//   next();
// });

// // Fire a function before doc saved to db
// userSchema.pre("save", async function (next) {
//   // this refers to the local instance of the user before it's saved to the db
//   /* How to hash a password:
//     1. Generate a salt: a random string of characters added to the password
//     2. Hash the password with the salt using bcrypt
//     3. Save the hashed password to the db
//   */
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);

//   // This happens before the user is saved to the db so when we move to the
//   // next middleware, the user will be saved with the hashed password
//   next();
// });

// // Static method to login user
// userSchema.statics.loginWithEmail = async function (email, password) {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect email");
// };

// userSchema.statics.loginWithUsername = async function (username, password) {
//   const user = await this.findOne({ username });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect username");
// };

// const User = mongoose.model("user", userSchema);

// module.exports = User;
