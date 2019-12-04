import React, { Component } from 'react'
import "./Login.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import TextInputGroup from "../layouts/TextInputGroup"
import { Link } from "react-router-dom"
import axios from 'axios'
import { BASE_URL } from '../../Config'
import { Consumer } from '../../Context';

export default class Login extends Component {

  state = {
      email: "",
      userType: "",
      password: "",
      loginFailed: false,
      errors: {},
      errorMessage: ""
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value} )
  }

  
  clearAlert = () => {
    setTimeout(()=>{
        this.setState({
            registerationFailed: false
        })
    },5000)
  }

  login = async (user,bodyMessage) => {

    try {
        const res = await axios.post(`${BASE_URL}/login/${user}`, bodyMessage)
        this.setState({ loginFailed: false })
        console.log(res)
        return res;

    } catch (e) {
        this.setState({ loginFailed: true, errorMessage: "Invalid Credentials" })
        this.clearAlert();
    }    
}

  onSubmitHandler = (dispatch,e) => {
    e.preventDefault();
    const { id, userType, email, password } = this.state;
    
    //check for empty fields

    if(userType === ''){
        this.setState({
            errors: {
                userType: "User type is required!!!"
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

    if(email === ''){
        this.setState({
            errors: {
                email: "Email is required!!!"
            }
        })
        return;
    }

    let user;

    if(userType === "1"){
        user = "Lecturer"
    }else{
        user = "Student"
    }

    const { data } = this.login(user,{ email, password })
    dispatch()

    //clear state
    this.setState({
        id: "",
        email: "",
        password: "",
        userType: "",
        error: {}
    });
    
}
  render() {
    const { email, password, errors } = this.state; 

    return (
        <Consumer>
            {
                (value) => {
                    const { dispatch } = value;
                    return(
                        <>
                            <Header branding = "ibeHear" />
                                <div className = "container col-md-6 text-white">
                                {
                                      this.state.loginFailed &&
                                      (
                                        <div 
                                        className = "p-1 text-center bg-danger"><strong>{this.state.errorMessage}</strong></div>
                                      )
                                  }
                                    <form onSubmit = {this.onSubmitHandler.bind(this,dispatch)}>
                                        <p 
                                            className = "text-center"
                                            style = {{ borderBottom: "2px dotted #f3f3f3", color: "white", padding: "10px" }}
                                            >Login</p>
                                        
                                        <select 
                                            onChange = {this.onChangeHandler}
                                            name = "userType"
                                            className="custom-select" id="inputGroupSelect01">
                                                <option value="2">Lecturer</option>
                                                <option  defaultValue="3">Student</option>
                                        </select>
                                        <br /><br />
                                        <TextInputGroup 
                                            name = "email"
                                            placeholder = "example@gmail.com"
                                            type = "email"
                                            label = "Email Address: "
                                            value = {email}
                                            onChange = {this.onChangeHandler}
                                            error = {errors.email}
                                        />
                                        
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
                                                    className="btn btn-lg text-white" type="submit">Login</button></div>

                                            <hr className="my-4"/>
                                            
                                    </form>
                                    <button style = {{ background: "red", opacity: "0.7" }} className="btn btn-danger btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in</button>

                                            <div className = "text-center mt-3">
                                                <Link to = "/register">
                                                    <i className = "text-white">
                                                        Don't have an account?
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
