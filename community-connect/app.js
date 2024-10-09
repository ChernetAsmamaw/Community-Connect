const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://casmamaw:0QFwakAZD5vuYTdY@community-connect.icsze.mongodb.net/node-auth?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// apply the checkUser middleware to every route
app.get("*", checkUser);
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/explore", requireAuth, (req, res) => res.render("explore"));

// auth routes
app.use(authRoutes);
