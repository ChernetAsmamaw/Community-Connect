const {Schema, model} = require('mongoose');

const messagingSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    readStatus: {
        type: Boolean,
        default: false
    },   
},
    {timestamps: true}
);

const Messaging = model('Messaging', messagingSchema);
module.exports = Messaging