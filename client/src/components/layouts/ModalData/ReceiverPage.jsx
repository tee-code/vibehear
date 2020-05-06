import React from 'react';
export default function Receiver (props){
    const {isAdmin,isStudent,isLecturer,students,lecturers,admins} = props;
    
    if(isAdmin){
        
      return (
        <select 
          onChange = {this.props.onChangeHandler}
          name = "adminAsReceiver"
          className="custom-select" id="inputGroupSelect01">
            <option>select</option>
            <option value = "ALL_ADMINS">All</option>
            {
              admins.map((admin) => {
                let adminName;
                if(admin.firstName == "" || admin.lastName == ""){
                  adminName = admin.email;
                }else{
                  adminName = admin.firstName + " " + admin.lastName;
                }
                return(<option value = {admin._id}>{adminName}</option>)
              })
            }
            

      </select>
      )
    }else if(isLecturer){
      return(
        <select 
          onChange = {this.props.onChangeHandler}
          name = "LecturerAsReceiver"
          className="custom-select" id="inputGroupSelect01">
            <option>select</option>
            <option value = "ALL_LECTURERS">All</option>
            {
              lecturers.map((lecturer) => {
                let lecturerName;
                if(lecturer.firstName == "" || lecturer.lastName == ""){
                  lecturerName = lecturer.email;
                }else{
                  lecturerName = lecturer.firstName + " " + lecturer.lastName;
                }
                return(<option value = {lecturer._id}>{lecturerName}</option>)
              })
            }
            

      </select>
      )
    }else if(isStudent){
      return (
        <select 
          onChange = {this.props.onChangeHandler}
          name = "StudentAsReceiver"
          className="custom-select" id="inputGroupSelect01">
            <option>select</option>
            <option value = "ALL_STUDENTS">All</option>
            {
              students.map((student) => {
                let studentName;
                if(student.firstName == "" || student.lastName == ""){
                  studentName = student.email;
                }else{
                  studentName = student.firstName + " " + student.lastName;
                }
                return(<option value = {student._id}>{studentName}</option>)
              })
            }
      </select>
      )
    }else{
      return ( <div></div>)
    }
  }