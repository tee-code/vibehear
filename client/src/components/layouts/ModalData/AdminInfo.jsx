import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../Config';

export default class AdminInfo extends Component {

    state = {
        _id: "",
        addedByName: "",
        addedBy: this.props.data.addedBy,
        firstName: "",
        lastName: "",
        otherName: "",
        email: "",
        phoneNumber: "",
        role: "",
        edited: false,
        notEdited: false,
        errorMessage: ""

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
            firstName: this.refs.form.firstName.value,
            lastName: this.refs.form.lastName.value,
            otherName: this.refs.form.otherName.value,
            email: this.refs.form.email.value,
            phoneNumber: this.refs.form.phoneNumber.value,
            role: this.refs.form.role.value,
    
        }

        axios.patch(`${BASE_URL}/admins/${_id}`, data)
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

  render() {

    const onChangeHandler = this.onChangeHandler;
    const admin = this.props.data;
    const readOnly = this.props.readOnly;

   axios
      .get(`${BASE_URL}/admins/${admin.addedBy}`)
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
                    <label className = "col-sm-4 col-form-label">First Name:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            type = "text"
                            name = "firstName"
                            onChange = {onChangeHandler}
                            defaultValue = {admin.firstName}
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
                            defaultValue = {admin.lastName}
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
                            defaultValue = {admin.otherName}
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
                            defaultValue = {admin.username}
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
                            defaultValue = {admin.email}
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
                            defaultValue = {admin.phoneNumber}
                            readOnly = {readOnly}
                        />
                    </div>
                </div>
                <div className = "form-group row">
                    <label className = "col-sm-4 col-form-label">Role:</label>
                    <div className = "col-sm-8">
                        <select 
                            name = "role"
                            type = "text"
                            onChange = {onChangeHandler}
                            readOnly = {readOnly}
                            className = "form-control form-control-sm">
                            {
                                (admin.role == "Super Admin") &&
                                    (
                                        <>
                                            <option defaultValue = "Super Admin">Super Admin</option>
                                            <option value = "Admin">Admin</option>
                                        </>
                                    )
                            }
                            {
                                (admin.role == "Admin") &&
                                (
                                    <>
                                        <option defaultValue = "Admin">Admin</option>
                                        <option value = "Super Admin">Super Admin</option>
                                    </>
                                )
                            }
                            
                        </select>
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
                !this.props.readOnly && (<button id = {admin._id} onClick = {this.onSubmitHandler} className = "btn btn-primary btn-block">Edit Data</button>)
            }
        </div>
    )
  }
}
