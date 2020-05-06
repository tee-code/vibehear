const mongoose = require('mongoose');

//Grabbing all the models in one file

require('../../models/Student');
require('../../models/Admin');
require('../../models/Course');
require('../../models/Lecturer');
require('../../models/Message');
require('../../models/Notification');
require('../../models/Faculty');
require('../../models/Department');

const Student = mongoose.model("Student");
const Admin = mongoose.model("Admin");
const Course = mongoose.model("Course");
const Lecturer = mongoose.model("Lecturer");
const Message = mongoose.model("Message");
const Notification = mongoose.model("Notification");
const Faculty = mongoose.model("Faculty");
const Department = mongoose.model("Department");


module.exports = {
    Student,
    Admin,
    Course,
    Lecturer,
    Message,
    Notification,
    Faculty,
    Department
}