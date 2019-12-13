const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { login, logout, authenticate } = require('./controllers/routes');

const { 
    postAdmin, 
    getAdmins, 
    getAdminByID, 
    patchAdminByID, 
    deleteAdminByID, 
    deleteAllAdmins } = require('./routes/Admin');

const { 
    postStudent, 
    getStudentByID, 
    getStudents, 
    patchStudentByID, 
    deleteAllStudents, 
    deleteStudentByID } = require('./routes/Student');

const { 
    postLecturer, 
    getLecturerByID, 
    getLecturers, 
    patchLecturerByID, 
    deleteAllLecturers, 
    deleteLecturerByID } = require('./routes/Lecturer');

const { 
    postCourse, 
    getCourseByID, 
    getCourses, 
    patchCourseByID, 
    deleteAllCourses, 
    deleteCourseByID } = require('./routes/Course');

const { 
    postMessage, 
    getMessageByID, 
    getMessages, 
    patchMessageByID, 
    deleteAllMessages, 
    deleteMessageByID } = require('./routes/Message');

const { 
    postNotification, 
    getNotificationByID, 
    getNotifications, 
    patchNotificationByID, 
    deleteAllNotifications, 
    deleteNotificationByID } = require('./routes/Notification');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(express.static(path.join(__dirname, "../client/build")));
/*React root*/
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

app.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    });
    app.options("*", cors());


//LOGIN user
app.post('/login/:user', (request,response) => {
    
    const body = ['email','password'];
    const type = request.params.user;
    login(request,response,body,type);

})

//LOGOUT token

app.delete('/:user/me/token', (request, response, next) => {
    const type = request.params.user;
    authenticate(request,response,next,type);
    logout(request, response, type);
});

//Admin Routes
app.post('/admins', postAdmin);
app.get('/admins', getAdmins);
app.get('/admins/:id',getAdminByID);
app.patch('/admins/:id', patchAdminByID);
app.delete('/admins',deleteAllAdmins);
app.delete('/admins/:id',deleteAdminByID);


//Student Routes
app.post('/students', postStudent);
app.get('/students',getStudents);
app.get('/students/:id',getStudentByID);
app.patch('/students/:id',patchStudentByID);
app.delete('/students', deleteAllStudents);
app.delete('/students/:id',deleteStudentByID);

//Lecturer Routes
app.post('/lecturers', postLecturer);
app.get('/lecturers',getLecturers);
app.get('/lecturers/:id',getLecturerByID);
app.patch('/lecturers/:id',patchLecturerByID);
app.delete('/lecturers', deleteAllLecturers);
app.delete('/lecturers/:id',deleteLecturerByID);

//Course Routes
app.post('/courses', postCourse);
app.get('/courses',getCourses);
app.get('/courses/:id',getCourseByID);
app.patch('/courses/:id',patchCourseByID);
app.delete('/courses', deleteAllCourses);
app.delete('/courses/:id',deleteCourseByID);

//Message Routes
app.post('/messages', postMessage);
app.get('/messages',getMessages);
app.get('/messages/:id',getMessageByID);
app.patch('/messages/:id',patchMessageByID);
app.delete('/messages', deleteAllMessages);
app.delete('/messages/:id',deleteMessageByID);

//Notification Routes
app.post('/notifications', postNotification);
app.get('/notifications',getNotifications);
app.get('/notifications/:id',getNotificationByID);
app.patch('/notifications/:id',patchNotificationByID);
app.delete('/notifications', deleteAllNotifications);
app.delete('/notifications/:id',deleteNotificationByID);


const PORT = 4000;

app.listen(PORT, () =>{
    console.log(`Connected successfully on port: ${PORT}`)
})