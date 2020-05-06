const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

const CourseSchema = new Schema({
    title: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    unit: {
        type: Number,
        minlength: 1,
        maxlength: 5,
        trim: true,
        required: true
    },
    code: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    level: {
        type: Number,
        trim: true,
        required: true
    },
    department: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    faculty: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    addedBy: {
        type: String,
        trim: true,
        required: true
    },
    lecturer: {
        type: String,
        trim: true,
        default: "Lecturer"
    },
    dateAdded: {
        type: String,
        trim: true,
        required: true
    },
    lecturerID: {
        type: String,
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
CourseSchema.methods.toJSON = function(){
    const admin = this;
    const AdminObject = admin.toObject();

    return _.pick(AdminObject,['_id','level','tokens','lecturer','lecturerID','title','unit','code','department','faculty','dateAdded','addedBy']);

}

//method to generate token using jsonwebtoken library
CourseSchema.methods.generateAuthToken = function(){
    const admin = this;
    const access = 'auth';

    const token = jwt.sign({_id: admin._id.toHexString(),access},'vibehear-admin').toString();
    
    admin.tokens = admin.tokens.concat([{token,access}]);

    return admin.save().then(() => {
        return token
    })
}

CourseSchema.pre('save', function(next){
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

CourseSchema.methods.removeToken = function (token) {
    var user = this;
  
    return user.update({
      $pull: {
        tokens: {token}
      }
    });
};

CourseSchema.statics.findByToken = function(token){
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


const Course = mongoose.model('Course', CourseSchema);