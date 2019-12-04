import React, { Component } from "react"; 
import LoggedInHeader from "../layouts/LoggedInHeader"
import Footer from "../layouts/Footer"
import "./Message.css"

class Messages extends Component {
  render() {
    return (
        <>
            <LoggedInHeader branding = "ibeHear" username = "teecode"/>
            <div className = "container text-center m-auto text-white">
                
            </div>
            <Footer />
            
        </>
    );
  }
}

export default Messages;