import React from "react"
import {Switch,Route} from "react-router-dom"
import IndexPage from "./components/IndexPage"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login" 
import Microphone from "./components/Microphone/Microphone"
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import LecturerDashboard from "./components/Dashboard/LecturerDashboard";
import Messages from "./components/Message/Messages";

const Main = ()=>{

	return(
		<Switch>

			<Route exact path = "/" component = {IndexPage} />
            <Route exact path = "/home" component = {IndexPage} />
            <Route exact path = "/register" component = {Register} />
            <Route exact path = "/login" component = {Login} />
            <Route exact path = '/talk' component = {Microphone} />
            <Route exact path = '/admin' component = {AdminDashboard} />
            <Route exact path = '/student' component = {StudentDashboard} />
            <Route exact path = '/lecturer' component = {LecturerDashboard} />
            <Route exact path = '/lecture' component = {Messages} />
            

		</Switch>
	)
	


}

export default Main
