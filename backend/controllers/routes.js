const { Admin, Student, Lecturer, Course, Notification, Message, Faculty, Department } = require('../bundles/models/models');
const _ = require('lodash');
const { ObjectID } = require('mongodb'); 
const mongoose = require('../db/mongoose');

global["Admin"] = Admin;
global["Student"] = Student;
global["Lecturer"] = Lecturer;
global["Course"] = Course;
global["Notification"] = Notification;
global["Message"] = Message;
global["Faculty"] = Faculty;
global["Department"] = Department;


const authenticate = (req, res, next, type) => {
    const User = global[type];
    var token = req.header('x-auth');
  
    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      req.user = user;
      req.token = token;
      next();
    }).catch((e) => {
        console.log(e);
      res.status(401).send();
    });
};

const logout = (req,res,type) => {
    const user = global[type];
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
      }, () => {
        res.status(400).send();
      });
}

const login = (req,res,body,type) => {
    const data = _.pick(req.body,body);
    const User = global[type];

    User.findByCredentials(data.email,data.password).then((user) => {
       return user.generateAuthToken().then((token) => {
          res.header('x-auth',token).send(user);
       });
    }).catch((e) => {
        
        res.status(400).send();
    })
}

const postUser = (request,response,body,type) => {
    
    const data = _.pick(request.body,body);
    
    let user;

    if(type == "Admin"){
        data.dateAdded = new Date().toString();

        user = new Admin(data);    
    }else if(type == "Faculty"){
        data.dateAdded = new Date().toString();

        user = new Faculty(data);   
    }else if(type == "Department"){
        data.dateAdded = new Date().toString();

        user = new Department(data);   
    }else if(type == "Course"){
        data.dateAdded = new Date().toString();

        user = new Course(data);   
    }else if(type == "Notification"){
        data.dateAdded = new Date().toString();

        user = new Notification(data);   
    }else{
        const User = global[type];

        data.dateJoined = new Date().toString();
        user = new User(data);
    }
    
    user.save().then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        response.header('x-auth',token).send(user)
    })
    .catch((err) => {
        console.log(err);
        response.status(400).send(err);
    })
    
}

getCoursesDetails = async(request,response,type) => {
    
    const User = global[type];
    
    User.find().then((users) => {
        users.forEach((user,index) => {
            
            const _id = user.lecturerID;

            if(!ObjectID.isValid(_id)){
                response.status(404).send();
            }

            const Lecturer = global["Lecturer"];
            
            Lecturer.findById(_id).then((lect) => {
                
                if(!lect){
                    
                    response.status(404).send();
                }else{

                    if(lect.firstName.length == 0 || lect.lastName.length == 0){
                        users[index].lecturer = lect.username;
                    }else{
                        user[index].lecturer = lect.firstName + " " + lect.lastName;
                    }
                }

            }).catch((err) => {
                response.status(400).send(err);
            });
        })
        
        response.send(users);
    }).catch((err) => {
        response.status(400).send(err);
    })
    
}

getUsers = (request,response,type) => {
    
    
    const User = global[type];
    
   
    User.find().then((users) => {
        
        response.send(users);
    }).catch((err) => {
        
        response.status(400).send(err);
    })
}

getMessagesDetail = (request,response,type) => {
    
    
    const User = global["Message"];
    
   
    User.find().then((messages) => {
       
      response.send(messages); 
        
    }).catch((err) => {
        
        response.status(400).send(err);
    })
}


const getUserByID = (request,response,type) => {
    const _id = request.params.id;
    if(!ObjectID.isValid(_id)){
        response.status(404).send();
    }
    
    const User = global[type];

    User.findById(_id).then((user) => {
        if(!user){
            response.status(404).send();
        }
        response.send(user);
    }).catch((err) => {
        response.status(400).send(err);
    });

}

const patchUserByID = (request,response,body,type) => {

    const _id = request.params.id;
    const User = global[type];

    if(!ObjectID.isValid(_id)){
        response.status(404).send();
    }
    
    User.findByIdAndUpdate(_id,
        {
            $set: body
        },
        {
            new: true
        }
    ).then((user) => {
        if(!user){
            response.status(404).send();
        }
        response.send(user);
    }).catch((err) => {
        
        response.status(400).send(err);
    })
}

const deleteUserByID = (request,response,type) => {
    
    const _id = request.params.id;
    const User = global[type];

    if(!ObjectID.isValid(_id)){
        response.status(404).send();
    }

    User.findByIdAndRemove(_id).then((user) => {
        if(!user){
            response.status(404).send();
        }
        response.send(user);
    }).catch((err) => {
        response.status(400).send(err);
    })
}

const deleteAllUsers = (request,response,type) => {
    const User = global[type];

    User.remove({}).then((users) => {
        response.send(users);
    }).catch((err) => {
        response.status(400).send(err);
    })
}

const getUserByToken = (request, response, type) => {
    const token = request.header('x-auth')
    const User = global[type]

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        res.send(user);
    }).catch((e) => {
        res.status(401).send();
    });
}

module.exports = { postUser, getUsers, getUserByID, getUserByToken, patchUserByID, deleteUserByID, deleteAllUsers, login, logout, authenticate, getCoursesDetails, getMessagesDetail }