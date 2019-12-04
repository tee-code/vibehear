const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Admin model
const AdminSchema = new Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid"
        }
    },
    firstName: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
    },
    otherName: {
        type: String,
        trim: true,
        minlength: 1,
    },
    phoneNumber: {
        type: String,
        trim: true,
        minlength: 10,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        required: true
    },
    username: {
        type: String,
        trim: true,
        minlength: 5,
        required: true,
        unique: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        required: true
    },
    addedBy: {
        type: String,
        trim: true,
        required: true
    },
    dateAdded: {
        type: String,
        trim: true,
        required: true
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

//method to return admin as JSON
AdminSchema.methods.toJSON = function(){
    const admin = this;
    const AdminObject = admin.toObject();

    return _.pick(AdminObject,['_id','dateAdded','addedBy','status','role','email','username','phoneNumber','firstName','lastName','otherName','password','notifications']);
}

//method to generate token using jsonwebtoken library
AdminSchema.methods.generateAuthToken = function(){
    const admin = this;
    const access = 'auth';

    const token = jwt.sign({_id: admin._id.toHexString(),access},'vibehear-admin').toString();

    admin.tokens = admin.tokens.concat([{token,access}]);

    return admin.save().then(() => {
        return token
    })
}

AdminSchema.pre('save', function(next){
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

AdminSchema.methods.removeToken = function (token) {
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
};

AdminSchema.statics.findByToken = function(token){
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

AdminSchema.statics.findByCredentials = function(email,password){
    
    const User = this;
    return User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve,reject) => {
            bcrypt.compare(password,user.password,(err,res) => {
                if(res){
                    resolve(user);
                }else{
                    reject();
                }
            })
        })
    })
}

const Admin = mongoose.model('Admin',AdminSchema)