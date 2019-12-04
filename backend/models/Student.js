const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

//student schema
const StudentSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    otherName: {
        type: String,
    },
    matricNumber: {
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
        trim: true
    },
    faculty: {
        type: String,
        trim: true
    },
    level: {
        type: Number,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    phoneNumber: {
        type: String,
        trim: true
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

//method to return student as JSON
StudentSchema.methods.toJSON = function(){
    const student = this;
    const StudentObject = student.toObject();
    return _.pick(StudentObject,['_id','dateJoined','firstName','lastName','otherName','email','phoneNumber','password','department','faculty','matricNumber','level']);
}

//method to generate token using jsonwebtoken library
StudentSchema.methods.generateAuthToken = function(){
    const student = this;
    const access = 'auth';
    
    const token = jwt.sign({_id: student._id.toHexString(),access},'vibehear-student').toString();

    student.tokens = student.tokens.concat([{access,token}]);

    return student.save().then(() => {
        return token;
    })

}

StudentSchema.pre('save', function(next){
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

StudentSchema.methods.removeToken = function (token) {
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
  };

StudentSchema.statics.findByToken = function(token){
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

StudentSchema.statics.findByCredentials = function(email,password){
    
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

const Student = mongoose.model('Student', StudentSchema);
