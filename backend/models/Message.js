const mongoose = require('mongoose');
const Schema = mongoose.Schema;

MessageSchema = new Schema({
    senderID: {
        type: String,
        trim: true,
        required: true,
        minlength:1
    },
    receiverID: {
        type: String,
        trim: true,
        required: true,
        minlength:1
    },
    message: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    }
})

const Message = mongoose.model("Message", MessageSchema);