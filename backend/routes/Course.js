const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID,
    getCoursesDetails
} = require('../controllers/routes');

const type = "Course";
//POST Courses
const postCourse = (request,response) => {
    const body = ['lecturerID','level','title','unit','code','department','faculty','dateAdded','addedBy','lecturer'];
    postUser(request,response,body,type);
}

//GET all Courses
const getCoursesWithLecturerDetails = (request,response) => {    
    getCoursesDetails(request,response,type);
}

//GET all Courses with lecturer details
const getCourses = (request,response) => {    
    getUsers(request,response,type);
}

//GET a Course by ID
const getCourseByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Course by ID
const patchCourseByID = (request,response) => {
    const data = ['title','unit','code','department','faculty','lecturerID'];
    
    const body = _.pick(request.body,data);
    
    patchUserByID(request,response,body,type);
    
}

//DELETE all Courses

const deleteAllCourses = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Course by ID

const deleteCourseByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postCourse, getCourseByID, getCourses, patchCourseByID, deleteAllCourses, deleteCourseByID, getCoursesWithLecturerDetails}