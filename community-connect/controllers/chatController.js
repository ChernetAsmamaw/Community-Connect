const Chat = require("../models/chats");
const User = require("../models/User");

const sendMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;

    try {
      const senderUser = await User.findById(sender);
      const receiverUser = await User.findById(receiver);

      if (!senderUser || !receiverUser) {
        return res.status(400).json({ error: "Sender or receiver not found" });
      }

      const newMessage = new Chat({ sender, receiver, content });
      await newMessage.save();
      res.status(201).json({ message: "Message sent successfully", data: newMessage});
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
};

const getMessages = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
      const messages = await Chat.find({ 
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ],
      }).sort({ timestamp: 1 });
      res.status(200).json({message: "Message retrieved successfully", data: messages});
    } catch (error) {
      res.status(500).json({ error: "Failed to get messages" });
    }
};

module.exports = {
    sendMessage,
    getMessages
};