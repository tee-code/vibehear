import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../Config';
import { Consumer } from '../../../Context';
import uuid4 from 'uuid/v4'
import Request from '../../../Request/Request'
export default class lecturerInfo extends Component {

    state = {
        _id: "",
        dateJoined: this.props.data.dateJoined,
        firstName: "",
        lastName: "",
        otherName: "",
        email: "",
        phoneNumber: "",
        username: "",
        departmnet: "",
        faculty: "",
        edited: false,
        notEdited: false,
        errorMessage: "",
        departments: [{}],
        faculties: [{}]

    }

    componentDidMount(){
        this.fetchAllDepartments();
        this.fetchAllFalcuties();
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
            username: this.refs.form.username.value,
            // username: this.refs.form.username.value,
            firstName: this.refs.form.firstName.value,
            lastName: this.refs.form.lastName.value,
            otherName: this.refs.form.otherName.value,
            email: this.refs.form.email.value,
            phoneNumber: this.refs.form.phoneNumber.value,
            faculty: this.refs.form.faculty.value,
            department: this.refs.form.department.value,
    
        }

        axios.patch(`${BASE_URL}/lecturers/${_id}`, data)
            .then((response) => {
                console.log('response: ', response);
                return response.data;
            })
            .then((data) => {
                console.log('data: ',data)
                this.setState({ currentEditedData: data, edited: true })
                this.clearAlert();
            })
            .catch((e) => {
                console.log('error: ',e);
                this.setState({ notEdited: true, errorMessage: e.message })
                this.clearAlert();
            })
        
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
  render() {

    const onChangeHandler = this.onChangeHandler;
    const lecturer = this.props.data;
    const readOnly = this.props.readOnly;
    const dateJoined = new Date(lecturer.dateJoined).toDateString();
    
    const { faculties, departments } = this.state;

    return (
        
        <div className = "container">
            { this.state.edited && (<div className = "bg-success text-white p-2">Successfully Edited</div>) }
            { this.state.notEdited && (<div className = "bg-danger text-white p-2">Unfortunately, {this.state.errorMessage}</div>) }
            { this.props.readOnly && (<legend>Read Only Data</legend>) }
            { !this.props.readOnly && (<legend>You can make changes.</legend>) }
            <form name = "form" ref = "form">
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">First Name:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            type = "text"
                            name = "firstName"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturer.firstName}
                            readOnly = {readOnly}
                        />
                    </div>
                    
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Last Name:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "lastName"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturer.lastName}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Other Name:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "otherName"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturer.otherName}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Email:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "email"
                            type = "email"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturer.email}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Phone Number:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "phoneNumber"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturer.phoneNumber}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Username:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "username"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {lecturer.username}
                            readOnly = {readOnly}
                        />
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
                                lecturer.faculty == "" && (<option selected = {true} defaultValue = "">No value</option>)
                            }
                            {
                                faculties.map((faculty,index) => {
                                    if(faculty.faculty === lecturer.faculty){
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
                                lecturer.department == "" && (<option selected = {true} defaultValue = "">No value</option>)
                            }
                            {
                                departments.map((department,index) => {
                                    if(lecturer.department === department.department){
                                        return(<option key = {uuid4()} defaultValue = {department.department} selected = {true}>{department.department}</option>)
                                    }else{
                                        return(<option key = {uuid4()} value = {department.department}>{department.department}</option>)
                                    }
                                })
                            }
                            
                        </select>
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Date Joined:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            name = "dateJoined"
                            type = "text"
                            onChange = {onChangeHandler}
                            defaultValue = {dateJoined}
                            readOnly = {true}
                        />
                    </div>
                </div>
            {
                !this.props.readOnly && (<button id = {lecturer._id} onClick = {this.onSubmitHandler} className = "btn btn-primary btn-block">Edit Data</button>)
            }
        </form>
        </div>
    ) 
  }
}
