const mongoose = require('mongoose');
const Schema = mongoose.Schema;

NotificationSchema = new Schema({
    type: {
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

const Notification = mongoose.model("Notification", NotificationSchema);