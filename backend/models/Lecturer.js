const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');

//Lecturer schema
const LecturerSchema = new Schema({
    firstName: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    otherName: {
        type: String,
        minlength: 1,
        trim: true
    },
    lecturerID: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not valid!!!"
        }
    },
    department: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
    },
    faculty: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        minlength: 10,
        required: true,
    },
    dateJoined: {
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

//method to return Lecturer as JSON
LecturerSchema.methods.toJSON = function(){
    const Lecturer = this;
    const LecturerObject = Lecturer.toObject();
    return _.pick(LecturerObject,['_id','dateJoined','username','firstName','lastName','otherName','email','phoneNumber','password','department','faculty','lecturerID']);
}

//method to generate token using jsonwebtoken library
LecturerSchema.methods.generateAuthToken = function(){
    const Lecturer = this;
    const access = 'auth';
    
    const token = jwt.sign({_id: Lecturer._id.toHexString(),access},'vibehear-Lecturer').toString();

    Lecturer.tokens = Lecturer.tokens.concat([{access,token}]);

    return Lecturer.save().then(() => {
        return token;
    })

}

LecturerSchema.pre('save', function(next){
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

LecturerSchema.methods.removeToken = function (token) {
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
  };

LecturerSchema.statics.findByToken = function(token){
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

LecturerSchema.statics.findByCredentials = function(email,password){
    
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

const Lecturer = mongoose.model('Lecturer', LecturerSchema);
