const Messaging = require("../models/Messaging");
const User = require("../models/User");
const { messageSchema, senderSchema} = require("../validation/messagingValidation");

const sendMessage = async (req, res) => {
    const error = messageSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details && error.details.length > 0 ? error.details[0].message : 'Invalid input';
        return res.status(400).json({ error: errorMessage });
    }

    const { receiver, content } = req.body;
    const sender = req.user._id;

    try {
      const receiverUser = await User.findById(receiver);

      if (!receiverUser) {
        return res.status(400).json({ error: "receiver not found" });
      }

      const newMessage = new Messaging({ sender, receiver, content });
      await newMessage.save();

      res.status(201).json({ message: "Message sent successfully", data: newMessage});
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Failed to send message" });
    }
};

const getMessages = async (req, res) => {
    const userId = req.user._id; //logged in user

    try {
        const messages = await Messaging.find({
            $or: [
                { sender: userId },   // Messages sent by the user
                { receiver: userId }  // Messages received by the user
            ]
        }).sort({ timestamp: 1});

        //group messages by sender

        const groupedMessages = messages.reduce((acc, message) => {
            const patnerId = message.sender.toString() === userId.toString() ? message.receiver : message.sender;
            if (!acc[patnerId]) {
                acc[patnerId] = [];
            }
            acc[patnerId].push(message);
            return acc;
        }, {});
      
        res.status(200).json({message: "Message retrieved successfully", data: groupedMessages});
    } catch (error) {
      res.status(500).json({ error: "Failed to get messages" });
    }
};

const getMessageBySender = async (req, res) => {
    const {error} = senderSchema.validate(req.params);
    if (error) {
        const errorMessage = error.details && error.details.length > 0 ? error.details[0].message : 'Invalid input';
        return res.status(400).json({ error: errorMessage });
    }

    const userId = req.user._id;
    const senderId = req.params.senderId;
    if (!senderId) {
        return res.status(400).json({ error: "Sender ID is required" });
    }

    try {
        const messages = await Messaging.find({
            $or: [
                { sender: userId, receiver: senderId }, // User sent messages to sender
                { sender: senderId, receiver: userId }  // Sender sent messages to user
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({message: "your messages", data: messages});
    } catch (error) {
        res.status(500).json({ error: "Error in getting messages" }); 
    }
};

const updateMessageReadStatus = async (req, res) => {

    const userId = req.user._id;
    const { messageId } = req.body;
    if (!messageId) {
        return res.status(400).json({ error: "Message ID is required" });       
    }

    try {
        const message = await Messaging.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        // Check if the user is the receiver of the message because receiver is the only one who can mark messages as read
        if (message.receiver.toString() !== userId.toString()) {
            return res.status(403).json({ error: "You are not authorized to mark this message as read" });
        }

        message.readStatus = true;
        await message.save();

        res.status(200).json({ message: "Message marked as read successfully", data: message });
    } catch (error) {
        res.status(500).json({ error: "Error in updating message" });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    getMessageBySender,
    updateMessageReadStatus
};