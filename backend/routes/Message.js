const _ = require('lodash');
const { 
    postUser, 
    getUsers, 
    getMessagesDetail,
    getUserByID, 
    patchUserByID,
    deleteAllUsers,
    deleteUserByID 
} = require('../controllers/routes');

const type = "Message";
//POST Messages
const postMessage = (request,response) => {
    const body = ['senderID','receiverID','message','sender','senderType'];
    postUser(request,response,body,type);
}

//GET all Messages
const getMessages = (request,response) => {    
    getMessagesDetail(request,response,type);
}

//GET a Message by ID
const getMessageByID = (request,response) => {
    getUserByID(request,response,type);
}

// PATCH a Message by ID
const patchMessageByID = (request,response) => {
    const data = ['senderID','receiverID','message'];    
    const body = _.pick(request.body,data);
    
    patchUserByID(request,response,body,type);
    
}

//DELETE all Messages

const deleteAllMessages = (request,response) => {
    deleteAllUsers(request,response,type);
}

//DELETE a Message by ID

const deleteMessageByID = (request,response) => {
    deleteUserByID(request,response,type);
}







module.exports = { postMessage, getMessageByID, getMessages, patchMessageByID, deleteAllMessages, deleteMessageByID,}