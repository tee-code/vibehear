import React, { Component } from "react"; 
import LeftSideBar from "../layouts/LeftSideBar";
import './AdminDashboard.css'
import LoggedInHeader from "../layouts/LoggedInHeader";

class LecturerDashboard extends Component {
 

  render() {
      const data = [
      {
        name: "Manage Students",
        page: "managestudent"
    },{
        name: "Manage Courses",
        page: "managecourse"
    },{
        name: "Manage Lectures",
        page: "managelecture"
    },{
        name: "Manage Notifications",
        page: "managenotification"
    },{
        name: "Profile",
        page: "lecturerprofile"
    }]
    return (
     <>
     <div className="d-flex" id="wrapper">
        <LeftSideBar name = "Lecturer" data = {data}/>
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

export default LecturerDashboard;