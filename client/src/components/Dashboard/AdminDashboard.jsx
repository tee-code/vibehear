import React, { Component } from "react"; 
import LeftSideBar from "../layouts/LeftSideBar";
import './AdminDashboard.css'
import LoggedInHeader from "../layouts/LoggedInHeader";

class AdminDashboard extends Component {
 

  render() {
      const data = [{
          name: "Manage Admins",
          page: "manageadmin"
      },
      {
        name: "Manage Students",
        page: "managestudent"
    },{
        name: "Manage Lecturers",
        page: "managelecturer"
    },{
        name: "Manage Courses",
        page: "managecourse"
    },{
        name: "Manage Admins",
        page: "manageadmin"
    },{
        name: "Manage Lectures",
        page: "managematerial"
    },{
        name: "Manage Notifications",
        page: "managenotification"
    }]
    return (
     <>
     <div className="d-flex" id="wrapper">
        <LeftSideBar name = "Admin" data = {data}/>
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

export default AdminDashboard;