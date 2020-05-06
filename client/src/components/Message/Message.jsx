import React from 'react';

export default function Message({message,status}) {
  
  let user;
  let studentToken;
  let NOT_SENT_MESSAGES;

  const MY_MESSAGE_ICON = "fa fa-check-circle";
  const NOT_SENT_MESSAGE_ICON = "fa fa-exclamation-circle text-danger";

  if(localStorage.getItem('NOT_SENT_MESSAGES')){
    NOT_SENT_MESSAGES = JSON.parse(localStorage.getItem('NOT_SENT_MESSAGES'));
  }


  if(localStorage.getItem('s-token')){
    studentToken = JSON.parse(localStorage.getItem('s-token'));
    
    if(message.senderID === studentToken._id){
      user = "you";
    }else{
      if(message.sender){
        const senderArray = message.sender.toUpperCase().split(' ');

        user = senderArray[0][0] + senderArray[1][0];
      }
    }  
  }else{
    user = "me";
  }
  
  const LecturerMessages = () => {
    return (
      <p key = {message._id} className = "words">
          <button className="btn btn-sm sender-logo">
            le
          </button>
          <small>{message.message}</small>
      </p>

    )
  }

  const StudentMessages = () => {
    return (
      <>
        <p key = {message._id + "hello"} className = "words words-receiver">
            
            <small>{message.message}</small>
            <button className="btn btn-sm receiver-logo">
              {user}
            </button>
            
            
        </p>
        <div className = "clear"></div>
        {
          user !== "you" && (
            <small className = "studentName">{message.sender}</small>
          )
        }
        
      </>

    )
  }

  const MyMessages = () => {
    return (
      <>
        <p key = {message._id + "hello"} className = "words words-receiver">
            
            <small>{message.message}</small>
            <button className="btn btn-sm receiver-logo">
              {user} <i className = {MY_MESSAGE_ICON}></i>
            </button>
            
            
        </p>
        <div className = "clear"></div>
        {
          user !== "you" && (
            <small className = "studentName">{message.sender}</small>
          )
        }
        
      </>

    )
  }

  const NotSentMessages = (messages) => {
    return (
      messages.messages.map((message) => {
        return (
          <>
            <p key = {message.message + "hello"} className = "words words-receiver">
                
                <small>{message.message}</small>
                <button className="btn btn-sm receiver-logo">
                  {user} <i className = {NOT_SENT_MESSAGE_ICON}></i>
                </button>
                
                
            </p>
            <div className = "clear"></div>
            {
              user !== "you" && (
                <small className = "studentName">{message.sender}</small>
              )
            }
            
          </>
    
        )
      })
    )  
  }

  const Msg = () => {
    if(message.senderType === "Lecturer"){
      return (
        <LecturerMessages />
      )
    }else{

      if(studentToken._id === message.senderID){
        return (
          <MyMessages />
        )
      }

      return (
        <StudentMessages />
      )

    }

  }


  return (
    <>
        
        <Msg />
        
           
        <div className = "clear"></div>
        

    </>
  );
}
