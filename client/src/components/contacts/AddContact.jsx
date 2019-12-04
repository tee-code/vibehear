import React, { Component } from 'react'
import { Consumer } from '../../Context'
import uuid from "uuid"
import TextInputGroup from '../layouts/TextInputGroup'
import { isFulfilled } from 'q';

class AddContact extends Component {

    state = {
        id: uuid(),
        name: "",
        email: "",
        phone: "",
        errors: {}
    }
    
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = (dispatch,e) => {
        e.preventDefault();
        const { id, name, email, phone } = this.state;

        const newContact = {
            id,
            name,
            email,
            phone
        }

        //check for empty fields

        if(name === ''){
            this.setState({
                errors: {
                    name: "Name is required!!!"
                }
            })
            
            return;
        }

        if(email === ''){
            this.setState({
                errors: {
                    email: "Email is required!!!"
                }
            })
            return;
        }

        if(phone === ''){
            this.setState({
                errors: {
                    phone: "Phone Number is required!!!"
                }
            })
            return;
        }

        const action = { type: "ADD_CONTACT", payload: newContact}
        dispatch(action);

        //clear state
        this.setState({
            id: "",
            name: "",
            email: "",
            phone: "",
            error: {}
        });
        
    }


  render() {

    const { errors, name, email, phone } = this.state;
    return(
        <Consumer>
            {
                (value) => {
                    const { dispatch } = value;
                    return (
                        <>
                            <div className="card mb-3">
                                <div className="card-header">
                                    Add Contact
                                </div>
                                <div className="card-body">
                                    <form onSubmit = {this.onSubmitHandler.bind(this,dispatch)}>
                                        <TextInputGroup 
                                            name = "name"
                                            placeholder = "Enter name..."
                                            label = "Name: "
                                            value = {name}
                                            onChange = {this.onChangeHandler}
                                            error = {errors.name}
                                        />

                                        <TextInputGroup 
                                            name = "email"
                                            type = "email"
                                            placeholder = "Enter email..."
                                            label = "Email: "
                                            value = {email}
                                            onChange = {this.onChangeHandler}
                                            error = {errors.email}
                                        />

                                        <TextInputGroup 
                                            name = "phone"
                                            placeholder = "Enter phone number..."
                                            label = "Phone Number: "
                                            value = {phone}
                                            onChange = {this.onChangeHandler}
                                            error = {errors.phone}
                                        />
                                        
                                        
                                        <button type = "submit" className="btn btn-block btn-danger">Add Contact</button>
                                        
                                    </form>
                                </div>
                            </div> 
                        </>
                    )
                }
            }
        </Consumer>
    )
  }
}


export default AddContact;