const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID 
} = require('../controllers/routes');

const type = "Department";
//POST Departments
const postDepartment = (request,response) => {
    const body = ['department','faculty','addedBy','dateAdded'];
    postUser(request,response,body,type);
}

//GET all Departments
const getDepartments = (request,response) => {    
    getUsers(request,response,type);
}

//GET a Department by ID
const getDepartmentByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Department by ID
const patchDepartmentByID = (request,response) => {
    const data = ['department','faculty','addedBy','dateAdded'];
    
    const body = _.pick(request.body,data);  
    patchUserByID(request,response,body,type);
    
}

//DELETE all Departments

const deleteAllDepartments = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Department by ID

const deleteDepartmentByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postDepartment, getDepartmentByID, getDepartments, patchDepartmentByID, deleteAllDepartments, deleteDepartmentByID,}