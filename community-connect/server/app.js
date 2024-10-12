const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");

// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// database connection
const dbURI = process.env.DB_URL;
const Port = process.env.PORT || 5000;

/********** Connect to MongoDB **********/
mongoose
  .connect(dbURI, {
    // options for the connect method to parse the URI
  })
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
      console.log(`Go to http://localhost:${Port}/`);
    });
  })
  .catch((err) => console.log("connection error: ", err));

/********** Middlewares **********/
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

/********** Routes **********/
app.use("/api/", authRoutes); // mount the routes using "use" as there are multiple routes
app.use("/api/", userRoutes);
app.use("/api/", serviceCategoryRoutes);
app.use("/api/", serviceRoutes);

/********** Error Handler Middleware **********/
// Put last to make sure all other middlewares run before this
app.use(errorHandler);
