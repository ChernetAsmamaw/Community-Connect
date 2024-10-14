const Joi = require("joi");

const messageSchema = Joi.object({
    receiver: Joi.string().required().messages({
        'string.empty': 'Receiver is required',
        'any.required': 'receiver is required',
    }),
    content: Joi.string().required().messages({
        'string.empty': 'you can not send an empty message',
        'any.required': 'content us required',
    }),
});

const senderSchema = Joi.object({
    senderId: Joi.string().required().messages({
        'string.empty': 'Sender is required',
        'any.required': 'sender is required',
    }),
});


module.exports = {
    messageSchema,
    senderSchema
}