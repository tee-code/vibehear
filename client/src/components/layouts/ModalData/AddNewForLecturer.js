import React, { Component } from 'react'
import TextInputGroup from '../TextInputGroup'
import { Consumer } from '../../../Context';

export default class AddNewAdmin extends Component {

  
  render() {
    const { addedFailed, addType,isAdded, isLecturer, isStudent, isAdmin } = this.props.data;
    
    return(
        <Consumer>
        {
          (value) => {
            const { departments, faculties, courses, students, lecturers, admins } = value;
            
            return (
              <div className = "container">
                {
                    addedFailed &&
                    (
                      <>
                        <div 
                        className = "p-1 text-white text-center bg-danger"><strong>{isAdded}</strong></div>
                        <br/>
                      </>
                    )
                }
                <form onSubmit = {this.props.onSubmitHandler}>
                  <select 
                      onChange = {this.props.onChangeHandler}
                      name = "addType"
                      className="custom-select" id="inputGroupSelect01">
                          <option>select</option>
                          
                          <option  value="5">Notification</option>
                          

        
                  </select>
                  <br /><br />
                          
                  
                  

                  { addType === "5" ? (
                    <>
                      <TextInputGroup 
                          name = "notificationType"
                          placeholder = "Subject"
                          label = "Subject: "
                          value = {this.props.data.notificationType}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.notificationType}
                      />
                      
                      <TextInputGroup 
                          name = "message"
                          type = "text"
                          placeholder = "Message"
                          label = "Notification Body: "
                          value = {this.props.data.message}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.message}
                      />
                      <select 
                          onChange = {this.props.onChangeHandler}
                          name = "receiver"
                          className="custom-select" id="inputGroupSelect01">
                            <option>select</option>
                            <option value = "ADMINS">Admins</option>
                            <option value = "LECTURERS">Lecturers</option>
                            <option value = "STUDENTS">Students</option>
                            <option value = "ALL_USERS">All</option>

                      </select>
                      <br /> <br />
                      {
                        (!isAdmin && !isStudent && !isLecturer) && (
                          <div></div>
                        )
                      }
                      {
                        (isAdmin && !isLecturer && !isStudent) && (

                        
                        <select 
                            onChange = {this.props.onChangeHandler}
                            name = "AdminAsReceiver"
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
                        }
                      

                      {
                        (isLecturer && !isStudent && !isAdmin) && (
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
                      }
                      
                      
                      {
                        (isStudent && !isAdmin && !isLecturer) && (
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
                      }
                                                  
                    </>                       
                    
                  ): null
                  
                  }
    
                  <button
                                    
                    style = {{ background: "blue", opacity: "0.7" }}
                    
                    className="mt-2 btn btn-block btn-md text-white" type="submit">Add <i className = "fa fa-plus" />
                </button>
                </form>
                
              </div>
            )
          }
        }
      </Consumer>
    )
    
    
  }
}
