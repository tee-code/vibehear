import React, { Component } from 'react'
import "./Register.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import TextInputGroup from "../layouts/TextInputGroup"
import { Consumer } from '../../Context';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { BASE_URL } from '../../Config';
import { Link } from 'react-router-dom';


export default class Register extends Component {


  state = {
      email: "",
      username: "",
      userType:"",
      matric: "",
      password: "",
      registerationFailed: false,
      isRegistered: false,
      errors: {}
  }

  redirect = () => {
    if(this.state.isRegistered){
        return (<Redirect to = "/login" />)
    }
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  clearAlert = () => {
    setTimeout(()=>{
        this.setState({
            registerationFailed: false
        })
    },5000)
  }

  postUser = async (user,bodyMessage) => {

    try {
        const res = await axios.post(`${BASE_URL}/${user}`, bodyMessage)
        
        this.setState({isRegistered: true})
    } catch (error) {
        this.setState({ registerationFailed: true })
        this.clearAlert();
    }
    
 }

  onSubmitHandler = (dispatch,e) => {

    e.preventDefault();
    
    const { username, matric, email, password, userType } = this.state;

    
    //check for empty fields

    if(userType === ''){
        
        this.setState({
            errors: {
                userType: "UserType is required!!!"
            }
        })
        
        return;
    }

    if(password === ''){
        this.setState({
            errors: {
                password: "Password is required!!!"
            }
        })
        
        return;
    }

    if(username === '' && userType === "1"){
        this.setState({
            errors: {
                username: "Username is required!!!"
            }
        })
        
        return;
    }


    if(matric === ''){
        this.setState({
            errors: {
                matric: "Matric Number is required!!!"
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

    //check for the user type
    
    let user;
    let bodyMessage;

    if(userType === "1"){
        user = "lecturers"
        bodyMessage = {
            email,
            password,
            username
        }
    }else{
        user = "students"
        bodyMessage = {
            email,
            password,
            matricNumber: matric
        }
    }

    this.postUser(user, bodyMessage)


    //clear state
    this.setState({
        id: "",
        username: "",
        email: "",
        matric: "",
        userType: "",
        password: "",
        error: {}
    });
    
}
  render() {
    
    const { email, username, matric, userType, password, errors } = this.state; 
    
    
    return (
          
        <Consumer>
            
            {
                ( value ) => {

                    const { dispatch } = { value }
                    
                    return (
                        <>
                          {this.redirect()}  
                          <Header branding = "ibeHear" />
                              <div className = "container col-md-6 text-white">
                                  {
                                      this.state.registerationFailed &&
                                      (
                                        <div 
                                        className = "p-1 text-center bg-danger"><strong>Registration Failed</strong></div>
                                      )
                                  }
                                  
                                  <form onSubmit = {this.onSubmitHandler.bind(this,dispatch)}>
                                      <p 
                                          className = "text-center"
                                          style = {{ borderBottom: "2px dotted #f3f3f3", color: "white", padding: "10px" }}
                                          >Register</p>
                                      <select 
                                        onChange = {this.onChangeHandler}
                                        name = "userType"
                                        className="custom-select" id="inputGroupSelect01">
                                          <option value="1">Lecturer</option>
                                          <option  defaultValue="2">Student</option>
                                      </select>
                                       <br /><br />
                                      <TextInputGroup 
                                          name = "email"
                                          type = "email"
                                          placeholder = "example@gmail.com"
                                          label = "Email Address: "
                                          value = {email}
                                          onChange = {this.onChangeHandler}
                                          error = {errors.email}
                                      />
                                      { userType === "1" || userType === '' ? (
                                          <TextInputGroup 
                                          name = "username"
                                          placeholder = "username"
                                          label = "Username: "
                                          value = {username}
                                          onChange = {this.onChangeHandler}
                                          error = {errors.username}
                                      />
                                      ): (
                                            <TextInputGroup 
                                                name = "matric"
                                                placeholder = "matric number"
                                                label = "Matric Number: "
                                                value = {matric}
                                                onChange = {this.onChangeHandler}
                                                error = {errors.matric}
                                            />
                                      )}
                                      <TextInputGroup 
                                          name = "password"
                                          placeholder = "secured password"
                                          type = "password"
                                          label = "Password "
                                          value = {password}
                                          onChange = {this.onChangeHandler}
                                          error = {errors.password}
                                      />
                                        
                  
                                          <div className="text-center container">
                                              <button 
                                                  
                                                  style = {{ background: "red", opacity: "0.7" }}
                                                  type = "submit"
                                                  className="btn btn-lg text-white">Register</button></div>
                  
                                          <hr className="my-4"/>
                                          
                                  </form>
                                  <button 
                                        style = {{ background: "red", opacity: "0.7" }} className="btn btn-danger btn-lg btn-google btn-block text-uppercase"><i className="fab fa-google mr-2"></i> Sign up
                                    </button>
                                    <div className = "text-center mt-3">
                                        <Link to = "/register">
                                            <i className = "text-white">
                                                Already have an account?
                                            </i>
                                        </Link>
                                    </div>
                              </div>
                            
                          <Footer />
                        </>
                      )
                }
            }
        </Consumer>
    )

    
  }
}
