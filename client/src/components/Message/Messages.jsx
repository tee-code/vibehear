import React, { Component } from "react"; 
import LoggedInHeader from "../layouts/LoggedInHeader"
import Footer from "../layouts/Footer"
import "./Message.css"
import axios from 'axios'
import { BASE_URL } from '../../Config'
import Message from '../Message/Message'
import LeftSideBar from '../layouts/LeftSideBar';
import uuid from 'uuid/v4';
import { Redirect, Link } from 'react-router-dom'

class Messages extends Component {

  state = {
    lectures: [{}],
    courses: [{}],
    messagesNotSent: JSON.parse(localStorage.getItem('NOT_SENT_MESSAGES')) || [{}],
    status: "",
  }

  componentDidMount() {

    if(!localStorage.getItem('NOT_SENT_MESSAGES')){
      localStorage.setItem('NOT_SENT_MESSAGES', JSON.stringify([]));
    }

    setInterval(()=> {
      this.getMessages();
      this.getCourses();
    },2000)
  }

  onMessage = (e) => {
    e.preventDefault();
    this.setState({
      currentMessage: e.target.value
    })
  }

resendMessage = (e) => {
  
  e.preventDefault();

  const bodyMessage = JSON.parse(e.target.id)
  this.postMessage(bodyMessage);

  let newNotSentMessages = JSON.parse(localStorage.getItem('NOT_SENT_MESSAGES'))

  newNotSentMessages = newNotSentMessages.filter((message) => {
    return message._id == bodyMessage._id;
  })

  this.setData('NOT_SENT_MESSAGES', newNotSentMessages);


}

deleteNotSentMessage = (e) => {
  e.preventDefault();

  const bodyMessage = JSON.parse(e.target.id);

  const messages = this.getData('NOT_SENT_MESSAGES')
  messages = messages.filter((message) => {
    return message._id !== bodyMessage._id;
  })

  this.setData('NOT_SENT_MESSAGES', messages);
  
}

setData = (label,data) => {
  localStorage.setItem(label,JSON.stringify(data));
}

getData = (label) => {
  return JSON.parse(localStorage.getItem(label))
}

postMessage = async (bodyMessage) => {
  
    try {

    const res = await axios.post(`${BASE_URL}/messages`,bodyMessage);

    this.setState({ status: "sent"});
    this.getMessages();

  } catch (error) {

    this.setState({ status: "error"});
    bodyMessage._id = uuid();
    const NOT_SENT_MESSAGES = JSON.parse(localStorage.getItem('NOT_SENT_MESSAGES'));
    NOT_SENT_MESSAGES.push(bodyMessage);
    
    localStorage.setItem('NOT_SENT_MESSAGES', NOT_SENT_MESSAGES); 
    console.log(error);
  }

  //clear text area
  if(window.document.getElementById('textarea')){
    window.document.getElementById('textarea').value = "";
  }

  
  

}

sendMessage = (e) => {
    e.preventDefault();
    
    if(localStorage.getItem('s-token')){

      const studentData = JSON.parse(localStorage.getItem('s-token'));
      
      let receiverID;
      let bodyMessage; 

      if(localStorage.getItem('currentLecture')){
        receiverID = JSON.parse(localStorage.getItem('currentLecture'))._id;
      }

      if(this.currentCourse !== ""){
        bodyMessage = {
          sender: studentData.firstName + " " + studentData.lastName,
          senderID: studentData._id,
          message: this.state.currentMessage,
          senderType: "Student",
          receiverID
        }
      }

      
      this.postMessage(bodyMessage);
    }
}
  viewLecture = async (course) => {

    let lecturerID = course.lecturerID;
      
    const res = await axios.get(`${BASE_URL}/lecturers/${lecturerID}`)
    
    if(res.data.firstName.length > 0 || res.data.lastName.length > 0){
      course.lecturerName = res.data.firstName + " " + res.data.lastName; 
    }else{
      course.lecturerName = res.data.email; 
    }
    
    localStorage.setItem('currentLecture', JSON.stringify(course));
  }

  getMessages = async () => {

    try {
      const res = await axios.get(`${BASE_URL}/messages`)
      
      this.setState({ lectures: res.data })
    } catch (error) {
      console.log(error);
    }

  }

  getCourses = async () => {

    try {
      const res = await axios.get(`${BASE_URL}/courses`)
      res.data.forEach((course,index) => {
        course.name = course.code;
        course.action = this.viewLecture.bind(this,course);
      })

      this.setState({ courses: res.data })
    } catch (error) {
      console.log(error);
    }

  }

  

  render() {
    let { courses, lectures, messagesNotSent } = this.state; 
    let currentCourse = JSON.parse(localStorage.getItem('currentLecture'));
    
    if(!localStorage.getItem('s-token') && !localStorage.getItem('l-token') && !localStorage.getItem('a-token')){
        return (<Redirect to = "/login" />);
    }else{
      if(!this.getData('s-token')){
        if(!this.getData('l-token')){
          return (<Redirect to = "/admin" />)
        }else{
          return (<Redirect to = "/lecturer" />)
        }
        
      }
    }


    return (
        <>
            <div className="d-flex" id="wrapper">
            
            <LeftSideBar name = "Lecture" data = {courses}/>
            
            <div id="page-content-wrapper">
                
                <LoggedInHeader branding = "ibeHear" username = "teecode" />
                
                                
                <div id = "admin" className="">
                    <div className="messagesPanel">
                      { !!currentCourse &&
                        (
                          <div className = "course-info">
                            <p className="course-title">{currentCourse.title}</p>
                            <p className="course-code">{currentCourse.code}</p>
                            <p className="lecturer-in-charge">{currentCourse.lecturerName}</p>
                          </div>
                        )
                      
                      }
                      
                      <div className="messages">
                  
                        { 
                          lectures.map((lecture,index) => {
                            return (<Message key = {index + 3} status = {this.state.status} message = {lecture}/>)
                          })
                        }

                        { 
                          messagesNotSent.map((message,index) => {
                            return (
                              <>
                                <p key = {message.message + "hello"} className = "words words-receiver">
                                    
                                    <small>{message.message}</small>
                                    <button id = {JSON.stringify(message)} onClick = {this.resendMessage} className="btn btn-sm receiver-logo">
                                      you <i onClick = {this.resendMessage} id = {JSON.stringify(message)} className = "fa fa-exclamation-circle text-danger"></i>
                                      <i onClick = {this.deleteNotSentMessage} id = {JSON.stringify(message)} className = "ml-2 fa fa-trash text-danger"></i>
                                    </button>
                                    
                                    
                                </p>
                                <div className = "clear"></div>
                                
                              </>
                            )
                          })
                        }
                        
                      </div>
                      
                      <div className="chatArea">
                      <textarea 
                        name = "message" 
                        className ="form-control" 
                        id="textarea" 
                        placeholder="type a message..."
                        onKeyDown = {this.send} 
                        onChange = {this.onMessage}>
                        </textarea>
                      </div>
                  </div>
                </div>

                <button onClick = {this.sendMessage} className = "addNew btn btn-md btn-primary m-2"><i onClick = {this.sendMessage} className = "fa fa-arrow-right" /></button>
            </div> 
        </div>
            
      </>
    );
  }
}

export default Messages;