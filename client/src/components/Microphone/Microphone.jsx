import React, { Component } from "react"; 
import LoggedInHeader from "../layouts/LoggedInHeader"
import Footer from "../layouts/Footer"
import "./Microphone.css"
import { BASE_URL } from '../../Config'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'

class Microphone extends Component {

  state = {
    isListening: false,
    isPaused: false,
    isPausedIcon: "m-2 fa fa-pause"
  }
  
  setData = (label,data) => {
    localStorage.setItem(label,JSON.stringify(data));
  }
  
  getData = (label) => {
    return JSON.parse(localStorage.getItem(label))
  }

  startTalking = (e) => {
    
    e.preventDefault();

    e.target.className = "animate2 icon fa fa-microphone";
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    let recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (e) => {
      console.log(e.results);
      this.setState({ isListening: true })
      
      const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('')

      if(e.results[0].isFinal){
        this.postMessage(transcript);    
      }

      
      
    })
    
    recognition.addEventListener('end', recognition.start);
    recognition.start();

  }

  postMessage = async (message) => {
    
    const bodyMessage = {
      senderID: JSON.parse(localStorage.getItem('l-token'))._id,
      sender: JSON.parse(localStorage.getItem('l-token')).firstName + " " + JSON.parse(localStorage.getItem('l-token')).lastName,
      receiverID: JSON.parse(localStorage.getItem('currentLecture'))._id,
      message,
      senderType: "Lecturer"
    }
    try {
      const res = await axios.post(`${BASE_URL}/messages`,bodyMessage);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

  }

  togglePlay = (e) => {
    if(!this.state.isPaused){
      this.setState({ isPausedIcon: "m-2 fa fa-pause", isPaused: true })
    }else{
      this.setState({ isPausedIcon: "m-2 fa fa-play", isPaused: false })
    }
  }

  render() {

    let lecturer;
    let currentClass;
    let currentCourseCode;
    let currentCourseUnit;
    if(!this.getData('currentCourse')){
      currentClass = "Anonymous";
    }else{
      currentClass = this.getData('currentCourse').title;
      currentCourseCode = this.getData('currentCourse').code;
      currentCourseUnit = this.getData('currentCourse').unit;
    }
    

    if(!localStorage.getItem('s-token') && !localStorage.getItem('l-token') && !localStorage.getItem('a-token')){
        return (<Redirect to = "/login" />);
    }else{
      if(!this.getData('l-token')){
        if(!this.getData('s-token')){
          return (<Redirect to = "/admin" />)
        }else{
          return (<Redirect to = "/student" />)
        }
        
      }else{
        if(this.getData('currentCourse').lecturer !== ""){
          lecturer = this.getData('currentCourse').lecturer;
        }else{
          lecturer = this.getData('l-token').email;
        }
        
      }
    }

    return (
        <>
            <LoggedInHeader branding = "ibeHear" username = "teecode"/>
            <div className = "m-container container text-center text-white">
                <span onClick = {this.startTalking} className = "animate icon fa fa-microphone"></span>
                <br/>
                <strong>Click to start talking</strong>
                {
              this.state.isListening &&
              (
                <div>
                  <p>Listening...</p>
                  <p>{currentCourseCode} {currentClass} {currentCourseUnit} units</p>
                  <p>by {lecturer}</p>
                  <button className = "m-2 btn btn-md btn-danger">Stop<i className = "m-2 fa fa-stop" /></button>
                  <button onClick = {this.togglePlay} className = "m-2 btn btn-md btn-primary">Pause<i className = {this.state.isPausedIcon} /></button>
                </div>
              )
            }
            
            </div>
            
            
            <Footer />
            
        </>
    );
  }
}

export default Microphone;