import React, { Component } from 'react'
import axios from "axios"
import { BASE_URL } from "./Config.js"
import Request from './Request/Request'
import { Redirect } from 'react-router-dom'

const Context = React.createContext();

const reducer = ( state, action ) => {
    const { payload, type } = action;
    const { LecturerLoggedIn,AdminLoggedIn,StudentLoggedIn, courses, departments, faculties,admins, students, lecturers } = state;

    switch(type){
        case "LOGIN_USER": 
            if (payload.userType === "1"){
                localStorage.setItem('l-token',JSON.stringify(payload.data))
                return{
                    ...state,
                    LecturerLoggedIn: true
                }
            }else{
                localStorage.setItem('s-token',JSON.stringify(payload.data))
                return{
                    ...state,
                    StudentLoggedIn: true
                } 
            }
            break;
        
        case "ADMIN_LOGIN":
            
            if (payload.userType === "3"){
                
                localStorage.setItem('a-token',JSON.stringify(payload.data))
                return{
                    ...state,
                    AdminLoggedIn: true
                } 
            }
            break;
            
        case "REGISTER_STUDENT":
            return {
                ...state,
                admins: [payload,...admins]
            }
        case "REGISTER_LECTURER":
            return {
                ...state,
                admins: [payload,...admins]
            }
    
        default:
            return state
    }
} 

export class Provider extends Component {
    
    state = {
        admins:[{}],
        students: [{}],
        lecturers: [{}],
        courses: [{}],
        faculties: [{}],
        departments: [{}],
        notifications: [{}],
        lectures: [{}],
        isAuthenticated: false,
        AdminLoggedIn: false,
        StudentLoggedIn: false,
        LecturerLoggedIn: false,
        dispatch: (action) => this.setState((state) => reducer(state,action))
        
    }


    fetchAllAdmins = async () => {

        const request = new Request('admins');
        const res = await request.get();

        this.setState({ admins: JSON.parse(res) })
        
    }

    fetchAllCourses = async () => {

        const request = new Request('courses');
        const res = await request.get();

        this.setState({ courses: JSON.parse(res) })
        
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

    fetchAllNotifications = async () => {

        const request = new Request('notifications');
        const res = await request.get();

        this.setState({ notifications: JSON.parse(res) })
        
    }

    fetchAllStudents = async () => {

        const request = new Request('students');
        const res = await request.get();

        this.setState({ students: JSON.parse(res) })
        
    }

    fetchAllLecturers = async () => {

        const request = new Request('lecturers');
        const res = await request.get();

        this.setState({ lecturers: JSON.parse(res) })
        
    }

    componentDidMount(){

        
        setInterval(() => {
            if(!localStorage.getItem('l-token') && 
            !localStorage.getItem('s-token') && 
            !localStorage.getItem('a-token')){
                return (<Redirect to = "/login" />);
            }
            this.fetchAllAdmins();
            this.fetchAllLecturers();
            this.fetchAllStudents();
            this.fetchAllCourses();
            this.fetchAllDepartments();
            this.fetchAllFalcuties();
            this.fetchAllNotifications();

        }, 2000)
        
    }
    
    render() {
              
        return (
            <Context.Provider value = {this.state}>
                
                { this.props.children }

            </Context.Provider>
        )
    }
}


export const Consumer = Context.Consumer;