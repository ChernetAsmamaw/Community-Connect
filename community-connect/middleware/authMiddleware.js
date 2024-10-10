const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const requireAuth = (req, res, next) => {
  //grab the token named jwt from the cookies
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(401).json({ error: "Unauthorized access" }).redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// Check the current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);

        // set the user to null if the token is not verified to prevent errors
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);

        // locals is an object that is passed to the views: inject the user into the views
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
