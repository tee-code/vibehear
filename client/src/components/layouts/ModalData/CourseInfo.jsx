import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../Config';
import uuid4 from 'uuid/v4'
import Request from '../../../Request/Request'

export default class CourseInfo extends Component {

    state = {
        _id: "",
        addedByName: "",
        addedBy: this.props.data.addedBy,
        faculty: "",
        department: "",
        faculties: [{}],
        departments: [{}],
        levels:[100,200,300,400,500,600,700],
        code: "",
        title: "",
        level: "",
        unit: "",
        lecturerName: "",
        edited: false,
        notEdited: false,
        errorMessage: ""

    }


    componentDidMount(){

        this.fetchAllFalcuties();
        this.fetchAllDepartments();
        
    }
    
    fetchAllFalcuties = async () => {

        const request = new Request('faculties');
        const res = await request.get();
        
        this.setState({ faculties: JSON.parse(res) })
        
    }

    fetchAllDepartments = async () => {

        const request = new Request('departments');
        const res = await request.get();
        
        this.setState({ departments: JSON.parse(res) })
        
    }

    onChangeHandler = (e) => {
        
        this.setState({ [e.target.name]: e.target.value});
    }

    clearAlert = () => {
        setInterval(() => {
            this.setState( {edited: false, notEdited: false} )
        }, 3000)
    }

    onSubmitHandler = (e) => {

        e.preventDefault();
        const _id = e.target.id;

        const data = {

            addedByName: this.refs.form.addedByName.value,
            addedBy: this.props.data.addedBy,
            faculty: this.refs.form.faculty.value,
            department: this.refs.form.department.value,
            title: this.refs.form.title.value,
            unit: this.refs.form.unit.value,
            code: this.refs.form.code.value,
            level: this.refs.form.level.value,
            lecturerName: this.refs.form.lecturerName.value,
            
        }

        axios.patch(`${BASE_URL}/courses/${_id}`, data)
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                this.setState({ currentEditedData: data, edited: true })
                
                this.clearAlert();
            })
            .catch((e) => {
                console.log('error: ',e);
                this.setState({ notEdited: true, errorMessage: e.message })
                this.clearAlert();
            })
        
    }

  render() {

    const onChangeHandler = this.onChangeHandler;
    const course = this.props.data;

    const readOnly = this.props.readOnly;
    const { faculties, departments, levels } = this.state;

    const lecturer = JSON.parse(course.lecturerID);
    let lecturerName;

    if(lecturer.firstName == "" || lecturer.lastName == ""){
        lecturerName = lecturer.email;
    }else{
        lecturerName = lecturer.firstName + " " + lecturer.lastName;
    }

   axios
      .get(`${BASE_URL}/admins/${course.addedBy}`)
      .then(res => {
          return res.data;
      })
      .then((response) => {
        if(response.firstName == "" || response.lastName == ""){
            this.setState({ addedByName: response.email })
        }else{
            this.setState({ addedByName: response.firstName + " " + response.lastName });
        }
      })
      .catch(err => console.error(err));

    

    return (
        <div className = "container">
            { this.state.edited && (<div className = "bg-success text-white p-2">Successfully Edited</div>) }
            { this.state.notEdited && (<div className = "bg-danger text-white p-2">Unfortunately, {this.state.errorMessage}</div>) }
            { this.props.readOnly && (<legend>Read Only Data</legend>) }
            { !this.props.readOnly && (<legend>You can make changes.</legend>) }

            <form name = "form" ref = "form">
                
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Title:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            type = "text"
                            name = "title"
                            onChange = {onChangeHandler}
                            defaultValue = {course.title}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Code:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            type = "text"
                            name = "code"
                            onChange = {onChangeHandler}
                            defaultValue = {course.code}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Unit:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            type = "number"
                            name = "unit"
                            onChange = {onChangeHandler}
                            defaultValue = {course.unit}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Level:</label>
                    <div className = "col-sm-8">
                        <select 
                            name = "level"
                            type = "text"
                            onChange = {onChangeHandler}
                            readOnly = {readOnly}
                            className = "form-control form-control-sm">
                            {
                                course.level == "" && (<option selected = {true} defaultValue = "">No value</option>)
                            }
                            {
                                levels.map((level,index) => {
                                    if(level == course.level){
                                        return(<option defaultValue = {level} selected = {true}>{level}</option>)
                                    }else{
                                        return(<option value = {level}>{level}</option>)
                                    }
                                })
                            }
                            
                        </select>
                    </div>
                </div>

                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Faculty:</label>
                    <div className = "col-sm-8">
                        <select 
                            name = "faculty"
                            type = "text"
                            onChange = {onChangeHandler}
                            readOnly = {readOnly}
                            className = "form-control form-control-sm">
                            {
                                course.faculty == "" && (<option selected = {true} defaultValue = "">No value</option>)
                            }
                            {
                                faculties.map((faculty,index) => {
                                    if(faculty.faculty === course.faculty){
                                        return(<option defaultValue = {faculty.faculty} selected = {true}>{faculty.faculty}</option>)
                                    }else{
                                        return(<option value = {faculty.faculty}>{faculty.faculty}</option>)
                                    }
                                })
                            }
                            
                        </select>
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Department:</label>
                    <div className = "col-sm-8">
                        <select 
                            name = "department"
                            type = "text"
                            onChange = {onChangeHandler}
                            readOnly = {readOnly}
                            className = "form-control form-control-sm">
                            {
                                course.department == "" && (<option selected = {true} defaultValue = "">No value</option>)
                            }
                            {
                                departments.map((department,index) => {
                                    if(department.department === course.faculty){
                                        return(<option defaultValue = {department.department} selected = {true}>{department.department}</option>)
                                    }else{
                                        return(<option value = {department.department}>{department.department}</option>)
                                    }
                                })
                            }
                            
                        </select>
                    </div>
                </div>

                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Lecturer:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "lecturerName"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturerName}
                            readOnly = {true}
                        />
                    </div>
                </div>  
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Added by:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "addedByName"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {this.state.addedByName}
                            readOnly = {true}
                        />
                    </div>
                </div>  
            </form>
            {
                !this.props.readOnly && (<button id = {course._id} onClick = {this.onSubmitHandler} className = "btn btn-primary btn-block">Edit Data</button>)
            }
        </div>
    )
  }
}
