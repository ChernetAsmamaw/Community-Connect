const { Schema, model, models } = require("mongoose");

const chatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
});

// Check if the model exists, and if it does, reuse it; otherwise, create a new model.
const Chat = models.Message || model("Message", chatSchema);

module.exports = Chat;
