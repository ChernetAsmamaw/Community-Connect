const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");

const Messaging = require("./models/Messaging");
const http = require("http");
const { Server } = require("socket.io");

// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const messageRoutes = require("./routes/messagingRoutes");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// database connection
const dbURI = process.env.DB_URL;
const Port = process.env.PORT || 5000;

/********** Connect to MongoDB **********/
mongoose
  .connect(dbURI, {
    // options for the connect method to parse the URI
  })
  .then(() => {
    server.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
      console.log(`Go to http://localhost:${Port}/`);
    });
  })
  .catch((err) => console.log("connection error: ", err));

  //socket io

  io.on("connection", (socket) => {
    console.log("a user connected: ", socket.id);
  
    socket.on("SendMessage", async (data) => {
      const { sender, receiver, content } = data;
      try{
        const newMessage = new Messaging({
          sender,
          receiver,
          content
        });
        await newMessage.save();
  
        socket.to(receiver).emit("receiveMessage", newMessage);
      } catch(err){
        console.log("failed to send message: ", err);
      }
    });
    
    socket.on("disconnect", () => {
      console.log("user disconnected: ", socket.id);
    });
  });


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
app.get("/", (req, res) => {
  res.send("Hello,  Welcome to our Community Connect API");
})
app.use("/api/", authRoutes); // mount the routes using "use" as there are multiple routes
app.use("/api/", userRoutes);
app.use("/api/", serviceCategoryRoutes);
app.use("/api/", serviceRoutes);
app.use("/api/", messageRoutes);

/********** Error Handler Middleware **********/
// Put last to make sure all other middlewares run before this
app.use(errorHandler);
