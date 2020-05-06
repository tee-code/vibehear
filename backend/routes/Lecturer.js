const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID 
} = require('../controllers/routes');

const type = "Lecturer";
//POST lecturers
const postLecturer = (request,response) => {
    const body = ['firstName','lastName','otherName','email','username','password','phoneNumber','department','faculty'];
    postUser(request,response,body,type);
}

//GET all lecturers
const getLecturers = (request,response) => {    
    getUsers(request,response,type);
}

//GET a Lecturer by ID
const getLecturerByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Lecturer by ID
const patchLecturerByID = (request,response) => {
    const data = ['firstName','lastName','otherName','email','username','password','phoneNumber','department','faculty'];
    
    const body = _.pick(request.body,data);
    
    patchUserByID(request,response,body,type);
    
}

//DELETE all Lecturers

const deleteAllLecturers = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Lecturer by ID

const deleteLecturerByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postLecturer, getLecturerByID, getLecturers, patchLecturerByID, deleteAllLecturers, deleteLecturerByID,}