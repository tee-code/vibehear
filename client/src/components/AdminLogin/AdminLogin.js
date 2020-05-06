import React, { Component } from 'react'
import "./AdminLogin.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import TextInputGroup from "../layouts/TextInputGroup"
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import { BASE_URL } from '../../Config'
import { Consumer } from '../../Context';
import Loader from '../Loader/Loader';

export default class AdminLogin extends Component {

  state = {
      email: "",
      userType: "3",
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
    },5000)
  }

  login = async (user,bodyMessage, dispatch) => {

    try {
        const res = await axios.post(`${BASE_URL}/login/${user}`, bodyMessage)
        this.setState({ loginFailed: false, data: res.data })
        
        const userType = "3";
        const action = { type: "ADMIN_LOGIN", payload: { data: res.data, userType } }
        dispatch(action)
        
    } catch (e) {
        this.setState({ loginFailed: true, errorMessage: "Invalid Credentials" })
        window.document.querySelector("#loader").style.display = "none";
        this.clearAlert();
    }    
}

  onSubmitHandler = (dispatch,e) => {
    e.preventDefault();
    window.document.querySelector("#loader").style.display = "block";
    
    const { id, email, password } = this.state;
    
    //check for empty fields

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

    let user = "Admin";

    this.login(user,{ email, password }, dispatch)
    

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
                    const { dispatch, AdminLoggedIn, LecturerLoggedIn, StudentLoggedIn } = value;
                    
                    if(StudentLoggedIn){
                        return (<Redirect to = "/student" />)
                    }

                    if(LecturerLoggedIn){
                        return (<Redirect to = "/lecturer" />)
                    }

                    if(AdminLoggedIn){
                        return (<Redirect to = "/admin" />)
                    }

                    return(
                        <>
                            <Header branding = "ibeHear" />
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
                                        <h4
                                            className = "text-center"
                                            style = {{ backgroundColor: "#0E0D95", opacity:"0.7", fontWeight: "bolder", padding: "5px"}}
                                            >
                                                
                                                Admin Login
                                        </h4>
                                        
                                        
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
                                            placeholder = "password"
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
