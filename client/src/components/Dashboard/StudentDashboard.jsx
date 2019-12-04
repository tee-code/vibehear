import React, { Component } from "react"; 
import LeftSideBar from "../layouts/LeftSideBar";
import './AdminDashboard.css'
import LoggedInHeader from "../layouts/LoggedInHeader";

class StudentDashboard extends Component {
 

  render() {
      const data = [{
          name: "Manage Courses",
          page: "managecourse"
    },{
        name: "Manage Lectures",
        page: "managematerial"
    },{
        name: "Manage Notifications",
        page: "managenotification"
    },{
        name: "Profile",
        page: "studentprofile"
    }]
    return (
     <>
     <div className="d-flex" id="wrapper">
        <LeftSideBar name = "Student" data = {data}/>
        <div id="page-content-wrapper">
            
            <LoggedInHeader branding = "ibeHear" username = "teecode" />

            <div className="container-fluid">
            
            </div>
        </div> 
    </div>
     </>
    );
  }
}

export default StudentDashboard;