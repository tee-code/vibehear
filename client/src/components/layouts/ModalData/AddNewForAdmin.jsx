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
            const { lecturers, departments, faculties, courses,admins, students} = value;
            const levels = [100,200,300,400,500,600,700];
            
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
                          <option value="1">Admin</option>
                          <option  value="2">Course</option>
                          <option  value="5">Notification</option>
                          <option  value="3">Faculty</option>
                          <option  value="4">Department</option>

        
                  </select>
                  <br /><br />
                  { addType === "1" ? (
                    <>
                      <TextInputGroup 
                          name = "email"
                          placeholder = "example@gmail.com"
                          type = "email"
                          label = "Email Address: "
                          value = {this.props.data.email}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.email}
                      />
                      <TextInputGroup 
                        name = "password"
                        placeholder = "secured password"
                        type = "password"
                        label = "Password "
                        value = {this.props.data.password}
                        onChange = {this.props.onChangeHandler}
                        error = {this.props.data.errors.password}
                    />
                    <select 
                      onChange = {this.props.onChangeHandler}
                      name = "role"
                      className="custom-select" id="inputGroupSelect01">
                          <option>select</option>
                          <option value="Admin">Admin</option>
                          <option  value="Super Admin">Super Admin</option>
        
                    </select>
                    </>                       
                    
                  ): null
                  
                  }
        
                  { addType === "2" ? (
                    <>
                      <TextInputGroup 
                          name = "title"
                          placeholder = "Introduction to Computer Science"
                          label = "Course Title: "
                          value = {this.props.data.title}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.title}
                      />
                      <TextInputGroup 
                          name = "code"
                          placeholder = "CSC 101"
                          label = "Course Code: "
                          value = {this.props.data.code}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.code}
                      />
                      <small className = "m-0 p-0">Course Unit</small>
                      <TextInputGroup 
                          name = "unit"
                          type = "number"
                          placeholder = "0"
                          label = "Course Unit: "
                          value = {this.props.data.unit}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.unit}
                          
                      />
                      
                      <select 
                          onChange = {this.props.onChangeHandler}
                          name = "level"
                          className="mb-2 custom-select" 
                          id="inputGroupSelect01"
                          >
                            <option>select level</option>
                            {
                              levels.map((level,index) => {
                                return(
                                      <option key = {index} value={level}>{level}</option>
                                )
                              })
                          }  

                      </select>
                      <select 
                          onChange = {this.props.onChangeHandler}
                          name = "faculty"
                          className="mb-2 custom-select" 
                          id="inputGroupSelect01"
                          >
                            <option>select faculty</option>
                            {
                              faculties.map((faculty,index) => {
                                return(
                                      <option key = {index} value={faculty.faculty}>{faculty.faculty}</option>
                                )
                              })
                          }  

                      </select>
                      
                      <select 
                          onChange = {this.props.onChangeHandler}
                          name = "department"
                          className="mb-2 custom-select" id="inputGroupSelect01">
                            <option>select department</option>
                            {
                              departments.map((department,index) => {
                                return(
                                      <option key = {index} value={department.department}>{department.department}</option>
                                )
                              })
                          }  

                      </select>
                      
                      <select 
                          onChange = {this.props.onChangeHandler}
                          name = "lecturerID"
                          className="mb-2 custom-select" 
                          id="inputGroupSelect01"
                          >
                            <option>select lecturers</option>
                            {

                              lecturers.map((lecturer,index) => {
                                return(
                                      <option key = {index} 
                                     
                                      value={JSON.stringify(lecturer)}>
                                      {
                                        lecturer.firstName.length > 0 || lecturer.lastName.length > 0 ? lecturer.firstName + " " + lecturer.lastName : lecturer.username
                                      }
                                      </option>
                                )
                              })
                          }  

                            

                      </select>
                      
                    </>                       
                    
                  ): null
                  
                  }

                  { addType === "3" ? (
                    <>
                      <TextInputGroup 
                          name = "facultyName"
                          placeholder = "Faculty of Science"
                          label = "Faculty Name: "
                          value = {this.props.data.facultyName}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.facultyName}
                      />
                    </>                       
                    
                  ): null
                  
                  }

                  { addType === "4" ? (
                    <>
                      <TextInputGroup 
                          name = "departmentName"
                          placeholder = "Computer Science"
                          label = "Department Name: "
                          value = {this.props.data.departmentName}
                          onChange = {this.props.onChangeHandler}
                          error = {this.props.data.errors.departmentName}
                      />
                      <select 
                          onChange = {this.props.onChangeHandler}
                          name = "d_faculty"
                          className="custom-select" id="inputGroupSelect01">
                            <option>select faculty</option>
                            {
                              faculties.map((faculty,index) => {
                                return(
                                      <option key = {index} value={faculty.faculty}>{faculty.faculty}</option>
                                )
                              })
                          }  

                      </select>
                    </>                       
                    
                  ): null
                  
                  }

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
