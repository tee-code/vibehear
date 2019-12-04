const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }

})


const Course = mongoose.model('Course', CourseSchema);