const _ = require('lodash');

const { postUser, 
        getUsers, 
        getUserByID, 
        patchUserByID,
        deleteAllUsers,
        deleteUserByID 
    } = require('../controllers/routes');

const type = "Admin";

//POST a new admin
const postAdmin = (request,response) => {
    const body = ['notifications','addedBy','status','role','firstName','lastName','otherName','email','phoneNumber','username','password'];
    postUser(request,response,body,type);
    
}

//GET all saved admins 
const getAdmins = (request,response) => {
    getUsers(request,response,type);
}

//GET an admin by ID
const getAdminByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH an admin by ID
const patchAdminByID = (request,response) => {
    const data = ['addedBy','role','status','email','username','phoneNumber','firstName','lastName','otherName','password']
    
    const body = _.pick(request.body,data);
    patchUserByID(request,response,body,type);
    
}

//DELETE all admins

const deleteAllAdmins = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE an admin by ID

const deleteAdminByID = (request,response) => {
    deleteUserByID(request,response,type);
}

module.exports = { postAdmin, getAdmins, getAdminByID, patchAdminByID, deleteAdminByID, deleteAllAdmins }