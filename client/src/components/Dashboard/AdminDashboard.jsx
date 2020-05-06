import React, { Component } from "react"; 
import LeftSideBar from "../layouts/LeftSideBar";
import './AdminDashboard.css'
import LoggedInHeader from "../layouts/LoggedInHeader";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Config'
import TableData from "../layouts/TableData/TableData";
import ReactDOM from 'react-dom';
import AddNewForAdmin from "../layouts/ModalData/AddNewForAdmin";
import Footer from '../layouts/Footer';
import Loader from "../Loader/Loader";

class AdminDashboard extends Component {

    state = {
        fetchedFailed: false,
        addType: "",
        email: "",
        password: "",
        role: "",
        addedBy: JSON.parse(localStorage.getItem('a-token'))['_id'],
        addedFailed: false,
        isAdded: "",
        errors: {},
        title: "",
        level: 0,
        code: "",
        unit: 0,
        faculty: "",
        facultyName: "",
        departmentName: "",
        d_faculty: "",
        department: "",
        notificationType: "",
        receiver: "",
        sender: JSON.parse(localStorage.getItem('a-token'))['email'],
        message: "",
        lecturerID: "",
        lecturer: "",
        senderType: "Admins",
        action: "",
        currentMenu: JSON.parse(localStorage.getItem('entity'))['email'],
        currentData: {}
    
      }
     
    getCurrentMenuFunction = (type) => {
        switch(type){
            case "admins":
                this.manageAdmin()
                break;
            case "students":
                this.manageStudent()
                break;
            case "lecturers":
                this.manageLecturer()
                break;
            case "courses":
                this.manageCourse()
                break;
            case "faculties":
                this.manageFaculty()
                break;
            case "departments":
                this.manageDepartment()
                break;
            case "notifications":
                this.manageNotification()
                break;
            case "lectures":
                this.manageLecture()
                break;
            default:
                return;
                
        }
    }

    getCurrentMenu = () => {
        return JSON.parse(localStorage.getItem('entity')).type;
    }
    onDeleteHandler = (e) => {
        e.preventDefault();
        
        this.setState({ action: "DELETE", currentData: JSON.parse(e.target.id) })
        this.getCurrentMenuFunction(this.getCurrentMenu());
    }

    onViewHandler = (e) => {
        e.preventDefault();
        this.setState({ action: "VIEW", currentData: JSON.parse(e.target.id) })
        this.getCurrentMenuFunction(this.getCurrentMenu());
        
    }
    onEditHandler = (e) => {
        e.preventDefault();
        
        this.setState({ action: "EDIT", currentData: JSON.parse(e.target.id) })
        this.getCurrentMenuFunction(this.getCurrentMenu());
    }
      
    onSubmitHandler = (e) => {
    
        e.preventDefault();
        
        let { senderType, notificationType, message, sender, receiver,facultyName, departmentName, role, addType, title, unit, level, code, department, faculty, d_faculty, email, password, addedBy, isStudent, isLecturer, isAdmin, AdminAsReceiver, StudentAsReceiver, LecturerAsReceiver, lecturerID } = this.state;
        
        
        //check for empty fields
    
        if(addType === ''){
            
            this.setState({
                errors: {
                    addType: "AddType is required!!!"
                }
            })
            
            return;
        }
    
        if(password === '' && addType === '1'){
            this.setState({
                errors: {
                    password: "Password is required!!!"
                }
            })
            
            return;
        }
    
        if(role === '' && addType === '1'){
            this.setState({
                errors: {
                    role: "Password is required!!!"
                }
            })
            
            return;
        }
    
        if(email === '' && addType === "1"){
            this.setState({
                errors: {
                    email: "Email is required!!!"
                }
            })
            
            return;
        }
    
        if(title === '' && addType === "2"){
            this.setState({
                errors: {
                    title: "Title is required!!!"
                }
            })
            
            return;
        }
    
        if(code === '' && addType === "2"){
            this.setState({
                errors: {
                    code: "Code is required!!!"
                }
            })
            
            return;
        }

        if(level === '' || level == 0 && addType === "2"){
            this.setState({
                errors: {
                    level: "Level is required!!!"
                }
            })
            
            return;
        }
    
        if(unit === '' && addType === "2"){
            this.setState({
                errors: {
                    unit: "Unit is required!!!"
                }
            })
            
            return;
        }
    
        if(department === '' && addType === "2"){
            this.setState({
                errors: {
                    department: "Department is required!!!"
                }
            })
            
            return;
        }
    
        if(faculty === '' && addType === "2"){
            this.setState({
                errors: {
                    faculty: "Faculty is required!!!"
                }
            })
            
            return;
        }
    
        if(facultyName === '' && addType === "3"){
            this.setState({
                errors: {
                    facultyName: "Faculty Name is required!!!"
                }
            })
            
            return;
        }
        
        if(departmentName === '' && addType === "4"){
            this.setState({
                errors: {
                    departmentName: "DepartmentName is required!!!"
                }
            })
            
            return;
        }
    
        if(d_faculty === '' && addType === "4"){
            this.setState({
                errors: {
                    d_faculty: "Department's Faculty is required!!!"
                }
            })
            
            return;
        }
    
        if(notificationType === '' && addType === "5"){
            this.setState({
                errors: {
                    notificationType: "NotificationType is required!!!"
                }
            })
            
            return;
        }
    
        if(message === '' && addType === "5"){
            this.setState({
                errors: {
                    message: "Message is required!!!"
                }
            })
            
            return;
        }
    
        if(receiver === '' && addType === "5"){
            this.setState({
                errors: {
                    receiver: "Receiver is required!!!"
                }
            })
            
            return;
        }
    
    
        //check for the user type
        
        let user;
        let bodyMessage;
    
        if(addType === "1"){
            user = "admins"
            bodyMessage = {
                email,
                password,
                role,
                addedBy
            }
        }else if(addType === "2"){
            user = "courses"
            bodyMessage = {
                title,
                unit,
                code,
                department,
                faculty,
                level: Number(level),
                lecturerID,
                addedBy
            }
        }else if(addType === "5"){
            
            user = "notifications"
            let receiverID;
    
            console.log(receiver, " receiver ", isAdmin, isLecturer, isStudent);
            if(receiver !== "ALL_USERS"){
                
                if(isAdmin){
                    
                    if(AdminAsReceiver === "ALL_ADMINS"){
                        
                        receiverID = "ALL_ADMINS";
                        
                    }else{
                        
                        receiverID = AdminAsReceiver;
                    }
                }else if(isStudent){
                    if(StudentAsReceiver === "ALL_STUDENTS"){
                        receiverID = "ALL_STUDENTS";
                    }else{
                        receiverID = StudentAsReceiver;
                    }
                }else if(isLecturer){
                    console.log(' am here ', LecturerAsReceiver)
                    if(LecturerAsReceiver === "ALL_LECTURERS"){
                        receiverID = "ALL_LECTURERS";
                    }else{
                        receiverID = LecturerAsReceiver;
                    }
                }
            }else{
                receiverID = "ALL_USERS";
            }
    
            bodyMessage = {
                type: notificationType,
                receiverID: receiverID,
                senderID: this.getData('a-token')._id,
                message,
                receiverType: receiver,
                senderType: "ADMIN",
                status: 0
            }
    
        }else if(addType === "3"){
            
            user = "faculties"
            bodyMessage = {
                faculty: facultyName,
                addedBy,
            }
        }else if(addType === "4"){
            
            user = "departments"
            bodyMessage = {
                department: departmentName,
                faculty: d_faculty,
                addedBy
            }
        }
        
        
        this.addNew(user, bodyMessage)
        
        
        //clear state
        this.setState({
            fetchedFailed: false,
            addType: "",
            email: "",
            password: "",
            role: "",
            addedBy: JSON.parse(localStorage.getItem('a-token'))['email'],
            addedFailed: false,
            isAdded: "",
            errors: {},
            title: "",
            code: "",
            unit: 0,
            faculty: "",
            facultyName: "",
            departmentName: "",
            d_faculty: "",
            department: "",
            notificationType: "",
            receiver: "",
            sender: "",
            message: "",
            isAdmin: false,
            isLecturer: false,
            isStudent: false,
            AdminAsReceiver: "",
            StudentAsReceiver: "",
            LecturerAsReceiver: ""
        
            });   
    }

    setData = (label,data) => {
        localStorage.setItem(label,JSON.stringify(data));
    }
        
    getData = (label) => {
        return JSON.parse(localStorage.getItem(label))
    }

    setCurrentMenu = (value) => {
        localStorage.setItem('entity', JSON.stringify({ type: value }));
    }

    onChangeHandler = (e) => {
    
        
        this.setState({ [e.target.name]: e.target.value})
        if(e.target.value == "ADMINS"){
            
            this.setState({ isAdmin: true, isLecturer: false, isStudent: false })
        }
    
        if(e.target.value == "STUDENTS"){
            this.setState({ isStudent: true, isLecturer: false, isAdmin: false })
        }
    
        if(e.target.value == "LECTURERS"){
            this.setState({ isLecturer: true, isAdmin:false, isStudent: false })
        }
    
        if(e.target.value === "ALL_USERS"){
            this.setState({ isLecturer: false, isAdmin:false, isStudent: false })
        }
    
      
    }
    
    startLoading = () => {
        window.document.querySelector("#loader").style.display = "block";
    }
    stopLoading = () => {
        window.document.querySelector("#loader").style.display = "none";
    }

    clearAlertForAdd = () => {
        setTimeout(()=>{
            this.setState({
                addedFailed: false
            })
        },5000)
    }

    addNew = async (user,bodyMessage) => {
        
        
        try {
            const res = await axios.post(`${BASE_URL}/${user}`, bodyMessage)
            
            window.document.querySelector("#loader").style.display = "none";
            this.setState({addedFailed: true, isAdded: "Added Successfully!!!"})
            this.getCurrentMenuFunction(user);
            this.clearAlertForAdd();
            
        } catch (error) {
            console.log(error)
            window.document.querySelector("#loader").style.display = "none";
            this.setState({ addedFailed: true, isAdded: "Gosh! Unable to add." })
            this.clearAlertForAdd();
        }
        
    }

    componentDidMount(){
        
        //const entity = JSON.parse(localStorage.getItem('entity')).type;
        
        
            if(localStorage.getItem('entity')){
                if(JSON.parse(localStorage.getItem('entity')).type === "admins"){
                    this.manageAdmin();
                }else if(JSON.parse(localStorage.getItem('entity')).type === "lecturers"){
                    this.manageLecturer();
                }else if(JSON.parse(localStorage.getItem('entity')).type === "students"){
                    this.manageStudent();
                }else if(JSON.parse(localStorage.getItem('entity')).type === "faculties"){
                    this.manageFaculty();
                }else if(JSON.parse(localStorage.getItem('entity')).type === "departments"){
                    this.manageDepartment();
                }else if(JSON.parse(localStorage.getItem('entity')).type === "courses"){
                    this.manageCourse();
                }else if(JSON.parse(localStorage.getItem('entity')).type === "notifications"){
                    this.manageNotification();
                }
            }    
    }

    clearAlert = () => {
        setTimeout(()=>{
            this.setState({
                fetchedFailed: false
            })
        },5000)
    }

    manageAdmin = async () => {
        
        try {
            const res = await axios.get(`${BASE_URL}/admins`)
            window.document.querySelector("#loader").style.display = "none";
            const theads = ['First Name', 'Last Name', 'Email', 'Username','Role','Actions']
            const indexes = ['firstName','lastName','email','username','role']
            ReactDOM.render(<TableData indexes = {indexes} theads = {theads} 
                data = {res.data} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state}/>, document.getElementById('admin'))
            this.setCurrentMenu("admins")
        } catch (e) {
            this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
            this.clearAlert();
        }  

    }

  manageStudent = async () => {
    window.document.querySelector("#loader").style.display = "block";
      try {
            const res = await axios.get(`${BASE_URL}/students`)
            window.document.querySelector("#loader").style.display = "none";
            const theads = ['First Name', 'Last Name', 'Email', 'Matric Number','Department','Actions']
            const indexes = ['firstName','lastName','email','matricNumber','department']
            ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {res.data} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state} />, document.getElementById('admin'))
            this.setCurrentMenu("students")
            
        } catch (e) {
            this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
            this.clearAlert();
        }
  }

  manageLecture = () => {
      alert('Am still working on it.')
  }

  manageCourse = async () => {
    window.document.querySelector("#loader").style.display = "block";
    try {
        const response = await axios.get(`${BASE_URL}/courses`)
        window.document.querySelector("#loader").style.display = "none";
        
        response.data.forEach((data) => {
            if(data.lecturerID){
                const resultJSON = JSON.parse(data.lecturerID);

                if(resultJSON.firstName == "" && resultJSON.lastName == ""){
                    data.lecturerName = resultJSON.username;
                }else{
                    data.lecturerName = resultJSON.firstName + " " + resultJSON.lastName;
                }
                 
            }
        })
        
        

        setTimeout(() => {
            const theads = ['Title', 'Unit', 'Level','Code','Department','Faculty','Lecturer','Actions'];
            const indexes = ['title','unit','level','code','department','faculty','lecturerName'];
            ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {response.data} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state} />, document.getElementById('admin'))
        this.setCurrentMenu("courses")
        }, 2000);

        
        
        
        
        
    } catch (e) {
        console.log(e);
        this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
        this.clearAlert();
    }
  }

  manageLecturer = async () => {
    window.document.querySelector("#loader").style.display = "block";
    try {
        const res = await axios.get(`${BASE_URL}/lecturers`)
        window.document.querySelector("#loader").style.display = "none";
        const theads = ['First Name', 'Last Name', 'Email', 'Username','Department','Actions']
        const indexes = ['firstName','lastName','email','username','department']
        ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {res.data} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state} />, document.getElementById('admin'))
        this.setCurrentMenu("lecturers")
        
    } catch (e) {
        this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
        this.clearAlert();
    }
  }

  manageNotification = async () => {
    window.document.querySelector("#loader").style.display = "block";
    let token = this.getData('a-token');
    let identity = token._id;
    let response;
    
    try {
        const res = await axios.get(`${BASE_URL}/notifications`)
        response = res.data.filter((data) => {
            return data.senderID === identity || data.receiverID === identity || data.receiverID == "ALL_ADMINS";
        });

               
    } catch (e) {
        this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
        this.clearAlert();
    }

    //change status from 0 to unread and 1 to read
    response.forEach((data) => {
        if(data.status == 0){
            data.status = "unread";
        }else{
            data.status = "read";
        }
    })

    // number of unread messages
    const unreadNotifications = response.filter((data) => {
        return data.status == "unread";
    })


    this.setState({ numberOfNotification: unreadNotifications.length });

    response.forEach(async (data, index) => {
        
        if(data.senderID === identity){
            data.senderName = "you";
            data.status = "sent";
        }else{
            try{
                let userType;
                if(data.senderType === "LECTURER"){
                    userType = "lecturers";
                }else if(data.senderType === "STUDENT"){
                    userType = "students"
                }else if(data.senderType === "ADMIN"){
                    userType = "admins"
                }

                const res = await axios.get(`${BASE_URL}/${userType}/${data.senderID}`)
                
                const token = res.data;
                
                
                let identity; 

                if(token.firstName == "" || token.lastName == ""){
                    identity = token.email;
                }else{
                    identity = token.firstName + " " + token.lastName;
                }
            
                response[index].senderName = identity;
                
                
            }catch(e){
                console.log(e);
            }
        }
        
        if(data.receiverID === identity){
            data.receiverName = "you";
        }else{
            
            if(data.receiverType !== "ALL_USERS"){
                
                try{
                    let userType = null;
                    if(data.receiverType === "LECTURERS"){
                        if(data.receiverID !== "ALL_LECTURERS"){
                            userType = "lecturers";
                        }
                        
                    }else if(data.receiverType === "STUDENTS"){
                        if(data.receiverID !== "ALL_STUDENTS"){
                            userType = "students";
                        }
                    }else if(data.receiverType === "ADMINS"){
                        if(data.receiverID !== "ALL_ADMINS"){
                            userType = "admins";
                        }
                    }

                    let identity; 

                    if(userType){
                        const res = await axios.get(`${BASE_URL}/${userType}/${data.receiverID}`)
                    
                        const token = res.data;
                        
                        

                        if(token.firstName == "" || token.lastName == ""){
                            identity = token.email;
                        }else{
                            identity = token.firstName + " " + token.lastName;
                        }
                    }else{
                        identity = data.receiverID;
                    }
                    
                
                    response[index].receiverName = identity;
                    
                    
                }catch(e){
                    console.log(e);
                }

            }

        }
    })


    setTimeout(() => {
        const theads = ['Subject', 'Receiver', 'Sender', 'Status','Date/Time','Actions']
        const indexes = ['type','receiverName','senderName','status','dateAdded']
        
        ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {response} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state} />, document.getElementById('admin'));
        this.setCurrentMenu("notifications");
        window.document.querySelector("#loader").style.display = "none";
    }, 1000);

    
    
  }

  getAdminName = (res) => {
    res.forEach(async (data) => {
        try {
            const response = await axios.get(`${BASE_URL}/admins/${data.addedBy}`)
            
            if(response.data.firstName === "" || response.data.lastName === ""){
                data.addedByName = response.data.email;
            }else{
                data.addedByName = response.data.firstName + " " + response.data.lastName;
            }

        } catch (error) {
            console.log(error);
        }
    })
  }

  manageFaculty = async () => {
    window.document.querySelector("#loader").style.display = "block";
    try {
        const res = await axios.get(`${BASE_URL}/faculties`)
        window.document.querySelector("#loader").style.display = "none";

        this.getAdminName(res.data);

        setTimeout(() => {
            const theads = ['Faculty Name', 'AddedBy', 'DateAdded','Actions']
            const indexes = ['faculty','addedByName','dateAdded']
            ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {res.data} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state} />, document.getElementById('admin'))
            this.setCurrentMenu("faculties")
        }, 1000);

        
        
    } catch (e) {
        this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
        this.clearAlert();
    }
  }

  manageDepartment = async () => {
    window.document.querySelector("#loader").style.display = "block";
    try {
        const res = await axios.get(`${BASE_URL}/departments`)
        window.document.querySelector("#loader").style.display = "none";

        this.getAdminName(res.data);

        setTimeout(() => {
            const theads = ['Department Name', 'Faculty Name','AddedBy', 'DateAdded','Actions']
            const indexes = ['department','faculty','addedByName','dateAdded']
            ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {res.data} onViewHandler = {this.onViewHandler} onEditHandler = {this.onEditHandler} onDeleteHandler = {this.onDeleteHandler} state = {this.state} />, document.getElementById('admin'))
            this.setCurrentMenu("departments")
        }, 1000);

        
        
    } catch (e) {
        this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
        this.clearAlert();
    }
  }

  render() {
      const data = [{
          name: "Manage Admins",
          page: "manageadmin",
          action: this.manageAdmin
      },
      {
        name: "Manage Students",
        page: "managestudent",
        action: this.manageStudent
    },{
        name: "Manage Lecturers",
        page: "managelecturer",
        action: this.manageLecturer
    },{
        name: "Manage Faculties",
        page: "managefaculty",
        action: this.manageFaculty
    },{
        name: "Manage Departments",
        page: "managedepartment",
        action: this.manageDepartment
    },{
        name: "Manage Courses",
        page: "managecourse",
        action: this.manageCourse
    },{
        name: "Manage Lectures",
        page: "managelecture",
        action: this.manageLecture
    },{
        name: "Manage Notifications",
        page: "managenotification",
        action: this.manageNotification
    }]

    if(!localStorage.getItem('a-token')){
        return (<Redirect to = "/login" />);
    }

    
    return (

     <> 
        <div className="d-flex" id="wrapper">
            
            <LeftSideBar name = "Admin" data = {data}/>
            <li onClick = {this.manageNotification} className = "notification nav-item">
                <i className = "fa fa-bell m-2 p-2" />
                <span>{this.state.numberOfNotification}</span>
            </li>
            <Loader />
            <div id="page-content-wrapper">
                
                <LoggedInHeader branding = "ibeHear" username = "teecode" />
                
                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Entity</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <AddNewForAdmin 
                                onSubmitHandler = {this.onSubmitHandler}
                                onChangeHandler = {this.onChangeHandler}
                                data = {this.state}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-block btn-danger" data-dismiss="modal">Close</button>
                            
                        </div>
                    </div>
                </div>
                </div>
                <div id = "admin" className="container-fluid">
                    
                </div>

                <button className = "addNew btn btn-md btn-primary m-2" data-toggle="modal" data-target="#myModal"><i className = "fa fa-plus" /></button>
            </div> 
        </div>
        <Footer />
     </>
    );
  }
}

export default AdminDashboard;