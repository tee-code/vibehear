import React, { Component } from 'react'
import axios from "axios"
import { BASE_URL } from "./Config.js"
import Request from './Request/Request'
import { Redirect } from "react-router-dom"

const Context = React.createContext();

const reducer = ( state, action ) => {
    const { payload, type } = action;
    const { admins, students, lecturers } = state;

    switch(type){
        case "LOGIN_USER":
            localStorage.setItem('VIBEHEAR-ACCESS-TOKEN', payload)
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
        notifications: [{}],
        lectures: [{}],
        isAuthenticated: false,
        dispatch: (action) => this.setState((state) => reducer(state,action))
        
    }

    isAuthenticated = () => {
        if(localStorage.getItem('token')){
            this.setState({ isAuthenticated: true})
        }else{
            this.setState({ isAuthenticated: false })
        }
    }

    fetchAllAdmins = async () => {

        const request = new Request('admins');
        const res = await request.get();

        this.setState({ admins: JSON.parse(res) })
        
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
            this.isAuthenticated()
            this.fetchAllAdmins();
            this.fetchAllLecturers();
            this.fetchAllStudents();

        }, 2000)
        
    }
    
    render() {
        
        return (
            <Context.Provider value = {this.state}>
                { !this.state.isAuthenticated ? <Redirect to = "/login" /> : null }
                { this.props.children }
            </Context.Provider>
        )
    }
}


export const Consumer = Context.Consumer;