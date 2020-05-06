const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

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
    dateAdded: {
        type: String,
        trim: true,
        required: true
    },
    senderID: {
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
    },
    status: {
        type: Number,
        trim: true,
        required: true
    },
    senderType: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    receiverType: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

//method to return notification as JSON
NotificationSchema.methods.toJSON = function(){
    const admin = this;
    const AdminObject = admin.toObject();

    return _.pick(AdminObject,['_id','tokens','type','receiverType','receiverID','message','senderID','dateAdded', 'senderType', 'status']);
}

//method to generate token using jsonwebtoken library
NotificationSchema.methods.generateAuthToken = function(){
    const admin = this;
    const access = 'auth';

    const token = jwt.sign({_id: admin._id.toHexString(),access},'vibehear-admin').toString();

    admin.tokens = admin.tokens.concat([{token,access}]);

    return admin.save().then(() => {
        return token
    })
}

NotificationSchema.pre('save', function(next){
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err,hash) => {
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

NotificationSchema.methods.removeToken = function (token) {
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
};

NotificationSchema.statics.findByToken = function(token){
    const user = this;
    let decoded;

    try{
        decoded = jwt.verify(token,'vibehear-student')
    }catch(e){
        return Promise.reject();
    }

    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}


const Notification = mongoose.model("Notification", NotificationSchema);