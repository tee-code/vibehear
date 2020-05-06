const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

DepartmentSchema = new Schema({
    faculty: {
        type: String,
        trim: true,
        required: true,
        minlength:1
    },
    department: {
        type: String,
        trim: true,
        required: true,
        minlength:1,
        unique: true
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
DepartmentSchema.methods.toJSON = function(){
    const admin = this;
    const AdminObject = admin.toObject();

    return _.pick(AdminObject,['_id','tokens','department','faculty','addedBy','dateAdded']);
}

//method to generate token using jsonwebtoken library
DepartmentSchema.methods.generateAuthToken = function(){
    const admin = this;
    const access = 'auth';

    const token = jwt.sign({_id: admin._id.toHexString(),access},'vibehear-admin').toString();

    admin.tokens = admin.tokens.concat([{token,access}]);

    return admin.save().then(() => {
        return token
    })
}

DepartmentSchema.pre('save', function(next){
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

DepartmentSchema.methods.removeToken = function (token) {
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
};

DepartmentSchema.statics.findByToken = function(token){
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

const Department = mongoose.model("Department", DepartmentSchema);