import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../Config';
import uuid4 from 'uuid/v4'
import Request from '../../../Request/Request'

export default class FacultyInfo extends Component {

    state = {
        _id: "",
        addedByName: "",
        addedBy: this.props.data.addedBy,
        faculty: "",
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
            faculty: this.refs.form.faculty.value,
    
        }

        axios.patch(`${BASE_URL}/faculties/${_id}`, data)
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
    const faculty = this.props.data;
    const readOnly = this.props.readOnly;

   axios
      .get(`${BASE_URL}/admins/${faculty.addedBy}`)
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
                    <label className = "col-sm-4 col-form-label">Faculty Name:</label>
                    <div className = "col-sm-8">
                        <input 
                            className = "form-control form-control-sm" 
                            type = "text"
                            name = "faculty"
                            onChange = {onChangeHandler}
                            defaultValue = {faculty.faculty}
                            readOnly = {readOnly}
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
                !this.props.readOnly && (<button id = {faculty._id} onClick = {this.onSubmitHandler} className = "btn btn-primary btn-block">Edit Data</button>)
            }
        </div>
    )
  }
}
