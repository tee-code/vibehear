import React, { Component } from "react"; 
import LoggedInHeader from "../layouts/LoggedInHeader"
import Footer from "../layouts/Footer"
import "./Microphone.css"

class Microphone extends Component {
  render() {
    return (
        <>
            <LoggedInHeader branding = "ibeHear" username = "teecode"/>
            <div className = "m-container container text-center m-auto text-white">
                <span className = "icon fa fa-microphone"></span>
                <br/>
                <strong>Click to start talking</strong>
            </div>
            <Footer />
            
        </>
    );
  }
}

export default Microphone;