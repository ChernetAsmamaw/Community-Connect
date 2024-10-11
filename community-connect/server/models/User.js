const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [
      (val) => {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(val);
      },
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/******* Mongooose hooks ********/

// // Fire a function after doc saved to db: POST refers to after in this case
// userSchema.post("save", function (doc, next) {
//   // doc refers to the user that was saved to the db and next is a function that moves to the next middleware
//   console.log("new user was created & saved", doc);
//   next();
// });

// Fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  // this refers to the local instance of the user before it's saved to the db
  /* How to hash a password:
    1. Generate a salt: a random string of characters added to the password
    2. Hash the password with the salt using bcrypt
    3. Save the hashed password to the db
  */
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  // This happens before the user is saved to the db so when we move to the
  // next middleware, the user will be saved with the hashed password
  next();
});

// Static method to login user
userSchema.statics.loginWithEmail = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

userSchema.statics.loginWithUsername = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
