const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID 
} = require('../controllers/routes');

const type = "Faculty";
//POST Courses
const postFaculty = (request,response) => {
    const body = ['faculty','addedBy','dateAdded'];
    postUser(request,response,body,type);
}

//GET all Courses
const getFaculties = (request,response) => {    
    getUsers(request,response,type);
}

//GET a Course by ID
const getFacultyByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Course by ID
const patchFacultyByID = (request,response) => {
    const data = ['faculty','addedBy','dateAdded'];
    
    const body = _.pick(request.body,data);
    
    patchUserByID(request,response,body,type);
    
}

//DELETE all Courses

const deleteAllFaculties = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Course by ID

const deleteFacultyByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postFaculty, getFacultyByID, getFaculties, patchFacultyByID, deleteAllFaculties, deleteFacultyByID,}