const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", username: "", password: "" };

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Duplicate error code (MongoDB error code for unique constraint violation)
  if (err.code === 11000) {
    // Check if the error is for 'email' or 'username'
    if (err.keyPattern.email) {
      errors.email = "That email is already registered";
    }
    if (err.keyPattern.username) {
      errors.username = "That username is already registered";
    }
    return errors;
  }

  // Incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // Incorrect username
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  // Incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  return errors;
};

// JWT
const createToken = (id) => {
  // "community-connect secret" is a secret key we're using to hash the token
  return jwt.sign({ id }, "community-connect secret", {
    expiresIn: 3 * 24 * 60 * 60, // valid for 3 days
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    // Create a token
    const token = createToken(user._id);
    // Set the token as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    let user;
    if (identifier.includes("@")) {
      user = await User.loginWithEmail(identifier, password);
    } else {
      user = await User.loginWithUsername(identifier, password);
    }

    // Create a token upon successful login
    const token = createToken(user._id);

    // Set the token as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  // Set the jwt cookie to an empty string and set the maxAge to 1ms
  // SInce we can't delete a cookie directly, this is the next best thing
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
