import React, { Component } from 'react';
import { Provider } from "./Context";
import './App.css';
import { Redirect } from "react-router-dom"
import Main from "./Main";

import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap'



class App extends Component {
  state = {
    isAuthenticated: false
  }

  isAuthenticated = () => {
    if(localStorage.getItem('s-token') || localStorage.getItem('l-token')){
      alert('hhfslsdfkl')
        console.log('hereeee')
        this.setState({ isAuthenticated: true })
    }else{
        this.setState({ isAuthenticated: false })
        console.log('hereeee111111111111')
    }
}

  render() {
    if(this.state.isAuthenticated){
      return(<Redirect to = "/login" />)
    }  
    return (
      <Provider>
        <div className = "wrapper"></div>
        <Main />
      </Provider>
    )
  }
}

export default App;