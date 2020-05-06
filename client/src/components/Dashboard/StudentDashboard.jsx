import React, { Component } from "react"; 
import LeftSideBar from "../layouts/LeftSideBar";
import './AdminDashboard.css'
import LoggedInHeader from "../layouts/LoggedInHeader";
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Config'
import TableData from "../layouts/TableData/TableData";
import ReactDOM from 'react-dom';
import Loader from "../Loader/Loader";
import TableDataForLecturerManageStudent from "../layouts/TableData/TableDataForLecturerManageStudent";
import TableDataForLecturerManageCourse from "../layouts/TableData/TableDataForLecturerManageCourse";
import AddNewForLecturer from "../layouts/ModalData/AddNewForLecturer";

class StudentDashboard extends Component {
 

    state = {
        numberOfNotification:0,
        fetchedFailed: false,
        addType: "",
        email: "",
        password: "",
        role: "",
        addedBy: JSON.parse(localStorage.getItem('s-token'))['email'],
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
        sender: JSON.parse(localStorage.getItem('s-token'))['_id'],
        message: "",
        senderType: "Lecturers",
        redirectToClass: false,
        isAdmin: false,
        isStudent: false,
        isLecturer: false,
        AdminAsReceiver: "",
        StudentAsReceiver: "",
        LecturerAsReceiver: ""
        
    }

    componentDidMount(){
       
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

    setCurrentMenu = (value) => {
        localStorage.setItem('entity', JSON.stringify({ type: value }));
    }

    clearAlert = () => {
        setTimeout(()=>{
            this.setState({
                fetchedFailed: false
            })
        },5000)
    }
    setData = (label,data) => {
        localStorage.setItem(label,JSON.stringify(data));
    }
      
    getData = (label) => {
        return JSON.parse(localStorage.getItem(label))
      }

    handleView = (e) => {
        e.preventDefault();
        alert('Still working on it')
    }

    componentDidMount(){
        this.manageCourse();
    }
    onSubmitHandler = (e) => {
        
        e.preventDefault();
        
        let { senderType, notificationType, message, sender, receiver,facultyName, departmentName, role, addType, title, unit, code, department, faculty, d_faculty, email, password, addedBy, isStudent, isLecturer, isAdmin, AdminAsReceiver, StudentAsReceiver, LecturerAsReceiver } = this.state;
        
        
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
                addedBy
            }
        }else if(addType === "5"){
            
            user = "notifications"
            let receiverID;

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
                senderID: this.getData('s-token')._id,
                message,
                receiverType: receiver,
                senderType: "STUDENT",
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
            addedBy: JSON.parse(localStorage.getItem('s-token'))['email'],
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

    handleLecture = async (e) => {

        e.preventDefault();
        
        const course = JSON.parse(e.target.id);

        let lecturerID = course.lecturerID;
              
        const res = await axios.get(`${BASE_URL}/lecturers/${lecturerID}`)
        
        if(res.data.firstName.length > 0 || res.data.lastName.length > 0){
            course.lecturerName = res.data.firstName + " " + res.data.lastName; 
        }else{
            course.lecturerName = res.data.email; 
        }
        
        localStorage.setItem('currentLecture', JSON.stringify(course));
        this.setState({ redirectToClass: true });
        
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
          console.log(res);
          
          this.setState({addedFailed: true, isAdded: "Added Successfully!!!"})
          this.clearAlertForAdd();

      } catch (error) {
          console.log(error)
          this.setState({ addedFailed: true, isAdded: "Gosh! Unable to add." })
          this.clearAlertForAdd();
      }
      
    }

    clearAlert = () => {
        setTimeout(()=>{
            this.setState({
                fetchedFailed: false
            })
        },5000)
    }
    
manageLecture = () => {
    alert('here')
}

manageProfile = () => {
    alert('here')
}

manageCourse = async () => {

    try {
        window.document.querySelector("#loader").style.display = "block";
        const res = await axios.get(`${BASE_URL}/courses`)

        const response = res.data.filter((data) => {
            return data.department === JSON.parse(localStorage.getItem('s-token')).department;
        })


        const theads = ['Title', 'Unit', 'Code','Department','Faculty','Actions']
        const indexes = ['title','unit','code','department','faculty']
        ReactDOM.render(<TableDataForLecturerManageCourse indexes = {indexes} theads = {theads} handleLecture = {this.handleLecture} data = {response} />, document.getElementById('student'));
        this.setCurrentMenu("courses");
        window.document.querySelector("#loader").style.display = "none";
        
    } catch (e) {
        this.setState({ fetchedFailed: true, errorMessage: "Unable to fetch data" })
        window.document.querySelector("#loader").style.display = "none";
        this.clearAlert();
    }
  }


manageNotification = async () => {
    window.document.querySelector("#loader").style.display = "block";
    let token = this.getData('s-token');
    let identity = token._id;
    let response;
    
    try {
        const res = await axios.get(`${BASE_URL}/notifications`)
        response = res.data.filter((data) => {
            return data.senderID === identity || data.receiverID === identity || data.receiverID == "ALL_STUDENTS";
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


    this.setState({ numberOfNotification: unreadNotifications.length});

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
        
        ReactDOM.render(<TableData indexes = {indexes} theads = {theads} data = {response} />, document.getElementById('student'))
        this.setCurrentMenu("notifications");
        window.document.querySelector("#loader").style.display = "none";
    }, 1000);

    
    
  }
  render() {
      const data = [{
          name: "Manage Courses",
          page: "managecourse",
          action: this.manageCourse
    },{
        name: "Manage Lectures",
        page: "managematerial",
        action: this.manageLecture
    },{
        name: "Manage Notifications",
        page: "managenotification",
        action: this.manageNotification
    },{
        name: "Profile",
        page: "studentprofile",
        action: this.manageProfile
    }]

    if(!localStorage.getItem('s-token')){
        return (<Redirect to = "/login" />);
    }

    if(this.state.redirectToClass){
        return (<Redirect to = "/lecture" />);
    }


    return (
     <>
     <div className="d-flex" id="wrapper">
         <Loader />
        <LeftSideBar name = "Student" data = {data}/>
        <li onClick = {this.manageNotification} className = "notification nav-item">
            <i className = "fa fa-bell m-2 p-2" />
            <span>{this.state.numberOfNotification}</span>
        </li>
        <div id="page-content-wrapper">
            
            <LoggedInHeader branding = "ibeHear" username = "teecode" />
            <Link to = "/lecture">
            <button className = "classroom btn btn-md btn-danger">Classroom <i className = "fa fa-arrow-right" /></button>
            </Link>
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
                            <AddNewForLecturer 
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
            <div id = "student" className="container-fluid">
            
            </div>
           

            <button className = "addNew btn btn-md btn-primary m-2" data-toggle="modal" data-target="#myModal"><i className = "fa fa-plus" /></button>
        </div> 
    </div>
     </>
    );
  }
}

export default StudentDashboard;