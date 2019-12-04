import React, { Component } from 'react';
import { Provider } from "./Context";
import './App.css';

import Main from "./Main";

import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap'



class App extends Component {
  
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