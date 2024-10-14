const express = require("express");
const { sendMessage, getMessages, getMessageBySender, updateMessageReadStatus } = require("../controllers/messageController");
const { isAuthenticated} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/message", isAuthenticated, sendMessage);
router.get("/messages", isAuthenticated, getMessages);
router.get("/messages/:senderId", isAuthenticated, getMessageBySender);
router.patch("/message/read", isAuthenticated, updateMessageReadStatus);

module.exports = router;