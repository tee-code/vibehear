import React, { Component } from 'react';
import { Provider } from "./Context";
import './App.css';
import { Redirect } from "react-router-dom"
import Main from "./Main";

import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'jquery/dist/jquery.js'
import 'popper.js/dist/popper.js'
import 'bootstrap/dist/js/bootstrap.js'



class App extends Component {
  state = {
    isAuthenticated: false
  }

  isAuthenticated = () => {
    if(localStorage.getItem('s-token') || localStorage.getItem('l-token')){
     
        
        this.setState({ isAuthenticated: true })
    }else{
        this.setState({ isAuthenticated: false })
        
    }
}

  render() {
    
    return (
      <Provider>
        <div className = "wrapper"></div>
        <Main />
      </Provider>
    )
  }
}

export default App;