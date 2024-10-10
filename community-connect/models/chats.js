const {Schema, model} = require("mongoose");

  
  const chatSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
    receiver: { 
        type: Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
    content: { 
        type: String, required: true 
    },
    timestamp: { 
        type: Date, default: Date.now 
    },
    readStatus: { 
        type: Boolean, default: false 
    },
  });
  
  const Chat = model("Message", chatSchema);
  
  module.exports = Chat