const express = require("express");
const {sendMessage, getMessages} = require("../controllers/chatController");
const {requireAuth} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/chat", requireAuth, sendMessage);

router.get("/chats", requireAuth, getMessages);

module.exports = router;