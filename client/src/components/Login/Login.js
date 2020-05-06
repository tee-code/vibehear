import React, { Component } from 'react'
import "./Login.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import TextInputGroup from "../layouts/TextInputGroup"
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import { BASE_URL } from '../../Config'
import { Consumer } from '../../Context';
import Loader from '../Loader/Loader';

export default class Login extends Component {

  state = {
      email: "",
      userType: "",
      password: "",
      loginFailed: false,
      errors: {},
      errorMessage: "",
      data: {}
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value} )
    
  }

  
  clearAlert = () => {
    setTimeout(()=>{
        this.setState({
            loginFailed: false
        })
        window.document.querySelector("#loader").style.display = "none";
    },5000)
  }

  login = async (user,bodyMessage, dispatch) => {
    
    try {
        const res = await axios.post(`${BASE_URL}/login/${user}`, bodyMessage)
        this.setState({ loginFailed: false, data: res.data })
        const { userType } = this.state;
        
        const action = { type: "LOGIN_USER", payload: { data: res.data, userType } }
        dispatch(action)
        
        if(user.trim() === "Lecturer"){
            
            return (<Redirect to = "/lecturer" />)
        }else{
            
            return (<Redirect to = "/student" />)
        }
    } catch (e) {
        window.document.querySelector("#loader").style.display = "none";
        this.setState({ loginFailed: true, errorMessage: "Invalid Credentials" })
        this.clearAlert();
    }    
}

  onSubmitHandler = (dispatch,e) => {
    e.preventDefault();
    window.document.querySelector("#loader").style.display = "block";
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

    this.login(user,{ email, password }, dispatch)
    
    
}
  render() {
    const { email, password, errors } = this.state; 

    if(localStorage.getItem('l-token')){
        return (<Redirect to = "/lecturer" />);
    }

    if(localStorage.getItem('s-token')){
        return (<Redirect to = "/student" />);
    }

    if(localStorage.getItem('a-token')){
        return (<Redirect to = "/admin" />);
    }

    return (
        <Consumer>
            {
                (value) => {
                    const { dispatch, LecturerLoggedIn, StudentLoggedIn } = value;
                    
                    if(StudentLoggedIn){
                        return (<Redirect to = "/student" />)
                    }

                    if(LecturerLoggedIn){
                        return (<Redirect to = "/lecturer" />)
                    }

                    return(
                        <>
                            <Header branding = "ibeHear" active = "login" />
                            <Loader />
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
                                                <option value="">Select user</option>
                                                <option value="1">Lecturer</option>
                                                <option  value="2">Student</option>
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
