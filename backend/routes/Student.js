const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID,
    login
} = require('../controllers/routes');

const type = "Student";


//POST students
const postStudent = (request,response) => {
    const body = ['firstName','lastName','otherName','email','password','phoneNumber','matricNumber','department','faculty','level'];
    postUser(request,response,body,type);
}

//GET all students
const getStudents = (request,response) => {    
    getUsers(request,response,type);
}

//GET a Student by ID
const getStudentByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Student by ID
const patchStudentByID = (request,response) => {
    const data = ['firstName','lastName','otherName','email','password','phoneNumber','matricNumber','department','faculty','level'];
    
    const body = _.pick(request.body,data);
    
    patchUserByID(request,response,body,type);
    
}

//DELETE all Students

const deleteAllStudents = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Student by ID

const deleteStudentByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postStudent, getStudentByID, getStudents, patchStudentByID, deleteAllStudents, deleteStudentByID,}