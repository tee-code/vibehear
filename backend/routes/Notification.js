const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID 
} = require('../controllers/routes');

const type = "Notification";
//POST Notifications
const postNotification = (request,response) => {
    const body = ['type','receiverID','message'];
    postUser(request,response,body,type);
}

//GET all Notifications
const getNotifications = (request,response) => {    
    getUsers(request,response,type);
}

//GET a Notification by ID
const getNotificationByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Notification by ID
const patchNotificationByID = (request,response) => {
    const data = ['type','receiverID','message'];    
    const body = _.pick(request.body,data);
    
    patchUserByID(request,response,body,type);
    
}

//DELETE all Notifications

const deleteAllNotifications = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Notification by ID

const deleteNotificationByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postNotification, getNotificationByID, getNotifications, patchNotificationByID, deleteAllNotifications, deleteNotificationByID,}