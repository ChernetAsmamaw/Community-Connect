const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const Chat = require("./models/chats");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const http = require("http");
const {Server} = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.DB_URL;
const Port = process.env.PORT || 3000;

mongoose
  .connect(dbURI, {})
  .then(() => {
    console.log("connected to db");

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
      const newMessage = new Chat({
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

// apply the checkUser middleware to every route
app.get("*", checkUser);

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/explore", requireAuth, (req, res) => res.render("explore"));

// routes
app.use(authRoutes);
app.use(chatRoutes);
app.use(userRoutes);
